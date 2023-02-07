---
layout: article
title: 時序地圖製作方式之選擇
parent: Recommend System
grand_parent: CMAQ Model System
nav_order: 99
date: 2023-02-07
last_modified_date: 2023-02-07 11:45:47
tags: forecast
aside:
  toc: true
sidebar:
  nav: layouts
---

## 背景

- 目前空品預報官方網頁
  - [歐洲哥白尼官網][CAMS_FCST]

  - UK Air Information Resource, [Air pollution forecast map](https://uk-air.defra.gov.uk/forecasting/) by Department for Environment Food & Rural Affairs and Met Office, UK
  - USA
    - EPA
      - [air now@cities](https://www.airnow.gov/?city=New%20York&state=NY&country=USA)
      - [AirNow Interactive Map of Air Quality, USA](https://gispub.epa.gov/airnow/?showgreencontours=false)
    - NASA GMAO[^2] forecasts
      - classic_geos_cf [preselective grads][cf][^1] and
      - dragable GeoTiff leaflet, "Interactive CF Map Tool" ([cf_map][fluid]), with
        - site historical and forecast time series [DATAGRAMS](https://fluid.nccs.nasa.gov/cf_map/gram/)
    - National Weather Service [Air Quality Forecast Guidance](https://airquality.weather.gov/), NOAA
  - Air Quality Health Index [most recent forecast values at provices and cities](https://weather.gc.ca/airquality/pages/index_e.html), Canada
  - city region
    - Spare the Air：[Air Quality Forecast](https://www.sparetheair.org/understanding-air-quality/air-quality-forecast), Bay Area Air Quality Management District, CA.
    - [sdapcd.org](https://www.sdapcd.org/content/sdapcd/air-quality/air-quality-forecast.html) by San Diego County Air Pollution Control District
    - [里加市](https://rigaairtext.lv/), 拉脫維亞
  - 環保署空氣品質監測網[全國各空品區空氣品質指標(AQI)預報](https://airtw.epa.gov.tw/CHT/Forecast/Forecast_3days.aspx)
- 民間空品預報
  - [日本大氣污染情報的網站](https://pm25.jp/)
  - [https://aqicn.org](https://aqicn.org/here/)
  - 中研院環境變遷研究中心[高解析度空氣品質診斷與預報模式發展計畫模擬預報資料](https://ci.taiwan.gov.tw/dsp/forcast_air.aspx)
  - 24-HOUR  and DAILY [AIR QUALITY FORECAST](https://www.accuweather.com/en/tw/taipei-city/315078/air-quality-index/315078) by AccuWeather.com
  - Air quality in Taiwan, Air quality index (AQI) and PM2.5 air pollution in Taiwan, [map](https://www.iqair.com/taiwan) and [globe](https://www.iqair.com/earth?nav=) by iqair.com.

## CGI 服務網頁之比較

### NASA GMAO classic_geos_cf

- 位置：https://fluid.nccs.nasa.gov/cf/classic_geos_cf/
- 連動選項(此4項使用同一個action POST)
  - field(污染項目)、
  - fcst(預報起始時間)、
  - tau(前置小時-顯示起始時間)
  - region(預先設定之地區)
- 動作選項
  - control_form：animate(1=連續播放或2=下載mp4檔案)

```html
<a href="/cf/classic_geos_cf/?
one_click=1&
tau=024&
stream=GEOSCFFC&
level=0&
region=nam&
fcst=20230205T120000&
field=no2sfc&
animate=1">
```

|![NASA GMAO 空品預報圖檔播放器](https://github.com/sinotec2/FAQ/raw/main/attachments/2023-02-07-15-28-29.png)|
|:-:|
|NASA GMAO 空品預報圖檔播放器|

- 共啟動8個外部.js
  - [slicknav](https://computerwolf.github.io/SlickNav/) is a responsive **mobile** menu plugin for jQuery.
  - [HAniS](https://www.ssec.wisc.edu/hanis/) - the HTML5 Image AnimationS webapp

```html
<script async="" src="https://www.google-analytics.com/analytics.js"></script>
<script src="/static/js/respond.js"></script>
<script src="/static/js/new_jquery.min.js"></script>
<script src="/static/js/jquery-ui.js"></script>
<script type="text/javascript" src="/static/js/hanis_min.js"> </script>
<script language="javascript" id="_fed_an_ua_tag" src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=NASA&subagency=GSFC&dclink=true"></script>
<!--  if 'gram' not in request.endpoint %}-->
<script src="/static/js/jquery.slicknav.js"></script>
<!--  else %}
  <script src="/static/js/jquery.slicknav_gram.js"></script>
   endif %}-->
<script src="/wxmaps/static/plots/ops-notice.js"></script>
```

- 內部js程式，啟動HAniS及slicknav相關模組
  
```java
<script>
      function setwin() {
        var head = document.getElementById("top-box");
        var nav = document.getElementById("menu-container");
        var foot = document.getElementById("footer");

        var newW = window.innerWidth - (nav.offsetLeft + nav.offsetWidth);
        var newH = window.innerHeight - foot.offsetHeight - head.offsetHeight;

        HAniS.setWindowSize(newW, newH);
      }
      window.addEventListener("resize", function() {
        setwin();
      },false);
      $(window).bind('resize', function(e)
      {
        if (window.RT) clearTimeout(window.RT);
        window.RT = setTimeout(function()
        {
          this.location.reload(false); /* false to get page from cache */ 
        }, 100);
      });
      function hloop(){
        HAniS.setup('bottom_controls\=startstop, step, refresh, looprock,speed, capture \n bottom_controls_style\=padding-top:20px;padding-right:5px;padding-bottom:20px;padding-left:5px;
         \n speed_labels\=Slower, Faster 
         \n dwell\=200ms \n pause\=2000 
         \n start_looping\=true 
         \n enable_smoothing=t 
         \n window_size=div 
         \n filenames\=/cf/static//plots/6fa2664a-288c-313a-a6af-67fd160fec32.png, ... /cf/static//plots/967b9e27-eb9a-3331-8b4f-04adea686227.png','handiv');
        setwin;
      };
      window.onload = hloop;
  </script>    
<script type="text/javascript">
    $(document).ready(function(){
      $("#menu").slicknav();
    });
  </script>    
```  

### NASA GMAO FLUID home

- 位置：https://fluid.nccs.nasa.gov/cf_map/index
- 點擊地圖或下拉選單觸發DATAGRAMS CGI選單畫面
- 由網頁取得資訊做為下一步html之內容
  - forecast_date, forecast_hour
  - cmp(Colormap Options, =[jet(青紅), plasma(黃紫), viridis(黃綠)])
  - national_dd(國家測點)、world_dd(其他國家測點)
  - aero_dd(各洲測點aeronet測點，africa/asia/aus/europe/na/sa_dd)
  - mc_dd:mega_city
  - ac_dd：ACTIVE CAMPAIGNS計畫測點，包括above(ABOVE)/ace(ACEPOL)/mosaic(MOSAIC)/or(ORACLES)/scoape(SCOAPE)/wecan(WE-CAN)
- leaflet.js + GeoTiff

- 共啟動11個外部.js
  - [esri leaflet API](https://developers.arcgis.com/esri-leaflet/)
  - [stuartmatthews/leaflet-geotiff](https://github.com/stuartmatthews/leaflet-geotiff),  plugin for displaying geoTIFF raster data, [geotiff and browserify](https://www.unpkg.com/browse/geotiff@1.0.0-beta.6/README.md) is generated during build-up process.
```html
<script src="/static/js/respond.js"></script>
<script src="/static/js/leaflet.js"></script>
<script src="/static/js/geotiff.browserify.js"></script>
<script src="/static/js/plotty.js"></script>
<script src="/static/js/leaflet-geotiff.js"></script>
<script src="/static/js/leaflet-geotiff-plotty.js"></script>
<script src="/static/js/leaflet-geotiff-vector-arrows.js"></script>
<script src="https://ihcantabria.github.io/Leaflet.CanvasLayer.Field/dist/leaflet.canvaslayer.field.js"></script>
<script src="https://unpkg.com/esri-leaflet@2.5.1/dist/esri-leaflet.js" integrity="sha512-q7X96AASUF0hol5Ih7AeZpRF6smJS55lcvy+GLWzJfZN+31/BQ8cgNx2FGF+IQSA4z2jHwB20vml+drmooqzzQ==" crossorigin=""></script>
<script src="/static/js/new_jquery3.min.js"></script>
<script src="/static/js/jquery.slicknav.js"></script>
```

- 內部js程式，啟動esri leaflet相關模組
  - see [custom.js](custom.js)

```java
  
```  

### NASA GMAO DATAGRAMS

- 位置
  - 未來5天預報：https://fluid.nccs.nasa.gov/cf_map/gram/
  - 指定起始日與日數之歷史數據：https://fluid.nccs.nasa.gov/cf_map/hist/
- 按照使用者指定之項目產生測站逐時空品與氣象時間序列圖檔如下

```html
<img src="/cf_map/static/plots/cf_map_grams/plots/2023-02-06T12:00:00.000000000/cf_surf_plot_pm25_23.0_120.25.png" alt="my_plot" style="width:100%;height:100%">
```

![](https://fluid.nccs.nasa.gov/cf_map/static/plots/cf_map_grams/plots/2023-02-06T12:00:00.000000000/cf_surf_plot_pm25_23.0_120.25.png)

## 比較leaflet插件方案

- 目前earth空間資料就是以geojson方式提供，在不同解析度可以有快取之方案，似乎具發展潛力。
- 目前leaflet的等值圖(heatmap)似乎不是很好，有顯著模糊化的缺點。可能是官方網站並未使用的原因，重要官方預報、衛星及回波仍是使用其他軟體內插或直接使用點陣圖、png似也有其必要性。
- 如果以非官方形式提供預報資訊，似乎精確度不應是重點，流暢性及方便性才是重點。

項目\提供形式|rasterWMS/png|geojson/cluster|說明
:-:|:-:|:-:|:-:
時間間距|短|中長|前者適合網格數據
解析度快取金字塔|無|有|會提升不同解析度顯示速度
顯示速度|慢|快|如果太慢會拉長總連線時間
應用範例|[L.TimeDimension][3]、[sliderControl][4]|[glify][1]、[GridCluster][2]|

### TimeDimension

|![TimeDimension](https://github.com/sinotec2/FAQ/raw/main/attachments/2023-02-07-09-31-04.png)|
|:-:|
|[TimeDimension][33]：Add time dimension capabilities on a Leaflet map.([demo site][3])|

### sliderControl

|![](https://github.com/sinotec2/FAQ/raw/main/attachments/2023-02-07-09-26-01.png)|
|:-:|
|[sliderControl][44]:Leaflet-WMS-Time-Slider from BobTorgerson([demo site][4])|

### glify

|![glify](https://github.com/sinotec2/FAQ/raw/main/attachments/2023-02-07-08-48-36.png)|
|:-:|
|[glify][11]:Fast rendering for large (+100MB) GeoJSON datasets with WebGL.([demo site][1])|

### GridCluster

|![GridCluster](https://github.com/sinotec2/FAQ/raw/main/attachments/2023-02-07-09-12-35.png)|
|:-:|
|[GridCluster][22]:Create grid-based clusters in realtime.([demo site][2])|

[1]: https://onaci.github.io/Leaflet.glify.layer/ "Fast rendering for large (+100MB) GeoJSON datasets with WebGL."
[11]: https://www.npmjs.com/package/leaflet.glify "web gl renderer plugin for leaflet in typescript"
[2]: http://andy-kay.github.io/Leaflet.GridCluster/ "Leaflet.GridCluster with animation"
[22]: https://github.com/andy-kay/Leaflet.GridCluster "This small plug-in allows you to cluster your point-shaped data in Leaflet using a grid-based cell structure. It can be useful for thematic mapping purposes, or to declutter icons."
[3]: https://apps.socib.es/Leaflet.TimeDimension/examples/example2.html "Leaflet TimeDimension example 2, Temperature from IBL Software Engineering"
[33]: https://apps.socib.es/Leaflet.TimeDimension/ "Socib Applications for modern web browsers and mobile platforms.: Add time dimension capabilities on a Leaflet map."
[4]: http://bobtorgerson.github.io/Leaflet-WMS-Time-Slider/ "Leaflet WMS Time Slider Example"
[44]: https://github.com/BobTorgerson/Leaflet-WMS-Time-Slider "The Leaflet WMS Time Slider enables you to dynamically update a WMS layer based on a dimension such as time. This tool uses the JQuery UI slider . For WMS layers where a range of time is more desirable than a single time step, two sliders appear to allow for a tailored time range to be created."
[CAMS_FCST]: https://confluence.ecmwf.int/display/CKB/CAMS%3A+Global+atmospheric+composition+forecast+data+documentation "CAMS: Global atmospheric composition forecast data documentation"
[cf]: https://fluid.nccs.nasa.gov/cf/classic_geos_cf/ "Composition Forecast Maps web site by NASA GMAO"
[fluid]: https://gmao.gsfc.nasa.gov/news/geos_system_news/2018/wx_viz_updated.php "GMAO's FLUID:  Visualizations are generated using an interactive Python-based framework named FLUID, developed within the GMAO."
[about]: https://fluid.nccs.nasa.gov/about/ "About GMAO FLUID(Framework for Live User-Invoked Data)"
[^1]: web site of [Composition Forecast Maps][cf], see FLUID(Framework for Live User-Invoked Data) [news][FLUID] and [about][about]
[^2]: The Global Modeling and Assimilation Office, Goddard Space Flight Center, [NASA](https://gmao.gsfc.nasa.gov/) 