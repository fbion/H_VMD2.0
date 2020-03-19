Ext.define('vmd.ux.inputComboTreeProperty.Controller', {
    xtype: 'vmd.ux.inputComboTreeProperty.Controller',
    constructor: function(options) {
        this.type = 'comboTree'
        this.scope = options
        this.colHide = false
        this.colWidth = '100'
        this.dicFirst = true;
        this.txtAlign = "1"
        this.ct_width = ''
        this.ct_height = ''
        this.chooseType = ''
        this.allowEmpty = true;
        this.emptyAlert = ''
        this.dataSet = ''
        this.displayField = ''
        this.valueField = ''
        this.leafValue = ''
        this.rootValue = ''
        this.rootText = ''
        this.parentField = ''
        this.filter = ''
        this.click = ''
        this.change = ''
    },
    serialize: function() {
        var json = {
            settings: {
                ct_width: this.ct_width,
                ct_height: this.ct_height,
                chooseType: this.chooseType,
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
            datas: {
                dataSet: this.dataSet,
                displayField: this.displayField,
                valueField: this.valueField,
                leafValue: this.leafValue,
                rootValue: this.rootValue,
                rootText: this.rootText,
                parentField: this.parentField,
                filter: this.filter
            },
            type: 'comboTree'
        }
        return json
    },
    setValue: function(info, flag) {
        if (info) {
            this.colHide = info.settings.colHide
            this.colWidth = info.settings.colWidth
            this.dicFirst = info.settings.dicFirst
            this.txtAlign = info.settings.txtAlign
            this.ct_width = info.settings.ct_width;
            this.ct_height = info.settings.ct_height;
            this.chooseType = info.settings.chooseType;
            this.allowEmpty = info.settings.allowEmpty;
            this.emptyAlert = info.settings.emptyAlert;
            this.dataSet = info.datas.dataSet;
            this.displayField = info.datas.displayField;
            this.valueField = info.datas.valueField;
            this.leafValue = info.datas.leafValue;
            this.rootValue = info.datas.rootValue;
            this.rootText = info.datas.rootText;
            this.parentField = info.datas.parentField;
            this.filter = info.datas.filter;
            if (!flag) {
                this.click = info.events.click;
                this.change = info.events.change;
            }
            if (this.scope) {
                this.scope.ct_width.setValue(this.ct_width)
                this.scope.ct_height.setValue(this.ct_height)
                this.scope.chooseType.setValue(this.chooseType)
                this.scope.allowEmpty.setValue(this.allowEmpty)
                this.scope.emptyAlert.setValue(this.emptyAlert)
                this.scope.dataSet.setValue(this.dataSet)
                this.scope.displayField.setValue(this.displayField)
                this.scope.valueField.setValue(this.valueField)
                this.scope.leafValue.setValue(this.leafValue)
                this.scope.rootValue.setValue(this.rootValue)
                this.scope.rootText.setValue(this.rootText)
                this.scope.parentField.setValue(this.parentField)
                this.scope.filter.setValue(this.filter)
                if (!flag) {
                    this.scope.click.setValue(this.click)
                    this.scope.change.setValue(this.change)
                }
            }
        }
    }
})
Ext.define("vmd.ux.InputComboTreeProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ClickText$1.0$ClickText"]),
    version: "1.0",
    xtype: "vmd.ux.InputComboTreeProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 500,
    height: 621,
    layout: "fit",
    beforerender: "InputComboTreeProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.InputComboTreeProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.InputComboTreeProperty'
                }, ex, 50);
            }
        }
    },
    uxCss: ".flex {    display: flex}.m-r5 {    margin-right: 5px}.line35 {    line-height: 35px}",
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
            var data = [{
                name: '全部',
                value: ''
            }, {
                name: '只选父',
                value: 'parent'
            }, {
                name: '只选叶子',
                value: 'leaf'
            }];
            store.loadData(data);
            var activePropPanel = parent.xds && parent.xds.active.component.propPanel;
            //获取数据集方法
            function getDatasets() {
                return activePropPanel && activePropPanel.controller.getDatasets() || [];
            }
            var store1 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'value']
            });
            var store2 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'value']
            });

            function ct_width_plus(sender) {
                if (ct_width.getValue() < 1)
                    ct_width.setValue(parseFloat(110))
                else
                    ct_width.setValue(parseFloat(ct_width.getValue()) + 10)
                this.fireEvent('updateValue', sender, 'ct_width', this.getValue())
            }

            function ct_width_minus(sender) {
                if (this.getValue() >= 1) {
                    this.setValue(parseFloat(this.getValue()) - 10)
                }
                if (this.getValue() < 0) this.setValue(0);
                this.fireEvent('updateValue', sender, 'ct_width', this.getValue())
            }

            function allowEmpty_check(sender, checked) {
                if (checked) {
                    div24.hide()
                } else {
                    div24.show()
                }
            }

            function InputComboTreeProperty_beforerender(sender) {
                dataSet.store = store1;
                dataSet.displayField = 'name';
                dataSet.valueField = 'value'
                displayField.store = store2;
                displayField.displayField = 'name';
                displayField.valueField = 'value'
                valueField.store = store2;
                valueField.displayField = 'name';
                valueField.valueField = 'value'
                leafValue.store = store2;
                leafValue.displayField = 'name';
                leafValue.valueField = 'value'
                rootValue.store = store2;
                rootValue.displayField = 'name';
                rootValue.valueField = 'value'
                rootText.store = store2;
                rootText.displayField = 'name';
                rootText.valueField = 'value'
                parentField.store = store2;
                parentField.displayField = 'name';
                parentField.valueField = 'value'
            }

            function chooseType_afterrender(sender) {
                sender.store = store;
                sender.displayField = 'name'
                sender.valueField = 'value'
                this.setValue('')
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
                store2.loadData(temp)
                displayField.setValue("");
                valueField.setValue("");
                leafValue.setValue("");
                rootValue.setValue("");
                rootText.setValue("");
                parentField.setValue("");
            }

            function dataSet_afterrender(sender) {
                //   vmd(sender.el.dom).on('click', function() {
                //         var names = getDatasets();
                //         if (names && names.length > 0) {
                //             var nameSet = [];
                //             for (var i = 0; i < names.length; i++) {
                //                 nameSet.push({
                //                     name: names[i].name,
                //                     value: names[i].name
                //                 })
                //             }
                //         }
                //         if (nameSet) {
                //             store1.loadData(nameSet);
                //         }
                //     })
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
                store1.loadData(nameSet);
                store2.loadData(temp)
                page.fields = temp;
            }

            function panel_beforerender(sender) {}

            function click_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'tree_click', sender.getValue(), 'grid,cell,rId,cInd');
                })
            }

            function change_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'tree_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
                })
            }

            function changeDelete_click(sender, e) {
                change.setValue('');
                change.fireEvent('change', change, '')
            }

            function clickDelete_click(sender, e) {
                click.setValue('');
                click.fireEvent('change', click, '')
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.InputComboTreeProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.InputComboTreeProperty_beforerender = InputComboTreeProperty_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            x: 40,
            y: 100,
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
                    beforerender: "panel_beforerender",
                    listeners: {
                        beforerender: panel_beforerender
                    },
                    items: [{
                            xtype: "vmd.div",
                            id: "div17",
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
                                    id: "div18",
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
                                        id: "ct_width",
                                        layout: "border",
                                        margins: "5 0 0 5",
                                        width: 150,
                                        anchor: "100%",
                                        plus: "ct_width_plus",
                                        minus: "ct_width_minus",
                                        listeners: {
                                            plus: ct_width_plus,
                                            minus: ct_width_minus
                                        }
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div19",
                                    layoutConfig: {
                                        align: "center",
                                        pack: "center"
                                    },
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 30,
                                    height: 50,
                                    region: "west",
                                    autoHeight: false,
                                    autoWidth: true,
                                    layout: "vbox",
                                    items: [{
                                        xtype: "label",
                                        id: "label",
                                        text: "宽度：",
                                        margins: "",
                                        width: 37
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div20",
                                    layoutConfig: {
                                        align: "center",
                                        pack: "center"
                                    },
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    region: "east",
                                    layout: "vbox",
                                    items: [{
                                        xtype: "label",
                                        id: "label1",
                                        text: "%",
                                        margins: ""
                                    }]
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
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div2",
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
                                        id: "ct_height",
                                        allowBlank: true,
                                        enableKeyEvents: true,
                                        anchor: "100%",
                                        margins: "5 0 0 5"
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div21",
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
                                        id: "label2",
                                        text: "高度：",
                                        margins: ""
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
                            height: 35,
                            anchor: "100%",
                            layout: "border",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div22",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 50,
                                    region: "center",
                                    layout: "anchor",
                                    items: [{
                                        xtype: "vmd.comlist",
                                        id: "chooseType",
                                        width: 350,
                                        height: 270,
                                        afterrender: "chooseType_afterrender",
                                        anchor: "100%",
                                        listeners: {
                                            vmdafterrender: chooseType_afterrender
                                        }
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div23",
                                    layoutConfig: {
                                        align: "center",
                                        pack: "center"
                                    },
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 86,
                                    height: 50,
                                    region: "west",
                                    layout: "vbox",
                                    items: [{
                                        xtype: "label",
                                        id: "label3",
                                        text: "节点选择方式：",
                                        margins: ""
                                    }]
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
                            height: 30,
                            check: "allowEmpty_check",
                            listeners: {
                                check: allowEmpty_check
                            }
                        },
                        {
                            xtype: "vmd.div",
                            id: "div24",
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
                                    id: "div25",
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
                                        anchor: "100%",
                                        margins: "5 0 0 5"
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div26",
                                    layoutConfig: {
                                        align: "center",
                                        pack: "center"
                                    },
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 68,
                                    height: 50,
                                    region: "west",
                                    layout: "vbox",
                                    items: [{
                                        xtype: "label",
                                        id: "label4",
                                        text: "空值提示：",
                                        width: 61
                                    }]
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
                                    id: "label5",
                                    text: "数据集：",
                                    width: 62
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "dataSet",
                                    width: 350,
                                    height: 270,
                                    anchor: "-60",
                                    selectChanged: "dataSet_selectChanged",
                                    afterrender: "dataSet_afterrender",
                                    listeners: {
                                        selectChanged: dataSet_selectChanged,
                                        vmdafterrender: dataSet_afterrender
                                    }
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
                                    id: "label6",
                                    text: "显示字段：",
                                    width: 61
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "displayField",
                                    width: 350,
                                    height: 270,
                                    anchor: "-60"
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
                                    id: "label7",
                                    text: "值字段：",
                                    width: 60
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "valueField",
                                    width: 350,
                                    height: 270,
                                    anchor: "-60"
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
                            layout: "anchor",
                            margins: "5 0 0 5",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label8",
                                    text: "节点字段：",
                                    width: 60
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "leafValue",
                                    width: 350,
                                    height: 270,
                                    anchor: "-60"
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
                                    id: "label9",
                                    text: "根植：",
                                    width: 50
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "rootValue",
                                    width: 350,
                                    height: 270,
                                    anchor: "-50"
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div9",
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
                                    id: "label10",
                                    text: "根节点文本：",
                                    width: 75
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "rootText",
                                    width: 350,
                                    height: 270,
                                    anchor: "-75"
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
                            height: 35,
                            layout: "anchor",
                            margins: "5 0 0 5",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label11",
                                    text: "父列字段：",
                                    width: 60
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "parentField",
                                    width: 350,
                                    height: 270,
                                    anchor: "-60"
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div11",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 106,
                            margins: "5 0 0 5",
                            layout: "anchor",
                            anchor: "100%",
                            hidden: true,
                            items: [{
                                    xtype: "label",
                                    id: "label12",
                                    text: "过滤条件："
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div12",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 50,
                                    layout: "anchor",
                                    anchor: "100%",
                                    items: [{
                                            xtype: "textfield",
                                            id: "filter",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "80%",
                                            margins: "5 0 0 5",
                                            width: 125
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "filterDelete",
                                            type: "(none)",
                                            size: "small",
                                            width: 30,
                                            icon: "delete",
                                            margins: "5 0 0 5"
                                        }
                                    ]
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
                            id: "div13",
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
                                    id: "label13",
                                    text: "click:",
                                    width: 40,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div14",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 40,
                                    layout: "anchor",
                                    anchor: "-40",
                                    items: [{
                                            xtype: "textfield",
                                            id: "click",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            margins: "5 0 0 5",
                                            readOnly: true,
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
                            id: "div15",
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
                                    id: "label14",
                                    text: "change:",
                                    width: 45,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div16",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 40,
                                    layout: "anchor",
                                    anchor: "100%",
                                    items: [{
                                            xtype: "textfield",
                                            id: "change",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            margins: "5 0 0 5",
                                            readOnly: true,
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
            //直接填写方法内容
            setInfo(info)
        }
        this.getInfo = function() {
            //直接填写方法内容
            return page.controller;
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.InputComboTreeProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.InputComboTreeProperty");
    }
})