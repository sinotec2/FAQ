---
title: VScode插件
tags: note_system code
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date: 2023-01-04
modify_date: 2023-01-04 10:36:19
---

## 背景

- VSCode作為一個完整功能的IDE，然而也開放程式設計者提供他們的插件與服務(部分需付費)，算是一個不小的市集平台。

## Footnoters

- 這篇[^2]集中了之前許多的討論。總而言之，markdown還是沒有把自動編排註釋順序當成是內設、普遍的語言一部分，在GitHub中仍然是看不懂的。
- 然而`peak(^)`符號+數字已經在很多軟體中以被普遍接受(至少VScode extensions、Jekyll)，此處介紹VScode插件中會讓VScode預覽顯示正確的編號與格式。

### Markdown Footnote

- 作者為 [Mai Hou][MH][^1]
- 基本上，就只是執行VScode的某項功能`vscode-markdown-footnote.insertFootnote`)
- VScode preview時會自動在本文與附註之間加上分隔線
- 在markdown文字處會有滑鼠顯示
  - 如果已經建好附註，會顯示文字內容
  - 如果還沒有，會提示並按`ctrl-click`跳到文章最末端，並寫好`[^]:`直接打附註內容文字即可。

### Markdown Footnotes v0.1.1

- 作者為[Matt Bierner][MB][^3]
- 這個插件的優點
  1. 比較陽春、程式較小
  2. 下載人次較多、更新較為頻繁 
- 在本文不會自動連結並展示附註內容

### 附註寫作要求

- 本文：在需要之處加上`[^1]`即可對應到附註`[^1]:`。順序會再重編。
- 附註格式(範例)：`[^1]: Markdown Footnote by [Mai Hou][MH]`
  - `peak(^)`符號後只能接數字，不能接文字
  - `column(:)`冒號後須至少空一格
  - 其後文字、連結、網址、附註等皆可接受
  - 附註與本文間會自動產生一分隔線(是軟體而定)，如果沒有(如Jekyll，可自行加線)
- 附註與參照之間必須分組條列，不能混合。

[^1]: Markdown Footnote by [Mai Hou][MH](2021)
[^2]: [Markdown footnotes?][mse] meta.stackexchange.com/questions/5017, 2009~2022
[^3]: Adds `[^1]` footnote syntax support to VS Code's built-in Markdown preview, by [Matt Bierner][MB](2022)

[MH]: <https://marketplace.visualstudio.com/publishers/houkanshan> "Markdown Footnote"
[mse]: <https://meta.stackexchange.com/questions/5017/markdown-footnotes> "Markdown footnotes? Asked 13 years, 5 months ago, Modified 1 month ago, Viewed 38k times"
[MB]: <>

