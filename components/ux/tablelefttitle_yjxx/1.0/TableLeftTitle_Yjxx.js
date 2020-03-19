Ext.define("vmd.ux.TableLeftTitle_Yjxx" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.TableLeftTitle_Yjxx",
	title:"Panel",
	header:false,
	border:false,
	width:860,
	layout:"fit",
	autoHeight:true,
	uxCss:".hand a{   text-decoration:none; }.hand a:link {    color: blue; text-decoration:none;    }.hand a:active:{    color: red;    } a:visited {    color:purple;text-decoration:none;    } .hand a:hover {    color: red; text-decoration:underline;    } .x-grid3-hd-row td {    line-height: 15px;    vertical-align: middle;    border-left: 0px solid;     border-right: 0px solid;     border: 1px solid #e4e4e4;}.x-grid3-scroller {    overflow-x: hidden;}/* =========================================== Grid Panel =========================================== *//* 表格左右间距 */.vmd-grid {        padding-left: 0px;    padding-right: 0px;}/* 表格线样式兼容 */.vmd-grid table {    border-collapse: collapse;}/* 表头背景色 */.vmd-grid .x-grid3-header {    background-color: #f7f7f7;}/* 表头鼠标悬停背景色 */.vmd-grid .x-grid3-hd-over .x-grid3-hd-inner {    background-color: #f7f7f7;}/* 表头错位兼容 */.vmd-grid .x-grid3-header-offset {    padding: 0;}/* 表头单元格 */.vmd-grid .x-grid3-header td {    border: 1px solid #e3e2e8;    font-size: 14px;}/* 表体单元格 */.vmd-grid .x-grid3-body td {    border: 1px solid #e3e2e8;    border-top-width: 0;    padding: 0;    font-size: 14px;}/* 表体行 */.vmd-grid .x-grid3-row {    border: none;}/* 表体行鼠标悬停背景色 */.vmd-grid .x-grid3-row-over {    background-color: white;}/* 表体行选中背景色 */.vmd-grid .x-grid3-row-selected {    background-color: #F5F7FC !important;}/* =========================================== Grid Panel =========================================== */",
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
    fields: ["xh","ygjxxid", "ygjmc", "ygjsj", "csmc", "ygjnr", "op"]
});
var ptServer = {
    ip: '192.168.1.180:6602',
    callcode: 'snyjcz',
    //userInfo: 'platform/v1/UserManage', //用户信息服务
    dsurl: 'XXHTS/monitor/warninghandle/handle/warninginfo'
};
//var dwdm = '';

function MyGrid_beforerender(sender) {
    this.store = store3;
}

//获取用户信息
// function loginInfo() {
//     var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
//     var url = ptServer.userInfo;
//     hwDao.get(url, {}, {}, function(res) {
//         if(res.data[0].size > 0) {
//             dwdm = res.data[0].datas[0].dwdm;
//             loadData(dwdm);
//         } else {
//             loadData(dwdm);
//         }
//     }, function() {}); /*成功回调函数*/
// }

function panel_afterrender(sender) {
   // loginInfo();
   loadData();
}

