Ext.define("vmd.ux.Baobiao", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Baobiao",
    title: "Panel",
    header: false,
    border: false,
    width: 580,
    height: 525,
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
            xtype: "vmd.report2_2",
            id: "report",
            text: "report",
            relativepath: "report/Baobiao",
            align: "center",
            fillReport: false,
            loadMode: "nomal",
            nousedataset: false,
            isServer: true,
            ocx_version: "1,2,2,0",
            rptVersion: "2.2",
            x: 190,
            y: 260,
            afterrender: "report_afterrender",
            path: "Baobiao_report.json",
            isWebEdit: true,
            listeners: {
                vmdafterrender: report_afterrender
            }
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.Baobiao");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Baobiao");
    }
})