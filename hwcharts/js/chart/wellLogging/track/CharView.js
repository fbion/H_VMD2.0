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
Vmd.define('hwchart.chart.wellLogging.track.CharView', {
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

    var CharView = BaseView.extend({

        type: 'wellLogging.char',

        init: function(seriesModel, node, api){

            this.headerGroup = new graphic.Group();
            this.contentGroup = new graphic.Group();

            CharView.superApply(this, 'init', arguments);
        },

        updateData: function(node){

            this.updateHeader(node);
            this.updateContent(node);

            CharView.superApply(this, 'updateData', arguments);
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
            var backgroundColor = nodeModel.get("backgroundColor");
            var borderColor = nodeModel.get("borderColor");
            var borderWidth = nodeModel.get("borderWidth");

            this.contentGroup.removeAll();
            this.contentGroup.setClipPath(new graphic.Rect({
                shape: {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height
                }
            }));

            var data = nodeModel.getData();
            var points = data.points;

            for(var i = 0; i < points.length; ) {
                var rect = new graphic.Rect();
                var y = points[i++];
                rect.setShape({
                    x: 0,
                    y: y,
                    width: width,
                    height: points[i++] - y
                });
                rect.useStyle({
                    text: points[i++],
                    fill: backgroundColor,
                    stroke: borderColor,
                    lineWidth: borderWidth
                });
                this.contentGroup.add(rect);
            }
        }
    });

    hwchart.chart.wellLogging.track.CharView = CharView;

})
