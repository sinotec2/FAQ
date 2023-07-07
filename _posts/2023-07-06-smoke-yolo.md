---
layout: article
title: 目測判煙之自動及智慧化
parent: DB
grand_parent: utilities
nav_order: 99
date: 2023-07-06
last_modified_date: 2023-07-06 14:29:18
tags: python matplotlib
aside:
  toc: true
sidebar:
  nav: layouts
---

## 背景

- 雖然台灣地區煙囪或車輛排冒大量煙流的情況已經不多了，然而也正是因為如此，仍然存在著下列的問題與契機:
  - 因污染源、污染行為已經越來越少，如何建立有效的監管制度、穩定之實時監測系統、可避免費時費工之人工監看，同時又能掌握污染源之不定期排放?
  - 除了管道排放之外，還存在著逸散性之污染活動、零星短暫之排放行為，還需要持續強化管制。
  - 如何將自動化系統納入公安管理制度
  - 世界上還是有其他開發中國家需要這項低成本的管制技術
  - 從被動之接受陳情才出動管制，轉成積極性之污染輔導與究查。
  - 火災之智慧化偵測及管理已漸趨成型，有許多的軟件可供參考應用。個別方法在特定個案中表現如何?如何選擇?

### 回顧性文章

- [Chaturvedi et al.(2022)][doi1][^1]這篇最先驅的文獻回顧，將271篇有關煙流的智慧化監測文獻分成：煙流分類、切割、以及框線範圍訂定等3個段落程序進行分析討論。分析方式包括了傳統的畫面分析處理、機器學習、以及深度學習等3大類。影像來源則包括無人飛機、衛星影像、森林定點攝影、以及一般的風景攝影等等。
- 中國蘇州大學團隊[Khan et al., 2022][doi2][^2]認為目前的火災偵防仍然須面臨降低誤報、提高靈敏度與反應性、對高價且複雜的設施提共更加保護等等難題。該回顧論文也針對最近的智慧化偵測提供了不少的解析。

## 工廠煙流偵測

- [呂承恩, 2022][url5]除了用YOLO4進行影像的辨識、分框，分框後的煙流影像則以kmeans法進行叢集，以建立與林格曼色盤之間的關聯性。[^5]
- **分水嶺分割法**是連續分布影響數位化的重要方式之一，常用在光學檢測、圖像分析、醫學像處理等領域，鄭州技術學院團隊[(Ju and Wang, 2022)][doi6]將其應用在工業煤煙之FCN (fully convolutional network)機械辨識系統之中。[^6]
- 影像分析
  - 煙流辨識的目的在取代目測判煙，因此除了標示煙流之外，還必須要能夠較林格曼色盤更佳的定量鑑別能力。這篇來自西班牙阿斯圖里亞斯奧維多大學團隊[(Pedrayes et al., 2023)][doi7]的研究，建立了背景藍光百分比法(SBPB，Sky and Building Percentiles in the Blue channel.)，除了透光度，也將煙流與背景的**色度**應用在影像定量分析，特別對逸散源煙流的解析有其穩定、客觀之優點。[^7]這篇雖然沒有應用神經學習方法，但其影像分析技術可供未來自動化監測的重要參考。
  - 中國科學院大氣物理研究所大氣邊界層物理與大氣化學國家重點實驗室[Feng et al., (2020)][doi11]這篇研究不是將人工智慧應用在煙流辨識，而是應用在地面PM<sub>2.5</sub>空品濃度對煙流形狀特徵的機械學習。除了數位光學相機之外，團隊還應用了光達進行煙流垂直面的影像掃描。經樹狀邏輯解析之後，篩選出煙流長度與地面PM<sub>2.5</sub>濃度有最高的相關性。[^11]
- **煙流上升高度**一般只是個煙囪條件、出口處的氣溫風速相對濕度等等氣項因素的函數推估值，如高斯煙流及網格模式中的計算模組，但對於敏感族群的呼吸健康防護、地面污染成因複雜、或鄰近濱海、複雜地形中的空氣品質監測、預警預報等等，即時監測有其必要性。對於發展更新煙流上升計算模組，也是重要的數據來源。為此，來自多倫多大學[Koushafar et al.(2023)][doi8]所提出的深度學習會是一項有效的解析工具。[^8]
- 鄭州科技大學團隊[(Li et al., 2023)][doi9]將"Generative adversarial network"(生成對抗網絡)應用在工業**煙流複雜情況**之辨識，包括背景雲量干擾、大小差異煙流、低濃度煙流、同時多煙流等地辨識解析[^9]

## 車輛煙流排放偵測

