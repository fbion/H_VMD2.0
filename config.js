window.vmdSettings={}
//默认工作流服务地址
vmdSettings.workflowIp="www.hanweikeji.com:10054";
//默认数据访问服务地址
vmdSettings.dataServiceIp="www.hanweikeji.com:10050";
//vmd上传服务
vmdSettings.vmdUploadIp="www.hanweikeji.com:10050";
//vmd文件服务
vmdSettings.vmdFileServiceIp="www.hanweikeji.com:10050";
//报表服务
vmdSettings.vmdReportIp="www.hanweikeji.com:10050";
//认证服务
vmdSettings.vmdAuthIp="www.hanweikeji.com:10050";
// 日志中心
vmdSettings.vmdLogIp="www.hanweikeji.com:10053";//"192.168.1.28:9003";
// 图形数据解析服务
vmdSettings.grapDasIp="192.168.1.186:5015";
//图形算法解析服务
vmdSettings.grapAasIp="192.168.1.186:5015";

 vmdSettings.modulePath="modules/"; 
 vmdSettings.componentPath="components/"; 
 vmdSettings.resourceCode = "resource"; 
 //协同办公目录 
 vmdSettings.systemPath = "/system/modules/eQ9ULgcVb1/";
 vmdSettings.enableDasUpload = false; 
 vmdSettings.vmdUploadRelativePath = '/DasService/FileService';
 //ace编辑器
 vmdSettings.vmdCodePath = '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw63cd4471.html'; 
 //复合组件管理 
 vmdSettings.vmdUxPath = '/system/modules/eQ9ULgcVb1//hw61499a5d/hwrYmx2M4f.html';
 __CreateJSPath = function (js) { var scripts = document.getElementsByTagName("script"); var path = ""; for (var i = 0, l = scripts.length; i < l; i++) { var src=scripts[i].src; if (src.indexOf(js) !=-1) { var ss=src.split(js); path=ss[0]; break; } } var href=location.href; href=href.split("#")[0]; href=href.split("?")[0]; var ss=href.split("/"); ss.length=ss.length - 1; href=ss.join("/"); if (path.indexOf("https:")==-1 && path.indexOf("http:")==-1 && path.indexOf("file:")==-1 && path.indexOf("\/") !=0) { path=href + "/" + path; } return path; }
 var bootPATH=__CreateJSPath("config.js"); 
 vmdSettings.bootPATH=bootPATH; vmdSettings.ideTpl={}
 vmdSettings.resourcePath=bootPATH+"/system/modules/eQ9ULgcVb1/hw3ce0447e/hw48PbnNSJ/hw4ePzOpko.html"; 
 vmdSettings.vmdVersion="vmd2.0.7.200328" ;
 /*开启是否加载所有的组件，默认false，true为加载全部组件*/
 vmdSettings.isLoadAllCmps=false; 
 /*加载公共组件*/ vmdSettings.loadPublicCmps=["DatePicker"];
 /*复合组件选中界面*/ vmdSettings.uxSelectPath=bootPATH+'/system/modules/eQ9ULgcVb1/hw61499a5d/hwZLsDrfWr.html';
 vmdSettings.vmdResSelectPath='/system/modules/eQ9ULgcVb1/hw3ce0447e/hwmb4MguFd/hw97a3dc8f.html' ;
 /*调试模式*/ 
 vmdSettings.isDebuggerMode=true;
 /*启用汉化*/ vmdSettings.enableChinesize=true;