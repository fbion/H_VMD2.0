/******************************************************************
 ** 文件名: hwAPI.js
 ** Copyright (c) 2017-2019 汉威公司技术研究院
 ** 创建人:黄娜娜
 ** 日 期:2019-09-05
 ** 修改人:黄娜娜
 ** 日 期:2019-09-05
 ** 描 述:曲线自定义接口
 ** 版 本:2.0
 ******************************************************************/

(function () {
    var bootPath = CreateJSPath("hwAPI.js",-1);
    var pBootPath = CreateJSPath("hwAPI.js",-2);
    var needDhtmlx = true; //是否需要加载dhtmlx
    var hasContextMenu = false; //是否有右键菜单
    var dhtmlxLoaded = false; //标记是否已经加载过dhtmlx
    var dhxVersion = "5";
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    if(!ContainsJS("json2.js")){
        document.write("<script src=\"" + bootPath + "/libs/json/json2.js\"></script>");
    }
    if(!ContainsJS("hwstock.src.js")){
        document.write("<script src=\"" + bootPath + "/js/hwstock.src.js\"></script>");
    }
    if(!ContainsJS("hwcharts-more.src.js")){
        document.write("<script src=\"" + bootPath + "/js/hwcharts-more.src.js\"></script>");
    }
    if(!ContainsJS("hwcharts-plugin.src.js")){
        document.write("<script src=\"" + bootPath + "/js/hwcharts-plugin.src.js\"></script>");
    }
	if(!ContainsJS("xrange.src.js")){
        document.write("<script src=\"" + bootPath + "/js/modules/xrange.src.js\"></script>");
	}
    if(!ContainsJS("data.src.js")){
        document.write("<script src=\"" + bootPath + "/js/modules/data.src.js\"></script>");
    }
    if(ContainsJS("hwApiEX.js")){
        dhtmlxLoaded = true;
    }
	if(!ContainsJS("hwChartApi.src.js")){
        document.write("<script src=\"" + bootPath + "/js/hwChartApi.src.js\"></script>");
    }
    if(!ContainsJS("defaultData.js")){
        document.write("<script src=\"" + bootPath + "/data/defaultData.js\"></script>");
	}
    var ieMode = getIEDocumentMode();
    if(ieMode && ieMode < 9){
        document.write("<script src=\"" + bootPath + "/js/modules/oldie.src.js\"></script>");
    }
    
} ());

