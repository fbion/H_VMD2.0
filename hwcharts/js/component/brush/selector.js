Vmd.define('hwchart.component.brush.selector', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.component.helper.polygon'
    ]

}, function () {

   

    var polygonContain = hwchart.component.helper.polygon;

    var BoundingRect = zrender.BoundingRect;

    var _graphic = hwchart.util.graphic;

    var linePolygonIntersect = _graphic.linePolygonIntersect;

    
    // Key of the first level is brushType: `line`, `rect`, `polygon`.
    // Key of the second level is chart element type: `point`, `rect`.
    // See moudule:hwcharts/component/helper/BrushController
    // function param:
    //      {Object} itemLayout fetch from data.getItemLayout(dataIndex)
    //      {Object} selectors {point: selector, rect: selector, ...}
    //      {Object} area {range: [[], [], ..], boudingRect}
    // function return:
    //      {boolean} Whether in the given brush.
    var selector = {
        lineX: getLineSelectors(0),
        lineY: getLineSelectors(1),
        rect: {
            point: function (itemLayout, selectors, area) {
                return itemLayout && area.boundingRect.contain(itemLayout[0], itemLayout[1]);
            },
            rect: function (itemLayout, selectors, area) {
                return itemLayout && area.boundingRect.intersect(itemLayout);
            }
        },
        polygon: {
            point: function (itemLayout, selectors, area) {
                return itemLayout && area.boundingRect.contain(itemLayout[0], itemLayout[1]) && polygonContain.contain(area.range, itemLayout[0], itemLayout[1]);
            },
            rect: function (itemLayout, selectors, area) {
                var points = area.range;

                if (!itemLayout || points.length <= 1) {
                    return false;
                }

                var x = itemLayout.x;
                var y = itemLayout.y;
                var width = itemLayout.width;
                var height = itemLayout.height;
                var p = points[0];

                if (polygonContain.contain(points, x, y) || polygonContain.contain(points, x + width, y) || polygonContain.contain(points, x, y + height) || polygonContain.contain(points, x + width, y + height) || BoundingRect.create(itemLayout).contain(p[0], p[1]) || linePolygonIntersect(x, y, x + width, y, points) || linePolygonIntersect(x, y, x, y + height, points) || linePolygonIntersect(x + width, y, x + width, y + height, points) || linePolygonIntersect(x, y + height, x + width, y + height, points)) {
                    return true;
                }
            }
        }
    };

    function getLineSelectors(xyIndex) {
        var xy = ['x', 'y'];
        var wh = ['width', 'height'];
        return {
            point: function (itemLayout, selectors, area) {
                if (itemLayout) {
                    var range = area.range;
                    var p = itemLayout[xyIndex];
                    return inLineRange(p, range);
                }
            },
            rect: function (itemLayout, selectors, area) {
                if (itemLayout) {
                    var range = area.range;
                    var layoutRange = [itemLayout[xy[xyIndex]], itemLayout[xy[xyIndex]] + itemLayout[wh[xyIndex]]];
                    layoutRange[1] < layoutRange[0] && layoutRange.reverse();
                    return inLineRange(layoutRange[0], range) || inLineRange(layoutRange[1], range) || inLineRange(range[0], layoutRange) || inLineRange(range[1], layoutRange);
                }
            }
        };
    }

    function inLineRange(p, range) {
        return range[0] <= p && p <= range[1];
    }

   

    hwchart.component.brush.selector = selector;

})