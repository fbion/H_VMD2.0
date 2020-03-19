//grid
Ext.define('vmd.ux.gridType.Controller', {
    xtype: 'vmd.ux.gridType.Controller',
    constructor: function(options) {
        this.scope = options;
        this.settings = new vmd.ux.gridType.settings(options);
        // this.events = new vmd.ux.gridType.events(options);
    },
    setValue: function(jsonConfig) {
        if (jsonConfig) {
            //设置值和事件
            this.settings.setValue(jsonConfig.settings);
            // this.events.setValue(jsonConfig.events);
            //取得的已选字段
            var temp = [];
            for (var i = 0; i < jsonConfig.settings.fields.length; i++) {
                temp.push(jsonConfig.settings.fields[i].dictionary)
            }
            this.scope.selectedField.loadData(temp)
            //grid层需要展示赋值的
            // this.scope.grid_dataSet.setValue(this.settings.storeName);
        }
    },
    serialize: function() {
        var json = {
            settings: this.settings.serialize()
            // events: this.events.serialize()
        }
        return json;
    }
})
//grid-settings
Ext.define('vmd.ux.gridType.settings', {
    xtype: 'vmd.ux.gridType.settings',
    constructor: function(options) {
        this.displayMode = '0'
        this.fc = '0'
        this.fields = [];
        this.scope = options;
    },
    setValue: function(jsonConfig) {
        if (jsonConfig) {
            this.displayMode = jsonConfig.displayMode;
            this.fc = jsonConfig.fc;
            this.fields = jsonConfig.fields;
            this.scope.grid_display.setValue(this.displayMode)
            this.scope.fixedCol.setValue(this.fc)
        }
    },
    serialize: function() {
        var temp = [];
        for (var i = 0; i < this.fields.length; i++) {
            var tmp
            if (this.fields[i] && this.fields[i].fieldsConfig && this.fields[i].fieldsConfig.hasOwnProperty('scope')) {
                tmp = {
                    fieldsConfig: this.fields[i].fieldsConfig.serialize(),
                    dictionary: this.fields[i].dictionary
                }
                if (this.fields[i] && this.fields[i].selected) tmp.selected = this.fields[i].selected
            } else {
                tmp = this.fields[i]
            }
            //删除数据字典中的role规则
            if (tmp.dictionary) {
                delete tmp.dictionary.rule;
                delete tmp.dictionary.rules;
                delete tmp.dictionary.xml;
                delete tmp.dictionary.defaultValue;
            }
            temp.push(tmp)
        }
        var json = {
            displayMode: this.displayMode,
            fc: this.fc,
            fields: temp,
            issave: true
        }
        return json;
    }
})
//grid-settings
Ext.define('vmd.ux.gridType.settings.fieldSettings', {
    xtype: 'vmd.ux.gridType.settings.fieldSettings',
    constructor: function(options) {
        this.scope = options;
        this.dictionary;
        this.fieldsConfig;
    },
    setValue: function(jsonConfig) {
        if (jsonConfig) {
            this.dictionary = jsonConfig.dictionary;
            this.fieldsConfig = jsonConfig.fieldsConfig.serialize();
        }
    },
    serialize: function() {
        var temp = {};
        if (this.fieldsConfig) {
            temp = this.fieldsConfig.serialize();
        }
        var json = {
            dictionary: this.dictionary,
            fieldsConfig: temp
        }
        return json;
    }
})
Ext.define("vmd.ux.GridType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.GridType",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 700,
    layout: "fit",
    autoScroll: false,
    autoHeight: false,
    uxrequirecss: "[\"components/ux/gridtype/1.0/css/icons.css\"]",
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
            page.controller = new vmd.ux.gridType.Controller(this)
            var util = new ide.ext.DataInputUtils(page, 'grid')
            page.selectedField = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['mixName']
            });

            function MyGrid_beforerender(sender) {
                this.ddGroup = 'griddd';
                this.enableDragDrop = true;
                sender.store = page.selectedField;
                MyGrid.on('cellclick', function(sender, rowindex, cellindex) {
                    page.selNo = rowindex;
                    var gv = MyGrid.getView();
                    var row = gv.getRow(rowindex);
                    Ext.get(row).removeClass('x-grid3-row-selected')
                    currow = gv.getRow(rowindex);
                    Ext.get(currow).addClass('x-grid3-row-selected')
                })
            }

            function grid_display_change(sender, checked) {
                page.controller.settings.displayMode = checked.inputValue
                page.fireEvent('settingChangeEvents')
            }

            function MyGrid_afterrender(sender) {
                var store = this.store
                var ddrow = new Ext.dd.DropTarget(MyGrid.container, {
                    ddGroup: 'griddd',
                    copy: false,
                    notifyEnter: function(ddSource, e, data) {},
                    notifyDrop: function(ddSource, e, data) {
                        var list = page.controller.settings.fields;
                        // 选中了多少行
                        var rows = data.selections;
                        // 拖动到第几行
                        var index = ddSource.getDragData(e).rowIndex;
                        if (typeof(index) == "undefined") {
                            return;
                        }
                        // 修改store
                        for (i = 0; i < rows.length; i++) {
                            var rowData = rows[i];
                            lindex = store.indexOf(rowData)
                            temp = list[lindex]
                            list.remove(list[lindex])
                            list.splice(index, 0, temp);
                            if (!this.copy) store.remove(rowData);
                            store.insert(index, rowData);
                        }
                        page.selected = Ext.pluck(store.data.items, 'json')
                        page.selectedField.loadData(page.selected)
                        page.fireEvent('settingChangeEvents')
                    }
                });
            }

            function grid_rowChange_afterrender(sender) {
                setEvent(sender, 'grid_rowChange', "")
            }

            function grid_rowSelected_afterrender(sender) {
                setEvent(sender, 'grid_rowSelected', "")
            }

            function MyTabs_afterrender(sender) {
                sender.header.setDisplayed(false)
            }

            function fixedCol_afterrender(sender) {
                sender.el.on('change', function() {
                    var max = page.rootScope.controller.comp.grid.settings.fields.length;
                    if (max < fixedCol.getValue()) {
                        vmd.tip('锁定列数超过已选择字段数', 'error')
                        fixedCol.setValue(page.controller.settings.fc)
                        return;
                    }
                    page.controller.settings.fc = sender.getValue()
                    page.fireEvent('settingChangeEvents')
                })
            }

            function button_click(sender, e) {
                util.clickFieldsSelect()
            }

            function button3_click(sender, e) {
                util.copyToAnother()
            }

            function MyGrid_celldblclick(sender, rowIndex, columnIndex, e) {
                util.celldbclick()
            }

            function button1_click(sender, e) {
                util.moveUp()
            }

            function button2_click(sender, e) {
                util.moveDown()
            }

            function button4_click(sender, e) {
                util.delete()
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.GridType',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "配置",
            header: false,
            border: true,
            height: 100,
            layout: "border",
            autoScroll: true,
            items: [{
                    xtype: "panel",
                    id: "panel5",
                    title: "Panel",
                    header: false,
                    border: true,
                    height: 100,
                    region: "center",
                    layout: "border",
                    autoScroll: false,
                    items: [{
                            xtype: "vmd.div",
                            id: "div",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 482,
                            height: 73,
                            layout: "border",
                            region: "north",
                            items: [{
                                    xtype: "panel",
                                    id: "panel3",
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 28,
                                    region: "center",
                                    layout: "hbox",
                                    items: [{
                                            xtype: "vmd.button",
                                            id: "button",
                                            text: "字段选择",
                                            type: "text",
                                            size: "small",
                                            margins: "5 5 0 5",
                                            click: "button_click",
                                            listeners: {
                                                click: button_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "button1",
                                            type: "text",
                                            size: "small",
                                            margins: "5 0 0 45",
                                            width: 30,
                                            iconcls: "icon-arrow-up",
                                            click: "button1_click",
                                            listeners: {
                                                click: button1_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "button2",
                                            type: "text",
                                            size: "small",
                                            margins: "5 0 0 5",
                                            width: 30,
                                            iconcls: "icon-arrow-down",
                                            click: "button2_click",
                                            listeners: {
                                                click: button2_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "button4",
                                            type: "text",
                                            size: "small",
                                            icon: "delete",
                                            margins: "5 0 0 5",
                                            style: "color: red",
                                            click: "button4_click",
                                            listeners: {
                                                click: button4_click
                                            }
                                        },
                                        {
                                            xtype: "vmd.button",
                                            id: "button3",
                                            text: "应用到自由格式",
                                            type: "text",
                                            size: "small",
                                            margins: "5 0 5 5",
                                            click: "button3_click",
                                            listeners: {
                                                click: button3_click
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: "panel",
                                    id: "panel4",
                                    layoutConfig: {
                                        align: "middle",
                                        pack: "start"
                                    },
                                    title: "Panel",
                                    header: false,
                                    border: false,
                                    height: 35,
                                    region: "north",
                                    layout: "hbox",
                                    items: [{
                                            xtype: "label",
                                            id: "label",
                                            text: "锁定列数：",
                                            margins: "0 0 0 5"
                                        },
                                        {
                                            xtype: "numberfield",
                                            id: "fixedCol",
                                            allowDecimals: false,
                                            allowNegative: false,
                                            decimalPrecision: 2,
                                            allowBlank: true,
                                            width: 178,
                                            afterrender: "fixedCol_afterrender",
                                            listeners: {
                                                vmdafterrender: fixedCol_afterrender
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel2",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 100,
                            region: "center",
                            layout: "fit",
                            autoScroll: false,
                            autoHeight: false,
                            items: [{
                                xtype: "grid",
                                id: "MyGrid",
                                title: "已选字段",
                                loadMask: true,
                                region: "center",
                                beforerender: "MyGrid_beforerender",
                                hideHeaders: true,
                                disableHeaderClick: true,
                                afterrender: "MyGrid_afterrender",
                                celldblclick: "MyGrid_celldblclick",
                                listeners: {
                                    beforerender: MyGrid_beforerender,
                                    vmdafterrender: MyGrid_afterrender,
                                    celldblclick: MyGrid_celldblclick
                                },
                                columns: [{
                                    xtype: "gridcolumn",
                                    header: "Column 1",
                                    sortable: true,
                                    resizable: true,
                                    dataIndex: "mixName",
                                    width: 300
                                }]
                            }]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel6",
                    layoutConfig: {
                        align: "middle",
                        pack: "start"
                    },
                    title: "Panel",
                    header: false,
                    border: true,
                    height: 35,
                    region: "north",
                    layout: "hbox",
                    style: "padding-top: 5px",
                    items: [{
                            xtype: "label",
                            id: "label3",
                            text: "展示方式：",
                            margins: "0 0 0 5"
                        },
                        {
                            xtype: "radiostoregroup",
                            id: "grid_display",
                            width: 200,
                            height: 30,
                            labelField: "label",
                            valueField: "value",
                            checkedField: "checked",
                            boxFieldName: "myRadio",
                            margins: "0 0 0 5",
                            change: "grid_display_change",
                            listeners: {
                                change: grid_display_change
                            },
                            items: [{
                                    xtype: "radio",
                                    id: "hwRadio",
                                    boxLabel: "实际宽度",
                                    width: 81,
                                    checked: true,
                                    inputValue: "0"
                                },
                                {
                                    xtype: "radio",
                                    id: "hwRadio1",
                                    boxLabel: "比例平铺",
                                    inputValue: "1"
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
        this.serialize = function(info) {
            page.controller.serialize();
        }
        this.setInfo = function(info) {
            page.controller.setValue(info)
        }
        this.initDefault = function() {
            //直接填写方法内容
            init()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.GridType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.GridType");
    }
})