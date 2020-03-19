Vmd.define('hwchart.coord.geo.geoJSONLoader', {
    requires: [
        'hwchart.coord.geo.parseGeoJson',
        'hwchart.util.model',
        'hwchart.coord.geo.fix.nanhai',
        'hwchart.coord.geo.fix.textCoord',
        'hwchart.coord.geo.fix.geoCoord',
        'hwchart.coord.geo.fix.diaoyuIsland'
    ]
}, function () {
    var _util = zrender.util;

    var each = _util.each;

    var parseGeoJson = hwchart.coord.geo.parseGeoJson;

    var _model = hwchart.util.model;

    var makeInner = _model.makeInner;

    var fixNanhai = hwchart.coord.geo.fix.nanhai;

    var fixTextCoord = hwchart.coord.geo.fix.textCoord;

    var fixGeoCoord = hwchart.coord.geo.fix.geoCoord;

    var fixDiaoyuIsland = hwchart.coord.geo.fix.diaoyuIsland;

   
    // Built-in GEO fixer.
    var inner = makeInner();
    var _default = {
        /**
         * @param {string} mapName
         * @param {Object} mapRecord {specialAreas, geoJSON}
         * @return {Object} {regions, boundingRect}
         */
        load: function (mapName, mapRecord) {
            var parsed = inner(mapRecord).parsed;

            if (parsed) {
                return parsed;
            }

            var specialAreas = mapRecord.specialAreas || {};
            var geoJSON = mapRecord.geoJSON;
            var regions; // https://jsperf.com/try-catch-performance-overhead

            try {
                regions = geoJSON ? parseGeoJson(geoJSON) : [];
            } catch (e) {
                throw new Error('Invalid geoJson format\n' + e.message);
            }

            fixNanhai(mapName, regions);
            each(regions, function (region) {
                var regionName = region.name;
                fixTextCoord(mapName, region);
                fixGeoCoord(mapName, region);
                fixDiaoyuIsland(mapName, region); // Some area like Alaska in USA map needs to be tansformed
                // to look better

                var specialArea = specialAreas[regionName];

                if (specialArea) {
                    region.transformTo(specialArea.left, specialArea.top, specialArea.width, specialArea.height);
                }
            });
            return inner(mapRecord).parsed = {
                regions: regions,
                boundingRect: getBoundingRect(regions)
            };
        }
    };

    function getBoundingRect(regions) {
        var rect;

        for (var i = 0; i < regions.length; i++) {
            var regionRect = regions[i].getBoundingRect();
            rect = rect || regionRect.clone();
            rect.union(regionRect);
        }

        return rect;
    }

    hwchart.coord.geo.geoJSONLoader = _default;
})
