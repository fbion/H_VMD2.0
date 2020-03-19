Ext.define("vmd.ux.TestBtn" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.TestBtn",
	title:"Panel",
	header:false,
	border:false,
	width:691,
	height:485,
	layout:"absolute",
	text:"button",
	initComponent: function(){
		var self=this;

function button_click(sender){

 self.fireEvent('btnclick',sender)
}
			this.items=[
			{
				xtype:"vmd.button",
				id:"button",
				text:this.text,
				type:"(none)",
				size:"large",
				x:140,
				y:130,
				click:"button_click",
				listeners:{
					click:button_click
				},
				cls:this.cls,
				style:this.style
			},
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:110,
				height:50,
				x:130,
				y:30,
				html:"这是一个测试的demo"
			},
			{
				xtype:"vmd.img",
				id:"hwImg",
				width:200,
				height:200,
				x:180,
				y:230,
				src:this.img
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
			this.setText= function(a){
//直接填写方法内容
button.setText(a)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.TestBtn");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.TestBtn");
	}
})