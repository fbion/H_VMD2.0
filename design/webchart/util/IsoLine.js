Ext.define('vmd.d.webchart.util.IsoLine', {
    requires: [
        'vmd.d.webchart.util.DataConnect'
    ],
    constructor: function (tpl,info,newMapping) {  
        var me = this;
        zrender.util.each(info,function(v,k){
            me[k] = v;
        });
		
		// 数据映射
        if(newMapping){
            me.dataMapping = newMapping;
            me.dataMapping.dataType = 1;
            me.dataMapping.url = '';
            me.dataMapping.dsType = '1';
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
                me.dataMapping.dsType = me.dsType;
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
            series:{},
            seriesMapping:null,
            dataSet:{}
        };
        zrender.util.each(me,function(v,k){
            if(k==='dataMapping'){
                 // 解析seriesMapping
                var isNewMapping = true;
                 zrender.util.each(tpl.seriesMapping,function(item,n){
                    if(item.seriesName ===v.seriesName){
                        if(v.dsType ==1){
                            item.source = 'vmd-hwcharts-isoLine';
                        }else{
                            item.source = v.source;
                        }
                        item.fields = v.fields;
                        item.fieldNames = v.fieldNames;
                        item.dsType = v.dsType;
                        me.dsType = v.dsType;
                        obj.series.dsType = v.dsType;
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
            tpl.series.unshift(obj.series)
        }
        obj.series = tpl.series;
        return obj;
    },

    // 反序列化
    deserialize: function(){

        this.objDataConnect = new vmd.d.webchart.util.DataConnect();
    }

})