Ext.define('vmd.ux.dateTest1.Controller', {
    xtype: 'vmd.ux.dateTest1.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.DateTest1", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DateTest1",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 337,
    height: 33,
    layout: "hbox",
    ksrqlabel: "起始日期:",
    jsrqlabel: "结束日期:",
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
                p1: 'vmd.ux.DateTest1',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "label",
                id: "hwLabel",
                text: this.ksrqlabel,
                x: 40,
                y: 60
            },
            {
                xtype: "datefield",
                id: "hwDate",
                format: "Y-m-d",
                showToday: true,
                allowBlank: true,
                x: 90,
                y: 60
            },
            {
                xtype: "label",
                id: "hwLabel1",
                text: this.jsrqlabel,
                x: 210,
                y: 60
            },
            {
                xtype: "datefield",
                id: "hwDate1",
                format: "Y-m-d",
                showToday: true,
                allowBlank: true,
                x: 270,
                y: 60
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getKsrqValue = function() {
            //直接填写方法内容
            return hwDate.getValue(true);
        }
        this.getJsrqValue = function() {
            //直接填写方法内容
            return hwDate1.getValue(true)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DateTest1");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DateTest1");
    }
})