/*
    * 曲线构造函数
    * @param container  object 创建曲线的父容器对象
    * @param type  String 曲线类型 line/pie/column/spline/area/annular 默认为line
*/
function HwChart(container,type) {
    this.container = container;
    this.type = type || 'line';
    this._events = {};
    this.bootPath = CreateJSPath("hwAPI.js",-1);
    this.charttplpath = "/chart/template/" + (this.type || "line") + ".js";
    this.myMask =  new Ext.LoadMask(Ext.getBody(),{
            msg: "数据加载中,请稍后...",
            msgCls: 'z-index:10000;'
        })
};
 

 
// Array.prototype.remove = function (index) {
//     /// <summary>移除项</summary>
//     /// <param name="index" type="Number">索引</param>
//     /// <returns type="Array" />
//  
//     if (isNaN(index) || index > this.length) return;
//     this.splice(index, 1);
// };
HwChart.prototype = {
    constructor :HwChart,

    addEventListener:function (type, listener, capture ) {
        /// <summary>添加事件侦听器</summary>
        /// <param name="type" type="String">事件类型</param>
        /// <param name="listener" type="Function">触发的函数</param>
        /// <param name="capture" type="Boolean" optional="true">是否在捕获阶段触发(这里只是做了顺序排列)</param>
     
        // 判断一下传入的参数是否符合规格
        if (typeof type !== "string" || typeof listener !== "function") return;
     
        // 缓存符合条件的事件列表
        var list = this._events[type];
     
        // 判断是否已经有该类型事件，若没有则添加一个新数组
        if (typeof list === "undefined") list = (this._events[type] = []);
     
        /* 判断插入函数的位置 */
        if (!!capture) list.push(listener);
        else insert(0, listener,list);
     
        return this;
				
				function insert(index, value,list) {
				    /// <summary>插入项</summary>
				    /// <param name="index" type="Number">索引</param>
				    /// <param name="value" type="Object">元素</param>
				    /// <returns type="Array" />
				 
				    if (index > list.length) index = list.length;
				    if (index < -list.length) index = 0;
				    if (index < 0) index = list.length + index;
				    for (var i = list.length; i > index; i--) {
				        list[i] = list[i - 1];
				    }
				    list[index] = value;
				    return list;
				};
    },
    removeEventListener:function (type, listener, capture) {
        /// <summary>移除事件侦听器</summary>
        /// <param name="type" type="String">事件名称</param>
        /// <param name="listener" type="Function">触发的函数</param>
        /// <param name="capture" type="Boolean">是否在捕获阶段触发</param>
     
        // 判断一下传入的参数是否符合规格
        if (typeof type !== "string" || typeof listener !== "function") return this;
     
        // 缓存符合条件的事件列表
        var list = this._events[type];
     
        // 若没有绑定过此类事件则不需要做处理
        if (typeof list === "undefined") return this;
     
        for (var i = 0, len = list.length; i < len; i++) {
            // 通过循环判断来确定事件列表中存在要移除的事件侦听函数
            if (list[i] == listener) {
                // 找到后将此侦听函数从事件列表中移除
                // list.remove(i);
								 list.splice(index, 1);
                break;
            }
        }
        return this;
    },
    fireEvent:function (type,e,e1) {
        /// <summary>触发事件</summary>
        /// <param name="type" type="String">事件名称</param>
        /// <param name="e" type="Object">附加参数对象</param>
     
        // 若存在DOM0用法的函数，则触发
        this["on" + type.toLowerCase()] && this["on" + type.toLowerCase()].call(this, e,e1);
     
        // 缓存符合条件的事件列表
        var list = this._events[type];
     
        // 若事件列表中没有内容则不需要做处理
        if (!list || list.length <= 0) return this;
     
        // 阻止事件冒泡开关
        var isStop = false;
     
        // 模拟事件对象
        window.event = { stopPropagation: function () { isStop = true; } };
        e.stopPropagation = window.event.stopPropagation;
        e1.stopPropagation = window.event.stopPropagation;
        for (var i = 0, len = list.length; i < len; i++) {
            // 通过循环触发符条件的事件列表中存在的所有事件侦听函数
            // 若函数内返回false或事件内调用了event.stopPropagation函数则阻止接下来的所有调用
            if (list[i].call(this, e,e1) === false || isStop) break;
        }
        return this;
    },
    /*
     * 初始化基本参数 确认序列数量名称及Y轴数量名称  
     * @param seriesName  Array 序列/指标数量名称  不传或者是空默认只有一条序列
     * @param yAxisName  Array  Y轴坐标轴的名称  不传或者是空默认只有一条Y轴
    */
    chartInit:function(seriesName,yAxisName){
        var me = this;
        var colors = ['#7cb5ec', '#9a4b48', '#90ed7d', '#f7a35c','#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1','#E6645C', '#55A9DC', '#886DB3','#7cb5ec', '#9a4b48', '#90ed7d', '#f7a35c','#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b'];
            me.tplJSON = me.deepCopy(defauleTemplate);
            if(seriesName&&seriesName.length>0){
                for(var i = 0;i<seriesName.length;i++){
                    var defSeries = me.deepCopy(defaultSeries);
                    defSeries.id = "series-"+ seriesName[i].toString()+"-"+ i;
                    defSeries.name = seriesName[i];
                    defSeries.type = me.type;
                    defSeries.color = colors[i];
                    defSeries.marker = defSeries.marker ||{};
                    defSeries.marker.fillColor = colors[i];
                    me.tplJSON.series[i] = defSeries;
                }
            }
            if(yAxisName&&yAxisName.length>0){
                for(var j = 0;j<yAxisName.length;j++){
                    var defAsise = me.deepCopy(defultAxis);
                    defAsise.id = "yAxis-"+ yAxisName[j].toString()+"-"+ j;
                    defAsise.dynamicAxiseName = yAxisName[j];
                    defAsise.title = defAsise.title || {};
                    defAsise.title.text = yAxisName[j];
                    me.tplJSON.yAxis[j] = defAsise;
                }
            }else{
                me.tplJSON.yAxis[0].dynamicAxiseName = '竖轴'
            }
    },
    cAlert:function(msg){
        return Ext.Msg.show({
            title: "提示",
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    },
    onRender: function() {
        var me = this;
        me.myMask.show();
        if (!me.el) {
            me.el = me.container;
            me.container.el.dom.style.width =  me.container.el.dom.clientWidt+'px'
            me.container.el.dom.style.height = me.container.el.dom.clientHeight+'px'
        }
        if(!me.tplJSON){
            //加载模版
            me.getJSON(vmd.virtualPath + this.charttplpath, function(template) {
                me.tplJSON = me.deepCopy(template);
                //加载数据
                me.getJSON(vmd.virtualPath + "/chart/data/data.js", function(data) {
                    loadDataSuccess = true;
                    me.chartdata = data;
                    if (me.tplJSON && me.chartdata) {
                        me.tplJSON.data.json = me.chartdata;
                        me.loadSuccess();
                    }
                }, function(msg) {
                    me.myMask.hide();
                    me.cAlert('数据加载失败');
                });
            }, function(msg) {
                me.myMask.hide();
                me.cAlert('模板加载失败');
            });
        }else{
            var loadedModules = 0;
            if (me.tplJSON.modules && me.tplJSON.modules.length > 0) {
                for (var i = 0; i < me.tplJSON.modules.length; i++) {
                    if (me.tplJSON.modules[i] == "dataviews") {
                        $LAB.script(vmd.virtualPath + "/chart/js/plugins/data-extract.src.js").wait();
                        $LAB.script(vmd.virtualPath + "/chart/js/plugins/export-csv.js").wait();
                        $LAB.script(vmd.virtualPath + "/chart/js/plugins/data-review-5.src.js").wait(function() {
                            loadedModules++;
                            if (loadedModules == me.tplJSON.modules.length) {
                                me.loadSuccess();
                            }
                        });
                    } else if (me.tplJSON.modules[i] == "imgexport") {
                        me.tplJSON.exporting = me.tplJSON.exporting || {};
                        me.tplJSON.exporting.url = vmd.virtualPath + "/chart/ashx/ImageExport.ashx";
                        $LAB.script(vmd.virtualPath + "/chart/js/load/bluebird.js").wait();
                        $LAB.script(vmd.virtualPath + "/chart/js/load/html2canvas.js").wait();
                        $LAB.script(vmd.virtualPath + "/chart/js/load/canvg.js").wait();
                        $LAB.script(vmd.virtualPath + "/chart/js/load/downloadify.js").wait();
                        $LAB.script(vmd.virtualPath + "/chart/js/load/swfobject.js").wait();
                        $LAB.script(vmd.virtualPath + "/chart/js/modules/exporting.src.js").wait();
                        $LAB.script(vmd.virtualPath + "/chart/js/modules/exporting-plug-5.src.js").wait(function() {
                            loadedModules++;
                            if (loadedModules == me.tplJSON.modules.length) {
                                me.loadSuccess();
                            }
                        });
                    } else if (me.tplJSON.modules[i] == "legendDraging") {
                        $LAB.script(vmd.virtualPath + "/chart/js/plugins/drag-legend.src.js").wait(function() {
                            loadedModules++;
                            if (loadedModules == me.tplJSON.modules.length) {
                                me.loadSuccess();
                            }
                        });
                    } else if (me.tplJSON.modules[i] == "setProperty") {
                        $LAB.script(vmd.virtualPath + "/chart/js/plugins/point-delete-recovery.src.js").wait();
                        $LAB.script(vmd.virtualPath + "/chart/js/plugins/series-add-delete.src.js").wait();
                        $LAB.script(vmd.virtualPath + "/chart/js/plugins/property-interact.src.js").wait(function() {
                            loadedModules++;
                            if (loadedModules == me.tplJSON.modules.length) {
                                me.loadSuccess();
                            }
                        });
                    }else if (me.tplJSON.modules[i] == "toolBar") {
                        $LAB.script(vmd.virtualPath + "/chart/js/plugins/toolbar.src.js").wait(function() {
                            loadedModules++;
                            if (loadedModules == me.tplJSON.modules.length) {
                                me.loadSuccess();
                            }
                        });
                    }
                }
    
            } else {
                me.loadSuccess();
            }
        }
    },
    getJSON : function(url, success, error) {
        vmd.ajax({
            das: false,
            url: url,
            type: 'get',
            timeout: 10000,
            dataType: "json",
            data: {},
            success: function(result) {
                success.apply(null, [result]);
            },
            error: function(msg, f) {
                error.apply(null, [msg]);
            }
        })
    },
    //深度拷贝对象或数组
    deepCopy : function() {
        var i,
            args = arguments,
            len,
            ret = {},
            doCopy = function(copy, original) {
                var value, key;
                if (typeof copy !== 'object') {
                    copy = {};
                }

                for (key in original) {
                    if (original.hasOwnProperty(key)) {
                        value = original[key];
                        if (value && typeof value === 'object' && Object.prototype.toString.call(value) !== '[object Array]' &&
                            key !== 'renderTo' && typeof value.nodeType !== 'number') {
                            copy[key] = doCopy(copy[key] || {}, value);

                            // Primitives and arrays are copied over directly
                        } else if (Object.prototype.toString.call(value) === '[object Array]') {
                            copy[key] = doCopy(copy[key] || [], value);
                        } else {
                            copy[key] = original[key];
                        }
                    }
                }
                return copy;
            };

        // If first argument is true, copy into the existing object. Used in setOptions.
        if (args[0] === true) {
            ret = args[1];
            args = Array.prototype.slice.call(args, 2);
        }

        // For each argument, extend the return
        len = args.length;
        for (i = 0; i < len; i++) {
            ret = doCopy(ret, args[i]);
        }

        return ret;
    },
    loadSuccess : function(){
        var me = this;
        if(me.tplJSON){
            me.chart = Highcharts.chart(me.container.el.dom, me.tplJSON, function(oThis) {
                // 记录模板对象到到导出对象中
                oThis.options.exportOptions = me.deepCopy(oThis.options);
                oThis.options.exportOptions.globalOptions = oThis.globalOptions;
                oThis.options.globalOptions = oThis.globalOptions;
            });
            me.chart.parentObject = me;
            //me.fireEvent('afterChartRender', me, event);
            me.myMask.hide();
        }
    },
    /*设置标题
        option{
            text:text, 标题文本 
            align:align, 对齐方式 left\center\right 选填
            color:color, 标题颜色 选填
            fontSize:fontSize,  标题文字大小  选填
            fontWeight:fontWeight  标题文本样式  选填
        }
    */
	setTitle: function(option) {
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        var defOption = option || {};
			me.tplJSON.title = me.tplJSON.title || {};
            me.tplJSON.title.text = defOption.text;
            me.tplJSON.title.align = defOption.align ||'center';
            me.tplJSON.title.style = me.tplJSON.title.style ||{};
            me.tplJSON.title.style.color = defOption.color || '#333';
            me.tplJSON.title.style.fontSize = defOption.fontSize || '14px';
            me.tplJSON.title.style.fontWeight = defOption.fontWeight || 'nomal';
            me.tplJSON.title.style.fontStyle = defOption.fontStyle ||'normal';
            me.tplJSON.title.style.fontFamily = defOption.fontFamily ||'Microsoft YaHei';
    },
    // 标题浮动设置
    cSetTitleFloat:function(bool){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        bool = !!bool;
        me.tplJSON.title.floating = bool;
    },
    // 设置曲线数据
    cSetData:function(data){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        me.tplJSON.data.json = data;
    }, 
    /*
     * 设置序列字段
     *{xStr:xStr,yArr:yArr,nArr:nArr}
     * @param xStr  String X轴对应字段 必填
     * @param yArr  Array Y轴对应字段  必填
     * @param yAxisArr  Array  对应所属Y轴  选填  不填默认所有序列都所属第一条Y轴
    */
    cSetSeriesField:function(option){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        var seriesMapping = [];
        for(var i = 0 ;i<me.tplJSON.series.length;i++){
            // 数据映射
            var item = {
                x:option.xStr,
                y:option.yArr[i]
            }
            seriesMapping.push(item);
            me.tplJSON.series[i].xData = option.xStr;
            me.tplJSON.series[i].yData = option.yArr[i];
            // 所属Y轴
            if(option.yAxisArr && option.yAxisArr.length == me.tplJSON.series.length){
                for(var j = 0;j<me.tplJSON.yAxis.length;j++){
                    if(me.tplJSON.yAxis[j].dynamicAxiseName == option.yAxisArr[i]){
                        me.tplJSON.series[i].yAxis = me.tplJSON.yAxis[j].id;
                    }
                }
            }
            
        }
        me.tplJSON.data.seriesMapping =  seriesMapping;
       
    },
/******************************************************X轴坐标轴设置******************************************************************/
    /*
     * 设置x轴相关属性
     * @param name  String  轴名称  
     * @param xType String X轴类型  ''或者不传值 默认线性轴 1-线性轴/2-时间轴/3-分类轴/4-对数轴
     * @param dateFormat  时间轴时间格式  轴类型为时间轴时传入 默认'yyyy-mm-dd' 选填
    */
   cSetxAxis:function(name,xType,dateFormatSrt){
       var me = this;
        if(xType){
            switch(xType){
                case 1:
                    xType = 'linear';
                    break;
                case 2:
                    xType = 'datetime';
                    break;
                case 3:
                    xType = 'category';
                    break;
                case 4:
                    xType = 'logarithmic';
                    break;
        
            }
        }
        if(dateFormatSrt){
            dateFormatSrt = {
                millisecond: date_replace_dateFormat(dateFormatSrt), 
                second:date_replace_dateFormat(dateFormatSrt),
                minute:date_replace_dateFormat(dateFormatSrt),
                hour:date_replace_dateFormat(dateFormatSrt),
                day:date_replace_dateFormat(dateFormatSrt),
                week:date_replace_dateFormat(dateFormatSrt),
                month:date_replace_dateFormat(dateFormatSrt),
                year:date_replace_dateFormat(dateFormatSrt)
            }
        }else{
            dateFormatSrt = {
                day: "%Y-%m-%d",
                hour: "%Y-%m-%d",
                millisecond: "%Y-%m-%d",
                minute: "%Y-%m-%d",
                month: "%Y-%m-%d",
                second: "%Y-%m-%d",
                week: "%Y-%m-%d",
                year: "%Y-%m-%d",
            }
        }
        me.tplJSON.xAxis[0].title = me.tplJSON.xAxis[0].title ||{};
        me.tplJSON.xAxis[0].title.text = name || '横轴';
        me.tplJSON.xAxis[0].type = xType ||'linear';
        me.tplJSON.xAxis[0].dateTimeLabelFormats = dateFormatSrt;
        if (!me.tplJSON.tooltip) {
            me.tplJSON["tooltip"] = {}
        }
        me.tplJSON["tooltip"].dateTimeLabelFormats = dateFormatSrt;
   },
    // x轴是否显示
    cSetxAxisEnabled:function(bool){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        bool = !!bool;
        me.tplJSON.xAxis[0].visible = bool;
    },
    // 设置X轴标签像素间隔
    cSetlabelsStep:function(num){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        me.tplJSON.xAxis[0].labels.step = parseFloat(num || 1);
    },
   /**
	 * 设置x轴标题的样式
     * option{
        align:align, 对齐方式 low-跟最小值对齐，middle-居中对齐，high-与最大值对齐 选填
        color:color, 标题颜色 选填
        fontSize:fontSize,  标题文字大小  选填
        fontWeight:fontWeight  标题文本样式  选填
     * }
	 */
    cSetxAxisTitleStyle:function(option){
        var me = this,
        defOption = option ||{};
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
		var xAxis = me.tplJSON.xAxis[0];
        xAxis.title = xAxis.title || {};
        xAxis.title.align = defOption.align || "middle";
        xAxis.title.style = xAxis.title.style ||{};
        xAxis.title.style.color = defOption.color ||'#666';
        xAxis.title.style.fontSize = defOption.fontSize ||'12px';
        xAxis.title.style.fontWeight = defOption.fontWeight ||'normal';
        xAxis.title.style.fontStyle = defOption.fontStyle ||'normal';
        xAxis.title.style.fontFamily = defOption.fontFamily ||'Microsoft YaHei';
    },
    // x轴标题是否显示
    cSetxAxisTitleEnabled:function(bool){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        bool = !!bool;
        me.tplJSON.xAxis[0].title.enabled = bool;
    },
     /**
	 * x轴标题的位置设置
     * option{
        align:'middle',"low"，"middle" 和 "high"，分别表示于最小值对齐、居中对齐、与最大值对齐
        offset:0, number 坐标轴标题相对于轴线的偏移量
        rotation:0, number 旋转度 选填
        x:0, number x方向偏移值 选填
        y:0,  number y方向偏移值 选填
     * }
	 */
    cSetxAxisTitlePostion:function(option){
        var me = this,
        defOption=option || {}; 
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        me.tplJSON.xAxis[0].title.align = parseFloat(defOption.align) ||'middle';
        me.tplJSON.xAxis[0].title.rotation = parseFloat(defOption.rotation) ||0;
        if(defOption.offset){
            me.tplJSON.xAxis[0].title.offset = parseFloat(defOption.offset);
        }
        me.tplJSON.xAxis[0].title.x = parseFloat(defOption.x) ||0;
        me.tplJSON.xAxis[0].title.y = parseFloat(defOption.y)||0;
    },
    /**
	 * 设置x轴轴标签的样式
     * option{
        align:align, left\center\right 选填
        rotation:rotation, number 旋转度 选填
        color:color, 标题颜色 选填
        fontSize:fontSize,  标题文字大小  选填
        fontWeight:fontWeight  标题文本样式  选填
        fontFamily：fontFamily 字体 选填
     * }
	 */
    cSetxAxisLablesStyle:function(option){
        var me = this,
        defOption = option ||{};
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
		var xAxis = me.tplJSON.xAxis[0];
        xAxis.labels = xAxis.labels || {};
        xAxis.labels.align = defOption.align || "center";
        xAxis.labels.rotation = parseFloat(defOption.rotation) || 0;
        xAxis.labels.style = xAxis.labels.style ||{};
        xAxis.labels.style.color = defOption.color ||'#666';
        xAxis.labels.style.fontSize = defOption.fontSize ||'12px';
        xAxis.labels.style.fontWeight = defOption.fontWeight ||'normal';
        xAxis.labels.style.fontStyle = defOption.fontStyle ||'normal';
        xAxis.labels.style.fontFamily = defOption.fontFamily ||'Microsoft YaHei';
        
    },
    /**
	 * X轴轴线设置
     * lineWidth number  轴线宽度
     * lineColor string 轴线颜色
	 */
    cSetxAxislineStyle:function(lineWidth,lineColor){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
		var xAxis = me.tplJSON.xAxis[0];
        xAxis.lineWidth = parseFloat(lineWidth) || 1;
        xAxis.lineColor = lineColor || "#ccd6eb"
    },
    /**
	 * X轴轴刻度线设置
     * option{
        color:color, 刻度线颜色  选填
        width:width, number 刻度线宽度 选填
        length:length, number  刻度线长度  选填
        Interval:Interval,  number 刻度线之间数值间隔  选填
        PixelInterval:PixelInterval  number 刻度线之间像素间隔  选填
        Pos:Pos  string 刻度线位置  inside、outside   选填
     * }
	 */
    cSetxAxisTick:function(option){
        var me = this,
        defOption = option ||{};
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
		var xAxis = me.tplJSON.xAxis[0];
        xAxis.tickColor = defOption.color || '#ccd6eb';
        xAxis.tickWidth = parseFloat(defOption.width) || 1;
        xAxis.tickPosition = defOption.Pos || 'inside';
        xAxis.tickLength = parseFloat(defOption.length) || 3;
        if(defOption.PixelInterval){
            xAxis.tickPixelInterval = defOption.PixelInterval;
        }
        if(defOption.Interval){
            xAxis.tickInterval = parseFloat(defOption.Interval);
        }
    },
     /**
	 * X轴网格线设置
     * option{
        color:color, 线条颜色  选填
        width:width, number 线条宽度 选填
        style:style, number  线条样式  选填  线型 0-10 的数值，不填默认 0 Solid 实线  
        ZIndex:ZIndex,  number 网格线层叠  0 在图像下面  越大层级越高  选填
     * }
	 */
    cSetxAxisgridLine:function(option){
        var me = this,
        defOption = option ||{};
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
		var xAxis = me.tplJSON.xAxis[0];
        xAxis.gridLineColor = defOption.color || '#ccd6eb';
        xAxis.gridLineWidth = parseFloat(defOption.width) || 1;
        xAxis.gridLineDashStyle = me.getLineStyle(defOption.style) || 'Solid';
        xAxis.gridZIndex = parseFloat(defOption.ZIndex) || 1;
    },
		 /**
		* X轴标示线
		* width 标示线宽度
		* color 标示线颜色
		* value 标示线所在位置
		* textOption{
		     text:text, 标示线注释文本
		     style: {   文本样式
		     	color: '#333',  文本颜色
		     	verticalAlign: 'top', 文本对齐方式 top、middle、bottom
		     	y: 10
		     },
		     rotation: r, // 旋转度
		     x: 0, // 偏移值
		  * }
		*/
		cSetxAxisePlotLines: function(width, color, value, textOption) {
			var that = this,
				textOption = textOption || {},
				num = 0;
			var type = that.tplJSON.xAxis[num].type;
			var r = 90;
			if(textOption.rotation!=undefined &&textOption.rotation!=null) {
				r = textOption.rotation
			}
			var plotLine = {
				width: parseFloat(width),
				color: color,
				value: type == "datetime" ? date_getMillisecond(value) : parseFloat(value),
				label: {
					text: textOption.text || '',
					style: {
						color: textOption.color || '#333',
						verticalAlign: textOption.align || 'top',
						y: 10
					},
					rotation: r,
					useHTML: true,
					x: textOption.x || 0,
				}
			}
			that.tplJSON.xAxis[num].plotLines = that.tplJSON.xAxis[num].plotLines || [];
			that.tplJSON.xAxis[num].plotLines.push(plotLine)
		},
		 /**
		* 清除标示线
		* axiseType 轴类型  "x"/"y"
		* AxiseIndex  第几根轴（用于多Y轴情况下，不填默认第0条）
		*/
		deleAxisePlotLines: function(axiseType, AxiseIndex) {
			var that = this,
				num = AxiseIndex || 0;
			if (axiseType == 'x' || axiseType == 'X') {
				that.tplJSON.xAxis[num].plotLines = [];
			} else if (axiseType == 'y' || axiseType == 'Y') {
				that.tplJSON.yAxis[num].plotLines = [];
			}
		},
/******************************************************Y轴坐标轴设置**************************************************************/
     // 多Y轴曲线自动计算高度及间隔 yAxisNames 自动计算高度的坐标轴名称
     cSetAtouMultiayAxis:function(yAxisNames,spacing){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        var yAxises = me.tplJSON.yAxis;
        if(yAxisNames instanceof Array){
            var arr = yAxisNames;
        }else if(typeof yAxisNames=='string'){
            var arr = yAxisNames.split(',');
        }
        var yAxisArr = [];
        for(var i = 0;i<yAxises.length;i++){
            for(var j = 0;j<arr.length;j++){
                if($.trim(yAxises[i].dynamicAxiseName) == $.trim(arr[j])){
                    yAxisArr.push(yAxises[i]);
                }
            }
        }
				
				if (me.tplJSON.chart.marginTop) {
            var ch = 0;
        } else {
            var ch = 36/me.container.el.dom.clientHeight*100;
        }
				spacing = (spacing || 20) /me.container.el.dom.clientHeight * 100;
        var len = yAxisArr.length;
        var h = Math.round(((100-ch) - (len-1)* spacing) / len * 100) / 100;
        for(var k = 0;k<len;k++){
            if(k ==0){
                yAxisArr[k].height = h + "%";
                yAxisArr[k].top = ch +"%" ;
            }else{
                yAxisArr[k].height = h + "%";
                yAxisArr[k].top = (h * k + spacing * k  + ch) +"%" ;
            }
            yAxisArr[k].direction = 'vertical';
        }
    },
    // 设置水平方向排列州的高度和位置  yAxisNames 需要设置高度和位置的轴  yName 参考轴的轴名
    cSetHyAxisPos:function(yAxisNames,yName){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        var yAxises = me.tplJSON.yAxis;
        if(yAxisNames instanceof Array){
            var arr = yAxisNames;
        }else if(typeof yAxisNames=='string'){
            var arr = yAxisNames.split(',');
        }
        var seleyAxis;
        for(var i = 0;i<yAxises.length;i++){
            if($.trim(yAxises[i].dynamicAxiseName) == yName){
                seleyAxis = yAxises[i];
            }
            if(seleyAxis){
                for(var i = 0;i<yAxises.length;i++){
                    for(var j = 0;j<arr.length;j++){
                        if($.trim(yAxises[i].dynamicAxiseName) == $.trim(arr[j])){
                            yAxises[i].height = seleyAxis.height;
                            yAxises[i].top = seleyAxis.top;
                        }
                    }
                }
            }
        }
    },
    // 设置Y轴的排列方向 type  1 为横排排列  2 为竖排排列 yAxisName  坐标轴名称 不传默认所有Y轴
    cSetyAxisDirection:function(type,yAxisName){
        var me = this,
        direction = '';
        allYaxis = me.tplJSON.yAxis;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if(type == 1){
            direction = 'horizontal';
        }else{
            direction = 'vertical';
        }
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == yAxisName){
                    allYaxis[i].direction = direction;
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].direction = direction;
            }
        }
    },
    /**
	 * 设置Y轴的位置
     * @param name  坐标轴的轴名称  必填
      * option{
        * @param height number  轴高度 数字或者百分比 空或者不填 默认100%
        * @param top  number 轴线距离曲线顶部的距离 数字或者百分比 空或者不填 默认0
        * @param offset number 坐标轴距离绘图区的像素值 
        * @param opposite bool  坐标轴是否对面显示
     * }
	 */
    cSetyAxisPostion:function(name,option){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
		var allYaxis = me.tplJSON.yAxis;
        var defOption = option ||{};
        for(var i = 0;i<allYaxis.length;i++){
            if(allYaxis[i].dynamicAxiseName == name){
                allYaxis[i].height = defOption.height || allYaxis[i].height || '100%';
                allYaxis[i].top = defOption.top || allYaxis[i].top || '0%';
                allYaxis[i].offset = parseFloat(defOption.offset) || allYaxis[i].offset;
                allYaxis[i].opposite = defOption.opposite || allYaxis[i].opposite ;
                if(defOption.top&&defOption.height){
                    allYaxis[i].direction = 'vertical';
                }
            }
        }
    },
     /**
	 * 设置Y轴的最大值最小值
        * @param name  坐标轴的轴名称  必填
        * @param max number  坐标轴最大值  空或者null 为自动计算
        * @param min   number 坐标轴最小值 空或者null 为自动计算
	 */
    cSetyAxisValue:function(name,max,min){
        var me = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
		var allYaxis = me.tplJSON.yAxis;
        for(var i = 0;i<allYaxis.length;i++){
            if(allYaxis[i].dynamicAxiseName == name){
                if(!isNaN(parseFloat(max))){
                    allYaxis[i].max = max;
                }
                if(!isNaN(parseFloat(min))){
                    allYaxis[i].min = min;
                }
            }
        }
    },
    /*
     * 设置Y轴轴类型
     * @param yType String X轴类型  ''或者null 默认线性轴 1-线性轴/2-时间轴/3-分类轴/4-对数轴
     * @param name  String  轴名称  传入""或者不传则默认所有Y轴共用此设置  选填
     * @param dateFormat  时间轴时间格式  轴类型为时间轴时传入 默认'yyyy-mm-dd' 选填
    */
    cSetyAxis:function(yType,name,dateFormatSrt){
        var me = this,
        allYaxis = me.tplJSON.yAxis;
        if(yType){
            switch(yType){
                case 1:
                    yType = 'linear';
                    break;
                case 2:
                    yType = 'datetime';
                    break;
                case 3:
                    yType = 'category';
                    break;
                case 4:
                    yType = 'logarithmic';
                    break;
        
            }
        }
        if(dateFormatSrt){
            dateFormatSrt = {
                millisecond: date_replace_dateFormat(dateFormatSrt), 
                second:date_replace_dateFormat(dateFormatSrt),
                minute:date_replace_dateFormat(dateFormatSrt),
                hour:date_replace_dateFormat(dateFormatSrt),
                day:date_replace_dateFormat(dateFormatSrt),
                week:date_replace_dateFormat(dateFormatSrt),
                month:date_replace_dateFormat(dateFormatSrt),
                year:date_replace_dateFormat(dateFormatSrt)
            }
        }else{
            dateFormatSrt = {
                day: "%Y-%m-%d",
                hour: "%Y-%m-%d",
                millisecond: "%Y-%m-%d",
                minute: "%Y-%m-%d",
                month: "%Y-%m-%d",
                second: "%Y-%m-%d",
                week: "%Y-%m-%d",
                year: "%Y-%m-%d",
            }
        }
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    allYaxis[i].type = yType ||'linear';
                    allYaxis[i].dateTimeLabelFormats = dateFormatSrt;
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].type = yType ||'linear';
                allYaxis[i].dateTimeLabelFormats = dateFormatSrt;
            }
        }
    },
    /*  y轴是否显示
        * @param bool  布尔值 是否显示 
        * @param name  String  轴名称  传入""或者不传则默认所有Y轴共用此设置  选填
    */
    cSetyAxisEnabled:function(bool,name){
        var me = this,
        allYaxis = me.tplJSON.yAxis;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        bool = !!bool;
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    allYaxis[i].visible = bool;
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].visible = bool;
            }
        }
    },
    /**
     * 设置y轴标题的样式
     * @param option{
            align:align, 对齐方式 low-跟最小值对齐，middle-居中对齐，high-与最大值对齐 选填
            color:color, 标题颜色 选填
            fontFamliy:fontFamliy,字体 选填
            fontSize:fontSize,  标题文字大小  选填
            fontWeight:fontWeight  标题文本样式  选填
          }
    * @param name  String  轴名称  传入""或者不传则默认所有Y轴共用此设置  选填
    */
    cSetyAxisTitleStyle:function(option,name){
        var me = this,
        allYaxis = me.tplJSON.yAxis;
        defOption = option ||{};
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    allYaxis[i].title = allYaxis[i].title || {};
                    allYaxis[i].title.align = defOption.align || "middle";
                    if(!allYaxis[i].title.y){
                        switch(defOption.align){
                            case 'high':
                                allYaxis[i].title.y = 8;
                            break;
                            case 'middle':
                                if(allYaxis[i].title.show == 'vertical'){
                                    if (str.indexOf("(") > -1) {
                                        var l = allYaxis[i].dynamicAxiseName.split('(')[0].length;
                                    } else if (str.indexOf("（") > -1) {
                                        var l = allYaxis[i].dynamicAxiseName.split('（')[0].length;
                                    } else {
                                        var l = allYaxis[i].dynamicAxiseName.length;
                                    }
                                    allYaxis[i].title.y = l*-12/2;
                                }
                            break;
                            case 'low':
                                    if(allYaxis[i].title.show == 'vertical'){
                                        if (str.indexOf("(") > -1) {
                                            var l = allYaxis[i].dynamicAxiseName.split('(')[0].length;
                                        } else if (str.indexOf("（") > -1) {
                                            var l = allYaxis[i].dynamicAxiseName.split('（')[0].length;
                                        } else {
                                            var l = allYaxis[i].dynamicAxiseName.length;
                                        }
                                        allYaxis[i].title.y = l*-12;
                                    }
                            break;
                        }
                    }
                    allYaxis[i].title.style = allYaxis[i].title.style ||{};
                    allYaxis[i].title.style.color = defOption.color ||'#666';
                    allYaxis[i].title.style.fontSize = defOption.fontSize ||'12px';
                    allYaxis[i].title.style.fontWeight = defOption.fontWeight ||'normal';
                    allYaxis[i].title.style.fontStyle = defOption.fontStyle ||'normal';
                    allYaxis[i].title.style.fontFamily = defOption.fontFamily ||'Microsoft YaHei';
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].title = allYaxis[i].title || {};
                allYaxis[i].title.align = defOption.align || "middle";
                if(!allYaxis[i].title.y){
                    switch(defOption.align){
                        case 'high':
                            allYaxis[i].title.y = 8;
                        break;
                        case 'middle':
                            if(allYaxis[i].title.show == 'vertical'){
                                if (str.indexOf("(") > -1) {
                                    var l = allYaxis[i].dynamicAxiseName.split('(')[0].length;
                                } else if (str.indexOf("（") > -1) {
                                    var l = allYaxis[i].dynamicAxiseName.split('（')[0].length;
                                } else {
                                    var l = allYaxis[i].dynamicAxiseName.length;
                                }
                                allYaxis[i].title.y = l*-12/2;
                            }
                        break;
                        case 'low':
                                if(allYaxis[i].title.show == 'vertical'){
                                    if (str.indexOf("(") > -1) {
                                        var l = allYaxis[i].dynamicAxiseName.split('(')[0].length;
                                    } else if (str.indexOf("（") > -1) {
                                        var l = allYaxis[i].dynamicAxiseName.split('（')[0].length;
                                    } else {
                                        var l = allYaxis[i].dynamicAxiseName.length;
                                    }
                                    allYaxis[i].title.y = l*-12;
                                }
                        break;
                    }
                }
                allYaxis[i].title.style = allYaxis[i].title.style ||{};
                allYaxis[i].title.style.color = defOption.color ||'#666';
                allYaxis[i].title.style.fontSize = defOption.fontSize ||'12px';
                allYaxis[i].title.style.fontWeight = defOption.fontWeight ||'normal';
                allYaxis[i].title.style.fontStyle = defOption.fontStyle ||'normal';
                allYaxis[i].title.style.fontFamily = defOption.fontFamily ||'Microsoft YaHei';
            }
        }
    },
    /*  y轴标题是否显示
        * @param bool  布尔值 是否显示 
        * @param name  String  轴名称  传入""或者不传则默认所有Y轴共用此设置  选填
    */
    cSetyAxisTitleEnabled:function(bool,name){
        var me = this,
        allYaxis = me.tplJSON.yAxis;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        bool = !!bool;
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    allYaxis[i].title.enabled = bool
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].title.enabled = bool
            }
        }
    },
    /**
     * y轴标题的位置设置
     * @param option{
        rotation:rotation, number 旋转度 选填
        x:x, number x方向偏移值 选填
        y:y,  number y方向偏移值 选填
        offset:offset 与轴线之间的距离
    * }
    * @param name  String  轴名称  传入""或者不传则默认所有Y轴共用此设置  选填
    */
    cSetyAxisTitlePostion:function(option,name){
        var me = this,
        allYaxis = me.tplJSON.yAxis,
        defOption=option || {}; 
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    allYaxis[i].title.rotation = parseFloat(defOption.rotation) ||0;
                    allYaxis[i].title.x = parseFloat(defOption.x) ||0;
                    allYaxis[i].title.y = parseFloat(defOption.y)||0;
                    allYaxis[i].title.myOffset = parseFloat(defOption.offset)||40
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].title.rotation = parseFloat(defOption.rotation) ||0;
                allYaxis[i].title.x = parseFloat(defOption.x) ||0;
                allYaxis[i].title.y = parseFloat(defOption.y)||0;
                allYaxis[i].title.myOffset = parseFloat(defOption.offset)||40
            }
        }
    },
		cSetyAxisLablesPostion:function(option,name){
		    var me = this,
		    allYaxis = me.tplJSON.yAxis,
		    defOption = option ||{};
		    if(!me.tplJSON){
		        me.cAlert('请先调用chartInit()方法设置基本参数');
		        return;
		    }
		    if(name){
		        for(var i = 0;i<allYaxis.length;i++){
		            if(allYaxis[i].dynamicAxiseName == name){
		                allYaxis[i].labels = allYaxis[i].labels || {};
		                allYaxis[i].labels.align = defOption.align || "center";
		                allYaxis[i].labels.rotation = parseFloat(defOption.rotation) || 0;
										allYaxis[i].labels.x = parseFloat(defOption.x) || -10;
		            }
		        }
		    }else{
		        for(var i = 0;i<allYaxis.length;i++){
		            allYaxis[i].labels = allYaxis[i].labels || {};
		            allYaxis[i].labels.align = defOption.align || "center";
		            allYaxis[i].labels.rotation = parseFloat(defOption.rotation) || 0;
								allYaxis[i].labels.x = parseFloat(defOption.x) || -10;
		        }
		    }
		},
    /**
     * 设置y轴轴标签的样式
     * @param option{
            align:align, left\center\right 选填
            rotation:rotation, number 旋转度 选填
            color:color, 标题颜色 选填
            fontSize:fontSize,  标题文字大小  选填
            fontWeight:fontWeight  标题文本样式  选填
          }
    * @param name  String  轴名称  传入""或者不传则默认所有Y轴共用此设置  选填
    */
    cSetyAxisLablesStyle:function(option,name){
        var me = this,
        allYaxis = me.tplJSON.yAxis,
        defOption = option ||{};
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    allYaxis[i].labels = allYaxis[i].labels || {};
                    allYaxis[i].labels.style = allYaxis[i].labels.style ||{};
                    allYaxis[i].labels.style.color = defOption.color ||'#666';
                    allYaxis[i].labels.style.fontSize = defOption.fontSize ||'12px';
                    allYaxis[i].labels.style.fontWeight = defOption.fontWeight ||'normal';
                    allYaxis[i].labels.style.fontStyle = defOption.fontStyle ||'normal';
                    allYaxis[i].labels.style.fontFamily = defOption.fontFamily ||'Microsoft YaHei';
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].title = allYaxis[i].labels || {};
                allYaxis[i].labels.style = allYaxis[i].labels.style ||{};
                allYaxis[i].labels.style.color = defOption.color ||'#666';
                allYaxis[i].labels.style.fontSize = defOption.fontSize ||'12px';
                allYaxis[i].labels.style.fontWeight = defOption.fontWeight ||'normal';
                allYaxis[i].labels.style.fontStyle = defOption.fontStyle ||'normal';
                allYaxis[i].labels.style.fontFamily = defOption.fontFamily ||'Microsoft YaHei';
            }
        }
    },
		// Y轴标签格式
    cSetyAxisLablesFormatter:function(fn,name){
        var me = this,
        allYaxis = me.tplJSON.yAxis,
        defOption = option ||{};
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    allYaxis[i].labels = allYaxis[i].labels || {};
                    allYaxis[i].labels.formatter = fn;
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].title = allYaxis[i].labels || {};
								allYaxis[i].labels.formatter = fn;
            }
        }
    },
	
		/**
     * y轴轴线设置
     * @param lineWidth number  轴线宽度
     * @param lineColor string 轴线颜色
     * @param name  String  轴名称  传入""或者不传则默认所有Y轴共用此设置  选填
     */
    cSetyAxislineStyle:function(lineWidth,lineColor,name){
        var me = this,
        allYaxis = me.tplJSON.yAxis;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    allYaxis[i].lineWidth = parseFloat(lineWidth) || 1;
                    allYaxis[i].lineColor = lineColor || "#ccd6eb"
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].lineWidth = parseFloat(lineWidth) || 1;
                allYaxis[i].lineColor = lineColor || "#ccd6eb"
            }
        }
    },
    /**
     * y轴轴刻度线设置
     * @param option{
        color:color, 刻度线颜色  选填
        width:width, number 刻度线宽度 选填
        length:length, number  刻度线长度  选填
        Interval:Interval,  number 刻度线之间数值间隔  选填
        PixelInterval:PixelInterval  number 刻度线之间像素间隔  选填
        Pos:Pos  string 刻度线位置  inside、outside   选填
    * }
    * @param name  String  轴名称  传入""或者不传则默认所有Y轴共用此设置  选填
    */
    cSetyAxisTick:function(option,name){
        var me = this,
        allYaxis = me.tplJSON.yAxis,
        defOption = option ||{};
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
       if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    allYaxis[i].tickColor = defOption.color || allYaxis[i].tickColor||'#ccd6eb';
                    allYaxis[i].tickWidth = parseFloat(defOption.width) || allYaxis[i].tickWidth||1;
                    allYaxis[i].tickPosition = defOption.Pos || allYaxis[i].tickPosition||'inside';
                    allYaxis[i].tickLength = parseFloat(defOption.length) || allYaxis[i].tickLength || 3;
                    if(defOption.PixelInterval){
                        allYaxis[i].tickPixelInterval = defOption.PixelInterval;
                    }
                    if(defOption.Interval){
                        allYaxis[i].tickInterval = parseFloat(defOption.Interval);
                    }
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].tickColor = defOption.color || allYaxis[i].tickColor||'#ccd6eb';
                allYaxis[i].tickWidth = parseFloat(defOption.width) || allYaxis[i].tickWidth||1;
                allYaxis[i].tickPosition = defOption.Pos || allYaxis[i].tickPosition||'inside';
                allYaxis[i].tickLength = parseFloat(defOption.length) || allYaxis[i].tickLength || 3;
                if(defOption.PixelInterval){
                    allYaxis[i].tickPixelInterval = defOption.PixelInterval;
                }
                if(defOption.Interval){
                    allYaxis[i].tickInterval = parseFloat(defOption.Interval);
                }
            }
        }
    },
    /**
     * y轴网格线设置
     *@param option{
        color:color, 线条颜色  选填
        width:width, number 线条宽度 选填
        style:style, number  线条样式  选填  线型 0-10 的数值，不填默认 0 Solid 实线  
        ZIndex:ZIndex,  number 网格线层叠  0 在图像下面  越大层级越高  选填
    * }
    * @param name  String  轴名称  传入""或者不传则默认所有Y轴共用此设置  选填
    */
    cSetyAxisgridLine:function(option,name){
        var me = this,
        allYaxis = me.tplJSON.yAxis,
        defOption = option ||{};
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    allYaxis[i].gridLineColor = defOption.color ||allYaxis[i].gridLineColor|| '#ccd6eb';
                    allYaxis[i].gridLineWidth = parseFloat(defOption.width) || allYaxis[i].gridLineWidth||1;
                    allYaxis[i].gridLineDashStyle = me.getLineStyle(defOption.style) || allYaxis[i].gridLineDashStyle||'Solid';
                    allYaxis[i].gridZIndex = parseFloat(defOption.ZIndex) ||allYaxis[i].gridZIndex || 1;
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                allYaxis[i].gridLineColor = defOption.color ||allYaxis[i].gridLineColor|| '#ccd6eb';
                allYaxis[i].gridLineWidth = parseFloat(defOption.width) || allYaxis[i].gridLineWidth||1;
                allYaxis[i].gridLineDashStyle = me.getLineStyle(defOption.style) || allYaxis[i].gridLineDashStyle||'Solid';
                allYaxis[i].gridZIndex = parseFloat(defOption.ZIndex) ||allYaxis[i].gridZIndex || 1;
            }
        }
    },
    /**
     * y轴标题横排、竖排显示
     *@param  type String  显示方式 1 横排显示  2竖排显示 
    * @param name  String  轴名称  传入""或者不传则默认所有Y轴共用此设置  选填
    */
    cSetyAxisShowType:function(type,name){
        var me = this,
        allYaxis = me.tplJSON.yAxis;
        if(name){
            for(var i = 0;i<allYaxis.length;i++){
                if(allYaxis[i].dynamicAxiseName == name){
                    if(type == 1){
                        allYaxis[i].title.text = allYaxis[i].title.text;
                        allYaxis[i].title.show = 'horizontal';
                    }else if(type == 2){
                        allYaxis[i].title.text = me.addBr(allYaxis[i].title.text);
                        allYaxis[i].title.show = 'vertical';
                    }
                }
            }
        }else{
            for(var i = 0;i<allYaxis.length;i++){
                if(type == 1){
                    allYaxis[i].title.text = allYaxis[i].title.text;
                    allYaxis[i].title.show = 'horizontal';
                }else if(type == 2){
                    allYaxis[i].title.text = me.addBr(allYaxis[i].title.text);
                    allYaxis[i].title.show = 'vertical';
                }
            }
        }
    },
		 /**
		* Y轴标示线
		* AxiseIndex  第几跟轴（用于多Y轴情况）
		* width 标示线宽度
		* color 标示线颜色
		* value 标示线所在位置
		* textOption{
		     text:text, 标示线注释文本
		     style: {   文本样式
		     	color: '#333',  文本颜色
		     	verticalAlign: 'top', 文本对齐方式 "left"、"center" 和 "right"
		     	y: 10
		     },
		     rotation: r, // 旋转度
		     x: 0, // 偏移值
		  * }
		*/
		cSetyAxisePlotLines: function(AxiseIndex, width, color, value, textOption) {
			var that = this,
				textOption = textOption || {},
				num = AxiseIndex || 0;
			var type = that.tplJSON.yAxis[num].type;
			var plotLine = {
				width: parseFloat(width),
				color: color,
				value: type == "datetime" ? date_getMillisecond(value) : parseFloat(value),
				label: {
					text: textOption.text || '',
					style: {
						color: textOption.color || '#333',
						align: textOption.align || 'left',
						y: 10
					},
					rotation: textOption.rotation || 0,
					useHTML: true,
					x: textOption.x || 0,
				}
			}
			that.tplJSON.yAxis[num].plotLines = that.tplJSON.yAxis[num].plotLines || [];
			that.tplJSON.yAxis[num].plotLines.push(plotLine)
		},
		// 设置Y轴标题名称
