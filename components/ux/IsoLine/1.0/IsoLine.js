Ext.define("vmd.ux.IsoLine", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.NumberInput$1.0$NumberInput", "vmd.ux.LineSeting$1.0$LineSeting", "vmd.ux.FieldFormlist$1.0$FieldFormlist"]),
    version: "1.0",
    xtype: "vmd.ux.IsoLine",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 290,
    height: 680,
    layout: "fit",
    beforerender: "IsoLine_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.IsoLine_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.IsoLine'
                }, ex, 50);
            }
        }
    },
    uxCss: ".text-input{    border: 1px solid #ddd;}",
    uxrequirecss: "[\"components/ux/linecolor/1.0/css/iconfont.css?ver=vmd2.0.5.200306\",\"components/ux/toptitle/1.0/css/iconfont.css?ver=vmd2.0.5.200306\"]",
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
            var wellData;

            function init(data) {
                //console.log(data)
                wellData = data;
                viewModel.bind(wellData)
                // 数据集列表绑定数据
                setStoreData();
                // 字段绑定组件绑定数据
                // vmd.taskRunner(function() {
                //     if (hwFieldFormlist.hwDiv) return true;
                // }, function() {
                hwFieldFormlist.bindData(wellData.dataMapping);
                // })
                if (wellData.dataMapping.dsType == '1') {
                    storeList.setDisabled(true);
                    hwFieldFormlist.setDisabled(true);
                }
            }

            function IsoLine_beforerender(sender) {
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
                storeList.store = store;
                storeList.valueField = 'id';
                storeList.displayField = 'id';
                storeList.dropDownFields = 'text';
                storeList.queryField = 'text';
                for (var i = 0; i < myStore.length; i++) {
                    //storeList.setValue(myStore[i].id);
                    if (myStore[i].id === (wellData && wellData.dataMapping.source)) {
                        storeList.setValue(wellData.dataMapping.source)
                    } else if (wellData.dataMapping.source === 'vmd-hwcharts-isoLine') {
                        storeList.setValue('')
                    }
                }
            }
            //获取可视化中定义的所有数据集
            function getDatasetNames() {
                var names = [];
                var storeRoot = xds.vmd.getRootNode("dataset");
                if (storeRoot) {
                    storeRoot.eachChild(function(item) {
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

            function storeList_selectChanged(sender, combo, record, index) {
                wellData.dataMapping.source = combo.value;
                hwFieldFormlist.bindData(wellData.dataMapping);
            }

            function hwRadioGroup_change(sender, checked) {
                if (hwRadioGroup.getValue() == '0') {
                    storeList.setDisabled(false);
                    hwFieldFormlist.setDisabled(false);
                } else if (hwRadioGroup.getValue() == '1') {
                    storeList.setDisabled(true);
                    hwFieldFormlist.setDisabled(true);
                }
            }

            function storeList_afterrender(sender) {
                // if(wellData.dataMapping.source === 'vmd-hwcharts-isoLine'){
                //     storeList.setValue('')
                // }
            }

            function hwRadioGroup_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.IsoLine',
                p2: ex.message
            }, ex, 100);
        }
        this.IsoLine_beforerender = IsoLine_beforerender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: false,
            height: 540,
            x: 0,
            y: 0,
            layout: "absolute",
            width: 290,
            items: [{
                    xtype: "checkbox",
                    id: "wellIsShow",
                    fieldLabel: "Checkbox",
                    boxLabel: "显示",
                    x: 10,
                    y: 10,
                    checked: true,
                    BindValue: "show",
                    Name: "seriesIsShow"
                },
                {
                    xtype: "checkbox",
                    id: "hwCheckboxEditable",
                    fieldLabel: "Checkbox",
                    boxLabel: "编辑",
                    x: 80,
                    y: 10,
                    checked: true,
                    hidden: true
                },
                {
                    xtype: "label",
                    id: "hwLabel",
                    text: "名称",
                    x: 10,
                    y: 45,
                    height: 20
                },
                {
                    xtype: "textfield",
                    id: "wellName",
                    allowBlank: true,
                    enableKeyEvents: true,
                    x: 60,
                    y: 40,
                    width: 210,
                    cls: "text-input",
                    BindValue: "nameText"
                },
                {
                    xtype: "label",
                    id: "hwLabel2",
                    text: "层级",
                    x: 10,
                    y: 80,
                    height: 20
                },
                {
                    xtype: "vmd.ux.NumberInput",
                    id: "wellZIndex",
                    layout: "auto",
                    x: 60,
                    y: 75,
                    width: 80,
                    BindValue: "z",
                    Name: "isOnRander"
                },
                {
                    xtype: "checkbox",
                    id: "hwCheckboxNonOverlap",
                    fieldLabel: "Checkbox",
                    boxLabel: "避让",
                    x: 160,
                    y: 10,
                    checked: true,
                    hidden: true
                },
                {
                    xtype: "panel",
                    id: "wellPanel",
                    title: "属性",
                    header: true,
                    border: true,
                    height: 90,
                    x: 0,
                    y: 120,
                    layout: "absolute",
                    items: [{
                        xtype: "vmd.ux.LineSeting",
                        id: "hwLineSeting",
                        layout: "fit",
                        x: 60,
                        y: 10,
                        width: 160,
                        BindValue: "lineStyle",
                        Name: "seriesPorperty"
                    }]
                },
                {
                    xtype: "panel",
                    id: "storPanel",
                    title: "数据",
                    header: true,
                    border: true,
                    height: 470,
                    x: 0,
                    y: 210,
                    layout: "absolute",
                    items: [{
                            xtype: "label",
                            id: "hwLabel3",
                            text: "数据集",
                            x: 10,
                            y: 55
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "storeList",
                            width: 180,
                            height: 270,
                            x: 70,
                            y: 50,
                            cls: "text-input",
                            BindValue: "dataMapping.source",
                            selectChanged: "storeList_selectChanged",
                            afterrender: "storeList_afterrender",
                            listeners: {
                                selectChanged: storeList_selectChanged,
                                vmdafterrender: storeList_afterrender
                            }
                        },
                        {
                            xtype: "label",
                            id: "hwLabel4",
                            text: "字段绑定",
                            x: 10,
                            y: 95
                        },
                        {
                            xtype: "vmd.ux.FieldFormlist",
                            id: "hwFieldFormlist",
                            layout: "absolute",
                            x: 70,
                            y: 90,
                            width: 220,
                            BindValue: "dataMapping.fields"
                        },
                        {
                            xtype: "radiostoregroup",
                            id: "hwRadioGroup",
                            width: 200,
                            height: 30,
                            labelField: "label",
                            valueField: "value",
                            checkedField: "checked",
                            boxFieldName: "myRadio",
                            x: 70,
                            y: 15,
                            BindValue: "dataMapping.dsType",
                            change: "hwRadioGroup_change",
                            afterrender: "hwRadioGroup_afterrender",
                            listeners: {
                                change: hwRadioGroup_change,
                                vmdafterrender: hwRadioGroup_afterrender
                            },
                            items: [{
                                    xtype: "radio",
                                    id: "hwRadioDs",
                                    boxLabel: "数据集",
                                    checked: true,
                                    inputValue: "0"
                                },
                                {
                                    xtype: "radio",
                                    id: "hwRadioMicroService",
                                    boxLabel: "微服务",
                                    inputValue: "1"
                                }
                            ]
                        },
                        {
                            xtype: "label",
                            id: "hwLabel5",
                            text: "数据来源",
                            x: 10,
                            y: 20
                        }
                    ]
                },
                {
                    xtype: "label",
                    id: "hwLabel1",
                    text: "样式",
                    x: 10,
                    y: 170,
                    height: 20
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.init = function(data) {
            //直接填写方法内容
            init(data)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.IsoLine");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.IsoLine");
    }
})