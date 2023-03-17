---
layout: default
title: 轉換wrfout格式
parent: forecast
grand_parent: Graphics
date: 2023-03-17
last_modified_date: 2023-03-17 21:17:33
tags: wrf forecast NCHC
---

# 轉換wrfout格式
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

## 背景

- 作為總結國網上wrfout與mcip之間的衝突，這篇的做法並不是非常光彩：就是找一個國網mcip程式可以接受的wrfout模版，將國網上跑的wrf結果填進去，但真的是沒辦法中的辦法了。詳細的理由容後補充。憑藉的理由：
  - python對是否是netcdf還是pnetcdf並不非常敏感（相對fortran程式）。
  - python處理上GB的wrfout檔案，並沒有延遲或龜速的情況。
  - python程式設計要比準備fortran程式庫、修改平行運作的程式錯誤，要容易的多了。
- 流程方案

程式|版本|編譯|說明
-|-|-|-
wrf|4.0/4.2.1等等不拘|國網上的intel mpi|必須是pnetcdf版本、不接受序列版本netcdf
TransWrfout|3.11|python|將pnetcdf之wrfout結果填入指定序列netcdf模版
mcip|5.0/5.1|ifort|無mpi之序列版本。不能使用平行作業

- 目前環保署公版模式並未提供mcip程式與編譯建議。國網官方測試也只限制在wrf/cmaq的主程式，都未有詳細交代mcip的執行細節。
- 因可將序列處理、序列mcip過程放在背景執行，並不會影響預報的進度或瓶頸。

## 程式設計

### 模版的準備

- 去除`Time`維度，以減少檔案容量
- 分別準備grid45/grid09/grid03等等3個範圍

### 陣列變數

- 先恢復時間維度的長度
- 按照不同階層數的維度進行數據的移轉
- 如果陣列階層數相同，但維度的長度不同，則不處理。

```python
nc = netCDF4.Dataset(fname,'r+')
nc0= netCDF4.Dataset(fnam0,'r')
V =[list(filter(lambda x:nc.variables[x].ndim==j, [i for i in nc.variables])) for j in [1,2,3,4]]
V0=[list(filter(lambda x:nc0.variables[x].ndim==j, [i for i in nc0.variables])) for j in [1,2,3,4]]

v='V10'
nt,nrow,ncol=nc0[v].shape
print(nt)
for t in range(nt):
  nc[v][t,:,:]=nc0[v][t,:,:]
for v in V[3][1:]:
  nc[v][:,:,:,:]=nc0[v][:,:,:,:]
for v in V[2]:
  if v not in V0[2]:continue
  nc[v][:,:,:]=nc0[v][:,:,:]
for v in V[1]:
  if nc[v].shape!=nc0[v].shape:continue
  nc[v][:,:]=nc0[v][:,:]
for v in V[0]:
  nc[v][:]=nc0[v][:]

```

### 屬性轉移

- 事先使用ncdump讀出檔案的屬性變數項目備用
- 有減號的變數要規避，會造成執行錯誤
- 新版要restart的內容，無關mcip之應用

```python
with open('att.txt', 'r') as f:
  var=[i.split(':')[1].split('=')[0].replace(' ','') for i in f if len(i)>0]
for v in var:
  if '-' in v:continue
  try:
    exec('nc.'+v+'=nc0.'+v)
  except:
    continue
```

## 結果

- 用最簡便的方式解決。