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
    var bootPath = CreateJSPath("hwAPI.js",-1);

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
		if(!isIE()){
			nameInput.value = exportOptions.filename || (chart.options.title && chart.options.title.text) || 'chart';
		}
        exportOptions.histotyExportHeight = heightInput.value;
    }

	function isIE(){
	     if (!!window.ActiveXObject || "ActiveXObject" in window){
	      return true; 
	    }else{
	      return false; 
	    }
	} 
	 function CreateJSPath(str,dis){
	     var scripts = document.getElementsByTagName("script");
	     var path = "";
	     if(str && str.indexOf("js") != -1){
	         for (var i = 0, l = scripts.length; i < l; i++) {
	             var src = scripts[i].src;
	             if (src.indexOf(str) != -1) {
	                 path = src.split(str)[0];
	                 break;
	             }
	         }
	     }
	 
	     var href = location.href;
	     href = href.split("#")[0].split("?")[0].split("/");
	 
	     var isAbsolutePath = true;
	     if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
	         isAbsolutePath = false;
	         href.length = href.length - 1;
	         path = path.split("/");
	         path = href.concat(path);
	     }
	     if(isAbsolutePath){
	         path = path.split("/");
	     }
	     path.length = path.length - 1 + (dis || 0);
	     path = path.join("/");
	     return path;
	 }
}(Highcharts));