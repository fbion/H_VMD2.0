Vmd.define('hwchart.chart.helper.LinePath', {
    requires: [
        'hwchart.util.graphic'
    ]
   
}, function () {
    var graphic = hwchart.util.graphic;
    var vec2 = zrender.vector;


    /**
     * Line path for bezier and straight line draw
     */
    var straightLineProto = graphic.Line.prototype;
    var bezierCurveProto = graphic.BezierCurve.prototype;

    function isLine(shape) {
        return isNaN(+shape.cpx1) || isNaN(+shape.cpy1);
    }

    var _default = graphic.extendShape({
        type: 'ec-line',
        style: {
            stroke: '#000',
            fill: null
        },
        shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            percent: 1,
            cpx1: null,
            cpy1: null
        },
        buildPath: function (ctx, shape) {
            this[isLine(shape) ? '_buildPathLine' : '_buildPathCurve'](ctx, shape);
        },
        _buildPathLine: straightLineProto.buildPath,
        _buildPathCurve: bezierCurveProto.buildPath,
        pointAt: function (t) {
            return this[isLine(this.shape) ? '_pointAtLine' : '_pointAtCurve'](t);
        },
        _pointAtLine: straightLineProto.pointAt,
        _pointAtCurve: bezierCurveProto.pointAt,
        tangentAt: function (t) {
            var shape = this.shape;
            var p = isLine(shape) ? [shape.x2 - shape.x1, shape.y2 - shape.y1] : this._tangentAtCurve(t);
            return vec2.normalize(p, p);
        },
        _tangentAtCurve: bezierCurveProto.tangentAt
    });

    hwchart.chart.helper.LinePath = _default;
})