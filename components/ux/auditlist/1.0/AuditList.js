Ext.define("vmd.ux.AuditList" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.AuditList",
	layoutConfig:{
		align:"center",
		pack:"start"
	},
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:560,
	layout:"vbox",
	uxCss:".hand a{   text-decoration:none; }.hand a:link {    color: blue; text-decoration:none;    }.hand a:active:{    color: red;    } /*a:visited {    color:purple;text-decoration:none;    } */.hand a:hover {    color: red; text-decoration:underline;    } .x-grid3-hd-row td {    line-height: 15px;    vertical-align: middle;    border-left: 0px solid;     border-right: 0px solid;     border: 1px solid #e4e4e4;}.x-grid3-scroller {    overflow-x: hidden;}/* =========================================== Grid Panel =========================================== *//* 表格左右间距 */.vmd-grid {   /* padding-left: 5px;    padding-right: 5px;*/}/* 表格线样式兼容 */.vmd-grid table {    border-collapse: collapse;}/* 表头背景色 */.vmd-grid .x-grid3-header {    background-color: #f7f7f7;}/* 表头鼠标悬停背景色 */.vmd-grid .x-grid3-hd-over .x-grid3-hd-inner {    background-color: #f7f7f7;}/* 表头错位兼容 */.vmd-grid .x-grid3-header-offset {    padding: 0;}/* 表头单元格 */.vmd-grid .x-grid3-header td {    border: 1px solid #e3e2e8;    font-size: 14px;}/* 表体单元格 */.vmd-grid .x-grid3-body td {    border: 1px solid #e3e2e8;    border-top-width: 0;    padding: 0;    font-size: 14px;}/* 表体行 */.vmd-grid .x-grid3-row {    border: none;}/* 表体行鼠标悬停背景色 */.vmd-grid .x-grid3-row-over {    background-color: white;}/* 表体行选中背景色 */.vmd-grid .x-grid3-row-selected {    background-color: #F5F7FC !important;}/* =========================================== Grid Panel =========================================== */",
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
var ipServer = {
    tz: vmd.workspace.dataServiceIp
}
var store5 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["id", "xh", "name", "date", "url"]
});
//工作流模板节点
var objNode = {
    workFlowNodeCode_workTemp: ["gdmblcjd2", "gdmblcjd3", "gdmblcjd4", "gdmblcjd5"], //工单模板
    workFlowNodeCode_taskTemp: ["rwmblcjd2", "rwmblcjd3", "rwmblcjd4", "rwmblcjd5"], //任务模板
    workFlowNodeCode_task: ["rwlcjd2", "rwlcjd3", "rwlcjd4", "rwlcjd5", "rwlcjd6"] //任务
}

function MyGrid_beforerender(sender) {
    this.store = store5;
    dataList = [];
    var param = '';
    var lb = getQueryString("lb");
    var userLogin = getQueryString("userLogin");
    var userDwdm = getQueryString("userDwdm");
    if(lb == 'db') {
        hwMSC.taskDoGet(userLogin, 1, 0, function(data) {
        dataList = data;
        lodaItem(); //加载数据
    }, function(rel) {
        alert(rel);
    })
    } else {
        hwMSC.taskTodoGet(userLogin, userDwdm, 1, 0, function(data) {
            console.log(data);
            dataList = data;
            lodaItem(); //加载数据
        }, function() {
            alert(arguments);
        })
    }
}

