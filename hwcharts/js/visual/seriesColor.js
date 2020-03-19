Vmd.define('hwchart.visual.seriesColor', {
    requires: []
}, function () {

    var Gradient = zrender.Gradient;

    var _util = zrender.util;

    var isFunction = _util.isFunction;

    
    var _default = {
        createOnAllSeries: true,
        performRawSeries: true,
        reset: function (seriesModel, ecModel) {
            var data = seriesModel.getData();
            var colorAccessPath = (seriesModel.visualColorAccessPath || 'itemStyle.color').split('.'); // Set in itemStyle

            var color = seriesModel.get(colorAccessPath);
            var colorCallback = isFunction(color) && !(color instanceof Gradient) ? color : null; // Default color

            if (!color || colorCallback) {
                color = seriesModel.getColorFromPalette( // TODO series count changed.
                seriesModel.name, null, ecModel.getSeriesCount());
            }

            data.setVisual('color', color);
            var borderColorAccessPath = (seriesModel.visualBorderColorAccessPath || 'itemStyle.borderColor').split('.');
            var borderColor = seriesModel.get(borderColorAccessPath);
            data.setVisual('borderColor', borderColor); // Only visible series has each data be visual encoded

            if (!ecModel.isSeriesFiltered(seriesModel)) {
                if (colorCallback) {
                    data.each(function (idx) {
                        data.setItemVisual(idx, 'color', colorCallback(seriesModel.getDataParams(idx)));
                    });
                } // itemStyle in each data item


                var dataEach = function (data, idx) {
                    var itemModel = data.getItemModel(idx);
                    var color = itemModel.get(colorAccessPath, true);
                    var borderColor = itemModel.get(borderColorAccessPath, true);

                    if (color != null) {
                        data.setItemVisual(idx, 'color', color);
                    }

                    if (borderColor != null) {
                        data.setItemVisual(idx, 'borderColor', borderColor);
                    }
                };

                return {
                    dataEach: data.hasItemOption ? dataEach : null
                };
            }
        }
    };
    hwchart.visual.seriesColor = _default;
})