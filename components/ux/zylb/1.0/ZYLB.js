Ext.define("vmd.ux.ZYLB" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ZYLB",
	layoutConfig:{
		align:"middle",
		pack:"center"
	},
	title:"Panel",
	header:false,
	border:false,
	width:204,
	height:34,
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
			
			this.items=[
			{
				xtype:"label",
				id:"label",
				text:"作业类别:"
			},
			{
				xtype:"vmd.combo",
				id:"combo",
				width:150
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.ZYLB");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.ZYLB");
	}
})