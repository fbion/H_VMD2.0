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
Vmd.define('hwchart.chart.wellLogging.track.DepthView', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.number',
        'hwchart.util.layout',
        "hwchart.util.shape.segments",
        'hwchart.chart.wellLogging.track.BaseView'
    ]
}, function () {
    var BaseView = hwchart.chart.wellLogging.track.BaseView;

    var zrUtil = zrender.util;
    var number = hwchart.util.number;
    var graphic = hwchart.util.graphic;
    var layout = hwchart.util.layout;
    var SegmentsShape = hwchart.util.shape.segments;

    var DepthView = BaseView.extend({

        type: 'wellLogging.depth',

        init: function(seriesModel, node, api){

            this.headerGroup = new graphic.Group();
            this.contentGroup = new graphic.Group();

            DepthView.superApply(this, 'init', arguments);
        },

        updateData: function(node){

            this.updateHeader(node);
            this.updateContent(node);

            DepthView.superApply(this, 'updateData', arguments);
        },

        updateHeader: function (node) {
            var nodeModel = node.getModel();
            var headerStyle = nodeModel.get('itemStyle.header') || {};

            var nodeLayout = node.getLayout();
            var headerLayout = nodeLayout.header;
            var x = number.niceForLine(0, headerStyle.borderWidth);
            var y = number.niceForLine(0, headerStyle.borderWidth);
            var width = headerLayout.width;

            var headerRect = this.headerBgEl == null ? (this.headerBgEl = new graphic.Rect()) : this.headerBgEl;
            headerRect.setShape({
                x: x,
                y: y,
                width: width,
                height: headerLayout.height
            });
            headerRect.useStyle({
                fill: headerStyle.backgroundColor,
                stroke: headerStyle.borderWidth == 0 ? 'none' : headerStyle.borderColor,
                lineWidth: headerStyle.borderWidth
            });

            var titleSub = this.titleEl == null ? (this.titleEl = new graphic.Text({
                style: zrUtil.defaults({
                    text: nodeModel.get('aliasName') || node.name,
                    textFill: headerStyle.textStyle.color || 'black'
                }, headerStyle.textStyle)
            })) : this.titleEl;

            layout.positionElement(titleSub, layout.getLayoutInfo(headerStyle.textStyle), {
                x: x,
                y: y,
                width: width,
                height: headerLayout.height
            }, headerStyle.textStyle.margin);

            this.headerGroup.add(headerRect);
            this.headerGroup.add(titleSub);

            this.headerGroup.attr('position', [headerLayout.x, headerLayout.y]);
        },

        updateContent: function (node) {
            var nodeLayout = node.getLayout();
            var bodyLayout = nodeLayout.body;

            var width = bodyLayout.width;
            var height = bodyLayout.height;

            var nodeModel = node.getModel();
            var data = nodeModel.getData();

            this.contentGroup.setClipPath(new graphic.Rect({
                shape: {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height
                }
            }));

            var tickEl = this.tickEl == null ? (this.tickEl = new SegmentsShape({})) : this.tickEl;
            tickEl.setShape({
                segs: data.mainTickData
            });
            tickEl.useStyle(nodeModel.getModel("tick.lineStyle").getLineStyle());
            this.contentGroup.add(tickEl);

            var textGroup = this.textGroup == null ? (this.textGroup = new graphic.Group()) : this.textGroup;
            this.contentGroup.add(textGroup);
            textGroup.removeAll();

            var textData = data.textData;
            for(var i = 0; i < textData.length;) {
                var text = textData[i++];
                var x1 = 0;
                var y1 = textData[i++];
                var x2 = textData[i++];
                var y2 = y1;
                var textEl = new graphic.Line({
                    shape: {
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    },
                    style:{
                        text: text,
                        // textRotation: -Math.PI / 2,
                        fontWeight: 'bold',
                        lineWidth: 0
                    }
                });
                textGroup.add(textEl);
            }
        }
    });

    hwchart.chart.wellLogging.track.DepthView = DepthView;

})
