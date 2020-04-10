Ext.define('vmd.ux.dateTestCheck.Controller', {
    xtype: 'vmd.ux.dateTestCheck.Controller',
    constructor: function(options) {},
    ksrqnotjsrq: function() {},
})
Ext.define("vmd.ux.DateTestCheck", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DateTestCheck",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 800,
    height: 76,
    layout: "hbox",
    text: "button",
    uxrequirecss: "[\"components/ux/datetestcheck/1.0/css/button.css\"]",
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
        try {
            var page = this;
            var controller = new vmd.ux.dateTestCheck.Controller()

            function button_click(sender, e) {
                if (controller.ksrqnotjsrq()) {
                    var ksrq = hwDateTest1.getKsrqValue();
                    var jsrq = hwDateTest1.getJsrqValue();
                    page.fireEvent('queryclick', sender, ksrq, jsrq)
                }
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.DateTestCheck',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "vmd.button",
                id: "button",
                text: this.text,
                type: "(none)",
                size: "small",
                click: "button_click",
                cls: "vmddatetest",
                listeners: {
                    click: button_click
                }
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                width: 150,
                store: this.store,
                displayField: this.displayfield,
                valueField: this.valuefiled
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.DateTestCheck");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DateTestCheck");
    }
})