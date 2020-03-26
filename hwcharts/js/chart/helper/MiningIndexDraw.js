Vmd.define('hwchart.chart.helper.MiningIndexDraw', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.config.miningIndexMap',
        'hwchart.chart.helper.ComposeSymbol',
        'hwchart.util.indexDataStorage',
        //'hwchart.chart.helper.ComposeIndex',
        'hwchart.chart.helper.WellManager'
    ]
}, function () {
    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
    var WellManager = hwchart.chart.helper.WellManager;
    var miningIndexMap = hwchart.config.miningIndexMap;
    var ComposeSymbol = hwchart.chart.helper.ComposeSymbol;
    var indexDataStorage = hwchart.util.indexDataStorage;
    //var ComposeIndex = hwchart.chart.helper.ComposeIndex;
    var isincrementalRender = 0;
    var wellDrawFinished = false;
    /**
     * @constructor
     * @alias module:echarts/chart/helper/SymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function MiningIndexDraw(ecModel, api, view) {
        var self = this;
        this.group = new graphic.Group();
        this._symbolCtor = ComposeSymbol;
        // 选中状态相关
        this.selectIndexs = [];
        this.selectSubIndexs = [];
        api.on('click', function(e){
            if(!self._data){
                return
            }
            var seriesModel = self._data.hostModel;
            var allowSelect = seriesModel.get('allowSelect');
            if(allowSelect === false){
                return;
            }
            var seriesType = e.seriesType;
            var target = e.event.target;
            var event = e.event.event;
            if(seriesType == "miningIndex"){
                target = target._tag == 'name' ? target : target.parent.parent;
            }
            var targetSeriesIndex = target.parent.seriesIndex;
            if(e.componentType == "series" && targetSeriesIndex === seriesModel.seriesIndex){
                //已经被选中
                var dataIndex = target.parent.dataIndex;
                if(zrUtil.indexOf(self.selectIndexs, dataIndex) != -1){
                    self._clearSelect(
                        zrUtil.filter(self.selectIndexs, function(item){
                            return item != dataIndex;
                        })
                    );
                    if(zrUtil.indexOf(self.selectSubIndexs, dataIndex) == -1){
                        self.selectSubIndexs.push(dataIndex);
                    };
                    self._selectSub(e.event.target);
                    return;
                }
                self._clearSelect(event.ctrlKey ? self.selectSubIndexs : null);
                self.selectSubIndexs = [];
                self._createSelect(dataIndex);
            }
            else{
                self._clearSelect();
            }
        })

        api.on('brushSelected', function (params) {
            if(!self._data){
                return
            }
            var seriesModel = self._data.hostModel;
            var allowSelect = seriesModel.get('allowSelect');
            if(allowSelect === false){
                return;
            }
            var selectedSeries = params.batch[0].selected;
            var selectedWell = zrUtil.filter(selectedSeries, function(item){
                return item.seriesId == seriesModel.id;
            });
            var selectIndexs = (selectedWell && selectedWell[0] && selectedWell[0].dataIndex) || [];

            self._clearSelect();
            zrUtil.each(selectIndexs, function(idx){
                self._createSelect(idx);
            });
        });
        api.on('incrementalRenderFinished',function(params) {
            if(isincrementalRender === 0){
                view._finished = false;
                view.renderTask._dirty = true;
                view.renderTask.perform({
                    step: view.seriesModel.getProgressive()
                });
                wellDrawFinished = true;
                isincrementalRender++;
            }
        });
    }

    var miningIndexDrawProto = MiningIndexDraw.prototype;

    // 选中状态
    miningIndexDrawProto._createSelect = function (idx) {
        var data = this._data;
        var group = data.getItemGraphicEl(idx);

        var selectEl = creatSelectShape(group.getBoundingRect());
        group._selected = true;
        group.add(selectEl);
        this.selectIndexs.push(idx);
    }
    miningIndexDrawProto.getGroup = function (ecModel) {
        return WellManager.getGroup(ecModel);
    };
    miningIndexDrawProto._selectSub = function (el) {
        var group = el.parent;
        var selectBorder = zrUtil.filter(group._children, function(item){
            return item._tag == 'select'
        })[0];
        if(selectBorder){
            var shape = el.getBoundingRect();
            if(el._tag == 'label' || el._tag == 'name'){
                shape.y = -1;
            }
            else if(el._tag == 'symbol'){
                shape.x *= el.scale[0];
                shape.y *= el.scale[1];
                shape.width *= el.scale[0];
                shape.height *= el.scale[1];
            }
            var aniObj = {
                shape: shape
            }
            if(el._position){
                aniObj.position = el._position;
            }
            selectBorder.animateTo(aniObj, 500, 'cubicOut');
        }
    }
    // 清除选中状态
    miningIndexDrawProto._clearSelect = function (clearIndexs) {
        var self = this;
        var data = this._data;
        clearIndexs = clearIndexs || this.selectIndexs.concat();
        zrUtil.each(clearIndexs, function(idx){
            var group = data.getItemGraphicEl(idx);
            zrUtil.each(group._children, function(item){
                if(item._tag == 'select'){
                    group.remove(item);
                }
            });
            self.selectIndexs.remove(idx);
        });
    }
    // 绘制选中框
    function creatSelectShape(shape){
        var padding = 8;
        var lineWidth = 1;

        var selectEl = new zrender.Rect({
            shape: {
                x: shape.x - padding / 2,
                y: shape.y - padding / 2,
                width: shape.width + padding,
                height: shape.height + padding
            },
            style:{
                fill:'none',
                stroke: 'black',
                lineWidth: lineWidth,
                lineDash: [lineWidth * 4, lineWidth * 4]
            },
            z: 4
        });
        selectEl.animateStyle(true)
            .when(1000, {
                lineDashOffset: lineWidth * 8
            })
            .delay(100)
            .start();
        selectEl._tag = 'select';
        return selectEl;
    }

    /**
     * Update symbols draw by new data
     * @param {module:echarts/data/List} data
     * @param {Array.<boolean>} [isIgnore]
     */
    miningIndexDrawProto.updateData = function (ecModel, data, isIgnore) {
        var self = this;

        var group = self.group;
        
        var seriesModel = data.hostModel;
        var oldData = this._data;
        if(seriesModel){
            var dataChange = seriesModel.option.dataChanged;
            var ecModel = seriesModel.ecModel;
            var scale = seriesModel.get('scale');
            var geo = ecModel.getComponent('geo');
            var zoom = geo.coordinateSystem._zoom;
            var zoomScale = !isNaN(scale) ? Math.min(scale * zoom, 1) : 1;
            var position = seriesModel.get('position')
            var isShow = seriesModel.get('show')
        }
        var _hasUpdate = false;
        
        
        data.diff(oldData)
            .add(function (newIdx) {
                if (WellManager.checkSymbolShow(data, newIdx)&&isShow) {
                   
                    var indexEl = self._drawEl(data, newIdx);
                   
                    indexEl.attr('z', 9);
                    indexEl.attr('scale', [zoomScale,zoomScale]);
                    
                    data.setItemGraphicEl(newIdx, indexEl);

                    var point = WellManager.getWellLayout(data,newIdx);
                    var id = data.getId(newIdx);
                    if(point){
                        var itemLayout = WellManager.getLayoutPosition(data,newIdx, indexEl, point, position, 0, [-20,50], zoomScale);
                        indexEl.attr('position', itemLayout);
                        group.add(indexEl);
                    }
                }
                _hasUpdate = true;
            })
            .update(function (newIdx, oldIdx) {

                var indexEl = oldData.getItemGraphicEl(oldIdx);

                if (!WellManager.checkSymbolShow(data,newIdx) || !isShow) {
                    group.remove(indexEl);
                    return;
                }
                if (!indexEl) {
                    var indexEl = self._drawEl(data, newIdx);
                    
                    indexEl.attr('z', 9);
                    indexEl.attr('scale', [zoomScale,zoomScale]);
                    data.setItemGraphicEl(newIdx, indexEl);

                    data.setItemGraphicEl(newIdx, indexEl);
                    //console.log(indexEl)
                    var point = WellManager.getWellLayout(data,newIdx);
                    var id = data.getId(newIdx);
                    if(point){
                        var itemLayout = WellManager.getLayoutPosition(data,newIdx, indexEl, point, position, 0, [-20,50], zoomScale);
                        indexEl.attr('position', itemLayout);
                        group.add(indexEl);
                    }
                }else{
                    indexEl._state = '';
                    if(dataChange || indexEl._children.length==0){
                        group.remove(indexEl);
                        indexEl = self._drawEl(data, newIdx,true);
                        indexEl.attr('z', 9);
                    }

                    indexEl.attr('scale', [zoomScale,zoomScale]);
                    var point = WellManager.getWellLayout(data,newIdx);
                    var id = data.getId(newIdx);
                    if(point){
                        var itemLayout = WellManager.getLayoutPosition(data,newIdx, indexEl, point, position, 0, [-20,50], zoomScale);
                        indexEl.attr('position', itemLayout);
                        group.add(indexEl);
                    }
                }
                
                data.setItemGraphicEl(newIdx, indexEl);
                _hasUpdate = true;
            })
            .remove(function (oldIdx) {
                var el = oldData.getItemGraphicEl(oldIdx);
                var wellData = self.getWellDatas(oldData, oldIdx);
                if(el && el.fadeOut){
                    el.fadeOut(function () {
                        el._state = 'delete';
                        self._deleteFromWell(wellData, el);
                    });
                }
                _hasUpdate = true;
            })
            .execute();

        this._data = data;
        return _hasUpdate;
    };
    miningIndexDrawProto.incrementalPrepareUpdate = function (data) {
        this._seriesScope = makeSeriesScope(data);
        this._data = null;
        this.group.removeAll();
        wellDrawFinished = false;
    };

    miningIndexDrawProto.incrementalUpdate = function (taskParams, data) {
        if(!wellDrawFinished){
            return false;
        }
        var self = this;
        var group = self.group;
        //opt = normalizeUpdateOpt(opt);

        function updateIncrementalAndHover(el) {
            if (!el.isGroup) {
                el.incremental = el.useHoverLayer = true;
            }
        }
        
        var seriesModel = data.hostModel;
       
        var ecModel = seriesModel.ecModel;
        var scale = seriesModel.get('scale');
        var geo = ecModel.getComponent('geo');
        var zoom = geo.coordinateSystem._zoom;
        var zoomScale = !isNaN(scale) ? Math.min(scale * zoom, 1) : 1;
        var position = seriesModel.get('position')
        var isShow = seriesModel.get('show')

        for (var idx = taskParams.start; idx < taskParams.end; idx++) {
            var indexEl = this._drawEl(data, idx);
            //var symbolSize = data.getItemVisual(idx, 'symbolSize');
            // //经过避让算法后需要显示井符号
            if (WellManager.checkSymbolShow(data,idx)&&isShow) {
                indexEl.attr('z', 9);
                indexEl.attr('scale', [zoomScale,zoomScale]);
                data.setItemGraphicEl(idx, indexEl);

                data.setItemGraphicEl(idx, indexEl);
                //console.log(indexEl)
                var point = WellManager.getWellLayout(data,idx);
               
                if(point){
                    var itemLayout = WellManager.getLayoutPosition(data,idx, indexEl, point, position, 0, [-20,50], zoomScale);
                    indexEl.attr('position', itemLayout);
                    group.add(indexEl);
                }
            }
        }
    };
   // 绘制符合符号
    miningIndexDrawProto._drawEl = function (data, idx,isChange) {
        var indexGroup = new graphic.Group();
       
        var seriesModel = data.hostModel;
        var ecModel = seriesModel.ecModel;
        //绘制开采指标符号
        var symbol = data.getItemVisual(idx, 'symbol')|| data.getRawDataItem(idx).symbol;;
        
        var symbolId = miningIndexMap[symbol];
        var symbolDesc = indexDataStorage.retrieveComposeIndex(symbolId);
        var symbolEl = null;
       // 根据符号类型以及数据绘制开采指标符号
      
        if(symbolId ==="columnIndex"){
            symbolDesc = this.creatColumnSymbol(data,idx,symbolId,isChange);
            symbolEl = new this._symbolCtor(symbolId,symbolDesc);
           
        }else if(symbolId ==="oilWellIndex"){ 
            symbolDesc = this.creatShapeSymbol(data,idx,symbolId,isChange);
            symbolEl = new this._symbolCtor(symbolId,symbolDesc);
            //symbolEl = new this.indexCtor(data,idx)

        }else if(symbolId ==="waterWellIndex"){
            //symbolEl = new this.indexCtor(data,idx)
            symbolDesc = this.creatShapeSymbol(data,idx,symbolId,isChange);
            symbolEl = new this._symbolCtor(symbolId,symbolDesc);
        }
        symbolEl.attr('z', 9);
        symbolEl._tag = 'symbol';
        indexGroup.add(symbolEl);

        indexGroup.attr('position', [0,0]);

        return indexGroup;
    }
     // 绘制柱形指标符号
     miningIndexDrawProto.creatColumnSymbol = function(data,idx,symbolId,isChange){
         
        var rawDataItem = data.getRawDataItem(idx);
        if(rawDataItem.ColumnSymbol && !isChange){
            return rawDataItem.ColumnSymbol
        }
        var seft = this;
        var seriesModel = data.hostModel;
        var allData = data._rawData._data;
        //console.log(allData)
        if(!seft.maxData){
            var maxData = [];
            allData.forEach(function(item){
                var value = item.value;
                for(var j = 0;j<value.length;j++){
                    if(!maxData[j] ||maxData[j]<value[j]){
                        maxData[j] = value[j]
                    }
                }
            })
            seft.maxData = maxData;
            //console.log(seft.maxData)
        }
        if(!seft.minData){
            var minData = [];
            allData.forEach(function(item){
                var value = item.value;
                for(var j = 0;j<value.length;j++){
                    if(!minData[j] || minData[j] > value[j]){
                        minData[j] = value[j]
                    }
                }
            })
            seft.minData = minData;
            //console.log(seft.maxData)
        }

        if(rawDataItem.value &&symbolId){
            var valueData = rawDataItem.value ||[];
            var colors = rawDataItem.color ||[];
            var names = rawDataItem.name ||[];
            var companys = rawDataItem.company ||[];
            var fields = rawDataItem.fields || [];
            var len = rawDataItem.value.length;
            var shortName = rawDataItem.shortName || [];

            // var labelFontSize = rawDataItem.labelFontSize || [];
            // var labelFontFamily = rawDataItem.labelFontFamily||[];
            // var labelFontStyle = rawDataItem.labelFontStyle||[];
            // var labelFontWeight = rawDataItem.labelFontWeight||[];
            // var labelFontColor = rawDataItem.labelFontColor||[];

            // var nameFontSize = rawDataItem.nameFontSize || [];
            // var nameFontFamily = rawDataItem.nameFontFamily||[];
            // var nameFontStyle = rawDataItem.nameFontStyle||[];
            // var nameFontWeight = rawDataItem.nameFontWeight||[];
            // var nameFontColor = rawDataItem.nameFontColor||[];

            var max = rawDataItem.max || [];
            var min = rawDataItem.min||[];
            var maxHr = rawDataItem.maxHr || [];
            var minHr = rawDataItem.minHr||[];
            
            var isShow =  rawDataItem.isShow||[];
            var labelIsShow =  rawDataItem.labelIsShow||[];
            var nameIsShow =  rawDataItem.nameIsShow||[];
            var companyIsShow = rawDataItem.companyIsShow||[];
            var n = 0;
            var W = rawDataItem.cloumnWidth ||15;
            var topH = 15;
            var bottomH = 15;
            var maxH;
            maxHr.forEach(function(item){
                if(maxH === undefined || maxH<item){
                    maxH = item;
                }
            })
            obj = {
                x:0,
                y:0,
                width:W*len+40,
                height:maxH+topH+bottomH,
                layers:[],
                style:{
                    stroke: '#000',
                    lineWidth: 2,
                }
            };
            valueData.forEach(function(item,i){
                if(isShow[i]===undefined || isShow[i] === null||isShow[i]===''){
                    isShow[i] = true;
                }
                if(labelIsShow[i]===undefined || labelIsShow[i] === null||labelIsShow[i]===''){
                    labelIsShow[i] = false;
                }
                if(nameIsShow[i]===undefined || nameIsShow[i] === null||nameIsShow[i]===''){
                    nameIsShow[i] = false;
                }
                if(companyIsShow[i]===undefined || companyIsShow[i] === null||companyIsShow[i]===''){
                    companyIsShow[i] = false;
                }
                if(item!=''){
                    if(isShow[i]){
                        var x = W*n+20;
                        if(!max[i]){
                            max[i] = seft.maxData[i]
                        }
                        if(!min[i]){
                            min[i] = seft.minData[i]
                        }
                        if(item>max[i]){
                            item = max[i]
                        }
                        if(item<min[i]){
                            item = min[i]
                        }

                        var h = item/(max[i])*maxHr[i];
                        if(h<minHr[i]){
                            h = minHr[i]
                        }
                        var y =maxH-h+topH;
                        var lay1 = {  
                            type: 'rect',
                            name:fields[i],
                            style: {
                                fill: colors[i],
                            },
                            shape: {
                                x: x,
                                y: y,
                                width: W,
                                height: h,
                            }
                        }
                        obj.layers.push(lay1);
                        // 名称标注
                        if(nameIsShow[i]){
                            var lay2 = {  
                                type: 'text',
                                position:[x,maxH+topH],
                                style: {
                                    text:shortName[i]||names[i]||'',
                                    textFill:seriesModel.get('textStyle.color')||'#000',
                                    fontSize:seriesModel.get('textStyle.fontSize') ||9,
                                    fontFamily:seriesModel.get('textStyle.fontFamily')||'',
                                    fontStyle:seriesModel.get('textStyle.fontStyle')||'normal',
                                    fontWeight:seriesModel.get('textStyle.FontWeight')||'normal'
                                },
                            }
                            obj.layers.push(lay2);
                        }
                        // 数值标注
                        if(labelIsShow[i] ||companyIsShow[i] ){
                            var text = item;
                            if(companyIsShow[i]&&labelIsShow[i]){
                                text = item + companys[i] || ''
                            }else if(companyIsShow[i]){
                                text = companys[i] || ''
                            }else if(labelIsShow[i]){
                                text = item
                            }
                            var lay3 = {  
                                type: 'text',
                                position:[x,y-10],
                                style: {
                                    text:text,
                                    //text:item || '',
                                    textFill:seriesModel.get('textStyle.color')||'#000',
                                    fontSize:seriesModel.get('textStyle.fontSize') ||9,
                                    fontFamily:seriesModel.get('textStyle.fontFamily')||'',
                                    fontStyle:seriesModel.get('textStyle.fontStyle')||'normal',
                                    fontWeight:seriesModel.get('textStyle.FontWeight')||'normal'
                                    
                                },
                            }
                            obj.layers.push(lay3);
                        }
                       
                        n++;
                    }
                }
            });
            obj.width = n*W+20;
        }
        rawDataItem.ColumnSymbol = obj;
        return obj
    };
    // 绘制伞形开采指标
    miningIndexDrawProto.creatShapeSymbol = function(data,idx,symbolId,isChange){
        
        var type = 2;
        var rawDataItem = data.getRawDataItem(idx);
        //console.log(rawDataItem)
        if(rawDataItem.ColumnSymbol && !isChange){
            return rawDataItem.ColumnSymbol
        }
        var seft = this;
        var seriesModel = data.hostModel;
        var allData = data._rawData._data;

        if(!seft.maxData){
            var maxData = [];
            allData.forEach(function(item){
                var value = item.value;
                for(var j = 0;j<value.length;j++){
                    if(!maxData[j] ||maxData[j]<value[j]){
                        maxData[j] = value[j]
                    }
                }
            })
            seft.maxData = maxData;
            
        }
        if(!seft.minData){
            var minData = [];
            allData.forEach(function(item){
                var value = item.value;
                for(var j = 0;j<value.length;j++){
                    if(!minData[j] || minData[j] > value[j]){
                        minData[j] = value[j]
                    }
                }
            })
            seft.minData = minData;
            
        }
        //console.log(seft.minData)
        //console.log(seft.maxData)
        
        if(rawDataItem.value &&symbolId){

            var valueData = rawDataItem.value ||[];
            var describe = rawDataItem.describe;

            var colors = rawDataItem.color ||[];
            var names = rawDataItem.name ||[];
            var companys = rawDataItem.company ||[];
            var fields = rawDataItem.fields || [];
            var len = rawDataItem.value.length;
            var shortName = rawDataItem.shortName || [];

            var max = rawDataItem.max || [];
            var min = rawDataItem.min||[];
            var maxHr = rawDataItem.maxHr || [];
            var minHr = rawDataItem.minHr||[];
            
            var isShow =  rawDataItem.isShow||[];
            var labelIsShow =  rawDataItem.labelIsShow||[];
            var nameIsShow =  rawDataItem.nameIsShow||[];
            var companyIsShow = rawDataItem.companyIsShow||[];
           

            var r = rawDataItem.lcz/rawDataItem.maxlcz*(50-25)+25;
            var PI = Math.PI;
            var H = 100;
            var W = 5;
            var sp = 6;
            var cx = 50;
            var cy = 50;
            var n = 0;
            var waterR = null;
            var end1 = null,
                end2 = null;
            var oilsPos = null;
            if(!type){
                type = 2;
            }
            
            if(type === 1){
                oilsPos = (cx-r);
            }else if(type === 2){
                oilsPos = cx-(W/2+sp+W);
            }else if(type === 3){
                oilsPos = cx+r-3*W-2*sp;
            }else if(type === 4){
                oilsPos = cx-r-3*W-2*sp;
            }
                
            obj = {
                x:0,
                y:0,
                width:100,
                height:100,
                layers:[]
            };

            valueData.forEach(function(item,index){
                if(item!=''&&item!=undefined||item!=null){
                    if(isShow[i]===undefined || isShow[i] === null||isShow[i]===''){
                        isShow[i] = true;
                    }
                    if(labelIsShow[i]===undefined || labelIsShow[i] === null||labelIsShow[i]===''){
                        labelIsShow[i] = false;
                    }
                    if(nameIsShow[i]===undefined || nameIsShow[i] === null||nameIsShow[i]===''){
                        nameIsShow[i] = false;
                    }
                    if(companyIsShow[i]===undefined || companyIsShow[i] === null||companyIsShow[i]===''){
                        companyIsShow[i] = false;
                    }
                    if(describe[index] == 'lcy'){
                        var lay1 = {  
                            type: 'sector',
                            style: {
                                fill: colors[index]
                            },
                            shape: {
                                x:0,
                                y:0,
                                width:1,
                                height:1,
                                cx: 50,
                                cy: 50,
                                r: r,
                                startAngle:Math.PI,
                                endAngle:0
                            }
                        }
                        item = item/rawDataItem.lcz*PI;
                        lay1.shape.startAngle = PI ;
                        lay1.shape.endAngle = PI-item;
                        end1 = PI-item;
                        obj.layers.push(lay1);
                       
                    }else if(describe[index] == 'lcs'){
                        var lay1 = {  
                            type: 'sector',
                            style: {
                                fill: colors[index]
                            },
                            shape: {
                                x:0,
                                y:0,
                                width:1,
                                height:1,
                                cx: 50,
                                cy: 50,
                                r: r,
                                startAngle:2,
                                endAngle:1
                            }
                        }
                        item = item/rawDataItem.lcz*PI;
                        lay1.shape.startAngle = end1;
                        lay1.shape.endAngle = end1-item;
                        end2 = end1-item;
                        obj.layers.push(lay1);
                    }else if(describe[index] == 'lcq'){
                        var lay1 = {  
                            type: 'sector',
                            style: {
                                fill: colors[index]
                            },
                            shape: {
                                x:0,
                                y:0,
                                width:1,
                                height:1,
                                cx: 50,
                                cy: 50,
                                r: r,
                                startAngle:2,
                                endAngle:1
                            }
                        }
                        item = item/rawDataItem.lcz*PI;
                        lay1.shape.startAngle = end2;
                        lay1.shape.endAngle = 0;
                        
                        obj.layers.push(lay1);
                    }else if(describe[index] == 'rcy'){
                        var lay1 = {  
                            type: 'rect',
                            style: {
                                fill: colors[index]
                            },
                            shape: {
                                x:0,
                                y:0,
                                width:8,
                                height:50,
                            }
                        }
                        item = item/(rawDataItem.maxRcy)*(H-10)+10;
                        if(isNaN(item)){
                            item = 0;
                        }
                        if(type===4){
                            lay1.shape.x = oilsPos+(W+sp)*0;
                        }else{
                            lay1.shape.x = oilsPos+(W+sp)*(n);
                        }
                        lay1.shape.y = cy - item;
                        lay1.shape.height = item;
                        lay1.shape.width = W;
                        n++;
                        obj.layers.push(lay1);
                    }else if(describe[index] == 'rcs'){
                        var lay1 = {  
                            type: 'rect',
                            style: {
                                fill: colors[index]
                            },
                            shape: {
                                x:20,
                                y:0,
                                width:8,
                                height:50,
                            }
                        }
                        item = item/(rawDataItem.maxRcs)*(H-10)+10;
                        if(isNaN(item)){
                            item = 0;
                        }
                        if(type===4){
                            lay1.shape.x = oilsPos+(W+sp)*1;
                        }else{
                            lay1.shape.x = oilsPos+(W+sp)*(n);
                        }
                        lay1.shape.y = cy - item;
                        lay1.shape.height = item;
                        lay1.shape.width = W;
                        n++;
                        obj.layers.push(lay1);
                    }else if(describe[index] == 'rcq'){
                        var lay1 = {  
                            type: 'rect',
                            style: {
                                fill: colors[index]
                            },
                            shape: {
                                x:40,
                                y:0,
                                width:8,
                                height:50,
                            }
                        }
                        item = item/(rawDataItem.maxRcq)*(H-10)+10;
                        if(isNaN(item)){
                            item = 0;
                        }
                        if(type===4){
                            lay1.shape.x = oilsPos+(W+sp)*2;
                        }else{
                            lay1.shape.x = oilsPos+(W+sp)*(n);
                        }
                        lay1.shape.y = cy - item;
                        lay1.shape.height = item;
                        lay1.shape.width = W;
                        n++;
                        obj.layers.push(lay1);
                    }
                }
            });
        }
        rawDataItem.ColumnSymbol = obj;
        return obj
    };

    miningIndexDrawProto.remove = function (enableAnimation) {
        var data = this._data;
        if (data) {
            if (enableAnimation) {
                data.eachItemGraphicEl(function (el) {
                    el.removeAll()
                });
            }
        }
    };
    function makeSeriesScope(data) {
        return data.hostModel;
        // return {
        //     itemStyle: seriesModel.getModel('itemStyle').getItemStyle(['color']),
        //     hoverItemStyle: seriesModel.getModel('emphasis.itemStyle').getItemStyle(),
        //     symbolRotate: seriesModel.get('symbolRotate'),
        //     symbolOffset: seriesModel.get('symbolOffset'),
        //     hoverAnimation: seriesModel.get('hoverAnimation'),
        //     labelModel: seriesModel.getModel('label'),
        //     hoverLabelModel: seriesModel.getModel('emphasis.label'),
        //     cursorStyle: seriesModel.get('cursor')
        // };
    }
    hwchart.chart.helper.MiningIndexDraw = MiningIndexDraw;
})



