Vmd.define('hwchart.component.brush.brushAction', {
    requires: []

},function(){
   
    /**
     * payload: {
     *      brushIndex: number, or,
     *      brushId: string, or,
     *      brushName: string,
     *      globalRanges: Array
     * }
     */
    hwcharts.registerAction(
         {
             type: 'brush', event: 'brush'
             //, update: 'updateView'
         },
        function (payload, ecModel) {
            ecModel.eachComponent({ mainType: 'brush', query: payload }, function (brushModel) {
                brushModel.setAreas(payload.areas);
            });
        }
    );

    /**
     * payload: {
     *      brushComponents: [
     *          {
     *              brushId,
     *              brushIndex,
     *              brushName,
     *              series: [
     *                  {
     *                      seriesId,
     *                      seriesIndex,
     *                      seriesName,
     *                      rawIndices: [21, 34, ...]
     *                  },
     *                  ...
     *              ]
     *          },
     *          ...
     *      ]
     * }
     */
    hwcharts.registerAction(
         { type: 'brushSelect', event: 'brushSelected', update: 'none' },
        function () { }
    );

    hwcharts.registerAction({
        type: 'brushEnd',
        event: 'brushEnd',
        update: 'none'
    }, function () { });
})