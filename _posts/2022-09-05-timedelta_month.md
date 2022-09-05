---
title: datetime跨月日數的計算
tags: python
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-09-05 10:51:28
modify_date: 2022-09-05 10:51:33
---

## 背景
- python datetime.timedelta()函數的特性
  1. 適用在「精確」時間差的計算，
  1. 不論什麼時間單位，都適用實數的時差
- 所以當面對「概念」性質的跨月時間計算，就不會有`timedelta(months=-1)`這種指令，因為不同月份、潤年與否的前後某幾個月，這種計算是很不明確的，即使只是進行整數月份的計算。
- 實務上以月份為主體的空品模式作業中，跨月計算是作業的常態。以環保署公版模式而言，其生物源、東亞在地區貢獻排放量等2個檔案名稱中，即以前月25日為起始日，而以次月1日的0時為結束，**日數**還隱含在檔案名稱內，如：

```bash
kuang@master /nas2/cmaq2019/download-20220503/input
$ ls -lh */grid03/smoke/b3*
-rw-r--r-- 1 kuang SESAir 173M  4▒▒ 20 14:43 201901/grid03/smoke/b3gts_l.20181225.38.d4.ea2019_d4.tar.xz
-rw-r--r-- 1 kuang SESAir 890M  7▒▒ 19  2021 201902/grid03/smoke/b3gts_l.20190125.35.d4.ea2019_d4.ncf
...
grid03/smoke/b3gts_l.20191025.37.d4.ea2019_d4.tar.xz
-rw-r--r-- 1 kuang SESAir 172M  1▒▒ 11  2022 201912/grid03/smoke/b3gts_l.20191124.38.d4.ea2019_d4.tar.xz
```
- 檔名中的35、37、38即為各月份檔案的日數，為`當月日數+前月日數-25日+1`的結果。
- 公版模式將日數寫在檔案名稱，好處是
  1. 直接顯示檔案日數，可以直接控制與檔案大小有關的作業，如搬遷、壓縮、儲存等等。
  1. 可以直接應用nco指令，在OS層次就完成切割、讀取、整併等等作業，以利測試。(unix的date指令可以接受前、後1個月這樣的計算)
  1. (其他)
- 然而這樣的作法有其困難處
  1. 跨年、潤年將會出現問題
  1. 檔名無規則，需建立複雜、易出錯的對照表
  1. TEDS進版時，2月份檔名可能會不一樣。
- 解題策略
  1. 有`calendar.monthrange()`[( 純淨天空)][monrange]，可以提供特定年、月的日數。然而年份還是需要計算，才能因應跨年的問題。
  1. 用`dateutil.relativedelta`：[這個方案][segmentfault2017]會更容易跟datetime融合。雖然相對時差只能應用在整數月份，但也足夠應付此處之計算需求。

## 作法
### [dateutil.relativedelta][segmentfault2017]的應用
- 將[dateutil.relativedelta][segmentfault2017]寫成簡單版本的函數型態，可以回應次月、前月的年份、月份
- [dateutil.relativedelta][segmentfault2017]的好處就是與datetime完全融合在日期的計算中，不會像[calendar.monthrange()][monrange]只回應整數。用法幾乎像timedelta一樣，卻又沒有那麼嚴謹。

```python
def rel_mon(dt,im):
  a=dt+relativedelta(months=im)
  return a.year,a.month
```

### 跨月日數的計算
- 次月、前月的年份、月份(`ymn,ymp`)共4個值：以當天為基準，呼叫共同函數`rel_mon`、計算相對前後1個的年、月。
- 這4個整數應用在日數的計算。這裡就可以用datetime的相減了。
  - 因為未來日定在次月的1日，因此相減後的日數不必再加1
  - 日數串成檔案名稱，用以開啟公版模式的排放量檔案。

```python
bdate=datetime.datetime.strptime(tdy,"%Y-%m-%d")
...
  mm=tdy.split('-')[1]
  smk='/nas2/cmaq2019/download-20220503/input/2019'+mm+'/grid03/smoke/'
  ymn,ymp=rel_mon(bdate,+1)[:],rel_mon(bdate,-1)[:] #next and previous month and year[y,m sequence]
  days=str((datetime.datetime(ymn[0],ymn[1],1)-datetime.datetime(ymp[0],ymp[1],25)).days)
  data_date='2019'+'{:02d}'.format(ymp[1])+'25.'+days
...
  fnames=[smk+kind[i]+data_date+'.'+doms[i]+'.ncf' for i in range(nf)]
```

## 檢討
- 公版模式將日數寫在檔案名稱，好處是在OS層面的操作，但在胯月程式的設計上，這樣的檔名還造成不小困擾。
- 此處將其名稱規則化、程式化，會更方便未來程式的發展，並減少檔名對照的錯誤。

[monrange]: <https://vimsky.com/zh-tw/examples/usage/python-calendar-monthrange-method-with-example-02.html> " 純淨天空：Python calendar monthrange()用法及代碼示例：monthrange(year, month)"
[segmentfault2017]: <https://segmentfault.com/q/1010000012025203> "segmentfault, 2017：python的timedelta为什么不支持month? from dateutil.relativedelta import relativedelta; print datetime.now() + relativedelta(months=1)"
