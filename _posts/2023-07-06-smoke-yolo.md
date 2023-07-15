---
layout: article
title: 目測判煙、影像分析之自動及智慧化
parent: DB
grand_parent: utilities
nav_order: 99
date: 2023-07-06
last_modified_date: 2023-07-15 19:13:33
tags: python matplotlib
aside:
  toc: true
sidebar:
  nav: layouts
---

## 背景

### 研究著眼點

- 雖然台灣地區煙囪或車輛排冒大量煙流的情況已經不多了，然而也正是因為如此，仍然存在著下列的問題與契機:
  - 因污染源、污染行為已經越來越少，如何建立有效的監管制度、穩定之實時監測系統、可避免費時費工之人工監看，同時又能掌握污染源之不定期排放?
  - 除了管道排放之外，還存在著逸散性之污染活動、零星短暫之排放行為，還需要持續強化管制。
  - 如何將自動化系統納入公安管理制度
  - 世界上還是有其他開發中國家需要這項低成本的管制技術
  - 從被動之接受陳情才出動管制，轉成積極性之污染輔導與究查。
  - 火災之智慧化偵測及管理已漸趨成型，有許多的軟件可供參考應用。個別方法在特定個案中表現如何?如何選擇?

### 回顧性文章

- [Chaturvedi et al.(2022)][doi1][^1]這篇宣稱最先驅的文獻回顧，將271篇有關煙流的智慧化監測文獻分成：煙流分類、切割、以及框線範圍訂定等3個段落程序進行分析討論。
  - 分析方式：包括了傳統的畫面分析處理、機器學習、以及深度學習等3大類。
  - 影像來源：則包括無人飛機、衛星影像、森林定點攝影、以及一般的風景攝影等等。
- [(Grant-Jacob and Mills, 2022)][doi13]將所有粒狀物偵測、辨識、預報、以及推論等等AI應用，做了下圖之整合說明。除了視覺的偵測之外，文中也整合了目前所有粒狀物的其他偵測方式，甚至包括了鏡檢之智慧辨識。[^13]

