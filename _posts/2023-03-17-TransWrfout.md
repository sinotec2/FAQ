---
layout: default
title: 轉換wrfout格式
parent: forecast
grand_parent: Graphics
date: 2023-03-17
last_modified_date: 2023-03-20 15:32:45
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
- 模板和真正執行的wrf之間，**必須有相同的版次**。
  - 檢視：`ncdump -h $nc|grep WRF`

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
for v in V[3]:
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

### 檔案管理

- 引數：`$BEGD`
- 取代之前從`$gfs`目錄連結到`$fcst`之作法
- 讀取檔案目錄名稱
  - 目錄：即執行wrf的目錄(`pwd`)
  - 檔名：逐日標記(`dates`)
- 輸出目標`targ`
  - `targ=fcst+'/grid45/wrfout'`
  - mcip使用的`$InMetFiles`仍為固定檔名之暫存檔
    - `nam0=pwd+'/wrfout_d0'+ad0+'_'+dates[jj]+'_00:00:00'`
- 以下範例為台灣杉3號

```python
tdy=sys.argv[1]
bdate=datetime.datetime.strptime(tdy,"%Y-%m-%d")
nd=12
dates=[(bdate+datetime.timedelta(days=i)).strftime("%Y-%m-%d") for i in range(nd)]
...
pwd=subprocess.check_output("pwd" ,shell=True).decode('utf8').strip('\n')
fcst='/work/sinotec2/cmaqruns/forecast'
targ=fcst+'/grid45/wrfout'

ads={1:['3'],2:['1','2']}
gds={1:['03'],2:['45','09']}
ndms=1
if pwd[-3:]=='45k':
  ndms=2
with open(targ+'/att.txt', 'r') as f:
  var=[i.split(':')[1].split('=')[0].replace(' ','') for i in f if len(i)>0]
for ii in range(ndms):
  ad=ads[ndms][ii]
  ad0=ad
  if ndms==1:ad0='1'
  ftemp=targ+'/wrfout_d0'+ad+'_template'
  for jj in range(nd):
    fnam0=pwd+'/wrfout_d0'+ad0+'_'+dates[jj]+'_00:00:00'
    if not os.path.isfile(fnam0):continue
    nc0= netCDF4.Dataset(fnam0,'r')
    fname=targ+'/wrfout_d0'+ad+'_'+str(jj)
    os.system('test -e '+fname+' && rm -f '+fname+';cp '+ftemp+' '+fname)
    nc = netCDF4.Dataset(fname,'r+')
```

## 結果

- 用最簡便的方式解決。
- wrfout檔案會增加至少1/4

{% include download.html content="轉換wrfout格式：[trans_wrfout.py](https://github.com/sinotec2/Focus-on-Air-Quality/blob/main/GridModels/MCIP/trans_wrfout.py)" %}