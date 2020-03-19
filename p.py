import os,shutil
import time
import datetime
path = os.getcwd()
def gci(filepath):
#遍历filepath下所有文件，包括子目录
  files = os.listdir(filepath)
  for fi in files:
    fi_d = os.path.join(filepath,fi)            
    if os.path.isdir(fi_d):
      gci(fi_d)                  
    else:
      filea = os.path.join(filepath,fi_d)
      #print(filea) 
      statinfo = os.stat(r"""%s"""%(filea))
      # print(statinfo.st_mtime)
      # print(time.strftime("%Y-%m-%d",time.localtime(time.time())))
      # print(filea+'------------'+time.strftime("%Y-%m-%d",time.localtime(statinfo.st_mtime))) 
      # print(time.mktime(time.strptime(time.strftime("%Y-%m-%d",time.localtime(statinfo.st_mtime)),"%Y-%m-%d")))
      # print(time.mktime(time.strptime(time.strftime("%Y-%m-%d",time.localtime(time.time())),"%Y-%m-%d")))
      filea_mtime = time.mktime(time.strptime(time.strftime("%Y-%m-%d",time.localtime(statinfo.st_mtime)),"%Y-%m-%d"))
      filea_ctime = time.mktime(time.strptime(time.strftime("%Y-%m-%d",time.localtime(statinfo.st_ctime)),"%Y-%m-%d"))
      now_time = time.mktime(time.strptime(time.strftime("%Y-%m-%d",time.localtime(time.time())),"%Y-%m-%d"))
      bt_mtime = now_time - filea_mtime
      bt_ctime = now_time - filea_ctime
      bt_time=86400.0 * 6
      #print(bt_mtime)
      #print(bt_ctime)
      if bt_mtime <=bt_time or bt_ctime <=bt_time:
      	mkdir(os.path.abspath('../vmdupdate'))
      	#print(1)
      	fileas = filea[len(path):]
      	now_path = os.path.abspath('../vmdupdate')
      	for i in range(len(fileas.split('\\'))):
          if i != len(fileas.split('\\')) -1:
            mkdir(now_path +'\\'+ fileas.split('\\')[i])
            now_path = now_path +'\\'+ fileas.split('\\')[i]
          else:
          	mycopyfile(filea,now_path+'\\'+fileas.split('\\')[i])

def mycopyfile(srcfile,dstfile):
    if not os.path.isfile(srcfile):
        print("%s not exist!"%(srcfile))
    else:
        fpath,fname=os.path.split(dstfile)    #分离文件名和路径
        if not os.path.exists(fpath):
            os.makedirs(fpath)                #创建路径
        shutil.copyfile(srcfile,dstfile)      #复制文件
        print("copy %s -> %s"%( srcfile,dstfile))

def mkdir(path):
    # 引入模块
    import os
 
    # 去除首位空格
    path=path.strip()
    # 去除尾部 \ 符号
    path=path.rstrip("\\")
 
    # 判断路径是否存在
    # 存在     True
    # 不存在   False
    isExists=os.path.exists(path)
 
    # 判断结果
    if not isExists:
        # 如果不存在则创建目录
        # 创建目录操作函数
        os.makedirs(path) 
 
        print(path+' 创建成功')
        return True
    else:
        # 如果目录存在则不创建，并提示目录已存在
        print(path+' 目录已存在')
        return False

# print(os.getcwd())
# print(os.chdir(os.getcwd()))
gci(path)
