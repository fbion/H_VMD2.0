Vmd.define('hwchart.chart.helper.WellSymbolDraw', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.config.wellSymbolMap',
        'hwchart.chart.helper.WellManager',
        'hwchart.chart.helper.ComposeSymbol'
    ]
}, function () {

    var _util = zrender.util;
    var graphic = hwchart.util.graphic;
    var wellSymbolMap = hwchart.config.wellSymbolMap;
    var WellManager = hwchart.chart.helper.WellManager;
    var ComposeSymbol = hwchart.chart.helper.ComposeSymbol;

    var isObject = _util.isObject;
    var isArray = _util.isArray;
    var filter = _util.filter;
    var indexOf = _util.indexOf;
    var each = _util.each;
    var defaults = _util.defaults;
    var isFunction = _util.isFunction;

    function normalizeSymbolScale(symbolSize, rect) {
        if (!isArray(symbolSize)) {
            symbolSize = [symbolSize, symbolSize];
        }
        return [symbolSize[0] / rect.width, symbolSize[1] / rect.height];
    }

    /**
     * @constructor
     * @alias module:echarts/chart/helper/WellSymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function WellSymbolDraw(ecModel, api) {
        var self = this;
        api.on('click', function(e){
            // var data = self._data;
            // var seriesModel = data.hostModel;
            // var allowSelect = seriesModel.get('allowSelect');
            // if(allowSelect === false){
            //     return;
            // }
            // var seriesType = e.seriesType;
            // var target = e.event.target;
            // var event = e.event.event;
            // if(seriesType == "wellSymbol"){
            //     target = target._tag == 'name' ? target : target.parent.parent;
            // }
            // var targetSeriesIndex = target.parent.seriesIndex;
            // if(e.componentType == "series" && targetSeriesIndex === seriesModel.seriesIndex){
            //     //已经被选中
            //     var dataIndex = target.parent.dataIndex;
            //     var id = data.getId(dataIndex);
            //     if(WellManager.checkSelected(id)){
            //         // self._clearSelect(
            //         //     filter(self.selectIndexs, function(item){
            //         //         return item != dataIndex;
            //         //     })
            //         // );
            //         // if(indexOf(self.selectSubIndexs, dataIndex) == -1){
            //         //     self.selectSubIndexs.push(dataIndex);
            //         // };
            //         // self._selectSub(target);
            //         return;
            //     }
            //     if(!event.ctrlKey){
            //         WellManager.clearSelect();
            //     }
            //     WellManager.createWellSelect(id);
            // }
            // else{
            //     WellManager.clearSelect();
            // }
        });

        api.on('brushSelected', function (params) {
            // var seriesModel = self._data.hostModel;
            // var allowSelect = seriesModel.get('allowSelect');
            // if(allowSelect === false){
            //     return;
            // }
            // var selectedSeries = params.batch[0].selected;
            // var selectedWell = filter(selectedSeries, function(item){
            //     return item.seriesId == seriesModel.id;
            // });
            // var selectIndexs = (selectedWell && selectedWell[0] && selectedWell[0].dataIndex) || [];
            //
            // WellManager.clearSelect();
            // each(selectIndexs, function(idx){
            //     var id = self._data.getId(idx);
            //     WellManager.createWellSelect(id);
            // });
        });
    }

    var wellSymbolDrawProto = WellSymbolDraw.prototype;

    wellSymbolDrawProto._drawSymbol = function (data, idx, seriesScope) {
        var wellGroup = new graphic.Group();

        //绘制井符号
        var symbol = data.getItemVisual(idx, 'symbol');
        var symbolSize = data.getItemVisual(idx, 'symbolSize');
        var symbolId = wellSymbolMap[symbol] || symbol;

        var symbolEl = new ComposeSymbol(symbolId, null, true);
        var scale = normalizeSymbolScale(symbolSize, symbolEl.getBoundingRect());
        symbolEl.attr('position', [-symbolSize / 2, -symbolSize / 2]);
        symbolEl.attr('scale', scale);
        symbolEl._position = [0, 0];
        symbolEl._scale = scale;

        symbolEl._tag = 'symbol';
        wellGroup.add(symbolEl);

        return wellGroup;
    }

    wellSymbolDrawProto._drawName = function (data, idx, seriesScope) {
        var seriesModel = data.hostModel;
        var ecModel = seriesModel.ecModel;
        var filter = seriesModel.get("filter");

        var nameEl = null;
        //绘制井名
        if (data._nameList[idx] !== undefined) {
            var elStyle = {};
            graphic.setText(elStyle, seriesModel.getModel('label'), data.getItemVisual(idx, 'color'));

            var textStyle = defaults({},
                defaults(
                    seriesModel.get('label'),
                    seriesModel.getShallow('textStyle')
                )
            );
            elStyle = defaults(textStyle, elStyle);
            var name = data._nameList[idx] || data._idList[idx];
            if(isFunction(filter)){
                name = filter.call(this, name);
            }
            else if(isObject(filter)){
                if(filter.type == "char"){
                    var reg = new RegExp("^" + (filter.prefix || "") + "|" + (filter.suffix || "") + "$", "g");
                    name = name.replace(reg, "");
                }
                else if(filter.type == "charnum"){
                    name = name.substring((filter.preChars || 0), Math.max((filter.preChars || 0), name.length - (filter.sufChars || 0)));
                }
            }
            elStyle.text = name;
            nameEl = new zrender.Text({
                style: elStyle
            });
            nameEl._tag = 'name';
        }

        return nameEl;
    }

    /**
     * Update symbols draw by new data
     * @param {module:echarts/data/List} data
     * @param {Array.<boolean>} [isIgnore]
     */
    wellSymbolDrawProto.updateData = function (data, payload) {
        var self = this;
        var seriesModel = data.hostModel;
        var oldData = this._data;

        var ecModel = seriesModel.ecModel;
        var geo = ecModel.getComponent('geo');
        var zoom = geo.coordinateSystem._zoom;
        var zoomScale = makeScaleZoom(data);

        var lastZoom = this._lastZoom || zoom;
        var roamType = payload && payload.subType;
        var zoomType = lastZoom > zoom ? 'zoomIn' : 'zoomOut'

        var seriesScope =  makeSeriesScope(data);

        var labelModel = seriesScope.labelModel;
        var labelShow = labelModel.get("show");
        var labelPosition = labelModel.get("position");
        var labelDistance = labelModel.get("distance");
        var labelOffset = labelModel.get("offset");

        if(!roamType){
            WellManager.setData(data);
        }

        var dirty = seriesModel.get('dirty');

        data.diff(oldData)
            .add(function (newIdx) {
                var wellGroup = self._drawSymbol(data, newIdx, seriesScope);
                var symbolSize = data.getItemVisual(newIdx, 'symbolSize');
                //经过避让算法后需要显示井符号
                if (WellManager.needsDrawSymbol(data, newIdx, symbolSize, zoomScale)) {

                    data.setItemGraphicEl(newIdx, wellGroup);
                    WellManager.setSymbolShow(data, newIdx, true);
                    WellManager.addWellSymbol(data, newIdx);

                    var nameEl = labelShow && self._drawName(data, newIdx, seriesScope);
                    nameEl && (nameEl._position = WellManager.addWellEl(
                        data, newIdx, nameEl, wellGroup, [0, 0],
                        labelPosition, labelDistance, labelOffset, zoomScale
                    ));

                    wellGroup.attr('scale', [zoomScale, zoomScale]);
                }
                else{
                    //WellManager.setSymbolShow(data, newIdx, false);
                }
            })
            .update(function (newIdx, oldIdx) {
                var point = data.getItemLayout(newIdx);
                var wellGroup = oldData.getItemGraphicEl(oldIdx);

                var symbolSize = data.getItemVisual(newIdx, 'symbolSize');

                if(roamType == 'pan'){
                    var moveType = WellManager.checkMoveType(point, payload);
                    if(moveType == 'screenOut'){
                        WellManager.removeWellSymbol(oldData, newIdx);
                        WellManager.setSymbolShow(oldData, newIdx, false);
                        return;
                    }
                    else if(moveType == 'screenIn'){
                        if (!WellManager.needsDrawSymbol(data, newIdx, symbolSize, zoomScale)) {
                            return;
                        }
                    }
                    else{
                        if(!WellManager.isPointInBody(point) || !WellManager.checkSymbolShow(data.getId(newIdx))){
                            return;
                        }
                    }
                }
                else if(roamType == 'zoom'){
                    if(zoomType == 'zoomIn'){
                        if (!WellManager.needsDrawSymbol(data, newIdx, symbolSize, zoomScale)) {
                            WellManager.removeWellSymbol(oldData, newIdx);
                            WellManager.setSymbolShow(oldData, newIdx, false);
                            return;
                        }
                    }
                    else if(zoomType == 'zoomOut'){
                        if(WellManager.checkSymbolShow(data.getId(newIdx))){
                            if(!WellManager.isPointInBody(point)){
                                WellManager.removeWellSymbol(oldData, newIdx);
                                WellManager.setSymbolShow(oldData, newIdx, false);
                                return;
                            }
                        }
                        else{
                            if (!WellManager.needsDrawSymbol(data, newIdx, symbolSize, zoomScale)) {
                                WellManager.removeWellSymbol(oldData, newIdx);
                                WellManager.setSymbolShow(oldData, newIdx, false);
                                return;
                            }
                        }
                    }
                }
                else{
                    if (!WellManager.needsDrawSymbol(data, newIdx, symbolSize, zoomScale)) {
                        WellManager.removeWellSymbol(oldData, newIdx);
                        WellManager.setSymbolShow(oldData, newIdx, false);
                        return;
                    }
                }

                if(!wellGroup){
                    wellGroup = self._drawSymbol(data, newIdx, seriesScope)
                }
                else if(dirty){
                    WellManager.removeWellSymbol(oldData, newIdx);
                    wellGroup = self._drawSymbol(data, newIdx, seriesScope);
                }

                data.setItemGraphicEl(newIdx, wellGroup);
                WellManager.setSymbolShow(data, newIdx, true);

                WellManager.addWellSymbol(data, newIdx);
                var nameEl = wellGroup.childAt(1);
                if(!nameEl && labelShow){
                    nameEl = self._drawName(data, newIdx, seriesScope);
                }
                else if(nameEl && dirty){
                    wellGroup.remove(nameEl);
                    nameEl = self._drawName(data, newIdx, seriesScope);
                }

                nameEl && (nameEl._position = WellManager.addWellEl(
                    data, newIdx, nameEl, wellGroup, [0, 0],
                    labelPosition, labelDistance, labelOffset, zoomScale
                ));

                wellGroup.attr('scale', [zoomScale, zoomScale]);
            })
            .remove(function (oldIdx) {
                var wellGroup = oldData.getItemGraphicEl(oldIdx);
                wellGroup && wellGroup.fadeOut(function () {
                    WellManager.removeWellSymbol(oldData, oldIdx);
                    WellManager.setSymbolShow(oldData, oldIdx, false);
                });
            })
            .execute();

        this._data = data;
        this._lastZoom = zoom;
    };

    wellSymbolDrawProto.isPersistent = function () {
        return true;
    };

    wellSymbolDrawProto.updateLayout = function () {
        var data = this._data;

        if (data) {
            // Not use animation
            data.eachItemGraphicEl(function (el, idx) {
                var point = data.getItemLayout(idx);
                el.attr('position', point);
            });
        }
    };

    wellSymbolDrawProto.incrementalPrepareUpdate = function (data) {
        this._seriesScope = makeSeriesScope(data);
        var seriesModel = data.hostModel;
        var ecModel = seriesModel.ecModel;

        this._data = null;
        this.getGroup(ecModel).removeAll();
    };

    wellSymbolDrawProto.incrementalUpdate = function (taskParams, data, opt) {
        opt = normalizeUpdateOpt(opt);

        function updateIncrementalAndHover(el) {
            if (!el.isGroup) {
                el.incremental = el.useHoverLayer = true;
            }
        }

        var seriesScope = makeSeriesScope(data);
        var zoomScale = makeScaleZoom(data);

        var labelModel = seriesScope.labelModel;
        var labelShow = labelModel.get("show");
        var labelPosition = labelModel.get("position");
        var labelDistance = labelModel.get("distance");
        var labelOffset = labelModel.get("offset");

        for (var idx = taskParams.start; idx < taskParams.end; idx++) {
            var wellGroup = this._drawSymbol(data, idx, seriesScope);
            var symbolSize = data.getItemVisual(idx, 'symbolSize');
            // //经过避让算法后需要显示井符号
            if (WellManager.needsDrawSymbol(data, idx, symbolSize, zoomScale)) {
                data.setItemGraphicEl(idx, wellGroup);
                WellManager.setSymbolShow(data, idx, true);

                WellManager.addWellSymbol(data, idx);

                var nameEl = labelShow && this._drawName(data, idx, seriesScope);
                nameEl && (nameEl._position = WellManager.addWellEl(
                    data, idx, nameEl, wellGroup, [0, 0],
                    labelPosition, labelDistance, labelOffset, zoomScale
                ));

                wellGroup.attr('scale', [zoomScale, zoomScale]);
                data.setItemGraphicEl(idx, wellGroup);
            }
            else{
                //WellManager.setSymbolShow(data, idx, false);
            }
        }
    };

    wellSymbolDrawProto.getGroup = function (ecModel) {
        return WellManager.getGroup(ecModel);
    };

    wellSymbolDrawProto.remove = function (ecModel, api) {
        var data = this._data;
        if (data) {
            data.eachItemGraphicEl(function (wellGroup, idx) {
                WellManager.removeWellSymbol(data, idx);
            });
        } else {
            this.getGroup(ecModel).removeAll();
        }
    };

    function normalizeUpdateOpt(opt) {
        if (opt != null && !isObject(opt)) {
            opt = {
                isIgnore: opt
            };
        }

        return opt || {};
    }

    function makeScaleZoom(data) {
        var seriesModel = data.hostModel;
        var ecModel = seriesModel.ecModel;
        var scale = seriesModel.get('scale');
        var geo = ecModel.getComponent('geo');
        var zoom = geo.coordinateSystem._zoom;
        return !isNaN(scale) ? Math.min(scale * zoom, 1) : 1;
    };

    function makeSeriesScope(data) {
        var seriesModel = data.hostModel;
        return {
            itemStyle: seriesModel.getModel('itemStyle').getItemStyle(['color']),
            hoverItemStyle: seriesModel.getModel('emphasis.itemStyle').getItemStyle(),
            symbolRotate: seriesModel.get('symbolRotate'),
            symbolOffset: seriesModel.get('symbolOffset'),
            hoverAnimation: seriesModel.get('hoverAnimation'),
            labelModel: seriesModel.getModel('label'),
            hoverLabelModel: seriesModel.getModel('emphasis.label'),
            cursorStyle: seriesModel.get('cursor')
        };
    }

    hwchart.chart.helper.WellSymbolDraw = WellSymbolDraw;

})