Ext.define("vmd.ux.Borderline" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.LineStyle$1.0$LineStyle"]),
	version:"1.0",
	xtype:"vmd.ux.Borderline",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:621,
	layout:"absolute",
	afterrender:"Borderline_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.Borderline_afterrender(this)
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
			var isCp = false,
    isCpPick = false; // 颜色面板是否已存在
var value = '',
    selectColor = '';
var colorShow, myColorPicker;
var page = this

var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['borderStyle', 'describe']
});
//上框线top 下框线below 左left 右right 无none 所有all 
// 外侧outer 粗匣bold 粗底bold-below 上和粗下top-boldbelow
var data = [{
    borderStyle: 'top',
    img_dis: "/system/img/report/border/borderTop.png",
    describe: '上框线'
}, {
    borderStyle: 'below',
    img_dis: "/system/img/report/border/borderBottom.png",
    describe: '下框线'
}, {
    borderStyle: 'left',
    img_dis: "/system/img/report/border/borderLeft.png",
    describe: '左框线'
}, {
    borderStyle: 'right',
    img_dis: "/system/img/report/border/borderRight.png",
    describe: '右框线'
}, {
    borderStyle: 'none',
    img_dis: "/system/img/report/border/borderNone.png",
    describe: '无框线'
}, {
    borderStyle: 'all',
    img_dis: "/system/img/report/border/BordersAll.png",
    describe: '所有框线'
}, {
    borderStyle: 'outer',
    img_dis: "/system/img/report/border/borderOutside.png",
    describe: '外侧框线'
}, {
    borderStyle: 'bold',
    img_dis: "/system/img/report/border/BorderThickOutside.png",
    describe: '粗匣框线'
}, {
    borderStyle: 'bold-below',
    img_dis: "/system/img/report/border/BorderThickBottom.png",
    describe: '粗底框线'
}, {
    borderStyle: 'top-below',
    img_dis: "/system/img/report/border/BorderTopAndBottom.png",
    describe: '上框线和下框线'
}, {
    borderStyle: 'top-boldbelow',
    img_dis: "/system/img/report/border/BorderTopAndThickBottom.png",
    describe: '上框线和粗下框线'
}];
store.loadData(data);

function comlist_afterrender(sender) {
    // BorderStyle.store = store;
    // BorderStyle.displayField = 'describe';
    // BorderStyle.valueField = 'borderStyle'
    // var list = BorderStyle.getList();
    // Ext.each(list.children, function(item, index) {
    //     var imgPath = data[index] && data[index].img_dis;
    //     if(!imgPath) return;
    //     item.firstChild.style.backgroundImage = "url(" + imgPath + ")";
    //     item.firstChild.style.backgroundRepeat = "no-repeat";
    //     item.firstChild.style.backgroundPosition = "left center";
    //     item.firstChild.style.paddingLeft = "18px";
    // })
}

function combo_beforerender(sender) {
    BorderStyle.store = store;
    BorderStyle.displayField = 'describe';
    BorderStyle.valueField = 'borderStyle'
}

function combo_afterrender(sender) {
    var list = BorderStyle.getList();
    Ext.each(list.children, function(item, index) {
        var imgPath = data[index] && data[index].img_dis;
        if(!imgPath) return;
        item.firstChild.style.backgroundImage = "url(" + imgPath + ")";
        item.firstChild.style.backgroundRepeat = "no-repeat";
        item.firstChild.style.backgroundPosition = "left center";
        item.firstChild.style.paddingLeft = "18px";
    })
}

function ColorSelect_colorchange(sender, selColor) {
    // page.fireEvent('colorChanged', ColorSelect, selColor)
}

function LineStyle_lineChagen(sender, line) {
    page.fireEvent('borderStyleChanged', LineStyle, line)
}

function showColor(value) {
    if(isCp) {
        return
    }
    var cValue = value;
    var colors = ['000000', '993300', '333300', '003300', '003366', '000080', '333399', '333333', '800000', 'FF6600', '808000', '008000', '008080', '0000FF', '666699', '808080', 'FF0000', 'FF9900', '99CC00', '339966', '33CCCC', '3366FF', '800080', '969696', 'FF00FF', 'FFCC00', 'FFFF00', '00FF00', '00FFFF', '00CCFF', '993366', 'C0C0C0', 'FF99CC', 'FFCC99', 'FFFF99', 'CCFFCC', 'CCFFFF', '99CCFF', 'CC99FF', 'FFFFFF'];
    if(value.indexOf("#") != -1) {
        cValue = value.slice(1);
    }
    if(!isInArray(colors, cValue)) {
        cValue = '';
    }
    var cp = new Ext.ColorPalette({
        value: cValue,
    });
    cp.colors = colors;
    cp.render(myColor.id);
    cp.on('select', function(palette, color) {
        selectColor = "#" + color;
        setBackColor(color);
        page.fireEvent('colorChanged', ColorSelect, "#" + color);
        // page.fireEvent('colorChanged', ColorSelect, selColor)
        myColor.hide();
        if(isCpPick) {
            myColorPicker.unload();
            myColorPicker = null;
            isCpPick = false;
        }
    });
    isCp = true;
}

