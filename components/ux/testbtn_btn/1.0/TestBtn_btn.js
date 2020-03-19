Ext.define("vmd.ux.TestBtn_btn" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.TestBtn2$1.0$TestBtn2"]),
	version:"1.0",
	xtype:"vmd.ux.TestBtn_btn",
	title:"Panel",
	header:false,
	border:false,
	width:867,
	height:577,
	layout:"absolute",
	initComponent: function(){
		function TestBtn2_afterrender(sender){

}
			this.items=[
			{
				xtype:"vmd.ux.TestBtn2",
				id:"TestBtn2",
				x:0,
				y:10,
				width:810,
				height:480,
				afterrender:"TestBtn2_afterrender"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		Ext.util.CSS.removeStyleSheet("vmd.ux.TestBtn_btn");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.TestBtn_btn");
			me.TestBtn2.on('vmdafterrender',function(){ TestBtn2_afterrender(me.TestBtn2)})
}
})