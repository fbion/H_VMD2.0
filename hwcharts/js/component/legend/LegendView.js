Vmd.define('hwchart.component.legend.LegendView', {
    requires: [
        'hwchart.util.symbol',
        'hwchart.chart.helper.ComposeSymbol',
        'hwchart.util.graphic',
        'hwchart.config.wellSymbolMap',
        'hwchart.component.helper.listComponent',
        'hwchart.util.layout'
    ]
}, function () {


    var zrUtil = zrender.util;

    var _symbol = hwchart.util.symbol;

    var createSymbol = _symbol.createSymbol;

    var graphic = hwchart.util.graphic;

    var _listComponent = hwchart.component.helper.listComponent;
    var wellSymbolMap = hwchart.config.wellSymbolMap;
    var ComposeSymbol = hwchart.chart.helper.ComposeSymbol;

    var makeBackground = _listComponent.makeBackground;

    var layoutUtil = hwchart.util.layout;


    var curry = zrUtil.curry;
    var each = zrUtil.each;
    var Group = graphic.Group;




    var _default = hwcharts.extendComponentView({
        type: 'legend.plain',
        newlineDisabled: false,

        /**
         * @override
         */
        init: function () {
            /**
             * @private
             * @type {module:zrender/container/Group}
             */
            this.group.add(this._contentGroup = new Group());
            /**
             * @private
             * @type {module:zrender/Element}
             */

            this._backgroundEl;
            /**
             * @private
             * @type {module:zrender/container/Group}
             */

            this.group.add(this._selectorGroup = new Group());
            /**
             * If first rendering, `contentGroup.position` is [0, 0], which
             * does not make sense and may cause unexepcted animation if adopted.
             * @private
             * @type {boolean}
             */

            this._isFirstRender = true;
        },

        /**
         * @protected
         */
        getContentGroup: function () {
            return this._contentGroup;
        },

        /**
         * @protected
         */
        getSelectorGroup: function () {
            return this._selectorGroup;
        },

        /**
         * @override
         */
        render: function (legendModel, ecModel, api) {
            var isFirstRender = this._isFirstRender;
            this._isFirstRender = false;
            this.resetInner();

            if (!legendModel.get('show', true)) {
                return;
            }

            var itemAlign = legendModel.get('align');
            var orient = legendModel.get('orient');

            if (!itemAlign || itemAlign === 'auto') {
                itemAlign = legendModel.get('left') === 'right' && orient === 'vertical' ? 'right' : 'left';
            }

            var selector = legendModel.get('selector', true);
            var selectorPosition = legendModel.get('selectorPosition', true);

            if (selector && (!selectorPosition || selectorPosition === 'auto')) {
                selectorPosition = orient === 'horizontal' ? 'end' : 'start';
            }

            this.renderInner(itemAlign, legendModel, ecModel, api, selector, orient, selectorPosition); // Perform layout.

            var positionInfo = legendModel.getBoxLayoutParams();
            var viewportSize = {
                width: api.getWidth(),
                height: api.getHeight()
            };
            var padding = legendModel.get('padding');
            var maxSize = layoutUtil.getLayoutRect(positionInfo, viewportSize, padding);
            var mainRect = this.layoutInner(legendModel, itemAlign, maxSize, isFirstRender, selector, selectorPosition); // Place mainGroup, based on the calculated `mainRect`.

            var layoutRect = layoutUtil.getLayoutRect(zrUtil.defaults({
                width: mainRect.width,
                height: mainRect.height
            }, positionInfo), viewportSize, padding);
            this.group.attr('position', [layoutRect.x - mainRect.x, layoutRect.y - mainRect.y]); // Render background after group is layout.

            this.group.add(this._backgroundEl = makeBackground(mainRect, legendModel));

            // 20200212:图例的定位与同步缩放
            this.updateTransform(legendModel, ecModel, api);
        },

        /**
         * @protected
         */
        resetInner: function () {
            this.getContentGroup().removeAll();
            this._backgroundEl && this.group.remove(this._backgroundEl);
            this.getSelectorGroup().removeAll();
        },

        /**
         * @protected
         */
        renderInner: function (itemAlign, legendModel, ecModel, api, selector, orient, selectorPosition) {
            var contentGroup = this.getContentGroup();
            var legendDrawnMap = zrUtil.createHashMap();
            var selectMode = legendModel.get('selectedMode');
            var excludeSeriesId = [];
            ecModel.eachRawSeries(function (seriesModel) {
                !seriesModel.get('legendHoverLink') && excludeSeriesId.push(seriesModel.id);
            });
            each(legendModel.getData(), function (itemModel, dataIndex) {
                var name = itemModel.get('name'); // Use empty string or \n as a newline string

                if (!this.newlineDisabled && (name === '' || name === '\n')) {
                    contentGroup.add(new Group({
                        newline: true
                    }));
                    return;
                } // Representitive series.


                var seriesModel = ecModel.getSeriesByName(name)[0];

                if (legendDrawnMap.get(name)) {
                    // Have been drawed
                    return;
                } // Legend to control series.


                if (seriesModel) {
                    var data = seriesModel.getData();
                    var nameText = seriesModel.option.nameText;
                    var color = data.getVisual('color');
                    var borderColor = data.getVisual('borderColor'); // If color is a callback function

                    if (typeof color === 'function') {
                        // Use the first data
                        color = color(seriesModel.getDataParams(0));
                    } // If borderColor is a callback function


                    if (typeof borderColor === 'function') {
                        // Use the first data
                        borderColor = borderColor(seriesModel.getDataParams(0));
                    } // Using rect symbol defaultly


                    var legendSymbolType = data.getVisual('legendSymbol') || 'roundRect';
                    var symbolType = data.getVisual('symbol');

                    // ---------------------------------------------------------------------------
                    // 开采指标图例
                    if (seriesModel.subType == 'miningIndex') {

                        if (data._rawData._data.length > 0) {
                            for (var i = 0; i < data._rawData._data[0].name.length; i++) {
                                name = data._rawData._data[0].name[i];
                                color = data._rawData._data[0].color[i];
                                //legendSymbolType = 'roundRect';
                                legendSymbolType = 'rect';
                                // 如果是柱状图，就显示矩形图例，如果有半圆，就绘制半圆（arc或sector）
                                // 所以数据序列中需要增加这个序列绘制的形状，
                                var itemGroup = this._createItem(
                                    name, dataIndex, itemModel, legendModel,
                                    legendSymbolType, symbolType,
                                    itemAlign, color,
                                    borderColor, selectMode, seriesModel, nameText);

                                // 扩展点击事件
                                itemGroup.on('click', curry(dispatchSelectAction, name, seriesModel.subType, api, excludeSeriesId, seriesModel, legendModel));
                                //itemGroup.on('click', curry(dispatchSelectAction, name, api, seriesModel, legendModel));
                                // itemGroup.on('click', curry(dispatchSelectAction, name, null, api, excludeSeriesId)).on('mouseover', curry(dispatchHighlightAction, seriesModel.name, null, api, excludeSeriesId)).on('mouseout', curry(dispatchDownplayAction, seriesModel.name, null, api, excludeSeriesId));
                            }
                        }
                    }
                    else {
                        var itemGroup = this._createItem(name, dataIndex, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color, borderColor, selectMode, seriesModel, nameText);

                        itemGroup.on('click', curry(dispatchSelectAction, name, null, api, excludeSeriesId)).on('mouseover', curry(dispatchHighlightAction, seriesModel.name, null, api, excludeSeriesId)).on('mouseout', curry(dispatchDownplayAction, seriesModel.name, null, api, excludeSeriesId));
                    }
                    legendDrawnMap.set(name, true);
                } else {
                    // Legend to control data. In pie and funnel.
                    ecModel.eachRawSeries(function (seriesModel) {
                        // In case multiple series has same data name
                        if (legendDrawnMap.get(name)) {
                            return;
                        }

                        if (seriesModel.legendVisualProvider) {
                            var provider = seriesModel.legendVisualProvider;

                            if (!provider.containName(name)) {
                                return;
                            }

                            var idx = provider.indexOfName(name);
                            var color = provider.getItemVisual(idx, 'color');
                            var borderColor = provider.getItemVisual(idx, 'borderColor');
                            var legendSymbolType = 'roundRect';

                            var itemGroup = this._createItem(name, dataIndex, itemModel, legendModel, legendSymbolType, null, itemAlign, color, borderColor, selectMode); // FIXME: consider different series has items with the same name.

                            itemGroup.on('click', curry(dispatchSelectAction, null, name, api, excludeSeriesId)) // Should not specify the series name, consider legend controls
                                // more than one pie series.
                                .on('mouseover', curry(dispatchHighlightAction, null, name, api, excludeSeriesId)).on('mouseout', curry(dispatchDownplayAction, null, name, api, excludeSeriesId));
                            legendDrawnMap.set(name, true);
                        }
                    }, this);
                }
            }, this);

            if (selector) {
                this._createSelector(selector, legendModel, api, orient, selectorPosition);
            }
        },
        _createSelector: function (selector, legendModel, api, orient, selectorPosition) {
            var selectorGroup = this.getSelectorGroup();
            each(selector, function (selectorItem) {
                createSelectorButton(selectorItem);
            });

            function createSelectorButton(selectorItem) {
                var type = selectorItem.type;
                var labelText = new graphic.Text({
                    style: {
                        x: 0,
                        y: 0,
                        align: 'center',
                        verticalAlign: 'middle'
                    },
                    onclick: function () {
                        api.dispatchAction({
                            type: type === 'all' ? 'legendAllSelect' : 'legendInverseSelect'
                        });
                    }
                });
                selectorGroup.add(labelText);
                var labelModel = legendModel.getModel('selectorLabel');
                var emphasisLabelModel = legendModel.getModel('emphasis.selectorLabel');
                graphic.setLabelStyle(labelText.style, labelText.hoverStyle = {}, labelModel, emphasisLabelModel, {
                    defaultText: selectorItem.title,
                    isRectText: false
                });
                graphic.setHoverStyle(labelText);
            }
        },
        _createItem: function (name, dataIndex, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color, borderColor, selectMode, seriesModel, nameText) {
            var itemWidth = legendModel.get('itemWidth');
            var itemHeight = legendModel.get('itemHeight');
            var inactiveColor = legendModel.get('inactiveColor');
            var inactiveBorderColor = legendModel.get('inactiveBorderColor');
            var symbolKeepAspect = legendModel.get('symbolKeepAspect');
            var legendModelItemStyle = legendModel.getModel('itemStyle');
            var isSelected = true;
            //var isSelected = legendModel.isSelected(name);
            var itemGroup = new Group();
            var textStyleModel = itemModel.getModel('textStyle');
            var itemIcon = itemModel.get('icon');
            var tooltipModel = itemModel.getModel('tooltip');
            var legendGlobalTooltipModel = tooltipModel.parentModel; // Use user given icon first

            // 20191231:临时图例实现
            if (name == "尖灭线") {
                itemIcon = 'image://http://192.168.1.181:9010/images/legend/stjmx1.jpg';
            }
            else if (name == "评价滚动储量区") {
                itemIcon = 'image://http://192.168.1.181:9010/images/legend/pjgdclq.jpg';
            }
            else if (name == "探明开发储量区") {
                itemIcon = 'image://http://192.168.1.181:9010/images/legend/tmkfclq.jpg';
            }

            legendSymbolType = itemIcon || legendSymbolType;

            var data = seriesModel.getData();
			var symbolSize = data.getItemVisual(0, 'symbolSize');
            // 20191206:扩展复合符号（井符号）的绘制
            if (legendSymbolType == 'composeSymbol') {
                var symbol = data.getItemVisual(0, 'symbol') || (data.getRawDataItem(0) && data.getRawDataItem(0).symbol);
                if (seriesModel.subType === 'wellSymbol') {
                    symbol = wellSymbolMap[symbol] || symbol;
                } else if (seriesModel.subType === 'lineSymbol') { // 线符号
                    // 线符号和面符号符号代码
                    //symbol = wellSymbolMap[symbol] || symbol;
                } else if (seriesModel.subType === 'planeSymbol') { // 面符号

                    // 线符号和面符号符号代码
                    //symbol = wellSymbolMap[symbol] || symbol;
                }

                var symbolEl = new ComposeSymbol(symbol, null, true);
                symbolEl.attr('scale', normalizeSymbolScale(Math.min(itemWidth / 2, itemHeight / 2), symbolEl.getBoundingRect()));
                symbolEl.attr('position', [itemWidth / 2 - symbolSize / 2, itemHeight / 2 - symbolSize / 2]);
                itemGroup.add(symbolEl);
            }
            else {
                // 开采指标图例
                if (seriesModel.subType == 'miningIndex') {
                    var widIndex = itemWidth * 0.3;
                    var heiIndex = itemHeight * 0.8;
                    var legendSymbol = createSymbol(legendSymbolType, (itemWidth - widIndex) / 2, itemHeight * 0.2, widIndex, heiIndex,
                        color, // symbolKeepAspect default true for legend
                        symbolKeepAspect == null ? true : symbolKeepAspect);
                    itemGroup.add(setSymbolStyle(legendSymbol, legendSymbolType, legendModelItemStyle, borderColor, inactiveBorderColor, isSelected)); // Compose symbols
                }
                else {
                    var legendSymbol = createSymbol(legendSymbolType, 0, 0, itemWidth, itemHeight, isSelected ? color : inactiveColor, // symbolKeepAspect default true for legend
                        symbolKeepAspect == null ? true : symbolKeepAspect);
                    itemGroup.add(setSymbolStyle(legendSymbol, legendSymbolType, legendModelItemStyle, borderColor, inactiveBorderColor, isSelected)); // Compose symbols
                }
            }            // PENDING

            if (!itemIcon && symbolType // At least show one symbol, can't be all none
                && (symbolType !== legendSymbolType || symbolType === 'none')) {
                var size = itemHeight * 0.8;

                if (symbolType === 'none') {
                    symbolType = 'circle';
                }

                var legendSymbolCenter = createSymbol(symbolType, (itemWidth - size) / 2, (itemHeight - size) / 2, size, size, isSelected ? color : inactiveColor, // symbolKeepAspect default true for legend
                    symbolKeepAspect == null ? true : symbolKeepAspect); // Put symbol in the center

                itemGroup.add(setSymbolStyle(legendSymbolCenter, symbolType, legendModelItemStyle, borderColor, inactiveBorderColor, isSelected));
            }

            var textX = itemAlign === 'left' ? itemWidth + 5 : -5;
            var textAlign = itemAlign;
            var formatter = legendModel.get('formatter');

            var content = name;
            if (nameText)
            {
                content = nameText;
            }

            if (typeof formatter === 'string' && formatter) {
                content = formatter.replace('{name}', nameText != null ? nameText : '');
            } else if (typeof formatter === 'function') {
                content = formatter(nameText);
            }

            //var content = name;

            //if (typeof formatter === 'string' && formatter) {
            //    content = formatter.replace('{name}', name != null ? name : '');
            //} else if (typeof formatter === 'function') {
            //    content = formatter(name);
            //}
				
            itemGroup.add(new graphic.Text({
                style: graphic.setTextStyle({}, textStyleModel, {
                    text: content,
                    x: textX,
                    y: itemHeight / 2,
                    textFill: isSelected ? textStyleModel.getTextColor() : inactiveColor,
                    textAlign: textAlign,
                    textVerticalAlign: 'middle'
                })
            })); // Add a invisible rect to increase the area of mouse hover

            var hitRect = new graphic.Rect({
                shape: itemGroup.getBoundingRect(),
                invisible: true,
                tooltip: tooltipModel.get('show') ? zrUtil.extend({
                    content: nameText,
                    // Defaul formatter
                    formatter: legendGlobalTooltipModel.get('formatter', true) || function () {
                        return nameText;
                    },
                    formatterParams: {
                        componentType: 'legend',
                        legendIndex: legendModel.componentIndex,
                        name: nameText,
                        $vars: ['name']
                    }
                }, tooltipModel.option) : null
            });
            itemGroup.add(hitRect);
            itemGroup.eachChild(function (child) {
                child.silent = true;
            });
            hitRect.silent = !selectMode;
            this.getContentGroup().add(itemGroup);
            graphic.setHoverStyle(itemGroup);
            itemGroup.__legendDataIndex = dataIndex;
            return itemGroup;
        },

        /**
         * @protected
         */
        layoutInner: function (legendModel, itemAlign, maxSize, isFirstRender, selector, selectorPosition) {
            var contentGroup = this.getContentGroup();
            var selectorGroup = this.getSelectorGroup(); // Place items in contentGroup.

            layoutUtil.box(legendModel.get('orient'), contentGroup, legendModel.get('itemGap'), maxSize.width, maxSize.height);
            var contentRect = contentGroup.getBoundingRect();
            var contentPos = [-contentRect.x, -contentRect.y];

            if (selector) {
                // Place buttons in selectorGroup
                layoutUtil.box( // Buttons in selectorGroup always layout horizontally
                    'horizontal', selectorGroup, legendModel.get('selectorItemGap', true));
                var selectorRect = selectorGroup.getBoundingRect();
                var selectorPos = [-selectorRect.x, -selectorRect.y];
                var selectorButtonGap = legendModel.get('selectorButtonGap', true);
                var orientIdx = legendModel.getOrient().index;
                var wh = orientIdx === 0 ? 'width' : 'height';
                var hw = orientIdx === 0 ? 'height' : 'width';
                var yx = orientIdx === 0 ? 'y' : 'x';

                if (selectorPosition === 'end') {
                    selectorPos[orientIdx] += contentRect[wh] + selectorButtonGap;
                } else {
                    contentPos[orientIdx] += selectorRect[wh] + selectorButtonGap;
                } //Always align selector to content as 'middle'


                selectorPos[1 - orientIdx] += contentRect[hw] / 2 - selectorRect[hw] / 2;
                selectorGroup.attr('position', selectorPos);
                contentGroup.attr('position', contentPos);
                var mainRect = {
                    x: 0,
                    y: 0
                };
                mainRect[wh] = contentRect[wh] + selectorButtonGap + selectorRect[wh];
                mainRect[hw] = Math.max(contentRect[hw], selectorRect[hw]);
                mainRect[yx] = Math.min(0, selectorRect[yx] + selectorPos[1 - orientIdx]);
                return mainRect;
            } else {
                contentGroup.attr('position', contentPos);
                return this.group.getBoundingRect();
            }
        },

        updateTransform: function (componentModel, ecModel, api, payload) {

            var group = this.group;

            var itemWidth = componentModel.get('itemWidth');
            var itemHeight = componentModel.get('itemHeight');

            var posHori = componentModel.get('posHori');
            var posVert = componentModel.get('posVert');

            var geo = ecModel.getComponent('geo');
            var zoomFactor = geo.coordinateSystem._zoom * 0.3;
            if (zoomFactor > 1) {
                zoomFactor = 1;
            }
            group.scale[0] = zoomFactor;
            group.scale[1] = zoomFactor;

            var _boudingRect = geo.coordinateSystem.getBoundingRect();
            var ptLeftTop = geo.coordinateSystem.dataToPoint([_boudingRect.x, _boudingRect.y + _boudingRect.height]);
            var ptRightBtm = geo.coordinateSystem.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y]);

            var grect = group.getBoundingRect();

            if (posHori == "left") {
                group.position[0] = ptLeftTop[0];
            }
            else if (posHori == "center") {
                group.position[0] = (ptLeftTop[0] + ptRightBtm[0]) / 2 - (grect.width / 2) * zoomFactor;
            }
            else if (posHori == "right") {

                group.position[0] = ptRightBtm[0] - grect.width * zoomFactor;
            }

            if (posVert == "top") {
                group.position[1] = ptLeftTop[1];
            }
            else if (posVert == "middle") {
                group.position[1] = (ptLeftTop[1] + ptRightBtm[1]) / 2 - (grect.height / 2) * zoomFactor;
            }
            else if (posVert == "bottom") {
                group.position[1] = ptRightBtm[1] - grect.height * zoomFactor;
            }

            ///////////////////////////////////////////////////////////////////
            //group.position[0] = ptRightBtm[0] - grect.width * zoomFactor;
            //group.position[1] = ptRightBtm[1] - grect.height * zoomFactor;
            group.dirty()
        },
        /**
         * @protected
         */
        remove: function () {
            this.getContentGroup().removeAll();
            this._isFirstRender = true;
        }
    });

    function setSymbolStyle(symbol, symbolType, legendModelItemStyle, borderColor, inactiveBorderColor, isSelected) {
        var itemStyle;

        if (symbolType !== 'line' && symbolType.indexOf('empty') < 0) {
            itemStyle = legendModelItemStyle.getItemStyle();
            symbol.style.stroke = borderColor;

            if (!isSelected) {
                itemStyle.stroke = inactiveBorderColor;
            }
        } else {
            itemStyle = legendModelItemStyle.getItemStyle(['borderWidth', 'borderColor']);
        }

        return symbol.setStyle(itemStyle);
    }

    function dispatchSelectAction(seriesName, dataName, api, excludeSeriesId, seriesModel, legendModel) {

        var me = this;
        // 图例项的显示隐藏控制
        if (seriesModel.subType == 'miningIndex') {
            dispatchSelectActionMiningIndex(seriesName, api, seriesModel, legendModel, me);
        }
        else {
            // downplay before unselect
            dispatchDownplayAction(seriesName, dataName, api, excludeSeriesId);
            api.dispatchAction({
                type: 'legendToggleSelect',
                name: seriesName != null ? seriesName : dataName,
                api: api,
                //parentSeriesName: dataName // 开采指标中用到，用于区分非顶层独立序列
            }); // highlight after select

            dispatchHighlightAction(seriesName, dataName, api, excludeSeriesId);
        }
    }

    // 扩展图例的选中事件（开采指标）
    function dispatchSelectActionMiningIndex(name, api, seriesModel, legendModel, group) {

        //var me = this;

        var chart = api.getChart(); // 获取chart

        var inactiveColor = legendModel.get('inactiveColor');

        var data = seriesModel.getData();
        // 20191220：处理开采指标的各指标项的显示/隐藏控制
        var indexSeries = seriesModel.option;
        for (var i = 0; i < indexSeries.data.length; i++) {

            for (var j = 0; j < indexSeries.data[i].name.length; j++) {

                if (indexSeries.data[i].name[j] == name) {
                    indexSeries.data[i].isShow[j] = !(indexSeries.data[i].isShow[j]);
                    break;
                }
            }
        }

        chart.setOption({
            series: [{
                name: indexSeries.name,
                data: indexSeries.data,
                z: 100,
                dataChanged: true
            }]
        })
    }

    function dispatchHighlightAction(seriesName, dataName, api, excludeSeriesId) {
        // If element hover will move to a hoverLayer.
        var el = api.getZr().storage.getDisplayList()[0];

        if (!(el && el.useHoverLayer)) {
            api.dispatchAction({
                type: 'highlight',
                seriesName: seriesName,
                name: dataName,
                excludeSeriesId: excludeSeriesId
            });
        }
    }

    function dispatchDownplayAction(seriesName, dataName, api, excludeSeriesId) {
        // If element hover will move to a hoverLayer.
        var el = api.getZr().storage.getDisplayList()[0];

        if (!(el && el.useHoverLayer)) {
            api.dispatchAction({
                type: 'downplay',
                seriesName: seriesName,
                name: dataName,
                excludeSeriesId: excludeSeriesId
            });
        }
    }

    function normalizeSymbolScale(symbolSize, rect) {
        if (!zrUtil.isArray(symbolSize)) {
            symbolSize = [symbolSize, symbolSize];
        }
        return [symbolSize[0] / rect.width, symbolSize[1] / rect.height];
    }


    hwchart.component.legend.LegendView = _default;
})