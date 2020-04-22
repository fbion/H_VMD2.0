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
Vmd.define('hwchart.util.symbolDataStorage', {
    requires: [
        'hwchart.util.symbol',
        'hwchart.config.ComposeSymbolDesc'
    ]
}, function () {
    var symbolUtil = hwchart.util.symbol;

    var ComposeSymbolDesc = hwchart.config.ComposeSymbolDesc;
    var zrUtil = zrender.util;
    var storage = zrUtil.createHashMap();

    var cacheCanvasStore = zrUtil.createHashMap();

// For minimize the code size of common hwcharts package,
// do not put too much logic in this module.
    zrUtil.each(ComposeSymbolDesc, function (val, idx) {
        storage.set(val.id, val);
    });

    hwchart.util.symbolDataStorage = {

        // The format of record: see `hwcharts.registerMap`.
        // Compatible with previous `hwcharts.registerMap`.
        registerComposeSymbol: function (symbolJson) {
            zrUtil.assert(symbolJson, '');
            if (!zrUtil.isArray(symbolJson)) {
                symbolJson = [symbolJson];
            }
            zrUtil.each(symbolJson, function (json) {
                storage.set(json.id, json);
            });
        },

        /**
         *
         * @param symbolId
         * @param useCache 是否使用图片
         * @param extra 额外数据，包括前景色，大小等
         * @returns {*|HTMLCanvasElement}
         */
        retrieveComposeSymbol: function (symbolId, useCache, extra) {
            if(useCache){
                var desc = storage.get(symbolId);
                var canvasImage = cacheCanvasStore.get(symbolId) || this.drawImage(desc, extra);
                return canvasImage;
            }
            return storage.get(symbolId);
        },

        drawImage: function(symbolData, extra){
            if(!symbolData){
                return;
            }

            var canvas = document.createElement("canvas");
            canvas.style.width = "100%";
            canvas.style.height = "100%";

            var sizes = (extra && extra.sizes) || [symbolData.width, symbolData.height];

            if(!isNaN(sizes)){
                sizes = (symbolData.width > symbolData.height) ? [sizes, sizes * symbolData.height / symbolData.width] : [sizes * symbolData.width / symbolData.height, sizes];
            }

            var scales = [sizes[0] / symbolData.width, sizes[1] / symbolData.height];

            var width = symbolData.width * scales[0];
            var height = symbolData.height * scales[1];
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.save();

            var color = extra && extra.color;
            var backgroundColor = extra && extra.backgroundColor;

            if(backgroundColor) {
                ctx.beginPath();
                ctx.fillStyle = backgroundColor;
                ctx.rect(0, 0, width, height);
                ctx.fill();
                ctx.closePath();
            }

            ctx.scale(scales[0],scales[1]);
            var layers = symbolData.layers || [];
            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                var shape = zrUtil.defaults({}, layer.shape);
                var style = zrUtil.defaults({}, layer.style);
                ctx.beginPath();
                var fillStyle = style.fill || color;
                if(fillStyle){
                    ctx.fillStyle = fillStyle;
                }
                var itemPath;
                if(layer.type == 'text'){
                    itemPath = new zrender.Text({});
                }
                else{
                    var itemPath = symbolUtil.createSymbol(
                        layer.type, shape.x, shape.y, shape.width, shape.height, 'red'
                    );
                    itemPath.buildPath(ctx, {
                        symbolType: layer.type,
                        keepShape: shape
                    });
                }
                if(fillStyle){
                    ctx.fill();
                }
                ctx.closePath();
            }

            ctx.restore();
            cacheCanvasStore.set(symbolData.id, canvas);
            return canvas;

        }
    };

})

