/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
Vmd.define('hwchart.chart.miningIndex.MiningIndexView', {
    requires: [
        'hwchart.view.Chart',
        'hwchart.chart.helper.MiningIndexDraw',
    ]

}, function () {
    var MiningIndexDraw = hwchart.chart.helper.MiningIndexDraw;
    var ChartView = hwchart.view.Chart;
    var wellDrawFinished = false;
    var isincrementalRender = 0;
    var pointsLayout = hwchart.layout.points;
    var MiningIndexView= ChartView.extend({
        type: 'miningIndex',
        init: function (ecModel, api) {
            var self = this;
            this.MiningIndexDraw = new MiningIndexDraw(ecModel, api);
            api.on('incrementalRenderFinished',function(params) {
                if(isincrementalRender ===0){
                    self._finished = false;
                    self.renderTask._dirty = true;
                    self.renderTask.perform({
                        step:self.seriesModel.getProgressive()
                    });
                    wellDrawFinished = true;
                    isincrementalRender++;
                }
            });
        },
        render: function (seriesModel, ecModel, api) {
            var self = this;
            self.seriesModel = seriesModel;
            if (!this.__hasFetchData) {
                api.dispatchAction({
                    type: 'fetchData',
                    id: seriesModel.id,
                    mainType: seriesModel.mainType,
                    name: seriesModel.name,
                    nameText: seriesModel.option.nameText,
                    seriesIndex:seriesModel.seriesIndex,
                    subType: seriesModel.subType,
                    wellType:seriesModel.option.wellType,
                    show:seriesModel.option.show,
                    z:seriesModel.option.z,
                    indexs:seriesModel.option.indexs
                });
                this.__hasFetchData = true;
            }

            var data = seriesModel.getData();
            var MiningIndexDraw = this.MiningIndexDraw;
            MiningIndexDraw.updateData(ecModel,data);
            this.group.add(MiningIndexDraw.group);
            
        },
        incrementalPrepareRender: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();

            var MiningIndexDraw = this.MiningIndexDraw;

            MiningIndexDraw.incrementalPrepareUpdate(data);
            this._finished = false;
            //wellDrawFinished = false;
        },
        incrementalRender: function (taskParams, seriesModel) {
            this.MiningIndexDraw.incrementalUpdate(taskParams, seriesModel.getData(),wellDrawFinished);

            this._finished = taskParams.end === seriesModel.getData().count();
        },
        // updateTransform: function (seriesModel, ecModel, api) {
        //     var data = seriesModel.getData();

        //     this.group.dirty();

        //     var res = pointsLayout().reset(seriesModel);
        //     if (res.progress) {
        //         res.progress({ start: 0, end: data.count() }, data);
        //     }

        //     this.MiningIndexDraw.updateLayout(data);
        // },

        // _updateGroupTransform: function (seriesModel) {
        //     var coordSys = seriesModel.coordinateSystem;
        //     if (coordSys && coordSys.getRoamTransform) {
        //         this.group.transform = zrender.matrix.clone(coordSys.getRoamTransform());
        //         this.group.decomposeTransform();
        //     }
        // },
        
        updateLayout: function (seriesModel, ecModel, api) {
            var data =seriesModel.getData();
            data.dataChanged = false
            if(data){
                this.MiningIndexDraw.updateData(ecModel,data);
            }
            
        },

        remove: function (ecModel, api) {
            this.MiningIndexDraw && this.MiningIndexDraw.remove(api);
        },

        dispose: function () {}
    });

    hwchart.chart.miningIndex.MiningIndexView = MiningIndexView;
})
