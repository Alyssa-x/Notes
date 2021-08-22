```js
function myInterval(func, time) {
  function fn() {
    setTimeout(fn,time)
    func();
  }
  setTimeout(fn,time)
}
function curry(func) {
  let args = [];

  function fn(...agsFn) {
    args = args.concat(agsFn);
    if(args.length >= func.length) {
      const result = func(...args);
      args = [];
      return result;
    } else {
      return fn;
    }
  }
  return fn;
}

```

# 字符串 str

## 方法

1. slice(start,stop)没

   slice(-1)-> 截取最后一位

   slice(0,-1) -> 截取除最后一位的前面所有

2. splice（start，deleteCount，items…）改变原数组，返回删除的数组部分

3. substring(start,stop) 不接受负数

4. substr(start,length) -> 不写 length，默认到结尾。ECMA没写，不推荐

5. arr = str.split("") -> 字符串变数组

6. .trim() 删除字符串的头尾空格

7. .endsWith(str, length可选)  是否以str结尾，或者 length长度的片段是否以str结尾

8. .indexOf(str) 首次出现该str的位置，**查**无此str时返回-1

   lastIndexOf(str) 最后一次出现的位置，查无此str时返回-1

9. parseFloat(string) 解析字符串，返回浮点数，首位必须为数字

10. .charCodeAt( index ) index不合理时返回NaN

    .fromCharCode(numX,numX…) 根据Unicode返回string

11. .replace(reg/substr,replacement)

## 知识点

1. 字符串用下标选中时无法赋值修改

# 数组 arr

1. arr.slice(start,end); 不写end，默认到字符串结尾
2. arr.splice(start,length,...data) 删除/插入
3. arr.shift() 删除第一个 unshift() 添加在头
4. join("")；数组变字符串，对应split(“”)
5. includes(searchEle,索引处开始); 数组内包含此元素 true
6. **arr**.forEach(回调函数function(数组的每个元素){}，thisvalue)
7. .sort() 按照字符编码大小排序
8. .reverse() 逆序输出
9. **.map(函数) **原始数组元素调用函数处理后形成的新数组
10. every(function(item){ if(item>0); return true;}) 检测数组所有元素是否**都**符合指定条件，每个都要通过if才返回true
11. some(function(item){ if(item>0); return true;}) 检测数组元素中是否**有**元素符合指定条件
12. filter（）返回符合条件的所有元素

# 对象 Object

1. **Object.keys(obj)** 按升序返回对象的key数组；ES6非对象会强制转换为对象，以前报错

   ```js
   if (!Object.keys) {
     Object.keys = (function () {
       var hasOwnProperty = Object.prototype.hasOwnProperty,
           hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
           dontEnums = [
             'toString',
             'toLocaleString',
             'valueOf',
             'hasOwnProperty',
             'isPrototypeOf',
             'propertyIsEnumerable',
             'constructor'
           ],
           dontEnumsLength = dontEnums.length;
   
       return function (obj) {
         if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
   
         var result = [];
         for (var prop in obj) {
           if (hasOwnProperty.call(obj, prop)) result.push(prop);
         }
   
         if (hasDontEnumBug) {
           for (var i=0; i < dontEnumsLength; i++) {
             if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
           }
         }
         return result;
       }
     })()
   };
   ```


## map

map.

# 数字 num

1. num+ "" 转换为string类型
2.  toFixed(小数点后位数) 四舍五入为指定小数位数的数字

# lodash

1. camelCase（）转为驼峰写法
2. upperFirst（）首字母大写

# 全局方法

1. eval(string) 计算

2. encodeURIComponent(URLstr) 函数可把字符串作为 URI 组件进行编码。不会对 ASCII 字母和数字和 - _ . ! ~ * ' ( )编码。

   其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。

# 数学方法 Math

1. Math.pow(i,n) i的n次幂

2. Math.sqrt() 开方

3. Math.ceil() 上舍入

    		 .floor() 下舍入

   ​		  .round() 四舍五入最接近的值，0.5时上舍入，-3.5 -> -3

4. Math.max(a,b) 取最大值 min(a,b)最小值 Math.max(...arr)数组中最大值




# ES6

1. function(...num){} 剩余参数 Rest Paraments，arguments是伪数组，剩余参数是真数组。
2. 形参可设置默认值 function（x="a"）
3. **遍历数组**：for(let i of array)
4. 

# 算法

1. 最长子序列
2. 最长公共子字符串
3. 柯里化

