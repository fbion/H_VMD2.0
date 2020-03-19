Vmd.define('hwchart.chart.helper.createRenderPlanner', {
    requires: [
        'hwchart.util.model'
    ]
}, function () {

    var _model = hwchart.util.model;

    var makeInner = _model.makeInner;

   

    /**
     * @return {string} If large mode changed, return string 'reset';
     */
    function _default() {
        var inner = makeInner();
        return function (seriesModel) {
            var fields = inner(seriesModel);
            var pipelineContext = seriesModel.pipelineContext;
            var originalLarge = fields.large;
            var originalProgressive = fields.progressiveRender;
            var large = fields.large = pipelineContext.large;
            var progressive = fields.progressiveRender = pipelineContext.progressiveRender;
            return !!(originalLarge ^ large || originalProgressive ^ progressive) && 'reset';
        };
    }

    hwchart.chart.helper.createRenderPlanner = _default;
})
