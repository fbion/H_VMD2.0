Vmd.define('hwchart.chart.bar.BarSeries', {
    requires: [
        'hwchart.chart.bar.BaseBarSeries'
    ]

}, function () {
    var BaseBarSeries=hwchart.chart.bar.BaseBarSeries;
    
    var _default = BaseBarSeries.extend({
        type: 'series.bar',
        dependencies: ['grid', 'polar'],
        brushSelector: 'rect',

        /**
         * @override
         */
        getProgressive: function () {
            // Do not support progressive in normal mode.
            return this.get('large') ? this.get('progressive') : false;
        },

        /**
         * @override
         */
        getProgressiveThreshold: function () {
            // Do not support progressive in normal mode.
            var progressiveThreshold = this.get('progressiveThreshold');
            var largeThreshold = this.get('largeThreshold');

            if (largeThreshold > progressiveThreshold) {
                progressiveThreshold = largeThreshold;
            }

            return progressiveThreshold;
        },
        defaultOption: {
            // If clipped
            // Only available on cartesian2d
            clip: true,
            // If use caps on two sides of bars
            // Only available on tangential polar bar
            roundCap: false
        }
    });

    
    hwchart.chart.bar.BarSeries = _default;
})