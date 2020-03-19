Ext.define('vmd.ux.buttonProperty.Controller', {
    xtype: 'vmd.ux.buttonProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ButtonProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.ButtonType$1.0$ButtonType", "vmd.ux.Click_dbClick_Event$1.0$Click_dbClick_Event"]),
    version: "1.0",
    xtype: "vmd.ux.ButtonProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 650,
    layout: "absolute",
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

            function setInfo(info, cell) {
                page.info = info;
                var curTab = MyTabs.activeTab;
                switch (curTab.title) {
                    case "属性":
                        hwButtonType.setInfo(page.info.cell_ButtonInfo[0], page.cell)
                        break;
                    case "事件":
                        hwClick_dbClick_Event.setInfo(page.info.cell_ButtonInfo[0])
                        break;
                }
            }

            function MyTabs_tabchange(sender, tab) {
                var t = sheetHot.dealInvert()[0]
                var info = sheetHot.getCellMeta(t.sr, t.sc).cellAttributeInfo;
                var curTab = MyTabs.activeTab;
                if (info) {
                    switch (curTab.title) {
                        case "属性":
                            hwButtonType.setInfo(info.cell_ButtonInfo, page.cell)
                            break;
                        case "事件":
                            hwClick_dbClick_Event.setInfo(info.cell_ButtonInfo)
                            break;
                    }
                }
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ButtonProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 650,
            width: 290,
            x: 0,
            y: 0,
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
                    layout: "fit",
                    items: [{
                        xtype: "vmd.ux.ButtonType",
                        id: "hwButtonType",
                        layout: "auto"
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "事件",
                    header: true,
                    border: true,
                    height: 100,
                    items: [{
                        xtype: "vmd.ux.Click_dbClick_Event",
                        id: "hwClick_dbClick_Event",
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
        this.setInfo = function(info) {
            //直接填写方法内容
            setInfo(info)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ButtonProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ButtonProperty");
    }
})