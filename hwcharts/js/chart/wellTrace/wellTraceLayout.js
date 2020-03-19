Vmd.define('hwchart.chart.wellTrace.wellTraceLayout', {
    
}, function () {
    hwchart.chart.wellTrace.wellTraceLayout = function (ecModel) {
        ecModel.eachSeriesByType('wellTrace', function (seriesModel) {
            var coordSys = seriesModel.coordinateSystem;
            var lineData = seriesModel.getData();

            // FIXME Use data dimensions ?
            // FIXME Use data dimensions ?
            lineData.each(function (idx) {
                var itemModel = lineData.getItemModel(idx);
                // TODO Support pure array
                var coords = (itemModel.option instanceof Array) ?
                    itemModel.option : itemModel.get('coords');
                
                var a = (itemModel.option instanceof Array) ?
                itemModel.option : itemModel.get('a');

                var b = (itemModel.option instanceof Array) ?
                itemModel.option : itemModel.get('b');

                if (__DEV__) {
                    if (!(coords instanceof Array && coords.length > 0 && coords[0] instanceof Array)) {
                        throw new Error('Invalid coords ' + JSON.stringify(coords) + '. Lines must have 2d coords array in data item.');
                    }
                }
                var pts = {
                    a:coordSys.dataToPoint(a),
                    b:coordSys.dataToPoint(b),
                    coords:[]
                };
                for (var i = 0; i < coords.length; i++) {
                    pts.coords.push(coordSys.dataToPoint(coords[i]));
                }
                lineData.setItemLayout(idx, pts);
            });
        });
    };
})