/******************************************************序列相关设置**************************************************************/
   /**
	 * 设置折线的属性
     * @param sName  所属序列名称，不传默认是曲线所有序列
     * option{
        * @param color 折线图中指线的颜色，柱状图中柱子的颜色
        * @param width 线宽
        * @param style 线型 0-10 的数值，不填默认 0 Solid 实线    
     * }
     * 1 ShortDash 
       2 ShortDot
       3 ShortDashDot
       4 ShortDashDotDot
       5 Dot
       6 Dash
       7 LongDash
       8 DashDot
       9 LongDashDot
       10 LongDashDotDot
	 */
	cSetLinesStyle: function(option,sName) {
        var me = this;
		var allSeries = me.tplJSON.series;
		var defOption = option ||{};
		if (sName) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == sName) {
					allSeries[i].lineWidth = parseFloat(defOption.width) || 2;
                    allSeries[i].color = defOption.color || allSeries[i].color;
                    allSeries[i].dashStyle = me.getLineStyle(defOption.style) || allSeries[i].dashStyle;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
				allSeries[i].lineWidth = parseFloat(defOption.width) || allSeries[i].lineWidth;
                allSeries[i].color = defOption.color || allSeries[i].color;
                allSeries[i].dashStyle = me.getLineStyle(defOption.style) || allSeries[i].dashStyle;
			}
		}
    },
     /**
        * 序列是否连接空值
        * @param bool  Boolen 是否连接空值
        * @param name  所属序列名称，不传默认是所有序列
    */
    cSetSeriesConnectNulls:function(bool,name){
        var me = this,
        allSeries = me.tplJSON.series;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        bool = !!bool;
        if (name) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == name) {
					allSeries[i].connectNulls = bool;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
				allSeries[i].connectNulls = bool;
			}
		}
    },
    // 设置阶梯图 type 可用left、center 和right false、true（true默认阶梯类形为left），false为不启用
    // seriesName  被设置的序列名称，不填默认所有线性序列
    cSetStep:function(type,seriesName){
        var me = this;
		var allSeries = me.tplJSON.series;
		if (seriesName) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == seriesName &&(allSeries[i].type == 'line' ||allSeries[i].type == 'area' ) ) {
                    allSeries[i].step = type;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
                if(allSeries[i].type == 'line' ||allSeries[i].type == 'area'){
                    allSeries[i].step = type;
                }
			}
		}
    },
    /**
	 * 设置点的属性
      * option{
        * @param radius 点半径
        * @param fillColor 点的颜色
        * @param symbol 点的形状 不传默认"0"（圆形）、"1"（正方形）、"2"（菱形）、 "3"（三角形）及 "4"（倒三角形）
        * @param lineWidth 点的线条颜色
        * @param lineColor 点的线条颜色  
     * }
     * @param sName  所属序列名称，不传默认是曲线所有点
	 */
	cSetPointStyle: function(option,sName) {
        var me = this;
        var defOption = option ||{};
		var allSeries = this.tplJSON.series;
		if (sName) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == sName) {
                    if(isNaN(parseFloat(defOption.radius))){
                        allSeries[i].marker.radius = allSeries[i].marker.radius;
                    }else{
                        allSeries[i].marker.radius = parseFloat(defOption.radius) ;
                    }
					allSeries[i].marker.fillColor = defOption.fillColor || allSeries[i].marker.fillColor ;
                    allSeries[i].marker.lineColor = defOption.lineColor || allSeries[i].marker.lineColor;
                    allSeries[i].marker.symbol = me.getMarkerStyle(defOption.symbol) || allSeries[i].marker.symbol;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
				allSeries[i].marker.radius = parseFloat(defOption.radius) || allSeries[i].marker.radius || 0;
				allSeries[i].marker.fillColor = defOption.fillColor || allSeries[i].marker.fillColor;
                allSeries[i].marker.lineColor = defOption.lineColor || allSeries[i].marker.lineColor;
                allSeries[i].marker.symbol = me.getMarkerStyle(defOption.symbol) || allSeries[i].marker.symbol;
			}
		}
    },
    /*
    * 序列的类型设置
    * @param type  String 曲线类型 line/pie/column/spline/area/annular 
    * @param seriesName  设置类型的序列名称  选填 不填默认所有序列
*/
    cSetSeriesType:function(type,seriesName){
        var me = this,
        allSeries = me.tplJSON.series;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if (seriesName) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == name) {
                    if(type == "scatter"){
                        allSeries[i].type = 'line';
                        allSeries[i].lineWidth = 0;
                    }else{
                        allSeries[i].lineWidth = allSeries[i].lineWidth || 2;
                        allSeries[i].type = type;
                    }
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
                if(type == "scatter"){
                    allSeries[i].type = 'line';
                    allSeries[i].lineWidth = 0;
                }else{
                    allSeries[i].lineWidth = allSeries[i].lineWidth || 2;
                    allSeries[i].type = type;
                }
			}
		}
    },
    /**
        * 序列是否显示
        * @param bool  Boolen 是否显示
        * @param name  所属序列名称，不传默认是所有序列
    */
    cSetSeriesEnabled:function(bool,name){
        var me = this,
        allSeries = me.tplJSON.series;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        bool = !!bool;
        if (name) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == name) {
					allSeries[i].visible = bool;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
				allSeries[i].visible = bool;
			}
		}
    },
    /**
        * 序列数据标签是否显示
        * @param bool  Boolen 是否显示
        * @param name  所属序列名称，不传默认是所有序列
	*/
    cSetSeriesDataLabelsEnabled:function(bool,name){
        var me = this,
        allSeries = me.tplJSON.series;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        bool = !!bool;
        if (name) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == name) {
                    allSeries[i].dataLabels = allSeries[i].dataLabels ||{};
					allSeries[i].dataLabels.enabled = bool;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
                allSeries[i].dataLabels = allSeries[i].dataLabels ||{};
				allSeries[i].dataLabels.enabled = bool;
			}
		}
    },
     /**
        * 序列数据标签格式化字符串
        * @param format  String  格式化字符串 默认'{y}' 参数例如 '{y}km' 必选
        * @param name  所属序列名称，不传默认是所有序列
	*/
    cSetSeriesDataLabelsFormat:function(format,name){
        var me = this,
        allSeries = me.tplJSON.series;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if (name) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == name) {
                    allSeries[i].dataLabels = allSeries[i].dataLabels ||{};
					allSeries[i].dataLabels.format = format;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
                allSeries[i].dataLabels = allSeries[i].dataLabels ||{};
				allSeries[i].dataLabels.format = format;
			}
		}
    },
    /**
        * 序列数据标签格式化字函数
        * @param fun  function  格式化函数 必选
        * @param name  所属序列名称，不传默认是所有序列
	*/
    cSetSeriesDataLabelsFormatter:function(fun,name){
        var me = this,
        allSeries = me.tplJSON.series;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if (name) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == name) {
                    allSeries[i].dataLabels = allSeries[i].dataLabels ||{};
					allSeries[i].dataLabels.formatter = fun;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
                allSeries[i].dataLabels = allSeries[i].dataLabels ||{};
				allSeries[i].dataLabels.formatter = fun;
			}
		}
    },
    /**
        * 序列数据标签位置设置
        * @param option {
        *   align:'center', string 水平对齐方式  left、center、right 
        *   vAlign:'bottom', string 垂直对齐 top、middle、bottom
        *   x:x, 0 水平方向偏移量
        *   y:y  0 垂直方向偏移量
        * }
        * @param name  所属序列名称，不传默认是所有序列
	*/
    cSetSeriesDataLabelsPostion:function(option,name){
        var me = this,
        defOption = option || {};
        allSeries = me.tplJSON.series;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if (name) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == name) {
                    allSeries[i].dataLabels = allSeries[i].dataLabels ||{};
                    allSeries[i].dataLabels.align = defOption.align || allSeries[i].dataLabels.align|| 'center';
                    allSeries[i].dataLabels.verticalAlign = defOption.vAlign||allSeries[i].dataLabels.verticalAlign|| 'bottom';
                    allSeries[i].dataLabels.x = parseFloat( defOption.x) ||allSeries[i].dataLabels.x||0;
                    allSeries[i].dataLabels.y = parseFloat( defOption.y) || allSeries[i].dataLabels.y||-6;
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
                allSeries[i].dataLabels = allSeries[i].dataLabels ||{};
                allSeries[i].dataLabels.align = defOption.align || allSeries[i].dataLabels.align|| 'center';
                allSeries[i].dataLabels.verticalAlign = defOption.vAlign||allSeries[i].dataLabels.verticalAlign|| 'bottom';
                allSeries[i].dataLabels.x = parseFloat( defOption.x) ||allSeries[i].dataLabels.x||0;
                allSeries[i].dataLabels.y = parseFloat( defOption.y) || allSeries[i].dataLabels.y||-6;
			}
		}
    },
    /**
        * 序列数据标签样式设置
        * @param option {
        *   fontSize:'12px', string 文本字号
        *   fontFamily:'SimSun', string 文本字形
        *   color:'#333', string 文本颜色
        *   fontWeight:'nomal'  string/ number  字体加粗
        * }
        * @param name  所属序列名称，不传默认是所有序列
	*/
    cSetSeriesDataLabelsStyle:function(option,name){
        var me = this,
        defOption = option || {};
        allSeries = me.tplJSON.series;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        if (name) {
			for (var i = 0; i < allSeries.length; i++) {
				if (allSeries[i].name == name) {
                    allSeries[i].dataLabels = allSeries[i].dataLabels ||{};
                    allSeries[i].dataLabels.style = allSeries[i].dataLabels.style ||{};
                    allSeries[i].dataLabels.style.fontSize = defOption.fontSize || allSeries[i].dataLabels.style.fontSize||'12px';
                    allSeries[i].dataLabels.style.fontFamily = defOption.fontFamily || allSeries[i].dataLabels.style.fontFamily||'SimSun';
                    allSeries[i].dataLabels.style.color = defOption.color||allSeries[i].dataLabels.style.color||'#333';
                    allSeries[i].dataLabels.style.fontWeight = defOption.fontWeight||allSeries[i].dataLabels.style.fontWeight||'nomal';
				}
			}
		} else {
			for (var i = 0; i < allSeries.length; i++) {
                allSeries[i].dataLabels = allSeries[i].dataLabels ||{};
                allSeries[i].dataLabels.style = allSeries[i].dataLabels.style ||{};
                allSeries[i].dataLabels.style.fontSize = defOption.fontSize || allSeries[i].dataLabels.style.fontSize||'12px';
                allSeries[i].dataLabels.style.fontFamily = defOption.fontFamily || allSeries[i].dataLabels.style.fontFamily||'SimSun';
                allSeries[i].dataLabels.style.color = defOption.color||allSeries[i].dataLabels.style.color||'#333';
                allSeries[i].dataLabels.style.fontWeight = defOption.fontWeight||allSeries[i].dataLabels.style.fontWeight||'nomal';
			}
		}
    },
    // 设置数据提示框格式函数
    cSetTooltipFormatter: function(fun) {
		var tp = this.tplJSON.tooltip || {};
		tp.formatter = fun;
    },
    // 设置各序列是否公用数据提示框
    cSetTooltipShared: function(bool) {
		var tp = this.tplJSON.tooltip || {};
		tp.shared = true;
		this.tplJSON.tooltip = tp;
    },
