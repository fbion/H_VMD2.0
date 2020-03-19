Ext.define("vmd.ux.Classification" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Classification",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:621,
	layout:"absolute",
	afterrender:"Classification_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.Classification_afterrender(this)
}
	},
	uxCss:".btn {    cursor: pointer;    /*border-radius: 4px;*/}",
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
//font family 字体
var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['sort', 'display']
});
var data = [{
    sort: 'conventional',
    display: '常规'
}, {
    sort: 'number',
    display: '数字'
}, {
    sort: 'currency',
    display: '货币'
}, {
    sort: 'accounting',
    display: '会计专用'
}, {
    sort: 'date',
    display: '日期'
}, {
    sort: 'time',
    display: '时间'
}, {
    sort: 'percentage',
    display: '百分比'
}, {
    sort: 'sci_counting',
    display: '科学计数'
}, {
    sort: 'text',
    display: '文本'
}, {
    sort: 'special',
    display: '特殊'
}, {
    sort: 'customize',
    display: '自定义'
}];
store.loadData(data);
/////////////////////////////////////
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'display']
});
var data1 = [{
    id: '1',
    display: '(1234)'
}, {
    id: '2',
    display: '1234'
}, {
    id: '3',
    display: '-1234'
}];
store1.loadData(data1);
///////////////////////////////////////
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['country', 'display']
});
var data2 = [{
    country: 'none',
    display: '无'
}, {
    country: 'us',
    display: '$'
}, {
    country: 'uk',
    display: '￡'
}, {
    country: 'cn',
    display: '￥'
}, {
    country: 'eu',
    display: '€'
}, {
    country: 'fran',
    display: '₣'
}, ];
store2.loadData(data2);
//////////////////////////////////////////
var store3 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'display']
});
var data3 = [{
    id: '0',
    display: '默认'
}, {
    id: '1',
    display: '2014-8-19'
}, {
    id: '2',
    display: '2014年8月19日'
}, {
    id: '3',
    display: '201408'
}, {
    id: '4',
    display: '2014-08'
}, {
    id: '5',
    display: '8月'
}];
store3.loadData(data3);
//////////////////////////////////////////
var store4 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'display']
});
var data4 = [{
    id: '0',
    display: 'G/通用格式'
}, {
    id: '1',
    display: '0'
}, {
    id: '2',
    display: '0.00'
}, {
    id: '3',
    display: '#,##0'
}, {
    id: '4',
    display: '#,##0.00'
}, {
    id: '5',
    display: '_ * #,##0_ ;_ * -#,##0_ ;_ * "-"_ ;_ @_ '
}, {
    id: '6',
    display: '_ * #,##0.00_ ;_ * -#,##0.00_ ;_ * "-"??_ ;_ @_ '
}, {
    id: '7',
    display: '_ ¥* #,##0_ ;_ ¥* -#,##0_ ;_ ¥* "-"_ ;_ @_ '
}, {
    id: '8',
    display: '_ ¥* #,##0.00_ ;_ ¥* -#,##0.00_ ;_ ¥* "-"??_ ;_ @_ '
}, {
    id: '9',
    display: '#,##0;-#,##0'
}, {
    id: '10',
    display: '#,##0;[红色]-#,##0'
}, {
    id: '11',
    display: '#,##0.00;-#,##0.00'
}, {
    id: '12',
    display: '#,##0.00;[红色]-#,##0.00'
}, {
    id: '13',
    display: '¥#,##0;¥-#,##0'
}, {
    id: '14',
    display: '¥#,##0;[红色]¥-#,##0'
}, {
    id: '15',
    display: '¥#,##0.00;¥-#,##0.00'
}, {
    id: '16',
    display: '¥#,##0.00;[红色]¥-#,##0.00'
}, {
    id: '17',
    display: '0%'
}, {
    id: '18',
    display: '0.00%'
}, {
    id: '19',
    display: '0.00E+00'
}, {
    id: '20',
    display: '##0.0E+0'
}, {
    id: '21',
    display: '# ?/?'
}, {
    id: '22',
    display: '# ??/??'
}, {
    id: '23',
    display: '$#,##0_);($#,##0)'
}, {
    id: '24',
    display: '$#,##0_);[红色]($#,##0)'
}, {
    id: '25',
    display: '$#,##0.00_);($#,##0.00)'
}, {
    id: '26',
    display: '$#,##0.00_);[红色]($#,##0.00)'
}, {
    id: '27',
    display: 'yyyy"年"m"月"'
}, {
    id: '28',
    display: 'm"月"d"日"'
}, {
    id: '29',
    display: 'yyyy-m-d'
}, {
    id: '30',
    display: 'yyyy"年"m"月"d"日"'
}, {
    id: '31',
    display: 'm-d-yy'
}, {
    id: '32',
    display: 'd-mmm'
}, {
    id: '33',
    display: 'mmm-yy'
}, {
    id: '34',
    display: 'h:mm AM/PM'
}, {
    id: '35',
    display: 'h:mm:ss AM/PM'
}, {
    id: '36',
    display: 'h:mm'
}, {
    id: '37',
    display: 'h:mm:ss'
}, {
    id: '38',
    display: 'h"时"mm"分"'
}, {
    id: '39',
    display: 'h"时"mm"分"ss"秒"'
}, {
    id: '40',
    display: '上午/下午h"时"mm"分"'
}, {
    id: '41',
    display: '上午/下午h"时"mm"分"ss"秒"'
}, {
    id: '42',
    display: 'yyyy-m-d h:mm'
}, {
    id: '43',
    display: 'mm:ss'
}, {
    id: '44',
    display: 'mm:ss.0'
}, {
    id: '45',
    display: '@'
}, {
    id: '46',
    display: '[h]:mm:ss'
}, {
    id: '47',
    display: '[$-804]yyyy"年"m"月"d"日"dddd'
}];
store4.loadData(data4);
///////////////////////////////////////////
function allSortCom_afterrender(sender) {

    allSortCom.store = store;
    allSortCom.displayField = 'display';
    allSortCom.valueField = 'sort';
    // allSortCom.firstSelected = true
    //
}

