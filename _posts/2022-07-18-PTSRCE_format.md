---
title: CAMx點源格式說明
tags: CAMx ptse uamiv
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-07-18 
modify_date: 2022-07-18 09:33:54
---

## 背景
- CAMx點源檔案的nc版本，已經有很多[說明與列表][CAMx67]。此處說明點源point_source格式(循序讀寫之二進位檔案)之內容。
- 其他面源、空品及沉降檔之[uamiv格式][uamiv]、以及邊界條件檔案之[lateral_boundary格式][bnd] ，可以詳見[比較表][bnd]。

## [pt-emis.f](https://github.com/sinotec2/camxruns/blob/master/pt-emis.f)的輸出部分內容
- 循序輸出6筆表頭內容，此部分為常數，不隨時間改變。其後為每個時間段落的排放量數據
- 常數部分

```fortran
      OPEN(NUPTS, FILE='fortBE.14',FORM='UNFORMATTED'
     ,  ,convert='BIG_ENDIAN',STATUS='UNKNOWN')
      WRITE (NUPTS)    MPTS, MFID, NSG, NSPEC, NBD, TBEG, NED, TEND
      WRITE (NUPTS) XUTM, YUTM, NZONE, XORG, YORG, DELTAX, DELTAY,
     $         NOXG, NOYG, NOZG
     $, NVLOW, NVUP, DZSURF, DZMINL, DZMINU
      WRITE (NUPTS) 1,1,NOXG,NOYG
      WRITE (NUPTS) ((MSPEC(I,J),I=1,10),J=1,NSPEC)
      WRITE (NUPTS) NSEG, NOPTS
      WRITE (NUPTS) (X(K),Y(K),H(K),D(K),T(K),V(K),K=1,NOPTS)
```
- 時間變化部分
  - 每個時間步階有3+NOSPEC筆數據

```fortran
      DO 680 IT=1,24
        TB=IT-1
        TE=mod(IT,24)
        JED=NBD
        if(TE.eq.0)JED=JED+1
        WRITE ( *,* ) NBD, TB  , JED, TE
        WRITE (NUPTS) NBD, TB  , JED, TE
        WRITE (NUPTS) NSEG, NOPTS
...
        WRITE (NUPTS)(ILOC(IP,IT),IJPS(IP,IT),KPTS(IP,IT),FLOW(IP,IT),
     $    EFPLH(IP,IT), IP=1,NOPTS)
        DO 500 I=1,NSPEC
          WRITE (NUPTS) NSEG,(MSPEC(J,I),J=1,10),
     $      (QPTS(I,IP), IP=1,NOPTS)
500     CONTINUE
680   CONTINUE
```

## [uamiv][uamiv]與point_source格式內容之比較表(fortran)
- CAMx的點源排放檔案格式有別於其他所有格式，除了4筆表頭內容一致外，增加了第5~6筆表頭內容，為煙囪個數及煙囪基本條件
- 時變部分，點源排放具有很大的彈性，每個時間段落的煙囪個數可以不一樣(not tried)，也可以有隨時間改變的流量與煙囪有效高度。

