Vmd.define('hwchart.component.toolbox.feature.SaveAsImage', {
    requires: [
        'hwchart.component.toolbox.featureManager'
    ]
}, function () {
    var env = zrender.env;

    function SaveAsImage(model) {
        this.model = model;
    }

    SaveAsImage.defaultOption = {
        show: true,
        icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0',
        icon:'M819.8144 968.064 204.1856 968.064C119.8336 968.064 51.2 899.4816 51.2 815.104L51.2 208.9216c0-84.3776 68.6336-153.0112 152.9856-153.0112l615.6544 0C904.1664 55.936 972.8 124.544 972.8 208.9216L972.8 815.104C972.8 899.4816 904.192 968.064 819.8144 968.064L819.8144 968.064zM204.1856 115.6352c-51.456 0-93.312 41.8304-93.312 93.312L110.8736 815.104c0 51.456 41.856 93.3376 93.312 93.3376l615.6544 0c51.456 0 93.312-41.8816 93.312-93.3376L913.152 208.9216c0-51.4816-41.856-93.312-93.312-93.312L204.1856 115.6096 204.1856 115.6352zM807.04 513.4336 216.96 513.4336 216.96 55.936l590.1056 0L807.0656 513.4336 807.04 513.4336zM276.608 453.7344l470.784 0L747.392 115.6352l-470.784 0L276.608 453.7344 276.608 453.7344zM599.8592 203.4432l59.648 0 0 198.9376-59.648 0L599.8592 203.4432 599.8592 203.4432zM599.8592 203.4432',
        title: '保存为图片',
        type: 'png',
        // Default use option.backgroundColor
        // backgroundColor: '#fff',
        name: '',
        excludeComponents: ['toolbox'],
        pixelRatio: 1,
        lang: ['右键另存为图片']
    };

    SaveAsImage.prototype.unusable = !env.canvasSupported;

    var proto = SaveAsImage.prototype;

    proto.onclick = function (ecModel, api) {
        var model = this.model;
        var title = model.get('name') || ecModel.get('title.0.text') || 'hwcharts';
        var $a = document.createElement('a');
        var type = model.get('type', true) || 'png';
        $a.download = title + '.' + type;
        $a.target = '_blank';
        var url = api.getConnectedDataURL({
            type: type,
            backgroundColor: model.get('backgroundColor', true)
                || ecModel.get('backgroundColor') || '#fff',
            excludeComponents: model.get('excludeComponents'),
            pixelRatio: model.get('pixelRatio')
        });
        $a.href = url;
        // Chrome and Firefox
        if (typeof MouseEvent === 'function' && !env.browser.ie && !env.browser.edge) {
            var evt = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: false
            });
            $a.dispatchEvent(evt);
        }
            // IE
        else {
            var lang = model.get('lang');
            var html = ''
                + '<body style="margin:0;">'
                + '<img src="' + url + '" style="max-width:100%;" title="' + ((lang && lang[0]) || '') + '" />'
                + '</body>';
            var tab = window.open();
            tab.document.write(html);
        }
    };

    hwchart.component.toolbox.featureManager.register(
        'saveAsImage', SaveAsImage
    );

    hwchart.component.toolbox.feature.SaveAsImage = SaveAsImage;
})