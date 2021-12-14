function myInterval(func, time) {
  function fn() {
    setTimeout(fn,time)
    func();
  }
  setTimeout(fn,time)
}