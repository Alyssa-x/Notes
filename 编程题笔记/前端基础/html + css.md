# html + css

# 行内 块级元素

常见的行内元素有 a b span img strong sub sup button input label select text area

常见的块级元素有  div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p 
（1） 格式上，默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
（2） 内容上，默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。
（3） 行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响。

## 1. 两栏布局

左侧固定宽度，右侧自适应

```html
<div class="wrap">
    <div class="left">
        左侧固定宽度
    </div>
    <div class="right">
        右侧内容自适应
    </div>
</div>
```

1. 浮动 左边元素宽度设置好，向左浮动。设置右边margin-left为宽度。

```html
* {
    margin: 0;
    padding: 0;
    }
    .wrap{
      overflow: hidden;
      border: 1px solid red;
    }
    /*脱离文档流*/
    .left{
      float: left;
      width: 200px;
      height: 200px;
      background-color: pink;
    }
    .right{
      margin-left: 200px;
      background-color: skyblue;
      height: 200px;
    }
```

2. 左边绝对定位，左边设置为 absolute，宽度设置为200px。右边 margin-left 设置 200px。

```html
	.wrap{
      overflow: hidden;
      border: 1px solid red;
      position: relative;
    }
    /*脱离文档流*/
    .left{
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      height: 200px;
      background-color: pink;
    }
    .right{
      margin-left: 200px;
      background-color: skyblue;
      height: 200px;
    }
```

3. 右边绝对定位, 左边元素宽度设置为 200px，右边元素设置为绝对定位，左边定位为 200px，其余方向定位为 0。

```html
	  .wrap {
        position: relative;
        height: 100px;
      }
      .left {
        position: absolute;
        width: 200px;
        height: 100px;
        background: tomato;
      }
      .right {
        margin-left: 200px;
        height: 100px;
        background: gold;
      }
```

3. 表格布局，父元素display设置为table，子元素为table-cell，不设置高度两边也一样高
```html
	.wrap{
      display: table;
      width: 100%;
    }
    /*表格布局*/
    .left{
      display: table-cell;
      width: 200px;
      height: 200px;
      background-color: pink;
    }
    .right{
      display: table-cell;
      background-color: skyblue;
      height: 200px;
    }
```

4. flex布局,不设置高度两边也一样高。

```js
.wrap {
    display: flex;
}
.left {
    height: 200px;
    background: purple;
    flex:0 0 200px
    /*flex-shrink flex-grow flex-basis*/
}
.right {
    background: skyblue;
    height: 200px;
    flex: 1;
    /*1 1 auto*/
}
```

4. calc()函数 只有定高才行，垃圾

```html
	.wrap{
      overflow: hidden;
      border: 1px solid red;
    }
    /*双浮动*/
    .left{
      float: left;
      width: 200px;
      height: 200px;
      background-color: pink;
    }
    .right{
	  float: left;
      width:calc(100%-200px)
      background-color: skyblue;
      height: 200px;
    }
```

## 2. 三栏布局

左右两栏宽度固定，中间自适应

1. 两侧绝对定位，中间设置左右margin；左右浮动，中间设置absolute定位，left right值为左右宽度

```js
      .container {
        position: relative;
        height: 100px;
      }
      .left {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        background: tomato;
      }
      .right {
        position: absolute;
        top: 0;
        right: 0;
        width: 200px;
        height: 100px;
        background: gold;
      }
      .center {
        margin-left: 100px;
        margin-right: 200px;
        height: 100px;
        background: lightgreen;
      }
	/*左右浮动，中间absolute。但center必须放最后*/
      .container{
        position: relative;
        overflow: hidden;
      }
      .left{
        width: 200px;
        float: left;
      }
      .right{
        width: 200px;
        float: right;
      }
      .center{
        position: absolute;
        top: 0;
        left: 200px;
        right: 200px;
      }
```

2. flex布局

```html
/* center 标签要放在中间，左右两栏放大缩写比例都为0，基础大小固定，中间auto*/
.container {
  display: flex;
  height: 100px;
}
.left {
  flex: 0 0 100px;
  background: tomato;
}
.right {
  flex: 0 0 200px;
  background: gold;
}

.center {
  flex: auto;
  background: lightgreen;
}
/*flex-shrink缩小比例，默认为1.如果空间不足时，有0和1，为0的不收缩。设置order可以控制DOM摆放顺序，center可不放中间*/
.container {
  display: flex;
}
.center {
  background-color: red;
  width: 100%;
  order: 2;
}
.left {
  background-color: green;
  width: 200px;
  flex-shrink: 0;
  order: 1;
}
.right {
  background-color: blue;
  width: 200px;
  flex-shrink: 0;
  order: 3;
}
```

