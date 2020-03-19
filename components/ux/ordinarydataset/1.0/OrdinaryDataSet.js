Ext.define("vmd.ux.OrdinaryDataSet" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.OrdinaryDataSet",
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
    typeSetting.store = store;
    typeSetting.displayField = "name"
    typeSetting.valueField = "id"
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
				id:"dataSet",
				width:200,
				height:270,
				x:70,
				y:45,
				style:"border: 1px solid #dddddd"
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
				id:"saveFiled",
				width:200,
				height:270,
				x:70,
				y:80,
				style:"border: 1px solid #dddddd"
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
				id:"myDisplayFiled",
				width:200,
				height:270,
				x:70,
				y:115,
				style:"border: 1px solid #dddddd"
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
				id:"dropDownDisplayColumn",
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
				id:"filterCondition",
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
				id:"typeSetting",
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
if(att=="typeSetting"){
    temp = typeSetting.getValue()
}else if(att=="dataSet"){
    temp = dataSet.getValue()
}else if(att=="saveFiled"){
    temp = saveFiled.getValue()
}else if(att=="myDisplayFiled"){
    temp = myDisplayFiled.getValue()
}else if(att=="dropDownDisplayColumn"){
    temp = dropDownDisplayColumn.getValue()
}else if(att=="filterCondition"){
    temp = filterCondition.getValue()
}
return temp;
	}
		this.setInfo= function(info,cell){
if(info){
    typeSetting.setValue(info.typeSetting.value);
    dataSet.setValue(info.dataSet.value);
    saveFiled.setValue(info.saveFiled.value);
    myDisplayFiled.setValue(info.myDisplayFiled.value);
    dropDownDisplayColumn.setValue(info.dropDownDisplayColumn.value);
    filterCondition.setValue(info.filterCondition.value)
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.OrdinaryDataSet");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.OrdinaryDataSet");
	}
})