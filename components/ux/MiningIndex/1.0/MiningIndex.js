Ext.define("vmd.ux.MiningIndex", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.NumberInput$1.0$NumberInput", "vmd.ux.FieldFormlist$1.0$FieldFormlist", "vmd.ux.FontSeting$1.0$FontSeting", "vmd.ux.AccordionTabs$1.0$AccordionTabs"]),
    version: "1.0",
    xtype: "vmd.ux.MiningIndex",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 280,
    height: 1000,
    layout: "fit",
    autoScroll: true,
    autoHeight: true,
    beforerender: "MiningIndex_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.MiningIndex_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.MiningIndex'
                }, ex, 50);
            }
        }
    },
    uxCss: ".text-input{    border: 1px solid #ddd;}",
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
            var page = this;
            var viewModel;
            var oriData = null;
            var miningIndexData;
            var sereis = null;

            function init(data) {
                //console.log(data);
                miningIndexData = data;
                viewModel.bind(miningIndexData)
                if (miningIndexData.indexs) {
                    series = miningIndexData.indexs[0].series;
                }
                // 数据集列表绑定数据
                setStoreData();
                hwAccordionTabs.initTabs(miningIndexData.dataMapping.source, miningIndexData.indexs)
                hwFieldFormlist.bindData(miningIndexData.dataMapping);
                hwNumberInput.setDisabled(!miningIndexData.isProgressive);
                hwNumberInput1.setDisabled(!miningIndexData.isProgressive);
            }

            function MiningIndex_beforerender(sender) {
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
                storeData.store = store;
                storeData.valueField = 'id';
                storeData.displayField = 'id';
                storeData.dropDownFields = 'text';
                storeData.queryField = 'text';
                for (var i = 0; i < myStore.length; i++) {
                    if (myStore[i].id === miningIndexData && miningIndexData.dataMapping.source) {
                        storeData.setValue(miningIndexData.dataMapping.source)
                    }
                }
            }

            function mingingType_afterrender(sender) {
                var datas = [{
                        id: '柱形开采指标',
                        text: '柱形开采指标'
                    },
                    {
                        id: '伞形开采指标',
                        text: '伞形开采指标'
                    },
                    // {
                    //     id: '水井伞形开采指标',
                    //     text: '水井伞形开采指标'
                    // }
                ];
                var store = new vmd.data.Store({
                    data: datas,
                    fields: ['id', 'text']
                })
                mingingType.store = store;
                mingingType.valueField = 'id';
                mingingType.displayField = 'text';
            }

            function mingingPos_afterrender(sender) {
                var datas = [{
                    id: '左',
                    text: '左'
                }, {
                    id: '右',
                    text: '右'
                }, {
                    id: '中',
                    text: '中'
                }, {
                    id: '上',
                    text: '上'
                }, {
                    id: '下',
                    text: '下'
                }, {
                    id: '左上',
                    text: '左上'
                }, {
                    id: '右上',
                    text: '右上'
                }];
                var store = new vmd.data.Store({
                    data: datas,
                    fields: ['id', 'text']
                })
                mingingPos.store = store;
                mingingPos.valueField = 'id';
                mingingPos.displayField = 'text';
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

            function storeData_selectChanged(sender, combo, record, index) {
                miningIndexData.dataMapping.source = combo.value;
                hwFieldFormlist.bindData(miningIndexData.dataMapping);
                hwAccordionTabs.initTabs(combo.value, miningIndexData.indexs)
            }

            function hwAccordionTabs_delIndex(sender, indexId) {
                if (miningIndexData.indexs.length === 1) {
                    vmd.alert('请至少保留一项指标')
                    return false;
                }
                Ext.Msg.confirm('提示', '确认删除该指标吗?', function(bnt) {
                    if (bnt === 'yes') {
                        for (var i = 0; i < miningIndexData.indexs.length; i++) {
                            if (miningIndexData.indexs[i].id === indexId) {
                                miningIndexData.indexs.splice(i, 1);
                                i--;
                            }
                        }
                        for (var i = 0; i < miningIndexData.indexs.length; i++) {
                            for (var j = 0; j < miningIndexData.indexs[i].series.indexs.length; j++) {
                                var m = miningIndexData.indexs[i].series.indexs[j]
                                if (m.id === indexId) {
                                    miningIndexData.indexs[i].series.indexs.splice(j, 1);
                                    j--;
                                }
                            }
                        }
                        hwAccordionTabs.initTabs(miningIndexData.dataMapping.source, miningIndexData.indexs);
                        xds.activePropPanel.fireEvent('DataValueChange', 'addLayer', 'null', miningIndexData, true)
                    }
                })
            }

            function addIndex_click(sender, e) {}

            function panel3_afterrender(sender) {
                var el = this.header.insertFirst({
                    tag: 'div',
                    cls: 'vmd-icon-plus',
                    style: 'position:absolute;right:20px'
                })
                el.on('click', function(e) {
                    stopPP(e)
                    Ext.Msg.confirm('提示', '确认新增指标?', function(bnt) {
                        if (bnt === 'yes') {
                            Ext.require([
                                'vmd.d.webchart.util.Index'
                            ], function() {
                                var newIndex = new vmd.d.webchart.util.Index(series, {
                                    "id": vmd.getGuid(),
                                    "field": "",
                                    "name": "新指标",
                                    "shortName": "",
                                    "company": "",
                                    "color": "rgb(255,255,255)",
                                    "isShow": true,
                                    "companyIsShow": false,
                                    "labelIsShow": false
                                });
                                miningIndexData.indexs.push(newIndex)
                                hwAccordionTabs.initTabs(miningIndexData.dataMapping.source, miningIndexData.indexs);
                                //xds.activePropPanel.fireEvent('DataValueChange', 'addLayer', 'null', miningIndexData, true)
                            })
                        }
                    })
                })
            }

            function hwAccordionTabs_nameChang(sender, index, value) {
                sender.items.items[index].setTitle(value)
            }

            function hwCheckbox_check(sender, checked) {
                hwNumberInput.setDisabled(!checked);
                hwNumberInput1.setDisabled(!checked);
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.MiningIndex',
                p2: ex.message
            }, ex, 100);
        }
        this.MiningIndex_beforerender = MiningIndex_beforerender;
        this.items = [{
            xtype: "panel",
            id: "panel2",
            title: "Panel",
            header: false,
            border: false,
            height: 1000,
            layout: "auto",
            autoHeight: true,
            autoScroll: true,
            items: [{
                    xtype: "panel",
                    id: "panel",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 158,
                    x: 0,
                    y: 0,
                    layout: "absolute",
                    width: 280,
                    items: [{
                            xtype: "checkbox",
                            id: "isShow",
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
                            id: "isEidt",
                            fieldLabel: "Checkbox",
                            boxLabel: "编辑",
                            x: 180,
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
                            id: "miningName",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 60,
                            y: 40,
                            width: 190,
                            cls: "text-input",
                            BindValue: "nameText"
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "mingingType",
                            width: 190,
                            height: 270,
                            x: 60,
                            y: 75,
                            cls: "text-input",
                            BindValue: "wellType",
                            afterrender: "mingingType_afterrender",
                            Name: "isOnRander",
                            listeners: {
                                vmdafterrender: mingingType_afterrender
                            }
                        },
                        {
                            xtype: "label",
                            id: "hwLabel1",
                            text: "类型",
                            x: 10,
                            y: 80,
                            height: 20
                        },
                        {
                            xtype: "vmd.ux.NumberInput",
                            id: "miningZ",
                            layout: "auto",
                            x: 175,
                            y: 115,
                            width: 70,
                            BindValue: "z",
                            Name: "isOnRander"
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "mingingPos",
                            width: 60,
                            height: 270,
                            x: 60,
                            y: 115,
                            cls: "text-input",
                            afterrender: "mingingPos_afterrender",
                            BindValue: "position",
                            Name: "isOnRander",
                            listeners: {
                                vmdafterrender: mingingPos_afterrender
                            }
                        },
                        {
                            xtype: "label",
                            id: "hwLabel2",
                            text: "相对井位位置",
                            x: 10,
                            y: 113,
                            height: 30,
                            width: 40
                        },
                        {
                            xtype: "label",
                            id: "hwLabel5",
                            text: "层级",
                            x: 140,
                            y: 120,
                            height: 20,
                            width: 40
                        },
                        {
                            xtype: "checkbox",
                            id: "isToopTip",
                            fieldLabel: "Checkbox",
                            boxLabel: "数据提示框",
                            x: 160,
                            y: 10,
                            checked: true,
                            BindValue: "toopTip.show"
                        },
                        {
                            xtype: "checkbox",
                            id: "hwCheckboxShowLegend",
                            fieldLabel: "Checkbox",
                            boxLabel: "配置图例",
                            x: 70,
                            y: 10,
                            checked: false,
                            BindValue: "showLegend",
                            Name: "isOnRander"
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel4",
                    title: "渐进式加载",
                    header: true,
                    border: true,
                    height: 155,
                    x: 0,
                    y: 160,
                    layout: "absolute",
                    width: 279,
                    items: [{
                            xtype: "label",
                            id: "hwLabel7",
                            text: "启用阈值",
                            x: 10,
                            y: 40
                        },
                        {
                            xtype: "vmd.ux.NumberInput",
                            id: "hwNumberInput",
                            layout: "auto",
                            x: 70,
                            y: 35,
                            width: 100,
                            BindValue: "progressiveThreshold"
                        },
                        {
                            xtype: "label",
                            id: "hwLabel8",
                            text: "单次加载数据量",
                            x: 10,
                            y: 75,
                            width: 50
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
                            id: "hwLabel9",
                            text: "超过此数据量时启用渐进式加载",
                            x: 180,
                            y: 40,
                            height: 30,
                            width: 90,
                            style: "font-size: 10px;    color: red;"
                        },
                        {
                            xtype: "checkbox",
                            id: "hwCheckbox",
                            fieldLabel: "Checkbox",
                            boxLabel: "启用",
                            x: 10,
                            y: 5,
                            check: "hwCheckbox_check",
                            listeners: {
                                check: hwCheckbox_check
                            }
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "storPanel",
                    title: "数据",
                    header: true,
                    border: true,
                    height: 172,
                    x: 0,
                    y: 310,
                    layout: "absolute",
                    width: 279,
                    items: [{
                            xtype: "label",
                            id: "hwLabel3",
                            text: "数据集",
                            x: 10,
                            y: 15
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "storeData",
                            width: 150,
                            height: 270,
                            x: 70,
                            y: 10,
                            cls: "text-input",
                            BindValue: "dataMapping.source",
                            selectChanged: "storeData_selectChanged",
                            listeners: {
                                selectChanged: storeData_selectChanged
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
                    xtype: "panel",
                    id: "panel3",
                    title: "指标",
                    header: true,
                    border: true,
                    height: 82,
                    width: 280,
                    layout: "absolute",
                    afterrender: "panel3_afterrender",
                    x: 0,
                    y: 480,
                    listeners: {
                        vmdafterrender: panel3_afterrender
                    },
                    items: [{
                            xtype: "vmd.ux.FontSeting",
                            id: "hwFontSeting",
                            layout: "fit",
                            fontStyleIsShow: true,
                            width: 220,
                            x: 60,
                            y: 5,
                            BindValue: "font",
                            Name: "isOnRander"
                        },
                        {
                            xtype: "label",
                            id: "hwLabel6",
                            text: "字体",
                            x: 10,
                            y: 10
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "指标",
                    header: false,
                    border: true,
                    height: 400,
                    x: 0,
                    y: 560,
                    layout: "fit",
                    autoScroll: true,
                    autoHeight: true,
                    items: [{
                        xtype: "vmd.ux.AccordionTabs",
                        id: "hwAccordionTabs",
                        layout: "auto",
                        width: 280,
                        height: 400,
                        delIndex: "hwAccordionTabs_delIndex",
                        nameChang: "hwAccordionTabs_nameChang",
                        listeners: {
                            delIndex: hwAccordionTabs_delIndex,
                            nameChang: hwAccordionTabs_nameChang
                        }
                    }]
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.MiningIndex");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.MiningIndex");
    }
})