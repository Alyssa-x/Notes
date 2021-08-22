English



**webpack** is a *static module bundler* for modern JavaScript applications. When webpack processes your application, it internally builds a [dependency graph](https://webpack.js.org/concepts/dependency-graph/) which maps every module your project needs and generates one or more *bundles*.

An **entry point** indicates which module webpack should use to begin building out its internal [dependency graph](https://webpack.js.org/concepts/dependency-graph/). webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).

Out of the box, webpack only understands JavaScript and JSON files. **Loaders** allow webpack to process other types of files and convert them into valid [modules](https://webpack.js.org/concepts/modules) that can be consumed by your application and added to the dependency graph.

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

作者：前端菜🐦
链接：https://www.nowcoder.com/discuss/528644?type=post&order=time&pos=&page=1&ncTraceId=&channel=-1&source_id=search_post_nctrack
来源：牛客网

1**.shscrollIntoView的兼容性+参数** 
  
 **2.better-scroll用鼠标的滚轮实现+轮播效果顺时和逆时播放** 
  
 **3.[百度]()搜索框的注意点**  
  
 设计一个搜索框，根据输入的关键字显示搜索的内容 
  
 \* 需要注意的点 
 \* 怎么监听内容的改变：监听`oninput` 
 \* 监听`oninput`，获取值，正则匹配，获取内容，组合字符串，添加到页面 
 \* 技术点， 
 \- `compositionStart`，`compositionEnd`处理中文输入 
 \- `debounce` 回调函数防抖 
  
  
  
 **4.tcp三次握手** 
  
 **5.OSI七层协议** 
  
 **6.flex：1对应的值。 ** 
  
 flex-grow flex-shrink flex-basis默认值 
  
 0           1        auto 
  
 \* flex-grow：弹性盒子的拉伸因子，默认值是0 
  
 子元素瓜分剩余空间的比例 
  
 \* flex-shrink：指定flex元素的收缩规则，默认值是1 
  
 \>如果子容器设置了flex-grow有可能被拉伸，有一种情况，如果子容器宽度超过父容器宽度，即时设置了flex-grow，由于没有剩余空间，就分配不到剩余空间。这时候只有两个办法，换行和压缩。由于flex默认不换行，所以压缩就用到了flex-shrink 
  
 “**溢出空间**”：如果子容器没有超出父容器，设置flex-shrink无效 
  
 \* flex-basis：flex在主轴方向的初始大小 
  
 一旦flex-item放进flex容器，并不能按照flex-basis的大小展示。浏览器会根据flex-basis计算主轴是否有剩余空间，既然跟宽度相关，那么max-width，min-width，width和box的优先级 
  
 max-width/min-width > flex-basis > width > box 
  
 \* 总结 
  
 \* flex items 总和超出 flex 容器，会根据 flex-shrink 的设置进行压缩 
 \* 如果有剩余空间，如果设置 flex-grow，子容器的实际宽度跟 flex-grow 的设置相关。如果没有设置flex-grow，则按照 flex-basis 展示实际宽度 
  
 \#### 7.v-model实现数据双向绑定的原理 
  
 可以用 **v-model** 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素，通过监听用户的输入事件来更新数据。 
  
 \```html 
 <input v-model="something"> 
 <input v-bind:value="something" v-on:input="something = $event.target.value"> 
 \``` 
  
 \>text和textarea元素使用value属性和input事件 
 \> 
 \>checkbox和radio使用checked属性和change事件 
 \> 
 \>select字段将value作为prop并将change作为事件 
  
 v-model是v-bind和v-on的语法糖 
  
 \* 1.v-bind绑定响应式数据 
  
 \* 2.通过oninput触发事件获取当前$event.target.value，然后赋值给当前变量。 
  
 \* 3.当前变量值修改，会触发object.definedProperty中的set方法，将data中的当前变量进行赋值 
  
 **8.vue的数据双向绑定的原理** 
  
  
  
 **9.实现三角形** 
  
 **10.实现扇形** 
  
 **11.实现跨域的方式：cors跨域的设置** 
  
 **12.浏览器缓存** 
  
 \13. 
  
 \```js 
 Promise.resolve().then(()=>{ 
 console.log(3) 
 }) 
 Promise.resolve().then(() => { 
 console.log(9) 
 }); 
 setTimeout(() => { 
 console.log(6); 
 Promise.resolve().then(() => { 
 console.log(8) 
 }); 
 }) 
 setTimeout(() => { 
 console.log(7); 
 }) 
  
 Promise.resolve().then(() => { 
 console.log(4) 
 }); 
 //3 9 4 6 8 7  
 //js输出顺序与在浏览器中的输出顺序 
 \``` 
  
 \14. 
  
 \```js 
 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。 
 样例： 
  
 输入: "abcabcbb" 
 输出: 3 
 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。 
 输入: "bbbbb" 
 输出: 1 
 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。 
 输入: "pwqwkew" 
 输出: 3 
  
 \``` 
  
 \15. 
  
 \```js 
 function mySetTimeout(delay) { 
 } 
  
 setTimeout(() => {}, 3000); 
  
 await mySetTimeout(3000); 
 xxx 
  
 mySetTimeout(3000).then(() => {}) 
 \``` 
  
 16.用类+任务队列实现 
  
 \```js 
 实现一个CodingMan，可以按照以下方式调用: 
 CodingMan("Hank") 
 输出: 
 Hi! This is Hank! 
  
 CodingMan("Hank").sleep(10).eat("dinner") 
 输出 
 Hi! This is Hank! 
 //等待10秒.. 
 Wake up after 10 
 Eat dinner~ 
  
 CodingMan("Hank").eat("dinner").eat("supper") 
 输出 
 Hi This is Hank! 
 Eat dinner~ 
 Eat supper~ 
  
 CodingMan("Hank").sleepFirst(5).eat("supper") 
 输出 
 //等待5秒 
 Wake up after 5 
 Hi This is Hank! 
 Eat supper 
 以此类推。 
 \``` 
  
 17 
  
 \```js 
 ‘1’+{} 
  
 []==[] 
  
 {}=={} 
 \```
