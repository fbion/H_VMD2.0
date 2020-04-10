Ext.define("vmd.ux.ComponentsTab" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ComponentsTab",
	title:"Panel",
	header:false,
	border:false,
	width:580,
	height:200,
	layout:"fit",
	beforerender:"ComponentsTab_beforerender",
	listeners:{
		beforerender:function(){
			
	this.ComponentsTab_beforerender(this)
}
	},
	uxCss:".info a {       text-decoration:none; }.info a:link {    color: #3284ff; text-decoration:none;    }a{     color: #3284ff !important;}.info a:active:{    color: red;    } .info a:visited {    color:purple;text-decoration:none;    } .info a:hover {    color: red; text-decoration:underline;    } .x-grid3-scroller {overflow: hidden}.x-window-mc {    border-width: 0px !important;    margin: 0 auto;}.x-viewport body {    overflow: hidden;    margin-top: 10px;}",
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
			var page = this;
hwMSC.host = vmd.workspace.msgIp;
var usermodel = {};
var lb = 'db';
// 创建待办数据集。
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["appid", "xh", "taskid", "name", "createddate", "flownode", "flowinst", "tasktype", "fromkey", "tasklink", "businesskey"]
})
// 创建已办数据集。
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["appid", "xh", "taskid", "name", "createddate", "flownode", "flowinst", "tasktype", "fromkey", "tasklink", "businesskey"]
})
//组件加载完事件
function MyTabs_afterrender(sender) {
    var el = MyTabs.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1].id;
    vmd("#" + el + "").after("<li class='x-tab-edge' style='width:400px;' id='eweu'><a class='x-tab-right' href='#'><span class='x-tab-strip-inner' style='margin:7px 0 0 0;'><span class='x-tab-strip-text' style='color:#000;float:right;' onclick='more();'>+更多</span></span></a></li>");
}
//待办数据集
function MyGrid1_beforerender(sender) {
    this.store = store1
}


