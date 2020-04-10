undefined
Ext.define("vmd.ux.JH", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.DatePicker$1.0$DatePicker"]),
    version: "1.0",
    xtype: "vmd.ux.JH",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 190,
    height: 162,
    layout: "hbox",
    afterrender: "JH_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.JH_afterrender(this)
        }
    },
    uxrequirecss: "[\"components/ux/datepicker/1.0/css/datepicker.css\"]",
    uxrequirejs: "[\"components/ux/datepicker/1.0/js/moment.min.js\",\"components/ux/datepicker/1.0/js/datepicker.js\"]",
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

        function JH_afterrender(sender) {
            
        }
        this.JH_afterrender = JH_afterrender;
        this.items = [{
            xtype: "tabpanel",
            id: "hwMyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            items: [{
                    xtype: "panel",
                    id: "panel",
                    title: "Tab1",
                    header: true,
                    border: true,
                    height: 100,
                    items: [{
                            xtype: "label",
                            id: "label",
                            text: "井号:"
                        },
                        {
                            xtype: "vmd.combo",
                            id: "combo",
                            width: 150
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "Tab2",
                    header: true,
                    border: true,
                    height: 100,
                    items: [{
                        xtype: "vmd.ux.DatePicker",
                        id: "hwDatePicker",
                        layout: "auto"
                    }]
                },
                {
                    xtype: "panel",
                    id: "panel2",
                    title: "Tab3",
                    header: true,
                    border: true,
                    height: 100
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.JH");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.JH");
    }
})