3. 圣杯布局。 center要放前面，给父元素设置padding留出两侧位置，刚开始 left 和 right 被相对于父元素`container`宽度的`100%`的 center 挤到下面。给 left 设置`margin-left: -100%`浮动到 center 上面，因为覆盖了center所以左移。圣杯布局中间列的宽度不能小于两边任意列的宽度

```html
.container{
	overflow: hidden;
	padding:0 200px;
}
.container > div{
	position: relative;
	float: left;
	height: 100px;
}
.center{
	width:100%;
}
.left{
	width:200px;
	margin-left:-100%;
	left:-200px;
}
.right{
	width:200px;
	margin-left:-200px;
	right:-200px;
}
```

4. 双飞翼布局。center里面加一个`main`，设置main的margin来代替父元素的padding来给两侧留位置。就不用平移left或right。圣杯布局中间列的宽度不能小于两边任意列的宽度，而双飞翼布局则不存在这个问题。

```html
	  .container {
        overflow: hidden;
      }
      .container > div {
        position: relative;
        float: left;
        height: 100px;
      }
      .main{
        margin: 0 200px;
        height: 100%;
        overflow: hidden;
      }
      .center {
        width: 100%;
        background: lightgreen;
      }
      .left {
        width: 200px;
        margin-left: -100%;
        background: tomato;
      }
      .right {
        width: 200px;
        margin-left: -200px;
        background: gold;
      }
```

## 3. 三角形

利用边框连接处的等分原理

```js
.triangle {
        width: 0;
        height: 0;
        border-width: 100px;
        border-style: solid;
        border-color: transparent transparent tomato transparent;
    /*or 不等边三角形*/
    border: 50px solid transparent;
    border-bottom: 100px solid tomato;
      }
   /*左上三角形*/
.triangle-topleft {
     width: 0;
     height: 0;
     border-top: 100px solid red;
     border-right: 100px solid transparent;          
 }
```

## 4. 圆形 椭圆形

```js
width: 100px;
        height: 100px;
        background: red;
        -moz-border-radius: 50px;
        -webkit-border-radius: 50px;
        border-radius: 50px;
```

```js
/*椭圆 长宽不一样*/	 
	 width: 200px;
     height: 100px;
     background: red;
    -moz-border-radius: 100px / 50px;
    -webkit-border-radius: 100px / 50px;
    border-radius: 100px / 50px;
```

## 5. 宽高自适应的正方形

```css
/*1.第一种方式是利用vw来实现*/
.square {
  width: 10%;
  height: 10vw;
}

/*2.第二种方式是利用元素的margin/padding百分比是相对父元素width的性质来实现*/
.square {
  width: 20%;
  height: 0;
  padding-top: 20%;
}

/*3.第三种方式是利用子元素的margin-top的值来实现的*/
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}

.square::after {
  content: '';
  display: block;
  margin-top: 100%;
}

```

利用width，padding，margin的百分比是相当于父元素的宽度

## 6. vw vh vm

1 vw = 视口宽度 * 1%

1 vh = 视口高度 * 1%

vm ：min{vw，vh}

视口：桌面端浏览器的可视区域，移动端是layout view（屏幕大小）

### em， rem

em: 相当于自身的font-size，自身会继承父元素

rem：相当于根元素html的font-size

https://www.jianshu.com/p/82f02af17e78

# 7. BFC规范

```
根元素或包含根元素的元素
（2）浮动元素float＝left|right或inherit（≠none）
（3）绝对定位元素position＝absolute或fixed
（4）display＝inline-block|flex|inline-flex|table-cell或table-caption
（5）overflow＝hidden|auto或scroll(≠visible)
```

它的自动高度要计算浮动的高度（代替clearfix拯救高度坍塌）；
它的边框盒不会与浮动元素重叠（排列时能看到浮动 会避开）；
不同的BFC内的元素外边距不会合并

# 8. 回流（重排） 重绘

opacity 如果元素提升为合成层，就不会重绘

布局改变，回流

外观，风格改变，不影响布局，重绘

# 9. 清除浮动

