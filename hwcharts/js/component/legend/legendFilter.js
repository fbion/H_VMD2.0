Vmd.define('hwchart.component.legend.legendFilter', {
   
}, function () {
    
    function _default(ecModel,api) {
        var legendModels = ecModel.findComponents({
            mainType: 'legend'
        });

        // if (legendModels && legendModels.length) {
        //     ecModel.filterSeries(function (series) {
        //         // If in any legend component the status is not selected.
        //         // Because in legend series is assumed selected when it is not in the legend data.
        //         for (var i = 0; i < legendModels.length; i++) {
        //             if (!legendModels[i].isSelected(series.name)) {
        //                 return false;
        //             }
        //         }

        //         return true;
        //     });
        // }
		
		var layerModels = api.getChart().seriesSelected;
		
		if(layerModels){
		    ecModel.filterSeries(function (series) {
		        if(layerModels[series.name] === false){
		            return false;
		        }
		        return true;
		    });
		}
    }

    hwchart.component.legend.legendFilter = _default;
})
   