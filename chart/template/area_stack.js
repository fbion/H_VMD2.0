
{
    "credits": {
        "enabled": false
    },
    "chart": {
        "type": "area",
        "htype":"area_stack",
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
        "seriesMapping": [
            {
                "x": 0,
                "y": 1
             },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 5
            }
        ]
    },
    "plotOptions": {
        "series": {
            "marker": {
                "enabled": true
            },
            "stacking": "normal"
        }
    },
    "series": [
        {
            "id":"series-1",
            "type": "area",
            "lineWidth": 1,
            "color":"#7cb5ec",
            "marker": {
                "fillColor": "#7cb5ec"
            },
            "xAxis":"x-0",
            "yAxis":"y-0",
            "stacking":"normal"
        },
        {
            "id":"series-2",
            "type": "area",
            "lineWidth": 1,
            "color":"#666699",
            "marker": {
                "fillColor": "#666699"
            },
            "xAxis":"x-0",
            "yAxis":"y-0",
            "stacking":"normal"
        },
        {
            "id":"series-3",
            "type": "area",
            "lineWidth": 1,
            "color":"#ff9900",
            "marker": {
                "fillColor": "#ff9900"
            },
            "xAxis":"x-0",
            "yAxis":"y-0",
            "stacking":"normal"
        },
        {
            "id":"series-4",
            "type": "area",
            "lineWidth": 1,
            "color":"#339966",
            "marker": {
                "fillColor": "#339966"
            },
            "xAxis":"x-0",
            "yAxis":"y-0",
            "stacking":"normal"
        }
    ],
    "xAxis":[
        {
            "id": "x-0",
            "minPadding":0,
            "visible": true,
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
            "gridLineColor": "#e6e6e",
            "gridLineWidth": 0,
            "gridLineDashStyle": "Solid"
        }
    ],
    "yAxis":[
        {
            "id": "y-0",
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
            "visible": true,
            "gridLineColor": "#e6e6e",
            "gridLineWidth": 1,
            "gridLineDashStyle": "Solid"
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