Vmd.define('hwchart.ExtensionAPI', {
    constructor: function (chartInstance) {
        var me = this;
        var hwchartsAPIList = [
        'getDom', 'getZr', 'getWidth', 'getHeight', 'dispatchAction', 'isDisposed',
        'on', 'off', 'getDataURL', 'getConnectedDataURL', 'getModel', 'getOption', 'getChart'
        ];
        zrender.util.each(hwchartsAPIList, function (name) {
            this[name] = zrender.util.bind(chartInstance[name], chartInstance);
        }, this);
    }

})

