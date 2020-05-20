Vmd.define('hwchart.extension.openlayers.OpenLayersCoordSys', {
    requires: []

}, function () {
    var zrUtil = zrender.util;
    var graphic = zrender.graphic;
    var matrix = zrender.matrix;

    /* global openlayers */
    function OpenLayersCoordSys(openlayers, projection, api) {
        this._openlayers = openlayers;
        this._projection = projection;
        this.dimensions = ['lng', 'lat'];
        this._api = api;
        this._transform = ol.proj.transform;
        // this._projection = new ol.proj.Projection({
        //   code: 'EPSG:4326',
        //   units: 'degrees',
        //   axisOrientation: 'neu',
        //   global: true
        // });
    }

    OpenLayersCoordSys.prototype.dimensions = ['lng', 'lat'];

    OpenLayersCoordSys.prototype.getZoom = function (zoom) {
        return this._openlayers.getView().getZoom();
    };

    OpenLayersCoordSys.prototype.setMapOffset = function (mapOffset) {
        this._mapOffset = mapOffset;
    };

    OpenLayersCoordSys.prototype.setCorrection = function (correction) {
        this._correction = correction;
    };

    OpenLayersCoordSys.prototype.getOpenLayers = function () {
        return this._openlayers;
    };

    //地理坐标转换到屏幕坐标
    OpenLayersCoordSys.prototype.dataToPoint = function (data) {
        // openlayers支持的坐标系：
        // EPSG:3857， openlayers默认坐标系
        // EPSG:4326，经纬度坐标，别名WGS84，是目前GPS所采用的坐标系统，Google和高德地图定位的的经纬度（国外）都是基于这个坐标系的
        // EPSG:102100， 与EPSG:3857完全相同
        // EPSG:102113， 与EPSG:3857和EPSG:102100表示同一个投影
        // EPSG:900913， 谷歌以及Open Street Map使用的投影，没被EPSG组织采纳，与EPSG:3857一致
        // CRS:84，

        //目前不支持的坐标系
        // 1.GCJ－02坐标系，又名“火星坐标系”，是我国国测局独创的坐标体系，由WGS－84加密而成，在国内，必须至少使用GCJ－02坐标系，
        // 或者使用在GCJ－02加密后再进行加密的坐标系，如百度坐标系。高德和Google在国内都是使用GCJ－02坐标系，可以说，GCJ－02是国内最广泛使用的坐标系；
        // 2.百度坐标系:bd-09，百度坐标系是在GCJ－02坐标系的基础上再次加密偏移后形成的坐标系，只适用于百度地图。

        //TODO 坐标修正
        var mapData = [data[0] + this._correction[0], data[1] + this._correction[1]];

        // 坐标转换
        var coordinate = this._transform(mapData, this._projection, "EPSG:3857");
        // 获取openlayers视图对象
        var view = this._openlayers.getView();
        //地图分辨率
        var resolution = view.getResolution();
        //地图中心
        var center = view.getCenter();

        // 窗口大小
        var viewSize = view.getViewportSize_();

        return [
            Math.round(viewSize[0] / 2 + (coordinate[0] - center[0]) / resolution /*+ 0.5*/),
            Math.round(viewSize[1] / 2 - (coordinate[1] - center[1]) / resolution /*+ 0.5*/)
        ];
    };

    //屏幕坐标转换到地理坐标
    OpenLayersCoordSys.prototype.pointToData = function (pt) {
        //将屏幕坐标转换到EPSG:3857

        // 获取openlayers视图对象
        var view = this._openlayers.getView();
        //地图分辨率
        var resolution = view.getResolution();
        //地图中心
        var center = view.getCenter();
        // 窗口大小
        var viewSize = view.getViewportSize_();

        var coordinate = [
            center[0] + (pt[0] - viewSize[0] / 2 /* - 0.5*/) * resolution,
            center[1] - (pt[1] + viewSize[1] / 2 /* - 0.5*/) * resolution,
        ];

        var resultCoords = this._transform(coordinate, "EPSG:3857", this._projection);
        return [resultCoords[0] - this._correction[0], resultCoords[1] - this._correction[1]];
    };

    OpenLayersCoordSys.dimensions = OpenLayersCoordSys.prototype.dimensions;

    OpenLayersCoordSys.create = function (ecModel, api) {
        var openLayersCoordSys;
        var root = api.getDom(); // TODO Dispose

        ecModel.eachComponent('openlayers', function (openLayerModel) {
            var painter = api.getZr().painter;
            var viewportRoot = painter.getViewportRoot();

            if (typeof ol === 'undefined') {
                throw new Error('ol api is not loaded');
            }

            if (openLayersCoordSys) {
                throw new Error('Only one openlayers component can exist');
            }

            if (!openLayerModel.__openlayers) {
                // Not support IE8
                var openlayersRoot = root.querySelector('.ec-extension-openlayers');

                if (openlayersRoot) {
                    // Reset viewport left and top, which will be changed
                    // in moving handler in BMapView
                    viewportRoot.style.left = '0px';
                    viewportRoot.style.top = '0px';
                    root.removeChild(openlayersRoot);
                }

                openlayersRoot = document.createElement('div');
                openlayersRoot.style.cssText = 'width:100%;height:100%'; // Not support IE8

                openlayersRoot.classList.add('ec-extension-openlayers');
                root.appendChild(openlayersRoot);

                var openlayers,
                    url = (window.isLocal ? window.server : "https://iserver.supermap.io") + "/iserver/services/map-china400/rest/maps/China";
                openlayers = openLayerModel.__openlayers = new ol.Map({
                    target: openlayersRoot,
                    controls: ol.control.defaults({attributionOptions: {collapsed: false}})
                        .extend([new ol.supermap.control.Logo()]),
                    view: new ol.View({
                        center: ol.proj.fromLonLat(openLayerModel.get("center")),
                        zoom: openLayerModel.get("zoom"),
                        projection: 'EPSG:3857',
                        multiWorld: false
                    })
                });
                var layer = new ol.layer.Tile({
                    source: new ol.source.TileSuperMapRest({
                        url: url,
                        wrapX: true,
                        attributions: openLayerModel.get("attributions") || "地图数据 <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <a href='http://www.hanweikeji.com/'>© 山东云科汉威软件有限公司</a>"
                    }),
                    projection: 'EPSG:3857',
                });
                openlayers.addLayer(layer);
                openlayers.addControl(new ol.supermap.control.ScaleLine());

                var overlay = new ol.Overlay({
                    element: viewportRoot,
                    offset: [0, 0],
                    stopEvent: false
                });

                overlay.element.style.display = "";
                openlayers.addOverlay(overlay);

                painter.getViewportRootOffset = function () {
                    return {
                        offsetLeft: 0,
                        offsetTop: 0
                    };
                };
            }

            var openlayers = openLayerModel.__openlayers; // Set openlayers options

            openlayersCoordSys = new OpenLayersCoordSys(openlayers, openLayerModel.get("projection"), api);
            openlayersCoordSys.setCorrection(openLayerModel.get("correction") || [0, 0])
            openLayerModel.coordinateSystem = openlayersCoordSys;
        });

        ecModel.eachSeries(function (seriesModel) {
            if (seriesModel.get('coordinateSystem') === 'openlayers') {
                seriesModel.coordinateSystem = openlayersCoordSys;
            }
        });
    };

    hwchart.extension.openlayers.OpenLayersCoordSys = OpenLayersCoordSys;
});