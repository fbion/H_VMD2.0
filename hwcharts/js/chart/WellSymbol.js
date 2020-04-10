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
Vmd.define('hwchart.chart.WellSymbol', {
    requires: [
        'hwchart.chart.wellSymbol.WellSymbolSeries',
        'hwchart.chart.wellSymbol.WellSymbolView',
        'hwchart.visual.symbol',
        'hwchart.layout.points',
        'hwchart.processor.geoDataFilter'
    ]

}, function (LineChart) {

    var zrUtil = zrender.util;

    var visualSymbol = hwchart.visual.symbol;

    var layoutPoints = hwchart.layout.points;
    var geoDataFilter = hwchart.processor.geoDataFilter;

    // In case developer forget to include grid component
    // hwcharts.registerVisual(geoDataFilter('wellSymbol'));
    hwcharts.registerVisual(visualSymbol('wellSymbol', '', 'composeSymbol'));
    hwcharts.registerLayout(layoutPoints('wellSymbol')); // Down sample after filter

    //hwcharts.registerProcessor(hwcharts.PRIORITY.PROCESSOR.STATISTIC, geoDataFilter('wellSymbol'));

    hwcharts.registerAction({
        type: 'incrementalRenderFinished',
        event: 'incrementalRenderFinished',
        update: 'none'
    }, zrUtil.noop);
    
})
