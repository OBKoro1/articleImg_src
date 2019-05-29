---
title: '使用 jQuery, Angular.js 实现登录界面验证码详解'
date: 2017-10-11 22:43:34
tags:
    - 前端登录界面验证码详解
categories: jQuery
---

写在前面：
--
前段事件，做了一个用ajax后台异步交互的登录功能，自己在上面加了一个验证码的功能，这个功能背后的原理挺好理解的，实现起来也十分简单，特此写波分享，，自己写的过程中踩了不少坑，这里还是照例写的详细点，大家可以做个参考，喜欢的朋友可以点个赞，或者关注一波。

最终实现的效果：
--

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

### 验证码效果

当点击登录之前，会先判断验证码是否正确（验证码可以不区分大小写，也可以区分大小写），验证码错误会刷新验证码，验证码验证之前，不会进行跨域登录操作。

### 整体思路。

1.取四位随机数

2.赋值到验证码的input框里。

3.在点击登录之前先用if判断验证码input框的值和输入框的值是否相等，相等时进入下一步操作，不相等直接返回错误

4.里面ajax的部分可以直接套进去。

### 细节：

1.这里的**验证码框的背景图片**是网上自己找的，显得验证码比较正式，不然显得有点low。

2.**不区分大小写**实际上就是利用js的toUpperCase()方法是把小写转换成大写，因为是原生js所以在angular中也可以使用！

3.将验证码封装成一个函数，然后在点击登录时在最后调用这个函数，可以**每次都刷新函数**。

4.**避免验证码被复制**，在html里面使用：disabled="disabled"——禁止验证码框文字被选中。

### 下面是代码部分实现过程详解（注释写的比较详细）：

html代码应该不会解释了，有不懂的，可以在评论区问我。下面**有部分关于angular的内容，暂时还没学到这里可以跳过去**，没有影响到实现效果的。(可以把代码复制过去，然后在自己本地试试。)

**先放用jq实现的过程，然后放angular实现的过程**，看过我几篇文章的都知道，我尽量会把所有代码，每一步都注释的清清楚楚，希望可以帮助到大家。

### 这里是html的内容：

````
<div class="js5-form" id="js5-form" ng-controller="enterCtrl">
        <div id="enter-all" >
            <h3>jnshu后台登录</h3>
            <form action="" name="myForm">
                <div class="js5-input-div">
                    <div class="js5-input-img1"></div>
                    <input id="js5-userNum" type="text" name="userName" placeholder="用户名" maxlength="12"  ng-model="userName" ng-keyup="mykey($event)" required/>
                </div>
            </form>
            <form action="" name="registerForm">
                <div class="js5-input-div">
                    <div class="js5-input-img2"></div>
                    <input id="js5-password" type="password" name="userPsd" placeholder="密码" maxlength="20" ng-model="userPsd" ng-keyup="mykey($event)" ng-minlength="5" ng-maxlength="16" required/>
                </div>
            </form>
            <!--账号和密码的登录框-->
            <form action="" >
                <div class="js5-input-div">
                    <span class="js5-input-divSpan">验证码：</span>
                    <input type="text" placeholder="不区分大小写" class="js5-form3-input" id="js5-form3-input" ng-model="writeCode"  maxlength="6" ng-keyup="mykey($event)">
                    <input type="text" class="js5-authCode" value=""  id="js5-authCode" ng-model="showAuthCode" disabled="disabled">
                     <!--disabled="disabled"禁止验证码框文字被选中-->
                    <span class="spanShift" ng-click="changeVerify()">获取</span>
                </div>
            </form>
````

### 这里是jq代码实现部分：

记得引入jq文件。

````
var authCode;
    randomCode=$("#js5-authCode").eq(0);//获取验证码出现的方框dom
console.log(randomCode);

