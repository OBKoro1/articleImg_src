---
title: 单词太长导致自动换行，出现空白区域。——word-wrap和word-break
date: 2017-10-11 22:39:48
tags:
    - css3
categories: css
---
写在前面：
---
在写页面的时候，偶尔有时会遇到下图这两种情况，一种是单词过长时会溢出div，一种是直接换行，导致出现空白区域。这两个情景就需要word-wrap、word-break这两个属性出场来解决了。闲话不扯了，本文主要内容有：word-wrap和word-break**属性介绍，使用方法，他们之间的区别，浏览器兼容性，demo链接**。需要的朋友可以过来参考下，喜欢的可以点个赞，希望能对大家有所帮助。

### 应用场景：

![属性的应用场景](https://dn-mhke0kuv.qbox.me/7681b3ea25f4259b7599)

### word-wrap和word-break是什么？

在mozilla的官网上找到如下的解释：

![word-wrap的英文解释](https://dn-mhke0kuv.qbox.me/cd518bb76aa131d9800c)

![word-break的英文解释](https://dn-mhke0kuv.qbox.me/01c76f87a127eb7b25fd)

经过翻译：**word-wrap:**

css的 word-wrap 属性用来标明**是否允许**浏览器在单词内进行**断句**，这是为了防止当一个字符串太长而找不到它的自然断句点时产生溢出现象。

**word-break:**

css的 word-break 属性用来标明**怎么样**进行单词内的**断句**。

### 何谓单词内断句？

![](https://dn-mhke0kuv.qbox.me/619c1577018279a50a70)

这个单词没有发生单词内断句的情况，这个单词太长了，溢出了容器的范围。

下面是发生了单词内断句的情况实例：

![](https://dn-mhke0kuv.qbox.me/3f3a3b26f2b49ab81aa3)

这里面分别使用了word-wrap：break-word;和word-break:break-all;这里可以看到，效果是一样的，下面再说说他们的区别。

### word-wrap的属性介绍


![w3c：word-wrap](https://dn-mhke0kuv.qbox.me/b55595378c65b88dc2b9)

### word-wrap的浏览器支持情况：

![所有浏览器都支持](https://dn-mhke0kuv.qbox.me/e701f4d37b0015b5538e)

### 语法：

```
/* 二选一 */
word-wrap: normal;
word-wrap: break-word;
```

### 解析：

normal就是大家平常见得最多的正常的换行规则，break-word如果长单词超出了一行的长度的话，在一行中有可以换行的标点时就换行，实在没有可以换行的地方时，才在单词中间换行。（这句的解析入下图）



![](https://dn-mhke0kuv.qbox.me/eeea7fe4114814f3b60a)


上图就是：一行中**有可以换行的标点时就换行**，**实在没有**可以换行的地方时，**才在单词中间换行**



### word-break属性的属性介绍：

![w3c上关于word-break属性的介绍](https://dn-mhke0kuv.qbox.me/29d4016953d5b7e462a2)

### 浏览器支持：
![](https://dn-mhke0kuv.qbox.me/c36fd784b852063b1144)

除了opera不支持以外，其他都支持（火狐也从不支持改为支持了）!

### 语法使用：
````
/* 默认normal */
word-break: normal;
word-break: break-all;
word-break: keep-all;
````
解析：几个关键字值的含义如下：
**normal**
    使用默认的换行规则。

**break-all**
    允许任意非CJK(Chinese/Japanese/Korean)文本间的单词断行。(这里是CJK中文，日文，韩文的意思)

**keep-all**
不允许CJK(Chinese/Japanese/Korean)文本中的单词换行，只能在半角空格或连字符处换行。非CJK文本的行为实际上和normal一致。(**一致性可看下图的demo效果**)

![](https://dn-mhke0kuv.qbox.me/3af903320a9cac09f9d5)

### word-break:break-all和word-wrap:break-word之间的区别：

其实可以从上述demo栗子中看出来：

**word-break:break-all**碰到英文单词统统都换行，只要**到了容器的边界就会换行**，**不浪费一点空间**，一点空隙都不放过。

而**word-wrap:break-word**在一行中**有可以换行点时就换行**，**实在没有**可以换行的地方时，**才在单词中间换行。**


这里所说的换行点指的是：如空格，或CJK(Chinese/Japanese/Korean)(中文/日文/韩文)之类的，让这些换行点换行，至于对不对齐，好不好看，则不关心，因此，**很容易出现一片一片牛皮癣**一样的空白的情况。

后话：
---

以上就是本文的内容了，**其实大概分清他们的区别，以后碰到这类型问题，知道需要用哪个属性来解决就好了**。

**最后**：因为我经常看不懂别人写的分享，所以个人写文比较偏小白，写的不好之处，欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我，现在这阶段基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。码字不易，感谢支持！
**ps**：目前**待业**，坐标北京，求推荐工作。然后希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[](http://www.jianshu.com/u/8d1dd8c80f06)**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)  ，**[**简书主页链接**](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1) ，[github](https://github.com/OBKoro1) 。**


参考链接：

[word-break:break-all和word-wrap:break-word的区别](http://www.zhangxinxu.com/wordpress/2015/11/diff-word-break-break-all-word-wrap-break-word/)

[你真的了解word-wrap和word-break的区别吗？](http://www.cnblogs.com/2050/archive/2012/08/10/2632256.html)

[CSS3 word-wrap 属性](http://www.w3school.com.cn/cssref/pr_word-wrap.asp)

[CSS3 word-break 属性](http://www.w3school.com.cn/cssref/pr_word-break.asp)