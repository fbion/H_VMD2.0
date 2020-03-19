Vmd.define('hwchart.component.dataZoom.dataZoomAction', {
    requires: ['hwchart.component.dataZoom.helper']
}, function () {
    var zrUtil = zrender.util;
    var helper = hwchart.component.dataZoom.helper;
 
    hwcharts.registerAction('dataZoom', function (payload, ecModel) {

        var linkedNodesFinder = helper.createLinkedNodesFinder(
            zrUtil.bind(ecModel.eachComponent, ecModel, 'dataZoom'),
            helper.eachAxisDim,
            function (model, dimNames) {
                return model.get(dimNames.axisIndex);
            }
        );

        var effectedModels = [];

        ecModel.eachComponent(
            { mainType: 'dataZoom', query: payload },
            function (model, index) {
                effectedModels.push.apply(
                    effectedModels, linkedNodesFinder(model).nodes
                );
            }
        );

        zrUtil.each(effectedModels, function (dataZoomModel, index) {
            dataZoomModel.setRawRange({
                start: payload.start,
                end: payload.end,
                startValue: payload.startValue,
                endValue: payload.endValue
            });
        });

    });
})