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

    var _default = {
        id: '_defalut_', //工业油流井
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        layers: [{
            type: 'circle',
            style: {
                fill: 'RGB(0, 0, 0)'
            },
            shape: {
                cx: 50,
                cy: 50,
                r: 50
            }
        }]
    };

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

        retrieveComposeSymbol: function (symbolId, useCache) {
            if(useCache){
                var desc = storage.get(symbolId) || _default;
                var canvasImage = cacheCanvasStore.get(symbolId) || drawImage(desc);
                return canvasImage;
            }
            return storage.get(symbolId);
        }
    };

    function drawImage(symbolData){
        if(!symbolData){
            return;
        }
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        var width = symbolData.width;
        var height = symbolData.height;
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.save();

        var layers = symbolData.layers || [];
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var shape = zrUtil.defaults({}, layer.shape);
            var style = zrUtil.defaults({}, layer.style);
            ctx.beginPath();
            if(style.fill){
                ctx.fillStyle = style.fill;
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
            if(style.fill){
                ctx.fill();
            }
            ctx.closePath();
        }

        ctx.restore();
        cacheCanvasStore.set(symbolData.id, canvas);
        return canvas;

    }
})

