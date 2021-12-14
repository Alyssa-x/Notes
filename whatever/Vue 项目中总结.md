# Vue 项目中总结

1. Vue.set(要替换的对象，索引值，新值)是响应式的，代替改变索引值的方法 this.letters[0] = "aaa"(不是响应式)，或者splice(0,1,"aa")

   Vue.set(this.letters,0,"aaa")

   v-model 绑定的是radio的value值，有了model就可以代替name来实现互斥

   v-model绑定 checkbox时，单选不写value，绑定的是布尔值，多选是选中的value数组。还可以循环绑定，：value=“item"

   默认情况下输入框内均被当做字符串类型进行处理

   修饰符lazy：失去焦点或回车时改变；number转为数字；trim去掉首尾空格 v-model.trim=""

   v-model="message"  ->  v-bind = "value"  v-on:input = " message=$event.target.value "

2. 父子组件传信息时，props在html标签里的属性不能驼峰！vue-cli可能可以

3. vue-loader 大于14的版本，需要配一个插件。如果不想下插件，可以在package.json里把他改成^13.0.0表示这个以上13-14的版本

4. Chrome V8引擎，直接将js->二进制，其他js->字节码->浏览器，node是用c++写的，基于V8引擎的运行环境

5. gitkeep文件 ：即便文件夹是空的，也要上传到git上

6. PWA progressive web app 先进的软件（功能多了，像存储，推送）阿里一些在用

7. rc结尾的文件是与终端有关，run command

8. vcs version control system （git、svg）

9. vue-cli3的很多配置通过vue-cli-service间接管理

10. source map是用于调试代码，生成.map文件

11. es6导入 文件夹，默认文件夹下的index.js、

12. vuex actions可以返回一个promise

## 配置

1. 修改路径别名，vue-cli2中有webpack.config.js，cli3中无，需自己新建vue.config.js。已经有默认别名``@ => src  ``

   ```js
   module.exports = {
       configureWebpack：{
   		resolve：{
       		allias:{'assets':'@/assets'}
   		}
   	}
   }
   ```

2. .editorconfig 文件规定缩进等代码格式

3. 

# 待办

搞清楚vue各版本的不同，vue-cli

vue-cli4 在dom中使用别名，需在别名前添加~来识别

vue-cli4 修改别名：链式调用

```js
const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"))
      .set("assets", resolve("./src/assets"))
      .set("views", resolve("./src/views"))
      .set("common", resolve("./src/common"));
 
  }
};
```

vue中vscode自带的emmet插件失效，在setting.json里编辑代码

```js
"emmet.syntaxProfiles": {
        "vue-htmo": "html",
        "vue": "html"
 },
```

具名插槽的使用：

slot=“item-icon” 改为包含在<template v-slot:item-icon>

jsonp语法：href="<%= BASE_URL %>favicon.ico"，`<%= BASE_URL %>`动态获取文件路径

