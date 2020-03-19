Vmd.define('hwchart.component.helper.interactionMutex', {
    //requires:['hwcharts']
}, function () {

    var ATTR = '\0_ec_interaction_mutex';

    function take(zr, resourceKey, userKey) {
        var store = getStore(zr);
        store[resourceKey] = userKey;
    }

    function release(zr, resourceKey, userKey) {
        var store = getStore(zr);
        var uKey = store[resourceKey];

        if (uKey === userKey) {
            store[resourceKey] = null;
        }
    }

    function isTaken(zr, resourceKey) {
        return !!getStore(zr)[resourceKey];
    }

    function getStore(zr) {
        return zr[ATTR] || (zr[ATTR] = {});
    }
    /**
     * payload: {
     *     type: 'takeGlobalCursor',
     *     key: 'dataZoomSelect', or 'brush', or ...,
     *         If no userKey, release global cursor.
     * }
     */


    hwcharts.registerAction({
        type: 'takeGlobalCursor',
        event: 'globalCursorTaken',
        update: 'update'
    }, function () { });

    var exports = {};
    exports.take = take;
    exports.release = release;
    exports.isTaken = isTaken;

    hwchart.component.helper.interactionMutex = exports;
})