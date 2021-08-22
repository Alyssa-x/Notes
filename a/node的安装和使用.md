# node环境概述

浏览器环境 VS node环境

<img src="http://mdrs.yuanjin.tech/img/image-20200520151507426.png" alt="image-20200520151507426" style="zoom:50%;" />

由于**api不同**，它们能够实现的功能不同：

- 浏览器api：提供有限的功能，主要用于操作浏览器窗口（BOM）和页面中的元素（DOM）
- node api：提供非常完整的功能，包括但不仅限于：文件处理、进程控制、网络通信

从**使用场景**看：

- 浏览器中的JS：提高用户体验
- node中的js（nodejs）：提供web服务

它们的**关系**：

<img src="http://mdrs.yuanjin.tech/img/image-20200520152758435.png" alt="image-20200520152758435" style="zoom:50%;" />

它们的**共同点**：都能执行ES标准的语言



# node的安装

下载地址：https://nodejs.org/zh-cn/

安装好后，在终端中查看node版本

```shell
node -v
```

安装`node`时，会自动安装`npm`，可在终端中查看`npm`版本

```shell
npm -v
```



# 编写node程序

略

# 认识node的全局对象global

- global.console
- global.setTimeout
- global.setInterval

# 认识CommonJS

CommonJS规范内容：

1. 一个js文件就是一个模块
2. 模块内所有的变量均为局部变量，不会污染全局
3. 模块中需要提供给其他模块使用的内容需要导出
4. 导出使用`exports.xxx = xxx`或`module.exports=xxx`或`this.xxx=xxx`
5. 其他模块可以使用`require("./index");`函数导入,先运行一遍再导入



node实现了CommonJS规范，它的实现原理是通过`require`把每个模块的内容放到函数环境中执行：

```js
// 下面是伪代码
function require(modulePath){
  // modulePath 为模块路径
  var moduleId = getModuleId(modulePath); // 获取模块的绝对路径
  if(cache[moduleId]){
    // 是否有缓存
    return cache[moduleId];
  }
  // 没有缓存
  
  // 该函数用于执行一个模块
  function execModule(module, exports, __dirname, __filename，require){//顺序不对
    // module 用于导出的对象
    // exports 用户导出的对象
    // 导入的模块所在目录的绝对路径
    // 导入的模块的绝对路径
    
    这里是导入的模块的代码
  }
  
  var module = { 
    exports: {} 
  };
  execModule.call(
    module.exports, 
    module, 
    module.exports, 
    模块目录绝对路径（到文件夹名）, 
    模块绝对路径（到js名）
    );
  cache[moduleId] = module.exports; // 缓存结果
  return module.exports;
}
```



**模块的查找**

1. 模块路径以`./`或`../`开头：从当前模块路径出发查找
2. 模块路径不是以`./`或`../`开头
   1. 看是否是内置模块
   2. 看是否在`node_modules`目录中，文件优先，没文件找同名文件夹下的index.js



**省略**

如果模块路径中省略了后缀名，则认为后缀名是`.js`

如果模块路径中省略了文件名，则认为文件名是`index.js`



# npm的使用

```shell
npm config set registry http://registry.npm.taobao.org/ # 配置npm安装源，加速下载
npm init # 使用npm初始化，生成package.json(里面dependencies记录着安装的第三方库的版本)(npm init -y)
npm i 第三方库的名称 # 安装第三方库
npm i # 按照package.json的记录 安装第三方库
npm i -D 第三方库的名称 # 使用 开发依赖 的方式安装第三方库
npm i --production # 按照package.json的记录安装第三方库，但不安装devDependencies
```

> 为了让`vscode`更好的对`node`代码进行智能提示，建议安装开发依赖`@types/node`

普通依赖："dependencies": {
    "lodash": "^4.17.15",
    "vue": "^2.6.11"
  }
开发依赖：npm i -D @types/node,则package.json里
"devDependencies": {
    "@types/node": "^14.0.5"
  }

开发时需要的东西，打包后运行时不需要


# 内置模块 path

不需要安装就有，用require导入
```js
var path = require("path");
path.resolve(...pathsegments)
path.resolve("./sub","a.js");
path.resolve("__dirname","sub/a.js")
```

该函数可以将多个路径片段合并为一个完整的绝对路径

注意，片段中的`./`和`../`相对的是`工作目录`，即当前运行的目录



# 内置模块fs

```js
fs.readFile(path, callback)
```

读取指定文件的内容