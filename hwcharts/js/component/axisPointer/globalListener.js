﻿Vmd.define('hwchart.component.axisPointer.globalListener', {
    requires: [
        'hwchart.util.model'

    ]
}, function () {

    var zrUtil = zrender.util;

    var env = zrender.env;

    var _model = hwchart.util.model;

    var makeInner = _model.makeInner;

   
    var inner = makeInner();
    var each = zrUtil.each;
    /**
     * @param {string} key
     * @param {module:hwcharts/ExtensionAPI} api
     * @param {Function} handler
     *      param: {string} currTrigger
     *      param: {Array.<number>} point
     */

    function register(key, api, handler) {
        if (env.node) {
            return;
        }

        var zr = api.getZr();
        inner(zr).records || (inner(zr).records = {});
        initGlobalListeners(zr, api);
        var record = inner(zr).records[key] || (inner(zr).records[key] = {});
        record.handler = handler;
    }

    function initGlobalListeners(zr, api) {
        if (inner(zr).initialized) {
            return;
        }

        inner(zr).initialized = true;
        useHandler('click', zrUtil.curry(doEnter, 'click'));
        useHandler('mousemove', zrUtil.curry(doEnter, 'mousemove')); // useHandler('mouseout', onLeave);

        useHandler('globalout', onLeave);

        function useHandler(eventType, cb) {
            zr.on(eventType, function (e) {
                var dis = makeDispatchAction(api);
                each(inner(zr).records, function (record) {
                    record && cb(record, e, dis.dispatchAction);
                });
                dispatchTooltipFinally(dis.pendings, api);
            });
        }
    }

    function dispatchTooltipFinally(pendings, api) {
        var showLen = pendings.showTip.length;
        var hideLen = pendings.hideTip.length;
        var actuallyPayload;

        if (showLen) {
            actuallyPayload = pendings.showTip[showLen - 1];
        } else if (hideLen) {
            actuallyPayload = pendings.hideTip[hideLen - 1];
        }

        if (actuallyPayload) {
            actuallyPayload.dispatchAction = null;
            api.dispatchAction(actuallyPayload);
        }
    }

    function onLeave(record, e, dispatchAction) {
        record.handler('leave', null, dispatchAction);
    }

    function doEnter(currTrigger, record, e, dispatchAction) {
        record.handler(currTrigger, e, dispatchAction);
    }

    function makeDispatchAction(api) {
        var pendings = {
            showTip: [],
            hideTip: []
        }; // FIXME
        // better approach?
        // 'showTip' and 'hideTip' can be triggered by axisPointer and tooltip,
        // which may be conflict, (axisPointer call showTip but tooltip call hideTip);
        // So we have to add "final stage" to merge those dispatched actions.

        var dispatchAction = function (payload) {
            var pendingList = pendings[payload.type];

            if (pendingList) {
                pendingList.push(payload);
            } else {
                payload.dispatchAction = dispatchAction;
                api.dispatchAction(payload);
            }
        };

        return {
            dispatchAction: dispatchAction,
            pendings: pendings
        };
    }
    /**
     * @param {string} key
     * @param {module:hwcharts/ExtensionAPI} api
     */


    function unregister(key, api) {
        if (env.node) {
            return;
        }

        var zr = api.getZr();
        var record = (inner(zr).records || {})[key];

        if (record) {
            inner(zr).records[key] = null;
        }
    }
    var exports = {};
    exports.register = register;
    exports.unregister = unregister;

    hwchart.component.axisPointer.globalListener = exports;

})