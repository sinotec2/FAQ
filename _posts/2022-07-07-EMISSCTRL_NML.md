---
title: EMISSCTRL_NML之設定
tags: CMAQ ptse emis
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
last_modified_date: 2022-07-08 09:02:56
---

## 背景
- $EMISSCTRL_NML是CMAQ主程式執行時的一個環境變數，指向排放源檔案的物種對照、與加權。
  - 可以避免反應機制之標準污染物名稱與排放檔案有出入時，仍然可以順利進行模擬。
  - 如果只有單純的增減量方案，可以藉由乘數的加權來達成，不必另外再進行排放檔前處理。
- 基本上，$EMISSCTRL_NML是個文字檔。雖然對照(dict)不是Fortran程式的強項，CMAQ還是提供了類似功能的作法。
- 以下以[EmissCtrl_cb6r3_ae7_aq.nml](https://github.com/sinotec2/Focus-on-Air-Quality/blob/main/GridModels/CCTM/EmissCtrl_cb6r3_ae7_aq.nml)為範例

## 段落架構
- 因為是fortran的Namelist，以\&符號為起始，以\/為結束，其間的內容才會進入程式內。
- \!之後的內容是註解

項次|段落|內容|應用
:-:|-|:-:|-
1|&GeneralSpecs|特定類別是否受保護|如果開啟這些科學設定，排放有可能會被干擾，因此需要加以保護
2|&EmissionScalingRules|排放加權規則|特定地區類別的污染物名稱對照關係、乘數、以及應用規則
3|&SizeDistributions|粒徑分布|
4|&RegionsRegistry|區域定義|

## 科學設定之排放類別
- 這個段落針對特定排放類別進行保護(Guard)
- 特定排放類別包括CCTM的科學設定範疇：風吹砂(WBDUST)、海洋飛沫(SEASPRAY)與氣體(MGEN)、生物VOCs(BIOG)、以及閃電NOx(LTNG)
- 選項
  - .FALSE. ：乘數一樣作用在這些地區及污染項目
  - .TRUE.  ：即使使用'ALL'也不會作用在這些地區或項目

## 排放加權規則
為8個欄位的大表，各欄位的意義、選項範例如下

欄次|欄位|內容|選項|說明
-|-|-|-|-
1|Region Label|地區|EVERYWHERE每一網格, WATER水域, ALL全區|可以參考ISAM之設定
2|Stream Label|排放標籤|ALL所有類別, 科學設定類別, run_cctm腳本中定義的面源或點源排放標籤|三者之聯集皆可
3|Emission Surrogate|排放檔中之代碼|視清冊之定義方式|如VOC_INV, PMF, PMC等
4|CMAQ Species|反應機制之名稱|視機制的選擇而異|
5|Phase/Mode|狀態|GAS, FINE, COARSE|
6|Scale Factor|乘數|非負實數|
7|Basis|計算基準|MOLE當量守恒, MASS質量守恒, UNIT不管單位直接乘|粒狀物比較會有問題
8|OP|運作方式|a既有規則再加上新規則, m既有相同對象的規則再乘上乘數, o以新乘數取代既有相同對象的規則|

## 粒徑分布

## 區域定義
這個段落除了定義各項規則應用的地區標籤之外，也是ISAM的地區定義，詳見[run_isam][rgrg]的內容。欄位內容整理成表格形式。

欄次|欄位名稱|內容|範例說明
-|-|-|-
1|Region Label||
2|File_Label||
3|Variable on File|指在[gridmask][gridmask]檔案內的分區名稱|

[rgrg]: <https://sinotec2.github.io/Focus-on-Air-Quality/GridModels/ISAM/run_isamMM_RR_DM/#emissctrl檔案之地區控制regionsregistry> "FAQ -> CMAQ模式 -> 污染來源之分析 -> 執行CMAQ-ISAM -> EmissCtrl檔案之地區控制(RegionsRegistry)"

