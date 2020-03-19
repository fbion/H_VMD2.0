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
Vmd.define('hwchart.chart.wellGroup.WellGroupView', {
    requires: [
        'hwchart.view.Chart',
        'hwchart.chart.helper.Polyline',
        'hwchart.chart.helper.WellGroupDraw',
        'hwchart.chart.helper.ComposeSymbol',
        'hwchart.layout.points'
    ]

}, function () {
    var Polyline = hwchart.chart.helper.Polyline;
    var WellGroupDraw = hwchart.chart.helper.WellGroupDraw;
    var ChartView = hwchart.view.Chart;
    var pointsLayout = hwchart.layout.points;
    var WellGroupView = ChartView.extend({

        type: 'wellGroup',

        init: function () {
            this._groupDraw = new WellGroupDraw(Polyline);
        },

        render: function (seriesModel, ecModel, api) {
            // 获取井组数据
            if (!this.__hasFetchData) { // 获取数据
                api.dispatchAction({
                    type: 'fetchData',
                    id: seriesModel.id,
                    mainType: seriesModel.mainType,
                    name: seriesModel.name,
                    seriesIndex: seriesModel.seriesIndex,
                    subType: seriesModel.subType
                });
                this.__hasFetchData = true;
            }

            // api.on('fetchData', function () {
            // })
            var data = seriesModel.getData();

            //-------------------------------------------------
            this._groupDraw.updateData(ecModel, data);
            this.group.add(this._groupDraw.group);
        },

        //updateTransform: function (seriesModel, ecModel, api) {
        //    var data = seriesModel.getData();

        //    this.group.dirty();

        //    var res = pointsLayout().reset(seriesModel);
        //    if (res.progress) {
        //        res.progress({ start: 0, end: data.count() }, data);
        //    }

        //    this._groupDraw.updateLayout(data);
        //},

        //_updateGroupTransform: function (seriesModel) {
        //    var coordSys = seriesModel.coordinateSystem;
        //    if (coordSys && coordSys.getRoamTransform) {
        //        this.group.transform = zrender.matrix.clone(coordSys.getRoamTransform());
        //        this.group.decomposeTransform();
        //    }
        //},
        updateTransform: function (componentModel, ecModel, api, payload) {
            this._groupDraw.updateLayout(componentModel, ecModel, api, payload);
        },
        remove: function (ecModel, api) {
            this._groupDraw && this._groupDraw.remove(api);
        },

        dispose: function () { }
    });

    hwchart.chart.wellGroup.WellGroupView = WellGroupView;
})
