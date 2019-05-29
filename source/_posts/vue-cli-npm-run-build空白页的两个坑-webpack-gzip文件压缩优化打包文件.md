---
title: vue-cli npm run build空白页的两个坑 webpack gzip文件压缩优化打包文件
date: 2017-10-11 23:10:07
tags:
    - build空白页
    - gzip文件压缩
categories: vue-cli
---
写在前面：
---
npm run build 是vue-cli用来打包项目的命令行，本文是关于vue-cli打包的一些常见的坑，会尽量详细的写每个步骤，大家可以一边看着文章，一边打包试试。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

初始化一个项目：
---

这里初始化一个项目，因为导致打包错误的原因多种多样，避免因为其他设置错误干扰，**从头开始打包整体步骤也会更加清晰**。

### 命令行：

    vue init webpack build1(项目名)
    //吧啦吧啦进行一波设置
    //进入项目文件夹
    npm install

如果还不清楚如何初始化运行一个项目，可以参考我之前写的一篇文章：[传送门](https://juejin.im/post/597eee92f265da3e2e56e37c)。

开始打包踩坑
---
### 命令行：
    //直接打包
    npm run build

### 打包出来的文件

![vue-cli项目文件打包位置](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### 第一个坑：文件引用路径

现在项目我们什么都没动，是初始化之后直接打包的状态，打开dist/index.htmnl文件整个网页都是一片空白的。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

打开调试，发现有一排报错说是：`不能加载到资源`，后面就发现**路径的问题**，仔细看上面再看上面加载的css的引用路径，这里是有问题的。

### 爬坑：

**文件位置：**config文件夹/index.js文件

#### 1.更改assetsPublicPath属性：

文件里面有两个assetsPublicPath属性，更改第一个，也就是更改build里面的assetsPublicPath属性：

    assetsPublicPath:'/'//false
    assetsPublicPath:'./'//true

assetsPublicPath属性作用是指定编译发布的根目录，**'/'指的是项目的根目录 ，'./'指的是当前目录。**


#### 2.改好设置之后，重新打包。

打开打包文件：

![重新打开index.html](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 错误原因：

![dist文件夹](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

打包出来所有的文件都会放在dist的static文件夹下面，index.html要加载文件，那么问题来了，'/'指的是项目的根目录 ，'./'指的是当前目录。要选哪个？当然选择原谅她了。

### 第二个坑：路由history模式。

这个坑是当你使用了路由之后，**在没有后端配合的情况下就手贱打开路由history模式的时候**，打包出来的文件也会是一片空白的情况，很多人踩这个坑的时候花了很多时间，网上的教程基本上都是说的第一个坑，这个坑很少有人提起。

![图片出自vue-router文档](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 打包之前的样子：

这里我弄了个示例，因为是刚创建的项目没有其他因素干扰，当你打开路由的history模式之后，开发的时候一切正常

![打包之前的路由](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 打包之后的样子：

![打包之后路径也是对的，但是页面一片空白](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 解决方式：

    // mode: 'history',//将这个模式关闭就好

这里并不是说不能打开这个模式，这个模式需要后端设置的配合，详情可以看：[路由文档](https://router.vuejs.org/zh-cn/essentials/history-mode.html)

---

### Gzip 文件压缩

顺带分享一个很6的优化打包的方法，用起来也简单的很，只要下载一个插件，然后打开一个设置就好了。

#### 设置方法：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

这里其实是webpack自带的一个优化打包的方法，打开这个配置后如果没有下载那个插件，会提示你下载，下载就好了。

然后在打包的时候，每个js和css文件会压缩一个gz后缀的文件夹，浏览器如果支持g-zip 会自动查找有没有gz文件 找到了就加载gz然后本地解压 执行。

打开这个配置会之后对整体的打包体积也就是dist文件夹并没有太大的变化。下图来看看他的压缩率以及对加载的提升，可以说是非常大且明显的，大家可以自己试一下就知道多好用了。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)


后话
---
之前自己打包的时候连着踩了不少坑，可能是互相关联的，有时候你并不是错了一个地方，要想想自己其他地方是不是也是错的。上述的内容，算是自己踩坑的一些经验，希望可以帮到大家。


**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **

以上2017.10.10




