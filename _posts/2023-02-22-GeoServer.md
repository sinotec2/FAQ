---
layout: article
title: GeoServer之WMS建置
parent: GIS
grand_parent: utilities
nav_order: 99
date: 2023-02-22
last_modified_date: 2023-02-22 16:59:19
tags: GIS forecast graphics
aside:
  toc: true
sidebar:
  nav: layouts
---

## 背景

### 應用狀況

- GIS用作CMAQ或其他模式模擬結果的顯示界面，雖然有些大材小用，也有其應用上的必要性。
  - 如早期因為跨平台模式教學沒有適合的顯示軟體，而必須使用到QGIS來繪製等值圖。
  - 其他既有系統架構如[GMOS SDI][1][^1]資訊架構、雲端網頁處理及服務系統[^2]、ICARUS DSS[^3]等等，都是使用圖台服務系統成為模式及分析工具的案例。
- GIService在提供遠端使用者地理資訊的過程中，為不可或缺的重要伺服器。常用的免費軟體有[MapServer][MapServer] 及[GeoServer][GeoServer]等2款。前者適用大型數據如NASA就是其最早的支持者、後者則為中小型機構所愛用。
- GeoServer可以直接讀取自帶網格經緯度座標的nc檔
  - 目前運作的案例多為UCAR的[氣候檔案分析][ucar]以及[NetCDF Java][nc-jar]之toolsUI、
  - 也可以自nc檔中地理座標相關屬性計算網格座標，並將格柵資訊、在指定範圍、指定解析度，進行圖磚製作，啟動WMS或向量檔的TMS服務，前者格式如png,jpeg,後者格式也包括了geojson等等。
  - 尚無WRF、CMAQ等模式IO之應用。主要的理由是GIS系統的約定是LL網格系統，等間距的格柵檔案需要轉換格點系統(resampling or regrid)。

### 資源需求及限制

- GeoServer基本上是平行化接受使用者（也包括本地圖磚製作）的呼叫，使用超過一個以上的核心、也可以限定平行作業的上限數。實則java只是使用單一個pid進行運送，並沒有傳統同步運作的形式。
- 記憶體需求量大。
  - 以IMac 16GB記憶體而言，執行node.js再執行geoserver的start.jar，記憶體就可以達到8成，將會對其他記憶體較大的作業造成排擠。
  - 以node03 DEC工作站而言，平時記憶體最大6G、加上start.jar會再加上1.5G，對於夜間下載分析工作([get_all.cs](./2022-08-20-CMAQ_fcst.md))而言，平時記憶體(Cach)使用即超過9成，geoserver工作不適合放在夜間運作時段。

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

