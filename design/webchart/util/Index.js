Ext.define('vmd.d.webchart.util.Index', {
    requires: [
        'vmd.d.webchart.util.Font'
    ],
    
    type: 0, // 开采指标类型，0：日产油，1：日产水，2：日产气....
    show: true, // 是否显示
    name: "", // 名称
    abbreviation: "", // 简称
    showAbbreviation: "", // 是否显示简称
    field: "", // 字段
    unit: "", // 单位
    showUnit: "", // 是否显示单位
    font: {}, // 名称字体

    objDataConnect: {}, // 数据关联对象

    constructor: function (series,info) {   
        var me =this;
        me.series = series;
        zrender.util.each(info,function(v,k){
            me[k] = v;
        })     
    },

    // 序列化
    serialize: function(tpl){
        var me = this;
        var obj = {
            series:null
        };
        var  isNewIndex = true;
        var  indexs = null;
        for(var i = 0;i<me.series.indexs.length;i++){
            if(me.series.indexs[i].id === me.id){
                indexs = me.series.indexs[i]
                isNewIndex = false;
            }
        }
        if(isNewIndex){
            indexs = {
                "id":me.id,
                "field":"",
                "name": "",
                "shortName":"",
                "company": "",
                "color": "rgb(0,0,0)",
                "nameIsShow":false,
                "companyIsShow":false,
                "labelIsShow":false
            }
        }
        zrender.util.each(me,function(v,k){
            if(k !='series'){
                indexs[k] = v;
            }
        })
        if(isNewIndex){
            me.series.indexs.push(indexs)
        }
        for (var i = 0; i < tpl.series.length; i++) {
            var id = tpl.series[i].name;
            if (id === me.series.name) {
                tpl.series[i] = me.series;
            }
        }
        obj.series = tpl.series;
        return obj; 
    },
    // 
    paseConfig:function(){
        var me = this;
        var obj = {};
        zrender.util.each(me,function(v,k){
            if(k !='series'){
                obj[k] = v
            }
        })
        return obj; 
    },

    // 反序列化
    deserialize: function(){
        this.font = new vmd.d.webchart.util.Font();
        this.objDataConnect = new vmd.d.webchart.util.DataConnect();
    }

})