/******************************************************图例相关设置*********************************************************/    
    // 图例是否显示
    cSetlegendEnabled:function(bool){
        var me = this;
        me.tplJSON.legend.enabled = !!bool;
    },
    // 图例浮动设置
    cSetlegendFloat:function(bool){
        var me = this;
        me.tplJSON.legend.floating = !!bool;
    },
     /**
        * 图例布局方式
        * @param layout  String  "h" 或 "v" 即水平布局和垂直布局 默认是：h
	*/
     cSetlegendlayout:function(layout){
        var me = this;
        if(layout == 'v'){
            layout = 'vertical'
        }else{
            layout = 'horizontal'
        }
        me.tplJSON.legend.layout = layout;
    },
    /*图例位置设置
     * @param option{
         align:'center', String 水平对齐方式  left，center 和 right
         vAlign:'bottom', String 垂直对齐方式  top，middle 和 bottom
         x:x， 0  水平方向偏移量
         y:y,   0  垂直方向偏移量
         reversed: false  Boolen 是否反序排了
     }
    */
    cSetLegendPos:function(option){
        var me  = this,
        defOption = option || {};
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        me.tplJSON.legend.align = defOption.align || me.tplJSON.legend.align||'center';
        me.tplJSON.legend.verticalAlign = defOption.vAlign || me.tplJSON.legend.verticalAlign||'bottom';
        me.tplJSON.legend.x = parseFloat(defOption.x) || me.tplJSON.legend.x||0 ;
        me.tplJSON.legend.y = parseFloat(defOption.y) || me.tplJSON.legend.y ||0;
        me.tplJSON.legend.reversed = !!defOption.reversed || me.tplJSON.legend.reversed || false;
    },
    /*图例大小设置
    * @param width:  number 图例宽度  不填自动计算
    * @param itemWidth, number  图例每一项的宽度  不填自动计算
    */
   cSetLegendSzie:function(width,itemWidth){
    var me  = this;
    if(!me.tplJSON){
        me.cAlert('请先调用chartInit()方法设置基本参数');
        return;
    }
    if(width){
        me.tplJSON.legend.width =parseFloat(width);
    }
    if(itemWidth){
        me.tplJSON.legend.itemWidth =parseFloat(itemWidth);
    }
    },
