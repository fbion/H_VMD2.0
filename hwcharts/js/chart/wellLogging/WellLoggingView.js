Vmd.define('hwchart.chart.wellLogging.WellLoggingView', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.data.DataDiffer',
        'hwchart.chart.wellLogging.helper',
        'hwchart.component.helper.RoamController',,
        'hwchart.view.Component',
        'hwchart.util.animation'
    ]
},function(){

    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
    var DataDiffer = hwchart.data.DataDiffer;
    var helper = hwchart.chart.wellLogging.helper;
    var ComponentView = hwchart.view.Component;
    var RoamController = hwchart.component.helper.RoamController;
    var BoundingRect = zrender.BoundingRect;
    var matrix = zrender.matrix;
    var animationUtil = hwchart.util.animation;
    var bind = zrUtil.bind;
    var Group = graphic.Group;
    var Rect = graphic.Rect;
    var each = zrUtil.each;

    var DRAG_THRESHOLD = 3;
    var PATH_LABEL_NORMAL = ['label', 'normal'];
    var PATH_LABEL_EMPHASIS = ['label', 'emphasis'];
    var Z_BASE = 10; // Should bigger than every z.
    var Z_BG = 1;
    var Z_CONTENT = 2;

    hwchart.chart.wellLogging.WellLoggingView = hwcharts.extendChartView({

        type: 'wellLogging',

        /**
         * @override
         */
        init: function (o, api) {

            /**
             * @private
             * @type {module:zrender/container/Group}
             */
            this._containerGroup;

            /**
             * @private
             * @type {Object.<string, Array.<module:zrender/container/Group>>}
             */
            this._storage = createStorage();

            this._dataZoomViews = [];

            /**
             * @private
             * @type {module:echarts/data/Tree}
             */
            this._oldTree;

            /**
             * @private
             * @type {module:echarts/chart/treemap/Breadcrumb}
             */
            this._breadcrumb;

            /**
             * @private
             * @type {module:echarts/component/helper/RoamController}
             */
            this._controller;

            /**
             * 'ready', 'animating'
             * @private
             */
            this._state = 'ready';

            /**
             * @private
             * @type {boolean}
             */
            this._mayClick;
        },

        /**
         * @override
         */
        render: function (seriesModel, ecModel, api, payload) {

            var models = ecModel.findComponents({
                mainType: 'series', subType: 'wellLogging', query: payload
            });

            var payloadType = payload && payload.type;
            if (zrUtil.indexOf(models, seriesModel) < 0 || (payloadType == 'dataZoom' && payload.seriesModel.uid != seriesModel.uid)) {
                return;
            }

            this.seriesModel = seriesModel;
            this.api = api;
            this.ecModel = ecModel;

            var targetInfo = helper.retrieveTargetInfo(payload, seriesModel);
            var layoutInfo = seriesModel.layoutInfo;
            var isInit = !this._oldTree;
            var thisStorage = this._storage;

            // Mark new root when action is treemapRootToNode.
            var reRoot = (payloadType === 'treemapRootToNode' && targetInfo && thisStorage)
                ? {
                    rootNodeGroup: thisStorage.nodeGroup[targetInfo.node.getRawIndex()],
                    direction: payload.direction
                }
                : null;

            // if(payloadType != 'dataZoom'){

                var containerGroup = this._giveContainerGroup(layoutInfo, payload);

                var renderResult = this._doRender(containerGroup, seriesModel, reRoot, api, payload);
            // }

            // (
            //     !isInit && (
            //         !payloadType
            //         || payloadType === 'treemapZoomToNode'
            //         || payloadType === 'treemapRootToNode'
            //     )
            // )
            //     ? this._doAnimation(containerGroup, renderResult, seriesModel, reRoot)
            //     : renderResult.renderFinally();

            // this._resetController(api);

            !payloadType && this._renderScroller(seriesModel, ecModel, api, layoutInfo);
        },

        /**
         * @private
         */
        _giveContainerGroup: function (layoutInfo, payload) {
            var containerGroup = this._containerGroup;
            if (!containerGroup) {
                // FIXME
                // 加一层containerGroup是为了clip，但是现在clip功能并没有实现。
                containerGroup = this._containerGroup = new Group();
                this._initEvents(containerGroup);
                this.group.add(containerGroup);
            }

            var payloadType = payload && payload.type;
            if(payloadType != 'dataZoom'){
                containerGroup.attr('position', [layoutInfo.x, layoutInfo.y]);
            }

            // containerGroup.setClipPath(new graphic.Rect({
            //     shape: {
            //         x: -20,
            //         y: 0,
            //         width: layoutInfo.width * 2,
            //         height: layoutInfo.height
            //     }
            // }));

            // containerGroup.attr('rotation', Math.PI / 2)
            return containerGroup;
        },

        /**
         * @private
         */
        _doRender: function (containerGroup, seriesModel, reRoot, api, payload) {
            var thisTree = seriesModel.getData().tree;
            var oldTree = this._oldTree;

            // Clear last shape records.
            var lastsForAnimation = createStorage();
            var thisStorage = createStorage();
            var oldStorage = this._storage;
            var willInvisibleEls = [];
            var doRenderNode = zrUtil.curry(
                renderNode, seriesModel,
                thisStorage, oldStorage, reRoot,
                lastsForAnimation, willInvisibleEls
            );

            // Notice: when thisTree and oldTree are the same tree (see list.cloneShadow),
            // the oldTree is actually losted, so we can not find all of the old graphic
            // elements from tree. So we use this stragegy: make element storage, move
            // from old storage to new storage, clear old storage.

            dualTravel(
                thisTree.root ? [thisTree.root] : [],
                (oldTree && oldTree.root) ? [oldTree.root] : [],
                containerGroup,
                thisTree === oldTree || !oldTree,
                0
            );

            // Process all removing.
            var willDeleteEls = clearStorage(oldStorage);

            this._oldTree = thisTree;
            this._storage = thisStorage;

            return {
                lastsForAnimation: lastsForAnimation,
                willDeleteEls: willDeleteEls,
                renderFinally: renderFinally
            };

            function dualTravel(thisViewChildren, oldViewChildren, parentGroup, sameTree, depth) {
                // When 'render' is triggered by action,
                // 'this' and 'old' may be the same tree,
                // we use rawIndex in that case.
                if (sameTree) {
                    oldViewChildren = thisViewChildren;
                    each(thisViewChildren, function (child, index) {
                        !child.isRemoved() && processNode(index, index);
                    });
                }
                // Diff hierarchically (diff only in each subtree, but not whole).
                // because, consistency of view is important.
                else {
                    (new DataDiffer(oldViewChildren, thisViewChildren, getKey, getKey))
                        .add(processNode)
                        .update(processNode)
                        .remove(zrUtil.curry(processNode, null))
                        .execute();
                }

                function getKey(node) {
                    // Identify by name or raw index.
                    return node.getId();
                }

                function processNode(newIndex, oldIndex) {
                    var thisNode = newIndex != null ? thisViewChildren[newIndex] : null;
                    var oldNode = oldIndex != null ? oldViewChildren[oldIndex] : null;

                    var group = doRenderNode(thisNode, oldNode, parentGroup, depth, api, payload);

                    group && dualTravel(
                        thisNode && thisNode.viewChildren || [],
                        oldNode && oldNode.viewChildren || [],
                        group,
                        sameTree,
                        depth + 1
                    );
                }
            }

            function clearStorage(storage) {
                var willDeleteEls = createStorage();
                storage && each(storage, function (store, storageName) {
                    var delEls = willDeleteEls[storageName];
                    each(store, function (el) {
                        el && (delEls.push(el), el.__tmWillDelete = 1);
                    });
                });
                return willDeleteEls;
            }

            function renderFinally() {
                each(willDeleteEls, function (els) {
                    each(els, function (el) {
                        el.parent && el.parent.remove(el);
                    });
                });
                each(willInvisibleEls, function (el) {
                    el.invisible = true;
                    // Setting invisible is for optimizing, so no need to set dirty,
                    // just mark as invisible.
                    el.dirty();
                });
            }
        },

        /**
         * @private
         */
        _doAnimation: function (containerGroup, renderResult, seriesModel, reRoot) {
            if (!seriesModel.get('animation')) {
                return;
            }

            var duration = seriesModel.get('animationDurationUpdate');
            var easing = seriesModel.get('animationEasing');
            var animationWrap = animationUtil.createWrap();

            // Make delete animations.
            each(renderResult.willDeleteEls, function (store, storageName) {
                each(store, function (el, rawIndex) {
                    if (el.invisible) {
                        return;
                    }

                    var parent = el.parent; // Always has parent, and parent is nodeGroup.
                    var target;

                    if (reRoot && reRoot.direction === 'drillDown') {
                        target = parent === reRoot.rootNodeGroup
                            // This is the content element of view root.
                            // Only `content` will enter this branch, because
                            // `background` and `nodeGroup` will not be deleted.
                            ? {
                            shape: {
                                x: 0,
                                y: 0,
                                width: parent.__tmNodeWidth,
                                height: parent.__tmNodeHeight
                            },
                            style: {
                                opacity: 0
                            }
                        }
                            // Others.
                            : {style: {opacity: 0}};
                    }
                    else {
                        var targetX = 0;
                        var targetY = 0;

                        if (!parent.__tmWillDelete) {
                            // Let node animate to right-bottom corner, cooperating with fadeout,
                            // which is appropriate for user understanding.
                            // Divided by 2 for reRoot rolling up effect.
                            targetX = parent.__tmNodeWidth / 2;
                            targetY = parent.__tmNodeHeight / 2;
                        }

                        target = storageName === 'nodeGroup'
                            ? {position: [targetX, targetY], style: {opacity: 0}}
                            : {
                            shape: {x: targetX, y: targetY, width: 0, height: 0},
                            style: {opacity: 0}
                        };
                    }

                    target && animationWrap.add(el, target, duration, easing);
                });
            });

            // Make other animations
            each(this._storage, function (store, storageName) {
                each(store, function (el, rawIndex) {
                    var last = renderResult.lastsForAnimation[storageName][rawIndex];
                    var target = {};

                    if (!last) {
                        return;
                    }

                    if (storageName === 'nodeGroup') {
                        if (last.old) {
                            target.position = el.position.slice();
                            el.attr('position', last.old);
                        }
                    }
                    else {
                        if (last.old) {
                            target.shape = zrUtil.extend({}, el.shape);
                            el.setShape(last.old);
                        }

                        if (last.fadein) {
                            el.setStyle('opacity', 0);
                            target.style = {opacity: 1};
                        }
                        // When animation is stopped for succedent animation starting,
                        // el.style.opacity might not be 1
                        else if (el.style.opacity !== 1) {
                            target.style = {opacity: 1};
                        }
                    }

                    animationWrap.add(el, target, duration, easing);
                });
            }, this);

            this._state = 'animating';

            animationWrap
                .done(bind(function () {
                    this._state = 'ready';
                    renderResult.renderFinally();
                }, this))
                .start();
        },

        /**
         * @private
         */
        _resetController: function (api) {
            var controller = this._controller;

            // Init controller.
            if (!controller) {
                controller = this._controller = new RoamController(api.getZr());
                controller.enable(this.seriesModel.get('roam'));
                controller.on('pan', bind(this._onPan, this));
                controller.on('zoom', bind(this._onZoom, this));
            }

            var rect = new BoundingRect(0, 0, api.getWidth(), api.getHeight());
            controller.setPointerChecker(function (e, x, y) {
                return rect.contain(x, y);
            });
        },

        /**
         * @private
         */
        _clearController: function () {
            var controller = this._controller;
            if (controller) {
                controller.dispose();
                controller = null;
            }
        },

        /**
         * @private
         */
        _onPan: function (e) {
            if (this._state !== 'animating'
                && (Math.abs(e.dx) > DRAG_THRESHOLD || Math.abs(e.dy) > DRAG_THRESHOLD)
            ) {
                // These param must not be cached.
                var root = this.seriesModel.getData().tree.root;

                if (!root) {
                    return;
                }

                var rootLayout = root.getLayout();

                if (!rootLayout) {
                    return;
                }

                this.api.dispatchAction({
                    type: 'treemapMove',
                    from: this.uid,
                    seriesId: this.seriesModel.id,
                    rootRect: {
                        x: rootLayout.x + e.dx, y: rootLayout.y + e.dy,
                        width: rootLayout.width, height: rootLayout.height
                    }
                });
            }
        },

        /**
         * @private
         */
        _onZoom: function (e) {
            var mouseX = e.originX;
            var mouseY = e.originY;

            if (this._state !== 'animating') {
                // These param must not be cached.
                var root = this.seriesModel.getData().tree.root;

                if (!root) {
                    return;
                }

                var rootLayout = root.getLayout();

                if (!rootLayout) {
                    return;
                }

                var rect = new BoundingRect(
                    rootLayout.x, rootLayout.y, rootLayout.width, rootLayout.height
                );
                var layoutInfo = this.seriesModel.layoutInfo;

                // Transform mouse coord from global to containerGroup.
                mouseX -= layoutInfo.x;
                mouseY -= layoutInfo.y;

                // Scale root bounding rect.
                var m = matrix.create();
                matrix.translate(m, m, [-mouseX, -mouseY]);
                matrix.scale(m, m, [e.scale, e.scale]);
                matrix.translate(m, m, [mouseX, mouseY]);

                rect.applyTransform(m);

                this.api.dispatchAction({
                    type: 'treemapRender',
                    from: this.uid,
                    seriesId: this.seriesModel.id,
                    rootRect: {
                        x: rect.x, y: rect.y,
                        width: rect.width, height: rect.height
                    }
                });
            }
        },

        /**
         * @private
         */
        _initEvents: function (containerGroup) {
            containerGroup.on('click', function (e) {
                if (this._state !== 'ready') {
                    return;
                }

                var nodeClick = this.seriesModel.get('nodeClick', true);

                if (!nodeClick) {
                    return;
                }

                var targetInfo = this.findTarget(e.offsetX, e.offsetY);

                if (!targetInfo) {
                    return;
                }

                var node = targetInfo.node;
                if (node.getLayout().isLeafRoot) {
                    this._rootToNode(targetInfo);
                }
                else {
                    if (nodeClick === 'zoomToNode') {
                        this._zoomToNode(targetInfo);
                    }
                    else if (nodeClick === 'link') {
                        var itemModel = node.hostTree.data.getItemModel(node.dataIndex);
                        var link = itemModel.get('link', true);
                        var linkTarget = itemModel.get('target', true) || 'blank';
                        link && window.open(link, linkTarget);
                    }
                }

            }, this);
        },
        
        /**
         * @private
         */
        _renderScroller: function (seriesModel, ecModel, api, layoutInfo) {
            var dataZoomModels = seriesModel.dataZoom;
            var containerGroup = this._containerGroup;
            var dataZoomViews = this._dataZoomViews;

            if(!seriesModel.get("dataZoomEnabled")) {
                return;
            }

            zrUtil.each(dataZoomModels, function(dataZoomModel, index){
                var DataZoom = ComponentView.getClass('wellLogging', 'dataZoom');
                var dataZoomView = dataZoomViews[index] || (dataZoomViews[index] = new DataZoom());
                dataZoomView.init(ecModel, api);
                dataZoomView.render(dataZoomModel, ecModel, seriesModel, api);

                containerGroup.add(dataZoomView.group);
            });
        },

        /**
         * @override
         */
        remove: function () {
            this._clearController();
            this._containerGroup && this._containerGroup.removeAll();
            this._storage = createStorage();
            this._state = 'ready';
            this._breadcrumb && this._breadcrumb.remove();
        },

        dispose: function () {
            this._clearController();
        },

        /**
         * @private
         */
        _zoomToNode: function (targetInfo) {
            this.api.dispatchAction({
                type: 'treemapZoomToNode',
                from: this.uid,
                seriesId: this.seriesModel.id,
                targetNode: targetInfo.node
            });
        },

        /**
         * @private
         */
        _rootToNode: function (targetInfo) {
            this.api.dispatchAction({
                type: 'treemapRootToNode',
                from: this.uid,
                seriesId: this.seriesModel.id,
                targetNode: targetInfo.node
            });
        },

        /**
         * @public
         * @param {number} x Global coord x.
         * @param {number} y Global coord y.
         * @return {Object} info If not found, return undefined;
         * @return {number} info.node Target node.
         * @return {number} info.offsetX x refer to target node.
         * @return {number} info.offsetY y refer to target node.
         */
        findTarget: function (x, y) {
            var targetInfo;
            var viewRoot = this.seriesModel.getViewRoot();

            viewRoot.eachNode({attr: 'viewChildren', order: 'preorder'}, function (node) {
                var bgEl = this._storage.background[node.getRawIndex()];
                // If invisible, there might be no element.
                if (bgEl) {
                    var point = bgEl.transformCoordToLocal(x, y);
                    var shape = bgEl.shape;

                    // For performance consideration, dont use 'getBoundingRect'.
                    if (shape.x <= point[0]
                        && point[0] <= shape.x + shape.width
                        && shape.y <= point[1]
                        && point[1] <= shape.y + shape.height
                    ) {
                        targetInfo = {node: node, offsetX: point[0], offsetY: point[1]};
                    }
                    else {
                        return false; // Suppress visit subtree.
                    }
                }
            }, this);

            return targetInfo;
        }

    });

    /**
     * @inner
     */
    function createStorage() {
        return {nodeGroup: [], background: [], content: []};
    }

    /**
     * @inner
     * @return Return undefined means do not travel further.
     */
    function renderNode(
        seriesModel, thisStorage, oldStorage, reRoot,
        lastsForAnimation, willInvisibleEls,
        thisNode, oldNode, parentGroup, depth, api, payload
    ) {
        // Whether under viewRoot.
        if (!thisNode) {
            // Deleting nodes will be performed finally. This method just find
            // element from old storage, or create new element, set them to new
            // storage, and set styles.
            return;
        }

        var ecModel = seriesModel.ecModel;
        var thisLayout = thisNode.getLayout();

        if (!thisLayout) {
            return;
        }

        var thisWidth = thisLayout.width;
        var thisHeight = thisLayout.height;
        var thisInvisible = thisLayout.invisible;

        var thisRawIndex = thisNode.getRawIndex();
        var oldRawIndex = oldNode && oldNode.getRawIndex();

        var root = seriesModel.getData().tree.root;
        var nodeModel = thisNode.getModel();
        var nodeType = nodeModel.get('type') || "track";
        var thisViewChildren = thisNode.viewChildren;

        var group;
        //根节点
        if(root == thisNode){
            // Node group
            group = giveGraphic('nodeGroup', seriesModel, thisNode);

            if (!group) {
                return;
            }

            parentGroup.add(group.titleGroup);
            parentGroup.add(group.headerGroup);
            parentGroup.add(group.contentGroup);
            // x,y are not set when el is above view root.
        }
        else if(nodeType == "track"){
            // Node group
            group = giveGraphic('nodeGroup', seriesModel, thisNode);

            if (!group) {
                return;
            }

            parentGroup.addTrack(group);
        }

        // No children, render content.
        else{
            var content = giveGraphic('content', seriesModel, thisNode);
            parentGroup.addElement(content);
        }

        return group;

        // ----------------------------
        // | Procedures in renderNode |
        // ----------------------------

        function renderContent(group) {
            // For tooltip.
            content.dataIndex = thisNode.dataIndex;
            content.seriesIndex = seriesModel.seriesIndex;

            var borderWidth = thisLayout.borderWidth;
            var contentWidth = Math.max(thisWidth - 2 * borderWidth, 0);
            var contentHeight = Math.max(thisHeight - 2 * borderWidth, 0);

            content.culling = true;
            content.setShape({
                x: borderWidth,
                y: borderWidth,
                width: contentWidth,
                height: contentHeight
            });

            var visualColor = thisNode.getVisual('color', true);
            updateStyle(content, function () {
                var normalStyle = {fill: visualColor};
                var emphasisStyle = thisNode.getModel('itemStyle.emphasis').getItemStyle();

                content.setStyle(normalStyle);
                graphic.setHoverStyle(content, emphasisStyle);
            });

            group.add(content);
        }

        function updateStyle(element, cb) {
            if (!thisInvisible) {
                // If invisible, do not set visual, otherwise the element will
                // change immediately before animation. We think it is OK to
                // remain its origin color when moving out of the view window.
                cb();

                if (!element.__tmWillVisible) {
                    element.invisible = false;
                }
            }
            else {
                // Delay invisible setting utill animation finished,
                // avoid element vanish suddenly before animation.
                !element.invisible && willInvisibleEls.push(element);
            }
        }

        function giveGraphic(storageName, seriesModel, thisNode) {
            var element = oldRawIndex != null && oldStorage[storageName][oldRawIndex];
            var lasts = lastsForAnimation[storageName];

            if (element) {
                // Remove from oldStorage
                oldStorage[storageName][oldRawIndex] = null;
                // if(thisNode._dirty){
                    element.updateData(thisNode);
                    thisNode._dirty = false;
                // }
                // element.updateData(thisNode);
            }
            // If invisible and no old element, do not create new element (for optimizing).
            else if (!thisInvisible) {
                var Clazz = ComponentView.getClass('wellLogging', thisNode.getModel().get('type'));
                if (Clazz) {
                    element = new Clazz();
                    element.init(seriesModel, thisNode, api);
                    element.__tmDepth = depth;
                    element.__tmStorageName = storageName;
                    thisNode._dirty = false;
                }
            }

            // Set to thisStorage
            return (thisStorage[storageName][thisRawIndex] = element);
        }
    }

    // We can not set all backgroud with the same z, Because the behaviour of
    // drill down and roll up differ background creation sequence from tree
    // hierarchy sequence, which cause that lowser background element overlap
    // upper ones. So we calculate z based on depth.
    // Moreover, we try to shrink down z interval to [0, 1] to avoid that
    // treemap with large z overlaps other components.
    function calculateZ(depth, zInLevel) {
        var zb = depth * Z_BASE + zInLevel;
        return (zb - 1) / zb;
    }

});