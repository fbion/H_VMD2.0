Ext.define('vmd.ux.dropDownGridType.Controller', {
    xtype: 'vmd.ux.dropDownGridType.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.DropDownGridType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DropDownGridType",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 621,
    layout: "absolute",
    beforerender: "DropDownGridType_beforerender",
    afterrender: "DropDownGridType_afterrender",
    listeners: {
        beforerender: function() {
            this.DropDownGridType_beforerender(this)
        },
        vmdafterrender: function() {
            this.DropDownGridType_afterrender(this)
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
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var data = [{
            value: 'comma',
            name: '逗号'
        }, {
            value: 'semicolon',
            name: '分号'
        }, {
            value: 'number',
            name: '顿号'
        }]
        store.loadData(data)

        function myWidth_afterrender(sender) {
            ddg_myWidth.setValue("100.00")
        }

        function div_click(sender, e) {
            if (parseFloat(ddg_myWidth.getValue()) == 100) {} else {
                ddg_myWidth.setValue(parseFloat(ddg_myWidth.getValue()) + 10)
                page.fireEvent("comboDecimalChanged", ddg_myWidth, ddg_myWidth.value, "ddgw")
            }
        }
        // if(parseFloat(myWidth.getValue())==0)
        function div1_click(sender, e) {
            if (parseFloat(ddg_myWidth.getValue()) == 0) {} else {
                ddg_myWidth.setValue(parseFloat(ddg_myWidth.getValue()) - 10)
                page.fireEvent("comboDecimalChanged", ddg_myWidth, ddg_myWidth.value, "ddgw")
            }
        }

        function allowEmpty_check(sender, checked) {
            if (checked) {
                ddg_emptyAlert.hide()
                aa.hide()
                ddg_emptyAlert.setValue("")
                page.fireEvent("change", ddg_emptyAlert, "")
            } else {
                ddg_emptyAlert.show()
                aa.show()
            }
        }

        function setInfo(info) {
            if (info && info[0]) {
                ddg_allowEdit.setValue(info[0].ddg_allowEdit.checked)
                ddg_allowPrint.setValue(info[0].ddg_allowPrint.checked)
                ddg_myWidth.setValue(info[0].ddg_myWidth.value)
                ddg_allowEmpty.setValue(info[0].ddg_allowEmpty.checked)
                ddg_emptyAlert.setValue(info[0].ddg_emptyAlert.value)
                ddg_separator.setValue(info[0].ddg_separator.value)
                ddg_multi.setValue(info[0].ddg_multi.checked)
                if (info[0].ddg_multi.checked) {
                    label4.show()
                    ddg_separator.show()
                } else {
                    label4.hide()
                    ddg_separator.hide()
                }
                ddg_height.setValue(info[0].ddg_height.value)
            } else if (info) {
                ddg_height.setValue(info.ddg_height.value)
                ddg_allowEdit.setValue(info.ddg_allowEdit.checked)
                ddg_allowPrint.setValue(info.ddg_allowPrint.checked)
                ddg_myWidth.setValue(info.ddg_myWidth.value)
                ddg_allowEmpty.setValue(info.ddg_allowEmpty.checked)
                ddg_emptyAlert.setValue(info.ddg_emptyAlert.value)
                ddg_separator.setValue(info.ddg_separator.value)
                ddg_multi.setValue(info.ddg_multi.checked)
                if (info.ddg_multi.checked) {
                    label4.show()
                    ddg_separator.show()
                } else {
                    label4.hide()
                    ddg_separator.hide()
                }
            }
        }

        function DropDownGridType_beforerender(sender) {}

        function hwCheckbox_check(sender, checked) {
            if (checked) {
                label4.show()
                ddg_separator.show()
            } else {
                label4.hide()
                ddg_separator.hide()
            }
        }

        function DropDownGridType_afterrender(sender) {}
        this.DropDownGridType_afterrender = DropDownGridType_afterrender;
        this.DropDownGridType_beforerender = DropDownGridType_beforerender;
        this.items = [{
                xtype: "checkbox",
                id: "ddg_allowEdit",
                fieldLabel: "Checkbox",
                boxLabel: "允许编辑",
                x: 10,
                y: 10,
                checked: true
            },
            {
                xtype: "checkbox",
                id: "ddg_allowPrint",
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
                y: 105
            },
            {
                xtype: "numberfield",
                id: "ddg_myWidth",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 45,
                y: 105,
                width: 55,
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
                x: 105,
                y: 110,
                width: 20,
                height: 20
            },
            {
                xtype: "label",
                id: "label2",
                text: "校验",
                x: 10,
                y: 165
            },
            {
                xtype: "label",
                id: "label3",
                text: "————————————————",
                x: 40,
                y: 165,
                style: "color: #dddddd",
                height: 20
            },
            {
                xtype: "checkbox",
                id: "ddg_allowEmpty",
                fieldLabel: "Checkbox",
                boxLabel: "允许为空",
                x: 10,
                y: 190,
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
                y: 220,
                hidden: true
            },
            {
                xtype: "textfield",
                id: "ddg_emptyAlert",
                allowBlank: true,
                enableKeyEvents: true,
                x: 70,
                y: 215,
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
                y: 105,
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
                y: 115,
                style: "cursor: pointer",
                html: "<img src=\"/system/img/report/border/下.png\" />",
                click: "div1_click",
                listeners: {
                    click: div1_click
                }
            },
            {
                xtype: "label",
                id: "label4",
                text: "分隔符：",
                x: 65,
                y: 75,
                hidden: true
            },
            {
                xtype: "checkbox",
                id: "ddg_multi",
                fieldLabel: "Checkbox",
                boxLabel: "多选",
                x: 10,
                y: 70,
                check: "hwCheckbox_check",
                listeners: {
                    check: hwCheckbox_check
                }
            },
            {
                xtype: "textfield",
                id: "ddg_separator",
                allowBlank: true,
                enableKeyEvents: true,
                x: 115,
                y: 70,
                style: "border: 1px solid #ddd",
                hidden: true
            },
            {
                xtype: "label",
                id: "label5",
                text: "高度：",
                x: 10,
                y: 135
            },
            {
                xtype: "numberfield",
                id: "ddg_height",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 45,
                y: 135,
                width: 55,
                style: "border: 1px solid #dddddd",
                afterrender: "myWidth_afterrender",
                height: 22,
                listeners: {
                    vmdafterrender: myWidth_afterrender
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info) {
            setInfo(info)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DropDownGridType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DropDownGridType");
    }
})