- 一般的煙流辨識軟件應用在車輛尾器與執法上，還有很大的鴻溝：
  1. 要能夠排除背景雜訊(霧氣、車輛本身的陰影、背景道路人孔蓋、水塘、污漬等等)、並建立明確且客觀的定量方式。不能只是辨識。
  2. 計算速度必須夠快，才能執行線上執法
  3. 車輛出力(速度與荷重)與煙流有密切的關連，執法上需有一定的標準，還需要校正。

- [洪詮盛, 2021][url4]這篇論文雖然來自於資工所，對影像的除霧、辨識有所貢獻，文中也對煙流的色度進行解析與記錄，可供進一步建立模型與執法使用。[^4]
- 深圳技術大學大數據與互聯網學院
  - [Peng et al.(2022)][doi10]使用3DCNN(YOLO5tiny)分別辨識車輛與煙流，按照最近距離將此二者配對，[^10]
  - [Chen and Peng(2023)][doi3]匯集了3962個已標車輛註煙流之圖檔資料庫，並公開在[google drive](https://drive.google.com/file/d/1Rt3IEKkriDNQ9wRtpsK5fylvfRlTjjK3/view?usp=share_link)。該文也將過去圖框型態提升到網格化多邊形標示，除了標示作用，也具有發展半定量排放推估模型的潛力。 [^3]

[^1]: Chaturvedi, S., Khanna, P., Ojha, A. (2022). **A survey on vision-based outdoor smoke detection techniques for environmental safety**. ISPRS Journal of Photogrammetry and Remote Sensing 185, 158–187. [doi][doi1]
[^2]: Khan, Fawad, Xu, Z., Sun, J., Khan, Fazal, Ahmed, A., Zhao, Y. (2022). Recent Advances in Sensors for Fire Detection. Sensors 22, 3310. [doi][doi2]
[^3]: Chen, J., Peng, X. (2023). **DB-Net: Detecting Vehicle Smoke with Deep Block Networks**. Applied Sciences 13. [doi][doi3]
[^4]: 洪詮盛 (2021). **結合YOLOv4煙霧偵測與AOD-Net影像除霧之深度學習技術於車輛廢氣排放檢測系統實作**. 指導教授陳璽煌。資訊工程系碩士班. 樹德科技大學, 高雄市.[url][url4]
[^5]: 呂承恩 (2022). **利用人工智慧建立煙霧不透光率辨識系統**. 環境科學與工程學系. 東海大學, 台中市.[url][url5]
[^6]: Ju, A., Wang, Z. (2022).**A novel fully convolutional network based on marker-controlled watershed segmentation algorithm for industrial soot robot target segmentation**. Evolutionary Intelligence 16, 1–18. [doi][doi6]
[^7]: Pedrayes, O.D., Usamentiaga, R., García, D.F. (2023). **Fully automated method to estimate opacity in stack and fugitive emissions: A case study in industrial environments**. Process Safety and Environmental Protection 170, 479–490. [doi][doi7]
[^8]: Koushafar, M., Sohn, G., Gordon, M. (2023). **Deep Convolutional Neural Network for Plume Rise Measurements in Industrial Environments.** Remote Sensing 15, 3083. [doi][doi8]
[^9]: Li, D., Yang, R., Su, C. (2023). **Generative adversarial network based on LSTM and convolutional block attention module for industrial smoke image recognition.** Computer Science and Information Systems 27–27. [doi][doi9]
[^10]: Peng, X., Fan, X., Wu, Q., Zhao, J., Gao, P. (2022). **Video-based Smoky Vehicle Detection with A Coarse-to-Fine Framework.** arXiv:2207.03708.[doi][doi10]
[^11]: Feng, L., Yang, T., Wang, D., Wang, Z., Pan, Y., Matsui, I., Chen, Y., Xin, J., Huang, H. (2020). **Identify the contribution of elevated industrial plume to ground air quality by optical and machine learning methods**. Environ. Res. Commun. 2, 021005. [doi][doi11]

[doi11]: https://doi.org/10.1088/2515-7620/ab7634 "(Feng et al., 2020)"
[doi10]: https://doi.org/10.48550/arXiv.2207.03708
[doi9]: https://doi.org/10.2298/CSIS221125027L "(Li et al., 2023)"
[doi8]: https://doi.org/10.3390/rs15123083 "(Koushafar et al., 2023)"
[doi7]: https://doi.org/10.1016/j.psep.2022.12.023 "'"
[doi6]: https://doi.org/10.1007/s12065-022-00708-z
[url5]: https://hdl.handle.net/11296/43b7s4 "呂承恩, 2022"
[url4]: https://hdl.handle.net/11296/364pzk "洪詮盛, 2021"
[doi3]: https://doi.org/10.3390/app13084941 "(Chen and Peng, 2023)"
[doi2]: https://doi.org/10.3390/s22093310 "(Khan et al., 2022)"
[doi1]: https://doi.org/10.1016/j.isprsjprs.2022.01.013 "(Chaturvedi et al., 2022)"
