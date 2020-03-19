Ext.define("vmd.ux.CellType" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.ColorSelect$1.0$ColorSelect"]),
	version:"1.0",
	xtype:"vmd.ux.CellType",
	title:"Panel",
	header:false,
	border:false,
	width:1026,
	height:680,
	layout:"absolute",
	afterrender:"CellType_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.CellType_afterrender(this)
}
	},
	uxCss:".btn {    cursor: pointer;}.isBorder {    border: 1px solid #dddddd;}",
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
    fields: ['cellType', 'describe']
});
var data = [{
    cellType: 'wb',
    describe: '文本'
}, {
    cellType: 'sz',
    describe: '数字'
}, {
    cellType: 'xlk',
    describe: '下拉框'
}, {
    cellType: 'dxan',
    describe: '单选按钮'
}, {
    cellType: 'fxk',
    describe: '复选框'
}, {
    cellType: 'sczj',
    describe: '上传组件'
}, {
    cellType: 'qtb',
    describe: '嵌套表'
}, {
    cellType: 'fwb',
    describe: '富文本'
}, {
    cellType: 'tx',
    describe: '图形'
}, {
    cellType: 'jdt',
    describe: '进度条'
}, {
    cellType: 'txm',
    describe: '条形码'
}, {
    cellType: 'spzj',
    describe: '审批组件'
}, {
    cellType: 'rq',
    describe: '日期'
}, {
    cellType: 'an',
    describe: '按钮'
}, {
    cellType: 'xls',
    describe: '下拉树'
}];
store.loadData(data);
////////////////////////////////////////////////////////////////////////////////
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['type', 'name']
});
var data1 = [{
    type: 'code39',
    name: 'code39'
}, {
    type: 'code128',
    name: 'code128'
}, {
    type: 'QRCode',
    name: '二维码'
}];
store1.loadData(data1);
////////////////////////////////////////////////////////////////////////////////
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['type', 'name']
});
var data2 = [{
    type: 'L',
    name: 'L 7%'
}, {
    type: 'M',
    name: 'M 15%'
}, {
    type: 'Q',
    name: 'Q 25%'
}, {
    type: 'H',
    name: 'H 30%'
}];
store2.loadData(data2);
////////////////////////////////////////////////////////////////////////////////
var store3 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['name', 'id']
});
var data3 = [{
    name: '1',
    id: '1'
}, {
    name: '2',
    id: '2'
}, {
    name: '3',
    id: '3'
}, {
    name: '4',
    id: '4'
}, {
    name: '5',
    id: '5'
}, {
    name: '6',
    id: '6'
}, {
    name: '7',
    id: '7'
}, {
    name: '8',
    id: '8'
}, {
    name: '9',
    id: '9'
}, {
    name: '10',
    id: '10'
}, {
    name: '11',
    id: '11'
}, {
    name: '12',
    id: '12'
}, {
    name: '13',
    id: '13'
}, {
    name: '14',
    id: '14'
}, {
    name: '15',
    id: '15'
}, {
    name: '16',
    id: '16'
}, {
    name: '17',
    id: '17'
}, {
    name: '18',
    id: '18'
}, {
    name: '19',
    id: '19'
}, {
    name: '20',
    id: '20'
}, {
    name: '21',
    id: '21'
}, {
    name: '22',
    id: '22'
}, {
    name: '23',
    id: '23'
}, {
    name: '24',
    id: '24'
}, {
    name: '25',
    id: '25'
}, {
    name: '26',
    id: '26'
}, {
    name: '27',
    id: '27'
}, {
    name: '28',
    id: '28'
}, {
    name: '29',
    id: '29'
}, {
    name: '30',
    id: '30'
}, {
    name: '31',
    id: '31'
}, {
    name: '32',
    id: '32'
}, {
    name: '33',
    id: '33'
}, {
    name: '34',
    id: '34'
}, {
    name: '35',
    id: '35'
}, {
    name: '36',
    id: '36'
}, {
    name: '37',
    id: '37'
}, {
    name: '38',
    id: '38'
}, {
    name: '39',
    id: '39'
}, {
    name: '40',
    id: '40'
}];
store3.loadData(data3);
////////////////////////////////////////////////////////////////////////////////
var store4 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['name', 'id']
});
var data4 = [{
    name: '0',
    id: '0'
}, {
    name: '1',
    id: '1'
}, {
    name: '2',
    id: '2'
}, {
    name: '3',
    id: '3'
}, {
    name: '4',
    id: '4'
}, {
    name: '5',
    id: '5'
}, {
    name: '6',
    id: '6'
}, {
    name: '7',
    id: '7'
}, {
    name: '8',
    id: '8'
}, {
    name: '9',
    id: '9'
}, {
    name: '10',
    id: '10'
}];
store4.loadData(data4);
////////////////////////////////////////////////////////////////////////////////
var store5 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['name', 'id']
});
var data5 = [{
    name: '无',
    id: 'none'
}, {
    name: '0',
    id: '0'
}, {
    name: '1',
    id: '1'
}, {
    name: '2',
    id: '2'
}, {
    name: '3',
    id: '3'
}, {
    name: '4',
    id: '4'
}, {
    name: '5',
    id: '5'
}, {
    name: '6',
    id: '6'
}, {
    name: '7',
    id: '7'
}];
store5.loadData(data5);
////////////////////////////////////////////////////////////////////////////////
var store6 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['name', 'id']
});
var data6 = [{
    name: 'yyyy-MM-dd',
    id: 'default'
}, {
    name: 'yyyy年MM月dd日',
    id: '1'
}, {
    name: 'yyyy年MM月dd日 hh时mm分',
    id: '2'
}, {
    name: 'yyyyMMdd',
    id: '3'
}, {
    name: 'yyyy年MM月',
    id: '4'
}, {
    name: 'yyyy年',
    id: '5'
}, {
    name: 'hh时mm分',
    id: '6'
}];
store6.loadData(data6);
////////////////////////////////////////////////////////////////////////////////
var store7 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['type', 'name']
});
var data7 = [{
    type: 'usePic',
    name: '以图片方式显示'
}, {
    type: 'useUrl',
    name: '以链接方式显示'
}];
store7.loadData(data7);
////////////////////////////////////////////////////////////////////////////////
var store8 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['type', 'name']
});
var data8 = [{
    type: 'actualSize',
    name: '实际大小'
}, {
    type: 'stretch',
    name: '拉伸'
}, {
    type: 'lateralStretching',
    name: '横向拉伸'
}, {
    type: 'verticalStretching',
    name: '纵向拉伸'
}];
store8.loadData(data8);
////////////////////////////////////////////////////////////////////////////////
var store9 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['type', 'name']
});
var data9 = [{
    type: '0',
    name: 'OCX控件'
}, {
    type: '1',
    name: '服务器文件'
}, {
    type: '2',
    name: '数据库大字段'
}, {
    type: '3',
    name: '本地图片'
}, {
    type: '4',
    name: 'webChart'
}];
store9.loadData(data9);
///////////////////////////////////////////////////////////////////////////////
var store10 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
});
var data10 = [{
    id: '0',
    name: '%y年%m月%d日'
}, {
    id: '1',
    name: '%y-%m-%d'
}];
store10.loadData(data10);
////////////////////////////////////////////////////////////////////////////////

function allCellType_afterrender(sender) {
    allCellType.store = store;
    allCellType.displayField = 'describe';
    allCellType.valueField = 'cellType'
}

function sz_allowEmp_check(sender, checked) {
    if(sz_allowEmp.checked) {
        szDiv.show()
    } else {
        szDiv.hide()
    }
}

function sz_allowFloat_check(sender, checked) {
    if(sz_allowFloat.checked) {
        szDiv1.show()
    } else {
        szDiv1.hide()
    }
}

function xlk_allowEmp_check(sender, checked) {
    if(xlk_allowEmp.checked) {
        xlkDiv.show()
    } else {
        xlkDiv.hide()
    }
}

function dxan_hjj_afterrender(sender) {
    dxan_hjj.setValue("0")
}

function div3_click(sender, e) {
    dxan_hjj.setValue(parseFloat(dxan_hjj.getValue()) + 0.5)

}

function div4_click(sender, e) {
    dxan_hjj.setValue(parseFloat(dxan_hjj.getValue()) - 0.5)
}

function dxan_displayColumn_afterrender(sender) {
    dxan_displayColumn.setValue("0")
}

function div6_click(sender, e) {
    dxan_displayColumn.setValue(parseFloat(dxan_displayColumn.getValue()) + 1)
}

function div7_click(sender, e) {
    if(parseFloat(dxan_displayColumn.getValue()) < 1) {
        dxan_displayColumn.setValue("0")
    } else {
        dxan_displayColumn.setValue(parseFloat(dxan_displayColumn.getValue()) - 1)
    }
}

function dxan_adaptive_check(sender, checked) {
    if(dxan_adaptive.checked) {
        dxanDiv.show()
    } else {
        dxanDiv.hide()
    }
}

function fxk_allowEmp_check(sender, checked) {
    if(fxk_allowEmp.checked) {
        fxkDiv.hide()
    } else {
        fxkDiv.show()
    }
}


function txm_code39_width_afterrender(sender) {
    txm_code39_width.setValue("0")
}

function txm_code39_height_afterrender(sender) {
    txm_code39_height.setValue("0")
}

function txm_codeType_afterrender(sender) {
    txm_codeType.store = store1;
    txm_codeType.displayField = 'name';
    txm_codeType.valueField = 'type'
}

function div8_click(sender, e) {
    txm_code39_width.setValue(parseFloat(txm_code39_width.getValue()) + 1)
}

function div10_click(sender, e) {
    txm_code39_height.setValue(parseFloat(txm_code39_height.getValue()) + 1)
}

function div9_click(sender, e) {
    if(parseFloat(txm_code39_width.getValue()) < 1) {
        txm_code39_width.setValue("0")
    } else {
        txm_code39_width.setValue(parseFloat(txm_code39_width.getValue()) - 1)
    }
}

function div11_click(sender, e) {
    if(parseFloat(txm_code39_height.getValue()) < 1) {
        txm_code39_height.setValue("0")
    } else {
        txm_code39_height.setValue(parseFloat(txm_code39_height.getValue()) - 1)
    }
}

function div12_click(sender, e) {
    txm_code128_width.setValue(parseFloat(txm_code128_width.getValue()) + 1)
}

function div14_click(sender, e) {
    txm_code128_height.setValue(parseFloat(txm_code128_height.getValue()) + 1)
}

function txm_code128_width_afterrender(sender) {
    txm_code128_width.setValue("0")
}

function txm_code128_height_afterrender(sender) {
    txm_code128_height.setValue("0")
}

function div13_click(sender, e) {
    if(parseFloat(txm_code128_width.getValue()) < 1) {
        txm_code128_width.setValue("0")
    } else {
        txm_code128_width.setValue(parseFloat(txm_code128_width.getValue()) - 1)
    }
}

function div15_click(sender, e) {
    if(parseFloat(txm_code128_height.getValue()) < 1) {
        txm_code128_height.setValue("0")
    } else {
        txm_code128_height.setValue(parseFloat(txm_code128_height.getValue()) - 1)
    }
}

function txm_QRCode_mistake_afterrender(sender) {
    txm_QRCode_mistake.store = store2;
    txm_QRCode_mistake.displayField = 'name';
    txm_QRCode_mistake.valueField = 'type'
}

function txm_QRCode_version_afterrender(sender) {
    txm_QRCode_version.store = store3;
    txm_QRCode_version.displayField = 'name';
    txm_QRCode_version.valueField = 'id'
}

function txm_QRCode_margin_afterrender(sender) {
    txm_QRCode_margin.store = store4;
    txm_QRCode_margin.displayField = 'name';
    txm_QRCode_margin.valueField = 'id'
}

function txm_QRCode_ymtx_afterrender(sender) {
    txm_QRCode_ymtx.store = store5;
    txm_QRCode_ymtx.displayField = 'name';
    txm_QRCode_ymtx.valueField = 'id'
}

function div16_click(sender, e) {
    // 获取上传url
    hwDas.getuploadurl(urlconfig, dirPath);
}

function txm_codeType_selectChanged(sender, combo, record, index) {
    txm_codeType_closeAll();
    
    if(txm_codeType.getText() == "code39") {
        code39Div.show()
    } else if(txm_codeType.getText() == "code128") {
        code128Div.show()
    } else if(txm_codeType.getText() == "二维码") {
        QRCodeDiv.show()
    }
}

function txm_codeType_closeAll() {
    code39Div.hide();
    code128Div.hide();
    QRCodeDiv.hide()
}

function rq_style_afterrender(sender) {
    rq_style.store = store6;
    rq_style.displayField = 'name';
    rq_style.valueField = 'id'
}

function rq_style_selectChanged(sender, combo, record, index) {
    if(rq_style.getText() == "yyyy-MM-dd") {
        rq_StyleDisplay.setValue("2018-9-5")
    } else if(rq_style.getText() == "yyyy年MM月dd日") {
        rq_StyleDisplay.setValue("2018年09月05日")
    } else if(rq_style.getText() == "yyyy年MM月dd日 hh时mm分") {
        rq_StyleDisplay.setValue("2018年09月05日 14时58分")
    } else if(rq_style.getText() == "yyyyMMdd") {
        rq_StyleDisplay.setValue("20180905")
    } else if(rq_style.getText() == "yyyy年MM月") {
        rq_StyleDisplay.setValue("2018年09月")
    } else if(rq_style.getText() == "yyyy年") {
        rq_StyleDisplay.setValue("2018年")
    } else if(rq_style.getText() == "hh时mm分") {
        rq_StyleDisplay.setValue("14时58分")
    }
}

function rs_allowEmp_check(sender, checked) {
    if(rs_allowEmp.checked) {
        rqDiv.hide()
    } else {
        rqDiv.show()
    }
}

