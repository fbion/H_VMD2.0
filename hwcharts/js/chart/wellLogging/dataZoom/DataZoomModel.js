Vmd.define('hwchart.chart.wellLogging.dataZoom.DataZoomModel', {
    requires: [
        'hwchart.util.model',
        'hwchart.component.dataZoom.helper',
        'hwchart.chart.wellLogging.dataZoom.AxisProxy'
    ]

}, function () {
    var zrUtil = zrender.util;
    var env = zrender.env;

    var modelUtil = hwchart.util.model;
    var helper = hwchart.component.dataZoom.helper;
    var AxisProxy = hwchart.chart.wellLogging.dataZoom.AxisProxy;
    var each = zrUtil.each;
    var eachAxisDim = helper.eachAxisDim;

    var DataZoomModel = hwcharts.extendComponentModel({

        type: 'wellLogging.dataZoom',

        layoutMode: 'box',

        /**
         * @protected
         */
        defaultOption: {
            show: true,

            // ph => placeholder. Using placehoder here because
            // deault value can only be drived in view stage.
            right: 'ph',  // Default align to grid rect.
            top: 'ph',    // Default align to grid rect.
            width: 'ph',  // Default align to grid rect.
            height: 'ph', // Default align to grid rect.
            left: null,   // Default align to grid rect.
            bottom: null, // Default align to grid rect.

            backgroundColor: 'rgba(47,69,84,0)',    // Background of slider zoom component.
            // dataBackgroundColor: '#ddd',         // Background coor of data shadow and border of box,
            // highest priority, remain for compatibility of
            // previous version, but not recommended any more.
            dataBackground: {
                lineStyle: {
                    color: '#2f4554',
                    width: 0.5,
                    opacity: 0.3
                },
                areaStyle: {
                    color: 'rgba(47,69,84,0.3)',
                    opacity: 0.3
                }
            },
            borderColor: '#ddd',                    // border color of the box. For compatibility,
            // if dataBackgroundColor is set, borderColor
            // is ignored.

            fillerColor: 'rgba(167,183,204,0.4)',     // Color of selected area.
            // handleColor: 'rgba(89,170,216,0.95)',     // Color of handle.
            // handleIcon: 'path://M4.9,17.8c0-1.4,4.5-10.5,5.5-12.4c0-0.1,0.6-1.1,0.9-1.1c0.4,0,0.9,1,0.9,1.1c1.1,2.2,5.4,11,5.4,12.4v17.8c0,1.5-0.6,2.1-1.3,2.1H6.1c-0.7,0-1.3-0.6-1.3-2.1V17.8z',
            handleIcon: 'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',
            // Percent of the slider height
            handleSize: '100%',

            handleStyle: {
                color: '#a7b7cc'
            },

            labelPrecision: null,
            labelFormatter: null,
            showDetail: true,
            showDataShadow: 'auto',                 // Default auto decision.
            realtime: true,
            zoomLock: false,                        // Whether disable zoom.
            textStyle: {
                color: '#333'
            }
        },

        /**
         * @override
         */
        init: function (option, parentModel, ecModel) {
            /**
             * key like x_0, y_1
             * @private
             * @type {Object}
             */
            this._dataIntervalByAxis = {};
            /**
             * @private
             */

            this._dataInfo = {};
            /**
             * key like x_0, y_1
             * @private
             */

            this._axisProxies = {};
            /**
             * @readOnly
             */

            this.textStyleModel;
            /**
             * @private
             */

            this._autoThrottle = true;
            /**
             * It is `[rangeModeForMin, rangeModeForMax]`.
             * The optional values for `rangeMode`:
             * + `'value'` mode: the axis extent will always be determined by
             *     `dataZoom.startValue` and `dataZoom.endValue`, despite
             *     how data like and how `axis.min` and `axis.max` are.
             * + `'percent'` mode: `100` represents 100% of the `[dMin, dMax]`,
             *     where `dMin` is `axis.min` if `axis.min` specified, otherwise `data.extent[0]`,
             *     and `dMax` is `axis.max` if `axis.max` specified, otherwise `data.extent[1]`.
             *     Axis extent will be determined by the result of the percent of `[dMin, dMax]`.
             *
             * For example, when users are using dynamic data (update data periodically via `setOption`),
             * if in `'value`' mode, the window will be kept in a fixed value range despite how
             * data are appended, while if in `'percent'` mode, whe window range will be changed alone with
             * the appended data (suppose `axis.min` and `axis.max` are not specified).
             *
             * @private
             */

            this._rangePropMode = ['percent', 'percent'];
            var inputRawOption = retrieveRawOption(option);
            /**
             * Suppose a "main process" start at the point that model prepared (that is,
             * model initialized or merged or method called in `action`).
             * We should keep the `main process` idempotent, that is, given a set of values
             * on `option`, we get the same result.
             *
             * But sometimes, values on `option` will be updated for providing users
             * a "final calculated value" (`dataZoomProcessor` will do that). Those value
             * should not be the base/input of the `main process`.
             *
             * So in that case we should save and keep the input of the `main process`
             * separately, called `settledOption`.
             *
             * For example, consider the case:
             * (Step_1) brush zoom the grid by `toolbox.dataZoom`,
             *     where the original input `option.startValue`, `option.endValue` are earsed by
             *     calculated value.
             * (Step)2) click the legend to hide and show a series,
             *     where the new range is calculated by the earsed `startValue` and `endValue`,
             *     which brings incorrect result.
             *
             * @readOnly
             */

            this.settledOption = inputRawOption;
            this.mergeDefaultAndTheme(option, ecModel);
            this.doInit(inputRawOption);
        },

        /**
         * @override
         */
        mergeOption: function (newOption) {
            var inputRawOption = retrieveRawOption(newOption); //FIX #2591

            zrUtil.merge(this.option, newOption, true);
            zrUtil.merge(this.settledOption, inputRawOption, true);
            this.doInit(inputRawOption);
        },

        /**
         * @protected
         */
        doInit: function (inputRawOption) {
            var thisOption = this.option; // Disable realtime view update if canvas is not supported.

            if (!env.canvasSupported) {
                thisOption.realtime = false;
            }

            this._setDefaultThrottle(inputRawOption);

            updateRangeUse(this, inputRawOption);
            var settledOption = this.settledOption;
            each([['start', 'startValue'], ['end', 'endValue']], function (names, index) {
                // start/end has higher priority over startValue/endValue if they
                // both set, but we should make chart.setOption({endValue: 1000})
                // effective, rather than chart.setOption({endValue: 1000, end: null}).
                if (this._rangePropMode[index] === 'value') {
                    thisOption[names[0]] = settledOption[names[0]] = null;
                } // Otherwise do nothing and use the merge result.

            }, this);
            this.textStyleModel = this.getModel('textStyle');

            this._resetTarget();

            this._giveAxisProxies();
        },

        /**
         * @private
         */
        _giveAxisProxies: function () {
            var axisProxies = this._axisProxies;
            var seriesModel = this.parentModel;
            this.eachTargetAxis(function (dimNames, axisIndex, dataZoomModel, ecModel) {
                var axisModel = this.dependentModels[dimNames.axis][axisIndex]; // If exists, share axisProxy with other dataZoomModels.

                var axisProxy = axisModel.__dzAxisProxy || ( // Use the first dataZoomModel as the main model of axisProxy.
                        axisModel.__dzAxisProxy = new AxisProxy(dimNames.name, axisIndex, this, ecModel)); // FIXME
                // dispose __dzAxisProxy

                axisProxy._seriesModel = seriesModel;

                axisProxies[dimNames.name + '_' + axisIndex] = axisProxy;
            }, this);
        },

        /**
         * @private
         */
        _resetTarget: function () {
            var thisOption = this.option;

            var autoMode = this._judgeAutoMode();

            eachAxisDim(function (dimNames) {
                var axisIndexName = dimNames.axisIndex;
                thisOption[axisIndexName] = modelUtil.normalizeToArray(thisOption[axisIndexName]);
            }, this);

            if (autoMode === 'axisIndex') {
                this._autoSetAxisIndex();
            } else if (autoMode === 'orient') {
                this._autoSetOrient();
            }
        },

        /**
         * @private
         */
        _judgeAutoMode: function () {
            // Auto set only works for setOption at the first time.
            // The following is user's reponsibility. So using merged
            // option is OK.
            var thisOption = this.option;
            var hasIndexSpecified = false;
            eachAxisDim(function (dimNames) {
                // When user set axisIndex as a empty array, we think that user specify axisIndex
                // but do not want use auto mode. Because empty array may be encountered when
                // some error occured.
                if (thisOption[dimNames.axisIndex] != null) {
                    hasIndexSpecified = true;
                }
            }, this);
            var orient = thisOption.orient;

            if (orient == null && hasIndexSpecified) {
                return 'orient';
            } else if (!hasIndexSpecified) {
                if (orient == null) {
                    thisOption.orient = 'horizontal';
                }

                return 'axisIndex';
            }
        },

        /**
         * @private
         */
        _autoSetAxisIndex: function () {
            var autoAxisIndex = true;
            var orient = this.get('orient', true);
            var thisOption = this.option;
            var dependentModels = this.dependentModels;

            if (autoAxisIndex) {
                // Find axis that parallel to dataZoom as default.
                var dimName = orient === 'vertical' ? 'y' : 'x';

                if (dependentModels[dimName + 'Axis'].length) {
                    thisOption[dimName + 'AxisIndex'] = [0];
                    autoAxisIndex = false;
                } else {
                    each(dependentModels.singleAxis, function (singleAxisModel) {
                        if (autoAxisIndex && singleAxisModel.get('orient', true) === orient) {
                            thisOption.singleAxisIndex = [singleAxisModel.componentIndex];
                            autoAxisIndex = false;
                        }
                    });
                }
            }

            if (autoAxisIndex) {
                // Find the first category axis as default. (consider polar)
                eachAxisDim(function (dimNames) {
                    if (!autoAxisIndex) {
                        return;
                    }

                    var axisIndices = [];
                    var axisModels = this.dependentModels[dimNames.axis];

                    if (axisModels.length && !axisIndices.length) {
                        for (var i = 0, len = axisModels.length; i < len; i++) {
                            if (axisModels[i].get('type') === 'category') {
                                axisIndices.push(i);
                            }
                        }
                    }

                    thisOption[dimNames.axisIndex] = axisIndices;

                    if (axisIndices.length) {
                        autoAxisIndex = false;
                    }
                }, this);
            }

            if (autoAxisIndex) {
                // FIXME
                // 这里是兼容ec2的写法（没指定xAxisIndex和yAxisIndex时把scatter和双数值轴折柱纳入dataZoom控制），
                // 但是实际是否需要Grid.js#getScaleByOption来判断（考虑time，log等axis type）？
                // If both dataZoom.xAxisIndex and dataZoom.yAxisIndex is not specified,
                // dataZoom component auto adopts series that reference to
                // both xAxis and yAxis which type is 'value'.
                this.ecModel.eachSeries(function (seriesModel) {
                    if (this._isSeriesHasAllAxesTypeOf(seriesModel, 'value')) {
                        eachAxisDim(function (dimNames) {
                            var axisIndices = thisOption[dimNames.axisIndex];
                            var axisIndex = seriesModel.get(dimNames.axisIndex);
                            var axisId = seriesModel.get(dimNames.axisId);
                            var axisModel = seriesModel.ecModel.queryComponents({
                                mainType: dimNames.axis,
                                index: axisIndex,
                                id: axisId
                            })[0];
                            axisIndex = axisModel.componentIndex;

                            if (zrUtil.indexOf(axisIndices, axisIndex) < 0) {
                                axisIndices.push(axisIndex);
                            }
                        });
                    }
                }, this);
            }
        },

        /**
         * @private
         */
        _autoSetOrient: function () {
            var dim; // Find the first axis

            this.eachTargetAxis(function (dimNames) {
                !dim && (dim = dimNames.name);
            }, this);
            this.option.orient = dim === 'y' ? 'vertical' : 'horizontal';
        },

        /**
         * @private
         */
        _isSeriesHasAllAxesTypeOf: function (seriesModel, axisType) {
            // FIXME
            // 需要series的xAxisIndex和yAxisIndex都首先自动设置上。
            // 例如series.type === scatter时。
            var is = true;
            eachAxisDim(function (dimNames) {
                var seriesAxisIndex = seriesModel.get(dimNames.axisIndex);
                var axisModel = this.dependentModels[dimNames.axis][seriesAxisIndex];

                if (!axisModel || axisModel.get('type') !== axisType) {
                    is = false;
                }
            }, this);
            return is;
        },

        /**
         * @private
         */
        _setDefaultThrottle: function (inputRawOption) {
            // When first time user set throttle, auto throttle ends.
            if (inputRawOption.hasOwnProperty('throttle')) {
                this._autoThrottle = false;
            }

            if (this._autoThrottle) {
                var globalOption = this.ecModel.option;
                this.option.throttle = globalOption.animation && globalOption.animationDurationUpdate > 0 ? 100 : 20;
            }
        },

        /**
         * @public
         */
        getFirstTargetAxisModel: function () {
            var firstAxisModel;
            eachAxisDim(function (dimNames) {
                if (firstAxisModel == null) {
                    var indices = this.get(dimNames.axisIndex);

                    if (indices.length) {
                        firstAxisModel = this.dependentModels[dimNames.axis][indices[0]];
                    }
                }
            }, this);
            return firstAxisModel;
        },

        /**
         * @public
         * @param {Function} callback param: axisModel, dimNames, axisIndex, dataZoomModel, ecModel
         */
        eachTargetAxis: function (callback, context) {
            var ecModel = this.ecModel;
            eachAxisDim(function (dimNames) {
                each(this.get(dimNames.axisIndex), function (axisIndex) {
                    callback.call(context, dimNames, axisIndex, this, ecModel);
                }, this);
            }, this);
        },

        /**
         * @param {string} dimName
         * @param {number} axisIndex
         * @return {module:hwcharts/component/dataZoom/AxisProxy} If not found, return null/undefined.
         */
        getAxisProxy: function (dimName, axisIndex) {
            return this._axisProxies[dimName + '_' + axisIndex];
        },

        /**
         * @param {string} dimName
         * @param {number} axisIndex
         * @return {module:hwcharts/model/Model} If not found, return null/undefined.
         */
        getAxisModel: function (dimName, axisIndex) {
            var axisProxy = this.getAxisProxy(dimName, axisIndex);
            return axisProxy && axisProxy.getAxisModel();
        },

        /**
         * If not specified, set to undefined.
         *
         * @public
         * @param {Object} opt
         * @param {number} [opt.start]
         * @param {number} [opt.end]
         * @param {number} [opt.startValue]
         * @param {number} [opt.endValue]
         */
        setRawRange: function (opt) {
            var thisOption = this.option;
            var settledOption = this.settledOption;
            each([['start', 'startValue'], ['end', 'endValue']], function (names) {
                // Consider the pair <start, startValue>:
                // If one has value and the other one is `null/undefined`, we both set them
                // to `settledOption`. This strategy enables the feature to clear the original
                // value in `settledOption` to `null/undefined`.
                // But if both of them are `null/undefined`, we do not set them to `settledOption`
                // and keep `settledOption` with the original value. This strategy enables users to
                // only set <end or endValue> but not set <start or startValue> when calling
                // `dispatchAction`.
                // The pair <end, endValue> is treated in the same way.
                if (opt[names[0]] != null || opt[names[1]] != null) {
                    thisOption[names[0]] = settledOption[names[0]] = opt[names[0]];
                    thisOption[names[1]] = settledOption[names[1]] = opt[names[1]];
                }
            }, this);
            updateRangeUse(this, opt);
        },

        /**
         * @public
         * @param {Object} opt
         * @param {number} [opt.start]
         * @param {number} [opt.end]
         * @param {number} [opt.startValue]
         * @param {number} [opt.endValue]
         */
        setCalculatedRange: function (opt) {
            var option = this.option;
            each(['start', 'startValue', 'end', 'endValue'], function (name) {
                option[name] = opt[name];
            });
        },

        /**
         * @public
         * @return {Array.<number>} [startPercent, endPercent]
         */
        getPercentRange: function () {
            var axisProxy = this.findRepresentativeAxisProxy();

            if (axisProxy) {
                return axisProxy.getDataPercentWindow();
            }
        },

        /**
         * @public
         * For example, chart.getModel().getComponent('dataZoom').getValueRange('y', 0);
         *
         * @param {string} [axisDimName]
         * @param {number} [axisIndex]
         * @return {Array.<number>} [startValue, endValue] value can only be '-' or finite number.
         */
        getValueRange: function (axisDimName, axisIndex) {
            if (axisDimName == null && axisIndex == null) {
                var axisProxy = this.findRepresentativeAxisProxy();

                if (axisProxy) {
                    return axisProxy.getDataValueWindow();
                }
            } else {
                return this.getAxisProxy(axisDimName, axisIndex).getDataValueWindow();
            }
        },

        /**
         * @public
         * @param {module:hwcharts/model/Model} [axisModel] If axisModel given, find axisProxy
         *      corresponding to the axisModel
         * @return {module:hwcharts/component/dataZoom/AxisProxy}
         */
        findRepresentativeAxisProxy: function (axisModel) {
            if (axisModel) {
                return axisModel.__dzAxisProxy;
            } // Find the first hosted axisProxy


            var axisProxies = this._axisProxies;

            for (var key in axisProxies) {
                if (axisProxies.hasOwnProperty(key) && axisProxies[key].hostedBy(this)) {
                    return axisProxies[key];
                }
            } // If no hosted axis find not hosted axisProxy.
            // Consider this case: dataZoomModel1 and dataZoomModel2 control the same axis,
            // and the option.start or option.end settings are different. The percentRange
            // should follow axisProxy.
            // (We encounter this problem in toolbox data zoom.)


            for (var key in axisProxies) {
                if (axisProxies.hasOwnProperty(key) && !axisProxies[key].hostedBy(this)) {
                    return axisProxies[key];
                }
            }
        },

        /**
         * @return {Array.<string>}
         */
        getRangePropMode: function () {
            return this._rangePropMode.slice();
        }

    });
    /**
     * Retrieve the those raw params from option, which will be cached separately.
     * becasue they will be overwritten by normalized/calculated values in the main
     * process.
     */

    function retrieveRawOption(option) {
        var ret = {};
        each(['start', 'end', 'startValue', 'endValue', 'throttle'], function (name) {
            option.hasOwnProperty(name) && (ret[name] = option[name]);
        });
        return ret;
    }

    function updateRangeUse(dataZoomModel, inputRawOption) {
        var rangePropMode = dataZoomModel._rangePropMode;
        var rangeModeInOption = dataZoomModel.get('rangeMode');
        each([['start', 'startValue'], ['end', 'endValue']], function (names, index) {
            var percentSpecified = inputRawOption[names[0]] != null;
            var valueSpecified = inputRawOption[names[1]] != null;

            if (percentSpecified && !valueSpecified) {
                rangePropMode[index] = 'percent';
            } else if (!percentSpecified && valueSpecified) {
                rangePropMode[index] = 'value';
            } else if (rangeModeInOption) {
                rangePropMode[index] = rangeModeInOption[index];
            } else if (percentSpecified) {
                // percentSpecified && valueSpecified
                rangePropMode[index] = 'percent';
            } // else remain its original setting.

        });
    }


    hwchart.chart.wellLogging.dataZoom.DataZoomModel = DataZoomModel;
})