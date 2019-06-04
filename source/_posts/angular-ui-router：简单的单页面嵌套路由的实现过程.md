---
title: angular ui-router：简单的单页面嵌套路由的实现过程
date: 2017-10-11 22:58:03
tags:
    - angular ui-router
categories: angular
---
写在前面：
---
ui-router是angular的一个插件，因为angular前面几个版本自带的原生ng-router不能很好的满足开发需求，所以在实现angular单页面嵌套的时候，都是使用ui-router。本文是的内容关于angular ui-router实现过程，内含demo以及代码地址，需要的朋友可以过来参考下，喜欢的可以点波赞，或者关注一下本人，ui-router的实现过程并不复杂，希望通过本文大家能够学会ui-router的使用方法。

ui-router与ng-router：
---
UI-Router是angular原生ng-route进化版，相较与ng-router有如下两条优点：

1. 视图不能嵌套,这意味着$scope会发生不必要的重新载入。

2. 同一URL下不支持多个视图。这一需求也是常见的：我们希望导航栏用一个视图（和相应的控制器）、内容部分用另一个视图（和相应的控制器）。

最终实现demo效果
---

![](https://dn-mhke0kuv.qbox.me/1035fc96102e99ed0631.gif)

AngularJS单页面实现原理：
---

AngularJS 路由允许我们通过不同的 URL 访问不同的内容，通常我们的**URL形式**为http://runoob.com/first/page ，在单页Web应用中 AngularJS 通过** # + 标记 **实现，例如：

```
http://runoob.com/#/first
http://runoob.com/#/second
http://runoob.com/#/third
```

1. 当我们访问这上面任意一个链接的时候，向服务端**请求的都是同一个地址**： http://runoob.com/
2.  **#号之后的内容**在向服务端请求时会**被浏览器忽略掉**
3.  路由就通过** # + 标记**帮助我们**区分不同的逻辑页面并将不同的页面绑定到对应的控制器上**，如下图所示：

    ![不同的视图页面对应不同的控制器](https://dn-mhke0kuv.qbox.me/6fe0883403f7cb72acd7)


### [demo地址](https://obkoro1.github.io/article-demo/2017/uiRouter/index.html#/PageTab/Page3)

---

ui-router实现过程
===

 1、创建页面：
---
要实现上文那个demo效果，我们需要创建如下页面：

1. app.js
    这是路由的配置页面
2. index.html
    通常叫做index.html是单页面的首页，里面导入了各种css样式、库，插件，框架之类的。
3. PageTab.html
    进入index.html首先展示的视图页面，下面几个是PageTab下面的嵌套页面
4. Page-1.html
5. Page-2.html
6. Page-3.html

代码上传到github上面了，需要的朋友可以自行查看： [代码地址](https://github.com/OBKoro1/article-demo/tree/master/2017/uiRouter)

**注：**angular用的是：1.4.6，ui-router用的是1.0

ps：现在angular4，自带的原生ng-router好像也已经支持了多层嵌套。但是因为还没流传开，市面上，大多还是1.4，所以还是需要用到ui-router。

 2、在index.html里面导入js文件
---

````
<script src="https://cdn.bootcss.com/angular.js/1.4.6/angular.js"></script>
<script src="https://cdn.bootcss.com/angular-ui-router/1.0.0-rc.1/angular-ui-router.min.js"></script>
<script src="App.js"></script>
````
1.angular文件，2.ui-router插件,3.路由js页面

#### 注意：angular文件必须在ui-router前面，因为ui-router是依赖angular的插件。

这几个文件是最基本的页面，如果是一个**完整的angular单页面项目**的话，**index,html**是这幅样子：

![](https://dn-mhke0kuv.qbox.me/a7e76d330ad49be344e8)

在单页面中，不管你从哪个视图查看网页代码，都是这样子，第一次看的都醉了！

 3.app.js
---

**app.js声明了AngularJS模块和路由配置**。当页面加载的时候我们会在index.html中显示PageTab.html的内容。具体代码如下，每一个关键的地方都有相应的**注释注释注释**：
````
var myApp = angular.module("myApp", ["ui.router"]);
//这里叫做App模块，这将告诉HTML页面这是一个AngularJS作用的页面，并把ui-router注入AngularJS主模块，它的内容由AngularJS引擎来解释。
myApp.config(function ($stateProvider, $urlRouterProvider) {
    //这一行声明了把 $stateProvider 和 $urlRouteProvider 路由引擎作为函数参数传入，这样我们就可以为这个应用程序配置路由了.
    $urlRouterProvider.when("", "/PageTab");
    //如果没有路由引擎能匹配当前的导航状态，默认将路径路由至 PageTab.html, 那它就像switch case语句中的default选项.就是一个默认的视图选项
    $stateProvider
        //这一行定义了会在main.html页面第一个显示出来的状态（就是进入页面先加载的html），作为页面被加载好以后第一个被使用的路由.
        .state("PageTab", {//导航用的名字
            url: "/PageTab",//#+标识符，这里就是url地址栏上面的标识符，通过标识符，进入不同的html页面
            templateUrl: "PageTab.html"//这里是html的路径，这是跟标识符相对应的html页面
        })
        .state("PageTab.Page1", {//引号里面代表Page1是PageTab的子页面，用.隔开
            url:"/Page1",
            templateUrl: "Page-1.html"
        })
        .state("PageTab.Page2", {//需要跳转页面的时候，就是用这双引号里面的地址
            url:"/Page2",
            templateUrl: "Page-2.html"
        })
        .state("PageTab.Page3", {
            url:"/Page3",
            templateUrl: "Page3.html"
        });
});
````
现在已经成功把appjs实现出来，然后需要在html里面定义视图，以及视图跳转链接

 4.html定义视图
---

现在要把我们写好的html视图页面在页面中展示出来，我们来看看index.html里面的代码：
````
<body data-ng-app="myApp">
<!--ui-router的html代码-->
<div data-ui-view=""></div>
<!--这里要引入上面说的文件-->
</body>
<html>
````
#### 在ui-view=""的双引号里面，ui-view展示的页面是根据app.js设置的url对应的html来展示的。

### 嵌套页面跳转：

1. 导航里面的名字必须是“**父页面的名字.子页面的名字**”
比如：
````
  .state("PageTab", {//这里是名字
            url: "/PageTab",
            templateUrl: "PageTab.html"
        })
        .state("PageTab.Page1", {//意思是PageTab视图下面的Page1视图
            url:"/Page1",
            templateUrl: "Page-1.html"
        })
````
2. 在html里面，用**ui-sref**进行跳转
    demo代码栗子：
    ````
 <div>
        <h1>下面这几个按钮是在主页面下面再嵌套一层的页面</h1>
        <!--ui-sref跳转-->
        <span style="width:100px" ui-sref=".Page1"><a href="">Page-1</a></span>
        <span style="width:100px" ui-sref=".Page2"><a href="">Page-2</a></span>
        <span style="width:100px" ui-sref=".Page3"><a href="">Page-3</a></span>
    </div>
    <div>
        <!--PageTap嵌套的视图html展示的地方-->
        <div ui-view=""/>
    </div>
    ````

如果觉得不太明白可以点击下面的代码地址，将代码复制到本地，自己多试一试，应该就明白了：
[demo地址](https://obkoro1.github.io/article-demo/2017/uiRouter/index.html#/PageTab/Page3)、[demo代码地址](https://github.com/OBKoro1/article-demo/tree/master/2017/uiRouter)

---

写在后面：
---

现在只是一个最简单的使用方式，本来想在写一些深一点的使用方式（内容：路由的其他参数、路由懒加载引用文件、路由视图页面传递参数），写了好久，结果发现还是需要demo结合起来写，比较清楚，等我写好了在下面加个链接。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！因为我经常看不懂别人写的分享，所以个人写文比较偏小白，写的不好之处，欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**ps**：目前**待业**，**城市：杭州/北京（纠结中）**，本人适应互联网快节奏，高强度的工作状态，认真，严谨，学习积极性强。**中小公司大佬求带走**，邮箱：obkoro1@foxmail.com。
**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **

### 参考资料：
[AngularJS 路由,菜鸟教程](http://www.runoob.com/angularjs/angularjs-routing.html)
[深究AngularJS——ui-router详解](http://blog.csdn.net/zcl_love_wx/article/details/52034193)\
[AngularJS ui-router (嵌套路由)](http://www.oschina.net/translate/angularjs-ui-router-nested-routes)
