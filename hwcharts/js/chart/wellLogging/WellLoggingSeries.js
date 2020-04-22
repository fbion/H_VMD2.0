Vmd.define('hwchart.chart.wellLogging.WellLoggingSeries', {
    requires: [
        'hwchart.util.layout',
        'hwchart.model.Model',
        'hwchart.model.Series',
        'hwchart.model.Component',
        'hwchart.data.Tree',
        'hwchart.chart.wellLogging.helper',

        'hwchart.coord.cartesian.Cartesian2D',
        'hwchart.coord.cartesian.AxisModel',
        'hwchart.coord.axisHelper',
        'hwchart.coord.cartesian.Axis2D'
    ]
},function(){

    var ComponentModel = hwchart.model.Component;
    var SeriesModel = hwchart.model.Series;
    var Tree = hwchart.data.Tree;
    var _util = zrender.util;

    var layout = hwchart.util.layout;

    var each = _util.each;
    var extend = _util.extend;
    var isArray = _util.isArray;
    var defaults = _util.defaults;
    var clone = _util.clone;
    var assert = _util.assert;

    var Model = hwchart.model.Model;
    var helper = hwchart.chart.wellLogging.helper;

    var Cartesian2D = hwchart.coord.cartesian.Cartesian2D;
    var AxisModel = hwchart.coord.cartesian.AxisModel;
    var axisHelper = hwchart.coord.axisHelper;
    var Axis2D = hwchart.coord.cartesian.Axis2D;

    var createHashMap = _util.createHashMap;
    var createScaleByModel = axisHelper.createScaleByModel;

    function findDataOptionByName(data, name, result){
        each(data, function(dataOpt){
            if(dataOpt.children){
                findDataOptionByName(dataOpt.children, name, result);
            }
            else if(dataOpt.name == name){
                result.push(dataOpt);
            }
        });
    }

    function preprocessOption(seriesOpt) {
        var depthAxis = {};
        var depth = seriesOpt.depth;
        if(isArray(depth) && depth.length == 2 && !isNaN(depth[0]) && !isNaN(depth[1])){
            depthAxis.type = 'depth';
            depthAxis.min = depth[0];
            depthAxis.max = depth[1];
        }
        else if(isArray(depth)){
            depthAxis.type = 'depthMap';
            depthAxis.data = depth;
        }

        seriesOpt.scale && (depthAxis.scale = seriesOpt.scale);

        seriesOpt.depthAxis = defaults(depthAxis, seriesOpt.depthAxis);
        seriesOpt.itemStyle = seriesOpt.itemStyle || {};
    }

    var WellLoggingSeries = SeriesModel.extend({

        type: 'series.wellLogging',

        layoutMode: 'box',

        _tree: null,

        /**
         * @type {module:echarts/data/Tree~Node}
         */
        _viewRoot: null,

        defaultOption: {
            // center: ['50%', '50%'],          // not supported in ec3.
            // size: ['80%', '80%'],            // deprecated, compatible with ec2.
            left: 'center',
            top: 0,
            right: null,
            bottom: null,
            width: 'auto',
            height: '100%',
            roam: true,                         // true, false, 'scale' or 'zoom', 'move'.

            animation: true,
            animationDurationUpdate: 900,
            animationEasing: 'quinticInOut',

            dataZoomEnabled: true,
            dataZoom: [{
                type: 'slider',
                filterMode: "empty",
                yAxisIndex: 0,
                width: 10,
                start: 0,
                // end: 20,
                handleSize: '0', // 滑动条的 左右2个滑动小块的大小
                // handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                textStyle: {
                    color: "#fff"
                },
                fillerColor: 'rgba(193, 193, 193, 1)', // 拖动条的颜色
                borderColor: "none",
                backgroundColor: 'rgba(241, 241, 241, 1)',
                showDetail: false // 即拖拽时候是否显示详细数值信息 默认true
            }]
        },

        init: function (option) {
            // Not using preprocessor because mergeOption may not have series.type
            preprocessOption(option);

            this._axiesMap = createHashMap({
                xAxis: [],
                yAxis: []
            });

            WellLoggingSeries.superApply(this, 'init', arguments);
        },

        mergeOption: function (option) {
            //合并数据
            var oldOption = clone(this.option);
            var oldDataOption = oldOption.data;

            var newDataOption = option.data;
            var tree = this._tree;
            each(newDataOption, function(itemOpt){
                var dataOptions = [];
                findDataOptionByName(oldDataOption, itemOpt.name, dataOptions);
                each(dataOptions, function(dataOpt){
                    defaults(dataOpt, itemOpt, true);
                });
                tree.eachNode(function(node){
                     if(node.name==itemOpt.name)
                        node._dirty = true;
                });

            });
            option.data = oldDataOption;
            preprocessOption(option);
            WellLoggingSeries.superApply(this, 'mergeOption', arguments);
        },

        /**
         * @override
         */
        getInitialData: function (option, ecModel) {

            var tree = this._tree;
            if(!tree) {
                var data = option.data || [];
                var rootName = option.name;
                rootName == null && (rootName = "");

                // Create a virtual root.
                var root = {
                    name: rootName,
                    type: 'track',
                    itemStyle: option.itemStyle,
                    depthAxis: option.depthAxis,
                    children: option.data,
                    _dirty: true
                };

                tree = this._tree = Tree.createTree(root, this, []);
                var root = tree.root;

                initVAxis(this, ecModel); //初始化纵向轴
                initItemModel(tree, this, ecModel);

                completeTreeWidth(root);
                completeTreeHeaderHeight(root);

                initDataZoomModel(this, ecModel);
            }

            else {
                updataItemTree(tree, option.data);
            }
            return tree.data;
        },

        getBoxLayoutParams: function () {
            return {
                left: this.get('left'),
                top: this.get('top'),
                right: this.get('right'),
                bottom: this.get('bottom'),
                width: this.get('width') == 'auto' ? this.getViewRoot().width : this.get('width'),
                height: this.get('height')
            }
        },

        optionUpdated: function () {
            this.resetViewRoot();
        },

        /**
         * @public
         * @param {Object} layoutInfo {
         *                                x: containerGroup x
         *                                y: containerGroup y
         *                                width: containerGroup width
         *                                height: containerGroup height
         *                            }
         */
        setLayoutInfo: function (layoutInfo) {
            /**
             * @readOnly
             * @type {Object}
             */
            this.layoutInfo = this.layoutInfo || {};
            extend(this.layoutInfo, layoutInfo);
        },

        /**
         * @param  {string} id
         * @return {number} index
         */
        mapIdToIndex: function (id) {
            // A feature is implemented:
            // index is monotone increasing with the sequence of
            // input id at the first time.
            // This feature can make sure that each data item and its
            // mapped color have the same index between data list and
            // color list at the beginning, which is useful for user
            // to adjust data-color mapping.

            /**
             * @private
             * @type {Object}
             */
            var idIndexMap = this._idIndexMap;

            if (!idIndexMap) {
                idIndexMap = this._idIndexMap = {};
                /**
                 * @private
                 * @type {number}
                 */
                this._idIndexMapCount = 0;
            }

            var index = idIndexMap[id];
            if (index == null) {
                idIndexMap[id] = index = this._idIndexMapCount++;
            }

            return index;
        },

        getBodyHeight: function(api) {
            var layoutInfo = layout.getLayoutRect(
                this.getBoxLayoutParams(),
                {
                    width: api.getWidth(),
                    height: api.getHeight()
                }
            );

            if(!this.get("dataZoomEnabled")) {
                return this.getVAxis().scale.getPixHeight();
            }

            var viewRoot = this.getViewRoot();
            return layoutInfo.height - (this.get("top") || 0) - (viewRoot.titleHeight + viewRoot.headerHeight)
        },

        getViewRoot: function (api) {
            return this._viewRoot;
        },

        getVAxis: function(){
            return this._axiesMap.get("yAxis")[0];
        },

        /**
         * @param {module:echarts/data/Tree~Node} [viewRoot]
         */
        resetViewRoot: function (viewRoot) {
            viewRoot
                ? (this._viewRoot = viewRoot)
                : (viewRoot = this._viewRoot);

            var root = this._tree.root;

            if (!viewRoot
                || (viewRoot !== root && !root.contains(viewRoot))
            ) {
                this._viewRoot = root;
            }
        }
    });


    function initVAxis(seriesModel, ecModel){

        //深度轴
        var depthAxis = seriesModel.get('depthAxis');

        var ComponentModelClass = ComponentModel.getClass("yAxis", "depth", true);

        // PENDING Global as parent ?
        var extraOpt = {
            mainType: "yAxis",
            subType: "depth",
        };
        var axisModel = new ComponentModelClass(depthAxis, ecModel, ecModel, extraOpt);
        extend(axisModel, extraOpt);
        axisModel.init(depthAxis, ecModel, ecModel, extraOpt); // Call optionUpdated after init.
        axisModel.optionUpdated(null, true);



        var axis = new Axis2D('y', createScaleByModel(axisModel), [0, 0], axisModel.get('type'), '');
        axisModel.axis = axis; // Inject axisModel into axis
        axis.model = axisModel; // Inject grid info axis

        seriesModel._axiesMap.get("yAxis")[0] = axis;
    }

    function initItemModel(tree, seriesModel, ecModel) {
        var root = tree.root;
        tree.eachNode(function(node){
            var option = node.getRawData();
            node._dirty = true;
            var Clazz = ComponentModel.getClass('wellLogging', option.type);

            assert(Clazz, '\'' + option.type + '\' model is undefined!');

            var itemModel = new Clazz(option, seriesModel, ecModel);
            itemModel.init(option, seriesModel, ecModel);
            node.setModel(itemModel);
        });
    }

    function initDataZoomModel(seriesModel, ecModel){

        var dataZoomOption = seriesModel.get('dataZoom');
        if(!dataZoomOption || dataZoomOption.length == 0){
            return;
        }

        seriesModel.dataZoom = [];
        each(dataZoomOption, function(opt, index){
            var DataZoomModel = ComponentModel.getClass('wellLogging', "dataZoom");

            var extraOpt = extend(
                {
                    dependentModels: {yAxis: [seriesModel.getVAxis().model]},
                    componentIndex: 0
                },
                {}
            );

            var dataZoomModel = new DataZoomModel(opt, seriesModel, ecModel, extraOpt);

            extend(dataZoomModel, extraOpt);
            dataZoomModel.init(opt, seriesModel, ecModel, extraOpt);

            seriesModel.dataZoom[index] = dataZoomModel;
        });
    };

    function updataItemTree(tree,option) {
        tree.eachNode(function(node){
            if(node._dirty==true){
                var resultData = updataItemModel(option,node.name);
                node.getRawData().data = resultData;
                node.getRawData().requestCompleted = true;
            }
        });
    }
    function updataItemModel(option,name){
        var result;
        for(var i = 0;i<option.length;i++)
        {
            // console.log(option[i].name);
            if(option[i].children){
                result = updataItemModel(option[i].children,name);
                if(result){
                    break;
                }
            }
            else if(option[i].name == name){
                result = option[i].data;
                break;
            }
        };
        return result;
    }

    /**
     * @param {Object} treeNode
     */
    function completeTreeWidth(treeNode) {
        // Postorder travel tree.
        var model = treeNode.getModel();

        var sumGroupWidth = 0;

        each(treeNode.children, function (child) {
            var childModel = child.getModel();
            var childType = childModel.get('type');

            if(childType == 'track'){
                sumGroupWidth += completeTreeWidth(child);
            }
        });

        var groupWidth = sumGroupWidth || model.get('width');

        each(treeNode.children, function (child) {
            var childModel = child.getModel();
            var childType = childModel.get('type');
            if(childType != 'track'){
                child.width = groupWidth;
            }
        });

        return treeNode.width = groupWidth;
    }

    function setTrackHeight(treeNode, height) {
        each(treeNode.children, function (child) {
            var childModel = child.getModel();
            var childType = childModel.get('type');

            var titleHeight = child.titleHeight || 0;
            if((titleHeight + child.headerHeight) >= height) {
                return;
            }

            child.headerHeight = height - titleHeight;

            //所有的元素都是track时，重新设置下面所有的子元素高度
            var isAllTrack = true;
            each(child.children, function (child1) {
                var child1Model = child1.getModel();
                var child1Type = child1Model.get('type');
                child1Type != 'track' && (isAllTrack = false);
            });
            if(isAllTrack) {
                setTrackHeight(child, child.headerHeight);
                return;
            }

            var groupHeight = 0;
            var elementNums = 0;

            //统计所有道的高度和非道元素数
            each(child.children, function (child1) {
                var child1Model = child1.getModel();
                var child1Type = child1Model.get('type');
                if(child1Type != 'track'){
                    elementNums++;
                }
                else{
                    groupHeight = Math.max(groupHeight, child1.titleHeight + child1.headerHeight);
                }
            });

            //将多余的高度给非track元素
            each(child.children, function (child1) {
                var child1Model = child1.getModel();
                var child1Type = child1Model.get('type');
                if(child1Type != 'track'){
                    child1.headerHeight = (height - groupHeight) / elementNums;
                }
            });
        });
    };

    /**
     * @param {Object} treeNode
     */
    function completeTreeHeaderHeight(treeNode){
        var maxGroupTitleHeight = 0; //道标题总高度
        var sumGroupHeaderHeight = 0; //道头header总高度
        var sumElementHeaderHeight = 0;//道元素header总高度

        var model = treeNode.getModel();

        var hasTrack = false; //道中包含道
        each(treeNode.children, function (child) {
            var childModel = child.getModel();
            var childType = childModel.get('type');
            if(childType == 'track'){
                sumGroupHeaderHeight = Math.max(sumGroupHeaderHeight, completeTreeHeaderHeight(child));
                maxGroupTitleHeight = Math.max(maxGroupTitleHeight, childModel.getTitleHeight());
                hasTrack = true;
            }
            else{
                sumElementHeaderHeight += childModel.getHeaderHeight();
            }
        });

        each(treeNode.children, function (child) {
            var childModel = child.getModel();
            var childType = childModel.get('type');
            if(childType == 'track'){
                var isTitleHidden = childModel.get('itemStyle.title.show') === false;
                child.headerHeight = sumGroupHeaderHeight + (!isTitleHidden ? 0 : maxGroupTitleHeight);
            }

            if(!child.children || child.children == 0){
                return;
            }

            //所有的元素都是track时，重新设置下面所有的子元素高度
            var isAllTrack = true;
            each(child.children, function (child1) {
                var child1Model = child1.getModel();
                var child1Type = child1Model.get('type');
                child1Type != 'track' && (isAllTrack = false);
            });
            if(isAllTrack) {
                setTrackHeight(child, sumGroupHeaderHeight)
            }

            var groupHeight = 0;
            var elementNums = 0;

            //统计所有道的高度和非道元素数
            each(child.children, function (child1) {
                var child1Model = child1.getModel();
                var child1Type = child1Model.get('type');
                if(child1Type != 'track'){
                    elementNums++;
                }
                else{
                    groupHeight = Math.max(groupHeight, child1.titleHeight + child1.headerHeight);
                }
            });

            //将多余的高度给非track元素
            each(child.children, function (child1) {
                var child1Model = child1.getModel();
                var child1Type = child1Model.get('type');
                if(child1Type != 'track'){
                    var isGroupTitleHidden = childModel.get('itemStyle.title.show') === false;
                    child1.headerHeight = (sumGroupHeaderHeight - groupHeight + (!isGroupTitleHidden ? 0 : maxGroupTitleHeight)) / elementNums;
                }
            });
        });

        if(model.get('type') == 'track'){
            treeNode.hasTrack = hasTrack;
        }
        treeNode.titleHeight = model.get('itemStyle.title.show') === false ? 0 : model.getTitleHeight();
        return treeNode.headerHeight = (sumElementHeaderHeight + sumGroupHeaderHeight + maxGroupTitleHeight) || model.getHeaderHeight();
    }

    hwchart.chart.wellLogging.WellLoggingSeries = WellLoggingSeries;
})