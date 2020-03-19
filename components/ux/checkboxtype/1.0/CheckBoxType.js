Ext.define('vmd.ux.checkBoxType.Controller', {
    xtype: 'vmd.ux.checkBoxType.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.CheckBoxType", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.CheckBoxType",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 290,
    height: 621,
    layout: "vbox",
    afterrender: "CheckBoxType_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.CheckBoxType_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.CheckBoxType'
                }, ex, 50);
            }
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
        try {
            var page = this;
            var store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'id']
            });
            var data = [{
                name: '无',
                id: '0'
            }, {
                name: '分号',
                id: '1'
            }, {
                name: '冒号',
                id: '2'
            }, {
                name: '逗号',
                id: '3'
            }];
            store.loadData(data);
            ///////////////////////////////////////////////////
            var store1 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'id']
            });
            var data1 = [{
                name: '无',
                id: '0'
            }, {
                name: '单引号',
                id: '1'
            }, {
                name: '双引号',
                id: '2'
            }];
            store1.loadData(data1);
            ///////////////////////////////////////////////////
            var store2 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'id']
            });
            var data2 = [{
                name: '无',
                id: '0'
            }, {
                name: '单引号',
                id: '1'
            }, {
                name: '双引号',
                id: '2'
            }];
            store2.loadData(data2);
            ///////////////////////////////////////////////////
            function allowEmpty_check(sender, checked) {
                if (fxk_allowEmpty.checked) {
                    fxk_emptyAlert.hide()
                    aaa.hide()
                    fxk_emptyAlert.setValue("")
                    fxk_emptyAlert.fireEvent("change", fxk_emptyAlert, "")
                } else {
                    fxk_emptyAlert.show()
                    aaa.show()
                }
                page.doLayout()
            }

            function mutilGroup_check(sender, checked) {
                // debugger
                if (checked == true) {
                    mutilGroupDiv.show()
                    // a.setPosition(10, 320)
                    // b.setPosition(40, 320)
                    // fxk_allowEmpty.setPosition(10, 350)
                    // fxk_emptyAlert.setPosition(70,380)
                    // aaa.setPosition(10,385)
                } else {
                    mutilGroupDiv.hide()
                    // a.setPosition(10, 100)
                    // b.setPosition(40, 100)
                    // fxk_allowEmpty.setPosition(10, 130)
                    // fxk_emptyAlert.setPosition(70,160)
                    // aaa.setPosition(10,165)
                }
                page.doLayout()
            }

            function displayCol_afterrender(sender) {
                fxk_rowMargin.setValue("0");
                fxk_displayCol.setValue("0")
            }

            function div_click(sender, e) {
                fxk_displayCol.setValue(parseFloat(fxk_displayCol.getValue()) + 1)
                page.fireEvent('checkboxDecimalChanged', fxk_displayCol, fxk_displayCol.value, "cbdc")
            }

            function div3_click(sender, e) {
                fxk_rowMargin.setValue(parseFloat(fxk_rowMargin.getValue()) + 1)
                page.fireEvent('checkboxDecimalChanged', fxk_rowMargin, fxk_rowMargin.value, "cdrm")
            }

            function div1_click(sender, e) {
                if (fxk_displayCol.getValue() <= 1) {
                    fxk_displayCol.setValue("0")
                    page.fireEvent('checkboxDecimalChanged', fxk_displayCol, fxk_displayCol.value, "cbdc")
                } else {
                    fxk_displayCol.setValue(parseFloat(fxk_displayCol.getValue()) - 1)
                    page.fireEvent('checkboxDecimalChanged', fxk_displayCol, fxk_displayCol.value, "cbdc")
                }
            }

            function div2_click(sender, e) {
                fxk_rowMargin.setValue(parseFloat(fxk_rowMargin.getValue()) - 1)
                page.fireEvent('checkboxDecimalChanged', fxk_rowMargin, fxk_rowMargin.value, "cdrm")
            }

            function auto_check(sender, checked) {
                if (checked == true) {
                    fxk_displayCol.hide()
                    aa.hide()
                    zz.hide()
                    xx.hide()
                } else if (checked == false) {
                    fxk_displayCol.show()
                    aa.show()
                    zz.show()
                    xx.show()
                }
            }

            function CheckBoxType_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.CheckBoxType',
                p2: ex.message
            }, ex, 100);
        }
        this.CheckBoxType_afterrender = CheckBoxType_afterrender;
        this.items = [{
                xtype: "checkbox",
                id: "fxk_allowEdit",
                fieldLabel: "Checkbox",
                boxLabel: "允许编辑",
                checked: true,
                margins: "5 0 0 5"
            },
            {
                xtype: "checkbox",
                id: "fxk_allowPrint",
                fieldLabel: "Checkbox",
                boxLabel: "允许打印",
                checked: true,
                margins: "5 0 0 5"
            },
            {
                xtype: "vmd.div",
                id: "div1",
                layoutConfig: {
                    align: "middle",
                    pack: "start"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 27,
                layout: "hbox",
                margins: "5 0 0 5",
                items: [{
                        xtype: "label",
                        id: "label",
                        text: "显示标签："
                    },
                    {
                        xtype: "textfield",
                        id: "fxk_displayLabel",
                        allowBlank: true,
                        enableKeyEvents: true
                    }
                ]
            },
            {
                xtype: "checkbox",
                id: "fxk_mutilGroup",
                fieldLabel: "Checkbox",
                boxLabel: "多组",
                check: "mutilGroup_check",
                margins: "5 0 0 5",
                listeners: {
                    check: mutilGroup_check
                }
            },
            {
                xtype: "vmd.div",
                id: "mutilGroupDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 220,
                layout: "absolute",
                hidden: true,
                disabled: false,
                items: [{
                        xtype: "label",
                        id: "label2",
                        text: "返回值：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "label",
                        id: "label3",
                        text: "分隔符：",
                        x: 20,
                        y: 40
                    },
                    {
                        xtype: "checkbox",
                        id: "fxk_proveAll",
                        fieldLabel: "Checkbox",
                        boxLabel: "提供全选",
                        x: 10,
                        y: 70
                    },
                    {
                        xtype: "checkbox",
                        id: "fxk_proveOther",
                        fieldLabel: "Checkbox",
                        boxLabel: "提供其他项",
                        x: 10,
                        y: 100
                    },
                    {
                        xtype: "label",
                        id: "label6",
                        text: "布局：",
                        x: 10,
                        y: 130
                    },
                    {
                        xtype: "checkbox",
                        id: "fxk_auto",
                        fieldLabel: "Checkbox",
                        boxLabel: "自适应",
                        x: 20,
                        y: 150,
                        check: "auto_check",
                        disabled: true,
                        listeners: {
                            check: auto_check
                        }
                    },
                    {
                        xtype: "label",
                        id: "aa",
                        text: "展示列数：",
                        x: 85,
                        y: 154
                    },
                    {
                        xtype: "numberfield",
                        id: "fxk_displayCol",
                        allowDecimals: true,
                        allowNegative: true,
                        decimalPrecision: 2,
                        allowBlank: true,
                        x: 150,
                        y: 150,
                        width: 80,
                        style: "border:1px solid #dddddd;",
                        afterrender: "displayCol_afterrender",
                        disabled: true,
                        listeners: {
                            vmdafterrender: displayCol_afterrender
                        }
                    },
                    {
                        xtype: "label",
                        id: "label8",
                        text: "行间距：",
                        x: 20,
                        y: 180
                    },
                    {
                        xtype: "numberfield",
                        id: "fxk_rowMargin",
                        allowDecimals: true,
                        allowNegative: true,
                        decimalPrecision: 2,
                        allowBlank: true,
                        x: 70,
                        y: 180,
                        width: 160,
                        style: "border: 1px solid #dddddd",
                        disabled: true
                    },
                    {
                        xtype: "vmd.div",
                        id: "zz",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 230,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div_click",
                        disabled: true,
                        listeners: {
                            click: div_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "xx",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 230,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div1_click",
                        disabled: true,
                        listeners: {
                            click: div1_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div2",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 230,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div2_click",
                        disabled: true,
                        listeners: {
                            click: div2_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div3",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 20,
                        x: 230,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div3_click",
                        disabled: true,
                        listeners: {
                            click: div3_click
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "fxk_separator",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 35,
                        style: "border: 1px solid #ddd"
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
                width: 400,
                height: 17,
                margins: "5 0 0 5",
                items: [{
                        xtype: "label",
                        id: "a",
                        text: "校验",
                        x: 10,
                        y: 100
                    },
                    {
                        xtype: "label",
                        id: "b",
                        text: "——————————————————",
                        x: 40,
                        y: 100,
                        width: 270,
                        height: 20,
                        style: "color:#dddddd;"
                    }
                ]
            },
            {
                xtype: "checkbox",
                id: "fxk_allowEmpty",
                fieldLabel: "Checkbox",
                boxLabel: "允许为空",
                checked: true,
                check: "allowEmpty_check",
                margins: "5 0 0 5",
                listeners: {
                    check: allowEmpty_check
                }
            },
            {
                xtype: "label",
                id: "aaa",
                text: "提示信息：",
                hidden: true,
                margins: "5 0 0 5"
            },
            {
                xtype: "textfield",
                id: "fxk_emptyAlert",
                allowBlank: true,
                enableKeyEvents: true,
                style: "border: 1px solid #dddddd",
                disabled: false,
                hidden: true,
                margins: "5 0 0 10"
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info, cell) {
            if (info) {
                fxk_allowEdit.setValue(info.fxk_allowEdit.checked);
                fxk_allowPrint.setValue(info.fxk_allowPrint.checked);
                fxk_allowEmpty.setValue(info.fxk_allowEmpty.checked);
                fxk_auto.setValue(info.fxk_auto.checked);
                fxk_displayCol.setValue(info.fxk_displayCol.value);
                fxk_mutilGroup.setValue(info.fxk_mutilGroup.checked);
                fxk_emptyAlert.setValue(info.fxk_emptyAlert.value);
                fxk_displayLabel.setValue(info.fxk_displayLabel.value)
                fxk_proveAll.setValue(info.fxk_proveAll.checked);
                fxk_proveOther.setValue(info.fxk_proveOther.checked);
                fxk_rowMargin.setValue(info.fxk_rowMargin.value);
                fxk_separator.setValue(info.fxk_separator.value);
                // fxk_starter.setValue(info.fxk_starter.value)
            }
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.CheckBoxType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.CheckBoxType");
    }
})