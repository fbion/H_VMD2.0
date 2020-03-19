Ext.define("vmd.ux.OcxVideoContent" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.PageCheck$1.0$PageCheck"]),
	version:"1.0",
	xtype:"vmd.ux.OcxVideoContent",
	title:"Panel",
	header:false,
	border:false,
	width:886,
	height:591,
	layout:"anchor",
	afterrender:"OcxVideoContent_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.OcxVideoContent_afterrender(this)
}
	},
	uxCss:".page-cls {    margin-left: 10px;}",
	initComponent: function(){
		function resetCmpScope() {
                    var cmpList = me._reloadCmpList;
                    Ext.each(cmpList, function (name) {
                        var cmpObj = eval(name);
                        cmpObj && (cmpObj._beforeRender = function (_cmp) {
                            var id = vmd.core.getCmpId(_cmp);
                            id&&eval(id + "= _cmp")
                        })
                    })
                }
			//操作时间：2018.8.6
//操作人：焦欣欣
//功能：视频功能
var tree_nodes; //= '966f1583-794d-4640-aee4-c6a71f91e118,966f1583-794d-4640-aee4-c6a71f91e117,966f1583-794d-4640-aee4-c6a71f91e116'; // 树形节点
var suoding; //锁定
var ggbj = 1; //更改布局
var totalPage = 0; //监控点总页数
var sumCount = 0; //监控点总个数
var pageSize; //每页显示几个监控点
var currentPage = 1; //当前页
var lunBoTimes = 1; //轮播时间
var page = this;
var pageEnable;
var ycxj_val="";//远程巡检  调用视频监控（陈晓宇 2018-12-3）
//主页面：获取树形最终传过来的ID串、更改布局值、锁定设备ID串、
//是否是重点井（0:导航树  1:重点井）、重点监控下边的类别、
//标识是主页面进入的还是轮播进入的
function get_val(tree_nodes, buju, suoding, iszd, type, sign, loginName) {
    //alert('jxx=树：' + tree_nodes + '布局：' + buju + '是否重点：' + iszd + '类别：' + type + '标识：' + sign+",loginName"+loginName)
    //tree_nodes = '966f1583-794d-4640-aee4-c6a71f91e150';
    //iszd = '';
    if(tree_nodes.indexOf('ycxj')!=-1){
    page.ycxj_val=tree_nodes.substring(0,4);//从 “远程巡检调用视频监控”界面显示视频时，传的标识值
    page.tree_nodes = tree_nodes.substring(4);
   }else{ 
       page.ycxj_val="";
       page.tree_nodes = tree_nodes;
   }
       page.ggbj = buju;
    page.suoding = suoding;
    page.iszd = iszd;
    page.type = type;
    page.sign = sign; //主页面传进来为空的
    page.loginName = loginName;
    refreshVideo();
}
//大屏展示轮播页面
//树节点、布局、锁定、是否是重点：1重点  0导航、
//重点下边的类别、标识：主页面进入还是轮播页面进入、轮播时间
function get_lunbo_val(tree_nodes, buju, suoding, iszd, type, sign, lunbotime, loginName) {
    //alert('jxx=树：' + tree_nodes + '布局：' + buju + '是否重点：' + iszd + '类别：' + type + '标识：' + sign + ',轮播时间：' + lunbotime+",loginName"+loginName)
    page.tree_nodes = tree_nodes;
    page.ggbj = buju;
    page.suoding = suoding;
    page.iszd = iszd;
    page.type = type;
    page.sign = sign; //如果是主页面进入值为空，如果是轮播页面进入值为lunbo
    page.loginName = loginName;
    if(lunbotime != '') {
        lunBoTimes = lunbotime;
    } 
    refreshVideo();
}


//弹一下，看是否得到值
var isConnect = false;

function refreshVideo() {
    IEVersion();
    currentPage = 1;
    PageCheck.set_val(currentPage); //跳转页
    //判断是从主页面进入的、还是从轮播进入的、回放页面进入的
    if(page.sign == 'lunbo') {
        //panel1.hide(); //轮播页面不需要分页
        panel1.setVisible(false); //轮播页面不需要分页
        panel2.doLayout();
    } else {
        panel1.show(); //主页面和回放页面需要分页
    }
    suoding = page.suoding; //锁定
    //RealTimePlayOcx.GetWndNum()  获取布局个数  1，4，9，16
    if(page.ggbj !== undefined && page.ggbj !== '') {
        ggbj = page.ggbj //== RealTimePlayOcx.GetWndNum() ? page.ggbj : RealTimePlayOcx.GetWndNum(); //更改布局
    } else {
        ggbj = 1 //== RealTimePlayOcx.GetWndNum() ? 4 : RealTimePlayOcx.GetWndNum(); //更改布局
    }
    //ggbj = 4;
    pageSize = ggbj;
    if(page.tree_nodes !== undefined && page.tree_nodes !== '') {
        tree_nodes = page.tree_nodes; //树形节点
        var arr = tree_nodes.split(',');
        sumCount = arr.length;
        totalPage = GetTotalPage(sumCount, pageSize);
        label.setText('共' + totalPage + '页');
    } else {
        tree_nodes = '';
        label.setText('共' + totalPage + '页');
    }
    //加载js文件
    // vmd.loadCss(bootPATH + 'lib/webuploader/webuploader.css');
    // vmd.loadCss(bootPATH + 'js/plugins/file/file.css');
    $LAB.script(bootPATH + 'components/ux/ocxvideocontent/js/jkl-dumper.js')
        .script(bootPATH + 'components/ux/ocxvideocontent/js/ObjTree.js')
        .script(bootPATH + 'components/ux/ocxvideocontent/js/mqttws31.js')
        .wait(function() { //加载成功
            //要在这里调用你的方法，因为这里是最安全的，你之前不再这里写的是侥幸可以，能明白吗

            //==========这个是为了调整点击5个节点，视频页面自动显示第5个视频=====
            currentPage = totalPage; //显示最后一页
            PageCheck.set_val(currentPage);
            //===========end========= 
            initData(currentPage);
            //预测报警,这样你试试 

            if(!page.foreState) {
                page.foreState = true;
                ForecastAlarm();
                // var urlval1='songNan/video/getallvideo';
                var urlval1='XXHTS/monitor/rtmonitor/SPJK/video/getallvideo';
                hwDas.ajax({
                    das: {
                        idedas: true
                    },
                    url: urlval1,
                    type: 'get',
                    params: '',
                    success: function(result) {
                        if(result.data[0].datas.length > 0) //从数据库里查询出来的监控点的数据
                        {
                            if(page.sign=="lunbo")//轮播页面进入
                            {}
                            else//主页面进入
                              {  
                                  // 从“远程巡检调用视频监控”界面显示视频时，不弹出异常报警窗口（陈晓宇2018-12-3）
                                 if(page.ycxj_val=='ycxj')
                                  {
                                      
                                  }else{
                                    ShowForecastAlarm();
                                  }
                              }
                        }
                    }
                })

            }
        })
    //不要把业务逻辑耦合到组件内部，要尽量多的以属性、方法、和事件的形式 
    //==========================事件start==================================
    // var script = document.createElement("script");
    // //创建language标签
    // script.setAttribute('language', 'javascript')
    // //创建for标签
    // script.setAttribute('for', 'RealTimePlayOcx')
    // //创建event标签
    // script.event = "FireSelectWindow(xmlParament,lWndIndex)";
    // //创建script 内容
    // script.innerHTML = "alert('FireCatchPicParam('+xmlParament+','+lWndIndex +')');";
    // document.getElementsByTagName("head")[0].appendChild(script);
    //==========================end==================================

}

function OcxVideoContent_afterrender(sender) {

}
//关闭轮播层触发
function initVideo() {
    document.getElementById(div3.id).innerHTML = '<object classid="clsid:D5E14042-7BF6-4E24-8B01-2F453E8154D7" id="RealTimePlayOcx" width="100%" height="100%" name="RealTimePlayOcx">' +
        '<param name="theme" value="blue">' +
        '<param name="showType" value="1"></object>';
}

function Get_lunbo_CurrentPage(ggbj, datas) {
    var Num = ggbj; //视频组合长度
    var arr1 = datas.split(','); //视频组合前数组
    var videArr = [] //视频组合后数组
    var videComb = []; //单组视频变量
    //组合第一组视频id
    for(var i = 0; i < Num; i++) {
        videComb.push(arr1[i]);
        if(i == Num - 1) {
            videArr.push(videComb);
        }
    }
    //倒序组合剩余视频id
    for(var i = arr1.length - 1; i > 0; i--) {
        videComb = [];
        //判断需要组合的视频组索引是否小于或等于需要组合的数组长度，如果小于或等于，使用当前循环索引获取；
        //否则先使用当前循环索引获取【视频组合前数组】的id给单组视频数组添加，因为需要获取的单组视频id还不够已经定义的视频组合长度，但是已超出【视频组合前数组】索引，所以使用求余数的方式获取剩余的单组视频id
        if(i + (Num - 1) <= arr1.length - 1) {
            for(var z = i; z < i + (Num); z++) {
                videComb.push(arr1[z]);
            }
        } else {
            for(var j = i; j < arr1.length; j++) {
                videComb.push(arr1[j]);
            }
            var kLen = (i + (Num - 1)) % (arr1.length - 1);
            for(var k = 0; k < kLen; k++) {
                videComb.push(arr1[k]);
            }
        }
        videArr.push(videComb);
    }
    return videArr;
}



//计算总页数
function GetTotalPage(sumCount, pageSize) {
    totalPage = 0;
    if(sumCount !== undefined) {
        if(sumCount / pageSize > parseInt(sumCount / pageSize)) {
            totalPage = parseInt(sumCount / pageSize) + 1;
        } else {
            totalPage = parseInt(sumCount / pageSize);
        }
    }
    return totalPage;
}
//初始化得到监控点数据
function initData(currentPage) {
    BtnDisable(); //不可用
    var startRow = (currentPage - 1) * pageSize; //开始显示的监控点
    var endRow = currentPage * pageSize; //结束显示的监控点
    initGetVideoInfoByIdpage(tree_nodes, startRow, endRow);
}
var str_xml_arr = '';
var lunboresult = '';
//根据树节点选择的id或者初始化得到重点井的监控点id   获取到监控点所有信息
function initGetVideoInfoByIdpage(val, startRow, endRow) {

    var RealTimePlayOcx = document.getElementById("RealTimePlayOcx");
    var res = RealTimePlayOcx.StopAllPreview(); //停止所有预览
    RealTimePlayOcx.SetPtzServer("<?xml version='1.0'?><PTZServe><ServIP>10.22.48.29</ServIP><ServPort>7000</ServPort><Priority>50</Priority></PTZServe>");
    RealTimePlayOcx.SetWndNum(ggbj);
    var param = {};
    // var urlval = "songNan/video/videoInfoByEquipmentId";
    var urlval = "XXHTS/monitor/rtmonitor/SPJK/video/videoInfoByEquipmentId";

    if(page.iszd == '1') //是0：导航  1：重点井，那么就=0否则!=0 ,排序按照desc，否则不排序
    {
        param = {
            equipment_id: val,
            iseq: 0,
            loginid: page.loginName,
            classid: page.type
        };
    } else if(page.iszd == '0') {
        param = {
            equipment_id: val,
            iseq: 1
        };
    }
    hwDas.ajax({
        das: {
            idedas: true
        },
        url: urlval,
        type: 'get',
        params: param,
        success: function(result) {
            ;
            if(result.data[0].datas.length > 0) //从数据库里查询出来的监控点的数据
            {
                endRow = result.data[0].datas.length < endRow ? result.data[0].datas.length : endRow;
                if(page.sign == 'lunbo') { //轮播页面
                    if(result.data[0].datas.length > ggbj) //个数大于布局的个数才会轮播
                    {
                        if(ggbj == 1) { //更改布局为1的时候，开始轮播
                            lunboresult = '';
                            lunboresult = result;
                            LunBoSetTimeOut_One();
                        } else //更改布局为4、9的时候，开始轮播
                        {
                            str_xml_arr = '';
                            var alldatastr = '';
                            var startR = 0;
                            for(var i = 0; i < result.data[0].datas.length; i++) {
                                alldatastr += getlunboDataInfo(result, i) + ',';
                            }
                            alldatastr = alldatastr.substring(0, alldatastr.length - 1);
                            str_xml_arr = Get_lunbo_CurrentPage(ggbj, alldatastr);
                            if(str_xml_arr.length > 0) {
                                LunBoSetTimeOut();
                            }
                        }
                    } else {
                        for(var i = startRow; i < endRow; i++) {
                            var j; //为了显示视频的速度快些，对间隔时间进行了处理
                            if(i == 0)
                                j = 1;
                            else
                                j = (i - (startRow - 1));
                            (function(i) {
                                setTimeout(function() {
                                    getDataInfo(result, i);
                                    if(i == (endRow - 1)) {
                                        BtnEnable();
                                        div_progress.hide(); //是否初始化完成  
                                    }
                                }, j * 1000);
                            })(i)
                        }
                    }
                } else {
                    for(var i = startRow; i < endRow; i++) {
                        var j; //为了显示视频的速度快些，对间隔时间进行了处理
                        if(i == 0)
                            j = 1;
                        else
                            j = (i - (startRow - 1));
                        (function(i) {
                            setTimeout(function() {
                                //主页面
                                getDataInfo(result, i);
                                if(i == (endRow - 1)) {
                                    BtnEnable();
                                    div_progress.hide();
                                }
                            }, j * 1000);
                        })(i)
                    }
                }

            } else //从数据库里查询出空数据
            {
                return;
            }
        },
        error: function(msg) {
            Ext.Msg.alert("提示", "失败信息：" + msg);
            return;
        }
    })
}

var cur = 1;

function LunBoSetTimeOut_One() {
    var RealTimePlayOcx = document.getElementById("RealTimePlayOcx");
    var res = RealTimePlayOcx.StopAllPreview(); //停止所有预览 
    var startR = (cur - 1) * pageSize; //开始显示的监控点
    var endR = cur * pageSize; //结束显示的监控点
    for(var i = startR; i < endR; i++) {
        (function(i) {
            setTimeout(function() {
                getDataInfo(lunboresult, i);
                cur++;
                if(i == lunboresult.data[0].datas.length - 1) {
                    cur = 1;
                }
                setTimeout(LunBoSetTimeOut_One, lunBoTimes * 1000); //1分钟60000
            }, i * 1000);
        })(i)
    }

}
var lunbotemp = 0;

function LunBoSetTimeOut() {
    var RealTimePlayOcx = document.getElementById("RealTimePlayOcx");
    var res = RealTimePlayOcx.StopAllPreview(); //停止所有预览 
    var currentPage_arr = str_xml_arr[lunbotemp]; //当前页面的一组xml
    if(currentPage_arr.length > 0) {
        for(var k = 0; k < currentPage_arr.length; k++) {
            (function(k) {
                setTimeout(function() {
                    var one_xml = currentPage_arr[k];
                    RealTimePlayOcx.StartTask_Preview_InWnd(one_xml, k);
                    if(k == currentPage_arr.length - 1) {
                        lunbotemp++;
                        if(lunbotemp == currentPage_arr.length)
                            lunbotemp = 0;
                        setTimeout(LunBoSetTimeOut, lunBoTimes * 1000);
                    }
                }, k * 1000);
            })(k)
        }
    }
}

//得到主页面的数据信息
function getDataInfo(result, i) {
    var MATRIXCODE = result.data[0].datas[i]["matrixcode"]; //云台矩阵
    var MONITORID = result.data[0].datas[i]["monitorid"]; //显示器ID
    var CAMERAID = result.data[0].datas[i]["cameraid"]; //监控点id
    var EQUIPMENT_NAME = result.data[0].datas[i]["equipment_name"]; //监控点名称
    var DEVICEIP = result.data[0].datas[i]["deviceip"]; //监控点IP
    var DEVICEPORT = result.data[0].datas[i]["deviceport"]; //监控点port
    var DEVICETYPE = result.data[0].datas[i]["devicetype"]; //设备类型
    var USER = result.data[0].datas[i]["username"]; //监控点username
    var PASSWORD = result.data[0].datas[i]["password"]; //监控点password
    var CHANNELNUM = result.data[0].datas[i]["channelnum"]; //摄像头所在视频源设备中的通道号(硬盘录像机)或摄像头ID(海康流媒体服务器)
    var PROTOCOLTYPE = result.data[0].datas[i]["protocoltype"]; //协议类型0 - TCP， 1 - UDP
    var STREAMTYPE = result.data[0].datas[i]["streamtype"]; //码流类型0 表示主码流， 1 表示子码流
    var SRVIP = result.data[0].datas[i]["srvip"]; //流媒体IP地址（可以没有，也可以有多个）
    var PORT = result.data[0].datas[i]["port"]; //流媒体端口号（可以没有，也可以有多个）
    var CAMERAINDEXCODE = result.data[0].datas[i]["cameraindexcode"]; //级联预览字段
    var str = {
        Parament: [{
            MatrixCode: MATRIXCODE,
            MonitorID: MONITORID,
            CameraID: CAMERAID,
            CameraName: EQUIPMENT_NAME,
            DeviceIP: DEVICEIP,
            DevicePort: DEVICEPORT,
            DeviceType: DEVICETYPE,
            User: USER,
            Password: PASSWORD,
            ChannelNum: CHANNELNUM,
            ProtocolType: PROTOCOLTYPE,
            StreamType: STREAMTYPE,
            Transmits: [{
                Transmit: [{
                    SrvIp: SRVIP,
                    Port: PORT
                }]
            }],
            CameraIndexCode: CAMERAINDEXCODE
        }]
    };
    var json = eval(str);
    var xmlTree = new XML.ObjTree();
    var xml = xmlTree.writeXML(json);
    RealTimePlayOcx.StartTask_Preview_InWnd(xml, i);
}

//得到轮播的数据信息
function getlunboDataInfo(result, i) {
    var MATRIXCODE = result.data[0].datas[i]["matrixcode"]; //云台矩阵
    var MONITORID = result.data[0].datas[i]["monitorid"]; //显示器ID
    var CAMERAID = result.data[0].datas[i]["cameraid"]; //监控点id
    var EQUIPMENT_NAME = result.data[0].datas[i]["equipment_name"]; //监控点名称
    var DEVICEIP = result.data[0].datas[i]["deviceip"]; //监控点IP
    var DEVICEPORT = result.data[0].datas[i]["deviceport"]; //监控点port
    var DEVICETYPE = result.data[0].datas[i]["devicetype"]; //设备类型
    var USER = result.data[0].datas[i]["username"]; //监控点username
    var PASSWORD = result.data[0].datas[i]["password"]; //监控点password
    var CHANNELNUM = result.data[0].datas[i]["channelnum"]; //摄像头所在视频源设备中的通道号(硬盘录像机)或摄像头ID(海康流媒体服务器)
    var PROTOCOLTYPE = result.data[0].datas[i]["protocoltype"]; //协议类型0 - TCP， 1 - UDP
    var STREAMTYPE = result.data[0].datas[i]["streamtype"]; //码流类型0 表示主码流， 1 表示子码流
    var SRVIP = result.data[0].datas[i]["srvip"]; //流媒体IP地址（可以没有，也可以有多个）
    var PORT = result.data[0].datas[i]["port"]; //流媒体端口号（可以没有，也可以有多个）
    var CAMERAINDEXCODE = result.data[0].datas[i]["cameraindexcode"]; //级联预览字段
    var str = {
        Parament: [{
            MatrixCode: MATRIXCODE,
            MonitorID: MONITORID,
            CameraID: CAMERAID,
            CameraName: EQUIPMENT_NAME,
            DeviceIP: DEVICEIP,
            DevicePort: DEVICEPORT,
            DeviceType: DEVICETYPE,
            User: USER,
            Password: PASSWORD,
            ChannelNum: CHANNELNUM,
            ProtocolType: PROTOCOLTYPE,
            StreamType: STREAMTYPE,
            Transmits: [{
                Transmit: [{
                    SrvIp: SRVIP,
                    Port: PORT
                }]
            }],
            CameraIndexCode: CAMERAINDEXCODE
        }]
    };
    var json = eval(str);
    var xmlTree = new XML.ObjTree();
    var xml = xmlTree.writeXML(json);
    return xml;
    // RealTimePlayOcx.StartTask_Preview_InWnd(xml, i);
}

//首页
function button1_click(sender, e) {
    var RealTimePlayOcx = document.getElementById("RealTimePlayOcx");
    RealTimePlayOcx.StopAllPreview(); //停止所有预览 
    currentPage = 1;
    PageCheck.set_val(currentPage); //跳转页
    initData(currentPage);

}
//上一页
function button2_click(sender, e) {
    if(currentPage <= 1)
        currentPage = 1;
    else
        currentPage--;

    var RealTimePlayOcx = document.getElementById("RealTimePlayOcx");
    RealTimePlayOcx.StopAllPreview(); //停止所有预览 
    PageCheck.set_val(currentPage); //跳转页
    initData(currentPage);

}
//下一页
function button3_click(sender, e) {
    if(currentPage >= totalPage)
        currentPage = totalPage;
    else
        currentPage++;

    var RealTimePlayOcx = document.getElementById("RealTimePlayOcx");
    RealTimePlayOcx.StopAllPreview(); //停止所有预览 
    PageCheck.set_val(currentPage); //跳转页
    initData(currentPage);

}
//尾页
function button4_click(sender, e) {
    var RealTimePlayOcx = document.getElementById("RealTimePlayOcx");
    RealTimePlayOcx.StopAllPreview(); //停止所有预览 
    currentPage = totalPage;
    PageCheck.set_val(currentPage); //跳转页
    initData(currentPage);

}
//跳转
function button5_click(sender, e) {
    var RealTimePlayOcx = document.getElementById("RealTimePlayOcx");
    RealTimePlayOcx.StopAllPreview(); //停止所有预览 
    currentPage = PageCheck.get_val();
    if(currentPage >= totalPage) {
        currentPage = totalPage;
        PageCheck.set_val(currentPage);
    }
    initData(currentPage);
}

function BtnDisable() {
    button1.disable(); //不可用
    button2.disable();
    button3.disable();
    button4.disable();
    button5.disable();
}

function BtnEnable() {
    button1.enable(); //可用
    button2.enable();
    button3.enable();
    button4.enable();
    button5.enable();
}

//判断是否下载注册过ocx
function IsRegionOcx() {
    if(document.all.RealTimePlayOcx.object == null) { //搜索注册表是否存在classid为D5E14042-7BF6-4E24-8B01-2F453E8154D7的数据
        //document.getElementById(div_error.id).innerHTML = '请点击此处下载控件，安装时请关闭浏览器';

        button.setText("请点击此处下载控件，安装时请关闭浏览器");
        page.doLayout();
        panel2.hide();
        //button.show();
        panel3.show();
        return;
    } else {
        //alert("已经注册");
    }
}
//判断是否是ie内核浏览
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
        panel3.hide();
        panel2.show();
        IsRegionOcx();
    } else if(isEdge) {
        panel3.hide();
        panel2.show();
        IsRegionOcx();
        return; //edge
    } else if(isIE11) {
        panel3.hide();
        panel2.show();
        IsRegionOcx();
        return; //IE11  
    } else {
        //document.getElementById(div_error.id).innerHTML = '当前视频控件只支持IE内核的浏览器，建议使用IE浏览器进行操作'

        button.setText("当前视频控件只支持IE内核的浏览器，建议使用IE浏览器进行操作");
        page.doLayout();
        button.disable();
        //或者
        // div_error.el.dom.innerHTML='当前视频控件只支持IE内核的浏览器，建议用IE浏览器进行操作'
        //以上两种都可以
        panel3.show();
        //button.hide();
        panel2.hide();
        return -1; //不是ie浏览器
    }
}

