---
title: '在 vue-cli 脚手架中引用 jQuery、bootstrap 以及使用 sass、less 编写 css [vue-cli配置入门]'
date: 2017-10-11 23:07:00
tags:
    - vue-cli配置
categories: vue-cli
---
写在前面：
---
本文是[vue-手摸手教你使用vue-cli脚手架-详细步骤图文解析](https://juejin.im/post/597eee92f265da3e2e56e37c)之后，又一篇关于vue-cli脚手架配置相关的文章，因为有些文章步骤不够清晰，当时我引入JQuery、bootstrap的时候颇费了一番功夫，所以本文的步骤会尽量详细一点。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

引入bootstrap
---
### 1. 下载所需要的bootstrap文件。
将要使用的bootstrap文件放入src目录下的assets文件夹中。
### 2. 在入口文件src/main.js中引入bootstrap
    import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
    import './assets/bootstrap-3.3.7-dist/js/bootstrap.min'//根据自己文件夹路径选择路径
这样就可以在vue项目中使用bootstrap的样式了，直接在class中使用即可，如下图按钮样式。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

---

引入jquery
---
### 1. 下载jquery依赖。
        npm install jquery --save
本来我下载的jQuery依赖包，但是出现了一个警告：
![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
这里出现了一个警告，意思是说`弃用jQuery@1.7.4,请使用“jquery”(全小写)。`，然后我就换成全小写的jquery。
### 2. 修改配置
1. 位置：build文件夹下的webpack.base.conf.js文件。
    加入webpack对象：
        var webpack = require("webpack");
2. 位置：build文件夹下的webpack.base.conf.js文件（原来的位置），在下方module.exports对象里面加入。
         plugins: [// 3. 配置全局使用 jquery
            new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery"
        })],
![如图所示](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
3. 没有第三步，现在已经可以**直接在组件中使用jquery的方法**了，**不用在其他位置引用jquery**，就是这么轻松加愉快。

### 3. 使用JQ插件

关于这一点查阅了很多资料，几乎没什么文献清楚的说明jq插件的使用方式，以至于很多使用vue很久的大佬们，也不知道jq的插件竟然可以直接在vue-cli中使用。。这一步虽然是简单的，但这里还是提一下，为各位提供一些参考。

### 使用方式：
jq插件只需要将插件所需要的文件下载到本地src/assets或者最外层的static文件夹中，然后将插件的文件引用进组件，根据插件封装的方法来进行调用就行了，跟直接使用jq的插件基本上是一毛一样的。

### 下面是一个引用jq插件的demo示例：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

---

关于css的部分
---
在vue-cli中使用sass、less来编写css样式，步骤十分简洁，因为vue-cli已经配置好了sass、less，我们要使用sass或者less直接下载两个模块，然后webpack会根据 lang 属性自动用适当的加载器去处理。
### css
1. 直接上手写样式即可，使用css规则。
2. 引用外部css文件的写法。
        <style lang="css">
        @import './index.css'
        </style>
        或者
        <style lang="css" src="./index.css"></style>

### 如果需要使用sass
1. 安装sass模块
        npm install node-sass --save-dev
        npm install sass-loader --save-dev
2. 在组件的style部分使用内联写法
        <template></template>
        <script></script>
        <style lang="scss" scoped>//在这个部分添加lang="scss"
        //sass样式
        </style>
3. 引用sass外部文件的写法。
        <style lang="scss" src="./index.scss"></style>

### 如果需要使用less
1. 安装less模块
        npm install less --save-dev
        npm install less-loader --save-dev
2. 在组件的style部分使用内联写法
        <template></template>
        <script></script>
        <style lang="less" scoped>//在这个部分添加lang="less"
        //less样式
        </style>
3. 引用less外部文件的写法。
        <style lang="less" src="./index.less"></style>

---

结语：
---

仔细阅读，按步骤来基本上可以配置成功。**如果有哪个地方写的不够清楚的，欢迎指正。**本文面向小白，写着玩，大手请轻喷。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！写文偏小白，写的不好之处，欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **

### 参考资料：

[ vue-cli快速构建项目以及引入bootstrap、jq](http://blog.csdn.net/tanhao_282700/article/details/68955607)
[vue中引入jQuery和Bootstrap](http://www.cnblogs.com/xiaofenguo/p/6605302.html)
[Vue-cli单文件组件引入less、sass、css样式的不同方法](http://blog.csdn.net/itKingOne/article/details/74729508)

以上2017.8.10










