
### 漂亮好用的jQuery时间轴播放器代码

https://www.sucaihuo.com/js/5268.html

```html
<body data-new-gr-c-s-check-loaded="14.1112.0" data-gr-ext-installed="">
    <div id="progressTime">

    <div class="progressTime-left">
      <div class="progressTime-left-t"></div>
      <div class="progressTime-left-b"><span class="progressTime-left-b-start"></span></div></div>
    <div class="progressTime-center">
      <div class="progressTime-center-t">
        <div class="progressTime-center-t-bar" style="width: 32.5071%;"></div>
        <div class="progressTime-center-t-tooltip" style="left: 32.5071%;">2023年06月08日 15时</div>
        <div class="progressTime-center-t-tooltipTemp hide" style="left: 4.99761%;">2023年06月07日 6时</div>
        <ul class="progressTime-center-t-ul"><li style="width:20%;"></li><li style="width:20%;"></li><li style="width:20%;"></li><li style="width:20%;"></li><li style="width:20%;"></li></ul>
        </div><div class="progressTime-center-c"><ul class="progressTime-center-c-ul"><li class="progressTime-center-c-ul-li" style="width:20%;"><span style="left:12.5%;">3</span><span style="left:25%;">6</span><span style="left:37.5%;">9</span><span style="left:50%;">12</span><span style="left:62.5%;">15</span><span style="left:75%;">18</span><span style="left:87.5%;">21</span></li><li class="progressTime-center-c-ul-li" style="width:20%;"><span style="left:12.5%;">3</span><span style="left:25%;">6</span><span style="left:37.5%;">9</span><span style="left:50%;">12</span><span style="left:62.5%;">15</span><span style="left:75%;">18</span><span style="left:87.5%;">21</span></li><li class="progressTime-center-c-ul-li" style="width:20%;"><span style="left:12.5%;">3</span><span style="left:25%;">6</span><span style="left:37.5%;">9</span><span style="left:50%;">12</span><span style="left:62.5%;">15</span><span style="left:75%;">18</span><span style="left:87.5%;">21</span></li><li class="progressTime-center-c-ul-li" style="width:20%;"><span style="left:12.5%;">3</span><span style="left:25%;">6</span><span style="left:37.5%;">9</span><span style="left:50%;">12</span><span style="left:62.5%;">15</span><span style="left:75%;">18</span><span style="left:87.5%;">21</span></li><li class="progressTime-center-c-ul-li" style="width:20%;"><span style="left:12.5%;">3</span><span style="left:25%;">6</span><span style="left:37.5%;">9</span><span style="left:50%;">12</span><span style="left:62.5%;">15</span><span style="left:75%;">18</span><span style="left:87.5%;">21</span></li></ul></div><div class="progressTime-center-b"><ul class="progressTime-center-b-ul"><li style="width:20%;">2023年06月07日</li><li style="width:20%;">2023年06月08日</li>
        <li style="width:20%;">2023年06月09日</li><li style="width:20%;">2023年06月10日</li><li style="width:20%;">2023年06月11日</li></ul></div></div><div class="progressTime-right ">
          <div class="progressTime-right-now">回到当前</div></div></div>

<script src="./jquery.min.js"></script>
<script src="./jquery.progressTime.js"></script>
<script>
    var hourTimestamp = 3600 * 1000;
    var dayTimestamp = hourTimestamp * 24;

    $("#progressTime").ProgressTime({
        container: "progressTime",
        startTime: new Date(formatDate(new Date(new Date().getTime() - dayTimestamp * 5), "YYYY/MM/DD 00:00:00")),
        endTime: new Date(formatDate(new Date(), "YYYY/MM/DD 00:00:00")),
        currentTime: new Date(formatDate(new Date(new Date().getTime() - dayTimestamp * 4), "YYYY/MM/DD 12:00:00")),
        stopTime: new Date(formatDate(new Date(), "YYYY/MM/DD 00:00:00")),
        interval: 300,
        delay: 2000,
        callback: function (config) {
        },
        animateCallback: function (config) {
            console.log("动画完成");
            console.log(this);
            // 假如动画完成之后请求数据需要两秒
            var timer = setTimeout(function () {
                progressTime.autoPlay(progressTime.playSelf); // 两秒之后再继续走播放条
                clearTimeout(timer);
            }, 0);
        }
    });

</script>


</body>
```

index.js

