---
title: earth套件貼上CAMS臭氧濃度
tags: CAMS earth python
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-08-03
modify_date: 2022-08-03 14:31:59
mermaid: true
---
## 背景
- 雖然臭氧是光化煙霧的重要指標，也是本土石化業與汽機車污染所影響的空品項目，然而[earth.nullschool][ens]或是[windy][windy]目前都沒有貼上臭氧濃度之實例，原因不明，可能並不是很多人這麼瞭解臭氧的指標意義吧。
- [ECWMF][ECWMF]的[CAMS][CAMS]全球空品預報有這個項目，解析度為0.4度每12小時更新，貼在背景1度的[GFS][GFS]風場，檔案小、反應快、有其便利性。
  - [CAMS][CAMS]有每半年更新的再分析數據、有近實時再分析、也有[空品預報數據][CAMS_FCST]，這三者雖然精確性以最後者最低，但時效性卻最高。
  - [CAMS][CAMS]與[GFS][GFS]數據之間需合併的項目如表所示

###   [CAMS][CAMS]與[GFS][GFS]數據之間需合併的項目

項目|[CAMS][CAMS]|[GFS][GFS]|說明
:-:|:-:|:-:|:-
空間解析度|0.4度|1度|2者解析度不能整除，還是需要進行內插
經度0度|沒有值|有值|前者必須另行自360度取值
更新頻率|12小時|6小時|需由不同的crontab腳本執行下載與處理
預報時間(leadtime_hour)|3小時|3小時|相同
官方圖面|[哥白尼網站](https://atmosphere.copernicus.eu/charts/cams/ozone-forecasts?facets=undefined&time=2022080300,3,2022080303&projection=classical_eastern_asia&layer_name=composition_o3_surface)|[NWS](https://digital.weather.gov/)|後者沒有展示美國以外地區預報結果


- 把下載與應用的流程自動化後，不僅可以提供檢視目前的氣流與光化煙霧跨境傳輸現象，也可以使高解析度空品即時模擬向前推動一大步。
### 色階的選擇
- [earth.nullschool][ens]chem的色階多應用在原生性污染物，其特性為少數高值，大多位置濃度均不高。用在濃度差異不大的空品項目圖面顏色將會太少。
- 參考[earth.nullschool][ens]的Particulates展現方式，基本上為一彩虹色階。

- 雖然背景臭氧濃度高低差異不是很大，但為了將來模式模擬解析度如果提高，會出現局部超高/超低濃度，彩虹色階會有較佳的表現。
- 也能接近[環保署官方網站](https://airtw.epa.gov.tw/)的展示方式。

## 數據下載與轉換
- 數據量雖然不大，但還需在[CAMS][CAMS]排隊等候下載，會需要一些時間(~20分鐘)。
### 數據下載
- 詳[歐洲中期天氣預報中心再分析數據之下載][EC_ReAna]
  - 對話網頁：[https://ads.atmosphere.copernicus.eu/cdsapp#!/dataset/cams-global-atmospheric-composition-forecasts?tab=form](https://ads.atmosphere.copernicus.eu/cdsapp#!/dataset/cams-global-atmospheric-composition-forecasts?tab=form)
- 以下為2022-08-01下載程式範例

```python
#kuang@master /nas1/ecmwf/CAMS/CAMS_global_atmospheric_composition_forecasts/2022
#$ cat get_O3.py
import cdsapi

c = cdsapi.Client()

c.retrieve(
    'cams-global-atmospheric-composition-forecasts',
    {
        'date': '2022-08-01/2022-08-01',
        'type': 'forecast',
        'format': 'grib',
        'time': '12:00',
        'pressure_level': '1000',
        'variable': [ 'ozone', ],
        'leadtime_hour': '0',
    },
    'ozone_globe.grib')
```
### 數據轉換
- [grb2json.py@github](https://github.com/sinotec2/Focus-on-Air-Quality/blob/main/AQana/GAQuality/ECMWF/grb2json.py)

- [CAMS][CAMS]檔案內容之讀取
  - [CAMS][CAMS]grib2檔案之y軸順序：自北向南(與[GFS][GFS]相同)
  - 因需與座標系統搭配以進行內插，此處將其翻轉以避免錯誤。

```python
fname=sys.argv[1]
grbs = pygrib.open(fname)
uv=['ozone', ]
atbs={'ozone': 'GEMS Ozone',}
for a in set(atbs):
  grb = grbs.select(name=atbs[a])
  cmd=a+'=grb[0].values'
  exec(cmd)
ozone=np.flip(ozone,axis=0)
```

- 使用griddata進行內插
  - [CAMS][CAMS]網格系統：`xyc`
  - [GFS][GFS]網格系統：`x1,y1`
  - [GFS][GFS]json檔案之y軸順序：自北向南(與[CAMS][CAMS]相同)

```python
for ir in range(nr):
  c = np.array([ozone[idx[0][i], idx[1][i]] for i in range(mp)])*2.e9
  zz = griddata(xyc, c[:], (x1, y1), method='cubic')
  gfs[ir]['data']=list(np.flip(np.where(zz!=zz,0,zz),axis=0).flatten())
```
- 執行結果放在/Users/Data/javascripts/D3js/earth/public/data/weather/current以利js程式讀取
- 結果檔名：current-wind-surface-level-gfs-1.0.json


## earth系統新增臭氧之讀取繪圖功能
### html程式
- 在下拉對話框增加貼上O3數據
  - 直接在氣象數據後面接上空品項目
  - 並不像[nullschool][ens]將污染項目分類，以減少程式修改。

```bash
#kuang@114-32-164-198 /Users/Data/javascripts/D3js/earth
#$ diff /Users/Data/javascripts/D3js/earthGFS/public/index.html public/index.html
104c104,105
<                 class="text-button" id="overlay-mean_sea_level_pressure" title="Mean Sea Level Pressure">MSLP</span>
---
>                 class="text-button" id="overlay-mean_sea_level_pressure" title="Mean Sea Level Pressure">MSLP</span> – <span
>                 class="text-button" id="overlay-ozone" title="GEMS Ozone">O3</span>
```

### product.js程式
- 程式參考溫度(temp)段落
- 色階也參考溫度的設定
  - 取消粉紅及青色(cyan)，顏色太過顯眼、彩度不足、也不是一般彩虹色階項目

```bash
#$ diff /Users/Data/javascripts/D3js/earthGFS/public/libs/earth/1.0.0/products.js public/libs/earth/1.0.0/products.js
401a408,453
>
>         "ozone": {
>             matches: _.matches({param: "wind", overlayType: "ozone"}),
>             create: function(attr) {
>                 return buildProduct({
>                     field: "scalar",
>                     type: "ozone",
>                     description: localize({
>                         name: {en: "GEMS Ozone", ja: "臭氧"},
>                         qualifier: {en: " @ " + describeSurface(attr), ja: " @ " + describeSurfaceJa(attr)}
>                     }),
>                     paths: [gfs1p0degPath(attr, "ozone", attr.surface, attr.level)],
>                     date: gfsDate(attr),
>                     builder: function(file) {
>                         var record = file[0], data = record.data;
>                         return {
>                             header: record.header,
>                             interpolate: bilinearInterpolateScalar,
>                             data: function(i) {
>                                 return data[i];
>                             }
>                         }
>                     },
>                     units: [
>                         {label: "ppb", conversion: function(x) { return x; }, precision: 3}
>                     ],
>                     scale: {
>                         bounds: [0, 500],
>                         gradient:
>                             µ.segmentedColorScale([
>                             [  0,  [37, 4, 42]],
>                             [ 30,     [41, 10, 130]],//purple blue
>                             [ 60,  [21, 84, 187]],   //blue
>                             [ 90,  [24, 132, 14]],   //green
>                             [120,  [247, 251, 59]], //yellow
>                             [150,  [235, 167, 21]],//
>                             [180,  [230, 71, 39]],
>                             [300,  [88, 27, 67]],
>                             [500,  [81, 40, 40]],//brown
>                             ])
>                     }
>                 });
>             }
>         },
>                             //[ 90,  [192, 37, 149]],  //pink
>                             //[120, [70, 215, 215]],  //cyan
```

## 結果討論
- 實例網址：[http://114.32.164.198/](http://114.32.164.198/)
- 數據提交earth系統之圖面

| ![wind_ozone.PNG](https://github.com/sinotec2/Focus-on-Air-Quality/raw/main/assets/images/wind_ozone.PNG) |
|:--:|
| <b>earth貼上臭氧濃度之色階應用(2022080112)</b>|

- 哥白尼官網之圖面(下拉選項，不能放大縮小)

| ![CAMS_ozone.PNG](https://github.com/sinotec2/Focus-on-Air-Quality/raw/main/assets/images/CAMS_ozone.PNG) |
|:--:|
| <b>同一時間哥白尼官網之圖面</b>|
- 前者高濃度較為明顯、後者限於13個濃度層級，數字對照較為清晰。
- 差異可能來源：雖同為地面濃度，但前者未校正空氣密度，在內陸高原地區造成高估


[ens]: <https://earth.nullschool.net/> "earth, a visualization of global weather conditions, forecast by supercomputers, updated every three hours"
[windy]: <https://www.windy.com/> "Windy是一家提供天氣預報服務的捷克公司，由伊沃·盧卡喬維奇於2014年11月創立。 Windy提供的天氣預報基於美國國家海洋和大氣管理局全球預報系統、歐洲中期天氣預報中心及瑞士NEMS模型的數據。"
[CAMS]: <https://en.wikipedia.org/wiki/Copernicus_Atmosphere_Monitoring_Service> "哥白尼大氣監測服務是由2014年11月11日啟動的歐洲中程天氣預報中心提供的一項服務，提供有關大氣成分的連續數據和信息。CAMS是哥白尼計劃的一部分， 它描述了當前情況，對未來幾天的情況進行了預測，並持續分析了近年來的回顧性數據記錄。 维基百科（英文)"
[ECWMF]: <https://zh.m.wikipedia.org/zh-tw/歐洲中期天氣預報中心> "歐洲中期天氣預報中心，創立於1975年，是一個國際組織，位於英格蘭雷丁。"
[EC_ReAna]: <https://sinotec2.github.io/Focus-on-Air-Quality/AQana/GAQuality/ECMWF/EC_ReAna/> "Focus-on-Air-Quality→AQ Data Analysis→Global AQ Data Analysis→ECMWF ReAnalysis→歐洲中期天氣預報中心再分析數據之下載"
[GFS]: <https://en.wikipedia.org/wiki/Global_Forecast_System> "全球預報系統 (GFS) 是一個全球數值天氣預報系統，包含由美國國家氣象局 (NWS) 運行的全球尺度氣象數值預報模式和變分分析。"
[CAMS_FCST]: <https://confluence.ecmwf.int/display/CKB/CAMS%3A+Global+atmospheric+composition+forecast+data+documentation> "CAMS: Global atmospheric composition forecast data documentation"