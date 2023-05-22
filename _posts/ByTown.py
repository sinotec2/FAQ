#kuang@DEVP ~/MyPrograms/pytorch_geometric_temporal/torch_geometric_temporal/dataset
#$ cat py.txt

from pandas import *
import netCDF4
import numpy as np
from dtconvertor import dt2jul, jul2dt
from scipy.io import FortranFile
import geopandas as gpd
root='/nas2/cmaqruns/2022fcst/fusion/Voronoi/'
boundary=gpd.read_file(root+'boundary_shape.shp')
boundary_shape = boundary.geometry[0]
from shapely.geometry import Point
from pyproj import Proj

df=read_csv('gridLL.csv')
nc = netCDF4.Dataset("2019.nc",'r')
V=[list(filter(lambda x:nc[x].ndim==j, [i for i in nc.variables])) for j in [1,2,3,4]]
nt,nlay,nrow,ncol=nc.variables[V[3][0]].shape
col=[v for v in V[3] if v not in ['PM25_NH4','PM25_NO3','PM25_SO4',]]
v='TFLAG'
dts=[jul2dt(nc.variables[v][t,0,:]) for t in range(nt)]
flags=[dts[t].strftime("%Y%m%d%H") for t in range(nt)]

dfvar=DataFrame()
for t in range(nt):
  for v in col:
    df[v]=nc[v][t,0,:,:].flatten()
  df['tflag']=int(flags[t])
  df0=pivot_table(df,index='TOWNCODE',values=['tflag']+col,aggfunc=np.mean).reset_index()
  dfvar=dfvar.append(df0,ignore_index=True)
dfvar.set_index('tflag').to_csv('dfvar.csv')

n=3739
fname='pnt_Dis'+str(n)+'x'+str(n)+'.bin'
with FortranFile(fname, 'r') as f:
  d=f.read_record(dtype=np.float64)
d=d.reshape(n,n)
d=1/d
for j in range(n):
  d[j,j]=1.
dmax=d.max()
for j in range(n):
  d[j,j]=dmax
d=d/d.max()

pnyc = Proj(proj='lcc', datum='NAD83', lat_1=nc.P_ALP, lat_2=nc.P_BET,lat_0=nc.YCENT, lon_0=nc.XCENT, x_0=0, y_0=0.0)
x1d=[nc.XORIG+nc.XCELL*(i+0.5) for i in range(ncol)]
y1d=[nc.YORIG+nc.YCELL*(i+0.5) for i in range(nrow)]
X,Y=np.meshgrid(x1d,y1d)
lons, lats= pnyc(X,Y, inverse=True)
df.LAT=lats.flatten()
df.LON=lons.flatten()
df.Point=[Point(lon,lat) for lon,lat in zip(df.LON,df.LAT)]
name_inside=df.loc[df.Point.map(lambda p:p.within(boundary_shape))].reset_index(drop=True)
town=list(set(name_inside.TOWNCODE[:]))
m=len(town)
town_name={i:j for i,j in zip(name_inside.TOWNCODE[:],name_inside.TOWNNAME)}

df_dd=DataFrame({'T1':np.array([[j for i in range(n)] for j in range(n)]).flatten(),'T2':np.array([[i for i in range(n)] for j in range(n)]).flatten(),'dd':d.flatten()})
TCD={i:name_inside.TOWNCODE[i] for i in name_inside.index}
df_dd['TOWNCODE1']=[TCD[i] for i in df_dd.T1]
df_dd['TOWNCODE2']=[TCD[i] for i in df_dd.T2]
pvdd=pivot_table(df_dd,index=['TOWNCODE1','TOWNCODE2'],values='dd',aggfunc=np.mean).reset_index()
dd=np.array(pvdd.dd[:]).reshape(m,m)
fname='twn_DisInv'+str(m)+'x'+str(m)+'.bin'
with FortranFile(fname, 'w') as f:
    f.write_record(dd)
TownNode=pvdd[:m]
TownNode.dd=[town_name[i] for i in TownNode.TOWNCODE2]
del TownNode['TOWNCODE1']
TownNode.columns=['TOWNCODE', 'TOWNNAME']
TownNode.set_index('TOWNCODE').to_csv('TownNode.csv')


