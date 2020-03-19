Vmd.define('hwchart.component.visualMap.visualMapAction', {
   
}, function () {

    var actionInfo = {
        type: 'selectDataRange',
        event: 'dataRangeSelected',
        // FIXME use updateView appears wrong
        update: 'update'
    };

    hwcharts.registerAction(actionInfo, function (payload, ecModel) {

        ecModel.eachComponent({ mainType: 'visualMap', query: payload }, function (model) {
            model.setSelected(payload.selected);
        });

    });
})