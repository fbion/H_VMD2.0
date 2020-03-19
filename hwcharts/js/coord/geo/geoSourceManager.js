Vmd.define('hwchart.coord.geo.geoSourceManager', {
    requires: [
        'hwchart.coord.geo.mapDataStorage',
        'hwchart.coord.geo.geoJSONLoader',
        'hwchart.coord.geo.geoSVGLoader'
    ]
}, function () {

  

    var _util = zrender.util;

    var each = _util.each;
    var createHashMap = _util.createHashMap;

    var mapDataStorage = hwchart.coord.geo.mapDataStorage;

    var geoJSONLoader = hwchart.coord.geo.geoJSONLoader;

    var geoSVGLoader = hwchart.coord.geo.geoSVGLoader;

    var BoundingRect = zrender.BoundingRect;

   
    var loaders = {
        geoJSON: geoJSONLoader,
        svg: geoSVGLoader
    };
    var _default = {
        /**
         * @param {string} mapName
         * @param {Object} nameMap
         * @return {Object} source {regions, regionsMap, nameCoordMap, boundingRect}
         */
        load: function (mapName, nameMap) {
            var regions = [];
            var regionsMap = createHashMap();
            var nameCoordMap = createHashMap();
            var boundingRect;
            var mapRecords = retrieveMap(mapName);
            each(mapRecords, function (record) {
                var singleSource = loaders[record.type].load(mapName, record);
                each(singleSource.regions, function (region) {
                    var regionName = region.name; // Try use the alias in geoNameMap

                    if (nameMap && nameMap.hasOwnProperty(regionName)) {
                        region = region.cloneShallow(regionName = nameMap[regionName]);
                    }

                    regions.push(region);
                    regionsMap.set(regionName, region);
                    nameCoordMap.set(regionName, region.center);
                });
                var rect = singleSource.boundingRect;

                if (rect) {
                    boundingRect ? boundingRect.union(rect) : boundingRect = rect.clone();
                }
            });
            return {
                regions: regions,
                regionsMap: regionsMap,
                nameCoordMap: nameCoordMap,
                // FIXME Always return new ?
                boundingRect: boundingRect || new BoundingRect(0, 0, 0, 0)
            };
        },

        /**
         * @param {string} mapName
         * @param {string} hostKey For cache.
         * @return {Array.<module:zrender/Element>} Roots.
         */
        makeGraphic: makeInvoker('makeGraphic'),

        /**
         * @param {string} mapName
         * @param {string} hostKey For cache.
         */
        removeGraphic: makeInvoker('removeGraphic')
    };

    function makeInvoker(methodName) {
        return function (mapName, hostKey) {
            var mapRecords = retrieveMap(mapName);
            var results = [];
            each(mapRecords, function (record) {
                var method = loaders[record.type][methodName];
                method && results.push(method(mapName, record, hostKey));
            });
            return results;
        };
    }

    function mapNotExistsError(mapName) { }

    function retrieveMap(mapName) {
        var mapRecords = mapDataStorage.retrieveMap(mapName) || [];
        return mapRecords;
    }


    hwchart.coord.geo.geoSourceManager = _default;
  
})
