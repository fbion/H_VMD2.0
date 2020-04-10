Ext.define("vmd.ux.GridFieldInfo", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.GridFieldInfo",
    title: "Panel",
    header: false,
    border: false,
    width: 480,
    height: 600,
    layout: "border",
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
            var typeListData = [{
                name: '文本',
                id: "txt"
            }, {
                name: '数字',
                id: "num"
            }, {
                name: '日期',
                id: "date"
            }, {
                name: '超链接',
                id: "link"
            }]
            var typeListStore = new vmd.data.Store({
                data: typeListData,
                fields: ['id', 'name']
            })
            var fieldsStore = new vmd.data.Store({
                data: [],
                fields: ['id', 'name', 'mixname']
            })
            var mypage = this;
            mypage.selFiledInfo = {}
            mypage.filedsInfo = []

            function typeList_beforerender(sender) {
                typeList.displayField = 'name';
                typeList.valueField = 'id';
                typeList.store = typeListStore;
            }

            function typeList_selectChanged(sender, combo, record, index) {
                setTypePanel()
                mypage.selFiledInfo.fileInfo.type = typeList.getValue()
                //设置字段的额信息，默认值
                _setDefaultConfigInfo()
            }

            function _setDefaultConfigInfo() {
                var fileInfo = mypage.selFiledInfo;
                var _type = typeList.getValue()
                var _fileInfo = {},
                    _fileEvent = {};
                _fileInfo.type = _type;
                if (_type == "txt") {
                    lineFeedChk.setValue(fileInfo.fileInfo.lineFeed || false)
                    _fileInfo.lineFeed = fileInfo.fileInfo.lineFeed || false;
                } else if (_type == "num") {} else if (_type == "date") {
                    defaultDate.setValue((fileInfo.fileInfo && fileInfo.fileInfo.defaultDate) || false)
                    customFormatChk.setValue((fileInfo.fileInfo && fileInfo.fileInfo.format) ? true : false)
                    customFormat.setValue((fileInfo.fileInfo && fileInfo.fileInfo.format) || "")
                    _fileInfo.defaultDate = (fileInfo.fileInfo && fileInfo.fileInfo.defaultDate) || false
                    _fileInfo.format = (fileInfo.fileInfo && fileInfo.fileInfo.format) ? true : false
                } else if (_type == "link") {
                    linktitleTxt.setValue((fileInfo.fileInfo && fileInfo.fileInfo.title) || "");
                    linkClick.setValue((fileInfo.events && fileInfo.events["click"]) || "");
                    _fileInfo.title = (fileInfo.fileInfo && fileInfo.fileInfo.title) || "";
                    _fileEvent["click"] = (fileInfo.events && fileInfo.events["click"]) || "";
                } else {}
                mypage.selFiledInfo.fileInfo = _fileInfo;
                mypage.selFiledInfo.events = _fileEvent;
            }
            //
            function setTypePanel() {
                enableAll()
                if (typeList.getValue() == "txt") {
                    txtTypeDiv.show();
                } else if (typeList.getValue() == "num") {} else if (typeList.getValue() == "date") {
                    dateDiv.show();
                } else if (typeList.getValue() == "link") {
                    linkDiv.show();
                } else {
                    txtTypeDiv.show();
                }
                hwDiv4.doLayout();
            }

            function enableAll() {
                txtTypeDiv.hide(true);
                linkDiv.hide(true);
                dateDiv.hide(true);
            }
            var defauleSelInde = 0

            function _setFilesInfo(filesInfo, selNum) {
                mypage.filedsInfo = filesInfo;
                var fieldsStoreDate = [];
                for (var i = 0; i < filesInfo.length; i++) {
                    fieldsStoreDate.push({
                        id: filesInfo[i].colId,
                        name: filesInfo[i].title,
                        mixname: filesInfo[i].title + "(" + filesInfo[i].colId + ")"
                    })
                    if (filesInfo[i].colId == selNum)
                        defauleSelInde = i
                }
                fieldsStore.loadData(fieldsStoreDate);
                MyGrid.selModel.selectRow(defauleSelInde, true)
                MyGrid_cellclick(MyGrid, defauleSelInde)
            }
            //根据列信息设置并绑定到列信息展示区域
            function _setFileInfo(fileInfo) {
                mypage.selFiledInfo = fileInfo;
                if (fileInfo) {
                    //设置通用属性
                    fileInfo.fileInfo = fileInfo.fileInfo || {}
                    fileInfo.events = fileInfo.events || {}
                    var type = (fileInfo.fileInfo && fileInfo.fileInfo.type) || "txt";
                    typeList.setValue(type)
                    colhideChk.setValue(fileInfo.hide || false)
                    colWidthTxt.setValue(fileInfo.width)
                    allowFilt.setValue(fileInfo.allowFilt || false)
                    allowSort.setValue(fileInfo.allowSort || false)
                    showValue.setValue(fileInfo.showValue || "")
                    // statValue.setValue(fileInfo.statValue || "")
                    if (fileInfo.statValue && fileInfo.statValue.trim().length > 0) {
                        allowStat.setValue(true)
                        hwDiv10.show();
                        hwDiv6.doLayout();
                    } else {
                        allowStat.setValue(false)
                        hwDiv10.hide();
                        hwDiv6.doLayout();
                    }
                    statValue.setValue(fileInfo.statValue || "")
                    lengthTxt.setValue(fileInfo.length)
                    //设置显示面板
                    setTypePanel()
                    //设置面板的属性
                    _setFileConfigInfo()
                }
            }
            //设置默认值，
            function _setFileConfigInfo() {
                var _fileInfo = mypage.selFiledInfo;
                var _type = typeList.getValue()
                if (_type == "txt") {
                    lineFeedChk.setValue(_fileInfo.fileInfo.lineFeed || false)
                } else if (_type == "num") {} else if (_type == "date") {
                    defaultDate.setValue((_fileInfo.fileInfo && _fileInfo.fileInfo.defaultDate) || false)
                    customFormatChk.setValue((_fileInfo.fileInfo && _fileInfo.fileInfo.format) ? true : false)
                    customFormat.setValue((_fileInfo.fileInfo && _fileInfo.fileInfo.format) || "")
                } else if (_type == "link") {
                    linktitleTxt.setValue((_fileInfo.fileInfo && _fileInfo.fileInfo.title) || "")
                    linkClick.setValue((_fileInfo.events && _fileInfo.events["click"]) || "")
                } else {}
            }

            function lineFeedChk_check(sender, checked) {
                mypage.selFiledInfo.fileInfo.lineFeed = checked;
            }

            function customFormatChk_check(sender, checked) {
                if (!checked) {
                    customFormat.setValue("")
                }
            }

            function linkClickDel_click(sender, e) {
                mypage.selFiledInfo.events.click = ""
                linkClick.setValue("")
            }

            function colhideChk_check(sender, checked) {
                mypage.selFiledInfo.hide = checked
            }

            function colWidthTxt_keyup(sender, e) {
                
                mypage.selFiledInfo.width = colWidthTxt.getValue()
            }

            function linktitleTxt_keyup(sender, e) {
                mypage.selFiledInfo.fileInfo.title = linktitleTxt.getValue()
            }

            function customFormat_keyup(sender, e) {
                mypage.selFiledInfo.fileInfo.format = customFormat.getValue()
            }

            function defaultDate_check(sender, checked) {
                mypage.selFiledInfo.fileInfo.defaultDate = checked
            }
            var activePropPanel = parent.xds && parent.xds.active.component.propPanel;

            function linkClick_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var simpleGrid_openCodeEditor = parent.simpleGrid_openCodeEditor;
                    simpleGrid_openCodeEditor(sender, mypage.selFiledInfo.colId + '_link_click', sender.getValue(), 'grid,cell,rId,cInd', function() {
                        mypage.selFiledInfo.events.click = linkClick.getValue()
                    });
                })
            }

            function MyGrid_cellclick(sender, rowIndex, columnIndex, e) {
                _setFileInfo(mypage.filedsInfo[rowIndex])
                var gv = MyGrid.getView();
                var row = gv.getRow(defauleSelInde);
                Ext.get(row).removeClass('x-grid3-row-selected')
                currow = gv.getRow(rowIndex);
                defauleSelInde = rowIndex
                Ext.get(currow).addClass('x-grid3-row-selected')
            }

            function MyGrid_beforerender(sender) {
                MyGrid.store = fieldsStore;
            }

            function allowSort_check(sender, checked) {
                mypage.selFiledInfo.allowSort = checked
            }

            function allowFilt_check(sender, checked) {
                mypage.selFiledInfo.allowFilt = checked
            }

            function allowStat_check(sender, checked) {
                if (checked) {
                    hwDiv10.show();
                    hwDiv6.doLayout();
                } else {
                    hwDiv10.hide();
                    hwDiv6.doLayout();
                }
            }

            function showValue_keyup(sender, e) {
                mypage.selFiledInfo.showValue = showValue.getValue();
            }

            function statValue_keyup(sender, e) {
                mypage.statValue = statValue.getValue()
            }

            function _getFieldsInfo() {
                var _fields = [];
                for (var i = 0; i < mypage.filedsInfo.length; i++) {
                    var _field = {};
                    _field.colId = mypage.filedsInfo[i].colId;
                    _field.title = mypage.filedsInfo[i].title;
                    _field.unit = mypage.filedsInfo[i].unit;
                    _field.length = mypage.filedsInfo[i].length;
                    _field.width = mypage.filedsInfo[i].width || "100";
                    mypage.filedsInfo[i].hide && (_field.hide = mypage.filedsInfo[i].hide);
                    mypage.filedsInfo[i].allowFilt && (_field.allowFilt = mypage.filedsInfo[i].allowFilt);
                    mypage.filedsInfo[i].allowSort && (_field.allowSort = mypage.filedsInfo[i].allowSort);
                    mypage.filedsInfo[i].showValue && (_field.showValue = mypage.filedsInfo[i].showValue);
                    mypage.filedsInfo[i].statValue && (_field.statValue = mypage.filedsInfo[i].statValue);
                    _field.fileInfo = {};
                    _field.fileInfo.type = mypage.filedsInfo[i].fileInfo.type;
                    if (mypage.filedsInfo[i].fileInfo.type == "txt") {
                        mypage.filedsInfo[i].fileInfo.lineFeed && (_field.fileInfo.lineFeed = mypage.filedsInfo[i].fileInfo.lineFeed)
                    }
                    if (mypage.filedsInfo[i].fileInfo.type == "num") {
                        //mypage.filedsInfo[i].fileInfo.lineFeed && _field.fileInfo.lineFeed = mypage.filedsInfo[i].fileInfo.lineFeed
                    }
                    if (mypage.filedsInfo[i].fileInfo.type == "link") {
                        mypage.filedsInfo[i].fileInfo.title && (_field.fileInfo.title = mypage.filedsInfo[i].fileInfo.title)
                        _field.events = mypage.filedsInfo[i].events;
                    }
                    if (mypage.filedsInfo[i].fileInfo.type == "date") {
                        mypage.filedsInfo[i].fileInfo.format && (_field.fileInfo.format = mypage.filedsInfo[i].fileInfo.format)
                        mypage.filedsInfo[i].fileInfo.defaultDate && (_field.fileInfo.defaultDate = mypage.filedsInfo[i].fileInfo.defaultDate)
                    }
                    _fields.push(_field)
                }
                return _fields;
            }

            function colWidthTxt_beforerender(sender) {
                colWidthTxt.enableKeyEvents = true;
            }

            function button_click(sender, e) {
                var editFieldsInfo = mypage.selFiledInfo.showValue;
                var setBack = function(controller, flag) {
                    if (flag) {
                        mypage.selFiledInfo.showValue = controller;
                        showValue.setValue(controller);
                    }
                    simpleGridCodeEdit.close()
                }
                var simpleGridCodeEdit = parent.openSimpleGridCodeEdit(editFieldsInfo, setBack)
                simpleGridCodeEdit.show()
                window.simpleGridCodeEdit = simpleGridCodeEdit;
            }

            function button1_click(sender, e) {
                var editFieldsInfo = mypage.selFiledInfo.statValue;
                var setBack = function(controller, flag) {
                    if (flag) {
                        mypage.selFiledInfo.statValue = controller;
                        statValue.setValue(controller);
                    }
                    simpleGridCodeEdit.close()
                }
                var simpleGridCodeEdit = parent.openSimpleGridCodeEdit(editFieldsInfo, setBack)
                simpleGridCodeEdit.show()
                window.simpleGridCodeEdit = simpleGridCodeEdit;
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.GridFieldInfo',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "vmd.div",
                id: "hwDiv5",
                autoEl: "div",
                border: true,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 150,
                height: 50,
                region: "west",
                layout: "fit",
                items: [{
                    xtype: "grid",
                    id: "MyGrid",
                    title: "已选字段",
                    loadMask: true,
                    header: true,
                    hideHeaders: true,
                    cellclick: "MyGrid_cellclick",
                    beforerender: "MyGrid_beforerender",
                    listeners: {
                        cellclick: MyGrid_cellclick,
                        beforerender: MyGrid_beforerender
                    },
                    columns: [{
                        xtype: "gridcolumn",
                        header: "Column 1",
                        sortable: true,
                        resizable: true,
                        dataIndex: "mixname",
                        width: 130
                    }]
                }]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv6",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 220,
                height: 446,
                layout: "anchor",
                region: "center",
                margins: "0 0 0 10",
                items: [{
                        xtype: "vmd.div",
                        id: "hwDiv",
                        layoutConfig: {
                            align: "middle",
                            padding: ""
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 40,
                        x: 100,
                        y: 60,
                        anchor: "100% ",
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel",
                                text: "类型：",
                                margins: "10 0 0 0"
                            },
                            {
                                xtype: "vmd.comlist",
                                id: "typeList",
                                width: 255,
                                height: 270,
                                margins: "15 0 0 0",
                                selectChanged: "typeList_selectChanged",
                                beforerender: "typeList_beforerender",
                                listeners: {
                                    selectChanged: typeList_selectChanged,
                                    beforerender: typeList_beforerender
                                }
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv1",
                        layoutConfig: {
                            align: "middle"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        x: 180,
                        y: 170,
                        anchor: "100%",
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel1",
                                text: "字段长度："
                            },
                            {
                                xtype: "textfield",
                                id: "lengthTxt",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 212,
                                readOnly: true
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv11",
                        layoutConfig: {
                            align: "middle"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        anchor: "100%",
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel7",
                                text: "显示值："
                            },
                            {
                                xtype: "textfield",
                                id: "showValue",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 225,
                                keyup: "showValue_keyup",
                                readOnly: true,
                                listeners: {
                                    keyup: showValue_keyup
                                }
                            },
                            {
                                xtype: "vmd.button",
                                id: "button",
                                text: "...",
                                type: "(none)",
                                size: "small",
                                height: 25,
                                width: 30,
                                click: "button_click",
                                listeners: {
                                    click: button_click
                                }
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv2",
                        layoutConfig: {
                            align: "middle"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        x: 170,
                        y: 270,
                        anchor: "100%",
                        layout: "hbox",
                        items: [{
                            xtype: "checkbox",
                            id: "colhideChk",
                            fieldLabel: "Checkbox",
                            boxLabel: "列隐藏",
                            width: 186,
                            check: "colhideChk_check",
                            listeners: {
                                check: colhideChk_check
                            }
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv3",
                        layoutConfig: {
                            align: "middle"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        anchor: "100%",
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel3",
                                text: "列宽："
                            },
                            {
                                xtype: "numberfield",
                                id: "colWidthTxt",
                                allowDecimals: true,
                                allowNegative: true,
                                decimalPrecision: 2,
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 232,
                                keyup: "colWidthTxt_keyup",
                                beforerender: "colWidthTxt_beforerender",
                                listeners: {
                                    keyup: colWidthTxt_keyup,
                                    beforerender: colWidthTxt_beforerender
                                }
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv7",
                        layoutConfig: {
                            align: "middle"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        anchor: "100%",
                        layout: "hbox",
                        items: [{
                            xtype: "checkbox",
                            id: "allowSort",
                            fieldLabel: "Checkbox",
                            boxLabel: "启用排序",
                            checked: true,
                            check: "allowSort_check",
                            listeners: {
                                check: allowSort_check
                            }
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv8",
                        layoutConfig: {
                            align: "middle"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        anchor: "100%",
                        layout: "hbox",
                        items: [{
                            xtype: "checkbox",
                            id: "allowFilt",
                            fieldLabel: "Checkbox",
                            boxLabel: "启用过滤",
                            check: "allowFilt_check",
                            listeners: {
                                check: allowFilt_check
                            }
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv9",
                        layoutConfig: {
                            align: "middle"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 27,
                        anchor: "100%",
                        layout: "hbox",
                        items: [{
                            xtype: "checkbox",
                            id: "allowStat",
                            fieldLabel: "Checkbox",
                            boxLabel: "启用统计",
                            check: "allowStat_check",
                            listeners: {
                                check: allowStat_check
                            }
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv10",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        anchor: "100%",
                        style: "margin-left: 10px",
                        hidden: true,
                        items: [{
                                xtype: "label",
                                id: "hwLabel6",
                                text: "统计表达式:"
                            },
                            {
                                xtype: "textfield",
                                id: "statValue",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 198,
                                keyup: "statValue_keyup",
                                readOnly: true,
                                listeners: {
                                    keyup: statValue_keyup
                                }
                            },
                            {
                                xtype: "vmd.button",
                                id: "button1",
                                text: "...",
                                type: "(none)",
                                size: "small",
                                height: 25,
                                width: 30,
                                click: "button1_click",
                                listeners: {
                                    click: button1_click
                                }
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv4",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        x: 190,
                        y: 370,
                        anchor: "100% -280",
                        layout: "anchor",
                        items: [{
                                xtype: "vmd.div",
                                id: "linkDiv",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 289,
                                height: 80,
                                layout: "fit",
                                hidden: false,
                                anchor: "100%",
                                items: [{
                                    xtype: "tabpanel",
                                    id: "hwMyTabs",
                                    activeTab: 0,
                                    height: 80,
                                    width: 263,
                                    border: false,
                                    hidden: false,
                                    items: [{
                                            xtype: "panel",
                                            id: "panel",
                                            layoutConfig: {
                                                align: "middle"
                                            },
                                            title: "属性",
                                            header: false,
                                            border: false,
                                            height: 131,
                                            width: 267,
                                            layout: "hbox",
                                            items: [{
                                                    xtype: "label",
                                                    id: "hwLabel2",
                                                    text: "标签名："
                                                },
                                                {
                                                    xtype: "textfield",
                                                    id: "linktitleTxt",
                                                    allowBlank: true,
                                                    enableKeyEvents: true,
                                                    width: 223,
                                                    keyup: "linktitleTxt_keyup",
                                                    listeners: {
                                                        keyup: linktitleTxt_keyup
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: "panel",
                                            id: "panel1",
                                            layoutConfig: {
                                                align: "middle"
                                            },
                                            title: "事件",
                                            header: false,
                                            border: false,
                                            height: 96,
                                            width: 280,
                                            layout: "hbox",
                                            items: [{
                                                    xtype: "label",
                                                    id: "hwLabel4",
                                                    text: "click："
                                                },
                                                {
                                                    xtype: "textfield",
                                                    id: "linkClick",
                                                    allowBlank: true,
                                                    enableKeyEvents: true,
                                                    width: 232,
                                                    afterrender: "linkClick_afterrender",
                                                    listeners: {
                                                        vmdafterrender: linkClick_afterrender
                                                    }
                                                },
                                                {
                                                    xtype: "vmd.button",
                                                    id: "linkClickDel",
                                                    type: "(none)",
                                                    size: "small",
                                                    icon: "icon-trash",
                                                    width: 30,
                                                    click: "linkClickDel_click",
                                                    height: 25,
                                                    listeners: {
                                                        click: linkClickDel_click
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "txtTypeDiv",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 296,
                                height: 36,
                                hidden: false,
                                anchor: "100%",
                                items: [{
                                    xtype: "checkbox",
                                    id: "lineFeedChk",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "自动换行",
                                    check: "lineFeedChk_check",
                                    listeners: {
                                        check: lineFeedChk_check
                                    }
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "dateDiv",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 295,
                                height: 93,
                                hidden: false,
                                anchor: "100%",
                                items: [{
                                        xtype: "checkbox",
                                        id: "customFormatChk",
                                        fieldLabel: "Checkbox",
                                        boxLabel: "自定义格式",
                                        check: "customFormatChk_check",
                                        listeners: {
                                            check: customFormatChk_check
                                        }
                                    },
                                    {
                                        xtype: "label",
                                        id: "hwLabel5",
                                        text: "格式："
                                    },
                                    {
                                        xtype: "textfield",
                                        id: "customFormat",
                                        allowBlank: true,
                                        enableKeyEvents: true,
                                        width: 190,
                                        keyup: "customFormat_keyup",
                                        listeners: {
                                            keyup: customFormat_keyup
                                        }
                                    },
                                    {
                                        xtype: "checkbox",
                                        id: "defaultDate",
                                        fieldLabel: "Checkbox",
                                        boxLabel: "默认当前日期",
                                        check: "defaultDate_check",
                                        listeners: {
                                            check: defaultDate_check
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setFileInfo = function(fileInfo) {
            //直接填写方法内容
            _setFileInfo(fileInfo)
        }
        this.setFieldsInfo = function(fieldsInfo, selNum) {
            //直接填写方法内容
            _setFilesInfo(fieldsInfo, selNum)
        }
        this.getFiledInfo = function() {
            //直接填写方法内容
            return _getFieldsInfo()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.GridFieldInfo");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.GridFieldInfo");
    }
})