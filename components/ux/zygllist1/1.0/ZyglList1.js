Ext.define("vmd.ux.ZyglList1" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ZyglList1",
	title:"Panel",
	header:false,
	border:false,
	width:504,
	height:472,
	layout:"fit",
	initComponent: function(){
		
			this.items=[
			{
				xtype:"vmd.dataview",
				id:"hwDataView",
				width:631,
				height:540,
				itemSelector:"li.info",
				overClass:"info-hover",
				selectedClass:"x-view-selected",
				singleSelect:true,
				multiSelect:true,
				autoScroll:true,
				tpl:"<ul><tpl for=\".\"><li class=\"info\" style=\"float:left;padding:8px 17px;margin:5px;text-align:center; line-height: 1.25em;  color: #333;height: 113px; width: 112px; overflow: hidden;border-top: 1px solid transparent;cursor: pointer;\"><img  src=\"/system/img/dataview/layout/{picname}\" /><h4>{desc}</h4></li></tpl></ul>",
				data:"var data=[{\"id\":1,\"picname\":\"border-layout.gif\",\"name\":\"Border Layout\",\"desc\":\"方位布局\"},{\"id\":2,\"picname\":\"layout-accordion.gif\",\"name\":\"Accordion Layout\",\"desc\":\"手风琴布局\"},{\"id\":3,\"picname\":\"layout-anchor.gif\",\"name\":\"Accordion Layout\",\"desc\":\"百分比布局\"},{\"id\":4,\"picname\":\"layout-form.gif\",\"name\":\"Absolute Layout\",\"desc\":\"绝对定位布局\"},{\"id\":5,\"picname\":\"layout-column.gif\",\"name\":\"Column Layout\",\"desc\":\"列布局\"},{\"id\":6,\"picname\":\"layout-table.gif\",\"name\":\"Table Layout\",\"desc\":\"表格布局\"}];return data;"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
	}
})