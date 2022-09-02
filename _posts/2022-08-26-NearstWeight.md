---
title: 搜尋半徑距離平方反比加權之內插機制
tags: CWB WRF
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-08-20
modify_date: 2022-08-20 09:34:08
mermaid: true
---
## 背景
- 這個內插機制主要針對2維griddata速度太慢所因應的修改方案。同時也需要規避griddata結果會有NaN內插錯誤的結果。
- 主要因為空氣品質或排放量的內插會與距離的遠近有關，太遠的數據對內插影響也較低，還是適用距離相關的內插機制較為合理。同時摒除遙遠的數據對提升計算速度有非常重要的貢獻。

## 程式設計重點
### 2組網格座標位置之線性化
- 以適用即將進行的篩選(2維空間的線性化)過程、同時也簡化程式設計
- 字尾0/1表示舊、新的座標系統

```python
for i in 'xy':
  for j in '01':
    exec(i+j+'='+i+j+'.flatten()')
```

### 計算相對距離並進行篩選
- 以新網格間距5倍範圍為限
- 取距離平方之倒數為加權依據
- 以n[ ]、w[ ]等2個序列將順位及加權陣列(3 ~ 105不等長)都記錄起來。
  - 這2個序列不會隨著時間改變，可以另存備用。
  - 但因為計算速度很快，沒有必要儲存，不是速率決定關鍵。

```python
n,w=[],[]
for i in range(ncol1*nrow1):
  dist=(x0-x1[i])**2+(y0-y1[i])**2
  boo=(dist<=(nc1.XCELL*5)**2) & (dist>0)
  idx=np.where(boo)[0]
  if len(idx)==0:sys.exit('distance too short')
  wgt=1./dist[idx]
  swgt=np.sum(wgt)
  wgt[:]/=swgt
  n.append(idx)
  w.append(wgt)
```

### weight(w) and index(n)的引用
- 將原來2維的griddata內插，改成龐大矩陣的sum_product。這是速率提升的關鍵因素。
- 有關sum_product的說法，numpy與excel有不同的意義，網路有很多介紹，大多用在整個矩陣的相乘(np.dot(),np.matmul(), einsum()等等作法）、不適用在我們全部相乘、部份不加總的情況。
- 因為每點的加權與指標數量都不同，因此還是需逐一進行篩選、再進行sum_product
  - w[i]是個較小的1維numpy陣列，其長度與c的最後軸(axis=3)相同，因此直接相乘再相加就會消除其維度了。

```python
var1=np.zeros(shape=(nv,nt1,nlay1,nrow1*ncol1))
for i in range(ncol1*nrow1):
  c = var[:,:,:,n[i]//ncol, n[i]%ncol] 
  var1[:,:,:,i]=np.sum(c*w[i],axis=3)
```

### 線性矩陣之還原

```python
var1=var1.flatten().reshape(nv,nt1,nlay1,nrow1,ncol1)
```