function button_click(sender, e) {
    //bootPATH + 'components/ux/ocxvideocontent/js/ObjTree.js'
    var path = vmd.virtualPath + '/components/ux/ocxvideocontent/ocx/cmsocx.exe';
    window.open(path, '_self')
}



var forecastAlarmStr = '';
//异常报警连接消息中心
function ForecastAlarm() {
    //alert();
    var client, destination = "ocxVideo";
    var tt;
    var message;
    var isConnect = false;
    var isConnecting = false;
    var clientId = newGuid(); //"client3"; // 

    function connect() {
        
        var host = "10.207.60.70"; // "192.168.7.24"; //
        var port = 61614;
        if(typeof(client) === "undefined") {
            client = new Messaging.Client(host, Number(port), clientId);
        }
        client.onConnect = onConnect;
        client.onMessageArrived = onMessageArrived;
        client.onConnectionLost = onConnectionLost;
        client.connect({
            timeout: 30, //如果在改时间端内尚未连接成功，则认为连接失败  默认为30秒 
            keepAliveInterval: 5, //心跳信号 默认为60秒
            cleanSession: false, //若设为false，MQTT服务器将持久化客户端会话的主体订阅和ACK位置，默认为true
            useSSL: false,
            onSuccess: onConnect,
            onFailure: onFailure
        });
    }

    var onSubSuccess = function(result) {
        //alert(result);
    }
    var onSubError = function(result) {
        //alert('===sub error==')
    }
    var onConnect = function(frame) {
        //alert("connected to MQTT");
        client.subscribe(destination, {
            qos: 2,
            onSuccess: onSubSuccess,
            onFailure: onSubError
        });
        isConnect = true;
    };

    function onFailure(failure) {
        //alert("failure：" + failure.errorMessage);
        if(!isConnect) {
            //如果连接中 不提示
            if(!isConnecting) {
                //此处提醒用户是否重连 可以确认后 手动执行重连方法
                //alert(failure.errorMessage);
                //reconnect();
            } else {
                // Ext.MessageBox.alert('提示',"重连中...");
            }
        }
    }

    function onMessageArrived(message) {
        ;
        //alert(message.payloadString);
        forecastAlarmStr = message.payloadString;
        // if(!page.flag) {
        //     page.flag = true;
             //ShowForecastAlarm();
        // }

    }
    if(!window.WebSocket) {} else {
        connect();
    }

    function onConnectionLost(responseObject) {
        //alert("connectionLost");
        isConnect = false;
        //判断断开状态码   0位正常断开   不做重连
        if(responseObject.errorCode !== 0) {
            //alert(client.clientId + ": " + responseObject.errorCode + "\n");
            //断线重连
            reconnect();
        }
    }
    //封装重连事件
    function reconnect() {
        //重连计数
        var i = 0;
        // 开启重连定时器    没连接上会一直重连，设置延迟避免请求过多
        tt = setInterval(function() {
            if(!isConnect) {
                i++;
                //alert("连接失败,正在第" + i + "次尝试" + "\n");
                connect();
                //连接中状态  方便连接失败提示
                isConnecting = true;
            } else {
                //清除定时器
                clearInterval(tt);
                isConnecting = false;
            }
        }, 3000);
    }
}

