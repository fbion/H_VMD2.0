Vmd.define('hwchart.chart.helper.IsoPolyline', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.shape.segments',
        'hwchart.util.layout'
    ]
   
}, function () {
    var graphic = hwchart.util.graphic;
    var _util = zrender.util;
    var layout = hwchart.util.layout;
    var SegmentsShape = hwchart.util.shape.segments;

    /**
     * @constructor
     * @extends {module:zrender/graphic/Group}
     * @alias {module:hwcharts/chart/helper/Polyline}
     */
    function IsoPolyline(lineData, idx, seriesScope) {
        graphic.Group.call(this);

        this._createPolyline(lineData, idx, seriesScope);
    }

    function measureText(text, fontStyle) {
        fontStyle.text = text;
        var labelEl = new zrender.Text({
            style: fontStyle
        });
        return labelEl.getBoundingRect();
    }

    var polylineProto = IsoPolyline.prototype;

    polylineProto._breakPoints = function (lineData, idx) {
        var seriesModel = lineData.hostModel;
        var itemLayout = lineData.getItemLayout(idx);
        var rawDataItem = lineData.getRawDataItem(idx);
        var segInterval = seriesModel.get('segInterval') * this._zoomScale;
        var labelPadding = seriesModel.get('labelPadding');
        var labelWidth = (measureText(rawDataItem.text, this._getTextStyle(lineData)).width + labelPadding) * this._zoomScale;

        if(!itemLayout || itemLayout.length < 2){
            return;
        }

        var points = [];

        if(seriesModel.get('label.show') === false){
            return {
                points: [itemLayout.length * 2].concat(_util.reduce(itemLayout, function (a, b) { return a.concat(b)},[] )),
                labels: []
            };
        }

        var result = {
            labels: []
        };
        var stepLen = segInterval;
        var totalSegLen = 0;
        var flag = 'seg';
        var isChanged = true;
        var isSegFirstPoint = true;
        var labelIndex = 0;

        var segmentLenPos = 0;
        var offset = 0;

        for(var i = 0; i < itemLayout.length - 1; i++) {
            var p = itemLayout[i];
            var nextP = itemLayout[i + 1];
            var d = zrender.vector.distance(p, nextP);

            if (flag == 'seg') {
                if (isChanged && isSegFirstPoint) {
                    segmentLenPos = offset++;
                    points[segmentLenPos] = (points[segmentLenPos] || 0) + 1;
                    points[offset++] = p[0];
                    points[offset++] = p[1];

                    isChanged = false;
                    isSegFirstPoint = false;
                }
                else {

                    points[segmentLenPos] += 1;
                    points[offset++] = p[0];
                    points[offset++] = p[1];
                }
            }
            else {
                result.labels[labelIndex] = result.labels[labelIndex] || {
                    text: rawDataItem.text,
                    points: []
                };
                result.labels[labelIndex].points.push([p[0],p[1]]);
            }

            //当前位置在线段之间
            while (stepLen >= totalSegLen && (stepLen <= (totalSegLen + d))) {
                var t = (stepLen - totalSegLen) / d;
                var out = [];
                zrender.vector.lerp(out, p, nextP, t);

                if (flag == 'seg') {
                    if (isChanged && isSegFirstPoint) {

                        segmentLenPos = offset++;
                        points[segmentLenPos] = (points[segmentLenPos] || 0) + 1;
                        points[offset++] = out[0];
                        points[offset++] = out[1];

                        if(result.labels[labelIndex]){
                            result.labels[labelIndex].points.push([out[0],out[1]]);
                        }
                        isChanged = false;
                        isSegFirstPoint = false;
                    }
                    else {
                        points[segmentLenPos] += 1;
                        points[offset++] = out[0];
                        points[offset++] = out[1];

                        result.labels[labelIndex] = result.labels[labelIndex] || {
                            text: rawDataItem.text,
                            points: []
                        };
                        result.labels[labelIndex].points.push([out[0],out[1]]);
                    }
                }
                else {
                    if(isChanged){
                        segmentLenPos = offset++;
                        points[segmentLenPos] = (points[segmentLenPos] || 0) + 1;
                        points[offset++] = out[0];
                        points[offset++] = out[1];

                        isChanged = false;
                    }
                    result.labels[labelIndex] = result.labels[labelIndex] || {
                        text: rawDataItem.text,
                        points: []
                    };
                    result.labels[labelIndex].points.push([out[0],out[1]]);
                }

                if (flag == 'seg') {
                    stepLen += labelWidth;
                    flag = 'label';
                    isChanged = true;
                }
                else {
                    stepLen += segInterval;
                    flag = 'seg';
                    labelIndex++;
                    isChanged = true;
                }

            }
            totalSegLen += d;
        }


        if (flag == 'seg') {

            points[segmentLenPos] += 1;
            points[offset++] = itemLayout[i][0];
            points[offset++] = itemLayout[i][1];

        }
        else if(result.labels[labelIndex]) {
            result.labels[labelIndex].points.push([itemLayout[i][0],itemLayout[i][1]]);
        }

        result.points = points;
        return result;
    }


    polylineProto.clearSelect = function(lineData, idx, seriesScope){
        this._updateCommonStl(lineData, idx, seriesScope);
    }

    polylineProto.setSelect = function(lineData, idx, seriesScope, selectIndexs){
        var line = this.childAt(0);
        var itemModel = lineData.getItemModel(idx);
        lineStyle = itemModel.getModel('lineStyle').getLineStyle();
        var lineWidth = lineStyle.lineWidth;
        line.setStyle({
            lineDash: [lineWidth * 4, lineWidth * 4]
        })
        line.animateStyle(true)
            .when(1000, {
                lineDashOffset: lineWidth * 8
            })
            .delay(100)
            .start();

        selectIndexs.push(idx);
    }

    polylineProto._getTextStyle = function (lineData) {
        var lineModel = lineData.hostModel;

        var textStyle = _util.defaults({},
            _util.defaults(
                lineModel.get('label'),
                lineModel.getShallow('textStyle')
            )
        )
        textStyle.fontSize *= this._zoomScale;
        return textStyle;
    };

    polylineProto._createPolyline = function (lineData, idx, seriesScope) {

        this.updateZoomScale(lineData, idx);

        var resultPoints = this._breakPoints(lineData, idx);

        var lineEl = new SegmentsShape({
            rectHover: true,
            cursor: 'default'
        });
        lineEl.setShape({
            segs: resultPoints.points
        });

        lineEl._seriesName = lineData.hostModel.name;
        this.add(lineEl);
        this.labelGroup = new graphic.Group();
        this.add(this.labelGroup);
        this._updateLabel(lineData, resultPoints.labels, idx);

        this._updateCommonStl(lineData, idx, seriesScope);

    };


    polylineProto._updateLabel = function (lineData, labels, idx) {
        this.labelGroup.removeAll();
        for(var i = 0; i < labels.length; i++) {
            var points = labels[i].points;
            if(!layout.isPointInBody(points[points.length - 1]) && !layout.isPointInBody(points[0])){
                continue;
            }
            var angle = Math.atan((points[points.length - 1][1] - points[0][1]) / (points[points.length - 1][0] - points[0][0]));
            var style =
                _util.defaults(
                {
                    stroke: 'none',
                    text: labels[i].text,
                    textRotation: -angle,
                    blend:'source-over',
                    textBackgroundColor: 'transparent',
                    // textPosition: 'top',
                    lineWidth: 1
                },
                this._getTextStyle(lineData)
            )

            var line = new zrender.Line({
                silent: false,
                shape: {
                    x1: points[0][0],
                    y1: points[0][1],
                    x2: points[points.length - 1][0],
                    y2: points[points.length - 1][1]
                },
                style: style
            });
            line.dataIndex = idx;
            this.labelGroup.add(line);
        }
    }

    polylineProto.updateData = function (lineData, idx, seriesScope) {

        this.updateZoomScale(lineData, idx);

        var seriesModel = lineData.hostModel;

        var line = this.childAt(0);
        var resultPoints = this._breakPoints(lineData, idx);
        var points = resultPoints.points;
        var target = {
            shape: {
                points: points
            }
        };
        // graphic.updateProps(line, target, seriesModel, idx);
        line.setShape('segs', points);
        this._updateLabel(lineData, resultPoints.labels, idx);

        this._updateCommonStl(lineData, idx, seriesScope);
    };

    polylineProto._updateCommonStl = function (lineData, idx, seriesScope) {
        var line = this.childAt(0);
        var itemModel = lineData.getItemModel(idx);
        var rawDataItem = lineData.getRawDataItem(idx);

        var visualColor = lineData.getItemVisual(idx, 'color');

        var lineStyle = seriesScope && seriesScope.lineStyle;
        var hoverLineStyle = seriesScope && seriesScope.hoverLineStyle;

        if (!seriesScope || lineData.hasItemOption) {
            lineStyle = itemModel.getModel('lineStyle').getLineStyle();
            hoverLineStyle = itemModel.getModel('lineStyle.emphasis').getLineStyle();

            if (rawDataItem.type == '1') {
                lineStyle.lineDash = [lineStyle.lineWidth * 4, lineStyle.lineWidth * 4];
            }
        }

        if(lineStyle.lineWidth){
            lineStyle = _util.clone(lineStyle);
            lineStyle.lineWidth *= this._zoomScale;
        }

        line.useStyle(_util.defaults(
            {
                strokeNoScale: true,
                fill: 'none',
                stroke: visualColor
            },
            lineStyle
        ));
        var isHover = lineData.hostModel.get('isHover');
        if (isHover !== false) {
            line.hoverStyle = hoverLineStyle;

            graphic.setHoverStyle(this);
        }
    };

    polylineProto.updateLayout = function (lineData, idx, ecModel, api) {

        this.updateZoomScale(lineData, idx);

        var polyline = this.childAt(0);
        var resultPoints = this._breakPoints(lineData, idx);
        polyline.setShape('segs', resultPoints.points);

        var itemModel = lineData.getItemModel(idx);
        var lineStyle = itemModel.getModel('lineStyle').getLineStyle();

        var lineWidth = lineStyle.lineWidth;
        if(!isNaN(lineWidth)){
            polyline.setStyle({
                lineWidth: lineWidth * this._zoomScale
            })
        }

        this._updateLabel(lineData, resultPoints.labels, idx);
    };

    polylineProto.updateZoomScale = function(lineData, idx){
        //缩放
        var seriesModel = lineData.hostModel;
        var ecModel = seriesModel.ecModel;
        var scale = seriesModel.get('scale') || 1;
        var geo = ecModel.getComponent('geo');
        var zoom = geo.coordinateSystem._zoom;
        this._zoomScale = Math.min(scale * zoom, 1);
    }

    _util.inherits(IsoPolyline, graphic.Group);

    hwchart.chart.helper.IsoPolyline = IsoPolyline;
});