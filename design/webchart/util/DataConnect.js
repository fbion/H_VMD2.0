Ext.define('vmd.d.webchart.util.DataConnect', {
    requires: [
        'vmd.d.webchart.util.FieldBind',
    ],

    arrDataset: [], // 数据集数组
    arrFieldBind: [], // 字段绑定数组

    constructor: function () {        
    },

    // 序列化
    serialize: function(){
    
    },

    // 反序列化
    deserialize: function(){

        this.objDataConnect = new vmd.d.webchart.util.FieldBind();
    }

})