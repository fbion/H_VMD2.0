Vmd.define('hwchart.model.mixin.areaStyle', {
   
    requires: ['hwchart.model.mixin.makeStyleMapper']

}, function () {
    var makeStyleMapper = hwchart.model.mixin.makeStyleMapper;

    var getAreaStyle = makeStyleMapper([['fill', 'color'], ['shadowBlur'], ['shadowOffsetX'], ['shadowOffsetY'], ['opacity'], ['shadowColor']]);
    var _default = {
        getAreaStyle: function (excludes, includes) {
            return getAreaStyle(this, excludes, includes);
        }
    };
    hwchart.model.mixin.areaStyle = _default;
})