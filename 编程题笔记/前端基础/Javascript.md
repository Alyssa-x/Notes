# 1. js基本数据类型

### 原始数据类型（primitive data type）

number, string, boolean, null, undefined，symbol，bigInt。All primitives are immutable. They cannot be altered，but only can be reassigned a new value.

### 引用数据类型：array，object，function

ES6: Symbol, 创建后unique且不可变immutable的数据类型，used to add unique keys to an object。

ES10: BigInt，可以表示任意精度格式的整数, can represent whole number larger than 2^53 - 1 (Number.MAX_SAFE_INTERGER). used for arbitrarily larger intergers.

### 存储位置

- stack: primitive type. Stored in the stack. 占据空间小，大小固定，便于迅速查询

- heap: refrence type. The refrence(pointers to the reference type) are stored in a stack while the object is allocated in the heap. the addresses where the value is being stored are stored in stack.  大小会变，放入栈中会降低查寻速度。

  复制时：If you assign it to another variable, the value is copied directly and both variables work independently. Assigning a reference variable to another doesn't copy the data. Instead it creates a second copy of the reference, which refers to the same location of the heap as the original value
  
  ```
  两种类型的区别是：存储位置不同。
  原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。
  
  引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在
  栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实
  体。
  ```

# 2. 堆与栈

- 数据结构中

  栈中数据的存取方式是先进后出；堆是按照优先级排序，二叉树是种实现方式。The stack is always reserved in a LIFO order，the most recently reserved block is always the next block to be freed. easy to keep track of the stack. Element of the heap have no dependencies with each other and can always be accessed randomly at any time. You can allocate a block at any time and free it at any time.   much more complex to keep track of which parts of the heap are allocated or freed at any given time.

- 操作系统中

  栈区内存由编译器自动分配释放；堆区内存一般由程序员分配释放，若不程序结束时可能由垃圾回收机制回收

# 3. == and ===

Triple equals checks for **strict equality**, which means both the type and value must be the same. Double equals first performs **type coercion** so that both operands are converted into the same type and then applies strict comparision

# 4. postfix i++ and prefix ++i

Both increment the variable value by 1.

The postfix increment operator evalutes to the value before it was incremented

The prefix increment operator evalutes to the value after it was incremented

# 5. In which states can a Promise be?

pending: initial state

fulfilled: operation completed successfully

rejected: operation failed

A pending promise can either be fulfilled with a value, or rejected with a reason. When either of these operations happens, the associated handlers  are called by a promise's then method.

# 6. Promise

Promise对象是异步编程的一种解决方案。Promise 是一个构造函数，接收一个函数作为参数，返回一个promise实例。，

```
Promise 对象是异步编程的一种解决方案，最早由社区提出。Promises/A+ 规范是 JavaScript Promise 的标准，规定了一个 Promise 所必须具有的特性。

Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个 Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者 rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。状态的改变是通过 resolve() 和 reject() 函数来实现的，可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。
```

Promises are one way to handle asynchronous operations in JavaScript. Each promise represent a single operation. can avoid **nesting callbacks too deeply**.

A Promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it's not resolved. Once a promise is settled, it can not be resettled. Calling `resolve()` and `reject()` again will have no effect.

When called via new, the Promise constructor returns a promise object. This constructor takes a function as its parameter. This function takes  two functions as parameters (`resolve`, `reject`). resolve() is called when the asynchronous task completes successfully and returns the resluts of the task as a value. reject() is called when the taks fails and return the reason of failure.

### Promise object Methods

The **.then** method has two function arguments, the first will be excuted after the Promise succedd and the second will be executed after the Promise fails.

**.catch** method is used to catch exceptions. It's the same as the second callback function for the `.then` method.

**.resolve** or **.reject()** method is to return an instance of a Promise with a resolved state or reject state

**.finally()** method returns a Promise. When the promise is settled, i.e either fulfilled or rejected, the specified callback function is executed.

**.all()** method takes an iterable pf promises as an input and return a single Promise that resolves to an array of the results of the input promises.

Promises/A+ specification 是 JavaScript Promise 的标准，规定了一个 Promise 所必须具有的特.

性。Our Promise function should adhere to the Promise A+ specification

# 7. Promise 和 async顺序

```js
如果await后面是 promise对象会造成异步函数停止执行并且等待 promise 的解决,
async function sleep(time, func) {
  await new Promise(resolve => {
      setTimeout(()=>{func();resolve()},time);
  })
  //func();
  console.log(444)
} // 先等待time 再func,再 444
如果await后面是 正常的表达式则立即执行。
async function sleep(time, func) {
  await  setTimeout(() => {
    func();
  },time)
  console.log(444)
} // 先444 等待time再func
```

对于await来说，分2个情况

- 不是promise对象
- 是promise对象

**如果不是 promise , await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，再回到async内部，把这个非promise的东西，作为 await表达式的结果**

