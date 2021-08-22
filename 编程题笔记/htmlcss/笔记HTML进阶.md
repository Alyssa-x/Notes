# iframe元素

框架页
用于在网页中嵌入其他页面

可替换元素

1. 通常行盒
2. 通常现实的内容取决于元素的属性
3. css不能完全控制其中的样式
4. 有行块盒的属性

target=“myframe” iframe加个name属性，a元素在当前页面打开

# 在页面中使用flash

.swf 后缀名

object ： data属性——资源地址  type属性——MIME的值（application/x-shockwave-flash)  可加子元素 param标签：name=“quality” value=“high”属性——参数

embed： src属性 type  直接写quality=“high”，无子元素

这两者为了兼容

object
    param
    embed 若object可以，它不能有别的子元素，则embed不运行
object

均可替换元素
MIME（multipurpose Internet Mail Extension）

多用途互联网邮件类型


# 表单元素

## input元素

输入框

- name属性，值相同时radio互斥，只能选一个，提交到服务器后的表单数据进行标识，在提交时name作为key提交的
- type属性： 
  text
  password
  date
  search搜索框
  number数字输入框（min max step）
  checkbox多选框
  radio单选框（加相同name)，默认选中者加checked
  range滑块
  color颜色选择框（冒号快捷键）
  file,属性onchange，multiple
- input（输入值后触发）等等
- value 默认显示值
- placeholder 默认显示 点击消失；更改样式(::placeholder)

制作按钮：type为 reset button submit

## select元素

- 下拉列表选择框
```
<select>
<option>成都</option>
<option selected>北京</option>
</select>
```
- 分组的下拉列表
```
<select>
<optgroup label="城市“>
<option>成都</option>
</optgroup>
</select>
```

- 多选 select加multiple布尔属性

## textarea元素

文本域，多行文本框
可设置宽高

## 按钮元素

button默认提交按钮
里面可以加img等元素

## 表单状态

readonly属性：布尔属性，只读
disabled属性：布尔，禁用，会改变表单显示样式，css里这样写button:disabled

## 配合表单元素的其他元素

### label

普通元素，通常配合单 多选框使用，里面不能加div只能span

- 显示关联

字也能点
for属性写表单元素id

```
<input id="radMale" name="gender" type="radio">
<label for="radMale"> 男</label>
```
- 隐士关联
```
<label>
<input name="gender" type="radio">
        男
</label>

```

### datalist
数据列表。下拉提示

input list属性与其id属性关联
里面写option，带value属性

### form元素

通常将整个表单元素，放置form元素的内部，作用是当提交表单时，会将form元素内部表单内容以合适的方式提交到服务器

action属性为提交给谁
method属性为提交方式， GET/POST

表单内内容要写name

### fieldset

表单分组，就是一个框框
可以加一个子元素 legend 作标题


# 美化表单元素

## 新的伪类

1. focus

元素聚焦时的样式。浏览器默认加了outline外边框，可以改变outline-offset偏移量
tab键切换聚焦顺序，改变tabindex=“2”

2. checked

单选或多选框被选中的样式。
改变选项字的样式
```
input:checked+label{}
```

## 常见用法

1. 重置表单元素样式
```
input,textarea,button{
    border:none;
}
input:focus,textarea:focus,button:focus{
    outline:none;
    outline-offset:0;
}
```
选中单行文本框，用属性选择器input[type="text"]

2. 设置多行文本框是否允许调整尺寸

css属性resize：both/none/horizontal/vertical

3. 文本框边缘到内容的距离

方式1：padding：0 10px
方式2：text-indent：1em 首行缩进

4. 控制单选和多选的样式

做出选项的样式：
```
画圆圈
.radio{
    width:12px;
    height:12px;
    border:1px solid #999;
    border-radius:50%;
    cursor:pointer;
}
.radio .checked{
    border-color:#008c8c;
}
圆圈里面画圆圈
.radio .checked::after{
    content:"";
    display:block;
    width:5px;
    height:5px;
    background:#008c8c;
    margin-left:3.5px;
    margin-top:3.5px;
    border-radius:50%;
}
```
```
<label class="radio-item">
    <input name="gender" type="radio">
    <span class="radio"></span>
    <span>男</span>
</label>
```
选中原始后面的
.radio-item input:checked+.radio::after{设置成上面的样式}
选中新增和文字
.radio-item input:checked~span
隐藏原始


# 表格元素

在css技术出现之前，网页通常使用表格布局
后台管理系统中可能会使用表格

前台：面向用户
后台：面向管理员

表格不再适用于网页布局，因为表格的渲染速度过慢

表格table 表格标题caption 表头thead 表格主体tbody 表尾tfoot 表格行tr 标题单元格th 单元格td

跨列colspan 跨行rowspan

# 其他元素

1. abbr 缩写词 <abbr title="cascading style sheet">CSS</abbr>
2. time 给浏览器看时间 <time datetime="2019-5-1">今年五月</time>
3. b 以前是无语义元素，主要用于加粗字体。举例
4. q 一小段引用文本 自动加引号
5. blockquote 大段引用 自动加margin。引用都有cite属性，引用的源头
6. br 无语义 本文换行
7. hr 无语义 分割线
8. meta 给网页添加资源,还可以用于搜索引擎优化(SEO) name=keywords/author/description
9. link 链接外部资源（css、图标）
rel属性：relation 表示链接的资源与当前页面关系，css:stylesheet,图标：icon/shortcut icon
type属性：连接的资源的MIME类型，可以不写

# button元素

disabled 属性，不能点了