```java
<script src="./jquery.min.js"></script> 
<script src="./jquery.progressTime.js"></script> 
<script> 
    var hourTimestamp = 3600 * 1000; 
    var dayTimestamp = hourTimestamp * 24; 
 
    $("#progressTime").ProgressTime({ 
        container: "progressTime", 
        startTime: new Date(formatDate(new Date(new Date().getTime() - dayTimestamp * 5), "YYYY/MM/DD 00:00:00")), 
        endTime: new Date(formatDate(new Date(), "YYYY/MM/DD 00:00:00")), 
        currentTime: new Date(formatDate(new Date(new Date().getTime() - dayTimestamp * 4), "YYYY/MM/DD 12:00:00")), 
        stopTime: new Date(formatDate(new Date(), "YYYY/MM/DD 00:00:00")), 
        interval: 300, 
        delay: 2000, 
        callback: function (config) { 
        }, 
        animateCallback: function (config) { 
            console.log("动画完成"); 
            console.log(this); 
            // 假如动画完成之后请求数据需要两秒 
            var timer = setTimeout(function () { 
                progressTime.autoPlay(progressTime.playSelf); // 两秒之后再继续走播放条 
                clearTimeout(timer); 
            }, 0); 
        } 
    }); 
 
</script>
```

index.css

```css
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

html,
body {
  height: 100%;
}
.hide{
    display: none;
}
#progressTime {
  height: 50px;
  width: 80%;
  border: 1px red solid;
  margin: 50px auto 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.7);
  min-width: 1024px;
}
.progressTime-left {
  width: 48px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.progressTime-left-t {
  height: 8px;
  background-color: #25d096;
  position: relative;
}
.progressTime-left-b {
  flex: 1;
  position: relative;
}
.progressTime-left-b-start {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border: 6px solid;
  border-color: #fff #fff transparent transparent;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  margin-left: -9px;
  margin-top: -6px;
  cursor: pointer;
}
.progressTime-left-b-start.stop{
    width: 16px;
    height: 12px;
    border: none;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    cursor: pointer;
}
.progressTime-left-b-start.stop::before{
    content: "";
    position: absolute;
    width: 4px;
    height: 12px;
    background-color: #FFF;
}
.progressTime-left-b-start.stop::after{
    content: "";
    position: absolute;
    width: 4px;
    height: 12px;
    background-color: #FFF;
    margin-left: 10px;
}
.progressTime-center {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.progressTime-center-t {
  height: 8px;
  background-color: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.progressTime-center-t-bar {
  background-image: linear-gradient(
    to right,
    rgba(37, 208, 150, 1),
    rgba(45, 182, 205, 1)
  );
  height: 100%;
  width: 0%;
}
.progressTime-center-t-tooltip, .progressTime-center-t-tooltipTemp {
  position: absolute;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  top: -35px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  background-color: gray;
  border-radius: 3px;
  -webkit-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  min-width: 20px;
  white-space: nowrap;
}
.progressTime-center-t-tooltip::after, .progressTime-center-t-tooltipTemp::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -8px;
  border: 8px solid;
  border-color: gray transparent transparent transparent;
}
.progressTime-center-t-tooltipTemp{
    background-color: #ccc;
}
.progressTime-center-t-tooltipTemp::after{
    border-color: #ccc transparent transparent;
}
.progressTime-center-t-ul {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
}
.progressTime-center-t-ul::after {
  content: "";
  display: block;
  clear: both;
}
.progressTime-center-t-ul,
.progressTime-center-t-ul li {
  height: 100%;
}

.progressTime-center-t-ul li {
  float: left;
  border-left: 1px solid #999;
  box-sizing: border-box;
  height: 110%;
}

.progressTime-center-c {
  height: 12px;
  line-height: 12px;
}
.progressTime-center-c-ul::after {
  content: "";
  display: block;
  clear: both;
}
.progressTime-center-c-ul,
.progressTime-center-c-ul-li {
  height: 100%;
}
.progressTime-center-c-ul-li {
  float: left;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  box-sizing: border-box;
  position: relative;
}
.progressTime-center-c-ul-li span{
  position: absolute;
  color: #FFF;
  font-size: 12px;
  -webkit-transform: translateX(-50%) scale(.8);
  -moz-transform: translateX(-50%) scale(.8);
  -ms-transform: translateX(-50%) scale(.8);
  -o-transform: translateX(-50%) scale(.8);
  transform: translateX(-50%) scale(.8);
}
.progressTime-center-c-ul-li span::after{
  content: "";
  position: absolute;
  width: 1px;
  top: -90%;
  background-color: #FFF;
  height: 9px;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  transform: translateX(-50%);
  left: 50%;
}
.progressTime-center-b {
  flex: 1;
}
.progressTime-center-b-ul::after {
  content: "";
  display: block;
  clear: both;
}
.progressTime-center-b-ul,
.progressTime-center-b-ul li {
  height: 100%;
}
.progressTime-center-b-ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  border-left: 1px solid #999;
  /* border-bottom: 1px solid #999; */
  color: #fff;
  font-size: 12px;
  box-sizing: border-box;
}
.progressTime-right {
  height: 100%;
  width: 120px;
  position: relative;
  border-left: 1px solid #999;
}
.progressTime-right-now {
  height: 28px;
  line-height: 28px;
  width: 80px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 14px;
  background-color: #2db6cd;
  text-align: center;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}
```

