---
layout: article
title: matplot 中文化問題
parent: DB
grand_parent: utilities
nav_order: 99
date: 2023-05-29
last_modified_date: 2023-05-29 08:42:54
tags: python matplotlib
aside:
  toc: true
sidebar:
  nav: layouts
---

## 背景

- matplotlib繪製圖形、地圖等，需要貼上說明文字時，內設是英數，python 2或matplotlib2時代，對中文確實不太友善，並沒有中文字型。
- 雖然新版的matplotlib已經會自動連結電腦系統的字型，不再需要./matplotlib/fontList.json檔案，但此一筆記也可以應用在需要安裝特定字型情況。

### 問題

問題有3個層次
1. matplotlib的字型有哪些?是否包括了所要的字型?若沒有，是要如何加上、或設為內定字型?
  - 如果找不到指定的字型，程式會報錯。(如simhei.ttf not found)
2. python程式內如何選取字型的種類?
3. python的字型編碼(coding)?與所要讀取檔案(如地圖檔案中的中文字型)的編碼是否能正確解讀、正確轉寫?
  - 程式會報錯utf-8...

## matplotlib的字型庫與內設參數之設定

### 顯示所有目前已經載入記憶體的字型

```python
import matplotlib.font_manager
a = sorted([f.name for f in matplotlib.font_manager.fontManager.ttflist])
for i in a:
  print(i)
```

- 字型有很多，可以選擇所要的字型名稱，寫在python程式中設定為圖形輸出的字型。
- 如果列印出的字型都沒有期待中的字型，需要知道字型庫在哪裡，以便增減。

### fontList.json

- 第一次執行`import matplotlib`時，系統程式會將字型相關參照寫在$HOME/.matplotlib/fontList.json檔案內(或fontlist-vXXX.json、XXX為版次)，包括檔案名稱、字型名稱、寬度、是否可以放大等等，內容如下。

```json
...
 993       "fname": "fonts/ttf/NotoSansTC-Thin.otf",
 994       "name": "Noto Sans TC",
 995       "style": "normal",
 996       "variant": "normal",
 997       "weight": 250,
 998       "stretch": "normal",
 999       "size": "scalable",
1000       "__class__": "FontEntry"
...
```

- 這個檔案不能自行修改，只能閱覽
- 增減字型之後，這個檔案不會自行更新，需手動將其刪除，讓系統程式再去搜尋一遍產生新的json檔。
- 如果是用IDE(包括PyCharm、jupyter、ipython)必須先退出、增減字型後，再重新進入IDE，才會重新搜尋字型。
- json檔中fname只是相對目錄，還必須找到matplotlib之絕對路徑。

### 字型所在之絕對路徑

- 顯示matplotlib之根目錄，以標定字型檔案所在位置

```python
import matplotlib
print(matplotlib.__file__)  
>>> /opt/anaconda3/envs/py37/lib/python3.7/site-packages/matplotlib/__init__.py
```

- 輸出`__init__.py`位置設若稱為`$root`
  - 字型檔案將會放在`$root/mpl-data/fonts/ttf`
  - 所有的內設參數(包括字型等)都放在`$root/mpl-data/matplotlibrc`檔案內

