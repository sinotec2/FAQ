---
layout: default
title: 地圖伺服器
parent: earth
grand_parent: Graphics
date: 2023-02-04 09:20:35
last_modified_date: 2023-02-04 09:20:35
tags: earth GFS CAMS graphics
---

# 地圖伺服器
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>
---


## 增量模擬

https://mapserver.org/tr/introduction.html#contents

https://download.osgeo.org/mapserver/docs/MapServer.pdf

### MapServer Itasca Demo Application

http://114.32.164.198/ms4w/Apache/htdocs/mapserv-demo.pkg.html
http://114.32.164.198/cgi-bin/
mapserv.exe?
layer=lakespy2&
layer=dlgstln2&
zoomsize=2&
map_web=+TEMPLATE+itasca_basic.html&
map=%2Fms4w%2Fapps%2Fmapserv-demo%2Fitasca.map&
program=%2Fcgi-bin%2Fmapserv.exe&
root=%2Fmapserv-demo%2F&
template=itasca_basic.html
http://114.32.164.198/cgi-bin/mapserv.exe?map=%2Fms4w_CGI_Viewer%2Fapps%2Fcgi-viewer%2Fmap%2Fcgi-demo.map&layers=bathymetry&zoomsize=2&zoomdir=1&map_size=600+400&
http://114.32.164.198/cgi-bin/mapserv.exe?
layer=lakespy2&layer=dlgstln2&zoomsize=2&map_web=+TEMPLATE+itasca_basic.html&map=%2Fms4w%2Fapps%2Fmapserv-demo%2Fitasca.map&program=%2Fcgi-bin%2Fmapserv.exe&root=%2Fmapserv-demo%2F&template=itasca_basic.html


http://114.32.164.198/cgi-bin/mapserv.exe?VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS&map=%2Fms4w%2Fapps%2Fmapserv-demo%2Fitasca.map&

