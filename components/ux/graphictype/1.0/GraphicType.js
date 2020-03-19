Ext.define("vmd.ux.GraphicType" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.GraphicType",
	title:"Panel",
	header:false,
	border:false,
	width:290,
	height:621,
	layout:"absolute",
	uxCss:".b{    border: 1px solid #dddddd}.noneBorder .x-form-text {    border: none;    border-bottom: none;}",
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
    fields: ['type', 'name']
});
var data = [{
    type: '0',
    name: '以图片方式显示'
}, {
    type: '1',
    name: '以链接方式显示'
}];
store.loadData(data);
////////////////////////////////////////////////////////////////////////////////
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['type', 'name']
});
var data1 = [{
    type: '0',
    name: '实际大小'
}, {
    type: '1',
    name: '拉伸'
}, {
    type: '2',
    name: '横向拉伸'
}, {
    type: '3',
    name: '纵向拉伸'
}];
store1.loadData(data1);
////////////////////////////////////////////////////////////////////////////////
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['type', 'name']
});
var data2 = [{
    type: '0',
    name: 'OCX控件'
}, {
    type: '1',
    name: '服务器文件'
}, {
    type: '2',
    name: '数据库大字段'
}, {
    type: '3',
    name: '本地图片'
}, {
    type: '4',
    name: 'webChart'
}];
store2.loadData(data2);
///////////////////////////////////////////////////////////////////////////////

function displayMode_afterrender(sender) {
    tx_displayMode.store = store;
    tx_displayMode.displayField = "name"
    tx_displayMode.valueField = "type"
}

function picLayout_afterrender(sender) {
    tx_picLayout.store = store1;
    tx_picLayout.displayField = "name"
    tx_picLayout.valueField = "type"
}

function source_afterrender(sender) {
    tx_source.store = store2;
    tx_source.displayField = "name"
    tx_source.valueField = "type"
}

			this.items=[
			{
				xtype:"label",
				id:"label",
				text:"显示方式：",
				x:10,
				y:15
			},
			{
				xtype:"vmd.comlist",
				id:"tx_displayMode",
				width:180,
				height:270,
				x:70,
				y:10,
				afterrender:"displayMode_afterrender",
				cls:"b noneBorder",
				listeners:{
					vmdafterrender:displayMode_afterrender
				}
			},
			{
				xtype:"label",
				id:"label1",
				text:"图片布局：",
				x:10,
				y:55
			},
			{
				xtype:"label",
				id:"label2",
				text:"图片来源：",
				x:10,
				y:95
			},
			{
				xtype:"vmd.comlist",
				id:"tx_source",
				width:180,
				height:270,
				x:70,
				y:90,
				afterrender:"source_afterrender",
				cls:"b noneBorder",
				listeners:{
					vmdafterrender:source_afterrender
				}
			},
			{
				xtype:"label",
				id:"label3",
				text:"选择控件：",
				x:10,
				y:135
			},
			{
				xtype:"vmd.comlist",
				id:"tx_control",
				width:180,
				height:270,
				x:70,
				y:130,
				cls:"b noneBorder"
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"...",
				type:"(none)",
				size:"small",
				x:255,
				y:130,
				width:28,
				height:24
			},
			{
				xtype:"checkbox",
				id:"tx_excelExport",
				fieldLabel:"Checkbox",
				boxLabel:"导出到Excel",
				x:10,
				y:170
			},
			{
				xtype:"vmd.comlist",
				id:"tx_picLayout",
				width:180,
				height:270,
				x:70,
				y:50,
				afterrender:"picLayout_afterrender",
				cls:"b noneBorder",
				listeners:{
					vmdafterrender:picLayout_afterrender
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setInfo= function(info,cell){
//直接填写方法内容
if(info) {
    tx_displayMode.setValue(info.tx_displayMode.value);
    tx_picLayout.setValue(info.tx_picLayout.value);
    tx_source.setValue(info.tx_source.value);
    tx_control.setValue(info.tx_control.value)
    tx_excelExport.setValue(info.tx_excelExport.checked)
}
	}
		this.getInfo= function(att){
//直接填写方法内容
var temp;
if(att == "tx_displayMode") {
    temp = tx_displayMode.getValue()
} else if(att == "tx_picLayout") {
    temp = tx_picLayout.getValue()
} else if(att == "tx_source") {
    temp = tx_source.getValue()
} else if(att == "tx_control") {
    temp = tx_control.getValue()
} else if(att == "tx_excelExport") {
    temp = tx_excelExport.getValue()
}
return temp
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.GraphicType");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.GraphicType");
	}
})