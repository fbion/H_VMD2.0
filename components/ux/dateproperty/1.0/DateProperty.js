Ext.define('vmd.ux.dateProperty.Controller', {
    xtype: 'vmd.ux.dateProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.DateProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.DateType$1.0$DateType", "vmd.ux.ValueChange_click_dbClick_Event$1.0$ValueChange_click_dbClick_Event"]),
    version: "1.0",
    xtype: "vmd.ux.DateProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 672,
    layout: "fit",
    afterrender: "DateProperty_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.DateProperty_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.DateProperty'
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
                            DateType.setInfo(info.cell_DateInfo, cell);
                            break;
                        case "事件":
                            ValueChange_click_dbClick_Event.setInfo(info.cell_DateInfo, 'rq')
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
                        DateType.setInfo(info.cell_DateInfo[0], cell);
                        break;
                    case "事件":
                        ValueChange_click_dbClick_Event.setInfo(info.cell_DateInfo[0], 'rq')
                        break;
                }
            }

            function DateProperty_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.DateProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.DateProperty_afterrender = DateProperty_afterrender;
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
                        xtype: "vmd.ux.DateType",
                        id: "DateType",
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
                        xtype: "vmd.ux.ValueChange_click_dbClick_Event",
                        id: "ValueChange_click_dbClick_Event",
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.DateProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DateProperty");
    }
})