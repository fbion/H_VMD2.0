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
 * @module hwcharts/chart/helper/ComposeSymbol
 */
Vmd.define('hwchart.chart.helper.ComposeSymbol', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.symbol',
        'hwchart.util.number',
        'hwchart.util.symbolDataStorage'
    ]
}, function () {

    var _util = zrender.util;
    var defaults = _util.defaults;
    var inherits = _util.inherits;
    var retrieve2 = _util.retrieve2;

    var Symbol = hwchart.util.symbol;
    var graphic = hwchart.util.graphic;
    var symbolDataStorage = hwchart.util.symbolDataStorage;

    /**
     * @constructor
     * @param {module:hwcharts/data/List} data
     * @param {number} idx
     * @extends {module:zrender/graphic/Group}
     */
    function ComposeSymbol(symbolId, symbolDesc, useCache) {
        graphic.Group.call(this);

        this._symbolId = symbolId;
        this._symbolDesc = symbolDesc;
        this._useCache = useCache;

        this.updateData();
    }

    var composeSymbolProto = ComposeSymbol.prototype;

    /**
     * Highlight symbol
     */
    composeSymbolProto.highlight = function () {
        // this.trigger('emphasis');
        this.traverse(function (symbol) {
            symbol.trigger('emphasis');
        });
    };

    /**
     * Downplay symbol
     */
    composeSymbolProto.downplay = function () {
        // this.trigger('normal');
        this.traverse(function (symbol) {
            symbol.trigger('normal');
        });
    };

    /**
     * Update symbol properties
     * @param  {module:hwcharts/data/List} data
     * @param  {number} idx
     */
    composeSymbolProto.updateData = function () {
        var symbolData = symbolDataStorage.retrieveComposeSymbol(this._symbolId, this._useCache);

        if(this._useCache){
            var image = new zrender.Image({
                style: {
                    x: 0,
                    y: 0,
                    image: symbolData,
                    width: symbolData.width,
                    height: symbolData.height
                }
            });
            this.add(image);
            return;
        }
        
        symbolData = retrieve2(this._symbolDesc, symbolData);

        this.removeAll();

        this.off('mouseover').off('mouseout').off('emphasis').off('normal');

        if(!symbolData){
            return;
        }

        this.attr('origin', [symbolData.x - symbolData.width / 2, symbolData.y - symbolData.height / 2]);
        this.attr('position', [symbolData.x - symbolData.width / 2, symbolData.y - symbolData.height / 2]);
        this.setClipPath(new graphic.Rect({
            shape: {
                x: symbolData.x,
                y: symbolData.y,
                width: symbolData.width,
                height: symbolData.height
            }
        }));

        var layers = (symbolData && symbolData.layers) || [];
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var shape = defaults({}, layer.shape);
            var itemPath;
            if(layer.type == 'text'){
                itemPath = new zrender.Text({});
            }
            else{
                itemPath = Symbol.createSymbol(
                    layer.type, shape.x, shape.y, shape.width, shape.height, null, false, shape
                );
            }
            var attrs = {
                z2: 99,
                silent: false
            };
            if (layer.style) {
                attrs.style = defaults({}, layer.style);
                if(layer.style.fill) {
                    attrs.style.fill = layer.style.fill == 'none' ? 'transparent' : layer.style.fill;
                }
                if(layer.style.stroke) {
                    attrs.style.stroke = layer.style.stroke == 'none' ? 'transparent' : layer.style.stroke;
                }
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
            this.add(itemPath);
        }
        var onEmphasis = function () {
            this.highlight();
        };
        var onNormal = function () {
            this.downplay();
        };

        this.on('mouseover', onEmphasis, this)
            .on('mouseout', onNormal, this)
            .on('emphasis', onEmphasis, this)
            .on('normal', onNormal, this);
    };

    composeSymbolProto.fadeOut = function (cb) {
        this.off('mouseover').off('mouseout').off('emphasis').off('normal');
        cb && cb();
    };

    inherits(ComposeSymbol, zrender.Group);
    hwchart.chart.helper.ComposeSymbol = ComposeSymbol;

})
