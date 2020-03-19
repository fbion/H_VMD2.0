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
Vmd.define('hwchart.chart.wellLogging.track.BaseView', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.view.Component'
    ]
}, function () {

    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
    var ComponentView = hwchart.view.Component;

    var BaseView = ComponentView.extend({
        type: 'wellLogging.base',
        init: function(seriesModel, node, api){
            this.seriesModel = seriesModel;
            this.name = node.name;

            this.headerGroup = new graphic.Group();
            this.contentGroup = new graphic.Group();

            // this.titleGroup.on('click', function(){
            //     this.titleGroup.attr('position', [50,50])
            //     this.headerGroup.attr('position', [50,100])
            // }, this)
            this.updateData(node);
        },


        /**
         * Update symbol properties
         * @param  {module:echarts/data/List} data
         * @param  {number} idx
         */
        updateData: function (node) {
            this.headerGroup.removeAll();
            this.contentGroup.removeAll();

            this.renderHeader(node);
            this.renderContent(node);
            node._dirty = false;

            // this.on('mouseover', onEmphasis, this)
            //     .on('mouseout', onNormal, this)
            //     .on('emphasis', onEmphasis, this)
            //     .on('normal', onNormal, this);
        },

        renderHeader: function (node) {},

        renderContent: function (node) {},

        fadeOut: function (cb) {
            this.off('mouseover').off('mouseout').off('emphasis').off('normal');
            cb && cb();
        },

    });

    hwchart.chart.wellLogging.track.BaseView = BaseView;

})