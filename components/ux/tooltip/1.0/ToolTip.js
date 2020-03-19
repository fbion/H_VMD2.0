Ext.define('vmd.ux.axisSelf.Controller', {
    xtype: 'vmd.ux.axisSelf.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ToolTip", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.Number$1.0$Number"]),
    version: "1.0",
    xtype: "vmd.ux.ToolTip",
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

        function xDateFormat_afterrender(sender) {
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
            xDateFormat.store = store;
            xDateFormat.valueField = 'id';
            xDateFormat.displayField = 'name';
        }

        function valueDecimals_szDecimalChanged(sender, value, describe) {
            page.fireEvent("valueDecimalsChange", sender, value)
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
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "checkbox",
                            id: "tooltipEable",
                            fieldLabel: "Checkbox",
                            boxLabel: "数据提示框",
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
                            y: 5,
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label4",
                            text: "保留小数位数",
                            x: 20,
                            y: 8,
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label7",
                            text: "前缀",
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
                        style: "margin-top: 10px;",
                        items: [{
                            xtype: "label",
                            id: "label",
                            text: "后缀",
                            x: 20,
                            y: 5,
                            width: 80
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
                        style: "margin-top: 25px;",
                        items: [{
                            xtype: "checkbox",
                            id: "isShared",
                            fieldLabel: "Checkbox",
                            boxLabel: "共享",
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
                        height: 579,
                        width: 145,
                        items: [{
                                xtype: "vmd.div",
                                id: "div12",
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
                                        id: "xDateFormat",
                                        width: 172,
                                        height: 270,
                                        cls: "comlist-b",
                                        style: "margin-top: 3px;",
                                        afterrender: "xDateFormat_afterrender",
                                        editable: false,
                                        listeners: {
                                            vmdafterrender: xDateFormat_afterrender
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
                                        id: "valueDecimals",
                                        layout: "absolute",
                                        szDecimalChanged: "valueDecimals_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: valueDecimals_szDecimalChanged
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
                                    xtype: "textfield",
                                    id: "valuePrefix",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    width: 142,
                                    cls: "in-text"
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
                                    xtype: "textfield",
                                    id: "valueSuffix",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    width: 142,
                                    cls: "in-text"
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.ToolTip");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ToolTip");
    }
})