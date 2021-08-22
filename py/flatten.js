function flatten1(arr) {
  return arr.reduce((pre,item) => {
    return pre.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}

const flatten2 = (arr) => {
  let newArr = [];
  while(arrs.length) {
    let item = arr.shift();
    if(Array.isArray(item)) {
      arr.unshift(...item);
    } else {
      newArr.push(item);
    }
  }
  return newArr;
}

const flatten = (arr) => {
  let len = arr.length;
  for(let i = 0;i < len;i ++) {
    if(Array.isArray(arr[i])) {
      let item = arr[i];
      arr.splice(i,1,...item)
    }
    len = arr.length;
  }
  return arr;
}
// 第四种 arr.flat(Infinity) 括号中是depth
console.log(flatten([1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]))