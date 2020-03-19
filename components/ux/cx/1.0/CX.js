undefined
Ext.define("vmd.ux.CX", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.CX",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 164,
    height: 34,
    layout: "hbox",
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
        if (Ext.isString(this.store)) this.store = new Ext.data.JsonStore()
        this.items = [{
                xtype: "vmd.button",
                id: "button",
                text: "查询",
                type: "(none)",
                size: "small",
                margins: "0 10 0 0"
            },
            {
                xtype: "vmd.button",
                id: "button1",
                text: "导出",
                type: "(none)",
                size: "small",
                margins: "0 10 0 0"
            },
            {
                xtype: "vmd.button",
                id: "button2",
                text: "打印",
                type: "(none)",
                size: "small"
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.CX");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.CX");
    }
})