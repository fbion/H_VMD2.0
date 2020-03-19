Ext.define("vmd.ux.RichTextType" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.RichTextType",
	title:"Panel",
	header:false,
	border:false,
	width:290,
	height:621,
	layout:"absolute",
	beforerender:"RichTextType_beforerender",
	listeners:{
		beforerender:function(){
	this.RichTextType_beforerender(this)
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

function indent_afterrender(sender) {
    fwb_indent.setValue("0")
}

function div_click(sender, e) {
    fwb_indent.setValue(parseFloat(fwb_indent.getValue()) + 1)
    page.fireEvent("rtDecimalChanged",fwb_indent,fwb_indent.value,"fwbindent")
}

function div1_click(sender, e) {
    if(parseFloat(fwb_indent.getValue()) <= 1) {
        fwb_indent.setValue("0")
        page.fireEvent("rtDecimalChanged",fwb_indent,fwb_indent.value,"fwbindent")
    } else {
        fwb_indent.setValue(parseFloat(fwb_indent.getValue()) - 1)
        page.fireEvent("rtDecimalChanged",fwb_indent,fwb_indent.value,"fwbindent")
    }
}

function allowEmpty_check(sender, checked) {
    if(fwb_allowEmpty.checked) {
        fwb_emptyAlert.hide()
        aa.hide()
    } else {
        fwb_emptyAlert.show()
        aa.show()
        fwb_emptyAlert.setValue('');
        page.fireEvent("change",fwb_emptyAlert,"")
    }
}

function RichTextType_beforerender(sender){

}
			this.RichTextType_beforerender=RichTextType_beforerender;
		this.items=[
			{
				xtype:"checkbox",
				id:"fwb_allowEdit",
				fieldLabel:"Checkbox",
				boxLabel:"允许编辑",
				x:10,
				y:10,
				checked:true
			},
			{
				xtype:"checkbox",
				id:"fwb_allowPrint",
				fieldLabel:"Checkbox",
				boxLabel:"允许打印",
				x:10,
				y:40,
				checked:true
			},
			{
				xtype:"label",
				id:"label",
				text:"段前缩进：",
				x:10,
				y:75
			},
			{
				xtype:"textfield",
				id:"fwb_indent",
				allowBlank:true,
				enableKeyEvents:true,
				x:70,
				y:70,
				style:"border: 1px solid #dddddd",
				width:70,
				afterrender:"indent_afterrender",
				listeners:{
					vmdafterrender:indent_afterrender
				}
			},
			{
				xtype:"label",
				id:"label1",
				text:"校验",
				x:10,
				y:110
			},
			{
				xtype:"label",
				id:"label2",
				text:"——————————————————",
				x:40,
				y:110,
				style:"color: #dddddd"
			},
			{
				xtype:"checkbox",
				id:"fwb_allowEmpty",
				fieldLabel:"Checkbox",
				boxLabel:"允许为空",
				x:10,
				y:140,
				width:80,
				checked:true,
				check:"allowEmpty_check",
				listeners:{
					check:allowEmpty_check
				}
			},
			{
				xtype:"label",
				id:"aa",
				text:"提示信息：",
				x:10,
				y:175,
				hidden:true
			},
			{
				xtype:"textfield",
				id:"fwb_emptyAlert",
				allowBlank:true,
				enableKeyEvents:true,
				x:70,
				y:170,
				style:"border: 1px solid #dddddd",
				disabled:false,
				hidden:true
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
				x:120,
				y:70,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/上.png\" />",
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
				x:120,
				y:80,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/下.png\" />",
				click:"div1_click",
				listeners:{
					click:div1_click
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getInfo= function(att){
var temp;
if(att == "fwb_allowEdit") {
    temp = fwb_allowEdit.getValue()
} else if(att == "fwb_allowPrint") {
    temp = fwb_allowPrint.getValue()
} else if(att == "fwb_indent") {
    temp = fwb_indent.getValue()
} else if(att == "fwb_allowEmpty") {
    temp = fwb_allowEmpty.getValue()
} else if(att == "fwb_emptyAlert") {
    temp = fwb_emptyAlert.getValue()
}
return temp
	}
		this.setInfo= function(info,cell){
if(info){
    fwb_allowEdit.setValue(info.fwb_allowEdit.checked)
    fwb_allowPrint.setValue(info.fwb_allowPrint.checked)
    fwb_indent.setValue(info.fwb_indent.value)
    fwb_allowEmpty.setValue(info.fwb_allowEmpty.checked)
    fwb_emptyAlert.setValue(info.fwb_emptyAlert.value)
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.RichTextType");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.RichTextType");
	}
})