/******************************************************图表设置*********************************************************/ 
    // 设置图表背景颜色
    setChartBackgroundColor:function(color){
        var me  = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        me.tplJSON.chart.plotBackgroundColor = value; 
        me.tplJSON.chart.backgroundColor = value;   
    },
    // 设置图表边距
    // @param type  边距类型  top  bottom  left  right 
    // @param value 设置的值  number 
    setChartMagin:function(type,value){
        var me  = this;
        if(!me.tplJSON){
            me.cAlert('请先调用chartInit()方法设置基本参数');
            return;
        }
        switch(type){
            case 'left':
                me.tplJSON.chart.marginLeft= parseFloat(value); 
            break;
            case 'right':
                me.tplJSON.chart.marginRight= parseFloat(value); 
            break;
            case 'top':
                me.tplJSON.chart.marginTop= parseFloat(value);  
            break;
            case 'bottom':
                me.tplJSON.chart.marginBottom= parseFloat(value);  
            break;
            default:
            break;
        }
    },
/******************************************************功能模块引入相关设置*********************************************************/    
    //图例拖动
    IAddLegendDargModule:function(bool){
        var me  = this;
        me.tplJSON.modules = me.tplJSON.modules || [];
        me.tplJSON.modules.push('legendDraging')
    },
    // 添加顶部工具条功能模块
    IAddToolBarModule:function(bool){
        var me  = this;
        me.tplJSON.modules = me.tplJSON.modules || [];
        me.tplJSON.modules.push('toolBar')
    },
    // 添加曲线属性设置功能模块
    IAddPropertySetModule:function(bool){
        var me  = this;
        me.tplJSON.modules = me.tplJSON.modules || [];
        me.tplJSON.modules.push('setProperty')
    },
     // 添加导出图片功能模块
     IAddImageExportModule:function(bool){
        var me  = this;
        me.tplJSON.modules = me.tplJSON.modules || [];
        me.tplJSON.modules.push('imgexport')
    },
    // 添加数据查看及数据下载功能模块
    IAddDataViewModule:function(bool){
        var me  = this;
        me.tplJSON.modules = me.tplJSON.modules || [];
        me.tplJSON.modules.push('dataviews')
    },
    // 导出图片
	exportChartImage:function(){
		var me = this,
			chart = this.chart;
		if (!ContainsJS("html2canvas.js")) {
			$LAB.script(vmd.virtualPath + "/chart/js/load/bluebird.js").wait();
			$LAB.script(vmd.virtualPath + "/chart/js/load/html2canvas.js").wait();
			$LAB.script(vmd.virtualPath + "/chart/js/load/downloadify.js").wait();
			$LAB.script(vmd.virtualPath + "/chart/js/load/canvg.js").wait(function() {
				if (!me.dhxSaveImageSetWindow) {
					me.initSaveImageSetWindow();
				} else {
					chart.dhxSaveImageSetWindow.bringToTop();
					if (chart.dhxSaveImageSetWindow.isHidden()) {
						//chart.dhxSaveImageSetWindow.setPosition(e.clientX, e.clientY);
						chart.dhxSaveImageSetWindow.show();
					}
				}
			});
		} else {
			if (!chart.dhxSaveImageSetWindow) {
				me.initSaveImageSetWindow();
			} else {
				chart.dhxSaveImageSetWindow.bringToTop();
				if (chart.dhxSaveImageSetWindow.isHidden()) {
					//chart.dhxSaveImageSetWindow.setPosition(e.clientX, e.clientY);
					chart.dhxSaveImageSetWindow.show();
				}
			}
		}
	},
	initSaveImageSetWindow:function(){
		var me = this,
			chart = this.chart,
			parentChart = chart.options.chart.parentChart,
			dhxWindow = chart.dhxWindow,
			dhxSaveImageSetWindow = chart.dhxSaveImageSetWindow,
			dhxSaveImageForm = chart.dhxSaveImageForm;
		// 生成导出图片对话框
		if (!dhxWindow) {
			chart.dhxWindow = dhxWindow = new dhtmlXWindows();
			dhxWindow.vp.style.overflow = "auto";
		}
		if (!dhxSaveImageSetWindow) {
			var windowWidth = 350,
				windowHeight = 280,
				buttonOffsetLeft = 132;
			if (dhx.version == "5.0.8") {
				windowWidth = 350;
				windowHeight = 280;
				buttonOffsetLeft = 132;
			} else {
				windowWidth = 360;
				windowHeight = 280;
				buttonOffsetLeft = 132;
			}
			chart.dhxSaveImageSetWindow = dhxSaveImageSetWindow = dhxWindow.createWindow({
				id:"saveImageSetWindow",
				width:windowWidth,
				height:windowHeight,
				center:true
			});
			dhxSaveImageSetWindow.centerOnScreen();
			dhxSaveImageSetWindow.setText(unescape("%u4FDD%u5B58%u56FE%u7247"));
			dhxSaveImageSetWindow.denyResize();
			dhxSaveImageSetWindow.attachEvent("onClose", function(win) {
				win.hide();
			});
			dhxSaveImageSetWindow.attachEvent("onShow", function(win) {
				me.initFormComponent(chart, dhxSaveImageForm);
			});

			dhxSaveImageForm = chart.dhxSaveImageForm = dhxSaveImageSetWindow.attachForm([

				{
					type: "block",
					width: 330,
					blockOffset: 5,
					offsetTop: 10,
					list: [

						{
							type: "fieldset",
							label: unescape("%u5927%u5C0F"),
							width: 288,
							offsetLeft: 10,
							offsetTop: 2,
							list: [{
									type: "block",
									width: 260,
									blockOffset: 0,
									list: [{
											type: "input",
											name: "width",
											labelWidth: 36,
											labelHeight: 18,
											width: 80,
											offsetLeft: 0,
											offsetTop: 5,
											position: "label-left",
											label: unescape("%u5BBD%u5EA6%3A"),
											value: "1"
										},
										{
											type: "newcolumn"
										},
										{
											type: "label",
											label: unescape("%u50CF%u7D20")
										}
									]
								},
								{
									type: "block",
									width: 260,
									blockOffset: 0,
									list: [{
											type: "input",
											name: "height",
											labelWidth: 36,
											labelHeight: 18,
											width: 80,
											offsetLeft: 0,
											offsetTop: 5,
											position: "label-left",
											label: unescape("%u9AD8%u5EA6%3A"),
											value: "1"
										},
										{
											type: "newcolumn"
										},
										{
											type: "label",
											label: unescape("%u50CF%u7D20")
										},
										{
											type: "newcolumn"
										},
										{
											type: "checkbox",
											position: "label-right",
											name: "keep_ratio",
											width: 50,
											offsetLeft: 5,
											offsetTop: 5,
											labelHeight: 20,
											labelWidth: 60,
											label: unescape("%u4FDD%u6301%u539F%u6BD4%u4F8B")
										}
									]
								}
							]
						}
					]
				},
				{
					type: "block",
					width: 345,
					blockOffset: 20,
					offsetTop: 10,
					list: [{
							type: "input",
							name: "name",
							labelWidth: 60,
							labelHeight: 18,
							width: 80,
							offsetLeft: 0,
							position: "label-left",
							label: unescape("%u56FE%u7247%u540D%u79F0%3A"),
							value: "chart"
						},
						{
							type: "newcolumn"
						},
						{
							type: "combo",
							position: "label-left",
							name: "format",
							offsetLeft: 5,
							label: unescape("%u5BFC%u51FA%u683C%u5F0F%3A"),
							inputHeight: 50,
							inputWidth: 80,
							options: [{
									value: "png",
									text: "PNG",
									selected: true
								},
								{
									value: "jpeg",
									text: "JPG"
								},
								{
									value: "pdf",
									text: "PDF"
								}
							]
						}
					]
				},
				{
					type: "block",
					offsetLeft: buttonOffsetLeft,
					list: [{
							type: "button",
							width: 60,
							name: "confirm",
							value: unescape("%u786E%u5B9A"),
							offsetTop: 10,
							offsetLeft: 10
						},
						{
							type: "newcolumn"
						},
						{
							type: "button",
							width: 60,
							name: "cancel",
							value: unescape("%u53D6%u6D88"),
							offsetTop: 10,
							offsetLeft: 10
						}
					]
				}
			]);

			me.initFormComponent(chart, dhxSaveImageForm);

			dhxSaveImageForm.attachEvent("onChange", function(name, value) {
				var exportOptions = chart.options.exporting || {},
					widthInput = dhxSaveImageForm.getInput("width"),
					heightInput = dhxSaveImageForm.getInput("height");
				switch (name) {
					case "keep_ratio":
						exportOptions.keepRatio = dhxSaveImageForm.isItemChecked("keep_ratio");
						var oldHeightValue = heightInput.value;
						if (exportOptions.keepRatio) {
							heightInput.value = parseInt(widthInput.value / exportOptions.ratio);
						} else {
							heightInput.value = exportOptions.histotyExportHeight;
						}
						break;
					case "width":
						if (dhxSaveImageForm.isItemChecked("keep_ratio")) {
							heightInput.value = parseInt(widthInput.value / exportOptions.ratio);
						}
						break;
					case "height":
						if (dhxSaveImageForm.isItemChecked("keep_ratio")) {
							widthInput.value = parseInt(heightInput.value * exportOptions.ratio);
						}
						break;
				}
			});

			dhxSaveImageForm.attachEvent("onInputChange", function(name, value) {
				var exportOptions = chart.options.exporting || {},
					widthInput = dhxSaveImageForm.getInput("width"),
					heightInput = dhxSaveImageForm.getInput("height");
				switch (name) {
					case "width":
						if (dhxSaveImageForm.isItemChecked("keep_ratio")) {
							heightInput.value = parseInt(value / exportOptions.ratio);
						}
						break;
					case "height":
						if (dhxSaveImageForm.isItemChecked("keep_ratio")) {
							widthInput.value = parseInt(value * exportOptions.ratio);
						}
						break;
				}
			});

			dhxSaveImageForm.attachEvent("onButtonClick", function(name) {
				if (name == "cancel") {
					dhxSaveImageSetWindow.hide();
				}
			});
			// ie浏览器下处理 
			if (isIE()) {
				var widthInputValue = dhxSaveImageForm.getInput("width").value,
					heightInputValue = dhxSaveImageForm.getInput("height").value,
					isKeepRatio = dhxSaveImageForm.isItemChecked("keep_ratio"),
					nameInputValue = dhxSaveImageForm.getInput("name").value,
					formatCombo = dhxSaveImageForm.getCombo("format"),
					formatValue = formatCombo.getSelectedValue();

				var options = {
					width: widthInputValue,
					height: heightInputValue,
					type: formatValue,
					filename: nameInputValue
				};

				var chartOptions = merge(chart.options, chart.options.userExportOptions)

				var parentChart = chartOptions.chart.parentChart,
					canvas = document.createElement("canvas"),
					scale = 2;
				// 创建cavans对象
				canvas.width = options.width * scale;
				canvas.height = options.height * scale;
				canvas.getContext("2d").scale(scale, scale);

				var opts = {
					scale: scale,
					canvas: canvas,
					logging: false,
					width: parseInt(options.width),
					height: parseInt(options.height)
				};

				var fillContent = document.createElement('div');
				fillContent.style.position = 'absolute';
				fillContent.style.top = "-99999px";

				if (parentChart) {
					for (var i = 0; i < parentChart.charts.length; i++) {
						fillContent.innerHTML += "<div class='export-svg-html' style='position: relative;'>" + parentChart.charts[i].container
							.innerHTML + "</div>";
					}
				} else {
					fillContent.innerHTML = "<div class='export-svg-html' style='position: relative;'>" + chart.container.innerHTML +
						"</div>";
				}


				var nodesToRecover = [];
				var nodesToRemove = [];

				var svgElem = $(fillContent).find('svg'); //divReport为需要截取成图片的dom的id

				svgElem.each(function(index, node) {
					var parentNode = node.parentNode;
					var svg = node.outerHTML.trim();

					var canvas = document.createElement('canvas');
					canvg(canvas, svg); // svg转canvas
					if (node.style.position) {
						canvas.style.position += node.style.position;
						canvas.style.left += node.style.left;
						canvas.style.top += node.style.top;
					}

					nodesToRecover.push({
						parent: parentNode,
						child: node
					});
					parentNode.removeChild(node);

					nodesToRemove.push({
						parent: parentNode,
						child: canvas
					});
					parentNode.appendChild(canvas);
				});

				console.log(fillContent)
				document.body.appendChild(fillContent);

				html2canvas(fillContent, opts).then(function(canvas) {
					var imgUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
					var item = $(".dhxform_btn")[$(".dhxform_btn").length - 2];
					item.style.height = '30px'
					Downloadify.create(item, {
						filename: function() {
							return dhxSaveImageForm.getInput("name").value + '.' + formatCombo.getSelectedValue();
						},
						data: function() {
							return imgUrl.split('base64,')[1]
						},
						onComplete: function() {
							dhxSaveImageSetWindow.hide();
						},
						onCancel: function() {
							dhxSaveImageSetWindow.hide();
						},
						onError: function() {
							alert('图片下载失败，请刷新后重试')
							dhxSaveImageSetWindow.hide();
						},
						swf: vmd.virtualPath + '/chart/js/load/media/downloadify.swf',
						downloadImage: vmd.virtualPath + '/chart/js/load/images/dload.png',
						width: 70,
						height: 30,
						dataType: "base64",
						transparent: true,
						append: false
					});
				})
			} else {
				dhxSaveImageForm.attachEvent("onButtonClick", function(name) {
					if (name == "confirm") {
						var widthInputValue = dhxSaveImageForm.getInput("width").value,
							heightInputValue = dhxSaveImageForm.getInput("height").value,
							isKeepRatio = dhxSaveImageForm.isItemChecked("keep_ratio"),
							nameInputValue = dhxSaveImageForm.getInput("name").value,
							formatCombo = dhxSaveImageForm.getCombo("format"),
							formatValue = formatCombo.getSelectedValue();

						var exportOptions = {
							width: widthInputValue,
							height: heightInputValue,
							type: formatValue,
							filename: nameInputValue
						};
						me._exportChart(exportOptions,chart.options);
						exportOptions.histotyExportHeight = parseInt(heightInputValue);
						dhxSaveImageSetWindow.hide();
					}
				});
			}
		}
	},
	// 初始化图片导出窗口
	initFormComponent:function(chart, dhxSaveImageForm) {
		var exportOptions = chart.options.exporting || {},
			isKeepRatio,
			parentChart = chart.options.chart.parentChart,
			widthInput = dhxSaveImageForm.getInput("width"),
			heightInput = dhxSaveImageForm.getInput("height"),
			nameInput = dhxSaveImageForm.getInput("name"),
			formatCombo = dhxSaveImageForm.getCombo("format");

		var cssWidth = chart.chartWidth || chart.renderTo.style.width,
			cssHeight =chart.chartHeight || chart.renderTo.style.height,
			sourceWidth = exportOptions.sourceWidth || chart.options.chart.width ||
			(parseFloat(cssWidth)) || chart.renderTo.clientWidth || 600, //没有显式设置div的width时(设置了min-width)获取clientWidth的值

			sourceHeight = exportOptions.sourceHeight || chart.options.chart.height ||
			(parseFloat(cssHeight)) || chart.renderTo.clientHeight || 400; //没有显式设置div的height时(设置了min-width)获取clientHeight的值

		if (exportOptions.height) {
			isKeepRatio = false;
		} else {
			isKeepRatio = exportOptions.keepRatio === false ? false : true
		}
		if (parentChart) {
			widthInput.value = parentChart.chartWidth;
			heightInput.value = parentChart.chartHeight;
			exportOptions.ratio = parentChart.chartWidth / parentChart.chartHeight;
			dhxSaveImageForm.disableItem("keep_ratio");
		} else {
			exportOptions.ratio = sourceWidth / sourceHeight;
			widthInput.value = exportOptions.width || sourceWidth;
			heightInput.value = exportOptions.height || sourceHeight;
		}

		dhxSaveImageForm.setItemValue("keep_ratio", isKeepRatio);
		if (!isIE()) {
			nameInput.value = exportOptions.filename || (chart.options.title && chart.options.title.text) || 'chart';
		}
		exportOptions.histotyExportHeight = heightInput.value;
	},
	_exportChart:function(options, chartOptions) {

		options = options || {};
		chartOptions = chartOptions || this.options;

		var chart = this.chart,
			parentChart = chartOptions.chart.parentChart,
			canvas = document.createElement("canvas"),
			scale = 2;

		canvas.width = options.width * scale;
		canvas.height = options.height * scale;
		canvas.getContext("2d").scale(scale, scale);

		var opts = {
			scale: scale,
			canvas: canvas,
			logging: false,
			width: parseInt(options.width),
			height: parseInt(options.height)
		};

		var fillContent = document.createElement('div');
		fillContent.style.position = 'absolute';
		fillContent.style.top = "-99999px";

		if (parentChart) {
			for (var i = 0; i < parentChart.charts.length; i++) {
				fillContent.innerHTML += "<div class='export-svg-html' style='position: relative;'>" + parentChart.charts[i].container
					.innerHTML + "</div>";
			}
		} else {
			fillContent.innerHTML = "<div class='export-svg-html' style='position: relative;'>" + chart.container.innerHTML +
				"</div>";
		}
		var spans = $(fillContent).find('span');

		spans.css({
			"transform": "rotate(0)",
		})

		var nodesToRecover = [];
		var nodesToRemove = [];

		var svgElem = $(fillContent).find('svg'); //divReport为需要截取成图片的dom的id

		svgElem.each(function(index, node) {
			var parentNode = node.parentNode;
			var svg = node.outerHTML.trim();

			var canvas = document.createElement('canvas');
			canvg(canvas, svg);
			if (node.style.position) {
				canvas.style.position += node.style.position;
				canvas.style.left += node.style.left;
				canvas.style.top += node.style.top;
			}

			nodesToRecover.push({
				parent: parentNode,
				child: node
			});
			parentNode.removeChild(node);

			nodesToRemove.push({
				parent: parentNode,
				child: canvas
			});

			parentNode.appendChild(canvas);
		});

		document.body.appendChild(fillContent);

		html2canvas(fillContent, opts).then(function(canvas) {
			var imgUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
			var save_link = document.createElement('a')
			save_link.setAttribute("id", "downloadify");
			save_link.href = imgUrl;
			save_link.download = options.filename + '.' + options.type;
			var event = document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			save_link.dispatchEvent(event);
			//document.body.removeChild(save_link);
			document.body.removeChild(fillContent);
		})
	},