function ShowForecastAlarm() {
    forecastAlarmStr = "[{sbName:'中控室',gjlx:'闯入告警',lxmc:'移动侦测报警',bjms:'处理站 处理站_中控室 移动侦测报警',bjdj:'中',gjsj:'2018-09-20 13:40:28',bjzt:'报警中...',pUser:'0'}]"
    ;
    //alert(escape(forecastAlarmStr))
    var newWin = new vmd.window({
        url: vmd.virtualPath + '/modules/12efebd0-5bd2-4d64-8582-fe88888e55ac/hwUlkgCNnE/hwFHkspFgR/hwJ0pirOMA/hw66d31a51.html' ,
        title: '异常报警',
        enableLoading: true, //启用进度加载
        enableIframe: true, //启用iframe弹窗遮罩解决ocx遮挡问题
        maximizable: false,
        resizable: false,
        width: 948,
        height: 390,
        auto: false, //auto为true 自动适应窗口，配合offset使用，offset:[width,height] width宽度差值，height高度差值
        params: {} //url中追加的编码的参数，json格式 
    })
    window.newWin = newWin;
    // window.tag_ = tag_;
    newWin.show(); //窗口显示
}
//生成32位随机码
function newGuid() {
    var guid = "";
    for(var i = 1; i <= 16; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

function PageCheck_chaxun(sender, val) {
    if(val > totalPage) {
        alert("提示", "已超出最大页数！请重新选择！");
        PageCheck.set_val(currentPage);
        PageCheck.set_sign(currentPage);
        return;
    }
}
			this.OcxVideoContent_afterrender=OcxVideoContent_afterrender;
		this.items=[
			{
				xtype:"panel",
				id:"panel2",
				title:"Panel",
				header:false,
				border:false,
				height:100,
				region:"west",
				hidden:false,
				anchor:"100% 100%",
				layout:"border",
				items:[
					{
						xtype:"panel",
						id:"panel",
						title:"Panel",
						header:false,
						border:false,
						height:547,
						x:100,
						y:90,
						region:"center",
						layout:"border",
						items:[
							{
								xtype:"vmd.div",
								id:"div3",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:50,
								anchor:"100% 100%",
								html:"<object classid=\"clsid:D5E14042-7BF6-4E24-8B01-2F453E8154D7\" id=\"RealTimePlayOcx\" width=\"100%\" height=\"100%\" name=\"RealTimePlayOcx\">    <param name=\"theme\" value=\"blue\">    <param name=\"showType\" value=\"1\"></object>",
								hidden:false,
								region:"center"
							}
						]
					},
					{
						xtype:"panel",
						id:"panel1",
						layoutConfig:{
							align:"middle",
							pack:"end"
						},
						title:"Panel",
						header:false,
						border:false,
						height:30,
						region:"south",
						layout:"hbox",
						items:[
							{
								xtype:"vmd.div",
								id:"div",
								layoutConfig:{
									align:"middle",
									pack:"start"
								},
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:420,
								height:30,
								layout:"hbox",
								items:[
									{
										xtype:"vmd.button",
										id:"button1",
										text:"首 页",
										type:"(none)",
										size:"small",
										margins:"0 10 0 0",
										click:"button1_click",
										listeners:{
											click:button1_click
										}
									},
									{
										xtype:"vmd.button",
										id:"button2",
										text:"上一页",
										type:"(none)",
										size:"small",
										margins:"0 10 0 0",
										click:"button2_click",
										listeners:{
											click:button2_click
										}
									},
									{
										xtype:"vmd.button",
										id:"button3",
										text:"下一页",
										type:"(none)",
										size:"small",
										margins:"0 10 0 0",
										click:"button3_click",
										listeners:{
											click:button3_click
										}
									},
									{
										xtype:"vmd.button",
										id:"button4",
										text:"尾 页",
										type:"(none)",
										size:"small",
										margins:"0 10 0 0",
										click:"button4_click",
										listeners:{
											click:button4_click
										}
									},
									{
										xtype:"label",
										id:"label",
										text:"lable:",
										html:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
										margins:"0 10 0 0 "
									},
									{
										xtype:"label",
										id:"label2",
										text:"到第",
										margins:"0 5 0 0"
									},
									{
										xtype:"vmd.ux.PageCheck",
										id:"PageCheck",
										layout:"absolute",
										margins:"0 5 0 0 "
									},
									{
										xtype:"label",
										id:"label3",
										text:"页",
										margins:"0 5 0 0 "
									},
									{
										xtype:"vmd.button",
										id:"button5",
										text:"确定",
										type:"(none)",
										size:"mini",
										width:30,
										margins:"0 5 0 0 ",
										click:"button5_click",
										listeners:{
											click:button5_click
										}
									}
								]
							}
						]
					}
				]
			},
			{
				xtype:"panel",
				id:"panel3",
				title:"Panel",
				header:false,
				border:false,
				height:100,
				region:"center",
				layout:"border",
				hidden:true,
				anchor:"100% 100%",
				items:[
					{
						xtype:"vmd.div",
						id:"div_error",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:614,
						height:386,
						region:"center",
						style:"font-size: 16px;font-family: '微软雅黑';",
						layout:"hbox",
						items:[
							{
								xtype:"vmd.button",
								id:"button",
								type:"text",
								size:"small",
								hidden:false,
								click:"button_click",
								style:"font-size: 16px;font-family: '微软雅黑';",
								listeners:{
									click:button_click
								}
							}
						]
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.get_val= function(tree_nodes,buju,suoding,iszd,type,sign,loginName){
//直接填写方法内容
get_val(tree_nodes,buju,suoding,iszd,type,sign,loginName)
	}
		this.get_lunbo_val= function(tree_nodes,buju,suoding,iszd,type,sign,lunbotime,loginName){
//直接填写方法内容
get_lunbo_val(tree_nodes,buju,suoding,iszd,type,sign,lunbotime,loginName)
	}
		this.initVideo= function(){
//直接填写方法内容
//直接填写方法内容
initVideo()
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.OcxVideoContent");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.OcxVideoContent");
	}
})