### 倒计时验证码控件文档

#### 简介

用于用户获取验证码的UI空间,参数的传入采用链式处理

##### 推荐使用环境

移动端,pc设备

##### 环境依赖

无

##### 样例代码

html代码设置

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="yzm.css">
  </head>
  <body>
    <button class="yzm" id="yzf">点击获取验证码</button>
  </body>
  <script type="text/javascript" src = "yzm.js"></script>
  <script type="text/javascript">
      var yzf  = document.getElementById('yzf');
      Yanzhenma(yzf,30).click(function(){
        console.log("开始点击");
      }).complete(function(){
        console.log("任务完成");
      });
  </script>
</html>
```

其中 class = "yzm"是默认样式,用户可以自己进行更改

```css
.yzm {
    border: solid 1px rgb(200, 200, 200);
    color: rgb(200, 200, 200);
    background-color: #fff;
    border-radius: 3px;
    padding: 5px;
}
```



接口说明

```javascript
      /**
       * 创建时候的参数,第一个参数是空间UI的dom指针,后面一个是控件读秒数(单位是秒),可以省略,默认为60s
       */
      Yanzhenma(yzf,30).click(function(){
        //传入点击验证码控件点击时候的动作,也可以不传入
      }).complete(function(){
        //传入点击验证码控件读秒完成后的动作,也可以不传入
      });
```
