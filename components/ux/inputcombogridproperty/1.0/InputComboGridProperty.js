Ext.define('vmd.ux.inputComboGridProperty.Controller', {
    xtype: 'vmd.ux.inputComboGridProperty.Controller',
    constructor: function(options) {
        this.type = 'comboGrid'
        this.scope = options;
        this.allowEdit = true
        this.multi = false
        this.grid_width = ''
        this.gridHeight = ''
        this.allowEmpty = true
        this.emptyAlert = ''
        this.dataSet = ''
        this.saveField = ''
        this.displayField = ''
        this.filter = ''
        this.comlist = ''
        this.click = ''
        this.change = ''
        this.beforeClick = ''
        this.colHide = false
        this.colWidth = '100'
        this.txtAlign = "1";
        this.dicFirst = true;
        this.selected = [];
    },
    setValue: function(info, flag) {
        if (info) {
            this.allowEdit = info.settings.allowEdit
            this.multi = info.settings.multi
            this.grid_width = info.settings.grid_width
            this.gridHeight = info.settings.gridHeight
            this.allowEmpty = info.settings.allowEmpty
            this.emptyAlert = info.settings.emptyAlert
            if (info.datas) {
                this.dataSet = info.datas.dataSet
                this.saveField = info.datas.saveField
                this.displayField = info.datas.displayField
                this.filter = info.datas.filter
                this.comlist = info.datas.comlist
            }
            if (!flag) {
                this.click = info.events.click
                this.change = info.events.change
                this.beforeClick = info.events.beforeClick
            }
            this.colHide = info.settings.colHide
            this.colWidth = info.settings.colWidth
            this.dicFirst = info.settings.dicFirst
            this.txtAlign = info.settings.txtAlign
            if (this.scope) {
                this.scope.allowEdit.setValue(this.allowEdit)
                this.scope.multi.setValue(this.multi)
                this.scope.grid_width.setValue(this.grid_width)
                this.scope.gridHeight.setValue(this.gridHeight)
                this.scope.allowEmpty.setValue(this.allowEmpty)
                this.scope.emptyAlert.setValue(this.emptyAlert)
                if (info.datas) {
                    this.dataSet = info.datas.dataSet;
                    this.saveField = info.datas.saveField;
                    this.displayField = info.datas.displayField;
                    this.filter = info.datas.displayField;
                    this.comlist = info.datas.comlist;
                } else if (info.settings.serialize) {
                    this.dataSet = info.settings.serialize().datas.dataSet;
                    this.saveField = info.settings.serialize().datas.saveField;
                    this.displayField = info.settings.serialize().datas.saveField;
                    this.filter = info.settings.serialize().datas.filter;
                    this.comlist = info.settings.serialize().datas.comlist;
                } else {
                    this.dataSet = info.settings.dataSet;
                    this.saveField = info.settings.saveField;
                    this.displayField = info.settings.saveField;
                    this.filter = info.settings.filter;
                    this.comlist = info.settings.comlist;
                }
                this.scope.dataSet.setValue(this.dataSet)
                this.scope.saveField.setValue(this.saveField)
                this.scope.displayField.setValue(this.displayField)
                this.scope.filter.setValue(this.filter)
                this.scope.comlist.setValue(this.comlist)
                if (!flag) {
                    this.scope.click.setValue(this.click)
                    this.scope.change.setValue(this.change)
                    this.scope.beforeClick.setValue(this.beforeClick)
                }
            }
            this.selected = info.selected;
        }
    },
    serialize: function() {
        var json = {
            settings: {
                allowEdit: this.allowEdit,
                multi: this.multi,
                grid_width: this.grid_width,
                gridHeight: this.gridHeight,
                allowEmpty: this.allowEmpty,
                emptyAlert: this.emptyAlert,
                colHide: this.colHide,
                colWidth: this.colWidth,
                dicFirst: this.dicFirst,
                txtAlign: this.txtAlign
            },
            datas: {
                dataSet: this.dataSet,
                saveField: this.saveField,
                displayField: this.displayField,
                filter: this.filter,
                comlist: this.comlist
            },
            events: {
                click: this.click,
                change: this.change,
                beforeClick: this.beforeClick
            },
            selected: this.selected,
            type: 'comboGrid'
        }
        return json;
    }
})

