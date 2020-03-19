Ext.define("vmd.ux.ChartBorder" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.Number$1.0$Number","vmd.ux.ColorSelect$1.0$ColorSelect"]),
	version:"1.0",
	xtype:"vmd.ux.ChartBorder",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:710,
	layout:"border",
	padding:"10 0 0 0 ",
	uxCss:".in-text{    border: 1px solid #ddd;    margin-top:3px;    margin-right: 20px;}.bnt-text{    margin-top: 5px;    line-height: 8px;    margin-right: 3px;}.comlist-b{    border:1px solid #ddd;}.comlist-b input{    border:0;}.right-div{    float: right;    margin-right: 30px;}",
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

var opacityData = [{
    id: '1'
}, {
    id: '0.9'
}, {
    id: '0.8'
}, {
    id: '0.7'
}, {
    id: '0.6'
}, {
    id: '0.5'
}, {
    id: '0.4'
}, {
    id: '0.3'
}, {
    id: '0.2'
}, {
    id: '0.1'
}, {
    id: '0'
}]

// 图表区背景色
function tbBackgroundColor_colorchange(sender, selColor) {
    page.fireEvent("backColorChange", tbBackgroundColor, selColor)
}
// 图表区边框颜色
function tbborderColor_colorchange(sender, selColor) {
    page.fireEvent("borderColorChange", tbborderColor, selColor)
}
// 绘图区背景色
function htBackgroundColor_colorchange(sender, selColor) {
    page.fireEvent("plotBackColorChange", htBackgroundColor, selColor)
}
// 绘图区边框颜色色
function htBorderColor_colorchange(sender, selColor) {
    page.fireEvent("plotBorderColorChange", htBorderColor, selColor)
}

function htOpacity_afterrender(sender) {
    var store = new vmd.data.Store({
        data: opacityData,
        fields: ['id']
    })
    htOpacity.store = store;
    htOpacity.valueField = 'id';
    htOpacity.displayField = 'id';
}

function tbOpacity_afterrender(sender) {
    var store = new vmd.data.Store({
        data: opacityData,
        fields: ['id']
    })
    tbOpacity.store = store;
    tbOpacity.valueField = 'id';
    tbOpacity.displayField = 'id';
}
// 图表区边框宽度
function tbBroderHeight_szDecimalChanged(sender, value, describe) {
    page.fireEvent("tbBroderWidthChange", sender, value)
}
// 图表区边框圆角
function tbBorderRadius_szDecimalChanged(sender, value, describe) {
    page.fireEvent("tbBorderRadiusChange", sender, value)
}
// 绘图区区边框宽度
function htBorderHeight_szDecimalChanged(sender, value, describe) {
    page.fireEvent("htBroderWidthChange", sender, value)
}
// 绘图区区边框圆角
function htBorderRadius_szDecimalChanged(sender, value, describe) {
    page.fireEvent("htBorderRadiusChange", sender, value)
}
			this.items=[
			{
				xtype:"vmd.div",
				id:"div1",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:146,
				height:50,
				region:"center",
				items:[
					{
						xtype:"vmd.div",
						id:"div19",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						style:"margin-top: 10px;",
						items:[
							{
								xtype:"label",
								id:"label7",
								text:"图表区",
								x:8,
								y:0,
								width:60,
								style:"font-size:13px;    font-weight: bold;"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div6",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						items:[
							{
								xtype:"label",
								id:"label2",
								text:"背景色",
								x:20,
								y:0,
								width:70
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div10",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						items:[
							{
								xtype:"label",
								id:"label4",
								text:"透明度",
								x:20,
								y:3,
								width:80
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div22",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						items:[
							{
								xtype:"checkbox",
								id:"showTbBroder",
								fieldLabel:"Checkbox",
								boxLabel:"显示边框",
								x:20,
								y:2
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div26",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						style:"margin-top: 5px;",
						items:[
							{
								xtype:"label",
								id:"label9",
								text:"边框宽度",
								x:20,
								y:8,
								width:60
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div27",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						items:[
							{
								xtype:"label",
								id:"label10",
								text:"边框圆角",
								x:20,
								y:10,
								width:60
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div28",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						style:"margin-top: 5px;",
						items:[
							{
								xtype:"label",
								id:"label11",
								text:"边框颜色",
								x:20,
								y:8,
								width:60
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div52",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						style:"margin-top: 10px;",
						items:[
							{
								xtype:"label",
								id:"label12",
								text:"绘图区",
								x:8,
								y:0,
								width:60,
								style:"font-size: 13px;    font-weight: bold;"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div5",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						style:"margin-top: 5px;",
						items:[
							{
								xtype:"label",
								id:"label",
								text:"背景色",
								x:20,
								y:0,
								width:70
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div17",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						items:[
							{
								xtype:"label",
								id:"label1",
								text:"透明度",
								x:20,
								y:0,
								width:70
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div18",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						items:[
							{
								xtype:"checkbox",
								id:"showHtBorder",
								fieldLabel:"Checkbox",
								boxLabel:"显示边框",
								x:20,
								y:2
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div21",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						style:"margin-top: 3px;",
						items:[
							{
								xtype:"label",
								id:"label3",
								text:"边框宽度",
								x:20,
								y:8,
								width:60
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div25",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						disabled:true,
						hidden:true,
						items:[
							{
								xtype:"label",
								id:"label5",
								text:"边框圆角",
								x:20,
								y:10,
								width:60
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div29",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						style:"margin-top: 5px;",
						items:[
							{
								xtype:"label",
								id:"label6",
								text:"边框颜色",
								x:20,
								y:8,
								width:60
							}
						]
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:180,
				height:50,
				region:"east",
				items:[
					{
						xtype:"vmd.div",
						id:"div7",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"auto",
						y:5,
						style:"margin-top: 5px;",
						items:[
							{
								xtype:"vmd.div",
								id:"div14",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:146,
								height:30,
								layout:"fit",
								style:"float: right;    margin-right: 16px;"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div2",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:182,
						height:30,
						layout:"auto",
						y:5,
						style:"margin-top: 3px;",
						items:[
							{
								xtype:"vmd.div",
								id:"div3",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:142,
								height:30,
								layout:"fit",
								items:[
									{
										xtype:"vmd.ux.ColorSelect",
										id:"tbBackgroundColor",
										layout:"fit",
										width:143,
										height:28,
										colorchange:"tbBackgroundColor_colorchange",
										listeners:{
											colorchange:tbBackgroundColor_colorchange
										}
									}
								]
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div8",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:181,
						height:30,
						layout:"auto",
						y:5,
						items:[
							{
								xtype:"vmd.div",
								id:"div9",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:142,
								height:32,
								layout:"fit",
								items:[
									{
										xtype:"vmd.comlist",
										id:"tbOpacity",
										width:142,
										height:270,
										cls:"comlist-b",
										afterrender:"tbOpacity_afterrender",
										listeners:{
											vmdafterrender:tbOpacity_afterrender
										}
									}
								]
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div11",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:180,
						height:30,
						layout:"auto",
						y:5,
						style:"margin-top: 5px;"
					},
					{
						xtype:"panel",
						id:"tbBorder",
						title:"Panel",
						header:false,
						border:false,
						height:100,
						width:142,
						items:[
							{
								xtype:"vmd.div",
								id:"div23",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:182,
								height:30,
								layout:"auto",
								y:5,
								style:"margin-top: 3px;",
								items:[
									{
										xtype:"vmd.div",
										id:"div24",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:142,
										height:32,
										layout:"fit",
										items:[
											{
												xtype:"vmd.ux.Number",
												id:"tbBroderHeight",
												layout:"absolute",
												szDecimalChanged:"tbBroderHeight_szDecimalChanged",
												listeners:{
													szDecimalChanged:tbBroderHeight_szDecimalChanged
												}
											}
										]
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"div12",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:179,
								height:30,
								layout:"auto",
								y:5,
								style:"margin-top: 3px;",
								items:[
									{
										xtype:"vmd.div",
										id:"div13",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:142,
										height:32,
										layout:"fit",
										items:[
											{
												xtype:"vmd.ux.Number",
												id:"tbBorderRadius",
												layout:"absolute",
												style:"margin-top: -2px;",
												szDecimalChanged:"tbBorderRadius_szDecimalChanged",
												listeners:{
													szDecimalChanged:tbBorderRadius_szDecimalChanged
												}
											}
										]
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"div15",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:179,
								height:30,
								layout:"auto",
								y:5,
								style:"margin-top: 3px;",
								items:[
									{
										xtype:"vmd.div",
										id:"div16",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:142,
										height:30,
										layout:"fit",
										items:[
											{
												xtype:"vmd.ux.ColorSelect",
												id:"tbborderColor",
												layout:"fit",
												colorchange:"tbborderColor_colorchange",
												listeners:{
													colorchange:tbborderColor_colorchange
												}
											}
										]
									}
								]
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div20",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"auto",
						y:5
					},
					{
						xtype:"vmd.div",
						id:"div30",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:182,
						height:30,
						layout:"auto",
						y:5,
						style:"margin-top: 3px;",
						items:[
							{
								xtype:"vmd.div",
								id:"div31",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:143,
								height:30,
								layout:"fit",
								items:[
									{
										xtype:"vmd.ux.ColorSelect",
										id:"htBackgroundColor",
										layout:"fit",
										width:143,
										colorchange:"htBackgroundColor_colorchange",
										listeners:{
											colorchange:htBackgroundColor_colorchange
										}
									}
								]
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div32",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:181,
						height:30,
						layout:"auto",
						y:5,
						items:[
							{
								xtype:"vmd.div",
								id:"div33",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:142,
								height:30,
								layout:"fit",
								style:"margin-top: 2px;",
								items:[
									{
										xtype:"vmd.comlist",
										id:"htOpacity",
										width:172,
										height:270,
										cls:"comlist-b",
										afterrender:"htOpacity_afterrender",
										listeners:{
											vmdafterrender:htOpacity_afterrender
										}
									}
								]
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div34",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:180,
						height:30,
						layout:"auto",
						y:5,
						style:"margin-top: 5px;"
					},
					{
						xtype:"panel",
						id:"htBorder",
						title:"Panel",
						header:false,
						border:true,
						height:74,
						width:148,
						items:[
							{
								xtype:"vmd.div",
								id:"div36",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:179,
								height:30,
								layout:"auto",
								y:5,
								style:"margin-top: 3px;",
								items:[
									{
										xtype:"vmd.div",
										id:"div37",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:142,
										height:32,
										layout:"fit",
										items:[
											{
												xtype:"vmd.ux.Number",
												id:"htBorderHeight",
												layout:"absolute",
												szDecimalChanged:"htBorderHeight_szDecimalChanged",
												listeners:{
													szDecimalChanged:htBorderHeight_szDecimalChanged
												}
											}
										]
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"div38",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:179,
								height:30,
								layout:"auto",
								y:5,
								style:"margin-top: 3px;",
								hidden:true,
								items:[
									{
										xtype:"vmd.div",
										id:"div39",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:142,
										height:32,
										layout:"fit",
										items:[
											{
												xtype:"vmd.ux.Number",
												id:"htBorderRadius",
												layout:"absolute",
												style:"margin-top: -2px;",
												szDecimalChanged:"htBorderRadius_szDecimalChanged",
												listeners:{
													szDecimalChanged:htBorderRadius_szDecimalChanged
												}
											}
										]
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"div40",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:179,
								height:30,
								layout:"auto",
								y:5,
								style:"margin-top: 5px;",
								items:[
									{
										xtype:"vmd.div",
										id:"div41",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:142,
										height:30,
										layout:"fit",
										items:[
											{
												xtype:"vmd.ux.ColorSelect",
												id:"htBorderColor",
												layout:"fit",
												colorchange:"htBorderColor_colorchange",
												listeners:{
													colorchange:htBorderColor_colorchange
												}
											}
										]
									}
								]
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.ChartBorder");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ChartBorder");
	}
})