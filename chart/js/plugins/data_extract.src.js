/**
 * @license HWcharts JS v4.0.3 (2014-07-03)
 * Exporting module
 *
 * (c) 2010-2014 Torstein Honsi
 *
 * License: www.hwcharts.com/license
 */

// JSLint options:
/*global HWcharts, document, window, Math, setTimeout */

(function (H) { // encapsulate

// create shortcuts
    var Chart = H.Chart,
        Series = H.Series,
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
        PREFIX = 'H-',
        ABSOLUTE = 'absolute',
        PX = 'px',
        UNDEFINED,
        symbols = H.Renderer.prototype.symbols,
        defaultOptions = H.getOptions(),
        buttonOffset;

    // Add language
    extend(defaultOptions.lang, {
        extractText:"抽稀"
    });

// Add the extracting related options
    defaultOptions.extracting = {
        enabled:true,
        button:{
            align:"right",
            verticalAlign:"top",
            width:30,
            height:12,
            x:-50,
            y:10,
            style:{
                position: ABSOLUTE,
                cursor:"pointer",
                fontSize:"12px",
                padding:"5px",
                borderStyle:"solid",
                borderWidth:"1px"
            }
        }
    };
//
//    //添加抽稀属性
//    defaultOptions.plotOptions = merge(defaultOptions.plotOptions,
//        {line: {
//            marker: {
//                step:1
//            },
//            dataLabels: {
//                step:1
//            }
//        }
//        });


    //重写容器的点击事件，当点击容器时右键菜单消失
    H.wrap(H.Pointer.prototype, 'onContainerClick', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        var pointer = this,
            chart = pointer.chart,
            extractPop = chart.extractPop;
        chart.clickTarget = chart.clickTarget + "-container";

        //当点击容器中出抽稀按钮以外的区域时隐藏弹出窗口
        if (chart.clickTarget != "extractButton-container" && extractPop) {
            extractPop.hide();
        }
        chart.clickTarget = "";
    });

    //曲线图初始化时初始化数据抽稀组件
    H.wrap(Chart.prototype, 'init', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        var chart = this;
        chart.initExtractPopup();
    });

    //浏览器窗口大小改变时更改抽稀按钮的位置
    H.wrap(Chart.prototype, 'reflow', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        var chart = this,
            options = chart.options.extracting,
            extractDIV = chart.extractDIV,
            extractPop = chart.extractPop,
            position = getPosition(chart, options);
        if(!extractDIV){
            return;
        }
        extractDIV.style.left = position.left;
        extractDIV.style.top = position.top;
        if (extractPop && extractPop.isVisible()) {
            chart.showExtractPopup();
        }
    });

    H.wrap(Series.prototype, 'render', function (proceed) {
        proceed.call(this);
        var series = this,
            chart = this.chart,
            markerOptions = series.options.marker,
            markerPixelSpace = (markerOptions && markerOptions.pixelSpace) || 0,
            markerStep = (markerOptions && markerOptions.step) || 1,
            dataLabelsOptions = series.options.dataLabels,
            dataLabelStep = (dataLabelsOptions && dataLabelsOptions.step) || 1,
            dataLabelPixelSpace = (dataLabelsOptions && dataLabelsOptions.pixelSpace) || 0,
            points = series.points;

        if(markerPixelSpace || markerStep || dataLabelStep || dataLabelPixelSpace){
            if(markerPixelSpace){
                markerStep = math.round(markerPixelSpace * points.length / chart.chartWidth) + 1;
            }

            if(dataLabelPixelSpace){
                dataLabelStep = math.round(dataLabelPixelSpace * points.length / chart.chartWidth) + 1;
            }

            each(points, function (point, i) {
                if (point.graphic) {
                    var visibility = i % markerStep != 0 ? "hidden" : "inherit";
                    point.graphic.attr({
                        visibility: visibility
                    });
                }

                if (point.dataLabel) {
                    var visibility = i % dataLabelStep != 0 ? "hidden" : "inherit";
                    point.dataLabel.attr({
                        visibility: visibility
                    });
                }
            })
        }
    });

    //序列标注不显示的问题
    H.wrap(Chart.prototype, 'hideOverlappingLabels', function (proceed, labels) {
        proceed.call(this,labels);

        var len = labels.length,
            label,
            i,
            j,
            label1,
            label2;
        // Hide or show
        for (i = 0; i < len; i++) {
            label = labels[i];
            if (label) {
                if (label.oldOpacity !== label.newOpacity && label.placed) {
                    label.alignAttr.opacity = 1;
                    label[label.isOld && label.newOpacity ? 'animate' : 'attr'](label.alignAttr);
                }
                label.isOld = true;
            }
        }
    });

