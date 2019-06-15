---
title: 在Vue-cli里基于axios封装复用请求
date: 2017-11-05 15:54:18
tags:
 - axios
 - axios封装
categories: vue-cli
---
写在前面：
---
自从Vue2.0推荐大家使用 axios 开始，axios 被越来越多的人所了解。使用axios发起一个请求对大家来说是比较简单的事情，但是axios没有进行封装复用，项目越来越大，引起的代码冗余。就会非常麻烦的一件事。所以本文会详细的跟大家介绍，如何封装请求，并且在项目组件中复用请求。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

> 本文首发于我的个人blog：[obkoro1.com](http://obkoro1.com/)

### 安装

只用安装一个axios就可以了。

    npm install axios --save

### 接口代理设置

为了请求可以正常发送，我们一般要进行一个接口代理的配置，这样可以避免请求跨域，项目打包之后，后端一般也要搭建一个nginx之类的东西进行转发请求，不然请求会因为跨域问题失败的。

    //文件位置：config/index.js
    proxyTable: {
      '/api': {
        target: 'http://47.95.xxx.246:8080',  // 通过本地服务器将你的请求转发到这个地址
        changeOrigin: true,  // 设置这个参数可以避免跨域
        pathRewrite: {
          '/api': '/'
        }
      },
    },

![](https://user-gold-cdn.xitu.io/2017/10/31/3af73c621b7523aa0f3a2fd95d1bd38c)

设置好了之后，当你在项目中要调用`http://47.95.xxx.246:8080`这个服务器里面的接口，可以直接用`/api`代替服务器地址。

发起请求
---

### main.js入口文件中：

    import axios from 'axios';//引入文件
    Vue.prototype.$http = axios;//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$http使用
### 没有封装发起请求：

    //没有封装的时候，在组件中发起请求的方式：
       this.$ajax({
           url:'/api/articles',//api 代理到json文件地址，后面的后缀是文件中的对象或者是数组
           method:'get',//请求方式
           //这里可以添加axios文档中的各种配置
         }).then(function (res) {
           console.log(res,'成功');
         }).catch(function (err) {
           console.log(err,'错误');
         })
    //还可以像下面这么简写
      this.$ajax.get('api/publishContent').then((res) => {
       console.log(res,'请求成功')
      },(err)=>{
        console.log(err,'请求失败');
      });

封装请求
--

封装的时候，我通常喜欢把请求抽象成三个文件，文件位置放在src中，只要你能引用到，就没问题，如下图所示：

![](https://user-gold-cdn.xitu.io/2017/11/4/0eaae692ac8801448a0a7300206d6144)


创建三个.js文件，里面我都很认真的注释了，我就直接贴图片了，在文末我把这三个文件的地址发出来，需要的小伙伴自取。

fetch.js：


![](https://user-gold-cdn.xitu.io/2017/11/5/3cd9e9f1ebe11929f940d567870b4ec9)

url.js:

![](https://user-gold-cdn.xitu.io/2017/11/5/f70bfc90db9cb1c40725e179efbd4ab5)

api.js


![](https://user-gold-cdn.xitu.io/2017/11/5/250690aa2ca666b6ef48f69483731ae0)

### 在组件里面如何使用接口：

![](https://user-gold-cdn.xitu.io/2017/11/5/2ba68f2fad37c0285aeb0ba9e6e86a1e)

### 封装axios文件地址在这里：[传送门](https://github.com/OBKoro1/article-demo/tree/master/2017/axios)

代码注释什么的，已经蛮多了，跟着文章一步一步走，实现封装axios请求，没毛病的。本文并没有把很多功能都完整的列出来，主要是追求一个上手，剩下的东西，各位小伙伴们可以自行研究。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
[blog网站](http://obkoro1.com/)  and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **

以上2017.11.5