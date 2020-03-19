/**
 * HWcharts plugin for dragging a legend by its title
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
    var Pointer = H.Pointer;

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
			debugger
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
    H.Chart.prototype.onPoint = function (e) {
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
    H.Chart.prototype.ShowContextMenu = function (e, type) {
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
    H.Chart.prototype.HideContextMenu = function () {
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

    var addEvent = H.addEvent,
        Pointer = H.Pointer;

        defaultOptions = H.getOptions();

    H.wrap(Pointer.prototype, 'onContainerContextMenu', function (proceed, e) {
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
    function addMenuItem(e, chart) {
        getDhtmlxWindow();

        var isExistFile = false,
            isExistSaveModel = false,
            isExistExportModel = false;
            isExistOpenModel = false;

        var dhxContextMenu_Edit = chart.dhxContextMenu_Edit;
        dhxContextMenu_Edit.forEachItem(function (itemId) {
            if (itemId == "file") {
                isExistFile = true;
            }
            if(itemId == "save_template"){
                isExistSaveModel = true;
            }
            if(itemId == "export_template"){
                isExistExportModel = true;
            }
            if (itemId == "open_template") {
                isExistOpenModel = true;
            }
        });

        if(!isExistFile){
            dhxContextMenu_Edit.addNewChild(dhxContextMenu_Edit.topId, 0, "file", unescape("%u6587%u4EF6"));
        }
        if (!isExistSaveModel) {
            dhxContextMenu_Edit.addNewChild("file", 3, "save_template", "保存模版");
        }
        if (!isExistExportModel) {
            dhxContextMenu_Edit.addNewChild("file", 4, "export_template", "下载模板");
        }
        if (!isExistOpenModel) {
            dhxContextMenu_Edit.addNewChild("file", 5, "open_template", "打开模板");
        }
        //给右键菜单中数据查看添加事件
        if(chart.eventID){
            dhxContextMenu_Edit.detachEvent(chart.eventID);
        }
        chart.eventID = dhxContextMenu_Edit.attachEvent("onClick", function (id, zoneId, cas) {
            if (id == "save_template") {
                chart.saveModel();
            }
            else if(id == "export_template"){
                chart.exportModel();
            }
            else if (id == "open_template") {
                chart.openModel();
            }
        });
    }

    H.Chart.prototype.saveModel = function () {
        var chart = this,
            parentChart = chart.options.chart.parentChart,
            jsonStr;

        var saveName;
        if(parentChart){
            parentChart.exportOptions = parentChart.options.exportOptions;
            var chartsOptions = [];
            for(var i = 0; i < parentChart.charts.length; i++){
                chartsOptions[i] = parentChart.charts[i].options.exportOptions;
                chart.jsonOut(chartsOptions[i]);
            }
            parentChart.exportOptions.charts = chartsOptions;
            saveName = parentChart.options.exporting && parentChart.options.exporting.saveName;
            jsonStr = JSON.stringify(parentChart.exportOptions);
        }
        else{
            chart.jsonOut(chart.options.exportOptions);
            saveName = chart.options.exporting && chart.options.exporting.saveName;
            jsonStr = JSON.stringify({modules:chart.options.modules, charts:[chart.options.exportOptions]});
        }

        var url = chart.options.exporting && chart.options.exporting.moduleExportUrl;
        if (!url) {
            url = path + "/ashx/TemplatesExport.ashx"
        }
        $.ajax({
            type: "POST",
            url: url,
            dataType: "text",
            data: "type=save&&savename=" + saveName + "&&json=" + jsonStr + "",
            success: function (result) {
                if( window.save_xml_success){
                    window.save_xml_success(result)
                }
            }
        });
    }

    H.Chart.prototype.exportModel = function () {
        var chart = this,
            parentChart = chart.options.chart.parentChart,
            jsonStr;

        if(parentChart){
            parentChart.exportOptions = parentChart.options.exportOptions;
            var chartsOptions = [];
            for(var i = 0; i < parentChart.charts.length; i++){
                chartsOptions[i] = parentChart.charts[i].options.exportOptions;
                chart.jsonOut(chartsOptions[i]);
            }
            parentChart.exportOptions.charts = chartsOptions;
            jsonStr = JSON.stringify(parentChart.exportOptions);
        }
        else{
            chart.jsonOut(chart.options.exportOptions);
            jsonStr = JSON.stringify({modules:chart.options.modules, charts:[chart.options.exportOptions]});
        }

        var url = chart.options.exporting && chart.options.exporting.moduleExportUrl;
        if (!url) {
            url = path + "/ashx/TemplatesExport.ashx"
        }

        var form = H.createElement('form', H.merge({
            method: 'post',
            action: url,
            enctype: 'multipart/form-data'
        }, null), {
            display: 'none'
        }, document.body);

        H.createElement('input', {
            type: "hidden",
            name: "type",
            value: "export"
        }, null, form);

        // add the data
        H.createElement('input', {
            type: "hidden",
            name: "json",
            value: jsonStr
        }, null, form);

        H.createElement('input', {
            type: "hidden",
            name: "fileName",
            value: "chart.xml"
        }, null, form);

        // submit
        form.submit();

        // clean up
        H.discardElement(form);
    }

    H.Chart.prototype.openModel = function () {
        var that = this;
        var exporting = that.options.exporting;
        var url = exporting && exporting.moduleExportUrl;
        if (!url) {
            url = path + "/ashx/TemplatesExport.ashx"
        }
        var uploaderDiv = document.createElement("div");
        var uploader = new dhtmlXFileUploader(uploaderDiv, this.baseUrl + "/js/uploader.swf", url, null, "enabled", "", "", "", false, "");
        uploader.enableTitleScreen(false);
        uploader.setURL(url);
        uploader.setIsWdk(false);
        uploader.setAutoStart(true);
        uploader.params = {
            type: "open",
            dataPath: exporting.dataPath || "",
            chartTitle: exporting.chartTitle,
            colSep: exporting.colSep,
            rowSep: exporting.rowSep,
            strFormats: exporting.strFormats,
            strFields: exporting.strFields,
            strData: exporting.strData
        };
        uploader.callEvent = function (evName, evData) {

            if (evName == "onFileAdd") {

            }
            if (evName == "onUploadFile") {
                var results = evData[0].split("#&#&");
                if (results[0] == "101") {
                    alert("数据错误！");
                }
                else {
                    if (results[0] != "") {
                        alert(results[0]);
                    }
                    var myOpt = eval('(' + results[1] + ')');
                    var chart = new Chart(myOpt, "m");
                    var container;
                    var container = (that.options.chart.parentChart && that.options.chart.parentChart.container) || that.options.chart.renderTo;
                    if(typeof container === "string"){
                        container = $("#" + container);
                    }
                    container.empty();
                    chart.ISetChartsRenderTo(container);
                    chart.IRefresh(function (c) {});
                }
            }
            if (evName == "onUploadFail") {
                alert("文件上传失败！");
            }
            return true;
        }
        uploader.buttons['browse'].click();
    }

    H.Chart.prototype.jsonOut = function (chart) {
        if (chart.chart) {
            if (chart.chart.renderTo) {
                chart.chart.renderTo = null;
                delete chart.chart.renderTo;
            }
            if (chart.chart.saveName) {
                chart.chart.saveName = null;
                delete chart.chart.saveName;
            }
        }

//        if (chart.title && chart.title.style) {
//            chart.title.style = merge({}, defaultLabelOptions.style, defaultOptions.title.style, chart.title.style)
//        }
//
//        if (chart.plotOptions && chart.plotOptions.series && chart.plotOptions.series.dataLabels && chart.plotOptions.series.dataLabels.style) {
//            chart.plotOptions.series.dataLabels.style = merge({}, defaultLabelOptions.style, chart.plotOptions.series.dataLabels.style)
//        }

        if (chart.chart) {
            if (chart.chart.backgroundEnabled == undefined) {
                chart.chart.backgroundEnabled = defaultOptions.chart.backgroundEnabled;
            }
            if (chart.chart.backgroundColor == undefined) {
                chart.chart.backgroundColor = defaultOptions.chart.backgroundColor;
            }
            if (chart.chart.backgroundOpacity == undefined) {
                chart.chart.backgroundOpacity = defaultOptions.chart.backgroundOpacity;
            }
            if (chart.chart.plotBackgroundColor == undefined) {
                chart.chart.plotBackgroundColor = defaultOptions.chart.plotBackgroundColor;
            }
            if (chart.chart.plotBackgroundOpacity == undefined) {
                chart.chart.plotBackgroundOpacity = defaultOptions.chart.plotBackgroundOpacity;
            }
            if (chart.chart.plotBorderColor == undefined) {
                chart.chart.plotBorderColor = defaultOptions.chart.plotBorderColor;
            }
            if (chart.chart.plotBorderColor == undefined) {
                chart.chart.plotBorderColor = defaultOptions.chart.plotBorderColor;
            }
            if (chart.chart.plotBorderWidth == undefined) {
                chart.chart.plotBorderWidth = defaultOptions.chart.plotBorderWidth;
            }
            if (chart.chart.borderColor == undefined) {
                chart.chart.borderColor = defaultOptions.chart.borderColor;
            }
            if (chart.chart.borderWidth == undefined) {
                chart.chart.borderWidth = defaultOptions.chart.borderWidth;
            }
            if (chart.chart.borderRadius == undefined) {
                chart.chart.borderRadius = defaultOptions.chart.borderRadius;
            }
        }
        else {
            chart.chart = {};
            chart.chart.backgroundEnabled = defaultOptions.chart.backgroundEnabled;
            chart.chart.backgroundColor = defaultOptions.chart.backgroundColor;
            chart.chart.backgroundOpacity = defaultOptions.chart.backgroundOpacity;
            chart.chart.plotBackgroundColor = defaultOptions.chart.plotBackgroundColor;
            chart.chart.plotBackgroundOpacity = defaultOptions.chart.plotBackgroundOpacity;
            chart.chart.plotBorderColor = defaultOptions.chart.plotBorderColor;
            chart.chart.plotBorderColor = defaultOptions.chart.plotBorderColor;
            chart.chart.plotBorderWidth = defaultOptions.chart.plotBorderWidth;
            chart.chart.borderColor = defaultOptions.chart.borderColor;
            chart.chart.borderWidth = defaultOptions.chart.borderWidth;
            chart.chart.borderRadius = defaultOptions.chart.borderRadius;
        }

        if (chart.legend) {
            if (chart.legend.backgroundEnabled == undefined) {
                chart.legend.backgroundEnabled = defaultOptions.legend.backgroundEnabled;
            }
            if (chart.legend.backgroundColor == undefined) {
                chart.legend.backgroundColor = defaultOptions.legend.backgroundColor;
            }
            if (chart.legend.backgroundOpacity == undefined) {
                chart.legend.backgroundOpacity = defaultOptions.legend.backgroundOpacity;
            }
            if (chart.legend.borderEnabled == undefined) {
                chart.legend.borderEnabled = defaultOptions.legend.borderEnabled;
            }
            if (chart.legend.borderColor == undefined) {
                chart.legend.borderColor = defaultOptions.legend.borderColor;
            }
            if (chart.legend.borderWidth == undefined) {
                chart.legend.borderWidth = defaultOptions.legend.borderWidth;
            }
            if (chart.legend.borderRadius == undefined) {
                chart.legend.borderRadius = defaultOptions.legend.borderRadius;
            }
        }
        else {
            chart.legend = {}
            chart.legend.backgroundEnabled = defaultOptions.legend.backgroundEnabled;
            chart.legend.backgroundColor = defaultOptions.legend.backgroundColor;
            chart.legend.backgroundOpacity = defaultOptions.legend.backgroundOpacity;
            chart.legend.borderEnabled = defaultOptions.legend.borderEnabled;
            chart.legend.borderColor = defaultOptions.legend.borderColor;
            chart.legend.borderWidth = defaultOptions.legend.borderWidth;
            chart.legend.borderRadius = defaultOptions.legend.borderRadius;
        }
        if (chart.title) {
            if (chart.title.backgroundEnabled == undefined) {
                chart.title.backgroundEnabled = defaultOptions.title.backgroundEnabled;
            }
            if (chart.title.backgroundColor == undefined) {
                chart.title.backgroundColor = defaultOptions.title.backgroundColor;
            }
            if (chart.title.backgroundOpacity == undefined) {
                chart.title.backgroundOpacity = defaultOptions.title.backgroundOpacity;
            }
            if (chart.title.borderEnabled == undefined) {
                chart.title.borderEnabled = defaultOptions.title.borderEnabled;
            }
            if (chart.title.borderColor == undefined) {
                chart.title.borderColor = defaultOptions.title.borderColor;
            }
            if (chart.title.borderWidth == undefined) {
                chart.title.borderWidth = defaultOptions.title.borderWidth;
            }
            if (chart.title.borderRadius == undefined) {
                chart.title.borderRadius = defaultOptions.title.borderRadius;
            }
        }
        else {
            chart.title = {};
            chart.title.backgroundEnabled = defaultOptions.title.backgroundEnabled;
            chart.title.backgroundColor = defaultOptions.title.backgroundColor;
            chart.title.backgroundOpacity = defaultOptions.title.backgroundOpacity;
            chart.title.borderEnabled = defaultOptions.title.borderEnabled;
            chart.title.borderColor = defaultOptions.title.borderColor;
            chart.title.borderWidth = defaultOptions.title.borderWidth;
            chart.title.borderRadius = defaultOptions.title.borderRadius;
        }

        //渐变色处理
        if( chart.chart && chart.chart.backgroundColor){
            chart.chart.backgroundColor = transColor( chart.chart.backgroundColor);
        }

        if(chart.chart && chart.chart.plotBackgroundColor){
            chart.chart.plotBackgroundColor = transColor(chart.chart.plotBackgroundColor);
        }

        if(chart.title && chart.title.backgroundColor){
            chart.title.backgroundColor = transColor(chart.title.backgroundColor);
        }

        if(chart.legend && chart.legend.backgroundColor){
            chart.legend.backgroundColor = transColor(chart.legend.backgroundColor);
        }

        //plotOptions
        var types = ["area", "arearange", "areaspline", "areasplinerange", "bar", "boxplot",
        "bubble", "column", "columnrange", "errorbar", "funnel", "gauge", "heatmap",
        "line", "pie", "polygon", "pyramid", "scatter", "series", "solidgauge",
        "spline", "treemap", "waterfall", "area", "arearange", "areaspline", "areasplinerange",
        "bar", "boxplot", "bubble", "column", "columnrange", "errorbar", "funnel", "gauge",
        "heatmap", "line", "pie", "polygon", "pyramid", "scatter", "series",
        "solidgauge", "spline", "treemap", "wate"];

        for(var i = 0; i < types.length; i++){
            var type = types[i];
            if(!chart.plotOptions){
                break;
            }
            if(chart.plotOptions[type] && chart.plotOptions[type].color){
                chart.plotOptions[type].color = transColor(chart.plotOptions[type].color);
            }

            if(chart.plotOptions[type] && chart.plotOptions[type].fillColor){
                chart.plotOptions[type].fillColor = transColor(chart.plotOptions[type].fillColor);
            }
        }

        var series = chart.series;
        for (i = 0; i < series.length; i++) {
            var serie = series[i];
            if(serie.color){
                serie.color = transColor(serie.color);
            }
            if (serie.data) {
                var n = serie.data.length;
                for (var j = 0; j < n; j++) {
                    if (isNumber(serie.data[j])) {
                        serie.data[j] = { y: serie.data[j] }
                    }
                    else if (isArray(serie.data[j]) && serie.data[j].length == 2) {
                        serie.data[j] = { x: serie.data[j][0], y: serie.data[j][1] }
                    }
                    if(serie.data[j] && serie.data[j].color){
                        serie.data[j].color = transColor(serie.data[j].color);
                    }
                }
            }
        }

        //{type:"linearGradient",x1:0,y1:0,x2:0,y2:0,stops:[[0,"#FFFFFF"],[1,"#000000"]]}
        function transColor(color){
            if(isString(color)){
                return {type:"pure",stops:[[0,color]]};
            }
            else if(isObject(color)){
                if(color.linearGradient){
                    return {
                        type:"linearGradient",
                        x1:color.linearGradient[0],
                        y1:color.linearGradient[1],
                        x2:color.linearGradient[2],
                        y2:color.linearGradient[3],
                        stops:color.stops
                    }
                }
                else if(color.radialGradient){
                    return {
                        type:"radialGradient",
                        x1:color.radialGradient.cx,
                        y1:color.radialGradient.cy,
                        r:color.radialGradient.r,
                        stops:color.stops
                    }
                }
                else{
                    return color;
                }
            }
        }
    }
}(Highcharts));