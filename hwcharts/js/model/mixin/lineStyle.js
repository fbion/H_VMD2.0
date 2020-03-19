Vmd.define('hwchart.model.mixin.lineStyle', {
   
    requires: ['hwchart.model.mixin.makeStyleMapper']

}, function (lineStyle) {


    var makeStyleMapper = hwchart.model.mixin.makeStyleMapper;

   
    var getLineStyle = makeStyleMapper([['lineWidth', 'width'], ['stroke', 'color'], ['opacity'], ['shadowBlur'], ['shadowOffsetX'], ['shadowOffsetY'], ['shadowColor']]);
    var _default = {
        getLineStyle: function (excludes) {
            var style = getLineStyle(this, excludes); // Always set lineDash whether dashed, otherwise we can not
            // erase the previous style when assigning to el.style.

            style.lineDash = this.getLineDash(style.lineWidth);
            return style;
        },
        getLineDash: function (lineWidth) {
            if (lineWidth == null) {
                lineWidth = 1;
            }

            var lineType = this.get('type');
            var dotSize = Math.max(lineWidth, 2);
            var dashSize = lineWidth * 4;
            return lineType === 'solid' || lineType == null ? // Use `false` but not `null` for the solid line here, because `null` might be
            // ignored when assigning to `el.style`. e.g., when setting `lineStyle.type` as
            // `'dashed'` and `emphasis.lineStyle.type` as `'solid'` in graph series, the
            // `lineDash` gotten form the latter one is not able to erase that from the former
            // one if using `null` here according to the emhpsis strategy in `util/graphic.js`.
            false : lineType === 'dashed' ? [dashSize, dashSize] :null;
        }
    };
    hwchart.model.mixin.lineStyle = _default;
})