Ext.define("vmd.ux.TestBtn3mafei" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.TestBtn$1.0$TestBtn"]),
	version:"1.0",
	xtype:"vmd.ux.TestBtn3mafei",
	title:"Panel",
	header:false,
	border:false,
	width:1057,
	height:529,
	layout:"absolute",
	afterrender:"TestBtn3mafei_afterrender",
	initComponent: function(){
		function TestBtn_afterrender(sender){

}

function TestBtn3mafei_afterrender(sender){

}

function hwDataView_afterrender(sender){

}
			this.items=[
			{
				xtype:"vmd.ux.TestBtn",
				id:"TestBtn",
				text:"button",
				img:"/design/images/pic200.png",
				x:0,
				y:20,
				width:580,
				height:370,
				afterrender:"TestBtn_afterrender"
			},
			{
				xtype:"vmd.dataview",
				id:"hwDataView",
				width:350,
				height:270,
				itemSelector:"li.info",
				overClass:"info-hover",
				selectedClass:"x-view-selected",
				singleSelect:true,
				multiSelect:true,
				autoScroll:true,
				tpl:"<ul><tpl for=\".\"><li class=\"info\" style=\"float:left;padding:8px 17px;margin:5px;text-align:center; line-height: 1.25em;  color: #333;height: 113px; width: 112px; overflow: hidden;border-top: 1px solid transparent;cursor: pointer;\"><img  src=\"/system/img/dataview/layout/{picname}\" /><h4>{desc}</h4></li></tpl></ul>",
				data:"var data=[{\"id\":1,\"picname\":\"border-layout.gif\",\"name\":\"Border Layout\",\"desc\":\"方位布局\"},{\"id\":2,\"picname\":\"layout-accordion.gif\",\"name\":\"Accordion Layout\",\"desc\":\"手风琴布局\"},{\"id\":3,\"picname\":\"layout-anchor.gif\",\"name\":\"Accordion Layout\",\"desc\":\"百分比布局\"},{\"id\":4,\"picname\":\"layout-form.gif\",\"name\":\"Absolute Layout\",\"desc\":\"绝对定位布局\"},{\"id\":5,\"picname\":\"layout-column.gif\",\"name\":\"Column Layout\",\"desc\":\"列布局\"},{\"id\":6,\"picname\":\"layout-table.gif\",\"name\":\"Table Layout\",\"desc\":\"表格布局\"}];return data;",
				x:650,
				y:60,
				afterrender:"hwDataView_afterrender"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		Ext.util.CSS.removeStyleSheet("vmd.ux.TestBtn3mafei");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.TestBtn3mafei");
			me.on('afterrender',function(){ TestBtn3mafei_afterrender(me)})
		me.TestBtn.on('afterrender',function(){ TestBtn_afterrender(me.TestBtn)})
		me.hwDataView.on('afterrender',function(){ hwDataView_afterrender(me.hwDataView)})
}
})