**如果它等到的是一个 promise 对象，await 也会暂停async后面的代码，先执行async外面的同步代码，等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果。**



await后，中断async函数，先执行async外的同步代码，执行new Promise()，Promise构造函数是直接调用的同步代码，所以 console.log( ‘promise1’ )，代码运行到promise.then()，发现这个是微任务，所以暂时不打印，只是推入当前宏任务的微任务队列。打印同步代码 console.log(‘script end’)，执行完这个同步代码后，「async外的代码」终于走了一遍

下面该回到 await 表达式那里，执行await Promise.resolve(undefined)了，要执行.then，所以去微队列中找，微队列中已经有一个.then等待被执行



# 8. 手写bind

# 9. 内部属性 [[class]]

Object's internal property

不能直接访问，通过`Object.prototype.toString.call([1,2,3])` 返回 `"[object Array]"`

```js
我们自己创建的类就不会有这份特殊待遇，因为 toString() 找不到 toStringTag 属性时只好返回默认的 Object 标签
// 默认情况类的[[Class]]返回[object Object]
class Class1 {}
Object.prototype.toString.call(new Class1()); // "[object Object]"
// 需要定制[[Class]]
class Class2 {
  get [Symbol.toStringTag]() {
    return "Class2";
  }
}
Object.prototype.toString.call(new Class2()); // "[object Class2]"
```

# 10. js 里的内置对象

global objects/Standard built-in objects, **objects in the global scope**

```
js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。一般我们经常用到的如全局变量值 NaN、undefined，全局函数如parseInt()、parseFloat() 用来实例化对象的构造函数如 Date、Object 等，还有提供数学计算的单体内置对象如 Math 对象。
```

simple value(NaN, undefined,infinity), global functions(eval(), isNaN(), parseInt(), ), Numbers and dates, Object, Function, Boolean, Symbol

arguments, Error objects, Text Processing(String, RegExp), Indexed collections(Array), Keyed collections(Map, Set),Promise, Generator, AsyncFunction

# 11. 原型，原型链

每个对象内部都有\_proto_内部属性，该属性指的就是该对象原型

函数对象还预设了prototype属性，当作为构造函数创建实例时，该prototype属性作为新建实例的原型\_proto_。

### 获取原型：

- p.\__proto__
- p.constructor.prototype
- Object.getPrototypeOf(p)

## 原型链

任何一个实例对象通过原型链可以找到它对应的原型对象，原型对象上面的实例和方法都是实例所共享的。原型链尽头一般会继承自Object.prototype，而Object.prototype没原型所以Object.prototype.\_proto_ 是null，原型链终点是null

**判断对象的构造函数** constructor(原型的自带属性)

```js
p = new Foo()；
p.prototype.constructor === Foo
p.constructor === Foo; 
//实例对象p本身没有constructor属性，继承于原型
```

**判断A的原型链上是否有B的原型**

A.instanceof（B）

**创建实例**

