Ext.define("vmd.ux.Test9" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Test9",
	title:"Panel",
	header:false,
	border:false,
	width:620,
	height:232,
	layout:"absolute",
	uxCss:".aabb{        border:1px solid red;}",
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
				layoutConfig:{
					pack:"end",
					align:"stretch"
				},
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:50,
				anchor:"100% 100%",
				layout:"vbox",
				cls:"ccbb",
				items:[
					{
						xtype:"vmd.div",
						id:"div1",
						autoEl:"div",
						border:true,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:400,
						height:50,
						layout:"border",
						overCls:"aabb",
						items:[
							{
								xtype:"vmd.div",
								id:"div3",
								autoEl:"div",
								border:true,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:150,
								height:50,
								region:"east",
								items:[
									{
										xtype:"vmd.img",
										id:"hwImg",
										width:47,
										height:46,
										src:"/img/public/home.png"
									},
									{
										xtype:"vmd.img",
										id:"hwImg1",
										width:47,
										height:46,
										src:"/img/public/home.png"
									},
									{
										xtype:"vmd.img",
										id:"hwImg2",
										width:47,
										height:46,
										src:"/img/public/home.png"
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
								width:425,
								height:50,
								region:"center"
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.Test9");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.Test9");
	}
})