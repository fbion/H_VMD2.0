undefined
Ext.define("vmd.ux.DateGroup", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DateGroup",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "时间：",
    header: false,
    border: false,
    width: 425,
    height: 39,
    layout: "hbox",
    symbol: "至",
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
            var ksrq = hwDate_start.getValue(true)
            var jsrq = hwDate_end.getValue(true)
            page.fireEvent("query", button, ksrq, jsrq)
        }
        this.items = [{
                xtype: "label",
                id: "title1",
                text: this.title,
                x: 10,
                y: 14,
                region: "center",
                cls: "font-bold"
            },
            {
                xtype: "datefield",
                id: "hwDate_start",
                format: "Y-m-d",
                showToday: true,
                allowBlank: true,
                x: 50,
                y: 10,
                region: "west",
                hideTrigger: true,
                defaultValue: this.kssj
            },
            {
                xtype: "label",
                id: "title2",
                text: this.symbol,
                x: 160,
                y: 14,
                region: "east",
                cls: "font-bold"
            },
            {
                xtype: "datefield",
                id: "hwDate_end",
                format: "Y-m-d",
                showToday: true,
                allowBlank: true,
                x: 180,
                y: 10,
                region: "north",
                hideTrigger: true,
                margins: "",
                defaultValue: this.jssj
            },
            {
                xtype: "vmd.button",
                id: "button",
                text: "查询",
                type: "(none)",
                size: "small",
                click: "button_click",
                margins: "0 0 0 10",
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
        this.kssj_setValue = function(value) {
            //直接填写方法内容
            hwDate_start.setValue(value);
        }
        this.jssj_setValue = function(value) {
            //直接填写方法内容
            hwDate_end.setValue(value);
        }
        this.kssj_getValue = function() {
            //直接填写方法内容
            return hwDate_start.getValue(true);
        }
        this.jssj_getValue = function() {
            //直接填写方法内容
            return hwDate_end.getValue(true);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DateGroup");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DateGroup");
    }
})