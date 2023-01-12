---
title: tiddlywiki
tags: note_system wiki.js tiddlywiki
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date: 2023-01-04
modify_date: 2023-01-12 20:01:44
---

## 背景

- Wiki.js的特色自然是其執行node.js的網站架構，目前還有[Nuclino][Nuclino]、[TiddlyWiki][TiddlyWiki]等其他的系統也是使用javascript的網頁程式，前者是個公司經營的協作系統、後者適合個人筆記系統，沒有資料庫系統程式支援搜尋引擎。
- [使用tiddlywiki的用途和心得](https://www.getit01.com/p20180112331214433/)
- 整體筆記系統可以參考[[2022-10-08-about_note_sw]][^2]、[[2023-01-04-wikijs]]也有wiki.js安裝、使用的介紹。

## TiddlyWiki安裝執行

### system installation

- 安裝與啟動，詳參[ Jermolene /TiddlyWiki5][Jermo]
  - 需要tiddlywiki執行檔
  - 開啟（`--init server`）專屬資料目錄（mynewwiki）

```bash
Open a command line terminal and type:

    npm install -g tiddlywiki
    If it fails with an error you may need to re-run the command as an administrator:
    sudo npm install -g tiddlywiki (Mac/Linux)

Ensure TiddlyWiki is installed by typing:

    tiddlywiki --version

    In response, you should see TiddlyWiki report its current version (eg "5.2.5". You may also see other debugging information reported.)

Try it out:

    tiddlywiki mynewwiki --init server to create a folder for a new wiki that includes server-related components
    tiddlywiki mynewwiki --listen to start TiddlyWiki
    Visit http://127.0.0.1:8080/ in your browser
```

### language

- 中文之設定，詳參[bramchen][bramchen]：修改 `./MyWiki/tiddlywiki.info` ，加入

```java
    "languages": [
        "zh-Hant"
    ]
```

- 注意如果後面還有設定，在"`]`"後要加上"`,`"

### 啟動

- 指定項目
    1. 使用者帳密
    2. host IP
    3. port number
    4. 資料庫名稱

- `tiddlywiki mynewwiki --listen username=ku*ng  password=sino***2 host=125.229.149.182 port=8080`

![](https://raw.githubusercontent.com/sinotec2/FAQ/master/attachments/2023-01-12-20-27-19.png)

### 使用時機

- 因為還是有簡單的帳密管理，不是很公開的資訊，適合在此發布。
- 適合短篇的內容。因為(還)沒有toc，篇幅太長切換不容易。
- 沒有註腳功能
- 會對熱門、特殊的名詞，會自動產生placehoder，呈現出暗藍色。

[^1]: Comparison of wiki software, [wikipedia][cmp](2022)

[^2]: https://sinotec2.github.io/FAQ/2022/10/08/about_note_sw.html " 數位筆記系統使用心得"

[Jermo]: https://github.com/Jermolene/TiddlyWiki5 "Installing TiddlyWiki on Node.js"
[bramchen]: http://bramchen.objectis.net/ "bramchen"
[TiddlyWiki]: https://en.wikipedia.org/wiki/TiddlyWiki "TiddlyWiki is a personal wiki and a non-linear notebook for organising and sharing complex information. It is an open-source single page application wiki in the form of a single HTML file that includes CSS, JavaScript, embedded files such as images, and the text content. It is designed to be easy to customize and re-shape depending on application. It facilitates re-use of content by dividing it into small pieces called Tiddlers."
[Nuclino]: https://en.wikipedia.org/wiki/Nuclino "Nuclino is a cloud-based team collaboration software which allows teams to collaborate and share information in real time.[2][3] It was founded in Munich, Germany in 2015.[4] Some notable features include a WYSIWYG collaborative real-time editor and a visual representation of a team's knowledge in a graph. In addition to its web-based and desktop application, in 2018, Nuclino launched a free mobile app for Android and iOS."
[WikiWikiWeb]: https://zh.wikipedia.org/wiki/WikiWikiWeb "WikiWikiWeb是第一個用戶可編輯的維基網站，於1995年3月25日由其發明者程序員沃德·坎寧安與Portland Pattern Repository網站一起討論軟件設計模式後推出。WikiWikiWeb這個名字最初也是於運行這個網站的維基軟件名稱。這個維基軟件用Perl編程語言編寫，後更名為“WikiBase”。WikiWikiWeb是由坎寧安在1994年開發的，目的是方便程序員之間的思想交流。這個概念是基於坎寧安在20世紀80年代後期編寫HyperCard堆程式時想到的"
[gnu]: https://en.wikipedia.org/wiki/GNU_Affero_General_Public_License "GNU Affero General Public License"
[cmp]: https://en.wikipedia.org/wiki/Comparison_of_wiki_software "Comparison of wiki software"
[wikijs_official]: https://js.wiki/ "The most powerful and extensible open source Wiki software, Make documentation a joy to write using Wiki.js's beautiful and intuitive interface!"
