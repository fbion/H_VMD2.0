undefined
Ext.define("vmd.ux.RadioButtonType", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.RadioButtonType",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 290,
    height: 621,
    layout: "absolute",
    uxCss: ".b{    border: 1px solid #dddddd}",
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
        try {
            var page = this;

            function displayRows_afterrender(sender) {
                dxan_displayRows.setValue("0")
            }

            function rowMargin_afterrender(sender) {
                dxan_rowMargin.setValue("0")
            }

            function div_click(sender, e) {
                dxan_displayRows.setValue(parseFloat(dxan_displayRows.getValue()) + 1)
                page.fireEvent("rbDecimalChanged", dxan_displayRows, dxan_displayRows.value, "dxanrow")
            }

            function div1_click(sender, e) {
                if (parseFloat(dxan_displayRows.getValue()) <= 1) {
                    dxan_displayRows.setValue("0")
                    page.fireEvent("rbDecimalChanged", dxan_displayRows, dxan_displayRows.value, "dxanrow")
                } else {
                    dxan_displayRows.setValue(parseFloat(dxan_displayRows.getValue()) - 1)
                    page.fireEvent("rbDecimalChanged", dxan_displayRows, dxan_displayRows.value, "dxanrow")
                }
            }

            function div4_click(sender, e) {
                dxan_rowMargin.setValue(parseFloat(dxan_rowMargin.getValue()) + 0.5)
                page.fireEvent("rbDecimalChanged", dxan_rowMargin, dxan_rowMargin.value, "dxanmargin")
            }

            function div5_click(sender, e) {
                dxan_rowMargin.setValue(parseFloat(dxan_rowMargin.getValue()) - 0.5)
                page.fireEvent("rbDecimalChanged", dxan_rowMargin, dxan_rowMargin.value, "dxanmargin")
            }

            function auto_check(sender, checked) {
                if (dxan_auto.checked) {
                    label1.hide()
                    dxan_displayRows.hide()
                    div.hide()
                    div1.hide()
                    dxan_displayRows.setValue(0)
                    dxan_displayRows.fireEvent("change", dxan_displayRows, 0)
                } else {
                    label1.show()
                    dxan_displayRows.show()
                    div.show()
                    div1.show()
                }
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.RadioButtonType',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "checkbox",
                id: "dxan_allowEdit",
                fieldLabel: "Checkbox",
                boxLabel: "允许编辑",
                x: 10,
                y: 10,
                checked: true
            },
            {
                xtype: "checkbox",
                id: "dxan_allowPrint",
                fieldLabel: "Checkbox",
                boxLabel: "允许打印",
                x: 10,
                y: 40,
                checked: true
            },
            {
                xtype: "label",
                id: "label",
                text: "布局：",
                x: 10,
                y: 77
            },
            {
                xtype: "checkbox",
                id: "dxan_auto",
                fieldLabel: "Checkbox",
                boxLabel: "自适应",
                x: 30,
                y: 100,
                check: "auto_check",
                disabled: true,
                listeners: {
                    check: auto_check
                }
            },
            {
                xtype: "label",
                id: "label1",
                text: "展示列数：",
                x: 100,
                y: 104
            },
            {
                xtype: "label",
                id: "label2",
                text: "行间距：",
                x: 30,
                y: 140
            },
            {
                xtype: "label",
                id: "label3",
                text: "展示样式：",
                x: 10,
                y: 170
            },
            {
                xtype: "numberfield",
                id: "dxan_rowMargin",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 80,
                y: 135,
                width: 150,
                style: "border: 1px solid #dddddd",
                afterrender: "rowMargin_afterrender",
                disabled: true,
                listeners: {
                    vmdafterrender: rowMargin_afterrender
                }
            },
            {
                xtype: "numberfield",
                id: "dxan_displayRows",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 170,
                y: 100,
                width: 60,
                style: "border: 1px solid #dddddd",
                afterrender: "displayRows_afterrender",
                disabled: true,
                listeners: {
                    vmdafterrender: displayRows_afterrender
                }
            },
            {
                xtype: "radiostoregroup",
                id: "dxan_displayType",
                width: 200,
                height: 40,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "myRadio",
                x: 30,
                y: 190,
                items: [{
                        xtype: "radio",
                        id: "hwRadio",
                        boxLabel: "圆型",
                        width: 65,
                        inputValue: "round",
                        checked: true
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio1",
                        boxLabel: "方型",
                        inputValue: "square",
                        disabled: true
                    }
                ]
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
                x: 213,
                y: 100,
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
                x: 213,
                y: 110,
                html: "<img src=\"/system/img/report/border/下.png\" />",
                style: "cursor: pointer",
                click: "div1_click",
                listeners: {
                    click: div1_click
                }
            },
            {
                xtype: "vmd.div",
                id: "div4",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 30,
                height: 15,
                x: 213,
                y: 135,
                html: "<img src=\"/system/img/report/border/上.png\" />",
                style: "cursor: pointer",
                click: "div4_click",
                listeners: {
                    click: div4_click
                }
            },
            {
                xtype: "vmd.div",
                id: "div5",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 30,
                height: 15,
                x: 213,
                y: 145,
                html: "<img src=\"/system/img/report/border/下.png\" />",
                style: "cursor: pointer",
                click: "div5_click",
                listeners: {
                    click: div5_click
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getInfo = function(att) {
            var temp;
            if (att == "dxan_allowEdit") {
                temp = dxan_allowEdit.getValue()
            } else if (att == "dxan_allowPrint") {
                temp = dxan_allowPrint.getValue()
            } else if (att == "dxan_auto") {
                temp = dxan_auto.getValue()
            } else if (att == "dxan_displayRows") {
                temp = dxan_displayRows.getValue()
            } else if (att == "dxan_rowMargin") {
                temp = dxan_rowMargin.getValue()
            } else if (att == "dxan_displayType") {
                temp = dxan_displayType.getValue()
            }
            return temp
        }
        this.setInfo = function(info, cell) {
            if (info) {
                dxan_allowEdit.setValue(info.dxan_allowEdit.checked)
                dxan_allowPrint.setValue(info.dxan_allowPrint.checked)
                dxan_auto.setValue(info.dxan_auto.checked)
                dxan_displayRows.setValue(info.dxan_displayRows.value)
                dxan_rowMargin.setValue(info.dxan_rowMargin.value)
                if (info.dxan_displayType.value && info.dxan_displayType.value.inputValue) {
                    dxan_displayType.setValue(info.dxan_displayType.value.inputValue);
                } else {
                    dxan_displayType.setValue(info.dxan_displayType.value);
                }
            }
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.RadioButtonType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.RadioButtonType");
    }
})