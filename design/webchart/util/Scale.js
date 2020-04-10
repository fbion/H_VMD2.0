Ext.define('vmd.d.webchart.util.Scale', {
    requires: [
    ],
    constructor: function (para) {
        this.show = para.show || true;
    },

    // 序列化
    serialize: function(){
        var me = this;
        var obj = {}
        obj.show = me.show ;
        return obj;
    },

    // 反序列化
    deserialize: function(){
    
    }

})