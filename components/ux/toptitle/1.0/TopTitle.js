Ext.define('vmd.ux.topTitle.Controller', {
    xtype: 'vmd.ux.topTitle.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.TopTitle", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.FontFamitylist$1.0$FontFamitylist", "vmd.ux.FontSizelist$1.0$FontSizelist", "vmd.ux.FontColor$1.0$FontColor"]),
    version: "1.0",
    xtype: "vmd.ux.TopTitle",
    title: "Panel",
    header: false,
    border: false,
    layout: "column",
    afterrender: "TopTitle_afterrender",
    style: "border-bottom: 1px solid #ddd;",
    autoHeight: true,
    listeners: {
        vmdafterrender: function() {
            this.TopTitle_afterrender(this)
        }
    },
    uxCss: ".node-color{    background-color: #eee;}",
    uxrequirecss: "[\"components/ux/toptitle/1.0/css/iconfont.css\"]",
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
        LazyLoad.css(vmd.virtualPath + '/components/ux/toptitle/1.0/css/iconfont.css');
        var page = this;
        var styleObj = {
            fontStyle: 'normal',
            fontWeight: 'normal'
        }
        var showObj = {
            titleIsShow: true,
            xAxisIsShow: true,
            yAxisIsShow: true,
            legendShow: true
        };
        var objName, vmdChart, mychart, chartTitle, chartSeries, chartInfo, chartXAxis, chartTooltip,
            chartYAxis, chartLenged, myAxis, oriTitle, AxisInfo, propertyCom;
        // 鼠标移入显示标题
        function TopTitle_afterrender(sender) {
            vmd.utils.tooltip("[data-tooltip]");
        }
        // 字体设置
        function FontFamitylist_fontChagen(sender, font) {
            // 标题对象
            // if(objName === "title" || objName === "chart") {
            mychart.setTitle({
                style: {
                    fontFamily: font
                }
            });
            chartTitle.style.fontFamily = font;
            // }
            // 坐标轴对象axis
            // if(objName === "axis") {
            //     if(myAxis.userOptions.title.text == '' || myAxis.userOptions.title.text == null) {
            //         // Tips.tips('坐标轴标题未显示', "error");
            //         return
            //     }
            //     myAxis.setTitle({
            //         style: {
            //             fontFamily: font
            //         }
            //     })
            //     AxisInfo.title.style.fontFamily = font;
            // }
            mychart.addTitleEventListener(); // 曲线属性重绘后需要重新绑定监听事件
            page.fireEvent("fontFamityChange", sender, font);
        }
        // 字号设置
        function FontSizelist_fontChagen(sender, font) {
            // 标题对象
            // if(objName === "title" || objName === "chart") {
            mychart.setTitle({
                style: {
                    fontSize: font
                }
            });
            chartTitle.style.fontSize = font;
            // if(objName === "title") {
            var TitleData = mychart.title.element.getBBox(null, 0)
            mychart.seleBorder.attr({
                width: parseInt(TitleData.width) + 10,
                height: parseInt(TitleData.height) + 10,
                x: parseInt(TitleData.x) - 5,
                y: parseInt(TitleData.y) - 5
            })
            // }
            // }
            // 坐标轴对象axis
            // if(objName === "axis") {
            //     if(myAxis.userOptions.title.text == '' || myAxis.userOptions.title.text == null) {
            //         // Tips.tips('坐标轴标题未显示', "error");
            //         return
            //     }
            //     myAxis.setTitle({
            //         style: {
            //             fontSize: font
            //         }
            //     })
            //     AxisInfo.title.style.fontSize = font;
            // }
            mychart.addTitleEventListener();
            page.fireEvent("fontSizeChange", sender, font);
        }
        // 颜色设置
        function hwFontColor_fontColorChange(sender, color) {
            if (objName == "undefined") {
                return
            }
            // 标题对象
            // if(objName === "title" || objName === "chart") {
            mychart.setTitle({
                style: {
                    color: color
                }
            });
            chartTitle.style.color = color;
            // }
            // 坐标轴对象axis
            // if(objName === "axis") {
            //     if(myAxis.userOptions.title.text == '' || myAxis.userOptions.title.text == null) {
            //         // Tips.tips('坐标轴标题未显示', "error");
            //         return
            //     }
            //     myAxis.setTitle({
            //         style: {
            //             color: color
            //         }
            //     })
            //     AxisInfo.title.style.color = color;
            // }
            mychart.addTitleEventListener();
            page.fireEvent("fontColorChange", sender, color);
        }
        // 字形设置
        function hwDataView1_click(sender, index, node, e) {
            if (objName == "undefined") {
                return
            }
            var off = node.getAttribute('data-off'); // 定义变量记录属性变化
            if (index === 0) {
                if (off === "0") { // 加粗
                    styleObj.fontWeight = 'bold';
                    node.setAttribute('data-off', '1')
                } else if (off === "1") {
                    styleObj.fontWeight = 'normal';
                    node.setAttribute('data-off', '0');
                }
                $(node).toggleClass("node-color");
            }
            if (index === 1) {
                if (off === "0") { // 倾斜
                    styleObj.fontStyle = 'italic';
                    node.setAttribute('data-off', '1')
                } else if (off === "1") {
                    styleObj.fontStyle = 'normal';
                    node.setAttribute('data-off', '0')
                }
                $(node).toggleClass("node-color");
            }
            // 标题对象
            // if(objName === "title" || objName === "chart") {
            mychart.setTitle({
                style: {
                    fontStyle: styleObj.fontStyle,
                    fontWeight: styleObj.fontWeight
                }
            });
            chartTitle.style.fontStyle = styleObj.fontStyle;
            chartTitle.style.fontWeight = styleObj.fontWeight;
            // }
            // 坐标轴对象axis
            // if(objName === "axis") {
            //     if(myAxis.userOptions.title.text == '' || myAxis.userOptions.title.text == null) {
            //         // Tips.tips('坐标轴标题未显示', "error");
            //         return
            //     }
            //     myAxis.setTitle({
            //         style: {
            //             fontStyle: styleObj.fontStyle,
            //             fontWeight: styleObj.fontWeight
            //         }
            //     })
            //     AxisInfo.title.style.fontStyle = styleObj.fontStyle;
            //     AxisInfo.title.style.fontWeight = styleObj.fontWeight;
            // }
            mychart.addTitleEventListener();
            page.fireEvent("fontStyleChange", sender, styleObj);
        }
        // 曲线类型设置
        function hwDataView_click(sender, index, node, e) {
            if (objName == "undefined") {
                return
            }
            var type = node.getAttribute("data-type");
            hwDataView.all.elements.forEach(function(item) {
                $(item).removeClass("node-color")
            })
            $(node).addClass("node-color");
            for (var i = 0; i < chartSeries.length; i++) {
                if (chartSeries[i].type) {
                    chartSeries[i].type = type;
                    if (type == 'scatter') { // 如果是散点图，线宽设置为0
                        chartSeries[i].lineWidth = 0;
                    } else {
                        chartSeries[i].lineWidth = 2;
                    }
                }
            }
            mychart.update({
                chart: {
                    type: type
                },
                series: chartSeries
            });
            chartInfo.type = type;
            if (propertyCom && propertyCom.MyTabs2.activeTab.title === '分类属性') {
                propertyCom.hwSeriesClass.seriType.setValue(type);
            }
            mychart.addChartEventListener();
            page.fireEvent("chartTypeChange", sender, type)
        }
        // 显示隐藏操作
        function hwDataView2_click(sender, index, node, e) {
            var isShow = node.getAttribute("data-show");
            if (index === 0) { // 标题
                if (isShow === "0") {
                    showObj.titleIsShow = true;
                    node.setAttribute('data-show', '1');
                    node.setAttribute('data-tooltip', '隐藏标题');
                    var t = oriTitle;
                } else if (isShow === "1") {
                    showObj.titleIsShow = false;
                    node.setAttribute('data-show', '0');
                    node.setAttribute('data-tooltip', '显示标题');
                    var t = ''
                }
                $(node).toggleClass("node-color");
                // 标题显示隐藏
                mychart.setTitle({
                    text: t
                });
                chartTitle.text = t;
                mychart.addTitleEventListener();
            }
            if (index === 1) { // X轴
                if (isShow === "0") {
                    showObj.xAxisIsShow = true;
                    node.setAttribute('data-show', '1');
                    node.setAttribute('data-tooltip', '隐藏X轴');
                } else if (isShow === "1") {
                    showObj.xAxisIsShow = false;
                    node.setAttribute('data-show', '0');
                    node.setAttribute('data-tooltip', '显示X轴');
                }
                $(node).toggleClass("node-color");
                // X轴显示隐藏操作
                mychart.xAxis.forEach(function(item, index) {
                    item.update({
                        visible: showObj.xAxisIsShow
                    });
                    chartXAxis[index].visible = showObj.xAxisIsShow;
                    if (propertyCom && propertyCom.MyTabs1.activeTab.title === '轴属性') {
                        propertyCom.hwAxisSelf.axisShow.checked = showObj.xAxisIsShow;
                        propertyCom.hwAxisSelf.axisShow.setValue(showObj.xAxisIsShow);
                        elementIsShow(propertyCom.hwAxisSelf.axisPanel, showObj.xAxisIsShow)
                        elementIsShow(propertyCom.hwAxisSelf.isOpposite, showObj.xAxisIsShow)
                    }
                })
                mychart.addAxisEventListener();
            }
            if (index === 2) { // Y轴
                if (isShow === "0") {
                    showObj.yAxisIsShow = true;
                    node.setAttribute('data-show', '1');
                    node.setAttribute('data-tooltip', '隐藏Y轴');
                } else if (isShow === "1") {
                    showObj.yAxisIsShow = false;
                    node.setAttribute('data-show', '0');
                    node.setAttribute('data-tooltip', '显示Y轴');
                }
                $(node).toggleClass("node-color");
                // Y轴显示隐藏操作
                mychart.yAxis.forEach(function(item, index) {
                    item.update({
                        visible: showObj.yAxisIsShow
                    });
                    chartYAxis[index].visible = showObj.yAxisIsShow;
                    if (propertyCom && propertyCom.MyTabs1.activeTab.title === '轴属性') {
                        propertyCom.hwAxisSelf.axisShow.checked = showObj.xAxisIsShow;
                        propertyCom.hwAxisSelf.axisShow.setValue(showObj.xAxisIsShow);
                        elementIsShow(propertyCom.hwAxisSelf.axisPanel, showObj.xAxisIsShow)
                        elementIsShow(propertyCom.hwAxisSelf.isOpposite, showObj.xAxisIsShow)
                    }
                })
                mychart.addAxisEventListener();
            }
            if (index === 3) { // 图例
                if (isShow === "0") {
                    showObj.legendShow = true;
                    node.setAttribute('data-show', '1');
                    node.setAttribute('data-tooltip', '隐藏图例');
                } else if (isShow === "1") {
                    showObj.legendShow = false;
                    node.setAttribute('data-show', '0');
                    node.setAttribute('data-tooltip', '显示图例');
                }
                $(node).toggleClass("node-color");
                // 图例显示隐藏操作
                mychart.update({
                    legend: {
                        enabled: showObj.legendShow
                    }
                });
                chartLenged.enabled = showObj.legendShow;
                mychart.addLegendEventListener()
            }
            vmd.utils.tooltip("[data-tooltip]");
            page.fireEvent("isShowChange", sender, showObj)
        }
        // 获取曲线对象
        function getObject(name, obj, item) {
            objName = name;
            if (obj) { // 接收到曲线对象
                vmdChart = obj;
                mychart = vmdChart.chart;
                chartTitle = vmdChart.tplJSON.title || {};
                chartSeries = vmdChart.tplJSON.series || [];
                chartInfo = vmdChart.tplJSON.chart || {};
                chartXAxis = vmdChart.tplJSON.xAxis || [];
                chartYAxis = vmdChart.tplJSON.yAxis || [];
                chartLenged = vmdChart.tplJSON.legend || {};
                oriTitle = chartTitle.text;
                propertyCom = vmdChart.propertyCom; // 属性设置界面组件 
            }
            if (item) {
                console.log(item)
                myAxis = item;
                if (myAxis.coll == 'xAxis') {
                    for (var i = 0; i < chartXAxis.length; i++) {
                        if (chartXAxis[i].id == myAxis.userOptions.id) {
                            AxisInfo = chartXAxis[i];
                            break
                        }
                    }
                }
                if (myAxis.coll == 'yAxis') {
                    for (var i = 0; i < chartYAxis.length; i++) {
                        if (chartYAxis[i].id == myAxis.userOptions.id) {
                            AxisInfo = chartYAxis[i];
                            break
                        }
                    }
                }
            }
            // 根据对象给顶部工具条赋值
            // switch (objName) {
            //     case "title":
            setOriTitle();
            //     break;
            // case "axis":
            //     // setOriAxis();
            //     break;
            // }
            setOriChart();
        }
        // 根据属性设置工具条状态
        function setOriTitle() {
            //console.log(chartTitle.style)
            FontFamitylist.setOriFont(chartTitle.style.fontFamily);
            FontSizelist.setOriFont(chartTitle.style.fontSize);
            hwFontColor.setOriColor(chartTitle.style.color);
            if (chartTitle.style.fontWeight === 'bold') {
                $(hwDataView1.all.elements[0]).addClass("node-color");
            } else {
                $(hwDataView1.all.elements[0]).removeClass("node-color");
            }
            if (chartTitle.style.fontStyle === 'italic') {
                $(hwDataView1.all.elements[1]).addClass("node-color");
            } else {
                $(hwDataView1.all.elements[1]).removeClass("node-color");
            }
        }

        function setOriChart() {
            hwDataView.all.elements.forEach(function(item) {
                $(item).removeClass("node-color")
                if (item.getAttribute("data-type") === chartInfo.type) {
                    $(item).addClass("node-color")
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
        this.TopTitle_afterrender = TopTitle_afterrender;
        this.items = [{
                xtype: "vmd.div",
                id: "div3",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 182,
                height: 42,
                layout: "absolute",
                items: [{
                        xtype: "vmd.ux.FontFamitylist",
                        id: "FontFamitylist",
                        layout: "fit",
                        width: 100,
                        y: 10,
                        fontChagen: "FontFamitylist_fontChagen",
                        listeners: {
                            fontChagen: FontFamitylist_fontChagen
                        }
                    },
                    {
                        xtype: "vmd.ux.FontSizelist",
                        id: "FontSizelist",
                        layout: "fit",
                        x: 110,
                        y: 10,
                        width: 60,
                        fontChagen: "FontSizelist_fontChagen",
                        listeners: {
                            fontChagen: FontSizelist_fontChagen
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div1",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 1,
                        height: 20,
                        x: 180,
                        y: 12,
                        style: "border-left: 1px solid #999;",
                        region: "center"
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "div4",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 138,
                height: 42,
                layout: "absolute",
                items: [{
                        xtype: "vmd.dataview",
                        id: "hwDataView1",
                        width: 70,
                        height: 30,
                        itemSelector: "li.info",
                        overClass: "info-hover",
                        selectedClass: "x-view-selected",
                        singleSelect: false,
                        multiSelect: false,
                        autoScroll: false,
                        tpl: "<ul class=\"d-info\" style=\"display: inline-block;height: 36px;\">    <tpl for=\".\">        <li class=\"info\" data-off=\"0\" data-id=\"{id}\" data-tooltip=\"{title}\" style=\"display: inline-block;        width: 24px;height: 24px;  padding: 11px 4px 10px 4px;        margin: 0;\">            <i class=\"iconfont {id}\" style=\" display:inline-block;width: 100%;height: 100%;font-weight:bold;color:#333;text-align:center\">            </i>        </li>    </tpl></ul>",
                        data: "var data = [{    id: \"icon-jiacu-\",    title: \"加粗\"}, {    id: \"icon-qingxie-\",    title: \"倾斜\"}];return data;",
                        x: 0,
                        y: 3,
                        click: "hwDataView1_click",
                        listeners: {
                            click: hwDataView1_click
                        }
                    },
                    {
                        xtype: "vmd.ux.FontColor",
                        id: "hwFontColor",
                        layout: "fit",
                        x: 75,
                        y: 10,
                        width: 50,
                        fontColorChange: "hwFontColor_fontColorChange",
                        listeners: {
                            fontColorChange: hwFontColor_fontColorChange
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div2",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 1,
                        height: 20,
                        x: 130,
                        y: 12,
                        style: "border-left: 1px solid #999;",
                        region: "west"
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "div5",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 220,
                height: 42,
                layout: "absolute",
                items: [{
                        xtype: "vmd.dataview",
                        id: "hwDataView",
                        width: 210,
                        height: 30,
                        itemSelector: "li.info",
                        overClass: "info-hover",
                        selectedClass: "x-view-selected",
                        singleSelect: false,
                        multiSelect: false,
                        autoScroll: false,
                        tpl: "<ul class=\"d-info\" style=\"display: inline-block;height: 36px;\">    <tpl for=\".\">        <li class=\"info\" data-type=\"{type}\" data-id=\"{id}\" data-tooltip=\"{title}\" style=\"display: inline-block;width: 24px;height: 24px;  padding: 11px 4px 10px 4px;        margin: 0;\">            <i class=\"iconfont {id}\" style=\" display:inline-block;width: 100%;height: 100%;font-weight:bold;color:#333;text-align:center\">            </i>        </li>    </tpl></ul>",
                        data: "var data = [{    id: \"icon-icon-\",    title: \"柱形图\",    type: \"column\"}, {    id: \"icon-zhexiantu\",    title: \"折线图\",    type: \"line\"}, {    id: \"icon-mianjitu\",    title: \"面积图\",    type: \"area\"}, {    id: \"icon-icon-test\",    title: \"饼状图\",    type: \"pie\"}, {    id: \"icon-sandiantu\",    title: \"散点图\",    type: \"scatter\"}, {    id: \"icon-curvilinear-component\",    title: \"曲线图\",    type: \"spline\"}];return data;",
                        x: 0,
                        y: 3,
                        click: "hwDataView_click",
                        region: "south",
                        listeners: {
                            click: hwDataView_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 1,
                        height: 20,
                        x: 215,
                        y: 12,
                        style: "border-left: 1px solid #999;"
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
                width: 160,
                height: 42,
                layout: "absolute",
                x: 0,
                items: [{
                    xtype: "vmd.dataview",
                    id: "hwDataView2",
                    width: 150,
                    height: 30,
                    itemSelector: "li.info",
                    overClass: "info-hover",
                    selectedClass: "x-view-selected",
                    singleSelect: false,
                    multiSelect: false,
                    autoScroll: false,
                    tpl: "<ul class=\"d-info\" style=\"display: inline-block;height: 36px;\">    <tpl for=\".\">        <li class=\"info\" data-show=\"1\" data-id=\"{id}\" data-tooltip=\"{title}\" style=\"display: inline-block;        width: 24px;height: 24px;  padding: 11px 4px 10px 4px;        margin: 0;\">            <i class=\"iconfont {id}\" style=\" display:inline-block;width: 100%;height: 100%;font-weight:bold;color:#333;text-align:center\">            </i>        </li>    </tpl></ul>",
                    data: "var data = [{    id: \"icon-biaoti\",    title: \"隐藏标题\"}, {    id: \"icon-shijianzhou\",    title: \"隐藏X轴\"}, {    id: \"icon-shijianzhou1\",    title: \"隐藏Y轴\"}, {    id: \"icon-shangjuzhong\",    title: \"隐藏图例\"}];return data;",
                    x: 0,
                    y: 3,
                    click: "hwDataView2_click",
                    listeners: {
                        click: hwDataView2_click
                    }
                }]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setObject = function(name, obj, item) {
            //直接填写方法内容
            getObject(name, obj, item)
        }
        this.setOriPropetry = function(name, obj, item) {
            //直接填写方法内容
            setOri(name, obj, item)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.TopTitle");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TopTitle");
    }
})