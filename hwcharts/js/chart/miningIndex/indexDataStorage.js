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
Vmd.define('hwchart.chart.miningIndex.indexDataStorage', {
    requires: [
        'hwchart.chart.helper.ComposeIndexDesc']
}, function () {

    var ComposeIndexDesc = hwchart.chart.helper.ComposeIndexDesc;
    var zrUtil = zrender.util;
    var storage = zrUtil.createHashMap();

// For minimize the code size of common echarts package,
// do not put too much logic in this module.
    zrUtil.each(ComposeIndexDesc, function (val, idx) {
        storage.set(val.id, val);
    });

    hwchart.chart.miningIndex.miningDataStorage = {

        // The format of record: see `echarts.registerMap`.
        // Compatible with previous `echarts.registerMap`.
        registerComposeIndex: function (symbolJson) {
            zrUtil.assert(symbolJson, '');
            if (!zrUtil.isArray(symbolJson)) {
                symbolJson = [symbolJson];
            }
            zrUtil.each(symbolJson, function (json) {
                storage.set(json.id, json);
            });
        },

        retrieveComposeIndex : function (symbolId) {
            return storage.get(symbolId);
        }
    };
})