function isInArray(arr, value) {
    for(var i = 0; i < arr.length; i++) {
        if(value === arr[i]) {
            return true;
        }
    }
    return false;
}

function button_click(sender, e) {
    if(myColor.hidden) {
        myColor.show();
        showColor(value);
    } else {
        myColor.hide();
        if(isCpPick) {
            myColorPicker.unload();
            myColorPicker = null;
            isCpPick = false;
        }
    }
}
// 设置图框背景颜色
function setBackColor(selColor) {
    if(selColor) {
        colorShow = vmd.getElement(ColorSelect.id);
        if(selColor.indexOf('#') == -1) {
            colorShow.applyStyles('backgroundColor:#' + selColor);
        } else {
            colorShow.applyStyles('backgroundColor:' + selColor);
        }
    }
}

function button1_click(sender, e) {
    
    // if(isCpPick) {
    //     return;
    // }
    myColor.hide()
    isCpPick = true;
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
        // parent: document.body,
        input: myAnchor.id,
        color: value,
        closeable: false
    });
    myColorPicker.loadUserLanguage('zn');
    myColorPicker.show();
    myColorPicker.setPosition(100, 100)
    var myEvent = myColorPicker.attachEvent("onSelect", function(color, node) {
        
        selectColor = color;
        page.fireEvent('colorChanged', ColorSelect, color);
        temp = vmd.getElement(myAnchor.id);
        temp.applyStyles('backgroundColor:#fff');
        setBackColor(color)
        myColor.hide();
        myColorPicker.unload();
        myColorPicker = null;
        isCpPick = false
    });
    var myEvent = myColorPicker.attachEvent("onCancel", function(color, node) {
        myColorPicker.unload();
        myColorPicker = null;
        isCpPick = false
    });
}

function ColorSelect_afterrender(sender) {
    colorShow = vmd.getElement(ColorSelect.id);
    colorShow.applyStyles('backgroundColor:#' + value);
}

function setColorValue(color) {
    value = color
    selectColor = color;
}

function setInfo(info, cell) {
    //直接填写方法内容
    if(info) {
        
        LineStyle.setOriLine(info.LineStyle.value);
        BorderStyle.setValue(info.BorderStyle.value)
        // ColorSelect.setOriColor("#5e5e5e")
        setBackColor(info.ColorSelect.value)
        setColorValue(info.ColorSelect.value)
    }
}

function Borderline_afterrender(sender){

}
			this.Borderline_afterrender=Borderline_afterrender;
		this.items=[
			{
				xtype:"vmd.ux.LineStyle",
				id:"LineStyle",
				layout:"fit",
				x:60,
				y:10,
				width:160,
				lineChagen:"LineStyle_lineChagen",
				listeners:{
					lineChagen:LineStyle_lineChagen
				}
			},
			{
				xtype:"label",
				id:"label",
				text:"样式：",
				x:10,
				y:10
			},
			{
				xtype:"label",
				id:"label1",
				text:"颜色：",
				x:10,
				y:110
			},
			{
				xtype:"label",
				id:"label2",
				text:"边框：",
				x:10,
				y:60
			},
			{
				xtype:"vmd.combo",
				id:"BorderStyle",
				width:160,
				x:60,
				y:50,
				beforerender:"combo_beforerender",
				afterrender:"combo_afterrender",
				style:"border: 1px solid #dddddd",
				listeners:{
					beforerender:combo_beforerender,
					vmdafterrender:combo_afterrender
				}
			},
			{
				xtype:"vmd.div",
				id:"ColorSelect",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:150,
				height:30,
				x:60,
				y:100,
				afterrender:"ColorSelect_afterrender",
				listeners:{
					vmdafterrender:ColorSelect_afterrender
				}
			},
			{
				xtype:"vmd.button",
				id:"button",
				type:"(none)",
				size:"small",
				x:210,
				y:100,
				style:"border-radius: 0;    background-size: 120%;    background-position: right;    border: 0;    float: right",
				width:22,
				height:25,
				icon:"icon-caret-down",
				click:"button_click",
				listeners:{
					click:button_click
				}
			},
			{
				xtype:"vmd.div",
				id:"myColor",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:150,
				height:160,
				x:60,
				y:130,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"vmd.button",
						id:"button1",
						text:"其他颜色",
						type:"(none)",
						size:"small",
						x:1.5,
						y:130,
						width:145,
						click:"button1_click",
						style:"border:none;",
						listeners:{
							click:button1_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"myAnchor",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:10,
				height:40,
				x:50,
				y:130
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getBorderLineInfo= function(att){
//直接填写方法内容
var a;
if(att == "BorderStyle") {
    a = BorderStyle.getValue()
} else if(att == "LineStyle") {
    a = LineStyle.getLine()
} else if(att == "ColorSelect") {
    a = ColorSelect.getSelColor()
}
return a;
	}
		this.setBorderLineInfo= function(info,cell){
setInfo(info,cell)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Borderline");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Borderline");
	}
})