# 前置知识

- ES6 模板字符串

  var a = 3,b=4;

  var str= `a:${a}

  b:${b}`

# http协议

http是大部分场景下客户端和服务器的通信协议，它规定了双方传输的内容格式和方式

<img src="http://mdrs.yuanjin.tech/img/image-20200526121029435.png" alt="image-20200526121029435" style="zoom:50%;" />

客户端要连接 服务器，需要使用一个url地址来定位服务器，该url地址的格式为：

```
protocal://hostname:port/path?query#hash
```

例如：`http://localhost:9527/news?page=1&limit=10#2`

他们各个部分分别是：

- `protocal`：`http`
- `hostname`: `localhost`
- `port`: `9527`，如果没有写端口号，默认为80
- `path`: `/news`
- `query`: `?page=1&limit=10`，表示有两个信息传递过来`{page:1, limit:10}`
- `hash`：`2`，hash一般用作锚链接，服务器一般不需要这个信息

如果`url`地址成功的找到了服务器，客户端会组装一个特别的消息格式发送给服务器，称之为**请求**

请求内容格式示例：

```
GET /news?page=1&limit=10#2 HTTP/1.1 //请求行
//消息头
Host: localhost:9527
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...
Connection: keep-alive
Accept-Encoding: gzip, deflate

<没有消息体>
```

服务器收到客户端的消息后，会处理该消息，然后返回给客户端一个消息，称之为**响应**

响应内容格式示例：

```
HTTP/1.1 200 OK //响应行
//响应头：
Content-Type: text/html;charset=utf-8
Server: Express
Cache-Control: no-cache
//响应体：
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>新闻页面</h1>
</body>
</html>
```



# 搭建web服务器

web服务器的基本功能：

1. 能够监听计算机的某个端口
2. 当客户端有请求发送过来时，能够做出相应的处理——处理请求

各种后端技术均可以搭建web服务器，同一种后端技术，搭建web服务器的方式也有多种

在`node`环境中，搭建web服务器的方式有：

1. 使用`net`或`http`内置模块进行搭建
2. 使用第三方库，如：`express`、`koa2`、`egg.js`、`nest.js`等

## 安装

安装express

```shell
npm i express
```

安装nodemon

```shell
npm i -D nodemon
//运行 npx nodemon index 不用重新运行。可以自行配置：
"scripts": {
    "start": "nodemon index"
  }
 以后直接写 npm start
```

安装postman：https://www.postman.com/downloads/

## 创建服务器并监听端口

```js
var express = require("express"); // 导入express
var app = express(); // 创建一个web服务器
app.listen(9527, function(){ // 监听端口
  console.log("server listening on 9527");
})
```

## 处理请求

```js
// 当请求方法为GET，请求的path为/news时，会交给指定的函数处理，指定的函数称之为 处理函数
app.get("/news", function(req, res){
  // req 请求对象，可以获取请求传递过来的信息
  // res 响应对象，通过该对象可以控制响应的消息内容
})
// 当请求方法为POST，请求的path为/login时，会交给指定的函数处理
app.post("/login", function(req, res){
  
})
// 动态路径。当请求方法为GET，请求的path为/news/ooo/xxx时，会交给指定的函数处理，并把ooo对应到year，把xxx对应到month，通过冒号占位
app.get("/news/:year/:month", function(req, res){
  
})
```

- `req`对象，表示请求对象（request）

  - `path`：获取请求的path
  - `method`：获取请求行中的请求方法。大部分使用，浏览器都会发出`GET`请求，`GET`请求一般不会附带请求体，所有的信息都在请求行和请求头中
  - `query`：获取请求行中的`query`
  - `headers`：获取请求头中的键值对
  - `params`：获取动态路径部分对应的值

- `res`对象，表示响应对象（response）

  - `send(data)`：设置响应体，并结束响应

  - `header(name, value)`，设置响应头中的键值对，某些键值对会影响到浏览器的行为

    - `Content-Type`：告诉浏览器，我给你的响应体是一个什么类型的数据，这个字段会触发浏览器的不同行为
      - `text/html`：浏览器会当做页面渲染
      - `image/png`：浏览器会当做`png`图片渲染
      - `application/javascript`：浏览器会当做`js`代码
      - `text/css`：浏览器会当做`css`代码
    - `Locatioin`：见`302`消息码

  - `type(ext)`，该函数可以快捷的设置`Content-Type`

    ```javascript
    res.type('.html')
    // => 'text/html'
    res.type('html')
    // => 'text/html'
    res.type('json')
    // => 'application/json'
    res.type('application/json')
    // => 'application/json'
    res.type('png')
    // => 'image/png'
    ```

  - `status(code)`，设置响应行中的消息码，不同的消息码会影响到浏览器的行为

    - `200`：正常响应
    
    - `404`：资源不存在
    
    - `302`：资源已转移到另外一个地址，另一个地址在响应头的`Location`中
    
      ```js
      res.status(302);
      res.header("Location","http://www.baidu.com");
      //或者把前两行替换为 res.redirect("http://www.baidu.com")
      
      res.send(null);
      ```
      
    

# 练习

开发一个静态资源服务器

具体要求：编写一个请求处理函数，该函数能够根据请求的路径响应某个目录中对应的文件，并把文件内容发送给客户端

```
请求：/
响应文件内容：项目路径/public/index.html

请求：/index.html
响应文件内容：项目路径/public/index.html

请求：/js/index.js
响应文件内容：项目路径/public/js/index.js
```



可能会用到的函数：

- `path.resolve`

- `path.extname(filename)`：获取某个路径的后缀名

- `fs.promises.stat(filename)`：异步函数，需要等待，获取某个文件的状态信息

  - 若文件不存在，报错

  - 返回一个状态信息对象 `stats`

    ```js
    stats.isDirectory(); // 是否是一个目录
    stats.isFile(); // 是否是一个文件
    ```

- `fs.promises.readFile(filename)`：异步函数，需要等待，获取某个文件的内容

  ```js
  var express = require("express"); // 导入express
  var app = express(); // 创建一个web服务器
  
  var path = require("path");
  var fs = require("fs");
  
  async function handler(req, res) {
    //1.get file path recording to the request path
    //if req.path is /news, here should be "+" connected
    var filename = path.resolve(__dirname, "public" + req.path);
    //2.get file status
  
  
    try {
      var stat = await fs.promises.stat(filename);
  
      if (stat.isFile()) {
        //it is a file
        var content = await fs.promises.readFile(filename);
        //set response content type
        res.type(path.extname(filename));//get file extension
        res.send(content);
  
      } else {
        //it is a directory
        //  res.path += "/index.html";
        var filename = path.resolve(__dirname, "public" + "/index.html");
        var content = await fs.promises.readFile(filename);
        //set response content type
        res.type(path.extname(filename));//get file extension
        res.send(content);
        console.log("不考虑");
  
      }
    } catch{
      //file doesn't exit
      //response 404
      res.status(404);
      res.send("not found");
    }
  
  }
  app.get("*", handler);
  app.listen(9527, function () {
    console.log("server listening on 9527");
  });
  ```

  
