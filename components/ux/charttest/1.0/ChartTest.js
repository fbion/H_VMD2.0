Ext.define("vmd.ux.ChartTest", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ChartTest",
    title: "Panel",
    header: false,
    border: false,
    width: 800,
    height: 600,
    layout: "border",
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
                xtype: "vmd.div",
                id: "div1",
                autoEl: "div",
                border: true,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 788,
                height: 50,
                region: "north"
            },
            {
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: true,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 50,
                region: "center",
                items: [{
                    xtype: "vmd.chart",
                    id: "chart",
                    text: "chart",
                    relativepath: "Resources//Report",
                    size: "small",
                    nousedataset: false,
                    tplJSON: {
                        credits: {
                            enabled: false
                        },
                        chart: {
                            type: "line",
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
                            yAxis: "y-0"
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
                    chartStoreConfig: this.yuyu
                }]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.ChartTest");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ChartTest");
    }
})