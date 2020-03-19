Ext.define("vmd.ux.DutyTaskCompletionSn" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.DutyTaskCompletionSn",
	title:"Panel",
	header:false,
	border:false,
	width:1160,
	height:380,
	layout:"fit",
	autoScroll:false,
	afterrender:"DutyTaskCompletionSn_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.DutyTaskCompletionSn_afterrender(this)
}
	},
	uxCss:".x-grid3-hd-row td {    line-height: 15px;    vertical-align: middle;    border-left: 0px solid;     border-right: 0px solid;     border: 1px solid #e4e4e4;}.x-grid3-scroller {    overflow-x: hidden;}/* =========================================== Grid Panel =========================================== *//* 表格左右间距 */.vmd-grid {    padding-left: 5px;    padding-right: 5px;}/* 表格线样式兼容 */.vmd-grid table {    border-collapse: collapse;}/* 表头背景色 */.vmd-grid .x-grid3-header {    background-color: #f7f7f7;}/* 表头鼠标悬停背景色 */.vmd-grid .x-grid3-hd-over .x-grid3-hd-inner {    background-color: #f7f7f7;}/* 表头错位兼容 */.vmd-grid .x-grid3-header-offset {    padding: 0;}/* 表头单元格 */.vmd-grid .x-grid3-header td {    border: 1px solid #e3e2e8;    font-size: 14px;}/* 表体单元格 */.vmd-grid .x-grid3-body td {    border: 1px solid #e3e2e8;    border-top-width: 0;    padding: 0;    font-size: 14px;}/* 表体行 */.vmd-grid .x-grid3-row {    border: none;}/* 表体行鼠标悬停背景色 */.vmd-grid .x-grid3-row-over {    background-color: white;}/* 表体行选中背景色 */.vmd-grid .x-grid3-row-selected {    background-color: #F5F7FC !important;}/* =========================================== Grid Panel =========================================== */",
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
var dbrwDateList = [];
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["id", "xh", "jhkssj", "rwtype", "rwmc", "state", "pgr", "rwwcsj", "shr", "shsj", "shjl"]
});
var ptServer = {
    ip: '',
    callcode: '',
    userInfo: '', //用户信息服务
    schedule: ''
};

//获取用户信息
function loginInfo() {
    var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
    var url = ptServer.userInfo;
    hwDao.get(url, {}, {}, function(res) {
        if(res.data[0].size > 0) {
            dwdm = res.data[0].datas[0].dwdm;
            loadData(dwdm);
        } else {
            loadData(dwdm);
        }
    }, function() {}); /*成功回调函数*/
}

function panel_afterrender(sender) {
   
}

//加载数据
function loadData(dwcode) {
    var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
    var url = ptServer.schedule;
    hwDao.get(url, {}, {
        dwdm: dwcode
    }, function(res) {
        if(res.isSucceed) {
            /* var str = JSON.stringify(res.data);
             debugger*/
            if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                for(var i = 0; i < data.length; i++) {
                    var itemObj = {
                        xh: i + 1,
                        id: data[i].schedule_id,
                        jhkssj: data[i].planning_start_date,
                        rwtype: data[i].schedule_type_name,
                        rwmc: "<a href='#' onclick='rwmcLink(this);'>" + data[i].schedule_name + "</a>",
                        state: data[i].schedule_status,
                        pgr: data[i].distribute_person,
                        rwwcsj: data[i].planning_end_date,
                        shr: data[i].audit_person,
                        shsj: data[i].audit_date,
                        shjl: ""
                    }
                    dbrwDateList.push(itemObj);
                }
            }
            store1.loadData(dbrwDateList);
        } else {
            alert(res.errMsg);
        }
    }, function(res) {
        alert(res);
    });
}

window.rwmcLink = function(id) {
    var tr = $(id).closest('tr'),
        id = tr.find('td')[0].innerText;
}

function MyGrid_beforerender(sender) {
    this.store = store1;
}
window.rwmcLink = function(id) {
    var tr = $(id).closest('tr'),
        id = tr.find('td')[0].innerText;
}

function DutyTaskCompletionSn_afterrender(sender) {
    ptServer = {
        ip: vmd.workspace.dataServiceIp,
        callcode: MyGrid.callcode,
        userInfo: MyGrid.userInfo, //'platform/v1/UserManage', //用户信息服务
        schedule: MyGrid.schedule//'XXHTS/schedule/taskmanager/schedandwo/schedule'
    };
    loginInfo();
}
			this.DutyTaskCompletionSn_afterrender=DutyTaskCompletionSn_afterrender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"当班任务完成情况",
				header:true,
				border:true,
				height:380,
				afterrender:"panel_afterrender",
				width:1150,
				padding:"5",
				layout:"auto",
				listeners:{
					vmdafterrender:panel_afterrender
				},
				items:[
					{
						xtype:"grid",
						id:"MyGrid",
						title:"Grid Panel",
						loadMask:true,
						height:343,
						hideHeaders:false,
						header:false,
						beforerender:"MyGrid_beforerender",
						border:true,
						cls:"vmd-grid",
						width:1150,
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
								width:50,
								align:"center",
								hidden:true
							},
							{
								xtype:"gridcolumn",
								header:"序号",
								sortable:true,
								resizable:true,
								dataIndex:"xh",
								width:50,
								align:"center",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"计划开始时间",
								sortable:true,
								resizable:true,
								dataIndex:"jhkssj",
								width:120,
								align:"center",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"任务类型",
								sortable:true,
								resizable:true,
								dataIndex:"rwtype",
								width:100,
								align:"center",
								css:"text-align: left !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"任务名称",
								sortable:true,
								resizable:true,
								dataIndex:"rwmc",
								width:160,
								align:"center",
								css:"text-align: left !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"状态",
								sortable:true,
								resizable:true,
								dataIndex:"state",
								width:100,
								align:"center",
								css:"text-align: left !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"派工人",
								sortable:true,
								resizable:true,
								dataIndex:"pgr",
								width:100,
								align:"center",
								css:"text-align: left !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"任务完成时间",
								sortable:true,
								resizable:true,
								dataIndex:"rwwcsj",
								width:120,
								align:"center",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"审核人",
								sortable:true,
								resizable:true,
								dataIndex:"shr",
								width:100,
								align:"center",
								css:"text-align: left !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"审核时间",
								sortable:true,
								resizable:true,
								dataIndex:"shsj",
								width:120,
								align:"center",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"审核结论",
								sortable:true,
								resizable:true,
								dataIndex:"shjl",
								width:150,
								align:"center",
								css:"text-align: left !important;",
								menuDisabled:true
							}
						],
						userInfo:this.userInfo,
						callcode:this.callcode,
						schedule:this.schedule
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.DutyTaskCompletionSn");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DutyTaskCompletionSn");
	}
})