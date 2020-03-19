Vmd.define('hwchart.component.helper.FrameDraw', {
    requires: [
        'hwchart.component.helper.RoamController',
        'hwchart.util.graphic'
    ]

}, function () {
    var RoamController = hwchart.component.helper.RoamController;
    var graphic = hwchart.util.graphic;
    var zrUtil = zrender.util;

    function getFixedItemStyle(model, scale) {
        var itemStyle = model.getItemStyle();
        var areaColor = model.get('areaColor');

        // If user want the color not to be changed when hover,
        // they should both set areaColor and color to be null.
        if (areaColor != null) {
            itemStyle.fill = areaColor;
        }

        return itemStyle;
    }

    function updateMapSelectHandler(mapDraw, mapOrGeoModel, group, api, fromView) {
        group.off('click');
        group.off('mousedown');

        if (mapOrGeoModel.get('selectedMode')) {

            group.on('mousedown', function () {
                mapDraw._mouseDownFlag = true;
            });

            group.on('click', function (e) {
                if (!mapDraw._mouseDownFlag) {
                    return;
                }
                mapDraw._mouseDownFlag = false;

                var el = e.target;
                while (!el.__region) {
                    el = el.parent;
                }
                if (!el) {
                    return;
                }

                var region = el.__region;
                var action = {
                    type: (mapOrGeoModel.mainType === 'geo' ? 'geo' : 'map') + 'ToggleSelect',
                    name: region.name,
                    from: fromView.uid
                };
                action[mapOrGeoModel.mainType + 'Id'] = mapOrGeoModel.id;

                api.dispatchAction(action);

                updateMapSelected(mapOrGeoModel, group);
            });
        }
    }

    function updateMapSelected(mapOrGeoModel, group) {
        // FIXME
        group.eachChild(function (otherRegionEl) {
            if (otherRegionEl.__region) {
                otherRegionEl.trigger(mapOrGeoModel.isSelected(otherRegionEl.__region.name) ? 'emphasis' : 'normal');
            }
        });
    }

    /**
     * @alias module:hwcharts/component/helper/MapDraw
     * @param {module:hwcharts/ExtensionAPI} api
     * @param {boolean} updateGroup
     */
    function MapDraw(api, updateGroup) {

        var group = new graphic.Group();

        /**
         * @type {module:hwcharts/component/helper/RoamController}
         * @private
         */
        this._controller = new RoamController(
            api.getZr(), updateGroup ? group : null, null
        );

        /**
         * @type {module:zrender/container/Group}
         * @readOnly
         */
        this.group = group;

        /**
         * @type {boolean}
         * @private
         */
        this._updateGroup = updateGroup;

        /**
         * This flag is used to make sure that only one among
         * `pan`, `zoom`, `click` can occurs, otherwise 'selected'
         * action may be triggered when `pan`, which is unexpected.
         * @type {booelan}
         */
        this._mouseDownFlag;
    }

    MapDraw.prototype = {

        constructor: MapDraw,

        draw: function (mapOrGeoModel, ecModel, api, fromView, payload) {

            var isGeo = mapOrGeoModel.mainType === 'geo';

            // map series has data, geo model that controlled by map series
            // has no data, otherwise data exists.
            var data = mapOrGeoModel.getData && mapOrGeoModel.getData();
            isGeo && ecModel.eachComponent({ mainType: 'series', subType: 'map' }, function (mapSeries) {
                if (!data && mapSeries.getHostGeoModel() === mapOrGeoModel) {
                    data = mapSeries.getData();
                }
            });

            var geo = mapOrGeoModel.coordinateSystem;

            var group = this.group;

            var scale = geo.scale;
            var groupNewProp = {
                position: geo.position,
                scale: scale
            };

            // No animation when first draw or in action
            if (!group.childAt(0) || payload) {
                group.attr(groupNewProp);
            }
            else {
                graphic.updateProps(group, groupNewProp, mapOrGeoModel);
            }

            group.removeAll();

            var itemStyleAccessPath = ['itemStyle', 'normal'];
            var hoverItemStyleAccessPath = ['itemStyle', 'emphasis'];
            var labelAccessPath = ['label', 'normal'];
            var hoverLabelAccessPath = ['label', 'emphasis'];

            zrUtil.each(geo.regions, function (region) {

                var regionGroup = new graphic.Group();
                var compoundPath = new graphic.CompoundPath({
                    shape: {
                        paths: []
                    }
                });
                regionGroup.add(compoundPath);

                var regionModel = mapOrGeoModel.getRegionModel(region.name) || mapOrGeoModel;

                var itemStyleModel = regionModel.getModel(itemStyleAccessPath);
                var hoverItemStyleModel = regionModel.getModel(hoverItemStyleAccessPath);
                var itemStyle = getFixedItemStyle(itemStyleModel, scale);
                var hoverItemStyle = getFixedItemStyle(hoverItemStyleModel, scale);

                var labelModel = regionModel.getModel(labelAccessPath);
                var hoverLabelModel = regionModel.getModel(hoverLabelAccessPath);

                var dataIdx;
                // Use the itemStyle in data if has data
                if (data) {
                    dataIdx = data.indexOfName(region.name);
                    // Only visual color of each item will be used. It can be encoded by dataRange
                    // But visual color of series is used in symbol drawing
                    //
                    // Visual color for each series is for the symbol draw
                    var visualColor = data.getItemVisual(dataIdx, 'color', true);
                    if (visualColor) {
                        itemStyle.fill = visualColor;
                    }
                }

                var textStyleModel = labelModel.getModel('textStyle');
                var hoverTextStyleModel = hoverLabelModel.getModel('textStyle');

                zrUtil.each(region.contours, function (contour) {

                    var polygon = new graphic.Polygon({
                        shape: {
                            points: contour
                        }
                    });

                    //itemStyle.stroke = "red";
                    //itemStyle.lineWidth = 1;
                    compoundPath.shape.paths.push(polygon);
                    //compoundPath.setStyle(itemStyle);


                    //var nOff = 60;
                    //var nLeft = region._rect.x - nOff;
                    //var nRight = region._rect.x + region._rect.width + nOff;
                    //var nBottom = region._rect.y - nOff;
                    //var nTop = region._rect.y + region._rect.height + nOff;

                    //var cntr = [];
                    //cntr.push([nLeft, nBottom]);
                    //cntr.push([nRight, nBottom]);
                    //cntr.push([nRight, nTop]);
                    //cntr.push([nLeft, nTop]);
                    //cntr.push([nLeft, nBottom]);
                    //var polygon1 = new graphic.Polygon({
                    //    shape: {
                    //        points: cntr
                    //    }
                    //});

                    //compoundPath.shape.paths.push(polygon1);

                    var nOff = 80;
                    var nLeft = region._rect.x - nOff;
                    var nRight = region._rect.x + region._rect.width + nOff;
                    var nBottom = region._rect.y - nOff;
                    var nTop = region._rect.y + region._rect.height + nOff;

                    var cntr = [];
                    cntr.push([nLeft, nBottom]);
                    cntr.push([nRight, nBottom]);
                    cntr.push([nRight, nTop]);
                    cntr.push([nLeft, nTop]);
                    cntr.push([nLeft, nBottom]);
                    var polygon2 = new graphic.Polygon({
                        shape: {
                            points: cntr
                        }
                    });

                    compoundPath.shape.paths.push(polygon2);
                    //compoundPath.setStyle(itemStyle);
                });

                // ------------------20191130-----------------
                itemStyle.stroke = "#333";
                itemStyle.lineWidth = 1;
                // -------------------------------
                compoundPath.setStyle(itemStyle);
                compoundPath.style.strokeNoScale = true;
                compoundPath.culling = true;
                // Label
                var showLabel = labelModel.get('show');
                var hoverShowLabel = hoverLabelModel.get('show');

                var isDataNaN = data && isNaN(data.get('value', dataIdx));
                var itemLayout = data && data.getItemLayout(dataIdx);
                // In the following cases label will be drawn
                // 1. In map series and data value is NaN
                // 2. In geo component
                // 4. Region has no series legendSymbol, which will be add a showLabel flag in mapSymbolLayout
                if (
                    (isGeo || isDataNaN && (showLabel || hoverShowLabel))
                 || (itemLayout && itemLayout.showLabel)
                 ) {
                    var query = data ? dataIdx : region.name;
                    var formattedStr = mapOrGeoModel.getFormattedLabel(query, 'normal');
                    var hoverFormattedStr = mapOrGeoModel.getFormattedLabel(query, 'emphasis');
                    var text = new graphic.Text({
                        style: {
                            text: showLabel ? (formattedStr || region.name) : '',
                            fill: textStyleModel.getTextColor(),
                            textFont: textStyleModel.getFont(),
                            textAlign: 'center',
                            textVerticalAlign: 'middle'
                        },
                        hoverStyle: {
                            text: hoverShowLabel ? (hoverFormattedStr || region.name) : '',
                            fill: hoverTextStyleModel.getTextColor(),
                            textFont: hoverTextStyleModel.getFont()
                        },
                        position: region.center.slice(),
                        scale: [1 / scale[0], 1 / scale[1]],
                        z2: 10,
                        silent: true
                    });

                    regionGroup.add(text);
                }

                // setItemGraphicEl, setHoverStyle after all polygons and labels
                // are added to the rigionGroup
                if (data) {
                    data.setItemGraphicEl(dataIdx, regionGroup);
                }
                else {
                    var regionModel = mapOrGeoModel.getRegionModel(region.name);
                    // Package custom mouse event for geo component
                    compoundPath.eventData = {
                        componentType: 'geo',
                        componentIndex: mapOrGeoModel.componentIndex,
                        geoIndex: mapOrGeoModel.componentIndex,
                        name: region.name,
                        region: (regionModel && regionModel.option) || {}
                    };
                }




                //geo.dataToPoint([region._rect.x, region._rect.y]);













                //// ----------------------------------------------------------------------------------
                //var nCnt = 3;
                //var nOff = 80;
                //var nUnitX = region._rect.width / nCnt;
                //var nUnitY = region._rect.height / nCnt;
                //var nLeft = region._rect.x - nOff;
                //var nRight = region._rect.x + region._rect.width + nOff;
                //var nBottom = region._rect.y - nOff;
                //var nTop = region._rect.y + region._rect.height + nOff;

                //// 上边
                //for (var i = 1; i < nCnt; i++)
                //{

                //    var line = new graphic.Polyline({
                //        style:{
                //            stroke: "black",
                //            text: Math.trunc(nLeft + i * nUnitX),
                //            lineWidth: 5
                //        },
                        
                //        shape: {
                //            points: [[nLeft + i * nUnitX, nTop], [nLeft + (i) * nUnitX, nTop - nOff]]
                //        }
                //    });

                //    regionGroup.add(line);

                //    //var labelEl = new zrender.Text({
                //    //    style: {
                //    //        text: Math.trunc(nLeft + i * nUnitX),
                //    //        fontSize: 12,
                //    //        textAlign: "center",
                //    //        textFill: "black"
                //    //    }
                //    //});
                //    ////point = self.reLayoutPoint(rawDataItem.id, point, labelEl);
                //    //labelEl.attr('position', [nLeft + i * nUnitX, nTop]);
                //    ////labelEl.attr('alignment', "center");
                //    ////data.setItemGraphicEl(newIdx, labelEl);
                //    //regionGroup.add(labelEl);
                //}

                //// 下边
                //for (var i = 1; i < nCnt; i++) {

                //    var line = new graphic.Polyline({
                //        style: {
                //            stroke: "black",
                //            text: Math.trunc(nLeft + i * nUnitX),
                //            lineWidth: 5
                //        },
                //        shape: {
                //            points: [[nLeft + i * nUnitX, nBottom], [nLeft + (i) * nUnitX, nBottom + nOff]]
                //        }
                //    });

                //    //console.log([[nLeft + i * nUnitX, nBottom], [nLeft + (i + 1) * nUnitX, nBottom + nOff]]);

                //    regionGroup.add(line);

                //    //var labelEl = new zrender.Text({
                //    //    style: {
                //    //        text: Math.trunc(nLeft + i * nUnitX),
                //    //        fontSize: 12,
                //    //        textAlign: "center",
                //    //        textFill: "black"
                //    //    }
                //    //});
                //    ////point = self.reLayoutPoint(rawDataItem.id, point, labelEl);
                //    //labelEl.attr('position', [nLeft + i * nUnitX, nBottom + nOff]);
                //    ////labelEl.attr('alignment', "center");
                //    ////data.setItemGraphicEl(newIdx, labelEl);
                //    //regionGroup.add(labelEl);
                //}

                //// 左边
                //for (var i = 1; i < nCnt; i++) {

                //    var line = new graphic.Polyline({
                //        style: {
                //            stroke: "black",
                //            text: Math.trunc(nTop - i * nUnitY),
                //            textRotation: Math.PI / 2,
                //            lineWidth: 5
                //        },
                //        shape: {
                //            points: [[nLeft, nTop - i * nUnitY], [nLeft + nOff, nTop - (i) * nUnitY]]
                //        }
                //    });

                //    regionGroup.add(line);


                    
                //    //style: {
                //    //        stroke: 'none',
                //    //        text: labels[i].text,
                //    //        textRotation: -angle,
                //    //        blend:'source-over',
                //    //        textBackgroundColor: 'transparent',
                //    //    // textPosition: 'top',
                //    //        lineWidth: 2
                //    //}

                //    //var labelEl = new zrender.Text({
                //    //    style: {
                //    //        text: Math.trunc(nTop - i * nUnitY),
                //    //        //fontFamily: "@Georgia",
                //    //        fontSize: 12,
                //    //        transformText: false,
                //    //        rotation: 90,
                //    //        textAlign: "center",
                //    //        textFill: "black"
                //    //    }
                //    //});
                //    ////point = self.reLayoutPoint(rawDataItem.id, point, labelEl);
                //    //labelEl.attr('position', [nLeft + nOff, nTop - (i) * nUnitY]);
                //    ////labelEl.attr('alignment', "center");
                //    ////data.setItemGraphicEl(newIdx, labelEl);
                //    //regionGroup.add(labelEl);
                //}

                //// 右边
                //for (var i = 1; i < nCnt; i++) {

                //    var line = new graphic.Polyline({
                //        style: {
                //            stroke: "black",
                //            text: Math.trunc(nTop - i * nUnitY),
                //            textRotation: Math.PI / 2,
                //            lineWidth: 5
                //        },
                //        shape: {
                //            points: [[nRight, nTop - i * nUnitY], [nRight - nOff, nTop - (i) * nUnitY]]
                //        }
                //    });

                //    regionGroup.add(line);

                //    //var labelEl = new zrender.Text({
                //    //    style: {
                //    //        text: Math.trunc(nTop - i * nUnitY),
                //    //        fontSize: 12,
                //    //        textAlign: "center",
                //    //        textFill: "black"
                //    //    }
                //    //});
                //    ////point = self.reLayoutPoint(rawDataItem.id, point, labelEl);
                //    //labelEl.attr('position', [nRight, nTop - i * nUnitY]);
                //    ////labelEl.attr('alignment', "center");
                //    ////data.setItemGraphicEl(newIdx, labelEl);
                //    //regionGroup.add(labelEl);
                //}
                //// ----------------------------------------------------------------------------------














                regionGroup.__region = region;

                //graphic.setHoverStyle(
                //    regionGroup,
                //    hoverItemStyle,
                //    { hoverSilentOnTouch: !!mapOrGeoModel.get('selectedMode') }
                //);

                group.add(regionGroup);


              
            });


            this._updateController(mapOrGeoModel, ecModel, api);

            updateMapSelectHandler(this, mapOrGeoModel, group, api, fromView);

            updateMapSelected(mapOrGeoModel, group);
        },

        remove: function () {
            this.group.removeAll();
            this._controller.dispose();
        },

        _updateController: function (mapOrGeoModel, ecModel, api) {
            var geo = mapOrGeoModel.coordinateSystem;
            var controller = this._controller;
            controller.zoomLimit = mapOrGeoModel.get('scaleLimit');
            // Update zoom from model
            controller.zoom = geo.getZoom();
            // roamType is will be set default true if it is null
            controller.enable(mapOrGeoModel.get('roam') || false);
            var mainType = mapOrGeoModel.mainType;

            function makeActionBase() {
                var action = {
                    type: 'geoRoam',
                    componentType: mainType
                };
                action[mainType + 'Id'] = mapOrGeoModel.id;
                return action;
            }

            controller.off('pan').on('pan', function (dx, dy) {
                this._mouseDownFlag = false;

                api.dispatchAction(zrUtil.extend(makeActionBase(), {
                    dx: dx,
                    dy: dy
                }));
            }, this);

            controller.off('zoom').on('zoom', function (zoom, mouseX, mouseY) {
                this._mouseDownFlag = false;
                var chartInst = api.getChart();
                //  chartInst.convertToPixel('frame', [134.38476562499997, , 51.39920565355378])

                api.dispatchAction(zrUtil.extend(makeActionBase(), {
                    obj: this,
                    zoom: zoom,
                    originX: mouseX,
                    originY: mouseY
                }));

                if (this._updateGroup) {
                    var group = this.group;
                    var scale = group.scale;
                    group.traverse(function (el) {
                        if (el.type === 'text') {
                            el.attr('scale', [1 / scale[0], 1 / scale[1]]);
                        }
                    });
                }
            }, this);

            controller.setContainsPoint(function (x, y) {
                return geo.getViewRectAfterRoam().contain(x, y);
            });
        }
    };

    hwchart.component.helper.FrameDraw = MapDraw;
})