Vmd.define('hwchart.component.Legend', {
    requires: [
        'hwchart.component.legend.LegendModel',
        'hwchart.component.legend.LegendView',
        'hwchart.component.legend.legendAction',
        'hwchart.component.legend.legendFilter',
        'hwchart.model.Component'
    ]
}, function () {
    

    var Component = hwchart.model.Component;
    var legendFilter = hwchart.component.legend.legendFilter;
  
    // Do not contain scrollable legend, for sake of file size.
    // Series Filter
    hwcharts.registerProcessor(hwcharts.PRIORITY.PROCESSOR.SERIES_FILTER, legendFilter);
    Component.registerSubTypeDefaulter('legend', function () {
        // Default 'plain' when no type specified.
        return 'plain';
    });
})
