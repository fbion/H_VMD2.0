Ext.define("vmd.ux.Filter" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Filter",
	title:"Panel",
	header:false,
	border:false,
	width:800,
	height:500,
	layout:"border",
	initComponent: function(){
		function resetCmpScope() {
                    var cmpList = me._reloadCmpList;
                    Ext.each(cmpList, function (name) {
                        var cmpObj = eval(name);
                        cmpObj && (cmpObj._beforeRender = function (_cmp) {
                            var id = vmd.core.getCmpId(_cmp);
                            id&&eval(id + "= _cmp")
                        })
                    })
                }
			function report_afterrender(render) {
    report.query();
}

function setInfo(data1, data2) {
    Alternate.value = data1;
    selected.value = data2;
}
			this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				layoutConfig:{
					align:"center",
					pack:"center"
				},
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:200,
				height:50,
				x:100,
				y:70,
				region:"center",
				layout:"vbox",
				items:[
					{
						xtype:"vmd.button",
						id:"button",
						text:"--》",
						type:"(none)",
						size:"small",
						margins:"0 0 20 0 "
					},
					{
						xtype:"vmd.button",
						id:"button1",
						text:">",
						type:"(none)",
						size:"small",
						margins:"0 0 20 0 "
					},
					{
						xtype:"vmd.button",
						id:"button2",
						text:"<",
						type:"(none)",
						size:"small",
						margins:"0 0 20 0 "
					},
					{
						xtype:"vmd.button",
						id:"button3",
						text:"《--",
						type:"(none)",
						size:"small"
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"div1",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:350,
				height:50,
				x:160,
				y:150,
				region:"west",
				layout:"fit",
				items:[
					{
						xtype:"vmd.dataview",
						id:"Alternate",
						width:350,
						height:270,
						itemSelector:"li.info",
						overClass:"info-hover",
						selectedClass:"x-view-selected",
						singleSelect:true,
						multiSelect:true,
						autoScroll:true,
						tpl:"<ul>    <tpl for=\".\">        <li class=\"info\" style=\"float:left;padding:8px 17px;margin:5px;text-align:center; line-height: 1.25em;  color: #333;height: 113px; width: 112px; overflow: hidden;border-top: 1px solid transparent;cursor: pointer;\">            <h4>{name}</h4>        </li>    </tpl></ul>"
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"div2",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:350,
				height:50,
				x:210,
				y:250,
				region:"east",
				layout:"fit",
				items:[
					{
						xtype:"vmd.dataview",
						id:"selected",
						width:350,
						height:270,
						itemSelector:"li.info",
						overClass:"info-hover",
						selectedClass:"x-view-selected",
						singleSelect:true,
						multiSelect:true,
						autoScroll:true,
						tpl:"<ul>    <tpl for=\".\">        <li class=\"info\" style=\"float:left;padding:8px 17px;margin:5px;text-align:center; line-height: 1.25em;  color: #333;height: 113px; width: 112px; overflow: hidden;border-top: 1px solid transparent;cursor: pointer;\">            <h4>{name}</h4>        </li>    </tpl></ul>"
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setInfo= function(data1,data2){
//直接填写方法内容
setInfo(data1,data2)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Filter");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Filter");
	}
})