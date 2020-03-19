Ext.define('vmd.ux.inputExpProperty.Controller', {
    xtype: 'vmd.ux.inputExpProperty.Controller',
    constructor: function(options) {
        this.type = 'exp'
        this.exp_value = '';
        this.exp_change = ''
        this.exp_click = ''
    },
    setValue: function(info, flag) {
        if (info) {
            this.exp_value = info.settings.exp_value;
            if (!flag) {
                this.exp_change = info.events.exp_change;
                this.exp_click = info.events.exp_click;
            }
            this.colHide = info.settings.colHide;
            this.colWidth = info.settings.colWidth;
            if (this.scope) {
                this.scope.exp_value.setValue(this.exp_value)
                if (!flag) {
                    this.scope.exp_change.setValue(this.exp_change)
                    this.scope.exp_click.setValue(this.exp_click)
                }
            }
        }
    },
    serialize: function() {
        var json = {
            settings: {
                exp_value: this.exp_value,
                colHide: this.colHide,
                colWidth: this.colWidth
            },
            events: {
                exp_change: this.exp_change,
                exp_click: this.exp_click
            },
            type: 'exp'
        }
        return json;
    }
})
Ext.define("vmd.ux.InputExpProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.InputExpProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 500,
    height: 707,
    layout: "fit",
    beforerender: "InputExpProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.InputExpProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.InputExpProperty'
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

            function btn_exp_click(sender, e) {
                //打开表达式定义界面
            }

            function exp_click_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'exp_click', sender.getValue(), 'grid,cell,rId,cInd');
                })
            }

            function exp_change_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'exp_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
                })
            }

            function InputExpProperty_beforerender(sender) {}

            function exp_clickDelete_click(sender, e) {
                exp_click.setValue('');
                exp_click.fireEvent('change', exp_click, '')
            }

            function exp_changeDelete_click(sender, e) {
                exp_change.setValue('');
                exp_change.fireEvent('change', exp_change, '')
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.InputExpProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.InputExpProperty_beforerender = InputExpProperty_beforerender;
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
                        xtype: "vmd.div",
                        id: "div",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        layout: "border",
                        margins: "5 0 0 5",
                        anchor: "100%",
                        items: [{
                                xtype: "vmd.div",
                                id: "hwDiv",
                                layoutConfig: {
                                    align: "middle"
                                },
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 56,
                                height: 50,
                                region: "west",
                                layout: "hbox",
                                items: [{
                                    xtype: "label",
                                    id: "hwLabel",
                                    text: "显示值："
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "hwDiv1",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 400,
                                height: 50,
                                region: "center",
                                layout: "fit",
                                items: [{
                                    xtype: "textarea",
                                    id: "txta_exp",
                                    allowBlank: true
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "hwDiv2",
                                layoutConfig: {
                                    align: "middle"
                                },
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 100,
                                height: 50,
                                region: "east",
                                layout: "hbox",
                                items: [{
                                    xtype: "vmd.button",
                                    id: "btn_exp",
                                    text: "...",
                                    type: "(none)",
                                    size: "small",
                                    click: "btn_exp_click",
                                    margins: "0 0 0 10",
                                    listeners: {
                                        click: btn_exp_click
                                    }
                                }]
                            }
                        ]
                    }]
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
                                            id: "exp_click",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            readOnly: true,
                                            afterrender: "exp_click_afterrender",
                                            cls: "m-r5",
                                            listeners: {
                                                vmdafterrender: exp_click_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "exp_clickDelete",
                                            type: "(none)",
                                            size: "small",
                                            width: 30,
                                            icon: "delete",
                                            margins: "0 0 0 5",
                                            click: "exp_clickDelete_click",
                                            listeners: {
                                                click: exp_clickDelete_click
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
                                            id: "exp_change",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            readOnly: true,
                                            afterrender: "exp_change_afterrender",
                                            cls: "m-r5",
                                            listeners: {
                                                vmdafterrender: exp_change_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "exp_changeDelete",
                                            type: "(none)",
                                            size: "small",
                                            width: 30,
                                            icon: "delete",
                                            margins: "0 0 0 5",
                                            click: "exp_changeDelete_click",
                                            listeners: {
                                                click: exp_changeDelete_click
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.InputExpProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.InputExpProperty");
    }
})