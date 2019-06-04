---
title: 手摸手教你在vue-cli里面使用vuex，以及vuex简介
date: 2017-12-09 19:15:18
tags:
 - Vue
 - Vuex
 - Vue-cli
categories: Vue
---
写在前面：
---
这篇文章是在vue-cli里面使用vuex的一个极简demo，附带一些vuex的简单介绍。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

> 本文首发于我的个人blog：[obkoro1.com](http://obkoro1.com/)

## 引入步骤

我创建了一个新的vue-cli里面什么东西都没有，只引用了vuex，这里是[码云地址](https://gitee.com/OBKoro1/blog_vuex),可以下载下来，然后`npm install`、`npm run dev`试试看，里面vuex的使用地方也全都注释了一遍。

### 安装

        npm install vuex --save

### 在src目录下创建文件夹vuex
    
![文件夹包含文件](https://user-gold-cdn.xitu.io/2017/12/9/1603a90a59fc5676?w=363&h=335&f=png&s=16366)

该文件夹包含以上文件，创建好了之后，我们一个一个文件来说里面都有什么东西。

#### vuex/index.js

    import Vue from 'vue';
    import Vuex from 'vuex';
    import status from './modules/status/index';//引进模块
    Vue.use(Vuex);
    
    export default new Vuex.Store({
      modules: {  
        //Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action
        dataStatus:status,//访问这里面数据的时候要使用'dataStatus'
      },
    });
    
这是vuex的主文件store，这个例子是把state、mutation、action分割成模块，然后再将每个模块引用进这个index.js文件里面，等我们整个文件夹的文件都搭好之后，还要把文件引入到main.js里面、

### vuex/modules/status/index.js

    import actions from './actions';
    import mutations from './mutations';
    //引入action和mutations 
    
    export default {  
      state:{ //这里面是要读取或者写入数据的地方
          msg:'默认状态',
      },
      //state actions mutations顺序不能乱
      actions: actions,
      mutations: mutations,
    }

这是一个模块里面的主文件，模块内部拥有自己的state、actions、mutions，是从上到下进行分割的。

### vuex/modules/status/mutation_type.js

    //这个js文件里面只是一些变量，把action和mutation文件里面相同变量名的链接起来
    export const VUEX_TEST = 'VUEX_TEST';
    // 一般使用的是大写来命名变量，因为尤大也是这么做 2333

### vuex/modules/status/actions.js

    import * as types from './mutation_type'; //引入变量
    export default {
      actionFn({commit},data){ //actionFn是在组件通过dispatch触发的函数名 可以理解成组件和actions的连接
        commit(types.VUEX_TEST,data);
        //types.VUEX_TEST 是要commit到mutation的哪个位置 变量的作用
        //data 是传过来的参数
      }
    };

### vuex/modules/status/mutations.js

    import * as types from './mutation_type';//引入变量
    
    export default {
      //types.VUEX_TEST 代表接受哪个actions的commit 也就是上面引入变量的作用
      [types.VUEX_TEST](state,data){ 
        //第一个参数state是这个模块的state 第二个参数是传进来的数据 
        if(data.status==1){ //根据传进来的参数做各种操作
          //这里就是操作state了，赋值之后，各个组件上面引用该数据的地方会自动更新      
          state.msg=data.text;
        }else if(data.status==2){
            state.msg='奕迅';
        }
        //这里是随便写的一个栗子
        console.log(state.mg,data,'mutation'); 
      }
    };
    
这两个文件里面有注释，解释的蛮清楚的。当把所有文件创建好了之后，再回过头来看看每个文件之间都有联系,多想想或许就懂点什么东西了 emmm

#### [vuex文件夹](https://gitee.com/OBKoro1/blog_vuex/tree/master/src/vuex)，文件目录以及下载

### 引入main.js

![](https://user-gold-cdn.xitu.io/2017/12/9/1603ac7ca073cb0e?w=765&h=427&f=png&s=49028)

上面的vuex文件夹只是搭建一个store，但是这样还不够，我们还要在项目里面使用这个。引用到main.js，如图所示。

### 组件中如何使用。

![](https://user-gold-cdn.xitu.io/2017/12/9/1603acd24b3c1906?w=773&h=875&f=png&s=97062)

使用的话就是像上面那么使用，本文只是一个简单的示例，还有更多骚操作，等大家上手之后再慢慢摸索咯。

## git地址

感觉写的蛮乱的，大家如果看不太懂的话，可以到[码云](https://gitee.com/OBKoro1/blog_vuex)去下载文件，然后自己跑一跑，多看看，试一试就应该没问题了。

## vuex简介

通常我是希望大家先学会用，然后再了解后面的机制，每次我看博文的时候，一大段原理贴上来，都给我弄懵逼了。。

vuex主要是用来**复杂项目之间的组件通信功能**，简单的项目不要用这套复杂的事件以及状态管理机制。项目如果不够复杂的话推荐我之前写的：[在vue项目中 如何定义全局变量 全局函数](https://juejin.im/post/59eddbfe6fb9a0450908abb4)，使用全局变量的形式的也可以实现需求。

### vuex实现的作用：数据共享机制

通过统一的数据中心store维护状态数据，每个组件进行更新的时候，通知数据中心store。再由stroe将共享的状态，触发每一个调用它的组件的更新。

![store触发组件更新](https://user-gold-cdn.xitu.io/2017/12/9/1603ae6d33eae6db?w=554&h=570&f=png&s=153482)

### vuex的工作流程

大家先仔细看看下面这张图，理解他的工作机制。

![](https://user-gold-cdn.xitu.io/2017/12/9/1603ae858f7da6cd?w=789&h=530&f=png&s=148466)

1. 在vue组件里面，通过dispatch来触发actions提交修改数据的操作。
2. 然后再通过actions的commit来触发mutations来修改数据。
3. mutations接收到commit的请求，就会自动通过Mutate来修改state（数据中心里面的数据状态）里面的数据。
4. 最后由store触发每一个调用它的组件的更新

### 注意：这套模型是单向流动的

后话
---
以上就是本文的所有内容了，希望可以帮到大家。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
**[个人blog](http://obkoro1.com/)** and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)**  

以上2017.12.9



    
