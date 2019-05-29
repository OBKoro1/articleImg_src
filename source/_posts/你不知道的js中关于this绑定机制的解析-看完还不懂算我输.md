---
title: '你不知道的js中关于this绑定机制的解析[看完还不懂算我输]'
date: 2018-06-30 18:29:19
tags:
- js
- js 机制
categories: js
---
![](http://ww1.sinaimg.cn/large/005Y4rCogy1fstcwvzkjzj30sg0g0qqn.jpg)

## 前言

最近正在看《你不知道的JavaScript》，里面关于this绑定机制的部分讲的特别好，很清晰，这部分对我们js的使用也是相当关键的，并且这也是一个面试的高频考点，所以整理一篇文章分享一下这部分的内容，相信看本文的解析，你一定会有所收获的，如果喜欢的话可以点波赞/关注，支持一下。

<!--more-->

> 个人博客了解一下：[obkoro1.com](http://obkoro1.com/)

---

### 为什么要用this：

    function identify() {
      console.log("Hello,I'm " + this.name);
    }
    let me = {
      name: "Kyle"
    };
    let you = {
      name: "Reader"
    };
    identify.call(me); // Hello,I'm Kyle
    identify.call(you); // Hello,I'm Reader

这个简单的栗子，可以在不同的对象中复用函数`identify`，不用针对每个对象编写一个新函数。

**this解决的问题:**

this提供了一种更优雅的方法来隐式'传递'一个对象的引用，因此可以**将API设计得更加简洁并且易于复用**。


## this的四种绑定规则：

### 默认绑定：

**规则**：在非严格模式下，默认绑定的`this`指向全局对象，严格模式下`this`指向undefined

    function foo() {
      console.log(this.a); // this指向全局对象
    }
    var a = 2;
    foo(); // 2
    function foo2() {
      "use strict"; // 严格模式this绑定到undefined
      console.log(this.a); 
    }
    foo2(); // TypeError:a undefined

默认绑定规则如上述栗子，书中还提到了一个微妙的细节：

    function foo() {
      console.log(this.a); // foo函数不是严格模式 默认绑定全局对象
    }
    var a = 2;
    function foo2(){
      "use strict";
      foo(); // 严格模式下调用其他函数，不影响默认绑定
    }
    foo2(); // 2

所以：对于默认绑定来说，**决定this绑定对象的是函数体是否处于严格模式**，严格指向undefined，非严格指向全局对象。

通常不会在代码中混用严格模式和非严格模式，所以这种情况很罕见，知道一下就可以了，避免某些变态的面试题挖坑。

### 隐式绑定： 

**规则**：函数在调用位置，是否有上下文对象，如果有，那么this就会隐式绑定到这个对象上。

        function foo() {
          console.log(this.a);
        }
        var a = "Oops, global";
        let obj2 = {
          a: 2,
          foo: foo
        };
        let obj1 = {
          a: 22,
          obj2: obj2
        };
        obj2.foo(); // 2 this指向调用函数的对象
        obj1.obj2.foo(); // 2 this指向最后一层调用函数的对象
        
        // 隐式绑定丢失
        let bar = obj2.foo; // bar只是一个函数别名 是obj2.foo的一个引用
        bar(); // "Oops, global" - 指向全局

**隐式绑定丢失：**

隐式绑定丢失的问题：**实际上就是函数调用时，并没有上下文对象，只是对函数的引用**，所以会导致隐式绑定丢失。

同样的问题，还发生在传入回调函数中，这种情况更加常见，并且隐蔽，类似：

        test(obj2.foo); // 传入函数的引用，调用时也是没有上下文对象。

### 显式绑定:

就像我们上面看到的，如果单纯使用隐式绑定肯定没有办法得到期望的绑定，幸好我们还可以**在某个对象上强制调用函数，从而将`this`绑定在这个函数上**。

**规则**：我们可以通过`apply`、`call`、`bind`将函数中的`this`绑定到指定对象上。

    function foo() {
        console.log(this.a);
    }
    let obj = {
        a: 2
    };
    foo.call(obj); // 2

**传入的不是对象：**

如果你传入了一个原始值(字符串,布尔类型，数字类型)，来当做this的绑定对象，这个原始值转换成它的对象形式。

如果你把`null`或者`undefined`作为this的绑定对象传入`call`/`apply`/`bind`，这些值会在调用时被忽略，实际应用的是默认绑定规则。

### new绑定：

> 书中提到：在js中，实际上并不存在所谓的'构造函数'，只有对于函数的'构造调用'。

**new的时候会做哪些事情：**

1. **创建一个全新的对象**。
2. 这个新对象会被执行 [[Prototype]] 连接。
3. **这个新对象会绑定到函数调用的this**。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

**规则**：使用构造调用的时候，this会自动绑定在new期间创建的对象上。

    function foo(a) {
      this.a = a; // this绑定到bar上
    }
    let bar = new foo(2);
    console.log(bar.a); // 2

### this四种绑定规则的优先级

如果在某个调用位置应用了多条规则，如何确定哪条规则生效？

        obj.foo.call(obj2); // this指向obj2 显式绑定比隐式绑定优先级高。
        new obj.foo(); // thsi指向new新创建的对象 new绑定比隐式绑定优先级高。

显式绑定和隐式绑定无法直接比较(会报错),默认绑定是不应用其他规则之后的兜底绑定所以优先级最低，最后的结果是：

**显式绑定 > 隐式绑定 > 默认绑定**

**new绑定 > 隐式绑定 > 默认绑定**

### 箭头函数的this指向不会使用上述的四条规则：

    function foo() {
      return () => {
        console.log(this.a);
      };
    }
    let obj1 = {
      a: 2
    };
    let obj2 = {
      a: 22
    };
    let bar = foo.call(obj1); // foo this指向obj1
    bar.call(obj2); // 输出2 这里执行箭头函数 并试图绑定this指向到obj2

从上述栗子可以得出，箭头函数的this规则：

1. **箭头函数中的`this`继承于它外面第一个不是箭头函数的函数的`this`指向**。
2. **箭头函数的 this 一旦绑定了上下文，就不会被任何代码改变**。

---

## 结语

认真看完的话，相信你已经get到this的用法了，最后推荐一下《你不知道的JavaScript》，这本书真的很好，写的也很有趣，没看过的小伙伴抓紧入手了。

PS：目前离职中，大佬们有坑位可以介绍一下呀，base：上海长宁。

### 希望看完的朋友可以点个喜欢/关注，您的支持是对我最大的鼓励。

**[个人blog](http://obkoro1.com/)** and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)**，如需转载，请放上原文链接并署名。码字不易，**感谢**支持！
 
如果喜欢本文的话，欢迎关注我的订阅号，漫漫技术路，期待未来共同学习成长。

![](https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&h=344&f=jpeg&s=8317)
 
 以上2018.6.30