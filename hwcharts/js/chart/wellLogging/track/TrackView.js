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
        'hwchart.chart.wellLogging.track.BaseView'
    ]
}, function () {

    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
    var number = hwchart.util.number;
    var layout = hwchart.util.layout;
    var BaseView = hwchart.chart.wellLogging.track.BaseView;
    var BreakPolyline = hwchart.util.BreakPolyline;

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

            TrackView.superApply(this, 'init', arguments);
        },


        /**
         * Update symbol properties
         * @param  {module:echarts/data/List} data
         * @param  {number} idx
         */
        updateData: function (node) {
            this.titleGroup.removeAll();

            this.renderTitle(node);

            TrackView.superApply(this, 'updateData', arguments);
        },


        renderTitle: function (node) {
            var nodeModel = node.getModel();
            var titleStyle = nodeModel.get('itemStyle.title');

            var nodeLayout = node.getLayout();
            var titleLayout = nodeLayout.title;

            if(titleStyle.show === false){
                return null;
            }

            var borderWidth = titleStyle.borderWidth;
            var borderColor = titleStyle.borderColor;
            var bg = new graphic.Rect({
                z: 0,
                shape: {
                    x: number.niceForLine(0, borderWidth),
                    y: number.niceForLine(0, borderWidth),
                    width: titleLayout.width,
                    height: titleLayout.height
                },
                style: {
                    fill: titleStyle.backgroundColor,
                    stroke: borderWidth == 0 ? 'none' : borderColor,
                    lineWidth: borderWidth
                }
            })

            var titleSub = new graphic.Text({
                style: zrUtil.defaults({
                    text: nodeModel.get('aliasName') || node.name,
                    textFill: titleStyle.textStyle.color || 'black'
                }, titleStyle.textStyle)
            })

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

        renderHeader: function (node) {
            var nodeModel = node.getModel();
            var headerStyle = nodeModel.get('itemStyle.header') || {};

            var nodeLayout = node.getLayout();
            var headerLayout = nodeLayout.header;

            var borderWidth = headerStyle.borderWidth;
            var borderColor = headerStyle.borderColor;

            var parentBorderWidth = getParentNodeBorderWidth(node);

            var headerRect = new graphic.Rect({
                shape: {
                    x:  number.niceForLine(0, borderWidth),
                    y:  number.niceForLine(0, borderWidth),
                    width: headerLayout.width - parentBorderWidth,
                    height: headerLayout.height - parentBorderWidth
                },
                style:{
                    fill: headerStyle.backgroundColor || 'none',
                    stroke: borderWidth == 0 ? 'none' : borderColor,
                    lineWidth: borderWidth
                }
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

            var bodyRect = new graphic.Rect({
                z: 0,
                shape: {
                    x: number.niceForLine(0, borderWidth),
                    y: number.niceForLine(0, borderWidth),
                    width: bodyLayout.width,
                    height: bodyLayout.height
                },
                style:{
                    fill: bodyStyle.backgroundColor || 'none',
                    stroke: borderWidth == 0 ? 'none' : borderColor,
                    lineWidth: borderWidth
                }
            });
            this.contentGroup.add(bodyRect);
            this.contentGroup.attr('position', [bodyLayout.x, bodyLayout.y]);

            var isGridShow = nodeModel.get('itemStyle.grid.show');
            if(isGridShow !== false){
                this.renderVGrid(node);
                this.renderHGrid(node);
            }
        },

        renderVGrid: function (node) {
            var nodeModel = node.getModel();

            var vgridStyle = nodeModel.get('itemStyle.grid.vertical');
            if(!vgridStyle || vgridStyle.show === false || node.hasTrack){
                return;
            }

            var borderWidth = vgridStyle.borderWidth;
            var borderColor = vgridStyle.borderColor;

            var thickWidth = zrUtil.retrieve2(vgridStyle.thick && vgridStyle.thick.borderWidth, borderWidth);
            var thickColor = zrUtil.retrieve2(vgridStyle.thick && vgridStyle.thick.borderColor, borderColor);
            var thinWidth = zrUtil.retrieve2(vgridStyle.thin && vgridStyle.thin.borderWidth, borderWidth);
            var thinColor = zrUtil.retrieve2(vgridStyle.thin && vgridStyle.thin.borderColor, borderColor);
            var thickData = nodeModel.getData().VthickData;
            var thickline = new BreakPolyline({
                z: 1,
                shape: {
                    points: thickData
                }
            });

            thickline.useStyle({
                    stroke: thickColor,
                    lineWidth: thickWidth
                }
            );
            this.contentGroup.add(thickline);
            var thinData = nodeModel.getData().VthinData;
            var thinline = new BreakPolyline({
                z: 1,
                shape: {
                    points: thinData
                }
            });

            thinline.useStyle({
                    stroke: thinColor,
                    lineWidth: thinWidth
                }
            );
            this.contentGroup.add(thinline);
        },

        renderHGrid: function (node) {
            var nodeModel = node.getModel();

            //var axisType = nodeModel.get('scaleType');
            var hgridStyle = nodeModel.get('itemStyle.grid.horizontal');
            if(!hgridStyle || hgridStyle.show === false || node.hasTrack){
                return;
            }
            var borderWidth = hgridStyle.borderWidth;
            var borderColor = hgridStyle.borderColor;
            var thickWidth = zrUtil.retrieve2(hgridStyle.thick && hgridStyle.thick.borderWidth, borderWidth);
            var thickColor = zrUtil.retrieve2(hgridStyle.thick && hgridStyle.thick.borderColor, borderColor);
            var thinWidth = zrUtil.retrieve2(hgridStyle.thin && hgridStyle.thin.borderWidth, borderWidth);
            var thinColor = zrUtil.retrieve2(hgridStyle.thin && hgridStyle.thin.borderColor, borderColor);
            var midWidth = zrUtil.retrieve2(hgridStyle.middle && hgridStyle.middle.borderWidth, borderWidth);
            var midColor = zrUtil.retrieve2(hgridStyle.middle && hgridStyle.middle.borderColor, borderColor);
            var thickData = nodeModel.getData().HthickData;
            var thickline = new BreakPolyline({
                z: 1,
                shape: {
                    points: thickData
                }
            });

            thickline.useStyle({
                    stroke: thickColor,
                    lineWidth: thickWidth
                }
            );
            this.contentGroup.add(thickline);
            var thinData = nodeModel.getData().HthinData;
            var thinline = new BreakPolyline({
                z: 1,
                shape: {
                    points: thinData
                }
            });

            thinline.useStyle({
                    stroke: thinColor,
                    lineWidth: thinWidth
                }
            );
            this.contentGroup.add(thinline);
            var midData = nodeModel.getData().HmidData;
            var midline = new BreakPolyline({
                z: 1,
                shape: {
                    points: midData
                }
            });

            midline.useStyle({
                    stroke: midColor,
                    lineWidth: midWidth
                }
            );
            this.contentGroup.add(midline);
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