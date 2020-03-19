Vmd.define('hwchart.chart.wellLogging.dataZoom.dataZoomAction', {
    requires: ['hwchart.component.dataZoom.helper']
}, function () {
    var zrUtil = zrender.util;
    var each = zrUtil.each;
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

        var condition = {mainType: 'series', subType: 'wellLogging', query: payload};

        ecModel.eachComponent(
            condition,
            function (componentModel, index) {
                each(componentModel.dataZoom, function(model){
                    effectedModels.push.apply(
                        effectedModels, linkedNodesFinder(model).nodes
                    );
                })
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