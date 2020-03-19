/**
 * @file Trackmap action
 */
Vmd.define('hwchart.chart.wellLogging.wellLoggingAction', {
    requires: [
        'hwchart.chart.wellLogging.helper'
    ]
},function(){
    var helper = hwchart.chart.wellLogging.helper;

    var noop = function () {};

    var actionTypes = [
        'treemapZoomToNode',
        'treemapRender',
        'treemapMove'
    ];

    for (var i = 0; i < actionTypes.length; i++) {
        hwcharts.registerAction({type: actionTypes[i], update: 'updateView'}, noop);
    }

    hwcharts.registerAction(
        {type: 'treemapRootToNode', update: 'updateView'},
        function (payload, ecModel) {

            ecModel.eachComponent(
                {mainType: 'series', subType: 'wellLogging', query: payload},
                handleRootToNode
            );

            function handleRootToNode(model, index) {
                var targetInfo = helper.retrieveTargetInfo(payload, model);

                if (targetInfo) {
                    var originViewRoot = model.getViewRoot();
                    if (originViewRoot) {
                        payload.direction = helper.aboveViewRoot(originViewRoot, targetInfo.node)
                            ? 'rollUp' : 'drillDown';
                    }
                    model.resetViewRoot(targetInfo.node);
                }
            }
        }
    );

});