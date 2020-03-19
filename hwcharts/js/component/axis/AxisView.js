﻿
Vmd.define('hwchart.component.axis.AxisView', {
    requires: ['hwchart.component.axisPointer.modelHelper']
}, function () {
    


    var axisPointerModelHelper = hwchart.component.axisPointer.modelHelper;

  
    /**
     * Base class of AxisView.
     */
    var AxisView = hwcharts.extendComponentView({
        type: 'axis',

        /**
         * @private
         */
        _axisPointer: null,

        /**
         * @protected
         * @type {string}
         */
        axisPointerClass: null,

        /**
         * @override
         */
        render: function (axisModel, ecModel, api, payload) {
            // FIXME
            // This process should proformed after coordinate systems updated
            // (axis scale updated), and should be performed each time update.
            // So put it here temporarily, although it is not appropriate to
            // put a model-writing procedure in `view`.
            this.axisPointerClass && axisPointerModelHelper.fixValue(axisModel);
            AxisView.superApply(this, 'render', arguments);
            updateAxisPointer(this, axisModel, ecModel, api, payload, true);
        },

        /**
         * Action handler.
         * @public
         * @param {module:hwcharts/coord/cartesian/AxisModel} axisModel
         * @param {module:hwcharts/model/Global} ecModel
         * @param {module:hwcharts/ExtensionAPI} api
         * @param {Object} payload
         */
        updateAxisPointer: function (axisModel, ecModel, api, payload, force) {
            updateAxisPointer(this, axisModel, ecModel, api, payload, false);
        },

        /**
         * @override
         */
        remove: function (ecModel, api) {
            var axisPointer = this._axisPointer;
            axisPointer && axisPointer.remove(api);
            AxisView.superApply(this, 'remove', arguments);
        },

        /**
         * @override
         */
        dispose: function (ecModel, api) {
            disposeAxisPointer(this, api);
            AxisView.superApply(this, 'dispose', arguments);
        }
    });

    function updateAxisPointer(axisView, axisModel, ecModel, api, payload, forceRender) {
        var Clazz = AxisView.getAxisPointerClass(axisView.axisPointerClass);

        if (!Clazz) {
            return;
        }

        var axisPointerModel = axisPointerModelHelper.getAxisPointerModel(axisModel);
        axisPointerModel ? (axisView._axisPointer || (axisView._axisPointer = new Clazz())).render(axisModel, axisPointerModel, api, forceRender) : disposeAxisPointer(axisView, api);
    }

    function disposeAxisPointer(axisView, ecModel, api) {
        var axisPointer = axisView._axisPointer;
        axisPointer && axisPointer.dispose(ecModel, api);
        axisView._axisPointer = null;
    }

    var axisPointerClazz = [];

    AxisView.registerAxisPointerClass = function (type, clazz) {
        axisPointerClazz[type] = clazz;
    };

    AxisView.getAxisPointerClass = function (type) {
        return type && axisPointerClazz[type];
    };

    hwchart.component.axis.AxisView = AxisView;

})