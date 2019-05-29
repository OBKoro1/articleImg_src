---
title: Vue-cli 使用json server在本地模拟请求数据
date: 2017-11-01 13:55:01
tags:
 - vue-cli配置
 - 工具
 - axios
categories: 工具类
---
写在前面：
---
开发的时候，前后端不论是否分离，接口多半是滞后于页面开发的。所以建立一个REST风格的API接口，给前端页面提供虚拟的数据，是非常有必要的。json server 作为模拟工具，因为设置简单，容易上手。本文是做一个简单的上手介绍，有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

> 本文首发于我的个人blog：[obkoro1.com](http://obkoro1.com/)

### json server 工具:

在后台还没给接口之前，使用JSON-Server搭建一台JSON服务器，将接口要返回的数据放在json文件里面。然后请求这些数据，这样我们可以先做一些东西，等后台接口好了之后直接替换就可以了，不必一直傻傻的等后端的接口。

#### 安装：
        npm install json-server --save //json server
        npm install axios --save //使用axios发送请求

#### json文件：

创建一个json文件，起名叫db.json，文件放置在跟index.html平级的目录中，也可以放置在static文件夹中，db.json文件里面的内容，是一个对象。

### 设置：

位置： build/dev-server.js

        //json-server 假数据
        var jsonServer = require('json-server') //引入文件
        var apiServer = jsonServer.create(); //创建服务器
        var apiRouter = jsonServer.router('db.json') //引入json 文件 ，这里的地址就是你json文件的地址
        var middlewares = jsonServer.defaults(); //返回JSON服务器使用的中间件。
        apiServer.use(middlewares)
        apiServer.use('/json',apiRouter)
        apiServer.listen( port + 1,function(){ //json服务器端口:比如你使用8080,这里的json服务器就是8081端口
          console.log('JSON Server is running')  //json server成功运行会在git bash里面打印出'JSON Server is running'
        })

如图所示：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### 请求接口代理：

    proxyTable: {
      '/api': {
        target: 'http://localhost:8081/',  // 通过本地服务器将你的请求转发到这个地址
        changeOrigin: true,  // 设置这个参数可以避免跨域
        pathRewrite: {
          '/api': '/'
        }
      },
    },

如下图所示：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### npm run dev启动项目可以访问到你的json文件：

现在服务器已经成功启动，在地址栏输入 localhost:8081，就可以看到的json文件，加上相应后缀即可访问文件里面的数据。下面几张图片出自：[biubiubiuzzz](http://blog.csdn.net/biubiubiuzzz/article/details/78066621)

jsonserver服务器：

![jsonserver服务器](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

json数据：
![json数据](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

## axios请求json数据：

光看到这些数据可不行，我们还需要发起请求，请求到这些数据，然后执行各种各样的骚操作。

### main.js文件中：

    import axios from 'axios';//引入文件
    Vue.prototype.$ajax = axios;//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$ajax使用

在组件中的使用方式，比如：

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

### JSON-Server只接受GET请求，GitHub上提到：

If you make POST, PUT, PATCH or DELETE requests, changes will be automatically and safely saved to db.json using lowdb.

lowdb介绍： http://www.jianshu.com/p/11d04a4c22af

### 文档：

附上[json server](https://github.com/typicode/json-server)的github，和[axios](https://www.kancloud.cn/yunye/axios/234845)的中文文档，大家可以进去研究一下。

json server设置和使用起来还是蛮方便的，大家感兴趣的话，可以跟着文章设置一波。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
[blog网站](http://obkoro1.com/)  and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **

以上2017.11.1

### 参考资料:

[JSON-Server使用](http://blog.csdn.net/u012911742/article/details/73162761)
[ vue-cli下配置json-server](http://blog.csdn.net/biubiubiuzzz/article/details/78066621)