/******************************************************其他通用方法*********************************************************/    
    // 处理线条样式类型参数
    getLineStyle: function (style) {
        if(style === undefined){
            return undefined;
        }
        style += "";
        switch (style) {
            case '1':
                return 'ShortDash';
            case '2':
                return 'ShortDot';
            case '3':
                return 'ShortDashDot';
            case '4':
                return 'ShortDashDotDot';
            case '5':
                return 'Dot';
            case '6':
                return 'Dash';
            case '7':
                return 'LongDash';
            case '8':
                return 'DashDot';
            case '9':
                return 'LongDashDot';
            case '10':
                return 'LongDashDotDot';
            default:
                return 'Solid';
        }
    },
    // 处理标注点形状参数
    getMarkerStyle: function (style) {
        if(style === undefined){
            return undefined;
        }
        style = style.toString();
        switch (style) {
            case '1':
                return 'square';
            case '2':
                return 'diamond';
            case '3':
                return 'triangle';
            case '4':
                return 'triangle-down';
            default:
                return 'circle';
        }
    },
       // 横竖轴转换添加<br>
    addBr: function (text) {
        if(!text){
			return
		}
        var me  = this;
        var str = me.removeBr(text);
        var strArr1 = [],strArr2 = [],
            slicer1, endStr,slicer2,slicer3;
        if (str.indexOf("(") > -1) {
            slicer1 = "(";
            slicer2 = ")";
            
        } else if (str.indexOf("（") > -1) {
            slicer1 = "（";
            slicer2 = "）";
        } else {
            slicer1 = "";
            slicer2 = "";
        }
        if(slicer1){
           strArr1 = str.split(slicer1)[0].split("");// 括号前面的部分 
        }else{
           strArr1 = str.split(slicer1);
        }
        var other = str.split(slicer1)[1];
        if(other.split(slicer2)[1]){
             strArr2 = other.split(slicer2)[1].split(""); // 括号后面的部分
        }
        // 括号中的部分的处理
        // if(other.split(slicer2)[0].indexOf("/") > -1){
        //    endStr = other.split(slicer2)[0].split("/");
        //    slicer3 = '/';
        // }else{
           endStr = other.split(slicer2)[0].split(" ") ;
           slicer3 = '';
        // }
        var reg = /^[\u4e00-\u9fa5]+$/;
        var reg1 = /^[a-zA-Z0-9]/;
        strArr1.forEach(function(item, index) {
            strArr1[index] = '<div style="text-align: center;min-width:60px">' + item + '</div>';
        })
        strArr2.forEach(function(item, index) {
            strArr2[index] = '<div style="text-align: center;min-width:60px">' + item + '</div>';
        })
        if(slicer1&&slicer2){
            if(slicer3){
               var str = strArr1.join('') + 
                "<div style='text-align: center;'><div style='transform: rotate(90deg); min-width:60px'>" + slicer1 +"</div>"+
                "<div style='text-align: center;min-width:60px'>"+endStr[0]+"</div>"+
                "<div style='text-align: center;min-width:60px'>"+slicer3+"</div>"+
                "<div style='text-align: center;min-width:60px'>"+endStr[1]+"</div>"+
                "<div style='transform: rotate(90deg);min-width:60px'>" + slicer2 +"</div></div>"+strArr2.join(''); 
            }else{
               var str = strArr1.join('') + 
                "<div style='text-align: center;'><div style='transform: rotate(90deg);min-width:60px'>" + slicer1 +"</div>"+
                "<div style='text-align: center;min-width:60px'>"+endStr[0]+"</div>"+
                "<div style='transform: rotate(90deg);min-width:60px'>" + slicer2 +"</div></div>"+strArr2.join(''); 
            }
        }else{
            var str = strArr1.join('');
        }
        return str;
    },
    // 横竖排转化删除<br>
    removeBr:function (srt) {
        var me  = this;
        var reg = /<[^>]*>|<\/[^>]*>/gm;
        var s = srt.replace(reg, "")
        s = me.titleEscape(s);
        return s;
    },
    // 标签转义
    titleEscape:function (text) {
        var me  = this;
        var codeObj = [{
                num: '1',
                code: '&#185;'
            },
            {
                num: '2',
                code: '&#178;'
            },
            {
                num: '3',
                code: '&#179;'
            },
            {
                num: '4',
                code: '&#8308;'
            },
            {
                num: '5',
                code: '&#8309;'
            },
            {
                num: '6',
                code: '&#8310;'
            },
            {
                num: '7',
                code: '&#8311;'
            },
            {
                num: '8',
                code: '&#8312;'
            },
            {
                num: '9',
                code: '&#8313;'
            },
            {
                num: 'n',
                code: '&#8319;'
            },
            {
                num: '0',
                code: '&#8304;'
            }
        ]
        // 查找un码
        function getCode(str) {
            for (var i = 0; i < codeObj.length; i++) {
                if(codeObj[i].num == str){
                    return codeObj[i].code;
                }
            }
        }
        var t = text
        if (text.indexOf("^") != -1) {
            if (text.indexOf("^-") != -1) {
                var strArr = text.split('^-');
                var arr = [];
                strArr.forEach(function(item, index) {
                    if (index > 0) {
                        if (getCode(item.substring(0, 1))) {
                            var v = '&#8315;' +getCode(item.substring(0, 1));
                            var v1 = item.substring(1, item.length)
                            arr.push(v + v1);
                        } else {
                            me.cAlert('该上标数字不存在')
                        }

                    } else {
                        arr.push(item);
                    }
                })
            } else {
                var strArr = text.split('^');
                var arr = [];
                strArr.forEach(function(item, index) {
                    if (index > 0) {
                        if (getCode(item.substring(0, 1))) {
                            var v = getCode(item.substring(0, 1));
                            var v1 = item.substring(1, item.length)
                            arr.push(v + v1);
                        } else {
                            me.cAlert('该上标数字不存在')
                        }

                    } else {
                        arr.push(item);
                    }
                })
            }

            t = arr.join('');
        }
        return t;
    },
    // 毫秒值转特定格式日期字符串
    date_getFormatDate:function(millisecond, format) {
        if(!/\d{10,}/.test(millisecond)){
            return "";
        }
        format = format || "YYYY-mm-dd hh:mi:ss.ms";
        var date = new Date(parseInt(millisecond));
        return format
            .replace(/YYYY/i, date.getFullYear())
            .replace(/YY/i, date.getFullYear().toString().substr(2, 2))
            .replace(/MM/g, pad(date.getUTCMonth() + 1))
            .replace(/mm/g, date.getUTCMonth() + 1)
            .replace(/DD/i, date.getUTCDate())
            .replace(/HH/i, date.getUTCHours())
            .replace(/MI/i, date.getUTCMinutes())
            .replace(/SS/i, date.getUTCSeconds())
            .replace(/MS/i, date.getUTCMilliseconds());
    },
}

