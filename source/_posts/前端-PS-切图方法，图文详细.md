---
title: 前端 PS 切图方法，图文详细
date: 2017-10-11 22:19:42
tags:
    - ps切图
categories: 工具类
---
**写在前面：**本文主要内容是目前**我所知道的切图技巧结合网上的资料**，写出来分享一波。图文教程，多图！！

**BB：**很多人都会说，切图这个活倒底分给UI还是分给前端。虽然好的UI会给我们把图切好，但是他们切的图不一定百分之百符合我们的需求，所以我一直都觉得这是页面仔必须要会的一项技能，因为只有你自己才会知道怎么切合适。况且**这项技能根本一点都不难**，所以还是自己动手丰衣足食比较好。


1.下载
---
我现在使用的版本号：PS-CS6，网上很多破解版本的自行搜索下载。

2.安装好PS之后，先要调整工作区域的布局。
---

1.选择“窗口”——把“信息”，“图层”，“历史记录”，“颜色”面板打开，其他的可以先关闭了，在切图的工作中其他的基本用不到，这个很简单的，**打几个勾就可以了**，如下图所示：

![Paste_Image.png](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)


![工作区的内容](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

2.调整好面板之后，选择“窗口”——“工作区”——“新建工作区”，**将当前的工作布局保存**起来，并命个名，之后下次打开的时候就会直接出现你调整好的工作布局，否则的话你每次重新打开ps的时候都要重新设置。

ps：就算有别人弄乱了你的面板也可以直接通过“窗口”——“工作区”——选择你之前保存的工作布局。

**3.切图**
---
切图需求：

![这是我们需要切的图](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
#### 切图步骤见图


![切图步骤1.](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 选择图层的时候要先按住alt不放，然后再按鼠标右键。
![Paste_Image.png](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
### 隐藏图层。

![Paste_Image.png](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

效果：

![Paste_Image.png](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 连续操作隐藏图层(**背景图要隐藏干净**)：

####  效果，以及接下的步骤（切线就是一根根淡蓝色的线）

![Paste_Image.png](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 保存切片1

![Paste_Image.png](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 保存切片2


![Paste_Image.png](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)


#### 保存切片3
![Paste_Image.png](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)



被局限的方法（原理是一样的）：

![这有局限](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

踩坑经历：
===

网上很多教程都说使用png格式就可以，却并没有说png-8或者是png-24，甚至有些教程告诉我使用png-8！在这里分享一波，保存切片**必须使用png-24**，因为我踩过坑了（/(ㄒoㄒ)/~~）

#### 切出来的图片对比：

![Paste_Image.png](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 网页效果对比：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 更新一波原理：
之前不知道为什么png8，png24为什么有这种差别，经过评论区@唐挽斐 解答一波，现在明白了，更新到文章里面。


![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

因为黄色图标这里是不透明的，png8不支持半透明的

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### 搜了一下png8和png-24的区别：

1、png8是一个256色的图片，png24则是一个1670万色的图片

2、png8的压缩率比png24高很多，所以**png8图片的大小会比png24小很多**。

3、png8的全透明没有png24的质量高。

4、png8在半透明和透明的情况下会有毛边锯齿的现象，png24则不会，如下图

**@唐挽斐建议**：必须保存png24，这个确实可以保证图片不会出错，但是对于大的不需要半透明的图片保存成 png24 的话**导致文件体积会很大**，所以建议不需要半透明的图片保存成 png8，这样体积会小一点而且不会影响图片清晰度，需要半透明的一定要保存成 png24。

感谢建议，之前有点不太理解，这回学习到了。

这是别人写的教程，跟我用的方法有些差别，有兴趣可以看看。
http://blog.csdn.net/xiaoermingn/article/details/53240266

以上：2017.4.9。

**后话：** 本文的受众是前端小白们呢，只是帮助小白们，先学会切图能把图片切出来，能够使用就可以了，这些都是小技能学会用了就可以了，不打紧的。明天写一篇关于雪碧图的合成方法，以及关于切图的一些东西。

相关：
1.[css sprite雪碧图制作，使用以及相关，图文](https://juejin.im/post/58eb062861ff4b006b576d9c)
2.[ps切图实用小技巧、图片格式的区别及相关内容](https://juejin.im/post/58ec558d570c350057e849f0)

**最后又到了观众朋友们最喜欢的求赞求关注环节：**希望看完的朋友点个喜欢，也可以关注一下我，现在这阶段基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。码字不易，感谢支持，感激不尽！
**ps**：如果希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[****](http://www.jianshu.com/u/8d1dd8c80f06)**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)  ，**[**简书主页链接**](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1) ，[github](https://github.com/OBKoro1) 。**