---
title: VsCode读取项目文件的Eslint规则 保存时自动修复格式错误
date: 2018-09-16 17:01:50
categories: 工具类
tags:
- Eslint
- VsCode
- 团队协作
---

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/005Y4rCogy1fvbhpu4dx8j30r00i0jwg.jpg?raw=true)

## 前言：

同一个项目，保持代码风格的一致，是非常重要的一个规范。但事实上项目小组成员的代码校验规则、格式化工具通常都不一致，为了避免项目到后期出现无法维护的问题，项目成员使用同一套校验规则，同一个格式化方式是相当好的步骤之一。


<!--more-->

> 个人博客了解一下：[obkoro1.com](http://obkoro1.com/)

## 保存时自动统一代码风格：

先通过一些简单的配置，然后：

* `Ctrl`+`s` / `command`+`s` 时自动修复代码的格式错误
* 自动修复的规则是读取项目根目录的Eslint规则
* 这样就能保证项目成员都是一套验证规则的代码风格

---

## 配置：

### 1.安装VsCode的`EsLint`和`vetur`插件

如图安装`EsLint`插件：

![](https://user-gold-cdn.xitu.io/2018/9/16/165e132647eca15f?w=1132&h=559&f=png&s=205082)

### 2.为项目安装`EsLint`包：

![](https://user-gold-cdn.xitu.io/2018/9/16/165e136abe3b1feb?w=479&h=423&f=png&s=95954)

注意要安装在开发环境上，还有就是如果你使用的是脚手架的话，选了Eslint选项，会自带这些包。

### 3.在项目的根目录下添加`.eslintrc.js`

用于校验代码格式，根据项目情况，可自行编写校验规则：

```js
module.exports = {
    // Eslint规则
}
```

### 4.首选项设置：

将下面这部分放入首选项设置中：

     "eslint.autoFixOnSave": true,  //  启用保存时自动修复,默认只支持.js文件
     "eslint.validate": [
        "javascript",  //  用eslint的规则检测js文件
        {
          "language": "vue",   // 检测vue文件
          "autoFix": true   //  为vue文件开启保存自动修复的功能
        },
        {
          "language": "html",
          "autoFix": true
        },
      ],

想了解更多的话，推荐看一下VsCode的[EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)插件

### 大功告成：

点开文件，你可能会看到如下报错，无需一个一个去改，只要保存一下文件，就可以自动修复这些代码格式上的问题了。

![](https://user-gold-cdn.xitu.io/2018/9/16/165e151df42747c4?w=474&h=335&f=gif&s=22430)

**注意：**

如果整个文件都飘红的话，不会一次性修改如果的格式问题，会一下改一部分，你可能需要多按几次保存。

### 一键修复项目格式问题：

遇到下面这两种情况：

* 你刚刚引入这个自动修复，但你项目的文件比较多，且你又比较懒。
* 隔一段时间，修复一下代码格式上的问题

你可以像下面这样，在`package.json`里面的`scripts`里面新增一条如下命令：

    "lint": "eslint --ext .js,.vue src --fix"

![](https://user-gold-cdn.xitu.io/2018/9/16/165e1561a9b92866?w=694&h=111&f=png&s=33155)

`--ext`后面跟上的`.js`、`.vue`是你要检测文件的后缀，`.vue`后面的`src`是要检测的哪个目录下面的文件。

`--fix`的作用是自动修复根据你配置的规则检测出来的格式问题

**一键修复:**

输入如下命令行，就可以自动**修复你`src`文件夹下面的所有根据你配置的规则检测出来的格式问题**。

    npm run lint

### .eslintignore 不检测一些文件：

在项目的根目录创建一个`.eslintignore`文件，用于让`EsLint`不检测一些文件。

比如引的一些别人的文件，插件等,比如文件中：

    src/test/* 
    src/test2/* 

文件中的内容像上面这样写，这里第一行是不检测src目录下的test文件夹下面的所有文件。

### 自定义规则：

    // .eslintrc.js文件
    module.exports = {
        "rules": { // 自定义规则
            "no-console": 0,
            "no-const-assign": 1, 
            "no-extra-bind": 2,
        }
    }

**0、1、2的意思：**

* `"off"` 或 0 - 关闭这项规则
* `"warn"` 或 1 - 将规则视为一个警告
* `"error"` 或 2 - 将规则视为一个错误

---

## 结语

设置如上，很快就能弄好，赶紧在团队中用起来吧！

使用自动VsCode+EsLint格式化代码，在团队内部相互去看别人的代码的时候，就可以更容易的看的懂，能够极大的降低团队的沟通成本和提高心情。

### 希望看完的朋友可以点个喜欢/关注，您的支持是对我最大的鼓励。

**[个人blog](http://obkoro1.com/)** and **[前端积累文档](http://obkoro1.com/web_accumulate/)**，如需转载，请放上原文链接并署名。码字不易，**感谢**支持！
 
如果喜欢本文的话，欢迎扫描关注我的[订阅号](https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&h=344&f=jpeg&s=8317)，最新文章，面试题等都将第一时间发布在订阅号上。
 
 以上2018.9.16