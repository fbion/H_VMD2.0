Ext.define("vmd.ux.ApprovalType" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ApprovalType",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:621,
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
			var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
});
var data = [{
    id: '0',
    name: '%y年%m月%d日'
}, {
    id: '1',
    name: '%y-%m-%d'
}];
store.loadData(data);

function sprq_spgs_afterrender(sender) {
    sprq_rqgs.store = store;
    sprq_rqgs.displayField = 'name';
    sprq_rqgs.valueField = 'id'
}

function sprq_x_afterrender(sender) {
    sprq_x.setValue(sprqDiv.x)
    sprq_y.setValue(sprqDiv.y)
    sprq_width.setValue("0")
    sprq_height.setValue("0")
}

function div1_click(sender, e) {
    sprq_x.setValue(parseFloat(sprq_x.getValue()) + 1)
    sprqDiv.setPosition(sprq_x.getValue(), sprq_y.getValue())
}

function div5_click(sender, e) {
    sprq_x.setValue(parseFloat(sprq_x.getValue()) - 1)
    sprqDiv.setPosition(sprq_x.getValue(), sprq_y.getValue())
}

function div3_click(sender, e) {
    sprq_y.setValue(parseFloat(sprq_y.getValue()) + 1)
    sprqDiv.setPosition(sprq_x.getValue(), sprq_y.getValue())
}

function div8_click(sender, e) {
    sprq_y.setValue(parseFloat(sprq_y.getValue()) - 1)
    sprqDiv.setPosition(sprq_x.getValue(), sprq_y.getValue())
}

function div4_click(sender, e) {
    sprq_height.setValue(parseFloat(sprq_height.getValue()) + 1)
}

function div7_click(sender, e) {
    if(sprq_height <= 0) {
        sprq_height.setValue("0")
    } else {
        sprq_height.setValue(parseFloat(sprq_height.getValue()) - 1)
    }
}

function div6_click(sender, e) {
    if(sprq_width <= 0) {
        sprq_width.setValue("0")
    } else {
        sprq_width.setValue(parseFloat(sprq_width.getValue()) - 1)
    }
}

function div2_click(sender, e) {
    sprq_width.setValue(parseFloat(sprq_width.getValue()) + 1)
}

function div10_click(sender, e) {
    spr_x.setValue(parseFloat(spr_x.getValue()) + 1)
    sprDiv.setPosition(spr_x.getValue(), spr_y.getValue())
}

function div14_click(sender, e) {
    spr_x.setValue(parseFloat(spr_x.getValue()) - 1)
    sprDiv.setPosition(spr_x.getValue(), spr_y.getValue())
}

function div12_click(sender, e) {
    spr_y.setValue(parseFloat(spr_y.getValue()) + 1)
    sprDiv.setPosition(spr_x.getValue(), spr_y.getValue())
}

function div17_click(sender, e) {
    spr_y.setValue(parseFloat(spr_y.getValue()) - 1)
    sprDiv.setPosition(spr_x.getValue(), spr_y.getValue())
}

function div13_click(sender, e) {
    spr_height.setValue(parseFloat(spr_height.getValue()) + 1)
}

function div11_click(sender, e) {
    sprq_width.setValue(parseFloat(sprq_width.getValue()) + 1)
}

function div16_click(sender, e) {
    if(spr_height.getValue() <= 0) {
        spr_height.setValue("0")
    } else {
        spr_height.setValue(parseFloat(spr_height.getValue()) - 1)
    }
}

function div15_click(sender, e) {
    if(spr_width.getValue() <= 0) {
        spr_width.setValue("0")
    } else {
        spr_width.setValue(parseFloat(spr_width.getValue()) - 1)
    }
}

function spr_x_afterrender(sender) {
    spr_x.setValue(sprDiv.x)
    spr_y.setValue(sprDiv.y)
    spr_width.setValue("0")
    spr_height.setValue("0")
}

function spz_x_afterrender(sender) {
    spz_x.setValue(spzDiv.x)
    spz_y.setValue(spzDiv.y)
    spz_width.setValue("0")
    spz_height.setValue("0")
}

function th_x_afterrender(sender) {
    th_x.setValue(thDiv.x)
    th_y.setValue(thDiv.y)
    th_width.setValue("0")
    th_height.setValue("0")
}

function div34_click(sender, e) {
    th_x.setValue(parseFloat(th_x.getValue()) + 1)
    thDiv.setPosition(th_x.getValue(), th_y.getValue())
}

function div38_click(sender, e) {
    th_x.setValue(parseFloat(th_x.getValue()) - 1)
    thDiv.setPosition(th_x.getValue(), th_y.getValue())
}

function div36_click(sender, e) {
    th_y.setValue(parseFloat(th_y.getValue()) + 1)
    thDiv.setPosition(th_x.getValue(), th_y.getValue())
}

function div41_click(sender, e) {
    th_y.setValue(parseFloat(th_y.getValue()) - 1)
    thDiv.setPosition(th_x.getValue(), th_y.getValue())
}

function div37_click(sender, e) {
    th_height.setValue(parseFloat(th_height.getValue()) + 1)
}

