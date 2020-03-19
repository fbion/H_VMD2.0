Ext.define('vmd.ux.legend.Controller', {
    xtype: 'vmd.ux.legend.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.Legend", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.ButtonGroup$1.0$ButtonGroup", "vmd.ux.Number$1.0$Number"]),
    version: "1.0",
    xtype: "vmd.ux.Legend",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 700,
    layout: "border",
    padding: "10 0 0 0 ",
    uxCss: ".in-text{    border: 1px solid #ddd;    margin-top:3px;    margin-right: 20px;}.bnt-text{    margin-top: 5px;    line-height: 8px;    margin-right: 3px;}",
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
        // 排列类型
        function hwButtonGroup_click(sender, selectedIndex) {
            var layout;
            switch (selectedIndex) {
                case 1:
                    layout = 'horizontal';
                    break;
                case 2:
                    layout = 'vertical';
                    break;
            }
            page.fireEvent("legendLoyoutChange", sender, layout);
        };
        // 水平对齐方式
        function hwButtonGroup1_click(sender, selectedIndex) {
            var align;
            switch (selectedIndex) {
                case 1:
                    align = 'left';
                    break;
                case 2:
                    align = 'center';
                    break;
                case 3:
                    align = 'right';
                    break;
            }
            page.fireEvent("legendAlineChange", sender, align);
        };
        // 垂直对齐方式
        function hwButtonGroup3_click(sender, selectedIndex) {
            var verticalAlign;
            switch (selectedIndex) {
                case 1:
                    verticalAlign = 'top';
                    break;
                case 2:
                    verticalAlign = 'middle';
                    break;
                case 3:
                    verticalAlign = 'bottom';
                    break;
            }
            page.fireEvent("legendVerticalAlignChange", sender, verticalAlign);
        }
        // 图例水平偏移
        function offsetX_szDecimalChanged(sender, value, describe) {
            page.fireEvent("legendoffsetXChange", sender, value, describe);
        }

        function offsetY_szDecimalChanged(sender, value, describe) {
            page.fireEvent("legendoffsetYChange", sender, value, describe);
        }

        function legendWidth_szDecimalChanged(sender, value, describe) {
            page.fireEvent("legendWidthChange", sender, value, describe);
        }

        function legendItemWidth_szDecimalChanged(sender, value, describe) {
            page.fireEvent("legendItemWidthChange", sender, value, describe);
        }

        function legPadding_szDecimalChanged(sender, value, describe) {
            page.fireEvent("legPaddingChange", sender, value, describe);
        }

        function legMargin_szDecimalChanged(sender, value, describe) {
            page.fireEvent("legMarginChange", sender, value, describe);
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
                        id: "hwDiv",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "checkbox",
                            id: "lebendIsShow",
                            fieldLabel: "Checkbox",
                            boxLabel: "显示图例",
                            x: 20,
                            y: 5
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div14",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 2px;",
                        items: [{
                            xtype: "label",
                            id: "label11",
                            text: "排列类型",
                            x: 20,
                            y: 10,
                            width: 80
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
                            text: "位置",
                            x: 8,
                            y: 15,
                            width: 80,
                            style: "font-size: 13px;    font-weight: bold;"
                        }]
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
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "checkbox",
                            id: "isFloat",
                            fieldLabel: "Checkbox",
                            boxLabel: "浮动",
                            x: 20,
                            y: 5
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div24",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label7",
                            text: "水平对齐",
                            x: 20,
                            y: 5,
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
                            text: "垂直对齐",
                            x: 20,
                            y: 5,
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label6",
                            text: "水平偏移",
                            x: 20,
                            y: 5,
                            width: 60
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div32",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "label",
                            id: "label10",
                            text: "垂直偏移",
                            x: 20,
                            y: 7,
                            width: 80
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "checkbox",
                            id: "isDrag",
                            fieldLabel: "Checkbox",
                            boxLabel: "允许拖动",
                            x: 20,
                            y: 10
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label5",
                            text: "大小",
                            x: 8,
                            y: 10,
                            width: 80,
                            style: "font-size: 13px;    font-weight: bold;"
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
                        layout: "absolute",
                        style: "margin-top: 8px;",
                        items: [{
                            xtype: "label",
                            id: "label8",
                            text: "图例宽度",
                            x: 20,
                            y: 6,
                            width: 80
                        }]
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label9",
                            text: "图例项宽度",
                            x: 20,
                            y: 6,
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
                        style: "margin-top: 7px;",
                        items: [{
                            xtype: "label",
                            id: "label1",
                            text: "内边距",
                            x: 20,
                            y: 5,
                            width: 80
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
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label2",
                            text: "外边距",
                            x: 20,
                            y: 3,
                            width: 80
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
                        id: "hwDiv1",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 5px;"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div33",
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
                            id: "div34",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 140,
                            height: 30,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.ux.ButtonGroup",
                                id: "hwButtonGroup",
                                layout: "anchor",
                                count: "2",
                                text: "水平排列,垂直排列",
                                click: "hwButtonGroup_click",
                                listeners: {
                                    click: hwButtonGroup_click
                                }
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div12",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 1px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div23",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 32,
                            layout: "fit",
                            style: "float: right;    margin-right: 20px;"
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
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 5px;"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div17",
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
                            id: "div18",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 138,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.ButtonGroup",
                                id: "hwButtonGroup1",
                                layout: "anchor",
                                count: "3",
                                text: "居左,居中,居右",
                                width: 140,
                                height: 28,
                                click: "hwButtonGroup1_click",
                                listeners: {
                                    click: hwButtonGroup1_click
                                }
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div5",
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
                            id: "div2",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 138,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.ButtonGroup",
                                id: "hwButtonGroup3",
                                layout: "anchor",
                                count: "3",
                                text: "居上,居中,居下",
                                width: 140,
                                height: 28,
                                click: "hwButtonGroup3_click",
                                listeners: {
                                    click: hwButtonGroup3_click
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
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "offsetX",
                                layout: "absolute",
                                height: 32,
                                szDecimalChanged: "offsetX_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: offsetX_szDecimalChanged
                                }
                            }]
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
                        layout: "auto",
                        y: 5,
                        style: "margin-top:3px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div20",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "offsetY",
                                layout: "absolute",
                                szDecimalChanged: "offsetY_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: offsetY_szDecimalChanged
                                }
                            }]
                        }]
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div37",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            y: 5,
                            layout: "absolute",
                            items: [{
                                xtype: "checkbox",
                                id: "isReversed",
                                fieldLabel: "Checkbox",
                                boxLabel: "反向排序",
                                y: 3
                            }]
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
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 5px;"
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
                        items: [{
                            xtype: "vmd.div",
                            id: "div30",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "legendWidth",
                                layout: "absolute",
                                height: 32,
                                szDecimalChanged: "legendWidth_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: legendWidth_szDecimalChanged
                                }
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div3",
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
                            id: "div4",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "legendItemWidth",
                                layout: "absolute",
                                height: 32,
                                szDecimalChanged: "legendItemWidth_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: legendItemWidth_szDecimalChanged
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div9",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "legPadding",
                                layout: "absolute",
                                height: 32,
                                szDecimalChanged: "legPadding_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: legPadding_szDecimalChanged
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div13",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "legMargin",
                                layout: "absolute",
                                height: 32,
                                szDecimalChanged: "legMargin_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: legMargin_szDecimalChanged
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.Legend");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Legend");
    }
})