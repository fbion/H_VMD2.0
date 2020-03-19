undefined
Ext.define("vmd.ux.ZyflSearch", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ZyflSearch",
    title: "Panel",
    header: false,
    border: false,
    width: 200,
    height: 30,
    layout: "absolute",
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

        function textkeyDown(sender, e) {
            if (e.keyCode == '13')
                page.fireEvent("searchTextChange", sender, sender.startValue, sender.getValue());
        }

        function hwText_afterrender(sender) {
            sender.mon(this, {
                keyup: textkeyDown
            });
        }

        function hwText_beforerender(sender) {
            hwText.enableKeyEvents = true;
        }

        function button_click(sender, e) {
            page.fireEvent("searchTextChange", hwText, hwText.startValue, hwText.getValue());
            //记录日志信息 
            //vmd.webBase.syslog(loginfo,logtype,operationtype,function(res){}) 
        }
        this.items = [{
                xtype: "textfield",
                id: "hwText",
                allowBlank: true,
                enableKeyEvents: true,
                x: 0,
                y: 0,
                height: 28,
                style: "border: 1px  solid #dfdfdf;",
                hidden: false,
                width: 170,
                afterrender: "hwText_afterrender",
                beforerender: "hwText_beforerender",
                listeners: {
                    vmdafterrender: hwText_afterrender,
                    beforerender: hwText_beforerender
                }
            },
            {
                xtype: "vmd.button",
                id: "button",
                type: "(none)",
                size: "mini",
                x: 170,
                y: 0,
                width: 28,
                icon: "search",
                height: 28,
                style: "border-radius: 0px;",
                click: "button_click",
                listeners: {
                    click: button_click
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.ZyflSearch");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ZyflSearch");
    }
})