### jQuery水平滑动时间轴代码

http://demo.sucaihuo.com/jquery/48/4862/demo/

```html
<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body data-new-gr-c-s-check-loaded="14.1112.0" data-gr-ext-installed="" style="">

    <div class="container">
        <div class="button prev iconfont icon-zuojiantou"></div>
        <div class="button next iconfont icon-zuojiantou"></div>
        <div class="slide_wrap">
            <ul class="slide_items clearfix" style="width: 1600px; left: 0px;">
                <li class="on">
                    <a href="jacascript:;">
                        <span>2019年</span>
                        <div class="circle">
                            <i></i>
                        </div>
                    </a>
                </li>
                <li class="">
                    <a href="jacascript:;">
                        <span>2018年</span>
                        <div class="circle">
                            <i></i>
                        </div>
                    </a>
                </li>
                <li class="">
                    <a href="jacascript:;">
                        <span>2017年</span>
                        <div class="circle">
                            <i></i>
                        </div>
                    </a>
                </li>
                <li class="">
                    <a href="jacascript:;">
                        <span>2016年</span>
                        <div class="circle">
                            <i></i>
                        </div>
                    </a>
                </li>
                <li class="">
                    <a href="jacascript:;">
                        <span>2015年</span>
                        <div class="circle">
                            <i></i>
                        </div>
                    </a>
                </li>
                <li class="">
                    <a href="jacascript:;">
                        <span>2014年</span>
                        <div class="circle">
                            <i></i>
                        </div>
                    </a>
                </li>
                <li class="">
                    <a href="jacascript:;">
                        <span>2013年</span>
                        <div class="circle">
                            <i></i>
                        </div>
                    </a>
                </li>
                <li class="">
                    <a href="jacascript:;">
                        <span>2012年</span>
                        <div class="circle">
                            <i></i>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 对应的内容 -->
        <div class="slide-content">
            <ul class="on" style="display: block;">
                <li>
                    <a href="#">
                        <img src="./images/t1.png" alt="">
                        <!-- 内容可自定义 -->
                    </a>
                </li>
            </ul>
            <ul style="display: none;">
                <li><a href="#"><img src="./images/t2.png" alt=""></a></li>
            </ul>
            <ul style="display: none;">
                <li><a href="#"><img src="./images/t3.png" alt=""></a></li>
            </ul>
            <ul style="display: none;">
                <li><a href="#"><img src="./images/t4.png" alt=""></a></li>

            </ul>
            <ul style="display: none;">
                <li><a href="#"><img src="./images/t5.png" alt=""></a></li>

            </ul>
            <ul style="display: none;">
                <li><a href="#"><img src="./images/t6.png" alt=""></a></li>

            </ul>
            <ul style="display: none;">
                <li><a href="#"><img src="./images/t7.png" alt=""></a></li>

            </ul>
            <ul style="display: none;">
                <li><a href="#"><img src="./images/t8.png" alt=""></a></li>

            </ul>
        </div>


    </div>



    <script src="https://libs.baidu.com/jquery/1.10.2/jquery.min.js"></script>
    <script src="./jquery.easing.min.js"></script>
    <script src="./index.js"></script>




</body><grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration></html>
```
index.js

