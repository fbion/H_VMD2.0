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
Vmd.define('hwchart.chart.wellLogging.track.CurveView', {
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

    var CurveView = BaseView.extend({

        type: 'wellLogging.curve',

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

            CurveView.superApply(this, 'init', arguments);
        },

        updateData: function(node){

            this.updateHeader(node);
            this.updateContent(node);

            CurveView.superApply(this, 'updateData', arguments);
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
                    fill: '#eee',
                    stroke: headerStyle.borderWidth == 0 ? 'none' : headerStyle.borderColor,
                    lineWidth: headerStyle.borderWidth
                });

                headerRect.animate('shape', true)
                    .when(1000, {
                        width: width
                    })
                    .done(function(){})
                    .start()
            }

            this.headerGroup.add(headerRect);

            //道头线
            var yPos = number.niceForLine(headerLayout.height - padding[2], lineStyle.lineWidth);
            var lineEl = this.headerLineEl == null ? (this.headerLineEl = new graphic.Line()) : this.headerLineEl;
            lineEl.setShape({
                x1: padding[3],
                y1: yPos,
                x2: headerLayout.width - padding[1],
                y2: yPos
            });
            lineEl.useStyle(zrUtil.defaults(
                {
                    strokeNoScale: true,
                    fill: 'none'
                },
                lineStyle
            ));
            this.headerGroup.add(lineEl);

            //最小值标签
            var minLabel = this.minLabelEl == null ? (this.minLabelEl = new graphic.Text()) : this.minLabelEl;
            minLabel.useStyle(
                zrUtil.defaults({
                    text: nodeModel.get('leftScale'),
                    textFill: color,
                    textAlign: 'left'
                }, headerStyle.textStyle));
            this.headerGroup.add(minLabel);

            //最大值标签
            var maxLabel = this.maxLabelEl == null ? (this.maxLabelEl = new graphic.Text()) : this.maxLabelEl;
            maxLabel.useStyle(
                zrUtil.defaults({
                    text: nodeModel.get('rightScale'),
                    textFill: color,
                    textAlign: 'left'
                }, headerStyle.textStyle));
            this.headerGroup.add(maxLabel);

            //单位标签
            var unitLabel = this.unitLabelEl == null ? (this.unitLabelEl = new graphic.Text()) : this.unitLabelEl;
            unitLabel.useStyle(
                zrUtil.defaults({
                    text: nodeModel.get('unit'),
                    textFill: color,
                    textAlign: 'left'
                }, headerStyle.textStyle));
            this.headerGroup.add(unitLabel);

            var minLabelBoundRect = minLabel.getBoundingRect();
            var maxLabelBoundRect = maxLabel.getBoundingRect();
            var unitLabelBoundRect = unitLabel.getBoundingRect();

            var maxLabelHeight = Math.max(minLabelBoundRect.height, maxLabelBoundRect.height);
            var labelYpos = headerLayout.height - padding[2] - maxLabelHeight - labelDistance - lineStyle.lineWidth / 2 + textPadding[2];
            minLabel.attr('position', [padding[3], labelYpos]);
            maxLabel.attr('position', [headerLayout.width - maxLabelBoundRect.width - padding[1], labelYpos]);
            unitLabel.attr('position', [(headerLayout.width - maxLabelBoundRect.width - padding[1] - unitLabelBoundRect.width / 2) / 2, labelYpos]);

            //道头标题
            var titleEl = this.titleEl == null ? (this.titleEl = new graphic.Text()) : this.titleEl;
            titleEl.useStyle(zrUtil.defaults({
                text: nodeModel.get('aliasName') || node.name,
                textFill: color || 'black'
            }, headerStyle.textStyle));

            this.headerGroup.add(titleEl);
            layout.positionElement(titleEl, layout.getLayoutInfo(
                zrUtil.defaults({
                    textVerticalAlign: 'bottom'
                },headerStyle.textStyle)), {
                x: 0,
                y: 0,
                width: headerLayout.width,
                height: headerLayout.height - padding[2] - maxLabelHeight
            }, headerStyle.textStyle.margin);

            this.headerGroup.add(titleEl);
            this.headerGroup.attr('position', [headerLayout.x, headerLayout.y]);

            if(!requestCompleted) {
                return;
            }
            var curveFills = nodeModel.get('curveFills') || [];
            var headerFill = nodeModel.get('headerFill');

            headerRect.useStyle({
                fill: headerStyle.backgroundColor
            });

            if(!headerFill || curveFills.length == 0) {
                this.headerFillGroup && headerFillGroup.removeAll();
                return;
            }

            //道头填充
            var textStyle = null;
            var fillWidth = width / curveFills.length;
            var fillY = y;
            switch (headerFill.type) {
                case "cover":
                    this.headerGroup.removeAll();
                    var textStyleModel = nodeModel.getModel("headerFill.textStyle");
                    textStyle = graphic.setTextStyle({}, textStyleModel, {
                        text: nodeModel.get("aliasName") || nodeModel.get("name"),
                        textWidth: fillWidth,
                        textFill: textStyleModel.getTextColor() || color,
                        textAlign: textStyleModel.get("textAlign"),
                        textPadding: textStyleModel.get("textPadding"),
                        textVerticalAlign: textStyleModel.get("textVerticalAlign"),
                        textBackgroundColor: textStyleModel.get("textBackgroundColor"),
                        truncate: textStyleModel.get("truncate")
                    }, {disableBox: true})

                    textStyle.truncate.outerWidth = fillWidth;
                    break;
                case "both":
                    fillY = yPos;
                    break;
                default:
                    break;
            }
            var fillHeight = height - fillY;

            var headerFillGroup = this.headerFillGroup == null ? (this.headerFillGroup = new graphic.Group()) : this.headerFillGroup;
            this.headerGroup.add(headerFillGroup);
            headerFillGroup.removeAll();

            zrUtil.each(curveFills, function(curveFill, index){
                if(!curveFill.data || curveFill.data.length == 0){
                    return;
                }
                var fillEl = new graphic.Rect();

                fillEl.setShape({
                    x: fillWidth * index,
                    y: fillY,
                    width: fillWidth,
                    height: fillHeight
                });

                //如果未定义面符号，则可能是纯色或渐变色
                var fillStyle = (zrUtil.isString(curveFill.fillStyle) && areaSymbolDataStorage.retrieveAreaSymbol(curveFill.fillStyle, true)) || curveFill.fillStyle;
                var style = zrUtil.defaults(
                    {
                        strokeNoScale: true,
                        stroke: headerFill.borderColor,
                        lineWidth: headerFill.borderWidth,
                        fill: fillStyle
                    }
                );
                if(textStyle) {
                    curveFill.name && (textStyle.text = curveFill.name);
                    style = zrUtil.defaults(style, textStyle, true)
                }

                fillEl.useStyle(style);
                headerFillGroup.add(fillEl);
            },this);
        },

        updateContent: function (node) {

            var nodeModel = node.getModel();

            var data = nodeModel.getData();
            var lineData = data.lineData

            if(lineData && lineData.length>0) {
                var nodeLayout = node.getLayout();
                var bodyLayout = nodeLayout.body;
                var width = bodyLayout.width;
                var height = bodyLayout.height;
                var secondScale = nodeModel.get('secondScale');

                if(secondScale >= 0) {
                    this.contentGroup.setClipPath(new graphic.Rect({
                        shape: {
                            x: 0,
                            y: 0,
                            width: width,
                            height: height
                        }
                    }));
                }

                var lineStyleModel = nodeModel.getModel('lineStyle');
                var lineStyle = lineStyleModel.getLineStyle();

                var lineEl = this.lineEl == null ? (this.lineEl = new SegmentsShape({})) : this.lineEl;
                lineEl.setShape({
                    segs: lineData
                });
                lineEl.useStyle(zrUtil.defaults(
                    {
                        strokeNoScale: true,
                        fill: 'none'
                    },
                    lineStyle
                ));
                this.contentGroup.add(lineEl);

                var curveFills = data.curveFills || [];
                if(curveFills.length == 0) {
                    this.fillGroup && fillGroup.removeAll();
                    return;
                }

                //曲线填充
                var fillGroup = this.fillGroup == null ? (this.fillGroup = new graphic.Group()) : this.fillGroup;
                this.contentGroup.add(fillGroup);
                fillGroup.removeAll();

                zrUtil.each(curveFills, function(curveFill){
                    if(!curveFill.data || curveFill.data.length == 0){
                        return;
                    }
                    var fillEl = new SegmentsShape({});
                    fillEl.setShape({
                        segs: curveFill.data
                    });

                    //如果未定义面符号，则可能是纯色或渐变色
                    var fillStyle = (zrUtil.isString(curveFill.fillStyle) && areaSymbolDataStorage.retrieveAreaSymbol(curveFill.fillStyle, true)) || curveFill.fillStyle;
                    fillEl.useStyle(zrUtil.defaults(
                        {
                            strokeNoScale: true,
                            fill: fillStyle
                        }
                    ));
                    this.fillGroup.add(fillEl);
                },this);
            }
        }
    });

    hwchart.chart.wellLogging.track.CurveView = CurveView;

})