//    //数据标记和数值标注显示抽稀
//    H.Chart.prototype.displayExtract = function(){
//        var chart = this,
//            chartSeries = chart.series;
//        each(chartSeries, function (series, j) {
//            var markerOptions = series.options.marker,
//                markerPixelSpace = (markerOptions && markerOptions.pixelSpace) || 0,
//                markerStep = (markerOptions && markerOptions.step) || 1,
//                dataLabelsOptions = series.options.dataLabels,
//                dataLabelStep = (dataLabelsOptions && dataLabelsOptions.step) || 1,
//                dataLabelPixelSpace = (dataLabelsOptions && dataLabelsOptions.pixelSpace) || 0,
//                points = series.points;
//
//            if(markerPixelSpace){
//                markerStep = math.round(markerPixelSpace * points.length / chart.chartWidth) + 1;
//            }
//
//            if(dataLabelPixelSpace){
//                dataLabelStep = math.round(dataLabelPixelSpace * points.length / chart.chartWidth) + 1;
//            }
//
//            each(points, function (point, i) {
//                if (point.graphic) {
//                    var visibility = i % markerStep != 0 ? "hidden" : "inherit";
//                    point.graphic.attr({
//                        visibility: visibility
//                    });
//                }
//
//                if (point.dataLabel) {
//                    var visibility = i % dataLabelStep != 0 ? "hidden" : "inherit";
//                    point.dataLabel.attr({
//                        visibility: visibility
//                    });
//                }
//            })
//        });
//    }

    extend(Chart.prototype, {
        initExtractPopup: function () {
            var chart = this,
                options = chart.options.extracting,
                extractDIV = chart.extractDIV,
                extractPop = chart.extractPop;

            if (options.enabled !== true) {
                return;
            }

            var position = getPosition(chart, options);
            if (!extractDIV) {
                chart.extractDIV = extractDIV = createElement(DIV, {
                    id: "extract"
                }, extend(options.button.style, {
                    width: options.button.width + "px",
                    height: options.button.height + "px",
                    left: position.left,
                    top: position.top
                }), chart.container);
                extractDIV.innerHTML = defaultOptions.lang.extractText;

                if(_isTopWindow){
                    chart.extractPop = extractPop = new dhtmlXPopup();
                }
                else{
                    chart.extractPop = extractPop = new dhtmlxPopWindow.dhtmlXPopup();
                    //dhxWindow.attachViewportTo(window.parent.document.body);
                }

                chart.extractForm = extractPop.attachForm([
                    {type: "block", blockOffset: 0, list: [
                        {type: "checkbox", position: "label-right", name: "seriesCheckBox", value: "checkbox", label: "设置到序列",labelHeight:30,  checked: false},
                        {type: "newcolumn"},
                        {type: "combo", label: "", name: "seriesCombo",offsetLeft:5, labelWidth: 0,inputLeft:10, inputWidth: 30,options:[]}
                    ]},
                    {type: "fieldset", label: "抽稀设置", offsetTop: 10, inputWidth: 220, list:[
                        {type: "settings", position: "label-left", labelWidth: 60, inputWidth: 80},
                        {type: "input", width: 50, name: "marker", label: "标记点：", value: "1"},
                        {type: "input", width: 50, name: "dataLabel", label: "数值标注：", value: "1"}

                    ]},
                    {type: "block", blockOffset: 0, list: [
                        {type: "button", width: 30, name: "confirm", value: "确定", offsetTop: 5, offsetLeft: 10},
                        {type: "newcolumn"},
                        {type: "button", width: 30, name: "cancel", value: "取消", offsetTop: 5, offsetLeft: 50}
                    ]}
                ]);
            }
            chart.addExtractEvent();

        },

        //给抽稀面板中的元素添加事件
        addExtractEvent: function () {
            var chart = this,
                extractDIV = chart.extractDIV,
                extractPop = chart.extractPop,
                extractForm = chart.extractForm,

                markerStep,  //标记点间隔
                dataLabelStep,  //数值标注间隔
                markerInput = extractForm.getInput("marker"),    //标记点设置输入框
                dataLabelInput = extractForm.getInput("dataLabel"),  //数值标注设置输入框
                seriesCombo = extractForm.getCombo("seriesCombo"),  //序列组合框;
                isSetToSeries,  //是否设置到序列，面板中设置到序列复选框是否选中
                tempExtractOptions = {};   //用于存储个序列抽稀属性的临时变量

            //点击抽稀按钮时抽稀面板显示或隐藏
            addEvent(extractDIV, "click", function () {
                chart.clickTarget = "extractButton";
                if (extractPop.isVisible()) {
                    extractPop.hide();
                } else {
                    chart.showExtractPopup();
                }
            });

            //抽稀面板显示时初始化面板中的元素
            extractPop.attachEvent("onShow", function (id) {
                isSetToSeries = extractForm.isItemChecked("seriesCheckBox");
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
            });

            //抽稀面板中的元素值改变时执行的事件，如复选框按钮选中或取消时
            extractForm.attachEvent("onChange", function(name,value,is_checked){
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
                    chart.showExtractPopup();
                }
            });

            //文本框改变事件,文本框内容改变时将值记录在临时变量的对应序列中
            extractForm.attachEvent("onInputChange", function (name, value,form) {
                if(name == "marker"){
                    tempExtractOptions[seriesCombo.getSelectedValue()].markerStep = markerInput.value;
                }
                else if(name == "dataLabel"){
                    tempExtractOptions[seriesCombo.getSelectedValue()].dataLabelStep = dataLabelInput.value;
                }
            })

            //确定取消按钮事件
            extractForm.attachEvent("onButtonClick", function (name) {
                var isSetToSeries,
                    inputMarkerStep,
                    inputDataLabelStep;

                //点击确定按钮时，如果应用到序列选中的话根据临时变量中的序列的抽稀值设置抽稀，否则根据文本框中的值设置
                if (name == "confirm") {
                    isSetToSeries = extractForm.isItemChecked("seriesCheckBox"),
                        each(chart.series, function (serie, i) {
                            if(serie.visible){
                                var options = serie.options,
                                    dataLabelOptions = options.dataLabels,
                                    markerOptions = options.marker,
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
                    extractPop.hide();
                    chart.redraw();
//                    chart.displayExtract();
                }
                else if(name == "cancel"){
                    extractPop.hide();
                }
            });
        },

        //显示抽稀面板，并初始化面板中的数据
        showExtractPopup: function () {
            var chart = this,
                extractDIV = chart.extractDIV,
                extractPop = chart.extractPop;
            if (extractPop) {
                var x = window.dhx4.absLeft(extractDIV);
                var y = window.dhx4.absTop(extractDIV);
                var w = extractDIV.offsetWidth;
                var h = extractDIV.offsetHeight;
                extractPop.show(x, y, w, h);
            }
        }
    });

//    H.Chart.prototype.callbacks.push(function (chart) {
//        H.addEvent(chart, 'load', chart.displayExtract());
//    });

    //计算抽稀按钮的位置
    function getPosition(chart, options) {
        var buttonLeft = 0,
            buttonTop = 0;
        if (options.button.align == "center") {
            buttonLeft = (chart.containerWidth - options.button.width) / 2;
        }
        else if (options.button.align == "right") {
            buttonLeft = (chart.containerWidth - options.button.width);
        }
        if (options.button.verticalAlign == "middle") {
            buttonTop = (chart.containerHeight - options.button.height) / 2;
        }
        else if (options.button.verticalAlign == "bottom") {
            buttonTop = (chart.containerHeight - options.button.height);
        }

        return{
            left: buttonLeft + options.button.x + "px",
            top: buttonTop + options.button.y + "px"
        }
    }

}(Highcharts));
