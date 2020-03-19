Ext.define("vmd.ux.CustomOptions" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.CustomOptions",
	title:"Panel",
	header:false,
	border:false,
	width:383,
	height:26,
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
			
			this.items=[
			{
				xtype:"vmd.comlist",
				id:"comlist",
				width:350,
				height:270,
				x:0,
				y:0,
				region:"center"
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"...",
				type:"(none)",
				size:"small",
				x:350,
				y:0,
				style:"border:0;",
				region:"east"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.CustomOptions");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.CustomOptions");
	}
})