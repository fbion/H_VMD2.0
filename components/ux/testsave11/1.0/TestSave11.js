Ext.define("vmd.ux.TestSave11", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.TestSave11",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 600,
    height: 350,
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
        try {} catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.TestSave11',
                p2: ex.message
            }, ex, 100);
        }
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.TestSave11");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TestSave11");
    }
})