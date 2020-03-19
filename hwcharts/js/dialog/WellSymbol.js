Vmd.define('hwchart.dialog.WellSymbol', {
    requires: ['hwchart.dialog.FontSeting']
}, function () {
    var fontSeting = hwchart.dialog.FontSeting;
    /**
    * @constructor
    * @alias module:echarts/chart/helper/SymbolDraw
    * @param {module:zrender/graphic/Group} [symbolCtor]
    */
    function WellPosDialog(chart, params) {

        var me = this;
        me.chart = chart;
        this.options = params;

        var series = chart._api.getModel().getSeries();

        me.seriesNameWellSymbol = [];
        series.forEach(function (item) {
            if (item.subType === 'wellSymbol') {
                //me.seriesNameWellSymbol = item.name;

                me.seriesNameWellSymbol.push(item.name);

                me.symbolSize = item.option.symbolSize;
                if (!isEmpty(item.option.filter)) {

                    // char：过滤前缀，charnum：过滤前缀位数
                    me.filterType = item.option.filter.type;
                    me.filterPreStr = item.option.filter.prefix;
                    me.filterPreNum = item.option.filter.preChars;
                }
            }
            else if (item.subType === 'wellLabel') {
                me.seriesNameWellLabel = item.name;
            }
        })
    }

    var WellPosDialogPro = WellPosDialog.prototype;

    // 初始化from表单内容
    WellPosDialogPro.initFormWin = function () {

        var me = this;
        var api = me.chart._api;

        /*
        *调用字体设置组件
        *@params  chart 实例化对象
        *@params  parent 组件父容器
        *@params  fontStyle 初始文本样式
        */
        me.nameFontSet = new fontSeting(me.chart, me.form.getContainer("name_font_set"));
        // 监听文字设置组件的变化
        me.nameFontSet.on('onFontStyleChange', function (font) {
            console.log(font)
        })

        me.labelFontSet = new fontSeting(me.chart, me.form.getContainer("label_font_set"));
        // 监听文字设置组件的变化
        me.labelFontSet.on('onFontStyleChange', function (font) {
            console.log(font)
        })

        me.form.attachEvent("onChange", function (name, value, isCheck) {
            //console.log(name + "/" + value + "/" + isCheck)
            if (name === 'showWellNo') {

                // 井号
                var showWellNo = me.form.isItemChecked("showWellNo"); // 井号

                for (var i = 0; i < me.seriesNameWellSymbol.length; i++) {
                    me.chart.seriesSelected[me.seriesNameWellSymbol[i]] = showWellNo;
                }
                //me.chart.seriesSelected[me.seriesNameWellSymbol] = showWellNo;

                // 根据选择的指标名称切换属性框内容
                api.dispatchAction({
                    type: 'takeGlobalCursor'
                });
            }
            else if (name === 'showWellLabel') {

                // 井旁标注
                var showWellLabel = me.form.isItemChecked("showWellLabel"); // 井旁标注
                me.chart.seriesSelected[me.seriesNameWellLabel] = showWellLabel;

                // 根据选择的指标名称切换属性框内容
                api.dispatchAction({
                    type: 'takeGlobalCursor'
                });
            }
            else if (name === 'radioFilterPre' || name === 'filterPreValue' || name === 'filterPreNumValue') {

                // 过滤前缀
                var radioFilterPreValue = me.form.getItemValue("radioFilterPre"); // 过滤前缀字符
                var filterPreValue = me.form.getItemValue("filterPreValue"); // 过滤前缀字符
                var filterPreNum = me.form.getItemValue("filterPreNumValue"); // 过滤前缀字符位数
                var filterType = "char";
                if (radioFilterPreValue == "filterPreStr") {
                    filterType = "char";
                    me.form.setReadonly("filterPreValue", false);
                    me.form.setReadonly("filterPreNumValue", true);
                }
                else if (radioFilterPreValue == "filterPreNum") {
                    filterType = "charnum";
                    me.form.setReadonly("filterPreValue", true);
                    me.form.setReadonly("filterPreNumValue", false);
                }
                if (isNaN(parseFloat(filterPreNum))) {
                    alert('过滤前缀位数请输入正确的数字！');
                    return
                }

                var objSeries = {
                    "series": []
                };
                for (var i = 0; i < me.seriesNameWellSymbol.length; i++) {
                    var obj =
                        {
                            "type": "wellSymbol",
                            "name": me.seriesNameWellSymbol[i],
                            "dirty": true,
                            "filter": {
                                "type": filterType, //过滤前缀
                                "prefix": filterPreValue, //前缀
                                // suffix: 'HF',//后缀

                                "preChars": filterPreNum, //前缀字符数
                                // sufChars: 2 //后缀字符数
                            }
                        };
                    objSeries.series.push(obj);
                }
                // 根据过滤字符进行井号的过滤
                //var objSeries = {
                //    "series": [
                //        {
                //            "type": "wellSymbol",
                //            "name": me.seriesNameWellSymbol,
                //            "filter": {
                //                "type": filterType, //过滤前缀
                //                "prefix": filterPreValue, //前缀
                //                // suffix: 'HF',//后缀

                //                "preChars": filterPreNum, //前缀字符数
                //                // sufChars: 2 //后缀字符数
                //            }
                //        }
                //    ]
                //};
                me.chart.setOption(objSeries);
            }
            else if (name === 'radius') {

                var radius = me.form.getItemValue("radius"); // 半径
                if (radius == "") {
                    radius = me.symbolSize;
                }
                if (isNaN(parseFloat(radius)) || radius < 1 || radius > 50) {
                    alert('请输入正确的半径数值:(1 - 50)！');
                    return
                }

                var objSeries = {
                    "series": []
                };
                for (var i = 0; i < me.seriesNameWellSymbol.length; i++) {
                    var obj =
                        {
                            "type": "wellSymbol",
                            "name": me.seriesNameWellSymbol[i],
                            "dirty": true,
                            "symbolSize": radius
                        };
                    objSeries.series.push(obj);
                }
                //var objSeries = {
                //    "series": [
                //        {
                //            "type": "wellSymbol",
                //            "name": me.seriesNameWellSymbol,
                //            "symbolSize": radius
                //        }
                //    ]
                //};

                me.chart.setOption(objSeries);
            }
        })
    }
    // 获取对话框中设置的数据进行更新
    WellPosDialogPro.save = function () {

        return;
        var me = this;

        if (!me.form) {
            return;
        }

        // 增加应用到全部的控制：如何取到井序列的对象，设置所有对象？可以通过取得charts，通过charts.setOption设置
        // 目前是处理当前选中对象，但是当前相关的对象有井号、井符号、井属性，

        // 井号
        var showWellNo = me.form.isItemChecked("showWellNo"); // 井号
        // 控制井号是否显示
        //if(showWellNo)
        //{
        //    me.tagEle.show(); // 当前选中对象,同时应用到同序列的所有对象
        //}
        //else
        //{
        //    me.tagEle.hide(); // 当前选中对象,同时应用到同序列的所有对象
        //}

        // 字体
        // （1）实现字体组件功能
        // （2）获取设置的字体信息，设置到井对象中（井对象提供接口）
        //me.tagEle.attr({
        //    style: {
        //        color: '#000',
        //        fontFamily: "Simsun",
        //        fontSize: 12,
        //        fontWeight: "normal",
        //        fontStyle: "normal" // 粗体/斜体/下划线
        //    }
        //});

        // 两个单项按钮设为同一个name，获取的value是哪个，就表示哪个被选中
        var radioFilterPre = me.form.isItemChecked("radioFilterPre"); // 过滤前缀
        var filterPreValue = me.form.getItemValue("filterPreValue"); // 过滤前缀字符
        var filterPreNumValue = me.form.getItemValue("radioFilterPreNumValue"); // 过滤前缀位数
        if (radioFilterPre == "filterPreStr") // 如果是选中了过滤前缀字符
        {
            // 根据设置的过滤前缀字符的值，过滤井号字符显示
            // 同时应用到同序列的所有对象（井对象提供接口）
        }
        else // filterPreNum
        {
            // 根据设置的过滤前缀字符位数的值，过滤井号字符显示
            // 同时应用到同序列的所有对象（井对象提供接口）
        }

        // 井符号
        var showWellSymbol = me.form.isItemChecked("showWellSymbol"); // 显示井符号
        // 控制井号是否显示
        if (showWellSymbol) {
            //me.tagEle.hide(); // 当前选中对象
        }
        var radius = me.form.getItemValue("radius"); // 半径
        radius = 15;
        // 设置对象的半径（设置到所有对象？）
        //me.tagEle.attr({
        //    shape: {
        //        r: radius
        //    }
        //});
        //var oilWellColor = me.form.getItemValue("oilWellColor"); // 油井
        //var waterWellColor = me.form.getItemValue("waterWellColor"); // 水井
        //var gasWellColor = me.form.getItemValue("gasWellColor"); // 气井

        // 井旁标注
        var showWellLabel = me.form.isItemChecked("showWellLabel"); // 显示井旁标注
        // 控制井旁标注是否显示
        //if (showWellLabel) {
        //    me.tagEle.show(); // 当前选中对象,同时应用到同序列的所有对象
        //}
        //else {
        //    me.tagEle.hide(); // 当前选中对象,同时应用到同序列的所有对象
        //}

        // 字体
        // （1）实现字体组件功能
        // （2）获取设置的字体信息，设置到井对象中（井对象提供接口）
        // 将获取的修改信息设置到图上
        //me.tagEle.attr({

        //    style: {
        //        color: '#000',
        //        fontFamily: "Simsun",
        //        fontSize: 12,
        //        fontWeight: "normal",
        //        fontStyle: "normal" // 斜体/下划线
        //    }
        //});

        //me.tagEle.hide();



        //var wellPosOption = { series: [] };
        //// 遍历所有序列，找到对应的井位序列，将获取的修改信息设置到图上
        me.chart._model.eachSeries(function (seriesModel) {
            // 井位
            if (seriesModel.subType == 'wellSymbol') {

                me.chart.seriesSelected[seriesModel.name] = showWellNo;
                //var objSeries = { 
                //    "type": "wellSymbol",
                //    "name": seriesModel.name,
                //    //"scale": 0.2,
                //    "label": {
                //        "normal": {
                //            "color": "black",
                //            "show": showWellNo,
                //            "formatter": "{b}",
                //            "position": "right"
                //        }
                //    },
                //    //"data": [],
                //    "symbolSize": radius
                //};

                ////var objSeries = {
                ////    "type": "wellSymbol",
                ////    "name": seriesModel.name,
                ////    "label": {
                ////        "normal": {
                ////            "color": "black",
                ////            "show": showWellNo,
                ////            "formatter": "{b}",
                ////            "position": "right"
                ////        }
                ////    },
                ////    "symbolSize": radius
                ////};

                //wellPosOption.series.push(objSeries);
            }
            else if (seriesModel.subType == 'wellLabel') {

                me.chart.seriesSelected[seriesModel.name] = showWellLabel;
                //var objSeries = {
                //    "type": "wellLabel",
                //    "name": seriesModel.name,
                //    "itemStyle": {
                //        "normal": {
                //            "color": "red",
                //            "show": showWellLabel,
                //            "formatter": "{b}"
                //        }
                //    }
                //};

                //wellPosOption.series.push(objSeries);
            }
        });

        //me.chart.setOption(wellPosOption);
    }

    WellPosDialogPro.cancel = function () {
        var me = this;
        var api = me.chart._api;

        // 井号
        if (me.showWellNo != undefined) {
            for (var i = 0; i < me.seriesNameWellSymbol.length; i++) {
                me.chart.seriesSelected[me.seriesNameWellSymbol[i]] = me.showWellNo;
            }
            //me.chart.seriesSelected[me.seriesNameWellSymbol] = me.showWellNo;
        }
        // 井旁标注
        if (me.showWellLabel != undefined) {
            me.chart.seriesSelected[me.seriesNameWellLabel] = me.showWellLabel;
        }

        // 根据过滤字符进行井号的过滤

        var objSeries = {
            "series": []
        };
        for (var i = 0; i < me.seriesNameWellSymbol.length; i++) {
            var obj =
                {
                    "type": "wellSymbol",
                    "name": me.seriesNameWellSymbol[i],
                    "dirty": true,
                    "filter": {
                        "type": me.filterType, //过滤前缀
                        "prefix": me.filterPreStr, //前缀
                        // suffix: 'HF',//后缀

                        "preChars": me.filterPreNum //前缀字符数
                        // sufChars: 2 //后缀字符数
                    },
                    "symbolSize": me.symbolSize
                };
            objSeries.series.push(obj);
        }
        me.chart.setOption(objSeries);
        //// 根据过滤字符进行井号的过滤
        //var objSeries = {
        //    "series": [
        //        {
        //            "type": "wellSymbol",
        //            "name": me.seriesNameWellSymbol,
        //            "filter": {
        //                "type": me.filterType, // char：过滤字符，charnum：过滤字符位数
        //                "prefix": me.filterPreStr, //前缀
        //                // suffix: 'HF',//后缀

        //                "preChars": me.filterPreNum, //前缀字符数
        //                // sufChars: 2 //后缀字符数
        //            }
        //        }
        //    ]
        //};
        //me.chart.setOption(objSeries);

        //// 半径
        //if (me.symbolSize != undefined) {
        //    var objSeries = {
        //        "series": [
        //            {
        //                "type": "wellSymbol",
        //                "name": me.seriesNameWellSymbol,
        //                "symbolSize": me.symbolSize
        //            }
        //        ]
        //    };

        //    me.chart.setOption(objSeries);
        //}

        // 根据选择的指标名称切换属性框内容
        api.dispatchAction({
            type: 'takeGlobalCursor'
        });
    }

    // 创建窗体元素
    WellPosDialogPro.getStettings = function () {
        var me = this;

        var symbolSize = me.symbolSize;

        var showWellNo = true;
        for (var i = 0; i < me.seriesNameWellSymbol.length; i++) {
            showWellNo = me.chart.seriesSelected[me.seriesNameWellSymbol[i]];
        }
        //var showWellNo = me.chart.seriesSelected[me.seriesNameWellSymbol];
        var showWellLabel = me.chart.seriesSelected[me.seriesNameWellLabel];

        me.showWellNo = showWellNo;
        me.showWellLabel = showWellLabel;

        var ifFilterTypeStr = false;
        var ifFilterTypeNum = true;
        var filterStrReadonly = true;
        var filterNumReadonly = false;
        if (me.filterType == "char") {
            ifFilterTypeStr = true;
            ifFilterTypeNum = false;
            filterStrReadonly = false;
            filterNumReadonly = true;
        }
        if (me.filterPreNum == undefined) {
            me.filterPreNum = 0;
        }

        if (isNaN(parseFloat(symbolSize))) {
            symbolSize = 0;
        }

        var form = [
             {
                 type: "fieldset", label: "井号", className: "dialog_seporator", width: 640, offsetLeft: 8, list: [
                    { type: "checkbox", name: "showWellNo", width: 60, labelWidth: 50, value: "r1", label: "显示", position: "label-right", checked: showWellNo },
                    //{ type: "newcolumn" },
                    //{ type: "button", name: "wellNoFont", width: 60, value: "字体...", className: 'sec-bnt', offsetLeft: 0, offsetTop: 7 },    
                    { type: "newcolumn" },
                    { type: "radio", name: "radioFilterPre", value: "filterPreStr", label: "过滤前缀", position: "label-right", checked: ifFilterTypeStr, readonly: false, offsetLeft: 5 },
                    { type: "newcolumn" },
                    { type: "input", name: "filterPreValue", width: 85, labelWidth: 30, label: "", value: me.filterPreStr, readonly: filterStrReadonly, offsetTop: 10, offsetLeft: 5 },
                    { type: "newcolumn" },
                    { type: "radio", name: "radioFilterPre", value: "filterPreNum", label: "过滤前缀位数", position: "label-right", checked: ifFilterTypeNum, readonly: false, offsetLeft: 20 },
                    { type: "newcolumn" },
                    { type: "input", name: "filterPreNumValue", width: 85, labelWidth: 30, label: "", value: me.filterPreNum, readonly: filterNumReadonly, offsetTop: 10, offsetLeft: 5 },
                    { type: "newcolumn" },
                    { type: "container", name: "name_font_set", inputHeight: 40, inputWidth: 300, offsetLeft: 60 },
                 ]
             },
             {
                 type: "fieldset", label: "井符号", className: "dialog_seporator", width: 640, offsetLeft: 8, list: [
                    { type: "checkbox", name: "showWellSymbol", width: 60, labelWidth: 50, value: "r1", label: "显示", position: "label-right", checked: showWellNo },
                    { type: "newcolumn" },
                    { type: "input", name: "radius", width: 80, labelWidth: 45, label: "半径：", value: symbolSize, offsetTop: 10, offsetLeft: 5 },
                    { type: "newcolumn" },
                    { type: "label", label: "px", offsetTop: 10 }
                    //{ type: "input", name: "oilWellColor", width: 80, labelWidth: 30, position: "label-left", label: '油井', value: "#ff0000", offsetLeft: 20 },
                    //{ type: "newcolumn" },
                    //{ type: "input", name: "waterWellColor", width: 80, labelWidth: 30, position: "label-left", label: '水井', value: "#0000ff", offsetLeft: 20 },
                    //{ type: "newcolumn" },
                    //{ type: "input", name: "gasWellColor", width: 80, labelWidth: 30, position: "label-left", label: '气井', value: "#ffff00", offsetLeft: 20 }
                 ]
             },
             {
                 type: "fieldset", label: "井旁标注", className: "dialog_seporator", width: 640, offsetLeft: 8, list: [
                    { type: "checkbox", name: "showWellLabel", width: 60, labelWidth: 50, value: "r1", label: "显示", position: "label-right", checked: showWellLabel },
                    //{ type: "newcolumn" },
                    //{ type: "button", name: "wellLableFont", width: 60, value: "字体...", className: 'sec-bnt', offsetLeft: 0, offsetTop: 7 },
                    { type: "newcolumn" },
                    { type: "container", name: "label_font_set", inputHeight: 40, inputWidth: 300, offsetLeft: -20 }
                 ]
             }
            //{
            //    type: "block", offsetLeft: 500, offsetTop: 0, list: [
            //       { type: "button", width: 60, name: "confirm", value: '确认', offsetLeft: 12 },
            //       { type: "newcolumn" },
            //       { type: "button", width: 60, name: "cancel", value: '取消', offsetLeft: 12 }
            //    ]
            //}
        ];

        return form;
    }
    hwchart.dialog.WellSymbol = WellPosDialog
})

function isEmpty(obj) {
    // 检验 undefined 和 null
    if (!obj && obj !== 0 && obj !== '') {
        return true;
    }
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
    }
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
        return true;
    }
    return false;
}