Ext.define('vmd.d.webchart.util.Font', {
    requires: [
    ],
    constructor: function (font) { 
        this.fontSize = (font&&font.fontSize) || 12;
        this.color = (font&&font.color) || "#000";
        this.fontWeight = (font&&font.fontWeight) || "normal";
        this.fontStyle = (font&&font.fontStyle) || "normal";
        this.fontFamily = (font&&font.fontFamily) || "Microsoft YaHei";
    },
    // 序列化
    serialize: function(){
        var me = this;
        var obj = {}
        obj.fontSize =me.fontSize;
        obj.color = me.color;
        obj.fontWeight = me.fontWeight;
        obj.fontStyle = me.fontStyle;
        obj.fontFamily = me.fontFamily;
        return obj;
    },
    setvalue:function(){
        
    },
    getValue:function(){

    }

})