```html
  $ cat ~/Downloads/mapserv\(1\).exe
<?xml version='1.0' encoding="UTF-8" standalone="no" ?>
<!DOCTYPE WMT_MS_Capabilities SYSTEM "http://schemas.opengis.net/wms/1.1.1/WMS_MS_Capabilities.dtd"
[
<!ELEMENT VendorSpecificCapabilities EMPTY>
]>  <!-- end of DOCTYPE declaration -->

<WMT_MS_Capabilities version="1.1.1">

<!-- MapServer version 7.6.2 OUTPUT=PNG OUTPUT=JPEG OUTPUT=KML SUPPORTS=PROJ SUPPORTS=AGG SUPPORTS=FREETYPE SUPPORTS=CAIRO SUPPORTS=ICONV SUPPORTS=WMS_SERVER SUPPORTS=WMS_CLIENT SUPPORTS=WFS_SERVER SUPPORTS=WFS_CLIENT SUPPORTS=WCS_SERVER SUPPORTS=SOS_SERVER SUPPORTS=FASTCGI SUPPORTS=GEOS SUPPORTS=POINT_Z_M SUPPORTS=PBF INPUT=JPEG INPUT=POSTGIS INPUT=OGR INPUT=GDAL INPUT=SHAPEFILE -->

<Service>
  <Name>OGC:WMS</Name>
  <Title>UMN MapServer Itasca Demo</Title>
  <Abstract>This is a UMN MapServer application for Itasca County located in north central Minnesota.</Abstract>
  <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/>
  <ContactInformation>
  </ContactInformation>
  <AccessConstraints>none</AccessConstraints>
</Service>

<Capability>
  <Request>
    <GetCapabilities>
      <Format>application/vnd.ogc.wms_xml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Post>
        </HTTP>
      </DCPType>
    </GetCapabilities>
    <GetMap>
      <Format>image/png</Format>
      <Format>image/jpeg</Format>
      <Format>image/png; mode=8bit</Format>
      <Format>image/vnd.jpeg-png</Format>
      <Format>image/vnd.jpeg-png8</Format>
      <Format>application/x-pdf</Format>
      <Format>image/svg+xml</Format>
      <Format>image/tiff</Format>
      <Format>application/vnd.google-earth.kml+xml</Format>
      <Format>application/vnd.google-earth.kmz</Format>
      <Format>application/x-protobuf</Format>
      <Format>application/json</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Post>
        </HTTP>
      </DCPType>
    </GetMap>
    <GetFeatureInfo>
      <Format>text/plain</Format>
      <Format>application/vnd.ogc.gml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Post>
        </HTTP>
      </DCPType>
    </GetFeatureInfo>
    <DescribeLayer>
      <Format>text/xml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Post>
        </HTTP>
      </DCPType>
    </DescribeLayer>
    <GetLegendGraphic>
      <Format>image/png</Format>
      <Format>image/jpeg</Format>
      <Format>image/png; mode=8bit</Format>
      <Format>image/vnd.jpeg-png</Format>
      <Format>image/vnd.jpeg-png8</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Post>
        </HTTP>
      </DCPType>
    </GetLegendGraphic>
    <GetStyles>
      <Format>text/xml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?"/></Post>
        </HTTP>
      </DCPType>
    </GetStyles>
  </Request>
  <Exception>
    <Format>application/vnd.ogc.se_xml</Format>
    <Format>application/vnd.ogc.se_inimage</Format>
    <Format>application/vnd.ogc.se_blank</Format>
  </Exception>
  <VendorSpecificCapabilities />
  <UserDefinedSymbolization SupportSLD="1" UserLayer="0" UserStyle="1" RemoteWFS="0"/>
  <Layer queryable="1">
    <Name>ITASCA</Name>
    <Title>UMN MapServer Itasca Demo</Title>
    <Abstract>This is a UMN MapServer application for Itasca County located in north central Minnesota.</Abstract>
    <SRS>EPSG:26915</SRS>
    <LatLonBoundingBox minx="388108" miny="5.20312e+06" maxx="500896" maxy="5.31024e+06" />
    <ScaleHint min="0.498902848429637" max="773.299415065937" />
    <Layer queryable="0" opaque="0" cascaded="0">
        <Name>drgs</Name>
        <Title>USGS 1:250,000 Digital Raster Graphic</Title>
        <Abstract>Hibbing and Bemidji quadrangles. See http://deli.dnr.state.mn.us/metadata/full/drgncim1.html for more information.</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="271882" miny="5.09056e+06" maxx="728115" maxy="5.32068e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="271882" miny="5.09056e+06" maxx="728115" maxy="5.32068e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=drgs"/>
        </MetadataURL>
        <Style>
          <Name>default</Name>
          <Title>default</Title>
          <LegendURL width="162" height="23">
             <Format>image/png</Format>
             <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?version=1.1.1&amp;service=WMS&amp;request=GetLegendGraphic&amp;layer=drgs&amp;format=image/png&amp;STYLE=default"/>
          </LegendURL>
        </Style>
    </Layer>
<!-- WARNING: This layer has its status set to DEFAULT and will always be displayed when doing a GetMap request even if it is not requested by the client. This is not in line with the expected behavior of a WMS server. Using status ON or OFF is recommended. -->
    <Layer queryable="0" opaque="0" cascaded="0">
        <Name>ctybdpy2</Name>
        <Title>County Boundary</Title>
        <Abstract>Itasca County boundary shapefile. See http://deli.dnr.state.mn.us/metadata/full/ctybdne2.html for more information.</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="189775" miny="4.81631e+06" maxx="761662" maxy="5.47241e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="189775" miny="4.81631e+06" maxx="761662" maxy="5.47241e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=ctybdpy2"/>
        </MetadataURL>
    </Layer>
    <Layer queryable="1">
      <Name>cities</Name>
<!-- WARNING: Mandatory metadata '..._GROUP_TITLE' was missing in this context. -->
      <Title>cities</Title>
      <Abstract>cities</Abstract>
    <Style>
       <Name>default</Name>
       <Title>default</Title>
       <LegendURL width="119" height="22">
          <Format>image/png</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?version=1.1.1&amp;service=WMS&amp;request=GetLegendGraphic&amp;layer=cities&amp;format=image/png&amp;STYLE=default"/>
       </LegendURL>
    </Style>
      <Layer queryable="1" opaque="0" cascaded="0">
        <Name>mcd90py2</Name>
        <Title>Minor Civil Divisions</Title>
        <Abstract>Minor civil divisions for Itasca County (boundaries only).</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="393234" miny="5.20799e+06" maxx="495770" maxy="5.30537e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="393234" miny="5.20799e+06" maxx="495770" maxy="5.30537e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=mcd90py2"/>
        </MetadataURL>
        <Style>
          <Name>default</Name>
          <Title>default</Title>
          <LegendURL width="119" height="22">
             <Format>image/png</Format>
             <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?version=1.1.1&amp;service=WMS&amp;request=GetLegendGraphic&amp;layer=mcd90py2&amp;format=image/png&amp;STYLE=default"/>
          </LegendURL>
        </Style>
      </Layer>
      <Layer queryable="0" opaque="0" cascaded="0">
        <Name>mcd90py2_anno</Name>
        <Title>Minor Civil Divisions</Title>
        <Abstract>Minor civil divisions for Itasca County (annotation only).</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="393234" miny="5.20799e+06" maxx="495770" maxy="5.30537e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="393234" miny="5.20799e+06" maxx="495770" maxy="5.30537e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=mcd90py2_anno"/>
        </MetadataURL>
      </Layer>
    </Layer>
    <Layer queryable="0" opaque="0" cascaded="0">
        <Name>twprgpy3</Name>
        <Title>Township Boundaries</Title>
        <Abstract>Pulic Land Survey (PLS) township boundaries for Itasca County. See http://deli.dnr.state.mn.us/metadata/full/twprgne2.html for more information.</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="393234" miny="5.20799e+06" maxx="495770" maxy="5.30537e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="393234" miny="5.20799e+06" maxx="495770" maxy="5.30537e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=twprgpy3"/>
        </MetadataURL>
        <Style>
          <Name>default</Name>
          <Title>default</Title>
          <LegendURL width="95" height="23">
             <Format>image/png</Format>
             <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?version=1.1.1&amp;service=WMS&amp;request=GetLegendGraphic&amp;layer=twprgpy3&amp;format=image/png&amp;STYLE=default"/>
          </LegendURL>
        </Style>
    </Layer>
    <Layer queryable="1" opaque="0" cascaded="0">
        <Name>lakespy2</Name>
        <Title>Lakes and Rivers</Title>
        <Abstract>DLG lake and river polygons for Itasca County. See http://deli.dnr.state.mn.us/metadata/full/dlglkpy2.html for more information.</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="393234" miny="5.20817e+06" maxx="495403" maxy="5.30396e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="393234" miny="5.20817e+06" maxx="495403" maxy="5.30396e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=lakespy2"/>
        </MetadataURL>
        <Style>
          <Name>default</Name>
          <Title>default</Title>
          <LegendURL width="120" height="22">
             <Format>image/png</Format>
             <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?version=1.1.1&amp;service=WMS&amp;request=GetLegendGraphic&amp;layer=lakespy2&amp;format=image/png&amp;STYLE=default"/>
          </LegendURL>
        </Style>
    </Layer>
    <Layer queryable="1" opaque="0" cascaded="0">
        <Name>dlgstln2</Name>
        <Title>Streams</Title>
        <Abstract>DLG streams for Itasca County. See http://deli.dnr.state.mn.us/metadata/full/dlgstln2.html for more information.</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="393381" miny="5.20799e+06" maxx="495758" maxy="5.30537e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="393381" miny="5.20799e+06" maxx="495758" maxy="5.30537e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=dlgstln2"/>
        </MetadataURL>
        <Style>
          <Name>default</Name>
          <Title>default</Title>
          <LegendURL width="82" height="22">
             <Format>image/png</Format>
             <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?version=1.1.1&amp;service=WMS&amp;request=GetLegendGraphic&amp;layer=dlgstln2&amp;format=image/png&amp;STYLE=default"/>
          </LegendURL>
        </Style>
    </Layer>
    <Layer>
      <Name>roads</Name>
<!-- WARNING: Mandatory metadata '..._GROUP_TITLE' was missing in this context. -->
      <Title>roads</Title>
      <Abstract>roads</Abstract>
    <Style>
       <Name>default</Name>
       <Title>default</Title>
       <LegendURL width="69" height="22">
          <Format>image/png</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?version=1.1.1&amp;service=WMS&amp;request=GetLegendGraphic&amp;layer=roads&amp;format=image/png&amp;STYLE=default"/>
       </LegendURL>
    </Style>
      <Layer queryable="0" opaque="0" cascaded="0">
        <Name>ctyrdln3</Name>
        <Title>County Roads</Title>
        <Abstract>County roads (lines only). Derived from MNDOT roads layer, see http://deli.dnr.state.mn.us/metadata/full/dotrdln2.html for more information.</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="393588" miny="5.208e+06" maxx="495770" maxy="5.30511e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="393588" miny="5.208e+06" maxx="495770" maxy="5.30511e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=ctyrdln3"/>
        </MetadataURL>
        <ScaleHint min="0" max="149.670854528891" />
      </Layer>
      <Layer queryable="0" opaque="0" cascaded="0">
        <Name>ctyrdln3_anno</Name>
        <Title>County Roads</Title>
        <Abstract>County roads (shields only). Derived from MNDOT roads layer, see http://deli.dnr.state.mn.us/metadata/full/dotrdln2.html for more information.</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="393588" miny="5.208e+06" maxx="495770" maxy="5.30511e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="393588" miny="5.208e+06" maxx="495770" maxy="5.30511e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=ctyrdln3_anno"/>
        </MetadataURL>
        <ScaleHint min="0" max="149.670854528891" />
      </Layer>
      <Layer queryable="0" opaque="0" cascaded="0">
        <Name>majrdln3</Name>
        <Title>Highways</Title>
        <Abstract>Highways- state, US and interstate (lines only). Derived from MNDOT roads layer, see http://deli.dnr.state.mn.us/metadata/full/dotrdln2.html for more information.</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="393732" miny="5.20809e+06" maxx="494784" maxy="5.30537e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="393732" miny="5.20809e+06" maxx="494784" maxy="5.30537e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=majrdln3"/>
        </MetadataURL>
        <Style>
          <Name>default</Name>
          <Title>default</Title>
          <LegendURL width="69" height="22">
             <Format>image/png</Format>
             <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?version=1.1.1&amp;service=WMS&amp;request=GetLegendGraphic&amp;layer=majrdln3&amp;format=image/png&amp;STYLE=default"/>
          </LegendURL>
        </Style>
        <ScaleHint min="0" max="299.341709057782" />
      </Layer>
      <Layer queryable="0" opaque="0" cascaded="0">
        <Name>majrdln3_anno</Name>
        <Title>Highways</Title>
        <Abstract>Highways- state, US and interstate (shields only). Derived from MNDOT roads layer, see http://deli.dnr.state.mn.us/metadata/full/dotrdln2.html for more information.</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="393732" miny="5.20809e+06" maxx="494784" maxy="5.30537e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="393732" miny="5.20809e+06" maxx="494784" maxy="5.30537e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=majrdln3_anno"/>
        </MetadataURL>
        <ScaleHint min="0" max="299.341709057782" />
      </Layer>
    </Layer>
    <Layer queryable="1" opaque="0" cascaded="0">
        <Name>airports</Name>
        <Title>Airports</Title>
        <Abstract>Airport runways for Itasca County.</Abstract>
        <SRS>EPSG:26915</SRS>
        <LatLonBoundingBox minx="434634" miny="5.22872e+06" maxx="496393" maxy="5.29193e+06" />
        <BoundingBox SRS="EPSG:26915"
                    minx="434634" miny="5.22872e+06" maxx="496393" maxy="5.29193e+06" />
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?request=GetMetadata&amp;layer=airports"/>
        </MetadataURL>
        <Style>
          <Name>default</Name>
          <Title>default</Title>
          <LegendURL width="79" height="23">
             <Format>image/png</Format>
             <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://localhost.localdomain/mapserver_demos/itasca/index.html?version=1.1.1&amp;service=WMS&amp;request=GetLegendGraphic&amp;layer=airports&amp;format=image/png&amp;STYLE=default"/>
          </LegendURL>
        </Style>
    </Layer>
  </Layer>
</Capability>
</WMT_MS_Capabilities>



wms1 magic parameters
http://114.32.164.198/cgi-bin/ttst?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=topp%3Astates&CRS=EPSG%3A3857&STYLES=&WIDTH=1904&HEIGHT=401&BBOX=-20311458.518718436%2C2607419.1060892367%2C-1682837.4812815618%2C6530778.893910764
capability
...
-<Layer queryable="1" opaque="0">
<Name>topp:states</Name>
<Title>states</Title>
<Abstract/>
-<KeywordList>
<Keyword>features</Keyword>
<Keyword>states</Keyword>
</KeywordList>
<SRS>EPSG:4326</SRS>
<LatLonBoundingBox maxy="49.371735" maxx="-66.969849" miny="24.955967" minx="-124.73142200000001"/>
<BoundingBox maxy="49.371735" maxx="-66.969849" miny="24.955967" minx="-124.73142200000001" SRS="EPSG:4326"/>
-<Style>
<Name>topp:population</Name>
<Title>Population in the United States</Title>
<Abstract>A sample filter that filters the United States into three categories of population, drawn in different colors</Abstract>
-<LegendURL height="80" width="84">
<Format>image/png</Format>
<OnlineResource xlink:href="https://ahocevar.com/geoserver/wms?request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=topp%3Astates" xlink:type="simple" xmlns:xlink="http://www.w3.org/1999/xlink"/>
</LegendURL>
</Style>
</Layer>

http://114.32.164.198/ms4w/Apache/htdocs/mapserver-cgi-viewer.pkg.html

http://114.32.164.198/ms4w/Apache/htdocs/zoo-project.pkg.html

Application downloads
https://ms4w.com/download.html

https://openlayers.org/en/latest/examples/wms-time.html
clean version
http://114.32.164.198/wms-time/index.html
The Open Geospatial Consortium, Inc (OGC) is a standards organization leading the development of geospatial and location based services. The OGC has adopted a number of specifications, some of which are used by the IEM. This page lists these services.
Iowa State University College of Ag Department of Agronomy
https://mesonet.agron.iastate.edu/ogc/
https://mesonet.agron.iastate.edu/
Web Map Service (WMS)

A WMS defines a protocol for web based retrieval of geodata in raster map format. If you are interested in the capabilities XML file, simply add "VERSION=1.1.1&REQUEST=GetCapabilities&SERVICE=WMS&" to the URI string.
* Historical CONUS NEXRAD Base Reflectivity [WMS-T] (n0r)
https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?

```html
<?xml version='1.0' encoding="UTF-8" standalone="no" ?>
<!DOCTYPE WMT_MS_Capabilities SYSTEM "http://schemas.opengis.net/wms/1.1.1/WMS_MS_Capabilities.dtd"
[
<!ELEMENT VendorSpecificCapabilities EMPTY>
]> <!-- end of DOCTYPE declaration -->

