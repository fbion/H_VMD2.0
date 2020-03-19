Vmd.define('hwchart.scale.helper', {
    requires: [
        'hwchart.util.number'
    ]
}, function () {

    var numberUtil = hwchart.util.number;

   
    /**
     * For testable.
     */
    var roundNumber = numberUtil.round;
    /**
     * @param {Array.<number>} extent Both extent[0] and extent[1] should be valid number.
     *                                Should be extent[0] < extent[1].
     * @param {number} splitNumber splitNumber should be >= 1.
     * @param {number} [minInterval]
     * @param {number} [maxInterval]
     * @return {Object} {interval, intervalPrecision, niceTickExtent}
     */

    function intervalScaleNiceTicks(extent, splitNumber, minInterval, maxInterval) {
        var result = {};
        var span = extent[1] - extent[0];
        var interval = result.interval = numberUtil.nice(span / splitNumber, true);

        if (minInterval != null && interval < minInterval) {
            interval = result.interval = minInterval;
        }

        if (maxInterval != null && interval > maxInterval) {
            interval = result.interval = maxInterval;
        } // Tow more digital for tick.


        var precision = result.intervalPrecision = getIntervalPrecision(interval); // Niced extent inside original extent

        var niceTickExtent = result.niceTickExtent = [roundNumber(Math.ceil(extent[0] / interval) * interval, precision), roundNumber(Math.floor(extent[1] / interval) * interval, precision)];
        fixExtent(niceTickExtent, extent);
        return result;
    }
    /**
     * @param {number} interval
     * @return {number} interval precision
     */


    function getIntervalPrecision(interval) {
        // Tow more digital for tick.
        return numberUtil.getPrecisionSafe(interval) + 2;
    }

    function clamp(niceTickExtent, idx, extent) {
        niceTickExtent[idx] = Math.max(Math.min(niceTickExtent[idx], extent[1]), extent[0]);
    } // In some cases (e.g., splitNumber is 1), niceTickExtent may be out of extent.


    function fixExtent(niceTickExtent, extent) {
        !isFinite(niceTickExtent[0]) && (niceTickExtent[0] = extent[0]);
        !isFinite(niceTickExtent[1]) && (niceTickExtent[1] = extent[1]);
        clamp(niceTickExtent, 0, extent);
        clamp(niceTickExtent, 1, extent);

        if (niceTickExtent[0] > niceTickExtent[1]) {
            niceTickExtent[0] = niceTickExtent[1];
        }
    }

    var exports = {};

    exports.intervalScaleNiceTicks = intervalScaleNiceTicks;
    exports.getIntervalPrecision = getIntervalPrecision;
    exports.fixExtent = fixExtent;

    hwchart.scale.helper = exports;
})