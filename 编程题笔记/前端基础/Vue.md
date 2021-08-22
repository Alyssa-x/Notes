# Vue

## 1. vue的生命周期

beforecreated - 实例还没创建

created - 实例已创建，但还没挂载到$el上，

beforemounted - vue 实例的$el 和 data 都初始化了，但还是没挂载

mounted  - vue实例挂载到$el上，data.message成功渲染，可以进行dom操作

beforeupdated  -dom重渲染

updated

before/destroyed  - vue解除了事件监听和对dom的绑定，但dom结构依然存在

## 2. 父子组件传值

父传子  - 子组件通过props来接收，父组件v-bind绑定属性

子传父 - 子组件$emit('click')发送，父组件通过@click=“clickFather”

获取子组件 -$refs.子组件名字

获取父组件 -$parent/$root vue实例

## 3. 路由跳转

声明式（标签跳转） `<router-link :to="index">`

编程式（ js 跳转） `router.push('index')`/`router.replace('index')` 区别是能否后退

## 4. **this.$route vs this.$router**

**`this.$route`**：当前激活的路由的信息对象。每个对象都是局部的，可以获取当前路由的 path, name, params, query 等属性。

**`this.$router`**：全局的 router 实例。通过 vue 根实例中注入 router 实例，然后再注入到每个子组件，从而让整个应用都有路由功能。其中包含了很多属性和对象（比如 history 对象），任何页面也都可以调用其 push(), replace(), go() 等方法

## 4. 路由懒加载（按需加载路由）

import 的方式改为 const 定义的方式引入`const Home = () => import("views/home/Home");`

## 5. vuex

状态管理，在 main.js 引入 store，注入。新建了一个目录 store，….. export

包括state，getter，mutation，action，module。

state - 对应vue的data，响应式

getters  - vuex的计算属性，可以对state进行计算操作

action - 提交的是mutation，不直接变更状态；可以包含异步操作

mutations  - 提交mutation改变state，只能同步操作，

## vue-router

## 6.MVVM

MVVM 是 Model-View-ViewModel 的缩写。mvvm 是一种设计思想。Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。

在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

## 8. Webpack

vu我当时使用 webpack 的一个最主要原因是为了简化页面依赖的管理，并且通过将其打包为一个文件来降低页面加载时请求的资源数。

我认为 webpack 的主要原理是，它将所有的资源都看成是一个模块，并且把页面逻辑当作一个整体，通过一个给定的入口文件，webpack 从这个文件开始，找到所有的依赖文件，将各个依赖文件模块通过 loader 和 plugins 处理后，然后打包在一起，最后输出一个浏览器可识别的 JS 文件。

Webpack 具有四个核心的概念，分别是 Entry（入口）、Output（输出）、loader 和 Plugins（插件）。

Entry 是 webpack 的入口起点，它指示 webpack 应该从哪个模块开始着手，来作为其构建内部依赖图的开始。

Output 属性告诉 webpack 在哪里输出它所创建的打包文件，也可指定打包文件的名称，默认位置为 ./dist。

loader 可以理解为 webpack 的编译器，它使得 webpack 可以处理一些非 JavaScript 文件。在对 loader 进行配置的时候，test 属性，标志有哪些后缀的文件应该被处理，是一个正则表达式。use 属性，指定 test 类型的文件应该使用哪个 loader 进行预处理。常用的 loader 有 css-loader、style-loader 等。

插件可以用于执行范围更广的任务，包括打包、优化、压缩、搭建服务器等等，要使用一个插件，一般是先使用 npm 包管理器进行安装，然后在配置文件中引入，最后将其实例化后传递给 plugins 数组属性。

使用 webpack 的确能够提供我们对于项目的管理，但是它的缺点就是调试和配置起来太麻烦了。但现在 webpack4.0 的免配置一定程度上解决了这个问题。但是我感觉就是对我来说，就是一个黑盒，很多时候出现了问题，没有办法很好的定位。e自定义指令

## 自定义指令

- 注册全局的指令：Vue.directive(), 需传入指令名称，及一个包含指令钩子函数的对象，对象的键是钩子函数的函数名，值为函数体

```js
Vue.directive(‘name’,{
    bind: function(el,binding){}
})
```

- 创建局部指令：直接向创建的 Vue 实例的 directives 字典属性添加键值对，键值对即需要添加的自定义指令及对应钩子函数字典对象

## 钩子

### 钩子函数