//已办数据集。
function MyGrid_beforerender(sender) {
    this.store = store2;
    // console.log(MyGrid1.el.dom.childNodes[1])//MyGrid1.el.dom.childNodes[1].innerHtml("无待办信息！");
}
//更多按钮点击事件
window.more = function() {
    //页面跳转
    if(lb == 'db') {
        var win = new vmd.window({
            url: './hwa623b009.html?lb=' + lb,
            auto: false,
            title: "待办数据",
            width: '700px',
            style: 'border:0px !important',
            align: 'center',
        });
    } else {
        var win = new vmd.window({
            url: './hwa623b009.html?lb=' + lb,
            auto: false,
            title: "已办数据",
            width: '700px',
            style: 'border:0px !important',
            align: 'center',
        });
    }
    win.show();
}
//获取用户信息
function loadUserInfo(callback) {
    
    if(usermodel && usermodel.login) {
        callback()
    } else {
        //获取用户角色信息 
        vmd.webBase.getUserRoleInfo(function(res, model) {
            /* var modelRoleid = [],
                 modelRolename = [];*/
            usermodel.roleids = "";
            usermodel.rolenames = "";
            if(model && model.length > 0) {
                usermodel.login = model[0].userlogin;
                usermodel.name = model[0].username;
                usermodel.userid = model[0].userid;
                for(var i = 0; i < model.length; i++) {
                    if(usermodel.roleids) {
                        usermodel.roleids = usermodel.roleids + "," + model[i].roleid;
                    } else {
                        usermodel.roleids = model[i].roleid;
                    }
                    if(usermodel.rolenames) {
                        usermodel.rolenames = usermodel.rolenames + "," + model[i].rolename;
                    } else {
                        usermodel.rolenames = model[i].rolename;
                    }
                    /*modelRoleid.push(model[i].roleid);
                    modelRolename.push(model[i].rolename);*/
                }
            }
            if(callback && typeof callback === "function") {
                callback()
            }
            /* //获取用户岗位信息
             vmd.webBase.getUserPositionInfo(function(result, mod) {
                 var roleIdList = [],
                     roleNameList = [];
                 if(mod && mod.length > 0) {
                     for(var i = 0; i < mod.length; i++) {
                         //根据岗位获取角色
                         var dwid = mod[i].positionid;
                         var hwDao = new HwDao(vmd.workspace.dataServiceIp, 'webxpt');
                         var url = 'platform/v1/positionRole';
                         hwDao.get(url, {}, {
                             positionid: dwid
                         }, function(res) {
                             if(res.isSucceed) {
                                 if(res.data && res.data[0].datas.length > 0) {
                                     var data = res.data[0].datas;
                                     for(var i = 0; i < data.length; i++) {
                                         roleIdList.push(data[i].roleid);
                                         roleNameList.push(data[i].rolename);
                                     }
                                     //用户角色与岗位角色取并集
                                     var roleid = mergeArray(modelRoleid, roleIdList);
                                     var rolename = mergeArray(modelRolename, roleNameList);
                                     usermodel.roleids = roleid.join(',');
                                     usermodel.rolenames = rolename.join(',');
                                 }
                                  if(callback && typeof callback === "function") {
                                      callback()
                                  }
                             } else {
                                 alert(res.errMsg);
                             }
                         }, function(res) {
                             alert(res);
                         });
                     }
                 } else {
                     usermodel.roleids = modelRoleid.join(',');
                     usermodel.rolenames = modelRolename.join(',');
                     if(callback && typeof callback === "function") {
                         callback()
                     }
                 }
             })*/
        })

    }
}
//用户角色与岗位角色取并集
/*function mergeArray(arr1, arr2) {
    var arr = [];
    for(var i = 0; i < arr1.length; i++) {
        arr.push(arr1[i]);
    }
    var dup;
    for(var i = 0; i < arr2.length; i++) {
        dup = false;
        for(var j = 0; j < arr1.length; j++) {
            if(arr2[i] == arr1[j]) {
                dup = true;
                break;
            }
        }
        if(!dup) {
            arr.push(arr2[i]);
        }
    }
    return arr;
}
*/
//加载待办数据
window.loadStoreDb = function() {
    var DbList = [];
    hwMSC.taskTodoGet(usermodel.login, usermodel.roleids, 1, 9, function(data) {
        if(data && data.msg) {
            var dataJson = vmd.decode(data.msg);
            if(dataJson.length > 0) {
                for(var i = 0; i < dataJson.length; i++) {

                    var itemObj = {
                        xh: i + 1,
                        appid: dataJson[i].appId,
                        taskid: dataJson[i].flow_task_id,
                        name: "<a href='#' onclick='rowLink(" + i + ");'>" + dataJson[i].title + "</a>",
                        createddate: dataJson[i].row_create_date,
                        flownode: dataJson[i].flow_node_id,
                        flowinst: dataJson[i].flow_inst_id,
                        tasktype: dataJson[i].task_type,
                        fromkey: dataJson[i].from_key,
                        tasklink: dataJson[i].task_link,
                        businesskey: dataJson[i].business_key
                    }

                    DbList.push(itemObj);
                }
                store1.loadData(DbList);
            } else {
                panel.el.dom.childNodes[0].innerText = "您当前无待办信息！";
            }
        } else {
            panel.el.dom.childNodes[0].innerText = "您当前无待办信息！";
        }
    }, function() {
        //alert(arguments);
        panel.el.dom.childNodes[0].innerText = "查询您的待办信息异常，请刷新界面重试！";
    })
}
//加载已办数据
window.loadStoreYb = function() {
    var YbList = [];
    hwMSC.taskDoGet(usermodel.login, 1, 9, function(data) {
        if(data && data.msg) {
            var dataJson = vmd.decode(data.msg);
            if(dataJson.length > 0) {
                for(var i = 0; i < dataJson.length; i++) {
                    var itemObj = {
                        xh: i + 1,
                        appid: dataJson[i].appId,
                        taskid: dataJson[i].task_id,
                        name: "<a href='#' onclick='rowLink(" + i + ");'>" + dataJson[i].title + "</a>",
                        createddate: dataJson[i].row_create_date,
                        flownode: dataJson[i].flow_node_id,
                        flowinst: dataJson[i].flow_inst_id,
                        tasktype: dataJson[i].task_type,
                        fromkey: dataJson[i].from_key,
                        tasklink: dataJson[i].task_link,
                        businesskey: dataJson[i].business_key
                    }
                    YbList.push(itemObj);
                }
                store2.loadData(YbList);
            } else {
                panel1.el.dom.childNodes[0].innerText = "您当前无已办信息！";
            }
        } else {
            panel1.el.dom.childNodes[0].innerText = "您当前无已办信息！";
        }
    }, function() {
        panel.el.dom.childNodes[0].innerText = "查询您的已办信息异常，请刷新界面重试！";
    })
}


