/**
 *
 * Author: Torstein H?nsi
 * License: MIT License
 * Last revision: 2013-02-14
 * Requires: HWcharts 3.0+
 *
 * Usage: Set draggable:true and floating:true in the legend options. The legend
 * preserves is alignment after dragging. For example if it is aligned to the right,
 * if will keep the same distance to the right edge even after chart resize or
 * when exporting to a different size.
 */


(function (H) {
    var Pointer = H.Pointer,
        Chart = H.Chart;

    //添加右击事件
    H.wrap(Pointer.prototype, 'setDOMEvents', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var pointer = this,
            container = pointer.chart.container;

        container.oncontextmenu = function (e) {
            pointer.onContainerContextMenu(e);
            return false;
        };
    });

    //重写容器的点击事件，当点击容器时右键菜单消失
    H.wrap(Pointer.prototype, 'onContainerClick', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        var pointer = this,
            chart = pointer.chart;

        chart.HideContextMenu();
    });

    //添加鼠标右键事件
    Pointer.prototype.onContainerContextMenu = Pointer.prototype.onContainerContextMenu || function (e) {};
    H.wrap(Pointer.prototype, 'onContainerContextMenu', function (proceed, e) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var chart = this.chart,
            options = chart.options,
            optionsChart = options.chart,
            dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            dhxContextMenu_Point = chart.dhxContextMenu_Point;

        getDhtmlxWindow();
        if(_isTopWindow){
            chart.dhxContextMenu_Edit = dhxContextMenu_Edit = chart.dhxContextMenu_Edit || new dhtmlXMenuObject();
            chart.dhxContextMenu_Point = dhxContextMenu_Point = chart.dhxContextMenu_Point || new dhtmlXMenuObject();
        }
        else{
            chart.dhxContextMenu_Edit = dhxContextMenu_Edit = chart.dhxContextMenu_Edit || new dhtmlxPopWindow.dhtmlXMenuObject();
            chart.dhxContextMenu_Point = dhxContextMenu_Point = chart.dhxContextMenu_Point || new dhtmlxPopWindow.dhtmlXMenuObject();
        }
        dhxContextMenu_Edit.renderAsContextMenu();
        dhxContextMenu_Point.renderAsContextMenu();
    });

    /**
     * 判断鼠标右键位置是否在点上
     * @param e
     * @returns {*}
     */
    Chart.prototype.onPoint = function(e){
        var chart = this,
            hoverSeries = chart.hoverSeries;
        var range = 8; //点的半径

        var points = (hoverSeries && hoverSeries.points) || [];
        for(var j = 0; j < points.length; j++){
            var p = points[j];
            if(Math.abs(p.plotX + chart.plotLeft - e.chartX) <= range && Math.abs(p.plotY + chart.plotTop - e.chartY) <= range){
                return p;
            }
        }
    }

    /**
     * 显示右键菜单
     * @param e
     * @param type
     * @constructor
     */
    Chart.prototype.ShowContextMenu = function(e, type){
        var chart = this,
            options = chart.options,
            optionsChart = options.chart,
            dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            dhxContextMenu_Point = chart.dhxContextMenu_Point;

        var offsetX = 0,
            offsetY = 0;
        //没有嵌入到iframe中
        getDhtmlxWindow();
        if(parentFrame){
            offsetX = $(parentFrame).offset().left;
            offsetY = $(parentFrame).offset().top;
        }
        chart.HideContextMenu();
        switch (type){
            case "edit":
                if(dhxContextMenu_Edit){
                    dhxContextMenu_Edit.showContextMenu(offsetX + e.clientX + ___getPageScroll()[0], offsetY + e.clientY + ___getPageScroll()[1]);
                }
                break;
            case "point":
                if(dhxContextMenu_Point){
                    dhxContextMenu_Point.showContextMenu(offsetX + e.clientX + ___getPageScroll()[0], offsetY + e.clientY + ___getPageScroll()[1]);
                }
                break;
            default :

        }
    };

    /**
     * 隐藏所有右键菜单
     * @param e
     * @param type
     * @constructor
     */
    Chart.prototype.HideContextMenu = function(){
        var chart = this,
            options = chart.options,
            optionsChart = options.chart,
            parentChart = optionsChart && optionsChart.parentChart,
            dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            dhxContextMenu_Point = chart.dhxContextMenu_Point;

        if(parentChart){
            var charts = parentChart.charts;
            for(var i = 0; i < charts.length; i++){
                dhxContextMenu_Edit = charts[i].dhxContextMenu_Edit;
                dhxContextMenu_Point = charts[i].dhxContextMenu_Point;
                //隐藏右键菜单
                if(dhxContextMenu_Edit){
                    dhxContextMenu_Edit.hide();
                }
                if(dhxContextMenu_Point){
                    dhxContextMenu_Point.hide();
                }
            }
        }
        else {
            //隐藏右键菜单
            if(dhxContextMenu_Edit){
                dhxContextMenu_Edit.hide();
            }
            if(dhxContextMenu_Point){
                dhxContextMenu_Point.hide();
            }
        }
    }
}(Highcharts));


