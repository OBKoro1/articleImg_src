---
title: '手摸手教你使用vue-cli脚手架-详细步骤图文解析[vue入门]'
date: 2017-10-11 23:04:43
tags:
    - 初始化vue-cli
categories: vue-cli
---
写在前面：
---
使用 vue-cli 可以快速创建 vue 项目，vue-cli很好用，但是在最初搭建环境安装vue-cli及相关内容的时候，对一些人来说是很头疼的一件事情，本人在搭建vue-cli的项目环境的时候也是踩了相当多的坑，特此写了一篇搭建环境的教程，每一步尽量详细解析。需要的朋友可以过来参考下，喜欢的可以点波赞，或者关注一下本人，希望可以帮到大家。

vue-cli脚手架的优势：
---

 1. 有一套成熟的vue项目架构设计,能够快速初始化一个Vue项目.
 2. [vue-cli](https://github.com/vuejs/vue-cli)是官方支持的一个脚手架，会随本版本进行迭代更新。
 3. vue-cli提供了一套本地的node测试服务器，使用vue-cli自己提供的命令，就可以启动服务器。
 4. 集成打包上线方案。
 5. 还有一些优点，包括：模块化，转译，预处理，热加载，静态检测和自动化测试等，等大家深入使用下去就会发现vue-cli的强大之处。
---

### 本教程是基于windows系统。

下面正式开始搭建vue-cli脚手架。


命令行工具
---
命令行工具是我们操作npm的基础，这个必须要有的，很多教程没有写清楚，那些教程一上来就贴上一大堆命令，当初也不知道在哪里使用命令行工具。。。
#### git bash命令行工具

1. windows下本人推荐使用GitHub的桌面管理工具自带的git bash命令行工具，正常下载安装就可以。

2. [下载地址](https://desktop.github.com/)，下图是下载安装完成之后，git bash的使用方法。

![git bash命令行工具的使用方法](https://user-gold-cdn.xitu.io/2017/8/1/9a10ec89f6a6613a793f4a8a1f1ed294)

ps:当然如果想使用自带的终端cmd命令行工具也是可以，但是毕竟没有git bash来的好用方便。

安装node.js
---

1. 在[node.js中文官网](http://nodejs.cn/download/)正常下载安装node.js就可以，没有什么特别需要注意的点（傻瓜式安装）。

2. 在官网下载安装node.js后，就已经自带npm（包管理工具），不需要另外再进行安装npm了。

3. #### 注意下载node.js版本要在4.0以上，避免版本过低影响使用。

4. 打开命令行工具（随便哪个文件夹），输入命令行 `node -v`，`npm -v`，如下图，如果出现相应的版本号，则说明安装成功。

![检测node npm安装情](https://user-gold-cdn.xitu.io/2017/8/1/d2f7f37faba936f99a249017e065a3e8)

安装淘宝镜像
---
### cnpm（淘宝镜像）相关：
1. 这是一个完整 npmjs.org 镜像，是用来**同步npm上面的模块**。
2. cnpm的同步频率为 10分钟 （**新发布的模块有滞后性**，同步是需要时间的，等不及的可以使用npm）。
3. 安装cnpm的原因：npm的服务器是外国的，所以有时候我们安装“模块”会很很慢很慢超级慢。
4. cnpm的作用：淘宝镜像将npm上面的模块同步到国内服务器，**提高我们安装模块的时间。**
5. 安装完淘宝镜像之后，**`cnpm`和`npm`命令行皆可使用，二者并不冲突**
![截图出自淘宝镜像官网](https://user-gold-cdn.xitu.io/2017/8/3/686a5c34f6c9b89d0b27b16d2378ac77)

安装方法：打开命令行工具，输入命令行：

    $ npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm使用方法:

    $ cnpm install [name]

安装模块的时候，将npm换成cnpm就行，国内很多coder都是使用cnpm的，个人建议大家都装一下，附上：[淘宝镜像网址](http://npm.taobao.org/)、

安装webpack
---
安装方法：打开命令行工具，输入命令行：

    npm install webpack -g
安装成功后输入`webpack -v`,如果出现相应的版本号，则说明安装成功。

安装vue-cli脚手架构建工具
-----
安装方法：全局安装，随便一个文件夹，输入命令行：

    npm install vue-cli -g
安装完成之后，输入命令行`vue -V`查看版本号，出现相应得到版本号即为成功：

![查看vue-cli是否安装成功](https://user-gold-cdn.xitu.io/2017/8/3/eabb4e01fee257f93d466aa9b80d61ee)
#### 注：这里是大写的V

通过vue-cli，初始化vue项目
---

通过以上几步，将我们安装脚手架所需要的环境和工具都准备好好了，下面就可以使用vue-cli来初始化项目。

### 1。新建一个vuetext（项目名）文件夹来放置项目，
在**新建文件夹的上一级文件夹**右键打开命令行工具，输入命令行：

    vue init webpack vuetext1(项目名)

**注：**项目名不能大写，不能使用中文
解释一下这个命令，这个命令的意思是**初始化一个vue项目**，其中webpack是构建工具，也就是整个项目是**基于webpack**的。其中vuetext1是整个项目文件夹的名称，这个**文件夹会自动生成在你指定的目录**中。

### 2。以下是脚手架安装过程（安装步骤解析在图片下面）
![](https://user-gold-cdn.xitu.io/2017/8/4/8d84c6de896ece8579089b8351d8cfb3)

### vue-cli初始化项目选项配置详细解析

    $ vue init webpack vuetext1--------------------- 安装vue-cli,初始化vue项目的命令
    ? Target directory exists. Continue? (Y/n) y---------------------找到了vuetext1这个目录是否要继续
    ? Target directory exists. Continue? Yes
    ? Project name (vuetext1)---------------------项目的名称（默认是文件夹的名称），ps：项目的名称不能有大写，不能有中文，否则会报错
    ? Project name vuetext1
    ? Project description (A Vue.js project)---------------------项目描述，可以自己写
    ? Project description A Vue.js project
    ? Author (OBKoro1)---------------------项目创建者
    ? Author OBKoro1
    ? Vue build (Use arrow keys)--------------------选择打包方式，有两种方式（runtime和standalone），使用默认即可
    ? Vue build standalone
    ? Install vue-router? (Y/n) y--------------------是否安装路由，一般都要安装
    ? Install vue-router? Yes
    ? Use ESLint to lint your code? (Y/n) n---------------------是否启用eslint检测规则，这里个人建议选no，因为经常会各种代码报错，新手还是不安装好
    ? Use ESLint to lint your code? No
    ? Setup unit tests with Karma + Mocha? (Y/n)--------------------是否安装单元测试
    ? Setup unit tests with Karma + Mocha? Yes
    ? Setup e2e tests with Nightwatch? (Y/n) y)--------------------是否安装e2e测试
    ? Setup e2e tests with Nightwatch? Yes

    vue-cli · Generated "vuetext1".
    To get started:)--------------------如何开始
     cd vuetext1)--------------------进入你安装的项目
     npm install)--------------------安装项目依赖
     npm run dev)--------------------运行项目
    Documentation can be found at https://vuejs-templates.github.io/webpack)--------------------vue-cli官方文档

现在vuetext1项目已经初步初始化完成了，里面也有一些文件，但是现在还不能成功运行。

### 3.如何运行项目

 1. 进入你刚才创建在vuetext1项目的文件夹里面，**在vuetext1项目的文件夹里面右键运行git bash 命令行工具**。
 2. **安装项目依赖。**命令行： `npm  install`。前面在项目初始化的时候，已经存在了package.json文件，直接使用npm install 安装项目所需要的依赖，否则项目不能正确运行。
    ### 创建完成的“vuetext1”目录如下：
![创建完成的项目结构](https://user-gold-cdn.xitu.io/2017/8/5/9d766e8dc72c4e9ce241f8ba2ec3618b)

 3. 到这里，我们已经成功使用vue-cli初始化了一个vue项目。
    #### 启动项目：

    在vuetext1目录运行命令行`npm run dev`，启动服务，服务启动成功后浏览器会默认打开一个“欢迎页面”，如下图。

![vue-cli项目成功启动](https://user-gold-cdn.xitu.io/2017/8/5/c1c35aec19a4cd9ea6b587b93720a4e2)

**注意：**这里是默认服务启动的是本地的8080端口，所以请确保你的8080端口不被别的程序所占用，当有其他vue项目运行的时候，可以使用ctrl+c来中断运行。

### vue-cli配置相关:
这是我写的另外一篇关于vue-cli配置相关的文章，有需要的朋友可以参考一下。
[在vue-cli脚手架中引用JQuery、bootstrap以及使用sass、less编写css[vue-cli配置入门]](https://juejin.im/post/5986f5c8f265da3e0e1053cf)

结语：
---
本文关于如何搭建vue-cli脚手架已经尽量详细了，仔细阅读，按步骤来基本上可以成功。如果有哪个地方写的不够清楚的，欢迎指正。本文面向小白，写着玩，大手请轻喷。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！写文偏小白，写的不好之处，欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **







