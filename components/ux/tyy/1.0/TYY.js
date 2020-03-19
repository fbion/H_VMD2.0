Ext.define('vmd.ux.tYY.Controller', {
    xtype: 'vmd.ux.tYY.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.TYY", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.TYY",
    title: "Panel",
    header: false,
    border: false,
    width: 600,
    height: 350,
    layout: "absolute",
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
        this.items = [{
            xtype: "vmd.chart",
            id: "chart",
            text: "chart",
            relativepath: "Resources//Report",
            size: "small",
            nousedataset: false,
            x: 0,
            y: 0,
            tplJSON: {
                credits: {
                    enabled: false
                },
                chart: {
                    type: "column",
                    zoomType: "none",
                    alignTicks: true,
                    polar: false,
                    inverted: false,
                    backgroundColor: "#ffffff",
                    backgroundOpacity: "1",
                    borderColor: "#335cad",
                    borderRadius: 0,
                    borderWidth: 0,
                    plotBorderColor: "#cccccc",
                    plotBorderWidth: 0,
                    plotBackgroundColor: "#ffffff",
                    plotBackgroundOpacity: "1",
                    plotBorderEnabled: false,
                    borderEnabled: false
                },
                data: {
                    json: [],
                    seriesCountsByOptions: true,
                    seriesMapping: [{
                        x: 0,
                        y: 1
                    }]
                },
                plotOptions: {
                    series: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                tooltip: {
                    xDateFormat: "%Y-%m"
                },
                series: [{
                    id: "series-1",
                    type: "line",
                    lineWidth: 2,
                    xAxis: "x-0",
                    yAxis: "y-0",
                    color: "#FF6600",
                    connectNulls: false,
                    dashStyle: "Solid",
                    xData: "",
                    yData: "",
                    marker: {
                        enabled: true,
                        symbol: "circle",
                        radius: 4,
                        lineWidth: 0,
                        lineColor: "#ffffff",
                        fillColor: "#FF6600"
                    },
                    dataLabels: {
                        enabled: true,
                        format: "{y}",
                        align: "center",
                        verticalAlign: "top",
                        distance: -15,
                        x: 0,
                        y: -6,
                        style: {
                            color: "#000000",
                            fontSize: "12px",
                            fontFamily: "SimSun",
                            fontWeight: "bold",
                            fontStyle: "normal",
                            textOutline: "1px 1px contrast"
                        }
                    },
                    showInLegend: true,
                    borderColor: "#ffffff",
                    borderWidth: 1,
                    innerSize: 0,
                    borderRadius: 0,
                    showCheckbox: false,
                    stack: "",
                    stacking: "",
                    step: ""
                }],
                xAxis: [{
                    id: "x-0",
                    visible: true,
                    minPadding: 0,
                    allowDecimals: true,
                    lineColor: "#ccd6eb",
                    labels: {
                        align: "center",
                        enabled: true,
                        format: "{value}",
                        rotation: 0,
                        x: 0,
                        style: {
                            fontSize: "12px",
                            fontFamily: "SimSun",
                            color: "#666666",
                            fontStyle: "normal",
                            fontWeight: "normal"
                        }
                    },
                    dateTimeLabelFormats: {
                        day: ""
                    },
                    lineWidth: 1,
                    offset: 0,
                    opposite: false,
                    reversed: false,
                    tickColor: "#ccd6eb",
                    tickLength: 5,
                    tickPosition: "outside",
                    tickWidth: 1,
                    title: {
                        text: "横轴",
                        rotation: 0,
                        align: "middle",
                        style: {
                            fontSize: "12px",
                            fontFamily: "SimSun",
                            color: "#666666",
                            fontStyle: "normal",
                            fontWeight: "normal"
                        },
                        x: 0
                    },
                    type: "linear",
                    gridLineColor: "#e6e6e",
                    gridLineWidth: 0,
                    gridLineDashStyle: "Solid",
                    minorTickInterval: "auto",
                    minorTickWidth: 0,
                    minorGridLineColor: "#E0E0E0",
                    minorGridLineWidth: 0,
                    minorTickLength: 0,
                    minorGridLineDashStyle: "Solid"
                }],
                yAxis: [{
                    id: "y-0",
                    minPadding: 0,
                    allowDecimals: true,
                    lineColor: "#ccd6eb",
                    labels: {
                        align: "center",
                        enabled: true,
                        format: "{value}",
                        rotation: 0,
                        x: -15,
                        style: {
                            fontSize: "12px",
                            fontFamily: "SimSun",
                            color: "#666666",
                            fontStyle: "normal",
                            fontWeight: "normal"
                        }
                    },
                    dateTimeLabelFormats: {
                        day: ""
                    },
                    lineWidth: 1,
                    offset: 0,
                    opposite: false,
                    reversed: false,
                    tickColor: "#ccd6eb",
                    tickLength: 5,
                    tickPosition: "outside",
                    tickWidth: 0,
                    title: {
                        text: "竖<br>轴",
                        rotation: 0,
                        align: "middle",
                        offset: 40,
                        style: {
                            fontSize: "12px",
                            fontFamily: "SimSun",
                            color: "#666666",
                            fontStyle: "normal",
                            fontWeight: "normal"
                        },
                        x: 0
                    },
                    type: "linear",
                    visible: true,
                    gridLineColor: "#e6e6e",
                    gridLineWidth: 1,
                    gridLineDashStyle: "Solid",
                    minorTickInterval: "auto",
                    minorTickWidth: 0,
                    minorGridLineColor: "#E0E0E0",
                    minorGridLineWidth: 0,
                    minorTickLength: 0,
                    minorGridLineDashStyle: "Solid"
                }],
                title: {
                    text: "Chart title",
                    x: 0,
                    y: 15,
                    align: "center",
                    verticalAlign: {},
                    floating: false,
                    style: {
                        fontSize: "16px",
                        fontFamily: "Microsoft YaHei",
                        color: "#333333",
                        fontStyle: "normal",
                        fontWeight: "normal"
                    }
                },
                legend: {
                    enabled: true,
                    layout: "horizontal",
                    margin: 12,
                    padding: 8,
                    x: 0,
                    y: 0,
                    align: "center",
                    verticalAlign: "bottom",
                    floating: false,
                    reversed: false,
                    draging: false,
                    width: "",
                    itemWidth: ""
                },
                modules: []
            },
            chartStoreConfig: this.store
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.TYY");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TYY");
    }
})