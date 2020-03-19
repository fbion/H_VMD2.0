Vmd.define('hwchart.chart.helper.WellDraw', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.layout',
        'hwchart.config.wellSymbolMap',
        'hwchart.chart.helper.Symbol',
        'hwchart.chart.helper.ComposeSymbol',
        'hwchart.util.symbolDataStorage'
    ]
}, function () {

    var zrUtil = zrender.util;
    var layout = hwchart.util.layout;
    var graphic = hwchart.util.graphic;
    var wellSymbolMap = hwchart.config.wellSymbolMap;
    var Symbol = hwchart.chart.helper.Symbol;
    var ComposeSymbol = hwchart.chart.helper.ComposeSymbol;
    var symbolDataStorage = hwchart.util.symbolDataStorage;

    function normalizeSymbolScale(symbolSize, rect) {
        if (!zrUtil.isArray(symbolSize)) {
            symbolSize = [symbolSize, symbolSize];
        }
        return [symbolSize[0] / rect.width, symbolSize[1] / rect.height];
    }

    /**
     * @constructor
     * @alias module:echarts/chart/helper/WellDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function WellDraw(ecModel, api) {
        var self = this;
        this.group = new graphic.Group();
        this.selectIndexs = [];
        this.selectSubIndexs = [];

        api.on('click', function(e){
            var seriesModel = self._data.hostModel;
            var allowSelect = seriesModel.get('allowSelect');
            if(allowSelect === false){
                return;
            }
            var seriesType = e.seriesType;
            var target = e.event.target;
            var event = e.event.event;
            if(seriesType == "wellSymbol"){
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
                    self._selectSub(target);
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
    }

    var wellDrawProto = WellDraw.prototype;

    function wellNeedsDraw(data, idx, isIgnore) {
        var point = data.getItemLayout(idx);
        return point && !isNaN(point[0]) && !isNaN(point[1]) && !(isIgnore && isIgnore(idx))
                    && data.getItemVisual(idx, 'symbol') !== 'none';
    }

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

    wellDrawProto._getTextStyle = function (data) {
        var seriesModel = data.hostModel;
        var ecModel = data.hostModel.ecModel;

        var textStyle = zrUtil.defaults({},
            zrUtil.defaults(
                seriesModel.get('label.normal'),
                seriesModel.getShallow('textStyle')
            )
        )
        return textStyle;
    };

    wellDrawProto.reLayoutPoint = function(data, idx, labelEl) {
        var seriesModel = data.hostModel;
        var ecModel = data.hostModel.ecModel;
        var rawDataItem = data.getRawDataItem(idx);
        var symbolSize = data.getItemVisual(idx, 'symbolSize');

        var newPoint = [0, 0];
        var boundingRect = labelEl.getBoundingRect();
        var position = rawDataItem.position || seriesModel.get('label.normal.position');
        var distance = rawDataItem.distance || seriesModel.get('label.normal.distance') || 0;
        var offset = rawDataItem.offset || seriesModel.get('label.normal.offset') || [0, 0];
        if(!zrUtil.isArray(offset) || isNaN(offset[0]) || isNaN(offset[1])){
            offset = [0, 0];
        }

        switch (position) {
            case 'left':
                newPoint[0] = newPoint[0] - symbolSize / 2 - boundingRect.width - distance;
                newPoint[1] = newPoint[1] - boundingRect.height / 2 + offset[1];
                break;
            case 'right':
                newPoint[0] = newPoint[0] + symbolSize / 2 + distance;
                newPoint[1] = newPoint[1] - boundingRect.height / 2 + offset[1];
                break;
            case 'bottom':
                newPoint[0] = newPoint[0] - symbolSize / 2 - (boundingRect.width - symbolSize) / 2 + offset[0];
                newPoint[1] = newPoint[1] + symbolSize / 2 + distance;
                break;
            default:
                newPoint[0] = newPoint[0] - symbolSize / 2 - (boundingRect.width - symbolSize) / 2 + offset[0];
                newPoint[1] = newPoint[1] - symbolSize / 2 - boundingRect.height - distance;
                break;
        }
        return newPoint;
    };

    wellDrawProto._drawEl = function (data, idx, seriesScope) {
        var wellGroup = new graphic.Group();
        var point = data.getItemLayout(idx);
        var seriesModel = data.hostModel;
        var ecModel = seriesModel.ecModel;

        //绘制井符号
        var symbol = data.getItemVisual(idx, 'symbol');
        var symbolSize = data.getItemVisual(idx, 'symbolSize');
        var symbolId = wellSymbolMap[symbol] || symbol;
        var wellSymbol = symbolDataStorage.retrieveComposeSymbol(symbolId);

        var symbolEl;
        if(!wellSymbol){
            symbolEl = new Symbol(data, idx, seriesScope);
        }
        else{
            symbolEl = new ComposeSymbol(symbolId);
            var scale = normalizeSymbolScale(symbolSize, symbolEl.getBoundingRect());
            symbolEl.attr('scale', scale);
            symbolEl._position = [0, 0];
            symbolEl._scale = scale;
        }

        symbolEl.attr('z', 0);
        symbolEl._tag = 'symbol';
        wellGroup.add(symbolEl);
        wellGroup.attr('position', point);

        //绘制井名
        if (data._nameList[idx] != undefined) {
            var elStyle = {};
            graphic.setText(elStyle, seriesModel.getModel('label.normal'), data.getItemVisual(idx, 'color'));
            elStyle = zrUtil.defaults(this._getTextStyle(data), elStyle);
            elStyle.text = data._nameList[idx] || data._idList[idx];
            var labelEl = new zrender.Text({
                style: elStyle
            });
            labelEl._tag = 'name';
            var position = this.reLayoutPoint(data, idx, labelEl);
            labelEl.attr('position', position);
            labelEl.attr('z', 1);
            labelEl._position = position;
            wellGroup.add(labelEl);
        }

        var scale = seriesModel.get('scale');
        var geo = ecModel.getComponent('geo');
        var zoom = geo.coordinateSystem._zoom;
        if(!isNaN(scale)){
            var zoomScale = Math.min(scale * zoom, 1);
            wellGroup.attr('scale', [zoomScale, zoomScale]);
        }

        return wellGroup;

    }

    //添加井旁标注、开采现状图等其他图元
    wellDrawProto._addOtherEl = function (wellGroup, data, idx) {
        var seriesModel = data.hostModel;
        var ecModel = seriesModel.ecModel;
        var id = data.getId(idx);
        ecModel.eachSeries(function (seriesModel) {
            //添加井旁标注元素 添加开采指标
            if(seriesModel.subType == 'wellLabel' || seriesModel.subType == 'miningIndex') {
                var seriesData = seriesModel.getData();
                var idx = zrUtil.indexOf(seriesData._idList, id);
                var el = seriesData.getItemGraphicEl(idx);
                if(el && el._state != 'delete'){
                    wellGroup.add(el);
                }
            }
        });
    }

    wellDrawProto._createSelect = function (idx) {
        var data = this._data;
        var group = data.getItemGraphicEl(idx);

        var selectEl = creatSelectShape(group.getBoundingRect());
        group._selected = true;
        group.add(selectEl);
        this.selectIndexs.push(idx);
    }

    wellDrawProto._selectSub = function (el) {
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
                shape.x *= el._scale[0];
                shape.y *= el._scale[1];
                shape.width *= el._scale[0];
                shape.height *= el._scale[1];
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

    wellDrawProto._clearSelect = function (clearIndexs) {
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

    /**
     * Update symbols draw by new data
     * @param {module:echarts/data/List} data
     * @param {Array.<boolean>} [isIgnore]
     */
    wellDrawProto.updateData = function (data, isIgnore) {
        var self = this;
        var group = this.group;
        var seriesModel = data.hostModel;
        var oldData = this._data;

        var seriesScope = {
            itemStyle: seriesModel.getModel('itemStyle.normal').getItemStyle(['color']),
            hoverItemStyle: seriesModel.getModel('itemStyle.emphasis').getItemStyle(),
            symbolRotate: seriesModel.get('symbolRotate'),
            symbolOffset: seriesModel.get('symbolOffset'),
            hoverAnimation: seriesModel.get('hoverAnimation'),

            labelModel: seriesModel.getModel('label.normal'),
            hoverLabelModel: seriesModel.getModel('label.emphasis')
        };

        var _hasUpdate = false;
        data.diff(oldData)
            .add(function (newIdx) {
                if (wellNeedsDraw(data, newIdx, isIgnore)) {
                    var point = data.getItemLayout(newIdx);
                    var well = self._drawEl(data, newIdx, seriesScope);
                    data.setItemGraphicEl(newIdx, well);
                    group.add(well);
                    self._addOtherEl(well, data, newIdx);
                }
                _hasUpdate = true;
            })
            .update(function (newIdx, oldIdx) {
                var well = oldData.getItemGraphicEl(oldIdx);
                var point = data.getItemLayout(newIdx);
                if (!wellNeedsDraw(data, newIdx, isIgnore)) {
                    group.remove(well);
                    return;
                }
                if (!well) {
                    well = self._drawEl(data, newIdx, seriesScope);
                }
                else {
                    //var symbol = data.getItemVisual(newIdx, 'symbol');
                    //var symbolId = wellSymbolMap[symbol];
                    //well.updateData(symbolId);
                    graphic.updateProps(well, {
                        position: point
                    }, seriesModel);
                }

                // Add back
                group.add(well);
                self._addOtherEl(well, data, newIdx);

                data.setItemGraphicEl(newIdx, well);
                _hasUpdate = true;
            })
            .remove(function (oldIdx) {
                var el = oldData.getItemGraphicEl(oldIdx);
                el && el.fadeOut(function () {
                    group.remove(el);
                });
                _hasUpdate = true;
            })
            .execute();

        this._data = data;
        return _hasUpdate;
    };

    wellDrawProto.updateLayout = function () {
        var data = this._data;
        if (data) {
            var ecModel = data.hostModel.ecModel;
            var scale = data.hostModel.get('scale');
            var geo = ecModel.getComponent('geo');
            var zoom = geo.coordinateSystem._zoom;
            // Not use animation
            data.eachItemGraphicEl(function (el, idx) {
                var point = data.getItemLayout(idx);
                el.attr('position', point);

                if(!isNaN(scale)){
                    var zoomScale = Math.min(scale * zoom, 1);
                    el.attr('scale', [zoomScale, zoomScale]);
                }
            });
        }
    };

    wellDrawProto.remove = function (enableAnimation) {
        var group = this.group;
        var data = this._data;
        if (data) {
            if (enableAnimation) {
                data.eachItemGraphicEl(function (el) {
                    group.remove(el);
                });
            }
            else {
                group.removeAll();
            }
        }
    };
    hwchart.chart.helper.WellDraw = WellDraw;
   
})