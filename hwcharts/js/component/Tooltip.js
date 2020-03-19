Vmd.define('hwchart.component.Tooltip', {
    requires: [
        'hwchart.component.tooltip.TooltipModel',
        'hwchart.component.tooltip.TooltipView',
        'hwchart.component.axisPointer'
    ]
}, function(){
    // Show tip action
    /**
     * @action
     * @property {string} type
     * @property {number} seriesIndex
     * @property {number} dataIndex
     * @property {number} [x]
     * @property {number} [y]
     */
    
    hwcharts.registerAction(
        {
            type: 'showTip',
            event: 'showTip',
            update: 'tooltip:manuallyShowTip'
        },
        // noop
        function () { }
    );
    // Hide tip action
    hwcharts.registerAction(
        {
            type: 'hideTip',
            event: 'hideTip',
            update: 'tooltip:manuallyHideTip'
        },
        // noop
        function () { }
    );
})