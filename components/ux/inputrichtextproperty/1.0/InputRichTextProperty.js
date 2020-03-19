Ext.define('vmd.ux.inputRichTextProperty.Controller', {
    xtype: 'vmd.ux.inputRichTextProperty.Controller',
    constructor: function(options) {
        this.type = 'richText'
        this.scope = options;
        this.colHide = false
        this.colWidth = '100'
        this.dicFirst = true;
        this.txtAlign = "1";
        this.allowEdit = false
        this.segmentPadding = ''
        this.allowEmpty = false;
        this.emptyAlert = ''
        this.click = ''
        this.change = ''
    },
    setValue: function(info, flag) {
        if (info) {
            this.allowEdit = info.settings.allowEdit
            this.segmentPadding = info.settings.segmentPadding
            this.allowEmpty = info.settings.allowEmpty
            this.emptyAlert = info.settings.emptyAlert
            if (!flag) {
                this.click = info.events.click
                this.change = info.events.change
            }
            this.colHide = info.settings.colHide
            this.colWidth = info.settings.colWidth
            this.dicFirst = info.settings.dicFirst
            this.txtAlign = info.settings.txtAlign
            if (this.scope) {
                this.scope.allowEdit.setValue(this.allowEdit)
                this.scope.segmentPadding.setValue(this.segmentPadding)
                this.scope.allowEmpty.setValue(this.allowEmpty)
                this.scope.emptyAlert.setValue(this.emptyAlert)
                if (!flag) {
                    this.scope.click.setValue(this.click)
                    this.scope.change.setValue(this.change)
                }
            }
        }
    },
    serialize: function() {
        var json = {
            settings: {
                allowEdit: this.allowEdit,
                segmentPadding: this.segmentPadding,
                allowEmpty: this.allowEmpty,
                emptyAlert: this.emptyAlert,
                colHide: this.colHide,
                colWidth: this.colWidth,
                dicFirst: this.dicFirst,
                txtAlign: this.txtAlign
            },
            events: {
                click: this.click,
                change: this.change
            },
            type: 'richText'
        }
        return json;
    }
})
Ext.define("vmd.ux.InputRichTextProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ClickText$1.0$ClickText"]),
    version: "1.0",
    xtype: "vmd.ux.InputRichTextProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 500,
    height: 621,
    layout: "fit",
    beforerender: "InputRichTextProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.InputRichTextProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.InputRichTextProperty'
                }, ex, 50);
            }
        }
    },
    uxCss: ".flex{    display: flex}.m-r5{    margin-right: 5px}.line35{    line-height: 35px}",
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
            //获取数据集方法
            function getDatasets() {
                return activePropPanel && activePropPanel.controller.getDatasets() || [];
            }

            function allowEmpty_check(sender, checked) {
                checked ? div.hide() : div.show()
                panel.doLayout()
            }

            function segmentPadding_plus(sender) {
                this.setValue(parseFloat(this.getValue()) + 1)
                page.fireEvent('updateValue', page, 'segmentPadding', this.getValue())
            }

            function segmentPadding_minus(sender) {
                if (this.getValue() >= 1) {
                    this.setValue(parseFloat(this.getValue()) - 1)
                }
                if (this.getValue() < 0) this.setValue(0)
                page.fireEvent('updateValue', page, 'segmentPadding', this.getValue())
            }

            function InputRichTextProperty_beforerender(sender) {}

            function click_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'richtext_click', sender.getValue(), 'grid,cell,rId,cInd');
                })
            }

            function change_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'richtext_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
                })
            }

            function clickDelete_click(sender, e) {
                click.setValue('');
                click.fireEvent('change', click, '')
            }

            function changeDelete_click(sender, e) {
                change.setValue('');
                change.fireEvent('change', change, '')
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.InputRichTextProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.InputRichTextProperty_beforerender = InputRichTextProperty_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            activeItem: "panel",
            items: [{
                    xtype: "panel",
                    id: "panel",
                    title: "属性",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "anchor",
                    padding: "5",
                    items: [{
                            xtype: "checkbox",
                            id: "allowEdit",
                            fieldLabel: "Checkbox",
                            boxLabel: "允许编辑",
                            anchor: "100%",
                            margins: "5 0 0 5"
                        },
                        {
                            xtype: "vmd.div",
                            id: "div7",
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
                                    id: "div8",
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
                                        id: "segmentPadding",
                                        layout: "border",
                                        margins: "5 0 0 5",
                                        width: 153,
                                        anchor: "-10",
                                        plus: "segmentPadding_plus",
                                        minus: "segmentPadding_minus",
                                        listeners: {
                                            plus: segmentPadding_plus,
                                            minus: segmentPadding_minus
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
                                    width: 66,
                                    height: 50,
                                    region: "west",
                                    layout: "vbox",
                                    items: [{
                                        xtype: "label",
                                        id: "label",
                                        text: "段前缩进："
                                    }]
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div1",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 23,
                            margins: "5 0 0 5",
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label1",
                                    text: "校验"
                                },
                                {
                                    xtype: "label",
                                    id: "label2",
                                    text: "——————————",
                                    margins: "0 0 0 5",
                                    style: "color:#ddd;"
                                }
                            ]
                        },
                        {
                            xtype: "checkbox",
                            id: "allowEmpty",
                            fieldLabel: "Checkbox",
                            boxLabel: "允许为空",
                            anchor: "100%",
                            margins: "5 0 0 5",
                            check: "allowEmpty_check",
                            checked: true,
                            listeners: {
                                check: allowEmpty_check
                            }
                        },
                        {
                            xtype: "vmd.div",
                            id: "div",
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
                                        id: "emptyAlert",
                                        allowBlank: true,
                                        enableKeyEvents: true,
                                        anchor: "-10",
                                        margins: "5 0 0 5"
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div11",
                                    layoutConfig: {
                                        align: "center",
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
                                        id: "label3",
                                        text: "空值提示：",
                                        margins: ""
                                    }]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "事件",
                    header: false,
                    border: false,
                    height: 100,
                    layout: "anchor",
                    padding: "5",
                    items: [{
                            xtype: "vmd.div",
                            id: "div3",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 35,
                            layout: "anchor",
                            margins: "5 0 0 5",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label4",
                                    text: "click:",
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
                                    width: 400,
                                    height: 37,
                                    layout: "anchor",
                                    margins: "",
                                    anchor: "-30",
                                    items: [{
                                            xtype: "textfield",
                                            id: "click",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            margins: "5 0 0 5",
                                            cls: "m-r5",
                                            afterrender: "click_afterrender",
                                            listeners: {
                                                vmdafterrender: click_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "clickDelete",
                                            type: "(none)",
                                            size: "small",
                                            icon: "delete",
                                            width: 30,
                                            margins: "5 0 0 5",
                                            anchor: "",
                                            click: "clickDelete_click",
                                            listeners: {
                                                click: clickDelete_click
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div5",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 35,
                            layout: "anchor",
                            margins: "5 0 0 5",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label5",
                                    text: "change:",
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div6",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 37,
                                    layout: "anchor",
                                    margins: "5 0 0 5",
                                    anchor: "100%",
                                    items: [{
                                            xtype: "textfield",
                                            id: "change",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            margins: "5 0 0 5",
                                            cls: "m-r5",
                                            afterrender: "change_afterrender",
                                            listeners: {
                                                vmdafterrender: change_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "changeDelete",
                                            type: "(none)",
                                            size: "small",
                                            icon: "delete",
                                            width: 30,
                                            margins: "5 0 0 5",
                                            click: "changeDelete_click",
                                            listeners: {
                                                click: changeDelete_click
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
            getInfo()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.InputRichTextProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.InputRichTextProperty");
    }
})