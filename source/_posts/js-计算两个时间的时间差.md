---
title: js 计算两个时间的时间差
date: 2017-10-15 20:07:31
tags:
    - js
    - 时间差
categories: js
---
写在前面：
---
如题，就像题目说的需要计算出时间差，虽然不太难，但这个需求经常会在项目中遇到的，我在这边做一下整理，希望能够尽量全的整理出来。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

计算时间差原理：
---

### getTime()方法

方法定义： getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。

通常我们计算时间差都是通过获取两个时间数据，然后分别使用getTime（）方法返回与固定的1970 年 1 月 1 日的时间差，通过对返回毫秒数的差，换算成时间单位，得出两个时间的时间差。

开始操作：
---

首先你会有一串初始的时间数据，然后通过 new Date(你的时间数据)，将你的数据**转成Date对象**的形式。

        var t1="2017/08/28 04:56:38"; //数据
        var dateBegin = new Date(t1);//转化为Date对象的形式
        //Mon Aug 28 2017 04:56:38 GMT+0800 (中国标准时间)  这里就是Date对象的数据形式

### 时间格式

这里的话就要注意一下后端给的**时间数据格式**的问题，比如下面两种：

        第一种："2017/08/28 04:56:38"//这种格式不用再进行处理
        第二种："2017-08-01 18:56:38"//这种格式就要进行处理

因为new Date()方法不能处理第二种数据，所以我们这里需要**将第二种数据格式转化为第一种数据的格式**。

         var t1="2017-05-12 00:13:53";
         var dateBegin = new Date(d1.replace(/-/g, "/"));//replace方法将-转为/

不知道大家是什么情况，反正因为我们后端给我的数据就是第二种的，所以我会提一下这个东西（捂脸）。

#### 另一个时间数据:

既然是时间差的话，就肯定要有两个数据，不然怎么两相比较，一般两个数据中都会有一个当前时间的数据。

          var dateEnd = new Date();//当前时间数据

### 完整计算时间差(天、小时、分钟、秒)的代码：

先获取之间的毫秒差，通过毫秒差换算出你所需要的时间单位，然后时间单位之间的换算根据的是他们的倍数关系。

    function timeFn(d1) {//di作为一个变量传进来
        //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
        var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
        var dateEnd = new Date();//获取当前时间
        var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
        var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000))//计算出小时数
        //计算相差分钟数
        var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
        //计算相差秒数
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000)
        console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
        console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
            ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
    }
    var t3="2017-08-18 04:56:38";
    timeFn(t3);

![demo时间差数据截图](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### 不成熟的计算月、年:

        //这里的dayDiff就是上文计算出的天数差
        let monthDiff=Math.floor(dayDiff/30);//以30天为一个月不够精准严谨
        //获取相差的月份
          if (monthDiff<12){
            timeThis=monthDiff+"个月前发布";//获取相差的月份
            return
          }
          let yearDiff=Math.floor(monthDiff/12);//获取相差的年份
          if(yearDiff>=1){
            timeThis=yearDiff+"年前发布";
            return
          }

当天数相差较大的时候，单纯计算天数已经不能满足需求了，因为我们PM说的统一以30天为一个月的分界线，然后这里月份的计算情况感觉很复杂的样子没有继续研究下去。

### 获取当前月份的天数

        function getDays() {
           //构造当前日期对象
           var date = new Date();
           var year = date.getFullYear();//获取年份
           var mouth = date.getMonth() + 1;//获取当前月份
           var days;//定义当月的天数；
           if (mouth == 2) {//当月份为二月时，根据闰年还是非闰年判断天数
               days = year % 4 == 0 ? 29 : 28;
           }
           else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
               //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
               days = 31;
           }
           else {
               //其他月份，天数为：30.
               days = 30;
           }
           return days;
       }
网上找了个获取当前月份天数的函数，上面的注释也足够全，我就一起贴上来，连接在下面。

后话
---
上面就是本文计算时间差的内容了，希望看完本文能给大家一点帮助。最后一个提示：一般需要处理的数据不会只有一两个，很可能会给一个数组，你需要处理每个数组元素的时间数据，这时候建议用forEach()函数遍历整个数组。


**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
[blog网站](http://obkoro1.com/)  and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **

以上2017.10.15

### 参考资料:

[Js 获取当前月的天数](http://www.cnblogs.com/rzm2wxm/p/5749151.html)
[ Js计算时间差（天、小时、分钟、秒）](http://blog.csdn.net/wei_jie_zhang/article/details/45873837)