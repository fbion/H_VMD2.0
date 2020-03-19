Ext.define("vmd.ux.Segmentation" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Segmentation",
	title:"Panel",
	header:false,
	border:false,
	width:296,
	height:560,
	layout:"absolute",
	afterrender:"Segmentation_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.Segmentation_afterrender(this)
}
	},
	uxCss:".b{    border: 1px solid #dddddd}",
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
			// // 时间 2018-10-24
// // ykhy

function Segmentation_afterrender(sender) {
    // sr = 0;
    // er = 0;
    // sc = 0;
    // ec = 0;
    // seg_columnsMargin.setValue(0)
    // seg_columnsNumber.setValue(1)
    // flsr.setValue(sr)
    // fler.setValue(er)
    // flsc.setValue(sc)
    // flec.setValue(ec)
    // flcg.flSRow.value = sr;
    // flcg.flERow.value = er;
    // flcg.flSCol.value = sc;
    // flcg.flECol.value = ec;
}

function clearPanel() {
    // seg_columnsNumber.setValue(1);
    // seg_style.setValue('')
    // seg_dividingLine.setValue('')
    // seg_columnsMargin.setValue(0)
    // seg_applyTo.setValue('')
    // seg_condition.setValue('')
    // flsr.setValue(sr)
    // fler.setValue(er)
    // flsc.setValue(sc)
    // flec.setValue(ec)
}

var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
});
var data = [{
    id: '1',
    name: '先横向后纵向'
}, {
    id: '0',
    name: '先纵向后横向'
}];
store.loadData(data);
//////////////////////////////////////////////////
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
});
var data1 = [{
    id: '0',
    name: '整张报表'
}, {
    id: '1',
    name: '选中区域'
}];
store1.loadData(data1);
//////////////////////////////////////////////////
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
});
var data2 = [{
    id: '0',
    name: '纸张大小'
}, {
    id: '1',
    name: '均分数据行数'
}];
store2.loadData(data2);
//////////////////////////////////////////////////

function seg_style_afterrender(sender) {
    sender.store = store;
    sender.displayField = "name";
    sender.valueField = "id"
}

function seg_applyTo_afterrender(sender) {
    sender.store = store1;
    sender.displayField = "name";
    sender.valueField = "id"
}

function seg_condition_afterrender(sender) {
    sender.store = store2;
    sender.displayField = "name"
    sender.valueField = "id"
}
// /////////////////////////////////////////////////////

var page = this;
// var flList = parent.grid.flList;
// var cell = parent.selectCells;
// var flcg = new parent.flSetting();
// var no;

// var sr = minRowIndex(cell);
// var er = maxRowIndex(cell);
// var sc = minColIndex(cell);
// var ec = maxColIndex(cell);

// var celllt = Ext.get(getSpanCell(parent, sr - 1, sc))
// var cellrt = Ext.get(getSpanCell(parent, sr - 1, ec))
// var celllb = Ext.get(getSpanCell(parent, er - 1, sc))
// var cellrb = Ext.get(getSpanCell(parent, er - 1, ec))

//页面监听
// this.on('afterrender', function() {
//     this.cascade(function(item) {
//         item.on('change', function(a, b, c) {
//             setInfo(a, b);
//         })
//         item.on("check", function(a, b, c) {
//             setInfo(a, b);
//         })
//         item.on("select", function(a, b, c) {
//             setInfo(a, b);
//         })
//     })
// })

function changeCSS(flag) {
    //画矩形
}

function div_click(sender, e) {
    // if(seg_columnsNumber.getValue() < 1) {
    //     seg_columnsNumber.setValue(1)
    //     setInfo(seg_columnsNumber, 1)
    // } else {
    //     seg_columnsNumber.setValue(parseFloat(seg_columnsNumber.getValue()) + 1)
    //     setInfo(seg_columnsNumber, seg_columnsNumber.getValue())
    // }
    // if(seg_columnsNumber.getValue() > 1) {
    //     allEnable()
    //     changeCSS(true)
    // }
    // if(flList[no]) {
    //     flList[no].seg_columnsNumber.value = seg_columnsNumber.getValue()
    // }
}

