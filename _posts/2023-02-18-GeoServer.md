---
layout: article
title: GeoServer之WMS建置
parent: GIS
grand_parent: utilities
nav_order: 99
date: 2023-02-18
last_modified_date: 2023-02-18 16:41:55
tags: GIS forecast graphics
aside:
  toc: true
sidebar:
  nav: layouts
---

## 背景

- GIS用作CMAQ或其他模式模擬結果的顯示界面，雖然有些大材小用，也有其應用上的必要性。如[GMOS SDI][1][^1]資訊架構、雲端網頁處理及服務系統[^2]、ICARUS DSS[^3]。

[^1]: Global Mercury Observation System Spatial Data Infrastructure (SDI)，in presentation of [Nicola Pirrone（2011）][1]
[^2]: Zhang, C., Di, L., Sun, Z., Lin, L., Yu, E., Gaigalas, J. (2019). Exploring cloud-based Web Processing Service: A case study on the implementation of CMAQ as a Service. [Environmental Modelling and Software][2] 113. https://doi.org/10.1016/j.envsoft.2018.11.019
[^3]: UPCOM, KARTEKO, ARTEMIS, AUTH (2021). Report on the design of technical framework and system architecture of the ICARUS DSS, WP7: Motivating citizens towards the vision in Integrated Climate forcing and Air Pollution Reduction in Urban Systems([ICURAS][3]).



[1]: https://www.earthobservations.org/documents/meetings/201111_geo8_eu/GMOS.Nicola%20Pirrone.pdf "Nicola Pirrone（2011）Global Mercury Observation SystemGlobal Mercury Observation System -- GMOS ––， Funded by: European Commission – DG Research， (2010 – 2015）"
[2]: https://www.researchgate.net/publication/329635993_Exploring_cloud-based_Web_Processing_Service_A_case_study_on_the_implementation_of_CMAQ_as_a_Service "(Zhang et al., 2019)"
[3]: https://icarus2020.eu/wp-content/uploads/2017/08/D.7.2_ICARUS_Design_of_%2520technical_framework_and_system_architecture_of_the_ICARUS_DSS_FINAL.pdf "Integrated Climate forcing and Air Pollution Reduction in Urban Systems"