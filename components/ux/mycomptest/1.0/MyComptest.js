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
				src:"/img/public/{2C5DDB4B-E28B-4CDC-B4E3-720EC8E2F343}.png"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
	}
})