function div2_click(sender, e) {
    // if(seg_columnsNumber.getValue() <= 1) {
    //     seg_columnsNumber.setValue(1)
    //     setInfo(seg_columnsNumber, 1)
    // } else {
    //     seg_columnsNumber.setValue(parseFloat(seg_columnsNumber.getValue()) - 1)
    //     setInfo(seg_columnsNumber, seg_columnsNumber.getValue())
    // }

    // if(seg_columnsNumber.getValue() > 1) {
    //     allEnable()
    //     changeCSS(true)
    // } else if(seg_columnsNumber.getValue() <= 1) {
    //     allDisable()
    //     changeCSS(false)
    // }
    // if(flList[no]) {
    //     flList[no].seg_columnsNumber.value = seg_columnsNumber.getValue()
    // }
}

function div1_click(sender, e) {
//     seg_columnsMargin.setValue(parseFloat(seg_columnsMargin.getValue()) + 1)
//     setInfo(seg_columnsMargin, seg_columnsMargin.getValue())
}

function div3_click(sender, e) {
//     if(seg_columnsMargin.getValue() <= 0) {
//         seg_columnsMargin.setValue(0)
//         setInfo(seg_columnsMargin, 0)
//     } else {
//         seg_columnsMargin.setValue(parseFloat(seg_columnsMargin.getValue()) - 1)
//         setInfo(seg_columnsMargin, seg_columnsMargin.getValue())
//     }
}

// // //控制可用
// function allEnable() {
//     seg_dividingLine.enable()
//     seg_columnsMargin.enable()
//     seg_style.enable()
//     seg_applyTo.enable()
//     seg_condition.enable()
//     div1.enable()
//     div3.enable()
// }

// // //控制禁用
// function allDisable() {
//     seg_dividingLine.disable()
//     seg_columnsMargin.disable()
//     seg_style.disable()
//     seg_applyTo.disable()
//     seg_condition.disable()
//     div1.disable()
//     div3.disable()
// }

// //页面改变————> selectCells
// function setInfo(sender, value) {
//     var ces = celllt
//     // 
//     switch (sender.initialConfig.id) {
//         case 'seg_columnsNumber':
//             if(value > 1) {
//                 allEnable()
//                 changeCSS(true)
//             } else {
//                 allDisable()
//                 changeCSS(false)
//                 flcg = new parent.flSetting()
//             }
//             flcg.seg_columnsNumber.value = value;
//             break;
//         case 'seg_style':
//             // 
//             if(value.id) {
//                 flcg.seg_style.value = value.id;
//                 if(value.id == "0") {
//                     if(hasClass(ces, 'flLU')) {
//                         removeClass(ces, 'flLU')
//                         ces.addClass('flcf')
//                     } else if(hasClass(ces, 'fpLU')) {
//                         removeClass(ces, 'fpLU')
//                         ces.addClass('lpcf')
//                     } else if(hasClass(ces, 'flrf')) {
//                         removeClass(ces, 'flrf')
//                         ces.addClass('flcf')
//                     } else if(hasClass(ces, 'lprf')) {
//                         removeClass(ces, 'lprf')
//                         ces.addClass('lpcf')
//                     }
//                 }
//                 if(value.id == "1") {
//                     if(hasClass(ces, 'flLU')) {
//                         removeClass(ces, 'flLU')
//                         ces.addClass('flrf')
//                     } else if(hasClass(ces, 'fpLU')) {
//                         removeClass(ces, 'fpLU')
//                         ces.addClass('lprf')
//                     } else if(hasClass(ces, 'flcf')) {
//                         removeClass(ces, 'flcf')
//                         ces.addClass('flrf')
//                     } else if(hasClass(ces, 'lpcf')) {
//                         removeClass(ces, 'lpcf')
//                         ces.addClass('lprf')
//                     }
//                 }
//             }
//             break;
//         case 'seg_dividingLine':
//             if(value) {
//                 flcg.seg_dividingLine.value = value.inputValue;
//             }
//             break;
//         case 'seg_columnsMargin':
//             flcg.seg_columnsMargin.value = value;
//             break;
//         case 'seg_applyTo':
//             if(value.id) {
//                 flcg.seg_applyTo.value = value.id;
//             }
//             break;
//         case 'seg_condition':
//             if(value.id) {
//                 flcg.seg_condition.value = value.id;
//             }
//             break;
//         case 'flsc':
//             flcg.flSCol.value = value;
//             break;
//         case 'flsr':
//             flcg.flSRow.value = value;
//             break;
//         case 'fler':
//             flcg.flERow.value = value;
//             break;
//         case 'flec':
//             flcg.flECol.value = value;
//             break;
//     }
// }

