---
title: 解读viewport—网页自适应移动app神器
date: 2017-10-11 22:14:48
tags:
    - css
categories: css
---
**写在前面：**viewport指的是是用户网页的**可视区域**，查了许久，遗憾的是近一两年几乎没有高质量的解析viewport的文章，本文内容是参考大牛，对内容进行了重新排版，以及对重点内容进行标注、精简，加上些许的个人理解形成的。有兴趣的朋友，可以参考一下。

一.背景介绍
-------------
现在人通过手机浏览网页占了大多数，随着浏览方式的改变，网页在webapp下面实现多终端自适应，无论是对于避免工程师无谓的重复劳动或者是对于项目管理便捷性上来说都是十分重要的，然而在移动设备上进行网页的重构或开发，首先得搞明白的就是移动设备上的**viewpor**t了，只有明白了viewport的概念以及弄清楚了跟viewport有关的meta标签的使用，才能更好地**让我们的网页适配或响应各种不同分辨率的移动设备**。

二.知识剖析
-------------
### 1.viewport的概念

**通俗的讲**，移动设备上的viewport就是设备的屏幕上能用来显示我们的网页的那一块区域。

**在具体一点**，就是浏览器上(也可能是一个app中的webview)用来显示网页的那部分区域，但viewport又不局限于浏览器可视区域的大小，它可能比浏览器的可视区域要大，也可能比浏览器的可视区域要小。

在默认情况下，一般来讲，**移动设备上的viewport都是要大于浏览器可视区域的**，这是因为考虑到移动设备的分辨率相对于桌面电脑来说都比较小，所以为了能在移动设备上正常显示那些传统的为桌面浏览器设计的网站。

移动设备上的浏览器都会把自己默认的viewport设为980px或1024px（也可能是其它值，这个是由设备自己决定的），但带来的后果就是浏览器会出现横向滚动条，因为浏览器可视区域的宽度是比这个默认的viewport的宽度要小的。下图列出了一些设备上浏览器的默认viewport的宽度。


![浏览器的默认viewport的宽度。](http://upload-images.jianshu.io/upload_images/5245297-1ccdb61f8f6d1ab5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 2.移动设备哪些因素会引起css中px的变化？
  在css中我们一般使用px作为单位，在桌面浏览器中css的1个像素往往都是对应着电脑屏幕的1个物理像素。但实际情况却并非如此，**css中的像素只是一个抽象的单位**，在**不同的设备或不同的环境**中，css中的1px所代表的**设备物理像素**是不同的。

**1）**从iphone4开始，苹果公司便推出了所谓的Retina屏，**分辨率提高了一倍**，变成640x960，但**屏幕尺寸却没变化**，这就意味着同样大小的屏幕上，像素却多了一倍，这时，一个css像素是等于两个物理像素的（意思就是你**分辨率越大，css中1px代表的物理像素就会越多**）。

**2)**用户对设备**界面的缩放**，例如，当用户把页面放大一倍，那么css中1px所代表的物理像素也会增加一倍；反之把页面缩小一倍，css中1px所代表的物理像素也会减少一倍。

#### 3.devicePixelRatio属性
**1)**它的官方的定义为：设备物理像素和设备独立像素的比例，也就是
````
devicePixelRatio = 物理像素 / 独立像素。
````
理解：1.css中的px就可以看做是设备的独立像素，所以知道**devicePixelRatio**，我们可以知道该设备上一个css像素代表多少个物理像素。
ps：兼容这块儿，笔者还没找到相应的数据支持。但是在日常应用中，基本上主流的手机，都支持。有兴趣的小伙伴可以研究一下。

**举个栗子：**在Retina屏的iphone上，devicePixelRatio的值为2，也就是说1个css像素相当于2个物理像素。

#### 4.ideal viewport——完美适配移动设备的理想viewport。

所谓的**完美适配**（通常意义下，攻城狮口中的自适应）指的是:

**1)**不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；

**2)**显示的文字的大小是合适，比如一段14px大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段14px的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。

**ideal viewport并没有一个固定的尺寸**，不同的设备拥有有不同的ideal viewport。所有的phone的ideal viewport宽度都是320px，无论它的屏幕宽度是320还是640，也就是说，在iphone屏幕宽度在640px以下中，css中的320px就代表iphone屏幕的宽度。

不同分辨率的安卓手机上，devicePixelRatio的值能正好填充全屏宽度：

