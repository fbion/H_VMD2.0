//Vmd.Loader.setConfig({
//    enabled: true,
//    disableCaching:false,
//    paths: { //'类名前缀':'所在路径'  
//        'hwchart': '/hwcharts/js',
//        'hwcharts': '/hwcharts/js/hwcharts.js'
//    }
//});
(function () {
    var __CreateJSPath = function (js) {
        var scripts = document.getElementsByTagName("script");
        var path = "";
        for (var i = 0, l = scripts.length; i < l; i++) {
            var src = scripts[i].src;
            if (src.indexOf(js) != -1) {
                var ss = src.split(js);
                path = ss[0];
                break;
            }
        }
        var href = location.href;
        href = href.split("#")[0];
        href = href.split("?")[0];
        var ss = href.split("/");
        ss.length = ss.length - 1;
        href = ss.join("/");
        if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
            path = href + "/" + path;
        }
        return path;
    }

    hwchartsPATH = __CreateJSPath("base-ext.js");
})()

hwchartsPATH = hwchartsPATH.replace('js/core/', '');
Vmd.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        //'类名前缀':'所在路径'  
        'hwchart': hwchartsPATH + 'js',
        'hwcharts': hwchartsPATH + 'js/hwcharts.js'
    }
});