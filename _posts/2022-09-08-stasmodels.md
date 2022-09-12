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
mathjax: true
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

### Parameters
- see [wiki:最大似然估计](https://zh.wikipedia.org/zh-tw/最大似然估计)：最大化一個概似函數同最大化它的自然對數是等價的。因為自然對數log是一個連續且在概似函數的值域內嚴格遞增的上凹函數。[注意：可能性函數（概似函數）的自然對數跟訊息熵以及Fisher訊息聯繫緊密。]求對數通常能夠一定程度上**簡化運算**。
- [台部落wydbyxr 2018](https://www.twblogs.net/a/5bcb6b332b7177796822b301)
  - 對數似然估計函數值一般取負值，實際值（不是絕對值）越大越好。
  - 解釋變量越多，因變量中被解釋的部分就越多，對應的似然函數就越大，反之，解釋變量少了，似然函數就會變小。你從對數似然函數的公式中也可以看出來，當變量更多的時候，比如從2個增加到3個，似然函數就可以在更大的空間範圍內搜索最大值，所以3個解釋變量得到的最大值肯定不會小於2個解釋變量的情況。
- Pearson &chi;<sup>2</sup>
  - [wiki](https://en.wikipedia.org/wiki/Pearson%27s_chi-squared_test)
      
- [GLMGamResults.pseudo_rsquared(kind='cs')](https://www.statsmodels.org/dev/generated/statsmodels.gam.generalized_additive_model.GLMGamResults.pseudo_rsquared.html?highlight=pseudo+r+squ#statsmodels.gam.generalized_additive_model.GLMGamResults.pseudo_rsquared)
  - cs
    - Cox-Snell likelihood ratio pseudo R-squared is valid for both discrete and continuous data. 
    - Cox & Snell’s pseudo-R-squared: 1 - exp((ll<sub>null</sub>- ll<sub>f</sub>)*(2/n<sub>obs</sub>))
  - McF
    - McFadden’s pseudo R-squared is only valid for discrete data.
    - McFadden’s pseudo-R-squared: 1 - (llf / llnull)
  - LL1 and LL0
    - LL1(ll<sub>f</sub>) refers to the **full** log-likelihood model and 
    - LL0(ll<sub>null</sub>) refers to a model with **fewer coefficients** (especially the model with only the intercept b0 and no other coefficients).
- source: [Charles Zaiontz][Zaiontz22]

- R2 measures the percentage of variance explained by the regression model. -> max=1.0 (if log-linear function)

### about Poisson GLM
- [率的廣義線性迴歸 Poisson GLM for rates][ccwang]

- Gassuan
- [seaborn plots](https://seaborn.pydata.org/generated/seaborn.jointplot.html)
  - `seaborn.jointplot(data=None, *, x=None, y=None, hue=None, kind='scatter', height=6, ratio=5, space=0.2, dropna=False, xlim=None, ylim=None, color=None, palette=None, hue_order=None, hue_norm=None, marginal_ticks=False, joint_kws=None, marginal_kws=None, **kwargs)`

```python
import seaborn as sns
data2=DataFrame({"X":X[idx[:]],"Y":Y[idx[:]]})
data2["log_Y"]=np.log(data2.Y)
g = sns.jointplot(x="X", y="log_Y",data=data2)
```

## Spatial autoregressive models
- [Spatial autoregressive (SAR) model for average expenditure](https://linkinghub.elsevier.com/retrieve/pii/S187705091931169X)
  - Spatial Autoregressive model (SAR) is one of spatial model based on area. 
  - Spatial regression model can describe the relationship between independent variables (X) and dependent variable (Y) by involving location effect of the data. 
  - The involvement of location effects on the data is represented by weights.
  - VAR(vector autoregression) modelling attempts to quantify interrelationships wherein two or more time-dependent series are collectively impactful upon observable trends, wherein all referenced variables are treated as being endogenous (y, dependent), rather than necessitating fundamental independent (x) assumptions, as might be appreciated in [S-I-R][sir] projections. [Shang et al. 2021][Shang et al. 2021]
  
### 流行病學的房室模型
- [Compartmental models in epidemiology][Compartmental]

[incubator17]: <https://www.thedataincubator.com/blog/2017/11/08/scikit-learn-vs-statsmodels/> "Scikit-learn vs. StatsModels: Which, why, and how?"
[知乎22]: <https://zhuanlan.zhihu.com/p/370710537> "statsmodels例程中文翻译"
[github21]: <https://github.com/apachecn/statsmodels-doc-zh> " apachecn / statsmodels-doc-zh"
[HW21]: <https://www.heywhale.com/home/column/6093a096352d740017af491b> "Statsmodels中文文档"
[Zaiontz22]: <https://www.real-statistics.com/logistic-regression/significance-testing-logistic-regression-model/> "Charles Zaiontz, Testing the Fit of the Logistic Regression Model, REAL STATISTICS USING EXCEL"
[ccwang]: <https://wangcc.me/LSHTMlearningnote/GLM-rates.html> "王超辰2018 率的廣義線性迴歸 Poisson GLM for rates"
[Shang et al. 2021]: <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7870378/> "Shang, A.C., Galow, K.E., and Galow, G.G. (2021). Regional forecasting of COVID-19 caseload by non-parametric regression: a VAR epidemiological model. AIMS Public Health 8 (1):124–136. doi:10.3934/publichealth.2021010."
[sir]: <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7870378/> "susceptible, infectious, removed (immune) framework of compartmental disease modelling"
[Compartmental]: <https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology> "隔室模型是一種非常通用的建模技術。它們通常應用於傳染病的數學建模。族群被分配到帶有標籤的族群中，例如S，I或R。族群可以在族群之間前進。標籤的順序通常顯示了隔室之間的流動模式。例如，SEIS表示易感，暴露，感染，然後又易感。"