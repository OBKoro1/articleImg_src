---
title: vue先hash 模式部署项目，然后开启histroy模式 ，引发的几个问题以及histroy模式的开启方式、优点
date: 2017-12-25 00:48:11
tags:
- Vue
- Vue-cli 
- Vue-router 
categories: Vue
---
前言：
---
vue路由有一个[HTML5 History 模式](https://router.vuejs.org/zh-cn/essentials/history-mode.html),这个模式要在路由里面另外开启的，很多人在刚使用路由的时候之前不知道这个模式，所以并没有启用，然后就把项目部署上去了，因为这个模式还是有挺多优点的，最后还是会开启这个模式。

然而因为**之前使用hash模式再改为histroy模式还是有些问题的**，我已经踩过坑了，然后把这几个问题写出来。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

> 本文首发于我的个人blog：[obkoro1.com](http://obkoro1.com/)

### 开启history模式：

如果不开启的话，路由默认是hash模式，开启这个模式前端的工作也很简单，如下：

        mode: 'history' //在路由那里配置一下这个

最后需要后端的做一些配置配合，这里可以参考一下文档给的[栗子](https://router.vuejs.org/zh-cn/essentials/history-mode.html)。

## history模式的优点:

1. url变成真正的url，url看上去更好看。

        http://yoursite.com/#/a/b  //hash模式
        http://yoursite.com/a/b  //history模式
2. 可以使用vue-router的[滚动行为](https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html)，这个用来记忆进入其他页面之前的位置非常好用，配置一下就可以直接使用了，前提是开启histroy模式。
![](https://user-gold-cdn.xitu.io/2017/12/24/160885359af4ff1e?w=1062&h=271&f=png&s=35110)

3. 类似[项目引入微信js-sdk](http://obkoro1.com/2017/12/16/vue-%E9%A1%B9%E7%9B%AE%E5%A6%82%E4%BD%95%E5%BC%95%E5%85%A5%E5%BE%AE%E4%BF%A1sdk%EF%BC%8C%E4%BD%BF%E7%94%A8%E5%BE%AE%E4%BF%A1%E5%88%86%E4%BA%AB%E6%8E%A5%E5%8F%A3/)的时候，一些操作是对url是有要求，url不能带上'#'，如果没有开启histroy模式，很可能会导致问题。

4. 像vue-cli的配置，都是以路由开启history模式的标准来配置的（下面会讲到一个栗子），没有开启的话，自己要另外配置。

## 先hash模式，后histroy模式

就像开头说的，这里的问题指的是：**先用hash模式部署项目到线上，然后再开启histroy模式**，由此引发的一些问题。

### 1.找不到资源问题：

**在hash模式下面，直接打包的话，会导致找不到css、js和图片资源**，然后经过百度之后，做出了如下截图的配置操作，更改`assetsPublicPath：'/'`为 `assetsPublicPath：'./'`

![](https://user-gold-cdn.xitu.io/2017/12/24/16088625b417b4ac?w=872&h=382&f=png&s=43320)

在hash模式下，像上面那么配置就没有问题了。当时我还以为vue-cli配置有问题，实际上，人家才没有问题呢，是我们自己没有开启history模式的问题。

然后开启了histroy模式之后，因为我们之前更改了assetsPublicPath属性，所以要把那个`.`给去掉，改回来：`assetsPublicPath：'/'`

### 2.请求带上路由，导致请求失败

#### 正确的请求是：

        http:www.xxx.com/api/接口 //api是我通过proxyTable转发地址的代理名字

#### 开启histroy模式之后：

在二层的路由里面会出现这种情况：

        路由是：http:www.xxx.com/a/b
        http:www.xxx.com/api/a/接口 //这就导致了请求失败，要把a也去掉才是正确的

解决方式是：

因为我用的是[axios](https://www.kancloud.cn/yunye/axios/234845)，所以可以在[全局请求](https://juejin.im/post/59fd982c6fb9a045170490df)中设置一个baseURL，这个baseURL就是项目的网站地址（http:www.xxx.com）,然后二层的路由也会自动去掉前面的a和b。

### 3.cookie问题

这个实际上不是个问题，完全是自己作的，**我把项目分为两层。所以从a登录，b那边刷新就会出现没有cookie的情况**。
    
        两层路由
        http://yoursite.com/a
        http://yoursite.com/b

这里是因为cookie能否拿到跟存储的路由位置是有关的，之前使用hash模式因为hash模式的url`http://yoursite.com/#/a/b`，会统一存在http://yoursite.com下面。

而history模式cookie就会存在`http://yoursite.com/a`或者`http://yoursite.com/b`下面，另外一边就会没有cookiie。

#### 解决办法：

1.  不要分为两层，统一所有的路由都在一个路由地址下面。
2.  在项目的路由的根地址`path:'/'`里面存cookie。
3.  使用sessionStorage存信息，我就是用这个方法，[使用方法](http://obkoro1.com/2017/11/25/cookie%E3%80%81localStorage%E5%92%8CsessionStorage%20%E4%B8%89%E8%80%85%E4%B9%8B%E9%97%B4%E7%9A%84%E5%8C%BA%E5%88%AB%E4%BB%A5%E5%8F%8A%E5%AD%98%E5%82%A8%E3%80%81%E8%8E%B7%E5%8F%96%E3%80%81%E5%88%A0%E9%99%A4%E7%AD%89%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F/)。
  
      sessionStorage只要在http://yoursite.com都可以访问的到，不管是存在a上面还是b上面。

后话
---
以上就是本文的所有内容，建议项目一开始还是直接跟后端说一下，开启histroy模式，省得后面的种种坑。上面的内容都是本人亲自踩坑之后的血泪教训，希望可以帮助到需要的朋友，然后祝大家圣诞节快乐。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**[个人blog](http://obkoro1.com/)** and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)**  

以上2017.12.25