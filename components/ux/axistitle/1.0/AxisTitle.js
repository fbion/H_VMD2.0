Ext.define('vmd.ux.axisTitle.Controller', {
    xtype: 'vmd.ux.axisTitle.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.AxisTitle", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.ButtonGroup$1.0$ButtonGroup", "vmd.ux.Number$1.0$Number", "vmd.ux.FontFamity$1.0$FontFamity", "vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.FontSize$1.0$FontSize", "vmd.ux.FontStyle$1.0$FontStyle"]),
    version: "1.0",
    xtype: "vmd.ux.AxisTitle",
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
        try {
            var page = this;

            function Titlealign_afterrender(sender) {
                var sizeData = [{
                    id: 'low',
                    name: '与最小值对齐'
                }, {
                    id: 'middle',
                    name: '居中对齐'
                }, {
                    id: 'high',
                    name: '与最大值对齐'
                }];
                var store = new vmd.data.Store({
                    data: sizeData,
                    fields: ['id', 'name']
                })
                Titlealign.store = store;
                Titlealign.valueField = 'id';
                Titlealign.displayField = 'name';
            }

            function ButtonGroup_click(sender, selectedIndex) {
                var row = 'horizontal'
                switch (selectedIndex) {
                    case 1:
                        row = 'horizontal';
                        break;
                    case 2:
                        row = "vertical";
                        break;
                }
                page.fireEvent("axisTitleRowChange", sender, row);
            }

            function titleOffset_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisTitleOffsetChange", sender, value);
            }

            function titleX_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisTitleXChange", sender, value);
            }

            function titleY_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisTitleYChange", sender, value);
            }

            function axisFontFamity_fontChange(sender, record) {
                page.fireEvent("axisFontFamityChange", sender, record);
            }

            function axisColorSelect_colorchange(sender, selColor) {
                page.fireEvent("axisFontColorChange", sender, selColor);
            }

            function axisFontSize_sizeChange(sender, record) {
                page.fireEvent("axisFontSizeChange", sender, record);
            }

            function axisFontStyle_styleChange(sender, record) {
                page.fireEvent("axisFontStyleChange", sender, record);
            }

            function rotation_szDecimalChanged(sender, value, describe) {
                page.fireEvent("axisTitleRotationChange", sender, value);
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.AxisTitle',
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
                            id: "titleShow",
                            fieldLabel: "Checkbox",
                            boxLabel: "显示标题",
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label1",
                            text: "标题文本",
                            x: 20,
                            y: 10,
                            width: 60
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
                            text: "显示方式",
                            x: 20,
                            y: 10,
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
                            text: "对齐方式",
                            x: 20,
                            y: 10,
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
                            text: "与轴线间距离",
                            x: 20,
                            y: 12,
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
                        style: "margin-top: 5px;",
                        hidden: false,
                        items: [{
                            xtype: "label",
                            id: "label",
                            text: "水平偏移",
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
                            text: "竖直偏移",
                            x: 20,
                            y: 10,
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel",
                            text: "旋转角度",
                            x: 20,
                            y: 10,
                            width: 70
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
                        style: "margin-top: 12px;",
                        items: [{
                            xtype: "label",
                            id: "label6",
                            text: "文本设置",
                            x: 8,
                            y: 5,
                            width: 80,
                            style: "font-weight: bold;    font-size: 13px;"
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
                            text: "字体",
                            x: 20,
                            y: 5,
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label8",
                            text: "颜色",
                            x: 20,
                            y: 5,
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label9",
                            text: "字号",
                            x: 20,
                            y: 5,
                            width: 80
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
                            text: "字形",
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
                        xtype: "panel",
                        id: "titlePanle",
                        title: "Panel",
                        header: false,
                        border: false,
                        height: 484,
                        width: 145,
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
                                    id: "titleText",
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
                                id: "div9",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 145,
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
                                    width: 92,
                                    height: 30,
                                    style: "margin-top: 3px;",
                                    items: [{
                                        xtype: "vmd.ux.ButtonGroup",
                                        id: "ButtonGroup",
                                        layout: "anchor",
                                        text: "横排,竖排",
                                        count: "2",
                                        width: 101,
                                        selectIndex: "1",
                                        height: 28,
                                        style: "font-size: 12px;",
                                        click: "ButtonGroup_click",
                                        listeners: {
                                            click: ButtonGroup_click
                                        }
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
                                style: "margin-top: 3px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div14",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 27,
                                    layout: "fit",
                                    style: "margin-top: 2px;",
                                    items: [{
                                        xtype: "vmd.comlist",
                                        id: "Titlealign",
                                        width: 172,
                                        height: 270,
                                        cls: "comlist-b",
                                        style: "margin-top: 3px;",
                                        afterrender: "Titlealign_afterrender",
                                        editable: false,
                                        listeners: {
                                            vmdafterrender: Titlealign_afterrender
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
                                        id: "titleOffset",
                                        layout: "absolute",
                                        szDecimalChanged: "titleOffset_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: titleOffset_szDecimalChanged
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
                                style: "margin-top: 5px;",
                                hidden: false,
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
                                        xtype: "vmd.ux.Number",
                                        id: "titleX",
                                        layout: "absolute",
                                        szDecimalChanged: "titleX_szDecimalChanged",
                                        hidden: false,
                                        listeners: {
                                            szDecimalChanged: titleX_szDecimalChanged
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
                                        id: "titleY",
                                        layout: "absolute",
                                        szDecimalChanged: "titleY_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: titleY_szDecimalChanged
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
                                style: "margin-top: 2px;",
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
                                        id: "rotation",
                                        layout: "absolute",
                                        szDecimalChanged: "rotation_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: rotation_szDecimalChanged
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
                                    id: "div23",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 33
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
                                style: "margin-top: 5px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div29",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.FontFamity",
                                        id: "axisFontFamity",
                                        layout: "border",
                                        width: 142,
                                        fontChange: "axisFontFamity_fontChange",
                                        listeners: {
                                            fontChange: axisFontFamity_fontChange
                                        }
                                    }]
                                }]
                            },
                            {
                                xtype: "vmd.div",
                                id: "div30",
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
                                    id: "div31",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.ColorSelect",
                                        id: "axisColorSelect",
                                        layout: "fit",
                                        width: 142,
                                        colorchange: "axisColorSelect_colorchange",
                                        listeners: {
                                            colorchange: axisColorSelect_colorchange
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
                                y: 5,
                                style: "margin-top: 5px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div33",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.FontSize",
                                        id: "axisFontSize",
                                        layout: "border",
                                        width: 142,
                                        sizeChange: "axisFontSize_sizeChange",
                                        listeners: {
                                            sizeChange: axisFontSize_sizeChange
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
                                style: "margin-top: 5px;",
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
                                        xtype: "vmd.ux.FontStyle",
                                        id: "axisFontStyle",
                                        layout: "border",
                                        width: 142,
                                        height: 30,
                                        styleChange: "axisFontStyle_styleChange",
                                        listeners: {
                                            styleChange: axisFontStyle_styleChange
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.AxisTitle");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AxisTitle");
    }
})