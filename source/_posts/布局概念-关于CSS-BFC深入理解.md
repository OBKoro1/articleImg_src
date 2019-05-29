---
title: '[布局概念] 关于CSS-BFC深入理解'
date: 2017-10-11 22:48:41
tags:
    - Css-BFC作用域
categories: css
---
写在前面
---
好记性不如烂笔头，研究了一下BFC，发现里面比较细的东西也是很多的！关于BFC，很多人可能都听说过BFC这个东西，大概知道这是个啥东西，相信很多人对此并没有一个非常细致的了解，本文预计篇幅较长，认真，耐着性子看，应该都能够比较深入的理解BFC这个概念的规则、作用以及用法。希望喜欢的朋友可以点个赞，或者关注一波本人，谢谢。

## BFC是什么鬼？

**BFC概括：**可以在心中记住这么一个概念———**所谓的BFC就是css布局的一个概念，是一块区域，一个环境。**

先稳住别懵逼，接着往下走。

#### 关于BFC的定义：
BFC(Block formatting context)直译为"块级格式化上下文"。它**是一个独立的渲染区域**，只有**Block-level box**参与（在下面有解释）， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

我们常说的文档流其实分为定位流、浮动流和普通流三种。而**普通流其实就是指BFC中的FC**。

**FC**是formatting context的首字母缩写，直译过来是格式化上下文，它**是页面中的一块渲染区域**，有一套渲染规则，决定了其**子元素如何布局，以及和其他元素之间的关系和作用。**

常见的FC有BFC、IFC（行级格式化上下文），还有GFC（网格布局格式化上下文）和FFC（自适应格式化上下文），这里就不再展开了。

#### 通俗一点的方式解释:

BFC 可以简单的理解为**某个元素的一个 CSS 属性**，只不过这个属性**不能被开发者显式的修改**，拥有这个属性的元素对内部元素和外部元素会表现出一些特性，这就是BFC。

下面列一波目录，然后分别展开来讲：
---
### 触发条件或者说哪些元素会生成BFC：

　　满足下列条件之一就可触发BFC

　　【1】根元素，即HTML元素

　　【2】float的值不为none

　　【3】overflow的值不为visible

　　【4】display的值为inline-block、table-cell、table-caption

　　【5】position的值为absolute或fixed
　　
### BFC布局规则：
1.内部的Box会在垂直方向，一个接一个地放置。

2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠

3.每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

4.BFC的区域不会与float box重叠。

5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

6.计算BFC的高度时，浮动元素也参与计算

### BFC有哪些作用：

1. 自适应两栏布局
2可以阻止元素被浮动元素覆盖
3可以包含浮动元素——清除内部浮动
4.分属于不同的BFC时可以阻止margin重叠

---

#### BFC布局规则1：内部的Box会在垂直方向，一个接一个地放置。

上文定义中提到过的块级盒：block-level box，在这里解析一波：

