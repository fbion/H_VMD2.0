Ext.define('vmd.ux.inputNumberProperty.Controller', {
    xtype: 'vmd.ux.inputNumberProperty.Controller',
    constructor: function(options) {
        this.type = 'number'
        this.scope = options;
        this.number_allowEdit = true;
        this.number_allowEmpty = false;
        this.number_emptyAlert = '';
        this.number_allowDecimal = true;
        this.number_decimalLength = 0;
        this.number_allowNegetive = false;
        this.number_limit = false;
        this.number_limitValue = ''
        this.number_nullShowZero = false;
        this.number_change = ''
        this.number_click = ''
        this.colHide = false
        this.colWidth = '100'
        this.txtAlign = "2"
        this.dicFirst = true;
    },
    setValue: function(info, flag) {
        if (info) {
            this.number_allowEdit = info.settings.number_allowEdit;
            this.number_allowEmpty = info.settings.number_allowEmpty;
            this.number_emptyAlert = info.settings.number_emptyAlert;
            this.number_allowDecimal = info.settings.number_allowDecimal;
            this.number_decimalLength = info.settings.number_decimalLength;
            this.number_allowNegetive = info.settings.number_allowNegetive;
            this.number_nullShowZero = info.settings.number_nullShowZero;
            this.number_limit = info.settings.number_limit;
            this.number_limitValue = info.settings.number_limitValue;
            if (!flag) {
                this.number_change = info.events.number_change;
                this.number_click = info.events.number_click;
            }
            this.colHide = info.settings.colHide;
            this.colWidth = info.settings.colWidth;
            this.dicFirst = info.settings.dicFirst
            this.txtAlign = info.settings.txtAlign
            if (this.scope) {
                this.scope.number_allowEdit.setValue(this.number_allowEdit)
                this.scope.number_allowEmpty.setValue(this.number_allowEmpty)
                this.scope.number_emptyAlert.setValue(this.number_emptyAlert)
                this.scope.number_allowDecimal.setValue(this.number_allowDecimal)
                this.scope.number_allowNegetive.setValue(this.number_allowNegetive)
                this.scope.number_nullShowZero.setValue(this.number_nullShowZero)
                this.scope.number_limit.setValue(this.number_limit)
                this.scope.number_limitValue.setValue(this.number_limitValue)
                if (!flag) {
                    this.scope.number_change.setValue(this.number_change)
                    this.scope.number_click.setValue(this.number_click)
                }
            }
        }
    },
    serialize: function() {
        var json = {
            settings: {
                number_allowEdit: this.number_allowEdit,
                number_allowEmpty: this.number_allowEmpty,
                number_emptyAlert: this.number_emptyAlert,
                number_allowDecimal: this.number_allowDecimal,
                number_decimalLength: this.number_decimalLength,
                number_allowNegetive: this.number_allowNegetive,
                number_nullShowZero: this.number_nullShowZero,
                number_limit: this.number_limit,
                number_limitValue: this.number_limitValue,
                colHide: this.colHide,
                colWidth: this.colWidth,
                dicFirst: this.dicFirst,
                txtAlign: this.txtAlign
            },
            events: {
                number_change: this.number_change,
                number_click: this.number_click
            },
            type: 'number'
        }
        return json;
    }
})
Ext.define("vmd.ux.InputNumberProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ClickText$1.0$ClickText"]),
    version: "1.0",
    xtype: "vmd.ux.InputNumberProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 500,
    height: 707,
    layout: "fit",
    beforerender: "InputNumberProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.InputNumberProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.InputNumberProperty'
                }, ex, 50);
            }
        }
    },
    uxCss: ".flex{    display: flex}.m-r5{    margin-right: 5px}.line35{    line-height: 35px;}",
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

            function hwCheckbox2_check(sender, checked) {
                checked == false ? number_emptyAlertDiv.show() : number_emptyAlertDiv.hide()
                numberProperty.doLayout()
            }

            function number_allowDecimal_check(sender, checked) {
                checked == false ? number_decimalDiv.hide() : number_decimalDiv.show()
                numberProperty.doLayout()
            }

            function number_max_check(sender, checked) {
                checked ? number_maxValue.show() : number_maxValue.hide()
                maxDiv.doLayout()
            }

            function number_min_check(sender, checked) {
                checked ? number_minValue.show() : number_minValue.hide();
                minDiv.doLayout()
            }

            function number_limit_check(sender, checked) {
                checked ? number_limitValue.show() : number_limitValue.hide();
                limitDiv.doLayout();
            }

            function number_click_afterrender(sender) {
                
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'number_click', sender.getValue(), 'grid,cell,rId,cInd');
                })
            }

            function number_change_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'number_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
                })
            }

            function InputNumberProperty_beforerender(sender) {
                // page.controller = new vmd.ux.inputNumberProperty.Controller();
            }

            function number_decimalLength_plus(sender) {
                this.setValue(parseFloat(this.getValue()) + 1)
                //消息通知父容器对字段进行值的修改
                page.fireEvent('updateValue', sender, 'number_decimalLength', this.getValue())
            }

            function number_decimalLength_minus(sender) {
                if (this.getValue() >= 1) {
                    this.setValue(parseFloat(this.getValue()) - 1)
                }
                if (this.getValue() < 0) this.setValue(0)
                //消息通知父容器对字段进行值的修改
                page.fireEvent('updateValue', sender, 'number_decimalLength', this.getValue())
            }

            function number_clickDelete_click(sender, e) {
                number_click.setValue('');
                number_click.fireEvent('change', number_click, '')
            }

            function number_changeDelete_click(sender, e) {
                number_change.setValue('');
                number_change.fireEvent('change', number_change, '')
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.InputNumberProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.InputNumberProperty_beforerender = InputNumberProperty_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            x: 80,
            y: 80,
            activeItem: "numberProperty",
            items: [{
                    xtype: "panel",
                    id: "numberProperty",
                    title: "属性",
                    header: true,
                    border: false,
                    height: 100,
                    layout: "anchor",
                    padding: "5px",
                    items: [{
                            xtype: "checkbox",
                            id: "number_allowEdit",
                            fieldLabel: "Checkbox",
                            boxLabel: "允许编辑",
                            anchor: "100%",
                            width: 157,
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
                            height: 20,
                            layout: "hbox",
                            margins: "5 0 0 5",
                            items: [{
                                    xtype: "label",
                                    id: "label",
                                    text: "校验"
                                },
                                {
                                    xtype: "label",
                                    id: "label1",
                                    text: "——————————",
                                    style: "color: #ddd",
                                    margins: "0 0 0 5"
                                }
                            ]
                        },
                        {
                            xtype: "checkbox",
                            id: "number_allowEmpty",
                            fieldLabel: "Checkbox",
                            boxLabel: "允许为空",
                            anchor: "100%",
                            margins: "5 0 0 5",
                            checked: true,
                            check: "hwCheckbox2_check",
                            height: 30,
                            listeners: {
                                check: hwCheckbox2_check
                            }
                        },
                        {
                            xtype: "checkbox",
                            id: "number_nullShowZero",
                            fieldLabel: "Checkbox",
                            boxLabel: "空值显示0",
                            anchor: "100%",
                            height: 30
                        },
                        {
                            xtype: "vmd.div",
                            id: "number_emptyAlertDiv",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 55,
                            layout: "vbox",
                            margins: "5 0 0 5",
                            hidden: true,
                            items: [{
                                    xtype: "label",
                                    id: "label2",
                                    text: "空值提示："
                                },
                                {
                                    xtype: "textfield",
                                    id: "number_emptyAlert",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    margins: "5 0 0 5",
                                    width: 154
                                }
                            ]
                        },
                        {
                            xtype: "checkbox",
                            id: "number_allowDecimal",
                            fieldLabel: "Checkbox",
                            boxLabel: "允许小数",
                            anchor: "100%",
                            margins: "5 0 0 5",
                            checked: true,
                            check: "number_allowDecimal_check",
                            height: 30,
                            hidden: true,
                            listeners: {
                                check: number_allowDecimal_check
                            }
                        },
                        {
                            xtype: "vmd.div",
                            id: "number_decimalDiv",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 250,
                            height: 35,
                            layout: "anchor",
                            hidden: true,
                            anchor: "100%",
                            items: [{
                                xtype: "vmd.div",
                                id: "div5",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 185,
                                height: 33,
                                layout: "border",
                                anchor: "100%",
                                items: [{
                                        xtype: "vmd.div",
                                        id: "div6",
                                        layoutConfig: {
                                            pack: "center"
                                        },
                                        autoEl: "div",
                                        border: false,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "top left",
                                        width: 62,
                                        height: 50,
                                        region: "west",
                                        layout: "vbox",
                                        items: [{
                                            xtype: "label",
                                            id: "label5",
                                            text: "小数位数：",
                                            margins: "",
                                            width: 64,
                                            region: "east",
                                            hidden: false
                                        }]
                                    },
                                    {
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
                                            xtype: "vmd.ux.ClickText",
                                            id: "number_decimalLength",
                                            layout: "border",
                                            width: 114,
                                            anchor: "-10",
                                            region: "north",
                                            plus: "number_decimalLength_plus",
                                            minus: "number_decimalLength_minus",
                                            hidden: true,
                                            listeners: {
                                                plus: number_decimalLength_plus,
                                                minus: number_decimalLength_minus
                                            }
                                        }]
                                    }
                                ]
                            }]
                        },
                        {
                            xtype: "checkbox",
                            id: "number_allowNegetive",
                            fieldLabel: "Checkbox",
                            boxLabel: "允许负数",
                            anchor: "",
                            margins: "5 0 0 5",
                            height: 30
                        },
                        {
                            xtype: "vmd.div",
                            id: "limitDiv",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 35,
                            layout: "hbox",
                            items: [{
                                    xtype: "checkbox",
                                    id: "number_limit",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "限制位数",
                                    margins: "",
                                    check: "number_limit_check",
                                    listeners: {
                                        check: number_limit_check
                                    }
                                },
                                {
                                    xtype: "textfield",
                                    id: "number_limitValue",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    margins: "5 0 0 10",
                                    width: 90,
                                    hidden: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "事件",
                    header: true,
                    border: false,
                    height: 100,
                    layout: "anchor",
                    padding: "5px",
                    items: [{
                            xtype: "vmd.div",
                            id: "div1",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 410,
                            height: 35,
                            layout: "anchor",
                            margins: "5 0 0 5",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label3",
                                    text: "click:",
                                    width: 50,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div3",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 375,
                                    height: 34,
                                    layout: "anchor",
                                    margins: "5 0 0 5",
                                    anchor: "-50",
                                    items: [{
                                            xtype: "textfield",
                                            id: "number_click",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            readOnly: true,
                                            afterrender: "number_click_afterrender",
                                            cls: "m-r5",
                                            listeners: {
                                                vmdafterrender: number_click_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "number_clickDelete",
                                            type: "(none)",
                                            size: "small",
                                            width: 30,
                                            icon: "delete",
                                            margins: "0 0 0 5",
                                            click: "number_clickDelete_click",
                                            listeners: {
                                                click: number_clickDelete_click
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
                            margins: "0 0 0 5",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label4",
                                    text: "change:",
                                    width: 60,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div4",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 375,
                                    height: 34,
                                    layout: "anchor",
                                    margins: "5 0 0 5",
                                    anchor: "-60",
                                    items: [{
                                            xtype: "textfield",
                                            id: "number_change",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            readOnly: true,
                                            afterrender: "number_change_afterrender",
                                            cls: "m-r5",
                                            listeners: {
                                                vmdafterrender: number_change_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "number_changeDelete",
                                            type: "(none)",
                                            size: "small",
                                            width: 30,
                                            icon: "delete",
                                            margins: "0 0 0 5",
                                            click: "number_changeDelete_click",
                                            listeners: {
                                                click: number_changeDelete_click
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
        this.setInfo = function(info, flag) {
            //直接填写方法内容
            setInfo(info, flag)
        }
        this.getInfo = function() {
            //直接填写方法内容
            getInfo()
        }
        this.hideEmpty = function() {
            //直接填写方法内容
            number_allowEmpty.hide()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.InputNumberProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.InputNumberProperty");
    }
})