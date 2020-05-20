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
Vmd.define('hwchart.extension.openlayers.openlayers', {
    requires: [
        'hwchart.extension.openlayers.OpenLayersCoordSys',
        'hwchart.extension.openlayers.OpenLayersModel',
        'hwchart.extension.openlayers.OpenLayersView'
    ]

}, function () {


    var OpenLayersCoordSys = hwchart.extension.openlayers.OpenLayersCoordSys;


    hwcharts.registerCoordinateSystem('openlayers', OpenLayersCoordSys); // Action

    hwcharts.registerAction({
        type: 'openlayersRoam',
        event: 'openlayersRoam',
        update: 'updateLayout'
    }, function (payload, ecModel) {
        ecModel.eachComponent('openlayers', function (OpenLayersModel) {
            var openlayers = OpenLayersModel.getOpenLayers();
            var view = openlayers.getView();
            //地图中心
            var center = view.getCenter();
            var zoom = view.getZoom();
            OpenLayersModel.setCenterAndZoom(center, zoom);
        });
    });
    var exports = {};
    var version = '1.0.0';
    exports.version = version;

    hwchart.extension.openlayers.openlayers = exports;
});