function negativeCom_afterrender(sender) {
    negativeCom.store = store1;
    negativeCom.displayField = 'display';
    negativeCom.valueField = 'id'
}

function symbolCom_afterrender(sender) {
    symbolCom.store = store2;
    symbolCom.displayField = 'display';
    symbolCom.valueField = 'country';
}

function symbolCom1_afterrender(sender) {
    //
    symbolCom1.store = store2;
    symbolCom1.displayField = 'display';
    symbolCom1.valueField = 'country';
}

function dateSortCom_afterrender(sender) {
    dateSortCom.store = store3;
    dateSortCom.displayField = 'display';
    dateSortCom.valueField = 'id';
    //
}

function customCom_afterrender(sender) {
    customCom.store = store4;
    customCom.displayField = 'display';
    customCom.valueField = 'id';
}

function allSortCom_selectChanged(sender, combo, record, index) {
    closeAll();
    if(allSortCom.getText() == "常规") {
        conventionalDiv.show()
    } else if(allSortCom.getText() == "文本") {
        textDiv.show()
    } else if(allSortCom.getText() == "数字") {
        numberDiv.show()
    } else if(allSortCom.getText() == "特殊") {
        specialDiv.show()
    } else if(allSortCom.getText() == "货币") {
        currencyDiv.show()
    } else if(allSortCom.getText() == "自定义") {
        customizeDiv.show()
    } else if(allSortCom.getText() == "会计专用") {
        accountingDiv.show()
    } else if(allSortCom.getText() == "日期") {
        dateDiv.show()
    } else if(allSortCom.getText() == "时间") {
        timeDiv.show()
    } else if(allSortCom.getText() == "百分比") {
        percentageDiv.show()
    } else if(allSortCom.getText() == "科学计数") {
        Sci_countingDiv.show()
    }
}

