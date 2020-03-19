Ext.define("vmd.ux.DetailsofUnits" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.DetailsofUnits",
	title:"Panel",
	header:false,
	border:false,
	width:1160,
	height:350,
	layout:"fit",
	uxCss:".hand a{   text-decoration:none; }.hand a:link {    color: blue; text-decoration:none;    }.hand a:active:{    color: red;    } a:visited {    color:purple;text-decoration:none;    } .hand a:hover {    color: red; text-decoration:underline;    } .x-grid3-hd-row td {    line-height: 15px;    vertical-align: middle;    border-left: 0px solid;     border-right: 0px solid;     border: 1px solid #e4e4e4;}.x-grid3-scroller {    overflow-x: hidden;}/* =========================================== Grid Panel =========================================== *//* 表格左右间距 */.vmd-grid {    padding-left: 5px;    padding-right: 5px;}/* 表格线样式兼容 */.vmd-grid table {    border-collapse: collapse;}/* 表头背景色 */.vmd-grid .x-grid3-header {    background-color: #f7f7f7;}/* 表头鼠标悬停背景色 */.vmd-grid .x-grid3-hd-over .x-grid3-hd-inner {    background-color: #f7f7f7;}/* 表头错位兼容 */.vmd-grid .x-grid3-header-offset {    padding: 0;}/* 表头单元格 */.vmd-grid .x-grid3-header td {    border: 1px solid #e3e2e8;    font-size: 14px;}/* 表体单元格 */.vmd-grid .x-grid3-body td {    border: 1px solid #e3e2e8;    border-top-width: 0;    padding: 0;    font-size: 14px;}/* 表体行 */.vmd-grid .x-grid3-row {    border: none;}/* 表体行鼠标悬停背景色 */.vmd-grid .x-grid3-row-over {    background-color: white;}/* 表体行选中背景色 */.vmd-grid .x-grid3-row-selected {    background-color: #F5F7FC !important;}/* =========================================== Grid Panel =========================================== */",
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
var store3 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["id", "xh", "dwdm", "dwmc", "rwdm", "rwlx", "zs", "wks", "jxz", "zcwc", "cswc", "cs", "yc"]
});
var ptServer = {
    ip: '192.168.1.180:6602',
    callcode: 'snqtscdd',
    userInfo: 'platform/v1/UserManage', //用户信息服务
    orgschecount: 'XXHTS/schedule/taskmanager/workbench/orgschecount'
};
var dwdm = '';

function MyGrid_beforerender(sender) {
    this.store = store3;
}

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
    loginInfo();
}

//加载用户数据
function loadData(dwcode) {
    var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
    var url = ptServer.orgschecount;
    hwDao.get(url, {}, {
        dwdm: ''
    }, function(res) {
        if(res.isSucceed) {
            if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                for(var i = 0; i < data.length; i++) {
                    var itemObj = {
                        xh: i + 1,
                        id: i + 1,
                        dwdm: data[i].dwdm,
                        dwmc: data[i].dwmc,
                        rwdm: data[i].sched_type_code,
                        rwlx: data[i].sched_type_name,
                        zs: "<a href='#' class='hand'>" + data[i].zs + "</a>",
                        wks: data[i].wks,
                        jxz: data[i].jxz,
                        zcwc: data[i].zcwc,
                        cswc: data[i].cswc,
                        cs: data[i].cs,
                        yc: data[i].yc
                    }
                    dbrwDateList.push(itemObj);
                }
            }
            
            store3.loadData(dbrwDateList);
            gridSpan(MyGrid,"row","[dwmc]",'');
        } else {
            alert(res.errMsg);
        }
    }, function(res) {
        alert(res);
    });
}