Python Matplotlib 無法顯示中文 (Python初學特訓班、圖表、直線圖) @[查理2017](http://charlieblovett.pixnet.net/blog/post/309808972-python-matplotlib-無法顯示中文)

https://codertw.com/程式語言/359974/
https://matplotlib.org/users/text_props.html?highlight=configuring%20font%20family

## 增減字型

- 因電腦系統字型檔案會有平台版本的差異，為保證顯示上沒有問題，還是以電腦系統現有的字型，安裝到matplotlib可以抓到的位置，這樣比較安全。

### 找到系統現有的字型

- linux/mac可以執行fc-list列出電腦所有可用的字型，要記住字型的**名稱**，以便在python程式內正確選取。

```bash
$ fc-list :lang=zh family

Heiti TC,黑體\-繁,黒体\-繁,Heiti\-번체,黑体\-繁
STSong
.PingFang HK,.蘋方\-港,.苹方\-港
.PingFang SC,.蘋方\-簡,.苹方\-简
Hiragino Sans GB,冬青黑體簡體中文,ヒラギノ角ゴ 簡体中文,冬青黑体简体中文,冬青黑體簡體中文 W3,Hiragino Sans GB W3,ヒラギノ角ゴ 簡体中文 W3,冬青黑体简体中文 W3
Hiragino Sans GB,冬青黑體簡體中文,ヒラギノ角ゴ 簡体中文,冬青黑体简体中文,冬青黑體簡體中文 W6,Hiragino Sans GB W6,ヒラギノ角ゴ 簡体中文 W6,冬青黑体简体中文 W6
.PingFang TC,.蘋方\-繁,.苹方\-繁
PingFang HK,蘋方\-港,苹方\-港
PingFang SC,蘋方\-簡,苹方\-简
.LastResort
PingFang TC,蘋方\-繁,苹方\-繁
GB18030 Bitmap
Heiti SC,黑體\-簡,黒体\-簡,Heiti\-간체,黑体\-简
.Hiragino Sans GB Interface
Arial Unicode MS
Songti TC,宋體\-繁,宋体\-繁
Songti SC,宋體\-簡,宋体\-简
```

- 再列出所在的位置與樣式(style，細、粗、正常等)，前者在複製檔案時需要知道，後者在python程式內設定時會更精確。

```bash
In [18]: !fc-list|grep Songti
/System/Library/Fonts/Supplemental/Songti.ttc: Songti SC,宋體\-簡,宋体\-简:style=Light,細體,细体
/System/Library/Fonts/Supplemental/Songti.ttc: Songti TC,宋體\-繁,宋体\-繁:style=Regular,標準體,常规体
/System/Library/Fonts/Supplemental/Songti.ttc: Songti SC,宋體\-簡,宋体\-简:style=Regular,標準體,常规体
/System/Library/Fonts/Supplemental/Songti.ttc: Songti TC,宋體\-繁,宋体\-繁:style=Light,細體,细体
/System/Library/Fonts/Supplemental/Songti.ttc: Songti SC,宋體\-簡,宋体\-简:style=Black,黑體,黑体
/System/Library/Fonts/Supplemental/Songti.ttc: Songti SC,宋體\-簡,宋体\-简:style=Bold,粗體,粗体
/System/Library/Fonts/Supplemental/Songti.ttc: Songti TC,宋體\-繁,宋体\-繁:style=Bold,粗體,粗体
/System/Library/Fonts/Supplemental/Songti.ttc: STSong:style=Regular,標準體,Ordinær,Normal,Normaali,Regolare,レギュラー,일반체,Regulier,Обычный,常规体
```

### 複製與設定

- 將所要增加的字型檔案、從本機原來位置，或自網路下載檔案，複製到前述`$root/mpl-data/fonts/ttf`目錄下
- 修改`$root/mpl-data/matplotlibrc`檔案
  - 此法不是官網所建議，但許多網友還是這樣做。官網主要考慮的是其他使用者(unix系統)的權益，而網友的實作大多是在PC上，並沒有這層顧慮。只是重灌matplotlib時必須重新再做一遍。
  - 將字型名稱增加在指定的rcParam參數位置，如。
    - `font.sans-serif:simhei, ...`

## python程式內的字型控制

### setting eg.

```python
import matplotlib.pyplot as plt
...
plt.text(x0-0.01, y0-0.004, shape.record[3], fontsize=6)
plt.rcParams['font.sans-serif'] = ['Noto Sans CJK TC']
plot_map(sf)
```

```python
matplotlib.rcParams['font.sans-serif'] = ['Source Han Sans TW', 'sans-serif']
plt.rcParams['font.family'] = 'Microsoft JhengHei UI'
```

### rcParams

The base default font is controlled by a set of rcParams:

rcParam|usage
-|-
'font.family'|List of either names of font or {'cursive', 'fantasy', 'monospace', 'sans', 'sans serif', 'sans-serif', 'serif'}.
'font.style'|The default style, ex 'normal', 'italic'.
'font.variant'|Default variant, ex 'normal', 'small-caps' (untested)
'font.stretch'|Default stretch, ex 'normal', 'condensed' (incomplete)
'font.weight'|Default weight. Either string or integer
'font.size'|Default font size in points. Relative font sizes ('large', 'x-small') are computed against this size.

### 字型別名與rcParam參數

The mapping between the family aliases ({'cursive', 'fantasy', 'monospace', 'sans', 'sans serif', 'sans-serif', 'serif'}) and actual font names is controlled by the following rcParams:

family alias|rcParam with mappings
-|-
'serif'|'font.serif'
'monospace'|'font.monospace'
'fantasy'|'font.fantasy'
'cursive'|'font.cursive'
{'sans', 'sans serif', 'sans-serif'}|'font.sans-serif'

which are lists of font names.

## 鄉鎮區名稱及邊界之繪製

### Wesley之貢獻

- 原始shp檔：[內政部](https://data.gov.tw/dataset/7441)
- 程式：[WeselyOng(2021)](https://github.com/Wesely/Taiwan-Python-Map)
- 程式修改
  1. shape檔案存放的位置
  2. 中文字型
    - 經執行[matplotlib.font_manager](#顯示所有目前已經載入記憶體的字型)以及[fc-list](#找到系統現有的字型)
    - 新版matplotlib(3.5.3)安裝時已經將電腦系統的字型納入
    - 選取`plt.rcParams['font.sans-serif'] = ['WenQuanYi Micro Hei']`即可
  3. 縣市界：因Wesly將東沙島不畫在範圍內，此一邏輯將整個高雄市都排除了，因此需要逐點檢查。此處應用panda.loc來篩選

```python
        x = [i[0] for i in shape.shape.points[:]]
        y = [i[1] for i in shape.shape.points[:]]
        df=pd.DataFrame({'x':x,'y':y})
        df=df.loc[(df.x>118) & (df.x<123) ].reset_index(drop=True)
        x,y=list(df.x),list(df.y)
```

![](https://github.com/sinotec2/FAQ/raw/main/attachments/2023-05-29-10-52-05.png)

![](https://github.com/sinotec2/FAQ/raw/main/attachments/2023-05-29-11-40-52.png)