Ext.define('vmd.ux.axisSelf.Controller', {
    xtype: 'vmd.ux.axisSelf.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.AxisSelf", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.Number$1.0$Number", "vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.Number$1.0$Number", "vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.LineStyle$1.0$LineStyle", "vmd.ux.Number$1.0$Number", "vmd.ux.ButtonGroup$1.0$ButtonGroup"]),
    version: "1.0",
    xtype: "vmd.ux.AxisSelf",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 1000,
    layout: "border",
    padding: "10 0 0 0 ",
    uxCss: ".in-text{    border: 1px solid #ddd;    margin-top:3px;    margin-right: 20px;}.bnt-text{    margin-top: 5px;    line-height: 8px;    margin-right: 3px;}.comlist-b{    border:1px solid #ddd;}.comlist-b input{    border:0;}",
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

            function axisType_afterrender(sender) {
                var typeData = [{
                    id: 'linear',
                    name: '线性轴'
                }, {
                    id: 'logarithmic',
                    name: '对数轴'
                }, {
                    id: 'datetime',
                    name: '时间轴'
                }, {
                    id: 'category',
                    name: '分类轴'
                }];
                var store = new vmd.data.Store({
                    data: typeData,
                    fields: ['id', 'name']
                })
                axisType.store = store;
                axisType.valueField = 'id';
                axisType.displayField = 'name';
            }

            function dateComlist_afterrender(sender) {
                var DateFamot = [{
                    id: '%Y年%m月%d日',
                    name: 'YYYY年MM月DD日'
                }, {
                    id: '%Y/%m/%d',
                    name: 'YYYY/MM/DD'
                }, {
                    id: '%m/%d',
                    name: 'MM/DD'
                }, {
                    id: '%Y-%m',
                    name: 'YYYY-MM'
                }, {
                    id: '%Y-%m-%d',
                    name: 'YYYY-MM-DD'
                }, {
                    id: '%y年%m月',
                    name: 'YY年MM月'
                }, {
                    id: '%y年%m月%d日%H时%M分',
                    name: 'YY年MM月DD日HH时MM分'
                }, {
                    id: '%Y年',
                    name: 'YYYY年'
                }, {
                    id: '%m月%d日',
                    name: 'MM月DD日'
                }, {
                    id: '%H时%M分',
                    name: 'HH时MM分'
                }];
                var store = new vmd.data.Store({
                    data: DateFamot,
                    fields: ['id', 'name']
                })
                dateComlist.store = store;
                dateComlist.valueField = 'id';
                dateComlist.displayField = 'name';
            }

            function lineWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisLineWidthChange", sender, value)
            }

            function axisHeight_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisHeightChange", sender, value)
            }

            function lineColors_colorchange(sender, selColor) {
                page.fireEvent("axisLineColorsChange", sender, selColor)
            }

            function axisTop_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisTopChange", sender, value)
            }

            function axisOffset_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisOffsetChange", sender, value)
            }

            function axisCeiling_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisCeilingChange", sender, value)
            }

            function axisFloor_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisFloorChange", sender, value)
            }

            function minPadding_szDecimalChanged(sender, value, describe) {
                page.fireEvent("minPaddingChange", sender, value)
            }

            function crosshairColor_colorchange(sender, selColor) {
                page.fireEvent("crosshairColorChange", sender, selColor)
            }

            function crosshairWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("crosshairWidthChange", sender, value)
            }

            function hwLineStyle_lineChagen(sender, line) {
                page.fireEvent("crosshairLineChange", sender, line)
            }

            function axisMax_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisMaxChange", sender, value)
            }

            function axisMin_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisMinChange", sender, value)
            }

            function hwButtonGroup_click(sender, selectedIndex) {
                var direction;
                switch (selectedIndex) {
                    case 1:
                        direction = 'horizontal';
                        break;
                    case 2:
                        direction = 'vertical';
                        break;
                }
                page.fireEvent("axisDirectionChange", sender, direction);
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.AxisSelf',
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
                        id: "div2",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "checkbox",
                            id: "axisShow",
                            fieldLabel: "Checkbox",
                            boxLabel: "显示轴",
                            x: 20,
                            y: 5
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div4",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        items: [{
                            xtype: "label",
                            id: "label1",
                            text: "自身属性",
                            x: 8,
                            y: 10,
                            width: 60,
                            style: "font-size: 13px;    font-weight: bold;"
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
                        layout: "absolute",
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label3",
                            text: "类型",
                            x: 20,
                            y: 12,
                            width: 70
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label2",
                            text: "时间格式",
                            x: 20,
                            y: 13,
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
                            y: 17,
                            width: 80
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
                        items: [{
                            xtype: "label",
                            id: "label7",
                            text: "高度",
                            x: 20,
                            y: 20,
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
                            y: 20,
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
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label6",
                            text: "位置",
                            x: 8,
                            y: 15,
                            width: 60,
                            style: "font-weight: bold;    font-size: 13px;"
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
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label10",
                            text: "顶部位置",
                            x: 20,
                            y: 10,
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label5",
                            text: "偏移值",
                            x: 20,
                            y: 10,
                            width: 80
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
                        style: "margin-top: 5px;",
                        hidden: true,
                        items: [{
                            xtype: "label",
                            id: "label8",
                            text: "上限",
                            x: 20,
                            y: 8,
                            width: 80
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
                        style: "margin-top: 5px;",
                        hidden: true,
                        items: [{
                            xtype: "label",
                            id: "label12",
                            text: "下限",
                            x: 20,
                            y: 8,
                            width: 80
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv9",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel3",
                            text: "最大值",
                            x: 20,
                            y: 8,
                            width: 80
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
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel4",
                            text: "最小值",
                            x: 20,
                            y: 8,
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
                            text: "轴间距",
                            x: 20,
                            y: 8,
                            width: 80
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel",
                            text: "准星线颜色",
                            x: 20,
                            y: 8,
                            width: 80
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
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel2",
                            text: "准星线条样式",
                            x: 20,
                            y: 8,
                            width: 80
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel1",
                            text: "准星线宽度",
                            x: 20,
                            y: 8,
                            width: 80
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div33",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label11",
                            text: "显示",
                            x: 8,
                            y: 5,
                            width: 60,
                            style: "font-weight: bold;    font-size: 13px;"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div35",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "checkbox",
                            id: "isOpposite",
                            fieldLabel: "Checkbox",
                            boxLabel: "对面显示",
                            x: 20,
                            y: 0
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv18",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel5",
                            text: "排列方向",
                            x: 20,
                            y: 8,
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
                        id: "div3",
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
                        id: "div9",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 3px;"
                    },
                    {
                        xtype: "panel",
                        id: "axisPanel",
                        title: "Panel",
                        header: false,
                        border: false,
                        height: 705,
                        width: 145,
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
                                style: "margin-top: 3px;",
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
                                        id: "axisType",
                                        width: 172,
                                        height: 270,
                                        cls: "comlist-b",
                                        style: "margin-top: 3px;",
                                        afterrender: "axisType_afterrender",
                                        editable: false,
                                        listeners: {
                                            vmdafterrender: axisType_afterrender
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
                                style: "margin-top: 3px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div23",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.comlist",
                                        id: "dateComlist",
                                        width: 172,
                                        height: 270,
                                        cls: "comlist-b",
                                        style: "margin-top: 3px;",
                                        afterrender: "dateComlist_afterrender",
                                        editable: false,
                                        listeners: {
                                            vmdafterrender: dateComlist_afterrender
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
                                style: "margin-top: 2px;",
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
                                id: "div22",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                height: 30,
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 2px;",
                                items: [{
                                    xtype: "vmd.ux.Number",
                                    id: "axisHeight",
                                    layout: "absolute",
                                    szDecimalChanged: "axisHeight_szDecimalChanged",
                                    listeners: {
                                        szDecimalChanged: axisHeight_szDecimalChanged
                                    }
                                }]
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
                                style: "margin-top: 5px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div18",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 145,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.ColorSelect",
                                        id: "lineColors",
                                        layout: "fit",
                                        width: 142,
                                        colorchange: "lineColors_colorchange",
                                        listeners: {
                                            colorchange: lineColors_colorchange
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
                                y: 5
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
                                style: "margin-top: 5px;",
                                items: [{
                                    xtype: "vmd.ux.Number",
                                    id: "axisTop",
                                    layout: "absolute",
                                    szDecimalChanged: "axisTop_szDecimalChanged",
                                    listeners: {
                                        szDecimalChanged: axisTop_szDecimalChanged
                                    }
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
                                style: "margin-top: 5px;",
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
                                        id: "axisOffset",
                                        layout: "absolute",
                                        szDecimalChanged: "axisOffset_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: axisOffset_szDecimalChanged
                                        }
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
                                style: "margin-top: 5px;",
                                hidden: true,
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div28",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "axisCeiling",
                                        layout: "absolute",
                                        szDecimalChanged: "axisCeiling_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: axisCeiling_szDecimalChanged
                                        }
                                    }]
                                }]
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
                                style: "margin-top: 5px;",
                                hidden: true,
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
                                        id: "axisFloor",
                                        layout: "absolute",
                                        szDecimalChanged: "axisFloor_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: axisFloor_szDecimalChanged
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "hwDiv11",
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
                                    id: "hwDiv12",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "axisMax",
                                        layout: "absolute",
                                        szDecimalChanged: "axisMax_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: axisMax_szDecimalChanged
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "hwDiv13",
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
                                    id: "hwDiv14",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "axisMin",
                                        layout: "absolute",
                                        szDecimalChanged: "axisMin_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: axisMin_szDecimalChanged
                                        }
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
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 5px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div39",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "minPad",
                                        layout: "absolute",
                                        szDecimalChanged: "minPadding_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: minPadding_szDecimalChanged
                                        }
                                    }]
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
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 5px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "hwDiv5",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 145,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.ColorSelect",
                                        id: "crosshairColor",
                                        layout: "fit",
                                        width: 142,
                                        colorchange: "crosshairColor_colorchange",
                                        listeners: {
                                            colorchange: crosshairColor_colorchange
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "hwDiv7",
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
                                    id: "hwDiv8",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.LineStyle",
                                        id: "hwLineStyle",
                                        layout: "fit",
                                        width: 142,
                                        lineChagen: "hwLineStyle_lineChagen",
                                        listeners: {
                                            lineChagen: hwLineStyle_lineChagen
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "hwDiv2",
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
                                    id: "hwDiv4",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "crosshairWidth",
                                        layout: "absolute",
                                        szDecimalChanged: "crosshairWidth_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: crosshairWidth_szDecimalChanged
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
                                height: 42,
                                layout: "auto",
                                y: 5
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
                                    items: [{
                                        xtype: "checkbox",
                                        id: "isReversed",
                                        fieldLabel: "Checkbox",
                                        boxLabel: "反序显示"
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "hwDiv16",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                height: 30,
                                layout: "absolute",
                                y: 5,
                                style: "margin-top: 5px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "hwDiv17",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    x: 0,
                                    items: [{
                                        xtype: "vmd.ux.ButtonGroup",
                                        id: "hwButtonGroup",
                                        layout: "anchor",
                                        count: "2",
                                        text: "横向,纵向",
                                        selectIndex: "1",
                                        width: 139,
                                        click: "hwButtonGroup_click",
                                        listeners: {
                                            click: hwButtonGroup_click
                                        }
                                    }]
                                }]
                            }
                        ]
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.AxisSelf");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AxisSelf");
    }
})