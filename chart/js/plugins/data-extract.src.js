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
            var p = points[j],
				x = Math.abs(p.plotX + hoverSeries.yAxis.left - e.chartX),
				y = Math.abs(p.plotY + hoverSeries.yAxis.top - e.chartY);
            if(x<= range && y<= range){
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
            isExistedit = false,
            isDataExtact = false;
        dhxContextMenu_Edit.forEachItem(function(itemId){
            if(itemId == "edit"){
                isExistedit = true;
            }
            if(itemId == "extract"){
                isDataExtact = true;
            }
        });

        if(!isExistedit){
            dhxContextMenu_Edit.addNewChild(dhxContextMenu_Edit.topId, 0, "edit", unescape("%u7F16%u8F91"));
        }

        if(!isDataExtact){
            dhxContextMenu_Edit.addNewChild("edit", 2,"extract","数据抽稀");

            //给右键菜单中数据查看添加事件
            dhxContextMenu_Edit.attachEvent("onClick", function(id, zoneId, cas){
                if(id == "extract"){

                    var dhxDataExtractSetWindow = chart.dhxDataExtractSetWindow;
                    if(!dhxDataExtractSetWindow){
                        chart.initDataExtractSetWindow(e);
                    }
                    else {
                        dhxDataExtractSetWindow.bringToTop();
                        if(dhxDataExtractSetWindow.isHidden()){
                            if(chart._hoverFrame){
                                var dimension = dhxDataExtractSetWindow.getDimension();
                                chart._hoverFrame.css({top: e.clientY + "px", left: e.clientX + "px", width: dimension[0] + "px", height: dimension[1] + "px"})
                            }
                            dhxDataExtractSetWindow.setPosition(e.clientX, e.clientY);
                            dhxDataExtractSetWindow.show();
                        }
                    }
                }
            });
        }
    }

    Chart.prototype.initDataExtractSetWindow = function (e) {
        var chart = this,
            parentChart = chart.options.chart.parentChart,
            dhxWindow = chart.dhxWindow,
            dhxDataExtractSetWindow = chart.dhxDataExtractSetWindow,
            dhxDataExtraForm = chart.dhxDataExtraForm,

            markerInput,    //标记点设置输入框
            dataLabelInput,  //数值标注设置输入框
            seriesCombo,  //序列组合框;
            isSetToSeries,  //是否设置到序列，面板中设置到序列复选框是否选中
            tempExtractOptions = {};   //用于存储个序列抽稀属性的临时变量

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

        if (!dhxDataExtractSetWindow) {
            var windowWidth = 270,
                windowHeight = 280,
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
            chart.dhxDataExtractSetWindow = dhxDataExtractSetWindow = dhxWindow.createWindow("dataExtractSetWindow", e.clientX, e.clientY, windowWidth, windowHeight);
            if(chart._hoverFrame){
                chart._hoverFrame.css({top: e.clientY + "px", left: e.clientX + "px", width: windowWidth + "px", height: windowHeight + "px"});
            }
            else{
                dhxDataExtractSetWindow.centerOnScreen();
            }
            dhxDataExtractSetWindow.setText("数据抽稀");
            dhxDataExtractSetWindow.denyResize();
            dhxDataExtractSetWindow.attachEvent("onClose", function (win) {
                if(chart._hoverFrame){
                    chart._hoverFrame.css({display: 'none'});
                }
                win.hide();
            });
            dhxDataExtractSetWindow.attachEvent("onMoveFinish", function(win){
                if(chart._hoverFrame){
                    var position = win.getPosition();
                    chart._hoverFrame.css({top: position[1] + "px", left: position[0] + "px"});
                }
            });
            dhxDataExtractSetWindow.attachEvent("onShow", function (win) {

                if(chart._hoverFrame){
                    chart._hoverFrame.css({display: 'block'});
                }
                initFormComponent(chart, dhxDataExtraForm)
            });

            dhxDataExtraForm = chart.dhxDataExtraForm = dhxDataExtractSetWindow.attachForm([
                {type: "block", blockOffset: 10, list: [
                    {type: "checkbox", position: "label-right", name: "seriesCheckBox", value: "checkbox", label: "设置到序列",labelHeight:30,  checked: false},
                    {type: "newcolumn"},
                    {type: "combo", label: "", name: "seriesCombo",offsetLeft:5, labelWidth: 0,inputLeft:10, inputWidth: 120,options:[]}
                ]},
                {type: "fieldset", label: "抽稀设置", offsetTop: 10,offsetLeft: 10, inputWidth: 220, list:[
                    {type: "settings", position: "label-left", labelWidth: 80, inputWidth: 80},
                    {type: "input", width: 80, name: "marker", label: "标记点：", labelWidth:80,value: "1"},
                    {type: "input", width: 80, name: "dataLabel", label: "数值标注：",labelWidth: 80, value: "1"}

                ]},
                {type: "block", blockOffset: 10, list: [
                    {type: "button", width: 50, name: "confirm", value: "确定", offsetTop: 15, offsetLeft: 50},
                    {type: "newcolumn"},
                    {type: "button", width: 50, name: "cancel", value: "取消", offsetTop: 15, offsetLeft: 20}
                ]}
            ]);


            function initFormComponent(chart, dhxDataExtraForm){
                markerInput = dhxDataExtraForm.getInput("marker");
                dataLabelInput = dhxDataExtraForm.getInput("dataLabel");
                seriesCombo = dhxDataExtraForm.getCombo("seriesCombo");;
                isSetToSeries = dhxDataExtraForm.isItemChecked("seriesCheckBox");
                if(chart._extractForm_comboChange == true){
                    chart._extractForm_comboChange = false;
                    return;
                }

                //初始化组合框的值
                seriesCombo.clearAll();  //清空
                var comboOptions = [];
                //初始化临时变量，用于存储每个序列中数值标注的间隔点和标记的间隔点

                //将可见序列的抽稀属性放到临时变量中
                each(chart.series, function (serie,i) {
                    if(serie.visible){
                        var options = serie.options,
                            markerOptions = options && options.marker,
                            dataLabelOptions = options && options.dataLabels;

                        markerStep = (markerOptions && markerOptions.step) || 1;
                        dataLabelStep = (dataLabelOptions && dataLabelOptions.step) || 1;
                        tempExtractOptions[serie.name] = {};
                        tempExtractOptions[serie.name].markerStep = markerStep;
                        tempExtractOptions[serie.name].dataLabelStep = dataLabelStep;
                        comboOptions.push([serie.name, serie.name])
                    }
                });
                seriesCombo.addOption(comboOptions);

                //记住上次选中的选项
                var selectIndex = seriesCombo.getIndexByValue(chart._extractForm_comboSelectValue);
                if(selectIndex == -1){
                    selectIndex = 0;
                }
                seriesCombo.selectOption(selectIndex);

                //初始化组合框是否禁用
                var disable = isSetToSeries ? false : true;
                seriesCombo.disable(disable);

                //初始化文本框的值
                markerInput.value = tempExtractOptions[seriesCombo.getSelectedValue()].markerStep;
                dataLabelInput.value = tempExtractOptions[seriesCombo.getSelectedValue()].dataLabelStep;
            }

            initFormComponent(chart, dhxDataExtraForm);

            dhxDataExtraForm.attachEvent("onChange", function (name, value,is_checked){
                if(name == "seriesCheckBox"){
                    seriesCombo.disable(!is_checked);
                }
                if(name == "seriesCombo"){
                    //初始化文本框的值
                    var comboSelectValue = seriesCombo.getSelectedValue();
                    markerInput.value = tempExtractOptions[comboSelectValue].markerStep;
                    dataLabelInput.value = tempExtractOptions[comboSelectValue].dataLabelStep;

                    chart._extractForm_comboSelectValue = comboSelectValue;
                    chart._extractForm_comboChange = true;
                }
            });

            dhxDataExtraForm.attachEvent("onInputChange", function (name, value){
                if(name == "marker"){
                    tempExtractOptions[seriesCombo.getSelectedValue()].markerStep = markerInput.value;
                }
                else if(name == "dataLabel"){
                    tempExtractOptions[seriesCombo.getSelectedValue()].dataLabelStep = dataLabelInput.value;
                }
            });

            dhxDataExtraForm.attachEvent("onButtonClick", function (name) {
                var isSetToSeries,
                    inputMarkerStep,
                    inputDataLabelStep;

                //点击确定按钮时，如果应用到序列选中的话根据临时变量中的序列的抽稀值设置抽稀，否则根据文本框中的值设置
                if (name == "confirm") {
                    isSetToSeries = dhxDataExtraForm.isItemChecked("seriesCheckBox");
                        each(chart.series, function (serie, i) {
                            if(serie.visible){
                                var options = serie.options,
                                    dataLabelOptions = options.dataLabels,
                                    markerOptions = options.marker || {},
                                    dataLabelStep = dataLabelOptions && dataLabelOptions.step,
                                    markerStep = markerOptions && markerOptions.step;
                                if(isSetToSeries){
                                    inputMarkerStep = parseInt(tempExtractOptions[serie.name].markerStep);
                                    inputDataLabelStep = parseInt(tempExtractOptions[serie.name].dataLabelStep);
                                }
                                else{
                                    inputMarkerStep = parseInt(markerInput.value);
                                    inputDataLabelStep = parseInt(dataLabelInput.value);
                                }

                                if (inputMarkerStep != markerStep || dataLabelStep != inputDataLabelStep) {
                                    markerOptions.step = inputMarkerStep;
                                    dataLabelOptions.step = inputDataLabelStep;
                                    serie.isDirty = true;
                                }
                            }
                        });
                    chart.redraw();
                    dhxDataExtractSetWindow.hide();
//                    chart.displayExtract();
                }
                else if(name == "cancel"){
                    dhxDataExtractSetWindow.hide();
                }
            });
        }
    }
}(Highcharts));