<table border="1" class="docutils">
<colgroup>
<col width="15%" />
<col width="35%" />
<col width="35%" />
<col width="15%" />
</colgroup>
<thead align="center">
<tr class="row-odd"><th class="head">項目</th>
<th class="head">[uamiv][uamiv]</th>
<th class="head">point_source</th>
<th class="head">說明</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-even"><td>表頭1檔名標籤與起迄日期時間</td>
<td>fname, note, NOSEG, NOSPEC,<p>NDATE, TTIME, NDLAST, TTLAST</p></td>
<td><p style="text-align:center;">(same)</p></td>
<td>前者內容為AIRQUALITY, AVERAGE, EMISSION後者為PTSOURCE</td>
</tr>
<tr class="row-odd"><td>表頭2網格系統</td>
<td>XUTM, YUTM, NZONE, <p>XORG, YORG, DELTAX, DELTAY, </p><p>NOXG, NOYG, NOZ,</p><p>idproj,istag,tlat1,tlat2,rdum</p></td>
<td><p style="text-align:center;">(same)</p></td>
<td>&#160;</td>
</tr>
<tr class="row-even"><td>表頭3 4個整數</td>
<td><p style="text-align:center;">(Itmp(j), J=1,4)</p></td>
<td><p style="text-align:center;">(same)</p></td>
<td>&#160;</td>
</tr>
<tr class="row-odd"><td>表頭4污染物名稱</td>
<td>((SPNAME(I,J), I=1,10), J=1,NOSPEC)</td>
<td><p style="text-align:center;">(same)</p></td>
<td>&#160;</td>
</tr>
<tr class="row-even"><td>表頭5 段落數及點源個數</td>
<td><p style="text-align:center;">(無)</p></td>
<td>NOSEG, NOPTS</td>
<td>NOSEG值為1</td>
</tr>
<tr class="row-even"><td>表頭6 點源基本參數</td>
<td><p style="text-align:center;">(無)</p></td>
<td>(X(K), Y(K), H(K), D(K), T(K), V(K),K=1,NOPTS)</td>
<td>XYHD單位為公尺、T單位K，V單位m/Hr</td>
</tr>
<tr class="row-odd"><td>時變部分逐時之表頭1:啟迄日期時間</td>
<td><p style="text-align:center;">jjj,btime, jjn,etime</p></td>
<td><p style="text-align:center;">(same)</p></td>
<td>&#160;</td>
</tr>
<tr class="row-odd"><td>時變部分逐時之表頭2</td>
<td><p style="text-align:center;">(無)</p></td>
<td>NOSEG, NOPTS</td>
<td>段落數及點源個數</td>
</tr>
<tr class="row-odd"><td>時變部分逐時之表頭3</td>
<td><p style="text-align:center;">(無)</p></td>
<td>(ILOC(IP,IT), IJPS(IP,IT), KPTS(IP,IT), FLOW(IP,IT), EFPLH(IP,IT), IP=1,NOPTS)</td>
<td>點源位置之IJK排氣量與有效高</td>
</tr>
<tr class="row-even"><td>時變部分之量場</td>
<td>DO L=1,NOSPEC<p>DO K=1,NOZ</p><p>&emsp;WRITE (12) NOSEG, (SPNAME(I,L),I=1,10), ((C(I,J,K,L),I=1,NOX),J=1,NOY)</p><p>enddo</p><p>enddo</p></td>
<td>
<p>DO 500 I=1,NSPEC</p><p>
&emsp;WRITE (NUPTS) NSEG,(MSPEC(J,I),J=1,10),</p><p>
&emsp;$      (QPTS(I,IP), IP=1,NOPTS)</p><p>
500     CONTINUE</p></td>
<td>每筆基本單元前者為一矩陣、後者為一序列</td>
</tr>
</tbody>
</table>

- Fortran程式碼比較麻煩的是必須逐一給定字串變數的長度、整數、以及實數等等定義。這一方面，最有效的方式還是必須看程式碼範例，此處就不一一列表。

## [uamiv][uamiv]與point_source格式內容之比較(python)
- 詳見[點源nc檔案煙囪參數之版本差異][CAMx67]

[CAMx67]: <https://sinotec2.github.io/Focus-on-Air-Quality/GridModels/PTSE/1.pt_constWork/#點源nc檔案煙囪參數之版本差異> "點源NC檔案煙囪參數之版本差異"
[bnd]: <https://sinotec2.github.io/FAQ/2022/06/27/CAMx_BC.html#uamiv與lateral_boundary格式內容之比較> "uamiv與lateral_boundary格式內容之比較"
[uamiv]: <https://github.com/sinotec2/camxruns/wiki/CAMx(UAM)的檔案格式> "CAMx所有二進制 I / O文件的格式，乃是遵循早期UAM(城市空氣流域模型EPA，1990年）建立的慣例。 該二進制文件包含4筆不隨時間改變的表頭記錄，其後則為時間序列的數據記錄。詳見CAMx(UAM)的檔案格式"
[ioapi]: <https://sinotec2.github.io/Focus-on-Air-Quality/utilities/netCDF/ioapi/> "I/O API(Input/Output Applications Programming Interface)是美國環保署發展Models-3/EDSS時順帶產生的程式庫(cmascenter, I/O API concept)，用來快速存取NetCDF格式檔案，尤其對Fortran等高階語言而言，是非常必須之簡化程序。"