- How to install NetCDF plugin to GeoServer
- [gis.stackexchange](https://gis.stackexchange.com/questions/342942/how-to-install-netcdf-plugin-to-geoserver)
- [copyprogramming](https://copyprogramming.com/howto/how-to-install-netcdf-plugin-to-geoserver)
- 目前wrf/CMAQ等nc檔皆為等間距座標系統，不符合GIS之等經緯度系統(網格點的經緯度必須為1維)，無法應用。

```quote
There was an error trying to connect to store PM25.nc. Do you want to save it anyway?

Original exception error:

Failed to create reader from file:///nas2/cmaqruns/2022fcst/grid09/cctm.fcst/daily/PM25.nc and hints Hints: LENIENT_DATUM_SHIFT = true REPOSITORY = org.geoserver.catalog.CatalogRepository@44015fa4 FORCE_AXIS_ORDER_HONORING = http GRID_COVERAGE_FACTORY = GridCoverageFactory TILE_ENCODING = null COMPARISON_TOLERANCE = 1.0E-8 STYLE_FACTORY = StyleFactoryImpl FEATURE_FACTORY = org.geotools.feature.LenientFeatureFactoryImpl@646811d6 FILTER_FACTORY = FilterFactoryImpl EXECUTOR_SERVICE = java.util.concurrent.ThreadPoolExecutor@5434c827[Running, pool size = 0, active threads = 0, queued tasks = 0, completed tasks = 0] FORCE_LONGITUDE_FIRST_AXIS_ORDER = true
```

### toolsUI

- toolsUI是UCAR提供的NetCDF Java程式庫之一
- NetCDF Java 程式庫的目標在於實現數據的通用化，即通用數據模型（CDM），用於將 netCDF 文件與各種數據格式（例如 netCDF、HDF、GRIB）進行轉換對接。除了基本數據的訪問，CDM使用檔案中的 metadata（元數據、數據的描述信息）來提供更高層次的接口、充分使用檔案中的屬性數據，以便使用地球科學特定功能，特別是在座標空間中提供地理定位、和切割出特定空間的數據子集等。
- toolsUI-5.5.3.jar：[下載點](https://downloads.unidata.ucar.edu/netcdf-java/5.5.3/toolsUI-5.5.3.jar)
- 目前適用格式以[COARDS][COARDS]協定為主、不適用m3 convention。

### nc2tiff

- [使用python对NetCDF数据批处理并生成Geotiff文件](https://blog.csdn.net/weixin_46629224/article/details/116087266)
- [NetCDF to GeoTIFF using Python, Pratiman, 01 August 2020](https://pratiman-91.github.io/2020/08/01/NetCDF-to-GeoTIFF-using-Python.html)
- [nc2gtiff.py](https://github.com/sinotec2/Focus-on-Air-Quality/blob/main/utilities/GIS/nc2gtiff.py)，詳見[說明](https://sinotec2.github.io/Focus-on-Air-Quality/utilities/GIS/nc2gtiff/)
- [netcdf geotiff java_R-NC格式数据转GeoTIFF](https://blog.csdn.net/weixin_33673142/article/details/114353375)

- tiffinfo的差異
  - PM25.tiff

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

- sf:sfdem

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

- PM25.tiff圖形(詳[下述](#raster顏色的設定))


### 圖磚之產生

- [利用 gdal2tiles.py 來幫你切圖磚](https://3wa.tw/blog/blog.php?uid=shadow&id=1464&bk_id=16)

### 时间序列栅格数据

- [使用图像镶嵌插件组织并发布时间序列栅格数据](https://zhuanlan.zhihu.com/p/132388558?utm_id=0)
- [tutorial](https://docs.geoserver.org/latest/en/user/tutorials/imagemosaic_timeseries/imagemosaic_timeseries.html)
- [How to add date and time to a geotiff to enable time dimension in geoserver?](https://gis.stackexchange.com/questions/185200/how-to-add-date-and-time-to-a-geotiff-to-enable-time-dimension-in-geoserver)
  - Geoserver offers the Image Mosaic plugins, which allows either mosaicing or making time series. [This pages](http://docs.geoserver.org/latest/en/user/tutorials/imagemosaic_timeseries/imagemosaic_timeseries.html) shows how to build such a time series:
  - Basically, it consists in having all the tif in a single repository, and creating at least two configuration files:
    - **timeregex.properties** defining the rules for extracting the date from the filename, and
    - **indexer.properties** indicating to geoserver how to create the index table. 
    - The third file is needed only to create entries in PostGIS (else geoserver will create a shapefile).
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

## geoserver內部設定

- 雖然geoserver並不是為了展示成果，而是對外提供圖檔服務，然而檢視過程仍然需要使用正確的顏色設定。

### raster顏色的設定

- 基本上geoserver內raster等值區間、顏色等等、是由具有個別命名的style檔案所控制的。
- 由主畫面Data->Style進入`Manage the Styles published by GeoServer`，可以新增、刪除、產生、複製、上傳既有style、或直接修改既有的設定。
- raster範例如dem，格式為SLD(StyledLayerDescriptor)

```html
<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
  <NamedLayer>
    <Name>gtopo</Name>
    <UserStyle>
      <Name>dem</Name>
      <Title>Simple DEM style</Title>
      <Abstract>Classic elevation color progression</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <RasterSymbolizer>
            <Opacity>1.0</Opacity>
            <ColorMap>
              <ColorMapEntry color="#AAFFAA" quantity="0" label="values" />
              <ColorMapEntry color="#00FF00" quantity="1000"/>
              <ColorMapEntry color="#FFFF00" quantity="1200" label="values" />
              <ColorMapEntry color="#FF7F00" quantity="1400" label="values" />
              <ColorMapEntry color="#BF7F3F" quantity="1600" label="values" />
              <ColorMapEntry color="#000000" quantity="2000" label="values" />
            </ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
```

level|color|name
:-:|:-:|:-:
1|AAFFAA|Mint Green/淡綠色
2|00FF00|鮮绿色/綠色/Ford Green
3|FFFF00|Yellow/鮮黃
4|FF7F00|Dark Orange/橙色
5|BF7F3F|shade of brown/Brandy Punch
6|000000|Black/黑

![](https://github.com/sinotec2/FAQ/raw/main/attachments/2023-02-22-14-03-11.png)

## leaflet.js 之呼叫

### xml parsing

格式紀錄在GetCapabilities內：Welcome -> GeoServer Web Map Tile Service -> [WMTS](http://200.200.31.47:8080/geoserver/gwc/service/wmts?service=WMTS&version=1.1.1&request=GetCapabilities)(內部ip)

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
  - {style}：dem
  - {TileMatrixSet} = EPSG:900913
  - {TileMatrix} = EPSG:900913:30
  - {z}=30

### java

- demo instance sf:sfdem 

```java
var osm = L.tileLayer('http://200.200.31.47:8080/geoserver/gwc/service/wmts/rest/sf:sfdem/EPSG:900913/EPSG:900913:{z}/{y}/{x}?format=image/jpeg', {
            attribution: 'Map data &copy; 2013 OpenStreetMap contributors'
        });
        var map = L.map('map', {
            center: [44.4, -103.7,],
            zoom: 13
        }).addLayer(osm);
```

- AQM:newCV instance

```java
var osm = L.tileLayer('http://200.200.31.47:8080/geoserver/gwc/service/wmts/rest/AQM:newCV/AQM:PM25/EPSG:900913/EPSG:900913:{z}/{y}/{x}?format=image/png'
```

- 注意
  1. EPSG:4326似乎與leaflet不合，無法計算出正確的x,y值，必須使用EPSG:900913
  2. 中心點(lat,lon)必須精確到小數點1位，可以由geoserver->Tile Caching->Tile Layers之預覽由滑鼠得到。
  3. 測試之網頁：http://200.200.31.47/Leaflet.FileLayer/docs/a.html



### Time Support in GeoServer WMS

- within a single Layer see [support](https://docs.geoserver.org/2.22.x/en/user/services/wms/time.html)
- may use relative time, and Reduced accuracy times

### post a vector file on leaflet map

- How do I add my own map layers to Leaflet
- [Loading external GeoJSON file into Leaflet map?](https://gis.stackexchange.com/questions/68489/loading-external-geojson-file-into-leaflet-map)
- download[^5] `leaflet.ajax.min.js` to local dir. and invoked in html and index.js

```html
<script src="leaflet.ajax.min.js"></script>
```

```java
        var geojsonLayer = new L.GeoJSON.AJAX("COUNTY_MOI_1090820.geojson");
        var myStyle =
        {
        color: 'black',
            weight: 3
        };
        geojsonLayer.setStyle(myStyle).addTo(map);
```

- Notes
  1. setStyle seems useless
  2. (TODO) line color, line width, transparaency need further modifications
  3. (TODO) mouse hovers and clicks may be further defined.

[^1]: Global Mercury Observation System Spatial Data Infrastructure (SDI)，in presentation of [Nicola Pirrone（2011）][1]
[^2]: Zhang, C., Di, L., Sun, Z., Lin, L., Yu, E., Gaigalas, J. (2019). Exploring cloud-based Web Processing Service: A case study on the implementation of CMAQ as a Service. [Environmental Modelling and Software][2] 113. https://doi.org/10.1016/j.envsoft.2018.11.019
[^3]: UPCOM, KARTEKO, ARTEMIS, AUTH (2021). Report on the design of technical framework and system architecture of the ICARUS DSS, WP7: Motivating citizens towards the vision in Integrated Climate forcing and Air Pollution Reduction in Urban Systems([ICURAS][3]).
[^5]: Calvin Metcalf(2016) leaflet-ajax, download [site][5]

![](https://github.com/sinotec2/FAQ/raw/main//attachments/2023-02-22-16-37-37.png){:width="360px"}

[1]: https://www.earthobservations.org/documents/meetings/201111_geo8_eu/GMOS.Nicola%20Pirrone.pdf "Nicola Pirrone（2011）Global Mercury Observation SystemGlobal Mercury Observation System -- GMOS ––， Funded by: European Commission – DG Research， (2010 – 2015）"
[2]: https://www.researchgate.net/publication/329635993_Exploring_cloud-based_Web_Processing_Service_A_case_study_on_the_implementation_of_CMAQ_as_a_Service "(Zhang et al., 2019)"
[3]: https://icarus2020.eu/wp-content/uploads/2017/08/D.7.2_ICARUS_Design_of_%2520technical_framework_and_system_architecture_of_the_ICARUS_DSS_FINAL.pdf "Integrated Climate forcing and Air Pollution Reduction in Urban Systems"
[5]: https://raw.githubusercontent.com/calvinmetcalf/leaflet-ajax/master/dist/leaflet.ajax.min.js "calvinmetcalf/leaflet-ajax @ github "
[MapServer]: https://zh.wikipedia.org/zh-tw/MapServer "MapServer 是一個開放原始碼的開發環境，用於建立空間網際網路應用。它可以作為 CGI 程式或通過 MapScript 執行。MapScript 支援數種程式語言（通過SWIG)。MapServer 由明尼蘇達大學開發。它的開發最初由 NASA 支援，以使其衛星影像開放給公眾。[3]"
[GeoServer]: https://zh.wikipedia.org/zh-tw/GeoServer "在計算領域，GeoServer是一個用Java編寫的開源伺服器，它允許用戶共享、處理和編輯地理空間數據。為了互操作性而設計，它使用開源標準發布來自任何主要空間數據源的數據。GeoServer已經發展成為一種將現有信息與Google地球、NASA World Wind等虛擬地球儀以及OpenLayers、Leaflet、Google地圖和必應地圖等基於網絡的地圖連接起來的簡單方法。GeoServer的功能是開放地理空間協會Web要素服務（WFS）標準的參考實現，同時也實現了Web地圖服務（WMS）、Web覆蓋服務（WCS）和Web地理信息處理服務（WPS）規範。[2]"
[ucar]: https://wiki.ucar.edu/display/ral/GOES16+-+George's+Notes#GOES16George'sNotes-GeoServer "The NetCDF plugin for GeoServer supports gridded NetCDF files having dimensions following the COARDS convention (custom, Time, Elevation, Lat, Lon)."
[nc-jar]: https://www.unidata.ucar.edu/software/netcdf-java/ "The NetCDF Java library implements the Common Data Model (CDM) to interface netCDF files to a variety of data formats (e.g., netCDF, HDF, GRIB). Layered above the basic data access, the CDM uses the metadata contained in datasets to provide a higher-level interface to geoscience specific features of datasets, in particular, providing geolocation and data subsetting in coordinate space."
[COARDS]: https://ferret.pmel.noaa.gov/Ferret/documentation/coards-netcdf-conventions "Conventions for the standardization of NetCDF files. Sponsored by the Cooperative Ocean/Atmosphere Research Data Service , a NOAA/university cooperative for the sharing and distribution of global atmospheric and oceanographic research data sets, Pacific Marine Environmental Laboratory, Ferret Support, NOAA, 09/25/2020 - 10:15"
