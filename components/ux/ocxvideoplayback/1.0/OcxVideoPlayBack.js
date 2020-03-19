Ext.define("vmd.ux.OcxVideoPlayBack" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.PageCheck$1.0$PageCheck"]),
	version:"1.0",
	xtype:"vmd.ux.OcxVideoPlayBack",
	title:"Panel",
	header:false,
	border:false,
	width:886,
	height:591,
	layout:"anchor",
	afterrender:"OcxVideoPlayBack_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.OcxVideoPlayBack_afterrender(this)
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
var lunBoTime = 1; //轮播时间
var page = this;

//视频回放页面
function get_shipinhuifang_val(tree_nodes, buju, iszd, type) {
    //alert('jxx=' + tree_nodes + '布局：' + buju + '重点：' + iszd + '重点类型：' + type)
    page.tree_nodes = tree_nodes;
    page.ggbj = buju;
    page.iszd = iszd;
    page.type = type;
    refreshVideo();
}

//弹一下，看是否得到值
function refreshVideo() {
    //判断是从主页面进入的、还是从轮播进入的、回放页面进入的

    IEVersion();
    currentPage = 1;
    PageCheck.set_val(currentPage); //跳转页

    //加载js文件
    $LAB.script(bootPATH + 'components/ux/ocxvideocontent/js/jkl-dumper.js')
        .script(bootPATH + 'components/ux/ocxvideocontent/js/ObjTree.js')
        .wait(function() {
            //加载成功
            initData(currentPage);
        })
}


function OcxVideoPlayBack_afterrender(sender) {

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
    button1.disable();
    button2.disable();
    button3.disable();
    button4.disable();
    button5.disable();
    suoding = page.suoding; //锁定
    if(page.ggbj !== undefined && page.ggbj !== '') {
        ggbj = page.ggbj //== PlayBackOCX.GetWndNum() ? page.ggbj : PlayBackOCX.GetWndNum(); //更改布局
    } else {
        ggbj = 1 //== PlayBackOCX.GetWndNum() ? 4 : PlayBackOCX.GetWndNum(); //更改布局
    }
    ggbj = 4;
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
    var startRow = (currentPage - 1) * pageSize; //开始显示的监控点
    var endRow = currentPage * pageSize; //结束显示的监控点
    initGetVideoInfoByIdpage(tree_nodes, startRow, endRow);
}

//根据树节点选择的id或者初始化得到重点井的监控点id   获取到监控点所有信息
function initGetVideoInfoByIdpage(val, startRow, endRow) {
    
    var PlayBackOCX = document.getElementById("PlayBackOCX");
    //var urlval="songNan/video/getVideoInfoById";
    var urlval="XXHTS/monitor/rtmonitor/SPJK/video/getVideoInfoById";
    hwDas.ajax({
        das: {
            idedas: true
        },
        url: urlval,
        type: 'get',
        params: {
            equipment_id: val
        },
        success: function(result) { 
            if(result.data[0].datas.length > 0) //从数据库里查询出来的监控点的数据
            {
                endRow = result.data[0].datas.length < endRow ? result.data[0].datas.length : endRow;
                ;
                for(var i = startRow; i < endRow; i++) {
                    var j; //为了显示视频的速度快些，对间隔时间进行了处理
                    if(i == 0)
                        j = 1;
                    else
                        j = (i - (startRow - 1));
                    (function(i) {
                        setTimeout(function() {
                            //回放页面
                            getHuiFangDataInfo(result, i);
                            if(i == (endRow - 1)) {
                                button1.enable();
                                button2.enable();
                                button3.enable();
                                button4.enable();
                                button5.enable();
                            }
                        }, j * 1000);
                    })(i)
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
//得到回放的数据信息
function getHuiFangDataInfo(result, i) {
    var CAMERAID = result.data[0].datas[i]["cameraid"]; //监控点id
    var EQUIPMENT_NAME = result.data[0].datas[i]["equipment_name"]; //监控点名称
    var VRMURL = result.data[0].datas[i]["vrmurl"]; //VRM的URL地址。回放该字段必填
    var CAMERAINDEXCODE = result.data[0].datas[i]["cameraindexcode"]; //级联预览字段
    var BEGINTIME = result.data[0].datas[i]["begintime"]; //录像回放开始时间。回放该字段必填
    var ENDTIME = result.data[0].datas[i]["endtime"]; //录像回放结束时间。回放该字段必填
    var RECORDTYPE = result.data[0].datas[i]["recordtype"]; //录像类型。回放该字段必填
    var str = {
        Parament: [{
            CameraID: CAMERAID,
            CameraName: EQUIPMENT_NAME,
            VRMUrl: VRMURL,
            CameraIndexCode: CAMERAINDEXCODE,
            BeginTime: BEGINTIME,
            EndTime: ENDTIME,
            RecordType: RECORDTYPE
        }]
    };
    var json = eval(str);
    var xmlTree = new XML.ObjTree();
    var xml = xmlTree.writeXML(json);
    var result = document.getElementById("PlayBackOCX").SetPlayBackParam(xml);
    document.getElementById("PlayBackOCX").StartQueryRecord(xml);
}

//首页
function button1_click(sender, e) {
    var PlayBackOCX = document.getElementById("PlayBackOCX");
    PlayBackOCX.StopAllPreview(); //停止所有预览 
    currentPage = 1;
    PageCheck.set_val(currentPage); //跳转页
    initData(currentPage);
}
//上一页
function button2_click(sender, e) {
    var PlayBackOCX = document.getElementById("PlayBackOCX");
    PlayBackOCX.StopAllPreview(); //停止所有预览 
    if(currentPage <= 1)
        currentPage = 1;
    else
        currentPage--;
    PageCheck.set_val(currentPage); //跳转页
    initData(currentPage);
}
//下一页
function button3_click(sender, e) {
    var PlayBackOCX = document.getElementById("PlayBackOCX");
    PlayBackOCX.StopAllPreview(); //停止所有预览 
    if(currentPage >= totalPage)
        currentPage = totalPage;
    else
        currentPage++;
    PageCheck.set_val(currentPage); //跳转页
    initData(currentPage);
}
//尾页
function button4_click(sender, e) {
    var PlayBackOCX = document.getElementById("PlayBackOCX");
    PlayBackOCX.StopAllPreview(); //停止所有预览 
    currentPage = totalPage;
    PageCheck.set_val(currentPage); //跳转页
    initData(currentPage);
}
//跳转
function button5_click(sender, e) {
    var PlayBackOCX = document.getElementById("PlayBackOCX");
    PlayBackOCX.StopAllPreview(); //停止所有预览 
    //
    currentPage = PageCheck.get_val();
    if(currentPage >= totalPage) {
        currentPage = totalPage;
        PageCheck.set_val(currentPage);
    }
    initData(currentPage);
}

//判断是否下载注册过ocx
function IsRegionOcx() {
    if(document.all.PlayBackOCX.object == null) { //搜索注册表是否存在classid为D5E14042-7BF6-4E24-8B01-2F453E8154D7的数据
        //document.getElementById(div_error.id).innerHTML = '请点击此处下载控件，安装时请关闭浏览器';
        panel3.show();
        panel2.hide();
        button.show();
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
        document.getElementById(div_error.id).innerHTML = '当前视频控件只支持IE内核的浏览器，建议使用IE浏览器进行操作'
        //或者
        // div_error.el.dom.innerHTML='当前视频控件只支持IE内核的浏览器，建议用IE浏览器进行操作'
        //以上两种都可以
        panel3.show();
        panel2.hide();
        return -1; //不是ie浏览器
    }
}

function button_click(sender, e) {
    //bootPATH + 'components/ux/ocxvideocontent/js/ObjTree.js'
    window.open(bootPATH + 'components/ux/ocxvideocontent/ocx/cmsocx.exe', '_self')
}

function PageCheck_chaxun(sender,val){
    if( val> totalPage) {
        alert("提示","已超出最大页数！请重新选择！");
        PageCheck.set_val(currentPage); 
        PageCheck.set_sign(currentPage);
        return;
    }
}
			this.OcxVideoPlayBack_afterrender=OcxVideoPlayBack_afterrender;
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
								html:"<object classid=\"clsid:61978326-6772-4595-9EC3-D23C5CD5E61F\" width=\"100%\" height=\"100%\" id=\"PlayBackOCX\" name=\"PlayBackOCX\">    <param name=\"theme\" value=\"blue\"></object>",
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
										margins:"0 5 0 0 ",
										chaxun:"PageCheck_chaxun",
										listeners:{
											chaxun:PageCheck_chaxun
										}
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
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:614,
						height:386,
						region:"center",
						style:"font-size: 16px;font-family: '微软雅黑';",
						items:[
							{
								xtype:"vmd.button",
								id:"button",
								text:"请点击此处下载控件，安装时请关闭浏览器",
								type:"text",
								size:"small",
								hidden:true,
								click:"button_click",
								style:"font-size: 16px;font-family: '微软雅黑';",
								listeners:{
									click:button_click
								}
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div2",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:230,
						height:50,
						region:"west"
					},
					{
						xtype:"vmd.div",
						id:"div4",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:100,
						height:50,
						region:"east"
					},
					{
						xtype:"vmd.div",
						id:"div5",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:400,
						height:230,
						region:"north"
					},
					{
						xtype:"vmd.div",
						id:"div6",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:200,
						height:300,
						region:"south"
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.get_val= function(tree_nodes,buju,suoding,iszd,type,sign){
//直接填写方法内容
get_val(tree_nodes,buju,suoding,iszd,type,sign)
	}
		this.get_lunbo_val= function(tree_nodes,buju,suoding,iszd,type,sign,lunbotime){
//直接填写方法内容
get_lunbo_val(tree_nodes,buju,suoding,iszd,type,sign,lunbotime)
	}
		this.get_shipinhuifang_val= function(tree_nodes,buju,iszd,type){
//直接填写方法内容
get_shipinhuifang_val(tree_nodes,buju,iszd,type)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.OcxVideoPlayBack");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.OcxVideoPlayBack");
	}
})