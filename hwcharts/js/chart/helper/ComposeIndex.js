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
 * @module hwcharts/chart/helper/ComposeIndex
 */
Vmd.define('hwchart.chart.helper.ComposeIndex', {
    requires: [
        'hwchart.config.miningIndexMap',
        'hwchart.util.graphic',
        'hwchart.util.symbol',
        'hwchart.util.number',
        'hwchart.chart.helper.Symbol',
        'hwchart.util.indexDataStorage'
    ]
}, function () {

    var zrUtil = zrender.util;
    var miningIndexMap = hwchart.config.miningIndexMap;
    var Symbol = hwchart.util.symbol;

    var SymbolClz = hwchart.chart.helper.Symbol;
    var graphic = hwchart.util.graphic;
    var indexDataStorage = hwchart.util.indexDataStorage;



    function normalizeSymbolSize(symbolSize, w, h) {
        w = (!isNaN(w) && w > 0) ? w : 1;
        h = (!isNaN(h) && h > 0) ? h : 1;
        if (!zrUtil.isArray(symbolSize)) {
            symbolSize = [+symbolSize / w, +symbolSize / h];
        }
        return symbolSize;
    }

    /**
     * @constructor
     * @param {module:hwcharts/data/List} data
     * @param {number} idx
     * @extends {module:zrender/graphic/Group}
     */
    function ComposeIndex(data, idx, seriesScope) {
        
        graphic.Group.call(this);
        this.group = new graphic.Group();
        this.add(this.group);

        this.updateData(data, idx, seriesScope);
    }

    var ComposeIndexProto = ComposeIndex.prototype;

    /**
     * Highlight symbol
     */
    ComposeIndexProto.highlight = function () {
        // this.trigger('emphasis');
        this.group.traverse(function (symbol) {
            symbol.trigger('emphasis');
        });
    };

    /**
     * Downplay symbol
     */
    ComposeIndexProto.downplay = function () {
        // this.trigger('normal');
        this.group.traverse(function (symbol) {
            symbol.trigger('normal');
        });
    };

    /**
     * Update symbol properties
     * @param  {module:hwcharts/data/List} data
     * @param  {number} idx
     */
    ComposeIndexProto.updateData = function (data, idx, seriesScope,type) {
        var self = this;
        this.params = {};
        var symbolId = data.getItemVisual(idx, 'symbol');
        symbolId = miningIndexMap[symbolId] || symbolId;
        var symbolData = indexDataStorage.retrieveComposeIndex(symbolId);
        // zrUtil.assert(symbolData, 'id为' + symbolId + '的符号未定义');

        var color = data.getItemVisual(idx, 'color');
        this.group.removeAll();

        this.off('mouseover').off('mouseout').off('emphasis').off('normal').off("click");

        if (symbolData) {
            var w = symbolData && symbolData.width;
            var h = symbolData && symbolData.height;
            var x = symbolData && symbolData.x;
            var y = symbolData && symbolData.y;
            //var position = data.getItemLayout(idx);
            var symbolSize = data.getItemVisual(idx, 'symbolSize');
            var symbolRotation = data.getItemVisual(idx, 'symbolRotation') || 0;
            this.group.attr('scale', normalizeSymbolSize(symbolSize, w, h));
            this.group.attr('origin', [-symbolSize / 2 - 2, -symbolSize / 2 - 2]);
            this.group.attr('rotation', symbolRotation * 180 / Math.PI);
            this.group.setClipPath(new graphic.Rect({
                shape: {x: x, y: y, width: w, height: h}
            }));
            
            graphic.initProps(this.group, {
                scale: normalizeSymbolSize(symbolSize, w, h)
            }, data.hostModel, idx);

            if (data._nameList[idx] != undefined) {
                data._nameList[idx] = data._nameList[idx] || data._idList[idx];
                var backSymbol = new SymbolClz(data, idx);
                backSymbol.childAt(0).attr({
                    z2: 0
                });
                backSymbol.childAt(0).style.fill = 'transparent';
                this.add(backSymbol);
            }
            // 伞形开采指标
            if(symbolId == "oilWellIndex" ||symbolId == "waterWellIndex" ){
                var layers = (symbolData && symbolData.layers) || [];
                var rawDataItem = data.getRawDataItem(idx);
                var describe = rawDataItem.describe;
                var valueData = rawDataItem.value;
                var r = rawDataItem.lcz/rawDataItem.maxlcz*(50-25)+25;
                var PI = 3.14;
                var H = 60;
                var W = 8;
                var sp = 6;
                var cx = 100;
                var cy = 100;
                var n = 0;
                var waterR = null;
                var end1 = null,
                    end2 = null;
                var oilsPos = null;
                if(!type){
                    type = 2;
                }
                self.params.type = type;
                if(type === 1){
                    oilsPos = (cx-r);
                }else if(type === 2){
                    oilsPos = cx-(W/2+sp+W);
                }else if(type === 3){
                    oilsPos = cx+r-3*W-2*sp;
                }else if(type === 4){
                    oilsPos = cx-r-3*W-2*sp;
                }
                valueData.forEach(function(item,index){
                    var ind = describe[index]
                    var layer = zrender.util.clone(layers[ind]);
                    var shape = zrender.util.clone(layer.shape) || {};
                    if(describe[index] == 'lcq'){
                        shape.r = r;
                        item = item/rawDataItem.lcz*PI;
                        shape.startAngle = PI ;
                        shape.endAngle = PI-item;
                        end1 = PI-item;
                    }else if(describe[index] == 'lcs'){
                        shape.r = r;
                        item = item/rawDataItem.lcz*PI;
                        if(describe[index-1]&&describe[index-1] =='lcq'){
                            shape.startAngle = end1;
                            shape.endAngle = end1-item;
                            end2 = end1-item;
                        }else{
                            shape.startAngle = PI ;
                            shape.endAngle = PI-item; 
                            end2 = end1-item;
                        }
                    }else if(describe[index] == 'lcy'){
                        shape.r = r;
                        item = item/rawDataItem.lcz*PI;
                        if(describe[index-1]&&(describe[index-1] =='lcs'||describe[index-1] =='lcq')){
                            shape.startAngle = end2;
                            shape.endAngle = 0;
                        }else {
                            shape.startAngle = PI ;
                            shape.endAngle = 0; 
                        }
                    }else if(describe[index] == 'rcy'){
                        item = item/(rawDataItem.maxRcy)*(H-10)+10;
                        if(type===4){
                            shape.x = oilsPos+(W+sp)*0;
                        }else{
                            shape.x = oilsPos+(W+sp)*(n);
                        }
                        shape.y = cy - item;
                        shape.height = item;
                        shape.width = W;
                        n++;
                    }else if(describe[index] == 'rcs'){
                        item = item/(rawDataItem.maxRcs)*(H-10)+10;
                        if(type===4){
                            shape.x = oilsPos+(W+sp)*1;
                        }else{
                            shape.x = oilsPos+(W+sp)*(n);
                        }
                        shape.y = cy - item;
                        shape.height = item;
                        shape.width = W;
                        n++;
                    }else if(describe[index] == 'rcq'){
                        item = item/(rawDataItem.maxRcq)*(H-10)+10;
                        if(type===4){
                            shape.x = oilsPos+(W+sp)*2;
                        }else{
                            shape.x = oilsPos+(W+sp)*(n);
                        }
                        shape.y = cy - item;
                        shape.height = item;
                        shape.width = W;
                        n++;
                    } if(describe[index] == 'lzs'){
                        waterR = item/rawDataItem.maxlzs*(50-25)+25;
                        shape.r = waterR;
                        shape.startAngle = PI ;
                        shape.endAngle = 0;
                    }if(describe[index] == 'rzs'){
                        item = item/(rawDataItem.maxRzs)*(H-10)+10;
                        if(type === 1){
                            shape.x = cx-waterR;
                        }else if(type === 2){
                            shape.x = cx-W/2;
                        }else if(type === 3){
                            shape.x = cx+waterR-W/2;
                        }else if(type === 4){
                            shape.x = cx-waterR-W/2;
                        }
                        shape.y = cy - item;
                        shape.height = item;
                        shape.width = W;
                    }
                    var itemPath = Symbol.createSymbol(
                        layer.type, shape.cx, shape.cy, shape.width, shape.height, color, false, shape
                    );
                    itemPath.name = describe[index];
                    var attrs = {
                        z2: 99,
                        silent: false
                    };
                    if (layer.style) {
                        layer.style.fill = layer.style.fill || 'transparent';
                        layer.style.stroke = layer.style.stroke || 'transparent';
                        attrs.style = layer.style;
                    }
                    if (layer.position || layer.rotation || layer.scale) {
                        var position = layer.position || [0, 0];
                        var rotation = layer.rotation || 0;
                        var scale = layer.scale || [1, 1];
                        var boundingRect = itemPath.getBoundingRect();
                        attrs.position = position;
                        attrs.rotation = rotation;
                        attrs.scale = scale;
                        itemPath.origin = [boundingRect.x + boundingRect.width / 2, boundingRect.y + boundingRect.height / 2];
                    }
                    itemPath.attr(attrs);
                    graphic.setHoverStyle(itemPath);
                    self.group.add(itemPath);
                });
            }
            
            var onEmphasis = function () {
                this.highlight();
            };
            var onNormal = function () {
                this.downplay();
            };

            var onSelect = function(){
            var seft = this;
               console.log(this)
               setTimeout(function(){
                // seft.group.childOfName('lcq').attr({
                //     style: {
                //         fill: 'rgb(0,0,0,0)'
                //     }
                // });
                //seft.group.childOfName('lcq').hide();
                
               },500)
               
            }

            //this._updateCommon(data, idx, symbolSize, seriesScope);

            this.on('mouseover', onEmphasis, this)
                .on('mouseout', onNormal, this)
                .on("click",onSelect,this)
                .on('emphasis', onEmphasis, this)
                .on('normal', onNormal, this);

            return self.group;
        }
    };

    ComposeIndexProto.fadeOut = function (cb) {
        this.off('mouseover').off('mouseout').off('emphasis').off('normal');
        cb && cb();
    };
    // 同比缩放
    ComposeIndexProto.updateScale = function (data, idx) {
        var point = data.getItemLayout(idx);
        var el = data.getItemGraphicEl(idx);
        var scale = data.hostModel.get('scale');
        var ecModel = data.hostModel.ecModel;
        if(!isNaN(scale)){
            var geo = ecModel.getComponent('geo');
            var zoom = geo.coordinateSystem._zoom;
            el.attr('scale', [zoom, zoom]);
        }
    };
    function findNextIndex(arr,i){
        var num = 0;
        if(i<2){
            if(arr[i+1]!=''){
                return arr[i+1]
             }else{
                findNextIndex(arr,i+1)
             }
        }else{
            return num;
        }
    }
    zrUtil.inherits(ComposeIndex, zrender.Group);
    hwchart.chart.helper.ComposeIndex = ComposeIndex;
})