```
（1）使用clear属性清除浮动。伪元素的方式清除浮动
.clear::after{
content:'';
display:table;//也可以是'block'，或者是'list-item'
clear:both;
}

（2）使用BFC块级格式化上下文来清除浮动，父元素添加
```

# 10. 元素选择器

```
第一个等级是行内样式，为1000，第二个等级是id选择器，为0100，第三个等级是类选择器、伪类选择器和属性选择器，为0010，第四个等级是元素选择器和伪元素选择器，为0001
```

# 11. 伸缩盒

设置父元素，子元素变为弹性项（flex items）
display：flex

### flex-container属性

1. **flex-direction**：主轴方向
   row / column / row-reverse / column-reverse

2. **justify-content**:主轴方式上的对齐方式

   flex-start（与main start对齐）/ flex-end （main end）/ center （居中对齐）/space-between（与main start、end两端对齐，items之间距离相等）/space-evenly（items之间距离相等，与main start、end距离等于items之间距离）/space-around（所有margin一样，与main start、end距离等于items之间距离的一半）

3. **align-items**：在交叉轴上的对齐方式

   normal（同stretch） / stretch（size为auto时无高度则拉伸） / baseline（基线对齐 英文字母a下边） / flex-start / flex-end / center

   注意：多行文本基线对齐时，行盒基线对齐是基于最后一行文本，弹性盒中基线是第一行文本

4. **flex-wrap**:控制子元素是否换行

   nowrap（默认不换行）/ wrap（换行） / flex-reverse（交叉轴反转）

5. **flex-flow**：flex-direction和flex-wrap的简写形式

   e.g. flex-flow:row wrap

6. **align-content** 多行items 在 交叉轴的对齐方式

   stretch / 其余与justify-content相同

### flex-items属性

1. **order** 排列顺序，值越小越在前，默认为0

2. **align-self** 单个元素在交叉轴的对齐方式，可覆盖align-items

3. **flex-grow**：决定如何扩展子元素。数值表示当前元素占据剩余空间的份数，默认0，即如果存在剩余空间，也不放大

4. **flex-shink**：收缩比例。数值表示当前元素收缩空间的份数，默认1，即收缩比例相同

5. **flex-basis**：决定主轴上item的大小 

   决定base size的优先级：max-width/min-height、flex-basis、width/height、内容本身的size

6. **flex**：flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto。=1 -> 1 1 auto

# 12. position

```
relative定位的元素，是相对于元素本身的正常位置来进行定位的。

absolute定位的元素，是相对于它的第一个position值不为static的祖先元素的padding box来进行定位的。这句话我们可以这样来理解，我们首先需要找到绝对定位元素的一个position的值不为static的祖先元素，然后相对于这个祖先元素的padding box来定位，也就是说在计算定位距离的时候，padding的值也要算进去。
```

# 13.

1. overflow:hidden; //超出的文本隐藏
2. text-overflow:ellipsis; //溢出用省略号显示
3. white-space:nowrap; //溢出不换行

```
display: -webkit-box; 
    overflow: hidden; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical; 
```

# 14. href src

src(Source)是指向物件的来源地址，是引入，在 img、script、iframe 等元素上使用； href(Hypertext Reference)是超文本引用，指向需要连结的地方，是与该页面有关联的，是引用，在 link和a 等元素上使用。src通常用作“拿取”（引入），href 用作 "连结前往"（引用）

在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部。但是当浏览器解析到href资源时，会识别该文档为css文件，会下载并且不会停止对当前文档的处理`

# 15.盒模型

```
盒模型都是由四个部分组成的，分别是margin、border、padding和content。

标准盒模型和IE盒模型的区别在于设置width和height时，所对应的范围不同。标准盒模型的width和height属性的
范围只包含了content，而IE盒模型的width和height属性的范围包含了border、padding和content。

一般来说，我们可以通过修改元素的box-sizing属性来改变元素的盒模型。
```

# 16. css 工程化

预处理器： sass，less， stylus

后处理器

clean-css -- 压缩 CSS
AutoPrefixer -- 自动添加 CSS3 属性各浏览器的前缀
Rework -- 取代 stylus 的插件化框架
PostCSS  解析 CSS 的核心工具，更包括它创建的插件系统

https://juejin.cn/post/6844903536254255112

# 17. 元素到窗口距离

Element.getBoundingClientRect()方法返回一个对象，对象上有属性 left top width

元素的大小及其相对于视口的位置。

# 18. textContent

Node.textContent 表示一个节点及其后代的文本内容

