Ext.define("vmd.ux.FontInfo" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.FontInfo",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:621,
	layout:"absolute",
	afterrender:"FontInfo_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.FontInfo_afterrender(this)
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
//font family 字体
var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['EnName', 'name']
});
var data = [{
    EnName: 'SimSun',
    name: '宋体'
}, {
    EnName: 'SimHei',
    name: '黑体'
}, {
    EnName: 'Microsoft YaHei',
    name: '微软雅黑'
}, {
    EnName: 'Microsoft JhengHei',
    name: '微软正黑体'
}, {
    EnName: 'NSimSun',
    name: '新宋体'
}, {
    EnName: 'PMingLiU',
    name: '新细明体'
}, {
    EnName: 'FangSong',
    name: '仿宋'
}, {
    EnName: 'KaiTi',
    name: '楷体'
}, {
    EnName: 'FangSong_GB2312',
    name: '仿宋_GB2312'
}, {
    EnName: 'KaiTi_GB2312',
    name: '楷体_GB2312'
}, {
    EnName: 'STHeiti Light',
    name: '华文细黑'
}];
store.loadData(data);
///////////////////////////////////////
//shape 字形
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'shapeType']
});
var data1 = [{
    id: 'normal',
    shapeType: '常规'
}, {
    id: 'italic',
    shapeType: '倾斜'
}, {
    id: 'bold',
    shapeType: '加粗'
}, {
    id: 'double',
    shapeType: '加粗倾斜'
}]
store1.loadData(data1);
///////////////////////////////////////
//font size 字号
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['size', 'px']
});
var data2 = [{
        size: '6',
        px: '6'
    }, {
        size: '8',
        px: '8'
    }, {
        size: '9',
        px: '9'
    },
    {
        size: '10',
        px: '10'
    }, {
        size: '10.5',
        px: '10.5'
    }, {
        size: '11',
        px: '11'
    }, {
        size: '12',
        px: '12'
    },
    {
        size: '14',
        px: '14'
    }, {
        size: '15',
        px: '15'
    }, {
        size: '16',
        px: '16'
    }, {
        size: '18',
        px: '18'
    },
    {
        size: '20',
        px: '20'
    }, {
        size: '22',
        px: '22'
    }, {
        size: '24',
        px: '24'
    }, {
        size: '26',
        px: '26'
    }, {
        size: '28',
        px: '28'
    }, {
        size: '36',
        px: '36'
    }, {
        size: '48',
        px: '48'
    }, {
        size: '54',
        px: '54'
    }, {
        size: '72',
        px: '72'
    }
];
store2.loadData(data2);
////////////////////////////////////////

function fontFamily_afterrender(sender) {
    fontFamily.store = store;
    fontFamily.displayField = 'name';
    fontFamily.valueField = 'EnName'
}


function fontShape_afterrender(sender) {
    fontShape.store = store1;
    fontShape.displayField = 'shapeType';
    fontShape.valueField = 'id';
}

function fontSize_afterrender(sender) {
    fontSize.store = store2;
    fontSize.displayField = 'size';
    fontSize.valueField = 'px';
}

function FontInfo_afterrender(sender) {
    fontFamily_afterrender();
    fontShape_afterrender();
    fontSize_afterrender();
}

function setInfo(info, cell) {
    // 
    page.selectCells = cell;
    if(info) {
        fontFamily.setValue(info.fontFamily.value);
        fontShape.setValue(info.fontShape.value);
        fontSize.setValue(info.fontSize.value);
        // 
        if(info.underline.value && info.underline.value.inputValue) {
            underline.setValue(info.underline.value.inputValue);
        } else {
            underline.setValue(info.underline.value);
        }
        setColorValue(info.ColorSelect.value)
        setBackColor(info.ColorSelect.value)
        // ColorSelect.setOriColor("#5e5e5e")
    }
}

function underline_change(sender, checked) {
    page.fireEvent('underlineChecked', underline, checked)
}

function fontColorSelect_colorchange(sender, selColor) {

}

