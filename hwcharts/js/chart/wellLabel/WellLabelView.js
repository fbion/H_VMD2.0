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
Vmd.define('hwchart.chart.wellLabel.WellLabelView', {
    requires: [
        'hwchart.view.Chart',
        'hwchart.chart.helper.WellLabelDraw',
        'hwchart.layout.points'
    ]

}, function () {
    var WellLabelDraw = hwchart.chart.helper.WellLabelDraw;
    var ChartView = hwchart.view.Chart;
    var pointsLayout = hwchart.layout.points;
    var WellLabelView= ChartView.extend({


        type: 'wellLabel',

        init: function () {
            this._labelDraw = new WellLabelDraw();
        },

        render: function (seriesModel, ecModel, api) {
            if (!this.__hasFetchData) {
                this.__hasFetchData = true;
                window.setTimeout(function(){
                    api.dispatchAction({
                        type: 'fetchData',
                        id: seriesModel.id,
                        mainType: seriesModel.mainType,
                        name: seriesModel.name,
                        seriesIndex:seriesModel.seriesIndex,
                        subType: seriesModel.subType
                    });
                }, 500);
            }

            var data = seriesModel.getData();
            var labelDraw = this._labelDraw;
            labelDraw.updateData(ecModel, data);
        },

        remove: function (ecModel, api) {
            this._labelDraw && this._labelDraw.remove(api);
        },

        dispose: function () {}
    });

    hwchart.chart.wellLabel.WellLabelView = WellLabelView;
})
