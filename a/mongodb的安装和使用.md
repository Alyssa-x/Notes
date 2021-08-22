# 数据库

数据库（DB）是一种数据持久化的技术

它分为三大类，分别是：

- 关系型数据库：mysql、sqlserver、oracle等
- **非关系型数据库**：mongodb、redis等
- 面向对象数据库：db4o



非关系型数据库的特点：

- 大量数据的存取速度快
- 使用简单，学习成本低
- 难以表达复杂的数据关系



> 非关系型数据库又分为很多子类别，mongodb是非关系型数据库中的**文档型**数据库



# mongodb的安装

mongodb：https://www.mongodb.com/zh

robo 3T：https://robomongo.org/



# 核心概念

- db：数据库
- `collection`：集合，类似于js中的数组
- `document`：每个集合中的文档，类似于js中的对象
  - `Primary Key`：主键，每个文档的唯一编号
  - `field`：文档中的字段，类似于对象中的属性

<img src="http://mdrs.yuanjin.tech/img/image-20200521170211855.png" alt="image-20200521170211855" style="zoom:50%;" />

# 在node中使用mongodb

## 安装mongoose

```
npm i mongoose
```

## 创建连接

```js
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true); // 新版本对索引的处理方式有所变化，无此代码会有警告
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true, // 新版本对连接字符串的解析有更好的支持，无此代码会有警告
  useUnifiedTopology: true, // 新版本对数据库的监事引擎有更好的支持，无此代码会有警告
});

mongoose.connection.on("open", () => {
  console.log("连接已打开");
});
```

任何数据库操作，都必须建立在连接通道之上，因此，操作数据库必须要有数据库连接

<img src="http://mdrs.yuanjin.tech/img/image-20200525140022920.png" alt="image-20200525140022920" style="zoom:50%;" />


## 定义Schema和Model

`Schema`组成`Model`，`Model`对应`mongodb`中的文档

比如，我们数据库中需要保存两种模型，分别是`用户`和`新闻`

```js
// user
{
  loginId: "xxxx", // 登录账号
  loginPwd: "xxxx", // 登录密码
  name: "xxxx", // 用户姓名
  age: 18, // 用户年龄
  role: "xxx" // 用户角色：管理员、普通用户、VIP 之一
}

// news
{
  title: "", // 新闻标题
  content: "", // 新闻内容
  pubDate: xxx, // 新闻发布日期
  channel: "", // 新闻频道
  link: "" // 新闻原始链接地址
}
```

我们需要先对其进行`Schema`定义，然后通过`Schema`定义模型

<img src="http://mdrs.yuanjin.tech/img/image-20200525145347687.png" alt="image-20200525145347687" style="zoom:50%;" />

### 用户

```js

//定义结构
var userSchema = new mongoose.Schema({
  loginId: {
    type: String,
    required: true,//必填
    unique: true,//属性值唯一
    trim: true,//写入数据时会自动去掉首尾空格
    minlength: 3,//约束：字符串最小长度为3
    maxlength: 18,//约束：字符串最大长度为18
  },
  loginPwd: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 18,
    select: false,//后续对用户进行查询时，默认不要查询密码
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 10,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["管理员", "普通用户", "VIP"],//用户角色是个字符串，只能从这三个里取值
  },
});

//定义模型
var User = mongoose.model("User", userSchema); //User为模型名，就是集合的名字

```



### 新闻

```js
var newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  pubDate: {
    type: Date,
    required: true,
    default: Date.now, 默认值，此处为函数（函数返回值作为默认值）
  },
  channel: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

var News = mongoose.model("News", newsSchema);
//操作数据库时，使用模型进行操作 Users News
```



## CRUD

CRUD（Create, Retrieve, Update, Delete）简称为增删改查，是对数据库最基本的操作

### 新增

```js
模型.create(对象)
```

