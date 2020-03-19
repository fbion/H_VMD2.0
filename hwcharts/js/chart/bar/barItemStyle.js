Vmd.define('hwchart.chart.bar.barItemStyle', {
    requires: [
        'hwchart.action.roamHelper',
        'hwchart.model.mixin.makeStyleMapper'
    ]

}, function () {
    var makeStyleMapper = hwchart.model.mixin.makeStyleMapper;
    var getBarItemStyle = makeStyleMapper([['fill', 'color'], ['stroke', 'borderColor'], ['lineWidth', 'borderWidth'], // Compatitable with 2
['stroke', 'barBorderColor'], ['lineWidth', 'barBorderWidth'], ['opacity'], ['shadowBlur'], ['shadowOffsetX'], ['shadowOffsetY'], ['shadowColor']]);
    var _default = {
        getBarItemStyle: function (excludes) {
            var style = getBarItemStyle(this, excludes);

            if (this.getBorderLineDash) {
                var lineDash = this.getBorderLineDash();
                lineDash && (style.lineDash = lineDash);
            }

            return style;
        }
    };
    hwchart.chart.bar.barItemStyle = _default;
})