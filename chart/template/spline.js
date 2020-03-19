{
    "credits": {
        "enabled": false
    },
    "chart": {
        "type": "spline",
        "zoomType": "none",
        "alignTicks": true,
        "polar": false,
        "inverted": false,
        "backgroundColor": "#ffffff",
        "backgroundOpacity": "1",
        "borderColor": "#335cad",
        "borderRadius": 0,
        "borderWidth": 0,
        "plotBorderColor": "#cccccc",
        "plotBorderWidth": 0,
        "plotBackgroundColor": "#ffffff",
        "plotBackgroundOpacity": "1",
        "plotBorderEnabled": false,
        "borderEnabled": false
},
    "data": {
    "json": [],
        "seriesCountsByOptions": true,
        "seriesMapping": [{
        "x": 0,
        "y": 1
    }]
},
    "plotOptions": {
    "series": {
        "marker": {
            "enabled": true
        }
    }
},
    "series": [{
    "id":"series-1",
    "type": "spline",
    "lineWidth": 2,
    "xAxis":"x-0",
    "yAxis": "y-0"
}],
    "xAxis":[
    {
        "id": "x-0",
        "visible": true,
        "minPadding": 0,
        "allowDecimals": true,
        "lineColor": "#ccd6eb",
        "labels": {
            "align": "center",
            "enabled": true,
            "format": "{value}",
            "rotation": 0,
            "x": 0,
            "style": {
                "fontSize": "12px",
                "fontFamily": "SimSun",
                "color": "#666666",
                "fontStyle": "normal",
                "fontWeight": "normal"
            }
        },
        "dateTimeLabelFormats": {
            "day": ""
        },
        "lineWidth": 1,
        "offset": 0,
        "opposite": false,
        "reversed": false,
        "tickColor": "#ccd6eb",
        "tickLength": 5,
        "tickPosition": "inside",
        "tickWidth": 1,
        "title": {
            "text":"横轴",
            "rotation": 0,
            "align": "middle",
            "style": {
                "fontSize": "12px",
                "fontFamily": "SimSun",
                "color": "#666666",
                "fontStyle": "normal",
                "fontWeight": "normal"
            },
            "x": 0
        },
        "type": "linear",
        "visible": true,
        "gridLineColor": "#e6e6e",
        "gridLineWidth": 0,
        "gridLineDashStyle": "Solid",
        "minorTickInterval": "auto",
        "minorTickWidth": 0,
        "minorGridLineColor": "#E0E0E0",
        "minorGridLineWidth": 0,
        "minorTickLength": 0,
        "minorGridLineDashStyle": "Solid"
    }
],
    "yAxis":[
    {
        "id": "y-0",
        "visible": true,
        "minPadding": 0,
        "allowDecimals": true,
        "lineColor": "#ccd6eb",
        "labels": {
            "align": "center",
            "enabled": true,
            "format": "{value}",
            "rotation": 0,
            "x": -15,
            "style": {
                "fontSize": "12px",
                "fontFamily": "SimSun",
                "color": "#666666",
                "fontStyle": "normal",
                "fontWeight": "normal"
            }
        },
        "dateTimeLabelFormats": {
            "day": ""
        },
        "lineWidth": 1,
        "offset": 0,
        "opposite": false,
        "reversed": false,
        "tickColor": "#ccd6eb",
        "tickLength": 5,
        "tickPosition": "inside",
        "tickWidth": 0,
        "title": {
            "text":"竖<br>轴",
            "rotation": 0,
            "align": "middle",
            "offset":40,
            "style": {
                "fontSize": "12px",
                "fontFamily": "SimSun",
                "color": "#666666",
                "fontStyle": "normal",
                "fontWeight": "normal"
            },
            "x": 0
        },
        "type": "linear",
        "gridLineColor": "#e6e6e",
        "gridLineWidth": 1,
        "gridLineDashStyle": "Solid",
        "minorTickInterval": "auto",
        "minorTickWidth": 0,
        "minorGridLineColor": "#E0E0E0",
        "minorGridLineWidth": 0,
        "minorTickLength": 0,
        "minorGridLineDashStyle": "Solid"
    }
],
    "title":{
        "text":"Chart title",
            "x": 0,
            "y": 15,
            "align": "center",
            "verticalAlign":null,
            "floating": true,
            "style": {
            "fontSize": "16px",
                "fontFamily": "Microsoft YaHei",
                "color": "#333333",
                "fontStyle": "normal",
                "fontWeight": "normal"
        }
    },
		"tooltip": {
				"useHTML":"true"
		},
    "legend":{
        "enabled": true,
        "layout": "horizontal",
        "margin": 12,
        "padding": 8,
        "x": 0,
        "y": 0,
        "align": "center",
        "verticalAlign": "bottom",
        "floating": false,
        "reversed": false,
        "draging": false,
        "width":"",
        "itemWidth":""
}
}