function keyDisable() {
//     seg_columnsNumber.disable()
//     div.disable()
//     div2.disable()
}

function keyEnable() {
//     seg_columnsNumber.enable()
//     div.enable()
//     div2.enable()
}

// function setFlcg(key) {
//     flcg.seg_columnsNumber.value = flList[key].seg_columnsNumber.value
//     flcg.seg_style.value = flList[key].seg_style.value
//     flcg.seg_dividingLine.value = flList[key].seg_dividingLine.value
//     flcg.seg_columnsMargin.value = flList[key].seg_columnsMargin.value
//     flcg.seg_applyTo.value = flList[key].seg_applyTo.value
//     flcg.seg_condition.value = flList[key].seg_condition.value
//     flcg.flId.value = flList[key].flId.value
//     flcg.flSRow.value = flList[key].flSRow.value
//     flcg.flERow.value = flList[key].flERow.value
//     flcg.flSCol.value = flList[key].flSCol.value
//     flcg.flECol.value = flList[key].flECol.value

//     seg_columnsNumber.setValue(flList[key].seg_columnsNumber.value);
//     seg_style.setValue(flList[key].seg_style.value)
//     seg_dividingLine.setValue(flList[key].seg_dividingLine.value)
//     seg_columnsMargin.setValue(flList[key].seg_columnsMargin.value)
//     seg_applyTo.setValue(flList[key].seg_applyTo.value)
//     seg_condition.setValue(flList[key].seg_condition.value)
//     flsr.setValue(flList[key].flSRow.value)
//     fler.setValue(flList[key].flERow.value)
//     flsc.setValue(flList[key].flSCol.value)
//     flec.setValue(flList[key].flECol.value)
// }

// function checkON() {
//     flflag = false;
//     isNew = false;
//     ec = flec.getValue()
//     sc = flsc.getValue()
//     er = fler.getValue()
//     sr = flsr.getValue()
//     //判断是否是新分片 isNew
//     if(flList.length > 0) {
//         for(var key in flList) {
//             if(flList[key].flSRow) {
//                 if(
//                     //判断重合
//                     ((flList[key].flSCol.value <= sc && sc <= flList[key].flECol.value) && (flList[key].flSRow.value <= sr && sr <= flList[key].flERow.value)) ||
//                     ((flList[key].flSCol.value <= sc && sc <= flList[key].flECol.value) && (flList[key].flSRow.value <= er && er <= flList[key].flERow.value)) ||
//                     ((flList[key].flSCol.value <= ec && ec <= flList[key].flECol.value) && (flList[key].flSRow.value <= sr && sr <= flList[key].flERow.value)) ||
//                     ((flList[key].flSCol.value <= ec && ec <= flList[key].flECol.value) && (flList[key].flSRow.value <= er && er <= flList[key].flERow.value))
//                 ) {
//                     //判断全等
//                     if((ec == flList[key].flECol.value && flList[key].flSCol.value == sc && flList[key].flSRow.value == sr && er == flList[key].flERow.value)
//                         // || (ec == flcg.flECol.value && flcg.flSCol.value == sc && flcg.flSRow.value == sr && er == flcg.flERow.value)
//                     ) {
//                         flcg = flList[key]
//                         setFlcg(key)
//                         keyEnable()
//                         allEnable()
//                         flflag = true;
//                         isNew = false;
//                         no = key;
//                         break;
//                     } else {
//                         //判断嵌套
//                         flflag = false;
//                         changeCSS(false);
//                     }
//                 } else {
//                     //不重合情况
//                     if(
//                         //判断包围
//                         ((flList[key].flSCol.value <= sc && sc <= flList[key].flECol.value) && (flList[key].flSRow.value <= sr && sr <= flList[key].flERow.value)) ||
//                         ((flList[key].flSCol.value <= sc && sc <= flList[key].flECol.value) && (flList[key].flSRow.value <= er && er <= flList[key].flERow.value)) ||
//                         ((flList[key].flSCol.value <= ec && ec <= flList[key].flECol.value) && (flList[key].flSRow.value <= sr && sr <= flList[key].flERow.value)) ||
//                         ((flList[key].flSCol.value <= ec && ec <= flList[key].flECol.value) && (flList[key].flSRow.value <= er && er <= flList[key].flERow.value))
//                     ) {
//                         flflag = false;
//                         changeCSS(false);
//                     } else {
//                         //全新
//                         keyEnable()
//                         allDisable()
//                         flflag = true;
//                         isNew = true;
//                     }
//                 }
//             }
//         }
//     } else {
//         //全新
//         keyEnable()
//         allDisable()
//         flflag = true;
//         isNew = true;
//     }
// }

