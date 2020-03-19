Vmd.define('hwchart.dialog.IsoArea',{
    requires:[],
},function () { 
    var zUtil = zrender.util;
    var visualMap= null,seleSeries = null;
    var allColors = [];
    var colorIndex = 0;
        /**
     * @constructor
     * @alias module:echarts/chart/helper/SymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function IsoAreaDialog(chart) {
        var me = this;
        me.chart = chart;
        me.series= chart._api.getModel().getSeries();
        me.maps = me.chart.getOption().visualMap;
        me.series.forEach(function(item){
            if(item.subType === 'isoArea' && item.option.data.length>0){
               if(me.maps && isInArr(item.ecModel._seriesIndices,item.seriesIndex)){
                    seleSeries = item;
                    visualMap = me.maps[item.option.visualMapIndex] || maps ;
               }
               
            }
        })
    }

    var isoAreaDialogPro= IsoAreaDialog.prototype;

    // 根据数据生成form数据
    isoAreaDialogPro.getStettings = function(){
        var me = this;
        var formData = [
            {type: "block", blockOffset:0,blockOffset:0,offsetLeft:20,width:630,className:'map-box',list:[
                {type: "block", blockOffset:0,list:[
                    {type: "container", name: "visus-map",inputHeight:100,inputWidth:580,className:'index_chart'},
                ]},
                {type: "block", blockOffset:0,list:[
                    {type: "input", name: 'map_value', width:80, labelWidth: 60,label: "数值", offsetTop:8, value: '',offsetLeft:15},
                    {type:"newcolumn"},
                    {type: "input", name: 'map_color', width:80, labelWidth: 60,offsetTop:8, label: "颜色", value: '',offsetLeft:35},
                ]},
                {type: "block", blockOffset:0,offsetTop:8,list:[
                    {type: "input", name: 'max_value', width:80, labelWidth: 60,label: "最大值", offsetTop:8, value: '',offsetLeft:15},
                    {type:"newcolumn"},
                    {type: "input", name: 'min_value', width:80, labelWidth: 60,offsetTop:8, label: "最小值", value: '',offsetLeft:35},
                ]},
                {type: "block", blockOffset:0,offsetTop:8,list:[
                    {type: "input", name: 'map_dense', width:80, labelWidth: 60,label: "渐变精度", offsetTop:8, value: '',offsetLeft:15,numberFormat:"0"},
                    {type:"newcolumn"},
                    {type: "label", className:'hw-prompt', label: '*渐变精度不宜过大，建议在10以下',offsetLeft:5},
                ]}
            ]}
        ];
        return formData;
    };
    
    // 初始化from表单内容
    isoAreaDialogPro.initFormWin = function(){
        var me = this;
        var chromaColor,chromaValue;
        me.colorPicker = new dhtmlXColorPicker(me.form.getInput("map_color"));
        me.colorPicker.loadUserLanguage("ch");
        me.createHtml();
        // 数值改变
        me.form.attachEvent("onChange", function(name,value){
            if(name==='map_value'){
                if(value>visualMap.max||value<visualMap.min){
                    alert('请填写数据范围内的数据')
                    return;
                }
                colorIndex = Math.round(value/(visualMap.max - visualMap.min)*100);
                var span = $(".grad-step").eq(colorIndex);
                var color = span.css("background-color")
                setColorPickerColor(me.colorPicker,color);
                me.form.setItemValue("map_color", color);
                me.mySlider.setValue(colorIndex)
            }
            if(name === 'map_dense'){
                if(value>10){
                    value = 10
                }
                if(value<1){
                    value = 1
                }
                me.chart.setOption({
                    series:[{
                        name:seleSeries.name,
                        dense:Math.round(parseFloat(value)),
                        requireData:true,
                        dataChange:true
                    }]
                });
            }
            if(name === 'max_value'){
                value = parseFloat(value)
                if(isNaN(value)){
                    alert('请输入数字');
                    return
                }
                me.chart.setOption({
                    visualMap:[{
                        id:visualMap.id,
                        max:value
                    }]
                });
                visualMap.max = value;
                if(visualMap.chroma){
                    visualMap.chroma.value[visualMap.chroma.value.length-1] = value;
                }
                me.createHtml();
            }
            if(name === 'min_value'){
                value = parseFloat(value)
                if(isNaN(value)){
                    alert('请输入数字');
                    return
                }
                me.chart.setOption({
                    visualMap:[{
                        id:visualMap.id,
                        min:value
                    }]
                });
                visualMap.min = value;
                if(visualMap.chroma){
                    visualMap.chroma.value[0] = value;
                }
                me.createHtml();
            }
        })
        // 颜色改变
        me.colorPicker.attachEvent("onSelect", function(color,node){
            var span = me.resDisplay.find(".grad-step").eq(colorIndex);
            var value = parseFloat(span.attr("data-value"));
            var color = color;

            var cColor = visualMap.chroma.colors,
            cValue = visualMap.chroma.value;

            for(var i = 0;i<cValue.length;i++){
                if(value==cValue[i]){
                    cColor[i] = color;
                    break ;
                }else if(value>cValue[i]&&value<cValue[i+1]){
                    cValue.splice(i+1, 0, parseFloat(value));
                    cColor.splice(i+1, 0, color);
                    break;
                }
            }

            var fun = chroma.scale(cColor).domain(cValue)
            me.showColors(fun)
            me.chart.setOption({
                visualMap:[{
                    id:visualMap.id,
                    inRange: {
                        color: allColors
                    },
                    chroma:{
                        colors:cColor,
                        value:cValue
                    }
                }]
            });
        });

    }
    //保存方法
    isoAreaDialogPro.save = function(){
        
       
    }
    // 取消方法
    isoAreaDialogPro.cancel = function(){
        var me = this;
       
    }
    
    isoAreaDialogPro.createHtml = function(){
        var me = this;
        var chartContainer = this.form.getContainer("visus-map");
        $(chartContainer).html('');
        if(!visualMap.chroma){
            visualMap.chroma = {};
            visualMap.chroma.colors =  visualMap.inRange.color;
            visualMap.chroma.value = [visualMap.min,visualMap.max]
        }
        chromaColor = zUtil.clone(visualMap.chroma.colors);
        chromaValue = zUtil.clone(visualMap.chroma.value);

        setColorPickerColor(me.colorPicker,chromaColor[0] || "#C0D0E0");
        me.form.setItemValue("map_color", chromaColor[0] || "#C0D0E0");
        me.form.setItemValue("map_value", chromaValue[0] || visualMap.min );
        me.form.setItemValue("map_dense", seleSeries.option.dense || 4 );
        me.form.setItemValue("max_value", visualMap.max);
        me.form.setItemValue("min_value", visualMap.min);
        
        var s = chroma.scale(chromaColor).domain(chromaValue)

        me.resDisplay = $('<div class="result-display" />').appendTo(chartContainer);

        me.showColors(s);
        
        var mapValue = $('<div class="hw-map-value"><div></div><div></div><div></div><div></div><div></div><div></div></div><div id="hw-map-item-text"></div>');
        
        $(chartContainer).append(mapValue);
        var diffValue = (visualMap.max - visualMap.min)/6;
        var html = ''
        for(var i = 0;i<7;i++){
            html+='<span>'+(parseFloat(visualMap.min)+diffValue*i).toFixed(1)+'</span>'
        }
        $("#hw-map-item-text").html(html);
    }
    // 色条
    isoAreaDialogPro.showColors = function(fun) { 
        var me = this;
        me.resDisplay.html('');
        allColors = [];
        //var sider = $('<div class="hwmap-sider" />');
        var sider = $('<div id ="sliderObj" />');
        try {
            me.resDisplay.html('<ol><li>'+resRec(fun)+'</li>'+'</ol>')
        } catch (e) {
            console.warn(e);
        }

        sider.appendTo(me.resDisplay);
        me.mySlider = new dhtmlXSlider({
            parent: "sliderObj",
            size:   542,           
            step:   1,
            min:    0,
            max:    100,
            value:  colorIndex
        });
        me.mySlider.attachEvent("onSlideEnd",function(index){
            colorIndex = index;
            var span = $(".grad-step").eq(colorIndex);
            var value = span.attr("data-value");
            var color = span.css("background-color")
            setColorPickerColor(me.colorPicker,color);
            me.form.setItemValue("map_color", color);
            me.form.setItemValue("map_value", value);
        })
        function resRec(d) {
            if ($.isArray(d)) {
                return '['+d.map(d.length > 2 ? resShort : resLong).join(',')+']';
            }
            return resLong(d);

            function resLong(d) {
                if ($.isFunction(d)) {
                    var s = '';
                    var dom = d.domain ? d.domain() : [0,1],
                        dmin = Math.min(dom[0], dom[dom.length-1]),
                        dmax = Math.max(dom[dom.length-1], dom[0]);
                    for (var i=0;i<=100;i++) {
                        allColors.push(''+d(dmin + i/100 * (dmax - dmin))+'')
                        s += '<span class="grad-step" data-value = '+(i/100 * (dmax - dmin)).toFixed(1)+' style="background-color:'+d(dmin + i/100 * (dmax - dmin))+'"></span>';
                    }
                    return '<div class="gradient">'+s+'</div>';
                }
            }

            function resShort(d) {
                if (typeof d == 'string') {
                    // string color, e.g. hex value
                    return '<span class="cm-string cm-color cm-small" data-color="'+d+'"><span class="cm-hidden-text">\''+chroma(d).hex()+'\'</span></span>';
                } else if (typeof d == 'object' && d._rgb) {
                    // chroma.js object
                    return '<span class="cm-string cm-color cm-small" data-color="'+d.css()+'"><span class="cm-hidden-text">\''+d.hex()+'\'</span></span>';
                } else if ($.isNumeric(d)) {
                    return '<span class="cm-number">'+round(d,2)+'</span>';
                } else if (isNaN(d)) {
                    return '<span class="cm-number cm-nan">NaN</span>';
                }
            }

            function round(d, p) {
                var n = Math.pow(10, p);
                return Math.round(d*n) / n;
            }
        }
    }

    //拾色器赋值
    function setColorPickerColor(colorPicker, color){
        colorPicker.setColor(color);
        for(var i=0;i<colorPicker._nodes.length;i++){
            var node=colorPicker._nodes[i].node;
            node.style.backgroundColor=color;
            node.style.color = color;
        }
    };

    function isInArr(arr, value){
        var isIn = false;
        for(var i=0;i<arr.length;i++){
            if(arr[i] == value){
                isIn = true;
            }
        }
        return isIn;
    };
    
    hwchart.dialog.IsoArea = IsoAreaDialog
})