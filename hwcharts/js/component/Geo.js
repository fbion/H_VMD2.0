Vmd.define('hwchart.component.Geo', {
    requires: [
        'hwchart.coord.geo.GeoModel',
        'hwchart.coord.geo.geoCreator',
        'hwchart.component.geo.GeoView',
        'hwchart.action.geoRoam'
    ]

}, function () {

    var zrUtil = zrender.util;

    function makeAction(method, actionInfo) {
        actionInfo.update = 'updateView';
        hwcharts.registerAction(actionInfo, function (payload, ecModel) {
            var selected = {};

            ecModel.eachComponent(
                { mainType: 'geo', query: payload },
                function (geoModel) {
                    geoModel[method](payload.name);
                    var geo = geoModel.coordinateSystem;
                    zrUtil.each(geo.regions, function (region) {
                        selected[region.name] = geoModel.isSelected(region.name) || false;
                    });
                }
            );

            return {
                selected: selected,
                name: payload.name
            }
        });
    }

    makeAction('toggleSelected', {
        type: 'geoToggleSelect',
        event: 'geoselectchanged'
    });
    makeAction('select', {
        type: 'geoSelect',
        event: 'geoselected'
    });
    makeAction('unSelect', {
        type: 'geoUnSelect',
        event: 'geounselected'
    });
})