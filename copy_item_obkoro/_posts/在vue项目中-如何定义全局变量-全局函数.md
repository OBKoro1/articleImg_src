---
title: 在vue项目中 如何定义全局变量 全局函数
date: 2017-10-23 21:30:40
tags:
    - Vue
    - vue-cli配置
categories: Vue
---
写在前面：
---
如题，在项目中，经常有些函数和变量是需要复用，比如说网站服务器地址，从后台拿到的：用户的登录token,用户的地址信息等，这时候就需要设置一波全局变量和全局函数，这两个设置不太难，而且有一些共通之处，可能有一些朋友对此不太了解，所以随便写出来分享一波。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

## 定义全局变量

### 原理：

设置一个专用的的全局变量模块文件，模块里面定义一些变量初始状态，用export default 暴露出去，在main.js里面使用Vue.prototype挂载到vue实例上面或者在其它地方需要使用时，引入该模块便可。

### 全局变量模块文件：
 Global.vue文件：

    <script>
    const serverSrc='www.baidu.com';
    const token='12345678';
    const hasEnter=false;
    const userSite="中国钓鱼岛";
      export default
      {
        userSite,//用户地址
        token,//用户token身份
        serverSrc,//服务器地址
        hasEnter,//用户登录状态
      }
    </script>


### 使用方式1：
**在需要的地方引用进全局变量模块文件**，然后通过文件里面的变量名字获取全局变量参数值。

**在text1.vue组件中使用：**

    <template>
        <div>{{ token }}</div>
    </template>

    <script>
    import global_ from '../../components/Global'//引用模块进来
    export default {
     name: 'text',
    data () {
        return {
             token:global_.token,//将全局变量赋值到data里面，也可以直接使用global_.token
            }
        }
    }
    </script>
    <style lang="scss" scoped>

    </style>

### 使用方式2：


在程序入口的main.js文件里面，将上面那个Global.vue文件挂载到Vue.prototype。

        import global_ from './components/Global'//引用文件
        Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

接着在整个项目中不需要再通过引用Global.vue模块文件，直接通过this就可以直接访问Global文件里面定义的全局变量。

text2.vue：

    <template>
        <div>{{ token }}</div>
    </template>

    <script>
    export default {
     name: 'text',
    data () {
        return {
             token:this.GLOBAL.token,//直接通过this访问全局变量。
            }
        }
    }
    </script>
    <style lang="scss" scoped>
    </style>

### Vuex也可以设置全局变量：

通过vuex来存放全局变量，这里东西比较多，也相对复杂一些，有兴趣的小伙伴们，可自行查阅资料，折腾一波、

## 定义全局函数

### 原理

新建一个模块文件，然后在main.js里面通过Vue.prototype将函数挂载到Vue实例上面，通过this.函数名，来运行函数。

### 1. 在main.js里面直接写函数

简单的函数可以直接在main.js里面直接写

    Vue.prototype.changeData = function (){//changeData是函数名
      alert('执行成功');
    }

组件中调用：

    this.changeData();//直接通过this运行函数

### 2. 写一个模块文件，挂载到main.js上面。

base.js文件，文件位置可以放在跟main.js同一级，方便引用

    exports.install = function (Vue, options) {
       Vue.prototype.text1 = function (){//全局函数1
        alert('执行成功1');
        };
        Vue.prototype.text2 = function (){//全局函数2
        alert('执行成功2');
        };
    };

main.js入口文件：

        import base from './base'//引用
        Vue.use(base);//将全局函数当做插件来进行注册

组件里面调用：

        this.text1();
        this.text2();



后话
---
上面就是如何定义全局变量 全局函数的内容了，这里的全局变量全局函数可以不局限于vue项目，vue-cli是用了webpack做模块化，其他模块化开发，定义全局变量、函数的套路基本上是差不多。上文只是对全局变量，全局函数的希望看完本文能给大家一点帮助。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。
[blog网站](http://obkoro1.com/)  and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372) **

以上2017.10.23

### 参考资料:

[详解VUE 定义全局变量的几种实现方式](http://www.jb51.net/article/115093.htm)
[ Vue中如何定义全局函数](http://www.jianshu.com/p/04dffe7a6b74)
[Vue.use源码分析](http://www.cnblogs.com/dupd/p/6716386.html)
[export default](https://segmentfault.com/q/1010000006854993)