<WMT_MS_Capabilities version="1.1.1">

<!-- MapServer version 7.6.2 OUTPUT=PNG OUTPUT=JPEG SUPPORTS=PROJ SUPPORTS=AGG SUPPORTS=FREETYPE SUPPORTS=CAIRO SUPPORTS=ICONV SUPPORTS=FRIBIDI SUPPORTS=WMS_SERVER SUPPORTS=WMS_CLIENT SUPPORTS=WFS_SERVER SUPPORTS=WFS_CLIENT SUPPORTS=WCS_SERVER SUPPORTS=FASTCGI SUPPORTS=GEOS SUPPORTS=POINT_Z_M INPUT=JPEG INPUT=POSTGIS INPUT=OGR INPUT=GDAL INPUT=SHAPEFILE -->

<Service>
<Name>OGC:WMS</Name>
<Title>IEM WMS Service</Title>
<Abstract>IEM generated CONUS composite of NWS WSR-88D level III base reflectivity.</Abstract>
<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/>
<ContactInformation>
<ContactPersonPrimary>
<ContactPerson>Daryl Herzmann</ContactPerson>
<ContactOrganization>Iowa State University</ContactOrganization>
</ContactPersonPrimary>
</ContactInformation>
<AccessConstraints>None</AccessConstraints>
</Service>

