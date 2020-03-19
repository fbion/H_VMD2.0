Vmd.define('hwchart.util.BreakPolyline',{},function () {


  var graphic = hwchart.util.graphic;


  /**
   * @module zrender/graphic/shape/Polyline
   */
  var BreakPolyline = graphic.extendShape({
    type: 'labelpolyline',
    shape: {
      points: null,
      smooth: false,
      smoothConstraint: null
    },
    style: {
      stroke: '#000',
      fill: null
    },
    buildPath: function (ctx, shape, closePath) {
      var points = shape.points;
      // var smooth = shape.smooth;

      if (points && points.length >= 2) {

        ctx.moveTo(points[0][0], points[0][1]);

        for (var i = 1, l = points.length; i < l; i++) {
          if (points[i][2] === 0) {
            ctx.moveTo(points[i][0], points[i][1]);
          }
          else {
            ctx.lineTo(points[i][0], points[i][1]);
          }
        }

        closePath && ctx.closePath();

      }
    }});
  hwchart.util.BreakPolyline = BreakPolyline;
});
