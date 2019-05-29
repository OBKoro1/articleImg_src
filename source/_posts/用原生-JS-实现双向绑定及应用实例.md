---
title: 用原生 JS 实现双向绑定及应用实例
date: 2017-10-11 22:51:38
tags:
    - js双向绑定
categories: js
---
写在前面：
---
所谓的双向绑定，无非是从**界面的操作能实时反映到数据，数据的变更也能实时展现到界面**。angular封装了双向绑定的方法，使双向绑定变得十分简单。但是在有些场景下（比如下面那个场景），不能使用angular来实现双向绑定，需要我们使用js来实现双向绑定。

需求场景：
---
写了一个点击事件，当点击的时候在后台赋值了，但是在页面视图上面没有显示出来，想到要使用双向绑定来实现这个功能。因为代码之前是用js和jq写的，引入angular的话，会导致之前的代码不能用。在网上参考了一篇文章之后做出来了这个功能

ps零碎知识点：楼主踩过坑了，**引用angular写的话，不能再使用JQ写代码**，楼主上次代码都删的差不多了，还不能使用，最后才发现是angular和JQ冲突了，所以最好不要混着使用。

实现效果：
--

![](https://dn-mhke0kuv.qbox.me/32d23e28a9dfdc1696a2.gif)

### 实现效果

点击按钮的时候，**在后台赋值，然后直接在页面中显示出来，在方框里面输入值，也可以实时反映到数据**。

ps：**文末有demo链接**，可以直接复制到本地试一试

### 应用：

比如实现一个在后台赋值，然后界面出现一个随机的选项，谁是卧底、狼人杀这类型的。

---

### 实现原生js过程中的三个步骤：

1.需要一个U**I元素和属性相互绑定**的方法（核心）

2.监视属性和UI元素的变化

3.需要让所有绑定的对象和元素都能感知到变化

### 实现思路：

我们使用数据特性来为HTML代码进行绑定，所有被绑定在一起的JavaScript对象和DOM元素都会订阅一个PubSub对象。只要JavaScript对象或者一个HTML输入元素监听到数据的变化时，就会触发绑定到PubSub对象上的事件，从而其他绑定的对象和元素都会做出相应的变化。


代码实现部分：
---

### html代码部分：

````
<h1>原生js双向绑定及其应用</h1>
<div class="js-2-1section2 col-sm-10 col-xs-10">
    <div><input type="text" data-bind-1="peopleName"  id="text1"/>
        <!--data-bind-1="peopleName" 原生js双向绑定的格式-->
    </div>
    <div><input  type="text" data-bind-2="killName" id="text2" />
        <button class="btn btn-primary" onclick="randomGroup()">随机词组</button>
    </div>
    <p data-bind-1="peopleName"></p>
    <p data-bind-2="killName"></p>
</div>
````

上面代码中data-bind-1="peopleName" 比较重要，其他一些乱七八糟，用来实现效果的，可以不用管。

### 分析一下————data-bind-1="peopleName"：

格式：data-bind-可以更改，只能是数字="可以更改，相当于变量名"

ps：第一个地方只能更改数字，因为创建的是对象。这里的数字可以不按照顺序，我试了999都可以。

### js代码双向绑定部分

js代码是封装好了的一个方法，可以按照前面几行的方式调用，代码里面有注释。

#### 实际上以下这段代码已经实现了双向绑定，下面还有一个应用实例，感兴趣的可以看看。文末有demo链接，可以直接复制到本地试一试。

````
 var DBind1 = new DBind( 1 );
    var DBind2 = new DBind( 2 );//前面是变量，括号里面的是html那里填的数字
    DBind1.set( "peopleName", '第一个' );
    DBind2.set( "killName", '第二个' );//第一个是刚才html格式那里的变量名，第二个方框是赋值

    function DataBinder( object_id ) {
        // 创建一个简单的pubSub对象
        var pubSub = {
                    callbacks: {},

                    on: function( msg, callback ) {
                        this.callbacks[ msg ] = this.callbacks[ msg ] || [];
                        this.callbacks[ msg ].push( callback );
                    },
                    publish: function( msg ) {
                        this.callbacks[ msg ] = this.callbacks[ msg ] || [];
                        for ( var i = 0, len = this.callbacks[ msg ].length; i < len; i++ ) {
                            this.callbacks[ msg ][ i ].apply( this, arguments );
                        }
                    }
                },
                data_attr = "data-bind-" + object_id,
                message = object_id + ":input",
                timeIn;

        changeHandler = function( evt ) {
            var target = evt.target || evt.srcElement, //  IE8兼容
                    prop_name = target.getAttribute( data_attr );

            if ( prop_name && prop_name !== "" ) {
                clearTimeout(timeIn);
                timeIn = setTimeout(function(){
                    pubSub.publish( message, prop_name, target.value );
                },50);

            }
        };

        // 监听事件变化，并代理到pubSub
        if ( document.addEventListener ) {
            document.addEventListener( "input", changeHandler, false );
        } else {
            // IE8使用attachEvent而不是addEventListenter
            document.attachEvent( "oninput", changeHandler );
        }

        // pubSub将变化传播到所有绑定元素
        pubSub.on( message, function( evt, prop_name, new_val ) {
            var elements = document.querySelectorAll("[" + data_attr + "=" + prop_name + "]"),
                    tag_name;

            for ( var i = 0, len = elements.length; i < len; i++ ) {
                tag_name = elements[ i ].tagName.toLowerCase();

                if ( tag_name === "input" || tag_name === "textarea" || tag_name === "select" ) {
                    elements[ i ].value = new_val;
                } else {
                    elements[ i ].innerHTML = new_val;
                }
            }
        });

        return pubSub;
    }
    function DBind( uid ) {
        var binder = new DataBinder( uid ),

                user = {
                    // 属性设置器使用数据绑定器pubSub来发布
                    attributes: {},
                    set: function( attr_name, val ) {
                        this.attributes[ attr_name ] = val;
                        // Use the `publish` method
                        binder.publish( uid + ":input", attr_name, val, this );
                    },
                    get: function( attr_name ) {
                        return this.attributes[ attr_name ];
                    },

                    _binder: binder
                };

        // Subscribe to the PubSub
        binder.on( uid + ":input", function( evt, attr_name, new_val, initiator ) {
            if ( initiator !== user ) {
                user.set( attr_name, new_val );
            }
        });

        return user;
    }
````
---

### 原生js双向绑定应用实例：

#### 做了一个实现像谁是卧底中，随机抽取词汇，类似的功能。
````
    function randomGroup() {
        var oGroup=[];//存放所有词汇的词组、
        for(var i=0;i<20;i++){
            oGroup[i]={};//设置数组中的每个元素都是一个对象
        }
        //一个一个定义他们状态的字符串，然后在下面赋值
        oGroup[0].people="降龙十八掌";
        oGroup[0].killer="九阴白骨爪";
        oGroup[1].people="快乐大本营";
        oGroup[1].killer="天天向上";
        oGroup[2].people="零花钱";
        oGroup[2].killer="生活费";
        oGroup[3].people="爷爷";
        oGroup[3].killer="姥爷";
        oGroup[4].people="同学";
        oGroup[4].killer="同桌";
        oGroup[5].people="小沈阳";
        oGroup[5].killer="宋小宝";
        oGroup[6].people="成吉思汗";
        oGroup[6].killer="努尔哈赤";
        oGroup[7].people="谢娜张杰";
        oGroup[7].killer="邓超孙俪";
        oGroup[8].people="新年";
        oGroup[8].killer="跨年";
        oGroup[9].people="保安";
        oGroup[9].killer="保镖";
        oGroup[10].people="眉毛";
        oGroup[10].killer="胡须";
        oGroup[11].people="端午节";
        oGroup[11].killer="中秋节";
        oGroup[12].people="摩托车";
        oGroup[12].killer="电动车";
        oGroup[13].people="高跟鞋";
        oGroup[13].killer="增高鞋";
        oGroup[14].people="汉堡包";
        oGroup[14].killer="肉夹馍";
        oGroup[15].people="牛奶";
        oGroup[15].killer="豆浆";
        oGroup[16].people="唇膏";
        oGroup[16].killer="口红";
        oGroup[17].people="公交";
        oGroup[17].killer="地铁";
        oGroup[18].people="结婚";
        oGroup[18].killer="订婚";
        oGroup[19].people="面包";
        oGroup[19].killer="蛋糕";
        //词汇出自——————谁是卧底的词汇大全
        var oGroupNum=Math.floor(Math.random()*20);//抽取一个随机数，随机数范围跟上面数组的长度是一致的
        oPeople=oGroup[oGroupNum].people;
        okiller=oGroup[oGroupNum].killer;//随机数的对应下标的状态字符串赋值给这个变量。
        console.log(oPeople,okiller);
        DBind1.set( "peopleName", oPeople );//将上面的状态字符串赋值给input框，。这一步将在界面中直接显示出来
        DBind2.set( "killName", okiller );
    }
````
---

### [demo地址](https://obkoro1.github.io/article-demo/2017/jsTwoWayBinding/jsTwoWay.html)

以上就是用原生js实现双向绑定及其应用的所有内容了，本文主要是分享给之前不知道的小伙伴们看的，或者需要此类资料的小伙伴们。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！因为我经常看不懂别人写的分享，所以个人写文比较偏小白，写的不好之处，欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**ps**：目前**待业**，坐标北京，本人适应互联网快节奏，高强度，持续学习，持续成长，认真，严谨，学习积极性强。**中小公司大佬求带走**，邮箱：1677593011@qq.com。
**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **

### 参考链接：

[JavaScript 实现简单的双向数据绑定 ](https://www.oschina.net/translate/easy-two-way-data-binding-in-javascript)

[Javascript实现简单的双向绑定 ](http://www.cnblogs.com/shytong/p/5080900.html)

[用原生js实现数据双向绑定](http://blog.csdn.net/huang100qi/article/details/50395904)





