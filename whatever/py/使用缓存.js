function memorize(fn) {
  let map = new Map();
  return function(...args) {
    let keys = Array.from(map.keys());
    let flag = false;
    for(let item of keys) {
      flag = args.every((val, index) => {
        return val === item[index]
      })
    }
    if(is) {
      console.log('true');
      return map.get(item);
    }
    let r = fn(...args);
    map.set(args,r);
    return r;
  }
}