function div35_click(sender, e) {
    th_width.setValue(parseFloat(th_width.getValue()) + 1)
}

function div40_click(sender, e) {
    if(th_height.getValue() <= 0) {
        th_height.setValue("0")
    } else {
        th_height.setValue(parseFloat(th_height.getValue()) - 1)
    }
}

function div39_click(sender, e) {
    if(th_width.getValue() <= 0) {
        th_width.setValue("0")
    } else {
        th_width.setValue(parseFloat(th_width.getValue()) - 1)
    }
}

function div26_click(sender, e) {
    spz_x.setValue(parseFloat(spz_x.getValue()) + 1)
    spzDiv.setPosition(spz_x.getValue(), spz_y.getValue())
}

function div30_click(sender, e) {
    spz_x.setValue(parseFloat(spz_x.getValue()) - 1)
    spzDiv.setPosition(spz_x.getValue(), spz_y.getValue())
}

function div28_click(sender, e) {
    spz_y.setValue(parseFloat(spz_y.getValue()) + 1)
    spzDiv.setPosition(spz_x.getValue(), spz_y.getValue())
}

function div33_click(sender, e) {
    spz_y.setValue(parseFloat(spz_y.getValue()) - 1)
    spzDiv.setPosition(spz_x.getValue(), spz_y.getValue())
}

function div29_click(sender, e) {
    spz_height.setValue(parseFloat(spz_height.getValue()) + 1)
}

function div27_click(sender, e) {
    spz_width.setValue(parseFloat(spz_width.getValue()) + 1)
}

function div32_click(sender, e) {
    if(spz_height.getValue() <= 0) {
        spz_height.setValue("0")
    } else {
        spz_height.setValue(parseFloat(spz_height.getValue()) - 1)
    }
}

function div31_click(sender, e) {
    if(spz_width.getValue() <= 0) {
        spz_width.setValue("0")
    } else {
        spz_width.setValue(parseFloat(spz_width.getValue()) - 1)
    }
}

function bty_x_afterrender(sender) {
    bty_x.setValue(btyDiv.x)
    bty_y.setValue(btyDiv.y)
    bty_width.setValue("0")
    bty_height.setValue("0")
}

function div51_click(sender, e) {
    bty_x.setValue(parseFloat(bty_x.getValue()) + 1)
    btyDiv.setPosition(bty_x.getValue(), bty_y.getValue())
}

function div55_click(sender, e) {
    bty_x.setValue(parseFloat(bty_x.getValue()) - 1)
    btyDiv.setPosition(bty_x.getValue(), bty_y.getValue())
}

function div53_click(sender, e) {
    bty_y.setValue(parseFloat(bty_y.getValue()) + 1)
    btyDiv.setPosition(bty_x.getValue(), bty_y.getValue())
}

function div58_click(sender, e) {
    bty_y.setValue(parseFloat(bty_y.getValue()) - 1)
    btyDiv.setPosition(bty_x.getValue(), bty_y.getValue())
}

function div54_click(sender, e) {
    bty_height.setValue(parseFloat(bty_height.getValue()) + 1)
}

function div52_click(sender, e) {
    bty_width.setValue(parseFloat(bty_width.getValue()) + 1)
}

function div57_click(sender, e) {
    if(bty_height.getValue() <= 0) {
        bty_height.setValue("0")
    } else {
        bty_height.setValue(parseFloat(bty_height.getValue()) - 1)
    }
}

function div56_click(sender, e) {
    if(bty_width.getValue() <= 0) {
        bty_width.setValue("0")
    } else {
        bty_width.setValue(parseFloat(bty_width.getValue()) - 1)
    }
}

function ty_x_afterrender(sender) {
    ty_x.setValue(tyDiv.x)
    ty_y.setValue(tyDiv.y)
    ty_width.setValue("0")
    ty_height.setValue("0")
}

function div42_click(sender, e) {
    ty_x.setValue(parseFloat(ty_x.getValue()) + 1)
    tyDiv.setPosition(ty_x.getValue(), ty_y.getValue())
}

function div46_click(sender, e) {
    ty_x.setValue(parseFloat(ty_x.getValue()) - 1)
    tyDiv.setPosition(ty_x.getValue(), ty_y.getValue())
}

function div44_click(sender, e) {
    ty_y.setValue(parseFloat(ty_y.getValue()) + 1)
    tyDiv.setPosition(ty_x.getValue(), ty_y.getValue())
}

function div49_click(sender, e) {
    ty_y.setValue(parseFloat(ty_y.getValue()) - 1)
    tyDiv.setPosition(ty_x.getValue(), ty_y.getValue())
}

function div45_click(sender, e) {
    ty_height.setValue(parseFloat(ty_height.getValue()) + 1)
}

function div43_click(sender, e) {
    ty_width.setValue(parseFloat(ty_width.getValue()) + 1)
}

function div48_click(sender, e) {
    if(ty_height.getValue() <= 0) {
        ty_height.setValue("0")
    } else {
        ty_height.setValue(parseFloat(ty_height.getValue()) - 1)
    }
}

