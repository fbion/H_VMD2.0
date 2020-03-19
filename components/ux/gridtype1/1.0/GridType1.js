//grid
Ext.define('vmd.ux.gridType.Controller', {
    xtype: 'vmd.ux.gridType.Controller',
    constructor: function(options) {
        this.scope = options;
        this.settings = new vmd.ux.gridType.settings(options);
        this.events = new vmd.ux.gridType.events(options);
    },
    setValue: function(jsonConfig) {
        if (jsonConfig) {
            //设置值和事件
            this.settings.setValue(jsonConfig.settings);
            this.events.setValue(jsonConfig.events);
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
            settings: this.settings.serialize(),
            events: this.events.serialize()
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
            debugger
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
//grid-events
Ext.define('vmd.ux.gridType.events', {
    xtype: 'vmd.ux.gridType.events',
    constructor: function(options) {
        this.scope = options;
        this.rowChange = '';
        this.rowClick = '';
    },
    setValue: function(jsonConfig) {
        this.rowChange = jsonConfig.rowChange;
        this.rowClick = jsonConfig.rowClick;
    },
    serialize: function() {
        var json = {
            rowChange: this.rowChange,
            rowClick: this.rowClick
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
Ext.define("vmd.ux.GridType1", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.GridType1",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 700,
    layout: "fit",
    autoScroll: true,
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
        var page = this;
        page.controller = new vmd.ux.gridType.Controller(this)
        page.selectedField = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['mixName']
        });

        function button_click(sender, e) {
            var sValue = page.rootScope.controller.comp.layout.dataSet
            //首先判断是否选择了数据集
            if (sValue == '') {
                vmd.tip('请首先选择数据集', 'error')
            } else {
                openSettingWin(page.controller);
            }
        }

        function openSettingWin(controller, flag) {
            var dbconfigs = JSON.parse(parent.xds.vmd.getStoreByDsName(page.rootScope.controller.comp.layout.dataSet, true).component.getConfig("storeConfig").storeConfig)
            if (dbconfigs) {
                // 创建一个新窗口（有url指向） 
                window.newWin = new vmd.window({
                    url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwk9PgTMpg/hwp5jFKDnC.html',
                    title: '字段选择',
                    enableLoading: true, //启用进度加载
                    width: 610,
                    height: 500,
                    auto: false, //auto为true 自动适应窗口，配合offset使用
                    cache: false,
                    params: {
                        inst: controller
                    } //url中追加的编码的参数，json格式 
                })
                newWin.inputdbconfig = dbconfigs
                newWin.show(); //窗口显示
                newWin.getSelectedFields = function(selected) {
                    var newSelectFields = [];
                    var oldfields = page.controller.settings.fields;
                    var ischeckfields = function(name) {
                        var flag = false;
                        Ext.each(oldfields, function(info) {
                            if (info.dictionary.name == name) {
                                flag = info;
                                return false;
                            }
                        })
                        return flag;
                    }
                    var cmpStore = [];
                    for (var i = 0; i < selected.length; i++) {
                        var name = selected[i].name;
                        var matchFieldInfo = ischeckfields(name);
                        if (matchFieldInfo) {
                            newSelectFields.push(Ext.copyTo(matchFieldInfo))
                            continue;
                        }
                        selected[i].mixName = selected[i].cname + '(' + selected[i].name + ')'
                        var cmp = new vmd.ux.gridType.settings.fieldSettings();
                        cmp.dictionary = selected[i];
                        var type = cmp.dictionary.type;
                        //根据数据字典类型设置默认值
                        if (type == 'DATE') {
                            cmp.fieldsConfig = {
                                events: {
                                    change: "",
                                    click: "",
                                    dblclick: ""
                                },
                                settings: {
                                    allowEdit: true,
                                    allowEmpty: true,
                                    colHide: false,
                                    colWidth: "100",
                                    customFormat: false,
                                    customFormats: "",
                                    defaultNow: false,
                                    emptyAlert: "",
                                    format: ""
                                },
                                type: "date"
                            }
                        } else if (type == 'CHAR' || type == 'VARCHAR2') {
                            cmp.fieldsConfig = {
                                events: {
                                    text_change: "",
                                    text_click: ""
                                },
                                settings: {
                                    colHide: false,
                                    colWidth: "100",
                                    text_common_allowEdit: true,
                                    text_common_allowEmpty: true,
                                    text_common_emptyAlert: "",
                                    text_common_fillRules: "None",
                                    text_common_mutilRow: false,
                                    text_common_phoneType: "",
                                    text_common_symbol: false,
                                    text_guid_allowEmpty: true,
                                    text_guid_emptyAlert: "",
                                    text_guid_length: "",
                                    text_no_allowEmpty: true,
                                    text_no_emptyAlert: "",
                                    text_password_allowEdit: true,
                                    text_password_allowEmpty: true,
                                    text_password_emptyAlert: true,
                                    text_rule_charExp: "",
                                    text_rule_maxLength: "0",
                                    text_rule_minLength: "0",
                                    text_typeSelect: "common"
                                },
                                type: "text"
                            }
                        } else if (type == 'NUMBER') {
                            cmp.fieldsConfig = {
                                events: {
                                    number_change: "",
                                    number_click: ""
                                },
                                settings: {
                                    colHide: false,
                                    colWidth: "100",
                                    number_allowDecimal: true,
                                    number_allowEdit: true,
                                    number_allowEmpty: true,
                                    number_allowNegetive: false,
                                    number_decimalLength: cmp.dictionary.precision,
                                    number_emptyAlert: "",
                                    number_limit: false,
                                    number_limitValue: "",
                                    number_max: false,
                                    number_maxValue: "",
                                    number_min: false,
                                    number_minValue: ""
                                },
                                type: "number"
                            }
                        }
                        newSelectFields.push(cmp);
                    }
                    for (var i = 0; i < newSelectFields.length; i++) {
                        page.controller.settings.fields.push(newSelectFields[i]);
                    }
                    page.selected = [];
                    for (var i = 0; i < page.controller.settings.fields.length; i++) {
                        page.selected.push(page.controller.settings.fields[i].dictionary)
                    }
                    page.selectedField.loadData(page.selected)
                    //设置数据库名称记录
                    page.controller.settings.storeName = page.rootScope.controller.comp.layout.dataSet;
                    //修改form表单设置
                    if (page.rootScope.controller.comp.form.settings.fields.length == 0) {
                        page.rootScope.controller.comp.form.settings.fields = newSelectFields;
                    }
                    page.fireEvent('settingChangeEvents')
                    newWin.close()
                }
            }
        }

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

        function MyGrid_celldblclick(sender, rowIndex, columnIndex, e) {
            debugger
            var backpack = JSON.stringify(page.controller.serialize());
            // 创建一个新窗口（有url指向） 
            window.settingWin = new vmd.window({
                url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwk9PgTMpg/hwbc029294.html',
                title: '字段类型设置',
                enableLoading: true, //启用进度加载
                width: 540,
                height: 640,
                cache: false,
                auto: false, //auto为true 自动适应窗口，配合offset使用
                params: {
                    inst: page.controller,
                    selNum: MyGrid.getSelectionModel().last
                } //url中追加的编码的参数，json格式 
            })
            settingWin.show(); //窗口显示
            settingWin.setBack = function(controller, flag) {
                flag ? page.controller = controller : page.controller.setValue(JSON.parse(backpack));
                page.fireEvent('settingChangeEvents')
                settingWin.close()
            }
            settingWin.toOther = function(info) {
                var inst = page.rootScope.controller.comp.form.settings.fields;
                for (var i = 0; i < inst.length; i++) {
                    if (inst[i].dictionary.name == info.dictionary.name) {
                        inst[i].fieldsConfig.settings = info.fieldsConfig;
                    }
                }
                page.fireEvent('settingChangeEvents')
            }
        }

        function grid_display_change(sender, checked) {
            page.controller.settings.displayMode = checked.inputValue
            page.fireEvent('settingChangeEvents')
        }

        function button1_click(sender, e) {
            //上移
            var sel;
            var selecModel = MyGrid.getSelectionModel()
            var group = MyGrid.getSelectionModel().selections.items;
            if (group.length == 0) return;
            if (!page.selected) page.selected = Ext.pluck(MyGrid.store.data.items, 'json')
            var name = group[0].data.mixName;
            for (var i = 0; i < page.selected.length; i++) {
                if (page.selected[i].mixName == name && i != 0) {
                    var temp = page.selected[i - 1];
                    page.selected[i - 1] = page.selected[i];
                    page.selected[i] = temp;
                    sel = i > 0 ? i - 1 : 0
                    break;
                }
            }
            page.selectedField.loadData(page.selected)
            selecModel.selectRow(sel)
            try {
                var list = page.controller.settings.fields;
                var temp = JSON.stringify(list[i])
                list[i] = JSON.parse(JSON.stringify(list[i - 1]))
                list[i - 1] = JSON.parse(temp)
                page.fireEvent('settingChangeEvents')
            } catch (ex) {
                debugger
            }
        }

        function button2_click(sender, e) {
            //下移
            var sel;
            var selecModel = MyGrid.getSelectionModel()
            var group = MyGrid.getSelectionModel().selections.items;
            if (group.length == 0) return;
            if (!page.selected) page.selected = Ext.pluck(MyGrid.store.data.items, 'json')
            var name = group[0].data.mixName;
            for (var i = 0; i < page.selected.length; i++) {
                if (page.selected[i].mixName == name && i != page.selected.length - 1) {
                    var temp = page.selected[i + 1];
                    page.selected[i + 1] = page.selected[i];
                    page.selected[i] = temp;
                    sel = i + 1;
                    break;
                }
            }
            page.selectedField.loadData(page.selected)
            selecModel.selectRow(sel)
            try {
                var list = page.controller.settings.fields;
                var temp = JSON.stringify(list[i])
                list[i] = JSON.parse(JSON.stringify(list[i + 1]))
                list[i + 1] = JSON.parse(temp)
                page.fireEvent('settingChangeEvents')
            } catch (ex) {
                debugger
            }
        }

        function MyGrid_afterrender(sender) {
            var store = this.store
            var ddrow = new Ext.dd.DropTarget(MyGrid.container, {
                ddGroup: 'griddd',
                copy: false,
                notifyEnter: function(ddSource, e, data) {},
                notifyDrop: function(ddSource, e, data) {
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
                        if (!this.copy) store.remove(rowData);
                        store.insert(index, rowData);
                    }
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

        function button3_click(sender, e) {
            debugger
            var temp = JSON.parse(JSON.stringify(page.controller.scope.rootScope.controller.comp.grid.settings.fields))
            page.rootScope.controller.comp.form.settings.fields = temp;
            page.fireEvent('settingChangeEvents')
        }

        function button4_click(sender, e) {
            var f = page.controller.settings.fields;
            var group = MyGrid.getSelectionModel().selections.items;
            if (group) {
                for (var i = 0; i < group.length; i++) {
                    for (var n = f.length - 1; n > -1; n--) {
                        if (group[i].json.name == page.controller.settings.fields[n].dictionary.name) {
                            f.splice(n, 1);
                            break;
                        }
                    }
                }
                page.selected = [];
                for (var i = 0; i < f.length; i++) {
                    page.selected.push(f[i].dictionary)
                }
                page.selectedField.loadData(page.selected)
                page.fireEvent('settingChangeEvents')
            }
        }

        function fixedCol_afterrender(sender) {
            sender.el.on('change', function() {
                page.controller.settings.fc = sender.getValue()
                page.fireEvent('settingChangeEvents')
            })
        }
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 700,
            width: 500,
            activeItem: "panel",
            afterrender: "MyTabs_afterrender",
            autoHeight: false,
            listeners: {
                vmdafterrender: MyTabs_afterrender
            },
            items: [{
                    xtype: "panel",
                    id: "panel",
                    title: "配置",
                    header: true,
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
                            autoScroll: true,
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
                                                    click: "button1_click",
                                                    iconcls: "icon-arrow-up",
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
                                                    click: "button2_click",
                                                    iconcls: "icon-arrow-down",
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
                                                    click: "button4_click",
                                                    style: "color: red",
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
                                        celldblclick: "MyGrid_celldblclick",
                                        hideHeaders: true,
                                        disableHeaderClick: true,
                                        afterrender: "MyGrid_afterrender",
                                        listeners: {
                                            beforerender: MyGrid_beforerender,
                                            celldblclick: MyGrid_celldblclick,
                                            vmdafterrender: MyGrid_afterrender
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
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "事件",
                    header: true,
                    border: true,
                    height: 100,
                    items: [{
                            xtype: "vmd.div",
                            id: "div19",
                            layoutConfig: {
                                align: "middle",
                                pack: "start"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 40,
                            layout: "hbox",
                            hidden: false,
                            items: [{
                                    xtype: "label",
                                    id: "label16",
                                    text: "行改变：",
                                    margins: "0 0 0 10 "
                                },
                                {
                                    xtype: "textfield",
                                    id: "grid_rowChange",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    afterrender: "grid_rowChange_afterrender",
                                    listeners: {
                                        vmdafterrender: grid_rowChange_afterrender
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "rowChangeSet",
                                    text: "...",
                                    type: "(none)",
                                    size: "small",
                                    margins: "0 0 0 5"
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div20",
                            layoutConfig: {
                                align: "middle",
                                pack: "start"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 40,
                            layout: "hbox",
                            hidden: false,
                            items: [{
                                    xtype: "label",
                                    id: "label17",
                                    text: "行选中：",
                                    margins: "0 0 0 10"
                                },
                                {
                                    xtype: "textfield",
                                    id: "grid_rowSelected",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    afterrender: "grid_rowSelected_afterrender",
                                    listeners: {
                                        vmdafterrender: grid_rowSelected_afterrender
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "rowSelectedSet",
                                    text: "...",
                                    type: "(none)",
                                    size: "small",
                                    margins: "0 0 0 5"
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.GridType1");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.GridType1");
    }
})