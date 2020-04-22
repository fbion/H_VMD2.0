Vmd.define('hwchart.util.shape.segments', {
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
        type: 'segment',
        shape: {
            curveness: 0,
            segs: []
        },
        buildPath: function (path, shape) {
            var segs = shape.segs || [];

            for (var i = 0; i < segs.length;) {
                var count = segs[i++];

                if (count > 0) {
                    path.moveTo(segs[i++], segs[i++]);

                    for (var k = 1; k < count; k++) {
                        path.lineTo(segs[i++], segs[i++]);
                    }
                }
            }
        }
    });

    hwchart.util.shape.segments = _default;
})
