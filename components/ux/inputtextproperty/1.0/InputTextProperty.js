Ext.define('vmd.ux.inputTextProperty.Controller', {
    xtype: 'vmd.ux.inputTextProperty.Controller',
    constructor: function(options) {
        this.scope = options;
        this.type = 'text'
        this.text_typeSelect = 'common'
        this.text_common_allowEdit = true
        this.text_common_mutilRow = false
        this.text_common_symbol = false
        this.text_common_allowEmpty = true
        this.text_common_emptyAlert = ''
        this.text_common_fillRules = 'None'
        this.text_rule_charExp = ''
        this.text_rule_maxLength = '0'
        this.text_rule_minLength = '0'
        this.text_password_allowEdit = true
        this.text_password_allowEmpty = true
        this.text_password_emptyAlert = true
        this.text_common_phoneType = ''
        this.text_no_allowEmpty = true
        this.text_no_emptyAlert = ''
        this.text_guid_length = ''
        this.text_guid_allowEmpty = false
        this.text_guid_emptyAlert = ''
        this.colHide = false
        this.colWidth = '100'
        this.txtAlign = "1"
        this.dicFirst = true;
        this.text_click = ''
        this.text_change = ''
    },
    setValue: function(info, flag) {
        if (info) {
            this.text_typeSelect = info.settings.text_typeSelect;
            this.text_common_allowEdit = info.settings.text_common_allowEdit;
            this.text_common_mutilRow = info.settings.text_common_mutilRow;
            this.text_common_symbol = info.settings.text_common_symbol;
            this.text_common_allowEmpty = info.settings.text_common_allowEmpty;
            this.text_common_emptyAlert = info.settings.text_common_emptyAlert;
            this.text_common_fillRules = info.settings.text_common_fillRules;
            this.text_rule_charExp = info.settings.text_rule_charExp;
            this.text_rule_maxLength = info.settings.text_rule_maxLength;
            this.text_rule_minLength = info.settings.text_rule_minLength;
            this.text_password_allowEdit = info.settings.text_password_allowEdit;
            this.text_password_allowEmpty = info.settings.text_password_allowEmpty;
            this.text_password_emptyAlert = info.settings.text_password_emptyAlert;
            this.text_common_phoneType = info.settings.text_common_phoneType;
            this.text_no_allowEmpty = info.settings.text_no_allowEmpty;
            this.text_no_emptyAlert = info.settings.text_no_emptyAlert;
            this.text_guid_length = info.settings.text_guid_length;
            this.text_guid_allowEmpty = info.settings.text_guid_allowEmpty;
            this.text_guid_emptyAlert = info.settings.text_guid_emptyAlert;
            if (!flag) {
                this.text_click = info.events.text_click
                this.text_change = info.events.text_change
            }
            this.colHide = info.settings.colHide;
            this.colWidth = info.settings.colWidth;
            this.dicFirst = info.settings.dicFirst
            this.txtAlign = info.settings.txtAlign
            if (this.scope) {
                this.scope.text_typeSelect.setValue(this.text_typeSelect)
                this.scope.text_common_allowEdit.setValue(this.text_common_allowEdit)
                this.scope.text_common_mutilRow.setValue(this.text_common_mutilRow)
                this.scope.text_common_symbol.setValue(this.text_common_symbol)
                this.scope.text_common_allowEmpty.setValue(this.text_common_allowEmpty)
                this.scope.text_common_emptyAlert.setValue(this.text_common_emptyAlert)
                this.scope.text_common_fillRules.setValue(this.text_common_fillRules)
                this.scope.text_rule_charExp.setValue(this.text_rule_charExp)
                this.scope.text_rule_maxLength.setValue(this.text_rule_maxLength)
                this.scope.text_rule_minLength.setValue(this.text_rule_minLength)
                this.scope.text_password_allowEdit.setValue(this.text_password_allowEdit)
                this.scope.text_password_allowEmpty.setValue(this.text_password_allowEmpty)
                this.scope.text_password_emptyAlert.setValue(this.text_password_emptyAlert)
                this.scope.text_common_phoneType.setValue(this.text_common_phoneType)
                this.scope.text_no_allowEmpty.setValue(this.text_no_allowEmpty)
                this.scope.text_no_emptyAlert.setValue(this.text_no_emptyAlert)
                this.scope.text_guid_length.setValue(this.text_guid_length)
                this.scope.text_guid_allowEmpty.setValue(this.text_guid_allowEmpty)
                this.scope.text_guid_emptyAlert.setValue(this.text_guid_emptyAlert)
                if (!flag) {
                    this.scope.text_click.setValue(this.text_click)
                    this.scope.text_change.setValue(this.text_change)
                }
            }
        }
    },
    serialize: function() {
        var json = {
            settings: {
                text_typeSelect: this.text_typeSelect,
                text_common_allowEdit: this.text_common_allowEdit,
                text_common_mutilRow: this.text_common_mutilRow,
                text_common_symbol: this.text_common_symbol,
                text_common_allowEmpty: this.text_common_allowEmpty,
                text_common_emptyAlert: this.text_common_emptyAlert,
                text_common_fillRules: this.text_common_fillRules,
                text_rule_charExp: this.text_rule_charExp,
                text_rule_maxLength: this.text_rule_maxLength,
                text_rule_minLength: this.text_rule_minLength,
                text_password_allowEdit: this.text_password_allowEdit,
                text_password_allowEmpty: this.text_password_allowEmpty,
                text_password_emptyAlert: this.text_password_emptyAlert,
                text_common_phoneType: this.text_common_phoneType,
                text_no_allowEmpty: this.text_no_allowEmpty,
                text_no_emptyAlert: this.text_no_emptyAlert,
                text_guid_length: this.text_guid_length,
                text_guid_allowEmpty: this.text_guid_allowEmpty,
                text_guid_emptyAlert: this.text_guid_emptyAlert,
                colHide: this.colHide,
                colWidth: this.colWidth,
                dicFirst: this.dicFirst,
                txtAlign: this.txtAlign
            },
            events: {
                text_click: this.text_click,
                text_change: this.text_change
            },
            type: 'text'
        }
        return json;
    }
})
Ext.define("vmd.ux.InputTextProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ClickText$1.0$ClickText"]),
    version: "1.0",
    xtype: "vmd.ux.InputTextProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 500,
    height: 656,
    layout: "border",
    autoScroll: false,
    beforerender: "InputTextProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.InputTextProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.InputTextProperty'
                }, ex, 50);
            }
        }
    },
    uxCss: ".b{    border: 1px solid #ddd}.flex{    display: flex}.m-r5{    margin-right: 5px}.line35{    line-height: 35px}",
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
            var activePropPanel = parent.xds && parent.xds.active.component.propPanel;
            var store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['type', 'describe']
            });
            var data = [{
                    type: 'common',
                    describe: '常规'
                },
                {
                    type: 'no',
                    describe: '序号'
                }, {
                    type: 'guid',
                    describe: 'GUID'
                }, {
                    type: 'password',
                    describe: '密码'
                }
            ];
            store.loadData(data);
            ////////////////////////////////////////////////////////////////////////////
            var store1 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['ruleId', 'name']
            });
            var data1 = [{
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
            store1.loadData(data1);
            ///////////////////////////////////////////////////////////////////////////////
            var store2 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['id', 'name']
            });
            var data2 = [{
                id: '0',
                name: '05466895587'
            }, {
                id: '1',
                name: '0546-6895587'
            }, {
                id: '2',
                name: '0546 6895587'
            }];
            store2.loadData(data2);
            ///////////////////////////////////////////////////////////////////////////////
            function text_click_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'text_click', sender.getValue(), 'grid,cell,rId,cInd');
                })
            }

            function text_common_allowEmpty_check(sender, checked) {
                checked == false ? text_common_emptyAlertDiv.show() : text_common_emptyAlertDiv.hide();
                text_common.doLayout()
            }

            function text_no_allowEmpty_check(sender, checked) {
                checked == false ? text_no_emptyAlertDiv.show() : text_no_emptyAlertDiv.hide();
                text_no.doLayout()
            }

            function text_guid_length_plus(sender) {
                //触发监听事件修改值
            }

            function text_guid_length_minus(sender) {
                //触发监听事件修改值
            }

            function text_guid_allowEmpty_check(sender, checked) {
                checked == false ? text_guid_emptyAlertDiv.show() : text_guid_emptyAlertDiv.hide();
                text_guid.doLayout()
            }

            function text_password_allowEmpty_check(sender, checked) {
                checked == false ? text_password_emptyAlertDiv.show() : text_password_emptyAlertDiv.hide()
                text_password.doLayout()
            }

            function closeAll() {
                text_common.hide()
                text_no.hide()
                text_guid.hide()
                text_password.hide()
            }

            function text_typeSelect_change(sender, value, text) {
                closeAll();
                switch (text) {
                    case '常规':
                        text_common.show();
                        break;
                    case '序号':
                        text_no.show();
                        break;
                    case 'GUID':
                        text_guid.show();
                        break;
                    case '密码':
                        text_password.show();
                        break;
                }
                textProperty.doLayout()
            }

            function text_typeSelect_beforerender(sender) {
                sender.store = store;
                sender.displayField = 'describe';
                sender.valueField = 'type'
            }

            function text_common_fillRules_beforerender(sender) {
                sender.store = store1;
                sender.displayField = 'name';
                sender.valueField = 'ruleId'
            }

            function text_common_phoneType_beforerender(sender) {
                sender.store = store2;
                sender.displayField = 'name';
                sender.valueField = 'id'
            }

            function closeRules() {
                text_common_lengthDiv.hide()
                text_common_expDiv.hide()
                text_common_phoneDiv.hide()
            }

            function text_common_fillRules_change(sender, value, text) {
                closeRules()
                switch (text) {
                    case '长度':
                        text_common_lengthDiv.show();
                        break;
                    case '电话':
                        text_common_phoneDiv.show();
                        break;
                    case '正则表达式':
                        text_common_expDiv.show();
                        break;
                }
                text_common.doLayout()
            }

            function setInfo(info) {
                page.controller.setInfo(info)
            }

            function changeState(info) {
                // text_type.setValue(info.settings.text_type.value)
                text_typeSelect.setValue(info.settings.text_typeSelect)
                text_common_allowEdit.setValue(info.settings.text_common_allowEdit)
                text_common_mutilRow.setValue(info.settings.text_common_mutilRow)
                text_common_symbol.setValue(info.settings.text_common_symbol)
                text_common_allowEmpty.setValue(info.settings.text_common_allowEmpty)
                text_common_emptyAlert.setValue(info.settings.text_common_emptyAlert)
                text_common_fillRules.setValue(info.settings.text_common_fillRules)
                text_rule_maxLength.setValue(info.settings.text_rule_maxLength)
                text_rule_minLength.setValue(info.settings.text_rule_minLength)
                text_rule_charExp.setValue(info.settings.text_rule_charExp)
                text_common_phoneType.setValue(info.settings.text_common_phoneType)
                text_no_allowEmpty.setValue(info.settings.text_no_allowEmpty)
                text_no_emptyAlert.setValue(info.settings.text_no_emptyAlert)
                text_guid_length.setValue(info.settings.text_guid_length)
                text_guid_allowEmpty.setValue(info.settings.text_guid_allowEmpty)
                text_guid_emptyAlert.setValue(info.settings.text_guid_emptyAlert)
                text_password_allowEdit.setValue(info.settings.text_password_allowEdit)
                text_password_allowEmpty.setValue(info.settings.text_password_allowEmpty)
                text_password_emptyAlert.setValue(info.settings.text_password_emptyAlert)
                text_click.setValue(info.events.text_click)
                text_change.setValue(info.events.text_change)
            }

            function text_change_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'text_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
                })
            }

            function InputTextProperty_beforerender(sender) {}

            function text_clickDelete_click(sender, e) {
                text_click.setValue('');
                text_click.fireEvent('change', text_click, '')
            }

            function text_changDelete_click(sender, e) {
                text_change.setValue('');
                text_change.fireEvent('change', text_change, '')
            }

            function textProperty_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.InputTextProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.InputTextProperty_beforerender = InputTextProperty_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "text_tab",
            activeTab: 0,
            height: 150,
            width: 194,
            region: "center",
            activeItem: "textProperty",
            items: [{
                    xtype: "panel",
                    id: "textProperty",
                    title: "属性",
                    header: false,
                    border: false,
                    height: 100,
                    layout: "anchor",
                    beforerender: "textProperty_beforerender",
                    listeners: {
                        beforerender: textProperty_beforerender
                    },
                    items: [{
                            xtype: "vmd.div",
                            id: "text_type",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 190,
                            height: 37,
                            layout: "anchor",
                            region: "north",
                            hidden: false,
                            anchor: "100%",
                            items: [{
                                xtype: "vmd.div",
                                id: "div5",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 400,
                                height: 35,
                                layout: "border",
                                anchor: "100%",
                                items: [{
                                        xtype: "vmd.div",
                                        id: "div7",
                                        autoEl: "div",
                                        border: false,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "top left",
                                        width: 400,
                                        height: 50,
                                        region: "center",
                                        layout: "anchor",
                                        items: [{
                                            xtype: "vmd.combo",
                                            id: "text_typeSelect",
                                            width: 141,
                                            beforerender: "text_typeSelect_beforerender",
                                            change: "text_typeSelect_change",
                                            anchor: "-10",
                                            listeners: {
                                                beforerender: text_typeSelect_beforerender,
                                                change: text_typeSelect_change
                                            }
                                        }]
                                    },
                                    {
                                        xtype: "vmd.div",
                                        id: "div9",
                                        layoutConfig: {
                                            align: "center",
                                            pack: "center"
                                        },
                                        autoEl: "div",
                                        border: false,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "top left",
                                        width: 47,
                                        height: 50,
                                        region: "west",
                                        layout: "vbox",
                                        items: [{
                                            xtype: "label",
                                            id: "label1",
                                            text: "类别：",
                                            margins: "",
                                            width: 36
                                        }]
                                    }
                                ]
                            }]
                        },
                        {
                            xtype: "vmd.div",
                            id: "text_common",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 192,
                            height: 578,
                            layout: "anchor",
                            region: "center",
                            hidden: false,
                            flex: "",
                            margins: "",
                            style: "padding: 5px",
                            anchor: "100%",
                            items: [{
                                    xtype: "checkbox",
                                    id: "text_common_allowEdit",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "允许编辑",
                                    anchor: "100%",
                                    margins: "5 0 0 5",
                                    height: 30
                                },
                                {
                                    xtype: "checkbox",
                                    id: "text_common_mutilRow",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "支持多行",
                                    anchor: "100%",
                                    margins: "5 0 0 5",
                                    height: 30
                                },
                                {
                                    xtype: "checkbox",
                                    id: "text_common_symbol",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "符号",
                                    anchor: "100%",
                                    margins: "5 0 0 5",
                                    height: 30,
                                    hidden: true
                                },
                                {
                                    xtype: "label",
                                    id: "label2",
                                    text: "注：用于添加键盘上没有的符号；可以是数据库字段，也可以是自定义符号，用（，）隔开。",
                                    height: 53,
                                    width: 176,
                                    margins: "5 0 0 5",
                                    hidden: true
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div3",
                                    layoutConfig: {
                                        align: "middle",
                                        pack: "start"
                                    },
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 190,
                                    height: 35,
                                    layout: "hbox",
                                    items: [{
                                            xtype: "label",
                                            id: "label3",
                                            text: "校验",
                                            margins: "5 0 0 5"
                                        },
                                        {
                                            xtype: "label",
                                            id: "label4",
                                            text: "——————————",
                                            width: 153,
                                            margins: "5 0 0 5",
                                            style: "color: #ddd"
                                        }
                                    ]
                                },
                                {
                                    xtype: "checkbox",
                                    id: "text_common_allowEmpty",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "允许为空",
                                    anchor: "100%",
                                    margins: "5 0 0 5",
                                    check: "text_common_allowEmpty_check",
                                    checked: true,
                                    height: 30,
                                    listeners: {
                                        check: text_common_allowEmpty_check
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "text_common_emptyAlertDiv",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 182,
                                    height: 30,
                                    hidden: true,
                                    layout: "border",
                                    margins: "5 0 0 5",
                                    items: [{
                                            xtype: "vmd.div",
                                            id: "div19",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 400,
                                            height: 52,
                                            region: "center",
                                            layout: "anchor",
                                            items: [{
                                                xtype: "textfield",
                                                id: "text_common_emptyAlert",
                                                allowBlank: true,
                                                enableKeyEvents: true,
                                                anchor: "-10",
                                                width: 158,
                                                margins: "5 0 0 10"
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div18",
                                            layoutConfig: {
                                                align: "center",
                                                pack: "center"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 63,
                                            height: 50,
                                            region: "west",
                                            layout: "vbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label12",
                                                text: "空值提示："
                                            }]
                                        }
                                    ]
                                },
                                {
                                    xtype: "label",
                                    id: "label5",
                                    text: "填写规则：",
                                    margins: "5 0 0 5"
                                },
                                {
                                    xtype: "vmd.combo",
                                    id: "text_common_fillRules",
                                    width: 175,
                                    margins: "5 0 0 5",
                                    beforerender: "text_common_fillRules_beforerender",
                                    change: "text_common_fillRules_change",
                                    anchor: "-10",
                                    listeners: {
                                        beforerender: text_common_fillRules_beforerender,
                                        change: text_common_fillRules_change
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "text_common_lengthDiv",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 379,
                                    height: 244,
                                    layout: "vbox",
                                    margins: "5 0 0 5",
                                    hidden: true,
                                    items: [{
                                            xtype: "label",
                                            id: "label18",
                                            text: "最大长度："
                                        },
                                        {
                                            xtype: "vmd.ux.ClickText",
                                            id: "text_rule_maxLength",
                                            layout: "border",
                                            margins: "5 0 0 5"
                                        },
                                        {
                                            xtype: "label",
                                            id: "label19",
                                            text: "最小长度：",
                                            margins: "5 0 0 0"
                                        },
                                        {
                                            xtype: "vmd.ux.ClickText",
                                            id: "text_rule_minLength",
                                            layout: "border",
                                            margins: "5 0 0 5"
                                        }
                                    ]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "text_common_expDiv",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 193,
                                    height: 290,
                                    margins: "5 0 0 5",
                                    layout: "vbox",
                                    hidden: true,
                                    items: [{
                                            xtype: "label",
                                            id: "label20",
                                            text: "表达式："
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "text_rule_charExp",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            margins: "5 0 0 5"
                                        }
                                    ]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "text_common_phoneDiv",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 187,
                                    height: 293,
                                    margins: "5 0 0 5",
                                    layout: "vbox",
                                    hidden: true,
                                    items: [{
                                            xtype: "label",
                                            id: "label21",
                                            text: "格式："
                                        },
                                        {
                                            xtype: "vmd.combo",
                                            id: "text_common_phoneType",
                                            width: 139,
                                            margins: "5 0 0 5",
                                            beforerender: "text_common_phoneType_beforerender",
                                            listeners: {
                                                beforerender: text_common_phoneType_beforerender
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "text_no",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 190,
                            height: 532,
                            region: "west",
                            layout: "anchor",
                            hidden: true,
                            anchor: "100%",
                            items: [{
                                    xtype: "checkbox",
                                    id: "text_no_allowEmpty",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "允许为空",
                                    anchor: "100%",
                                    margins: "0 0 0 5",
                                    checked: true,
                                    check: "text_no_allowEmpty_check",
                                    height: 30,
                                    listeners: {
                                        check: text_no_allowEmpty_check
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "text_no_emptyAlertDiv",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 190,
                                    layout: "border",
                                    anchor: "100%",
                                    hidden: true,
                                    items: [{
                                            xtype: "vmd.div",
                                            id: "div10",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 400,
                                            height: 50,
                                            region: "center",
                                            layout: "anchor",
                                            items: [{
                                                xtype: "textfield",
                                                id: "text_no_emptyAlert",
                                                allowBlank: true,
                                                enableKeyEvents: true,
                                                anchor: "-10",
                                                width: 153,
                                                margins: "5 0 0 10"
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div11",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 63,
                                            height: 50,
                                            region: "west",
                                            items: [{
                                                xtype: "label",
                                                id: "label13",
                                                text: "空值提示："
                                            }]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "text_guid",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 190,
                            height: 545,
                            region: "center",
                            layout: "anchor",
                            hidden: true,
                            style: "padding:5px;",
                            anchor: "100%",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "text_guid_lengthDiv",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 30,
                                    layout: "border",
                                    anchor: "100%",
                                    items: [{
                                            xtype: "vmd.div",
                                            id: "div13",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 400,
                                            height: 50,
                                            region: "center",
                                            layout: "anchor",
                                            items: [{
                                                xtype: "vmd.ux.ClickText",
                                                id: "text_guid_length",
                                                layout: "border",
                                                plus: "text_guid_length_plus",
                                                minus: "text_guid_length_minus",
                                                anchor: "-10",
                                                listeners: {
                                                    plus: text_guid_length_plus,
                                                    minus: text_guid_length_minus
                                                }
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div14",
                                            layoutConfig: {
                                                pack: "center"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 38,
                                            height: 50,
                                            region: "west",
                                            layout: "vbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label8",
                                                text: "长度：",
                                                margins: ""
                                            }]
                                        }
                                    ]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div8",
                                    layoutConfig: {
                                        pack: "start",
                                        align: "middle"
                                    },
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 191,
                                    height: 23,
                                    layout: "hbox",
                                    items: [{
                                            xtype: "label",
                                            id: "label9",
                                            text: "校验",
                                            margins: ""
                                        },
                                        {
                                            xtype: "label",
                                            id: "label10",
                                            text: "——————————",
                                            margins: "0 0 0 5",
                                            style: "color:#ddd;"
                                        }
                                    ]
                                },
                                {
                                    xtype: "checkbox",
                                    id: "text_guid_allowEmpty",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "允许为空",
                                    anchor: "100%",
                                    width: 152,
                                    margins: "0 0 0 5",
                                    checked: true,
                                    check: "text_guid_allowEmpty_check",
                                    height: 30,
                                    listeners: {
                                        check: text_guid_allowEmpty_check
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "text_guid_emptyAlertDiv",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 30,
                                    layout: "border",
                                    anchor: "100%",
                                    hidden: true,
                                    items: [{
                                            xtype: "vmd.div",
                                            id: "div12",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 400,
                                            height: 50,
                                            region: "center",
                                            layout: "anchor",
                                            items: [{
                                                xtype: "textfield",
                                                id: "text_guid_emptyAlert",
                                                allowBlank: true,
                                                enableKeyEvents: true,
                                                anchor: "-10",
                                                width: 153,
                                                margins: "5 0 0 10",
                                                style: "border: 1px solid #ddd"
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div15",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 64,
                                            height: 50,
                                            region: "west",
                                            layout: "vbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label11",
                                                text: "空值提示：",
                                                margins: "5 0 0 5"
                                            }]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "text_password",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 195,
                            height: 657,
                            layout: "anchor",
                            hidden: true,
                            anchor: "100%",
                            items: [{
                                    xtype: "checkbox",
                                    id: "text_password_allowEdit",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "允许编辑",
                                    anchor: "100%",
                                    margins: "5 0 0 5",
                                    height: 30
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 21,
                                    margins: "5 0 0 5",
                                    layout: "hbox",
                                    items: [{
                                            xtype: "label",
                                            id: "label",
                                            text: "校验"
                                        },
                                        {
                                            xtype: "label",
                                            id: "label16",
                                            text: "———————————",
                                            style: "color: #ddd"
                                        }
                                    ]
                                },
                                {
                                    xtype: "checkbox",
                                    id: "text_password_allowEmpty",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "允许为空",
                                    anchor: "100%",
                                    margins: "5 0 0 5",
                                    checked: true,
                                    check: "text_password_allowEmpty_check",
                                    height: 30,
                                    listeners: {
                                        check: text_password_allowEmpty_check
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "text_password_emptyAlertDiv",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 190,
                                    height: 30,
                                    layout: "border",
                                    margins: "5 0 0 5",
                                    hidden: true,
                                    anchor: "100%",
                                    items: [{
                                            xtype: "vmd.div",
                                            id: "div16",
                                            layoutConfig: {
                                                pack: "center"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 63,
                                            height: 50,
                                            region: "west",
                                            layout: "vbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label17",
                                                text: "空值提示："
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div17",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 112,
                                            height: 50,
                                            region: "center",
                                            layout: "anchor",
                                            items: [{
                                                xtype: "textfield",
                                                id: "text_password_emptyAlert",
                                                allowBlank: true,
                                                enableKeyEvents: true,
                                                anchor: "-10",
                                                margins: "5 0 0 10",
                                                width: 151
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "textListener",
                    title: "事件",
                    header: false,
                    border: false,
                    height: 100,
                    layout: "anchor",
                    padding: "5",
                    items: [{
                            xtype: "vmd.div",
                            id: "div1",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 35,
                            layout: "anchor",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label14",
                                    text: "click:",
                                    margins: "5 0 0 5",
                                    width: 30,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div4",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 176,
                                    height: 38,
                                    layout: "anchor",
                                    anchor: "-30",
                                    items: [{
                                            xtype: "textfield",
                                            id: "text_click",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 120,
                                            margins: "5 0 0 10",
                                            readOnly: true,
                                            afterrender: "text_click_afterrender",
                                            cls: "m-r5",
                                            listeners: {
                                                vmdafterrender: text_click_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "text_clickDelete",
                                            type: "(none)",
                                            size: "small",
                                            icon: "delete",
                                            width: 30,
                                            margins: "5 0 0 5",
                                            click: "text_clickDelete_click",
                                            listeners: {
                                                click: text_clickDelete_click
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div2",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 35,
                            layout: "anchor",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label15",
                                    text: "change:",
                                    margins: "5 0 0 5",
                                    cls: "line35",
                                    width: 50
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div6",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 35,
                                    layout: "anchor",
                                    anchor: "-50",
                                    items: [{
                                            xtype: "textfield",
                                            id: "text_change",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            margins: "5 0 0 10",
                                            width: 120,
                                            readOnly: true,
                                            afterrender: "text_change_afterrender",
                                            cls: "m-r5",
                                            listeners: {
                                                vmdafterrender: text_change_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "text_changDelete",
                                            type: "(none)",
                                            size: "small",
                                            icon: "delete",
                                            width: 30,
                                            margins: "5 0 0 5",
                                            click: "text_changDelete_click",
                                            listeners: {
                                                click: text_changDelete_click
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info) {
            setInfo(info)
        }
        this.getInfo = function() {
            page.controller.serialize()
        }
        this.changeState = function(state) {
            changeState(state);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.InputTextProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.InputTextProperty");
    }
})