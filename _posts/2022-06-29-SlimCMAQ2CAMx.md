---
title: BCON轉.bc檔
tags: CAMx fortran bash python BCON ICON CMAQ
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
---

## 背景大要

- 這項作業是從CMAQ的邊界檔案(BCON)轉寫成CAMx的邊界檔(.bc)。雖然官網有提供轉換程式([cmaq2camx][cmaq2camx]，詳參[[2022-07-05-cmaq2camx]])，但是還是有時間與空間上需要調整：
  - BCON檔案有40層，而CAMx模擬只用到15層，因此在垂直向需要進行篩選(slim_bc.py)。
    - BCON最後一小時是00，不是23，這點也在slim_bc.py內解決。
  - BCON是按照WRF的執行批次，兩個批次之間有重疊一天(需先用[brk_days2.cs][brk]按照日期拆開後、再按照CAMx的執行批次時間範圍、以ncrcat合併成一個BCON大檔)
  - BCON轉成.bc檔，使用[cmaq2camx][cmaq2camx]進行下列對照或轉換
    - 空品項目對照(對照表環境變數SPECIES_MAPPING，官網提供了幾個反應機制化學物質的名稱對照表)
    - 時區定義格式轉換。BCON是00Z，.bc是當地時間。
    - 使用腳本[conv_bcon.job](https://sinotec2.github.io/FAQ/2022/06/29/SlimCMAQ2CAMx.html#cmaq2camx執行腳本conv_bconjob)
- 位置：/nas2/camxruns/2016_v7/ICBC/EC_REAN/
  - 這表示BCON是自ECWMF的再分析檔案切割出來的。其時間解析度是3小時。

## slim_bc.py

### 批次檔執行腳本

- 需要模版檔案：bc_template.nc，為CMAQ之BCON檔案，但垂直已經改成15層。

```bash
#kuang@master /nas2/camxruns/2016_v7/ICBC/EC_REAN
#$ cat rs.cs 引數是2碼月份01～12
for nc in $(ls BCON_v53_16${1}*);do
python slim_bc.py $nc
done
```

### slim_bc.py程式

- 程式時間2021-05-21 09:00
- 因各批次BCON檔案間會重複1天+1小時(自00Z開始、在00Z結束，不是在23Z)，重複1天可以將BCON按日拆解、再行組合，但重複1小時在和其他天整併到全月檔案時將會出錯，因此時間迴圈跳過最後一小時不執行，以保持每日都是24個時間框。
- 高度層的選擇，可以參考wrfcamx的腳本，同樣是由WRF的40層選其中的15層。
- 注意：BCON的濃度場是3階矩陣

```python
#kuang@master /nas2/camxruns/2016_v7/ICBC/EC_REAN
#$ cat slim_bc.py
import netCDF4
import sys, os

ll=[0,1,2,3,4,5,6,7,8,10,12,15,18,26,39]
fname =sys.argv[1]
fname1=fname+'1'
os.system('cp bc_template.nc '+fname1)
nc = netCDF4.Dataset(fname,'r')
nc1 = netCDF4.Dataset(fname1,'r+')
V=[list(filter(lambda x:nc.variables[x].ndim==j, [i for i in nc.variables])) for j in [1,2,3,4]]
v='TFLAG'
nt,nv,ndt=nc.variables[v].shape
for t in range(nt-1):
  nc1.variables[v][t,:,:]=nc.variables[v][t,:,:]
for v in V[2]:
  if v=='TFLAG':continue
  for t in range(nt-1):
    for k in range(len(ll)):
      nc1.variables[v][t,k,:]=nc.variables[v][t,ll[k],:]
nc1.NLAYS=15
nc1.SDATE=nc.SDATE
nc1.close()
```

## 使用cmaq2camx套件

- cmaq2camx是Ramboll公司提供的套件程式，將CMAQ模式的ICON、BCON、EMIS、PTSE等重要模擬條件檔，轉到CAMx平台上，符合[uamiv][uamiv]、[lateral_boundary][bnd]及[point_source][pnc_camx]之格式。
- 程式之下載、編譯、輸入環境變數或標準輸入的選項內容，詳參[CMAQ2CAMx之單向轉換][https://sinotec2.github.io/FAQ/2022/07/05/cmaq2camx.html]

### 執行腳本範例

- 先執行spcmap，再執行cmaq2camx主程式
- 腳本為執行2016年6~7月之範例

{% include download.html content="BNDEXTR執行腳本範例[bndex.job](https://github.com/sinotec2/Focus-on-Air-Quality/blob/main/CAMx/ICBC/conv_bcon.job)" %}

```bash
...
foreach M (`seq 6  7`)
set MON=`printf '%02d' $M`
set SRC = /nas1/camxruns/src/cmaq2camx
set INPUT_CMAQ_BCON  = ./16$MON/bcon
set OUTPUT_CAMx_BC   = ./base.grd02.16${MON}.bc
set SPECIES_MAPPING  = ${SRC}/Species_Mapping_Tables/MAPTBL.CAMx6.2_CB05_CF.CMAQ_CB05_AE6_ICBC
set OUTPUT_TIMEZONE  = -8
...
```

- CMAQ使用UTC，CAMx使用當地時間，臺北時間為較國際換日線提前8小時(0=UTC,美國本土5=EST,6=CST,7=MST,8=PST)。