function createCode() {
    authCode="";//设置这个为空变量，然后往里面添加随机数
    var authCodeLength=4;//随机数的长度
    randomArray=[0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z'];
    //创建一个数组，随机数从里面选择四位数或者更多
    for(var i=0;i<authCodeLength;i++){
        var index=Math.floor(Math.random()*36);//随机取一位数
        authCode +=randomArray[index];//取四位数，并+相连
    }
    console.log(authCode);//取到四位随机数之后，跳出循环
    randomCode.val(authCode);//将四位随机数赋值给验证码出现的方框
    console.log(randomCode.val());
}

//以上是封装的获取验证码的函数

$(function () {//当文档加载结束后，运行这个函数
    createCode();//一开始先运行一遍取随机数的函数
    $("#js5-btn").click(function () {//这里是一个点击事件
        console.log(window.randomCode);
        //这里写了一个必报，window.randomCode是在文档里面找到这个dom，否则上文的四个随机数传不到这里来
        var randomCode=window.randomCode.val();
        console.log(randomCode);
        var authInput=$("#js5-form3-input").val().toUpperCase(),
            user=$("#js5-userNum").val(),
            psd=$('#js5-password').val();
        //上面三个是分别获取验证码输入框的值，账号的值，密码的值。
        //验证码输入框这里，最后toUpperCase()方法是把小写转换成大写
        console.log(authInput);
        console.log(randomCode);
        console.log(user,psd);
        if (randomCode===authInput) {
        //验证验证码，在验证码输入框与验证码的值不相等之前，是不会进入下面登录的步骤的，验证码是第一步关卡
            var firstAjax = new XMLHttpRequest();
            //创建ajax对象，这里是ajax跨域的部分
            firstAjax.open("POST", "这里是你url跨域的地址", true);
            //连接服务器，跨域。
            firstAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //setRequestHeader() 方法指定了一个 HTTP 请求的头部，它应该包含在通过后续 send() 调用而发布的请求中。
            //可以理解为，这是http的请求头，固定格式，位置必须要在open之后，send之前。
            firstAjax.send("name=" + user + "&pwd=" + psd);
            //在使用POST方式时参数代表着向服务器发送的数据，前面两个是账号框和密码框
            firstAjax.onreadystatechange = function () {//当参数被传入服务器的时候，引用监听事件。
                if (firstAjax.readyState == 4) {//readyState四种状态，当执行四步完成之后
                    if (firstAjax.status == 200) {//返回的是200，代表成功，404未找到。
                        var returnValue = JSON.parse(firstAjax.responseText);//取回由服务器返回的数据
                        console.log(returnValue);
                        if (returnValue.code == 0) {//这里是后端定义的，当code==0的时候，代表登录正确。
                            window.location.href = "https://www.baidu.com/index.php?tn=98012088_3_dg&ch=1";
                            //后端返回的数据验证成功就跳转链接。
                        }
                        else {
                            $("#js5Message").text(returnValue.message);//当code不等于0时，返回出错信息
                        }
                    } else {
                        alert("出错咯，咯咯咯");//返回的不是200的时候，出错。
                    }
                }
            };
            createCode();//点击登录按钮，验证之后会刷新验证码
        }
        else {
            $("#js5Message").text("验证码错误，请重新输入");
            createCode();//验证码错误，刷新验证码。
        }
    })
});
````
### 这是是angular代码实现部分：

jq部分写的详细一点，这里也挺详细的，如果不懂的话，可以回头看看jq部分，原理都是一样的，复制到本地自己多试试，记得引angular文件。

````
var enter=angular.module("myApp");
enter.controller('enterCtrl',['$scope','$http','$state',function ($scope,$http,$state) {
    $scope.changeVerify=function () {//定义了一个点击事件，获取验证码
        var authCode="";
        var authCodeLength=4;//取几个随机数字
        var randomArray=[0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z'];
        for(var i=0;i<authCodeLength;i++){
            var index=Math.floor(Math.random()*36);//随机取一位数
            authCode +=randomArray[index];//取四位数，并+相连
        }
        $scope.showAuthCode=authCode;//赋值
        console.log($scope.showAuthCode);
    };

    //上面是封装的获取验证码的函数，会在下面进行调用
  (function () {
        $scope.changeVerify();//调用点击事件。
        $scope.enter=function (userName,userPsd) {
            //点击登录按钮事件，将双向绑定的账号密码当做参数传入函数
            if ($scope.writeCode.toUpperCase() ==$scope.showAuthCode){//toUpperCase()将小写转化为大写
                //双向绑定验证码输入框，可以直接使用，这里是验证验证码
                $http({
                    method:"POST",
                    url:"你的跨域地址",//$http的固定格式
                    params:{
                        "name":userName,
                        "pwd":userPsd
                        //双向绑定的参数传到下个页面
                    }
                }).then(function (res) {
                    //获取服务器返回的参数
                    console.log(res);
                    if (res.data.code!==0){
                        //参数不为0的时候，弹出提示
                        alert(res.data.message);
                    }else {
                        //参数为0的时候，跳转页面
                        $state.go("home.studentList");

                    }
                })
            }else {
                alert("验证码输入错误咯，咯咯咯");
                $scope.changeVerify();//验证后，刷新验证码
            }
        }
    }());
````

后话
--
断断续续写了两天，现在写的没有之前那么快了。。差不多就以上这些内容，有问题可在评论区留言。有不足欢迎指导，拍砖。

**最后**：因为我经常看不懂别人写的分享，所以个人写文比较偏小白，写的不好之处，欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我，现在这阶段基本上每个月都不会少于十五篇文章（看到干货我也会进行分享）。码字不易，感谢支持！
**ps**：目前**待业**，坐标北京，求推荐工作。然后希望我写哪方面的文章可以在底下评论，或者是私信我，虽然写的不好，但我就当这是记录自己成长的一种方式咯。（前提是我会了，如果不会我也会记下来，等会了的时候再更出来。）
[](http://www.jianshu.com/u/8d1dd8c80f06)**[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)  ，**[**简书主页链接**](http://www.jianshu.com/u/8d1dd8c80f06)，**[csdn博客主页链接](http://blog.csdn.net/OBKoro1?skin=dark1) ，[github](https://github.com/OBKoro1) 。**





