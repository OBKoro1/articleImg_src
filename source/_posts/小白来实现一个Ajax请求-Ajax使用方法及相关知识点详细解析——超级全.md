---
title: '小白来实现一个Ajax请求[Ajax使用方法及相关知识点详细解析——超级全]'
date: 2017-10-11 22:56:14
tags:
    - 小白实现ajax请求
categories: js
---
写在前面：
---
本文主要总结整理Ajax使用方法背景知识点的详细解析，以及Ajax跨域的具体使用方式并且对栗子进行了讲解，需要的朋友可以过来参考下，喜欢的可以点波赞，或者关注一下本人，希望通过本文能够作为一个Ajax的查找资料，不懂Ajax？看这篇文章就可以了。

ajax简介：
---
*   Ajax 的全称是Asynchronous JavaScript and XML，意思是：异步 JavaScript 和 XML
*   Ajax是使用XMLHttpRequest对象与服务器端通信的脚本语言
*   可以发送及接收各种格式的信息，包括JSON、XML、HTML和文本文件。
*   AJAX可以无需刷新页面而与服务器端进行通信。
*   允许你根据用户事件来更新部分页面内容。

Ajax工作原理：
--
Ajax的工作原理相当于**在用户和服务器之间加了一个中间层(Ajax引擎),使用户操作与服务器响应异步化**。并不是所有的用户请求都提交给服务器,像—些数据验证(比如判断用户是否输入了数据)和数据处理(比如判断用户输入数据是否是数字)等都交给Ajax引擎自己来做, 只有确定**需要从服务器读取新数据时再由Ajax引擎代为向服务器提交请求**。把这些交给了Ajax引擎，用户操作起来也就感觉更加流畅了。

Ajax的优点：
---
1. 页面无刷新，用户体验好。
   * AJAX最大优点就是能在不刷新整个页面的前提下与服务器通信维护数据。这使得Web应用程序更为迅捷地响应用户交互，并避免了在网络上发送那些没有改变的信息，减少用户等待时间，带来非常好的用户体验。
   
2. 异步通信，更加快的响应能力。
    * AJAX使用异步方式与服务器通信，不需要打断用户的操作，具有更加迅速的响应能力。优化了Browser和Server之间的沟通，减少不必要的数据传输、时间及降低网络上数据流量。
    
3. 减少冗余请求，减轻了服务器负担

   * AJAX的原则是“按需取数据”，可以最大程度的减少冗余请求和响应对服务器造成的负担，提升站点性能。  
   
4. 基于标准化的并被广泛支持的技术，不需要下载插件或者小程序
  *  AJAX基于标准化的并被广泛支持的技术，不需要下载浏览器插件或者小程序，但需要客户允许JavaScript在浏览器上执行。
5. 界面与应用分离。 
  * Ajax使WEB中的界面与应用分离（也可以说是数据与呈现分离），有利于分工合作、减少非技术人员对页面的修改造成的WEB应用程序错误、提高效率、也更加适用于现在的发布系统。

Ajax应用场景：
---
* 数据验证。用户的注册，登录功能，通过与后台交互数据，进行数据验证
* 按需取数据。按照需求，展示所需要的部分数据，而不是一股脑的将整个网页全都展示出来。
* 自动更新页面。栗子：百度搜索的提示,出现联想提示语，展示用户最有可能搜索的词汇。
* 自动更新页面。栗子：在线聊天室，设置一个定时器，每隔几秒向请求数据，实时更新页面信息。

### 同步执行和异步执行。

javascript同步表示sync，指的就是：代码依次执行。javascript 异步表示async，指：代码执行不按顺序，可以这么理解：同步是在一条直线上的队列，异步不在一个队列上 各走各的。javascript所谓的“线程”，就是这样的一种概念。

虽然异步执行可以**实现多任务并行执行**，使执行的效率大大提高，但是异步执行也会**占用浏览器的性能**，不要胡乱的使用异步执行。

举个栗子：在负荷很重的客户/服务器系 统中，时间延迟频繁且漫长，在这种环境下就比较适宜宜采用异步执行模式。

关于同步和异步，大概只能说这些，有兴趣的朋友可以自己深入了解一下。

---


开始一个Ajax请求需要了解的背景知识：
===

XMLHttpRequest对象:
---

**Ajax的核心是XMLHttpRequest对象**，它是Ajax实现的关键，发送异步请求、接受响应以及执行回调都是通过它来完成，下面我们就来聊一聊XMLHttpRequest对象是什么鬼？拥有哪些属性、方法，这些都是用来干什么的，这对于我们系统性的了解Ajax请求是非常有帮助的。

XMLHttpRequest对象的属性：
---

