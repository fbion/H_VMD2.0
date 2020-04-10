Ext.define('vmd.ux.contentProperty.Controller', {
    xtype: 'vmd.ux.contentProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ContentProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ExtraPropertyChange$1.0$ExtraPropertyChange", "vmd.ux.CellTypeProperty$1.0$CellTypeProperty", "vmd.ux.NewNumber$1.0$NewNumber", "vmd.ux.PrintConfig$1.0$PrintConfig", "vmd.ux.LinkAndMenu$1.0$LinkAndMenu", "vmd.ux.Segmentation$1.0$Segmentation", "vmd.ux.FP$1.0$FP", "vmd.ux.Reporting$1.0$Reporting", "vmd.ux.PrintSetting$1.0$PrintSetting"]),
    version: "1.0",
    xtype: "vmd.ux.ContentProperty",
    header: false,
    border: false,
    panelWidth: 240,
    width: 291,
    height: 656,
    layout: "fit",
    autoScroll: false,
    unstyled: false,
    autoHeight: false,
    cls: "contentprp",
    beforerender: "ContentProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.ContentProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.ContentProperty'
                }, ex, 50);
            }
        }
    },
    uxCss: ".b {    border: 1px solid #dddddd}.contentprp .x-tab-strip-active span.x-tab-strip-text {    color: #409EFF;    font-weight: bold;}.contentprp .x-tab-strip-active,.x-tab-strip-active a.x-tab-right {    background-color: #fff;}.contentprp .x-tab-strip-top .x-tab-right {    padding: 0 12px;    height: 30px;    background-color: #fff;}.contentprp .x-tab-panel-header, .x-tab-panel-body, .x-tab-panel-footer {    border-color: #dfdfdf;    border-top: 0px;    border-left: 0px;}.contentprp ul.x-tab-strip-top {    border: 0;    background-image: none;    background-color: #fff;    border-color: #dfdfdf;}.fonttitle .x-tab-strip-top .x-tab-right {    padding: 0 16px;    height: 30px;    background-color: #fff;}",
    uxrequirejs: "[\"lib/ace/ace.js?ver=vmd2.0.7.200328\",\"lib/ace/mode-base.js?ver=vmd2.0.7.200328\",\"lib/ace/theme-xcode.js?ver=vmd2.0.7.200328\",\"lib/ace/ext-language_tools.js?ver=vmd2.0.7.200328\"]",
    initComponent: function() {
        function resetCmpScope() {
            var cmpList = me._reloadCmpList;
            Ext.each(cmpList, function(name) {
                var cmpObj = eval(name);
                cmpObj && (cmpObj._beforeRender = function(_cmp) {
                    var id = vmd.core.getCmpId(_cmp);
                    id && eval(id + "= _cmp")
                })
            })
        }
        try {
            this.on('afterrender', function() {
                this.cascade(function(item) {
                    item.on('change', function(a, b, c) {
                        // debugger
                        // if (window.event && window.event.srcElement) {
                        // }
                        setCellInfo(a, b);
                    })
                    item.on("check", function(a, b, c) {
                        // debugger
                        // if (window.event && window.event.srcElement) {
                        // }
                        setCellInfo(a, b);
                    })
                    item.on("select", function(a, b, c) {
                        // debugger
                        // if (window.event && window.event.srcElement) {
                        // }
                        if (typeof b == 'object') {
                            setCellInfo(a, a.value);
                        } else {
                            setCellInfo(a, b);
                        }
                    })
                })
            })
            var page = this;
            var hot = page.o;
            page.alreadySetSubmit = true;

            function setCellInfo(sender, value) {
                var hot = page.o;
                var canWrite = false;
                var cell = hot.dealInvert()[0];
                if (page.cells) {
                    for (var i = 0; i < page.cells.length; i++) {
                        var r = page.cells[i].r;
                        var c = page.cells[i].c;
                        if (hot.getCellMeta(r, c).mergeId != 2) {
                            var temp = page.o.getCellMeta(r, c).cellAttributeInfo
                            if (sender.initialConfig.id == 'txtValue') {
                                temp.textValue.value = value;
                                page.o.setCellMeta(r, c, 'cellAttributeInfo', temp)
                                page.o.setDataAtCell(r, c, value)
                                page.o.setCellMeta(r, c, 'theCellChanged', true)
                            } else if (sender.initialConfig.id == 'txtShowValue') {
                                temp.showValue.value = value;
                                page.o.setCellMeta(r, c, 'cellAttributeInfo', temp)
                                page.o.setCellMeta(r, c, 'theCellChanged', true)
                            } else {
                                if (temp && temp.setCellInfos) {
                                    if (value && value.inputValue) {
                                        temp.setCellInfos(sender.initialConfig.id, value.inputValue)
                                    } else {
                                        temp.setCellInfos(sender.initialConfig.id, value)
                                    }
                                    page.o.setCellMeta(r, c, 'cellAttributeInfo', temp)
                                    page.o.setCellMeta(r, c, 'theCellChanged', true)
                                }
                            }
                            if (sender.initialConfig.id == 'data_dataSet') {
                                switch (page.o.getCellMeta(r, c).cellAttributeInfo.contentInfo.cmbType.value) {
                                    case 'xlwg':
                                        page.o.changeAttributeInfo(r, c, 'ddg_dataSet', value)
                                        break;
                                    case 'dxan':
                                        page.o.changeAttributeInfo(r, c, 'dxan_dataSet', value)
                                        break;
                                }
                            }
                            if (sender.initialConfig.id == 'data_typeSetting') {
                                switch (page.o.getCellMeta(r, c).cellAttributeInfo.contentInfo.cmbType.value) {
                                    case 'xlwg':
                                        page.o.changeAttributeInfo(r, c, 'ddg_typeSetting', value)
                                        break;
                                    case 'dxan':
                                        page.o.changeAttributeInfo(r, c, 'dxan_typeSetting', value)
                                        break;
                                }
                            }
                            if (sender.initialConfig.id == 'data_saveFiled') {
                                switch (page.o.getCellMeta(r, c).cellAttributeInfo.contentInfo.cmbType.value) {
                                    case 'xlwg':
                                        page.o.changeAttributeInfo(r, c, 'ddg_saveFiled', value)
                                        break;
                                    case 'dxan':
                                        page.o.changeAttributeInfo(r, c, 'dxan_saveFiled', value)
                                        break;
                                }
                            }
                            if (sender.initialConfig.id == 'data_myDisplayFiled') {
                                switch (page.o.getCellMeta(r, c).cellAttributeInfo.contentInfo.cmbType.value) {
                                    case 'xlwg':
                                        page.o.changeAttributeInfo(r, c, 'ddg_myDisplayFiled', value)
                                        break;
                                    case 'dxan':
                                        page.o.changeAttributeInfo(r, c, 'dxan_myDisplayFiled', value)
                                        break;
                                }
                            }
                            if (sender.initialConfig.id == 'data_dropDownDisplayColumn') {
                                switch (page.o.getCellMeta(r, c).cellAttributeInfo.contentInfo.cmbType.value) {
                                    case 'xlwg':
                                        page.o.changeAttributeInfo(r, c, 'ddg_dropDownDisplayColumn', value)
                                        break;
                                    case 'dxan':
                                        page.o.changeAttributeInfo(r, c, 'dxan_dropDownDisplayColumn', value)
                                        break;
                                }
                            }
                            if (sender.initialConfig.id == 'data_filterConditon') {
                                switch (page.o.getCellMeta(r, c).cellAttributeInfo.contentInfo.cmbType.value) {
                                    case 'xlwg':
                                        page.o.changeAttributeInfo(r, c, 'ddg_filterConditon', value)
                                        break;
                                    case 'dxan':
                                        page.o.changeAttributeInfo(r, c, 'dxan_filterConditon', value)
                                        break;
                                }
                            }
                        }
                    }
                    if (sender.initialConfig.id == 'qtb_template') {
                        if (page.o.nestedNo != null && page.o.nestedTableArray[page.o.nestedNo]) {
                            page.o.nestedTableArray[page.o.nestedNo].qtb_template = value;
                        }
                    }
                    if (sender.initialConfig.id == 'qtb_tableName') {
                        if (page.o.nestedNo != null && page.o.nestedTableArray[page.o.nestedNo]) {
                            page.o.nestedTableArray[page.o.nestedNo].qtb_tableName = value;
                        }
                    }
                    if (sender.initialConfig.id == 'seg_fp' && value == false) {
                        page.o.setCellMeta(r, c, 'theCellChanged', false)
                    }
                    if (sender.initialConfig.id == 'seg_emptyRow') {
                        var arr = page.o.fpArray;
                        var cell = page.o.dealInvert()[0]
                        if (!page.o.oldArea) {
                            for (var i = 0; i < arr.length; i++) {
                                if (cell.sr == arr[i].sr && cell.sc == arr[i].sc && cell.er == arr[i].er && cell.ec == arr[i].ec) {
                                    arr[i].emptyRow = value;
                                    var obj = {
                                        sr: arr[i].sr,
                                        er: arr[i].er,
                                        sc: arr[i].sc,
                                        ec: arr[i].ec,
                                        sliceName: arr[i].sliceName,
                                        emptyRow: value,
                                        emptyCol: arr[i].emptyCol
                                    }
                                    arr.splice(i, 1, obj)
                                }
                            }
                            page.o.oldArea = cell;
                        } else {
                            var old = page.o.oldArea;
                            if (old.sr == cell.sr && old.sc == cell.sc && old.er == cell.er && old.ec == cell.ec) {
                                for (var i = 0; i < arr.length; i++) {
                                    if (cell.sr == arr[i].sr && cell.sc == arr[i].sc && cell.er == arr[i].er && cell.ec == arr[i].ec) {
                                        arr[i].emptyRow = value;
                                        var obj = {
                                            sr: arr[i].sr,
                                            er: arr[i].er,
                                            sc: arr[i].sc,
                                            ec: arr[i].ec,
                                            sliceName: arr[i].sliceName,
                                            emptyRow: value,
                                            emptyCol: arr[i].emptyCol
                                        }
                                        arr.splice(i, 1, obj)
                                    }
                                }
                                page.o.oldArea = cell;
                            }
                        }
                    }
                    if (sender.initialConfig.id == 'seg_emptyCol') {
                        var arr = page.o.fpArray;
                        var cell = page.o.dealInvert()[0]
                        if (!page.o.oldArea) {
                            for (var i = 0; i < arr.length; i++) {
                                if (cell.sr == arr[i].sr && cell.sc == arr[i].sc && cell.er == arr[i].er && cell.ec == arr[i].ec) {
                                    arr[i].emptyCol = value;
                                    var obj = {
                                        sr: arr[i].sr,
                                        er: arr[i].er,
                                        sc: arr[i].sc,
                                        ec: arr[i].ec,
                                        sliceName: arr[i].sliceName,
                                        emptyRow: arr[i].emptyRow,
                                        emptyCol: value
                                    }
                                    arr.splice(i, 1, obj)
                                }
                            }
                            page.o.oldArea = cell;
                        } else {
                            var old = page.o.oldArea;
                            if (old.sr == cell.sr && old.sc == cell.sc && old.er == cell.er && old.ec == cell.ec) {
                                for (var i = 0; i < arr.length; i++) {
                                    if (cell.sr == arr[i].sr && cell.sc == arr[i].sc && cell.er == arr[i].er && cell.ec == arr[i].ec) {
                                        arr[i].emptyCol = value;
                                        var obj = {
                                            sr: arr[i].sr,
                                            er: arr[i].er,
                                            sc: arr[i].sc,
                                            ec: arr[i].ec,
                                            sliceName: arr[i].sliceName,
                                            emptyRow: arr[i].emptyRow,
                                            emptyCol: value
                                        }
                                        arr.splice(i, 1, obj)
                                    }
                                }
                                page.o.oldArea = cell;
                            }
                        }
                    }
                    var oriName = hwFP.seg_sliceName.getValue();
                    if (sender.initialConfig.id == 'seg_sliceName') {
                        if (value == '') {
                            vmd.tip('分片名称不可为空', 'error')
                            hwFP.seg_sliceName.setValue(oriName);
                            return;
                        } else {
                            var arr = page.o.fpArray;
                            for (var i = 0; i < arr.length; i++) {
                                if (value == arr[i].sliceName) {
                                    vmd.tip('分片名称不可重复', 'error');
                                    hwFP.seg_sliceName.setValue(oriName);
                                    return;
                                }
                            }
                            if (arr && arr.length > 0) {
                                var cell = page.o.dealInvert()[0]
                                for (var n = 0; n < arr.length; n++) {
                                    if (cell.sr == arr[n].sr && cell.sc == arr[n].sc && cell.er == arr[n].er && cell.ec == arr[n].ec) {
                                        var obj = {
                                            sr: arr[n].sr,
                                            er: arr[n].er,
                                            sc: arr[n].sc,
                                            ec: arr[n].ec,
                                            sliceName: value,
                                            emptyRow: arr[n].emptyRow,
                                            emptyCol: arr[n].emptyCol
                                        }
                                        arr.splice(n, 1, obj)
                                        hwFP.seg_sliceName.setValue(value)
                                    }
                                }
                            }
                        }
                    }
                }
            }

            function setProperty(paramJson, sheet, cell) {
                page.property = paramJson;
                page.o = sheet;
                page.cells = [];
                for (var i = cell.sr; i < cell.er + 1; i++) {
                    for (var n = cell.sc; n < cell.ec + 1; n++) {
                        var obj = {
                            r: i,
                            c: n
                        }
                        page.cells.push(obj);
                    }
                }
                if (page.property && page.property.cellAttributeInfo && page.property.cellAttributeInfo.cellInfoToJson) {
                    d = page.property.cellAttributeInfo.cellInfoToJson();
                }
                var curTab;
                if (MyTabs1.activeTab.initialConfig && MyTabs1.activeTab.initialConfig.title == '单元格') {
                    curTab = MyTabs.activeTab.initialConfig.title;
                    if (typeof d != 'undefined') {
                        txtValue.setValue(d.textinfo[0].value)
                        txtShowValue.setValue(d.textinfo[1].value)
                        if (curTab == '扩展') {
                            var ex = d.extraInfo[0];
                            ExtraPropertyChange.setInfo(ex, page.o);
                            for (var i = 0; i < d.contentDetailInfo.length; i++) {
                                if (d.contentDetailInfo[i].type == "CheckBox") {
                                    page[d.contentDetailInfo[i].id].setValue(d.contentDetailInfo[i].checked)
                                } else {
                                    page[d.contentDetailInfo[i].id].setValue(d.contentDetailInfo[i].value)
                                }
                            }
                        }
                        if (curTab == '属性') {
                            if (page["CellTypeProperty"]) {
                                page["CellTypeProperty"].setInfo(page.property, page.o, page.cells);
                            }
                        }
                        if (curTab == '样式') {
                            page["hwNewNumber"].setInfo(page.property, page.o, page.cells);
                        }
                        if (curTab == '打印') {
                            page["PrintConfig"].setInfo(d.printInfo[0])
                        }
                        if (curTab == '菜单') {
                            page['hwLinkAndMenu'].setInfo(page.property);
                        }
                    }
                } else if (MyTabs1.activeTab.initialConfig && MyTabs1.activeTab.initialConfig.title == '分栏') {} else if (MyTabs1.activeTab.initialConfig && MyTabs1.activeTab.initialConfig.title == '分片') {
                    hwFP.clearPanel();
                    hwFP.setInfo(sheetHot);
                } else if (MyTabs1.activeTab.initialConfig && MyTabs1.activeTab.initialConfig.title == '填报') {
                    hwReporting.setInfo();
                    sheetHot.setSaveSubmit();
                    sheetHot.setSaveCheck();
                } else if (MyTabs1.activeTab.initialConfig && MyTabs1.activeTab.initialConfig.title == '打印') {
                    hwPrintSetting.setInfo(page.o)
                }
                hwFP.setInfo(page.o)
            }

            function MyTabs_tabchange(sender, tab) {
                if (page.property) {
                    var d = page.property.cellAttributeInfo.cellInfoToJson();
                    var curTab = tab.initialConfig.title;
                    debugger
                    if (curTab == '扩展') {
                        var ex = d.extraInfo[0];
                        ExtraPropertyChange.setInfo(ex, page.o);
                        for (var i = 0; i < d.contentDetailInfo.length; i++) {
                            if (d.contentDetailInfo[i].type == "CheckBox") {
                                page[d.contentDetailInfo[i].id].setValue(d.contentDetailInfo[i].checked)
                            } else {
                                page[d.contentDetailInfo[i].id].setValue(d.contentDetailInfo[i].value)
                            }
                        }
                    }
                    if (curTab == '属性') {
                        if (page["CellTypeProperty"]) {
                            page["CellTypeProperty"].setInfo(page.property, page.o, page.cells);
                        }
                    }
                    if (curTab == '样式') {
                        page["hwNewNumber"].setInfo(page.property, page.o, page.cells);
                    }
                    if (curTab == '打印') {
                        page["PrintConfig"].setInfo(d.printInfo[0])
                    }
                    if (curTab == '菜单') {
                        page['hwLinkAndMenu'].setInfo(page.property);
                    }
                }
            }
            //数字转化成科学计数法
            function ChangeSciNum(num) {
                var p = Math.floor(Math.log(num) / Math.LN10);
                var n = num * Math.pow(10, -p);
                return n + 'e' + p;
            }
            //千分位分隔符
            function numFormat(num) {
                num = num.toString().split("."); // 分隔小数点
                var arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
                var res = [];
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (i % 3 === 0 && i !== 0) {
                        res.push(","); // 添加分隔符
                    }
                    res.push(arr[i]);
                }
                res.reverse(); // 再次倒序成为正确的顺序
                if (num[1]) { // 如果有小数的话添加小数部分
                    res = res.join("").concat("." + num[1]);
                } else {
                    res = res.join("");
                }
                return res;
            }
            //数据设置选项
            var store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['id', 'name']
            });
            var data = [{
                id: 'single',
                name: '单值'
            }, {
                id: 'group',
                name: '分组'
            }, {
                id: 'select',
                name: '列表'
            }]
            store.loadData(data);

            function ExtraProperty_directionClick(sender, selectedIndex) {
                setCellInfo(sender, selectedIndex);
            }

            function nr_bgColorCheck_check(sender, checked) {
                if (checked) {
                    nr_bgColor.enable();
                    bjs.enable()
                } else {
                    nr_bgColor.disable()
                    nr_bgColor.setValue('');
                    nr_bgColor.fireEvent("change", nr_bgColor, "");
                    bjs.disable()
                }
            }

            function nr_frontColorCheck_check(sender, checked) {
                if (checked) {
                    nr_frontColor.enable();
                    qjs.enable()
                } else {
                    nr_frontColor.disable()
                    nr_frontColor.setValue('')
                    nr_frontColor.fireEvent("change", nr_frontColor, "");
                    qjs.disable()
                }
            }

            function nr_leftMarginCheck_check(sender, checked) {
                if (checked) {
                    nr_leftMargin.enable();
                    zsj.enable()
                } else {
                    nr_leftMargin.disable()
                    nr_leftMargin.setValue('')
                    nr_leftMargin.fireEvent("change", nr_leftMargin, "");
                    zsj.disable()
                }
            }

            function nr_heightCheck_check(sender, checked) {
                if (checked) {
                    nr_height.enable();
                    gd.enable()
                } else {
                    nr_height.disable()
                    nr_height.setValue('')
                    nr_height.fireEvent("change", nr_height, "");
                    gd.disable()
                }
            }

            function nr_sameValueRight_check(sender, checked) {
                if (checked) {
                    nr_rightDependencies.show();
                    bbb.show()
                } else {
                    nr_rightDependencies.hide()
                    nr_rightDependencies.setValue('')
                    nr_rightDependencies.fireEvent("change", nr_rightDependencies, "");
                    bbb.hide()
                }
            }

            function nr_sameValueDown_check(sender, checked) {
                if (checked) {
                    nr_downDependencies.show();
                    aaa.show()
                } else {
                    nr_downDependencies.hide()
                    aaa.hide()
                    nr_downDependencies.setValue('')
                    nr_downDependencies.fireEvent("change", nr_downDependencies, "");
                }
            }

            function nr_availableCheck_check(sender, checked) {
                if (checked) {
                    nr_available.enable();
                    ky.enable()
                } else {
                    nr_available.disable()
                    nr_available.setValue('')
                    nr_available.fireEvent("change", nr_available, "");
                    ky.disable()
                }
            }

            function nr_widthCheck_check(sender, checked) {
                if (checked) {
                    nr_width.enable();
                    kd.enable()
                } else {
                    nr_width.disable()
                    nr_width.setValue('')
                    nr_width.fireEvent("change", nr_width, "");
                    kd.disable()
                }
            }

            function nr_rowTextCheck_check(sender, checked) {
                if (checked) {
                    nr_rowText.enable();
                    hzt.enable()
                } else {
                    nr_rowText.disable()
                    nr_rowText.setValue('')
                    nr_rowText.fireEvent("change", nr_rowText, "");
                    hzt.disable()
                }
            }

            function nr_bgColor_afterrender(sender) {
                nr_bgColor.disable()
                nr_frontColor.disable()
                nr_leftMargin.disable()
                nr_rowText.disable()
                nr_width.disable()
                nr_available.disable()
                nr_height.disable()
                bjs.disable()
                qjs.disable()
                zsj.disable()
                hzt.disable()
                kd.disable()
                ky.disable()
                gd.disable()
            }

            function sjz_click(sender, e) {
                parent.openVisualEditor(0, txtValue.getValue());
            }

            function xsz_click(sender, e) {
                parent.openVisualEditor(1, txtShowValue.getValue());
            }

            function bjs_click(sender, e) {
                if (nr_bgColor.getValue() == "") {
                    parent.openVisualEditor(2, "=if(@value>值){CellBgClr=颜色}");
                } else {
                    parent.openVisualEditor(2, nr_bgColor.getValue());
                }
            }

            function qjs_click(sender, e) {
                if (nr_frontColor.getValue() == "") {
                    parent.openVisualEditor(3, "=if(@value>值){FontClr=颜色}");
                } else {
                    parent.openVisualEditor(3, nr_frontColor.getValue());
                }
            }

            function zsj_click(sender, e) {
                if (nr_leftMargin.getValue() == "") {
                    parent.openVisualEditor(4, "=if(@value>值){LeftMargin=值}");
                } else {
                    parent.openVisualEditor(4, nr_leftMargin.getValue());
                }
            }

            function hzt_click(sender, e) {
                if (nr_rowText.getValue() == "") {
                    parent.openVisualEditor(5, "=if(@value>值){RowFontBold=(是否加粗)}");
                } else {
                    parent.openVisualEditor(5, nr_rowText.getValue());
                }
            }

            function ExtraPropertyChange_directionClick(sender, selectedIndex) {
                setCellInfo(sender, selectedIndex)
            }

            function kd_click(sender, e) {
                if (nr_width.getValue() == "") {
                    parent.openVisualEditor(6, "=if(@value>值){RowFontBold=(是否加粗)}");
                } else {
                    parent.openVisualEditor(6, nr_width.getValue());
                }
            }

            function ky_click(sender, e) {
                if (nr_available.getValue() == "") {
                    parent.openVisualEditor(7, "=if(@value>值){disable=1}");
                } else {
                    parent.openVisualEditor(7, nr_available.getValue());
                }
            }

            function gd_click(sender, e) {
                if (nr_height.getValue() == "") {
                    parent.openVisualEditor(8, "=if(@value>值){rowheight=0}");
                } else {
                    parent.openVisualEditor(8, nr_height.getValue());
                }
            }

            function CellTypeProperty_DropDownTree(sender, value) {
                page.fireEvent("change", sender, value)
            }
            //判断ele是否含有cls类名
            function hasClass(ele, cls) {
                return ele.dom.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
            }
            //元素移除class
            function removeClass(ele, cls) {
                if (hasClass(ele, cls)) {
                    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                    ele.dom.className = ele.dom.className.replace(reg, ' ');
                }
            }
            // 字号转换像素
            function sizeToPX(size) {
                var str = size;
                switch (size) {
                    case "6":
                        str = "9";
                        break;
                    case "8":
                        str = "11";
                        break;
                    case "9":
                        str = "12";
                        break;
                    case "10":
                        str = "13";
                        break;
                    case "10.5":
                        str = "14";
                        break;
                    case "11":
                        str = "15";
                        break;
                    case "12":
                        str = "16";
                        break;
                    case "14":
                        str = "19";
                        break;
                    case "15":
                        str = "20";
                        break;
                    case "16":
                        str = "21";
                        break;
                    case "18":
                        str = "24";
                        break;
                    case "20":
                        str = "27";
                        break;
                    case "22":
                        str = "29";
                        break;
                    case "24":
                        str = "32";
                        break;
                    case "26":
                        str = "35";
                        break;
                    case "28":
                        str = "37";
                        break;
                    case "36":
                        str = "48";
                        break;
                    case "48":
                        str = "64";
                        break;
                    case "54":
                        str = "72";
                        break;
                    case "72":
                        str = "96";
                        break;
                }
                return str + "px";
            }

            function MyTabs_beforerender(sender) {
                panel.title = '';
                panel1.title = '';
                panel3.title = '';
                panel4.title = '';
                panel8.title = '';
            }

            function MyTabs_afterrender(sender) {
                var titleGroup = vmd(this.header.dom).find('.x-tab-strip-text')
                titleGroup[0].innerHTML = "<i class='report-iconfont icon-kuozhan font-20' data-tooltip='扩展'></i>"
                titleGroup[1].innerHTML = "<i class='report-iconfont icon-shuxing font-20B' data-tooltip='属性'></i>"
                titleGroup[2].innerHTML = "<i class='report-iconfont icon-zitiyangshi- font-20B' data-tooltip='样式'></i>"
                titleGroup[3].innerHTML = "<i class='report-iconfont icon-dayin font-20B' data-tooltip='打印'></i>"
                titleGroup[4].innerHTML = "<i class='report-iconfont icon-chaolianjie font-20B' data-tooltip='超链接与右键菜单'></i>"
                if (typeof padutis != undefined)
                    padutils = {
                        validUrlRe: new RegExp("^(?:https?|sftp|ftps?|ssh|ircs?|file|gopher|telnet|nntp|worldwind|chrome|chrome-extension|svn|git|mms|smb|afp|nfs|(x-)?man|gopher|txmt)://|^mailto:|^xmpp:|^sips?:|^tel:|^sms:|^news:|^bitcoin:|^magnet:|^urn:|^geo:|^/", "i"),
                        escapeHtml: function(e) {
                            var t = /[&<>'"]/g;
                            return t.MAP || (t.MAP = {
                                "&": "&amp;",
                                "<": "&lt;",
                                ">": "&gt;",
                                '"': "&#34;",
                                "'": "&#39;"
                            }), e.replace(t, function(e) {
                                return t.MAP[e]
                            })
                        },
                        uniqueId: function() {
                            function e(e, t) {
                                return (Array(t + 1).join("0") + Number(e).toString(35)).slice(-t)
                            }
                            return [pad.getClientIp(), e(+new Date, 7), e(Math.floor(1e9 * Math.random()), 4)].join(".")
                        },
                        getLength: function(e) {
                            for (var t = 0, n = 0; n < e.length; n++) {
                                t += e.charCodeAt(n) <= 255 ? 1 : 2
                            }
                            return t
                        },
                        splitString: function(e, t) {
                            var n = "",
                                o = 0;
                            if (padutils.getLength(e) <= t) n = e;
                            else
                                for (var i = 0; i < e.length; i++) {
                                    var r = e.charAt(i);
                                    if ((o += e.charCodeAt(i) <= 255 ? 1 : 2) > t) {
                                        n += "...";
                                        break
                                    }
                                    n += r
                                }
                            return n
                        },
                        getIsMobile: function() {
                            return -1 != navigator.userAgent.toLowerCase().indexOf("iphone") || -1 != navigator.userAgent.toLowerCase().indexOf("ipad") || -1 != navigator.userAgent.toLowerCase().indexOf("android") || -1 != navigator.userAgent.toLowerCase().indexOf("ipod")
                        },
                        timediff: function(e) {
                            function t(e, t) {
                                return (e = Math.round(e)) + " " + t + (1 != e ? "s" : "") + " ago"
                            }
                            return (e = Math.max(0, (+new Date - +e - pad.clientTimeOffset) / 1e3)) < 60 ? t(e, "second") : (e /= 60) < 60 ? t(e, "minute") : (e /= 60) < 24 ? t(e, "hour") : t(e /= 24, "day")
                        },
                        getCheckbox: function(e) {
                            return $(e).is(":checked")
                        },
                        setCheckbox: function(e, t) {
                            t ? $(e).attr("checked", "checked") : $(e).removeAttr("checked")
                        },
                        bindCheckboxChange: function(e, t) {
                            $(e).bind("click change", t)
                        },
                        encodeUserId: function(e) {
                            return e.replace(/[^a-y0-9]/g, function(e) {
                                return "." == e ? "-" : "z" + e.charCodeAt(0) + "z"
                            })
                        },
                        decodeUserId: function(e) {
                            return e.replace(/[a-y0-9]+|-|z.+?z/g, function(e) {
                                return "-" == e ? "." : "z" == e.charAt(0) ? String.fromCharCode(Number(e.slice(1, -1))) : e
                            })
                        },
                        setToolToastCss: function(e) {
                            var t = $("#toolToast");
                            t.length > 0 && e && $.each(e, function(e, n) {
                                t.css(e, n)
                            })
                        },
                        hideToolToast: function(e, t) {
                            t || (t = $("#toolToastWrap:last")), setTimeout(function() {
                                t.remove(), 0 == $("#toolToast:last").filter(":visible").length && $("#toolToast:last").show(), e && e()
                            }, 200)
                        },
                        toolToast: function(e, t, n, o, i) {
                            var r = !1;
                            if (n && n.supportMobile && (r = !0, t || (t = {}), t)) {
                                if (!t.top) try {
                                    t.top = $("header").height() + $("header").offset().top + $(window).scrollTop() + 10
                                } catch (e) {
                                    "doc" === clientVars.padType ? t.top = "137px" : "sheet" === clientVars.padType && (t.top = "112px"), console.log("showTooltoast mobile fail")
                                }
                                t["background-color"] || (t["background-color"] = "rgba(0,0,0,0.7)"), t.color || (t.color = "#ffffff"), t["padding-left"] || (t["padding-left"] = "10px"), t["padding-right"] || (t["padding-right"] = "10px")
                            }
                            if (!padutils.getIsMobile() || r) {
                                var s, a;
                                if (padutils.hideToolToast(n && n.toolToastRemoveCallBack ? n.toolToastRemoveCallBack : void 0), a = o && i ? o : $("body"), "object" != typeof t && (t = {}), !i && !r) {
                                    delete t.top, delete t.left, delete t.right, delete t.bottom, delete t.width, delete t.height, delete t["max-width"], delete t["max-height"], delete t.position, delete t.transform;
                                    try {
                                        "doc" === clientVars.padType ? (s = $(".editor-wrapper").offset().top + $("#padeditor").scrollTop(), t.top = s, t.transform = "translateY(-50%)") : "sheet" === clientVars.padType && (t.top = $("header").height() + $("header").offset().top)
                                    } catch (e) {
                                        "doc" === clientVars.padType ? (t.top = "137px", t.transform = "translateY(-50%)") : "sheet" === clientVars.padType && (t.top = "112px"), console.log("showTooltoast fail")
                                    }
                                }
                                var c = $('<div id="toolToastWrap">').prependTo(a);
                                c.css({
                                    left: "20px",
                                    right: "30px",
                                    borderSizing: "border-box",
                                    display: "none",
                                    position: "absolute",
                                    zIndex: 501
                                }), r || c.css(t);
                                var l = $("<div id='toolToast'>").prependTo(c),
                                    u = $("<span></span>").html(e).prependTo(l);
                                if (r && (t && l.css(t), c.css("right", "20px")), n && n.isNeedBtn) {
                                    var d = $('<span id="toolToastBtn"></span>').html(n.btnText);
                                    u.append(d);
                                    var p = n.btnTextAfter;
                                    if (p) {
                                        var h = $('<span id="toolToastBtnAfter"></span').html(p);
                                        u.append(h)
                                    }
                                    d.click(function() {
                                        n.btnCallBack && n.btnCallBack()
                                    })
                                }
                                if (n && n.isNeedClose) {
                                    var f = $("<div class='toast-colse'>");
                                    l.append(f), f.hover(function() {
                                        $(this).addClass("toast-colse-hover")
                                    }, function() {
                                        $(this).removeClass("toast-colse-hover")
                                    }), l.css("padding-right", 36), f.click(function() {
                                        padutils.hideToolToast(n && n.toolToastRemoveCallBack ? n.toolToastRemoveCallBack : void 0)
                                    })
                                } else if (n && n.isWarnning) {
                                    var g = $("<div class='toast-mark-white'>");
                                    l.prepend(g), l.css("background-color", "#ff7d6f"), l.css("color", "white"), l.css("padding-left", 34);
                                    var m = $("<div class='toast-colse-white'>");
                                    l.append(m), l.css("padding-right", 36), m.click(function() {
                                        padutils.hideToolToast(n && n.toolToastRemoveCallBack ? n.toolToastRemoveCallBack : void 0)
                                    })
                                }
                                c.show(), l.show(), n && n.toolToastCloseTime && parseFloat(n.toolToastCloseTime) && setTimeout(function() {
                                    padutils.hideToolToast(n && n.toolToastRemoveCallBack ? n.toolToastRemoveCallBack : void 0, c)
                                }, parseFloat(n.toolToastCloseTime))
                            }
                        },
                        toolTipMouseenter: function(e) {
                            var extendParam = e.data ? e.data.extendParam : null,
                                drawViewCallback = e.data ? e.data.drawViewCallback : null;
                            padutils.setTimeoutId && (clearTimeout(padutils.setTimeoutId), padutils.setTimeoutId = 0), $("#tooltip").remove();
                            var vtimeOut = 0;
                            if (extendParam && extendParam.timeOut && (vtimeOut = extendParam.timeOut), !(extendParam && extendParam.showTtpInNeedScroll && $(this)[0].scrollWidth <= $(this).outerWidth())) {
                                var handleElement = $(this),
                                    setTimeoutId = setTimeout(function() {
                                        $("#tooltip").remove();
                                        var tooltipData = handleElement.data("tooltip") ? handleElement.data("tooltip") : handleElement.attr("data-tooltip");
                                        if ("function" == typeof tooltipData && (tooltipData = tooltipData()), void 0 !== tooltipData && "string" != typeof tooltipData && (tooltipData = handleElement[0].getAttribute("data-tooltip")), tooltipData && !handleElement.hasClass("hp-ui-button-active")) {
                                            if (extendParam && extendParam.mouseenterCallBack && extendParam.mouseenterCallBack(), tooltipData && tooltipData.indexOf("()") && 0 == tooltipData.indexOf("'")) {
                                                var tempTooltipData = tooltipData;
                                                try {
                                                    tooltipData = eval(tooltipData)
                                                } catch (e) {
                                                    tooltipData = tempTooltipData
                                                }
                                            }
                                            var tooltip = $("<div id='tooltip'>").text(tooltipData).prependTo($("body"));
                                            tooltip.data("target-dom", e.target);
                                            var tooltip_taper_angle_Class = "tooltip-before";
                                            extendParam && (extendParam.tooltipArrowClass && (tooltip_taper_angle_Class = extendParam.tooltipArrowClass), extendParam.tooltipClass && !tooltip.hasClass(extendParam.tooltipClass) && tooltip.addClass(extendParam.tooltipClass));
                                            var tooltipAngle = $("<div id='" + tooltip_taper_angle_Class + "'>"),
                                                tooltip_taper_angle = null;
                                            tooltip_taper_angle = "tooltip-after" == tooltip_taper_angle_Class ? tooltipAngle.appendTo(tooltip) : tooltipAngle.prependTo(tooltip), drawViewCallback(tooltip, tooltip_taper_angle, handleElement)
                                        }
                                    }, vtimeOut);
                                vtimeOut > 0 && (padutils.setTimeoutId = setTimeoutId)
                            }
                        },
                        toolTipMouseleave: function(e) {
                            var t = e.data ? e.data.extendParam : null;
                            $("#tooltip").remove(), padutils.setTimeoutId && (clearTimeout(padutils.setTimeoutId), padutils.setTimeoutId = 0), t && t.mouseleaveCallBack && t.mouseleaveCallBack()
                        },
                        baseTooltip: function(e, t, n) {
                            if (!padutils.getIsMobile()) {
                                this.removeTooltip(e);
                                var o = $(e);
                                o.on("mouseenter", null, {
                                    drawViewCallback: t,
                                    extendParam: n
                                }, this.toolTipMouseenter), o.on("mouseleave", null, {
                                    drawViewCallback: t,
                                    extendParam: n
                                }, this.toolTipMouseleave)
                            }
                        },
                        tooltip: function(e, t) {
                            return t = t || {}, padutils.baseTooltip(e, function(e, n, o) {
                                if (o.siblings(".dropdown-wrapper.open").length > 0 || o.siblings(".toolbar-border-palette.open").length > 0 || "toolbar-colorPicker-picker-wrapper" == o.attr("id") && $.fn.colorPicker.isColorPaletteShow(1) || "toolbar-colorPicker-picker-paint-wrapper" == o.attr("id") && $.fn.colorPicker.isColorPaletteShow(2) || ("sheet-calculate-button" == o.attr("id") || "sheet-calculate-more" == o.attr("id")) && $("#sheet-calculate").siblings(".dropdown-wrapper.open").length > 0) $("#tooltip").remove();
                                else {
                                    var i = o.offset().top + o.outerHeight() + 10,
                                        r = o.offset().left + o.outerWidth() / 2 - e.outerWidth() / 2;
                                    r = (r = Math.min(document.body.clientWidth - e.outerWidth() - 10, r)) <= 10 ? 10 : r;
                                    var s = o.offset().left + o.outerWidth() / 2 - r;
                                    n.css({
                                        left: t.beforeLeft || s
                                    }), i > document.body.clientHeight && n && "tooltip-after" == n.attr("id") && (i = o.offset().top - o.outerHeight()), e.css({
                                        top: i,
                                        left: r > 0 ? r : 0,
                                        zIndex: 1e5,
                                        maxWidth: t.maxWidth || "300px",
                                        paddingLeft: t.paddingLeft || "9px",
                                        textAlign: t.textAlign || "center"
                                    }).hide().fadeIn()
                                }
                            }, t)
                        },
                        hideTooltip: function() {
                            $("#tooltip").remove()
                        },
                        removeTooltip: function(e) {
                            var t = this;
                            $(e).each(function() {
                                $(this).off("mouseenter", null, t.toolTipMouseenter), $(this).off("mouseleave", null, t.toolTipMouseleave)
                            })
                        },
                        horizontalTooltip: function(e, t, n) {
                            return t || (t = {}), t.tooltipArrowClass || (t.tooltipArrowClass = "tooltip-right"), padutils.baseTooltip(e, function(e, o, i) {
                                n && n.height ? e.css("height", n.height) : e.css("height", i.outerHeight() - 6), e.css("line-height", e.css("height")), t && t["min-width"] && e.css("min-width", t["min-width"] - 16);
                                var r, s = i.offset().top;
                                r = "tooltip-right" == $(o).get(0).id ? i.offset().left + i.outerWidth() : i.offset().left - e.outerWidth() - 9, t && t.left && (r += t.left), s < 0 && o.css({
                                    top: e.outerHeight() / 2 + s
                                }), e.css({
                                    top: s > 0 ? s : 0,
                                    left: r > 0 ? r : 0,
                                    zIndex: 1e5
                                }).hide().fadeIn()
                            }, t)
                        },
                        btnState: function(e, t, n, o) {
                            e.mousedown(function(e) {
                                $(this).addClass(o), $(this).removeClass(n + " " + t)
                            }), e.mouseup(function(e) {
                                $(this).removeClass(o + " " + t), $(this).addClass(n)
                            }), e.mouseenter(function(e) {
                                $(this).addClass(n), $(this).removeClass(t)
                            }), e.mouseleave(function(e) {
                                $(this).addClass(t), $(this).removeClass(n + " " + o)
                            })
                        },
                        toolTextCount: function(e, t, n, o, i) {
                            var r = i || $("body");
                            o && o.isNeedReflush && $(window).resize(function() {
                                n && "left" in n || (s = r.outerWidth() / 2 - e.outerWidth() / 2, e.css({
                                    left: s > 0 ? s : 0
                                }))
                            });
                            var s = r.outerWidth() / 2 - e.outerWidth() / 2;
                            e.css({
                                left: s > 0 ? s : 0
                            }), n && $.each(n, function(t, n) {
                                e.css(t, n)
                            }), e.text(t), e.show()
                        },
                        hideTextCount: function(e) {
                            e.hide()
                        }
                    };
                padutils.tooltip(".contentprp [data-tooltip]");
            }

            function txtValue_beforerender(sender) {
                this.enableKeyEvents = true
            }

            function txtValue_keyup(sender, e) {
                var v = sender.getValue();
                var arr = [];
                if (page.cells) {
                    for (var i = 0; i < page.cells.length; i++) {
                        var r = page.cells[i].r;
                        var c = page.cells[i].c;
                        var temp = [r, c, v]
                        arr.push(temp)
                    }
                    page.o.setDataAtCell(arr)
                }
            }

            function MyTabs1_tabchange(sender, tab) {
                if (tab.title == '打印') {
                    hwPrintSetting.setInfo(page.o)
                } else if (tab.title == '填报') {
                    hwReporting.setInfo();
                    sheetHot.setSaveSubmit();
                    sheetHot.setSaveCheck();
                    // sheetHot.setSubmitList(page.o.submitParams.id, page.o.submitParams.name, page.o.submitParams.text, page.o.submitParams.obj, page.o.submitParams.save)
                } else if (tab.title == '分片') {
                    hwFP.clearPanel();
                    hwFP.setInfo(sheetHot);
                }
            }

            function ContentProperty_beforerender(sender) {}

            function panel3_afterrender(sender) {}

            function hwNewNumber_decimalChanged(sender, value, describe) {
                setCellInfo(sender, value)
            }

            function panel_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ContentProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.ContentProperty_beforerender = ContentProperty_beforerender;
        this.items = [{
            xtype: "panel",
            id: "showRptId",
            title: "reportID显示",
            header: false,
            border: true,
            height: 100,
            autoHeight: true,
            items: [{
                xtype: "tabpanel",
                id: "MyTabs1",
                activeTab: 0,
                height: 800,
                width: 290,
                x: 0,
                y: 0,
                tabchange: "MyTabs1_tabchange",
                listeners: {
                    tabchange: MyTabs1_tabchange
                },
                items: [{
                        xtype: "panel",
                        id: "panel2",
                        title: "单元格",
                        header: true,
                        border: false,
                        height: 800,
                        layout: "fit",
                        items: [{
                            xtype: "tabpanel",
                            id: "MyTabs",
                            activeTab: 0,
                            height: 580,
                            width: 290,
                            x: 340,
                            y: 50,
                            border: false,
                            unstyled: false,
                            collapsible: false,
                            disabled: false,
                            tabchange: "MyTabs_tabchange",
                            beforerender: "MyTabs_beforerender",
                            afterrender: "MyTabs_afterrender",
                            cls: "fonttitle",
                            listeners: {
                                tabchange: MyTabs_tabchange,
                                beforerender: MyTabs_beforerender,
                                vmdafterrender: MyTabs_afterrender
                            },
                            items: [{
                                    xtype: "panel",
                                    id: "panel",
                                    title: "扩展",
                                    header: false,
                                    border: false,
                                    height: 800,
                                    layout: "absolute",
                                    width: 292,
                                    autoScroll: true,
                                    afterrender: "panel_afterrender",
                                    listeners: {
                                        vmdafterrender: panel_afterrender
                                    },
                                    items: [{
                                            xtype: "label",
                                            id: "label",
                                            text: "实际值：",
                                            x: 25,
                                            y: 140
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "txtValue",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 80,
                                            y: 135,
                                            width: 165,
                                            cls: "b",
                                            beforerender: "txtValue_beforerender",
                                            keyup: "txtValue_keyup",
                                            listeners: {
                                                beforerender: txtValue_beforerender,
                                                keyup: txtValue_keyup
                                            },
                                            emptyText: this.text
                                        },
                                        {
                                            xtype: "label",
                                            id: "label1",
                                            text: "显示值：",
                                            x: 25,
                                            y: 175
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "txtShowValue",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 80,
                                            y: 170,
                                            width: 165,
                                            cls: "b",
                                            emptyText: this.showValue
                                        },
                                        {
                                            xtype: "label",
                                            id: "label3",
                                            text: "条件属性",
                                            x: 10,
                                            y: 205
                                        },
                                        {
                                            xtype: "checkbox",
                                            id: "nr_bgColorCheck",
                                            fieldLabel: "Checkbox",
                                            boxLabel: "背景色：",
                                            x: 10,
                                            y: 230,
                                            check: "nr_bgColorCheck_check",
                                            listeners: {
                                                check: nr_bgColorCheck_check
                                            }
                                        },
                                        {
                                            xtype: "checkbox",
                                            id: "nr_frontColorCheck",
                                            fieldLabel: "Checkbox",
                                            boxLabel: "前景色：",
                                            x: 10,
                                            y: 265,
                                            check: "nr_frontColorCheck_check",
                                            listeners: {
                                                check: nr_frontColorCheck_check
                                            }
                                        },
                                        {
                                            xtype: "checkbox",
                                            id: "nr_leftMarginCheck",
                                            fieldLabel: "Checkbox",
                                            boxLabel: "左缩进：",
                                            x: 10,
                                            y: 300,
                                            check: "nr_leftMarginCheck_check",
                                            listeners: {
                                                check: nr_leftMarginCheck_check
                                            }
                                        },
                                        {
                                            xtype: "checkbox",
                                            id: "nr_heightCheck",
                                            fieldLabel: "Checkbox",
                                            boxLabel: "高度：",
                                            x: 10,
                                            y: 440,
                                            check: "nr_heightCheck_check",
                                            listeners: {
                                                check: nr_heightCheck_check
                                            }
                                        },
                                        {
                                            xtype: "checkbox",
                                            id: "nr_sameValueRight",
                                            fieldLabel: "Checkbox",
                                            boxLabel: "同值向右合并",
                                            x: 10,
                                            y: 530,
                                            check: "nr_sameValueRight_check",
                                            hidden: false,
                                            listeners: {
                                                check: nr_sameValueRight_check
                                            }
                                        },
                                        {
                                            xtype: "checkbox",
                                            id: "nr_sameValueDown",
                                            fieldLabel: "Checkbox",
                                            boxLabel: "同值向下合并",
                                            x: 10,
                                            y: 500,
                                            check: "nr_sameValueDown_check",
                                            hidden: false,
                                            listeners: {
                                                check: nr_sameValueDown_check
                                            }
                                        },
                                        {
                                            xtype: "checkbox",
                                            id: "nr_availableCheck",
                                            fieldLabel: "Checkbox",
                                            boxLabel: "可用：",
                                            x: 10,
                                            y: 405,
                                            check: "nr_availableCheck_check",
                                            listeners: {
                                                check: nr_availableCheck_check
                                            }
                                        },
                                        {
                                            xtype: "checkbox",
                                            id: "nr_widthCheck",
                                            fieldLabel: "Checkbox",
                                            boxLabel: "宽度：",
                                            x: 10,
                                            y: 370,
                                            check: "nr_widthCheck_check",
                                            listeners: {
                                                check: nr_widthCheck_check
                                            }
                                        },
                                        {
                                            xtype: "checkbox",
                                            id: "nr_rowTextCheck",
                                            fieldLabel: "Checkbox",
                                            boxLabel: "行字体：",
                                            x: 10,
                                            y: 335,
                                            check: "nr_rowTextCheck_check",
                                            listeners: {
                                                check: nr_rowTextCheck_check
                                            }
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "nr_bgColor",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 85,
                                            y: 230,
                                            width: 160,
                                            cls: "b",
                                            afterrender: "nr_bgColor_afterrender",
                                            listeners: {
                                                vmdafterrender: nr_bgColor_afterrender
                                            }
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "nr_frontColor",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 85,
                                            y: 265,
                                            width: 160,
                                            cls: "b"
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "nr_leftMargin",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 85,
                                            y: 300,
                                            width: 160,
                                            cls: "b"
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "nr_rowText",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 85,
                                            y: 335,
                                            width: 160,
                                            cls: "b"
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "nr_width",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 85,
                                            y: 370,
                                            width: 160,
                                            cls: "b"
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "nr_available",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 85,
                                            y: 405,
                                            width: 160,
                                            cls: "b"
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "nr_height",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 85,
                                            y: 440,
                                            width: 160,
                                            cls: "b"
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "nr_downDependencies",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 180,
                                            y: 496,
                                            width: 90,
                                            cls: "b",
                                            hidden: true
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "nr_rightDependencies",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            x: 180,
                                            y: 530,
                                            width: 90,
                                            cls: "b",
                                            hidden: true
                                        },
                                        {
                                            xtype: "label",
                                            id: "label4",
                                            text: "合并：",
                                            x: 10,
                                            y: 475,
                                            hidden: false
                                        },
                                        {
                                            xtype: "label",
                                            id: "aaa",
                                            text: "依赖条件：",
                                            x: 120,
                                            y: 504,
                                            hidden: true
                                        },
                                        {
                                            xtype: "label",
                                            id: "bbb",
                                            text: "依赖条件：",
                                            x: 120,
                                            y: 534,
                                            hidden: true
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "sjz",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
                                            x: 250,
                                            y: 135,
                                            width: 30,
                                            height: 25,
                                            click: "sjz_click",
                                            listeners: {
                                                click: sjz_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "xsz",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
                                            x: 250,
                                            y: 170,
                                            width: 30,
                                            height: 25,
                                            click: "xsz_click",
                                            listeners: {
                                                click: xsz_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "bjs",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
                                            x: 250,
                                            y: 230,
                                            width: 30,
                                            height: 25,
                                            click: "bjs_click",
                                            listeners: {
                                                click: bjs_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "qjs",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
                                            x: 250,
                                            y: 270,
                                            width: 30,
                                            height: 25,
                                            click: "qjs_click",
                                            listeners: {
                                                click: qjs_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "zsj",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
                                            x: 250,
                                            y: 305,
                                            width: 30,
                                            height: 25,
                                            click: "zsj_click",
                                            listeners: {
                                                click: zsj_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "hzt",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
                                            x: 250,
                                            y: 340,
                                            width: 30,
                                            height: 25,
                                            click: "hzt_click",
                                            listeners: {
                                                click: hzt_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "kd",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
                                            x: 250,
                                            y: 375,
                                            width: 30,
                                            height: 25,
                                            click: "kd_click",
                                            listeners: {
                                                click: kd_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "ky",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
                                            x: 250,
                                            y: 410,
                                            width: 30,
                                            height: 25,
                                            click: "ky_click",
                                            listeners: {
                                                click: ky_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "gd",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
                                            x: 250,
                                            y: 445,
                                            width: 30,
                                            height: 25,
                                            click: "gd_click",
                                            listeners: {
                                                click: gd_click
                                            }
                                        },
                                        {
                                            xtype: "label",
                                            id: "label2",
                                            text: "————————————————",
                                            x: 70,
                                            y: 205,
                                            style: "color: #dddddd;"
                                        },
                                        {
                                            xtype: "vmd.ux.ExtraPropertyChange",
                                            id: "ExtraPropertyChange",
                                            direction: "1",
                                            layout: "absolute",
                                            x: 5,
                                            y: 0,
                                            directionClick: "ExtraPropertyChange_directionClick",
                                            listeners: {
                                                directionClick: ExtraPropertyChange_directionClick
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: "panel",
                                    id: "panel1",
                                    title: "属性",
                                    header: true,
                                    border: true,
                                    height: 100,
                                    layout: "fit",
                                    autoScroll: true,
                                    items: [{
                                        xtype: "vmd.ux.CellTypeProperty",
                                        id: "CellTypeProperty",
                                        layout: "absolute",
                                        DropDownTree: "CellTypeProperty_DropDownTree"
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "panel3",
                                    title: "样式",
                                    header: true,
                                    border: true,
                                    height: 100,
                                    layout: "fit",
                                    afterrender: "panel3_afterrender",
                                    autoScroll: true,
                                    listeners: {
                                        vmdafterrender: panel3_afterrender
                                    },
                                    items: [{
                                        xtype: "vmd.ux.NewNumber",
                                        id: "hwNewNumber",
                                        layout: "absolute",
                                        decimalChanged: "hwNewNumber_decimalChanged",
                                        listeners: {
                                            decimalChanged: hwNewNumber_decimalChanged
                                        }
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "panel4",
                                    title: "打印",
                                    header: true,
                                    border: true,
                                    height: 573,
                                    hidden: false,
                                    autoScroll: true,
                                    items: [{
                                        xtype: "vmd.ux.PrintConfig",
                                        id: "PrintConfig",
                                        layout: "absolute",
                                        hidden: false,
                                        width: 285
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "panel8",
                                    title: "菜单",
                                    header: true,
                                    border: true,
                                    height: 100,
                                    layout: "fit",
                                    autoScroll: true,
                                    items: [{
                                        xtype: "vmd.ux.LinkAndMenu",
                                        id: "hwLinkAndMenu",
                                        layout: "absolute"
                                    }]
                                }
                            ]
                        }]
                    },
                    {
                        xtype: "panel",
                        id: "panel5",
                        title: "分栏",
                        header: false,
                        border: false,
                        height: 100,
                        layout: "fit",
                        autoScroll: true,
                        items: [{
                            xtype: "vmd.ux.Segmentation",
                            id: "Segmentation",
                            layout: "absolute"
                        }]
                    },
                    {
                        xtype: "panel",
                        id: "panel9",
                        title: "分片",
                        header: true,
                        border: true,
                        height: 100,
                        autoScroll: true,
                        items: [{
                            xtype: "vmd.ux.FP",
                            id: "hwFP",
                            layout: "absolute"
                        }]
                    },
                    {
                        xtype: "panel",
                        id: "panel10",
                        title: "填报",
                        header: true,
                        border: true,
                        height: 100,
                        autoScroll: true,
                        items: [{
                            xtype: "vmd.ux.Reporting",
                            id: "hwReporting",
                            layout: "fit"
                        }]
                    },
                    {
                        xtype: "panel",
                        id: "panel6",
                        title: "打印",
                        header: true,
                        border: true,
                        height: 100,
                        autoScroll: true,
                        items: [{
                            xtype: "vmd.ux.PrintSetting",
                            id: "hwPrintSetting",
                            layout: "fit"
                        }]
                    }
                ]
            }]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setPropertyInfo = function(paramJson, selectCell, obj) {
            //直接填写方法内容
            setProperty(paramJson, selectCell, obj);
        }
        this.setReport = function(type) {
            setReport(type)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ContentProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ContentProperty");
    }
})