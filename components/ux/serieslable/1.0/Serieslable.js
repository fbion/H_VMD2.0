Ext.define('vmd.ux.serieslable.Controller', {
    xtype: 'vmd.ux.serieslable.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.Serieslable", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ButtonGroup$1.0$ButtonGroup", "vmd.ux.Number$1.0$Number", "vmd.ux.ColorSelect$1.0$ColorSelect", "vmd.ux.FontFamity$1.0$FontFamity", "vmd.ux.FontSize$1.0$FontSize", "vmd.ux.FontStyle$1.0$FontStyle"]),
    version: "1.0",
    xtype: "vmd.ux.Serieslable",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
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
        try {
            var page = this;

            function hwButtonGroup1_click(sender, selectedIndex) {
                var align = 'center'
                switch (selectedIndex) {
                    case 1:
                        align = 'right';
                        break;
                    case 2:
                        align = "center";
                        break;
                    case 3:
                        align = "left";
                        break;
                }
                page.fireEvent("seriesLableAlignChange", sender, align)
            }

            function hwButtonGroup_click(sender, selectedIndex) {
                var varAlign = 'middle'
                switch (selectedIndex) {
                    case 1:
                        varAlign = 'bottom';
                        break;
                    case 2:
                        varAlign = "middle";
                        break;
                    case 3:
                        varAlign = "top";
                        break;
                }
                page.fireEvent("seriesLableVarAlignChange", sender, varAlign)
            }

            function dataLabelX_szDecimalChanged(sender, value, describe) {
                page.fireEvent("seriesLableXchange", sender, value);
            }

            function dataLabelY_szDecimalChanged(sender, value, describe) {
                page.fireEvent("seriesLableYchange", sender, value);
            }

            function FontFamity_fontChange(sender, record) {
                page.fireEvent("FontFamitychange", sender, record);
            }

            function FontSize_sizeChange(sender, record) {
                page.fireEvent("FontSizechange", sender, record);
            }

            function FontStyle_styleChange(sender, record) {
                page.fireEvent("FontStylechange", sender, record);
            }

            function ColorSelect_colorchange(sender, selColor) {
                page.fireEvent("FontColorchange", sender, selColor);
            }

            function distance_szDecimalChanged(sender, value, describe) {
                page.fireEvent("seriesLableDistance", sender, value);
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.Serieslable',
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
                            id: "labelShow",
                            fieldLabel: "Checkbox",
                            boxLabel: "显示标注",
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
                            text: "标注格式",
                            x: 20,
                            y: 12,
                            width: 70
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label11",
                            text: "水平对齐",
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label4",
                            text: "垂直对齐",
                            x: 20,
                            y: 10,
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
                            text: "X偏移",
                            x: 20,
                            y: 10,
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
                        style: "margin-top: 3px;",
                        items: [{
                            xtype: "label",
                            id: "label",
                            text: "Y偏移",
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel",
                            text: "饼图圆心偏移",
                            x: 20,
                            y: 10,
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
                            text: "文字设置",
                            x: 8,
                            y: 15,
                            width: 60,
                            style: "font-weight: bold;    font-size: 13px;"
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
                            y: 20,
                            width: 80
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label10",
                            text: "字体",
                            x: 20,
                            y: 20,
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
                        style: "margin-top: 6px;",
                        items: [{
                            xtype: "label",
                            id: "label5",
                            text: "字号",
                            x: 20,
                            y: 20,
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
                        style: "margin-top: 7px;",
                        items: [{
                            xtype: "label",
                            id: "label8",
                            text: "字形",
                            x: 20,
                            y: 20,
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
                        id: "lablePanel",
                        title: "Panel",
                        header: false,
                        border: false,
                        height: 500,
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
                                    xtype: "textfield",
                                    id: "daLaFormat",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    cls: "in-text",
                                    width: 142
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
                                    id: "div6",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 140,
                                    height: 30,
                                    layout: "fit",
                                    style: "margin-top: 2px;",
                                    items: [{
                                        xtype: "vmd.ux.ButtonGroup",
                                        id: "hwButtonGroup1",
                                        layout: "anchor",
                                        count: "3",
                                        text: "居左,居中,居右",
                                        click: "hwButtonGroup1_click",
                                        listeners: {
                                            click: hwButtonGroup1_click
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
                                height: 30,
                                layout: "auto",
                                y: 5,
                                style: "margin-top: 3px;",
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
                                    style: "margin-top: 2px;",
                                    items: [{
                                        xtype: "vmd.ux.ButtonGroup",
                                        id: "hwButtonGroup",
                                        layout: "anchor",
                                        count: "3",
                                        text: "居上,居中,居下",
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
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "dataLabelX",
                                        layout: "absolute",
                                        height: 36,
                                        szDecimalChanged: "dataLabelX_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: dataLabelX_szDecimalChanged
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
                                style: "margin-top: 3px;",
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
                                        id: "dataLabelY",
                                        layout: "absolute",
                                        szDecimalChanged: "dataLabelY_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: dataLabelY_szDecimalChanged
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
                                style: "margin-top: 3px;",
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
                                        id: "distance",
                                        layout: "absolute",
                                        szDecimalChanged: "distance_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: distance_szDecimalChanged
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
                                height: 50,
                                layout: "auto",
                                y: 5
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
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div30",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 145,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.ColorSelect",
                                        id: "ColorSelect",
                                        layout: "fit",
                                        width: 145,
                                        colorchange: "ColorSelect_colorchange",
                                        listeners: {
                                            colorchange: ColorSelect_colorchange
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
                                style: "margin-top: 8px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div35",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 145,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.FontFamity",
                                        id: "FontFamity",
                                        layout: "border",
                                        width: 142,
                                        fontChange: "FontFamity_fontChange",
                                        listeners: {
                                            fontChange: FontFamity_fontChange
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
                                    width: 145,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.FontSize",
                                        id: "FontSize",
                                        layout: "border",
                                        sizeChange: "FontSize_sizeChange",
                                        width: 142,
                                        listeners: {
                                            sizeChange: FontSize_sizeChange
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
                                items: [{
                                    xtype: "vmd.div",
                                    id: "div28",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 145,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.FontStyle",
                                        id: "FontStyle",
                                        layout: "border",
                                        width: 144,
                                        height: 30,
                                        styleChange: "FontStyle_styleChange",
                                        listeners: {
                                            styleChange: FontStyle_styleChange
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.Serieslable");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Serieslable");
    }
})