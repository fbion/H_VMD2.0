Vmd.define('hwchart.visual.LegendVisualProvider', {
    requires: []
}, function () {
    function LegendVisualProvider(getDataWithEncodedVisual, getRawData) {
        this.getAllNames = function () {
            var rawData = getRawData(); // We find the name from the raw data. In case it's filtered by the legend component.
            // Normally, the name can be found in rawData, but can't be found in filtered data will display as gray.

            return rawData.mapArray(rawData.getName);
        };

        this.containName = function (name) {
            var rawData = getRawData();
            return rawData.indexOfName(name) >= 0;
        };

        this.indexOfName = function (name) {
            // Only get data when necessary.
            // Because LegendVisualProvider constructor may be new in the stage that data is not prepared yet.
            // Invoking Series#getData immediately will throw an error.
            var dataWithEncodedVisual = getDataWithEncodedVisual();
            return dataWithEncodedVisual.indexOfName(name);
        };

        this.getItemVisual = function (dataIndex, key) {
            // Get encoded visual properties from final filtered data.
            var dataWithEncodedVisual = getDataWithEncodedVisual();
            return dataWithEncodedVisual.getItemVisual(dataIndex, key);
        };
    }

    
    hwchart.visual.LegendVisualProvider = LegendVisualProvider;
})