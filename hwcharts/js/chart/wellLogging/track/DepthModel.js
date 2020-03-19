Vmd.define('hwchart.chart.wellLogging.track.DepthModel', {
    requires: [
        'hwchart.util.format',
        'hwchart.chart.wellLogging.track.BaseModel'
    ]
}, function (scope) {
    var zrUtil = zrender.util;
    var formatUtil = hwchart.util.format;
    var BaseModel = hwchart.chart.wellLogging.track.BaseModel;
    function preprocessOption(seriesOpt) {
        var requestCompleted = seriesOpt.requestCompleted;
        // if (data && data[0]) {
        //
        // }
    }
    var DepthModel = BaseModel.extend({

        type: 'wellLogging.depth',

        /**
         * @protected
         */
        defaultOption: {
        },
        getHeaderHeight: function(){

            var headerStyleModel = this.headerStyleModel;
            if(headerStyleModel.get('show') === false){
                return 0;
            }
            var padding = formatUtil.normalizeCssArray(headerStyleModel.get('padding'));
            var textStyleModel = headerStyleModel.getModel('textStyle');
            var textRect = textStyleModel.getTextRect(this.get('name'));
            var textHeight = textRect.height || textRect.lineHeight;
            return textHeight + padding[0] + padding[2] + textStyleModel.get('textPadding') * 2;
        }
    });

    hwchart.chart.wellLogging.track.DepthModel = DepthModel;
})