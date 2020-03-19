Ext.define("vmd.ux.test567" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	xtype:"vmd.ux.test567",
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:350,
	layout:"absolute",
	btntext:"button",
	initComponent: function(){
		
			this.items=[
			{
				xtype:"vmd.button",
				id:"button",
				text:this.btntext,
				type:"(none)",
				size:"small",
				x:50,
				y:30,
				height:30
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
			this.setText= function(a){
//直接填写方法内容
button.setText(a)
	}
}
})