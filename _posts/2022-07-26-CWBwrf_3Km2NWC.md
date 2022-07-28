---
title: earth套件讀取CWB_WRF數據
tags: CWBWRF D3j
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-07-26
modify_date: 2022-07-28 15:49:26
mermaid: true
---
## 背景
### 動機與目的
- 中央氣象局雖然每天進行[WRF數值預報][wrf_3km]，網路上卻沒有開發者使用來做氣流線等加值應用。雖然過去發展了[高解析度軌跡近5日預報](https://sinotec2.github.io/traj/)、[calpuff每日的預報](https://sinotec2.github.io/cpuff_forecast/)等等，卻還沒有嘗試以[earth.nullschool][ens]套件來加以延伸、展示。
- 除了每日、即時的展示之外，還有儲存、檢視的內部需求。相較[windy][windy]，[earth.nullschool][ens]可以按照使用者的需要，在url地址列簡單的指令，即可顯示過去特定時間的氣象與(或)濃度場。這個方案目前似乎是網路存取、檢視龐雜的氣象-空品模擬系統成果的最佳平台。

### [earth][ens]的發展與應用
- [earth][ens]套件是Cameron Beccario(cambecc)早期為[東京都環境局環境改善部][tkw]撰寫的套件，後來發展成全球的服務網站，同時也被大陸地方選擇做為[氣象預報可視化系統的設計項目][陈晖2016]。
- [ESRI][esri] 2017年也將其繼續發展成類似[油畫質感](http://esri.github.io/wind-js/)的動畫版本。
- 持續的商業版本除了[windy][windy]之外，[ventusky](https://www.ventusky.com/)也有類似的應用。
- [WebGL][webgl]控制方案與3D繪圖效果([webgl-wind](https://mapbox.github.io/webgl-wind/demo/) by [XXHolic, 2022][XXHolic])。

## 整體工作流程

```mermaid
graph TD
    A(CWB_WRF3Km U10V10_d03) --> B((uv10_json.py))
    C(json template) --> B
    B --> D(current-wind-surface-level-cwb-3K.json)
    D --> E((products.js))
    E --> F((web rendering))
```
- uv10_json.py
  - [source code](https://github.com/sinotec2/Focus-on-Air-Quality/blob/main/wind_models/cwbWRF_3Km/uv10_json.py)
  - [IO and program descriptions][uv10_json]
- [earth][ens]套件讀取gfs檔案的核心程式在[products.js](https://sinotec2.github.io/FAQ/2022/07/26/CWBwrf_3Km2NWC.html#filepath-function)，必須讓它能夠讀取cwb轉成的json檔。
  - 找到有關gfs的程式碼：`grep gfs $(find . -name "*.js")|more`
- web rendering
  - intializing by `node dev-server.js 80` or 
  - reload browser
  - d3：`http://114.32.164.198/#current/wind/surface/level/orthographic=-237.53,23.30,2000`
  - d1：`http://114.32.164.198/#current/wind/surface/level/orthographic=-236.33,23.30,800`

## diff of first paramter between gfs and cwbwrf_15Km files
- [earth][ens]套件與gfs檔案的連結靠的是[grib2json][g2j]這支程式，cambecc也將其公開在github上。其下載、編譯、與應用的細節歷程可以參考[FAQ->json][json]。
- 經由下列簡單的python指令，可以列出gfs與cwb二者grib檔案內容的差異，作為修改([uv10_json.py][uv10_json])的重要指引。

```python
fname='current-wind-surface-level-gfs-1.0.json'
with open(fname,'r') as fn:
  crnt=json.load(fn)
fname='M-A0061-006.grb2.json'
with open(fname,'r') as fn:
  cwb=json.load(fn)
c=set(cwb[0]['header'])
g=set(crnt[0]['header'])
a=[]
for i in c&g:a.append([i, crnt[0]['header'][i],cwb[0]['header'][i]])
```

### grib file

parameter|gfs|cwbwrf|desc.
-|:-:|:-:|-
length of json list|2|80|gfs is demo, cwb[70~71] are UV10
 productType| 1|2
 productTypeName|Forecast products|Analysis and Forecast products
 productStatus| 0|0
 productStatusName|Operational products|Operational products
 productDefinitionTemplate| 0|0
 productDefinitionTemplateName|Analysis/forecast at horizontal level/layer at a point in time|Analysis/forecast at horizontal level/layer at a point in time
 winds|true|true
 center| 7|0
 centerName|US National Weather Service - NCEP(WMC)|WMO Secretariat
 subcenter| 0|0
 parameterNumber| 2|5
 parameterNumberName|U-component_of_wind|Geopotential_height|first var.
 parameterCategory| 2|3
 parameterCategoryName|Momentum|Mass
 parameterUnit|m.s-1|gpm
 scanMode| 0|64
 gribLength| 131858|61081802
 gribEdition| 2|2
 discipline| 0|0
 disciplineName|Meteorological products|Meteorological products

### grid definition

parameter|gfs|cwbwrf|describe
-|:-:|:-:|-
 shape| 6|6
 shapeName|Earth spherical with radius of 6,371,229.0 m|Earth spherical with radius of 6,371,229.0 m
 gridDefinitionTemplate| 0|30
 gridDefinitionTemplateName|Latitude_Longitude|Lambert_Conformal  
 nx| 360|661
 ny| 181|385
 numberPoints| 65160|254485|=nx&times;ny
 gridUnits|degrees|m
 dx| 1|15000.0
 dy| 1|15000.0
 lo1| 0|78.02554|western most
 la1| 90|-5.693676|northern most
 lo2| 359|78.02554|eastern most
 la2| -90|-5.693676|southern most
 resolution| 48|0

- 所有的實數必須是64位元(np.float64(...))，否則在json.dump時會報錯。
- 緯度的方向是由高到低。雖然dy是給正值，但程式內部gfs[:]['data']的排序在y方向是由北到南，需對其軸進行[np.flip(...)](https://vimsky.com/zh-tw/examples/usage/python-numpy.flip.html)。可以由風速較低值的範圍與海陸界限加以檢視，形狀會南北相反。

```python
gfs[ir]['data']=list(np.flip(np.where(zz!=zz,0,zz),axis=0).flatten())
```

### surface

parameter|gfs|cwbwrf|desc
-|:-:|:-:|-
 surface1Type| 103|100
 surface1TypeName|Specified height level above ground|Isobaric surface| 11 levels from 100 to 1000 hPa, also 0, 2, 10 meter  
 surface1Value| 10|1e-128|gfs in m; cwb strenge unit = 100 hpa
 surface2Type| 255|255
 surface2TypeName|Missing|Missing
 surface2Value| 0|0.0

```python
set(surface1Value)
{0.0, 
1e-128, 1.5e-128, 2e-128, 2.5e-128, 3.e-128, 4e-128, 
5e-128, 7.e-128, 8.5e-128, 9.25e-128, 1e-127, 
2.0, 10.0}
```

### time frame

parameter|gfs|cwbwrf
-|:-:|:-:
 genProcessType| 2|2
 genProcessTypeName|Forecast|Forecast
forecastTime| 3|6
 significanceOfRT| 1|1
 significanceOfRTName|Start of forecast|Start of forecast
 refTime(eg)|2014-01-31T00:00:00.000Z|2021-10-11T06:00:00.000Z

## installation of [earth][ens]
### download and compile
- `git clone https://github.com/cambecc/earth.git` 
- `cd earth`
- `npm install`

### initialize the website
- node dev-server.js 8080 (or 80 for usual port)

## modifications of js
### zoom limits
- from 3000 to 60,000
- function scaleExtent in file `./public/libs/earth/1.0.0/globes.js`

### FilePath function
- 原本(`gfs1p0degPath`)指定檔名的函數，寫死一定要開`current-wind-surface-level-gfs-1.0.json`
  - 引數只提供`attr, type, surface, level`
- 增加`src, res` 2個引數，來源（gfs或cwb）與解析度(`'1p90', '15K', '3K'`)
- in file `./public/libs/earth/1.0.0/products.js`

## 成果檢討
### 3公里解析度範圍與流線場

| ![uv10_json.PNG](https://github.com/sinotec2/Focus-on-Air-Quality/raw/main/assets/images/uv10_json.PNG) |
|:--:|
| <b>2021070206中央氣象局WRF預報之地面風氣流線</b>| 
| ![gfs.PNG](https://github.com/sinotec2/Focus-on-Air-Quality/raw/main/assets/images/gfs2021070206.PNG) |
| <b>同時間的GFS地面風</b>| 

- CWB預報有颱風、GFS並沒有發現
- 很多地型效應、台灣東側背風渦漩、小島背風面較低風速等等現象，在CWB風場中都有展現。
- 內陸風場細節：GFS無法模擬

### TODO
- other timeframe, fields
- webGL controler
- fine resolution shape file
  - administrative boundies
  - isopleth for terrain elevation(geotiff to KML, KML to shape file)

## resource

### earth package and D3js implements
- cambecc(2016), [earth building, launching and etc](https://github.com/cambecc/earth) on GitHub. 
- cambecc(2017), [grib2json](https://github.com/cambecc/grib2json) on GitHub.
- Roger Veciana i Rovira(2018), [Drawing wind barbs with D3js from a GeoTIFF](https://bl.ocks.org/rveciana/206956c3e142040432c477d75b038749), on bl.ocks.org
- 陈晖, 范玉鑫, 陈杨,及 吴天亭(2016), [吉林省WRF模式数值预报可视化系统设计](https://m.fx361.com/news/2016/1119/9135816.html), 现代农业科技2016年4期.
- Kuan-Jung, Huang(2019), [透過 D3.js 調用外部資料集](https://mybaseball52.medium.com/d3-js-using-external-datasets-21f12cb386dc), mybaseball52.medium.com

### about GFS downloading
- curl command in Github
  - `curl "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.${YYYYMMDD}00" -o gfs.t00z.pgrb2.1p00.f000`  
- nomads website has been upgraded since cambecc released [earth][ens]. 
- curl command become:
  - `curl "https://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&dir=%2Fgfs.${YYYYMMDD}%2F00%2Fatmos"  -o gfs.t00z.pgrb2.1p00.f000`

item|cambecc, 2016|updates|desc
:-:|:-:|:-:|-
pl name|filter_gfs.pl| filter_gfs_1p00.pl|with resolutions
dir name|/gfs.${YYYYMMDD}00|/gfs.${YYYYMMDD}/00/atmos|actually no other choice
windows of LL|?|addative|may be omitted for global range
- 
### about HTTPS
- 詮力科技(2019),[為您的網站加上「-ssl憑證-」，成為https網頁](https://blog.ite2.com/為您的網站加上「-ssl憑證-」，成為https網頁/),十二月 13,2019/[技術探討](https://blog.ite2.com/category/technical-discussion-tw/)
- Mangle Kuo(2021),[設定macOS本地端HTTPs/SSL證書](https://manglekuo.medium.com/設定macos本地端https-ssl證書-b2f79bcdedf0)
- Bharath(2021) [How to install the Securly SSL certificate on Mac OSX ?](https://support.securly.com/hc/en-us/articles/206058318-How-to-install-the-Securly-SSL-certificate-on-Mac-OSX-),support.securly.com

### about json TypeError
- 咸魚(2020), [TypeError: Object of type 'float32' is not JSON serializable解决方案](https://blog.csdn.net/yitanjiong4414/article/details/105902697), blog.csdn.net

[wrf_3km]: <https://sinotec2.github.io/Focus-on-Air-Quality/wind_models/cwbWRF_3Km/> "中央氣象局WRF_3Km數值預報產品"
[ens]: <https://earth.nullschool.net/> "earth, a visualization of global weather conditions, forecast by supercomputers, updated every three hours"
[windy]: <https://www.windy.com/> "Windy是一家提供天氣預報服務的捷克公司，由伊沃·盧卡喬維奇於2014年11月創立。 Windy提供的天氣預報基於美國國家海洋和大氣管理局全球預報系統、歐洲中期天氣預報中心及瑞士NEMS模型的數據。"
[tkw]: <https://air.nullschool.net/> "東京都環境局環境改善部大気保全課, 東京都風速"
[陈晖2016]: <https://m.fx361.com/news/2016/1119/9135816.html> "陈晖, 范玉鑫, 陈杨,及 吴天亭(2016), 吉林省WRF模式数值预报可视化系统设计, 现代农业科技2016年4期."
[esri]: <https://zh.m.wikipedia.org/zh-tw/美國環境系統研究所公司> "美國環境系統研究所公司Environmental Systems Research Institute, Inc"
[webgl]: <https://zh.wikipedia.org/zh-tw/WebGL> "WebGL是一種JavaScript API，用於在不使用外掛程式的情況下在任何相容的網頁瀏覽器中呈現互動式2D和3D圖形。"
[XXHolic]: <https://developpaper.com/how-i-build-a-wind-map-with-webgl/> "How I build a wind map with webgl, 2022-2-12"
[uv10_json]: <https://sinotec2.github.io/FAQ/2022/07/27/uv10_json.html> "地面風wrfout檔轉json "
[g2j]: <https://github.com/cambecc/grib2json> "grib2json"
[json]: <https://sinotec2.github.io/Focus-on-Air-Quality/utilities/netCDF/netcdf2json/> "FAQ -> utilities -> netCDF -> grib2json"