Ext.define('vmd.ux.seriesClass.Controller', {
    xtype: 'vmd.ux.seriesClass.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.SeriesClass", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.LineStyle$1.0$LineStyle", "vmd.ux.Number$1.0$Number", "vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.Number$1.0$Number", "vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.Number$1.0$Number", "vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.Number$1.0$Number"]),
    version: "1.0",
    xtype: "vmd.ux.SeriesClass",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 320,
    height: 1200,
    layout: "border",
    padding: "10 0 0 0 ",
    uxCss: ".in-text{    border: 1px solid #ddd;}.bnt-text{    margin-top: 5px;    line-height: 8px;    margin-right: 3px;}.comlist-b{    border:1px solid #ddd;}.comlist-b input{    border:0;}",
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

            function seriType_afterrender(sender) {
                var typeData = [{
                    id: 'line',
                    name: '折线图'
                }, {
                    id: 'column',
                    name: '柱形图'
                }, {
                    id: 'area',
                    name: '面积图'
                }, {
                    id: 'pie',
                    name: '饼状图'
                }, {
                    id: 'scatter',
                    name: '散点图'
                }, {
                    id: 'spline',
                    name: '曲线图'
                }];
                var store = new vmd.data.Store({
                    data: typeData,
                    fields: ['id', 'name']
                })
                seriType.store = store;
                seriType.valueField = 'id';
                seriType.displayField = 'name';
            }

            function step_afterrender(sender) {
                var typeData = [{
                    id: 'none',
                    name: '无'
                }, {
                    id: 'left',
                    name: '左'
                }, {
                    id: 'center',
                    name: '中'
                }, {
                    id: 'right',
                    name: '右'
                }];
                var store = new vmd.data.Store({
                    data: typeData,
                    fields: ['id', 'name']
                })
                step.store = store;
                step.valueField = 'id';
                step.displayField = 'name';
                step.setValue('none');
            }

            function ponitType_afterrender(sender) {
                var typeData = [{
                    id: 'circle',
                    name: '圆形'
                }, {
                    id: 'square',
                    name: '正方形'
                }, {
                    id: 'diamond',
                    name: '菱形'
                }, {
                    id: 'triangle',
                    name: '三角形'
                }, {
                    id: "triangle-down",
                    name: '倒三角形'
                }];
                var store = new vmd.data.Store({
                    data: typeData,
                    fields: ['id', 'name']
                })
                ponitType.store = store;
                ponitType.valueField = 'id';
                ponitType.displayField = 'name';
            }

            function LineStyle_lineChagen(sender, line) {
                page.fireEvent("LineStyleChange", LineStyle, line)
            }

            function lineWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("lineWidthChange", sender, value)
            }

            function lineColor_colorchange(sender, selColor) {
                page.fireEvent("lineColorChange", sender, selColor)
            }

            function pointRadius_szDecimalChanged(sender, value, describe) {
                page.fireEvent("pointRadiusChange", sender, value)
            }

            function ponLinWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("ponLinWidthChange", sender, value)
            }

            function ponLinColor_colorchange(sender, selColor) {
                page.fireEvent("ponLinColorChange", ponLinColor, selColor)
            }

            function ponFillColor_colorchange(sender, selColor) {
                page.fireEvent("ponFillColorChange", ponFillColor, selColor)
            }

            function columnColor_colorchange(sender, selColor) {
                page.fireEvent("lineColorChange", sender, selColor)
            }

            function borderWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("columnBorderWidthChange", sender, value)
            }

            function borderRadius_szDecimalChanged(sender, value, describe) {
                page.fireEvent("columnBorderRadiusChange", sender, value)
            }

            function borderColor_colorchange(sender, selColor) {
                page.fireEvent("columnBorderColorChange", sender, selColor)
            }

            function innerSize_szDecimalChanged(sender, value, describe) {
                page.fireEvent("peiInnerSizeChange", sender, value)
            }

            function areaColorSelect_colorchange(sender, selColor) {
                page.fireEvent("areaColorChange", sender, selColor)
            }

            function maxPointWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("maxPointWidthChange", sender, value)
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.SeriesClass',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "vmd.div",
                id: "div1",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 146,
                height: 50,
                region: "center",
                items: [{
                        xtype: "vmd.div",
                        id: "div18",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label3",
                            text: "序列类型",
                            x: 20,
                            y: 0,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div19",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label7",
                            text: "线属性",
                            x: 8,
                            y: 0,
                            width: 60,
                            style: "font-size:13px;    font-weight: bold;"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div6",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "label",
                            id: "label2",
                            text: "线型",
                            x: 20,
                            y: 0,
                            width: 70
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div10",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "label",
                            id: "label4",
                            text: "宽度",
                            x: 20,
                            y: 3,
                            width: 80
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div15",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "label",
                            id: "label",
                            text: "颜色",
                            x: 20,
                            y: 5,
                            width: 80
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div16",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "label",
                            id: "label5",
                            text: "阶梯图",
                            x: 20,
                            y: 8,
                            width: 80
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div21",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 10px;"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div22",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "label",
                            id: "label8",
                            text: "点属性",
                            x: 8,
                            y: 0,
                            width: 60,
                            style: "font-size: 13px;    font-weight: bold;"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div37",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 22,
                        layout: "auto",
                        y: 5
                    },
                    {
                        xtype: "vmd.div",
                        id: "div26",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "label",
                            id: "label9",
                            text: "点形状",
                            x: 20,
                            y: 8,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div27",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label10",
                            text: "点半径",
                            x: 20,
                            y: 8,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div28",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label11",
                            text: "外线宽度",
                            x: 20,
                            y: 5,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div39",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label1",
                            text: "外线颜色",
                            x: 20,
                            y: 7,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div40",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "label",
                            id: "label6",
                            text: "填充颜色",
                            x: 20,
                            y: 8,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 15px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel",
                            text: "面积图",
                            x: 8,
                            y: 0,
                            width: 60,
                            style: "font-size: 13px;    font-weight: bold;",
                            height: 20
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv1",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 2px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel1",
                            text: "填充颜色",
                            x: 20,
                            y: 8,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div52",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label12",
                            text: "柱属性",
                            x: 8,
                            y: 10,
                            width: 60,
                            style: "font-size: 13px;    font-weight: bold;"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div53",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label13",
                            text: "柱形颜色",
                            x: 20,
                            y: 8,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div54",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label14",
                            text: "边框宽度",
                            x: 20,
                            y: 8,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div55",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label15",
                            text: "边框圆角",
                            x: 20,
                            y: 8,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div56",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 2px;",
                        items: [{
                            xtype: "label",
                            id: "label16",
                            text: "边框颜色",
                            x: 20,
                            y: 8,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv3",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel2",
                            text: "最大宽度",
                            x: 20,
                            y: 8,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div50",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label17",
                            text: "饼属性",
                            x: 8,
                            y: 10,
                            width: 60,
                            style: "font-size: 13px;    font-weight: bold;"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div51",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 2px;",
                        items: [{
                            xtype: "label",
                            id: "label18",
                            text: "饼内半径",
                            x: 20,
                            y: 8,
                            width: 60
                        }]
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 180,
                height: 820,
                region: "east",
                items: [{
                        xtype: "vmd.div",
                        id: "div7",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div14",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.comlist",
                                id: "seriType",
                                height: 270,
                                cls: "comlist-b",
                                editable: false,
                                afterrender: "seriType_afterrender",
                                listeners: {
                                    vmdafterrender: seriType_afterrender
                                }
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div25",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 1px;"
                    },
                    {
                        xtype: "panel",
                        id: "linePanel",
                        title: "Panel",
                        header: false,
                        border: false,
                        height: 170,
                        width: 142,
                        items: [{
                                xtype: "vmd.div",
                                id: "div2",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 182,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 3px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div3",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 144,
                                    height: 30,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.LineStyle",
                                        id: "LineStyle",
                                        layout: "fit",
                                        width: 142,
                                        lineChagen: "LineStyle_lineChagen",
                                        listeners: {
                                            lineChagen: LineStyle_lineChagen
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div8",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 181,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div9",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 32,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "lineWidth",
                                        layout: "absolute",
                                        szDecimalChanged: "lineWidth_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: lineWidth_szDecimalChanged
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div11",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 180,
                                height: 31,
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 5px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div12",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.ColorSelect",
                                        id: "lineColor",
                                        layout: "fit",
                                        colorchange: "lineColor_colorchange",
                                        listeners: {
                                            colorchange: lineColor_colorchange
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div23",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 179,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 3px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div24",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.comlist",
                                        id: "step",
                                        height: 270,
                                        cls: "comlist-b",
                                        style: "margin-top: 3px;",
                                        editable: false,
                                        afterrender: "step_afterrender",
                                        listeners: {
                                            vmdafterrender: step_afterrender
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div13",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 179,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 3px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div17",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    layout: "absolute",
                                    items: [{
                                        xtype: "checkbox",
                                        id: "connectNulls",
                                        fieldLabel: "Checkbox",
                                        boxLabel: "连接空值",
                                        y: 8,
                                        style: "margin-top: 5px;"
                                    }]
                                }]
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div20",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5
                    },
                    {
                        xtype: "vmd.div",
                        id: "div4",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 179,
                        height: 30,
                        layout: "auto",
                        y: 5,
                        items: [{
                            xtype: "vmd.div",
                            id: "div5",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            layout: "absolute",
                            items: [{
                                xtype: "checkbox",
                                id: "pointShow",
                                fieldLabel: "Checkbox",
                                boxLabel: "显示点",
                                y: 0,
                                style: "margin-top: 5px;"
                            }]
                        }]
                    },
                    {
                        xtype: "panel",
                        id: "poinPanel",
                        title: "Panel",
                        header: false,
                        border: false,
                        height: 167,
                        width: 142,
                        items: [{
                                xtype: "vmd.div",
                                id: "div29",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 182,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 3px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div30",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.comlist",
                                        id: "ponitType",
                                        width: 350,
                                        height: 270,
                                        cls: "comlist-b",
                                        afterrender: "ponitType_afterrender",
                                        editable: false,
                                        listeners: {
                                            vmdafterrender: ponitType_afterrender
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div41",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 173,
                                height: 32,
                                layout: "auto",
                                y: 5,
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div42",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 32,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "pointRadius",
                                        layout: "absolute",
                                        szDecimalChanged: "pointRadius_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: pointRadius_szDecimalChanged
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div31",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 181,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div32",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 32,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "ponLinWidth",
                                        layout: "absolute",
                                        szDecimalChanged: "ponLinWidth_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: ponLinWidth_szDecimalChanged
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div33",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 180,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 7px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div34",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.ColorSelect",
                                        id: "ponLinColor",
                                        layout: "fit",
                                        colorchange: "ponLinColor_colorchange",
                                        listeners: {
                                            colorchange: ponLinColor_colorchange
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div35",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 180,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                style: "margin-top:2px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div36",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.ColorSelect",
                                        id: "ponFillColor",
                                        layout: "fit",
                                        colorchange: "ponFillColor_colorchange",
                                        listeners: {
                                            colorchange: ponFillColor_colorchange
                                        }
                                    }]
                                }]
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div57",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 1px;"
                    },
                    {
                        xtype: "panel",
                        id: "areaPanel",
                        title: "Panel",
                        header: false,
                        border: false,
                        height: 40,
                        width: 145,
                        items: [{
                            xtype: "vmd.div",
                            id: "hwDiv2",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 32,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.ColorSelect",
                                id: "areaColorSelect",
                                layout: "fit",
                                colorchange: "areaColorSelect_colorchange",
                                style: "margin-top: 5px;",
                                listeners: {
                                    colorchange: areaColorSelect_colorchange
                                }
                            }]
                        }]
                    },
                    {
                        xtype: "panel",
                        id: "columnPanel",
                        title: "Panel",
                        header: false,
                        border: false,
                        height: 220,
                        width: 142,
                        items: [{
                                xtype: "vmd.div",
                                id: "div38",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 182,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 45px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div43",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.ColorSelect",
                                        id: "columnColor",
                                        layout: "fit",
                                        colorchange: "columnColor_colorchange",
                                        listeners: {
                                            colorchange: columnColor_colorchange
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div44",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 181,
                                height: 32,
                                layout: "auto",
                                y: 5,
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div45",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 32,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "borderWidth",
                                        layout: "absolute",
                                        szDecimalChanged: "borderWidth_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: borderWidth_szDecimalChanged
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div46",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 181,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div47",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 32,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "borderRadius",
                                        layout: "absolute",
                                        szDecimalChanged: "borderRadius_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: borderRadius_szDecimalChanged
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div48",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 180,
                                height: 30,
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 7px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div49",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.ColorSelect",
                                        id: "borderColor",
                                        layout: "fit",
                                        colorchange: "borderColor_colorchange",
                                        listeners: {
                                            colorchange: borderColor_colorchange
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "hwDiv4",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 181,
                                height: 32,
                                layout: "auto",
                                y: 5,
                                items: [{
                                    xtype: "vmd.div",
                                    id: "hwDiv5",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 32,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "maxPointWidth",
                                        layout: "absolute",
                                        szDecimalChanged: "maxPointWidth_szDecimalChanged",
                                        width: 150,
                                        height: 37,
                                        listeners: {
                                            szDecimalChanged: maxPointWidth_szDecimalChanged
                                        }
                                    }]
                                }]
                            }
                        ]
                    },
                    {
                        xtype: "panel",
                        id: "piePanel",
                        title: "Panel",
                        header: false,
                        border: false,
                        height: 40,
                        width: 150,
                        bodyStyle: "margin-top: 25px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div59",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 32,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "innerSize",
                                layout: "absolute",
                                szDecimalChanged: "innerSize_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: innerSize_szDecimalChanged
                                }
                            }]
                        }]
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.SeriesClass");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.SeriesClass");
    }
})