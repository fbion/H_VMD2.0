Vmd.define('hwchart.model.mixin.makeStyleMapper', {
   
}, function () {
    var zrUtil = zrender.util;
    function _default(properties) {
        // Normalize
        for (var i = 0; i < properties.length; i++) {
            if (!properties[i][1]) {
                properties[i][1] = properties[i][0];
            }
        }

        return function (model, excludes, includes) {
            var style = {};

            for (var i = 0; i < properties.length; i++) {
                var propName = properties[i][1];

                if (excludes && zrUtil.indexOf(excludes, propName) >= 0 || includes && zrUtil.indexOf(includes, propName) < 0) {
                    continue;
                }

                var val = model.getShallow(propName);

                if (val != null) {
                    style[properties[i][0]] = val;
                }
            }

            return style;
        };
    }

    hwchart.model.mixin.makeStyleMapper = _default;
})