---
title: range滑块自定义样式，步骤详解以及实际应用
date: 2017-10-11 22:35:25
tags:
    - css
categories: css
---
写在前面：
---
本文的主要内容包括：type="range"属性介绍，修改range默认css样式以及在js中的实际应用。本文面向前端小白，写的不好之处，请多多见谅。文末有demo链接，可以自行复制到本地进行试验。

相关：[自定义 range radio select的样式滑轮，按钮，选择框](https://juejin.im/post/58f1f76e44d904006cf2482d)

最终要实现的效果：
---

![其中包括一部分js代码](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

步骤：
---
### 1.range属性相关介绍
### 2.搭建html结构；
### 3.css样式修改，包括给滑动轨道添加样式、给滑块添加样式；
### 4.添加相关js代码实现应用效果;
### 5.关于浏览器兼容。

---

### 在html里面输入如下内容，即可使用：

````
<input type="range">//这是最粗糙的使用方式
````
### range在各个浏览器中的默认样式：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### range属性相关：

range 输入类型用于应该包含指定范围值的输入字段。
range 类型显示为滑块。
您也可以设置可接受**数字的范围限制：**
````
<input type="range" name="points" min="1" max="10" />//max为最大的值，min为最小的值
````
### html5 range 类型的限定：


![html5关于range的属性](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### HTML DOM Input Range 对象（js获取dom）


![js获取dom可以看看，到时可以查阅相关资料](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

---



### 搭建html结构：

````
<div class="js-2-1section3">
    <div class="js-2-1section3-div1">
        <span class="js-2-1section3-div1-span1">玩家人数</span>
        <input type="text" class="player-num" id="player"  value="6"  max="18" min="6" onblur="on_change()">
         <!--onblur是当对象失去焦点的时候执行的函数-->
        <span class="js-2-1section3-div1-span1">人</span>
    </div><!--上面这部分是玩家人数方框的html-->
    <div class="js-2-1section3-div2">
        <button class="btn-sub" id="btnSub" onclick="less()" ></button><!--减value的按钮-->
        <input type="range" class="slider-block" id="slider" max="18" min="6" step="1" value="6" onchange="moveChange()">
        <!--onchange是当对象发生变化时执行的函数-->
        <button class="btn-add" id="btnAdd"  onclick="plus()"></button><!--加value的按钮-->
    </div>
</div>
````
### 解析：
1.考虑到文章篇幅，html其他标签自行补全。

2.上面中，代码注释已经注释的很清楚了，**不明白的多看几遍代码**，然后也可以百度一下相关属性之类的。

3.**滑块里面设置value="6"的作用**是浏览器进入时候滑块在最小值，也就是最左侧的地方，否则默认在中间

4.step="1"意思是，滑块每次动态改变的数值。

5.关于代码中js部分，**还没学js的小伙伴们，可以跳过，不影响修改滑块的默认样式的。**


![再放一下最终实现的效果，省的翻页麻烦](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
### css样式修改：

下面是玩家人数的css样式（不重要，可以跳过）：
````
        body{
            width: 50%;
            margin:5rem auto 0;
        }
        div{
            margin: 2rem;
        }
        .js-2-1section3{
            background: #fff;}
        .js-2-1section3-div1{
            margin-left: 2rem;}
        .player-num{
            font-size: 1.8rem;
            margin:0 0.6rem;
            background: #f4f5f5;
            padding: 0.2rem 0.6rem;
            color: gold;
            width: 9%;
            border: none;
            outline: none;
        }
        span{
            display: inline-block;
            font-size: 1.8rem;
            color: #444;
        }

        .js-2-1section3-div2{
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 1.6rem 0;
        }

        /*上面是玩家人数的css样式*/
````
### 修改滑块样式的css代码(重点)：
````
        #slider{ /*设置滑块下面那条线的样式*/
            outline: none; /*去掉点击时出现的外边框*/
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none; /*这三个是去掉那条线原有的默认样式，划重点！！*/
            width: 30%;
            height: 0.3rem;
            background: orange;
            /*这三个是设置滑块下面那条线的样式*/
        }
        input[type="range"]::-webkit-slider-thumb {
            /*::-webkit-slider-thumb是代表给滑块的样式进行变更*/
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none; /*//这三个是去掉滑块原有的默认样式，划重点！！*/
            -webkit-box-shadow:0 0 2px ; /*设置滑块的阴影*/
            width: 2.6rem;
            height:1.6rem;
            background: url("images/js2-d_03.png");
            background-size: cover;
            /*//这几个是设置滑块的样式*/
        }
        <!--上面是修改滑块和滑块轨道的样式，下面是左右两边按钮的css样式-->

        .btn-sub{ /*这里是左边减按钮的css样式*/
            outline: none;
            border: none;
            cursor: pointer;
            background: url("images/js2-f_03.png");
            background-size: 100%;
            width: 1.8rem;
            height: 1.8rem;
        }
        .btn-add{ /*这里是右边+按钮的css样式*/
            outline: none;
            border: none;
            cursor: pointer;
            background: url("images/js2-e_03.png") no-repeat;
            background-size: 100%;
            width: 1.8rem;
            height: 1.8rem;
        }
    <!--css代码写的有点乱，见谅啊。-->
````
### 解析：
1.代码注释里面已经很清楚了，不清楚多看几遍代码。
2.文末有demo链接，可以自行复制到本地进行试验。

以上是修改css样式到上面放的图片效果。

---
扩展：使用js完成实际应用
----
````
      var oPlayerNum = document.getElementById("player");//玩家总人数
    var osliderBlock = document.getElementById("slider");//滑块的值
    function on_change() {
        if (oPlayerNum.value >= 6 && oPlayerNum.value <= 18) {//设置方框里面玩家人数范围
            osliderBlock.value=oPlayerNum.value ;//将玩家总人数赋值给滑块的值，实现动态变化
        } else {
            alert("请输入正确的人数6~18");
            oPlayerNum.value=6;
            osliderBlock.value=6;
    //人数超出范围的话，弹出警告框，并且将方框和滑块的值重置为6
        }
    }
    function moveChange() {// 滑块的值改变，运行这个函数
        oPlayerNum.value=osliderBlock.value;
        //滑块的值改变的话，滑块的值赋值给方框，实现动态变化
    }
    function less() {
        oPlayerNum.value--;
        //减的按钮，减掉玩家总人数的值
        if (oPlayerNum.value<6){
            alert("人太少了，再找几个小伙伴来吧");
            oPlayerNum.value=6;
            //人数超出范围的话，弹出警告框，并且将方框和滑块的值重置为6
        }
        else {
            osliderBlock.value=oPlayerNum.value;// 将玩家人数赋值给滑轮的值
        }
    }
    function plus() {
        oPlayerNum.value++;
        //加的按钮，减掉玩家总人数的值，上面的值已经相互关联了，所以方框的值改变，滑块的值也会改变
        if (oPlayerNum.value>18){
            alert("人太多了，可以分一批人再开一局");
            oPlayerNum.value=18;
            //人数超出范围的话，弹出警告框，并且将方框和滑块的值重置为18
        }
        else {
            osliderBlock.value=oPlayerNum.value;// 将玩家人数赋值给滑轮的值
        }
    }
````
ps：
1.特地重新再打一遍注释，注释里面说的蛮清楚了，还没学js的小伙伴别灰心，先mark起来，等以后学会了，再回头看看。
2.文末有demo链接，可以自行复制到本地进行试验。


### 关于浏览器兼容的问题：还未完成的效果，滑块填充效果。

ps：关于浏览器兼容这块儿，还没研究好（下面有篇文章是讲**浏览器兼容**的）。**以上只针对谷歌浏览器**，因为range是html5新出的属性，w3c还没出标准属性，各个浏览器的方法不一样，这块儿有点麻烦。但我记在笔记里面了，今后研究清楚了，再回来更文。

![三个浏览器的不同效果](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
关于滑块的填充效果，各个浏览器都不一样**Chrome**浏览器中不支持直接设置进度条，要借助js。而在IE 9以上的浏览器中可以使用::-ms-fill-lower 和 ::-ms-fill-upper来自定义进度条；在Firefox浏览器中则可以通过::-moz-range-progress来自定义；今天下午研究了一阵子，只弄出了一个ie的填充效果，没研究清楚，可能过段时间会再回来更新。（有兴趣的小伙伴可以研究一下，相互交流交流。）

![IE演示的](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)


#### 以下是I兼容E浏览器的滑块
````
  /*以下是I兼容E浏览器的滑块，还有一些问题，不过现在没空再弄了。等到有空了再解决清楚。*/
        input[type=range]::-ms-fill-lower {//::-ms-fill-lower这是ie兼容range的属性写法下面那个同理
            /*进度条已填充的部分*/
            height: 22px;
            border-radius: 10px;
            /*background: black;*/
            background: linear-gradient(to right, #059CFA, white 100%, white);
        }

        input[type=range]::-ms-fill-upper {
            /*进度条未填充的部分*/
            height: 22px;
            border-radius: 10px;
            background: red;
        }
````

这里有篇关于range的文章，里面有**浏览器兼容**的内容，我没弄清楚：[自定义(滑动条)input[type="range"]样式](http://blog.csdn.net/u013347241/article/details/51560290)

**range-demo链接**：https://obkoro1.github.io/article-demo/diy-style/range-diy.html

后话：
---
昨天说好的要详细更新，range、radio、select这三类的文章，今天如约更好了range部分，后面几天应该还会持续更文。不说了，要打球去了^_^。

**最后：**希望看完的朋友点个**喜欢**，也可以**关注**一下我，现在这阶段基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。写的不好之处，欢迎指点。码字不易，感谢支持！
**ps**：目前待业，坐标北京，求推荐工作。然后希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[](http://www.jianshu.com/u/8d1dd8c80f06)**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)  ，**[**简书主页链接**](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1) ，[github](https://github.com/OBKoro1) 。**

以上。2017.4.16