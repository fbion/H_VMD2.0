Vmd.define('hwchart.component.AxisPointer', {
    requires: [
        'hwchart.component.axisPointer.modelHelper',
        'hwchart.component.axisPointer.axisTrigger',
        'hwchart.component.axisPointer.AxisPointerModel',
        'hwchart.component.axisPointer.AxisPointerView',
        'hwchart.component.axisPointer.CartesianAxisPointer'
    ]

}, function () {


  

    var zrUtil = zrender.util;

    var axisPointerModelHelper = hwchart.component.axisPointer.modelHelper;

    var axisTrigger = hwchart.component.axisPointer.axisTrigger;

    

    
    // CartesianAxisPointer is not supposed to be required here. But consider
    // hwcharts.simple.js and online build tooltip, which only require gridSimple,
    // CartesianAxisPointer should be able to required somewhere.
    hwcharts.registerPreprocessor(function (option) {
        // Always has a global axisPointerModel for default setting.
        if (option) {
            (!option.axisPointer || option.axisPointer.length === 0) && (option.axisPointer = {});
            var link = option.axisPointer.link; // Normalize to array to avoid object mergin. But if link
            // is not set, remain null/undefined, otherwise it will
            // override existent link setting.

            if (link && !zrUtil.isArray(link)) {
                option.axisPointer.link = [link];
            }
        }
    }); // This process should proformed after coordinate systems created
    // and series data processed. So put it on statistic processing stage.

    hwcharts.registerProcessor(hwcharts.PRIORITY.PROCESSOR.STATISTIC, function (ecModel, api) {
        // Build axisPointerModel, mergin tooltip.axisPointer model for each axis.
        // allAxesInfo should be updated when setOption performed.
        ecModel.getComponent('axisPointer').coordSysAxesInfo = axisPointerModelHelper.collect(ecModel, api);
    }); // Broadcast to all views.

    hwcharts.registerAction({
        type: 'updateAxisPointer',
        event: 'updateAxisPointer',
        update: ':updateAxisPointer'
    }, axisTrigger);
})