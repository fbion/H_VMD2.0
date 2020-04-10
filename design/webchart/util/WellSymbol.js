Ext.define('vmd.d.webchart.util.WellSymbol', {
    requires: [
        'vmd.d.webchart.util.DataConnect',
        'vmd.d.webchart.util.Font'
    ],


    constructor: function (tpl,info,newMapping) {   
        var me = this;

		
        zrender.util.each(info,function(v,k){
            if(k ==="textStyle" ){
                me.font = new vmd.d.webchart.util.Font(v);
            }else{
                me[k] = v;
            }
        })

        if(newMapping){
            me.dataMapping = newMapping;
            me.dataMapping.dataType = 0;
            me.dataMapping.url = '';
        }else{
            var seriesMapping = tpl.seriesMapping;
            var dataSet = tpl.dataSet;
            me.paseData(seriesMapping,dataSet)
        }

    },

    // 处理数据映射
    paseSeries: function(series){
       var me  = this;
       zrender.util.each(series,function(v){
           if("wellSymbol" === v.type){
               if(me.name === v.name){

                   me.show = v.show; // 显示
                   me.editable = v.editable; // 可编辑
                   me.nonOverlap = v.nonOverlap; // 避让
                   me.scale = v.scale; // 缩放比例
                   me.z = v.z;
                   me.symbolSize = v.symbolSize;
                   me.showWellNo = v.showWellNo;
                   me.showWellSymbol = v.showWellSymbol;
                   me.nonOverlap = v.nonOverlap;
                   me.filterPreType = v.filterPreType;
                   me.filterPreStr = v.filterPreStr;
                   me.filterPreNum = v.filterPreNum;
               }
           }
       })
    },
    
    // 序列化
    serialize: function(tpl){		
		
        var me = this;
        var obj = {
            series:{},
            seriesMapping:{},
            dataSet:{}
        };
        zrender.util.each(me,function(v,k){
            if(k ==="textStyle" ){
                 obj.series.textStyle = me.font.serialize();
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
                })
                if(isNewMapping){
                    tpl.seriesMapping.push(v)
                }
                obj.seriesMapping = tpl.seriesMapping;
                // 解析dataset
                
                zrender.util.each(obj.seriesMapping,function(value,i) {
                    if(value.source){
                        var url = '';
                        var type = 0;
                        // var params = {};
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

            }else{
				if(k === "filter"){
					if(v.type === "过滤前缀"){
						v.type = "char";
					}else if(v.type === "过滤前缀位数"){
						v.type = "charnum";
					}
				}
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
            tpl.series.push(obj.series)
        }
        obj.series = tpl.series;
        return obj;
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

    // 反序列化
    deserialize: function(){

    }

})