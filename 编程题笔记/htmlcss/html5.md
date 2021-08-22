# 1. 表单新增的type属性

email 提供了验证邮箱格式的功能呢，必须包含@和服务器名称

Tel 不能验证，目的是为了能在移动端打开数字键盘，限制用户只能输入数字

url 验证输入合法网址，http://

number 数量 只能输入数字 value max min

Search 可以提供更人性化的输入体验，可以点叉号全部删除

Range 范围 value max min

Color 颜色拾取

Time 时间，时分秒

Date 日期，年月日；datetime-local，年月日时分秒；还有datetime只有Safari支持

month、week……

-Datalist 跟input关联时，type为url时，value必须合法 有http://

 

# 2.新增表单元素

-Keygen加密（浏览器基本不支持），传递公钥和私钥，服务端公钥解密；

-output 值显示，语义化更强，不能计算

 

# 3.新增表单事件

- oninput：监听当前指定元素内容的改变，只要内容改变就会触发
- onkeyup：与上相似，但取决于按了几个键盘键
- oninvalid：当验证不通过时触发；this.setCustomValidility：修改默认提示信息

# 4. 进度条

Progress 

Meter 属性：max min low high

# 5. 音视频

原始：embed本质是使用本机上已经安装的软件，存在兼容性问题；flash插件，苹果不支持flash

Audio 属性：src controls autoplay loop="-1"(无限循环）

Video 属性同上，width height（只设置一个） poster（封面）

# 6. 获取dom元素

document.querySelectorl(选择器)

document.querySelectorAll(选择器)[0]

 

# 7. 操作元素类样式

-  **为元素添加类**（**.clearfix)**

document.querySelector("div").classList.add("red");

document.querySelector("div").className="red clearfix"（修改 会覆盖掉 没add好用

- **删除类** 

删除样式，但不删除类，且只移除一个

document.querySelector("div").classList.remove("red");

- **切换样式**

如果元素之间没有指定名称的样式则添加，如果有则移除。

document.querySelector("div").classList.toggle("red");

- **判断是否有该样式**

document.querySelector("div").classList.contains("red");返回true

- **获取样式**

document.querySelector("div").classList.item(0);（第一个类）

# 8. 自定义属性

data-开头，尽量都小写不要特殊字符数字

```js
<p data-school-name="CUC"></p>
```

var p = document.querySelector("p");

var value = p.dataset["schoolName"]; //camel命名法取属性值，不然浏览器就会认为是data-schoolname

# 接口

# 1.网络监听接口

* ononline: 网络连通时触发该事件
* onoffline: 网络断开时触发

 window.addEventListener("offline", function(){
      alert("bengle"); 
 }, false)

# 2.全屏接口 fullScreen

不同浏览器需加不同前缀 Google：webkit；Firefox：moz；IE：ms; Opera:o; 例如 div.webkitRequestFullScreen(); 

浏览器能力测试

``` 
if(div.requestFullRequest){
      div.requestFullRequest(); 
}else if(div.webkitrequestFullRequest){
      div.webkitrequestFullRequest(); 
}else if……
```

* requestFullScreen(); 开启全屏显示
* cancelFullScreen(); 退出全屏显示, 只能document调用document.webkitcancelFullScreen()
* fullScreenElement 时候是全屏状态, only on document

``` 
if(document.fullScreenElement || document.webkitfullScreenElement……){
	alert(true);
}else{}
```

# 3.fileReader

是个constructor构造函数

* FileReader.readAsText(): 读取文本文件（可以使用Txt打开的文件），返回文本字符串，默认编码是UTF-8
* `FileReader.readAsBinaryString()`: 读取任意类型的文件。返回二进制字符串。这个方法不是用来读取文件展示给用户看，而是存储文件。例如：读取文件的内容，获取二进制数据，传递给后台，后台接收了数据之后，再将数据存储
* `FileReader.readAsDataURL()`: 读取文件获取一段以data开头的字符串，这段字符串的本质即DataURL。DataURL是一种将文件（图像等）嵌入到文档的方案。将资源转化为base64编码的字符串形式，并将这些内容存储在url中>>优化网站加载速度和执行效率。平时src需要向服务器发送请求，占用服务器资源
* FileReader.abort() 中断读取

function getFileContent() {

      // 1.创建文件读取对象
      var reader = new FileReader();
      // 2.读取文件，获取DataURL
      // 没有返回值：void，但读取完文件会将结果存在对象的result属性中
      var file = document.querySelector(".file").files;
      //需要传递参数 binary large object Blo（可嵌入到文档的文件如图片）
      reader.readAsDataURL(file[0]); //file表单元素的**files属性**是个数组
      
      //要读取完才能拿到reader.result
      reader.onload = function () {
          console.log(reader.result);
          document.querySelector(".img").src = reader.result;
      }

}

FileReader提供一个完整的事件模型，用来捕获读取文件时的状态
- onabort: 读取文件中断时触发
- onerror：读取出错时
- onload：读取成功完成时触发
- onloadend：读取完成时，不论成功与否
- onloadstart：开始读取时
- onprogress： 读取文件过程中持续触发

