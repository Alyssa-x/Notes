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