//根据序列名在定制文件中查找序列样式
function findSeriesThemeByName(name, sereisThemes){
//    if(!isArray(sereisThemes)) return null;
    for(var each in sereisThemes){
        if(sereisThemes.hasOwnProperty(each)){
            if(sereisThemes[each] && sereisThemes[each].name == name.trim()){
                return sereisThemes[each];
            }
        }
    }
    return null;
}



function getBrowserType(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    return Sys;
}

function getIEDocumentMode(){
    // 判断是否为IE
    var isIE = navigator.userAgent.toLocaleLowerCase().indexOf('msie') !== -1;

    // 判断是否为IE5678
    var isLteIE8 = isIE && !-[1,];

    // 用于防止因通过IE8+的文档兼容性模式设置文档模式，导致版本判断失效
    var dm = document.documentMode, isIE5, isIE6, isIE7, isIE8, isIE9, isIE10, isIE11;
    if (dm){
        return dm;
    }
    else{
        // 判断是否为IE5，IE5的文本模式为怪异模式(quirks),真实的IE5.5浏览器中没有document.compatMode属性
        isIE5 = (isLteIE8 && (!document.compatMode || document.compatMode === 'BackCompat'));
        // 判断是否为IE6，IE7开始有XMLHttpRequest对象
        isIE6 = isLteIE8 && !isIE5 && !XMLHttpRequest;
        // 判断是否为IE7，IE8开始有document.documentMode属性
        isIE7 = isLteIE8 && !isIE6 && !document.documentMode;
        // 判断是否IE8
        isIE8 = isLteIE8 && document.documentMode;
        // 判断IE9，IE10开始支持严格模式，严格模式中函数内部this为undefined
        isIE9 = !isLteIE8 && (function(){
            "use strict";
            return !!this;
        }());
        // 判断IE10，IE11开始移除了attachEvent属性
        isIE10 = isIE && !!document.attachEvent && (function(){
            "use strict";
            return !this;
        }());
        // 判断IE11
        isIE11 = isIE && !document.attachEvent;
        if(isIE5){
            return 5;
        }
        else if(isIE6){
            return 6;
        }
        else if(isIE7){
            return 7;
        }
        else if(isIE8){
            return 8;
        }
        else if(isIE9){
            return 6;
        }
        else if(isIE9){
            return 6;
        }
        else if(isIE10){
            return 10;
        }
        else if(isIE11){
            return 11;
        }
    }
};

//默认在本页面弹出，在添加dhtmlx_iframe.js的页面弹出
function getDhtmlxWindow(){
    //是否是最顶层窗口，即没有嵌入到iframe中
    _isTopWindow = true;
    parentFrame = null;
    dhtmlxPopWindow = null;
    topWindow = window;
    try{
        while(true){
            if(topWindow.dhtmlx_iframe){
                _isTopWindow = false;
                dhtmlxPopWindow = topWindow;
                var frames = dhtmlxPopWindow.parent.document.getElementsByTagName("iframe");
                for(var i = 0; i < frames.length; i++){
                    if(frames[i].contentWindow == window){
                        parentFrame =  frames[i];
                    }
                }
            }
            if(topWindow.parent == topWindow){
                break;
            }
            topWindow = topWindow.parent
        }
    }
    catch (e){

    }
//    for(topWindow = window; topWindow.parent!=null && topWindow.parent != topWindow; topWindow = topWindow.parent)
//    {
//        _isTopWindow = false;
//        if(topWindow.dhtmlx_iframe){
//            dhtmlxPopWindow = topWindow;
//        }
//        var frames = topWindow.parent.document.getElementsByTagName("iframe");
//        for(var i = 0; i < frames.length; i++){
//            if(frames[i].contentWindow == window){
//                parentFrame =  frames[i];
//            }
//        }
//    }
    if(!dhtmlxPopWindow){
//        dhtmlxPopWindow = topWindow;
        _isTopWindow = true;
    }
    if(!parentFrame){
        _isTopWindow = true;
    }
    return null;
}

