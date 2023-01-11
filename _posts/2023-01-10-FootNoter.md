---
title: Footnoters
tags: note_system code extension
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date: 2023-01-10
modify_date: 2023-01-10 11:43:05
---

> 註腳不是學術論文的專利，
> 在word、wiki、markdown文件中，註腳與數字參照也都是提升整體參考價值的利器。

## 背景

- [[wikitext]]中的註腳幾乎是內設功能，這篇[^2]歷時13年的討論，集中了之前許多的爭論。
  - 總而言之，[markdown][md_wiki]還是沒有把自動編排註釋順序當成是內設、普遍的語言功能，至少在沒有插件的[VScode][VScode]中仍然是看不懂的。
  - 自動編排的需求仍然存在，而且短期內應該是不會改變了。
- 然而`peak(^)`符號+數字已經在很多軟體中以被普遍接受(至少[GitHub][GitHub]、[Jekyll][Jekyll]做出來的部落格)。
- 此處介紹[VScode][VScode]插件中會讓預覽顯示正確的編號與格式。

### [Markdown][md_wiki] Footnote

- 作者為 [Mai Hou][MH][^1]
- 基本上，就只是執行[VScode][VScode]的某項功能(`vscode-markdown-footnote.insertFootnote`)
- [VScode][VScode] preview時會自動在本文與附註之間加上分隔線
- 在[markdown][md_wiki]文字處會有滑鼠顯示
  - 如果已經建好附註，會顯示文字內容
  - 如果還沒有，會提示並按`ctrl-click`跳到文章最末端，並寫好`[^]:`直接打附註內容文字即可。

### [Markdown][md_wiki] Footnotes v0.1.1

- 作者為[Matt Bierner][MB][^3]
- 這個插件的優點
  1. 比較陽春、程式較小
  2. 下載人次較多、更新較為頻繁 
- 在本文不會自動連結並展示附註內容

### 附註寫作要求

- 本文：在需要之處加上`[^1]`即可對應到附註`[^1]:`。順序會再重編。
- 附註格式(範例)
  - `[^1]: Markdown Footnote by [Mai Hou][MH]`
  - `peak(^)`符號後只能接數字，不能接文字
  - `column(:)`冒號後須至少空一格
  - 其後文字、連結、網址、附註等皆可接受
  - 附註與本文間會自動產生一分隔線(是軟體而定)，如果沒有(如[Jekyll][Jekyll]-[Just The Doc][jtd]，可自行加線)
- 附註與參照之間必須分組條列，不能混合。
- 本文與附註的對應數字理論上是1對1關係，如果是多對1的關係，編排後會本文會出現`[1]`、`[1:1]`~`[1:2]`等附註，以顯示引用同一附註。
- 有了插件之後，[VScode][VScode]預覽的本文附註編號是帶著中括弧的，與實際[Jekyll][Jekyll]網頁有差異，後者是沒帶中括弧。下表比較來看，似乎多數平台的附註編號是帶著中括弧。

系統|本文附註編號帶著中括弧|只有數字沒有中括弧
:-:|:-:|:-:
[VScode][VScode]預覽|X|-
[GitHub][github]|X|-
wikipedia|X|-
wikimedia|X|-
[Jekyll][Jekyll]部落格|-|X


### md檔範例

- 本文的[markdown][md_wiki]範例，見[標題](#VScode插件)旁的連結，或見於[github](https://github.com/sinotec2/FAQ/blob/main/_posts/2023-01-04-VSCextension.md)。

[^1]: Markdown Footnote by [Mai Hou][MH](2021)
[^2]: [Markdown footnotes?][mse] meta.stackexchange.com/questions/5017, 2009~2022
[^3]: Adds `[^1]` footnote syntax support to VS Code's built-in Markdown preview, by [Matt Bierner][MB](2022)

## wikitext與markdown註腳寫法的比較

項目|[wikitext][3]|[markdown][MH]|說明
-|-|-|-|
註腳引用|`<ref>參考文字</ref>`|`[^1]`|md只能用數字作為參照，但最後會自動排序(需啟用[插件][4])
註腳彙總|`</Reference>`|`[^1]: 參考文字`|wikitext會自動彙總所有註腳


