Ext.define("vmd.ux.TestBtn12" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.TestBtn12",
	title:"Panel",
	header:false,
	border:false,
	width:691,
	height:485,
	layout:"absolute",
	afterrender:"TestBtn12_afterrender",
	beforerender:"TestBtn12_beforerender",
	text:"button",
	initComponent: function(){
		var self=this;

function button_click(sender){

 self.fireEvent('btnclick',sender)
}

function TestBtn12_afterrender(sender){
    
//alert('1')
}

function hwImg_afterrender(sender){
    
//alert('2')
}

function div_afterrender(sender){
//alert('21')
}

function TestBtn12_beforerender(sender){
//alert('0')
}

function button_afterrender(sender){

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
				afterrender:"button_afterrender",
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
				html:"这是一个测试的demo",
				afterrender:"div_afterrender"
			},
			{
				xtype:"vmd.img",
				id:"hwImg",
				width:200,
				height:200,
				x:320,
				y:90,
				afterrender:"hwImg_afterrender",
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
	Ext.util.CSS.removeStyleSheet("vmd.ux.TestBtn12");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.TestBtn12");
			me.on('beforerender',function(){ TestBtn12_beforerender(me)})
		me.on('vmdafterrender',function(){ TestBtn12_afterrender(me)})
		me.button.on('vmdafterrender',function(){ button_afterrender(me.button)})
		me.div.on('vmdafterrender',function(){ div_afterrender(me.div)})
		me.hwImg.on('vmdafterrender',function(){ hwImg_afterrender(me.hwImg)})
}
})