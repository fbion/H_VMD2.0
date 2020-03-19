Vmd.define('hwchart.dialog.BaseProperty', {
    requires: ['hwchart.dialog.FontSeting'],
}, function () {

    var fontSeting = hwchart.dialog.FontSeting;
    /**
    * @constructor
    * @alias module:echarts/chart/helper/SymbolDraw
    * @param {module:zrender/graphic/Group} [symbolCtor]
    */
    function BasePropDialog(chart, params) {
        var me = this;
        this.chart = chart;

        me.titleFontStyle = {
            "fontFamily": "Microsoft YaHei",
            "fontSize": 28,
            "fontWeight": "bold",
            "fontStyle": "normal",
            "color": "#000"
        };

        me.mapInfoFontStyle = {
            "fontSize": 14,
            "fontWeight": "normal",
            "fontFamily": "Simsun",
            "fontStyle": "normal",
            "color": "#000"
        };

        //var model = chart._api.getModel(); // 获取ecModel
        //var series = chart._api.getModel().getSeries(); // 获取序列
        this.options = chart._api.getModel().getOption(); // 获取Model的Option
        if (this.options.title) {
            if (this.options.title.length > 0) {
                me.showTitle = this.options.title[0].show;
                if (this.options.title[0].textStyle) {
                    me.titleFontStyle.fontFamily = this.options.title[0].textStyle.fontFamily;
                    me.titleFontStyle.fontSize = this.options.title[0].textStyle.fontSize;
                    me.titleFontStyle.fontWeight = this.options.title[0].textStyle.fontWeight;
                    me.titleFontStyle.fontStyle = this.options.title[0].textStyle.fontStyle;
                    me.titleFontStyle.color = this.options.title[0].textStyle.color;
                }
            }
        }
        if (this.options.legend) {
            if (this.options.legend.length > 0) {
                me.showLegend = this.options.legend[0].show;
            }
        }
        if (this.options.frameNew) {
            if (this.options.frameNew.length > 0) {
                me.showFrameNew = this.options.frameNew[0].show;
            }
        }
        if (this.options.scale) {
            if (this.options.scale.length > 0) {
                me.showScale = this.options.scale[0].show;
            }
        }
        if (this.options.compass) {
            if (this.options.compass.length > 0) {
                me.showCompass = this.options.compass[0].show;
            }
        }
        if (this.options.mapInfo) {
            if (this.options.mapInfo.length > 0) {
                me.showMapInfo = this.options.mapInfo[0].show;
                if (this.options.mapInfo[0].textStyle) {
                    me.mapInfoFontStyle.fontFamily = this.options.mapInfo[0].textStyle.fontFamily;
                    me.mapInfoFontStyle.fontSize = this.options.mapInfo[0].textStyle.fontSize;
                    me.mapInfoFontStyle.fontWeight = this.options.mapInfo[0].textStyle.fontWeight;
                    me.mapInfoFontStyle.fontStyle = this.options.mapInfo[0].textStyle.fontStyle;
                    me.mapInfoFontStyle.color = this.options.mapInfo[0].textStyle.color;
                }
            }
        }
    }

    var BasePropDialogPro = BasePropDialog.prototype;

    BasePropDialogPro.initWindow = function () {
    }

    // 初始化from表单内容
    BasePropDialogPro.initFormWin = function () {

        var me = this;
        var api = me.chart._api;

        //this.options = api.getModel().getOption(); // 获取Model的Option
        ////var series = chart._api.getModel().getSeries(); // 获取序列
        //if (this.options.title) {
        //    if (this.options.title.length > 0) {
        //        me.showTitle = this.options.title[0].textStyle;
        //    }
        //}
        /*
            *调用字体设置组件
            *@params  chart 实例化对象
            *@params  parent 组件父容器
            *@params  fontStyle 初始文本样式，用于对话框初始化时设置之前的字体样式
        */
        me.titleFontSet = new fontSeting(me.chart, me.form.getContainer("title_font_set"), me.titleFontStyle);
        // 监听文字设置组件的变化
        me.titleFontSet.on('onFontStyleChange', function (font) {
            console.log(font);
            // 获取设置的字体信息，设置到对象上
            //font.fontFamily; // "魏书"
            //font.fontFamil; // "SimHei"
            //font.fontSize; // 字号
            //font.fontStyle; // 斜体
            //font.fontWeight; // 粗体
            //font.color; // 颜色
            // 将获取的修改信息设置到图上
            var basePropOption = {

                "title": {
                    "textStyle": {
                        "fontFamily": font.fontFamily, // "魏书"
                        "fontSize": font.fontSize, // 字号
                        "fontStyle": font.fontStyle, // 斜体
                        "fontWeight": font.fontWeight, // 粗体
                        "color": font.color // 颜色
                    }
                }
            };
            me.chart.setOption(basePropOption);
        });
        me.mapInfoFontSet = new fontSeting(me.chart, me.form.getContainer("mapinfo_font_set"), me.mapInfoFontStyle);
        // 监听文字设置组件的变化
        me.mapInfoFontSet.on('onFontStyleChange', function (font) {
            // 将获取的修改信息设置到图上
            var basePropOption = {

                "mapInfo": {
                    "textStyle": {
                        "fontFamily": font.fontFamily, // "字体"
                        "fontSize": font.fontSize, // 字号
                        "fontStyle": font.fontStyle, // 斜体
                        "fontWeight": font.fontWeight, // 粗体
                        "color": font.color // 颜色
                    }
                }
            };
            me.chart.setOption(basePropOption);
        });

        // 绑定组件的change事件
        me.form.attachEvent("onChange", function (name, value, isCheck) {
            //console.log(name + "/" + value + "/" + isCheck)
            var basePropOption = {};
            if (name === 'showTitle') { // 图名

                var showTitle = me.form.isItemChecked("showTitle"); // 显示图名

                // 将获取的修改信息设置到图上
                basePropOption = {

                    "title": {
                        "show": showTitle
                    }
                };
            }
            else if (name === 'showLegend') {// 显示图例

                var showLegend = me.form.isItemChecked("showLegend"); // 显示图例

                // 将获取的修改信息设置到图上
                basePropOption = {

                    "legend": {
                        "show": showLegend
                    }
                };
            }
            else if (name === 'showFrame') {// 显示图框

                var showFrame = me.form.isItemChecked("showFrame"); // 显示图框

                // 将获取的修改信息设置到图上
                basePropOption = {

                    "frameNew": {
                        "show": showFrame
                    }
                };
            }
            else if (name === 'showScale') {// 显示比例尺

                var showScale = me.form.isItemChecked("showScale"); // 显示比例尺

                // 将获取的修改信息设置到图上
                basePropOption = {

                    "scale": {
                        "show": showScale
                    }
                };
            }
            else if (name === 'showCompass') {// 显示指北针

                var showCompass = me.form.isItemChecked("showCompass"); // 显示指北针

                // 将获取的修改信息设置到图上
                basePropOption = {

                    "compass": {
                        "show": showCompass
                    }
                };
            }
            else if (name === 'showBtxx') {// 显示编图信息

                var showBtxx = me.form.isItemChecked("showBtxx"); // 显示编图信息

                // 将获取的修改信息设置到图上
                basePropOption = {

                    "mapInfo": {
                        "show": showBtxx
                    }
                };
            }
            me.chart.setOption(basePropOption);
        })
    }

    // 获取对话框中设置的数据进行更新
    BasePropDialogPro.save = function () {

        return;
        var me = this;

        var graphName = me.form.getItemValue("graphName"); // 图名
        // setOption
        var btdw = me.form.getItemValue("btdw"); // 编图单位
        var rq = me.form.getItemValue("rq", true); // 日期
        //var value = me.form.getItemValue("rq", true);
        var hzr = me.form.getItemValue("hzr"); // 绘制人
        var bzr = me.form.getItemValue("bzr"); // 编制人
        //var lrr = me.form.getItemValue("lrr"); // 录入人
        var shr = me.form.getItemValue("shr"); // 审核人
        var btxx = "编图单位：" + btdw + "   " + "绘制人：" + hzr + "   "
            + "编制人：" + bzr + "   "
            + "审核人：" + shr + "   " + "日期：" + rq;
        //var btxx = "编图单位：" + btdw + "   " + "绘制人：" + hzr + "   "
        //    + "编制人：" + bzr + "   " + "录入人：" + lrr + "   "
        //    + "审核人：" + shr + "   " + "日期：" + rq;

        var showTitle = me.form.isItemChecked("showTitle"); // 显示图名
        var showLegend = me.form.isItemChecked("showLegend"); // 显示图例
        var showFrame = me.form.isItemChecked("showFrame"); // 显示图框
        var showScale = me.form.isItemChecked("showScale"); // 显示比例尺
        var showCompass = me.form.isItemChecked("showCompass"); // 显示指北针
        var showBtxx = me.form.isItemChecked("showBtxx"); // 显示编图信息

        // 字体信息的获取，先获取默认字体信息，然后再获取设置的字体信息
        // 将获取的修改信息设置到图上
        var basePropOption = {

            "title": {
                "text": graphName,
                "show": showTitle,
                "textStyle": {
                    "color": '#000',
                    "fontFamily": "微软雅黑",
                    "fontSize": 24,
                    "fontWeight": "bold",
                    "fontStyle": "normal" // 斜体/下划线
                }
            },
            "legend": {
                "show": showLegend
            },
            "frameNew": {
                "show": showFrame
            },
            "scale": {
                "show": showScale
            },
            "compass": {
                "show": showCompass
            },
            "mapInfo": {
                "text": btxx,
                "show": showBtxx,
                "values": {
                    "btdw": btdw,
                    "hzr": hzr,
                    "bzr": bzr,
                    //"lrr": lrr,
                    "shr": shr,
                    "rq": rq
                },
                "textStyle": {
                    "color": '#000',
                    "fontFamily": "Simsun",
                    "fontSize": 12,
                    "fontWeight": "normal",
                    "fontStyle": "normal" // 斜体/下划线
                }
            }
        };
        me.chart.setOption(basePropOption);
    }

    BasePropDialogPro.cancel = function () {

        var me = this;

        var showTitle = true;
        if (me.showTitle != undefined) {
            showTitle = me.showTitle;
        }
        var showLegend = true;
        if (me.showLegend != undefined) {
            showLegend = me.showLegend;
        }
        var showFrameNew = true;
        if (me.showFrameNew != undefined) {
            showFrameNew = me.showFrameNew;
        }
        var showScale = true;
        if (me.showScale != undefined) {
            showScale = me.showScale;
        }
        var showCompass = true;
        if (me.showCompass != undefined) {
            showCompass = me.showCompass;
        }
        var showMapInfo = true;
        if (me.showMapInfo != undefined) {
            showMapInfo = me.showMapInfo;
        }

        // 字体信息的获取，先获取默认字体信息，然后再获取设置的字体信息
        // 将获取的修改信息设置到图上
        var basePropOption = {

            "title": {
                "show": showTitle,
                "textStyle": {
                    "fontFamily": me.titleFontStyle.fontFamily, // "魏书"
                    "fontSize": me.titleFontStyle.fontSize, // 字号
                    "fontStyle": me.titleFontStyle.fontStyle, // 斜体
                    "fontWeight": me.titleFontStyle.fontWeight, // 粗体
                    "color": me.titleFontStyle.color // 颜色
                }
            },
            "legend": {
                "show": showLegend
            },
            "frameNew": {
                "show": showFrameNew
            },
            "scale": {
                "show": showScale
            },
            "compass": {
                "show": showCompass
            },
            "mapInfo": {
                "show": showMapInfo,
                "textStyle": {
                    "fontFamily": me.mapInfoFontStyle.fontFamily, // "魏书"
                    "fontSize": me.mapInfoFontStyle.fontSize, // 字号
                    "fontStyle": me.mapInfoFontStyle.fontStyle, // 斜体
                    "fontWeight": me.mapInfoFontStyle.fontWeight, // 粗体
                    "color": me.mapInfoFontStyle.color // 颜色
                }
            }
        };
        me.chart.setOption(basePropOption);
    }

    BasePropDialogPro.getStettings = function () {
        var me = this;
        var opt = me.chart.getOption(); // 获取chart中的Option，其中包括所有序列

        var titleText = "等值图";
        if (opt.title.length > 0) {
            titleText = opt.title[0].text;
        }

        var btdw = "东营汉威"; // 编图单位
        var rq = "2019-11-30"; // 日期
        var hzr = "XXX"; // 绘制人
        var bzr = "XXX"; // 编制人
        //var lrr = "XXX"; // 录入人
        var shr = "XXX"; // 审核人
        if (opt.mapInfo.length > 0) {
            btdw = opt.mapInfo[0].values.btdw; // 编图单位
            rq = opt.mapInfo[0].values.rq; // 日期
            hzr = opt.mapInfo[0].values.hzr; // 绘制人
            bzr = opt.mapInfo[0].values.bzr; // 编制人
            //lrr = opt.mapInfo[0].values.lrr; // 录入人
            shr = opt.mapInfo[0].values.shr; // 审核人
        }

        var showTitle = true; // 显示图名
        var showLegend = true; // 显示图例
        var showFrame = true; // 显示图框
        var showScale = true; // 显示比例尺
        var showCompass = true; // 显示指北针
        var showMapInfo = true; // 显示编图信息
        if (opt.title.length > 0) { showTitle = opt.title[0].show; } // 显示图名 
        if (opt.legend.length > 0) { showLegend = opt.legend[0].show; } // 显示图例 
        // if (opt.frame.length > 0) { showFrame = opt.frame[0].show; } // 显示图框 
        if (opt.scale.length > 0) { showScale = opt.scale[0].show; } // 显示比例尺 
        if (opt.compass.length > 0) { showCompass = opt.compass[0].show; } // 显示指北针 
        if (opt.mapInfo.length > 0) { showMapInfo = opt.mapInfo[0].show; } // 显示编图信息 

        var form = [
             {
                 type: "fieldset", label: "图名", className: "dialog_seporator", width: 635, offsetLeft: 10, offsetTop: 10, list: [
                    { type: "input", name: "graphName", width: 518, labelWidth: 40, label: "名称：", value: titleText, offsetLeft: 22 },
                    //{ type: "newcolumn" },
                    //{ type: "button", name: "graphNameFont", width: 60, value: "字体...", className: 'sec-bnt', offsetLeft: 0, offsetTop: 0 },
                    //{ type: "newcolumn" },
                    { type: "container", name: "title_font_set", inputHeight: 40, inputWidth: 180, offsetLeft: 0 }
                 ]
             },
             {
                 type: "fieldset", label: "编图信息", className: "dialog_seporator", width: 635, offsetLeft: 10, offsetTop: -15, list: [

                    // "编图单位：东营汉威    绘制人：XXX    编制人：XXX    录入人：XXX    审核人：XXX    日期：2019-11-30"
                    { type: "input", name: "btdw", width: 216, labelWidth: 70, label: "编图单位：", labelAlign: "right", value: btdw, offsetLeft: 0, offsetRight: 15 },
                    { type: "newcolumn" },
                     { type: "calendar", name: "rq", width: 216, labelWidth: 60, label: "日期：", labelAlign: "right", dateFormat: "%Y-%m-%d", value: rq, offsetLeft: 15 },
                    //{ type: "input", name: "rq", width: 240, labelWidth: 40, label: "日期", labelAlign: "right", value: "2019-11-30", offsetLeft: 15 },
                    { type: "newcolumn" },
                    { type: "input", name: "hzr", width: 216, labelWidth: 70, label: "绘制人：", labelAlign: "right", value: hzr, offsetLeft: 0 },
                    { type: "newcolumn" },
                    { type: "input", name: "bzr", width: 216, labelWidth: 60, label: "编制人：", labelAlign: "right", value: bzr, offsetLeft: 15 },
                    { type: "newcolumn" },
                    //{ type: "input", name: "lrr", width: 210, labelWidth: 70, label: "录入人：", labelAlign: "right", value: lrr, offsetLeft: 0 },
                    //{ type: "newcolumn" },
                    { type: "input", name: "shr", width: 216, labelWidth: 70, label: "审核人：", labelAlign: "right", value: shr, offsetLeft: 0 },
                    //{ type: "newcolumn" },
                    //{ type: "button", name: "btxxFont", width: 60, value: "字体...", className: 'sec-bnt', offsetLeft: 226, offsetTop: 10 },
                    //{ type: "newcolumn" },
                    { type: "container", name: "mapinfo_font_set", inputHeight: 40, inputWidth: 520, offsetLeft: 8 }
                 ]
             },
             {
                 type: "fieldset", label: "显示控制", className: "dialog_seporator", width: 635, offsetLeft: 10, offsetTop: 0, list: [
                    { type: "checkbox", name: "showTitle", value: "r1", label: "图名", position: "label-right", checked: showTitle, offsetLeft: 0 },
                    { type: "newcolumn" },
                    { type: "checkbox", name: "showLegend", value: "r1", label: "图例", position: "label-right", checked: showLegend, offsetLeft: 35 },
                    { type: "newcolumn" },
                    { type: "checkbox", name: "showFrame", value: "r1", label: "图框", position: "label-right", checked: showFrame, offsetLeft: 35 },
                    { type: "newcolumn" },
                    { type: "checkbox", name: "showScale", value: "r1", label: "比例尺", position: "label-right", checked: showScale, offsetLeft: 35 },
                    { type: "newcolumn" },
                    { type: "checkbox", name: "showCompass", value: "r1", label: "指北针", position: "label-right", checked: showCompass, offsetLeft: 35 },
                    { type: "newcolumn" },
                    { type: "checkbox", name: "showBtxx", value: "r1", label: "编图信息", position: "label-right", checked: showMapInfo, offsetLeft: 35 }
                 ]
             }
        ];

        return form;
    }

    hwchart.dialog.BaseProperty = BasePropDialog
})


//javascript 日期转换为中文
function CNDateString(date) {
    var cn = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var s = [];
    var YY = date.getFullYear().toString();
    for (var i = 0; i < YY.length; i++)
        if (cn[YY.charAt(i)])
            s.push(cn[YY.charAt(i)]);
        else
            s.push(YY.charAt(i));
    s.push("年");
    var MM = date.getMonth();
    if (MM < 10)
        s.push(cn[MM]);
    else if (MM < 20)
        s.push("十" + cn[MM % 10]);
    s.push("月");
    var DD = date.getDate();
    if (DD < 10)
        s.push(cn[DD]);
    else if (DD < 20)
        s.push("十" + cn[DD % 10]);
    else
        s.push("二十" + cn[DD % 10]);
    s.push("日");
    return s.join('');
}