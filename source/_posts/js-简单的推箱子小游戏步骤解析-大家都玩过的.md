---
title: js 简单的推箱子小游戏步骤解析--大家都玩过的
date: 2018-01-07 23:45:15
tags:
- js
- jq
- 小demo
- H5小游戏
categories: 小demo
---
## 前言

推箱子小游戏大家肯定都玩过，之所以写这篇文章，是觉得这个小游戏足够简单好理解，大家看完文章之后，自己也能花上半天功夫敲出一个推箱子小游戏来，如果喜欢的话可以点波赞，或者关注一下，希望本文可以帮到大家。

> 本文首发于我的个人blog：[obkoro1.com](http://obkoro1.com/)

### demo：[推箱子小游戏](http://obkoro1.com/web_accumulate/example/pushKoro/index.html)

## 步骤解析：

**本文代码已经放在了[github](https://github.com/OBKoro1/web_accumulate/blob/d6b599ca22d8656d3f31f80bffa976fac36d2d75/example/pushKoro/index.html)上面了,里面也进行了很详细的代码注释，可以copy下来，在本地运行一下看看**。



### 1. 渲染地图
1. html结构：
![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)
   
        html结构十分简单，只要弄一堆div，来放置地图的class就可以了，我这里初始化了12*9个div，地图里最多九行高度。   
        这些div都是同样大小，地图渲染出来区别的只是颜色的不同。

 2. 地图函数：
 
        var box=$('.box div'); //地图使用的div集合
        function create(){ //创建地图函数
        box.each(function(index){ //index的数量是固定的，是box div下面div的数量
             // 每次创建地图初始化div
            box.eq(index).removeClass();
        });
        box.each(function(index,element){ //循环整个div的数量 二维数组里数量不够的 默认为空白
        //level为关卡数 根据关卡渲染地图 builder为二维数组，为地图关卡
            if(builder[level][index]){ //过滤0
                box.eq(index).addClass('type'+builder[level][index]);
            }
        });
        box.eq(origin[level]).addClass("pusher"); //推箱人 皮卡丘位置
        }

        //第一关的地图长这样（下面只是栗子，不是代码），0代表不可抵达区域，1代表目标（要被推到的地方），
        //2代表普通路径（可以走的），3代表墙，4代表箱子
        [0,0,0,0,3,3,3,0,0,0,0,0,
        0,0,0,0,3,1,3,0,0,0,0,0,
        0,0,0,0,3,2,3,3,3,3,0,0,
        0,0,3,3,3,4,2,4,1,3,0,0,
        0,0,3,1,2,4,2,3,3,3,0,0,
        0,0,3,3,3,3,4,3,0,0,0,0,
        0,0,0,0,0,3,1,3,0,0,0,0,
        0,0,0,0,0,3,3,3,0,0,0,0] 


### 2. 捕获键盘事件,判断是否可以移动

使用[$(document).keydown()](http://www.w3school.com.cn/jquery/event_keydown.asp)jqery事件，捕获键盘事件。

1. 捕获键盘事件，上下左右以及wsad。 

       $(document).keydown(function (e) {
        var key=e.which;
        switch(key){
        //col 的值为12，上下移动要12个div为一个周期
        //方向键上或者w
        case 87:
        case 38:
            move(-col);//判断移动函数
        break;
        //方向键下或者s
        case 83:
        case 40:
           move(col);
        break;
        //方向键左或者a
        case 65:
        case 37:
            move(-1);
        break;
        //方向键右或者d
        case 68:
        case 39:
            move(1);
        break;
        }
       setTimeout(win,500); //按键之后调判断是否过关
       });

2. 判断是否可以移动。
 
分为两个判断条件：一个是推箱子，一个是不推箱子 自然移动，否则不移动皮卡丘。

        function move(step){ //是否移动判断
             // 分为两个判断条件一个是推箱子，一个是不推箱子 自然移动。 否则不移动皮卡丘
             //step 上下是12个div一个周期，左右是1个div positin是皮卡丘的原来位置
            var pikaqiu1=box.eq(position);//皮卡丘现在的地方
            var pikaqiu2=box.eq(position+step);//皮卡丘要去的下一个地方
            var pushBox=box.eq(position+step*2);//箱子要去的下一个地方
            if(!pikaqiu2.hasClass('type4')&&( pikaqiu2.hasClass('type1')||pikaqiu2.hasClass('type2'))){ //自然移动
                //判断：如果下一个div的class不包含type4(箱子)，并且 下一个div含有type1(目标位置)，或者type2(普通路径)
                //这一步和下一步判断是否有type4的原因是普通路径会变成有type4的路径，这时候就会出现问题
                pikaqiu1.removeClass("pusher"); //移除当前皮卡丘
                pikaqiu2.addClass("pusher");//移动皮卡丘到下一个位置
                position=position+step;//增加position值
            }
            else if((pikaqiu2.hasClass('type4'))&&(!pushBox.hasClass('type4'))&&(pushBox.hasClass('type1')|| pushBox.hasClass('type2')) ) {
                //推箱子    
                //如果下一个div的class包含type4(箱子)并且 不包含重叠type4(箱子) 并且 包含class type1（目标位置）或者 包含type2(空路)
               pikaqiu2.removeClass('type4');//移除当前箱子
                pikaqiu1.removeClass("pusher");//移除当前皮卡丘
                pushBox.addClass('type4');//移动箱子到下一个位置
                pikaqiu2.addClass("pusher").addClass("type2");//
                //本来是type4 移除之后，这里没有class了，要变成普通路径
                position=position+step;//增加position值 
            }
        }    

### 3.胜利判断：
每次移动都要调用这个胜利判断。

    function win(){ //胜利条件判断
        if($(".type1.type4").length===goal){ //推的箱子与关卡设置通过箱子的数量对比
            if(level<9) {
                alert("666，挑战下一关吧--OBKoro1");
                level++; //关卡+1
                goal = goalList[level];
                position = origin[level];
                create();
            }else {
                alert("厉害啊 大佬 通关了都");
            }
        }
    }


### [代码地址](https://github.com/OBKoro1/web_accumulate/blob/d6b599ca22d8656d3f31f80bffa976fac36d2d75/example/pushKoro/index.html)、[demo地址](http://obkoro1.com/web_accumulate/example/pushKoro/index.html)

## 结语

本文到这里就结束了，喜欢的话，赶紧自己去敲一个出来，希望本文可以帮助大家发散思维。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**[个人blog](http://obkoro1.com/)** and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)**  

以上2018.1.7