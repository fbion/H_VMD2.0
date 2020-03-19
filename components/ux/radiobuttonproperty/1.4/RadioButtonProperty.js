Ext.define("vmd.ux.RadioButtonProperty" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.ValueChange_click_Event$1.0$ValueChange_click_Event","vmd.ux.Data_dxan$1.0$Data_dxan","vmd.ux.RadioButtonType$1.0$RadioButtonType"]),
	version:"1.4",
	xtype:"vmd.ux.RadioButtonProperty",
	title:"Panel",
	header:false,
	border:false,
	width:343,
	height:672,
	layout:"fit",
	afterrender:"RadioButtonProperty_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.RadioButtonProperty_afterrender(this)
}
	},
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
			var page = this;

function setInfo(info, cell) {
    page.cell = cell;
    page.info = info;
    var curTab = MyTabs.activeTab;
    switch (curTab.title) {
        case "属性":
            RadioButtonType.setInfo(info.cell_RadioButtonInfo[0], cell)
            break;
        case "数据":
            Data_dxan.setInfo(info.cell_data_dxanInfo[0], cell)
            break;
        case "事件":
            //
            break;
    }
}

function MyTabs_tabchange(sender, tab) {
    var info = page.info;
    var cell = page.cell;
    var curTab = tab;
    if(info) {
        switch (curTab.title) {
            case "属性":
                RadioButtonType.setInfo(info.Cell_RadioButtonInfo[0], cell)
                break;
            case "数据":
                Data_dxan.setInfo(info.cell_data_dxanInfo[0], cell)
                break;
            case "事件":
                //
                break;
        }
    }
}

function RadioButtonType_rbDecimalChanged(sender, value, describe) {
   page.fireEvent("RBPchange",sender,value)
}

function RadioButtonProperty_afterrender(sender) {

}
			this.RadioButtonProperty_afterrender=RadioButtonProperty_afterrender;
		this.items=[
			{
				xtype:"tabpanel",
				id:"MyTabs",
				activeTab:0,
				height:150,
				width:500,
				tabchange:"MyTabs_tabchange",
				listeners:{
					tabchange:MyTabs_tabchange
				},
				items:[
					{
						xtype:"panel",
						id:"panel",
						title:"属性",
						header:true,
						border:true,
						height:100,
						layout:"fit",
						items:[
							{
								xtype:"vmd.ux.RadioButtonType",
								id:"RadioButtonType",
								layout:"absolute",
								rbDecimalChanged:"RadioButtonType_rbDecimalChanged",
								listeners:{
									rbDecimalChanged:RadioButtonType_rbDecimalChanged
								}
							}
						]
					},
					{
						xtype:"panel",
						id:"panel1",
						title:"数据",
						header:true,
						border:true,
						height:100,
						layout:"fit",
						items:[
							{
								xtype:"vmd.ux.Data_dxan",
								id:"Data_dxan",
								layout:"absolute"
							}
						]
					},
					{
						xtype:"panel",
						id:"panel2",
						title:"事件",
						header:true,
						border:true,
						height:100,
						layout:"fit",
						items:[
							{
								xtype:"vmd.ux.ValueChange_click_Event",
								id:"ValueChange_click_Event",
								layout:"absolute"
							}
						]
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setInfo= function(info,cell){
setInfo(info,cell);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.RadioButtonProperty");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.RadioButtonProperty");
	}
})