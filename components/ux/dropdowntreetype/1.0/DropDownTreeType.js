Ext.define('vmd.ux.dropDownTreeType.Controller', {
    xtype: 'vmd.ux.dropDownTreeType.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.DropDownTreeType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DropDownTreeType",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 621,
    layout: "absolute",
    afterrender: "DropDownTreeType_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.DropDownTreeType_afterrender(this)
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

        function div_click(sender, e) {
            if (parseFloat(myWidth.getValue()) <= 0) {
                myWidth.setValue(0)
                page.fireEvent("decimalChanged", myWidth, myWidth.value)
            } else {
                myWidth.setValue(parseFloat(myWidth.getValue()) - 10);
                page.fireEvent("decimalChanged", myWidth, myWidth.value)
            }
        }

        function div1_click(sender, e) {
            myWidth.setValue(parseFloat(myWidth.getValue()) + 10);
            page.fireEvent("decimalChanged", myWidth, myWidth.value)
        }

        function myWidth_afterrender(sender) {
            myWidth.setValue(100)
        }

        function setInfo(info, cell) {
            if (info) {
                myWidth.setValue(info.myWidth.value)
                selectableType.setValue(info.selectableType.value)
                ddt_height.setValue(info.ddt_height.value)
                ddt_allowEmpty.setValue(info.ddt_allowEmpty.checked)
                ddt_emptyAlert.setValue(info.ddt_emptyAlert.value)
            }
        }

        function selectableType_afterrender(sender) {
            sender.store = store;
            sender.displayField = 'name'
            sender.valueField = 'value'
            selectableType.setValue('')
        }

        function ddt_allowEmpty_check(sender, checked) {
            if (checked) {
                label4.hide()
                ddt_emptyAlert.hide()
            } else {
                label4.show()
                ddt_emptyAlert.show()
            }
        }

        function DropDownTreeType_afterrender(sender) {}

        function ddt_height_afterrender(sender) {
            sender.setValue(250)
        }
        this.DropDownTreeType_afterrender = DropDownTreeType_afterrender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "宽度：",
                x: 10,
                y: 13
            },
            {
                xtype: "numberfield",
                id: "myWidth",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 50,
                y: 8,
                style: "border: 1px solid #dddddd",
                afterrender: "myWidth_afterrender",
                listeners: {
                    vmdafterrender: myWidth_afterrender
                }
            },
            {
                xtype: "label",
                id: "label1",
                text: "%",
                x: 200,
                y: 13
            },
            {
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 30,
                height: 15,
                x: 180,
                y: 19,
                style: "cursor: pointer",
                html: "<img src=\"/system/img/report/border/下.png\" />",
                click: "div_click",
                listeners: {
                    click: div_click
                }
            },
            {
                xtype: "vmd.div",
                id: "div1",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 30,
                height: 15,
                x: 180,
                y: 8,
                style: "cursor: pointer",
                html: "<img src=\"/system/img/report/border/上.png\" />",
                click: "div1_click",
                listeners: {
                    click: div1_click
                }
            },
            {
                xtype: "label",
                id: "label2",
                text: "节点选择方式：",
                x: 10,
                y: 80
            },
            {
                xtype: "vmd.comlist",
                id: "selectableType",
                width: 165,
                height: 270,
                x: 50,
                y: 105,
                style: "border: 1px solid #ddd",
                afterrender: "selectableType_afterrender",
                listeners: {
                    vmdafterrender: selectableType_afterrender
                }
            },
            {
                xtype: "label",
                id: "label3",
                text: "高度：",
                x: 10,
                y: 50,
                hidden: false
            },
            {
                xtype: "checkbox",
                id: "ddt_allowEmpty",
                fieldLabel: "Checkbox",
                boxLabel: "允许为空",
                x: 10,
                y: 140,
                checked: true,
                check: "ddt_allowEmpty_check",
                listeners: {
                    check: ddt_allowEmpty_check
                }
            },
            {
                xtype: "label",
                id: "label4",
                text: "提示信息：",
                x: 10,
                y: 173,
                height: 20,
                hidden: true
            },
            {
                xtype: "textfield",
                id: "ddt_emptyAlert",
                allowBlank: true,
                enableKeyEvents: true,
                x: 70,
                y: 170,
                width: 130,
                hidden: true,
                style: "border: 1px solid #ddd"
            },
            {
                xtype: "numberfield",
                id: "ddt_height",
                allowDecimals: true,
                allowNegative: true,
                decimalPrecision: 2,
                allowBlank: true,
                x: 50,
                y: 45,
                style: "border: 1px solid #ddd",
                afterrender: "ddt_height_afterrender",
                listeners: {
                    vmdafterrender: ddt_height_afterrender
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info, cell) {
            //直接填写方法内容
            setInfo(info, cell);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DropDownTreeType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DropDownTreeType");
    }
})