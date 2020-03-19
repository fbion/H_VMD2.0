Vmd.define('hwchart.component.toolbox.featureManager', {
    requires: [ ]
}, function () {
    var features = {};

    hwchart.component.toolbox.featureManager = {
        register: function (name, ctor) {
            features[name] = ctor;
        },

        get: function (name) {
            return features[name];
        }
    };
})