function showColor(value) {
    if(isCp) {
        return
    }
    var cValue = value;
    var colors = ['000000', '993300', '333300', '003300', '003366', '000080', '333399', '333333', '800000', 'FF6600', '808000', '008000', '008080', '0000FF', '666699', '808080', 'FF0000', 'FF9900', '99CC00', '339966', '33CCCC', '3366FF', '800080', '969696', 'FF00FF', 'FFCC00', 'FFFF00', '00FF00', '00FFFF', '00CCFF', '993366', 'C0C0C0', 'FF99CC', 'FFCC99', 'FFFF99', 'CCFFCC', 'CCFFFF', '99CCFF', 'CC99FF', 'FFFFFF', 'DDDDDD', 'EEEEEE'];
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
        page.fireEvent('colorChanged', fontColorSelect, "#" + color);
        // page.fireEvent('colorChanged', fontColorSelect, selColor)
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
        colorShow = vmd.getElement(fontColorSelect.id);
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
        page.fireEvent('colorChanged', fontColorSelect, color);
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
    colorShow = vmd.getElement(fontColorSelect.id);
    colorShow.applyStyles('backgroundColor:#' + value);
}

function setColorValue(color) {
    value = color
    selectColor = color;
}

function fontColorSelect_beforerender(sender){

}

function fontColorSelect_click(sender,e){

}
			this.FontInfo_afterrender=FontInfo_afterrender;
		this.items=[
			{
				xtype:"vmd.comlist",
				id:"fontFamily",
				width:220,
				height:270,
				x:50,
				y:10,
				afterrender:"fontFamily_afterrender",
				query:false,
				listeners:{
					vmdafterrender:fontFamily_afterrender
				}
			},
			{
				xtype:"vmd.comlist",
				id:"fontShape",
				width:220,
				height:270,
				x:50,
				y:50,
				afterrender:"fontShape_afterrender",
				listeners:{
					vmdafterrender:fontShape_afterrender
				}
			},
			{
				xtype:"vmd.comlist",
				id:"fontSize",
				width:220,
				height:270,
				x:50,
				y:90,
				afterrender:"fontSize_afterrender",
				listeners:{
					vmdafterrender:fontSize_afterrender
				}
			},
			{
				xtype:"radiostoregroup",
				id:"underline",
				width:190,
				height:30,
				labelField:"label",
				valueField:"value",
				checkedField:"checked",
				boxFieldName:"myRadio",
				x:60,
				y:140,
				change:"underline_change",
				listeners:{
					change:underline_change
				},
				items:[
					{
						xtype:"radio",
						id:"hwRadio",
						boxLabel:"有下划线",
						inputValue:"Y"
					},
					{
						xtype:"radio",
						id:"hwRadio1",
						boxLabel:"无下划线",
						checked:true,
						inputValue:"N"
					}
				]
			},
			{
				xtype:"label",
				id:"label",
				text:"字体：",
				x:10,
				y:10
			},
			{
				xtype:"label",
				id:"label1",
				text:"字形：",
				x:10,
				y:50
			},
			{
				xtype:"label",
				id:"label2",
				text:"字号：",
				x:10,
				y:90
			},
			{
				xtype:"label",
				id:"label3",
				text:" 下划线：",
				x:0,
				y:140,
				width:60,
				height:20
			},
			{
				xtype:"label",
				id:"label4",
				text:"颜色：",
				x:10,
				y:182,
				height:20
			},
			{
				xtype:"vmd.div",
				id:"fontColorSelect",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:150,
				height:30,
				x:60,
				y:180,
				click:"fontColorSelect_click",
				listeners:{
					click:fontColorSelect_click
				}
			},
			{
				xtype:"vmd.button",
				id:"button",
				type:"(none)",
				size:"small",
				x:210,
				y:180,
				icon:"icon-caret-down",
				style:"border-radius: 0;    background-size: 120%;    background-position: right;    border: 0;    float: right",
				width:22,
				height:25,
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
				y:210,
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
				width:20,
				height:50,
				x:40,
				y:210
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.fontSetInfo= function(info,cell){
//直接填写方法内容
setInfo(info,cell);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.FontInfo");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FontInfo");
	}
})