Vmd.define('hwchart.component.marker.MarkLineModel', {
    requires: [
        'hwchart.component.marker.MarkerModel'
    ]
}, function () {


    var MarkerModel = hwchart.component.marker.MarkerModel;

    
    var _default = MarkerModel.extend({
        type: 'markLine',
        defaultOption: {
            zlevel: 0,
            z: 5,
            symbol: ['circle', 'arrow'],
            symbolSize: [8, 16],
            //symbolRotate: 0,
            precision: 2,
            tooltip: {
                trigger: 'item'
            },
            label: {
                show: true,
                position: 'end'
            },
            lineStyle: {
                type: 'dashed'
            },
            emphasis: {
                label: {
                    show: true
                },
                lineStyle: {
                    width: 3
                }
            },
            animationEasing: 'linear'
        }
    });

    

    hwchart.component.marker.MarkLineModel = _default;
})