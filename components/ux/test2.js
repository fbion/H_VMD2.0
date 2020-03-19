Ext.define("vmd.ux.test2" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	xtype:"vmd.ux.test2",
	title:"Panel",
	header:false,
	border:false,
	width:397,
	height:67,
	layout:"absolute",
	initComponent: function(){
		function button_click(sender){
alert(hwDate.getValue(true))
}
			this.items=[
			{
				xtype:"datefield",
				id:"hwDate",
				format:"Y-m-d",
				showToday:true,
				allowBlank:true,
				x:10,
				y:30
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"获取值",
				type:"(none)",
				size:"small",
				x:150,
				y:30,
				click:"button_click",
				listeners:{
					click:button_click
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
	}
})