---
title: (干货)css自定义 range  radio select的样式滑轮，按钮，选择框
date: 2017-10-11 22:32:54
tags:
    - range  radio select css样式
categories: css
---
写在前面：
---
之前踩坑css的时候，遇到滑轮，按钮，选择框这类型的东西，**为了页面效果，总是需要自定义他们的样式**，而不使用他们的默认样式。当时写的时候，我也是蛮头疼的，弄了个demo，链接在下面。对此做个总结。本文是**面向前端小白**的，大手子可以跳过，写的不好之处多多见谅。

额，今天就先大概的将代码贴上来，考虑到篇幅的问题，就先写一下三个的实现方式，一般也都看得懂，代码注释的非常详细。因为**细分下来内容也很多**，准备之后再将如何实现的方式，属性，优化以及如何兼容各个浏览器的方式一步步的写出来。

### 最终效果：

![文章下面有demo链接](https://dn-mhke0kuv.qbox.me/a55ee3f7972d106aa085)

### 如何使用这些属性？
用法很简单，如下所示：

````
<input type="range">//滑动条
<input type="radio">//按钮
<select>//选择框
````

input type="range"样式修改：
---

![滑块的默认样式](https://dn-mhke0kuv.qbox.me/e1a2344d909082c1646d)
![滑块修改后的实现效果](https://dn-mhke0kuv.qbox.me/e34fb2c8622acdc68f79)

### html content

````
<div>
 <input type="range" class="slider-block" id="slider" max="18" min="6" step="1" value="6">
    <!--主要是一个type="range"属性,其他的会在细分的文章里面讲出来-->
</div>
````
### csscontent

````
.slider-block{
            outline: none; /*去掉点击时出现的外边框*/
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none; /*这三个是去掉那条线原有的默认样式，划重点！！*/
            width: 30%;
            height: 0.3rem;
            background: orange; /*这三个是设置滑块下面那条线的样式*/
        }
        input[type="range"]::-webkit-slider-thumb {
            /*::-webkit-slider-thumb是代表给滑块的样式进行变更*/
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none; /*//这三个是去掉滑块原有的默认样式，划重点！！*/
            -webkit-box-shadow:0 0 2px ;/*设置滑块的阴影*/
            width: 2.6rem;
            height:1.6rem;
            background: url("images/js2-d_03.png");
            background-size: cover; /*//这几个是设置滑块的样式*/
        }
        //文章下面有demo链接
````


### 文章下面有demo链接

代码里面注释关键点都写了，还不能理解的，可以看下demo。

---



input type="radio"修改默认样式
---

![按钮的默认样式](https://dn-mhke0kuv.qbox.me/8a473392afc4c904a8af)
![radio修改后的实现效果](https://dn-mhke0kuv.qbox.me/fddc27c19c39b6e3068b)

### html content

````
<form class="task10-main-box-shape" method="post" action="#">
    <!--//表单元素基本上都要加form，传送的参数的方式，传递的位置，这是一个好习惯-->

<div>
    <input id="shape1" name="box-shape" type="radio"  checked="checked" value="shape1" />
    <!--checked属性是当页面载入的时候选择这个按钮，value是传送的值-->
    <label for="shape1">对口箱</label><!--/加label标签点击这个字的时候，可以选中按钮-->
</div>
</form>
````

#### css样式这里相对难点，但我注释的已经很多了。

````

        .task10-main-box-shape input[type="radio"]{
            display: none;
            /*隐藏默认按钮的样式,这跟其他隐藏默认按钮的样式的方法不一样，注意一下*/
        }
````

````
    .task10-main-box-shape label{  /*这里是设置文字的样式*/
            display: inline-block;
            cursor: pointer;
            position: relative;
            padding-left: 3rem;
            margin-right: 6rem;
            font-size: 1.8rem;
            color: rgb(102,102,102);

        }
        .task10-main-box-shape label:before { /*这里是没被选中时候按钮的样式*/
            content: "";
            /*将要自定义的东西设置为空的字符串，就可以往里面随意加定义的样式了*/
            display: inline-block;
            background-color: #FFFFFF; /*设置背景*/
            padding:0.45em; /*撑开背景，就是中间那块白色的*/
            border: 1px solid gray;
            margin-right: 10px;
            position: absolute;
            left: 0;
            bottom: 3px;
            border-radius: 50%; /*设置圆角*/

        }

        input[type=radio]:checked + label:before {/*按钮被选中之后的样式，多了一个checked*/
            font-size: 1px;
            color: #FFFFFF;
            border:0.7rem solid rgb(29,122,217);
            /*设置按钮样式*/
        }
````
---


select修改默认样式
---

![选择框的默认初始样式](https://dn-mhke0kuv.qbox.me/5a226ede690f8b9a9a56)
![select修改后的实现效果](https://dn-mhke0kuv.qbox.me/bd148502090aea355bdd)### html cantent

````
<div>
    <select class="task10-main-box-row2-select">
        <option>查看详情</option>
        <option>我也不知道</option>
        <option>详情是什么</option>
    </select>
</div>
````
### css cantent
````
    .task10-main-box-row2-select{
            font-size: 1.6rem;
            color: rgb(153,153,153);
            padding: 0.3% 2% 0.3% 1%;
            margin: 0; /*这里是选择框里面的样式*/
            background: url("images/task10-d_03.png") no-repeat 97%;
            /*97%是设置图片，也就是三角形的位置*/
            background-size:20%; /*背景图片的尺寸*/
            appearance:none;
            -moz-appearance:none;
            -webkit-appearance:none; /*这三个是隐藏默认样式*/
        }
````
ps:css样式写的有点乱，各位看官，将就着看看，下面有demo链接。

---

## 总结

总的来说这类型的**首先需要将样式隐藏掉，然后再自行添加需要的类型**，但是有些隐藏样式的方式也不同，有些是这种，` appearance:none;
            -moz-appearance:none;
            -webkit-appearance:none;`像radio按钮的，反而是`display:none;`这种类型的。还有的样式可以写的很好看，比如滑块怎么移动的时候，填充条跟着移动。**会的大家都会，要琢磨的精，会别人不会的，才是你身价所在。**

---
后话：
---

连续一个多星期不睡午觉，终于熬不住了。感觉身体被掏空，以后就改为下午的时候更文。因为一些事情耽搁了，直到晚上才弄好。下面几天会逐渐把这几个**如何实现的方式，属性，优化以及如何兼容各个浏览器的方式**一步步的写出来，链接会放在文末的。


假装这里有三个链接。
[range滑块自定义样式，步骤详解以及实际应用](https://juejin.im/post/58f2f43c61ff4b0058f4b5c5)

**最后：**希望看完的朋友点个**喜欢**，也可以**关注**一下我，现在这阶段基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。码字不易，感谢支持，感激不尽！
**ps**：目前待业，坐标北京，求推荐工作。然后希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[](http://www.jianshu.com/u/8d1dd8c80f06)**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)  ，**[**简书主页链接**](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1) ，[github](https://github.com/OBKoro1) 。**

demo链接：https://obkoro1.github.io/article-demo/diy-style/diyStyle.html

以上，2017.4.16.