Ext.define('vmd.ux.uploadProperty.Controller', {
    xtype: 'vmd.ux.uploadProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.UploadProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.UploadType$1.0$UploadType", "vmd.ux.Data_sczj$1.0$Data_sczj", "vmd.ux.ValueChange_click_dbClick_Event$1.0$ValueChange_click_dbClick_Event"]),
    version: "1.0",
    xtype: "vmd.ux.UploadProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 672,
    layout: "fit",
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
            debugger
            var info = page.info;
            var cell = page.cell;
            var curTab = tab;
            if (info) {
                switch (curTab.title) {
                    case "属性":
                        UploadType.setInfo(info.cell_UploadInfo, cell)
                        break;
                    case "数据":
                        Data_sczj.setInfo(info.cell_UploadInfo, cell)
                        break;
                    case "事件":
                        ValueChange_click_dbClick_Event.setInfo(info.cell_UploadInfo, 'sczj')
                        break;
                }
            }
        }

        function setInfo(info, cell) {
            debugger
            page.cell = cell;
            page.info = info;
            var curTab = MyTabs.activeTab;
            UploadType.setInfo(info.cell_UploadInfo, page.cell)
            Data_sczj.setInfo(info.cell_UploadInfo, page.cell)
            ValueChange_click_dbClick_Event.setInfo(info.cell_UploadInfo, 'sczj')
        }

        function UploadType_uploadDecimalChanged(sender, value, describe) {
            page.fireEvent("UploadChange", sender, value)
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
                    items: [{
                        xtype: "vmd.ux.UploadType",
                        id: "UploadType",
                        layout: "absolute",
                        uploadDecimalChanged: "UploadType_uploadDecimalChanged",
                        listeners: {
                            uploadDecimalChanged: UploadType_uploadDecimalChanged
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
                        xtype: "vmd.ux.Data_sczj",
                        id: "Data_sczj",
                        layout: "absolute"
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
            setInfo(info, cell)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.UploadProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.UploadProperty");
    }
})