![](https://github.com/sinotec2/FAQ/raw/main/attachments/2023-07-15-23-28-20.png)

- 中國蘇州大學團隊[Khan et al., 2022][doi2][^2]認為目前的火災偵防仍然須面臨降低誤報、提高靈敏度與反應性、對高價且複雜的設施提共更加保護等等難題。該回顧論文也針對最近的智慧化偵測提供了不少的解析。

## 工廠煙流偵測

- [呂承恩, 2022][url5]除了用YOLO4進行影像的辨識、分框，分框後的煙流影像則以kmeans法進行叢集，以建立與林格曼色盤之間的關聯性。[^5]
- **分水嶺分割法**是連續分布影響數位化的重要方式之一，常用在光學檢測、圖像分析、醫學像處理等領域，鄭州技術學院團隊[(Ju and Wang, 2022)][doi6]將其應用在工業煤煙之FCN (fully convolutional network)機械辨識系統之中。[^6]
- 影像分析
  - 煙流辨識的目的在取代目測判煙，因此除了標示煙流之外，還必須要能夠較林格曼色盤更佳的定量鑑別能力。這篇來自西班牙阿斯圖里亞斯奧維多大學團隊[(Pedrayes et al., 2023)][doi7]的研究，建立了背景藍光百分比法(SBPB，Sky and Building Percentiles in the Blue channel.)，除了透光度，也將煙流與背景的**色度**應用在影像定量分析，特別對逸散源煙流的解析有其穩定、客觀之優點。這篇雖然沒有應用神經學習方法，但其影像分析技術可供未來自動化監測的重要參考。[^7]
  - 中國科學院大氣物理研究所大氣邊界層物理與大氣化學國家重點實驗室[Feng et al., (2020)][doi11]這篇研究不是將人工智慧應用在煙流辨識，而是應用在地面PM<sub>2.5</sub>空品濃度對煙流形狀特徵的機械學習。除了數位光學相機之外，團隊還應用了光達進行煙流垂直面的影像掃描。經樹狀邏輯解析之後，篩選出煙流長度與地面PM<sub>2.5</sub>濃度有最高的相關性。[^11]
- **煙流上升高度**一般只是個煙囪條件、出口處的氣溫風速相對濕度等等氣項因素的函數推估值，如高斯煙流及網格模式中的計算模組，但對於敏感族群的呼吸健康防護、地面污染成因複雜、或鄰近濱海、複雜地形中的空氣品質監測、預警預報等等，即時監測有其必要性。對於發展更新煙流上升計算模組，也是重要的數據來源。為此，來自多倫多大學[Koushafar et al.(2023)][doi8]所提出的深度學習會是一項有效的解析工具。[^8]
- 鄭州科技大學團隊[(Li et al., 2023)][doi9]將"Generative adversarial network"(生成對抗網絡、GAN、見ChatGPT說明[^12])應用在工業**煙流複雜情況**之辨識，包括背景雲量干擾、大小差異煙流、低濃度煙流、同時多煙流等地辨識解析[^9]

## 車輛煙流排放偵測

- 一般的煙流辨識軟件應用在車輛尾器與執法上，還有很大的鴻溝：
  1. 要能夠排除背景雜訊(霧氣、車輛本身的陰影、背景道路人孔蓋、水塘、污漬等等)、並建立明確且客觀的定量方式。不能只是辨識。
  2. 計算速度必須夠快，才能執行線上執法
  3. 車輛出力(速度與荷重)與煙流有密切的關連，執法上需有一定的標準，還需要校正。

- [洪詮盛, 2021][url4]這篇論文雖然來自於資工所，對影像的除霧、辨識有所貢獻，文中也對煙流的色度進行解析與記錄，可供進一步建立模型與執法使用。[^4]
- 深圳技術大學大數據與互聯網學院
  - [Peng et al.(2022)][doi10]使用3DCNN(YOLO5tiny)分別辨識車輛與煙流，按照最近距離將此二者配對，[^10]
  - [Chen and Peng(2023)][doi3]匯集了3962個已標車輛註煙流之圖檔資料庫，並公開在[google drive](https://drive.google.com/file/d/1Rt3IEKkriDNQ9wRtpsK5fylvfRlTjjK3/view?usp=share_link)。該文也將過去圖框型態提升到網格化多邊形標示，除了標示作用，也具有發展半定量排放推估模型的潛力。 [^3]

## 不特定對象影像分析之智慧化

### 香港中文大學

2021～2022這3篇來自中文大學地理資源管理系的論文，先建立手機影像與衛星影像粒狀物的散光特性以及濃度的特性後，再從公開爬取的網路照片中，建立更廣泛的對照資料庫，應用機器學習來推估粒狀物的即時空氣品質。[^16] [^17] [^18]。

### 西北師範大學資科工系

這2篇論文以特定點、特定景物的連續照片與粒狀物濃度對照資料庫，訓練人工神經網路，用於其他沒有測站位置（廣大鄉村範圍）、即時空氣品質的監測。[^14]  [^24] 

### 台大團隊

以林園工業區的影像與地面測站粒狀物空氣品質、AQI等3549組逐時數據庫進行機械學習與類別回歸。[^23]

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
[^12]: 生成对抗网络（Generative Adversarial Network，GAN）是一种深度学习模型，由生成器（Generator）和判别器（Discriminator）组成。GAN 的原理是通过生成器和判别器之间的对抗训练来生成逼真的样本数据。GAN 的工作原理如下：
-生成器（Generator）接受一个随机噪声向量作为输入，并尝试生成与训练数据相似的样本数据。
-判别器（Discriminator）接受样本数据（来自训练数据或生成器生成的数据）作为输入，并尝试区分出真实样本和生成样本。
-生成器和判别器通过对抗训练相互竞争。生成器的目标是生成尽可能逼真的样本以欺骗判别器，而判别器的目标是准确地识别真实样本和生成样本。
在训练过程中，生成器和判别器通过反复迭代来提高性能。生成器通过学习从随机噪声向量到逼真样本的映射，而判别器通过学习区分真实样本和生成样本。
通过这种对抗性的训练过程，生成器逐渐改进生成的样本，使其更接近真实样本的分布。最终，生成器可以生成具有高度逼真性质的样本数据。
GAN 在数据科学中有许多应用，包括：
    -图像生成：GAN 可以生成逼真的图像样本，例如生成人脸、动物图像、艺术作品等。它可以用于图像增强、数据增强、虚拟现实等领域。
    -数据合成：GAN 可以生成合成的数据样本，用于数据集的扩充和增强。这对于数据稀缺的情况下进行训练非常有用。
    -超分辨率图像重建：GAN 可以通过学习低分辨率图像与高分辨率图像之间的关系，实现图像的超分辨率重建。
    -生成文本和音频：GAN 可以生成逼真的文本段落、对话和音频样本，用于自然语言处理和语音识别等任务。
    -强化学习：GAN 可以与强化学习结合，用于生成与环境交互的智能体的样本数据，以提高强化学习模型的性能。
尽管 GAN 在生成逼真样本方面取得了重要进展，但训练 GAN 模型仍然具有挑战性，例如模式崩溃、模式塌陷和训练不稳定等问题。然而，随着技术的不断发展，GAN 在数据科学中的应用前景仍然非常广阔。
[^13]: Grant-Jacob, J., Mills, B. (2022). **Deep learning in airborne particulate matter sensing: a review.** Journal of Physics Communications 6, 122001. [doi][doi13]
[^15]: Su, P., Liu, Y., Tarkoma, S., Rebeiro-Hargrave, A., Petaja, T., Kulmala, M., Pellikka, P. (2022). **Retrieval of Multiple Atmospheric Environmental Parameters From Images With Deep Learning**. IEEE Geoscience and Remote Sensing Letters 19, 1–1. [doi](https://doi.org/10.1109/LGRS.2022.3149045)
[^16]: Yao, S., Huang, B. (2021). **Extraction of Aerosol Optical Extinction Properties From a Smartphone Photograph to Measure Visibility.** IEEE Transactions on Geoscience and Remote Sensing PP, 1–1. [doi](https://doi.org/10.1109/TGRS.2021.3132431)
[^17]: Yao, S., Wang, F., Huang, B. (2022). **Measuring PM2.5 Concentrations from a Single Smartphone Photograph.** Remote Sensing 14, 2572. [doi](https://doi.org/10.3390/rs14112572)
[^18]: Wang, F., Yao, S., Luo, H., Huang, B. (2022). **Estimating High-Resolution PM2.5 Concentrations by Fusing Satellite AOD and Smartphone Photographs Using a Convolutional Neural Network and Ensemble Learning**. Remote Sensing 14, 1515. [doi](https://doi.org/10.3390/rs14061515)
[^19]: Wang, X., Wang, M., Liu, X., Zhang, X., Li, R. (2022). **A PM2.5 concentration estimation method based on multi-feature combination of image patches**. Environmental Research 211, 113051. [doi](https://doi.org/10.1016/j.envres.2022.113051)
[^20]: Ahmed, Maqsood, Shen, Y., Ahmed, Mansoor, Xiao, Z., Cheng, P., Nafees, A., Ghaffar, A., Ali, S. (2022). **AQE-Net: A Deep Learning Model for Estimating Air Quality of Karachi City from Mobile Images**. Remote Sensing 14, 5732. [doi](https://doi.org/10.3390/rs14225732)
[^21]: Mohan, A., Abraham, L. (2023). **Particulate Matter Concentration Estimation from Images Based on Convolutional Neural Network**. [doi](https://doi.org/10.1007/978-981-19-7513-4_5)
[^22]: Ahmed, M., Xiao, Z., Shen, Y. (2022). **Estimation of Ground PM2.5 Concentrations in Pakistan Using Convolutional Neural Network and Multi-Pollutant Satellite Images.** Remote Sensing 14, 1735. [doi](https://doi.org/10.3390/rs14071735)
[^23]: Pu Yun, K., Hsia, I.-W., Chang, L.-C., Chang, F.-J. (2022). **Real-time image-based air quality estimation by deep learning neural networks.** Journal of Environmental Management 307, 114560. [doi](https://doi.org/10.1016/j.jenvman.2022.114560)
[^14]: Zhang, Q., Fu, F., Tian, R. (2020). **A deep learning and image-based model for air quality estimation.** Science of The Total Environment 724, 138178. [doi](https://doi.org/10.1016/j.scitotenv.2020.138178)
[^24]: Zhang, Q., Tian, L., Fu, F., Wu, H., Wei, W., Liu, X. (2022). **Real‐Time and Image‐Based AQI Estimation Based on Deep Learning**. Advanced Theory and Simulations 5. [doi](https://doi.org/10.1002/adts.202100628)
[^25]: Sheikh, S., Raut, S., Rane, S., Raut, P. (2022). **Air Quality Detection using Land Coverage Machine Learning Techniques- CNN.** International Journal of Advanced Research in Science, Communication and Technology 475–482. [doi](https://doi.org/10.48175/IJARSCT-3957)
[^26]: Mondal, J.J., Islam, M., Islam, R., Rhidi, N., Manab, M.A., Islam, A.B.M.A.A., Noor, J. (2022). **Unmasking the Invisible: Finding Location-Specific Aggregated Air Quality Index with Smartphone Images**, Presented at the 9th International Conference on Networking, Systems and Security (NSysS 2022), Cox’s Bazar, Bangladesh. [doi](https://doi.org/10.13140/RG.2.2.12552.08968)


[doi13]: https://doi.org/10.1088/2399-6528/aca45e "(Grant-Jacob and Mills, 2022)"
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
