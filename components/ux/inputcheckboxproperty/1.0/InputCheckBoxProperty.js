Ext.define('vmd.ux.inputCheckBoxProperty.Controller', {
    xtype: 'vmd.ux.inputCheckBoxProperty.Controller',
    constructor: function(options) {
        this.scope = options;
        this.type = 'checkbox';
        this.displayLabel = ''
        this.allowEdit = true;
        this.allowMulti = false;
        this.allowEmpty = false;
        this.emptyAlert = '';
        this.symbol = ',';
        this.provideAll = false
        this.provideOther = false
        this.autolayout = false
        this.displayCol = '3'
        this.rowMargin = '1'
        this.colHide = false
        this.colWidth = '100'
        this.txtAlign = "1"
        this.dicFirst = true;
        this.dataSet = ''
        this.saveField = ''
        this.displayField = ''
        this.filter = ''
        this.click = ''
        this.change = ''
        this.allChange = ''
    },
    setValue: function(info, flag) {
        // 
        if (info) {
            this.allowEdit = info.settings.allowEdit;
            this.displayLabel = info.displayLabel
            this.allowMulti = info.settings.allowMulti;
            this.allowEmpty = info.settings.allowEmpty;
            this.emptyAlert = info.settings.emptyAlert;
            this.dataSet = info.datas.dataSet;
            this.saveField = info.datas.saveField;
            this.displayField = info.datas.displayField;
            this.filter = info.datas.filter;
            if (!flag) {
                this.click = info.events.click;
                this.change = info.events.change;
                this.allChange = info.events.allChange;
            }
            this.symbol = info.settings.symbol
            this.provideAll = info.settings.provideAll
            this.provideOther = info.settings.provideOther
            this.autolayout = info.settings.autolayout
            this.displayCol = info.settings.displayCol
            this.rowMargin = info.settings.rowMargin
            this.colHide = info.settings.colHide
            this.colWidth = info.settings.colWidth
            this.dicFirst = info.settings.dicFirst
            this.txtAlign = info.settings.txtAlign
            if (this.scope) {
                this.scope.symbol.setValue(this.symbol)
                this.scope.displayLabel.setValue(this.displayLabel)
                this.scope.provideAll.setValue(this.provideAll)
                this.scope.provideOther.setValue(this.provideOther)
                this.scope.autolayout.setValue(this.autolayout)
                this.scope.displayCol.setValue(this.displayCol)
                this.scope.rowMargin.setValue(this.rowMargin)
                this.scope.allowEdit.setValue(this.allowEdit)
                this.scope.allowMulti.setValue(this.allowMulti)
                this.scope.allowEmpty.setValue(this.allowEmpty)
                this.scope.emptyAlert.setValue(this.emptyAlert)
                this.scope.dataSet.setValue(this.dataSet)
                this.scope.saveField.setValue(this.saveField)
                this.scope.displayField.setValue(this.displayField)
                this.scope.filter.setValue(this.filter)
                if (!flag) {
                    this.scope.click.setValue(this.click)
                    this.scope.change.setValue(this.change)
                    this.scope.allChange.setValue(this.allChange)
                }
            }
        }
    },
    serialize: function() {
        var json = {
            settings: {
                displayLabel: this.displayLabel,
                allowEdit: this.allowEdit,
                allowMulti: this.allowMulti,
                allowEmpty: this.allowEmpty,
                emptyAlert: this.emptyAlert,
                symbol: this.symbol,
                provideAll: this.provideAll,
                provideOther: this.provideOther,
                autolayout: this.autolayout,
                displayCol: this.displayCol,
                rowMargin: this.rowMargin,
                colHide: this.colHide,
                colWidth: this.colWidth,
                dicFirst: this.dicFirst,
                txtAlign: this.txtAlign
            },
            events: {
                click: this.click,
                change: this.change,
                allChange: this.allChange
            },
            datas: {
                dataSet: this.dataSet,
                saveField: this.saveField,
                displayField: this.displayField,
                filter: this.filter
            },
            type: 'checkbox'
        }
        return json;
    }
})
Ext.define("vmd.ux.InputCheckBoxProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ClickText$1.0$ClickText"]),
    version: "1.0",
    xtype: "vmd.ux.InputCheckBoxProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 500,
    height: 621,
    layout: "fit",
    beforerender: "InputCheckBoxProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.InputCheckBoxProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.InputCheckBoxProperty'
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

            function InputCheckBoxProperty_beforerender(sender) {
                //   page.controller = new vmd.ux.inputCheckBoxProperty.Controller;
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

            function click_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'chkbox_click', sender.getValue(), 'grid,cell,rId,cInd');
                })
            }

            function change_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'chkbox_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
                })
            }

            function allowEmpty_check(sender, checked) {
                checked ? emptyAlertDiv.hide() : emptyAlertDiv.show();
                panel.doLayout()
            }

            function allowMulti_check(sender, checked) {
                checked ? multiDiv.show() : multiDiv.hide()
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
                sender.setValue(record.data.name)
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

            function clickDelete_click(sender, e) {
                click.setValue('');
                click.fireEvent('change', click, '')
            }

            function changeDelete_click(sender, e) {
                change.setValue('');
                change.fireEvent('change', change, '')
            }

            function allChangeDelete_click(sender, e) {
                allChange.setValue('');
                allChange.fireEvent('change', allChange, '')
            }

            function allChange_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'allchkbox_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
                })
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.InputCheckBoxProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.InputCheckBoxProperty_beforerender = InputCheckBoxProperty_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            tabchange: "MyTabs_tabchange",
            activeItem: "panel",
            listeners: {
                tabchange: MyTabs_tabchange
            },
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
                            width: 146,
                            margins: "5 0 0 5"
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
                                        xtype: "textfield",
                                        id: "displayLabel",
                                        allowBlank: true,
                                        enableKeyEvents: true,
                                        anchor: "-10"
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div23",
                                    layoutConfig: {
                                        align: "middle",
                                        pack: "center"
                                    },
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 71,
                                    height: 50,
                                    region: "west",
                                    layout: "hbox",
                                    items: [{
                                        xtype: "label",
                                        id: "label12",
                                        text: "显示标签："
                                    }]
                                }
                            ]
                        },
                        {
                            xtype: "checkbox",
                            id: "allowMulti",
                            fieldLabel: "Checkbox",
                            boxLabel: "多组",
                            anchor: "100%",
                            margins: "5 0 0 5",
                            height: 30,
                            check: "allowMulti_check",
                            listeners: {
                                check: allowMulti_check
                            }
                        },
                        {
                            xtype: "vmd.div",
                            id: "multiDiv",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 100,
                            anchor: "100%",
                            hidden: true,
                            layout: "anchor",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div13",
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
                                            id: "div14",
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
                                                id: "symbol",
                                                allowBlank: true,
                                                enableKeyEvents: true,
                                                anchor: "-10",
                                                region: "center"
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div15",
                                            layoutConfig: {
                                                align: "middle",
                                                pack: "center"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 55,
                                            height: 50,
                                            region: "west",
                                            layout: "hbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label10",
                                                text: "分隔符：",
                                                region: "west",
                                                height: 28
                                            }]
                                        }
                                    ]
                                },
                                {
                                    xtype: "checkbox",
                                    id: "provideAll",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "提供全选",
                                    anchor: "100%",
                                    height: 30
                                },
                                {
                                    xtype: "checkbox",
                                    id: "provideOther",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "提供其他项",
                                    anchor: "100%",
                                    height: 30
                                },
                                {
                                    xtype: "checkbox",
                                    id: "autolayout",
                                    fieldLabel: "Checkbox",
                                    boxLabel: "布局自适应",
                                    anchor: "100%",
                                    height: 30,
                                    hidden: true
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div16",
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
                                            id: "div17",
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
                                                id: "displayCol",
                                                layout: "border",
                                                width: 347,
                                                anchor: "-10"
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div18",
                                            layoutConfig: {
                                                align: "middle",
                                                pack: "center"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 80,
                                            height: 50,
                                            region: "west",
                                            layout: "hbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label9",
                                                text: "展示列数：",
                                                region: "west",
                                                height: 28,
                                                width: 71
                                            }]
                                        }
                                    ]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div19",
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
                                            id: "div20",
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
                                                anchor: "-10"
                                            }]
                                        },
                                        {
                                            xtype: "vmd.div",
                                            id: "div21",
                                            layoutConfig: {
                                                align: "middle",
                                                pack: "center"
                                            },
                                            autoEl: "div",
                                            border: false,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "top left",
                                            width: 55,
                                            height: 50,
                                            region: "west",
                                            layout: "hbox",
                                            items: [{
                                                xtype: "label",
                                                id: "label11",
                                                text: "行间距：",
                                                region: "west",
                                                height: 28
                                            }]
                                        }
                                    ]
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
                            height: 22,
                            margins: "5 0 0 5",
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label",
                                    text: "校验"
                                },
                                {
                                    xtype: "label",
                                    id: "label1",
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
                            checked: true,
                            check: "allowEmpty_check",
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
                            height: 30,
                            margins: "",
                            layout: "border",
                            hidden: true,
                            anchor: "100%",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div1",
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
                                        id: "label2",
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
                    title: "数据",
                    header: true,
                    border: true,
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
                                    id: "label3",
                                    text: "数据集：",
                                    width: 50,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "dataSet",
                                    width: 350,
                                    height: 270,
                                    anchor: "-50",
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
                                    id: "label4",
                                    text: "保存字段：",
                                    width: 60,
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
                                    id: "label5",
                                    text: "显示字段：",
                                    cls: "line35",
                                    width: 60
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
                            id: "div5",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 127,
                            layout: "anchor",
                            margins: "5 0 0 5",
                            anchor: "100%",
                            hidden: true,
                            items: [{
                                    xtype: "label",
                                    id: "label6",
                                    text: "过滤条件："
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div6",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 68,
                                    margins: "5 0 0 5",
                                    layout: "anchor",
                                    anchor: "100%",
                                    items: [{
                                            xtype: "textfield",
                                            id: "filter",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "90%",
                                            width: 125,
                                            readOnly: true
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "filterButton",
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
                },
                {
                    xtype: "panel",
                    id: "panel2",
                    title: "事件",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "anchor",
                    padding: "5",
                    items: [{
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
                                    id: "label7",
                                    text: "click:",
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
                                    height: 39,
                                    layout: "anchor",
                                    anchor: "100%",
                                    items: [{
                                            xtype: "textfield",
                                            id: "click",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "90%",
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
                            id: "div9",
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
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div10",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 39,
                                    layout: "anchor",
                                    anchor: "100%",
                                    items: [{
                                            xtype: "textfield",
                                            id: "change",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "90%",
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
                            layout: "anchor",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "hwLabel",
                                    text: "allChange:",
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "hwDiv1",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 39,
                                    layout: "anchor",
                                    anchor: "100%",
                                    items: [{
                                            xtype: "textfield",
                                            id: "allChange",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "90%",
                                            readOnly: true,
                                            width: 125,
                                            cls: "m-r5",
                                            afterrender: "allChange_afterrender",
                                            listeners: {
                                                vmdafterrender: allChange_afterrender
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "allChangeDelete",
                                            type: "(none)",
                                            size: "small",
                                            anchor: "",
                                            icon: "delete",
                                            width: 30,
                                            click: "allChangeDelete_click",
                                            listeners: {
                                                click: allChangeDelete_click
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.InputCheckBoxProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.InputCheckBoxProperty");
    }
})