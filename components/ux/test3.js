Ext.define("vmd.ux.test3" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.test","vmd.ux.test2"]),
	xtype:"vmd.ux.test3",
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:85,
	layout:"absolute",
	initComponent: function(){
		
			this.items=[
			{
				xtype:"vmd.ux.test",
				id:"test",
				x:0,
				y:0
			},
			{
				xtype:"vmd.ux.test2",
				id:"test2",
				x:290,
				y:0
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
	}
})