```js
function curry(func) {
  let args = [];

  function fn(...agsFn) {
    args = args.concat(agsFn);
    if(args.length >= func.length) {
      const result = func(...args);
      args = [];
      return result;
    } else {
      return fn;
    }
  }
  return fn;
}

function add1(a, b, c) {
  return a + b + c;
}

let testAdd = curry(add1);
console.log(testAdd(1,3)(3));

function curry(fn,...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null,fn,...args)
  // bind指向null，不改变this指向，可以在后续调用中继续传入参数
}

```

4. 浅拷贝

```js
let a ={a:11};
let b = Object.assign({},a);
a.a = 2
b.a//11
```

​		深拷贝

```js
function deepClone(origin,target) {
    if(typeof origin !== "object" || !origin){
        return origin;
    }
    target = target || {};
    for(let prop in origin){
        if(typeof origin[prop] === "object" && orgin[prop]){
            if(orgin[prop] instanceof Array){
                target[prop] = [];
                deepClone(origin[prop], target[prop]);
            }else{
                target[prop] = {};
                deepClone(origin[prop], target[prop]);
            } 
        }else{
            target[prop] = origin[prop];
    }
        return target;
}
```

5. 闭包写定时器

```js
function test(delay) {
     for(var i = 0; i < 5; i ++){
    (function(j){
        setTimeout(() => {console.log(j)},delay)
   		}  
     })(i)
    
}
```

6. 数组去重

```js
return [...new Set(arr)]
result.indeOf(current) === -1 没有push进去
```

6. 数组扁平化

```js
function flatten(arr) {
    let result = arr.reduce(function(pre,item){
        return pre.concat(Array.isArray(item)?flatten(item):item)
    },[])
    return result;
}
```

7. 求数组最大值

```js
1.Math.max(...arr)
2.function max(pre,next){
    return Math.max(pre,next)
  }
  arr.reduce(max)
3.Math.max.apply(null,arr)
```

8. 出现最多次

```js
key = str[i];

obj[key] ++

for(let key in obj){
    if(count < obj[key]){
        count = obj[key];
        maxStr = key;
    }
}
```

9. new做了什么

```js
obj = new Base()

var obj = {}；
obj.__proto__ = Base.prototype;
Base.call(obj)
```

10. Map和Set区别

    * Set是储存单列数据的集合，Map是储存键值对的双列数据

    * Map，Set都是无序的，map键不允许重复，但值可以；set不重，元素在集合中的位置是由hashcode决定的，位置固定，但用户不能控制

    * Map只一个null键，多个null值可以，set只允许一个null元素

11. 继承的几种方式

12. Ajax实现

```js
var xhr = XMLHttpRequest();
xhr.open('GET',url,true);
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304){
        fn(xhr.responseText)
    }
}
xhr.send()//post的话要在前面设置xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')

xhr.withCredentials = true;// 设置自动带上cookie
```

12. sleep函

```js
const sleep = (time) => {
    new Promise((resolve) => {
        setTimeout(resolve,time)
    })
}
sleep(1000).then(() => {
    console
})
```

13. Promise 的API

    .then()

    .finally() 不管最后是什么状态，都会执行操作

    .all()将多个promise封装成一个新的

    .race() 将多个实例包装成一个实例

14. 判断 "[{}]]]"是否符合规则

```js
function test(str) {
  let len = str.length,
      arr = [];  
  for(let i = 0; i < len; i ++){
    if(str[i] === "(" || str[i] === "[" || str[i] === "{" ){
      arr.push(str[i]);
    }else{
      let item = arr[arr.length-1];
      if(str[i] === ")" && item === "("){
        arr.pop();
      }else if(str[i] === "}" && item === "{"){
        arr.pop();
      }else if(str[i] === "]" && item === "["){
        arr.pop();
      }else{
        return false;        
      }
    }
  } 
  if(arr.length !== 0){
      return false
    }
  return true;
}
```

15. 防抖

```js
 //防抖
      function debounce(fn, wait) {
        let timer = null;
        return function () {
          let context = this,
            args = arguments;
          if (timer) {
            clearTimeout(timer);
            time = null;
          }

          timer = setTimeout(() => {
            fn.apply(context, args);
          }, wait);
        };
      }
```

16. 节流

```js
//节流
      function throttle(fn, delay) {
        let prev = Date.now(),
          
        return function () {
            context = this,
          args = arguments;
          let now = Date.now();
          if (now - prev >= delay) {
            prev = Date.now();
            return fn.apply(context, args);
          }
        };
      }
```

17. 尾递归

    每递归一次就算出相应的结果，把当前的运算结果放在参数里传给下层函数；

    普通递归容易造成栈溢出，需要开辟栈来保存以前的值

1. map

2. 链表

3. 单向链表反转

4. 匈牙利算法

