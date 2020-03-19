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
        'hwchart.chart.wellLogging.track.BaseView'
    ]
}, function () {

    var zrUtil = zrender.util;
    var number = hwchart.util.number;
    var graphic = hwchart.util.graphic;
    var layout = hwchart.util.layout;
    var BaseView = hwchart.chart.wellLogging.track.BaseView;
    var BreakPolyline = hwchart.util.BreakPolyline;

    var DepthView = BaseView.extend({

        type: 'wellLogging.depth',
        updateData: function(node){
            DepthView.superApply(this, 'updateData', arguments);
        },

        renderHeader: function (node) {
            var nodeModel = node.getModel();
            var headerStyle = nodeModel.get('itemStyle.header') || {};

            var nodeLayout = node.getLayout();
            var headerLayout = nodeLayout.header;
            var x = number.niceForLine(0, headerStyle.borderWidth);
            var y = number.niceForLine(0, headerStyle.borderWidth);
            var width = headerLayout.width;
            var bg = new graphic.Rect({
                // draggable: true,
                shape: {
                    x: x,
                    y: y,
                    width: width,
                    height: headerLayout.height
                },
                style: {
                    fill: headerStyle.backgroundColor,
                    stroke: headerStyle.borderWidth == 0 ? 'none' : headerStyle.borderColor,
                    lineWidth: headerStyle.borderWidth
                }
            })

            var titleSub = new graphic.Text({
                style: zrUtil.defaults({
                    text: nodeModel.get('aliasName') || node.name,
                    textFill: headerStyle.textStyle.color || 'black'
                }, headerStyle.textStyle)
            })

            layout.positionElement(titleSub, layout.getLayoutInfo(headerStyle.textStyle), {
                x: x,
                y: y,
                width: width,
                height: headerLayout.height
            }, headerStyle.textStyle.margin);

            this.headerGroup.add(bg);
            this.headerGroup.add(titleSub);

            this.headerGroup.attr('position', [headerLayout.x, headerLayout.y]);
        },

        renderContent: function (node) {
            var nodeLayout = node.getLayout();
            var bodyLayout = nodeLayout.body;

            var width = bodyLayout.width;
            var height = bodyLayout.height;
            var nums = Math.floor(height / 5);

            var nodeModel = node.getModel();
            var data = nodeModel.getData().tickdata1;
            var coordinateSystem = nodeModel.coordinateSystem;
            var yAxis = coordinateSystem.getAxis('y');
            if(data.length>0){
                nodeModel.mergeOption({requestCompleted: true});
            }
            var scaleExtent = yAxis.scale.getExtent();
            var min = Math.floor(scaleExtent[0]);
            var max = Math.ceil(scaleExtent[1]);

            this.contentGroup.setClipPath(new graphic.Rect({
                shape: {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height
                }
            }));

            var tick1;
            var tick2;
            for(var i = min; i < max; i++){
                var y = number.niceForLine(yAxis.dataToCoord(i), 1);


                if(i % 10 == 0){
                    if(i !== 0){
                        var text =  new graphic.Line({
                            shape: {
                                x1: 0,
                                y1: y,
                                x2: width,
                                y2: y
                            },
                            style:{
                                text: i,
                                // textRotation: -Math.PI / 2,
                                fontWeight: 'bold',
                                lineWidth: 0
                            }
                        })
                        this.contentGroup.add(text);
                    }
                }
                // else if(i % 5 == 0){
                //     tick1 =  new graphic.Line({
                //         shape: {
                //             x1: 0,
                //             y1: y,
                //             x2: 7,
                //             y2: y
                //         },
                //         style:{
                //             lineWidth: 1
                //         }
                //     })
                //     tick2 =  new graphic.Line({
                //         shape: {
                //             x1: width - 7,
                //             y1: y,
                //             x2: width,
                //             y2: y
                //         },
                //         style:{
                //             lineWidth: 1
                //         }
                //     })
                // }
                // else{
                //     tick1 =  new graphic.Line({
                //         shape: {
                //             x1: 0,
                //             y1: y,
                //             x2: 5,
                //             y2: y
                //         },
                //         style:{
                //             lineWidth: 1
                //         }
                //     })
                //     tick2 =  new graphic.Line({
                //         shape: {
                //             x1: width - 5,
                //             y1: y,
                //             x2: width,
                //             y2: y
                //         },
                //         style:{
                //             lineWidth: 1
                //         }
                //     })
                // }
            }
            tick1 =  new BreakPolyline({
                shape: {
                    points: data
                },
                style:{
                    stroke: '#999',
                    lineWidth: 0.8
                }
            })
            this.contentGroup.add(tick1);
        }
    });

    hwchart.chart.wellLogging.track.DepthView = DepthView;

})