function setEvent(sender, eventName, param) {
    sender.el.on('dblclick', function() {
        var editor = new vmd.comp.Ace({
            id: "ace_code"
        });
        // init_def_platformControlData();
        var aceWin = new vmd.window({
            title: "事件编辑",
            id: "aceWin",
            url: vmd.virtualPath + vmd.vmdCodePath + "?" + Date.parse(new Date()),
            offset: [100, 100],
            modal: true,
            maximizable: true,
            maskStyle: 'opacity:0.7',
            layout: 'border',
            draggable: false,
            listeners: {
                move: function(me, x, y) {
                    this.moveZone(me, x, y);
                }
            }
        });
        aceWin.closeFn = function() {
            //修复ace tooltip还存在的问题
            Ext.select('.Ace-Tern-tooltip').remove();
            var val = aceWin.val;
            if (aceWin.script == val) {
                return;
            }
            Ext.Msg.confirm("提示", "脚本已改变是否保存?", function(btn) {
                if (btn == 'no') return;
                var click_label = sender;
                if (val.trim()) {
                    xds.vmd.events = val;
                    sender.setValue(eventName)
                    // 返回给对象
                } else {
                    click_label = undefined;
                    delete xds.vmd.events
                }
            })
        }
        //mafei 在ide-automachjs中
        // init_def_platformControlData();
        aceWin.on('close', aceWin.closeFn, this)
        //当前拖拽组件
        window.setTimeout(function() {
            window.setTimeout(function() {
                //代码编辑器初始化
                if (typeof rowIndex == "number") {
                    aceWin.aceline = rowIndex;
                }
            }, 150)
            var code = parent.xds.vmd.events;
            // var me = 
            var getdefaulteventname = function() {
                if (param != '') {
                    return "function(sender" + "){\n" + "\n} \n";
                } else {
                    return "function(sender," + param + "){\n" + "\n} \n";
                }
            }
            var m = getdefaulteventname(),
                code = code ? code : "",
                replaceStr = "function {0}{1}",
                regex = new RegExp("function\\s+" + eventName + "\\s*?\\(");
            if (eventName && code.search(regex) == -1) {
                var e = m.trim().replace("function", ""),
                    i = String.format(replaceStr, eventName, e);
                code += (code ? "\n\n" : "") + i
            }
            aceWin.script = code;
            aceWin.val = code;
            aceWin.show();
            //进度提示
            var myMask = new Ext.LoadMask(aceWin.el, {
                msg: "数据加载中,请稍后...",
                msgCls: 'z-index:10000;'
            });
            myMask.show();
            aceWin.loading = myMask;
            //  aceWin.update("<iframe  id='iframe_page' src='" + vmd.virtualPath + vmd.vmdCodePath + "?" + Date.parse(new Date()) + "' width=600 height=900 frameborder=0  ></iframe>")
            var scriptArr = code.split("\n"),
                rowIndex = null;
            Ext.each(scriptArr,
                function(o, p) {
                    if (o.search(regex) != -1) {
                        rowIndex = p + 2;
                        return false
                    }
                });
        }, 50)
    })
}
Ext.define("vmd.ux.InputComboGridProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ClickText$1.0$ClickText"]),
    version: "1.0",
    xtype: "vmd.ux.InputComboGridProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 500,
    height: 621,
    layout: "fit",
    beforerender: "InputComboGridProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.InputComboGridProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.InputComboGridProperty'
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
                checked ? emptyDiv.hide() : emptyDiv.show()
                panel.doLayout()
            }

            function grid_width_plus(sender) {
                if (grid_width.getValue() < 1)
                    grid_width.setValue(parseFloat(110))
                else
                    grid_width.setValue(parseFloat(grid_width.getValue()) + 10)
                page.fireEvent('updateValue', sender, 'grid_width', this.getValue())
            }

            function grid_width_minus(sender) {
                if (grid_width.getValue() >= 1) {
                    grid_width.setValue(parseFloat(grid_width.getValue()) - 10)
                }
                if (grid_width.getValue() < 0) grid_width.setValue(0)
                page.fireEvent('updateValue', sender, 'grid_width', this.getValue())
            }

            function InputComboGridProperty_beforerender(sender) {
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

            function dataSet_selectChanged(sender, combo, record, index) {
                sender.setValue(record.data.name)
                var temp = [];
                var dataSets = getDatasets();
                for (var i = 0; i < dataSets.length; i++) {
                    if (dataSets[i].name == record.data.name) {
                        for (var n = 0; n < dataSets[i].fields.length; n++) {
                            temp.push({
                                name: dataSets[i].fields[n],
                                value: dataSets[i].fields[n],
                                cname: dataSets[i].dictionary[n].cname
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
                                value: dataSets[i].fields[n],
                                cname: dataSets[i].dicitonary && dataSets[i].dicitonary[n] ? dataSets[i].dicitonary[n].cname : ""
                            })
                        }
                    }
                }
                store.loadData(nameSet);
                store2.loadData(temp)
                store1.loadData(temp)
                page.fields = temp;
            }

            function selectField_click(sender, e) {
                var data = [];
                var data1 = activePropPanel.controller.comp.grid.settings.fields[activePropPanel.controller.comp[activePropPanel.controller.operateType].activeNo].fieldsConfig.selected || [];
                if (page.fields) {
                    for (var n = 0; n < page.fields.length; n++) {
                        var flag = true
                        for (var k = 0; k < data1.length; k++) {
                            if (page.fields[n].name == data1[k].name) {
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            data.push({
                                name: page.fields[n].name,
                                cname: page.fields[n].cname
                            })
                        }
                    }
                }
                if (data.length > 0 || data1.length > 0) {
                    activePropPanel.controller.openVisualSelector(data, data1, 'xlwg', comlist, activePropPanel.controller.comp.grid.settings.fields[activePropPanel.controller.comp[activePropPanel.controller.operateType].activeNo]);
                } else {
                    vmd.tip('请先选择拥有字段的数据集', 'error')
                }
            }

            function click_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'cgrid_click', sender.getValue(), 'grid,cell,rId,cInd');
                })
            }

            function change_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'cgrid_change', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
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
            window.setGridSettings = function(values) {
                comlist.setValue(values);
                comlist.fireEvent('change', comlist, values)
            }

            function beforeClick_afterrender(sender) {
                sender.el.on('dblclick', function() {
                    var publicmethod = activePropPanel.controller;
                    publicmethod.openCodeEditor(sender, 'cgrid_beforeClick', sender.getValue(), 'grid,cell,rId,cInd,nValue,oValue');
                })
            }

            function beforeClickdelete_click(sender, e) {
                beforeClick.setValue(values);
                beforeClick.fireEvent('change', beforeClick, "")
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.InputComboGridProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.InputComboGridProperty_beforerender = InputComboGridProperty_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 2,
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
                            margins: "5 0 0 5",
                            height: 30
                        },
                        {
                            xtype: "checkbox",
                            id: "multi",
                            fieldLabel: "Checkbox",
                            boxLabel: "多选",
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
                            height: 30,
                            anchor: "100%",
                            layout: "border",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div18",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 111,
                                    height: 50,
                                    region: "center",
                                    layout: "anchor",
                                    items: [{
                                        xtype: "vmd.ux.ClickText",
                                        id: "grid_width",
                                        layout: "border",
                                        width: 144,
                                        anchor: "100%",
                                        plus: "grid_width_plus",
                                        minus: "grid_width_minus",
                                        listeners: {
                                            plus: grid_width_plus,
                                            minus: grid_width_minus
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
                                    width: 40,
                                    height: 50,
                                    region: "west",
                                    layout: "vbox",
                                    items: [{
                                        xtype: "label",
                                        id: "label",
                                        text: "宽度："
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
                                    width: 10,
                                    height: 50,
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
                            id: "div4",
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
                                    id: "div16",
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
                                        id: "gridHeight",
                                        allowBlank: true,
                                        enableKeyEvents: true,
                                        anchor: "-10",
                                        margins: "5 0 0 5"
                                    }]
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div17",
                                    layoutConfig: {
                                        align: "center",
                                        pack: "center"
                                    },
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 39,
                                    height: 50,
                                    region: "west",
                                    layout: "vbox",
                                    items: [{
                                        xtype: "label",
                                        id: "label2",
                                        text: "高度："
                                    }]
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
                            height: 23,
                            margins: "5 0 0 5",
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label3",
                                    text: "校验"
                                },
                                {
                                    xtype: "label",
                                    id: "label4",
                                    text: "——————————",
                                    style: "color: #ddd",
                                    margins: "0 0 0 5"
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
                            anchor: "100%",
                            layout: "border",
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
                                    id: "div21",
                                    layoutConfig: {
                                        align: "center",
                                        pack: "center"
                                    },
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
                                        id: "label5",
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
                            id: "div5",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 35,
                            layout: "anchor",
                            margins: "",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label6",
                                    text: "数据集：",
                                    width: 55,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.comlist",
                                    id: "dataSet",
                                    width: 350,
                                    height: 270,
                                    selectChanged: "dataSet_selectChanged",
                                    anchor: "-55",
                                    listeners: {
                                        selectChanged: dataSet_selectChanged
                                    }
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
                        },
                        {
                            xtype: "vmd.div",
                            id: "div8",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 55,
                            margins: "5 0 0 5",
                            layout: "anchor",
                            anchor: "100%",
                            hidden: true,
                            items: [{
                                    xtype: "label",
                                    id: "label9",
                                    text: "过滤条件："
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div9",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 32,
                                    margins: "5 0 0 5",
                                    layout: "anchor",
                                    anchor: "100%",
                                    items: [{
                                            xtype: "textfield",
                                            id: "filter",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "80%",
                                            width: 125,
                                            margins: ""
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "filterDelete",
                                            type: "(none)",
                                            size: "small",
                                            width: 30,
                                            icon: "delete",
                                            margins: "0 0 0 5"
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
                            margins: "5 0 0 5",
                            layout: "anchor",
                            anchor: "100%",
                            cls: "flex",
                            items: [{
                                    xtype: "label",
                                    id: "label10",
                                    text: "下拉网格：",
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
                                    height: 30,
                                    layout: "anchor",
                                    margins: "5 0 0 5",
                                    anchor: "-60",
                                    items: [{
                                            xtype: "textfield",
                                            id: "comlist",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            width: 125,
                                            cls: "m-r5"
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "selectField",
                                            text: "...",
                                            type: "(none)",
                                            size: "small",
                                            width: 30,
                                            margins: "0 0 0 5",
                                            click: "selectField_click",
                                            listeners: {
                                                click: selectField_click
                                            }
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
                            id: "hwDiv",
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
                                    id: "hwLabel",
                                    text: "beforeClick：",
                                    width: 77,
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
                                    height: 40,
                                    anchor: "-77",
                                    layout: "anchor",
                                    items: [{
                                            xtype: "textfield",
                                            id: "beforeClick",
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            anchor: "-30",
                                            cls: "m-r5",
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
                                            icon: "delete",
                                            width: 30,
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
                            id: "div12",
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
                                    id: "label11",
                                    text: "click:",
                                    margins: "5 0 0 5",
                                    width: 50,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div13",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 40,
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
                            id: "div14",
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
                                    id: "label12",
                                    text: "change:",
                                    margins: "5 0 0 5",
                                    width: 50,
                                    cls: "line35"
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div15",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 400,
                                    height: 40,
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.InputComboGridProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.InputComboGridProperty");
    }
})