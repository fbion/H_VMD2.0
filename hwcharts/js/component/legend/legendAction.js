Vmd.define('hwchart.component.legend.legendAction', {
   
}, function () {
   
    var zrUtil = zrender.util;


    
    function legendSelectActionHandler(methodName, payload, ecModel) {
        var selectedMap = {};
        var isToggleSelect = methodName === 'toggleSelected';
        var isSelected; // Update all legend components

        ecModel.eachComponent('legend', function (legendModel) {
            if (isToggleSelect && isSelected != null) {
                // Force other legend has same selected status
                // Or the first is toggled to true and other are toggled to false
                // In the case one legend has some item unSelected in option. And if other legend
                // doesn't has the item, they will assume it is selected.
                legendModel[isSelected ? 'select' : 'unSelect'](payload.name);
            } else if (methodName === 'allSelect' || methodName === 'inverseSelect') {
                legendModel[methodName]();
            } else {
                legendModel[methodName](payload.name);
                isSelected = legendModel.isSelected(payload.name);
            }

            var relateSeries = payload.api.getChart().seriesSelected;
            relateSeries[payload.name] = isSelected;
            //relateSeries["砂体范围"] = isSelected;
            // ----------------------------------------------------
            // 20200102:处理与此序列相关的序列的显示隐藏
            if (legendModel.option.relateSeries && !legendModel.isEmpty(legendModel.option.relateSeries)) {
                for (var i = 0; i < legendModel.option.relateSeries.length; i++) {
                    if (legendModel.option.relateSeries[i].name == payload.name) {
                        // 设置相关序列的显示隐藏
                        for (var j = 0; j < legendModel.option.relateSeries[i].relates.length; j++) {
                            var relateName = legendModel.option.relateSeries[i].relates[j];
                            // 20200102：与图层关联，设置这个对象的显示隐藏
                            if (payload.api) {
                                //var relateSeries = payload.api.getChart().seriesSelected;
                                relateSeries[relateName] = isSelected;
                            }
                        }
                        break;
                    }
                }
            }
            // ----------------------------------------------------

            var legendData = legendModel.getData();
            zrUtil.each(legendData, function (model) {
                var name = model.get('name'); // Wrap element

                if (name === '\n' || name === '') {
                    return;
                }

                var isItemSelected = legendModel.isSelected(name);

                if (selectedMap.hasOwnProperty(name)) {
                    // Unselected if any legend is unselected
                    selectedMap[name] = selectedMap[name] && isItemSelected;
                } else {
                    selectedMap[name] = isItemSelected;
                }
            });
        }); // Return the event explicitly

        return methodName === 'allSelect' || methodName === 'inverseSelect' ? {
            selected: selectedMap
        } : {
            name: payload.name,
            selected: selectedMap
        };
    }
    /**
     * @event legendToggleSelect
     * @type {Object}
     * @property {string} type 'legendToggleSelect'
     * @property {string} [from]
     * @property {string} name Series name or data item name
     */


    hwcharts.registerAction('legendToggleSelect', 'legendselectchanged', zrUtil.curry(legendSelectActionHandler, 'toggleSelected'));
    hwcharts.registerAction('legendAllSelect', 'legendselectall', zrUtil.curry(legendSelectActionHandler, 'allSelect'));
    hwcharts.registerAction('legendInverseSelect', 'legendinverseselect', zrUtil.curry(legendSelectActionHandler, 'inverseSelect'));
    /**
     * @event legendSelect
     * @type {Object}
     * @property {string} type 'legendSelect'
     * @property {string} name Series name or data item name
     */

    hwcharts.registerAction('legendSelect', 'legendselected', zrUtil.curry(legendSelectActionHandler, 'select'));
    /**
     * @event legendUnSelect
     * @type {Object}
     * @property {string} type 'legendUnSelect'
     * @property {string} name Series name or data item name
     */

    hwcharts.registerAction('legendUnSelect', 'legendunselected', zrUtil.curry(legendSelectActionHandler, 'unSelect'));
})