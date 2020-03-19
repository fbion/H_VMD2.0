Vmd.define('hwchart.chart.Bar', {
    requires: [
        'hwchart.coord.cartesian.Grid',
        'hwchart.chart.bar.BarSeries',
        'hwchart.chart.bar.BarView',
        'hwchart.layout.barGrid',
        'hwchart.component.Grid',
        'hwchart.component.gridSimple'
    ]

}, function () {


    var zrUtil = zrender.util;

    var _barGrid = hwchart.layout.barGrid;

    var layout = _barGrid.layout;
    var largeLayout = _barGrid.largeLayout;




    // In case developer forget to include grid component
    hwcharts.registerLayout(hwcharts.PRIORITY.VISUAL.LAYOUT, zrUtil.curry(layout, 'bar')); // Use higher prority to avoid to be blocked by other overall layout, which do not
    // only exist in this module, but probably also exist in other modules, like `barPolar`.

    hwcharts.registerLayout(hwcharts.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, largeLayout);
    hwcharts.registerVisual({
        seriesType: 'bar',
        reset: function (seriesModel) {
            // Visual coding for legend
            seriesModel.getData().setVisual('legendSymbol', 'roundRect');
        }
    });

})