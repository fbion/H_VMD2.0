Ext.define("vmd.ux.Teat458" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Teat458",
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:350,
	layout:"absolute",
	initComponent: function(){
		function button1_click(sender,e){
    
this.ownerCt.fireEvent('btnclick', sender,e);
}
			this.items=[
			{
				xtype:"vmd.button",
				id:"button",
				text:"button",
				type:"(none)",
				size:"small",
				x:70,
				y:90
			},
			{
				xtype:"vmd.button",
				id:"button1",
				text:"button",
				type:"(none)",
				size:"small",
				x:190,
				y:90,
				click:"button1_click",
				listeners:{
					click:button1_click
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
	}
})