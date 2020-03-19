Vmd.define('hwchart.coord.geo.fix.diaoyuIsland', {
    requires: [
        'hwchart.coord.geo.Region'
    ]
}, function () {
    var points = [[[123.45165252685547, 25.73527164402261], [123.49731445312499, 25.73527164402261], [123.49731445312499, 25.750734064600884], [123.45165252685547, 25.750734064600884], [123.45165252685547, 25.73527164402261]]];

    function _default(mapType, region) {
        if (mapType === 'china' && region.name === '台湾') {
            region.geometries.push({
                type: 'polygon',
                exterior: points[0]
            });
        }
    }

    hwchart.coord.geo.fix.diaoyuIsland = _default;
})