![这个就是我们平常操作盒子的组成](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

我们平常说的盒子是由margin、border、padding、content组成的，实际上每种类型的四条边定义了一个盒子，分别是分别是**content box、padding box、border box、margin box**，这四种类型的盒子一直存在，即使他们的值为0.决定块盒在包含块中与相邻块盒的垂直间距的便是margin-box。

**提示：**Box之间的距离虽然也可以使用padding来控制，但是此时实际上还是属于box内部里面，而且使用padding来控制的话就不能再使用border属性了。

布局规则1就是我们**平常div一行一行块级放置的样式**，大家想一下就知道了，这里就不展开了。

### BFC布局规则2：Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

上文提到过，决定块盒在包含块中与相邻块盒的垂直间距的便是margin-box。，上面的栗子就是这种情况。

**演示中css属性设置：**上面的box：margin-bottom: 100px;下面的box：margin-top: 100px;（他们是同一侧的margin，所以会发生margin重叠的情况，两个div的距离实际上只有100px。）


### BFC的作用4：阻止margin重叠:

当两个相邻块级子元素**分属于不同的BFC**时可以**阻止margin重叠**

**操作方法：**给其中一个div外面包一个div，然后通过触发外面这个div的BFC，就可以阻止这两个div的margin重叠

下面是代码：

````
<div class="aside"></div>
<div class="text">
    <div class="main"></div>
</div>
<!--下面是css代码-->
 .aside {
            margin-bottom: 100px;//margin属性
            width: 100px;
            height: 150px;
            background: #f66;
        }
        .main {
            margin-top: 100px;//margin属性
            height: 200px;
            background: #fcc;
        }
         .text{
            /*盒子main的外面包一个div，通过改变此div的属性使两个盒子分属于两个不同的BFC，以此来阻止margin重叠*/
            overflow: hidden;//此时已经触发了BFC属性。
        }
````

**ps：**触发方式可以参考上文给出的触发条件。

### 这里有一个网址可以在线演示，通过演示，可以更直观一点：


![这里面也是一篇好文章，关于BFC的](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

链接地址：http://www.cnblogs.com/xiaohuochai/p/5248536.html

### BFC布局规则3：每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

````
<div class="par">
    <div class="child"></div>
    //给这两个子div加浮动，浮动的结果，如果没有清除浮动的话，父div不会将下面两个div包裹，但还是在父div的范围之内。
    <div class="child"></div>
</div>
````

**解析：**给这两个子div加浮动，浮动的结果，如果没有清除浮动的话，父div不会将下面两个div包裹，但还是在父div的范围之内，**左浮是子div的左边接触父div的borderbox的左边，右浮是子div接触父div的borderbox右边**，除非设置margin来撑开距离，否则一直是这个规则。

### BFC作用3：可以包含浮动元素——清除内部浮动

给父divpar加上 overflow: hidden;

**清除浮动原理：**触发父div的BFC属性，使下面的子div都**处在父div的同一个BFC区域之内**，此时已成功清除浮动。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

还可以向同一个方向浮动来达到清除浮动的目的，清除浮动的原理是两个div都位于同一个浮动的BFC区域之中。


### BFC布局规则4：BFC的区域不会与float box重叠：

````
<div class="aside"></div>
<div class="text">
    <div class="main"></div>
</div>
<!--下面是css代码-->
 .aside {
            width: 100px;
            height: 150px;
            float: left;
            background: #f66;
        }
        .main {
            height: 200px;
            overflow: hidden;//触发main盒子的BFC
            background: #fcc;
        }
           .text{
            width: 500px;
    }
````
上面aside盒子有一个浮动属性，覆盖了main盒子的内容，main盒子没有清除aside盒子的浮动。只做了一个动作，就是**触发自身的BFC**，然后就**不再被aside盒子覆盖**了。所以：**BFC的区域不会与float box重叠**。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

#### BFC作用：自适应两栏布局。


![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

还是上面的代码，此时BFC的区域不会与float box重叠，因此**会根据包含块（父div）的宽度，和aside的宽度，自适应宽度。**

---

### BFC 与 Layout

IE 作为浏览器中的奇葩，当然不可能按部就班的支持 BFC 标准，于是乎 IE 中有了 Layout 这个东西。**Layout 和 BFC 基本是等价的**，为了处理 IE 的兼容性，在需要触发 BFC 时，我们除了需要用触发条件中的 CSS 属性来触发 BFC，还需要针对 IE 浏览器使用 zoom: 1 来触发 IE 浏览器的 Layout。

### 有趣的文本:
````
 .par {
            margin-top: 3rem;
            border: 5px solid #fcc;
            width: 300px;
        }
        .child {
            border: 5px solid #f66;
            width:100px;
            height: 100px;
            float: left;
        }
````
![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

~~当我使用上面的属性，再加上一个没有属性的p或者span标签，就发现两个子div的float属性自动被清除了，这是因为span或者p这类文本自带一个BFC吗？还是什么？求路过的大神解释。。。~~


以上是错误的。这里两个div被撑开，是因为父div被p标签撑开了，并不是因为清除浮动的原因，从下面这张图片可以清楚的知道。


![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)


其实以上的几个例子都体现了BFC布局规则第五条————
　
### BFC布局规则5：BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

---

### 文本环绕float：

````
<div style="float: left; width: 100px; height: 100px; background: #000;">
</div>
<div style="height: 200px; background: #AAA;">
    <div style=" width: 30px; height: 30px; background: red;"></div>
    <p>content</p> <p>content</p> <p>content</p> <p>content</p> <p>content</p>
</div>
````

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

问题：为什么 div 的左上角被覆盖了，而文本却没有被覆盖，float不是应该跟普通流不在一个层级吗？是因为float属性不生效吗？



### 解决：

### float的定义和用法：

float 属性定义元素在哪个方向浮动。以往这个属性总应用于图像，**使文本围绕在图像周围**，不过在 CSS 中，**任何元素都可以浮动**。浮动元素会生成一个块级框，而不论它本身是何种元素。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

从上图可以看到，float属性确实生效，将float隐藏后，下面还有一个红色的div，这个div是被黑色div所覆盖掉的。**div会被float覆盖，而文本却没有被float覆盖**，是因为**float当初设计的时候**就是为了**使文本围绕在浮动对象的周围**。

---

后话
---
上面说的有些东西，其实在我们平常的布局中，已经有在使用这些规律，只是没有总结出来，如果写的不好之处欢迎批评指导。还有一篇关于闭包的，还没写完。。五一三天净打游戏了！应该很快就会写好了。

**最后**：码字不易，**感谢**支持！因为我经常看不懂别人写的分享，所以个人写文比较偏小白，写的不好之处，欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**ps**：目前**待业**，坐标北京，本人适应互联网快节奏，高强度，持续学习，持续成长，认真，严谨，学习积极性强。**中小公司大佬求带走**，邮箱：1677593011@qq.com。
[](http://www.jianshu.com/u/8d1dd8c80f06)**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)  ，**[**简书主页链接**](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1) **

### 参考链接：

[BFC神奇背后的原理](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)，
[深入理解BFC](http://www.cnblogs.com/xiaohuochai/p/5248536.html)
[什么是BFC](http://web.jobbole.com/84808/)
[Block Formatting Context (BFC) 浅析](https://zjy.name/archives/bfc-introduction.html)

以上。2017.5.4.


