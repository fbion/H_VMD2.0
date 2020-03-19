Vmd.define('hwchart.coord.geo.fix.geoCoord', {
    requires: []
}, function () {
    var geoCoordMap = {
        'Russia': [100, 60],
        'United States': [-99, 38],
        'United States of America': [-99, 38]
    };

    function _default(mapType, region) {
        if (mapType === 'world') {
            var geoCoord = geoCoordMap[region.name];

            if (geoCoord) {
                var cp = region.center;
                cp[0] = geoCoord[0];
                cp[1] = geoCoord[1];
            }
        }
    }

    hwchart.coord.geo.fix.geoCoord = _default;
})