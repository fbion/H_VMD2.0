Ext.define("vmd.ux.DateTime" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.DateTime",
	title:"Panel",
	header:false,
	border:false,
	width:401,
	height:54,
	layout:"fit",
	date1:"Y-m-d",
	date2:"Y-m-d",
	btnhide:false,
	rq1label:"时间",
	rq1label2:"至",
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
			var page=this;

function _getjsrq(){
    
    alert()
}

function button_click(sender,e){


 page.fireEvent('btclick',button,hwDate.getValue(),hwDate1.getValue())
 
}
			this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				layoutConfig:{
					align:"middle",
					pack:"center"
				},
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:50,
				x:120,
				y:70,
				layout:"hbox",
				items:[
					{
						xtype:"label",
						id:"label",
						text:this.rq1label
					},
					{
						xtype:"datefield",
						id:"hwDate",
						format:this.date1,
						showToday:true,
						allowBlank:true,
						defaultValue:"today",
						margins:"0 0 0 10"
					},
					{
						xtype:"label",
						id:"label1",
						text:this.rq1label2,
						margins:"0 0 0 10"
					},
					{
						xtype:"datefield",
						id:"hwDate1",
						format:this.date2,
						showToday:true,
						allowBlank:true,
						defaultValue:"today",
						margins:"0 0 0 10"
					},
					{
						xtype:"vmd.button",
						id:"button",
						text:"查询",
						type:"(none)",
						size:"small",
						margins:"0 0 0 10",
						click:"button_click",
						hidden:this.btnhide,
						listeners:{
							click:button_click
						}
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getksrq= function(){
//直接填写方法内容

return hwDate.getValue(true);
	}
		this.getjsrq= function(){
//直接填写方法内容

_getjsrq()
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.DateTime");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.DateTime");
	}
})