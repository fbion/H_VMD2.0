Ext.define('vmd.ux.chartTb.Controller', {
    xtype: 'vmd.ux.chartTb.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ChartTb", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.Number$1.0$Number"]),
    version: "1.0",
    xtype: "vmd.ux.ChartTb",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 700,
    layout: "border",
    padding: "10 0 0 0 ",
    uxCss: ".in-text{    border: 1px solid #ddd;    margin-top:3px;    margin-right: 20px;}.bnt-text{    margin-top: 5px;    line-height: 8px;    margin-right: 3px;     }.comlist-b{    border:1px solid #ddd;}.comlist-b input{    border:0;}",
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

            function zoomType_afterrender(sender) {
                var zoom = [{
                    id: 'none',
                    name: '无'
                }, {
                    id: 'x',
                    name: 'x'
                }, {
                    id: 'y',
                    name: 'y'
                }, {
                    id: 'xy',
                    name: 'xy'
                }];
                var store = new vmd.data.Store({
                    data: zoom,
                    fields: ['id', 'name']
                })
                zoomType.store = store;
                zoomType.valueField = 'id';
                zoomType.displayField = 'name';
                zoomType.setValue('none');
            }

            function chartWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("chartWidthChange", sender, value, describe);
            }

            function chartHeight_szDecimalChanged(sender, value, describe) {
                page.fireEvent("chartHeightChange", sender, value, describe);
            }

            function topMargin_szDecimalChanged(sender, value, describe) {
                page.fireEvent("chartTopMarginChange", sender, value, describe);
            }

            function bottomMargin_szDecimalChanged(sender, value, describe) {
                page.fireEvent("chartBottomMarginChange", sender, value, describe);
            }

            function leftMargin_szDecimalChanged(sender, value, describe) {
                page.fireEvent("chartLeftMarginChange", sender, value, describe);
            }

            function rightMargin_szDecimalChanged(sender, value, describe) {
                page.fireEvent("chartRightMarginChange", sender, value, describe);
            }

            function minHeight_szDecimalChanged(sender, value, describe) {
                page.fireEvent("chartminHeightChange", sender, value, describe);
            }

            function spacing_szDecimalChanged(sender, value, describe) {
                page.fireEvent("chartSpacingChange", sender, value, describe);
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ChartTb',
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
                        id: "div4",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        hidden: true,
                        items: [{
                            xtype: "label",
                            id: "label1",
                            text: "曲线类型",
                            x: 20,
                            y: 10,
                            width: 60
                        }]
                    },
                    {
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
                            text: "缩放类型",
                            x: 20,
                            y: 5,
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
                            text: "大小",
                            x: 8,
                            y: 0,
                            width: 60,
                            style: "font-size:13px;    font-weight: bold;"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv4",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "label",
                            id: "hwLabel1",
                            text: "最小高度",
                            x: 20,
                            y: 3,
                            width: 70
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
                        hidden: false,
                        items: [{
                            xtype: "label",
                            id: "hwLabel",
                            text: "组间距",
                            x: 20,
                            y: 0,
                            width: 80
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
                                xtype: "checkbox",
                                id: "isWidth",
                                fieldLabel: "Checkbox",
                                x: 20,
                                y: -3,
                                width: 20,
                                checked: false,
                                hidden: false
                            },
                            {
                                xtype: "label",
                                id: "label2",
                                text: "宽度",
                                x: 40,
                                y: 0,
                                width: 80
                            }
                        ]
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
                                xtype: "checkbox",
                                id: "isHeight",
                                fieldLabel: "Checkbox",
                                x: 20,
                                y: 0,
                                width: 20,
                                checked: false,
                                hidden: false
                            },
                            {
                                xtype: "label",
                                id: "label",
                                text: "高度",
                                x: 40,
                                y: 3,
                                width: 70
                            }
                        ]
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
                        style: "margin-top: 5px;",
                        items: [{
                                xtype: "label",
                                id: "label4",
                                text: "上边距",
                                x: 40,
                                y: 0,
                                width: 60
                            },
                            {
                                xtype: "checkbox",
                                id: "isTop",
                                fieldLabel: "Checkbox",
                                x: 20,
                                y: -3,
                                width: 20,
                                checked: false
                            }
                        ]
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
                        style: "margin-top: 2px;",
                        items: [{
                                xtype: "label",
                                id: "label5",
                                text: "下边距",
                                x: 40,
                                y: 2,
                                width: 50
                            },
                            {
                                xtype: "checkbox",
                                id: "isBottom",
                                fieldLabel: "Checkbox",
                                x: 20,
                                y: -1,
                                width: 20,
                                checked: false
                            }
                        ]
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
                        style: "margin-top: 5px;",
                        items: [{
                                xtype: "label",
                                id: "label6",
                                text: "左边距",
                                x: 40,
                                y: 0,
                                width: 50
                            },
                            {
                                xtype: "checkbox",
                                id: "isLeft",
                                fieldLabel: "Checkbox",
                                x: 20,
                                y: -3,
                                width: 20,
                                checked: false
                            }
                        ]
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
                        style: "margin-top: 2px",
                        items: [{
                                xtype: "label",
                                id: "label8",
                                text: "右边距",
                                x: 40,
                                y: 0,
                                width: 60
                            },
                            {
                                xtype: "checkbox",
                                id: "isRight",
                                fieldLabel: "Checkbox",
                                x: 20,
                                y: -3,
                                width: 20,
                                checked: false
                            }
                        ]
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
                        style: "margin-top: 2px",
                        items: [{
                            xtype: "label",
                            id: "label9",
                            text: "操作",
                            x: 8,
                            y: 10,
                            width: 60,
                            style: "font-size: 13px;    font-weight: bold;"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div31",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 8px",
                        items: [{
                            xtype: "checkbox",
                            id: "imgexport",
                            fieldLabel: "Checkbox",
                            boxLabel: "导出图片",
                            x: 20,
                            y: 0
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv10",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 8px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "hwDiv11",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            layout: "absolute",
                            hidden: false,
                            items: [{
                                xtype: "checkbox",
                                id: "dataExtract",
                                fieldLabel: "Checkbox",
                                boxLabel: "数据抽稀",
                                hidden: false,
                                x: 20
                            }]
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
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 8px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "hwDiv2",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            layout: "absolute",
                            hidden: false,
                            items: [{
                                xtype: "checkbox",
                                id: "zoomData",
                                fieldLabel: "Checkbox",
                                boxLabel: "框选数据",
                                hidden: false,
                                x: 20
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div38",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 8px",
                        items: [{
                            xtype: "checkbox",
                            id: "navigator",
                            fieldLabel: "Checkbox",
                            boxLabel: "导航器",
                            x: 20,
                            y: 0
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
                        style: "margin-top: 2px",
                        items: [{
                            xtype: "label",
                            id: "label10",
                            text: "坐标",
                            x: 8,
                            y: 10,
                            width: 60,
                            style: "font-size: 13px;    font-weight: bold;"
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
                        style: "margin-top: 8px",
                        items: [{
                            xtype: "checkbox",
                            id: "isInverted",
                            fieldLabel: "Checkbox",
                            boxLabel: "交换轴",
                            x: 20,
                            y: 0
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
                height: 50,
                region: "east",
                items: [{
                        xtype: "vmd.div",
                        id: "div5",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 5px;",
                        hidden: true,
                        items: [{
                            xtype: "vmd.div",
                            id: "div33",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            layout: "fit",
                            style: "float: right;    margin-right: 30px;",
                            items: [{
                                xtype: "vmd.comlist",
                                id: "comlist7",
                                width: 142,
                                height: 270,
                                cls: "comlist-b"
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div7",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 8px;",
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
                                id: "zoomType",
                                width: 142,
                                height: 270,
                                cls: "comlist-b",
                                editable: false,
                                afterrender: "zoomType_afterrender",
                                listeners: {
                                    vmdafterrender: zoomType_afterrender
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
                        xtype: "vmd.div",
                        id: "hwDiv8",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "hwDiv9",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 31,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "minHeight",
                                layout: "absolute",
                                disabled: false,
                                szDecimalChanged: "minHeight_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: minHeight_szDecimalChanged
                                }
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv6",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        hidden: false,
                        items: [{
                            xtype: "vmd.div",
                            id: "hwDiv7",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 31,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "spacing",
                                layout: "absolute",
                                disabled: false,
                                szDecimalChanged: "spacing_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: spacing_szDecimalChanged
                                }
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div2",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        disabled: false,
                        items: [{
                            xtype: "vmd.div",
                            id: "div3",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 31,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "chartWidth",
                                layout: "absolute",
                                disabled: true,
                                szDecimalChanged: "chartWidth_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: chartWidth_szDecimalChanged
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
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 3px;",
                        disabled: false,
                        items: [{
                            xtype: "vmd.div",
                            id: "div9",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 31,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "chartHeight",
                                layout: "absolute",
                                disabled: true,
                                szDecimalChanged: "chartHeight_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: chartHeight_szDecimalChanged
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
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div12",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 31,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "topMargin",
                                layout: "absolute",
                                disabled: true,
                                szDecimalChanged: "topMargin_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: topMargin_szDecimalChanged
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
                            height: 31,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "bottomMargin",
                                layout: "absolute",
                                disabled: true,
                                szDecimalChanged: "bottomMargin_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: bottomMargin_szDecimalChanged
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
                            height: 31,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "leftMargin",
                                layout: "absolute",
                                disabled: true,
                                szDecimalChanged: "leftMargin_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: leftMargin_szDecimalChanged
                                }
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div34",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div35",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 31,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "rightMargin",
                                layout: "absolute",
                                disabled: true,
                                szDecimalChanged: "rightMargin_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: rightMargin_szDecimalChanged
                                }
                            }]
                        }]
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
                        y: 5,
                        style: "margin-top: 7px;"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div29",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 12px;",
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
                                xtype: "checkbox",
                                id: "dataviews",
                                fieldLabel: "Checkbox",
                                boxLabel: "数据查看"
                            }]
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
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 8px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div42",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            layout: "fit",
                            hidden: false,
                            items: [{
                                xtype: "checkbox",
                                id: "setProperty",
                                fieldLabel: "Checkbox",
                                boxLabel: "曲线编辑",
                                hidden: false
                            }]
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
                        style: "margin-top: 8px",
                        hidden: false,
                        items: [{
                            xtype: "checkbox",
                            id: "fitting",
                            fieldLabel: "Checkbox",
                            boxLabel: "拟合预测",
                            x: 0,
                            y: 0,
                            width: 90
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv5",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 62,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 10px;"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div36",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div37",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            layout: "fit",
                            items: [{
                                xtype: "checkbox",
                                id: "isPolar",
                                fieldLabel: "Checkbox",
                                boxLabel: "极地图"
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.ChartTb");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ChartTb");
    }
})