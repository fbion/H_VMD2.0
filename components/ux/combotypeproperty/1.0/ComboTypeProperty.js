Ext.define('vmd.ux.comboTypeProperty.Controller', {
    xtype: 'vmd.ux.comboTypeProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ComboTypeProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.ComboType$1.0$ComboType", "vmd.ux.Data_xlk$1.0$Data_xlk", "vmd.ux.ValueChange_click_Event$1.0$ValueChange_click_Event"]),
    version: "1.0",
    xtype: "vmd.ux.ComboTypeProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 672,
    layout: "fit",
    afterrender: "ComboTypeProperty_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.ComboTypeProperty_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.ComboTypeProperty'
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
                            ComboType.setInfo(info.cell_ComboInfo, cell)
                            break;
                        case "事件":
                            ValueChange_click_Event.setInfo(info.cell_ComboInfo, 'xlk')
                            break;
                        case "数据":
                            hwData_xlk.setInfo(info.cell_ComboInfo, 'xlk')
                            break;
                    }
                }
            }

            function setInfo(info, cell) {
                page.info = info;
                page.cell = cell;
                var curTab = MyTabs.activeTab;
                switch (curTab.title) {
                    case "属性":
                        ComboType.setInfo(page.info.cell_ComboInfo[0], page.cell)
                        break;
                    case "事件":
                        ValueChange_click_Event.setInfo(info.cell_ComboInfo[0], 'xlk')
                        break;
                    case "数据":
                        hwData_xlk.setInfo(page.info.cell_ComboInfo[0], 'xlk')
                        // Data_xlk.setInfo(page.info.storeInfo[0], page.info.cell_data_xlkInfo[0], page.cell)
                        break;
                }
            }

            function ComboType_comboDecimalChanged(sender, value, describe) {
                page.fireEvent("widthChange", sender, value)
            }

            function hwData_xlk_data_dataSet_changed(value) {
                page.fireEvent('putData', 'xlk_dataSet', value)
            }

            function hwData_xlk_data_typeSetting_changed(value) {
                page.fireEvent('putData', 'xlk_typeSetting', value)
            }

            function hwData_xlk_data_saveFiled_changed(value) {
                page.fireEvent('putData', 'xlk_saveFiled', value)
            }

            function hwData_xlk_data_myDisplayFiled_changed(value) {
                page.fireEvent('putData', 'xlk_myDisplayFiled', value)
            }

            function hwData_xlk_data_filterCondition_changed(value) {
                page.fireEvent('putData', 'xlk_filterCondition', value)
            }

            function ComboTypeProperty_afterrender(sender) {
                sender.hwData_xlk.data_dropDownDisplayColumn.hide();
                sender.hwData_xlk.label4.hide();
                sender.hwData_xlk.button1.hide()
                // sender.hwData_xlk.label5.setPosition(10, 155)
                // sender.hwData_xlk.button2.setPosition(255, 150)
                // sender.hwData_xlk.data_filterCondition.setPosition(70, 150)
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ComboTypeProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.ComboTypeProperty_afterrender = ComboTypeProperty_afterrender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            x: 60,
            y: 70,
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
                        xtype: "vmd.ux.ComboType",
                        id: "ComboType",
                        layout: "absolute",
                        comboDecimalChanged: "ComboType_comboDecimalChanged",
                        listeners: {
                            comboDecimalChanged: ComboType_comboDecimalChanged
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
                    layout: "fit",
                    items: [{
                        xtype: "vmd.ux.Data_xlk",
                        id: "hwData_xlk",
                        layout: "absolute",
                        data_dataSet_changed: "hwData_xlk_data_dataSet_changed",
                        data_typeSetting_changed: "hwData_xlk_data_typeSetting_changed",
                        data_saveFiled_changed: "hwData_xlk_data_saveFiled_changed",
                        data_myDisplayFiled_changed: "hwData_xlk_data_myDisplayFiled_changed",
                        data_filterCondition_changed: "hwData_xlk_data_filterCondition_changed",
                        listeners: {
                            data_dataSet_changed: hwData_xlk_data_dataSet_changed,
                            data_typeSetting_changed: hwData_xlk_data_typeSetting_changed,
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
                        layout: "absolute",
                        width: 289
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
            //直接填写方法内容
            setInfo(info, cell)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ComboTypeProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ComboTypeProperty");
    }
})