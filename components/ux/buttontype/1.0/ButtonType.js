Ext.define('vmd.ux.buttonType.Controller', {
    xtype: 'vmd.ux.buttonType.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ButtonType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ButtonType",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 621,
    layout: "auto",
    beforerender: "ButtonType_beforerender",
    listeners: {
        beforerender: function() {
            this.ButtonType_beforerender(this)
        }
    },
    uxCss: ".b{    border: 1px solid #dddddd}.noneBorder .x-form-text {    border: none;    border-bottom: none;}",
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
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'id']
        });
        var page = this;
        var data = [{
            name: "无",
            id: "none"
        }, {
            name: "删除行",
            id: "deleterow"
        }, {
            name: "插入行",
            id: "insertrow"
        }, {
            name: "添加-删除行",
            id: "add-delete"
        }, {
            name: "伸缩",
            id: "extend_retract"
        }, {
            name: "选择行",
            id: "selectrow"
        }, {
            name: "编辑行",
            id: "editrow"
        }, {
            name: "上移行",
            id: "moveup"
        }, {
            name: "下移行",
            id: "movedown"
        }, ];
        store.loadData(data);
        ////////////////////////////////////////////////////////////////////////////////
        function closeAll() {
            ssDiv.hide();
            checkDiv.hide();
            typeSelectDiv.hide();
            carryDiv.hide();
            textDiv.hide();
            button_wbStyle.show()
            // page.doLayout();
        }

        function styleType_selectChanged(sender, combo, record, index) {
            closeAll();
            switch (button_styleType.getValue()) {
                case "none":
                    //
                    textDiv.show();
                    button_wbStyle.hide()
                    break;
                case "deleterow":
                    typeSelectDiv.show()
                    checkDiv.show()
                    textDiv.show()
                    break;
                case "insertrow":
                    // typeSelectDiv.show()
                    carryDiv.show()
                    textDiv.show()
                    break;
                case "add-delete":
                    typeSelectDiv.show()
                    checkDiv.show()
                    carryDiv.show()
                    textDiv.show()
                    break;
                case "extend_retract":
                    ssDiv.show();
                    textDiv.show();
                    break;
                case "selectrow":
                    textDiv.show();
                    break;
                case "editrow":
                    textDiv.show();
                    break;
                case "moveup":
                    textDiv.show();
                    break;
                case "movedown":
                    textDiv.show();
                    break;
            }
            page.doLayout();
        }

        function setInfo(info) {
            closeAll();
            if (info) {
                button_styleType.setValue(info.button_styleType.value)
                button_rowSelect.setValue(info.button_rowSelect.value)
                button_delStore.setValue(info.button_delStore.value)
                button_alert.setValue(info.button_alert.value)
                lastDeleteOnlyData.setValue(info.lastDeleteOnlyData.value)
                button_carry.setValue(info.button_carry.value)
                button_text.setValue(info.button_text.value)
                button_allowPrint.setValue(info.button_allowPrint.value)
                button_wbStyle.setValue(info.button_wbStyle.value)
            }
            styleType_selectChanged()
        }

        function button_styleType_beforerender(sender) {
            button_styleType.store = store;
            button_styleType.displayField = "name";
            button_styleType.valueField = "id"
        }

        function ButtonType_beforerender(sender) {}

        function button_styleType_afterrender(sender) {
            button_styleType.setValue('none')
        }

        function button_wbStyle_change(sender, checked) {}

        function button_expand_change(sender, checked) {}

        function hwRadio9_beforerender(sender) {}
        this.ButtonType_beforerender = ButtonType_beforerender;
        this.items = [{
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 291,
                height: 41,
                layout: "absolute",
                hidden: false,
                items: [{
                        xtype: "label",
                        id: "label",
                        text: "类型：",
                        x: 10,
                        y: 15
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "button_styleType",
                        width: 200,
                        height: 270,
                        x: 50,
                        y: 10,
                        cls: "b noneBorder",
                        selectChanged: "styleType_selectChanged",
                        margins: "10 0 0 0",
                        beforerender: "button_styleType_beforerender",
                        afterrender: "button_styleType_afterrender",
                        listeners: {
                            selectChanged: styleType_selectChanged,
                            beforerender: button_styleType_beforerender,
                            vmdafterrender: button_styleType_afterrender
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "ssDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 291,
                height: 28,
                layout: "absolute",
                hidden: false,
                hideMode: "display",
                items: [{
                        xtype: "label",
                        id: "label1",
                        text: "默认状态：",
                        x: 50,
                        y: 5
                    },
                    {
                        xtype: "radiostoregroup",
                        id: "button_rowSelect",
                        width: 130,
                        height: 30,
                        labelField: "label",
                        valueField: "value",
                        checkedField: "checked",
                        boxFieldName: "myRadio",
                        x: 120,
                        y: 0,
                        change: "button_expand_change",
                        listeners: {
                            change: button_expand_change
                        },
                        items: [{
                                xtype: "radio",
                                id: "hwRadio",
                                boxLabel: "伸展",
                                width: 59,
                                inputValue: "0"
                            },
                            {
                                xtype: "radio",
                                id: "hwRadio1",
                                boxLabel: "收缩",
                                inputValue: "1",
                                checked: true
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "checkDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 289,
                height: 51,
                layout: "absolute",
                hideMode: "display",
                items: [{
                        xtype: "checkbox",
                        id: "button_alert",
                        fieldLabel: "Checkbox",
                        boxLabel: "弹出提示框",
                        x: 50,
                        y: 25
                    },
                    {
                        xtype: "checkbox",
                        id: "button_delStore",
                        fieldLabel: "Checkbox",
                        boxLabel: "删除数据库数据",
                        x: 50,
                        y: 0
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "typeSelectDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 290,
                height: 57,
                layout: "absolute",
                hideMode: "display",
                items: [{
                        xtype: "label",
                        id: "label2",
                        text: "删除：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "label",
                        id: "label3",
                        text: "————————————————",
                        x: 50,
                        y: 10,
                        width: 210,
                        style: "color: #ccc"
                    },
                    {
                        xtype: "checkbox",
                        id: "lastDeleteOnlyData",
                        fieldLabel: "Checkbox",
                        boxLabel: "最后一条只删除数据",
                        x: 50,
                        y: 30,
                        checked: true
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "carryDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 290,
                height: 62,
                layout: "absolute",
                hideMode: "display",
                items: [{
                        xtype: "label",
                        id: "label7",
                        text: "携带：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "label",
                        id: "label8",
                        text: "————————————————",
                        x: 50,
                        y: 10,
                        width: 210,
                        style: "color: #ccc"
                    },
                    {
                        xtype: "textfield",
                        id: "button_carry",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 50,
                        y: 30,
                        cls: "b"
                    },
                    {
                        xtype: "vmd.button",
                        id: "button",
                        text: "全部",
                        type: "(none)",
                        size: "small",
                        x: 210,
                        y: 30
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "textDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 290,
                height: 113,
                layout: "absolute",
                hidden: false,
                hideMode: "display",
                items: [{
                        xtype: "label",
                        id: "label5",
                        text: "文本：",
                        x: 10,
                        y: 15
                    },
                    {
                        xtype: "textfield",
                        id: "button_text",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 50,
                        y: 10,
                        width: 200,
                        cls: "b"
                    },
                    {
                        xtype: "radiostoregroup",
                        id: "button_wbStyle",
                        width: 190,
                        height: 30,
                        labelField: "label",
                        valueField: "value",
                        checkedField: "checked",
                        boxFieldName: "myRadio",
                        x: 50,
                        y: 40,
                        change: "button_wbStyle_change",
                        listeners: {
                            change: button_wbStyle_change
                        },
                        items: [{
                                xtype: "radio",
                                id: "hwRadio8",
                                boxLabel: "文本居左",
                                width: 87,
                                checked: false,
                                inputValue: "left"
                            },
                            {
                                xtype: "radio",
                                id: "hwRadio9",
                                boxLabel: "文本居右",
                                inputValue: "right",
                                checked: true,
                                beforerender: "hwRadio9_beforerender",
                                listeners: {
                                    beforerender: hwRadio9_beforerender
                                }
                            }
                        ]
                    },
                    {
                        xtype: "checkbox",
                        id: "button_allowPrint",
                        fieldLabel: "Checkbox",
                        boxLabel: "允许打印",
                        x: 10,
                        y: 50,
                        checked: true,
                        hidden: true
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info) {
            setInfo(info)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ButtonType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ButtonType");
    }
})