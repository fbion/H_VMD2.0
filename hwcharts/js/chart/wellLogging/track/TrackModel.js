Vmd.define('hwchart.chart.wellLogging.track.TrackModel', {
    requires: [
        'hwchart.util.format',
        'hwchart.chart.wellLogging.track.BaseModel'
    ]
}, function (scope) {
    var zrUtil = zrender.util;
    var formatUtil = hwchart.util.format;
    var BaseModel = hwchart.chart.wellLogging.track.BaseModel;

    var TrackModel = BaseModel.extend({

        type: 'wellLogging.track',

        /**
         * @protected
         */
        defaultOption: {

            width: 150,

            scaleType: 'lin',
            leftScale: 0,
            rightScale: 100,
            logBase: 10,

            itemStyle:{
                title:{
                    show: true,
                    padding: 10,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#000',
                    textStyle:{
                        fontSize: 16,
                        color: 'black',
                        textAlign: 'center',
                        textPadding: 5
                    }
                },
                header:{
                    padding: 10,
                    backgroundColor: 'none',
                    borderWidth: 1,
                    borderColor: '#000',
                    textStyle:{
                        fontSize: 12,
                        color: 'black',
                        // textAlign: 'center',
                        textPadding: 5
                    }
                },
                grid:{
                    vertical:{
                        cols: 10,
                        //细线
                        thin:{
                            borderWidth: 1,
                            borderColor: '#eee'
                        },
                        //粗线
                        thick:{
                            borderWidth: 1,
                            borderColor: '#aaa'
                        },
                    },
                    horizontal:{
                        interval: 'auto',
                        //细线
                        thin:{
                            borderWidth: 0.8,
                            borderColor: '#eee'
                        },
                        //粗线
                        thick:{
                            borderWidth: 1,
                            borderColor: '#aaa'
                        },
                        middle:{
                            borderWidth: 1,
                            borderColor: '#ddd'
                        }
                    },
                }
            }
        },

        /**
         * @protected
         */
        doInit: function (rawOption) {
            this.titleStyleModel = this.getModel('itemStyle.title');

            TrackModel.superApply(this, 'doInit', arguments);
        },

        getTitleHeight: function(){
            var titleStyleModel = this.titleStyleModel;
            if(titleStyleModel.get('show') === false){
                return 0;
            }
            var textStyle = titleStyleModel.get('textStyle');

            var padding = formatUtil.normalizeCssArray(titleStyleModel.get('padding'));
            return textStyle.fontSize + textStyle.textPadding * 2 + padding[0] + padding[2];
        },

        getHeaderHeight: function(){
            var headerStyleModel = this.headerStyleModel;
            if(headerStyleModel.get('show') === false){
                return 0;
            }
            var textStyle = headerStyleModel.get('textStyle');

            var padding = formatUtil.normalizeCssArray(headerStyleModel.get('padding'));
            var textStyleModel = headerStyleModel.getModel('textStyle');
            var textRect = textStyleModel.getTextRect(this.get('name'));
            var textHeight = textRect.height || textRect.lineHeight;
            return textHeight + padding[0] + padding[2] + textStyleModel.get('textPadding') * 2;
        }
    });

    hwchart.chart.wellLogging.track.TrackModel = TrackModel;
})