Ext.define('vmd.ux.layoutPanel.Controller', {
    xtype: 'vmd.ux.layoutPanel.Controller',
    constructor: function(options) {
        this.scope = options;
        this.displayMode = 'style1';
        this.isShowGrid = true;
        this.isShowForm = true;
        this.isShowNavigation = true;
        this.isShowOperation = true;
        this.isShowStatistics = true;
        this.dataSet = '';
        //记录数据集路径，以在变化时进行提示
        this.storeURL = ''
    },
    setValue: function(info) {
        // this.scope.preventListen = true;
        this.dataSet = info.dataSet;
        this.storeURL = info.storeURL;
        this.scope.dataSet.setValue(this.dataSet)
        this.displayMode = info.displayMode;
        this.isShowGrid = info.isShowGrid;
        this.isShowForm = info.isShowForm;
        this.isShowNavigation = info.isShowNavigation;
        this.isShowOperation = info.isShowOperation;
        this.isShowStatistics = info.isShowStatistics;
        if (info.displayMode == 'style1') {
            this.scope.style1.setValue(true);
        } else if (info.displayMode == 'style2') {
            this.scope.style2.setValue(true);
        }
        this.scope.isShowGrid.setValue(this.isShowGrid)
        this.scope.isShowForm.setValue(this.isShowForm)
        this.scope.isShowNavigation.setValue(this.isShowNavigation)
        this.scope.isShowOperation.setValue(this.isShowOperation)
        this.scope.isShowStatistics.setValue(this.isShowStatistics)
        // this.scope.preventListen = false;
    },
    serialize: function() {
        var json = {
            storeURL: this.storeURL,
            dataSet: this.dataSet,
            displayMode: this.displayMode,
            isShowGrid: this.isShowGrid,
            isShowForm: this.isShowForm,
            isShowNavigation: this.isShowNavigation,
            isShowOperation: this.isShowOperation,
            isShowStatistics: this.isShowStatistics
        }
        return json;
    }
})
// Ext.define('vmd.ux.layoutPanel.Controller', {
//     xtype: 'vmd.ux.layoutPanel.Controller',
//     constructor: function(scope) {
//         this.Scope = scope;
//         // this._initLayout();
//     },
//     //获取控件初始JSON
//     initializeParams_Get: function() {
//         var json = {
//             displayMode: 'style1',
//             isShowGrid: true,
//             isShowForm: true,
//             isShowNavigation: true,
//             isShowOperation: true,
//             isShowStatistics: true
//         }
//         return json;
//     },
//     initLayout: function() {
//         var me = this.Scope;
//         // me.hwRadio.setValue(true);
//         // me.hwCheckbox.setValue(true); //复选项-网格格式
//         //me.hwCheckbox1.setValue(true); //复选项-自由格式
//         // me.hwCheckbox2.setValue(true); //复选项-导航条
//         // me.hwCheckbox3.setValue(true); //复选项-编辑条
//         // me.hwCheckbox4.setValue(true); //复选项-操作栏  
//         me.hwRadio.name = '_layout';
//         me.hwRadio1.name = '_layout'
//         me.hwRadio2.name = '_layout';
//         me.hwRadio3.name = '_layout';
//         //me.hwImg.addClass('styleImageSelect');
//     },
//     setValue: function(configs) {
//         this.settingParams(configs);
//     },
//     settingParams: function(configs) {
//         var me = this.Scope;
//         try {
//             if (configs !== null && configs !== undefined) {
//                 //给显示复选框赋值
//                 me.hwCheckbox.setValue(configs.isShowGrid);
//                 me.hwCheckbox1.setValue(configs.isShowForm);
//                 me.hwCheckbox2.setValue(configs.isShowNavigation);
//                 me.hwCheckbox3.setValue(configs.isShowOperation);
//                 me.hwCheckbox4.setValue(configs.isShowStatistics);
//                 //给风格复选框赋值
//                 var mdisplayMode = configs.displayMode;
//                 switch (mdisplayMode) {
//                     case 'style1':
//                         {
//                             me.hwRadio.setValue(true);
//                             hwImg.addClass('styleImageSelect');
//                             break;
//                         }
//                     case 'style2':
//                         {
//                             me.hwRadio1.setValue(true);
//                             hwImg1.addClass('styleImageSelect');
//                             break;
//                         }
//                     case 'style3':
//                         {
//                             me.hwRadio2.setValue(true);
//                             hwImg2.addClass('styleImageSelect');
//                             break;
//                         }
//                     case 'style4':
//                         {
//                             me.hwRadio3.setValue(true);
//                             hwImg3.addClass('styleImageSelect');
//                             break;
//                         }
//                     default:
//                         {
//                             break;
//                         }
//                 }
//             }
//         } catch (ex2) {
//         }
//     },
//     serialize: function() {
//         var me = this.Scope;
//         var mdisplayMode = 'style1';
//         if (me.hwRadio1 !== undefined && me.hwCheckbox !== null) {
//             try {
//                 switch (true) {
//                     case me.hwRadio1.getValue():
//                         {
//                             mdisplayMode = 'style2'
//                             break;
//                         }
//                     case me.hwRadio2.getValue():
//                         {
//                             mdisplayMode = 'style3'
//                             break;
//                         }
//                     case me.hwRadio3.getValue():
//                         {
//                             mdisplayMode = 'style4'
//                             break;
//                         }
//                     default:
//                         {
//                             mdisplayMode = 'style1'
//                             break;
//                         }
//                 }
//             } catch (ex2) {}
//         }
//         return {
//             //返回对象
//             displayMode: mdisplayMode,
//             isShowGrid: me.hwCheckbox.getValue(),
//             isShowForm: me.hwCheckbox1.getValue(),
//             isShowNavigation: me.hwCheckbox2.getValue(),
//             isShowOperation: me.hwCheckbox3.getValue(),
//             isShowStatistics: me.hwCheckbox4.getValue()
//         }
//     },
//     //根据点击的图片，自动控制风格单选按钮的选中转改
//     onImagePanelClick: function(sender) {
//         var me = this.Scope;
//         try {
//             switch (sender) {
//                 case me.hwImg:
//                     {
//                         if (!me.hwRadio.getValue()) {
//                             me.hwRadio.setValue(true);
//                         }
//                         break;
//                     }
//                 case me.hwImg1:
//                     {
//                         if (!me.hwRadio1.getValue()) {
//                             me.hwRadio1.setValue(true);
//                         }
//                         break;
//                     }
//                 case me.hwImg2:
//                     {
//                         if (!me.hwRadio2.getValue()) {
//                             me.hwRadio2.setValue(true);
//                         }
//                         break;
//                     }
//                 case me.hwImg3:
//                     {
//                         if (!me.hwRadio3.getValue()) {
//                             me.hwRadio3.setValue(true);
//                         }
//                         break;
//                     }
//                 default:
//                     {
//                         break;
//                     }
//             }
//         } catch (ex2) {}
//     },
//     //根据风格选中状态，改变对应的图片样式
//     ChangeImageStyle: function(sender) {
//         var me = this.Scope;
//         if (sender == me.hwRadio) {
//             me.hwImg.addClass('styleImageSelect');
//         } else {
//             me.hwImg.removeClass('styleImageSelect');
//         }
//         if (sender == me.hwRadio1) {
//             me.hwImg1.addClass('styleImageSelect');
//         } else {
//             me.hwImg1.removeClass('styleImageSelect');
//         }
//         if (sender == me.hwRadio2) {
//             me.hwImg2.addClass('styleImageSelect');
//         } else {
//             me.hwImg2.removeClass('styleImageSelect');
//         }
//         if (sender == me.hwRadio3) {
//             me.hwImg3.addClass('styleImageSelect');
//         } else {
//             me.hwImg3.removeClass('styleImageSelect');
//         }
//     },
//     LayoutItemParamsGet: function(sender) {
//         var me = this.Scope;
//         var mName = "isShowGrid";
//         var mValue = true;
//         try {
//             switch (sender) {
//                 case me.hwCheckbox:
//                     {
//                         mName = "isShowGrid";
//                         mValue = sender.getValue();
//                         break;
//                     }
//                 case me.hwCheckbox1:
//                     {
//                         mName = "isShowForm";
//                         mValue = sender.getValue();
//                         break;
//                     }
//                 case me.hwCheckbox2:
//                     {
//                         mName = "isShowNavigation";
//                         mValue = sender.getValue();
//                         break;
//                     }
//                 case me.hwCheckbox3:
//                     {
//                         mName = "isShowOperation";
//                         mValue = sender.getValue();
//                         break;
//                     }
//                 case me.hwCheckbox4:
//                     {
//                         mName = "isShowStatistics";
//                         mValue = sender.getValue();
//                         break;
//                     }
//                 default:
//                     {
//                         break;
//                     }
//             }
//         } catch (ex2) {
//         }
//         return {
//             cname: mName,
//             cvalue: mValue
//         }
//     }
// })
Ext.define("vmd.ux.LayoutPanel", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.LayoutPanel",
    title: "Panel",
    header: false,
    border: false,
    width: 300,
    height: 603,
    layout: "border",
    afterrender: "LayoutPanel_afterrender",
    beforerender: "LayoutPanel_beforerender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.LayoutPanel_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.LayoutPanel'
                }, ex, 50);
            }
        },
        beforerender: function() {
            try {
                this.LayoutPanel_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.LayoutPanel'
                }, ex, 50);
            }
        }
    },
    uxCss: ".styleImageSelect{        border:2px solid #0E99F7   }",
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
            this.controller = new vmd.ux.layoutPanel.Controller(this);
            var page = this;
            var store1 = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['name', 'value']
            });
            var data1 = [];
            store1.loadData(data1);
            this.on('afterrender', function() {
                this.cascade(function(item) {
                    item.on('change', function(a, b, c) {
                        if (window.event)
                            changeAttribute(a, b);
                    })
                    item.on("check", function(a, b, c) {
                        if (window.event)
                            changeAttribute(a, b);
                    })
                    item.on("select", function(a, b, c) {
                        if (window.event) {
                            
                            if (typeof b == 'object') {
                                changeAttribute(a, b.json.name);
                            } else {
                                changeAttribute(a, b);
                            }
                        }
                    })
                })
            })

            function changeAttribute(a, b) {
                
                if (!page.stopBack) {
                    var inst = page.controller;
                    var id = a.initialConfig.id;
                    if (id.indexOf('style') > -1) {
                        changeStyle(id)
                    } else {
                        changeTab(inst, id, b)
                        page.fireEvent('settingChangedEvent')
                    };
                }
            }

            function changeTab(inst, id, value) {
                inst[id] = value;
                page.fireEvent('layoutItemVisibleChanged', null, {
                    cname: id,
                    cvalue: value
                })
            }

            function changeStyle(id) {
                page.stopBack = true;
                style1.setValue(false)
                style2.setValue(false)
                style3.setValue(false)
                style4.setValue(false)
                switch (id) {
                    case 'style1':
                        style1.setValue(true)
                        page.controller.displayMode = 'style1'
                        break;
                    case 'style2':
                        style2.setValue(true)
                        page.controller.displayMode = 'style2'
                        break;
                        // case 'style3':
                        //     style3.setValue(true)
                        //     page.controller.displayMode = 'style3'
                        //     break;
                        // case 'style4':
                        //     style4.setValue(true)
                        //     page.controller.displayMode = 'style4'
                        //     break;
                }
                page.fireEvent('settingChangedEvent')
                page.stopBack = false;
            }

            function p1_click(sender) {
                changeStyle('style2')
            }

            function p2_click(sender) {
                changeStyle('style1')
            }

            function p3_click(sender) {
                // changeStyle('style3')
            }

            function p4_click(sender) {
                // changeStyle('style4')
            }

            function setValue(info) {
                page.controller.setValue(info)
            }
            //控件初始化后
            function LayoutPanel_afterrender(sender) {}
            //控件初始化前
            function LayoutPanel_beforerender(sender) {}

            function dataSet_afterrender(sender) {
                dataSet.positionEl.on('click', function(e) {
                    var data1 = [];
                    var i = 0;
                    var storeRoot = xds.vmd.getRootNode("dataset");
                    if (typeof storeRoot != 'undefined') {
                        for (var i = 0; i < storeRoot.childNodes.length; i++) {
                            var cmp = storeRoot.childNodes[i].component
                            if (cmp.cid == "vmdDataSet") {
                                for (var j = 0; j < cmp.node.childNodes.length; j++) {
                                    var obj = {
                                        name: cmp.node.childNodes[j].id,
                                        value: cmp.node.childNodes[j].id
                                    }
                                    data1.push(obj);
                                }
                            } else {
                                var obj = {
                                    name: cmp.id,
                                    value: cmp.id
                                }
                                data1.push(obj);
                            }
                        }
                    }
                    store1.loadData(data1)
                })
            }

            function dataSet_beforerender(sender) {
                dataSet.store = store1;
                dataSet.displayField = 'name';
                dataSet.valueField = 'value'
            }

            function dataSet_selectChanged(sender, combo, record, index) {
                // if (dataSet.getValue() != '') {
                
                page.fireEvent('settingChangedEvent')
                page.rootScope.controller.comp.grid.settings.fields = [];
                page.rootScope.controller.comp.form.settings.fields = [];
                // }
            }

            function panel6_beforerender(sender) {}

            function style2_afterrender(sender) {}

            function style1_beforerender(sender) {
                style1.name = 'styleGroupName'
            }

            function style2_beforerender(sender) {
                style2.name = 'styleGroupName'
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.LayoutPanel',
                p2: ex.message
            }, ex, 100);
        }
        this.LayoutPanel_afterrender = LayoutPanel_afterrender;
        this.LayoutPanel_beforerender = LayoutPanel_beforerender;
        this.items = [{
                xtype: "panel",
                id: "panel",
                title: "Panel",
                header: false,
                border: true,
                height: 100,
                region: "center",
                layout: "border",
                items: [{
                        xtype: "panel",
                        id: "panel5",
                        title: "Panel",
                        header: false,
                        border: true,
                        height: 274,
                        layout: "absolute",
                        x: 0,
                        y: -6,
                        region: "north",
                        items: [{
                                xtype: "label",
                                id: "label",
                                text: "风格",
                                x: 10,
                                y: 10,
                                height: 10
                            },
                            {
                                xtype: "label",
                                id: "label1",
                                text: "———————————————————",
                                x: 50,
                                y: 10,
                                style: "color: #ddd;"
                            },
                            {
                                xtype: "radio",
                                id: "style1",
                                fieldLabel: "Radio",
                                boxLabel: "风格1",
                                x: 30,
                                y: 40,
                                checked: false,
                                beforerender: "style1_beforerender",
                                listeners: {
                                    beforerender: style1_beforerender
                                }
                            },
                            {
                                xtype: "radio",
                                id: "style2",
                                fieldLabel: "Radio",
                                boxLabel: "风格2",
                                x: 160,
                                y: 40,
                                afterrender: "style2_afterrender",
                                beforerender: "style2_beforerender",
                                listeners: {
                                    vmdafterrender: style2_afterrender,
                                    beforerender: style2_beforerender
                                }
                            },
                            {
                                xtype: "radio",
                                id: "style3",
                                fieldLabel: "Radio",
                                boxLabel: "风格3",
                                x: 30,
                                y: 160,
                                disabled: true
                            },
                            {
                                xtype: "radio",
                                id: "style4",
                                fieldLabel: "Radio",
                                boxLabel: "风格4",
                                x: 160,
                                y: 160,
                                disabled: true
                            },
                            {
                                xtype: "vmd.img",
                                id: "p1",
                                width: 90,
                                height: 80,
                                x: 180,
                                y: 70,
                                src: "{vmduxpath}/components/ux/layoutpanel/1.0/img/bbb.jpg",
                                click: "p1_click",
                                listeners: {
                                    click: p1_click
                                }
                            },
                            {
                                xtype: "vmd.img",
                                id: "p2",
                                width: 90,
                                height: 80,
                                x: 50,
                                y: 70,
                                src: "{vmduxpath}/components/ux/layoutpanel/1.0/img/aaa.jpg",
                                click: "p2_click",
                                listeners: {
                                    click: p2_click
                                }
                            },
                            {
                                xtype: "vmd.img",
                                id: "p3",
                                width: 90,
                                height: 80,
                                x: 50,
                                y: 190,
                                src: "{vmduxpath}/components/ux/layoutpanel/1.0/img/ccc.jpg",
                                click: "p3_click",
                                disabled: true,
                                listeners: {
                                    click: p3_click
                                }
                            },
                            {
                                xtype: "vmd.img",
                                id: "p4",
                                width: 90,
                                height: 80,
                                x: 180,
                                y: 190,
                                src: "{vmduxpath}/components/ux/layoutpanel/1.0/img/ddd.jpg",
                                click: "p4_click",
                                disabled: true,
                                listeners: {
                                    click: p4_click
                                }
                            }
                        ]
                    },
                    {
                        xtype: "panel",
                        id: "panel6",
                        title: "Panel",
                        header: false,
                        border: true,
                        height: 196,
                        y: 290,
                        x: 0,
                        layout: "absolute",
                        region: "center",
                        beforerender: "panel6_beforerender",
                        listeners: {
                            beforerender: panel6_beforerender
                        },
                        items: [{
                                xtype: "label",
                                id: "label2",
                                text: "显示",
                                x: 10,
                                y: 10
                            },
                            {
                                xtype: "label",
                                id: "label3",
                                text: "———————————————————",
                                x: 50,
                                y: 10,
                                style: "color: #ddd;"
                            },
                            {
                                xtype: "checkbox",
                                id: "isShowGrid",
                                boxLabel: "网格格式",
                                x: 40,
                                y: 40,
                                checked: true
                            },
                            {
                                xtype: "checkbox",
                                id: "isShowForm",
                                fieldLabel: "Checkbox",
                                boxLabel: "自由格式",
                                x: 40,
                                y: 70,
                                checked: true
                            },
                            {
                                xtype: "checkbox",
                                id: "isShowNavigation",
                                fieldLabel: "Checkbox",
                                boxLabel: "导航条",
                                x: 40,
                                y: 100,
                                checked: true
                            },
                            {
                                xtype: "checkbox",
                                id: "isShowOperation",
                                fieldLabel: "Checkbox",
                                boxLabel: "编辑条",
                                x: 40,
                                y: 130,
                                checked: true
                            },
                            {
                                xtype: "checkbox",
                                id: "isShowStatistics",
                                fieldLabel: "Checkbox",
                                boxLabel: "统计栏",
                                x: 40,
                                y: 160,
                                checked: true
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "div",
                layoutConfig: {
                    align: "middle",
                    pack: "start"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 290,
                height: 42,
                region: "north",
                layout: "hbox",
                items: [{
                        xtype: "label",
                        id: "label4",
                        text: "数据集：",
                        margins: "0 0 0 7"
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "dataSet",
                        width: 217,
                        height: 270,
                        margins: "10 0 0 5",
                        afterrender: "dataSet_afterrender",
                        beforerender: "dataSet_beforerender",
                        selectChanged: "dataSet_selectChanged",
                        listeners: {
                            vmdafterrender: dataSet_afterrender,
                            beforerender: dataSet_beforerender,
                            selectChanged: dataSet_selectChanged
                        }
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setValue = function(configs) {
            //直接填写方法内容
            
            setValue(configs);
        }
        this.serialize = function() {
            //直接填写方法内容
            return page.controller.serialize()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.LayoutPanel");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.LayoutPanel");
    }
})