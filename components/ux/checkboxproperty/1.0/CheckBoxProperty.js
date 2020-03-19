Ext.define('vmd.ux.checkBoxProperty.Controller', {
    xtype: 'vmd.ux.checkBoxProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.CheckBoxProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.CheckBoxType$1.0$CheckBoxType", "vmd.ux.Data_xlk$1.0$Data_xlk", "vmd.ux.ValueChange_click_Event$1.0$ValueChange_click_Event"]),
    version: "1.0",
    xtype: "vmd.ux.CheckBoxProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 672,
    layout: "fit",
    afterrender: "CheckBoxProperty_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.CheckBoxProperty_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.CheckBoxProperty'
                }, ex, 50);
            }
        }
    },
    uxrequirejs: "[\"lib/ace/ace.js?ver=vmd2.0.5.191031\",\"lib/ace/mode-base.js?ver=vmd2.0.5.191031\",\"lib/ace/theme-xcode.js?ver=vmd2.0.5.191031\",\"lib/ace/ext-language_tools.js?ver=vmd2.0.5.191031\"]",
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
            var page = this;

            function MyTabs_tabchange(sender, tab) {
                var t = sheetHot.dealInvert()[0]
                var info = sheetHot.getCellMeta(t.sr, t.sc).cellAttributeInfo;
                var cell = page.cell;
                var curTab = tab;
                if (info) {
                    switch (curTab.title) {
                        case "属性":
                            CheckBoxType.setInfo(info.cell_CheckBoxInfo, cell)
                            break
                        case "事件":
                            ValueChange_click_Event.setInfo(info.cell_CheckBoxInfo, 'fxk')
                            break;
                        case "数据":
                            hwData_xlk.setInfo(info.cell_CheckBoxInfo, 'fxk')
                            break
                    }
                }
            }

            function setInfo(info, cell) {
                page.cell = cell;
                page.info = info;
                var curTab = MyTabs.activeTab;
                switch (curTab.title) {
                    case "属性":
                        CheckBoxType.setInfo(page.info.cell_CheckBoxInfo[0], page.cell)
                        break
                    case "事件":
                        ValueChange_click_Event.setInfo(page.info.cell_CheckBoxInfo[0], 'fxk')
                        break;
                    case "数据":
                        hwData_xlk.setInfo(page.info.cell_CheckBoxInfo[0], 'fxk')
                        break
                }
            }

            function setCellStyle(value, type, sender) {
                if (page.cell && page.cell.type == "TD") {
                    var cell = page.cell.cells;
                    if (cell) {
                        if (cell.cell && cell.cell.cellAttributeInfo) {
                            if (type == "underline" && value) {
                                cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value.inputValue);
                            } else {
                                cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value);
                            }
                        }
                    }
                } else if (page.cell && page.cell.type == "DIV") {
                    var cells = page.cell.cells;
                    if (cells && cells.length > 0) {
                        for (var i = 0; i < cells.length; i++) {
                            var cell = cells[i];
                            if (cell) {
                                if (cell.cell && cell.cell.cellAttributeInfo) {
                                    if (type == "underline" && value) {
                                        cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value.inputValue);
                                    } else {
                                        cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (page.cell && page.cell.cell) {
                        if (page.cell.cell.cellAttributeInfo) {
                            if (type == "underline" && value) {
                                page.cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value.inputValue);
                            } else {
                                page.cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value);
                            }
                        }
                    }
                }
            }

            function CheckBoxType_checkboxDecimalChanged(sender, value, describe) {
                setCellStyle(value, null, sender)
            }

            function hwData_xlk_data_typeSetting_changed(value) {
                page.fireEvent('putData', 'fxk_typeSetting', value)
            }

            function hwData_xlk_data_dataSet_changed(value) {
                page.fireEvent('putData', 'fxk_dataSet', value)
            }

            function hwData_xlk_data_saveFiled_changed(value) {
                page.fireEvent('putData', 'fxk_saveFiled', value)
            }

            function hwData_xlk_data_myDisplayFiled_changed(value) {
                page.fireEvent('putData', 'fxk_myDisplayFiled', value)
            }

            function hwData_xlk_data_filterCondition_changed(value) {
                page.fireEvent('putData', 'fxk_filterCondition', value)
            }

            function CheckBoxProperty_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.CheckBoxProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.CheckBoxProperty_afterrender = CheckBoxProperty_afterrender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            tabchange: "MyTabs_tabchange",
            listeners: {
                tabchange: MyTabs_tabchange
            },
            items: [{
                    xtype: "panel",
                    id: "panel",
                    title: "属性",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "fit",
                    items: [{
                        xtype: "vmd.ux.CheckBoxType",
                        id: "CheckBoxType",
                        layout: "vbox",
                        checkboxDecimalChanged: "CheckBoxType_checkboxDecimalChanged",
                        listeners: {
                            checkboxDecimalChanged: CheckBoxType_checkboxDecimalChanged
                        }
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "数据",
                    header: true,
                    border: true,
                    height: 100,
                    items: [{
                        xtype: "vmd.ux.Data_xlk",
                        id: "hwData_xlk",
                        layout: "absolute",
                        data_typeSetting_changed: "hwData_xlk_data_typeSetting_changed",
                        data_dataSet_changed: "hwData_xlk_data_dataSet_changed",
                        data_saveFiled_changed: "hwData_xlk_data_saveFiled_changed",
                        data_myDisplayFiled_changed: "hwData_xlk_data_myDisplayFiled_changed",
                        data_filterCondition_changed: "hwData_xlk_data_filterCondition_changed",
                        listeners: {
                            data_typeSetting_changed: hwData_xlk_data_typeSetting_changed,
                            data_dataSet_changed: hwData_xlk_data_dataSet_changed,
                            data_saveFiled_changed: hwData_xlk_data_saveFiled_changed,
                            data_myDisplayFiled_changed: hwData_xlk_data_myDisplayFiled_changed,
                            data_filterCondition_changed: hwData_xlk_data_filterCondition_changed
                        }
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel2",
                    title: "事件",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "fit",
                    items: [{
                        xtype: "vmd.ux.ValueChange_click_Event",
                        id: "ValueChange_click_Event",
                        layout: "absolute"
                    }]
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info, cell) {
            setInfo(info, cell)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.CheckBoxProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.CheckBoxProperty");
    }
})