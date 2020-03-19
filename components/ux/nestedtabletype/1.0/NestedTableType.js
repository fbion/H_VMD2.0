Ext.define('vmd.ux.nestedTableType.Controller', {
    xtype: 'vmd.ux.nestedTableType.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.NestedTableType", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.NestedTableType",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 290,
    height: 621,
    layout: "absolute",
    afterrender: "NestedTableType_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.NestedTableType_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.NestedTableType'
                }, ex, 50);
            }
        }
    },
    uxCss: ".b{    border: 1px solid #dddddd}",
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

            function setInfo(info, sheet) {
                debugger
                if (info) {
                    qtb_template.setValue(info.qtb_template.value)
                    qtb_tableName.setValue(info.qtb_tableName.value)
                    if (info.qtb_style.value == 0) {
                        qtb_style_embed.setValue(true)
                        qtb_style_expand.setValue(false)
                        qtb_unfold.disable()
                        qtb_unfold.setValue(info.qtb_unfold.checked)
                    } else {
                        qtb_style_embed.setValue(false)
                        qtb_style_expand.setValue(true)
                        qtb_unfold.enable()
                        qtb_unfold.setValue(info.qtb_unfold.checked)
                    }
                    // if (info.qtb_style.value && info.qtb_style.value.inputValue) {
                    //     qtb_style.setValue(info.qtb_style.value.inputValue);
                    // } else {
                    //     qtb_style.setValue(info.qtb_style.value);
                    // }
                }
                if (sheet) {
                    page.o = sheet;
                }
            }

            function NestedTableType_afterrender(sender) {}

            function qtb_template_keyup(sender, e) {
                // if(page.o.nestedNo != null) {
                //     page.o.nestedTableArray[page.o.nestedNo].qtb_template = qtb_template.getValue();
                // }
            }

            function qtb_tableName_keyup(sender, e) {
                // if(page.o.nestedNo != null) {
                //     page.o.nestedTableArray[page.o.nestedNo].qtb_tableName = qtb_tableName.getValue();
                // }
            }

            function qtb_style_change(sender, checked) {
                // if (page.o && page.o.nestedNo != null) {
                //     page.o.nestedTableArray[page.o.nestedNo].qtb_style = qtb_style.getValue();
                // }
            }

            function qtb_unfold_check(sender, checked) {
                // if (page.o && page.o.nestedNo != null) {
                //     page.o.nestedTableArray[page.o.nestedNo].qtb_unfold = qtb_unfold.getValue();
                // }
            }

            function qtb_style_embed_afterrender(sender) {
                sender.on('check', function(sender, value) {
                    if (value) {
                        var cell = sheetHot.dealInvert()[0];
                        for (var i = cell.sr; i < cell.er + 1; i++) {
                            for (var n = cell.sc; n < cell.ec + 1; n++) {
                                if (sheetHot.getCellMeta(i, n).mergeId != 2) {
                                    sheetHot.changeAttributeInfo(i, n, 'qtb_style', 0)
                                }
                            }
                        }
                        qtb_style_expand.setValue(false)
                        qtb_unfold.disable()
                    }
                })
            }

            function qtb_style_expand_afterrender(sender) {
                sender.on('check', function(sender, value) {
                    if (value) {
                        var cell = sheetHot.dealInvert()[0];
                        for (var i = cell.sr; i < cell.er + 1; i++) {
                            for (var n = cell.sc; n < cell.ec + 1; n++) {
                                if (sheetHot.getCellMeta(i, n).mergeId != 2) {
                                    sheetHot.changeAttributeInfo(i, n, 'qtb_style', 1)
                                }
                            }
                        }
                        qtb_style_embed.setValue(false)
                        qtb_unfold.enable()
                    }
                })
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.NestedTableType',
                p2: ex.message
            }, ex, 100);
        }
        this.NestedTableType_afterrender = NestedTableType_afterrender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 610,
            width: 290,
            items: [{
                xtype: "panel",
                id: "panel",
                title: "属性",
                header: false,
                border: true,
                height: 589,
                layout: "absolute",
                items: [{
                        xtype: "label",
                        id: "label",
                        text: "模板：",
                        x: 10,
                        y: 15
                    },
                    {
                        xtype: "textfield",
                        id: "qtb_template",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 50,
                        y: 10,
                        width: 180,
                        style: "border: 1px solid #dddddd",
                        keyup: "qtb_template_keyup",
                        disabled: true,
                        listeners: {
                            keyup: qtb_template_keyup
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 240,
                        y: 10,
                        width: 28,
                        height: 24,
                        disabled: true
                    },
                    {
                        xtype: "label",
                        id: "label1",
                        text: "名称：",
                        x: 10,
                        y: 55
                    },
                    {
                        xtype: "textfield",
                        id: "qtb_tableName",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 50,
                        y: 50,
                        width: 180,
                        style: "border: 1px solid #dddddd",
                        keyup: "qtb_tableName_keyup",
                        listeners: {
                            keyup: qtb_tableName_keyup
                        }
                    },
                    {
                        xtype: "radiostoregroup",
                        id: "qtb_style",
                        width: 160,
                        height: 30,
                        labelField: "label",
                        valueField: "value",
                        checkedField: "checked",
                        boxFieldName: "myRadio",
                        x: 40,
                        y: 120,
                        change: "qtb_style_change",
                        hidden: true,
                        listeners: {
                            change: qtb_style_change
                        },
                        items: [{
                                xtype: "radio",
                                id: "hwRadio",
                                boxLabel: "内嵌式",
                                width: 78,
                                inputValue: "0",
                                checked: true
                            },
                            {
                                xtype: "radio",
                                id: "hwRadio1",
                                boxLabel: "伸缩式",
                                inputValue: "1"
                            }
                        ]
                    },
                    {
                        xtype: "checkbox",
                        id: "qtb_unfold",
                        fieldLabel: "Checkbox",
                        boxLabel: "展开",
                        x: 220,
                        y: 90,
                        check: "qtb_unfold_check",
                        listeners: {
                            check: qtb_unfold_check
                        }
                    },
                    {
                        xtype: "radio",
                        id: "qtb_style_embed",
                        fieldLabel: "Radio",
                        boxLabel: "内嵌式",
                        x: 50,
                        y: 90,
                        checked: true,
                        inputValue: "embed",
                        hidden: false,
                        afterrender: "qtb_style_embed_afterrender",
                        listeners: {
                            vmdafterrender: qtb_style_embed_afterrender
                        }
                    },
                    {
                        xtype: "radio",
                        id: "qtb_style_expand",
                        fieldLabel: "Radio",
                        boxLabel: "伸缩式",
                        x: 130,
                        y: 90,
                        inputValue: "expand",
                        hidden: false,
                        afterrender: "qtb_style_expand_afterrender",
                        listeners: {
                            vmdafterrender: qtb_style_expand_afterrender
                        }
                    }
                ]
            }]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getInfo = function(att) {
            //直接填写方法内容
            var temp;
            if (att == "qtb_template") {
                temp = qtb_template.getValue()
            } else if (att == "qtb_tableName") {
                temp = qtb_tableName.getValue()
            } else if (att == "qtb_unfold") {
                temp = qtb_unfold.getValue()
            } else if (att == "qtb_style") {
                temp = qtb_style.getValue()
            }
            return temp;
        }
        this.setInfo = function(info, sheet) {
            //直接填写方法内容
            setInfo(info, sheet)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.NestedTableType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.NestedTableType");
    }
})