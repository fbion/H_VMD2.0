Ext.define('vmd.d.webchart.util.Layer', {
    requires: [
        'vmd.d.webchart.util.WellSymbol',
        'vmd.d.webchart.util.MiningIndex',
        'vmd.d.webchart.util.IsoArea',
        'vmd.d.webchart.util.IsoLine'
    ],
    seriesConfig:{
        'wellSymbol':{
            "type": "wellSymbol",
            "nameText": "井位",
            "scale": 0.2,
            "show":true,
            'z':4,
            "label": {
                "color": "black",
                "show": true,
                "formatter": "{b}",
                "position": "right"
            },
            "data": [ ],
            "progressiveThreshold":3000,
      	   "progressive":400,
            "symbolSize": 15
          },
        'wellLabel':{
            "type": "wellLabel",
            "nametext": "井旁标注",
            "show":true,
            'z':4,
            "itemStyle": {
                "normal": {
                    "color": "#cc004e",
                    "show": true,
                    "formatter": "{b}"
                }
            },
            "data": []
        },
        'miningIndex':{
			"type": "miningIndex",
			"nameText": "开采指标",
			"wellType":"21",
			"show":true,
			"position":"leftTop",
			"eidt":true,
			"z":4,
            "data": [],
            "progressiveThreshold":3000,
      	   "progressive":400,
			"toopTip":{
				"show":true
			},
			"textStyle": {
				"fontSize": 9,
				"fontWeight": "normal",
				"fontFamily": "Microsoft YaHei",
				"color":"#333333"
			},
			"indexs":[
				{
					"id":"lcy",
					"field":"",
					"name": "累产油",
					"shortName":"LCY",
					"company": "万吨",
					"color": "rgb(255,0,0)",
					"isShow":true,
					"companyIsShow":false,
					"labelIsShow":false
				},
				{
					"id":"lcs",
					"field":"",
					"name": "累产水",
					"shortName":"LCS",
					"company": "万吨",
					"color": "rgb(0,0,255)",
					"isShow":true,
					"companyIsShow":false,
					"labelIsShow":false
				},
				{
					"id":"lcq",
					"field":"",
					"name": "累产气",
					"shortName":"LCQ",
					"company": "万吨",
					"color": "rgb(255,153,0)",
					"isShow":true,
					"companyIsShow":false,
					"labelIsShow":false
				},
				{
					"id":"rcy",
					"field":"",
					"name": "日产油",
					"shortName":"RCY",
					"company": "吨",
					"color": "rgb(163,73,164)",
					"isShow":true,
					"companyIsShow":false,
					"labelIsShow":false
				},
				{
					"id":"rcs",
					"field":"",
					"name": "日产水",
					"shortName":"RCS",
					"company": "吨",
					"color": "rgb(0,0,200)",
					"isShow":true,
					"companyIsShow":false,
					"labelIsShow":false
				},
				{
					"id":"rcq",
					"field":"cq",
					"name": "日产气",
					"shortName":"RCQ",
					"company": "吨",
					"color": "rgb(255,255,0)",
					"isShow":true,
					"companyIsShow":false,
					"labelIsShow":false
				}
			]
        },
        'wellTrace':{
            "type": "wellTrace",
            "nameText": "井轨迹",
            "traceType":"1",
            "show":true,
            'z':4,
            "lineStyle": {
                "normal":{
                    "type": "solid",
                    "color": "#000",
                    "width": 1
                }
                },
                "AsymbolStyle": {
                    "normal":{
                    "color": "#FE0100",
                    "symbolSize": 15
                    }
                },
                "BsymbolStyle": {
                    "normal":{
                    "color": "#000ed6",
                    "symbolSize": 15
                    }
                },
            "data": []
        },
        'symbolLine':{
            "type": "symbolLine",
            "nameText": "边界线",
            "show":true,
            "applyDataTo": [],
            'z':4,
            "data": [ ],
            "lineStyle": {
                "normal": {
                "color": "#7b0094",
                "width": 2
                }
            }
        },
        "isoLine":{
            "type": "isoLine",
            "nameText": "等值线",
            "data": [],
            "polyline": true,
            "show":true,
            'z':2,
            "dsType":'1',
            "lineStyle": {
                "normal":{
                    "color": "#000000",
                    "width": 1,
                    "opacity": 0.3
                }
            }
        },
        "faultLine":{
            "type": "faultLine",
            "nameText": "断层线",
            'z':2,
            "show":true,
            "lineStyle": {
                "normal": {
                "type": "faultLine",
                "color": "red"
                }
            },
            "data": [ ]
        },
        "area":{
            "type": "area",
			"nameText": "面积",
            "dependentSeries": [],
            "show":true,
            'z':2,
			"data": [],
			"isArea": true,
			"areaStyle": {
				"normal": {
					"color": "rgb(255,225,174)",
					"show": true,
					"formatter": "{b}",
					"position": "right"
				}
			}
        },
        "isoArea":{
            "type": "isoArea",
            "nameText": "等值区",
            "show":true,
            'z':2,
			"dependentSeries": [],
			"data": [],
			"dense": 5
        }
    },
    seriesMappingConfig:{
        'wellSymbol':{
			"source":"",
			"fields":["","","","",""],
			"fieldNames":["井号","井名","井别","X坐标","Y坐标"]
		},
        'wellLabel':{
            "source":"",
            "fields":["",""],
            "fieldNames":["井号","数据"]
        },
        'miningIndex':{
			"source":"",
			"fields":[""],
			"fieldNames":["井号"]
			
		},
        'wellTrace':{
			"source":"",
            "fields":["","","","","","","","",""],
            "fieldNames":["井号",'井口x坐标','井口y坐标','井底x坐标','井低y坐标','A靶点x坐标','A靶点y坐标','B靶点x坐标','B靶点y坐标']
		},
        'symbolLine':{
            "source":"",
            "fields":["id","x","y","maxx","minx","maxy","miny"],
            "fieldNames":["id",'x坐标','y坐标','最大x坐标','最小x坐标','最大y坐标','最小y坐标']
        },
        "isoLine":{
			"source":"vmd-hwcharts-isoLine",
            "fields":["","","","","","","",""],
            "fieldNames":["id",'数据','x坐标','y坐标','最大x坐标','最小x坐标','最大y坐标','最小y坐标']
		},
        "faultLine":{
			"source":"",
            "fields":["","", "","","","",""],
            "fieldNames":["id",'名称','断层类型','井Id','井类型','x坐标','y坐标']
        },
        "area":{	
            "source":"",
            "fields":["id","name","x","y"],
            "fieldNames":["id",'名称','x坐标','y坐标']
        },
        "isoArea":{
            "source":"vmd-hwcharts-isoArea",
        }
    },
    constructor: function (tpl) { 
        var me = this;
        me.allLayers = [];
        zrender.util.each(tpl.series,function(v,k){
            if(!v.isDependentSeries){
                var type = v.type.slice(0, 1).toUpperCase() + v.type.slice(1);
                me.allLayers.push(new vmd.d.webchart.util[type](tpl,v))
            }
        })
    },
    init: function (tpl) { 
        var me = this;
        me.allLayers = [];
        zrender.util.each(tpl.series,function(v,k){
            var type = v.type.slice(0, 1).toUpperCase() + v.type.slice(1);;
            me.allLayers.push(new vmd.d.webchart.util[type](tpl,v))
        })
    },
    // 添加图层
    addLayer:function(tpl,type){
        var me = this;
        var n = 1;
        zrender.util.each(tpl.series,function(v,k){
            if(v.type === type){
                n++
            }
        })
        var series = zrender.util.clone(me.seriesConfig[type]);
        series.name = vmd.getGuid();
        series.nameText = series.nameText+"-"+n; 
        var mapping = zrender.util.clone(me.seriesMappingConfig[type]);
        mapping.seriesName = series.name;
        var t = type.slice(0, 1).toUpperCase() + type.slice(1);
        var newLayer = new vmd.d.webchart.util[t](tpl,series,mapping)
        me.allLayers.push(newLayer);
        return newLayer
    },
    // 删除图层
    delLayer:function(seriesId){
        var me = this;
        zrender.util.each(me.allLayers,function(v,k){
            if(v.name === seriesId){
                me.allLayers.splice(k,1);
            }
        })
    },
    // 序列化
    serialize: function(){
        var me  = this;
        var obj = {
            series:[]
        };
        zrender.util.each(me.allLayers,function(v,k){
            obj.series.push(v.serialize)
        })
    },
    // 反序列化
    deserialize: function () {}
})