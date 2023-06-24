$(function ($, window) {
  var hourTimestamp = 3600 * 1000; // 銝�銝芸�𤩺𧒄���𧒄�𡢿��
  var dayTimestamp = hourTimestamp * 24; // 銝�憭拍��𧒄�𡢿��

  window.formatDate = function (date, type) {
      if ((date.getTime || new Date(date).getTime()) && typeof type === "string") {
          date = type.replace(/YYYY|MM|DD|HH|hh|MM|mm|SS|ss/g, function ($) {
              switch ($) {
                  case "YYYY":
                      return date.getFullYear();
                  case "MM":
                      return date.getMonth() >= 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
                  case "mm":
                      return date.getMonth() + 1;
                  case "DD":
                      return date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
                  case "dd":
                      return date.getDate();
                  case "HH":
                      return date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
                  case "hh":
                      return date.getHours();
                  case "MM":
                      return date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
                  case "mm":
                      return date.getMinutes();
                  case "SS":
                      return date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
                  case "ss":
                      return date.getSeconds();
                  default:
                      return $;
              }
          });
      }
      return date;
  }

  function ProgressTime(options) {
      this.options = {
          container: "container", // 摰孵膥ID��滨妍 
          startTime: new Date(formatDate(new Date(new Date().getTime() - dayTimestamp * 10), "YYYY/MM/DD 00:00:00")), // 撘�憪𧢲𧒄�𡢿嚗�2000/10/20 00:00:00
          endTime: new Date(formatDate(new Date(), "YYYY/MM/DD 00:00:00")), // 蝏𤘪��𧒄�𡢿嚗�2000/10/30 00:00:00
          currentTime: new Date(new Date().getTime() - dayTimestamp * 7), // 敶枏�齿𧒄�𡢿: 2000/10/25 00:00:00
          delay: 2000, // �䌊�𢆡�偘�𦆮�𢆡�𤫇�𧒄�𡢿                                            
          isNow: true, // �糓�炏�遬蝷箏𢰧靘批�𧼮�敶枏�齿𧒄�𡢿
          animateFinish: true, // �𢆡�𤫇�糓�炏摰峕��
          hoursInterval: 3,
          stopTime: new Date(formatDate(new Date(), "YYYY/MM/DD HH:00:00")),
          formatDate: function (timer) { // �䌊摰帋�匧�閖�冽𧒄�𡢿�聢撘�
              return formatDate(new Date(timer), "YYYY撟尋M��㇄D�𠯫");
          },
          tooltipFormatDate: function (time) { // �䌊摰帋�缆ooltip�𧒄�𡢿�聢撘�
              return formatDate(new Date(time), "YYYY撟尋M��㇄D�𠯫 hh�𧒄");
          },
          animateCallback: function (config) { // �𢆡�𤫇摰峕�𣂼�噼�

          },  
          callback: function (config) { // ��訫稬鈭衤辣��墧�𣂼�噼�

          }
      }
      this.options = $.extend(this.options, options);
      this.id = this.options.container;
      this.startTime = this.options.startTime;
      this.endTime = this.options.endTime;
      this.currentTime = this.options.currentTime;
      this.currentTimeTemp = null;
      this.timer = null;
      this.playSelf = null;
      this.init();

  }
  ProgressTime.prototype.init = function () {
      this.createDom();
      this.bindEvent();
      this.resize();
      return this;
  }

  ProgressTime.prototype.createDom = function () {
      var left = $("<div class='" + this.id + "-left'></div>");
      var center = $("<div class='" + this.id + "-center'></div>");
      var isRight = this.options.isNow ? "" : "hide";
      var right = $("<div class='" + this.id + "-right " + isRight + "'></div>");

      var leftHtml = "<div class='" + this.id + "-left-t'></div><div class='" + this.id + "-left-b'><span class='" + this.id + "-left-b-start'></span></div>";
      left.append(leftHtml);

      var centerHtml = "<div class='" + this.id + "-center-t'><div class='" + this.id + "-center-t-bar'></div></div><div class='" + this.id + "-center-c'></div><div class='" + this.id + "-center-b'></div>";
      center.append(centerHtml);

      var rightHtml = "<div class='" + this.id + "-right-now'>��𧼮�敶枏��</div>";
      right.append(rightHtml);

      $("#" + this.id).append(left).append(center).append(right);

      this.createCenter(); // ��𥕦遣��摰寧�DOM
  }
  ProgressTime.prototype.createCenter = function () {
      var cTop = $("." + this.id + "-center-t");

      var cCenter = $("." + this.id + "-center-c");
      var cbottom = $("." + this.id + "-center-b");

      cTop.append("<div class='" + this.id + "-center-t-tooltip'></div><div class='" + this.id + "-center-t-tooltipTemp hide'></div>");
      var days = (this.endTime.getTime() - this.startTime.getTime()) / dayTimestamp;


      var tempTime, cTopHtml = "",
          cCenterHtml = "",
          cBottomHtml = "",
          width = (cTop.width() / days) / cTop.width() * 100 + "%"; // 霈∠�堒枂瘥譍�憭拍��𧒄�𡢿頧湧鵭摨佗������鍂�蓡��瘥𥪯�滨�嗉恣蝞𦯀�滚�蝖�

      // 敺芰㴓憭拇㺭
      for (var i = 0; i < days; i++) {
          var tempTime2 = new Date(this.startTime.getTime() + (i * dayTimestamp)); // 敶枏�齿𧒄�𡢿
          tempTime = this.options.formatDate(tempTime2);
          cTopHtml += "<li style='width:" + width + ";'></li>";
          cCenterHtml += "<li class='" + this.id + "-center-c-ul-li' style='width:" + width + ";'></li>";
          cBottomHtml += "<li style='width:" + width + ";'>" + tempTime + "</li>";
      }
      cTop.append("<ul class='" + this.id + "-center-t-ul'>" + cTopHtml + "</ul>");
      cCenter.append("<ul class='" + this.id + "-center-c-ul'>" + cCenterHtml + "</ul>");
      cbottom.append("<ul class='" + this.id + "-center-b-ul'>" + cBottomHtml + "</ul>");

      // ���3撠𤩺𧒄�䔉�𡢿���
      var spanHtml = "";
      var liWidth = $("." + this.id + "-center-c-ul-li")[0].getBoundingClientRect().width; //
      var hoursWidth = liWidth / 24; // 霈∠�埈�譍葵撠𤩺𧒄����删�摰賢漲
      var intervalCount = 24 / this.options.hoursInterval;
      for (var i = 1; i < intervalCount; i++) {
          var temp = (hoursWidth * i * this.options.hoursInterval) / liWidth * 100 + "%";
          spanHtml += "<span style='left:" + temp + ";'>" + (i * this.options.hoursInterval) + "</span>";
      }
      $("." + this.id + "-center-c-ul-li").append(spanHtml)

      this.setTime();
  }
  ProgressTime.prototype.setConfig = function (config) {
      var _this = this;
      var text = this.options.tooltipFormatDate(config.time);

      var widthPercent = (config.width / $("." + this.id + "-center-t").width()) * 100 + "%"; // �鍂�蓡��瘥䈑�諹圾�單𧒄�𡢿�偘�𦆮蝏𤘪�笔枂�緵�䌊��摨娪䔮憸�

      // �菜暑��tooltip
      if (config.type === "mousemove") {
          $("." + this.id + "-center-t-tooltipTemp").removeClass("hide").text(text).css({
              "left": widthPercent
          });
          return;
      }

      // �𧒄�𡢿頧渡��鵭摨�
      $("." + this.id + "-center-t-tooltip").text(text).stop().animate({
          "left": widthPercent
      }); 

      // �𤐄摰𡁶�tooltip
      $("." + this.id + "-center-t-bar").stop().animate({
          width: widthPercent
      }, function () { // �𢆡�𤫇摰峕�� 
          if (config.e !== "resize") { // �ế�鱏�糓�炏�糓瘚讛��膥�㺿��条�堒藁憭批�𤩺�銵䕘�����𨀣糓撠曹�滩粥��噼�
             _this.options.animateFinish = true;
              typeof _this.options.animateCallback === "function" && _this.options.animateCallback(config);
          }
      });

      typeof this.options.callback === "function" && this.options.callback(config);
  }

  ProgressTime.prototype.setTime = function (e) {
      var layerX = e && e.originalEvent && e.originalEvent.layerX;
      var type = e && e.type;
      var hoursWidth = $("." + this.id + "-center-t-ul li")[0].getBoundingClientRect().width / 24; // 霈∠�埈�譍葵撠𤩺𧒄����删�摰賢漲
      var tooltipTimestamp = this.currentTimeTemp || this.currentTime.getTime(); // 餈𥪜�𧼮�枏�滨��𧒄�𡢿���𧒄�𡢿��
      var num = Math.floor((tooltipTimestamp - this.startTime.getTime()) / hourTimestamp); // 霈∠�堒枂憭𡁜�穃�𤩺𧒄
      num = layerX !== undefined ? Math.round(layerX / hoursWidth) : num;
      var progressWidth = num * hoursWidth; // 霈∠�堒枂�𧒄�𡢿�辺���鵭摨�

      if (layerX) { // 蝘餃𢆡��𣇉�孵稬��齿鰵瘙�頝萘氖
          tooltipTimestamp = Math.floor(this.startTime.getTime() + num * hourTimestamp);

          if (type === "click") {
              this.currentTimeTemp = tooltipTimestamp; // �孵稬�典�睃�枏�齿𧒄�𡢿嚗諹䌊��摨𠉛鍂
          }
      }
      var time = formatDate(new Date(tooltipTimestamp), "YYYY/MM/DD hh:00:00");
      this.setConfig({
          time: time,
          width: progressWidth,
          type: type,
          e: e
      });
  }

  ProgressTime.prototype.bindEvent = function () {
      var _this = this;

      // �孵稬
      $("." + this.id + "-center-t-ul").on("click", function (e) {
          _this.setTime(e);
      });

      // 蝘餃𢆡蝘餃枂
      $("." + this.id + "-center-t-ul").on("mousemove", function (e) {
          _this.setTime(e);
      }).on("mouseleave", function () {
          $("." + _this.id + "-center-t-tooltipTemp").addClass("hide");
      });

      // ��𧼮�敶枏��
      $("." + this.id + "-right-now").on("click", function () {
          _this.currentTimeTemp = _this.currentTime.getTime(); // ��滨蔭
          _this.setTime();
      });

      // �孵稬�偘�𦆮
      $("." + this.id + "-left-b-start").on("click", function () {
          if(!$(this).hasClass('stop')) {
              _this.autoPlay(this);
          }else{
              _this.stopPlay(this);
          }
      });
  }

  ProgressTime.prototype.autoPlay = function (node) { // �偘�𦆮
      var _this = this;
      _this.timer && clearTimeout(_this.timer);
      this.playSelf = $(node);
      if (_this.currentTimeTemp < _this.endTime && node && $(node).length) {
          _this.currentTimeTemp = _this.currentTimeTemp ? _this.currentTimeTemp : _this.currentTime.getTime(); // ��牐�撠𤩺𧒄���𧒄�𡢿��
          this.playSelf.addClass("stop");
          _this.timer = setTimeout(function () {
              if (_this.options.animateFinish) { // �𢆡�𤫇摰峕�𣂼�𠬍��僎銝娪△�𢒰皜脫�枏�𤾸�滩��鍂
                  _this.options.animateFinish = false;
                  _this.currentTimeTemp += hourTimestamp;
                  _this.setTime();
                  if (_this.currentTimeTemp >= _this.options.stopTime) { // �𧒄�𡢿颲寧��ế摰�
                      _this.stopPlay(node);
                  }
              }
          }, _this.options.delay);
      }
  }

  ProgressTime.prototype.stopPlay = function (node) {
      this.playSelf = $(node);
      this.playSelf.removeClass("stop");
      clearTimeout(this.timer);
      this.timer = null;
  }
  
  ProgressTime.prototype.resize = function () { // �䌊��摨𥪜蘨靚��鍂銝�甈∴�諹圾�單�讛��膥閫血�穃�𡁏活resize�䲮瘜�
      var _this = this;
      var tempTimer = null;
      $(window).resize(function () {
          if (!tempTimer && !_this.timer) { // 瘚讛��膥蝻拇𦆮隡𡁻�滨蔭�𧒄�𡢿頧湛�諹�䠷��ế�鱏_this.timer�糓�炏摮睃銁�漤�滨蔭
              tempTimer = setTimeout(function () {
                  _this.setTime("resize");
                  clearTimeout(tempTimer);
                  tempTimer = null;
              }, 0);
          }
      });
  }
  $.fn.extend({
      ProgressTime: function (options) {
          window.progressTime = new ProgressTime(options);
      }
  });
}(jQuery, window));