指令定义函数提供了几个钩子函数（可选）：

- `bind`: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
- `inserted`: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
- `update`: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
- `componentUpdated`: 被绑定元素所在模板完成一次更新周期时调用。
- `unbind`: 只调用一次， 指令与元素解绑时调用。

### 钩子函数参数

钩子函数的参数有：

- **el**: 指令所绑定的元素，可以用来直接操作 DOM 。

- binding

  : 一个对象，包含以下属性：

  - **name**: 指令名，不包括 `v-` 前缀。
  - **value**: 指令的绑定值， 例如： `v-my-directive="1 + 1"`, value 的值是 `2`。
  - **oldValue**: 指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - **expression**: 绑定值的表达式或变量名。 例如 `v-my-directive="1 + 1"` ， expression 的值是 `"1 + 1"`。
  - **arg**: 传给指令的参数。例如 `v-my-directive:foo`， arg 的值是 `"foo"`。
  - **modifiers**: 一个包含修饰符的对象。 例如： `v-my-directive.foo.bar`, 修饰符对象 modifiers 的值是 `{ foo: true, bar: true }`。

- **vnode**: Vue 编译生成的虚拟节点。

- **oldVnode**: 上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

## axios

axios它是基于promise的http库，可运行在浏览器端和node.js

1.从浏览器中创建 XMLHttpRequests
2.从 node.js 创建 http 请求
3.支持 Promise API
4.拦截请求和响应 （就是有interceptor）
5.转换请求数据和响应数据
6.取消请求
7.自动转换 JSON 数据
8.客户端支持防御 XSRF

## 7. 双向绑定原理

通过双向数据绑定，来实现View和Model的同步更新。

使用**数据劫持**和**发布订阅者**模式实现

- 通过Object.defineProperty()方法来劫持各个属性的`setter`和`getter`，在数据变动时发布消息给订阅者watcher，触发响应的监听回调

具体步骤：

1. 实现一个监听器observer，把需要监听的数据对象递归遍历，包括子属性对象的属性，都加上setter和getter，这样给这个对象的某个值赋值时，就会触发setter，就能监听到数据变化
2. 解析器compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的结点绑定更新函数，添加监听数据的订阅者（watcher），一旦数据变动后收到通知，就更新视图View
3. 订阅者watcher是监听器与解析器之间通信的桥梁，主要做的事情：
   - 在初始化时把自己添加进属性订阅器（dep），dep也叫依赖收集器，主要负责收集订阅者，变动时执行对应订阅者的更新函数。**监听器`Observer` 是在 get 函数执行了添加订阅者 Wather 的，所以我们只要在订阅者 `Watcher` 初始化的时候触发对应的 `get` 函数去执行添加订阅者操作即可，那要如何触发 `get` 的函数，再简单不过了，只要获取对应的属性值就可以触发了，核心原因就是因为我们使用了 `Object.defineProperty( )` 进行数据监听。**
   - 当数据发生变化时，调用Observer实例中订阅器Dep的发布数据更新的方法notify()，通知所有订阅当前数据的订阅者
4. MVVM作为数据绑定的入口，整合Observer，Watcher和Compile三者，通过监听器来监听自己的model数据变化，通过compile来解析编译模板指令，最终利用watcher搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果

在HTML模板中一共有两种绑定情况，使用 v-model 来对 value 值进行绑定，从model中获取v-model所对应的属性的值，并赋值给元素的 value 值。然后给这个元素设置一个监听事件，当 View 中元素的数据发生变化的时候触发该事件，通知 Model 中的对应的属性的值进行更新；一种是作为文本绑定 ，使用 Model 中对应的属性的值来替换这个文本。对于文本节点的更新，我们使用了发布订阅者模式。

https://juejin.cn/post/6844903903822086151

# vue.nextTick()

它可以在DOM更新完毕之后执行一个回调

在修改数据之后立即使用这个方法，获取更新后的DOM

Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中，原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载已完成。

