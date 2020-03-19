Ext.define("vmd.ux.Yqcombo" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Yqcombo",
	title:"Panel",
	header:false,
	border:false,
	width:300,
	height:36,
	layout:"fit",
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
    fields: ['id', 'name']
});
var page = this;
var data = [{
    id: '',
    name: '全部'
}, {
    id: '胜利西部',
    name: '胜利西部'
}, {
    id: '分公司采油厂主体',
    name: '分公司采油厂主体'
}, {
    id: '胜利油公司',
    name: '胜利油公司'
}, {
    id: '合作油',
    name: '合作油'
}, {
    id: '清河采油厂',
    name: '清河采油厂'
}, {
    id: '胜利其它',
    name: '胜利其它'
}]

store.loadData(data);


function combo_beforerender(sender) {
    combo.displayField = 'name';
    combo.store = store;
    combo.valueField = 'id';
}

function combo_change(sender) {
    page.fireEvent('change', combo)
}
			this.items=[
			{
				xtype:"vmd.combo",
				id:"combo",
				width:375,
				beforerender:"combo_beforerender",
				Multi:true,
				change:"combo_change",
				listeners:{
					beforerender:combo_beforerender,
					change:combo_change
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getValue= function(){
//直接填写方法内容

return combo.getValue();
	}
		this.setValue= function(val){
    //直接填写方法内容
    combo.setValue(val);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Yqcombo");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Yqcombo");
	}
})