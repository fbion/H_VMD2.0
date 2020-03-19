Vmd.define('hwchart.data.helper.createDimensions', {
    requires: [
        'hwchart.data.helper.completeDimensions'
    ]
}, function () {

    var completeDimensions = hwchart.data.helper.completeDimensions;


    /**
     * Substitute `completeDimensions`.
     * `completeDimensions` is to be deprecated.
     */

    /**
     * @param {module:hwcharts/data/Source|module:hwcharts/data/List} source or data.
     * @param {Object|Array} [opt]
     * @param {Array.<string|Object>} [opt.coordDimensions=[]]
     * @param {number} [opt.dimensionsCount]
     * @param {string} [opt.generateCoord]
     * @param {string} [opt.generateCoordCount]
     * @param {Array.<string|Object>} [opt.dimensionsDefine=source.dimensionsDefine] Overwrite source define.
     * @param {Object|HashMap} [opt.encodeDefine=source.encodeDefine] Overwrite source define.
     * @param {Function} [opt.encodeDefaulter] Make default encode if user not specified.
     * @return {Array.<Object>} dimensionsInfo
     */
    function _default(source, opt) {
        opt = opt || {};
        return completeDimensions(opt.coordDimensions || [], source, {
            dimsDef: opt.dimensionsDefine || source.dimensionsDefine,
            encodeDef: opt.encodeDefine || source.encodeDefine,
            dimCount: opt.dimensionsCount,
            encodeDefaulter: opt.encodeDefaulter,
            generateCoord: opt.generateCoord,
            generateCoordCount: opt.generateCoordCount
        });
    }

    hwchart.data.helper.createDimensions = _default;
})