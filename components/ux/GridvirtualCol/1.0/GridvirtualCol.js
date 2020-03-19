Ext.define("vmd.ux.GridvirtualCol", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.GridvirtualCol",
    title: "Panel",
    header: false,
    border: false,
    width: 350,
    height: 450,
    layout: "border",
    afterrender: "GridvirtualCol_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.GridvirtualCol_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.GridvirtualCol'
                }, ex, 50);
            }
        }
    },
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
            var mypage = this;
            mypage.selFiledInfo = {}

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
            //根据列信息设置并绑定到列信息展示区域
            function _setFileInfo(fileInfo) {
                mypage.selFiledInfo = fileInfo;
                if (fileInfo) {
                    //设置通用属性
                    fileInfo.fileInfo = fileInfo.fileInfo || {}
                    fileInfo.events = fileInfo.events || {}
                    var type = (fileInfo.fileInfo && fileInfo.fileInfo.type) || "txt";
                    virtualColName.setValue(fileInfo.title || "")
                    typeList.setValue(type)
                    colWidthTxt.setValue(fileInfo.width)
                    allowFilt.setValue(fileInfo.allowFilt || false)
                    allowSort.setValue(fileInfo.allowSort || false)
                    allowSort.setValue(fileInfo.allowSort || false)
                    showValue.setValue(fileInfo.showValue || "")
                    //statValue.setValue(fileInfo.statValue || "")
                    if (fileInfo.statValue && fileInfo.statValue.length > 0) {
                        allowStat.setValue(true)
                        hwDiv10.show();
                        hwDiv6.doLayout();
                    } else {
                        allowStat.setValue(false)
                        hwDiv10.hide();
                        hwDiv6.doLayout();
                    }
                    statValue.setValue(fileInfo.statValue || "")
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

            function customFormatChk_check(sender, checked) {
                if (!checked) {
                    customFormat.setValue("")
                }
            }

            function linkClickDel_click(sender, e) {
                mypage.selFiledInfo.events.click = ""
                linkClick.setValue("")
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

            function _getFieldsInfo() {
                var _field = {};
                _field.colId = mypage.selFiledInfo.colId || ("InvCol_" + Date.now());
                _field.title = mypage.selFiledInfo.title || virtualColName.getValue();
                _field.width = colWidthTxt.getValue();
                _field.isVirtual = true;
                allowFilt.getValue() && (_field.allowFilt = true);
                allowSort.getValue() && (_field.allowSort = true);
                showValue.getValue() && (_field.showValue = showValue.getValue());
                statValue.getValue() && (_field.statValue = statValue.getValue());
                _field.fileInfo = {};
                _field.fileInfo.type = typeList.getValue() || "txt";
                if (_field.fileInfo.type == "txt") {
                    lineFeedChk.getValue() && (_field.fileInfo.lineFeed = true)
                }
                if (_field.fileInfo.type == "num") {
                    //mypage.selFiledInfo.fileInfo.lineFeed && _field.fileInfo.lineFeed = mypage.selFiledInfo.fileInfo.lineFeed
                }
                if (_field.fileInfo.type == "link") {
                    linktitleTxt.getValue() && (_field.fileInfo.title = linktitleTxt.getValue())
                    linkClick.getValue() && (_field.events = {
                        click: linkClick.getValue()
                    })
                }
                if (_field.fileInfo.type == "date") {
                    (customFormat.getValue() && customFormatChk.getValue()) && (_field.fileInfo.format = customFormat.getValue())
                    defaultDate.getValue() && (_field.fileInfo.defaultDate = true)
                }
                return _field;
            }

            function GridvirtualCol_afterrender(sender) {}

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
                p1: 'vmd.ux.GridvirtualCol',
                p2: ex.message
            }, ex, 100);
        }
        this.GridvirtualCol_afterrender = GridvirtualCol_afterrender;
        this.items = [{
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
                    id: "hwDiv1",
                    layoutConfig: {
                        align: "middle"
                    },
                    autoEl: "div",
                    border: false,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: 400,
                    height: 40,
                    anchor: "100%",
                    layout: "hbox",
                    items: [{
                            xtype: "label",
                            id: "hwLabel1",
                            text: "虚拟列名：",
                            margins: "10 0 0 0 "
                        },
                        {
                            xtype: "textfield",
                            id: "virtualColName",
                            allowBlank: true,
                            enableKeyEvents: true,
                            width: 213,
                            margins: "10 0 0 0"
                        }
                    ]
                },
                {
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
                    height: 30,
                    x: 100,
                    y: 60,
                    anchor: "100% ",
                    layout: "hbox",
                    items: [{
                            xtype: "label",
                            id: "hwLabel",
                            text: "类型：",
                            margins: ""
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "typeList",
                            width: 255,
                            height: 270,
                            margins: "",
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
                            readOnly: true
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
                            width: 232
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
                        checked: true
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
                            readOnly: true
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
                    anchor: "100% -250",
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
                                                width: 223
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
                                boxLabel: "自动换行"
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
                                    width: 190
                                },
                                {
                                    xtype: "checkbox",
                                    id: "defaultDate",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "默认当前日期"
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setFileInfo = function(fileInfo) {
            //直接填写方法内容
            _setFileInfo(fileInfo)
        }
        this.getFiledInfo = function() {
            //直接填写方法内容
            return _getFieldsInfo()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.GridvirtualCol");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.GridvirtualCol");
    }
})