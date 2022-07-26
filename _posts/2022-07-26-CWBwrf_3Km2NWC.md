---
title: earth nullschool套件讀取CWBWRF_3Km數據
tags: CWBWRF_3Km D3j
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-07-26
modify_date: 2022-07-26 09:28:51
mermaid: true
---
## diff in gfs and cwbwrf

### grib file

parameter|gfs|cwbwrf
-|:-:|:-:
 productStatusName|Operational products|Operational products
 productStatus| 0|0
 productType| 1|2
 productDefinitionTemplate| 0|0
 productTypeName|Forecast products|Analysis and Forecast products
 winds|true|true
 subcenter| 0|0
 center| 7|0
 centerName|US National Weather Service - NCEP(WMC)|WMO Secretariat
 disciplineName|Meteorological products|Meteorological products
 parameterCategory| 2|3
 parameterUnit|m.s-1|gpm
 parameterNumber| 2|5
 parameterCategoryName|Momentum|Mass
 parameterNumberName|U-component_of_wind|Geopotential_height
 gribLength| 131858|61081802
 scanMode| 0|64
 gribEdition| 2|2
 discipline| 0|0

### grid definition

parameter|gfs|cwbwrf
-|:-:|:-:
 shape| 6|6
 gridDefinitionTemplateName|Latitude_Longitude|Lambert_Conformal
 gridDefinitionTemplate| 0|30
 shapeName|Earth spherical with radius of 6,371,229.0 m|Earth spherical with radius of 6,371,229.0 m
 gridUnits|degrees|m
 nx| 360|661
 ny| 181|385
 numberPoints| 65160|254485
 dx| 1|15000.0
 dy| 1|15000.0
 lo1| 0|78.02554
 la1| 90|-5.693676
 resolution| 48|0

### surface

parameter|gfs|cwbwrf
-|:-:|:-:
 surface1TypeName|Specified height level above ground|Isobaric surface  
 surface1Type| 103|100
 surface1Value| 10|1e-128
 surface2TypeName|Missing|Missing
 surface2Type| 255|255
 surface2Value| 0|0.0

### time frame
parameter|gfs|cwbwrf
-|:-:|:-:
 genProcessTypeName|Forecast|Forecast
 genProcessType| 2|2
forecastTime| 3|6
 significanceOfRTName|Start of forecast|Start of forecast
productDefinitionTemplateName|Analysis/forecast at horizontal level/layer at a point in time|Analysis/forecast at horizontal level/layer at a point in time
 refTime(eg)|2014-01-31T00:00:00.000Z|2021-10-11T06:00:00.000Z
 significanceOfRT| 1|1



## source
- cambecc(2016)|earth building|launching and [etc](https://github.com/cambecc/earth). 
- cambecc(2017)|[grib2json](https://github.com/cambecc/grib2json)

### about HTTPS
- 詮力科技(2019)|[為您的網站加上「-ssl憑證-」，成為https網頁](https://blog.ite2.com/為您的網站加上「-ssl憑證-」，成為https網頁/)|十二月 13|2019/[技術探討](https://blog.ite2.com/category/technical-discussion-tw/)
- Mangle Kuo(2021)|[設定macOS本地端HTTPs/SSL證書](https://manglekuo.medium.com/設定macos本地端https-ssl證書-b2f79bcdedf0)
- Bharath(2021) [How to install the Securly SSL certificate on Mac OSX ?](https://support.securly.com/hc/en-us/articles/206058318-How-to-install-the-Securly-SSL-certificate-on-Mac-OSX-)|support.securly.com