function closeAll() {
    conventionalDiv.hide();
    numberDiv.hide();
    currencyDiv.hide();
    accountingDiv.hide();
    dateDiv.hide();
    timeDiv.hide();
    percentageDiv.hide();
    Sci_countingDiv.hide();
    textDiv.hide();
    specialDiv.hide();
    customizeDiv.hide()
}

function div_click(sender, e) {
    
    if(parseFloat(xs.getValue()) < 0) {
        xs.setValue("-1")
    } else {
        xs.setValue(parseFloat(xs.value) - 1)
    }

    // alert(parseFloat(hwText.value) - 1)
}

function xs_afterrender(sender) {
    xs.setValue("0")
    //
}

function div1_click(sender, e) {
    xs.setValue(parseFloat(xs.value) + 1)
}

function div2_click(sender, e) {
    if(parseFloat(xs1.getValue()) < 0) {
        xs1.setValue("-1")
    } else {
        xs1.setValue(parseFloat(xs1.value) - 1)
    }
}

function div3_click(sender, e) {
    xs1.setValue(parseFloat(xs1.value) + 1)
}

function xs1_afterrender(sender) {
    xs1.setValue("0")
    //
}

function xs2_afterrender(sender) {
    xs2.setValue("0")
    //
}

function div5_click(sender, e) {
    if(parseFloat(xs2.getValue()) < 0) {
        xs2.setValue("-1")
    } else {
        xs2.setValue(parseFloat(xs2.value) - 1)
    }
}

function div4_click(sender, e) {
    xs2.setValue(parseFloat(xs2.value) + 1)
}

function xs3_afterrender(sender) {
    xs3.setValue("0")
    //
}

function div6_click(sender, e) {
    if(parseFloat(xs3.getValue()) < 0) {
        xs3.setValue("-1")
    } else {
        xs3.setValue(parseFloat(xs3.value) - 1)
    }
}

function div7_click(sender, e) {
    xs3.setValue(parseFloat(xs3.value) + 1)
}

function xs4_afterrender(sender) {
    xs4.setValue("0")
    //
}

function div8_click(sender, e) {
    if(parseFloat(xs4.getValue()) < 0) {
        xs4.setValue("-1")
    } else {
        xs4.setValue(parseFloat(xs4.value) - 1)
    }
}

function div9_click(sender, e) {
    xs4.setValue(parseFloat(xs4.value) + 1)
}



function button_click(sender, e) {
    var temp = noZeroCheckbox.checked;
    alert(temp)
}

