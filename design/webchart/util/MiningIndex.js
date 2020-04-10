Ext.define('vmd.d.webchart.util.MiningIndex', {
    requires: [
        'vmd.d.webchart.util.DataConnect',
        'vmd.d.webchart.util.Font',
        'vmd.d.webchart.util.Index'
    ],
    
    // style: 0, // 开采指标样式，0：柱形开采指标，1：伞形开采指标
    // relativePos: 0, // 相对井位位置，0：左上，1：右下...
    // arrMiningIndex: [], // 指标数组

    // objDataConnect: {}, // 数据关联对象

    positionConfig:{
        'left':'左',
        'right+':'右',
        'leftTop':'左上',
        'rightTop':'右上',
        'center':'中',
        'top':'上',
        'bottom+':'下',

    },
    wellTypeConfig:{
        '21':'柱形开采指标',
        '31':'伞形开采指标',
        '11':'水井伞形开采指标'
    },
    constructor: function (tpl,info,newMapping) {   // 内存对象转化成实例化对象
        var me = this;
        zrender.util.each(info,function(v,k){
            if(k ==='indexs'){
                me.indexs = [];
                zrender.util.each(v,function(value,i) {
                    me.indexs[i] = new vmd.d.webchart.util.Index(info,value);
                })
            }else if(k==='wellType'){
                me[k] = me.wellTypeConfig[v];
            }else if(k==='position'){
                me[k] = me.positionConfig[v];
            } else if(k ==="textStyle" ){
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
    
    // 实例化对象转化成内存对象
    serialize: function(tpl){
        var me = this;
        var obj = {
            series:{},
            seriesMapping:null,
            dataSet:{}
        };
        zrender.util.each(me,function(v,k){
            if(k === 'indexs'){
                obj.series.indexs = [];
                zrender.util.each(v,function(value,i) {
                    obj.series.indexs[i] = value.paseConfig();
                })
            }else if(k ==="font" ){
                 obj.series.textStyle = me.font.serialize();
            }else if(k==='wellType'){
                for(var key in me.wellTypeConfig){
                    if(me.wellTypeConfig[key] === v){
                         obj.series[k] = key;
                    }
                }
            }else if(k==='position'){
                for(var key in me.positionConfig){
                    if(me.positionConfig[key] === v){
                         obj.series[k] = key;
                    }
                }
            } else if(k==='dataMapping'){
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
        var isNewMapping = true;
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

        this.objDataConnect = new vmd.d.webchart.util.DataConnect();
    }

})