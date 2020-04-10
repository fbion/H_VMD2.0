Ext.define('vmd.d.webchart.util.Title', {
    requires: [
        'vmd.d.webchart.util.Font'
    ],
    constructor: function (title) {
        this.show = title.show || true;
        this.text = title.text || '';
        this.textAlign = title.textAlign ||'center';     
        this.font = new vmd.d.webchart.util.Font(title.textStyle);
    },

    // 序列化
    serialize: function(){
        var me = this;
        var obj = {}
        obj.show = me.show ;
        obj.text = me.text ;
        obj.textAlign = me.textAlign ;     
        obj.textStyle = me.font.serialize();
        return obj;
    },

    // 反序列化
    deserialize: function(){
    
    }

})