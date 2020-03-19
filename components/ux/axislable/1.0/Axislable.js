Ext.define('vmd.ux.axislable.Controller', {
    xtype: 'vmd.ux.axislable.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.Axislable", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.Number$1.0$Number", "vmd.ux.ButtonGroup$1.0$ButtonGroup", "vmd.ux.Number$1.0$Number", "vmd.ux.FontFamity$1.0$FontFamity", "vmd.ux.FontSize$1.0$FontSize", "vmd.ux.FontStyle$1.0$FontStyle", "vmd.ux.ColorSelect$1.0$ColorSelect"]),
    version: "1.0",
    xtype: "vmd.ux.Axislable",
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
        try {
            var page = this;

            function labelStaggerLines_szDecimalChanged(sender, value, describe) {
                page.fireEvent("labelStaggerLinesChange", sender, value)
            }

            function hwButtonGroup_click(sender, selectedIndex) {
                var align = 'center';
                switch (selectedIndex) {
                    case 1:
                        align = "right";
                        break;
                    case 2:
                        align = "center";
                        break;
                    case 3:
                        align = "left";
                        break;
                }
                page.fireEvent("lableAlignChange", sender, align)
            }

            function labelX_szDecimalChanged(sender, value, describe) {
                page.fireEvent("lableXChange", sender, value)
            }

            function labelY_szDecimalChanged(sender, value, describe) {
                page.fireEvent("lableYChange", sender, value)
            }

            function FontFamity_fontChange(sender, record) {
                page.fireEvent("fontFamityChange", sender, record)
            }

            function FontSize_sizeChange(sender, record) {
                page.fireEvent("fontSizeChange", sender, record)
            }

            function FontStyle_styleChange(sender, record) {
                page.fireEvent("fontStyleChange", sender, record)
            }

            function fontColor_colorchange(sender, selColor) {
                page.fireEvent("fontColorChange", sender, selColor)
            }

            function labelRotation_szDecimalChanged(sender, value, describe) {
                page.fireEvent("labelRotationChange", sender, value)
            }

            function lableStep_szDecimalChanged(sender, value, describe) {
                page.fireEvent("lableStepChange", sender, value)
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.Axislable',
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
                            id: "lableShow",
                            fieldLabel: "Checkbox",
                            boxLabel: "显示标签",
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
                            text: "标签格式",
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
                            text: "显示行数",
                            x: 20,
                            y: 13,
                            width: 70
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
                        style: "margin-top: 4px;",
                        items: [{
                            xtype: "label",
                            id: "hwLabel",
                            text: "显示间隔",
                            x: 20,
                            y: 13,
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
                        items: [{
                            xtype: "label",
                            id: "label11",
                            text: "旋转度数",
                            x: 20,
                            y: 17,
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
                            text: "对齐方式",
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
                            text: "X偏移",
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
                            text: "Y偏移",
                            x: 20,
                            y: 20,
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
                        style: "margin-top: 30px;",
                        items: [{
                            xtype: "checkbox",
                            id: "allowDecimals",
                            fieldLabel: "Checkbox",
                            boxLabel: "显示小数",
                            x: 20,
                            y: 5
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
                        style: "margin-top: 5px;",
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
                        style: "margin-top: 5px;",
                        items: [{
                            xtype: "label",
                            id: "label8",
                            text: "字形",
                            x: 20,
                            y: 20,
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
                        height: 573,
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
                                    id: "laberFormat",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    cls: "in-text",
                                    width: 142
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
                                        id: "labelStaggerLines",
                                        layout: "absolute",
                                        szDecimalChanged: "labelStaggerLines_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: labelStaggerLines_szDecimalChanged
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
                                style: "margin-top: 2px;",
                                items: [{
                                    xtype: "vmd.div",
                                    id: "hwDiv3",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 142,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.Number",
                                        id: "lableStep",
                                        layout: "absolute",
                                        szDecimalChanged: "lableStep_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: lableStep_szDecimalChanged
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
                                    id: "labelRotation",
                                    layout: "absolute",
                                    szDecimalChanged: "labelRotation_szDecimalChanged",
                                    listeners: {
                                        szDecimalChanged: labelRotation_szDecimalChanged
                                    }
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
                                        count: "3",
                                        text: "居左,居中,居右",
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
                                        id: "labelX",
                                        layout: "absolute",
                                        height: 36,
                                        szDecimalChanged: "labelX_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: labelX_szDecimalChanged
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
                                        id: "labelY",
                                        layout: "absolute",
                                        szDecimalChanged: "labelY_szDecimalChanged",
                                        listeners: {
                                            szDecimalChanged: labelY_szDecimalChanged
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
                                height: 88,
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
                                    xtype: "vmd.div",
                                    id: "div35",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 144,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.FontFamity",
                                        id: "FontFamity",
                                        layout: "border",
                                        width: 144,
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
                                    width: 144,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.FontSize",
                                        id: "FontSize",
                                        layout: "border",
                                        width: 144,
                                        sizeChange: "FontSize_sizeChange",
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
                                    width: 144,
                                    height: 30,
                                    items: [{
                                        xtype: "vmd.ux.FontStyle",
                                        id: "FontStyle",
                                        layout: "border",
                                        width: 144,
                                        styleChange: "FontStyle_styleChange",
                                        listeners: {
                                            styleChange: FontStyle_styleChange
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
                                        id: "fontColor",
                                        layout: "fit",
                                        width: 145,
                                        colorchange: "fontColor_colorchange",
                                        listeners: {
                                            colorchange: fontColor_colorchange
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.Axislable");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Axislable");
    }
})