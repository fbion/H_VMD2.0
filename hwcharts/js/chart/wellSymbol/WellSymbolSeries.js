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
Vmd.define('hwchart.chart.wellSymbol.WellSymbolSeries', {
    requires: [
        'hwchart.model.Series',
        'hwchart.chart.helper.createListFromArray'
    ]
}, function () {
    var createListFromArray = hwchart.chart.helper.createListFromArray;
    var SeriesModel = hwchart.model.Series;

    var _util = zrender.util;
    var filter = _util.filter;

    function preprocessOption(seriesOpt) {
        var data = seriesOpt.data;
        if (data && data[0]) {
            // seriesOpt.data = seriesOpt.data.slice(0, 30);
            // seriesOpt.data = filter(data, function(item){
            //     return item.name == '新891' || item.name == '新892' || item.name == '新893' || item.name == '新894' || item.name == '新895'
            //     // return item.name == '什邡302H' || item.name == '什邡29'
            // })
        }
    }

    var WellSymbolSeries= SeriesModel.extend({

        type: 'series.wellSymbol',

        init: function (option) {
            // Not using preprocessor because mergeOption may not have series.type
            preprocessOption(option);
            WellSymbolSeries.superApply(this, 'init', arguments);

        },

        mergeOption: function (option) {
            preprocessOption(option);
            WellSymbolSeries.superApply(this, 'mergeOption', arguments);
        },

        getInitialData: function (option, ecModel) {
            return createListFromArray(this.getSource(), this, {
                useEncodeDefaulter: true
            });
        },

        brushSelector: 'point',
        getProgressive: function () {
            var progressive = this.option.progressive;

            if (progressive == null) {
                // PENDING
                return this.option.large ? 5e3 : this.get('progressive');
            }

            return progressive;
        },
        getProgressiveThreshold: function () {
            var progressiveThreshold = this.option.progressiveThreshold;

            if (progressiveThreshold == null) {
                // PENDING
                return this.option.large ? 1e4 : this.get('progressiveThreshold');
            }

            return progressiveThreshold;
        },

        defaultOption: {
            coordinateSystem: 'geo',
            zlevel: 0,
            z: 2,
            legendHoverLink: true,

            allowSelect: true,

            scale: 0.3,

            requestCompleted: false, //后台请求是否完成

            // Geo coordinate system
            // geoIndex: 0,

            // symbol: null,        // 图形类型
            symbolSize: 10,          // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
            // symbolRotate: null,  // 图形旋转控制

            // large: false,
            // Available when large is true
            // largeThreshold: 2000,

            // itemStyle: {
            //     opacity: 1
            // },
            label: {
                color: 'black',
                show: true,
                formatter: '{b}',
                distance: 3,
                position: 'right'
            }
        }
    });

    hwchart.chart.wellSymbol.WellSymbolSeries = WellSymbolSeries;
})
