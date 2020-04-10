Ext.define("vmd.ux.GraphProperty", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.BaseProperty$1.0$BaseProperty", "vmd.ux.VerticalTabs$1.0$VerticalTabs"]),
    version: "1.0",
    xtype: "vmd.ux.GraphProperty",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 320,
    height: 920,
    layout: "fit",
    autoScroll: false,
    beforerender: "GraphProperty_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.GraphProperty_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.GraphProperty'
                }, ex, 50);
            }
        }
    },
    uxrequirecss: "[\"components/ux/toptitle/1.0/css/iconfont.css?ver=vmd2.0.5.200306&ver=vmd2.0.7.200328\"]",
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
            var objGraph = null,
                layers = null,
                mychart = null;
            var page = this;

            function setMyCharts(chart) {
                mychart = chart;
            }

            function GraphProperty_beforerender(sender) {
                //增加模型值变化监听，通过子组件向外发送信息获得
                xds.activePropPanel = page;
                // scope：作用域，value：值；viewModel
                page.on('dataValueChange', function(scope, value, viewModel, seriesIndex) {
                    //可以增加逻辑处理
                    var obj = null;
                    var changeId = null;
                    if (scope.BindValue) {
                        obj = viewModel.props.serialize && viewModel.props.serialize(mychart.tpl);
                        if (viewModel.props.series) {
                            changeId = viewModel.props.series.name;
                        } else {
                            changeId = viewModel.props.name || viewModel.props.seriesName;
                        }
                    } else if (scope === 'addLayer') {
                        obj = viewModel.serialize(mychart.tpl);
                    }
                    if (obj) {
                        //如果是图层
                        if (seriesIndex) {
                            // 更新模板中序列信息
                            if (obj.series) {
                                mychart.tpl.series = obj.series
                                for (var i = 0; i < mychart.tpl.series.length; i++) {
                                    var id = mychart.tpl.series[i].name;
                                    // 根据当前序列是否显示图例，更新图例项数组
                                    updateLegend(id, mychart.tpl.series[i].showLegend);
                                    if (changeId && changeId === id) {
                                        var s = {
                                            name: id
                                        };
                                        if (scope.BindValue === 'nameText') {
                                            console.log(layermanger.getActive())
                                            layermanger.initTabs(layers, layermanger.getActive());
                                        } else if (scope.Name === 'seriesPorperty') {
                                            s[scope.BindValue] = value;
                                            mychart.setOption({
                                                series: [s]
                                            })
                                        } else if (scope.Name === "seriesIsShow") {
                                            mychart.seriesSelected[id] = value;
                                            mychart._api.dispatchAction({
                                                type: 'takeGlobalCursor'
                                            })
                                        } else if (scope.Name === "isOnRander") {
                                            xds.fireEvent('componentchanged');
                                        }
                                    }
                                }
                            }
                            // 色标
                            if (obj.visualMap) {
                                mychart.tpl.visualMap = obj.visualMap;
                                for (var i = 0; i < mychart.tpl.visualMap.length; i++) {
                                    if (changeId && changeId === mychart.tpl.visualMap[i].seriesName) {
                                        mychart.setOption({
                                            visualMap: [mychart.tpl.visualMap[i]]
                                        })
                                    }
                                }
                            }
                            // 更新模板中seriesMapping和dataset信息
                            if (obj.seriesMapping) {
                                mychart.tpl.seriesMapping = obj.seriesMapping;
                            }
                            // 更新模板中dataSet信息
                            if (obj.dataSet) {
                                mychart.tpl.dataset = obj.dataSet;
                            }
                            if (scope === 'addLayer') {
                                xds.fireEvent('componentchanged');
                            } else if (scope.BindValue && scope.BindValue.indexOf('dataMapping') == -1 &&
                                scope.BindValue.indexOf('dependent') == -1) {
                                // xds.fireEvent('componentchanged');
                            }
                        } else {
                            for (var key in obj) {
                                mychart.tpl[key] = obj[key]
                            }
                            mychart.setOption(obj);
                        }
                    }
                })
            }
            // 更新图例项
            function updateLegend(seriesName, ifShowLegend) {
                if (!mychart.tpl.legend.data) {
                    return;
                }
                // 当前序列显示图例,
                // ifShowLegend可能为null或undefined，因为有的序列没有这个属性，所以要判断是否为true或false
                if (ifShowLegend == true) {
                    var bExist = false;
                    for (var i = 0; i < mychart.tpl.legend.data.length; i++) {
                        // 
                        if (mychart.tpl.legend.data[i] == seriesName) {
                            // 已经存在，不再添加
                            bExist = true;
                            break;
                        }
                    }
                    // 如果不存在，就添加
                    if (!bExist) {
                        mychart.tpl.legend.data.push(seriesName);
                    }
                } else if (ifShowLegend == false) { // 当前序列不显示图例,ifShowLegend可能为null或undefined，因为有的序列没有这个属性
                    for (var i = 0; i < mychart.tpl.legend.data.length; i++) {
                        // 
                        if (mychart.tpl.legend.data[i] == seriesName) {
                            // 已经存在，就删除
                            mychart.tpl.legend.data.splice(i, 1);
                            break;
                        }
                    }
                }
            }

            function initProperties(chart) {
                // 动态加载数据存储结构对象
                Ext.require([
                    'vmd.d.webchart.util.Graph',
                    'vmd.d.webchart.util.Layer'
                ], function() {
                    mychart = chart;
                    var paramTempl = mychart.tpl;
                    objGraph = new vmd.d.webchart.util.Graph(paramTempl);
                    // 图层
                    objGraph.arrLayers = [];
                    layers = new vmd.d.webchart.util.Layer(paramTempl);
                    if (hwTabsProperty.getActiveTab().title === '图层') {
                        layermanger.initTabs(layers);
                    } else if (hwTabsProperty.getActiveTab().title === '基本属性') {
                        hwBaseProperty.iSetBaseProperty(objGraph);
                    }
                })
            }

            function layermanger_afterrender(sender) {
                // 20200310:响应代码放到Tab页的change事件中
                // 解析到对象后，从对象中提取数据初始化属性面板
                // var myStore = getDatasetNames();
                // vmd.taskRunner(function() {
                //     if (layers) return true;
                // }, function() {
                //     layermanger.initTabs(layers);
                // })
            }
            //获取可视化中定义的所有数据集
            function getDatasetNames() {
                var names = [];
                var storeRoot = xds.vmd.getRootNode("dataset");
                if (storeRoot) {
                    storeRoot.eachChild(function(item) {
                        var obj = {
                            id: item.attributes && item.attributes.id || item.id,
                            name: item.attributes && item.attributes.text || item.id,
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
            // 添加图层
            function layermanger_addClick(sender, panel, e) {
                addMenu.showAt(e.xy);
            }

            function addMenu_click(sender, menuItem, e) {
                var layerType = menuItem.initialConfig.id;
                var newLayer = layers.addLayer(mychart.tpl, layerType);
                var n = layers.allLayers.length - 1;
                layermanger.initTabs(layers, n);
                xds.activePropPanel.fireEvent('DataValueChange', 'addLayer', 'null', newLayer, true)
            }
            // 删除图层
            function layermanger_delSeries(sender, seriesId) {
                if (seriesId) {
                    for (var i = 0; i < mychart.tpl.series.length; i++) {
                        if (mychart.tpl.series[i].name === seriesId) {
                            mychart.tpl.series.splice(i, 1);
                            i--;
                        }
                    }
                    for (var i = 0; i < mychart.tpl.seriesMapping.length; i++) {
                        if (mychart.tpl.seriesMapping[i].seriesName === seriesId) {
                            mychart.tpl.seriesMapping.splice(i, 1);
                            i--;
                        }
                    }
                    if (mychart.tpl.visualMap) {
                        for (var i = 0; i < mychart.tpl.visualMap.length; i++) {
                            if (mychart.tpl.visualMap[i].seriesName === seriesId) {
                                mychart.tpl.visualMap.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    layers.delLayer(seriesId)
                    layermanger.initTabs(layers);
                    xds.fireEvent('componentchanged');
                }
            }

            function hwTabsProperty_tabchange(sender, tab) {
                if (tab.title === '图层') {
                    if (layers) {
                        layermanger.initTabs(layers);
                    }
                } else if (tab.title === '基本属性') {
                    if (objGraph) {
                        hwBaseProperty.iSetBaseProperty(objGraph);
                    }
                }
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.GraphProperty',
                p2: ex.message
            }, ex, 100);
        }
        this.GraphProperty_beforerender = GraphProperty_beforerender;
        this.items = [{
                xtype: "tabpanel",
                id: "hwTabsProperty",
                activeTab: 0,
                height: 920,
                width: 320,
                Name: "tabsProperty",
                tabchange: "hwTabsProperty_tabchange",
                activeItem: "panelTabBaseProperty",
                listeners: {
                    tabchange: hwTabsProperty_tabchange
                },
                items: [{
                        xtype: "panel",
                        id: "panelTabBaseProperty",
                        title: "基本属性",
                        header: true,
                        border: false,
                        height: 878,
                        width: 318,
                        autoScroll: true,
                        layout: "auto",
                        autoHeight: false,
                        items: [{
                            xtype: "vmd.ux.BaseProperty",
                            id: "hwBaseProperty",
                            layout: "absolute",
                            height: 881,
                            width: 308
                        }]
                    },
                    {
                        xtype: "panel",
                        id: "panelTabLayers",
                        title: "图层",
                        header: true,
                        border: true,
                        height: 100,
                        width: 318,
                        layout: "fit",
                        items: [{
                            xtype: "vmd.ux.VerticalTabs",
                            id: "layermanger",
                            layout: "fit",
                            afterrender: "layermanger_afterrender",
                            addClick: "layermanger_addClick",
                            delSeries: "layermanger_delSeries",
                            listeners: {
                                vmdafterrender: layermanger_afterrender,
                                addClick: layermanger_addClick,
                                delSeries: layermanger_delSeries
                            }
                        }]
                    }
                ]
            },
            {
                xtype: "vmd.menu",
                id: "addMenu",
                width: 120,
                hidden: true,
                floating: true,
                click: "addMenu_click",
                listeners: {
                    click: addMenu_click
                },
                items: [{
                        xtype: "menuitem",
                        id: "wellSymbol",
                        width: 120,
                        text: "井位图层",
                        hidden: false
                    },
                    {
                        xtype: "menuitem",
                        id: "wellLabel",
                        width: 120,
                        text: "井旁标注图层",
                        hidden: true
                    },
                    {
                        xtype: "menuitem",
                        id: "miningIndex",
                        width: 120,
                        text: "开采指标图层",
                        hidden: false
                    },
                    {
                        xtype: "menuitem",
                        id: "wellTrace",
                        width: 120,
                        text: "井轨迹图层",
                        hidden: true
                    },
                    {
                        xtype: "menuitem",
                        id: "symbolLine",
                        width: 120,
                        text: "边界图层",
                        hidden: true
                    },
                    {
                        xtype: "menuitem",
                        id: "isoLine",
                        width: 120,
                        text: "等值线图层",
                        hidden: true
                    },
                    {
                        xtype: "menuitem",
                        id: "isoArea",
                        width: 120,
                        text: "等值区图层",
                        hidden: true
                    },
                    {
                        xtype: "menuitem",
                        id: "area",
                        width: 120,
                        text: "面积图层",
                        hidden: true
                    },
                    {
                        xtype: "menuitem",
                        id: "faultLine",
                        width: 120,
                        text: "断层线图层",
                        hidden: true
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.init = function(chart) {
            //直接填写方法内容
            initProperties(chart);
        }
        this.setMyCharts = function(chart) {
            //直接填写方法内容
            setMyCharts(chart)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.GraphProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.GraphProperty");
    }
})