- 对象可以是单个对象或者是数组
- 该操作是异步的，可以使用 回调函数 或ES7的`await`关键字得到新增的结果
- 新增的对象会自动添加两个属性
  - `_id`：自动生成，用于表示文档的主键，全球唯一,时间戳+mac地址+
  - `__v`：自动生成，用于表示文档的版本，内部维护，不需要开发者处理

```

// models.Users.create(
//     {
//         loginId: "abc",
//         loginPwd: "123123",
//         name: "luzhan",
//         age: "23",
//         role: "普通用户",
//     },
//     function (err, result) {
//         if (err) {
//             conosle.log(err);
//         } else {
//             console.log(result);
//         }
//     }
// );

//await必须在标记为async的函数中
async function test() {
    try {
        var result = await models.Users.create({
            loginId: "def",
            loginPwd: "123123",
            name: "minxuanzi",
            age: "22",
            role: "普通用户",
        });
        console.log(result);
    }catch(err){
         console.log(err);
    }
}
test();
```



### 查询

```js
模型.findById(id); // 根据id字符串查询单个文档，查到返回一个**数组**，若查找不到，则返回null
```

```js
模型.find(filter, [projection], [options]); // 根据条件、投影、配置 进行查询
```

- `filter`

  - 过滤条件对象

  - `api`极其丰富

  - 下面是一些常见`filter`写法

    ```js
    // 查询所有 channel="财经焦点" 的新闻
    {
      channel: "财经焦点" 
    }
    
    // 查询所有 channel="财经焦点" 并且 title 包含 中国 的新闻
    {
      channel: "财经焦点", 
      title: /中国/  ++
    }
    
    // 查询所有 channel="财经焦点" 或者 title 包含 中国 的新闻
    {
      $or: [
        {
          channel: "财经焦点",
        },
        {
          title: /中国/,
        },
      ],
    }
      
    // 查询所有 发布日期 大于等于 昨天此时 的新闻
    // $gt 大于  $gte 大于等于  $lt 小于 $lte 小于等于   $ne 不等于 
    // $in 其值在某个数组中  $nin 其值不在某个数组中
    {
      pubDate: {
        $gte: Date.now() - 3600 * 24 * 1000,
      }
    }
    ```

- `projection`

  - 可选参数

  - 字符串

  - 表示在查询结果中进行投影（获取想要的字段）

    ```js
    // 仅查询_id、title、pubDate
    "title pubDate"
    
    // 除了 content 都要查询
    "-content"
    ```

- `options`

  - 可选参数

  - 对象

  - 一些额外的配置

    ```js
    // 跳过结果中的 5 条数据，取 6 条
    {
      skip: 5,
      limit: 6,
    }
      
    // 按照发布日期的降序排序
    {
      sort: "-pubDate"
    }
    ```



```js
模型.countDocuments(filter); // 获取指定条件的数量
```



### 更新

```js
模型.updateOne(filter, doc); // 更新单个文档
模型.updateMany(filter, doc); // 更新多个文档
```

- `filter`：条件，和查询中的`filter`含义和用法完全一致
- `doc`：新的文档，新文档中的属性会覆盖旧文档中的对应字段{channel : "财经焦点"，}



### 删除

```js
模型.deleteOne(filter); // 删除单个文档
模型.deleteMany(filter); // 删除多个文档
```



# 练习

编写下面两个模块，实现对应的函数



## userService模块

```js
// 注册一个用户
// userObj：用户对象
// 返回：新注册的用户对象
exports.reg = async function(userObj){
  
}

// 登录
// loginId: 账号
// loginPwd: 密码
// 返回：登录成功返回用户对象，登录失败返回null
exports.login = async function(loginId, loginPwd){
  
}

// 查找用户
// id: 用户的唯一编号
// 返回：用户对象，用户不存在返回null
exports.getUser = async function(id){
  
}
```



## newsService模块

```js

// 查询新闻，按照发布日期降序排序
// page: 页码
// limit: 页容量
// keyword: 关键字，标题、内容、频道包含该关键字均可
// 返回：查询结果对象 {  total: 总数据量,  datas: 新闻数组 }
exports.getNews = async function(page, limit, keyword){
  
}

```
