Ext.define("vmd.ux.PerTaskMon" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.CreateCalendar$1.0$CreateCalendar"]),
	version:"1.0",
	xtype:"vmd.ux.PerTaskMon",
	title:"Panel",
	header:false,
	border:false,
	width:1160,
	height:391,
	layout:"fit",
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
var ryRwDataList = [];
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["id", "xh", "name", "teme", "rws", "wks", "jxz", "dsh", "zcwc", "cs", "yc"]
});
var ptServer = {
    ip:'192.168.1.180:6602',
    callcode:'snqtscdd',
    userschedrun: 'XXHTS/schedule/taskmanager/workbench/userschedrun'
};
var paramsry = {
    crewid: '',
    ksrq: '',
    jsrq: ''
};
window.loadStoreRyrw = function(ob) {
    ryRwDataList = [];
    var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
    var url = ptServer.userschedrun;
    hwDao.get(url, {}, ob, function(res) {
        if(res.isSucceed) {
            if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                for(var i = 0; i < data.length; i++) {
                    var itemObj = {
                        xh: i + 1,
                        id: data[i].login,
                        name: data[i].name,
                        teme: data[i].team_name,
                        rws: "<a class='hand' href='#'>" + data[i].zs + "</a>",
                        wks: "<a class='hand' href='#'>" + data[i].wks + "</a>",
                        jxz: "<a class='hand' href='#'>" + data[i].jxz + "</a>",
                        dsh: "<a class='hand' href='#'>" + data[i].dsh + "</a>",
                        zcwc: "<a class='hand' href='#'>" + data[i].zcwc + "</a>",
                        cs: "<a class='hand' href='#'>" + data[i].cswc + "</a>",
                        yc: "<a class='hand' href='#'>" + data[i].yc + "</a>"
                    }
                    ryRwDataList.push(itemObj);
                }
            }
            store1.loadData(ryRwDataList);
        } else {
            alert(res.errMsg);
        }
    }, function(res) {
        alert(res);
    });
}

function MyGrid_beforerender(sender) {
    this.store = store1;
    paramsry = {
        crewid: '',
        ksrq: CreateCalendar.getStartDateVal(),
        jsrq: CreateCalendar.getEndDateVal()
    };
    loadStoreRyrw(paramsry);
}


function CreateCalendar_queryBtnClick(sender, kssj, jssj) {
    paramsry = {
        crewid: '',
        ksrq: kssj,
        jsrq: jssj
    };
    loadStoreRyrw(paramsry);
}

function CreateCalendar_startDateOnchange(sender,ksrq,jsrq,bz){
if(ksrq>jsrq){
    alert('开始日期不能大于结束日期!');
    return;
}
}
			this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"人员任务运行监控",
				header:true,
				border:true,
				height:390,
				layout:"auto",
				width:1150,
				padding:"5",
				items:[
					{
						xtype:"vmd.ux.CreateCalendar",
						id:"CreateCalendar",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						startDateNameTxt:"开始时间：",
						startDateCls:"dateYmd",
						endDateNameTxt:"结束时间：",
						endDateCls:"dateYmd",
						btnTxt:"查询",
						btnType:"(none)",
						btnImg:"(none)",
						layout:"hbox",
						width:1160,
						startDateDeftSel:"today",
						endDateDeftSel:"today",
						contrastSze:"lt",
						queryBtnClick:"CreateCalendar_queryBtnClick",
						dateFormat:"Y-m-d",
						startDateOnchange:"CreateCalendar_startDateOnchange",
						listeners:{
							queryBtnClick:CreateCalendar_queryBtnClick,
							startDateOnchange:CreateCalendar_startDateOnchange
						}
					},
					{
						xtype:"grid",
						id:"MyGrid",
						title:"Grid Panel",
						loadMask:true,
						hideHeaders:false,
						header:false,
						height:299,
						beforerender:"MyGrid_beforerender",
						width:1150,
						cls:"vmd-grid",
						listeners:{
							beforerender:MyGrid_beforerender
						},
						columns:[
							{
								xtype:"gridcolumn",
								header:"序号",
								sortable:true,
								resizable:true,
								dataIndex:"xh",
								width:80,
								align:"center",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"姓名",
								sortable:true,
								resizable:true,
								dataIndex:"name",
								width:190,
								align:"center",
								css:"text-align: left !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"小组",
								sortable:true,
								resizable:true,
								dataIndex:"teme",
								width:135,
								align:"center",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"任务数",
								sortable:true,
								resizable:true,
								dataIndex:"rws",
								width:120,
								align:"center",
								css:"text-align: right !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"未开始",
								sortable:true,
								resizable:true,
								dataIndex:"wks",
								width:100,
								align:"center",
								css:"text-align: right !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"进行中",
								sortable:true,
								resizable:true,
								dataIndex:"jxz",
								width:100,
								align:"center",
								css:"text-align: right !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"待审核",
								sortable:true,
								resizable:true,
								dataIndex:"dsh",
								width:100,
								align:"center",
								css:"text-align: right !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"正常完成",
								sortable:true,
								resizable:true,
								dataIndex:"zcwc",
								width:100,
								align:"center",
								css:"text-align: right !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"超时",
								sortable:true,
								resizable:true,
								dataIndex:"cs",
								width:100,
								align:"center",
								css:"text-align: right !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"异常",
								sortable:true,
								resizable:true,
								dataIndex:"yc",
								width:103,
								align:"center",
								css:"text-align: right !important;",
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.PerTaskMon");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.PerTaskMon");
	}
})