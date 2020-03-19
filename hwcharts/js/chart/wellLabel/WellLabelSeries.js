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
Vmd.define('hwchart.chart.wellLabel.WellLabelSeries', {
    requires: [
        'hwchart.model.Series',
        'hwchart.chart.helper.createListFromArray',
        'hwchart.chart.helper.WellManager'
    ]
}, function () {
    var createListFromArray = hwchart.chart.helper.createListFromArray;
    var SeriesModel = hwchart.model.Series;
    var WellManager = hwchart.chart.helper.WellManager;

    function preprocessOption(seriesOpt) {
        var data = seriesOpt.data;
        // if (data && data[0]) {
        //
        // }
    }

    WellLabelSeries = SeriesModel.extend({

        type: 'series.wellLabel',

        dependencies: [],

        visualColorAccessPath: 'itemStyle.color',

        init: function (option) {
            // Not using preprocessor because mergeOption may not have series.type
            preprocessOption(option);
            WellLabelSeries.superApply(this, 'init', arguments);
        },

        mergeOption: function (option) {
            preprocessOption(option);

            WellLabelSeries.superApply(this, 'mergeOption', arguments);
        },

        getInitialData: function (option, ecModel) {
            return createListFromArray(option.data, this, ecModel);
        },

        getExtraData: function(){
            var requestCompleted = this.get('requestCompleted');
            if(!requestCompleted){
                return null;
            };
        },

        brushSelector: 'point',

        defaultOption: {
            coordinateSystem: 'geo',
            zlevel: 0,

            scale: 0.3,

            requestCompleted: false, //后台请求是否完成

            dependentSeries: [],

            z: 2,

            itemStyle: {
                normal: {
                    show: true,
                    color: 'black',
                    distance: 0,
                    offset: [0, 0],
                    formatter: '{b}',
                    position: 'top'
                }
            }
        }
    });

    hwchart.chart.wellLabel.WellLabelSeries = WellLabelSeries;
})
