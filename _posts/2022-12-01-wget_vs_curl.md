---
title: curl與wget下載之比較
tags: note_system
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-11-15
modify_date: 2022-11-15
---

## 背景

- 雖然curl與wget是2個不同等級的程式，但在下載應用領域何者更為方便、穩定，還有一番論戰。

## 斷點續傳

### curl 斷點續傳

```bash
#continue from last position(-)
# Object and Location redirectted(if so)
curl -C - -OL https://... 

#number of retrials
curl --retry 5 -C - -OL https://...
```

### wget 斷點續傳

opt|value|meaning|command
-|-|-|-
-w|--wait=秒數(**m**in,**h**our,**d**ay)|每次下載檔案之**前**等待指定秒數|
-|--waitretry=秒數|每次重覆嘗試前稍等一段時間 (由暫停1秒增加至指定秒數)|
-|--random-wait|每次下載之前隨機地指定等待的時間|
-|--retry-connrefused(on/off)|針對不太穩定的伺服器|
-t|--tries=10|number of retries,  0 or inf for infinite retrying|

[How to retry connections with wget?](https://superuser.com/questions/493640/how-to-retry-connections-with-wget) on https://superuser.com/

```bash
while [ 1 ]; do
    wget --retry-connrefused --waitretry=1 --read-timeout=20 --timeout=15 -t 0 --continue
    if [ $? = 0 ]; then break; fi; # check return value, break if successful (0)
    sleep 1s;
done;
```

## Silent/quiet

### curl silent

- by [Peter, 2022/11](https://catonmat.net/cookbooks/curl/make-curl-silent)

```bash
# Hide Errors and Progress Bar (but Print Response)
curl -s https://...
curl --silent https://...

# Dead Silent
curl -s -o /dev/null https://...

# Dead Silent except the Error
curl -S -s -o /dev/null https://...
```

### wget quiet

```bash
# Turn off verbose 
wget -nv https://...
wget --no-verbose https://...

# completely quiet
wget -q https://...
wget --quiet https://...
```
