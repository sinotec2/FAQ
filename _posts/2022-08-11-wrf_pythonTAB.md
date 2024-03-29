---
title: wrf-python getvar
tags: python
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date: 2022-08-11
modify_date: 2022-08-11 10:15:52
---

## 變數定義
- wrf-python最強項的功能除了繪圖之外，就屬[getvar](https://wrf-python.readthedocs.io/en/latest/user_api/generated/wrf.getvar.html)函數及其內插程式。
- 引數：`(wrfin, varname, timeidx=0, method='cat', squeeze=True, cache=None, meta=True, **kwargs)`
  - `wrfin`: wrf檔案名稱。以`netCDF4.Dataset()`開啟。
  - `varnam`: wrf-python使用的變數名稱(詳下表)，**不是**wrfout檔案的變數名稱。為區別二者，前者用小寫，後者在ncf檔案中是大寫。
  - `timeidx`: 時間序，0～nt-1
  - `method`: 時間軸是否壓縮。`'cat'`:保持時間軸（內設）；`'join'`:聯合(壓縮)時間軸
  - `squeeze`: 如維度僅有一層在輸出矩陣的shape中是否予以去除？內設為`True`。
  - `cache`: 將程式中反覆使用的變數暫存成矩陣名稱（`varnam:ndarray`），以避免反覆讀取、增加執行效能，內設為`None`。
  - `meta`: 是否附帶數據的重要資訊（如座標等）。內設是`True`。
  - `Additional Keyword Arguments`: 每個變數不太相同，詳下列表格。
    - 如果只有一種單位，就**不能**使用`units`選項。
- 輸出
  - `getvar`會按照新變數定義的意義輸出成帶座標系統(`meta`)的矩陣。
- 原表格按照字母順序排列，以下按照變數類別分類。

## Dimensions and Terran
### lat, lon, time

<table border="1" class="docutils">
<colgroup>
<col width="8%" />
<col width="24%" />
<col width="11%" />
<col width="58%" />
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Variable Name</th>
<th class="head">Description</th>
<th class="head">Available Units</th>
<th class="head">Additional Keyword Arguments</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-odd"><td>lat</td>
<td>Latitude</td>
<td>decimal degrees</td>
<td>&#160;</td>
</tr>
<tr class="row-even"><td>lon</td>
<td>Longitude</td>
<td>decimal degrees</td>
<td>&#160;</td>
</tr>
<tr class="row-odd"><td>times</td>
<td>Times in the File or Sequence</td>
<td>&#160;</td>
<td>&#160;</td>
</tr>
<tr class="row-even"><td>xtimes</td>
<td><p class="first">XTIME Coordinate</p>
<p class="last">(if applicable)</p>
</td>
<td><p class="first">minutes since</p>
<p>start of</p>
<p class="last">model run</p>
</td>
<td>&#160;</td>
</tr>
</tbody>
</table>

### Height
<table border="1" class="docutils">
<colgroup>
<col width="8%" />
<col width="24%" />
<col width="11%" />
<col width="58%" />
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Variable Name</th>
<th class="head">Description</th>
<th class="head">Available Units</th>
<th class="head">Additional Keyword Arguments</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-even"><td>ter</td>
<td>Model Terrain Height</td>
<td><p class="first">m</p>
<p>km</p>
<p>dm</p>
<p>ft</p>
<p class="last">mi</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m’</em>.</td>
</tr>
<tr class="row-odd"><td>z/height</td>
<td>Model Height for Mass Grid</td>
<td><p class="first">m</p>
<p>km</p>
<p>dm</p>
<p>ft</p>
<p class="last">mi</p>
</td>
<td><p class="first"><strong>msl</strong> (boolean): Set to False to return AGL values. True is for MSL.  Default is <em>True</em>.</p>
<p class="last"><strong>units</strong> (str) : Set to desired units. Default is <em>‘m’</em>.</p>
</td>
</tr>
<tr class="row-even"><td>height_agl</td>
<td>Model Height for Mass Grid (AGL)</td>
<td><p class="first">m</p>
<p>km</p>
<p>dm</p>
<p>ft</p>
<p class="last">mi</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m’</em>.</td>
</tr>
<tr class="row-odd"><td>zstag</td>
<td>Model Height for Vertically Staggered Grid</td>
<td><p class="first">m</p>
<p>km</p>
<p>dm</p>
<p>ft</p>
<p class="last">mi</p>
</td>
<td><p class="first"><strong>msl</strong> (boolean): Set to False to return AGL values. True is for MSL.  Default is <em>True</em>.</p>
<p class="last"><strong>units</strong> (str) : Set to desired units. Default is <em>‘m’</em>.</p>
</td>
</tr>
</tbody>
</table>

## First order physics
### Temperatures
<table border="1" class="docutils">
<colgroup>
<col width="8%" />
<col width="24%" />
<col width="11%" />
<col width="58%" />
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Variable Name</th>
<th class="head">Description</th>
<th class="head">Available Units</th>
<th class="head">Additional Keyword Arguments</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-odd"><td>eth/theta_e</td>
<td>Equivalent Potential Temperature</td>
<td><p class="first">K</p>
<p>degC</p>
<p class="last">degF</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘K’</em>.</td>
</tr>
<tr class="row-even"><td>ctt</td>
<td>Cloud Top Temperature</td>
<td><p class="first">degC</p>
<p>K</p>
<p class="last">degF</p>
</td>
<td><p class="first"><strong>fill_nocloud</strong> (boolean): Set to True to use fill values for cloud free regions rather than surface temperature. Default is <em>False</em>.</p>
<p><strong>missing</strong> (float): The fill value to use when <em>fill_nocloud</em> is True.</p>
<p><strong>opt_thresh</strong> (float): The optical depth required to trigger the cloud top temperature calculation. Default is 1.0.</p>
<p class="last"><strong>units</strong> (str) : Set to desired units. Default is <em>‘degC’</em>.</p>
</td>
</tr>
<tr class="row-odd"><td>T2</td>
<td>2m Temperature</td>
<td>K</td>
<td>&#160;</td>
</tr>
<tr class="row-odd"><td>td2</td>
<td>2m Dew Point Temperature</td>
<td><p class="first">degC</p>
<p>K</p>
<p class="last">degF</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘degC’</em>.</td>
</tr>
<tr class="row-even"><td>td</td>
<td>Dew Point Temperature</td>
<td><p class="first">degC</p>
<p>K</p>
<p class="last">degF</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘degC’</em>.</td>
</tr>
<tr class="row-odd"><td>tc</td>
<td>Temperature in Celsius</td>
<td>degC</td>
<td>&#160;</td>
</tr>
<tr class="row-even"><td>th/theta</td>
<td>Potential Temperature</td>
<td><p class="first">K</p>
<p>degC</p>
<p class="last">degF</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘K’</em>.</td>
</tr>
<tr class="row-odd"><td>temp</td>
<td>Temperature (in specified units)</td>
<td><p class="first">K</p>
<p>degC</p>
<p class="last">degF</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘K’</em>.</td>
</tr>
<tr class="row-even"><td>tk</td>
<td>Temperature in Kelvin</td>
<td>K</td>
<td>&#160;</td>
</tr>
<tr class="row-odd"><td>tv</td>
<td>Virtual Temperature</td>
<td><p class="first">K</p>
<p>degC</p>
<p class="last">degF</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘K’</em>.</td>
</tr>
<tr class="row-even"><td>twb</td>
<td>Wet Bulb Temperature</td>
<td><p class="first">K</p>
<p>degC</p>
<p class="last">degF</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘K’</em>.</td>
</tr>
</tbody>
</table>

### Pressures
<table border="1" class="docutils">
<colgroup>
<col width="8%" />
<col width="24%" />
<col width="11%" />
<col width="58%" />
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Variable Name</th>
<th class="head">Description</th>
<th class="head">Available Units</th>
<th class="head">Additional Keyword Arguments</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-even"><td>p/pres</td>
<td><p class="first">Full Model Pressure</p>
<p class="last">(in specified units)</p>
</td>
<td><p class="first">Pa</p>
<p>hPa</p>
<p>mb</p>
<p>torr</p>
<p>mmhg</p>
<p class="last">atm</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘Pa’</em>.</td>
</tr>
<tr class="row-odd"><td>pressure</td>
<td>Full Model Pressure (hPa)</td>
<td>hPa</td>
<td>&#160;</td>
</tr>
<tr class="row-even"><td>slp</td>
<td>Sea Level Pressure</td>
<td><p class="first">hPa</p>
<p>hPa</p>
<p>mb</p>
<p>torr</p>
<p>mmhg</p>
<p class="last">atm</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘hPa’</em>.</td>
</tr>
</tbody>
</table>

## Second order physics

### Velocities
<table border="1" class="docutils">
<colgroup>
<col width="8%" />
<col width="24%" />
<col width="11%" />
<col width="58%" />
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Variable Name</th>
<th class="head">Description</th>
<th class="head">Available Units</th>
<th class="head">Additional Keyword Arguments</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-odd"><td>omg/omega</td>
<td>Omega(<a href="https://en.wikipedia.org/wiki/Omega_equation">wiki</a>, <a href="https://earthscience.stackexchange.com/questions/8255/what-is-the-difference-between-w-wind-vertical-p-velocity-and-omega">earthscience</a>)</td>
<td>Pa s-1</td>
<td>&#160;</td>
</tr>
<tr class="row-even"><td>ua</td>
<td>U-component of Wind on Mass Points</td>
<td><p class="first">m s-1</p>
<p>km h-1</p>
<p>mi h-1</p>
<p>kt</p>
<p class="last">ft s-1</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m s-1’</em>.</td>
</tr>
<tr class="row-odd"><td>va</td>
<td>V-component of Wind on Mass Points</td>
<td><p class="first">m s-1</p>
<p>km h-1</p>
<p>mi h-1</p>
<p>kt</p>
<p class="last">ft s-1</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m s-1’</em>.</td>
</tr>
<tr class="row-even"><td>wa</td>
<td>W-component of Wind on Mass Points</td>
<td><p class="first">m s-1</p>
<p>km h-1</p>
<p>mi h-1</p>
<p>kt</p>
<p class="last">ft s-1</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m s-1’</em>.</td>
</tr>
<tr class="row-odd"><td>uvmet10</td>
<td><p class="first">10 m U and V Components of Wind</p>
<p class="last">Rotated to Earth Coordinates</p>
</td>
<td><p class="first">m s-1</p>
<p>km h-1</p>
<p>mi h-1</p>
<p>kt</p>
<p class="last">ft s-1</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m s-1’</em>.</td>
</tr>
<tr class="row-even"><td>uvmet</td>
<td><p class="first">U and V Components of Wind</p>
<p class="last">Rotated to Earth Coordinates</p>
</td>
<td><p class="first">m s-1</p>
<p>km h-1</p>
<p>mi h-1</p>
<p>kt</p>
<p class="last">ft s-1</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m s-1’</em>.</td>
</tr>
<tr class="row-odd"><td>wspd_wdir</td>
<td><p class="first">Wind Speed and Direction (wind_from_direction)</p>
<p class="last">in Grid Coordinates</p>
</td>
<td><p class="first">m s-1</p>
<p>km h-1</p>
<p>mi h-1</p>
<p>kt</p>
<p class="last">ft s-1</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m s-1’</em>.</td>
</tr>
<tr class="row-even"><td>wspd_wdir10</td>
<td><p class="first">10m Wind Speed and Direction (wind_from_direction)</p>
<p class="last">in Grid Coordinates</p>
</td>
<td><p class="first">m s-1</p>
<p>km h-1</p>
<p>mi h-1</p>
<p>kt</p>
<p class="last">ft s-1</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m s-1’</em>.</td>
</tr>
<tr class="row-odd"><td>uvmet_wspd_wdir</td>
<td><p class="first">Wind Speed and Direction (wind_from_direction)</p>
<p class="last">Rotated to Earth Coordinates</p>
</td>
<td><p class="first">m s-1</p>
<p>km h-1</p>
<p>mi h-1</p>
<p>kt</p>
<p class="last">ft s-1</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m s-1’</em>.</td>
</tr>
<tr class="row-even"><td>uvmet10_wspd_wdir</td>
<td><p class="first">10m Wind Speed and Direction (wind_from_direction)</p>
<p class="last">Rotated to Earth Coordinates</p>
</td>
<td><p class="first">m s-1</p>
<p>km h-1</p>
<p>mi h-1</p>
<p>kt</p>
<p class="last">ft s-1</p>
</td>
<td><strong>units</strong> (str) : Set to desired units. Default is <em>‘m s-1’</em>.</td>
</tr>
</tbody>
</table>

## 3rd and more orders physics
### Energy
<table border="1" class="docutils">
<colgroup>
<col width="8%" />
<col width="24%" />
<col width="11%" />
<col width="58%" />
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Variable Name</th>
<th class="head">Description</th>
<th class="head">Available Units</th>
<th class="head">Additional Keyword Arguments</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-even"><td>cape_2d</td>
<td>2D CAPE, Convective Available Potential Energy, Convective Inhibition,  Lifted condensation level, level of free convection (MCAPE/MCIN/LCL/LFC)</td>
<td>J kg-1 ; J kg-1 ; m ; m</td>
<td><strong>missing</strong> (float): Fill value for output only</td>
</tr>
<tr class="row-odd"><td>cape_3d</td>
<td>3D CAPE and CIN (Convective INhibition, <a href="https://en.wikipedia.org/wiki/Convective_inhibition">wiki</a>)</td>
<td>J kg-1</td>
<td><strong>missing</strong> (float): Fill value for output only</td>
</tr>
<tr class="row-even"><td>geopt/geopotential</td>
<td>Geopotential for the Mass Grid</td>
<td>m2 s-2</td>
<td>&#160;</td>
</tr>
<tr class="row-odd"><td>geopt_stag</td>
<td>Geopotential for the Vertically Staggered Grid</td>
<td>m2 s-2</td>
<td>&#160;</td>
</tr>

</tbody>
</table>

### High Order Dynamics

<table border="1" class="docutils">
<colgroup>
<col width="8%" />
<col width="24%" />
<col width="11%" />
<col width="58%" />
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Variable Name</th>
<th class="head">Description</th>
<th class="head">Available Units</th>
<th class="head">Additional Keyword Arguments</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-even"><td>avo</td>
<td>Absolute Vorticity</td>
<td>10-5 s-1</td>
<td>&#160;</td>
</tr>	 
<tr class="row-even"><td>pvo</td>
<td>Potential Vorticity</td>
<td>PVU</td>
<td>&#160;</td>
</tr>
<tr class="row-even"><td>helicity</td>
<td>Storm Relative Helicity(see <a href="http://qxqk.nmc.cn/html/2006/4/20060408.html">ref.</a>)</td>
<td>m2 s-2</td>
<td><strong>top</strong> (float): The top level for the calculation in meters. Default is <em>3000.0</em>.</td>
</tr>
<tr class="row-odd"><td>updraft_helicity</td>
<td>Updraft Helicity</td>
<td>m2 s-2</td>
<td><p class="first"><strong>bottom</strong> (float): The bottom level for the calculation in meters. Default is <em>2000.0</em>.</p>
<p class="last"><strong>top</strong> (float): The top level for the calculation in meters. Default is <em>5000.0</em>.</p>
</td>
</tr>
</tbody>
</table>

## Different Forms of Water
### Vapors, Cloudness and Precipitation
<table border="1" class="docutils">
<colgroup>
<col width="8%" />
<col width="24%" />
<col width="11%" />
<col width="58%" />
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Variable Name</th>
<th class="head">Description</th>
<th class="head">Available Units</th>
<th class="head">Additional Keyword Arguments</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-odd"><td>pw</td>
<td>Precipitable Water</td>
<td>kg m-2</td>
<td>&#160;</td>
</tr>
<tr class="row-even"><td>rh</td>
<td>Relative Humidity</td>
<td>%</td>
<td>&#160;</td>
</tr>
<tr class="row-odd"><td>rh2</td>
<td>2m Relative Humidity</td>
<td>%</td>
<td>&#160;</td>
</tr>
<tr class="row-even"><td>cloudfrac</td>
<td>Cloud Fraction</td>
<td>%</td>
<td><p class="first"><strong>vert_type</strong> (str): The vertical coordinate type for the cloud thresholds. Must be ‘height_agl’, ‘height_msl’, or ‘pres’.  Default is ‘height_agl’.</p>
<p><strong>low_thresh</strong> (float): The low cloud threshold (meters for ‘height_agl’ and ‘height_msl’, pascals for ‘pres’). Default is 300 m (97000 Pa)</p>
<p><strong>mid_thresh</strong> (float): The mid cloud threshold (meters for ‘height_agl’ and ‘height_msl’, pascals for ‘pres’). Default is 2000 m (80000 Pa)</p>
<p class="last"><strong>high_thresh</strong> (float): The high cloud threshold (meters for ‘height_agl’ and ‘height_msl’, pascals for ‘pres’). Default is 6000 m (45000 Pa)</p>
</td>
</tr>
<tr class="row-even"><td>dbz</td>
<td>Reflectivity</td>
<td>dBZ</td>
<td><p class="first"><strong>do_variant</strong> (boolean): Set to True to enable variant calculation. Default is <em>False</em>.</p>
<p class="last"><strong>do_liqskin</strong> (boolean): Set to True to enable liquid skin calculation. Default is <em>False</em>.</p>
</td>
</tr>
<tr class="row-odd"><td>mdbz</td>
<td>Maximum Reflectivity</td>
<td>dBZ</td>
<td><p class="first"><strong>do_variant</strong> (boolean): Set to True to enable variant calculation. Default is <em>False</em>.</p>
<p class="last"><strong>do_liqskin</strong> (boolean): Set to True to enable liquid skin calculation. Default is <em>False</em>.</p>
</td>
</tr>
</tbody>
</table>