var person = Object.create(Person.prototype）创建一个新对象，使用现有的对象来提供新创建的对象的\__proto__

## 原型继承

1.  原型链继承

    Child.prototype = new Parent（）,当子类对象上进行值修改时，如果是修改的原始类型的值，那么会在实例上新建这样一个值； 但如果是引用类型的话，他就会去修改子类上唯一一个父类实例里面的这个引用类型，会影响所有子类实例

2. 借用构造函数继承

   Parent.call(this)，但Parent 原型链上的属性和方法并不会被子类继承

   ```js
   function Parent() {
     this.name = "parent";
   }
   function Child() {
     Parent.call(this);
     this.type = "child";
   }
   ```

3. 共享原型

   Son.prototype = P.prototype

4. 组合继承 添加中间对象

   ```js
   function Parent() {
     this.name = "parent";
     this.arr = [1, 2, 3];
   }
   
   function Child() {
     Parent.call(this);
     this.type = "child";
   }
   Child.prototype = Object.create(Parent.prototype);//创建新对象
   Child.prototype.constrctor = Child;
   ```

5. 圣杯模式

   ```js
   function inherit(Child, Parent) {
       function F() {};
       F.prototype = Parent.prototype;
       Child.prototype = new F();
       Child.prototype.constructor = Child;
       return Child;
   }
   ```

## ES6 继承

```js
class A{
	constructor() {
        this.a = 1;
    }
}
class B extends A {
    constructor() {
        super();
    }
}

```

# 12.  构造函数时，new时发生了什么

var obj = {};

obj.\_proto_ = Obj.prototype

Obj.call(obj)

1. 创建一个空对象obj
2. 将这个空对象的\_proto_属性指向Obj的prototype对象
3. 构造函数Obj的this指针指向obj
4. 隐式地返回this。除非强行return一个引用值

# 12. 事件委托 Event Delegation

### 事件冒泡 Event bubbling

事件传播由子元素冒泡向父元素. Suppose you have a element2 inside an element1 and both have an onClick event handler. It the user clicks on element2, he causes a click event in both. The event handler of elements2 fires first, the event handler of 1 fires last. 

It ripples up all the way up to the top of the DOM and triggers clicks events on all the parents elements of the element you clicked.

Not all events bubble, `blur`, `focus`, `load`,  `submit,reset,select`

- 阻止事件冒泡

  e.stopPropagation()  w3c

  e.cancelBubble(event)  IE 

- 阻止默认事件

  preventDefault
  
  return false 句柄绑定事件

### 事件捕获 Event capturing

事件传播由父元素冒泡向子元素

**先捕获，后冒泡**，To add an event listener on an HTML element, use the addEventListener('click',function,false) method. If the last argument is false, the event handler is set for the capturing phase; if true, the event handler is set for the bubbling phase.

本质上利用率浏览器事件冒泡机制。因为事件在冒泡过程中会上传到父节点，并且父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上。由父节点的监听函数统一处理多个子元素的事件。

使用事件代理可以不必为每个子节点都绑定监听事件，减少内存消耗 decrease the total memory footprint。以及动态绑定dynamically add new elements，增加子节点时，不必单独地为它添加一个监听事件，它所发生的事件会交给父元素中的监听函数来处理。

Because of event bubbling,  you can bind an event handler to a single parent element, and that handler will get executed whenever the event occurs *on any of its child nodes* (and any of their children in turn)

# 13. 事件模型

Dom2 事件捕获 capturing phase，事件处理 target phase，事件冒泡 bubbling phase

事件被从document一直向下传播到目标元素,在这过程中依次检查经过的节点是否注册了该事件的监听函数，若有则执行。事件到达目标元素,执行目标元素的事件处理函数。事件冒泡阶段。事件从目标元素上升一直到达document，同样依次检查经过的节点是否注册了该事件的监听函数，有则执行。

1. Capturing phase – the event goes down to the element.
2. Target phase – the event reached the target element.
3. Bubbling phase – the event bubbles up from the element.

# 14. this

this是执行上下文的一个属性，指向最后一次调用这个方法的对象。四种调用方法判断：

1. 函数调用，不是对象的属性直接调用，this指向全局对象
2. 方法调用，作为对象的方法来调用，this指向这个对象
3. 构造器调用，new一个函数实例，this指向这个新创建的对象
4. apply，call 和 bind调用

A property of an execution context. Every js function while executing has a reference to its current execution context,called this.

1. **Default and implict** bingding of "this" keyword

   1. Default binding of `this`：strict mode   - default value of `this` is undefined；

      ​							otherwise    - `this` keyword act as global object(window in a browser)

   2. Implicit binding： when a function is called as a method of an object, its `this` is set to the object(execution context object) the method is called on.

2. **Explicit and Fixed** Binding of “this” keyword

   1. use `apply` ,`call`, and `bind` method with calling funciton, those methods take as their first parameter as execution context.

3. put **new** keyword  in front of function - constructor

   A brand new empty object gets created; new empty object gets linked to prototype property of that function; same new empty object gets bound as `this` keyword for execution context of that function call; if that function does not return anything then it implicit returns this object.

   - When the "new" keyword is used, a new object is created

   - The new keyword is used with a function, and inside this function's definition, the keyword "this" points to the newly created object.

   - An implicit return "this" is added to the function which uses it

precedence: new > call/apply > function called as a method > default global object

# 15. Prototypal inheritance

# 16. 手写call

```js
Function.prototype.myCall = function(context) {
    // 判断调用的对象是否为函数
	if(typeof this != "function") {
        console.log("type error");
    }
    // 获取参数
    let args = [...arguments].slice(1);
    let result = null;
    context = context || window;
    context.fn = this;
    result = context.fn(...args);
    delete context.fn;
    return result;
}
Function.prototype.call = function(context) {
    if(typeof this !== "function") {
        console.log("type error")
    }
    context = context || window;
    let arg = [];
    for(let i = 1;i < arguments.length;i ++) {
        arg.push(""+arguments[i]+ "");
    }
    context.fn = this;
    let r = eval("context.fn("+arg+")");
    delete context.fn;
    return r;
}
```

# 17. ES6 新特性

## var let const区别

- 全局申明的 var 变量会挂载在 window 上，而 let 和 const 不会

- var 声明变量存在变量提升，let 和 const 不会

- let、const 的作用范围是块级作用域，而 var 的作用范围是函数作用域

- 同一作用域下 let 和 const 不能声明同名变量，而 var 可以

- 同一作用域下在 let 和 const 声明前使用会存在暂时性死区TDZ

  只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

- const
  - 一旦声明必须赋值,不能使用 null 占位
  - 声明后不能再修改
  - 如果声明的是复合类型数据，可以修改其属性

### const

可以用数组下标修改，可以修改对象属性

## 箭头函数

- 普通 function 的声明在变量提升中是最高的，箭头函数没有函数提升
- 箭头函数没有属于自己的`this`，`arguments`
- 箭头函数不能作为构造函数，不能被 new，没有 property
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
- 不可以使用 new 命令，因为：
  - 没有自己的 this，无法调用 call，apply
  - 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 `__proto__`

## Proxy

修改某些操作的默认行为

```js
let p = new Proxy(target, handler)
```

target是要代理（拦截）的对象，handler是要自定义操作方法的一个集合。p是一个被代理后的新对象,它拥有`target`的一切属性和方法，只不过其行为和结果是在`handler`中自定义的.

handler对象是由get和set两个函数方法组成的，这两个方法会在对象被get和set时调用

```js
let obj = {
    a:1,
    b:2,
}
const p = new Proxy(obj,{
    get(target, key, value) {
        if(key==="c")return 1;
    }
    set(target, key, value) {
    	if(value == 4){
            target[key] = "wobushi4"
        }
	}
})
```

```js
handler.has()
handler.get()
handler.set()
handler.getPrototypeOf() // 在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时
```

## 解构赋值

字符串，数组，对象解构

数组两个数交换 [a,b] = [b,a]

## Symbol

原始数据类型。创建后unique且不可变immutable的数据类型，used to add unique keys to an object

## Set

类似于数组的数据结构，但成员值是唯一的，没有重复。入参：具有`Iterator接口`的数据结构

const set = new Set(arr);

set.add(1)   .has .delete .clear() .keys .values()  entries()：返回以属性值和属性值为遍历器的对象  forEach()：使用回调函数遍历每个成员

## Map

类似于对象的数据结构，成员键是任何类型的值。入参：具有Iterator接口且每个成员都是一个双元素数组的数据结构

.set(key, val): 向Map中添加新元素  .get(key)

**Map vs Object**

1. Map键可任意值，o是字符串或symbol
2. M键值对是有序的，FIFO
3. 键值对个数可以通过size属性获取
4. `Object` 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突

**Map vs Set**

* Set是储存单列数据的集合，Map是储存键值对的双列数据
* Map，Set都是无序的，map键不允许重复，但值可以；set不重，元素在集合中的位置是由hashcode决定的，位置固定，但用户不能控制
* Map只一个null键，多个null值可以，set只允许一个null元素

**WeakSet vs Set **

- 与`Set`相比，`WeakSet` 只能是**对象的集合**，而不能是任何类型的任意值。
- `WeakSet`持弱引用：集合中对象的引用为弱引用。 如果没有其他的对`WeakSet`中对象的引用，那么这些对象会被当成垃圾回收掉。 这也意味着WeakSet中没有存储当前对象的列表。 正因为这样，`WeakSet` 是不可枚举的。

**WeakMap 和 Map** 区别

- WeakMap 只接受对象作为键名（不包括null）
- WeakMap 键名所指向的对象，不计入垃圾回收机制（同 WeakSet）

## for(item of array/Map/Set/String)

可迭代对象中使用

for(pros in obj) 可以循环对象的属性

## Promise

## Generator

封装多个内部状态的异步编程解决方案。

```js
function* gen() {
	yield 
}
gen.next()
```

`yield命令`是暂停执行的标记，`next()`是恢复执行的操作。遇到next从头或者上次停下的位置开始执行。内部可不用`yield命令`，但会变成单纯的`暂缓执行函数`(还是需要`next()`触发)

在函数执行过程中，将函数的执行权转移出去，在函数外部我们还可以将执行权转移回来。当我们遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕的时候我们再将执行权给转移回来。因此我们在 generator 内部对于异步操作的方式，可以以同步的顺序来书写

`next()`方法返回一个对象，这个对象包含两个属性：value 和 done，value 属性表示本次 `yield `表达式的返回值，done 属性为布尔类型，表示生成器后续是否还有` yield `语句，即生成器函数是否已经执行完毕并返回。

调用 `next()`方法时，如果传入了参数，那么这个参数会传给**上一条执行的 yield语句左边的变量**，例如下面例子中的` x `：

## async函数

 generator 和 promise 实现的一个自动执行的语法糖，内部自带执行器。当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。

## spread...语法

把数组展开成多个参数

浅拷贝 let a = [...b],

# 18. 手写方法

## map

遍历原数组变换，形成新数组

```js
//实现
Array.prototype.map = function(fn) {
    let arr = [];
    for(i<this.length) {
        arr.push(fn(this[i],i,this))
    }
}
```

## filter

遍历原数组，返回值为true的放入新数组

```js
Array.prototype.filter = function(fn) {
    let arr = [];
     for(i<this.length) {
         if(fn(this[i],i,this)) {
             arr.push(fn(this[i],i,this))
         }
     }
    return arr;
}
```

## reduce

数组中的元素经过回调函数最终转换为一个值

```js
Array.prototype.reduce = function(fn, prev) {
    for(i<this.length) {
        if(prev === "undefined") {
            prev = fn(this[i],this[i+1],i+1,this);
            ++i;
        }else {
            prev = fn(prev,this[i], i, this);
        }
    }
}
```

## some

有一个符合条件的返回true

```js
Array.prototype.some = function(fn) {
  for(let i = 0; i < this.length; i++) {
      if (fn(this[i], i, this)) {
     	 return true;
       }
  }
}
```

## every

都符合条件，返回true

```js
Array.prototype.every = function(fn) {
  for(let i = 0; i < this.length; i++) {
      if (!fn(this[i], i, this)) {
     	 return false;
       }
  }
    return true;
}
```

## find

找到符合条件的元素就返回这个元素，如果没有符合条件的元素就返回 undefined，且找到后不会继续查找

```js
Array.prototype.every = function(fn) {
  for(let i = 0; i < this.length; i++) {
      if (fn(this[i], i, this)) {
     	 return this[i];
       }
  }
    return undefined;
}
```

## Object.create

```js
function create(proto) {
    function F() {};
    F.prototype = proto;
    F.prototype.constructor = F;
    return new F();
}
```

## 防抖

```js
function debounce(fn, wait) {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (timer) {
      		clearTimeout(timer);
      		timer = null;
    	}
        timer = setTimeout(() => {
            fn.apply(context,args);
        }, wait)
    }
}
```

1. 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
2. 调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
3. 文本编辑器实时保存，当无任何更改操作一秒后进行保存

## 节流

```js
function throttle(fn, delay) {
    let preTime = Date.now();

  return function() {
    let context = this,
      args = arguments,
      nowTime = Date.now();
    if (nowTime - preTime >= delay) {
       preTime = Date.now();
       return fn.apply(context, args);
    }
   }
}
```

1. `scroll` 事件，每隔一秒计算一次位置信息等
2. 浏览器播放事件，每个一秒计算一次进度信息等
3. input 框实时搜索并发送请求展示下拉列表，没隔一秒发送一次请求 (也可做防抖)

## 深浅拷贝

浅拷贝指的是将一个对象的属性复制给另一个对象，如果有的属性的值为引用类型的话，会将引用的地址复制给对象，因此两个对象会有同一个引用类型的引用；

深拷贝会新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型。

浅：Object.assign([],obj1) ,[...obj1],

深：JSON.parse(JSON.stringify(obj1)),  由于 JSON 的对象格式比 js 的对象格式更加严格，所以如果属性值里边出现函数或者 Symbol 类型的值时，会转换失败。

深拷贝递归 obj.hasOwnProperty(key)  Array.isArray(obj)?[]:{}  newObj[key] = deepClone(newObj[key])  

## 数组拍平

```js
function flatten(arr) {
    let result = arr.reduce(function(pre,item){
        return pre.concat(Array.isArray(item)?flatten(item):item)
    },[])
    return result;
}
// shift() 判断是数组的话 unshift(...item)
function flatten(arr) {
  let arrs = [...arr];
  let newArr = [];
  while (arrs.length) {
    let item = arrs.shift();
    if (Array.isArray(item)) {
      arrs.unshift(...item);
    } else {
      newArr.push(item);
    }
  }
  return newArr;
}
```



# 19. 闭包 

内部的函数被保存在了外部。一个函数在另一个函数内定义，

# 20. 箭头函数 ,setTimeout this

定义该箭头函数时所在的作用域指向的对象。

外面没有函数了，就是window。

```js
var name = 'window'; 
var A = {
   name: 'A',
   sayBye: () => {
      console.log(this.name) //window
   }，
   sayHello: function() {
       let s = () => console.log(this.name);
       return s;
   }
}
var sayHello = A.sayHello();
sayHello();// 输出A 
var B = {
   name: 'B';
}

sayHello.call(B); //还是A
sayHello.call(); //还是A
//1.该函数所在的作用域：箭头函数s 所在的作用域是sayHello,因为sayHello是一个函数。
//2.作用域指向的对象：A.sayHello指向的对象是A。
```

setTimeout中函数内的this是指向了window对象，这是由于`setTimeout()调用的代码运行在与所在函数`完全分离的执行环境上。这会导致这些代码中包含的 `this` 关键字会指向 `window` (或`全局`)对象

```js
var num = 0;
function Obj (){
    this.num = 1,
    this.getNum = function(){
        console.log(this.num);
    },
    this.getNumLater = function(){
        setTimeout(function(){
            console.log(this.num);
        }, 1000)
    }
}
var obj = new Obj; 
obj.getNum();//1　　打印的是obj.num，值为1
obj.getNumLater()//0　　打印的是window.num，值为0
```

练习：https://juejin.cn/post/6844903673865175053

https://my.oschina.net/u/4358626/blog/3585366

# 21. 大文件上传

form表单

```html
<form method="post" action="http://localhost:8100" enctype="multipart/form-data">

        选择文件:
            <input type="file" name="f1"/> input 必须设置 name 属性，否则数据无法发送<br/>
<br/>
            标题：<input type="text" name="title"/><br/><br/><br/>

        <button type="submit" id="btn-0">上 传</button>

</form>
```

页面内放一个隐藏的 `iframe`，或者使用 `js` 动态创建，指定 `form` 表单的 `target` 属性值为`iframe`标签 的 `name` 属性值，这样 `form` 表单的 `shubmit` 行为的跳转就会在 `iframe` 内完成，整体页面不会刷新。

HTML5中多文件上传//设置 multiple属性 <input type="file" name="f1" multiple/> 

大文件上传：

- 分片：把大文件分段，发送给服务器时携带一个标志，用时间戳。服务端保存，浏览器端所有分片上传完成，发送一个合并文件的请求。服务器根据表示类型和顺序合并，删除分片文件
- 断点续传：断网后已上传的部分跳过，只传未上传的部分。为每个文件生成一个hash值，将上传成功的分段信息保存在本地或者服务端，重新上传时，比较hash值，相同则跳过

# 22.  js 的几种模块规范

js 中现在比较成熟的有四种模块加载方案。

第一种是 CommonJS 方案，它通过 require 来引入模块，通过 module.exports 定义模块的输出接口。这种模块加载方案是服务器端的解决方案，它是以同步的方式来引入模块的，因为在服务端文件都存储在本地磁盘，所以读取非常快，所以以同步的方式加载没有问题。但如果是在浏览器端，由于模块的加载是使用网络请求，因此使用异步加载的方式更加合适。

第二种是 AMD 方案，这种方案采用异步加载的方式来加载模块，模块的加载不影响后面语句的执行，所有依赖这个模块的语句都定义在一个回调函数里，等到加载完成后再执行回调函数。require.js 实现了 AMD 规范。

第三种是 CMD 方案，这种方案和 AMD 方案都是为了解决异步模块加载的问题，sea.js 实现了 CMD 规范。它和 require.js的区别在于模块定义时对依赖的处理不同和对依赖模块的执行时机的处理不同。参考60

第四种方案是 ES6 提出的方案，使用 import 和 export 的形式来导入导出模块。这种方案和上面三种方案都不同。

CommonJS vs ES6

1.CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

2.CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。CommonJS 模块就是对象，即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

1. AMD vs CMD

   1.**AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块**

   2.**CMD推崇就近依赖，只有在用到某个模块的时候再去require**

   ES6 模块中自动采用严格模式， import export命令；

   **CommonJS模块输出的是一个值的复制，ES6输出的是值的引用**。输出后，内部修改，common不会变

# 23. ajax

AJAX 是异步的 JavaScript 和 XML（Asynchronous JavaScript And XML）。

一种异步通信的方法，通过直接由js脚本向服务器发起http通信，然后根据服务器返回的数据，更新网页的响应部分，而不用刷新整个页面。

简单点说，就是使用 XMLHttpRequest 对象与服务器通信。 它可以使用 JSON，XML，HTML 和 text 文本等格式发送和接收数据。AJAX 最吸引人的就是它的“异步”特性，也就是说他可以在不重新刷新页面的情况下与服务器通信，交换数据，或更新页面。

```
首先是创建一个 XMLHttpRequest 对象。

然后在这个对象上使用 open 方法创建一个 http 请求，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。

在发起请求前，我们可以为这个对象添加一些信息和监听函数。比如说我们可以通过 setRequestHeader 方法来为请求添加头信息。我们还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发onreadystatechange 事件，我们可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候我们可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候我们就可以通过 response 中的数据来对页面进行更新了。

当对象的属性和监听函数设置完成后，最后我们调用 sent 方法来向服务器发起请求，可以传入参数作为发送的数据体。
```

```js
xhr = new XMLHttpRequest();
xhr.onReadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status === 200){
        
    }
}
xhr.open("GET", url, true);
xhr.send();
```

- POST 请求

POST 请求则需要设置`RequestHeader`告诉后台传递内容的编码方式以及在 send 方法里传入对应的值

```js
xhr.open("POST", url, true);
xhr.setRequestHeader(("Content-Type": "application/x-www-form-urlencoded"));
xhr.send("key1=value1&key2=value2");
```

- Ajax 与 cookie
  - ajax 会自动带上同源的 cookie，不会带上不同源的 cookie
  - 可以通过前端设置 withCredentials 为 true， 后端设置 Header 的方式让 ajax 自动带上不同源的 cookie，但是这个属性对同源请求没有任何影响。会被自动忽略。

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://example.com/", true);
xhr.withCredentials = true;
xhr.send(null);
```

用Promise封装ajax

# 24. keep-alive

通过维护一个cache，并在render函数中根据key返回缓存的vnode，来实现组件的持久化。

# 25. 变量提升

函数声明function a(){}提到最上面，函数体会赋给值；如果函数上面有同名变量声明和赋值，var a = 1 执行时，函数a被覆盖

# 26. node.js区别

1)、Node.js比Java更快 ：

node.js开发快，运行的效率也算比较高，但是如果项目大了就容易乱，而且javascript不是静态类型的语言，要到运行时才知道类型错误，所以写的多了之后免不了会出现光知道有错但是找不到哪儿错的情况，所以测试就得些的更好更详细。

java开发慢，但是如果项目大、复杂的话，用java就不容易乱，管理起来比node.js省。

2)、Node.js 前后端都采用Javascript，代表未来发展的趋势，而java则是现在的最流行的服务器端编程语言。

3)、Node.js和Java EE——一种是解释语言，一种是编译语言.

Node.js解决问题的速度比Java EE快20%，一种解释语言和一种编译语言在一个VM中的速度是一样快的，这没有多年的优化过程是绝对达不到的。

4)、Java是一种编程语言，而NodeJS是用C，C ++编写的基于 Chrome V8 引擎的 JavaScript 运行环境。

5)、Java严格来说是一种与浏览器无关的服务器端语言，而Node JS可以在客户端和服务器端有效地使用。

```js
单线程
在 Java、PHP 或者 .net 等服务器端语言中，会为每一个客户端连接创建一个新的线程。而每个线程需要耗费大约2MB内存。也就是说，理论上，一个8GB内存的服务器可以同时连接的最大用户数为4000个左右。要让Web应用程序支持更多的用户，就需要增加服务器的数量，而 Web 应用程序的硬件成本当然就上升了。

Node.js不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就触发一个内部事件，通过非阻塞I/O、事件驱动机制，让 Node.js 程序宏观上也是并行的。使用 Node.js ，一个8GB内存的服务器，可以同时处理超过4万用户的连接。

另外，单线程带来的好处，操作系统完全不再有线程创建、销毁的时间开销。但是单线程也有很多弊端，会在 Node.js 的弊端详细讲解，请继续看。
```

https://segmentfault.com/a/1190000019854308

```js
function myInterval(func, time) {
  function fn() {
    setTimeout(fn,time)
    func();
  }
  setTimeout(fn,time)
}
```

# 27. 手写jsonp

```js
function jsonp(url, params, callback) {
  let queryString = url.indexOf('?') === -1 ? '?' : '&';
   // 添加参数
   for(let k in params) {
     if(params.hasOwnProperty(k)) {
       queryString += k + '=' + params[k] + '&';
     }
   }
	// 处理回调函数名
   let random = Math.random().toString.replace('.','');
   let callbackName = 'jsonp' + random;
    
    // 添加回调函数
   queryString += 'callback=' + callbackName;
    // 构建请求
   let scriptNode = document.createElement('script');
   scriptNode.src = url + queryString;
    // 发起请求
   document.head.appendChild(scriptNode);
   //要执行回调函数的话，暴露为一个全局方法
   window[callbackName] = function() {
     callback(...arguments);
     document.getElementsByTagName('head')[0].appendChild(scriptNode);
   }
   document.getElementsByTagName('head')[0].removeChild(scriptNode);
}
```

# 28. 设计模式

单例模式保证了全局只有一个实例来被访问。比如说常用的如弹框组件的实现和全局状态的实现。

策略模式主要是用来将方法的实现和方法的调用分离开，外部通过不同的参数可以调用不同的策略。我主要在 MVP 模式解耦的时候用来将视图层的方法定义和方法调用分离。

代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。比如说常见的事件代理。

中介者模式指的是，多个对象通过一个中介者进行交流，而不是直接进行交流，这样能够将通信的各个对象解耦。

发布订阅模式其实属于广义上的观察者模式。在观察者模式中，观察者需要直接订阅目标事件。在目标发出内容改变的事件后，直接接收事件并作出响应。而在发布订阅模式中，发布者和订阅者之间多了一个调度中心。调度中心一方面从发布者接收事件，另一方面向订阅者发布事件，订阅者需要在调度中心中订阅事件。通过调度中心实现了发布者和订阅者关系的解耦。使用发布订阅者模式更利于我们代码的可维护性。

适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。假如我们需要一种新的接口返回方式，但是老的接口由于在太多地方已经使用了，不能随意更改，这个时候就可以使用适配器模式。比如我们需要一种自定义的时间返回格式，但是我们又不能对 js 时间格式化的接口进行修改，这个时候就可以使用适配器模式。

# 29. 前端优化

减少请求次数 雪碧图，缓存，减少重定向

压缩资源大小

优化网络连接 cdn

资源加载，懒加载

减少重绘回流 防抖节流

webpack优化 精简打包代码,压缩代码

`UglifyJsPlugin`对js文件进行压缩，

图片用url-loader转base64

babel loader es6  减小 Loader 的文件搜索范围

```js
// 只在 src 文件夹下查找
        include: [resolve("src")],
        // 不会去查找的路径
        exclude: /node_modules/,
```

ssr 服务器端渲染

### DNS 预解析

现代浏览器在 DNS Prefetch 上做了两项工作：

1. html 源码下载完成后，会解析页面的包含链接的标签，提前查询对应的域名

2. 对于访问过的页面，浏览器会记录一份域名列表，当再次打开时，会在 html 下载的同时去解析 DNS

**自动解析**

浏览器使用超链接的 href 属性来查找要预解析的主机名。当遇到 a 标签，浏览器会自动将 href 中的域名解析为 IP 地址，这个解析过程是与用户浏览网页并行处理的。但是为了确保安全性，在 HTTPS 页面中不会自动解析

**手动解析**

```html
预解析某域名
<link rel="dns-prefetch" href="//img.alicdn.com" />

强制开启HTTPS下的DNS预解析
<meta http-equiv="x-dns-prefetch-control" content="on" />
```

### CDN

CDN 的原理是尽可能的在各个地方分布机房缓存数据。

因此，我们可以将静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名。并且对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带上主站的 Cookie，平白消耗流量。

### 预加载

在开发中，可能会遇到这样的情况。有些资源不需要马上用到，但是希望尽早获取，这时候就可以使用预加载。

预加载其实是声明式的 fetch ，强制浏览器请求资源，并且不会阻塞 onload 事件，可以使用以下代码开启预加载。

预加载可以一定程度上降低首屏的加载时间，因为可以将一些不影响首屏但重要的文件延后加载，唯一缺点就是兼容性不好。

```html
<link rel="preload" href="http://example.com" />
```

### 预渲染

可以通过预渲染将下载的文件预先在后台渲染，可以使用以下代码开启预渲染。

性能优化主要包含两个方面：1.首屏快不快 2.使用卡不卡

## 首屏速度

懒加载，资源压缩，减少首屏资源的大小。

懒加载的原理就是只加载自定义区域（通常是可视区域，但也可以是即将进入可视区域）内需要加载的东西。对于图片来说，先设置图片标签的 src 属性为一张占位图或为空，将真实的图片资源放入一个自定义属性中，当进入自定义区域时，就将自定义属性替换为 src 属性，这样图片就会去下载资源，实现了图片懒加载。

通过预拉取、BFF、模版注入等方式 **减少网络请求的次数或时间** 节流 防抖

**在网络传输过程中进行优化** 缓存、CDN

通过 SSR 提前渲染好 HTML，减少首屏UI网络请求次数和渲染耗时

最后当资源加载好后，以最快的速度将页面渲染出来

### 图片优化

- 不用图片。很多时候会使用到很多修饰类图片，其实这类修饰图片完全可以用 CSS 去代替。
- 对于移动端按理说，图片不需要加载原图，可请求裁剪好的图片
- 小图使用 base64 格式
- 将多个图标文件整合到一张图中（雪碧图）
- 采用正确的图片格式
  - 对于能够显示 WebP 格式的浏览器尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，缺点就是兼容性并不好
  - 色彩很多的使用 JPEG
  - 色彩种类少的使用 PNG，有的可用 SVG 代替

# 30. js数规范

IEEE754标准，Number类型时候64位固定长度的浮点数

- 符号位S：第 1 位是正负数符号位（sign），0代表正数，1代表负数
- 指数位E：中间的 11 位存储指数（exponent），用来表示次方数
- 尾数位M：最后的 52 位是尾数（mantissa），**超出的部分自动进一舍零**，二进制默认整数位为1舍去

![qq20171016-153108 2x](https://user-images.githubusercontent.com/4928035/31599945-25a78f8e-b21a-11e7-90de-93a73f37e32c.png)

![latex expression](https://user-images.githubusercontent.com/948896/31601584-f65ed43e-b21f-11e7-8755-c99b48e5134c.png)

0.1 转成二进制表示为 0.0001100110011001100(1100循环)，1.100110011001100x2^-4，所以 E=-4+1023=1019；M 舍去首位的1，得到 100110011...。最终就是：

转化成十进制后为 `0.100000000000000005551115123126`，因此就出现了浮点误差。
消除大数误差：

- 数据展示类：parseFloat(num.toPrecision(12))
- 数据运算类：转换成字符串计算，小数转化为整数

```js
/**
 * 精确加法
 */
function add(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
```

- 用成熟的库,number-precision

# 31. 判断类型

typeof 

instanceof

Object.prototype.toString.call() 

toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 

# 32. 
