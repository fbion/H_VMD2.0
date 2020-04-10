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
Vmd.define('hwchart.chart.wellLogging.track.TrackView', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.number',
        'hwchart.util.layout',
        "hwchart.util.shape.segments",
        "hwchart.chart.wellLogging.track.BaseView"
    ]
}, function () {
    var BaseView = hwchart.chart.wellLogging.track.BaseView;

    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
    var number = hwchart.util.number;
    var layout = hwchart.util.layout;

    var SegmentsShape = hwchart.util.shape.segments;

    function getParentNodeBorderWidth(node){
        var parentNode = node.parentNode;
        while(parentNode){
            var borderWidth = parentNode.getModel().get('headerStyle.borderWidth');
            if(borderWidth){
                return borderWidth;
            }
            parentNode = parentNode.parentNode;
        }
        return 0;
    }

    var TrackView = BaseView.extend({

        type: 'wellLogging.track',

        init: function(seriesModel, node, api){
            this.titleGroup = new graphic.Group();
            this.headerGroup = new graphic.Group();
            this.contentGroup = new graphic.Group();

            TrackView.superApply(this, 'init', arguments);
        },


        /**
         * Update symbol properties
         * @param  {module:echarts/data/List} data
         * @param  {number} idx
         */
        updateData: function (node) {
            this.updateTitle(node);
            this.updateHeader(node);
            this.renderContent(node);
        },


        updateTitle: function (node) {
            var nodeModel = node.getModel();
            var titleStyle = nodeModel.get('itemStyle.title');

            var nodeLayout = node.getLayout();
            var titleLayout = nodeLayout.title;

            if(titleStyle.show === false){
                this.headerGroup.removeAll();
                return null;
            }

            var borderWidth = titleStyle.borderWidth;
            var borderColor = titleStyle.borderColor;

            var bg = this.titleBgEl == null ? (this.titleBgEl = new graphic.Rect()) : this.titleBgEl;
            bg.setShape({
                x: number.niceForLine(0, borderWidth),
                y: number.niceForLine(0, borderWidth),
                width: titleLayout.width,
                height: titleLayout.height
            });
            bg.useStyle({
                fill: titleStyle.backgroundColor,
                stroke: borderWidth == 0 ? 'none' : borderColor,
                lineWidth: borderWidth
            });

            var titleSub = this.titleEl == null ? (this.titleEl = new graphic.Text({
                style: zrUtil.defaults({
                    text: nodeModel.get('aliasName') || node.name,
                    textFill: titleStyle.textStyle.color || 'black'
                }, titleStyle.textStyle)
            })) : this.titleEl;

            layout.positionElement(titleSub, layout.getLayoutInfo(titleStyle.textStyle), {
                x: 0,
                y: 0,
                width: titleLayout.width,
                height: titleLayout.height
            }, titleStyle.textStyle.margin);

            this.titleGroup.add(bg);
            this.titleGroup.add(titleSub);

            this.titleGroup.attr('position', [titleLayout.x, titleLayout.y]);
        },

        updateHeader: function (node) {
            var nodeModel = node.getModel();
            var headerStyle = nodeModel.get('itemStyle.header') || {};

            var nodeLayout = node.getLayout();
            var headerLayout = nodeLayout.header;

            var borderWidth = headerStyle.borderWidth;
            var borderColor = headerStyle.borderColor;

            var parentBorderWidth = getParentNodeBorderWidth(node);

            var headerRect = this.headerBgEl == null ? (this.headerBgEl = new graphic.Rect()) : this.headerBgEl;
            headerRect.setShape({
                x:  number.niceForLine(0, borderWidth),
                y:  number.niceForLine(0, borderWidth),
                width: headerLayout.width - parentBorderWidth,
                height: headerLayout.height - parentBorderWidth
            });
            headerRect.useStyle({
                fill: headerStyle.backgroundColor || 'none',
                stroke: borderWidth == 0 ? 'none' : borderColor,
                lineWidth: borderWidth
            });

            this.headerGroup.add(headerRect);
            this.headerGroup.attr('position', [headerLayout.x, headerLayout.y]);
        },

        renderContent: function (node) {
            var nodeModel = node.getModel();
            var bodyStyle = nodeModel.get('itemStyle.body') || {};

            var nodeLayout = node.getLayout();
            var bodyLayout = nodeLayout.body;

            var borderWidth = bodyStyle.borderWidth;
            var borderColor = bodyStyle.borderColor;

            var bodyRect = this.bodyBgEl == null ? (this.bodyBgEl = new graphic.Rect()) : this.bodyBgEl;
            bodyRect.setShape({
                x: number.niceForLine(0, borderWidth),
                y: number.niceForLine(0, borderWidth),
                width: bodyLayout.width,
                height: bodyLayout.height
            });
            bodyRect.useStyle({
                fill: bodyStyle.backgroundColor || 'none',
                stroke: borderWidth == 0 ? 'none' : borderColor,
                lineWidth: borderWidth
            });

            this.contentGroup.add(bodyRect);
            this.contentGroup.attr('position', [bodyLayout.x, bodyLayout.y]);

            var isGridShow = nodeModel.get('itemStyle.grid.show');
            if(isGridShow !== false){
                this.updateVGrid(node);
                this.updateHGrid(node);
            }
            else{
                this.vGridGroup && this.contentGroup.remove(this.vGridGroup);
                this.hGridGroup && this.contentGroup.remove(this.hGridGroup);
            }
        },

        updateVGrid: function (node) {
            var nodeModel = node.getModel();

            var vgridStyle = nodeModel.get('itemStyle.grid.vertical');
            if(!vgridStyle || vgridStyle.show === false || node.hasTrack){
                this.vGridGroup && this.contentGroup.remove(this.vGridGroup);
                return;
            }

            this.vGridGroup = this.vGridGroup || new graphic.Group();

            var borderWidth = vgridStyle.borderWidth;
            var borderColor = vgridStyle.borderColor;

            var thickWidth = zrUtil.retrieve2(vgridStyle.thick && vgridStyle.thick.borderWidth, borderWidth);
            var thickColor = zrUtil.retrieve2(vgridStyle.thick && vgridStyle.thick.borderColor, borderColor);

            var thinWidth = zrUtil.retrieve2(vgridStyle.thin && vgridStyle.thin.borderWidth, borderWidth);
            var thinColor = zrUtil.retrieve2(vgridStyle.thin && vgridStyle.thin.borderColor, borderColor);

            var thickData = nodeModel.getData().vThickData;

            var lineEl;
            lineEl = this.vThickLine == null ? (this.vThickLine = new SegmentsShape({})) : this.vThickLine;
            lineEl.setShape({
                segs: thickData
            });
            lineEl.useStyle({
                    stroke: thickColor,
                    lineWidth: thickWidth
                }
            );
            this.vGridGroup.add(lineEl);

            var thinData = nodeModel.getData().vThinData;

            lineEl = this.vThinLine == null ? (this.vThinLine = new SegmentsShape({})) : this.vThinLine;
            lineEl.setShape({
                segs: thinData
            });
            lineEl.useStyle({
                stroke: thinColor,
                lineWidth: thinWidth
                }
            );
            this.vGridGroup.add(lineEl);

            this.contentGroup.add(this.vGridGroup);
        },

        updateHGrid: function (node) {
            var nodeModel = node.getModel();

            //var axisType = nodeModel.get('scaleType');
            var hgridStyle = nodeModel.get('itemStyle.grid.horizontal');
            if(!hgridStyle || hgridStyle.show === false || node.hasTrack){
                this.hGridGroup && this.contentGroup.remove(this.hGridGroup);
                return;
            }

            this.hGridGroup = this.hGridGroup || new graphic.Group();

            var borderWidth = hgridStyle.borderWidth;
            var borderColor = hgridStyle.borderColor;
            var thickWidth = zrUtil.retrieve2(hgridStyle.thick && hgridStyle.thick.borderWidth, borderWidth);
            var thickColor = zrUtil.retrieve2(hgridStyle.thick && hgridStyle.thick.borderColor, borderColor);
            var thinWidth = zrUtil.retrieve2(hgridStyle.thin && hgridStyle.thin.borderWidth, borderWidth);
            var thinColor = zrUtil.retrieve2(hgridStyle.thin && hgridStyle.thin.borderColor, borderColor);
            var midWidth = zrUtil.retrieve2(hgridStyle.middle && hgridStyle.middle.borderWidth, borderWidth);
            var midColor = zrUtil.retrieve2(hgridStyle.middle && hgridStyle.middle.borderColor, borderColor);
            var thickData = nodeModel.getData().hThickData;

            var lineEl;
            lineEl = this.hThickLine == null ? (this.hThickLine = new SegmentsShape({})) : this.hThickLine;
            lineEl.setShape({
                segs: thickData
            });
            lineEl.useStyle({
                    stroke: thickColor,
                    lineWidth: thickWidth
                }
            );
            this.hGridGroup.add(lineEl);

            var thinData = nodeModel.getData().hThinData;
            lineEl = this.hThinLine == null ? (this.hThinLine = new SegmentsShape({})) : this.hThinLine;
            lineEl.setShape({
                segs: thinData
            });
            lineEl.useStyle({
                    stroke: thinColor,
                    lineWidth: thinWidth
                }
            );
            this.hGridGroup.add(lineEl);

            var midData = nodeModel.getData().hMidData;
            lineEl = this.hMidLine == null ? (this.hMidLine = new SegmentsShape({})) : this.hMidLine;
            lineEl.setShape({
                segs: midData
            });
            lineEl.useStyle({
                    stroke: midColor,
                    lineWidth: midWidth
                }
            );
            this.hGridGroup.add(lineEl);

            this.contentGroup.add(this.hGridGroup);
        },

        addTrack: function (track) {
            this.headerGroup.add(track.titleGroup);
            this.headerGroup.add(track.headerGroup);
            this.contentGroup.add(track.contentGroup);
        },

        addElement: function (track) {
            this.headerGroup.add(track.headerGroup);
            this.contentGroup.add(track.contentGroup);
        }
    });

    hwchart.chart.wellLogging.track.TrackView = TrackView;

})