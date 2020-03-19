Vmd.define('hwchart.util.shape.largeLine', {
    requires: [
        'hwchart.util.graphic'
    ]
}, function () {


    var _graphic = hwchart.util.graphic;

    var extendShape = _graphic.extendShape;

    
    /**
     * Sausage: similar to sector, but have half circle on both sides
     * @public
     */
    var _default = extendShape({
        type: 'largeLine',
        shape: {
            polyline: true,
            curveness: 0,
            segs: []
        },
        buildPath: function (path, shape) {
            var segs = shape.segs;
            var curveness = shape.curveness;

            if (shape.polyline) {
                for (var i = 0; i < segs.length;) {
                    var count = segs[i++];

                    if (count > 0) {
                        path.moveTo(segs[i++], segs[i++]);

                        for (var k = 1; k < count; k++) {
                            path.lineTo(segs[i++], segs[i++]);
                        }
                    }
                }
            } else {
                for (var i = 0; i < segs.length;) {
                    var x0 = segs[i++];
                    var y0 = segs[i++];
                    var x1 = segs[i++];
                    var y1 = segs[i++];
                    path.moveTo(x0, y0);

                    if (curveness > 0) {
                        var x2 = (x0 + x1) / 2 - (y0 - y1) * curveness;
                        var y2 = (y0 + y1) / 2 - (x1 - x0) * curveness;
                        path.quadraticCurveTo(x2, y2, x1, y1);
                    } else {
                        path.lineTo(x1, y1);
                    }
                }
            }
        },
        findDataIndex: function (x, y) {
            var shape = this.shape;
            var segs = shape.segs;
            var curveness = shape.curveness;

            if (shape.polyline) {
                var dataIndex = 0;

                for (var i = 0; i < segs.length;) {
                    var count = segs[i++];

                    if (count > 0) {
                        var x0 = segs[i++];
                        var y0 = segs[i++];

                        for (var k = 1; k < count; k++) {
                            var x1 = segs[i++];
                            var y1 = segs[i++];

                            if (lineContain.containStroke(x0, y0, x1, y1)) {
                                return dataIndex;
                            }
                        }
                    }

                    dataIndex++;
                }
            } else {
                var dataIndex = 0;

                for (var i = 0; i < segs.length;) {
                    var x0 = segs[i++];
                    var y0 = segs[i++];
                    var x1 = segs[i++];
                    var y1 = segs[i++];

                    if (curveness > 0) {
                        var x2 = (x0 + x1) / 2 - (y0 - y1) * curveness;
                        var y2 = (y0 + y1) / 2 - (x1 - x0) * curveness;

                        if (quadraticContain.containStroke(x0, y0, x2, y2, x1, y1)) {
                            return dataIndex;
                        }
                    } else {
                        if (lineContain.containStroke(x0, y0, x1, y1)) {
                            return dataIndex;
                        }
                    }

                    dataIndex++;
                }
            }

            return -1;
        }
    });

    hwchart.util.shape.largeLine = _default;
})
