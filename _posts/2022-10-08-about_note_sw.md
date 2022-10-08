---
title: 筆記系統使用心得
tags: note_system
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-10-08
modify_date: 2022-10-08 05:16:54
---
## 背景
### 功能需求
- 如題所示，這篇筆記是針對這些年來筆記系統的發展與個人的使用經驗心得。先就筆記系統的重要元件要求條例如下：
  - 介面
    1. 容易操作、容易上手、軟體介面親人性
    1. 中文化輸入、輸出
    1. 目錄系統：文章內、外；無限制、多層次目錄、
    1. 有簡潔的顯示版面，最好可以直接展示、用在簡報、教學，不必另外做ppt檔案。
    1. 跨文搜尋、置換、關鍵字索引系統
    1. 圖、表、公式、(程式碼)、索引系統
  - 儲存、分享、透明度管理
    1. 雲端儲存、異地備援、版本管理。
    1. 團隊協作時易於分享、URL不要是亂碼。
    1. 檔案格式容易轉移、修改。
  - 品牌、系列
    1. 系統持續更新。不更新的棄養軟體趁早轉換，然而更新速度如果太快也蠻干擾的。
    1. 市佔高、主流化
    1. 系列其他產品功能
- 筆記系統不是：
  1. 隨手塗鴉、無法分享的手札
  1. 特殊目的的便利貼app，如記帳、行程約會日誌、
  1. KM系統、教學平台

### 網路介紹文章
- 要每年寫這種回顧性的文章不容易，畢竟軟體的領域日新月異、江山代有才人出。
- [2022筆記軟體][welcometw]
  - 這篇介紹10大筆記軟體：#1 [Evernote][Evernote]、、＃2 [Notion][notion]、＃3 [GoodNotes][GoodNotes]、＃4 Notability、＃5 Microsoft [Onenote][onenote]、＃6 [SimpleNote][SimpleNote]、＃7 Google [keep][keep]、＃8 Trello、＃9 Ulysses、＃10 Notebook。其中也有不少下面會介紹到。
  - 這篇介紹筆記軟體的應用範圍不限於工作及學習，還包括生活中的代辦事項、隨手札記、旅行筆記、記帳、行事曆等模板也一應俱全。
- [2021年7大實用筆記軟體推薦][Shining Chan, 2021]
  - 因為是職涯發展公司，介紹的多半是工作筆記，包括了一、[Evernote][Evernote]，二、Microsoft [OneNote][onenote]，三、[Notion][notion]，四、Google [Keep][keep]，五、[GoodNotes][GoodNotes]，六、Notability，七、[SimpleNote][SimpleNote]。
  - 這一篇開頭就把場景拉到學生時代寫紙本筆記的場域，來強調電子化筆記的必要性與好處。這對剛踏出學校的社會新鮮人會有誘因。不過現在大學生也普遍在使用筆記軟體系統，這篇就顯得有點粗淺了。

### 主打方案
- 經過近一年的發展，目前[VSCode+GitHubDesktop][vc_gh]方案已漸趨穩定，適用在程式說明、文獻回顧等領域，有其值得推薦之處。
  1. 目前在此領域市佔率最高。GitHub為最大程式共享平台。
  1. 銜接github.io等等公開分享平台，網站運作穩定、快速
  1. VSCode有最簡單、完整的編輯界面。
  1. 符合前述功能需求
- VScode與GitHub的連結
  - VSCode就可以直接進行Github的存取，詳見[ CoderDave: How To Use GitHub with Visual Studio Code | GitHub VSCode showtime](https://www.youtube.com/watch?v=aUhl3B6ZweQ)
  - Github也提供了網路版的VSCode介面，只需要在Repository畫面下[按下鍵盤“.”](https://www.minwt.com/webdesign-dev/html/23154.html)。


## 使用經驗與評論
### 主要筆記軟體
- 前述筆記軟體中[Evernote][Evernote]筆者使用時間最長、也成為付費會員，但後來因為對程式碼太不友善、且網路更新速度超慢、分享網站是長串隨機碼，看了許多付費網友紛紛解約，也就不再維護了。
- [GoodNotes][GoodNotes]用在ipad上看報告、改報告很好用，但隨著筆者公司職務的調動不再需要改報告，硬體也沒有持續更新，在iPad平台上就沒有持續發展。值得一提的是[noteshelf](https://apps.apple.com/tw/app/noteshelf-%E8%A8%BB%E9%87%8B-%E8%A8%BB%E9%87%8B/id1271086060)，iPad平台上的應用比較，可以看[知乎][知乎]這一篇。
- 在程式員領域有人推薦[notion][notion]，但目錄層次不夠，寫了一些也必須放棄。
- 其他詳細比較條列如下。

### 使用經驗評論列表

項目|Evernote][Evernote]|notion][notion]|[GoodNotes][GoodNotes]|[VCode+GitHubDesktop][vc_gh]

[welcometw]: <https://www.welcometw.com/筆記軟體推薦/> "好好玩台灣電子報，    2022-08-01工具教學	，2022筆記軟體｜筆記app軟體正夯，推薦10個大家都在用的熱門筆記軟體，線上作筆記超便利"
[Shining Chan, 2021]: <https://glints.com/tw/blog/note-taking-software-recommendation/> " Shining Chan, 2021 職涯成長->技能提升->工具->筆記軟體是什麼？有什麼優點？2021年7大實用筆記軟體推薦"
[Evernote]: <https://evernote.com/intl/zh-tw> "整理您的工作、整頓您的生活。您的記事、工作事項、行事曆全都集中一處，輕鬆記住所有事情、處理任何專案都游刃有餘。"
[notion]: <https://www.notion.so/zh-tw/product?fredir=1>
[GoodNotes]: <https://www.goodnotes.com/zh-hk> "靈感，無紙境。以手寫的觸感，享受在無限的空間下紀錄每個想法的樂趣。"
[onenote]: <https://www.microsoft.com/zh-tw/microsoft-365/onenote/digital-note-taking-app> "Microsoft OneNote您的數位筆記本一個跨功能的筆記本可滿足您所有做筆記的需求。"
[onenote-tutorial]: <https://glints.com/tw/blog/onenote-tutorial/> "不藏私OneNote教學！7個實用技巧帶你從0上手筆記軟體"
[keep]: <https://keep.google.com/> "隨時隨地記錄所思所想"
[SimpleNote]: <https://simplenote.com/> "The simplest way to keep notes, All your notes, synced on all your devices. Get Simplenote now for iOS, Android, Mac, Windows, Linux, or in your browser."
[知乎]: <https://www.zhihu.com/question/22238071> "iPad 笔记应用 UPad、Noteshelf、GoodNotes 哪个更值得买？"
[vc_gh]: <http://www.rodanthi-alexiou.com/github-101-github-desktop-and-vscode/> "GitHub 101 – GitHub Desktop and VSCode"
http://simp.ly/p/DGxfVH