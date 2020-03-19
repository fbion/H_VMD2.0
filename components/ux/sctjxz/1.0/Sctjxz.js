Ext.define("vmd.ux.Sctjxz" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Sctjxz",
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
			var comData1 = [ {
    name: '采油厂1',
    id: '胜利'
},{
    name: '采油厂7',
    id: '孤岛'
}, {
    name: '采油厂5',
    id: '孤东'
}]
var store1 = new vmd.data.Store({
    data: comData1,
    fields: ['id', 'name']
})
var comData2 = [{
    name: '馆4区',
    id: '中一区馆4',
    dw: '孤岛'
}, {
    name: '中区先导',
    id: '中一区馆3先导',
    dw: '孤岛'
}, {
    name: '复合驱',
    id: '西区复合驱',
    dw: '孤岛'
}, {
    name: '扩大区',
    id: '胜一区1-3扩大区',
    dw: '胜利'
}, {
    name: '二区沙二83',
    id: '胜坨二区沙二83-85',
    dw: '胜利'
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
},{name:"ST1-1-45",id:"ST1-1-45",xm:"胜一区1-3扩大区"},
{name:"ST1-0-741",id:"ST1-0-741",xm:"胜一区1-3扩大区"},
{name:"ST1-0-76",id:"ST1-0-76",xm:"胜一区1-3扩大区"},
{name:"ST1-1-30",id:"ST1-1-30",xm:"胜一区1-3扩大区"},
{name:"ST1-0-771",id:"ST1-0-771",xm:"胜一区1-3扩大区"},
{name:"ST1-1-32",id:"ST1-1-32",xm:"胜一区1-3扩大区"},
{name:"ST1-0N84",id:"ST1-0N84",xm:"胜一区1-3扩大区"},
{name:"ST1-0X85",id:"ST1-0X85",xm:"胜一区1-3扩大区"},
{name:"ST1-1-10",id:"ST1-1-10",xm:"胜一区1-3扩大区"},
{name:"ST1-0-94",id:"ST1-0-94",xm:"胜一区1-3扩大区"},
{name:"ST1-0X751",id:"ST1-0X751",xm:"胜一区1-3扩大区"},
{name:"ST1-1-51",id:"ST1-1-51",xm:"胜一区1-3扩大区"}
]
var store3 = new vmd.data.Store({
    data: comData3,
    fields: ['id', 'name','xm']
})

function combo_afterrender(sender) {
combo.setValue('胜利')
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

function combo1_afterrender(sender){
combo1.setValue('胜一区1-3扩大区')
}

function combo2_afterrender(sender){

//combo2.setValue('ST1-0-7')
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
				afterrender:"combo1_afterrender",
				listeners:{
					beforerender:combo1_beforerender,
					change:combo1_change,
					vmdafterrender:combo1_afterrender
				}
			},
			{
				xtype:"label",
				id:"label2",
				text:"井号",
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
				afterrender:"combo2_afterrender",
				listeners:{
					beforerender:combo2_beforerender,
					vmdafterrender:combo2_afterrender
				},
				valueField:this.jhvalue,
				displayField:this.jhdis,
				store:this.jhstore
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getJh= function(){
//直接填写方法内容
return combo2.getValue()
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Sctjxz");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Sctjxz");
	}
})