---
title: H5 notification浏览器桌面通知
date: 2019-02-19 15:16:39
tags:
- Html5
- html
- js
- npm
categories: Html5
---

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

`Notification`是HTML5新增的API，用于向用户配置和显示桌面通知。上次在别的网站上看到别人的通知弹窗，好奇之余也想知道如何实现的。实际去查一下发现并不复杂，且可以说比较简单，故写篇博客分享给大家,希望能帮你们了解这个API。

<!--more-->

### npm包：

我还发了一个npm包:[notification-Koro1](https://github.com/OBKoro1/notification-Koro1)，非常轻量简洁，觉得不错的话，点个Star吧~

### chrome下`Notification`的表现：

1. 以谷歌为例，一开始需要用户允许通知：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

2. 允许通知之后，显示的通知长这样：

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/005Y4rCogy1fzyaxnnc25j30kg03wjrs.jpg?raw=true?raw=true)

### `Notification`特性

1. **该通知是脱离浏览器的，即使用户没有停留在当前标签页，甚至最小化了浏览器，也会在主屏幕的右上角显示通知，然后在一段时间后消失**。

2. **我们可以监听通知的显示，点击，关闭等事件**,比如点击通知打开一个页面。

> [博客](http://obkoro1.com/)、[前端积累文档](http://obkoro1.com/web_accumulate/accumulate/)、[公众号](https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&h=344&f=jpeg&s=8317)、[GitHub](https://github.com/OBKoro1)

### 栗子：去各个网站里面的控制台去运行

API的具体细节，等下再说，先试试这个API~

下面是一个简单的栗子，大家**可以先在各个网站的控制台里面运行查看`Notification`的效果**：

```js
var options = {
  dir: "auto", // 文字方向
  body: "通知：OBKoro1评论了你的朋友圈", // 通知主体
  requireInteraction: true, // 不自动关闭通知
  // 通知图标 
  icon: "https://upload-images.jianshu.io/upload_images/5245297-818e624b75271127.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
};
notifyMe('这是通知的标题', options);
function notifyMe(title, options) {
  // 先检查浏览器是否支持
  if (!window.Notification) {
    console.log('浏览器不支持通知');
  } else {
    // 检查用户曾经是否同意接受通知
    if (Notification.permission === 'granted') {
      var notification = new Notification(title, options); // 显示通知
    } else if (Notification.permission === 'default') {
      // 用户还未选择，可以询问用户是否同意发送通知
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('用户同意授权');
          var notification = new Notification(title, options); // 显示通知
        } else if (permission === 'default') {
          console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权');
        } else {
          // denied
          console.log('用户拒绝授权 不能显示通知');
        }
      });
    } else {
      // denied 用户拒绝
      console.log('用户曾经拒绝显示通知');
    }
  }
}
```

---

### 浏览器支持：

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/notification#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)：目前`Notification`除了IE浏览器不支持外, 其他浏览器都已支持桌面通知，移动端浏览器基本都未支持。

因为兼容性问题，所以在使用`Notification`之前，我们需要查看浏览器是否支持`Notification`这个API：

```js
if(window.Notification){
  // 桌面通知的逻辑
}
```

### 通知权限：

为了避免网站滥用通知扰民，在向用户显示通知之前，需要经过用户同意。

`Notification.permission` **用于表明当前通知显示的授权状态**,它有三个值：

1. `default `: 默认值，用户还未选择
2. `granted `: 用户允许该网站发送通知
3. `denied `: 用户拒绝该网站发送通知

### 检测权限：

检测浏览器是否支持`Notification`之后，需要检测一下用户通知权限。

```js
  if (Notification.permission === 'granted') {
    console.log('用户曾经同意授权');
     // 随时可以显示通知
  } else if (Notification.permission === 'default') {
    console.log('用户还未选择同意/拒绝');
    // 下一步请求用户授权
  } else {
    console.log('用户曾经拒绝授权 不能显示通知');
  }
```

### 请求权限

当`Notification.permission`为`default`的时候，我们需要使用`Notification.requestPermission()`来请求用户权限。

`Notification.requestPermission()`基于promise语法，then的回调函数参数是用户权限的状态`Notification.permission`的值。

```js
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    console.log('用户同意授权');
     // 随时可以显示通知
  } else if (permission === 'default') {
    console.log('用户关闭授权 可以再次请求授权');
  } else {
    console.log('用户拒绝授权 不能显示通知');
  }
});
// 老版本使用的是回调函数机制：Notification.requestPermission(callback); 参数一样
```

### 推送通知

当`Notification.permission`为`granted `时，请求到用户权限之后，不必立即发送通知，可以在任意时刻，以任意形式来发送通知。

```js
const options = {}; // 传空配置
const title = '这里是标题';
const notification = new Notification(title, options) // 显示通知
```

> 上面这段代码就可以显示一个简单的通知了，只要用户允许你弹窗。

### `Notification`的参数：

* title：通知的标题
* options：通知的设置选项（可选）。
    * body：字符串。通知的body内容。
    * tag：代表通知的一个识别标签，**相同tag时只会打开一个通知窗口**。
    * icon：字符串。要在通知中显示的图标的URL。
    * data：想要和通知关联的数据,可以在`new Notification`返回的实例中找到。
    * renotify: 布尔值。相同tag，新通知出现的时候是否替换之前的(开启此项，tag必须设置)。
    * requireInteraction：布尔值。通知不自动关闭，默认为false(自动关闭)。
    * 还有一些不太重要的配置可以看[张鑫旭老师的博客](https://www.zhangxinxu.com/wordpress/2016/07/know-html5-web-notification/)和[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/notification)的介绍

**requireInteraction**: 保持通知不自动关闭

默认值为false，通知会在三四秒之后自动关闭。

当设置为`true`,并且当有超过两个通知(`new Notification(title, options)`)时，会出现如下图的通知叠加状态。

![](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

这种情况显然，我们只能默认操作最后一个通知，除非你把每个通知返回的实例都保存下来。

我发布的npm包：[notification-koro1](https://github.com/OBKoro1/notification-Koro1)，可以**自定义一定的时间间隔自动关闭不自动关闭的通知，也可以一次性关闭所有通知**

PS：如果没有触发叠加，很可能是因为你两次通知的tag配置项是相同的(相同tag只能出现一个弹窗)。

PS:  safari下不支持该选项,默认自动关闭

**renotify**：相同

默认值为false，chorme下相同tag的通知不替换，还是老的通知

设置为`true`, 两个相同tag的通知，新通知替换之前旧的通知。

**注意**：使用`renotify`，**必须要同时设置`tag`选项，否则将会报错**。

PS： safari下不支持该选项，默认两个相同tag的通知，新通知替换之前旧的通知。

## `Notification`的实例：

生成通知，会返回一个实例，如下：

```js
const instanceNotification = new Notification(title, options)
```

`instanceNotification`就是当前通知的实例，在该实例上，我们可以**查询该通知的配置，监听事件，调用实例方法**。

下文都以`instanceNotification`指代通知返回的实例。

### 通知的配置：

**在通知实例上可以读取到设置通知时的所有配置**，比如：

通知标题：`instanceNotification. title`、通知内容：`instanceNotification. body `、通知图标：`instanceNotification. icon`等。

PS： 这些属性都是只读的，不能删除，不能修改，不能遍历。

### 事件处理：

我们可以使用通知的实例来监听通知的事件：

* `click`: 用户点击通知时被触发
* `show`: 通知显示的时候被触发
* `error`: 通知遇到错误时被触发
* `close`: 用户关闭通知时被触发

```js
instanceNotification.onclick = e => {
  // do something 可以是：打开网址，发请求，关闭通知等
}
```

**注意**：最好是一发出通知就立即监听事件，否则有些事件可能一开始没被触发或永远不会触发。

例如：用定时器5秒后才监听通知的点击和显示事件，则永远不会触发通知显示的回调，点击事件在5秒后才可以正常起作用但会错误五秒之前用户的点击。

### 关闭通知

```js
instanceNotification.close()
```

没有设置不自动关闭的话，chrome通知将会在4.5秒左右自动关闭通知，safari则是5秒钟(无法设置不自动关闭)。

notification没有定时控制通知多久后消失的功能，当出现多个通知，也无法统一关闭。

这两个问题，在我发布的NPM包：[notification-koro1](https://github.com/OBKoro1/notification-Koro1)中，都解决掉了，并提供更清晰的回调

### 应用场景

* 即时通讯软件(邮件、聊天室)
* 体育赛事结果彩票/抽奖结果
* 新闻网站重大新闻通知
* 网站的重大更新，重大新闻等。

## notification其他

这里是一些API/浏览器细节，以及可能会遇到的问题，可以先不看，等真正遇到了，回头再来看。

### 用户拒绝显示通知：

一旦用户禁止网站显示通知，网站就不能再请求用户授权显示通知，需要用户去设置中更改。

 chrome浏览器的通知设置位置：设置>高级>内容设置>通知

saafari浏览器：偏好设置>网站>通知>找到网站>修改权限/恢复默认

### 关闭请求权限：

在chorme浏览器中：当用户关闭请求权限的弹窗(右上角的叉叉)，页面还没刷新，我们可以再次向用户请求权限。**页面刷新过后，浏览器默认用户拒绝**。

在safari浏览器下，没有关闭请求权限的选项，用户必须选择同意/拒绝。

### icon不显示问题：

可能是网站进行了同源限制(比如github)，不是域名下面的图片，会报错，不能调用。

### tag：

1. `tag`相同的通知，同时只能出现一个，老通知是否会被覆盖取决于：`renotify`配置和浏览器。
2. chrome下：当通知关闭之后，**上次出现过的tag在一段时间内，不能再出现**，比如刷新页面再请求相同tag的通知。（在safari下正常出现）

### safari下面不能显示icon

在safari下面，同一个网站(比如谷歌)，同样的代码，chorme可以正常显示icon，safari却没有icon，也没有报错。

谷歌之后发现,在[stack overflow](https://stackoverflow.com/questions/20949203/i-dont-see-the-icon-in-my-web-notification-in-safari)里面看到**safari只支持body和tag选项,并不支持icon选项**。

### 连续触发

在safari和chrome下短时间内连续触发通知(不设`tag`，不设`requireInteraction`)，会出现如下表现：

![notification 连续触发](https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/undefined?raw=true?raw=true)

这个表现，**通知没有icon、标题、内容，就显得没有意义了**，浏览器以这种形式，限制开发者不要频繁打扰用户。

### notification-Koro1：

试一下[notification-Koro1](https://github.com/OBKoro1/notification-Koro1)啦, 持续维护，简单方便~

---

## 结语

本文写的比较细，可以先mark一下，然后以后真正用到这个API了，可以先通过文中的栗子，然后再查找对应的内容。

还有就是注意浏览器间的差异，我自己就试了chrome和safari，然后这两个浏览器在实现细节上有很多不一样的地方，开发的时候注意一下。

### 希望看完的朋友可以点个喜欢/关注，您的支持是对我最大的鼓励。

[博客](http://obkoro1.com/)、[前端积累文档](http://obkoro1.com/web_accumulate/accumulate/)、[公众号](https://user-gold-cdn.xitu.io/2018/5/1/1631b6f52f7e7015?w=344&h=344&f=jpeg&s=8317)、[GitHub](https://github.com/OBKoro1)
 
 以上2019.02.17
 
 参考资料：

[notification-Koro1](https://github.com/OBKoro1/notification-Koro1)

[简单了解HTML5中的Web Notification桌面通知](https://www.zhangxinxu.com/wordpress/2016/07/know-html5-web-notification/)

[Notification MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/notification)
 
[HTML5 桌面通知：Notification API](https://juejin.im/post/59ed37f5f265da431e15eaac)