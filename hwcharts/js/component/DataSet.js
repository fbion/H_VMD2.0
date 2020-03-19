Vmd.define('hwchart.component.DataSet', {
    requires: [
        'hwchart.model.Component',
        'hwchart.view.Component',
        'hwchart.data.helper.sourceHelper',
        'hwchart.data.helper.sourceType'
    ]
}, function () {
    var ComponentModel = hwchart.model.Component;

    var ComponentView = hwchart.view.Component;

    var _sourceHelper = hwchart.data.helper.sourceHelper;

    var detectSourceFormat = _sourceHelper.detectSourceFormat;

    var _sourceType = hwchart.data.helper.sourceType;

    var SERIES_LAYOUT_BY_COLUMN = _sourceType.SERIES_LAYOUT_BY_COLUMN;

    ComponentModel.extend({
        type: 'dataset',

        /**
         * @protected
         */
        defaultOption: {
            // 'row', 'column'
            seriesLayoutBy: SERIES_LAYOUT_BY_COLUMN,
            // null/'auto': auto detect header, see "module:hwcharts/data/helper/sourceHelper"
            sourceHeader: null,
            dimensions: null,
            source: null
        },
        optionUpdated: function () {
            detectSourceFormat(this);
        }
    });
    ComponentView.extend({
        type: 'dataset'
    });
})