Ext.define("vmd.ux.TEST_Text", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.TEST_Text",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 220,
    height: 165,
    layout: "absolute",
    panelName: "属性设置",
    bindCmp: "TestCom",
    bindCmpVersion: "1.0",
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
                p1: 'vmd.ux.TEST_Text',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
            xtype: "textfield",
            id: "hwText",
            allowBlank: true,
            enableKeyEvents: true,
            x: 40,
            y: 40
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.TEST_Text");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TEST_Text");
    }
})