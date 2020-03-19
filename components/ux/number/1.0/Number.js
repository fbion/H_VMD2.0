Ext.define('vmd.ux.number.Controller', {
    xtype: 'vmd.ux.number.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.Number", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Number",
    title: "Panel",
    header: false,
    border: false,
    width: 145,
    height: 36,
    layout: "absolute",
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

        function div_click(sender, e) {
            var numValue = sz_decimalPoints.getValue();
            if (!numValue || numValue == '') {
                numValue = '0';
            }
            if (numValue.indexOf("%") != -1) {
                sz_decimalPoints.setValue(parseFloat(numValue) + 1 + "%")
            } else {
                sz_decimalPoints.setValue(parseFloat(numValue) + 1)
            }
            var value;
            if (sz_decimalPoints.getValue() && sz_decimalPoints.getValue().indexOf("%") != -1) {
                value = sz_decimalPoints.getValue();
            } else {
                value = parseFloat(sz_decimalPoints.getValue());
            }
            page.fireEvent("szDecimalChanged", sz_decimalPoints, value, "szd")
        }

        function div1_click(sender, e) {
            var numValue = sz_decimalPoints.getValue();
            if (!numValue || numValue == '') {
                numValue = '0';
            }
            if (numValue.indexOf("%") != -1) {
                sz_decimalPoints.setValue(parseFloat(numValue) - 1 + "%")
            } else {
                sz_decimalPoints.setValue(parseFloat(numValue) - 1)
            }
            var value;
            if (sz_decimalPoints.getValue() && sz_decimalPoints.getValue().indexOf("%") != -1) {
                value = sz_decimalPoints.getValue();
            } else {
                value = parseFloat(sz_decimalPoints.getValue());
            }
            page.fireEvent("szDecimalChanged", sz_decimalPoints, value, "szd")
        }

        function setValue(value) {
            var v = parseFloat(value);
            if (isNaN(v)) {
                sz_decimalPoints.setValue('');
            } else {
                sz_decimalPoints.setValue(value);
            }
        }

        function sz_decimalPoints_afterrender(sender) {
            sz_decimalPoints.regex = /^(-)?\d+(\.\d+){0,1}[%]{0,1}$/;
            sz_decimalPoints.regexText = '只能输入数字或百分数！'
            sz_decimalPoints.addListener('change', function() {
                var value;
                if (sz_decimalPoints.getValue() && sz_decimalPoints.getValue().indexOf("%") != -1) {
                    value = sz_decimalPoints.getValue();
                } else {
                    value = parseFloat(sz_decimalPoints.getValue());
                }
                page.fireEvent("szDecimalChanged", sz_decimalPoints, value, "szd")
            })
        }
        this.items = [{
                xtype: "textfield",
                id: "sz_decimalPoints",
                allowBlank: true,
                enableKeyEvents: true,
                height: 26,
                width: 142,
                x: 0,
                y: 5,
                style: "border:1px solid #ddd;",
                afterrender: "sz_decimalPoints_afterrender",
                listeners: {
                    vmdafterrender: sz_decimalPoints_afterrender
                }
            },
            {
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 30,
                height: 14,
                x: 130,
                y: 4,
                style: "cursor: pointer;    color: #646464;",
                click: "div_click",
                backgroundImage: "icon-caret-up",
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
                height: 14,
                x: 130,
                y: 16,
                style: "cursor: pointer;    color: #646464;",
                click: "div1_click",
                backgroundImage: "icon-caret-down",
                listeners: {
                    click: div1_click
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getInfo = function(att) {
            //直接填写方法内容
            var temp;
            if (att == "sz_allowEdit") {
                temp = sz_allowEdit.getValue()
            } else if (att == "sz_allowEmpty") {
                temp = sz_allowEmpty.getValue()
            } else if (att == "sz_allowPrint") {
                temp = sz_allowPrint.getValue()
            } else if (att == "sz_allowFloat") {
                temp = sz_allowFloat.getValue()
            } else if (att == "sz_allowNegative") {
                temp = sz_allowNegative.getValue()
            } else if (att == "sz_max") {
                temp = sz_max.getValue()
            } else if (att == "sz_min") {
                temp = sz_min.getValue()
            } else if (att == "sz_limit") {
                temp = sz_limit.getValue()
            } else if (att == "sz_decimalPoints") {
                temp = sz_decimalPoints.getValue()
            } else if (att == "sz_emptyAlert") {
                temp = sz_emptyAlert.getValue()
            }
            return temp
        }
        this.setOriValue = function(value) {
            setValue(value)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.Number");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Number");
    }
})