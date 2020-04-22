Vmd.define('hwchart.chart.wellLogging.track.FillModel', {
    requires: [
        'hwchart.util.format',
        'hwchart.chart.wellLogging.track.BaseModel'
    ]
}, function (scope) {
    var zrUtil = zrender.util;
    var formatUtil = hwchart.util.format;
    var BaseModel = hwchart.chart.wellLogging.track.BaseModel;

    var FillModel = BaseModel.extend({

        type: 'wellLogging.fill',

        /**
         * @protected
         */
        defaultOption: {

            scaleType: 'lin',
            leftScale: 0,
            rightScale: 100,
            logBase: 10,

            requestCompleted: false,
            mirror: false,
            secondScale: 0,

            //道头填充
            headerFill:{
                type: 'both', //cover 覆盖道头刻度 both 同时显示，在刻度线下方填充
                text: '声波时差', //覆盖填充时显示的文本，默认显示道名
                borderWidth: 1,
                borderColor: '#000',
                textStyle:{ //文本样式
                    // color: 'black',
                    // fontStyle: 'normal',
                    // fontWeight: 'normal',
                    // fontFamily: 'sans-serif',
                    // fontSize: 12,
                    textPadding: 2,
                    textAlign: 'center',
                    textVerticalAlign: 'middle',
                    textBackgroundColor: 'white',
                    truncate:{
                        ellipsis:'...'
                    }
                }
            },
            //填充区域
            // curveFills:[{
            //     name: '',
            //     fillTo:'', //填充到...  'left'左填充|right右填充|曲线名
            //     fillStyle: "red", //纯色
            //     fillStyle: { //渐变
            //         type: "linear",
            //         x: 0,
            //         y: 0,
            //         x2: 1,
            //         y2: 0,
            //         colorStops: [{
            //             offset: 0,
            //             color: "red"
            //         }, {
            //             offset: 1,
            //             color: "blue"
            //         }],
            //         global: false
            //     },
            //     fillStyle: "WCJW-CCB0022H" //面符号
            // }],

            itemStyle:{
                header:{
                    padding: [5,0,10,0],
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

    hwchart.chart.wellLogging.track.FillModel = FillModel;
})