//点击跳转
window.rowLink = function(id) {
    var rowdata = lb == "db" ? MyGrid1.getStore().data.items[id].data : MyGrid.getStore().data.items[id].data;
    var tokenparam = vmd.Cookie.get("hwToken") || vmd.getUrlParam('hwToken');

    if(rowdata) {
        if(tokenparam) {
            tokenparam = "&hwToken=" + tokenparam;
        }
        var linkparam = 'lb=' + lb + '&taskid=' + rowdata.taskid + '&taskId=' + rowdata.taskid + '&flowinstid=' + rowdata.flowinst + "&flownodeid=" + rowdata.flownode + "&businesskey=" + rowdata.businesskey + tokenparam;
        if(rowdata.fromkey) {
            //查询模块路径
            vmd.webBase.getModuleInfo(rowdata.fromkey, '', function(res, model) {

                if(model && model[0].abspath) {
                    window.open('' + model[0].abspath + (model[0].abspath.indexOf('&') != -1 ? '&' : '?') + linkparam, '_blank')
                }
            })
        } else if(rowdata.tasklink) {
            window.open('' + rowdata.tasklink + (rowdata.tasklink.indexOf('&') != -1 ? '&' : '?') + linkparam, '_blank')
        } else {
            alert("当前未配置超链接地址！");
        }
    }

}

//tab切换事件
function MyTabs_tabchange(sender, tab) {
    if(tab.title == '待办信息') {
        lb = 'db';
        loadUserInfo(loadStoreDb);
    } else if(tab.title == '已办信息') {
        lb = 'yb';
        loadUserInfo(loadStoreYb);

    }
}

function ComponentsTab_beforerender(sender) {
    var hwToken = vmd.getUrlParam('hwToken');
    if(hwToken) {
        vmd.Cookie.set('hwToken', hwToken);
    }
}
			this.ComponentsTab_beforerender=ComponentsTab_beforerender;
		this.items=[
			{
				xtype:"tabpanel",
				id:"MyTabs",
				activeTab:1,
				height:320,
				width:580,
				afterrender:"MyTabs_afterrender",
				x:0,
				y:10,
				tabchange:"MyTabs_tabchange",
				listeners:{
					vmdafterrender:MyTabs_afterrender,
					tabchange:MyTabs_tabchange
				},
				items:[
					{
						xtype:"panel",
						id:"panel",
						title:"待办信息",
						header:true,
						border:true,
						height:320,
						width:580,
						autoScroll:false,
						autoHeight:false,
						layout:"fit",
						items:[
							{
								xtype:"grid",
								id:"MyGrid1",
								title:"Grid Panel",
								loadMask:true,
								height:320,
								border:false,
								header:false,
								beforerender:"MyGrid1_beforerender",
								enableHdMenu:true,
								disableHeaderClick:true,
								disabled:false,
								hideHeaders:true,
								hidden:false,
								style:"overflow-x: hidden;",
								width:580,
								cls:"panalflow",
								listeners:{
									beforerender:MyGrid1_beforerender
								},
								columns:[
									{
										xtype:"gridcolumn",
										header:"名称",
										sortable:true,
										resizable:true,
										dataIndex:"name",
										width:418,
										align:"left",
										css:"padding-left: 10px;"
									},
									{
										xtype:"gridcolumn",
										header:"createddate",
										sortable:true,
										resizable:true,
										dataIndex:"createddate",
										width:200,
										align:"left"
									},
									{
										xtype:"gridcolumn",
										header:"id",
										sortable:true,
										resizable:false,
										dataIndex:"id",
										align:"left",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"url",
										sortable:true,
										resizable:false,
										dataIndex:"url",
										align:"left",
										hidden:true
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel1",
						title:"已办信息",
						header:true,
						border:false,
						height:193,
						items:[
							{
								xtype:"grid",
								id:"MyGrid",
								title:"Grid Panel",
								loadMask:true,
								height:320,
								enableHdMenu:true,
								disableHeaderClick:true,
								hideHeaders:true,
								header:false,
								border:false,
								beforerender:"MyGrid_beforerender",
								width:580,
								listeners:{
									beforerender:MyGrid_beforerender
								},
								columns:[
									{
										xtype:"gridcolumn",
										header:"名称",
										sortable:true,
										resizable:true,
										dataIndex:"name",
										width:418,
										align:"left",
										css:"padding-left: 10px;"
									},
									{
										xtype:"gridcolumn",
										header:"时间",
										sortable:true,
										resizable:false,
										dataIndex:"createddate",
										width:200,
										align:"left"
									},
									{
										xtype:"gridcolumn",
										header:"id",
										sortable:true,
										resizable:false,
										dataIndex:"id",
										width:500,
										align:"center",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"url",
										sortable:true,
										resizable:false,
										dataIndex:"url",
										width:500,
										align:"center",
										hidden:true
									}
								]
							}
						]
					}
				],
				ip:this.ip,
				callCode:this.callCode,
				url:this.url,
				hwip:this.hwip
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.ComponentsTab");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ComponentsTab");
	}
})