Ext.define("vmd.ux.CbText" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.CbText",
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:350,
	layout:"absolute",
	initComponent: function(){
		
			this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:50,
				x:20,
				y:90
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		Ext.util.CSS.removeStyleSheet("vmd.ux.CbText");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.CbText");
	}
})