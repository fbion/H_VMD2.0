Vmd.define('hwchart.scale.Ordinal', {
    requires: [
        'hwchart.scale.Scale',
        'hwchart.data.OrdinalMeta'
    ]
}, function () {

    var zrUtil = zrender.util;

    var Scale = hwchart.scale.Scale;

    var OrdinalMeta = hwchart.data.OrdinalMeta;

   

    // FIXME only one data
    var scaleProto = Scale.prototype;
    var OrdinalScale = Scale.extend({
        type: 'ordinal',

        /**
         * @param {module:hwcharts/data/OrdianlMeta|Array.<string>} ordinalMeta
         */
        init: function (ordinalMeta, extent) {
            // Caution: Should not use instanceof, consider ec-extensions using
            // import approach to get OrdinalMeta class.
            if (!ordinalMeta || zrUtil.isArray(ordinalMeta)) {
                ordinalMeta = new OrdinalMeta({
                    categories: ordinalMeta
                });
            }

            this._ordinalMeta = ordinalMeta;
            this._extent = extent || [0, ordinalMeta.categories.length - 1];
        },
        parse: function (val) {
            return typeof val === 'string' ? this._ordinalMeta.getOrdinal(val) // val might be float.
            : Math.round(val);
        },
        contain: function (rank) {
            rank = this.parse(rank);
            return scaleProto.contain.call(this, rank) && this._ordinalMeta.categories[rank] != null;
        },

        /**
         * Normalize given rank or name to linear [0, 1]
         * @param {number|string} [val]
         * @return {number}
         */
        normalize: function (val) {
            return scaleProto.normalize.call(this, this.parse(val));
        },
        scale: function (val) {
            return Math.round(scaleProto.scale.call(this, val));
        },

        /**
         * @return {Array}
         */
        getTicks: function () {
            var ticks = [];
            var extent = this._extent;
            var rank = extent[0];

            while (rank <= extent[1]) {
                ticks.push(rank);
                rank++;
            }

            return ticks;
        },

        /**
         * Get item on rank n
         * @param {number} n
         * @return {string}
         */
        getLabel: function (n) {
            if (!this.isBlank()) {
                // Note that if no data, ordinalMeta.categories is an empty array.
                return this._ordinalMeta.categories[n];
            }
        },

        /**
         * @return {number}
         */
        count: function () {
            return this._extent[1] - this._extent[0] + 1;
        },

        /**
         * @override
         */
        unionExtentFromData: function (data, dim) {
            this.unionExtent(data.getApproximateExtent(dim));
        },
        getOrdinalMeta: function () {
            return this._ordinalMeta;
        },
        niceTicks: zrUtil.noop,
        niceExtent: zrUtil.noop
    });
    /**
     * @return {module:hwcharts/scale/Time}
     */

    OrdinalScale.create = function () {
        return new OrdinalScale();
    };

    

    hwchart.scale.Ordinal = OrdinalScale;

})