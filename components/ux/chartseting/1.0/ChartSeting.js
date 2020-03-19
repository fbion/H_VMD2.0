Ext.define('vmd.ux.chartSeting.Controller', {
    xtype: 'vmd.ux.chartSeting.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ChartSeting", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ChartTitle$1.0$ChartTitle", "vmd.ux.AxisTitle$1.0$AxisTitle", "vmd.ux.AxisSelf$1.0$AxisSelf", "vmd.ux.AxisTick$1.0$AxisTick", "vmd.ux.Axislable$1.0$Axislable", "vmd.ux.Legend$1.0$Legend", "vmd.ux.SeriesSelf$1.0$SeriesSelf", "vmd.ux.SeriesClass$1.0$SeriesClass", "vmd.ux.Serieslable$1.0$Serieslable", "vmd.ux.ChartTb$1.0$ChartTb", "vmd.ux.ChartBorder$1.0$ChartBorder", "vmd.ux.ToolTip$1.0$ToolTip"]),
    version: "1.0",
    xtype: "vmd.ux.ChartSeting",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 320,
    height: 1000,
    layout: "fit",
    autoScroll: true,
    uxCss: ".comlist-b{    border:1px solid #ddd;}.comlist-b input{    border:0;}.ext-el-mask {    background-color: #eee;    opacity: 0.5;}",
    uxrequirejs: "[\"components/ux/chartseting/1.0/js/defaultData.js\"]",
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
            var chartLengedName, vmdChart, mychart;
            var chartTitle, chartSeries, chartInfo, chartXAxis,
                chartYAxis, chartLenged, myAxis, oriTitle, AxisInfo, chartTooltip;
            var mySeries, myAxis, mySeriesInfo, myStore, selStore, myAxisInfo;
            var storeData = [],
                xAxisData = [],
                yAxisData = [];
            var titleText, lastlableFormat;
            // 标题相关变量
            var varAlignValue;
            this.on('afterrender', function() {
                this.cascade(function(item) {
                    item.on('change', function(a, b, c) {
                        if (a.xtype == "vmd.comlist" || !a.initialConfig) {
                            return
                        }
                        setCellInfo(a, b, c);
                    })
                    item.on("check", function(a, b, c) {
                        setCellInfo(a, b, c);
                    })
                    item.on("select", function(a, b, c) {
                        setCellInfo(a, b, c);
                    })
                })
            })
            // 属性设置
            function setCellInfo(a, b, c) {
                var activeTab = MyTabs.getActiveTab().title;
                switch (activeTab) {
                    case "标题":
                        setTitleProperty(a, b);
                        break;
                    case "坐标轴":
                        setAxisProperty(a, b, c);
                        break;
                    case "图例":
                        sethwLegend(a, b);
                        break;
                    case "序列":
                        setSeriesProperty(a, b);
                        break;
                    case "图表":
                        setChartProperty(a, b);
                        break;
                }
            };
            // 获取曲线对象数据
            function getChart(name, obj, itemEl) {
                if (obj) { // 接收到曲线对象
                    myStore = obj.getDatasetNames();
                    if (obj.clickChart) {
                        vmdChart = obj.clickChart.vmdChart;
                    } else {
                        vmdChart = obj.chart.vmdChart;
                    }
                    mychart = vmdChart.chart;
                    chartTitle = vmdChart.tplJSON.title || {};
                    vmd.util.applyIf(chartTitle, defaultTitle);
                    vmd.util.applyIf(chartTitle.style, defaultTitle.style);
                    chartSeries = vmdChart.tplJSON.series || [];
                    chartInfo = vmdChart.tplJSON.chart || {};
                    chartXAxis = vmdChart.tplJSON.xAxis || [];
                    chartYAxis = vmdChart.tplJSON.yAxis || [];
                    chartLenged = vmdChart.tplJSON.legend || {};
                    vmd.util.applyIf(chartLenged, defaultLegend);
                    chartTooltip = vmdChart.tplJSON.tooltip || {};
                    vmdChart.tplJSON.tooltip = chartTooltip;
                    chartTooltip.useHTML = true;
                    oriTitle = chartTitle.text;
                    if (!vmdChart.tplJSON.modules) {
                        vmdChart.tplJSON.modules = [];
                    }
                }
                if (name === "title") {
                    setTitleVaule();
                }
                if (name === "chart") {
                    if (MyTabs3.getActiveTab()) {
                        var activeTab = MyTabs3.getActiveTab().title;
                        switch (activeTab) {
                            case "图表":
                                setChartValue();
                                break;
                            case "边框背景":
                                setBroderAndBackground();
                                break;
                            case "数据提示框":
                                setTooltip();
                                break;
                        }
                    }
                }
                if (itemEl && name === "series") {
                    mySeries = itemEl;
                    var mySeriesId = mySeries.userOptions.id;
                    if (vmdChart.tplJSON.data.storeName) {
                        selStore = vmdChart.tplJSON.data.storeName;
                    }
                    for (var i = 0; i < chartSeries.length; i++) {
                        if (chartSeries[i].id == mySeriesId) {
                            vmd.util.applyIf(vmdChart.tplJSON.series[i], defaultSeries);
                            vmd.util.applyIf(vmdChart.tplJSON.series[i].dataLabels, defaultSeries.dataLabels);
                            vmd.util.applyIf(vmdChart.tplJSON.series[i].marker, defaultSeries.marker);
                            mySeriesInfo = chartSeries[i];
                            mySeriesInfo.name = mySeries.userOptions.name;
                            break
                        }
                    }
                    setLink(seriesComlist, getSeriesData(mychart.series), mySeriesId);
                    getXAxisData();
                    getYAxisData();
                    getStore();
                    setLink(seriesComlist, getSeriesData(mychart.series), mySeries.userOptions.id);
                    var activeTab = MyTabs2.getActiveTab().title;
                    switch (activeTab) {
                        case "序列":
                            setSeriesValue();
                            break;
                        case "分类属性":
                            setSeriesClassValue();;
                            break;
                        case "数据标注":
                            setSeriesDataLableValue();
                            break;
                    }
                }
                if (itemEl && name === "axis") {
                    myAxis = itemEl;
                    var myAxisId = myAxis.userOptions.id;
                    // 判断当坐标轴属于X轴还是Y轴
                    if (myAxis.coll === 'xAxis') {
                        var axisData = chartXAxis;
                    } else if (myAxis.coll === 'yAxis') {
                        var axisData = chartYAxis;
                    }
                    for (var i = 0; i < axisData.length; i++) {
                        if (axisData[i].id == myAxisId) {
                            myAxisInfo = axisData[i];
                            break
                        }
                    }
                    vmd.util.applyIf(myAxisInfo, defultAxis);
                    vmd.util.applyIf(myAxisInfo.labels, defultAxis.labels);
                    vmd.util.applyIf(myAxisInfo.title, defultAxis.title);
                    // 记录初始标题和标签格式
                    titleText = myAxisInfo.title.text;
                    lastlableFormat = myAxisInfo.labels.format;
                    setLink(axisComlist, getAxisData(mychart.axes), myAxisId);
                    var activeTab = MyTabs1.getActiveTab().title;
                    switch (activeTab) {
                        case "标题":
                            setAxisOriTitle();
                            break;
                        case "轴属性":
                            setAxisOriValue();
                            break;
                        case "刻度线":
                            setTickOriValue();
                            break;
                        case "标签":
                            setAxisLableOriValue();
                            break;
                    }
                }
            }
            // 切换tab触发曲线选中框变化
            function MyTabs_tabchange(sender, tab) {
                if (tab.title === "标题" && mychart) {
                    setTitleVaule();
                    var TitleData = mychart.title.element.getBBox(null, 0);
                    mychart.seleBorder.attr({
                        width: parseInt(TitleData.width) + 50,
                        height: parseInt(TitleData.height) + 10,
                        x: parseInt(TitleData.x) - 30,
                        y: parseInt(TitleData.y) - 5
                    })
                }
                if (tab.title === "图例" && mychart) {
                    setLegendVaule()
                    mychart.seleBorder.attr(mychart.legend.getBackRect())
                    mychart.seleBorder.attr({
                        visibility: 'visible',
                    })
                }
                if (tab.title === "图表" && mychart) {
                    mychart.seleBorder.attr(mychart.getBackRect());
                    if (MyTabs3.getActiveTab()) {
                        var activeTab = MyTabs3.getActiveTab().title;
                        switch (activeTab) {
                            case "图表":
                                setChartValue();
                                break;
                            case "边框背景":
                                setBroderAndBackground();
                                break;
                            case "数据提示框":
                                setTooltip();
                                break;
                        }
                    }
                }
                if (tab.title === "序列" && mychart) {
                    mychart.seleBorder.attr({
                        visibility: 'visible',
                        x: mychart.plotLeft,
                        y: mychart.plotTop,
                        width: mychart.plotWidth,
                        height: mychart.plotHeight
                    })
                    var mySeriesId = chartSeries[0].id;
                    mySeries = mychart.get(mySeriesId);
                    if (vmdChart.tplJSON.data.storeName) {
                        selStore = vmdChart.tplJSON.data.storeName;
                    }
                    vmd.util.applyIf(vmdChart.tplJSON.series[0], defaultSeries);
                    vmd.util.applyIf(vmdChart.tplJSON.series[0].dataLabels, defaultSeries.dataLabels);
                    vmd.util.applyIf(vmdChart.tplJSON.series[0].marker, defaultSeries.marker);
                    mySeriesInfo = chartSeries[0];
                    mySeriesInfo.name = mySeries.userOptions.name;
                    setLink(seriesComlist, getSeriesData(mychart.series), mySeriesId);
                    getXAxisData();
                    getYAxisData();
                    getStore();
                    setLink(seriesComlist, getSeriesData(mychart.series), mySeries.userOptions.id);
                    var activeTab = MyTabs2.getActiveTab().title;
                    switch (activeTab) {
                        case "序列":
                            setSeriesValue();
                            break;
                        case "分类属性":
                            setSeriesClassValue();;
                            break;
                        case "数据标注":
                            setSeriesDataLableValue();
                            break;
                    }
                }
                if (tab.title === "坐标轴" && mychart) {
                    var myAxisId = chartXAxis[0].id;
                    myAxis = mychart.get(myAxisId);
                    myAxisInfo = chartXAxis[0];
                    vmd.util.applyIf(myAxisInfo, defultAxis);
                    vmd.util.applyIf(myAxisInfo.labels, defultAxis.labels);
                    vmd.util.applyIf(myAxisInfo.title, defultAxis.title);
                    titleText = myAxisInfo.title.text;
                    lastlableFormat = myAxisInfo.labels.format;
                    setLink(axisComlist, getAxisData(mychart.axes), myAxisId);
                    var activeTab = MyTabs1.getActiveTab().title;
                    switch (activeTab) {
                        case "标题":
                            setAxisOriTitle();
                            break;
                        case "轴属性":
                            setAxisOriValue();
                            break;
                        case "刻度线":
                            setTickOriValue();
                            break;
                        case "标签":
                            setAxisLableOriValue();
                            break;
                    }
                    mychart.seleBorder.attr(myAxis.getBackRect());
                    // vmd.taskRunner(function() {
                    //     if (myAxis) return true;
                    // }, function() {})
                }
            }
            // 添加坐标轴列表
            function addBnt_click(sender, e) {
                var btnLeft = sender.el.getRegion().left;
                var btnTop = sender.el.getRegion().top;
                var btnHeight = sender.getHeight();
                addMenu.showAt([btnLeft - 20, btnTop + btnHeight - 5]);
            }
            // ////////////////////////////////////////   标题属性设置     //////////////////////////////////////////////
            function setTitleProperty(a, b) {
                if (a.initialConfig.id === "TitleText") {
                    mychart.setTitle({
                        text: b
                    });
                    chartTitle.text = b;
                } else if (a.initialConfig.id == "isFloat") {
                    // 浮动与垂直对齐方式关联
                    if (b) {
                        mychart.setTitle({
                            verticalAlign: varAlignValue
                        });
                        chartTitle.verticalAlign = varAlignValue;
                        hwChartTitle.ButtonGroup1.enable();
                    } else {
                        hwChartTitle.ButtonGroup1.disable();
                        mychart.setTitle({
                            verticalAlign: null
                        });
                        chartTitle.verticalAlign = null;
                        delete chartTitle.verticalAlign
                    }
                    mychart.setTitle({
                        floating: b
                    });
                    chartTitle.floating = b;
                }
                mychart.addTitleEventListener();
                var TitleData = mychart.title.element.getBBox(null, 0)
                mychart.seleBorder.attr({
                    width: parseInt(TitleData.width) + 50,
                    height: parseInt(TitleData.height) + 10,
                    x: parseInt(TitleData.x) - 30,
                    y: parseInt(TitleData.y) - 5
                })
            }
            // 标题水平偏移量
            function hwChartTitle_titleoffsetXChange(sender, value, describe) {
                mychart.setTitle({
                    x: value
                });
                chartTitle.x = value;
                chartTitle.x = value;
                mychart.addTitleEventListener();
                var TitleData = mychart.title.element.getBBox(null, 0)
                mychart.seleBorder.attr({
                    width: parseInt(TitleData.width) + 50,
                    height: parseInt(TitleData.height) + 10,
                    x: parseInt(TitleData.x) - 30,
                    y: parseInt(TitleData.y) - 5
                })
            }
            // 标题垂直偏移量
            function hwChartTitle_titleoffsetYChange(sender, value, describe) {
                mychart.setTitle({
                    y: value
                });
                chartTitle.y = value;
                var TitleData = mychart.title.element.getBBox(null, 0);
                mychart.addTitleEventListener();
                mychart.seleBorder.attr({
                    width: parseInt(TitleData.width) + 50,
                    height: parseInt(TitleData.height) + 10,
                    x: parseInt(TitleData.x) - 30,
                    y: parseInt(TitleData.y) - 5
                })
            }
            // 标题水平对齐方式
            function hwChartTitle_titleAlineChange(sender, align) {
                mychart.setTitle({
                    align: align
                });
                chartTitle.align = align;
                mychart.addTitleEventListener();
                var TitleData = mychart.title.element.getBBox(null, 0)
                mychart.seleBorder.attr({
                    width: parseInt(TitleData.width) + 10,
                    height: parseInt(TitleData.height) + 10,
                    x: parseInt(TitleData.x) - 5,
                    y: parseInt(TitleData.y) - 5
                })
            }
            // 标题垂直对齐方式
            function hwChartTitle_titleVerticalAlignChange(sender, verticalAlig) {
                mychart.setTitle({
                    verticalAlign: verticalAlig
                });
                chartTitle.verticalAlign = verticalAlig;
                varAlignValue = verticalAlig;
                mychart.addTitleEventListener();
                var TitleData = mychart.title.element.getBBox(null, 0)
                mychart.seleBorder.attr({
                    width: parseInt(TitleData.width) + 50,
                    height: parseInt(TitleData.height) + 10,
                    x: parseInt(TitleData.x) - 30,
                    y: parseInt(TitleData.y) - 5
                })
            }
            // 标题属性赋值
            function hwChartTitle_afterrender(sender) {
                vmd.taskRunner(function() {
                    if (chartTitle) return true;
                }, function() {
                    setTitleVaule();
                })
            }

            function setTitleVaule() {
                hwChartTitle.TitleText.setValue(chartTitle.text);
                hwChartTitle.offsetX.setOriValue(chartTitle.x)
                hwChartTitle.offsetY.setOriValue(chartTitle.y);
                hwChartTitle.isFloat.checked = chartTitle.floating;
                hwChartTitle.isFloat.setValue(chartTitle.floating);
                elementIsShow(hwChartTitle.ButtonGroup1, chartTitle.floating);
                var aligeIndex = 2;
                switch (chartTitle.align) {
                    case 'left':
                        aligeIndex = 1;
                        break;
                    case 'center':
                        aligeIndex = 2;
                        break;
                    case 'right':
                        aligeIndex = 3;
                        break;
                }
                hwChartTitle.ButtonGroup.setSelectIndex(aligeIndex);
                var verticalAlignIndex = 1;
                switch (chartTitle.verticalAlign) {
                    case 'top':
                        aligeIndex = 1;
                        break;
                    case 'middle':
                        aligeIndex = 2;
                        break;
                    case 'bottom':
                        aligeIndex = 3;
                        break;
                }
                hwChartTitle.ButtonGroup1.setSelectIndex(verticalAlignIndex);
            }
            // //////////////////////////////////////////////  数据提示框 //////////////////////////////////////////////
            function setHwTooltip(a, b) {
                if (a.initialConfig.id == "crosshairEable") {} else if (a.initialConfig.id == "tooltipEable") {
                    mychart.update({
                        tooltip: {
                            enabled: b,
                            useHTML: true,
                        }
                    });
                    chartTooltip.enabled = b;
                } else if (a.initialConfig.id == "isShared") {
                    mychart.update({
                        tooltip: {
                            shared: b
                        }
                    });
                    chartTooltip.shared = b;
                } else if (a.initialConfig.id == "xDateFormat") {
                    if (b.id != null) {
                        b = date_replace_dateFormat(hwToolTip.xDateFormat.getValue());
                    }
                    mychart.update({
                        tooltip: {
                            xDateFormat: b,
                            dateTimeLabelFormats: {
                                millisecond: b,
                                second: b,
                                minute: b,
                                hour: b,
                                day: b,
                                week: b,
                                month: b,
                                year: b
                            }
                        }
                    })
                    chartTooltip.xDateFormat = b;
                    chartTooltip.dateTimeLabelFormats = {
                        millisecond: b,
                        second: b,
                        minute: b,
                        hour: b,
                        day: b,
                        week: b,
                        month: b,
                        year: b
                    }
                } else if (a.initialConfig.id == "valueSuffix") {
                    mychart.update({
                        tooltip: {
                            valueSuffix: b
                        }
                    });
                    chartTooltip.valueSuffix = b;
                } else if (a.initialConfig.id == "valuePrefix") {
                    mychart.update({
                        tooltip: {
                            valuePrefix: b
                        }
                    });
                    chartTooltip.valuePrefix = b;
                }
            }
            // 数据提示框小数位数设置
            function hwToolTip_valueDecimalsChange(sender, value) {
                mychart.update({
                    tooltip: {
                        valueDecimals: value
                    }
                });
                chartTooltip.valueDecimals = value;
            }

            function setTooltip() {
                hwToolTip.tooltipEable.checked = chartTooltip.enabled || true;
                hwToolTip.tooltipEable.setValue(chartTooltip.enabled || true);
                hwToolTip.isShared.checked = chartTooltip.shared || false;
                hwToolTip.isShared.setValue(chartTooltip.shared || false);
                hwToolTip.valueDecimals.setOriValue(chartTooltip.valueDecimals || '');
                hwToolTip.valuePrefix.setValue(chartTooltip.valuePrefix || '');
                hwToolTip.valueSuffix.setValue(chartTooltip.valueSuffix || '');
                hwToolTip.xDateFormat.setValue(dateFormat_replace_date(chartTooltip.xDateFormat));
            }
            // //////////////////////////////////////////////  图例属性设置 //////////////////////////////////////////////
            function sethwLegend(a, b) {
                if (a.initialConfig.id == "isFloat") {
                    mychart.update({
                        legend: {
                            floating: b
                        }
                    });
                    chartLenged.floating = b;
                    mychart.seleBorder.attr(mychart.legend.getBackRect());
                    mychart.addLegendEventListener();
                } else if (a.initialConfig.id == "isReversed") {
                    mychart.update({
                        legend: {
                            reversed: b
                        }
                    });
                    chartLenged.reversed = b;
                    mychart.addLegendEventListener();
                } else if (a.initialConfig.id == "isDrag") {
                    mychart.update({
                        legend: {
                            draging: b
                        }
                    });
                    chartLenged.draging = b;
                    mychart.addLegendEventListener();
                } else if (a.initialConfig.id == "lebendIsShow") {
                    mychart.update({
                        legend: {
                            enabled: b
                        }
                    });
                    chartLenged.enabled = b;
                    //elementIsShow(hwLegend, b);
                    mychart.addLegendEventListener();
                }
            }
            // 图例水平偏移量
            function hwLegend_legendoffsetXChange(sender, value, describe) {
                mychart.update({
                    legend: {
                        x: value
                    }
                });
                chartLenged.x = value;
                mychart.seleBorder.attr(mychart.legend.getBackRect());
                mychart.addLegendEventListener();
            }
            // 图例垂直偏移量
            function hwLegend_legendoffsetYChange(sender, value, describe) {
                mychart.update({
                    legend: {
                        y: value
                    }
                });
                chartLenged.y = value;
                mychart.seleBorder.attr(mychart.legend.getBackRect());
                mychart.addLegendEventListener();
            }
            // 图例宽度
            function hwLegend_legendWidthChange(sender, value, describe) {
                mychart.update({
                    legend: {
                        width: value
                    }
                });
                chartLenged.width = value;
                mychart.seleBorder.attr(mychart.legend.getBackRect());
                mychart.addLegendEventListener();
            }
            // 图例项宽度
            function hwLegend_legendItemWidthChange(sender, value, describe) {
                mychart.update({
                    legend: {
                        itemWidth: value
                    }
                });
                chartLenged.itemWidth = value;
                mychart.seleBorder.attr(mychart.legend.getBackRect());
                mychart.addLegendEventListener();
            }
            // 图例内边距
            function hwLegend_legPaddingChange(sender, value, describe) {
                mychart.update({
                    legend: {
                        padding: value
                    }
                });
                chartLenged.padding = value;
                mychart.seleBorder.attr(mychart.legend.getBackRect());
                mychart.addLegendEventListener();
            }
            // 图例外边距
            function hwLegend_legMarginChange(sender, value, describe) {
                mychart.update({
                    legend: {
                        margin: value
                    }
                });
                chartLenged.margin = value;
                mychart.seleBorder.attr(mychart.legend.getBackRect());
                mychart.addLegendEventListener();
            }
            // 图例排列类型设置
            function hwLegend_legendLoyoutChange(sender, layout) {
                mychart.update({
                    legend: {
                        layout: layout
                    }
                });
                chartLenged.layout = layout;
                mychart.seleBorder.attr(mychart.legend.getBackRect());
                mychart.addLegendEventListener();
            }
            // 图例水平对齐方式设置
            function hwLegend_legendAlineChange(sender, align) {
                mychart.update({
                    legend: {
                        align: align
                    }
                });
                chartLenged.align = align;
                mychart.seleBorder.attr(mychart.legend.getBackRect());
                mychart.addLegendEventListener();
            }
            // 图例垂直对齐方式
            function hwLegend_legendVerticalAlignChange(sender, verticalAlign) {
                mychart.update({
                    legend: {
                        verticalAlign: verticalAlign
                    }
                });
                chartLenged.verticalAlign = verticalAlign;
                mychart.seleBorder.attr(mychart.legend.getBackRect());
                mychart.addLegendEventListener();
            }
            // 图例初始值设置
            function hwLegend_afterrender(sender) {
                vmd.taskRunner(function() {
                    if (chartLenged) return true;
                }, function() {
                    setLegendVaule();
                })
            }

            function setLegendVaule() {
                hwLegend.offsetX.setOriValue(chartLenged.x);
                hwLegend.offsetY.setOriValue(chartLenged.y);
                hwLegend.legPadding.setOriValue(chartLenged.padding);
                hwLegend.legMargin.setOriValue(chartLenged.margin);
                hwLegend.isFloat.checked = chartLenged.floating;
                hwLegend.isFloat.setValue(chartLenged.floating);
                hwLegend.isDrag.checked = chartLenged.draging;
                hwLegend.isDrag.setValue(chartLenged.draging);
                hwLegend.lebendIsShow.checked = chartLenged.enabled;
                hwLegend.lebendIsShow.setValue(chartLenged.enabled);
                hwLegend.isReversed.checked = chartLenged.reversed;
                hwLegend.isReversed.setValue(chartLenged.reversed);
                hwLegend.legendWidth.setOriValue(chartLenged.width);
                hwLegend.legendItemWidth.setOriValue(chartLenged.itemWidth);
                var aligeIndex = 2;
                switch (chartLenged.align) {
                    case 'left':
                        aligeIndex = 1;
                        break;
                    case 'center':
                        aligeIndex = 2;
                        break;
                    case 'right':
                        aligeIndex = 3;
                        break;
                }
                hwLegend.hwButtonGroup1.setSelectIndex(aligeIndex);
                var varAlignIndex = 2;
                switch (chartLenged.align) {
                    case 'top':
                        varAlignIndex = 1;
                        break;
                    case 'middle':
                        varAlignIndex = 2;
                        break;
                    case 'bottom':
                        varAlignIndex = 3;
                        break;
                }
                hwLegend.hwButtonGroup3.setSelectIndex(varAlignIndex);
                var laoutIndex = 1;
                switch (chartLenged.layout) {
                    case 'horizontal':
                        varAlignIndex = 1;
                        break;
                    case 'vertical':
                        varAlignIndex = 2;
                        break;
                }
                hwLegend.hwButtonGroup.setSelectIndex(laoutIndex);
            }
            // //////////////////////////////////////////////  图表属性设置 //////////////////////////////////////////////
            function setChartProperty(a, b) {
                if (a.initialConfig.id === "isWidth") {
                    if (!b) {
                        hwChartTb.chartWidth.disable();
                        hwChartTb.chartWidth.setOriValue("");
                        mychart.setSize(null);
                        delete chartInfo.width;
                    } else {
                        hwChartTb.chartWidth.enable();
                    }
                } else if (a.initialConfig.id === "isHeight") {
                    if (!b) {
                        hwChartTb.chartHeight.disable();
                        hwChartTb.chartHeight.setOriValue("");
                        mychart.setSize(chartInfo.width, null);
                        delete chartInfo.height;
                    } else {
                        hwChartTb.chartHeight.enable();
                    }
                } else if (a.initialConfig.id === "isTop") {
                    if (!b) {
                        hwChartTb.topMargin.disable();
                        hwChartTb.topMargin.setOriValue("");
                        mychart.update({
                            chart: {
                                marginTop: null
                            },
                        });
                        delete chartInfo.marginTop;
                    } else {
                        hwChartTb.topMargin.enable();
                    }
                } else if (a.initialConfig.id === "isBottom") {
                    if (!b) {
                        hwChartTb.bottomMargin.disable();
                        hwChartTb.bottomMargin.setOriValue("");
                        mychart.update({
                            chart: {
                                marginBottom: null
                            },
                        });
                        delete chartInfo.marginBottom;
                    } else {
                        hwChartTb.bottomMargin.enable();
                    }
                } else if (a.initialConfig.id === "isLeft") {
                    if (!b) {
                        hwChartTb.leftMargin.disable();
                        hwChartTb.leftMargin.setOriValue("");
                        mychart.update({
                            chart: {
                                marginLeft: null
                            },
                        });
                        delete chartInfo.marginLeft;
                    } else {
                        hwChartTb.leftMargin.enable();
                    }
                } else if (a.initialConfig.id === "isRight") {
                    if (!b) {
                        hwChartTb.rightMargin.disable();
                        hwChartTb.rightMargin.setOriValue("");
                        mychart.update({
                            chart: {
                                marginRight: null
                            },
                        });
                        delete chartInfo.marginRight;
                    } else {
                        hwChartTb.rightMargin.enable();
                    }
                } else if (a.initialConfig.id === "zoomType") {
                    mychart.update({
                        chart: {
                            zoomType: b.id
                        }
                    });
                    chartInfo.zoomType = b.id;
                } else if (a.initialConfig.id == "isInverted") {
                    mychart.update({
                        chart: {
                            inverted: b
                        },
                    });
                    chartInfo.inverted = b;
                    mychart.addChartEventListener();
                } else if (a.initialConfig.id == "isPolar") {
                    mychart.update({
                        chart: {
                            polar: b
                        },
                    });
                    chartInfo.polar = b;
                    mychart.addChartEventListener();
                } else if (a.initialConfig.id == "imgexport") {
                    isModults(b, 'imgexport')
                } else if (a.initialConfig.id == "dataviews") {
                    isModults(b, 'dataviews')
                } else if (a.initialConfig.id == "dataExtract") {
                    isModults(b, 'dataExtract')
                } else if (a.initialConfig.id == "navigator") {
                    vmdChart.tplJSON.hasNavigator = b;
                } else if (a.initialConfig.id == "setProperty") {
                    isModults(b, 'setProperty')
                } else if (a.initialConfig.id == "fitting") {
                    isModults(b, 'fitting')
                } else if (a.initialConfig.id == "zoomData") {
                    isModults(b, 'zoomData')
                } else if (a.initialConfig.id == "tbOpacity") {
                    mychart.update({
                        chart: {
                            backgroundOpacity: b.id
                        }
                    });
                    chartInfo.backgroundOpacity = b.id;
                } else if (a.initialConfig.id == "htOpacity") {
                    mychart.update({
                        chart: {
                            plotBackgroundOpacity: b.id
                        }
                    });
                    chartInfo.plotBackgroundOpacity = b.id;
                } else if (a.initialConfig.id == "showTbBroder") {
                    elementIsShow(hwChartBorder.tbBorder, b);
                    mychart.update({
                        chart: {
                            borderEnabled: b,
                        }
                    });
                    chartInfo.borderEnabled = b;
                } else if (a.initialConfig.id == "showHtBorder") {
                    elementIsShow(hwChartBorder.htBorder, b);
                    mychart.update({
                        chart: {
                            plotBorderEnabled: b,
                        }
                    });
                    chartInfo.plotBorderEnabled = b;
                }
                setHwTooltip(a, b);
            }
            // 图表宽度
            function hwChartTb_chartWidthChange(sender, value, describe) {
                if (isNaN(parseFloat(value))) {
                    mychart.update({
                        chart: {
                            width: null
                        }
                    });
                    delete chartInfo.width;
                } else {
                    mychart.update({
                        chart: {
                            width: value
                        }
                    });
                    chartInfo.width = value;
                }
                mychart.seleBorder.attr(mychart.getBackRect());
            }
            // 图表高度
            function hwChartTb_chartHeightChange(sender, value, describe) {
                if (isNaN(parseFloat(value))) {
                    mychart.update({
                        chart: {
                            height: null
                        }
                    });
                    delete chartInfo.height;
                } else {
                    mychart.update({
                        chart: {
                            height: value
                        }
                    });
                    chartInfo.height = value;
                }
                mychart.seleBorder.attr(mychart.getBackRect());
            }

            function hwChartTb_chartSpacingChange(sender, value, describe) {
                chartInfo.axisSpacing = parseFloat(value);
            }

            function hwChartTb_chartminHeightChange(sender, value, describe) {
                chartInfo.minHeight = parseFloat(value) || 200;
            }
            // 图表上边距
            function hwChartTb_chartTopMarginChange(sender, value, describe) {
                if (isNaN(parseFloat(value))) {
                    mychart.update({
                        chart: {
                            marginTop: null
                        },
                    });
                    delete chartInfo.marginTop;
                } else {
                    mychart.update({
                        chart: {
                            marginTop: value
                        }
                    });
                    chartInfo.marginTop = value;
                }
                mychart.seleBorder.attr(mychart.getBackRect());
            }
            // 图表下边距
            function hwChartTb_chartBottomMarginChange(sender, value, describe) {
                if (isNaN(parseFloat(value))) {
                    mychart.update({
                        chart: {
                            marginBottom: null
                        }
                    })
                    delete chartInfo.marginBottom;
                } else {
                    mychart.update({
                        chart: {
                            marginBottom: value
                        }
                    })
                    chartInfo.marginBottom = value;
                }
                mychart.seleBorder.attr(mychart.getBackRect());
            }
            // 图表左边距
            function hwChartTb_chartLeftMarginChange(sender, value, describe) {
                if (isNaN(parseFloat(value))) {
                    mychart.update({
                        chart: {
                            marginLeft: null
                        }
                    })
                    delete chartInfo.marginLeft;
                } else {
                    mychart.update({
                        chart: {
                            marginLeft: value
                        }
                    })
                    chartInfo.marginLeft = value;
                }
                mychart.seleBorder.attr(mychart.getBackRect());
            }
            // 图表右边距
            function hwChartTb_chartRightMarginChange(sender, value, describe) {
                if (isNaN(parseFloat(value))) {
                    mychart.update({
                        chart: {
                            marginRight: null
                        }
                    })
                    delete chartInfo.marginRight;
                } else {
                    mychart.update({
                        chart: {
                            marginRight: value
                        }
                    })
                    chartInfo.marginRight = value;
                }
                mychart.seleBorder.attr(mychart.getBackRect());
            }
            // 运行模式下模块
            function isModults(Bool, value) {
                if (Bool) {
                    vmdChart.tplJSON.modules.push(value)
                } else {
                    vmdChart.tplJSON.modules.splice(vmdChart.tplJSON.modules.indexOf(value), 1);
                }
            }
            // 判断导出及数据查看是否可用
            function isModlut(obj, item) {
                var isShow = false
                if (!obj) {
                    return isShow
                }
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i] == item) {
                        isShow = true
                        break
                    }
                }
                return isShow;
            }

            function setChartValue() {
                hwChartTb.zoomType.setValue(chartInfo.zoomType)
                if (chartInfo.width) {
                    hwChartTb.isWidth.checked = true;
                    hwChartTb.isWidth.setValue(true);
                    hwChartTb.chartWidth.enable();
                    hwChartTb.chartWidth.setOriValue(chartInfo.width);
                } else {
                    hwChartTb.isWidth.checked = false;
                    hwChartTb.isWidth.setValue(false);
                    hwChartTb.chartWidth.disable();
                    hwChartTb.chartWidth.setOriValue('');
                }
                if (chartInfo.height) {
                    hwChartTb.isHeight.checked = true;
                    hwChartTb.isHeight.setValue(true);
                    hwChartTb.chartHeight.enable();
                    hwChartTb.chartHeight.setOriValue(chartInfo.height);
                } else {
                    hwChartTb.isHeight.checked = false;
                    hwChartTb.isHeight.setValue(false);
                    hwChartTb.chartHeight.disable();
                    hwChartTb.chartHeight.setOriValue('');
                }
                if (chartInfo.marginTop) {
                    hwChartTb.isTop.checked = true;
                    hwChartTb.isTop.setValue(true);
                    hwChartTb.topMargin.enable();
                    hwChartTb.topMargin.setOriValue(chartInfo.marginTop);
                } else {
                    hwChartTb.isTop.checked = false;
                    hwChartTb.isTop.setValue(false);
                    hwChartTb.topMargin.disable();
                    hwChartTb.topMargin.setOriValue('');
                }
                if (chartInfo.marginBottom) {
                    hwChartTb.isBottom.checked = true;
                    hwChartTb.isBottom.setValue(true);
                    hwChartTb.bottomMargin.enable();
                    hwChartTb.bottomMargin.setOriValue(chartInfo.marginBottom);
                } else {
                    hwChartTb.isBottom.checked = false;
                    hwChartTb.isBottom.setValue(false);
                    hwChartTb.bottomMargin.disable();
                    hwChartTb.bottomMargin.setOriValue('');
                }
                if (chartInfo.marginLeft) {
                    hwChartTb.isLeft.checked = true;
                    hwChartTb.isLeft.setValue(true);
                    hwChartTb.leftMargin.enable();
                    hwChartTb.leftMargin.setOriValue(chartInfo.marginLeft);
                } else {
                    hwChartTb.isLeft.checked = false;
                    hwChartTb.isLeft.setValue(false);
                    hwChartTb.leftMargin.disable();
                    hwChartTb.leftMargin.setOriValue('');
                }
                if (chartInfo.marginRight) {
                    hwChartTb.isRight.checked = true;
                    hwChartTb.isRight.setValue(true);
                    hwChartTb.rightMargin.enable();
                    hwChartTb.rightMargin.setOriValue(chartInfo.marginRight);
                } else {
                    hwChartTb.isRight.checked = false;
                    hwChartTb.isRight.setValue(false);
                    hwChartTb.rightMargin.disable();
                    hwChartTb.rightMargin.setOriValue('');
                }
                hwChartTb.spacing.setOriValue(chartInfo.axisSpacing || '');
                hwChartTb.minHeight.setOriValue(chartInfo.minHeight || '');
                hwChartTb.imgexport.checked = isModlut(vmdChart.tplJSON.modules, 'imgexport');
                hwChartTb.imgexport.setValue(isModlut(vmdChart.tplJSON.modules, 'imgexport'));
                hwChartTb.dataviews.checked = isModlut(vmdChart.tplJSON.modules, 'dataviews');
                hwChartTb.dataviews.setValue(isModlut(vmdChart.tplJSON.modules, 'dataviews'));
                hwChartTb.dataExtract.checked = isModlut(vmdChart.tplJSON.modules, 'dataExtract');
                hwChartTb.dataExtract.setValue(isModlut(vmdChart.tplJSON.modules, 'dataExtract'));
                hwChartTb.setProperty.checked = isModlut(vmdChart.tplJSON.modules, 'setProperty');
                hwChartTb.setProperty.setValue(isModlut(vmdChart.tplJSON.modules, 'setProperty'));
                hwChartTb.fitting.checked = isModlut(vmdChart.tplJSON.modules, 'fitting');
                hwChartTb.fitting.setValue(isModlut(vmdChart.tplJSON.modules, 'fitting'));
                hwChartTb.zoomData.checked = isModlut(vmdChart.tplJSON.modules, 'zoomData');
                hwChartTb.zoomData.setValue(isModlut(vmdChart.tplJSON.modules, 'zoomData'));
                // hwChartTb.isLoad.checked = vmdChart.tplJSON.toolbarConfig && vmdChart.tplJSON.toolbarConfig.isLoad || false;
                // hwChartTb.isLoad.setValue(vmdChart.tplJSON.toolbarConfig && vmdChart.tplJSON.toolbarConfig.isLoad || false);
                // hwChartTb.jsonUrl.setValue(vmdChart.tplJSON.toolbarConfig && vmdChart.tplJSON.toolbarConfig.jsonUrl || '/chart/libs/toolbar/button.json');
                // hwChartTb.imgUrl.setValue(vmdChart.tplJSON.toolbarConfig && vmdChart.tplJSON.toolbarConfig.imgUrl || '/chart/libs/toolbar/imgs/');
                hwChartTb.isPolar.checked = chartInfo.polar;
                hwChartTb.navigator.checked = vmdChart.tplJSON.hasNavigator || false;
                hwChartTb.navigator.setValue(vmdChart.tplJSON.hasNavigator || false);
                hwChartTb.isInverted.checked = chartInfo.inverted;
                hwChartTb.isInverted.setValue(chartInfo.inverted);
                hwChartTb.isPolar.checked = chartInfo.polar;
                hwChartTb.isPolar.setValue(chartInfo.polar);
            }

            function setBroderAndBackground() {
                hwChartBorder.tbBroderHeight.setOriValue(chartInfo.borderWidth);
                hwChartBorder.tbBackgroundColor.setColorDiv(chartInfo.backgroundColor);
                hwChartBorder.tbBackgroundColor.setOriColor(chartInfo.backgroundColor);
                hwChartBorder.tbborderColor.setColorDiv(chartInfo.borderColor)
                hwChartBorder.tbborderColor.setOriColor(chartInfo.borderColor)
                hwChartBorder.tbBorderRadius.setOriValue(chartInfo.borderRadius);
                hwChartBorder.htBackgroundColor.setColorDiv(chartInfo.plotBackgroundColor);
                hwChartBorder.htBackgroundColor.setOriColor(chartInfo.plotBackgroundColor);
                hwChartBorder.htBorderColor.setColorDiv(chartInfo.plotBorderColor);
                hwChartBorder.htBorderColor.setOriColor(chartInfo.plotBorderColor);
                hwChartBorder.htBorderHeight.setOriValue(chartInfo.plotBorderWidth);
                hwChartBorder.tbOpacity.setValue(chartInfo.backgroundOpacity);
                hwChartBorder.htOpacity.setValue(chartInfo.plotBackgroundOpacity)
                if (chartInfo.borderEnabled) {
                    hwChartBorder.showTbBroder.checked = true;
                    hwChartBorder.showTbBroder.setValue(true)
                    hwChartBorder.tbBorder.enable();
                } else {
                    hwChartBorder.showTbBroder.checked = false;
                    hwChartBorder.showTbBroder.setValue(false)
                    hwChartBorder.tbBorder.disable();
                }
                if (chartInfo.plotBorderEnabled) {
                    hwChartBorder.showHtBorder.checked = true;
                    hwChartBorder.showHtBorder.setValue(true)
                    hwChartBorder.htBorder.enable();
                } else {
                    hwChartBorder.showHtBorder.checked = false;
                    hwChartBorder.showHtBorder.setValue(false);
                    hwChartBorder.htBorder.disable();
                }
            }
            // 图表区边框宽度
            function hwChartBorder_tbBroderWidthChange(sender, value) {
                mychart.update({
                    chart: {
                        borderWidth: value
                    }
                });
                chartInfo.borderWidth = value;
                //mychart.addChartEventListener();
            }
            // 绘图区边框宽度
            function hwChartBorder_htBroderWidthChange(sender, value) {
                mychart.update({
                    chart: {
                        plotBorderWidth: value
                    }
                });
                chartInfo.plotBorderWidth = value;
                //mychart.addChartEventListener();
            }
            // 图表区边框圆角
            function hwChartBorder_tbBorderRadiusChange(sender, value) {
                mychart.update({
                    chart: {
                        borderRadius: value
                    }
                });
                chartInfo.borderRadius = value;
                //mychart.addChartEventListener();
            }
            // 图表区背景颜色
            function hwChartBorder_backColorChange(sender, SelColor) {
                mychart.update({
                    chart: {
                        backgroundColor: SelColor,
                    }
                });
                chartInfo.backgroundColor = SelColor;
                //mychart.addChartEventListener();
            }
            //图表区边框颜色
            function hwChartBorder_borderColorChange(sender, color) {
                mychart.update({
                    chart: {
                        borderColor: color
                    }
                });
                chartInfo.borderColor = color;
                //mychart.addChartEventListener();
            }
            // 绘图区背景颜色
            function hwChartBorder_plotBackColorChange(sender, color) {
                mychart.update({
                    chart: {
                        plotBackgroundColor: color,
                    }
                });
                chartInfo.plotBackgroundColor = color;
                //mychart.addChartEventListener();
            }
            //绘图区边框颜色
            function hwChartBorder_plotBorderColorChange(sender, color) {
                mychart.update({
                    chart: {
                        plotBorderColor: color
                    }
                });
                chartInfo.plotBorderColor = color;
                //mychart.addChartEventListener();
            }
            // //////////////////////////////////////////////  序列属性设置 //////////////////////////////////////////////
            function setSeriesProperty(a, b) {
                if (a.initialConfig.id == "serName") {
                    b = titleEscape(b);
                    mychart.update({
                        legend: {
                            useHTML: true
                        }
                    });
                    chartLenged.useHTML = true;
                    mySeries.update({
                        name: b
                    })
                    mySeriesInfo.name = b;
                    mySeriesInfo.sname = b;
                    setLink(seriesComlist, getSeriesData(mychart.series), mySeries.userOptions.id);
                } else if (a.initialConfig.id == "seriType") {
                    var w = 2
                    if (b.id == 'scatter') {
                        w = 0;
                    }
                    mySeries.update({
                        type: b.id,
                        lineWidth: w
                    })
                    mySeriesInfo.type = b.id;
                    mySeriesInfo.lineWidth = w;
                    setSeriesClassValue();
                    stackEnable();
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "linkX") {
                    mySeries.update({
                        xAxis: b.id
                    })
                    mySeriesInfo.xAxis = b.id;
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "linkY") {
                    mySeries.update({
                        yAxis: b.id
                    })
                    mySeriesInfo.yAxis = b.id;
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "showCheckbox") {
                    mySeries.update({
                        visible: b
                    })
                    mySeriesInfo.visible = b;
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "step") {
                    if (b.id == 'none') {
                        mySeries.update({
                            step: null
                        })
                        delete mySeriesInfo.step;
                    } else {
                        mySeries.update({
                            step: b.id
                        })
                        mySeriesInfo.step = b.id;
                    }
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "connectNulls") {
                    mySeries.update({
                        connectNulls: b
                    })
                    mySeriesInfo.connectNulls = b;
                } else if (a.initialConfig.id == "ponitType") {
                    mySeries.update({
                        marker: {
                            symbol: b.id
                        }
                    })
                    mySeriesInfo.marker.symbol = b.id;
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "daLaFormat") {
                    mySeries.update({
                        dataLabels: {
                            format: b
                        }
                    })
                    mySeriesInfo.dataLabels.format = b;
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "pointShow") {
                    elementIsShow(hwSeriesClass.poinPanel, b)
                    mySeries.update({
                        marker: {
                            enabled: b
                        }
                    })
                    mySeriesInfo.marker.enabled = b;
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "labelShow") {
                    elementIsShow(hwSerieslable.lablePanel, b)
                    mySeries.update({
                        dataLabels: {
                            enabled: b
                        }
                    })
                    mySeriesInfo.dataLabels.enabled = b;
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "storeData") {
                    vmdChart.tplJSON.data.storeName = b.id;
                    selStore = b.id;
                    setLink(hwSeriesSelf.xData, getChildData(storeData, b.id), '');
                    setLink(hwSeriesSelf.dataY, getChildData(storeData, b.id), '');
                } else if (a.initialConfig.id == "xData") {
                    mySeriesInfo.xData = b.id;
                } else if (a.initialConfig.id == "dataY") {
                    mySeriesInfo.yData = b.id;
                } else if (a.initialConfig.id == "stacking") {
                    if (b.data.id == 'none') {
                        b = null
                    } else {
                        b = b.id
                    }
                    mySeries.update({
                        stacking: b
                    })
                    mySeriesInfo.stacking = b;
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "stack") {
                    mySeries.update({
                        stack: b
                    })
                    mySeriesInfo.stack = b;
                    mychart.addSeriesEventListener();
                } else if (a.initialConfig.id == "seriesShow") {
                    mySeries.update({
                        visible: !b
                    })
                    mySeriesInfo.visible = !b;
                }
            }
            // 聚合图聚合点设置
            function hwSeriesSelf_gatherInternalChange(sender, value) {
                if (value == '') {
                    for (var i = 0; i < chartSeries.length; i++) {
                        if (chartSeries[i].type == 'area') {
                            delete chartSeries[i].gatherInterval;
                        }
                    }
                    mychart.update({
                        series: chartSeries
                    })
                } else {
                    for (var i = 0; i < chartSeries.length; i++) {
                        if (chartSeries[i].type == 'area') {
                            chartSeries[i].gatherInterval = value;
                        }
                    }
                    mychart.update({
                        series: chartSeries
                    })
                }
            }
            // 序列线属性线型设置
            function hwSeriesClass_LineStyleChange(sender, line) {
                mySeries.update({
                    dashStyle: line
                })
                mySeriesInfo.dashStyle = line;
                mychart.addSeriesEventListener();
            }
            // 序列线属性线宽设置
            function hwSeriesClass_lineWidthChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                mySeries.update({
                    lineWidth: value
                })
                mySeriesInfo.lineWidth = value;
                mychart.addSeriesEventListener();
            }
            // 序列线属性颜色设置
            function hwSeriesClass_lineColorChange(sender, seleColor) {
                mySeries.update({
                    color: seleColor
                })
                mySeriesInfo.color = seleColor;
                mychart.addSeriesEventListener();
            }
            // 点属性 半径设置
            function hwSeriesClass_pointRadiusChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                mySeries.update({
                    marker: {
                        radius: value
                    }
                })
                mySeriesInfo.marker.radius = value;
                mychart.addSeriesEventListener();
            }
            // 点属性 外线宽度设置
            function hwSeriesClass_ponLinWidthChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                mySeries.update({
                    marker: {
                        lineWidth: value
                    }
                })
                mySeriesInfo.marker.lineWidth = value;
                mychart.addSeriesEventListener();
            }
            // 点属性 外线颜色设置
            function hwSeriesClass_ponLinColorChange(sender, selColor) {
                mySeries.update({
                    marker: {
                        lineColor: selColor
                    }
                })
                mySeriesInfo.marker.lineColor = selColor;
                mychart.addSeriesEventListener();
            }
            // 点属性  填充颜色
            function hwSeriesClass_ponFillColorChange(sender, selColor) {
                mySeries.update({
                    marker: {
                        fillColor: selColor
                    }
                })
                mySeriesInfo.marker.fillColor = selColor;
                mychart.addSeriesEventListener();
            }
            // 柱属性 边框宽度
            function hwSeriesClass_columnBorderWidthChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                } else {
                    mySeries.update({
                        borderWidth: value
                    })
                    mySeriesInfo.borderWidth = value;
                }
                mychart.addSeriesEventListener();
            }
            //最大宽度
            function hwSeriesClass_maxPointWidthChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    mySeries.update({
                        maxPointWidth: null
                    })
                    delete mySeriesInfo.maxPointWidth;
                } else {
                    mySeries.update({
                        maxPointWidth: value
                    })
                    mySeriesInfo.maxPointWidth = value;
                }
                mychart.addSeriesEventListener();
            }
            // 柱属性 边框圆角
            function hwSeriesClass_columnBorderRadiusChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                mySeries.update({
                    borderRadius: value
                })
                mySeriesInfo.borderRadius = value;
                mychart.addSeriesEventListener();
            }
            // 柱属性 边框颜色
            function hwSeriesClass_columnBorderColorChange(sender, selColor) {
                mySeries.update({
                    borderColor: selColor
                })
                mySeriesInfo.borderColor = selColor;
                mychart.addSeriesEventListener();
            }
            // 饼属性  圆内半径
            function hwSeriesClass_peiInnerSizeChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                mySeries.update({
                    innerSize: value
                })
                mySeriesInfo.innerSize = value;
                mychart.addSeriesEventListener();
            }
            //面积图填充颜色
            function hwSeriesClass_areaColorChange(sender, selColor) {
                mySeries.update({
                    fillColor: selColor
                })
                mySeriesInfo.fillColor = selColor;
                mychart.addSeriesEventListener();
            }
            // 数据标注水平对齐
            function hwSerieslable_seriesLableAlignChange(sender, align) {
                mySeries.update({
                    dataLabels: {
                        align: align
                    }
                })
                mySeriesInfo.dataLabels.align = align;
                mychart.addSeriesEventListener();
            }
            // 数据标签垂直对齐
            function hwSerieslable_seriesLableVarAlignChange(sender, varAlign) {
                mySeries.update({
                    dataLabels: {
                        verticalAlign: varAlign
                    }
                })
                mySeriesInfo.dataLabels.verticalAlign = varAlign;
                mychart.addSeriesEventListener();
            }
            // 饼图标注距离外沿的位置
            function hwSerieslable_seriesLableDistance(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = -15;
                }
                mySeries.update({
                    dataLabels: {
                        distance: value
                    }
                })
                mySeriesInfo.dataLabels.distance = value;
                mychart.addSeriesEventListener();
            }
            // 数据标注水平偏移量
            function hwSerieslable_seriesLableXchange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                mySeries.update({
                    dataLabels: {
                        x: value
                    }
                })
                mySeriesInfo.dataLabels.x = value;
                mychart.addSeriesEventListener();
            }
            // 数据标注垂直偏移量
            function hwSerieslable_seriesLableYchange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = -6;
                }
                mySeries.update({
                    dataLabels: {
                        y: value
                    }
                })
                mySeriesInfo.dataLabels.y = value;
                mychart.addSeriesEventListener();
            }
            //数据标注文本字体
            function hwSerieslable_FontFamitychange(sender, famity) {
                if (!famity.data) {
                    return
                }
                mySeries.update({
                    dataLabels: {
                        style: {
                            fontFamily: famity.data.EnName
                        }
                    }
                })
                mySeriesInfo.dataLabels.style.fontFamily = famity.data.EnName;
                mychart.addSeriesEventListener();
            }
            // 数据标注文本字号
            function hwSerieslable_FontSizechange(sender, size) {
                if (!size.data) {
                    return
                }
                mySeries.update({
                    dataLabels: {
                        style: {
                            fontSize: size.data.px
                        }
                    }
                })
                mySeriesInfo.dataLabels.style.fontSize = size.data.px;
                mychart.addSeriesEventListener();
            }
            // 数据标签文本字形
            function hwSerieslable_FontStylechange(sender, style) {
                if (!style.data) {
                    return
                }
                var Style, Weight;
                if (style.data.EnName == 'normal') {
                    Style = "normal";
                    Weight = "normal";
                }
                if (style.data.EnName == 'bold') {
                    Weight = "bold";
                }
                if (style.data.EnName == 'italic') {
                    Style = "italic";
                }
                if (style.data.EnName == 'boldAnditalic') {
                    Style = "italic";
                    Weight = "bold";
                }
                mySeries.update({
                    dataLabels: {
                        style: {
                            fontStyle: Style,
                            fontWeight: Weight
                        }
                    }
                })
                mySeriesInfo.dataLabels.style.fontStyle = Style;
                mySeriesInfo.dataLabels.style.fontWeight = Weight;
            }
            // 数据标注文本颜色
            function hwSerieslable_FontColorchange(sender, color) {
                mySeries.update({
                    dataLabels: {
                        style: {
                            color: color,
                            textOutline: "none"
                        }
                    }
                })
                mySeriesInfo.dataLabels.style.color = color;
                mySeriesInfo.dataLabels.style.textOutline = 'none';
            }
            // 序列属性初始赋值
            function setSeriesValue() {
                getXAxisData();
                getYAxisData();
                getStore();
                setLink(seriesComlist, getSeriesData(mychart.series), mySeries.userOptions.id);
                hwSeriesSelf.serName.setValue(mySeriesInfo.name);
                setLink(hwSeriesSelf.linkX, xAxisData, mySeriesInfo.xAxis);
                setLink(hwSeriesSelf.linkY, yAxisData, mySeriesInfo.yAxis);
                setLink(hwSeriesSelf.storeData, storeData, selStore || '');
                setLink(hwSeriesSelf.xData, getChildData(storeData, selStore), mySeriesInfo.xData || '');
                setLink(hwSeriesSelf.dataY, getChildData(storeData, selStore), mySeriesInfo.yData || '');
                hwSeriesSelf.stack.setValue(mySeriesInfo.stack);
                if (mySeriesInfo.stacking == null || mySeriesInfo.stacking == '') {
                    hwSeriesSelf.stacking.setValue('none');
                } else {
                    hwSeriesSelf.stacking.setValue(mySeriesInfo.stacking);
                }
                hwSeriesSelf.gatherInterval.setOriValue(mySeriesInfo.gatherInterval || '')
                stackEnable();
            }
            // 分类属性初始赋值
            function setSeriesClassValue() {
                hwSeriesClass.seriType.setValue(mySeriesInfo.type);
                // 线属性
                if (mySeriesInfo.type === 'line' || mySeriesInfo.type === 'area' || mySeriesInfo.type === 'spline') {
                    hwSeriesClass.linePanel.enable();
                    hwSeriesClass.LineStyle.setOriLine(mySeriesInfo.dashStyle);
                    hwSeriesClass.lineWidth.setOriValue(mySeriesInfo.lineWidth);
                    hwSeriesClass.step.setValue(mySeriesInfo.step);
                    hwSeriesClass.connectNulls.checked = mySeriesInfo.connectNulls;
                    hwSeriesClass.connectNulls.setValue(mySeriesInfo.connectNulls);
                    hwSeriesClass.lineColor.setColorDiv(mySeriesInfo.color);
                    hwSeriesClass.lineColor.setOriColor(mySeriesInfo.color);
                    hwSeriesClass.areaColorSelect.setOriColor(mySeriesInfo.fillColor || mySeriesInfo.color || "#fff");
                    hwSeriesClass.areaColorSelect.setColorDiv(mySeriesInfo.fillColor || mySeriesInfo.color || "#fff");
                } else {
                    hwSeriesClass.linePanel.disable();
                }
                // 点属性
                if (mySeriesInfo.type === 'line' || mySeriesInfo.type === 'area' || mySeriesInfo.type === 'spline' || mySeriesInfo.type === 'scatter') {
                    hwSeriesClass.pointShow.enable();
                    hwSeriesClass.pointShow.checked = mySeriesInfo.marker.enabled;
                    hwSeriesClass.pointShow.setValue(mySeriesInfo.marker.enabled);
                    elementIsShow(hwSeriesClass.poinPanel, mySeriesInfo.marker.enabled);
                    hwSeriesClass.ponitType.setValue(mySeriesInfo.marker.symbol);
                    hwSeriesClass.pointRadius.setOriValue(mySeriesInfo.marker.radius);
                    hwSeriesClass.ponLinColor.setColorDiv(mySeriesInfo.marker.lineColor);
                    hwSeriesClass.ponLinColor.setOriColor(mySeriesInfo.marker.lineColor);
                    hwSeriesClass.ponLinWidth.setOriValue(mySeriesInfo.marker.lineWidth);
                    hwSeriesClass.ponFillColor.setColorDiv(mySeriesInfo.marker.fillColor)
                    hwSeriesClass.ponFillColor.setOriColor(mySeriesInfo.marker.fillColor)
                } else {
                    hwSeriesClass.poinPanel.disable();
                    hwSeriesClass.pointShow.disable();
                }
                // 柱属性
                if (mySeriesInfo.type === 'column') {
                    hwSeriesClass.columnPanel.enable();
                    hwSeriesClass.columnColor.setColorDiv(mySeriesInfo.color);
                    hwSeriesClass.columnColor.setOriColor(mySeriesInfo.color);
                    hwSeriesClass.borderColor.setColorDiv(mySeriesInfo.borderColor);
                    hwSeriesClass.borderColor.setOriColor(mySeriesInfo.borderColor);
                    hwSeriesClass.borderWidth.setOriValue(mySeriesInfo.borderWidth);
                    hwSeriesClass.borderRadius.setOriValue(mySeriesInfo.borderRadius);
                    hwSeriesClass.maxPointWidth.setOriValue(mySeriesInfo.maxPointWidth || '')
                } else {
                    hwSeriesClass.columnPanel.disable();
                }
                // 饼属性
                if (mySeriesInfo.type === 'pie') {
                    hwSeriesClass.piePanel.enable();
                    hwSeriesClass.innerSize.setOriValue(mySeriesInfo.innerSize);
                } else {
                    hwSeriesClass.piePanel.disable();
                }
            }
            // 数据标注初始赋值
            function setSeriesDataLableValue() {
                hwSerieslable.labelShow.checked = mySeriesInfo.dataLabels.enabled;
                hwSerieslable.labelShow.setValue(mySeriesInfo.dataLabels.enabled);
                elementIsShow(hwSerieslable.lablePanel, mySeriesInfo.dataLabels.enabled)
                hwSerieslable.daLaFormat.setValue(mySeriesInfo.dataLabels.format);
                hwSerieslable.dataLabelX.setOriValue(mySeriesInfo.dataLabels.x);
                hwSerieslable.dataLabelY.setOriValue(mySeriesInfo.dataLabels.y);
                hwSerieslable.FontSize.setFontSize(mySeriesInfo.dataLabels.style.fontSize);
                hwSerieslable.FontFamity.setFontFamity(mySeriesInfo.dataLabels.style.fontFamily);
                hwSerieslable.ColorSelect.setColorDiv(mySeriesInfo.dataLabels.style.color);
                hwSerieslable.ColorSelect.setOriColor(mySeriesInfo.dataLabels.style.color);
                hwSerieslable.distance.setOriValue(mySeriesInfo.dataLabels.distance || '');
                if (mySeriesInfo.dataLabels.style.fontStyle == 'normal' && mySeriesInfo.dataLabels.style.fontWeight == 'normal') {
                    hwSerieslable.FontStyle.setFontStyle('normal')
                }
                if (mySeriesInfo.dataLabels.style.fontStyle == 'italic' && mySeriesInfo.dataLabels.style.fontWeight == 'bold') {
                    hwSerieslable.FontStyle.setFontStyle('boldAnditalic')
                }
                if (mySeriesInfo.dataLabels.style.fontStyle == 'normal' && mySeriesInfo.dataLabels.style.fontWeight == 'bold') {
                    hwSerieslable.FontStyle.setFontStyle('bold')
                }
                if (mySeriesInfo.dataLabels.style.fontStyle == 'italic' && mySeriesInfo.dataLabels.style.fontWeight == 'normal') {
                    hwSerieslable.FontStyle.setFontStyle('italic')
                }
                var aligeIndex = 2;
                switch (mySeriesInfo.dataLabels.align) {
                    case 'left':
                        aligeIndex = 1;
                        break;
                    case 'center':
                        aligeIndex = 2;
                        break;
                    case 'right':
                        aligeIndex = 3;
                        break;
                }
                hwSerieslable.hwButtonGroup1.setSelectIndex(aligeIndex);
                var varAlignIndex = 2;
                if (mySeriesInfo.type === 'column') {
                    switch (mySeriesInfo.dataLabels.verticalAlign) {
                        case 'bottom':
                            varAlignIndex = 1;
                            break;
                        case 'middle':
                            varAlignIndex = 2;
                            break;
                        case 'top':
                            varAlignIndex = 3;
                            break;
                    }
                } else {
                    switch (mySeriesInfo.dataLabels.verticalAlign) {
                        case 'top':
                            varAlignIndex = 1;
                            break;
                        case 'middle':
                            varAlignIndex = 2;
                            break;
                        case 'bottom':
                            varAlignIndex = 3;
                            break;
                    }
                }
                hwSerieslable.hwButtonGroup.setSelectIndex(varAlignIndex);
            }
            // 获取坐标轴信息
            function getXAxisData() {
                var axisId, axisName;
                mychart.xAxis.forEach(function(item, index) {
                    if (item.userOptions.id) {
                        axisId = item.userOptions.id
                    } else {
                        axisId = '0';
                    }
                    if (item.userOptions.title && item.userOptions.title.text) {
                        axisName = item.userOptions.title.text
                    } else {
                        if (index != 0) {
                            axisName = '横轴' + index
                        } else {
                            axisName = '横轴'
                        }
                    }
                    xAxisData.push({
                        id: axisId,
                        name: removeBr(axisName)
                    })
                })
            }

            function getYAxisData() {
                var axisId, axisName;
                mychart.yAxis.forEach(function(item, index) {
                    if (item.userOptions.id) {
                        axisId = item.userOptions.id
                    } else {
                        axisId = '0'
                    }
                    if (item.userOptions.title && item.userOptions.title.text) {
                        axisName = item.userOptions.title.text
                    } else {
                        if (index != 0) {
                            axisName = '纵轴' + index
                        } else {
                            axisName = '纵轴'
                        }
                    }
                    yAxisData.push({
                        id: axisId,
                        name: removeBr(axisName)
                    })
                })
            }
            // 获取数据集信息
            function getStore() {
                storeData = [];
                myStore.forEach(function(item, index) {
                    var arr = [];
                    if (item.childNodes && item.childNodes.length > 0) {
                        item.childNodes.forEach(function(value, i) {
                            arr.push({
                                id: value.text,
                                text: value.text
                            })
                        })
                    }
                    storeData.push({
                        id: item.text,
                        name: item.text,
                        child: arr
                    })
                })
            }
            // 根据选择的数据集加载字段信息
            function getChildData(data, id) {
                var arr = [];
                if (vmd.isArray(data)) {
                    for (var i = 0; i < data.length; i++) {
                        if (id == data[i].id) {
                            arr = data[i].child
                        }
                        if (id == '' || id == undefined) {
                            arr = data[0].child
                        }
                    }
                }
                return arr;
            }
            // 处理序列数据
            function getSeriesData(arr) {
                var data = [];
                arr.forEach(function(item) {
                    data.push({
                        id: item.userOptions.id,
                        name: item.userOptions.name
                    })
                })
                return data;
            }
            // 动态给下拉列表赋值
            function setLink(ele, data, id) {
                if (data.length <= 0) return;
                ele.valueField = 'id';
                if (data[0].hasOwnProperty("name")) {
                    ele.displayField = 'name';
                    var store = new vmd.data.Store({
                        data: data,
                        fields: ['id', 'name']
                    })
                } else if (data[0].hasOwnProperty("text")) {
                    ele.displayField = 'text';
                    var store = new vmd.data.Store({
                        data: data,
                        fields: ['id', 'text']
                    })
                }
                ele.bindStore(store);
                if (id === 0) {
                    ele.setValue(data[0].id)
                } else {
                    ele.setValue(id)
                }
            }
            // 下拉列表切换序列
            function seriesComlist_selectChanged(sender, combo, record, index) {
                var mySeriesId = record.id;
                mySeries = mychart.get(mySeriesId);
                for (var i = 0; i < chartSeries.length; i++) {
                    if (chartSeries[i].id == mySeriesId) {
                        vmd.util.applyIf(vmdChart.tplJSON.series[i], defaultSeries);
                        vmd.util.applyIf(vmdChart.tplJSON.series[i].dataLabels, defaultSeries.dataLabels);
                        vmd.util.applyIf(vmdChart.tplJSON.series[i].marker, defaultSeries.marker);
                        mySeriesInfo = chartSeries[i];
                        mySeriesInfo.name = mySeries.userOptions.name;
                        break
                    }
                }
                var activeTab = MyTabs2.getActiveTab().title;
                debugger
                switch (activeTab) {
                    case "序列":
                        setSeriesValue();
                        break;
                    case "分类属性":
                        setSeriesClassValue();;
                        break;
                    case "数据标注":
                        setSeriesDataLableValue();
                        break;
                }
            }
            // 堆叠是否可用
            function stackEnable() {
                if (mySeriesInfo.type === 'column' || mySeriesInfo.type === 'area') {
                    hwSeriesSelf.stackPanel.enable();
                } else {
                    hwSeriesSelf.stackPanel.disable();
                }
                if (mySeriesInfo.type == 'area') {
                    hwSeriesSelf.gatherInterval.enable();
                } else {
                    hwSeriesSelf.gatherInterval.disable();
                }
            }
            // 序列tab页切换
            function MyTabs2_tabchange(sender, tab) {
                vmd.taskRunner(function() {
                    if (chartSeries) return true;
                }, function() {
                    if (!mySeries) {
                        mySeries = mychart.get(chartSeries[0].id);
                        for (var i = 0; i < chartSeries.length; i++) {
                            if (chartSeries[i].id == chartSeries[0].id) {
                                vmd.util.applyIf(vmdChart.tplJSON.series[i], defaultSeries);
                                vmd.util.applyIf(vmdChart.tplJSON.series[i].dataLabels, defaultSeries.dataLabels);
                                vmd.util.applyIf(vmdChart.tplJSON.series[i].marker, defaultSeries.marker);
                                mySeriesInfo = chartSeries[i];
                                mySeriesInfo.name = mySeries.userOptions.name;
                                break
                            }
                        }
                    }
                    getXAxisData();
                    getYAxisData();
                    getStore();
                    setLink(seriesComlist, getSeriesData(mychart.series), mySeries.userOptions.id);
                    switch (tab.title) {
                        case "序列":
                            setSeriesValue();
                            break;
                        case "分类属性":
                            setSeriesClassValue();;
                            break;
                        case "数据标注":
                            setSeriesDataLableValue();
                            break;
                    }
                })
            }
            // 组件是否显示
            function elementIsShow(ele, isShow) {
                if (isShow) {
                    ele.enable();
                } else {
                    ele.disable();
                }
            }
            // 日期格式化
            function date_getMillisecond(sDate) {
                var year, month, day, hour, minute, second, milliseconds = 0;
                sDate += "";
                sDate = sDate.replace(/\//g, "-");
                //20140120 || 2014 || 201401
                if (/\d{4,8}/.test(sDate)) {
                    year = parseInt(sDate.substr(0, 4), 10);
                    month = parseInt(sDate.substr(4, 2), 10);
                    day = parseInt(sDate.substr(6, 2), 10);
                } else if (sDate == "0") {
                    return 0;
                }
                //日期格式不正确
                else {
                    alert("日期格式不正确");
                    return;
                }
                //修正年月日
                year = isNaN(year) ? 2000 : year;
                month = isNaN(month) ? 1 : month;
                day = isNaN(day) ? 1 : day;
                //修正时分秒
                hour = isNaN(hour) ? 0 : hour;
                minute = isNaN(minute) ? 0 : minute;
                second = isNaN(second) ? 0 : second;
                return Date.UTC(year, month - 1, day, hour, minute, second, milliseconds);
            }
            // 修正数据
            function changNum(a) {
                if (a > 11) {
                    a = a - 11;
                    return changNum(a)
                } else {
                    return a
                }
            }
            // 添加序列
            function addSeries_click(sender, e) {
                var color = ['#7cb5ec', "#ff0000", "#339966", "#ff9900", "#000fff", "#cc99ff", "#000000", "#ffff00", "#993300", "#ff6600", "#000080"]
                var oriData = vmdChart.runJSON.data.json;
                var num = chartSeries.length;
                var newData = [];
                var id = vmd.getGuid();
                // 添加设计模式下序列数据
                for (var i = 0; i < oriData.length; i++) {
                    if (i > 0) {
                        if (vmdChart.isXAxisDateTime === 'datetime') {
                            newData.push([date_getMillisecond(oriData[i][0]), oriData[i][changNum(num) + 1]])
                        } else {
                            newData.push([oriData[i][0], oriData[i][changNum(num) + 1]])
                        }
                    }
                }
                // 添加序列
                mychart.addSeries({
                    id: id,
                    name: "series" + (num + 1),
                    data: newData,
                    type: mySeries.type,
                    color: color[changNum(num)]
                });
                // 将数据与数据列属性关联
                vmdChart.tplJSON.data.seriesMapping.push({
                    x: 0,
                    y: changNum(num) + 1
                });
                // 新序列的属性数据
                chartSeries.push({
                    id: id,
                    type: mySeries.type,
                    color: color[changNum(num)],
                    marker: {
                        fillColor: color[changNum(num)]
                    },
                });
                for (var i = 0; i < chartSeries.length; i++) {
                    if (chartSeries[i].id === id) {
                        mySeriesInfo = chartSeries[i];
                        break
                    }
                }
                mySeries = mychart.get(id);
                vmd.util.applyIf(mySeriesInfo, defaultSeries);
                vmd.util.applyIf(mySeriesInfo.dataLabels, defaultSeries.dataLabels);
                vmd.util.applyIf(mySeriesInfo.marker, defaultSeries.marker);
                mySeriesInfo.name = mySeries.userOptions.name;
                setLink(seriesComlist, getSeriesData(mychart.series), mySeries.userOptions.id);
                var activeTab = MyTabs2.getActiveTab().title;
                switch (activeTab) {
                    case "序列":
                        setSeriesValue();
                        break;
                    case "分类属性":
                        setSeriesClassValue();;
                        break;
                    case "数据标注":
                        setSeriesDataLableValue();
                        break;
                }
                mychart.addSeriesEventListener();
            }
            // 删除序列
            function delSeries_click(sender, e) {
                Ext.Msg.confirm('提示', '确定删除该序列?', function(bnt) {
                    if (bnt == 'yes') {
                        var id = mySeries.userOptions.id;
                        for (var i = 0; i < chartSeries.length; i++) {
                            if (chartSeries[i].id === id) {
                                if (i > 0) {
                                    mySeries = mychart.get(chartSeries[i - 1].id)
                                    mySeriesInfo = chartSeries[i - 1]
                                }
                                if (i === 0) {
                                    if (chartSeries[i + 1]) {
                                        mySeries = mychart.get(chartSeries[i + 1].id)
                                        seriesInfo = chartSeries[i + 1]
                                    } else {
                                        mySeries = {}
                                        chartSeries = {}
                                    }
                                }
                                var seriesMapping = vmdChart.tplJSON.data.seriesMapping;
                                chartSeries.remove(chartSeries[i]);
                                seriesMapping.remove(seriesMapping[i]);
                                break
                            }
                        }
                        mychart.get(id).remove();
                        setLink(seriesComlist, getSeriesData(mychart.series), mySeries.userOptions.id);
                        var activeTab = MyTabs2.getActiveTab().title;
                        switch (activeTab) {
                            case "序列":
                                setSeriesValue();
                                break;
                            case "分类属性":
                                setSeriesClassValue();;
                                break;
                            case "数据标注":
                                setSeriesDataLableValue();
                                break;
                        }
                    }
                })
            }
            // ////////////////////////////////////////// 坐标轴属性设置 ///////////////////////////////////////////////
            // 处理坐标轴数据
            function getAxisData(arr) {
                var data = [];
                arr.forEach(function(item) {
                    var name = removeBr(item.userOptions.title.text)
                    if (item.userOptions.title.text === '' || item.userOptions.title.text == null) {
                        name = item.coll + item.userOptions.index
                    }
                    data.push({
                        id: item.userOptions.id,
                        name: name
                    })
                })
                return data;
            }
            // 坐标轴组件tab页切换
            function MyTabs1_tabchange(sender, tab) {
                vmd.taskRunner(function() {
                    if (mychart) return true;
                }, function() {
                    if (!myAxis) {
                        var myAxisId = mychart.axes[0].userOptions.id
                        myAxis = mychart.get(myAxisId);
                        if (myAxis.coll === 'xAxis') {
                            var axisData = chartXAxis;
                        } else if (myAxis.coll === 'yAxis') {
                            var axisData = chartYAxis;
                        }
                        for (var i = 0; i < axisData.length; i++) {
                            if (axisData[i].id == myAxisId) {
                                myAxisInfo = axisData[i];
                                break
                            }
                        }
                        vmd.util.applyIf(myAxisInfo, defultAxis);
                        vmd.util.applyIf(myAxisInfo.labels, defultAxis.labels);
                        vmd.util.applyIf(myAxisInfo.title, defultAxis.title);
                        // 记录初始标题和标签格式
                        titleText = myAxisInfo.title.text;
                        lastlableFormat = myAxisInfo.labels.format;
                    }
                    setLink(axisComlist, getAxisData(mychart.axes), myAxisId);
                    switch (tab.title) {
                        case "标题":
                            setAxisOriTitle();
                            break;
                        case "轴属性":
                            setAxisOriValue();
                            break;
                        case "刻度线":
                            setTickOriValue();
                            break;
                        case "标签":
                            setAxisLableOriValue();
                            break;
                    }
                })
            }
            // 坐标轴标题初始赋值
            function setAxisOriTitle() {
                if (myAxisInfo.title.text && myAxisInfo.title.text != '') {
                    hwAxisTitle.titleShow.checked = true;
                    hwAxisTitle.titleShow.setValue(true);
                    hwAxisTitle.titlePanle.enable();
                    if (myAxisInfo.title.show == 'vertical') {
                        hwAxisTitle.ButtonGroup.setSelectIndex(2);
                        hwAxisTitle.titleText.setValue(removeBr(myAxisInfo.title.text));
                    } else {
                        hwAxisTitle.ButtonGroup.setSelectIndex(1);
                        hwAxisTitle.titleText.setValue(removeBr(myAxisInfo.title.text));
                    }
                } else {
                    hwAxisTitle.titleShow.checked = false;
                    hwAxisTitle.titleShow.setValue(false);
                    hwAxisTitle.titlePanle.disable();
                    hwAxisTitle.titleText.setValue(titleText);
                    hwAxisTitle.ButtonGroup.setSelectIndex(1);
                }
                hwAxisTitle.titleOffset.setOriValue(myAxisInfo.title.offset);
                hwAxisTitle.titleX.setOriValue(myAxisInfo.title.x || '');
                hwAxisTitle.titleY.setOriValue(myAxisInfo.title.y || '');
                hwAxisTitle.rotation.setOriValue(myAxisInfo.title.rotation || 0);
                hwAxisTitle.axisFontSize.setFontSize(myAxisInfo.title.style.fontSize || '');
                hwAxisTitle.axisFontFamity.setFontFamity(myAxisInfo.title.style.fontFamily || '');
                hwAxisTitle.axisColorSelect.setColorDiv(myAxisInfo.title.style.color || '');
                hwAxisTitle.axisColorSelect.setOriColor(myAxisInfo.title.style.color || '');
                if (myAxisInfo.title.style.fontStyle == 'normal' && myAxisInfo.title.style.fontWeight == 'normal') {
                    hwAxisTitle.axisFontStyle.setFontStyle('normal')
                }
                if (myAxisInfo.title.style.fontStyle == 'italic' && myAxisInfo.title.style.fontWeight == 'bold') {
                    hwAxisTitle.axisFontStyle.setFontStyle('boldAnditalic')
                }
                if (myAxisInfo.title.style.fontStyle == 'normal' && myAxisInfo.title.style.fontWeight == 'bold') {
                    hwAxisTitle.axisFontStyle.setFontStyle('bold')
                }
                if (myAxisInfo.title.style.fontStyle == 'italic' && myAxisInfo.title.style.fontWeight == 'normal') {
                    hwAxisTitle.axisFontStyle.setFontStyle('italic')
                }
                hwAxisTitle.Titlealign.setValue(myAxisInfo.title.align)
            }
            // 坐标轴自身属性初始赋值
            function setAxisOriValue() {
                hwAxisSelf.axisShow.checked = myAxisInfo.visible;
                hwAxisSelf.axisShow.setValue(myAxisInfo.visible);
                hwAxisSelf.minPad.setOriValue(myAxisInfo.minPadding);
                elementIsShow(hwAxisSelf.axisPanel, myAxisInfo.visible)
                elementIsShow(hwAxisSelf.isOpposite, myAxisInfo.visible)
                hwAxisSelf.axisType.setValue(myAxisInfo.type);
                hwAxisSelf.dateComlist.setValue(dateFormat_replace_date(myAxisInfo.dateTimeLabelFormats.day));
                if (myAxisInfo.type == 'datetime') {
                    hwAxisSelf.dateComlist.enable()
                } else {
                    hwAxisSelf.dateComlist.disable()
                }
                hwAxisSelf.axisOffset.setOriValue(myAxisInfo.offset || 0);
                hwAxisSelf.axisCeiling.setOriValue(myAxisInfo.ceiling || '');
                hwAxisSelf.axisFloor.setOriValue(myAxisInfo.floor || 0);
                hwAxisSelf.axisMax.setOriValue(myAxisInfo.max || '');
                hwAxisSelf.axisMin.setOriValue(myAxisInfo.min || 0);
                hwAxisSelf.isOpposite.checked = myAxisInfo.opposite;
                hwAxisSelf.isOpposite.setValue(myAxisInfo.opposite);
                hwAxisSelf.isReversed.checked = myAxisInfo.reversed;
                hwAxisSelf.isReversed.setValue(myAxisInfo.reversed);
                hwAxisSelf.lineWidth.setOriValue(myAxisInfo.lineWidth || 0);
                hwAxisSelf.lineColors.setColorDiv(myAxisInfo.lineColor);
                hwAxisSelf.lineColors.setOriColor(myAxisInfo.lineColor);
                hwAxisSelf.axisHeight.setOriValue(myAxisInfo.height || '');
                hwAxisSelf.axisTop.setOriValue(myAxisInfo.top || '0%');
                myAxisInfo.crosshair = myAxisInfo.crosshair || {};
                hwAxisSelf.crosshairColor.setColorDiv(myAxisInfo.crosshair.color || '#cccccc');
                hwAxisSelf.crosshairColor.setOriColor(myAxisInfo.crosshair.color || '#cccccc');
                hwAxisSelf.crosshairWidth.setOriValue(myAxisInfo.crosshair.width || 0);
                hwAxisSelf.hwLineStyle.setOriLine(myAxisInfo.crosshair.dashStyle || 'Solid');
                if (myAxis.coll === "xAxis") {
                    hwAxisSelf.axisHeight.disable();
                    hwAxisSelf.axisTop.disable();
                    // hwAxisSelf.axisOffset.disable();
                    hwAxisSelf.axisMax.disable();
                    hwAxisSelf.axisMin.disable();
                } else if (myAxis.coll === "yAxis") {
                    hwAxisSelf.axisHeight.enable();
                    hwAxisSelf.axisTop.enable();
                    // hwAxisSelf.axisOffset.enable();
                    hwAxisSelf.axisMax.enable();
                    hwAxisSelf.axisMin.enable();
                }
                if (myAxisInfo.direction == 'vertical') {
                    hwAxisSelf.hwButtonGroup.setSelectIndex(2);
                } else {
                    hwAxisSelf.hwButtonGroup.setSelectIndex(1);
                }
            }
            // 刻度线及网格线属性初始赋值
            function setTickOriValue() {
                // 主刻度线
                hwAxisTick.tickPosition.setValue(myAxisInfo.tickPosition);
                hwAxisTick.tickWidth.setOriValue(myAxisInfo.tickWidth);
                hwAxisTick.tickInterval.setOriValue(myAxisInfo.tickInterval || '');
                hwAxisTick.tickPixelInterval.setOriValue(myAxisInfo.tickPixelInterval || '');
                hwAxisTick.tickLenfht.setOriValue(myAxisInfo.tickLength);
                hwAxisTick.tickColors.setColorDiv(myAxisInfo.tickColor);
                hwAxisTick.tickColors.setOriColor(myAxisInfo.tickColor);
                hwAxisTick.tickAmount.setOriValue(myAxisInfo.tickAmount || '');
                // 主网格线
                hwAxisTick.gridLineColor.setOriColor(myAxisInfo.gridLineColor);
                hwAxisTick.gridLineColor.setColorDiv(myAxisInfo.gridLineColor);
                hwAxisTick.gridLineWidth.setOriValue(myAxisInfo.gridLineWidth);
                hwAxisTick.gridLineDashStyle.setOriLine(myAxisInfo.gridLineDashStyle);
                // 次刻度线
                hwAxisTick.minorTickPos.setValue(myAxisInfo.minorTickPosition || '');
                hwAxisTick.minorTickWidth.setOriValue(myAxisInfo.minorTickWidth || 0);
                hwAxisTick.minorTickLenght.setOriValue(myAxisInfo.minorTickLength || 0);
                hwAxisTick.minorTickColor.setColorDiv(myAxisInfo.minorTickColor || "#ffffff");
                hwAxisTick.minorTickColor.setOriColor(myAxisInfo.minorTickColor || "#ffffff");
                // 次网格线
                hwAxisTick.minorGridLineColor.setOriColor(myAxisInfo.minorGridLineColor || "#ffffff");
                hwAxisTick.minorGridLineColor.setColorDiv(myAxisInfo.minorGridLineColor || "#ffffff");
                hwAxisTick.minorGridLineWidth.setOriValue(myAxisInfo.minorGridLineWidth || 0);
                hwAxisTick.minorGridLineDashStyle.setOriLine(myAxisInfo.minorGridLineDashStyle || "");
            }
            // 坐标轴标签初始赋值
            function setAxisLableOriValue() {
                hwAxislable.lableShow.checked = myAxisInfo.labels.enabled;
                hwAxislable.lableShow.setValue(myAxisInfo.labels.enabled);
                hwAxislable.allowDecimals.checked = myAxisInfo.labels.allowDecimals || true;
                hwAxislable.allowDecimals.setValue(myAxisInfo.labels.allowDecimals || true);
                elementIsShow(hwAxislable.lablePanel, myAxisInfo.labels.enabled)
                hwAxislable.laberFormat.setValue(myAxisInfo.labels.format);
                hwAxislable.labelStaggerLines.setOriValue(myAxisInfo.labels.staggerLines);
                hwAxislable.labelRotation.setOriValue(myAxisInfo.labels.rotation);
                hwAxislable.lableStep.setOriValue(myAxisInfo.labels.step || '');
                hwAxislable.labelX.setOriValue(myAxisInfo.labels.x);
                hwAxislable.labelY.setOriValue(myAxisInfo.labels.y);
                hwAxislable.FontSize.setFontSize(myAxisInfo.labels.style.fontSize);
                hwAxislable.FontFamity.setFontFamity(myAxisInfo.labels.style.fontFamily);
                hwAxislable.fontColor.setColorDiv(myAxisInfo.labels.style.color);
                hwAxislable.fontColor.setOriColor(myAxisInfo.labels.style.color);
                if (myAxisInfo.labels.style.fontStyle == 'normal' && myAxisInfo.labels.style.fontWeight == 'normal') {
                    hwAxislable.FontStyle.setFontStyle('normal')
                }
                if (myAxisInfo.labels.style.fontStyle == 'italic' && myAxisInfo.labels.style.fontWeight == 'bold') {
                    hwAxislable.FontStyle.setFontStyle('boldAnditalic')
                }
                if (myAxisInfo.labels.style.fontStyle == 'normal' && myAxisInfo.labels.style.fontWeight == 'bold') {
                    hwAxislable.FontStyle.setFontStyle('bold')
                }
                if (myAxisInfo.labels.style.fontStyle == 'italic' && myAxisInfo.labels.style.fontWeight == 'normal') {
                    hwAxislable.FontStyle.setFontStyle('italic')
                }
                var aligeIndex = 2;
                switch (myAxisInfo.labels.align) {
                    case 'left':
                        aligeIndex = 1;
                        break;
                    case 'center':
                        aligeIndex = 2;
                        break;
                    case 'right':
                        aligeIndex = 3;
                        break;
                }
                hwAxislable.hwButtonGroup.setSelectIndex(aligeIndex);
            };
            // 下拉列表改变坐标轴
            function axisComlist_selectChanged(sender, combo, record, index) {
                var myAxisId = record.id;
                myAxis = mychart.get(myAxisId);
                if (myAxis.coll === 'xAxis') {
                    var axisData = chartXAxis;
                } else if (myAxis.coll === 'yAxis') {
                    var axisData = chartYAxis;
                }
                for (var i = 0; i < axisData.length; i++) {
                    if (axisData[i].id == myAxisId) {
                        myAxisInfo = axisData[i];
                        break
                    }
                }
                vmd.util.applyIf(myAxisInfo, defultAxis);
                vmd.util.applyIf(myAxisInfo.labels, defultAxis.labels);
                vmd.util.applyIf(myAxisInfo.title, defultAxis.title);
                // 记录初始标题和标签格式
                titleText = myAxisInfo.title.text;
                lastlableFormat = myAxisInfo.labels.format;
                var activeTab = MyTabs1.getActiveTab().title;
                switch (activeTab) {
                    case "标题":
                        setAxisOriTitle();
                        break;
                    case "轴属性":
                        setAxisOriValue();
                        break;
                    case "刻度线":
                        setTickOriValue();
                        break;
                    case "标签":
                        setAxisLableOriValue();
                        break;
                }
                mychart.seleBorder.attr(myAxis.getBackRect());
            }
            // 坐标轴属性设置
            function setAxisProperty(a, b, c) {
                if (a.initialConfig.id == "axisShow") {
                    elementIsShow(hwAxislable.lablePanel, b)
                    myAxis.update({
                        visible: b
                    });
                    myAxisInfo.visible = b;
                } else if (a.initialConfig.id == "axisType") {
                    console.log(a, b, c)
                    if (b.id == 'datetime') {
                        hwAxisSelf.dateComlist.enable();
                        myAxisInfo.labels.format = '';
                    } else {
                        hwAxisSelf.dateComlist.disable();
                        myAxisInfo.labels.format = lastlableFormat;
                    }
                    myAxis.update({
                        labels: {
                            format: myAxisInfo.labels.format
                        }
                    });
                    myAxis.update({
                        type: b.id
                    });
                    myAxisInfo.type = b.id;
                } else if (a.initialConfig.id == "dateComlist") {
                    if (b.id != null) {
                        b = date_replace_dateFormat(hwAxisSelf.dateComlist.getValue());
                    }
                    myAxis.update({
                        dateTimeLabelFormats: {
                            millisecond: b,
                            second: b,
                            minute: b,
                            hour: b,
                            day: b,
                            week: b,
                            month: b,
                            year: b
                        }
                    });
                    myAxisInfo.dateTimeLabelFormats = {
                        millisecond: b,
                        second: b,
                        minute: b,
                        hour: b,
                        day: b,
                        week: b,
                        month: b,
                        year: b
                    };
                    var tooltip = vmdChart.tplJSON.tooltip;
                    if (!tooltip) {
                        vmdChart.tplJSON["tooltip"] = {}
                    }
                    vmdChart.tplJSON["tooltip"].dateTimeLabelFormats = {
                        millisecond: b,
                        second: b,
                        minute: b,
                        hour: b,
                        day: b,
                        week: b,
                        month: b,
                        year: b
                    };
                    vmdChart.tplJSON["tooltip"].xDateFormat = b;
                    mychart.update({
                        tooltip: vmdChart.tplJSON["tooltip"]
                    })
                } else if (a.initialConfig.id == "isOpposite") {
                    myAxis.setTitle({
                        x: -20
                    })
                    myAxisInfo.title.x = -20;
                    myAxis.update({
                        opposite: b
                    });
                    myAxisInfo.opposite = b;
                } else if (a.initialConfig.id == "isReversed") {
                    myAxis.update({
                        reversed: b
                    });
                    myAxisInfo.reversed = b;
                } else if (a.initialConfig.id == "titleShow") {
                    elementIsShow(hwAxisTitle.titlePanle, b);
                    if (b) {
                        myAxis.setTitle({
                            text: titleText
                        })
                        myAxisInfo.title.text = titleText;
                    } else {
                        myAxis.setTitle({
                            text: ''
                        })
                        myAxisInfo.title.text = '';
                        hwAxisTitle.titleText.setValue(removeBr(titleText));
                    }
                } else if (a.initialConfig.id == "Titlealign") {
                    myAxis.setTitle({
                        align: b.id,
                        useHTML: true
                    });
                    myAxisInfo.title.align = b.id;
                } else if (a.initialConfig.id == "titleText") {
                    if (hwAxisTitle.ButtonGroup.getSelectIndex() == 2) {
                        var title = addBr(b)
                        myAxis.setTitle({
                            rotation: 0,
                        })
                        myAxisInfo.title.rotation = 0;
                        hwAxisTitle.rotation.setOriValue(myAxisInfo.title.rotation);
                    } else {
                        var title = titleEscape(b);
                    }
                    myAxis.setTitle({
                        text: title,
                        useHTML: true
                    })
                    myAxisInfo.title.text = title;
                    for (var i = 0; i < mychart.axes.length; i++) {
                        if (mychart.axes[i].userOptions.id == myAxis.userOptions.id) {
                            mychart.axes[i].userOptions.title.text = title
                            break
                        }
                    }
                    setLink(axisComlist, getAxisData(mychart.axes), myAxis.userOptions.id);
                    titleText = title;
                } else if (a.initialConfig.id == "tickPosition") {
                    myAxis.update({
                        tickPosition: b.id
                    });
                    myAxisInfo.tickPosition = b.id;
                } else if (a.initialConfig.id == "minorTickPos") {
                    myAxis.update({
                        minorTickPosition: b.id
                    });
                    myAxisInfo.minorTickPosition = b.id;
                } else if (a.initialConfig.id == "lableShow") {
                    elementIsShow(hwAxislable.lablePanel, b)
                    myAxis.update({
                        labels: {
                            enabled: b
                        },
                    });
                    myAxisInfo.labels.enabled = b;
                } else if (a.initialConfig.id == "allowDecimals") {
                    myAxis.update({
                        allowDecimals: b
                    });
                    myAxisInfo.allowDecimals = b;
                } else if (a.initialConfig.id == "laberFormat") {
                    myAxis.update({
                        labels: {
                            format: b
                        },
                    });
                    myAxisInfo.labels.format = b;
                    lastlableFormat = b;
                } else if (a.initialConfig.id == "labelRotation") {
                    myAxis.update({
                        labels: {
                            rotation: b
                        }
                    });
                    myAxisInfo.labels.rotation = b;
                } else if (a.initialConfig.id == "TextShow") {
                    if (b) {
                        // var title = titleText.split('').join('<br>');
                        var title = addBr(titleText)
                    } else {
                        var title = titleText.replace(/<br>/g, "");
                    }
                    myAxis.setTitle({
                        text: title
                    })
                    myAxisInfo.title.text = title;
                    titleText = title;
                }
                mychart.addAxisEventListener();
                mychart.seleBorder.attr(myAxis.getBackRect());
            }
            // 日期格式转换
            function date_replace_dateFormat(sDateFormat) {
                return sDateFormat
                    .replace(/YYYY/i, '%Y')
                    .replace(/YY/i, '%y')
                    .replace(/MM/g, '%m')
                    .replace(/mm/g, "%m")
                    .replace(/AA/g, "%A")
                    .replace(/aa/g, "%a")
                    .replace(/ww/g, "%w")
                    .replace(/DD/i, '%d')
                    .replace(/TT/i, '%t')
                    .replace(/HH/i, '%H')
                    .replace(/MI/i, '%M')
                    .replace(/SS/i, '%S')
                    .replace(/MS/i, '%L')
            };

            function dateFormat_replace_date(sDateFormat) {
                return sDateFormat
                    .replace('%Y', 'YYYY')
                    .replace('%y', 'YY')
                    .replace('%m', 'MM')
                    .replace("%A", 'AA')
                    .replace("%a", 'aa')
                    .replace("%w", 'ww')
                    .replace('%d', 'DD')
                    .replace('%t', 'TT')
                    .replace('%H', 'HH')
                    .replace('%M', 'MI')
                    .replace('%S', 'SS')
                    .replace('%L', 'MS')
            }
            // 标题横竖排显示
            function hwAxisTitle_axisTitleRowChange(sender, row) {
                if (row === 'vertical') { // 竖排
                    var title = addBr(titleText)
                } else if (row === 'horizontal') { // 横排
                    var title = removeBr(titleText)
                }
                myAxis.setTitle({
                    text: title,
                })
                myAxisInfo.title.text = title;
                myAxisInfo.title.show = row;
                titleText = title;
                mychart.addAxisEventListener();
            }
            // 标题与轴线间距离
            function hwAxisTitle_axisTitleOffsetChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                myAxis.setTitle({
                    offset: value,
                    myOffset: value
                });
                myAxisInfo.title.offset = value;
                myAxisInfo.title.myOffset = value;
                mychart.addAxisEventListener();
                mychart.seleBorder.attr(myAxis.getBackRect());
            }
            // 标题水平方向偏移量
            function hwAxisTitle_axisTitleXChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                myAxis.setTitle({
                    x: value
                })
                myAxisInfo.title.x = value;
                mychart.addAxisEventListener();
            }
            // 标题垂直偏移量
            function hwAxisTitle_axisTitleYChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                myAxis.setTitle({
                    y: value
                })
                myAxisInfo.title.y = value;
                mychart.addAxisEventListener();
            }
            // 标题旋转角度
            function hwAxisTitle_axisTitleRotationChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                myAxis.setTitle({
                    rotation: value
                })
                myAxisInfo.title.rotation = value;
                mychart.addAxisEventListener();
            }
            // 标题字体设置
            function hwAxisTitle_axisFontFamityChange(sender, famity) {
                myAxis.setTitle({
                    style: {
                        fontFamily: famity.data.EnName
                    }
                })
                myAxisInfo.title.style.fontFamily = famity.data.EnName;
                mychart.addAxisEventListener();
            }
            // 标题字体颜色设置
            function hwAxisTitle_axisFontColorChange(sender, color) {
                myAxis.setTitle({
                    style: {
                        color: color
                    }
                })
                myAxisInfo.title.style.color = color;
                mychart.addAxisEventListener();
            }
            // 标题字体字号设置
            function hwAxisTitle_axisFontSizeChange(sender, size) {
                myAxis.setTitle({
                    style: {
                        fontSize: size.data.px
                    }
                })
                myAxisInfo.title.style.fontSize = size.data.px;
                mychart.addAxisEventListener();
            }
            // 标题字形设置
            function hwAxisTitle_axisFontStyleChange(sender, style) {
                if (!style.data) {
                    return
                }
                var Style, Weight;
                if (style.data.EnName == 'normal') {
                    Style = "normal";
                    Weight = "normal";
                }
                if (style.data.EnName == 'bold') {
                    Weight = "bold";
                }
                if (style.data.EnName == 'italic') {
                    Style = "italic";
                }
                if (style.data.EnName == 'boldAnditalic') {
                    Style = "italic";
                    Weight = "bold";
                }
                myAxis.setTitle({
                    style: {
                        fontStyle: Style,
                        fontWeight: Weight
                    }
                })
                myAxisInfo.title.style.fontStyle = Style;
                myAxisInfo.title.style.fontWeight = Weight;
                mychart.addAxisEventListener();
            }
            // 轴线宽度设置
            function hwAxisSelf_axisLineWidthChange(sender, value) {
                myAxis.update({
                    lineWidth: value
                });
                myAxisInfo.lineWidth = value;
                mychart.addAxisEventListener();
            }
            // 轴线高度设置
            function hwAxisSelf_axisHeightChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    myAxis.update({
                        height: null
                    });
                    delete myAxisInfo.height;
                    //delete myAxisInfo.tickAmount;
                } else {
                    myAxis.update({
                        height: value
                    });
                    myAxisInfo.height = value;
                    //delete myAxisInfo.tickAmount;
                }
                mychart.seleBorder.attr(myAxis.getBackRect());
                mychart.addAxisEventListener();
            }
            // 轴线颜色设置
            function hwAxisSelf_axisLineColorsChange(sender, color) {
                myAxis.update({
                    lineColor: color
                });
                myAxisInfo.lineColor = color;
                mychart.addAxisEventListener();
            }
            // 轴线顶部位置
            function hwAxisSelf_axisTopChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    myAxis.update({
                        top: 0
                    });
                    myAxisInfo.top = 0;
                } else {
                    myAxis.update({
                        top: value
                    });
                    myAxisInfo.top = value;
                    //myAxisInfo.direction = 'vertical';
                }
                mychart.seleBorder.attr(myAxis.getBackRect());
                mychart.addAxisEventListener();
            }
            // 坐标轴排列方向设置
            function hwAxisSelf_axisDirectionChange(sender, direction) {
                myAxisInfo.direction = direction;
            }
            // 轴下限设置
            function hwAxisSelf_axisFloorChange(sender, value) {
                value = parseFloat(value);
                if (isNaN(value)) {
                    myAxis.update({
                        floor: null
                    });
                    delete myAxisInfo.floor;
                } else {
                    myAxis.update({
                        floor: value
                    });
                    myAxisInfo.floor = value;
                    mychart.addAxisEventListener();
                }
            }
            // 轴上限设置
            function hwAxisSelf_axisCeilingChange(sender, value) {
                if (isNaN(value)) {
                    myAxis.update({
                        ceiling: null
                    });
                    delete myAxisInfo.ceiling;
                } else {
                    myAxis.update({
                        ceiling: value
                    });
                    myAxisInfo.ceiling = value;
                    mychart.addAxisEventListener();
                }
            }
            //轴最大值设置
            function hwAxisSelf_axisMaxChange(sender, value) {
                if (isNaN(value)) {
                    myAxis.update({
                        max: 1
                    });
                    delete myAxisInfo.max;
                } else {
                    myAxis.update({
                        max: value
                    });
                    myAxisInfo.max = value;
                    mychart.addAxisEventListener();
                }
            }
            // 轴最小值设置
            function hwAxisSelf_axisMinChange(sender, value) {
                value = parseFloat(value);
                if (isNaN(value)) {
                    myAxis.update({
                        min: null
                    });
                    delete myAxisInfo.min;
                } else {
                    myAxis.update({
                        min: value
                    });
                    myAxisInfo.min = value;
                    mychart.addAxisEventListener();
                }
            }
            //准星线颜色设置
            function hwAxisSelf_crosshairColorChange(sender, color) {
                myAxis.update({
                    crosshair: {
                        color: color
                    }
                });
                var cross = myAxisInfo.crosshair || {};
                cross.color = color;
                myAxisInfo.crosshair = cross;
                //mychart.addAxisEventListener();
            }
            // 星线宽度设置
            function hwAxisSelf_crosshairWidthChange(sender, value) {
                myAxis.update({
                    crosshair: {
                        width: value
                    }
                });
                var cross = myAxisInfo.crosshair || {};
                cross.width = value;
                myAxisInfo.crosshair = cross;
                //mychart.addAxisEventListener();
            }
            // 准星线线条样式
            function hwAxisSelf_crosshairLineChange(sender, line) {
                myAxis.update({
                    crosshair: {
                        dashStyle: line
                    }
                });
                var cross = myAxisInfo.crosshair || {};
                cross.dashStyle = line;
                myAxisInfo.crosshair = cross;
                //mychart.addAxisEventListener();
            }
            // 轴线偏移量设置
            function hwAxisSelf_axisOffsetChange(sender, value) {
                if (!value) {
                    value = 0;
                }
                myAxis.update({
                    offset: value
                });
                myAxisInfo.offset = value;
                mychart.addAxisEventListener();
                mychart.seleBorder.attr(myAxis.getBackRect());
            }
            // 轴间距设置
            function hwAxisSelf_minPaddingChange(sender, value) {
                myAxis.update({
                    minPadding: value
                });
                myAxisInfo.minPadding = value;
                mychart.addAxisEventListener();
                mychart.seleBorder.attr(myAxis.getBackRect());
            }
            // 主刻度线长度设置
            function hwAxisTick_tickLenghtChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                myAxis.update({
                    tickLength: value
                });
                myAxisInfo.tickLength = value;
                mychart.addAxisEventListener();
            }
            // 主刻度线宽度
            function hwAxisTick_tickWidthChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                myAxis.update({
                    tickWidth: value
                });
                myAxisInfo.tickWidth = value;
                mychart.addAxisEventListener();
            }
            // 主刻度线总数
            function hwAxisTick_tickAmountChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 2;
                    myAxis.update({
                        tickAmount: value
                    });
                    delete myAxisInfo.tickAmount;
                } else {
                    myAxis.update({
                        tickAmount: value
                    });
                    myAxisInfo.tickAmount = value;
                }
                mychart.addAxisEventListener();
            }
            //主刻度线数值间隔设置
            function hwAxisTick_tickIntervalChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 1;
                    delete myAxisInfo.tickInterval
                } else {
                    myAxis.update({
                        tickInterval: value
                    });
                    myAxisInfo.tickInterval = value;
                }
                mychart.addAxisEventListener();
            }
            //主刻度线像素间隔设置
            function hwAxisTick_tickPixelIntervalChange(sender, value) {
                if (!isNaN(parseFloat(value))) {
                    myAxis.update({
                        tickPixelInterval: value,
                    });
                    myAxisInfo.tickPixelInterval = value;
                } else {
                    myAxis.update({
                        tickPixelInterval: null,
                    });
                    delete myAxisInfo.tickPixelInterval;
                }
                mychart.addAxisEventListener();
            }
            // 主刻度线颜色设置
            function hwAxisTick_tickColorsChange(sender, color) {
                myAxis.update({
                    tickColor: color
                });
                myAxisInfo.tickColor = color;
                mychart.addAxisEventListener();
            }
            // 主网格线宽度设置
            function hwAxisTick_gridLineWidthChange(sender, value) {
                myAxis.update({
                    gridLineWidth: value
                });
                myAxisInfo.gridLineWidth = value;
                mychart.addAxisEventListener();
            }
            // 主网格线线条样式设置
            function hwAxisTick_gridLineDashStyleChange(sender, line) {
                myAxis.update({
                    gridLineDashStyle: line
                });
                myAxisInfo.gridLineDashStyle = line;
                mychart.addAxisEventListener();
            }
            // 主网格线颜色设置
            function hwAxisTick_gridLineColorChange(sender, color) {
                myAxis.update({
                    gridLineColor: color
                });
                myAxisInfo.gridLineColor = color;
                mychart.addAxisEventListener();
            }
            // 次刻度线宽度设置
            function hwAxisTick_minorTickWidthChange(sender, value) {
                myAxis.update({
                    minorTickWidth: value
                });
                myAxisInfo.minorTickWidth = value;
                mychart.addAxisEventListener();
            }
            // 次刻度线长度
            function hwAxisTick_minorTickLenghtChange(sender, value) {
                myAxis.update({
                    minorTickLength: value
                });
                myAxisInfo.minorTickLength = value;
                mychart.addAxisEventListener();
            }
            // 次刻度线颜色设置
            function hwAxisTick_minorTickColorChange(sender, color) {
                myAxis.update({
                    minorTickColor: color
                });
                myAxisInfo.minorTickColor = color;
                mychart.addAxisEventListener();
            }
            // 次网格线宽度设置
            function hwAxisTick_minorGridLineWidthChange(sender, value) {
                myAxis.update({
                    minorGridLineWidth: value
                });
                myAxisInfo.minorGridLineWidth = value;
                mychart.addAxisEventListener();
            }
            // 次网格线线条样式设置
            function hwAxisTick_minorGridLineDashStyleChange(sender, line) {
                myAxis.update({
                    minorGridLineDashStyle: line
                });
                myAxisInfo.minorGridLineDashStyle = line;
                mychart.addAxisEventListener();
            }
            // 次网格线颜色设置
            function hwAxisTick_minorGridLineColorChange(sender, color) {
                myAxis.update({
                    minorGridLineColor: color
                });
                myAxisInfo.minorGridLineColor = color;
                mychart.addAxisEventListener();
            }
            // 轴标签水平偏移量设置
            function hwAxislable_lableXChange(sender, value) {
                myAxis.update({
                    labels: {
                        x: value
                    }
                });
                myAxisInfo.labels.x = value;
                mychart.addAxisEventListener();
            }
            // 轴标签垂直偏移量设置
            function hwAxislable_lableYChange(sender, value) {
                myAxis.update({
                    labels: {
                        y: value
                    }
                });
                myAxisInfo.labels.y = value;
                mychart.addAxisEventListener();
            }
            // 轴标签显示行数设置
            function hwAxislable_labelStaggerLinesChange(sender, value) {
                myAxis.update({
                    labels: {
                        staggerLines: value
                    }
                });
                myAxisInfo.labels.staggerLines = value;
                mychart.addAxisEventListener();
            }
            // 轴标签对齐方式设置
            function hwAxislable_lableAlignChange(sender, align) {
                myAxis.update({
                    labels: {
                        align: align
                    }
                });
                myAxisInfo.labels.align = align;
                mychart.addAxisEventListener();
            }
            // 轴标签文本字体设置
            function hwAxislable_fontFamityChange(sender, famity) {
                myAxis.update({
                    labels: {
                        style: {
                            fontFamily: famity.data.EnName
                        }
                    }
                });
                myAxisInfo.labels.style.fontFamily = famity.data.EnName;
                mychart.addAxisEventListener();
            }
            // 轴标签文本字号设置
            function hwAxislable_fontSizeChange(sender, size) {
                myAxis.update({
                    labels: {
                        style: {
                            fontSize: size.data.px
                        }
                    }
                });
                myAxisInfo.labels.style.fontSize = size.data.px;
                mychart.addAxisEventListener();
            }
            // 轴标签文本字形设置
            function hwAxislable_fontStyleChange(sender, style) {
                if (!style.data) {
                    return
                }
                var Style, Weight;
                if (style.data.EnName == 'normal') {
                    Style = "normal";
                    Weight = "normal";
                }
                if (style.data.EnName == 'bold') {
                    Weight = "bold";
                }
                if (style.data.EnName == 'italic') {
                    Style = "italic";
                }
                if (style.data.EnName == 'boldAnditalic') {
                    Style = "italic";
                    Weight = "bold";
                }
                myAxis.update({
                    labels: {
                        style: {
                            fontStyle: Style,
                            fontWeight: Weight
                        }
                    }
                });
                myAxisInfo.labels.style.fontStyle = Style;
                myAxisInfo.labels.style.fontWeight = Weight;
                mychart.addAxisEventListener();
            }
            // 轴标签文本字体颜色设置
            function hwAxislable_fontColorChange(sender, color) {
                myAxis.update({
                    labels: {
                        style: {
                            color: color
                        }
                    }
                });
                myAxisInfo.labels.style.color = color;
                mychart.addAxisEventListener();
            }
            // 轴标签文本旋转角度设置
            function hwAxislable_labelRotationChange(sender, value) {
                if (isNaN(parseFloat(value))) {
                    value = 0;
                }
                myAxis.update({
                    labels: {
                        rotation: value
                    }
                });
                myAxisInfo.labels.rotation = value;
                mychart.addAxisEventListener();
            }
            //轴标签文本显示间隔设置
            function hwAxislable_lableStepChange(sender, value) {
                if (value) {
                    myAxis.update({
                        labels: {
                            step: value
                        }
                    });
                    myAxisInfo.labels.step = value;
                } else {
                    myAxis.update({
                        labels: {
                            step: null
                        }
                    });
                    delete myAxisInfo.labels.step;
                }
                mychart.addAxisEventListener();
            }
            // 添加坐标轴
            function addXAxis_click(sender, e) {
                var id = vmd.getGuid();
                var num = chartXAxis.length;
                var options = {
                    id: id,
                    title: {
                        text: '横轴' + (num + 1)
                    },
                    lineWidth: 1,
                    lineColor: '#ccd6eb',
                    offset: 20 * num,
                }
                chartXAxis.push(options);
                for (var i = 0; i < chartXAxis.length; i++) {
                    if (chartXAxis[i].id === id) {
                        myAxisInfo = chartXAxis[i];
                        break
                    }
                }
                // 初始化新添加轴的初始属性
                vmd.util.applyIf(myAxisInfo, defultAxis);
                vmd.util.applyIf(myAxisInfo.labels, defultAxis.labels);
                vmd.util.applyIf(myAxisInfo.title, defultAxis.title);
                mychart.addAxis(myAxisInfo, true);
            }

            function addMenu_click(sender, menuItem, e) {
                var id = vmd.getGuid();
                if (menuItem.id === 'horizontalAdd') { // 添加横向排列的Y轴
                    var num = chartYAxis.length;
                    var options = {
                        id: id,
                        title: {
                            text: '竖<br>轴<br>' + (num + 1),
                            offset: 20,
                            x: 0,
                            rotation: 0,
                        },
                        lineWidth: 1,
                        lineColor: '#ccd6eb',
                        offset: 20,
                        direction: 'horizontal'
                    }
                    chartYAxis.push(options);
                    for (var i = 0; i < chartYAxis.length; i++) {
                        if (chartYAxis[i].id === id) {
                            myAxisInfo = chartYAxis[i];
                            break
                        }
                    }
                    vmd.util.applyIf(myAxisInfo, defultAxis);
                    vmd.util.applyIf(myAxisInfo.labels, defultAxis.labels);
                    vmd.util.applyIf(myAxisInfo.title, defultAxis.title);
                    mychart.addAxis(myAxisInfo, false);
                } else if (menuItem.id === 'noReverse') { // 添加垂直排列正向显示的Y轴
                    var num = chartYAxis.length;
                    var axisArr = [];
                    var options = {
                        id: id,
                        title: {
                            text: '竖<br>轴<br>' + (num + 1),
                            offset: 20,
                            x: 0,
                            rotation: 0,
                        },
                        opposite: false,
                        lineWidth: 1,
                        lineColor: '#ccd6eb',
                        offset: chartYAxis[0].offset || 0,
                        direction: 'vertical'
                    }
                    chartYAxis.push(options);
                    for (var i = 0; i < chartYAxis.length; i++) {
                        if (chartYAxis[i].id === id) {
                            myAxisInfo = chartYAxis[i];
                            vmd.util.applyIf(myAxisInfo, defultAxis);
                            vmd.util.applyIf(myAxisInfo.labels, defultAxis.labels);
                            vmd.util.applyIf(myAxisInfo.title, defultAxis.title);
                            mychart.addAxis(myAxisInfo, false);
                        }
                        if (!chartYAxis[i].opposite && chartYAxis[i].direction == 'vertical') {
                            axisArr.push(chartYAxis[i])
                        }
                    }
                    // 根据轴的数量自动计算每条轴的高度及位置
                    if (mychart.plotTop && mychart.plotTop > 20) {
                        var ch = 0;
                    } else {
                        var ch = 36 / mychart.clipBox.height * 100;
                    }
                    if (chartInfo.axisSpacing) {
                        var spacing = chartInfo.axisSpacing / mychart.clipBox.height * 100;
                    } else {
                        var spacing = 20 / mychart.clipBox.height * 100;
                    }
                    var n = axisArr.length;
                    var h = Math.round(((100 - ch) - (n - 1) * spacing) / n * 100) / 100;
                    for (var j = 0; j < axisArr.length; j++) {
                        var Axis = mychart.get(axisArr[j].id);
                        if (i == 0) {
                            Axis.update({
                                height: h + "%",
                                top: ch + "%"
                            });
                            axisArr[j].height = h + "%";
                            axisArr[j].top = ch + "%";
                        } else {
                            Axis.update({
                                height: h + "%",
                                top: (h * j + spacing * j + ch) + "%"
                            });
                            axisArr[j].height = h + "%";
                            axisArr[j].top = (h * j + spacing * j + ch) + "%";
                        }
                        axisArr[j].direction = 'vertical';
                    }
                } else if (menuItem.id === 'isReverse') { // 添加垂直排列对面显示的Y轴
                    var num = chartYAxis.length;
                    var axisArr = [];
                    var options = {
                        id: id,
                        title: {
                            text: '竖<br>轴<br>' + (num + 1),
                            offset: 20,
                            x: -20,
                            rotation: 0,
                        },
                        opposite: true,
                        lineWidth: 1,
                        lineColor: '#ccd6eb',
                        offset: chartYAxis[0].offset || 0,
                        direction: 'vertical'
                    }
                    chartYAxis.push(options);
                    for (var i = 0; i < chartYAxis.length; i++) {
                        if (chartYAxis[i].id === id) {
                            myAxisInfo = chartYAxis[i];
                            vmd.util.applyIf(myAxisInfo, defultAxis);
                            vmd.util.applyIf(myAxisInfo.labels, defultAxis.labels);
                            vmd.util.applyIf(myAxisInfo.title, defultAxis.title);
                            mychart.addAxis(myAxisInfo, false);
                        }
                        if (chartYAxis[i].opposite && chartYAxis[i].direction == 'vertical') {
                            axisArr.push(chartYAxis[i])
                        }
                    }
                    if (mychart.plotTop && mychart.plotTop > 20) {
                        var ch = 0;
                    } else {
                        var ch = 36 / mychart.clipBox.height * 100;
                    }
                    if (chartInfo.axisSpacing) {
                        var spacing = chartInfo.axisSpacing / mychart.clipBox.height * 100;
                    } else {
                        var spacing = 20 / mychart.clipBox.height * 100;
                    }
                    var n = axisArr.length;
                    var h = Math.round(((100 - ch) - (n - 1) * spacing) / n * 100) / 100;
                    for (var j = 0; j < axisArr.length; j++) {
                        var Axis = mychart.get(axisArr[j].id);
                        if (i == 0) {
                            Axis.update({
                                height: h + "%",
                                top: ch + "%"
                            });
                            axisArr[j].height = h + "%";
                            axisArr[j].top = ch + "%";
                        } else {
                            Axis.update({
                                height: h + "%",
                                top: (h * j + spacing * j + ch) + "%"
                            });
                            axisArr[j].height = h + "%";
                            axisArr[j].top = (h * j + spacing * j + ch) + "%";
                        }
                        axisArr[j].direction = 'vertical';
                    }
                } else {
                    return
                }
                myAxis = mychart.get(id);
                titleText = myAxisInfo.title.text;
                lastlableFormat = myAxisInfo.labels.format;
                setLink(axisComlist, getAxisData(mychart.axes), id);
                var activeTab = MyTabs1.getActiveTab().title;
                switch (activeTab) {
                    case "标题":
                        setAxisOriTitle();
                        break;
                    case "轴属性":
                        setAxisOriValue();
                        break;
                    case "刻度线":
                        setTickOriValue();
                        break;
                    case "标签":
                        setAxisLableOriValue();
                        break;
                }
                mychart.seleBorder.attr(myAxis.getBackRect());
                mychart.addAxisEventListener();
            }
            // 删除坐标轴
            function delBnt_click(sender, e) {
                Ext.Msg.confirm('提示', '坐标轴删除后，对应的序列也将删除，确认删除此坐标轴吗?', function(bnt) {
                    if (bnt == 'yes') {
                        console.log(myAxis)
                        var id = myAxis.userOptions.id;
                        var coll = myAxis.coll;
                        var index = myAxis.userOptions.index;
                        var direction = myAxis.userOptions.direction || 'horizontal'; //记录要删除的轴是横向还是垂直排列
                        var opposite = myAxis.userOptions.opposite || false; //记录要删除的轴是否是对面显示
                        // 删除对应序列
                        for (var i = 0; i < chartSeries.length; i++) {
                            if (chartSeries[i].yAxis == id || chartSeries[i].yAxis == id) {
                                chartSeries.remove(chartSeries[i])
                                var seriesMapping = vmdChart.tplJSON.data.seriesMapping;
                                seriesMapping.remove(seriesMapping[i]);
                            }
                        }
                        // 删除坐标轴
                        mychart.get(id).remove();
                        if (coll === 'xAxis') {
                            var axisData = chartXAxis;
                        } else if (coll === 'yAxis') {
                            var axisData = chartYAxis;
                        }
                        // 设置被删除轴相邻的轴为当前被操作的轴
                        for (var i = 0; i < axisData.length; i++) {
                            if (axisData[i].id == id) {
                                if (i > 0) {
                                    myAxis = mychart.get(axisData[i - 1].id);
                                    myAxisInfo = axisData[i - 1];
                                }
                                if (i == 0) {
                                    if (axisData[i + 1]) {
                                        myAxis = mychart.get(axisData[i + 1].id);
                                        myAxisInfo = axisData[i + 1];
                                    } else {
                                        myAxis = {}
                                        myAxisInfo = {}
                                    }
                                }
                                axisData.remove(axisData[i]);
                                break
                            }
                        }
                        // 如果被删除的轴是垂直排列的轴，那么重新计算剩余垂直排列轴的高度及位置
                        if (coll === 'yAxis' && direction === 'vertical') {
                            var axisArr = [];
                            for (var i = 0; i < chartYAxis.length; i++) {
                                if (chartYAxis[i].opposite === opposite && chartYAxis[i].direction == 'vertical') {
                                    axisArr.push(chartYAxis[i])
                                }
                            }
                            if (mychart.plotTop && mychart.plotTop > 20) {
                                var ch = 0;
                            } else {
                                var ch = 36 / mychart.clipBox.height * 100;
                            }
                            if (chartInfo.axisSpacing) {
                                var spacing = chartInfo.axisSpacing / mychart.clipBox.height * 100;
                            } else {
                                var spacing = 20 / mychart.clipBox.height * 100;
                            }
                            var n = axisArr.length;
                            var h = Math.round(((100 - ch) - (n - 1) * spacing) / n * 100) / 100;
                            for (var j = 0; j < axisArr.length; j++) {
                                var Axis = mychart.get(axisArr[j].id);
                                if (i == 0) {
                                    Axis.update({
                                        height: h + "%",
                                        top: ch + "%"
                                    });
                                    axisArr[j].height = h + "%";
                                    axisArr[j].top = ch + "%";
                                } else {
                                    Axis.update({
                                        height: h + "%",
                                        top: (h * j + spacing * j + ch) + "%"
                                    });
                                    axisArr[j].height = h + "%";
                                    axisArr[j].top = (h * j + spacing * j + ch) + "%";
                                }
                                axisArr[j].direction = 'vertical';
                            }
                        }
                        vmd.util.applyIf(myAxisInfo, defultAxis);
                        vmd.util.applyIf(myAxisInfo.labels, defultAxis.labels);
                        vmd.util.applyIf(myAxisInfo.title, defultAxis.title);
                        titleText = myAxisInfo.title.text;
                        lastlableFormat = myAxisInfo.labels.format;
                        setLink(axisComlist, getAxisData(mychart.axes), myAxis.userOptions.id);
                        var activeTab = MyTabs1.getActiveTab().title;
                        switch (activeTab) {
                            case "标题":
                                setAxisOriTitle();
                                break;
                            case "轴属性":
                                setAxisOriValue();
                                break;
                            case "刻度线":
                                setTickOriValue();
                                break;
                            case "标签":
                                setAxisLableOriValue();
                                break;
                        }
                        mychart.seleBorder.attr(myAxis.getBackRect());
                        mychart.addAxisEventListener();
                    }
                })
            }
            // 传递数据集
            function getStoreData(store) {
                myStore = store;
                getStore();
                if (MyTabs2.getActiveTab() && MyTabs2.getActiveTab().title === "序列") {
                    setLink(hwSeriesSelf.storeData, storeData, selStore);
                }
            }
            // 图表属性tab页切换
            function MyTabs3_tabchange(sender, tab) {
                vmd.taskRunner(function() {
                    if (chartInfo) return true;
                }, function() {
                    switch (tab.title) {
                        case "图表":
                            setChartValue();
                            break;
                        case "边框背景":
                            setBroderAndBackground();
                            break;
                        case "数据提示框":
                            setTooltip();
                            break;
                    }
                })
            }
            // 横竖轴转换添加<br>
            function addBr(text) {
                if (!text) {
                    return
                }
                var str = removeBr(text);
                var strArr1 = [],
                    strArr2 = [],
                    slicer1, endStr, slicer2, slicer3;
                if (str.indexOf("(") > -1) {
                    slicer1 = "(";
                    slicer2 = ")";
                } else if (str.indexOf("（") > -1) {
                    slicer1 = "（";
                    slicer2 = "）";
                } else {
                    slicer1 = "";
                    slicer2 = "";
                }
                if (slicer1) {
                    strArr1 = str.split(slicer1)[0].split(""); // 括号前面的部分 
                } else {
                    strArr1 = str.split(slicer1);
                }
                var other = str.split(slicer1)[1];
                if (other.split(slicer2)[1]) {
                    strArr2 = other.split(slicer2)[1].split(""); // 括号后面的部分
                }
                // 括号中的部分的处理
                // if (other.split(slicer2)[0].indexOf("/") > -1) {
                //     endStr = other.split(slicer2)[0].split("/");
                //     slicer3 = '/';
                // } else {
                endStr = other.split(slicer2)[0].split(" ");
                slicer3 = '';
                // }
                var reg = /^[\u4e00-\u9fa5]+$/;
                var reg1 = /^[a-zA-Z0-9]/;
                strArr1.forEach(function(item, index) {
                    // if (reg.test(item)) {
                    //     strArr1[index] = '<div style="text-align: center;">' + item + '</div>';
                    // } else if (reg1.test(item) && strArr1[index + 1] && reg.test(strArr1[index + 1])) {
                    //     strArr1[index] = '<div style="text-align: center;">' + item + '</div>';
                    // }
                    strArr1[index] = '<div style="text-align: center;min-width:60px">' + item + '</div>';
                })
                strArr2.forEach(function(item, index) {
                    // if (reg.test(item)) {
                    //     strArr2[index] = '<div style="text-align: center;">' + item + '</div>';
                    // } else if (reg1.test(item) && strArr2[index + 1] && reg.test(strArr2[index + 1])) {
                    //     strArr2[index] = '<div style="text-align: center;">' + item + '</div>';
                    // }
                    strArr2[index] = '<div style="text-align: center;min-width:60px">' + item + '</div>';
                })
                if (slicer1 && slicer2) {
                    if (slicer3) {
                        var str = strArr1.join('') +
                            "<div style='text-align: center;'>" +
                            "<div style='text-align: center; min-width:60px'>" + slicer1 + endStr[0] + "</div>" +
                            "<div style='text-align: center; min-width:60px'>" + slicer3 + "</div>" +
                            "<div style='text-align: center;' min-width:60px>" + endStr[1] + slicer2 + "</div>" +
                            "</div>" + strArr2.join('');
                    } else {
                        var str = strArr1.join('') +
                            "<div style='text-align: center;'>" +
                            "<div style='text-align: center;min-width:60px'>" + slicer1 + endStr[0] + slicer2 + "</div>" +
                            "</div>" + strArr2.join('');
                    }
                } else {
                    var str = strArr1.join('');
                }
                return str;
            }
            // 横竖排转化删除<br>
            function removeBr(srt) {
                // var reg = /<\/?.+?\/?>/g;
                var reg = /<[^>]*>|<\/[^>]*>/gm;
                var s = srt.replace(reg, "")
                s = titleEscape(s);
                return s;
            }
            // 标签转义
            function titleEscape(text) {
                var codeObj = [{
                        num: '1',
                        code: '&#185;'
                    },
                    {
                        num: '2',
                        code: '&#178;'
                    },
                    {
                        num: '3',
                        code: '&#179;'
                    },
                    {
                        num: '4',
                        code: '&#8308;'
                    },
                    {
                        num: '5',
                        code: '&#8309;'
                    },
                    {
                        num: '6',
                        code: '&#8310;'
                    },
                    {
                        num: '7',
                        code: '&#8311;'
                    },
                    {
                        num: '8',
                        code: '&#8312;'
                    },
                    {
                        num: '9',
                        code: '&#8313;'
                    },
                    {
                        num: 'n',
                        code: '&#8319;'
                    },
                    {
                        num: '0',
                        code: '&#8304;'
                    }
                ]
                // 查找un码
                function getCode(str) {
                    for (var i = 0; i < codeObj.length; i++) {
                        if (codeObj[i].num == str) {
                            return codeObj[i].code;
                        }
                    }
                }
                var t = text
                if (text.indexOf("^") != -1) {
                    var strArr = text.split('^');
                    var arr = [];
                    strArr.forEach(function(item, index) {
                        if (index > 0) {
                            if (item.substring(0, 1) == '-') {
                                var v = '&#8315;' + getCode(item.substring(1, 2));
                                var v1 = item.substring(2, item.length)
                                arr.push(v + v1);
                            } else {
                                if (getCode(item.substring(0, 1))) {
                                    var v = getCode(item.substring(0, 1));
                                    var v1 = item.substring(1, item.length)
                                    arr.push(v + v1);
                                } else {
                                    vmd.alert('提示', '该上标数字不存在')
                                }
                            }
                        } else {
                            arr.push(item);
                        }
                    })
                    t = arr.join('');
                }
                return t;
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ChartSeting',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "tabpanel",
                id: "MyTabs",
                activeTab: 3,
                height: 1000,
                width: 320,
                x: 0,
                y: 0,
                region: "center",
                split: true,
                collapseMode: "mini",
                tabchange: "MyTabs_tabchange",
                listeners: {
                    tabchange: MyTabs_tabchange
                },
                items: [{
                        xtype: "panel",
                        id: "panel",
                        title: "标题",
                        header: true,
                        border: true,
                        height: 699,
                        width: 320,
                        layout: "border",
                        items: [{
                            xtype: "vmd.ux.ChartTitle",
                            id: "hwChartTitle",
                            layout: "border",
                            region: "center",
                            width: 321,
                            titleAlignChange: "hwChartTitle_titleAlignChange",
                            titleVerticalAlignChange: "hwChartTitle_titleVerticalAlignChange",
                            titleAlineChange: "hwChartTitle_titleAlineChange",
                            afterrender: "hwChartTitle_afterrender",
                            titleoffsetXChange: "hwChartTitle_titleoffsetXChange",
                            titleoffsetYChange: "hwChartTitle_titleoffsetYChange",
                            listeners: {
                                titleVerticalAlignChange: hwChartTitle_titleVerticalAlignChange,
                                titleAlineChange: hwChartTitle_titleAlineChange,
                                vmdafterrender: hwChartTitle_afterrender,
                                titleoffsetXChange: hwChartTitle_titleoffsetXChange,
                                titleoffsetYChange: hwChartTitle_titleoffsetYChange
                            }
                        }]
                    },
                    {
                        xtype: "panel",
                        id: "panel1",
                        title: "坐标轴",
                        header: true,
                        border: true,
                        height: 100,
                        layout: "border",
                        items: [{
                                xtype: "panel",
                                id: "panel5",
                                layoutConfig: {
                                    align: "middle",
                                    pack: "center"
                                },
                                title: "Panel",
                                header: false,
                                border: false,
                                height: 50,
                                width: 323,
                                region: "north",
                                layout: "hbox",
                                items: [{
                                        xtype: "vmd.button",
                                        id: "addBnt",
                                        type: "text",
                                        size: "large",
                                        icon: " icon-plus",
                                        margins: "0 8 0 0",
                                        click: "addBnt_click",
                                        listeners: {
                                            click: addBnt_click
                                        }
                                    },
                                    {
                                        xtype: "label",
                                        id: "label",
                                        text: "轴名称："
                                    },
                                    {
                                        xtype: "vmd.comlist",
                                        id: "axisComlist",
                                        width: 130,
                                        height: 270,
                                        margins: "12 0 0 0",
                                        cls: "comlist-b",
                                        selectChanged: "axisComlist_selectChanged",
                                        editable: false,
                                        listeners: {
                                            selectChanged: axisComlist_selectChanged
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "delBnt",
                                        type: "text",
                                        size: "large",
                                        icon: "icon-minus",
                                        margins: "0 0 0 12",
                                        click: "delBnt_click",
                                        listeners: {
                                            click: delBnt_click
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: "tabpanel",
                                id: "MyTabs1",
                                activeTab: 0,
                                height: 1200,
                                width: 321,
                                region: "center",
                                tabchange: "MyTabs1_tabchange",
                                listeners: {
                                    tabchange: MyTabs1_tabchange
                                },
                                items: [{
                                        xtype: "panel",
                                        id: "panel6",
                                        title: "标题",
                                        header: true,
                                        border: true,
                                        height: 100,
                                        layout: "anchor",
                                        autoScroll: true,
                                        items: [{
                                            xtype: "vmd.ux.AxisTitle",
                                            id: "hwAxisTitle",
                                            layout: "border",
                                            width: 316,
                                            anchor: "100%",
                                            height: 663,
                                            axisTitleRowChange: "hwAxisTitle_axisTitleRowChange",
                                            axisTitleOffsetChange: "hwAxisTitle_axisTitleOffsetChange",
                                            axisTitleXChange: "hwAxisTitle_axisTitleXChange",
                                            axisTitleYChange: "hwAxisTitle_axisTitleYChange",
                                            axisFontFamityChange: "hwAxisTitle_axisFontFamityChange",
                                            axisFontColorChange: "hwAxisTitle_axisFontColorChange",
                                            axisFontSizeChange: "hwAxisTitle_axisFontSizeChange",
                                            axisFontStyleChange: "hwAxisTitle_axisFontStyleChange",
                                            axisTitleRotationChange: "hwAxisTitle_axisTitleRotationChange",
                                            listeners: {
                                                axisTitleRowChange: hwAxisTitle_axisTitleRowChange,
                                                axisTitleOffsetChange: hwAxisTitle_axisTitleOffsetChange,
                                                axisTitleXChange: hwAxisTitle_axisTitleXChange,
                                                axisTitleYChange: hwAxisTitle_axisTitleYChange,
                                                axisFontFamityChange: hwAxisTitle_axisFontFamityChange,
                                                axisFontColorChange: hwAxisTitle_axisFontColorChange,
                                                axisFontSizeChange: hwAxisTitle_axisFontSizeChange,
                                                axisFontStyleChange: hwAxisTitle_axisFontStyleChange,
                                                axisTitleRotationChange: hwAxisTitle_axisTitleRotationChange
                                            }
                                        }]
                                    },
                                    {
                                        xtype: "panel",
                                        id: "panel7",
                                        title: "轴属性",
                                        header: true,
                                        border: true,
                                        height: 100,
                                        layout: "anchor",
                                        autoScroll: true,
                                        items: [{
                                            xtype: "vmd.ux.AxisSelf",
                                            id: "hwAxisSelf",
                                            layout: "border",
                                            anchor: "100%",
                                            height: 730,
                                            axisLineWidthChange: "hwAxisSelf_axisLineWidthChange",
                                            axisHeightChange: "hwAxisSelf_axisHeightChange",
                                            axisLineColorsChange: "hwAxisSelf_axisLineColorsChange",
                                            axisTopChange: "hwAxisSelf_axisTopChange",
                                            axisFloorChange: "hwAxisSelf_axisFloorChange",
                                            axisOffsetChange: "hwAxisSelf_axisOffsetChange",
                                            minPadding: "hwAxisSelf_minPadding",
                                            minPaddingChange: "hwAxisSelf_minPaddingChange",
                                            crosshairColorChange: "hwAxisSelf_crosshairColorChange",
                                            crosshairWidthChange: "hwAxisSelf_crosshairWidthChange",
                                            crosshairLineChange: "hwAxisSelf_crosshairLineChange",
                                            axisCeilingChange: "hwAxisSelf_axisCeilingChange",
                                            axisMinChange: "hwAxisSelf_axisMinChange",
                                            axisMaxChange: "hwAxisSelf_axisMaxChange",
                                            axisDirectionChange: "hwAxisSelf_axisDirectionChange",
                                            listeners: {
                                                axisLineWidthChange: hwAxisSelf_axisLineWidthChange,
                                                axisHeightChange: hwAxisSelf_axisHeightChange,
                                                axisLineColorsChange: hwAxisSelf_axisLineColorsChange,
                                                axisTopChange: hwAxisSelf_axisTopChange,
                                                axisFloorChange: hwAxisSelf_axisFloorChange,
                                                axisOffsetChange: hwAxisSelf_axisOffsetChange,
                                                minPaddingChange: hwAxisSelf_minPaddingChange,
                                                crosshairColorChange: hwAxisSelf_crosshairColorChange,
                                                crosshairWidthChange: hwAxisSelf_crosshairWidthChange,
                                                crosshairLineChange: hwAxisSelf_crosshairLineChange,
                                                axisCeilingChange: hwAxisSelf_axisCeilingChange,
                                                axisMinChange: hwAxisSelf_axisMinChange,
                                                axisMaxChange: hwAxisSelf_axisMaxChange,
                                                axisDirectionChange: hwAxisSelf_axisDirectionChange
                                            }
                                        }]
                                    },
                                    {
                                        xtype: "panel",
                                        id: "panel8",
                                        title: "刻度线",
                                        header: true,
                                        border: true,
                                        layout: "anchor",
                                        autoScroll: true,
                                        items: [{
                                            xtype: "vmd.ux.AxisTick",
                                            id: "hwAxisTick",
                                            layout: "border",
                                            anchor: "100%",
                                            height: 800,
                                            tickLenghtChange: "hwAxisTick_tickLenghtChange",
                                            tickColorsChange: "hwAxisTick_tickColorsChange",
                                            gridLineWidthChange: "hwAxisTick_gridLineWidthChange",
                                            gridLineDashStyleChange: "hwAxisTick_gridLineDashStyleChange",
                                            gridLineColorChange: "hwAxisTick_gridLineColorChange",
                                            minorTickWidthChange: "hwAxisTick_minorTickWidthChange",
                                            tickWidthChange: "hwAxisTick_tickWidthChange",
                                            minorTickLenghtChange: "hwAxisTick_minorTickLenghtChange",
                                            minorTickColorChange: "hwAxisTick_minorTickColorChange",
                                            minorGridLineWidthChange: "hwAxisTick_minorGridLineWidthChange",
                                            minorGridLineDashStyleChange: "hwAxisTick_minorGridLineDashStyleChange",
                                            minorGridLineColorChange: "hwAxisTick_minorGridLineColorChange",
                                            tickIntervalChange: "hwAxisTick_tickIntervalChange",
                                            tickAmountChange: "hwAxisTick_tickAmountChange",
                                            tickPixelIntervalChange: "hwAxisTick_tickPixelIntervalChange",
                                            listeners: {
                                                tickLenghtChange: hwAxisTick_tickLenghtChange,
                                                tickColorsChange: hwAxisTick_tickColorsChange,
                                                gridLineWidthChange: hwAxisTick_gridLineWidthChange,
                                                gridLineDashStyleChange: hwAxisTick_gridLineDashStyleChange,
                                                gridLineColorChange: hwAxisTick_gridLineColorChange,
                                                minorTickWidthChange: hwAxisTick_minorTickWidthChange,
                                                tickWidthChange: hwAxisTick_tickWidthChange,
                                                minorTickLenghtChange: hwAxisTick_minorTickLenghtChange,
                                                minorTickColorChange: hwAxisTick_minorTickColorChange,
                                                minorGridLineWidthChange: hwAxisTick_minorGridLineWidthChange,
                                                minorGridLineDashStyleChange: hwAxisTick_minorGridLineDashStyleChange,
                                                minorGridLineColorChange: hwAxisTick_minorGridLineColorChange,
                                                tickIntervalChange: hwAxisTick_tickIntervalChange,
                                                tickAmountChange: hwAxisTick_tickAmountChange,
                                                tickPixelIntervalChange: hwAxisTick_tickPixelIntervalChange
                                            }
                                        }]
                                    },
                                    {
                                        xtype: "panel",
                                        id: "panel9",
                                        title: "标签",
                                        header: true,
                                        border: true,
                                        height: 100,
                                        layout: "anchor",
                                        autoScroll: true,
                                        items: [{
                                            xtype: "vmd.ux.Axislable",
                                            id: "hwAxislable",
                                            layout: "border",
                                            anchor: "100%",
                                            height: 600,
                                            lableXChange: "hwAxislable_lableXChange",
                                            lableYChange: "hwAxislable_lableYChange",
                                            labelStaggerLinesChange: "hwAxislable_labelStaggerLinesChange",
                                            lableAlignChange: "hwAxislable_lableAlignChange",
                                            fontFamityChange: "hwAxislable_fontFamityChange",
                                            fontSizeChange: "hwAxislable_fontSizeChange",
                                            fontStyleChange: "hwAxislable_fontStyleChange",
                                            fontColorChange: "hwAxislable_fontColorChange",
                                            labelRotationChange: "hwAxislable_labelRotationChange",
                                            lableStepChange: "hwAxislable_lableStepChange",
                                            listeners: {
                                                lableXChange: hwAxislable_lableXChange,
                                                lableYChange: hwAxislable_lableYChange,
                                                labelStaggerLinesChange: hwAxislable_labelStaggerLinesChange,
                                                lableAlignChange: hwAxislable_lableAlignChange,
                                                fontFamityChange: hwAxislable_fontFamityChange,
                                                fontSizeChange: hwAxislable_fontSizeChange,
                                                fontStyleChange: hwAxislable_fontStyleChange,
                                                fontColorChange: hwAxislable_fontColorChange,
                                                labelRotationChange: hwAxislable_labelRotationChange,
                                                lableStepChange: hwAxislable_lableStepChange
                                            }
                                        }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: "panel",
                        id: "panel2",
                        title: "图例",
                        header: true,
                        border: true,
                        height: 100,
                        layout: "border",
                        items: [{
                            xtype: "vmd.ux.Legend",
                            id: "hwLegend",
                            layout: "border",
                            region: "center",
                            width: 318,
                            legendLoyoutChange: "hwLegend_legendLoyoutChange",
                            legendAlineChange: "hwLegend_legendAlineChange",
                            legendVerticalAlignChange: "hwLegend_legendVerticalAlignChange",
                            legendoffsetXChange: "hwLegend_legendoffsetXChange",
                            legendoffsetYChange: "hwLegend_legendoffsetYChange",
                            legendWidthChange: "hwLegend_legendWidthChange",
                            legendItemWidthChange: "hwLegend_legendItemWidthChange",
                            legPaddingChange: "hwLegend_legPaddingChange",
                            legMarginChange: "hwLegend_legMarginChange",
                            afterrender: "hwLegend_afterrender",
                            listeners: {
                                legendLoyoutChange: hwLegend_legendLoyoutChange,
                                legendAlineChange: hwLegend_legendAlineChange,
                                legendVerticalAlignChange: hwLegend_legendVerticalAlignChange,
                                legendoffsetXChange: hwLegend_legendoffsetXChange,
                                legendoffsetYChange: hwLegend_legendoffsetYChange,
                                legendWidthChange: hwLegend_legendWidthChange,
                                legendItemWidthChange: hwLegend_legendItemWidthChange,
                                legPaddingChange: hwLegend_legPaddingChange,
                                legMarginChange: hwLegend_legMarginChange,
                                vmdafterrender: hwLegend_afterrender
                            }
                        }]
                    },
                    {
                        xtype: "panel",
                        id: "panel3",
                        title: "序列",
                        header: true,
                        border: true,
                        height: 100,
                        layout: "border",
                        items: [{
                                xtype: "panel",
                                id: "panel10",
                                layoutConfig: {
                                    align: "middle",
                                    pack: "center"
                                },
                                title: "Panel",
                                header: false,
                                border: false,
                                height: 50,
                                width: 323,
                                region: "north",
                                layout: "hbox",
                                items: [{
                                        xtype: "vmd.button",
                                        id: "addSeries",
                                        type: "text",
                                        size: "large",
                                        icon: " icon-plus",
                                        margins: "0 8 0 0",
                                        click: "addSeries_click",
                                        listeners: {
                                            click: addSeries_click
                                        }
                                    },
                                    {
                                        xtype: "label",
                                        id: "label1",
                                        text: "序列名："
                                    },
                                    {
                                        xtype: "vmd.comlist",
                                        id: "seriesComlist",
                                        width: 130,
                                        height: 270,
                                        margins: "12 0 0 0",
                                        cls: "comlist-b",
                                        editable: false,
                                        selectChanged: "seriesComlist_selectChanged",
                                        listeners: {
                                            selectChanged: seriesComlist_selectChanged
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "delSeries",
                                        type: "text",
                                        size: "large",
                                        icon: "icon-minus",
                                        margins: "0 0 0 12",
                                        click: "delSeries_click",
                                        listeners: {
                                            click: delSeries_click
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: "tabpanel",
                                id: "MyTabs2",
                                activeTab: 1,
                                height: 1000,
                                width: 321,
                                region: "center",
                                tabchange: "MyTabs2_tabchange",
                                listeners: {
                                    tabchange: MyTabs2_tabchange
                                },
                                items: [{
                                        xtype: "panel",
                                        id: "panel11",
                                        title: "序列",
                                        header: true,
                                        border: true,
                                        height: 911,
                                        layout: "anchor",
                                        autoScroll: true,
                                        items: [{
                                            xtype: "vmd.ux.SeriesSelf",
                                            id: "hwSeriesSelf",
                                            layout: "border",
                                            anchor: "100%",
                                            height: 500,
                                            gatherInternalChange: "hwSeriesSelf_gatherInternalChange",
                                            listeners: {
                                                gatherInternalChange: hwSeriesSelf_gatherInternalChange
                                            }
                                        }]
                                    },
                                    {
                                        xtype: "panel",
                                        id: "panel12",
                                        title: "分类属性",
                                        header: true,
                                        border: true,
                                        height: 100,
                                        layout: "anchor",
                                        autoScroll: true,
                                        width: 320,
                                        items: [{
                                            xtype: "vmd.ux.SeriesClass",
                                            id: "hwSeriesClass",
                                            layout: "border",
                                            anchor: "100%",
                                            height: 1000,
                                            LineStyleChange: "hwSeriesClass_LineStyleChange",
                                            lineWidthChange: "hwSeriesClass_lineWidthChange",
                                            lineColorChange: "hwSeriesClass_lineColorChange",
                                            pointRadiusChange: "hwSeriesClass_pointRadiusChange",
                                            ponLinWidthChange: "hwSeriesClass_ponLinWidthChange",
                                            ponLinColorChange: "hwSeriesClass_ponLinColorChange",
                                            ponFillColorChange: "hwSeriesClass_ponFillColorChange",
                                            columnBorderWidthChange: "hwSeriesClass_columnBorderWidthChange",
                                            columnBorderRadiusChange: "hwSeriesClass_columnBorderRadiusChange",
                                            columnBorderColorChange: "hwSeriesClass_columnBorderColorChange",
                                            peiInnerSizeChange: "hwSeriesClass_peiInnerSizeChange",
                                            areaColorChange: "hwSeriesClass_areaColorChange",
                                            maxPointWidthChange: "hwSeriesClass_maxPointWidthChange",
                                            width: 317,
                                            listeners: {
                                                LineStyleChange: hwSeriesClass_LineStyleChange,
                                                lineWidthChange: hwSeriesClass_lineWidthChange,
                                                lineColorChange: hwSeriesClass_lineColorChange,
                                                pointRadiusChange: hwSeriesClass_pointRadiusChange,
                                                ponLinWidthChange: hwSeriesClass_ponLinWidthChange,
                                                ponLinColorChange: hwSeriesClass_ponLinColorChange,
                                                ponFillColorChange: hwSeriesClass_ponFillColorChange,
                                                columnBorderWidthChange: hwSeriesClass_columnBorderWidthChange,
                                                columnBorderRadiusChange: hwSeriesClass_columnBorderRadiusChange,
                                                columnBorderColorChange: hwSeriesClass_columnBorderColorChange,
                                                peiInnerSizeChange: hwSeriesClass_peiInnerSizeChange,
                                                areaColorChange: hwSeriesClass_areaColorChange,
                                                maxPointWidthChange: hwSeriesClass_maxPointWidthChange
                                            }
                                        }]
                                    },
                                    {
                                        xtype: "panel",
                                        id: "panel13",
                                        title: "数据标注",
                                        header: true,
                                        border: true,
                                        height: 100,
                                        layout: "anchor",
                                        autoScroll: true,
                                        items: [{
                                            xtype: "vmd.ux.Serieslable",
                                            id: "hwSerieslable",
                                            layout: "border",
                                            anchor: "100%",
                                            height: 600,
                                            seriesLableAlignChange: "hwSerieslable_seriesLableAlignChange",
                                            seriesLableVarAlignChange: "hwSerieslable_seriesLableVarAlignChange",
                                            seriesLableXchange: "hwSerieslable_seriesLableXchange",
                                            seriesLableYchange: "hwSerieslable_seriesLableYchange",
                                            FontFamitychange: "hwSerieslable_FontFamitychange",
                                            FontSizechange: "hwSerieslable_FontSizechange",
                                            FontStylechange: "hwSerieslable_FontStylechange",
                                            FontColorchange: "hwSerieslable_FontColorchange",
                                            seriesLableDistance: "hwSerieslable_seriesLableDistance",
                                            listeners: {
                                                seriesLableAlignChange: hwSerieslable_seriesLableAlignChange,
                                                seriesLableVarAlignChange: hwSerieslable_seriesLableVarAlignChange,
                                                seriesLableXchange: hwSerieslable_seriesLableXchange,
                                                seriesLableYchange: hwSerieslable_seriesLableYchange,
                                                FontFamitychange: hwSerieslable_FontFamitychange,
                                                FontSizechange: hwSerieslable_FontSizechange,
                                                FontStylechange: hwSerieslable_FontStylechange,
                                                FontColorchange: hwSerieslable_FontColorchange,
                                                seriesLableDistance: hwSerieslable_seriesLableDistance
                                            }
                                        }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: "panel",
                        id: "panel4",
                        title: "图表",
                        header: true,
                        border: true,
                        height: 100,
                        layout: "border",
                        items: [{
                            xtype: "tabpanel",
                            id: "MyTabs3",
                            activeTab: 0,
                            height: 1000,
                            width: 321,
                            region: "center",
                            tabchange: "MyTabs3_tabchange",
                            listeners: {
                                tabchange: MyTabs3_tabchange
                            },
                            items: [{
                                    xtype: "panel",
                                    id: "panel14",
                                    title: "图表",
                                    header: true,
                                    border: true,
                                    height: 911,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.ChartTb",
                                        id: "hwChartTb",
                                        layout: "border",
                                        chartWidthChange: "hwChartTb_chartWidthChange",
                                        chartHeightChange: "hwChartTb_chartHeightChange",
                                        chartTopMarginChange: "hwChartTb_chartTopMarginChange",
                                        chartBottomMarginChange: "hwChartTb_chartBottomMarginChange",
                                        chartLeftMarginChange: "hwChartTb_chartLeftMarginChange",
                                        chartRightMarginChange: "hwChartTb_chartRightMarginChange",
                                        chartminWidthChange: "hwChartTb_chartminWidthChange",
                                        chartminHeightChange: "hwChartTb_chartminHeightChange",
                                        chartSpacingChange: "hwChartTb_chartSpacingChange",
                                        listeners: {
                                            chartWidthChange: hwChartTb_chartWidthChange,
                                            chartHeightChange: hwChartTb_chartHeightChange,
                                            chartTopMarginChange: hwChartTb_chartTopMarginChange,
                                            chartBottomMarginChange: hwChartTb_chartBottomMarginChange,
                                            chartLeftMarginChange: hwChartTb_chartLeftMarginChange,
                                            chartRightMarginChange: hwChartTb_chartRightMarginChange,
                                            chartminHeightChange: hwChartTb_chartminHeightChange,
                                            chartSpacingChange: hwChartTb_chartSpacingChange
                                        }
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "panel15",
                                    title: "边框背景",
                                    header: true,
                                    border: true,
                                    height: 100,
                                    layout: "fit",
                                    items: [{
                                        xtype: "vmd.ux.ChartBorder",
                                        id: "hwChartBorder",
                                        layout: "border",
                                        tbBroderWidthChange: "hwChartBorder_tbBroderWidthChange",
                                        htBroderWidthChange: "hwChartBorder_htBroderWidthChange",
                                        tbBorderRadiusChange: "hwChartBorder_tbBorderRadiusChange",
                                        backColorChange: "hwChartBorder_backColorChange",
                                        borderColorChange: "hwChartBorder_borderColorChange",
                                        plotBackColorChange: "hwChartBorder_plotBackColorChange",
                                        plotBorderColorChange: "hwChartBorder_plotBorderColorChange",
                                        listeners: {
                                            tbBroderWidthChange: hwChartBorder_tbBroderWidthChange,
                                            htBroderWidthChange: hwChartBorder_htBroderWidthChange,
                                            tbBorderRadiusChange: hwChartBorder_tbBorderRadiusChange,
                                            backColorChange: hwChartBorder_backColorChange,
                                            borderColorChange: hwChartBorder_borderColorChange,
                                            plotBackColorChange: hwChartBorder_plotBackColorChange,
                                            plotBorderColorChange: hwChartBorder_plotBorderColorChange
                                        }
                                    }]
                                },
                                {
                                    xtype: "panel",
                                    id: "panel16",
                                    title: "数据提示框",
                                    header: true,
                                    border: true,
                                    height: 100,
                                    items: [{
                                        xtype: "vmd.ux.ToolTip",
                                        id: "hwToolTip",
                                        layout: "border",
                                        valueDecimalsChange: "hwToolTip_valueDecimalsChange",
                                        listeners: {
                                            valueDecimalsChange: hwToolTip_valueDecimalsChange
                                        }
                                    }]
                                }
                            ]
                        }]
                    }
                ]
            },
            {
                xtype: "vmd.menu",
                id: "addMenu",
                width: 100,
                hidden: true,
                floating: true,
                click: "addMenu_click",
                listeners: {
                    click: addMenu_click
                },
                items: [{
                        xtype: "menuitem",
                        id: "addXAxis",
                        width: 100,
                        text: "添加X轴",
                        hidden: false,
                        click: "addXAxis_click",
                        listeners: {
                            click: addXAxis_click
                        }
                    },
                    {
                        xtype: "menuitem",
                        id: "addYaxis",
                        width: 100,
                        text: "添加Y轴",
                        hidden: false,
                        items: [{
                            xtype: "vmd.menu",
                            id: "addY",
                            width: 100,
                            hidden: true,
                            floating: true,
                            click: "addMenu_click",
                            listeners: {
                                click: addMenu_click
                            },
                            items: [{
                                    xtype: "menuitem",
                                    id: "horizontalAdd",
                                    width: 100,
                                    text: "横向添加",
                                    hidden: false
                                },
                                {
                                    xtype: "menuitem",
                                    id: "verticalAdd",
                                    width: 100,
                                    text: "纵向添加",
                                    hidden: false,
                                    items: [{
                                        xtype: "vmd.menu",
                                        id: "hwMenu",
                                        width: 100,
                                        hidden: true,
                                        floating: true,
                                        click: "addMenu_click",
                                        listeners: {
                                            click: addMenu_click
                                        },
                                        items: [{
                                                xtype: "menuitem",
                                                id: "noReverse",
                                                width: 100,
                                                text: "左侧添加",
                                                hidden: false
                                            },
                                            {
                                                xtype: "menuitem",
                                                id: "isReverse",
                                                width: 100,
                                                text: "右侧添加",
                                                hidden: false
                                            }
                                        ]
                                    }]
                                }
                            ]
                        }]
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.bindChart = function(name, obj, itemEl, store) {
            //直接填写方法内容
            getChart(name, obj, itemEl, store);
        }
        this.receiveStoreData = function(store) {
            //直接填写方法内容
            getStoreData(store)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ChartSeting");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ChartSeting");
    }
})