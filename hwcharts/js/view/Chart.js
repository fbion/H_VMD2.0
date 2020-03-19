Vmd.define('hwchart.view.Chart', {
    requires: [
        'hwchart.util.component',
        'hwchart.util.clazz',
        'hwchart.util.model',
        'hwchart.util.graphic',
        'hwchart.stream.task',
        'hwchart.chart.helper.createRenderPlanner'
    ]
    
}, function () {

    var _util = zrender.util;

    var each = _util.each;

    var Group = zrender.Group;

    var componentUtil = hwchart.util.component;

    var clazzUtil = hwchart.util.clazz;

    var modelUtil = hwchart.util.model;

    var graphicUtil = hwchart.util.graphic;

    var _task = hwchart.stream.task;

    var createTask = _task.createTask;

    var createRenderPlanner = hwchart.chart.helper.createRenderPlanner;

    
    var inner = modelUtil.makeInner();
    var renderPlanner = createRenderPlanner();

    function Chart() {
        /**
         * @type {module:zrender/container/Group}
         * @readOnly
         */
        this.group = new Group();
        /**
         * @type {string}
         * @readOnly
         */

        this.uid = componentUtil.getUID('viewChart');
        this.renderTask = createTask({
            plan: renderTaskPlan,
            reset: renderTaskReset
        });
        this.renderTask.context = {
            view: this
        };
    }

    Chart.prototype = {
        type: 'chart',

        /**
         * Init the chart.
         * @param  {module:hwcharts/model/Global} ecModel
         * @param  {module:hwcharts/ExtensionAPI} api
         */
        init: function (ecModel, api) { },

        /**
         * Render the chart.
         * @param  {module:hwcharts/model/Series} seriesModel
         * @param  {module:hwcharts/model/Global} ecModel
         * @param  {module:hwcharts/ExtensionAPI} api
         * @param  {Object} payload
         */
        render: function (seriesModel, ecModel, api, payload) { },

        /**
         * Highlight series or specified data item.
         * @param  {module:hwcharts/model/Series} seriesModel
         * @param  {module:hwcharts/model/Global} ecModel
         * @param  {module:hwcharts/ExtensionAPI} api
         * @param  {Object} payload
         */
        highlight: function (seriesModel, ecModel, api, payload) {
            toggleHighlight(seriesModel.getData(), payload, 'emphasis');
        },

        /**
         * Downplay series or specified data item.
         * @param  {module:hwcharts/model/Series} seriesModel
         * @param  {module:hwcharts/model/Global} ecModel
         * @param  {module:hwcharts/ExtensionAPI} api
         * @param  {Object} payload
         */
        downplay: function (seriesModel, ecModel, api, payload) {
            toggleHighlight(seriesModel.getData(), payload, 'normal');
        },

        /**
         * Remove self.
         * @param  {module:hwcharts/model/Global} ecModel
         * @param  {module:hwcharts/ExtensionAPI} api
         */
        remove: function (ecModel, api) {
            this.group.removeAll();
        },

        /**
         * Dispose self.
         * @param  {module:hwcharts/model/Global} ecModel
         * @param  {module:hwcharts/ExtensionAPI} api
         */
        dispose: function () { },

        /**
         * Rendering preparation in progressive mode.
         * @param  {module:hwcharts/model/Series} seriesModel
         * @param  {module:hwcharts/model/Global} ecModel
         * @param  {module:hwcharts/ExtensionAPI} api
         * @param  {Object} payload
         */
        incrementalPrepareRender: null,

        /**
         * Render in progressive mode.
         * @param  {Object} params See taskParams in `stream/task.js`
         * @param  {module:hwcharts/model/Series} seriesModel
         * @param  {module:hwcharts/model/Global} ecModel
         * @param  {module:hwcharts/ExtensionAPI} api
         * @param  {Object} payload
         */
        incrementalRender: null,

        /**
         * Update transform directly.
         * @param  {module:hwcharts/model/Series} seriesModel
         * @param  {module:hwcharts/model/Global} ecModel
         * @param  {module:hwcharts/ExtensionAPI} api
         * @param  {Object} payload
         * @return {Object} {update: true}
         */
        updateTransform: null,

        /**
         * The view contains the given point.
         * @interface
         * @param {Array.<number>} point
         * @return {boolean}
         */
        // containPoint: function () {}

        /**
         * @param {string} eventType
         * @param {Object} query
         * @param {module:zrender/Element} targetEl
         * @param {Object} packedEvent
         * @return {boolen} Pass only when return `true`.
         */
        filterForExposedEvent: null
    };
    var chartProto = Chart.prototype;

    chartProto.updateView = chartProto.updateLayout = chartProto.updateVisual = function (seriesModel, ecModel, api, payload) {
        this.render(seriesModel, ecModel, api, payload);
    };
    /**
     * Set state of single element
     * @param {module:zrender/Element} el
     * @param {string} state 'normal'|'emphasis'
     * @param {number} highlightDigit
     */


    function elSetState(el, state, highlightDigit) {
        if (el) {
            el.trigger(state, highlightDigit);

            if (el.isGroup // Simple optimize.
            && !graphicUtil.isHighDownDispatcher(el)) {
                for (var i = 0, len = el.childCount() ; i < len; i++) {
                    elSetState(el.childAt(i), state, highlightDigit);
                }
            }
        }
    }
    /**
     * @param {module:hwcharts/data/List} data
     * @param {Object} payload
     * @param {string} state 'normal'|'emphasis'
     */


    function toggleHighlight(data, payload, state) {
        var dataIndex = modelUtil.queryDataIndex(data, payload);
        var highlightDigit = payload && payload.highlightKey != null ? graphicUtil.getHighlightDigit(payload.highlightKey) : null;

        if (dataIndex != null) {
            each(modelUtil.normalizeToArray(dataIndex), function (dataIdx) {
                elSetState(data.getItemGraphicEl(dataIdx), state, highlightDigit);
            });
        } else {
            data.eachItemGraphicEl(function (el) {
                elSetState(el, state, highlightDigit);
            });
        }
    } // Enable Chart.extend.


    clazzUtil.enableClassExtend(Chart, ['dispose']); // Add capability of registerClass, getClass, hasClass, registerSubTypeDefaulter and so on.

    clazzUtil.enableClassManagement(Chart, {
        registerWhenExtend: true
    });

    Chart.markUpdateMethod = function (payload, methodName) {
        inner(payload).updateMethod = methodName;
    };

    function renderTaskPlan(context) {
        return renderPlanner(context.model);
    }

    function renderTaskReset(context) {
        var seriesModel = context.model;
        var ecModel = context.ecModel;
        var api = context.api;
        var payload = context.payload; // ???! remove updateView updateVisual

        var progressiveRender = seriesModel.pipelineContext.progressiveRender;
        var view = context.view;
        var updateMethod = payload && inner(payload).updateMethod;
        var methodName = progressiveRender ? 'incrementalPrepareRender' : updateMethod && view[updateMethod] ? updateMethod // `appendData` is also supported when data amount
        // is less than progressive threshold.
        : 'render';

        if (methodName !== 'render') {
            view[methodName](seriesModel, ecModel, api, payload);
        }

        return progressMethodMap[methodName];
    }

    var progressMethodMap = {
        incrementalPrepareRender: {
            progress: function (params, context) {
                context.view.incrementalRender(params, context.model, context.ecModel, context.api, context.payload);
            }
        },
        render: {
            // Put view.render in `progress` to support appendData. But in this case
            // view.render should not be called in reset, otherwise it will be called
            // twise. Use `forceFirstProgress` to make sure that view.render is called
            // in any cases.
            forceFirstProgress: true,
            progress: function (params, context) {
                context.view.render(context.model, context.ecModel, context.api, context.payload);
            }
        }
    };
    
    hwchart.view.Chart = Chart;
})