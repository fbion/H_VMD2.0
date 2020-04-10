Ext.define('vmd.ux.number.Controller', {
    xtype: 'vmd.ux.number.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.LineWidthDataInput", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.LineWidthDataInput",
    title: "Panel",
    header: false,
    border: true,
    panelWidth: 240,
    width: 40,
    height: 30,
    layout: "auto",
    bodyStyle: "position: relative;",
    afterrender: "LineWidthDataInput_afterrender",
    style: "border: 1px solid #ddd;    min-width: 40px;",
    listeners: {
        vmdafterrender: function() {
            try {
                this.LineWidthDataInput_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.LineWidthDataInput'
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
            var page = this;
            var numSender = null;

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
                page.fireEvent("lineWidthChange", numSender, value, "szd")
            }

            function div1_click(sender, e) {
                var numValue = sz_decimalPoints.getValue();
                if (!numValue || numValue == '') {
                    numValue = '0';
                }
                if (!page.allowMinus && parseFloat(numValue) == 0) {
                    return
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
                page.fireEvent("lineWidthChange", numSender, value, "szd")
            }

            function setValue(value) {
                var v = parseFloat(value);
                if (isNaN(v)) {
                    sz_decimalPoints.setValue('');
                } else {
                    sz_decimalPoints.setValue(value);
                }
            }

            function getValue() {
                return sz_decimalPoints.getValue();
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
                    page.fireEvent("lineWidthChange", numSender, value, "szd")
                })
            }

            function LineWidthDataInput_afterrender(sender) {
                numSender = sender;
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.LineWidthDataInput',
                p2: ex.message
            }, ex, 100);
        }
        this.LineWidthDataInput_afterrender = LineWidthDataInput_afterrender;
        this.items = [{
                xtype: "vmd.div",
                id: "hwDiv1",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                height: 30,
                layout: "fit",
                style: "float: left;    width: 45%;",
                items: [{
                    xtype: "textfield",
                    id: "sz_decimalPoints",
                    allowBlank: true,
                    enableKeyEvents: true,
                    height: 28,
                    x: 0,
                    y: 0,
                    style: "/*border: 1px solid #ddd;*/    border: none;",
                    afterrender: "sz_decimalPoints_afterrender",
                    grow: false,
                    listeners: {
                        vmdafterrender: sz_decimalPoints_afterrender
                    }
                }]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 16,
                height: 28,
                layout: "absolute",
                style: "/*border: 1px solid #ddd;*/    border: none;    float: right;    width: 19%;",
                items: [{
                        xtype: "vmd.div",
                        id: "div",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 14,
                        x: 4,
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
                        x: 4,
                        y: 14,
                        style: "cursor: pointer;    color: #646464;",
                        click: "div1_click",
                        backgroundImage: "icon-caret-down",
                        listeners: {
                            click: div1_click
                        }
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getVlaue = function() {
            //直接填写方法内容
            return getValue();
        }
        this.setValue = function(value) {
            setValue(value)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.LineWidthDataInput");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.LineWidthDataInput");
    }
})