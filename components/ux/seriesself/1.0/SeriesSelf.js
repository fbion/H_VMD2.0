Ext.define('vmd.ux.seriesSelf.Controller', {
    xtype: 'vmd.ux.seriesSelf.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.SeriesSelf", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.Number$1.0$Number"]),
    version: "1.0",
    xtype: "vmd.ux.SeriesSelf",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 700,
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
        var page = this;

        function stacking_afterrender(sender) {
            var typeData = [{
                id: 'none',
                name: '无堆叠'
            }, {
                id: 'normal',
                name: '普通堆叠'
            }, {
                id: 'percent',
                name: '百分比堆叠'
            }];
            var store = new vmd.data.Store({
                data: typeData,
                fields: ['id', 'name']
            })
            stacking.store = store;
            stacking.valueField = 'id';
            stacking.displayField = 'name';
        }

        function gatherInterval_szDecimalChanged(sender, value, describe) {
            page.fireEvent("gatherInternalChange", sender, value)
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
                        items: [{
                            xtype: "label",
                            id: "label1",
                            text: "名称",
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
                        hidden: true,
                        items: [{
                            xtype: "label",
                            id: "label3",
                            text: "颜色",
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
                            text: "数据",
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
                            text: "数据源",
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
                            text: "X轴字段",
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
                            text: "Y轴字段",
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
                            text: "所属X轴",
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
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label6",
                            text: "所属Y轴",
                            x: 20,
                            y: 0,
                            width: 60
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
                            xtype: "label",
                            id: "label8",
                            text: "堆叠聚合",
                            x: 8,
                            y: 0,
                            width: 60,
                            style: "font-size: 13px;    font-weight: bold;"
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
                        items: [{
                            xtype: "label",
                            id: "label9",
                            text: "堆叠",
                            x: 20,
                            y: 0,
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
                        items: [{
                            xtype: "label",
                            id: "label10",
                            text: "堆叠值",
                            x: 20,
                            y: 5,
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
                        items: [{
                            xtype: "label",
                            id: "label11",
                            text: "聚合值",
                            x: 20,
                            y: 5,
                            width: 60
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
                        layout: "absolute",
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label13",
                            text: "显示",
                            x: 8,
                            y: 10,
                            width: 60,
                            style: "font-size: 13px;    font-weight: bold;"
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
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 10px;    padding-left: 20px;",
                        items: [{
                            xtype: "checkbox",
                            id: "seriesShow",
                            fieldLabel: "Checkbox",
                            boxLabel: "隐藏",
                            x: 10
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "textfield",
                            id: "serName",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 0,
                            y: 5,
                            width: 142,
                            cls: "in-text"
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
                        style: "margin-top: 5px;",
                        hidden: true,
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
                                xtype: "vmd.ux.ColorSelect",
                                id: "lineColor",
                                layout: "fit"
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
                        id: "div2",
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
                            id: "div3",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.comlist",
                                id: "storeData",
                                width: 172,
                                height: 270,
                                cls: "comlist-b",
                                editable: false
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
                        items: [{
                            xtype: "vmd.div",
                            id: "div9",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 142,
                            height: 30,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.comlist",
                                id: "xData",
                                width: 172,
                                height: 270,
                                cls: "comlist-b",
                                editable: false
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
                            height: 30,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.comlist",
                                id: "dataY",
                                width: 172,
                                height: 270,
                                cls: "comlist-b",
                                editable: false
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
                            height: 30,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.comlist",
                                id: "linkX",
                                width: 172,
                                height: 270,
                                cls: "comlist-b",
                                editable: false
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
                            height: 30,
                            layout: "fit",
                            items: [{
                                xtype: "vmd.comlist",
                                id: "linkY",
                                width: 172,
                                height: 270,
                                cls: "comlist-b",
                                editable: false
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
                        height: 24,
                        layout: "auto",
                        y: 5,
                        style: "margin-top: 7px;"
                    },
                    {
                        xtype: "panel",
                        id: "stackPanel",
                        title: "Panel",
                        header: false,
                        border: false,
                        height: 66,
                        width: 142,
                        items: [{
                                xtype: "vmd.div",
                                id: "div29",
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
                                        id: "stacking",
                                        width: 172,
                                        height: 270,
                                        cls: "comlist-b",
                                        editable: false,
                                        afterrender: "stacking_afterrender",
                                        listeners: {
                                            vmdafterrender: stacking_afterrender
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
                                items: [{
                                    xtype: "textfield",
                                    id: "stack",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    cls: "in-text",
                                    width: 142
                                }]
                            }
                        ]
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
                        y: 5,
                        style: "margin-top: 2px;",
                        items: [{
                            xtype: "vmd.ux.Number",
                            id: "gatherInterval",
                            layout: "absolute",
                            szDecimalChanged: "gatherInterval_szDecimalChanged",
                            listeners: {
                                szDecimalChanged: gatherInterval_szDecimalChanged
                            }
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.SeriesSelf");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.SeriesSelf");
    }
})