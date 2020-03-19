Vmd.define('hwchart.component.geo.GeoView', {
    requires: [
        'hwchart.component.helper.MapDraw'
    ]
}, function () {

    var MapDraw = hwchart.component.helper.MapDraw;

    var GeoView= hwcharts.extendComponentView({

        type: 'geo',

        init: function (ecModel, api) {
            var mapDraw = new MapDraw(api, true);
            this._mapDraw = mapDraw;

            this.group.add(mapDraw.group);
        },

        render: function (geoModel, ecModel, api, payload) {
            // Not render if it is an toggleSelect action from self
            if (payload && payload.type === 'geoToggleSelect'
                && payload.from === this.uid
            ) {
                return;
            }

            var mapDraw = this._mapDraw;
            if (geoModel.get('show')) {
                mapDraw.draw(geoModel, ecModel, api, this, payload);
            }
            else {
                this._mapDraw.group.removeAll();
            }

            this.group.silent = geoModel.get('silent');
        },

        dispose: function () {
            this._mapDraw && this._mapDraw.remove();
        }

    });
    hwchart.component.geo.GeoView = GeoView;
})