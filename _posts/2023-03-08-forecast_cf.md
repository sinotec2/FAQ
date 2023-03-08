---
layout: article
title: 臺灣地區3Km-CMAQ預報實作之比較
parent: forecast
grand_parent: utilities
nav_order: 99
date: 2023-03-07
last_modified_date: 2023-03-07 20:20:35
tags: CMAQ forecast
aside:
  toc: true
sidebar:
  nav: layouts
---

## 背景

- 雖然環保署公告了所謂的「公版模式」，主要用意是在環評、許可審查過程中增加模式的可比較性、提高模式計算的效率、降低技術顧問的進入門檻，但遭遇的問題還不少。這就是本文想討論的主題。
- 實務上模式應用最多的場域，不是環評、許可審查過程提交的開發計畫模擬，而是每天的空氣品質模式預報作業。比較這兩種模式應用如下：

項目|增量模擬|減量模擬|空品預報
:-:|:-:|:-:|:-:
時間情境|過去|過去|未來
IC|實測|實測|實測或全球模式之預報
BC|實測|實測|全球模式之預報
氣象|再分析/FDDA|再分析/FDDA|氣象預報
背景排放|清冊|清冊|清冊+預測
標的計畫|開發計畫|減量策略|(無)

## 3Km-CMAQ預報實作

### ses 預報

- sinotec2.github.io[東亞～臺灣未來10天空品預報](https://sinotec2.github.io/cmaq_forecast/index03.html)

### sinica 預報

- 公開網頁：來自[民生公共物聯網資訊服務平台](https://ci.taiwan.gov.tw/dsp/index.aspx)
- 中研院環境變遷研究中心[高解析度空氣品質診斷與預報模式發展計畫模擬預報資料](https://ci.taiwan.gov.tw/dsp/forcast_air.aspx)

### ncu 預報

- 國家災害防救科技中心[懸浮微粒模式](https://watch.ncdr.nat.gov.tw/watch_cmaq)

## 濃度比較

### 日間結果比較

![messageImage_1678169355957.jpg](https://raw.githubusercontent.com/sinotec2/Focus-on-Air-Quality/main/assets/images/messageImage_1678169355957.jpg)

- 山區高濃度線段分布
  - 原因不明、待查，可能與降雨有關
  - sinica並無此類結果，ncu雖然也有，但高農區域數目與濃度值似乎不是很明顯
- 北飄煙陣迴流
  - ncu有最完整模擬，環保署公版模式範圍顯然不足夠。

### 夜間結果比較

![messageImage_1678170307529.jpg](https://raw.githubusercontent.com/sinotec2/Focus-on-Air-Quality/main/assets/images/messageImage_1678170307529.jpg)