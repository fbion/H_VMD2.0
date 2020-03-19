Ext.define("vmd.ux.Csection", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Csection",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 303,
    height: 45,
    layout: "hbox",
    label: "单位名称：",
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
        if (Ext.isString(this.data2)) this.data2 = new Ext.data.JsonStore()
        try {
            var page = this;

            function button_click(sender, e) {
                page.fireEvent('click', button, combo.getValue())
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.Csection',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "label",
                id: "hwLabel",
                text: this.label
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                width: 150,
                margins: "0 10",
                store: this.data,
                displayField: this.xsz,
                valueField: this.sjz,
                firstSelected: this.mrdyx,
                Multi: this.dx
            },
            {
                xtype: "vmd.button",
                id: "button",
                text: "查询",
                type: "(none)",
                size: "small",
                click: "button_click",
                listeners: {
                    click: button_click
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setvalue = function() {
            //直接填写方法内容
            return combo.setValue();
        }
        this.getvalue = function() {
            //直接填写方法内容
            return combo.getValue();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.Csection");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Csection");
    }
})