function tp_display_afterrender(sender) {
    tp_display.store = store7;
    tp_display.displayField = 'name';
    tp_display.valueField = 'type'
}

function tp_layout_afterrender(sender) {
    tp_layout.store = store8;
    tp_layout.displayField = 'name';
    tp_layout.valueField = 'type'
}

function tp_source_afterrender(sender) {
    tp_source.store = store9;
    tp_source.displayField = 'name';
    tp_source.valueField = 'type'
}


function fwb_indentation_afterrender(sender) {
    fwb_indentation.setValue("0")
}

function div18_click(sender, e) {
    fwb_indentation.setValue(parseFloat(fwb_indentation.getValue()) + 1)
}

function div20_click(sender, e) {
    if(parseFloat(fwb_indentation.getValue()) < 1) {
        fwb_indentation.setValue("0")
    } else {
        fwb_indentation.setValue(parseFloat(fwb_indentation.getValue()) - 1)
    }
}

function fwb_allowEmp_check(sender, checked) {
    if(fwb_allowEmp.checked) {
        fwbDiv.hide()
    } else {
        fwbDiv.show()
    }
}

function jdt_top_afterrender(sender) {
    jdt_top.setValue("5")
}

function jdt_bottom_afterrender(sender) {
    jdt_bottom.setValue("5")
}

function jdt_left_afterrender(sender) {
    jdt_left.setValue("5")
}

function jdt_right_afterrender(sender) {
    jdt_right.setValue("5")
}

function div23_click(sender, e) {
    jdt_top.setValue(parseFloat(jdt_top.getValue()) + 1)
}

function div28_click(sender, e) {
    jdt_left.setValue(parseFloat(jdt_left.getValue()) + 1)
}

function div27_click(sender, e) {
    jdt_bottom.setValue(parseFloat(jdt_bottom.getValue()) + 1)
}

function div29_click(sender, e) {
    jdt_right.setValue(parseFloat(jdt_right.getValue()) + 1)
}

function div21_click(sender, e) {
    if(parseFloat(jdt_top.getValue()) < 1) {
        jdt_top.setValue("0")
    } else {
        jdt_top.setValue(parseFloat(jdt_top.getValue()) - 1)
    }
}

function div24_click(sender, e) {
    if(parseFloat(jdt_bottom.getValue()) < 1) {
        jdt_bottom.setValue("0")
    } else {
        jdt_bottom.setValue(parseFloat(jdt_bottom.getValue()) - 1)
    }
}

function div25_click(sender, e) {
    if(parseFloat(jdt_left.getValue()) < 1) {
        jdt_left.setValue("0")
    } else {
        jdt_left.setValue(parseFloat(jdt_left.getValue()) - 1)
    }

}

function div26_click(sender, e) {
    if(parseFloat(jdt_right.getValue()) < 1) {
        jdt_right.setValue("0")
    } else {
        jdt_right.setValue(parseFloat(jdt_right.getValue()) - 1)
    }

}

function sczj_max_afterrender(sender) {
    sczj_max.setValue("3")
}

function div31_click(sender, e) {
    sczj_max.setValue(parseFloat(sczj_max.getValue()) + 1)
    sczj_wd_pageDisplay.enable()
    sczj_wd_rowDisplay.enable()
}



function div32_click(sender, e) {
    if(parseFloat(sczj_max.getValue()) == 2) {
        sczj_max.setValue("1");
        sczj_wd_pageDisplay.disable()
        sczj_wd_rowDisplay.disable()
    } else if(sczj_max.getValue() == 1) {
        sczj_max.setValue("1");
    } else {
        sczj_max.setValue(parseFloat(sczj_max.getValue()) - 1);
    }
}

function sczj_tp_max_afterrender(sender) {
    sczj_tp_max.setValue("3")
}

function div30_click(sender, e) {
    sczj_tp_max.setValue(parseFloat(sczj_tp_max.getValue()) + 1)
    sczj_tp_pageDisplay.enable()
    sczj_tp_rowDisplay.enable()
}

function div33_click(sender, e) {
    if(parseFloat(sczj_tp_max.getValue()) == 2) {
        sczj_tp_max.setValue("1");
        sczj_tp_pageDisplay.disable()
        sczj_tp_rowDisplay.disable()
    } else if(sczj_tp_max.getValue() == 1) {
        sczj_tp_max.setValue("1");
    } else {
        sczj_tp_max.setValue(parseFloat(sczj_tp_max.getValue()) - 1);
    }
}

function sczj_type_change(sender, checked) {
    
    if(sczj_type.getValue() == "pic") {
        tpDiv.show()
        wdDiv.hide()
    } else if(sczj_type.getValue() == "word") {
        tpDiv.hide()
        wdDiv.show()
    }
}

function closeAll() {
    wbTabs.hide()
    xlkTabs.hide()
    szTabs.hide()
    sczjTabs.hide()
    szTabs.hide()
    rqTabs.hide()
    fxkTabs.hide()
    fwbTabs.hide()
    dxanTabs.hide()
    qtb.hide()
    tp.hide()
    jdt.hide()
    spzjTabs.hide()
    //还差四个
}

//文本'
//数字'
//下拉框'
//单选按钮'
//复选框'
//上传组件'
//嵌套表'
//富文本'
//图形'
//进度条'
//条形码'
//审批组件'
//日期'
//按钮'
//下拉树

function allCellType_selectChanged(sender, combo, record, index) {
    closeAll()
    if(allCellType.getText() == "文本") {
        wbTabs.show()
    } else if(allCellType.getText() == "数字") {
        szTabs.show()
    } else if(allCellType.getText() == "下拉框") {
        xlkTabs.show()
    } else if(allCellType.getText() == "单选按钮") {
        dxanTabs.show()
    } else if(allCellType.getText() == "复选框") {
        fxkTabs.show()
    } else if(allCellType.getText() == "上传组件") {
        sczjTabs.show()
    } else if(allCellType.getText() == "嵌套表") {
        qtb.show()
    } else if(allCellType.getText() == "富文本") {
        fwbTabs.show()
    } else if(allCellType.getText() == "日期") {
        rqTabs.show()
    } else if(allCellType.getText() == "进度条") {
        jdt.show()
    } else if(allCellType.getText() == "条形码") {
        txm.show()
    } else if(allCellType.getText() == "审批组件") {
        spzjTabs.show()
    }
}

function CellType_afterrender(sender) {
    //
}



function spzj_style_afterrender(sender) {
    spzj_style.setText("分类：")
}

function spzj_spbm_x_afterrender(sender) {
    spzj_spbm_x.setValue(spbmDiv.x)
}

function spzj_spbm_y_afterrender(sender) {
    spzj_spbm_y.setValue(spbmDiv.y)
}

function spbmDiv_click(sender, e) {
    spzj_style.setText("审批部门：");
    spzj_closeAll();
    spzj_spbmDiv.show();

}

function spzj_closeAll() {
    spzj_spbmDiv.hide()
    spzj_spyjDiv.hide();
    spzj_tyDiv.hide()
    spzj_btyDiv.hide()
    spzj_thDiv.hide()
    spzj_spzDiv.hide()
    spzj_sprDiv.hide()
    spzj_sprqDiv.hide()
}

function div46_click(sender, e) {
    spzj_spbm_x.setValue(parseFloat(spzj_spbm_x.getValue()) + 1);
    spbmDiv.setPosition(spzj_spbm_x.getValue(), spzj_spbm_y.getValue())
}

function div50_click(sender, e) {
    spzj_spbm_x.setValue(parseFloat(spzj_spbm_x.getValue()) - 1);
    spbmDiv.setPosition(spzj_spbm_x.getValue(), spzj_spbm_y.getValue())
}

function div48_click(sender, e) {
    spzj_spbm_y.setValue(parseFloat(spzj_spbm_y.getValue()) + 1);
    spbmDiv.setPosition(spzj_spbm_x.getValue(), spzj_spbm_y.getValue())
}

function div51_click(sender, e) {
    spzj_spbm_y.setValue(parseFloat(spzj_spbm_y.getValue()) - 1);
    spbmDiv.setPosition(spzj_spbm_x.getValue(), spzj_spbm_y.getValue())
}

function spzj_spbm_height_afterrender(sender) {
    spzj_spbm_height.setValue("0")
}

function spzj_spbm_width_afterrender(sender) {
    spzj_spbm_width.setValue("0")
}

function spzj_spyj_x_afterrender(sender) {
    spzj_spyj_x.setValue(spyjDiv.x)
}

function spzj_spyj_y_afterrender(sender) {
    spzj_spyj_y.setValue(spyjDiv.y)
}

function spyjDiv_click(sender, e) {
    spzj_style.setText("审批意见：");
    spzj_closeAll();
    spzj_spyjDiv.show();
}

function spzj_spyj_height_afterrender(sender) {
    spzj_spyj_height.setValue("0")
}

function spzj_spyj_width_afterrender(sender) {
    spzj_spyj_width.setValue("0")
}

function div35_click(sender, e) {
    spzj_spyj_x.setValue(parseFloat(spzj_spyj_x.getValue()) + 1)
    spyjDiv.setPosition(spzj_spyj_x.getValue(), spzj_spyj_y.getValue())
}

function div37_click(sender, e) {
    spzj_spyj_y.setValue(parseFloat(spzj_spyj_y.getValue()) + 1)
    spyjDiv.setPosition(spzj_spyj_x.getValue(), spzj_spyj_y.getValue())
}

function div42_click(sender, e) {
    spzj_spyj_x.setValue(parseFloat(spzj_spyj_x.getValue()) - 1)
    spyjDiv.setPosition(spzj_spyj_x.getValue(), spzj_spyj_y.getValue())
}

function div43_click(sender, e) {
    spzj_spyj_y.setValue(parseFloat(spzj_spyj_y.getValue()) - 1)
    spyjDiv.setPosition(spzj_spyj_x.getValue(), spzj_spyj_y.getValue())
}

function div41_click(sender, e) {
    spzj_spyj_height.setValue(parseFloat(spzj_spyj_height.getValue()) + 1)
}

function div36_click(sender, e) {
    spzj_spyj_width.setValue(parseFloat(spzj_spyj_width.getValue()) + 1)
}

function div45_click(sender, e) {
    if(spzj_spyj_height.getValue() <= 0) {
        spzj_spyj_height.setValue("0")
    } else {
        spzj_spyj_height.setValue(parseFloat(spzj_spyj_height.getValue()) - 1)
    }

}

function div44_click(sender, e) {
    if(spzj_spyj_width.getValue() <= 0) {
        spzj_spyj_width.setValue("0")
    } else {
        spzj_spyj_width.setValue(parseFloat(spzj_spyj_width.getValue()) - 1)
    }

}

function tyDiv_click(sender, e) {
    spzj_style.setText("同意：");
    spzj_closeAll();
    spzj_tyDiv.show();
}

function spzj_ty_x_afterrender(sender) {
    spzj_ty_x.setValue(tyDiv.x)
}

function spzj_ty_y_afterrender(sender) {
    spzj_ty_y.setValue(tyDiv.y)
}

function spzj_ty_height_afterrender(sender) {
    spzj_ty_height.setValue("0")
}

function spzj_ty_width_afterrender(sender) {
    spzj_ty_width.setValue("0")
}

function div63_click(sender, e) {
    spzj_ty_x.setValue(parseFloat(spzj_ty_x.getValue()) + 1)
    tyDiv.setPosition(spzj_ty_x.getValue(), spzj_ty_y.getValue())
}

function div65_click(sender, e) {
    spzj_ty_y.setValue(parseFloat(spzj_ty_y.getValue()) + 1)
    tyDiv.setPosition(spzj_ty_x.getValue(), spzj_ty_y.getValue())
}

function div67_click(sender, e) {
    spzj_ty_x.setValue(parseFloat(spzj_ty_x.getValue()) - 1)
    tyDiv.setPosition(spzj_ty_x.getValue(), spzj_ty_y.getValue())
}

function div68_click(sender, e) {
    spzj_ty_y.setValue(parseFloat(spzj_ty_y.getValue()) - 1)
    tyDiv.setPosition(spzj_ty_x.getValue(), spzj_ty_y.getValue())
}

function div66_click(sender, e) {
    spzj_ty_height.setValue(parseFloat(spzj_ty_height.getValue()) + 1)
}

function div64_click(sender, e) {
    spzj_ty_width.setValue(parseFloat(spzj_ty_width.getValue()) + 1)
}

function div70_click(sender, e) {
    if(spzj_ty_height.getValue() == "0") {
        spzj_ty_height.setValue("0")
    } else {
        spzj_ty_height.setValue(parseFloat(spzj_ty_height.getValue()) - 1)
    }
}

function div69_click(sender, e) {
    if(spzj_ty_width.getValue() == "0") {
        spzj_ty_width.setValue("0")
    } else {
        spzj_ty_width.setValue(parseFloat(spzj_ty_width.getValue()) - 1)
    }
}

function spzj_bty_x_afterrender(sender) {
    spzj_bty_x.setValue(btyDiv.x)
}

function spzj_bty_y_afterrender(sender) {
    spzj_bty_y.setValue(btyDiv.y)
}

function spzj_bty_height_afterrender(sender) {
    spzj_bty_height.setValue("0")
}

function spzj_bty_width_afterrender(sender) {
    spzj_bty_width.setValue("0")
}

function div71_click(sender, e) {
    spzj_bty_x.setValue(parseFloat(spzj_bty_x.getValue()) + 1)
    btyDiv.setPosition(spzj_bty_x.getValue(), spzj_bty_y.getValue())
}

function div75_click(sender, e) {
    spzj_bty_x.setValue(parseFloat(spzj_bty_x.getValue()) - 1)
    btyDiv.setPosition(spzj_bty_x.getValue(), spzj_bty_y.getValue())
}

