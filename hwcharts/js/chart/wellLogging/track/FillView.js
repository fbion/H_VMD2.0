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

/**
 * Symbol with ripple effect
 * @module echarts/chart/helper/ComposeSymbol
 */
Vmd.define('hwchart.chart.wellLogging.track.FillView', {
    requires: [
        'hwchart.util.graphic',
        "hwchart.util.format",
        'hwchart.util.number',
        'hwchart.util.layout',
        "hwchart.util.shape.segments",
        'hwchart.chart.wellLogging.track.BaseView',
        'hwchart.util.areaSymbolDataStorage'
    ]
}, function () {

    var zrUtil = zrender.util;

    var formatUtil = hwchart.util.format;
    var number = hwchart.util.number;
    var graphic = hwchart.util.graphic;
    var layout = hwchart.util.layout;
    var BaseView = hwchart.chart.wellLogging.track.BaseView;
    var SegmentsShape = hwchart.util.shape.segments;
    var areaSymbolDataStorage = hwchart.util.areaSymbolDataStorage;

    var FillView = BaseView.extend({

        type: 'wellLogging.fill',

        init: function(seriesModel, node, api){
            if (!this.__hasFetchData) {
                api.dispatchAction({
                    type: 'fetchData',
                    id: seriesModel.id,
                    name: seriesModel.name,
                    subType: seriesModel.subType,
                    seriesIndex:seriesModel.seriesIndex,
                    nodeType: 'curve',
                    params: {
                        curveName:node.name
                    }
                });
                this.__hasFetchData = true;
            }

            this.headerGroup = new graphic.Group();
            this.contentGroup = new graphic.Group();

            FillView.superApply(this, 'init', arguments);
        },

        updateData: function(node){

            this.updateHeader(node);
            this.updateContent(node);

            FillView.superApply(this, 'updateData', arguments);
        },

        updateHeader: function (node) {
            var nodeModel = node.getModel();

            var padding = formatUtil.normalizeCssArray(nodeModel.get('itemStyle.header.padding') || 0);
            var textPadding = formatUtil.normalizeCssArray(nodeModel.get('itemStyle.header.textStyle.textPadding') || 0);
            var labelDistance = nodeModel.get('itemStyle.header.labelDistance');

            var lineStyleModel = nodeModel.getModel('lineStyle');
            var lineStyle = lineStyleModel.getLineStyle();
            var headerStyle = nodeModel.get('itemStyle.header') || {};

            var nodeLayout = node.getLayout();
            var headerLayout = nodeLayout.header;

            var color = zrUtil.retrieve3(headerStyle.color, lineStyle.stroke, 'black');

            var requestCompleted = nodeModel.get('requestCompleted');
            var ParentNodeModel = node.parentNode.getModel();
            var ParentborderWidth = (ParentNodeModel.get('itemStyle.header.borderWidth')||0);
            var x = number.niceForLine(0, ParentborderWidth);
            var y = number.niceForLine(0, ParentborderWidth);
            var width = headerLayout.width - ParentborderWidth + headerStyle.borderWidth;
            var height = headerLayout.height;

            //道头背景
            var headerRect = this.headerBgEl;
            if(!headerRect){
                headerRect = this.headerBgEl = new graphic.Rect();
                headerRect.setShape({
                    x: x,
                    y: y,
                    width: 0,
                    height: height
                });

                headerRect.useStyle({
                    fill: headerStyle.backgroundColor
                });
            }

            this.headerGroup.add(headerRect);
        },

        updateContent: function (node) {

            var nodeModel = node.getModel();

            var data = nodeModel.getData();
        }
    });

    hwchart.chart.wellLogging.track.FillView = FillView;

})
