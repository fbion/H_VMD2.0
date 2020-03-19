Ext.define('vmd.ux.dropDownTreeProperty.Controller', {
    xtype: 'vmd.ux.dropDownTreeProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.DropDownTreeProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.DropDownTreeType$1.0$DropDownTreeType", "vmd.ux.Data_xls$1.0$Data_xls", "vmd.ux.ValueChange_click_Event$1.0$ValueChange_click_Event"]),
    version: "1.0",
    xtype: "vmd.ux.DropDownTreeProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 672,
    layout: "fit",
    afterrender: "DropDownTreeProperty_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.DropDownTreeProperty_afterrender(this)
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

        function MyTabs_tabchange(sender, tab) {
            var info = page.info;
            var cell = page.cell;
            var curTab = tab;
            if (info) {
                debugger
                switch (curTab.title) {
                    case "属性":
                        DropDownTreeType.setInfo(info.cell_DropDownTreeInfo[0], cell)
                        break;
                    case "数据":
                        Data_xls.setInfo(info.cell_DropDownTreeInfo[0]);
                        break;
                    case "事件":
                        ValueChange_click_Event.setInfo(info.cell_DropDownTreeInfo, 'xls')
                        break;
                }
            }
            // cell_DropDownTreeInfo.combotree_change.value
        }

        function setInfo(info, cell) {
            page.cell = cell;
            page.info = info;
            DropDownTreeType.setInfo(info.cell_DropDownTreeInfo[0], cell);
            Data_xls.setInfo(info.cell_DropDownTreeInfo[0]);
            ValueChange_click_Event.setInfo(info.cell_DropDownTreeInfo, 'xls')
        }
        // function setCellStyle(value, type, sender) {
        //     if(page.cell && page.cell.type == "TD") {
        //         var cell = page.cell.cells;
        //         if(cell) {
        //             if(cell.cell && cell.cell.cellAttributeInfo) {
        //                 if(type == "underline" && value) {
        //                     cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value.inputValue);
        //                 } else {
        //                     cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value);
        //                 }
        //             }
        //             setCells(cell.cell, value, type);
        //         }
        //     } else if(page.cell && page.cell.type == "DIV") {
        //         var cells = page.cell.cells;
        //         if(cells && cells.length > 0) {
        //             for(var i = 0; i < cells.length; i++) {
        //                 var cell = cells[i];
        //                 if(cell) {
        //                     if(cell.cell && cell.cell.cellAttributeInfo) {
        //                         if(type == "underline" && value) {
        //                             cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value.inputValue);
        //                         } else {
        //                             cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value);
        //                         }
        //                     }
        //                     setCells(cell.cell, value, type);
        //                 }
        //             }
        //         }
        //     } else {
        //         if(page.cell && page.cell.cell) {
        //             if(page.cell.cell.cellAttributeInfo) {
        //                 if(type == "underline" && value) {
        //                     page.cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value.inputValue);
        //                 } else {
        //                     page.cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value);
        //                 }
        //             }
        //             setCells(page.cell.cell, value, type);
        //         }
        //     }
        // }
        function DropDownTreeType_decimalChanged(sender, value) {
            page.fireEvent("DropDownTreeWidthChange", sender, value)
        }

        function DropDownTreeProperty_afterrender(sender) {}
        this.DropDownTreeProperty_afterrender = DropDownTreeProperty_afterrender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            x: 110,
            y: 110,
            tabchange: "MyTabs_tabchange",
            listeners: {
                tabchange: MyTabs_tabchange
            },
            items: [{
                    xtype: "panel",
                    id: "panel2",
                    title: "属性",
                    header: true,
                    border: true,
                    height: 100,
                    items: [{
                        xtype: "vmd.ux.DropDownTreeType",
                        id: "DropDownTreeType",
                        layout: "absolute",
                        decimalChanged: "DropDownTreeType_decimalChanged",
                        listeners: {
                            decimalChanged: DropDownTreeType_decimalChanged
                        }
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel",
                    title: "数据",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "fit",
                    items: [{
                        xtype: "vmd.ux.Data_xls",
                        id: "Data_xls",
                        layout: "absolute"
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel1",
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
            setInfo(info, cell);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DropDownTreeProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DropDownTreeProperty");
    }
})