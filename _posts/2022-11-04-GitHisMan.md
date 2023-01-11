---
title: git歷史紀錄之清除
tags: git
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-11-04
modify_date: 2022-11-04 11:48:01
---

## 背景
- [git](https://zh.wikipedia.org/wiki/Git)做為一個版本管理的系統軟件，會將每次更新的內容進行備份，同時儲存在用戶端及遠端，以備查詢、比較。這對文件(txt format)或程式碼的管理，是非常有幫助的。但對於圖像檔案(gif, png, jpg etc)的管理，則會是一個災難。
  - 所謂的更新紀錄，是指得新舊版本間的**文字**差異
  - 而圖像檔並沒有可以拆分成文字的機會，因此系統必須同時儲存新舊2個版本。因此時間久了，系統將會儲存每個版本的圖像檔案，那儲存空間會很驚人，遠大於[repo][repo]檔案本身。

### 應用情況  
- 以實務而言，sinotec2.github.io上[臺灣未來3天重要點源空品影響預報](https://sinotec2.github.io/cpuff_forecast/)（[[2022-06-06-cpuff_fcst]]）每天會更新模式預報的風場流線檔(png)，以及濃度時序變化的動畫檔(gif)，
  - 目前只有3天PM<sub>10</sub>的預報，檔案雖然不大、最多合計僅有10MB，但因更新紀錄日積月累、很快就使得儲存空間有上GB的消耗，到了必須予以清理的地步。
  - 尤有進者，如果還要持續擴充這個[GitHub Pages](https://pages.github.com/)的功能，如新增別的污染項目、別的模式預報、延長預報的時間長度、等等，每一項都會消耗系統的(儲存)資源。
- github並沒有一處界面可以讓使用者清除紀錄(尚未找到)。而是將此一(危險)動作留給使用者在本地、以git指令進行操作，這是一項保險措施，以避免不可挽回的錯誤。

### 清除策略
- 只設定某些檔案會進入紀錄檔、或防止某些檔案不進入紀錄([filtering](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository))
  - 使用另一個java之自由軟件[bfg(blogpost for The Guardian)](https://rtyley.github.io/bfg-repo-cleaner/)
  - 會針對已經設定的機密文件進行刪除。也會針對大型又有問題的檔案進行移除。
- 只將檔案(而不包括.git紀錄)移轉到一個新的暫存分支([DAVID YANG](https://www.systutorials.com/how-to-clear-git-history-in-local-and-remote-branches/))
  - 不改變既有更新的作業流程
  - 定期執行移轉即可
- 刪除.git目錄([WillAndSkill, 2019](https://www.willandskill.se/en/articles/deleting-your-git-commit-history-without-removing-repo-on-github-bitbucket))
  - 此篇說明被google選為預設答案。
  - 這一類建議似乎較為直接，也不會牽動到原來的分支。
  - 但實際上如將.git刪除，git就不知道該如何動作，還是需要再下載一個全部[repo][repo]的版本，此舉未得印證。
- 每次更新時不留下紀錄([CHEAT SHEETS](https://blog.gitguardian.com/rewriting-git-history-cheatsheet/))
  - 此舉似乎才是正本清源的作法。但實則會增加每次作業的麻煩與錯誤的風險。
  
## 清除git紀錄的作法
### 準備
- 如果本地版本與遠端不符，需要先進行`git pull`
- 如果本地版本錯亂，可以直接刪除目錄，再行`git clone ...(repo)`
- 不要嘗試使用`github desktop`

### 批次檔clean_his.cs

```bash
cd ~/GitHubRepos/sinotec2.github.io/

# create a tmp branch
git checkout --orphan tmp-master

# copy all the files
git add -A

# commit with message
git commit -m 'relocation'

# if exist branch named as master
git branch -D master

# in this case, main branch is used, first delete it
git branch -D main

# rename the on-going branch as main
git branch -m main

TOKEN=$(cat ~/bin/git.token)

# push with --force
git push -f https://sinotec2:$TOKEN@github.com/sinotec2/sinotec2.github.io.git main
```

### crontab
- 一天10MB、3個月即會累積近1GB，因此每3個月執行一次為合理頻率。
- 安排在每天0時執行[daily_traj.cs]()之前，先將遠端[repo][repo]的紀錄予以更新，以減少交換時間。

```bash
#MIN HOUR DOM MON DOW CMD
0    20   1   */3 *   /Users/kuang/GitHub/clean_his.cs >& /Users/kuang/GitHub/clean_his.out
```

### github desktop
- 會存有歷史紀錄的標籤，如果實質上已遭清除，此時無法順利對照。
  1. 刪除`github desktop`之repository開啟紀錄與設定
  1. 重新clone一份新的、無紀錄的版本
- 正常使用`github desktop`


[repo]: <https://zh.wikipedia.org/wiki/儲存庫> "儲存庫（英語：repository）[1]亦稱倉庫、資源庫、資源庫、版本庫、代碼庫、存放庫，在版本控制系統中是指在磁碟儲存上的資料結構，其中包含了檔案、目錄以及元資料。儲存庫可能為分散式（如Git）或集中式（如Subversion）。[2]分散式的儲存庫可以複製到每個使用者的本地；集中式的儲存庫只能儲存在伺服器上。[3]"