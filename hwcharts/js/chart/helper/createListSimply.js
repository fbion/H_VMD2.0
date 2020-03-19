Vmd.define('hwchart.chart.helper.createListSimply', {
    requires: [
        'hwchart.data.helper.createDimensions',
        'hwchart.data.List'
    ]
}, function () {


    var createDimensions = hwchart.data.helper.createDimensions;

    var List = hwchart.data.List;

    var _util = zrender.util;

    var extend = _util.extend;
    var isArray = _util.isArray;

    

    /**
     * [Usage]:
     * (1)
     * createListSimply(seriesModel, ['value']);
     * (2)
     * createListSimply(seriesModel, {
     *     coordDimensions: ['value'],
     *     dimensionsCount: 5
     * });
     *
     * @param {module:hwcharts/model/Series} seriesModel
     * @param {Object|Array.<string|Object>} opt opt or coordDimensions
     *        The options in opt, see `hwcharts/data/helper/createDimensions`
     * @param {Array.<string>} [nameList]
     * @return {module:echarts/data/List}
     */
    function _default(seriesModel, opt, nameList) {
        opt = isArray(opt) && {
            coordDimensions: opt
        } || extend({}, opt);
        var source = seriesModel.getSource();
        var dimensionsInfo = createDimensions(source, opt);
        var list = new List(dimensionsInfo, seriesModel);
        list.initData(source, nameList);
        return list;
    }

    
    hwchart.chart.helper.createListSimply = _default;
})