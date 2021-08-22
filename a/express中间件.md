# express中间件模型

在某些场景中，对请求的处理可能会经过多个步骤，比如：日志记录、安全验证、权限验证、业务处理，为了分割这些不同的处理，express提供了中间件的模型



<img src="http://mdrs.yuanjin.tech/img/中间件示意图.jpg" alt="中间件示意图" style="zoom:50%;" />

每个中间件本质上就是一个处理函数，通过`app.use`注册

```js
app.use(function(req, res, next){
  console.log("中间件1的处理");
  next(); //交给下一个匹配的中间件
})
// 注意：use中的路径匹配的是基路径，下面的处理函数可以匹配所有以 /news 开头的路径
app.use("/news", function(req, res, next){
  console.log("中间件2的处理");
	next(); //交给下一个中间件
})

app.use("/login", function(req, res){
  console.log("中间件3的处理，不再往后移交");
})
```

当我们访问`/news/123`时，请求会依次交给`中间件1`、`中间件2`

当我们访问`/login/xxxx`时，请求会依次交给`中间件1`、`中间件3`

这样一来，我们就可以把一些通用的逻辑写成中间件，使用`app.use`注册即可

# 常用中间件

express给我们制作了一些常用的中间件，通过注册这些中间件，可以轻松实现一些通用功能

## express.static

```js
// 该函数返回一个中间件
// 它将指定的目录作为静态资源目录
// 当访问服务器时，该中间件会通过 path 对应该目录中的文件
// 如果能够找到文件，则直接响应文件内容，不再向后移交
// 若无法找到文件，向后移交
express.static(dir);
```

使用示例：

```js
app.use(express.static(path.resolve(__dirname, "public")))
```

## express.urlencoded

```js
// 该函数返回一个中间件
// 如果它发现请求头中的 content-type 的值是 application/x-www-form-urlencoded
// 则会把请求体中的内容解析为一个对象，保存到 req.body 中，然后向后移交
// 否则，直接向后移交
express.urlencoded();
```

使用示例：

```js
// 使用配置 {extended: true}，避免报出警告
app.use(express.urlencoded({extended: true}));
```

## express.json

```js
// 该函数返回一个中间件
// 如果它发现请求头中的 content-type 的值是 application/json
// 则会把请求体中的内容解析为一个对象，保存到 req.body 中，然后向后移交
// 否则，直接向后移交
express.json();
```

使用示例：

```js
app.use(express.json());
```

## express.Router

```js
// 该函数返回一个中间件，称之为路由中间件
var router = express.Router();

// 匹配 GET 基路径/
router.get("/", function(req, res){
  
})
// 匹配 GET 基路径/a
router.get("/a", function(req, res){
  
})
// 匹配 POST 基路径/
router.post("/", function(req, res){
  
})
// 当基路径为 /api/user 时，交给该路由处理
// 如果路由没有命中，则它会自动往后移交
app.use("/api/user", router);
```

使用路由中间件处理请求更加有助于模块拆分，新建一个文件夹routes，

# 服务器的职责

在不同的场景下，服务器有着不同的职责，极其灵活

很多的中小型系统，一个服务器往往承担着两个职责：

- 提供静态资源
- 提供api接口

<img src="http://mdrs.yuanjin.tech/img/image-20200527131821014.png" alt="image-20200527131821014" style="zoom:50%;" />

我们可以来看一个经典的场景，以梳理服务器和浏览器之间的交互

<img src="http://mdrs.yuanjin.tech/img/image-20200527132657593.png" alt="image-20200527132657593" style="zoom:50%;" />

# 练习

1. 用`express`搭建静态资源服务器，并将给予的`静态页面`目录中的内容作为静态资源放到服务器中

   file path

2. 用`express`路由开发`api`接口，规则如下
   1. 针对`用户`的操作
      1. 登录，`POST /api/user/login`，消息体中传递账号和密码
      2. 注册，`POST /api/user/reg`，消息体中传递注册信息，新注册的用户必定为普通用户
   2. 针对`新闻`的操作
      1. 分页获取新闻，`GET /api/news`，`query`中**可能**传递`page`和`limit`

3. 开发静态资源中的`/js/practice.js`，想想静态资源中的js是在哪一端运行的，然后补全该文件中下面的函数：
   1. `getNews`
   2. `reg`
   3. `login`

