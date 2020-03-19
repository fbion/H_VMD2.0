Vmd.define('hwchart.chart.helper.WellManager', {
    requires: [
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

    var group = new graphic.Group();

    var kdtree = null;

    var nameList = []; //序列名称
    var series = [];
    var datas = [];

    var wellPositionMap = {}; //井的位置
    var seriesModelMap = {}; //井对应的序列model

    var showSymbolIds = []; //显示的井的id

    var _graphicEls = {};
    var _graphicSymbols = {};
    var _graphicNames = {};

    var selectedWellIds = [];
    var selectedGraphics = [];

    var selectedPadding = 8;
    var selectedLineWidth = 1;

    hwchart.chart.helper.WellManager = {

        /**
         * 初始化序列数据
         * @param data
         */
        setData: function (data) {
            var seriesModel = data.hostModel;
            var name = seriesModel.name;
            var index = zrUtil.indexOf(nameList, name);
            if(index == -1){
                nameList.push(name);
                index = nameList.length - 1;
            }

            series[index] = seriesModel;
            datas[index] = data;

            var points = [];
            zrUtil.each(datas, function(itemData){
				// 20200211 修改
                var itemRawData = itemData._rawData._data;
                points = points.concat(itemRawData);
                zrUtil.each(itemRawData, function(item){
                    wellPositionMap[item.id] = item.value;
                    seriesModelMap[item.id] = itemData.hostModel;
                });
            });
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
         * @param id
         * @returns {boolean}
         */
        checkSymbolShow: function(id){
            return zrUtil.indexOf(showSymbolIds, id) !== -1;
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
            return layout.isPointInBody(point);
        },

        /**
         * 获取井的位置
         * @param id
         * @returns {null}
         */
        getWellLayout: function(id){
            if(!this.checkSymbolShow(id)){
                return null;
            }
            var position = wellPositionMap[id];
            var seriesModel = seriesModelMap[id];
            var coordSys = seriesModel && seriesModel.coordinateSystem;
            if(position  && coordSys){
                return coordSys.dataToPoint(position);
            }

            return null;
        },

        /**
         * 检测碰撞，返回true表示碰撞
         * @param id
         * @param point
         * @param size
         * @param zoomScale
         * @returns {boolean}
         */
        checkCrash: function(data, idx, point, size, zoomScale){
            return false;
            if(!point || !size || !layout.isPointInBody(point)){
                return false;
            }
            var id = data.getId(idx);

            //跟已经显示的进行比较
            var symbolSize = size[0];
            for(var i = 0; i < showSymbolIds.length; i++){
                if(id == showSymbolIds[i]){
                    continue;
                }
                var itemLayout = this.getWellLayout(showSymbolIds[i]);
                if(itemLayout && layout.isPointInBody(itemLayout)){
                    //碰撞
                    if((point[0] - size[0] / 2) < (itemLayout[0] + symbolSize / 2) &&
                        (point[0] + size[0] / 2) > (itemLayout[0] - symbolSize / 2) &&
                        (point[1] - size[1] / 2) < (itemLayout[1] + symbolSize / 2) &&
                        (point[1] + size[1] / 2) > (itemLayout[1] - symbolSize / 2)
                    ){
                        return true;
                    }
                }
            }
            // for(var i = 0; i < datas.length; i++){
            //     var itemData = datas[i];
            //     if(!itemData){
            //         continue;
            //     }
            //     var indices = itemData.indices;
            //     for(var j = 0; j < indices.length; j++){
            //         var index = indices[j];
            //         var graphicEl = itemData.getItemGraphicEl(index);
            //         var itemLayout = itemData.getItemLayout(index);
            //         if(id == itemData.getId(index) || !graphicEl || !this.checkSymbolShow(itemData.getId(index)) || !layout.isPointInBody(itemLayout)){
            //             continue;
            //         }
            //         var symbolSize = itemData.getItemVisual(index, 'symbolSize')
            //         //碰撞
            //         if((point[0] - size[0] / 2) < (itemLayout[0] + symbolSize * zoomScale / 2) &&
            //             (point[0] + size[0] / 2) > (itemLayout[0] - symbolSize * zoomScale / 2) &&
            //             (point[1] - size[1] / 2) < (itemLayout[1] + symbolSize * zoomScale / 2) &&
            //             (point[1] + size[1] / 2) > (itemLayout[1] - symbolSize * zoomScale / 2)
            //         ){
            //             return true;
            //         }
            //     }
            // }
            return false;
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

            if(!layout.isPointInBody(point)){
                return false;
            }
            // this.buildKdTree();
            return !this.checkCrash(data, idx, point, [symbolSize * zoomScale, symbolSize * zoomScale], zoomScale);
        },

        getLayoutPosition: function(id, el, point, position, distance, offset, zoomScale){
            
            offset = formatUtil.normalizeCssArray(offset || 0);

            var symbolGraphic = _graphicSymbols[id];
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

            var itemGroup = _graphicEls[id];
            if(itemGroup){
                group.remove(itemGroup)
            }
            itemGroup = _graphicEls[id] = new graphic.Group();
            // if(!itemGroup){
            //     itemGroup = _graphicEls[id] = new graphic.Group();
            // }

            var itemLayout = data.getItemLayout(idx);

            el.attr('position', itemLayout);

            _graphicSymbols[id] = el.childAt(0);
            itemGroup.add(el);
            group.add(itemGroup);

            var idx = zrUtil.indexOf(selectedWellIds, id);
            var selectEl = selectedGraphics[idx];
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

            var itemGroup = _graphicEls[id];
            if(itemGroup && el){
                itemGroup.remove(el);
            }
        },

        /**
         * 添加井元素
         * @param id
         * @param el
         * @param parentGroup
         * @param point
         * @param position
         * @param distance
         */
        addWellEl: function(data, idx, el, parentGroup, point, position, distance, offset, zoomScale){
            var id = data.getId(idx);
            if(!this.checkSymbolShow(id)){
                return;
            }
            parentGroup = parentGroup || _graphicEls[id];
            if(!parentGroup){
                return;
            }

            var itemLayout = this.getLayoutPosition(id, el, point, position, distance, offset, zoomScale);
            el.attr('position', itemLayout);

            parentGroup.add(el);
            return itemLayout;
        },

        removeWellEl: function(data, idx){
            var id = data.getId(idx);
            var itemGroup = _graphicEls[id];
            if(itemGroup){
                itemGroup.removeAll();
            }
        },

        /**
         * 设置井符号显示标识
         * @param id
         * @param show
         */
        setSymbolShow: function(id, show){
            if(show && !this.checkSymbolShow(id)){
                showSymbolIds.push(id);
            }
            else if(!show && this.checkSymbolShow(id)){
                showSymbolIds.remove(id);
            }
        },

        checkSelected: function(id){
            return zrUtil.indexOf(selectedWellIds, id) !== -1;
        },

        createWellSelect: function (id) {
            var itemGroup = _graphicEls[id];
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

            group.add(selectEl);
            selectedWellIds.push(id);
            selectedGraphics[selectedWellIds.length - 1] = selectEl;
        },

        clearSelect: function(clearIds){
            if(clearIds){
                return;
            }
            var len = selectedWellIds.length;
            for(var i = 0; i < selectedWellIds.length; i++){
                var sub = selectedGraphics[i];
                group.remove(sub);
            }
            selectedWellIds = [];
            selectedGraphics = [];
        },

        /*
        * 获取容器
         */
        getGroup: function(){
            return group;
        },

        dispose: function(){

            nameList = []; //序列名称
            series = [];
            datas = [];

            wellPositionMap = {}; //井的位置
            seriesModelMap = {}; //井对应的序列model

            showSymbolIds = []; //显示的井的id

            _graphicEls = {};
            _graphicSymbols = {};
            _graphicNames = {};

            selectedWellIds = [];
            selectedGraphics = [];
        }
    };
   
})