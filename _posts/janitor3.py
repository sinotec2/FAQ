import sys,subprocess
fname=sys.argv[1]
with open(fname,'r',encoding='utf8') as f:
  line=[i for i in f]
n=len(line)
nsb=0;npk=0
for i in range(n):
  if '[[' in line[i]:nsb+=1
  if '[^' in line[i]:npk+=1
if nsb==0: sys.exit()
if npk%2==1:print('odd num of peeks')
nsb0=int(npk//2)+2;nsb=nsb0
llnk=[];ttl=[]
urlroot='https://sinotec2.github.io/FAQ/'
with open(fname,'w',encoding='utf8') as f:
  for i in range(n):
    ll=line[i]
    if '[[202' in ll:
      begs=[j for j in range(len(ll)) if ll.startswith('[[', j)]
      ends=[j for j in range(len(ll)) if ll.startswith(']]', j)]
      m=len(begs)
      for j in range(m):
        lnk=ll[begs[j]+2:ends[j]]
        if lnk[:3]!='202': print (lnk)
        llnk.append(lnk)
        try:
          with open(lnk+'.md','r',encoding='utf8') as ff:
            ttl.append([i.split(':')[1].strip('\n') for i in ff if 'title:' in i][0])
        except:
          ttl.append(lnk)
      s='';b=0
      for j in range(m):
        e=ends[j]+2
        s+=ll[b:e]    
        s+='[^'+str(nsb)+']'
        b=e
        nsb+=1
      line[i]=s+ll[e:]
    f.write(line[i])
  n=len(ttl)
  f.write('\n')
  for i in range(n):
    url=urlroot+llnk[i].replace('-','/')+'.html'
    f.write('[^'+str(nsb0+i)+']: '+url+' "['+ttl[i]+']('+url+')"\n')

