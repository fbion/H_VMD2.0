undefined
Ext.define("vmd.ux.DateType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DateType",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 621,
    layout: "absolute",
    beforerender: "DateType_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.DateType_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.DateType'
                }, ex, 50);
            }
        }
    },
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
            var store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'id']
            });
            var data = [{
                name: 'yyyy-MM-dd',
                id: '%Y-%m-%d'
            }, {
                name: 'yyyy年MM月dd日',
                id: '%Y年%m月%d日'
            }, {
                name: 'yyyy年MM月dd日 hh时mm分',
                id: '%Y年%m月%d日 %H时%i分'
            }, {
                name: 'yyyyMMdd',
                id: '%Y%m%d'
            }, {
                name: 'yyyy年MM月',
                id: '%Y年%m月'
            }, {
                name: 'yyyy年',
                id: '%Y年'
            }, {
                name: 'hh时mm分',
                id: '%H时%i分'
            }];
            store.loadData(data);

            function dateStyle_afterrender(sender) {
                rq_dateStyle.store = store;
                rq_dateStyle.displayField = "name"
                rq_dateStyle.valueField = "id"
            }

            function allowEmpty_check(sender, checked) {
                if (rq_allowEmpty.checked) {
                    rq_emptyAlert.hide()
                    aaa.hide()
                    rq_emptyAlert.setValue('')
                    rq_emptyAlert.fireEvent("change", rq_allowEmpty, "")
                } else {
                    rq_emptyAlert.show()
                    aaa.show()
                }
            }

            function DateType_beforerender(sender) {}

            function rq_customize_check(sender, checked) {
                if (checked) {
                    rq_customFormat.show()
                    rq_dateStyle.disable()
                } else {
                    rq_customFormat.hide()
                    rq_dateStyle.enable()
                }
            }

            function setInfo(info) {
                // debugger
                if (info.rq_customize.checked == 1 || info.rq_customize.checked == true) {
                    rq_customize.setValue(true)
                    rq_customFormat.setValue(info.rq_customFormat.value)
                } else {
                    rq_dateStyle.setValue(info.rq_dateStyle.value)
                    rq_customize.setValue(false)
                }
                if (info.rq_allowEdit.checked == 1 || info.rq_allowEdit.checked == true) {
                    rq_allowEdit.setValue(true)
                } else {
                    rq_allowEdit.setValue(false)
                }
                if (info.rq_allowEmpty.checked == 1 || info.rq_allowEmpty.checked == true) {
                    rq_allowEmpty.setValue(true)
                } else {
                    rq_allowEmpty.setValue(false)
                    rq_emptyAlert.setValue(info.rq_emptyAlert.value)
                }
                if (info.rq_allowPrint.checked == 1 || info.rq_allowPrint.checked == true) {
                    rq_allowPrint.setValue(true)
                } else {
                    rq_allowPrint.setValue(false)
                }
                rq_defaultToday.setValue(info.rq_defaultToday.checked)
            }

            function rq_customFormat_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.DateType',
                p2: ex.message
            }, ex, 100);
        }
        this.DateType_beforerender = DateType_beforerender;
        this.items = [{
                xtype: "checkbox",
                id: "rq_allowEdit",
                fieldLabel: "Checkbox",
                boxLabel: "允许编辑",
                x: 10,
                y: 10,
                checked: true
            },
            {
                xtype: "checkbox",
                id: "rq_customize",
                fieldLabel: "Checkbox",
                boxLabel: "自定义格式",
                x: 10,
                y: 40,
                check: "rq_customize_check",
                listeners: {
                    check: rq_customize_check
                }
            },
            {
                xtype: "label",
                id: "label",
                text: "格式：",
                x: 10,
                y: 75
            },
            {
                xtype: "vmd.comlist",
                id: "rq_dateStyle",
                width: 180,
                height: 270,
                x: 50,
                y: 70,
                style: "border: 1px solid #dddddd",
                afterrender: "dateStyle_afterrender",
                listeners: {
                    vmdafterrender: dateStyle_afterrender
                }
            },
            {
                xtype: "checkbox",
                id: "rq_defaultToday",
                fieldLabel: "Checkbox",
                boxLabel: "默认当前日期",
                x: 10,
                y: 110,
                checked: true
            },
            {
                xtype: "checkbox",
                id: "rq_allowPrint",
                fieldLabel: "Checkbox",
                boxLabel: "允许打印",
                x: 10,
                y: 140,
                checked: true
            },
            {
                xtype: "label",
                id: "label1",
                text: "校验",
                x: 10,
                y: 180
            },
            {
                xtype: "label",
                id: "label2",
                text: "————————————————————",
                x: 40,
                y: 180,
                width: 260,
                style: "color:#dddddd;"
            },
            {
                xtype: "checkbox",
                id: "rq_allowEmpty",
                fieldLabel: "Checkbox",
                boxLabel: "允许为空",
                x: 10,
                y: 210,
                checked: true,
                check: "allowEmpty_check",
                listeners: {
                    check: allowEmpty_check
                }
            },
            {
                xtype: "label",
                id: "aaa",
                text: "提示信息：",
                x: 10,
                y: 245,
                hidden: true
            },
            {
                xtype: "textfield",
                id: "rq_emptyAlert",
                allowBlank: true,
                enableKeyEvents: true,
                x: 70,
                y: 240,
                width: 140,
                style: "border: 1px solid #dddddd",
                disabled: false,
                hidden: true
            },
            {
                xtype: "textfield",
                id: "rq_customFormat",
                allowBlank: true,
                enableKeyEvents: true,
                x: 100,
                y: 40,
                width: 130,
                style: "border: 1px solid #ddd",
                hidden: true
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getInfo = function(att) {
            var temp;
            if (att == "rq_allowEdit") {
                temp = rq_allowEdit.getValue()
            } else if (att == "rq_customize") {
                temp = rq_customize.getValue()
            } else if (att == "rq_dateStyle") {
                temp = rq_dateStyle.getValue()
            } else if (att == "rq_defaultToday") {
                temp = rq_defaultToday.getValue()
            } else if (att == "rq_allowPrint") {
                temp = rq_allowPrint.getValue()
            } else if (att == "rq_allowEmpty") {
                temp = rq_allowEmpty.getValue()
            } else if (att == "rq_emptyAlert") {
                temp = rq_emptyAlert.getValue()
            }
            return temp
        }
        this.setInfo = function(info) {
            setInfo(info)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DateType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DateType");
    }
})