// //selectCell——>页面 && flcg
// function selfSet() {
//     checkON();
//     if(flflag && !isNew && flList.length > 0) {
//         //从flList里给面板赋值
//         flcg = flList[no];
//         seg_columnsNumber.setValue(flList[no].seg_columnsNumber.value);
//         seg_style.setValue(flList[no].seg_style.value)
//         seg_dividingLine.setValue(flList[no].seg_dividingLine.value)
//         seg_columnsMargin.setValue(flList[no].seg_columnsMargin.value)
//         seg_applyTo.setValue(flList[no].seg_applyTo.value)
//         seg_condition.setValue(flList[no].seg_condition.value)
//         flsr.setValue(flList[no].flSRow.value)
//         fler.setValue(flList[no].flERow.value)
//         flsc.setValue(flList[no].flSCol.value)
//         flec.setValue(flList[no].flECol.value)
//     } else if(!flflag) {
//         //有重叠，置空，keydisable
//         clearPanel()
//     } else if(flflag && isNew) {
//         //新的，置空
//         clearPanel()
//     }
// }

function button_click(sender, e) {
//     // 
//     checkON();
//     if(ec - sc < 1) {
//         alert('不允许单列分栏，请选择正确的区域')
//         changeCSS(false)
//     } else if(seg_columnsNumber.getValue() > ec - sc + 1) {
//         alert('不允许分栏数大于所选单元格列数，请选择正确的区域')
//         changeCSS(false)
//     } else {
//         if(!flflag) {
//             // vmd.alert('提示提,示', '存在重叠或包围')
//             alert('存在重叠或包围，请选择正确的区域')
//             changeCSS(false)
//         } else {
//             if(isNew) {
//                 parent.setGridInfo(flcg, null);
//                 // changeCSS(true);
//             } else {
//                 if(seg_columnsNumber.getValue() > 1) {
//                     flList[no] = flcg;
//                 } else {
//                     flList[no] = null
//                     changeCSS(false)
//                 }
//             }
//         }
//     }
//     parent.edclose()
}

function div4_click(sender, e) {
//     checkON()
//     changeCSS(false)
//     if(flsr.getValue() < fler.getValue()) {
//         flsr.setValue(parseFloat(flsr.getValue()) + 1)
//     } else {
//         flsr.setValue(fler.getValue())
//     }
//     sr = flsr.getValue()
//     setInfo(flsr, flsr.getValue())
//     changeCSS(true)
}

function div8_click(sender, e) {
//     if(flsr.getValue() > 0) {
//         checkON()
//         changeCSS(false)
//         flsr.setValue(parseFloat(flsr.getValue()) - 1)
//         sr = flsr.getValue()
//         setInfo(flsr, flsr.getValue())
//         changeCSS(true)
//     }
}

function div5_click(sender, e) {
//     checkON()
//     changeCSS(false)
//     if(flsc.getValue() < flec.getValue()) {
//         flsc.setValue(parseFloat(flsc.getValue()) + 1)
//     } else {
//         flsc.setValue(flec.getValue())
//     }
//     sc = flsc.getValue()
//     setInfo(flsc, flsc.getValue())
//     changeCSS(true)
}

function div9_click(sender, e) {
//     if(flsc.getValue() > 0) {
//         checkON()
//         changeCSS(false)
//         flsc.setValue(parseFloat(flsc.getValue()) - 1)
//         sc = flsc.getValue()
//         setInfo(flsc, flsc.getValue())
//         changeCSS(true)
//     }
}

function div6_click(sender, e) {
//     checkON()
//     changeCSS(false)
//     fler.setValue(parseFloat(fler.getValue()) + 1)
//     er = fler.getValue()
//     setInfo(fler, fler.getValue())
//     changeCSS(true)
}

function div10_click(sender, e) {
//     if(fler.getValue() > 0) {
//         checkON()
//         changeCSS(false)
//         if(fler.getValue() > flsr.getValue()) {
//             fler.setValue(parseFloat(fler.getValue()) - 1)
//         } else {
//             fler.setValue(flsr.getValue())
//         }
//         er = fler.getValue()
//         setInfo(fler, fler.getValue())
//         changeCSS(true)
//     }
}

