Ext.define("vmd.ux.test" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.test",
	title:"Panel",
	header:false,
	border:false,
	width:470,
	height:70,
	layout:"fit",
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
				xtype:"vmd.div",
				id:"div",
				layoutConfig:{
					align:"middle",
					pack:"center"
				},
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:434,
				height:50,
				layout:"hbox",
				html:"<label style=\"float:left\">时间：</label>",
				items:[
					{
						xtype:"datefield",
						id:"hwDate",
						format:"Y-m-d",
						showToday:true,
						allowBlank:true,
						style:"float: left;"
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.test");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.test");
	}
})