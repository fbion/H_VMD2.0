Ext.define('vmd.ux.dateTest2.Controller', {
    xtype: 'vmd.ux.dateTest2.Controller',
    constructor: function(options) {
        this.param1 = ''
    },
    ksrqnotjsrq: function() {},
    method2: function() {}
})
Ext.define('vmd.ux.dateTest2.Controller2', {
    xtype: 'vmd.ux.dateTest2.Controller2',
    extend: 'vmd.ux.dateTest2.Controller',
    constructor: function(options) {},
    method3: function() {
        this.method2();
    }
})
Ext.define("vmd.ux.DateTest2", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.DateTest$1.0$DateTest"]),
    version: "1.0",
    xtype: "vmd.ux.DateTest2",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 603,
    height: 48,
    layout: "hbox",
    beforerender: "DateTest2_beforerender",
    listeners: {
        beforerender: function() {
            this.DateTest2_beforerender(this)
        }
    },
    text: "button",
    uxrequirecss: "[\"components/ux/datetest2/1.0/css/button.css\"]",
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
        var page = this;

        function button_click(sender, e) {
            //处理自己的业务 逻辑
            var ksrq = hwDateTest.getKsrqValue();
            var jsrq = hwDateTest.getJsrqValue();
            page.fireEvent('queryclick', sender, ksrq, jsrq)
        }

        function DateTest2_beforerender(sender) {}
        this.DateTest2_beforerender = DateTest2_beforerender;
        this.items = [{
                xtype: "vmd.ux.DateTest",
                id: "hwDateTest",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                jsrqlabel: "终止日期:",
                ksrqlabel: "起始日期:",
                layout: "hbox"
            },
            {
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.DateTest2");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DateTest2");
    }
})