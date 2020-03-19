/*
 filename：dhtmlxgrid_excell_dhxcalendar_ext_tb.js
 creater：
 date created：2016.11.19
 description：
 date modified：2017.09.07
 modifier：刘志伟
 version：2.2.10.0907
 others：
 copyright：Copyright @1999-2016, hwkj, All Rights Reserved
 */
/**
 * Created with JetBrains WebStorm.
 * User: LIU
 * Date: 2018-05-03
 * Time: 10:32
 * *  Version 6.1.0.0
 *  1、更新内核
 * *  Version 5.0.14.2
 *  1、增加上中下旬支持
 *  2、新增多组曲线纵轴对齐功能
 *  3、多组图表支持高度、宽度独自设置
 * *  Version 5.0.14.1
 *  1、更新内核
 * *  Version 4.2.6.2
 *  1、添加分段选择功能
 *  * Version 4.2.6.1
 *  1、更新内核
 *  2、添加序列阴影接口
 *  * Version 4.2.5.5
 * 1、修复数据查看中编辑数据后曲线不发生变化的问题；
 * 2、添加只有选中线后点才能选中的功能；
 * 3、线设置对话框中添加间隔和小数位设置；
 *  * Version 4.2.5.4
 * 1、解决当某个序列没有值时数据查看窗口中数据错位的问题；
 * Version 4.2.5.3
 * 1、添加伞状图
 * Version 4.2.5.2
 * 1、添加坐标轴流布局功能
 * 2、修复导出的图片不显示某些特殊字符的问题
 * 3、修改导出图片名称默认为曲线图标题
 * Version 4.2.5.1
 * 1、内核升级
 * 2、添加坐标轴间断接口
 * 3、添加序列中断接口
 * Version 4.2.3.3
 * 1、修复右键菜单乱码问题
 * Version 4.2.3.2
 * 添加删除异常点功能
 * Version 4.2.3.1
 * 1、添加十字星标记样式
 * Version 4.2.1.4
 * 1、添加设置导航条显示曲线的接口
 */