<Capability>
<Request>
<GetCapabilities>
<Format>application/vnd.ogc.wms_xml</Format>
<DCPType>
<HTTP>
<Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
<Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
</HTTP>
</DCPType>
</GetCapabilities>
<GetMap>
<Format>image/png</Format>
<Format>image/jpeg</Format>
<Format>image/png; mode=8bit</Format>
<Format>image/vnd.jpeg-png</Format>
<Format>image/vnd.jpeg-png8</Format>
<Format>application/x-pdf</Format>
<Format>image/svg+xml</Format>
<Format>image/tiff</Format>
<Format>application/json</Format>
<DCPType>
<HTTP>
<Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
<Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
</HTTP>
</DCPType>
</GetMap>
<GetFeatureInfo>
<Format>text/plain</Format>
<Format>application/vnd.ogc.gml</Format>
<DCPType>
<HTTP>
<Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
<Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
</HTTP>
</DCPType>
</GetFeatureInfo>
<DescribeLayer>
<Format>text/xml</Format>
<DCPType>
<HTTP>
<Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
<Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
</HTTP>
</DCPType>
</DescribeLayer>
<GetLegendGraphic>
<Format>image/png</Format>
<Format>image/jpeg</Format>
<Format>image/png; mode=8bit</Format>
<Format>image/vnd.jpeg-png</Format>
<Format>image/vnd.jpeg-png8</Format>
<DCPType>
<HTTP>
<Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
<Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
</HTTP>
</DCPType>
</GetLegendGraphic>
<GetStyles>
<Format>text/xml</Format>
<DCPType>
<HTTP>
<Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
<Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
</HTTP>
</DCPType>
</GetStyles>
</Request>
<Exception>
<Format>application/vnd.ogc.se_xml</Format>
<Format>application/vnd.ogc.se_inimage</Format>
<Format>application/vnd.ogc.se_blank</Format>
</Exception>
<VendorSpecificCapabilities />
<UserDefinedSymbolization SupportSLD="1" UserLayer="0" UserStyle="1" RemoteWFS="0"/>
<Layer>
<Name>nexrad_base_reflect</Name>
<Title>IEM WMS Service</Title>
<Abstract>IEM generated CONUS composite of NWS WSR-88D level III base reflectivity.</Abstract>
<SRS>EPSG:4326</SRS>
<SRS>EPSG:900913</SRS>
<SRS>EPSG:102100</SRS>
<SRS>EPSG:3857</SRS>
<LatLonBoundingBox minx="-126" miny="24" maxx="-66" maxy="50" />
<BoundingBox SRS="EPSG:4326"
minx="-126" miny="24" maxx="-66" maxy="50" />
<ScaleHint min="44.9012563586673" max="2319.89824519781" />
<Layer queryable="0" opaque="0" cascaded="0">
<Name>time_idx</Name>
<Title>NEXRAD BASE REFLECT</Title>
<SRS>EPSG:4326</SRS>
<SRS>EPSG:900913</SRS>
<SRS>EPSG:102100</SRS>
<SRS>EPSG:3857</SRS>
<LatLonBoundingBox minx="-126" miny="24" maxx="-66" maxy="50" />
<BoundingBox SRS="EPSG:4326"
minx="-126" miny="24" maxx="-66" maxy="50" />
<Dimension name="time" units="ISO8601"/>
<Extent name="time" default="2006-06-23T03:10:00Z" nearestValue="0">1995-01-01/2021-12-31/PT5M</Extent>
<MetadataURL type="TC211">
<Format>text/xml</Format>
<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?request=GetMetadata&amp;layer=time_idx"/>
</MetadataURL>
</Layer>
<Layer queryable="0" opaque="0" cascaded="0">
<Name>nexrad-n0r-wmst</Name>
<Title>NEXRAD BASE REFLECT</Title>
<SRS>EPSG:4326</SRS>
<SRS>EPSG:900913</SRS>
<SRS>EPSG:102100</SRS>
<SRS>EPSG:3857</SRS>
<LatLonBoundingBox minx="-126" miny="24" maxx="-66" maxy="50" />
<BoundingBox SRS="EPSG:4326"
minx="-126" miny="24" maxx="-66" maxy="50" />
<Dimension name="time" units="ISO8601"/>
<Extent name="time" default="2006-06-23T03:10:00Z" nearestValue="0">1995-01-01/2021-12-31/PT5M</Extent>
<MetadataURL type="TC211">
<Format>text/xml</Format>
<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?request=GetMetadata&amp;layer=nexrad-n0r-wmst"/>
</MetadataURL>
</Layer>
</Layer>
</Capability>
</WMT_MS_Capabilities>     
```

### installations

- openlayer [tutorials](https://openlayers.org/en/latest/doc/tutorials/bundle.html)

```bash
npm init
npm install ol
npm install --save-dev parcel-bundler
create index.js/index.html etc
add scripts to package.json
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "parcel index.html",
"build": "parcel build --public-url . index.html"
},
npm start
npm run build
 copy the dist/ folder to your production server.
