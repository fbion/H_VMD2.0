Ext.define("vmd.ux.ProgressBarType" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.ColorSelect$1.0$ColorSelect"]),
	version:"1.0",
	xtype:"vmd.ux.ProgressBarType",
	title:"Panel",
	header:false,
	border:false,
	width:290,
	height:672,
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
			var page = this;

function btop_afterrender(sender) {
    jdt_btop.setValue("5")
    jdt_bleft.setValue("5")
    jdt_bbottom.setValue("5")
    jdt_bright.setValue("5")
}

function div7_click(sender, e) {
    jdt_btop.setValue(parseFloat(jdt_btop.getValue()) + 1)
    page.fireEvent("pbtDecimalChanged",jdt_btop,jdt_btop.value,"btop")
}

function div5_click(sender, e) {
    jdt_bbottom.setValue(parseFloat(jdt_bbottom.getValue()) + 1)
    page.fireEvent("pbtDecimalChanged",jdt_bbottom,jdt_bbottom.value,"bbottom")
}

function div6_click(sender, e) {
    jdt_bleft.setValue(parseFloat(jdt_bleft.getValue()) + 1)
    page.fireEvent("pbtDecimalChanged",jdt_bleft,jdt_bleft.value,"bleft")
}

function div4_click(sender, e) {
    jdt_bright.setValue(parseFloat(jdt_bright.getValue()) + 1)
    page.fireEvent("pbtDecimalChanged",jdt_bright,jdt_bright.value,"bright")
}

function div2_click(sender, e) {
    if(parseFloat(jdt_btop.getValue()) <= 1) {
        jdt_btop.setValue("0")
        page.fireEvent("pbtDecimalChanged",jdt_btop,jdt_btop.value,"btop")
    } else {
        jdt_btop.setValue(parseFloat(jdt_btop.getValue()) - 1)
       page.fireEvent("pbtDecimalChanged",jdt_btop,jdt_btop.value,"btop")
    }
}

function div_click(sender, e) {
    if(parseFloat(jdt_bleft.getValue()) <= 1) {
        jdt_bleft.setValue("0")
         page.fireEvent("pbtDecimalChanged",jdt_bleft,jdt_bleft.value,"bleft")
    } else {
        jdt_bleft.setValue(parseFloat(jdt_bleft.getValue()) - 1)
         page.fireEvent("pbtDecimalChanged",jdt_bleft,jdt_bleft.value,"bleft")
    }
}

function div1_click(sender, e) {
    if(parseFloat(jdt_bbottom.getValue()) <= 1) {
        jdt_bbottom.setValue("0")
        page.fireEvent("pbtDecimalChanged",jdt_bbottom,jdt_bbottom.value,"bbottom")
    } else {
        jdt_bbottom.setValue(parseFloat(jdt_bbottom.getValue()) - 1)
        page.fireEvent("pbtDecimalChanged",jdt_bbottom,jdt_bbottom.value,"bbottom")
    }
}

function div3_click(sender, e) {
    if(parseFloat(jdt_bright.getValue()) <= 1) {
        jdt_bright.setValue("0")
        page.fireEvent("pbtDecimalChanged",jdt_bright,jdt_bright.value,"bright")
    } else {
        jdt_bright.setValue(parseFloat(jdt_bright.getValue()) - 1)
        page.fireEvent("pbtDecimalChanged",jdt_bright,jdt_bright.value,"bright")
    }
}





function innerColor_colorchange(sender, selColor) {
    jdt_someValue.setValue(jdt_innerColor.getSelColor())
    page.fireEvent("pbtColorChanged",jdt_someValue,jdt_someValue.value,"pbtcolor")
}

			this.items=[
			{
				xtype:"label",
				id:"label",
				text:"外框颜色：",
				x:10,
				y:15
			},
			{
				xtype:"vmd.ux.ColorSelect",
				id:"jdt_borderColor",
				layout:"fit",
				x:70,
				y:10,
				width:160
			},
			{
				xtype:"label",
				id:"label1",
				text:"填充颜色：",
				x:10,
				y:55
			},
			{
				xtype:"textfield",
				id:"jdt_innerColorText",
				allowBlank:true,
				enableKeyEvents:true,
				x:70,
				y:50,
				style:"border: 1px solid #dddddd",
				width:160
			},
			{
				xtype:"vmd.ux.ColorSelect",
				id:"jdt_innerColor",
				layout:"fit",
				x:70,
				y:90,
				width:200,
				colorchange:"innerColor_colorchange",
				listeners:{
					colorchange:innerColor_colorchange
				}
			},
			{
				xtype:"label",
				id:"label2",
				text:"值：",
				x:45,
				y:134
			},
			{
				xtype:"textfield",
				id:"jdt_someValue",
				allowBlank:true,
				enableKeyEvents:true,
				x:70,
				y:130,
				width:200,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"label",
				id:"label3",
				text:"边距",
				x:25,
				y:175
			},
			{
				xtype:"label",
				id:"label4",
				text:"上：",
				x:48,
				y:205
			},
			{
				xtype:"label",
				id:"label5",
				text:"左：",
				x:170,
				y:205
			},
			{
				xtype:"label",
				id:"label6",
				text:"下：",
				x:48,
				y:245
			},
			{
				xtype:"label",
				id:"label7",
				text:"右：",
				x:170,
				y:245
			},
			{
				xtype:"textfield",
				id:"jdt_btop",
				allowBlank:true,
				enableKeyEvents:true,
				x:80,
				y:200,
				width:60,
				style:"border: 1px solid #dddddd",
				afterrender:"btop_afterrender",
				listeners:{
					vmdafterrender:btop_afterrender
				}
			},
			{
				xtype:"textfield",
				id:"jdt_bright",
				allowBlank:true,
				enableKeyEvents:true,
				x:200,
				y:240,
				width:60,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"textfield",
				id:"jdt_bleft",
				allowBlank:true,
				enableKeyEvents:true,
				x:200,
				y:200,
				width:60,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"textfield",
				id:"jdt_bbottom",
				allowBlank:true,
				enableKeyEvents:true,
				x:80,
				y:240,
				width:60,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:30,
				height:15,
				x:260,
				y:210,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/下.png\" />",
				click:"div_click",
				listeners:{
					click:div_click
				}
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
				x:140,
				y:250,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/下.png\" />",
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
				x:140,
				y:210,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/下.png\" />",
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
				x:260,
				y:250,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/下.png\" />",
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
				x:260,
				y:240,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/上.png\" />",
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
				x:140,
				y:240,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/上.png\" />",
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
				x:260,
				y:200,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/上.png\" />",
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
				x:140,
				y:200,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/上.png\" />",
				click:"div7_click",
				listeners:{
					click:div7_click
				}
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"...",
				type:"(none)",
				size:"small",
				x:240,
				y:50,
				width:28,
				height:24
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getInfo= function(att){
var temp;
if(att == "jdt_borderColor") {
    temp = jdt_borderColor.getSelColor();
} else if(att == "jdt_innerColor") {
    temp = jdt_innerColor.getSelColor()
} else if(att == "jdt_innerColorText") {
    temp = jdt_innerColorText.getValue()
} else if(att == "jdt_someValue") {
    temp = jdt_someValue.getValue()
} else if(att == "jdt_btop") {
    temp = jdt_btop.getValue()
} else if(att == "jdt_bleft") {
    temp = jdt_bleft.getValue()
} else if(att == "jdt_bright") {
    temp = jdt_bright.getValue()
} else if(att == "jdt_bbottom") {
    temp = jdt_bbottom.getValue()
}
return temp;
	}
		this.setInfo= function(info,cell){
if(info) {
    jdt_borderColor.setOriColor(info.jdt_borderColor.value)
    jdt_borderColor.setColorDiv(info.jdt_borderColor.value)
    jdt_innerColor.setOriColor(info.jdt_innerColor.value)
    jdt_innerColor.setColorDiv(info.jdt_innerColor.value)
    jdt_innerColorText.setValue(info.jdt_innerColorText.value)
    jdt_someValue.setValue(info.jdt_someValue.value)
    jdt_btop.setValue(info.jdt_btop.value)
    jdt_bleft.setValue(info.jdt_bleft.value)
    jdt_bright.setValue(info.jdt_bright.value)
    jdt_bbottom.setValue(info.jdt_bbottom.value)
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ProgressBarType");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ProgressBarType");
	}
})