function flatten(arr) {
  return arr.reduce((pre, item) => {
    return pre.concat(Array.isArray(item) ? flatten(item) : item);
  },[])
}
function flatten1(arr) {
  let newArr = [];
  while(arr.length) {
    let item = arr.shift();
    if(Array.isArray(item)) {
      arr.unshift(...item);
    }
    else{
      newArr.push(item);
    }
  }
  return newArr;
}
let arr = [1,2,[3,4,[5,[5],6]],7];

function flatten2(arr) {
  let len = arr.length;
  for(let i = 0;i < len;i ++) {
    if(Array.isArray(arr[i])) {
      arr.splice(i,1,...arr[i])
    }
    len = arr.length;
  }
  return arr;
}
// promise封装sleep

function* sleep(time) {
  console.log(1)
  yield new Promise(resolve => {
    setTimeout(resolve, time);
  })
}
// sleep(2000).next().value.then(() => {console.log(2)})
function curry(func) {
  let args = [];
  function fn(...argsFn) {
    args = args.concat(argsFn);
    if(args.length >= func.length) {
      let re = func(...args);
      args = [];
      return re;
    } else {
      return fn;
    }
  }
  return fn;
}
function cur(fn,...args) {
  return args.length >= fn.length ? fn(...args) : cur.bind(null,fn, ...args)
}
function add1(a, b, c) {
  return a + b + c;
}

let testAdd = cur(add1);

function debounce(fn, delay) {
  let timer = null;
  return function() {
    let self = this;
    let args = arguments;
    if(timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(self,args)
    },delay)
  }
}
function throttle(delay) {
  let pre = Date.now();
  return function() {
    let self = this;
    let args = arguments;
    let now = Date.now();
    if(now - pre > delay) {
      fn.apply()
      pre = Date.now();
    }
  }
}
Function.prototype.mBind = function(context) {
  let self = this;
  let args = [...arguments].slice(1)
  function Fn() {};
  function bBound() {
    return self.apply(this instanceof bBound ? this : context, args.concat(...arguments))
  }
  Fn.prototype = this.prototype;
  bBound.prototype = new Fn();
  return bBound;
}
function deepCopy(obj) {
  if(typeof obj !== 'object' || !obj) return obj;
  let newObj = Array.isArray(obj) ? [] : {};
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      newObj[key] = deepObj(obj[key])
    }
  }
  return newObj;
}
Object.assign([],obj);
JSON.parse(JSON.stringify(obj));

function Father() {
  this.name = 'a'
}
function Child() {
  Father.call(this)
}
// Child.prototype = new Father();
Child.prototype = Object.create(Father.prototype);
Child.prototype.constructor = Child;
class A {
  constructor() {

  }
}
class B extends A {
  constructor() {
    super();
  }
}