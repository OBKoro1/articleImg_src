---
title: js定时器用法详解——setTimeout()、setInterval()、clearTimeout()、clearInterval()
date: 2017-10-11 22:54:46
tags:
    - js定时器
categories: js
---
写在前面：
---
在js应用中，定时器的作用就是可以设定当到达一个时间来执行一个函数，或者每隔几秒重复执行某段函数。这里面涉及到了三个函数方法：setInterval()、setTimeout()、clearInterval()，本文将围绕这三种函数的用法，来实现定时器的功能，需要的朋友可以过来参考下，喜欢的可以点波赞，或者关注一下本人，希望对大家有所帮助。

定时器的应用需求：
---
1.设定一个时间，当时间到达的时候执行函数————比如：倒计时跳转页面等等。

2.每隔一段时间重复执行某段函数————比如抢票软件，比如设定500毫秒就重复刷新一次页面等等。

### 倒计时跳转实现demo：

![里面也有实时显示时间的方法。](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### js定时器：

菜鸟教程中是这么说的——js 定时器有以下两个方法：

**setTimeout() ：**在指定的毫秒数后调用函数或计算表达式。

**setInterval() ：**按照指定的周期（以毫秒计）来调用函数或计算表达式。方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。

### 使用语法：

setTimeout（）：setTimeout(code,millisec)

setInterval（）：setInterval(code,millisec[,"lang"])

**参数：**code————要进行**调用的函数或者要执行的代码串**。millisec————**时间**（默认毫秒来计算），lang————可选。 JScript | VBScript | JavaScript（）

以上来自W3C：[setTimeout() ](http://www.w3school.com.cn/jsref/met_win_settimeout.asp),[setInterval()](http://www.jb51.net/shouce/htmldom/jb51.net.htmldom/htmldom/met_win_setinterval.asp.html)


然而setTimeout()、setInterval()的区别在于
---

**setTimeout()**：当方法执行完成定时器就立即停止(但是定时器还在,只不过没用了);

**setInterval()：**当方法执行完成,定时器并没有停止,以后每隔[interval]这么长的时间都会重新的执行对应的方法[function],直到我们手动清除定时器为止;

### 意思就是：
**setTimeout()时间到了只会执行一次，setInterval()不会停止，会不间断的执行对应的函数**，直到我们手动暂停或窗口被关闭。

**文章下面有demo讲解：**

---

 那么如何暂停setTimeout()、setInterval():
 ---

### clearTimeout（）取消由setTimeout() 方法设置的 timeout。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### clearInterval() ，这个函数只有一个作用，就是暂停setInterval()调用函数。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### 参数id_of_settimeout的意思是：

clearTimeout是：使用clearTimeout()的函数名字，或者clearTimeout()调用的函数的名字。

setInterval是：使用setInterval()的函数名字，或者setInterval()调用的函数的名字。

**提示：**setTimeout、setInterval在设置定时器的时候有区别，然而他们在清除定时器的时候没有区别。

W3C资料:[clearTimeout()](http://www.w3school.com.cn/jsref/met_win_cleartimeout.asp)，[clearInterval()](http://www.w3school.com.cn/jsref/met_win_clearinterval.asp)

---

### 倒计时跳转demo讲解：

````
//html相关部分：
    <div class="time">请等待<span id="dd">5</span>秒</div>
    //这里的5是初始5秒跳转。
//js部分：
function run(){
            var s = document.getElementById("dd");//获取dd的dom
            if(s.innerHTML == 0){// 当dd==0的时候，跳转链接并且暂停函数
                window.location.href = "https://juejin.im/user/58714f0eb123db4a2eb95372/article";
                clearInterval(run());//取消由 setInterval() 设置的 timeout，，这里数字暂停在0这里，否则时间会继续往下减会出现负数。
                //setInterval调用了run()，所以setInterval的返回ID值是run（）
            }
            s.innerHTML = s.innerHTML -1;//从5秒开始，隔一秒跑一次run()然后减1
        }
        window.setInterval("run();", 1000); //这段代码的效果是一秒调用一次run()，
        //“run()”是要执行的代码块，1000是时间，默认单位是毫秒
````

上面这段代码主要是一个倒计时的效果，setInterval每隔一秒调用一次代码块run()，当时间被减到0的时候，暂停继续调用run()，否则会出现-1、-2的情况，然后跳转链接。**具体的不懂的可以看代码注释，写的很详细。**

如果还不知道的话，可以自己做个demo试试效果就知道了。

### demo链接：

**[倒计时跳转](https://obkoro1.github.io/article-demo/js-time/time-countDown.html)**

### 菜鸟教程也有一个demo：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

这也是一篇文章，写的听不错的，推荐一波！

链接地址：[js 定时器](http://www.runoob.com/w3cnote/js-timer.html)

---

写在后面：
---
就十天没写文了，写的时候就感觉有点不知道怎么入手了，纠结了半天。我觉得应该把定时器的用法介绍清楚了，如果有什么地方写的不好的，欢迎指正，会在文章内勘误的。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！因为我经常看不懂别人写的分享，所以个人写文比较偏小白，写的不好之处，欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**ps**：目前**待业**，坐标北京，本人适应互联网快节奏，高强度，持续学习，持续成长，认真，严谨，学习积极性强。**中小公司大佬求带走**，邮箱：obkoro1@foxmail.com。
**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **

### 参考链接：

[js 定时器](http://www.runoob.com/w3cnote/js-timer.html)
[关于js中两种定时器的设置及清除](http://www.cnblogs.com/wangying731/p/5164780.html)
[w3c：setTimeout()](http://www.w3school.com.cn/jsref/met_win_settimeout.asp),
[w3c：setInterval()](http://www.jb51.net/shouce/htmldom/jb51.net.htmldom/htmldom/met_win_setinterval.asp.html)，
[w3c：clearTimeout()](http://www.w3school.com.cn/jsref/met_win_cleartimeout.asp)，
[w3c：clearInterval()](http://www.w3school.com.cn/jsref/met_win_clearinterval.asp)。