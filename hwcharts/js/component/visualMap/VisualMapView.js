Vmd.define('hwchart.component.visualMap.VisualMapView', {
    requires: [
        'hwchart.visual.VisualMapping',
        'hwchart.util.graphic',
        'hwchart.util.format',
        'hwchart.util.layout'
    ]
},function(){
    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
    var formatUtil = hwchart.util.format;
    var layout = hwchart.util.layout;
    var VisualMapping = hwchart.visual.VisualMapping;

    var _default = hwcharts.extendComponentView({
        type: 'visualMap',

        /**
         * @readOnly
         * @type {Object}
         */
        autoPositionValues: {
            left: 1,
            right: 1,
            top: 1,
            bottom: 1
        },
        init: function (ecModel, api) {
            /**
             * @readOnly
             * @type {module:hwcharts/model/Global}
             */
            this.ecModel = ecModel;
            /**
             * @readOnly
             * @type {module:hwcharts/ExtensionAPI}
             */

            this.api = api;
            /**
             * @readOnly
             * @type {module:hwcharts/component/visualMap/visualMapModel}
             */

            this.visualMapModel;
        },

        /**
         * @protected
         */
        render: function (visualMapModel, ecModel, api, payload) {
            this.visualMapModel = visualMapModel;

            if (visualMapModel.get('show') === false) {
                this.group.removeAll();
                return;
            }					
			
            this.doRender.apply(this, arguments);
			
            this.updatePos(visualMapModel, ecModel);	
        },

        updatePos: function (visualMapModel, ecModel) {		
			
            var geo = ecModel.getComponent('geo');
            var zoomFactor = geo.coordinateSystem._zoom * 0.2;
            if (zoomFactor > 1) {
                zoomFactor = 1;
            }
            this.group.scale[0] = zoomFactor;
            this.group.scale[1] = zoomFactor;
			
            var _boudingRect = geo.coordinateSystem.getBoundingRect();
            var ptLeftTop = geo.coordinateSystem.dataToPoint([_boudingRect.x, _boudingRect.y + _boudingRect.height]);
            var ptRightBtm = geo.coordinateSystem.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y]);

            var grect = this.group.getBoundingRect();

			

				

            var posHori = visualMapModel.get('posHori');
            var posVert = visualMapModel.get('posVert');
			
            if (posHori == "left") {
                this.group.position[0] = ptLeftTop[0] - grect.width * zoomFactor;
            }
            else if (posHori == "center") {
                this.group.position[0] = (ptLeftTop[0] + ptRightBtm[0]) / 2;
            }
            else if (posHori == "right") {

                this.group.position[0] = ptRightBtm[0] + grect.width * zoomFactor;
            }

            if (posVert == "top") {
                this.group.position[1] = ptLeftTop[1];
            }
            else if (posVert == "middle") {
                this.group.position[1] = (ptLeftTop[1] + ptRightBtm[1]) / 2 - (grect.height / 2) * zoomFactor;
            }
            else if (posVert == "bottom") {
                this.group.position[1] = ptRightBtm[1] - grect.height * zoomFactor;
            }
		},

        /**
         * @protected
         */
        renderBackground: function (group) {
            var visualMapModel = this.visualMapModel;
            var padding = formatUtil.normalizeCssArray(visualMapModel.get('padding') || 0);
            var rect = group.getBoundingRect();
            group.add(new graphic.Rect({
                z2: -1,
                // Lay background rect on the lowest layer.
                silent: true,
                shape: {
                    x: rect.x - padding[3],
                    y: rect.y - padding[0],
                    width: rect.width + padding[3] + padding[1],
                    height: rect.height + padding[0] + padding[2]
                },
                style: {
                    fill: visualMapModel.get('backgroundColor'),
                    stroke: visualMapModel.get('borderColor'),
                    lineWidth: visualMapModel.get('borderWidth')
                }
            }));
        },

        /**
         * @protected
         * @param {number} targetValue can be Infinity or -Infinity
         * @param {string=} visualCluster Only can be 'color' 'opacity' 'symbol' 'symbolSize'
         * @param {Object} [opts]
         * @param {string=} [opts.forceState] Specify state, instead of using getValueState method.
         * @param {string=} [opts.convertOpacityToAlpha=false] For color gradient in controller widget.
         * @return {*} Visual value.
         */
        getControllerVisual: function (targetValue, visualCluster, opts) {
            opts = opts || {};
            var forceState = opts.forceState;
            var visualMapModel = this.visualMapModel;
            var visualObj = {}; // Default values.

            if (visualCluster === 'symbol') {
                visualObj.symbol = visualMapModel.get('itemSymbol');
            }

            if (visualCluster === 'color') {
                var defaultColor = visualMapModel.get('contentColor');
                visualObj.color = defaultColor;
            }

            function getter(key) {
                return visualObj[key];
            }

            function setter(key, value) {
                visualObj[key] = value;
            }

            var mappings = visualMapModel.controllerVisuals[forceState || visualMapModel.getValueState(targetValue)];
            var visualTypes = VisualMapping.prepareVisualTypes(mappings);
            zrUtil.each(visualTypes, function (type) {
                var visualMapping = mappings[type];

                if (opts.convertOpacityToAlpha && type === 'opacity') {
                    type = 'colorAlpha';
                    visualMapping = mappings.__alphaForOpacity;
                }

                if (VisualMapping.dependsOn(type, visualCluster)) {
                    visualMapping && visualMapping.applyVisual(targetValue, getter, setter);
                }
            });
            return visualObj[visualCluster];
        },

        /**
         * @protected
         */
        positionGroup: function (group) {
            var model = this.visualMapModel;
            var api = this.api;
            layout.positionElement(group, model.getBoxLayoutParams(), {
                width: api.getWidth(),
                height: api.getHeight()
            });
        },

        /**
         * @protected
         * @abstract
         */
        doRender: zrUtil.noop
    });

   
    hwchart.component.visualMap.VisualMapView = _default;
})