//加载数据
function lodaItem() {
    var type = getQueryString("type");
    var data = dataList;
    var dataModel = [];
    var jumpUrl = '';
    for(var i = 0; i < data.length; i++) {
        switch (type) {
            case "rw": //任务
                if(data[i].flow_node_id == objNode.workFlowNodeCode_task[0] ||
                    data[i].flow_node_id == objNode.workFlowNodeCode_task[2] ||
                    data[i].flow_node_id == objNode.workFlowNodeCode_task[3] ||
                    data[i].flow_node_id == objNode.workFlowNodeCode_task[4]) {
                    dataModel.push({
                        xh: i + 1,
                        name: "<a href='#' onclick='rowLink(this);'>" + data[i].title + "</a>",
                        date: data[i].row_create_date,
                        url: ipServer.tz + "/pages/task/orderView.html?flag=view&applyid=" + data[i].appId + "&r=" + Math.random()
                    });
                }
                break;
            case "gdmb": //工单模板
                if(data[i].flow_node_id == objNode.workFlowNodeCode_workTemp[0] ||
                    data[i].flow_node_id == objNode.workFlowNodeCode_workTemp[1] ||
                    data[i].flow_node_id == objNode.workFlowNodeCode_workTemp[2] ||
                    data[i].flow_node_id == objNode.workFlowNodeCode_workTemp[3]) {
                    dataModel.push({
                        xh: i + 1,
                        name: "<a href='#' onclick='rowLink(this);'>" + data[i].title + "</a>",
                        date: data[i].row_create_date,
                        url: ipServer.tz + "/pages/workListTemp/workOrderView.html?applyid=" + data[i].appId +
                            "&lcslh=" + data[i].flow_inst_id + "&r=" + Math.random()
                    });
                }
                break;
            case "rwmb": //任务模板
                if(data[i].flow_node_id == objNode.workFlowNodeCode_taskTemp[0] ||
                    data[i].flow_node_id == objNode.workFlowNodeCode_taskTemp[1] ||
                    data[i].flow_node_id == objNode.workFlowNodeCode_taskTemp[2] ||
                    data[i].flow_node_id == objNode.workFlowNodeCode_taskTemp[3]) {
                    dataModel.push({
                        xh: i + 1,
                        name: "<a href='#' onclick='rowLink(this);'>" + data[i].title + "</a>",
                        date: data[i].row_create_date,
                        url: ipServer.tz + "/pages/taskTemp/taskTemplateAuditView.html?applyid=" + data[i].appId +
                            "&lcslh=" + data[i].flow_inst_id + "&r=" + Math.random()
                    });
                }
                break;
            case "gdmbsp": //工单模板审批
                if(data[i].flow_node_id == objNode.workFlowNodeCode_workTemp[0]) { //业务部门领导审批
                    jumpUrl = ipServer.tz + "/pages/workListTemp/workOrderApplyApproveBizDepartment.html";
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl, i);
                } else if(data[i].flow_node_id == objNode.workFlowNodeCode_workTemp[1]) { //生产指挥中心领导审批
                    jumpUrl = ipServer.tz + "/pages/workListTemp/workOrderApplyApproveControlCenter.html";
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl, i);
                }
                break;
            case "rwmbsp": //任务模板审批
                if(data[i].flow_node_id == objNode.workFlowNodeCode_taskTemp[0]) { //业务部门审批
                    jumpUrl = ipServer.tz + "/pages/taskTemp/taskTemplateApp/busDeparApproval.html";
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl, i);
                }
                if(data[i].flow_node_id == objNode.workFlowNodeCode_taskTemp[1]) { //生产指挥中心领导审批
                    jumpUrl = ipServer.tz + "/pages/taskTemp/taskTemplateApp/approvalOfcenter.html";
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl, i);
                }
                break;
            case "mbdqr": //模板确认
                if(data[i].flow_node_id == objNode.workFlowNodeCode_workTemp[2]) { //工单模板确认
                    dataModel.push({
                        xh: i + 1,
                        name: data[i].title,
                        date: data[i].row_create_date,
                        url: ipServer.tz + "tempConfirm.html?flag=gdmb&applyid=" + data[i].appId + "&taskid=" + data[i].task_id + "&r=" + Math.random()
                    });
                }
                if(data[i].flow_node_id == objNode.workFlowNodeCode_taskTemp[2]) { //任务模板确认
                    jumpUrl = ipServer.tz + "/pages/taskTemp/preview.html";
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl, i);
                }
                break;
            case "cxtz": //重新提交
                if(data[i].flow_node_id == objNode.workFlowNodeCode_workTemp[3]) { //工单模板重新提交
                    jumpUrl = ipServer.tz + "/pages/workListTemp/workOrderApply.html";
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl, i);
                }
                if(data[i].flow_node_id == objNode.workflow_node_idCode_taskTemp[3]) { //任务模板重新提交
                    jumpUrl = ipServer.tz + "/pages/taskTemp/taskTemplateApp/taskTemplateApp.html";
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl, i);
                }
                break;
            default:
                break;
        }
    }
    store5.loadData(dataModel);
}

function addTodoInfo(todoDataModel, todoInfo, jumpUrl, num) {
    todoDataModel.push({
        xh: num + 1,
        name: "<a href='#' onclick='rowLink(this);'>" + todoInfo.title + "</a>",
        date: todoInfo.row_create_date,
        url: jumpUrl + "?applyid=" + todoInfo.appId + "&taskid=" + todoInfo.task_id +
            "&nodeid=" + todoInfo.flow_node_id + "&lcslh=" + todoInfo.flow_inst_id + "&r=" + Math.random()
    });
    return todoDataModel;
}


window.rowLink = function(id) {
    var tr = $(id).closest('tr'),
        url = tr.find('td')[4].innerText;
    window.open(url, '_blank', '');
}

//页面参数获取方法
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if(r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
			this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"Panel",
				header:false,
				border:true,
				height:560,
				layout:"fit",
				autoHeight:false,
				width:600,
				items:[
					{
						xtype:"grid",
						id:"MyGrid",
						title:"Grid Panel",
						loadMask:true,
						header:false,
						beforerender:"MyGrid_beforerender",
						cls:"hand vmd-grid",
						height:600,
						listeners:{
							beforerender:MyGrid_beforerender
						},
						columns:[
							{
								xtype:"gridcolumn",
								header:"id",
								sortable:true,
								resizable:true,
								dataIndex:"id",
								width:100,
								hidden:true,
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"序号",
								sortable:true,
								resizable:true,
								dataIndex:"xh",
								width:100,
								align:"center",
								hidden:false,
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"名称",
								sortable:true,
								resizable:true,
								dataIndex:"name",
								width:350,
								align:"center",
								css:"text-align: left !important;"
							},
							{
								xtype:"gridcolumn",
								header:"时间",
								sortable:true,
								resizable:true,
								dataIndex:"date",
								width:140,
								align:"center",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"ur",
								sortable:true,
								resizable:true,
								dataIndex:"url",
								width:100,
								align:"center",
								hidden:true,
								menuDisabled:true
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.AuditList");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AuditList");
	}
})