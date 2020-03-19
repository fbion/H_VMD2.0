Vmd.define('hwchart.util.DataParse',{
    clone:zrender.util.clone,
    each:zrender.util.each,
	
  /**
    *@param {string} path 模板路径
    *@param {object} option 参数设置
    *@param {object} chart 实例化的chart对象
    */
    constructor:function(path, option, chart){
        this.chart = chart;
        this.path = path;
        this.option=option;
    },
    /**
    *@private 解析
    *@param {object} params 组件监听事件返回的参数
    *@param {function} callback 回调函数
    */
    parse:function (params,callback) {
        var me = this;
        var dataHost = me.option.host;
        var callCode = me.option.callCode;
        var timeout = me.option.timeout || 60*1000 ;
        me.hwDao = new HwDao(dataHost, callCode, true, timeout);//地址:端口,授权码(服务管理员分配),是否异步,超时时间(单位ms)
        me.parseDs(params,callback)
        
		
    },
    /**
    *@private 解析数据集
    *@param {object} params 组件监听事件返回的参数
    *@param {function} callback 回调函数
    */
    parseDs:function(params,callback){
        var me = this;
        //获取模板信息
        if(me.chart.tpl){
            me.tpl = me.clone(me.chart.tpl);
            //解析数据集
            var mapping = null;
            me.tpl.seriesMapping.forEach(function(item){
                if(item.seriesName ===params.name ){
                    mapping = item;
                }
            })
            
            if(mapping){

                mapping.nameText = params.nameText || params.name;
                mapping.num = params.seriesIndex;
                mapping.type = params.subType,
                mapping.params = params.params||{};
                if(params.wellType){
                    mapping.wellType = params.wellType;
                }
                if(params.traceType){
                    mapping.traceType = params.traceType;
                }
                if(params.indexs){
                    mapping.indexs = params.indexs;
                }
                me._getData(mapping,function(tplData){
                    callback(tplData)
                })
            }
        }else{
            me.getJSON(me.path,function(json){
                var tpl = JSON.parse(json);
                me.chart.tpl = tpl;
                //需要克隆一份模板信息
                me.tpl = me.clone(tpl);
                //解析数据集
                var mapping = null;
                me.tpl.seriesMapping.forEach(function(item){
                    if(item.seriesName ===params.name ){
                        mapping = item;
                    }
                })
                if(mapping){
                    mapping.nameText = params.nameText || params.name;
                    mapping.num = params.seriesIndex;
                    mapping.type = params.subType,
                    mapping.params = params.params||{};
                    if(params.wellType){
                        mapping.wellType = params.wellType;
                    }
                    if(params.traceType){
                        mapping.traceType = params.traceType;
                    }
                    if(params.indexs){
                        mapping.indexs = params.indexs;
                    }
                   
                    me._getData(mapping,function(tplData){
                        callback(tplData)
                    })
                }
                
            },function(mgs){
                console.warn(mgs)
            })
        }
    },
  /**
  *@desc 数据访问服务返回数据解析
  *@param {url} string url相对地址
  *@param {mapping} object 数据集映射关系
  *@param {dsopts} object 当前数据集的配置信息
  *@param {callbak} function 回调函数
  */
    _parseDasData: function (url, mapping, dsopts, callbak) {
        var me = this;

        // 数据访问服务的数据
        var param = me.getDsParams(dsopts.params, me.option.params, mapping.params); //查询参数
        var daraFields = mapping.fields;
        var geoScope = null;
        var tplData = null;
        //根据path，host获取数据

        if ((hwchart.configs && hwchart.configs.enableStaticData)) {
            var _url = hwchartsPATH + 'data/' + mapping.type + '.json';

            dhx.ajax.get(_url, function (data) {
                var xmlDoc = data.xmlDoc;
                if (xmlDoc.status == '200') {
                    var res = JSON.parse(xmlDoc.responseText);
                    parseData(res);
                }

            })
        } else {
            me.hwDao.get(url, {}, param, function (res) {
            if(me.option.isSelfData){
                if (callbak) {
                    callbak({
                        tpl: me.tpl,
                        option:me.option,
                        seriesIndex: mapping.seriesIndex,
                        data: res
                    })
                }
            }else{
                parseData(res)
            }
            }, function (res) { alert(res); });
        }

        //闭包私有函数
        function parseData(res) {
            if (res.isSucceed) {
                if (res.data.length === 0) {
                    return;
                }
                var oriData = res.data[0].datas;
                if (mapping.type === 'miningIndex') {
                    me.chart.miningIndexCofig = mapping.indexs;
                    var config = me.chart.miningIndexCofig;
                    config.symbol = mapping.wellType;
                    //var tplFields = me.getTplFields(mapping);
                    if(mapping.wellType == '21'){
                        tplData = me.parseColumnIndexData(config, oriData,daraFields);
                    }else if(mapping.wellType == '31'){
                        tplData = me.parseMiningIndexData(config, oriData,daraFields);
                    }else if(mapping.wellType == '11'){
                        tplData = me.parseWaterMiningIndexData(config, oriData,daraFields);
                    }                    
                    
                    if (callbak) {
                        callbak({
                            tpl: me.tpl,
                            seriesIndex: mapping.seriesIndex,
                            data: tplData,
                            geoScope: geoScope
                        })
                    }
                } else {
                    // 遍历模板中的数据seriesmaping映射数据
                    var parseData = [];
                    // 获取对应模板字段
                    var tplFields = me.getTplFields(mapping);
                    
                    if (daraFields.length != tplFields.length) {
                        alert(mapping.seriesName + '字段名与数据字段名不一致');
                        return;
                    }
                    for (var i = 0; i < oriData.length; i++) {
                        // 字段映射处理
                        var objs = {};
                        for (var j = 0; j < daraFields.length; j++) {
                            if (daraFields[j]) {
                                objs[tplFields[j]] = oriData[i][daraFields[j]]
                            }
                        }
                        parseData.push(objs);
                    }
                    var result = me.getTplData(mapping, parseData);
                    if (result.data) {
                        tplData = result.data;
                        if (result.xMax && result.yMax && result.xMin && result.yMin) {
                            geoScope = {
                                xMax: result.xMax,
                                yMax: result.yMax,
                                xMin: result.xMin,
                                yMin: result.yMin
                            }
                        }
                    } else {
                        tplData = result;
                    }
                    if (callbak) {
                        callbak({
                            tpl: me.tpl,
                            seriesIndex: mapping.seriesIndex,
                            data: tplData,
                            geoScope: geoScope
                        })
                    }
                }
            } else {
                alert(res.errMsg);
            }
        }
    },
    /**
   *@desc 图形算法微服务返回数据解析
   *@param {url} string url相对地址
   *@param {mapping} object 数据集映射关系
   *@param {dsopts} object 当前数据集的配置信息
   *@param {callbak} function 回调函数
   */
    _parseGeologyAlgorithmServData: function (url, mapping, dsopts, callbak) {
        var me = this;
        if (hwchart.configs && hwchart.configs.enableStaticData) {
            var _url = hwchartsPATH + 'data/' + url.replace(/\//g, '-') + '.json';

            dhx.ajax.get(_url, function (data) {
                var xmlDoc = data.xmlDoc;
                if (xmlDoc.status == '200') {
                    var res = JSON.parse(xmlDoc.responseText);
                    parseData(res);
                }

            })
        } else {
            var dataSend = JSON.stringify(mapping.params);
            hwDas.ajax({
                // url: "http://192.168.1.186:5015/GeologyAlgorithm/ISOAlgorithm/isoline",
                url: 'http://' + me.option.GeologyAlgorithmHost + '/' + url,
                type: 'post',
                params: {},
                contentType: 'application/json;charset=UTF-8',
                data: dataSend,
                success: function (res) {
                    parseData(res);
                },
                error: function (msg) {
                    console.log(msg)
                }
            })
        }

        function parseData(res) {
            if (res.result) {
                var data = res.data;
                if (data.constructor == Array) {
                    var result = res.data;
                } else {
                    var result = JSON.parse(res.data);
                }
                //console.log(result)
                if (result.data) {
                    tplData = result.data;
                    if (result.xMax && result.yMax && result.xMin && result.yMin) {
                        geoScope = {
                            xMax: result.xMax,
                            yMax: result.yMax,
                            xMin: result.xMin,
                            yMin: result.yMin
                        }
                    }
                } else {
                    tplData = result
                }
                if (callbak) {
                    callbak({
                        tpl: me.tpl,
                        seriesIndex: mapping.seriesIndex,
                        data: tplData,
                        geoScope: geoScope
                    })
                }
            } else {
                console.warn(res.data)
            }
        }


    },
    /**
  *@desc 数据解析微服务返回数据解析
  *@param {url} string url相对地址
  *@param {mapping} object 数据集映射关系
  *@param {dsopts} object 当前数据集的配置信息
  *@param {callbak} function 回调函数
  */
    _parseDataParseServData: function (url, mapping, dsopts, callbak) {
        var me = this;
        if (hwchart.configs && hwchart.configs.enableStaticData) {
            var _url = hwchartsPATH + 'data/' + url.replace(/\//g, '-') + '.json';

            dhx.ajax.get(_url, function (data) {
                var xmlDoc = data.xmlDoc;
                if (xmlDoc.status == '200') {
                    var res = JSON.parse(xmlDoc.responseText);
                    parseData(res);
                }

            })
        } else {
            var dataSend = me.getDsParams(dsopts.params, me.option.params, mapping.params); //查询参数
            hwDas.ajax({
                // url: "http://192.168.1.186:5015/GeologyAlgorithm/ISOAlgorithm/isoline",
                url: 'http://' + me.option.DataParserHost + '/' + url,
                type: 'post',
                params: {},
                contentType: 'application/json;charset=UTF-8',
                data: dataSend,
                success: function (res) {
                    parseData(res);
                },
                error: function (msg) {
                    console.log(msg)
                }
            })
        }

        function parseData(res) {
            if (res.result) {
                var data = res.data;
                if (data.constructor == Array) {
                    var result = res.data;
                } else {
                    var result = JSON.parse(res.data);
                }
                //console.log(result)
                if (result.data) {
                    tplData = result.data;
                } else {
                    tplData = result
                }
                if (callbak) {
                    callbak({
                        tpl: me.tpl,
                        seriesIndex: mapping.seriesIndex,
                        data: tplData
                    })
                }
            } else {
                console.log(res.data)
            }
        }


    },
    
     /**
    *@desc 根据数据集的配置进行解析
    *@param {object} mapping 数据集映射信息
    *@param {function} callback 回调函数
    */
    _getData: function (mapping, callbak) {
        var me = this;
        //得到当前数据集的配置
        var dsopts = me.tpl.dataset[mapping.source];
        if(!dsopts){
            alert(mapping.nameText +'数据未配置')
            return;
        }
        var dataType = dsopts.type;
        //解析参数
        var url = dsopts.url;//服务相对路径
        // var dataType = mapping.dataType;
        // var url = mapping.url
        if(dataType === 0){
            // 数据访问服务的数据
            me._parseDasData(url, mapping, dsopts, callbak);

        }else if(dataType === 1){
            // 图形算法服务
            me._parseGeologyAlgorithmServData(url, mapping, dsopts, callbak);
        }else if(dataType === 2){
            // 数据解析服务
            me._parseDataParseServData(url, mapping, dsopts, callbak);
        }
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
            if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
                var json = request.responseText;
                success(json)
            }else{
                var mgs = request.status+":"+request.responseText
                error(mgs)
            }
        }
    },
    /**
    *@desc 获取对应模板字段
    *@param {string} mapping 数据映射
    */
    getTplFields:function(mapping){
        var me = this;
        if(mapping.type === 'wellSymbol'){
            return ['id','name','symbol','coorX','coorY']
        }if(mapping.type === 'wellTrace'&& mapping.traceType =='1'){
            return ["id","jk_x","jk_y","jd_x","jd_y","a_x","a_y","b_x","b_y"];
        }else if(mapping.type === "wellLabel"){
            return ['id','value'];
        }else if(mapping.type === "wellGroup"){
            return ['groupId','name','wellId'];
        }else if(mapping.type === 'faultLine'){
            return ["faultId","name", "faultType","wallId","wallType","x","y"]
        }else if(mapping.type === 'miningIndex' && mapping.wellType =='11'){
            return ["id","lcq","lcs","lcy","rcy","rcs","rcq","hs"]
        }else if(mapping.type === 'miningIndex' && mapping.wellType =='31'){
            return ["id","lzs","rzs"]
        }else if(mapping.type === 'area'){
            return  ["id","name","x","y"]
        }else if(mapping.type === 'isoLine'){
            return  ["id","value","x","y","maxx","minx","maxy","miny"]
        }else if(mapping.type === 'symbolLine'){
            return  ["id","x","y","maxx","minx","maxy","miny"]
        }else{
            return []
        }
    },
    /**
    *@desc 获取对应模板需要的数据
    *@param {string} mapping 数据映射
    *@param {object} data 需要解析的数据
    */
    getTplData:function(mapping,data){
        var me = this;
        if(mapping.type === 'wellSymbol'){
            return me.parsewellSymbol(data)
        }else if(mapping.type === 'wellTrace'){
            return me.parseTraceData(data)
        }if(mapping.type === 'wellGroup'){
            return me.parsewellGroupData(data)
        }else if(mapping.type === 'faultLine'){
            return me.parsefaultLineData(data)
        }else if(mapping.type === 'area'){
            return  me.parseAreaData(data)
        }else if(mapping.type === 'isoLine'){
            return  me.parseIsoLineData(data)
        }else if(mapping.type === 'symbolLine'){
            return  me.parseSymbolLineData(data)
        }else{
            return data;
        }
    },
    /**
    *@desc symbolLine数据解析
    *@param {Object} data 需要解析的数据
    */
    parseSymbolLineData:function(data){
        var me = this;
        var obj = {data:[]};
        if(data.constructor == Array&&data.length>0){
            obj.xMax = data[0].maxx;
            obj.xMin = data[0].minx;
            obj.yMax = data[0].maxy;
            obj.yMin = data[0].minx;
            var values = {};
            data.forEach(function(item){
                if(values[item.id] == undefined || values[item.id] == null){
                    values[item.id] = {
                        id :item.id,
                        baseX:'0.000000',
                        baseY :'0.000000',
                        coords:[[item.x,item.y]]
                    }
                }else{
                    values[item.id].coords.push([item.x,item.y])
                }
            })
            me.each(values,function(v,k){
                obj.data.push(v)
            })
            return obj;
        }else{
            return [];
        }
    },
    /**
    *@desc isoLine数据解析
    *@param {Object} data 需要解析的数据
    */
    parseIsoLineData:function(data){
        var me = this;
        var obj = {data:[]};
        if(data.constructor == Array&&data.length>0){
            obj.xMax = data[0].maxx;
            obj.xMin = data[0].minx;
            obj.yMax = data[0].maxy;
            obj.yMin = data[0].minx;
            var values = {};
            data.forEach(function(item){
                if(values[item.id] == undefined || values[item.id] == null){
                    values[item.id] = {
                        id :item.id,
                        value :item.value || '',
                        type:'0',
                        baseX:'0.000000',
                        baseY :'0.000000',
                        coords:[[item.x,item.y]]
                    }
                }else{
                    values[item.id].coords.push([item.x,item.y])
                }
            })
            me.each(values,function(v,k){
                obj.data.push(v)
            })
            return obj;
        }else{
            return [];
        }
    },
    /**
    *@desc area数据解析
    *@param {Object} data 需要解析的数据
    */
    parseAreaData:function(data){
        var me = this;
        var objs = {data:[]};
        if(data.constructor == Array&&data.length>0){
            objs.xMax = data[0].maxx;
            objs.xMin = data[0].minx;
            objs.yMax = data[0].maxy;
            objs.yMin = data[0].minx;
            var obj = {};
            data.forEach(function(item){
                if(obj[item.id] == undefined || obj[item.id] == null){
                    obj[item.id] = {
                        name:item.name,
                        id:item.id,
                        coords:[[item.x,item.y]],
                    }
                }else{
                    obj[item.id].coords.push([item.x,item.y])
                }
            });
            me.each(obj,function(v,k){
                objs.data.push(v)
            })
            return objs;
        }else{
            return []
        }
    },
    /**
    *@desc wellSymbol数据格式转换
    *@param {Object} data 需要解析的数据
    */
    parsewellSymbol:function(data){
        var me = this;
        if(data.constructor == Object){
            var obj = {};
            me.each(data,function(v,k){
                if(k!='coorX' &&k!='coorY'){
                    obj[k] = v;
                }
            })
            if(data.coorX &&data.coorY){
                obj.value = [data.coorX,data.coorY];
            }
            return obj;
        }else if(data.constructor == Array){
            var arr= [];
            data.forEach(function(item){
                var obj = {};
                me.each(item,function(v,k){ 
                    if(k!='coorX' &&k!='coorY'){
                        obj[k] = v;
                    }
                })
                if(item.coorX &&item.coorY){
                    obj.value = [item.coorX,item.coorY];
                }
                arr.push(obj)
            });
            return arr;
        }else{
            return null
        }
    },
    /**
    *@desc 井轨迹数据格式转换
    *@param {Object} data 需要解析的数据
    */
    parseTraceData:function(data){
        var me = this;
        if(data.constructor == Array){
            var arr= [];
            var obj = {};
            data.forEach(function(item){
                if(obj[item.id] == undefined || obj[item.id] == null){
                    obj[item.id] = {
                        id:item.id,
                        coords:[],
                    }
                    if(item.jk_x&&item.jk_y){
                        obj[item.id].jk = [item.jk_x,item.jk_y];
                        obj[item.id].coords.push([item.jk_x,item.jk_y]) 
                    }
                    if(item.a_x&&item.a_y){
                        obj[item.id].a = [item.a_x,item.a_y];
                        obj[item.id].coords.push([item.a_x,item.a_y]) 
                    }
                    if(item.b_x&&item.b_y){
                        obj[item.id].b = [item.b_x,item.b_y];
                        obj[item.id].coords.push([item.b_x,item.b_y]) 
                    }
                    if(item.jd_x&&item.jd_y){
                        obj[item.id].jd = [item.jd_x,item.jd_y]
                    }
                    if(item.x&&item.y){
                        obj[item.id].coords.push([item.x,item.y]) 
                    }
                }else{
                    if(item.x&&item.y){
                        obj[item.id].coords.push([item.x,item.y]) 
                    }
                }
            });
            me.each(obj,function(v,k){
                if(v.jd){
                    v.coords.push(v.jd)
                }
                if((v.a&&v.coords.length>2) || (!v.a && !v.b && v.coords.length>2)){
                    arr.push(v)
                }
            })
            return arr;
        }else{
            return null
        }
    },
    /**
    *@desc 井组数据格式转换
    *@param {Object} data 需要解析的数据
    */
    parsewellGroupData:function(data){
        var me = this;
       if(data.constructor == Array){
            var arr= [];
            var obj = {};
            data.forEach(function(item){
                if(obj[item.groupId] == undefined || obj[item.groupId] == null){
                    obj[item.groupId] = {
                        name:item.name,
                        id:item.groupId,
                        type:0,
                        wells:[item.wellId],
                    }
                }else{
                    obj[item.groupId].wells.push(item.wellId)
                }
            });
            me.each(obj,function(v,k){
                arr.push(v)
            })
            return arr;
        }else{
            return null
        }
    },
     /**
    *@desc 断层数据格式转换
    *@param {Object} data 需要解析的数据
    */
    parsefaultLineData:function(data){
        var me = this;
        if(data.constructor == Array){
             var arr= [];
             var obj = {};
             data.forEach(function(item){
                 var a = item.faultId.toString();
                 var b = item.wallId.toString();
                 var c = item.wallType.toString();
                 if(obj[a+b+c] == undefined || obj[a+b+c] == null){
                     obj[a+b+c] = {
                        id:a+'_'+b+"_"+c,
                        name:item.name || '',
                        faultId:item.faultId,
                        faultType:item.faultType,
                        wallId:item.wallId,
                        wallType:item.wallType,
                        coords:[[item.x,item.y]],
                     }
                 }else{
                     obj[a+b+c].coords.push([item.x,item.y])
                 }
             });
             me.each(obj,function(v,k){
                arr.push(v)
             })
             //console.log(arr)
             return arr;
         }else{
             return null
         }
    },
     /**
    *@desc 油井开采指标数据格式转换
    *@param {Object} data 需要解析的数据
    */
   parseMiningIndexData:function(config, data,fields){
    var me = this;
    if(data.constructor == Array){
        var arr= [];
        var maxRcy = null,
            minRcy = null,
            maxRcs = null,
            minRcs = null,
            maxRcq = null,
            minRcq = null,
            maxlcz = null,
            minLcz = null;
        data.forEach(function(item,index){
            var obj = {
                id:item[fields[0]],
                symbol:config.symbol,
                cloumnWidth:config.cloumnWidth,
                value:[],
                name:[],
                color:[],
                company:[],
                shortName:[],
                fields:[],
                isShow:[],
                labelIsShow:[],
                nameIsShow:[],
                companyIsShow:[],
                minHr:[],
                maxHr:[],
                describe:['lcy','lcs','lcq','rcy','rcs','rcq'],
            };
            for(var i = 0;i<config.length;i++){
                if(i<6){
                    var v  = config[i];
                    obj.value.push(item[v.field]);
                    obj.name.push(v.name);
                    obj.color.push(v.color);
                    obj.company.push(v.company)
                    obj.shortName.push(v.shortName)
                    obj.maxHr.push(v.maxHr ||70)
                    obj.minHr.push(v.minHr||2)
                    obj.isShow.push(v.show)
                    obj.labelIsShow.push(v.labelIsShow)
                    obj.nameIsShow.push(v.nameIsShow)
                    obj.companyIsShow.push(v.companyIsShow)
                    obj.fields.push(v.field)
                    obj.lcz = parseFloat(item[config[0].field]||0) +parseFloat(item[config[1].field]||0)+parseFloat(item[config[2].field]||0)
                    if(i===3&& (maxRcy===undefined || maxRcy <= item[v.field])){
                        maxRcy = item[v.field]
                    }
                    if(i===3&& (minRcy===undefined || minRcy >= item[v.field])){
                        minRcy = item[v.field]
                    }
                    if(i===4&& (maxRcs===undefined || maxRcs <= item[v.field])){
                        maxRcs = item[v.field]
                    }
                    if(i===4&& (item.minRcs===undefined || minRcs >= item[v.field])){
                        minRcs = item[v.field]
                    }
                    if(i===5&& (maxRcq===undefined || maxRcq <= item[v.field])){
                        maxRcq = item[v.field]
                    }
                    if(i===5&& (minRcq==undefined || minRcq >= item[v.field])){
                        minRcq = item[v.field]
                    }
                    if(i===3&& (maxRcy===undefined || maxRcy <= item[v.field])){
                        maxRcy = item[v.field]
                    }
                    if(i===3&& (maxRcy===undefined || maxRcy <= item[v.field])){
                        maxRcy = item[v.field]
                    }
                    if(maxlcz===undefined || maxlcz <= obj.lcz){
                        maxlcz = obj.lcz
                    }
                    if(minLcz===undefined || minLcz >= obj.lcz){
                        minLcz = obj.lcz
                    }
                }
            }
            arr.push(obj);
        })
        
        arr.forEach(function(item){
            //item.lcz = parseFloat(item.value[0]||0) +parseFloat(item.value[1]||0)+parseFloat(item.value[2]||0)
            item.maxRcy = maxRcy,
            item.minRcy = minRcy,
            item.maxRcs = maxRcs,
            item.minRcs = minRcs,
            item.maxRcq = maxRcq,
            item.minRcq = minRcq,
            item.maxlcz = maxlcz,
            item.minLcz = minLcz;
        })
        
        return arr;
     }else{
         return null
     }
    },
     /**
    *@desc 水井开采指标数据格式转换
    *@param {Object} data 需要解析的数据
    */
    parseWaterMiningIndexData:function(data){
        var me = this;
        if(data.constructor == Array){
            var maxRzs = null,
                minRzs = null,
                maxlzs = null,
                minLzs = null;
            data.forEach(function(item){
                if(maxRzs===null || maxRzs <= item.rzs){
                    maxRzs = item.rzs
                }
                if(minRzs===null || minRzs >= item.rzs){
                    minRzs = item.rzs
                }
                if(maxlzs===null || maxlzs <= item.lzs){
                    maxlzs = item.lzs
                }
                if(minLzs===null || minLzs >= item.lzs){
                    minLzs = item.lzs
                }
            })
            var arr= [];
            data.forEach(function(item){
                var obj = {
                    id:item.id,
                    value:[],
                    describe:[],
                };
                if(item.lzs!=undefined && item.lzs!=null && item.lzs!=''){
                    obj.value.push(item.lzs);
                    obj.describe.push('lzs');
                    obj.maxlzs = maxlzs;
                    obj.minLzs = minLzs;
                }
                if(item.rzs!=undefined && item.rzs!=null && item.rzs!=''){
                    obj.value.push(item.rzs);
                    obj.describe.push('rzs');
                    obj.maxRzs = maxRzs;
                    obj.minRzs = minRzs;
                }
                obj.symbol = '31';
                arr.push(obj);
            });
            return arr;
        }else{
            return null
        }
    },
     /**
    *@desc 柱形开采指标数据格式转换
    *@param {Object} config 数据的字段描述文件
    *@param {Object} data 需要解析的数据
    */
    parseColumnIndexData:function(config,data,fields){
        var me = this;
        if(data.constructor == Array){
            var arr= [];
            data.forEach(function(item){
                var obj = {
                    id:item[fields[0]],
                    symbol:config.symbol,
                    cloumnWidth:config.cloumnWidth,
                    value:[],
                    name:[],
                    color:[],
                    company:[],
                    shortName:[],
                    fields:[],
                    max:[],
                    min:[],
                    isShow:[],
                    labelIsShow:[],
                    nameIsShow:[],
                    companyIsShow:[],
                    minHr:[],
                    maxHr:[]
                };
                for(var i = 0;i<config.length;i++){
                    var v  = config[i];
                    obj.value.push(item[v.field]);
                    obj.name.push(v.name);
                    obj.color.push(v.color);
                    obj.company.push(v.company)
                    obj.shortName.push(v.shortName)

                    obj.max.push(v.max ||undefined)
                    obj.min.push(v.min||undefined)
                    obj.maxHr.push(v.maxHr ||70)
                    obj.minHr.push(v.minHr||2)
                    obj.isShow.push(v.show)
                    obj.labelIsShow.push(v.labelIsShow)
                    obj.nameIsShow.push(v.nameIsShow)
                    obj.companyIsShow.push(v.companyIsShow)
                    obj.fields.push(v.field)
                }
                arr.push(obj);
            })
            var maxData = [],minData = [];
            arr.forEach(function(item){
                var value = item.value;
                // console.log(value)
                for(var j = 0;j<value.length;j++){
                    if( value[j] && (!maxData[j] || maxData[j] < value[j])){
                        maxData[j] = value[j]
                    }
                    if( value[j] && (!minData[j] || minData[j] > value[j])){
                        minData[j] = value[j]
                    }
                }
            })
            arr.forEach(function(item){
                item.maxData = maxData;
                item.minData = minData;
                var max = item.max;
                var min = item.min;
                for(var j = 0;j<max.length;j++){
                   if(max[j]==undefined){
                    max[j] = isNaN(Math.round(maxData[j]*(1-0.1)))?'':Math.floor(maxData[j]*(1-0.1))
                   }
                   if(min[j]==undefined){
                    min[j] = isNaN(Math.round(minData[j]*(1+0.1)))?'':Math.ceil(minData[j]*(1+0.1))
                   }
                   if(min[j]>=max[j]){
                    max[j] = isNaN(Math.round(maxData[j]))?'':Math.floor(maxData[j])
                    min[j] = isNaN(Math.round(minData[j]))?'':Math.ceil(minData[j])
                   }
                }
            })
            //console.log(arr)
            return arr;
        }else{
            return null
        }
    },
     /**
    *@desc 参数处理
    *@param {Object} params  模板中数据集中的参数
    *@param {Object} params1 外部传进来的参数
    *@param {Object} params1 组件内部传进来的参数
    */
    getDsParams:function(params,params1,params2){
        var me = this;
        var allParamd = {};
        me.each(params,function(v,k){
            allParamd[k] = v;
        })
        me.each(params1,function(v,k){
            allParamd[k] = v;
        })
        me.each(params2,function(v,k){
            allParamd[k] = v;
        })
        return allParamd;
    },

})