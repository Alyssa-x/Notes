let w = 3;
let h = 0;
let s = 0;
let r = 0;
let result = 0;
let d1 = Math.sqrt(w*w + h*h);

for (let i = h + w; i >= 0; i--) {
  if (i > w) {
    s = Math.sqrt((i-w)*(i-w) + w*w);
  } else {
    s = i;
  }
  result += (1 - s/d1);
  console.log(result);
}

// 横向移动
// for (let j = 0; j <= w; j++) {
//   r += j;
// // }
// console.log(r);
// console.log(w + h + 1 - r / d1);
// h--;
// }
