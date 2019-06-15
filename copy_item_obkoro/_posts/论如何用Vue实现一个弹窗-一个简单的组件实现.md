---
title: 论如何用Vue实现一个弹窗-一个简单的组件实现
date: 2018-04-22 16:14:09
tags:
- js
- css
- Vue 
- 组件
categories: Vue

---
## 前言

最近在使用element-ui框架，用到了Dialog对话框组件，大致实现的效果，跟我之前自己在移动端项目里面弄的一个弹窗组件差不太多。然后就想着把这种弹窗组件的实现方式与大家分享一下，下面本文会带着大家手摸手实现一个弹窗组件。

本文主要内容会涉及到弹窗遮罩的实现，`slot`插槽的使用方式，`props`、`$emit`传参，具体组件代码也传上去了。如果喜欢的话可以点波赞/关注，支持一下，希望大家看完本文可以有所收获。

> 个人博客了解一下：[obkoro1.com](http://obkoro1.com/)

---

###  组件最后实现的效果

![](https://user-gold-cdn.xitu.io/2018/4/21/162e6f9251c7c18f?w=650&h=1141&f=png&s=374719)

## 实现步骤

1. 先搭建组件的html和css样式，遮罩层和内容层。
2. 定制弹窗内容：弹窗组件通过`slot`插槽接受从父组件那里传过来弹窗内容。
3. 定制弹窗样式：弹窗组件通过`props`接收从父组件传过来的弹窗宽度，上下左右的位置。
4. 组件开关：通过父组件传进来的`props`控制组件的显示与隐藏，子组件关闭时通过事件`$emit`触发父组件改变值。

---
 
 ### 1.搭建组件的html和css样式。
 
html结构：一层遮罩层，一层内容层，内容层里面又有一个头部title和主体内容和一个关闭按钮。

下面是组件中的html结构，里面有一些后面才要加进去的东西，如果看不懂的话可以先跳过，
 
     <template>
      <div class="dialog">
          <!--外层的遮罩 点击事件用来关闭弹窗，isShow控制弹窗显示 隐藏的props-->
          <div class="dialog-cover back"  v-if="isShow"  @click="closeMyself"></div>
          <!-- transition 这里可以加一些简单的动画效果 -->
          <transition name="drop">
             <!--style 通过props 控制内容的样式  -->
            <div class="dialog-content" :style="{top:topDistance+'%',width:widNum+'%',left:leftSite+'%'}"  v-if="isShow">
              <div class="dialog_head back">
                 <!--弹窗头部 title-->
                  <slot name="header">提示信息</slot>
              </div>
              <div class="dialog_main" :style="{paddingTop:pdt+'px',paddingBottom:pdb+'px'}">
                <!--弹窗的内容-->
                <slot name="main">弹窗内容</slot>
              </div>
              <!--弹窗关闭按钮-->
              <div  class="foot_close" @click="closeMyself">
                  <div class="close_img back"></div>
              </div>
            </div>
        </transition>
      </div>
    </template> 

下面是组件中的主要的css样式，里面都做了充分的注释，主要通过`z-index`和`background`达到遮罩的效果，具体内容的css可以根据自己的需求来设置。
    
    <style lang="scss" scoped>
     // 最外层 设置position定位 
      .dialog {
        position: relative;
        color: #2e2c2d;
        font-size: 16px;
      }
      // 遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
      .dialog-cover {
        background: rgba(0,0,0, 0.8);
        position: fixed;
        z-index: 200;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      // 内容层 z-index要比遮罩大，否则会被遮盖，
      .dialog-content{
        position: fixed;
        top: 35%;
        // 移动端使用felx布局 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 300;
     }
    </style>
    
  ---

### 2. 通过`slot`定制弹窗内容

这一步，只要理解了`slot`的作用以及用法，就没有问题了。

#### 单个插槽：
 
        <slot>这是在没有slot传进来的时候，才显示的弹窗内容</slot>
 
 上面是单个插槽也叫默认插槽，在父组件中使用插槽的正确姿势：
 
       <my-component>
       <!--在my-component里面的所有内容片段都将插入到slot所在的DOM位置，并且会替换掉slot标签-->
       <!--这两个p标签，将替换整个slot标签里面的内容-->
        <p>这是一些初始内容</p>
        <p>这是更多的初始内容</p>
      </my-component>

ps:如果子组件里面包含`slot`插槽，那么上面的p标签的内容将会被丢弃。

#### 具名插槽：

 所谓的具名插槽，即为`slot`标签赋一个`name`属性，具名插槽可以父组件中不同的内容片段放到子组件的不同地方，具名插槽还是可以拥有一个默认插槽。下面可以看一下弹窗组件插槽的使用方式：
 
    <div class="dialog_head back ">
      <!--弹窗头部 title-->
      <slot name="header">提示信息</slot>
     </div>
     <div class="dialog_main " :style="{paddingTop:pdt+'px',paddingBottom:pdb+'px'}">
        <!--弹窗的内容-->
        <slot name="main">弹窗内容</slot>
     </div>
 
在父组件中的使用方式：
1. 将弹窗组件引入要使用的组件中，并通过`components`注册成为组件。
2. 父组件中弹窗组件插槽的使用方法如下。

        <dialogComponent>
        
            <div slot="header">插入到name为header的slot标签里面</div>
             <div class="dialog_publish_main" slot="main">
                这里是内容插入到子组件的slot的name为main里面，可以在父组件中添加class定义样式，事件类型等各种操作
             </div>
        </dialogComponent>
 
关于组件中用到的插槽的介绍就到这里了，插槽在弹窗组件中的应用是一个典型的栗子，可以看到插槽作用相当强大，而插槽本身的使用并不难，同学们爱上插槽了没有？
 
 ---
 
 ### 3.通过`props`控制弹窗显隐&&定制弹窗style
 
 `psops`是Vue中父组件向子组件传递数据的一种方式，不熟悉的小伙伴们可以看一下[props文档](https://cn.vuejs.org/v2/guide/components.html#Prop)。
 
  因为弹窗组件都是引到别的组件里面去用的，为了适合不同组件场景中的弹窗，所以弹窗组件必须具备一定的可定制性，否则这样的组件将毫无意义,下面介绍一下props的使用方式，以弹窗组件为例：
 
 1. 首先需要在被传入的组件中定义props的一些特性，验证之类的。
 2. 然后在父组件中绑定props数据。

         <script>
        export default {
          props: {
            isShow: { 
            //弹窗组件是否显示 默认不显示
              type: Boolean,
              default: false,
              required:true, //必须
            },
            //下面这些属性会绑定到div上面 详情参照上面的html结构
            // 如： :style="{top:topDistance+'%',width:widNum+'%'}"
            widNum:{ 
            //内容宽度
              type: Number,
              default:86.5
            },
            leftSite:{
              // 左定位
              type: Number,
              default:6.5
            },
            topDistance: {
                //top上边距
              type: Number,
              default:35
            },
            pdt:{
              //上padding
              type: Number,
              default:22
            },
            pdb:{
              //下padding
              type: Number,
              default:47
            }
          },
        }
        </script>

父组件中使用方式：

     <dialogComponent :is-show="status.isShowPublish" :top-distance="status.topNum">
     </dialogComponent>

 ps：props传递数据不是双向绑定的，而是**单向数据流**，父组件的数据变化时，也会传递到子组件中，这就意外着我们不应该在子组件中修改props。所以我们在关闭弹窗的时候就**需要通过`$emit`来修改父组件的数据**，然后数据会自动传到子组件中。
 
 
现在基本上弹窗组件都已实现的差不多了，还差一个弹窗的关闭事件，这里就涉及到子组件往父组件传参了。

### 4.`$emit`触发父组件事件修改数据，关闭弹窗

Vue中在子组件往父组件传参，很多都是通过`$emit`来触发父组件的事件来修改数据。

在子组件中，在点击关闭，或者遮罩层的时候触发下面这个方法：

    methods: {
        closeMyself() {
          this.$emit("on-close"); 
          //如果需要传参的话，可以在"on-close"后面再加参数，然后在父组件的函数里接收就可以了。
        }
      } 

父组件中的写法：

      <dialogComponent :is-show="status.isShowPublish" :top-distance="status.topNum"  @on-close="closeDialog"> 
      </dialogComponent>
      //"on-close是监听子组件的时间有没有触发，触发的时候执行closeDialog函数
    methods:{
      closeDialog(){
        // this.status.isShowPublish=false;
        //把绑定的弹窗数组 设为false即可关闭弹窗
      },
    }
---

可以用弹窗组件实现下列这种信息展示，或者事件交互：
 
 ![](https://user-gold-cdn.xitu.io/2018/4/21/162e7a7af2e0effa?w=402&h=728&f=png&s=140506)

### [弹窗组件代码](https://github.com/OBKoro1/web_accumulate/blob/d6b599ca22d8656d3f31f80bffa976fac36d2d75/example/dialogComponent.vue)

上面是把弹窗的每个步骤拆分开来，一步步解析的，每一步都说的比较清楚了，具体连起来的话，可以看看[代码](https://github.com/OBKoro1/web_accumulate/blob/d6b599ca22d8656d3f31f80bffa976fac36d2d75/example/dialogComponent.vue)，再结合文章就能理的很清楚了。
 
 ## 小结：
 
这个弹窗组件，实现起来一点都不难，我这里主要是提供了一个实现方式，当项目中有需要的话，大家也可以自己撸一个出来，以上就是本文的内容了，希望同学们看完能有所收获。
 
 ### 希望看完的朋友可以点个喜欢，也可以关注一下我，您的支持是对我最大的鼓励。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。

**[个人blog](http://obkoro1.com/)** and **[掘金个人主页](https://juejin.im/user/58714f0eb123db4a2eb95372)**  
 
 以上2018.4.21
 
### 参考资料：

[Vue文档-插槽](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E6%8F%92%E6%A7%BD%E5%88%86%E5%8F%91%E5%86%85%E5%AE%B9)