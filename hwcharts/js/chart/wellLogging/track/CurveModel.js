Vmd.define('hwchart.chart.wellLogging.track.CurveModel', {
    requires: [
        'hwchart.util.format',
        'hwchart.chart.wellLogging.track.BaseModel'
    ]
}, function (scope) {
    var zrUtil = zrender.util;
    var formatUtil = hwchart.util.format;
    var BaseModel = hwchart.chart.wellLogging.track.BaseModel;

    var CurveModel = BaseModel.extend({

        type: 'wellLogging.curve',

        /**
         * @protected
         */
        defaultOption: {

            scaleType: 'lin',
            leftScale: 0,
            rightScale: 100,
            logBase: 10,

            requestCompleted: false,
            regionCurveFilled:[],
            mirror:false,
            secondScale:0,
            itemStyle:{
                header:{
                    padding: [5,0,5,0],
                    labelDistance: 2,  //标签距离线的位置
                    borderWidth: 0,
                    textStyle:{
                        textPadding: 3
                    }
                },
                lineStyle:{

                }
            }
        },

        getHeaderHeight: function(){
            var headerStyleModel = this.headerStyleModel;
            if(headerStyleModel.get('show') === false){
                return 0;
            }

            var labelDistance = headerStyleModel.get('labelDistance');
            var padding = formatUtil.normalizeCssArray(headerStyleModel.get('padding'));
            var textStyleModel = headerStyleModel.getModel('textStyle');
            var textRect = textStyleModel.getTextRect(this.get('name'));
            var textHeight = textRect.height || textRect.lineHeight;
            var lineWidth = this.get("lineStyle.width") || 0;
            return textHeight * 2 + labelDistance * 2 + padding[0] + padding[2] + textStyleModel.get('textPadding') * 2 + lineWidth;
        }
    });

    hwchart.chart.wellLogging.track.CurveModel = CurveModel;
})