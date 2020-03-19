Vmd.define('hwchart.managetabs.LayerManage', {
    requires: []
}, function () {
    var zUtil = zrender.util;
    var layersCon = null;
    var changeSeries = [];
    var changeSeriesIndex = [];
    var isCheck;
    var selseRadio = null;
    function LayerManage(ecModel,api,parets) {
        var me = this;
        
        layersCon = $('<div id="hwcharts-layer"></div>');
		$(parets).html('');
        $(parets).append(layersCon)
        me.ecModel = ecModel;
        me.api  = api;
        me.chart = api.getChart();
        me.chart.seriesSelected = me.chart.seriesSelected|| {};
        me.layersCon = layersCon; 
        
        var legendModels = ecModel.findComponents({
            mainType: 'legend'
        });
        if(legendModels){
            legendModels.forEach(function(item){
                zUtil.each(item.option.selected,function(v,k){
                    me.chart.seriesSelected[k] = v;
                })
            })
            
        }
       
        me.init(ecModel,api);
    }

    var proto = LayerManage.prototype;

    proto.init = function (ecModel, api) {
        
        layersCon.width("100%");
        layersCon.css('border','1px #eee solid')
        
        var me = this;
        me.chart = api.getChart();
        me.series = me.chart.getOption().series;
        me.layers = me.chart.getOption().layers;
        // 排序
        me.layers.sort(sortRule);
        // console.log(me.layers)
        if(!me.layers || me.layers.length===0){
            return
        }
        me.createHtml();
        //me.chart.resize();
        me.initAttachEvent();
    };
    // 创建图层html
    proto.createHtml = function(){
        var me = this;
    
        // 排序
        me.layers.sort(sortRule);
        var html = '<ul class="layer-list layer-one">';
    
        me.layers.forEach(function(item,i){
            if(i%2){
                html+='<li class="list-item">\n' +
                    '  <div class="clear-fix layer-name layer-name-color">\n' +
                    '<i class="check '+item.show+'" data-name= '+item.name+' data-childType = '+item.childType+'></i>\n' +
                    '<span>'+item.name+'</span>\n' +
                    ' \n' +
                    '</div>'
            }else{
                html+='<li class="list-item">\n' +
                    ' <div class="clear-fix layer-name">\n' +
                    ' <i class="check '+item.show+'" data-name= '+item.name+' data-childType = '+item.childType+'></i>\n' +
                    ' <span>'+item.name+'</span>\n' +
                    ' \n' +
                    ' </div>'
            }
    
            if(item.children&&item.children.length>0){
                html += '<ul class="layer-list layer-two">';
                item.children.forEach(function(val){
                    html += '<li class="list-item">\n' +
                        ' <div class="clear-fix layer-name '+item.childType+'">\n' +
                        ' <i class="check  '+val.show+'" data-name='+val.name+' data-childType="isChild"></i>\n' +
                        ' <span>'+val.name+'</span>\n' +
                        ' </div>\n' +
                        ' </li>'
                })
                html += '</ul>';
            }
        })
        html += '</li></ul>';
        layersCon.html(html);

    }
    proto.initAttachEvent = function(){
        var me = this;
        var api=me.api;
        // 显示隐藏图层
        $('#hwcharts-layer').on('click','.check',function(){
            var name = $(this).attr('data-name');
            var childType = $(this).attr('data-childType');
            if($(this).hasClass("true")){
                isCheck = false;
                if(childType == 'undefined' || childType == 'checkbox'){  // 是子集或者子集之间是可复选关系的父级
                    $(this).parents('.list-item').find('.check').addClass('false');
                    $(this).parents('.list-item').find('.check').removeClass('true');
                }
                if(childType == 'isChild'){  
                    if($(this).parent().hasClass('radio')){  // 是单选关系的子集
                       return
                    }else{
                        $(this).addClass('false');
                        $(this).removeClass('true');
                    }
                }
                if(childType == 'radio'){
                    var radioParent = $(this).parent().next().find('.check');
                    for(var i = 0;i<radioParent.length;i++){
                        if($(radioParent[i]).hasClass('true')){
                            selseRadio = i; // 记录上次选中的单选按钮
                        }
                    }
                    $(this).parents('.list-item').find('.check').addClass('false');
                    $(this).parents('.list-item').find('.check').removeClass('true');
                }
            }else{
                isCheck = true;
                if(childType == 'undefined' || childType == 'checkbox'){
                    $(this).parents('.list-item').find('.check').addClass('true');
                    $(this).parents('.list-item').find('.check').removeClass('false');
                }
                if(childType == 'isChild'){
                    if($(this).parent().hasClass('radio')){
                        var radioParent = $(this).parents('.layer-two').find('.check');
                        var n = 0;
                        for(var i = 0;i<radioParent.length;i++){
                            if($(radioParent[i]).hasClass('true')){
                                n = i; // 上次选中的单选按钮
                            }
                        }
                        var radioName = $($(this).parents('.layer-two').find('.check')[n]).attr('data-name');

                        $(this).parents('.layer-two').find('.check').addClass('false');
                        $(this).parents('.layer-two').find('.check').removeClass('true');
                        $(this).addClass('true');
                        $(this).removeClass('false');
                        me.changeSlectedByName(me.layers,radioName,false);
                        me.getchangelayerByName(me.layers,radioName,false)
                        // 视觉映射处理
                        changeSeries = [];
                        me.getchangeSeriesByName(me.layers,name);
                        var vMap = me.chart.getOption().visualMap;
                        changeSeries.forEach(function(item){
                            if(item.visualMapIndex!=undefined&&item.visualMapIndex!=null){
                                vMap.forEach(function(val,i){
                                    if(i ===item.visualMapIndex ){
                                        val.show = true;
                                    }else{
                                        val.show = false;
                                    }
                                })
                            }
                        })
                        me.chart.setOption({
                            visualMap:vMap,
                        })
                        
                    }else{
                        $(this).addClass('true');
                        $(this).removeClass('false');
                    }
                }
                if(childType == 'radio'){
                    $(this).addClass('true');
                    $(this).removeClass('false');
                    var radio = $(this).parent().next().find('.check');
                    $(radio[selseRadio]).removeClass('false');
                    $(radio[selseRadio]).addClass('true');
                    name =  $(radio[selseRadio]).attr('data-name');
                    // for(var i = 0;i<radio.length;i++){
                    //     if(i!=selseRadio){
                    //         var mc = $(radio[i]).attr('data-name');
                    //         me.getchangelayerByName(me.layers,mc,false)
                    //     }
                    // }
                }
            }
        
            me.getchangelayerByName(me.layers,name,isCheck)

            me.changeSlectedByName(me.layers,name,isCheck)

            api.dispatchAction({
                type:'takeGlobalCursor'
            })
        })
        // 图层上移
        $('#hwcharts-layer').on('click','.layer-up',function(){
            var name = $(this).attr('data-name');
            me.layers.forEach(function(item,i){
                if(item.name === name){
                    if(me.layers[i-1]){
                        me.layers[i].zIndex = item.zIndex +1;
                        me.layers[i-1].zIndex = item.zIndex - 1;
                    }
                }
            })
            changeSeries = [];
            me.getchangeSeriesByName(me.layers,name);
            if(changeSeries.length>0){
                var seriese = [];
                changeSeries.forEach(function(item){
                    var z = item.z+1;
                    seriese.push({
                        name:item.name,
                        z:z,
                        dataChanged:true
                    })
                })
                me.chart.setOption({
                    series:seriese,
                    layers:me.layers
                })
                me.createHtml();
            }
        })
        // 图层下移
        $('#hwcharts-layer').on('click','.layer-down',function(){
            var name = $(this).attr('data-name');
            me.layers.forEach(function(item,i){
                if(item.name === name){
                    if(me.layers[i+1]){
                        me.layers[i].zIndex = item.zIndex -1;
                        me.layers[i+1].zIndex = item.zIndex + 1;
                    }
                }
            })
            changeSeries = [];
            me.getchangeSeriesByName(me.layers,name);
            if(changeSeries.length>0){
                var seriese = [];
                changeSeries.forEach(function(item){
                    var z = item.z-1;
                    seriese.push({
                        name:item.name,
                        z:z,
                        dataChanged:true
                    })
                })
                me.chart.setOption({
                    series:seriese,
                    layers:me.layers
                })
                me.createHtml();
            }
        })
		$('#hwcharts-tab').on('click','.colse-ico',function(){
		    me.chart.setOption({
		        layers:me.layers
		    })
		})
    }
    // 改变图层的实现隐藏状态
    proto.getchangelayerByName = function(data,name,isshow){
        var me = this;
        if(data.constructor == Array){
            for(var i = 0;i<data.length;i++){
                var layer = data[i];
                if(name === layer.name){
                    layer.show = isshow;
                    return;
                }else{
                    var children = layer.children;
                    if(children&&children.length>0){
                        me.getchangelayerByName(children,name,isshow);
                    }
                }
            }
        }
    }
    // 获取发生改变的序列索引数组
    proto.getchangeSeriesIndexByName = function(data,name){
        var me = this;
        if(data.constructor == Array){
            for(var i = 0;i<data.length;i++){
                var layer = data[i];
                if(name === layer.name){
                    var objs = layer.objs;
                    if(objs&&objs.length>0){
                        objs.forEach(function(item){
                            var series = me.getSeriesIndexByName(item);
                            if(series!=undefined&&series!=null){
                                changeSeriesIndex.push(series)
                            }
                        })
                        return;
                    }
                    var children = layer.children;
                    if(children&&children.length>0){
                        children.forEach(function(item){
                            me.getchangeSeriesIndexByName(children,item.name)
                        })
                    }
                    return;
                }else{
                    var children = layer.children;
                    if(children&&children.length>0){
                        me.getchangeSeriesIndexByName(children,name);
                    }
                }
            }
        }
    }
    // 记录被修改的序列
    proto.changeSlectedByName = function(data,name,isCheck){
        var me = this;
        if(data.constructor == Array){
            for(var i = 0;i<data.length;i++){
                var layer = data[i];
                if(name === layer.name){
                    var objs = layer.objs;
                    if(objs&&objs.length>0){
                        objs.forEach(function(item){
                            var series = me.getSeriesByName(item);
                            if(series!=undefined&&series!=null){
                                me.chart.seriesSelected[series.name] = isCheck
                            }
                        })
                        return;
                    }
                    var children = layer.children;
                    if(children&&children.length>0){
                        children.forEach(function(item){
                            me.changeSlectedByName(children,item.name,isCheck)
                        })
                    }
                    return;
                }else{
                    var children = layer.children;
                    if(children&&children.length>0){
                        me.changeSlectedByName(children,name,isCheck);
                    }
                }
            }
        }
    }
    // 获取发生改变的序列数组
    proto.getchangeSeriesByName = function(data,name){
        var me = this;
        if(data.constructor == Array){
            for(var i = 0;i<data.length;i++){
                var layer = data[i];
                if(name === layer.name){
                    var objs = layer.objs;
                    if(objs&&objs.length>0){
                        objs.forEach(function(item){
                            var series = me.getSeriesByName(item);
                            if(series){
                                changeSeries.push(series)
                            }
                        })
                        return;
                    }
                    var children = layer.children;
                    if(children&&children.length>0){
                        children.forEach(function(item){
                            me.getchangeSeriesByName(children,item.name)
                        })
                    }
                    return;
                }else{
                    var children = layer.children;
                    if(children&&children.length>0){
                        me.getchangeSeriesByName(children,name);
                    }
                }
            }
        }
    }
    // 通过名字获取对应序列下标
    proto.getSeriesIndexByName = function(name){
        var me =this;
        var ser = null;
        me.series = me.chart.getOption().series;
        me.series.forEach(function(item,i){
            if(item.name === name){
                ser = i
            }
        })
        return ser
    }
     // 通过名字获取对应序列
    proto.getSeriesByName = function(name){
        var me =this;
        var ser = null;
        me.series = me.chart.getOption().series;
        me.series.forEach(function(item,i){
            if(item.name === name){
                ser = item
            }
        })
        return ser
    }
    function sortRule(a, b) {
		return parseFloat(b.zIndex) - parseFloat(a.zIndex);
	};
    
    hwchart.managetabs.LayerManage = LayerManage;
})

