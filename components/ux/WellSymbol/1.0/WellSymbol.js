Ext.define("vmd.ux.WellSymbol", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.NumberInput$1.0$NumberInput", "vmd.ux.FieldFormlist$1.0$FieldFormlist", "vmd.ux.NumberInput$1.0$NumberInput"]),
    version: "1.0",
    xtype: "vmd.ux.WellSymbol",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 290,
    height: 790,
    layout: "fit",
    beforerender: "WellSymbol_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.WellSymbol_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.WellSymbol'
                }, ex, 50);
            }
        }
    },
    uxCss: ".text-input{    border: 1px solid #ddd;}",
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
                hwFieldFormlist.bindData(wellData.dataMapping);
                hwNumberInput.setDisabled(!wellData.isProgressive);
                hwNumberInput1.setDisabled(!wellData.isProgressive);
            }

            function WellSymbol_beforerender(sender) {
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
                    if (myStore[i].id === wellData && wellData.dataMapping.source) {
                        storeList.setValue(wellData.dataMapping.source)
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

            function showWellNo_check(sender, checked) {
                hwRadioGroupFilter.setDisabled(!checked);
                hwTextFilterPreChar.setDisabled(!checked);
                hwNumberInputFilterPreNum.setDisabled(!checked);
            }

            function storeList_selectChanged(sender, combo, record, index) {
                wellData.dataMapping.source = combo.value;
                hwFieldFormlist.bindData(wellData.dataMapping);
            }

            function hwRadioGroupFilter_change(sender, checked) {
                var a = 1;
            }

            function hwRadioChar_check(sender, checked) {
                hwTextFilterPreChar.setDisabled(!checked);
                hwNumberInputFilterPreNum.setDisabled(checked);
            }

            function hwRadioCharNum_check(sender, checked) {
                hwTextFilterPreChar.setDisabled(checked);
                hwNumberInputFilterPreNum.setDisabled(!checked);
            }

            function hwCheckbox_check(sender, checked) {
                hwNumberInput.setDisabled(!checked);
                hwNumberInput1.setDisabled(!checked);
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.WellSymbol',
                p2: ex.message
            }, ex, 100);
        }
        this.WellSymbol_beforerender = WellSymbol_beforerender;
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
                    x: 80,
                    y: 40,
                    width: 190,
                    cls: "text-input",
                    BindValue: "nameText"
                },
                {
                    xtype: "label",
                    id: "hwLabel1",
                    text: "井符号半径",
                    x: 10,
                    y: 80,
                    height: 20
                },
                {
                    xtype: "vmd.ux.NumberInput",
                    id: "symbolSize",
                    layout: "auto",
                    x: 80,
                    y: 75,
                    width: 70,
                    BindValue: "symbolSize",
                    Name: "seriesPorperty"
                },
                {
                    xtype: "label",
                    id: "hwLabel2",
                    text: "层级",
                    x: 170,
                    y: 80,
                    height: 20
                },
                {
                    xtype: "vmd.ux.NumberInput",
                    id: "wellZIndex",
                    layout: "auto",
                    x: 210,
                    y: 75,
                    width: 60,
                    BindValue: "z",
                    Name: "seriesPorperty"
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
                    title: "井号",
                    header: true,
                    border: true,
                    height: 140,
                    x: 0,
                    y: 120,
                    layout: "absolute",
                    items: [{
                            xtype: "checkbox",
                            id: "showWellNo",
                            fieldLabel: "Checkbox",
                            boxLabel: "显示",
                            x: 10,
                            y: 0,
                            checked: true,
                            BindValue: "label.show",
                            check: "showWellNo_check",
                            Name: "isOnRander",
                            listeners: {
                                check: showWellNo_check
                            }
                        },
                        {
                            xtype: "radiostoregroup",
                            id: "hwRadioGroupFilter",
                            width: 100,
                            height: 65,
                            labelField: "label",
                            valueField: "value",
                            checkedField: "checked",
                            boxFieldName: "myRadio",
                            x: 8,
                            y: 25,
                            BindValue: "filter.type",
                            Name: "isOnRander",
                            change: "hwRadioGroupFilter_change",
                            listeners: {
                                change: hwRadioGroupFilter_change
                            },
                            items: [{
                                    xtype: "radio",
                                    id: "hwRadioChar",
                                    boxLabel: "过滤前缀",
                                    y: 2,
                                    check: "hwRadioChar_check",
                                    inputValue: "char",
                                    listeners: {
                                        check: hwRadioChar_check
                                    }
                                },
                                {
                                    xtype: "radio",
                                    id: "hwRadioCharNum",
                                    boxLabel: "过滤前缀位数",
                                    y: 5,
                                    check: "hwRadioCharNum_check",
                                    inputValue: "charnum",
                                    listeners: {
                                        check: hwRadioCharNum_check
                                    }
                                }
                            ]
                        },
                        {
                            xtype: "textfield",
                            id: "hwTextFilterPreChar",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 110,
                            y: 25,
                            width: 160,
                            cls: "text-input",
                            BindValue: "filter.prefix",
                            Name: "isOnRander"
                        },
                        {
                            xtype: "vmd.ux.NumberInput",
                            id: "hwNumberInputFilterPreNum",
                            layout: "auto",
                            x: 110,
                            y: 62,
                            width: 160,
                            BindValue: "filter.preChars",
                            Name: "isOnRander"
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "storPanel",
                    title: "数据",
                    header: true,
                    border: true,
                    height: 370,
                    x: -1,
                    y: 410,
                    layout: "absolute",
                    items: [{
                            xtype: "label",
                            id: "hwLabel3",
                            text: "数据集",
                            x: 10,
                            y: 15
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "storeList",
                            width: 200,
                            height: 270,
                            x: 70,
                            y: 10,
                            cls: "text-input",
                            BindValue: "dataMapping.source",
                            selectChanged: "storeList_selectChanged",
                            listeners: {
                                selectChanged: storeList_selectChanged
                            }
                        },
                        {
                            xtype: "label",
                            id: "hwLabel4",
                            text: "字段绑定",
                            x: 10,
                            y: 55
                        },
                        {
                            xtype: "vmd.ux.FieldFormlist",
                            id: "hwFieldFormlist",
                            layout: "absolute",
                            x: 60,
                            y: 55,
                            width: 220,
                            BindValue: "dataMapping.fields"
                        }
                    ]
                },
                {
                    xtype: "checkbox",
                    id: "hwCheckboxShowLegend",
                    fieldLabel: "Checkbox",
                    boxLabel: "配置图例",
                    x: 80,
                    y: 10,
                    checked: true,
                    BindValue: "showLegend",
                    Name: "isOnRander"
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "渐进式加载",
                    header: true,
                    border: true,
                    height: 155,
                    x: 0,
                    y: 260,
                    layout: "absolute",
                    items: [{
                            xtype: "label",
                            id: "hwLabel6",
                            text: "启用阈值",
                            x: 10,
                            y: 40
                        },
                        {
                            xtype: "label",
                            id: "hwLabel7",
                            text: "单次加载数据量",
                            x: 10,
                            y: 75,
                            width: 50
                        },
                        {
                            xtype: "vmd.ux.NumberInput",
                            id: "hwNumberInput",
                            layout: "auto",
                            x: 70,
                            y: 35,
                            height: 30,
                            width: 100,
                            BindValue: "progressiveThreshold"
                        },
                        {
                            xtype: "vmd.ux.NumberInput",
                            id: "hwNumberInput1",
                            layout: "auto",
                            x: 70,
                            y: 75,
                            width: 100,
                            BindValue: "progressive"
                        },
                        {
                            xtype: "label",
                            id: "hwLabel8",
                            text: "超过此数据量时启用渐进式加载",
                            x: 180,
                            y: 40,
                            style: "color: red;font-size: 10px;",
                            width: 90
                        },
                        {
                            xtype: "checkbox",
                            id: "hwCheckbox",
                            fieldLabel: "Checkbox",
                            boxLabel: "启用",
                            x: 10,
                            y: 5,
                            BindValue: "isProgressive",
                            check: "hwCheckbox_check",
                            listeners: {
                                check: hwCheckbox_check
                            }
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
        this.init = function(data) {
            //直接填写方法内容
            init(data)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.WellSymbol");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.WellSymbol");
    }
})