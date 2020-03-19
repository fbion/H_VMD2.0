undefined
Ext.define("vmd.ux.NumberType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.NumberType",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 621,
    layout: "absolute",
    afterrender: "NumberType_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.NumberType_afterrender(this)
        }
    },
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

        function decimalPoints_afterrender(sender) {
            sz_decimalPoints.setValue("0")
        }

        function div_click(sender, e) {
            sz_decimalPoints.setValue(parseFloat(sz_decimalPoints.getValue()) + 1)
            page.fireEvent("szDecimalChanged", sz_decimalPoints, sz_decimalPoints.value, "szd")
        }

        function div1_click(sender, e) {
            if (parseFloat(sz_decimalPoints.getValue()) <= 1) {
                sz_decimalPoints.setValue("0")
                page.fireEvent("szDecimalChanged", sz_decimalPoints, sz_decimalPoints.value, "szd")
            } else {
                sz_decimalPoints.setValue(parseFloat(sz_decimalPoints.getValue()) - 1)
                page.fireEvent("szDecimalChanged", sz_decimalPoints, sz_decimalPoints.value, "szd")
            }
        }

        function allowEmpty_check(sender, checked) {
            if (sz_allowEmpty.checked) {
                sz_emptyAlert.hide()
                aa.hide()
                sz_emptyAlert.setValue('')
                sz_emptyAlert.fireEvent("change", sz_emptyAlert, "")
            } else {
                sz_emptyAlert.show()
                aa.show()
            }
        }

        function allowFloat_check(sender, checked) {
            if (sz_allowFloat.checked) {
                sz_decimalPoints.show()
                bb.show()
                div.show()
                div1.show()
            } else {
                sz_decimalPoints.hide()
                div.hide()
                div1.hide()
                bb.hide()
                sz_decimalPoints.setValue(0)
                sz_decimalPoints.fireEvent("change", sz_decimalPoints, 0)
            }
        }

        function NumberType_afterrender(sender) {}

        function sz_max_check(sender, checked) {
            if (checked) {
                sz_maxValue.show()
            } else {
                sz_maxValue.hide()
            }
        }

        function sz_min_check(sender, checked) {
            if (checked) {
                sz_minValue.show()
            } else {
                sz_minValue.hide()
            }
        }
        this.NumberType_afterrender = NumberType_afterrender;
        this.items = [{
                xtype: "checkbox",
                id: "sz_allowEdit",
                fieldLabel: "Checkbox",
                boxLabel: "允许编辑",
                x: 10,
                y: 10,
                checked: true
            },
            {
                xtype: "checkbox",
                id: "sz_allowPrint",
                fieldLabel: "Checkbox",
                boxLabel: "允许打印",
                x: 10,
                y: 40,
                checked: true
            },
            {
                xtype: "checkbox",
                id: "sz_allowFloat",
                fieldLabel: "Checkbox",
                boxLabel: "允许小数",
                x: 10,
                y: 130,
                checked: true,
                check: "allowFloat_check",
                listeners: {
                    check: allowFloat_check
                }
            },
            {
                xtype: "checkbox",
                id: "sz_allowEmpty",
                fieldLabel: "Checkbox",
                boxLabel: "允许为空",
                x: 10,
                y: 100,
                checked: true,
                check: "allowEmpty_check",
                listeners: {
                    check: allowEmpty_check
                }
            },
            {
                xtype: "label",
                id: "label",
                text: "校验",
                x: 10,
                y: 70
            },
            {
                xtype: "label",
                id: "label1",
                text: "——————————————————",
                x: 40,
                y: 70,
                width: 270,
                style: "color: #dddddd"
            },
            {
                xtype: "checkbox",
                id: "sz_allowNegative",
                fieldLabel: "Checkbox",
                boxLabel: "允许负数",
                x: 10,
                y: 160,
                checked: true
            },
            {
                xtype: "checkbox",
                id: "sz_max",
                fieldLabel: "Checkbox",
                boxLabel: "最大值",
                x: 10,
                y: 190,
                check: "sz_max_check",
                listeners: {
                    check: sz_max_check
                }
            },
            {
                xtype: "checkbox",
                id: "sz_min",
                fieldLabel: "Checkbox",
                boxLabel: "最小值",
                x: 10,
                y: 220,
                check: "sz_min_check",
                listeners: {
                    check: sz_min_check
                }
            },
            {
                xtype: "checkbox",
                id: "sz_limit",
                fieldLabel: "Checkbox",
                boxLabel: "限制位数",
                x: 10,
                y: 250
            },
            {
                xtype: "label",
                id: "aa",
                text: "提示信息：",
                x: 100,
                y: 104,
                hidden: true
            },
            {
                xtype: "textfield",
                id: "sz_emptyAlert",
                allowBlank: true,
                enableKeyEvents: true,
                x: 160,
                y: 100,
                style: "border: 1px solid #dddddd",
                disabled: false,
                width: 100,
                height: 24,
                hidden: true
            },
            {
                xtype: "numberfield",
                id: "sz_decimalPoints",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 160,
                y: 130,
                style: "border: 1px solid #dddddd",
                afterrender: "decimalPoints_afterrender",
                width: 100,
                height: 24,
                listeners: {
                    vmdafterrender: decimalPoints_afterrender
                }
            },
            {
                xtype: "label",
                id: "bb",
                text: "小数位数：",
                x: 100,
                y: 133.5
            },
            {
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 30,
                height: 15,
                x: 240,
                y: 128,
                html: "<img src=\"/system/img/report/border/上.png\" />",
                style: "cursor: pointer",
                click: "div_click",
                listeners: {
                    click: div_click
                }
            },
            {
                xtype: "vmd.div",
                id: "div1",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 30,
                height: 15,
                x: 240,
                y: 140,
                html: "<img src=\"/system/img/report/border/下.png\" />",
                style: "cursor: pointer",
                click: "div1_click",
                listeners: {
                    click: div1_click
                }
            },
            {
                xtype: "numberfield",
                id: "sz_maxValue",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 80,
                y: 190,
                hidden: true
            },
            {
                xtype: "numberfield",
                id: "sz_minValue",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 80,
                y: 220,
                hidden: true
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getInfo = function(att) {
            //直接填写方法内容
            var temp;
            if (att == "sz_allowEdit") {
                temp = sz_allowEdit.getValue()
            } else if (att == "sz_allowEmpty") {
                temp = sz_allowEmpty.getValue()
            } else if (att == "sz_allowPrint") {
                temp = sz_allowPrint.getValue()
            } else if (att == "sz_allowFloat") {
                temp = sz_allowFloat.getValue()
            } else if (att == "sz_allowNegative") {
                temp = sz_allowNegative.getValue()
            } else if (att == "sz_max") {
                temp = sz_max.getValue()
            } else if (att == "sz_min") {
                temp = sz_min.getValue()
            } else if (att == "sz_limit") {
                temp = sz_limit.getValue()
            } else if (att == "sz_decimalPoints") {
                temp = sz_decimalPoints.getValue()
            } else if (att == "sz_emptyAlert") {
                temp = sz_emptyAlert.getValue()
            }
            return temp
        }
        this.setInfo = function(info, cell) {
            if (info) {
                sz_allowEdit.setValue(info.sz_allowEdit.checked)
                sz_allowPrint.setValue(info.sz_allowPrint.checked)
                sz_allowEmpty.setValue(info.sz_allowEmpty.checked)
                sz_allowFloat.setValue(info.sz_allowFloat.checked)
                sz_allowNegative.setValue(info.sz_allowNegative.checked)
                sz_max.setValue(info.sz_max.checked)
                sz_min.setValue(info.sz_min.checked)
                sz_limit.setValue(info.sz_limit.checked)
                sz_decimalPoints.setValue(info.sz_decimalPoints.value)
                sz_emptyAlert.setValue(info.sz_emptyAlert.value)
                // sz_maxValue.setValue(info.sz_maxValue && info.sz_maxValue.value)
                // sz_minValue.setValue(info.sz_minValue && info.sz_minValue.value)
            }
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.NumberType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.NumberType");
    }
})