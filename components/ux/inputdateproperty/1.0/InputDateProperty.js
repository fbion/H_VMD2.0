Ext.define('vmd.ux.inputDateProperty.Controller', {
    xtype: 'vmd.ux.inputDateProperty.Controller',
    constructor: function(options) {
        this.scope = options;
        this.type = 'date'
        this.colHide = false;
        this.colWidth = '100'
        this.dicFirst = true;
        this.txtAlign = "3"
        this.allowEdit = true;
        this.customFormat = false
        this.format = ''
        this.customFormats = ''
        this.defaultNow = false
        this.allowEmpty = false;
        this.emptyAlert = ''
        this.click = ''
        this.change = ''
        this.dblclick = ''
    },
    setValue: function(info, flag) {
        if (info) {
            this.allowEdit = info.settings.allowEdit
            this.customFormat = info.settings.customFormat
            this.format = info.settings.format
            this.customFormats = info.settings.customFormats
            this.defaultNow = info.settings.defaultNow
            this.allowEmpty = info.settings.allowEmpty
            this.emptyAlert = info.settings.emptyAlert
            if (!flag) {
                this.click = info.events.click
                this.change = info.events.change
                this.dblclick = info.events.dblclick
            }
            this.colHide = info.settings.colHide
            this.colWidth = info.settings.colWidth
            this.dicFirst = info.settings.dicFirst
            this.txtAlign = info.settings.txtAlign
            if (this.scope) {
                this.scope.allowEdit.setValue(this.allowEdit)
                this.scope.customFormat.setValue(this.customFormat)
                this.scope.format.setValue(this.format)
                this.scope.customFormats.setValue(this.customFormats)
                this.scope.defaultNow.setValue(this.defaultNow)
                this.scope.allowEmpty.setValue(this.allowEmpty)
                this.scope.emptyAlert.setValue(this.emptyAlert)
                if (!flag) {
                    this.scope.click.setValue(this.click)
                    this.scope.change.setValue(this.change)
                    this.scope.dblclick.setValue(this.dblclick)
                }
            }
        }
    },
    serialize: function() {
        var json = {
            settings: {
                allowEdit: this.allowEdit,
                customFormat: this.customFormat,
                format: this.format,
                customFormats: this.customFormats,
                defaultNow: this.defaultNow,
                allowEmpty: this.allowEmpty,
                emptyAlert: this.emptyAlert,
                colHide: this.colHide,
                colWidth: this.colWidth,
                dicFirst: this.dicFirst,
                txtAlign: this.txtAlign
            },
            events: {
                click: this.click,
                change: this.change,
                dblclick: this.dblclick
            },
            type: 'date'
        }
        return json;
    }
})
Ext.define("vmd.ux.InputDateProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.InputDateProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 500,
    height: 621,
    layout: "fit",
    beforerender: "InputDateProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.InputDateProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.InputDateProperty'
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
            var store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'id']
            });
            var data = [{
                name: 'yyyy-MM-dd',
                id: '%Y-%m-%d'
            }, {
                name: 'yyyy年MM月dd日',
                id: '%Y年%m月%d日'
            }, {
                name: 'yyyy年MM月dd日 hh时mm分',
                id: '%Y年%m月%d日 %H时%i分'
            }, {
                name: 'yyyyMMdd',
                id: '%Y%m%d'
            }, {
                name: 'yyyyMM',
                id: '%Y%m'
            }, {
                name: 'yyyy',
                id: '%Y'
            }, {
                name: 'hh时mm分',
                id: '%H时%i分'
            }, {
                name: 'yyyy年',
                id: '%Y年'
            }, {
                name: 'hh时mm分',
                id: '%H时%i分'
            }];
            store.loadData(data);

            function customFormat_check(sender, checked) {
                closeFormat()
                checked ? customFormats.show() : format.show();
                div1.doLayout();
            }

            function allowEmpty_check(sender, checked) {
                checked ? emptyDiv.hide() : emptyDiv.show()
                panel.doLayout()
            }

            function closeFormat() {
                format.hide();
                customFormats.hide();
            }

            function InputDateProperty_beforerender(sender) {}

            function format_beforerender(sender) {
                this.store = store;
                this.displayField = "name"
                this.valueField = "id"
            }

            function click_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'date_click', sender.getValue(), 'grid,cell,rId,cInd');
                })
            }

            function change_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'date_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
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

            function panel_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.InputDateProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.InputDateProperty_beforerender = InputDateProperty_beforerender;
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
                    beforerender: "panel_beforerender",
                    listeners: {
                        beforerender: panel_beforerender
                    },
                    items: [{
                            xtype: "checkbox",
                            id: "allowEdit",
                            fieldLabel: "Checkbox",
                            boxLabel: "允许编辑",
                            anchor: "100%",
                            margins: "5 0 0 5",
                            height: 30
                        },
                        {
                            xtype: "checkbox",
                            id: "customFormat",
                            fieldLabel: "Checkbox",
                            boxLabel: "自定义格式",
                            anchor: "100%",
                            margins: "5 0 0 5",
                            check: "customFormat_check",
                            height: 25,
                            listeners: {
                                check: customFormat_check
                            }
                        },
                        {
                            xtype: "vmd.div",
                            id: "div3",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 35,
                            anchor: "100%",
                            layout: "border",
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
                                            xtype: "vmd.combo",
                                            id: "format",
                                            width: 146,
                                            anchor: "-5",
                                            beforerender: "format_beforerender",
                                            listeners: {
                                                beforerender: format_beforerender
                                            }
                                        },
                                        {
                                            xtype: "textfield",
                                            id: "customFormats",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "100%",
                                            hidden: true
                                        }
                                    ]
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
                                    width: 38,
                                    height: 50,
                                    region: "west",
                                    layout: "vbox",
                                    items: [{
                                        xtype: "label",
                                        id: "label",
                                        text: "格式："
                                    }]
                                }
                            ]
                        },
                        {
                            xtype: "checkbox",
                            id: "defaultNow",
                            fieldLabel: "Checkbox",
                            boxLabel: "默认当前时间",
                            anchor: "100%",
                            margins: "5 0 0 5"
                        },
                        {
                            xtype: "vmd.div",
                            id: "div2",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 22,
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
                                    style: "color: #ddd"
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
                            checked: true,
                            check: "allowEmpty_check",
                            listeners: {
                                check: allowEmpty_check
                            }
                        },
                        {
                            xtype: "vmd.div",
                            id: "emptyDiv",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 30,
                            margins: "5 0 0 5",
                            layout: "border",
                            hidden: true,
                            anchor: "100%",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div",
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
                                        anchor: "-5",
                                        margins: "5 0 0 5"
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div1",
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
                                        text: "空值提示："
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
                    header: true,
                    border: true,
                    height: 100,
                    layout: "anchor",
                    padding: "5",
                    items: [{
                            xtype: "vmd.div",
                            id: "div4",
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
                                    id: "div5",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 33,
                                    margins: "5 0 0 5",
                                    layout: "anchor",
                                    anchor: "-30",
                                    items: [{
                                            xtype: "textfield",
                                            id: "click",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            margins: "0 0 0 5",
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
                                            margins: "0 0 0 5",
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
                            id: "div6",
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
                                    width: 50,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div7",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 33,
                                    margins: "5 0 0 5",
                                    layout: "anchor",
                                    anchor: "-50",
                                    items: [{
                                            xtype: "textfield",
                                            id: "change",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            margins: "0 0 0 5",
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
                                            margins: "0 0 0 5",
                                            click: "changeDelete_click",
                                            listeners: {
                                                click: changeDelete_click
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div8",
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
                            hidden: true,
                            items: [{
                                    xtype: "label",
                                    id: "label6",
                                    text: "dblclick:",
                                    width: 50,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div9",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 33,
                                    margins: "5 0 0 5",
                                    layout: "anchor",
                                    anchor: "-50",
                                    items: [{
                                            xtype: "textfield",
                                            id: "dblclick",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            margins: "0 0 0 5",
                                            cls: "m-r5"
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "dblclickDelete",
                                            type: "(none)",
                                            size: "small",
                                            icon: "delete",
                                            width: 30,
                                            margins: "0 0 0 5"
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.InputDateProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.InputDateProperty");
    }
})