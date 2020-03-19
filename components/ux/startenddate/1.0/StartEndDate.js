Ext.define("vmd.ux.StartEndDate", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.StartEndDate",
    layoutConfig: {
        align: "middle"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 600,
    height: 52,
    layout: "hbox",
    startText: "开始日期：",
    endText: "结束日期：",
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

        function hwDate_change(sender, newValue, oldValue) {
            page.fireEvent("startChanged", sender, newValue, oldValue)
        }

        function hwDate1_change(sender, newValue, oldValue) {
            page.fireEvent("endChanged", sender, newValue, oldValue)
        }
        this.items = [{
                xtype: "label",
                id: "label",
                text: this.startText,
                x: 20,
                y: 30
            },
            {
                xtype: "datefield",
                id: "hwDate",
                format: "Y-m-d",
                showToday: true,
                allowBlank: true,
                x: 70,
                y: 40,
                flex: 1,
                change: "hwDate_change",
                listeners: {
                    change: hwDate_change
                }
            },
            {
                xtype: "label",
                id: "label1",
                text: this.endText,
                x: 200,
                y: 40
            },
            {
                xtype: "datefield",
                id: "hwDate1",
                format: "Y-m-d",
                showToday: true,
                allowBlank: true,
                x: 260,
                y: 60,
                flex: 1,
                change: "hwDate1_change",
                listeners: {
                    change: hwDate1_change
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getStartValue = function() {
            //直接填写方法内容
            return hwDate.getValue(true)
        }
        this.getEndValue = function() {
            //直接填写方法内容
            return hwDate1.getValue(true)
        }
        this.setStartValue = function(value) {
            //直接填写方法内容
            hwDate.setValue(value)
        }
        this.setEndValue = function(value) {
            //直接填写方法内容
            hwDate1.setValue(value)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.StartEndDate");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.StartEndDate");
    }
})