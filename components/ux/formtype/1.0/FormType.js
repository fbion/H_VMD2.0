//grid
Ext.define('vmd.ux.formType.Controller', {
    xtype: 'vmd.ux.formType.Controller',
    constructor: function(options) {
        this.scope = options;
        this.settings = new vmd.ux.formType.settings(options);
        this.events = new vmd.ux.formType.events(options);
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
            this.scope.formColumn.setValue(this.settings.formColumn)
            //grid层需要展示赋值的
            
            this.scope.grid_display.setValue(this.settings.titleSite)
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
Ext.define('vmd.ux.formType.settings', {
    xtype: 'vmd.ux.formType.settings',
    constructor: function(options) {
        this.formColumn = '3'
        this.fields = [];
        this.titleSite = "right";
    },
    setValue: function(jsonConfig) {
        if (jsonConfig) {
            this.formColumn = jsonConfig.formColumn;
            this.fields = jsonConfig.fields;
            this.titleSite = jsonConfig.titleSite;
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
            } else {
                tmp = this.fields[i]
            }
            //删除数据字典中的role规则
            if (tmp.dictionary) {
                delete tmp.dictionary.rule;
                delete tmp.dictionary.rules;
                delete tmp.dictionary.xml;
            }
            temp.push(tmp)
        }
        var json = {
            formColumn: this.formColumn,
            titleSite: this.titleSite,
            fields: temp,
            issave: true
        }
        return json;
    }
})
//grid-events
Ext.define('vmd.ux.formType.events', {
    xtype: 'vmd.ux.formType.events',
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
//grid-events
Ext.define('vmd.ux.formType.settings.fieldSettings', {
    xtype: 'vmd.ux.formType.settings.fieldSettings',
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
Ext.define("vmd.ux.FormType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.ClickText$1.0$ClickText"]),
    version: "1.0",
    xtype: "vmd.ux.FormType",
    title: "Panel",
    header: false,
    border: false,
    width: 300,
    height: 700,
    layout: "fit",
    autoScroll: true,
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
            page.controller = new vmd.ux.formType.Controller(this)
            page.selectedField = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['mixName']
            });
            var util = new ide.ext.DataInputUtils(page, 'form')

            function button_click(sender, e) {
                util.clickFieldsSelect()
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
                util.celldbclick()
            }

            function grid_display_change(sender, checked) {
                if (!checked)
                    return;
                page.controller.settings.titleSite = checked.inputValue || '2';
                //grid_display.setValue(page.controller.settings.titleSite)
                page.fireEvent('settingChangeEvents');
                //page.controller.settings.displayMode = checked.inputValue
                //    page.fireEvent('settingChangeEvents')
            }

            function button1_click(sender, e) {
                util.moveUp()
            }

            function button2_click(sender, e) {
                util.moveDown()
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

            function formColumn_plus(sender) {
                page.controller.settings.formColumn = parseInt(page.controller.settings.formColumn) + 1;
                formColumn.setValue(page.controller.settings.formColumn)
                page.fireEvent('settingChangeEvents')
            }

            function formColumn_minus(sender) {
                // var tmp = page.controller.settings.formColumn;
                parseInt(page.controller.settings.formColumn) < 2 ? page.controller.settings.formColumn = 1 : page.controller.settings.formColumn -= 1;
                formColumn.setValue(page.controller.settings.formColumn)
                page.fireEvent('settingChangeEvents')
            }

            function MyTabs_afterrender(sender) {
                // sender.header.setDisplayed(false)
            }

            function button3_click(sender, e) {
                util.copyToAnother()
            }

            function button4_click(sender, e) {
                util.delete()
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.FormType',
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
            items: [{
                    xtype: "panel",
                    id: "panel5",
                    title: "Panel",
                    header: false,
                    border: true,
                    height: 100,
                    region: "center",
                    layout: "border",
                    items: [{
                            xtype: "vmd.div",
                            id: "div",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 482,
                            height: 42,
                            layout: "hbox",
                            region: "north",
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
                                    margins: "5 0 0 60",
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
                                    style: "color: red",
                                    margins: "5 0 0 ",
                                    click: "button4_click",
                                    listeners: {
                                        click: button4_click
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "button3",
                                    text: "应用到网格格式",
                                    type: "text",
                                    size: "small",
                                    margins: "5 0 5 5 ",
                                    click: "button3_click",
                                    listeners: {
                                        click: button3_click
                                    }
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
                            autoScroll: true,
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
                    title: "Panel",
                    header: false,
                    border: true,
                    height: 65,
                    region: "north",
                    layout: "border",
                    style: "padding-top: 5px",
                    items: [{
                            xtype: "vmd.div",
                            id: "div2",
                            layoutConfig: {
                                align: "middle",
                                pack: "start"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 299,
                            height: 32,
                            region: "center",
                            layout: "hbox",
                            hidden: false,
                            items: [{
                                    xtype: "label",
                                    id: "label",
                                    text: "列数：",
                                    margins: "0 0 0 5 "
                                },
                                {
                                    xtype: "vmd.ux.ClickText",
                                    id: "formColumn",
                                    layout: "border",
                                    plus: "formColumn_plus",
                                    minus: "formColumn_minus",
                                    readOnly: true,
                                    listeners: {
                                        plus: formColumn_plus,
                                        minus: formColumn_minus
                                    }
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div1",
                            layoutConfig: {
                                align: "middle"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 28,
                            layout: "hbox",
                            region: "north",
                            hidden: false,
                            items: [{
                                    xtype: "label",
                                    id: "label3",
                                    text: "标题对齐:",
                                    margins: "0 0 0 5"
                                },
                                {
                                    xtype: "radiostoregroup",
                                    id: "grid_display",
                                    width: 205,
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
                                            id: "r_left",
                                            boxLabel: "左对齐",
                                            width: 60,
                                            checked: false,
                                            inputValue: "1"
                                        },
                                        {
                                            xtype: "radio",
                                            id: "r_center",
                                            boxLabel: "居中",
                                            inputValue: "3",
                                            width: 50
                                        },
                                        {
                                            xtype: "radio",
                                            id: "r_right",
                                            boxLabel: "右对齐",
                                            inputValue: "2",
                                            width: 60,
                                            checked: true
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.FormType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FormType");
    }
})