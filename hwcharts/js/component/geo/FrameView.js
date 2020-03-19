Vmd.define('hwchart.component.geo.FrameView', {
    requires: [
        'hwchart.component.helper.FrameDraw'
    ]
}, function () {

    var FrameDraw = hwchart.component.helper.FrameDraw;

    var FrameView= hwcharts.extendComponentView({

        type: 'frame',

        init: function (ecModel, api) {
            var mapDraw = new FrameDraw(api, true);
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
    hwchart.component.geo.FrameView = FrameView;
})