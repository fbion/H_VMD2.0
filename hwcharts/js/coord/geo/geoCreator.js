﻿Vmd.define('hwchart.coord.geo.geoCreator', {
    requires: [
        'hwchart.coord.geo.Geo',
        'hwchart.util.layout',
        'hwchart.util.number',
        'hwchart.coord.geo.geoSourceManager',
        'hwchart.coord.geo.mapDataStorage'
    ]
}, function () {
    


    var zrUtil = zrender.util;

    var Geo = hwchart.coord.geo.Geo;

    var layout = hwchart.util.layout;

    var numberUtil = hwchart.util.number;

    var geoSourceManager = hwchart.coord.geo.geoSourceManager;

    var mapDataStorage = hwchart.coord.geo.mapDataStorage;

   

    /**
     * Resize method bound to the geo
     * @param {module:hwcharts/coord/geo/GeoModel|module:hwcharts/chart/map/MapModel} geoModel
     * @param {module:hwcharts/ExtensionAPI} api
     */
    function resizeGeo(geoModel, api) {
        var boundingCoords = geoModel.get('boundingCoords');

        if (boundingCoords != null) {
            var leftTop = boundingCoords[0];
            var rightBottom = boundingCoords[1];

            if (isNaN(leftTop[0]) || isNaN(leftTop[1]) || isNaN(rightBottom[0]) || isNaN(rightBottom[1])) { } else {
                this.setBoundingRect(leftTop[0], leftTop[1], rightBottom[0] - leftTop[0], rightBottom[1] - leftTop[1]);
            }
        }

        var rect = this.getBoundingRect();
        var boxLayoutOption;
        var center = geoModel.get('layoutCenter');
        var size = geoModel.get('layoutSize');
        var viewWidth = api.getWidth();
        var viewHeight = api.getHeight();
        var aspect = rect.width / rect.height * this.aspectScale;
        var useCenterAndSize = false;

        if (center && size) {
            center = [numberUtil.parsePercent(center[0], viewWidth), numberUtil.parsePercent(center[1], viewHeight)];
            size = numberUtil.parsePercent(size, Math.min(viewWidth, viewHeight));

            if (!isNaN(center[0]) && !isNaN(center[1]) && !isNaN(size)) {
                useCenterAndSize = true;
            } else { }
        }

        var viewRect;

        if (useCenterAndSize) {
            var viewRect = {};

            if (aspect > 1) {
                // Width is same with size
                viewRect.width = size;
                viewRect.height = size / aspect;
            } else {
                viewRect.height = size;
                viewRect.width = size * aspect;
            }

            viewRect.y = center[1] - viewRect.height / 2;
            viewRect.x = center[0] - viewRect.width / 2;
        } else {
            // Use left/top/width/height
            boxLayoutOption = geoModel.getBoxLayoutParams(); // 0.75 rate

            boxLayoutOption.aspect = aspect;
            viewRect = layout.getLayoutRect(boxLayoutOption, {
                width: viewWidth,
                height: viewHeight
            });
        }

        this.setViewRect(viewRect.x, viewRect.y, viewRect.width, viewRect.height);
        this.setCenter(geoModel.get('center'));
        this.setZoom(geoModel.get('zoom'));
    }
    /**
     * @param {module:hwcharts/coord/Geo} geo
     * @param {module:hwcharts/model/Model} model
     * @inner
     */


    function setGeoCoords(geo, model) {
        zrUtil.each(model.get('geoCoord'), function (geoCoord, name) {
            geo.addGeoCoord(name, geoCoord);
        });
    }

    var geoCreator = {
        // For deciding which dimensions to use when creating list data
        dimensions: Geo.prototype.dimensions,
        create: function (ecModel, api) {
            var geoList = []; // FIXME Create each time may be slow

            ecModel.eachComponent('geo', function (geoModel, idx) {
                var name = geoModel.get('map');
                var aspectScale = geoModel.get('aspectScale');
                var invertLongitute = true;
                var mapRecords = mapDataStorage.retrieveMap(name);

                if (mapRecords && mapRecords[0] && mapRecords[0].type === 'svg') {
                    aspectScale == null && (aspectScale = 1);
                    invertLongitute = false;
                } else {
                    aspectScale == null && (aspectScale = 0.75);
                }

                var geo = new Geo(name + idx, name, geoModel.get('nameMap'), invertLongitute);
                geo.aspectScale = aspectScale;
                geo.zoomLimit = geoModel.get('scaleLimit');
                geoList.push(geo);
                setGeoCoords(geo, geoModel);
                geoModel.coordinateSystem = geo;
                geo.model = geoModel; // Inject resize method

                geo.resize = resizeGeo;
                geo.resize(geoModel, api);
            });
            ecModel.eachSeries(function (seriesModel) {
                var coordSys = seriesModel.get('coordinateSystem');

                if (coordSys === 'geo') {
                    var geoIndex = seriesModel.get('geoIndex') || 0;
                    seriesModel.coordinateSystem = geoList[geoIndex];
                }
            }); // If has map series

            var mapModelGroupBySeries = {};
            ecModel.eachSeriesByType('map', function (seriesModel) {
                if (!seriesModel.getHostGeoModel()) {
                    var mapType = seriesModel.getMapType();
                    mapModelGroupBySeries[mapType] = mapModelGroupBySeries[mapType] || [];
                    mapModelGroupBySeries[mapType].push(seriesModel);
                }
            });
            zrUtil.each(mapModelGroupBySeries, function (mapSeries, mapType) {
                var nameMapList = zrUtil.map(mapSeries, function (singleMapSeries) {
                    return singleMapSeries.get('nameMap');
                });
                var geo = new Geo(mapType, mapType, zrUtil.mergeAll(nameMapList));
                geo.zoomLimit = zrUtil.retrieve.apply(null, zrUtil.map(mapSeries, function (singleMapSeries) {
                    return singleMapSeries.get('scaleLimit');
                }));
                geoList.push(geo); // Inject resize method

                geo.resize = resizeGeo;
                geo.aspectScale = mapSeries[0].get('aspectScale');
                geo.resize(mapSeries[0], api);
                zrUtil.each(mapSeries, function (singleMapSeries) {
                    singleMapSeries.coordinateSystem = geo;
                    setGeoCoords(geo, singleMapSeries);
                });
            });
            return geoList;
        },

        /**
         * Fill given regions array
         * @param  {Array.<Object>} originRegionArr
         * @param  {string} mapName
         * @param  {Object} [nameMap]
         * @return {Array}
         */
        getFilledRegions: function (originRegionArr, mapName, nameMap) {
            // Not use the original
            var regionsArr = (originRegionArr || []).slice();
            var dataNameMap = zrUtil.createHashMap();

            for (var i = 0; i < regionsArr.length; i++) {
                dataNameMap.set(regionsArr[i].name, regionsArr[i]);
            }

            var source = geoSourceManager.load(mapName, nameMap);
            zrUtil.each(source.regions, function (region) {
                var name = region.name;
                !dataNameMap.get(name) && regionsArr.push({
                    name: name
                });
            });
            return regionsArr;
        }
    };
    hwcharts.registerCoordinateSystem('geo', geoCreator);
  
  
    hwchart.coord.geo.geoCreator = geoCreator;
})