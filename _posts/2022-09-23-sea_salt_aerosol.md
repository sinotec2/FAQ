---
title: 海鹽粒徑的對照
tags: python  CAMS  CMAQ Sea Spray
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-09-23
modify_date: 2022-09-23
---
## 背景
- CAMS模式的海鹽有3項輸出，是按照粒徑的範圍，輸出重量混合比
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

## 對照方式
- 因此合理的對照方式：

粒徑範圍&mu;m|ICBC|COMBINE|說明
:-:|:-:|:-:|-
0.03-0.5|Aitken and Accumulative mode|~ PM<sub>1</sub>|
0.5-5|coarse mode(ACLK、CL所佔比例)Na部份納入ASEACAT|~ PM<sub>2.5</sub>|
5-20|ASEACAT/陽離子所佔比例、CL所佔比例納入ACLK|~ PM<sub>10</sub>|

- NaCL重量比例：(23:35.5)=39.3:60.7

## 模擬結果定性探討

| ![PM1_2022092520.png](https://raw.githubusercontent.com/sinotec2/Focus-on-Air-Quality/main/assets/images/PM1_2022092520.png)|
|:-:|
| <b>PM<sub>1</sub>濃度模擬結果</b>|   
| ![PM2.5_2022092520.png](https://raw.githubusercontent.com/sinotec2/Focus-on-Air-Quality/main/assets/images/PM2.5_2022092520.png)|
| <b>PM<sub>2.5</sub>濃度模擬結果</b>|
| ![PM10_2022092520.png](https://raw.githubusercontent.com/sinotec2/Focus-on-Air-Quality/main/assets/images/PM10_2022092520.png)|
| <b>PM<sub>10</sub>濃度模擬結果</b>|