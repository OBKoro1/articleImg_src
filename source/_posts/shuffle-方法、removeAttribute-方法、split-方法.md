---
title: shuffle()方法、removeAttribute() 方法、split()方法
date: 2017-10-11 22:10:16
tags:
    - shuffle
    - removeAttribute
    - split
categories: js
---

**写在前面：**内容包括demo代码，应用和定义，以及参考文献，本文主要内容是学习js期间学到的一些实用的零碎的js1知识，我都记下来了，需要的朋友可以过来参考下，前后可能没有太大的相关性。喜欢的可以点个赞，希望对大家有所帮助。
**Python shuffle()方法**
**语法**
```
shuffle (lst )
```
**参数**
lst -- 这可能是一个列表或元组。
**作用：**
打乱一个有序数组，最高效的数组乱序方法
**应用：**
打乱输出后，从头输出可用来输出随机数字。

这里有篇文章介绍数组乱序效率http://www.jb51.net/article/56099.htm

**HTML DOM removeAttribute() 方法**
**定义和用法**
 removeAttribute() 方法删除指定的属性（可用来清空设置的style属性）

语法
element.removeAttribute(attributename)
**效果**

![代码和效果](http://upload-images.jianshu.io/upload_images/5245297-25750b2c9fd07c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5245297-a6748685a3b14789.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**demo(demo比较长，放在文末)**

**audio.pause引用JQury导致不能正常播放**(引用音频，不能调用JQ的函数，否则会导致音频无法播放。)
**问题描述：**之前调用JQ的$，来获取dom，然后下面的pause就显示没有定义，因为这里调用了JQ，JQ里面没有封装pause，导致pause没有定义。
**正确的代码**
````
//之前引入JQ，然后用$("music"),会报错。因为pause没在JQ里面封装函数，不能调用JQ，所以要用getElementById("music");获取dom。
var audio=document.getElementById("music");
function runMusic() {//这是一个点击事件
    if (audio.paused){
        audio.play();
    }else {
        audio.pause();
    }
}
````
**split()方法**
**语法**
````
string.split(separator,limit)
````
**参数**
**separator:**可选。字符串或正则表达式，从该参数指定的地方分割 string Object。

**limit:**可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。

**用法：**split() 方法用于把一个字符串分割成字符串数组。
**提示：** 如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。
**注意：** split() 方法不改变原始字符串。
**demo**
````
var a ="1,2,3,4,5,6"//这是一个字符串变量，里面包含"1,2,3,4,5,6"这个字符串。
var B = a.split(",")//从逗号处分割成一个字符串，返回值是数组B=[1,2,3,4,5,6];
````
**后话：**这次就先记这三个，还有一些没记，以后再记。（下面有removeAttribute() 方法的demo*）

**最后又到了观众朋友们最喜欢的求赞求关注环节：**希望看完的朋友点个喜欢，想关注我这个菜鸡是如何成长的也可以关注一下我，基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。码字不易，感谢支持，感激不尽！
**ps**：如果希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[简书主页链接](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1)**

**removeAttribute() 方法,demo**
````
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" Content="text/html; charset=utf-8" />
<title>javascript</title>
<style type="text/css">
body{font-size:12px;}
#txt{
    height:400px;
    width:600px;
	border:#333 solid 1px;
	padding:5px;}
p{
	line-height:18px;
	text-indent:2em;}
</style>
</head>
<body>
  <h2 id="con">JavaScript课程</H2>
  <div id="txt">
     <h5>JavaScript为网页添加动态效果并实现与用户交互的功能。</h5>
        <p>1. JavaScript入门篇，让不懂JS的你，快速了解JS。</p>
        <p>2. JavaScript进阶篇，让你掌握JS的基础语法、函数、数组、事件、内置对象、BOM浏览器、DOM操作。</p>
        <p>3. 学完以上两门基础课后，在深入学习JavaScript的变量作用域、事件、对象、运动、cookie、正则表达式、ajax等课程。</p>
  </div>
  <form>
  <!--当点击相应按钮，执行相应操作，为按钮添加相应事件-->
    <input type="button" value="改变颜色" onclick="color()" />
    <input type="button" value="改变宽高"  onclick="widthHeight()"/>
    <input type="button" value="隐藏内容"  onclick="cantent()"/>
    <input type="button" value="显示内容"  onclick ="block()"/>
    <input type="button" value="取消设置" onclick="recover()" >
  </form>
  <script type="text/javascript">
//定义"改变颜色"的函数
var cantent_box = document.getElementById("txt");
function color(){
    cantent_box.style.color = "red";
    cantent_box.style.backgroundColor = "blue";
}
function widthHeight(){
    cantent_box.style.width ="100px";
    cantent_box.style.height ="600px";
}
function cantent(){
    cantent_box.style.display ="none";
}
//定义"改变宽高"的函数
//定义"隐藏内容"的函数
function block(){
    cantent_box.style.display = "block";
}
//定义"显示内容"的函数
function recover()
    {var open=confirm("是否取消设置");
    if(open==true)
    {
       txt.removeAttribute("style");
    }
}

//定义"取消设置"的函数

  </script>
</body>
</html>
````