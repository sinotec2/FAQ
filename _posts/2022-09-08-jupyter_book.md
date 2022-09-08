---
title: Jupyter Book
tags: github.io jb
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

case: https://allendowney.github.io/ModSimPy/index.html

source: https://jupyterbook.org/en/stable/intro.html

Pros: jupyter compatible、速度很快、穩定、google-found、全文檢索、左右章節瀏覽、上下翻頁、click to show(這個給學生學習不錯)

Cons: 沒有瀏覽次數、沒有時間標籤、字形及顏色、底色都很平凡、(不知是否支援中文)、似乎適合固定內容的文件(書)

## python的統計函數
- stasmodels: https://pypi.org/project/statsmodels/

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
formula = "Y ~ X"
data=DataFrame({'Y':Y,'X':X})
```

- ` mod1 = smf.glm(formula=formula, data=data, family=sm.families.Binomial()).fit()`

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
