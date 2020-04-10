Ext.define('vmd.d.webchart.util.Graph', {
    requires: [
        'vmd.d.webchart.util.Title',
        'vmd.d.webchart.util.Legend',
        'vmd.d.webchart.util.MapInfo',
        'vmd.d.webchart.util.Frame',
        'vmd.d.webchart.util.Compass',
        'vmd.d.webchart.util.Scale',
        'vmd.d.webchart.util.Layer'
    ],
    
    // showFrame : true,
    // showScale : true,
    // showCompass : true,
    // arrLayers : [],

    constructor: function (tpl) { 
        var me= this; 
        this.title  = new vmd.d.webchart.util.Title(tpl.title);
        this.legend  = new vmd.d.webchart.util.Legend(tpl.legend);
        this.mapInfo  = new vmd.d.webchart.util.MapInfo(tpl.mapInfo);
		
        this.frame  = new vmd.d.webchart.util.Frame(tpl.frameNew);
        this.scale  = new vmd.d.webchart.util.Scale(tpl.scale);
        this.compass  = new vmd.d.webchart.util.Compass(tpl.compass);
		
		
		
        // this.frame = tpl.frameNew;
		// this.scale = tpl.scale;
        // this.compass = tpl.compass;
        this.showFrame = tpl.frameNew.show;
        this.showScale = tpl.scale.show;
        this.showCompass = tpl.compass.show;
    },

    init: function (tpl) { 
        var me= this; 
        this.title  = new vmd.d.webchart.util.Title(tpl.title);
        this.legend  = new vmd.d.webchart.util.Legend(tpl.legend);
        this.mapInfo  = new vmd.d.webchart.util.MapInfo(tpl.mapInfo);
		
        this.frame  = new vmd.d.webchart.util.Frame(tpl.frameNew);
        this.scale  = new vmd.d.webchart.util.Scale(tpl.scale);
        this.compass  = new vmd.d.webchart.util.Compass(tpl.compass);
		
		
		
        // this.frame = tpl.frameNew;
		// this.scale = tpl.scale;
        // this.compass = tpl.compass;
        this.showFrame = tpl.frameNew.show;
        this.showScale = tpl.scale.show;
        this.showCompass = tpl.compass.show;
    },

    // 序列化
    serialize: function(){
        var tpl = this;
        var obj = {};
        obj.title  = tpl.title.serialize();
        obj.legend  = tpl.legend.serialize();
        obj.mapInfo  = tpl.mapInfo.serialize();
        obj.frameNew = tpl.frame.serialize();;
        obj.scale = tpl.scale.serialize();;
        obj.compass = tpl.compass.serialize();;
        // obj.frameNew.show = tpl.showFrame;
        // obj.scale.show = tpl.showScale;
        // obj.compass.show = tpl.showCompass;
        return obj;
    },

    // 反序列化
    deserialize: function(){
    
    }

})