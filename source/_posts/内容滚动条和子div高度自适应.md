---
title: 内容滚动条和子div高度自适应
date: 2017-10-11 21:51:04
tags:
    - css
categories: css

---
写在前面：老套路有图有真相，这才叫做分享。本文内容是：一个div里面，两个子div高度自适应（平分父div的高度）和元素内容过多的时候，根据需求出现高度滚动条或者宽度滚动条。

先放最终效果（在下面会有demo代码。）：


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-afbbb44066dd7c94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

实现这些效果要怎么做呢？咱一步一步来。

第一步：

先设置html结构：这里我已经搭好了。
````
<div class="box">
    <div class="box1">
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <!--<span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>-->
        <!--<span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>-->
        <!--<span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>-->
        <!--<span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>-->
    </div>
    <div class="box2">
        <span>填充填充</span>
    </div>
</div>
````
第二步然后开始写css样式了（我会把踩坑经历放上去，所以不要一步一步走，看效果）：

设置父元素box的样式：
````
  .box{
            margin: 0 auto;
            width: 40%;
            background: #ccc;
            height: 15rem;
            border: 5px solid red; /*为了区分各个box界限*/
        }
````
设置box1的样式：
````
.box1{
            min-height: 3rem;
            max-height: 13rem;
            background: coral;
        }
````
现在界面是这样子的：


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-50eb79a5c1a11982.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


现在尝试把html解除注释：


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-b92322728420ee2e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


然后浏览器里面变成这样了。。。


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-56f5182d46a41d3c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


excuse me？？？说好的滚动条呢？说好的自适应呢？

下面就到了关键的部分了（文章末尾有demo，不想看的话，可以自己试试。）：

在上面我们已经设置了最大高度和最小高度，因为box1空间不够所以溢出来了。


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-41707ab6f5d8ea6c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


overflow属性大家去看下，http://www.w3school.com.cn/cssref/pr_pos_overflow.asp
知道你们不会去看，所以我又放图片了。。。

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-511618e3abb59bc5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


所以对于这部分我们要隐藏起来。 加个overflow: hidden;变成。

![ ](http://upload-images.jianshu.io/upload_images/5245297-40588fbfc761809c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

大家也都注意到了overflow: scroll;这个属性，是的，我们加上去试试。

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-8954ed3927fb04da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
滚动条是出来了，但是X轴的滚动条是什么鬼？
所以百度好久的答案，你们有福了！—————overflow-x: hidden;

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-83c6d190bcd5ef35.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后我顺便查到上面的简写方式。
原来用overflow-x: hidden;overflow-y: auto;这两行代码就可以做到！
我刚才是这样子的
````
  .box1{
            min-height: 3rem;
            overflow: hidden;
            max-height: 13rem;
            background: coral;
            overflow: scroll;
            overflow-x: hidden;
        }
````
最终的代码是这样的。
```
.box1{
            min-height: 3rem;
            max-height: 13rem;
            background: coral;
            overflow-x: hidden;
            overflow-y: auto;
        }
```
好了今天的内容就到这里了。。等等，好像有什么不对的地方？
说好的div高度自适应呢？？
额。。。关于这个问题，我只有一个取巧的办法。
我先放两张图片：

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-95bc8c9258b9b58b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-5af3a22c32a7b3ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

ps：这样就算是自适应了吧？

现在的情况是这样子的：
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-8a0dd0f10f28e9b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我把他们两个的背景颜色都改成一样的，再来看下：

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-693f95cdf1ffe68c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里也是，实际上，他的box就那么大。

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-04460e8aa189b859.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


写这篇花了一个半小时，主要是自己昨天才弄懂的，然后今天做demo 的时候又忘记怎么自适应div了，弄了老半天，然后用F12看昨天的代码才恍然大悟！（其实昨天没真懂，这会是真懂了），写的是真的累，码字不易，望且看且珍惜，给个喜欢吧。

**最后又到了观众朋友们最喜欢的求赞求关注环节：**希望看完的朋友点个喜欢，想关注我这个菜鸡是如何成长的也可以关注一下我，基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。然后[github](https://github.com/OBKoro1?tab=following)也互相加个star。码字不易，感谢支持，感激不尽！

说好的demo，差点忘记，回来更新。
````
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>div-height-roll-demo</title>
    <style>
      .box{
            margin: 0 auto;
            width: 40%;
            background: #ccc;
            height: 25rem;
            border: 5px solid red; /*为了区分各个box界限*/
        }
        .box1{
            min-height: 3rem;
            max-height: 13rem;
            background: coral;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .box2{
            text-align: center;
            border-top: 3px solid black;
        }

    </style>
</head>
<body>
<div class="box">
    <div class="box1">
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>
        <span>填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充填充</span>

    </div>
    <div class="box2">
        <span>填充填充</span>
    </div>
</div>

</body>
</html>
````