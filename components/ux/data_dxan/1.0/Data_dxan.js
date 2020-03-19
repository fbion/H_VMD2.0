Ext.define("vmd.ux.Data_dxan" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Data_dxan",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:621,
	layout:"absolute",
	afterrender:"Data_dxan_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.Data_dxan_afterrender(this)
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
    fields: ['name', 'id']
});
var data = [{
    name: '数据查询',
    id: '0'
}, {
    name: '自定义',
    id: '1'
}];
store.loadData(data);

function typeSetting_afterrender(sender) {
    dxan_typeSetting.store = store;
    dxan_typeSetting.displayField = "name"
    dxan_typeSetting.valueField = "id"
}
/////////////////////////////////////////////////////
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['name', 'id']
});
var data1 = [{
    name: '数据查询',
    id: '0'
}, {
    name: '自定义',
    id: '1'
}];
store1.loadData(data1);
/////////////////////////////////////////////////////
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['name', 'id']
});
var data2 = [{
    name: '数据查询',
    id: '0'
}, {
    name: '自定义',
    id: '1'
}];
store2.loadData(data2);
/////////////////////////////////////////////////////
var store3 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['name', 'id']
});
var data3 = [{
    name: '数据查询',
    id: '0'
}, {
    name: '自定义',
    id: '1'
}];
store3.loadData(data3);
/////////////////////////////////////////////////////

function dataSet_afterrender(sender) {
    dxan_dataSet.store = store1;
    dxan_dataSet.displayField = "name"
    dxan_dataSet.valueField = "id"
}

function saveFiled_afterrender(sender) {
    dxan_saveFiled.store = store2;
    dxan_saveFiled.displayField = "name"
    dxan_saveFiled.valueField = "id"
}

function myDisplayFiled_afterrender(sender) {
    dxan_myDisplayFiled.store = store3;
    dxan_myDisplayFiled.displayField = "name"
    dxan_myDisplayFiled.valueField = "id"
}

function Data_dxan_afterrender(sender) {

}
			this.Data_dxan_afterrender=Data_dxan_afterrender;
		this.items=[
			{
				xtype:"label",
				id:"label",
				text:"类型设置：",
				x:10,
				y:15
			},
			{
				xtype:"label",
				id:"label1",
				text:"数据集：",
				x:20,
				y:50
			},
			{
				xtype:"vmd.comlist",
				id:"dxan_dataSet",
				width:200,
				height:270,
				x:70,
				y:45,
				style:"border: 1px solid #dddddd",
				afterrender:"dataSet_afterrender",
				listeners:{
					vmdafterrender:dataSet_afterrender
				}
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"...",
				type:"(none)",
				size:"small",
				x:270,
				y:45,
				width:28,
				height:24
			},
			{
				xtype:"label",
				id:"label2",
				text:"保存字段：",
				x:10,
				y:85
			},
			{
				xtype:"vmd.comlist",
				id:"dxan_saveFiled",
				width:200,
				height:270,
				x:70,
				y:80,
				style:"border: 1px solid #dddddd",
				afterrender:"saveFiled_afterrender",
				listeners:{
					vmdafterrender:saveFiled_afterrender
				}
			},
			{
				xtype:"label",
				id:"label3",
				text:"显示字段：",
				x:10,
				y:120
			},
			{
				xtype:"vmd.comlist",
				id:"dxan_myDisplayFiled",
				width:200,
				height:270,
				x:70,
				y:115,
				style:"border: 1px solid #dddddd",
				afterrender:"myDisplayFiled_afterrender",
				listeners:{
					vmdafterrender:myDisplayFiled_afterrender
				}
			},
			{
				xtype:"label",
				id:"label4",
				text:"下拉显示列：",
				x:0,
				y:155
			},
			{
				xtype:"textfield",
				id:"dxan_dropDownDisplayColumn",
				allowBlank:true,
				x:70,
				y:150,
				width:183,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.button",
				id:"button1",
				text:"...",
				type:"(none)",
				size:"small",
				x:270,
				y:150,
				width:28,
				height:24
			},
			{
				xtype:"label",
				id:"label5",
				text:"过滤条件：",
				x:10,
				y:190
			},
			{
				xtype:"textfield",
				id:"dxan_filterCondition",
				allowBlank:true,
				x:70,
				y:185,
				width:183,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.button",
				id:"button2",
				text:"...",
				type:"(none)",
				size:"small",
				x:270,
				y:185,
				width:28,
				height:24
			},
			{
				xtype:"vmd.comlist",
				id:"dxan_typeSetting",
				width:200,
				height:270,
				x:70,
				y:10,
				style:"border: 1px solid #dddddd",
				afterrender:"typeSetting_afterrender",
				listeners:{
					vmdafterrender:typeSetting_afterrender
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getInfo= function(att){
var temp;
if(att=="dxan_typeSetting"){
    temp = dxan_typeSetting.getValue()
}else if(att=="dxan_dataSet"){
    temp = dxan_dataSet.getValue()
}else if(att=="dxan_saveFiled"){
    temp = dxan_saveFiled.getValue()
}else if(att=="dxan_myDisplayFiled"){
    temp = dxan_myDisplayFiled.getValue()
}else if(att=="dxan_dropDownDisplayColumn"){
    temp = dxan_dropDownDisplayColumn.getValue()
}else if(att=="dxan_filterCondition"){
    temp = dxan_filterCondition.getValue()
}
return temp;
	}
		this.setInfo= function(info,cell){
if(info){
    
    dxan_typeSetting.setValue(info.dxan_typeSetting.value);
    dxan_dataSet.setValue(info.dxan_dataSet.value);
    dxan_saveFiled.setValue(info.dxan_saveFiled.value);
    dxan_myDisplayFiled.setValue(info.dxan_myDisplayFiled.value);
    dxan_dropDownDisplayColumn.setValue(info.dxan_dropDownDisplayColumn.value);
    dxan_filterCondition.setValue(info.dxan_filterCondition.value)
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Data_dxan");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Data_dxan");
	}
})