---
title: cookie、localStorage和sessionStorage 三者之间的区别以及存储、获取、删除等使用方式
date: 2017-11-25 20:51:07
tags:
 -js
 - html5
categories: js
---
写在前面：
---
前端开发的时候，在网页刷新的时候，所有数据都会被清空，这时候就要用到本地存储的技术，前端本地存储的方式有三种，分别是cookie，localstorage和sessionStorage ，这是大家都知道的。本文的主要内容就是针对这三者的存放、获取，区别、应用场景。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

> 本文首发于我的个人blog：[obkoro1.com](http://obkoro1.com/)

## 使用方式：

很多文档都是说了一大堆，后面用法都没有说，先要学会怎么用，不然后面的都是扯淡，所以这里我先把使用方式弄出来。

### cookie:

**保存cookie值：**

        var dataCookie='110';
        document.cookie = 'token' + "=" +dataCookie; 

**获取指定名称的cookie值**

     function getCookie(name) { //获取指定名称的cookie值
    // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) {
      console.log(arr);
      return unescape(arr[2]);
    }
    return null;
    }
     var cookieData=getCookie('token'); //cookie赋值给变量。

先贴这两个最基础的方法，文末有个[demo](http://obkoro1.com/article-demo/2017/cookieStorage/index.html)里面还有如何设置cookie过期时间，以及删除cookie的、

### localStorage和sessionStorage:

**localStorage和sessionStorage所使用的方法是一样的**，下面以sessionStorage为栗子：

    var name='sessionData';
    var num=120;
    sessionStorage.setItem(name,num);//存储数据
    sessionStorage.setItem('value2',119);
    let dataAll=sessionStorage.valueOf();//获取全部数据
    console.log(dataAll,'获取全部数据');
    var dataSession=sessionStorage.getItem(name);//获取指定键名数据
    var dataSession2=sessionStorage.sessionData;//sessionStorage是js对象，也可以使用key的方式来获取值
     console.log(dataSession,dataSession2,'获取指定键名数据');
    sessionStorage.removeItem(name); //删除指定键名数据
      console.log(dataAll,'获取全部数据1');
     sessionStorage.clear();//清空缓存数据：localStorage.clear();
      console.log(dataAll,'获取全部数据2');  

使用方式，基本上就上面这些，其实也是比较简单的。大家可以把这个copy到自己的编译器里面，或者文末有个[demo](http://obkoro1.com/article-demo/2017/cookieStorage/index.html)，可以点开看看。

## 三者的异同：

上面的使用方式说好了，下面就唠唠三者之间的区别，这个问题其实很多大厂面试的时候也都会问到，所以可以注意一下这几个之间的区别。

### 生命周期：

cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效

localStorage：除非被手动清除，否则将会永久保存。

sessionStorage： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

### 存放数据大小：

cookie：4KB左右

localStorage和sessionStorage：可以保存5MB的信息。

### http请求：

cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题

localStorage和sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信

### 易用性：

cookie：需要程序员自己封装，源生的Cookie接口不友好

localStorage和sessionStorage：源生接口可以接受，亦可再次封装来对Object和Array有更好的支持

## 应用场景：

从安全性来说，因为每次http请求都会携带cookie信息，这样无形中浪费了带宽，所以cookie应该尽可能少的使用，另外cookie还需要指定作用域，不可以跨域调用，限制比较多。但是用来识别用户登录来说，cookie还是比stprage更好用的。其他情况下，可以使用storage，就用storage。

storage在存储数据的大小上面秒杀了cookie，现在基本上很少使用cookie了，因为更大总是更好的，哈哈哈你们懂得。

localStorage和sessionStorage唯一的差别一个是永久保存在浏览器里面，一个是关闭网页就清除了信息。localStorage可以用来夸页面传递参数，sessionStorage用来保存一些临时的数据，防止用户刷新页面之后丢失了一些参数。


## 浏览器支持情况：

localStorage和sessionStorage是html5才应用的新特性，可能有些浏览器并不支持，这里要注意。

![](https://user-gold-cdn.xitu.io/2017/11/25/15ff2d54764e53af?w=861&h=113&f=png&s=9592)

cookie的浏览器支持没有找到，可以通过下面这段代码来判断所使用的浏览器是否支持cookie：

    if(navigator.cookieEnabled) {
      alert("你的浏览器支持cookie功能");//提示浏览器支持cookie  
    } else {
      alert("你的浏览器不支持cookie");//提示浏览器不支持cookie   }

### 数据存放处：

![Cookie、localStorage、sessionStorage数据存放处](https://user-gold-cdn.xitu.io/2017/11/25/15ff2f727028f37b?w=1028&h=378&f=png&s=28065)

### 番外：各浏览器Cookie大小、个数限制。

cookie 使用起来还是需要小心一点，有兴趣的可以看一下这个[链接](https://www.cnblogs.com/henryhappier/archive/2011/03/03/1969564.html)。

### demo链接
把上面的demo代码，上传到github上面了，有需要的小伙伴们，可以看一下。[传送门](http://obkoro1.com/article-demo/2017/cookieStorage/index.html)

后话
---
最后要说的是：不要把什么数据都放在 Cookie、localStorage 和 sessionStorage中，毕竟前端的安全性这么低。只要打开控制台就可以任意的修改 Cookie、localStorage 和 sessionStorage的数据了。涉及到金钱或者其他比较重要的信息，还是要存在后台比较好。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
[blog网站](http://obkoro1.com/)  and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **  

以上2017.11.25

### 参考链接：

[HTML 5 Web 存储](http://www.w3school.com.cn/html5/html_5_webstorage.asp)
[localStorage和sessionStorage详解](http://blog.csdn.net/mafan121/article/details/60133107)
[详说 Cookie, LocalStorage 与 SessionStorage](https://segmentfault.com/a/1190000002723469)