---
title: EMISSCTRL_NML之設定
tags: CMAQ ptse emis
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date: 2022-07-07 09:27:32
modify_date: 2022-07-15 11:10:52
---

## 背景
- $EMISSCTRL_NML是CMAQ主程式執行時的一個環境變數，指向排放源檔案的物種對照、與其加權乘數。
  - 可以避免反應機制之標準污染物名稱與排放檔案有出入時，仍然可以順利進行模擬。
  - 如果只有單純的增減量方案或測試，可以藉由乘數的加權來達成，不必另外再進行繁瑣的排放檔前處理過程。
- 基本上，$EMISSCTRL_NML是個對照的文字檔。
  - 與模式選用的反應機制密切相關
  - 雖然對照(dict)不是Fortran程式的強項，CMAQ還是提供了類似功能的作法。
  - 因與排放修正的增減量有關，在執行時需注意妥善管理檔案及版本。
- 以下以[EmissCtrl_cb6r3_ae7_aq.nml](https://github.com/sinotec2/Focus-on-Air-Quality/blob/main/GridModels/CCTM/EmissCtrl_cb6r3_ae7_aq.nml)為範例進行說明

## 段落架構
### 起迄特殊符號
- 因為是fortran的Namelist，以\&符號為起始，以\/為結束，其間的內容才會進入程式內。
- \!之後的內容是註解

### 四大段落的內容

項次|段落|內容|應用
:-:|-|:-:|-
1|&GeneralSpecs|特定類別是否受保護|如果開啟這些[科學設定][sci]，排放有可能會被干擾，因此需要加以保護
2|&EmissionScalingRules|排放加權規則|特定地區類別的污染物名稱對照關係、乘數、以及應用規則
3|&SizeDistributions|粒徑分布|參照到程式內訂的粒徑定義
4|&RegionsRegistry|區域定義|[ISAM][ISAM]及增減量方案會應用到的定義對照

## [科學設定][sci]之排放類別
- 這個段落針對特定排放類別進行保護(Guard)
- 特定排放類別包括[CCTM的科學設定][sci]範疇：風吹砂(WBDUST)、海洋飛沫(SEASPRAY)與氣體(MGEN)、生物VOCs(BIOG)、以及閃電NOx(LTNG)
- 選項
  - .FALSE. ：乘數一樣作用在這些地區及污染項目
  - .TRUE.  ：即使使用'ALL'也不會作用在這些地區或項目

## 排放加權規則
為8個欄位的大表，各欄位的意義、選項範例如下

欄次|欄位|內容|選項|說明
-|-|-|-|-
1|Region Label|地區|EVERYWHERE每一網格, WATER水域, ALL全區|可以參考[ISAM][ISAM]之設定
2|Stream Label|排放標籤|ALL所有類別, [科學設定類別][sci], run_cctm腳本中定義的面源或點源排放標籤|三者之聯集皆可
3|Emission Surrogate|排放檔中之代碼|視清冊之定義方式|如VOC_INV, PMF, PMC等
4|CMAQ Species|反應機制之名稱|視機制的選擇而異|
5|Phase/Mode|狀態|GAS, FINE, COARSE|
6|Scale Factor|乘數|非負實數|
7|Basis|計算基準|MOLE當量守恒, MASS質量守恒, UNIT不管單位直接乘|粒狀物比較會有問題
8|OP|運作方式|a既有規則再加上新規則, m既有相同對象的規則再乘上乘數, o以新乘數取代既有相同對象的規則|

## 粒徑分布
指定特定類別粒狀物的粒徑

欄次|欄位名稱|內容|範例說明
-|-|-|-
1|Stream Label|排放標籤|ALL, WBDUST, SEASPRAY, AIRCRAFT(user defined, eg.)
2|Surr. Mode|規模檔中粒狀物的粒徑代稱|FINE, COARSE
3|Ref. Mode|指向[AERO_DATA.F](https://github.com/USEPA/CMAQ/blob/main/CCTM/src/aero/aero6/AERO_DATA.F)程式碼中的`em_aero`內容項目|FINE_REF, ACC_REF, COARSE_REF, UNITY_REF, ZERO_REF, FINE_WBDUST, COARSE_WBDUST, FINE_SEASPRAY, COARSE_SEASPRAY等9類，如要增加須在該程式碼中添加

## 區域定義
這個段落除了定義各項規則應用的地區標籤之外，也是[ISAM][ISAM]的地區定義，詳見[run_isam][rgrg]的內容。欄位內容整理成表格形式。

欄次|欄位名稱|內容|範例說明
-|-|-|-
1|Region Label|在規則檔中的標籤|(令其與第3欄一致)
2|File_Label|地區定義檔|ISAM_REGIONS(csh中所指定的gridmask遮罩檔案)
3|Variable on File|指在[gridmask][gridmask]檔案內的變數名稱|以d1[為例][rgrg]，即為[gridmask][gridmask]檔案中的AQFZ0\~AQFZ7(Air Quality Forecasting Zone, [空氣質量預報分區](https://sinotec2.github.io/Focus-on-Air-Quality/GridModels/ISAM/SA_PM25_IONS/#背景))

[rgrg]: <https://sinotec2.github.io/Focus-on-Air-Quality/GridModels/ISAM/run_isamMM_RR_DM/#emissctrl檔案之地區控制regionsregistry> "FAQ -> CMAQ模式 -> 污染來源之分析 -> 執行CMAQ-ISAM -> EmissCtrl檔案之地區控制(RegionsRegistry)"
[gridmask]: <https://sinotec2.github.io/Focus-on-Air-Quality/GridModels/ISAM/withinD1> "d01地理分區檔案之準備"
[ISAM]: <https://sinotec2.github.io/Focus-on-Air-Quality/GridModels/ISAM/> "污染來源之分析 (Integrated Source Apportionment Method, ISAM)，CMAQ內設之污染來源分配模式，可以針對模擬範圍內的污染區域、類別進行追蹤計算，分別輸出該分區(分類)之污染濃度，以進行來源追蹤"
[sci]: <https://sinotec2.github.io/Focus-on-Air-Quality/GridModels/CCTM/science/> "CCTM之科學設定"

