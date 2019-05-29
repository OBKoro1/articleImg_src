---
title: ps切图实用小技巧、图片格式的区别及相关内容
date: 2017-10-11 22:24:32
tags:
    - ps切图
categories: 工具类
---
写在前面
---
之前写了两篇前端图片相关的内容（[前端ps切图方法，图文详细](https://juejin.im/post/58e9deacb123db1ad05fab2f),[css sprite雪碧图制作，使用以及相关，图文gif](https://juejin.im/post/58eb062861ff4b006b576d9c)），本文是面向前端小白的，搜集整理的一些切图技巧，及其相关内容。

### 关于版本：

推荐pscc2017版，一些老版本很多新功能没有，会影响到效率的。（目前2017/4/11）

### 基本设置

先要调整**工作区域**的布局。

1.选择“窗口”——把“信息”，“图层”，“历史记录”，“颜色”面板打开，其他的可以先关闭了，在切图的工作中其他的基本用不到，这个很简单的，**打几个勾**就可以了，如下图所示：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

![工作区的内容](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

2.调整好面板之后，选择“窗口”——“工作区”——“新建工作区”，将当前的工作布局保存起来，并命个名，之后下次打开的时候就会直接出现你调整好的工作布局，否则的话你每次重新打开ps的时候都要重新设置。

ps：就算有别人弄乱了你的面板也可以直接通过“窗口”——“工作区”——选择你之前保存的工作布局。

设置**标尺坐标**

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)


![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

操作gif：


![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

还有其他的一些设置：

文件-新建--：初始化预设设置1920x2000，72分辨率，8位色图，背景透明色  然后保存起来。后续可以选择新建模版

视图/显示/智能参考线以及视图/字符，这两个都要选上；

ps界面中有菜单栏、属性栏、工具栏、面板、工作区：

### 测量 、取色

哪些要测量？
标签的宽度、高度、内边距、边框、定位、文字大小、行高、背景图位置等等，凡是需要数值型，都要进行测量。

使用什么方式：下面弄了一个矩形选择框的例子，如果想要更精确的话，直接使用标尺工具也可以。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
### 测量宽高的两种方式：
标尺测量的方法：
![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
矩形选择框测量的方法：
![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### 颜色取色技巧：

QQ截图的方式：
截图的时候，鼠标移动到哪里，下面就有一个rgb。（在ps中也是一样，鼠标移动信息栏就会有对应的rgb）
![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
ps拾色器获得 ：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)


![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)


### 注意
要把画布尽量放大，来减少我们测量的误差。


关于png、jpg、gif三种图片格式的区别：
---
### JPG的特性

1、支持摄影图像或写实图像的高级压缩，并且可利用压缩比例控制图像文件大小。
2、有损压缩会使图像数据质量下降，并且在编辑和重新保存JPG格式图像时，这种下降损失会累积。
3、JPG不适用于所含颜色很少、具有大块颜色相近的区域或亮度差异十分明显的较简单的图片。

### PNG的特性

1、能在保证最不失真的情况下尽可能压缩图像文件的大小。
2、PNG用来存储灰度图像时，灰度图像的深度可多到16位，存储彩色图像时，彩色图像的深度可多到48位，并且还可存储多到16位的α通道数据。
3、对于需要高保真的较复杂的图像，PNG虽然能无损压缩，但图片文件较大，不适合应用在Web页面上。

## 什么时候应该使用PNG

具备以下条件的图像更适合用**PNG8格式**进行存储：

1、图像上颜色较少，并且主要以纯色或者平滑的渐变色进行填充。
2、具备较大亮度差异以及强烈对比的简单图像（如“立刻购买”按钮中的背景和文字）。

对于写实的摄影图像或是颜色层次非常丰富的图像采用**JPG格式**的图片格式保存一般能达到最佳的压缩效果。


#### 这篇文章写得非常详细，有兴趣的要看一下：[png、jpg、gif三种图片格式的区别](http://www.cnblogs.com/Fran-Lily/p/3792641.html)

## 快捷键
1.快速选中图层用ctrl+鼠标右键
2.安住空格键鼠标变成一只手拖拽图片
3.alt+鼠标滚轮可以**放大或者缩小区域**
4.ctrl+h隐藏所有的参考线
#### 5.h,鼠标移动文件，t文字工具，i吸管工具，移动工具，任何时候按v，就可以回到移动工具

6.导出切片：alt+shift+ctrl+s（文件-存储为web所用格式）

#### 踩坑经历：
自动化切图，文件–脚本–图层保存为文件（这个时候要注意之前的保存为web格式文件时是**保存了所有切片**，而不是仅用户切片，不然会导致一直搜索过滤图层，半天没反应，而且一直谭警告窗，要一直点）
意思就是保存图层的时候要保存自己选中的切片。

快捷键：https://zhidao.baidu.com/question/522391139.html

压缩图片
---

ps切出来的图片一般文件都比较大：
这里有一个**压缩图片**很神奇的网站（有墙，攻城狮应该都会科学上网）：

https://tinypng.com/



一般网站文件目录
---
PSD切图（项目文件目录）
project：
-admin(后台)
-static（所有资源）
-css（所有子文件都可以分子文件夹，方便管理，层级不建议太多）common.css/reset.css/yemian.css
-images（可以按页面主题来）
-js(预定义的，引入的，common.js)
-font
-pulgs
-前台页面
-其他单独文件

### 参考：

[写给前端小白的切图技巧](http://blog.csdn.net/u013778905/article/details/52268304)
[开始前端开发（PhotoShop切图）](http://www.jianshu.com/p/69b74b84e687)
[png、jpg、gif三种图片格式的区别](http://www.cnblogs.com/Fran-Lily/p/3792641.html)


**最后：**希望看完的朋友点个喜欢，也可以关注一下我，现在这阶段基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。码字不易，感谢支持，感激不尽！
**ps**：目前待业，坐标北京，求推荐工作。然后希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[](http://www.jianshu.com/u/8d1dd8c80f06)**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)  ，**[**简书主页链接**](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1) ，[github](https://github.com/OBKoro1) 。**

以上。2017.4.11
