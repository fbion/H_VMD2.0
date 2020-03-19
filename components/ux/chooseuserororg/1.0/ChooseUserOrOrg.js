Ext.define("vmd.ux.ChooseUserOrOrg" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.SelectorComponent1$1.0$SelectorComponent1","vmd.ux.SelectorComponent$1.0$SelectorComponent"]),
	version:"1.0",
	xtype:"vmd.ux.ChooseUserOrOrg",
	title:"Panel",
	header:false,
	border:false,
	width:750,
	height:495,
	layout:"fit",
	autoHeight:false,
	tab1Text:"Tab1",
	tab2Text:"Tab2",
	tab3Text:"Tab3",
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
			
			this.items=[
			{
				xtype:"tabpanel",
				id:"MyTabs",
				activeTab:2,
				height:150,
				width:500,
				x:50,
				y:60,
				items:[
					{
						xtype:"panel",
						id:"panel",
						title:this.tab1Text,
						header:true,
						border:true,
						height:100,
						width:620,
						hidden:this.tab1Hide
					},
					{
						xtype:"panel",
						id:"panel1",
						title:this.tab2Text,
						header:true,
						border:true,
						height:100,
						items:[
							{
								xtype:"vmd.ux.SelectorComponent1",
								id:"SelectorComponent1",
								layoutConfig:{
									align:"center",
									pack:"start"
								},
								wxText:"xccxcx",
								yxText:"Panel",
								layout:"vbox"
							}
						],
						hidden:this.tab2Hide
					},
					{
						xtype:"panel",
						id:"panel2",
						title:this.tab3Text,
						header:true,
						border:true,
						height:100,
						items:[
							{
								xtype:"vmd.ux.SelectorComponent",
								id:"SelectorComponent",
								layoutConfig:{
									align:"center",
									pack:"start"
								},
								wxText:"xccxcx",
								yxText:"Panel",
								layout:"vbox"
							}
						],
						hidden:this.tab3Hide
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.ChooseUserOrOrg");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ChooseUserOrOrg");
	}
})