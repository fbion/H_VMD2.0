undefined
Ext.define("vmd.ux.BX", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.JH$1.0$JH"]),
    version: "1.0",
    xtype: "vmd.ux.BX",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 190,
    height: 34,
    layout: "hbox",
    beforerender: "BX_beforerender",
    panelName: "33",
    bindCmp: "TestProMode",
    bindCmpVersion: "1.0",
    listeners: {
        beforerender: function() {
            try {
                this.BX_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.BX'
                }, ex, 50);
            }
        }
    },
    uxrequirecss: "[\"components/ux/datepicker/1.0/css/datepicker.css?ver=vmd2.0.5.200306\"]",
    uxrequirejs: "[\"components/ux/datepicker/1.0/js/moment.min.js?ver=vmd2.0.5.200306\",\"components/ux/datepicker/1.0/js/datepicker.js?ver=vmd2.0.5.200306\"]",
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
            function BX_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.BX',
                p2: ex.message
            }, ex, 100);
        }
        this.BX_beforerender = BX_beforerender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "泵型:"
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                width: 150
            },
            {
                xtype: "vmd.ux.JH",
                id: "JH",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                layout: "hbox"
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.BX");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.BX");
    }
})