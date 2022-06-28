---
title: 垂直40層BCON瘦身至15層後轉成bc檔
tags: CAMx fortran bash python
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
---

## 背景大要
- 這項作業是從CMAQ的邊界檔案(BCON)轉寫成CAMx的邊界檔(.bc)。雖然官網有提供轉換程式([cmaq2camx][cmaq2camx])，但是還是有時間與空間上需要調整：
  - BCON檔案有40層，而CAMx模擬只用到15層，因此在垂直向需要進行篩選(slim_bc.py)。
  - BCON是按照WRF的執行批次，兩個批次之間有重疊一天(需先用[brk_days2.cs][brk]按照日期拆開後、再按照CAMx的執行批次時間範圍、以ncrcat合併成一個BCON大檔)
  - BCON轉成.bc檔，使用[cmaq2camx][cmaq2camx]進行空品項目對照、格式轉換([conv_bcon.job](https://sinotec2.github.io/FAQ/2022/06/29/Slim-CMAQ2CAMx.html))。
- 位置：/nas2/camxruns/2016_v7/ICBC/EC_REAN/
  - 這表示BCON是自ECWMF的再分析檔案切割出來的。

### 批次檔腳本與python程式如下
- 需要模版檔案：bc_template.nc，為CMAQ之BCON檔案，但垂直已經改成15層。

```bash
#kuang@master /nas2/camxruns/2016_v7/ICBC/EC_REAN
#$ cat rs.cs
for nc in $(ls BCON_v53_16${1}*);do
python slim_bc.py $nc
done
```
- slim_bc.py(2021-05-21 09:00)
  - 因各批次BCON檔案間會重複1小時，在整併到全月檔案時會出錯，因此時間循環時跳過最後一小時。

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
### [cmaq2camx][cmaq2camx]執行腳本

```bash
#kuang@master /nas2/camxruns/2016_v7/ICBC/EC_REAN
#$ cat conv_bcon.job
#!/bin/csh -f

#
#   This is a sample runscript to convert CMAQ BCON files to CAMx BC
#   files.
#   Set the following file names and run the script:
#
#   INPUT_CMAQ_BCON  - CMAQ BCON file name (input)
#   OUTPUT_CAMx_BC   - CAMx BC file name (output)
#   SPECIES_MAPPING  - Species Mapping Table file name (input)
#   OUTPUT_TIMEZONE  - Timezone for output (8 for PST, etc.)
#
foreach M (`seq 6  7`)
set MON=`printf '%02d' $M`
set SRC = /nas1/camxruns/src/cmaq2camx
set INPUT_CMAQ_BCON  = ./16$MON/bcon
set OUTPUT_CAMx_BC   = ./base.grd02.16${MON}.bc
set SPECIES_MAPPING  = ${SRC}/Species_Mapping_Tables/MAPTBL.CAMx6.2_CB05_CF.CMAQ_CB05_AE6_ICBC
set OUTPUT_TIMEZONE  = -8

######################################################################
#
#   SPCMAP creates a new I/O-API file with new variables each of which
#   is a linear combination of variables from the input I/O-API file.
#   Units of the new variables are user-defined.
#
#   INFILE    - file name for input file
#   OUTFILE   - file name for output file
#   MAPTBL    - file name for species mapping table
#
######################################################################
setenv INFILE  $INPUT_CMAQ_BCON
setenv OUTFILE tmp_bcon
setenv MAPTBL  $SPECIES_MAPPING
rm -f $OUTFILE

${SRC}/src/spcmap

######################################################################
#
#   CMAQ2UAM converts CMAQ input files (I/O-API) into corresponding
#   CAMx input files (UAM-IV format). It only converts file formats
#   and units if needed. No species mapping.
#
#   CMAQICON        - file name for CMAQ IC input
#   CMAQBCON        - file name for CMAQ BC input
#   CMAQEMIS        - file name for CMAQ Emissions input
#
#   BCON_INTRP      - flag to generate hourly BC from X-hourly BC
#                     T or Y to interpolate BC; otherwise, F or N
#                     default value is FALSE
#                     ignored if File Type is not BCON
#
#   File Type       - input file type (ICON, BCON, or EMIS)
#   OutFile1        - first output file name (CAMx IC, BC, or AR)
#   OutFile2        - second output file name (CAMx TopC or PT)
#   Output Timezone - timezone for output (8 for PST, etc.)
#
######################################################################
setenv CMAQBCON tmp_bcon
rm -f $OUTPUT_CAMx_BC

###setenv BCON_INTRP T

${SRC}/src/cmaq2uam << EOF
File Type          |BCON
OutFile1 (IC,BC,AR)|$OUTPUT_CAMx_BC
OutFile2 (TopC,PT) |
Output Timezone    |$OUTPUT_TIMEZONE
EOF

rm -f tmp_bcon
end

```

[cmaq2camx]: <https://camx-wp.azurewebsites.net/getmedia/cmaq2camx.22sep16.tgz> "CMAQ2CAMx converts CMAQ-formatted emissions and IC/BC files to CAMx Fortran binary formats.  See README and job scripts for more information.  You will need IO-API and netCDF libraries to compile and run this program.  Updated 8 April 2016 to process CAMx Polar and Mercator projections.  Updated 22 September 2016 to fix a minor bug checking map projection type for in-line point source files."
[brk]: <https://sinotec2.github.io/Focus-on-Air-Quality/utilities/netCDF/brk_day/#brk_day2cs腳本程式> "按日拆分m3.nc檔案(brk_day2.cs)。雖然CCTM的執行批次範圍是數日，但CCTM腳本常將所需的輸入檔切割成逐日檔，考量可方便進行批次範圍的組合，如果要拆散再另行組合成其他起訖日期的批次(如CCTM的邊界條件 之bld_19.cs)，有逐日檔案勢必方便許多。同時這也是MM5/WRF以來的IO習慣，很多也是逐日儲存。最後檔案管理維護比單一大檔容易，壞了某一天檔案只須修復該日檔案即可。"