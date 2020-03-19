Ext.define('vmd.ux.department_personnel.Controller', {
    xtype: 'vmd.ux.department_personnel.Controller',
    constructor: function(options) {
        this.page = options
    },
    test: function() {
        // alert("测试控制层方法！")
    },
    setComDisable: function(text) {
        if (text == "汉威") {
            this.page.combo1.setDisabled(true);
            this.page.label1.setDisabled(true)
        } else {
            this.page.combo1.setDisabled(false);
            this.page.label1.setDisabled(false)
        }
    }
})
Ext.define("vmd.ux.Department_personnel", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Department_personnel",
    layoutConfig: {
        align: "middle"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 565,
    height: 39,
    layout: "hbox",
    afterrender: "Department_personnel_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.Department_personnel_afterrender(this)
        }
    },
    label1Text: "单位:",
    label2Text: "人员:",
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
        var DP_constroller = new vmd.ux.department_personnel.Controller(this)

        function combo_change(sender, value, text) {
            DP_constroller.setComDisable(text)
            page.fireEvent("comList1SelChange", sender, value, text)
        }

        function combo1_change(sender, value, text) {
            page.fireEvent("comList2SelChange", sender, value, text)
        }

        function Department_personnel_afterrender(sender) {
            DP_constroller.test()
        }
        this.Department_personnel_afterrender = Department_personnel_afterrender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: this.label1Text,
                x: 50,
                y: 40
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                x: 110,
                y: 50,
                flex: 1,
                change: "combo_change",
                listeners: {
                    change: combo_change
                },
                store: this.combo1store,
                displayField: this.combo1DisplayField,
                valueField: this.combo1ValueField
            },
            {
                xtype: "label",
                id: "label1",
                text: this.label2Text,
                x: 360,
                y: 30
            },
            {
                xtype: "vmd.combo",
                id: "combo1",
                x: 420,
                y: 40,
                flex: 1,
                change: "combo1_change",
                listeners: {
                    change: combo1_change
                },
                store: this.combo2store,
                displayField: this.combo2DisplayField,
                valueField: this.combo2ValueField
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setLabel1text = function(value) {
            //直接填写方法内容
            this.label1.setText(value)
        }
        this.setLabel2Text = function(value) {
            //直接填写方法内容
            this.label2.setText(value)
        }
        this.getComList1SelValue = function() {
            //直接填写方法内容
            return combo.getValue()
        }
        this.getComList2SelValue = function() {
            //直接填写方法内容
            return combo1.getValue()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.Department_personnel");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Department_personnel");
    }
})