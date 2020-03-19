Vmd.define('hwchart.component.dataZoom.typeDefaulter', {
    requires:['hwchart.model.Component']
}, function () {
    var ComponentModel = hwchart.model.Component;

    ComponentModel.registerSubTypeDefaulter('dataZoom', function (option) {
        // Default 'slider' when no type specified.
        return 'slider';
    });
}) 