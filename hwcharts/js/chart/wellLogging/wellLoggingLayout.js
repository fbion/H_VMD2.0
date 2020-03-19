Vmd.define('hwchart.chart.wellLogging.wellLoggingLayout', {
    requires: [
        'hwchart.util.layout',
        'hwchart.util.number',
        'hwchart.chart.wellLogging.helper',

        'hwchart.chart.helper.createRenderPlanner'
    ]
}, function () {
    var _util = zrender.util;
    var layout = hwchart.util.layout;
    var numberUtil = hwchart.util.number;
    var helper = hwchart.chart.wellLogging.helper;
    var BoundingRect = zrender.BoundingRect;
    var mathMax = Math.max;
    var mathMin = Math.min;
    var parsePercent = numberUtil.parsePercent;
    var retrieveValue = _util.retrieve;
    var each = _util.each;

    var layoutFunc = {};

    var createRenderPlanner = hwchart.chart.helper.createRenderPlanner;

    var _default = {
        seriesType: 'wellLogging',
        plan: createRenderPlanner(),
        reset: function (seriesModel, ecModel, api, payload) {

            var ecWidth = api.getWidth();
            var ecHeight = api.getHeight();
            var seriesOption = seriesModel.option;

            var layoutInfo = layout.getLayoutRect(
                seriesModel.getBoxLayoutParams(),
                {
                    width: api.getWidth(),
                    height: api.getHeight()
                }
            );

            var yAxis = seriesModel.getVAxis();
            var bodyHeight = seriesModel.getBodyHeight(api);
            yAxis.setExtent(0, bodyHeight);

            var size = seriesOption.size || []; // Compatible with ec2.
            var containerWidth = parsePercent(
                retrieveValue(layoutInfo.width, size[0]),
                ecWidth
            );
            var containerHeight = parsePercent(
                retrieveValue(layoutInfo.height, size[1]),
                ecHeight
            );

            // Fetch payload info.
            var payloadType = payload && payload.type;
            var targetInfo = helper.retrieveTargetInfo(payload, seriesModel);
            var rootRect = (payloadType === 'treemapRender' || payloadType === 'treemapMove')
                ? payload.rootRect : null;
            var viewRoot = seriesModel.getViewRoot();
            var viewAbovePath = helper.getPathToRoot(viewRoot);

            if (payloadType !== 'treemapMove') {
                var rootSize = payloadType === 'treemapZoomToNode'
                    ? estimateRootSize(
                    seriesModel, targetInfo, viewRoot, containerWidth, containerHeight
                )
                    : rootRect
                    ? [rootRect.width, rootRect.height]
                    : [containerWidth, containerHeight];

                // layout should be cleared because using updateView but not update.
                viewRoot.hostTree.clearLayouts();

                // TODO
                // optimize: if out of view clip, do not layout.
                // But take care that if do not render node out of view clip,
                // how to calculate start po
                var titleLayout = {
                    x: 0,
                    y: 0,
                    width: viewRoot.width,
                    height: viewRoot.titleHeight
                };
                var headerLayout = {
                    x: 0,
                    y: viewRoot.titleHeight,
                    width: viewRoot.width,
                    height: viewRoot.headerHeight
                };
                var bodyLayout = {
                    x: 0,
                    y: viewRoot.titleHeight + viewRoot.headerHeight,
                    width: viewRoot.width,
                    height: bodyHeight
                };
                var viewRootLayout = {
                    x: layoutInfo.x,
                    y: layoutInfo.y,
                    width: viewRoot.width,
                    height: bodyHeight + viewRoot.headerHeight + viewRoot.titleHeight,
                    title: titleLayout,
                    header: headerLayout,
                    body:bodyLayout
                };
                viewRoot.setLayout(viewRootLayout);

                calPosition(viewRoot, false, 0);
            }

            var treeRoot = seriesModel.getData().tree.root;

            treeRoot.setLayout(
                calculateRootPosition(layoutInfo, rootRect, targetInfo),
                true
            );

            seriesModel.setLayoutInfo(layoutInfo);

            // FIXME
            // 现在没有clip功能，暂时取ec高宽。
            // prunning(
            //     treeRoot,
            //     // Transform to base element coordinate system.
            //     new BoundingRect(-layoutInfo.x, -layoutInfo.y, ecWidth, ecHeight),
            //     viewAbovePath,
            //     viewRoot,
            //     0
            // );
            //测试

            viewRoot.eachNode(function(treeNode){
                var nodeModel = treeNode.getModel();
                var type = nodeModel.get('type');
                var data = layoutFunc[type].reset(treeNode);
                nodeModel.setData(data);
            })
            layoutFunc
        }
    };

    /**
     * Layout treemap with calPosition algorithm.
     * @see https://graphics.ethz.ch/teaching/scivis_common/Literature/squarifiedTreeMaps.pdf
     * @see https://github.com/mbostock/d3/blob/master/src/layout/treemap.js
     *
     * @protected
     * @param {module:echarts/data/Tree~TreeNode} node
     * @param {Object} options
     * @param {string} options.sort 'asc' or 'desc'
     * @param {number} options.squareRatio
     * @param {boolean} hideChildren
     * @param {number} depth
     */
    function calPosition(node, hideChildren, depth) {

        if (node.isRemoved()) {
            return;
        }
        var thisLayout = node.getLayout();
        var headerLayout = thisLayout.header;
        var bodyLayout = thisLayout.body;

        // Considering border and gap
        var nodeModel = node.getModel();

        var viewChildren = initChildren(
            node, nodeModel, hideChildren, depth
        );

        if (!viewChildren.length) {
            return;
        }

        var sumGroupWidth = 0;
        var maxGroupTitleHeight = 0;
        var maxGroupHeaderHeight = 0;
        var sumContentHeight = 0;

        for (var i = 0, len = viewChildren.length; i < len; i++) {
            var child = viewChildren[i];
            var childModel = child.getModel();
            var type = childModel.get('type');
            var nodeLayout = {}
            if(type == 'track'){
                nodeLayout.title = {
                    x: sumGroupWidth,
                    y: sumContentHeight,
                    width: child.width,
                    height: child.titleHeight
                }
                nodeLayout.header = {
                    x: sumGroupWidth,
                    y: sumContentHeight + child.titleHeight,
                    width: child.width,
                    height: child.headerHeight
                }
                nodeLayout.body = {
                    x: sumGroupWidth,
                    y: 0,
                    width: child.width,
                    height: bodyLayout.height
                }
                maxGroupHeaderHeight = Math.max(maxGroupHeaderHeight, child.headerHeight);
                maxGroupTitleHeight = Math.max(maxGroupTitleHeight, child.titleHeight);
                sumGroupWidth += child.width;
            }
            else {
                nodeLayout.header = {
                    x: 0,
                    y: sumContentHeight + (child.titleHeight || 0) + maxGroupHeaderHeight + maxGroupTitleHeight,
                    width: child.width,
                    height: child.headerHeight
                }
                nodeLayout.body = {
                    x: 0,
                    y: 0,
                    width: child.width,
                    height: bodyLayout.height
                }
                sumContentHeight += child.headerHeight;
            }

            child.setLayout(nodeLayout, true);

            var xAxis = childModel.coordinateSystem.getAxis('x');
            xAxis.setExtent(0, child.width);

        }

        for (var i = 0, len = viewChildren.length; i < len; i++) {
            calPosition(viewChildren[i], hideChildren, depth + 1);
        }
    }

    /**
     * Set area to each child, and calculate data extent for visual coding.
     */
    function initChildren(node, nodeModel, hideChildren, depth) {
        var viewChildren = node.children || [];

        // leafDepth has higher priority.
        if (hideChildren) {
            return (node.viewChildren = []);
        }

        // Sort children, order by desc.
        viewChildren = _util.filter(viewChildren, function (child) {
            return !child.isRemoved();
        });

        node.viewChildren = viewChildren;

        return viewChildren;
    }

    /**
     * Consider 'visibleMin'. Modify viewChildren and get new sum.
     */
    function filterByThreshold(nodeModel, totalArea, sum, orderBy, orderedChildren) {

        // visibleMin is not supported yet when no option.sort.
        if (!orderBy) {
            return sum;
        }

        var visibleMin = nodeModel.get('visibleMin');
        var len = orderedChildren.length;
        var deletePoint = len;

        // Always travel from little value to big value.
        for (var i = len - 1; i >= 0; i--) {
            var value = orderedChildren[
                orderBy === 'asc' ? len - i - 1 : i
                ].getValue();

            if (value / sum * totalArea < visibleMin) {
                deletePoint = i;
                sum -= value;
            }
        }

        orderBy === 'asc'
            ? orderedChildren.splice(0, len - deletePoint)
            : orderedChildren.splice(deletePoint, len - deletePoint);

        return sum;
    }

    /**
     * Statistic
     */
    function statistic(nodeModel, children, orderBy) {
        // Calculate sum.
        var sum = 0;
        for (var i = 0, len = children.length; i < len; i++) {
            sum += children[i].getValue();
        }

        // Statistic data extent for latter visual coding.
        // Notice: data extent should be calculate based on raw children
        // but not filtered view children, otherwise visual mapping will not
        // be stable when zoom (where children is filtered by visibleMin).

        var dimension = nodeModel.get('visualDimension');
        var dataExtent;

        // The same as area dimension.
        if (!children || !children.length) {
            dataExtent = [NaN, NaN];
        }
        else if (dimension === 'value' && orderBy) {
            dataExtent = [
                children[children.length - 1].getValue(),
                children[0].getValue()
            ];
            orderBy === 'asc' && dataExtent.reverse();
        }
        // Other dimension.
        else {
            var dataExtent = [Infinity, -Infinity];
            each(children, function (child) {
                var value = child.getValue(dimension);
                value < dataExtent[0] && (dataExtent[0] = value);
                value > dataExtent[1] && (dataExtent[1] = value);
            });
        }

        return {sum: sum, dataExtent: dataExtent};
    }

    /**
     * Computes the score for the specified row,
     * as the worst aspect ratio.
     */
    function worst(row, rowFixedLength, ratio) {
        var areaMax = 0;
        var areaMin = Infinity;

        for (var i = 0, area, len = row.length; i < len; i++) {
            area = row[i].getLayout().area;
            if (area) {
                area < areaMin && (areaMin = area);
                area > areaMax && (areaMax = area);
            }
        }

        var squareArea = row.area * row.area;
        var f = rowFixedLength * rowFixedLength * ratio;

        return squareArea
            ? mathMax(
            (f * areaMax) / squareArea,
            squareArea / (f * areaMin)
        )
            : Infinity;
    }

    // Return [containerWidth, containerHeight] as defualt.
    function estimateRootSize(seriesModel, targetInfo, viewRoot, containerWidth, containerHeight) {
        // If targetInfo.node exists, we zoom to the node,
        // so estimate whold width and heigth by target node.
        var currNode = (targetInfo || {}).node;
        var defaultSize = [containerWidth, containerHeight];

        if (!currNode || currNode === viewRoot) {
            return defaultSize;
        }

        var parent;
        var viewArea = containerWidth * containerHeight;
        var area = viewArea * seriesModel.option.zoomToNodeRatio;

        while (parent = currNode.parentNode) { // jshint ignore:line
            var sum = 0;
            var siblings = parent.children;

            for (var i = 0, len = siblings.length; i < len; i++) {
                sum += siblings[i].getValue();
            }
            var currNodeValue = currNode.getValue();
            if (currNodeValue === 0) {
                return defaultSize;
            }
            area *= sum / currNodeValue;

            var borderWidth = parent.getModel('itemStyle.normal').get('borderWidth');

            if (isFinite(borderWidth)) {
                // Considering border, suppose aspect ratio is 1.
                area += 4 * borderWidth * borderWidth + 4 * borderWidth * Math.pow(area, 0.5);
            }

            area > numberUtil.MAX_SAFE_INTEGER && (area = numberUtil.MAX_SAFE_INTEGER);

            currNode = parent;
        }

        area < viewArea && (area = viewArea);
        var scale = Math.pow(area / viewArea, 0.5);

        return [containerWidth * scale, containerHeight * scale];
    }

    // Root postion base on coord of containerGroup
    function calculateRootPosition(layoutInfo, rootRect, targetInfo) {
        if (rootRect) {
            layoutInfo.x = rootRect.x;
            layoutInfo.y = rootRect.y;
            return {x: rootRect.x, y: rootRect.y};
        }

        var defaultPosition = {x: layoutInfo.x, y: layoutInfo.y};
        if (!targetInfo) {
            return defaultPosition;
        }

        // If targetInfo is fetched by 'retrieveTargetInfo',
        // old tree and new tree are the same tree,
        // so the node still exists and we can visit it.

        var targetNode = targetInfo.node;
        var layout = targetNode.getLayout();

        if (!layout) {
            return defaultPosition;
        }

        // Transform coord from local to container.
        var targetCenter = [layout.width / 2, layout.height / 2];
        var node = targetNode;
        while (node) {
            var nodeLayout = node.getLayout();
            targetCenter[0] += nodeLayout.x;
            targetCenter[1] += nodeLayout.y;
            node = node.parentNode;
        }

        return {
            x: layoutInfo.width / 2 - targetCenter[0],
            y: layoutInfo.height / 2 - targetCenter[1]
        };
    }

    // Mark nodes visible for prunning when visual coding and rendering.
    // Prunning depends on layout and root position, so we have to do it after layout.
    function prunning(node, clipRect, viewAbovePath, viewRoot, depth) {
        var nodeLayout = node.getLayout();
        var nodeInViewAbovePath = viewAbovePath[depth];
        var isAboveViewRoot = nodeInViewAbovePath && nodeInViewAbovePath === node;

        if (
            (nodeInViewAbovePath && !isAboveViewRoot)
            || (depth === viewAbovePath.length && node !== viewRoot)
        ) {
            return;
        }

        node.setLayout({
            // isInView means: viewRoot sub tree + viewAbovePath
            isInView: true,
            // invisible only means: outside view clip so that the node can not
            // see but still layout for animation preparation but not render.
            invisible: !isAboveViewRoot && !clipRect.intersect(nodeLayout),
            isAboveViewRoot: isAboveViewRoot
        }, true);

        // Transform to child coordinate.
        var childClipRect = new BoundingRect(
            clipRect.x - nodeLayout.x,
            clipRect.y - nodeLayout.y,
            clipRect.width,
            clipRect.height
        );

        each(node.viewChildren || [], function (child) {
            prunning(child, childClipRect, viewAbovePath, viewRoot, depth + 1);
        });
    }
    
    hwcharts.registerWellLogLayout = function (layout) {
        layoutFunc[layout.type] = layout;
    };

    hwchart.chart.wellLogging.wellLoggingLayout = _default;
})
