# Vue中，vue-cli2与vue-cli3以上版本配置别名alias的区别



## 为什么配置别名

在vue项目中，经常需要引入各种文件，此时文件路径会变得很复杂，经常出现多个``../../``，很容易出错。所以我们通常配置别名alias来代替这种书写方式。



## vue-cli2

vue-cli2.x版本可以直接在build文件夹中的webpack.base.conf.js文件中修改

```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
```

## vue-cli3以上

由于vue-cli3以上版本创建项目时，不再有build和config文件夹，所以需自己手动新建一个vue.config.js，用**chainWebpack 方法**配置

```js
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
// 项目的主要配置文件
module.exports = {
    chainWebpack: (config) => {
        //修改文件引入自定义路径
        config.resolve.alias
            .set('@', resolve('src'))//其实vue-cli默认src的别名为@
            .set('style', resolve('src/assets/style'))
    }
}
```



这样，下次在导入文件时，如果文件路径有`src/assets/style`就可以直接别名`style`来替换。

**注意**在dom中引用文件时，别名前需加`~`，例如

```js
<img src="~style/icon.jpg">
```

