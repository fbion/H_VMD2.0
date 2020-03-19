Ext.define("vmd.ux.Dd2", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.DataCs$1.0$DataCs"]),
    version: "1.0",
    xtype: "vmd.ux.Dd2",
    title: "Panel",
    header: false,
    border: false,
    width: 800,
    height: 500,
    layout: "border",
    uxrequirecss: "[\"components/ux/datacs/1.0/css/iconfont.css\"]",
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

        function button_click(sender, e) {
            hwDataCs.setValue('8200', '8260', '8265', 'detail2')
        }

        function button1_click(sender, e) {
            alert(hwDataCs.getValue('province'));
        }

        function report_afterrender(render) {
            report.query();
        }
        this.items = [{
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 50,
                region: "center",
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
                    region: "north",
                    isWebEdit: true,
                    listeners: {
                        vmdafterrender: report_afterrender
                    }
                }]
            },
            {
                xtype: "vmd.div",
                id: "div1",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 50,
                region: "east",
                items: [{
                        xtype: "vmd.ux.DataCs",
                        id: "hwDataCs",
                        combwidth: 200,
                        layout: "absolute",
                        x: 20,
                        y: 20,
                        width: 560,
                        height: 190,
                        region: "center"
                    },
                    {
                        xtype: "vmd.button",
                        id: "button1",
                        text: "button",
                        type: "(none)",
                        size: "small",
                        x: 210,
                        y: 250,
                        click: "button1_click",
                        region: "east",
                        listeners: {
                            click: button1_click
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button",
                        text: "button",
                        type: "(none)",
                        size: "small",
                        x: 90,
                        y: 250,
                        click: "button_click",
                        height: 30,
                        region: "west",
                        listeners: {
                            click: button_click
                        }
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.Dd2");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Dd2");
    }
})