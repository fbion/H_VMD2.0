Ext.define('vmd.d.webchart.util.Compass', {
    requires: [
    ],
    constructor: function (para) {
		
        this.show = para.show;		
        this.id = para.id || 5;	
        // this.z = para.z || 100000;	
        this.text = para.text || "指北针";	
        this.textStyle = para.textStyle || {};
    },

    // 序列化
    serialize: function(){
        var me = this;
        var obj = {}
		
        obj.show = me.show;		
        obj.id = me.id || 5;	
        // obj.z = me.z || 100000;	
        obj.text = me.text || "指北针";	
        obj.textStyle = me.textStyle || {};
		
        return obj;
    },

    // 反序列化
    deserialize: function(){
    
    }

})