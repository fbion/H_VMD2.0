Ext.define("vmd.ux.Rpt1", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Rpt1",
    title: "Panel",
    header: false,
    border: false,
    width: 1000,
    height: 700,
    layout: "fit",
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

        function report_afterrender(render) {
            report.query();
        }
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: true,
            border: true,
            height: 100,
            layout: "fit",
            items: [{
                xtype: "vmd.report2_2",
                id: "report",
                text: "report",
                align: "center",
                fillReport: false,
                loadMode: "nomal",
                nousedataset: false,
                isServer: true,
                ocx_version: "1,2,2,0",
                rptVersion: "2.2",
                afterrender: "report_afterrender",
                isWebEdit: true,
                listeners: {
                    vmdafterrender: report_afterrender
                }
            }]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.Rpt1");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Rpt1");
    }
})