Ext.define('vmd.ux.richTextProperty.Controller', {
    xtype: 'vmd.ux.richTextProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.RichTextProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.RichTextType$1.0$RichTextType", "vmd.ux.ValueChange_click_Event$1.0$ValueChange_click_Event"]),
    version: "1.0",
    xtype: "vmd.ux.RichTextProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 672,
    layout: "fit",
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
                            RichTextType.setInfo(info.cell_RichTextInfo, cell)
                            break;
                        case "事件":
                            ValueChange_click_Event.setInfo(info.cell_RichTextInfo, 'fwb')
                            break;
                    }
                }
            }

            function setInfo(info, cell) {
                page.cell = cell;
                page.info = info;
                var curTab = MyTabs.activeTab;
                switch (curTab.title) {
                    case "属性":
                        RichTextType.setInfo(page.info.cell_RichTextInfo[0], page.cell)
                        break;
                    case "事件":
                        ValueChange_click_Event.setInfo(info.cell_RichTextInfo[0], 'fwb')
                        break;
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

            function RichTextType_rtDecimalChanged(sender, value, describe) {
                page.fireEvent("RTPchange", sender, value)
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.RichTextProperty',
                p2: ex.message
            }, ex, 100);
        }
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
                        xtype: "vmd.ux.RichTextType",
                        id: "RichTextType",
                        layout: "absolute",
                        rtDecimalChanged: "RichTextType_rtDecimalChanged",
                        listeners: {
                            rtDecimalChanged: RichTextType_rtDecimalChanged
                        }
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.RichTextProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.RichTextProperty");
    }
})