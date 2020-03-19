Ext.define("vmd.ux.DHJZDJK" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.DHJZDJK",
	title:"Panel",
	header:false,
	border:false,
	width:390,
	height:733,
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
			
			this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:390,
				height:30,
				x:0,
				y:-2,
				autoScroll:false,
				hideBorders:false,
				layout:"auto",
				items:[
					{
						xtype:"textfield",
						id:"hwText",
						allowBlank:true,
						width:273
					},
					{
						xtype:"vmd.button",
						id:"button",
						text:"检索",
						type:"(none)",
						size:"small"
					}
				]
			},
			{
				xtype:"tabpanel",
				id:"MyTabs",
				activeTab:1,
				height:700,
				width:390,
				x:0,
				y:30,
				items:[
					{
						xtype:"panel",
						id:"panel",
						title:"导航",
						header:true,
						border:true,
						height:100,
						items:[
							{
								xtype:"vmd.treeex",
								id:"tree",
								width:388,
								height:270,
								hideRoot:false,
								style:"height: 100%"
							}
						]
					},
					{
						xtype:"panel",
						id:"panel1",
						title:"重点监控",
						header:true,
						border:true,
						height:668,
						items:[
							{
								xtype:"vmd.treeex",
								id:"tree1",
								width:389,
								height:270,
								hideRoot:false,
								style:"height: 100%;width: 100%"
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.DHJZDJK");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.DHJZDJK");
	}
})