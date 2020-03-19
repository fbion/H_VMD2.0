Ext.define("vmd.ux.MyComptest" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	xtype:"vmd.ux.MyComptest",
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:350,
	layout:"absolute",
	initComponent: function(){
		
			this.items=[
			{
				xtype:"vmd.img",
				id:"hwImg",
				width:200,
				height:200,
				x:110,
				y:90,
				src:"icon-barcode"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
	}
})