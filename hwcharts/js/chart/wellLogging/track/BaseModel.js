Vmd.define('hwchart.chart.wellLogging.track.BaseModel', {
    requires: [
        'hwchart.util.model',
        'hwchart.util.format',
        'hwchart.util.clazz',
        'hwchart.coord.cartesian.Cartesian2D',
        'hwchart.coord.cartesian.AxisModel',
        'hwchart.coord.axisHelper',
        'hwchart.coord.cartesian.Axis2D'
    ]
}, function (scope) {
    var zrUtil = zrender.util;
    var formatUtil = hwchart.util.format;
    var classUtil = hwchart.util.clazz;
    var Cartesian2D = hwchart.coord.cartesian.Cartesian2D;
    var AxisModel = hwchart.coord.cartesian.AxisModel;
    var axisHelper = hwchart.coord.axisHelper;
    var Axis2D = hwchart.coord.cartesian.Axis2D;

    var get = classUtil.get;

    var BaseModel = hwcharts.extendComponentModel({
        
        type: 'wellLogging.base',

        _data: null,

        /**
         * @protected
         */
        defaultOption: {
            itemStyle:{
                header:{
                    padding: 5,
                    backgroundColor: 'none',
                    borderWidth: 1,
                    borderColor: '#000',
                    textStyle:{
                        fontSize: 12,
                        color: 'black',
                        textAlign: 'center',
                        textPadding: 5
                    }
                },
                body:{
                    backgroundColor: 'none',
                    borderWidth: 1,
                    borderColor: '#000'
                }
            },
            SliderZoomStyle:{

            }
        },

        /**
         * @override
         */
        init: function (option, parentModel, ecModel) {
            /**
             * @readOnly
             */
            this.coordinateSystem;

            var rawOption = retrieveRaw(option);

            this.mergeDefaultAndTheme(option, ecModel);

            this.doInit(rawOption, ecModel);
        },

        /**
         * @override
         */
        mergeOption: function (newOption, ecModel) {
            var rawOption = retrieveRaw(newOption);

            //FIX #2591
            zrUtil.merge(this.option, newOption, true);

            this.doInit(rawOption, ecModel);
        },

        /**
         * @protected
         */
        doInit: function (rawOption, ecModel) {
            var thisOption = this.option;
            this.headerStyleModel = this.getModel('itemStyle.header');
            this.bodyStyleModel = this.getModel('itemStyle.body');

            this._initCartesian(ecModel);
        },

        setData: function(data){
            this._data = data;
        },

        getData: function(){
            return this._data;
        },

        _initCartesian: function(ecModel) {

            var cartesian = new Cartesian2D();

            //刻度轴
            var scaleType = {'lin': 'value', 'log': 'log'}[this.get('scaleType')] || 'value';
            var left = this.get('leftScale');
            var right = this.get('rightScale');
            var xaxisModel = new AxisModel({
                type: scaleType,
                min: Math.min(left,right),
                max: Math.max(left,right),
                logBase: this.get('logBase') || 10
            }, this, ecModel);
            var xAxis = new Axis2D(
                'x', axisHelper.createScaleByModel(xaxisModel),
                [0, 0],
                xaxisModel.get('type'),
                ''
            );
            xAxis.model = xaxisModel;

            xaxisModel.axis = xAxis;

            axisHelper.niceScaleExtent(xAxis.scale, xaxisModel);

            cartesian.addAxis(xAxis);
            cartesian.addAxis(this.parentModel.getVAxis());
            this.coordinateSystem = cartesian;
        },

        getTitleHeight: function(){},

        getHeaderHeight: function(){}
    });

    function retrieveRaw(option) {
        var ret = {};
        return ret;
    }

    hwchart.chart.wellLogging.track.BaseModel = BaseModel;
})