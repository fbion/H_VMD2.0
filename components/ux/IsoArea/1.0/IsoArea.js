Ext.define("vmd.ux.IsoArea", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.NumberInput$1.0$NumberInput", "vmd.ux.CheckCombo$1.0$CheckCombo", "vmd.ux.FieldFormlist$1.0$FieldFormlist", "vmd.ux.AlignWebGroup$1.0$AlignWebGroup", "vmd.ux.VerticalWebGroup$1.0$VerticalWebGroup", "vmd.ux.NumberInput$1.0$NumberInput", "vmd.ux.SelectColor$1.0$SelectColor"]),
    version: "1.0",
    xtype: "vmd.ux.IsoArea",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 290,
    height: 620,
    layout: "fit",
    beforerender: "IsoArea_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.IsoArea_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.IsoArea'
                }, ex, 50);
            }
        }
    },
    uxCss: ".text-input{    border: 1px solid #ddd;}",
    uxrequirecss: "[\"components/ux/selectcolor/1.0/css/hwcharts.css?ver=vmd2.0.5.200306\"]",
    uxrequirejs: "[\"components/ux/selectcolor/1.0/js/chroma.js?ver=vmd2.0.5.200306\"]",
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
            var viewModel;
            var oriData = null;
            var seriesData;

            function panel_afterrender(sender) {}

            function init(data, allLayers) {
                // 20200317:
                //console.log(allLayers)
                seriesData = data;
                viewModel.bind(seriesData)
                // 数据集列表绑定数据
                setStoreData();
                // 字段绑定组件绑定数据
                // vmd.taskRunner(function() {
                //     if (hwFieldFormlist.hwDiv) return true;
                // }, function() {
                hwFieldFormlist.bindData(seriesData.dependentPorDasMapping);
                // })
                // vmd.taskRunner(function() {
                //     if (storeList) return true;
                // }, function() {
                var arr = []
                for (var i = 0; i < allLayers.length; i++) {
                    if (allLayers[i].type === 'wellSymbol') {
                        arr.push({
                            id: allLayers[i].name,
                            text: allLayers[i].nameText
                        })
                    }
                }
                storeList.loadData(arr);
                // })
            }

            function IsoArea_beforerender(sender) {
                //初始化
                viewModel = new vmd.base.ViewModel(page);
                //增加观察
                viewModel.addObserver();
                //实现接口
                viewModel.onValueChange = function(sender, newValue, vm) {
                    viewModel.set(sender.BindValue, newValue);
                    xds.activePropPanel.fireEvent('DataValueChange', sender, newValue, vm, true)
                }
            }
            // 数据赋值
            function setStoreData(data) {
                var myStore = getDatasetNames();
                var store = new vmd.data.Store({
                    data: myStore,
                    fields: ['id', 'text']
                })
                comlist.store = store;
                comlist.valueField = 'id';
                comlist.displayField = 'id';
                comlist.dropDownFields = 'text';
                comlist.queryField = 'text';
                for (var i = 0; i < myStore.length; i++) {
                    if (myStore[i].id === seriesData && seriesData.dependentPorDas) {
                        storeList.setValue(seriesData.dependentPorDas)
                    }
                }
            }
            //获取可视化中定义的所有数据集
            function getDatasetNames() {
                var names = [];
                var storeRoot = xds.vmd.getRootNode("dataset");
                if (storeRoot) {
                    storeRoot.eachChild(function(item) {
                        //console.log(xds.vmd.getStoreByDsName(item.id, true))
                        var obj = {
                            id: item.id,
                            text: item.id,
                            child: []
                        }
                        if (item.childNodes && item.childNodes.length > 0) {
                            item.childNodes.forEach(function(value, i) {
                                obj.child.push({
                                    id: value.text,
                                    text: value.text
                                })
                            })
                        }
                        names.push(obj)
                    }, this);
                }
                return names;
            }

            function comlist_selectChanged(sender, combo, record, index) {
                seriesData.dependentPorDasMapping.source = combo.value;
                hwFieldFormlist.bindData(seriesData.dependentPorDasMapping);
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.IsoArea',
                p2: ex.message
            }, ex, 100);
        }
        this.IsoArea_beforerender = IsoArea_beforerender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: false,
            height: 100,
            layout: "auto",
            items: [{
                    xtype: "panel",
                    id: "panel3",
                    title: "属性",
                    header: false,
                    border: false,
                    height: 120,
                    x: 0,
                    y: 0,
                    layout: "absolute",
                    bodyStyle: "border-bottom-color: #fff;",
                    afterrender: "panel_afterrender",
                    listeners: {
                        vmdafterrender: panel_afterrender
                    },
                    items: [{
                            xtype: "checkbox",
                            id: "IsoAreaShow",
                            fieldLabel: "Checkbox",
                            boxLabel: "显示",
                            x: 10,
                            y: 10,
                            checked: true,
                            Name: "seriesIsShow",
                            BindValue: "show"
                        },
                        {
                            xtype: "checkbox",
                            id: "IsoAreaEdit",
                            fieldLabel: "Checkbox",
                            boxLabel: "编辑",
                            x: 95,
                            y: 15,
                            checked: true,
                            hidden: true
                        },
                        {
                            xtype: "label",
                            id: "hwLabel",
                            text: "层级",
                            x: 10,
                            y: 85
                        },
                        {
                            xtype: "vmd.ux.NumberInput",
                            id: "IsoAreaZIndex",
                            layout: "auto",
                            x: 50,
                            y: 80,
                            width: 80,
                            BindValue: "z",
                            Name: "isOnRander"
                        },
                        {
                            xtype: "label",
                            id: "hwlable1",
                            text: "名称",
                            x: 10,
                            y: 45
                        },
                        {
                            xtype: "textfield",
                            id: "IsoAreaName",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 50,
                            y: 40,
                            width: 217,
                            cls: "text-input",
                            BindValue: "nameText"
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "数据",
                    header: true,
                    border: false,
                    height: 245,
                    x: 0,
                    y: 120,
                    layout: "absolute",
                    bodyStyle: "border-bottom-color: #fff;",
                    items: [{
                            xtype: "label",
                            id: "hwLabel2",
                            text: "关联井位",
                            x: 10,
                            y: 15,
                            height: 20,
                            width: 90
                        },
                        {
                            xtype: "vmd.ux.CheckCombo",
                            id: "storeList",
                            layout: "fit",
                            x: 90,
                            y: 10,
                            width: 170,
                            height: 28,
                            BindValue: "dependentWellName",
                            dataChange: "storeList_dataChange"
                        },
                        {
                            xtype: "label",
                            id: "hwLabel1",
                            text: "属性字段绑定",
                            x: 10,
                            y: 85,
                            height: 20,
                            width: 130
                        },
                        {
                            xtype: "label",
                            id: "hwLabel6",
                            text: "井属性数据集",
                            x: 10,
                            y: 50,
                            height: 20,
                            width: 90
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "comlist",
                            width: 170,
                            height: 270,
                            x: 90,
                            y: 50,
                            BindValue: "dependentPorDas",
                            cls: "text-input",
                            selectChanged: "comlist_selectChanged",
                            listeners: {
                                selectChanged: comlist_selectChanged
                            }
                        },
                        {
                            xtype: "vmd.ux.FieldFormlist",
                            id: "hwFieldFormlist",
                            layout: "absolute",
                            x: 60,
                            y: 110,
                            width: 230,
                            BindValue: "dependentPorDasMapping.fields"
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel2",
                    title: "色系",
                    header: true,
                    border: false,
                    height: 242,
                    x: 0,
                    y: 320,
                    layout: "absolute",
                    items: [{
                            xtype: "checkbox",
                            id: "ColorsShow",
                            fieldLabel: "Checkbox",
                            boxLabel: "显示",
                            x: 10,
                            y: 10,
                            checked: true,
                            BindValue: "visualMap.show",
                            hidden: true
                        },
                        {
                            xtype: "label",
                            id: "hwLabel3",
                            text: "位置",
                            x: 20,
                            y: 25
                        },
                        {
                            xtype: "vmd.ux.AlignWebGroup",
                            id: "hwAlignWebGroup",
                            layout: "fit",
                            x: 70,
                            y: 20,
                            width: 90,
                            BindValue: "visualMap.posHori",
                            hidenCenter: true,
                            Name: "proprty"
                        },
                        {
                            xtype: "vmd.ux.VerticalWebGroup",
                            id: "IsoAreaPosition",
                            layout: "fit",
                            x: 160,
                            y: 20,
                            width: 90,
                            BindValue: "visualMap.posVert",
                            hidenCenter: true,
                            Name: "proprty"
                        },
                        {
                            xtype: "label",
                            id: "hwLabel4",
                            text: "渐变间隔",
                            x: 20,
                            y: 165
                        },
                        {
                            xtype: "vmd.ux.NumberInput",
                            id: "Gradual",
                            layout: "auto",
                            x: 80,
                            y: 160,
                            width: 60,
                            BindValue: "dense",
                            Name: "seriesPorperty"
                        },
                        {
                            xtype: "label",
                            id: "hwLabel5",
                            text: "*建议10以下",
                            x: 150,
                            y: 166,
                            style: "color:red;",
                            height: 20
                        },
                        {
                            xtype: "vmd.ux.SelectColor",
                            id: "hwSelectColor",
                            ColorColumnWidth: 200,
                            ColorCodeWidth: 58,
                            ColorColumnLeft: 20,
                            layout: "border",
                            x: 0,
                            y: 50,
                            height: 100,
                            BindValue: "visualMap.chroma",
                            Name: "proprty"
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
        this.init = function(data, allLayers) {
            //直接填写方法内容
            init(data, allLayers)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.IsoArea");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.IsoArea");
    }
})