```js
// 憯唳�𤾸�㗛��
// 1��li��蝝删�摰賢漲  $li_width
var $li = $('.slide_items li')
var $li_width = $li.width()
var $ul = $('.slide_items')
// 2��ul dom 
var $ul_dom = $('.slide_items')
// 3��摰帋�厩宏�𢆡����嘥�见��  
var go = 0;
// 銝𠹺�銝�
// 霈∠�𠓾l��摰賢漲
var ul_width = 0
for(var i = 0; i< $li.length; i++ ){
    ul_width +=$li.eq(i).width()
}
$ul.width(ul_width)
// 摰帋�匧�嘥�𧢲��扇
var flag = 0
 $('.button.next').on('click',function(e){
    go_next()
 })

 $('.button.prev').on('click',function(){
    go_prev()
 })
$('.slide_items li').on('click',function(e){
    var index = $(this).index()
    flag = index
    go_next_item(index)
    return false;
 })
 var go_next_length =0

//  ��穃𢰧�𢆡�𤫇�遆�㺭
 function go_next(){

    if(flag > $li.length-2) {
        return false
    }
    flag = flag+1  //銝𧢲������扇
    go = go + $li_width
    go_next_length =  -go 
    move() //蝘餃𢆡�遆�㺭
    // // 瘣餉���撟港遢
    onYear(flag)
    content_switch(flag)
 }
 function go_next_item(index) {
    go = $li_width*index
    go_next_length =  -go 
    move() 
    onYear(index)
    content_switch(index)

 }
 //  ��穃𢰧�𢆡�𤫇�遆�㺭��穃椰�遆�㺭�𢆡�𤫇
 function go_prev(){
    if(flag <= 0) {
        return false
    }
    flag = flag-1   //銝𧢲������扇
    go = go - $li_width
    go_next_length = -go
    move() //蝘餃𢆡�遆�㺭
    onYear(flag)
    content_switch(flag)
}
// 蝘餃𢆡�遆�㺭
function move() {
    $ul_dom.stop().animate({
        'left' : go_next_length
    },800,'easeOutCirc')
}
// 瘣餉���撟港遢
function onYear(index){
    var index
    $('.slide_items li').eq(index).addClass('on').siblings().removeClass('on')
}

function  content_switch(index) {
    $('.slide-content ul').eq(index).fadeIn(800).siblings().hide();
}
```

index.css

