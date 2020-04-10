Ext.define('vmd.d.webchart.util.visualMap', {
    requires: [
        
    ],

    constructor: function (tpl,info,newMapping) {   
        var me = this;	
        zrender.util.each(info,function(v,k){
			me[k] = v;
        })
        if(!me.chroma){
            me.chroma = {};
            me.chroma.chromaColor = me.inRange.color;
            me.chroma.chromaValue = [me.min,parseFloat(me.max-me.min)/2,me.max];
            me.chroma.allColors = me.inRange.color;
        }
    },
    
    // 序列化
    serialize: function(tpl){		
        var me = this;
        var isNewV = true;
        var obj = {};
        if(!tpl.visualMap){
            tpl.visualMap = [];
        }
        zrender.util.each(me,function(value,index){
            obj.id = me.seriesName;
            if(index === 'inRange'){
                obj.inRange = me.inRange
                obj.inRange.color = me.chroma.allColors;
            }else{
                obj[index] = value;
            }
        })
        zrender.util.each(tpl.visualMap,function(v,k){
            if(v.seriesName === me.seriesName){
                tpl.visualMap[k] = obj;
                isNewV = false;
            }
        })
        if(isNewV){
            tpl.visualMap.push(obj)
        }
        
        return tpl.visualMap;
    },
    // 反序列化
    deserialize: function(){
        //this.font = new vmd.d.webchart.util.Font();
        //this.objDataConnect = new vmd.d.webchart.util.DataConnect();
    }

})