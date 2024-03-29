---
title: 海鹽粒徑的對照
tags: python CAMS CMAQ Sea_Spray combine ICON BCON
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-09-23
modify_date: 2022-09-23
---
## 背景

- CAMS模式的海鹽(SSA)有3項輸出，是按照粒徑的範圍，輸出重量混合比
  1. 'sea_salt_aerosol_0.03-0.5um_mixing_ratio', 
  1. 'sea_salt_aerosol_0.5-5um_mixing_ratio', 
  1. 'sea_salt_aerosol_5-20um_mixing_ratio',
- CMAQ模式的海鹽（以NaCl）為例，為按照IJK mode分列之重量體積濃度，出現在IC/BC/CCTM_ACONC等等檔案之中。
  1. Aitken mode: ANAI, ACLI
  1. Accumulative mode: ANAK, ACLJ
  1. Coarse mode: ANAK(由SEACAT計算而得), ACLK
  1. 海鹽陽離子：ASEACAT
- 一般就重量而言：
  - 海鹽顆粒濃度主要分布在粗粒徑範圍，IJ mode的質量濃度不高。
  - 風速較大地區、海峽、海岸線會有較高的海鹽顆粒濃度。
- 影響到程式 grb2icon.py([[2022-08-16-CAMS_ic]][^1])
  - grb2bcon.py([[2022-08-16-CAMS_bc]][^2])

## 對照方式

- 因此合理的對照方式：

粒徑範圍&mu;m|ICBC|COMBINE|說明
:-:|:-:|:-:|-
0.03-0.5|Aitken and Accumulative mode|~ PM<sub>1</sub>|
0.5-5|coarse mode(ACLK、CL所佔比例)Na部份納入ASEACAT|~ PM<sub>2.5</sub>|
5-20|ASEACAT/陽離子所佔比例、CL所佔比例納入ACLK|~ PM<sub>10</sub>|

- NaCL重量比例：(23:35.5)=39.3:60.7

## 模擬結果定性探討

### 20220925 東亞地區三種粒徑範圍粒狀物之模擬結果

| ![PM1_2022092520.png](https://raw.githubusercontent.com/sinotec2/Focus-on-Air-Quality/main/assets/images/PM1_2022092520.png)|
|:-:|
| <b>PM<sub>1</sub>濃度模擬結果</b>|   
| ![PM2.5_2022092520.png](https://raw.githubusercontent.com/sinotec2/Focus-on-Air-Quality/main/assets/images/PM2.5_2022092520.png)|
| <b>PM<sub>2.5</sub>濃度模擬結果</b>|
| ![PM10_2022092520.png](https://raw.githubusercontent.com/sinotec2/Focus-on-Air-Quality/main/assets/images/PM10_2022092520.png)|
| <b>PM<sub>10</sub>濃度模擬結果</b>|

### 結果討論

- PM<sub>1</sub>大多分布在中國以及印度的內陸地區，日本排放隨東北季風到達臺灣的可能性是存在的，但是濃度相對並不高。SSA對PM<sub>1</sub>也可能會有貢獻，如臺灣海峽，或其他風速較高地區，但濃度也不高。
- PM<sub>2.5</sub>相對其他二者，SSA的貢獻似乎更低。
- PM<sub>10</sub>在太平洋高風速局部地區因海洋飛沫（SSA）的排放機制，確實有較高的可能。
  - 臺灣海峽高風速區，也造成可觀的濃度。
  - 東方邊界確實有濃度流入，但其影響相較SSA排放機制而言並不大。


[^1]: https://sinotec2.github.io/FAQ/2022/08/16/CAMS_ic.html " CAMS預報數據寫成CMAQ初始檔"
[^2]: https://sinotec2.github.io/FAQ/2022/08/16/CAMS_bc.html " CAMS預報數據寫成CMAQ邊界檔"
