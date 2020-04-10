Ext.define('vmd.d.webchart.util.MapInfo', {
    requires: [
        'vmd.d.webchart.util.Font'
    ],
    
    // show: true, // 是否显示
    // btdw: "", // 编图单位
    // hzr: "", // 绘制人
    // bzr: "", // 编制人
    // shr: "", // 审核人
    // date: "", // 日期
    // font: {},

    constructor: function (mapInfo) {  
        var me  = this;      
        this.font = new vmd.d.webchart.util.Font(mapInfo.textStyle);
        this.show = mapInfo.show;
        this.btdw = mapInfo.values.btdw;
        this.hzr = mapInfo.values.hzr;
        this.shr = mapInfo.values.shr;
        this.bzr = mapInfo.values.bzr;
        this.date = mapInfo.values.rq;
    },

    // 序列化
    serialize: function(){
        var me = this;
        var obj = {
            values:{}
        };
        obj.values.btdw = me.btdw;
        obj.values.hzr = me.hzr;
        obj.values.shr = me.shr;
        obj.values.bzr = me.bzr;
        obj.show = me.show;
        obj.values.rq = me.date;    
        obj.textStyle = me.font.serialize();
        obj.text = "编图单位："+obj.values.btdw+"  绘制人："+obj.values.hzr+"  编制人："+obj.values.bzr+"  审核人："+obj.values.shr+"  日期："+obj.values.rq;
        return obj;
    },

    // 反序列化
    deserialize: function(){
    
    }

})