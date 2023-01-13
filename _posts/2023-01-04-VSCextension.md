---
title: VScode插件
tags: note_system code extension
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date: 2023-01-04
modify_date: 2023-01-13 16:11:59
alias: 插件
---

## 背景

- [VScode][VScode]雖然是一個完整功能的[IDE][IDE]，然而也開放程式設計者提供他們的插件與服務(部分需付費)，算是一個不小的[市集平台][marketplace]。

## foam

- 這個插件大幅提升VSCode的能力與角色，不只是一個短期的整體發展環境工具，還是累積個人長期知識庫的管理介面。
- 詳見([[2023-01-12-FOAM]][^4])

## Footnoters

- [Markdown][md_wiki] Footnote
- 作者為 [Mai Hou][MH][^1]
- 基本上，就只是執行[VScode][VScode]的某項功能(`vscode-markdown-footnote.insertFootnote`)
- [VScode][VScode] preview時會自動在本文與附註之間加上分隔線
- 在[markdown][md_wiki]文字處會有滑鼠顯示
  - 如果已經建好附註，會顯示文字內容
  - 如果還沒有，會提示並按`ctrl-click`跳到文章最末端，並寫好`[^]:`直接打附註內容文字即可。
- 其他選擇、各個發布平台的表現等詳見[Footnoter][Footnoter](also [[2023-01-10-FootNoter]])

## Paste Image

- 雖然Paste Image[^2]這個插件並非最新、不是最完整、也不是最多人下載，算是非常單純又好用的插件，安裝並使用詳見[[2023-01-10-PasteImage]][^3]

## todo tree

- 如果要在茫茫的文件海中，找到該做的事、值得做的事，會是一個很大的困擾，這個下載量2.5M的插件[todo tree][TT] (see also [[2023-01-13-todo_tree]])可以有效的彙總，提供瀏覽、數字管理，將筆記的寫作納入日常管理。

[^1]: Markdown Footnote by [Mai Hou][MH](2021)
[^2]: Paste Image 1.0.4(2019版), [mushan(2019)][mushan(2019)]
[^3]: [2023-01-10-PasteImage](https://sinotec2.github.io/FAQ/2023/01/10/PasteImage.html)
[^4]: 自由版的ROAM： 個人知識庫的解決良方。同時兼顧發布與儲存、分散及結構、適合程式及知識發展。[foam](https://sinotec2.github.io/FAQ/2023/01/12/FOAM.html)

[mushan(2019)]: https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image "Paste Image 1.0.4(2019版), mushan(2019)"
[MH]: https://marketplace.visualstudio.com/publishers/houkanshan "Markdown Footnote"
[vscode]: https://zh.wikipedia.org/zh-tw/Visual_Studio_Code "Visual Studio Code（簡稱 VS Code）是一款由微軟開發且跨平台的免費原始碼編輯器[8]。該軟體支援語法突顯、程式碼自動補全（又稱 IntelliSense）、程式碼重構功能，並且內建了命令列工具和 Git 版本控制系統[9]。使用者可以更改佈景主題和鍵盤捷徑實現個人化設定，也可以透過內建的擴充元件程式商店安裝擴充元件以加強軟體功能。"
[ide]: https://zh.wikipedia.org/zh-tw/集成开发环境 "集成开发环境、整合開發環境"
[md_wiki]: https://zh.wikipedia.org/zh-tw/Markdown "Markdown是一種輕量級標記式語言，創始人為約翰·格魯伯。它允許人們使用易讀易寫的純文字格式編寫文件，然後轉換成有效的XHTML（或者HTML）文件。[4]這種語言吸收了很多在電子郵件中已有的純文字標記的特性。"
[marketplace]: https://marketplace.visualstudio.com/ "Extensions for Visual Studio Code"
[TT]: https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree "Todo Tree by Gruntfuggly |  2,573,548 installs|(152) | Free, Show TODO, FIXME, etc. comment tags in a tree view"
[Footnoter]: https://sinotec2.github.io/FAQ/2023/01/10/FootNoter.html "註腳不是學術論文的專利， 在word、wiki、markdown文件中，註腳與數字參照也都是提升整體參考價值的利器。"