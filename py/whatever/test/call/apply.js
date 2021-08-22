
Function.prototype.myCall = function(context) {
  if(typeof this !== "function") {
    console.error("type error");
  }
  let args = [...arguments].slice(1);
  let result = null;

  context = context || window;
  context.fn = this;

  result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.myApply =  function(context) {
  if(typeof this !== "function") {
    console.error("type error");
  }
  let result = null;
  context = context || window;
  context.fn = this;

  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}
// bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，
// 而其余参数将作为新函数的参数，供调用时使用。
Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {
    console.log('type error');
  }
  let self = this;
  let args = [...arguments].slice(1);
  function Fn() {}
  function fBound() {
    return self.apply(
      //为true表示构造函数的情况。如new bindFn(9);
      this instanceof fBound ? this : context,args.concat(...arguments)
    )
  }
  Fn.prototype = this.prototype;
  fBound.prototype = new Fn();
  return fBound;
}
