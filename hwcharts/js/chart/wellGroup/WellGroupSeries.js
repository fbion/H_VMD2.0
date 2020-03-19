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
Vmd.define('hwchart.chart.wellGroup.WellGroupSeries', {
    requires: ['hwchart.model.Series', 'hwchart.chart.helper.createListFromArray']
}, function () {
    var createListFromArray = hwchart.chart.helper.createListFromArray;
    var SeriesModel = hwchart.model.Series;

    WellGroupSeries = SeriesModel.extend({

        type: 'series.wellGroup',

        dependencies: ['grid', 'polar'],

        visualColorAccessPath: 'areaStyle.color', // 20191205：解决json模板中配置的颜色无法传递到井组绘图填充中的问题

        getInitialData: function (option, ecModel) {
            return createListFromArray(option.data, this, ecModel);
        },

        brushSelector: 'point',

        defaultOption: {
            coordinateSystem: 'geo',
            zlevel: 0,
            z: 2,
            fontSize: 12,
            isArea: true,
			isHover: false
            // legendHoverLink: true,
            //
            // progressive: 0,

            // Cartesian coordinate system
            // xAxisIndex: 0,
            // yAxisIndex: 0,

            // Polar coordinate system
            // polarIndex: 0,

            // Geo coordinate system
            // geoIndex: 0,

            // symbol: null,        // 图形类型
            // symbolSize: 10          // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
            // symbolRotate: null,  // 图形旋转控制

            // large: false,
            // Available when large is true
            // largeThreshold: 2000,
        }
    });

    hwchart.chart.wellGroup.WellGroupSeries = WellGroupSeries;
})