function div73_click(sender, e) {
    spzj_bty_y.setValue(parseFloat(spzj_bty_y.getValue()) + 1)
    btyDiv.setPosition(spzj_bty_x.getValue(), spzj_bty_y.getValue())
}

function div76_click(sender, e) {
    spzj_bty_y.setValue(parseFloat(spzj_bty_y.getValue()) - 1)
    btyDiv.setPosition(spzj_bty_x.getValue(), spzj_bty_y.getValue())
}

function div74_click(sender, e) {
    spzj_bty_height.setValue(parseFloat(spzj_bty_height.getValue()) + 1)
}

function div78_click(sender, e) {
    if(spzj_bty_height.getValue() == "0") {
        spzj_bty_height.setValue("0")
    } else {
        spzj_bty_height.setValue(parseFloat(spzj_bty_height.getValue()) - 1)
    }

}

function div72_click(sender, e) {
    spzj_bty_width.setValue(parseFloat(spzj_bty_width.getValue()) + 1)
}

function div77_click(sender, e) {
    if(spzj_bty_width.getValue() == "0") {
        spzj_bty_width.setValue("0")
    } else {
        spzj_bty_width.setValue(parseFloat(spzj_bty_width.getValue()) - 1)
    }
}

function btyDiv_click(sender, e) {
    spzj_style.setText("不同意：");
    spzj_closeAll();
    spzj_btyDiv.show();
}

function div79_click(sender, e) {
    spzj_th_x.setValue(parseFloat(spzj_th_x.getValue()) + 1)
    thDiv.setPosition(spzj_th_x.getValue(), spzj_th_y.getValue())
}

function div81_click(sender, e) {
    spzj_th_y.setValue(parseFloat(spzj_th_y.getValue()) + 1)
    thDiv.setPosition(spzj_th_x.getValue(), spzj_th_y.getValue())
}

function div83_click(sender, e) {
    spzj_th_x.setValue(parseFloat(spzj_th_x.getValue()) - 1)
    thDiv.setPosition(spzj_th_x.getValue(), spzj_th_y.getValue())
}

function div84_click(sender, e) {
    spzj_th_y.setValue(parseFloat(spzj_th_y.getValue()) - 1)
    thDiv.setPosition(spzj_th_x.getValue(), spzj_th_y.getValue())
}

function spzj_th_x_afterrender(sender) {
    spzj_th_x.setValue(thDiv.x)
}

function spzj_th_y_afterrender(sender) {
    spzj_th_y.setValue(thDiv.y)
}

function spzj_th_height_afterrender(sender) {
    spzj_th_height.setValue("0")
}

function spzj_th_width_afterrender(sender) {
    spzj_th_width.setValue("0")
}

function div82_click(sender, e) {
    spzj_th_height.setValue(parseFloat(spzj_th_height.getValue()) + 1)
}

function div80_click(sender, e) {
    spzj_th_width.setValue(parseFloat(spzj_th_width.getValue()) + 1)
}

function div86_click(sender, e) {
    if(spzj_th_height.getValue() <= 1) {
        spzj_th_height.setValue("0")
    } else {
        spzj_th_height.setValue(parseFloat(spzj_th_height.getValue()) - 1)
    }
}

function div85_click(sender, e) {
    if(spzj_th_width.getValue() <= 1) {
        spzj_th_width.setValue("0")
    } else {
        spzj_th_width.setValue(parseFloat(spzj_th_width.getValue()) - 1)
    }
}

function thDiv_click(sender, e) {
    spzj_style.setText("退回：");
    spzj_closeAll();
    spzj_thDiv.show();
}

function spzj_spz_x_afterrender(sender) {
    spzj_spz_x.setValue(spzDiv.x)
}

function spzj_spz_y_afterrender(sender) {
    spzj_spz_y.setValue(spzDiv.y)

}

function spzj_spz_height_afterrender(sender) {
    spzj_spz_height.setValue("0")
}

function spzj_spz_width_afterrender(sender) {
    spzj_spz_width.setValue("0")
}

function div89_click(sender, e) {
    spzj_spz_x.setValue(parseFloat(spzj_spz_x.getValue()) + 1)
    spzDiv.setPosition(spzj_spz_x.getValue(), spzj_spz_y.getValue())
}

function div91_click(sender, e) {
    spzj_spz_y.setValue(parseFloat(spzj_spz_y.getValue()) + 1)
    spzDiv.setPosition(spzj_spz_x.getValue(), spzj_spz_y.getValue())
}

function div93_click(sender, e) {
    spzj_spz_x.setValue(parseFloat(spzj_spz_x.getValue()) - 1)
    spzDiv.setPosition(spzj_spz_x.getValue(), spzj_spz_y.getValue())
}

function div94_click(sender, e) {
    spzj_spz_y.setValue(parseFloat(spzj_spz_y.getValue()) - 1)
    spzDiv.setPosition(spzj_spz_x.getValue(), spzj_spz_y.getValue())
}

function div92_click(sender, e) {
    spzj_spz_height.setValue(parseFloat(spzj_spz_height.getValue()) + 1)
}

function div90_click(sender, e) {
    spzj_spz_width.setValue(parseFloat(spzj_spz_width.getValue()) + 1)
}

function div96_click(sender, e) {
    if(spzj_spz_height.getValue() <= 0) {
        spzj_spz_height.setValue("0")
    } else {
        spzj_spz_height.setValue(parseFloat(spzj_spz_height.getValue()) - 1)
    }
}

function div95_click(sender, e) {
    if(spzj_spz_width.getValue() <= 0) {
        spzj_spz_width.setValue("0")
    } else {
        spzj_spz_width.setValue(parseFloat(spzj_spz_width.getValue()) - 1)
    }
}

function spzDiv_click(sender, e) {
    spzj_style.setText("审批章：");
    spzj_closeAll();
    spzj_spzDiv.show();
}

function spzj_spr_x_afterrender(sender) {
    spzj_spr_x.setValue(sprDiv.x)
}

function spzj_spr_y_afterrender(sender) {
    spzj_spr_y.setValue(sprDiv.y)
}

function spzj_spr_height_afterrender(sender) {
    spzj_spr_height.setValue("0")
}

function spzj_spr_width_afterrender(sender) {
    spzj_spr_width.setValue("0")
}

function div97_click(sender, e) {
    spzj_spr_x.setValue(parseFloat(spzj_spr_x.getValue()) + 1)
    sprDiv.setPosition(spzj_spr_x.getValue(), spzj_spr_y.getValue())
}

function div99_click(sender, e) {
    spzj_spr_y.setValue(parseFloat(spzj_spr_y.getValue()) + 1)
    sprDiv.setPosition(spzj_spr_x.getValue(), spzj_spr_y.getValue())
}

function div101_click(sender, e) {
    spzj_spr_x.setValue(parseFloat(spzj_spr_x.getValue()) - 1)
    sprDiv.setPosition(spzj_spr_x.getValue(), spzj_spr_y.getValue())
}

function div102_click(sender, e) {
    spzj_spr_y.setValue(parseFloat(spzj_spr_y.getValue()) - 1)
    sprDiv.setPosition(spzj_spr_x.getValue(), spzj_spr_y.getValue())
}

function div100_click(sender, e) {
    spzj_spr_height.setValue(parseFloat(spzj_spr_height.getValue()) + 1)
}

function div98_click(sender, e) {
    spzj_spr_width.setValue(parseFloat(spzj_spr_width.getValue()) + 1)
}

function div104_click(sender, e) {
    if(spzj_spr_height.getValue() <= 0) {
        spzj_spr_height.setValue("0")
    } else {
        spzj_spr_height.setValue(parseFloat(spzj_spr_height.getValue()) - 1)
    }
}

function div103_click(sender, e) {
    if(spzj_spr_width.getValue() <= 0) {
        spzj_spr_width.setValue("0")
    } else {
        spzj_spr_width.setValue(parseFloat(spzj_spr_width.getValue()) - 1)
    }
}

function sprDiv_click(sender, e) {
    spzj_style.setText("审批人：");
    spzj_closeAll();
    spzj_sprDiv.show();
}

function sprqDiv_click(sender, e) {
    spzj_style.setText("审批日期：");
    spzj_closeAll();
    spzj_sprqDiv.show();
}

function spzj_sprq_rqgs_afterrender(sender) {
    spzj_sprq_rqgs.store = store10;
    spzj_sprq_rqgs.displayField = 'name';
    spzj_sprq_rqgs.valueField = 'id'
}

function div55_click(sender, e) {
    spzj_sprq_x.setValue(parseFloat(spzj_sprq_x.getValue()) + 1)
    sprqDiv.setPosition(spzj_sprq_x.getValue(), spzj_sprq_y.getValue())
}

function div57_click(sender, e) {
    spzj_sprq_y.setValue(parseFloat(spzj_sprq_y.getValue()) + 1)
    sprqDiv.setPosition(spzj_sprq_x.getValue(), spzj_sprq_y.getValue())
}

function div59_click(sender, e) {
    spzj_sprq_x.setValue(parseFloat(spzj_sprq_x.getValue()) - 1)
    sprqDiv.setPosition(spzj_sprq_x.getValue(), spzj_sprq_y.getValue())
}

function div60_click(sender, e) {
    spzj_sprq_y.setValue(parseFloat(spzj_sprq_y.getValue()) - 1)
    sprqDiv.setPosition(spzj_sprq_x.getValue(), spzj_sprq_y.getValue())
}

function div58_click(sender, e) {
    spzj_sprq_height.setValue(parseFloat(spzj_sprq_height.getValue()) + 1)
}

function div56_click(sender, e) {
    spzj_sprq_width.setValue(parseFloat(spzj_sprq_width.getValue()) + 1)
}

function spzj_sprq_width_afterrender(sender) {
    spzj_sprq_width.setValue("0")
}

function spzj_sprq_height_afterrender(sender) {
    spzj_sprq_height.setValue("0")
}

function spzj_sprq_y_afterrender(sender) {
    spzj_sprq_y.setValue(sprqDiv.y)
}

function spzj_sprq_x_afterrender(sender) {
    spzj_sprq_x.setValue(sprqDiv.x)
}

function div62_click(sender, e) {
    if(spzj_sprq_height <= 0) {
        spzj_sprq_height.setValue("0")
    } else {
        spzj_sprq_height.setValue(parseFloat(spzj_sprq_height.getValue()) - 1)
    }
}

function div61_click(sender, e) {
    if(spzj_sprq_width <= 0) {
        spzj_sprq_width.setValue("0")
    } else {
        spzj_sprq_width.setValue(parseFloat(spzj_sprq_width.getValue()) - 1)
    }
}

function div49_click(sender, e) {
    spzj_spbm_height.setValue(parseFloat(spzj_spbm_height.getValue()) + 1)
}

function div47_click(sender, e) {
    spzj_spbm_width.setValue(parseFloat(spzj_spbm_width.getValue()) + 1)
}

function div53_click(sender, e) {
    if(spzj_spbm_height.getValue() <= 1) {
        spzj_spbm_height.setValue("0")
    } else {
        spzj_spbm_height.setValue(parseFloat(spzj_spbm_height.getValue()) - 1)
    }
}

function div52_click(sender, e) {
    if(spzj_spbm_width.getValue() <= 1) {
        spzj_spbm_width.setValue("0")
    } else {
        spzj_spbm_width.setValue(parseFloat(spzj_spbm_width.getValue()) - 1)
    }
}

