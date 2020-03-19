Ext.define('vmd.ux.inputRadioButtonProperty.Controller', {
    xtype: 'vmd.ux.inputRadioButtonProperty.Controller',
    constructor: function(options) {
        this.type = 'radioButton'
        this.scope = options
        this.colHide = false
        this.colWidth = '100'
        this.dicFirst = true;
        this.txtAlign = "1"
        this.allowEdit = false;
        this.adaptive = false;
        this.displayRow = '';
        this.rowMargin = '';
        this.displayStyle = 'round'
        this.dataSet = ''
        this.saveField = ''
        this.displayField = ''
        this.click = ''
        this.change = ''
    },
    setValue: function(info, flag) {
        if (info) {
            this.allowEdit = info.settings.allowEdit;
            this.adaptive = info.settings.adaptive;
            this.displayRow = info.settings.displayRow;
            this.rowMargin = info.settings.rowMargin;
            this.displayStyle = info.settings.displayStyle;
            this.dataSet = info.datas.dataSet;
            this.saveField = info.datas.saveField;
            this.displayField = info.datas.displayField;
            if (!flag) {
                this.click = info.events.click;
                this.change = info.events.change;
            }
            this.colHide = info.settings.colHide
            this.colWidth = info.settings.colWidth
            this.dicFirst = info.settings.dicFirst
            this.txtAlign = info.settings.txtAlign
            if (this.scope) {
                this.scope.allowEdit.setValue(this.allowEdit)
                this.scope.adaptive.setValue(this.adaptive)
                this.scope.displayRow.setValue(this.displayRow)
                this.scope.rowMargin.setValue(this.rowMargin)
                this.scope.displayStyle.setValue(this.displayStyle)
                this.scope.dataSet.setValue(this.dataSet)
                this.scope.saveField.setValue(this.saveField)
                this.scope.displayField.setValue(this.displayField)
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
                adaptive: this.adaptive,
                displayRow: this.displayRow,
                rowMargin: this.rowMargin,
                displayStyle: this.displayStyle,
                colHide: this.colHide,
                colWidth: this.colWidth,
                dicFirst: this.dicFirst,
                txtAlign: this.txtAlign
            },
            events: {
                click: this.click,
                change: this.change
            },
            datas: {
                dataSet: this.dataSet,
                saveField: this.saveField,
                displayField: this.displayField
            },
            type: 'radioButton'
        }
        return json;
    }
})
Ext.define("vmd.ux.InputRadioButtonProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ClickText$1.0$ClickText"]),
    version: "1.0",
    xtype: "vmd.ux.InputRadioButtonProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 500,
    height: 621,
    layout: "fit",
    beforerender: "InputRadioButtonProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.InputRadioButtonProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.InputRadioButtonProperty'
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
            var store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'value']
            });
            var store1 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'value']
            });
            var activePropPanel = parent.xds && parent.xds.active.component.propPanel;
            //获取数据集方法
            function getDatasets() {
                return activePropPanel && activePropPanel.controller.getDatasets() || [];
            }

            function InputRadioButtonProperty_beforerender(sender) {
                //对数据集、保存字段、显示字段进行设置
                dataSet.store = store;
                dataSet.valueField = 'value'
                dataSet.displayField = 'name'
                saveField.store = store1;
                saveField.valueField = 'value'
                saveField.displayField = 'name'
                displayField.store = store1;
                displayField.valueField = 'value'
                displayField.displayField = 'name'
            }

            function MyTabs_tabchange(sender, tab) {
                var temp = [];
                var nameSet = [];
                var dataSets = getDatasets();
                for (var i = 0; i < dataSets.length; i++) {
                    nameSet.push({
                        name: dataSets[i].name,
                        value: dataSets[i].name
                    })
                    if (dataSets[i].name == dataSet.getValue()) {
                        for (var n = 0; n < dataSets[i].fields.length; n++) {
                            temp.push({
                                name: dataSets[i].fields[n],
                                value: dataSets[i].fields[n]
                            })
                        }
                    }
                }
                store.loadData(nameSet);
                store1.loadData(temp)
                page.fields = temp;
            }

            function dataSet_selectChanged(sender, combo, record, index) {
                var temp = [];
                var dataSets = getDatasets();
                for (var i = 0; i < dataSets.length; i++) {
                    if (dataSets[i].name == record.data.name) {
                        for (var n = 0; n < dataSets[i].fields.length; n++) {
                            temp.push({
                                name: dataSets[i].fields[n],
                                value: dataSets[i].fields[n]
                            })
                        }
                    }
                }
                store1.loadData(temp)
                page.fields = temp;
                saveField.setValue("");
                displayField.setValue("");
                page.fireEvent('data_dataSet_changed', dataSet.getValue())
            }

            function click_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'radio_click', sender.getValue(), 'grid,cell,rId,cInd');
                })
            }

            function change_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'radio_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
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
                p1: 'vmd.ux.InputRadioButtonProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.InputRadioButtonProperty_beforerender = InputRadioButtonProperty_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 600,
            tabchange: "MyTabs_tabchange",
            activeItem: "panel",
            listeners: {
                tabchange: MyTabs_tabchange
            },
            items: [{
                    xtype: "panel",
                    id: "panel",
                    title: "属性",
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
                            height: 80,
                            anchor: "100%",
                            layout: "auto",
                            autoHeight: true,
                            items: [{
                                    xtype: "checkbox",
                                    id: "allowEdit",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "允许编辑",
                                    margins: "0 0 5 0"
                                },
                                {
                                    xtype: "label",
                                    id: "label",
                                    text: "布局：",
                                    margins: "0 0 5 0",
                                    hidden: true
                                },
                                {
                                    xtype: "checkbox",
                                    id: "adaptive",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "自适应",
                                    margins: "",
                                    hidden: true
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
                            height: 30,
                            anchor: "100%",
                            layout: "border",
                            hidden: true,
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div9",
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
                                        id: "displayRow",
                                        layout: "border",
                                        margins: "5 0 0 5",
                                        anchor: "100%"
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
                                        id: "label1",
                                        text: "展示列数：",
                                        width: 60
                                    }]
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
                            height: 30,
                            anchor: "100%",
                            layout: "border",
                            hidden: true,
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
                                        id: "rowMargin",
                                        layout: "border",
                                        margins: "5 0 0 5",
                                        width: 167,
                                        anchor: "100%"
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div14",
                                    layoutConfig: {
                                        align: "center",
                                        pack: "center"
                                    },
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 48,
                                    height: 50,
                                    region: "west",
                                    layout: "vbox",
                                    items: [{
                                        xtype: "label",
                                        id: "label2",
                                        text: "行间距："
                                    }]
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div10",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 26,
                            layout: "vbox",
                            items: [{
                                xtype: "label",
                                id: "label3",
                                text: "展示样式：",
                                margins: "5 0 0 0"
                            }]
                        },
                        {
                            xtype: "radiostoregroup",
                            id: "displayStyle",
                            width: 200,
                            height: 40,
                            labelField: "label",
                            valueField: "value",
                            checkedField: "checked",
                            boxFieldName: "myRadio",
                            margins: "5 0 0 10",
                            items: [{
                                    xtype: "radio",
                                    id: "round",
                                    boxLabel: "圆形",
                                    width: 64,
                                    inputValue: "round",
                                    checked: true
                                },
                                {
                                    xtype: "radio",
                                    id: "square",
                                    boxLabel: "方形",
                                    inputValue: "square",
                                    checked: false
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "数据",
                    header: false,
                    border: false,
                    height: 100,
                    layout: "anchor",
                    padding: "5",
                    items: [{
                            xtype: "vmd.div",
                            id: "div2",
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
                                    text: "数据集：",
                                    width: 60,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "dataSet",
                                    width: 350,
                                    height: 270,
                                    anchor: "-60",
                                    selectChanged: "dataSet_selectChanged",
                                    listeners: {
                                        selectChanged: dataSet_selectChanged
                                    }
                                }
                            ]
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
                            layout: "anchor",
                            margins: "5 0 0 5",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label5",
                                    text: "保存字段：",
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "saveField",
                                    width: 350,
                                    height: 270,
                                    anchor: "-60"
                                }
                            ]
                        },
                        {
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
                                    id: "label6",
                                    text: "显示字段：",
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "displayField",
                                    width: 350,
                                    height: 270,
                                    anchor: "-60"
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel2",
                    title: "事件",
                    header: false,
                    border: false,
                    height: 100,
                    layout: "anchor",
                    padding: "5",
                    items: [{
                            xtype: "vmd.div",
                            id: "div5",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 35,
                            margins: "5 0 0 5",
                            layout: "anchor",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label7",
                                    text: "click:",
                                    width: 50,
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
                                    height: 34,
                                    layout: "anchor",
                                    margins: "5 0 0 5",
                                    anchor: "-50",
                                    items: [{
                                            xtype: "textfield",
                                            id: "click",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
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
                            id: "div7",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 35,
                            margins: "5 0 0 5",
                            layout: "anchor",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label8",
                                    text: "change:",
                                    width: 50,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div8",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 34,
                                    layout: "anchor",
                                    margins: "5 0 0 5",
                                    anchor: "-50",
                                    items: [{
                                            xtype: "textfield",
                                            id: "change",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.InputRadioButtonProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.InputRadioButtonProperty");
    }
})