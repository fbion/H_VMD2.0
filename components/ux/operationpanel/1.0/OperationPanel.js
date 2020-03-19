Ext.define('vmd.ux.operationPanel.Controller', {
    xtype: 'vmd.ux.operationPanel.Controller',
    constructor: function(scope) {
        this.scope = scope;
        this.addbar = true;
        this.addCls = ''
        this.addName = ''
        this.deletebar = true;
        this.deleteCls = ''
        this.deleteName = ''
        this.savebar = true;
        this.saveCls = ''
        this.saveName = ''
        this.printbar = true;
        this.printCls = ''
        this.printName = ''
        this.exData = true;
        this.exDataCls = ''
        this.exDataName = ''
        // this.click = ''
        this.exType = 'all'
        this.addEvent = ''
        this.delEvent = ''
        this.saveEvent = ''
        this.imEvent = ''
    },
    setValue: function(info) {
        this.addbar = info.addbar;
        this.addCls = info.addCls;
        this.addName = info.addName;
        this.deletebar = info.deletebar;
        this.deleteCls = info.deleteCls;
        this.deleteName = info.deleteName;
        this.savebar = info.savebar;
        this.saveCls = info.saveCls;
        this.saveName = info.saveName;
        this.printbar = info.printbar;
        this.printCls = info.printCls;
        this.printName = info.printName;
        this.exData = info.exData;
        this.exDataCls = info.exDataCls;
        this.exDataName = info.exDataName;
        // this.click = info.click;
        this.exType = info.exType
        this.addEvent = info.addEvent
        this.delEvent = info.delEvent
        this.saveEvent = info.saveEvent
        this.imEvent = info.imEvent
        this.scope.addEvent.setValue(this.addEvent)
        this.scope.delEvent.setValue(this.delEvent)
        this.scope.saveEvent.setValue(this.saveEvent)
        this.scope.imEvent.setValue(this.imEvent)
        this.scope.addbar.setValue(this.addbar)
        this.scope.addCls.setValue(this.addCls)
        this.scope.addName.setValue(this.addName)
        this.scope.deletebar.setValue(this.deletebar)
        this.scope.deleteCls.setValue(this.deleteCls)
        this.scope.deleteName.setValue(this.deleteName)
        this.scope.savebar.setValue(this.savebar)
        this.scope.saveCls.setValue(this.saveCls)
        this.scope.saveName.setValue(this.saveName)
        this.scope.printbar.setValue(this.printbar)
        this.scope.printCls.setValue(this.printCls)
        this.scope.printName.setValue(this.printName)
        this.scope.exData.setValue(this.exData)
        this.scope.exDataCls.setValue(this.exDataCls)
        this.scope.exDataName.setValue(this.exDataName)
        // this.scope.click.setValue(this.click)
        this.scope.exType.setValue(this.exType)
    },
    serialize: function() {
        // debugger
        var json = {
            addbar: this.addbar,
            addCls: this.addCls,
            addName: this.addName,
            deletebar: this.deletebar,
            deleteCls: this.deleteCls,
            deleteName: this.deleteName,
            savebar: this.savebar,
            saveCls: this.saveCls,
            saveName: this.saveName,
            printbar: this.printbar,
            printCls: this.printCls,
            printName: this.printName,
            exData: this.exData,
            exDataCls: this.exDataCls,
            exDataName: this.exDataName,
            click: this.click,
            exType: this.exType,
            addEvent: this.addEvent,
            delEvent: this.delEvent,
            saveEvent: this.saveEvent,
            imEvent: this.imEvent
        }
        return json;
    }
})
Ext.define("vmd.ux.OperationPanel", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.OperationPanel",
    title: "Panel",
    header: false,
    border: false,
    width: 300,
    height: 603,
    layout: "fit",
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
        this.controller = new vmd.ux.operationPanel.Controller(this);
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var data = [{
            name: '不限制',
            value: 'all'
        }, {
            name: '只允许导入',
            value: 'justIm'
        }, {
            name: '只允许导出',
            value: 'justEx'
        }];
        store.loadData(data)
        var page = this;
        this.on('afterrender', function() {
            this.cascade(function(item) {
                item.on('change', function(a, b, c) {
                    changeAttribute(a, b)
                })
                item.on("check", function(a, b, c) {
                    changeAttribute(a, b)
                })
                item.on("select", function(a, b, c) {
                    changeAttribute(a, b)
                })
            })
        })

        function changeAttribute(a, b) {
            var inst = page.controller;
            var id = a.initialConfig.id;
            inst[id] = b;
            page.fireEvent('settingChangedEvent')
        }

        function click_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var publicmethod = xds.active.component.propPanel.controller;
                publicmethod.openCodeEditor(sender, 'click', sender.getValue(), 'operateType');
            })
        }

        function exType_afterrender(sender) {
            sender.setValue('all')
        }

        function exType_beforerender(sender) {
            exType.store = store;
            exType.displayField = 'name'
            exType.valueField = 'value'
        }

        function add_event_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var publicmethod = xds.active.component.propPanel.controller;
                publicmethod.openCodeEditor(sender, 'addEvent', sender.getValue());
                page.controller.addEvent = sender.getValue()
            })
        }

        function button_click(sender, e) {
            page.controller.addEvent = ''
            addEvent.setValue('')
            page.fireEvent('settingChangedEvent')
        }

        function del_event_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var publicmethod = xds.active.component.propPanel.controller;
                publicmethod.openCodeEditor(sender, 'delEvent', sender.getValue());
                page.controller.delEvent = sender.getValue()
            })
        }

        function save_event_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var publicmethod = xds.active.component.propPanel.controller;
                publicmethod.openCodeEditor(sender, 'saveEvent', sender.getValue());
                page.controller.saveEvent = sender.getValue()
            })
        }

        function im_event_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var publicmethod = xds.active.component.propPanel.controller;
                publicmethod.openCodeEditor(sender, 'imEvent', sender.getValue());
                page.controller.imEvent = sender.getValue()
            })
        }

        function button1_click(sender, e) {
            page.controller.delEvent = ''
            delEvent.setValue('')
            page.fireEvent('settingChangedEvent')
        }

        function button2_click(sender, e) {
            page.controller.saveEvent = ''
            saveEvent.setValue('')
            page.fireEvent('settingChangedEvent')
        }

        function button3_click(sender, e) {
            page.controller.imEvent = ''
            imEvent.setValue('')
            page.fireEvent('settingChangedEvent')
        }
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "配置",
            header: false,
            border: false,
            height: 130,
            region: "north",
            layout: "vbox",
            autoScroll: true,
            items: [{
                    xtype: "panel",
                    id: "panel22",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 10
                },
                {
                    xtype: "panel",
                    id: "panel2",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 128,
                    width: 292,
                    items: [{
                            xtype: "panel",
                            id: "panel3",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                xtype: "checkbox",
                                id: "addbar",
                                fieldLabel: "Checkbox",
                                boxLabel: "追加",
                                x: 10,
                                margins: "0 0 0 20",
                                checked: true
                            }]
                        },
                        {
                            xtype: "panel",
                            id: "panel4",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div1",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 40,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label1",
                                    text: "样式类名:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "addCls",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    readOnly: false
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel5",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            width: 470,
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div2",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 65,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label2",
                                    text: "名称:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "addName",
                                    allowBlank: true,
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div",
                            layoutConfig: {
                                align: "middle",
                                pack: "start"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 33,
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label",
                                    text: "事件：",
                                    margins: "0 0 0 65"
                                },
                                {
                                    xtype: "textfield",
                                    id: "addEvent",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    afterrender: "add_event_afterrender",
                                    width: 160,
                                    listeners: {
                                        vmdafterrender: add_event_afterrender
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "button",
                                    type: "text",
                                    size: "small",
                                    icon: "delete",
                                    margins: "0 0 0 5",
                                    style: "color: red",
                                    click: "button_click",
                                    listeners: {
                                        click: button_click
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel6",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 127,
                    width: 291,
                    items: [{
                            xtype: "panel",
                            id: "panel7",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                xtype: "checkbox",
                                id: "deletebar",
                                fieldLabel: "Checkbox",
                                boxLabel: "删除",
                                x: 10,
                                margins: "0 0 0 20",
                                checked: true
                            }]
                        },
                        {
                            xtype: "panel",
                            id: "panel8",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            width: 301,
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div3",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 40,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label3",
                                    text: "样式类名:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "deleteCls",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    readOnly: false
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel9",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div4",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 65,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label4",
                                    text: "名称:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "deleteName",
                                    allowBlank: true,
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div11",
                            layoutConfig: {
                                align: "middle",
                                pack: "start"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 33,
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label12",
                                    text: "事件：",
                                    margins: "0 0 0 65"
                                },
                                {
                                    xtype: "textfield",
                                    id: "delEvent",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    afterrender: "del_event_afterrender",
                                    width: 160,
                                    listeners: {
                                        vmdafterrender: del_event_afterrender
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "button1",
                                    type: "text",
                                    size: "small",
                                    icon: "delete",
                                    margins: "0 0 0 5",
                                    style: "color: red",
                                    click: "button1_click",
                                    listeners: {
                                        click: button1_click
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel10",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 130,
                    width: 296,
                    items: [{
                            xtype: "panel",
                            id: "panel11",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                xtype: "checkbox",
                                id: "savebar",
                                fieldLabel: "Checkbox",
                                boxLabel: "保存",
                                x: 10,
                                margins: "0 0 0 20",
                                checked: true
                            }]
                        },
                        {
                            xtype: "panel",
                            id: "panel12",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div5",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 40,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label5",
                                    text: "样式类名:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "saveCls",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    readOnly: false
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel13",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div6",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 65,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label6",
                                    text: "名称:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "saveName",
                                    allowBlank: true,
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div13",
                            layoutConfig: {
                                align: "middle",
                                pack: "start"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 33,
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label13",
                                    text: "事件：",
                                    margins: "0 0 0 65"
                                },
                                {
                                    xtype: "textfield",
                                    id: "saveEvent",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    afterrender: "save_event_afterrender",
                                    width: 160,
                                    listeners: {
                                        vmdafterrender: save_event_afterrender
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "button2",
                                    type: "text",
                                    size: "small",
                                    icon: "delete",
                                    margins: "0 0 0 5",
                                    style: "color: red",
                                    click: "button2_click",
                                    listeners: {
                                        click: button2_click
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel14",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 100,
                    width: 296,
                    hidden: true,
                    items: [{
                            xtype: "panel",
                            id: "panel15",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                xtype: "checkbox",
                                id: "printbar",
                                fieldLabel: "Checkbox",
                                boxLabel: "打印",
                                x: 10,
                                margins: "0 0 0 20",
                                checked: true
                            }]
                        },
                        {
                            xtype: "panel",
                            id: "panel16",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div7",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 40,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label7",
                                    text: "样式类名:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "printCls",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    readOnly: false
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel17",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div8",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 65,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label8",
                                    text: "名称:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "printName",
                                    allowBlank: true,
                                    enableKeyEvents: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel18",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 196,
                    width: 295,
                    items: [{
                            xtype: "panel",
                            id: "panel19",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            width: 295,
                            items: [{
                                xtype: "checkbox",
                                id: "exData",
                                fieldLabel: "Checkbox",
                                boxLabel: "导数据",
                                x: 10,
                                margins: "0 0 0 20",
                                checked: true
                            }]
                        },
                        {
                            xtype: "panel",
                            id: "panel20",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div9",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 40,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label9",
                                    text: "样式类名:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "exDataCls",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    readOnly: false
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel21",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div10",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 65,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label10",
                                    text: "名称:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "exDataName",
                                    allowBlank: true,
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div12",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 38,
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label11",
                                    text: "控制：",
                                    margins: "10 0 0 65"
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "exType",
                                    width: 146,
                                    height: 270,
                                    margins: "5 0 0 0",
                                    afterrender: "exType_afterrender",
                                    beforerender: "exType_beforerender",
                                    listeners: {
                                        vmdafterrender: exType_afterrender,
                                        beforerender: exType_beforerender
                                    }
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div14",
                            layoutConfig: {
                                align: "middle",
                                pack: "start"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 33,
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label14",
                                    text: "事件：",
                                    margins: "0 0 0 65"
                                },
                                {
                                    xtype: "textfield",
                                    id: "imEvent",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    afterrender: "im_event_afterrender",
                                    width: 160,
                                    listeners: {
                                        vmdafterrender: im_event_afterrender
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "button3",
                                    type: "text",
                                    size: "small",
                                    icon: "delete",
                                    margins: "0 0 0 5",
                                    style: "color: red",
                                    click: "button3_click",
                                    listeners: {
                                        click: button3_click
                                    }
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
        this.setValue = function(configs) {
            //直接填写方法内容
            page.controller.setValue(configs)
        }
        this.serialize = function() {
            //直接填写方法内容
            return page.controller.serialize()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.OperationPanel");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.OperationPanel");
    }
})