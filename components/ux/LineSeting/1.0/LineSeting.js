Ext.define('vmd.ux.topTitle.Controller', {
    xtype: 'vmd.ux.topTitle.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.LineSeting", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.LineColor$1.0$LineColor", "vmd.ux.LineStyle$1.0$LineStyle", "vmd.ux.LineWidthDataInput$1.0$LineWidthDataInput"]),
    version: "1.0",
    xtype: "vmd.ux.LineSeting",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 200,
    height: 47,
    layout: "fit",
    afterrender: "LineSeting_afterrender",
    style: "/*border-bottom: 1px solid #ddd;*/",
    autoHeight: true,
    listeners: {
        vmdafterrender: function() {
            try {
                this.LineSeting_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.LineSeting'
                }, ex, 50);
            }
        }
    },
    uxCss: ".node-color{    background-color: #eee;}",
    uxrequirecss: "[\"components/ux/linecolor/1.0/css/iconfont.css\",\"components/ux/toptitle/1.0/css/iconfont.css\"]",
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
            var styleObj = {
                type: "Solid", // 线型
                width: "1", // 线宽
                color: "#000", // 线色
            }
            var LineSeting = null;
            // 鼠标移入显示标题
            function LineSeting_afterrender(sender) {
                LineSeting = sender;
                vmd.utils.tooltip("[data-tooltip]");
            }
            // 线色设置
            function hwLineColor_lineColorChange(sender, color) {
                page.fireEvent("lineColorChange", page, color);
                styleObj.color = color;
                page.fireEvent("change", LineSeting, styleObj);
            }
            // 线型设置
            function hwLineStyle_lineStyleChange(sender, line) {
                page.fireEvent("lineStyleChange", page, line);
                if (line.indexOf("Dash") > -1) {
                    styleObj.type = "dashed";
                } else if (line.indexOf("Dot") > -1) {
                    styleObj.type = "dotted";
                } else {
                    styleObj.type = "solid";
                }
                page.fireEvent("change", LineSeting, styleObj);
            }
            // 线宽设置
            function hwLineWidthDataInput_lineWidthChange(sender, value) {
                page.fireEvent("lineWidthChange", page, value);
                styleObj.width = parseFloat(value);
                page.fireEvent("change", LineSeting, styleObj);
            }

            function setOri(obj) {
                styleObj = obj;
                styleObj.type = "solid";
                if (obj.type == "dashed") {
                    styleObj.type = "ShortDash";
                } else if (obj.type == "dotted") {
                    styleObj.type = "ShortDot";
                }
                hwLineStyle.setOriLine(styleObj.type);
                hwLineWidthDataInput.setValue(styleObj.width);
                hwLineColor.setOriColor(styleObj.color);
            }

            function getValue() {
                alert("线色：" + styleObj.color + "线型：" + styleObj.type + "线宽：" + styleObj.width);
            }

            function div3_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.LineSeting',
                p2: ex.message
            }, ex, 100);
        }
        this.LineSeting_afterrender = LineSeting_afterrender;
        this.items = [{
            xtype: "vmd.div",
            id: "div3",
            autoEl: "div",
            border: false,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 220,
            height: 35,
            layout: "column",
            beforerender: "div3_beforerender",
            listeners: {
                beforerender: div3_beforerender
            },
            items: [{
                    xtype: "vmd.ux.LineColor",
                    id: "hwLineColor",
                    layout: "fit",
                    width: 50,
                    lineColorChange: "hwLineColor_lineColorChange",
                    listeners: {
                        lineColorChange: hwLineColor_lineColorChange
                    }
                },
                {
                    xtype: "vmd.ux.LineStyle",
                    id: "hwLineStyle",
                    DataViewWidth: 55,
                    layout: "fit",
                    PanleWidth: 60,
                    LineBorder: true,
                    width: 55,
                    lineStyleChange: "hwLineStyle_lineStyleChange",
                    listeners: {
                        lineStyleChange: hwLineStyle_lineStyleChange
                    }
                },
                {
                    xtype: "vmd.ux.LineWidthDataInput",
                    id: "hwLineWidthDataInput",
                    layout: "auto",
                    lineWidthChange: "hwLineWidthDataInput_lineWidthChange",
                    listeners: {
                        lineWidthChange: hwLineWidthDataInput_lineWidthChange
                    }
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setValue = function(obj) {
            //直接填写方法内容
            setOri(obj)
        }
        this.getValue = function() {
            //直接填写方法内容
            getValue()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.LineSeting");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.LineSeting");
    }
})