5. 两数乘积等于最大公约数乘最小公倍数

   最大公约数 (欧里几德算法:**除数和余数反复做除法运算，当余数为 0 时，取当前算式除数为最大公约数**)

   function gcd(a,b){

   if(b==0) return a;

   let r = a%b;

   return gcd(b,r);

   }

   最小公倍数 function scm(a,b){

   return (a*b)/gcd(a,b)

   }

6. 最长递增子序列

7. 实现控件的拖拽 e.offsetX e.pageX/clientX ele.c=offsetWidth

# 计算机基础

1. 数组和链表的区别

   1. 物理地址存储的连续性。数组在内存中是连续存放的，需预留空间；链表元素在内存中不一定是连续存放
   2. 访问速度不同。数组可以直接通过下标定位，从首地址向后偏移；链表空间分散，无随机访问性，需要移动指针遍历
   3. 增删元素速度不同。数组效率低，因为需要移动大量元素。链表只需修改指针
   4. 数组需预留固定空间，链表可以动态扩展
   5. 数组的空间是从栈中分配，链表在堆中

2. 单链表和双链表的区别

   1. 单链表只有指向下一个节点的指针，双链表有指向下一个的和上一个的
   2. 单链表更适合增加和删除，只要找到前一个节点，改变指针；双链表更适合查找，可以从两头往中间找
   3. 单链单向读取，只能找到后继；双链表双向读取

   但市面上用单链表比较多，是因为存储两个指针空间大

3. 进程和线程的区别

   1. 进程是操作系统资源分配的基本单位，而线程是任务调度和执行的基本单位

4. 面向对象编程：基于对象的思想进行编程。有封装，继承（js**方法？**，多态（在不同的对象上做相同操作会有不同的结果）的特点

5. 操作系统死锁：多道程序系统中，由于多个进程的并发执行，改善了系统资源的利用率，但多个进程因竞争资源而造成一种互相等待的僵局，无法推进

6. OSI七层模型：物理层，数据链路层，网络层，传输层，会话层，表示层，应用层

   tcp/ip模型：链路层，网络层，传输层，应用层

7. http协议和https协议的区别：

   传输信息安全性不同、连接方式不同、端口不同、证书申请方式不同

   - 传输信息安全性不同

   1、http协议：是超文本传输协议，信息是明文传输。如果攻击者截取了Web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息。

   2、https协议：是具有安全性的 ssL/TLS(secure sockets layer/ transport layer secure 加密算法不同的安全协议) 加密传输协议，为浏览器和服务器之间的通信加密，确保数据传输的安全。

   - 连接方式不同

   1、http协议：http的连接很简单，是无状态的。

   2、https协议：是由SSL＋HTTP协议构建的可进行加密传输、身份认证的网络协议。

   - 端口不同

   1、http协议：使用的端口是80。

   2、https协议：使用的端口是443．

   - 证书申请方式不同

   1、http协议：免费申请。

   2、https协议：需要到ca申请证书，一般免费证书很少，需要交费。

8. 信号量( semophore ) ： 信号量是一个计数器，可以用来控制多个进程对共享资源的访问。它常作为一种锁机制，防止某进程正在访问共享资源时，其他进程也访问该资源。因此，主要作为进程间以及同一进程内不同线程之间的同步手段。

9. 事件轮询 Event Loop

   Node中的Event Loop


# 杂

2. Object.keys(obj) -> 枚举对象属性放入数组中
3. for(var i in obj){} -> 当前属性名放入i
4. if(obj[prop]) -> 判断对象中是否包含该属性
5. 读取字符串：while(str = readline()){}
6. 正则 replace这个方法，是有一个回掉函数的，函数的参数就是正则匹配到的值
7. 输入只能为数字时，line= readline（）, n = parseInt(line)
8. **this** 指向
   1. 默认绑定：window和undefined（use strict）
   2. 隐式绑定：由上下文对象调用，绑定到那个上下文对象
   3. 隐式丢失：回归默认绑定。var bar= obj.foo; bar() 此时执行的是foo（）本身，而不是obj.foo()；传入回调函数时，也会丢失。callback（fn）fn()，传入obj.foo，实际执行的是foo()
   4. 显示绑定 apply call
   5. 硬绑定 bind 会返回一个新函数，把指定的参数设置为this的上下文并调用原始函数
   6. new 绑定 绑定到新创建的对象

## 牛客网编程环境

1. 一次性输入多个时 readline（）.split(" ")存到数组里。多行时可以写好几个readline，也可以试试前面的方法

# 悬而未决

1. 用vue实现一个模糊搜索，写出页面结构和后台返回的数据格式以及相关的功能函数
2. 获取哈希值时，时间复杂度是O（1）吗