function div7_click(sender, e) {
//     checkON()
//     changeCSS(false)
//     flec.setValue(parseFloat(flec.getValue()) + 1)
//     ec = flec.getValue()
//     setInfo(flec, flec.getValue())
//     changeCSS(true)
}

function div11_click(sender, e) {
//     if(flec.getValue() > 0) {
//         checkON()
//         changeCSS(false)
//         if(flec.getValue() > flsc.getValue()) {
//             flec.setValue(parseFloat(flec.getValue()) - 1)
//         } else {
//             flec.setValue(flsc.getValue())
//         }
//         ec = flec.getValue()
//         setInfo(flec, flec.getValue())
//         changeCSS(true)
//     }
}
			this.Segmentation_afterrender=Segmentation_afterrender;
		this.items=[
			{
				xtype:"label",
				id:"label2",
				text:"栏数：",
				x:35,
				y:15
			},
			{
				xtype:"label",
				id:"label3",
				text:"方式：",
				x:35,
				y:50
			},
			{
				xtype:"label",
				id:"label4",
				text:"分割线：",
				x:23,
				y:85
			},
			{
				xtype:"label",
				id:"label5",
				text:"栏间距：",
				x:23,
				y:120
			},
			{
				xtype:"label",
				id:"label6",
				text:"应用于：",
				x:23,
				y:155
			},
			{
				xtype:"label",
				id:"label7",
				text:"分栏条件：",
				x:10,
				y:190
			},
			{
				xtype:"numberfield",
				id:"seg_columnsNumber",
				allowDecimals:true,
				allowNegative:true,
				decimalPrecision:2,
				allowBlank:true,
				x:75,
				y:10,
				width:195,
				cls:"b",
				readOnly:true
			},
			{
				xtype:"vmd.comlist",
				id:"seg_style",
				width:195,
				height:270,
				x:75,
				y:45,
				cls:"b",
				afterrender:"seg_style_afterrender",
				disabled:true,
				listeners:{
					vmdafterrender:seg_style_afterrender
				}
			},
			{
				xtype:"radiostoregroup",
				id:"seg_dividingLine",
				width:170,
				height:25,
				labelField:"label",
				valueField:"value",
				checkedField:"checked",
				boxFieldName:"myRadio",
				x:75,
				y:80,
				disabled:true,
				items:[
					{
						xtype:"radio",
						id:"hwRadio",
						boxLabel:"有",
						width:87,
						inputValue:"Y"
					},
					{
						xtype:"radio",
						id:"hwRadio1",
						boxLabel:"无",
						inputValue:"N",
						checked:true
					}
				]
			},
			{
				xtype:"numberfield",
				id:"seg_columnsMargin",
				allowDecimals:true,
				allowNegative:true,
				decimalPrecision:2,
				allowBlank:true,
				x:75,
				y:115,
				width:195,
				cls:"b",
				disabled:true
			},
			{
				xtype:"vmd.comlist",
				id:"seg_applyTo",
				width:195,
				height:270,
				x:75,
				y:150,
				cls:"b",
				afterrender:"seg_applyTo_afterrender",
				disabled:true,
				listeners:{
					vmdafterrender:seg_applyTo_afterrender
				}
			},
			{
				xtype:"vmd.comlist",
				id:"seg_condition",
				width:195,
				height:270,
				x:75,
				y:185,
				cls:"b",
				afterrender:"seg_condition_afterrender",
				disabled:true,
				listeners:{
					vmdafterrender:seg_condition_afterrender
				}
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
				x:255,
				y:10,
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
				x:255,
				y:115,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/上.png\" />",
				click:"div1_click",
				disabled:true,
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
				x:255,
				y:20,
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
				x:255,
				y:125,
				style:"cursor: pointer",
				html:"<img src=\"/system/img/report/border/下.png\" />",
				click:"div3_click",
				disabled:true,
				listeners:{
					click:div3_click
				}
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"确定",
				type:"(none)",
				size:"small",
				x:225,
				y:290,
				click:"button_click",
				hidden:true,
				listeners:{
					click:button_click
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setInfo= function(sheet){
page.o = sheet;
selfSet();

	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Segmentation");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Segmentation");
	}
})