---
title: indexOf和push（）获得不重复随机数组
date: 2017-10-11 22:08:58
tags:
    - indexOf数组去重
categories: js
---
**写在前面：**整体思路：先random()获取随机数，indexOf()排除相同的随机数，push()将不重复随机数添加到数组。其实一直想写这篇已经很久了，因为之前做的一个东西还不完善，有bug。所以一直拖到现在。今天中午趁机做了个总结，需要的小伙伴可以看看，做个参考。

之前本来是一个很low的去重方法:
````
先获得三个随机数，然后三个随机数分别互相比较，当出现相等的情况时，那个随机数再随机一次，然后返回那三个随机数。这个方法low在：每个数值都要比较一下，，数量少的时候，还可以写，数量多的时候，你一个个比一下试试看？
````
  下面是新想的方法：
**先上效果：**

![随机获得三个box，color](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
 **页面效果：**每隔一秒换一下随机box和随机颜色，不间断运行。   （下面有链接）

**获取随机box，以及添加到数组里面的js代码**
```
var num=[];//box的随机数组
var box_dom = document.getElementsByClassName("icon");//获得盒子的dom
function whileRun(){
    num=[];//继续运行的时候清空数组，不然box不会变。
    while (num.length<3){
        box_dom_num=Math.floor(Math.random()*9);
        console.log(box_dom_num);
        //随机的box赋值给box_dom_num.
        if (num.indexOf(box_dom_num)<0){//随机选择的box看有没有在原先已经添加的数组里面，如果没有，就添加进去，如果有，重新运行函数。
            num.push(box_dom_num);// 将随机选择到的box添加到数组里面去。
         }
        console.log(num);
    }
    return num;//    跳出while循环再返回数组

}
```

分解步骤：
**random()获取随机数：**
````
 box_dom_num=Math.floor(Math.random()*9);//获取盒子的随机数,下标从0开始，随机数范围0~8；
````
上面这串代码的解释：盒子=随机获得0-1之间的数字*9然后进行下舍入获得的整数。
关于随机数生成这里还不太懂的同学，http://www.jianshu.com/p/759546b24c5b  移步这里。

**indexOf()排除相同的随机数**
首先需要知道的是**indexOf()**这个方法是什么，及其作用。

**w3c定义和用法**indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。

从这里看不出有什么跟获取随机数有什么关联的地方，但是下面的一句注释，就可以和随机数关联起来：

![Paste_Image.png](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
这是代码：
````
 if (num.indexOf(box_dom_num)<0){//随机选择的box看有没有在原先已经添加的数组里面，如果没有，就添加进去，如果有，重新运行函数。
            num.push(box_dom_num);// 将随机选择到的box添加到数组里面去。
         }
````
解释：检索num这个数组里面，之前**有没有出现**box_bom_num。如果没有出现的话（就是不重复了）,那么 (num.indexOf(box_dom_num)就会<0，然后执行下面的内容。

**push()将不重复随机数添加到数组**
push()定义和用法：
push() 方法可向数组的末尾**添加**一个或多个元素，并返回新的长度。
````
 num.push(box_dom_num);// 将随机选择到的box添加到数组里面去。
````
解释：上面已经将box_dom_num去除重复随机数了，直接添加就可以。

然后：继续while循环，直到num.length<3的时候，返回已经**去完重复随机数**的num数组。

链接放上来，可以自己看**源码**：https://obkoro1.github.io/jnshu/js-task/task1/js1.html

**最后又到了观众朋友们最喜欢的求赞求关注环节：**希望看完的朋友点个喜欢，想关注我这个菜鸡是如何成长的也可以关注一下我，基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。码字不易，感谢支持，感激不尽！
**ps**：如果希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[简书主页链接](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1)**