Ext.define("vmd.ux.rqjd" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	xtype:"vmd.ux.rqjd",
	title:"Panel",
	header:false,
	border:false,
	width:470,
	height:70,
	layout:"absolute",
	btnText:"查询",
	initComponent: function(){
		var my=this;
function button_click(sender){
var ksrq= Ext.util.Format.date(hwDate.getValue(),'Y-m-d');
var jsrq= Ext.util.Format.date(hwDate1.getValue(),'Y-m-d');
if(ksrq>jsrq)
{
     Ext.Msg.alert("提示", "开始日期不能大于结束日期", function() {})
     return
}

   my.fireEvent('btnClick',this)
}


			this.items=[
			{
				xtype:"datefield",
				id:"hwDate",
				format:"Y-m-d",
				showToday:true,
				allowBlank:true,
				x:100,
				y:30
			},
			{
				xtype:"label",
				id:"label",
				text:"开始日期：",
				x:40,
				y:35,
				cls:"aa"
			},
			{
				xtype:"label",
				id:"label1",
				text:"结束日期：",
				x:220,
				y:35,
				cls:"aa"
			},
			{
				xtype:"datefield",
				id:"hwDate1",
				format:"Y-m-d",
				showToday:true,
				allowBlank:true,
				x:280,
				y:30
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:this.btnText,
				type:"(none)",
				size:"small",
				x:400,
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