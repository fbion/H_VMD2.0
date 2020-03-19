Ext.define("vmd.ux.ProjectModule" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ProjectModule",
	title:"Panel",
	header:false,
	border:false,
	width:266,
	height:596,
	layout:"fit",
	initComponent: function(){
		
			this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"Panel",
				header:false,
				border:true,
				height:100,
				layout:"absolute",
				items:[
					{
						xtype:"vmd.button",
						id:"button",
						text:"我的工区",
						type:"text",
						size:"small",
						x:0,
						y:0,
						style:"text-align: left;",
						width:50
					},
					{
						xtype:"label",
						id:"label",
						text:"--",
						x:50,
						y:3
					},
					{
						xtype:"vmd.comlist",
						id:"comlistProject",
						width:200,
						height:270,
						x:62,
						y:0
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		Ext.util.CSS.removeStyleSheet("vmd.ux.ProjectModule");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.ProjectModule");
	}
})