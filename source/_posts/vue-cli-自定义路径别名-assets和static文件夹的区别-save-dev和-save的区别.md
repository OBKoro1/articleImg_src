---
title: vue-cli 自定义路径别名 assets和static文件夹的区别 --save-dev和--save的区别
date: 2017-10-11 23:08:48
tags:
    - vue-cli解析
categories: vue-cli
---
写在前面：
---
这是一篇vue-cli的几个小知识点简单介绍，适用于刚接触vue-cli脚手架以及对此方面并不太了解的同学，大佬们绕道。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

静态资源处理：
---
### assets和static文件夹的区别

相信有很多人知道vue-cli有两个放置静态资源的地方，分别是``src/assets``文件夹和``static``文件夹,这两者的区别很多人可能不太清楚。

**assets目录中的文件会被webpack处理解析为模块依赖**，只支持相对路径形式。例如，在 ``<img src="./logo.png">``
和 ``background: url(./logo.png) ``中，"./logo.png" 是相对的资源路径，将由Webpack解析为模块依赖。



**static/ 目录下的文件并不会被Webpack处理：它们会直接被复制到最终的打包目录（默认是dist/static）下。**必须使用绝对路径引用这些文件，这是通过在 config.js 文件中的 build.assetsPublicPath 和 build.assetsSubDirectory 连接来确定的。

任何放在 static/ 中文件需要以绝对路径的形式引用：/static/[filename]。

在我们实际的开发中，总的来说：**static放不会变动的文件 assets放可能会变动的文件。**

### 在js数据中如何引用图片

因为webpack会将图片当做模块来引用，所以在js中需要使用require将图片引用进来，不能直接以字符串的形式。

    js部分：
        data () {
            return {
                 imgUrl: '图片地址',//错误写法
                imgUrl: require('图片地址')//正确的写法
            }
    }
    template部分：
    img标签形式：
    <img :src="img" />
    或者div背景图形式：
    <div :style="{backgroundImage: 'url(' + img + ')'}"></div>

说了图片就正好再提一下vue-cli的一个图片有关的配置，下图这个配置的意思是：在10000b 的图片以下进行base64转换，所以如果项目中有些比较小的icon就不用再进行图片精灵的处理了

![](https://user-gold-cdn.xitu.io/2017/9/17/a476773456af2f136aa1e1a45da18f9f)

webpack+vue自定义路径别名
---

vue-cli 用的是webpack，也可以使用webpack自定义别名这个功能，自定义别名这个功能**当你在多层文件夹嵌套的时候不必一层一层找路径，直接使用自定义别名就可以找到文件的位置。**

### 设置方法：

**设置地址：**build文件夹下面的webpack.base.conf.js文件
**具体设置：**

    resolve: {
        extensions: ['.js', '.vue', '.json'],
         alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'static':path.resolve(__dirname, '../static'),//增加这一行代码
            }
        },

**使用方式：**

使用的时候要像下方截图的B处一样前面要加上一个'~'，这里的webstorm虽然提示报错，我们可以不用管，代码运行是正常的。

**解读：**

这里给’static’赋予了一个地址，那么在程序中引入路径的时候’~static’就直接可以代替路径’../static’，亲测，这里就算多层嵌套也可以成功找到路径。

![示例图片](https://user-gold-cdn.xitu.io/2017/9/18/35d8e67e0a4783aba76fde31412225a4)




清理项目中没用的插件
---

很多人像我一样，刚开始的会安装很多插件，然后最后在项目中并没有用到。那之前安装的插件太多了，连自己都忘记了安装了哪些插件？

### package.json

![](https://user-gold-cdn.xitu.io/2017/9/17/7e9d41302f682760c2eb6cccf5137acf)

在上图所示位置，我们项目安装的所有的模块依赖都在这个pageage.json文件中，当我们需要整理一波自己的依赖的时候，可以在这个文件里面找有没有现在已经没用的依赖，可以使用命令行``npm remove 模块名字``来删除没用的模块。

### --save-dev和--save的区别

上面的这些依赖有些只在开发环境里面使用的模块，有的在项目上线之后还是要继续依赖的模块。他们之间的区别就在于我们平时安装模块依赖时的：``--save-dev ``和 ``--save``

当你使用``--save-dev``安装依赖的时候就会放在package.json的devDependencies对象下面，相反的，当你使用``--save``安装依赖的时候就会出现在dependencies对象下面。

总结：** --save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。**

### 关于vue-cli配置之前也写过两篇文章，需要的同学可以看一下：

[手摸手教你使用vue-cli脚手架](https://juejin.im/post/597eee92f265da3e2e56e37c)

[在 vue-cli 脚手架中引用 jQuery、bootstrap 以及使用 sass、less 编写 css](https://juejin.im/post/5986f5c8f265da3e0e1053cf)


后话
---
以上就是这篇文章的内容了，是自己一段时间实践项目的一些小积累，后续还有一些内容，因为项目比较紧，可能会晚点和大家见面。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **

以上2017.9.18