# 4.拖拽接口

如果想拖拽元素，就必须为元素添加draggable=“true”

1. 应用于被拖拽元素的事件

* ondrag 整个拖拽过程都会调用
* ondragstart 开始拖拽时调用
* ondragleave 鼠标离开拖拽元素时调用
* ondragend 拖拽结束时调用

2. 应用于目标元素的事件

* ondragenter 进入目标元素时调用
* ondragover 停留在目标元素上时调用
* ondrop 在目标元素上松开鼠标时调用，浏览器默认阻止该事件，必须在ondragover事件中阻止浏览器默认行为

``` 
div2.ondragover = function(e){
    e.preventDefault();
}
```

* ondragleave 鼠标离开目标元素时调用

1. 全局变量实现任意拖拽

var obj = e.target; 
e.target.appendChild(obj); 
2.dataTransfer数据传输对象，实现数据的存储与获取
方法 setData(format, data), 把类名或ID存入，然后用类名选择该元素appendChild
format: 数据的类型：text/html text/uri-list
Data：数据：一般字符串
存的数据只能在drop中取值。e.dataTransfer.getData("text/html")

# 5.地理定位接口

`navigator.geolocation.getCurrentPosition(success, error, option)`
success: 获取地理信息成功之后的回调
error：失败后的回调
option：调整获取当前信息的方式

navigator.geolocation.getCurrentPosition(showPosition, ShowError, {

    enableHighAccuracy:true/false; //是否使用高精度
    timeout:设置超时时间，单位ms
    maximumAge：设置浏览器重新获取地理信息的时间间隔，单位ms

})

``` 

var x=document.getElementById("demo");
function getLocation()
  {
    <!-- 能力测试 -->
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }

function showPosition(position)
  {
  x.innerHTML="Latitude: " + position.coords.latitude +
  "<br />Longitude: " + position.coords.longitude;
  }

function showError(error)
  {
  switch(error.code)
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
    }
  }

<!-- 显示结果 -->
function showPosition(position)
{
var latlon=position.coords.latitude+","+position.coords.longitude;

var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
+latlon+"&zoom=14&size=400x300&sensor=false";

document.getElementById("mapholder").innerHTML="<img src='"+img_url+"' />";
}
```

如果获取地理信息成功，会将获取到的地理信息传递给成功之后的回调
position.coords.latitude 维度
position.coords.longitude 经度
position.coords.accuracy 精度
position.coords.altitude 海拔

* 一般调用第三方API接口，百度地图等

# 6.web存储

## sessionStorage

存储数据到本地，5MB

1. 存在当前页面的内存里 not浏览器
2. 生命周期为关闭页面，关了就没了

setItem(key, value): 存储数据，以键值对的方式存储
getItem(key): 通过key获取value值
removeItem(key): 删除数据(key名错了不报错)
clear(): 清空所有存储的数据

e.g.把input输入的内容存在userName中
var name = document.querySelector(".input").value;
window.sessionStorage.setItem("userName", name)

## localStorage

1. 5MB（？
2. 不同浏览器不能共享数据，但在同一浏览器的不同窗口中可以共享
3. 永久生效，数据存在硬盘中，关闭浏览器也在，需要手动remove

# 7.应用缓存

1. 概念：使用HTML5，通过创建cache manifest文件，可以创建web应用的离线版本

2. 优势：
* 可配置需要缓存的资源（浏览器缓存只能全部，不可选）
* 网络无连接应用仍可用
* 本地读取缓存资源，提升访问速度，增强用户体验
* 减少请求，缓解服务器负担

3. 指定manifest属性

应用程序缓存清单文件的路径
<html lang="en" manifest="demo.appcache">

4. manifest文件
简单的文本文件，告知浏览器被缓存的内容

需要配置正确的 MIME-type，即“text/cache-manifest"。必须在web服务器上进行配置>>运行输入inetmgr——MIME类型添加 文件扩展名：.appcache,value:text/cache-manifest

demo.appcache:
```
CACHE MANIFEST
# 开头必须是这句（#为注释）

# 需要缓存的文件清单列表：
CACHE:
../随便/img/01.jpg

#每一次都需要重新从服务器获取的文件清单列表：
NETWORK:
../随便/img/02.jpg

#如果文件无法获取则使用指定的文件进行替代(空格隔开)
FALLBACK:
../随便/img/03.jpg ../随便/img/04.jpg

```

# 多媒体接口

1. 常用方法
load() play() pause()
jquery没有提供对视频播放控件的方式，只能用原生的js方法操作dom元素

2. 常用属性
* currentTime 视频播放的当前进度
* duration 视频的总时间
* paused 视频播放的状态

3. 常用事件
oncanplay 播放时触发
ontimeupdate 通过该事件来报告当前的播放进度
onended 放完时触发——重置

# 新增标签

![image-20200921212307505](C:\Users\99445\AppData\Roaming\Typora\typora-user-images\image-20200921212307505.png)

# 其他

OneNote上