Vmd.define('hwchart.chart.helper.WellTraceDraw', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.chart.helper.Polyline',
        'hwchart.config.wellSymbolMap',
        'hwchart.chart.helper.Symbol',
        'hwchart.chart.helper.ComposeSymbol',
        'hwchart.util.symbolDataStorage',
        'hwchart.chart.helper.WellManager'
    ]
   
}, function () {
    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
     var WellManager = hwchart.chart.helper.WellManager;
    var LineGroup = hwchart.chart.helper.Polyline;
    var ComposeSymbol = hwchart.chart.helper.ComposeSymbol;

    function isPointNaN(pt) {
        return isNaN(pt[0]) || isNaN(pt[1]);
    }
    function lineNeedsDraw(data, idx, isIgnore) {
        var pts = data.getItemLayout(idx).coords;
        var isShow = data.getRawDataItem(idx).show !== false;
        return isShow && !isPointNaN(pts[0]) && !isPointNaN(pts[1]);
    }
    function normalizeSymbolScale(symbolSize, rect) {
        if (!zrUtil.isArray(symbolSize)) {
            symbolSize = [symbolSize, symbolSize];
        }
        return [symbolSize[0] / rect.width, symbolSize[1] / rect.height];
    }
    /**
     * @alias module:echarts/component/marker/LineDraw
     * @constructor
     */
    function LineDraw(ctor, seriesModel, ecModel, api) {
        var self = this;
        this._ctor = ctor || LineGroup;
        this._symbolCtor = ComposeSymbol;
        this.group = new graphic.Group();
        this.selectIndexs = [];

        api.on('click', function(e){
            var seriesModel = self._lineData.hostModel;
            var allowSelect = seriesModel.get('allowSelect');
            if(allowSelect === false){
                return;
            }
            var seriesType = e.seriesType;
            var target = e.event.target;
            var event = e.event.event;

            var targetSeriesIndex = target.parent.seriesIndex;
            if(e.componentType == "series" && targetSeriesIndex === seriesModel.seriesIndex){
                //已经被选中
                if(zrUtil.indexOf(self.selectIndexs, target.parent.dataIndex) != -1){
                    self._clearSelect([target.parent.dataIndex]);
                    return;
                }
                else if(!event.ctrlKey){
                    self._clearSelect();
                }
                self._drawSelect(target.parent.dataIndex);
            }
            else{
                self._clearSelect();
            }
        })
    }

    var lineDrawProto = LineDraw.prototype;

    /**
     * @param {module:echarts/data/List} lineData
     */
    lineDrawProto.updateData = function (ecModel,api,lineData) {
        var seft = this;
        var oldLineData = this._lineData;
        var group = seft.group;
        var LineCtor = seft._ctor;
        var geo = ecModel.getComponent('geo');
        var zoom = geo.coordinateSystem._zoom;
        var hostModel = lineData.hostModel;
        if(hostModel){
            var seriesScope = seft.seriesScope = {
                lineStyle: hostModel.getModel('lineStyle.normal').getLineStyle(),
                areaStyle: hostModel.getModel('areaStyle.normal').getLineStyle(),
                hoverLineStyle: hostModel.getModel('lineStyle.emphasis').getLineStyle(),
                labelModel: hostModel.getModel('label.normal'),
                hoverLabelModel: hostModel.getModel('label.emphasis')
            };
    
        }
        lineData.diff(oldLineData)
            .add(function (idx) {
                if (!WellManager.checkSymbolShow(lineData.getId(idx))) {
                    return;
                }

                var lineGroup = seft._drawEl(lineData, idx,seriesScope)
                
                lineData.setItemGraphicEl(idx, lineGroup);

                group.add(lineGroup);
                
            })
            .update(function (newIdx, oldIdx) {
                
                var lineGroup = oldLineData.getItemGraphicEl(oldIdx);
                var point = lineData.getItemLayout(newIdx);

                if (!WellManager.checkSymbolShow(lineData.getId(newIdx))) {
                    group.remove(lineGroup);
                    return;
                }

                if (!lineGroup) {
                    lineGroup = seft._drawEl(lineData, newIdx)
                }
                else {

                   //线缩放
                    if(lineGroup.childOfName('traceLine')){
                        lineGroup.childOfName('traceLine').updateLayout(lineData, newIdx, ecModel, api);
                    }
                    //靶点符号缩放
                    if(lineGroup.childOfName('traceSymbolA')){
                        var point = lineData.getItemLayout(newIdx).a;
                        var scale =  lineGroup.childOfName('traceSymbolA')._scale[0];
                        lineGroup.childOfName('traceSymbolA').attr('position', point);
                        if(!isNaN(scale)){
                            var zoomScale = Math.min(scale/6 * zoom, scale);
                            lineGroup.childOfName('traceSymbolA').attr('scale', [zoomScale, zoomScale]);
                        }
                    }
                    if(lineGroup.childOfName('traceSymbolB')){
                        var point = lineData.getItemLayout(newIdx).b;
                        var scale =  lineGroup.childOfName('traceSymbolB')._scale[0];
                        lineGroup.childOfName('traceSymbolB').attr('position', point);
                        if(!isNaN(scale)){
                            var zoomScale = Math.min(scale/6 * zoom, scale);
                            lineGroup.childOfName('traceSymbolB').attr('scale', [zoomScale, zoomScale]);
                        }
                    }
                }

                lineData.setItemGraphicEl(newIdx, lineGroup);

                group.add(lineGroup);
            })
            .remove(function (idx) {
                group.remove(oldLineData.getItemGraphicEl(idx));
            })
            .execute();

        this._lineData = lineData;
    };
    lineDrawProto._drawEl = function (data, idx,seriesScope) {
        var seft = this;
        var LineCtor = seft._ctor;
        var elGroup = new graphic.Group();
        
        var seriesModel = data.hostModel;
        var ecModel = seriesModel.ecModel;
        var lineGroup = new LineCtor(data, idx, seriesScope);
        lineGroup.name = 'traceLine';
        elGroup.add(lineGroup)
        var rawDataItem = data.getRawDataItem(idx);
        if(rawDataItem.a){
            //符号绘制
            var aPotion = data.getItemLayout(idx).a;
            var symbolSize = seriesModel.get('AsymbolStyle.normal.symbolSize') || 15;
            var symbolEl = null;
                
            symbolDesc = this.creatSymbol(data,'a');
            symbolEl = new this._symbolCtor(null,symbolDesc);
            symbolEl.attr('position', aPotion);
        
            var scale = normalizeSymbolScale(symbolSize, symbolEl.getBoundingRect());
            symbolEl.attr('scale', scale);
            symbolEl._scale = scale;
            symbolEl._tag = 'symbol';
            symbolEl.name = 'traceSymbolA';
            elGroup.add(symbolEl);

            var scale = seriesModel.get('scale');
            var geo = ecModel.getComponent('geo');
            var zoom = geo.coordinateSystem._zoom;
            if(!isNaN(scale)){
                var zoomScale = Math.min(scale * zoom, 1);
                elGroup.attr('scale', [zoomScale, zoomScale]);
            }
        }

        if(rawDataItem.b){
            //符号绘制
            var bPotion = data.getItemLayout(idx).b;
            var symbolSize = seriesModel.get('BsymbolStyle.normal.symbolSize') || 15;
            var symbolEl = null;
                
            symbolDesc = this.creatSymbol(data,'b');
            symbolEl = new this._symbolCtor(null,symbolDesc);
            symbolEl.attr('position', bPotion);
        
            var scale = normalizeSymbolScale(symbolSize, symbolEl.getBoundingRect());
            symbolEl.attr('scale', scale);
            symbolEl._scale = scale;
            symbolEl._tag = 'symbol';
            symbolEl.name = 'traceSymbolB';
            elGroup.add(symbolEl);

            var scale = seriesModel.get('scale');
            var geo = ecModel.getComponent('geo');
            var zoom = geo.coordinateSystem._zoom;
            if(!isNaN(scale)){
                var zoomScale = Math.min(scale * zoom, 1);
                elGroup.attr('scale', [zoomScale, zoomScale]);
            }
        }

        return elGroup;
    };
    lineDrawProto.creatSymbol = function(data,type){
        var seft = this;
        var hostModel = data.hostModel;
        if(type === "a"){
            var color = hostModel.get('AsymbolStyle.normal.color') || '#FE0100';
            var text = 'A';
        }else if(type === 'b'){
            var color = hostModel.get('BsymbolStyle.normal.color') || '#FE0100';
            var text = 'B';
        }
        
        return {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                layers: [{
                    type: 'circle',
                    style: {
                        fill: color
                    },
                    shape: {
                        cx: 50,
                        cy: 50,
                        r: 50
                    }
                },
                {  
                    type: 'text',
                    position:[22,22],
                    style: {
                        text:text,
                        textFill:'#ffffff',
                        fontSize:72,
                    },
                }
            ]}
    };

    // lineDrawProto.updateLayout = function (seriesModel, ecModel, api) {
    //     var seft = this;
    //     var lineData = this._lineData;
    //     var group = seft.group;
    //     if(lineData){
    //         var ecModel = lineData.hostModel.ecModel;
    //         // var scale = lineData.hostModel.get('scale');
    //         var geo = ecModel.getComponent('geo');
    //         var zoom = geo.coordinateSystem._zoom;

    //         for(var i = 0;i<lineData._graphicEls.length;i++){
    //             var el = lineData._graphicEls[i];
    //             var point = WellManager.getWellLayout(lineData.getId(i));
    //             var id = lineData.getId(i);
    //             if (WellManager.checkSymbolShow(id)){
    //                 if(!el){
    //                     el = seft._drawEl(lineData,i,seft.seriesScope)
    //                     group.add(el)
    //                     lineData.setItemGraphicEl(i, el);
    //                 }
    //                 //线缩放
    //                 if(el.childOfName('traceLine')){
    //                     el.childOfName('traceLine').updateLayout(lineData, i, ecModel, api);
    //                 }
    //                 //靶点符号缩放
    //                 if(el.childOfName('traceSymbolA')){
    //                     var point = lineData.getItemLayout(i).a;
    //                     var scale =  el.childOfName('traceSymbolA')._scale[0];
    //                     el.childOfName('traceSymbolA').attr('position', point);
    //                     if(!isNaN(scale)){
    //                         var zoomScale = Math.min(scale/6 * zoom, scale);
    //                         el.childOfName('traceSymbolA').attr('scale', [zoomScale, zoomScale]);
    //                     }
    //                 }
    //                 if(el.childOfName('traceSymbolB')){
    //                     var point = lineData.getItemLayout(i).b;
    //                     var scale =  el.childOfName('traceSymbolB')._scale[0];
    //                     el.childOfName('traceSymbolB').attr('position', point);
    //                     if(!isNaN(scale)){
    //                         var zoomScale = Math.min(scale/6 * zoom, scale);
    //                         el.childOfName('traceSymbolB').attr('scale', [zoomScale, zoomScale]);
    //                     }
    //                 }
    //             }else{
    //                 if(el){
    //                     el.removeAll()
    //                 }
    //             }
    //         }
    //     }
    // };

    lineDrawProto.remove = function () {
        this.group.removeAll();
    };

    lineDrawProto._drawSelect = function (idx) {
        var lineData = this._lineData;
 
        var line = lineData.getItemGraphicEl(idx).childOfName('traceLine');
     
        line.setSelect && line.setSelect(lineData, idx, null, this.selectIndexs);
    }

    lineDrawProto._clearSelect = function (clearIndexs) {
        var self = this;
        var lineData = this._lineData;
        clearIndexs = clearIndexs || this.selectIndexs.concat();
        zrUtil.each(clearIndexs, function(idx){
            var line = lineData.getItemGraphicEl(idx).childOfName('traceLine');
            line.clearSelect && line.clearSelect(lineData, idx);
            self.selectIndexs.remove(idx);
        });
    }


    hwchart.chart.helper.WellTraceDraw= LineDraw;
})