```css

/* css ����嘥�见�� */

/* ����𡁜�枏�㷼ss���辣, 蝻𣇉��聢撘𤩺糓utf-8 */
@charset "UTF-8";

/* 皜��膄暺䁅恕��憭𤥁器頝嘥����颲寡�� */
html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, img {
  margin: 0;
  padding: 0;
}

img, input, button, textarea {
  border: none;
  padding: 0;
  margin: 0;
  outline-style: none;
}

ul, ol {
  list-style: none;
}

input {
  font-family: "SimSun", "摰衤��";
}

select, input, textarea {
  font-size: 12px;
  margin: 0;
}

textarea {
  resize: none;
}

img {
  border: 0;
  /* �虾隞仿俈甇� img 銝贝器�枂�緵蝻嗪�䠷䔮憸� */
  vertical-align: middle;
}

table {
  border-collapse: collapse;
}

body {
  /* 撠��㟲銝芷△�𢒰��摮𦯀��, 暺䁅恕��滨蔭 */
  font: 12px/18px Microsoft YaHei, Arial, Verdana, "SimSun";
  color: #666;
  background: #fff;
}

.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}

.clearfix::after {
  clear: both;
}

/* �澆捆 IE 67 */
.clearfix {
  *zoom: 1;
}

a {
  color: #666;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
  text-decoration: none;
  font-weight: normal;
  font-size: 100%;
}

/* 摨毺��⏚�鍂 1*/
s, i, em {
  font-style: normal;
  text-decoration: none;
}

.fl {
  float: left;
}

.fr {
  float: right;
}


@font-face {font-family: "iconfont";
    src: url('//at.alicdn.com/t/font_1457575_wc4kbab342e.eot?t=1571103794780'); /* IE9 */
    src: url('//at.alicdn.com/t/font_1457575_wc4kbab342e.eot?t=1571103794780#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAQ0AAsAAAAACMAAAAPmAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqETIQbATYCJAMUCwwABCAFhG0HWRu4B8gehXEsLBShUansf34QD19r6Pu7exdglJGA46Oo44HAAilVYVtjO/UEwuX/dOp3TiETj7eViAQFMpxsGSJXOhdQLpCnEsEaAJyKOOa5yu3/71A1c1peaH6LxeUu+7LmpIQGYCgdQLXa3lgqWQtSUe8yNhm+gkz1HR8TaDauL93+9Lks5CnIVYG4LIV8kBf5lQ5paHTVlQeLeA/ZGtOLrAoA7/Tvxy8YHHkkVUZuPDg7LQgTv+o+9ENaRoOVkgLGw0UxeoyMVaAQN6vxy5Ctr0KaF6cztoFmjZJ0qOOyP/T+0C+TwVtuyNlM/+GRFSERNWJvxcztRuGrjmvJfM021By9wSvA0Q8aEl7XgzSjDR9A9AMRjLooq2Sp22szIuUggx41cA42cVLNnHTjDdzao9qxtEc4kXLzxw/6qIszyuoxg+nMwY2I1knSQFIbn+xr+sA3fxQa33MN7zYzwhoc3tz0IWhJHzt1VG9+efzMCYE9qkjqQJX0MY3lOIrwAa0pwMck7Gk6mpuFpqaNjPAGh9mGhhXGo8qPH3Sy0WPpO2fgNZ3IXrLCBtZrHDt6nQbC9klVPTnxIUMKufWH0xtAeFjJWd/YuPZ21s6KF3O2N1bu1avuxtf213ndDi08MDocHn3gIkMKufWL00nI7GjJxji7hXoxFhY/YTpSXcTkNRawFg0xWJpTvrzunf9a91bfW48nv9yvqyO2Cqs47BCtldaWN0MqbwhvqLABnpnwgvmbecm8apCVPWf+RRHCJxnUARdRYzO6jC6h2EV0YSG5hC7fNuKYrNKN7owndPnKBvdG8TIXuO+pVH74w/MTJrybgCd0TbgwgJ4OSwFOW9EN1ENf3oCeoIkA5E+6R3+Ov/F/+pzCNZax/xsNBXwunzYY5k41BvJzgG/YYWPjX8G44UpZmkmgKvNFbpgnK+tvoj0tdprxB0h36zqMs2/jYUKjPg9JgzHIGs1SC3MVKi3WoNZoC5qtmPF4ix4KJEoTlu1BEDo9gKTdR8g6VVILsxMq/b5DrTMQNDsMxwtbzIekn6IQHyVB7N+EpYBcILIQ1ZvRxSSUjPmU0KwVPFFUqYQH9R+YtmaQAqIc4hZ1fWgwpSIWFTmOp6PPkVhMxglFjpAA7R+mNDF6wACx9k39A3Ic9PYoCB+KCML8NsEkAbICotxO6bOfX4wISYrxUTqWLnR5hEIlHR0bpL+BG1Bn2As2WnopX1GtFzIYRYkwkUIWh01HUSJG6zIsUT8vggig+gvvUE0YbQDeJG5q7396Z/w9PgTNyMuqSJGjRBW15ouSr4DKyU3MaXDVfpuTsp6bQmeu9gEAAAA=') format('woff2'),
    url('//at.alicdn.com/t/font_1457575_wc4kbab342e.woff?t=1571103794780') format('woff'),
    url('//at.alicdn.com/t/font_1457575_wc4kbab342e.ttf?t=1571103794780') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('//at.alicdn.com/t/font_1457575_wc4kbab342e.svg?t=1571103794780#iconfont') format('svg'); /* iOS 4.1- */
  }
  
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .icon-jiantouyou:before {
    content: "\e62a";
  }
  
  .icon-jiantou-zuo:before {
    content: "\e62d";
  }
  
  .icon-zuojiantou:before {
    content: "\e601";
  }
  
  .icon-jiantou:before {
    content: "\e605";
  }
  



.button {
    position: absolute;
    cursor: pointer;
    top: 15%;
    font-size: 40px;
    color: #333;

}
.prev {
    left: -20px;
}
.next {
    right: -20px;
    transform: rotate(-180deg);
}
.container {
    width: 900px;
    margin: 0 auto;
    height: 500px;
    position: relative;
    padding: 50px;
}
.slide_wrap  {
    overflow: hidden;
    position: relative;
}
.slide_wrap ul {
    position: relative;
    left: 0px;
}
.slide_wrap::after {
    width: 100%;
    height: 1px ;
    background-color: #999;
    content: '';
    position: absolute;
    top: 48px;
    left: 0px;
}
.slide_items li{
    float: left;
    font-size: 20px;
    width: 200px;
    text-align: center;    
}
.slide_items li a {
    display: block;
}
.slide_items li.on {
    color: yellow;
    border-radius: 30px;
}
.slide_items li span {
    color: #333333;
    font-size: 24px;
    display: block;
}
.slide_items li div {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #a2a2a2; ;
    border-radius: 13px;
    padding: 2px;
    box-sizing: border-box;
    margin-top: 22px;
}
.slide_items li i{
    display: block;
    width: 10px;
    height: 10px;
    background-color: #a2a2a2;
    border-radius: 5px;

}
.slide_items li.on div {
    display: inline-block;
    width: 26px;
    height: 26px;
    background-color: #d3d3d3;
    border-radius: 13px;
    padding: 8px;
    box-sizing: border-box;
    margin-top: 16px;
}

.slide-content {
    margin-top: 100px;
}
.slide-content img{
   width: 100%;
}
.slide-content ul {
    display: none;
}
.slide-content ul.on {
    display: block;
}
```

