const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

sleep(1000).then(() => {
  console.log(1);
});
//
function* sleep(time) {
  yield new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
sleep(1000)
  .next()
  .value.then(() => {
    console.log(1);
  });
// Async
async function sleep(time, func) {
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
  return func();
}
sleep(1000, () => {
  console.log(1);
});
async function sleep(time, func) {
  console.log(444)
  await new Promise(resolve => {
      setTimeout(()=>{resolve()},time);
  })
  func();
  
} // 先444 等待time 再func
//
function sleep(callback, time) {
  if (typeof callback === "function") setTimeout(callback, time);
}

