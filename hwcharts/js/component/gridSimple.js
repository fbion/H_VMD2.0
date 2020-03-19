Vmd.define('hwchart.component.gridSimple', {
    requires: [
        'hwchart.component.Axis',
        'hwchart.coord.cartesian.Grid',
        'hwchart.util.graphic'
    ]

}, function () {

  
    var zrUtil = zrender.util;

    var graphic = hwchart.util.graphic;

  
   
    // Grid view
    hwcharts.extendComponentView({
        type: 'grid',
        render: function (gridModel, ecModel) {
            this.group.removeAll();

            if (gridModel.get('show')) {
                this.group.add(new graphic.Rect({
                    shape: gridModel.coordinateSystem.getRect(),
                    style: zrUtil.defaults({
                        fill: gridModel.get('backgroundColor')
                    }, gridModel.getItemStyle()),
                    silent: true,
                    z2: -1
                }));
            }
        }
    });
    hwcharts.registerPreprocessor(function (option) {
        // Only create grid when need
        if (option.xAxis && option.yAxis && !option.grid) {
            option.grid = {};
        }
    });

})