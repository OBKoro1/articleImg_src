---
title: js原生dom对象和jQuery对象可以混合使用吗？
date: 2017-10-11 22:28:56
tags:
    - js
categories: js
---
### 写在前面：

本文主要内容包括**js原生dom对象和jQuery对象的区别，联系，相互转换，以及踩坑经历**。情况是这样的，今天在实现一个js验证码的功能，需要获取input的值，然后我用jQuery的方法获取到了dom节点，然后用原生js获取input的值，结果就出错了，好在后来场外求助启宸欧巴在师兄的帮助下发现问题所在，并成功解决。将今天的踩坑经历，以及网上查阅的资料，集合成一篇文章，分享一波。

Dom原生对象和jQuery对象的区别：
---
**1.**jquery选择器得到的jquery对象和标准的 javascript中的document.getElementById()取得的dom对象是**两种不同的对象类型，两者不等价**；

**注：**js原生获取的dom是一个对象，jQuery对象就是一个数组对象，其实就是选择出来元素的数组集合。所以说他们两者是不同的对象类型不等价。

#### 2.jQuery无法使用DOM对象的任何方法，同理DOM对象也不能使用jQuery里的方法. 乱使用会报错。

#### 例如（文章下面有两个踩坑经历。）：
　　$("#id").html();
　　document.getElementById("id").innerHTML;
　　意思是指：获取ID为id的元素内的html代码。这两段代码**结果相同，但中间的取值过程不同**。
　　即：$("#id").innerHTML、document.getElementById("id").html()之类的写法都是错误的。

**注：**jQuery是从js衍生出来的，师出同源，但是jQuery是**经过一系列操作**之后，将其封装成了一个个不同的方法，学习jQuery开始就应当树立正确的观念，分清jQuery对象和DOM对象之间的区别，之后学习 jQuery就会轻松很多的。

---

### js-dom对象和jQuery对象相互转换：
　　**jQuery对象转成DOM对象**---两种转换方式：[index]和.get(index)
　　
　　1、**jQuery对象是一个数据对象**，通过[index]的方法（就是**通过下标索引寻找dom**，进行操作）
　　如：var $v = $("#v") ;	//jQuery对象
　　var v = $v[0]; //DOM对象
　　alert(v.checked) //检测这个checkbox是否被选中
　　2、jQuery本身提供，**通过.get(index)方法**
　　如：var $v = $("#v"); //jQuery对象
　　var v = $v.get(0); //DOM对象
　　alert(v.checked) //检测这个checkbox是否被选中
　　
　　**注：**其实两者都是同一个道理，即通过索引下标的方式，来寻找dom进行转换。

　　 **DOM对象转成jQuery对象:**
　　对于DOM对象，只需用$()把**DOM对象包装起来**，就可得到jQuery对象
　　如：var v=document.getElementById("v"); //DOM对象
　　var $v=$(v); //jQuery对象

踩坑经历：
---

### 今天出错的问题：

#### 出错代码：
````
var randomCode=$("#js5-authCode").value;//用jq获取dom，用js获取值。
//console的时候，这里会出现undefined。
````
#### 正确的应该：
````
var randomCode=$("#js5-authCode").val();//这里的val()是jq的一种方法。

````

### 再举个栗子：

$("#id").innerHTML）、document.getElementById("id").html()。

出错点：第一个是用jq获取dom，然后用js操作。第二个是用js获取dom，然后用jq进行操作

---
总结
---
### 框架之类的东西都是封装好了的一个个函数，中间会经历一些操作，中间的取值过程也是不同，所以我们写代码的时候尽量使用同一种方式来写，不能混合使用，大概就是酱样子。

参考资料：
[Js - Dom原生对象和jQuery对象的联系、区别、相互转换](http://www.cnblogs.com/libinblog/p/4239258.html)
[DOM对象与jQuery对象的理解与分析](http://blog.csdn.net/gtsjx/article/details/52396379)

**最后：**希望看完的朋友点个喜欢，也可以关注一下我，现在这阶段基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。码字不易，感谢支持，感激不尽！
**ps**：目前待业，坐标北京，求推荐工作。然后希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[](http://www.jianshu.com/u/8d1dd8c80f06)**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)  ，**[**简书主页链接**](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1) ，[github](https://github.com/OBKoro1) 。**

以上。2017.4.13