//加载用户数据
function loadData(dwcode) {
    var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
    var url = ptServer.dsurl;
    hwDao.get(url, {}, "", function(res) {
        if(res.isSucceed) {
            if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                for(var i = 0; i < data.length; i++) {
                    var itemObj = {
                        xh: i + 1,
                        ygjxxid: i + 1,
                       // dwdm: data[i].dwdm,
                        ygjmc: data[i].warning_obj,
                        ygjsj: data[i].warning_date,
                        csmc: data[i].warning_event,
                        ygjnr:data[i].warning_content,
                        op: "<a href='#' class='hand'>历史处置</a>"
                       
                    }
                    dbrwDateList.push(itemObj);
                }
            }
            
            store3.loadData(dbrwDateList);
            gridSpan(MyGrid,"row","[title]",'');
           
            
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
        grid.height= count2*31+29;
        var aa = panel.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[0].id;
        vmd("#" + aa + "").append("<div style='font-size:14px;font-weight:bold;margin-top:50%;'><span>预警信息</span></div>");
        vmd("#" + aa + "").css({
        "height": (count2*31+29)+3,
       // "line-height":(count2+1)*30+6,
         "background-color": "#f7f7f7",
         "text-align": "center",
         "margin-top":"1px"
        
    });
    } else {
        count1 = grid.getStore().getCount();
        count2 = grid.getColumnModel().getColumnCount();
    }
    
    
    
    
//     for(i = 0; i < count1; i++){
//         if(rowOrCol == "row"){
//             var curColName = grid.getColumnModel().getDataIndex(i);
//             var curCol = "[" + curColName + "]";
//             if(cols.indexOf(curCol) < 0)
//             continue;
//         }
//         preValue = undefined;
//         firstSameCell = 0;
//         array1[i] = new Array();
//         for(j = 0; j < count2; j++){
//             if(rowOrCol == "row"){
//                 index1 = j;
//                 index2 = i;
//             } else {
//                 index1 = i;
//                 index2 = j;
//             }
//             var colName = grid.getColumnModel().getDataIndex(index2);
//             if(sepCol && colName == sepCol)
//             arraySep[index1] = allRecs[index1].get(sepCol);
//             var seqOldValue = seqCurValue = "1";
//             if(sepCol && index1 > 0){
//                 seqOldValue = arraySep[index1 - 1];
//                 seqCurValue = arraySep[index1];
//             }
             
//             if(allRecs[index1].get(colName) == preValue && (colName == sepCol || seqOldValue == seqCurValue)){
// //                 alert(colName + "======" + seqOldValue + "======" + seqCurValue);
//                  allRecs[index1].set(colName, "");
//                  array1[i].push(j);
//                  if(j == count2 - 1){
//                      var index = firstSameCell + Math.round((j + 1 - firstSameCell) / 2 - 1);
//                      if(rowOrCol == "row"){
//                          allRecs[index].set(colName, preValue);
//                       } else {
//                           allRecs[index1].set(grid.getColumnModel().getColumnId(index), preValue);
//                       }
//                   }
//               } else {
//                   if(j != 0){
//                       var index = firstSameCell + Math.round((j + 1 - firstSameCell) / 2 - 1);
//                       if(rowOrCol == "row"){
//                           allRecs[index].set(colName, preValue);
//                       } else {
//                           allRecs[index1].set(grid.getColumnModel().getColumnId(index), preValue);
//                     }
//                   }
//               firstSameCell = j;
//               preValue = allRecs[index1].get(colName);
//               allRecs[index1].set(colName, "");
//               if(j == count2 - 1){
//                   allRecs[index1].set(colName, preValue);
//               }
//           }
//         }
        
//     }
  //  grid.getStore().commitChanges();
    //添加所有分隔线
    // var rCount = grid.getStore().getCount();
    // for(i = 0; i < rCount; i ++){
    //     for(j = 0; j < grid.getColumnModel().getColumnCount(); j ++){
    //           aRow = grid.getView().getCell(i,j);
    //          if(i == 0){
    //              aRow.style.borderTop = "none";
    //              aRow.style.borderLeft = "1px solid #ccc";
    //          }else if(i == rCount - 1){
    //              aRow.style.borderTop = "1px solid #ccc";
    //              aRow.style.borderLeft = "1px solid #ccc";
    //             aRow.style.borderBottom = "1px solid #ccc";
    //          }else{
    //              aRow.style.borderTop = "1px solid #ccc";
    //              aRow.style.borderLeft = "1px solid #ccc";
    //          }
    //          if(j == grid.getColumnModel().getColumnCount()-1)
    //              aRow.style.borderRight = "1px solid #ccc";
    //         if(i == rCount-1)     
    //          aRow.style.borderBottom = "1px solid #ccc";
    //       }
    //   }
      //去除合并的单元格的分隔线
     // debugger
    //   for(i = 0; i < array1.length; i++){
    //       if(!Ext.isEmpty(array1[i])){
    //           for(j = 0; j < array1[i].length; j++){
    //               if(rowOrCol == "row"){
    //                   aRow = grid.getView().getCell(array1[i][j],i);
    //                   aRow.style.borderBottom = "none";
    //               } else {
    //                   aRow = grid.getView().getCell(i, array1[i][j]);
    //                   aRow.style.borderTop = "none";
    //               }
    //           }
    //       }
    //   }
}


function div_beforerender(sender){

}
			this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"预警信息通用报表",
				header:false,
				border:true,
				height:300,
				width:770,
				afterrender:"panel_afterrender",
				layout:"hbox",
				autoHeight:false,
				listeners:{
					vmdafterrender:panel_afterrender
				},
				items:[
					{
						xtype:"vmd.div",
						id:"div_l",
						autoEl:"div",
						border:true,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"center center",
						width:80,
						height:50,
						layout:"auto"
					},
					{
						xtype:"grid",
						id:"MyGrid",
						title:"Grid Panel",
						loadMask:true,
						hideHeaders:false,
						header:false,
						border:true,
						height:300,
						width:762,
						beforerender:"MyGrid_beforerender",
						cls:"vmd-grid",
						listeners:{
							beforerender:MyGrid_beforerender
						},
						columns:[
							{
								xtype:"gridcolumn",
								header:"序号",
								sortable:true,
								resizable:false,
								dataIndex:"xh",
								width:100,
								align:"center",
								fixed:true,
								menuDisabled:false
							},
							{
								xtype:"gridcolumn",
								header:"预告警信息id",
								sortable:true,
								resizable:true,
								dataIndex:"ygjxxid",
								width:100,
								align:"center",
								hidden:true,
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"预告警对象",
								sortable:true,
								resizable:false,
								dataIndex:"ygjmc",
								width:200,
								align:"center",
								menuDisabled:true,
								css:"text-align: left !important;",
								hidden:false
							},
							{
								xtype:"gridcolumn",
								header:"预告警时间",
								sortable:true,
								resizable:true,
								dataIndex:"ygjsj",
								width:150,
								align:"center",
								menuDisabled:true,
								css:"text-align: center !important;"
							},
							{
								xtype:"gridcolumn",
								header:"参数名称",
								sortable:true,
								resizable:true,
								dataIndex:"csmc",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: left !important;"
							},
							{
								xtype:"gridcolumn",
								header:"预告警内容",
								sortable:true,
								resizable:true,
								dataIndex:"ygjnr",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: left !important;"
							},
							{
								xtype:"gridcolumn",
								header:"历史处置",
								sortable:true,
								resizable:true,
								dataIndex:"op",
								width:100,
								align:"center",
								menuDisabled:true,
								css:"text-align: center !important;"
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.TableLeftTitle_Yjxx");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TableLeftTitle_Yjxx");
	}
})