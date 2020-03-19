Ext.define("vmd.ux.StyleProperty" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.NewNumber$1.0$NewNumber"]),
	version:"1.0",
	xtype:"vmd.ux.StyleProperty",
	title:"Panel",
	header:false,
	border:false,
	width:290,
	height:672,
	layout:"fit",
	afterrender:"StyleProperty_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.StyleProperty_afterrender(this)
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
			function StyleProperty_afterrender(sender) {

}
var page = this;

function setStyleInfo(info, sheet, cell) {
    page.info = info;
    page.cells = cell;
    page.o = sheet;
    d = page.info.cellAttributeInfo.cellInfoToJson();
    NewNumber.setInfo(d)
}

function AlignProperty_afterrender(sender) {

}

function FontInfo_colorChanged(sender, color) {
    setCellStyle(color, "fontColor", sender);
}

function FontInfo_underlineChecked(sender, check) {
    setCellStyle(check, "underline", sender);
}


function setCellStyle(value, type, sender) {
    if(page.cells) {
        for(var i = 0; i < page.cells.length; i++) {
            // sender.initialConfig.id
            var r = page.cells[i].r;
            var c = page.cells[i].c;
            var temp = page.o.getCellMeta(r, c).cellAttributeInfo
            temp.setCellInfos(sender.initialConfig.id, value)
            page.o.setCellMeta(r, c, 'cellAttributeInfo', temp)
        }
    }
}

//自加自减按钮
function NewNumber_decimalChanged(sender, value, typeName) {
    if(typeName == "myNumber") {
        setCellStyle(value, null, sender)
    } else if(typeName == "myCurrency") {
        setCellStyle(value, null, sender)
    } else if(typeName == "myAccounting") {
        setCellStyle(value, null, sender)
    } else if(typeName == "myPercentage") {
        setCellStyle(value, null, sender)
    } else if(typeName == "mySciCounting") {
        setCellStyle(value, null, sender)
    }
}

//背景色
function ColorSelectInner_bgColorChange(sender, color) {
    setCellStyle(color, "colorSelectInner", sender);
}
// 单元格边框背景色
function Borderline_colorChanged(sender, color) {
    setCellStyle(color, "borderColor", sender);
}
// 单元格边框线样式
function Borderline_borderStyleChanged(sender, lineStyle) {
    setCellStyle(lineStyle, "borderLineStyle", sender);
}
			this.StyleProperty_afterrender=StyleProperty_afterrender;
		this.items=[
			{
				xtype:"vmd.ux.NewNumber",
				id:"NewNumber",
				layout:"absolute",
				decimalChanged:"NewNumber_decimalChanged",
				listeners:{
					decimalChanged:NewNumber_decimalChanged
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setStyleInfo= function(info,sheet,cell){
//直接填写方法内容
setStyleInfo(info,sheet,cell);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.StyleProperty");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.StyleProperty");
	}
})