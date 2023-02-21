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

### NetCDF plugin

- [How to install NetCDF plugin to GeoServer](https://gis.stackexchange.com/questions/342942/how-to-install-netcdf-plugin-to-geoserver)
- [How to install NetCDF plugin to GeoServer
](https://copyprogramming.com/howto/how-to-install-netcdf-plugin-to-geoserver)

```quote
There was an error trying to connect to store PM25.nc. Do you want to save it anyway?

Original exception error:

Failed to create reader from file:///nas2/cmaqruns/2022fcst/grid09/cctm.fcst/daily/PM25.nc and hints Hints: LENIENT_DATUM_SHIFT = true REPOSITORY = org.geoserver.catalog.CatalogRepository@44015fa4 FORCE_AXIS_ORDER_HONORING = http GRID_COVERAGE_FACTORY = GridCoverageFactory TILE_ENCODING = null COMPARISON_TOLERANCE = 1.0E-8 STYLE_FACTORY = StyleFactoryImpl FEATURE_FACTORY = org.geotools.feature.LenientFeatureFactoryImpl@646811d6 FILTER_FACTORY = FilterFactoryImpl EXECUTOR_SERVICE = java.util.concurrent.ThreadPoolExecutor@5434c827[Running, pool size = 0, active threads = 0, queued tasks = 0, completed tasks = 0] FORCE_LONGITUDE_FIRST_AXIS_ORDER = true
```

### UItool.jar

- [toolsUI-4.6.jar](https://www.gfd-dennou.org/arch/ucar/unidata/pub/netcdf-java/v4.6/toolsUI-4.6.jar)
- [toolsUI-5.5.3.jar](https://downloads.unidata.ucar.edu/netcdf-java/5.5.3/toolsUI-5.5.3.jar)
- ucar提供的工具。不適用m3 convention

### nc2tiff

- [使用python对NetCDF数据批处理并生成Geotiff文件](https://blog.csdn.net/weixin_46629224/article/details/116087266)
- [NetCDF to GeoTIFF using Python, Pratiman, 01 August 2020](https://pratiman-91.github.io/2020/08/01/NetCDF-to-GeoTIFF-using-Python.html)

```python
import xarray as xr
import rioxarray as rio

#Open the NetCDF
#Download the sample from https://www.unidata.ucar.edu/software/netcdf/examples/sresa1b_ncar_ccsm3-example.nc
ncfile = xr.open_dataset('sresa1b_ncar_ccsm3-example.nc')

#Extract the variable
pr = ncfile['pr']

#(Optional) convert longitude from (0-360) to (-180 to 180) (if required)
pr.coords['lon'] = (pr.coords['lon'] + 180) % 360 - 180
pr = pr.sortby(pr.lon)

#Define lat/long 
pr = pr.rio.set_spatial_dims('lon', 'lat')

#Check for the CRS
pr.rio.crs

#(Optional) If your CRS is not discovered, you should be able to add it like so:
pr.rio.set_crs("epsg:4326")

#Saving the file
pr.rio.to_raster("GeoTIFF.tif", driver="COG")
```

- [netcdf geotiff java_R-NC格式数据转GeoTIFF](https://blog.csdn.net/weixin_33673142/article/details/114353375)


```bash
TIFFReadDirectory: Warning, Unknown field with tag 34264 (0x85d8) encountered.
TIFFReadDirectory: Warning, Unknown field with tag 34735 (0x87af) encountered.
TIFFReadDirectory: Warning, Unknown field with tag 34736 (0x87b0) encountered.
TIFFReadDirectory: Warning, Unknown field with tag 34737 (0x87b1) encountered.
TIFFReadDirectory: Warning, Unknown field with tag 42112 (0xa480) encountered.
TIFF Directory at offset 0xc0 (192)
  Image Width: 92 Image Length: 131
  Tile Width: 512 Tile Length: 512
  Bits/Sample: 64
  Sample Format: IEEE floating point
  Compression Scheme: None
  Photometric Interpretation: min-is-black
  Samples/Pixel: 1
  Planar Configuration: single image plane
  Tag 34264: 0.030598,0.000000,0.000000,119.226797,0.000000,0.027813,0.000000,21.775621,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,1.000000
  Tag 34735: 1,1,0,7,1024,0,1,2,1025,0,1,1,2048,0,1,4326,2049,34737,7,0,2054,0,1,9102,2057,34736,1,1,2059,34736,1,0
  Tag 34736: 298.257224,6378137.000000
  Tag 34737: WGS 84|
  Tag 42112: <GDALMetadata>
  <Item name="DESCRIPTION" sample="0" role="description">pm</Item>
</GDALMetadata>
```

```bash
TIFFReadDirectory: Warning, Unknown field with tag 33550 (0x830e) encountered.
TIFFReadDirectory: Warning, Unknown field with tag 33922 (0x8482) encountered.
TIFFReadDirectory: Warning, Unknown field with tag 34735 (0x87af) encountered.
TIFFReadDirectory: Warning, Unknown field with tag 34737 (0x87b1) encountered.
TIFFReadDirectory: Warning, Unknown field with tag 42112 (0xa480) encountered.
TIFFReadDirectory: Warning, Unknown field with tag 42113 (0xa481) encountered.
=== TIFF directory 0 ===
TIFF Directory at offset 0x4d9ce (317902)
  Image Width: 634 Image Length: 477
  Tile Width: 256 Tile Length: 256
  Bits/Sample: 32
  Sample Format: IEEE floating point
  Compression Scheme: AdobeDeflate
  Photometric Interpretation: min-is-black
  Samples/Pixel: 1
  Planar Configuration: single image plane
  Tag 33550: 30.000000,30.000000,0.000000
  Tag 33922: 0.000000,0.000000,0.000000,589980.000000,4928010.000000,0.000000
  Tag 34735: 1,1,0,7,1024,0,1,1,1025,0,1,1,1026,34737,33,0,2049,34737,8,33,2054,0,1,9102,3072,0,1,26713,3076,0,1,9001
  Tag 34737: UTM Zone 13, Northern Hemisphere|clark66|
  GDAL Metadata: <GDALMetadata>
  <Item name="COLOR_TABLE_RULES_COUNT" sample="0">5</Item>
  <Item name="COLOR_TABLE_RULE_RGB_0" sample="0">0.000000e+000 1.000000e+003 255 255 255 0 255 0</Item>
  <Item name="COLOR_TABLE_RULE_RGB_1" sample="0">1.000000e+003 1.200000e+003 0 255 0 255 255 0</Item>
  <Item name="COLOR_TABLE_RULE_RGB_2" sample="0">1.200000e+003 1.400000e+003 255 255 0 255 127 0</Item>
  <Item name="COLOR_TABLE_RULE_RGB_3" sample="0">1.400000e+003 1.600000e+003 255 127 0 191 127 63</Item>
  <Item name="COLOR_TABLE_RULE_RGB_4" sample="0">1.600000e+003 2.000000e+003 191 127 63 0 0 0</Item>
</GDALMetadata>

  GDAL NoDataValue: -9.99999993381581251e+36
  Predictor: none 1 (0x1)
```

### 圖磚之產生

- [利用 gdal2tiles.py 來幫你切圖磚](https://3wa.tw/blog/blog.php?uid=shadow&id=1464&bk_id=16)

### 时间序列栅格数据

- [使用图像镶嵌插件组织并发布时间序列栅格数据](https://zhuanlan.zhihu.com/p/132388558?utm_id=0)
- [How to add date and time to a geotiff to enable time dimension in geoserver?](https://gis.stackexchange.com/questions/185200/how-to-add-date-and-time-to-a-geotiff-to-enable-time-dimension-in-geoserver)
  - Geoserver offers the Image Mosaic plugins, which allows either mosaicing or making time series. This pages shows how to build such a time series: http://docs.geoserver.org/latest/en/user/tutorials/imagemosaic_timeseries/imagemosaic_timeseries.html
  - Basically, it consists in having all the tif in a single repository, and creating at least two configuration files: timeregex.properties defining the rules for extracting the date from the filename, and indexer.properties indicating to geoserver how to create the index table. The third file is needed only to create entries in PostGIS (else geoserver will create a shapefile).
  - Creating a new datastore is quite straightforward. A time parameter can then be passed to the WMS to select a specific image.

### RESTful calling geoserver

- Importer REST API examples
  - Mass configuring a directory of shapefile
  - by [curl](https://docs.geoserver.org/latest/en/user/extensions/importer/rest_examples.html)

### publish a GeoTiff file in GeoServer with curl tool

- [gis.stackexchange(2018)](https://gis.stackexchange.com/questions/252004/unable-to-publish-a-geotiff-file-in-geoserver-with-curl-tool)
- create a coveragestore

```html
curl -u admin:geoserver -v -H 'Content-type: application/xml' -d \
'<coverageStore>\
  <name>input</name>\
  <workspace>LGHAP</workspace>\
  <enabled>true</enabled>\
  <type>GeoTIFF</type>\
  <url>/home/QGIS/Data/dtm/taiwan2.tiff</url>
  </coverageStore>' \
http://200.200.31.47:8080/geoserver/rest/workspaces/LGHAP/coveragestores
```

- put tiff

```bash
curl -u admin:geoserver -v -XPUT -H "Content-type: image/tiff"  \
--data-binary @taiwan2.tif   \
http://200.200.31.47:8080/geoserver/rest/workspaces/LGHAP/coveragestores/input
```

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

### Time Support in GeoServer WMS

- within a single Layer see [support](https://docs.geoserver.org/2.22.x/en/user/services/wms/time.html)
- may use relative time, and Reduced accuracy times

[1]: https://www.earthobservations.org/documents/meetings/201111_geo8_eu/GMOS.Nicola%20Pirrone.pdf "Nicola Pirrone（2011）Global Mercury Observation SystemGlobal Mercury Observation System -- GMOS ––， Funded by: European Commission – DG Research， (2010 – 2015）"
[2]: https://www.researchgate.net/publication/329635993_Exploring_cloud-based_Web_Processing_Service_A_case_study_on_the_implementation_of_CMAQ_as_a_Service "(Zhang et al., 2019)"
[3]: https://icarus2020.eu/wp-content/uploads/2017/08/D.7.2_ICARUS_Design_of_%2520technical_framework_and_system_architecture_of_the_ICARUS_DSS_FINAL.pdf "Integrated Climate forcing and Air Pollution Reduction in Urban Systems"