Ext.define('vmd.ux.textType.Controller', {
    xtype: 'vmd.ux.textType.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.TextType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.TextType",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 621,
    layout: "absolute",
    afterrender: "TextType_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.TextType_afterrender(this)
        }
    },
    uxCss: ".b{    border: 1px solid #dddddd    }.btn{    cursor: pointer}.noneBorder .x-form-text {    border: none;    border-bottom: none;}",
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
            fields: ['ruleId', 'name']
        });
        var data = [{
            ruleId: 'None',
            name: '无'
        }, {
            ruleId: 'Length',
            name: '长度'
        }, {
            ruleId: 'Mail',
            name: '邮件'
        }, {
            ruleId: 'Identification',
            name: '身份证'
        }, {
            ruleId: 'Postalcode',
            name: '邮政编码'
        }, {
            ruleId: 'Telephone',
            name: '电话'
        }, {
            ruleId: 'Mobilephone',
            name: '手机'
        }, {
            ruleId: 'ValidRegExp',
            name: '正则表达式'
        }];
        store.loadData(data);
        ///////////////////////////////////////////////////////////////////////////////
        var store1 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['id', 'name']
        });
        var data1 = [{
            id: '0',
            name: '05466895587'
        }, {
            id: '1',
            name: '0546-6895587'
        }, {
            id: '2',
            name: '0546 6895587'
        }];
        store1.loadData(data1);
        ///////////////////////////////////////////////////////////////////////////////
        var store2 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['id', 'name']
        });
        var data2 = [{
            id: 'wb',
            name: '常规'
        }, {
            id: 'xh',
            name: '序号'
        }, {
            id: 'guid',
            name: 'GUID'
        }, {
            id: 'mm',
            name: '密码'
        }];
        store2.loadData(data2);
        ///////////////////////////////////////////////////////////////////////////////
        function text_allowEmpty_check(sender, checked) {
            if (checked) {
                wb_text_emptyAlert.hide()
                a4.hide()
                wb_text_emptyAlert.setValue('')
                page.fireEvent("change", wb_text_allowEmpty, "")
            } else {
                wb_text_emptyAlert.show()
                a4.show()
            }
        }

        function text_fillRules_afterrender(sender) {}

        function guid_allowEmpty_check(sender, checked) {
            if (wb_guid_allowEmpty.checked) {
                a1.hide()
                wb_guid_emptyAlert.hide()
                wb_guid_emptyAlert.setValue('')
                wb_guid_emptyAlert.fireEvent("change", wb_guid_emptyAlert, "")
            } else {
                a1.show()
                wb_guid_emptyAlert.show()
            }
        }

        function no_allowEmpty_check(sender, checked) {
            if (wb_no_allowEmpty.checked) {
                wb_no_emptyAlert.hide()
                wb_no_emptyAlert.setValue('')
                wb_no_emptyAlert.fireEvent("change", wb_no_emptyAlert, "")
                a5.hide()
            } else {
                wb_no_emptyAlert.show()
                a5.show()
            }
        }

        function password_allowEmpty_check(sender, checked) {
            if (wb_password_allowEmpty.checked) {
                wb_password_emptyAlert.hide()
                a6.hide()
                wb_password_emptyAlert.setValue('')
                wb_password_emptyAlert.fireEvent("change", wb_password_emptyAlert, "")
            } else {
                wb_password_emptyAlert.show()
                a6.show()
            }
        }

        function closeAll() {
            textDiv.hide();
            guidDiv.hide();
            noDiv.hide();
            passwordDiv.hide();
        }

        function closeRules() {
            wb_rule_length.hide();
            wb_rule_phone.hide()
            wb_rule_exp.hide()
        }

        function text_fillRules_selectChanged(sender, combo, record, index) {
            closeRules();
            switch (record.data.ruleId) {
                case "Length":
                    wb_rule_length.show();
                    break;
                case "Telephone":
                    wb_rule_phone.show()
                    break;
                case "ValidRegExp":
                    wb_rule_exp.show()
                    break;
            }
        }

        function div1_click(sender, e) {
            wb_rule_min.setValue(parseFloat(wb_rule_min.getValue()) + 1)
            page.fireEvent('textDecimalChanged', wb_rule_min, wb_rule_min.value, "min")
        }

        function div2_click(sender, e) {
            wb_rule_max.setValue(parseFloat(wb_rule_max.getValue()) + 1)
            page.fireEvent('textDecimalChanged', wb_rule_max, wb_rule_max.value, "max")
        }

        function div5_click(sender, e) {
            if (wb_rule_min.getValue() <= "1") {
                wb_rule_min.setValue("0")
                page.fireEvent('textDecimalChanged', wb_rule_min, wb_rule_min.value, "min")
            } else {
                wb_rule_min.setValue(parseFloat(wb_rule_min.getValue()) - 1)
                page.fireEvent('textDecimalChanged', wb_rule_min, wb_rule_min.value, "min")
            }
        }

        function div6_click(sender, e) {
            if (wb_rule_max.getValue() <= "1") {
                wb_rule_max.setValue("0")
                page.fireEvent('textDecimalChanged', wb_rule_max, wb_rule_max.value, "max")
            } else {
                wb_rule_max.setValue(parseFloat(wb_rule_max.getValue()) - 1)
                page.fireEvent('textDecimalChanged', wb_rule_max, wb_rule_max.value, "max")
            }
        }

        function rule_min_afterrender(sender) {
            wb_rule_min.setValue("0");
            wb_rule_max.setValue("0")
        }

        function rule_phoneType_afterrender(sender) {}

        function wb_allType_selectChanged(sender, combo, record, index) {
            // 
            closeAll();
            switch (record.data.id) {
                case "wb":
                    textDiv.show();
                    break;
                case "xh":
                    noDiv.show();
                    break;
                case "guid":
                    guidDiv.show();
                    break;
                case "mm":
                    passwordDiv.show();
                    break;
            }
        }

        function wb_allType_afterrender(sender) {
            wb_allType.store = store2;
            wb_allType.displayField = "name";
            wb_allType.valueField = "id";
            wb_allType.setValue("wb")
        }

        function setInfo(info, cell) {
            if (info) {
                closeAll();
                switch (info.wb_allType.value) {
                    case "wb":
                        textDiv.show()
                        break;
                    case "xh":
                        noDiv.show();
                        break;
                    case "guid":
                        guidDiv.show();
                        break;
                    case "mm":
                        passwordDiv.show();
                        break;
                }
                closeRules()
                switch (info.wb_text_fillRules.value) {
                    case "Length":
                        wb_rule_length.show();
                        break;
                    case "Mail":
                        break;
                    case "Identification":
                        break;
                    case "Postalcode":
                        break;
                    case "Telephone":
                        break;
                    case "Mobilephone":
                        wb_rule_phone.show()
                        break;
                    case "ValidRegExp":
                        wb_rule_exp.show()
                        break;
                }
                wb_allType.setValue(info.wb_allType.value)
                wb_text_allowEdit.setValue(info.wb_text_allowEdit.checked);
                wb_text_allowPrint.setValue(info.wb_text_allowPrint.checked);
                wb_text_allowRows.setValue(info.wb_text_allowRows.checked);
                wb_text_symbol.setValue(info.wb_text_symbol.checked);
                wb_text_allowEmpty.setValue(info.wb_text_allowEmpty.checked);
                wb_guid_allowEmpty.setValue(info.wb_guid_allowEmpty.checked);
                wb_guid_length.setValue(info.wb_guid_length.value)
                wb_no_allowEmpty.setValue(info.wb_no_allowEmpty.checked);
                wb_no_allowPrint.setValue(info.wb_no_allowPrint.checked);
                wb_password_allowEdit.setValue(info.wb_password_allowEdit.checked);
                wb_password_allowEmpty.setValue(info.wb_password_allowEmpty.checked);
                wb_password_allowPrint.setValue(info.wb_password_allowPrint.checked);
                wb_text_emptyAlert.setValue(info.wb_text_emptyAlert.value);
                wb_text_fillRules.setValue(info.wb_text_fillRules.value);
                wb_guid_emptyAlert.setValue(info.wb_guid_emptyAlert.value);
                wb_no_emptyAlert.setValue(info.wb_no_emptyAlert.value);
                wb_password_emptyAlert.setValue(info.wb_password_emptyAlert.value);
                wb_rule_phoneType.setValue(info.wb_rule_phoneType.value)
                wb_rule_min.setValue(info.wb_rule_min.value)
                wb_rule_max.setValue(info.wb_rule_max.value)
                wb_rule_charExp.setValue(info.wb_rule_charExp.value)
            }
        }

        function wb_text_fillRules_beforerender(sender) {
            wb_text_fillRules.store = store;
            wb_text_fillRules.displayField = "name";
            wb_text_fillRules.valueField = "ruleId"
            wb_text_fillRules.setValue("0")
        }

        function wb_rule_phoneType_beforerender(sender) {
            wb_rule_phoneType.store = store1;
            wb_rule_phoneType.displayField = "name";
            wb_rule_phoneType.valueField = "id"
        }

        function id_allowEmpty_check(sender, checked) {
            if (checked) {
                a2.hide();
                wb_guid_emptyAlert.hide();
            } else {
                a2.show();
                wb_guid_emptyAlert.show();
            }
        }

        function TextType_afterrender(sender) {}

        function wb_rule_charExp_keydown(sender, e) {}
        this.TextType_afterrender = TextType_afterrender;
        this.items = [{
                xtype: "vmd.comlist",
                id: "wb_allType",
                width: 220,
                height: 270,
                x: 50,
                y: 7,
                cls: "b noneBorder",
                selectChanged: "wb_allType_selectChanged",
                afterrender: "wb_allType_afterrender",
                listeners: {
                    selectChanged: wb_allType_selectChanged,
                    vmdafterrender: wb_allType_afterrender
                }
            },
            {
                xtype: "label",
                id: "label",
                text: "类别：",
                x: 10,
                y: 10
            },
            {
                xtype: "vmd.div",
                id: "textDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 540,
                x: 0,
                y: 45,
                layout: "absolute",
                hidden: false,
                disabled: false,
                items: [{
                        xtype: "checkbox",
                        id: "wb_text_allowEdit",
                        fieldLabel: "Checkbox",
                        boxLabel: "允许编辑",
                        x: 10,
                        y: 10,
                        checked: true
                    },
                    {
                        xtype: "checkbox",
                        id: "wb_text_allowPrint",
                        fieldLabel: "Checkbox",
                        boxLabel: "允许打印",
                        x: 10,
                        y: 40,
                        checked: true
                    },
                    {
                        xtype: "checkbox",
                        id: "wb_text_allowRows",
                        fieldLabel: "Checkbox",
                        boxLabel: "支持多行",
                        x: 10,
                        y: 70
                    },
                    {
                        xtype: "checkbox",
                        id: "wb_text_symbol",
                        fieldLabel: "Checkbox",
                        boxLabel: "符号",
                        x: 10,
                        y: 100
                    },
                    {
                        xtype: "label",
                        id: "label1",
                        text: "注：用于添加键盘上没有的符号；可以是数据库字段，也可以是自定义符号，用（，）逗号隔开。",
                        x: 10,
                        y: 130,
                        height: 40,
                        width: 270
                    },
                    {
                        xtype: "label",
                        id: "label2",
                        text: "校验",
                        x: 10,
                        y: 180
                    },
                    {
                        xtype: "label",
                        id: "label3",
                        text: "————————————————————",
                        x: 40,
                        y: 180,
                        width: 260,
                        style: "color: #dddddd"
                    },
                    {
                        xtype: "checkbox",
                        id: "wb_text_allowEmpty",
                        fieldLabel: "Checkbox",
                        boxLabel: "允许为空",
                        x: 10,
                        y: 210,
                        checked: true,
                        check: "text_allowEmpty_check",
                        listeners: {
                            check: text_allowEmpty_check
                        }
                    },
                    {
                        xtype: "label",
                        id: "a4",
                        text: "提示信息：",
                        x: 110,
                        y: 214,
                        hidden: true
                    },
                    {
                        xtype: "textfield",
                        id: "wb_text_emptyAlert",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 170,
                        y: 210,
                        width: 120,
                        disabled: false,
                        style: "border: 1px solid #dddddd",
                        hidden: true
                    },
                    {
                        xtype: "label",
                        id: "label5",
                        text: "填写规则：",
                        x: 10,
                        y: 250
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "wb_text_fillRules",
                        width: 210,
                        height: 270,
                        x: 70,
                        y: 245,
                        cls: "b noneBorder",
                        afterrender: "text_fillRules_afterrender",
                        selectChanged: "text_fillRules_selectChanged",
                        beforerender: "wb_text_fillRules_beforerender",
                        listeners: {
                            vmdafterrender: text_fillRules_afterrender,
                            selectChanged: text_fillRules_selectChanged,
                            beforerender: wb_text_fillRules_beforerender
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "wb_rule_length",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 320,
                        height: 70,
                        x: 0,
                        y: 270,
                        layout: "absolute",
                        hidden: false,
                        items: [{
                                xtype: "label",
                                id: "label4",
                                text: "最大长度：",
                                x: 160,
                                y: 30
                            },
                            {
                                xtype: "label",
                                id: "label9",
                                text: "最小长度：",
                                x: 10,
                                y: 30
                            },
                            {
                                xtype: "numberfield",
                                id: "wb_rule_min",
                                allowDecimals: true,
                                allowNegative: true,
                                decimalPrecision: 2,
                                allowBlank: true,
                                x: 80,
                                y: 20,
                                width: 60,
                                cls: "b",
                                afterrender: "rule_min_afterrender",
                                listeners: {
                                    vmdafterrender: rule_min_afterrender
                                }
                            },
                            {
                                xtype: "numberfield",
                                id: "wb_rule_max",
                                allowDecimals: true,
                                allowNegative: true,
                                decimalPrecision: 2,
                                allowBlank: true,
                                x: 220,
                                y: 20,
                                width: 60,
                                cls: "b"
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
                                x: 120,
                                y: 20,
                                html: "<img src=\"/system/img/report/border/上.png\" />",
                                style: "cursor: pointer",
                                click: "div1_click",
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
                                x: 260,
                                y: 20,
                                html: "<img src=\"/system/img/report/border/上.png\" />",
                                style: "cursor: pointer",
                                click: "div2_click",
                                listeners: {
                                    click: div2_click
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
                                x: 120,
                                y: 30,
                                html: "<img src=\"/system/img/report/border/下.png\" />",
                                style: "cursor: pointer",
                                click: "div5_click",
                                listeners: {
                                    click: div5_click
                                }
                            },
                            {
                                xtype: "vmd.div",
                                id: "div6",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 30,
                                height: 15,
                                x: 260,
                                y: 30,
                                html: "<img src=\"/system/img/report/border/下.png\" />",
                                style: "cursor: pointer",
                                click: "div6_click",
                                listeners: {
                                    click: div6_click
                                }
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "wb_rule_phone",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 300,
                        height: 50,
                        x: 0,
                        y: 280,
                        layout: "absolute",
                        hidden: false,
                        items: [{
                                xtype: "label",
                                id: "label12",
                                text: "数据格式：",
                                height: 20,
                                x: 10,
                                y: 15
                            },
                            {
                                xtype: "vmd.comlist",
                                id: "wb_rule_phoneType",
                                width: 210,
                                height: 270,
                                x: 70,
                                y: 10,
                                cls: "b noneBorder",
                                afterrender: "rule_phoneType_afterrender",
                                beforerender: "wb_rule_phoneType_beforerender",
                                hidden: false,
                                listeners: {
                                    vmdafterrender: rule_phoneType_afterrender,
                                    beforerender: wb_rule_phoneType_beforerender
                                }
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "wb_rule_exp",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 290,
                        height: 50,
                        x: 20,
                        y: 290,
                        hidden: true,
                        items: [{
                                xtype: "label",
                                id: "label6",
                                text: "表达式："
                            },
                            {
                                xtype: "textfield",
                                id: "wb_rule_charExp",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 212,
                                cls: "b",
                                keydown: "wb_rule_charExp_keydown",
                                listeners: {
                                    keydown: wb_rule_charExp_keydown
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "noDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 540,
                x: 0,
                y: 45,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "checkbox",
                        id: "wb_no_allowPrint",
                        fieldLabel: "Checkbox",
                        boxLabel: "允许打印",
                        x: 10,
                        y: 10,
                        checked: true
                    },
                    {
                        xtype: "label",
                        id: "label10",
                        text: "校验",
                        x: 10,
                        y: 40
                    },
                    {
                        xtype: "label",
                        id: "label11",
                        text: "———————————————————",
                        x: 40,
                        y: 40,
                        width: 260,
                        style: "color: #dddddd"
                    },
                    {
                        xtype: "checkbox",
                        id: "wb_no_allowEmpty",
                        fieldLabel: "Checkbox",
                        boxLabel: "允许为空",
                        x: 10,
                        y: 70,
                        checked: true,
                        check: "no_allowEmpty_check",
                        listeners: {
                            check: no_allowEmpty_check
                        }
                    },
                    {
                        xtype: "label",
                        id: "a5",
                        text: "提示信息：",
                        x: 10,
                        y: 105,
                        hidden: true
                    },
                    {
                        xtype: "textfield",
                        id: "wb_no_emptyAlert",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 100,
                        cls: "b",
                        hidden: true
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "passwordDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 540,
                x: 0,
                y: 45,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "checkbox",
                        id: "wb_password_allowEdit",
                        fieldLabel: "Checkbox",
                        boxLabel: "允许编辑",
                        x: 10,
                        y: 10,
                        checked: true
                    },
                    {
                        xtype: "checkbox",
                        id: "wb_password_allowPrint",
                        fieldLabel: "Checkbox",
                        boxLabel: "允许打印",
                        x: 10,
                        y: 40,
                        checked: true
                    },
                    {
                        xtype: "label",
                        id: "label19",
                        text: "校验",
                        x: 10,
                        y: 70
                    },
                    {
                        xtype: "label",
                        id: "label20",
                        text: "——————————————————",
                        x: 40,
                        y: 70,
                        width: 270,
                        height: 20,
                        style: "color: #dddddd"
                    },
                    {
                        xtype: "checkbox",
                        id: "wb_password_allowEmpty",
                        fieldLabel: "Checkbox",
                        boxLabel: "允许为空",
                        x: 10,
                        y: 100,
                        checked: true,
                        check: "password_allowEmpty_check",
                        listeners: {
                            check: password_allowEmpty_check
                        }
                    },
                    {
                        xtype: "label",
                        id: "a6",
                        text: "提示信息：",
                        x: 10,
                        y: 135,
                        hidden: true
                    },
                    {
                        xtype: "textfield",
                        id: "wb_password_emptyAlert",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 130,
                        cls: "b",
                        disabled: false,
                        hidden: true
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "guidDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 540,
                x: 0,
                y: 45,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label22",
                        text: "长度：",
                        x: 10,
                        y: 15
                    },
                    {
                        xtype: "label",
                        id: "label23",
                        text: "校验",
                        x: 10,
                        y: 50
                    },
                    {
                        xtype: "label",
                        id: "label24",
                        text: "——————————————————",
                        x: 40,
                        y: 50,
                        width: 260,
                        style: "color: #dddddd"
                    },
                    {
                        xtype: "label",
                        id: "a2",
                        text: "提示信息：",
                        x: 10,
                        y: 120,
                        hidden: true
                    },
                    {
                        xtype: "textfield",
                        id: "wb_guid_emptyAlert",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 115,
                        cls: "b",
                        disabled: false,
                        width: 152,
                        hidden: true
                    },
                    {
                        xtype: "numberfield",
                        id: "wb_guid_length",
                        allowDecimals: true,
                        allowNegative: true,
                        decimalPrecision: 2,
                        allowBlank: true,
                        x: 50,
                        y: 11,
                        cls: "b",
                        width: 80
                    },
                    {
                        xtype: "vmd.div",
                        id: "div3",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 113,
                        y: 10,
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        cls: "btn"
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
                        x: 113,
                        y: 22,
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        cls: "btn"
                    },
                    {
                        xtype: "checkbox",
                        id: "wb_guid_allowEmpty",
                        fieldLabel: "Checkbox",
                        boxLabel: "允许为空",
                        x: 10,
                        y: 80,
                        checked: true,
                        check: "id_allowEmpty_check",
                        listeners: {
                            check: id_allowEmpty_check
                        }
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getInfo = function(att) {
            var temp;
            if (att == "wb_text_allowEdit") {
                temp = wb_text_allowEdit.checked;
            } else if (att == "wb_text_allowPrint") {
                temp = wb_text_allowPrint.checked
            } else if (att == "wb_allType") {
                temp = wb_allType.getValue()
            } else if (att == "wb_text_allowEmpty") {
                temp = wb_text_allowEmpty.checked
            } else if (att == "wb_text_allowRows") {
                temp = wb_text_allowRows.checked
            } else if (att == "wb_text_symbol") {
                temp = wb_text_symbol.checked
            } else if (att == "wb_text_emptyAlert") {
                temp = wb_text_emptyAlert.getValue()
            } else if (att == "wb_text_fillRules") {
                temp = wb_text_fillRules.getValue()
            } else if (att == "wb_guid_allowEmpty") {
                temp = wb_guid_allowEmpty.checked
            } else if (att == "wb_id_length") {
                temp = wb_id_length.getValue()
            } else if (att == "wb_guid_emptyAlert") {
                temp = wb_guid_emptyAlert.getValue()
            } else if (att == "wb_no_allowEmpty") {
                temp = wb_no_allowEmpty.checked
            } else if (att == "wb_no_allowPrint") {
                temp = wb_no_allowPrint.checked
            } else if (att == "wb_no_emptyAlert") {
                temp = wb_no_emptyAlert.getValue()
            } else if (att == "wb_hyperlink_allowClick") {
                temp = wb_hyperlink_allowClick.checked
            } else if (att == "wb_hyperlink_allowEmpty") {
                temp = wb_hyperlink_allowEmpty.checked
            } else if (att == "wb_hyperlink_allowPrint") {
                temp = wb_hyperlink_allowPrint.checked
            } else if (att == "wb_hyperlink_emptyAlert") {
                temp = wb_hyperlink_emptyAlert.getValue()
            } else if (att == "wb_hyperlink_parameter") {
                temp = wb_hyperlink_parameter.getValue()
            } else if (att == "wb_menu_name") {
                temp = wb_menu_name.getValue()
            } else if (att == "wb_menu_parameter") {
                temp = wb_menu_parameter.getValue()
            } else if (att == "wb_password_allowEdit") {
                temp = wb_password_allowEdit.checked
            } else if (att == "wb_password_allowEmpty") {
                temp = wb_password_allowEmpty.checked
            } else if (att == "wb_password_allowPrint") {
                temp = wb_password_allowPrint.checked
            } else if (att == "wb_password_emptyAlert") {
                temp = wb_password_emptyAlert.getValue()
            } else if (att == "wb_guid_prefix") {
                temp = wb_guid_prefix.getValue()
            } else if (att == "wb_guid_suffix") {
                temp = wb_guid_suffix.getValue()
            } else if (att == "wb_guid_source") {
                temp = wb_guid_source.getValue()
            } else if (att == "wb_id_allowEmpty") {
                temp = wb_id_allowEmpty.checked
            } else if (att == "wb_id_emptyAlert") {
                temp = wb_id_emptyAlert.getValue()
            }
            return temp
        }
        this.setInfo = function(info, cell) {
            setInfo(info, cell)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.TextType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TextType");
    }
})