Ext.define('vmd.ux.colorInput.Controller', {
    xtype: 'vmd.ux.colorInput.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ColorInput", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ColorInput",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 150,
    height: 28,
    layout: "fit",
    afterrender: "ColorInput_afterrender",
    autoHeight: true,
    style: "min-width: 45px;",
    listeners: {
        vmdafterrender: function() {
            try {
                this.ColorInput_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.ColorInput'
                }, ex, 50);
            }
        }
    },
    uxCss: ".x-color-palette em span{    width: 13px;    height: 13px;}.x-color-palette{    padding: 3px;    width:156px;    height: 160px;}",
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
            var isCp = false,
                isCpPick = false; // 颜色面板是否已存在
            var selectColor = '#333333';
            var colorShow, myColorPicker, cp;
            var page = this

            function colorDiv_click(sender, e) {
                if (myColor.hidden) {
                    var x = colorDiv.el.getRegion().left,
                        y = colorDiv.el.getRegion().top + 30;
                    if (y + 140 > Ext.getBody().dom.offsetHeight) {
                        y = y - 160
                    }
                    myColor.setPosition(x, y)
                    myColor.show();
                    Ext.getBody().appendChild(myColor.el);
                    showColor(selectColor);
                } else {
                    myColor.hide();
                    cp.destroy();
                    if (isCpPick) {
                        myColorPicker.unload();
                        myColorPicker = null;
                        isCpPick = false;
                    }
                }
                stopPP(e)
            }

            function showColor(value) {
                // if(isCp) {
                //     return
                // }
                if (!value) {
                    value = "#ffffff";
                }
                var cValue = value;
                var colors = ['000000', '993300', '333300', '003300', '003366', '000080', '333399', '333333', '800000', 'FF6600', '808000', '008000', '008080', '0000FF', '666699', '808080', 'FF0000', 'FF9900', '99CC00', '339966', '33CCCC', '3366FF', '800080', '969696', 'FF00FF', 'FFCC00', 'FFFF00', '00FF00', '00FFFF', '00CCFF', '993366', 'C0C0C0', 'FF99CC', 'FFCC99', 'FFFF99', 'CCFFCC', 'CCFFFF', '99CCFF', 'CC99FF', 'FFFFFF', 'DDDDDD', 'EEEEEE'];
                if (value.indexOf("#") != -1) {
                    cValue = value.slice(1);
                }
                if (!isInArray(colors, cValue)) {
                    cValue = '';
                }
                cp = new Ext.ColorPalette({
                    value: cValue,
                });
                cp.colors = colors;
                cp.render(myColor.id);
                cp.on('select', function(palette, color) {
                    selectColor = "#" + color;
                    setBackColor(color);
                    page.fireEvent('change', page, "#" + color);
                    myColor.hide();
                    if (isCpPick) {
                        myColorPicker.unload();
                        myColorPicker = null;
                        isCpPick = false;
                    }
                    cp.destroy();
                });
                isCp = true;
            }

            function setColorValue(color) {
                selectColor = color;
                setBackColor(color);
            }
            // 设置图框背景颜色
            function setBackColor(selColor) {
                if (selColor) {
                    vmd.taskRunner(function() {
                        if (colorDiv.el.dom) return true;
                    }, function() {
                        colorShow = vmd.getElement(colorDiv.id);
                        if (selColor.indexOf('#') == -1 && selColor.indexOf('rgb(') == -1) {
                            colorDiv.el.applyStyles('backgroundColor:#' + selColor);
                        } else {
                            colorDiv.el.applyStyles('backgroundColor:' + selColor);
                        }
                    })
                }
            }

            function colorRGBtoHex(color) {
                var rgb = color.split(',');
                var r = parseInt(rgb[0].split('(')[1]);
                var g = parseInt(rgb[1]);
                var b = parseInt(rgb[2].split(')')[0]);
                var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                return hex;
            }

            function ColorInput_afterrender(sender) {
                colorShow = vmd.getElement(colorDiv.id);
                colorShow.applyStyles('backgroundColor:#' + selectColor);
                myColor.on('afterlayout', function() {
                    Ext.getBody().appendChild(myColor.el);
                })
                // Ext.defer(function() {
                // }, 50)
            }

            function button_click(sender, e) {
                myColor.hide();
                cp.destroy();
                if (isCpPick) {
                    return;
                }
                isCpPick = true;
                // 语言设置
                dhtmlXColorPicker.prototype.i18n.zn = {
                    labelHue: "H",
                    labelSat: "S",
                    labelLum: "L",
                    labelRed: "R",
                    labelGreen: "g",
                    labelBlue: "B",
                    btnSelect: "选择",
                    btnCancel: "取消"
                }
                myColorPicker = new dhtmlXColorPicker({
                    // parent: document.body,
                    input: divR.id,
                    color: selectColor,
                    closeable: false
                });
                myColorPicker.loadUserLanguage('zn');
                myColorPicker.show();
                // myColorPicker.setPosition(100, 100)
                var myEvent = myColorPicker.attachEvent("onSelect", function(color, node) {
                    selectColor = color;
                    colorShow.applyStyles('backgroundColor:' + color);
                    page.fireEvent('change', page, color);
                    myColor.hide();
                    myColorPicker.unload();
                    myColorPicker = null;
                    isCpPick = false
                });
                var myEvent = myColorPicker.attachEvent("onCancel", function(color, node) {
                    myColorPicker.unload();
                    myColorPicker = null;
                    isCpPick = false
                });
            }

            function setColorWidth(w) {
                colorDiv.setWidth(w)
            }

            function isInArray(arr, value) {
                for (var i = 0; i < arr.length; i++) {
                    if (value === arr[i]) {
                        return true;
                    }
                }
                return false;
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ColorInput',
                p2: ex.message
            }, ex, 100);
        }
        this.ColorInput_afterrender = ColorInput_afterrender;
        this.items = [{
                xtype: "panel",
                id: "panel",
                title: "Panel",
                header: false,
                border: false,
                height: 28,
                layout: "fit",
                width: 267,
                x: 2,
                y: 2,
                region: "center",
                autoWidth: false,
                items: [{
                        xtype: "vmd.div",
                        id: "colorBox",
                        autoEl: "div",
                        border: true,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 161,
                        height: 24,
                        x: 0,
                        y: 0,
                        click: "colorDiv_click",
                        region: "center",
                        style: "border:0;",
                        layout: "border",
                        listeners: {
                            click: colorDiv_click
                        },
                        items: [{
                                xtype: "vmd.div",
                                id: "colorDiv",
                                autoEl: "div",
                                border: true,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 400,
                                height: 50,
                                region: "center",
                                style: "border: 1px solid #ddd;    border-right: 0;"
                            },
                            {
                                xtype: "vmd.button",
                                id: "colorButton",
                                type: "(none)",
                                size: "small",
                                x: 132,
                                y: -1,
                                width: 22,
                                style: "border-radius: 0;    background-size: 120%;    background-position: right;    border: 1px solid #ddd;    border-left: 0;    float: right;    font-size: 14px;    color: #646464;    /*background: url(\"/img/public/dhxcombo_arrow_down.gif\") 10px center;*/    /*background-repeat: no-repeat;*/",
                                icon: " icon-caret-down",
                                height: 26,
                                region: "east"
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "divR",
                        autoEl: "div",
                        border: true,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 2,
                        height: 2,
                        layout: "absolute",
                        x: 0,
                        y: 0
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "myColor",
                autoEl: "div",
                border: true,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 156,
                height: 160,
                x: 0,
                y: 0,
                hidden: true,
                layout: "absolute",
                autoHeight: true,
                autoWidth: false,
                region: "west",
                style: "background-color: #fff;    z-index: 9999;    position: absolute;",
                items: [{
                    xtype: "vmd.button",
                    id: "button",
                    text: "其他颜色",
                    type: "text",
                    size: "small",
                    width: 160,
                    height: 25,
                    region: "south",
                    x: 0,
                    y: 132,
                    style: "color: #333;",
                    click: "button_click",
                    hidden: false,
                    listeners: {
                        click: button_click
                    }
                }]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setValue = function(color) {
            //直接填写方法内容
            setColorValue(color)
        }
        this.getValue = function() {
            //直接填写方法内容
            return selectColor;
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ColorInput");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ColorInput");
    }
})