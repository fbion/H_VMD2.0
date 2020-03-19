Ext.define("vmd.ux.ColorPanel" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ColorPanel",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:621,
	layout:"absolute",
	afterrender:"ColorPanel_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.ColorPanel_afterrender(this)
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
			var value = '',
    selectColor = '';
var colorShow, myColorPicker;
var page = this
var cp;

function setColorValue(color) {
    value = color
    selectColor = color;
    cp = new Ext.ColorPalette({
        value: value,
    });
}
// 设置图框背景颜色
function setBackColor(selColor) {
    if(selColor) {
        colorShow = vmd.getElement(display.id);
        if(selColor.indexOf('#') == -1) {
            colorShow.applyStyles('backgroundColor:#' + selColor);
        } else {
            colorShow.applyStyles('backgroundColor:' + selColor);
        }
    }
}

function button_click(sender, e) {
    // 语言设置
    dhtmlXColorPicker.prototype.i18n.zn = {
        labelHue: "H",
        labelSat: "S",
        labelLum: "L",
        labelRed: "R",
        labelGreen: "g",
        labelBlue: "B",
        btnSelect: "选择",
        btnCancel: "取消"
    }
    myColorPicker = new dhtmlXColorPicker({
        input: myAnchor.id,
        color: value,
        closeable: false
    });
    myColorPicker.loadUserLanguage('zn');
    myColorPicker.show();
    var myEvent = myColorPicker.attachEvent("onSelect", function(color, node) {
        selectColor = color
        page.fireEvent('bgColorChange', colorDisplay, selectColor);
        myColorPicker.unload();
        myColorPicker = null;
        temp = vmd.getElement(myAnchor.id);
        temp.applyStyles('backgroundColor:#fff')
        colorShow = vmd.getElement(display.id);
        colorShow.applyStyles('backgroundColor:' + selectColor)
    });
    var myEvent = myColorPicker.attachEvent("onCancel", function(color, node) {
        myColorPicker.unload();
        myColorPicker = null;
    });
}

function colorDisplay_afterrender(sender) {
    var cp = new Ext.ColorPalette();
    cp.colors = ['000000', '993300', '333300', '003300', '003366', '000080', '333399', '333333', '800000', 'FF6600', '808000', '008000', '008080', '0000FF', '666699', '808080', 'FF0000', 'FF9900', '99CC00', '339966', '33CCCC', '3366FF', '800080', '969696', 'FF00FF', 'FFCC00', 'FFFF00', '00FF00', '00FFFF', '00CCFF', '993366', 'C0C0C0', 'FF99CC', 'FFCC99', 'FFFF99', 'CCFFCC', 'CCFFFF', '99CCFF', 'CC99FF', 'FFFFFF'];
    cp.render(colorDisplay.id);
    cp.on('select', function(palette, color) {
        
        selectColor = "#" + color;
        // ct.setValue('#' + color)
        page.fireEvent('bgColorChange', colorDisplay, selectColor);
        colorShow = vmd.getElement(display.id);
        colorShow.applyStyles('backgroundColor:' + selectColor);
    });
}

function ColorPanel_afterrender(sender) {
    colorShow = vmd.getElement(display.id);
    colorShow.applyStyles('backgroundColor:' + selectColor);
}

function myAnchor_click(sender, e) {

}

function colorSelectInner_afterrender(sender) {

}
			this.ColorPanel_afterrender=ColorPanel_afterrender;
		this.items=[
			{
				xtype:"vmd.div",
				id:"colorDisplay",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:150,
				height:160,
				x:70,
				y:40,
				afterrender:"colorDisplay_afterrender",
				listeners:{
					vmdafterrender:colorDisplay_afterrender
				}
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"其他颜色",
				type:"(none)",
				size:"small",
				width:150,
				height:30,
				x:70,
				y:170,
				click:"button_click",
				style:"border: none",
				listeners:{
					click:button_click
				}
			},
			{
				xtype:"vmd.div",
				id:"display",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:230,
				height:30,
				x:30,
				y:250
			},
			{
				xtype:"label",
				id:"label",
				text:"背景颜色：",
				x:10,
				y:10
			},
			{
				xtype:"label",
				id:"label1",
				text:"示例颜色：",
				x:10,
				y:220
			},
			{
				xtype:"vmd.div",
				id:"myAnchor",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:20,
				height:30,
				x:10,
				y:280,
				hidden:false,
				click:"myAnchor_click",
				listeners:{
					click:myAnchor_click
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setOriColor= function(color){
//直接填写方法内容
setColorValue(color)
	}
		this.setColorDiv= function(selColor){
//直接填写方法内容
setBackColor(selColor)
	}
		this.getSelColor= function(){
//直接填写方法内容
return selectColor; 
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ColorPanel");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ColorPanel");
	}
})