Ext.define("vmd.ux.Rpt", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Rpt",
    title: "Panel",
    header: false,
    border: false,
    width: 1200,
    height: 453,
    layout: "border",
    fillReport: false,
    path: "Rpt_report.json",
    align: "center",
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
                xtype: "vmd.div",
                id: "div1",
                autoEl: "div",
                border: true,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 32,
                height: 50,
                region: "west"
            },
            {
                xtype: "panel",
                id: "panel",
                title: "Panel",
                header: false,
                border: true,
                height: 100,
                region: "center",
                layout: "fit",
                items: [{
                    xtype: "vmd.report2_2",
                    id: "report",
                    text: "report",
                    relativepath: "report/Rpt",
                    align: this.align,
                    fillReport: this.fillReport,
                    loadMode: "nomal",
                    nousedataset: false,
                    isServer: true,
                    ocx_version: "1,2,2,0",
                    rptVersion: "2.2",
                    afterrender: "report_afterrender",
                    path: this.path,
                    isWebEdit: true,
                    listeners: {
                        vmdafterrender: report_afterrender
                    },
                    dsnames: this.dsnames
                }]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.Rpt");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Rpt");
    }
})