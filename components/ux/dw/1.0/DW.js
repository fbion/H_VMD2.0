undefined
Ext.define("vmd.ux.DW", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DW",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 190,
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
        this.items = [{
                xtype: "label",
                id: "label",
                text: "单位:"
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                width: 150,
                valueField: this.ddss
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.aaaa = function(a, b, c, d, e, f, g, hhhhhhhhhhh, eesss) {
            //直接填写方法内容
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DW");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DW");
    }
})