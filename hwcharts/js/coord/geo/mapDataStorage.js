Vmd.define('hwchart.coord.geo.mapDataStorage', {
    requires: []
}, function () {

    var _util = zrender.util;

    var createHashMap = _util.createHashMap;
    var isString = _util.isString;
    var isArray = _util.isArray;
    var each = _util.each;
    var assert = _util.assert;

    var _parseSVG = zrender.parseSVG;

    var parseXML = _parseSVG.parseXML;

   
    var storage = createHashMap(); // For minimize the code size of common hwcharts package,
    // do not put too much logic in this module.

    var _default = {
        // The format of record: see `hwcharts.registerMap`.
        // Compatible with previous `hwcharts.registerMap`.
        registerMap: function (mapName, rawGeoJson, rawSpecialAreas) {
            var records;

            if (isArray(rawGeoJson)) {
                records = rawGeoJson;
            } else if (rawGeoJson.svg) {
                records = [{
                    type: 'svg',
                    source: rawGeoJson.svg,
                    specialAreas: rawGeoJson.specialAreas
                }];
            } else {
                // Backward compatibility.
                if (rawGeoJson.geoJson && !rawGeoJson.features) {
                    rawSpecialAreas = rawGeoJson.specialAreas;
                    rawGeoJson = rawGeoJson.geoJson;
                }

                records = [{
                    type: 'geoJSON',
                    source: rawGeoJson,
                    specialAreas: rawSpecialAreas
                }];
            }

            each(records, function (record) {
                var type = record.type;
                type === 'geoJson' && (type = record.type = 'geoJSON');
                var parse = parsers[type];
                parse(record);
            });
            return storage.set(mapName, records);
        },
        retrieveMap: function (mapName) {
            return storage.get(mapName);
        }
    };
    var parsers = {
        geoJSON: function (record) {
            var source = record.source;
            record.geoJSON = !isString(source) ? source : typeof JSON !== 'undefined' && JSON.parse ? JSON.parse(source) : new Function('return (' + source + ');')();
        },
        // Only perform parse to XML object here, which might be time
        // consiming for large SVG.
        // Although convert XML to zrender element is also time consiming,
        // if we do it here, the clone of zrender elements has to be
        // required. So we do it once for each geo instance, util real
        // performance issues call for optimizing it.
        svg: function (record) {
            record.svgXML = parseXML(record.source);
        }
    };

    hwchart.coord.geo.mapDataStorage = _default;
})