(function (H) {
    var path = CreateJSPath("hwAPI.js", -1);

    var Chart = H.Chart,
        Pointer = H.Pointer,
        addEvent = H.addEvent,
        removeEvent = H.removeEvent,
        createElement = H.createElement,
        discardElement = H.discardElement,
        css = H.css,
        merge = H.merge,
        each = H.each,
        extend = H.extend,
        math = Math,
        mathMax = math.max,
        doc = document,
        win = window,
        isTouchDevice = H.isTouchDevice,
        M = 'M',
        L = 'L',
        DIV = 'div',
        HIDDEN = 'hidden',
        NONE = 'none',
        PREFIX = 'hwcharts-',
        ABSOLUTE = 'absolute',
        PX = 'px',
        UNDEFINED,
        symbols = H.Renderer.prototype.symbols,
        defaultOptions = H.getOptions(),
        buttonOffset;
//
//    defaultOptions.exporting = merge(defaultOptions.exporting, {
//        enabled: false,
//        isDownload: true,
//        imagePath: null,
//        width:2400
//    });

    H.wrap(Pointer.prototype, 'onContainerContextMenu', function (proceed,e) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        e = this.normalize(e);
        var chart = this.chart;

        addMenuItem(e, chart);
        if(chart.onPoint(e)){
            chart.ShowContextMenu(e, "point");
        }
        else{
            chart.ShowContextMenu(e, "edit");
        }
    });

    //在右键菜单中添加数据查看项
    function addMenuItem (e,chart){

        var dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            isExistFile = false,
            isExistExportImage = false;
        dhxContextMenu_Edit.forEachItem(function(itemId){
            if(itemId == "file"){
                isExistFile = true;
            }
            if(itemId == "save_image"){
                isExistExportImage = true;
            }
        });

        if(!isExistFile){
            dhxContextMenu_Edit.addNewChild(dhxContextMenu_Edit.topId, 0, "file", unescape("%u6587%u4EF6"));
        }

        if(!isExistExportImage){
            dhxContextMenu_Edit.addNewChild("file", 2,"save_image",unescape("%u56FE%u7247%u5BFC%u51FA"));

            //给右键菜单中数据查看添加事件
            dhxContextMenu_Edit.attachEvent("onClick", function(id, zoneId, cas){
                if(id == "save_image"){

                    var dhxSaveImageSetWindow = chart.dhxSaveImageSetWindow;
                    if(!dhxSaveImageSetWindow){
                        chart.initSaveImageSetWindow(e);
                    }
                    else {
                        dhxSaveImageSetWindow.bringToTop();
                        if(dhxSaveImageSetWindow.isHidden()){
                            if(chart._hoverFrame){
                                var dimension = dhxSaveImageSetWindow.getDimension();
                                chart._hoverFrame.css({top: e.clientY + "px", left: e.clientX + "px", width: dimension[0] + "px", height: dimension[1] + "px"})
                            }
                            dhxSaveImageSetWindow.setPosition(e.clientX, e.clientY);
                            dhxSaveImageSetWindow.show();
                        }
                    }
                }
            });
        }
    }

    function initFormComponent(chart, dhxSaveImageForm){
        var exportOptions = chart.options.exporting,
            isKeepRatio,
            parentChart = chart.options.chart.parentChart,
            widthInput = dhxSaveImageForm.getInput("width"),
            heightInput = dhxSaveImageForm.getInput("height"),
            nameInput = dhxSaveImageForm.getInput("name"),
            formatCombo = dhxSaveImageForm.getCombo("format");

        var cssWidth = chart.renderTo.style.width,
            cssHeight = chart.renderTo.style.height,
            sourceWidth = exportOptions.sourceWidth || chart.options.chart.width ||
                (/px$/.test(cssWidth) && parseInt(cssWidth, 10)) ||
                chart.renderTo.clientWidth ||   //没有显式设置div的width时(设置了min-width)获取clientWidth的值
                600,
            sourceHeight = exportOptions.sourceHeight || chart.options.chart.height ||
                (/px$/.test(cssHeight) && parseInt(cssHeight, 10)) ||
                chart.renderTo.clientHeight ||  //没有显式设置div的height时(设置了min-width)获取clientHeight的值
                400;

        if(exportOptions.height){
            isKeepRatio = false;
        }
        else {
            isKeepRatio = exportOptions.keepRatio === false ? false : true
        }
        if(parentChart){
            widthInput.value = parentChart.chartWidth;
            heightInput.value = parentChart.chartHeight;
            exportOptions.ratio = parentChart.chartWidth / parentChart.chartHeight;
            dhxSaveImageForm.disableItem("keep_ratio");
        }
        else{
            exportOptions.ratio = sourceWidth / sourceHeight;
            widthInput.value = exportOptions.width || sourceWidth;
            heightInput.value = exportOptions.height || parseInt(widthInput.value / exportOptions.ratio);
        }
        dhxSaveImageForm.setItemValue("keep_ratio", isKeepRatio);
        nameInput.value = exportOptions.filename || (chart.options.title && chart.options.title.text) || 'chart';

        exportOptions.histotyExportHeight = heightInput.value;
    }

    Chart.prototype.initSaveImageSetWindow = function (e) {
        var chart = this,
            parentChart = chart.options.chart.parentChart,
            dhxWindow = chart.dhxWindow,
            dhxSaveImageSetWindow = chart.dhxSaveImageSetWindow,
            dhxSaveImageForm = chart.dhxSaveImageForm;

        if (!dhxWindow) {
            if(_isTopWindow){
                chart.dhxWindow = dhxWindow = new dhtmlXWindows();
            }
            else{
                chart.dhxWindow = dhxWindow = new dhtmlxPopWindow.dhtmlXWindows();
                //dhxWindow.attachViewportTo(window.parent.document.body);
            }
            dhxWindow.vp.style.overflow = "auto";
        }

        if(chart.options.chart && chart.options.chart.propertypIframe ) {
            if(!chart._hoverFrame){
                chart._hoverFrame = $("<iframe style='position: absolute; display: block; border: 0px solid #FFFFFF;'>");
                $("body").append(chart._hoverFrame);
            }
            else{
                chart._hoverFrame.css({display: 'block'});
            }
        }

        if (!dhxSaveImageSetWindow) {
            var windowWidth = 355,
                windowHeight = 250,
                buttonOffsetLeft = 132;

            var _browser = getBrowserType();
            if(_browser.chrome){
            }
            else if(_browser.firefox){
            }
            else if(_browser.ie || _isIE){
                switch (getIEDocumentMode()){
                    case 5:
//                        windowWidth = 340;
//                        windowHeight = 250;
                        break;
                    case 6:
//                        windowWidth = 340;
//                        windowHeight = 250;
                        break;
                    case 7:
//                        windowWidth = 340;
//                        windowHeight = 250;
                        break;
                    case 8:
//                        windowWidth = 340;
//                        windowHeight = 250;
                        break;
                    case 9:
//                        windowWidth = 340;
//                        windowHeight = 250;
                        break;
                    case 10:
//                        windowWidth = 340;
//                        windowHeight = 250;
                        break;
                    case 11:
                        break;
                }
            }
            else if(_browser.safari){
            }
            else if(_browser.opera){
            }
            chart.dhxSaveImageSetWindow = dhxSaveImageSetWindow = dhxWindow.createWindow("saveImageSetWindow", e.clientX, e.clientY, windowWidth, windowHeight);
            if(chart._hoverFrame){
                chart._hoverFrame.css({top: e.clientY + "px", left: e.clientX + "px", width: windowWidth + "px", height: windowHeight + "px"});
            }
            else{
                dhxSaveImageSetWindow.centerOnScreen();
            }
            dhxSaveImageSetWindow.setText(unescape("%u4FDD%u5B58%u56FE%u7247"));
            dhxSaveImageSetWindow.denyResize();
            dhxSaveImageSetWindow.attachEvent("onClose", function (win) {
                if(chart._hoverFrame){
                    chart._hoverFrame.css({display: 'none'});
                }
                win.hide();
            });
            dhxSaveImageSetWindow.attachEvent("onMoveFinish", function(win){
                if(chart._hoverFrame){
                    var position = win.getPosition();
                    chart._hoverFrame.css({top: position[1] + "px", left: position[0] + "px"});
                }
            });
            dhxSaveImageSetWindow.attachEvent("onShow", function (win) {
                if(chart._hoverFrame){
                    chart._hoverFrame.css({display: 'block'});
                }
                initFormComponent(chart, dhxSaveImageForm);
            });

            dhxSaveImageForm = chart.dhxSaveImageForm = dhxSaveImageSetWindow.attachForm([

                {type: "block", width: 330, blockOffset:5,offsetTop: 10, list:[

                    {type: "fieldset", label: unescape("%u5927%u5C0F"), width:288, offsetLeft:10, offsetTop :2, list:[
                        {type: "block",  width: 260, blockOffset: 0, list: [
                            {type: "input", name: "width",labelWidth:36, labelHeight:18, width: 80,offsetLeft:0,offsetTop: 5,  position:"label-left", label: unescape("%u5BBD%u5EA6%3A"), value: "1"},
                            {type: "newcolumn"},
                            {type:"label", label: unescape("%u50CF%u7D20")}
                        ]},
                        {type: "block",  width: 260, blockOffset: 0, list: [
                            {type: "input", name: "height",labelWidth:36, labelHeight:18, width: 80,offsetLeft:0, offsetTop: 5,  position:"label-left", label: unescape("%u9AD8%u5EA6%3A"), value: "1"},
                            {type: "newcolumn"},
                            {type:"label", label: unescape("%u50CF%u7D20")},
                            {type: "newcolumn"},
                            {type: "checkbox",position:"label-right", name:"keep_ratio", width:50, offsetLeft:5,offsetTop: 5, labelHeight:20, labelWidth:60, label: unescape("%u4FDD%u6301%u539F%u6BD4%u4F8B")}
                        ]}
                    ]}
                ]},
                {type: "block", width: 345, blockOffset:20, offsetTop: 10, list:[
                    {type: "input", name: "name",labelWidth:60, labelHeight:18, width: 80, offsetLeft:0,  position:"label-left", label: unescape("%u56FE%u7247%u540D%u79F0%3A"), value: "chart"},
                    {type: "newcolumn"},
                    {type: "combo", position:"label-left", name: "format",offsetLeft:5, label: unescape("%u5BFC%u51FA%u683C%u5F0F%3A"), inputHeight:50, inputWidth:80,
                        options:[
                            {value: "image/png", text: "PNG", selected: true},
                            {value: "image/jpeg", text: "JPG"},
                            {value: "application/pdf", text: "PDF"},
                            {value: "image/svg+xml", text: "SVG"}
                        ]}
                ]},
                {type: "block", offsetLeft: buttonOffsetLeft, list: [
                    {type: "button", width: 30, name: "confirm", value: unescape("%u786E%u5B9A"), offsetTop: 10, offsetLeft: 10},
                    {type: "newcolumn"},
                    {type: "button", width: 30, name: "cancel", value: unescape("%u53D6%u6D88"), offsetTop: 10, offsetLeft: 10}
                ]}
            ]);

            initFormComponent(chart,dhxSaveImageForm);

            dhxSaveImageForm.attachEvent("onChange", function (name, value){
                var exportOptions = chart.options.exporting || {},
                    widthInput = dhxSaveImageForm.getInput("width"),
                    heightInput = dhxSaveImageForm.getInput("height");
                switch(name) {
                    case "keep_ratio":
                        exportOptions.keepRatio = dhxSaveImageForm.isItemChecked("keep_ratio");
                        var oldHeightValue = heightInput.value;
                        if(exportOptions.keepRatio){
                            heightInput.value = parseInt(widthInput.value / exportOptions.ratio);
                        }
                        else{
                            heightInput.value = exportOptions.histotyExportHeight;
                        }
                        break;
                    case "width":
                        if(dhxSaveImageForm.isItemChecked("keep_ratio")){
                            heightInput.value = parseInt(widthInput.value / exportOptions.ratio);
                        }
                        break;
                    case "height":
                        if(dhxSaveImageForm.isItemChecked("keep_ratio")){
                            widthInput.value = parseInt(heightInput.value * exportOptions.ratio);
                        }
                        break;
                }
            });

            dhxSaveImageForm.attachEvent("onInputChange", function (name, value){
                var exportOptions = chart.options.exporting || {},
                    widthInput = dhxSaveImageForm.getInput("width"),
                    heightInput = dhxSaveImageForm.getInput("height");
                switch(name) {
                    case "width":
                        if(dhxSaveImageForm.isItemChecked("keep_ratio")){
                            heightInput.value = parseInt(value / exportOptions.ratio);
                        }
                        break;
                    case "height":
                        if(dhxSaveImageForm.isItemChecked("keep_ratio")){
                            widthInput.value = parseInt(value * exportOptions.ratio);
                        }
                        break;
                }
            });

            dhxSaveImageForm.attachEvent("onButtonClick", function (name) {
                if (name == "confirm") {
                    if(chart._hoverFrame){
                        chart._hoverFrame.css({display: 'none'});
                    }
                    var widthInputValue = dhxSaveImageForm.getInput("width").value,
                        heightInputValue = dhxSaveImageForm.getInput("height").value,
                        isKeepRatio = dhxSaveImageForm.isItemChecked("keep_ratio"),
                        nameInputValue = dhxSaveImageForm.getInput("name").value,
                        formatCombo = dhxSaveImageForm.getCombo("format"),
                        formatValue = formatCombo.getSelectedValue();


                    var exportOptions = {
                        type: formatValue,
                        filename: nameInputValue
                    };
                    if(isKeepRatio){
                        exportOptions.width = parseInt(widthInputValue);
                    }
                    else{
                        exportOptions.width = parseInt(widthInputValue);
                        exportOptions.sourceWidth = parseInt(widthInputValue);
                        exportOptions.sourceHeight = parseInt(heightInputValue);
                    }
                    chart._exportChart(exportOptions,merge(chart.options, chart.options.userExportOptions));
                    exportOptions.histotyExportHeight = parseInt(heightInputValue);
                    dhxSaveImageSetWindow.hide();
                }
                else if (name == "cancel") {
                    if(chart._hoverFrame){
                        chart._hoverFrame.css({display: 'none'});
                    }
                    dhxSaveImageSetWindow.hide();
                }
            });
        }
    }

    //导出方法，加入一些传入后台的导出属性，如保存到服务器端的路径，是否下载等
    Chart.prototype._exportChart = function (options, chartOptions) {
        options = options || {};
        chartOptions = chartOptions || this.options;

        var chart = this,
            parentChart = chartOptions.chart.parentChart,
            chartExportingOptions = chartOptions.exporting,
            isDownload = chartExportingOptions.isDownload === undefined ? true : chartExportingOptions.isDownload,
            imagePath = chartExportingOptions.imagePath,
            cssWidth,
            cssHeight,
            svg;

        cssWidth = chart.renderTo.style.width;
        cssHeight = chart.renderTo.style.height;

        chartOptions.exporting.sourceWidth = chartOptions.exporting.sourceWidth ||
            chartOptions.chart.width ||
            (/px$/.test(cssWidth) && parseInt(cssWidth, 10)) ||
            chart.renderTo.clientWidth ||   //没有显式设置div的width时(设置了min-width)获取clientWidth的值
            600;
        chartOptions.exporting.sourceHeight = chartOptions.exporting.sourceHeight ||
            chartOptions.chart.height ||
            (/px$/.test(cssHeight) && parseInt(cssHeight, 10)) ||
            chart.renderTo.clientHeight ||  //没有显式设置div的height时(设置了min-width)获取clientHeight的值
            400;

        if(parentChart){
            svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"" + parentChart.chartWidth + "\" height=\"" + parentChart.chartHeight + "\">";
            svg += '<rect fill="'+ H.Color(parentChart.options.backgroundColor).setOpacity(parentChart.options.backgroundOpacity).get()+'" x="0" y="0" width="' + parentChart.chartWidth + '" height="' + parentChart.chartHeight + '" fill-opacity="'+parentChart.options.backgroundOpacity+'"></rect>'
            for (var i = 0; i < parentChart.charts.length; i++) {
                var x = parentChart.charts[i].options.chart.x;
                var y = parentChart.charts[i].options.chart.y;
                var tmp = "<g transform=\"translate(" + x + "," + y + ")\">";
                tmp += parentChart.charts[i].getSVG()
                    .replace(/<svg[^>]*>/, "")
                    .replace("</svg>", "");
                tmp += "</g>";
                svg += tmp;
            }
            svg += "</svg>"
        }
        else{
            svg = chart.getSVG(merge(
                { chart: { borderRadius: 0 } },
                chartExportingOptions.chartOptions,
                chartOptions,
                {
                    exporting: {
                        sourceWidth: options.sourceWidth || chartExportingOptions.sourceWidth,
                        sourceHeight: options.sourceHeight || chartExportingOptions.sourceHeight
                    }
                }
            ));
        }

        //将svg字符串中的“<>”替换掉，防止出现“从客户端(svg=\"<svg xmlns:xlink=\"ht...\")中检测到有潜在危险的 Request.Form 值”错误
        svg = svg.replace(/<br>/g, "<br/>")
            .replace(/<BR>/g, "<BR/>")
            .replace(/</g, "&lt;")
            .replace(/>/g,"&gt;");

        //对svg字符串进行编码
        svg = escape(svg);

        // merge the options
        options = merge(chart.options.exporting, options);

        if(isDownload){
            // do the post
            H.post(options.url, {
                filename: (options.filename || 'chart').replace(/[ ]/g,""),
                isdownload:isDownload,
                imagePath: imagePath,
                type: options.type,
                width: options.width || 0, // IE8 fails to post undefined correctly, so use 0
                scale: options.scale || 2,
                svg: svg
            }, options.formAttributes);
        }
        else{
            $.ajax({
                url: options.url,
                type: 'POST',
                data:{
                    filename: (options.filename || 'chart').replace(/[ ]/g, ""),
                    isdownload:isDownload,
                    imagePath: imagePath,
                    type: options.type,
                    width: options.width || options.sourceWidth,
                    height: options.height || options.sourceHeight,
                    svg: svg
                },
                dataType: 'text',
//                timeout: 5000,
                error: function (result) {
                    if(result.statusText == "timeout"){
                        alert(unescape("%u8BF7%u6C42%u8D85%u65F6%21"));
                    }
                },
                success: function(result){
                    if(window.save_image_success){
                        save_image_success(unescape(result));
                    }
                }

            });
        }
    };
}(Highcharts));