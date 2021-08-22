# @规则 at-rule

@规则、@语句、css语句、css指令

1. import

@import “路径” 
在css里导入另一个的css文件

2. charset
@charset “utf-8"

tell 浏览器该css文件使用的字符编码集是utf-8，必须写到第一行


# 居中总结

盒子在其包含块中居中

## 行盒（行块盒）水平居中

父元素 text-align：center

## 常规流块盒水平居中

定宽，左右margin为auto

## 绝对定位元素的水平居中

定宽，设置左右的坐标left right为0，将margin为auto
> 固定定位是绝对定位一种特殊情况，包含块为视口

（浮动水平居中只能margin左or右 手动调，css3有）

## 单行文本的垂直居中

line-height为height，文本所在元素的行高，为整个区域的高度

## 行块盒or块盒内多行文本的垂直居中

没有完美方案

设置盒子上下内边距相同，达到类似的效果。

## 绝对定位的垂直居中

定高，设置上下的坐标top bottom为0，margin为auto 0


# web字体和图标

## web字体

用户电脑上没有安装相应字体，强制让用户下载该字体

使用@font-face制作一个新字体,ttf文件从网上下载，但只能指定的文本内容

@font-face{
    font-family:"good";//名称
    src：url("./font/good.ttf");
}
<img src="webfont.png">

使用该字体：
.{
    font-family:"good";
 
}

## 字体图标

iconfont.cn
font class方式：复制代码，link引用，同时i元素，class=“iconfont 复制的名字”
Unicode方式：自己写.iconfont{} <i class="iconfont">复制实体</i>

# 块级格式化上下文

Block Formatting Context，BFC
它是一块独立的渲染区域，它规定了在该区域中，常规流块盒的布局

常规流块盒在水平方向上，必须撑满包含块（总宽度）
在包含块的垂直方向上依次摆放
若外边距无缝相邻，则进行外边距合并
自动高度和摆放位置，无视浮动+绝对定位元素

- 渲染区域：
这个区域由某个HTML元素创建，以下元素会在其内部创建BFC区域：

* 根元素 <html>
* 浮动和绝对定位元素
* overflow不等于visible的块盒（副作用最小hidden）

- 独立的
不同的BFC区域，它们进行渲染时互不干扰；创建BFC的元素，隔绝内部和外部联系

创建BFC的元素，它的自动高度要计算浮动的高度（代替clearfix拯救高度坍塌）；
它的边框盒不会与浮动元素重叠（排列时能看到浮动 会避开）；
不同的BFC内的元素外边距不会合并


# 布局

## 多栏布局

两栏布局
三栏布局

## 等高

1. CSS3的弹性盒
2. JS控制
3. 伪等高 高度很大很大，margin-bottom负数，高度实际不高，然后overflow hidden

## 元素书写顺序

要是要求一定把主区域写在前面，那就把aside绝对定位，不再用bfc


# 行盒的垂直对齐

## 多个行盒垂直方向上的对齐

给没有对齐元素设置vertical-align

预设值：middle中间对齐 bottom top text-top
数值

## 图片的底部白边

图片的父元素是块盒，块盒高度自动，图片底部与父元素底边之间往往会出现空白。
1. 设置父元素的font-size为0，但里面文字会受影响
2. 将图片设置为块盒


# 堆叠上下文

# 浏览器兼容性

## 问题产生原因

- 市场竞争
- 标准版本的变化