/**
 * 动态加载js、css文件模块
 */
var classcodes = [];
function LoadFileList(_files,succes){           /*加载一批文件，_files:文件路径数组,可包括js,css,less文件,succes:加载成功回调函数*/
    var FileArray=[];
    if(typeof _files==="object"){
        FileArray=_files;
    }else if(typeof _files==="string"){
        /*如果文件列表是字符串，则用,切分成数组*/
        FileArray=_files.split(",");

    }
    if(FileArray!=null && FileArray.length>0){
        var LoadedCount=0;
        for(var i=0;i< FileArray.length;i++){
            loadFile(FileArray[i],function(){
                LoadedCount++;
                if(LoadedCount==FileArray.length){
                    succes();
                }
            })
        }
    }
    else if(FileArray!=null && FileArray.length==0){
        succes();
    }
}
/*加载JS文件,url:文件路径,success:加载成功回调函数*/
function loadFile(url, success) {
        
    if (!FileIsExt(classcodes,url)) {
        var ThisType=GetFileType(url);
        var fileObj=null;
        if(ThisType==".js"){
            fileObj=document.createElement('script');
            fileObj.src = url;
        }else if(ThisType==".css"){
            fileObj=document.createElement('link');
            fileObj.href = url;
            fileObj.type = "text/css";
            fileObj.rel="stylesheet";
        }else if(ThisType==".less"){
            fileObj=document.createElement('link');
            fileObj.href = url;
            fileObj.type = "text/css";
            fileObj.rel="stylesheet/less";
        }
        success = success || function(){};
        fileObj.onload = fileObj.onreadystatechange = function() {
            if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                success();
                classcodes.push(url)
            }
        }
        document.getElementsByTagName('head')[0].appendChild(fileObj);
    }else{
        success();
    }
}
/*获取文件类型,后缀名，小写*/
function GetFileType(url){
    if(url!=null && url.length>0){
        return url.substr(url.lastIndexOf(".")).toLowerCase();
    }
    return "";
}
/*文件是否已加载*/
function FileIsExt(FileArray,_url){
    if(FileArray!=null && FileArray.length>0){
        var len =FileArray.length;
        for (var i = 0; i < len; i++) {
            if (FileArray[i] ==_url) {
                return true;
            }
        }
    }
    return false;
}
function ContainsJS(jsName){
    var scripts = document.getElementsByTagName("script");
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(jsName) != -1) {
            return true;
        }
    }
    return false;
}

function CreateJSPath(str,dis){
    var scripts = document.getElementsByTagName("script");
    var path = "";
    if(str && str.indexOf("js") != -1){
        for (var i = 0, l = scripts.length; i < l; i++) {
            var src = scripts[i].src;
            if (src.indexOf(str) != -1) {
                path = src.split(str)[0];
                break;
            }
        }
    }

    var href = location.href;
    href = href.split("#")[0].split("?")[0].split("/");

    var isAbsolutePath = true;
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        isAbsolutePath = false;
        href.length = href.length - 1;
        path = path.split("/");
        path = href.concat(path);
    }
    if(isAbsolutePath){
        path = path.split("/");
    }
    path.length = path.length - 1 + (dis || 0);
    path = path.join("/");
    return path;
}
// 判断是否是ie浏览器
function isIE() {
	if (!!window.ActiveXObject || "ActiveXObject" in window || navigator.userAgent.indexOf("Edge") > -1) {
		return true;
	} else {
		return false;
	}
};


///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓通用函数↓↓↓↓↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 去除字符串两端的空白字符
     * @returns {*|string}
     */
    String.prototype.trim = function() {
        var r = this.replace(/(^\s*)|(\s*$)/g, "");
        return r;
    };

    
    /**
     * 获取数组中某个元素
     * @param arr
     * @param fn
     * @param context
     * @returns {*}
     */
    function array_getElement(arr, fn, context){
        if (typeof fn === "function") {
            for (var k = 0, length = arr.length; k < length; k++) {
                if (fn.call(context, arr[k], k, arr)) {
                    return arr[k]
                }
            }
            return null;
        }
    };

    /**
     * 映射数组中的每一个元素
     * @param arr
     * @param fn
     * @param context
     * @returns {Array}
     */
    function array_map(arr, fn, context){
        var arr_tmp = [];
        if (typeof fn === "function") {
            for (var k = 0, length = arr.length; k < length; k++) {
                arr_tmp.push(fn.call(context, arr[k], k, arr));
            }
        }
        return arr_tmp;
    }

    /**
     * 过滤数组中的元素
     * @param arr
     * @param fn
     * @param context
     * @returns {Array}
     */
    function array_filter(arr, fn, context){
        var arr_tmp = [];
        if (typeof fn === "function") {
            for (var k = 0, length = arr.length; k < length; k++) {
                fn.call(context, arr[k], k, arr) && arr_tmp.push(arr[k]);
            }
        }
        return arr_tmp;
    }

    /**
     * 以逗号分割的字符串转换成数组
     * @param str
     */
    function array_fromString(str, type){
        if(str == undefined || str == null){
            return undefined;
        }
        var array = array_filter(str.split(","), function(v){return v != ""}, null);
        return array_map(array, function(v){
            switch (type){
                case "number":
                    return parseInt(v,10);
                    break;
                default :
                    return v;
                    break;
            }
        }, null);
    };

    /**
     * 以指定的格式格式化数组中的每个元素
     * @param str
     */
    function array_format(arr, format){
        if (/(YYYY|MM|DD|HH|MI|SS)/i.test(format)) {
            return array_map(arr, function(v){
                return date_getMillisecond(v)
            }, null);
        }
        else if (isNumber(format) && parseInt(format,10) >= 0) {
            return array_map(arr, function (v) {
                if(v === undefined ||  v === '' ||  v === null){
                    return null;
                }
                else{
                    return parseFloat(v);
                }
            }, null);
        }
        else {
            return array_map(arr, function(v){
                return v;
            }, null);
        }

    };
     /**
     * 替換日期格式字符串，將yyyy替換成%Y
     * @param sDateFormat
     */
    function date_replace_dateFormat(sDateFormat) {
        return sDateFormat
            .replace(/YYYY/i, '%Y')
            .replace(/YY/i, '%y')
            .replace(/MM/g, '%m')
            .replace(/mm/g, "%m")
            .replace(/AA/g, "%A")
            .replace(/aa/g, "%a")
            .replace(/ww/g, "%w")
            .replace(/DD/i, '%d')
            .replace(/TT/i, '%t')
            .replace(/HH/i, '%H')
            .replace(/MI/i, '%M')
            .replace(/SS/i, '%S')
            .replace(/MS/i, '%L')
						.replace(/hh/i, '%H')
						.replace(/mi/i, '%M')
						.replace(/ss/i, '%S')
						.replace(/ms/i, '%L')
    };
    
    /**
     * 日期格式处理函数
     * @param strDateTimeFormat
     * @returns {undefined}
     */
    function dateFormat_fromString(strDateTimeFormat){
        if(strDateTimeFormat == undefined || strDateTimeFormat == null){
            return undefined;
        }
        var dateTimeArray = array_filter(strDateTimeFormat.split(","), function(v){return v != ""}, null);
        dateTimeArray = array_map(dateTimeArray, function(v){return date_replace_dateFormat(v.trim())}, null);
        var dateTimeFormat = {};
        dateTimeArray[0] && (dateTimeFormat.year = dateTimeArray[0]);
        dateTimeArray[1] && (dateTimeFormat.month = dateTimeArray[1]);
        dateTimeArray[2] && (dateTimeFormat.week = dateTimeArray[2]);
        dateTimeArray[3] && (dateTimeFormat.day = dateTimeArray[3]);
        dateTimeArray[4] && (dateTimeFormat.hour = dateTimeArray[4]);
        dateTimeArray[5] && (dateTimeFormat.minute = dateTimeArray[5]);
        dateTimeArray[6] && (dateTimeFormat.second = dateTimeArray[6]);
        dateTimeArray[7] && (dateTimeFormat.millisecond = dateTimeArray[7]);
        return dateTimeFormat;
    };

    /**
     * 处理日期字符串返回毫秒值
     * @param sDate
     * @returns {*}
     */
    function date_getMillisecond(sDate){
        var year, month, day, hour, minute, second, milliseconds = 0;
        sDate += "";
        sDate = sDate.replace(/\//g,"-");

        //2014-1-20 8:50:00
        if(/\d{4}(-\d{1,2}){1,2}\s{1,}\d{1,2}(:\d{1,2}){1,2}(\.\d+){0,1}/.test(sDate)){
            var date_time_arr = array_filter(sDate.split(/\s+/), function(v){return v != null}, null);
            var date_arr = array_map(date_time_arr[0].split("-"), function(v){return parseInt(v.trim(),10)}, null);
            var time_arr = array_map(date_time_arr[1].split(":"), function(v){return parseInt(v.trim(),10)}, null);

            year = date_arr[0];
            month = date_arr[1];
            day = date_arr[2];

            hour = time_arr[0];
            minute = time_arr[1];
            second = time_arr[2];

            if(sDate.indexOf(".") != -1){
                milliseconds = parseInt(sDate.split(".")[1], 10);
            }
        }

        //11-MAY-15 20:52:48.0 日-月-年 时:分:秒.毫秒
        else if(/\d{1,2}-([a-zA-Z]+)-\d{2,4}\s{1,}\d{1,2}(:\d{1,2}){2}(\.\d+){0,1}/.test(sDate)){

            var monthsMap = {'january':1,'february':2, 'march':3, 'april':4, 'may':5, 'june':6, 'july':7,
                'august':8, 'september':9, 'october':10, 'november':11, 'december':12,
                'jan':1, 'feb':2, 'mar':3, 'apr':4, 'may':5, 'jun':6, 'jul':7, 'aug':8, 'sep':9, 'oct':10, 'nov':11, 'dec':12}
            var date_time_arr = array_filter(sDate.split(/\s+/), function(v){return v != null}, null);
            var date_arr = array_map(date_time_arr[0].split("-"), function(v){return v.trim()}, null);

            year = parseInt(date_arr[2].length == 2 ? ("20" + date_arr[2]) : date_arr[2], 10);
            month = monthsMap[date_arr[1].toLowerCase()];
            day = parseInt(date_arr[0]);

            var time_arr = array_map(date_time_arr[1].split(":"), function(v){return parseInt(v.trim(),10)}, null);
            hour = time_arr[0];
            minute = time_arr[1];
            second = time_arr[2];

            if(sDate.indexOf(".") != -1){
                milliseconds = parseInt(sDate.split(".")[1], 10);
            }
        }

        //2014-1-20
        else if(/\d{4}(-\d{1,2}){1,2}/.test(sDate)){
            var date_arr = array_map(sDate.split("-"), function(v){return parseInt(v.trim(),10)}, null);

            year = date_arr[0];
            month = date_arr[1];
            day = date_arr[2];
        }

        //8:50:00
        else if(/\d{1,2}(:\d{1,2}){1,2}(\.\d+){0,1}/.test(sDate)){
            var time_arr = array_map(sDate.split(":"), function(v){return parseInt(v.trim(),10)}, null);
            hour = time_arr[0];
            minute = time_arr[1];
            second = time_arr[2];
            if(sDate.indexOf(".") != -1){
                milliseconds = parseInt(sDate.split(".")[1], 10);
            }
        }

        //毫秒值 1390176000000
        else if(/\d{10,}/.test(sDate)){
            return parseInt(sDate,10);
        }

        //20140120 || 2014 || 201401
        else if(/\d{4,8}/.test(sDate)){
            year = parseInt(sDate.substr(0, 4),10);
            month = parseInt(sDate.substr(4, 2),10);
            day = parseInt(sDate.substr(6, 2),10);
        }
        else if (sDate == "0") {
            return 0;
        }
        //日期格式不正确
        else{
            alert("日期格式不正确");
            return;
        }

        //修正年月日
        year = isNaN(year) ? 2000 : year;
        month = isNaN(month) ? 1 : month;
        day = isNaN(day) ? 1 : day;

        //修正时分秒
        hour = isNaN(hour) ? 0 : hour;
        minute = isNaN(minute) ? 0 : minute;
        second = isNaN(second) ? 0 : second;

        return Date.UTC(year, month - 1, day, hour, minute, second, milliseconds);
    };
	/**
	 * 获取滚动条滚动距离
	 * @returns {Array|*}
	 * @private
	 */
	function ___getPageScroll() {
			var xScroll, yScroll;
			if (self.pageYOffset) {
					yScroll = self.pageYOffset;
					xScroll = self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {     // Explorer 6 Strict
					yScroll = document.documentElement.scrollTop;
					xScroll = document.documentElement.scrollLeft;
			} else if (document.body) {// all other Explorers
					yScroll = document.body.scrollTop;
					xScroll = document.body.scrollLeft;
			}
			return [xScroll,yScroll];
	};

    

    