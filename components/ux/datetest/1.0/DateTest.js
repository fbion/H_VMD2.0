Ext.define('vmd.ux.dateTest.Controller', {
    xtype: 'vmd.ux.dateTest.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.DateTest", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DateTest",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 348,
    height: 39,
    layout: "hbox",
    jsrqlabel: "终止日期:",
    ksrqlabel: "起始日期:",
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
        this.items = [{
                xtype: "label",
                id: "label",
                text: this.ksrqlabel,
                x: 40,
                y: 80
            },
            {
                xtype: "datefield",
                id: "hwDate",
                format: "Y-m-d",
                showToday: true,
                allowBlank: true,
                x: 90,
                y: 80
            },
            {
                xtype: "label",
                id: "label1",
                text: this.jsrqlabel,
                x: 40,
                y: 80
            },
            {
                xtype: "datefield",
                id: "hwDate1",
                format: "Y-m-d",
                showToday: true,
                allowBlank: true,
                x: 90,
                y: 80
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getKsrqValue = function() {
            //直接填写方法内容
            return hwDate.getValue(true)
        }
        this.getJsrqValue = function() {
            //直接填写方法内容
            return hwDate1.getValue(true);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DateTest");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DateTest");
    }
})