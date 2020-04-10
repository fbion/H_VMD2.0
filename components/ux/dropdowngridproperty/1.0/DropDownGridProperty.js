Ext.define('vmd.ux.dropDownGridProperty.Controller', {
    xtype: 'vmd.ux.dropDownGridProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.DropDownGridProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.DropDownGridType$1.0$DropDownGridType", "vmd.ux.Data_xlk$1.0$Data_xlk", "vmd.ux.ValueChange_click_Event$1.0$ValueChange_click_Event"]),
    version: "1.0",
    xtype: "vmd.ux.DropDownGridProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 650,
    layout: "fit",
    afterrender: "DropDownGridProperty_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.DropDownGridProperty_afterrender(this)
        }
    },
    uxrequirejs: "[\"lib/ace/ace.js\",\"lib/ace/mode-base.js\",\"lib/ace/theme-xcode.js\",\"lib/ace/ext-language_tools.js\"]",
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
        var page = this;

        function setInfo(info, cell) {
            var cell = sheetHot.dealInvert()
            page.info = info;
            hwDropDownGridType.setInfo(page.info.cell_ddg, page.cell)
            hwData_xlk.setInfo(page.info.cell_ddg, 'ddg')
            hwValueChange_click_Event.setInfo(page.info.cell_ddg, 'ddg')
        }

        function DropDownGridProperty_afterrender(sender) {
            var data = sender.hwData_xlk;
            data.label4.text = "下拉网格：";
            data.label4.setPosition(10, 10)
        }

        function hwData_xlk_data_typeSetting_changed(sender, type, value) {
            page.fireEvent('putData', 'ddg_typeSetting', value)
        }

        function hwData_xlk_data_dataSet_changed(sender, type, value) {
            page.fireEvent('putData', 'ddg_dataSet', value)
        }

        function hwData_xlk_data_saveFiled_changed(sender, type, value) {
            page.fireEvent('putData', 'ddg_saveFiled', value)
        }

        function hwData_xlk_data_myDisplayFiled_changed(sender, type, value) {
            page.fireEvent('putData', 'ddg_myDisplayFiled', value)
        }

        function hwData_xlk_data_filterCondition_changed(sender, type, value) {
            page.fireEvent('putData', 'ddg_filterCondition', value)
        }

        function MyTabs_tabchange(sender, tab) {
            
            if (page.info) {
                hwDropDownGridType.setInfo(page.info.cell_ddg, page.cell)
                hwData_xlk.setInfo(page.info.cell_ddg, 'ddg')
                hwValueChange_click_Event.setInfo(page.info.cell_ddg, 'ddg')
            }
        }
        this.DropDownGridProperty_afterrender = DropDownGridProperty_afterrender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            x: 100,
            y: 60,
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
                    items: [{
                        xtype: "vmd.ux.DropDownGridType",
                        id: "hwDropDownGridType",
                        layout: "absolute"
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
                    items: [{
                        xtype: "vmd.ux.ValueChange_click_Event",
                        id: "hwValueChange_click_Event",
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.DropDownGridProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DropDownGridProperty");
    }
})