function div47_click(sender, e) {
    if(ty_width.getValue() <= 0) {
        ty_width.setValue("0")
    } else {
        ty_width.setValue(parseFloat(ty_width.getValue()) - 1)
    }
}

function spbm_x_afterrender(sender) {
    spbm_x.setValue(spbmDiv.x)
    spbm_y.setValue(spbmDiv.y)
    spbm_width.setValue("0")
    spbm_height.setValue("0")
}

function div59_click(sender, e) {
    spbm_x.setValue(parseFloat(spbm_x.getValue()) + 1)
    spbmDiv.setPosition(spbm_x.getValue(), spbm_y.getValue())
}

function div63_click(sender, e) {
    spbm_x.setValue(parseFloat(spbm_x.getValue()) - 1)
    spbmDiv.setPosition(spbm_x.getValue(), spbm_y.getValue())
}

function div61_click(sender, e) {
    spbm_y.setValue(parseFloat(spbm_y.getValue()) + 1)
    spbmDiv.setPosition(spbm_x.getValue(), spbm_y.getValue())
}

function div66_click(sender, e) {
    spbm_y.setValue(parseFloat(spbm_y.getValue()) - 1)
    spbmDiv.setPosition(spbm_x.getValue(), spbm_y.getValue())
}

function div62_click(sender, e) {
    spbm_height.setValue(parseFloat(spbm_height.getValue()) + 1)
}

function div60_click(sender, e) {
    spbm_width.setValue(parseFloat(spbm_width.getValue()) + 1)
}

function div65_click(sender, e) {
    if(spbm_height.getValue() <= 0) {
        spbm_height.setValue("0")
    } else {
        spbm_height.setValue(parseFloat(spbm_height.getValue()) - 1)
    }
}

function div64_click(sender, e) {
    if(spbm_width.getValue() <= 0) {
        spbm_width.setValue("0")
    } else {
        spbm_width.setValue(parseFloat(spbm_width.getValue()) - 1)
    }
}

function spyj_x_afterrender(sender) {
    spyj_x.setValue(spyjDiv.x)
    spyj_y.setValue(spyjDiv.y)
    spyj_width.setValue("0")
    spyj_height.setValue("0")
}

function div67_click(sender, e) {
    spyj_x.setValue(parseFloat(spyj_x.getValue()) + 1)
    spyjDiv.setPosition(spyj_x.getValue(), spyj_y.getValue())
}

function div71_click(sender, e) {
    spyj_x.setValue(parseFloat(spyj_x.getValue()) - 1)
    spyjDiv.setPosition(spyj_x.getValue(), spyj_y.getValue())
}

function div69_click(sender, e) {
    spyj_y.setValue(parseFloat(spyj_y.getValue()) + 1)
    spyjDiv.setPosition(spyj_x.getValue(), spyj_y.getValue())
}

function div74_click(sender, e) {
    spyj_y.setValue(parseFloat(spyj_y.getValue()) - 1)
    spyjDiv.setPosition(spyj_x.getValue(), spyj_y.getValue())
}

function div70_click(sender, e) {

    spyj_height.setValue(parseFloat(spyj_height.getValue()) + 1)
}

function div68_click(sender, e) {
    spyj_width.setValue(parseFloat(spyj_width.getValue()) + 1)
}

function div73_click(sender, e) {
    if(spyj_height.getValue() <= 0) {
        spyj_height.setValue("0")
    } else {
        spyj_height.setValue(parseFloat(spyj_height.getValue()) - 1)
    }
}

function div72_click(sender, e) {
    if(spyj_width.getValue() <= 0) {
        spyj_width.setValue("0")
    } else {
        spyj_width.setValue(parseFloat(spyj_width.getValue()) - 1)
    }
}

function closeAll() {
    spbmDivShow.hide()
    spyjDivShow.hide();
    tyDivShow.hide()
    btyDivShow.hide()
    thDivShow.hide()
    spzDivShow.hide()
    sprDivShow.hide()
    sprqDivShow.hide()
}

function style_afterrender(sender) {

}

function spbmDiv_click(sender, e) {
    style.setText("审批部门：");
    closeAll();
    spbmDivShow.show();
}

function spyjDiv_click(sender, e) {
    style.setText("审批意见：");
    closeAll();
    spyjDivShow.show();
}

function tyDiv_click(sender, e) {
    style.setText("同意：");
    closeAll();
    tyDivShow.show();
}

function btyDiv_click(sender, e) {
    style.setText("不同意：");
    closeAll();
    btyDivShow.show();
}

function thDiv_click(sender, e) {
    style.setText("退回：");
    closeAll();
    thDivShow.show();
}

function spzDiv_click(sender, e) {
    style.setText("审批章：");
    closeAll();
    spzDivShow.show();
}

function sprDiv_click(sender, e) {
    style.setText("审批人：");
    closeAll();
    sprDivShow.show();
}

