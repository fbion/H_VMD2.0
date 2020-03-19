Ext.define("vmd.ux.TestProMode", {
    extend: "vmd.base.UxPropertySettings",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.TestProMode",
    title: "Panel",
    header: false,
    border: false,
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
                p1: 'vmd.ux.TestProMode',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "vmd.button",
                id: "button",
                text: "button",
                type: "(none)",
                size: "small",
                x: 70,
                y: 120
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                width: 150,
                x: 160,
                y: 140
            },
            {
                xtype: "radio",
                id: "hwRadio",
                fieldLabel: "Radio",
                boxLabel: "boxLabel",
                x: 70,
                y: 210
            },
            {
                xtype: "radiostoregroup",
                id: "hwRadioGroup",
                width: 200,
                height: 40,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "myRadio",
                x: 220,
                y: 210,
                items: [{
                        xtype: "radio",
                        id: "hwRadio1",
                        boxLabel: "boxLabel"
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio2",
                        boxLabel: "boxLabel"
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.TestProMode");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TestProMode");
    }
})