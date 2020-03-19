Ext.define("vmd.ux.test" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	xtype:"vmd.ux.test",
	title:"Panel",
	header:false,
	border:false,
	width:289,
	height:70,
	layout:"absolute",
	btntext:"button",
	btn2text:"button",
	initComponent: function(){
		var me=this;
function button_click(sender) {

    button1.setText('test' + new Date().getSeconds())
    
    //添加按钮1的回调事件
    me.fireEvent('btnclick',sender,sender.text);
}

function button1_click(sender) {
    button.setText('hahahha' + new Date().getSeconds())
    
    //添加 按钮2的回调事件
    me.fireEvent('btn2click',sender,sender.text);
}
			this.items=[
			{
				xtype:"vmd.button",
				id:"button",
				text:this.btntext,
				type:"(none)",
				size:"small",
				x:50,
				y:20,
				click:"button_click",
				height:30,
				listeners:{
					click:button_click
				},
				icon:this.btnIcon
			},
			{
				xtype:"vmd.button",
				id:"button1",
				text:this.btn2text,
				type:"(none)",
				size:"small",
				x:140,
				y:20,
				click:"button1_click",
				listeners:{
					click:button1_click
				},
				icon:this.btn2Icon
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
			this.getText= function(sender,text){
//填写方法内容
return button.text
	}
		this.getText2= function(){
return button1.text
	}
		this.setText= function(text){
button.setText(text) 
	}
		this.setText2= function(text){
//测试给按钮2赋值
button1.setText(text) 
//给按钮2也赋值
button.setText(text) 
	}
}
})