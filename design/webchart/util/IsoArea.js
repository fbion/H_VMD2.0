Ext.define('vmd.d.webchart.util.IsoArea', {
    requires: [
        'vmd.d.webchart.util.visualMap',
    ],
    constructor: function (tpl,info,newMapping) {  
        var me = this;
        zrender.util.each(info,function(v,k){
            me[k] = v;
        })
        
        // 色系
        if(newMapping){
            me.visualMap = new vmd.d.webchart.util.visualMap(tpl,{
                "min": 0,
                "max": 100,
                "left": "left",
                "top": "bottom",
                "posHori": "right",
                "posVert": "bottom",
                "text": ["高", "低"],
                "seriesName": me.name,
                "show":true,
                "inRange": {
                    "color": ["RGB(0,0,255)","RGB(0,255,0)","RGB(255,0,0)"]
                },
                "hoverLink":true,
                "calculable": true
            });
        }else{
            for(var i = 0; i < tpl.visualMap.length; i++){
                if(tpl.visualMap[i].seriesName == me.name){
                    me.visualMap = new vmd.d.webchart.util.visualMap(tpl,tpl.visualMap[i]);
                    break;
                }
            }
        }
		
        // 依赖属性序列
        if(newMapping){
            me.dependentWellName = [];
            me.dependentPorName = vmd.getGuid();
            me.dependentPorDas = '';
            me.dependentPorDasMapping = {
                "source":"",
                "seriesName":me.dependentPorName,
                "fields":["",""],
                "fieldNames":["井号","属性值"]
            }
            me.dependentSeries= [me.dependentPorName];
        }else{
            me.dependentWellName = [];
            // me.dependentWellDas = [];
            zrender.util.each(tpl.series,function(v,k){
                zrender.util.each(me.dependentSeries,function(item,index) {
                    if(item === v.name && v.isDependentSeries){
                        me.dependentPorName =v.name ;
                    }
                    if(item === v.name && v.type === 'wellSymbol'){
                        me.dependentWellName.push(v.name);
                    }
                })
            })
            zrender.util.each(tpl.seriesMapping,function(v,k){
                if(v.seriesName === me.dependentPorName ){
                    me.dependentPorDas = v.source;
                    me.dependentPorDasMapping = v;
                }
            })
        }
        
		// 数据映射
        if(newMapping){
            me.dataMapping = newMapping;
            me.dataMapping.dataType = 1;
            me.dataMapping.url = '';
        }else{
            var seriesMapping = tpl.seriesMapping;
            var dataSet = tpl.dataSet;
            me.paseData(seriesMapping,dataSet)
        }
    },
	
    // 处理数据映射
    paseData:function(seriesMapping,dataSet){
        var me  = this;
        zrender.util.each(seriesMapping,function(v,k){
            if(me.name === v.seriesName){
                var dsName = v.source;
                me.dataMapping = v;
                zrender.util.each(dataSet,function(value,key){
                    if(dsName === key){
                        me.dataMapping.dataType = value.type;
                        me.dataMapping.url = value.url;
                        me.dataMapping.params = value.params;
                    }
                })
            }
        })
    },

    // 序列化
    serialize: function(tpl){
    
        var me = this;
        var obj = {
            visualMap:null,
            series:{},
            seriesMapping:null,
            dataSet:{}
        };
        zrender.util.each(me,function(v,k){
            if(k === "dependentSeries"){
                obj.series.dependentSeries = [];
                zrender.util.each(tpl.series,function(item,index){
                    zrender.util.each(me.dependentWellName,function(value,n){
                        if(value && item.name === value){
                            obj.series.dependentSeries.push(item.name);
                        }
                    })
                })
                zrender.util.each(tpl.seriesMapping,function(v,k){
                    if(v.source && me.dependentPorDas && v.source === me.dependentPorDas){
                        obj.series.dependentSeries.push(v.seriesName);
                    }
                })
            }else if(k === "visualMap"){
                obj.visualMap = me.visualMap.serialize(tpl);
            }else if(k==='dataMapping'){
                 // 解析seriesMapping
                var isNewMapping = true;
                 zrender.util.each(tpl.seriesMapping,function(item,n){
                    if(item.seriesName ===v.seriesName){
                        item.source = v.source;
                        item.fields = v.fields;
                        item.fieldNames = v.fieldNames;
                        isNewMapping = false;
                    }
                    if(item.seriesName === me.dependentPorDasMapping.seriesName){
                        item.source = me.dependentPorDasMapping.source;
                        item.fields = me.dependentPorDasMapping.fields;
                        item.fieldNames = me.dependentPorDasMapping.fieldNames;
                    }
                })
                if(isNewMapping){
                    tpl.seriesMapping.push(v);
                    tpl.seriesMapping.push({
                        "source":"",
                        "seriesName":me.dependentPorName,
                        "fields":["",""],
                        "fieldNames":["井号","数据"]
                    });

                }
                obj.seriesMapping = tpl.seriesMapping;
                // 解析dataset
                zrender.util.each(obj.seriesMapping,function(value,i) {
                    if(value.source){
                        var url = '';
                        var type = 0;
                        //var params = {};
                        // if(xds.vmd.getStoreByDsName(value.source,true)){
                        //     var storeConfig = JSON.parse(xds.vmd.getStoreByDsName(value.source,true).component.config.storeConfig)
                        //     var paramsMethods = storeConfig.getMethods
                        //     console.log(paramsMethods)
                        //     if(paramsMethods&&paramsMethods.length>0){
                        //         for(var i = 0;i<paramsMethods.length;i++){
                        //             var valueExp = paramsMethods[i].value1.trim()||paramsMethods[i].value2.trim();
                        //             if(valueExp!=""){	
                        //                 params[paramsMethods[i].id] = valueExp;
                        //             }
                                    
                        //         }
                        //     }
                        //     url = storeConfig.url;
                        // }
                        if(value.source === 'vmd-hwcharts-isoArea'){
                            type = 1;
                            url = "GeologyAlgorithm/ISOAlgorithm/isoarea";
                        }
                        if(value.source === 'vmd-hwcharts-isoLine'){
                            type = 1;
                            url = "GeologyAlgorithm/ISOAlgorithm/isoline";
                        }
                        obj.dataSet[value.source] = {
                            type:type,
                            url:url,
                            params:{}
                        }
                    }
                    
                })
            }else if (k === 'dependentPorDasMapping'){

            }else{
                obj.series[k] = v; 
            }
        })
        var isNewSeries = true;
        for (var i = 0; i < tpl.series.length; i++) {
            var id = tpl.series[i].name;
            if (id === obj.series.name) {
                tpl.series[i] = obj.series;
                isNewSeries = false;
            }
        }
        if (isNewSeries) {
            tpl.series.unshift(obj.series);
            tpl.series.unshift( {
                    "type": "wellLabel",
                    "name": me.dependentPorName,
                    "nameText": "",
                    "isDependentSeries":true,
                    "data": [],
                    "itemStyle": {
                        "color": "#cc004e",
                        "show": false,
                        "formatter": "{b}"
                    }
                })
        }
        obj.series = tpl.series;
        return obj;
    },

    // 反序列化
    deserialize: function(){
        this.objDataConnect = new vmd.d.webchart.util.DataConnect();
    }

})