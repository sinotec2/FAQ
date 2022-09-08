---
title: statsmodels
tags: python
layout: article
aside:
  toc: true
sidebar:
  nav: layouts
date:  2022-09-08
modify_date: 2022-09-08 15:46:40
mermaid: true
---
## 背景
- python平台的統計模組，除了簡單的[statistic](https://docs.python.org/zh-tw/3/library/statistics.html)之外，還有比較完整、普及的[sklearn](https://scikit-learn.org/stable/)、以及此處要介紹高階的統計模型[statsmodels](https://pypi.org/project/statsmodels/)
  1. 比較這兩者的文章（[The Data Incubator, 2017][incubator17]）
  1. sklearn也有此處應用的[GLM模組](https://scikit-learn.org/stable/auto_examples/linear_model/plot_poisson_regression_non_normal_loss.html?highlight=poisson)
  1. [statistic]()沒有統計模型、GLM等高階分析。
- statsmodels 安裝：`pip install statsmodels`
- 中文說明：中文文档([github,2021][github21])、範例([知乎,2022][知乎22]、[和鯨][HW21])、

## python的統計模型
- statsmodels: [https://pypi.org/project/statsmodels/](https://pypi.org/project/statsmodels/)

### 數據準備

```python
import numpy as np
from pandas import *
df=read_csv('LungDisease.csv',encoding='big5')
col=list(df.columns)
lncode=[int(i) for i in list(df.YMCode)]
ntown=len(lncode)
nyear=len(col[5:])
codes=read_csv('codes.csv',encoding='big5')
YM2NC={i:j for i,j in zip(list(codes.YM_code),list(codes.New_Code))}

dfPM=read_csv('../y_s_v00.csv')
dfa=dfPM.loc[(dfPM.s.map(lambda x:x in YM2NC.values()))&(dfPM.ymd<20179999)]
pm=np.zeros(shape=(ntown,nyear))
for i in range(ntown):
  ncode=YM2NC[lncode[i]]
  for j in range(nyear):
    ymd=int(col[5:][j]+'0101')
    a=list(dfa.loc[(dfa.ymd==ymd)&(dfa.s==ncode),'v'])
    if len(a)>0:
      pm[i,j]=a[0]
fname='LungDisease.csv'
  df=read_csv(fname,encoding='big5')
  dfds=np.zeros(shape=(ntown,nyear))
  for i in range(ntown):
    for j in range(nyear):
      dfds[i,j]=df.loc[i,col[5+j]]
Y=dfds[:,:].flatten()
X=pm.flatten()
```

### 模型定義

```
formula = "Y ~ X"
data=DataFrame({'Y':Y,'X':X})
```

### 模型吻合
- Binomial

```python
import statsmodels.api as sm
import statsmodels.formula.api as smf

mod1 = smf.glm(formula=formula, data=data, family=sm.families.Binomial()).fit()
```

```
                 Generalized Linear Model Regression Results
==============================================================================
Dep. Variable:                      Y   No. Observations:                 1188
Model:                            GLM   Df Residuals:                     1186
Model Family:                Binomial   Df Model:                            1
Link Function:                  Logit   Scale:                          1.0000
Method:                          IRLS   Log-Likelihood:                -111.01
Date:                Thu, 08 Sep 2022   Deviance:                       51.189
Time:                        17:07:13   Pearson chi2:                     78.2
No. Iterations:                     7   Pseudo R-squ. (CS):          7.539e-05
Covariance Type:            nonrobust
==============================================================================
                 coef    std err          z      P>|z|      [0.025      0.975]
------------------------------------------------------------------------------
Intercept     -3.5123      0.576     -6.100      0.000      -4.641      -2.384
X             -0.0102      0.034     -0.299      0.765      -0.077       0.057
==============================================================================
```

- Poisson

```python
mod1 = smf.glm(formula=formula, data=data, family=sm.families.Poisson()).fit()
print(mod1.summary())
```

```    
                 Generalized Linear Model Regression Results
==============================================================================
Dep. Variable:                      Y   No. Observations:                 1188
Model:                            GLM   Df Residuals:                     1186
Model Family:                 Poisson   Df Model:                            1
Link Function:                    Log   Scale:                          1.0000
Method:                          IRLS   Log-Likelihood:                -122.90
Date:                Thu, 08 Sep 2022   Deviance:                       49.157
Time:                        17:05:17   Pearson chi2:                     76.3
No. Iterations:                     5   Pseudo R-squ. (CS):          7.353e-05
Covariance Type:            nonrobust
==============================================================================
                 coef    std err          z      P>|z|      [0.025      0.975]
------------------------------------------------------------------------------
Intercept     -3.5414      0.568     -6.231      0.000      -4.655      -2.427
X             -0.0100      0.034     -0.295      0.768      -0.076       0.056
==============================================================================
```

- Gassuan

[incubator17]: <https://www.thedataincubator.com/blog/2017/11/08/scikit-learn-vs-statsmodels/> "Scikit-learn vs. StatsModels: Which, why, and how?"
[知乎22]: <https://zhuanlan.zhihu.com/p/370710537> "statsmodels例程中文翻译"
[github21]: <https://github.com/apachecn/statsmodels-doc-zh> " apachecn / statsmodels-doc-zh"
[HW21]: <https://www.heywhale.com/home/column/6093a096352d740017af491b> "Statsmodels中文文档"