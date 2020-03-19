Ext.define('vmd.ux.printSetting.Controller', {
    xtype: 'vmd.ux.printSetting.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.PrintSetting", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.PrintSetting",
    title: "Panel",
    header: false,
    border: false,
    width: 426,
    height: 690,
    layout: "fit",
    autoScroll: true,
    uxCss: ".b{    border: 1px solid #ddd}.c{    cursor: pointer}.noneBorder .x-form-text {    border: none;    border-bottom: none;}",
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
        //  var page.arr = sheetHot.allPrintInfo||null;
        var page = this;
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var data = [{
            name: 'A1',
            value: 'A1'
        }, {
            name: 'A2',
            value: 'A2'
        }, {
            name: 'A3',
            value: 'A3'
        }, {
            name: 'A4',
            value: 'A4'
        }, {
            name: 'A5',
            value: 'A5'
        }, {
            name: 'B3',
            value: 'B3'
        }, {
            name: 'B4',
            value: 'B4'
        }, {
            name: 'B5',
            value: 'B5'
        }];
        store.loadData(data);
        //////////////////////////////////////////////
        var store1 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var data1 = [{
            name: '100点/英寸',
            value: '100点/英寸'
        }, {
            name: '200点/英寸',
            value: '200点/英寸'
        }, {
            name: '300点/英寸',
            value: '300点/英寸'
        }];
        store1.loadData(data1);
        //////////////////////////////////////////////
        function comlist1_beforerender(sender) {
            sender.store = store1;
            sender.displayField = 'name'
            sender.valueField = 'value'
        }

        function comlist_beforerender(sender) {
            sender.store = store;
            sender.displayField = 'name'
            sender.valueField = 'value'
        }

        function div1_click(sender, e) {
            add(print_marginTop)
        }

        function div4_click(sender, e) {
            add(print_marginBottom)
        }

        function div7_click(sender, e) {
            add(print_marginLeft)
        }

        function div10_click(sender, e) {
            add(print_marginRight)
        }

        function div13_click(sender, e) {
            add(print_header)
        }

        function div16_click(sender, e) {
            add(print_footer)
        }

        function div2_click(sender, e) {
            minus(print_marginTop)
        }

        function div5_click(sender, e) {
            minus(print_marginBottom)
        }

        function div8_click(sender, e) {
            minus(print_marginLeft)
        }

        function div11_click(sender, e) {
            minus(print_marginRight)
        }

        function div14_click(sender, e) {
            minus(print_header)
        }

        function div17_click(sender, e) {
            minus(print_footer)
        }

        function print_footer_afterrender(sender) {
            sender.setValue("3")
        }

        function print_marginTop_afterrender(sender) {
            sender.setValue("3")
        }

        function print_marginBottom_afterrender(sender) {
            sender.setValue("3")
        }

        function print_marginLeft_afterrender(sender) {
            sender.setValue("1")
        }

        function print_marginRight_afterrender(sender) {
            sender.setValue("1")
        }

        function print_header_afterrender(sender) {
            sender.setValue("1")
        }

        function setInfo(info) {
            page.arr = info.allPrintInfo;
            print_quality.setValue(info.allPrintInfo.print_quality)
            print_paperSize.setValue(info.allPrintInfo.print_paperSize)
            print_direction.setValue(info.allPrintInfo.print_direction)
            print_marginTop.setValue(info.allPrintInfo.print_marginTop)
            print_marginBottom.setValue(info.allPrintInfo.print_marginBottom)
            print_marginLeft.setValue(info.allPrintInfo.print_marginLeft)
            print_marginRight.setValue(info.allPrintInfo.print_marginRight)
            print_header.setValue(info.allPrintInfo.print_header)
            print_footer.setValue(info.allPrintInfo.print_footer)
        }

        function print_paperSize_selectChanged(sender, combo, record, index) {
            if (page.arr) {
                page.arr.print_paperSize = sender.getValue();
            }
        }

        function print_quality_selectChanged(sender, combo, record, index) {
            if (page.arr) {
                page.arr.print_quality = sender.getValue()
            }
        }

        function print_direction_change(sender, checked) {
            if (page.arr) {
                page.arr.print_direction = print_direction.getValue()
            }
        }

        function print_marginTop_keyup(sender, e) {
            changeNumber(sender)
        }

        function print_marginBottom_keyup(sender, e) {
            changeNumber(sender)
        }

        function print_marginLeft_keyup(sender, e) {
            changeNumber(sender)
        }

        function print_marginRight_keyup(sender, e) {
            changeNumber(sender)
        }

        function print_header_keyup(sender, e) {
            changeNumber(sender)
        }

        function print_footer_keyup(sender, e) {
            changeNumber(sender)
        }

        function add(comp) {
            if (page.arr) {
                comp.setValue(parseFloat(comp.getValue()) + 0.5)
                page.arr[comp.initialConfig.id] = parseFloat(page.arr[comp.initialConfig.id]) + 0.5
            }
        }

        function minus(comp) {
            if (page.arr) {
                comp.setValue(parseFloat(comp.getValue()) - 0.5)
                page.arr[comp.initialConfig.id] = parseFloat(page.arr[comp.initialConfig.id]) - 0.5
            }
        }

        function changeNumber(comp) {
            if (page.arr) {
                page.arr[comp.initialConfig.id] = parseFloat(comp.getValue());
            }
        }

        function PrintSetting_afterrender(sender) {}
        this.PrintSetting_afterrender = PrintSetting_afterrender;
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 262,
            x: 10,
            y: 10,
            items: [{
                    xtype: "panel",
                    id: "panel",
                    title: "页面",
                    header: true,
                    border: true,
                    height: 621,
                    width: 287,
                    layout: "absolute",
                    items: [{
                            xtype: "label",
                            id: "label",
                            text: "纸张大小：",
                            x: 10,
                            y: 10
                        },
                        {
                            xtype: "label",
                            id: "label1",
                            text: "打印质量：",
                            x: 10,
                            y: 45
                        },
                        {
                            xtype: "label",
                            id: "label2",
                            text: "打印方向：",
                            x: 10,
                            y: 80
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "print_paperSize",
                            width: 150,
                            height: 270,
                            x: 75,
                            y: 5,
                            cls: "b noneBorder",
                            beforerender: "comlist_beforerender",
                            selectChanged: "print_paperSize_selectChanged",
                            listeners: {
                                beforerender: comlist_beforerender,
                                selectChanged: print_paperSize_selectChanged
                            }
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "print_quality",
                            width: 150,
                            height: 270,
                            x: 75,
                            y: 40,
                            cls: "b noneBorder",
                            beforerender: "comlist1_beforerender",
                            selectChanged: "print_quality_selectChanged",
                            listeners: {
                                beforerender: comlist1_beforerender,
                                selectChanged: print_quality_selectChanged
                            }
                        },
                        {
                            xtype: "radiostoregroup",
                            id: "print_direction",
                            width: 200,
                            height: 40,
                            labelField: "label",
                            valueField: "value",
                            checkedField: "checked",
                            boxFieldName: "myRadio",
                            x: 75,
                            y: 75,
                            change: "print_direction_change",
                            listeners: {
                                change: print_direction_change
                            },
                            items: [{
                                    xtype: "radio",
                                    id: "hwRadio",
                                    boxLabel: "横向",
                                    width: 64,
                                    inputValue: "0"
                                },
                                {
                                    xtype: "radio",
                                    id: "hwRadio1",
                                    boxLabel: "纵向",
                                    inputValue: "1",
                                    checked: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "页边距",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "auto",
                    items: [{
                            xtype: "vmd.div",
                            id: "div",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 229,
                            height: 35,
                            x: -1,
                            y: 0,
                            layout: "absolute",
                            items: [{
                                    xtype: "label",
                                    id: "label3",
                                    text: "上边距：",
                                    x: 10,
                                    y: 10
                                },
                                {
                                    xtype: "textfield",
                                    id: "print_marginTop",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    x: 60,
                                    y: 5,
                                    cls: "b",
                                    afterrender: "print_marginTop_afterrender",
                                    width: 60,
                                    keyup: "print_marginTop_keyup",
                                    listeners: {
                                        vmdafterrender: print_marginTop_afterrender,
                                        keyup: print_marginTop_keyup
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div1",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    height: 20,
                                    x: 120,
                                    y: 5,
                                    html: "<img src=\"/system/img/report/border/上.png\" />",
                                    cls: "c",
                                    click: "div1_click",
                                    listeners: {
                                        click: div1_click
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div2",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    height: 20,
                                    x: 120,
                                    y: 15,
                                    html: "<img src=\"/system/img/report/border/下.png\" />",
                                    cls: "c",
                                    click: "div2_click",
                                    listeners: {
                                        click: div2_click
                                    }
                                },
                                {
                                    xtype: "label",
                                    id: "label9",
                                    text: "毫米",
                                    x: 140,
                                    y: 10
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div3",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 229,
                            height: 35,
                            x: -1,
                            y: 0,
                            layout: "absolute",
                            items: [{
                                    xtype: "label",
                                    id: "label4",
                                    text: "下边距：",
                                    x: 10,
                                    y: 10
                                },
                                {
                                    xtype: "textfield",
                                    id: "print_marginBottom",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    x: 60,
                                    y: 5,
                                    cls: "b",
                                    afterrender: "print_marginBottom_afterrender",
                                    width: 60,
                                    keyup: "print_marginBottom_keyup",
                                    listeners: {
                                        vmdafterrender: print_marginBottom_afterrender,
                                        keyup: print_marginBottom_keyup
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div4",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    height: 20,
                                    x: 120,
                                    y: 5,
                                    html: "<img src=\"/system/img/report/border/上.png\" />",
                                    cls: "c",
                                    click: "div4_click",
                                    listeners: {
                                        click: div4_click
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div5",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    height: 20,
                                    x: 120,
                                    y: 15,
                                    html: "<img src=\"/system/img/report/border/下.png\" />",
                                    cls: "c",
                                    click: "div5_click",
                                    listeners: {
                                        click: div5_click
                                    }
                                },
                                {
                                    xtype: "label",
                                    id: "label10",
                                    text: "毫米",
                                    x: 140,
                                    y: 10
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div6",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 229,
                            height: 35,
                            x: -1,
                            y: 0,
                            layout: "absolute",
                            items: [{
                                    xtype: "label",
                                    id: "label5",
                                    text: "左边距：",
                                    x: 10,
                                    y: 10
                                },
                                {
                                    xtype: "textfield",
                                    id: "print_marginLeft",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    x: 60,
                                    y: 5,
                                    cls: "b",
                                    afterrender: "print_marginLeft_afterrender",
                                    width: 60,
                                    keyup: "print_marginLeft_keyup",
                                    listeners: {
                                        vmdafterrender: print_marginLeft_afterrender,
                                        keyup: print_marginLeft_keyup
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div7",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    height: 20,
                                    x: 120,
                                    y: 5,
                                    html: "<img src=\"/system/img/report/border/上.png\" />",
                                    cls: "c",
                                    click: "div7_click",
                                    listeners: {
                                        click: div7_click
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div8",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    height: 20,
                                    x: 120,
                                    y: 15,
                                    html: "<img src=\"/system/img/report/border/下.png\" />",
                                    cls: "c",
                                    click: "div8_click",
                                    listeners: {
                                        click: div8_click
                                    }
                                },
                                {
                                    xtype: "label",
                                    id: "label11",
                                    text: "毫米",
                                    x: 140,
                                    y: 10
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div9",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 229,
                            height: 35,
                            x: -1,
                            y: 0,
                            layout: "absolute",
                            items: [{
                                    xtype: "label",
                                    id: "label6",
                                    text: "右边距：",
                                    x: 10,
                                    y: 10
                                },
                                {
                                    xtype: "textfield",
                                    id: "print_marginRight",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    x: 60,
                                    y: 5,
                                    cls: "b",
                                    afterrender: "print_marginRight_afterrender",
                                    width: 60,
                                    keyup: "print_marginRight_keyup",
                                    listeners: {
                                        vmdafterrender: print_marginRight_afterrender,
                                        keyup: print_marginRight_keyup
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div10",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 10,
                                    height: 20,
                                    x: 120,
                                    y: 5,
                                    html: "<img src=\"/system/img/report/border/上.png\" />",
                                    cls: "c",
                                    click: "div10_click",
                                    listeners: {
                                        click: div10_click
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div11",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 10,
                                    height: 20,
                                    x: 120,
                                    y: 15,
                                    html: "<img src=\"/system/img/report/border/下.png\" />",
                                    cls: "c",
                                    click: "div11_click",
                                    listeners: {
                                        click: div11_click
                                    }
                                },
                                {
                                    xtype: "label",
                                    id: "label12",
                                    text: "毫米",
                                    x: 140,
                                    y: 10
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div12",
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 229,
                            height: 35,
                            x: -1,
                            y: 0,
                            layout: "absolute",
                            items: [{
                                    xtype: "label",
                                    id: "label7",
                                    text: "页眉：",
                                    x: 20,
                                    y: 10
                                },
                                {
                                    xtype: "textfield",
                                    id: "print_header",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    x: 60,
                                    y: 5,
                                    cls: "b",
                                    afterrender: "print_header_afterrender",
                                    width: 60,
                                    keyup: "print_header_keyup",
                                    listeners: {
                                        vmdafterrender: print_header_afterrender,
                                        keyup: print_header_keyup
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div13",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    height: 20,
                                    x: 120,
                                    y: 5,
                                    html: "<img src=\"/system/img/report/border/上.png\" />",
                                    cls: "c",
                                    click: "div13_click",
                                    listeners: {
                                        click: div13_click
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div14",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    height: 20,
                                    x: 120,
                                    y: 15,
                                    html: "<img src=\"/system/img/report/border/下.png\" />",
                                    cls: "c",
                                    click: "div14_click",
                                    listeners: {
                                        click: div14_click
                                    }
                                },
                                {
                                    xtype: "label",
                                    id: "label13",
                                    text: "毫米",
                                    x: 140,
                                    y: 10
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
                            width: 229,
                            height: 35,
                            x: -1,
                            y: 0,
                            layout: "absolute",
                            items: [{
                                    xtype: "label",
                                    id: "label8",
                                    text: "页脚：",
                                    x: 20,
                                    y: 10
                                },
                                {
                                    xtype: "textfield",
                                    id: "print_footer",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    x: 60,
                                    y: 5,
                                    cls: "b",
                                    afterrender: "print_footer_afterrender",
                                    width: 60,
                                    keyup: "print_footer_keyup",
                                    listeners: {
                                        vmdafterrender: print_footer_afterrender,
                                        keyup: print_footer_keyup
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div16",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    height: 20,
                                    x: 120,
                                    y: 5,
                                    html: "<img src=\"/system/img/report/border/上.png\" />",
                                    cls: "c",
                                    click: "div16_click",
                                    listeners: {
                                        click: div16_click
                                    }
                                },
                                {
                                    xtype: "vmd.div",
                                    id: "div17",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 20,
                                    height: 20,
                                    x: 120,
                                    y: 15,
                                    html: "<img src=\"/system/img/report/border/下.png\" />",
                                    cls: "c",
                                    click: "div17_click",
                                    listeners: {
                                        click: div17_click
                                    }
                                },
                                {
                                    xtype: "label",
                                    id: "label14",
                                    text: "毫米",
                                    x: 140,
                                    y: 10
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info) {
            setInfo(info)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.PrintSetting");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.PrintSetting");
    }
})