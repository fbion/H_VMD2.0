Vmd.define('hwchart.chart.bar.helper', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.chart.helper.labelHelper'
    ]

}, function(){

    var graphic = hwchart.util.graphic;

    var _labelHelper = hwchart.chart.helper.labelHelper;

    var getDefaultLabel = _labelHelper.getDefaultLabel;

   
    function setLabel(normalStyle, hoverStyle, itemModel, color, seriesModel, dataIndex, labelPositionOutside) {
        var labelModel = itemModel.getModel('label');
        var hoverLabelModel = itemModel.getModel('emphasis.label');
        graphic.setLabelStyle(normalStyle, hoverStyle, labelModel, hoverLabelModel, {
            labelFetcher: seriesModel,
            labelDataIndex: dataIndex,
            defaultText: getDefaultLabel(seriesModel.getData(), dataIndex),
            isRectText: true,
            autoColor: color
        });
        fixPosition(normalStyle);
        fixPosition(hoverStyle);
    }

    function fixPosition(style, labelPositionOutside) {
        if (style.textPosition === 'outside') {
            style.textPosition = labelPositionOutside;
        }
    }

    var exports = {};
    exports.setLabel = setLabel;
    hwchart.chart.bar.helper = exports;

})