function spzjTabs_afterrender(sender) {

}
			this.CellType_afterrender=CellType_afterrender;
		this.items=[
			{
				xtype:"vmd.comlist",
				id:"allCellType",
				width:350,
				height:270,
				x:10,
				y:20,
				afterrender:"allCellType_afterrender",
				selectChanged:"allCellType_selectChanged",
				listeners:{
					vmdafterrender:allCellType_afterrender,
					selectChanged:allCellType_selectChanged
				}
			},
			{
				xtype:"tabpanel",
				id:"wbTabs",
				activeTab:0,
				height:476,
				width:379,
				x:0,
				y:90,
				hidden:true,
				items:[
					{
						xtype:"panel",
						id:"panel",
						title:"属性",
						header:true,
						border:true,
						height:439,
						width:401,
						layout:"absolute",
						items:[
							{
								xtype:"label",
								id:"label",
								text:"类别：",
								x:10,
								y:10
							},
							{
								xtype:"radiostoregroup",
								id:"wbRadioGroup",
								width:220,
								height:90,
								labelField:"label",
								valueField:"value",
								checkedField:"checked",
								boxFieldName:"myRadio",
								x:70,
								y:30,
								items:[
									{
										xtype:"radio",
										id:"hwRadio",
										boxLabel:"常规"
									},
									{
										xtype:"radio",
										id:"hwRadio1",
										boxLabel:"文本"
									},
									{
										xtype:"radio",
										id:"hwRadio2",
										boxLabel:"GUID"
									},
									{
										xtype:"radio",
										id:"hwRadio3",
										boxLabel:"序号"
									},
									{
										xtype:"radio",
										id:"hwRadio4",
										boxLabel:"菜单"
									},
									{
										xtype:"radio",
										id:"hwRadio5",
										boxLabel:"超链接",
										width:59
									},
									{
										xtype:"radio",
										id:"hwRadio6",
										boxLabel:"密码"
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel1",
						title:"事件",
						header:true,
						border:true,
						height:100
					}
				]
			},
			{
				xtype:"tabpanel",
				id:"szTabs",
				activeTab:0,
				height:460,
				width:340,
				x:30,
				y:120,
				hidden:true,
				items:[
					{
						xtype:"panel",
						id:"panel2",
						title:"属性",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						hidden:false,
						items:[
							{
								xtype:"checkbox",
								id:"sz_allowEdit",
								fieldLabel:"Checkbox",
								boxLabel:"允许编辑",
								x:40,
								y:20
							},
							{
								xtype:"checkbox",
								id:"sz_allowPrint",
								fieldLabel:"Checkbox",
								boxLabel:"允许打印",
								x:40,
								y:50
							},
							{
								xtype:"label",
								id:"label1",
								text:"校验：",
								x:20,
								y:90
							},
							{
								xtype:"checkbox",
								id:"sz_allowEmp",
								fieldLabel:"Checkbox",
								boxLabel:"允许为空",
								x:40,
								y:110,
								check:"sz_allowEmp_check",
								listeners:{
									check:sz_allowEmp_check
								}
							},
							{
								xtype:"checkbox",
								id:"sz_allowFloat",
								fieldLabel:"Checkbox",
								boxLabel:"允许小数",
								x:40,
								y:150,
								check:"sz_allowFloat_check",
								listeners:{
									check:sz_allowFloat_check
								}
							},
							{
								xtype:"checkbox",
								id:"sz_allowNegative",
								fieldLabel:"Checkbox",
								boxLabel:"允许负数",
								x:40,
								y:180
							},
							{
								xtype:"checkbox",
								id:"sz_max",
								fieldLabel:"Checkbox",
								boxLabel:"最大值",
								x:40,
								y:210
							},
							{
								xtype:"checkbox",
								id:"sz_min",
								fieldLabel:"Checkbox",
								boxLabel:"最小值",
								x:40,
								y:240
							},
							{
								xtype:"checkbox",
								id:"sz_limit",
								fieldLabel:"Checkbox",
								boxLabel:"限制位数",
								x:40,
								y:280
							},
							{
								xtype:"vmd.div",
								id:"szDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:190,
								height:30,
								x:140,
								y:110,
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label2",
										text:"信息提示：",
										x:160,
										y:20
									},
									{
										xtype:"textfield",
										id:"sz_empAlert",
										allowBlank:true,
										x:130,
										y:50,
										width:110,
										style:"border: 1px solid #dddddd",
										disabled:false
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"szDiv1",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:190,
								height:30,
								x:140,
								y:150,
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label3",
										text:"小数位数：",
										x:140,
										y:160,
										height:16
									},
									{
										xtype:"textfield",
										id:"sz_xs",
										allowBlank:true,
										x:200,
										y:160,
										width:110,
										style:"border: 1px solid #dddddd",
										disabled:false
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel3",
						title:"事件",
						header:true,
						border:true,
						height:100
					}
				]
			},
			{
				xtype:"tabpanel",
				id:"xlkTabs",
				activeTab:1,
				height:510,
				width:460,
				x:20,
				y:110,
				hidden:true,
				items:[
					{
						xtype:"panel",
						id:"panel4",
						title:"属性",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						items:[
							{
								xtype:"checkbox",
								id:"xlk_allowEdit",
								fieldLabel:"Checkbox",
								boxLabel:"允许编辑",
								x:10,
								y:10
							},
							{
								xtype:"checkbox",
								id:"xlk_multiple",
								fieldLabel:"Checkbox",
								boxLabel:"多选",
								x:10,
								y:100
							},
							{
								xtype:"checkbox",
								id:"xlk_oneClick",
								fieldLabel:"Checkbox",
								boxLabel:"单击触发",
								x:10,
								y:70
							},
							{
								xtype:"checkbox",
								id:"xlk_allowPrint",
								fieldLabel:"Checkbox",
								boxLabel:"允许打印",
								x:10,
								y:40
							},
							{
								xtype:"label",
								id:"label4",
								text:"宽度：",
								x:20,
								y:140
							},
							{
								xtype:"textfield",
								id:"xlk_kd",
								allowBlank:true,
								x:60,
								y:150,
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
								x:230,
								y:140,
								html:"<img src=\"/system/img/report/border/上.png\" />"
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
								x:230,
								y:160,
								html:"<img src=\"/system/img/report/border/下.png\" />"
							},
							{
								xtype:"label",
								id:"label5",
								text:"校验",
								x:20,
								y:250
							},
							{
								xtype:"vmd.div",
								id:"div2",
								autoEl:"div",
								border:true,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:200,
								height:0,
								x:60,
								y:260
							},
							{
								xtype:"checkbox",
								id:"xlk_allowEmp",
								fieldLabel:"Checkbox",
								boxLabel:"允许为空",
								x:20,
								y:280,
								check:"xlk_allowEmp_check",
								listeners:{
									check:xlk_allowEmp_check
								}
							},
							{
								xtype:"label",
								id:"label7",
								text:"%",
								x:210,
								y:160
							},
							{
								xtype:"vmd.div",
								id:"xlkDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:230,
								height:40,
								x:110,
								y:280,
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label6",
										text:"提示信息：",
										x:100,
										y:290
									},
									{
										xtype:"textfield",
										id:"xlk_empAlert",
										allowBlank:true,
										x:170,
										y:290,
										style:"border: 1px solid #dddddd"
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel5",
						title:"数据",
						header:true,
						border:true,
						height:100
					},
					{
						xtype:"panel",
						id:"panel6",
						title:"事件",
						header:true,
						border:true,
						height:100
					}
				]
			},
			{
				xtype:"tabpanel",
				id:"dxanTabs",
				height:540,
				width:540,
				x:10,
				y:100,
				hidden:true,
				items:[
					{
						xtype:"panel",
						id:"panel7",
						title:"属性",
						header:true,
						border:true,
						height:386,
						layout:"absolute",
						items:[
							{
								xtype:"checkbox",
								id:"dxan_allowEdit",
								fieldLabel:"Checkbox",
								boxLabel:"允许编辑",
								x:10,
								y:10
							},
							{
								xtype:"checkbox",
								id:"dxan_allowPrint",
								fieldLabel:"Checkbox",
								boxLabel:"允许打印",
								x:10,
								y:40
							},
							{
								xtype:"label",
								id:"label8",
								text:"布局：",
								x:10,
								y:70
							},
							{
								xtype:"checkbox",
								id:"dxan_adaptive",
								fieldLabel:"Checkbox",
								boxLabel:"自适应",
								x:30,
								y:100,
								check:"dxan_adaptive_check",
								listeners:{
									check:dxan_adaptive_check
								}
							},
							{
								xtype:"label",
								id:"label9",
								text:"行间距：",
								x:40,
								y:150
							},
							{
								xtype:"textfield",
								id:"dxan_hjj",
								allowBlank:true,
								x:100,
								y:150,
								style:"border: 1px solid #dddddd",
								afterrender:"dxan_hjj_afterrender",
								listeners:{
									vmdafterrender:dxan_hjj_afterrender
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
								x:250,
								y:150,
								html:"<img src=\"/system/img/report/border/上.png\" />",
								cls:"btn",
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
								x:250,
								y:160,
								html:"<img src=\"/system/img/report/border/下.png\" />",
								cls:"btn",
								click:"div4_click",
								listeners:{
									click:div4_click
								}
							},
							{
								xtype:"label",
								id:"label10",
								text:"展示样式：",
								x:30,
								y:200
							},
							{
								xtype:"radiostoregroup",
								id:"dxan_style",
								width:200,
								height:40,
								labelField:"label",
								valueField:"value",
								checkedField:"checked",
								boxFieldName:"myRadio",
								x:90,
								y:230,
								items:[
									{
										xtype:"radio",
										id:"hwRadio7",
										boxLabel:"方形"
									},
									{
										xtype:"radio",
										id:"hwRadio8",
										boxLabel:"圆形",
										style:"margin-left: 30px"
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"dxanDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:260,
								height:40,
								x:130,
								y:90,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label11",
										text:"展示列数：",
										x:0,
										y:0
									},
									{
										xtype:"textfield",
										id:"dxan_displayColumn",
										allowBlank:true,
										x:60,
										y:0,
										style:"border: 1px solid #dddddd",
										afterrender:"dxan_displayColumn_afterrender",
										listeners:{
											vmdafterrender:dxan_displayColumn_afterrender
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
										x:210,
										y:0,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:210,
										y:20,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div7_click",
										listeners:{
											click:div7_click
										}
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel8",
						title:"数据",
						header:true,
						border:true,
						height:100
					},
					{
						xtype:"panel",
						id:"panel9",
						title:"事件",
						header:true,
						border:true,
						height:100
					}
				]
			},
			{
				xtype:"tabpanel",
				id:"fxkTabs",
				activeTab:0,
				height:510,
				width:510,
				x:10,
				y:80,
				hidden:true,
				items:[
					{
						xtype:"panel",
						id:"panel12",
						title:"属性",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						items:[
							{
								xtype:"checkbox",
								id:"fxk_allowEdit",
								fieldLabel:"Checkbox",
								boxLabel:"允许编辑",
								x:10,
								y:10
							},
							{
								xtype:"checkbox",
								id:"fxk_allowPrint",
								fieldLabel:"Checkbox",
								boxLabel:"允许打印",
								x:10,
								y:40
							},
							{
								xtype:"checkbox",
								id:"fxk_groups",
								fieldLabel:"Checkbox",
								boxLabel:"多组",
								x:10,
								y:70
							},
							{
								xtype:"label",
								id:"label12",
								text:"校验",
								x:20,
								y:120
							},
							{
								xtype:"vmd.div",
								id:"div5",
								autoEl:"div",
								border:true,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:0,
								x:60,
								y:130
							},
							{
								xtype:"checkbox",
								id:"fxk_allowEmp",
								fieldLabel:"Checkbox",
								boxLabel:"允许为空",
								x:20,
								y:160,
								check:"fxk_allowEmp_check",
								listeners:{
									check:fxk_allowEmp_check
								}
							},
							{
								xtype:"vmd.div",
								id:"fxkDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:50,
								x:50,
								y:200,
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label13",
										text:"提示信息："
									},
									{
										xtype:"textfield",
										id:"fxk_empAlert",
										allowBlank:true,
										cls:"isBorder"
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel10",
						title:"数据",
						header:true,
						border:true,
						height:100
					},
					{
						xtype:"panel",
						id:"panel11",
						title:"事件",
						header:true,
						border:true,
						height:100
					},
					{
						xtype:"panel",
						id:"panel22",
						title:"属性",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						items:[
							{
								xtype:"checkbox",
								id:"hwCheckbox2",
								fieldLabel:"Checkbox",
								boxLabel:"允许编辑",
								x:10,
								y:10
							},
							{
								xtype:"checkbox",
								id:"hwCheckbox3",
								fieldLabel:"Checkbox",
								boxLabel:"允许打印",
								x:10,
								y:40
							},
							{
								xtype:"checkbox",
								id:"hwCheckbox4",
								fieldLabel:"Checkbox",
								boxLabel:"多组",
								x:10,
								y:70
							},
							{
								xtype:"label",
								id:"label122",
								text:"校验",
								x:20,
								y:120
							},
							{
								xtype:"vmd.div",
								id:"div34",
								autoEl:"div",
								border:true,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:0,
								x:60,
								y:130
							},
							{
								xtype:"checkbox",
								id:"hwCheckbox6",
								fieldLabel:"Checkbox",
								boxLabel:"允许为空",
								x:20,
								y:160,
								check:"fxk_allowEmp_check",
								listeners:{
									check:fxk_allowEmp_check
								}
							},
							{
								xtype:"vmd.div",
								id:"div87",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:50,
								x:50,
								y:200,
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label123",
										text:"提示信息："
									},
									{
										xtype:"textfield",
										id:"hwText7",
										allowBlank:true,
										cls:"isBorder"
									}
								]
							}
						]
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"txm",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:510,
				x:10,
				y:80,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label17",
						text:"类型设置：",
						x:20,
						y:30
					},
					{
						xtype:"vmd.comlist",
						id:"txm_codeType",
						width:270,
						height:270,
						x:90,
						y:30,
						afterrender:"txm_codeType_afterrender",
						selectChanged:"txm_codeType_selectChanged",
						listeners:{
							vmdafterrender:txm_codeType_afterrender,
							selectChanged:txm_codeType_selectChanged
						}
					},
					{
						xtype:"vmd.div",
						id:"code39Div",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:400,
						height:430,
						x:0,
						y:80,
						layout:"absolute",
						hidden:true,
						items:[
							{
								xtype:"label",
								id:"label14",
								text:"宽度：",
								x:10,
								y:10
							},
							{
								xtype:"label",
								id:"label15",
								text:"高度：",
								x:10,
								y:80
							},
							{
								xtype:"label",
								id:"label16",
								text:"文本：",
								x:10,
								y:130
							},
							{
								xtype:"textfield",
								id:"txm_code39_width",
								allowBlank:true,
								x:60,
								y:10,
								cls:"isBorder",
								afterrender:"txm_code39_width_afterrender",
								listeners:{
									vmdafterrender:txm_code39_width_afterrender
								}
							},
							{
								xtype:"textfield",
								id:"txm_code39_height",
								allowBlank:true,
								x:60,
								y:80,
								cls:"isBorder",
								afterrender:"txm_code39_height_afterrender",
								listeners:{
									vmdafterrender:txm_code39_height_afterrender
								}
							},
							{
								xtype:"checkbox",
								id:"txm_code39_displayText",
								fieldLabel:"Checkbox",
								boxLabel:"显示条形码的文本",
								x:80,
								y:130
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
								x:210,
								y:10,
								html:"<img src=\"/system/img/report/border/上.png\" />",
								cls:"btn",
								click:"div8_click",
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
								width:30,
								height:15,
								x:210,
								y:20,
								cls:"btn",
								html:"<img src=\"/system/img/report/border/下.png\" />",
								click:"div9_click",
								listeners:{
									click:div9_click
								}
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
								x:210,
								y:80,
								html:"<img src=\"/system/img/report/border/上.png\" />",
								cls:"btn",
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
								x:210,
								y:90,
								cls:"btn",
								html:"<img src=\"/system/img/report/border/下.png\" />",
								click:"div11_click",
								listeners:{
									click:div11_click
								}
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"code128Div",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:400,
						height:430,
						x:0,
						y:80,
						layout:"absolute",
						hidden:true,
						items:[
							{
								xtype:"label",
								id:"label18",
								text:"宽度：",
								x:10,
								y:10
							},
							{
								xtype:"label",
								id:"label19",
								text:"高度：",
								x:10,
								y:80
							},
							{
								xtype:"label",
								id:"label20",
								text:"文本：",
								x:10,
								y:130
							},
							{
								xtype:"checkbox",
								id:"txm_code128_displayText",
								fieldLabel:"Checkbox",
								boxLabel:"显示条形码的文本",
								x:80,
								y:130
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
								x:210,
								y:10,
								html:"<img src=\"/system/img/report/border/上.png\" />",
								cls:"btn",
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
								x:210,
								y:20,
								html:"<img src=\"/system/img/report/border/下.png\" />",
								cls:"btn",
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
								x:210,
								y:80,
								html:"<img src=\"/system/img/report/border/上.png\" />",
								cls:"btn",
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
								x:210,
								y:90,
								html:"<img src=\"/system/img/report/border/下.png\" />",
								cls:"btn",
								click:"div15_click",
								listeners:{
									click:div15_click
								}
							},
							{
								xtype:"textfield",
								id:"txm_code128_width",
								allowBlank:true,
								x:60,
								y:10,
								cls:"isBorder",
								afterrender:"txm_code128_width_afterrender",
								listeners:{
									vmdafterrender:txm_code128_width_afterrender
								}
							},
							{
								xtype:"textfield",
								id:"txm_code128_height",
								allowBlank:true,
								x:60,
								y:80,
								cls:"isBorder",
								afterrender:"txm_code128_height_afterrender",
								listeners:{
									vmdafterrender:txm_code128_height_afterrender
								}
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"QRCodeDiv",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:400,
						height:420,
						x:0,
						y:70,
						layout:"absolute",
						hidden:true,
						items:[
							{
								xtype:"label",
								id:"label21",
								text:"纠错等级：",
								height:20,
								x:10,
								y:10
							},
							{
								xtype:"vmd.comlist",
								id:"txm_QRCode_mistake",
								width:270,
								height:270,
								x:80,
								y:10,
								afterrender:"txm_QRCode_mistake_afterrender",
								listeners:{
									vmdafterrender:txm_QRCode_mistake_afterrender
								}
							},
							{
								xtype:"label",
								id:"label22",
								text:"版本信息：",
								x:10,
								y:60
							},
							{
								xtype:"vmd.comlist",
								id:"txm_QRCode_version",
								width:270,
								height:270,
								x:80,
								y:70,
								afterrender:"txm_QRCode_version_afterrender",
								listeners:{
									vmdafterrender:txm_QRCode_version_afterrender
								}
							},
							{
								xtype:"checkbox",
								id:"txm_QRCode_autoVersion",
								fieldLabel:"Checkbox",
								boxLabel:"自动匹配",
								x:10,
								y:110
							},
							{
								xtype:"label",
								id:"label23",
								text:"边距：",
								x:10,
								y:150
							},
							{
								xtype:"vmd.comlist",
								id:"txm_QRCode_margin",
								width:270,
								height:270,
								x:80,
								y:140,
								afterrender:"txm_QRCode_margin_afterrender",
								listeners:{
									vmdafterrender:txm_QRCode_margin_afterrender
								}
							},
							{
								xtype:"label",
								id:"label24",
								text:"掩模图形：",
								x:10,
								y:190
							},
							{
								xtype:"vmd.comlist",
								id:"txm_QRCode_ymtx",
								width:270,
								height:270,
								x:80,
								y:200,
								afterrender:"txm_QRCode_ymtx_afterrender",
								listeners:{
									vmdafterrender:txm_QRCode_ymtx_afterrender
								}
							},
							{
								xtype:"label",
								id:"label25",
								text:"LOGO：",
								x:20,
								y:250
							},
							{
								xtype:"textfield",
								id:"txm_QRCode_logo",
								allowBlank:true,
								x:90,
								y:250,
								width:180,
								cls:"isBorder",
								readOnly:true
							},
							{
								xtype:"vmd.div",
								id:"div16",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:40,
								height:40,
								x:300,
								y:250,
								cls:"btn",
								html:"<img src=\"/system/img/report/border/文件夹1.png\" />",
								layout:"fit",
								click:"div16_click",
								listeners:{
									click:div16_click
								}
							}
						]
					}
				]
			},
			{
				xtype:"tabpanel",
				id:"rqTabs",
				activeTab:0,
				height:580,
				width:360,
				x:10,
				y:70,
				hidden:true,
				items:[
					{
						xtype:"panel",
						id:"panel13",
						title:"属性",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						items:[
							{
								xtype:"checkbox",
								id:"rq_allowEdit",
								fieldLabel:"Checkbox",
								boxLabel:"允许编辑",
								x:30,
								y:70
							},
							{
								xtype:"checkbox",
								id:"rq_customStyle",
								fieldLabel:"Checkbox",
								boxLabel:"自定义格式",
								x:30,
								y:110
							},
							{
								xtype:"label",
								id:"label26",
								text:"格式：",
								x:20,
								y:150
							},
							{
								xtype:"textfield",
								id:"rq_StyleDisplay",
								allowBlank:true,
								x:170,
								y:150,
								style:"border: none"
							},
							{
								xtype:"vmd.comlist",
								id:"rq_style",
								width:330,
								height:270,
								x:10,
								y:180,
								afterrender:"rq_style_afterrender",
								selectChanged:"rq_style_selectChanged",
								listeners:{
									vmdafterrender:rq_style_afterrender,
									selectChanged:rq_style_selectChanged
								}
							},
							{
								xtype:"checkbox",
								id:"rq_defaultToday",
								fieldLabel:"Checkbox",
								boxLabel:"默认当前日期",
								x:50,
								y:230
							},
							{
								xtype:"checkbox",
								id:"rq_allowPrint",
								fieldLabel:"Checkbox",
								boxLabel:"允许打印",
								x:50,
								y:270
							},
							{
								xtype:"label",
								id:"label27",
								text:"校验",
								x:20,
								y:320
							},
							{
								xtype:"vmd.div",
								id:"div17",
								autoEl:"div",
								border:true,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:270,
								height:0,
								x:50,
								y:330
							},
							{
								xtype:"checkbox",
								id:"rs_allowEmp",
								fieldLabel:"Checkbox",
								boxLabel:"允许为空",
								x:40,
								y:350,
								check:"rs_allowEmp_check",
								listeners:{
									check:rs_allowEmp_check
								}
							},
							{
								xtype:"vmd.div",
								id:"rqDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:240,
								height:40,
								x:50,
								y:390,
								hidden:false,
								items:[
									{
										xtype:"label",
										id:"label28",
										text:"提示信息：",
										x:30,
										y:400
									},
									{
										xtype:"textfield",
										id:"rq_empAlert",
										allowBlank:true,
										cls:"isBorder"
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel14",
						title:"事件",
						header:true,
						border:true,
						height:100
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"qtb",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:350,
				height:560,
				x:10,
				y:70,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label29",
						text:"模板：",
						x:10,
						y:10
					},
					{
						xtype:"textfield",
						id:"qtb_template",
						allowBlank:true,
						x:50,
						y:10,
						readOnly:true
					},
					{
						xtype:"vmd.button",
						id:"button",
						text:"可视化编辑器",
						type:"(none)",
						size:"small",
						x:220,
						y:10
					},
					{
						xtype:"label",
						id:"label30",
						text:"名称：",
						x:10,
						y:50
					},
					{
						xtype:"textfield",
						id:"qtb_name",
						allowBlank:true,
						x:50,
						y:50
					},
					{
						xtype:"radiostoregroup",
						id:"qtb_style",
						width:180,
						height:40,
						labelField:"label",
						valueField:"value",
						checkedField:"checked",
						boxFieldName:"myRadio",
						x:30,
						y:90,
						items:[
							{
								xtype:"radio",
								id:"hwRadio9",
								boxLabel:"内嵌式",
								width:91,
								inputValue:"nq"
							},
							{
								xtype:"radio",
								id:"hwRadio10",
								boxLabel:"伸缩式",
								inputValue:"ss"
							}
						]
					},
					{
						xtype:"checkbox",
						id:"qtb_expansion",
						fieldLabel:"Checkbox",
						boxLabel:"展开",
						x:240,
						y:90
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"tp",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:550,
				x:10,
				y:80,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label31",
						text:"显示方式：",
						x:10,
						y:10
					},
					{
						xtype:"label",
						id:"label32",
						text:"图片布局：",
						x:10,
						y:80
					},
					{
						xtype:"label",
						id:"label33",
						text:"图片来源：",
						x:10,
						y:140,
						height:20
					},
					{
						xtype:"label",
						id:"label34",
						text:"选择控件：",
						x:10,
						y:200
					},
					{
						xtype:"checkbox",
						id:"tp_excel",
						fieldLabel:"Checkbox",
						boxLabel:"导出到Excel",
						x:10,
						y:240
					},
					{
						xtype:"vmd.comlist",
						id:"tp_display",
						width:310,
						height:270,
						x:70,
						y:10,
						afterrender:"tp_display_afterrender",
						listeners:{
							vmdafterrender:tp_display_afterrender
						}
					},
					{
						xtype:"vmd.comlist",
						id:"tp_layout",
						width:300,
						height:270,
						x:70,
						y:70,
						afterrender:"tp_layout_afterrender",
						listeners:{
							vmdafterrender:tp_layout_afterrender
						}
					},
					{
						xtype:"vmd.comlist",
						id:"tp_source",
						width:290,
						height:270,
						x:70,
						y:140,
						afterrender:"tp_source_afterrender",
						listeners:{
							vmdafterrender:tp_source_afterrender
						}
					},
					{
						xtype:"vmd.comlist",
						id:"tp_control",
						width:280,
						height:270,
						x:70,
						y:200
					},
					{
						xtype:"vmd.div",
						id:"div19",
						autoEl:"div",
						border:true,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:40,
						height:40,
						x:350,
						y:190
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"jdt",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:530,
				x:10,
				y:80,
				layout:"absolute",
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label35",
						text:"外框颜色：",
						x:10,
						y:10
					},
					{
						xtype:"label",
						id:"label36",
						text:"填充颜色：",
						x:10,
						y:60
					},
					{
						xtype:"vmd.ux.ColorSelect",
						id:"ColorSelect",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						layout:"fit",
						x:70,
						y:10,
						height:28,
						width:280
					},
					{
						xtype:"textfield",
						id:"hwText",
						allowBlank:true,
						x:70,
						y:60
					},
					{
						xtype:"vmd.ux.ColorSelect",
						id:"ColorSelect1",
						layout:"fit",
						x:220,
						y:60,
						width:130
					},
					{
						xtype:"label",
						id:"label40",
						text:"值：",
						x:40,
						y:110
					},
					{
						xtype:"textfield",
						id:"hwText1",
						allowBlank:true,
						x:70,
						y:110,
						width:220
					},
					{
						xtype:"vmd.button",
						id:"button1",
						text:"可视化",
						type:"(none)",
						size:"small",
						x:300,
						y:110
					},
					{
						xtype:"label",
						id:"label41",
						text:"边距：",
						x:20,
						y:150
					},
					{
						xtype:"label",
						id:"label42",
						text:"上：",
						x:40,
						y:190,
						height:20
					},
					{
						xtype:"label",
						id:"label43",
						text:"下：",
						x:40,
						y:240
					},
					{
						xtype:"label",
						id:"label44",
						text:"左：",
						x:200,
						y:190
					},
					{
						xtype:"label",
						id:"label45",
						text:"右：",
						x:200,
						y:250
					},
					{
						xtype:"textfield",
						id:"jdt_top",
						allowBlank:true,
						x:70,
						y:190,
						width:70,
						afterrender:"jdt_top_afterrender",
						listeners:{
							vmdafterrender:jdt_top_afterrender
						}
					},
					{
						xtype:"textfield",
						id:"jdt_left",
						allowBlank:true,
						x:240,
						y:190,
						width:70,
						afterrender:"jdt_left_afterrender",
						listeners:{
							vmdafterrender:jdt_left_afterrender
						}
					},
					{
						xtype:"textfield",
						id:"jdt_bottom",
						allowBlank:true,
						x:70,
						y:240,
						width:70,
						afterrender:"jdt_bottom_afterrender",
						listeners:{
							vmdafterrender:jdt_bottom_afterrender
						}
					},
					{
						xtype:"textfield",
						id:"jdt_right",
						allowBlank:true,
						x:240,
						y:240,
						width:60,
						afterrender:"jdt_right_afterrender",
						listeners:{
							vmdafterrender:jdt_right_afterrender
						}
					},
					{
						xtype:"vmd.div",
						id:"div21",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:140,
						y:210,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						cls:"btn",
						click:"div21_click",
						listeners:{
							click:div21_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div23",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:140,
						y:200,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						click:"div23_click",
						cls:"btn",
						listeners:{
							click:div23_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div24",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:150,
						y:260,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						cls:"btn",
						click:"div24_click",
						listeners:{
							click:div24_click
						}
					},
					{
						xtype:"vmd.div",
						id:"div25",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:30,
						height:15,
						x:310,
						y:210,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						cls:"btn",
						click:"div25_click",
						listeners:{
							click:div25_click
						}
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
						x:310,
						y:260,
						html:"<img src=\"/system/img/report/border/下.png\" />",
						cls:"btn",
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
						x:150,
						y:250,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						click:"div27_click",
						cls:"btn",
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
						x:310,
						y:200,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						click:"div28_click",
						cls:"btn",
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
						x:310,
						y:250,
						html:"<img src=\"/system/img/report/border/上.png\" />",
						click:"div29_click",
						cls:"btn",
						listeners:{
							click:div29_click
						}
					}
				]
			},
			{
				xtype:"tabpanel",
				id:"fwbTabs",
				activeTab:0,
				height:480,
				width:360,
				x:10,
				y:100,
				hidden:true,
				items:[
					{
						xtype:"panel",
						id:"panel15",
						title:"属性",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						items:[
							{
								xtype:"checkbox",
								id:"fwb_allowEdit",
								fieldLabel:"Checkbox",
								boxLabel:"允许编辑",
								x:20,
								y:40
							},
							{
								xtype:"checkbox",
								id:"fwb_allowPrint",
								fieldLabel:"Checkbox",
								boxLabel:"允许打印",
								x:20,
								y:70
							},
							{
								xtype:"checkbox",
								id:"fwb_allowEmp",
								fieldLabel:"Checkbox",
								boxLabel:"允许为空",
								x:20,
								y:240,
								check:"fwb_allowEmp_check",
								listeners:{
									check:fwb_allowEmp_check
								}
							},
							{
								xtype:"label",
								id:"label37",
								text:"段前缩进：",
								x:20,
								y:110
							},
							{
								xtype:"textfield",
								id:"fwb_indentation",
								allowBlank:true,
								x:90,
								y:110,
								cls:"isBorder",
								afterrender:"fwb_indentation_afterrender",
								listeners:{
									vmdafterrender:fwb_indentation_afterrender
								}
							},
							{
								xtype:"vmd.div",
								id:"div18",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:30,
								height:15,
								x:240,
								y:110,
								html:"<img src=\"/system/img/report/border/上.png\" />",
								cls:"btn",
								click:"div18_click",
								listeners:{
									click:div18_click
								}
							},
							{
								xtype:"vmd.div",
								id:"div20",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:30,
								height:15,
								x:240,
								y:120,
								html:"<img src=\"/system/img/report/border/下.png\" />",
								cls:"btn",
								click:"div20_click",
								listeners:{
									click:div20_click
								}
							},
							{
								xtype:"vmd.div",
								id:"fwbDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:320,
								height:50,
								x:50,
								y:270,
								items:[
									{
										xtype:"label",
										id:"label39",
										text:"提示信息："
									},
									{
										xtype:"textfield",
										id:"fwb_empAlert",
										allowBlank:true,
										cls:"isBorder"
									}
								]
							},
							{
								xtype:"label",
								id:"label38",
								text:"校验",
								x:10,
								y:210
							},
							{
								xtype:"vmd.div",
								id:"div22",
								autoEl:"div",
								border:true,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:290,
								height:0,
								x:40,
								y:220
							}
						]
					},
					{
						xtype:"panel",
						id:"panel16",
						title:"事件",
						header:true,
						border:true,
						height:100
					}
				]
			},
			{
				xtype:"tabpanel",
				id:"sczjTabs",
				activeTab:0,
				height:480,
				width:400,
				x:10,
				y:80,
				hidden:true,
				items:[
					{
						xtype:"panel",
						id:"panel17",
						title:"属性",
						header:true,
						border:true,
						height:522,
						width:374,
						layout:"absolute",
						items:[
							{
								xtype:"radiostoregroup",
								id:"sczj_type",
								width:330,
								height:30,
								labelField:"label",
								valueField:"value",
								checkedField:"checked",
								boxFieldName:"myRadio",
								x:60,
								y:10,
								change:"sczj_type_change",
								listeners:{
									change:sczj_type_change
								},
								items:[
									{
										xtype:"radio",
										id:"sczj_type_wd",
										boxLabel:"文档",
										width:62,
										inputValue:"word",
										checked:true
									},
									{
										xtype:"radio",
										id:"sczj_type_tp",
										boxLabel:"图片",
										width:63,
										inputValue:"pic"
									},
									{
										xtype:"radio",
										id:"hwRadio13",
										boxLabel:"视频",
										width:66,
										disabled:true
									},
									{
										xtype:"radio",
										id:"hwRadio14",
										boxLabel:"音频",
										disabled:true,
										width:54
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"wdDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:400,
								x:0,
								y:50,
								layout:"absolute",
								hidden:false,
								items:[
									{
										xtype:"label",
										id:"label47",
										text:"允许最多上传文档：",
										x:10,
										y:10
									},
									{
										xtype:"textfield",
										id:"sczj_max",
										allowBlank:true,
										x:120,
										y:10,
										afterrender:"sczj_max_afterrender",
										listeners:{
											vmdafterrender:sczj_max_afterrender
										}
									},
									{
										xtype:"label",
										id:"label48",
										text:"个",
										x:360,
										y:10
									},
									{
										xtype:"label",
										id:"label49",
										text:"布局：",
										x:10,
										y:50
									},
									{
										xtype:"label",
										id:"label50",
										text:"每页显示：",
										x:60,
										y:50
									},
									{
										xtype:"label",
										id:"label51",
										text:"每行显示：",
										x:60,
										y:90
									},
									{
										xtype:"textfield",
										id:"sczj_wd_rowDisplay",
										allowBlank:true,
										x:120,
										y:80
									},
									{
										xtype:"textfield",
										id:"sczj_wd_pageDisplay",
										allowBlank:true,
										x:120,
										y:40
									},
									{
										xtype:"vmd.button",
										id:"button2",
										text:"button",
										type:"(none)",
										size:"small",
										x:280,
										y:40,
										width:20
									},
									{
										xtype:"vmd.button",
										id:"button3",
										text:"button",
										type:"(none)",
										size:"small",
										x:280,
										y:80,
										width:20
									},
									{
										xtype:"label",
										id:"label52",
										text:"张",
										x:360,
										y:50
									},
									{
										xtype:"label",
										id:"label53",
										text:"个",
										x:360,
										y:90
									},
									{
										xtype:"label",
										id:"label54",
										text:"权限控制：",
										x:10,
										y:120
									},
									{
										xtype:"checkbox",
										id:"sczj_wd_delete",
										fieldLabel:"Checkbox",
										boxLabel:"删除",
										x:10,
										y:170
									},
									{
										xtype:"checkbox",
										id:"sczj_wd_add",
										fieldLabel:"Checkbox",
										boxLabel:"添加",
										x:10,
										y:140
									},
									{
										xtype:"textfield",
										id:"sczj_wd_addContent",
										allowBlank:true,
										x:70,
										y:140
									},
									{
										xtype:"textfield",
										id:"sczj_wd_deleteContent",
										allowBlank:true,
										x:70,
										y:170
									},
									{
										xtype:"vmd.button",
										id:"button4",
										text:"button",
										type:"(none)",
										size:"small",
										x:230,
										y:170
									},
									{
										xtype:"vmd.button",
										id:"button5",
										text:"button",
										type:"(none)",
										size:"small",
										x:230,
										y:140
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
										x:270,
										y:10,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:270,
										y:20,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div32_click",
										listeners:{
											click:div32_click
										}
									}
								]
							},
							{
								xtype:"label",
								id:"label46",
								text:"类型：",
								x:10,
								y:10
							},
							{
								xtype:"vmd.div",
								id:"tpDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:400,
								x:0,
								y:40,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label55",
										text:"允许最多上传图片：",
										x:10,
										y:10
									},
									{
										xtype:"textfield",
										id:"sczj_tp_max",
										allowBlank:true,
										x:120,
										y:10,
										afterrender:"sczj_tp_max_afterrender",
										listeners:{
											vmdafterrender:sczj_tp_max_afterrender
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
										x:270,
										y:0,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div30_click",
										listeners:{
											click:div30_click
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
										x:270,
										y:10,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div33_click",
										listeners:{
											click:div33_click
										}
									},
									{
										xtype:"label",
										id:"label56",
										text:"张",
										x:360,
										y:10
									},
									{
										xtype:"label",
										id:"label57",
										text:"布局：",
										x:10,
										y:50
									},
									{
										xtype:"label",
										id:"label58",
										text:"每页显示：",
										x:50,
										y:50
									},
									{
										xtype:"label",
										id:"label59",
										text:"每行显示：",
										x:50,
										y:80
									},
									{
										xtype:"textfield",
										id:"sczj_tp_pageDisplay",
										allowBlank:true,
										x:120,
										y:40
									},
									{
										xtype:"textfield",
										id:"sczj_tp_rowDisplay",
										allowBlank:true,
										x:120,
										y:80
									},
									{
										xtype:"vmd.button",
										id:"button6",
										text:"button",
										type:"(none)",
										size:"small",
										x:280,
										y:80
									},
									{
										xtype:"vmd.button",
										id:"button7",
										text:"button",
										type:"(none)",
										size:"small",
										x:280,
										y:40
									},
									{
										xtype:"label",
										id:"label60",
										text:"张",
										x:360,
										y:50
									},
									{
										xtype:"label",
										id:"label61",
										text:"张",
										x:360,
										y:90
									},
									{
										xtype:"label",
										id:"label62",
										text:"权限控制：",
										x:10,
										y:130
									},
									{
										xtype:"checkbox",
										id:"sczj_tp_add",
										fieldLabel:"Checkbox",
										boxLabel:"添加",
										x:10,
										y:160
									},
									{
										xtype:"checkbox",
										id:"sczj_tp_delete",
										fieldLabel:"Checkbox",
										boxLabel:"删除",
										x:10,
										y:190
									},
									{
										xtype:"textfield",
										id:"sczj_tp_addContent",
										allowBlank:true,
										x:70,
										y:160
									},
									{
										xtype:"textfield",
										id:"sczj_tp_deleteContent",
										allowBlank:true,
										x:70,
										y:190
									},
									{
										xtype:"vmd.button",
										id:"button8",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:190
									},
									{
										xtype:"vmd.button",
										id:"button9",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:150
									},
									{
										xtype:"label",
										id:"label63",
										text:"展示：    当上传一张图片时，展示效果为",
										x:50,
										y:240
									},
									{
										xtype:"radiostoregroup",
										id:"sczj_tp_display",
										width:120,
										height:110,
										labelField:"label",
										valueField:"value",
										checkedField:"checked",
										boxFieldName:"myRadio",
										x:90,
										y:260,
										items:[
											{
												xtype:"radio",
												id:"hwRadio15",
												boxLabel:"图片实际大小"
											},
											{
												xtype:"radio",
												id:"hwRadio16",
												boxLabel:"单元格大小"
											}
										]
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"div38",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:400,
								x:0,
								y:40,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label64",
										text:"允许最多上传图片：",
										x:10,
										y:10
									},
									{
										xtype:"textfield",
										id:"hwText2",
										allowBlank:true,
										x:120,
										y:10,
										afterrender:"sczj_tp_max_afterrender",
										listeners:{
											vmdafterrender:sczj_tp_max_afterrender
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
										x:270,
										y:0,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div30_click",
										listeners:{
											click:div30_click
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
										x:270,
										y:10,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div33_click",
										listeners:{
											click:div33_click
										}
									},
									{
										xtype:"label",
										id:"label65",
										text:"张",
										x:360,
										y:10
									},
									{
										xtype:"label",
										id:"label66",
										text:"布局：",
										x:10,
										y:50
									},
									{
										xtype:"label",
										id:"label67",
										text:"每页显示：",
										x:50,
										y:50
									},
									{
										xtype:"label",
										id:"label68",
										text:"每行显示：",
										x:50,
										y:80
									},
									{
										xtype:"textfield",
										id:"hwText3",
										allowBlank:true,
										x:120,
										y:40
									},
									{
										xtype:"textfield",
										id:"hwText4",
										allowBlank:true,
										x:120,
										y:80
									},
									{
										xtype:"vmd.button",
										id:"button10",
										text:"button",
										type:"(none)",
										size:"small",
										x:280,
										y:80
									},
									{
										xtype:"vmd.button",
										id:"button11",
										text:"button",
										type:"(none)",
										size:"small",
										x:280,
										y:40
									},
									{
										xtype:"label",
										id:"label69",
										text:"张",
										x:360,
										y:50
									},
									{
										xtype:"label",
										id:"label70",
										text:"张",
										x:360,
										y:90
									},
									{
										xtype:"label",
										id:"label71",
										text:"权限控制：",
										x:10,
										y:130
									},
									{
										xtype:"checkbox",
										id:"hwCheckbox",
										fieldLabel:"Checkbox",
										boxLabel:"添加",
										x:10,
										y:160
									},
									{
										xtype:"checkbox",
										id:"hwCheckbox1",
										fieldLabel:"Checkbox",
										boxLabel:"删除",
										x:10,
										y:190
									},
									{
										xtype:"textfield",
										id:"hwText5",
										allowBlank:true,
										x:70,
										y:160
									},
									{
										xtype:"textfield",
										id:"hwText6",
										allowBlank:true,
										x:70,
										y:190
									},
									{
										xtype:"vmd.button",
										id:"button12",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:190
									},
									{
										xtype:"vmd.button",
										id:"button13",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:150
									},
									{
										xtype:"label",
										id:"label72",
										text:"展示：    当上传一张图片时，展示效果为",
										x:50,
										y:240
									},
									{
										xtype:"radiostoregroup",
										id:"hwRadioGroup",
										width:120,
										height:110,
										labelField:"label",
										valueField:"value",
										checkedField:"checked",
										boxFieldName:"myRadio",
										x:90,
										y:260,
										items:[
											{
												xtype:"radio",
												id:"hwRadio11",
												boxLabel:"图片实际大小"
											},
											{
												xtype:"radio",
												id:"hwRadio12",
												boxLabel:"单元格大小"
											}
										]
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel18",
						title:"数据",
						header:true,
						border:true,
						height:100
					},
					{
						xtype:"panel",
						id:"panel19",
						title:"事件",
						header:true,
						border:true,
						height:100,
						layout:"absolute"
					}
				]
			},
			{
				xtype:"tabpanel",
				id:"spzjTabs",
				activeTab:0,
				height:621,
				width:320,
				x:10,
				y:40,
				afterrender:"spzjTabs_afterrender",
				hidden:true,
				listeners:{
					vmdafterrender:spzjTabs_afterrender
				},
				items:[
					{
						xtype:"panel",
						id:"panel20",
						title:"属性",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						autoScroll:false,
						width:853,
						items:[
							{
								xtype:"vmd.div",
								id:"spzj_preview",
								autoEl:"div",
								border:true,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:300,
								height:180,
								region:"center",
								x:10,
								y:20,
								style:"border: 1px solid #646464",
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
										y:20,
										layout:"hbox",
										click:"spbmDiv_click",
										listeners:{
											click:spbmDiv_click
										},
										items:[
											{
												xtype:"label",
												id:"labela",
												text:"审批部门"
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
										y:50,
										layout:"hbox",
										click:"spyjDiv_click",
										listeners:{
											click:spyjDiv_click
										},
										items:[
											{
												xtype:"label",
												id:"label74",
												text:"审批意见"
											}
										]
									},
									{
										xtype:"vmd.div",
										id:"tyDiv",
										layoutConfig:{
											pack:"center",
											align:"middle"
										},
										autoEl:"div",
										border:true,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:50,
										height:30,
										x:10,
										y:130,
										style:"border: 1px solid #646464",
										layout:"hbox",
										click:"tyDiv_click",
										listeners:{
											click:tyDiv_click
										},
										items:[
											{
												xtype:"label",
												id:"label75",
												text:"同意"
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
										style:"border: 1px solid #646464",
										layout:"hbox",
										click:"thDiv_click",
										listeners:{
											click:thDiv_click
										},
										items:[
											{
												xtype:"label",
												id:"label77",
												text:"退回"
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
										style:"border: 1px solid #646464",
										layout:"hbox",
										click:"btyDiv_click",
										listeners:{
											click:btyDiv_click
										},
										items:[
											{
												xtype:"label",
												id:"label76",
												text:"不同意"
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
										x:210,
										y:90,
										layout:"hbox",
										click:"spzDiv_click",
										listeners:{
											click:spzDiv_click
										},
										items:[
											{
												xtype:"label",
												id:"label78",
												text:"审批章"
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
										x:210,
										y:120,
										layout:"hbox",
										click:"sprDiv_click",
										listeners:{
											click:sprDiv_click
										},
										items:[
											{
												xtype:"label",
												id:"label79",
												text:"审批人"
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
										x:210,
										y:150,
										layout:"hbox",
										click:"sprqDiv_click",
										listeners:{
											click:sprqDiv_click
										},
										items:[
											{
												xtype:"label",
												id:"label80",
												text:"审批日期"
											}
										]
									}
								]
							},
							{
								xtype:"checkbox",
								id:"spzj_allowEdit",
								fieldLabel:"Checkbox",
								boxLabel:"允许编辑",
								x:20,
								y:210,
								checked:true
							},
							{
								xtype:"checkbox",
								id:"spzj_allowPrint",
								fieldLabel:"Checkbox",
								boxLabel:"允许打印",
								x:20,
								y:240,
								checked:true
							},
							{
								xtype:"vmd.div",
								id:"spzj_spyjDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:320,
								height:230,
								x:0,
								y:310,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label73",
										text:"标签名称：",
										x:10,
										y:50,
										height:20
									},
									{
										xtype:"textfield",
										id:"spzj_spyj_bqmc",
										allowBlank:true,
										x:70,
										y:40
									},
									{
										xtype:"label",
										id:"label95",
										text:"部门名称：",
										x:10,
										y:90
									},
									{
										xtype:"textfield",
										id:"spzj_spyj_bmmc",
										allowBlank:true,
										x:70,
										y:80
									},
									{
										xtype:"textfield",
										id:"spzj_spyj_font",
										allowBlank:true,
										x:70,
										y:120
									},
									{
										xtype:"label",
										id:"label96",
										text:"字体：",
										x:30,
										y:130
									},
									{
										xtype:"label",
										id:"label97",
										text:"偏移X：",
										x:10,
										y:170
									},
									{
										xtype:"textfield",
										id:"spzj_spyj_x",
										allowBlank:true,
										x:60,
										y:160,
										width:70,
										afterrender:"spzj_spyj_x_afterrender",
										listeners:{
											vmdafterrender:spzj_spyj_x_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_spyj_y",
										allowBlank:true,
										x:220,
										y:160,
										width:70,
										afterrender:"spzj_spyj_y_afterrender",
										listeners:{
											vmdafterrender:spzj_spyj_y_afterrender
										}
									},
									{
										xtype:"label",
										id:"label98",
										text:"偏移Y：",
										x:170,
										y:170
									},
									{
										xtype:"label",
										id:"label99",
										text:"高度：",
										x:10,
										y:200
									},
									{
										xtype:"textfield",
										id:"spzj_spyj_height",
										allowBlank:true,
										x:60,
										y:190,
										width:70,
										afterrender:"spzj_spyj_height_afterrender",
										listeners:{
											vmdafterrender:spzj_spyj_height_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_spyj_width",
										allowBlank:true,
										x:220,
										y:190,
										width:70,
										afterrender:"spzj_spyj_width_afterrender",
										listeners:{
											vmdafterrender:spzj_spyj_width_afterrender
										}
									},
									{
										xtype:"label",
										id:"label100",
										text:"宽度：",
										x:170,
										y:200
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
										x:130,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:290,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:290,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div37_click",
										listeners:{
											click:div37_click
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
										x:130,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div41_click",
										listeners:{
											click:div41_click
										}
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
										x:130,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:290,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:290,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:130,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div45_click",
										listeners:{
											click:div45_click
										}
									},
									{
										xtype:"checkbox",
										id:"spzj_spyj_display",
										fieldLabel:"Checkbox",
										boxLabel:"显示",
										x:10,
										y:10
									},
									{
										xtype:"vmd.button",
										id:"button16",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:120
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"spzj_spbmDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:320,
								height:230,
								x:0,
								y:320,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label81",
										text:"标签名称：",
										x:10,
										y:50,
										height:20
									},
									{
										xtype:"textfield",
										id:"spzj_spbm_bqmc",
										allowBlank:true,
										x:70,
										y:40
									},
									{
										xtype:"label",
										id:"label82",
										text:"部门名称：",
										x:10,
										y:90
									},
									{
										xtype:"textfield",
										id:"spzj_spbm_bmmc",
										allowBlank:true,
										x:70,
										y:80
									},
									{
										xtype:"textfield",
										id:"spzj_spbm_font",
										allowBlank:true,
										x:70,
										y:120
									},
									{
										xtype:"label",
										id:"label83",
										text:"字体：",
										x:30,
										y:130
									},
									{
										xtype:"label",
										id:"label84",
										text:"偏移X：",
										x:10,
										y:170
									},
									{
										xtype:"textfield",
										id:"spzj_spbm_x",
										allowBlank:true,
										x:60,
										y:160,
										width:70,
										afterrender:"spzj_spbm_x_afterrender",
										listeners:{
											vmdafterrender:spzj_spbm_x_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_spbm_y",
										allowBlank:true,
										x:220,
										y:160,
										width:70,
										afterrender:"spzj_spbm_y_afterrender",
										listeners:{
											vmdafterrender:spzj_spbm_y_afterrender
										}
									},
									{
										xtype:"label",
										id:"label85",
										text:"偏移Y：",
										x:170,
										y:170
									},
									{
										xtype:"label",
										id:"label86",
										text:"高度：",
										x:10,
										y:200
									},
									{
										xtype:"textfield",
										id:"spzj_spbm_height",
										allowBlank:true,
										x:60,
										y:190,
										width:70,
										afterrender:"spzj_spbm_height_afterrender",
										listeners:{
											vmdafterrender:spzj_spbm_height_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_spbm_width",
										allowBlank:true,
										x:220,
										y:190,
										width:70,
										afterrender:"spzj_spbm_width_afterrender",
										listeners:{
											vmdafterrender:spzj_spbm_width_afterrender
										}
									},
									{
										xtype:"label",
										id:"label87",
										text:"宽度：",
										x:170,
										y:200
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
										x:130,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:290,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:290,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:130,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div49_click",
										listeners:{
											click:div49_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div50",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div50_click",
										listeners:{
											click:div50_click
										}
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
										x:290,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:290,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:130,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div53_click",
										listeners:{
											click:div53_click
										}
									},
									{
										xtype:"checkbox",
										id:"spzj_spbm_display",
										fieldLabel:"Checkbox",
										boxLabel:"显示",
										x:10,
										y:10
									},
									{
										xtype:"vmd.button",
										id:"button14",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:120
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"spzj_tyDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:320,
								height:270,
								x:0,
								y:310,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label101",
										text:"标签名称：",
										x:10,
										y:50,
										height:20
									},
									{
										xtype:"textfield",
										id:"spzj_ty_bqmc",
										allowBlank:true,
										x:70,
										y:40
									},
									{
										xtype:"label",
										id:"label102",
										text:"审批结果：",
										x:10,
										y:90
									},
									{
										xtype:"textfield",
										id:"spzj_ty_spjg",
										allowBlank:true,
										x:70,
										y:80
									},
									{
										xtype:"textfield",
										id:"spzj_ty_font",
										allowBlank:true,
										x:70,
										y:120
									},
									{
										xtype:"label",
										id:"label103",
										text:"字体：",
										x:30,
										y:130
									},
									{
										xtype:"label",
										id:"label104",
										text:"偏移X：",
										x:10,
										y:170
									},
									{
										xtype:"textfield",
										id:"spzj_ty_x",
										allowBlank:true,
										x:60,
										y:160,
										width:70,
										afterrender:"spzj_ty_x_afterrender",
										listeners:{
											vmdafterrender:spzj_ty_x_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_ty_y",
										allowBlank:true,
										x:220,
										y:160,
										width:70,
										afterrender:"spzj_ty_y_afterrender",
										listeners:{
											vmdafterrender:spzj_ty_y_afterrender
										}
									},
									{
										xtype:"label",
										id:"label105",
										text:"偏移Y：",
										x:170,
										y:170
									},
									{
										xtype:"label",
										id:"label106",
										text:"高度：",
										x:10,
										y:200
									},
									{
										xtype:"textfield",
										id:"spzj_ty_height",
										allowBlank:true,
										x:60,
										y:190,
										width:70,
										afterrender:"spzj_ty_height_afterrender",
										listeners:{
											vmdafterrender:spzj_ty_height_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_ty_width",
										allowBlank:true,
										x:220,
										y:190,
										width:70,
										afterrender:"spzj_ty_width_afterrender",
										listeners:{
											vmdafterrender:spzj_ty_width_afterrender
										}
									},
									{
										xtype:"label",
										id:"label107",
										text:"宽度：",
										x:170,
										y:200
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
										x:130,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:290,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:290,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:130,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div66_click",
										listeners:{
											click:div66_click
										}
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
										x:130,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:290,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:290,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:130,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div70_click",
										listeners:{
											click:div70_click
										}
									},
									{
										xtype:"checkbox",
										id:"spzj_ty_display",
										fieldLabel:"Checkbox",
										boxLabel:"显示",
										x:10,
										y:10
									},
									{
										xtype:"vmd.button",
										id:"button17",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:120
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"spzj_btyDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:320,
								height:230,
								x:0,
								y:310,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label108",
										text:"标签名称：",
										x:10,
										y:50,
										height:20
									},
									{
										xtype:"textfield",
										id:"spzj_bty_bqmc",
										allowBlank:true,
										x:70,
										y:40
									},
									{
										xtype:"label",
										id:"label109",
										text:"审批结果：",
										x:10,
										y:90
									},
									{
										xtype:"textfield",
										id:"spzj_bty_spjg",
										allowBlank:true,
										x:70,
										y:80
									},
									{
										xtype:"textfield",
										id:"spzj_bty_font",
										allowBlank:true,
										x:70,
										y:120
									},
									{
										xtype:"label",
										id:"label110",
										text:"字体：",
										x:30,
										y:130
									},
									{
										xtype:"label",
										id:"label111",
										text:"偏移X：",
										x:10,
										y:170
									},
									{
										xtype:"textfield",
										id:"spzj_bty_x",
										allowBlank:true,
										x:60,
										y:160,
										width:70,
										afterrender:"spzj_bty_x_afterrender",
										listeners:{
											vmdafterrender:spzj_bty_x_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_bty_y",
										allowBlank:true,
										x:220,
										y:160,
										width:70,
										afterrender:"spzj_bty_y_afterrender",
										listeners:{
											vmdafterrender:spzj_bty_y_afterrender
										}
									},
									{
										xtype:"label",
										id:"label112",
										text:"偏移Y：",
										x:170,
										y:170
									},
									{
										xtype:"label",
										id:"label113",
										text:"高度：",
										x:10,
										y:200
									},
									{
										xtype:"textfield",
										id:"spzj_bty_height",
										allowBlank:true,
										x:60,
										y:190,
										width:70,
										afterrender:"spzj_bty_height_afterrender",
										listeners:{
											vmdafterrender:spzj_bty_height_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_bty_width",
										allowBlank:true,
										x:220,
										y:190,
										width:70,
										afterrender:"spzj_bty_width_afterrender",
										listeners:{
											vmdafterrender:spzj_bty_width_afterrender
										}
									},
									{
										xtype:"label",
										id:"label114",
										text:"宽度：",
										x:170,
										y:200
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
										x:130,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:290,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:290,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:130,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div74_click",
										listeners:{
											click:div74_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div75",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div75_click",
										listeners:{
											click:div75_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div76",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div76_click",
										listeners:{
											click:div76_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div77",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div77_click",
										listeners:{
											click:div77_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div78",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div78_click",
										listeners:{
											click:div78_click
										}
									},
									{
										xtype:"checkbox",
										id:"spzj_bty_display",
										fieldLabel:"Checkbox",
										boxLabel:"显示",
										x:10,
										y:10
									},
									{
										xtype:"vmd.button",
										id:"button18",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:120
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"spzj_thDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:310,
								height:230,
								x:0,
								y:310,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label115",
										text:"标签名称：",
										x:10,
										y:50,
										height:20
									},
									{
										xtype:"textfield",
										id:"spzj_th_bqmc",
										allowBlank:true,
										x:70,
										y:40
									},
									{
										xtype:"label",
										id:"label116",
										text:"审批结果：",
										x:10,
										y:90
									},
									{
										xtype:"textfield",
										id:"spzj_th_spjg",
										allowBlank:true,
										x:70,
										y:80
									},
									{
										xtype:"textfield",
										id:"spzj_th_font",
										allowBlank:true,
										x:70,
										y:120
									},
									{
										xtype:"label",
										id:"label117",
										text:"字体：",
										x:30,
										y:130
									},
									{
										xtype:"label",
										id:"label118",
										text:"偏移X：",
										x:10,
										y:170
									},
									{
										xtype:"textfield",
										id:"spzj_th_x",
										allowBlank:true,
										x:60,
										y:160,
										width:70,
										afterrender:"spzj_th_x_afterrender",
										listeners:{
											vmdafterrender:spzj_th_x_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_th_y",
										allowBlank:true,
										x:220,
										y:160,
										width:70,
										afterrender:"spzj_th_y_afterrender",
										listeners:{
											vmdafterrender:spzj_th_y_afterrender
										}
									},
									{
										xtype:"label",
										id:"label119",
										text:"偏移Y：",
										x:170,
										y:170
									},
									{
										xtype:"label",
										id:"label120",
										text:"高度：",
										x:10,
										y:200
									},
									{
										xtype:"textfield",
										id:"spzj_th_height",
										allowBlank:true,
										x:60,
										y:190,
										width:70,
										afterrender:"spzj_th_height_afterrender",
										listeners:{
											vmdafterrender:spzj_th_height_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_th_width",
										allowBlank:true,
										x:220,
										y:190,
										width:70,
										afterrender:"spzj_th_width_afterrender",
										listeners:{
											vmdafterrender:spzj_th_width_afterrender
										}
									},
									{
										xtype:"label",
										id:"label121",
										text:"宽度：",
										x:170,
										y:200
									},
									{
										xtype:"vmd.div",
										id:"div79",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div79_click",
										listeners:{
											click:div79_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div80",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div80_click",
										listeners:{
											click:div80_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div81",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div81_click",
										listeners:{
											click:div81_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div82",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div82_click",
										listeners:{
											click:div82_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div83",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div83_click",
										listeners:{
											click:div83_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div84",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div84_click",
										listeners:{
											click:div84_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div85",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div85_click",
										listeners:{
											click:div85_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div86",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div86_click",
										listeners:{
											click:div86_click
										}
									},
									{
										xtype:"checkbox",
										id:"spzj_th_display",
										fieldLabel:"Checkbox",
										boxLabel:"显示",
										x:10,
										y:10
									},
									{
										xtype:"vmd.button",
										id:"button19",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:120
									}
								]
							},
							{
								xtype:"label",
								id:"spzj_style",
								text:"lable:",
								x:10,
								y:280,
								style:"font-size: 20px;    font-style: bold;",
								afterrender:"spzj_style_afterrender",
								listeners:{
									vmdafterrender:spzj_style_afterrender
								}
							},
							{
								xtype:"vmd.div",
								id:"spzj_spzDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:320,
								height:230,
								x:0,
								y:310,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label124",
										text:"标签名称：",
										x:10,
										y:50,
										height:20
									},
									{
										xtype:"textfield",
										id:"spzj_spz_bqmc",
										allowBlank:true,
										x:70,
										y:40
									},
									{
										xtype:"label",
										id:"label125",
										text:"图片来源：",
										x:10,
										y:90
									},
									{
										xtype:"textfield",
										id:"spzj_spz_tply",
										allowBlank:true,
										x:70,
										y:80
									},
									{
										xtype:"textfield",
										id:"spzj_spz_font",
										allowBlank:true,
										x:70,
										y:120
									},
									{
										xtype:"label",
										id:"label126",
										text:"字体：",
										x:30,
										y:130
									},
									{
										xtype:"label",
										id:"label127",
										text:"偏移X：",
										x:10,
										y:170
									},
									{
										xtype:"textfield",
										id:"spzj_spz_x",
										allowBlank:true,
										x:60,
										y:160,
										width:70,
										afterrender:"spzj_spz_x_afterrender",
										listeners:{
											vmdafterrender:spzj_spz_x_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_spz_y",
										allowBlank:true,
										x:220,
										y:160,
										width:70,
										afterrender:"spzj_spz_y_afterrender",
										listeners:{
											vmdafterrender:spzj_spz_y_afterrender
										}
									},
									{
										xtype:"label",
										id:"label128",
										text:"偏移Y：",
										x:170,
										y:170
									},
									{
										xtype:"label",
										id:"label129",
										text:"高度：",
										x:10,
										y:200
									},
									{
										xtype:"textfield",
										id:"spzj_spz_height",
										allowBlank:true,
										x:60,
										y:190,
										width:70,
										afterrender:"spzj_spz_height_afterrender",
										listeners:{
											vmdafterrender:spzj_spz_height_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_spz_width",
										allowBlank:true,
										x:220,
										y:190,
										width:70,
										afterrender:"spzj_spz_width_afterrender",
										listeners:{
											vmdafterrender:spzj_spz_width_afterrender
										}
									},
									{
										xtype:"label",
										id:"label130",
										text:"宽度：",
										x:170,
										y:200
									},
									{
										xtype:"vmd.div",
										id:"div89",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div89_click",
										listeners:{
											click:div89_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div90",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div90_click",
										listeners:{
											click:div90_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div91",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:160,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div91_click",
										listeners:{
											click:div91_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div92",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div92_click",
										listeners:{
											click:div92_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div93",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div93_click",
										listeners:{
											click:div93_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div94",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:170,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div94_click",
										listeners:{
											click:div94_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div95",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div95_click",
										listeners:{
											click:div95_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div96",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div96_click",
										listeners:{
											click:div96_click
										}
									},
									{
										xtype:"checkbox",
										id:"spzj_spz_display",
										fieldLabel:"Checkbox",
										boxLabel:"显示",
										x:10,
										y:10
									},
									{
										xtype:"vmd.button",
										id:"button20",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:120
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"spzj_sprDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:320,
								height:260,
								x:0,
								y:310,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label131",
										text:"标签名称：",
										x:10,
										y:80,
										height:20
									},
									{
										xtype:"textfield",
										id:"spzj_spr_bqmc",
										allowBlank:true,
										x:70,
										y:70
									},
									{
										xtype:"label",
										id:"label132",
										text:"审批人：",
										x:20,
										y:120
									},
									{
										xtype:"textfield",
										id:"spzj_spr_spr",
										allowBlank:true,
										x:70,
										y:110
									},
									{
										xtype:"textfield",
										id:"spzj_spr_font",
										allowBlank:true,
										x:70,
										y:150
									},
									{
										xtype:"label",
										id:"label133",
										text:"字体：",
										x:30,
										y:160
									},
									{
										xtype:"label",
										id:"label134",
										text:"偏移X：",
										x:10,
										y:200
									},
									{
										xtype:"textfield",
										id:"spzj_spr_x",
										allowBlank:true,
										x:60,
										y:190,
										width:70,
										afterrender:"spzj_spr_x_afterrender",
										listeners:{
											vmdafterrender:spzj_spr_x_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_spr_y",
										allowBlank:true,
										x:220,
										y:190,
										width:70,
										afterrender:"spzj_spr_y_afterrender",
										listeners:{
											vmdafterrender:spzj_spr_y_afterrender
										}
									},
									{
										xtype:"label",
										id:"label135",
										text:"偏移Y：",
										x:170,
										y:200
									},
									{
										xtype:"label",
										id:"label136",
										text:"高度：",
										x:10,
										y:230
									},
									{
										xtype:"textfield",
										id:"spzj_spr_height",
										allowBlank:true,
										x:60,
										y:220,
										width:70,
										afterrender:"spzj_spr_height_afterrender",
										listeners:{
											vmdafterrender:spzj_spr_height_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_spr_width",
										allowBlank:true,
										x:220,
										y:220,
										width:70,
										afterrender:"spzj_spr_width_afterrender",
										listeners:{
											vmdafterrender:spzj_spr_width_afterrender
										}
									},
									{
										xtype:"label",
										id:"label137",
										text:"宽度：",
										x:170,
										y:230
									},
									{
										xtype:"vmd.div",
										id:"div97",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div97_click",
										listeners:{
											click:div97_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div98",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:220,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div98_click",
										listeners:{
											click:div98_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div99",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div99_click",
										listeners:{
											click:div99_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div100",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:220,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div100_click",
										listeners:{
											click:div100_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div101",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div101_click",
										listeners:{
											click:div101_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div102",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div102_click",
										listeners:{
											click:div102_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div103",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:290,
										y:230,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div103_click",
										listeners:{
											click:div103_click
										}
									},
									{
										xtype:"vmd.div",
										id:"div104",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:30,
										height:15,
										x:130,
										y:230,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div104_click",
										listeners:{
											click:div104_click
										}
									},
									{
										xtype:"checkbox",
										id:"spzj_spr_display",
										fieldLabel:"Checkbox",
										boxLabel:"显示",
										x:10,
										y:40
									},
									{
										xtype:"vmd.button",
										id:"button21",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:150
									},
									{
										xtype:"label",
										id:"label138",
										text:"签名照片：",
										x:10,
										y:10
									},
									{
										xtype:"textfield",
										id:"spzj_spr_qmzp",
										allowBlank:true,
										x:70,
										y:10
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"spzj_sprqDiv",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:320,
								height:270,
								x:0,
								y:310,
								layout:"absolute",
								hidden:true,
								items:[
									{
										xtype:"label",
										id:"label88",
										text:"标签名称：",
										x:10,
										y:80,
										height:20
									},
									{
										xtype:"textfield",
										id:"spzj_sprq_bqmc",
										allowBlank:true,
										x:70,
										y:70
									},
									{
										xtype:"label",
										id:"label89",
										text:"审批日期：",
										x:10,
										y:120
									},
									{
										xtype:"textfield",
										id:"spzj_sprq_sprq",
										allowBlank:true,
										x:70,
										y:110
									},
									{
										xtype:"textfield",
										id:"spzj_sprq_font",
										allowBlank:true,
										x:70,
										y:150
									},
									{
										xtype:"label",
										id:"label90",
										text:"字体：",
										x:30,
										y:160
									},
									{
										xtype:"label",
										id:"label91",
										text:"偏移X：",
										x:10,
										y:200
									},
									{
										xtype:"textfield",
										id:"spzj_sprq_x",
										allowBlank:true,
										x:60,
										y:190,
										width:70,
										afterrender:"spzj_sprq_x_afterrender",
										listeners:{
											vmdafterrender:spzj_sprq_x_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_sprq_y",
										allowBlank:true,
										x:220,
										y:190,
										width:70,
										afterrender:"spzj_sprq_y_afterrender",
										listeners:{
											vmdafterrender:spzj_sprq_y_afterrender
										}
									},
									{
										xtype:"label",
										id:"label92",
										text:"偏移Y：",
										x:170,
										y:200
									},
									{
										xtype:"label",
										id:"label93",
										text:"高度：",
										x:10,
										y:230
									},
									{
										xtype:"textfield",
										id:"spzj_sprq_height",
										allowBlank:true,
										x:60,
										y:220,
										width:70,
										afterrender:"spzj_sprq_height_afterrender",
										listeners:{
											vmdafterrender:spzj_sprq_height_afterrender
										}
									},
									{
										xtype:"textfield",
										id:"spzj_sprq_width",
										allowBlank:true,
										x:220,
										y:220,
										width:70,
										afterrender:"spzj_sprq_width_afterrender",
										listeners:{
											vmdafterrender:spzj_sprq_width_afterrender
										}
									},
									{
										xtype:"label",
										id:"label94",
										text:"宽度：",
										x:170,
										y:230
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
										x:130,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:290,
										y:220,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:290,
										y:190,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
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
										x:130,
										y:220,
										html:"<img src=\"/system/img/report/border/上.png\" />",
										cls:"btn",
										click:"div58_click",
										listeners:{
											click:div58_click
										}
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
										x:130,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:290,
										y:200,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:290,
										y:230,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
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
										x:130,
										y:230,
										html:"<img src=\"/system/img/report/border/下.png\" />",
										cls:"btn",
										click:"div62_click",
										listeners:{
											click:div62_click
										}
									},
									{
										xtype:"checkbox",
										id:"spzj_sprq_display",
										fieldLabel:"Checkbox",
										boxLabel:"显示",
										x:10,
										y:40
									},
									{
										xtype:"vmd.button",
										id:"button15",
										text:"button",
										type:"(none)",
										size:"small",
										x:240,
										y:150
									},
									{
										xtype:"label",
										id:"label139",
										text:"日期格式：",
										x:10,
										y:10
									},
									{
										xtype:"vmd.comlist",
										id:"spzj_sprq_rqgs",
										width:230,
										height:270,
										x:70,
										y:10,
										afterrender:"spzj_sprq_rqgs_afterrender",
										listeners:{
											vmdafterrender:spzj_sprq_rqgs_afterrender
										}
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel21",
						title:"事件",
						header:true,
						border:true,
						height:100
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.CellType");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.CellType");
	}
})