![不同分辨率手机上，devicePixelRatio的值能正好填充全屏宽度](http://upload-images.jianshu.io/upload_images/5245297-3d9f84137f64b78e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

三.常见问题。
------------
**1）.**在进行移动设备网站的开发时，如何控制ideal viewport呢？

我们在开发移动设备的网站时，最常见的的一个动作就是把下面这个东西复制到我们的head标签中：
````
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

````
**标签解读：**
![标签解读](http://upload-images.jianshu.io/upload_images/5245297-2af7764044a18695.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在安卓中还支持  target-densitydpi  这个私有属性，它表示目标设备的密度等级，作用是决定css中的1px代表多少物理像素

**target-densitydpi**： 值可以为一个数值或 high-dpi 、 medium-dpi、 low-dpi、 device-dpi 这几个字符串中的一个

注意：当 target-densitydpi=device-dpi 时， css中的1px会等于物理像素中的1px。

2）把当前的viewport宽度设置为 ideal viewport 的宽度。
````
<meta name="viewport" content="width=device-width">

````

![代码在 各大移动端浏览器上的测试结果](http://upload-images.jianshu.io/upload_images/5245297-400464d22b2a49ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到通过width=device-width，所有浏览器都能把**当前的viewport宽度变成ideal viewport的宽度**，但要注意的是，在iphone和ipad上，无论是竖屏还是横屏，宽度都是竖屏时ideal viewport的宽度。

上面这串代码还有另一种写法：
```
<meta name="viewport" content="initial-scale=1">````

 四.扩展——关于meta viewport的更多知识。
-----------
### 1.关于缩放

缩放是相对于ideal viewport来缩放的，缩放值越大，当前viewport的宽度就会越小，反之亦然。
举个栗子：在iphone中，ideal viewport的宽度是320px，如果我们设置 initial-scale=2 ，此时viewport的宽度会变为只有160px了

理解：就是原来1px的东西变成2px了，但是1px变为2px并不是把原来的320px变为640px了，而是在实际宽度不变的情况下，1px变得跟原来的2px的长度一样了，所以放大2倍后原来需要320px才能填满的宽度现在只需要160px就做到了。因此，我们可以得出一个公式：
````
visual viewport宽度 = ideal viewport宽度  / 当前缩放值

当前缩放值 = ideal viewport宽度  / visual viewport宽度

````
 ps: visual viewport的宽度指的是浏览器可视区域的宽度。ideal viewport宽度指的是完美适配移动设备的宽度

### 2.initial-scale的默认值是多少？

**initial-scale的默认值很显然不会是1**，因为当 initial-scale = 1 时，当前的layout viewport宽度会被设为 ideal viewport的宽度，但前面说了，各浏览器默认的 layout viewport宽度一般都是980啊，1024啊，800啊等等这些个值，没有一开始就是 ideal viewport的宽度的。

ps：layout viewport在手机浏览器上面的默认值是980px。

**安卓设备上的initial-scale默认值：**如果没有设置的话，就没有，一定要设置，这个属性才会起作用。

**iphone和ipad上的initial-scale默认值：**

测试：在iphone上，我们不设置任何的viewport meta标签，此时layout viewport的宽度为980px，但我们可以看到浏览器并没有出现横向滚动条，浏览器默认的把页面缩小了。根据上面的公式，当前缩放值 = ideal viewport宽度  / visual viewport宽度，我们可以得出：

当前缩放值 = 320 / 980，也就是当前的initial-scale**默认值是 0.33**这样子。

**结论：**在iphone和ipad上，无论你给viewport设的宽的是多少，如果**没有指定默认的缩放值**，则iphone和ipad会**自动计算这个缩放值**，以达到当前页面不会出现横向滚动条(或者说viewport的宽度就是屏幕的宽度)的目的。

这里楼主有个踩坑经历：http://www.jianshu.com/p/232a4d9a90c9

### 3.js动态改变meta viewport标签

第一种方法

可以使用document.write来动态输出meta viewport标签，例如：
````
document.write('<meta name="viewport" content="width=device-width,initial-scale=1">')
````

第二种方法

js通过setAttribute来改变
````
<meta id="testViewport" name="viewport" content="width = 380">
<script>
var mvp = document.getElementById('testViewport');
mvp.setAttribute('content','width=480');
</script>
````


 五.总结
---------
**得到缩放值的公式：**
````
当前缩放值 = ideal viewport宽度  / visual viewport宽度
//visual viewport宽度指的是浏览器可视区域的宽度。
//ideal viewport宽度指的是完美适配移动设备的宽度
````
**如果表示不理解本文的内容，在head部分加上这串代码也可以解决网页自适应移动app的这个问题：**
````
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

````
**提示：**如果**不设置**meta viewport标签，移动设备上浏览器默认的宽度值为800px，980px，1024px等这些，总之是大于屏幕宽度的（意思就是说，**会不自适应手机端的页面**）

还是刚才那个踩坑经历：http://www.jianshu.com/p/232a4d9a90c9（迷迷糊糊的太难受了）

本文大部分内容来自：http://www.cnblogs.com/2050/p/3877280.html
本人重新排版，以及对重点内容进行标注，和精简。
原文较为详细，细细阅读，理解更加深刻。

**后话：**确实，当我们在开发移动设备上的网页时，不管你明不明白什么是viewport，可能你只需要这么一句代码就够了。当有时候，我们要知其然，更要知其所以然，当你明白了其中的原理，对其使用就会更加得心应手，不会迷迷糊糊，连这串代码是什么意思都不知道。老大曾经说过一句话：**当你达到一定高度的时候，你的理论知识才能决定你能走多远。**共勉。

**最后又到了观众朋友们最喜欢的求赞求关注环节：**希望看完的朋友点个喜欢，也可以关注一下我，现在这阶段基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。码字不易，感谢支持，感激不尽！
**ps**：如果希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[简书主页链接](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1) [github](https://github.com/OBKoro1)**