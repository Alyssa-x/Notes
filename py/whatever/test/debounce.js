
function debounce(fn, delay) {
  let timer = null;
  return function() {
    let context =this;
    let args = arguments;
    if(timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() =>{
      fn.apply(context,args)
    },delay)
  }
}

function throttle(fn, delay) {
  let time = Date.now();
  return function() {
    let context =this;
    let args = arguments;
    let t = Date.now();
    if(time - t >= delay) {
      time = Date.now();
      fn.apply(context,args)
    }

  }
}