![XMLHttpRequest对象的属性](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

XMLHttpRequest对象的方法：
---

![XMLHttpRequest对象的方法](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

[图片出处](https://juejin.im/entry/583a9e02ac502e006c214b81)

XMLHttpRequest虽然目前还没有被W3C所采纳，但是它已经是一个事实的标准，因为所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均支持 XMLHttpRequest 对象。，XMLHttpRequest对象的使用方式极其简单，先不要懵逼。继续往下看。

Ajax的跨域请求由哪些部分组成的
---

* **HTTP请求的方法或动作**，Ajax请求方式 ("POST" 或 "GET")， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
* 你**需要请求的URL**,总得告诉服务器请求的地址是什么吧?
* **请求头**,包含一些客户端环境信息,身份验证信息等
* **请求体**,也就是请求正文,请求正文中可以包含客户端提交的查询字符串信息,表单信息等等.

### GET和POST两种请求方式对比：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

在前后端分离的情况下，对于前端的小伙伴来说，一般是后端选择请求接口，请求方式，让我们去使用，所以请求方式的选择这点，稍微了解一下即可。

Ajax的跨域请的回复：http响应：
---
* 一个数字和文字组成的状态码,用来显示请求是成功还是失败
* 响应头,响应头和请求头一样包含许多有用的信息,例如服务器类型,日期时间,内容类型和长度等.
* 响应体,也就是响应正文.

### 服务器端返回的：常见的HTTP状态码

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

关于http的状态码还有非常多，不止上图这点这么简单，有兴趣的可以看本人之前写的一篇文章：[http状态码详解](https://juejin.im/post/590082e6a22b9d0065be1a5c)。

---

如何使用Ajax
===

### 本文中的栗子采用菜鸟教程ajax的栗子：[ajax实例](http://www.runoob.com/ajax/ajax-xmlhttprequest-send.html)

实现Ajax的四个步骤：
--
1. 新建一个XMLHttpRequest对象。
2. open方法表示初始化请求，此时并没有发送。
3. 定义数据返回后的回调函数，里面的代码在readystatechange值改变的时候执行。
4. 发送请求。

### 使用Ajax的一个栗子，里面注释的也较为详细：

````
function loadXMLDoc()
{//点击事件
  var xmlhttp;
  if (window.XMLHttpRequest)
  {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 //1、上面是创建XMLHttpRequest对象
  xmlhttp.open("POST","/try/Ajax/demo_post2.php",true);// 2、open方法表示初始化请求，此时并没有发送。
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("fname=Henry&lname=Ford");//4、发送请求
  xmlhttp.onreadystatechange=function();
  {//3、当参数被传入服务器的时候，引用监听事件。
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    //判断readyState四种状态，当执行四步完成之后，并且返回的是200（成功）
    {
      document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
}
````

### 1、新建一个XMLHttpRequest对象：

XMLHttpRequest对象在上文介绍了他的属性和方法，如上所述， Ajax的核心是XMLHttpRequest对象，这一步是必不可少的，下面就是它的使用语法。

````
var xmlhttp = new XMLHttpRequest();//没看错，就是这么简单
````

### Ajax兼容IE7以下：

XMLHttpRequest对象是IE7才开始支持的，老版本IE5和IE6使用的是ActiveX 对象，使用方式是一样的，区别在于要创建不同的对象。**IE7以上自带XMLHttpRequest对象，如果要兼容IE5和IE6只需判断浏览器中是否存在XMLHttpRequest对象。**

````
var xmlhttp;
  if (window.XMLHttpRequest)//检查是否有XMLHttpRequest对象
  {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
````

### 2、open方法表示初始化请求，此时并没有发送。

open方法的语法`open(method,url,async)`
1. 参数一：method——请求方式，get或者post。（默认为get）
2. 参数二：url——请求路径,文件在服务器上的位置
3. 参数三：async——true：异步请求。false:同步请求。（默认为true，异步请求。）

### 3.定义数据返回后的回调函数，里面的代码在readystatechange值改变的时候执行。

触发Ajax的时候，XMLHttpRequest 的状态会不断变化，这个值就存在readyState属性中。

#### readyState属性：
readyState只有5个值{0，1，2，3，4}，只读不能写。

0: XMLHttpRequest对象创建完成。————还没有调用open()方法

1: XMLHttpRequest对象初始化完成。————open() 方法已调用，但是 send()方法未调用。请求还没有被发送。

2: 请求已经发送。———Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。

3: 服务器已经返回了数据（但是还没有被解析，可能只一段http报文）。————正在解析响应内容

4: 数据解析已经完成。————响应内容解析完成,可以在客户端调用了

数据解析完成之后会返回一个http的状态码，通过XMLHttpRequest.status获得该值，判断是否为200，**判断是否请求成功**。

#### onreadystatechange事件：

每当readyState属性值改变时，就会触发 onreadystatechange 事件。——通过监听onreadystatechange事件,来判断请求的状态。

### 4、发送请求
1. send（）方法必须在open（）之后。
2.  * 在使用GET方式请求时无需填写参数
    * 在使用POST方式时需要使用setRequestHeader()来添加http头，然后在 send() 方法中规定您希望发送的数据

get:
````
xmlhttp.open("GET","/try/ajax/ajax_info.txt",true);
	xmlhttp.send();
````
post：
````
  xmlhttp.open("POST","/try/ajax/demo_post2.php",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("fname=Henry&lname=Ford");
````
菜鸟教程的栗子：[get方式](http://www.runoob.com/try/try.php?filename=tryajax_first)、[post方式](http://www.runoob.com/try/try.php?filename=tryajax_post2)

### 写在后面：

想到当初自己不会Ajax的时候，畏Ajax如洪水猛兽，希望小伙伴们，看了本文就能写出自己的第一个Ajax来，这也是我想写这篇文章的意义所在。十多天没写文了，这篇文章也准备了好几天，写的不好之后，欢迎指正，谢谢。


**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**[个人blog](http://obkoro1.com/)** and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)**  

### 参考资料：
 [Ajax与数据传输](http://www.jianshu.com/p/4905270afb71#)
 
 [Ajax入门（一）从0开始到一次成功的GET请求](http://blog.guowenfh.com/2015/12/18/Ajax-elementary-course-1/)
 
 [Ajax 总结篇](https://juejin.im/entry/583a9e02ac502e006c214b81)
 
 [菜鸟教程——AJAX 教程](http://www.runoob.com/ajax/ajax-tutorial.html)

以上。2017.6.1






















