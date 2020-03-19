
Vmd.define('hwchart.chart.helper.createClipPathFromCoordSys', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.number'
    ]

}, function () {


    var graphic = hwchart.util.graphic;

    var _number = hwchart.util.number;

    var round = _number.round;

   
    function createGridClipPath(cartesian, hasAnimation, seriesModel) {
        var rect = cartesian.getArea();
        var isHorizontal = cartesian.getBaseAxis().isHorizontal();
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var height = rect.height;
        var lineWidth = seriesModel.get('lineStyle.width') || 2; // Expand the clip path a bit to avoid the border is clipped and looks thinner

        x -= lineWidth / 2;
        y -= lineWidth / 2;
        width += lineWidth;
        height += lineWidth;
        var clipPath = new graphic.Rect({
            shape: {
                x: x,
                y: y,
                width: width,
                height: height
            }
        });

        if (hasAnimation) {
            clipPath.shape[isHorizontal ? 'width' : 'height'] = 0;
            graphic.initProps(clipPath, {
                shape: {
                    width: width,
                    height: height
                }
            }, seriesModel);
        }

        return clipPath;
    }

    function createPolarClipPath(polar, hasAnimation, seriesModel) {
        var sectorArea = polar.getArea(); // Avoid float number rounding error for symbol on the edge of axis extent.

        var clipPath = new graphic.Sector({
            shape: {
                cx: round(polar.cx, 1),
                cy: round(polar.cy, 1),
                r0: round(sectorArea.r0, 1),
                r: round(sectorArea.r, 1),
                startAngle: sectorArea.startAngle,
                endAngle: sectorArea.endAngle,
                clockwise: sectorArea.clockwise
            }
        });

        if (hasAnimation) {
            clipPath.shape.endAngle = sectorArea.startAngle;
            graphic.initProps(clipPath, {
                shape: {
                    endAngle: sectorArea.endAngle
                }
            }, seriesModel);
        }

        return clipPath;
    }

    function createClipPath(coordSys, hasAnimation, seriesModel) {
        if (!coordSys) {
            return null;
        } else if (coordSys.type === 'polar') {
            return createPolarClipPath(coordSys, hasAnimation, seriesModel);
        } else if (coordSys.type === 'cartesian2d') {
            return createGridClipPath(coordSys, hasAnimation, seriesModel);
        }

        return null;
    }

    var exports = {};
    exports.createGridClipPath = createGridClipPath;
    exports.createPolarClipPath = createPolarClipPath;
    exports.createClipPath = createClipPath;

    hwchart.chart.helper.createClipPathFromCoordSys = exports;
})
