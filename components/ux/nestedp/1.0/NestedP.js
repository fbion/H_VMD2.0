Ext.define("vmd.ux.NestedP", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.NestedTableType$1.0$NestedTableType"]),
    version: "1.0",
    xtype: "vmd.ux.NestedP",
    title: "Panel",
    header: false,
    border: false,
    width: 334,
    height: 624,
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
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: true,
            border: false,
            height: 620,
            x: 0,
            y: 0,
            autoScroll: false,
            items: [{
                xtype: "vmd.ux.NestedTableType",
                id: "hwNestedTableType",
                layout: "absolute"
            }]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.NestedP");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.NestedP");
    }
})