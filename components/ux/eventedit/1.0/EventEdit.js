Ext.define("vmd.ux.EventEdit" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.EventEdit",
	title:"Panel",
	header:false,
	border:false,
	width:1400,
	height:700,
	layout:"border",
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
			var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['name', 'id', 'pID']
});
var data = [{
    name: '内核功能',
    id: '0',
    pID: ''
}, {
    name: '报表操作',
    id: 'F1',
    pID: '0'
}, {
    name: '脚本',
    id: 'F2',
    pID: '0'
}, {
    name: 'CellEditRefresh(刷新控制单元格是否可以编辑)',
    id: 'func1',
    pID: 'F1'
}, {
    name: 'CellsValueRefresh(刷新单元格值)',
    id: 'func2',
    pID: 'F1'
}, {
    name: 'CellVisibleRefresh(刷新控制单元格是否可见)',
    id: 'func3',
    pID: 'F1'
}, {
    name: 'ColsRefresh(刷新列)',
    id: 'func4',
    pID: 'F1'
}, {
    name: 'DataSetSRefresh(刷新数据集)',
    id: 'func5',
    pID: 'F1'
}, {
    name: 'MakeSql(设置sql语句)',
    id: 'func6',
    pID: 'F1'
}, {
    name: 'ReadExcelFile(导入excel)',
    id: 'func7',
    pID: 'F1'
}, {
    name: 'ReportRefresh(刷新报表)',
    id: 'func8',
    pID: 'F1'
}, {
    name: 'RowsRefresh(刷新行)',
    id: 'func9',
    pID: 'F1'
}, {
    name: 'SaveTableEvent(保存表)',
    id: 'func10',
    pID: 'F1'
}, {
    name: 'SetParams(参数配置)',
    id: 'func11',
    pID: 'F1'
}, {
    name: 'SubReportEvent(打开模块)',
    id: 'func12',
    pID: 'F1'
}, {
    name: 'WindowClose(关闭窗体)',
    id: 'func13',
    pID: 'F1'
}, {
    name: 'JavaScript(JavaScript)',
    id: 'func14',
    pID: 'F2'
}];
store.loadData(data);
////////////////////////////////////////////////////////////////////////////////

function tree_beforerender(sender) {
    
    tree.store = store;
    tree.valueField = "id"
    tree.textField = "name"
    tree.parentField = "pID"
    tree.rootValue = "0"
}

function tree_nodeDblClick(sender, node, e) {
    
    MyAce.setValue(MyAce.getValue() + node.attributes.text)
}

			this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:700,
				x:0,
				y:0,
				layout:"fit",
				region:"west",
				split:true,
				collapseMode:"mini",
				items:[
					{
						xtype:"vmd.treeex",
						id:"tree",
						width:208,
						height:270,
						hideRoot:false,
						beforerender:"tree_beforerender",
						rootValue:"0",
						rootText:"内核功能",
						loadType:"全部加载",
						nodeDblClick:"tree_nodeDblClick",
						leafImg:"/img/public/圆点.png",
						listeners:{
							beforerender:tree_beforerender,
							nodeDblClick:tree_nodeDblClick
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"div1",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:496,
				height:700,
				x:1100,
				y:0,
				region:"center",
				split:true,
				collapseMode:"mini",
				layout:"anchor",
				items:[
					{
						xtype:"vmd.ace",
						id:"MyAce",
						height:300,
						width:600,
						language:"javascript",
						anchor:"100% 100%"
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"div2",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:350,
				height:50,
				region:"east",
				split:true,
				collapseMode:"mini"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getCode= function(){
return MyAce.getValue()
	}
		this.setCode= function(code){
MyAce.setValue(MyAce.getValue() + code)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.EventEdit");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.EventEdit");
	}
})