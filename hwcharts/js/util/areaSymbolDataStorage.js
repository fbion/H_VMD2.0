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
Vmd.define('hwchart.util.areaSymbolDataStorage', {
    requires: [
        'hwchart.util.symbol',
        'hwchart.config.AreaSymbolDesc',
        "hwchart.util.symbolDataStorage"
    ]
}, function () {
    var symbolDataStorage = hwchart.util.symbolDataStorage;

    var AreaSymbolDesc = hwchart.config.AreaSymbolDesc;
    var zrUtil = zrender.util;
    var storage = zrUtil.createHashMap();

    var cacheCanvasStore = zrUtil.createHashMap();

// For minimize the code size of common hwcharts package,
// do not put too much logic in this module.
    zrUtil.each(AreaSymbolDesc, function (val, idx) {
        storage.set(val.id, val);
    });

    hwchart.util.areaSymbolDataStorage = {

        // The format of record: see `hwcharts.registerMap`.
        // Compatible with previous `hwcharts.registerMap`.
        registerAreaSymbol: function (symbolJson) {
            zrUtil.assert(symbolJson, '');
            if (!zrUtil.isArray(symbolJson)) {
                symbolJson = [symbolJson];
            }
            zrUtil.each(symbolJson, function (json) {
                storage.set(json.id, json);
            });
        },

        retrieveAreaSymbol: function (symbolId, useCache) {
            var desc = storage.get(symbolId);
            var symbolData;
            if(!desc){
                symbolData = symbolDataStorage.retrieveComposeSymbol(symbolId, true);
                if(symbolData){
                    return {
                        image: symbolData,
                        repeat: "repeat"
                    }
                }
                return null;
            }

            var extra = {
                sizes: desc.symbolSize,
                color: desc.color,
                backgroundColor: desc.backgroundColor
            }
            if(zrUtil.isObject(desc.symbol)) {
                symbolData = symbolDataStorage.drawImage(desc.symbol, extra);
            }
            else {
                symbolData = symbolDataStorage.retrieveComposeSymbol(desc.symbol, useCache, extra);
            }

            return {
                image: symbolData,
                repeat: desc.repeat
            }
        }
    };
})

