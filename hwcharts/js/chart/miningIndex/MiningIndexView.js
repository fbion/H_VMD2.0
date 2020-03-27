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

    var MiningIndexView= ChartView.extend({
        type: 'miningIndex',

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

            var miningIndexDraw = this._updateSymbolDraw(data, seriesModel, ecModel, api);
            miningIndexDraw.updateData(ecModel,data);
            
        },

        incrementalPrepareRender: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();

            var miningIndexDraw = this._updateSymbolDraw(data, seriesModel, ecModel, api);

            miningIndexDraw.incrementalPrepareUpdate(data);
            this._finished = false;
        },

        incrementalRender: function (taskParams, seriesModel) {
            this._miningIndexDraw.incrementalUpdate(taskParams, seriesModel.getData());

            this._finished = taskParams.end === seriesModel.getData().count();
        },
        // updateTransform: function (seriesModel, ecModel, api) {
        //     var data = seriesModel.getData();

        //     this.group.dirty();

        //     var res = pointsLayout().reset(seriesModel);
        //     if (res.progress) {
        //         res.progress({ start: 0, end: data.count() }, data);
        //     }

        //     this._miningIndexDraw.updateLayout(data);
        // },

        // _updateGroupTransform: function (seriesModel) {
        //     var coordSys = seriesModel.coordinateSystem;
        //     if (coordSys && coordSys.getRoamTransform) {
        //         this.group.transform = zrender.matrix.clone(coordSys.getRoamTransform());
        //         this.group.decomposeTransform();
        //     }
        // },

        _updateSymbolDraw: function (data, seriesModel, ecModel, api) {
            var miningIndexDraw = this._miningIndexDraw;

            if (!miningIndexDraw) {
                miningIndexDraw = this._miningIndexDraw = new MiningIndexDraw(ecModel, api, this);
                this.group.removeAll();
            }

            this.group.add(miningIndexDraw.group);
            return miningIndexDraw;
        },

        updateLayout: function (seriesModel, ecModel, api) {
            var data =seriesModel.getData();
            data.dataChanged = false
            if(data){
                this._miningIndexDraw.updateData(ecModel,data);
            }
            
        },

        remove: function (ecModel, api) {
            this._miningIndexDraw && this._miningIndexDraw.remove(api);
        },

        dispose: function () {}
    });

    hwchart.chart.miningIndex.MiningIndexView = MiningIndexView;
})
