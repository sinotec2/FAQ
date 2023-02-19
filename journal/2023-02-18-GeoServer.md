---
layout: article
title: GeoServer之WMS建置
parent: GIS
grand_parent: utilities
nav_order: 99
date: 2023-02-18
last_modified_date: 2023-02-18 16:41:55
tags: GIS forecast graphics
aside:
  toc: true
sidebar:
  nav: layouts
---

## 背景

- GIS用作CMAQ或其他模式模擬結果的顯示界面，雖然有些大材小用，也有其應用上的必要性。如[GMOS SDI][1][^1]資訊架構、雲端網頁處理及服務系統[^2]、ICARUS DSS[^3]。
- GIService在提供遠端使用者地理資訊的過程中，為不可或缺的重要伺服器。常用的免費軟體有MapServer 及GeoServer2款。前者適用大型數據如NASA、後者則為中小型機構所愛用。
- GeoServer可以直接讀取自帶網格經緯度座標的no檔、也可以自nc 檔中地理座標相關屬性計算網格座標，並將格柵資訊、在指定範圍、指定解析度，進行圖磚製作，啟動WMS或向量檔的TMS服務，前者格式如png,jpeg,後者格式也包括了geojson等等。
- GeoServer基本上是平行化接受使用者（也包括本地圖磚製作）的呼叫，也可以限定平行作業的上限數。實則java只能使用一個核心。

## 下載與啟動

### install

- 通用[start.jar](https://sourceforge.net/projects/geoserver/files/GeoServer/2.22.1/geoserver-2.22.1-bin.zip)
- MacOS: brew install geoserver

### startup

- modify start.ini
  - Connector port to listen on:`jetty.http.port=8080`
  - Connector host/address to bind to:`jetty.http.host=125.229.149.182`

```bash
$ cat ~/MyPrograms/geoserver/geoserv.cs
n=$(ps -ef|grep start.jar|grep java|wc -l)
if ! [[ $n -eq 1 ]];then
  GEOSERVER_HOME=~/MyPrograms/geoserver/bin
  cd $GEOSERVER_HOME
  d=$(date +%Y%m%d)
  ./startup.sh >& $GEOSERVER_HOME/../logs/$d.log
fi
```

### crontab

```bash
# geoserver
0 * * * * ~/MyPrograms/geoserver/geoserv.cs
```

### authentication

- first time: admin/geoserver

## 重要工具

### nc2tiff

- [使用python对NetCDF数据批处理并生成Geotiff文件](https://blog.csdn.net/weixin_46629224/article/details/116087266)
- [netcdf geotiff java_R-NC格式数据转GeoTIFF](https://blog.csdn.net/weixin_33673142/article/details/114353375)

### 圖磚之產生

- [利用 gdal2tiles.py 來幫你切圖磚](https://3wa.tw/blog/blog.php?uid=shadow&id=1464&bk_id=16)

### 时间序列栅格数据

- [使用图像镶嵌插件组织并发布时间序列栅格数据](https://zhuanlan.zhihu.com/p/132388558?utm_id=0)

## leaflet.js 之呼叫

### xml parsing

http://localhost:8080/geoserver/wms?service=wms&
version=1.1.1&request=GetCapabilities

```html
...
{TileMatrixSet}

<ows:WGS84BoundingBox>
<ows:LowerCorner>-103.87100615361031 44.37021187004215</ows:LowerCorner>
<ows:UpperCorner>-103.62932676908186 44.50162561960653</ows:UpperCorner>
</ows:WGS84BoundingBox>

<TileMatrixSet>EPSG:900913</TileMatrixSet>
<TileMatrix>EPSG:900913:30</TileMatrix>

<ResourceURL format="image/jpeg" resourceType="tile" template="http://200.200.31.47:8080/geoserver/gwc/service/wmts/rest/sf:sfdem/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/jpeg"/>
```

- substute into index.js
  - {style} not def
  - {TileMatrixSet} = EPSG:900913
  - {TileMatrix} = EPSG:900913:30
  - {z}=30

### java

```java
var osm = L.tileLayer('http://200.200.31.47:8080/geoserver/gwc/service/wmts/rest/sf:sfdem/EPSG:900913/EPSG:900913:{z}/{y}/{x}?format=image/jpeg', {
            attribution: 'Map data &copy; 2013 OpenStreetMap contributors'
        });
        var map = L.map('map', {
            center: [44.4, -103.7,],
            zoom: 13
        }).addLayer(osm);
```

[^1]: Global Mercury Observation System Spatial Data Infrastructure (SDI)，in presentation of [Nicola Pirrone（2011）][1]
[^2]: Zhang, C., Di, L., Sun, Z., Lin, L., Yu, E., Gaigalas, J. (2019). Exploring cloud-based Web Processing Service: A case study on the implementation of CMAQ as a Service. [Environmental Modelling and Software][2] 113. https://doi.org/10.1016/j.envsoft.2018.11.019
[^3]: UPCOM, KARTEKO, ARTEMIS, AUTH (2021). Report on the design of technical framework and system architecture of the ICARUS DSS, WP7: Motivating citizens towards the vision in Integrated Climate forcing and Air Pollution Reduction in Urban Systems([ICURAS][3]).



[1]: https://www.earthobservations.org/documents/meetings/201111_geo8_eu/GMOS.Nicola%20Pirrone.pdf "Nicola Pirrone（2011）Global Mercury Observation SystemGlobal Mercury Observation System -- GMOS ––， Funded by: European Commission – DG Research， (2010 – 2015）"
[2]: https://www.researchgate.net/publication/329635993_Exploring_cloud-based_Web_Processing_Service_A_case_study_on_the_implementation_of_CMAQ_as_a_Service "(Zhang et al., 2019)"
[3]: https://icarus2020.eu/wp-content/uploads/2017/08/D.7.2_ICARUS_Design_of_%2520technical_framework_and_system_architecture_of_the_ICARUS_DSS_FINAL.pdf "Integrated Climate forcing and Air Pollution Reduction in Urban Systems"