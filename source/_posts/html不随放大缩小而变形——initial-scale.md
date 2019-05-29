---
title: html不随放大缩小而变形——initial-scale
date: 2017-10-11 22:06:15
tags:
    - css
categories: css
---
**写在前面：**很惭愧我都在做jq了，关于手机端页面变形，直到今天早上才知道问题出在哪里？之前写了好多css页面用谷歌的F12查看手机端的页面，效果如下面的图，然后我一直以为我电脑的谷歌F12出问题了，直到今天在启宸师兄的帮助下才明白。下面进入正文：
一直以为是谷歌F12出问题了，查了好多相关的资料还是没查到，然后今天回过头来修改之前页面的问题，然后看到head头部，就觉得可能是initial-scale出的问题，抱着死马当活马医的心态改了一下meta标签的内容。
**修改initial-scale之前页面的效果：**
![](http://upload-images.jianshu.io/upload_images/5245297-719c2938ed166144.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/5245297-d582801f57231a4a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

之前meta标签的用法(这是错的)：
````
 <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes"/>
````
width=device-width ：表示宽度是设备屏幕的宽度
initial-scale=1.0：表示初始的缩放比例
minimum-scale=0.5：表示最小的缩放比例
maximum-scale=2.0：表示最大的缩放比例
user-scalable=yes：表示用户是否可以调整缩放比例

如果是想要一打开网页，自动以原始比例显示，并且不允许用户修改的话，则是：
````
 <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
````
ps：将比例都改为1,即可。
**修改initial-scale之后页面的效果：**

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-73c38ed791c2368b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-9696fc7bed13a8b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**后话：**实际上我一直知道这个标签的意思，但没往这方面去想。这个坑，我纠结了好久，单纯的写出来分享一下，希望可以帮助到需要的朋友。

**最后又到了观众朋友们最喜欢的求赞求关注环节：**希望看完的朋友点个喜欢，想关注我这个菜鸡是如何成长的也可以关注一下我，基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。然后[github](https://github.com/OBKoro1?tab=following)也互相加个star。码字不易，感谢支持，感激不尽！
**ps**：如果希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[简书主页链接](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1)**