# 项目中的问题

## express项目

1. 注册时，req.body可直接作为userObj对象参数传进去，格式为json，符合 模型.create(userObj）格式

   

2. getNews分页时，

   ```js
    var page = + req.query.page || 1; //设置默认值以及req.query是字符串 ，要转为number
   
   ```

3. ```js
     var resp = await fetch(url) //返回的是 Response {type: "basic", url: "http://localhost:9527/api/news?	 page=1&limit=10", redirected: false, status: 200, ok: true, …}
     var result = await resp.json();// 解析出json格式，{total: 120, datas: Array(10)}
     return result;
   ```

4. ```js
   var json = JSON.stringify(loginInfo); //把js对象转化为json格式的字符串，放在响应体body中，同时设置响应头和method
   ```

5. 所有的地址，前面都要加"/"


## 贪吃蛇项目

1. array.push() 写成了 array.push=()
2. 数组的forEach方法：遍历数组内所有元素，将当前元素传给回调函数
3. 设计模式

# 小鸟项目

1. clearInterval 每次停止的时间不一样？

# node项目总结

## 面试可能问题

1. exports. 和 module.exports和this.xxx