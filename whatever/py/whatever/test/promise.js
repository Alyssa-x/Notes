function MyPromise(fn) {
  var self = this;
  this.state = 'pending';
  this.value = null;

  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value) {
    if(value instanceof MyPromise) {
      return value.then(resolve, reject);
    }

    setTimeout(()=>{
      if(self.state === "pending") {
        self.state = "resolved";
        self.value = value;

        self.resolvedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }, 0)
  }
  function reject(value) {
    setTimeout(()=>{
      if(self.state === "pending") {
        self.state = "rejected";
        self.value = value;

        self.rejectedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }, 0)
  }
  try{
    fn(resolve, reject);
  }catch(e){
    reject(e);
  }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  onResolved = typeof onResolved === "function" ? onResolved : function(value) {return value}
  onRejected = typeof onRejected === "function" ? onRejected : function(value) {return value}
  
  if(this.state === "pending") {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }
  if(this.state === "resolved") {
    onResolved(this.value);
    
  }
  if (this.state === "rejected") {
    onRejected(this.value);
  }
}
MyPromise.prototype.catch = function(onRejected){
  return this.then(null,onRejected)
}

MyPromise.prototype.resolve = function(value) {
  if(value instanceof myPromise) {
    return value.then(resolve, reject);
  }

  if(this.status === "pending") {
    this.state = "resolved";
    this.value = value;
    this.onResolvedCallbacks.forEach(callback=>callback(value));
  }
}
MyPromise.prototype.reject = function(value) {
  return new MyPromise((resolve, reject)=>{
    reject(value);
  })
}

// 无论如何都会执行 无论结果是fulfilled或者是rejected，都会执行指定的回调函数
MyPromise.prototype.finally = function(callback) {
  return this.then((value) => {
    return MyPromise.resolve(callback()).then(()=>value)
  },
  (reason)=>{
    return MyPromise.reject(callback()).then(()=> reason)}
  )
}
// iterable类型，只返回一个promise实例。
// 都resolve才会返回一个resolve的数组，有一个reject就会抛出错误
MyPromise.prototype.all = function(promiseList) {
  return new MyPromise((resolve, reject) => {
    let index = 0,
        results = [];
    for(let i = 0; i < promiseList.length; i++) {
      let item = promiseList[i];
      
      MyPromise.resolve(item).then(function(value) {
        index ++;
        results[i] = value;
        if(index === promiseList.length) {
          return resolve(results);
        }
      },function(reason){
        return reject(reason);
      })
    }    
  })
}

// Promise.any 只要有一个promise成功，就返回那个已经成功的promise。如果iterable对象中全部失败，则返回一个promise和AggregateError类型的实例
// Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。
// 一旦某个promise成功或失败，就返回那个结果，不管是resolved还是rejected
MyPromise.prototype.race = function(promiseList) {
  return new Promise((resolve, reject) => {
    for(let i = 0;i <promiseList.length;i ++) {
      let item = promiseList[i];

      MyPromise.resolve(item).then(function(value){
        return resolve(value)
      }, function(reason) {
        return reject(reason);
      })
    }
  })
}


const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  },1000);
}).then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('faild', err)
  }
)
// .then(
//   (data) => {
//     console.log('success', data)
//   },
//   (err) => {
//     console.log('faild', err)
//   }
// )
