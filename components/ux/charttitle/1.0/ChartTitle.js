Ext.define("vmd.ux.ChartTitle" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.ButtonGroup$1.0$ButtonGroup","vmd.ux.Number$1.0$Number"]),
	version:"1.0",
	xtype:"vmd.ux.ChartTitle",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:700,
	layout:"border",
	padding:"10 0 0 0 ",
	uxCss:".in-text{    border: 1px solid #ddd;    margin-top:3px;    margin-right: 20px;}.bnt-text{    margin-top: 5px;    line-height: 8px;    margin-right: 3px;}",
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


function ButtonGroup_click(sender, selectedIndex) {
    var align;
    switch (selectedIndex) {
        case 1:
            align = 'left';
            break;
        case 2:
            align = 'center';
            break;
        case 3:
            align = 'right';
            break;
    }
    page.fireEvent("titleAlineChange", sender, align);
}

function ButtonGroup1_click(sender, selectedIndex) {
    var verticalAlign;
    switch (selectedIndex) {
        case 1:
            verticalAlign = 'top';
            break;
        case 2:
            verticalAlign = 'middle';
            break;
        case 3:
            verticalAlign = 'bottom';
            break;
    }
    page.fireEvent("titleVerticalAlignChange", sender, verticalAlign);
}


function offsetX_szDecimalChanged(sender, value, describe) {
    page.fireEvent("titleoffsetXChange",sender, value, describe);
}

function offsetY_szDecimalChanged(sender, value, describe) {
    page.fireEvent("titleoffsetYChange",sender, value, describe);
}
			this.items=[
			{
				xtype:"vmd.div",
				id:"div1",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:50,
				region:"center",
				items:[
					{
						xtype:"vmd.div",
						id:"div14",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"absolute",
						items:[
							{
								xtype:"checkbox",
								id:"isFloat",
								fieldLabel:"Checkbox",
								boxLabel:"浮动",
								x:20,
								y:10
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
						height:30,
						layout:"absolute",
						style:"margin-top: 5px;",
						items:[
							{
								xtype:"label",
								id:"label",
								text:"标题文本",
								x:20,
								y:10,
								width:70
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div4",
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
								id:"label1",
								text:"X偏移",
								x:20,
								y:10,
								width:60
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
						style:"margin-top: 5px;",
						items:[
							{
								xtype:"label",
								id:"label2",
								text:"Y偏移",
								x:20,
								y:10,
								width:70
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
						height:30,
						layout:"absolute",
						style:"margin-top: 5px;",
						items:[
							{
								xtype:"label",
								id:"label3",
								text:"水平对齐",
								x:20,
								y:10,
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
						style:"margin-top: 5px;",
						items:[
							{
								xtype:"label",
								id:"label4",
								text:"垂直对齐",
								x:20,
								y:10,
								width:70
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
						id:"div15",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"auto",
						y:5,
						style:"margin-top: 5px;"
					},
					{
						xtype:"vmd.div",
						id:"div3",
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
								xtype:"textfield",
								id:"TitleText",
								allowBlank:true,
								x:0,
								y:5,
								width:142,
								cls:"in-text"
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
						layout:"auto",
						y:5,
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
								items:[
									{
										xtype:"vmd.ux.Number",
										id:"offsetX",
										layout:"absolute",
										height:32,
										szDecimalChanged:"offsetX_szDecimalChanged",
										listeners:{
											szDecimalChanged:offsetX_szDecimalChanged
										}
									}
								]
							}
						]
					},
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
						style:"margin-top: 2px;",
						items:[
							{
								xtype:"vmd.div",
								id:"div17",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:142,
								height:30,
								items:[
									{
										xtype:"vmd.ux.Number",
										id:"offsetY",
										layout:"absolute",
										height:32,
										szDecimalChanged:"offsetY_szDecimalChanged",
										listeners:{
											szDecimalChanged:offsetY_szDecimalChanged
										}
									}
								]
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div9",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						layout:"auto",
						y:5,
						style:"margin-top: 8px;",
						items:[
							{
								xtype:"vmd.div",
								id:"div12",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:138,
								height:30,
								items:[
									{
										xtype:"vmd.ux.ButtonGroup",
										id:"ButtonGroup",
										layout:"anchor",
										count:"3",
										text:"居左,居中,居右",
										width:141,
										height:30,
										click:"ButtonGroup_click",
										listeners:{
											click:ButtonGroup_click
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
						height:30,
						layout:"auto",
						y:5,
						style:"margin-top: 5px;",
						items:[
							{
								xtype:"vmd.div",
								id:"div13",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:138,
								height:30,
								items:[
									{
										xtype:"vmd.ux.ButtonGroup",
										id:"ButtonGroup1",
										layout:"anchor",
										count:"3",
										width:139,
										text:"居上,居中,居下",
										height:29,
										style:"font-size:12px;",
										click:"ButtonGroup1_click",
										listeners:{
											click:ButtonGroup1_click
										}
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.ChartTitle");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ChartTitle");
	}
})