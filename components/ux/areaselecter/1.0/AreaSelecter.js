Ext.define("vmd.ux.AreaSelecter" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.AreaSelecter",
	title:"Panel",
	header:false,
	border:false,
	width:481,
	height:397,
	layout:"absolute",
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
			function label_afterrender(sender){
label.setValue("选择省份")
}
			this.items=[
			{
				xtype:"vmd.combo",
				id:"combo",
				width:150,
				x:0,
				y:30
			},
			{
				xtype:"label",
				id:"label",
				x:40,
				y:20,
				afterrender:"label_afterrender",
				listeners:{
					vmdafterrender:label_afterrender
				}
			},
			{
				xtype:"panel",
				id:"panel",
				title:"Panel",
				header:false,
				border:true,
				height:340,
				x:-1,
				y:60,
				hidden:false,
				width:480,
				items:[
					{
						xtype:"tabpanel",
						id:"MyTabs",
						activeTab:0,
						height:150,
						width:480,
						items:[
							{
								xtype:"panel",
								id:"panel1",
								title:"Tab1",
								header:true,
								border:true,
								height:531,
								width:861
							},
							{
								xtype:"panel",
								id:"panel2",
								title:"Tab2",
								header:true,
								border:true,
								height:100
							},
							{
								xtype:"panel",
								id:"panel3",
								title:"Tab3",
								header:true,
								border:true,
								height:100
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.AreaSelecter");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AreaSelecter");
	}
})