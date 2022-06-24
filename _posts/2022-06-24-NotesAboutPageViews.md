---
title: 關於網頁
tags: markdown Jekyll html
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
---

其實[JTD][JTD]也是經過一番選擇之後的決定，但半年來隨著文件檔案系統逐漸增加(6月底已經超過350篇文章)，每次更動一小部分、編譯就要5分鐘，似乎不是一個好的筆記系統，感覺是一個文件庫、藏經閣了，失去了靈活度的初衷，需要改變了。


[JTD]: <https://just-the-docs.github.io/just-the-docs> "Focus on writing good documentation. Just the Docs gives your documentation a jumpstart with a responsive Jekyll theme that is easily customizable and hosted on GitHub Pages."

## 主題版本比較評估

|項目|[Just the Docs](https://just-the-docs.github.io/just-the-docs/)|[Theme6](https://idratherbewriting.com/documentation-theme-jekyll/index.html)|[TeXt](https://tianqi.name/jekyll-TeXt-theme/)|評論|
|-|:-:|:-:|:-:|-|
|用途|文件瀏覽|文件/博客|博客|還是要看主要的功能取向才能選擇|
|存檔方式|目錄層級|pages/mydoc下按字母排序|_post下按日期排序|按日期排序的好處是可以快速找到近期正在編輯的檔案，適合做筆記系統。按字母又無層級恐怕只得放棄，在VScode內尋找會比較快一點。|
|左側巡航|會合併、程式自行產生|要自己寫、會隨內容捲動不見|自己寫|自行整理就太辛苦，且與Repository tree(實際檔案儲存的方式)不一致就苦惱了。零散的md檔沒有好的瀏覽層級，恐怕會像大海撈針找不到需要的內容。|
|右側分節瀏覽|無|無|有、反白、且不隨內容捲動|JTD的寬度是Jekyll內設不可能加右線內容，Theme6似乎可以在右側增加個浮動的TOC，還需要加工一下。|
|tags|無|有|有|JTD似乎Mosses曾經加上tags功能|
|topnav|無|有、可增加下拉|有|有個topnav很像一般的網頁對使用者來講有很高的親切感。但topnav的撰寫也是一件繁雜的事。|
|編譯速度|慢|中|快|當檔案多了速度自然會變慢，但如果還要就Tags或Keywords重編，那肯定是不行的。|
|網頁連線|僅不蒜子重新計數|(未知)|計數與cdn.bootcss連線|外掛連線干擾網頁翻動很嚴重，如果零散的文章多了還是會影響到速度，應該要搬到JTD上比較妥當。|

## 局部功能新增調整
### 閱讀量計數
- 用不蒜子的2行已經非常有用且足夠，對龐大的系統效率還可接受，但總是不好看，想在JTD裏更新成像TeXt的樣式
- leancloud(TeXt內設使用)
  - 雖然不是每個網友都推荐，此處也測試了一下。  
  - [jekyll使用LeanCloud记录文章的访问次数/](https://priesttomb.github.io/%E6%97%A5%E5%B8%B8/2017/11/06/jekyll使用LeanCloud记录文章的访问次数/)這篇詳細介紹設定過程，雖然還是沒有成功，但有進步。
  - 可能是呼叫不到leancloud的數據，views次數一直沒有更換。只能放棄，改回用busuanzi
- 參考[網站來訪閱讀人次統計](https://sinotec2.github.io/Focus-on-Air-Quality/utilities/Graphics/HTML/ReadVisitCounts/)，導入[FontAwesome](https://fontawesome.com/)標籤，view：fa-eye、site_visits：fa-chrome、visitors：fa-user

- 在`header_custom.html`檔案中要加入：

```html
  <link rel="stylesheet" href="{{ "/css/font-awesome.min.css" | prepend: site.baseurl | prepend: site.url }}">
```
- `footer_custom.html`引用樣式

```html
<p class="text-small text-grey-dk-100 mb-0">
<i class="fa fa-eye"></i> <span id="busuanzi_container_page_pv">  <span id="busuanzi_value_page_pv"> </span>  views &emsp;</span>
<i class="fa fa-chrome"></i> <span id="busuanzi_container_site_pv"> <span id="busuanzi_value_site_pv"> </span>  site_visits &emsp;</span>
<i class="fa fa-user"></i><span id="busuanzi_container_site_uv"> <span id="busuanzi_value_site_uv"></span> visitors</span>
</p>
```
- 結果：![fa-eye.PNG](https://github.com/sinotec2/Focus-on-Air-Quality/raw/main/assets/images/fa-eye.PNG)

### 文字色框功能
- JTD的文字框真的是很「樸素」，連網友都看不下去，自己也寫了一些改變。需要下面元件
  1. 文字框的模版，將其放在`_include`目錄下，讓`liquid`可以包括進來。html檔範例如下：
  1. 結果如附

```bash
{% include note.html content="Add your note here." %}
{% include tip.html content="Add your tip here." %}
{% include warning.html content="Add your warning here." %}
{% include download.html content="Add your [download]() here." %}
{% include important.html content="Add your remindings here." %}
```

```html
<div markdown="span" class="alert alert-success" role="alert"><i class="fa fa-check-square-o"></i> <b>Tip:</b> {{include.content}}</div>
```
{% include note.html content="Add your note here." %}
{% include tip.html content="Add your tip here." %}
{% include warning.html content="Add your warning here." %}
{% include download.html content="Add your [download]() here." %}
{% include important.html content="Add your remindings here." %}

- (好像[pdmosses](https://pdmosses.github.io/just-the-docs-tests/docs/css/admonitions.html)有精進版)
  - work in JTD's, not in TeXt
  - $blue-000 not found

{: .caution }
Do not blah blah blah...