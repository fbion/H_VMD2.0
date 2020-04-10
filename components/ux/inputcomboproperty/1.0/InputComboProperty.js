Ext.define('vmd.ux.inputComboProperty.Controller', {
    xtype: 'vmd.ux.inputComboProperty.Controller',
    constructor: function(options) {
        this.type = 'combo'
        this.scope = options;
        this.colHide = false
        this.colWidth = '100'
        this.txtAlign = "1";
        this.dicFirst = true;
        this.allowEdit = true;
        this.combo_width = '';
        this.allowMulti = false;
        this.noValueClear = false;
        this.combo_height = '';
        this.allowEmpty = true;
        this.emptyAlert = '';
        this.splitStr = ',';
        this.dataSet = '';
        this.saveField = ''
        this.displayField = '';
        this.filter = ''
        this.click = ''
        this.change = ''
        this.beforeClick = ''
    },
    setValue: function(info, flag) {
        if (info) {
            this.allowEdit = info.settings.allowEdit;
            this.combo_width = info.settings.combo_width;
            this.allowMulti = info.settings.allowMulti;
            this.noValueClear = info.settings.noValueClear;
            this.combo_height = info.settings.combo_height;
            this.allowEmpty = info.settings.allowEmpty;
            this.emptyAlert = info.settings.emptyAlert;
            this.splitStr = info.settings.splitStr;
            if (info.datas) {
                this.dataSet = info.datas.dataSet;
                this.saveField = info.datas.saveField;
                this.displayField = info.datas.displayField;
                this.filter = info.datas.filter;
            }
            if (!flag) {
                this.click = info.events.click;
                this.change = info.events.change;
                this.beforeClick = info.events.beforeClick
            }
            this.colHide = info.settings.colHide
            this.colWidth = info.settings.colWidth
            this.dicFirst = info.settings.dicFirst
            this.txtAlign = info.settings.txtAlign
            if (this.scope) {
                this.scope.allowEdit.setValue(this.allowEdit)
                this.scope.combo_width.setValue(this.combo_width)
                this.scope.allowMulti.setValue(this.allowMulti)
                this.scope.noValueClear.setValue(this.noValueClear)
                this.scope.combo_height.setValue(this.combo_height)
                this.scope.allowEmpty.setValue(this.allowEmpty)
                this.scope.emptyAlert.setValue(this.emptyAlert)
                this.scope.splitStr.setValue(this.splitStr)
                this.scope.dataSet.setValue(this.dataSet)
                this.scope.saveField.setValue(this.saveField)
                this.scope.displayField.setValue(this.displayField)
                this.scope.filter.setValue(this.filter)
                if (!flag) {
                    this.scope.click.setValue(this.click)
                    this.scope.change.setValue(this.change)
                    this.scope.beforeClick.setValue(this.beforeClick)
                }
            }
        }
    },
    serialize: function() {
        var json = {
            settings: {
                allowEdit: this.allowEdit,
                combo_width: this.combo_width,
                allowMulti: this.allowMulti,
                noValueClear: this.noValueClear,
                combo_height: this.combo_height,
                allowEmpty: this.allowEmpty,
                emptyAlert: this.emptyAlert,
                splitStr: this.splitStr,
                colHide: this.colHide,
                colWidth: this.colWidth,
                dicFirst: this.dicFirst,
                txtAlign: this.txtAlign
            },
            events: {
                click: this.click,
                change: this.change,
                beforeClick: this.beforeClick
            },
            datas: {
                dataSet: this.dataSet,
                saveField: this.saveField,
                displayField: this.displayField,
                filter: this.filter
            },
            type: 'combo'
        }
        return json;
    }
})
Ext.define("vmd.ux.InputComboProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ClickText$1.0$ClickText"]),
    version: "1.0",
    xtype: "vmd.ux.InputComboProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 500,
    height: 800,
    layout: "fit",
    afterrender: "InputComboProperty_afterrender",
    beforerender: "InputComboProperty_beforerender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.InputComboProperty_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.InputComboProperty'
                }, ex, 50);
            }
        },
        beforerender: function() {
            try {
                this.InputComboProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.InputComboProperty'
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
            var store2 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'value']
            });
            var activePropPanel = parent.xds && parent.xds.active.component.propPanel;
            //获取数据集方法
            function getDatasets() {
                return activePropPanel && activePropPanel.controller.getDatasets() || [];
            }

            function allowEmpty_check(sender, checked) {
                checked ? emptyAlertDiv.hide() : emptyAlertDiv.show();
                panel.doLayout()
            }

            function combo_width_plus(sender) {
                if (combo_width.getValue() < 1)
                    combo_width.setValue(parseFloat(110))
                else
                    combo_width.setValue(parseFloat(combo_width.getValue()) + 10);
                this.fireEvent('updateValue', sender, 'combo_width', this.getValue())
            }

            function combo_width_minus(sender) {
                if (combo_width.getValue() >= 1) {
                    combo_width.setValue(parseFloat(combo_width.getValue()) - 10)
                }
                if (combo_width.getValue() < 0) combo_width.setValue(0);
                this.fireEvent('updateValue', sender, 'combo_width', this.getValue())
            }

            function click_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'combo_click', sender.getValue(), 'grid,cell,rId,cInd');
                })
            }

            function change_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'combo_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
                })
            }

            function InputComboProperty_afterrender(sender) {
                // vmd(sender.el.dom).on('click', function() {
                //     var names = getDatasets();
                //     if (names && names.length > 0) {
                //         var nameSet = [];
                //         for (var i = 0; i < names.length; i++) {
                //             nameSet.push({
                //                 name: names[i].name,
                //                 value: names[i].name
                //             })
                //         }
                //     }
                //     if (nameSet) {
                //         store.loadData(nameSet);
                //     }
                // })
            }

            function InputComboProperty_beforerender(sender) {
                //对数据集、保存字段、显示字段进行设置
                dataSet.store = store;
                dataSet.valueField = 'value'
                dataSet.displayField = 'name'
                saveField.store = store1;
                saveField.valueField = 'value'
                saveField.displayField = 'name'
                displayField.store = store2;
                displayField.valueField = 'value'
                displayField.displayField = 'name'
            }

            function dataSet_afterrender(sender) {}

            function dataSet_selectChanged(sender, combo, record, index) {
                //sender.setValue(record.data.name)
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
                store1.loadData(temp)
                page.fields = temp;
                saveField.setValue("");
                displayField.setValue("");
                page.fireEvent('data_dataSet_changed', dataSet.getValue())
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
                store2.loadData(temp)
                store1.loadData(temp)
                page.fields = temp;
            }

            function clickDelete_click(sender, e) {
                click.setValue('');
                click.fireEvent('change', click, '')
            }

            function changeDelete_click(sender, e) {
                change.setValue('');
                change.fireEvent('change', change, '')
            }

            function beforeClick_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'combo_beforeClick', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
                })
            }

            function beforeClickdelete_click(sender, e) {
                beforeClick.setValue(values);
                beforeClick.fireEvent('change', beforeClick, "")
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.InputComboProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.InputComboProperty_afterrender = InputComboProperty_afterrender;
        this.InputComboProperty_beforerender = InputComboProperty_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            x: 70,
            y: 130,
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
                    padding: "5px",
                    items: [{
                            xtype: "checkbox",
                            id: "allowEdit",
                            fieldLabel: "Checkbox",
                            boxLabel: "允许编辑",
                            anchor: "100%",
                            margins: "5 0 0 05",
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
                            height: 35,
                            margins: "5 0 0 5",
                            layout: "anchor",
                            anchor: "100%",
                            items: [{
                                xtype: "vmd.div",
                                id: "div13",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 183,
                                height: 30,
                                layout: "anchor",
                                anchor: "100%",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div17",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 103,
                                    height: 30,
                                    layout: "border",
                                    anchor: "100%",
                                    items: [{
                                            xtype: "vmd.div",
                                            id: "div16",
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 119,
                                            height: 25,
                                            region: "center",
                                            layout: "anchor",
                                            items: [{
                                                xtype: "vmd.ux.ClickText",
                                                id: "combo_width",
                                                layout: "border",
                                                margins: "5 0 0 5",
                                                width: 100,
                                                plus: "combo_width_plus",
                                                minus: "combo_width_minus",
                                                anchor: "100%",
                                                listeners: {
                                                    plus: combo_width_plus,
                                                    minus: combo_width_minus
                                                }
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div15",
                                            layoutConfig: {
                                                pack: "center",
                                                align: "middle"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 38,
                                            height: 50,
                                            region: "west",
                                            layout: "hbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label",
                                                text: "宽度："
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div14",
                                            layoutConfig: {
                                                align: "top",
                                                pack: "center"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 17,
                                            height: 10,
                                            region: "east",
                                            layout: "hbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label5",
                                                text: "%",
                                                margins: "10 0 0 5",
                                                width: 12,
                                                height: 18
                                            }]
                                        }
                                    ]
                                }]
                            }]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div1",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 176,
                            height: 30,
                            layout: "anchor",
                            margins: "5 0 0 5",
                            anchor: "100%",
                            items: [{
                                xtype: "vmd.div",
                                id: "div4",
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
                                        id: "div18",
                                        layoutConfig: {
                                            align: "middle"
                                        },
                                        autoEl: "div",
                                        border: false,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "top left",
                                        width: 36,
                                        height: 50,
                                        region: "west",
                                        layout: "hbox",
                                        items: [{
                                            xtype: "label",
                                            id: "label1",
                                            text: "高度："
                                        }]
                                    },
                                    {
                                        xtype: "vmd.div",
                                        id: "div19",
                                        autoEl: "div",
                                        border: false,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "top left",
                                        width: 79,
                                        height: 50,
                                        region: "center",
                                        layout: "anchor",
                                        items: [{
                                            xtype: "textfield",
                                            id: "combo_height",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-10",
                                            margins: "5 0 0 5"
                                        }]
                                    }
                                ]
                            }]
                        },
                        {
                            xtype: "checkbox",
                            id: "allowMulti",
                            fieldLabel: "Checkbox",
                            boxLabel: "多选",
                            anchor: "100%",
                            margins: "5 0 0 05",
                            height: 30
                        },
                        {
                            xtype: "vmd.div",
                            id: "hwDiv",
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
                                    id: "hwDiv1",
                                    layoutConfig: {
                                        align: "middle",
                                        pack: "start"
                                    },
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 80,
                                    height: 30,
                                    region: "west",
                                    layout: "hbox",
                                    items: [{
                                        xtype: "label",
                                        id: "hwLabel",
                                        text: "多选分隔符:",
                                        region: "center",
                                        width: 75
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "hwDiv2",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 50,
                                    region: "center",
                                    layout: "fit",
                                    items: [{
                                        xtype: "textfield",
                                        id: "splitStr",
                                        allowBlank: true,
                                        enableKeyEvents: true,
                                        region: "west",
                                        emptyText: "默认,"
                                    }]
                                }
                            ]
                        },
                        {
                            xtype: "checkbox",
                            id: "noValueClear",
                            fieldLabel: "Checkbox",
                            boxLabel: "下拉框无对应值清空",
                            anchor: "100%",
                            margins: "5 0 0 5",
                            height: 30
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
                                    id: "label2",
                                    text: "校验"
                                },
                                {
                                    xtype: "label",
                                    id: "label3",
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
                            height: 30,
                            listeners: {
                                check: allowEmpty_check
                            }
                        },
                        {
                            xtype: "vmd.div",
                            id: "emptyAlertDiv",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 50,
                            margins: "5 0 0 5",
                            layout: "anchor",
                            hidden: true,
                            anchor: "100%",
                            items: [{
                                    xtype: "label",
                                    id: "label4",
                                    text: "空值提示："
                                },
                                {
                                    xtype: "textfield",
                                    id: "emptyAlert",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    anchor: "80%",
                                    margins: "5 0 0 5"
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
                    padding: "5px",
                    items: [{
                            xtype: "vmd.div",
                            id: "div3",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 30,
                            layout: "anchor",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label6",
                                    text: "数据集：",
                                    margins: "5 0 0 5"
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "dataSet",
                                    width: 350,
                                    height: 270,
                                    afterrender: "dataSet_afterrender",
                                    selectChanged: "dataSet_selectChanged",
                                    anchor: "-50",
                                    listeners: {
                                        vmdafterrender: dataSet_afterrender,
                                        selectChanged: dataSet_selectChanged
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
                            height: 30,
                            layout: "anchor",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label7",
                                    text: "保存字段：",
                                    margins: "5 0 0 5"
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
                            id: "div6",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 30,
                            layout: "anchor",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label8",
                                    text: "显示字段：",
                                    margins: "5 0 0 5",
                                    height: 24
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
                            id: "div7",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 40,
                            layout: "anchor",
                            anchor: "100%",
                            hidden: true,
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label9",
                                    text: "过滤条件：",
                                    margins: "5 0 0 5",
                                    cls: "line35",
                                    width: 69,
                                    height: 29
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div12",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 37,
                                    layout: "anchor",
                                    margins: "5 0 0 5",
                                    anchor: "-50",
                                    hidden: false,
                                    items: [{
                                            xtype: "textfield",
                                            id: "filter",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-35",
                                            margins: "5 0 0 0",
                                            width: 125,
                                            readOnly: true
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "filterButton",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
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
                    padding: "5px",
                    items: [{
                            xtype: "vmd.div",
                            id: "hwDiv3",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            height: 35,
                            layout: "anchor",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "hwLabel1",
                                    text: "beforeClick:",
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "hwDiv4",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 37,
                                    anchor: "-50",
                                    layout: "anchor",
                                    items: [{
                                            xtype: "textfield",
                                            id: "beforeClick",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-32",
                                            readOnly: true,
                                            cls: "m-r5",
                                            width: 125,
                                            afterrender: "beforeClick_afterrender",
                                            listeners: {
                                                vmdafterrender: beforeClick_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "beforeClickdelete",
                                            type: "(none)",
                                            size: "small",
                                            width: 30,
                                            icon: "delete",
                                            click: "beforeClickdelete_click",
                                            listeners: {
                                                click: beforeClickdelete_click
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
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label10",
                                    text: "click:",
                                    margins: "5 0 0 5",
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
                                    height: 37,
                                    layout: "anchor",
                                    anchor: "1",
                                    items: [{
                                            xtype: "textfield",
                                            id: "click",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            margins: "5 0 0 5",
                                            readOnly: true,
                                            afterrender: "click_afterrender",
                                            cls: "m-r5",
                                            listeners: {
                                                vmdafterrender: click_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "clickDelete",
                                            type: "(none)",
                                            size: "small",
                                            width: 30,
                                            icon: "delete",
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
                            id: "div10",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 35,
                            layout: "anchor",
                            anchor: "1",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label11",
                                    text: "change:",
                                    margins: "5 0 0 5",
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div11",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 38,
                                    layout: "anchor",
                                    anchor: "1",
                                    items: [{
                                            xtype: "textfield",
                                            id: "change",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            margins: "5 0 0 5",
                                            readOnly: true,
                                            afterrender: "change_afterrender",
                                            cls: "m-r5",
                                            listeners: {
                                                vmdafterrender: change_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "changeDelete",
                                            type: "(none)",
                                            size: "small",
                                            width: 30,
                                            icon: "delete",
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
            return page.controller.getValue();
        }
        this.setAllowEmpty = function(checked) {
            //直接填写方法内容
            allowEmpty.setValue(checked);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.InputComboProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.InputComboProperty");
    }
})