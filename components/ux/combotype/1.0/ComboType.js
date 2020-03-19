Ext.define('vmd.ux.comboType.Controller', {
    xtype: 'vmd.ux.comboType.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ComboType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ComboType",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 621,
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
        var page = this;
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'id']
        });
        // semicolon comma  number
        var data = [{
            name: '分号',
            id: 'semicolon'
        }, {
            name: '逗号',
            id: 'comma'
        }, {
            name: '顿号',
            id: 'number'
        }];
        store.loadData(data);

        function myWidth_afterrender(sender) {
            xlk_myWidth.setValue("100.00")
        }

        function div_click(sender, e) {
            if (parseFloat(xlk_myWidth.getValue()) == 100) {} else {
                xlk_myWidth.setValue(parseFloat(xlk_myWidth.getValue()) + 10)
                page.fireEvent("comboDecimalChanged", xlk_myWidth, xlk_myWidth.value, "xlkw")
            }
        }

        function div1_click(sender, e) {
            if (parseFloat(xlk_myWidth.getValue()) == 0) {} else {
                xlk_myWidth.setValue(parseFloat(xlk_myWidth.getValue()) - 10)
                page.fireEvent("comboDecimalChanged", xlk_myWidth, xlk_myWidth.value, "xlkw")
            }
        }

        function allowEmpty_check(sender, checked) {
            if (checked) {
                xlk_emptyAlert.hide()
                aa.hide()
                xlk_emptyAlert.setValue("")
                page.fireEvent("change", xlk_emptyAlert, "")
            } else {
                xlk_emptyAlert.show()
                aa.show()
            }
        }

        function xlk_ismulti_check(sender, checked) {
            if (checked) {
                label4.show()
                xlk_separator.show()
            } else {
                label4.hide()
                xlk_separator.hide()
            }
        }

        function setInfo(info, cell) {
            if (info) {
                xlk_ismulti.setValue(info.xlk_ismulti.checked)
                xlk_separator.setValue(info.xlk_separator.value)
                xlk_allowEdit.setValue(info.xlk_allowEdit.checked)
                xlk_allowPrint.setValue(info.xlk_allowPrint.checked)
                xlk_myWidth.setValue(info.xlk_myWidth.value)
                xlk_allowEmpty.setValue(info.xlk_allowEmpty.checked)
                xlk_emptyAlert.setValue(info.xlk_emptyAlert.value)
                noValueClear.setValue(info.noValueClear.checked)
                xlk_height.setValue(info.xlk_height.value)
            }
        }

        function xlk_height_afterrender(sender) {
            sender.setValue(250)
        }
        this.items = [{
                xtype: "checkbox",
                id: "xlk_allowEdit",
                fieldLabel: "Checkbox",
                boxLabel: "允许编辑",
                x: 10,
                y: 10,
                checked: true
            },
            {
                xtype: "checkbox",
                id: "xlk_allowPrint",
                fieldLabel: "Checkbox",
                boxLabel: "允许打印",
                x: 10,
                y: 40,
                checked: true
            },
            {
                xtype: "label",
                id: "label",
                text: "宽度：",
                x: 10,
                y: 70
            },
            {
                xtype: "numberfield",
                id: "xlk_myWidth",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 50,
                y: 70,
                width: 50,
                style: "border: 1px solid #dddddd",
                afterrender: "myWidth_afterrender",
                height: 22,
                listeners: {
                    vmdafterrender: myWidth_afterrender
                }
            },
            {
                xtype: "label",
                id: "label1",
                text: "%",
                x: 100,
                y: 75,
                width: 25
            },
            {
                xtype: "label",
                id: "label2",
                text: "校验",
                x: 10,
                y: 190
            },
            {
                xtype: "label",
                id: "label3",
                text: "————————————————",
                x: 40,
                y: 190,
                style: "color: #dddddd"
            },
            {
                xtype: "checkbox",
                id: "xlk_allowEmpty",
                fieldLabel: "Checkbox",
                boxLabel: "允许为空",
                x: 10,
                y: 215,
                checked: true,
                check: "allowEmpty_check",
                listeners: {
                    check: allowEmpty_check
                }
            },
            {
                xtype: "label",
                id: "aa",
                text: "提示信息：",
                x: 10,
                y: 245,
                hidden: true,
                height: 20
            },
            {
                xtype: "textfield",
                id: "xlk_emptyAlert",
                allowBlank: true,
                enableKeyEvents: true,
                x: 70,
                y: 240,
                style: "border: 1px solid #dddddd",
                disabled: false,
                hidden: true
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
                x: 85,
                y: 68,
                style: "cursor: pointer",
                html: "<img src=\"/system/img/report/border/上.png\" />",
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
                x: 85,
                y: 78,
                style: "cursor: pointer",
                html: "<img src=\"/system/img/report/border/下.png\" />",
                click: "div1_click",
                listeners: {
                    click: div1_click
                }
            },
            {
                xtype: "checkbox",
                id: "xlk_ismulti",
                fieldLabel: "Checkbox",
                boxLabel: "多选",
                x: 10,
                y: 130,
                check: "xlk_ismulti_check",
                listeners: {
                    check: xlk_ismulti_check
                }
            },
            {
                xtype: "label",
                id: "label4",
                text: "分隔符：",
                x: 65,
                y: 135,
                hidden: true
            },
            {
                xtype: "checkbox",
                id: "noValueClear",
                fieldLabel: "Checkbox",
                boxLabel: "下拉框无对应值清空",
                x: 10,
                y: 160
            },
            {
                xtype: "textfield",
                id: "xlk_separator",
                allowBlank: true,
                enableKeyEvents: true,
                x: 110,
                y: 130,
                style: "border: 1px solid #ddd",
                hidden: true
            },
            {
                xtype: "label",
                id: "label5",
                text: "高度：",
                x: 10,
                y: 103
            },
            {
                xtype: "numberfield",
                id: "xlk_height",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 50,
                y: 100,
                width: 50,
                style: "border:1px solid #ddd;",
                afterrender: "xlk_height_afterrender",
                listeners: {
                    vmdafterrender: xlk_height_afterrender
                }
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
            if (att == "xlk_allowEdit") {
                temp = xlk_allowEdit.getValue()
            } else if (att == "xlk_allowEmpty") {
                temp = xlk_allowEmpty.getValue()
            } else if (att == "xlk_allowPrint") {
                temp = xlk_allowPrint.getValue()
            } else if (att == "xlk_myWidth") {
                temp = xlk_myWidth.getValue()
            } else if (att == "xlk_multiple") {
                temp = xlk_multiple.getValue()
            } else if (att == "xlk_oneClick") {
                temp = xlk_oneClick.getValue()
            } else if (att == "xlk_emptyAlert") {
                temp = xlk_emptyAlert.getValue()
            }
            return temp
        }
        this.setInfo = function(info, cell) {
            setInfo(info, cell)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ComboType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ComboType");
    }
})