function Classification_afterrender(sender){

}
			this.Classification_afterrender=Classification_afterrender;
		this.items=[
			{
				xtype:"vmd.comlist",
				id:"allSortCom",
				width:280,
				height:270,
				x:20,
				y:50,
				afterrender:"allSortCom_afterrender",
				style:"border: 1px solid #dddddd",
				selectChanged:"allSortCom_selectChanged",
				listeners:{
					vmdafterrender:allSortCom_afterrender,
					selectChanged:allSortCom_selectChanged
				}
			},
			{
				xtype:"vmd.div",
				id:"conventionalDiv",
				layoutConfig:{
					align:"center"
				},
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:240,
				height:290,
				x:30,
				y:110,
				layout:"vbox",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label",
						text:"常规单元格格式不包含任何特定的数字格式",
						width:228,
						height:16
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"numberDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:320,
				x:-1,
				y:100,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label1",
						text:"小数位数：",
						x:10,
						y:10
					},
					{
						xtype:"textfield",
						id:"xs",
						allowBlank:true,
						x:40,
						y:40,
						width:180,
						readOnly:true,
						afterrender:"xs_afterrender",
						listeners:{
							vmdafterrender:xs_afterrender
						}
					},
					{
						xtype:"checkbox",
						id:"noZeroCheckbox",
						fieldLabel:"Checkbox",
						boxLabel:"不显示零值",
						x:50,
						y:80,
						width:170
					},
					{
						xtype:"checkbox",
						id:"useCommaCheckbox",
						fieldLabel:"Checkbox",
						boxLabel:"使用千分位分隔符（，）",
						x:50,
						y:110
					},
					{
						xtype:"label",
						id:"label2",
						text:"负数：",
						x:10,
						y:160
					},
					{
						xtype:"vmd.comlist",
						id:"negativeCom",
						width:280,
						height:270,
						x:20,
						y:190,
						afterrender:"negativeCom_afterrender",
						style:"border: 1px solid #dddddd",
						listeners:{
							vmdafterrender:negativeCom_afterrender
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
						height:20,
						x:230,
						y:45,
						cls:"btn",
						click:"div_click",
						html:"<img src=\"/system/img/report/border/下.png\" /><!--<background-image src=\"/system/img/report/border/下.png\" style=\"background-size:contain\"></background-image>-->",
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
						width:40,
						height:20,
						x:230,
						y:30,
						cls:"btn",
						click:"div1_click",
						html:"<img src=\"/system/img/report/border/上.png\" />",
						listeners:{
							click:div1_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"currencyDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:430,
				x:0,
				y:100,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"checkbox",
						id:"noZeroCheckBox1",
						fieldLabel:"Checkbox",
						boxLabel:"不显示零值",
						x:70,
						y:70,
						width:120
					},
					{
						xtype:"textfield",
						id:"xs1",
						allowBlank:true,
						x:60,
						y:30,
						width:160,
						afterrender:"xs1_afterrender",
						listeners:{
							vmdafterrender:xs1_afterrender
						}
					},
					{
						xtype:"label",
						id:"label3",
						text:"小数位数：",
						x:10,
						y:10
					},
					{
						xtype:"label",
						id:"label4",
						text:"货币符号（国家/地区）：",
						x:10,
						y:110
					},
					{
						xtype:"vmd.comlist",
						id:"symbolCom",
						width:280,
						height:270,
						x:20,
						y:140,
						afterrender:"symbolCom_afterrender",
						style:"border: 1px solid #dddddd",
						listeners:{
							vmdafterrender:symbolCom_afterrender
						}
					},
					{
						xtype:"vmd.div",
						id:"div2",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:20,
						height:20,
						x:230,
						y:45,
						click:"div2_click",
						cls:"btn",
						html:"<img src=\"/system/img/report/border/下.png\" />",
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
						width:20,
						height:20,
						x:230,
						y:30,
						click:"div3_click",
						cls:"btn",
						html:"<img src=\"/system/img/report/border/上.png\" />",
						listeners:{
							click:div3_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"accountingDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:410,
				x:0,
				y:90,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"checkbox",
						id:"noZeroCheckBox2",
						fieldLabel:"Checkbox",
						boxLabel:"不显示零值",
						x:90,
						y:80
					},
					{
						xtype:"textfield",
						id:"xs2",
						allowBlank:true,
						x:60,
						y:40,
						afterrender:"xs2_afterrender",
						hidden:false,
						listeners:{
							vmdafterrender:xs2_afterrender
						}
					},
					{
						xtype:"label",
						id:"label5",
						text:"货币符号（国家/地区）：",
						x:10,
						y:130
					},
					{
						xtype:"vmd.comlist",
						id:"symbolCom1",
						width:280,
						height:270,
						x:20,
						y:160,
						afterrender:"symbolCom1_afterrender",
						style:"border: 1px solid #dddddd",
						listeners:{
							vmdafterrender:symbolCom1_afterrender
						}
					},
					{
						xtype:"label",
						id:"label16",
						text:"小数：",
						x:10,
						y:10
					},
					{
						xtype:"vmd.div",
						id:"div4",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:20,
						height:20,
						x:230,
						y:30,
						click:"div4_click",
						cls:"btn",
						html:"<img src=\"/system/img/report/border/上.png\" />",
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
						width:20,
						height:20,
						x:230,
						y:45,
						click:"div5_click",
						cls:"btn",
						html:"<img src=\"/system/img/report/border/下.png\" />",
						listeners:{
							click:div5_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"dateDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:430,
				x:0,
				y:90,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label6",
						text:"类型：",
						x:10,
						y:10
					},
					{
						xtype:"vmd.comlist",
						id:"dateSortCom",
						width:280,
						height:270,
						x:20,
						y:30,
						style:"border: 1px solid #dddddd",
						afterrender:"dateSortCom_afterrender",
						listeners:{
							vmdafterrender:dateSortCom_afterrender
						}
					},
					{
						xtype:"label",
						id:"label7",
						text:"区域设置（国家和地区）：",
						x:10,
						y:80
					},
					{
						xtype:"vmd.comlist",
						id:"areaCom",
						width:280,
						height:270,
						x:20,
						y:110,
						style:"border: 1px solid #dddddd"
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"timeDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:420,
				x:-1,
				y:90,
				hidden:true,
				layout:"absolute",
				items:[
					{
						xtype:"label",
						id:"label9",
						text:"区域设置（国家和地区）：",
						x:10,
						y:10
					},
					{
						xtype:"vmd.comlist",
						id:"areaCom1",
						width:280,
						height:270,
						x:20,
						y:30,
						style:"border:1px solid #dddddd;"
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"percentageDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:440,
				x:0,
				y:90,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label8",
						text:"小数点位数：",
						x:10,
						y:10,
						height:20
					},
					{
						xtype:"textfield",
						id:"xs3",
						allowBlank:true,
						x:70,
						y:40,
						afterrender:"xs3_afterrender",
						listeners:{
							vmdafterrender:xs3_afterrender
						}
					},
					{
						xtype:"checkbox",
						id:"noZeroCheckBox3",
						fieldLabel:"Checkbox",
						boxLabel:"不显示零值",
						x:100,
						y:90
					},
					{
						xtype:"vmd.div",
						id:"div6",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:20,
						height:20,
						x:230,
						y:45,
						click:"div6_click",
						cls:"btn",
						html:"<img src=\"/system/img/report/border/下.png\" />",
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
						width:20,
						height:20,
						x:230,
						y:30,
						click:"div7_click",
						cls:"btn",
						html:"<img src=\"/system/img/report/border/上.png\" />",
						listeners:{
							click:div7_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"Sci_countingDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:530,
				x:0,
				y:90,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label10",
						text:"小数位数：",
						x:10,
						y:10
					},
					{
						xtype:"textfield",
						id:"xs4",
						allowBlank:true,
						x:60,
						y:40,
						emptyText:"0",
						afterrender:"xs4_afterrender",
						listeners:{
							vmdafterrender:xs4_afterrender
						}
					},
					{
						xtype:"checkbox",
						id:"noZeroCheckBox4",
						fieldLabel:"Checkbox",
						boxLabel:"不显示零值",
						x:100,
						y:70
					},
					{
						xtype:"vmd.div",
						id:"div8",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:20,
						height:20,
						x:230,
						y:45,
						click:"div8_click",
						html:"<img src=\"/system/img/report/border/下.png\" alt=\"减少\" />",
						cls:"btn",
						listeners:{
							click:div8_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div9",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:20,
						height:20,
						x:230,
						y:30,
						click:"div9_click",
						html:"<!--/system/img/report/border/--><img src=\"/system/img/report/border/上.png\" alt=\"增加\" />",
						cls:"btn",
						listeners:{
							click:div9_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"textDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:330,
				x:0,
				y:80,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label11",
						text:"在文本单元格格式中，数字作为文本处理。单元格显示的内容与输入的内容完全一致。",
						x:40,
						y:20,
						width:230
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"specialDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:400,
				x:0,
				y:90,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"vmd.comlist",
						id:"areaCom3",
						width:280,
						height:270,
						x:20,
						y:40,
						style:"border: 1px solid #dddddd"
					},
					{
						xtype:"label",
						id:"label12",
						text:"区域设置（国家和地区）：",
						x:10,
						y:10
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"customizeDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:320,
				height:380,
				x:0,
				y:100,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label14",
						text:"类型：",
						x:10,
						y:0
					},
					{
						xtype:"vmd.comlist",
						id:"customCom",
						width:280,
						height:270,
						x:20,
						y:30,
						afterrender:"customCom_afterrender",
						style:"border: 1px solid #dddddd",
						listeners:{
							vmdafterrender:customCom_afterrender
						}
					}
				]
			},
			{
				xtype:"label",
				id:"label15",
				text:"分类：",
				x:10,
				y:20
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getInfo= function(att){
//直接填写方法内容
var temp;
if(att == "xs") {
    temp = xs.getValue()
} else if(att == "xs1") {
    temp = xs1.getValue()
} else if(att == "xs2") {
    temp = xs2.getValue()
} else if(att == "xs3") {
    temp = xs3.getValue()
} else if(att = "noZeroCheckbox") {
    temp = noZeroCheckbox.checked
} else if(att = "noZeroCheckBox1") {
    temp = noZeroCheckBox1.checked
} else if(att = "noZeroCheckBox2") {
    temp = noZeroCheckBox2.checked
} else if(att = "noZeroCheckBox3") {
    temp = noZeroCheckBox3.checked
} else if(att = "noZeroCheckBox4") {
    temp = noZeroCheckBox4.checked
} else if(att = "areaCom") {
    temp = areaCom.getValue()
} else if(att = "areaCom1") {
    temp = areaCom1.getValue()
} else if(att = "areaCom2") {
    temp = areaCom2.getValue()
} else if(att = "symbolCom") {
    temp = symbolCom.getValue()
} else if(att = "symbolCom1") {
    temp = symbolCom1.getValue()
} else if(att = "useCommaCheckbox") {
    temp = useCommaCheckbox.checked
} else if(att = "negativeCom") {
    temp = negativeCom.getValue()
} else if(att = "dateSortCom") {
    temp = dateSortCom.getValue()
} else if(att = "customCom") {
    temp = customCom.getValue()
} else if(att = "xs4") {
    temp = xs4.getValue()
}
return temp;
	}
		this.setInfo= function(info,cell){
//直接填写方法内容
if(info) {
    xs.setValue(info.xs.value);
    xs1.setValue(info.xs1.value);
    xs2.setValue(info.xs2.value);
    xs3.setValue(info.xs3.value);
    xs4.setValue(info.xs4.value);

    noZeroCheckbox.checked = (info.noZeroCheckbox.checked);
    noZeroCheckbox1.checked = (info.noZeroCheckbox1.checked);
    noZeroCheckbox2.checked = (info.noZeroCheckbox2.checked);
    noZeroCheckbox3.checked = (info.noZeroCheckbox3.checked);
    noZeroCheckbox4.checked = (info.noZeroCheckbox4.checked);

    areaCom.setValue(info.areaCom.value);
    areaCom1.setValue(info.areaCom1.value);
    areaCom2.setValue(info.areaCom2.value);

    symbolCom.setValue(info.symbolCom.value);
    symbolCom1.setValue(info.symbolCom1.value);

    useCommaCheckbox.checked = info.useCommaCheckbox.checked;
    negativeCom.setValue(info.negativeCom.value);
    dateSortCom.setValue(info.dateSortCom.value);
    customCom.setValue(info.customCom.value)
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Classification");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Classification");
	}
})