(function () {
    var bootPath = CreateJSPath("hwAPI.js",-1);
    var pBootPath = CreateJSPath("hwAPI.js",-2);
    var needDhtmlx = true; //是否需要加载dhtmlx
    var hasContextMenu = false; //是否有右键菜单
    var dhtmlxLoaded = false; //标记是否已经加载过dhtmlx
    var dhxVersion = "5";
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    if(!ContainsJS("json2.js")){
        document.write("<script src=\"" + bootPath + "/libs/json/json2.js\"></script>");
    }
    // if(!ContainsJS("LAB.src.js")){
    //     document.write("<script src=\"" + bootPath + "/libs/LAB.src.js\"></script>");
    // }
    if(!ContainsJS("hwstock.src.js")){
        document.write("<script src=\"" + bootPath + "/js/hwstock.src.js\"></script>");
    }
    if(!ContainsJS("hwcharts-more.src.js")){
        document.write("<script src=\"" + bootPath + "/js/hwcharts-more.src.js\"></script>");
    }
    if(!ContainsJS("hwcharts-plugin.src.js")){
        document.write("<script src=\"" + bootPath + "/js/hwcharts-plugin.src.js\"></script>");
    }
	if(!ContainsJS("xrange.src.js")){
	    document.write("<script src=\"" + bootPath + "/js/modules/xrange.src.js\"></script>");
	}
    if(!ContainsJS("data.src.js")){
        document.write("<script src=\"" + bootPath + "/js/modules/data.src.js\"></script>");
    }
    if(ContainsJS("hwApiEX.js")){
        dhtmlxLoaded = true;
    }
	if(!ContainsJS("hwChartApi.src.js")){
	    document.write("<script src=\"" + bootPath + "/js/hwChartApi.src.js\"></script>");
	}

    var ieMode = getIEDocumentMode();
    if(ieMode && ieMode < 9){
        document.write("<script src=\"" + bootPath + "/js/modules/oldie.src.js\"></script>");
    }



    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓通用函数↓↓↓↓↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 去除字符串两端的空白字符
     * @returns {*|string}
     */
    String.prototype.trim = function() {
        var r = this.replace(/(^\s*)|(\s*$)/g, "");
        return r;
    };

    /**
     * rgb颜色转16进制
     * @param rgbColor
     */
    function rgbToHex(rgbColor){
        if(!rgbColor){
            return;
        }
        var rgbArr = rgbColor.match(/\d+/g);
        return "#" + pad(parseInt(rgbArr[0]).toString(16), 2) + pad(parseInt(rgbArr[1]).toString(16), 2) + pad(parseInt(rgbArr[2]).toString(16), 2);
    };

    /**
     * 获取数组中某个元素
     * @param arr
     * @param fn
     * @param context
     * @returns {*}
     */
    function array_getElement(arr, fn, context){
        if (typeof fn === "function") {
            for (var k = 0, length = arr.length; k < length; k++) {
                if (fn.call(context, arr[k], k, arr)) {
                    return arr[k]
                }
            }
            return null;
        }
    };

    /**
     * 映射数组中的每一个元素
     * @param arr
     * @param fn
     * @param context
     * @returns {Array}
     */
    function array_map(arr, fn, context){
        var arr_tmp = [];
        if (typeof fn === "function") {
            for (var k = 0, length = arr.length; k < length; k++) {
                arr_tmp.push(fn.call(context, arr[k], k, arr));
            }
        }
        return arr_tmp;
    }

    /**
     * 过滤数组中的元素
     * @param arr
     * @param fn
     * @param context
     * @returns {Array}
     */
    function array_filter(arr, fn, context){
        var arr_tmp = [];
        if (typeof fn === "function") {
            for (var k = 0, length = arr.length; k < length; k++) {
                fn.call(context, arr[k], k, arr) && arr_tmp.push(arr[k]);
            }
        }
        return arr_tmp;
    }

    /**
     * 以逗号分割的字符串转换成数组
     * @param str
     */
    function array_fromString(str, type){
        if(str == undefined || str == null){
            return undefined;
        }
        var array = array_filter(str.split(","), function(v){return v != ""}, null);
        return array_map(array, function(v){
            switch (type){
                case "number":
                    return parseInt(v,10);
                    break;
                default :
                    return v;
                    break;
            }
        }, null);
    };

    /**
     * 以指定的格式格式化数组中的每个元素
     * @param str
     */
    function array_format(arr, format){
        if (/(YYYY|MM|DD|HH|MI|SS)/i.test(format)) {
            return array_map(arr, function(v){
                return date_getMillisecond(v)
            }, null);
        }
        else if (isNumber(format) && parseInt(format,10) >= 0) {
            return array_map(arr, function (v) {
                if(v === undefined ||  v === '' ||  v === null){
                    return null;
                }
                else{
                    return parseFloat(v);
                }
            }, null);
        }
        else {
            return array_map(arr, function(v){
                return v;
            }, null);
        }

    };

    /**
     * 日期格式处理函数
     * @param strDateTimeFormat
     * @returns {undefined}
     */
    function dateFormat_fromString(strDateTimeFormat){
        if(strDateTimeFormat == undefined || strDateTimeFormat == null){
            return undefined;
        }
        var dateTimeArray = array_filter(strDateTimeFormat.split(","), function(v){return v != ""}, null);
        dateTimeArray = array_map(dateTimeArray, function(v){return date_replace_dateFormat(v.trim())}, null);
        var dateTimeFormat = {};
        dateTimeArray[0] && (dateTimeFormat.year = dateTimeArray[0]);
        dateTimeArray[1] && (dateTimeFormat.month = dateTimeArray[1]);
        dateTimeArray[2] && (dateTimeFormat.week = dateTimeArray[2]);
        dateTimeArray[3] && (dateTimeFormat.day = dateTimeArray[3]);
        dateTimeArray[4] && (dateTimeFormat.hour = dateTimeArray[4]);
        dateTimeArray[5] && (dateTimeFormat.minute = dateTimeArray[5]);
        dateTimeArray[6] && (dateTimeFormat.second = dateTimeArray[6]);
        dateTimeArray[7] && (dateTimeFormat.millisecond = dateTimeArray[7]);
        return dateTimeFormat;
    };

    /**
     * 处理日期字符串返回毫秒值
     * @param sDate
     * @returns {*}
     */
    function date_getMillisecond(sDate){
        var year, month, day, hour, minute, second, milliseconds = 0;
        sDate += "";
        sDate = sDate.replace(/\//g,"-");

        //2014-1-20 8:50:00
        if(/\d{4}(-\d{1,2}){1,2}\s{1,}\d{1,2}(:\d{1,2}){1,2}(\.\d+){0,1}/.test(sDate)){
            var date_time_arr = array_filter(sDate.split(/\s+/), function(v){return v != null}, null);
            var date_arr = array_map(date_time_arr[0].split("-"), function(v){return parseInt(v.trim(),10)}, null);
            var time_arr = array_map(date_time_arr[1].split(":"), function(v){return parseInt(v.trim(),10)}, null);

            year = date_arr[0];
            month = date_arr[1];
            day = date_arr[2];

            hour = time_arr[0];
            minute = time_arr[1];
            second = time_arr[2];

            if(sDate.indexOf(".") != -1){
                milliseconds = parseInt(sDate.split(".")[1], 10);
            }
        }

        //11-MAY-15 20:52:48.0 日-月-年 时:分:秒.毫秒
        else if(/\d{1,2}-([a-zA-Z]+)-\d{2,4}\s{1,}\d{1,2}(:\d{1,2}){2}(\.\d+){0,1}/.test(sDate)){

            var monthsMap = {'january':1,'february':2, 'march':3, 'april':4, 'may':5, 'june':6, 'july':7,
                'august':8, 'september':9, 'october':10, 'november':11, 'december':12,
                'jan':1, 'feb':2, 'mar':3, 'apr':4, 'may':5, 'jun':6, 'jul':7, 'aug':8, 'sep':9, 'oct':10, 'nov':11, 'dec':12}
            var date_time_arr = array_filter(sDate.split(/\s+/), function(v){return v != null}, null);
            var date_arr = array_map(date_time_arr[0].split("-"), function(v){return v.trim()}, null);

            year = parseInt(date_arr[2].length == 2 ? ("20" + date_arr[2]) : date_arr[2], 10);
            month = monthsMap[date_arr[1].toLowerCase()];
            day = parseInt(date_arr[0]);

            var time_arr = array_map(date_time_arr[1].split(":"), function(v){return parseInt(v.trim(),10)}, null);
            hour = time_arr[0];
            minute = time_arr[1];
            second = time_arr[2];

            if(sDate.indexOf(".") != -1){
                milliseconds = parseInt(sDate.split(".")[1], 10);
            }
        }

        //2014-1-20
        else if(/\d{4}(-\d{1,2}){1,2}/.test(sDate)){
            var date_arr = array_map(sDate.split("-"), function(v){return parseInt(v.trim(),10)}, null);

            year = date_arr[0];
            month = date_arr[1];
            day = date_arr[2];
        }

        //8:50:00
        else if(/\d{1,2}(:\d{1,2}){1,2}(\.\d+){0,1}/.test(sDate)){
            var time_arr = array_map(sDate.split(":"), function(v){return parseInt(v.trim(),10)}, null);
            hour = time_arr[0];
            minute = time_arr[1];
            second = time_arr[2];
            if(sDate.indexOf(".") != -1){
                milliseconds = parseInt(sDate.split(".")[1], 10);
            }
        }

        //毫秒值 1390176000000
        else if(/\d{10,}/.test(sDate)){
            return parseInt(sDate,10);
        }

        //20140120 || 2014 || 201401
        else if(/\d{4,8}/.test(sDate)){
            year = parseInt(sDate.substr(0, 4),10);
            month = parseInt(sDate.substr(4, 2),10);
            day = parseInt(sDate.substr(6, 2),10);
        }
        else if (sDate == "0") {
            return 0;
        }
        //日期格式不正确
        else{
            alert("日期格式不正确");
            return;
        }

        //修正年月日
        year = isNaN(year) ? 2000 : year;
        month = isNaN(month) ? 1 : month;
        day = isNaN(day) ? 1 : day;

        //修正时分秒
        hour = isNaN(hour) ? 0 : hour;
        minute = isNaN(minute) ? 0 : minute;
        second = isNaN(second) ? 0 : second;

        return Date.UTC(year, month - 1, day, hour, minute, second, milliseconds);
    };

    function date_getFormatDate(millisecond, format) {
        if(!/\d{10,}/.test(millisecond)){
            return "";
        }
        format = format || "YYYY-mm-dd hh:mi:ss.ms";
        var date = new Date(parseInt(millisecond));
        return format
            .replace(/YYYY/i, date.getFullYear())
            .replace(/YY/i, date.getFullYear().toString().substr(2, 2))
            .replace(/MM/g, pad(date.getUTCMonth() + 1))
            .replace(/mm/g, date.getUTCMonth() + 1)
            .replace(/DD/i, date.getUTCDate())
            .replace(/HH/i, date.getUTCHours())
            .replace(/MI/i, date.getUTCMinutes())
            .replace(/SS/i, date.getUTCSeconds())
            .replace(/MS/i, date.getUTCMilliseconds());
    };

    /**
     * 替換日期格式字符串，將yyyy替換成%Y
     * @param sDateFormat
     */
    function date_replace_dateFormat(sDateFormat){
        return sDateFormat
            .replace(/YYYY/i, '%Y')
            .replace(/YY/i, '%y')
            .replace(/MM/g, '%m')
            .replace(/mm/g, "%n")
            .replace(/AA/g, "%A")
            .replace(/aa/g, "%a")
            .replace(/ww/g, "%w")
            .replace(/DD/i, '%e')
            .replace(/TT/i, '%t')
            .replace(/HH/i, '%H')
            .replace(/MI/i, '%M')
            .replace(/SS/i, '%S')
            .replace(/MS/i, '%L')
    };

    /**
     * 获得字体粗细所对应的数值
     * @param sWeight
     * @returns {*}
     */
    function font_getWeight(sWeight){
        if (sWeight == 'bold') {
            return 700;
        }
        else if (sWeight == 'normal') {
            return 400;
        }
        else{
            return parseInt(sWeight, 10);
        }
    }

    /**
     * 将字体样式字符串格式化成字体样式对象，按照字体、大小、颜色、粗细的顺序以逗号分隔
     * @param sStyle
     * @returns {{}}
     */
    function font_formatStyle(sStyle){
        if(!sStyle){
            return undefined;
        }
        var fontStyleArr = array_map(sStyle.split(','), function (v) { return v.trim() }, null);
        var fontStyle = {};
        var cursor = 0;
        if(!isNaN(parseInt(fontStyleArr[0],10))){
            cursor = -1;
        }
        fontStyleArr[cursor + 0] && (fontStyle.fontFamily = fontStyleArr[cursor + 0]);
        fontStyleArr[cursor + 1] && (fontStyle.fontSize = parseInt(fontStyleArr[cursor + 1],10) + 'px');
        fontStyleArr[cursor + 2] && (fontStyle.color = color_format(fontStyleArr[cursor + 2]));
        fontStyleArr[cursor + 3] && (fontStyle.fontWeight = font_getWeight(fontStyleArr[cursor + 3]));
        return fontStyle;
    }

    /**
     * 将输入的颜色字符串格式化成rgb格式或者十六进制格式
     * @param sColor
     * @returns {*}
     */
    function color_format(sColor){
        //中英文颜色映射
        var colorsMap = {
            navy: 'rgb(0,0,128)',
            olive: 'rgb(128,128,0)',
            orange: 'rgb(255,165,0)',
            silver: 'rgb(192,192,192)',
            white: 'rgb(255,255,255)',
            gold: 'rgb(255,215,0)',
            lime: 'rgb(0,255,0)',
            fuchsia: 'rgb(255,0,255)',
            aqua: 'rgb(0,255,255)',
            green: 'rgb(0,128,0)',
            gray: 'rgb(80,80,80)',
            red: 'rgb(255,0,0)',
            blue: 'rgb(0,0,255)',
            pink: 'rgb(255,192,203)',
            purple: 'rgb(128,0,128)',
            yellow: 'rgb(255,255,0)',
            maroon: 'rgb(128,0,0)',
            black: 'rgb(0,0,0)',
            azure: 'rgb(240,255,255)',
            beige: 'rgb(245,245,220)',
            brown: 'rgb(165,42,42)',
            cyan: 'rgb(0,255,255)',
            darkblue: 'rgb(0,0,139)',
            darkcyan: 'rgb(0,139,139)',
            darkgrey: 'rgb(169,169,169)',
            darkgreen: 'rgb(0,100,0)',
            darkkhaki: 'rgb(189,183,107)',
            darkmagenta: 'rgb(139,0,139)',
            darkolivegreen: 'rgb(85,107,47)',
            darkorange: 'rgb(255,140,0)',
            darkorchid: 'rgb(153,50,204)',
            darkred: 'rgb(139,0,0)',
            darksalmon: 'rgb(233,150,122)',
            darkviolet: 'rgb(148,0,211)',
            indigo: 'rgb(75,0,130)',
            khaki: 'rgb(240,230,140)',
            lightblue: 'rgb(173,216,230)',
            lightcyan: 'rgb(224,255,255)',
            lightgreen: 'rgb(144,238,144)',
            lightgrey: 'rgb(211,211,211)',
            lightpink: 'rgb(255,182,193)',
            lightyellow: 'rgb(255,255,224)',
            magenta: 'rgb(255,0,255)',
            violet: 'rgb(128,0,128)'
        };
        //颜色未定义时不会设置属性
        if(sColor === undefined){
            return undefined;
        }
        //rgba(255 255 255)-->#FFFFFF  通过接口设置多个颜色时用逗号分隔，如"rgba(255 0 0),rgba(0 255 0)"，而程序中识别的格式为rgba(255,255,255),所以需要转换一下
        else if (/^rgba\((\d{1,3}\s+){2}\d{1,3}\)/.test(sColor)) {
            return rgbToHex(sColor);
        }
        //rgb(255 255 255)-->#FFFFFF
        else if (/^rgb\((\d{1,3}\s+){2}\d{1,3}\)/.test(sColor)) {
            return rgbToHex(sColor);
        }
        //"255 255 255"-->#FFFFFF
        else if (/^(\d{1,3}\s+){2}\d{1,3}/.test(sColor)) {
            return rgbToHex(sColor);
        }
        //"#FFFFFF"格式不转换
        else if (/^#\w{6}/.test(sColor)) {
            return sColor;
        }
        //"0xFFFFFF"-->#FFFFFF
        else if (/^0x\w{6}/.test(sColor)) {
            return sColor.replace('0x', '#');
        }
        //汉字或英文所表示的颜色转换成rgb格式
        else if (colorsMap[sColor]) {
            return rgbToHex(colorsMap[sColor]);
        }
        //十进制颜色转换成十六进制
        else if (/^\d+$/.test(sColor)) {
            return '#' + pad(parseInt(sColor).toString(16), 6);
        }
        else {
            return sColor;
        }
    };

    /**
     * 格式化一个数值，不是数值返回null
     * @param sNumber
     */
    function number_format(sNumber){
        if(sNumber === null){
            return null;
        }
        else if(sNumber === undefined){
            return undefined;
        }
        else if(isString(sNumber) && sNumber.indexOf("%") != -1){
            return sNumber;
        }
        return isNaN(parseFloat(sNumber)) ? undefined : parseFloat(sNumber);
    };

    /**
     * 将数值补齐到length长度
     * @param number
     * @param length
     * @returns {string}
     */
    function pad(number, length) {
        // Create an array of the remaining length +1 and join it with 0's
        return new Array((length || 2) + 1 - String(number).length).join(0) + number;
    };

    /**
     * 根据x、y、z字段的名称生成数据数组，zName在范围曲线图中起作用
     * @param datas
     * @param xName
     * @param yName
     * @param zName
     * @returns {*}
     */
    function generatePointArray(datas, xName, yName, zName, xFormat, yFormat){
        var x_dataObj = array_getElement(datas,
            function(v) {return v.name == xName.trim()},
            null
        );

        if(x_dataObj == null){
            return null;
            alert('x轴字段（'+xName+'）数据不存在！');
        }

        var y_dataObj = array_getElement(datas,
            function(v) {return v.name == yName.trim()},
            null
        );

        if(y_dataObj == null){
            return null;
            alert('不存在该字段的数据：' + yName);
        }

        //曲线图不属于范围图
        if(!zName){
            var n = Math.min((x_dataObj.process_data && x_dataObj.process_data.length) || 0, (y_dataObj.process_data && y_dataObj.process_data.length) || 0);
            if(/(YYYY|MM|DD|HH|MI|SS|%Y|%y|%b|%n|%e|%H|%M|%S|%L)/i.test(x_dataObj.format) || (isNumber(x_dataObj.format) && (x_dataObj.format >= 0 || x_dataObj.format != -1))
                || /(YYYY|MM|DD|HH|MI|SS|%Y|%y|%b|%n|%e|%H|%M|%S|%L)/i.test(xFormat) || (isNumber(xFormat) && (parseInt(xFormat, 10) >= 0 || parseInt(xFormat, 10) != -1))){
                var dataArr = [];
                dataArr.y_format = y_dataObj.format;
                for(var i = 0; i < n; i++){
                    var pArr = [x_dataObj.process_data[i], y_dataObj.process_data[i]];
                    dataArr.push(pArr)
                }
                return dataArr;
            }
            else{
                if(y_dataObj.process_data){
                    y_dataObj.process_data.y_format = y_dataObj.format;
                    return y_dataObj.process_data;
                }
                return [];
            }
        }
        //范围图：如arearange,columnrange等
        else{
            var range_dataObj = array_getElement(datas,
                function(v) {return v.name == zName.trim()},
                null
            );

            if(range_dataObj == null){
                return null;
                alert('不存在该字段的数据：' + zName);
            }

            var n = Math.min(x_dataObj.process_data.length, y_dataObj.process_data.length, range_dataObj.process_data.length);
            var dataArr = [];
            dataArr.y_format = y_dataObj.format;
            if(/(YYYY|MM|DD|HH|MI|SS)/i.test(x_dataObj.format) || (isNumber(x_dataObj.format) && x_dataObj.format >= 0)){
                for(var i = 0; i < n; i++){
                    var pArr = [x_dataObj.process_data[i], y_dataObj.process_data[i], range_dataObj.process_data[i]];
                    dataArr.push(pArr)
                }
                return dataArr;
            }
            else{
                for(var i = 0; i < n; i++){
                    var pArr = [y_dataObj.process_data[i], range_dataObj.process_data[i]];
                    dataArr.push(pArr)
                }
                return dataArr;
            }
        }
    };

    function encode (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    function decode (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    function _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    function _utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓接口对象构造方法↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 构造方法
     * @param options
     * @param isMulti 是否创建多组图表
     * @constructor
     */
    function Chart(options, isMulti) {
        this.init.apply(this, arguments);
    };

    Chart.prototype = {
        date_getMillisecond: date_getMillisecond,
        date_getFormatDate: date_getFormatDate,

        isObject :isObject,
        isString :isString,
        isArray :isArray,
        isNumber :isNumber,

        getBrowserType: getBrowserType,
        getIEDocumentMode: getIEDocumentMode,

        /**
         * Initialize the chart
         */
        init: function (userOptions, type, callback) {
            var chart = this;

//            getDhtmlxWindow();
            //增长变量，用于生成多个对象的id，比如坐标轴的id
            chart.s_inc = 0;  //序列id增长变量
            chart.x_inc = 0;  //x轴id增长变量
            chart.y_inc = 0;  //y轴id增长变量

            //存储所有序列的数据，包括序列名，序列原始数据，及根据数据格式处理后的数据，数据形式为一维数组，示例如下[{name:"series1",format:"1",original_data:[1,2,3],process_data:[1.0,2.0,3.0]}]
            chart.allSeriesData = [];
            chart.allSeriesData.generatePointArray = generatePointArray;

            if(userOptions && userOptions.exporting){
                if(userOptions.exporting.dataPath){
                    userOptions.exporting.dataPath = decode(userOptions.exporting.dataPath);
                }
                if(userOptions.exporting.chartTitle){
                    userOptions.exporting.chartTitle = decode(userOptions.exporting.chartTitle);
                }
                if(userOptions.exporting.strFields){
                    userOptions.exporting.strFields = decode(userOptions.exporting.strFields);
                }
                if(userOptions.exporting.strData){
                    userOptions.exporting.strData = decode(userOptions.exporting.strData);
                }
                if(userOptions.exporting.strFormats){
                    userOptions.exporting.strFormats = decode(userOptions.exporting.strFormats);
                }
            }


            if(type && type.toLowerCase() == "m"){
                chart.isMultiCharts = true;
                if(userOptions){
                    chart.multiChartsOptions = userOptions;
                    if(userOptions.charts){
                        for(var i = 0; i < userOptions.charts.length; i++){
                            var c = userOptions.charts[i];
                            if(!c.series){
                                break;
                            }
                            for(var j = 0; j < c.series.length; j++){
                                var s = c.series[j];
                                chart.addDataToAllSeriesData(c,s,j);
                            }
                        }
                    }
                }
                else {
                    chart.multiChartsOptions = {};
                }
                chart.multiChartsOptions.allSeriesData = chart.allSeriesData;

                //曲线所需的模块数组
                chart.modules = chart.multiChartsOptions.modules = chart.multiChartsOptions.modules || [];

                //全局对象，colors,symbols,lang(loading,months,shortMonths,weekdays,decimalPoint,numericSymbols,resetZoom,resetZoomTitle,thousandsSep),global
                chart.globalOptions = chart.multiChartsOptions.globalOptions = chart.multiChartsOptions.globalOptions || {};

                chart.loadFile(bootPath + "/js/hwcharts-multi.src.js");
            }
            else{
                if(userOptions){
                    chart.options = userOptions;
                    if(userOptions.series){
                        for(var j = 0; j < userOptions.series.length; j++){
                            var s = userOptions.series[j];
                            chart.addDataToAllSeriesData(userOptions, s, j);
                        }
                    }
                }
                else {
                    chart.options = {};
                }
                chart.options.allSeriesData = chart.allSeriesData;

                chart.modules = chart.options.modules = chart.options.modules || [];
                chart.globalOptions = chart.options.globalOptions = chart.options.globalOptions || {};
            }
        },

        //设置options对象中属性的值
        set: function (n, v) {
            if(v === undefined || v === null){
                return;
            }
            var A = n.split("."), L = A.length - 1, V = this;
            for (var i = 0; i < L; i++) {
                if (!V[A[i]])
                    V[A[i]] = {};
                V = V[A[i]];
            }
            V[A[L]] = v;
            return v;
        },

        //获取options对象中属性的值
        get: function (n) {
            var A = n.split("."), V = this[A[0]];
            for (var i = 1; i < A.length; i++) {
                if (!V)
                    return null;
                V = V[A[i]];
            }
            return V;
        },

        getLineStyle: function (style) {
            if(style === undefined){
                return undefined;
            }
            style += "";
            switch (style) {
                case '1':
                    return 'ShortDash';
                case '2':
                    return 'ShortDot';
                case '3':
                    return 'ShortDashDot';
                case '4':
                    return 'ShortDashDotDot';
                case '5':
                    return 'Dot';
                case '6':
                    return 'Dash';
                case '7':
                    return 'LongDash';
                case '8':
                    return 'DashDot';
                case '9':
                    return 'LongDashDot';
                case '10':
                    return 'LongDashDotDot';
                default:
                    return 'Solid';
            }
        },

        getMarkerStyle: function (style) {
            if(style === undefined){
                return undefined;
            }
            switch (style) {
                case '-1':
                case '0':
                    return 'circle';
                case '1':
                    return 'square';
                case '2':
                    return 'diamond';
                case '3':
                    return 'triangle';
                case '4':
                    return 'triangle-down';
                case '5':
                    return 'cross';
                case '6':
                    return 'xcross';
                default:
                    return style;
            }
        },

        /**
         * 设置序列属性
         * @param property 属性名
         * @param value 属性值
         * @param type 值的类型
         */
        setSeries: function(property, value, type){
            if(value === undefined){
                return;
            }
            value = this.processValue(value, type);

            if(value.length == 1 && this.series.length > 1){
                this.set("options.plotOptions.series." + property, value[0]);
            }
            else{
                for(var i = 0; i < this.series.length; i++){
                    if(value[i] !== undefined){
                        var properties = property.split(".");
                        var cursor = this.series[i];
                        for(var n = 0; n < properties.length; n++){
                            if(n == properties.length - 1){
                                cursor[properties[n]] = value[i];
                            }
                            else{
                                cursor[properties[n]] = cursor[properties[n]] || {};
                                cursor = cursor[properties[n]];
                            }
                        }
//                        if(properties.length == 1){
//                            this.series[i][properties[0]] = value[i];
//                        }
//                        else if(properties.length == 2){
//                            this.series[i][properties[0]] = this.series[i][properties[0]] || {};
//                            this.series[i][properties[0]][properties[1]] = value[i]
//                        }
                    }
                }
            }
        },

        /**
         * 设置点的属性
         * @param series 要设置的点所属的序列
         * @param property 属性名
         * @param value 属性值
         * @param type 值的类型
         */
        setPoints: function(series, property, value, type){
            if(value === undefined || !series || !series.data){
                return;
            }

            value = this.processValue(value, type);

            for(var i = 0; i < series.data.length; i++){
                if(value[i] !== undefined){
                    if(isNumber(series.data[i])){
                        series.data[i] = {
                            y:series.data[i]
                        };
                    }
                    else if(isArray(series.data[i]) && series.data[i].length == 2){
                        series.data[i] = {
                            x:series.data[i][0],
                            y:series.data[i][1]
                        };
                    }
                    else if(isArray(series.data[i]) && series.data[i].length == 3){
                        series.data[i] = {
                            x:series.data[i][0],
                            low:series.data[i][1],
                            high:series.data[i][2]
                        };
                    }
                    if(isObject(series.data[i])){
                        var properties = property.split(".");
                        if(properties.length == 1){
                            series.data[i][properties[0]] = value[i];
                        }
                        else if(properties.length == 2){
                            series.data[i][properties[0]] = series.data[i][properties[0]] || {};
                            series.data[i][properties[0]][properties[1]] = value[i]
                        }
                    }

                }
            }
        },

        /**
         * 将字符串形式的value处理成指定格式的数组
         * @param value
         * @returns {*}
         */
        processValue: function(value, type){
            if(value == null){
                value = "";
            }
            var chart = this;
            if(isNumber(value) || isString(value) || value == true || value == false){
                value += "";  //首先将参数转换成字符串，使用字符串的split函数
                value = array_map(value.split(","), function(v){
                    v = v.trim();
                    switch (type){
                        case "color":
                            return color_format(v);
                        case "string":
                            if(v == ""){
                                return null
                            }
                            return v;
                        case "align":
                            if(/left|center|right/i.test(v)){
                                return v.toLowerCase();
                            }
                            return undefined;
                        case "verticalAlign":
                            if(/top|middle|bottom/i.test(v)){
                                return v.toLowerCase();
                            }
                            return undefined;
                        case "style":
                            v = v.replace(/&/g,",");
                            return font_formatStyle(v);
                        case "number":
                            if(v == ""){
                                return null
                            }
                            return number_format(v);
                        case "boolean":
                            if(v == "true" || v == "1"){
                                v = true;
                            }
                            else if(v == "false" || v == "0"){
                                v = false;
                            }
                            return !!v;
                        case "lineStyle":
                            return chart.getLineStyle(v);
                        case "markerStyle":
                            return chart.getMarkerStyle(v);
                        default :
                            return v.trim() == "" ? undefined : v;
                    }
                }, null);
            }

            if(type == "color"){
                for(var i = 0; i < value.length; i++){
                    if(value[i] && value[i].pattern){
                        this.loadFile(bootPath + "/js/plugins/pattern-fill.js");
                        break;
                    }
                }
            }
            return value;
        },


        /**
         * 将序列对象中的数据添加到allSeriesData中，用于添加和删除序列
         * @param allSeriesData
         * @param series
         */
        addDataToAllSeriesData: function(c, s, index){
            var chart = this;

            //添加横轴数据
            //查找横轴数据是否已存在
            var isExistXData = false;
            for(var i = 0 ; i < chart.allSeriesData.length; i++){
                if(s.xAxis == chart.allSeriesData[i].x_id){
                    isExistXData = true;
                    break;
                }
            }
            if(!isExistXData){
                var seriesXDataObj = {};

                //查找x轴
                var tempXAxis = c.xAxis || {};
                if(isArray(c.xAxis)){
                    for(var i = 0; i < c.xAxis.length; i++){
                        if(c.xAxis[i].id == s.xAxis){
                            tempXAxis = c.xAxis[i];
                            break;
                        }
                    }
                }

                seriesXDataObj.x_id = s.xAxis;
                seriesXDataObj.name = tempXAxis.name || "横轴";
                seriesXDataObj.format = (tempXAxis.dateTimeLabelFormats && (tempXAxis.dateTimeLabelFormats.year || tempXAxis.dateTimeLabelFormats.month
                    || tempXAxis.dateTimeLabelFormats.week || tempXAxis.dateTimeLabelFormats.day || tempXAxis.dateTimeLabelFormats.hour || tempXAxis.dateTimeLabelFormats.minute
                    || tempXAxis.dateTimeLabelFormats.second || tempXAxis.dateTimeLabelFormats.millisecond)) || "%Y-%n-%e";
                seriesXDataObj.process_data = [];
                seriesXDataObj.original_data = [];
                if(isArray(s.data)){
                    for(var i = 0; i < s.data.length; i++){
                        if(s.data[i]){
                            seriesXDataObj.original_data.push(s.data[i][0]);
                        }
                    }
                }
                seriesXDataObj.process_data = seriesXDataObj.original_data;
                chart.allSeriesData.push(seriesXDataObj);
            }


            var seriesYDataObj = {}
            //添加纵轴数据
            seriesYDataObj.name = s.name || ("Series " + (index + 1));

            seriesYDataObj.original_data  = [];
            if(isArray(s.data)){
                if(s.data.length == 1){
                    for(var i = 0; i < s.data.length; i++){
                        seriesYDataObj.original_data.push(s.data[i]);
                    }
                }
                else if(s.data.length == 2){
                    for(var i = 0; i < s.data.length; i++){
                        seriesYDataObj.original_data.push(s.data[i][1]);
                    }
                }
            }
            seriesYDataObj.process_data = seriesYDataObj.original_data;
            chart.allSeriesData.push(seriesYDataObj);
        },

        /**
         * 加载dhtmlx文件
         */
        loadDHTMLXFile: function(callback){
            if(!dhtmlxLoaded){
                dhtmlxLoaded = true;
                if(dhxVersion == "5"){
                    this.loadFile(pBootPath + "/lib/dhtmlx/codebase/dhtmlx.css");
                    LoadFileList(pBootPath + "/lib/dhtmlx/codebase/dhtmlx.js", callback);
                }

            }
            else {
                callback.apply();
            }
        },

        /**
         * 加载js或css文件
         * @param path
         */
        loadFile: function(path, first){
            var chart = this;
            if(!path) return;

            if(!array_getElement(chart.modules,
                function(v) {return v == path},
                null
            )){
                if(first){
                    chart.modules.unshift(path);
                }
                else{
                    chart.modules.push(path);
                }
            }
        }
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓数据处理接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置所有的数据
     * @param colSep 数据项（字段、列）分隔串（1或多个字符），分隔串不能与实际数据内容有冲突。如“，”。
     * @param rowSep 记录（行）分隔串（1或多个字符），分隔串不能与实际数据内容有冲突。如“##”、“@@”。
     * @param strData 用字符串表示的绘制曲线的1或多条记录数据。数据项用colSep分隔，记录用rowSep分隔。如：1,2,3,4,5,##6,7,8,9,0,##
     * @constructor
     */
    Chart.prototype.ISetAllData = function (colSep, rowSep, strData) {
        var chart = this;
        this.set("options.config.colSep", colSep);
        this.set("options.config.rowSep", rowSep);
        this.set("options.config.strData", strData);

        this.set('options.exporting.colSep', colSep);
        this.set('options.exporting.rowSep', rowSep);
        this.set('options.exporting.strData', strData);

        //使用行分隔符将数据字符串分割成一维数组
        var rowArr = array_filter(strData.split(rowSep), function (v) {
            return v !== undefined && v != null && v.trim() != ""
        }, null);

        //将数组rowArr中的每个元素根据列分割符分割成一个数组，形成一个二维数组
        var arr2 = array_map(rowArr, function (s) {
            return array_map(s.split(colSep), function (v) { return v.trim() }, null)
        }, null);

        var rowNums = arr2.length;
        var colNums = Math.max.apply(null, array_map(arr2, function (v) { return v.length }, null));

        //行列转换
        var transArr = [];
        for (var i = 0; i < colNums; i++) {
            var arrTemp = [];
            for (var j = 0; j < rowNums; j++) {
                arrTemp.push(arr2[j][i]);
            }
            transArr.push(arrTemp);
        }

        //首先调用ISetAllData方法
        if (chart.allSeriesData.length == 0) {
            for (i = 0; i < transArr.length; i++) {
                var obj = {};
                obj.original_data = transArr[i];
                chart.allSeriesData.push(obj);
            }
        }
        //首先调用ISetAllFields方法
        else {
            //当通过ISetAllData接口设置的数据和通过ISetAllFields接口设置的字段不对应时，取长度最小的
            var minL = Math.min(this.allSeriesData.length, transArr.length);
            for (i = 0; i < minL; i++) {
                this.allSeriesData[i].original_data = transArr[i];
                this.allSeriesData[i].process_data = array_format(transArr[i], this.allSeriesData[i].format);
            }
        }
    };

    /**
     * 设置数据对应的字段和格式
     * @param colSep 数据项（字段、列）分隔串（1或多个字符）, 分隔串不能与实际数据内容有冲突。如“，”。
     * @param strFields 用字符串表示的数据项（字段）名称，每个数据项用分隔符colSep分隔。如：“日期(年月),开井数,关井数,产油量”。数据项名称不必与数据库的字段名称一致，但各数据项名称不能相同。
     * @param strFormats 用字符串表示的数据项（字段）的数据格式。每个数据项用分隔符colSep分隔。数据格式分为日期格式、数值格式、独立点格式三类。
     * @constructor
     */
    Chart.prototype.ISetAllFields = function (colSep, strFields, strFormats) {
        this.set("options.config.colSep", colSep);
        this.set("options.config.strFields", strFields);
        this.set("options.config.strFormats", strFormats);

        this.set('options.exporting.strFields', strFields);
        this.set('options.exporting.strFormats', strFormats);
        var fieldsArr = array_map(array_filter(strFields.split(colSep),
                function (v) {
                    return v !== undefined && v != null && v.trim() != ""
                }, null),
            function (v) { return v.trim()}, null);

        var formatsArr = array_map(strFormats.split(colSep), function (v) {
            if (/\d+/.test(v.trim())) {
                return parseInt(v,10);
            }
            else {
                return v.trim() == '' ? 0 : v.trim();
            }
        }, null);

        //首先调用ISetAllFields方法
        var i;
        if (this.allSeriesData.length == 0) {
            for (i = 0; i < fieldsArr.length; i++) {
                var obj = {};
                obj.name = fieldsArr[i];
                obj.format = formatsArr[i] ? formatsArr[i] : 0;
                this.allSeriesData.push(obj);
            }
        }
        //首先调用ISetAllData方法
        else {
            var minL = Math.min(fieldsArr.length, this.allSeriesData.length);
            for (i = 0; i < minL; i++) {
                this.allSeriesData[i].name = fieldsArr[i];
                this.allSeriesData[i].format = formatsArr[i] !== undefined ? formatsArr[i] : 0;
                this.allSeriesData[i].process_data = array_format(this.allSeriesData[i].original_data, this.allSeriesData[i].format);
            }
        }
    };

    /**
     * 每对ISetBegin和ISetEnd接口之间设置设置一个x轴，一个y轴，每对xy轴上包含多个序列
     * @constructor
     */
    Chart.prototype.ISetBegin = function () {
        var chart = this;
        //共享x轴
        if(chart.shareXAxis !== false){
            //在options.xAxis中查找是否已存在指定id的坐标轴，如果存在，则使用此横轴，不存在则创建
            var xAxes = chart.get('options.xAxis');
            var x_axis;
            if(xAxes && isArray(xAxes)){
                x_axis = array_getElement(xAxes,function(v){return v.id == ('x-' + chart.x_inc)},null)
            }
            chart.x_axis = x_axis || {id:'x-' + chart.x_inc};
        }
        else{
            chart.x_axis = {id:'x-' + chart.x_inc++};
        }
        chart.y_axis = {id: 'y-' + chart.y_inc++};

        //坐标系中的序列
        chart.series = [];
    };

    /**
     * 设置DataStore中的列ID，DataStore中的数据通过此接口设置的id查找
     * @param sColumnIds DataStore中的列ID
     * @param sFormats DataStore中的数据格式
     * @constructor
     */
    Chart.prototype.ISetColumnIds = function(sColumnIds, sFormats){
        if(!sColumnIds){
            return;
        }
        this.DataStoreColumnIds = array_map(array_filter(sColumnIds.split(","),
                function (v) { return v !== undefined && v != null && v.trim() != "" }, null),
            function (v) { return v.trim() }, null);

        if(!sFormats){
            this.DataStoreColumnFormat = [];
        }
        else{
            this.DataStoreColumnFormat = array_map(sFormats.split(","), function (v) {
                if (/\d+/.test(v.trim())) {
                    return parseInt(v,10);
                }
                else {
                    return v.trim() == '' ? 0 : v.trim();
                }
            }, null);
        }
    };

    /**
     * 设置绘制曲线图所需的数据
     * @param strXName 该组曲线的横坐标使用数据的数据项名称。
     * @param strYNames 该组曲线的纵坐标使用数据的数据项名称（各数据项名称用“,”分隔），1…n个。
     * @param strRanges 图表类型为”arearange”、”areasplinerange”、”columnrange”时此参数有效，此参数设置范围图表的较大值，数据项用“，”分割，此时strYNames设置范围图表的较小值。
     * @constructor
     */
    Chart.prototype.ISetData = function (strXName, strYNames, strRanges) {
        var chart = this;
        strRanges = strRanges || "";

        var x_dataObj = array_getElement(this.allSeriesData,
            function(v) {return v.name == strXName.trim()}, null
        );
        if (x_dataObj) {
            var xData;
            var xFormat = x_dataObj.format;
            if (/(YYYY|MM|DD|HH|MI|SS)/i.test(xFormat)) {
                var labelFormat = date_replace_dateFormat(xFormat);
                this.set('x_axis.dateTimeLabelFormats.year', labelFormat);
                this.set('x_axis.dateTimeLabelFormats.month', labelFormat);
                this.set('x_axis.dateTimeLabelFormats.day', labelFormat);
                this.set('x_axis.dateTimeLabelFormats.week', labelFormat);
                this.set('x_axis.dateTimeLabelFormats.hour', labelFormat);
                this.set('x_axis.dateTimeLabelFormats.minute', labelFormat);
                this.set('x_axis.dateTimeLabelFormats.second', labelFormat);
                this.set('x_axis.dateTimeLabelFormats.millisecond', labelFormat);

                this.set('x_axis.type', 'datetime');
            }
            else if (isNumber(xFormat) && xFormat >= 0) {
            }
            else {
                this.set('x_axis.categories', x_dataObj.process_data);
            }

            var yNamesArr = array_map(array_filter(strYNames.split(","),
                function (v) {
                    return v !== undefined && v != null && v.trim() != ""
                }, null),
                function (v) { return v.trim()}, null);

            var rangeNamesArr = array_map(array_filter(strRanges.split(","),
                function (v) {
                    return v !== undefined && v != null && v.trim() != ""
                }, null),
                function (v) { return v.trim()}, null);

            for(var i = 0; i < yNamesArr.length; i++){
                var seriesData = generatePointArray(chart.allSeriesData, strXName, yNamesArr[i], rangeNamesArr[i]);
                if(seriesData){
                    var seriesObj = {};
                    seriesObj.id = "series-" + chart.s_inc++;
                    seriesObj.name = yNamesArr[i];
                    seriesObj.data = seriesData;

                    seriesObj.dataLabels = {};
                    seriesObj.dataLabels.decimals = seriesData.y_format;

                    seriesObj.xdata = strXName && strXName.trim();
                    seriesObj.ydata = yNamesArr[i];
                    seriesObj.zdata = rangeNamesArr[i];

                    seriesObj.xAxis = this.x_axis.id;
                    seriesObj.yAxis = this.y_axis.id;
                    this.series.push(seriesObj);
                }
            }
        }
        else {
            alert('x轴数据不存在！');
        }
    };

    /**
     * 设置只包含一个数据点的接口，如uv计、速度计等
     * @param strID 数据点id
     * @param strVal 数据点的值
     * @constructor
     */
    Chart.prototype.ISetDataEX = function (strID, strVal) {
        var idArr = array_map(strID.split(","), function (v) { return v.trim() == "" ? null : v.trim() }, null);
        var valArr = array_map(strVal.split(","), function (v) { return v.trim() == "" ? null : parseFloat(v.trim()) }, null);
        var maxL = Math.max(idArr.length, valArr.length);
        var seriesObj = {};
        seriesObj.data = [];
        seriesObj.yAxis = this.get('y_axis.id');
        for (var i = 0; i < maxL; i++) {
            var dataObj = {};
            dataObj.id = idArr[i] == undefined ? null : idArr[i];
            dataObj.y = valArr[i] == undefined ? null : valArr[i];
            seriesObj.data.push(dataObj);
        }
        this.series.push(seriesObj);
    };

    /**
     * 解析DataStore，并按照ISetColumnIds接口中设置的id名称将数据存入临时数据变量中，与ISetColumnIds结合使用可替代ISetAllData和ISetAllFields接口
     * @param oDataStore
     * @constructor
     */
    Chart.prototype.ISetDataStore = function(oDataStore){
        if(!this.DataStoreColumnIds){
            alert("请设置DataStore的列id！");
        }
        this.allSeriesData = [];
        var dataStore = new dhtmlXDataStore(oDataStore);
        for(var i = 0; i <this.DataStoreColumnIds.length; i++){
            var dataObj = {};
            dataObj.name = this.DataStoreColumnIds[i];
            dataObj.format = this.DataStoreColumnFormat[i] ? this.DataStoreColumnFormat[i] : 0;
            dataObj.original_data = [];
            dataObj.process_data = [];

            var next_id;
            while(true){
                next_id = dataStore.next(next_id);
                if(!dataStore.exists(next_id)){
                    break;
                }
                var item = dataStore.item(next_id);
                dataObj.original_data.push(item[this.DataStoreColumnIds[i]]);
            }
            dataObj.process_data = array_format(dataObj.original_data, dataObj.format);
            this.allSeriesData.push(dataObj);
        }
    };

    /**
     * 另一种设置序列数据的方法，当数据量大于100000个点时可以使用.通过字符串的方式设置数据时，当数据量非常大时，解析字符串会出现Maximum call stack size exceeded异常。说明：此方法必须放到ISetBegin之下的第一个位置，否则设置序列的属性会不起作用
     * @param sName 序列名称
     * @param arrData 序列数据，一维数组或者二维数组，如[20,21,22,44]或者[[5,2], [6,3], [8,2]]或者[[5,2,1], [6,3,5], [8,2,6]]
     * @constructor
     */
    Chart.prototype.ISetSeriesData = function(sName, arrData){
        this.series.push({
            yAxis: this.y_axis.id,
            name:sName,
            data:arrData
        });
        //支持添加和删除曲线功能，此时把所有的序列都存入曲线图配置对象中
        if(this.get("options.chart.supportAddDeleteSeries")){
            this.options.allSeriesData = this.options.allSeriesData || [];
            this.options.allSeriesData.push({
                name:sName,
                data:arrData
            })
        }
    };

    Chart.prototype.ISetSeriesDataGroupingEnabled = function(bEnabled){
        this.setSeries("dataGrouping.enabled", bEnabled, "boolean");
    };

    /**
     * 设置socket连接的URL
     * @param strURL
     * @constructor
     */
    Chart.prototype.ISetSocketURL = function(strURL){
        this.set("options.socketURL", strURL);
    };

    /**
     * 设置可视化定制的页面解析地址
     * @param strURL
     * @constructor
     */
    Chart.prototype.ISetParseURL = function(strURL){
        this.set("options.parseURL", strURL);
    };

    /**
     * 每对ISetBegin和ISetEnd接口之间设置设置一个x轴，一个y轴，每对xy轴上包含多个序列
     * @constructor
     */
    Chart.prototype.ISetEnd = function () {
        var chart = this,
            i, j, n;

        //过滤空值
        if(chart.bFilterNulls){
            var bFilterNullsArr = array_map(chart.bFilterNulls.split(","), function (v) {
                v = v.trim();
                if(v == "1" || v == "true"){
                    return true;
                }
                else{
                    return false;
                }
            }, null);
            if(chart.series.length > 1 && bFilterNullsArr.length == 1){
                n = this.series.length;
                for(i = 1; i < n; i++){
                    bFilterNullsArr[i] = bFilterNullsArr[0];
                }
            }
            else{
                n = Math.min(this.series.length, bFilterNullsArr.length);
            }
            for(i = 0; i < n; i++){
                if(!bFilterNullsArr[i]){
                    continue;
                }
                this.series[i].data = array_filter(this.series[i].data, function(v){
                    if(v.length == 2){
                        if(v[1] == null){
                            return false
                        }
                        else{
                            return true
                        }
                    }
                    else if(v.length == 1){
                        return v != ""
                    }
                }, null);
            }
            chart.bFilterNulls = null;
        }

        //是否将序列中指定的值替换成null
        if(chart.replaceValues){
            var replaceValuesArr = array_map(chart.replaceValues.split(","), function (v) { return v.trim() == "" ? null : parseFloat(v.trim()) }, null);
            if(this.series.length > 1 && replaceValuesArr.length == 1){
                n = this.series.length;
                for(i = 1; i < n; i++){
                    replaceValuesArr[i] = replaceValuesArr[0];
                }
            }
            else{
                n = Math.min(this.series.length, replaceValuesArr.length);
            }
            for(i = 0; i < n; i++){
                if(replaceValuesArr[i] == null){
                    continue;
                }
                for(j = 0; j < this.series[i].data.length; j++){
                    if(this.series[i].data[j].length == 2 && this.series[i].data[j][1] == replaceValuesArr[i]){
                        this.series[i].data[j][1] = null;
                    }
                }
            }
            chart.replaceValues = null;
        }

        //是否在序列的下降段插入空值
        if(chart.bInsertNull){
            var bInsertArr = array_map(chart.bInsertNull.split(","), function (v) {
                v = v.trim();
                return (v == "1" || v == "true");
            }, null);
            if(chart.series.length > 1 && bInsertArr.length == 1){
                n = this.series.length;
                for(i = 1; i < n; i++){
                    bInsertArr[i] = bInsertArr[0];
                }
            }
            else{
                n = Math.min(this.series.length, bInsertArr.length);
            }
            for(i = 0; i < n; i++){
                if(!bInsertArr[i]){
                    continue;
                }
                var insertValuesArr = [];
                for(j = 0; j < this.series[i].data.length - 1; j++){
                    if(this.series[i].data[j].length == 2 && this.series[i].data[j][1] > this.series[i].data[j + 1][1]){
                        insertValuesArr.push([j+1,[(this.series[i].data[j][0] + this.series[i].data[j+1][0])/2,null]]);
                    }
                }
                for(j = insertValuesArr.length - 1; j >= 0; j--){
                    this.series[i].data.splice(insertValuesArr[j][0], 0, insertValuesArr[j][1]);
                }
            }
            chart.bInsertNull = null;
        }
        
        //设置序列间断
        if(chart.arrayInterrupt){

            function doInterrupt(series, interruptPos){

                var data = series.data,
                    interruptPosArr = array_map(array_filter(interruptPos.split(","), function(v){return v != ""}, null),
                        function(v){
                            return date_getMillisecond(v)
                        }, null),
                    insertValuesArr = [];
                //排序
                interruptPosArr.sort(function(a,b){return a > b ? 1:-1});//从小到大排序

                var index = interruptPosArr.length - 1;
                for(j = data.length - 1; j >= 0; j--){
                    if(index < 0){
                        break;
                    }
                    if(data[j][0] <= interruptPosArr[index]){
                        data.splice(j+1, 0, [interruptPosArr[index], null]);
                        index--;
                        j++;
                    }

                }
            }

            if(chart.series.length > 1 && chart.arrayInterrupt.length == 1){
                n = chart.series.length;
                for(i = 1; i < n; i++){
                    chart.arrayInterrupt[i] = chart.arrayInterrupt[0];
                }
            }
            else{
                n = Math.min(chart.series.length, chart.arrayInterrupt.length);
            }
            for(i = 0; i < n; i++){
                if(!chart.arrayInterrupt[i]){
                    continue;
                }
                doInterrupt(this.series[i], chart.arrayInterrupt[i]);
            }
            chart.arrayInterrupt = null;
        }

        if (!isArray(this.get('options.series'))) {
            chart.set('options.series', []);
        }
        chart.set('options.series', chart.options.series.concat(chart.series));

        //如果当前x轴已经存在于this.options.xAxis中，则不将x轴添加到this.options.xAxis中
        var xAxes = chart.get('options.xAxis');
        if (isArray(xAxes)) {
            var x_axis = array_getElement(xAxes,function(v){return v.id == chart.x_axis.id},null);
            if(!x_axis){
                chart.options.xAxis.push(chart.x_axis);
            }
        }
        else{
            chart.options.xAxis = [chart.x_axis];
        }

        //如果当前y轴已经存在于this.options.yAxis中，则不将y轴添加到this.options.yAxis中
        var yAxes = chart.get('options.yAxis');
        if (isArray(yAxes)) {
            var y_axis = array_getElement(yAxes,function(v){return v.id == chart.y_axis.id},null);
            if(!y_axis){
                chart.options.yAxis.push(chart.y_axis);
            }
        }
        else{
            chart.options.yAxis = [chart.y_axis];
        }

        chart.charts = chart.charts || [];
        chart.charts.push(deepCopy({},chart.options));
    };

    /**
     * 属性设置完成后调用此接口绘制曲线图
     * @constructor
     */
    Chart.prototype.IRefresh = function (func) {

        var oThis = this;

        function loadAllSuccess(){
            //设置默认值

            var defaultOptions = {
                colors: ['#7cb5ec', '#9a4b48', '#90ed7d', '#f7a35c','#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1','#E6645C', '#55A9DC', '#886DB3'],
                global: {
                    VMLRadialGradientURL: bootPath + "/gfx/vml-radial-gradient.png",
                    canvasToolsURL: bootPath + "/modules/canvas-tools.js"
                },
                lang: {
                    resetZoom: "恢复",
                    resetZoomTitle: '',
                    rangeSelectorZoom: '缩放范围',
                    rangeSelectorFrom: '从',
                    rangeSelectorTo: '到',
                    tens:['上旬','中旬','下旬']
                },
                chart:{
                    plotBackgroundColor:"#FFFFFF"
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false,
                    allowHTML: true,
                    url: bootPath + "/ashx/ImageExport.ashx"
                },
                plotOptions: {
                    series: {
                        allowPointSelect: false,
                        marker: {
                            //enabled: true,
                            //symbol: null,
                            lineWidth: 0,
                            radius: 4,
                            lineColor: '#FFFFFF',
                            //fillColor: null,
                            states: { // states for a single point
                                hover: {
                                    enabled: true,
                                    lineWidthPlus: 1,
                                    radiusPlus: 2
                                },
                                select: {
                                    fillColor: '#FFFFFF',
                                    lineColor: '#000000',
                                    lineWidth: 2
                                }
                            }
                        }
                    }
                },
                tooltip: {
                    dateTimeLabelFormats:{
                        millisecond:"%Y-%m-%e %H:%M:%S.%L",
                        second:"%Y-%m-%e %H:%M:%S",
                        minute:"%Y-%m-%e %H:%M",
                        hour:"%Y-%m-%e %H:%M",
                        day:"%Y-%m-%e",
                        week:"%Y-%m-%e",
                        month:"%Y-%m",
                        year:"%Y"
                    }
                }
            };
            var defaultXAxisOptions ={
                gridLineWidth: 1,
                showEmpty: false,
                lineWidth: 1,
                lineColor:"#000000",
                maxPadding: 0,
                minPadding: 0,
                tickWidth: 1,
                tickLength:6,
                tickColor:"#000000",
                title:{
                    useHTML: true
                }
            };

            var defaultYAxisOptions ={
                gridLineWidth: 1,
                showEmpty: false,
                lineWidth: 1,
                lineColor:"#000000",
                maxPadding: 0,
                minPadding: 0,
                tickWidth: 1,
                tickLength:6,
                tickColor:"#000000",
                title:{
                    useHTML: true
                }
            };

            var tempSeriesTheme = [];
            if(oThis.commonTheme && Highcharts.theme && Highcharts.theme.series){
                tempSeriesTheme = Highcharts.merge([], Highcharts.theme.series);
                delete Highcharts.theme.series;
            }

            function setDefaultOptions(_options){
                //给序列应用定制的主题
                for(var i = 0; i < _options.series.length; i++){
                    _options.series[i] = Highcharts.merge(findSeriesThemeByName(_options.series[i].name,tempSeriesTheme), _options.series[i]);
                }

                //设置坐标轴的默认属性
                for(var i = 0; i < _options.xAxis.length; i++){
                    _options.xAxis[i] = Highcharts.merge(defaultXAxisOptions, _options.xAxis[i]);
                }

                for(var i = 0; i < _options.yAxis.length; i++){
                    _options.yAxis[i] = Highcharts.merge(defaultYAxisOptions, _options.yAxis[i]);
                }
            }

            oThis.globalOptions = Highcharts.merge(defaultOptions, oThis.globalOptions);
            Highcharts.setOptions(Highcharts.merge(oThis.globalOptions, Highcharts.theme || {}));

            if(oThis.isMultiCharts && oThis.multiChartsOptions){
                for(var i = 0; i < oThis.multiChartsOptions.charts.length; i++){
                    setDefaultOptions(oThis.multiChartsOptions.charts[i]);
                }
                oThis.multiChartsOptions.exportOptions = deepCopy(Highcharts.merge(oThis.multiChartsOptions));
                oThis.multiChartsOptions.exportOptions.globalOptions = oThis.globalOptions;
                oThis.multiChartsOptions.globalOptions = oThis.globalOptions;
                if(func){
                    func.call(null, new MCharts(oThis.multiChartsOptions));
                }
                else{
                    new MCharts(oThis.multiChartsOptions);
                }
            }
            else{
                setDefaultOptions(oThis.options);
                oThis.options.exportOptions = deepCopy(oThis.options);
                oThis.options.exportOptions.globalOptions = oThis.globalOptions;
                oThis.options.globalOptions = oThis.globalOptions;

                if (oThis.get('options.chart.StockChart')) {
                    if(func){
                        func.call(null, new Highcharts.StockChart(oThis.options));
                    }
                    else{
                        new Highcharts.StockChart(oThis.options);
                    }
                }
                else {
                    if(func){
                        func.call(null, new Highcharts.Chart(oThis.options));
                    }
                    else{
                        new Highcharts.Chart(oThis.options);
                    }
                }
            }
        }

        if(needDhtmlx){
            oThis.loadDHTMLXFile(function(){LoadFileList(oThis.modules, loadAllSuccess);});
        }
        else {
            LoadFileList(oThis.modules, loadAllSuccess);
        }
//        if(hasContextMenu){
//            $LAB.script(bootPath + "/js/plugins/contextMenu.src.js").wait();
//            $LAB.script(bootPath + "/js/plugins/data-review.src.js").wait();
//        }

    };

    /**
     * 模板解析生成的json串首先通过此接口进行处理
     * @param Json
     */
    Chart.prototype.jsonIn = function (Json) {
        var series = Json.series,
            i,j,n;
        for (i = 0; i < series.length; i++) {
            var serie = series[i];
            if(serie.color){
                serie.color = getGradientColor(serie.color);
                if(isObject(serie.color)){
                    if (serie.data) {
                        n = serie.data.length;
                        for (j = 0; j < n; j++) {
                            if (isObject(serie.data[j])) {
                                if(!serie.data[j].color){
                                    serie.data[j].color = serie.color;
                                }
                            }
                        }
                    }
                }
            }
            if (serie.data) {
                n = serie.data.length;
                for (j = 0; j < n; j++) {
                    if (isObject(serie.data[j])) {
                        if (getSize(serie.data[j]) == 1 && serie.data[j].y != undefined) {
                            serie.data[j] = serie.data[j].y;
                        }
                        else if (getSize(serie.data[j]) == 2 && serie.data[j].y != undefined && serie.data[j].x != undefined) {
                            serie.data[j] = [serie.data[j].x, serie.data[j].y];
                        }
                    }
                }
            }
        }

        function getSize(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };

        if(Json.chart && isObject(Json.chart.backgroundColor)){
            Json.chart.backgroundColor = getGradientColor(Json.chart.backgroundColor);
        }

        if(Json.chart && isObject(Json.chart.plotBackgroundColor)){
            Json.chart.plotBackgroundColor = getGradientColor(Json.chart.plotBackgroundColor);
        }

        if(Json.title && isObject(Json.title.backgroundColor)){
            Json.title.backgroundColor = getGradientColor(Json.title.backgroundColor);
        }

        if(Json.legend && isObject(Json.legend.backgroundColor)){
            Json.legend.backgroundColor = getGradientColor(Json.legend.backgroundColor);
        }

        function getGradientColor(color){
            if(color.type == "pure"){
                return color.stops[0][1];
            }
            else if(color.type == "linearGradient"){
                return {linearGradient:[color.x1, color.y1, color.x2, color.y2], stops:color.stops}
            }
            else if(Json.chart.backgroundColor.type == "radialGradient"){
                return {radialGradient:{cx:color.x1,cy:color.y1,r:color.r},stops:color.stops}
            }
        }
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓对象获取接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 获取div中的图表对象
     * @param containerID div容器id
     */
    Chart.prototype.getCharts = function(containerID){
        if(!containerID){
            containerID = this.renderTo;
        }
        if(containerID){
            var chart = $(containerID).highcharts();
            if(chart){
                return [chart];
            }
            else {
                var charts = [];
                var children = $(containerID).children();
                for(var i = 0; i < children.length; i++){
                    chart = $(children[i]).highcharts();
                    if(chart){
                        charts.push(chart);
                    }
                }
                return charts;
            }
        }
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓全局属性接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置数值的表示单位
     * @param kSymbols 表示10的3次方
     * @param MSymbols 表示10的6次方
     * @param GSymbols 表示10的9次方
     * @param TSymbols 表示10的12次方
     * @param PSymbols 表示10的15次方
     * @param ESymbols 表示10的18次方
     * @constructor
     */
    Chart.prototype.ISetLangNumericSymbols = function(kSymbols, MSymbols, GSymbols, TSymbols, PSymbols, ESymbols){
        this.set("globalOptions.lang.numericSymbols", [kSymbols, MSymbols, GSymbols, TSymbols, PSymbols, ESymbols]);
    };

    /**
     * 设置数据查看窗口的大小
     * @param nWidth 数据查看窗口的宽度
     * @param nHeight 数据查看窗口的高度
     * @constructor
     */
    Chart.prototype.ISetDataViewWindowSize = function(nWidth, nHeight){
        this.set("options.dataview.width", number_format(nWidth));
        this.set("options.dataview.height", number_format(nHeight));
    };


    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓图表属性接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 在图表中添加文本标签
     * @param sText 显示的文本，可以为html格式
     * @param nTop 文本的基准点距离曲线区上边缘的距离
     * @param nLeft 文本的基准点距离曲线区左边缘的距离
     * @param style 文本的样式，按照字体、大小、颜色、粗细的顺序以逗号分隔
     * @param zIndex 设置元素的堆叠顺序
     * @constructor
     */
    Chart.prototype.IAddChartLabel = function(sText, nTop, nLeft, style, zIndex){

        this.set("options.labels.items",this.get("options.labels.items") || []);
        this.label = {};
        this.set("label.html", sText);
        this.set("label.style", font_formatStyle(style));
        this.set("label.style.top", number_format(nTop) + "px");
        this.set("label.style.left", number_format(nLeft) + "px");
        this.set("label.style.zIndex", number_format(zIndex));

        this.get("options.labels.items").push(this.get("label"));
    };

    /**
     * 坐标轴刻度对齐。当使用多个轴线时，两个或两个以上轴的刻度将会自动计算出合理的刻度间隔使刻度线数保持最少。默认是 true，即自动保持间隔对齐，可以通过设置 false 来阻止。如果网格线显得零乱，你也可以直接将网格线隐藏，即设置 gridLineWidth 为 0。
     * @param alignTicks 可设置0|1|true|false
     * @constructor
     */
    Chart.prototype.ISetChartAlignTicks = function(bAlignTicks){
        this.set('options.chart.alignTicks', !!bAlignTicks);
    };

    /**
     * 设置所有图表更新的整体动画。设置为 false 时，图表动画被关闭。也可以通过单独的API方法通过参数来覆盖。这个选项在初始化图表的动画中不会起作用。见图形选项系列 plotOptions.series=> animation。
     * @param animation  可以设置为布尔值或一个配置对象。如果 true, 它会使用'swing' jQuery 缓动效果, 时长500ms. 如果使用一个配置对象，支持下面的属性： duration 时间以毫秒为单位的动画。 easing 当使用jQuery作为总体框架, 缓动效果能设置为 linear 或 swing。当使用jQuery plug-ins时，有更多的缓动函数支持,尤其是jQuery UI套件。见jQuery animate文档。当使用Mootools作为总体框架，使用的属性名为transition而不是easing。
     * @constructor
     */
    Chart.prototype.ISetChartAnimation = function(animation){
        this.set('options.chart.animation', animation);
    };

    Chart.prototype.ISetPropertyIframeEnable = function(bool){
        this.set('options.chart.propertypIframe', !!bool);
    };

    /**
     * 坐标轴流布局，当隐藏前一个坐标轴时，当前坐标轴是否自动填充以前的位置
     * @param bool
     * @constructor
     */
    Chart.prototype.ISetChartAxisAutoFlow = function(bool){
        this.set('options.chart.axisAutoFlow', !!bool);
        this.loadFile(bootPath + "/js/plugins/axisAutoFlow.src.js");
    };

    /**
     * 外图表区域的背景颜色或渐变。默认是： #FFFFFF
     * @param strBackground 设置背景色，可以使用的颜色格式为"#FFFFFF"、"rgb(255 255 255)"、"rgba(255 255 255 1)"、"255 255 255"、"red"、{pattern:url}、{linearGradient:[0,0,0,400],stops:[[0,'#FFFFFF'],[1,'rgb(189,222,241)']]}等
     * @param fBackgroundOpacity 设置背景透明度，0-1之间，默认为1
     * @constructor
     */
    Chart.prototype.ISetChartBackground = function (sBackground, fBackgroundOpacity) {
        this.set('options.chart.backgroundColor', color_format(sBackground));
        this.set('options.chart.backgroundOpacity', number_format(fBackgroundOpacity));
    };

    /**
     * 设置图表的边框
     * @param bBorderEnabled 是否显示边框
     * @param sBorderColor 外图表区域的边框颜色。默认是： #4572A7.
     * @param nBorderWidth 图表边框宽度。默认宽度为 0。
     * @param nBorderRadius 设置外图表区域边框圆角。默认是0
     * @constructor
     */
    Chart.prototype.ISetChartBorder = function (bBorderEnabled, sBorderColor, nBorderWidth, nBorderRadius) {
        this.set('options.chart.borderEnabled', !!bBorderEnabled);
        this.set('options.chart.borderColor', color_format(sBorderColor));
        this.set('options.chart.borderWidth', number_format(nBorderWidth));
        this.set('options.chart.borderRadius', number_format(nBorderRadius));
    };

    /**
     * 设置图表事件
     * @param eventType 事件类型。可设置addSeries|click|drilldown|drillup|load|redraw|selection
     * @param func 事件发生时执行的函数
     * @constructor
     */
    Chart.prototype.ISetChartEvents = function (eventType, func) {
        if(/addSeries|click|drilldown|drillup|load|redraw|selection/.test(eventType)){
            this.set('options.chart.events.' + eventType, func);
        }
    };

    /**
     * 如果值为true,刻度轴将会根据剩余的数据系列进行缩放显示。 如果值为false，隐藏和显示一组数据系列将不会影响其余数据系列的轴线。 对于堆栈类型的显示，一旦有一组数据隐藏了，即使轴线没有变，剩余的的数据会显示在隐藏数据的刻度上
     * @param ignoreHiddenSeries 默认为true
     * @constructor
     */
    Chart.prototype.ISetChartIgnoreHiddenSeries = function(bIgnoreHiddenSeries){
        this.set('options.chart.ignoreHiddenSeries', !!bIgnoreHiddenSeries);
    };

    /**
     * 是否将X轴和Y轴进行调换
     * @param inverted 默认为false
     * @constructor
     */
    Chart.prototype.ISetChartInverted = function(bInverted){
        this.set('options.chart.inverted', !!bInverted);
    };

    /**
     * 设置图表的外边与图形区域之间的距离
     * @param top 上边距，默认为null
     * @param right 右边距，默认为null
     * @param bottom 底边距，默认为null
     * @param left 左边距，默认为null
     * @constructor
     */
    Chart.prototype.ISetChartMargin = function (nTop, nRight, nBottom, nLeft) {
        this.set('options.chart.marginTop', number_format(nTop));
        this.set('options.chart.marginRight', number_format(nRight));
        this.set('options.chart.marginBottom', number_format(nBottom));
        this.set('options.chart.marginLeft', number_format(nLeft));
    };

    /**
     * @param enabled 图表是否启用3D，默认值为：false
     * @param alpha 3D图旋转角度，此为α角，内旋角度
     * @param beta 3D图旋转角度，此为β角，外旋角度
     * @param depth 图表的全深比，即为3D图X，Y轴的平面点固定，以图的Z轴原点为起始点上下旋转，值越大往外旋转幅度越大，值越小往内旋转越大，depth的默认值为100
     * @param viewDistance 它定义了观看者在图前看图的距离，对于柱图和散列图计算角度时影响是非常重要的，此值不能用于3D的饼图，默认值为100。
     * @constructor
     */
    Chart.prototype.ISetChartOptions3d = function (bEnabled, nAlpha, nBeta, nDepth, nViewDistance, bPseudo) {
        if(!!bEnabled){
            this.loadFile(bootPath + "/js/hwcharts-3d.src.js");

            this.set('options.chart.options3d.enabled', !!bEnabled);
            this.set('options.chart.options3d.alpha', number_format(nAlpha));
            this.set('options.chart.options3d.beta', number_format(nBeta));
            this.set('options.chart.options3d.depth', number_format(nDepth));
            this.set('options.chart.options3d.viewDistance', number_format(nViewDistance));
            this.set('options.chart.options3d.pseudo', !!bPseudo);
            this.set('options.chart.options3d.fitToPlot', false);
        }
    };

    /**
     * Frame框架，3D图包含柱的面板，我们以X ,Y，Z的坐标系来理解，X轴与 Z轴所形成的面为bottom，Y轴与Z轴所形成的面为side，X轴与Y轴所形成的面为back，bottom、side、back的属性一样，其中size为感官理解的厚度，color为面板颜色。
     * @param bottom 3D图框架的底板，以逗号分隔的字符串，第一个参数为颜色，第二个参数为大小
     * @param side 3D图中，Y轴与Z轴所形成的面为side，以逗号分隔的字符串，第一个参数为颜色，第二个参数为大小
     * @param back 3D图的背面面板，以逗号分隔的字符串，第一个参数为颜色，第二个参数为大小
     * @constructor
     */
    Chart.prototype.ISetChartOptions3dFrame = function(bottom, side, back){
        var bottomArr = bottom && bottom.split(","),
            bottomColor = bottomArr && bottomArr[0],
            bottomSize = bottomArr && bottomArr[1],
            sideArr = side && side.split(","),
            sideColor = sideArr && sideArr[0],
            sideSize = sideArr && sideArr[1],
            backArr = back && back.split(","),
            backColor = backArr && backArr[0],
            backSize = backArr && backArr[1];

        this.set('options.chart.options3d.frame.bottom.color', color_format(bottomColor));
        this.set('options.chart.options3d.frame.bottom.size', number_format(bottomSize));
        this.set('options.chart.options3d.frame.side.color', color_format(sideColor));
        this.set('options.chart.options3d.frame.side.size', number_format(sideSize));
        this.set('options.chart.options3d.frame.back.color', color_format(backColor));
        this.set('options.chart.options3d.frame.back.size', number_format(backSize));
    };

    /**
     * 可将图转成极地图
     * @param polar 默认是： false.
     * @constructor
     */
    Chart.prototype.ISetChartPolar = function(bPolar){
        this.set('options.chart.polar', !!bPolar);
    };

    /**
     * 绘制图形区域的背景
     * @param strPlotBackground 设置背景色,可设置渐变色和样式填充,如果是图片地址，可以使用图片填充，默认为null
     * @param fPlotBackgroundOpacity 设置透明度，默认为1
     * @constructor
     */
    Chart.prototype.ISetChartPlotBackground = function (sPlotBackground, fPlotBackgroundOpacity) {
        //背景为图片
        if (/\./.test(sPlotBackground)) {
            this.set('options.chart.plotBackgroundImage', sPlotBackground);
        }
        else {
            this.set('options.chart.plotBackgroundColor', color_format(sPlotBackground));
        }
        this.set('options.chart.plotBackgroundOpacity', number_format(fPlotBackgroundOpacity));
    };

    /**
     * 设置曲线区边框
     * @param bPlotBorderEnabled 是否显示曲线区边框
     * @param sPlotBorderColor 绘制图形区域边框颜色，默认是： #C0C0C0
     * @param nPlotBorderWidth 绘制图形区域边框宽度，默认是： 0
     * @param bPlotShadow 绘图区投影，默认false
     * @constructor
     */
    Chart.prototype.ISetChartPlotBorder = function (bPlotBorderEnabled, sPlotBorderColor, nPlotBorderWidth, bPlotShadow) {
        this.set('options.chart.plotBorderEnabled', !!bPlotBorderEnabled);
        this.set('options.chart.plotBorderColor', color_format(sPlotBorderColor));
        this.set('options.chart.plotBorderWidth', number_format(nPlotBorderWidth));
        this.set('options.chart.plotShadow', !!bPlotShadow);
    };

    /**
     * 设置曲线图是否根据当窗口或者框架改变大小时而改变
     * @param bReflow 默认true
     * @constructor
     */
    Chart.prototype.ISetChartReflow = function(bReflow){
        this.set('options.chart.reflow', !!bReflow);
    };

    /**
     * 设置图表渲染的div
     * @param sRender div的id
     * @constructor
     */
    Chart.prototype.ISetChartRenderTo = function (sRender) {
        this.renderTo = sRender;
        if(this.isMultiCharts && this.multiChartsOptions){
            this.set('multiChartsOptions.renderTo', sRender);
        }
        else{
            this.set('options.chart.renderTo', sRender.replace("#", ""));
        }
    };

    /**
     * 添加堆栈面积图外包线
     * @param bEnabled 是否绘制外包线
     * @param strLineColor 外包线的颜色
     * @param nLineWidth 外包线的线宽
     * @param strLineStyle 外包线的线型
     * @constructor
     */
    Chart.prototype.ISetChartSeriesOutline = function(bEnabled, strLineColor, nLineWidth, strLineStyle){
        this.set("options.chart.outlineEnabled", !!bEnabled);
        this.set("options.chart.outlineColor", color_format(strLineColor));
        this.set("options.chart.outlineWidth", number_format(nLineWidth));
        this.set("options.chart.outlineStyle", this.getLineStyle(strLineStyle));
    }

    /**
     * 设置图表阴影
     * @param bShadow 它可以设置true或者false，也可以设置为一个对象，此对象的属性有color, offsetX, offsetY, opacity 和 width，此对象可以更具体的完成用户想要的影子的效果
     * @constructor
     */
    Chart.prototype.ISetChartShadow = function(bShadow){
        this.set('options.chart.shadow', !!bShadow);
    };

    /**
     * 当一个曲线图中存在多个坐标系时，多个坐标系是否共用一个x轴，默认共用x轴
     * @param bool 默认为true
     * @constructor
     */
    Chart.prototype.ISetChartShareXAxis = function (bool) {
        this.shareXAxis = !!bool;
    };

    /**
     * 当一个空图动态的添加数据集时是否要显示轴
     * @param bShowAxes 默认为false，不显示
     * @constructor
     */
    Chart.prototype.ISetChartShowAxes = function(bShowAxes){
        this.set('options.chart.showAxes', !!bShowAxes);
    };

    /**
     * 设置图表大小
     * @param fWidth 指定图的宽度,默认为null
     * @param fHeight 指定图的高度,默认为null
     * @constructor
     */
    Chart.prototype.ISetChartSize = function (fWidth, fHeight) {
        this.set('options.chart.width', number_format(fWidth));
        this.set('options.chart.height', number_format(fHeight));
    };

    /**
     * 图的外边框和绘图区之间的距离
     * @param nTop 图的上边框和绘图区之间的距离，默认是： 10.
     * @param nRight 图的右边框和绘图区之间的距离，默认是： 10.
     * @param nBottom 图的底边框和绘图区之间的距离，默认是： 15.
     * @param nLeft 图的左边框和绘图区之间的距离，默认是： 10.
     * @constructor
     */
    Chart.prototype.ISetChartSpacing = function (nTop, nRight, nBottom, nLeft) {
        this.set('options.chart.spacingTop', number_format(nTop));
        this.set('options.chart.spacingRight', number_format(nRight));
        this.set('options.chart.spacingBottom', number_format(nBottom));
        this.set('options.chart.spacingLeft', number_format(nLeft));
    };

    /**
     * 大数据量时设置图表为StockChart
     * @param bStock 默认为false
     * @constructor
     */
    Chart.prototype.ISetChartStock = function(bStock){
        this.set('options.chart.StockChart', !!bStock);
    };

    /**
     * 设置图表主题
     * @param theme 主题名称dark-blue|dark-green|dark-unica|gray|grid|grid-light|sand-signika|skies|future|pastel|steel
     * @constructor
     */
    Chart.prototype.ISetChartTheme = function(theme){
        this.loadFile(bootPath + "/js/themes/" + theme + ".js");
    };

    /**
     * 设置通用图表主题
     * @param theme 主题名称dark-blue|dark-green|dark-unica|gray|grid|grid-light|sand-signika|skies|future|pastel|steel
     * @constructor
     */
    Chart.prototype.ISetChartCommonTheme = function(theme){
        this.commonTheme = true;
        this.loadFile(bootPath + "/js/themes/" + theme + ".js");
    };

    /**
     * 指定绘制区所要绘制的图的类型
     * @param sChartType 可设置area, areaspline, bar, column, line, pie, scatter, spline, arearange, areasplinerange and columnrange。默认为line
     * @constructor
     */
    Chart.prototype.ISetChartType = function (sChartType) {
        this.set('options.chart.type', sChartType);
    };

    /**
     * 设置图表的缩放与拖动
     * @param sZoomType  图表缩放方向，默认为null，可设置x,y,xy
     * @param bPanning 当图表缩放后是否可以拖动查看，默认false
     * @param strPanKey 当可以拖动缩放同时设置时，设置哪个键切换这两种状态，如“shift”键
     * @constructor
     */
    Chart.prototype.ISetChartZoom = function(sZoomType, bPanning, strPanKey){
        if(/x|y|xy/.test(sZoomType)){
            this.set('options.chart.zoomType', sZoomType);
        }
        this.set('options.chart.panKey', strPanKey);
        bPanning != undefined && this.set('options.chart.panning', !!bPanning);
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓标题属性接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 标题是否浮动。当设置浮动（即该属性值为true）时，标题将不占空间
     * @param bFloating 默认为false
     * @constructor
     */
    Chart.prototype.ISetTitleFloating = function (bFloating) {
        this.set('options.title.floating', !!bFloating);
    };

    /**
     * 标题和图表区的间隔，当有副标题，表示标题和副标题之间的间隔。
     * @param nMargin 默认为15
     * @constructor
     */
    Chart.prototype.ISetTitleMargin = function (nMargin) {
        this.set('options.title.margin', number_format(nMargin));
    };

    /**
     * 设置标题的位置
     * @param sAlign 水平位置"left", "center" and "right".
     * @param sVerticalAlign 垂直位置 "top", "middle" and "bottom"，并且当给定一个值后，该标题将表现为浮动
     * @param x 相对于水平对齐的偏移量，取值范围为：图表左边距到图表右边距，可以是负值，单位px。默认为0
     * @param y 相对于垂直对齐的偏移量，取值范围：图表的上边距到图表的下边距，可以是负值，单位是px。 默认： 取决于字体的大小。
     * @constructor
     */
    Chart.prototype.ISetTitlePosition = function (sAlign, sVerticalAlign, x, y) {
        if(/left|center|right/i.test(sAlign)){
            this.set('options.title.align', sAlign);
        }
        if(/top|middle|bottom/.test(sVerticalAlign)){
            this.set('options.title.verticalAlign', sVerticalAlign);
        }
        this.set('options.title.x', number_format(x));
        this.set('options.title.y', number_format(y));
    };

    /**
     * 设置标题旋转角度
     * @param nRotation 默认为0
     * @constructor
     */
    Chart.prototype.ISetTitleRotation = function(nRotation){
        this.set('options.title.rotation', number_format(nRotation));
    };

    /**
     * 设置标题文本样式，字体大小颜色粗细等
     * @param style 默认"12,#333333,normal"
     * @constructor
     */
    Chart.prototype.ISetTitleStyle = function (style) {
        this.set('options.title.style', font_formatStyle(style));
    };

    /**
     * 设置标题显示文本，为""时不显示
     * @param sTitle 默认是： Chart title.
     * @constructor
     */
    Chart.prototype.ISetTitleText = function (sTitle) {
        this.set('options.title.text', sTitle);
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓图例属性接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置图例背景
     * @param bEnabled 是否启用背景
     * @param sBackgroundColor 图例容器的背景颜色。默认null
     * @param fBackgroundOpacity 图例容器的背景透明度，默认1
     * @constructor
     */
    Chart.prototype.ISetLegendBackground = function (bEnabled, sBackgroundColor, fBackgroundOpacity) {
        this.set('options.legend.backgroundEnabled', !!bEnabled);
        if(!!bEnabled){
            this.set('options.legend.backgroundColor', color_format(sBackgroundColor));
            this.set('options.legend.backgroundOpacity', number_format(fBackgroundOpacity));
        }
    };

    /**
     * 设置图例边框
     * @param bEnabled 是否使用边框
     * @param fBorderWidth 图例容器的边框宽度，默认是：0.
     * @param strBorderColor 图例容器的边框颜色，默认是： #909090
     * @param fBorderRadius 图例容器的边框圆角，默认是：0
     * @constructor
     */
    Chart.prototype.ISetLegendBorder = function (bEnabled, fBorderWidth, strBorderColor, fBorderRadius) {
        this.set('options.legend.borderEnabled', !!bEnabled);
        if(!!bEnabled){
            this.set('options.legend.borderWidth', number_format(fBorderWidth));
            this.set('options.legend.borderColor', color_format(strBorderColor));
            this.set('options.legend.borderRadius', number_format(fBorderRadius));
        }
    };

    /**
     * 图例容器是否可以浮动，当此值设置为false时，图例是不可在数据区域图之上，它们是不可重叠的，而设成true，则可。
     * @param bFloating 默认是： false.
     * @constructor
     */
    Chart.prototype.ISetLegendFloating = function (bFloating) {
        this.set('options.legend.floating', !!bFloating);
    };

    /**
     * 当图例容器中的图例是水平布局时，这个属性定义了它们之间的距离，单位为像素
     * @param nDistance 默认是： 20.
     * @constructor
     */
    Chart.prototype.ISetLegendItemDistance = function (nDistance) {
        this.set('options.legend.itemDistance', number_format(nDistance));
    };

    /**
     * 当点击图例进行隐藏时，CSS样式可以应用到图例容器中每个图例，它仅支持部分CSS，尤其对于文本样式，style内容能被很好的继承除非要重写
     * @param sItemHiddenStyle 按照字体、大小、颜色、粗细的顺序以逗号分隔的字符串，默认颜色为#CCC
     * @constructor
     */
    Chart.prototype.ISetLegendItemHiddenStyle = function (sItemHiddenStyle) {
        this.set('options.legend.itemHiddenStyle', font_formatStyle(sItemHiddenStyle));
    };

    /**
     * 当图例悬浮时的样式，它仅支持部分CSS，尤其对于文本样式，style内容能被很好的继承除非要重写
     * @param sItemHoverStyle 按照字体、大小、颜色、粗细的顺序以逗号分隔的字符串
     * @constructor
     */
    Chart.prototype.ISetLegendItemHoverStyle = function (sItemHoverStyle) {
        this.set('options.legend.itemHoverStyle', font_formatStyle(sItemHoverStyle));
    };

    /**
     * 每个图例项的样式
     * @param sItemStyle 按照字体、大小、颜色、粗细的顺序以逗号分隔的字符串
     * @constructor
     */
    Chart.prototype.ISetLegendItemStyle = function (sItemStyle) {
        this.set('options.legend.itemStyle', font_formatStyle(sItemStyle));
    };

    /**
     * 设置图例项的大小
     * @param nWidth 每个图例项的宽度。当图例有很多图例项，并且用户想要这些图例项在同一平面内垂直对齐，此时这个属性可帮用户实现此效果。
     * @param nMarginBottom 图例的每一项的底部外边距，单位px，默认值：0
     * @param nMarginTop 图例的每一项的顶部外边距，单位px，默认值：0
     * @constructor
     */
    Chart.prototype.ISetLegendItemSize = function (nWidth, nMarginBottom, nMarginTop) {
        this.set('options.legend.itemWidth', number_format(nWidth));
        this.set('options.legend.itemMarginBottom', number_format(nMarginBottom));
        this.set('options.legend.itemMarginTop', number_format(nMarginTop));
    };

    /**
     * 每个图例标签的格式化字符串。此属性可引用在数列或者饼图节点对象中变量。
     * @param sFormat 默认是： {name}.
     * @constructor
     */
    Chart.prototype.ISetLegendLabelFormat = function (sFormat) {
        this.set('options.legend.labelFormat', sFormat);
    };

    /**
     * 每个图例标签的格式化的回调函数。这个this.关键字是指series对象(的属性),或者是饼图扇形数据节点。默认的是series或者数据列的name属性将被输出。
     * @param func 回调函数
     * @constructor
     */
    Chart.prototype.ISetLegendLabelFormatter = function (func) {
        this.set('options.legend.labelFormatter', func);
    };

    /**
     * 图例数据项的布局。布局类型：水平或垂直。默认是：水平
     * @param sLayout 可设置垂直排列（vertical或v），水平排列（horizontal或默认）
     * @constructor
     */
    Chart.prototype.ISetLegendLayout = function (sLayout) {
        if(sLayout == "v" || sLayout == "vertical"){
            this.set('options.legend.layout', "vertical");
        }
        else{
            this.set('options.legend.layout', "horizontal");
        }
    };

    /**
     * 整个图例区的外边距。如果整个图型区的大小是自动计算得出并且图例不浮动，那么图例边距的空间是指整个图例与坐标轴标签或者图形区之间的距离。
     * @param nMargin 默认值是：15
     * @constructor
     */
    Chart.prototype.ISetLegendMargin = function (nMargin) {
        this.set('options.legend.margin', number_format(nMargin));
    };

    /**
     * 设置图例内部留白
     * @param nPadding 默认8
     * @constructor
     */
    Chart.prototype.ISetLegendPadding = function (nPadding) {
        this.set('options.legend.padding', number_format(nPadding));
    };

    /**
     * 设置图例的位置
     * @param sAlign 水平位置"left", "center" and "right".
     * @param sVerticalAlign 垂直位置 "top", "middle" and "bottom"
     * @param x 整个图例Ｘ轴偏移量，它是相对于水平布局定下后，chart.spacingLeft 和 chart.spacingRight.的空间左右移动，当ｘ值为负值时，图例朝左移动；正值时，图例朝右移动。默认0
     * @param y 整个图例垂直偏移量，它是相对于垂直布局定下后，chart.spacingTop 和 chart.spacingBottom的空间垂直移动，当y值为负值时，图例朝上移动；正值时，图例朝下移动。默认0
     * @constructor
     */
    Chart.prototype.ISetLegendPosition = function (sAlign, sVerticalAlign, x, y) {
        if(/left|center|right/i.test(sAlign)){
            this.set('options.legend.align', sAlign);
        }
        if(/top|middle|bottom/.test(sVerticalAlign)){
            this.set('options.legend.verticalAlign', sVerticalAlign);
        }
        this.set('options.legend.x', number_format(x));
        this.set('options.legend.y', number_format(y));
    };

    /**
     * 反转图例项的显示顺序
     * @param bReversed 默认是： false.
     * @constructor
     */
    Chart.prototype.ISetLegendReversed = function (bReversed) {
        this.set('options.legend.reversed', !!bReversed);
    };

    /**
     * 设置图例边框阴影
     * @param bShadow
     * @constructor
     */
    Chart.prototype.ISetLegendShadow = function (bShadow) {
        this.set('options.legend.shadow', !!bShadow);
    };

    /**
     * 设置图例大小
     * @param nWidth 图例容器的宽度
     * @param nHeight 图例容器的高度
     * @param nMaxHeight 图例的最大高度。当超出最大高度，此时导航将显示。
     * @constructor
     */
    Chart.prototype.ISetLegendSize = function (nWidth, nHeight, nMaxHeight) {
        this.set('options.legend.width', number_format(nWidth));
        this.set('options.legend.height', number_format(nHeight));
        this.set('options.legend.maxHeight', number_format(nMaxHeight));
    };

    /**
     * 设置图例符号的大小，与图例项名称之间的间距等
     * @param nWidth 图标宽度。默认是： 16. 单位：px
     * @param nHeight 图标(图例中的符号)高度。默认是： 12.
     * @param nPadding 图标和图例中的文本之间的距离。默认是： 5.单位：px
     * @param nRadius 当图例是用矩形包裹时，图标的边框半径。默认是： 2.
     * @constructor
     */
    Chart.prototype.ISetLegendSymbol = function (nWidth, nHeight, nPadding, nRadius) {
        this.set('options.legend.symbolWidth', number_format(nWidth));
        this.set('options.legend.symbolHeight', number_format(nHeight));
        this.set('options.legend.symbolPadding', number_format(nPadding));
        this.set('options.legend.symbolRadius', number_format(nRadius));
    };

    /**
     * 设置图例的符号是否在标签的右边
     * @param bRightToLabel 默认是： false
     * @constructor
     */
    Chart.prototype.ISetLegendSymbolRightToLabel = function (bRightToLabel) {
        this.set('options.legend.rtl', !!bRightToLabel);
    };

    /**
     * 设置图例的标题
     * @param sText 标题可以是文本或者HTML字符串。默认是： "null".
     * @param sStyle 图例上方的标题的样式。为字体、大小、颜色、粗细的顺序以逗号分隔的字符串
     * @constructor
     */
    Chart.prototype.ISetLegendTitle = function (sText, sStyle) {
        this.set('options.legend.title.text', sText);
        this.set('options.legend.title.style', font_formatStyle(sStyle));
    };

    /**
     * 设置图例是否可见
     * @param bool 默认是： true
     * @constructor
     */
    Chart.prototype.ISetLegendVisible = function (bool) {
        this.set('options.legend.enabled', !!bool);
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓坐标轴属性接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 坐标轴刻度值是否允许为小数；
     * @param bAllowDecimals 默认是：true.
     * @constructor
     */
    Chart.prototype.ISetAxisXAllowDecimals = function (bAllowDecimals) {
        this.set('x_axis.allowDecimals', !!bAllowDecimals);
    };

    /**
     * 坐标轴刻度值是否允许为小数
     * @param bAllowDecimals 默认是：true.
     * @constructor
     */
    Chart.prototype.ISetAxisYAllowDecimals = function (bAllowDecimals) {
        this.set('y_axis.allowDecimals', !!bAllowDecimals);
    };

    /**
     * 相间的网格列颜色。当设置了此属性，网格中会隔列显示该颜色；
     * @param bAlternateGridColor 可设置渐变色
     * @constructor
     */
    Chart.prototype.ISetAxisXAlternateGridColor = function (bAlternateGridColor) {
        this.set('x_axis.alternateGridColor', color_format(bAlternateGridColor));
    };

    /**
     * 相间的网格列颜色。当设置了此属性，网格中会隔列显示该颜色；
     * @param bAlternateGridColor 可设置渐变色
     * @constructor
     */
    Chart.prototype.ISetAxisYAlternateGridColor = function (bAlternateGridColor) {
        this.set('y_axis.alternateGridColor', color_format(bAlternateGridColor));
    };

    /**
     * 设置分类坐标轴中坐标轴标签显示的值
     * @param sCategories 以逗号分隔的字符串
     * @constructor
     */
    Chart.prototype.ISetAxisXCategories = function (sCategories) {
        this.set('x_axis.categories', array_fromString(sCategories,"string"));
    };

    /**
     * 设置时间日期坐标轴年、月、周、日、时、分、秒、毫秒的值
     * @param sDateTimeLabelFormats 以逗号分割的字符串
     * @constructor
     */
    Chart.prototype.ISetAxisXDateTimeLabelFormats = function (sDateTimeLabelFormats) {
        this.set('x_axis.dateTimeLabelFormats', dateFormat_fromString(sDateTimeLabelFormats));
    };

    /**
     * 设置横轴事件
     * @param eventType afterSetExtremes, setExtremes:
     * @param func
     * @constructor
     */
    Chart.prototype.ISetAxisXEvents = function(eventType, func){
        if(/afterSetExtremes|setExtremes/.test(eventType)){
            this.set('x_axis.events.' + eventType, func);
        }
    };

    /**
     * 设置纵轴事件
     * @param eventType afterSetExtremes, setExtremes:
     * @param func
     * @constructor
     */
    Chart.prototype.ISetAxisYEvents = function(eventType, func){
        if(/afterSetExtremes|setExtremes/.test(eventType)){
            this.set('y_axis.events.' + eventType, func);
        }
    };

    /**
     * 设置x轴网格线的颜色、宽度、样式
     * @param strLineColor 网格线的颜色,默认是： #C0C0C0.
     * @param strLineWidth 网格线的宽度,默认是： 0.
     * @param strLineStyle 网格线的线条风格样式, 可设置0-10的数值，默认实线
     * @constructor
     */
    Chart.prototype.ISetAxisXGrid = function (strLineColor, strLineWidth, strLineStyle) {
        this.set('x_axis.gridLineColor', color_format(strLineColor));
        this.set('x_axis.gridLineWidth', number_format(strLineWidth));
        this.set('x_axis.gridLineDashStyle', this.getLineStyle(strLineStyle));
    };

    /**
     * 设置y轴网格线的颜色、宽度、样式
     * @param strLineColor 网格线的颜色,默认是： #C0C0C0.
     * @param strLineWidth 网格线的宽度,默认是： 0.
     * @param strLineStyle 网格线的线条风格样式, 可设置0-10的数值，默认实线
     * @constructor
     */
    Chart.prototype.ISetAxisYGrid = function (strLineColor, strLineWidth, strLineStyle) {
        this.set('y_axis.gridLineColor', color_format(strLineColor));
        this.set('y_axis.gridLineWidth', number_format(strLineWidth));
        this.set('y_axis.gridLineDashStyle', this.getLineStyle(strLineStyle));
    };

    /**
     * 设置x轴次网格线的颜色、宽度、样式
     * @param strLineColor 网格线的颜色,默认是： #E0E0E0.
     * @param strLineWidth 网格线的宽度,默认是： 0.
     * @param strLineStyle 网格线的线条风格样式, 可设置0-10的数值，默认实线
     * @constructor
     */
    Chart.prototype.ISetAxisXMinorGrid = function (strLineColor, strLineWidth, strLineStyle) {
        this.set('x_axis.minorGridLineColor', color_format(strLineColor));
        this.set('x_axis.minorGridLineWidth', number_format(strLineWidth));
        this.set('x_axis.minorGridLineDashStyle', this.getLineStyle(strLineStyle));
    };

    /**
     * 设置y轴次网格线的颜色、宽度、样式
     * @param strLineColor 网格线的颜色,默认是： #E0E0E0.
     * @param strLineWidth 网格线的宽度,默认是： 0.
     * @param strLineStyle 网格线的线条风格样式, 可设置0-10的数值，默认实线
     * @constructor
     */
    Chart.prototype.ISetAxisYMinorGrid = function (strLineColor, strLineWidth, strLineStyle) {
        this.set('y_axis.minorGridLineColor', color_format(strLineColor));
        this.set('y_axis.minorGridLineWidth', number_format(strLineWidth));
        this.set('y_axis.minorGridLineDashStyle', this.getLineStyle(strLineStyle));
    };

    /**
     * 设置坐标轴ID
     * @param sID 字符串
     * @constructor
     */
    Chart.prototype.ISetAxisXID = function (sID) {
        var xID = this.get('x_axis.id');
        for(var i = 0; i < this.series.length; i++){
            if(this.series[i].xAxis == xID){
                this.series[i].xAxis = sID;
            }
        }
        this.set('x_axis.id', sID);
    };

    /**
     * 设置坐标轴ID
     * @param sID 字符串
     * @constructor
     */
    Chart.prototype.ISetAxisYID = function (sID) {
        var yID = this.get('y_axis.id');
        for(var i = 0; i < this.series.length; i++){
            if(this.series[i].yAxis == yID){
                this.series[i].yAxis = sID;
            }
        }
        this.set('y_axis.id', sID);
    };

    /**
     * 设置轴标签是否简化显示，时间坐标轴时简化重复年或月
     * @param bool
     * @constructor
     */
    Chart.prototype.ISetAxisXLabelsContract = function(bool){
        this.set('x_axis.labels.isContract', !!bool);
    };

    /**
     * 设置坐标轴标签的显示方式
     * @param nStep 轴标签显示间隔数。 默认情况下，该间隔数是自动计算的以避免轴标签重叠。为了防止这种情况，将其设置为1。这通常发生类别轴上，也往往是你选择了错误的轴类型的标志
     * @param nStaggerLines 水平轴标签显示的行数。当轴标签内容过多时，可以通过该属性控制显示的行数，默认null
     * @param nMaxStaggerLines 仅在水平轴使用。当没有设置staggerLines，maxStaggerLines限定用多少行来显示轴轴标签自动地的避免某些标签的重叠。设置为1表示禁用重叠检测。默认是： 5
     * @constructor
     */
    Chart.prototype.ISetAxisXLabelsDisplay = function (nStep, nStaggerLines, nMaxStaggerLines) {
        this.set('x_axis.labels.step', number_format(nStep));
        this.set('x_axis.labels.staggerLines', number_format(nStaggerLines));
        this.set('x_axis.labels.maxStaggerLines', number_format(nMaxStaggerLines));
    };

    /**
     * 设置坐标轴标签的显示方式
     * @param nStep 轴标签显示间隔数。 默认情况下，该间隔数是自动计算的以避免轴标签重叠。为了防止这种情况，将其设置为1。这通常发生类别轴上，也往往是你选择了错误的轴类型的标志
     * @param nStaggerLines 水平轴标签显示的行数。当轴标签内容过多时，可以通过该属性控制显示的行数，默认null
     * @param nMaxStaggerLines 仅在水平轴使用。当没有设置staggerLines，maxStaggerLines限定用多少行来显示轴轴标签自动地的避免某些标签的重叠。设置为1表示禁用重叠检测。默认是： 5
     * @constructor
     */
    Chart.prototype.ISetAxisYLabelsDisplay = function (nStep, nStaggerLines, nMaxStaggerLines) {
        this.set('y_axis.labels.step', number_format(nStep));
        this.set('y_axis.labels.staggerLines', number_format(nStaggerLines));
        this.set('y_axis.labels.maxStaggerLines', number_format(nMaxStaggerLines));
    };

    /**
     * 设置坐标轴标签格式，{value}表示当前标签值
     * @param sFormat 默认是： {value}
     * @constructor
     */
    Chart.prototype.ISetAxisXLabelsFormat = function (sFormat) {
        this.set('x_axis.labels.format', sFormat);
    };

    /**
     * 设置坐标轴标签格式，{value}表示当前标签值
     * @param sFormat 默认是： {value}
     * @constructor
     */
    Chart.prototype.ISetAxisYLabelsFormat = function (sFormat) {
        this.set('y_axis.labels.format', sFormat);
    };

    /**
     * 回调javascript函数来格式化标签，值通过this.value获得，this的其他属性还包括axis, chart, isFirst and isLast. 默认返回this.value
     * @param func 回调函数
     * @constructor
     */
    Chart.prototype.ISetAxisXLabelsFormatter = function (func) {
        this.set('x_axis.labels.formatter', func);
    };

    /**
     * 回调javascript函数来格式化标签，值通过this.value获得，this的其他属性还包括axis, chart, isFirst and isLast. 默认返回this.value
     * @param func 回调函数
     * @constructor
     */
    Chart.prototype.ISetAxisYLabelsFormatter = function (func) {
        this.set('y_axis.labels.formatter', func);
    };

    /**
     * 设置坐标轴标签的旋转角度
     * @param nRotation 默认是： 0.
     * @constructor
     */
    Chart.prototype.ISetAxisXLabelsRotation = function (nRotation) {
        this.set('x_axis.labels.rotation', number_format(nRotation));
    };

    /**
     * 设置坐标轴标签的旋转角度
     * @param nRotation 默认是： 0.
     * @constructor
     */
    Chart.prototype.ISetAxisYLabelsRotation = function (nRotation) {
        this.set('y_axis.labels.rotation', number_format(nRotation));
    };

    /**
     * 设置坐标轴标签的显示样式
     * @param style 为字体、大小、颜色、粗细的顺序以逗号分隔的字符串
     * @constructor
     */
    Chart.prototype.ISetAxisXLabelsStyle = function (style) {
        this.set('x_axis.labels.style', font_formatStyle(style));
    };

    /**
     * 设置坐标轴标签的显示样式
     * @param style 为字体、大小、颜色、粗细的顺序以逗号分隔的字符串
     * @constructor
     */
    Chart.prototype.ISetAxisYLabelsStyle = function (style) {
        this.set('y_axis.labels.style', font_formatStyle(style));
    };

    /**
     * 设置坐标轴轴标签的位置
     * @param sAlign 轴标签的水平对其方式，可取的值："left", "center" or "right".默认是居中显示
     * @param x 轴标签相对于轴刻度在水平方向上的偏移量，默认是： 0.
     * @param y 轴标签相对于轴刻度在y轴方向上的偏移量，默认根据轴标签字体大小给予适当的值，默认是： "null".
     * @constructor
     */
    Chart.prototype.ISetAxisXLabelsPosition = function (sAlign, x, y) {
        if(/left|center|right/.test(sAlign)){
            this.set('x_axis.labels.align', sAlign);
        }
        this.set('x_axis.labels.x', number_format(x));
        this.set('x_axis.labels.y', number_format(y));
    };

    /**
     * 设置坐标轴轴标签的位置
     * @param sAlign 轴标签的水平对其方式，可取的值："left", "center" or "right".默认是居中显示
     * @param x 轴标签相对于轴刻度在水平方向上的偏移量，默认是： 0.
     * @param y 轴标签相对于轴刻度在y轴方向上的偏移量，默认根据轴标签字体大小给予适当的值，默认是： "null".
     * @constructor
     */
    Chart.prototype.ISetAxisYLabelsPosition = function (sAlign, x, y) {
        if(/left|center|right/.test(sAlign)){
            this.set('y_axis.labels.align', sAlign);
        }
        this.set('y_axis.labels.x', number_format(x));
        this.set('y_axis.labels.y', number_format(y));
    };

    /**
     * 是否显示轴标签
     * @param bShow 默认是： true.
     * @constructor
     */
    Chart.prototype.ISetAxisXLabelsVisible = function (bShow) {
        this.set('x_axis.labels.enabled', !!bShow);
    };

    /**
     * 是否显示轴标签
     * @param bShow 默认是： true.
     * @constructor
     */
    Chart.prototype.ISetAxisYLabelsVisible = function (bShow) {
        this.set('y_axis.labels.enabled', !!bShow);
    };

    /**
     * 设置x轴轴线的颜色、宽度、样式
     * @param strLineColor 轴线的颜色，默认是： #C0D0E0
     * @param strLineWidth 轴线的宽度，默认是： 1
     * @param strLineStyle 轴线的样式，可设置0-10，默认实线
     * @constructor
     */
    Chart.prototype.ISetAxisXLine = function (strLineColor, strLineWidth, strLineStyle) {
        this.set('x_axis.lineColor', color_format(strLineColor));
        this.set('x_axis.lineWidth', number_format(strLineWidth));
        this.set('x_axis.lineStyle', this.getLineStyle(strLineStyle));
    };

    /**
     * 设置y轴轴线的颜色、宽度、样式
     * @param strLineColor 轴线的颜色，默认是： #C0D0E0
     * @param strLineWidth 轴线的宽度，默认是： 1
     * @param strLineStyle 轴线的样式，可设置0-10，默认实线
     * @constructor
     */
    Chart.prototype.ISetAxisYLine = function (strLineColor, strLineWidth, strLineStyle) {
        this.set('y_axis.lineColor', color_format(strLineColor));
        this.set('y_axis.lineWidth', number_format(strLineWidth));
        this.set('y_axis.lineStyle', this.getLineStyle(strLineStyle));
    };

    /**
     * 指向本轴的另一个轴的索引。当一个轴指向主轴时，它将有和主轴一样的极端值，但是通过min，max或setExtremes可以更改。它也可以用来显示附加的信息，或者通过标尺来扩展图表的显示。
     * @param nIndex 为轴的索引值
     * @constructor
     */
    Chart.prototype.ISetAxisXLinkedTo = function (nIndex) {
        this.set('x_axis.linkedTo', number_format(nIndex));
    };

    /**
     * 指向本轴的另一个轴的索引。当一个轴指向主轴时，它将有和主轴一样的极端值，但是通过min，max或setExtremes可以更改。它也可以用来显示附加的信息，或者通过标尺来扩展图表的显示。
     * @param nIndex 为轴的索引值
     * @constructor
     */
    Chart.prototype.ISetAxisYLinkedTo = function (nIndex) {
        this.set('y_axis.linkedTo', number_format(nIndex));
    };

    /**
     * How to handle overflowing labels on horizontal axis. Can be undefined, false or "justify". By default it aligns inside the chart area. If "justify", labels will not render outside the plot area. If false, it will not be aligned at all. If there is room to move it, it will be aligned to the edge, else it will be removed.
     * @param sOverflow 为轴的索引值
     * @constructor
     */
    Chart.prototype.ISetAxisXOverflow = function (sOverflow) {
        this.set('x_axis.labels.overflow', sOverflow);
    };

    /**
     * 设置x轴刻度的样式和位置
     * @param fWidth 刻度线的宽度，默认是： 1
     * @param fLength 刻度线的长度，默认是： 10
     * @param strColor 刻度线的颜色，默认是： #C0D0E0
     * @param strPosition 刻度线相对于轴线的位置，可以取的值为inside 和 outside。默认 outside.
     * @param strTickMarkPlacement 仅适用于类别轴。如果设置为on刻度线位于在类别名称的中心，如果设置为between刻度线位于类别名称之间。如果刻度线间隔数为1，其默认值是between，否则默认只是on，默认是： "null"
     * @constructor
     */
    Chart.prototype.ISetAxisXTick = function (fWidth, fLength, strColor, strPosition, strTickMarkPlacement) {
        this.set('x_axis.tickWidth', number_format(fWidth));
        this.set('x_axis.tickLength', number_format(fLength));
        this.set('x_axis.tickColor', color_format(strColor));
        if(/inside|outside/.test(strPosition)){
            this.set('x_axis.tickPosition', strPosition);
        }
        if(/on|between/){
            this.set("x_axis.tickmarkPlacement",strTickMarkPlacement);
        }
    };

    /**
     * 设置y轴刻度的样式和位置
     * @param fWidth 刻度线的宽度，默认是： 1
     * @param fLength 刻度线的长度，默认是： 10
     * @param strColor 刻度线的颜色，默认是： #C0D0E0
     * @param strPosition 刻度线相对于轴线的位置，可以取的值为inside 和 outside。默认 outside.
     * @param strTickMarkPlacement 仅适用于类别轴。如果设置为on刻度线位于在类别名称的中心，如果设置为between刻度线位于类别名称之间。如果刻度线间隔数为1，其默认值是between，否则默认只是on，默认是： "null"
     * @constructor
     */
    Chart.prototype.ISetAxisYTick = function (fWidth, fLength, strColor, strPosition, strTickMarkPlacement) {
        this.set('y_axis.tickWidth', number_format(fWidth));
        this.set('y_axis.tickLength', number_format(fLength));
        this.set('y_axis.tickColor', color_format(strColor));
        if(/inside|outside/.test(strPosition)){
            this.set('y_axis.tickPosition', strPosition);
        }
        if(/on|between/){
            this.set("y_axis.tickmarkPlacement",strTickMarkPlacement);
        }
    };

    /**
     * 设置x轴次刻度的样式和位置
     * @param fWidth 次级刻度线的宽度,默认是： 0
     * @param fLength 次级刻度线的长度,默认是： 2.
     * @param strColor 次级刻度线的颜色,默认是： #A0A0A0
     * @param strPosition 次级刻度线相对于轴线的位置，可取值为：inside和outside,默认是： outside
     * @constructor
     */
    Chart.prototype.ISetAxisXMinorTick = function (fWidth, fLength, strColor, strPosition) {
        this.set('x_axis.minorTickWidth', number_format(fWidth));
        this.set('x_axis.minorTickLength', number_format(fLength));
        this.set('x_axis.minorTickColor', color_format(strColor));
        if(/inside|outside/.test(strPosition)){
            this.set('x_axis.minorTickPosition', strPosition);
        }
    };

    /**
     * 设置y轴次刻度的样式和位置
     * @param fWidth 次级刻度线的宽度,默认是： 0
     * @param fLength 次级刻度线的长度,默认是： 2.
     * @param strColor 次级刻度线的颜色,默认是： #A0A0A0
     * @param strPosition 次级刻度线相对于轴线的位置，可取值为：inside和outside,默认是： outside
     * @constructor
     */
    Chart.prototype.ISetAxisYMinorTick = function (fWidth, fLength, strColor, strPosition) {
        this.set('y_axis.minorTickWidth', number_format(fWidth));
        this.set('y_axis.minorTickLength', number_format(fLength));
        this.set('y_axis.minorTickColor', color_format(strColor));
        if(/inside|outside/.test(strPosition)){
            this.set('y_axis.minorTickPosition', strPosition);
        }
    };

    /**
     * 标题到轴线的距离；默认情况下，这个距离是标题外边距与轴标签宽度之和。如果设置了offset,它将覆盖这个默认的值。
     * @param nOffset 默认是： 0
     * @constructor
     */
    Chart.prototype.ISetAxisXOffset = function (nOffset) {
        this.set('x_axis.offset', number_format(nOffset));
    };

    /**
     * 标题到轴线的距离；默认情况下，这个距离是标题外边距与轴标签宽度之和。如果设置了offset,它将覆盖这个默认的值。
     * @param nOffset 默认是： 0
     * @constructor
     */
    Chart.prototype.ISetAxisYOffset = function (nOffset) {
        this.set('y_axis.offset', number_format(nOffset));
    };

    /**
     * 是否在正常显示的对立面显示轴。正常是垂直坐标轴显示在左边，水平坐标轴显示在底部，因此对立面就是垂直坐标轴显示在右边和水平坐标轴显示在顶部，这通常用于有两个或多个坐标轴。
     * @param bOpposite 默认false
     * @constructor
     */
    Chart.prototype.ISetAxisXOpposite = function (bOpposite) {
        this.set('x_axis.opposite', !!bOpposite);
    };

    /**
     * 是否在正常显示的对立面显示轴。正常是垂直坐标轴显示在左边，水平坐标轴显示在底部，因此对立面就是垂直坐标轴显示在右边和水平坐标轴显示在顶部，这通常用于有两个或多个坐标轴。
     * @param bOpposite 默认false
     * @constructor
     */
    Chart.prototype.ISetAxisYOpposite = function (bOpposite) {
        this.set('y_axis.opposite', !!bOpposite);
    };

    /**
     * 设置坐标轴最大值最小值与坐标轴两端之间的间距。当你不想要最低值或最高值出现在绘图区域的边缘时这个非常有用。
     * @param fMinPadding 内边距的最小值。与该条轴线长度的有关。内边距设置为0.05相对于100px的轴线是5px。
     * @param fMaxPadding 内边距的最大值。与该条轴线长度的有关。内边距设置为0.05相对于100px的轴线是5px。
     * @constructor
     */
    Chart.prototype.ISetAxisXPadding = function (fMinPadding, fMaxPadding) {
        this.set('x_axis.minPadding', number_format(fMinPadding));
        this.set('x_axis.maxPadding', number_format(fMaxPadding));
    };

    /**
     * 设置坐标轴最大值最小值与坐标轴两端之间的间距。当你不想要最低值或最高值出现在绘图区域的边缘时这个非常有用。
     * @param fMinPadding 内边距的最小值。与该条轴线长度的有关。内边距设置为0.05相对于100px的轴线是5px。
     * @param fMaxPadding 内边距的最大值。与该条轴线长度的有关。内边距设置为0.05相对于100px的轴线是5px。
     * @constructor
     */
    Chart.prototype.ISetAxisYPadding = function (fMinPadding, fMaxPadding) {
        this.set('y_axis.minPadding', number_format(fMinPadding));
        this.set('y_axis.maxPadding', number_format(fMaxPadding));
    };

    /**
     * 是否逆转轴，使得最高数最靠近原点。如果图表倒置，x轴默认是逆转的。
     * @param bReversed 默认false
     * @constructor
     */
    Chart.prototype.ISetAxisXReversed = function (bReversed) {
        this.set('x_axis.reversed', !!bReversed);
    };

    /**
     * 是否逆转轴，使得最高数最靠近原点
     * @param bReversed 默认false
     * @constructor
     */
    Chart.prototype.ISetAxisYReversed = function (bReversed) {
        this.set('y_axis.reversed', !!bReversed);
    };

    /**
     * 如果为true，非反转Y轴绘制的情况下，堆栈中的第一个数据列将显示在上面。如果为false，第一个数据列将显示在最下面
     * @param bReversed 默认是： true
     * @constructor
     */
    Chart.prototype.ISetAxisYReversedStacks = function (bReversedStacks) {
        this.set('y_axis.reversedStacks', !!bReversedStacks);
    };

    /**
     * 当坐标轴分段之间的间距
     * @param nPadding 默认是： 0
     * @constructor
     */
    Chart.prototype.ISetAxisXSectionPadding = function (nPadding) {
        this.set('x_axis.sectionPadding', number_format(nPadding));
    };

    /**
     * 当坐标轴分段之间的填充色
     * @param color 默认是： null
     * @constructor
     */
    Chart.prototype.ISetAxisXSectionPaddingColor = function (color, opacity) {
        this.set('x_axis.sectionPaddingColor', color_format(color));
        this.set('x_axis.sectionPaddingOpacity', number_format(opacity));
    };

    /**
     * 当坐标轴中没有数据时，是否显示坐标轴的轴线和标题
     * @param bShowEmpty 默认是： true
     * @constructor
     */
    Chart.prototype.ISetAxisXShowEmpty = function (bShowEmpty) {
        this.set('x_axis.showEmpty', !!bShowEmpty);
    };

    /**
     * 当坐标轴中没有数据时，是否显示坐标轴的轴线和标题
     * @param bShowEmpty 默认是： true
     * @constructor
     */
    Chart.prototype.ISetAxisYShowEmpty = function (bShowEmpty) {
        this.set('y_axis.showEmpty', !!bShowEmpty);
    };

    /**
     * 是否显示坐标轴上的第一个标签
     * @param bShowFirstLabel 默认是： true
     * @constructor
     */
    Chart.prototype.ISetAxisXShowFirstLabel = function (bShowFirstLabel) {
        this.set('x_axis.showFirstLabel', !!bShowFirstLabel);
    };

    /**
     * 是否显示坐标轴上的第一个标签
     * @param bShowFirstLabel 默认是： true
     * @constructor
     */
    Chart.prototype.ISetAxisYShowFirstLabel = function (bShowFirstLabel) {
        this.set('y_axis.showFirstLabel', !!bShowFirstLabel);
    };

    /**
     * 是否显示坐标轴上的最后一个标签
     * @param bShowFirstLabel 默认是： true
     * @constructor
     */
    Chart.prototype.ISetAxisXShowLastLabel = function (bShowLastLabel) {
        this.set('x_axis.showLastLabel', !!bShowLastLabel);
    };

    /**
     * 是否显示坐标轴上的最后一个标签
     * @param bShowFirstLabel 默认是： true
     * @constructor
     */
    Chart.prototype.ISetAxisYShowLastLabel = function (bShowLastLabel) {
        this.set('y_axis.showLastLabel', !!bShowLastLabel);
    };

    /**
     * 返回定义刻度线在坐标轴上分布的数组的返回定义刻度线在坐标轴上分布的数组的回调函数。这将覆盖tickPixelInterval和tickInterval的默认行为。这将覆盖tickPixelInterval和tickInterval的默认行为
     * @param func 回调函数
     * @constructor
     */
    Chart.prototype.ISetAxisXTickPositioner = function (func) {
        this.set('x_axis.tickPositioner', func);
    };

    /**
     * 返回定义刻度线在坐标轴上分布的数组的返回定义刻度线在坐标轴上分布的数组的回调函数。这将覆盖tickPixelInterval和tickInterval的默认行为。这将覆盖tickPixelInterval和tickInterval的默认行为
     * @param func 回调函数
     * @constructor
     */
    Chart.prototype.ISetAxisYTickPositioner = function (func) {
        this.set('y_axis.tickPositioner', func);
    };

    /**
     * 定义刻度线在坐标轴上分布的数组。这将覆盖tickPixelInterval和tickInterval的默认行为
     * @param sTickPositions 以逗号分割的字符串
     * @constructor
     */
    Chart.prototype.ISetAxisXTickPositions = function (sTickPositions) {
        this.set('x_axis.tickPositions', array_fromString(sTickPositions,"number"));
    };

    /**
     * 定义刻度线在坐标轴上分布的数组。这将覆盖tickPixelInterval和tickInterval的默认行为
     * @param sTickPositions 以逗号分割的字符串
     * @constructor
     */
    Chart.prototype.ISetAxisYTickPositions = function (sTickPositions) {
        this.set('y_axis.tickPositions', array_fromString(sTickPositions,"number"));
    };

    /**
     * 设置坐标轴标题名称
     * @param strAxisXName 它可以包含类似的，基本的HTML标签。但是文本的旋转使用向量绘制技术实现,有些文本样式会清除。通过设置text为null来禁用轴标题,默认是： Values.
     * @param strAxisYName 它可以包含类似的，基本的HTML标签。但是文本的旋转使用向量绘制技术实现,有些文本样式会清除。通过设置text为null来禁用轴标题,默认是： Values.
     * @constructor
     */
    Chart.prototype.ISetAxisName = function (strAxisXName, strAxisYName) {
        this.set('x_axis.title.text', strAxisXName);
        this.set('y_axis.title.text', strAxisYName);
    };

    /**
     * 是否启用横轴名称
     * @param bool 默认true
     * @constructor
     */
    Chart.prototype.ISetAxisXNameEnabled = function (bool) {
        this.set('x_axis.title.enabled', !!bool);
    };

    /**
     * 是否启用纵轴名称
     * @param bool 默认true
     * @constructor
     */
    Chart.prototype.ISetAxisYNameEnabled = function (bool) {
        this.set('y_axis.title.enabled', !!bool);
    };

    /**
     * 是否启用横轴名称HTML渲染
     * @param bool 默认true
     * @constructor
     */
    Chart.prototype.ISetAxisXNameUseHTML = function (bool) {
        this.set('x_axis.title.useHTML', !!bool);
    };

    /**
     * 是否启用纵轴名称HTML渲染
     * @param bool 默认true
     * @constructor
     */
    Chart.prototype.ISetAxisYNameUseHTML = function (bool) {
        this.set('y_axis.title.useHTML', !!bool);
    };

    /**
     * 轴标题距离轴值或者轴线的像素值。水平轴默认为0，垂直轴默认为10.
     * @param bool 默认true
     * @constructor
     */
    Chart.prototype.ISetAxisXNameMargin = function (nMargin) {
        this.set('x_axis.title.margin', number_format(nMargin));
    };

    /**
     * 轴标题距离轴值或者轴线的像素值。水平轴默认为0，垂直轴默认为10.
     * @param bool 默认true
     * @constructor
     */
    Chart.prototype.ISetAxisYNameMargin = function (nMargin) {
        this.set('y_axis.title.margin', number_format(nMargin));
    };

    /**
     * 标题到轴线的距离；默认情况下，这个距离是标题外边距与轴标签宽度之和。如果设置了offset,它将覆盖这个默认的值
     * @param bool 默认true
     * @constructor
     */
    Chart.prototype.ISetAxisXNameOffset = function (nOffset) {
        this.set('x_axis.title.offset', number_format(nOffset));
    };

    /**
     * 标题到轴线的距离；默认情况下，这个距离是标题外边距与轴标签宽度之和。如果设置了offset,它将覆盖这个默认的值
     * @param bool 默认true
     * @constructor
     */
    Chart.prototype.ISetAxisYNameOffset = function (nOffset) {
        this.set('y_axis.title.offset', number_format(nOffset));
    };

    /**
     * 设置坐标轴轴名的位置
     * @param sAlign 轴标题相对于轴值的对齐方式。可能的值是“low”，“middle”或“high”。默认是： middle.
     * @param x 轴标题在水平方向上的偏移量，默认是： 0.
     * @param y 轴标题在垂直方向上的偏移量，默认是： 0.
     * @constructor
     */
    Chart.prototype.ISetAxisXNamePosition = function (sAlign, x, y) {
        if(/low|middle|high/.test(sAlign)){
            this.set('x_axis.title.align', sAlign);
        }
        this.set('x_axis.title.x', number_format(x));
        this.set('x_axis.title.y', number_format(y));
    };

    /**
     * 设置坐标轴轴名的位置
     * @param sAlign 轴标题相对于轴值的对齐方式。可能的值是“low”，“middle”或“high”。默认是： middle.
     * @param x 轴标题在水平方向上的偏移量，默认是： 0.
     * @param y 轴标题在垂直方向上的偏移量，默认是： 0.
     * @constructor
     */
    Chart.prototype.ISetAxisYNamePosition = function (sAlign, x, y) {
        if(/low|middle|high/.test(sAlign)){
            this.set('y_axis.title.align', sAlign);
        }
        this.set('y_axis.title.x', number_format(x));
        this.set('y_axis.title.y', number_format(y));
    };

    /**
     * 设置坐标轴轴名的旋转角度
     * @param nRotation 水平轴默认为0度
     * @constructor
     */
    Chart.prototype.ISetAxisXNameRotation = function (nRotation) {
        this.set('x_axis.title.rotation', number_format(nRotation));
    };

    /**
     * 设置坐标轴轴名的旋转角度
     * @param nRotation 垂直轴默认为270度。
     * @constructor
     */
    Chart.prototype.ISetAxisYNameRotation = function (nRotation) {
        this.set('y_axis.title.rotation', number_format(nRotation));
    };

    /**
     * 设置x轴名样式，字体大小、颜色、粗细等
     * @param style 为字体、大小、颜色、粗细的顺序以逗号分隔的字符串
     * @constructor
     */
    Chart.prototype.ISetAxisXNameStyle = function (style) {
        if(!style){
            return;
        }
        if(isString(style)){
            style = font_formatStyle(style);
        }
        if(isObject(style)){
            for(var key in style){
                if(style.hasOwnProperty(key)){
                    this.set('x_axis.title.style.' + key, style[key]);
                }
            }
        }
    };

    /**
     * 设置y轴名样式，字体大小、颜色、粗细等
     * @param style 为字体、大小、颜色、粗细的顺序以逗号分隔的字符串
     * @constructor
     */
    Chart.prototype.ISetAxisYNameStyle = function (style) {
        if(!style){
            return;
        }
        if(isString(style)){
            style = font_formatStyle(style);
        }
        if(isObject(style)){
            for(var key in style){
                if(style.hasOwnProperty(key)){
                    this.set('y_axis.title.style.' + key, style[key]);
                }
            }
        }
    };

    Chart.prototype.ISetAxisYNameWritingMode = function (writingMode) {
        this.set('y_axis.title.style.writingMode', writingMode);
    };

    /**
     * 设置坐标轴的类型。在时间轴中，坐标轴的值是以毫秒为单位的，刻度线上显示像整数的小时或天的适当值。在类别轴中，默认采用图表数据点的名称做分类名称，如果定义类别名称数组可覆盖默认名称
     * @param sType 可以是"linear", "logarithmic", "datetime" 或者 "category"
     * @constructor
     */
    Chart.prototype.ISetAxisXType = function (sType) {
        if(/linear|logarithmic|datetime|category|fracturing/.test(sType)){
            this.set('x_axis.type', sType);
        }
    };

    /**
     * 设置坐标轴的类型。在时间轴中，坐标轴的值是以毫秒为单位的，刻度线上显示像整数的小时或天的适当值。在类别轴中，默认采用图表数据点的名称做分类名称，如果定义类别名称数组可覆盖默认名称
     * @param sType 可以是"linear", "logarithmic", "datetime" 或者 "category"
     * @constructor
     */
    Chart.prototype.ISetAxisYType = function (sType) {
        if(/linear|logarithmic|datetime|category/.test(sType)){
            this.set('y_axis.type', sType);
        }
    };

    /**
     * 设置x轴的最大值、最小值、间隔、次刻度间隔、刻度之间的像素距离
     * @param fMinValue 轴的最小值。如果是null，最小值被自动计算。如果startOnTick选项是true，min的值可能会被四舍五入。
     * @param fMaxValue 轴的最大值。如果是null，最大值被自动计算。如果code>endOnTick选项是true，max的值可能会被四舍五入。实际的最大值也会受chart.alignTicks影响
     * @param fTickInterval 坐标轴上的刻度线的单位间隔。当值为null时，刻度线间隔是根据近似于线性的(tickPixelInterval)计算的。在分类轴上，一个null的刻度间隔，默认为1，即1个类目。要注意的是，时间轴是根据毫秒来计算的，例如一天的间隔表示为24 * 3600 * 1000。在对数轴上，刻度线间隔按指数幂来算，刻度线间隔为1时，在刻度上的每个值为0.1, 1, 10, 100等。 刻度间隔为2时，在刻度上的每个值为0.1, 10, 1000等。 刻度间隔为0.2时，在刻度上的值为: 0.1, 0.2, 0.4, 0.6, 0.8, 1, 2, 4, 6, 8, 10, 20, 40等
     * @param fMinorTickInterval 次刻度线的间隔。在一个直线轴中，如果设置为"auto"，次刻度间隔计算为刻度线间隔的五分之一。如果设置为null，次刻度刻度线不显示。在对数坐标轴中，单位为幂(指数级)。例如，minorTickInterval设置为1在0.1和1，1和10，10和100之间显示一个次级刻度，minorTickInterval设置为0.1，在刻度1和10，10和100之间会产生9个次级刻度，设置为“自动”，每个刻度之间大约是5个次级刻度在轴线上使用categories, 次级刻度线是不支持的
     * @param fTickPixelInterval 如果fTickInterval为null，这个属性设置刻度线之间最接近的像素值. 分类轴中不起作用. 默认100
     * @constructor
     */
    Chart.prototype.ISetAxisXValue = function (fMinValue, fMaxValue, fTickInterval, fMinorTickInterval, fTickPixelInterval) {
        this.set('x_axis.min', number_format(fMinValue));
        this.set('x_axis.max', number_format(fMaxValue));
        this.set('x_axis.tickInterval', number_format(fTickInterval));
        this.set('x_axis.minorTickInterval', number_format(fMinorTickInterval));
        this.set('x_axis.tickPixelInterval', number_format(fTickPixelInterval));
    };

    /**
     * 设置y轴的最大值、最小值、间隔、次刻度间隔、刻度之间的像素距离
     * @param fMinValue 轴的最小值。如果是null，最小值被自动计算。如果startOnTick选项是true，min的值可能会被四舍五入。
     * @param fMaxValue 轴的最大值。如果是null，最大值被自动计算。如果code>endOnTick选项是true，max的值可能会被四舍五入。实际的最大值也会受chart.alignTicks影响
     * @param fTickInterval 坐标轴上的刻度线的单位间隔。当值为null时，刻度线间隔是根据近似于线性的(tickPixelInterval)计算的。在分类轴上，一个null的刻度间隔，默认为1，即1个类目。要注意的是，时间轴是根据毫秒来计算的，例如一天的间隔表示为24 * 3600 * 1000。在对数轴上，刻度线间隔按指数幂来算，刻度线间隔为1时，在刻度上的每个值为0.1, 1, 10, 100等。 刻度间隔为2时，在刻度上的每个值为0.1, 10, 1000等。 刻度间隔为0.2时，在刻度上的值为: 0.1, 0.2, 0.4, 0.6, 0.8, 1, 2, 4, 6, 8, 10, 20, 40等
     * @param fMinorTickInterval 次刻度线的间隔。在一个直线轴中，如果设置为"auto"，次刻度间隔计算为刻度线间隔的五分之一。如果设置为null，次刻度刻度线不显示。在对数坐标轴中，单位为幂(指数级)。例如，minorTickInterval设置为1在0.1和1，1和10，10和100之间显示一个次级刻度，minorTickInterval设置为0.1，在刻度1和10，10和100之间会产生9个次级刻度，设置为“自动”，每个刻度之间大约是5个次级刻度在轴线上使用categories, 次级刻度线是不支持的
     * @param fTickPixelInterval 如果fTickInterval为null，这个属性设置刻度线之间最接近的像素值. 分类轴中不起作用. 默认72
     * @constructor
     */
    Chart.prototype.ISetAxisYValue = function (fMinValue, fMaxValue, fTickInterval, fMinorTickInterval, fTickPixelInterval) {
        this.set('y_axis.min', number_format(fMinValue));
        this.set('y_axis.max', number_format(fMaxValue));
        this.set('y_axis.tickInterval', number_format(fTickInterval));
        this.set('y_axis.minorTickInterval', number_format(fMinorTickInterval));
        this.set('y_axis.tickPixelInterval', number_format(fTickPixelInterval));
    };

    /**
     * 设置坐标轴最大最小边界值，与max、min的不同在于轴标签的值不一定等于这个值，但是不能超过
     * @param floor 允许最低的自动计算的坐标轴刻度极端值
     * @param ceiling 允许最高的自动计算的坐标轴刻度极端值
     * @constructor
     */
    Chart.prototype.ISetAxisXValueBounds = function(floor, ceiling){
        this.set('x_axis.floor', number_format(floor));
        this.set('x_axis.ceiling', number_format(ceiling));
    };

    /**
     * 设置坐标轴最大最小边界值，与max、min的不同在于轴标签的值不一定等于这个值，但是不能超过
     * @param floor 允许最低的自动计算的坐标轴刻度极端值
     * @param ceiling 允许最高的自动计算的坐标轴刻度极端值
     * @constructor
     */
    Chart.prototype.ISetAxisYValueBounds = function(floor, ceiling){
        this.set('y_axis.floor', number_format(floor));
        this.set('y_axis.ceiling', number_format(ceiling));
    };

    /**
     * 显示该轴的最小范围。整个轴将不被允许显示比之更小的跨度范围。例如：一个时间轴的单位是毫秒，如果minRange设置为3600000，你将不能放大至比1小时更小的范围。默认x轴上的最小范围默认值是5倍的数据点间的最小间隔。在一个对数轴上，minRange的单位为幂(指数级)。所以minRange为1代表着可以放大为10-100, 100-1000, 1000-10000等
     * @param nMinRange 默认null
     * @constructor
     */
    Chart.prototype.ISetAxisXMinRange = function (nMinRange) {
        this.set('x_axis.minRange', number_format(nMinRange));
    };

    /**
     * 显示该轴的最小范围。整个轴将不被允许显示比之更小的跨度范围。例如：一个时间轴的单位是毫秒，如果minRange设置为3600000，你将不能放大至比1小时更小的范围。默认x轴上的最小范围默认值是5倍的数据点间的最小间隔。在一个对数轴上，minRange的单位为幂(指数级)。所以minRange为1代表着可以放大为10-100, 100-1000, 1000-10000等
     * @param nMinRange 默认null
     * @constructor
     */
    Chart.prototype.ISetAxisYMinRange = function (nMinRange) {
        this.set('y_axis.minRange', number_format(nMinRange));
    };

    /**
     * 坐标轴的值允许的最小刻度间隔。比如缩放轴用来显示每天的数据时可以用来阻止轴上显示小时的时间。
     * @param nMinTickInterval 默认null
     * @constructor
     */
    Chart.prototype.ISetAxisXMinTickInterval = function (nMinTickInterval) {
        this.set('x_axis.minTickInterval', number_format(nMinTickInterval));
    };

    /**
     * 坐标轴的值允许的最小刻度间隔。比如缩放轴用来显示每天的数据时可以用来阻止轴上显示小时的时间。
     * @param nMinTickInterval 默认null
     * @constructor
     */
    Chart.prototype.ISetAxisYMinTickInterval = function (nMinTickInterval) {
        this.set('y_axis.minTickInterval', number_format(nMinTickInterval));
    };

    /**
     * 设置坐标轴起始刻度或者终止刻度在坐标轴的端点上
     * @param bStartOnTick 是否强制轴线在标线处开始。使用此选项与maxPadding来控制
     * @param bEndOnTick 结束于标线；是否强制轴线在标线处结束。使用此属性与maxPadding 属性来控制。
     * @constructor
     */
    Chart.prototype.ISetAxisXOnTick = function(bStartOnTick, bEndOnTick){
        this.set('x_axis.startOnTick', !!bStartOnTick);
        this.set('x_axis.endOnTick', !!bEndOnTick);
    };

    /**
     * 设置坐标轴起始刻度或者终止刻度在坐标轴的端点上
     * @param bStartOnTick 是否强制轴线在标线处开始。使用此选项与maxPadding来控制
     * @param bEndOnTick 结束于标线；是否强制轴线在标线处结束。使用此属性与maxPadding 属性来控制。
     * @constructor
     */
    Chart.prototype.ISetAxisYOnTick = function(bStartOnTick, bEndOnTick){
        this.set('y_axis.startOnTick', !!bStartOnTick);
        this.set('y_axis.endOnTick', !!bEndOnTick);
    };

    /**
     * 定义坐标轴的间隔部分的数组。该部分的数据节点将被忽略，不在图表中显示。实现该功能需要加载模块broken-axis.js。与series.gapSize结合使用可以设置序列打断
     * @param nFrom 设置间隔部分的起始刻度值
     * @param nTo 设置间隔部分结束位置的刻度值
     * @param nBreakSize 设置间隔部分在坐标轴上所占的空间,以坐标轴刻度间隔为单位，如1则代表间隔部分占用1个单位间隔位置。时间轴时设置为60*60表示间隔一个小时。默认为0
     * @param nRepeat 以当前间隔部分的起始刻度为起点，设置当前间隔部分重复出现的间距，如nFrom设置为5，nRepeat设置为10，则从5开始每隔10开始重复，即从15的位置会再次出现间隔， 默认为0
     * @param type 设置输入的nFrom和nTo的数值类型，‘date’为时间，默认为数值
     * @constructor
     */
    Chart.prototype.IAddAxisXBreaks = function(nFrom, nTo, nBreakSize, nRepeat, type){
        var chart = this;
        chart.breaks = {
            from: type == "date" ? date_getMillisecond(nFrom) : number_format(nFrom),
            to: type == "date" ? date_getMillisecond(nTo) : number_format(nTo),
            breakSize: number_format(nBreakSize) || 0,
            repeat: number_format(nRepeat) || 0
        };
        chart.x_axis.breaks = chart.x_axis.breaks || [];
        chart.x_axis.breaks.push(chart.breaks);
    };

    /**
     * 定义坐标轴的间隔部分的数组。该部分的数据节点将被忽略，不在图表中显示。实现该功能需要加载模块broken-axis.js。
     * @param nFrom 设置间隔部分的起始刻度值
     * @param nTo 设置间隔部分结束位置的刻度值
     * @param nBreakSize 设置间隔部分在坐标轴上所占的空间,以坐标轴刻度间隔为单位，如1则代表间隔部分占用1个单位间隔位置。默认为0
     * @param nRepeat 以当前间隔部分的起始刻度为起点，设置当前间隔部分重复出现的间距，如nFrom设置为5，nRepeat设置为10，则从5开始每隔10开始重复，即从15的位置会再次出现间隔， 默认为0
     * @param type 设置输入的nFrom和nTo的数值类型，‘date’为时间，默认为数值
     * @constructor
     */
    Chart.prototype.IAddAxisYBreaks = function(nFrom, nTo, nBreakSize, nRepeat, type){
        var chart = this;
        chart.breaks = {
            from: type == "date" ? date_getMillisecond(nFrom) : number_format(nFrom),
            to: type == "date" ? date_getMillisecond(nTo) : number_format(nTo),
            breakSize: number_format(nBreakSize) || 0,
            repeat: number_format(nRepeat) || 0
        };
        chart.y_axis.breaks = chart.y_axis.breaks || [];
        chart.y_axis.breaks.push(chart.breaks);
    };

    /**
     * 添加x轴分段信息
     * @param nMin 分段最小值。
     * @param nMax 分段最大值。
     * @constructor
     */
    Chart.prototype.IAddAxisXSection = function(id, nMin, nMax){
        var chart = this;
        chart.section = {
            id: id,
            min: date_getMillisecond(nMin),
            max: date_getMillisecond(nMax)
        };
        chart.x_axis.sections = chart.x_axis.sections || [];
        chart.x_axis.sections.push(chart.section);
    };

    /**
     * 添加x轴区域划分带
     * @param nFrom 区域划分带在轴上的起始位置。
     * @param nTo 区域划分带在轴上的结束位置。
     * @constructor
     */
    Chart.prototype.IAddAxisXPlotBands = function(nFrom, nTo, type){

        var chart = this;
        chart.plotBand = {
            from: type == "date" ? date_getMillisecond(nFrom) : number_format(nFrom),
            to: type == "date" ? date_getMillisecond(nTo) : number_format(nTo)
        };
        chart.x_axis.plotBands = chart.x_axis.plotBands || [];
        chart.x_axis.plotBands.push(chart.plotBand);
    };

    /**
     * 添加y轴区域划分带
     * @param nFrom 区域划分带在轴上的起始位置。
     * @param nTo 区域划分带在轴上的结束位置。
     * @constructor
     */
    Chart.prototype.IAddAxisYPlotBands = function(nFrom, nTo){
        var chart = this;
        chart.plotBand = {
            from: number_format(nFrom),
            to: number_format(nTo)
        };
        chart.y_axis.plotBands = chart.y_axis.plotBands || [];
        chart.y_axis.plotBands.push(chart.plotBand);
    };

    /**
     * 设置区域划分带的边框
     * @param nBorderWidth 划分带边框宽度，默认是： 0
     * @param cBorderColor 划分带边框颜色，默认是： "null"
     * @constructor
     */
    Chart.prototype.ISetPlotBandsBorder = function(nBorderWidth, cBorderColor){
        this.set("plotBand.borderWidth", number_format(nBorderWidth));
        this.set("plotBand.borderColor", color_format(cBorderColor));
    };

    /**
     * 设置区域划分带的颜色
     * @param sColor 默认null
     * @constructor
     */
    Chart.prototype.ISetPlotBandsColor = function(sColor){
        this.set("plotBand.color", color_format(sColor));
    };

    /**
     * 设置区域划分带事件
     * @param eventType 可设置click, mouseover, mouseout, mousemove
     * @param func
     * @constructor
     */
    Chart.prototype.ISetPlotBandsEvents = function (eventType, func) {
        if(/click|mouseover|mouseout|mousemove/.test(eventType)){
            this.set('plotBand.events.' + eventType, func);
        }
    };

    /**
     * 区域划分带的id,一般在Axis.removePlotBand中起识别作用
     * @param sID 字符串
     * @constructor
     */
    Chart.prototype.ISetPlotBandsID = function(sID){
        this.set("plotBand.id", sID);
    };

    /**
     * 设置区域划分带中标签的位置
     * @param sAlign 区域划分带文本标签的水平对齐方式，可以取的值：’left’，’center’，’right’，默认是： center
     * @param sVerticalAlign 区域划分带文本标签相对于区域划分带在垂直方向上的对齐方式，可以取的值：’top’,’middle’,’bottom’，默认是： top.
     * @param x 相对于标签水平对齐位置的x轴偏移量
     * @param y 相对于标签垂直对齐位置的y轴偏移量
     * @constructor
     */
    Chart.prototype.ISetPlotBandsLabelPosition = function (sAlign, sVerticalAlign, x, y) {
        if(/left|center|right/i.test(sAlign)){
            this.set('plotBand.label.align', sAlign);
        }
        if(/top|middle|bottom/.test(sVerticalAlign)){
            this.set('plotBand.label.verticalAlign', sVerticalAlign);
        }
        this.set('plotBand.label.x', number_format(x));
        this.set('plotBand.label.y', number_format(y));
    };

    /**
     * 设置区域划分带中标签的旋转角度
     * @param nRotation 默认是： 0
     * @constructor
     */
    Chart.prototype.ISetPlotBandsLabelRotation = function(nRotation){
        this.set("plotBand.label.rotation", number_format(nRotation));
    };

    /**
     * 设置区域划分带中标签样式
     * @param style 为字体、大小、颜色、粗细的顺序以逗号分隔的字符串
     * @constructor
     */
    Chart.prototype.ISetPlotBandsLabelStyle = function(style){
        this.set("plotBand.label.style", font_formatStyle(style));
    };

    /**
     * 设置区域划分带中标签文本
     * @param strText 支持html文本，默认null
     * @constructor
     */
    Chart.prototype.ISetPlotBandsLabelText = function(strText){
        this.set("plotBand.label.text", strText);
    };

    /**
     * 控制仪表图中区域带的内外半径及厚度
     * @param nInnerRadius 此选项决定区域划分带沿周边延伸的内半径。它的值可被指定为百分字符串，如"100%"，也可以指定为像素数，如100；在默认情况下，内半径是由thickness选项控制。
     * @param nOuterRadius 此选项决定区域划分带沿周边延伸的外半径。它的值可被指定为百分字符串，如"100%"，也可以指定为像素数，如100；默认是： 100%
     * @param nThickness 此选项设置区域划分图带沿周边延伸的宽度。它的值可被指定为百分比字符串，如"10%"，或制定为像素数，如10；缺省值为10
     * @constructor
     */
    Chart.prototype.ISetPlotBandsRadius = function(nInnerRadius, nOuterRadius, nThickness){
        this.set("plotBand.innerRadius", number_format(nInnerRadius));
        this.set("plotBand.outerRadius", number_format(nOuterRadius));
        this.set("plotBand.thickness", number_format(nThickness));
    };

    /**
     * 区域划分带在z轴方向上的深度
     * @param nZIndex 数值型
     * @constructor
     */
    Chart.prototype.ISetPlotBandsZIndex = function(nZIndex){
        this.set("plotBand.zIndex", number_format(nZIndex));
    };

    /**
     * 添加x轴区域分割线
     * @param nValue 区域划分线代表的值
     * @constructor
     */
    Chart.prototype.IAddAxisXPlotLines = function(nValue, type){
        var chart = this;
        chart.plotLine = {
            value: type == "date" ? date_getMillisecond(nValue) : number_format(nValue)
        };
        chart.x_axis.plotLines = chart.x_axis.plotLines || [];
        chart.x_axis.plotLines.push(chart.plotLine);
    };

    /**
     * 添加y轴区域分割线
     * @param nValue 区域划分线代表的值
     * @constructor
     */
    Chart.prototype.IAddAxisYPlotLines = function(nValue){
        var chart = this;
        chart.plotLine = {
            value: number_format(nValue)
        };
        chart.y_axis.plotLines = chart.y_axis.plotLines || [];
        chart.y_axis.plotLines.push(chart.plotLine);
    };

    /**
     * 设置区域分割线的线色、线宽、线型
     * @param strLineColor 区域划分线的颜色
     * @param strLineWidth 区域划分线的宽度或者厚度
     * @param strLineStyle 区域划分线样式，0-10
     * @constructor
     */
    Chart.prototype.ISetPlotLines = function (strLineColor, strLineWidth, strLineStyle) {
        this.set('plotLine.color', color_format(strLineColor));
        this.set('plotLine.width', number_format(strLineWidth));
        this.set('plotLine.dashStyle', this.getLineStyle(strLineStyle));
    };

    /**
     * 设置区域划分线事件
     * @param eventType 可设置 click, mouseover, mouseout, mousemove
     * @param func 事件发生的回调函数
     * @constructor
     */
    Chart.prototype.ISetPlotLinesEvents = function (eventType, func) {
        if(/click|mouseover|mouseout|mousemove/.test(eventType)){
            this.set('plotLine.events.' + eventType, func);
        }
    };

    /**
     * 区域划分线的id,一般在Axis.removePlotLine中起识别作用
     * @param sID 字符串
     * @constructor
     */
    Chart.prototype.ISetPlotLinesID = function(sID){
        this.set("plotLine.id", sID);
    };

    /**
     * 设置区域划分线中标签的位置
     * @param sAlign 区域划分带文本标签的水平对齐方式，可以取的值：’left’，’center’，’right’，默认是： center
     * @param sVerticalAlign 区域划分带文本标签相对于区域划分带在垂直方向上的对齐方式，可以取的值：’top’,’middle’,’bottom’，默认是： top.
     * @param x 相对于标签水平对齐位置的x轴偏移量
     * @param y 相对于标签垂直对齐位置的y轴偏移量
     * @constructor
     */
    Chart.prototype.ISetPlotLinesLabelPosition = function (sAlign, sVerticalAlign, x, y) {
        if(/left|center|right/i.test(sAlign)){
            this.set('plotLine.label.align', sAlign);
        }
        if(/top|middle|bottom/.test(sVerticalAlign)){
            this.set('plotLine.label.verticalAlign', sVerticalAlign);
        }
        this.set('plotLine.label.x', number_format(x));
        this.set('plotLine.label.y', number_format(y));
    };

    /**
     * 设置区域划分线中标签的旋转角度
     * @param nRotation 默认0
     * @constructor
     */
    Chart.prototype.ISetPlotLinesLabelRotation = function(nRotation){
        this.set("plotLine.label.rotation", number_format(nRotation));
    };

    /**
     * 设置区域划分线中标签样式
     * @param style 为字体、大小、颜色、粗细的顺序以逗号分隔的字符串
     * @constructor
     */
    Chart.prototype.ISetPlotLinesLabelStyle = function(style){
        this.set("plotLine.label.style", font_formatStyle(style));
    };

    /**
     * 设置区域划分线中标签文本
     * @param strText 支持HTML标签
     * @constructor
     */
    Chart.prototype.ISetPlotLinesLabelText = function(strText){
        this.set("plotLine.label.text", strText);
    };

    /**
     * 区域划分带在z轴方向上的深度
     * @param nZIndex 数值型
     * @constructor
     */
    Chart.prototype.ISetPlotLinesZIndex = function(nZIndex){
        this.set("plotLine.zIndex", number_format(nZIndex));
    };

    /**
     * 设置x轴的宽度
     * @param nWidth 默认null
     * @constructor
     */
    Chart.prototype.ISetAxisXWidth = function(nWidth){
        this.set("x_axis.width", number_format(nWidth));
    };

    /**
     * 设置x轴的距离图表左侧的位置
     * @param nLeft
     * @constructor
     */
    Chart.prototype.ISetAxisXLeft = function(nLeft){
        this.set("x_axis.left", number_format(nLeft));
    };

    /**
     * 设置y轴的高度
     * @param nHeight 可以设置百分比，表示占整个曲线图的比例，默认null
     * @constructor
     */
    Chart.prototype.ISetAxisYHeight = function(nHeight){
        this.set("y_axis.height", number_format(nHeight));
    };

    /**
     * 设置y轴的距离图表顶部的位置
     * @param nTop 可设置百分比
     * @constructor
     */
    Chart.prototype.ISetAxisYTop = function(nTop){
        this.set("y_axis.top", number_format(nTop));
    };

    /**
     * 设置当前使用的x轴
     * @param id
     * @constructor
     */
    Chart.prototype.ISetAxisXContext = function(id){
        var chart = this;
        var xAxes = chart.get('options.xAxis');
        var x_axis;
        if(xAxes && isArray(xAxes)){
            x_axis = array_getElement(xAxes,function(v){return v.id == id},null);
            if(x_axis){
                chart.x_axis = x_axis;
            }
            else{
                alert("不存在id为" + id + "的x轴!");
            }
        }
    };

    /**
     * 设置当前使用的x轴
     * @param id
     * @constructor
     */
    Chart.prototype.ISetAxisYContext = function(id){
        var chart = this;
        var yAxes = chart.get('options.yAxis');
        var y_axis;
        if(yAxes && isArray(yAxes)){
            y_axis = array_getElement(yAxes,function(v){return v.id == id},null);
            if(y_axis){
                chart.y_axis = y_axis;
            }
            else{
                alert("不存在id为" + id + "的y轴!");
            }
        }
    };

    ///////////////////////////////////////////////
    //↓↓↓↓序列属性接口设置——通用属性↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 是否允许点选中
     * @param bAllowPointSelect 默认false
     * @constructor
     */
    Chart.prototype.ISetSeriesAllowPointSelect = function (bAllowPointSelect) {
        this.setSeries("allowPointSelect",bAllowPointSelect, "boolean");
    };

    /**
     * 序列显示时启用或禁用初始动画
     * @param bAnimation 默认true
     * @constructor
     */
    Chart.prototype.ISetSeriesAnimation = function (bAnimation) {
        this.setSeries("animation",bAnimation, "boolean");
    };

    /**
     * 极坐标下，序列的首尾点是否连接
     * @param bConnectEnds 默认是： true
     * @constructor
     */
    Chart.prototype.ISetSeriesConnectEnds = function (bConnectEnds) {
        this.setSeries("connectEnds",bConnectEnds, "boolean");
    };

    /**
     * 是否越过空值连接点
     * @param bConnectNulls 默认是： false
     * @constructor
     */
    Chart.prototype.ISetSeriesConnectNulls = function (bConnectNulls) {
        this.setSeries("connectNulls",bConnectNulls, "boolean");
    };

    /**
     * Defines when to display a gap in the graph. A gap size of 5 means that if the distance between two points is greater than five times that of the two closest points, the graph will be broken.
     * @param nGapSize
     * @constructor
     */
    Chart.prototype.ISetSeriesGapSize = function(nGapSize){
        this.setSeries("gapSize",nGapSize, "number");
    };

    /**
     * 将空值过滤掉
     * @param bFilterNulls
     * @constructor
     */
    Chart.prototype.ISetSeriesFilterNulls = function(bFilterNulls){
        bFilterNulls += "";
        if(!bFilterNulls){
            return;
        }
        this.bFilterNulls = bFilterNulls;
    };

    /**
     * 将序列中特定的值替换成null
     * @param connectValues
     * @constructor
     */
    Chart.prototype.ISetSeriesReplaceValues = function (replaceValues) {
        replaceValues += "";
        if(!replaceValues){
            return;
        }
        this.replaceValues = replaceValues;
    };

    /**
     * 设置曲线中断位置，多个序列以参数个数区分，每个序列中的多个间断点以逗号分割
     * @constructor
     */
    Chart.prototype.ISetSeriesInterrupt = function () {
        this.arrayInterrupt = arguments;
    };

    /**
     * 在序列的下降的添加空值
     * @param connectValues
     * @constructor
     */
    Chart.prototype.ISetSeriesInsertNullWhenDescend = function (bInsertNull) {
        bInsertNull += "";
        if(!bInsertNull){
            return;
        }
        this.bInsertNull = bInsertNull;
    };

    /**
     * 当序列中的点少于此接口设置的值时，所有的点被绘制, 即使在当前缩放落入可见曲线区以外的点. 绘制所有点的好处是更新时显示动画效果. 当序列中的点大于此接口设置的值时，仅仅绘制落入曲线区内的点，优点是大数据时表现更好。
     * @param nCropThreshold 默认300
     * @constructor
     */
    Chart.prototype.ISetSeriesCropThreshold = function (nCropThreshold) {
        this.setSeries("cropThreshold",nCropThreshold, "number");
    };

    /**
     * 设置鼠标指向序列时鼠标的样式
     * @param strCursor 默认undefined
     * @constructor
     */
    Chart.prototype.ISetSeriesCursor = function (strCursor) {
        this.setSeries("cursor",strCursor, "string");
    };

    /**
     * 禁用或启用鼠标追踪，包括显示点的数据提示和线以及点上的鼠标事件
     * @param bEnableMouseTracking 默认是： true
     * @constructor
     */
    Chart.prototype.ISetSeriesEnableMouseTracking = function (bEnableMouseTracking) {
        this.setSeries("enableMouseTracking",bEnableMouseTracking, "boolean");
    };

    /**
     * 是否显示数值标注
     * @param bEnabled 默认false
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsEnabled = function(bEnabled){
        this.setSeries('dataLabels.enabled', bEnabled, "boolean");
    };

    /**
     * 数值标注的位置
     * @param sAlign 相对于点的水平位置，可设置"left", "center" or "right"，默认center
     * @param sVerticalAlign 相对于点的垂直位置，可设置top, middle or bottom
     * @param x 水平偏移，默认0
     * @param y 垂直偏移，默认-6
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsPosition = function (sAlign, sVerticalAlign, x, y) {
        this.setSeries("dataLabels.align",sAlign, "align");
        this.setSeries("dataLabels.verticalAlign",sVerticalAlign, "verticalAlign");
        this.setSeries('dataLabels.x', x, "number");
        this.setSeries('dataLabels.y', y, "number");
    };

    /**
     * 数值标注的背景色
     * @param strBackgroundColor 默认undefined
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsBackgroundColor = function ( strBackgroundColor) {
        this.setSeries('dataLabels.backgroundColor', strBackgroundColor, "color");
    };

    /**
     * 设置数值标注的边框
     * @param fBorderWidth 边框宽度，默认0
     * @param strBorderColor 边框颜色，默认undefined
     * @param fBorderRadius 边框圆角半径，默认0
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsBorder = function (fBorderWidth, strBorderColor, fBorderRadius) {
        this.setSeries('dataLabels.borderWidth', fBorderWidth, "number");
        this.setSeries('dataLabels.borderColor', strBorderColor, "color");
        this.setSeries('dataLabels.borderRadius', fBorderRadius, "number");
    };

    /**
     * 设置数值标注字体颜色
     * @param strColor 默认null
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsColor = function ( strColor) {
        this.setSeries('dataLabels.color', strColor, "color");
    };

    /**
     * 设置数值标注距离饼图边界的距离，负值时数值标注放到饼图上面。
     * @param nDistance 默认30
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsDistance = function(nDistance){
        this.setSeries('dataLabels.distance', nDistance, "number");
    };

    /**
     * 设置数值标注文件显示格式
     * @param strFormat 默认{y}
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsFormat = function ( strFormat) {
        this.setSeries('dataLabels.format', strFormat, "string");
    };

    /**
     * 回调函数设置数值标注文件显示格式
     * @param func this.percentage：仅用于堆栈序列和饼图中。表示点的数值在总数中的百分比；this.point:点对象； this.series:序列对象；this.total仅用于堆栈序列和饼图中；this.x:x值；this.y:y值
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsFormatter = function ( func) {
        this.set('options.plotOptions.series.dataLabels.formatter', func);
    };

    /**
     * 设置数值标注文本旋转
     * @param nRotation 默认0
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsRotation = function (nRotation) {
        this.setSeries('dataLabels.rotation', nRotation, "number");
    };

    /**
     * 设置数值标注阴影
     * @param bShadow 默认false
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsShadow = function(bShadow){
        this.setSeries('dataLabels.shadow', bShadow, "boolean");
    };

    /**
     * 设置序列数值标注的文本样式
     * @param nFontSize 字体大小，当有多个序列时以逗号分隔
     * @param cFontColor 字符颜色，当有多个序列时以逗号分隔
     * @param sFontWeight 字体粗细，当有多个序列时以逗号分隔
     * @constructor
     */
    Chart.prototype.ISetSeriesDataLabelsFontStyle = function (nFontSize, cFontColor, sFontWeight) {
        nFontSize = nFontSize || "";
        cFontColor = cFontColor || "";
        sFontWeight = sFontWeight || "";
        var fontSizeArr = array_map(nFontSize.split(","), function(v){return v.trim()}, null),
            fontColorArr = array_map(cFontColor.split(","), function(v){return v.trim()}, null),
            fontWeightArr = array_map(sFontWeight.split(","), function(v){return v.trim()}, null);
        var maxLength = Math.max(fontSizeArr.length, fontColorArr.length, fontWeightArr.length);
        var styleArr = fontSizeArr[0] + "&" + fontColorArr[0] + "&" + fontWeightArr[0];
        for(var i = 1; i < maxLength; i++){
            styleArr += "," + (fontSizeArr[i] || "") + "&" + (fontColorArr[i] || "") + "&" + (fontWeightArr[i] || "");
        }
        this.setSeries('dataLabels.style', styleArr, "style");
    };

    /**
     * 设置点可拖动的方向
     * @param bDraggableX 设置点是否可以水平拖动
     * @param bDraggableY 设置点是否可以垂直拖动
     * @constructor
     */
    Chart.prototype.ISetSeriesDragableDirection = function(bDraggableX, bDraggableY){
        this.setSeries("draggableX", bDraggableX, "boolean");
        this.setSeries("draggableY", bDraggableY, "boolean");
    };

    /**
     * 设置序列在数据查看窗口中显示的列名
     * @param strID id
     * @constructor
     */
    Chart.prototype.ISetSeriesGridHeaderName = function(strName){
        this.setSeries("gridHeaderName",strName, "string");
    };

    /**
     * 设置序列id
     * @param strID id
     * @constructor
     */
    Chart.prototype.ISetSeriesID = function(strID){
        this.setSeries("id",strID, "string");
    };

    /**
     * 设置序列在图例标记中显示的填充色
     * @param cLegendColor
     * @constructor
     */
    Chart.prototype.ISetSeriesLegendColor = function(cLegendColor){
        this.setSeries("legendColor", cLegendColor, "color");
    }

    /**
     * 连接到另一个序列，可以同时隐藏
     * @param strLinkedTo 序列id或":previous"（前一序列）
     * @constructor
     */
    Chart.prototype.ISetSeriesLinkedTo = function (strLinkedTo) {
        this.setSeries("linkedTo",strLinkedTo, "string");
    };

    /**
     * 设置小于threshold值的图形部分的颜色.
     * @param cNegativeColor 默认null
     * @constructor
     */
    Chart.prototype.ISetSeriesNegativeColor = function (cNegativeColor) {
        this.setSeries("negativeColor",cNegativeColor, "color");
    };

    /**
     * 如果在一个序列中点的x值没有给出，pointInterval定义x轴值的间隔. 例如如果一个序列从0开始每十年存在一个值，那么设置pointInterval为10.
     * @param nPointInterval 默认是： 1
     * @constructor
     */
    Chart.prototype.ISetSeriesPointInterval = function (nPointInterval) {
        this.setSeries("pointInterval",nPointInterval, "number");
    };

    /**
     * 柱状图中一组柱子放到刻度上还是刻度之间
     * @param strPointPlacement 可设置null, "on", "between"
     * @constructor
     */
    Chart.prototype.ISetSeriesPointPlacement = function (strPointPlacement) {
        this.setSeries("pointPlacement",strPointPlacement, "string");
    };

    /**
     * 如果在一个序列中点的x值没有给出，pointStart定义x轴值的起始值.例如，序列中包含的最早的时间从1945年开始，则设置pointStart为1945.
     * @param nPointStart 默认是： 0
     * @constructor
     */
    Chart.prototype.ISetSeriesPointStart= function (nPointStart) {
        this.setSeries("pointStart",nPointStart, "number");
    };

    /**
     * 设置序列是否被选中，如果设置了序列在图例中显示复选框，则复选框成选中状态
     * @param bSelected 默认是： false
     * @constructor
     */
    Chart.prototype.ISetSeriesSelected= function (bSelected) {
        this.setSeries("selected",bSelected, "boolean");
    };

    /**
     * 设置系列的阴影
     * @param bShadow 是否有阴影，如果cColor, nOffsetX, nOffsetY, nOpacity, nWidth中有一个值已经设置，则此属性失效
     * @param cColor 阴影颜色，默认#000000
     * @param nOffsetX 阴影的横向偏移，默认1
     * @param nOffsetY 阴影的纵向偏移，默认1
     * @param nOpacity 阴影透明度，默认0.15
     * @param nWidth 阴影大小，默认3
     * @constructor
     */
    Chart.prototype.ISetSeriesShadow = function (bShadow, cColor, nOffsetX, nOffsetY, nOpacity, nWidth) {
        if(cColor || isNumber(nOffsetX) || isNumber(nOffsetY) || isNumber(nOpacity) || isNumber(nWidth)){
            this.setSeries("shadow.color",cColor, "color");
            this.setSeries("shadow.offsetX",nOffsetX, "number");
            this.setSeries("shadow.offsetY",nOffsetY, "number");
            this.setSeries("shadow.opacity ",nOpacity, "number");
            this.setSeries("shadow.width",nWidth, "number");
        }
        else{
            this.setSeries("shadow",bShadow, "boolean");
        }
    };

    /**
     * 序列对应的图例项中显示复选框
     * @param bShowCheckbox 默认是： false
     * @constructor
     */
    Chart.prototype.ISetSeriesShowCheckbox = function (bShowCheckbox) {
        this.setSeries("showCheckbox",bShowCheckbox, "boolean");
    };

    /**
     * 设置序列是否显示在图例中，对应独立的序列默认值为true，对应链接序列默认为false
     * @param bShowInLegend 默认是： true
     * @constructor
     */
    Chart.prototype.ISetSeriesShowInLegend = function (bShowInLegend) {
        this.setSeries("showInLegend",bShowInLegend, "boolean");
    };

    /**
     * 设置序列是否以堆栈图的方式显示
     * @param strStacking 可设置"normal"或"percent"
     * @constructor
     */
    Chart.prototype.ISetSeriesStacking = function (strStacking) {
        this.setSeries("stacking", strStacking, "string");
    };

    /**
     * 设置鼠标指向序列时是否发生变化
     * @param bEnabled
     * @constructor
     */
    Chart.prototype.ISetSeriesStatesHoverEnabled = function (bEnabled) {
        this.setSeries("states.hover.enabled", bEnabled, "boolean");
    };

    /**
     * 设置鼠标指向序列时标记背景的样式
     * @param nSize
     * @param nOpacity
     * @constructor
     */
    Chart.prototype.ISetSeriesStatesHoverHalo = function (bEnabled, nSize, nOpacity) {
        this.setSeries("states.hover.halo", bEnabled, "boolean");
        this.setSeries("states.hover.halo.size", nSize, "number");
        this.setSeries("states.hover.halo.opacity", nOpacity, "number");
//        this.setSeries("states.hover.halo.attributes.stroke", "#FF0000", "number");
    };

    /**
     * 设置鼠标指向线时的线宽
     * @param lineWidth
     * @param lineWidthPlus
     * @constructor
     */
    Chart.prototype.ISetSeriesStatesHoverLineWidth = function (lineWidth, lineWidthPlus) {
        this.setSeries("states.hover.lineWidth", lineWidth, "number");
        this.setSeries("states.hover.lineWidthPlus", lineWidthPlus, "number");
    };

    /**
     * 鼠标事件严格追踪模式，为true时，序列中的mouseOut事件在鼠标移到另一个序列或移出曲线区外之前不会触发
     * @param bStickyTracking 默认true
     * @constructor
     */
    Chart.prototype.ISetSeriesStickyTracking = function (bStickyTracking) {
        this.setSeries("stickyTracking",bStickyTracking, "boolean");
    };

    /**
     * 序列基准线，折线序列中仅与negativeColor有关
     * @param nThreshold 默认0
     * @constructor
     */
    Chart.prototype.ISetSeriesThreshold = function (nThreshold) {
        this.setSeries("threshold",nThreshold, "number");
    };

    /**
     * 当一个序列中的数据数组超过这个值时，仅仅一维数组或者两维数组是允许的，设为0禁止此属性
     * @param nTurboThreshold 默认1000
     * @constructor
     */
    Chart.prototype.ISetSeriesTurboThreshold = function (nTurboThreshold) {
        this.setSeries("turboThreshold",nTurboThreshold, "number");
    };

    /**
     * 设置数据提示中文本格式
     * @param nDecimals 显示的小数位数
     * @param strPrefix 前缀
     * @param strSuffix 后缀
     * @constructor
     */
    Chart.prototype.ISetSeriesTooltipValueFormat = function (nDecimals, strPrefix, strSuffix) {
        this.setSeries("tooltip.valueDecimals",nDecimals, "number");
        this.setSeries("tooltip.valuePrefix",strPrefix, "string");
        this.setSeries("tooltip.valueSuffix",strSuffix, "string");
    };

    /**
     * 设置序列是否可见
     * @param bVisible 默认true
     * @constructor
     */
    Chart.prototype.ISetSeriesVisible = function (bVisible) {
        this.setSeries("visible",bVisible, "boolean");
    };

    /**
     * 设置序列事件
     * @param eventType 可设置afterAnimate|checkboxClick|click|hide|legendItemClick|mouseOut|mouseOver|show
     * @param func 事件触发时的回调函数
     * @constructor
     */
    Chart.prototype.ISetSeriesEvents = function (eventType, func) {
        if(/afterAnimate|checkboxClick|click|hide|legendItemClick|mouseOut|mouseOver|show/.test(eventType)){
            this.set('options.plotOptions.series.events.' + eventType, func);
        }
    };

    ///////////////////////////////////////////////
    //↓↓↓↓序列属性接口设置——折线属性↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置折线的颜色、宽度、线型
     * @param strLineColor 折线图中指线的颜色，柱状图中柱子的颜色
     * @param strLineWidth 线宽
     * @param strLineStyle 线型，可设置0-10
     * @constructor
     */
    Chart.prototype.ISetLines = function (strLineColor, nLineWidth, strLineStyle) {
        this.setSeries("color",strLineColor,"color");
        this.setSeries("lineWidth",nLineWidth,"number");
        this.setSeries("dashStyle",strLineStyle,"lineStyle");
    };

    /**
     * 当折线标记禁用时，孤立点是否显示标记
     * @param bShowIsLandPoint 默认false
     * @constructor
     */
    Chart.prototype.ISetLinesShowIsLandPoint = function(bShowIsLandPoint){
        this.setSeries("showIsLandPoints",bShowIsLandPoint,"boolean");
    };

    /**
     * 设置线标记的样式、大小、线宽、边界色、填充色
     * @param strMarkNo 标记样式，可设置0-4
     * @param nMarkSize 标记半径，默认4
     * @param nLineWidth 标记边界线的线宽，默认0
     * @param strMarkSideColor 标记边界线的线色，默认#FFFFFF
     * @param strMarkFillColor 标记的填充色
     * @constructor
     */
    Chart.prototype.ISetLinesMark = function (strMarkNo, nMarkSize, nLineWidth, strMarkSideColor, strMarkFillColor) {
        this.setSeries("marker.symbol",strMarkNo, "markerStyle");
        this.setSeries("marker.radius",nMarkSize,"number");
        this.setSeries("marker.lineWidth",nLineWidth,"number");
        this.setSeries("marker.lineColor",strMarkSideColor,"color");
        this.setSeries("marker.fillColor",strMarkFillColor,"color");
    };

    /**
     * 设置标记是否显示
     * @param bEnabled 默认true
     * @constructor
     */
    Chart.prototype.ISetLinesMarkEnabled = function(bEnabled){
        this.setSeries("marker.enabled", bEnabled, "boolean");
    };

    /**
     * 设置是否为台阶图以及台阶图样式
     * @param bEnabled 可设置left, center and right，默认为false
     * @constructor
     */
    Chart.prototype.ISetLinesStep = function(strStep){
        this.setSeries("step", strStep, "string");
    };

    ///////////////////////////////////////////////
    //↓↓↓↓序列属性接口设置——面积图属性↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置面积图的填充色和填充透明度
     * @param cFillColor 面积图的填充色，为null时与线的颜色一致
     * @param fFillOpacity 填充透明度，默认0.75
     * @constructor
     */
    Chart.prototype.ISetAreasFill = function(cFillColor, fFillOpacity){
        this.setSeries("fillColor", cFillColor, "color");
        this.setSeries("fillOpacity", fFillOpacity, "number");
    };

    /**
     * 设置面积图线的颜色、宽度、线型
     * @param CLineColor 设置线的颜色
     * @param nLineWidth 线的宽度，默认2
     * @param strLineStyle 线的样式，0-10
     * @constructor
     */
    Chart.prototype.ISetAreasLine = function(CLineColor, nLineWidth,strLineStyle){
        this.setSeries("lineColor", CLineColor, "color");
        this.setSeries("lineWidth", nLineWidth, "number");
        this.setSeries("dashStyle",strLineStyle,"lineStyle");
    };

    /**
     * 设置面积图小于threshold部分的填充色
     * @param cNegativeFillColor
     * @constructor
     */
    Chart.prototype.ISetAreasNegativeFillColor = function(cNegativeFillColor){
        this.setSeries("negativeFillColor", cNegativeFillColor, "color");
    };

    /**
     * 设置当鼠标指向面积部分时是否显示数据提示或响应其他鼠标事件
     * @param bTrackByArea 默认false
     * @constructor
     */
    Chart.prototype.ISetAreasTrackByArea= function(bTrackByArea){
        this.setSeries("trackByArea", bTrackByArea, "boolean");
    };

    ///////////////////////////////////////////////
    //↓↓↓↓序列属性接口设置——柱状图属性↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置柱状图的边框
     * @param fBorderWidth 柱子的边框宽度，默认1
     * @param strBorderColor 柱子的边框颜色，默认#FFFFFF
     * @param fBorderRadius 柱子的圆角半径，默认0
     * @constructor
     */
    Chart.prototype.ISetColumnsBorder = function (fBorderWidth, strBorderColor, fBorderRadius) {
        this.setSeries('borderWidth', fBorderWidth, "number");
        this.setSeries('borderColor', strBorderColor, "color");
        this.setSeries('borderRadius', fBorderRadius, "number");
    };

    /**
     * 设置柱状图是否为累计柱状图
     * @param bCumulative 默认false
     * @constructor
     */
    Chart.prototype.ISetColumnsCumulative = function (bCumulative) {
        this.setSeries('cumulative', bCumulative, "boolean");
    };

    /**
     * 设置累计柱状图累计部分的边框
     * @param fBorderWidth 累计部分的边框宽度
     * @param strBorderColor 累计部分的边框颜色
     * @param fBorderRadius 累计部分的边框圆角半径
     * @constructor
     */
    Chart.prototype.ISetColumnsCumulativeBorder = function (fBorderWidth, strBorderColor, fBorderRadius) {
        this.setSeries('cumulativeBorderWidth', fBorderWidth, "number");
        this.setSeries('cumulativeBorderColor', strBorderColor, "color");
        this.setSeries('cumulativeBorderRadius', fBorderRadius, "number");
    };

    /**
     * 设置累计柱状图中累计部分的颜色
     * @param strColor 累计部分的颜色
     * @constructor
     */
    Chart.prototype.ISetColumnsCumulativeColor = function (strColor) {
        this.setSeries('cumulativeColor', strColor, "color");
    };

    /**
     * 设置累计序列的名称
     * @param strName 序列名称
     * @constructor
     */
    Chart.prototype.ISetColumnsCumulativeName = function (strName) {
        this.setSeries('cumulativeName', strName + ",", "string");
    };

    /**
     * 设置柱状图中是否可以按点着色
     * @param bBolorByPoint 默认false
     * @constructor
     */
    Chart.prototype.ISetColumnsColorByPoint= function(bBolorByPoint){
        this.setSeries("colorByPoint", bBolorByPoint, "boolean");
    };

    /**
     * 三维柱状图中柱子的深度
     * @param nDepth 默认25
     * @constructor
     */
    Chart.prototype.ISetColumnsDepth = function(nDepth){
        this.setSeries("depth", nDepth, "number");
    };

    /**
     * 设置三维柱状图的边沿，类似于border
     * @param fEdgeWidth 默认1
     * @param strEdgeColor 默认与柱子颜色一致
     * @constructor
     */
    Chart.prototype.ISetColumnsEdge = function (fEdgeWidth, strEdgeColor) {
        this.setSeries('edgeWidth', fEdgeWidth, "number");
        this.setSeries('edgeColor', strEdgeColor, "color");
    };

    /**
     * 设置柱状图的分组属性
     * @param bGrouping 是否分组，为false时柱状图序列会发生重叠
     * @param fGroupPadding 分组间距
     * @param fGroupZPadding 三维柱状图中纵深间距
     * @constructor
     */
    Chart.prototype.ISetColumnsGroup = function (bGrouping, fGroupPadding, fGroupZPadding) {
        this.setSeries('grouping', bGrouping, "boolean");
        this.setSeries('groupPadding', fGroupPadding, "number");
        this.setSeries('groupZPadding', fGroupZPadding, "number");
    };

    /**
     * 设置柱状图中点的最小高度
     * @param nMinPointLength 默认为0
     * @constructor
     */
    Chart.prototype.ISetColumnsMinPointLength = function(nMinPointLength){
        this.setSeries("minPointLength", nMinPointLength, "number");
    };

    /**
     * 设置柱状图中点的间距
     * @param nPointPadding 默认0.1
     * @constructor
     */
    Chart.prototype.ISetColumnsPointPadding= function(nPointPadding){
        this.setSeries("pointPadding", nPointPadding, "number");
    };

    /**
     * 设置柱状图中点的范围，决定柱子的宽度
     * @param nPointRange 分类轴轴默认1，线型轴和日期轴中默认为最近两个点的距离
     * @constructor
     */
    Chart.prototype.ISetColumnsPointRange = function(nPointRange){
        this.setSeries("pointRange", nPointRange, "number");
    };

    /**
     * 设置柱状图中点的宽度
     * @param nPointWidth 为null时，根据pointPadding和groupPadding的值计算
     * @constructor
     */
    Chart.prototype.ISetColumnsPointWidth = function(nPointWidth){
        this.setSeries("pointWidth", nPointWidth, "number");
    };

    ///////////////////////////////////////////////
    //↓↓↓↓序列属性接口设置——饼图属性↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置饼图边框
     * @param fBorderWidth 饼图的边框宽度，默认1
     * @param strBorderColor 饼图的边框颜色，默认#FFFFFF
     * @param fBorderRadius 饼图边框圆角半径
     * @constructor
     */
    Chart.prototype.ISetPieBorder = function (fBorderWidth, strBorderColor, fBorderRadius) {
        this.setSeries('borderWidth', fBorderWidth, "number");
        this.setSeries('borderColor', strBorderColor, "color");
        this.setSeries('borderRadius', fBorderRadius, "number");
    };

    /**
     * 设置饼图的中心位置
     * @param xPos x方向的位置，可以为百分数
     * @param yPos y方向的位置，可以为百分数
     * @constructor
     */
    Chart.prototype.ISetPieCenter = function(xPos, yPos){

        this.set("options.plotOptions.series.center", [number_format(xPos), number_format(yPos)]);
    };

    /**
     * 三维饼图的深度
     * @param nDepth 默认0
     * @constructor
     */
    Chart.prototype.ISetPieDepth = function(nDepth){
        this.setSeries("depth", nDepth, "number");
    };

    /**
     * 饼状图的结束角度
     * @param nEndAngle 默认是终止角度+360
     * @constructor
     */
    Chart.prototype.ISetPieEndAngle = function(nEndAngle){
        this.setSeries("endAngle", nEndAngle, "number");
    };

    /**
     * 是否忽略隐藏点，类似于chart.ignoreHiddenSeries
     * @param bIgnoreHiddenPoint 默认为true
     * @constructor
     */
    Chart.prototype.ISetPieIgnoreHiddenPoint = function(bIgnoreHiddenPoint){
        this.setSeries("ignoreHiddenPoint", bIgnoreHiddenPoint, "boolean");
    };

    /**
     * 环形饼图的内环大小
     * @param nSize 默认0
     * @constructor
     */
    Chart.prototype.ISetPieInnerSize = function(nSize){
        this.setSeries("innerSize", nSize, "number");
    };

    /**
     * 饼图的最小大小
     * @param nMinSize 默认80
     * @constructor
     */
    Chart.prototype.ISetPieMinSize = function(nMinSize){
        this.setSeries("minSize", nMinSize, "number");
    };

    /**
     * 饼图的大小，可以为百分比
     * @param nSize 默认依赖与数值标注
     * @constructor
     */
    Chart.prototype.ISetPieSize = function(nSize){
        this.setSeries("size", nSize, "number");
    };

    /**
     * 饼图中某个点分离的距离
     * @param nSlicedOffset 默认为10
     * @constructor
     */
    Chart.prototype.ISetPieSlicedOffset = function(nSlicedOffset){
        this.setSeries("slicedOffset", nSlicedOffset, "number");
    };

    /**
     * 饼状图的开始角度
     * @param nEndAngle 默认是起始角度0
     * @constructor
     */
    Chart.prototype.ISetPieStartAngle = function(nStartAngle){
        this.setSeries("startAngle", nStartAngle, "number");
    };


    ///////////////////////////////////////////////
    //↓↓↓↓序列属性接口设置——气泡图属性↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 是否显示负值大小的气泡
     * @param bDisplayNegative 默认true
     * @constructor
     */
    Chart.prototype.ISetBubbleDisplayNegative = function(bDisplayNegative){
        this.setSeries("displayNegative", bDisplayNegative, "boolean");
    };

    /**
     * 气泡的最大大小，可以为百分比
     * @param nMaxSize 默认20%
     * @constructor
     */
    Chart.prototype.ISetBubbleMaxSize = function(nMaxSize){
        this.setSeries("maxSize", nMaxSize, "number");
    };

    /**
     * 气泡的最小大小，可以为百分比
     * @param nMinSize 默认8
     * @constructor
     */
    Chart.prototype.ISetBubbleMinSize = function(nMinSize){
        this.setSeries("minSize", nMmiSize, "number");
    };

    /**
     * 值是以气泡的面积表示还是宽度表示
     * @param sSizeBy 可设置area|width，默认area
     * @constructor
     */
    Chart.prototype.ISetBubbleSizeBy = function(sSizeBy){
        this.setSeries("sizeBy", sSizeBy, "string");
    };

    /**
     * z值范围的最大值
     * @param nZMax 默认数据中的最大z值
     * @constructor
     */
    Chart.prototype.ISetBubbleZMax = function(nZMax){
        this.setSeries("zMax", nZMax, "number");
    };

    /**
     * z值范围的最小值
     * @param nZMin 默认数据中的最小z值
     * @constructor
     */
    Chart.prototype.ISetBubbleZMin = function(nZMin){
        this.setSeries("zMin", nZMin, "number");
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓水性图属性接口设置↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置水性图坐标轴标题
     * @param names
     * @constructor
     */
    Chart.prototype.ISetStiffAxisNames = function(names){
        var namesArr = (names && array_map(names.split(","), function (v) { return v.trim()}, null)) || [];
        var stiffNames = [];
        for(var i = 0; i < namesArr.length; i++){
            var stiffName = {
                text:namesArr[i]
            }
            stiffNames.push(stiffName);
        }
        this.set("options.stiffNames",stiffNames);
    };

    /**
     * 设置水性图标题的样式
     * 按照字体、大小、颜色、粗细的顺序以逗号分隔
     * @constructor
     */
    Chart.prototype.ISetStiffAxisNamesStyle = function(){
        var stiffNames = this.get("options.stiffNames");
        var args = [];
        if(arguments.length == 1){
            for(var i = 0; i < stiffNames.length; i++){
                args[i] = arguments[0];
            }
        }
        else{
            for(var i = 0; i < arguments.length; i++){
                args[i] = arguments[i];
            }
        }
        var minLen = Math.min(stiffNames.length, args.length);
        for(var n = 0; n < minLen; n++){
            if(!args[n]){
                continue;
            }
            stiffNames[n].style = font_formatStyle(args[n]);
        }
    };

    Chart.prototype.ISetStiffAxisNamesPosition = function(){
        var stiffNames = this.get("options.stiffNames");
        var args = [];
        if(arguments.length == 1){
            for(var i = 0; i < stiffNames.length; i++){
                args[i] = arguments[0];
            }
        }
        else{
            for(var i = 0; i < arguments.length; i++){
                args[i] = arguments[i];
            }
        }
        var minLen = Math.min(stiffNames.length, args.length);
        for(var n = 0; n < minLen; n++){
            if(!args[n]){
                continue;
            }
            var posArr = (args[n] && array_map(args[n].split(","), function (v) { return v.trim()}, null)) || [];
            stiffNames[n].align = posArr[0];
            stiffNames[n].x = posArr[1] && parseInt(posArr[1]);
            stiffNames[n].y = posArr[2] && parseInt(posArr[2]);
        }
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓点属性接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置序列中点的事件
     * @param eventType 可设置click|mouseOut|mouseOver|remove|select|unselect|update
     * @param func 事件触发时的回调函数
     * @constructor
     */
    Chart.prototype.ISetPointEvents = function (eventType, func) {
        if(/click|mouseOut|mouseOver|remove|select|unselect|update/.test(eventType)){
            this.set('options.plotOptions.series.point.events.' + eventType, func);
        }
    };

    /**
     * 设置序列中点的属性
     * @param seriesID 设置的点所属序列的id
     * @param attrName 属性名 固有的属性名有color(点的颜色)，id(点的id)，isIntermediateSum，isSum，legendIndex，name(点的名称)，sliced(是否分离)，colorValue
     * @param attrValue 属性值
     * @constructor
     */
    Chart.prototype.ISetPointAttributes = function(seriesID, attrName, attrValue){
        var chart = this,
            s = array_getElement(chart.series,
                function(v) {return v.id == seriesID},
                null
            );
        switch (attrName){
            case "color":
                this.setPoints(s,attrName,attrValue,"color");
                break;
            case "sliced":
            case "isIntermediateSum":
            case "isSum":
                this.setPoints(s,attrName,attrValue,"boolean");
                break
            case "colorValue":
                this.setPoints(s,attrName,attrValue,"number");
                break;
            default :
                this.setPoints(s,attrName,attrValue,"string");
                break;
        }

    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓数据提示接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置数据提示是否以动画显示
     * @param bAnimation 默认true
     * @constructor
     */
    Chart.prototype.ISetTooltipAnimation = function(bAnimation){
        this.set("options.tooltip.animation", !!bAnimation);
    };

    /**
     * 设置提示框的背景色
     * @param cBackgroundColor 默认rgba(255, 255, 255, 0.85)
     * @constructor
     */
    Chart.prototype.ISetTooltipBackgroundColor = function(cBackgroundColor){
        this.set('options.tooltip.backgroundColor', color_format(cBackgroundColor));
    };

    /**
     * 设置数据提示边框
     * @param sBorderColor 提示框边框的颜色。当该值为null时，边框会使用该数据列或该点的颜色。默认是： "null"
     * @param nBorderWidth 提示框边框的像素值宽度。默认是： 1
     * @param nBorderRadius 数据提示框圆角。默认是： 3
     * @constructor
     */
    Chart.prototype.ISetTooltipBorder = function (sBorderColor, nBorderWidth, nBorderRadius) {
        this.set('options.tooltip.borderColor', color_format(sBorderColor));
        this.set('options.tooltip.borderWidth', number_format(nBorderWidth));
        this.set('options.tooltip.borderRadius', number_format(nBorderRadius));
    };

    /**
     * 十字准线。十字准线可以被定义为一个Boolean 值，一组Boolean 值 或 json对象。
     * @param oCrosshairs 为 Boolean时： 如果十字准线选项为true，一条单一的与X轴有关的十字准线将被显示出来。为一组Boolean时： 在一组Boolean值中，第一个值表示是否与X轴有准线连接，第二个值表示是否与Y轴有准线连接。使用[true, true]可以展现完整的十字准线。为json 对象时： 对象中包含更详细的属性设置，属性包括 width, color, dashStyle和zIndex，分别代表线条宽度、颜色、演示 及 显示层次。默认null
     * @constructor
     */
    Chart.prototype.ISetTooltipCrosshairs = function(mCrosshairs){
        this.set('options.tooltip.crosshairs', mCrosshairs);
    };

    /**
     * 横轴为日期格式是，设置数据提示标题的日期格式
     * @param sDateTimeLabelFormats 字符串以逗号分割，依次设置年、月、周、日、时、分、秒、毫秒的值。如"yyyy-mm-dd,yyyy-mm-dd",日期字符串表示：yyyy|yy,MM|mm,dd,hh,mi,ss,ms
     * @constructor
     */
    Chart.prototype.ISetTooltipDateTimeLabelFormats = function(sDateTimeLabelFormats){
        this.set('options.tooltip.dateTimeLabelFormats', dateFormat_fromString(sDateTimeLabelFormats));
    };

    /**
     * 启用或禁用提示框。
     * @param bEnabled 默认true
     * @constructor
     */
    Chart.prototype.ISetTooltipEnabled = function(bEnabled){
        this.set('options.tooltip.enabled', !!bEnabled);
    };

    /**
     * 当鼠标跨列的时候，提示框是否应该跟随它，扇形和作为其它在一定程度上重要的类型图表。默认情况下，它可以覆盖散点图，气泡图和饼图系列这些图表的plotOptions。对于使用触摸设备实现这个功能的时候，followTouchMove的值也必须为true。
     * @param bFollowPointer 默认false
     * @constructor
     */
    Chart.prototype.ISetTooltipFollowPointer = function(bFollowPointer){
        this.set('options.tooltip.followPointer', !!bFollowPointer);
    };

    /**
     * 在触摸设备上时是否跟随手指移动
     * @param bFollowTouchMove 默认false
     * @constructor
     */
    Chart.prototype.ISetTooltipFollowTouchMove = function(bFollowTouchMove){
        this.set('options.tooltip.followTouchMove', !!bFollowTouchMove);
    };

    /**
     * 字符串形式定义提示框中的注脚格式
     * @param sFooterFormat
     * @constructor
     */
    Chart.prototype.ISetTooltipFooterFormat = function(sFooterFormat){
        this.set('options.tooltip.footerFormat', sFooterFormat);
    };

    /**
     * 回调函数将格式化提示框中的文本。返回false将为一个特定的点禁用提示框。支持HTML的子集。<b>, <strong>, <i>, <em>, <br/>, <span>.标签直接的内容可以被样式style属性设置样式。
     * @param func this.percentage (not shared) / this.points[i].percentage (shared) 仅限于堆叠系列和饼图系列。所有点的百分比。this.point(not shared)/this.points[i].point(shared)：关键的对象。如果被定义，关键的名称是能够通过this.point.name表示。this.points：在一个共享的提示框中，这是一个包含每个点的全部属性的数组。this.series (not shared) / this.points[i].series (shared)：系列对象。这个系列的名称可通过this.series.name.显示。this.total (not shared) / this.points[i].total (shared)：仅限于堆叠系列。表示全部在X轴上的值。this.x：X轴上的值。这个属性同样不考虑提示框是共享的还是不共享的。this.y(not shared) / this.points[i].y (shared)：Y轴上的值。
     * @constructor
     */
    Chart.prototype.ISetTooltipFormatter = function(func){
        this.set('options.tooltip.formatter', func);
    };

    /**
     * 字符串形式定义提示框中的标题行格式，提示框中标题行的HTML代码。变量被花括号包起来。可用的变量有point.key, series.name, series.color和其它从点对象point和series 对象中的成员。这point.key变量包含取决于所在轴的分类名，值或者是日期。就日期轴而言， point.key日期格式能够被设置使用tooltip.xDateFormat。
     * @param sHeaderFormat 默认值：<span style="font-size: 10px">{point.key}</span><br/>
     * @constructor
     */
    Chart.prototype.ISetTooltipHeaderFormat = function(sHeaderFormat){
        this.set('options.tooltip.headerFormat', sHeaderFormat);
    };

    /**
     * 设置隐藏延时时间
     * @param nHideDelay 默认500ms
     * @constructor
     */
    Chart.prototype.ISetTooltipHideDelay = function(nHideDelay){
        this.set('options.tooltip.hideDelay', number_format(nHideDelay));
    };

    /**
     * 提示框中该点的HTML代码。变量用花括号括起来。可用的变量有point.x, point.y, series.name and series.color和以相同的形式表示的其它属性。此外，point.y能够被tooltip.yPrefix和tooltip.ySuffix变量所拓展。这同样能够为每一个显示单元进行覆盖。
     * @param strPointFormat 默认是： <span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>.
     * @constructor
     */
    Chart.prototype.ISetTooltipPointFormat = function(strPointFormat){
        this.set('options.tooltip.pointFormat', strPointFormat);
    };

    /**
     * 把提示框放置在一个默认位置的回调函数。此回调接受三个参数: labelWidth,labelHeight和point包含的值对于plotX和plotY将告诉你参考点在绘图去上位置。添加chart.plotLeft和chart.plotTop以获取精确的坐标点。
     * @param func 返回值应该是一个包含X和Y值的对象，比如: { x: 100, y: 100 }。
     * @constructor
     */
    Chart.prototype.ISetTooltipPositioner = function(func){
        this.set('options.tooltip.positioner', func);
    };

    /**
     * 是否启用提示框的阴影。
     * @param bShadow 默认是： true.
     * @constructor
     */
    Chart.prototype.ISetTooltipShadow = function(bShadow){
        this.set('options.tooltip.shadow', !!bShadow);
    };

    /**
     * 设置数据提示框形状。
     * @param strShape  默认是：callout
     * @constructor
     */
    Chart.prototype.ISetTooltipShape = function(strShape){
        this.set('options.tooltip.shape', strShape);
    };

    /**
     * 设置多条序列的信息是否显示到一个数据提示上
     * @param bShared 默认false
     * @constructor
     */
    Chart.prototype.ISetTooltipShared = function(bShared){
        this.set('options.tooltip.shared', !!bShared);
    };

//    snap: null

    /**
     * 为提示框添加CSS样式。提示框同样能够通过CSS类.HWcharts-tooltip来设定样式。
     * @param style 按照字体、大小、颜色、粗细的顺序以逗号分隔
     * @constructor
     */
    Chart.prototype.ISetTooltipStyle = function(style){
        this.set('options.tooltip.style', font_formatStyle(style));
    };

    /**
     * 是否使用html渲染数据提示的内容
     * @param bUseHTML 默认false
     * @constructor
     */
    Chart.prototype.ISetTooltipUseHTML = function(bUseHTML){
        this.set('options.tooltip.useHTML', !!bUseHTML);
    };

    /**
     * 数据提示框数据值小数保留位数。
     * @param nValueDecimals 默认为保留所有小数。
     * @constructor
     */
    Chart.prototype.ISetTooltipValueDecimals = function(nValueDecimals){
        this.set('options.tooltip.valueDecimals', number_format(nValueDecimals));
    };

    /**
     * 一串字符被前置在每个Y轴的值之后。可重写在每个系列的提示框选项的对象上。
     * @param strValuePrefix 默认null
     * @constructor
     */
    Chart.prototype.ISetTooltipValuePrefix = function(strValuePrefix){
        this.set('options.tooltip.valuePrefix', strValuePrefix);
    };

    /**
     * 一串字符被后置在每个Y轴的值之后。可重写在每个系列的提示框选项的对象上。
     * @param strValueSuffix 默认null
     * @constructor
     */
    Chart.prototype.ISetTooltipValueSuffix = function(strValueSuffix){
        this.set('options.tooltip.valueSuffix', strValueSuffix);
    };

//    xDateFormat: null

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓导出接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置是否显示导出按钮
     * @param bool
     * @constructor
     */
    Chart.prototype.ISetExportButtonEnabled = function(bool){
        this.set('options.exporting.enabled', !!bool);
    };

    /**
     * 设置导出图片的大小
     * @param nWidth 设置导出图片宽度
     * @param nHeight 设置导出图片高度，当导出高度不设置是保持原比例
     * @constructor
     */
    Chart.prototype.ISetExportChartSize = function (nWidth, nHeight) {

        if(this.isMultiCharts && this.multiChartsOptions){
            this.set('multiChartsOptions.exporting.width', number_format(nWidth));
            this.set('multiChartsOptions.exporting.height', number_format(nHeight));
        }
        else{
            this.set('options.exporting.width', number_format(nWidth));
            this.set('options.exporting.height', number_format(nHeight));
        }
    };

    /**
     * 设置导出的图片在服务器上存放的路径
     * @param str
     * @constructor
     */
    Chart.prototype.ISetExportImagePath = function (str) {
        if(this.isMultiCharts && this.multiChartsOptions){
            this.set('multiChartsOptions.exporting.imagePath', str);
        }
        else{
            this.set('options.exporting.imagePath', str);
        }
    };

    /**
     * 设置导出的图片的文件名
     * @param str
     * @constructor
     */
    Chart.prototype.ISetExportFilename = function (str) {
        if(this.isMultiCharts && this.multiChartsOptions){
            this.set('multiChartsOptions.exporting.filename', str);
        }
        else{
            this.set('options.exporting.filename', str);
        }
    };

    /**
     * 设置导出图片的服务地址
     * @param str
     * @constructor
     */
    Chart.prototype.ISetImageExportUrl = function (str) {
        this.set('options.exporting.url', str);
    };

    /**
     * 设置数据导出服务地址
     * @param url 数据查看窗口的宽度
     * @constructor
     */
    Chart.prototype.ISetExportDataUrl = function(url){
        this.set("options.dataview.url", url);
    };

    /**
     * 设置导出图片时是否通过浏览器下载或者只返回在服务器上的路径
     * @param bool
     * @constructor
     */
    Chart.prototype.ISetIsDownload = function (bool) {
        this.set('options.exporting.isDownload', bool);
    };

    /**
     * 设置模板导出的服务地址
     * @param str
     * @constructor
     */
    Chart.prototype.ISetModuleExportURL = function (str) {
        if(this.multiChartsOptions){
            this.set('multiChartsOptions.exporting.moduleExportUrl', str);
        }
        else{
            this.set('options.exporting.moduleExportUrl', str);
        }
    };

    /**
     * 设置导出的模板在服务器上存放的文件名
     * @param xmlPath 模板文件在服务器上的路径
     * @constructor
     */
    Chart.prototype.ISetXmlExportPath = function (xmlPath) {
        if(this.multiChartsOptions){
            this.set('multiChartsOptions.exporting.saveName', xmlPath);
        }
        else{
            this.set('options.exporting.saveName', xmlPath);
        }
    };

    /**
     * 设置图片导出时是否显示地步缩放条
     * @param bool
     * @constructor
     */
    Chart.prototype.ISetExportNavigatorEnable = function (bool) {
        this.set('options.userExportOptions.navigator.enabled', !!bool);
    };
    

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓脚注属性接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 是否显示脚注
     * @param bool
     * @constructor
     */
    Chart.prototype.ISetCreditsEnabled = function (bool) {
        this.set('options.credits.enabled', !!bool);
    };

    /**
     * 设置脚注的链接
     * @param strHref
     * @constructor
     */
    Chart.prototype.ISetCreditsHref = function(strHref){
        this.set("options.credits.href", strHref);
    };

    /**
     * 设置脚注的位置
     * @param sAlign 相对于点的水平位置，可设置"left", "center" or "right"，默认right
     * @param sVerticalAlign 相对于点的垂直位置，可设置top, middle or bottom，默认bottom
     * @param x 水平偏移，默认-10
     * @param y 垂直偏移，默认-5
     * @constructor
     */
    Chart.prototype.ISetCreditsPosition = function (sAlign, sVerticalAlign, x, y) {
        if(/left|center|right/i.test(sAlign)){
            this.set('options.credits.position.align', sAlign);
        }
        if(/top|middle|bottom/.test(sVerticalAlign)){
            this.set('options.credits.position.verticalAlign', sVerticalAlign);
        }
        this.set('options.credits.position.x', number_format(x));
        this.set('options.credits.position.y', number_format(y));
    };

    /**
     * 设置脚注显示文本
     * @param strText
     * @constructor
     */
    Chart.prototype.ISetCreditsText = function(strText){
        this.set("options.credits.text", strText);
    };

    /**
     * 设置脚注文本样式
     * @param style 按照字体、大小、颜色、粗细的顺序以逗号分隔
     * @constructor
     */
    Chart.prototype.ISetCreditsTextStyle = function (style) {
        this.set('options.credits.style', font_formatStyle(style));
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓股票图中日期选择框设置↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 添加范围选择器按钮
     * @param strText 按钮显示的文本
     * @param strType 定义时间间隔，可取'millisecond', 'second', 'minute', 'day', 'week', 'month', 'ytd' (year to date), 'year' and 'all'
     * @param nCount 以定义的时间间隔为单位，定义当前屏显示的点的数量
     * @param bDataGroupingForced 是否启用数据分组，如果启用，则以分组的单位和数据取平均值
     * @param strDataGroupingUnits 数据分组的单位
     * @param nDataGroupingCount 数据分组的点的数量，可取'millisecond', 'second', 'minute', 'day', 'week', 'month', 'ytd' (year to date), 'year'
     * @constructor
     */
    Chart.prototype.IAddRangeSelectorButton = function(strText, strType, nCount, bDataGroupingForced, strDataGroupingUnits, nDataGroupingCount){

        this.set("options.rangeSelector.buttons",this.get("options.rangeSelector.buttons") || []);
        this.set("button.text", strText);
        this.set("button.type", strType);
        this.set("button.count", number_format(nCount));
        this.set("button.dataGrouping.forced", !!bDataGroupingForced);
        if(strDataGroupingUnits != undefined){
            this.set("button.dataGrouping.units", [strDataGroupingUnits, [number_format(nDataGroupingCount) || 1]]);
        }
        this.get("options.rangeSelector.buttons").push(this.get("button"));
    };

    /**
     * 图表加载后是否使所有的范围选则按钮可用，默认时间轴上存在相对应的时间范围的按钮可用
     * @param bAllButtonsEnabled 默认false
     * @constructor
     */
    Chart.prototype.ISetRangeSelectorAllButtonsEnabled = function (bAllButtonsEnabled) {
        this.set('options.rangeSelector.allButtonsEnabled', !!bAllButtonsEnabled);
    };

    /**
     * 设置范围选择按钮之间的距离
     * @param nButtonSpacing 默认0
     * @constructor
     */
    Chart.prototype.ISetRangeSelectorButtonSpacing = function (nButtonSpacing) {
        this.set('options.rangeSelector.buttonSpacing', number_format(nButtonSpacing));
    };

    /**
     * 是否启用范围选择器
     * @param bEnabled 默认true
     * @constructor
     */
    Chart.prototype.ISetRangeSelectorEnabled = function (bEnabled) {
        this.set('options.rangeSelector.enabled', !!bEnabled);
    };

    /**
     * 日期输入框的边框色
     * @param cInputBoxBorderColor 默认silver
     * @constructor
     */
    Chart.prototype.ISetRangeSelectorInputBoxBorderColor = function (cInputBoxBorderColor) {
        this.set('options.rangeSelector.inputBoxBorderColor', color_format(cInputBoxBorderColor));
    };

    /**
     * 是否启用日期输入框
     * @param bEnabled 当空间足够时默认启用（true），否则不启用（false）
     * @constructor
     */
    Chart.prototype.ISetRangeSelectorInputEnabled = function (bEnabled) {
        this.set('options.rangeSelector.inputEnabled', !!bEnabled);
    };

    /**
     * 设置日期输入框的位置，默认{align:right}
     * @param align 水平位置，可设置"left", "center" or "right"，默认right
     * @param verticalAlign 垂直位置，可设置top, middle or bottom
     * @param x 水平偏移，默认0
     * @param y 垂直偏移，默认0
     * @constructor
     */
    Chart.prototype.ISetRangeSelectorInputPosition = function (align, verticalAlign, x, y) {
        this.set("position.align", align);
        this.set("position.verticalAlign", verticalAlign);
        this.set("position.x", number_format(x));
        this.set("position.y", number_format(y));
        this.set('options.rangeSelector.inputPosition', this.get("position"));
    };

    /**
     * 图表初始化时，预选中显示范围选择按钮中的哪一个
     * @param nIndex 按钮的位置，默认undefined
     * @constructor
     */
    Chart.prototype.ISetRangeSelectorSelected = function (nIndex) {
        this.set('options.rangeSelector.selected', number_format(nIndex));
    };


//  rangeSelector: {
//      buttonTheme:
//      inputBoxHeight: 17
//      inputBoxStyle: undefined
//      inputBoxWidth: 90
//      inputDateFormat: %b %e %Y,
//      inputDateParser:
//      inputEditDateFormat: %Y-%m-%d
//      inputStyle:
//      labelStyle:
//  }

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓股票图中滚动条设置↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     *
     * @param cBarBackgroundColor
     * @constructor
     */
    Chart.prototype.ISetScrollbarBarBackgroundColor = function (cBarBackgroundColor) {
        this.set('options.scrollbar.barBackgroundColor', color_format(cBarBackgroundColor));
    };

    /**
     *
     * @param sBorderColor
     * @param nBorderWidth
     * @param nBorderRadius
     * @constructor
     */
    Chart.prototype.ISetScrollbarBorder = function (sBorderColor, nBorderWidth, nBorderRadius) {
        this.set('options.scrollbar.barBorderColor', color_format(sBorderColor));
        this.set('options.scrollbar.barBorderWidth', number_format(nBorderWidth));
        this.set('options.scrollbar.barBorderRadius', number_format(nBorderRadius));
    };

    /**
     *
     * @param cButtonArrowColor
     * @constructor
     */
    Chart.prototype.ISetScrollbarButtonArrowColor = function (cButtonArrowColor) {
        this.set('options.scrollbar.buttonArrowColor', color_format(cButtonArrowColor));
    };

    /**
     *
     * @param cButtonBackgroundColor
     * @constructor
     */
    Chart.prototype.ISetScrollbarButtonBackgroundColor = function (cButtonBackgroundColor) {
        this.set('options.scrollbar.buttonBackgroundColor', color_format(cButtonBackgroundColor));
    };

    /**
     *
     * @param sBorderColor
     * @param nBorderWidth
     * @param nBorderRadius
     * @constructor
     */
    Chart.prototype.ISetScrollbarButtonBorder = function (sBorderColor, nBorderWidth, nBorderRadius) {
        this.set('options.scrollbar.buttonBorderColor', color_format(sBorderColor));
        this.set('options.scrollbar.buttonBorderWidth', number_format(nBorderWidth));
        this.set('options.scrollbar.buttonBorderRadius', number_format(nBorderRadius));
    };

    /**
     *
     * @param bEnabled
     * @constructor
     */
    Chart.prototype.ISetScrollbarEnabled = function (bEnabled) {
        this.set('options.scrollbar.enabled', !!bEnabled);
    };

    /**
     *
     * @param nHeight
     * @constructor
     */
    Chart.prototype.ISetScrollbarHeight = function (nHeight) {
        this.set('options.scrollbar.height', number_format(nHeight));
    };

    /**
     *
     * @param bLiveRedraw
     * @constructor
     */
    Chart.prototype.ISetScrollbarLiveRedraw = function (bLiveRedraw) {
        this.set('options.scrollbar.liveRedraw', !!bLiveRedraw);
    };

    /**
     *
     * @param nMinWidth
     * @constructor
     */
    Chart.prototype.ISetScrollbarMinWidth = function (nMinWidth) {
        this.set('options.scrollbar.minWidth', number_format(nMinWidth));
    };

    /**
     *
     * @param cRifleColor
     * @constructor
     */
    Chart.prototype.ISetScrollbarRifleColor = function (cRifleColor) {
        this.set('options.scrollbar.rifleColor', color_format(cRifleColor));
    };

    /**
     *
     * @param cTrackBackgroundColor
     * @constructor
     */
    Chart.prototype.ISetScrollbarTrackBackgroundColor = function (cTrackBackgroundColor) {
        this.set('options.scrollbar.trackBackgroundColor', color_format(cTrackBackgroundColor));
    };

    /**
     *
     * @param sBorderColor
     * @param nBorderWidth
     * @param nBorderRadius
     * @constructor
     */
    Chart.prototype.ISetScrollbarTrackBorder = function (sBorderColor, nBorderWidth, nBorderRadius) {
        this.set('options.scrollbar.trackBorderColor', color_format(sBorderColor));
        this.set('options.scrollbar.trackBorderWidth', number_format(nBorderWidth));
        this.set('options.scrollbar.trackBorderRadius', number_format(nBorderRadius));
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓缩放条中导航条设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    Chart.prototype.ISetNavigatorEnable = function (bEnabled) {
        this.set('options.navigator.enabled', !!bEnabled);
    }

    Chart.prototype.ISetNavigatorAdaptToUpdatedData = function (bEnabled) {
        this.set('options.navigator.adaptToUpdatedData', !!bEnabled);
    }

    Chart.prototype.ISetNavigatorSeriesAnimation = function (bool) {
        this.set('options.navigator.series.animation', !!bool);
    };

    Chart.prototype.ISetNavigatorSeriesData = function (dataArr) {
        this.set('options.navigator.series.data', dataArr);
    };

    Chart.prototype.ISetNavigatorSeries = function (xName, yName) {
        this.set('options.navigator.series.data',  generatePointArray(this.allSeriesData, xName, yName));
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓多图表接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 设置多图表的绘制div
     * @param strRenderTo
     * @constructor
     */
    Chart.prototype.ISetChartsRenderTo = function(strRenderTo){
        this.renderTo = strRenderTo;
        this.set('multiChartsOptions.renderTo', strRenderTo);
    };

    /**
     * 设置图表的水平间距和垂直间距
     * @param hSpacing
     * @param vSpacing
     * @constructor
     */
    Chart.prototype.ISetChartsSpacing = function(hSpacing, vSpacing){
        this.set("multiChartsOptions.hSpacing", hSpacing);
        this.set("multiChartsOptions.vSpacing", vSpacing);
    };

    /**
     * 开始设置一组图表的属性
     * @constructor
     */
    Chart.prototype.ISetBeginChart = function(){
        this.options = {};
//        this.options.allSeriesData = this.allSeriesData;
    };

    /**
     * 结束设置一组图表的属性
     * @constructor
     */
    Chart.prototype.ISetEndChart = function(){
        this.multiChartsOptions.charts = this.multiChartsOptions.charts || [];
        this.multiChartsOptions.charts = this.multiChartsOptions.charts.concat(this.options);
    };

    /**
     * 设置图表的位置
     * @param row
     * @param col
     * @constructor
     */
    Chart.prototype.ISetChartPosition = function(row, col){
        this.set("options.chart.row", row);
        this.set("options.chart.col", col);
    };

    ///////////////////////////////////////////////
    //↓↓↓↓↓↓↓↓添加模块接口设置↓↓↓↓↓↓↓↓//
    //////////////////////////////////////////////
    /**
     * 添加压裂曲线
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddFracturingModule = function(bool){
        if(!!bool){
            this.loadFile(bootPath + "/js/plugins/fracturing-curve.src.js");
        }
    };

    /**
     * 添加三维模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAdd3DChartModule = function(bool){
        if(!!bool){
            this.isMultiCharts = true;
            this.loadFile(bootPath + "/js/hwcharts-3d.src.js");
        }
    };

    /**
     * 添加递减曲线
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddDeclineModule = function(bool){
        if(!!bool){
            needDhtmlx = true;
            hasContextMenu = true;
            this.loadFile(bootPath + "/js/plugins/export-csv.js");
            this.loadFile(bootPath + "/js/plugins/decline-curve.src.js");
        }
    };

    /**
     * 添加数据查看模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddDataViewModule = function (bool) {
        if(!!bool){
            needDhtmlx = true;
            hasContextMenu = true;
            if(dhxVersion == "5"){
                this.loadFile(bootPath + "/js/plugins/export-csv.js");
                this.loadFile(bootPath + "/js/plugins/data-review-5.src.js");
            }
            else{
                this.loadFile(bootPath + "/js/plugins/export-csv.js");
                this.loadFile(bootPath + "/js/plugins/data-review.src.js");
            }
        }
    };

    /**
     * 添加数据抽稀模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddDataExtractModule = function(bool){
        if(!!bool){
            //添加支持右键菜单支持的dhtmlx
            needDhtmlx = true;
            this.loadFile(bootPath + "/js/plugins/data_extract.src.js");
        }
    };

    /**
     * 添加图片导出模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddImageExportModule = function (bool) {
        if(!!bool){
            //添加支持右键菜单支持的dhtmlx
            needDhtmlx = true;
            hasContextMenu = true;
            if(dhxVersion == "5"){
                this.loadFile(bootPath + "/js/modules/exporting.src.js");
                this.loadFile(bootPath + "/js/modules/exporting-plug-5.src.js");
            }
            else{
                this.loadFile(bootPath + "/js/modules/exporting.src.js");
                this.loadFile(bootPath + "/js/modules/exporting-plug.src.js");
            }
        }
    };

    /**
     * 添加多段选择模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddMultiSelectModule = function (bool) {
        if(!!bool){
            this.loadFile(bootPath + "/js/plugins/multi-selection.src.js");
        }
    };

    /**
     * 添加标注避让模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddLabelYieldModule = function(bool){
        if(!!bool){
            this.loadFile(bootPath + "/js/plugins/realign-datalabel.js");
        }
    };

    /**
     * 添加大数据量支持模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddLargeDataModule = function(bool){
        if(!!bool){
            this.loadFile(bootPath + "/js/modules/boost.js");
        }
    };

    /**
     * 添加支持多图表模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddMultiChartsModule = function(bool){
        if(!!bool){
            this.loadFile(bootPath + "/js/hwcharts-multi.src.js");
        }
    };

    /**
     * 添加图例拖动
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddLegendDragModule = function(bool){
        if(!!bool){
            this.loadFile(bootPath + "/js/plugins/drag-legend.src.js");
        }
    };

    /**
     * 添加点的拖动
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddPointDragModule = function(bool){
        if(!!bool){
//            var path = bootPath + "/js/plugins/point-drag.src.js";
            this.loadFile(bootPath + "/js/plugins/draggable-points.js");
        }
    };

    /**
     * 添加属性设置模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddPropertySetModule = function (bool) {
        if(!!bool){
            //添加支持弹出框支持的dhtmlx
            needDhtmlx = true;
            this.loadFile(bootPath + "/js/plugins/property-interact.src.js", true);
        }
    };
    /**
     * 添加顶部工具条功能模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddToolBarSetModule = function (bool) {
        if(!!bool){
            //添加支持弹出框支持的dhtmlx
            needDhtmlx = true;
            this.loadFile(bootPath + "/js/plugins/toolBar.src.js", true);
        }
    };

    /**
     * 添加单击选中模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddSelectModule = function (bool) {
        if(!!bool){
            this.loadFile(bootPath + "/js/plugins/design-select.src.js");
        }
    };

    /**
     * 添加点的删除和恢复模块
     * @param bool
     * @param deleteMode 删除模式，0表示点直接删除，1表示点删除后可以恢复，默认为0
     * @constructor
     */
    Chart.prototype.IAddPointDeleteRecoveryModule = function (bool, deleteMode) {
        if(!!bool){
            //添加支持弹出框支持的dhtmlx
            needDhtmlx = true;
            hasContextMenu = true;
            this.loadFile(bootPath + "/js/plugins/point-delete-recovery.src.js");
            this.set('options.plotOptions.series.deleteMode', deleteMode);
        }
    };


    /**
     * 添加序列添加和删除模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddSeriesAddDeleteModule = function (bool) {
        if(!!bool){
            //添加支持弹出框支持的dhtmlx
            needDhtmlx = true;
            hasContextMenu = true;
            this.loadFile(bootPath + "/js/plugins/series-add-delete.src.js");
        }
    };


    /**
     * 添加拖动序列模块
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddSeriesDragModule = function(bool){
        needDhtmlx = true;
        hasContextMenu = true;
        this.loadFile(bootPath + "/js/plugins/draggable-series.js");
    };

    /**
     * 添加模板导出
     * @param bool
     * @constructor
     */
    Chart.prototype.IAddTemplateExportModule = function(bool){
        if(!!bool){
            needDhtmlx = true;
            hasContextMenu = true;
            this.loadFile(bootPath + "/js/plugins/template-export.src.js");
        }
    };

    window.Chart = Chart;

    ///====================================================================================================//
    //====================================================================================================//
    //====================================================================================================//
    //====================================================================================================//
    //====================================================================================================//
    //====================================================================================================//
    //////////////////////////////////////////////////////
    //////↓↓↓↓↓↓↓↓以下是旧曲线相关接口↓↓↓↓↓↓↓↓//
    /////////////////////////////////////////////////////

    Chart.prototype.ISetChartsItemsMinSize = function(nWidth, nHeight){
        this.set("multiChartsOptions.chartsItems.minWidth", nWidth);
        this.set("multiChartsOptions.chartsItems.minHeight", nHeight);
    }

    Chart.prototype.ISetChartsItemsSize = function(nWidth, nHeight){
        this.set("multiChartsOptions.chartsItems.width", nWidth);
        this.set("multiChartsOptions.chartsItems.height", nHeight);
    }

    Chart.prototype.ISetChartsIsAxisYVAlign = function(bool){
        this.set("multiChartsOptions.chartsItems.isAxisYVAlign", !!bool);
    }

    Chart.prototype.ISetChartsIsAxisYTitleVAlign = function(bool){
        this.set("multiChartsOptions.chartsItems.isAxisYTitleVAlign", !!bool);
    }

    //多图表设置
    Chart.prototype.ISetMultiCharts = function(){
        this.isMultiCharts = true;
        this.multiChartsOptions = {};
        this.loadFile(bootPath + "/js/hwcharts-multi.src.js");
    };

    Chart.prototype.ISetRenderTo = function (sRender) {
        this.renderTo = sRender;
        if(this.multiChartsOptions){
            this.set('multiChartsOptions.renderTo', sRender);
        }
        else{
            this.set('options.chart.renderTo', sRender.replace("#", ""));
        }
    };

    Chart.prototype.ISetChartsIsDownload = function(bool){
        this.set("multiChartsOptions.exporting.isDownload", !!bool);
    }

    Chart.prototype.ISetChartsImgExportName = function(filename){
        this.set("multiChartsOptions.exporting.filename", filename);
    }

    Chart.prototype.ISetChartsImgExportPath = function(imgPath){
        this.set("multiChartsOptions.exporting.imgSavePath", imgPath);
    }

    Chart.prototype.ISetChartsXmlExportPath = function(xmlPath){
        this.set("multiChartsOptions.exporting.xmlSavePath", xmlPath);
    }

    Chart.prototype.ISetExportChartsSize = function(w,h){
        this.set("multiChartsOptions.exporting.width", w);
        this.set("multiChartsOptions.exporting.height", h);
    }

    Chart.prototype.ISetAnimation = function (bEnable, fDuration, strAction) {
        if (!!bEnable) {
            var aniObj = {};
            aniObj.duration = fDuration || 500;
            strAction || (aniObj.easing = strAction);
            this.set('options.plotOptions.series.animation', aniObj);
        }
        else {
            this.set('options.plotOptions.series.animation', !!bEnable);
        }
    }

    Chart.prototype.ILoadXML = function(url, func){
        func.call(this, arguments);
    };


    Chart.prototype.IShowDialog = function (bool) {
        this.set('options.chart.showDialog', !!bool);
    };

    Chart.prototype.ISetGatherInterval = function (fInterval) {
        this.set('options.plotOptions.area.gatherInterval', fInterval);
    }


    Chart.prototype.ISetDial = function (strRadius, strBgColor, strBorderColor, strBorderWidth, strBaseWidth, strTopWidth, strBaseLength, strRearLength) {
        var radiusArr = (strRadius && array_map(strRadius.split(","), function (v) { return v.trim() == "" ? 80 : parseFloat(v.trim()) }, null)) || [];
        var bgColorArr = (strBgColor && array_map(strBgColor.split(","),function (v) { return v.trim() == "" ? '#000000' : color_format(v.trim()) }, null)) || [];
        var borderColorArr = (strBorderColor && array_map(strBorderColor.split(","),function (v) { return v.trim() == "" ? 'silver' : color_format(v.trim()) }, null)) || [];
        var borderWidthArr = (strBorderWidth && array_map(strBorderWidth.split(","),function (v) { return v.trim() == "" ? 0 : parseFloat(v.trim()) }, null)) || [];
        var baseWidthArr = (strBaseWidth && array_map(strBaseWidth.split(","),function (v) { return v.trim() == "" ? 3 : parseFloat(v.trim()) }, null)) || [];
        var topWidthArr = (strTopWidth && array_map(strTopWidth.split(","),function (v) { return v.trim() == "" ? 1 : parseFloat(v.trim()) }, null)) || [];
        var baseLengthArr = (strBaseLength && array_map(strBaseLength.split(","),function (v) { return v.trim() == "" ? 70 : parseFloat(v.trim()) }, null)) || [];
        var rearLengthArr = (strRearLength && array_map(strRearLength.split(","),function (v) { return v.trim() == "" ? 10 : parseFloat(v.trim()) }, null)) || [];
        var tails = this.series[0] && this.series[0].data;
        for (var i = 0; i < tails.length; i++) {
            tails[i].dial || (tails[i].dial = {});
            tails[i].dial.backgroundColor = bgColorArr[i] || '#000000';
            tails[i].dial.baseLength = baseLengthArr[i] || (baseLengthArr[i] == 0 ? 0 : 70);
            tails[i].dial.baseWidth = baseWidthArr[i] || (baseWidthArr[i] == 0 ? 0 : 3);
            tails[i].dial.borderColor = borderColorArr[i] || 'silver';
            tails[i].dial.borderWidth = borderWidthArr[i] || 0;
            tails[i].dial.radius = radiusArr[i] || (radiusArr[i] == 0 ? 0 : 80);
            tails[i].dial.rearLength = rearLengthArr[i] || (rearLengthArr[i] == 0 ? 0 : 10);
            tails[i].dial.topWidth = topWidthArr[i] || (topWidthArr[i] == 0 ? 0 : 1);
        }
        var arr = str.split(",")
    }



    Chart.prototype.ISetDataLabelColor = function (strLineColor) {
        var othis = this;
        var dataColorArr = array_map(strLineColor.split(","), function (v) { return v.trim() && color_format(v.trim()) }, null);
        for (var i = 0; i < this.series.length; i++) {
            if (dataColorArr[i]) {
                this.series[i].dataLabels = this.series[i].dataLabels || {};
                this.series[i].dataLabels.color = dataColorArr[i];
            }
            else {
                this.series[i].dataLabels = this.series[i].dataLabels || {};
                this.series[i].dataLabels.color = null;
            }
        }
    };

    Chart.prototype.ISetDataLabelPos = function (alignStr, valignStr, xStr, yStr) {
        var othis = this;
        var alignArr = array_map(alignStr.split(","), function (v) { return v.trim() && (v.trim()) }, null);
        var valignArr = array_map(valignStr.split(","), function (v) { return v.trim() && (v.trim()) }, null);
        var xArr = array_map(xStr.split(","), function (v) { return v.trim() && parseFloat(v.trim()) }, null);
        var yArr = array_map(yStr.split(","), function (v) { return v.trim() && parseFloat(v.trim()) }, null);
        for (var i = 0; i < this.series.length; i++) {
            if (alignArr[i]) {
                this.series[i].dataLabels = this.series[i].dataLabels || {};
                this.series[i].dataLabels.align = alignArr[i];
            }
            if (valignArr[i]) {
                this.series[i].dataLabels = this.series[i].dataLabels || {};
                this.series[i].dataLabels.verticalAlign = valignArr[i];
            }
            if (xArr[i]) {
                this.series[i].dataLabels = this.series[i].dataLabels || {};
                this.series[i].dataLabels.x = xArr[i];
            }
            if (yArr[i]) {
                this.series[i].dataLabels = this.series[i].dataLabels || {};
                this.series[i].dataLabels.y = yArr[i];
            }
        }
    };

    Chart.prototype.ISetGradient = function () {
        var chartType = this.get('options.chart.type');
        var args = arguments, i, j;
        if (args.length == 0) {
            for (i = 0; i < this.series.length; i++) {
                var datas = this.series[i].data;
                for (j = 0; j < datas.length; j++) {
                    var gradientColor = { linearGradient: [0, 0, 0, 1],
                        stops: generateDefaultGColor(chartType, this.series[i].color, 'v')
                    };
                    datas[j].color = gradientColor;
                }
            }
        }
        else if (Object.prototype.toString.call(args[0]) === '[object Array]') {
            var gradientColorArr = args[0];
            for (i = 0; i < this.series.length; i++) {
                if (!gradientColorArr[i]) {
                    var datas = this.series[i].data;
                    for (j = 0; j < datas.length; j++) {
                        var gradientColor = { linearGradient: [0, 0, 0, 1],
                            stops: generateDefaultGColor(chartType, this.series[i].color, 'v')
                        };
                        datas[j].color = gradientColor;
                    }
                }
                else {
                    var datas = this.series[i].data;
                    for (j = 0; j < datas.length; j++) {
                        var gridientColor = {};
                        if (gradientColorArr[i].radialGradient) {
                            gridientColor.radialGradient = {};
                            for (var each in gradientColorArr[i].radialGradient) {
                                gridientColor.radialGradient[each] = gradientColorArr[i].radialGradient[each];
                            }
                        }
                        else if (gradientColorArr[i].linearGradient) {
                            gridientColor.linearGradient = [];
                            for (var k = 0; k < gradientColorArr[i].linearGradient.length; k++) {
                                gridientColor.linearGradient[k] = gradientColorArr[i].linearGradient[k];
                            }
                        }
                        else {
                            gridientColor.linearGradient = [0, 0, 0, 1];
                        }
                        if (gradientColorArr[i].stops && gradientColorArr[i].stops != 0) {
                            gridientColor.stops = [];
                            for (var each in gradientColorArr[i].stops) {
                                gridientColor.stops[each] = [gradientColorArr[i].stops[each][0], gradientColorArr[i].stops[each][1]];
                            }
                        }
                        else {
                            if (gridientColor.linearGradient) {
                                var linearGradient = gridientColor.linearGradient;
                                if ((linearGradient[0] != linearGradient[2])) {
                                    gridientColor.stops = generateDefaultGColor(chartType, this.series[i].color, 'h');
                                }
                                else {
                                    gridientColor.stops = generateDefaultGColor(chartType, this.series[i].color, 'v');
                                }
                            }
                            else {
                                gridientColor.stops = generateDefaultGColor(chartType, this.series[i].color, 'v');
                            }
                        }
                        datas[j].color = gridientColor;
                    }
                }

            }
        }
    }
    Chart.prototype.ISetSeriesBorder = function (borderColor, borderWidth, borderRadius) {
        if (borderColor) {
            this.set('options.plotOptions.series.borderColor', color_format(borderColor));
        }
        else {
            this.set('options.plotOptions.series.borderColor', null);
        }
        borderRadius != undefined && this.set('options.plotOptions.series.borderRadius', borderRadius);
        borderWidth != undefined && this.set('options.plotOptions.series.borderWidth', borderWidth);
    }




    Chart.prototype.ISetLinesEX = function (strFillColor) {
        var fillColorArr = array_map(strFillColor.split(","), function (v) {
            var color = color_format(v.trim());
            if (color) {
                return color;
            }
            else {
                var value = parseFloat(v.trim());
                if (!isNaN(value)) {
                    return value;
                }
                else return null;
            }
        }, null);

        for (var i = 0; i < this.series.length; i++) {
            if (typeof fillColorArr[i] === 'number') {
                this.series[i].fillColor = null;
                this.series[i].fillOpacity = fillColorArr[i];
            }
            else {
                this.series[i].fillColor = fillColorArr[i] || null;
            }
        }
    }


    Chart.prototype.IAddPane = function (fStartAngle, fEndAngle, strCenter, strBackground, fSize) {
        this.pane = {};
        this.pane.startAngle = fStartAngle || null;
        this.pane.endAngle = fEndAngle || null;
        strCenter && (this.pane.center = (strCenter && array_map(strCenter.split(','), function (v) { return v.trim() == "" ? '50%' : v.trim() }, null)) || ['50%', '50%']);
        this.pane.background = strBackground;
        fSize && (this.pane.size = fSize);
        if (Object.prototype.toString.call(this.get('options.pane')) !== '[object Array]') {
            this.set('options.pane', []);
        }
        this.get('options.pane').push(this.pane);
    };

    Chart.prototype.IAddZoomBar = function () {
        this.set('options.chart.zoomBar', true);
    };




    Chart.prototype.ISetTipFormatter = function (f) {
        this.set('options.tooltip.formatter', f);
    };

    Chart.prototype.ISetYAxisLabelFormatter = function (f) {
        this.set('y_axis.labels.formatter', f);
    };

    Chart.prototype.ISetXAxisLabelFormatter = function (f) {
        this.set('x_axis.labels.formatter', f);
    };

    Chart.prototype.ISetXAxisLabelDitgits = function (str) {
        this.set('x_axis.labels.ditgits', str);
    };

    Chart.prototype.ISetYAxisLabelDitgits = function (str) {
        this.set('y_axis.labels.ditgits', str);
    };

    Chart.prototype.ISetDataLabelFormatter = function (f) {
        this.set('options.plotOptions.series.dataLabels.formatter', f);
    };


    //图片导出服务地址
    Chart.prototype.ISetExportUrl = function (str) {
        this.set('options.exporting.url', str);
    };

    Chart.prototype.ISetSaveName = function (str) {
        this.set('options.exporting.saveName', str);
    };

    //设置导出的类型，是OCX还是网页下载的
    Chart.prototype.ISetExportType = function (str) {
        this.set('options.exporting.exportMethod', str);
    };


    //通过OCX组件下载到本地时的地址
    Chart.prototype.ISetExportTargetPath = function (str) {
        this.set('options.exporting.targetPath', str);
    };


    Chart.prototype.ISetSeriesType = function (strSeriesType) {
        if (strSeriesType == '' || strSeriesType == null) {
            return;
        }
        var seriesTypeArr = array_map(strSeriesType.split(","), function (v) { return v.trim() == "" ? 'line' : v.trim() }, null);
        for (var i = 0; i < this.series.length; i++) {
            this.series[i].type = seriesTypeArr[i] || 'line';
        }
    };

    Chart.prototype.ISetLargeData = function (bool) {
        this.largedata = !!bool;
    };

    Chart.prototype.ISetSeriesName = function (strSeriesName) {
        var seriesNameArr = array_map(strSeriesName.split(","), function (v) { return v.trim() == "" ? null : v.trim() }, null);
        for (var i = 0; i < this.series.length; i++) {
            this.series[i].name = seriesNameArr[i] || null;
        }
    };

    Chart.prototype.ISetAxisXLinePosition = function (value) {
        this.set('x_axis.linePosition', value);
    };

    Chart.prototype.ISetAxisXLineArrow = function (bool) {
        this.set('x_axis.hasArrow', !!bool);
    };

    Chart.prototype.ISetAxisYLinePosition = function (value) {
        this.set('y_axis.linePosition', value);
    };

    Chart.prototype.ISetAxisYLineArrow = function (bool) {
        this.set('y_axis.hasArrow', !!bool);
    };


    Chart.prototype.ISetAxisXNolinearLabel = function(bool){
        this.set('x_axis.nolinearLabel', !!bool);
    };


    Chart.prototype.ISetChartTitle = function (strChartTitle) {
        this.set('options.title.text', strChartTitle);
    };

    Chart.prototype.ISetChartTitlePos = function (bool, hpos, vpos, x, y) {
        this.set('options.title.floating', !!bool);
        if (hpos) {
            this.set('options.title.align', hpos);
        }
        if (vpos) {
            this.set('options.title.verticalAlign', vpos);
        }
        if (x || x == 0) {
            this.set('options.title.x', x);
        }
        if (y || y == 0) {
            this.set('options.title.y', y);
        }
    };

    Chart.prototype.ISetZoomType = function (type) {
        this.set('options.chart.zoomType', type);
    };


    Chart.prototype.IShowXAxisName = function (bool) {
        this.set('x_axis.title.enabled', !!bool);
    };
    Chart.prototype.IShowYAxisName = function (bool) {
        this.set('y_axis.title.enabled', !!bool);
    };

    Chart.prototype.IHiddenExportButton = function (bool) {
        this.set('options.exporting.buttons.exportButton.enabled', !bool);
    };

    Chart.prototype.IHiddenPrintButton = function (bool) {
        this.set('options.exporting.buttons.printButton.enabled', !bool);
    };

    Chart.prototype.IShowLegend = function (bool) {
        this.set('options.legend.enabled', bool === undefined ? true : !!bool);
    };


    Chart.prototype.SetLegendSymbolSize = function (w, h) {
        if (w) {
            this.set('options.legend.symbolWidth', w);
        }
        if (h) {
            this.set('options.legend.symbolHeight', h);
        }

    };

    Chart.prototype.IShowXAxis = function (bool) {
        this.set('x_axis.enabled', bool === undefined ? true : !!bool);
    };

    Chart.prototype.IShowYAxis = function (bool) {
        this.set('y_axis.enabled', bool === undefined ? true : !!bool);
    };


    Chart.prototype.InvertAxisXY = function () {
        this.set('options.chart.inverted', true);
    };

    Chart.prototype.InverseAxisX = function () {
        this.set('x_axis.reversed', true);
    };

    Chart.prototype.InverseAxisY = function () {
        this.set('y_axis.reversed', true);
    };

    //    Chart.prototype.ISetAxisYLog = function(fBase){
    //        this.set('yAxis.type','logarithmic');
    //    }

    Chart.prototype.IContractAxisXLabel = function (bool) {
        this.set('x_axis.labels.isContract', !!bool);
    };

    Chart.prototype.getSerieByName = function(chart, name){
        var series = chart.series;
        for(var i = 0; i < series.length; i++){
            var serie = series[i];
            if(serie.name == name){
                return serie;
            }
        }
        alert("没有名称为" + name + "的序列");
        return null;
    };

    Chart.prototype.getSeriesByIndex = function(chart, index){
        if(!chart){
            return;
        }
        var series = chart.series;
        if(series[index]){
            return series[index];
        }
        alert("不存在索引为" + index + "的序列");
        return null;
    };

    Chart.prototype.addPoint = function(serie, options, redraw, shift){
        if(!serie){
            return;
        }

        var xAxis = serie.xAxis;
        if(xAxis.isDatetimeAxis){
            if(options[0]){
                options[0] = dateFormat_fromString(options[0]);
            }
            else if(options.x){
                options.x = dateFormat_fromString(options.x);
            }
        }
        else if(xAxis.categories){
            var addX = options[0] || options.x;
            if(addX){
                xAxis.categories.push(addX);
            }
        }
        serie.addPoint (options, redraw, shift);
    };

    Chart.prototype.getPointByIndex = function(serie, index){
        if(!serie){
            return;
        }
        if(serie.points[index]){
            return serie.points[index];
        }
        alert("不存在索引为" + index + "的点");
        return null;
    }

    Chart.prototype.updatePoint = function(point, options){
        if(!point){
            return;
        }
        point.update(options);
    }


//    Chart.prototype.update

    Chart.prototype.ISetParaEX = function (strFlag, strPara) {
        switch (strFlag.toLowerCase().trim()) {
            case "allowpointdrag":
                this.set('options.chart.allowPointDrag', !!strPara);
                break;
            case 'stacking':
                var staking;
                if (strPara && (strPara.trim().toLowerCase() == 'normal' || strPara.trim().toLowerCase() == 'percent')) {
                    staking = strPara.trim().toLowerCase();
                }
                else {
                    staking = 'normal';
                }
                this.set('options.plotOptions.series.stacking', staking);
                break;
            case 'pointstartonaxis': //设置分类坐标轴时，第一个点的位置是否起于x轴
                this.set('options.plotOptions.series.startOnAxis', !!strPara);
                break;
            case 'polar':
                this.set('options.chart.polar', !!strPara);
                break;
            case 'aligntick':
                this.set('options.chart.alignTicks', !!strPara);
                break;
            case 'titlefont':

                var fontStyleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                var fontStyle = {};
                if(isNaN(parseInt(fontStyleArr[0],10))){
                    this.set('options.title.style', font_formatStyle(strPara));
                    fontStyleArr[4] && this.set('options.title.rotation', fontStyleArr[4]);
                }
                else{
                    fontStyleArr[0] && (fontStyle.fontSize = fontStyleArr[0] + 'px');
                    fontStyleArr[1] && (fontStyle.color = color_format(fontStyleArr[1]));
                    fontStyleArr[2] && (fontStyle.fontWeight = font_getWeight(fontStyleArr[2]));
                    fontStyleArr[3] && this.set('options.title.rotation', fontStyleArr[3]);
                    this.set('options.title.style', fontStyle);
                }
                break;
            case 'x1namefont':
                fontStyleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                var fontStyle = {};
                if(isNaN(parseInt(fontStyleArr[0],10))){
                    this.set('x_axis.title.style', font_formatStyle(strPara));
                    this.set('x_axis.title.rotation', fontStyleArr[4] || 0);
                }
                else{
                    fontStyleArr[0] && (fontStyle.fontSize = fontStyleArr[0] + 'px');
                    fontStyleArr[1] && (fontStyle.color = color_format(fontStyleArr[1]));
                    fontStyleArr[2] && (fontStyle.fontWeight = font_getWeight(fontStyleArr[2]));
                    this.set('x_axis.title.rotation', fontStyleArr[3] || 0);
                    this.set('x_axis.title.style', fontStyle);
                }

                break;
            case 'x1namefontfamily':
                this.set('x_axis.title.style.fontFamily', strPara);
                break;
            case 'y1namefont':
                fontStyleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                var fontStyle = {};
                if(isNaN(parseInt(fontStyleArr[0],10))){
                    this.set('y_axis.title.style', font_formatStyle(strPara));
                    this.set('y_axis.title.rotation', fontStyleArr[4] || 0);
                }
                else{
                    fontStyleArr[0] && (fontStyle.fontSize = fontStyleArr[0] + 'px');
                    fontStyleArr[1] && (fontStyle.color = color_format(fontStyleArr[1]));
                    fontStyleArr[2] && (fontStyle.fontWeight = font_getWeight(fontStyleArr[2]));
                    this.set('y_axis.title.rotation', fontStyleArr[3] || 0);
                    this.set('y_axis.title.style', fontStyle);
                }
                break;
            case 'y1namefontfamily':
                this.set('y_axis.title.style.fontFamily', strPara);
                break;
            case 'refertopane':
                this.set('y_axis.pane', strPara);
                break;
            case 'legendfloating':
                this.set('options.legend.floating', !!strPara);
                break;
            case 'legendoffsetx':
                this.set('options.legend.x', strPara);
                break;
            case 'legendoffsety':
                this.set('options.legend.y', strPara);
                break;
            case 'legenditemdistance':
                this.set('options.legend.itemDistance', strPara);
                break;
            case 'legendsymbolpadding':
                this.set('options.legend.symbolPadding', strPara);
                break;
            case 'legenditemwidth':
                this.set('options.legend.itemWidth', strPara);
                break;
            case 'legenditemmargintop':
                this.set('options.legend.itemMarginTop', strPara);
                break;
            case 'legenditemmarginbottom':
                this.set('options.legend.itemMarginBottom', strPara);
                break;
            case 'x1titlelayout':
                if (strPara == 1) {
                    this.set('x_axis.title.align', 'middle');
                }
                else if (strPara == 2) {
                    this.set('x_axis.title.align', 'low');
                }
                else {
                    this.set('x_axis.title.align', 'high');
                }
                break;
            case 'x1labelfont':

                fontStyleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                var fontStyle = {};
                if(isNaN(parseInt(fontStyleArr[0],10))){
                    this.set('x_axis.labels.style', font_formatStyle(strPara));
                    this.set('x_axis.labels.rotation', fontStyleArr[4] || 0);
                }
                else{
                    fontStyleArr[0] && (fontStyle.fontSize = fontStyleArr[0] + 'px');
                    fontStyleArr[1] && (fontStyle.color = color_format(fontStyleArr[1]));
                    fontStyleArr[2] && (fontStyle.fontWeight = font_getWeight(fontStyleArr[2]));
                    this.set('x_axis.labels.rotation', fontStyleArr[3] || 0);
                    this.set('x_axis.labels.style', fontStyle);
                }
                break;
            case 'numbericlabelfont':
                var numbericlabelStyleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                var numbericlabelStyle = {};
                numbericlabelStyleArr[0] && (numbericlabelStyle.fontSize = numbericlabelStyleArr[0] + 'px');
                if (numbericlabelStyleArr[1]) {
                    numbericlabelStyleArr[1] && (numbericlabelStyle.color = color_format(numbericlabelStyleArr[1]));
                }
                else {
                    numbericlabelStyle.color = null;
                }
                numbericlabelStyleArr[2] && (numbericlabelStyle.fontWeight = font_getWeight(numbericlabelStyleArr[2]));
                this.set('options.plotOptions.series.dataLabels.style', numbericlabelStyle);
                break;
            case 'x1labelenabled':
                this.set('x_axis.labels.enabled', !!strPara);
                break;
            case 'y1labelenabled':
                this.set('y_axis.labels.enabled', !!strPara);
                break;
            case 'x1labelrotation':
                this.set('x_axis.labels.rotation', strPara);
                break;
            case 'y1labelfont':
                fontStyleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                var fontStyle = {};
                if(isNaN(parseInt(fontStyleArr[0],10))){
                    this.set('y_axis.labels.style', font_formatStyle(strPara));
                    this.set('y_axis.labels.rotation', fontStyleArr[4] || 0);
                }
                else{
                    fontStyleArr[0] && (fontStyle.fontSize = fontStyleArr[0] + 'px');
                    fontStyleArr[1] && (fontStyle.color = color_format(fontStyleArr[1]));
                    fontStyleArr[2] && (fontStyle.fontWeight = font_getWeight(fontStyleArr[2]));
                    this.set('y_axis.labels.rotation', fontStyleArr[3] || 0);
                    this.set('y_axis.labels.style', fontStyle);
                }
                break;

            case 'y1labelfontFamily':
                this.set('y_axis.labels.style.fontFamily', strPara);
                break;
            case 'x1labelfontFamily':
                this.set('x_axis.labels.style.fontFamily', strPara);
                break;

            case 'x1labelalign':
                this.set('x_axis.labels.align', strPara);
                break;
            case 'y1titleoffsety':
                this.set('y_axis.title.y', strPara);
                break;
            case 'y1titleoffsetx':
                this.set('y_axis.title.x', strPara);
                break;
            case 'x1titleoffsety':
                this.set('x_axis.title.y', strPara);
                break;
            case 'x1titleoffsetx':
                this.set('x_axis.title.x', strPara);
                break;
            case 'x2titlelayout':
                break;
            case 'y1titlelayout':
                if (strPara == 1) {
                    this.set('y_axis.title.align', 'middle');
                }
                else if (strPara == 2) {
                    this.set('y_axis.title.align', 'low');
                }
                else {
                    this.set('y_axis.title.align', 'high');
                }
                break;
            case 'y1opposite':
                this.set('y_axis.opposite', !!strPara);
                break;
            case 'x1opposite':
                this.set('x_axis.opposite', !!strPara);
                break;
            case 'y1endontick':
                this.set('y_axis.endOnTick', !!strPara);
                break;
            case 'y2titlelayout':
                break;
            case 'x1labelrotate':
                this.set('x_axis.labels.rotation', strPara);
                break;
            case 'y1labelrotate':
                this.set('y_axis.labels.rotation', strPara);
                break;
            case 'y1labelrotation':
                this.set('y_axis.labels.rotation', strPara);
                break;
            case 'x1labeldistance':
                this.set('x_axis.labels.distance', strPara);
                break;
            case 'y1labeldistance':
                this.set('y_axis.labels.distance', strPara);
                break;
            case 'x1labeloffsety':
                this.set('x_axis.labels.y', strPara);
                break;
            case 'y1labeloffsetx':
                this.set('y_axis.labels.x', strPara);
                break;
            case 'x1labelstep':
                this.set('x_axis.labels.step', strPara);
                break;
            case 'y1labelstep':
                this.set('y_axis.labels.step', strPara);
                break;
            case 'legendlayout':
                var alignArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                this.set('options.legend.align', alignArr[0] || 'center');
                this.set('options.legend.verticalAlign', alignArr[1] || 'bottom');
                this.set('options.legend.layout', alignArr[2] == 'v' ? 'vertical' : 'horizontal');
                break;
            case 'barspace':
                this.set('options.plotOptions.series.groupPadding', strPara);
                break;
            case 'barpointspace':
                this.set('options.plotOptions.series.pointPadding', strPara);
                break;
            case 'overlap':
                if (parseInt(strPara,10) > 1) {
                    strPara = parseInt(strPara,10) / 100;
                }
                this.set('options.plotOptions.series.pointPadding', strPara);
                break;
            case 'turboThreshold':
                this.set('options.plotOptions.series.turboThreshold', strPara);
                break;
            case 'crossval':
                this.set('options.plotOptions.series.threshold', strPara);
                break;
            case 'showtooltip':
                this.set('options.tooltip.enabled', !!strPara);
                break;
            case 'shownumericlabel':
                this.set('options.plotOptions.series.dataLabels.enabled', !!strPara);
                break;
            case 'numericlabelshowstep':
                this.set('options.plotOptions.series.dataLabels.step', parseInt(strPara,10));
                break;
            case 'markshowstep':
                this.set('options.plotOptions.series.marker.step', strPara);
                break;
            case 'showcheckboxinlegend':
                this.set('options.plotOptions.series.showCheckbox', !!strPara);
                this.set('options.plotOptions.series.selected', !!strPara);
                break;
            case 'numericlabelcolor':
                this.set('options.plotOptions.series.dataLabels.color', color_format(strPara));
                break;
            case 'numericlabelxoffset':
                this.set('options.plotOptions.series.dataLabels.x', strPara);
                break;
            case 'numericlabelyoffset':
                this.set('options.plotOptions.series.dataLabels.y', strPara);
                break;
            case 'numericlabelyield':
                this.set('options.chart.dataLabelYield', !!strPara);
                break;
            case 'allowpointselect':
                this.set('options.plotOptions.series.allowPointSelect', !!strPara);
                this.set('options.plotOptions.series.cursor', 'pointer');
                break;
            case 'linestep':
                this.set('options.plotOptions.series.step', strPara);
                break;
            case 'xmaingridstyle':
                var styleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                this.set('x_axis.gridLineColor', (styleArr[0] && color_format(styleArr[0])) || null);
                this.set('x_axis.gridLineWidth', (styleArr[1] && parseFloat(styleArr[1])) || 0);
                this.set('x_axis.gridLineDashStyle', (styleArr[2] && this.getLineStyle(styleArr[2])) || 'Solid');
                break;
            case 'xminorgridstyle':
                styleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                this.set('x_axis.minorGridLineColor', (styleArr[0] && color_format(styleArr[0])) || null);
                this.set('x_axis.minorGridLineWidth', (styleArr[1] && parseFloat(styleArr[1])) || 0);
                this.set('x_axis.minorGridLineDashStyle', (styleArr[2] && this.getLineStyle(styleArr[2])) || 'Solid');
                break;
            case 'ymaingridstyle':
                styleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                this.set('y_axis.gridLineColor', (styleArr[0] && color_format(styleArr[0])) || null);
                this.set('y_axis.gridLineWidth', (styleArr[1] && parseFloat(styleArr[1])) || 0);
                this.set('y_axis.gridLineDashStyle', (styleArr[2] && this.getLineStyle(styleArr[2])) || 'Solid');
                break;
            case 'yminorgridstyle':
                styleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                this.set('y_axis.minorGridLineColor', (styleArr[0] && color_format(styleArr[0])) || null);
                this.set('y_axis.minorGridLineWidth', (styleArr[1] && parseFloat(styleArr[1])) || 0);
                this.set('y_axis.minorGridLineDashStyle', (styleArr[2] && this.getLineStyle(styleArr[2])) || 'Solid');
                break;
            case 'xshowfirstlabel':
                this.set('x_axis.showFirstLabel', !!strPara);
                break;
            case 'xshowlastlabel':
                this.set('x_axis.showLastLabel', !!strPara);
                break;
            case 'yshowfirstlabel':
                this.set('y_axis.showFirstLabel', !!strPara);
                break;
            case 'yshowlastlabel':
                this.set('y_axis.showLastLabel', !!strPara);
                break;
            case 'xshowlastpointlabel':
                this.set('x_axis.showLastPointLabel', !!strPara);
                break;
            case 'yshowlastpointlabel':
                this.set('y_axis.showLastPointLabel', !!strPara);
                break;
            case 'xlabelstaggerlines':
                this.set('x_axis.labels.staggerLines', strPara);
                break;
            case 'x1linestyle':
                styleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                if (styleArr.length == 1) {
                    this.set('x_axis.lineStyle', (this.getLineStyle(styleArr[0])))
                }
                else {
                    styleArr[0] && this.set('x_axis.lineColor', color_format(styleArr[0]));
                    styleArr[1] && this.set('x_axis.lineWidth', (parseFloat(styleArr[1])));
                    styleArr[2] && this.set('x_axis.lineStyle', this.getLineStyle(styleArr[2]));
                }
                break;
            case 'y1linestyle':
                styleArr = array_map(strPara.split(','), function (v) { return v.trim() }, null);
                if (styleArr.length == 1) {
                    this.set('y_axis.lineStyle', (this.getLineStyle(styleArr[0])));
                }
                else {
                    styleArr[0] && this.set('y_axis.lineColor', color_format(styleArr[0]));
                    styleArr[1] && this.set('y_axis.lineWidth', (parseFloat(styleArr[1])));
                    styleArr[2] && this.set('y_axis.lineStyle', this.getLineStyle(styleArr[2]));
                }
                break;
            case 'y1allowdecimals':
                this.set('y_axis.allowDecimals', !!strPara);
                break;
            case 'x1allowdecimals':
                this.set('x_axis.allowDecimals', !!strPara);
                break;
            case 'x1linecolor':
                this.set('x_axis.lineColor', color_format(strPara));
                break;
            case 'y1linecolor':
                this.set('y_axis.lineColor', color_format(strPara));
                break;
            case 'x1linewidth':
                this.set('x_axis.lineWidth', parseInt(strPara,10));
                break;
            case 'y1linewidth':
                this.set('y_axis.lineWidth', parseInt(strPara,10));
                break;
            case 'y1offset':
                this.set('y_axis.offset', strPara);
                break;
        }
    };
} ());

(function(){
    //表示全局唯一标识符 (GUID)。
    function Guid(g){
        var arr = new Array(); //存放32位数值的数组
        if (typeof(g) == "string"){ //如果构造函数的参数为字符串
            InitByString(arr, g);
        }
        else{
            InitByOther(arr);
        }
        //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
        this.Equals = function(o){
            if (o && o.IsGuid){
                return this.ToString() == o.ToString();
            }
            else{
                return false;
            }
        }
        //Guid对象的标记
        this.IsGuid = function(){}
        //返回 Guid 类的此实例值的 String 表示形式。
        this.ToString = function(format){
            if(typeof(format) == "string"){
                if (format == "N" || format == "D" || format == "B" || format == "P"){
                    return ToStringWithFormat(arr, format);
                }
                else{
                    return ToStringWithFormat(arr, "D");
                }
            }
            else{
                return ToStringWithFormat(arr, "D");
            }
        };

        //由字符串加载
        function InitByString(arr, g){
            g = g.replace(/\{|\(|\)|\}|-/g, "");
            g = g.toLowerCase();
            if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1){
                InitByOther(arr);
            }
            else{
                for (var i = 0; i < g.length; i++){
                    arr.push(g.charAt(i));
                }
            }
        }
        //由其他类型加载
        function InitByOther(arr){
            var i = 32;
            while(i--){
                arr.push("0");
            }
        }

        /*
         根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
         N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
         D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
         B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
         P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
         */
        function ToStringWithFormat(arr, format){
            switch(format){
                case "N":
                    return arr.toString().replace(/,/g, "");
                case "D":
                    var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20,32);
                    str = str.replace(/,/g, "");
                    return str;
                case "B":
                    var str = ToStringWithFormat(arr, "D");
                    str = "{" + str + "}";
                    return str;
                case "P":
                    var str = ToStringWithFormat(arr, "D");
                    str = "(" + str + ")";
                    return str;
                default:
                    return new Guid();
            }
        }
    }
    //Guid 类的默认实例，其值保证均为零。
    Guid.Empty = new Guid();
    //初始化 Guid 类的一个新实例。
    Guid.NewGuid = function(){
        var g = "";
        var i = 32;
        while(i--){
            g += Math.floor(Math.random()*16.0).toString(16);
        }
        return new Guid(g);
    }
    window.Guid = Guid;
}());

/**
 * Check for string
 * @param {Object} s
 */
function isString(s) {
    return typeof s === 'string';
};

/**
 * Check for object
 * @param {Object} obj
 */
function isObject(obj) {
    return obj && typeof obj === 'object';
};

/**
 * Check for array
 * @param {Object} obj
 */
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

/**
 * Check for number
 * @param {Object} n
 */
function isNumber(n) {
    return typeof n === 'number';
};

//根据序列名在定制文件中查找序列样式
function findSeriesThemeByName(name, sereisThemes){
//    if(!isArray(sereisThemes)) return null;
    for(var each in sereisThemes){
        if(sereisThemes.hasOwnProperty(each)){
            if(sereisThemes[each] && sereisThemes[each].name == name.trim()){
                return sereisThemes[each];
            }
        }
    }
    return null;
}

/**
 * 获取滚动条滚动距离
 * @returns {Array|*}
 * @private
 */
function ___getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
        yScroll = self.pageYOffset;
        xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {     // Explorer 6 Strict
        yScroll = document.documentElement.scrollTop;
        xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
        yScroll = document.body.scrollTop;
        xScroll = document.body.scrollLeft;
    }
    return [xScroll,yScroll];
};


function getBrowserType(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    return Sys;
}

function getIEDocumentMode(){
    // 判断是否为IE
    var isIE = navigator.userAgent.toLocaleLowerCase().indexOf('msie') !== -1;

    // 判断是否为IE5678
    var isLteIE8 = isIE && !-[1,];

    // 用于防止因通过IE8+的文档兼容性模式设置文档模式，导致版本判断失效
    var dm = document.documentMode, isIE5, isIE6, isIE7, isIE8, isIE9, isIE10, isIE11;
    if (dm){
        return dm;
        isIE5 = dm === 5;
        isIE6 = dm === 6;
        isIE7 = dm === 7;
        isIE8 = dm === 8;
        isIE9 = dm === 9;
        isIE10 = dm === 10;
        isIE11 = dm === 11;
    }
    else{
        // 判断是否为IE5，IE5的文本模式为怪异模式(quirks),真实的IE5.5浏览器中没有document.compatMode属性
        isIE5 = (isLteIE8 && (!document.compatMode || document.compatMode === 'BackCompat'));
        // 判断是否为IE6，IE7开始有XMLHttpRequest对象
        isIE6 = isLteIE8 && !isIE5 && !XMLHttpRequest;
        // 判断是否为IE7，IE8开始有document.documentMode属性
        isIE7 = isLteIE8 && !isIE6 && !document.documentMode;
        // 判断是否IE8
        isIE8 = isLteIE8 && document.documentMode;
        // 判断IE9，IE10开始支持严格模式，严格模式中函数内部this为undefined
        isIE9 = !isLteIE8 && (function(){
            "use strict";
            return !!this;
        }());
        // 判断IE10，IE11开始移除了attachEvent属性
        isIE10 = isIE && !!document.attachEvent && (function(){
            "use strict";
            return !this;
        }());
        // 判断IE11
        isIE11 = isIE && !document.attachEvent;
        if(isIE5){
            return 5;
        }
        else if(isIE6){
            return 6;
        }
        else if(isIE7){
            return 7;
        }
        else if(isIE8){
            return 8;
        }
        else if(isIE9){
            return 6;
        }
        else if(isIE9){
            return 6;
        }
        else if(isIE10){
            return 10;
        }
        else if(isIE11){
            return 11;
        }
    }
};

//默认在本页面弹出，在添加dhtmlx_iframe.js的页面弹出
function getDhtmlxWindow(){
    //是否是最顶层窗口，即没有嵌入到iframe中
    _isTopWindow = true;
    parentFrame = null;
    dhtmlxPopWindow = null;
    topWindow = window;
    try{
        while(true){
            if(topWindow.dhtmlx_iframe){
                _isTopWindow = false;
                dhtmlxPopWindow = topWindow;
                var frames = dhtmlxPopWindow.parent.document.getElementsByTagName("iframe");
                for(var i = 0; i < frames.length; i++){
                    if(frames[i].contentWindow == window){
                        parentFrame =  frames[i];
                    }
                }
            }

            if(topWindow.parent == topWindow){
                break;
            }
            topWindow = topWindow.parent
        }
    }
    catch (e){

    }
//    for(topWindow = window; topWindow.parent!=null && topWindow.parent != topWindow; topWindow = topWindow.parent)
//    {
//        _isTopWindow = false;
//        if(topWindow.dhtmlx_iframe){
//            dhtmlxPopWindow = topWindow;
//        }
//        var frames = topWindow.parent.document.getElementsByTagName("iframe");
//        for(var i = 0; i < frames.length; i++){
//            if(frames[i].contentWindow == window){
//                parentFrame =  frames[i];
//            }
//        }
//    }
    if(!dhtmlxPopWindow){
//        dhtmlxPopWindow = topWindow;
        _isTopWindow = true;
    }
    if(!parentFrame){
        _isTopWindow = true;
    }
    return null;
}

/**
 * 动态加载js、css文件模块
 */
var classcodes = [];
function LoadFileList(_files,succes){           /*加载一批文件，_files:文件路径数组,可包括js,css,less文件,succes:加载成功回调函数*/
    var FileArray=[];
    if(typeof _files==="object"){
        FileArray=_files;
    }else if(typeof _files==="string"){
        /*如果文件列表是字符串，则用,切分成数组*/
        FileArray=_files.split(",");

    }
    if(FileArray!=null && FileArray.length>0){
        var LoadedCount=0;
        for(var i=0;i< FileArray.length;i++){
            loadFile(FileArray[i],function(){
                LoadedCount++;
                if(LoadedCount==FileArray.length){
                    succes();
                }
            })
        }
    }
    else if(FileArray!=null && FileArray.length==0){
        succes();
    }
    /*加载JS文件,url:文件路径,success:加载成功回调函数*/
    function loadFile(url, success) {
        
        if (!FileIsExt(classcodes,url)) {
            var ThisType=GetFileType(url);
            var fileObj=null;
            if(ThisType==".js"){
                fileObj=document.createElement('script');
                fileObj.src = url;
            }else if(ThisType==".css"){
                fileObj=document.createElement('link');
                fileObj.href = url;
                fileObj.type = "text/css";
                fileObj.rel="stylesheet";
            }else if(ThisType==".less"){
                fileObj=document.createElement('link');
                fileObj.href = url;
                fileObj.type = "text/css";
                fileObj.rel="stylesheet/less";
            }
            success = success || function(){};
            fileObj.onload = fileObj.onreadystatechange = function() {
                if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                    success();
                    classcodes.push(url)
                }
            }
            document.getElementsByTagName('head')[0].appendChild(fileObj);
        }else{
            success();
        }
    }
    /*获取文件类型,后缀名，小写*/
    function GetFileType(url){
        if(url!=null && url.length>0){
            return url.substr(url.lastIndexOf(".")).toLowerCase();
        }
        return "";
    }
    /*文件是否已加载*/
    function FileIsExt(FileArray,_url){
        if(FileArray!=null && FileArray.length>0){
            var len =FileArray.length;
            for (var i = 0; i < len; i++) {
                if (FileArray[i] ==_url) {
                    return true;
                }
            }
        }
        return false;
    }
}

function ContainsJS(jsName){
    var scripts = document.getElementsByTagName("script");
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(jsName) != -1) {
            return true;
        }
    }
    return false;
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

//深度拷贝对象或数组
function deepCopy(){
    var i,
        args = arguments,
        len,
        ret = {},
        doCopy = function (copy, original) {
            var value, key;

            // An object is replacing a primitive
            if (typeof copy !== 'object') {
                copy = {};
            }

            for (key in original) {
                if (original.hasOwnProperty(key)) {
                    value = original[key];

                    // Copy the contents of objects, but not arrays or DOM nodes
                    if (value && typeof value === 'object' && Object.prototype.toString.call(value) !== '[object Array]'
                        && key !== 'renderTo' && typeof value.nodeType !== 'number') {
                        copy[key] = doCopy(copy[key] || {}, value);

                        // Primitives and arrays are copied over directly
                    } else if(isArray(value)){
                        copy[key] = doCopy(copy[key] || [], value);
                    } else{
                        copy[key] = original[key];
                    }
                }
            }
            return copy;
        };

    // If first argument is true, copy into the existing object. Used in setOptions.
    if (args[0] === true) {
        ret = args[1];
        args = Array.prototype.slice.call(args, 2);
    }

    // For each argument, extend the return
    len = args.length;
    for (i = 0; i < len; i++) {
        ret = doCopy(ret, args[i]);
    }

    return ret;
}