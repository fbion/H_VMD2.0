Ext.define("vmd.ux.BaseProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.FontSeting$1.0$FontSeting", "vmd.ux.AlignWebGroup$1.0$AlignWebGroup", "vmd.ux.VerticalWebGroup$1.0$VerticalWebGroup", "vmd.ux.NumberInput$1.0$NumberInput", "vmd.ux.FontSeting$1.0$FontSeting", "vmd.ux.NumberInput$1.0$NumberInput", "vmd.ux.ButtonGroup$1.0$ButtonGroup"]),
    version: "1.0",
    xtype: "vmd.ux.BaseProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 318,
    height: 880,
    layout: "absolute",
    autoScroll: false,
    beforerender: "BaseProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.BaseProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.BaseProperty'
                }, ex, 50);
            }
        }
    },
    uxCss: ".in-text{    border: 1px solid #ddd;    margin-top:3px;    margin-right: 20px;}.bnt-text{    margin-top: 5px;    line-height: 8px;    margin-right: 3px;}",
    uxrequirecss: "[\"components/ux/toptitle/1.0/css/iconfont.css?ver=vmd2.0.7.200328\"]",
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
            function panelGraphName_beforerender(sender) {}
            var viewModel;
            var page = this;

            function setBaseProperty(paraProp) {
                //建立模型绑定关系
                viewModel.bind(paraProp)
                // setGraphNameInfo(paraProp.title);
                // setLegendInfo(paraProp.legend);
                // setMapInfo(paraProp.mapInfo);
                // setScaleInfo(paraProp.scale);
                // setFrameInfo(paraProp.frame);
                // setCompassInfo(paraProp.compass);
            }
            // function setGraphNameInfo(info) {
            //     hwChkGraphNameShow.setValue(info.show);
            //     hwChkGraphNameShow.checked = info.show;
            //     hwTextGraphName.setValue(info.text);
            // }
            // function getGraphNameInfo() {
            //     // 根据图名属性组织图名属性对象
            //     var info = {
            //         show: hwChkGraphNameShow.getValue(),
            //         text: hwTextGraphName.getValue(),
            //         font: {} // 组织字体对象
            //     }
            //     return info;
            // }
            // function setMapInfo(info) {
            //     hwChkMapInfoShow.setValue(info.show);
            //     hwChkMapInfoShow.checked = info.show;
            //     hwTextBtdw.setValue(info.btdw);
            //     hwTextHzr.setValue(info.hzr);
            //     hwTextBzr.setValue(info.bzr);
            //     hwTextShr.setValue(info.shr);
            //     hwDateBzrq.setValue(info.date);
            //     // 字体属性设置
            // }
            // function setFrameInfo(info) {
            //     hwChkFrameShow.setValue(info.show);
            //     hwChkFrameShow.checked = info.show;
            // }
            // function setScaleInfo(info) {
            //     hwChkScaleShow.setValue(info.show);
            //     hwChkScaleShow.checked = info.show;
            // }
            // function setCompassInfo(info) {
            //     hwChkCompassShow.setValue(info.show);
            //     hwChkCompassShow.checked = info.show;
            // }
            // function getMapInfo() {
            //     // 根据图名属性组织图名属性对象
            //     var info = {
            //         show: hwChkMapInfoShow.getValue(),
            //         btdw: hwTextBtdw.getValue(),
            //         hzr: hwTextHzr.getValue(),
            //         bzr: hwTextBzr.getValue(),
            //         shr: hwTextShr.getValue(),
            //         date: hwDateBzrq.getValue(),
            //         font: {} // 组织字体对象
            //     }
            //     return info;
            // }
            // function setLegendInfo(info) {
            //     hwChkLegendShow.setValue(info.show);
            //     hwChkLegendShow.checked = info.show;
            //     posHori.setValue(info.posHori);
            //     posVert.setValue(info.posVert);
            //     legendRows.setValue(info.rows);
            //     legendCols.setValue(info.cols);
            //     borderOffTop.setValue(info.borderOffTop)
            //     borderOffBtm.setValue(info.borderOffBtm)
            //     borderOffLeft.setValue(info.borderOffLeft)
            //     borderOffRight.setValue(info.borderOffRight)
            //     itemWidth.setValue(info.itemWidth)
            //     itemHeight.setValue(info.itemHeight)
            //     itemSpaceHori.setValue(info.itemSpaceHori)
            //     itemSpaceVert.setValue(info.itemSpaceVert)
            // }
            // function getLegendInfo() {
            //     // 根据图名属性组织图名属性对象
            //     var info = {
            //         show: hwChkLegendShow.getValue(),
            //         // text: hwTextGraphName.getValue(),
            //         // font: {} // 组织字体对象
            //     }
            //     return info;
            // }
            // function getFrameInfo(info) {
            //     // 根据图名属性组织图名属性对象
            //     var info = {
            //         show: hwChkFrameShow.getValue()
            //     }
            //     return info;
            // }
            // function getScaleInfo(info) {
            //     // 根据图名属性组织图名属性对象
            //     var info = {
            //         show: hwChkScaleShow.getValue()
            //     }
            //     return info;
            // }
            // function getCompassInfo(info) {
            //     // 根据图名属性组织图名属性对象
            //     var info = {
            //         show: hwChkCompassShow.getValue()
            //     }
            //     return info;
            // }
            function hwChkFrameShow_check(sender, checked) {}

            function hwButtonGroup_click(sender, selectedIndex) {
                // var layout;
                // switch (selectedIndex) {
                //     case 1:
                //         layout = 'horizontal';
                //         break;
                //     case 2:
                //         layout = 'vertical';
                //         break;
                // }
                // page.fireEvent("legendLoyoutChange", sender, layout);
            }

            function BaseProperty_beforerender(sender) {
                //初始化
                viewModel = new vmd.base.ViewModel(page);
                //增加观察
                viewModel.addObserver();
                //实现接口
                viewModel.onValueChange = function(sender, newValue, vm) {
                    viewModel.set(sender.BindValue, newValue);
                    xds.activePropPanel.fireEvent('DataValueChange', sender, newValue, vm)
                }
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.BaseProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.BaseProperty_beforerender = BaseProperty_beforerender;
        this.items = [{
                xtype: "panel",
                id: "panelGraphName",
                title: "图名",
                header: true,
                border: true,
                height: 150,
                layout: "absolute",
                width: 318,
                beforerender: "panelGraphName_beforerender",
                x: 0,
                y: 0,
                listeners: {
                    beforerender: panelGraphName_beforerender
                },
                items: [{
                        xtype: "checkbox",
                        id: "hwChkGraphNameShow",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        checked: true,
                        width: 57,
                        x: 10,
                        y: 10,
                        BindValue: "title.show"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel",
                        text: "文本",
                        x: 10,
                        y: 40
                    },
                    {
                        xtype: "textfield",
                        id: "hwTextGraphName",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 50,
                        y: 35,
                        width: 250,
                        cls: "text-input",
                        BindValue: "title.text"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel1",
                        text: "字体",
                        x: 10,
                        y: 75
                    },
                    {
                        xtype: "vmd.ux.FontSeting",
                        id: "hwFontSeting",
                        layout: "fit",
                        x: 60,
                        y: 70,
                        width: 230,
                        fontStyleIsShow: true,
                        BindValue: "title.font"
                    }
                ]
            },
            {
                xtype: "panel",
                id: "panelMapInfo",
                title: "编图信息",
                header: true,
                border: true,
                height: 240,
                layout: "absolute",
                width: 318,
                x: 0,
                y: 150,
                items: [{
                        xtype: "checkbox",
                        id: "hwChkMapInfoShow",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        x: 10,
                        y: 10,
                        checked: true,
                        BindValue: "mapInfo.show"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel2",
                        text: "编图单位",
                        x: 10,
                        y: 50
                    },
                    {
                        xtype: "textfield",
                        id: "hwTextBtdw",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 45,
                        width: 230,
                        cls: "text-input",
                        BindValue: "mapInfo.btdw"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel3",
                        text: "绘制人",
                        x: 10,
                        y: 90
                    },
                    {
                        xtype: "textfield",
                        id: "hwTextHzr",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 85,
                        width: 80,
                        cls: "text-input",
                        BindValue: "mapInfo.hzr"
                    },
                    {
                        xtype: "textfield",
                        id: "hwTextBzr",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 210,
                        y: 85,
                        width: 80,
                        cls: "text-input",
                        BindValue: "mapInfo.bzr"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel4",
                        text: "编制人",
                        x: 160,
                        y: 90
                    },
                    {
                        xtype: "label",
                        id: "hwLabel5",
                        text: "审核人",
                        x: 10,
                        y: 130
                    },
                    {
                        xtype: "textfield",
                        id: "hwTextShr",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 125,
                        width: 80,
                        cls: "text-input",
                        BindValue: "mapInfo.shr"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel6",
                        text: "日期",
                        x: 160,
                        y: 130
                    },
                    {
                        xtype: "datefield",
                        id: "hwDateBzrq",
                        format: "Y-m-d",
                        showToday: true,
                        allowBlank: true,
                        x: 210,
                        y: 125,
                        width: 100,
                        cls: "text-input",
                        BindValue: "mapInfo.date"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel7",
                        text: "字体",
                        x: 10,
                        y: 170
                    },
                    {
                        xtype: "vmd.ux.FontSeting",
                        id: "hwFontSeting1",
                        layout: "fit",
                        x: 70,
                        y: 165,
                        fontStyleIsShow: true,
                        width: 230,
                        BindValue: "mapInfo.font"
                    }
                ]
            },
            {
                xtype: "panel",
                id: "panelLegend",
                title: "图例",
                header: true,
                border: true,
                height: 400,
                layout: "absolute",
                width: 318,
                x: 0,
                y: 390,
                items: [{
                        xtype: "checkbox",
                        id: "hwChkLegendShow",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        x: 10,
                        y: 10,
                        checked: true,
                        BindValue: "legend.show"
                    },
                    {
                        xtype: "vmd.ux.AlignWebGroup",
                        id: "posHori",
                        layout: "fit",
                        x: 65,
                        y: 80,
                        width: 90,
                        BindValue: "legend.posHori",
                        Name: "isOnRander"
                    },
                    {
                        xtype: "vmd.ux.VerticalWebGroup",
                        id: "posVert",
                        layout: "fit",
                        x: 170,
                        y: 80,
                        width: 90,
                        BindValue: "legend.posVert",
                        Name: "isOnRander"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel8",
                        text: "位置",
                        x: 10,
                        y: 85
                    },
                    {
                        xtype: "label",
                        id: "hwLabel10",
                        text: "边距",
                        x: 10,
                        y: 160,
                        style: "font-weight: bold;",
                        height: 20
                    },
                    {
                        xtype: "label",
                        id: "hwLabel11",
                        text: "上",
                        x: 10,
                        y: 190
                    },
                    {
                        xtype: "label",
                        id: "hwLabel12",
                        text: "高度",
                        x: 10,
                        y: 45
                    },
                    {
                        xtype: "vmd.ux.NumberInput",
                        id: "borderOffTop",
                        layout: "auto",
                        x: 30,
                        y: 180,
                        BindValue: "legend.borderOffTop",
                        width: 52
                    },
                    {
                        xtype: "label",
                        id: "hwLabel14",
                        text: "下",
                        x: 80,
                        y: 190
                    },
                    {
                        xtype: "vmd.ux.NumberInput",
                        id: "borderOffBtm",
                        layout: "auto",
                        x: 100,
                        y: 180,
                        BindValue: "legend.borderOffBtm"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel15",
                        text: "左",
                        x: 160,
                        y: 190,
                        width: 20,
                        height: 20
                    },
                    {
                        xtype: "vmd.ux.NumberInput",
                        id: "borderOffLeft",
                        layout: "auto",
                        x: 180,
                        y: 180,
                        BindValue: "legend.borderOffLeft"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel16",
                        text: "右",
                        x: 240,
                        y: 190
                    },
                    {
                        xtype: "vmd.ux.NumberInput",
                        id: "borderOffRight",
                        layout: "auto",
                        x: 260,
                        y: 180,
                        BindValue: "legend.borderOffRight"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel17",
                        text: "图例项",
                        x: 10,
                        y: 220,
                        style: "font-weight: bold;"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel18",
                        text: "宽度",
                        x: 10,
                        y: 290,
                        height: 20,
                        width: 40
                    },
                    {
                        xtype: "vmd.ux.NumberInput",
                        id: "itemWidth",
                        layout: "auto",
                        x: 60,
                        y: 280,
                        width: 90,
                        BindValue: "legend.itemWidth"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel19",
                        text: "高度",
                        x: 160,
                        y: 290
                    },
                    {
                        xtype: "vmd.ux.NumberInput",
                        id: "itemHeight",
                        layout: "auto",
                        x: 200,
                        y: 280,
                        width: 90,
                        BindValue: "legend.itemHeight"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel20",
                        text: "纵向间距",
                        x: 160,
                        y: 290,
                        height: 20,
                        hidden: true
                    },
                    {
                        xtype: "vmd.ux.NumberInput",
                        id: "itemSpaceHori",
                        layout: "auto",
                        x: 60,
                        y: 320,
                        width: 90,
                        BindValue: "legend.itemGap"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel21",
                        text: "间距",
                        x: 10,
                        y: 330,
                        height: 20
                    },
                    {
                        xtype: "vmd.ux.NumberInput",
                        id: "itemSpaceVert",
                        layout: "auto",
                        x: 220,
                        y: 280,
                        width: 90,
                        BindValue: "legend.itemSpaceVert",
                        hidden: true
                    },
                    {
                        xtype: "vmd.ux.FontSeting",
                        id: "hwFontSeting2",
                        layout: "fit",
                        x: 60,
                        y: 240,
                        width: 240,
                        fontStyleIsShow: true,
                        BindValue: "legend.fontItem"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel23",
                        text: "字体",
                        x: 10,
                        y: 250
                    },
                    {
                        xtype: "vmd.ux.NumberInput",
                        id: "hwNumberInput",
                        layout: "auto",
                        x: 65,
                        y: 40,
                        BindValue: "legend.height",
                        width: 90,
                        Name: "isOnRander"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel9",
                        text: "宽度",
                        x: 165,
                        y: 45
                    },
                    {
                        xtype: "vmd.ux.NumberInput",
                        id: "hwNumberInput1",
                        layout: "auto",
                        x: 200,
                        y: 40,
                        BindValue: "legend.width",
                        width: 90,
                        Name: "isOnRander"
                    },
                    {
                        xtype: "label",
                        id: "hwLabel13",
                        text: "排列",
                        x: 10,
                        y: 130
                    },
                    {
                        xtype: "vmd.ux.ButtonGroup",
                        id: "hwButtonGroup",
                        layout: "anchor",
                        x: 65,
                        y: 125,
                        text: "横向排列,纵向排列",
                        count: "2",
                        BindValue: "legend.orient",
                        width: 225,
                        Name: "isOnRander"
                    }
                ]
            },
            {
                xtype: "panel",
                id: "panelOther",
                title: "其他",
                header: true,
                border: false,
                height: 80,
                layout: "absolute",
                x: -1,
                y: 790,
                width: 318,
                items: [{
                        xtype: "checkbox",
                        id: "hwChkFrameShow",
                        fieldLabel: "Checkbox",
                        boxLabel: "图框",
                        x: 10,
                        y: 10,
                        checked: true,
                        BindValue: "frame.show",
                        check: "hwChkFrameShow_check",
                        listeners: {
                            check: hwChkFrameShow_check
                        }
                    },
                    {
                        xtype: "checkbox",
                        id: "hwChkScaleShow",
                        fieldLabel: "Checkbox",
                        boxLabel: "比例尺",
                        x: 110,
                        y: 10,
                        checked: true,
                        BindValue: "scale.show"
                    },
                    {
                        xtype: "checkbox",
                        id: "hwChkCompassShow",
                        fieldLabel: "Checkbox",
                        boxLabel: "指北针",
                        x: 210,
                        y: 10,
                        checked: true,
                        BindValue: "compass.show"
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.iSetGraphNameInfo = function(info) {
            //直接填写方法内容
            setGraphNameInfo(info);
        }
        this.iGetGraphNameInfo = function() {
            //直接填写方法内容
            return getGraphNameInfo();
        }
        this.iGetLegendInfo = function() {
            //直接填写方法内容
            return getLegendInfo();
        }
        this.iGetMapInfoShow = function() {
            //直接填写方法内容
            return hwChkMapInfoShow.getValue();
        }
        this.iGetFrameInfo = function() {
            //直接填写方法内容
            return getFrameInfo();
        }
        this.iGetScaleInfo = function() {
            //直接填写方法内容
            return getScaleInfo();
        }
        this.iGetCompassInfo = function() {
            //直接填写方法内容
            return getCompassInfo();
        }
        this.iSetLegendInfo = function(info) {
            //直接填写方法内容
            setLegendInfo(info);
        }
        this.iSetMapInfo = function(info) {
            //直接填写方法内容
            setMapInfo(info);
        }
        this.iSetFrameInfo = function(info) {
            //直接填写方法内容
            setFrameInfo(info);
        }
        this.iSetScaleInfo = function(info) {
            //直接填写方法内容
            setScaleInfo(info);
        }
        this.iSetCompassInfo = function(info) {
            //直接填写方法内容
            setCompassInfo(info);
        }
        this.iSetBaseProperty = function(paraProp) {
            //直接填写方法内容
            setBaseProperty(paraProp);
        }
        this.iGetBaseProperty = function() {
            //直接填写方法内容
            return getBaseProperty();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.BaseProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.BaseProperty");
    }
})