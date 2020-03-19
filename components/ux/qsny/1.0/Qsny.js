Ext.define("vmd.ux.Qsny" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Qsny",
	title:"Panel",
	header:false,
	border:false,
	width:400,
	height:40,
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
			var checkdate = function() {
    var qsny = hwDate.getValue(true);
    var zzny = hwDate1.getValue(true);

    if(qsny && zzny) {
        if(qsny > zzny) {
            vmd.alert('提示', '起始年月不能大于终止年月')
            hwDate.setValue(zzny);
        }

    }

}

function hwDate_select(sender, date) {
    checkdate();
}

function hwDate1_select(sender, date) {
    checkdate();
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
				layout:"hbox",
				items:[
					{
						xtype:"label",
						id:"label",
						text:"起始年月:"
					},
					{
						xtype:"datefield",
						id:"hwDate",
						format:"Y-m",
						showToday:true,
						allowBlank:true,
						select:"hwDate_select",
						listeners:{
							select:hwDate_select
						}
					},
					{
						xtype:"label",
						id:"label1",
						text:"——"
					},
					{
						xtype:"datefield",
						id:"hwDate1",
						format:"Y-m",
						showToday:true,
						allowBlank:true,
						select:"hwDate1_select",
						listeners:{
							select:hwDate1_select
						}
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getKsny= function(){
//直接填写方法内容

return hwDate.getValue(true);
	}
		this.getJsny= function(){
//直接填写方法内容

return hwDate1.getValue(true);
	}
		this.setTime= function(kssj,jssj){
hwDate.setValue(kssj)
hwDate1.setValue(jssj)
	}
		this.changeFormat= function(style){
//直接填写方法内容
if(style) {
    hwDate.format = style
    hwDate1.format = style
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Qsny");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Qsny");
	}
})