function gridSpan(grid, rowOrCol, cols, sepCol){
    var array1 = new Array();
    var arraySep = new Array();
    var count1 = 0;
    var count2 = 0;
    var index1 = 0;
    var index2 = 0;
    var aRow = undefined;
    var preValue = undefined;
    var firstSameCell = 0;
    var allRecs = grid.getStore().getRange();
    if(rowOrCol == "row"){
        count1 = grid.getColumnModel().getColumnCount();
        count2 = grid.getStore().getCount();
    } else {
        count1 = grid.getStore().getCount();
        count2 = grid.getColumnModel().getColumnCount();
    }
    for(i = 1; i < count1; i++){
        if(rowOrCol == "row"){
            var curColName = grid.getColumnModel().getDataIndex(i);
            var curCol = "[" + curColName + "]";
            if(cols.indexOf(curCol) < 0)
            continue;
        }
        preValue = undefined;
        firstSameCell = 0;
        array1[i] = new Array();
        for(j = 0; j < count2; j++){
            if(rowOrCol == "row"){
                index1 = j;
                index2 = i;
            } else {
                index1 = i;
                index2 = j;
            }
            var colName = grid.getColumnModel().getDataIndex(index2);
            if(sepCol && colName == sepCol)
            arraySep[index1] = allRecs[index1].get(sepCol);
            var seqOldValue = seqCurValue = "1";
            if(sepCol && index1 > 0){
                seqOldValue = arraySep[index1 - 1];
                seqCurValue = arraySep[index1];
            }
             
            if(allRecs[index1].get(colName) == preValue && (colName == sepCol || seqOldValue == seqCurValue)){
//                 alert(colName + "======" + seqOldValue + "======" + seqCurValue);
                 allRecs[index1].set(colName, "");
                 array1[i].push(j);
                 if(j == count2 - 1){
                     var index = firstSameCell + Math.round((j + 1 - firstSameCell) / 2 - 1);
                     if(rowOrCol == "row"){
                         allRecs[index].set(colName, preValue);
                       } else {
                           allRecs[index1].set(grid.getColumnModel().getColumnId(index), preValue);
                       }
                   }
               } else {
                   if(j != 0){
                       var index = firstSameCell + Math.round((j + 1 - firstSameCell) / 2 - 1);
                       if(rowOrCol == "row"){
                           allRecs[index].set(colName, preValue);
                       } else {
                           allRecs[index1].set(grid.getColumnModel().getColumnId(index), preValue);
                    }
                   }
               firstSameCell = j;
               preValue = allRecs[index1].get(colName);
               allRecs[index1].set(colName, "");
               if(j == count2 - 1){
                   allRecs[index1].set(colName, preValue);
               }
           }
        }
    }
    grid.getStore().commitChanges();
    /*//添加所有分隔线
    var rCount = grid.getStore().getCount();
    for(i = 0; i < rCount; i ++){
        for(j = 0; j < grid.getColumnModel().getColumnCount(); j ++){
               aRow = grid.getView().getCell(i,j);
             if(i == 0){
                 aRow.style.borderTop = "none";
                 aRow.style.borderLeft = "1px solid #ccc";
             }else if(i == rCount - 1){
                 aRow.style.borderTop = "1px solid #ccc";
                 aRow.style.borderLeft = "1px solid #ccc";
                aRow.style.borderBottom = "1px solid #ccc";
             }else{
                 aRow.style.borderTop = "1px solid #ccc";
                 aRow.style.borderLeft = "1px solid #ccc";
             }
             if(j == grid.getColumnModel().getColumnCount()-1)
                 aRow.style.borderRight = "1px solid #ccc";
            if(i == rCount-1)     
             aRow.style.borderBottom = "1px solid #ccc";
           }
       }*/
       //去除合并的单元格的分隔线
       for(i = 0; i < array1.length; i++){
           if(!Ext.isEmpty(array1[i])){
               for(j = 0; j < array1[i].length; j++){
                   if(rowOrCol == "row"){
                       aRow = grid.getView().getCell(array1[i][j],i);
                       aRow.style.borderBottom = "none";
                   } else {
                       aRow = grid.getView().getCell(i, array1[i][j]);
                       aRow.style.borderTop = "none";
                   }
               }
           }
       }
}

			this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"各单位详细情况",
				header:true,
				border:true,
				height:350,
				width:1150,
				afterrender:"panel_afterrender",
				padding:"5",
				layout:"fit",
				listeners:{
					vmdafterrender:panel_afterrender
				},
				items:[
					{
						xtype:"grid",
						id:"MyGrid",
						title:"Grid Panel",
						loadMask:true,
						hideHeaders:false,
						header:false,
						border:true,
						height:330,
						width:1150,
						beforerender:"MyGrid_beforerender",
						cls:"vmd-grid",
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
								align:"center",
								hidden:true
							},
							{
								xtype:"gridcolumn",
								header:"序号",
								sortable:true,
								resizable:true,
								dataIndex:"xh",
								width:100,
								align:"center"
							},
							{
								xtype:"gridcolumn",
								header:"单位代码",
								sortable:true,
								resizable:true,
								dataIndex:"dwdm",
								width:230,
								align:"center",
								hidden:true,
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"单位",
								sortable:true,
								resizable:true,
								dataIndex:"dwmc",
								width:220,
								align:"center",
								menuDisabled:true,
								css:"text-align: left !important;",
								hidden:false
							},
							{
								xtype:"gridcolumn",
								header:"任务类型",
								sortable:true,
								resizable:true,
								dataIndex:"rwlx",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: left !important;"
							},
							{
								xtype:"gridcolumn",
								header:"任务计划总数",
								sortable:true,
								resizable:true,
								dataIndex:"zs",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: right !important;"
							},
							{
								xtype:"gridcolumn",
								header:"未开始",
								sortable:true,
								resizable:true,
								dataIndex:"wks",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: right !important;"
							},
							{
								xtype:"gridcolumn",
								header:"进行中",
								sortable:true,
								resizable:true,
								dataIndex:"jxz",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: right !important;"
							},
							{
								xtype:"gridcolumn",
								header:"正常完成",
								sortable:true,
								resizable:true,
								dataIndex:"zcwc",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: right !important;"
							},
							{
								xtype:"gridcolumn",
								header:"超时完成",
								sortable:true,
								resizable:true,
								dataIndex:"cswc",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: right !important;"
							},
							{
								xtype:"gridcolumn",
								header:"超时",
								sortable:true,
								resizable:true,
								dataIndex:"cs",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: right !important;"
							},
							{
								xtype:"gridcolumn",
								header:"异常",
								sortable:true,
								resizable:true,
								dataIndex:"yc",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: right !important;"
							}
						]
					}
				],
				input:this.config
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.DetailsofUnits");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DetailsofUnits");
	}
})