Vmd.define('hwchart.component.toolbox.feature.Zoom', {
    requires: [
        'hwchart.component.toolbox.featureManager',
       // 'hwchart.component.helper.BrushController',
        'hwchart.component.helper.ZoomController',
        'hwchart.component.helper.brushHelper',
        'hwchart.component.dataZoom.history',
        'hwchart.component.DataZoomSelect',
        'hwchart.action.roamHelper'
    ]
}, function () {

    var zrUtil = zrender.util;
    //var BrushController = hwchart.component.helper.BrushController;
    var BrushController = hwchart.component.helper.ZoomController;
    var brushHelper = hwchart.component.helper.brushHelper;
    var history = hwchart.component.dataZoom.history;

    var roamHelper = hwchart.action.roamHelper;
    var each = zrUtil.each;

    // Use ZoomSelect
    // require('../../ZoomSelect');

    // Spectial component id start with \0ec\0, see hwcharts/model/Global.js~hasInnerId
    var DATA_ZOOM_ID_BASE = '\0_ec_\0toolbox-dataZoom_';

    var historyGeo = [];

    function Zoom(model, ecModel, api) {

        /**
         * @private
         * @type {module:hwcharts/component/helper/BrushController}
         */
        (this._brushController = new BrushController(api.getZr()))
            .on('brush', zrUtil.bind(this._onBrush, this))
            .mount();

        /**
         * @private
         * @type {boolean}
         */
        this._isZoomActive;
        this._isZoomOutActive;



        this._handlers = {};

        this._zr = api.getZr();

        //自定义监听
        var mouseHandlers = {

            mousedown: function (e) {
                var cursor = resetCursor(this);
                this._zr.setCursorStyle(cursor);

                _mouseHandlers[this._brushType].call(this, e)

            },

            mousemove: function (e) {
                // set Cursor
                // resetCursor(this, e);
                var cursor = resetCursor(this);
                this._zr.setCursorStyle(cursor);
                preventDefault(e);

            }


            // FIXME
            // in tooltip, globalout should not be triggered.
            // globalout: handleDragEnd
        };

        each(mouseHandlers, function (handler, eventName) {
            //this.on(eventName, handler, zr)
            this._handlers[eventName] = zrUtil.bind(handler, this);
        }, this);


        this._brushController.api = api;

    }
    function resetCursor(controller) {

        return controller._brushType == 'zoom' ? 'zoom-in' : (controller._brushType == 'zoomOut' ? 'zoom-out' : 'default');

    }
    function preventDefault(e) {
        var rawE = e.event;
        rawE.preventDefault && rawE.preventDefault();
    }
    function doDisableBrush(controller) {
        var zr = controller._zr;

        //  interactionMutex.release(zr, MUTEX_RESOURCE_KEY, controller._uid);

        each(controller._handlers, function (handler, eventName) {
            zr.off(eventName, handler);
        });
        // controller._brushType = controller._brushOption = null;
    }
    function doEnableBrush(controller) {
        var zr = controller._zr;


        each(controller._handlers, function (handler, eventName) {
            zr.on(eventName, handler);
        });

    }
    Zoom.defaultOption = {
        show: true,
        // Icon group
        icon: {
            zoom: 'M727.936 773.248a384 384 0 1 1 45.248-45.248l145.472 145.344a32 32 0 0 1-45.312 45.312l-145.408-145.408zM480 800a320 320 0 1 0 0-640 320 320 0 0 0 0 640zM448 448V352a32 32 0 0 1 64 0V448h96a32 32 0 0 1 0 64H512v96a32 32 0 0 1-64 0V512H352a32 32 0 0 1 0-64H448z',
            zoomOut: 'M768 448C768 271.36 624.64 128 448 128S128 271.36 128 448s143.36 320 320 320S768 624.64 768 448z m64 0c0 211.968-172.032 384-384 384s-384-172.032-384-384 172.032-384 384-384 384 172.032 384 384z M681.472 726.528c-12.8-12.8-12.8-32.768 0-45.568s32.768-12.8 45.568 0l159.744 159.744c12.8 12.8 12.8 32.768 0 45.568s-32.768 12.8-45.568 0l-159.744-159.744z m-361.472-246.272c-17.92 0-31.744-14.336-31.744-31.744s14.336-31.744 31.744-31.744h256c17.92 0 31.744 14.336 31.744 31.744s-14.336 31.744-31.744 31.744h-256z',
            restore: 'M960-64h-85.333333v42.666667h42.666666v42.666666h42.666667zM729.6-64h-145.066667v42.666667h145.066667v-42.666667z m-290.133333 0H294.4v42.666667h145.066667v-42.666667zM149.333333-64h-85.333333v85.333333h42.666667v-42.666666h42.666666zM106.666667 166.39999999999998h-42.666667v145.066667h42.666667v-145.066667z m0 290.133333h-42.666667V601.6h42.666667v-145.066667zM106.666667 746.666667h-42.666667v85.333333h85.333333v-42.666667h-42.666666zM729.6 789.333333h-145.066667v42.666667h145.066667v-42.666667z m-290.133333 0H294.4v42.666667h145.066667v-42.666667zM960 746.666667h-42.666667v42.666666h-42.666666v42.666667h85.333333zM960 166.39999999999998h-42.666667v145.066667h42.666667v-145.066667z m0 290.133333h-42.666667V601.6h42.666667v-145.066667zM832 64h-640v640h640v-640z m-597.333333 42.666667h554.666666v554.666666h-554.666666v-554.666666z'
        },
        title: {
            zoom: '放大',
            zoomOut: '缩小',
            restore: '概貌'
        }
    };

    var proto = Zoom.prototype;

    proto.render = function (featureModel, ecModel, api, payload) {
        this.model = featureModel;
        this.ecModel = ecModel;
        this.api = api;


        updateStatus(featureModel, ecModel, this, payload);

        if (payload && payload.key == 'ZoomSelect') {
            updateZoom(featureModel, ecModel, this, payload);
        } else if (payload && payload.key == 'ZoomOut') {
            updateZoomOut(featureModel, ecModel, this, payload);
        } else {
            //off监听,其他操作正常进行
            if (!this._isZoomActive && !this._isZoomOutActive) {
                var coordInfoList = brushHelper.makeCoordInfoList(
                     retrieveAxisSetting(featureModel.option), ecModel
                );
                this._brushController
                     .setPanels(brushHelper.makePanelOpts(coordInfoList))
                    .enableBrush(false);
            }

        }


    };

    proto.onclick = function (ecModel, api, type, e) {
        this._getGeoRawCenter();
        handlers[type].call(this, e);
    };

    proto.remove = function (ecModel, api) {
        this._brushController.unmount();
    };

    proto.dispose = function (ecModel, api) {
        this._brushController.dispose();
    };

    /**
     * @private
     */

    var _mouseHandlers = {

        zoomOut: function (e) {

            //获取目前放大的zoom
            var geo = this.ecModel.getComponent('geo');
            var zoom = geo.get('zoom');
            var geoview = geo.coordinateSystem;

            if (zoom > 1) {
                zoom -= 1;
                if (zoom < 1) zoom = 1;
            }
            else if (zoom <= 1) {
                zoom -= 0.1;
            } else {
                return;
            }

            //最大值和最小值的缩放限制
            var chart = this.api.getChart();

            chart.setOption({
                geo: {
                    zoom: zoom,
                    // center: geoview.pointToData([e.offsetX, e.offsetY])
                }
            })
            this._updateGeoLayout();


        }
    }
    /**
     * @private
     */
    var handlers = {

        zoom: function () {
            this._brushController._brushKey = 'zoomIn';
            var nextActive = !this._isZoomActive;
            this.api.dispatchAction({
                type: 'takeGlobalCursor',
                key: 'ZoomSelect',
                ZoomSelectActive: nextActive
            });




        },
        restore: function (e) {

            this._brushController._brushKey = 'restore';

            this._restore(this.ecModel);
            this.api.dispatchAction({
                type: 'takeGlobalCursor'
            });


        },
        zoomOut: function () {

            this._brushController._brushKey = 'zoomOut';
            //this._brushController._dragging = true;
            var nextActive = !this._isZoomOutActive;

            this.api.dispatchAction({
                type: 'takeGlobalCursor',
                key: 'ZoomOut',
                ZoomOutActive: nextActive
            });



        }
    };

    /**
     * @private
     */
    proto._onBrush = function (areas, opt) {

        if (opt && opt.params && opt.params.brushType == 'none') {
            // this._brushController.updateCovers([]);
            _mouseHandlers[opt.params.brushKey].call(this, opt.params.e);
            return
        }

        if (!opt.isEnd || !areas.length) {
            return;
        }
        var snapshot = {};
        var ecModel = this.ecModel;

        this._brushController.updateCovers([]); // remove cover

        var coordInfoList = brushHelper.makeCoordInfoList(
            retrieveAxisSetting(this.model.option), ecModel
        );
        var rangesCoordInfoList = [];
        brushHelper.parseOutputRanges(areas, coordInfoList, ecModel, rangesCoordInfoList);

        var area = areas[0]; // Zoom can not multiple area.
        var coordInfo = rangesCoordInfoList[0];
        var coordRange = area.coordRange;
        var brushType = area.brushType;

        if (coordInfo && coordRange) {
            if (brushType === 'rect') {
                setBatch('xAxis', coordRange[0], coordInfo);
                setBatch('yAxis', coordRange[1], coordInfo);

                coordInfo.geo && this._setGeoBatch(coordRange, coordInfo, area);
            }
            else {
                var axisNames = { lineX: 'xAxis', lineY: 'yAxis' };
                setBatch(axisNames[brushType], coordRange, coordInfo);
            }
        }

        history.push(ecModel, snapshot);

        // this._dispatchZoomAction(snapshot);




        function setBatch(axisName, minMax, coordInfo) {
            var ZoomModel = findZoom(axisName, coordInfo[axisName], ecModel);
            if (ZoomModel) {
                snapshot[ZoomModel.id] = {
                    ZoomId: ZoomModel.id,
                    startValue: minMax[0],
                    endValue: minMax[1]
                };
            }
        }

        function findZoom(axisName, axisModel, ecModel) {
            var ZoomModel;
            ecModel.eachComponent(
                { mainType: 'Zoom', subType: 'select' },
                function (dzModel, ZoomIndex) {
                    var axisIndex = dzModel.get(axisName + 'Index');
                    if (axisIndex != null
                        && ecModel.getComponent(axisName, axisIndex) === axisModel
                    ) {
                        ZoomModel = dzModel;
                    }
                }
            );
            return ZoomModel;
        }
    };

    /**
     * @private
     */
    proto._dispatchZoomAction = function (snapshot) {
        var batch = [];

        // Convert from hash map to array.
        each(snapshot, function (batchItem, ZoomId) {
            batch.push(zrUtil.clone(batchItem));
        });

        batch.length && this.api.dispatchAction({
            type: 'Zoom',
            from: this.uid,
            batch: batch
        });
    };
    /**
     * @private
     */
    proto._restore = function (ecModel) {

        var chart = this.api.getChart();
        var geo = this.ecModel.getComponent('geo');
        var geoview = geo.coordinateSystem;

        chart.setOption({
            geo: {
                zoom: 1,
                // center: [geoview.pointToData([this.api.getWidth() / 2, (this.api.getHeight() - 50) / 2])],
                center: this._getGeoRawCenter()
            }
        })


    }
    /**
     * @private
     */
    proto._setGeoBatch = function (coordRange, coordInfo, area) {
        // var zoomScale=
        var ecModel = this.ecModel;
        var api = this.api;
        var rectWidth = area.range[0][1] - area.range[0][0];
        var rectHeight = area.range[1][1] - area.range[1][0];
        var zoomScale = Math.floor(api.getWidth() / rectWidth);
        var geoview = coordInfo.coordSys;

        //调用geo的缩放
        var chart = api.getChart();
        var options = {
            type: 'geoRoam',
            originX: area.range[0][0] + rectWidth / 2,
            originY: area.range[1][0] + rectHeight / 2,
            zoom: zoomScale,
            componentType: "geo"
        };

        historyGeo.push(options);



        zoomScale = zoomScale + geoview.getZoom();
        //缩放限制
        if (zoomScale > 60) return;
        chart.setOption({
            geo: {
                center: geoview.pointToData([area.range[0][0] + rectWidth / 2, area.range[1][0] + rectHeight / 2]),
                zoom: zoomScale
            }
        })

        this._updateGeoLayout();


    }
    /**
     * @private
     */
    proto._updateGeoLayout = function () {
        var coordInfoList = brushHelper.makeCoordInfoList(
           retrieveAxisSetting(this.model.option), this.ecModel
         );
        this._brushController
           .setPanels(brushHelper.makePanelOpts(coordInfoList))
    }
    /**
     * @private
     */
    proto._getGeoRawCenter = function () {
        var geo = this.ecModel.getComponent('geo');
        if (!this.rawGeoCenter)
            this.rawGeoCenter = geo && geo.coordinateSystem.getCenter();
        return this.rawGeoCenter;
    }

    function retrieveAxisSetting(option) {
        var setting = {};
        // Compatible with previous setting: null => all axis, false => no axis.
        zrUtil.each(['geoIndex', 'xAxisIndex', 'yAxisIndex'], function (name) {
            setting[name] = option[name];
            setting[name] == null && (setting[name] = 'all');
            (setting[name] === false || setting[name] === 'none') && (setting[name] = []);
        });
        return setting;
    }

    function updateStatus(featureModel, ecModel, view, payload) {

        //互斥
        var zoomActive = view._isZoomActive;

        if (payload && payload.type === 'takeGlobalCursor') {
            zoomActive = payload.key === 'ZoomSelect'
                ? payload.ZoomSelectActive : false;
        }

        view._isZoomActive = zoomActive;

        featureModel.setIconStatus('zoom', zoomActive ? 'emphasis' : 'normal');

        zoomActive = view._isZoomOutActive;

        if (payload && payload.type === 'takeGlobalCursor') {
            zoomActive = payload.key === 'ZoomOut'
                ? payload.ZoomOutActive : false;
        }

        view._isZoomOutActive = zoomActive;
        featureModel.setIconStatus('zoomOut', zoomActive ? 'emphasis' : 'normal');
    }

    function updateZoomOut(featureModel, ecModel, view, payload) {

        var zoomActive = view._isZoomOutActive;
        var brushType = 'none';
        var coordInfoList = brushHelper.makeCoordInfoList(
          retrieveAxisSetting(featureModel.option), ecModel
      );
        view._brushController
             .setPanels(brushHelper.makePanelOpts(coordInfoList))
            .enableBrush(
                zoomActive
                ? {
                    brushType: brushType,
                    brushStyle: { // FIXME user customized?
                        lineWidth: 0,
                        // stroke: '#333',
                        fill: 'rgba(0,0,0,0.2)'
                    }
                }
                : false
            );


    }

    function updateZoom(featureModel, ecModel, view, payload) {

        var zoomActive = view._isZoomActive
        var coordInfoList = brushHelper.makeCoordInfoList(
            retrieveAxisSetting(featureModel.option), ecModel
        );
        var brushType = (coordInfoList.xAxisHas && !coordInfoList.yAxisHas)
            ? 'lineX'
            : (!coordInfoList.xAxisHas && coordInfoList.yAxisHas)
            ? 'lineY'
            : 'rect';

        view._brushController
            .setPanels(brushHelper.makePanelOpts(coordInfoList))
            .enableBrush(
                zoomActive
                ? {
                    brushType: brushType,
                    brushStyle: { // FIXME user customized?
                        lineWidth: 0,
                        // stroke: '#333',
                        fill: 'rgba(0,0,0,0.2)'
                    }
                }
                : false
            );
    }


    hwchart.component.toolbox.featureManager.register('zoom', Zoom);


    // Create special Zoom option for select
    hwcharts.registerPreprocessor(function (option) {
        if (!option) {
            return;
        }

        var ZoomOpts = option.Zoom || (option.Zoom = []);
        if (!zrUtil.isArray(ZoomOpts)) {
            option.Zoom = ZoomOpts = [ZoomOpts];
        }

        var toolboxOpt = option.toolbox;
        if (toolboxOpt) {
            // Assume there is only one toolbox
            if (zrUtil.isArray(toolboxOpt)) {
                toolboxOpt = toolboxOpt[0];
            }

            if (toolboxOpt && toolboxOpt.feature) {
                var ZoomOpt = toolboxOpt.feature.Zoom;
                addForAxis('xAxis', ZoomOpt);
                addForAxis('yAxis', ZoomOpt);
            }
        }

        function addForAxis(axisName, ZoomOpt) {
            if (!ZoomOpt) {
                return;
            }

            // Try not to modify model, because it is not merged yet.
            var axisIndicesName = axisName + 'Index';
            var givenAxisIndices = ZoomOpt[axisIndicesName];
            if (givenAxisIndices != null
                && givenAxisIndices != 'all'
                && !zrUtil.isArray(givenAxisIndices)
            ) {
                givenAxisIndices = (givenAxisIndices === false || givenAxisIndices === 'none') ? [] : [givenAxisIndices];
            }

            forEachComponent(axisName, function (axisOpt, axisIndex) {
                if (givenAxisIndices != null
                    && givenAxisIndices != 'all'
                    && zrUtil.indexOf(givenAxisIndices, axisIndex) === -1
                ) {
                    return;
                }
                var newOpt = {
                    type: 'select',
                    $fromToolbox: true,
                    // Id for merge mapping.
                    id: DATA_ZOOM_ID_BASE + axisName + axisIndex
                };
                // FIXME
                // Only support one axis now.
                newOpt[axisIndicesName] = axisIndex;
                ZoomOpts.push(newOpt);
            });
        }

        function forEachComponent(mainType, cb) {
            var opts = option[mainType];
            if (!zrUtil.isArray(opts)) {
                opts = opts ? [opts] : [];
            }
            each(opts, cb);
        }
    });



    hwchart.component.toolbox.feature.Zoom = Zoom;
})