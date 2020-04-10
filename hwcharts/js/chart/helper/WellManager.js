Vmd.define('hwchart.chart.helper.WellManager', {
    requires: [
        'hwchart.util.model',
        'hwchart.util.graphic',
        'hwchart.util.layout',
        'hwchart.util.format',
        'hwchart.data.kdTree'
    ]
}, function () {

    var zrUtil = zrender.util;
    var formatUtil = hwchart.util.format;
    var graphic = hwchart.util.graphic;
    var layout = hwchart.util.layout;
    var kdTree = hwchart.data.kdTree;
    var _model = hwchart.util.model;
    var makeInner = _model.makeInner;


    var kdtree = null;
    var selectedPadding = 8;
    var selectedLineWidth = 1;

    var inner = makeInner();

    hwchart.chart.helper.WellManager = {

        reset:function(ecModel){
            var props = inner(ecModel);

            props.group ? props.group.removeAll() : (props.group = new graphic.Group()) ;

            props.nameList = []; //序列名称
            props.series = [];
            props.datas = [];

            props.wellPositionMap = {}; //井的位置
            props.seriesModelMap = {}; //井对应的序列model

            props.showSymbolIds = []; //显示的井的id

            props._graphicEls = {};
            props._graphicSymbols = {};
            props._graphicNames = {};

            props.selectedWellIds = [];
            props.selectedGraphics = [];

            props.hasInit = true;
        },

        /**
         * 初始化序列数据
         * @param data
         */
        setData: function (data) {
            var seriesModel = data.hostModel;
            var ecModel = seriesModel.ecModel;

            var props = inner(ecModel);
            if(!props.hasInit){
                this.reset(ecModel);
            }

            var name = seriesModel.name;
            var index = zrUtil.indexOf(props.nameList, name);
            if(index == -1){
                props.nameList.push(name);
                index = props.nameList.length - 1;
            }

            props.series[index] = seriesModel;
            props.datas[index] = data;
        },

        buildKdTree: function(){
            var points = zrUtil.map(showSymbolIds, function(id){
                return {
                    id: id,
                    value: wellPositionMap[id]
                }
            });
            var distance = function(a, b){
                return Math.pow(a.value[0] - b.value[0], 2) +  Math.pow(a.value[1] - b.value[1], 2);
            }

            kdtree = new kdTree(points, distance, ["id", "name", "value"]);
        },

        /**
         * 判断井符号是否显示，此处根据符号避让算法获取
         * @param data
         * @param idx
         * @returns {boolean}
         */
        checkSymbolShow: function(data, idx){
            var seriesModel = data.hostModel;
            var ecModel = seriesModel.ecModel;
            var props = inner(ecModel);
            var id = data.getId(idx);

            return zrUtil.indexOf(props.showSymbolIds, id) !== -1;
        },

        checkMoveType: function(point, payload){
            var lastPoint = [point[0] - payload.dx, point[1] - payload.dy];
            if(layout.isPointInBody(lastPoint) && !layout.isPointInBody(point)){
                return 'screenOut'
            }
            else if(!layout.isPointInBody(lastPoint) && layout.isPointInBody(point)){
                return 'screenIn'
            }
            return 'none';
        },

        isPointInBody: function(point){
            if(point && !isNaN(point[0]) && !isNaN(point[1])){
                return layout.isPointInBody(point);
            }
            return false;
        },

        /**
         * 获取井的位置
         * @param data
         * @param idx
         * @returns {null|*|Array<number>}
         */
        getWellLayout: function(data, idx){
            if(!this.checkSymbolShow(data, idx)){
                return null;
            }

            var ecModel = data.hostModel.ecModel;
            var props = inner(ecModel);
            var id = data.getId(idx);

            var position = props.wellPositionMap[id];
            var seriesModel = props.seriesModelMap[id];
            var coordSys = seriesModel && seriesModel.coordinateSystem;
            if(position  && coordSys){
                return coordSys.dataToPoint(position);
            }

            return null;
        },

        /**
         * 检测碰撞，返回true表示碰撞
         * @param data
         * @param idx
         * @param point
         * @param size
         * @param zoomScale
         * @returns {boolean}
         */
        checkCrash: function(data, idx, point, size, zoomScale) {
            return false;

            // var seriesModel = data.hostModel;
            // var ecModel = seriesModel.ecModel;
            // var props = inner(ecModel);
            //
            // if(!point || !size || !layout.isPointInBody(point)){
            //     return false;
            // }
            // var id = data.getId(idx);
            //
            // //跟已经显示的进行比较
            // var symbolSize = size[0];
            // for(var i = 0; i < props.showSymbolIds.length; i++){
            //     if(id == props.showSymbolIds[i]){
            //         continue;
            //     }
            //     var itemLayout = this.getWellLayout(ecModel, props.showSymbolIds[i]);
            //     if(itemLayout && layout.isPointInBody(itemLayout)){
            //         //碰撞
            //         if((point[0] - size[0] / 2) < (itemLayout[0] + symbolSize / 2) &&
            //             (point[0] + size[0] / 2) > (itemLayout[0] - symbolSize / 2) &&
            //             (point[1] - size[1] / 2) < (itemLayout[1] + symbolSize / 2) &&
            //             (point[1] + size[1] / 2) > (itemLayout[1] - symbolSize / 2)
            //         ){
            //             return true;
            //         }
            //     }
            // }
            //
            // return false;
        },

        /**
         * 判断井符号是否需要绘制
         * @param data
         * @param idx
         * @param symbolSize
         * @param zoomScale
         * @returns {*|boolean}
         */
        needsDrawSymbol: function(data, idx, symbolSize, zoomScale) {
            var point = data.getItemLayout(idx);
            if(!point || isNaN(point[0]) || isNaN(point[1]) || !layout.isPointInBody(point)){
                return false;
            }
            // this.buildKdTree();
            return !this.checkCrash(data, idx, point, [symbolSize * zoomScale, symbolSize * zoomScale], zoomScale);
        },

        getLayoutPosition: function(data, idx, el, point, position, distance, offset, zoomScale){

            var seriesModel = data.hostModel;
            var ecModel = seriesModel.ecModel;
            var props = inner(ecModel);
            var id = data.getId(idx);

            offset = formatUtil.normalizeCssArray(offset || 0);
            var symbolGraphic = props._graphicSymbols[id];
            var symbolBoundRect = symbolGraphic && symbolGraphic.getBoundingRect();
            var symbolScale = symbolGraphic && symbolGraphic.scale;
            var elBoundRect = el && el.getBoundingRect();
            var newPoint = zrUtil.clone(point);

            switch (position) {
                case 'left':
                    newPoint[0] = newPoint[0] - (symbolBoundRect.width * symbolScale[0] / 2 + elBoundRect.width + distance - offset[0]) * zoomScale;
                    newPoint[1] = newPoint[1] - (elBoundRect.height / 2 - offset[1]) * zoomScale;
                    break;
                case 'right':
                    newPoint[0] = newPoint[0] + (symbolBoundRect.width * symbolScale[0] / 2 + distance + offset[0]) * zoomScale;
                    newPoint[1] = newPoint[1] - (elBoundRect.height / 2 - offset[1]) * zoomScale;
                    break;
                case 'bottom':
                    newPoint[0] = newPoint[0] - (symbolBoundRect.width * symbolScale[0] / 2 + (elBoundRect.width - symbolBoundRect.width * symbolScale[0]) / 2 - offset[0]) * zoomScale;
                    newPoint[1] = newPoint[1] + (symbolBoundRect.height * symbolScale[1] / 2 + distance + offset[1]) * zoomScale;
                    break;
                case 'top':
                    newPoint[0] = newPoint[0] + (symbolBoundRect.width * symbolScale[0] / 2 + distance + offset[0]) * zoomScale;
                    newPoint[1] = newPoint[1] - (symbolBoundRect.height * symbolScale[1] *2 + elBoundRect.height + distance - offset[1]) * zoomScale;
                    break;
                case 'center':
                    newPoint[0] = newPoint[0] + (symbolBoundRect.width * symbolScale[0] / 2 + distance + offset[0]) * zoomScale;
                    newPoint[1] = newPoint[1] - (elBoundRect.height / 2 - offset[1]) * zoomScale;
                    break;
                case 'right+':
                    newPoint[0] = newPoint[0] + (symbolBoundRect.width * symbolScale[0] *4 + distance + offset[0]) * zoomScale;
                    newPoint[1] = newPoint[1] - (elBoundRect.height / 2 - offset[1]) * zoomScale;
                    break;
                case 'bottom+':
                    newPoint[0] = newPoint[0] - (symbolBoundRect.width * symbolScale[0] / 2 + (elBoundRect.width - symbolBoundRect.width * symbolScale[0]) / 2 - offset[0]) * zoomScale;
                    newPoint[1] = newPoint[1] + (symbolBoundRect.height * symbolScale[1] / 2 + distance + offset[1]) * zoomScale;
                    break;
                case 'leftTop':
				//newPoint[0] = newPoint[0] - 100 * zoomScale;
                    newPoint[0] = newPoint[0] - (elBoundRect.width * zoomScale / 2);
					newPoint[1] = newPoint[1] - elBoundRect.height * zoomScale / 2 - symbolBoundRect.height * symbolScale[1] * zoomScale / 2 - offset[0] * zoomScale;
                    //newPoint[0] = newPoint[0] - (symbolBoundRect.width * symbolScale[0] + (elBoundRect.width - symbolBoundRect.width * symbolScale[0]) / 2 - offset[0]) * zoomScale;
                    //newPoint[1] = newPoint[1] - (symbolBoundRect.height * symbolScale[1] *2 + elBoundRect.height + distance - offset[1]) * zoomScale;
                    break;
                case 'rightTop':
                    newPoint[0] = newPoint[0] + (symbolBoundRect.width * symbolScale[0] *4 + distance + offset[0]) * zoomScale;
                    newPoint[1] = newPoint[1] - (symbolBoundRect.height * symbolScale[1] *2 + elBoundRect.height + distance - offset[1]) * zoomScale;
                    break;
                default:
                    newPoint[0] = newPoint[0] - (symbolBoundRect.width * symbolScale[0] / 2 + (elBoundRect.width - symbolBoundRect.width * symbolScale[0]) / 2 - offset[0]) * zoomScale;
                    newPoint[1] = newPoint[1] - (symbolBoundRect.height * symbolScale[1] / 2 + elBoundRect.height + distance - offset[1]) * zoomScale;
                    break;
            }
            return newPoint;
        },

        /**
         * 添加井符号
         * @param data
         * @param idx
         */
        addWellSymbol: function(data, idx){
            var id = data.getId(idx);
            var el = data.getItemGraphicEl(idx);

            var seriesModel = data.hostModel;
            var ecModel = seriesModel.ecModel;
            var props = inner(ecModel);

            var itemGroup = props._graphicEls[id];
            if(itemGroup){
                props.group.remove(itemGroup)
            }
            itemGroup = props._graphicEls[id] = new graphic.Group();
            // if(!itemGroup){
            //     itemGroup = _graphicEls[id] = new graphic.Group();
            // }

            var itemLayout = data.getItemLayout(idx);
            var rawDataItem = data.getRawDataItem(idx);

            el.attr('position', itemLayout);
            props.wellPositionMap[id] = rawDataItem && rawDataItem.value;
            props.seriesModelMap[id] = seriesModel;
            props._graphicSymbols[id] = el.childAt(0);
            itemGroup.add(el);
            props.group.add(itemGroup);

            var selectEl = props.selectedGraphics[zrUtil.indexOf(props.selectedWellIds, id)];
            if(selectEl) {
                var shape = itemGroup.getBoundingRect();
                selectEl.attr('shape', {
                    x: shape.x - selectedPadding / 2,
                    y: shape.y - selectedPadding / 2,
                    width: shape.width + selectedPadding,
                    height: shape.height + selectedPadding
                });
            }
            return itemGroup;
        },

        /**
         * 移除井符号
         * @param data
         * @param idx
         */
        removeWellSymbol: function(data, idx){
            var id = data.getId(idx);
            var el = data.getItemGraphicEl(idx);
            var seriesModel = data.hostModel;
            var ecModel = seriesModel.ecModel;

            var props = inner(ecModel);
            var itemGroup = props._graphicEls[id];
            if(itemGroup && el){
                itemGroup.remove(el);
            }
        },

        /**
         * 添加井元素
         * @param data
         * @param idx
         * @param el
         * @param parentGroup
         * @param point
         * @param position
         * @param distance
         * @param offset
         * @param zoomScale
         * @returns {*}
         */
        addWellEl: function(data, idx, el, parentGroup, point, position, distance, offset, zoomScale){
            var id = data.getId(idx);
            var seriesModel = data.hostModel;
            var ecModel = seriesModel.ecModel;

            if(!this.checkSymbolShow(data, idx)){
                return;
            }
            var props = inner(ecModel);
            parentGroup = parentGroup || props._graphicEls[id];
            if(!parentGroup){
                return;
            }

            var itemLayout = this.getLayoutPosition(data, idx, el, point, position, distance, offset, zoomScale);
            el.attr('position', itemLayout);

            parentGroup.add(el);
            return itemLayout;
        },

        removeWellEl: function(data, idx){
            var id = data.getId(idx);
            var seriesModel = data.hostModel;
            var ecModel = seriesModel.ecModel;

            var props = inner(ecModel);
            var itemGroup = props._graphicEls[id];
            if(itemGroup){
                itemGroup.removeAll();
            }
        },

        /**
         * 设置井符号显示标识
         * @param data
         * @param idx
         * @param show
         */
        setSymbolShow: function(data, idx, show){
            var id = data.getId(idx);
            var seriesModel = data.hostModel;
            var ecModel = seriesModel.ecModel;
            var props = inner(ecModel);
            if(show && !this.checkSymbolShow(data, idx)){
                props.showSymbolIds.push(id);
            }
            else if(!show && this.checkSymbolShow(data, idx)){
                props.showSymbolIds.remove(id);
            }
        },

        checkSelected: function(ecModel, id){
            return;
            // var props = inner(ecModel);
            // return zrUtil.indexOf(props.selectedWellIds, id) !== -1;
        },

        createWellSelect: function (ecModel, id) {
            var props = inner(ecModel);
            var itemGroup = props._graphicEls[id];
            if(!itemGroup){
                return;
            }
            
            var shape = itemGroup.getBoundingRect();
            var selectEl = new zrender.Rect({
                shape: {
                    x: shape.x - selectedPadding / 2,
                    y: shape.y - selectedPadding / 2,
                    width: shape.width + selectedPadding,
                    height: shape.height + selectedPadding
                },
                style:{
                    fill:'none',
                    stroke: 'black',
                    lineWidth: selectedLineWidth,
                    lineDash: [selectedLineWidth * 4, selectedLineWidth * 4]
                },
                z: 10
            });
            selectEl.animateStyle(true)
                .when(1000, {
                    lineDashOffset: selectedLineWidth * 8
                })
                .delay(100)
                .start();
            selectEl._tag = 'select';
            
            props.group.add(selectEl);
            props.selectedWellIds.push(id);
            props.selectedGraphics[props.selectedWellIds.length - 1] = selectEl;
        },

        clearSelect: function(ecModel, clearIds){
            // if(clearIds){
            //     return;
            // }
            var props = inner(ecModel);
            var len = props.selectedWellIds.length;
            for(var i = 0; i < props.selectedWellIds.length; i++){
                var sub = props.selectedGraphics[i];
                props.group.remove(sub);
            }
            props.selectedWellIds = [];
            props.selectedGraphics = [];
        },

        /*
        * 获取容器
         */
        getGroup: function(ecModel){
            var props = inner(ecModel);
            props.group = props.group || new graphic.Group();
            return props.group;
        },

        dispose: function(ecModel, api){
            this.reset(ecModel);
        }
    };
});