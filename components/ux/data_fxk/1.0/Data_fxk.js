Ext.define("vmd.ux.Data_fxk" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Data_fxk",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:621,
	layout:"absolute",
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
    fxk_typeSetting.store = store;
    fxk_typeSetting.displayField = "name"
    fxk_typeSetting.valueField = "id"
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
    fxk_dataSet.store = store1;
    fxk_dataSet.displayField = "name"
    fxk_dataSet.valueField = "id"
}

function saveFiled_afterrender(sender) {
    fxk_saveFiled.store = store2;
    fxk_saveFiled.displayField = "name"
    fxk_saveFiled.valueField = "id"
}

function myDisplayFiled_afterrender(sender) {
    fxk_myDisplayFiled.store = store3;
    fxk_myDisplayFiled.displayField = "name"
    fxk_myDisplayFiled.valueField = "id"
}
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
				id:"fxk_dataSet",
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
				id:"fxk_saveFiled",
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
				id:"fxk_myDisplayFiled",
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
				id:"fxk_dropDownDisplayColumn",
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
				id:"fxk_filterCondition",
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
				id:"fxk_typeSetting",
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
if(att=="fxk_typeSetting"){
    temp = fxk_typeSetting.getValue()
}else if(att=="fxk_dataSet"){
    temp = fxk_dataSet.getValue()
}else if(att=="fxk_saveFiled"){
    temp = fxk_saveFiled.getValue()
}else if(att=="fxk_myDisplayFiled"){
    temp = fxk_myDisplayFiled.getValue()
}else if(att=="fxk_dropDownDisplayColumn"){
    temp = fxk_dropDownDisplayColumn.getValue()
}else if(att=="fxk_filterCondition"){
    temp = fxk_filterCondition.getValue()
}
return temp;
	}
		this.setInfo= function(info,cell){
if(info){
    
    fxk_typeSetting.setValue(info.fxk_typeSetting.value);
    fxk_dataSet.setValue(info.fxk_dataSet.value);
    fxk_saveFiled.setValue(info.fxk_saveFiled.value);
    fxk_myDisplayFiled.setValue(info.fxk_myDisplayFiled.value);
    fxk_dropDownDisplayColumn.setValue(info.fxk_dropDownDisplayColumn.value);
    fxk_filterCondition.setValue(info.fxk_filterCondition.value)
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Data_fxk");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Data_fxk");
	}
})