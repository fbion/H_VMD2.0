var defaultSeries = {
    type: 'line',
    lineWidth: 2,
    color: "#7cb5ec",
    connectNulls: false,
    xAxis: 0,
    yAxis: 0,
    dashStyle: 'Solid',
    xData: '',
    yData: '',
    marker: {
        enabled: true,
        symbol: 'circle',
        radius: 4,
        lineWidth: 0,
        lineColor: '#ffffff',
        fillColor: '#7cb5ec'
    },
    dataLabels: {
        enabled: false,
        format: '{y}',
        align: 'center',
        verticalAlign: 'bottom',
        distance: -15,
        x: 0,
        y: -6,
        style: {
            color: "#000000",
            fontSize: "12px",
            fontFamily: 'SimSun',
            fontWeight: "bold",
            fontStyle: 'normal',
            textOutline: "none"
        },
        useHTML:true
    },
    showInLegend: true,
    borderColor: "#ffffff",
    borderWidth: 1,
    innerSize: 0,
    borderRadius: 0,
    showCheckbox: false,
    stack: '',
    stacking: '',
    step: '',
};
var defultAxis = {
    allowDecimals: true,
    minPadding: 0,
    maxPadding:0,
    lineColor: '#ccd6eb',
    labels: {
        align: 'center',
        enabled: true,
        format: '{value}',
        // rotation: 0,
        x: -5,
        style: {
            fontSize: '12px',
            fontFamily: 'SimSun',
            color: '#666666',
            fontStyle: 'normal',
            fontWeight: 'normal'
        }
    },
    dateTimeLabelFormats: {
        day: ''
    },
    lineWidth: 1,
    offset: 0,
    opposite: false,
    reversed: false,
    tickColor: "#ccd6eb",
    tickLength: 5,
    tickPosition: "inside",
    tickWidth: 1,
    //startOnTick: true,
    title: {
        align: 'middle',
        useHTML: true,
        rotation: 0,
        style: {
            fontSize: '12px',
            fontFamily: 'SimSun',
            color: '#666666',
            fontStyle: 'normal',
            fontWeight: 'normal'
        },
        x: 0
    },
    type: 'linear',
    visible: true,
    gridLineColor: '#e6e6e6',
    gridLineDashStyle: 'Solid',
	gridLineWidth:0,
    minorTickInterval: 'auto',
    minorTickWidth: 0,
    minorGridLineColor: '#E0E0E0',
    minorGridLineWidth: 0,
    minorTickLength: 0,
    minorGridLineDashStyle: 'Solid',
}
var defaultTitle = {
	text:"Chart title",
	    x: 0,
	    y: 15,
	    align: "center",
	    verticalAlign:null,
        floating: false,
        //useHTML:true,
	    style: {
	        fontSize: "16px",
	        fontFamily: "Microsoft YaHei",
	        color: "#333333",
	        fontStyle: "normal",
	        fontWeight: "normal"
	}
}
var defaultLegend = {
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
    width:"",
    useHTML:true
}
var defauleTemplate = {
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
                    enable: false
                }
            }
        },
        series: [{
            id: "series-1",
            type: "column",
            lineWidth: 2,
            xAxis: "x-0",
            yAxis: "y-0",
            dataLabels:{
                useHTML:true
            }
        }],
        xAxis: [{
            id: "x-0",
            visible: true,
            minPadding: 0,
            maxPadding:0,
            //startOnTick: false,
            allowDecimals: true,
            lineColor: "#ccd6eb",
            labels: {
                align: "center",
                enabled: true,
                // rotation: 0,
                x: 0,
                style: {
                    fontSize: "12px",
                    fontFamily: "SimSun",
                    color: "#666666",
                    fontStyle: "normal",
                    fontWeight: "normal"
                }
            },
            lineWidth: 1,
            offset: 0,
            opposite: false,
            reversed: false,
            tickColor: "#ccd6eb",
            tickLength: 5,
            tickPosition: "inside",
            tickWidth: 1,
            title: {
                text: "横轴",
                rotation: 0,
                align: "middle",
                useHTML:true,
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
            maxPadding:0,
            allowDecimals: true,
            lineColor: "#ccd6eb",
            labels: {
                align: "center",
                enabled: true,
                rotation: 0,
                x: -5,
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
            tickPosition: "inside",
            tickWidth: 1,
            title: {
                text: "竖<br>轴",
                rotation: 0,
                align: "middle",
                useHTML:true,
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
            verticalAlign: null,
            floating: true,
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
        }
    }