```
//改变数据
vm.message = 'changed'

//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent) // 并不会得到'changed'

//这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function(){
    // DOM 更新了
    //可以得到'changed'
    console.log(vm.$el.textContent)
})

// 作为一个 Promise 使用 即不传回调
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

MutationObserver是HTML5新增的属性，用于监听DOM修改事件，能够监听到节点的属性、文本内容、子节点等的改动，是一个功能强大的利器

```js
let observer = new MutationObserver(callback);
observer.observe(node, config);
```

# 更新dom

Vue 在**更新 DOM **时是**异步**执行的。**只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更**。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在**下一个的事件循环“tick”**中，Vue **刷新队列并执行**实际 (已去重的) 工作。**Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替**。

例如，当你设置 `vm.someData = 'new value'`，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用

# 新增属性 响应

**如果在实例创建之后添加新的属性到实例上，它不会触发视图更新**

在初始化的时候 Vue 会把 data 的数据递归扫描一遍，设置 setter 和 getter。

**getter 的作用是在数据被读取时记下当前的调用者**，这个调用者也就是这个数据的“订阅者”。

若视图使用了某个数据，处理页面时就会调用该数据，成为该数据的一个订阅者。

**setter 的作用是在数据被赋值时，会提醒他的订阅者该数据已更新**，然后订阅者就知道要运行对应的更新操作，例如视图更新、watch 函数。

**这个属性即使有订阅者，但是因为没有走到“劫持”这一步，所以这个属性根本意识不到他有订阅者。**

Vue.set()

# 何时收集依赖

### Vue2.x

Vue在初始化数据时，会使用`Object.defineProperty`重新定义`data`中的所有属性，当页面使用对应属性时，首先会进行依赖收集(收集当前组件的`watcher`)如果属性发生变化会通知相关依赖进行更新操作(`发布订阅`)。

### Vue3.x

Vue3.x改用`Proxy`替代`Object.defineProperty`。因为`Proxy`可以直接监听**对象和数组**的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化

Vue2 中，对于给定的 data，如 `{ count: 1 }`，是需要根据具体的 key 也就是 `count`，去对「修改 data.count 」 和 「读取 data.count」进行拦截，也就是

```text
Object.defineProperty(data, 'count', {
  get() {},
  set() {},
})
```

必须预先知道要拦截的 key 是什么，这也就是为什么 Vue2 里对于对象上的新增属性无能为力。

而 Vue3 所使用的 Proxy，则是这样拦截的：

```text
new Proxy(data, {
  get(key) { },
  set(key, value) { },
})
```

可以看到，根本**不需要关心具体的 key，它去拦截的是 「修改 data 上的任意 key」 和 「读取 data 上的任意 key」**。



订阅者 `Watcher` 在初始化的时候需要将自己添加进订阅器 `Dep` 中，那该如何添加呢？我们已经知道监听器`Observer` 是在 get 函数执行了添加订阅者 Wather 的操作的，所以我们只要**在订阅者 `Watcher` 初始化的时候触发对应的 `get` 函数去执行添加订阅者**操作即可，那要如何触发 `get` 的函数，再简单不过了，只要获取对应的属性值就可以触发了，核心原因就是因为我们使用了 `Object.defineProperty( )` 进行数据监听。这里还有一个细节点需要处理，我们**只要在订阅者 `Watcher` 初始化的时候才需要添加订阅者**，所以需要做一个判断操作，因此可以在订阅器上做一下手脚：在 `Dep.target` 上缓存下订阅者，添加成功后再将其去掉就可以了。订阅者 `Watcher` 的实现如下：

# v-model

1. vue初始化时会进行依赖收集，通过Object.definedProperty()的getter收集某个属性的所有依赖，然后通过Object.definedProperty()的setter在某个属性更新时通知视图更新。

2. 视图改变时通知数据更新

   通过监听表单元素的input事件，从而通知数据更新。

# v-show

1、实现方式
v-if是根据后面数据的真假值判断直接从Dom树上删除或重建元素节点

v-show只是在修改元素的css样式，也就是display的属性值，元素始终在Dom树上。

2、编译过程
v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件； 

v-show只是简单的基于css切换；

3、编译条件
v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译；

v-show是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且DOM元素始终被保留； 

4、性能消耗
v-if有更高的切换消耗，不适合做频繁的切换；

v-show有更高的初始渲染消耗，适合做频繁的额切换；

# vue data 函数

注册组件是用组件构造器实例化一个组件实例，两个实例都引用同一个对象，其中一个改变的时候，另一个也发生改变。

每一个vue组件都是一个vue实例，通过new Vue()实例化，那么每个实例都会继承原型上的方法或属性。`vue`的`data`数据其实是`vue`原型上的属性，数据存在于内存当中

那么一旦修改其中一个组件的数据，其他组件相同数据就会被改变。

而data是函数的话，每个vue组件的data都因为函数有了自己的作用域，互不干扰。

# 


# -------------------------