function sprqDiv_click(sender, e) {
    style.setText("审批日期：");
    closeAll();
    sprqDivShow.show();
}
			this.items=[
			{
				xtype:"vmd.div",
				id:"preview",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:300,
				height:170,
				x:10,
				y:10,
				layout:"absolute",
				items:[
					{
						xtype:"vmd.div",
						id:"spbmDiv",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:80,
						height:20,
						x:10,
						y:10,
						layout:"hbox",
						click:"spbmDiv_click",
						style:"cursor: pointer",
						listeners:{
							click:spbmDiv_click
						},
						items:[
							{
								xtype:"label",
								id:"label",
								text:"审批部门",
								style:"cursor: pointer"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"spyjDiv",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:80,
						height:20,
						x:10,
						y:40,
						layout:"hbox",
						click:"spyjDiv_click",
						style:"cursor: pointer",
						listeners:{
							click:spyjDiv_click
						},
						items:[
							{
								xtype:"label",
								id:"label1",
								text:"审批意见",
								style:"cursor: pointer"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"tyDiv",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						autoEl:"div",
						border:true,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:50,
						height:30,
						x:10,
						y:130,
						layout:"hbox",
						click:"tyDiv_click",
						style:"cursor: pointer",
						listeners:{
							click:tyDiv_click
						},
						items:[
							{
								xtype:"label",
								id:"label2",
								text:"同意",
								style:"cursor: pointer"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"thDiv",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						autoEl:"div",
						border:true,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:50,
						height:30,
						x:130,
						y:130,
						layout:"hbox",
						click:"thDiv_click",
						style:"cursor: pointer",
						listeners:{
							click:thDiv_click
						},
						items:[
							{
								xtype:"label",
								id:"label4",
								text:"退回",
								style:"cursor: pointer"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"btyDiv",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						autoEl:"div",
						border:true,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:50,
						height:30,
						x:70,
						y:130,
						layout:"hbox",
						click:"btyDiv_click",
						style:"cursor: pointer",
						listeners:{
							click:btyDiv_click
						},
						items:[
							{
								xtype:"label",
								id:"label3",
								text:"不同意",
								style:"cursor: pointer"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"spzDiv",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:70,
						height:20,
						x:220,
						y:80,
						layout:"hbox",
						click:"spzDiv_click",
						style:"cursor: pointer",
						listeners:{
							click:spzDiv_click
						},
						items:[
							{
								xtype:"label",
								id:"label5",
								text:"审批章",
								style:"cursor: pointer"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"sprqDiv",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:70,
						height:20,
						x:220,
						y:140,
						layout:"hbox",
						click:"sprqDiv_click",
						style:"cursor: pointer",
						listeners:{
							click:sprqDiv_click
						},
						items:[
							{
								xtype:"label",
								id:"label7",
								text:"审批日期",
								style:"cursor: pointer"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"sprDiv",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:70,
						height:20,
						x:220,
						y:110,
						layout:"hbox",
						click:"sprDiv_click",
						style:"cursor: pointer",
						listeners:{
							click:sprDiv_click
						},
						items:[
							{
								xtype:"label",
								id:"label6",
								text:"审批人",
								style:"cursor: pointer"
							}
						]
					}
				]
			},
			{
				xtype:"checkbox",
				id:"allowEdit",
				fieldLabel:"Checkbox",
				boxLabel:"允许编辑",
				x:20,
				y:190
			},
			{
				xtype:"checkbox",
				id:"allowPrint",
				fieldLabel:"Checkbox",
				boxLabel:"允许打印",
				x:20,
				y:220
			},
			{
				xtype:"label",
				id:"style",
				text:"标题",
				x:10,
				y:250,
				style:"font-size: 16px;    font-style: bold;",
				afterrender:"style_afterrender",
				listeners:{
					vmdafterrender:style_afterrender
				}
			},
			{
				xtype:"vmd.div",
				id:"sprqDivShow",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:300,
				height:340,
				x:10,
				y:270,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label8",
						text:"日期格式：",
						x:10,
						y:10
					},
					{
						xtype:"vmd.comlist",
						id:"sprq_rqgs",
						width:220,
						height:270,
						x:70,
						y:5,
						afterrender:"sprq_spgs_afterrender",
						listeners:{
							vmdafterrender:sprq_spgs_afterrender
						}
					},
					{
						xtype:"checkbox",
						id:"sprq_display",
						fieldLabel:"Checkbox",
						boxLabel:"显示",
						x:10,
						y:40
					},
					{
						xtype:"label",
						id:"label9",
						text:"标签名称：",
						x:10,
						y:70
					},
					{
						xtype:"textfield",
						id:"sprq_bqmc",
						allowBlank:true,
						x:70,
						y:65
					},
					{
						xtype:"label",
						id:"label10",
						text:"审批日期：",
						x:10,
						y:100
					},
					{
						xtype:"textfield",
						id:"sprq_sprq",
						allowBlank:true,
						x:70,
						y:95
					},
					{
						xtype:"label",
						id:"label11",
						text:"字体：",
						x:33,
						y:130
					},
					{
						xtype:"textfield",
						id:"sprq_font",
						allowBlank:true,
						x:70,
						y:125
					},
					{
						xtype:"vmd.button",
						id:"button",
						text:"...",
						type:"(none)",
						size:"small",
						x:220,
						y:125,
						width:28,
						height:24
					},
					{
						xtype:"label",
						id:"label12",
						text:"宽度：",
						x:140,
						y:215
					},
					{
						xtype:"label",
						id:"label13",
						text:"高度：",
						x:25,
						y:215
					},
					{
						xtype:"label",
						id:"label14",
						text:"偏移x：",
						x:25,
						y:175
					},
					{
						xtype:"label",
						id:"label15",
						text:"偏移y：",
						x:140,
						y:175
					},
					{
						xtype:"numberfield",
						id:"sprq_x",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:170,
						width:70,
						afterrender:"sprq_x_afterrender",
						listeners:{
							vmdafterrender:sprq_x_afterrender
						}
					},
					{
						xtype:"numberfield",
						id:"sprq_width",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:210,
						width:70
					},
					{
						xtype:"numberfield",
						id:"sprq_y",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:170,
						width:70
					},
					{
						xtype:"numberfield",
						id:"sprq_height",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:210,
						width:70
					},
					{
						xtype:"vmd.div",
						id:"div1",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:170,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div1_click",
						listeners:{
							click:div1_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div2",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:210,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div2_click",
						listeners:{
							click:div2_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div3",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:170,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div3_click",
						listeners:{
							click:div3_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div4",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:210,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div4_click",
						listeners:{
							click:div4_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div5",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:180,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div5_click",
						listeners:{
							click:div5_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div6",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:220,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div6_click",
						listeners:{
							click:div6_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div7",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:220,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div7_click",
						listeners:{
							click:div7_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div8",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:180,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div8_click",
						listeners:{
							click:div8_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"sprDivShow",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:300,
				height:340,
				x:10,
				y:270,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label16",
						text:"签名照片：",
						x:10,
						y:10
					},
					{
						xtype:"checkbox",
						id:"spr_display",
						fieldLabel:"Checkbox",
						boxLabel:"显示",
						x:10,
						y:40
					},
					{
						xtype:"label",
						id:"label17",
						text:"标签名称：",
						x:10,
						y:70
					},
					{
						xtype:"textfield",
						id:"spr_bqmc",
						allowBlank:true,
						x:70,
						y:65
					},
					{
						xtype:"label",
						id:"label18",
						text:"审批人：",
						x:10,
						y:100
					},
					{
						xtype:"textfield",
						id:"spr_spr",
						allowBlank:true,
						x:70,
						y:95
					},
					{
						xtype:"label",
						id:"label19",
						text:"字体：",
						x:33,
						y:130
					},
					{
						xtype:"textfield",
						id:"spr_font",
						allowBlank:true,
						x:70,
						y:125
					},
					{
						xtype:"vmd.button",
						id:"button1",
						text:"...",
						type:"(none)",
						size:"small",
						x:220,
						y:125,
						width:28,
						height:24
					},
					{
						xtype:"label",
						id:"label20",
						text:"宽度：",
						x:140,
						y:215
					},
					{
						xtype:"label",
						id:"label21",
						text:"高度：",
						x:25,
						y:215
					},
					{
						xtype:"label",
						id:"label22",
						text:"偏移x：",
						x:25,
						y:175
					},
					{
						xtype:"label",
						id:"label23",
						text:"偏移y：",
						x:140,
						y:175
					},
					{
						xtype:"numberfield",
						id:"spr_x",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:170,
						width:70,
						afterrender:"spr_x_afterrender",
						listeners:{
							vmdafterrender:spr_x_afterrender
						}
					},
					{
						xtype:"numberfield",
						id:"spr_width",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:210,
						width:70
					},
					{
						xtype:"numberfield",
						id:"spr_y",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:170,
						width:70
					},
					{
						xtype:"numberfield",
						id:"spr_height",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:210,
						width:70
					},
					{
						xtype:"vmd.div",
						id:"div10",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:170,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div10_click",
						listeners:{
							click:div10_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div11",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:210,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div11_click",
						listeners:{
							click:div11_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div12",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:170,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div12_click",
						listeners:{
							click:div12_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div13",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:210,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div13_click",
						listeners:{
							click:div13_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div14",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:180,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div14_click",
						listeners:{
							click:div14_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div15",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:220,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div15_click",
						listeners:{
							click:div15_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div16",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:220,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div16_click",
						listeners:{
							click:div16_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div17",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:180,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div17_click",
						listeners:{
							click:div17_click
						}
					},
					{
						xtype:"textfield",
						id:"spr_qmzp",
						allowBlank:true,
						x:70,
						y:5
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"spzDivShow",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:300,
				height:340,
				x:10,
				y:270,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"checkbox",
						id:"spz_display",
						fieldLabel:"Checkbox",
						boxLabel:"显示",
						x:10,
						y:10
					},
					{
						xtype:"label",
						id:"label33",
						text:"标签名称：",
						x:10,
						y:40
					},
					{
						xtype:"textfield",
						id:"spz_bqmc",
						allowBlank:true,
						x:70,
						y:35
					},
					{
						xtype:"label",
						id:"label34",
						text:"图片来源：",
						x:10,
						y:70
					},
					{
						xtype:"textfield",
						id:"spz_tply",
						allowBlank:true,
						x:70,
						y:65
					},
					{
						xtype:"label",
						id:"label35",
						text:"字体：",
						x:30,
						y:100
					},
					{
						xtype:"textfield",
						id:"spz_font",
						allowBlank:true,
						x:70,
						y:95
					},
					{
						xtype:"vmd.button",
						id:"button3",
						text:"...",
						type:"(none)",
						size:"small",
						x:220,
						y:95,
						width:28,
						height:24
					},
					{
						xtype:"label",
						id:"label36",
						text:"宽度：",
						x:140,
						y:185
					},
					{
						xtype:"label",
						id:"label37",
						text:"高度：",
						x:25,
						y:185
					},
					{
						xtype:"label",
						id:"label38",
						text:"偏移x：",
						x:25,
						y:145
					},
					{
						xtype:"label",
						id:"label39",
						text:"偏移y：",
						x:140,
						y:145
					},
					{
						xtype:"numberfield",
						id:"spz_x",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:140,
						width:70,
						afterrender:"spz_x_afterrender",
						listeners:{
							vmdafterrender:spz_x_afterrender
						}
					},
					{
						xtype:"numberfield",
						id:"spz_width",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:180,
						width:70
					},
					{
						xtype:"numberfield",
						id:"spz_y",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:140,
						width:70
					},
					{
						xtype:"numberfield",
						id:"spz_height",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:180,
						width:70
					},
					{
						xtype:"vmd.div",
						id:"div26",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div26_click",
						listeners:{
							click:div26_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div27",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div27_click",
						listeners:{
							click:div27_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div28",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div28_click",
						listeners:{
							click:div28_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div29",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div29_click",
						listeners:{
							click:div29_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div30",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div30_click",
						listeners:{
							click:div30_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div31",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div31_click",
						listeners:{
							click:div31_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div32",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div32_click",
						listeners:{
							click:div32_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div33",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div33_click",
						listeners:{
							click:div33_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"thDivShow",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:300,
				height:340,
				x:10,
				y:270,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"checkbox",
						id:"th_display",
						fieldLabel:"Checkbox",
						boxLabel:"显示",
						x:10,
						y:10
					},
					{
						xtype:"label",
						id:"label32",
						text:"标签名称：",
						x:10,
						y:40
					},
					{
						xtype:"textfield",
						id:"th_bqmc",
						allowBlank:true,
						x:70,
						y:35
					},
					{
						xtype:"label",
						id:"label40",
						text:"审批结果：",
						x:10,
						y:70
					},
					{
						xtype:"textfield",
						id:"th_spjg",
						allowBlank:true,
						x:70,
						y:65
					},
					{
						xtype:"label",
						id:"label41",
						text:"字体：",
						x:30,
						y:100
					},
					{
						xtype:"textfield",
						id:"th_font",
						allowBlank:true,
						x:70,
						y:95
					},
					{
						xtype:"vmd.button",
						id:"button4",
						text:"...",
						type:"(none)",
						size:"small",
						x:220,
						y:95,
						width:28,
						height:24
					},
					{
						xtype:"label",
						id:"label42",
						text:"宽度：",
						x:140,
						y:185
					},
					{
						xtype:"label",
						id:"label43",
						text:"高度：",
						x:25,
						y:185
					},
					{
						xtype:"label",
						id:"label44",
						text:"偏移x：",
						x:25,
						y:145
					},
					{
						xtype:"label",
						id:"label45",
						text:"偏移y：",
						x:140,
						y:145
					},
					{
						xtype:"numberfield",
						id:"th_x",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:140,
						width:70,
						afterrender:"th_x_afterrender",
						listeners:{
							vmdafterrender:th_x_afterrender
						}
					},
					{
						xtype:"numberfield",
						id:"th_width",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:180,
						width:70
					},
					{
						xtype:"numberfield",
						id:"th_y",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:140,
						width:70
					},
					{
						xtype:"numberfield",
						id:"th_height",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:180,
						width:70
					},
					{
						xtype:"vmd.div",
						id:"div34",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div34_click",
						listeners:{
							click:div34_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div35",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div35_click",
						listeners:{
							click:div35_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div36",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div36_click",
						listeners:{
							click:div36_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div37",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div37_click",
						listeners:{
							click:div37_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div38",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div38_click",
						listeners:{
							click:div38_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div39",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div39_click",
						listeners:{
							click:div39_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div40",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div40_click",
						listeners:{
							click:div40_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div41",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div41_click",
						listeners:{
							click:div41_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"tyDivShow",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:300,
				height:340,
				x:10,
				y:270,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"checkbox",
						id:"ty_display",
						fieldLabel:"Checkbox",
						boxLabel:"显示",
						x:10,
						y:10
					},
					{
						xtype:"label",
						id:"label46",
						text:"标签名称：",
						x:10,
						y:40
					},
					{
						xtype:"textfield",
						id:"ty_bqmc",
						allowBlank:true,
						x:70,
						y:35
					},
					{
						xtype:"label",
						id:"label47",
						text:"审批结果：",
						x:10,
						y:70
					},
					{
						xtype:"textfield",
						id:"ty_spjg",
						allowBlank:true,
						x:70,
						y:65
					},
					{
						xtype:"label",
						id:"label48",
						text:"字体：",
						x:30,
						y:100
					},
					{
						xtype:"textfield",
						id:"ty_font",
						allowBlank:true,
						x:70,
						y:95
					},
					{
						xtype:"vmd.button",
						id:"button5",
						text:"...",
						type:"(none)",
						size:"small",
						x:220,
						y:95,
						width:28,
						height:24
					},
					{
						xtype:"label",
						id:"label49",
						text:"宽度：",
						x:140,
						y:185
					},
					{
						xtype:"label",
						id:"label50",
						text:"高度：",
						x:25,
						y:185
					},
					{
						xtype:"label",
						id:"label51",
						text:"偏移x：",
						x:25,
						y:145
					},
					{
						xtype:"label",
						id:"label52",
						text:"偏移y：",
						x:140,
						y:145
					},
					{
						xtype:"numberfield",
						id:"ty_x",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:140,
						width:70,
						afterrender:"ty_x_afterrender",
						listeners:{
							vmdafterrender:ty_x_afterrender
						}
					},
					{
						xtype:"numberfield",
						id:"ty_width",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:180,
						width:70
					},
					{
						xtype:"numberfield",
						id:"ty_y",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:140,
						width:70
					},
					{
						xtype:"numberfield",
						id:"ty_height",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:180,
						width:70
					},
					{
						xtype:"vmd.div",
						id:"div42",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div42_click",
						listeners:{
							click:div42_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div43",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div43_click",
						listeners:{
							click:div43_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div44",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div44_click",
						listeners:{
							click:div44_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div45",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div45_click",
						listeners:{
							click:div45_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div46",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div46_click",
						listeners:{
							click:div46_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div47",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div47_click",
						listeners:{
							click:div47_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div48",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div48_click",
						listeners:{
							click:div48_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div49",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div49_click",
						listeners:{
							click:div49_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"btyDivShow",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:300,
				height:340,
				x:10,
				y:270,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"checkbox",
						id:"bty_display",
						fieldLabel:"Checkbox",
						boxLabel:"显示",
						x:10,
						y:10
					},
					{
						xtype:"label",
						id:"label53",
						text:"标签名称：",
						x:10,
						y:40
					},
					{
						xtype:"textfield",
						id:"bty_bqmc",
						allowBlank:true,
						x:70,
						y:35
					},
					{
						xtype:"label",
						id:"label54",
						text:"审批结果：",
						x:10,
						y:70
					},
					{
						xtype:"textfield",
						id:"bty_spjg",
						allowBlank:true,
						x:70,
						y:65
					},
					{
						xtype:"label",
						id:"label55",
						text:"字体：",
						x:30,
						y:100
					},
					{
						xtype:"textfield",
						id:"bty_font",
						allowBlank:true,
						x:70,
						y:95
					},
					{
						xtype:"vmd.button",
						id:"button6",
						text:"...",
						type:"(none)",
						size:"small",
						x:220,
						y:95,
						width:28,
						height:24
					},
					{
						xtype:"label",
						id:"label56",
						text:"宽度：",
						x:140,
						y:185
					},
					{
						xtype:"label",
						id:"label57",
						text:"高度：",
						x:25,
						y:185
					},
					{
						xtype:"label",
						id:"label58",
						text:"偏移x：",
						x:25,
						y:145
					},
					{
						xtype:"label",
						id:"label59",
						text:"偏移y：",
						x:140,
						y:145
					},
					{
						xtype:"numberfield",
						id:"bty_x",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:140,
						width:70,
						afterrender:"bty_x_afterrender",
						listeners:{
							vmdafterrender:bty_x_afterrender
						}
					},
					{
						xtype:"numberfield",
						id:"bty_width",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:180,
						width:70
					},
					{
						xtype:"numberfield",
						id:"bty_y",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:140,
						width:70
					},
					{
						xtype:"numberfield",
						id:"bty_height",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:180,
						width:70
					},
					{
						xtype:"vmd.div",
						id:"div51",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div51_click",
						listeners:{
							click:div51_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div52",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div52_click",
						listeners:{
							click:div52_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div53",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div53_click",
						listeners:{
							click:div53_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div54",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div54_click",
						listeners:{
							click:div54_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div55",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div55_click",
						listeners:{
							click:div55_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div56",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div56_click",
						listeners:{
							click:div56_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div57",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div57_click",
						listeners:{
							click:div57_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div58",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div58_click",
						listeners:{
							click:div58_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"spbmDivShow",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:300,
				height:340,
				x:10,
				y:270,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"checkbox",
						id:"spbm_display",
						fieldLabel:"Checkbox",
						boxLabel:"显示",
						x:10,
						y:10
					},
					{
						xtype:"label",
						id:"label60",
						text:"标签名称：",
						x:10,
						y:40
					},
					{
						xtype:"textfield",
						id:"spbm_bqmc",
						allowBlank:true,
						x:70,
						y:35
					},
					{
						xtype:"label",
						id:"label61",
						text:"部门名称：",
						x:10,
						y:70
					},
					{
						xtype:"textfield",
						id:"spbm_bmmc",
						allowBlank:true,
						x:70,
						y:65
					},
					{
						xtype:"label",
						id:"label62",
						text:"字体：",
						x:30,
						y:100
					},
					{
						xtype:"textfield",
						id:"spbm_font",
						allowBlank:true,
						x:70,
						y:95
					},
					{
						xtype:"vmd.button",
						id:"button7",
						text:"...",
						type:"(none)",
						size:"small",
						x:220,
						y:95,
						width:28,
						height:24
					},
					{
						xtype:"label",
						id:"label63",
						text:"宽度：",
						x:140,
						y:185
					},
					{
						xtype:"label",
						id:"label64",
						text:"高度：",
						x:25,
						y:185
					},
					{
						xtype:"label",
						id:"label65",
						text:"偏移x：",
						x:25,
						y:145
					},
					{
						xtype:"label",
						id:"label66",
						text:"偏移y：",
						x:140,
						y:145
					},
					{
						xtype:"numberfield",
						id:"spbm_x",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:140,
						width:70,
						afterrender:"spbm_x_afterrender",
						listeners:{
							vmdafterrender:spbm_x_afterrender
						}
					},
					{
						xtype:"numberfield",
						id:"spbm_width",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:180,
						width:70
					},
					{
						xtype:"numberfield",
						id:"spbm_y",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:140,
						width:70
					},
					{
						xtype:"numberfield",
						id:"spbm_height",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:180,
						width:70
					},
					{
						xtype:"vmd.div",
						id:"div59",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div59_click",
						listeners:{
							click:div59_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div60",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div60_click",
						listeners:{
							click:div60_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div61",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div61_click",
						listeners:{
							click:div61_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div62",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div62_click",
						listeners:{
							click:div62_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div63",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div63_click",
						listeners:{
							click:div63_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div64",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div64_click",
						listeners:{
							click:div64_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div65",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div65_click",
						listeners:{
							click:div65_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div66",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div66_click",
						listeners:{
							click:div66_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"spyjDivShow",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:300,
				height:340,
				x:10,
				y:270,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"checkbox",
						id:"spyj_display",
						fieldLabel:"Checkbox",
						boxLabel:"显示",
						x:10,
						y:10
					},
					{
						xtype:"label",
						id:"label67",
						text:"标签名称：",
						x:10,
						y:40
					},
					{
						xtype:"textfield",
						id:"spyj_bqmc",
						allowBlank:true,
						x:70,
						y:35
					},
					{
						xtype:"label",
						id:"label68",
						text:"意见内容：",
						x:10,
						y:70
					},
					{
						xtype:"textfield",
						id:"spyj_yjnr",
						allowBlank:true,
						x:70,
						y:65
					},
					{
						xtype:"label",
						id:"label69",
						text:"字体：",
						x:30,
						y:100
					},
					{
						xtype:"textfield",
						id:"spyj_font",
						allowBlank:true,
						x:70,
						y:95
					},
					{
						xtype:"vmd.button",
						id:"button8",
						text:"...",
						type:"(none)",
						size:"small",
						x:220,
						y:95,
						width:28,
						height:24
					},
					{
						xtype:"label",
						id:"label70",
						text:"宽度：",
						x:140,
						y:185
					},
					{
						xtype:"label",
						id:"label71",
						text:"高度：",
						x:25,
						y:185
					},
					{
						xtype:"label",
						id:"label72",
						text:"偏移x：",
						x:25,
						y:145
					},
					{
						xtype:"label",
						id:"label73",
						text:"偏移y：",
						x:140,
						y:145
					},
					{
						xtype:"numberfield",
						id:"spyj_x",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:140,
						width:70,
						afterrender:"spyj_x_afterrender",
						listeners:{
							vmdafterrender:spyj_x_afterrender
						}
					},
					{
						xtype:"numberfield",
						id:"spyj_width",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:180,
						width:70
					},
					{
						xtype:"numberfield",
						id:"spyj_y",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:180,
						y:140,
						width:70
					},
					{
						xtype:"numberfield",
						id:"spyj_height",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:60,
						y:180,
						width:70
					},
					{
						xtype:"vmd.div",
						id:"div67",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div67_click",
						listeners:{
							click:div67_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div68",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div68_click",
						listeners:{
							click:div68_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div69",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:140,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div69_click",
						listeners:{
							click:div69_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div70",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:180,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						style:"cursor: pointer",
						click:"div70_click",
						listeners:{
							click:div70_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div71",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div71_click",
						listeners:{
							click:div71_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div72",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div72_click",
						listeners:{
							click:div72_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div73",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:115,
						y:190,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div73_click",
						listeners:{
							click:div73_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div74",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:230,
						y:150,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						style:"cursor: pointer",
						click:"div74_click",
						listeners:{
							click:div74_click
						}
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.ApprovalType");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.ApprovalType");
	}
})