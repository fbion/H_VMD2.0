Ext.define("vmd.ux.PageChecks", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.PageChecks",
    title: "Panel",
    header: false,
    border: false,
    width: 26,
    height: 26,
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
        var me = this;
        var i = 1;
        var currentValue = 1;
        // function set_MaxVal(maxval)
        // {
        //     var curval=hwNumber_lb.getValue();
        //     if(curval>maxval)
        //     {
        //         alert("已超出最大页数！请重新选择！");
        //         return;
        //     }
        // }
        function set_sign(sign) {
            i = sign;
        }
        //轮播加
        function btn_lb_up_click(sender) {
            i = hwNumber_lb.getValue();
            i++;
            hwNumber_lb.setValue(i);
            currentValue = hwNumber_lb.getValue();
            // me.fireEvent("chaxun", sender,currentValue);
        }
        //轮播减
        function btn_lb_down_click(sender) {
            if (hwNumber_lb.getValue() <= 1) {
                return;
            } else {
                i = hwNumber_lb.getValue();
                i--;
                hwNumber_lb.setValue(i);
            }
            currentValue = hwNumber_lb.getValue()
        }
        //设置 控件的初始值
        function hwNumber_lb_afterrender(sender) {
            hwNumber_lb.setValue("1");
        }
        this.items = [{
            xtype: "vmd.div",
            id: "div",
            autoEl: "div",
            border: true,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 25,
            height: 26,
            layout: "absolute",
            style: "font-family: '微软雅黑'；",
            items: [{
                xtype: "numberfield",
                id: "hwNumber_lb",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                maxText: "10000",
                maxValue: 10000,
                minText: "1",
                minValue: 1,
                width: 23,
                afterrender: "hwNumber_lb_afterrender",
                listeners: {
                    vmdafterrender: hwNumber_lb_afterrender
                }
            }]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.PageChecks");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.PageChecks");
    }
})