Vmd.define('hwchart.component.helper.listComponent', {
    requires: [
        'hwchart.util.layout',
        'hwchart.util.format',
        'hwchart.util.graphic'
    ]
}, function () {
    // List layout
   

    var _layout = hwchart.util.layout;

    var getLayoutRect = _layout.getLayoutRect;
    var layoutBox = _layout.box;
    var positionElement = _layout.positionElement;

    var formatUtil = hwchart.util.format;

    var graphic = hwchart.util.graphic;

  

    /**
     * Layout list like component.
     * It will box layout each items in group of component and then position the whole group in the viewport
     * @param {module:zrender/group/Group} group
     * @param {module:hwcharts/model/Component} componentModel
     * @param {module:hwcharts/ExtensionAPI}
     */
    function layout(group, componentModel, api) {
        var boxLayoutParams = componentModel.getBoxLayoutParams();
        var padding = componentModel.get('padding');
        var viewportSize = {
            width: api.getWidth(),
            height: api.getHeight()
        };
        var rect = getLayoutRect(boxLayoutParams, viewportSize, padding);
        layoutBox(componentModel.get('orient'), group, componentModel.get('itemGap'), rect.width, rect.height);
        positionElement(group, boxLayoutParams, viewportSize, padding);
    }

    function makeBackground(rect, componentModel) {
        var padding = formatUtil.normalizeCssArray(componentModel.get('padding'));
        var style = componentModel.getItemStyle(['color', 'opacity']);
        style.fill = componentModel.get('backgroundColor');
        var rect = new graphic.Rect({
            shape: {
                x: rect.x - padding[3],
                y: rect.y - padding[0],
                width: rect.width + padding[1] + padding[3],
                height: rect.height + padding[0] + padding[2],
                r: componentModel.get('borderRadius')
            },
            style: style,
            silent: true,
            z2: -1
        }); // FIXME
        // `subPixelOptimizeRect` may bring some gap between edge of viewpart
        // and background rect when setting like `left: 0`, `top: 0`.
        // graphic.subPixelOptimizeRect(rect);

        return rect;
    }
    var exports = {};
    exports.layout = layout;
    exports.makeBackground = makeBackground;

    hwchart.component.helper.listComponent = exports;
})