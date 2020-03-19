Ext.define("vmd.ux.RegRelease" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.PublishResource$1.0$PublishResource"]),
	version:"1.0",
	xtype:"vmd.ux.RegRelease",
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:600,
	layout:"border",
	afterrender:"RegRelease_afterrender",
	style:"font-size: 14px",
	listeners:{
		vmdafterrender:function(){
	this.RegRelease_afterrender(this)
}
	},
	uxCss:".div.dhxcombo_material input.dhxcombo_input {    font-size: 10px;}.div.dhxcombo_material {    height: 22px;}div.dhxcombo_material div.dhxcombo_select_button {    top: 1px;}div.dhxcombo_material {    border: 1px solid;    border-color: #dfdfdf}",
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
			var workspaceid = getUrlParam(workspaceid)
if(workspaceid) {
    vmd.core.getWorkSpaceServer(workspaceid);
}
//定义校验规则表达式
var strRegex = '^(([0-9a-z_!~*().&=+$%-]+: )?[0-9a-z_!~*().&=+$%-]+@)?' //ftp的user@
    +
    '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
    +
    '|' // 允许IP和DOMAIN（域名）
    +
    '([0-9a-z_!~*()-]+.)*' // 域名- www.
    +
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
    +
    '[a-z]{2,6})' // first level domain- .com or .museum
    +
    '(:[0-9]{1,4})?' // 端口- :80
    +
    '((/?)|' // a slash isn't required if there is no file name
    +
    '(/[0-9a-z_!~*().;?:@&=+$,%#-]+)+/?)$';

function loadSubSys(defaultId) {
    if(c_r_pt5.checked) {
        tree.leafImg = "/modules/eQ9ULgcVb1/img/folderClosed.gif";
    } else {
        tree.leafImg = "/lib/dhtmlx/imgs/dhxtree_material/tree/model.png";
    }
    tree.store.toRefresh(function() {
        if(defaultId) {
            var selNode = tree.getNodeById(defaultId);
            if(selNode) {
                tree.expandPath(selNode.getPath());
                selNode.select();
            }
        }
    });
    return;
}

var objlistResourceNameIP = {};
function saveRegReleaseInfo(projectid, callback) {
    var pttype = "4";
    if(r_pt5checked)
        pttype = "5";

    var selSubSysID = "";
    selSubSysID = tree.getSelNodeId();
    if(!selSubSysID) {
        Ext.Msg.alert('提示', '请选择要注册的子系统！')
        return;
    }

    var listPublishResourceServers = [];
    objlistResourceNameIP = {};
    for(var i = 0; i < listPublishResourceComps.length; i++) {
        var Serversinfo = listPublishResourceComps[i].getText();
        listPublishResourceServers.push(Serversinfo);
    }

    for(var i = 0; i < listResourceNameIP.length; i++) {
        for(var j = 0; j < listPublishResourceServers.length; j++) {
            if(listResourceNameIP[i].oldip == listPublishResourceServers[j].oldIP) {
                listResourceNameIP[i].newip = listPublishResourceServers[j].newIP || listPublishResourceServers[j].oldIP
                objlistResourceNameIP[listResourceNameIP[i].name] = "http://" + listResourceNameIP[i].newip + "/resource";
                break;
            }
        }
    }
    hwDas.save("DataServiceWorkSpace/projectInfo/projectreginfo", {}, {}, [{
        projectid: projectid,
        pttype: pttype,
        virtualdir: MyField.getValue(),
        subsysid: selSubSysID, //hwTree.getSelectedItemId(),
        dasserver: txt_dataserverip.getValue(),
        wfserver: txt_workflowip.getValue(),
        msgserver: txt_msg.getValue(),
        resourceserver: Ext.encode(listResourceNameIP),
        ptdb: combo.getValue()

    }], function(result) {
        if(callback)
            callback(result)
        saveReleaseConfig(projectid);
    }, function(msg) {})
}

function saveReleaseConfig(project) {
    // 保存配置信息
    var saveVmdConfig = function(filename, bodyStr) {
        Ext.Ajax.request({
            url: vmd.vmdUploadPath + 'FileService',
            timeout: 5000,
            success: function(result) {},
            failure: function(result) {
                Ext.Msg.alert('错误', '网络超时，保存项目配置信息失败！')
            },
            headers: {
                FileName: 'release/' + project + "/" + filename,
            },
            params: {
                body: bodyStr
            }
        })
    }

    var bodyStr = 'vmd.workspace={\n';
    bodyStr += "dataServiceIp: \"" + (txt_dataserverip.getValue()) + "\",\n";
    bodyStr += "workflowIp: \"" + (txt_workflowip.getValue()) + "\",\n";
    bodyStr += "msgIp: \"" + (txt_msg.getValue()) + "\"\n";
    bodyStr += '}' + "\n";
    //objlistResourceNameIP
    bodyStr += 'vmd.resourceSettings={\n';
    for(g in objlistResourceNameIP) {
        bodyStr += "\"" + g + "\":\"" + objlistResourceNameIP[g] + "\",\n";
    }
    bodyStr += '}' + "\n";

    if(txt_msg.getValue() != "") {
        bodyStr += "hwMSC.host=\"" + (txt_msg.getValue()) + "\"\n";
    }

    if(txt_dataserverip.getValue() != "") {
        bodyStr += "hwDas.hosts=[\"" + (txt_dataserverip.getValue()) + "\"]\n";
    }
    //处理项目的配置文件
    saveVmdConfig("config.js", bodyStr);
}

var listPublishResourceComps = []; //记录动态添加的组件列表。
var listResourceIP = []; //记录当前模块所有的资源服务器地址
var listResourceNameIP = []; //记录资源的名称和ip信息

var r_pt5checked = false;

function changept(snder, check) {
    {
        if(snder._id == "r_pt5" && check)
            r_pt5checked = true;
        else if(snder._id == "r_pt4" && !check)
            r_pt5checked = true;
        else
            r_pt5checked = false;
        loadSubSys()
    }
}

function RegRelease_afterrender(sender) {}

function getRegReleaseInfo(projectId, callback) {
    hwDas.get("DataServiceWorkSpace/projectInfo/projectreginfo", {}, {
        projectid: projectId
    }, function(result) {
        var subsysid;
        var resourceserver = [];
        if(result.data && result.data.length > 0 && result.data[0].datas && result.data[0].datas.length > 0) {
            if(result.data[0].datas[0].pttype == "5") {
                r_pt5checked = true;
                r_pt4.checked = false;
                r_pt4.setValue(false)
                r_pt5.checked = true;
                r_pt5.setValue(true)
            } else {
                r_pt5checked = false;
            }
            if(result.data[0].datas[0].ptdb == "" && result.data[0].datas[0].pttype == "5")
                combo.setValue("newpt")
            else if(result.data[0].datas[0].ptdb == "")
                combo.setValue("pt")
            else
                combo.setValue(result.data[0].datas[0].ptdb)

            subsysid = result.data[0].datas[0].subsysid;
            txt_dataserverip.setValue(result.data[0].datas[0].dasserver)
            txt_workflowip.setValue(result.data[0].datas[0].wfserver)
            txt_msg.setValue(result.data[0].datas[0].msgserver)
            MyField.setValue(result.data[0].datas[0].virtualdir)
            resourceserver = Ext.decode(result.data[0].datas[0].resourceserver);
        }
        loadSubSys(subsysid);
        //添加radio的check事件，在此处添加的原因为防止初始化时，设置radio选中会触发事件，调用loadSubSys，导致加载两次树
        addCheckEvent();
        //递归添加地址对应组件，并设置内容
        
        hwDas.get("DataServiceWorkSpace/projectInfo/getResSerByProjectId", {}, {
            projectid: projectId //"hwfc1422a6" //
        }, function(result) {
            if(result.data && result.data.length > 0 && result.data[0].datas && result.data[0].datas.length > 0) {
                for(var i = 0; i < result.data[0].datas.length; i++) {
                    if(listResourceIP.indexOf(result.data[0].datas[i].resource_server_ip) < 0) {
                        listResourceIP.push(result.data[0].datas[i].resource_server_ip);
                        var ipresource = new vmd.ux.PublishResource({
                            id: "PublishResource" + i,
                            anchor: "100% "
                        });
                        palResource.add(ipresource)
                        var newip = "";
                        for(var j = 0; j < resourceserver.length; j++) {
                            if(resourceserver[j].oldip == result.data[0].datas[i].resource_server_ip)
                                newip = resourceserver[j].newip;
                        }
                        ipresource.setText(result.data[0].datas[i].resource_server_ip, newip, result.data[0].datas[i].fullname.replace('&&', '/'));
                        listPublishResourceComps.push(ipresource)
                    }
                    
                    listResourceNameIP.push({
                        name: result.data[0].datas[i].fullname,
                        oldip: result.data[0].datas[i].resource_server_ip,
                        newip: ""
                    })
                }
                PublishResource.hide();
                palResource.onBodyResize()
            } else { //如果没有设置资源中新，则读取本地默认的资源中心地址，处理逻辑与上述处理一致
                //调用获取资源中新的公共方法
                vmd.core.getModuleResourceServices(parent.hwTree.getSelectedItemId(), function(serverlist) {
                    //遍历 默认的资源地址  
                    for(var i = 0; i < serverlist.length; i++) {
                        if(serverlist[i].children && serverlist[i].children.length > 0) {
                            for(var ii = 0; ii < serverlist[i].children.length; ii++) {
                                var fullname = serverlist[i].name + '&&' + serverlist[i].children[ii].name;
                                if(listResourceIP.indexOf(serverlist[i].children[ii].address) < 0) {
                                    listResourceIP.push(serverlist[i].children[ii].address);
                                    var ipresource = new vmd.ux.PublishResource({
                                        id: "PublishResource" + i + ii,
                                        anchor: "100% "
                                    });
                                    //动态添加地址替换组件，根据有多少不同的地址进行添加
                                    palResource.add(ipresource)
                                    var newip = "";
                                    //获取替换的服务的新老地址
                                    for(var j = 0; j < resourceserver.length; j++) {
                                        if(resourceserver[j].oldip == serverlist[i].children[ii].address)
                                            newip = resourceserver[j].newip;
                                    }
                                    //将新老地址赋给替换组件进行替换
                                    ipresource.setText(serverlist[i].children[ii].address, newip, fullname.replace('&&', '/'));
                                    listPublishResourceComps.push(ipresource)
                                }
                                
                                listResourceNameIP.push({
                                    name: fullname,
                                    oldip: serverlist[i].children[ii].address,
                                    newip: ""
                                })
                            }
                        }
                    }
                    PublishResource.hide();
                    palResource.onBodyResize()
                }, function(msg) {})
            }
        }, function(msg) {});
    }, function(msg) {})
}

function r_pt4_beforerender(sender) {
    r_pt4.name = "rgroup"
    r_pt4._id = "r_pt4";
}

function r_pt5_beforerender(sender) {
    r_pt5.name = "rgroup"
    r_pt5._id = "r_pt5";
}

var c_r_pt4;
var c_r_pt5;

function r_pt4_afterrender(sender) {
    c_r_pt4 = sender;
}

function r_pt5_afterrender(sender) {
    c_r_pt5 = sender;
}

function addCheckEvent() {
    c_r_pt4.on('check', function(radio, checked) {
        changept(radio, checked);
    })
    c_r_pt5.on('check', function(radio, checked) {
        changept(radio, checked);
    })
}

function combo_beforerender(sender) {
    combo.displayField = "name";
    combo.valueField = "id";
}

function combo_afterrender(sender) {

}

function combo_change(sender) {
    loadSubSys();
}

function txt_dataserverip_beforerender(sender) {
    txt_dataserverip.regex = new RegExp(strRegex)
    txt_dataserverip.regexText = "输入标准的服务器地址！无需输入‘http://’";
}

function txt_workflowip_beforerender(sender) {
    txt_workflowip.regex = new RegExp(strRegex)
    txt_workflowip.regexText = "输入标准的服务器地址！无需输入‘http://’";
}

function txt_msg_beforerender(sender) {
    txt_msg.regex = new RegExp(strRegex)
    txt_msg.regexText = "输入标准的服务器地址！无需输入‘http://’";
}
			this.RegRelease_afterrender=RegRelease_afterrender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"Panel",
				header:false,
				border:false,
				height:100,
				region:"center",
				layout:"border",
				items:[
					{
						xtype:"panel",
						id:"panel3",
						title:"Panel",
						header:false,
						border:true,
						height:619,
						region:"center",
						layout:"anchor",
						items:[
							{
								xtype:"vmd.div",
								id:"div1",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:50,
								anchor:"100% 45%",
								layout:"border",
								items:[
									{
										xtype:"vmd.div",
										id:"div11",
										layoutConfig:{
											align:"middle"
										},
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:400,
										height:35,
										region:"north",
										layout:"hbox",
										items:[
											{
												xtype:"label",
												id:"label8",
												text:"平台配置",
												style:"font-size: 14px;font-weight: bold",
												margins:"0 0 0 10"
											}
										]
									},
									{
										xtype:"vmd.div",
										id:"div12",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:400,
										height:50,
										region:"center",
										layout:"border",
										items:[
											{
												xtype:"vmd.div",
												id:"div6",
												layoutConfig:{
													align:"middle"
												},
												autoEl:"div",
												border:false,
												backgroundRepeat:"no-repeat",
												backgroundPosition:"top left",
												width:400,
												height:42,
												region:"north",
												layout:"hbox",
												style:"border-top: 1px solid;    border-top-color: rgb(223, 223, 223)",
												items:[
													{
														xtype:"label",
														id:"label5",
														text:"平台库：",
														x:10,
														y:5,
														style:"font-size: 14px;    color: #5f5f5f;",
														margins:"2 0 0 10"
													},
													{
														xtype:"vmd.combo",
														id:"combo",
														width:150,
														x:60,
														y:1,
														beforerender:"combo_beforerender",
														style:"font-size: 10px;    height: 22px;",
														afterrender:"combo_afterrender",
														change:"combo_change",
														listeners:{
															beforerender:combo_beforerender,
															vmdafterrender:combo_afterrender,
															change:combo_change
														},
														store:this.datasource
													},
													{
														xtype:"label",
														id:"label4",
														text:"类型：",
														x:220,
														y:5,
														height:20
													},
													{
														xtype:"radio",
														id:"r_pt4",
														boxLabel:"平台4",
														width:62,
														checked:true,
														x:260,
														y:0,
														beforerender:"r_pt4_beforerender",
														afterrender:"r_pt4_afterrender",
														listeners:{
															beforerender:r_pt4_beforerender,
															vmdafterrender:r_pt4_afterrender
														}
													},
													{
														xtype:"radio",
														id:"r_pt5",
														boxLabel:"平台5",
														width:69,
														x:320,
														y:0,
														beforerender:"r_pt5_beforerender",
														afterrender:"r_pt5_afterrender",
														listeners:{
															beforerender:r_pt5_beforerender,
															vmdafterrender:r_pt5_afterrender
														}
													}
												]
											},
											{
												xtype:"vmd.div",
												id:"div7",
												autoEl:"div",
												border:false,
												backgroundRepeat:"no-repeat",
												backgroundPosition:"top left",
												width:400,
												height:50,
												region:"center",
												layout:"border",
												style:"border: 1px solid;    border-color: rgb(223, 223, 223);",
												margins:"0 10 0 10",
												items:[
													{
														xtype:"vmd.div",
														id:"div",
														layoutConfig:{
															align:"middle"
														},
														autoEl:"div",
														border:false,
														backgroundRepeat:"no-repeat",
														backgroundPosition:"top left",
														width:400,
														height:32,
														region:"north",
														style:"font-size: 14px;    background-color: #f5f9fc",
														layout:"hbox",
														items:[
															{
																xtype:"label",
																id:"label",
																text:"请选择要注册的子系统：",
																x:10,
																y:35,
																margins:"0 0 0 5"
															}
														]
													},
													{
														xtype:"vmd.div",
														id:"div8",
														autoEl:"div",
														border:false,
														backgroundRepeat:"no-repeat",
														backgroundPosition:"top left",
														width:400,
														height:50,
														layout:"fit",
														region:"center",
														items:[
															{
																xtype:"vmd.treeex",
																id:"tree",
																width:350,
																height:270,
																hideRoot:true,
																x:180,
																y:10,
																parentField:"parentid",
																valueField:"subsysid",
																textField:"subsysname",
																loadType:"全部加载",
																rootValue:"0",
																rootText:"子系统",
																store:this.subSysTreeStore
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"div3",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:50,
								anchor:"100% 55%",
								layout:"border",
								items:[
									{
										xtype:"vmd.div",
										id:"div4",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:400,
										height:100,
										region:"north",
										layout:"border",
										items:[
											{
												xtype:"vmd.div",
												id:"div9",
												layoutConfig:{
													align:"middle"
												},
												autoEl:"div",
												border:false,
												backgroundRepeat:"no-repeat",
												backgroundPosition:"top left",
												width:400,
												height:35,
												region:"north",
												layout:"hbox",
												items:[
													{
														xtype:"label",
														id:"label7",
														text:"服务信息",
														margins:"0 0 0 10",
														style:"font-size: 14px;font-weight: bold"
													}
												]
											},
											{
												xtype:"vmd.div",
												id:"div10",
												autoEl:"div",
												border:false,
												backgroundRepeat:"no-repeat",
												backgroundPosition:"top left",
												width:400,
												height:61,
												layout:"absolute",
												region:"center",
												style:"border-top: 1px solid;    border-top-color: rgb(223, 223, 223)",
												items:[
													{
														xtype:"label",
														id:"label2",
														text:"数据服务地址:",
														x:15,
														y:5,
														style:"font-size: 14px;    color: #5f5f5f;"
													},
													{
														xtype:"textfield",
														id:"txt_dataserverip",
														allowBlank:true,
														enableKeyEvents:true,
														x:110,
														y:0,
														width:180,
														columnWidth:0.5,
														beforerender:"txt_dataserverip_beforerender",
														listeners:{
															beforerender:txt_dataserverip_beforerender
														}
													},
													{
														xtype:"label",
														id:"label3",
														text:"工作流地址：",
														x:310,
														y:5,
														style:"font-size: 14px;    color: #5f5f5f;"
													},
													{
														xtype:"textfield",
														id:"txt_workflowip",
														allowBlank:true,
														enableKeyEvents:true,
														x:400,
														y:0,
														width:180,
														columnWidth:0.5,
														beforerender:"txt_workflowip_beforerender",
														listeners:{
															beforerender:txt_workflowip_beforerender
														}
													},
													{
														xtype:"label",
														id:"label6",
														text:"消息中心地址:",
														x:15,
														y:35,
														style:"font-size: 14px;    color: #5f5f5f;"
													},
													{
														xtype:"textfield",
														id:"txt_msg",
														allowBlank:true,
														enableKeyEvents:true,
														x:110,
														y:27,
														width:180,
														columnWidth:0.5,
														beforerender:"txt_msg_beforerender",
														listeners:{
															beforerender:txt_msg_beforerender
														}
													}
												]
											}
										]
									},
									{
										xtype:"vmd.div",
										id:"div5",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:400,
										height:50,
										region:"center",
										layout:"border",
										items:[
											{
												xtype:"vmd.div",
												id:"div2",
												layoutConfig:{
													align:"middle"
												},
												autoEl:"div",
												border:false,
												backgroundRepeat:"no-repeat",
												backgroundPosition:"top left",
												width:400,
												height:35,
												anchor:"100% 10%",
												layout:"hbox",
												region:"north",
												items:[
													{
														xtype:"label",
														id:"title",
														text:" 资源中心",
														anchor:"",
														height:20,
														autoHeight:false,
														width:100,
														y:5,
														x:10,
														autoWidth:true,
														style:"font-size: 14px;font-weight: bold",
														margins:"0 0 0 10"
													}
												]
											},
											{
												xtype:"vmd.div",
												id:"DivResource",
												autoEl:"div",
												border:false,
												backgroundRepeat:"no-repeat",
												backgroundPosition:"top left",
												width:400,
												height:50,
												anchor:"100% 30%",
												layout:"fit",
												region:"center",
												style:"border-top: 1px solid;    border-top-color: rgb(223, 223, 223)",
												items:[
													{
														xtype:"panel",
														id:"palResource",
														title:"Panel",
														header:false,
														border:false,
														height:100,
														layout:"anchor",
														autoScroll:true,
														items:[
															{
																xtype:"vmd.ux.PublishResource",
																id:"PublishResource",
																layout:"column",
																anchor:"100% "
															}
														]
													}
												]
											}
										]
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel4",
						title:"Panel",
						header:false,
						border:false,
						height:32,
						region:"south",
						layout:"absolute",
						style:"border-top: 1px solid;    border-top-color: rgb(223, 223, 223)",
						items:[
							{
								xtype:"label",
								id:"label1",
								text:"虚拟目录：",
								x:10,
								y:5,
								style:"font-size: 14px;"
							},
							{
								xtype:"textfield",
								id:"MyField",
								allowBlank:true,
								enableKeyEvents:true,
								x:80,
								y:3,
								width:220
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
			this.saveRegInfo= function(projectId,callback){
//直接填写方法内容
saveRegReleaseInfo(projectId,callback)
	}
		this.getRegInfo= function(projectId,callback){
//直接填写方法内容
getRegReleaseInfo(projectId,callback)
	}
		this.getPtType= function(){
//直接填写方法内容
if(c_r_pt4.checked)
    return "";
else if(c_r_pt5.checked)
    return "5";
	}
		this.getptdb= function(){
//直接填写方法内容
return combo.getValue();
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.RegRelease");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.RegRelease");
	}
})