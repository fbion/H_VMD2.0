Ext.define("vmd.ux.Zjzscrbtj" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Zjzscrbtj",
	layoutConfig:{
		align:"middle",
		pack:"center"
	},
	title:"Panel",
	header:false,
	border:false,
	width:630,
	height:39,
	layout:"hbox",
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
			var comData1 = [{
    name: '采油厂1',
    id: '孤岛'
}, {
    name: '采油厂3',
    id: '胜利'
}, {
    name: '采油厂5',
    id: '孤东'
}]
var store1 = new vmd.data.Store({
    data: comData1,
    fields: ['id', 'name']
})
var comData2 = [{
    name: '中区84',
    id: '中一区馆4',
    dw: '孤岛'
}, {
    name: '中区先导',
    id: '中一区馆3先导',
    dw: '孤岛'
}, {
    name: '西区4复合驱',
    id: '西区复合驱',
    dw: '孤岛'
}]
var store2 = new vmd.data.Store({
    data: comData2,
    fields: ['id', 'name', 'dw']
})
var comData3 = [{
    name: 'GDF4-0',
    id: 'GDF4-0',
    xm: '中一区馆4'
}, {
    name: 'GDF2-1',
    id: 'GDF2-1',
    xm: '中一区馆4'
}, {
    name: 'GDF4-1',
    id: 'GDF4-1',
    xm: '中一区馆4'
}]
var store3 = new vmd.data.Store({
    data: comData3,
    fields: ['id', 'name','xm']
})

function combo_afterrender(sender) {

}

function combo_beforerender(sender){
combo.store=store1;
combo.valueField='id'
combo.displayField='name'
}

function combo1_beforerender(sender){
combo1.store=store2;
combo1.valueField='id'
combo1.displayField='name'
}

function combo2_beforerender(sender){
combo2.store=store3;
combo2.valueField='id'
combo2.displayField='name'
}

function combo_change(sender){
store2.filter('dw',combo.getValue()||'a')
combo1.setValue("");
store3.filter('xm',combo1.getValue()||'a')
combo2.setValue("");
}

function combo1_change(sender){
store3.filter('xm',combo1.getValue()||'a')
combo2.setValue("");
}
			this.items=[
			{
				xtype:"label",
				id:"label",
				text:"单位选择：",
				x:50,
				y:20
			},
			{
				xtype:"vmd.combo",
				id:"combo",
				width:150,
				x:110,
				y:10,
				afterrender:"combo_afterrender",
				beforerender:"combo_beforerender",
				change:"combo_change",
				listeners:{
					vmdafterrender:combo_afterrender,
					beforerender:combo_beforerender,
					change:combo_change
				}
			},
			{
				xtype:"label",
				id:"label1",
				text:"项目选择：",
				x:270,
				y:20,
				height:20
			},
			{
				xtype:"vmd.combo",
				id:"combo1",
				width:150,
				x:340,
				y:10,
				beforerender:"combo1_beforerender",
				change:"combo1_change",
				listeners:{
					beforerender:combo1_beforerender,
					change:combo1_change
				}
			},
			{
				xtype:"label",
				id:"label2",
				text:"站选择：",
				x:510,
				y:20
			},
			{
				xtype:"vmd.combo",
				id:"combo2",
				width:150,
				x:560,
				y:10,
				beforerender:"combo2_beforerender",
				Multi:true,
				listeners:{
					beforerender:combo2_beforerender
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getzjz= function(){
//直接填写方法内容
return combo2.getValue()
	}
		this.setDefaultValue= function(dwxz,xmxz,zxz){
if(dwxz) {
    combo.setValue(dwxz)
}
if(xmxz) {
    combo1.setValue(xmxz)
}
if(zxz) {
    combo2.setValue(zxz)
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Zjzscrbtj");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Zjzscrbtj");
	}
})