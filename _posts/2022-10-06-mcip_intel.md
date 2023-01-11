---
title: mcip重新編譯與效能提升
tags: mcip
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-10-06
modify_date: 2022-10-06 16:12:40
---
## 背景
- 以多核執行mcip(gcc版本)會有儲存的問題，容易發生問題。檔頭即發生錯誤。
- 由於多數執行皆以平行化，如在mcip階段以單核循序處理，將造成作業上的瓶頸，不利未來發展（[[2022-12-06-fcst10days]]）。
- 修改方案
  1. 改以[pnetcdf][PnetCDF]方式，讓程式可以平行方式撰寫結果。(CCTM現行執行檔即為[pnetcdf][PnetCDF]編譯成功經驗)
  1. 其他非gcc方案

## 編譯
### Makefile_intel方案
- 使用/opt/mpich/mpich-3.4.2-icc/bin/mpifort來進行編譯。
- ioapi本身並沒有mpi功能，因此還是使用`Linux2_x86_64ifort`版本，不必使用mpi版本(也無法完成編譯)
- 此方案僅為一般性的netCDF並未啟用pnetcdf

```bash
f2=/nas2/cmaq2019/download/model/cmaq_recommend/PREP/mcip/src/Makefile
f1=/nas2/cmaq2019/download/model/cmaq_recommend_ipncf/PREP/mcip/src/Makefile
diff $f2 $f1
49,51c49,51
< FC      = ifort
< NETCDF = /usr/local/apps/netcdf-4.6.3/intel-18.0
< IOAPI_ROOT = /usr/local/apps/ioapi-3.2/intel-18.0
---
> FC      = mpifort
> NETCDF = /opt/netcdf/netcdf4_intel
> IOAPI_ROOT = /opt/ioapi-3.2
55c55
< LIBS    = -L$(IOAPI_ROOT)/lib -lioapi \
---
> LIBS    = -L$(IOAPI_ROOT)/Linux2_x86_64ifort/ -lioapi \
```

### Makefile_pnetcdf方案
- 大致同上
- netCDF使用`netcdf4_hdf5P_mpich3.4.2-icc`版本(支援平行輸出)

```bash
$ diff $f2 $f1
49,51c49,51
< FC      = ifort
< NETCDF = /usr/local/apps/netcdf-4.6.3/intel-18.0
< IOAPI_ROOT = /usr/local/apps/ioapi-3.2/intel-18.0
---
> FC      = mpifort
> NETCDF = /opt/netcdf/netcdf4_hdf5P_mpich3.4.2-icc/
> IOAPI_ROOT = /opt/ioapi-3.2
55,56c55,56
< LIBS    = -L$(IOAPI_ROOT)/lib -lioapi \
<           -L$(NETCDF)/lib -lnetcdff -lnetcdf
---
> LIBS    = -L$(IOAPI_ROOT)/Linux2_x86_64ifort/ -lioapi \
>           -L$(NETCDF)/lib -lnetcdff -lnetcdf -L/opt/pnetcdf/pnetcdf-1.12.3_intel_mpich-icc/lib -lpnetcdf
```

### 2個netCDF的差異
- 後者支援NC-4 Parallel Support

```
kuang@dev2 /opt/netcdf
$ s1=netcdf4_intel/lib/libnetcdf.settings
$ s2=netcdf4_hdf5P_mpich3.4.2-icc/lib/libnetcdf.settings
$ diff $s1 $s2
8c8
< Configured On:                Thu Apr 14 14:07:03 CST 2022
---
> Configured On:                Thu Apr 28 10:45:48 CST 2022
10,11c10,11
< Build Directory:      /home/kuang/MyPrograms/netCDF/netcdf-c-4.8.1/build_intel
< Install Prefix:         /opt/netcdf/netcdf4_intel
---
> Build Directory:      /home/kuang/MyPrograms/netCDF/netcdf-c-4.8.1/build_intel_hdf5Parallel
> Install Prefix:         /opt/netcdf/netcdf4_hdf5P_mpich3.4.2-icc
15c15
< C Compiler:           /opt/intel/compilers_and_libraries_2020.0.166/linux/bin/intel64/icc
---
> C Compiler:           /opt/mpich/mpich-3.4.2-icc/bin/mpicc
17,18c17,18
< CPPFLAGS:             -I/opt/hdf/hdf5_intel/include
< LDFLAGS:              -L/opt/hdf/hdf5_intel/lib
---
> CPPFLAGS:             -I/opt/hdf/hdf5-1.12.1_mpich3.4.2-icc/include
> LDFLAGS:              -L/opt/hdf/hdf5-1.12.1_mpich3.4.2-icc/lib
24c24
< Extra libraries:      -lhdf5_hl -lhdf5 -lm -lz
---
> Extra libraries:      -lhdf5_hl -lhdf5 -lm -lz -lcurl
32c32
< NC-4 Parallel Support:        no
---
> NC-4 Parallel Support:        yes
34,35c34,35
< DAP2 Support:         no
< DAP4 Support:         no
---
> DAP2 Support:         yes
> DAP4 Support:         yes
```

## 執行時間比較
- 平行方案似乎效能都不甚佳，可能網路讀寫速度才是瓶頸所在。
- 用戶CPU如果分配到每核心，確實以pnetCDF方案稍佳，但並沒有顯著的差異。
- gcc多核雖然不穩定，但其實每核心系統CPU速度還是略快一些

time |pnetCDF|intel方案|gcc NP=40|NP=1
:-:|:-:|:-:|:-:|:-:
real(实际时间)|12m49.757s|11m22.747s|5m37.849s|3m3.735s|3m3.735s
user(用户CPU时间)|33m51.021s|33m55.344s|54m41.407s|1m10.621s|1m10.621s
user(每核心)|0m50.7755s|0m50.883s|1m22.0351s|1m10.621s|1m10.621s
sys(系统CPU时间) |27m20.663s|28m7.542s|22m21.431s|0m14.550s|0m14.550s
sys(每核心) |0m41.016s|0m42.188s|0m33.535s|0m14.550s|0m14.550s

[PnetCDF]: <https://sinotec2.github.io/Focus-on-Air-Quality/utilities/netCDF/lib_comp/#pnetcdf> "Focus-on-Air-Quality->Utilities->NetCDF Relatives->程式庫之編譯NC相關程式庫之編譯->pnetcdf"