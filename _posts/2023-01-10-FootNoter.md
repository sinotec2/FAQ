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


[MH]: <https://marketplace.visualstudio.com/publishers/houkanshan> "Markdown Footnote"
[mse]: <https://meta.stackexchange.com/questions/5017/markdown-footnotes> "Markdown footnotes? Asked 13 years, 5 months ago, Modified 1 month ago, Viewed 38k times"
[MB]: <https://marketplace.visualstudio.com/publishers/bierner> "Matt Bierner,是個多產的插件作家，本身是VR軟體工程師 https://blog.mattbierner.com/"
[vscode]: <https://zh.wikipedia.org/zh-tw/Visual_Studio_Code> "Visual Studio Code（簡稱 VS Code）是一款由微軟開發且跨平台的免費原始碼編輯器[8]。該軟體支援語法突顯、程式碼自動補全（又稱 IntelliSense）、程式碼重構功能，並且內建了命令列工具和 Git 版本控制系統[9]。使用者可以更改佈景主題和鍵盤捷徑實現個人化設定，也可以透過內建的擴充元件程式商店安裝擴充元件以加強軟體功能。"
[ide]: <https://zh.wikipedia.org/zh-tw/集成开发环境> "集成开发环境、整合開發環境"
[md_wiki]: <https://zh.wikipedia.org/zh-tw/Markdown> "Markdown是一種輕量級標記式語言，創始人為約翰·格魯伯。它允許人們使用易讀易寫的純文字格式編寫文件，然後轉換成有效的XHTML（或者HTML）文件。[4]這種語言吸收了很多在電子郵件中已有的純文字標記的特性。"
[Jekyll]: <https://zh.wikipedia.org/zh-tw/Jekyll_(博客生成工具)> "Jekyll是一個簡單的靜態網站生成器，用於生成個人，專案或組織的網站。 它由GitHub聯合創始人湯姆·普雷斯頓·沃納用Ruby編寫，並根據MIT授權條款釋出。"
[github]: <https://zh.wikipedia.org/zh-tw/GitHub> "GitHub是一個線上軟體原始碼代管服務平台，使用Git作為版本控制軟體，由開發者Chris Wanstrath、P. J. Hyett和湯姆·普雷斯頓·沃納使用Ruby on Rails編寫而成。在2018年，GitHub被微軟公司收購。"
[marketplace]: <https://marketplace.visualstudio.com/> "Extensions for Visual Studio Code"
[jtd]: <https://just-the-docs.github.io/just-the-docs> "Focus on writing good documentation. Just the Docs gives your documentation a jumpstart with a responsive Jekyll theme that is easily customizable and hosted on GitHub Pages."
[3]: https://www.mediawiki.org/wiki/Help:Formatting/zh "mediawiki->Help:格式化文本"
[4]: https://sinotec2.github.io/FAQ/2023/01/04/VSCextension.html "VScode插件：VScode雖然是一個完整功能的IDE，然而也開放程式設計者提供他們的插件與服務(部分需付費)，算是一個不小的市集平台。"