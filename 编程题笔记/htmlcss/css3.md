# CSS3现状

* 浏览器支持程度差，需要加私有前缀
* 移动端支持优于PC端
* 不断改进中 css>js
* 应用相对广泛

# 属性选择器

1. E[attr]
2. E[attr=value] 严格匹配
3. E[attr*=value] 属性值包含value，例如darkred包含red
4. E[attr^=value] 属性值以value开头
5. E[attr$=value] 属性值以value结尾

# 伪类选择器

## 兄弟伪类

.first + li{} >> 类为first的标签的相邻的li元素
.first ~ li{} >> 添加了.first样式的标签的所有兄弟li元素

## 相对于父元素的结构伪类

E:first-child 查找E元素的父级元素中的第一个元素，且要为E元素
E:first-of-type 该类型第一个子元素
E:nth-child(5) nth-of-type(even/odd)
E:nth-child(-n+5) n<0无效，所以可以选择前五个
E:empty 内容为空的元素
E:target 为锚点目标元素添加元素，当目标元素被触发为锚点链接的目标时，调用此伪类样式

# 伪元素选择器

* E::before
* E::after
必须有content:""，设置宽高的话必须为块盒（display、浮动、定位）
* E::first-letter
* E:first-line
* E::selection 选中文本样式，不能设置大小

# 颜色模式

## RGB

6位16进制的数据#ffffff
rgb(255,255,255) 红绿蓝
rgba alpha表示透明度 取值0~1
opacity 会使所有的元素都透明

## HSLA
Hue  色调 0位红 120 绿 240 蓝
Saturation饱和度 0%-100%
Lightness 亮度 0%-100%
hsl(20,100%,50%)

# 文本阴影

取值：

<length>:长度值，可以是负值。用来指定阴影的延伸距离，其中X Offset是水平偏移值，Y Offset是垂直偏移值
<shadow>:阴影的模糊值，不可以是负值，用来指定模糊效果的作用距离
<color>:阴影颜色，也可以是rgba透明色

text-shadow:2px（X Offset） 3px（Y Offset） 2px（模糊半径blur） #000
可以加多个阴影 逗号隔开 

# 圆角

border-radius: 左上 右上 右下 左下
                左上 右上+左下 右下
                100px/50px 水平/垂直方向
                101px 102px 103px 104px/101px 100px 100px 100px 四个角 先水平后垂直
border-left-top-radius:

# 渐变

## 线性渐变

linear-gradient(方向(可无)，开始颜色 位置，颜色2 位置2，颜色3 位置3……)
方向 to right/0 deg;to bottom/180deg(default)
linear-gradient(to right,red 0%,red 50%,blue 50%,blue 100%)

## 径向渐变

一个点往四周变
radial-gradient（形状 大小 坐标 颜色）

- shape:circle ellipse(适配当前形状)
- size：closest-side 最近边，farthest-side 最远边 closest-Corner 最近角 默认farthest-corner
- at position:坐标，默认center，bottom top 可设置数值:at 50px 50px 

## 重复渐变

background：
径向repeating-radial-gradient(circle at center center,
#fff 0%,#fff 10%,
#000 10% #000 20%);

线性：repeating-linear-gradient(45deg,
#fff 0%,#fff 10%,
#000 10% #000 20%);

# 背景样式
新增：
从内容位置开始填充
background-origin:content-box;

内容的裁切：
background-clip:content-box;只显示内容盒

# 边框图片

border-image:url("../H5-note/img/01.jpg") 27/27px/0px round; ——url slice/width/outset repeat

border-image-slice：可以写百分比，25% 30% 15% 20% 上 右 下 左分别来一刀；fill 中间部分填充
border-image-repeat：round平铺，调整间距正好铺满个边框/repeat平铺填充，超过被截断/stretch拉伸

border-image-outset：扩大了,边框图像可超出边框盒的大小。
- 不加border: ;不生效

# 过渡

transition: property duration timing-function delay steps(4)
transition-property:left 过渡效果的样式属性名称
transition-duration：2s耗时
transition-timing-function：linear/ease慢快慢/ease-in/ease-out
transition-delay:2s

* 多个样式过渡：left 2s linear 0s,background-color 5s linear 0s;

* 为所有样式添加过渡（效率低下）：all

- 添加前缀：-moz-transition -webkit- -o-
- 不能给状态值(display)加，只能给具体值（height）加

# transform

## 2D变换

1. translate 移动
transform:translate(500px);
- 只有一个参数是x轴，俩是xy；或者translateX or translateY
- 参照元素左上角，执行完恢复原位置
* 应用：可以设置居中，定位left top：50%，translate（-50%，-50%）

2. scale 缩放
transform:scale(2,0.5)
- 只有一个参数，就x和y方向都进行等比例缩放；scaleX()
- 参照几何中心

3. rotate 旋转
rotate(30deg)
- 正顺时针 负逆时针

设置旋转中心：transform-origin：left top；

4. skew 斜切
skew(30deg)
- 只有一个指x方向，正数往当前轴的负方向斜切

* 同时添加多个transform属性
transform:rotate() translate()
transform:none;清除
前后顺序很重要，会改变坐标系

## 3D变换

1. translate3d
(x,y,z)
2. scale3d
(x,y,z)
3. rotate3d
(x,y,z,angle)
以 这个矢量 为轴 旋转

# 立方体

让子元素显示3d，在父元素设置：
transform-style:preserve-3d;

透视距离
perspective:
镜头在平面上的位置（默认元素中心）：
perspective-origin：

# 动画

关键帧动画

1. 添加动画效果：
- animation-name:指定动画名称
- animation-duration：动画总耗时
- animation-iteration-cout：播放次数 可数值或infinite
- animation-direction：来回交替alternative
- animation-delay：延迟
- animation-fill-mode:设置结束状态，默认回原始状态，forwards保留最终状态；backwards：会到初始状态（如果有delay）；both：有延迟变初始，无延迟变最终
- animation-timing-function：linear
- animation-play-state：动画的播放状态 paused暂停 running播放
2. 创建动画：
@keyframes moveTest{
    百分比是占整个动画耗时的百分比
    0%（or from）{

    }
    50%{

    }
    100%（or to）{

    }
}

# 多列布局

column-count：3 三列
column-rule:dashed 3px red
column-gap:50px 列间隙
column-width:500px 列宽 优先取大
column-span：1 or all 跨列

# 伸缩盒

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

### fle-items属性

1. **order** 排列顺序，值越小越在前，默认为0

2. **align-self** 单个元素在交叉轴的对齐方式，可覆盖align-items

3. **flex-grow**：决定如何扩展子元素。数值表示当前元素占据剩余空间的份数，默认0，即如果存在剩余空间，也不放大

4. **flex-shink**：收缩比例。数值表示当前元素收缩空间的份数，默认1，即收缩比例相同

5. **flex-basis**：决定主轴上item的大小 

   决定base size的优先级：max-width/min-height、flex-basis、width/height、内容本身的size

6. **flex**：flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto。