```

### map in js

```bash
$ grep -i map ./node_modules/ol/source/TileWMS.js ./node_modules/ol/src/source/TileWMS.js
./node_modules/ol/source/TileWMS.js: * example, MapServer has a `tile_map_edge_buffer` configuration parameter for
./node_modules/ol/source/TileWMS.js: * this. See http://mapserver.org/output/tile_mode.html.
./node_modules/ol/source/TileWMS.js: * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting
./node_modules/ol/source/TileWMS.js: * Use this instead of `url` when the WMS supports multiple urls for GetMap requests.
./node_modules/ol/source/TileWMS.js: case WMSServerType.MAPSERVER:
./node_modules/ol/source/TileWMS.js: params['MAP_RESOLUTION'] = 90 * pixelRatio;
./node_modules/ol/source/TileWMS.js: 'REQUEST': 'GetMap',
./node_modules/ol/source/TileWMS.js://# sourceMappingURL=TileWMS.js.map
./node_modules/ol/src/source/TileWMS.js: * example, MapServer has a `tile_map_edge_buffer` configuration parameter for
./node_modules/ol/src/source/TileWMS.js: * this. See http://mapserver.org/output/tile_mode.html.
./node_modules/ol/src/source/TileWMS.js: * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting
./node_modules/ol/src/source/TileWMS.js: * Use this instead of `url` when the WMS supports multiple urls for GetMap requests.
./node_modules/ol/src/source/TileWMS.js: case WMSServerType.MAPSERVER:
./node_modules/ol/src/source/TileWMS.js: params['MAP_RESOLUTION'] = 90 * pixelRatio;
./node_modules/ol/src/source/TileWMS.js: 'REQUEST': 'GetMap',
```

see [openlayers.org](https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html) and [demo](http://114.32.164.198/cgi-bin/mapserv.exe?map=%2Fms4w%2Fapps%2Fcgi-viewer%2Fmap%2Fcgi-demo.map&layers=all&zoomsize=2&zoomdir=1&map_size=600+400)

### overlay template

```bash
[demo](http://114.32.164.198/cgi-bin/mapserv.exe?mode=browse&
template=openlayers&
layer=lakespy2&
layer=dlgstln2&
map=/Library/WebServer/Documents/mapserv-demo/itasca.map)
```

### gdalinfo usage

```python
gdalinfo --format netcdf /vsicurl/http://114.32.164.198/camx_results/1609baseB.S.nc
```

## 將多維度NetCDF檔案轉換多個GeoTiff檔

`gdal_translate -a_srs EPSG:4326 -b Band_ID NETCDF_FileName.nc  -of ‘Gtiff’ Output_FileName.tif`

ex:

`gdal_translate  -a_srs EPSG:4326 -b 1 -of GTiff D:\GRUN_v1_GSWP3_WGS84_05_1902_2014.nc D:\1902-01-01.tif`

- WGS84經緯度（全球性資料，如：GPS） ＝> EPSG:4326(see[rchss.sinica.edu](http://gis.rchss.sinica.edu.tw/qgis/?p=4309))s

### How to convert NetCDF variables to GeoTIFF

`gdal_translate NETCDF:"Input_FileName.nc":variable_name Output_FileName.tif `

see nsidc.org [How to convert NetCDF variables to GeoTIFF](https://nsidc.org/support/how/how-convert-golive-netcdf-variables-geotiff)

```bash
gdal_translate NETCDF:"1609baseB.S.nc":O3 O3.tif
for i in {0..9} {10..84};do gdal_translate -of PNG -b $i o3.tif o3_${i}.png;done
convert o3_*.png -resize 600x600 -density 70 -quality 75 o3.gif
```

### gdaldem

- Usage:
  - To generate a shaded relief map from any GDAL-supported elevation raster

```bash
kuang@114-32-164-198 /Users/camxruns/2016_v7/outputs/con09
$ cat col.txt
0 black
10 blue
20 yellow
30 orange
40 red
50 white
pncgen -f uamiv 1609baseB.S.grd01 1609baseB.S.nc
gdal_translate NETCDF:"1609baseB.S.nc":PM25 PM25.tif
for i in {0..9};do gdaldem color-relief -of PNG -b $i PM25.tif col.txt PM_0${i}.png;done
for i in {10..84};do gdaldem color-relief -of PNG -b $i PM25.tif col.txt PM_${i}.png;done
convert PM_*.png -resize 600x600 -density 70 -quality 75 pm.gif
```
