{
    "credits": {
        "enabled": false
    },
    "chart": {
        "type": "line",
        "htype":"multi_axis",
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
    "exporting":false,
	"data": {
	    "json": [],
	    "seriesCountsByOptions": true,
	    "seriesMapping": [{
	        "x": 0,
	        "y": 1
	    },
        {
            "x": 0,
            "y": 2
        },
        {
            "x": 0,
            "y": 3
        }]
	},
	 "plotOptions": {
	    "series": {
	        "marker": {
	            "enabled": true
	        }
	    }
	},
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
            "gridLineColor": "#e6e6e",
            "gridLineWidth": 0,
            "minorGridLineWidth": 0,
            "gridLineDashStyle": "Solid"
        }
    ],
	"yAxis":[
	{
		"id": "y-0",
		"height": "28%",
        "visible": true,
		"direction": "vertical",
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
	},{
        "id": "y-1",
		"top": "36%",
        "height": "28%",
        "minPadding": 0,
		"direction": "vertical",
        "opposite":true,
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
            "text":"竖<br>轴<br>2",
            "rotation": 0,
            "align": "middle",
            "offset":25,
            "style": {
                "fontSize": "12px",
                "fontFamily": "SimSun",
                "color": "#666666",
                "fontStyle": "normal",
                "fontWeight": "normal"
            },
            "x":0
        },
        "type": "linear",
        "visible": true,
        "gridLineColor": "#e6e6e",
        "gridLineWidth": 1,
        "gridLineDashStyle": "Solid"
	},{
        "id": "y-2",
        "top": "72%",
        "height": "28%",
		"direction": "vertical",
        "minPadding": 0,
        "opposite":true,
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
            "text":"竖<br>轴<br>3",
            "rotation": 0,
            "align": "middle",
            "offset":25,
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

	"series": [{
        "id":"series-1",
	    "type": "line",
	    "lineWidth": 2,
        "xAxis":"x-0",
		"yAxis": "y-0"
	},
    {
        "id":"series-2",
        "type": "line",
        "lineWidth": 2,
        "xAxis":"x-0",
        "yAxis": "y-1",
        "color":"#ff0000",
        "marker": {
            "fillColor": "#ff0000"
        }
    },
    {
        "id":"series-3",
        "type": "line",
        "lineWidth": 2,
        "xAxis":"x-0",
        "yAxis": "y-2",
        "color":"#dbd000",
        "marker": {
            "fillColor": "#dbd000"
        }
    }],
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