---
title: earth nullschool套件讀取CWBWRF數據
tags: CWBWRF D3j
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-07-26
modify_date: 2022-07-26 09:28:51
mermaid: true
---
## diff of first paramter in gfs and cwbwrf_15Km files

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
 la1| 90|-5.693676|southern most
 resolution| 48|0

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


## modifications of js
### zoom limits
- from 3000 to 60,000
- function scaleExtent in file `./public/libs/earth/1.0.0/globes.js`

## source
- cambecc(2016)|earth building|launching and [etc](https://github.com/cambecc/earth). 
- cambecc(2017)|[grib2json](https://github.com/cambecc/grib2json)

### about HTTPS
- 詮力科技(2019)|[為您的網站加上「-ssl憑證-」，成為https網頁](https://blog.ite2.com/為您的網站加上「-ssl憑證-」，成為https網頁/)|十二月 13|2019/[技術探討](https://blog.ite2.com/category/technical-discussion-tw/)
- Mangle Kuo(2021)|[設定macOS本地端HTTPs/SSL證書](https://manglekuo.medium.com/設定macos本地端https-ssl證書-b2f79bcdedf0)
- Bharath(2021) [How to install the Securly SSL certificate on Mac OSX ?](https://support.securly.com/hc/en-us/articles/206058318-How-to-install-the-Securly-SSL-certificate-on-Mac-OSX-)|support.securly.com