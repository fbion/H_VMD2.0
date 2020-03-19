Ext.define("vmd.ux.ComponentsTabs" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ComponentsTabs",
	title:"Panel",
	header:false,
	border:false,
	width:580,
	height:200,
	layout:"fit",
	uxCss:".info a {   text-decoration:none; }.info a:link {    color: blue; text-decoration:none;    }.info a:active:{    color: red;    } .info a:visited {    color:purple;text-decoration:none;    } .info a:hover {    color: red; text-decoration:underline;    } .x-grid3-scroller {overflow: hidden}.x-window-mc {    border-width: 0px !important;    margin: 0 auto;}.x-viewport body {    overflow: hidden;    margin-top: 10px;}",
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
    fields: ["appid", "xh", "taskid", "name", "createddate", "flownode", "flowinst", "tasktype", "url"]
})
// 创建已办数据集。
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["appid", "xh", "taskid", "name", "createddate", "flownode", "flowinst", "tasktype", "url"]
})
//组件加载完事件
function MyTabs_afterrender(sender) {
    var el = MyTabs.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1].id;
    vmd("#" + el + "").after("<li class='x-tab-edge' style='width:400px;' id='eweu'><a class='x-tab-right' href='#'><span class='x-tab-strip-inner' style='margin:7px 0 0 0;'><span class='x-tab-strip-text' style='color:blue;float:right;' onclick='more();'>+更多</span></span></a></li>");
    loadUserInfo();
}
//待办数据集
function MyGrid1_beforerender(sender) {
    this.store = store1
}
//已办数据集。
function MyGrid_beforerender(sender) {
    this.store = store2;
    console.log(MyGrid1.el.dom.childNodes[1])//MyGrid1.el.dom.childNodes[1].innerHtml("无待办信息！");
}
//更多按钮点击事件
window.more = function() {
    //页面跳转
    if(lb == 'db') {
        var win = new vmd.window({
            url: '/sngzt/release/12efebd0-5bd2-4d64-8582-fe88888e55ac/hwDoGEhIQq/hwa623b009.html?lb=' + lb + "&userLogin=" + usermodel.login + "&userDwdm=" + usermodel.dwdm,
            auto: false,
            title: "待办数据",
            width: '700px',
            style: 'border:0px !important',
            align: 'center',
        });
    } else {
        var win = new vmd.window({
            url: '/sngzt/release/12efebd0-5bd2-4d64-8582-fe88888e55ac/hwDoGEhIQq/hwa623b009.html?lb=' + lb + "&userLogin=" + usermodel.login + "&userDwdm=" + usermodel.dwdm,
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
function loadUserInfo() {
    vmd.webBase.getUserInfo(function(res, model) {
        console.log(res);
        console.log(model);
        if(res.length > 0) {
            usermodel = {
                login: res.data[0].datas[0].login,
                dwdm: res.data[0].datas[0].dwdm
            }
        }
        loadStoreDb();
        loadStoreYb();
    });
}
//加载待办数据
window.loadStoreDb = function() {
    var DbList = [];
    hwMSC.taskTodoGet(usermodel.login, usermodel.dwdm, 1, 0, function(data) {
        if(data.length > 0 && data.msg.length > 0) {
            var data=data.msg;
            for(var i = 0; i < data.length; i++) {
                var itemObj = {
                    xh: i + 1,
                    appid: data[i].appId,
                    taskid: data[i].task_id,
                    name: "<a href='#' onclick='rowLink(this);'>" + data[i].title + "</a>",
                    createddate: data[i].row_create_date,
                    flownode: data[i].flow_node_id,
                    flowinst: data[i].flow_inst_id,
                    tasktype: data[i].task_type,
                    fromkey: data[i].from_key,
                    tasklink: data[i].task_link
                }
                DbList.push(itemObj);
            }
            store1.loadData(DbList);
        } else {
            panel.el.dom.childNodes[0].innerText="无待办信息！";
        }
    }, function() {
        alert(arguments);
    })
}
//加载已办数据
window.loadStoreYb = function() {
    var YbList = [];
    hwMSC.taskDoGet(usermodel.login, 1, 0, function(data) {
        var data=data.msg;
        if(data.length > 0 && data.msg.length > 0) {
            for(var i = 0; i < data.length; i++) {
                var itemObj = {
                    xh: i + 1,
                    appid: data[i].appId,
                    taskid: data[i].task_id,
                    name: "<a href='#' onclick='rowLink(this);'>" + data[i].title + "</a>",
                    createddate: data[i].row_create_date,
                    flownode: data[i].flow_node_id,
                    flowinst: data[i].flow_inst_id,
                    tasktype: data[i].task_type,
                    fromkey: data[i].from_key,
                    tasklink: data[i].task_link
                }
                YbList.push(itemObj);
            }
            store2.loadData(YbList);
        }else{
            panel1.el.dom.childNodes[0].innerText="无已办信息！";
        }
    }, function() {
        alert(arguments);
    })
}
//点击跳转
window.rowLink = function(id) {
    var tr = $(id).closest('tr'),
        appid = tr.find('td')[0].innerText;
    taskid = tr.find('td')[1].innerText;
    flownode = tr.find('td')[4].innerText;
    flowinst = tr.find('td')[5].innerText;
    tasktype = tr.find('td')[6].innerText;
    fromk = tr.find('td')[7].innerText;
    link = tr.find('td')[8].innerText;
    url = '';
    if(fromk != "") {
        //查询模块路径
        vmd.webBase.getModuleInfo(fromk, '', function(res, model) {
            console.log(res);
            console.log(model);
            //url=
        })
    } else {
        if(link != "") {
            //直接打开链接 
            url = link;
        } else {
            alert("当前未配置超链接地址！");
        }
        window.open('' + link + '?appid=' + appid + '&taskid=' + taskid + '&flownode=' + flownode + '&flowinst=' + flowinst + '&tasktype=' + tasktype, '_blank', '')
    }
}

//tab切换事件
function MyTabs_tabchange(sender, tab) {
    if(tab.title == '待办信息') {
        lb = 'db';
        loadStoreDb();
    } else if(tab.title == '已办信息') {
        lb = 'yb';
        loadStoreYb();
    }
}
			this.items=[
			{
				xtype:"tabpanel",
				id:"MyTabs",
				activeTab:0,
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
										header:"appid",
										sortable:true,
										resizable:false,
										dataIndex:"appid",
										align:"left",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"taskid",
										sortable:true,
										resizable:true,
										dataIndex:"taskid",
										width:200,
										align:"left",
										hidden:true
									},
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
										width:418,
										align:"left"
									},
									{
										xtype:"gridcolumn",
										header:"flownode",
										sortable:true,
										resizable:false,
										dataIndex:"flownode",
										align:"left",
										hidden:true,
										fixed:false
									},
									{
										xtype:"gridcolumn",
										header:"flowinst",
										sortable:true,
										resizable:false,
										dataIndex:"flowinst",
										align:"left",
										hidden:true,
										fixed:false
									},
									{
										xtype:"gridcolumn",
										header:"tasktype",
										sortable:true,
										resizable:false,
										dataIndex:"tasktype",
										align:"left",
										hidden:true,
										fixed:false
									},
									{
										xtype:"gridcolumn",
										header:"fromkey",
										sortable:true,
										resizable:false,
										dataIndex:"fromkey",
										align:"left",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"tasklink",
										sortable:true,
										resizable:false,
										dataIndex:"tasklink",
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
						height:100,
						items:[
							{
								xtype:"grid",
								id:"MyGrid",
								title:"Grid Panel",
								loadMask:true,
								height:167,
								enableHdMenu:true,
								disableHeaderClick:true,
								hideHeaders:true,
								header:false,
								border:false,
								beforerender:"MyGrid_beforerender",
								listeners:{
									beforerender:MyGrid_beforerender
								},
								columns:[
									{
										xtype:"gridcolumn",
										header:"appid",
										sortable:true,
										resizable:false,
										dataIndex:"appid",
										width:500,
										align:"left",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"taskid",
										sortable:true,
										resizable:false,
										dataIndex:"taskid",
										width:500,
										align:"left",
										hidden:true
									},
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
										header:"flownode",
										sortable:true,
										resizable:false,
										dataIndex:"flownode",
										width:500,
										align:"left",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"flowinst",
										sortable:true,
										resizable:false,
										dataIndex:"flowinst",
										width:500,
										align:"left",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"tasktype",
										sortable:true,
										resizable:false,
										dataIndex:"tasktype",
										width:500,
										align:"left",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"fromkey",
										sortable:true,
										resizable:false,
										dataIndex:"fromkey",
										width:500,
										align:"center",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"tasklink",
										sortable:true,
										resizable:false,
										dataIndex:"tasklink",
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.ComponentsTabs");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ComponentsTabs");
	}
})