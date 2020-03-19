Ext.define('vmd.ux.axisTick.Controller', {
    xtype: 'vmd.ux.axisTick.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.AxisTick", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.Number$1.0$Number", "vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.Number$1.0$Number", "vmd.ux.LineStyle$1.0$LineStyle", "vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.Number$1.0$Number", "vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.Number$1.0$Number", "vmd.ux.LineStyle$1.0$LineStyle", "vmd.ux.ColorSelect$1.0$ColorSelect"]),
    version: "1.0",
    xtype: "vmd.ux.AxisTick",
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

            function tickPosition_afterrender(sender) {
                var typeData = [{
                    id: 'inside',
                    name: '内部'
                }, {
                    id: 'outside',
                    name: '外部'
                }];
                var store = new vmd.data.Store({
                    data: typeData,
                    fields: ['id', 'name']
                })
                tickPosition.store = store;
                tickPosition.valueField = 'id';
                tickPosition.displayField = 'name';
            }

            function minorTickPos_afterrender(sender) {
                var typeData = [{
                    id: 'inside',
                    name: '内部'
                }, {
                    id: 'outside',
                    name: '外部'
                }];
                var store = new vmd.data.Store({
                    data: typeData,
                    fields: ['id', 'name']
                })
                minorTickPos.store = store;
                minorTickPos.valueField = 'id';
                minorTickPos.displayField = 'name';
            }

            function tickLenfht_szDecimalChanged(sender, value, describe) {
                page.fireEvent("tickLenghtChange", sender, value)
            }

            function tickColors_colorchange(sender, selColor) {
                page.fireEvent("tickColorsChange", sender, selColor)
            }

            function gridLineWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("gridLineWidthChange", sender, value)
            }

            function gridLineDashStyle_lineChagen(sender, line) {
                page.fireEvent("gridLineDashStyleChange", sender, line)
            }

            function gridLineColor_colorchange(sender, selColor) {
                page.fireEvent("gridLineColorChange", sender, selColor)
            }

            function minorTickWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("minorTickWidthChange", sender, value)
            }

            function minorTickLenght_szDecimalChanged(sender, value, describe) {
                page.fireEvent("minorTickLenghtChange", sender, value)
            }

            function minorTickColor_colorchange(sender, selColor) {
                page.fireEvent("minorTickColorChange", sender, selColor)
            }

            function minorGridLineWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("minorGridLineWidthChange", sender, value)
            }

            function minorGridLineDashStyle_lineChagen(sender, line) {
                page.fireEvent("minorGridLineDashStyleChange", sender, line)
            }

            function minorGridLineColor_colorchange(sender, selColor) {
                page.fireEvent("minorGridLineColorChange", sender, selColor)
            }

            function tickWidth_szDecimalChanged(sender, value, describe) {
                page.fireEvent("tickWidthChange", sender, value)
            }

            function tickInterval_szDecimalChanged(sender, value, describe) {
                page.fireEvent("tickIntervalChange", sender, value)
            }

            function tickAmount_szDecimalChanged(sender, value, describe) {
                page.fireEvent("tickAmountChange", sender, value)
            }

            function tickPixelInterval_szDecimalChanged(sender, value, describe) {
                page.fireEvent("tickPixelIntervalChange", sender, value)
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.AxisTick',
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
                height: 727,
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
                            xtype: "label",
                            id: "label11",
                            text: "主刻度线",
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
                            text: "位置",
                            x: 20,
                            y: 12,
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
                            y: 15,
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label7",
                            text: "长度",
                            x: 20,
                            y: 15,
                            width: 80
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
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label18",
                            text: "数值间隔",
                            x: 20,
                            y: 8,
                            width: 80
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
                        style: "margin-top: 4px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel1",
                            text: "像素间隔",
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
                        style: "margin-top: 4px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel",
                            text: "刻度总数",
                            x: 20,
                            y: 8,
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
                        style: "margin-top: 6px;",
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
                            text: "主网格线",
                            x: 8,
                            y: 10,
                            width: 60,
                            style: "font-weight: bold;    font-size: 13px;"
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
                            text: "宽度",
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
                        items: [{
                            xtype: "label",
                            id: "label8",
                            text: "样式",
                            x: 20,
                            y: 7,
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
                            text: "颜色",
                            x: 20,
                            y: 5,
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
                            xtype: "label",
                            id: "label1",
                            text: "次刻度线",
                            x: 8,
                            y: 10,
                            width: 60,
                            style: "font-size: 13px;    font-weight: bold;"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div9",
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
                            text: "位置",
                            x: 20,
                            y: 12,
                            width: 70
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
                        layout: "absolute",
                        style: "margin-top: 2px;",
                        items: [{
                            xtype: "label",
                            id: "label10",
                            text: "宽度",
                            x: 20,
                            y: 15,
                            width: 80
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
                        layout: "absolute",
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label12",
                            text: "长度",
                            x: 20,
                            y: 15,
                            width: 80
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
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label13",
                            text: "颜色",
                            x: 20,
                            y: 8,
                            width: 80
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div41",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label14",
                            text: "次网格线",
                            x: 8,
                            y: 10,
                            width: 60,
                            style: "font-weight: bold;    font-size: 13px;"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div42",
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
                            text: "宽度",
                            x: 20,
                            y: 10,
                            width: 80
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div43",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label16",
                            text: "样式",
                            x: 20,
                            y: 7,
                            width: 80
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div44",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "absolute",
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label17",
                            text: "颜色",
                            x: 20,
                            y: 5,
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
                height: 759,
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
                                id: "tickPosition",
                                width: 172,
                                height: 270,
                                cls: "comlist-b",
                                style: "margin-top: 3px;",
                                afterrender: "tickPosition_afterrender",
                                editable: false,
                                listeners: {
                                    vmdafterrender: tickPosition_afterrender
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
                                id: "tickWidth",
                                layout: "absolute",
                                szDecimalChanged: "tickWidth_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: tickWidth_szDecimalChanged
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
                                id: "tickLenfht",
                                layout: "absolute",
                                szDecimalChanged: "tickLenfht_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: tickLenfht_szDecimalChanged
                                }
                            }]
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
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div53",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "tickInterval",
                                layout: "absolute",
                                szDecimalChanged: "tickInterval_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: tickInterval_szDecimalChanged
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
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "tickPixelInterval",
                                layout: "absolute",
                                szDecimalChanged: "tickPixelInterval_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: tickPixelInterval_szDecimalChanged
                                }
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "hwDiv2",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "tickAmount",
                                layout: "absolute",
                                szDecimalChanged: "tickAmount_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: tickAmount_szDecimalChanged
                                }
                            }]
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
                        style: "margin-top: 8px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div18",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.ColorSelect",
                                id: "tickColors",
                                layout: "fit",
                                width: 142,
                                colorchange: "tickColors_colorchange",
                                listeners: {
                                    colorchange: tickColors_colorchange
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
                        width: 145,
                        height: 30,
                        layout: "auto",
                        y: 5
                    },
                    {
                        xtype: "vmd.div",
                        id: "div19",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 156,
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 10px;",
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
                                id: "gridLineWidth",
                                layout: "absolute",
                                szDecimalChanged: "gridLineWidth_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: gridLineWidth_szDecimalChanged
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
                        width: 157,
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 7px;",
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
                                xtype: "vmd.ux.LineStyle",
                                id: "gridLineDashStyle",
                                layout: "fit",
                                width: 142,
                                lineChagen: "gridLineDashStyle_lineChagen",
                                listeners: {
                                    lineChagen: gridLineDashStyle_lineChagen
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
                        width: 159,
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
                            items: [{
                                xtype: "vmd.ux.ColorSelect",
                                id: "gridLineColor",
                                layout: "fit",
                                width: 141,
                                colorchange: "gridLineColor_colorchange",
                                listeners: {
                                    colorchange: gridLineColor_colorchange
                                }
                            }]
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
                        layout: "auto",
                        y: 5
                    },
                    {
                        xtype: "vmd.div",
                        id: "div33",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 154,
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 10px;",
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
                                xtype: "vmd.comlist",
                                id: "minorTickPos",
                                width: 172,
                                height: 270,
                                cls: "comlist-b",
                                style: "margin-top: 3px;",
                                afterrender: "minorTickPos_afterrender",
                                editable: false,
                                listeners: {
                                    vmdafterrender: minorTickPos_afterrender
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
                        width: 160,
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 2px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div36",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "minorTickWidth",
                                layout: "absolute",
                                szDecimalChanged: "minorTickWidth_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: minorTickWidth_szDecimalChanged
                                }
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div37",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 155,
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div38",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "minorTickLenght",
                                layout: "absolute",
                                szDecimalChanged: "minorTickLenght_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: minorTickLenght_szDecimalChanged
                                }
                            }]
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
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 8px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div40",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.ColorSelect",
                                id: "minorTickColor",
                                layout: "fit",
                                width: 143,
                                colorchange: "minorTickColor_colorchange",
                                listeners: {
                                    colorchange: minorTickColor_colorchange
                                }
                            }]
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "div45",
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
                        id: "div46",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        height: 30,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div47",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.Number",
                                id: "minorGridLineWidth",
                                layout: "absolute",
                                szDecimalChanged: "minorGridLineWidth_szDecimalChanged",
                                listeners: {
                                    szDecimalChanged: minorGridLineWidth_szDecimalChanged
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
                            items: [{
                                xtype: "vmd.ux.LineStyle",
                                id: "minorGridLineDashStyle",
                                layout: "fit",
                                width: 142,
                                lineChagen: "minorGridLineDashStyle_lineChagen",
                                listeners: {
                                    lineChagen: minorGridLineDashStyle_lineChagen
                                }
                            }]
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
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "vmd.div",
                            id: "div51",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            items: [{
                                xtype: "vmd.ux.ColorSelect",
                                id: "minorGridLineColor",
                                layout: "fit",
                                width: 142,
                                colorchange: "minorGridLineColor_colorchange",
                                listeners: {
                                    colorchange: minorGridLineColor_colorchange
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.AxisTick");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AxisTick");
    }
})