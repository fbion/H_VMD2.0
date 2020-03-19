Ext.define("vmd.ux.EventEditer" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.EventEditer",
	title:"Panel",
	header:false,
	border:false,
	width:1400,
	height:700,
	layout:"border",
	afterrender:"EventEditer_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.EventEditer_afterrender(this)
}
	},
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
    // 
    tree.store = store;
    tree.valueField = "id"
    tree.textField = "name"
    tree.parentField = "pID"
    tree.rootValue = "0"
}

//<trigger triggerFunc="edit" Cells="B1,C1,D1" IsEditable="1" />
var ff1 = "//edit(cells,flag)\n//cells:单元格id (B2,C3);\n//flag:是否可编辑（1：可编辑；0：不可编辑)\nedit()"
//<trigger triggerFunc="fillcells" Cells="C2,E2,D4" />
var ff2 = "//fillcells(Cells)\n//Celss:单元格id（B2,C1);\nfillcells()"
//<trigger triggerFunc="visible" Cells="C2,D2" IsVisible="1" />
var ff3 = "//visible(Cells,IsVisible)\n//Cells:单元格id （C1,D1);\n//IsVisible:是否可见(1:可见；2:不可见)\nvisible()"
/*<trigger triggerFunc="makesql" sql="select a from b where a&gt;1">
                <paramlist>
                  <param name="a" type="Byte" value="0" />
                </paramlist>
              </trigger>*/
var ff6 = "//makesql(sql,param)\n//sql:SQL语句 \"select a from b where a& gt; 1\"\n //param:属性 包含name变量名，type类型，value值\n//类型包括 Binary、Byte、Boolean、Currency、Int32、Int64、Single、Double、VarNumeric、String、Date、DateTime、DateTime2、DateTimeOffset\nmakesql()";
// <trigger triggerFunc="freshrows" Rows="6,11,9,7,5,2,1" rowHeight="666" />
var ff9 = "//freshrows(Rows,Height)\n//Rows:行id (1,3,4);\n//Height:行高\nfreshrows()"
// <trigger triggerFunc="submitdb" />
var ff10 = "//submitdb()\nsubmitdb()"
// <trigger triggerFunc="setparams">
//     <params>
//       <var id="0" name="aaaaaaaaa" value="bbbbbbbbbb" description="" type="report" />
//       <var id="0" name="cccccccccc" value="dddddddddd" description="" type="report" />
//     </params>
// </trigger>
var ff11 = "//setparams(params)\n//params包含 id、name、value、description、type\nsetparams()"
//<trigger triggerFunc="windowclose" />
var ff13 = "//windowclose()\nwindowclose()"
//<trigger triggerFunc="javascript" javascript="ZnVuY3Rpb24oKXsNCgkvL215IGphdmFzY3JpcHQgaW5mbw0KfQ==" linkarea="A1:K6" />
var ff14 = "//javascript(javascript,linkarea)\n//javascript JS脚本 linkarea：关联区域 示例\"A1:K6\"\njavascript()"


function tree_nodeDblClick(sender, node, e) {
    if(MyAce.getValue() == "") {
        switch (node.attributes.id) {
            case "func1":
                MyAce.setValue(ff1);
                break;
            case "func2":
                MyAce.setValue(ff2);
                break;
            case "func3":
                MyAce.setValue(ff3);
                break;
            case "func4":
                MyAce.setValue(ff4);
                break;
            case "func5":
                MyAce.setValue(ff5);
                break;
            case "func6":
                MyAce.setValue(ff6);
                break;
            case "func7":
                MyAce.setValue(ff7);
                break;
            case "func8":
                MyAce.setValue(ff8);
                break;
            case "func9":
                MyAce.setValue(ff9);
                break;
            case "func10":
                MyAce.setValue(ff10);
                break;
            case "func11":
                MyAce.setValue(ff11);
                break;
            case "func12":
                MyAce.setValue(ff12);
                break;
            case "func13":
                MyAce.setValue(ff13);
                break;
            case "func14":
                MyAce.setValue(ff14);
                break;

        }
    } else {
        switch (node.attributes.id) {
            case "func1":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff1);
                break;
            case "func2":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff2);
                break;
            case "func3":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff3);
                break;
            case "func4":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff4);
                break;
            case "func5":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff5);
                break;
            case "func6":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff6);
                break;
            case "func7":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff7);
                break;
            case "func8":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff8);
                break;
            case "func9":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff9);
                break;
            case "func10":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff10);
                break;
            case "func11":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff11);
                break;
            case "func12":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff12);
                break;
            case "func13":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff13);
                break;
            case "func14":
                MyAce.setValue(MyAce.getValue() + '\n\n' + ff14);
                break;
        }
    }
}



function EventEditer_afterrender(sender) {

}
			this.EventEditer_afterrender=EventEditer_afterrender;
		this.items=[
			{
				xtype:"panel",
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
				xtype:"panel",
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
				xtype:"panel",
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
	Ext.util.CSS.removeStyleSheet("vmd.ux.EventEditer");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.EventEditer");
	}
})