Vmd.define('hwchart.util.TemplateParse',{
    requires:[
        'hwchart.util.DataParse',
        'hwchart.Dialog'
    ],
    clone:zrender.util.clone,
    each:zrender.util.each,
     /**
    *@param {string} path 模板路径
    *@param {object} option 参数设置
    *@param {object} chart 实例化的chart对象
    */
    initParse:function(path, option){
        var me = this;
        me.path = path;
        var dataParse = new hwchart.util.DataParse(path, option, me.chart);
        me.geoScope = {};
        //增加监听
        me.chart.on('fetchData',function(params){
            if(params){
                dataParse.parse(params,function(tplData){  // 运行模式数据解析
                    me.parseTpl(params,tplData)
                })
            }else{
                console.warn('组件参数未传递')
            }
        })
        if(!path&&me.chart.tpl){
            me.tpl = me.clone(me.chart.tpl)
            me.Layers = me.tpl.layers;
            me.updateLayer(me.tpl);
            // 序列与视觉映射
            me.updatavisualMap(me.tpl)
            me.update(me.tpl);
            me._initEvents();
        }else{
            // 获取初始模板 
            me.getJSON(me.path,function(json){
                var tpl = JSON.parse(json);
                me.chart.tpl = tpl;
                //需要克隆一份模板信息
                me.tpl = me.clone(tpl);
                me.Layers = me.tpl.layers;
                // 根据图层设置序列
                me.updateLayer(me.tpl);
                // 序列与视觉映射
                me.updatavisualMap(me.tpl)

                me.update(me.tpl);
                //初始化事件
                me._initEvents();
            },function(mgs){
                console.warn(mgs)
            })
        }
    },
    parse:function (path, option,isUser, chart) {
        var me  = this;
        me.chart = chart;
        // me.chart.option  = option;
        if(isUser){
            var userName = 'dbadmin';
            me.hwFao = new HwFao(option.fileHost || option.host, option.fileCallCode || option.callCode); //地址:端口和存储标识(服务管理员分配)
            var filepath = userName + "/templates/template.json";
            if (hwchart.configs.enableStaticData) {
                dhx.ajax.get(filepath, function (data) {
                    var xmlDoc = data.xmlDoc;
                    if (xmlDoc.status == '200') {
                        var res = JSON.parse(xmlDoc.responseText);
                        if (res.isSucceed) {
                            path = hwchartsPATH + 'templates/user/' + userName + "/templates/template.json";
                            me.initParse(path, option);
                        } else {
                            me.initParse(path, option);
                        }
                    } else {
                        me.initParse(path, option);
                    }

                })

            } else {
                me.hwFao.read(filepath, function (res) {
                    if (res.isSucceed) {
                        path = hwchartsPATH + 'templates/user/' + userName + "/templates/template.json";
                        me.initParse(path, option);
                    } else {
                        me.initParse(path, option);
                    }
                }, function (res) {
                    me.initParse(path, option);
                });
            }
          
        }else{
            me.initParse(path, option);
        }
    },
    _initEvents:function(){

        this._initDialog();
        this._selectedHighlight();
    },
    /*
    * @desc 选择高亮
    */
    _selectedHighlight: function () {
        var me  = this;
        var chart = this.chart;
        var series = chart._api.getModel().getSeries();
        //圈选及不规则选后的高亮显示
        chart.on('brushSelected', function (params) {
            var brushComponent = params.batch[0];
            if (!brushComponent) return;
            if (brushComponent.areas && brushComponent.areas.length == 0) return;
            chart.dispatchAction({
                type: 'highlight',
                areas: brushComponent.areas,
                selected: brushComponent.selected
            })
            var selected = [];
            me.each(brushComponent.selected,function(v,k){
                me.each(series,function(item,index){
                    if(item.subType === 'wellSymbol' && item.id ==v.seriesId){
                        // console.log(item.option.data)
                        // console.log(v.dataIndex)
                        for(var i = 0;i<v.dataIndex.length;i++){
                            selected.push(item.option.data[v.dataIndex[i]]);
                        }
                        
                    }
                })
            })
            // console.log(selected)
            if(brushComponent.areas){
                chart.trigger('chartregionselected', brushComponent.areas[0].range,selected);
            }
        })
    },
    /**
    *@desc 初始化对话框调用
    */
    _initDialog: function () {
        var chart = this.chart;
        //对话框调用，双击dbclick，右键contextmenu
        chart.on('dblclick',  function (params) {

             new hwchart.Dialog(chart,params)

            // console.log(params)  
            // switch(params.seriesType){
            //     case 'miningIndex':
            //         //调用的对话框
            //         alert(params.seriesType)
            //         break;
            // }  
                      
        })
    },
     /**
    *@private 解析模板
    *@param {object} params 组件监听事件返回的参数
    *@param {object} tplData 数据解析后返回的数据
    */
    parseTpl:function(params,tplData){
       
        var me = this;
        if(tplData.tpl.geo){
            var geoIndex = tplData.tpl.series[params.seriesIndex].geoIndex;
            var mapName = geoIndex?tplData.tpl.geo[geoIndex].map:tplData.tpl.geo[0].map;
            var geo = geoIndex?tplData.tpl.geo[geoIndex]:tplData.tpl.geo[0]
            if(params.subType == 'wellSymbol'){
                var rectJson = me.getRegisterMap(tplData.data,geo,true,true);
                hwcharts.registerMap(mapName, rectJson);
            }else if(params.subType == 'isoLine' || params.subType == 'isoArea'){
                if(tplData.geoScope && me.geoScope.xMax){
                    me.geoScope.xMax = Math.max(me.geoScope.xMax,tplData.geoScope.xMax);
                    me.geoScope.xMin = Math.min(me.geoScope.xMin,tplData.geoScope.xMin);
                    me.geoScope.yMax = Math.max(me.geoScope.yMax,tplData.geoScope.yMax);
                    me.geoScope.yMin = Math.min(me.geoScope.yMin,tplData.geoScope.yMin);
                }else if(tplData.geoScope){
                    me.geoScope.xMax = tplData.geoScope.xMax;
                    me.geoScope.xMin = tplData.geoScope.xMin;
                    me.geoScope.yMax = tplData.geoScope.yMax;
                    me.geoScope.yMin = tplData.geoScope.yMin;
                }
                var rectJson = me.getRegisterMap(tplData.data,geo,false,false);
                hwcharts.registerMap(mapName, rectJson);
            }else if(params.subType == 'faultLine'){
                var arr = [];
                tplData.data.forEach(function(item){
                    arr = arr.concat(item.coords)
                })
                // console.log(obj)
                var rectJson = me.getRegisterMap(arr,geo,true,false);
                hwcharts.registerMap(mapName, rectJson);
            }

        }
        if(params.subType == 'wellLogging'){
            switch (params.nodeType) {
                case "curve":
                    me.chart.setOption({series:[{
                            name:params.name,
                            data: [{
                                name: params.params.curveName,
                                data: tplData.data,
                                requestCompleted:true
                            }]
                        }]})
                    break;
                default:
                    break;
            }
        }
        else{
			var s = [{
				name:params.name,
				data:tplData.data,
				dirty:true,
				requestCompleted:true
			}];
			if(params.applyDataTo&&params.applyDataTo.length>0){
				for(var i = 0;i<params.applyDataTo.length;i++){
					s.push({
						name:params.applyDataTo[i],
						data:tplData.data,
						dirty:true,
						requestCompleted:true
					})
				}
			}
            me.chart.setOption({series:s})
        }
    },
    /*
   *@private 初始化提示框
   *@param {object}-tpl 模块对象
   */
    _initTooltip:function(tpl){
        var me  = this;
        var option = {
            tooltip: {
                formatter: function (params, ticket, callback) {
                    var seriesType = params.seriesType;
                    if (seriesType == 'miningIndex') {
                        var zoom = me.chart._model.getComponent('geo').coordinateSystem._zoom;
                        var series = me.chart._model.getSeriesByType(seriesType);
                        if(zoom<2.3 || !series[0].option.toopTip|| !series[0].option.toopTip.show ){
                            return;
                        }
                        var value = params.value;
                        var company = params.data.company;
                        var list = []
                        var listItem = ''
                        list.push('<li>' +params.data.id+ '</li>');
                        for (var i = 0; i < value.length; i++) {
                            if(value[i]){
                                list.push(
                                    '<li>' + params.name[i] +'</span>&nbsp&nbsp：' +value[i] +'('+ company[i]+')'+'</li>'
                                  )
                            }
                        }
                        listItem = list.join('')
                        return '<ul class="tooltip miningIndex">' + listItem + '</ul>'
                    }
                }
            }
        };
        zrender.util.extend(tpl, option);

    },
	 /*
    *@private 初始化工具栏
    *@param {object}-tpl 模块对象
    */
    _initToolbox: function (tpl) {
        var me = this;
        var isLayerManage = false;
        if(me.Layers){
            isLayerManage = true;
        }
        //工具栏配置
        var otherOption = {
            toolbox: {
                left: 'center',
                z:99,
                feature: {
                    brush: {
                        isWellMode: true,
                        type: ['rect', 'polygon']
                    },
                    zoom: {
                        show: true
                    },//放大
                    wellFind: {
                        show: true
                    },//查找
                    manage:{
                        show:isLayerManage
                    }, // 图层管理
                    saveAsImage: {},//保存
                    //自定义
                    // define: {
                    //     tabs: [
                    //         { seriesName: "baseProperty", text: "基本属性", active: true },
                    //         { seriesName: "wellSymbol", text: "井位", active: false },
                    //         { seriesName: "miningIndex", text: "开采指标", active: false },
                    //         { seriesName: "isoArea", text: "等值区设置", active: false }
                    //     ]
                    // },
                    //saveAsTemplate:{},//保存为模板
                    fullscreen: {},//全屏

                },
                iconStyle: {
                    normal: {
                        borderColor: 'none',
                        color: '#797979'
                    },
                    emphasis: {
                        borderColor: 'none',
                        color: 'rgb(85, 150, 255)'
                    }
                },
                itemSize: 20,
                itemGap: 20,//间距
                backgroundColor: '#fff'
            },
            brush: {
                outOfBrush: {
                    // color: 'green'
                    // colorAlpha: 1
                },
                brushStyle: {
                    borderWidth: 2,
                    color: 'rgba(0,0,0,0.1)',
                    borderColor: 'rgba(0,0,0,0.5)',
                },
                //  seriesIndex: [0, 1],
                throttleType: 'debounce',
                throttleDelay: 300
                // geoIndex: 0
            }

        }

        //重新赋值
        // if(tpl.toolbox&&tpl.toolbox.items){
        //     //zrender.util.extend(otherOption.toolbox.feature.define, tpl.toolbox.items.define);
        //     var tabs1 = otherOption.toolbox.feature.define.tabs || [];
        //     var tabs2 = tpl.toolbox.items.define.tabs || [];
        //     for(var i = 0;i<tabs1.length;i++){
        //         for(var j = 0;j<tabs2.length;j++){
        //             if(tabs1[i].seriesName === tabs2[j].seriesName){
        //                 tabs1.splice(i,1);
        //                 i--;
        //                 break;
        //             }
        //         }
        //     }

        //     otherOption.toolbox.feature.define.tabs = tabs2.concat(tabs1)
        // }
        
        zrender.util.extend(tpl, otherOption);
    },
   
    /**
    *@private 根据图层数据修改序列的层级和显示与否
    */
    setSerier:function(data,obj){
        var me = this;
        for(var i = 0;i<data.length;i++){
            var objs = data[i].objs;
            var isShow = data[i].show;
            if(objs&&objs.length>0){
                objs.forEach(function(item){
                    if(item==obj.name){
                        obj.z = data[i].z;
                        me.chart.seriesSelected[item] = isShow;
                    }
                    // if(item==obj.name && !isShow){
                    //     for(var j = 0;j<me.chart.ShowSeries.length;j++){
                    //         if(me.chart.ShowSeries[j]===obj.index){
                    //             me.chart.ShowSeries.splice(j,1)
                    //             j--;
                    //         }
                    //     }
                    // }
                })
            }else{
                var childern = data[i].children;
                if(childern&&childern.length>0){
                    childern.forEach(function(item){
                        item.z = data[i].z;
                    })
                    me.setSerier(childern,obj)
                }
            }
        }
    },
    updateLayer:function(tpl){
       
        var me = this;
        //me.chart.ShowSeries = [];
        me.chart.seriesSelected = {};
        var series = tpl.series;
        series.forEach(function(item,i){
            item.index = i;
            //me.chart.ShowSeries.push(item.index);
            if(item.show ==undefined){
                me.chart.seriesSelected[item.name] = true;
            }else{
                me.chart.seriesSelected[item.name] = item.show;
            }
            
            if(me.Layers){
                me.setSerier(me.Layers,item)
            }
        }) 
    },
    updatavisualMap:function(tpl){
        var me = this;
        var map = tpl.visualMap;
        var series = tpl.series;
        if(map){
            me.each(map,function(item,k){
                var isShow = me.chart.seriesSelected[item.seriesName];
                item.show = isShow;
                for(var i =0;i<series.length;i++){
                    if(item.seriesName === series[i].name){
                        item.id = series[i].name;
                        item.seriesIndex = [i];
                        series[i].visualMapIndex = k;
                    }
                }
            })
        }
       
    },
     /**
    *@private 组件渲染
    *@param {object} tpl 解析后携带了数据的模板信息
    */
    update: function (tpl) {
        var me = this;
         //提示框初始化
        me._initTooltip(tpl);
        //工具栏配置
        me._initToolbox(tpl);
        //从模板中组织好曲线需要的信息title、lengend、serires
        var options = {};
        //option-property 可配置的属性
        var props = ['title','visualMap','graphic','legend','scale','compass', 'mapInfo','series','geo','frame','frameNew','toolbox','brush','tooltip','layers'];
        zrender.util.each(props, function (prop) {
            if (tpl[prop]) {
                options[prop] = me.clone(tpl[prop]);
            }
        })
            var rectJson = {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                                "type": "Polygon",
                                "coordinates": []
                        }
                    }
                ]
			};
        if(tpl.geo){
            tpl.geo.forEach(function(item){
                var mapName = item.map;
                hwcharts.registerMap(mapName, rectJson);
            })
        }
        options.series.sort(me.sortRule_h);
        this.chart.setOption(options);
    },
    sortRule_h: function(a, b) {
		return parseFloat(a.z) - parseFloat(b.z);
	},
      /**
    *@desc 获取json
    *@param {string} url 请求地址
    *@param {function} success 成功回调函数
    *@param {duntion} error 失败回调
    */
    getJSON:function(url, success, error) {
        var me = this;
        var request = new XMLHttpRequest();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                var json = request.responseText;
                success(json)
            }else{
                var mgs = request.status+":"+request.responseText
                error(mgs)
            }
        }
    },
     /**
    *@desc 获取绘制区域范围
    *@param {object} data 绘图数据
    */
    getRegisterMap:function(data,geo,isCountData,isAdd){
        var me = this;
        var xMax;
        var yMax;
        var xMin;
        var yMin;
        if(isCountData){
            data.forEach(function(item){
                var x = item.value?item.value[0]:item[0];
                var y = item.value?item.value[1]:item[1];
                if(xMax == undefined || xMax  <=  x){
                    xMax = x;
                }
                if(xMin == undefined || xMin > x){
                    xMin = x;
                }
                if(yMax == undefined || yMax < y){
                    yMax = y;
                }
                if(yMin == undefined || yMin > y){
                    yMin = y;
                }
            })
            var w = parseFloat(geo.width);
            var h = (xMax-xMin)*w/(yMax-yMin);
            if(isAdd){ // 井位区域外扩
                var addW = 100;
                var addH = 50;
                var addX = (xMax-xMin)*addW/(w-2*addW);
                var addY = (yMax-yMin)*addH/(h-2*addH);

                if(!isNaN(addX)){
                    xMin = xMin - addX;
                    xMax = xMax + addX;
                }
                if(!isNaN(addY)){
                    yMin = yMin- addY;
                    yMax = yMax+addY;
            }

            }else{ // 断层区域外扩
                
                
            }
        }
        if(me.geoScope.xMax && xMax){
            xMax = Math.max(me.geoScope.xMax,xMax);
            xMin = Math.min(me.geoScope.xMin,xMin);
            yMax = Math.max(me.geoScope.yMax,yMax);
            yMin = Math.min(me.geoScope.yMin,yMin);
        }else if(me.geoScope.xMax){
            xMax = me.geoScope.xMax;
            xMin = me.geoScope.xMin;
            yMax = me.geoScope.yMax;
            yMin = me.geoScope.yMin;
        }
        me.geoScope.xMax = xMax;
        me.geoScope.xMin = xMin;
        me.geoScope.yMax = yMax;
        me.geoScope.yMin = yMin;
        
        var res = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [
                                    xMin,
                                    yMin
                                ],
                                [
                                    xMax,
                                    yMin
                                ],
                                [
                                    xMax,
                                    yMax
                                ],
                                [
                                    xMin,
                                    yMax
                                ],
                                [
                                    xMin,
                                    yMin
                                ]
                            ]
                        ]
                    }
                }
            ]
        }
        //console.log("xMax:"+xMax, "xMin:"+xMin,"yMax:"+yMax, "yMin:"+yMin)
        return res;
    },
})