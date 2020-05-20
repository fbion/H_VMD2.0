/*
filename：hwreport_core.js
creater：刘志伟
date created：2018.10.11
description：报表填报
date modified：2019.10.08
modifier：刘志伟
version：2.0.6(20191008)
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/
(function () {

    /**  
    * 数组中移除元素   
    * @param {Object} s  
    */
    Array.prototype.remove = function (s) {
        for (var i = 0; i < this.length; i++) {
            if (s == this[i])
                this.splice(i, 1);
        }
    }

    var dhtmxlUrl = CreateJSPath("hwreport_core.js", -2); //通用dhtmlx组件路径
    var reportUrl = CreateJSPath("hwreport_core.js", 0); //填报文件路径
    var tablehost = "";
    var reporthost = "";
    var debugStatus = window.hwDas ? window.hwDas.getUrlParameter("debugStatus") == "open" : false;
    var invalidNumber = -999;
    var insertRuleSheet;

    var abbrkeys = {

    };

    /**
    * 克隆dom元素
    */
    function clone(dom) {
        var clone = $(dom).clone();
        if (dom.tagName == "TD") {
            clone[0]._cellIndex = dom._cellIndex;
            clone[0]._attrs = dom._attrs;
        }
        return clone;
    }

    /*
    * 将字母z转换成十进制，z在表格中表示26
    */
    function convertLettersToDecimal(letter) {
        var sum = 0;
        for (var i = 0; i < letter.length; i++) {
            var n = letter.length - i - 1;
            var multi = 1;
            var code = letter.charCodeAt(i) - 96;
            while (n--) {
                multi *= 26;
            }
            sum += code * multi;
        }
        return sum;
    }

    /*
    * 将字母数字表示的单元格位置转换成行列表示
    */
    function convertToRowCol(m_letters) {
        if (!m_letters) {
            return null;
        }
        m_letters = m_letters.replace(/(^\s*)|(\s*$)/g, "");
        m_letters = m_letters.toLowerCase();
        var cell_letter_arr = [];
        var cell_number_arr = [];
        for (var i = 0; i < m_letters.length; i++) {
            var code = m_letters.charCodeAt(i);
            if (code >= 97 && code <= 122) {
                cell_letter_arr.push(m_letters.charAt(i));
            }
            else if (code >= 48 && code <= 57) {
                cell_number_arr.push(m_letters.charAt(i));
            }
        }
        var m_row_col = {
            row: -1,
            col: -1
        }
        m_row_col.col += convertLettersToDecimal(cell_letter_arr.join(''));
        m_row_col.row += parseInt(cell_number_arr.join(''), 10);
        return m_row_col;
    }

    /** 
    * 对象是否已定义   
    * @param {Object} obj  
    */
    function defined(obj) {
        return obj !== undefined && obj !== null;
    };

    /**
    * 继承
    */
    function extend(subClass, superClass, members) {
        var F = function () { };
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        subClass.superclass = superClass.prototype;
        if (members) {
            for (var each in members) {
                if (members.hasOwnProperty(each)) {
                    subClass.prototype[each] = members[each];
                }
            }
        }
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    }

    function getElementWidth(element) {
        return element.clientWidth || parseInt(element.style.width) || 0;
    };

    function getElementHeight(element) {
        return element.clientHeight || parseInt(element.style.height) || 0;
    };

    //获取属性名缩写 enattr: 启用缩写
    function getAttrName(name, enattr) {
        if (!enattr) {
            return name;
        }
        return abbrkeys[name] || name;
    }

    //根据缩写获取完整属性名
    function getReverseAttrName(name) {
        for (var key in abbrkeys) {
            if (abbrkeys.hasOwnProperty(key) && abbrkeys[key] == name) {
                return key;
            }
        }
        return name;
    }

    /**
    * 判断对象是否为空，object={}，array=[],string ="";
    */
    function isEmpty(obj) {
        if (!defined(obj)) {
            return true;
        }
        if (typeof obj == "object") {
            var t;
            for (t in obj)
                return !1;
            return !0
        }
        if (Object.prototype.toString.call(obj) == "[object Array]") {
            return obj.length == 0;
        }
        if (obj === "") {
            return true;
        }
        return false;
    };

    function isEqual(x, y) {
        // If both x and y are null or undefined and exactly the same 
        if (x === y) {
            return true;
        }

        // If they are not strictly equal, they both need to be Objects 
        if (!(x instanceof Object) || !(y instanceof Object)) {
            return false;
        }

        //They must have the exact same prototype chain,the closest we can do is
        //test the constructor. 
        if (x.constructor !== y.constructor) {
            return false;
        }

        for (var p in x) {
            //Inherited properties were tested using x.constructor === y.constructor
            if (x.hasOwnProperty(p)) {
                // Allows comparing x[ p ] and y[ p ] when set to undefined 
                if (!y.hasOwnProperty(p)) {
                    return false;
                }

                // If they have the same strict value or identity then they are equal 
                if (x[p] === y[p]) {
                    continue;
                }

                // Numbers, Strings, Functions, Booleans must be strictly equal 
                if (typeof (x[p]) !== "object") {
                    return false;
                }

                // Objects and Arrays must be tested recursively 
                if (!isEqual(x[p], y[p])) {
                    return false;
                }
            }
        }

        for (p in y) {
            // allows x[ p ] to be set to undefined 
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    };

    /**
    *
    */
    function pick() {
        for (var i = 0; i < arguments.length; i++) {
            if (defined(arguments[i])) {
                return arguments[i];
            }
        }
        return null;
    }

    /**
    * 将转义字符替换成html标签
    */
    function replaceToHtmltag(value, bool) {
        if (!value) {
            return "";
        }
        if (!bool || !value.match) {
            return value;
        }
        if (value.match(/\\n/gi)) {
            value = value.replace(/\\n/gi, "<br/>");
        }
        value = value.replace(/\\\^/g, "###sup###");
        var supExp = /\^[\w\W]/g;
        if (value.match(supExp)) {
            value = value.replace(supExp, function (match) {
                return match.replace("^", "<sup>") + "</sup>";
            })
        }
        value = value.replace(/###sup###/g, "^");
        value = value.replace(/\\\_/g, "###sub###");
        var subExp = /\_[\w\W]/g;
        if (value.match(subExp)) {
            value = value.replace(subExp, function (match) {
                return match.replace("_", "<sub>") + "</sub>";
            })
        }
        value = value.replace(/###sub###/g, "_");
        return value;
    }

    /***
    * 将html标签替换成转义字符
    */
    function reverReplaceHtmltag(value) {
        if (!value) {
            return "";
        }
        if (!value.match) {
            return value;
        }
        if (value.match(/<br[\/]*>/gi)) {
            value = value.replace(/<br[\/]*>/gi, "\\n");
        }
        var supExp = /<sup>[\w\W]+<\/sup>/gi;
        if (value.match(supExp)) {
            value = value.replace(supExp, function (match) {
                return match.replace(/<sup>/gi, "^").replace(/<\/sup>/gi, "");
            })
        }
        var subExp = /<sub>[\w\W]+<\/sub>/gi;
        if (value.match(subExp)) {
            value = value.replace(subExp, function (match) {
                return match.replace(/<sub>/gi, "_").replace(/<\/sub>/gi, "");
            })
        }
        return value;
    }

    function showAlert(title, msg, type) {
        if (window.Ext) {
            if (type == "warning") {
                type = Ext.Msg.WARNING;
            }
            else if (type == "error") {
                type = Ext.Msg.ERROR;
            }
            else if (type == "info") {
                type = Ext.Msg.INFO;
            }
            else if (type == "success") {
                type = Ext.Msg.SUCCESS;
            }
            Ext.Msg.show({
                title: title,
                msg: msg,
                buttons: Ext.Msg.OK,
                icon: type
            });
        }
        else if (window.dhtmlx && window.dhtmlx.alert) {
            type = "alert-" + type
            dhtmlx.alert({
                title: title,
                type: "alert-" + type,
                text: msg
            });
        }
        else {
            alert(msg);
        }
    }

    /**  
    * @date 2008-05-24   
    */
    function Map() {
        /** 存放键的数组(遍历用到) */
        this.keys = new Array();
        /** 存放数据 */
        this.data = new Object();

        /**   
         * 放入一个键值对   
         * @param {String} key   
         * @param {Object} value   
         */
        this.put = function (key, value) {
            if (this.data[key] == null) {
                this.keys.push(key);
            }
            this.data[key] = value;
        };

        /**   
         * 获取某键对应的值   
         * @param {String} key   
         * @return {Object} value   
         */
        this.get = function (key) {
            return this.data[key];
        };

        /**   
         * 删除一个键值对   
         * @param {String} key   
         */
        this.remove = function (key) {
            this.keys.remove(key);
            this.data[key] = null;
        };

        /**   
         * 遍历Map,执行处理函数   
         *    
         * @param {Function} 回调函数 function(key,value,index){..}   
         */
        this.each = function (fn) {
            if (typeof fn != 'function') {
                return;
            }
            var len = this.keys.length;
            for (var i = 0; i < len; i++) {
                var k = this.keys[i];
                fn(k, this.data[k], i);
            }
        };

        this.forEach = function (fn) {
            if (typeof fn != 'function') {
                return;
            }
            var len = this.keys.length;
            for (var i = 0; i < len; i++) {
                var k = this.keys[i];
                fn(k, this.data[k], i);
            }
        };
        
        /**   
         * 获取键值数组(类似Java的entrySet())   
         * @return 键值对象{key,value}的数组   
         */
        this.entrys = function () {
            var len = this.keys.length;
            var entrys = new Array(len);
            for (var i = 0; i < len; i++) {
                entrys[i] = {
                    key: this.keys[i],
                    value: this.data[i]
                };
            }
            return entrys;
        };

        /**   
         * 判断Map是否为空   
         */
        this.isEmpty = function () {
            return this.keys.length == 0;
        };

        /**   
         * 获取键值对数量   
         */
        this.size = function () {
            return this.keys.length;
        };

        /**   
         * 重写toString    
         */
        this.toString = function () {
            var s = "{";
            for (var i = 0; i < this.keys.length; i++, s += ',') {
                var k = this.keys[i];
                s += k + "=" + this.data[k];
            }
            s += "}";
            return s;
        };
    };

    //表达式对象
    function RptExpress(hwReport) {
        //属性
        //解析结果
        this.resultMap = new Map();
        this.hwReport = hwReport;
        //方法
        /**
         * 运算方法
         * exp:表达式
         * type：希望返回类型；1:返回运算结果；2:返回中间代码
         *  */
        this.calculate = function (exp, type, contextCell,header) {
            var paramType = this.hwReport.checkParamType(exp);
            if (/error:/.test(paramType)) {
                showAlert("错误！", paramType.replace("error:", ""), "error");
                return;
            }
            switch (paramType) {
                case "constant":
                    return exp;
                case "string":
                    return eval(exp);
                case "reportvar":
                    return this.hwReport.pubvars.get(exp).getValue(contextCell);
                case "vmdvar":
                            try{
                                return new Function("value", window[exp].valueExp + ';\nreturn value')(""); //eval("(function(){" + window[exp].valueExp + "\n})()");
                            } catch (e) {
                                showAlert("变量运算错误！", paramType.replace("error:", ""), "error");
                                return "";
                            }
                case "ds":
                    this.parse(exp);
                    return this.translateDs(exp, type, contextCell,header);
                    break;
                case "cell_approve":
                case "cell_uploader":
                    var params = exp.split(".");
                    var cells = this.hwReport.getCells(params[0], contextCell);
                    return cells && cells.map(function (c) { return c.getValue(params[2]); }).join(",");
                    
                case "cell_combo":
                    var params = exp.split(".");
                    var cells = this.hwReport.getCells(params[0], contextCell);
                    return cells && cells.map(function (c) { return params[1] == "text" ? c.getText() : c.getValue(); }).join(",");
                case "cell":
                    return this.hwReport.getCellValue(exp, contextCell);
                case "undefined":
                    showAlert("错误！", "变量或单元格" + exp + "未定义！", "error");
                    return "";
                default: 
                    var presult = this.parse(exp);
                    //组合表达式
                    if (presult.flag) {
                        var exptype = this.getExpType(exp);
                        if (exptype == "1") {//常规函数表达式
                            //进入常规函数处理
                            return this.translateRou(exp, type, contextCell);
                        } else if (exptype == "10") {//组合表达式
                            //进入组合表达式处理逻辑
                            return this.translateCom(exp, type, contextCell);
                        }
                    }
                    showAlert("错误！", "参数：" + exp + "未定义！", "error");
            }
        }
        /**
         * 解析方法
         * 运算之前先校验,只有校验通过才进行运算否则不进行运算返回错误信息。
         * exp：表达式
         */
        this.parse = function (exp) {
            var expr = this.specialCharacter(exp);
            if (this.resultMap.get(expr)) {//已解析
                return { flag: true }
            } else {
                var result = runC(expr);
                if (result.flag) {
                    this.resultMap.put(exp, result.rlist);
                    return { flag: true }
                } else {
                    //!!!!!!!!!表达式不正确的情况!!!!!!!!!!!
                    return { flag: false, usermsg: result.msg, errormsg: result.originalMsg }
                }
            }


        }
        //转义字符处理
        this.specialCharacter = function (str) {
            str = str.replace(/&lt;/g, "<");
            str = str.replace(/&gt;/g, ">");
            str = str.replace(/&amp;/g, "&");
            str = str.replace(/&apos;/g, "\'");
            str = str.replace(/&quot;/g, "\"");
            return str;
        }
        /**
        * 判断是什么类型的表达式
        * exp：表达式
        * 返回值：
        *   1：常规函数；2：数据集；3：序号；4：条件表达式；5：条件分页表达式；6：片与片之间表达式；
        *   7：纯表达式；8：层次坐标表达式； 10：组合表达式；
        */
        this.getExpType = function (exp) {
            var rlist = this.resultMap.get(exp);
            return rlist[0];

        }
        /**
        * 获取复合表达式变量
        */
        this.getExpVariables = function (exp) {
            var presult = this.parse(exp);
            var varList = [];
            if(!presult || !presult.flag){
                return varList;
            }

            var paramType = this.hwReport.checkParamType(exp);

            switch (paramType) {
                case "constant":
                case "string":
                case "undefined":
                    return varList;
                case "reportvar":
                case "vmdvar":
                case "ds":
                case "cell_approve":
                case "cell_uploader":
                case "cell_combo":
                case "cell":
                    varList.push({
                        type: paramType,
                        name: exp
                    });
                    return varList;
                default:
                    var rlist = this.resultMap.get(exp);
                    var parseList = (rlist && rlist[1]) || [];
                    for(var i = 0; i < parseList.length; i++){
                        paramType = this.hwReport.checkParamType(parseList[i]);
                        if(["reportvar", "vmdvar", "ds", "cell_approve", "cell_uploader", "cell_combo", "cell"].indexOf(paramType) != -1){
                            varList.push({
                                type: paramType,
                                name: parseList[i]
                            });
                        }
                    }
                    return varList;
            }
        }
        /**
         * 数据集表达式处理
         * exp：表达式
         * type: 希望返回类型
         */
        this.translateDs = function (exp, type, contextCell,header) {
            var that = this;
            var dsname = exp.split(".")[0];
            var dstore = this.hwReport.getQueryStoreByName(dsname) || this.hwReport.getStorageStoreByName(dsname);
            if (dstore) {//数据集真实存在
                var rlist = this.resultMap.get(exp);
                if (rlist[2] == "06") {//匹配ds1.jh
                    var field = rlist[3];
                    if (type == "1") {//返回结果
                        return dstore.getValue(field, contextCell);
                    } else if (type == "2") {//返回可执行代码段
                        var result = "" + dstore + ".getValue(" + field + ")";
                        return { flag: true, result: result };
                    }
                    //dstore.get(jh)            
                } else if (rlist[2] == "00") {//匹配ds1.select()
                    //匹配显示值属性，如ds1.select(text,,value==d3&&text=='新区')
                    if (rlist.length == 6) {
                        var condition = rlist[5];
                        if (!condition) {
                            return "";
                        }
                        var findResult = dstore.find(function (item) {
                            var conditions = condition.split("&&").map(function (item) {
                                return item.split("==").map(function (v) { return dhx4.trim(v) })
                            });
                            for (var i = 0; i < conditions.length; i++) {
                                if (conditions[i].length == 2 && item[conditions[i][0]] != that.hwReport.getValue(conditions[i][1], contextCell)) {
                                    return false;
                                }
                            }
                            return true;
                        });

                        return (findResult && findResult[rlist[3]]) || "";
                    }
                        //匹配一般select表达式，如ds1.select(XH)
                    else {
                        return dstore.getValue(rlist[3], contextCell);
                    }
                } else if (rlist[2] == "05") {//匹配ds1.#1
                    return dstore.getValue(field);
                } else if (rlist[2] == "01") {//匹配ds1.group()
                    return dstore.getValue(rlist[3], contextCell,"",header);
                } else if (rlist[2] == "02") {//匹配ds1.sum()
                    return dstore.sum(rlist[3]);
                } else if (rlist[2] == "03") {//匹配ds1.count()
                    return dstore.count(rlist[3]);
                } else if (rlist[2] == "04") {//匹配ds1.avg()
                    return dstore.avg(rlist[3]);
                }
            } else {
                //该数据集不存在，返回错误信息
                //!!!!!!!!!!!!!!!!!!!!!!!!!!
                return { flag: false, usermsg: "该数据集不存在" };
            }
        }
        /**
         * 常规函数表达式处理
         * exp：表达式
         * type: 希望返回类型
         */
        this.translateRou = function (exp, type, contextCell) {
            var rlist = this.resultMap.get(exp);
            if (rlist[1] == "00") {//sum                  

            } else if (rlist[1] == "01") {//count

            } else if (rlist[1] == "02") {//avg

            } else if (rlist[1] == "03") {//nvl

            } else if (rlist[1] == "04") {//dcount

            } else if (rlist[1] == "05") {//compare

            } else if (rlist[1] == "06") {//format

            }
            return { flag: true, result: null };
        }
        /**
         * 条件表达式处理
         * exp：表达式
         * type: 希望返回类型
         */
        this.translateCondition = function (exp, type, contextCell) {
            var rlist = this.resultMap.get(exp);
            if (rlist[1] == "0") {//if(exp1,value1,value2)                 

            } else if (rlist[1] == "1") {//if(){}elseif(){}else{}

            }
            return { flag: true, result: null };
        }
        /**
        * 组合表达式处理
        * exp：表达式
        * type: 希望返回类型
        */
        this.translateCom = function (exp, type, contextCell) {
            var rlist = this.resultMap.get(exp)[1];
            var saveArgs = [];
            var str = "";
            //运算符不做处理
            var operators = ["(", ")", "+", "-", "*", "/"];
            for (var i = 0; i < rlist.length; i++) {
                if (this.notSubExp(rlist[i])) {//非表达式直接输出
                    saveArgs[i] = rlist[i];
                }
                else {//子表达式进行运算
                    var nowresult = this.calculate(rlist[i], 1, contextCell);
                    if (nowresult == "" || isNaN(nowresult)) {
                        nowresult = "'" + nowresult + "'";
                    }
                    saveArgs[i] = nowresult;
                }
            }

            for (var j = 0; j < saveArgs.length; j++) {
                str += saveArgs[j];
            }
            if (type == "1") {//返回结果
                try{
                    return eval(str);
                } catch (e) {
                    showAlert("表达式计算错误！", e.message, "error");
                }
            } else if (type == "2") {//返回代码
                var result = str;
                return { flag: true, result: result };
            }

        }
        /**
        * 判断是否是不需做处理的运算符，数字，字符串
        * subexp：表达式的子项
        */
        this.notSubExp = function (subexp) {
            var operators = ["(", ")", "+", "-", "*", "/"];
            if (operators.indexOf(subexp) != -1) {//运算符
                return true;
            } else if (!isNaN(Number(subexp))) {//数字
                return true;
            } else if (subexp.indexOf("\"") == 0) {//字符串
                return true;
            } else {//子表达式
                return false;
            }
        }
        /**
         * 判断是否是数据集表达式
         * exp：表达式
         * 
         */
        this.isDsOp = function (exp) {
            var presult = this.parse(exp);
            if (presult.flag) {
                var rlist = this.resultMap.get(exp);
                if (rlist[0] == "2") {
                    return { flag: true }
                } else {
                    return { flag: false, usermsg: "非数据集表达式", errormsg: "是正确的表达式，但不是数据集表达式" }
                }
            } else {//表达式错误
                return presult
            }
        }
        /**
        * 判断是否是单元格
        * exp：表达式
        * 
        */
        this.isCellOp = function (exp) {
            var presult = this.parse(exp);
            if (presult.flag) {
                var rlist = this.resultMap.get(exp);
                if (rlist[0] == "2") {
                    return { flag: true }
                } else {
                    return { flag: false, usermsg: "非数据集表达式", errormsg: "是正确的表达式，但不是数据集表达式" }
                }
            } else {//表达式错误
                return presult
            }
        }
        /**
         * 判断是否是分组函数
         * exp：表达式
         * 
         */
        this.isGroupFunc = function (exp) {
            var presult = this.parse(exp);
            if (presult.flag) {
                var rlist = this.resultMap.get(exp);
                if (rlist[0] == "2" && rlist[2] == "01") {//数据集的分组函数group
                    return true;
                } else {
                    return false;
                }
            } else {//表达式错误
                return false
            }
        }
        /**
       * 判断是否是常规函数
       * exp：表达式
       * 
       */
        this.isRoutine = function (exp) {
            var presult = this.parse(exp);
            if (presult.flag) {
                var rlist = this.resultMap.get(exp);
                if (rlist[0] == "1") {//常规函数
                    return true;
                } else {
                    return false;
                }
            } else {//表达式错误
                return false;
            }

        }
        /**
         * 取数据集的名称
         * exp：表达式
         */
        this.getDsName = function (exp) {
            var nameArr = [];
            var presult = this.parse(exp);
            if (presult.flag) {
                var rlist = this.resultMap.get(exp);
                if (rlist[0] == "2") {//数据集函数
                    nameArr.push(exp.split(".")[0]);
                } else if (rlist[0] == "10") {//组合表达式
                    for (var i = 0; i < rlist[1].length; i++) {
                        var subexp = rlist[1][i];
                        if (!this.notSubExp(subexp)) {
                            var ppresult = this.isDsOp(subexp);
                            if (ppresult.flag) {
                                nameArr.push(subexp.split(".")[0]);
                            }
                        }
                    }
                }
                return { flag: true, nameArr: nameArr }
            } else {//表达式错误
                return presult;
            }
        }
        /**
         * 取数据集的字段
         * exp：表达式
         * 
         */
        this.getDsField = function (exp) {
            var fieldArr = [];
            var presult = this.parse(exp);
            if (presult.flag) {
                var rlist = this.resultMap.get(exp);
                if (rlist[0] == "2") {//数据集函数
                    fieldArr.push(rlist[3]);
                } else if (rlist[0] == "10") {//组合表达式
                    for (var i = 0; i < rlist[1].length; i++) {
                        var subexp = rlist[1][i];
                        if (!this.notSubExp(subexp)) {
                            var ppresult = this.isDsOp(subexp);
                            if (ppresult.flag) {
                                var temp = this.resultMap.get(subexp);
                                fieldArr.push(temp[3]);
                            }
                        }
                    }
                }
                return { flag: true, fieldArr: fieldArr };
            } else {//表达式错误
                return presult;
            }
        }
        /**
         * 取数据集的函数名
         * exp：表达式
         * 
         */
        this.getDsFunc = function (exp) {
            var ppresult = this.isDsOp(exp);
            if (ppresult.flag) {
                var rlist = this.resultMap.get(exp);
                var funcName = rlist[2];
                //数据集的函数名获取
                if (funcName == "00") {//select
                    return "select"
                } else if (funcName == "01") {//group
                    return "group"
                } else if (funcName == "02") {//sum
                    return "sum"
                } else if (funcName == "03") {//count 
                    return "count"
                } else if (funcName == "04") {//avg
                    return "avg"
                } else if (funcName == "05" || funcName == "06") {//非函数，为ds.#1形式或ds.字段形式,如ds.#1,返回1
                    return rlist[3];
                }
            } else {
                return ppresult;
            }
        }
        /**
        * 取数据集表达式的参数
        * exp：表达式
        * 
        */
        this.getDsArg = function (exp) {
            var ppresult = this.isDsOp(exp);
            if (ppresult.flag) {
                var rlist = this.resultMap.get(exp);
                if (rlist.length >= 6 && rlist[2] == "00") {
                    var arg = rlist[5];
                    return arg;
                } else {
                    return null;
                }
            } else {
                return ppresult;
            }
        }
    }

    /**
     * 打印对象
     */
    function RptPageSet(hwReport) {
        this.hwReport = hwReport;

        this.repeatHeader = true;//每页重复表头
        this.header = ""; //页眉
        this.footer = "";//  页脚
        this.dpihStandard = 90;//设备的dpi(打印质量)
        this.pageDirection = "v"; //纸张方向 v表示纵向，h表示横向
        this.pageSize = "A4";
        this.position = "";
        this.printOreder = ""; //打印顺序 vth 先纵后横 htv 先横后纵
        this.threshold = 50;
        this.scaleColWidth = false;

        this.columnPerPage = 1; //栏数
        this.columnPadding = 20;

        //页边距
        this.pageMargins = {
            "top": 0,
            "left": 0,
            "right": 0,
            "bottom": 0,
            "header": 0,
            "footer": 0
        };

        //纸张大小映射(以毫米为单位)
        this.mmSize = {
            "A1": "594x841",
            "A2": "420x594",
            "A3": "297x420",
            "A4": "210x297",
            "A5": "148x210",
            "B3": "353x500",
            "B4": "250x353",
            "B5(ISO)": "176x250",
            "B5(JIS)": "182x257"
        }

        //转换尺寸，单位由mm到px
        this.converPixel = function (width, height) {
            var hStandard = this.dpihStandard;
            var wStandard = this.dpihStandard;
            //不包括页边距
            var available_height = height - this.pageMargins.top - this.pageMargins.bottom;
            var available_width = width - this.pageMargins.left - this.pageMargins.right;
            //转换成以像素为单位的
            var realHeight = parseInt(available_height / 25.4 * hStandard);
            var realWidth = parseInt(available_width / 25.4 * wStandard);
            return [realWidth, realHeight];
        }

        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }

        this.setOptions = function (options) {
            this.set("repeatHeader", options.repeatHeader);
            this.set("header", options.header);
            this.set("footer", options.footer);
            this.set("dpihStandard", options.dpihStandard);
            this.set("pageDirection", options.pageDirection);//纸张方向 v表示纵向，h表示横向
            this.set("pageSize", options.pageSize);
            this.set("position", options.position); //打印位置 center居中 left局左 默认与展示的一致
            this.set("scaleColWidth", options.scaleColWidth); //
            this.set("columnPerPage", options.columnPerPage); //每张打印纸上显示的页数

            this.set("columnPadding", options.columnPadding); //每页间隔

            if (options.pageMargins) {
                if(options.pageMargins.top){
                    this.pageMargins.top = options.pageMargins.top;
                }
                if(options.pageMargins.left){
                    this.pageMargins.left = options.pageMargins.left;
                }
                if(options.pageMargins.right){
                    this.pageMargins.right = options.pageMargins.right;
                }
                if(options.pageMargins.bottom){
                    this.pageMargins.bottom = options.pageMargins.bottom;
                }
                if(options.pageMargins.header){
                    this.pageMargins.header = options.pageMargins.header;
                }
                if(options.pageMargins.footer){
                    this.pageMargins.footer = options.pageMargins.footer;
                }
            }
        }

        //获取打印纸张的大小
        this.getDimesions = function () {
            var size = this.mmSize[this.pageSize || "A4"];
            if (!size) {
                return null;
            }
            var sizeArr = size.split("x");
            if (this.pageDirection == "v") {
                return this.converPixel(parseInt(sizeArr[0]), parseInt(sizeArr[1]));
            }
            return this.converPixel(parseInt(sizeArr[1]), parseInt(sizeArr[0]));
        }

        //生成分页
        this.genPages = function (colWidths, rowHeights, title, header, datas) {
            this.pages = {};
            var grid = this.hwReport.grid;

            var _hasTitle = title.length > 0;  //是否有标题
            var _hasHeader = header.length > 0; //是否有表头
            var _headerHeight = rowHeights.slice(0, this.hwReport.headerLength).reduce(function (total, num) { return total + parseInt(num) }, 0);
            
            var titlePages = _hasTitle ? this.genPagesData(colWidths,rowHeights.slice(0, 1), title,0, "title") : null;
            var headerPages = _hasHeader ? this.genPagesData(colWidths, rowHeights.slice(_hasTitle ? 1 : 0, this.hwReport.headerLength), header, 0, "header") : null;
            var dataPages = this.genPagesData(colWidths, rowHeights.slice(this.hwReport.headerLength), datas, _headerHeight, "data");

            return this.genPagesDom(titlePages, headerPages, dataPages);
        }

        /**
        * 生成分页数据
        * flag: title/header/data
        */
        this.genPagesData = function (colWidths, rowHeights, datas, headerHeight, flag) {
            //获取打印纸张的大小
            var dimesion = this.getDimesions();
            var pageWidth = dimesion[0];
            var pageHeight = dimesion[1];

            var pages = {};
            var pageStartRowIndex = 0;
            var curPageRow = 0;
            var curPageCol = 0;
            
            var accumHeight = 0;

            var temp_rspan = [];
            var c_temp_rspan = [];

            var accumPageNum = 0;

            if (this.scaleColWidth) {
                var totalW = colWidths.reduce(function (total, num) { return total + parseInt(num) }, 0);
                
                if (this.columnPerPage > 1) {
                    var pw = (pageWidth - (this.columnPerPage - 1) * this.columnPadding) / this.columnPerPage;
                    colWidths = colWidths.map(function (v) { return Math.floor((v / totalW) * pw) });
                }
                else {
                    colWidths = colWidths.map(function (v) { return Math.floor((v / totalW) * pageWidth) });
                }
            }

            function getCellIndex(td_dom) {
                return pick(td_dom._cellIndexS, td_dom._cellIndex);
            }

            for (var i = 0; i < datas.length; i++) {
                var curPageCol = 0;
                var accumWidth = 0;
                var pageStartColIndex = 0;

                //如果是数据行分页，重复表头时所有打印页高度一样（都是打印高度减去表头高度），不重复表头时，第一页是打印高度减去表头高度，其他页是打印高度
                var actualPageHeight = pageHeight;
                if (flag == "data") {
                    if (this.repeatHeader) {
                        actualPageHeight = pageHeight - headerHeight;
                    }
                    else {
                        if (pageStartRowIndex == 0) {
                            actualPageHeight = pageHeight - headerHeight;
                        }
                    }
                }
                if (rowHeights[i] > (actualPageHeight + pageHeight * accumPageNum - accumHeight + this.threshold)) {
                    accumPageNum += Math.ceil(rowHeights[i] / pageHeight);
                }
                if ((accumHeight + rowHeights[i]) > (actualPageHeight + pageHeight * accumPageNum)) {
                    accumHeight = 0;
                    pageStartRowIndex = i;
                    curPageRow++;
                }

                var lasttd = null;
                var c_cur = 0;
                var max_len = colWidths.length;
                var colspan_ind = 1;
                for (var j = 0; j < max_len; j += colspan_ind) {
                    if (temp_rspan[j]) {
                        temp_rspan[j] = temp_rspan[j] - 1;
                        c_cur++;
                        colspan_ind = 1;
                        continue;
                    }
                    var td = datas[i][j - c_cur];
                    var oCell = this.hwReport.getOriginCellById(td._attrs.sid);
                    var copytd = clone(td)[0];
                    if (copytd.rowSpan > 1) {
                        var tmp_accumHeight = 0;
                        for (var k = 0; k < copytd.rowSpan; k++) {
                            tmp_accumHeight += rowHeights[i + k];
                            if ((accumHeight + tmp_accumHeight) > actualPageHeight) {
                                var rspan_copytd = clone(copytd)[0];
                                rspan_copytd.rowSpan = copytd.rowSpan - k;
                                copytd.rowSpan = k;
                                var insert_ind = 0;
                                for (var m = 0; m < datas[i + k].length; m++) {
                                    if (getCellIndex(datas[i + k][m]) > rspan_copytd._cellIndex) {
                                        break;
                                    }
                                    insert_ind++;
                                }
                                datas[i + k].splice(insert_ind, 0, rspan_copytd);
                                break;
                            }
                        }
                        temp_rspan[j] = copytd.rowSpan - 1;
                        if (copytd.colSpan > 1) {
                            for (var k = 1; k < copytd.colSpan; k++){
                                temp_rspan[j + k] = copytd.rowSpan - 1;
                            }
                        }
                    }

                    var lastEndColIndex = pick(lasttd && (lasttd._cellIndex + lasttd.colSpan), 0);
                    for (var k = lastEndColIndex; k < getCellIndex(td); k++) {
                        if ((accumWidth + colWidths[k]) > pageWidth) {
                            pageStartColIndex = k;
                            curPageCol++;
                            pageColSpan = 1;
                            accumWidth = 0;
                            copytd = clone(copytd)[0];
                        }
                        accumWidth += colWidths[k];
                    }

                    var isFirstCol = false;
                    var posinfo = "";

                    if (flag == "title") {
                        posinfo = "c-top ";
                    }
                    else if (flag == "header" && !this.hwReport.floatTitleContainer && i == 0) {
                        posinfo = "c-top ";
                    }
                    else if (flag == "data") {
                        if (this.hwReport.headerLength > 0) {
                            if (!this.repeatHeader && pageStartRowIndex > 0 && accumHeight == 0 && rowHeights[i] > 0) {
                                posinfo = "c-top ";
                            }
                        }
                        else if (this.hwReport.headerLength == 0 && accumHeight == 0 && rowHeights[i] > 0) {
                            posinfo = "c-top ";
                        }
                    }

                    var pageColSpan = 1;
                    var colSpan = copytd.colSpan;
                    for (var k = 0; k < colSpan; k++) {
                        if ((accumWidth + colWidths[getCellIndex(td) + k]) > pageWidth) {
                            pageStartColIndex = getCellIndex(td) + k;
                            curPageCol++;
                            pageColSpan = 1;
                            accumWidth = 0;
                            copytd = clone(copytd)[0];
                            copytd._cellIndex = getCellIndex(td) + k;
                        }

                        if (accumWidth == 0 && colWidths[getCellIndex(td) + k] > 0) {
                            posinfo += "c-first";
                        }

                        var page = pages[curPageRow + "_" + curPageCol];
                        if (!page) {
                            page = pages[curPageRow + "_" + curPageCol] = new Page(curPageRow, curPageCol, flag);
                        }
                        //当前单元格是否已经放到分页中
                        if (!copytd._hasPaged) {
                            copytd._hasPaged = true;
                            if (oCell) {
                                copytd.style.cssText = oCell.getCSS(null, posinfo);
                            }
                            page.pushCellToRow(i - pageStartRowIndex, copytd);
                        }
                        copytd.colSpan = pageColSpan++;
                        copytd.style.width = colWidths[getCellIndex(td) + k] + "px";
                        page.widths[getCellIndex(td) + k - pageStartColIndex] = colWidths[getCellIndex(td) + k];
                        accumWidth += colWidths[getCellIndex(td) + k];
                    }
                    lasttd = copytd;
                    colspan_ind = colSpan;
                    c_cur += colSpan - 1;
                }
                page.heights[i - pageStartRowIndex] = rowHeights[i];
                accumHeight += rowHeights[i];
            }
            return pages;
        }

        this.genPagesDom = function (titlePages, headerPages, dataPages) {
            var hwReport = this.hwReport;
            var grid = this.hwReport.grid;
            var pages = [];
            for (var key in dataPages) {
                pages.push(dataPages[key]);
            }
            
            var container = document.createElement("DIV");
            container.style.width = "100%";
            var cls = hwReport.vmdreport && hwReport.vmdreport.ownerCt && hwReport.vmdreport.ownerCt.initialConfig.cls;
            container.className = cls || "";

            if (pages.length == 0) {
                for (var key in headerPages) {
                    var pageDom = this.genPageDom(titlePages[key], headerPages[key], null);
                    container.appendChild(pageDom);
                }
                return container;
            }

            var layoutTable;
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                var pageDom;
                if (!this.repeatHeader && page.row > 0) {
                    pageDom = this.genPageDom(null, null, page);
                }
                else {
                    pageDom = this.genPageDom(titlePages && titlePages["0_" + page.col], headerPages && headerPages["0_" + page.col], page);
                }

                if (this.columnPerPage > 1) {
                    if (i % this.columnPerPage == 0) {
                        layoutTable = document.createElement("table");
                        if (i > 0) {
                            layoutTable.style.pageBreakBefore = "always";// | always | avoid | left | right
                        }

                        var tr = document.createElement("tr");
                        layoutTable.appendChild(tr);
                        container.appendChild(layoutTable);
                    }
                    pageDom.style.marginLeft = this.columnPadding + "px";
                    var td = document.createElement("td");
                    td.setAttribute("valign", "top");
                    td.appendChild(pageDom);
                    layoutTable.firstChild.appendChild(td);
                }
                else {
                    container.appendChild(pageDom);
                }
            }
            return container;
        }

        this.genPageDom = function (titlePage, headerPage, dataPage) {
            var hwReport = this.hwReport;
            var grid = this.hwReport.grid;

            var dimesion = this.getDimesions();
            var pageWidth = dimesion[0];

            var template = this.genTemplate();
            if (titlePage) {
                titlePage.appendToTableDom(template.hdr.firstChild, true);
            }
            if (headerPage) {
                headerPage.appendToTableDom(template.hdr.firstChild, true);
            }
            if (dataPage) {
                dataPage.appendToTableDom(template.obj.firstChild);
            }
            var w = (dataPage || headerPage || titlePage).getWidth();
            template.entBox.style.width = w + "px";

            var position = this.position || hwReport.align;
            if ((position == "center" || !position) && (w / pageWidth) > 0.7) {
                template.entBox.style.margin = "0 auto";
            }
            return template.entBox;
        }

        this.genTemplate = function () {
            var hwReport = this.hwReport;
            var grid = this.hwReport.grid;

            var entBox = document.createElement("DIV");
            entBox.style.border = "0px solid rgb(199, 199, 199)";
            entBox.style.pageBreakAfter = "always";
            entBox.className = " gridbox gridbox_" + grid.skin_name + (dhx4.isIE ? " isIE" : " isModern");

            var t_creator = function (name) {
                var t = document.createElement("TABLE");
                t.cellSpacing = t.cellPadding = 0;
                t.style.cssText = 'width:100%;table-layout:fixed;';
                t.className = name.substr(2);
                return t;
            }

            var obj = t_creator("c_obj");
            obj.appendChild(document.createElement("TBODY"));
            if (grid.multiLine != true)
                obj.className += " row20px";

            var hdr = t_creator("c_hdr");
            hdr.appendChild(document.createElement("TBODY"));

            var objBox = document.createElement("DIV");
            objBox.style.width = "100%";
            objBox.style.overflow = "hidden";
            objBox.appendChild(obj);
            objBox.className = "objbox";

            var hdrBox = document.createElement("DIV");
            hdrBox.style.width = "100%"
            hdrBox.style.overflow = "hidden";
            hdrBox.style.borderBottom = "0px solid #ffffff";
            hdrBox.className = "xhdr";

            hdrBox.appendChild(hdr);
            hdrBox.style.position = "relative";

            if (grid.noHeader) {
                hdrBox.style.display = 'none';
            }

            entBox.appendChild(hdrBox);
            entBox.appendChild(objBox);

            return {
                entBox: entBox,
                obj: obj,
                objBox: objBox,
                hdr: hdr,
                hdrBox: hdrBox
            };
        }

        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }
        /**
        * 通过json初始化页面对象
        */
        this.parse = function (pagejson, enattr) {
            this.set("pageMargins", pagejson[getAttrName("pagemargin", enattr)]);
            if (pagejson.pageproperty) {
                if (pagejson.pageproperty.pagedirection == "0") {
                    this.pageDirection = "h";
                }
                if (pagejson.pageproperty.type) {
                    this.pageSize = pagejson.pageproperty.type;
                }
                if (pagejson.pageproperty.printquality && !isNaN(parseInt(pagejson.pageproperty.printquality))) {
                    //this.dpihStandard = parseInt(pagejson.pageproperty.printquality);
                }
            }
        }

        function Page(row, col, type) {
            this.row = row;
            this.col = col;
            this.widths = [];
            this.heights = [];
            this.rows = [];
            this.type = type; //标题 表头或数据

            this.getWidth = function () {
                return this.widths.reduce(function (total, num) { return total + parseInt(num) }, 0);
            }

            this.pushCellToRow = function (rowIndex, cell) {
                this.rows[rowIndex] = this.rows[rowIndex] || [];
                this.rows[rowIndex].push(cell);
            }

            this.appendToTableDom = function (tbody, isClone) {
                if (tbody.children.length == 0) {
                    var tr = document.createElement("TR");
                    for (var i = 0; i < this.widths.length; i++) {
                        var th = document.createElement("TH");
                        th.style.width = this.widths[i] + "px";
                        th.style.height = "0px";
                        tr.appendChild(th);
                    }
                    tbody.appendChild(tr);
                }
                var copyRowIndex = 0;
                for (var i = 0; i < this.rows.length; i++) {
                    var tr = document.createElement("TR");
                    tr.style.height = this.heights[i] + "px";
                    if (this.type == "data") {
                        if (i % 2 == 0) {
                            tr.className = "ev_material"
                        }
                        else {
                            tr.className = "odd_material"
                        }
                    }
                    if (!this.rows[i]) {
                        for (var j = 0; j < this.rows[copyRowIndex].length; j++) {
                            var cloneTD = clone(this.rows[copyRowIndex][j])[0];
                            cloneTD.className = cloneTD.className.replace(/c-first/g, "");

                            cloneTD.innerHTML = "&nbsp;";
                            cloneTD.rowSpan = 1;
                            tr.appendChild(cloneTD);
                        }
                    }
                    else {
                        for (var j = 0; j < this.rows[i].length; j++) {
                            tr.appendChild(isClone ? clone(this.rows[i][j])[0] : this.rows[i][j]);
                        }
                        copyRowIndex = i;
                    }
                    tbody.appendChild(tr);
                }
            }
        }
    }

    /*
     说明：字体信息类
     */
    function RptFont() {
        this.fontFamily = "宋体";
        this.fontSize = "12px";
        this.fontWeight = "normal";//粗体
        this.fontStyle = "normal";//倾斜
        this.textDecoration = "none";//下划线
        this.color = "#000000";
        //字体信息中倾斜属性的转换
        this.italicMap = {
            "0": "normal",
            "1": "italic"
        }
        //字体信息中下划线属性的转换
        this.underLineMap = {
            "0": "none",
            "1": "underline"
        }
        //字体信息中的粗体属性的转换
        this.weightMap = {
            "0": "normal",
            "1": "bold",
            "400": "normal",
            "700": "bold"
        }
        /**
         * 设置属性的值
         * @param {String} key
         * @return {Object} value
         */
        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }

        /**
         * 通过json初始化字体对象
         */
        this.parse = function (fontjson, enattr) {
            this.set("fontFamily", fontjson[getAttrName("name", enattr)]);
            this.set("fontSize", fontjson.size ? (fontjson[getAttrName("size", enattr)] + "px") : "");
            this.set("fontWeight", this.weightMap[fontjson[getAttrName("weight", enattr)]]);
            this.set("fontStyle", this.italicMap[fontjson[getAttrName("italic", enattr)]]);
            this.set("textDecoration", this.underLineMap[fontjson[getAttrName("unline", enattr)]]);
            this.set("color", fontjson[getAttrName("color", enattr)]);
        }

        this.getCSS = function (classStyle) {
            var styleCss = ";";
            if (this.fontFamily) {
                styleCss += "font-family:" + this.fontFamily + (classStyle ? " !important;" : ";");
            }
            if (this.fontSize) {
                styleCss += "font-size:" + this.fontSize + (classStyle ? " !important;" : ";");
            }
            if (this.fontWeight) {
                styleCss += "font-weight:" + this.fontWeight + (classStyle ? " !important;" : ";");
            }
            if (this.fontStyle) {
                styleCss += "font-style:" + this.fontStyle + (classStyle ? " !important;" : ";");
            }
            if (this.textDecoration) {
                styleCss += "text-decoration:" + this.textDecoration + (classStyle ? " !important;" : ";");
            }
            if (this.color) {
                styleCss += "color:" + this.color + (classStyle ? " !important;" : ";");
            }
            return styleCss;
        }

        this.getJSON = function () {
            var fontJson = {};
            fontJson[getAttrName("fontFamily")] = this.fontFamily;
            fontJson[getAttrName("fontSize")] = this.fontSize;
            fontJson[getAttrName("fontWeight")] = this.fontWeight;
            fontJson[getAttrName("fontStyle")] = this.fontStyle;
            fontJson[getAttrName("textDecoration")] = this.textDecoration;
            fontJson[getAttrName("color")] = this.color;

            return fontJson;
        }
    }

    /**
    * 说明：边框信息类
    */
    function RptBorder() {
        this.isNoBorder = false;

        this.borderTop = "1px rgb(255,255,255) solid";
        this.borderRight = "1px rgb(255,255,255) solid";
        this.boderBottom = "1px rgb(255,255,255) solid";
        this.borderLeft = "1px rgb(255,255,255) solid";

        this.borderTopWidth = "1px";
        this.borderRightWidth = "1px";
        this.borderBottomWidth = "1px";
        this.borderLeftWidth = "1px";

        this.borderTopColor = "rgb(255,255,255)";
        this.borderRightColor = "rgb(255,255,255)";
        this.borderBottomColor = "rgb(255,255,255)";
        this.borderLeftColor = "rgb(255,255,255)";

        this.borderTopStyle = "solid";
        this.borderRightStyle = "solid";
        this.borderBottomStyle = "solid";
        this.borderLeftStyle = "solid";

        //线型属性的转换
        this.styleMap = {
            "0": "solid",
            "1": "dashed",// 短划线
            "2": "dotted",//点线
            "3": "dashDot",//点划线
            "4": "dashDotDot",//双点划线
            "5": "Custom",//自定义
            "6": "SlantDashDot",//斜点划线
            "7": "double",//双实线
            "8": "none"
        }

        /**
         * 设置属性的值
         * @param {String} key
         * @return {Object} value
         */
        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }
        /**
         * 通过json初始化字体对象
         */
        this.parse = function (json, enattr) {
            var that = this;
            function convert(borderStr) {
                if (!borderStr) {
                    return null;
                }
                var borderWidth = borderStr.substring(0, borderStr.indexOf(","));
                var borderColor = borderStr.substring(borderStr.indexOf(",") + 1, borderStr.lastIndexOf(","));
                var borderStyle = borderStr.substring(borderStr.lastIndexOf(",") + 1, borderStr.length);
                return [borderWidth + "px ", borderColor, that.styleMap[borderStyle]];
            }

            var borderTop = convert(json[getAttrName("top", enattr)]) || [];
            var borderRight = convert(json[getAttrName("right", enattr)]) || [];
            var boderBottom = convert(json[getAttrName("bottom", enattr)]) || [];
            var borderLeft = convert(json[getAttrName("left", enattr)]) || [];

            this.set("borderTop", borderTop.join(" "));
            this.set("borderRight", borderRight.join(" "));
            this.set("boderBottom", boderBottom.join(" "));
            this.set("borderLeft", borderLeft.join(" "));

            this.set("borderTopWidth", borderTop[0]);
            this.set("borderRightWidth", borderRight[0]);
            this.set("borderBottomWidth", boderBottom[0]);
            this.set("borderLeftWidth", borderLeft[0]);

            this.set("borderTopColor", borderTop[1]);
            this.set("borderRightColor", borderRight[1]);
            this.set("borderBottomColor", boderBottom[1]);
            this.set("borderLeftColor", borderLeft[1]);

            this.set("borderTopStyle", borderTop[2]);
            this.set("borderRightStyle", borderRight[2]);
            this.set("borderBottomStyle", boderBottom[2]);
            this.set("borderLeftStyle", borderLeft[2]);
        }

        this.setNoBorder = function (bool) {
            this.isNoBorder = dhx4.s2b(bool);
        }

        this.getWidths = function () {
            return [this.borderTopWidth, this.borderRightWidth, this.borderBottomWidth, this.borderLeftWidth];
        }

        this.getBottomWidth = function () {
            return parseInt(this.borderTopWidth);
        }

        this.getCSS = function (borderShow, classStyle) {
            if (this.isNoBorder) {
                return "border:none";
            }
            var styleCss = ";";
            styleCss += "border-top:" + (borderShow[0] ? this.borderTop : "none") + (classStyle ? " !important;" : ";");
            styleCss += "border-right:" + (borderShow[1] ? this.borderRight : "none") + (classStyle ? " !important;" : ";");
            styleCss += "border-bottom:" + (borderShow[2] ? this.boderBottom : "none") + (classStyle ? " !important;" : ";");
            styleCss += "border-left:" + (borderShow[3] ? this.borderLeft : "none") + (classStyle ? " !important;" : ";");
            return styleCss;
        }
        this.getJSON = function () {
            var boderJson = {};
            boderJson[getAttrName("borderTop")] = this.borderTop;
            boderJson[getAttrName("borderRight")] = this.borderRight;
            boderJson[getAttrName("boderBottom")] = this.boderBottom;
            boderJson[getAttrName("borderLeft")] = this.borderLeft;
            boderJson[getAttrName("borderTopWidth")] = this.borderTopWidth;
            boderJson[getAttrName("borderRightWidth")] = this.borderRightWidth;
            boderJson[getAttrName("borderBottomWidth")] = this.borderBottomWidth;
            boderJson[getAttrName("borderLeftWidth")] = this.borderLeftWidth;
            boderJson[getAttrName("borderTopColor")] = this.borderTopColor;
            boderJson[getAttrName("borderRightColor")] = this.borderRightColor;
            boderJson[getAttrName("borderBottomColor")] = this.borderBottomColor;
            boderJson[getAttrName("borderLeftColor")] = this.borderLeftColor;
            boderJson[getAttrName("borderTopStyle")] = this.borderTopStyle;
            boderJson[getAttrName("borderRightStyle")] = this.borderRightStyle;
            boderJson[getAttrName("borderBottomStyle")] = this.borderBottomStyle;
            boderJson[getAttrName("borderLeftStyle")] = this.borderLeftStyle;
            return boderJson;
        }
    }

    /**
     * 说明：对齐属性类
     */
    function RptAlign() {
        this.textAlign = "center";// 水平对齐
        this.verticalAlign = "middle";// 垂直对齐
        this.textControl = "0";// 文本控制
        this.escapelabel = "0";// 转义标签
        this.txtDirection = "1";// 文本方向
        this.rotation = "0";// 旋转度
        this.singleRotation = false;// 单字旋转
        this.cellMerge = "0";// 合并单元格
        this.padding = "0px 4px";
        this.rowSpace = "1";// 行间距
        this.autoenter = "1";// 自动换行

        this.paddingTop = 0;
        this.paddingRight = 4;
        this.paddingBottom = 0;
        this.paddingLeft = 4;

        /**
         * 设置属性的值
         * @param {String} key
         * @return {Object} value
         */
        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }
        /**
         * 通过json初始化字体对象
         */
        this.parse = function (alignjson, enattr) {
            this.set("textAlign", alignjson[getAttrName("halign", enattr)]);
            this.set("verticalAlign", alignjson[getAttrName("valign", enattr)]);
            this.set("escapelabel", alignjson[getAttrName("escapelabel", enattr)]);
            this.set("autoenter", alignjson[getAttrName("autoenter", enattr)]);

            if (alignjson[getAttrName("padding", enattr)] && dhx4.trim(alignjson[getAttrName("padding", enattr)])) {
                var paddings = alignjson[getAttrName("padding", enattr)].split(" ");
                if (paddings.length == 1) {
                    //兼容padding都为0时
                    if (paddings[0] == 0) {
                        this.set("paddingTop", 0);
                        this.set("paddingRight", 4);
                        this.set("paddingBottom", 0);
                        this.set("paddingLeft", 4);
                    }
                    else {
                        this.set("paddingTop", parseInt(paddings[0]));
                        this.set("paddingRight", parseInt(paddings[0]));
                        this.set("paddingBottom", parseInt(paddings[0]));
                        this.set("paddingLeft", parseInt(paddings[0]));
                    }
                }
                else if (paddings.length == 2) {
                    //兼容padding都为0时
                    if (paddings[0] == 0 && paddings[1] == 0) {
                        this.set("paddingTop", 0);
                        this.set("paddingRight", 4);
                        this.set("paddingBottom", 0);
                        this.set("paddingLeft", 4);
                    }
                    else {
                        this.set("paddingTop", parseInt(paddings[0]));
                        this.set("paddingRight", parseInt(paddings[1]));
                        this.set("paddingBottom", parseInt(paddings[0]));
                        this.set("paddingLeft", parseInt(paddings[1]));
                    }
                }
                else if (paddings.length == 4) {
                    //兼容padding都为0时
                    if (paddings[0] == 0 && paddings[1] == 0 && paddings[2] == 0 && paddings[3] == 0) {
                        this.set("paddingTop", 0);
                        this.set("paddingRight", 4);
                        this.set("paddingBottom", 0);
                        this.set("paddingLeft", 4);
                    }
                    else {
                        this.set("paddingTop", parseInt(paddings[0]));
                        this.set("paddingRight", parseInt(paddings[1]));
                        this.set("paddingBottom", parseInt(paddings[2]));
                        this.set("paddingLeft", parseInt(paddings[3]));
                    }
                }
                this.set("padding", this.paddingTop + "px " + this.paddingRight + "px " + this.paddingBottom + "px " + this.paddingLeft + "px");
            }
        }

        this.getPadding = function () {
            return [this.paddingTop, this.paddingRight, this.paddingBottom, this.paddingLeft];
        }

        this.getTextAlign = function () {
            return this.textAlign;
        }

        this.getCSS = function (classStyle) {
            var styleCss = ";";
            if (this.textAlign) {
                styleCss += "text-align:" + this.textAlign + (classStyle ? " !important;" : ";");
            }
            if (this.verticalAlign) {
                styleCss += "vertical-align:" + this.verticalAlign + (classStyle ? " !important;" : ";");
            }
            if (this.autoenter == "1") {
                styleCss += "white-space:normal;word-break: break-word;" + (classStyle ? " !important;" : ";");
            }
            else {
                styleCss += "white-space:nowrap;";
            }
            styleCss += "padding:" + this.padding + (classStyle ? " !important;" : ";");
            return styleCss;
        }
        this.getJSON = function () {
            var alignJson = {};
            alignJson[getAttrName("textAlign")] = this.textAlign;
            alignJson[getAttrName("verticalAlign")] = this.verticalAlign;
            alignJson[getAttrName("textControl")] = this.textControl;
            alignJson[getAttrName("escapelabel")] = this.escapelabel;
            alignJson[getAttrName("txtDirection")] = this.txtDirection;
            alignJson[getAttrName("rotation")] = this.rotation;
            alignJson[getAttrName("singleRotation")] = this.singleRotation;
            alignJson[getAttrName("cellMerge")] = this.cellMerge;
            alignJson[getAttrName("padding")] = this.padding;
            alignJson[getAttrName("rowSpace")] = this.rowSpace;
            alignJson[getAttrName("paddingTop")] = this.paddingTop;
            alignJson[getAttrName("paddingRight")] = this.paddingRight;
            alignJson[getAttrName("paddingBottom")] = this.paddingBottom;
            alignJson[getAttrName("paddingLeft")] = this.paddingLeft;
            return alignJson;
        }
    }

    /**
    * 说明：数字格式类
    */
    function RptNumber() {
        this.type = "";
        this.percent = "0";
        this.decimal = "-1";
        this.thousand = "";
        this.negative = "";
        this.currency = "";
        this.zerovisible = "";
        this.dateformat = "";
        this.timeformat = "";
        this.numbering = "0";
        this.particular = "";
        this.url = "";
        this.leftmenu = "";

        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }

        this.parse = function (numberjson, enattr) {
            this.set("type", numberjson[getAttrName("type", enattr)]);
            if (this.type == "5") {
                this.percent = "1";
            }
            this.set("decimal", numberjson[getAttrName("decimal", enattr)]);
            this.set("thousand", numberjson[getAttrName("thousand", enattr)]);
            this.set("negative", numberjson[getAttrName("negative", enattr)]);
            this.set("currency", numberjson[getAttrName("currency", enattr)]);
            this.set("zerovisible", numberjson[getAttrName("zerovisible", enattr)]);
            this.set("dateformat", numberjson[getAttrName("dateformat", enattr)]);
            this.set("timeformat", numberjson[getAttrName("timeformat", enattr)]);
            this.set("numbering", numberjson[getAttrName("numbering", enattr)]);
            this.set("particular", numberjson[getAttrName("particular", enattr)]);
            this.set("url", numberjson[getAttrName("url", enattr)]);
            this.set("leftmenu", numberjson[getAttrName("leftmenu", enattr)]);
        }

        this.getJSON = function (ignores, enattr) {
            var numberjson = {};
            if (!(ignores && ignores.indexOf("decimal") != -1) && this.decimal != "-1") {
                numberjson[getAttrName("decimal", enattr)] = this.decimal;
            };
            if (!(ignores && ignores.indexOf("percent") != -1) && this.percent != "0") {
                numberjson[getAttrName("percent", enattr)] = this.percent;
            };
            if (!(ignores && ignores.indexOf("numbering") != -1) && this.numbering != "0") {
                numberjson[getAttrName("order", enattr)] = this.numbering;
            };
            if (!(ignores && ignores.indexOf("zerovisible") != -1) && this.zerovisible != "0") {
                numberjson[getAttrName("zerovisible", enattr)] = this.zerovisible;
            };
            
            return numberjson;
        }
    }

    /*
    * 说明：右键菜单信息
     */
    function RptMenu() {
        this.id = ""; // 菜单id
        this.param = ""; //菜单参数
        this.dsname = ""; // 数据集
        this.sets = ""; // 数据集或数据
        this.text = "";  // 显示字段、显示文本
        this.pid = ""; // 父字段、父节点
        this.source = ""; //0 自定义 1 数据集

        /**
         * 设置属性的值
         * @param {String} key
         * @return {Object} value
         */
        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }
        /**
         * 通过json初始化菜单对象
         */
        this.parse = function (json, enattr) {
            //this.set("dsname", json[getAttrName("sets", enattr)]);
            this.set("sets", json[getAttrName("sets", enattr)]);
            this.set("id", json[getAttrName("id", enattr)]);
            this.set("param", json[getAttrName("param", enattr)]);
            this.set("text", json[getAttrName("text", enattr)]);
            this.set("pid", json[getAttrName("pid", enattr)]);
            this.set("source", json[getAttrName("source", enattr)]);
        }
    }

    /*
     * 说明：事件信息
     */
    function RptEvent() {
        this.click = ""; // 单击
        this.rightClick = ""; //右键点击
        this.itemClick = ""; //右键菜单
        

        /**
         * 设置属性的值
         * @param {String} key
         * @return {Object} value
         */
        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }
        /**
         * 通过json初始化菜单对象
         */
        this.parse = function (json, enattr) {
            this.set("click", json[getAttrName("click", enattr)]);
            this.set("beforeClick", json[getAttrName("beforeClick", enattr)]);//点击前  oncelledit 前事件
            this.set("change", json[getAttrName("change", enattr)]);
            this.set("doubleClick", json[getAttrName("doubleClick", enattr)]);
            this.set("beforeLoad", json[getAttrName("beforeLoad", enattr)]);
            this.set("afterLoad", json[getAttrName("afterLoad", enattr)]);
            this.set("rightClick", json[getAttrName("rightClick", enattr)]);
            this.set("approval", json[getAttrName("approval", enattr)]);
            this.set("itemClick", json[getAttrName("itemClick", enattr)]);
        }
    }

    function RptCellType(hwReport) {
        this.hwReport = hwReport;
        this.type = "ro";
        this.seperator = ",";

        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }

        this.validateMap = {
            "Length": "ValidLength",
            "Mail": "ValidEmail",
            "Identification": "ValidIdCard",
            "Postalcode": "ValidPostCode",
            "Telephone": "ValidTelePhone",
            "Mobilephone": "ValidCellPhone",
            "ValidRegExp": "ValidRegExp"
        };

        /**
        * 通过json初始化类型对象
        */
        this.parse = function (celltypejson, enattr) {
            this.set("fillrule", this.validateMap[celltypejson[getAttrName("fillrule", enattr)]]);
            this.set("isallownull", celltypejson[getAttrName("isallownull", enattr)] != false);
            this.set("emptydisplay", celltypejson[getAttrName("emptydisplay", enattr)]);
            if (this.fillrule == "ValidLength") {
                this.set("fillRuleEx", (celltypejson[getAttrName("minlen", enattr)] || 0) + "," + (celltypejson[getAttrName("maxlen", enattr)] || 0));
            }
            else if (this.fillrule == "ValidRegExp") {
                this.set("fillRuleEx", (celltypejson[getAttrName("charexp", enattr)]));
            }

            this.set("isenableedit", celltypejson[getAttrName("isenableedit", enattr)]);
            this.set("ismultiline", celltypejson[getAttrName("ismultiline", enattr)]); //文本多行
            this.set("isprint", celltypejson[getAttrName("isprint", enattr)]);
            this.set("multiline", celltypejson[getAttrName("multiline", enattr)]);
            this.set("url", celltypejson[getAttrName("url", enattr)]);
            this.set("isallselect", celltypejson[getAttrName("isallselect", enattr)]);
            
            this.set("subrptindex", celltypejson[getAttrName("subrptindex", enattr)]);
            this.set("subrptname", celltypejson[getAttrName("subrptname", enattr)]);
            this.set("subrptpath", celltypejson[getAttrName("subrptpath", enattr)]);
            this.set("subrptshowmode", celltypejson[getAttrName("subrptshowmode", enattr)]);
            this.set("subrpttype", celltypejson[getAttrName("subrpttype", enattr)]);
            this.set("spread", celltypejson[getAttrName("spread", enattr)]);

            //数字
            this.set("isdecimal", celltypejson[getAttrName("isdecimal", enattr)]);
            this.set("decimalnumbers", celltypejson[getAttrName("decimalnumbers", enattr)]);
            this.set("nullShowZero", celltypejson[getAttrName("nullShowZero", enattr)]);
            this.set("isnegative", celltypejson[getAttrName("isnegative", enattr)]);
            this.set("maxvalue", celltypejson[getAttrName("maxvalue", enattr)]);
            this.set("minvalue", celltypejson[getAttrName("minvalue", enattr)]);
            
            //下拉框
            this.set("ismulti", window.dhx4.s2b(celltypejson[getAttrName("ismulti", enattr)]));
            this.set("seperator", { semicolon: ";", comma: ",", number: "、" }[celltypejson[getAttrName("separator", enattr)]]||celltypejson[getAttrName("separator", enattr)]);
            this.set("noValueClear", celltypejson[getAttrName("noValueClear", enattr)]);
            this.set("showFirstTerm", celltypejson[getAttrName("showFirstTerm", enattr)]);
            this.set("percentWidth", (parseInt(celltypejson[getAttrName("width", enattr)]) || 100) / 100);
            this.set("height", celltypejson[getAttrName("height", enattr)] && parseInt(celltypejson[getAttrName("height", enattr)]));
            
            this.set("selectableType", celltypejson[getAttrName("selectableType", enattr)]);
            
            //日期
            this.set("isdefultdate", celltypejson[getAttrName("isdefultdate", enattr)]);
            this.set("format", celltypejson[getAttrName("format", enattr)]);

            //按钮
            this.set("bottontype", celltypejson[getAttrName("bottontype", enattr)]);
            this.set("status", celltypejson[getAttrName("status", enattr)]);
            this.set("insertrowtype", celltypejson[getAttrName("insertrowtype", enattr)]);
            this.set("carrycol", celltypejson[getAttrName("carrycol", enattr)]);
            this.set("ispopup", celltypejson[getAttrName("ispopup", enattr)]);
            this.set("text", celltypejson[getAttrName("text", enattr)]);
            this.set("labelpos", celltypejson[getAttrName("labelposition", enattr)]);
            this.set("allowalert", celltypejson[getAttrName("allowalert", enattr)]);
            this.set("lastdeleteonlydata", celltypejson[getAttrName("lastdeleteonlydata", enattr)]);
            this.set("delstore", celltypejson[getAttrName("delstore", enattr)]);

            //审批组件
            this.set("items", celltypejson[getAttrName("Items", enattr)]);
            this.set("bindsource", celltypejson[getAttrName("bindsource", enattr)]);

            //上传组件
            this.set("filetype", celltypejson[getAttrName("filetype", enattr)]);
            this.set("enableadd", celltypejson[getAttrName("enableadd", enattr)]);
            this.set("enabledelete", celltypejson[getAttrName("enabledelete", enattr)]);
            this.set("showmode", celltypejson[getAttrName("showmode", enattr)]);
            this.set("upmaxnum", celltypejson[getAttrName("uploadnumer", enattr)]);
            this.set("pageexp", celltypejson[getAttrName("pageexp", enattr)]);
            this.set("colexp", celltypejson[getAttrName("colexp", enattr)]);
            this.set("wordMode", celltypejson[getAttrName("wordMode", enattr)]);
            this.set("add", celltypejson[getAttrName("add", enattr)]);
            this.set("delete", celltypejson[getAttrName("delete", enattr)]);

            var type = celltypejson[getAttrName("type", enattr)];
            if (type == "CheckBoxGroup" && !celltypejson[getAttrName("multigroup", enattr)]) {
                type = "vmdch";
            }
            if (type == "RadioGroup" && !(celltypejson.bindsource && celltypejson.bindsource.tablename)) {
                type = "ra";
            }
            //else if (type == "Combox" && this.bindsource && this.bindsource.multicolumns && this.bindsource.multicolumns.length > 0) {
            //    type = "vmdgrid";
            //}
            this.set("type", type);
            this.set("displayLabel", celltypejson[getAttrName("displayLabel", enattr)]);
            if (type == "CheckBoxGroup") {
                this.set("mode", "checkbox");
            }
            else if (type == "RadioGroup") {
                this.set("mode", "radio");
            }
        }

        this.getType = function () {
            var map = {
                "HyperLink": "vmdlink", //超链接
                "Text": "vmded", //文本
                "vmdch": "vmdch", //复选框
                "ra": "ra", //单选框
                "Number": "vmdnum", //数字
                "order": "vmdorder",
                "PassWord": "vmdpassw",
                "cntr": "cntr",
                "Date": "vmdlaydate", //"vmdCalendarA",
                "Combox": "vmdcombo",
                "vmdgrid": "vmdgrid",
                "dropdowntree": "vmdtree",
                "RadioGroup": "vmdcheckbox",
                "CheckBoxGroup": "vmdcheckbox",
                "guid": "vmdguid",
                "SubRpt": "vmdsubreport",
                "Button": "vmdbutton",
                "Approval": "vmdapprove",
                "UpLoad": "vmdupload", //上传组件
                "RichEdit": "vmdeditor"
            }
            return map[this.type] || "ro";
        }

        this.init = function (grid) {
            if (this.getType() == "vmdcombo") {
                this.combo = eXcell_vmdcombo.prototype.init.call({ grid: grid, cellType: this }, this);
                var rptStore = this.bindsource && this.bindsource.tablename && hwReport.getQueryStoreByName(this.bindsource.tablename);
                if (rptStore && rptStore.dhtmlxDatastore) {
                    this.combo.sync(rptStore.dhtmlxDatastore, {
                        text: this.bindsource.showcolumn.toLowerCase(),
                        value: this.bindsource.valuecolumn.toLowerCase()
                    });
                    this.combo.rptStore = rptStore;
                }
                return this.combo;
            }
            else if (this.getType() == "vmdtree") {
                this.tree = eXcell_vmdtree.prototype.init.call({ grid: grid, cellType: this }, this);
                this.tree._selectableType = this.selectableType;

                var rptStore = this.bindsource && this.bindsource.tablename && hwReport.getQueryStoreByName(this.bindsource.tablename);
                if (rptStore && rptStore.dhtmlxDatastore) {
                    this.tree.sync(rptStore.dhtmlxDatastore, {
                        id: this.bindsource.nodecolumn.toLowerCase(),
                        pId: this.bindsource.parentcolumn.toLowerCase(),
                        text: this.bindsource.showcolumn.toLowerCase(),
                        value: this.bindsource.valuecolumn.toLowerCase()
                    });
                    this.tree.rptStore = rptStore;
                }
                return this.tree;
            }
            else if (this.getType() == "vmdgrid") {
                this.grid = eXcell_vmdgrid.prototype.init.call({ grid: grid, cellType: this }, this);
                var rptStore = this.bindsource && this.bindsource.tablename && hwReport.getQueryStoreByName(this.bindsource.tablename);
                if (rptStore && rptStore.dhtmlxDatastore) {
                    var headers = [];
                    var widths = [];
                    var types = [];
                    var ids = [];
                    var aligns = [];
                    if (this.ismulti) {
                        rptStore.dhtmlxDatastore.data.scheme({
                            $init:function(obj){ 
                              //  debugger
                                obj.chkid = undefined;
                            }
                        });
                        headers.push("");
                        widths.push(40);
                        types.push("ch");
                        ids.unshift("chkid");
                        aligns.push("center");
                       
                        this.grid.enableMultiselect(true);
                    }
                    if (!this.bindsource.multicolumns || this.bindsource.multicolumns.length == 0) {
                        var vmdStore = window[rptStore.factName];
                        if (!vmdStore) {
                            showAlert("错误！", "数据集" + rptStore.factName + "未定义！", "error");
                            hwReport.vmdreport.myMask.hide();
                            return;
                        };
                        
                        this.bindsource.multicolumns = vmdStore.getFields().map(function (v) {
                            return {
                                showtext: v.cname,
                                colname: v.name,
                                width: 120
                            };
                        });
                    }

                    for (var i = 0; i < this.bindsource.multicolumns.length; i++) {
                        var column = this.bindsource.multicolumns[i];
                        if (!column.colname) {
                            continue;
                        }
                        headers.push(column.showtext || column.colname || "");
                        if (this.bindsource.multicolumns.length == 1) {
                            widths.push("*");
                        }
                        else {
                            widths.push(column.width);
                        }
                        types.push("ro");
                        ids.push(column.colname.toLowerCase());
                        aligns.push("left");
                    }
                    
                    this.grid.setHeader(headers.join(","));
                    this.grid.setInitWidths(widths.join(","));
                    this.grid.setColAlign(aligns.join(","));
                    this.grid.setColTypes(types.join(","));
                    this.grid.setColumnIds(ids.join(","));
                    this.grid.enableSmartRendering(true);

                    this.grid.init();
                    this.grid.sync(rptStore.dhtmlxDatastore, {
                        text: this.bindsource.showcolumn.toLowerCase(),
                        value: this.bindsource.valuecolumn.toLowerCase()
                    });
                    this.grid.entBox.style.width = widths.reduce(function (total, num) { return total + parseInt(num) }, 0) + "px";
                    this.grid.entBox.style.height = (this.height || 250) + "px";

                    this.grid.rptStore = rptStore;
                }
                return this.grid;
            }
            return null;
        }
    }

    /**
     * 说明:单元格信息类
     */
    function RptCell(rptRow, index) {
        this.rptRow = rptRow;
        this.rowIndex = rptRow.rowIndex;
        this.hwReport = rptRow.hwReport;
        this.id = rptRow.rowIndex + "_" + index;
        this.index = index;
        this.isFirstRow = false; //是否是第一行
        this.isFirstCol = false;//是否是第一列
        this.isLastCol = false;//是否是最后一列

        this.dsName = ""; //单元格绑定的显示数据集
        this.dsField = ""; //单元格绑定的数据集字段
        this.dsArg = "";//单元格绑定的参数值

        this.menuId = "";//菜单
        this.eventId = "";//事件
        this.align = "";                           //对齐方式id
        this.backgroundColor = "";       //背景色
        this.border = "";                       //边框id
        this.colspan = "";                     //合并列
        this.rowspan = "";                  //合并行
        this.expand = "";                     //扩展 1横向 2纵向 0不扩展
        this.font = "";                          //字体id
        this.forecolor = "";                   //前景色
        this.hparent = "";                     //左父
        this.hparentRowIndex = "";      //左父行号
        this.hparentCellIndex = "";      //左父列号
        this.vparent = "";                     //上父
        this.vparentRowIndex = "";      //上父行号
        this.vparentCellIndex = "";      //上父列号
        this.leftmargin = "";                 //左边距
        this.merge = "";                    //合并属性 0 不合并 1合并其他单元格 2被合并
        this.mergedrow;
        this.mergedcol;
        this.data = "";                         //显示值
        this.datavalue = "";                 //表达式值
        this.showvalue = "";
        this.fillcelltype = "";                        //类型
        this.number = "";                 //小数位
        this.lineHeight = "";

        this.bgcolorexp = "";             //背景色表达式
        this.enableexp = "";              //是否禁用表达式
        this.fontsexp = "";                //字体表达式
        this.colorexp = "";  //前景色表达式
        this.heightexp = "";             //高度表达式
        this.widthexp = "";              //宽度表达式
        this.expressArr = [];              //表达式组
        this.fields = [];

        this.bottomMerged = ""; //同值向下合并
        this.btmmergeconditionexp = ""; //合并依赖

        this.rightMerged = ""; //同值向右合并
        this.rgtmergeconditionexp = ""; //合并依赖

        this.childs = []; //用于存储由这个单元格扩展出来的dom单元格对象（td对象）

        /**
         * 设置属性的值
         * @param {String} key
         * @return {Object} value
         */
        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }
        /**
         * 通过json初始化字体对象
         * enattr : 启用简写
         */
        this.parse = function (celljson, enattr) {
            this.set("align", celljson[getAttrName("align", enattr)]);
            this.set("font", celljson[getAttrName("fonts", enattr)]);
            this.set("border", celljson[getAttrName("borders", enattr)]);
            this.set("number", celljson[getAttrName("number", enattr)]);
            this.set("merge", celljson[getAttrName("merged", enattr)]); //0 没合并其他单元格也没被其他单元格合并，1 合并其他单元格 2被其他单元格合并
            this.set("colspan", celljson[getAttrName("colspan", enattr)]);
            this.set("rowspan", celljson[getAttrName("rowspan", enattr)]);
            this.set("lineHeight", celljson[getAttrName("line_height", enattr)]);
            this.set("data", celljson[getAttrName("data", enattr)]);
            this.set("datavalue", celljson[getAttrName("datavalue", enattr)] && celljson[getAttrName("datavalue", enattr)].replace(/^=/, ""));
            this.set("showvalue", celljson[getAttrName("showvalue", enattr)] && celljson[getAttrName("showvalue", enattr)].replace(/^=/, ""));
            this.set("fillcelltype", celljson[getAttrName("fillcelltype", enattr)]);

            this.set("bottomMerged", celljson[getAttrName("bottomMerged", enattr)]);
            this.set("btmmergeconditionexp", celljson[getAttrName("btmmergeconditionexp", enattr)]);
            this.set("rightMerged", celljson[getAttrName("rightMerged", enattr)]);
            this.set("rgtmergeconditionexp", celljson[getAttrName("rgtmergeconditionexp", enattr)]);

            this.set("menuId", celljson[getAttrName("menus", enattr)]);
            this.set("eventId", celljson[getAttrName("event", enattr)]);
            this.set("expand", celljson[getAttrName("expand", enattr)]);
            this.set("hparent", celljson[getAttrName("hparent", enattr)]);
            var rowCols = convertToRowCol(celljson[getAttrName("hparent", enattr)]);
            if (rowCols && rowCols.row != -1 && rowCols.col != -1) {
                this.set("hparentRowIndex", rowCols.row);
                this.set("hparentCellIndex", rowCols.col);
            }
            this.set("vparent", celljson[getAttrName("vparent", enattr)]);
            rowCols = convertToRowCol(celljson[getAttrName("vparent", enattr)]);
            if (rowCols && rowCols.row != -1 && rowCols.col != -1) {
                this.set("vparentRowIndex", rowCols.row);
                this.set("vparentCellIndex", rowCols.col);
            }
            this.set("forecolor", celljson[getAttrName("forecolor", enattr)]);
            this.set("backgroundColor", celljson[getAttrName("backgroundcolor", enattr)]);
            this.set("heightexp", celljson[getAttrName("heightexp", enattr)]);
            this.set("enableexp", celljson[getAttrName("enableexp", enattr)]);
            this.set("widthexp", celljson[getAttrName("widthexp", enattr)]);
            this.set("fontsexp", celljson[getAttrName("fontsexp", enattr)]);
            this.set("bgcolorexp", celljson[getAttrName("bgcolorexp", enattr)]);
            this.set("colorexp", celljson[getAttrName("forecolorexp", enattr)]);
        }

        this.setIsFirstRowCell = function (bool) {
            this.isFirstRow = !!bool; //是否是第一行
        }

        this.setIsHeaderCell = function (bool) {
            this.isHeader = !!bool;
        }

        this.setIsTitleCell = function (bool) {
            this.isTitle = !!bool;
        }

        this.getBorder = function () {
            return this.hwReport.borders.get(this.border);
        }

        /**
        * 获取边框宽度
        */
        this.getBorderBottomWidth = function () {
            var boderBottomWidth = 1;
            var border = this.hwReport.borders.get(this.border);
            if (border) {
                boderBottomWidth = border.getBottomWidth();
            }
            return boderBottomWidth;
        }

        /**
       * 获取单元格padding
       */
        this.getPadding = function () {
            var align = this.hwReport.aligns.get(this.align);
            if (align) {
                return align.getPadding();
            }
            return [0, 4, 0, 4];
        }

        /**
        * 获取单元格类型
        */
        this.getType = function () {
            var typeObj = this.hwReport.cellTypes.get(this.fillcelltype);
            return typeObj ? typeObj.getType() : "ro";
        }

        /**
        * 获取单元格是否可编辑
        */
        this.getIsDisabled = function () {
            var typeObj = this.fillcelltype && this.hwReport.cellTypes.get(this.fillcelltype);
            if (!typeObj) {
                return false;
            }
            return defined(typeObj.isenableedit) ? !typeObj.isenableedit : false;
        }

        /**
        * 获取单元格文本对齐方式
        */
        this.getTextAlign = function () {
            var align = this.hwReport.aligns.get(this.align);
            if (align) {
                return align.getTextAlign();
            }
            return "center";
        }

        //是否是分组表达式
        this.isGroupFunc = function () {
            if (!this.datavalue) {
                return false;
            }
            var exp = this.datavalue;
            var resu = this.hwReport.rptExpress.isGroupFunc(exp);
            return resu;
        }
        //是不是常规表达式
        this.isRoutine = function () {
            if (!this.datavalue) {
                return false;
            }
            var exp = this.datavalue;
            var resu = this.hwReport.rptExpress.isRoutine(exp);
            return resu;
        }

        /**
        * postion：单元格所处位置，第一列、第一行等
        */
        this.getCSS = function (ignores, postion) {
            if (!this.hwReport.inlineStyle) {
                return "";
            }
            var styleCss = "";
            //不忽略boder样式 
            if (!(ignores && ignores.indexOf("border") != -1)) {
                var border = this.hwReport.borders.get(this.border);
                if (border && postion && postion.indexOf("c-top") != -1 && postion.indexOf("c-first") != -1) {
                    styleCss += border.getCSS([1, 1, 1, 1], false);
                }
                else if (border && postion && postion.indexOf("c-top") != -1) {
                    styleCss += border.getCSS([1, 1, 1, 0], false);
                }
                else if (border && postion && postion.indexOf("c-first") != -1) {
                    styleCss += border.getCSS([0, 1, 1, 1], false);
                }
                else if (border) {
                    styleCss += border.getCSS([0, 1, 1, 0], false);
                }
            }
            //不忽略font样式
            if (!(ignores && ignores.indexOf("font") != -1)) {
                var font = this.hwReport.fonts.get(this.font);
                styleCss += font ? font.getCSS(false) : "";
            }
            //不忽略align样式
            if (!(ignores && ignores.indexOf("align") != -1)) {
                var align = this.hwReport.aligns.get(this.align);
                styleCss += align ? align.getCSS(false) : "";
            }
            if (this.backgroundColor && !(ignores && ignores.indexOf("backgroundColor") != -1)) {
                styleCss += "background-color:" + this.backgroundColor + ";";
            }
            //不忽略lineheight样式
            //为什么在this.lineHeight=1时不设置此属性？因为！！！如果字体设置为微软雅黑，会出现字体裁剪的问题；
            if (!(ignores && ignores.indexOf("lineHeight") != -1) && this.lineHeight != "") {
                //if (this.lineHeight) {
                styleCss += "line-height:" + this.lineHeight + ";";
                //}
                //else {
                //    styleCss += "line-height:1;";
                //}
            }
            if (!(ignores && ignores.indexOf("width") != -1)) {
                styleCss += "width:" + this.rptRow.colWidth[this.index] + "px;";
                if (parseInt(this.rptRow.colWidth[this.index]) === 0) {
                    styleCss += "white-space: nowrap;";
                }
            }

            if (!(ignores && ignores.indexOf("height") != -1)) {
                var padding = this.getPadding();
                var height = this.rptRow.height - this.getBorderBottomWidth() - padding[0] - padding[2];
                styleCss += "height:" + height + "px;";
                if (!this.rptRow.height) {
                    styleCss += "display:none;"
                }
            }
            styleCss = styleCss.replace(/;;/g, ";");

            return styleCss;
        }

        this.getWidth = function () {
            if(this.hwReport.colWidths.length>this.hwReport.oldColWidths.length){
                 return defined(this.hwReport.oldColWidths[this.index]) ? this.hwReport.oldColWidths[this.index] : 80;
            }
           else{
            return defined(this.hwReport.colWidths[this.index]) ? this.hwReport.colWidths[this.index] : 80;
           }
        }

        /**
        * ignores:忽略的属性列表
        */
        this.getClassName = function (ignores) {
            var classname = this.getType();
            if (this.isTitle) {
                classname += " rpt-title";
            }
            else if (this.isHeader) {
                classname += " rpt-header";
            }
            else {
                classname += " rpt-data";
            }
            if (this.align && !(ignores && ignores.indexOf("align") != -1)) {
                classname += " " + this.hwReport.reportId + "-a-" + this.align;
            }
            if (this.border && !(ignores && ignores.indexOf("border") != -1)) {
                classname += " " + this.hwReport.reportId + "-b-" + this.border;
            }
            if (this.font && !(ignores && ignores.indexOf("font") != -1)) {
                classname += " " + this.hwReport.reportId + "-f-" + this.font;
            }
            if (this.isFirstRow && !(ignores && ignores.indexOf("firstRow") != -1)) {
                classname += " c-top";
            }
            if (this.isFirstCol && !(ignores && ignores.indexOf("firstCol") != -1)) {
                classname += " c-first";
            }
            if (this.isLastCol && !(ignores && ignores.indexOf("lastCol") != -1)) {
                classname += " c-last";
            }

            var align = this.hwReport.aligns.get(this.align);
            if (align && align.autoenter == "1") {
                classname += " auto-wrap";
            }
            
            return classname;
        }
        //!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i!i
        this.getJSON = function (ignores, enattr) {
            var propsIgnores = ignores;
            var celljson = {};
            if (!(propsIgnores && propsIgnores.indexOf("fillcelltype") != -1)) {
                celljson[getAttrName("fillcelltype", enattr)] = this.fillcelltype;
            };
            if (!(propsIgnores && propsIgnores.indexOf("data") != -1)) {
                celljson[getAttrName("data", enattr)] = this.data;
            };
            if (!(propsIgnores && propsIgnores.indexOf("datavalue") != -1) && this.datavalue) {
                celljson[getAttrName("datavalue", enattr)] = this.datavalue;
            };
            if (!(propsIgnores && propsIgnores.indexOf("showvalue") != -1) && this.showvalue) {
                celljson[getAttrName("showvalue", enattr)] = this.showvalue;
            };
            if (!(propsIgnores && propsIgnores.indexOf("merge") != -1) && this.merge) {
                celljson[getAttrName("merge", enattr)] = this.merge + "";
            };
            if (this.mergedcol && !(propsIgnores && propsIgnores.indexOf("mergedcol") != -1)) {
                celljson[getAttrName("mergedcol", enattr)] = this.mergedcol;
            };
            if (this.mergedrow && !(propsIgnores && propsIgnores.indexOf("mergedrow") != -1)) {
                celljson[getAttrName("mergedrow", enattr)] = this.mergedrow;
            };
            if (!(propsIgnores && propsIgnores.indexOf("colspan") != -1) && this.colspan > 1) {
                celljson[getAttrName("colspan", enattr)] = this.colspan + "";
            };
            if (!(propsIgnores && propsIgnores.indexOf("rowspan") != -1) && this.rowspan > 1) {
                celljson[getAttrName("rowspan", enattr)] = this.rowspan + "";
            };
            if (!(propsIgnores && propsIgnores.indexOf("number") != -1) && defined(this.number)) {
                celljson[getAttrName("number", enattr)] = this.number + "";
            };

            if (!(propsIgnores && propsIgnores.indexOf("expand") != -1) && this.expand) {
                celljson[getAttrName("expand", enattr)] = this.expand;
            };
            if (!(propsIgnores && propsIgnores.indexOf("sid") != -1)) {
                celljson[getAttrName("sid", enattr)] = this.id;
            };
            if (!(propsIgnores && propsIgnores.indexOf("style") != -1)) {
                celljson[getAttrName("style", enattr)] = this.getCSS(ignores && ignores.style);
            };
            if (!(propsIgnores && propsIgnores.indexOf("class") != -1)) {
                celljson[getAttrName("class", enattr)] = this.getClassName(ignores && ignores['class']);
            };

            if (!(propsIgnores && propsIgnores.indexOf("forecolor") != -1) && this.forecolor) {
                celljson[getAttrName("forecolor", enattr)] = this.forecolor;
            };
            if (!(propsIgnores && propsIgnores.indexOf("heightexp") != -1) && this.heightexp) {
                celljson[getAttrName("heightexp", enattr)] = this.heightexp;
            };
            if (!(propsIgnores && propsIgnores.indexOf("enableexp") != -1) && this.enableexp) {
                celljson[getAttrName("enableexp", enattr)] = this.enableexp;
            };
            if (!(propsIgnores && propsIgnores.indexOf("widthexp") != -1) && this.widthexp) {
                celljson[getAttrName("widthexp", enattr)] = this.widthexp;
            };
            if (!(propsIgnores && propsIgnores.indexOf("fontsexp") != -1) && this.fontsexp) {
                celljson[getAttrName("fontsexp", enattr)] = this.fontsexp;
            };
            if (!(propsIgnores && propsIgnores.indexOf("bgcolorexp") != -1) && this.bgcolorexp) {
                celljson[getAttrName("bgcolorexp", enattr)] = this.bgcolorexp;
            };
            if (!(propsIgnores && propsIgnores.indexOf("colorexp") != -1) && this.colorexp) {
                celljson[getAttrName("colorexp", enattr)] = this.colorexp;
            };

            if (!isEmpty(this.hparentRowIndex) && !isEmpty(this.hparentCellIndex) && !(propsIgnores && propsIgnores.indexOf("hparent") != -1)) {
                celljson[getAttrName("hparent", enattr)] = this.hparentRowIndex + "," + this.hparentCellIndex;
            }
            if (!isEmpty(this.vparentRowIndex) && !isEmpty(this.vparentCellIndex) && !(propsIgnores && propsIgnores.indexOf("vparent") != -1)) {
                celljson[getAttrName("vparent", enattr)] = this.vparentRowIndex + "," + this.vparentCellIndex;
            }
            return celljson;
        }
    }

    /**
     * 说明：行信息
     */
    function RptRow(section, index, width) {
        this.section = section;
        this.hwReport = section.hwReport;
        this._seed = this.hwReport._seed;
        this.id = this._seed + index;
        this.rowIndex = index;
        this.isFirstRow = false; //是否是第一行，判断规则：分片的起始行是1，第一个高度不为0的行
        this.sectionStartCol = 1; //所属片的起始列，用于判断单元格是否是第一列
        this.height = "";//行高
        this.cells = []; //单元格信息列表
        this.colWidth = width;

        /**
         * 设置属性的值
         * @param {String} key
         * @return {Object} value
         */
        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }

        this.parse = function (rowjson, enattr) {
            for (var i = 0; i < rowjson.cells.length; i++) {
                var c = new RptCell(this, i + (this.sectionStartCol - 1));
                c.parse(rowjson.cells[i], enattr);
                this.cells.push(c);
            }
        }

        this.getCellNums = function () {
            return this.cells.length;
        }

        this.setIsFirstRow = function (bool) {
            this.isFirstRow = defined(bool) ? !!bool : true;
        }

        this.setIsHeader = function (bool) {
            this.isHeader = defined(bool) ? !!bool : true;
        }

        this.setIsTitle = function (bool) {
            this.isTitle = defined(bool) ? !!bool : true;
        }

        this.getJSON = function (ignores, enattr) {
            var cells = [];
            cells.id = this.id;
            for (var i = 0; i < this.cells.length; i++) {
                cells.push(this.cells[i].getJSON(ignores, enattr));
            }
            return cells;
        }
    }


    /**
     * 说明：分片
     */
    function RptSection(report) {
        this.hwReport = report;
        this._seed = report._seed;

        this.startRow = "";  //起始行
        this.endRow = "";  //结束行
        this.startCol = "";   //起始列
        this.endCol = "";    //终止列
        this.name = "";      //分片名称
        this.patchRow = "";//空白行补齐
        this.patchCol = ""; //空白列补齐
        this.version = "";   //控件版本
        this.colWidths = [];
        this.serverRequestCompleted = true;
        this.serverRequestSuccess = true;

        this.headerLength = 0;

        this.originalMatrix = new RptMatrix(report); //原始矩阵
        this.resultMatrix = new RptMatrix(report); //数据矩阵

        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        };

        this.parse = function (sectionjson) {
            this.set("name", sectionjson.name);
            this.set("startRow", parseInt(sectionjson.startrow || 1));
            this.set("endRow", parseInt(sectionjson.endrow || this.hwReport.rowNum));
            this.set("startCol", parseInt(sectionjson.startcol || 1));
            this.set("endCol", parseInt(sectionjson.endcol || this.hwReport.colNum));
            this.set("patchRow", sectionjson.patchrow);
            this.set("patchCol", sectionjson.patchcol);
            this.set("version", sectionjson.visions);

            //处理列宽，从整个报表的列宽数组中取出startCol到endCol的部分
            for (var i = this.startCol - 1; i < this.endCol; i++) {
                this.colWidths[i - this.startCol + 1] = this.hwReport.colWidths[i];
            }

            if (sectionjson.title) {
                for (var i = 0; i < sectionjson.title.length; i++) {
                    var rowjson = sectionjson.title[i];
                    var row = new RptRow(this, i + (this.startRow - 1), this.colWidths);
                    row.height = defined(rowjson.height) ? parseInt(rowjson.height || 0) : 32;
                    row.sectionStartCol = this.startCol;

                    if (this.startRow == 1) {
                        row.setIsTitle();
                        report.titleRow = this.startCol == 1 ? row : null;
                    }
                    row.parse(rowjson);
                    this.headerLength++;
                    this.originalMatrix.addRow(row);
                    this.resultMatrix.addRow(row.getJSON(['class', 'style']));
                }
            }

            if (sectionjson.header) {
                for (var i = 0; i < sectionjson.header.length; i++) {
                    var row = new RptRow(this, i + sectionjson.title.length + (this.startRow - 1), this.colWidths);
                    var rowjson = sectionjson.header[i];
                    row.height = defined(rowjson.height) ? parseInt(rowjson.height || 0) : 32;
                    row.sectionStartCol = this.startCol;

                    if (this.startRow == 1) {
                        row.setIsHeader();
                    }
                    row.parse(rowjson);
                    this.headerLength++;
                    this.originalMatrix.addRow(row);
                    this.resultMatrix.addRow(row.getJSON(['class', 'style']));
                }
            }
            
            if (sectionjson.data) {
                for (var i = 0; i < sectionjson.data.length; i++) {
                    var row = new RptRow(this, i + (sectionjson.title ? sectionjson.title.length : 0) + (sectionjson.header ? sectionjson.header.length : 0) + (this.startRow - 1), this.colWidths);
                    var rowjson = sectionjson.data[i];
                    row.height = defined(rowjson.height) ? parseInt(rowjson.height || 0) : 32;
                    row.sectionStartCol = this.startCol;
                    row.parse(rowjson);

                    this.originalMatrix.addRow(row);
                    this.resultMatrix.addRow(row.getJSON(['class', 'style']));
                }
            }
            
            if (this.startRow == 1) {
                report.headerLength = this.headerLength;
            }
        };

        /*
        * 根据指定的行列号获取原始单元格
        */
        this.getOriginCell = function (rowIndex, cellIndex) {
            return this.originalMatrix.rows[rowIndex] && this.originalMatrix.rows[rowIndex].cells[cellIndex];
        }

        //如果是被合并的单元格，向上或向左查找其合并的单元格
        this.findMergingOriginalCell = function (rowIndex, cellIndex, rowInc, colInc) {
            var rows = this.originalMatrix.rows;
            if (rowIndex < 0 || rowIndex >= rows.length || cellIndex < 0) {
                return null;
            }
            var tmpRowCells = rows[rowIndex].cells;
            var cell = tmpRowCells[cellIndex];
            if (!cell) return null;
            if (cell.merge != 2) return cell;
            return this.findMergingOriginalCell(rowIndex + rowInc, cellIndex + colInc, rowInc, colInc);
        }

        /**
        * 获取扩展的左父或上父信息
        * pcell:要获取的单元格指向的原始单元格
        * parent:获取左父还是上父，hparent获取左父，vparent获取上父
        */
        this.getExpandParent = function (pcell, parent) {
            var that = this;
            if (!pcell) return null;

            //获取左父
            if (parent == "hparent") {
                if (!isEmpty(pcell.hparentRowIndex) && !isEmpty(pcell.hparentCellIndex)) {
                    var hParentOCell = this.getOriginCell(pcell.hparentRowIndex - this.startRow + 1, pcell.hparentCellIndex - this.startCol + 1);
                    if (hParentOCell && hParentOCell.expand == "2") {
                        return hParentOCell;
                    }
                    return this.getExpandParent(hParentOCell, parent);
                }
                return null;
            }
                //获取上父
            else {

                if (!isEmpty(pcell.vparentRowIndex) && !isEmpty(pcell.vparentCellIndex)) {
                    var vParentOCell = this.getOriginCell(pcell.vparentRowIndex - this.startRow + 1, pcell.vparentCellIndex - this.startCol + 1);
                    if (vParentOCell && vParentOCell.expand == "1") {
                        return vParentOCell;
                    }
                    return this.getExpandParent(vParentOCell, parent);
                }
                return null;
            }
        }

        /**
        * 清除结果矩阵数据
        */
        this.clearResultMatrix = function () {
            //如果是第一片并且不是横向扩展的，清空除表头的元素
            if (this.startRow == 1 && (!this.hwReport.expandType || this.hwReport.expandType == "v")) {
                this.resultMatrix.rows = this.resultMatrix.rows.slice(0, this.headerLength);
            }
            else {
                this.resultMatrix.rows = [];
            }
        }

        /*
        * 获取哪几个单元格是分组函数
        */
        this.getGroupCols = function () {
            var cells = this.hwReport.expressCell.group;
            var cols = [];
            for (var i = 0; i < cells.length; i++) {
                cols.push(cells[i].id);
            }
            return cols;
        }
        /*
        * 获取几行需要重新计算
        * array:分组函数所在单元格
        */
        this.getRecalcRows = function (array) {
            var groupCols = array;//分组函数所在单元格
            var count = [];
            var depend = new Map();
            var routeCells = this.hwReport.expressCell.route;//常规函数所在的单元格
            this.hparents = {};
            for (var i = 0; i < groupCols.length; i++) {
                depend.put(groupCols[i], []);
            }
            for (var j = 0; j < routeCells.length; j++) {
                var route = routeCells[j];
                var originCell = route;
                var i = route.id.split("_")[0];//该单元格在模板矩阵中的行号
                if (count.indexOf(i) < 0) {//
                    count.push(i);
                    //查找它的左父(包括直接左父和间接左父)
                    var that = this;
                    //直接左父相关的
                    var directhparent = that.getExpandParent(originCell, 'hparent');//直接左父
                    if (!directhparent) {
                        continue;
                    }
                    if (depend.data[directhparent.id] && depend.data[directhparent.id].indexOf(i) < 0) {//未分析该行
                        depend.data[directhparent.id].push(i);//该行依赖于该直接左父
                    }
                    //间接左父
                    var hparents = recordParent(originCell, [], that);//包括直接左父和间接左父
                    this.hparents[i] = [];
                    for (var m = 0; m < hparents.length; m++) {
                        var colIndex = hparents[m].id;//直接或间接左父的id
                        this.hparents[i].push(colIndex);
                        if (depend.data[colIndex] && depend.data[colIndex].length > 0) {//左父为分组函数且该行未分析
                            for (var n = 0; n < depend.data[colIndex].length; n++) {
                                if (depend.data[directhparent.id].indexOf(depend.data[colIndex][n]) < 0) {
                                    depend.data[directhparent.id].push(depend.data[colIndex][n]);
                                }
                            }
                        }
                    }
                }
            }
            //递归的找单元格相关的左父,返回相关联的左父
            function recordParent(originCell, arr, that) {
                var hparent = that.getExpandParent(originCell, 'hparent');
                arr.push(hparent);
                if (!that.getExpandParent(hparent, 'hparent')) {
                    return arr
                } else {
                    return recordParent(hparent, arr, that)
                }
            }
            var countLen = count.length;
            // 返回的是有哪几行(模板中)是需要重新计算的，依赖每个分组函数的行
            return { countLen: countLen, depend: depend, count: count }
        }
        /*
        * 异步数据加载,分组情况，最后一组

        */
        /**
         * 异步数据加载返回最后一组信息
         * cells：含有分组函数的单元格
         * ignore：需要重新计算的相关行
         * 
         *  */
        this.getLastGroup = function (cells, ignore) {
            var useMatrix = this.resultMatrix;
            var toCompare = cells;
            var lastGroup = [];
            var changeRows = new Array(toCompare.length);
            for (var i = 0; i < toCompare.length; i++) {
                var originalCell = toCompare[i];//含分组函数的单元格
                for (var j = useMatrix.rows.length - 1; j >= 0; j--) {//结果矩阵从后往前遍历
                    var cell = null;
                    for (var m = 0; m < useMatrix.rows[j].length; m++) {
                        var mainCell = this.findCell(j, m);
                        if (mainCell.sid == originalCell) {//属于该分组函数的单元格
                            if (changeRows.indexOf(j) < 0) {
                                changeRows[i] = this.mainCellIndex;
                            }
                            cell = mainCell;
                            break;
                        }
                    }
                    if (cell) {
                        lastGroup.push(cell);//该单元格属于最后一组
                        break;
                    }
                }
                /*  var cell=this.findCell(rowindex,colindex);
                 lastGroup.push(cell); */
            }
            this.changeFrom = changeRows;//resultMatrix需要改变的行下标
            return lastGroup;
        }
        /*
        * 根据行列获取主单元格
        */
        this.findCell = function (row, col) {
            var useMatrix = this.resultMatrix;
            //确保在矩阵范围内
            if (row < 0 || (row >= useMatrix.rows.length)) {
                return null;
            }
            var cell = useMatrix.rows[row][col];
            if (!cell) {//该单元格不存在
                return null;
            }
            if (cell.sid /*&& cell.data*/) {//该单元格是所有合并单元格的主单元格
                //记录当前行号
                this.mainCellIndex = row;
                return cell;
            }
            else {//继续找主单元格
                return this.findCell(row - 1, col);
            }
        }
        /*
        * 返回第一组的信息
         * data：返回数据
         * cols：含分组函数的单元格
         * 
         */
        this.getFirstGroup = function (data, cols) {
            var firstGroup = [];
            var toCompare = cols;
            var maxrows = [];
            function findMainCell(row, col) {
                //确保范围在数据数组内
                if (row < 0 || (row >= data.length)) {
                    return null;
                }
                var cell = data[row][col];
                if (!cell) {//该单元格不存在
                    return null;
                }
                if (cell.sid && cell.data) {//该单元格是所有合并单元格的主单元格
                    return cell;
                }
                else {//继续找主单元格
                    return findMainCell(row - 1, col);
                }
            }
            for (var i = 0; i < toCompare.length; i++) {
                var originalCell = toCompare[i];//含分组函数的单元格
                for (var j = 0; j < data.length; j++) {//返回数据从前往后遍历
                    var cell = null;
                    for (var m = 0; m < data[j].length; m++) {
                        var mainCell = findMainCell(j, m);
                        if (mainCell && mainCell.sid == originalCell) {//属于该分组函数的单元格
                            cell = mainCell;
                            break;
                        }
                    }
                    if (cell) {
                        firstGroup.push(cell);
                        maxrows.push(cell.rowspan);
                        break;
                    }
                }
            }
            var maxR = Math.max.apply(null, maxrows);
            return { firstGroup: firstGroup, maxR: maxR };
        }
        /*
        * 异步数据加载，合并
         data 请求返回数据
         firstGroupLen 第一个组别的行数
         ignore 可能需要计算的行
         uniteCols 合并的列数
         array 含有分组函数的单元格
         lastRow 最后一组信息所在单元格
        */
        this.uniteGroup = function (data, firstGroupLen, ignore, uniteCols, array, lastRow) {
            //返回数据中的第一组的数据
            var sameGroup = data.slice(0, firstGroupLen);//返回数据中的第一组的数据
            //非首组数据
            var differentG = data.slice(firstGroupLen);
            //取出矩阵中最后一组
            var changeFrom0 = Math.min.apply(null, this.changeFrom);
            var lastgroup = this.resultMatrix.rows.slice(changeFrom0);
            //新的矩阵
            this.resultMatrix.rows = this.resultMatrix.rows.slice(0, changeFrom0);
            //需要重新计算的行（记录的是模板中的行号）
            var recalcRows = [];
            //根据uniteCols确定有几列需要合并，该列有几个相关的需要重新计算的行
            for (var i = 0; i < uniteCols; i++) {//遍历所有的和并列
                var cell = array[i];
                var cellDepend = ignore.depend.get(cell);
                for (var j = 0; j < cellDepend.length; j++) {//与该列有关的行
                    if (recalcRows.indexOf(cellDepend[j]) < 0) {//去重
                        recalcRows.push(cellDepend[j]);
                    }
                }
            }
            //计算需要重新计算的行
            //计算返回数据中首组的计算行（顺序遍历）
            var waitCal = findRecalcRows(sameGroup, recalcRows, 1);
            //矩阵中最后一组的计算行（倒序遍历）
            var waitToCal = findRecalcRows(lastgroup, recalcRows, 0);
            //重新计算
            var recalRows = this.reCalc(waitCal.rows, waitToCal.rows);
            //重新组织矩阵
            if (waitCal.position.indexOf(0) >= 0) {//重新计算行在上
                //整理矩阵中最后一组数据,替换重新计算行
                for (var i = 0; i < waitToCal.position.length; i++) {
                    var rowindex = waitToCal.position[i];
                    var row = recalRows[i];
                    lastgroup[rowindex] = row;
                }
                //整理矩阵中最后一组数据，修改rowspan
                for (var i = 0; i < waitToCal.position.length; i++) {//需要重新计算的行位置
                    var rowindex = waitToCal.position[i];
                    var row = lastgroup[rowindex];//需要重新计算的行
                    var hparents = this.hparents[getOriginIndex(row)];
                    if (hparents) {//该行所有相关左父
                        for (var j = 0; j < lastRow.length; j++) {//最后一组的信息
                            if (this.containsInArr(hparents, lastRow[j].sid)) {
                                lastRow[j].rowspan = lastRow[j].rowspan > 1 ? lastRow[j].rowspan - 1 : 0;
                            }
                        }

                    }
                }

                var groupdata = lastgroup.concat(sameGroup.slice(waitCal.position.length));
                // var groupdata=sameGroup.slice(waitCal.position.length).concat(lastgroup.slice(waitCal.position.length));
                var completeGroup = groupdata;
            } else {//重新计算行在下              
                //整理首组数据
                for (var i = 0; i < waitCal.position.length; i++) {
                    var rowindex = waitCal.position[i];
                    var row = recalRows[i];
                    sameGroup[rowindex] = row;
                }
                //整理矩阵中最后一组数据
                for (var i = 0; i < waitToCal.position.length; i++) {//需要重新计算的行位置
                    var rowindex = waitToCal.position[i];
                    var row = lastgroup[rowindex];//需要重新计算的行
                    var hparents = this.hparents[getOriginIndex(row)];
                    if (hparents) {//该行所有相关左父
                        for (var j = 0; j < lastRow.length; j++) {//最后一组的信息
                            if (this.containsInArr(hparents, lastRow[j].sid)) {
                                lastRow[j].rowspan = lastRow[j].rowspan > 1 ? lastRow[j].rowspan - 1 : 0;
                            }
                        }

                    }
                }
                var groupdata = lastgroup.slice(0, lastgroup.length - waitCal.position.length);
                var completeGroup = groupdata.concat(sameGroup);
            }
            //加入结果矩阵
            this.resultMatrix.rows = this.resultMatrix.rows.concat(completeGroup).concat(differentG);//其他的加入结果矩阵
            //对应的报表对象从第几行进行修改
            //            this.hwReport.changeFrom=this.changeFrom[uniteCols-1];
            this.hwReport.changeFrom = Math.min.apply(null, this.changeFrom.filter(function (v) { return defined(v) }));
            //新的显示矩阵
            //this.hwReport.matrix.rows=this.hwReport.matrix.rows.slice(0,this.hwReport.changeFrom).concat(completeGroup).concat(differentG);
            this.hwReport.matrix.rows = this.resultMatrix.rows;
            //该行对应的模板行
            function getOriginIndex(row) {
                var index = null;
                for (var j = 0; j < row.length; j++) {
                    if (row[j].sid) {
                        index = row[j].sid.split("_")[0];
                        break;
                    }
                }
                return index;
            }
            //数组中包含某一项
            /*   function containsInArr(array,item){
                  var flag=false;
                  for(var i=0;i<array.length;i++){
                      if(array[i]==item){
                          flag=true;
                          break;
                      }                   
                  }
                  return flag;
              } */
            //截取需要重新计算的行
            function findRecalcRows(data, recalcRows, order) {
                if (order) {//顺序遍历
                    var posInfo = {};
                    posInfo.position = [];
                    posInfo.rows = [];
                    for (var i = 0; i < recalcRows.length; i++) {
                        for (var j = 0; j < data.length; j++) {
                            var rowindex = findIndex(data[j]);
                            if (rowindex && rowindex == recalcRows[i]) {//模板行号一致
                                posInfo.position.push(j);
                                posInfo.rows.push(data[j]);
                                break;
                            }
                        }
                    }
                    return posInfo;

                } else {//倒序遍历
                    var posInfo = {};
                    posInfo.position = [];
                    posInfo.rows = [];
                    for (var i = 0; i < recalcRows.length; i++) {
                        for (var j = data.length - 1; j >= 0; j--) {
                            var rowindex = findIndex(data[j]);
                            if (rowindex && rowindex == recalcRows[i]) {//模板行号一致
                                posInfo.position.push(j);
                                posInfo.rows.push(data[j]);
                                break;
                            }
                        }
                    }
                    return posInfo;
                }

            }
            function findIndex(row) {
                var index = null;
                for (var m = 0; m < row.length; m++) {
                    if (row[m].sid) {
                        index = row[m].sid.split("_")[0];
                        break;
                    }
                }
                return index;
            }
        }
        /**
         * 辅助方法，计算数组中是否含有某一项
         */
        this.containsInArr = function (array, item) {
            var flag = false;
            for (var i = 0; i < array.length; i++) {
                if (array[i] == item) {
                    flag = true;
                    break;
                }
            }
            return flag;
        }
        /*
        * 异步数据加载，重新计算
        */
        this.reCalc = function (waitCal, waitToCal) {
            //重新计算
            var result = [];
            for (var i = 0; i < waitCal.length; i++) {//遍历每行
                var nowRow = [];
                for (var j = 0; j < waitCal[i].length; j++) {//遍历每个单元格
                    if (waitCal[i][j].sid) {//寻找原始单元格，表达式计算
                        var rowindex = parseInt(waitCal[i][j].sid.split("_")[0]);//行
                        var colindex = parseInt(waitCal[i][j].sid.split("_")[1]);//列
                        var originCell = this.getOriginCell(rowindex - this.startRow + 1, colindex - this.startCol + 1);//模板单元格
                        if (originCell && originCell.isRoutine()) {//解析原始单元格中的表达式类型
                            //测试用，待表达式计算部分完成后进行替换
                            if (originCell.datavalue.indexOf("Sum") >= 0) {
                                waitCal[i][j].data = eval((waitCal[i][j].data || 0) + "+" + (waitToCal[i][j].data || 0)) + "";
                                nowRow.push(waitCal[i][j]);
                            }
                        } else {//单元格中无表达式，则取并
                            if (waitCal[i][j].data) {
                                nowRow.push(waitCal[i][j]);
                            } else {
                                nowRow.push(waitToCal[i][j]);
                            }
                        }
                    } else {
                        nowRow.push(waitCal[i][j]);
                    }
                }
                result.push(nowRow);
            }
            return result;
        }
        /**
        * 比较并合并两组
        * data 后台请求返回数据
        */
        this.compareGroup = function (data,that) {
            var array = this.getGroupCols();//需要对比的单元格
            var ignore = this.getRecalcRows(array);//需要重新计算的行数及其依赖
            var lastRow = this.getLastGroup(array, ignore);//最后一组
            var firstG = this.getFirstGroup(data, array);//第一组
            var firstRow = firstG.firstGroup;
            var firstGroupLen = firstG.maxR;//第一组行数
            var uniteCols = this.merge(0, firstRow, lastRow, ignore, array); 
            // 滚动加载处理分组或者列表下面的合计部分
              if(that.lastRow&&that.lastRow<that.rowNum){
                    var datarows=[];
                    var maxrow=0;
                     for(var i=0;i<this.resultMatrix.rows.length;i++){
                         if(that.getInLastRows(that.getDataRowid(this.resultMatrix.rows[i]))){
                            datarows.push(this.resultMatrix.rows[i]);
                            if(maxrow==0)
                            {
                                maxrow=i;
                            }
                        }
                     } 
                     var rnum= Ext.Object.getKeys(that.lastDateRows).length;
                     that.lastDateRows[rnum]=datarows;
                     this.resultMatrix.rows=this.resultMatrix.rows.slice(0, maxrow);
                     var ci=0;
                     var exp=that.expressCell.route;
                     for(var i=0;i<data.length;i++){
                         var datarowid=that.getDataRowid(data[i]);
                        if(that.getInLastRows(datarowid)){
                           if(exp.length>0){
                               for(var routeid=0;routeid<exp.length;routeid++){
                                   if(exp[routeid].rowIndex==datarowid){
                                       data[i][exp[routeid].index].data=parseFloat(data[i][exp[routeid].index].data)+parseFloat(that.lastDateRows[rnum][ci][exp[routeid].index].data);
                                   }
                               }
                               ci++;
                           }
                        }
                     }
                }
            if (uniteCols > 0) {//需要合并
                this.uniteGroup(data, firstGroupLen, ignore, uniteCols, array, lastRow);
            } else {//无需合并
                this.hwReport.changeFrom = this.resultMatrix.rows.length;
                this.resultMatrix.rows = this.resultMatrix.rows.concat(data);
                this.hwReport.matrix.rows = this.resultMatrix.rows;
            }

        }
        /**
         * 异步数据加载，对比并修改rowspan
         * 参数：n 此时对比第几列
         *      firstGroup 第一组
         *      lastGroup 最后一组
         *      ignore 每个分组需要重新计算的行
         *      array:含分组函数的单元格
         */
        this.merge = function (n, firstGroup, lastGroup, ignore, array) {
            //var nowRepeat=repeat.depend[n];
            if (n == array.length) {//所有含分组函数的单元格已经比较完毕
                return n;
            } else {
                if (firstGroup&&lastGroup&&firstGroup[n]&& lastGroup[n]&&firstGroup[n].data == lastGroup[n].data) {
                    //改变上一组的rowspan                  
                    var repeat = ignore.depend.get(firstGroup[n].sid).length | 0;
                    //lastGroup[n].rowspan=parseInt(lastGroup[n].rowspan)+parseInt(firstGroup[n].rowspan)-repeat;
                    lastGroup[n].rowspan = parseInt(lastGroup[n].rowspan || 1) + parseInt(firstGroup[n].rowspan || 1);
                    //去掉下一组的rowspan
                    delete firstGroup[n].rowspan;
                    delete firstGroup[n].data;
                    return this.merge(n + 1, firstGroup, lastGroup, ignore, array);
                } else {
                    return n;
                }
            }
        }
        /**
         * 对未计算完成的单元格添加？？？类的标志
         * data:请求返回数据
         */
        this.addUncalcFlag = function (data) {
            //如果之前有标志的则需要先删除
            this.clearUncalcFlag();
            //模板中需要重新计算的单元格
            var routeCells = this.hwReport.expressCell.route;//常规函数所在的单元格
            var routes = [];
            for (var i = 0; i < routeCells.length; i++) {
                routes.push(routeCells[i].id);
            }
            var reCalcCells = {};
            //在报表中记录未计算单元格
            //倒序遍历数据，找到未计算完成的单元格所在行
            for (var i = data.length - 1; i >= 0; i--) {
                var row = data[i];
                for (var j = 0; j < row.length; j++) {
                    for (var m = 0; m < routes.length; m++) {
                        if (row[j].sid && routes[m] == row[j].sid) {
                            if (!reCalcCells[m]) {
                                row[j].highlight = true;
                                reCalcCells[m] = row[j];
                                break;
                            }

                        }
                    }
                }
                if (Object.keys(reCalcCells).length == routes.length) {
                    break;
                }
            }
            //对单元格进行标志
            for (var i = 0; i < routes.length; i++) {
                var cell = reCalcCells[i];
                cell['class'] = " q-right-top";//cell.data + this.hwReport.calcSymbol;

            }
            this.hwReport.calcFlag = reCalcCells;
        }
        /**
         * 清除单元格中的计算未完成标志
         */
        this.clearUncalcFlag = function () {
            if (this.hwReport.highlightCells) {
                for (var i = 0; i < this.hwReport.highlightCells.length; i++) {
                    var ids = this.hwReport.highlightCells[i].split("_");
                    var cell = this.hwReport.grid.cells(ids[0], ids[1]).cell;
                    cell.className = cell.className.replace(/q-right-top/g, "");
                }
                //消除高亮属性
                if (this.hwReport.calcFlag) {
                    var highLength = Object.keys(this.hwReport.calcFlag).length;
                    for (var index = 0; index < highLength; index++) {
                        var signCell = this.hwReport.calcFlag[index];
                        signCell.highlight = false;
                        signCell['class'] = signCell['class'].replace(/q-right-top/g, "");
                    }
                }
            }
        }

        /**
        * 将模板信息发送到服务器，返回扩展后的数据
        */
        this.requestServer = function (success, error) {
            var that = this;
            var vmdreport = that.hwReport.vmdreport;
            var tables = {};
            for (var n = 0; n < that.dsNames.length; n++) {
                var dsName = that.dsNames[n];
                var rptStore = that.hwReport.getQueryStoreByName(dsName);
                var vmdstore = rptStore && rptStore.factName && window[rptStore.factName];
                if (!vmdstore) {
                    showAlert("错误提示！", "数据集" + rptStore.factName + "未定义！", "error");
                    return;
                }
                var params = {};
                var varNameValueHash = vmdstore.storeConfig.getMethods;
                for (var i = 0; i < varNameValueHash.length; i++) {
                    var value = dhx4.trim(varNameValueHash[i].value1 || varNameValueHash[i].value2 || "");
                    if (value == "") {
                        continue;
                    }
                    try {
                        value = value == "" ? "" : new Function("value", value + ';\nreturn value')(""); //eval("(function(){" + value + "\n})()");
                    } catch (e) {
                        showAlert("错误提示！", "获取数据集'" + rptStore.factName + "'参数时出错！错误信息：" + e.message, "error");
                        return;
                    }
                    params[varNameValueHash[i].id] = value;
                }
                tables[dsName] = {
                    "host": tablehost,
                    "callcode": vmdstore.storeConfig.callcode,
                    "method": "get",
                    "path": vmdstore.storeConfig.url,
                    "params": params
                }
            }

            var headerLength = this.startRow == 1 ? this.headerLength : 0;
            var matrixDimesions = this.originalMatrix.getDimesions();

            if (that.hwReport.expandType == "h" || that.hwReport.expandType == "c") {
                headerLength = 0;
            }
            //模板数据行中没有数据集，则不去请求后台报表服务，直接返回json结构
            if (isEmpty(tables)) {
                success.apply(that, [
                    {
                        colcount: matrixDimesions.cols,
                        rowcount: matrixDimesions.rows - headerLength,
                        datas: this.originalMatrix.getJSON(headerLength, null, ['class', 'style', 'fillcelltype'])
                    }
                ]);
                if (checkAllSuccess()) {
                    report.callEvent("onSectionSeverSuccess", [that]);
                }
                if (checkAllComplete()) {
                    report.callEvent("onSectionSeverComplete", [that]);
                }
                return;
            }
            var modelDatas = this.originalMatrix.getJSON(headerLength,null, ['class', 'style', 'fillcelltype']);
            var numbersJSON = {};
            this.hwReport.numbers.each(function (key, number, index) {
                numbersJSON[key] = number.getJSON();
            });
            var modelJSON = {
                "startRow": this.startRow + "",
                "startCol": this.startCol + "",
                "fixedrowcount": headerLength + "",
                "datarowcount": (matrixDimesions.rows - headerLength) + "",
                "colcount": matrixDimesions.cols + "",
                "numbers": numbersJSON,
                "datas": modelDatas
            };
            var data = {
                "resulttype": "jsonstr",
                "tables": tables,
                "modeldata": JSON.stringify(modelJSON)
            }

            var hwRao = new HwRao(reporthost, "report");
            /**!!!!!!!!!!!!!!滚动加载时请求对应行数的数据 l!!!!!!!!!!!!! */
            var headers = {};
            //分页或滚动加载时this.loadMode="paging"或"smart"
            if (this.hwReport.loadMode) {
                //滚动加载开启时设置起始行和页容量
                headers.startIndex = this.hwReport.startIndex || -1; //起始索引设置为-1时返回总记录数

                //如果是分组的则请求一定数目的记录，列表的则请求所有数据，在前端滚动加载
                if (this.hwReport.rptType == "group" || this.hwReport.rptType == "select") {
                    headers.pageSize = this.hwReport.getPageSize(); //滚动加载时一次请求记录数默认为100条
                }
            }

            hwRao.getMatrix(headers, JSON.stringify(data), function (result) {
                if (!result.data) {
                    error.apply(that, ["报表服务处理数据异常，返回数据为空！"]);
                    if (checkAllComplete()) {
                        report.callEvent("onSectionSeverComplete", [that]);
                    }
                    return;
                }
                if (result.isSucceed) {
                    var resultData;
                    //result.data = result.data.substr(0, result.data.lastIndexOf("1,-1\"}]]"));
                    try {
                        eval("dhtmlx.temp=" + result.data + ";");
                        resultData = dhtmlx.temp;
                    } catch (e) {
                        error.apply(that, ["后台数据返回错误！"]);
                        if (checkAllComplete()) {
                            report.callEvent("onSectionSeverComplete", [that]);
                        }
                        console.log(result.data);
                        return;
                    }
                    success.apply(that, [resultData, abbrkeys]);
                    if (checkAllSuccess()) {
                        report.callEvent("onSectionSeverSuccess", [that]);
                    }
                }
                else {
                    error.apply(that, [result.errMsg]);
                }
                if (checkAllComplete()) {
                    report.callEvent("onSectionSeverComplete", [that]);
                }

            }, function (msg) {
                error.apply(that, [msg]);
                if (checkAllComplete()) {
                    report.callEvent("onSectionSeverComplete", [that]);
                }
            });
        }

        //检查是否所有请求都加载完成
        function checkAllComplete() {
            var allComplete = true;
            for (var i = 0; i < report.sections.length; i++) {
                if (!report.sections[i].serverRequestCompleted) {
                    allComplete = false;
                    break;
                }
            }
            return allComplete;
        }

        //检查是否所有请求都加载成功
        function checkAllSuccess() {
            var allSuccess = true;
            for (var i = 0; i < report.sections.length; i++) {
                if (!report.sections[i].serverRequestSuccess) {
                    allSuccess = false;
                    break;
                }
            }
            return allSuccess;
        }
    }

    /**
    * 变量类
    */
    function RptVar(report) {
        this.hwReport = report;
        this.type = "";
        this.name = "";
        this.value = "";

        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }

        this.parse = function (varjson) {
            this.set("type", varjson.type);
            this.set("name", varjson.name);
            this.set("value", varjson.value);
        }

        this.getValue = function (contextCell) {
            return this.hwReport.getValue(this.value, contextCell);
        }
    }

    /*
    *说明：数据集信息类
    */
    function RptStore(report, type) {
        var that = this;
        this.type = type; //数据集是查询数据集还是入库数据集
        this.isRefresh = true;  //是否查询数据库
        this.hwReport = report;
        this.id = "";                  //服务id
        this.path = "";              //路径
        this.name = "";            //报表中数据集名称
        this.factName = "";      //可视化中定义的名称
        this.callCode = "";       //服务serverid
        this.serverName = "";  //数据服务中的名称
        this.saveRule = ""; // 入库规则
        this.relativeCells = [];  //与数据集关联的原始单元格
        this.dataRequestCompleted = this.isRefresh ? false : true; //数据请求完成，不论成功失败
        this.dataRequestSuccess = this.isRefresh ? false : true; //数据请求成功
        this.startIndex = 0;//-1时返回总数
        this.pageSize = 0;

        //入库数据集属性
        this.dbname = "";
        this.definedname = "";
        this.tablename = "";

        this.nochangenoupdate = true; //值不改变不更新
        this.saveserver = {};
        this.bindRules = [];
        this.paramsKey = "";
        this.cache = {}; //数据缓存

        this.dhtmlxDatastore = new dhtmlXDataStore();
        this.set = function (key, value) {
            if (defined(value)) {
                this[key] = value;
            }
        }

        this.parse = function (storejson) {
            //查询数据集属性
            this.set("id", storejson.id);
            this.set("path", storejson.path);
            this.set("name", storejson.name || storejson.factname);
            this.set("factName", storejson.factname);
            this.set("callCode", storejson.callcode);
            this.set("serverName", storejson.server_name);

            //入库数据集属性
            this.set("dbname", storejson.dbname);
            this.set("definedname", storejson.definedname);
            this.set("tablename", storejson.tablename);

            this.set("saveRule", storejson.saverule);
            if(this.saveRule){
                var operator = this.saveRule.match(/!=|==|>=|<=|<|>/g);
                operator = operator && operator[0];

                var expresses = operator && this.saveRule.split(operator);
                if(expresses && expresses.length == 2){
                    this.saveRuleParse = {
                        operator: operator,
                        leftExpress: expresses[0],
                        rightExpress: expresses[1]
                    };
                }
            }

            this.set("nochangenoupdate", dhx.s2b(storejson.updatemode));
            this.set("bindRules", storejson.values && storejson.values.filter(function (v) { return v.cellid !== ""}));
            //将字段转换成小写
            //for (var i = 0; i < this.bindRules.length; i++) {
            //    this.bindRules[i].fieldname = this.bindRules[i].fieldname.toLowerCase();
            //}
            if (storejson.saveserver) {
                this.saveserver.explain = storejson.saveserver.explain;
                this.saveserver.host = storejson.saveserver.host;
                this.saveserver.id = storejson.saveserver.id;
                this.saveserver.method = storejson.saveserver.method;
                this.saveserver.name = storejson.saveserver.name;
                this.saveserver.params = storejson.saveserver.params;
                this.saveserver.path = storejson.saveserver.path;
            }
        };

        this.getFields = function(){
            var fields = [];
            if(this.type == "query"){
                var vmdStore = window[this.factName];
                if (!vmdStore) {
                    showAlert("错误！", "数据集'" + this.factName + "'不存在！", "error");
                    return;
                }
                fields = vmdStore.getFields().map(function (v) {
                    return v.name;
                });
                return fields;
            }
            fields = this.bindRules.map(function (v) {
                return v.fieldname;
            });
            return fields;
        };
        
        /*
        * filed字段名 index获取第几条记录的值 未定义时获取全部  cellType单元格类型
        */
        this.getValue = function (field, index,cellType,header) {
            if (!field || this.dhtmlxDatastore.dataCount() == 0) {
                return "";
            }
            field = dhx4.trim(field).toLowerCase();
            //字段是#1形式
            if (/^#\d+$/g.test(field)) {
                var vmdstore = window[this.factName];
                if (vmdstore) {
                    var num = parseInt(field.replace("#", ""));
                    field = vmdstore.storeConfig.fields[num - 1].name;
                }
                else {
                    showAlert("错误！", "数据集：" + this.factName + "未定义！", "error");
                    return "";
                }
            }
            
            if(defined(index)){
                // 2020.3.14 表头 横向扩展
                if(header&&header=="header"){
                
                   var datas= this.dhtmlxDatastore.data.pull;
                   for (var i = 0; i < Object.keys(datas).length; i++) {
                    if (i > 0 && this.isFieldDataExsit(datas[Object.keys(datas)[i]][field.toLowerCase()], datas, i,field)) {
                        delete datas[Object.keys(datas)[i]];
                        i = 0;
                    }
                }
               var value =datas[Object.keys(datas)[index]];
               return pick((value && value[field.toLowerCase()]), "");
            }
                var dataId = this.dhtmlxDatastore.idByIndex(index);
                var item = this.dhtmlxDatastore.item(dataId);
				if(cellType&&cellType.nullShowZero)
				{
					return pick((item && item[field.toLowerCase()]), this.getType(field.toLowerCase()) == "" ? "" : 0);
				}
				else					
				{
					return pick((item && item[field.toLowerCase()]), "");}
            }
            var dhtmlxStoredata = this.dhtmlxDatastore.data;
            var ids = dhtmlxStoredata.order;
            var values = [];
            for (var i = 0; i < ids.length; i++) {
                var el = dhtmlxStoredata.pull[ids[i]];
                values.push(el[field]);
                break;
            }
            return values.join(",");
        }
        this.isFieldDataExsit=function(name, datas, count,field) {
            for (var i = 0; i < count; i++) {
                if (name == datas[Object.keys(datas)[i]][field.toLowerCase()]) {
                    return true;
                }
            }
            return false;
        }
        this.getType = function (field) {
            if (!this.fields || !this.fields.map) {
                return "";
            }
            var type = this.fields.map[field] && this.fields.map[field].type.type;
            switch (type) {
                case "float":
                case "int":
                case "number":
                    return "number";
                default:
                    return "";
            }
        };

        this.first = function(){
            return this.dhtmlxDatastore.item(this.dhtmlxDatastore.first());
        };

        this.find = function (functor) {
            var ids = this.dhtmlxDatastore.data.order;
            for (var i = 0; i < ids.length; i++) {
                var el = this.dhtmlxDatastore.data.pull[ids[i]];
                if (functor(el)) {
                    return el;
                }
            }
            return null;
        };

        this.sum = function (field) {
            var total = 0;
            var ids = this.dhtmlxDatastore.data.order;
            for (var i = 0; i < ids.length; i++) {
                var el = this.dhtmlxDatastore.data.pull[ids[i]];
                total += parseFloat(el[field]||0);
            }
            return total;
        };

        this.count = function (field) {
            var ids = this.dhtmlxDatastore.data.order;
            return ids.length;
        };

        this.avg = function (field) {
            return this.count(field) == 0 ? 0 : this.sum(field) / this.count(field);
        };

        this.max = function (field) {
            var max;
            var ids = this.dhtmlxDatastore.data.order;
            for (var i = 0; i < ids.length; i++) {
                var el = this.dhtmlxDatastore.data.pull[ids[i]];
                var value = parseFloat(el[field]);
                if (isNaN(value)) {
                    continue;
                }
                if (max == undefined) {
                    max = value;
                }
                else if (max < value) {
                    max = value;
                }
            }
            return max;
        };

        this.min = function (field) {
            var min;
            var ids = this.dhtmlxDatastore.data.order;
            for (var i = 0; i < ids.length; i++) {
                var el = this.dhtmlxDatastore.data.pull[ids[i]];
                var value = parseFloat(el[field]);
                if (isNaN(value)) {
                    continue;
                }
                if (min == undefined) {
                    min = value;
                }
                else if (min > value) {
                    min = value;
                }
            }
            return min;
        };

        this.setCursor = function (cursor) {
            this.cursor = cursor;
        };

        this.getCursor = function () {
            return this.cursor || 0;
        };

        this.clear = function () {
            this.dhtmlxDatastore.clearAll();
            this.dhtmlxDatastore.data.opull = {};
            this.dhtmlxDatastore.data.dpull = {};
        };

        this.setPaging = function (startIndex, pageSize) {
            this.startIndex = startIndex;
            this.pageSize = pageSize;
        };

        /**
        * 设置是否需要刷新数据集；
        */
        this.setIsRefresh = function (bool) {
            this.isRefresh = !!bool;  //是否查询数据库
            this.dataRequestCompleted = this.isRefresh ? false : true; //数据请求完成
            this.dataRequestSuccess = this.isRefresh ? false : true; //数据请求成功
        };

        this.update = function (success, error) {
            if (!this.isRefresh) {
                if (success) {
                    success.apply(that, []);
                }
                return;
            }
            if (!this.factName) {
                this.dataRequestCompleted = true;
                if (success) {
                    success.apply(that, []);
                }
                return;
            }
            var that = this;
            var vmdStore = window[this.factName];
            if (!vmdStore) {
                showAlert("错误！", "数据集'" + this.factName + "'不存在！", "error");
                return;
            }

            var params = {};
            this.paramsKey = "";
            var varNameValueHash = vmdStore.storeConfig.getMethods;

            for (var i = 0; i < varNameValueHash.length; i++) {
                var value = dhx4.trim(varNameValueHash[i].value1 || varNameValueHash[i].value2 || "");
                if (value == "") {
                    continue;
                }
                try {
                    value = new Function("value", value + ';\nreturn value')(""); //eval("(function(){" + value + "\n})()");
                } catch (e) {
                    showAlert("错误提示！", "获取数据集'" + this.factName + "'参数时出错！错误信息：" + e.message, "error");
                    return;
                }
                params[varNameValueHash[i].id] = value;
                this.paramsKey += varNameValueHash[i].id + ":" + value + ";";
            }

            //最后一次查询的参数与现在查询的参数一致，不再重新进行查询
            if (that._lastParams && isEqual(that._lastParams, params)&&!that.hwReport.clearParams) {
                if (success) {
                    success.apply(that, []);
                }
                return;
            }

            //如果存在缓存，则从缓存中获取数据
            if (this.cache[this.paramsKey]&&!that.hwReport.clearParams) {
                that._lastParams = params;
                that.dhtmlxDatastore.clearAll();
                that.dhtmlxDatastore.parse(this.cache[this.paramsKey]);
                if (success) {
                    success.apply(that, []);
                }
                return;
            }

            var urlConfig = {
                host: tablehost,
                url: vmdStore.storeConfig.url
            };
            if (!urlConfig.url) {
                showAlert("错误提示！", "数据集'" + this.factName + "'信息未配置！", "error");
                return;
            }
            var headers = {
                //AttrCase: "upperCase", //返回的字段名称大写
                //Ecylogin: Ext.util.Cookies.get('EcyLogin') || Ext.util.Cookies.get('ecyLogin')
            };

            //数据集中如果设置了请求条数，则执行分页加载
            if (this.pageSize) {
                headers.startIndex = this.startIndex;
                headers.pageSize = this.pageSize;
            }

            this.dataRequestCompleted = false;
            this.dataRequestSuccess = false;
            hwDas.get(urlConfig, headers, params,
                function (result) {
                    that._lastParams = params;
                    var datajson = result.data[0].datas;
                    that.cache[that.paramsKey] = datajson;
                    var fields = result.data[0].fields;
                    that.dhtmlxDatastore.clearAll();
                    that.dhtmlxDatastore.parse(datajson);
                    that.dataRequestCompleted = true;
                    that.dataRequestSuccess = true;

                    //数据集加载成功后，与数据集相关的单元格的值重新进行计算
                    that.updateRelativeCells();
                    if (success) {
                        success.apply(that, [result]);
                    }
                },
                function (msg) {
                    that.dataRequestCompleted = true;
                    that.dataRequestSuccess = false;
                    showAlert("错误提示！", "获取'" + that.factName + "'数据失败！错误信息：" + msg, "error");
                    if (error) {
                        error.apply(that, []);
                    }
                }
            );
        }

        //数据集更新完成后，更新绑定的单元格的值，包括显示值和实际值
        this.updateRelativeCells = function () {
            
            if (!this.relativeCells || this.relativeCells.length == 0) {
                return;
            }
            var grid = this.hwReport.grid;
            //绑定在显示值上的单元格
            for (var i = 0; i < this.relativeCells.length; i++) {
                var oCell = this.relativeCells[i];
                //审批组件更新
                if (oCell.getType() == "vmdapprove") {
                    var childs = oCell.childs;
                    for (var j = 0; j < childs.length; j++) {
                        var cellObj = grid.cells.apply(grid, childs[j].split("_"));
                        cellObj.updateValue();
                    }
                    continue;
                }
                //存在显示值或者是表头时重新计算
                if (!oCell.showvalue && (!oCell.isHeader && !oCell.isTitle)) {
                    continue;
                }
                var expvalue = oCell.showvalue || oCell.datavalue;
                if (this.hwReport.checkParamType(expvalue) == "ds") {
                    var rptStore = this.hwReport.getQueryStoreByName(expvalue.split(".")[0]);
                    if (rptStore && !rptStore.dataRequestCompleted) {
                        continue;
                    }
                    if (oCell.isTitle) {
                        var cellDom = this.hwReport.floatTitleContainer.children[0].cells[0];
                        cellDom.firstChild.innerHTML = this.hwReport.getValue(expvalue);
                    }
                    else if (oCell.isHeader) {
                        var _grid = this.hwReport.grid;
                        if (this.hwReport.fixedColCount && oCell.index < this.hwReport.fixedColCount) {
                            _grid = _grid._fake;
                        }
                        var tdcells = _grid.hdr.children[0].children[oCell.rptRow.rowIndex + 1].cells;
                        var c_index = 0;
                        for (var j = 0; j < tdcells.length; j++) {
                            if (tdcells[j]._attrs && tdcells[j]._attrs.sid == oCell.id) {
                                tdcells[j].firstChild.innerHTML = this.hwReport.getValue(expvalue, c_index,"header");
                                c_index++;
                            }
                        }
                    }
                    else {
                        var childs = oCell.childs;
                        for (var j = 0; j < childs.length; j++) {
                            var cellObj = grid.cells.apply(grid, childs[j].split("_"));
                            cellObj.setValue(this.hwReport.getValue(expvalue, cellObj));
                        }
                    }
                }
            }
        };

        //更新入库数据集对应字段的值，id：记录id，filed：字段 nValue：新值,updateOld：更新旧值
        this.updateValue = function (id, field, nValue, updateOld) {
            var item = this.dhtmlxDatastore.item(id);
            if (!item) return;

            if (item[field] == nValue) {
                return;
            }
            if (this.type == "query") {
                item[field] = nValue;
            }
            else {
                this.dhtmlxDatastore.data.opull = this.dhtmlxDatastore.data.opull || {};
                var oldItem = this.dhtmlxDatastore.data.opull[id];
                if (!oldItem) {
                    oldItem = this.dhtmlxDatastore.data.opull[id] = {};
                    for (var key in item) {
                        if (!item.hasOwnProperty(key) || key == "id") {
                            continue;
                        }
                        oldItem[key] = item[key];
                    }
                }
                item[field] = nValue;
                if (updateOld) {
                    oldItem[field] = nValue;
                }
                if (item._rowState == undefined) {
                    item._rowState = "update";
                }
                else if (item._rowState == "nochange") {
                    if (oldItem[field] == nValue) {
                        item._rowState = "nochange";
                    }
                    else {
                        item._rowState = "update";
                    }
                }
            }
            this.dhtmlxDatastore.update(id, item);
        }

        this.addItem = function (data, index) {
            this.dhtmlxDatastore.add(data, index);
        }

        this.getItemByIndex = function (index) {
            var dataId = this.dhtmlxDatastore.idByIndex(index);
            return this.dhtmlxDatastore.item(dataId);
        }

        this.idByIndex = function (index) {
            return this.dhtmlxDatastore.idByIndex(index);
        }

        this.updateRowState = function (id, state) {
            var item = this.dhtmlxDatastore.item(id);
            if (!item) return;
            item._rowState = state;
        }

        this.addBindDataToStore = function (baseCell, rowState) {
            var bindRules = this.bindRules;
            var id = ++this.hwReport._seed;
            var newData = {
                id: id,
                _splitFields: [], //上传组件中如果有多个文件，组织数据时以逗号分隔成多条记录
                _rowState: rowState
            };
            var oldData = {};
            var uploadcell = null;
            for (var j = 0; j < bindRules.length; j++) {
                var bindRule = bindRules[j];
                var fieldname = bindRule.fieldname;
                if (fieldname == "id") {
                    fieldname = "__id";
                }
                var cellid = bindRule.cellid;
                var paramType = this.hwReport.checkParamType(cellid);
                var values = "";

                switch (paramType) {
                    case "cell_approve":
                    case "cell_uploader":
                        var cellids = cellid.split(".");
                        var cellName = cellids[0].toLowerCase();
                        var bindCells = this.hwReport.getCells(cellName, baseCell);
                        var bindCellObj = bindCells.length > 0 ? bindCells[0] : null;
                        if (bindCellObj) {
                            if (bindCellObj.cell._cellType != "vmdupload" && bindCellObj.cell._cellType != "vmdapprove") {
                                showAlert("入库规则不正确！", "入库数据集(" + this.name + ")中字段'" + bindRule.fieldname +
                                        "'取值的单元格'" + cellids[0] + "'不是" + (paramType == "cell_uploader" ? "上传组件！" : "审批组件！"), "error");
                                return;
                            }
                            bindCellObj.cell._bindSubmitStores = bindCellObj.cell._bindSubmitStores || [];
                            bindCellObj.cell._bindSubmitStores.push({
                                storeName: this.name,
                                fieldName: fieldname,
                                key: cellids[2],
                                dataId: id
                            })
                            if (paramType == "cell_uploader") {
                                uploadcell = uploadcell != null ? uploadcell : cellName;
                            }
                            if (uploadcell == cellName) {
                                newData._splitFields.push(fieldname);
                            }

                            var val = bindCellObj.getValue(cellids[2]) || "";
                            newData[fieldname] = val;
                            oldData[fieldname] = val;
                        }

                        break
                    case "cell_combo":
                        var cellids = cellid.split(".");
                        var bindCells = this.hwReport.getCells(cellids[0], baseCell);
                        var bindCellObj = bindCells.length > 0 ? bindCells[0] : null;
                        if (bindCellObj) {
                            bindCellObj.cell._bindSubmitStores = bindCellObj.cell._bindSubmitStores || [];
                            bindCellObj.cell._bindSubmitStores.push({
                                storeName: this.name,
                                fieldName: fieldname,
                                key: cellids[1],
                                dataId: id
                            });

                            var val = cellids[1] == "text" ? bindCellObj.getText() : bindCellObj.getValue();
                            newData[fieldname] = val;
                            oldData[fieldname] = val;
                        }
                        break;
                    case "cell":
                        var bindCells = this.hwReport.getCells(cellid, baseCell);
                        var bindCellObj = bindCells.length > 0 ? bindCells[0] : null;
                        if (bindCellObj) {
                            bindCellObj.cell._bindSubmitStores = bindCellObj.cell._bindSubmitStores || [];
                            bindCellObj.cell._bindSubmitStores.push({
                                storeName: this.name,
                                fieldName: fieldname,
                                dataId: id
                            })
                            var val = bindCellObj.getValue();
                            newData[fieldname] = val;
                            oldData[fieldname] = val;
                        }

                        break;
                    default:
                        var val = this.hwReport.getValue(cellid, baseCell);
                        newData[fieldname] = val;
                        oldData[fieldname] = val;
                        break;
                }
            }
            if (!this.dhtmlxDatastore.exists(id)) {
                this.dhtmlxDatastore.add(newData);
                this.dhtmlxDatastore.data.opull = this.dhtmlxDatastore.data.opull || {};
                this.dhtmlxDatastore.data.opull[id] = oldData;
            }
        }

        //页面加载完成后填充入库数据集
        this.fillDataByFirst = function (state) {
            var bindRules = this.bindRules;
            if (defined(this.baseIndex)) {
                var baseRule = bindRules[this.baseIndex];
                var baseCells = this.hwReport.getCells(baseRule.cellid);
                for (var i = 0; i < baseCells.length; i++) {
                    var baseCell = baseCells[i];
                    this.addBindDataToStore(baseCell, state);
                }
            }
            else {
                var id = "0";
                var newData = {
                    id: id,
                    _rowState: state
                };
                var oldData = {};
                for (var j = 0; j < bindRules.length; j++) {
                    var baseRule = bindRules[j];
                    var val = this.hwReport.getValue(baseRule.cellid, null);
                    var fieldname = baseRule.fieldname;
                    if (fieldname == "id") {
                        fieldname = "__id";
                    }
                    newData[fieldname] = val;
                    oldData[fieldname] = val;
                }
                if (!this.dhtmlxDatastore.exists(id)) {
                    this.dhtmlxDatastore.add(newData);
                    this.dhtmlxDatastore.data.opull = this.dhtmlxDatastore.data.opull || {};
                    this.dhtmlxDatastore.data.opull[id] = oldData;
                }
            }
        }

        /**
        * 新增行后添加数据 rId新增的行id
        */
        this.fillDataByAdd = function (rId, rowsNum) {
            rowsNum = rowsNum || 1;
            var hwReport = this.hwReport;
            var grid = hwReport.grid;
            var bindRules = this.bindRules;
            if (defined(this.baseIndex)) {
                var baseRule = bindRules[this.baseIndex];
                var paramType = hwReport.checkParamType(baseRule.cellid);
                var baseOCell;
                if (paramType == "cell_uploader" || paramType == "cell_approve" || paramType == "cell_combo") {
                    baseOCell = hwReport.getOriginCellByLetter(baseRule.cellid.split(".")[0]);
                }
                else if (paramType == "cell") {
                    baseOCell = hwReport.getOriginCellByLetter(baseRule.cellid);
                }

                var baseCell;
                var rowIndex = grid.getRowIndex(rId);

                grid.forEachCellsB(function (cellObj, rInd, cInd) {
                    if (baseOCell && cellObj.cell._attrs.sid == baseOCell.id) {
                        baseCell = cellObj;
                    }
                }, rowIndex, rowIndex + rowsNum);

                if (baseCell) {
                    this.addBindDataToStore(baseCell, "add");
                }
            }
        }

        /**
       * 删除行后删除数据 rId要删除的行id
       */
        this.deleteDataByDelete = function (rId) {
            
            var hwReport = this.hwReport;
            var grid = hwReport.grid;
            var bindRules = this.bindRules;
            if (defined(this.baseIndex)) {
                var baseRule = bindRules[this.baseIndex];

                var paramType = hwReport.checkParamType(baseRule.cellid);
                var baseOCell;
                if (paramType == "cell_uploader" || paramType == "cell_approve" || paramType == "cell_combo") {
                    baseOCell = hwReport.getOriginCellByLetter(baseRule.cellid.split(".")[0]);
                }
                else if (paramType == "cell") {
                    baseOCell = hwReport.getOriginCellByLetter(baseRule.cellid);
                }

                var colspan = 1;
                var baseCell;
                var deleteId;
                for (var i = 0; i < grid.getColumnsNum() ; i += colspan) {
                    var cellObj = grid.cells(rId, i);
                    colspan = cellObj.cell.colSpan || 1;
                    if (baseOCell && cellObj.cell._attrs.sid == baseOCell.id) {
                        baseCell = cellObj;
                        break;
                    }
                }

                var _bindSubmitStores = baseCell && baseCell.cell._bindSubmitStores;
                if (_bindSubmitStores) {
                    for (var i = 0; i < _bindSubmitStores.length; i++) {
                        var bindStore = _bindSubmitStores[i];
                        if (bindStore.storeName == this.name) {
                            deleteId = bindStore.dataId;
                            break;
                        }
                    }
                }
                
                var item = this.dhtmlxDatastore.item(deleteId);
                if(item){
                    if (item._rowState == "nochange" || item._rowState == "update" || item._rowState == "save") {
                        this.dhtmlxDatastore.data.dpull = this.dhtmlxDatastore.data.dpull || {};
                        this.dhtmlxDatastore.data.dpull[deleteId] = item;
                    }
                    this.dhtmlxDatastore.remove(deleteId);
                    if (this.dhtmlxDatastore.data.opull && this.dhtmlxDatastore.data.opull[deleteId]) {
                        delete this.dhtmlxDatastore.data.opull[deleteId];
                    }
                }
            }
        }
        
        this.validateUniqueAndNonNull = function (primaryKeys, nonNullKeys, item) {
            if ((!primaryKeys || primaryKeys.length == 0) && (!nonNullKeys || nonNullKeys.length == 0)) {
                return {};
            }
            var that = this;
            var dhtmlxStoredata = this.dhtmlxDatastore.data;
            var ids = dhtmlxStoredata.order;
            
            var keysValuesMap = {}; //已存在的主键值，多个字段以'_'连接
            var keyRepeat = []; //主键重复
            var keyNonNull = []; //非空
            for (var i = 0; i < ids.length; i++) {
                var el = dhtmlxStoredata.pull[ids[i]];
                var keyValues = primaryKeys.map(function (v) { return el[v] });
                var key_value = keyValues.join("_");
                //主键存在重复
                if (keysValuesMap[key_value]) {
                    keysValuesMap[key_value].pos.push(i);
                    if (keyRepeat.indexOf(key_value) == -1) {
                        keyRepeat.push(key_value);
                    }
                }
                else {
                    keysValuesMap[key_value] = {
                        pos: [i],
                        keys: primaryKeys,
                        value: keyValues
                    };
                }
                //非空校验
                var nullFieldsValues = nonNullKeys.map(function (v) { return el[v] });
                if (nullFieldsValues.filter(function (v) { return v === null || v === "" || v === undefined }).length > 0) {
                    keyNonNull.push({
                        pos: [i],
                        keys: nonNullKeys,
                        value: nullFieldsValues
                    });
                }
            }
            return {
                repeat: keyRepeat.map(function (v) { return keysValuesMap[v] }),
                nullValue: keyNonNull
            }
        }

        /*
        * 保存入库
        */
        this.submit = function (success, error, onlyReturnData) {
            var that = this;
            var dhtmlxStoredata = this.dhtmlxDatastore.data;
            var ids = dhtmlxStoredata.order;
            var changedIds = [];
            var saveDatas = [];

            function replaceExpVariables(exp, data){
                var variables = that.hwReport.rptExpress.getExpVariables(exp);
                for(var i = 0; i < variables.length; i++){
                    var varType = variables[i].type;
                    var varName = variables[i].name;
                    var vaule = "";
                    if(varType == "reportvar" || varType == "vmdvar"){
                        vaule = that.hwReport.getValue(varName);
                        exp = exp.replace(RegExp("(?<!\\.)\\b" + varName + "\\b", "g"), vaule);
                    }
                    else if(varType == "cell_approve" || varType == "cell_uploader"|| varType == "cell_combo"|| varType == "cell"){
                        var filterByVarName = that.bindRules.filter(function(v){
                            return v.cellid == varName || v.cellid.split(".")[0] == varName;
                        });
                        if(filterByVarName && filterByVarName.length > 0){
                            vaule = data[filterByVarName[0].fieldname];
                        }
                        else{
                            vaule = that.hwReport.getValue(varName);
                        }
                        exp = exp.replace(RegExp("(?<!\\.)\\b" + varName + "\\b", "g"), vaule);
                    }
                    else if(varType == "ds"){
                        if(varName.split(".")[0] == that.name){
                            vaule = data[varName.split(".")[1]];
                        }
                        else {
                            vaule = that.hwReport.getValue(varName);
                        }
                        exp = exp.replace(RegExp(varName, "g"), vaule);
                    }
                }
                exp = exp == "" ? "\"\"" : exp;
                return exp;
            }

            function validateSaveRule(itemData){
                if(!that.saveRuleParse){
                    return true;
                }

                var operator = that.saveRuleParse.operator;
                var leftExpress = that.saveRuleParse.leftExpress;
                var rightExpress = that.saveRuleParse.rightExpress;

                var leftReplaceResult = replaceExpVariables(leftExpress, itemData);
                var rightReplaceResult = replaceExpVariables(rightExpress, itemData);

                if(eval(leftReplaceResult + operator + rightReplaceResult)){
                    return true;
                }

                return false;
            }

            for (var i = 0; i < ids.length; i++) {
                var el = dhtmlxStoredata.pull[ids[i]];
                var oel = (dhtmlxStoredata.opull || dhtmlxStoredata.pull)[ids[i]];
                if (!validateSaveRule(el) || el._rowState == "ignore") {
                    continue;
                }
                if (el._splitFields && el._splitFields.length > 0 && el[el._splitFields[0]]) {
                    var n = el[el._splitFields[0]].split(",").length;
                    for (var j = 0; j < n; j++) {
                        var r = {
                            Value: {},
                            OldValue: {},
                            rowState: "nochange"
                        };
                        for (var key in el) {
                            if (!el.hasOwnProperty(key) || key == "_upload_state" || key == "_rowState" || key == "id" || key == "_splitFields") {
                                continue;
                            }
                            if (el._splitFields.indexOf(key) != -1) {
                                r.Value[key == "__id" ? "id" : key] = el[key].split(",")[j];
                            }
                            else {
                                r.Value[key == "__id" ? "id" : key] = el[key];
                            }
                        }
                        for (var key in oel) {
                            if (!oel.hasOwnProperty(key)) {
                                continue;
                            }
                            if (el._splitFields.indexOf(key) != -1) {
                                r.OldValue[key == "__id" ? "id" : key] = oel[key].split(",")[j];
                            }
                            else {
                                r.OldValue[key == "__id" ? "id" : key] = oel[key];
                            }
                        }

                        var _upload_state = el["_upload_state"] || Array.apply(null, Array(n)).map(function () { return "nochange" }).join(",");
                        r.rowState = that.nochangenoupdate ? _upload_state.split(",")[j] :
                            (_upload_state.split(",")[j] == "nochange" ? "save" : _upload_state.split(",")[j]);
                        //过滤掉数据没发生变化的项
                        if (r.rowState == "nochange" || r.rowState == undefined) {
                            continue;
                        }
                        if (r.rowState == "update" || r.rowState == "add") {
                            r.rowState = "save";
                        }
                        //重新获取非单元格的值，如可视化中的变量等
                        for (var k = 0; k < that.bindRules.length; k++) {
                            var bindRule = that.bindRules[k];
                            //可视化变量、复合表达式、数据集等
                            if (r.Value.hasOwnProperty(bindRule.fieldname) && ["vmdvar", "", "ds"].indexOf(that.hwReport.checkParamType(bindRule.cellid)) != -1) {
                                r.Value[bindRule.fieldname] = that.hwReport.getValue(bindRule.cellid);
                            }
                        }
                        if (changedIds.indexOf(ids[i]) == -1) {
                            changedIds.push(ids[i]);
                        }
                        saveDatas.push(r);
                    }
                }
                else {
                    var r = {
                        Value: {},
                        OldValue: oel,
                        rowState: that.nochangenoupdate ? el._rowState : (el._rowState == "nochange" ? "save" : el._rowState)
                    };
                    //过滤掉数据没发生变化的项
                    if (r.rowState == "nochange" || r.rowState == undefined) {
                        continue;
                    }
                    if (r.rowState == "update" || r.rowState == "add") {
                        r.rowState = "save";
                    }
                    for (var key in el) {
                        if (!el.hasOwnProperty(key) || key == "_upload_state" || key == "_rowState" || key == "id" || key == "_splitFields") {
                            continue;
                        }
                        r.Value[key == "__id" ? "id" : key] = el[key];
                    }
                    //重新获取非单元格的值，如可视化中的变量等
                    for (var k = 0; k < that.bindRules.length; k++) {
                        var bindRule = that.bindRules[k];
                        //可视化变量、复合表达式、数据集等
                        if (r.Value.hasOwnProperty(bindRule.fieldname) && ["vmdvar", "", "ds"].indexOf(that.hwReport.checkParamType(bindRule.cellid)) != -1) {
                            r.Value[bindRule.fieldname] = that.hwReport.getValue(bindRule.cellid);
                        }
                    }
                    if (changedIds.indexOf(ids[i]) == -1) {
                        changedIds.push(ids[i]);
                    }
                    saveDatas.push(r);
                }
            }
            //有删除
            if (dhtmlxStoredata.dpull) {
                for (var id in dhtmlxStoredata.dpull) {
                    var r = {
                        Value: {},
                        OldValue: {},
                        rowState: "delete"
                    };
                    var el = dhtmlxStoredata.dpull[id];
                    for (var key in el) {
                        if (!el.hasOwnProperty(key) || key == "_upload_state" || key == "_rowState" || key == "id" || key == "_splitFields") {
                            continue;
                        }
                        r.Value[key == "__id" ? "id" : key] = el[key];
                        r.OldValue[key == "__id" ? "id" : key] = el[key];
                    }
                    saveDatas.push(r);
                }
            }
            if (onlyReturnData) {
                return saveDatas;
            }
            if (!this.saveserver.path) {
                error.apply(this, ["保存入库服务'" + that.name + "'路径配置不正确，请重新配置！"])
                return;
            }

            this.dataRequestCompleted = false;
            hwDas.save({ host: vmd.MicService.getDasIp(), url: this.saveserver.path || "" },
                { Ecylogin: Ext.util.Cookies.get('EcyLogin') || Ext.util.Cookies.get('ecyLogin') },
                {},
                saveDatas,
                function (result) {
                    that.dataRequestCompleted = true;
                    if (result.isSucceed) {
                        that.dataRequestSuccess = true;

                        for (var i = changedIds.length - 1; i >= 0; i--) {
                            var el = dhtmlxStoredata.pull[changedIds[i]];
                            var oel = dhtmlxStoredata.opull && dhtmlxStoredata.opull[changedIds[i]];
                            if (el._rowState == "update" || el._rowState == "add" || el._rowState == "save") {
                                el._rowState = "nochange";
                                if (el._upload_state) {
                                    el._upload_state = el._upload_state.replace(/save/g, "nochange");
                                }
                                if (!oel) {
                                    continue;
                                }
                                for (var key in el) {
                                    if (!el.hasOwnProperty(key) || key == "_upload_state" || key == "_rowState" || key == "id" || key == "_splitFields") {
                                        continue;
                                    }
                                    oel[key] = el[key];
                                }
                            }
                            dhtmlxStoredata.dpull = {};
                        }

                        if (that.hwReport && that.hwReport.grid.changedUploadCells) {
                            for (var cellid in that.hwReport.grid.changedUploadCells) {
                                var uploadCell = that.hwReport.grid.changedUploadCells[cellid];
                                var uploader = uploadCell.cell._uploader;
                                for (var fileId in uploader._files) {
                                    uploader._files[fileId].server = true;
                                    uploader._files[fileId].storageState = "nochange";
                                }
                                uploader._delFiles = {};
                            }
                        }

                        if (success) {
                            success.apply(that, []);
                        }
                    }
                    else {
                        that.dataRequestSuccess = false;
                        if (error) {
                            error.apply(that, [msg]);
                        }
                    }
                },
                function (msg) {
                    that.dataRequestCompleted = true;
                    that.dataRequestSuccess = false;
                    if (error) {
                        error.apply(that, [msg]);
                    }
                });
        }
    }

    window.HwRptStore = RptStore;
    /**
    * 矩阵对象
    */
    function RptMatrix(hwReport) {
        this.hwReport = hwReport;
        this.rows = [];

        this.generate = function (rows, cols) {
            this.rows = Array.apply(null, Array(rows)).map(function () { return Array(cols) });
        }

        this.addRow = function (row, index) {
            defined(index) ? this.rows.splice(index, 0, row) : this.rows.push(row);
        }

        this.getRows = function (start, end) {
            start = defined(start) ? start : 0;
            end = defined(end) ? end : this.rows.length;
            return this.rows.slice(start, end);
        }

        this.each = function (func) {
            var dimesion = this.getDimesions();
            for (var i = 0; i < dimesion.rows; i++) {
                for (var j = 0; j < dimesion.cols; j++) {
                    func.apply(this, [(this.rows[i].cells || this.rows[i])[j], i, j]);
                }
            }
        }

        //从指定位置开始填充矩阵
        this.fill = function (startRow, startCol, matrix) {
            var dimesion = matrix.getDimesions();
            for (var i = 0; i < dimesion.rows; i++) {
                for (var j = 0; j < dimesion.cols; j++) {
                    this.rows[startRow + i][startCol + j] = matrix.rows[i][j];
                }
            }
        }

        /**
        * 获取矩阵的行列数
        */
        this.getDimesions = function () {
            return {
                rows: this.rows.length,
                cols: this.rows.length ? (this.rows[0].cells || this.rows[0]).length : 0
            }
        }

        /**
        * 处理合并行，设置被合并单元格的mergedrow(合并这个单元格的单元格rowId)
        */
        this.dealMerge = function (fromRow, toRow) {
            fromRow = fromRow || 0;
            toRow = toRow || this.rows.length;
            var cursorRowCells = {};
            for (var i = fromRow; i < toRow; i++) {
                var row = this.rows[i];
                var cursorColCell = null;
                for (var j = 0; j < row.cells.length; j++) {
                    var c = row.cells[j];
                    if (c.merge == 0) {
                        cursorColCell = null;
                        cursorRowCells[j] = null;
                    }
                    if (c.merge == 1) {
                        cursorRowCells[j] = c;
                        cursorColCell = c;
                    }
                    else if (c.merge == 2) {
                        cursorColCell && (c.mergedcol = cursorColCell.index);
                        cursorRowCells[c.index] && (c.mergedrow = cursorRowCells[c.index].rptRow.id);
                    }
                }
            }
        }

        this.getJSON = function (fromRow, toRow, ignores, enattr) {
            fromRow = fromRow || 0;
            toRow = toRow || this.rows.length;
            var rows = [];
            for (var i = fromRow; i < toRow; i++) {
                rows.push(this.rows[i].getJSON(ignores, enattr));
            }
            return rows;
        }
    }

    /**
     * 说明：分栏
     */
    function RptSubfield() {
        this.m_subfieldTypeWraper = "";//分栏方向
        this.subfieldCount = "";//栏数
        this.showSeparator = "";//分隔线
        this.subfieldSpace = "";//栏间距
        this.m_subfieldApplaycationWraper = "";//应用范围
        this.subCondition = "";//分栏条件
        this.subfieldId = "";
        this.startRow = "";//起始行
        this.endRow = "";//结束行
        this.startCol = "";//起始列
        this.endCol = "";//终止列
    }

    /**
    * 报表对象
    */
    function BaseReport(vmdreport, panelEl, container, width, height, isSubReport, gridAutoWidth, gridAutoHeight, subReportType) {
        tablehost = vmd.MicService.getDasIp();
        reporthost = vmd.MicService.getReportIp();
        this.isEqual = isEqual;
        this.isEmpty = isEmpty;
        this.isEmptyObject = isEmpty;
        this.showAlert = showAlert;
        this.defined = defined;
        this.replaceToHtmltag = replaceToHtmltag;
        this.insertRule = insertRule;
        this.checkdhtmlxMessage = checkdhtmlxMessage;

        this.vmdreport = vmdreport;
        this.dhtmxlUrl = dhtmxlUrl;
        this.panelEl = panelEl || (vmdreport.ownerCt.body || vmdreport.ownerCt.el).dom;

        this.disabled = false;
        this.multiselect = false;
        this.selecteStates = true; //是否启用选中状态
        this.columnResize = false; //列宽是否可以调整
        this._titleFloat = true; //标题是否浮动
        this.patchLastColIfLessWinW = false; //如果网格宽度小于窗口宽度是否补足最后一列
        this.autoWidth = !width;
        this.autoHeight = !height;
        this.width = this.autoWidth ? getElementWidth(this.panelEl) : width;
        this.height = this.autoHeight ? getElementHeight(this.panelEl) : height;
        this.rptContainer = container; //报表容器
        this.gridContainer = null; //报表中dhtmlxGrid对象的容器，一般情况下与报表容器是同一个，只有当有分页时报表容器包含grid容器和分页组件容器
        this._seed = 0;//new Date().valueOf();
        this.skin = dhtmlx.skin ? ("gridbox_" + dhtmlx.skin) : "gridbox_material";
        this.classPrefixs = ["div." + this.skin + ".gridbox table.obj.row20px tr td", "div." + this.skin + ".gridbox table.hdr td"];
        
        this.reportId = this.rptContainer.getAttribute("id");

        this.gridAutoWidth = gridAutoWidth; //列宽自动缩放适应宽度
        this.gridAutoHeight = gridAutoHeight; //网格高度自动调整
        this.isSubReport = isSubReport;
        this.subReportType = subReportType;

        //分页和滚动
        this.pageConainerHeight = 55; //分页工具栏高度
        this.loadMode = ""; //加载模式，“paging”:分页，“smart”：滚动
        this.pageSize = 0;//分页或滚动时每页容量

        //打印设置(各项信息默认值)
        this.rptPageSet = new RptPageSet(this);
        if (debugStatus) {
            hwDas.debugStatus = "open";
        }
        
        window.dhx4._eventable(this);
        this.attachEvents();
   
    }

    BaseReport.prototype = {

        addRowDom: function (newId, srcIndex, insertInd, carrys) {
            var that = this;
            var grid = this.grid;
            var rowSpanCells = [];
            if (!defined(srcIndex)) {
                srcIndex = (grid.getSelectedRowId() && grid.getRowIndex(grid.getSelectedRowId())) || (grid.getRowsNum() - 1);
            }
            else if (srcIndex < 0) {
                srcIndex = grid.getRowsNum() - 1 + srcIndex;
            }
            if (srcIndex < 0) {
                srcIndex = 0;
            }
            if (srcIndex >= grid.getRowsNum()) {
                srcIndex = grid.getRowsNum() - 1;
            }

            if (!defined(insertInd)) {
                insertInd = srcIndex + 1;
            }
            else if (insertInd < 0) {
                insertInd = grid.getRowsNum() + insertInd;
            }

            if (insertInd < 0) {
                insertInd = 0;
            }
            else if (insertInd > grid.getRowsNum()) {
                insertInd = grid.getRowsNum();
            }

            var r = grid.rowsAr[grid.getRowId(srcIndex)] || this._deletedLastRow;
            var _attrs = (r && dhx4._copyObj(r._attrs)) || [];
            carrys = carrys && carrys.map(function (v) {
                var col;
                if (/^[A-Za-z]+\d+$/.test(v)) {
                    var rowCols = convertToRowCol(v);
                    col = rowCols.col;
                }
                else if (/\d+/.test(v)) {
                    col = v;
                }
                if (defined(col) && col >= 0 && col < grid.getColumnsNum()) {
                    return col;
                }
                return null;
            }).filter(function (v) { return v != null });
            _attrs.forEach(function (currentValue, index, arr) {
                if (currentValue.rowspan > 0) {
                    rowSpanCells.push({
                        rowId: newId,
                        cellIndex: index,
                        rowSpan: currentValue.rowspan
                    })
                }
                if (currentValue.type == "ro") {
                    return;
                }
                if (!carrys || carrys.indexOf(index) == -1) {
                    currentValue.data = "";
                }
                else {
                    currentValue.data = grid.cells3(r, index).getValue();
                }
            });
            grid.addRowCustom(newId, _attrs, insertInd);
            return {
                rowSpanCells: rowSpanCells
            }
        },

        /**
        * 添加行
        * newId:新添加的行id，srcIndex：要拷贝的行索引，insertInd：添加位置 carrys要携带的单元格
        */
        addRow: function (newId, srcIndex, insertInd, carrys) {
            newId = newId || (new Date()).valueOf();
            this.addRowDom(newId, srcIndex, insertInd, carrys);
            this.resetCounter();
            //添加行后向入库数据集中追加数据
            this.storageDataStores.each(function (key, _store, index) {
                _store.fillDataByAdd(newId);
            });
        },

        //ignoreGridRows: 插入的行数与网格行数无关，如果为false，则startRowIndex+rowsNum不能超过网格行数
        addRows: function (startRowIndex, rowsNum, insertInd, ignoreGridRows) {
            var that = this;
            var grid = this.grid;
            var newRowId = (new Date()).valueOf();
            var rowSpanCells = [];

            if (startRowIndex < 0) {
                startRowIndex = 0;
            }
            if (startRowIndex >= grid.getRowsNum()) {
                startRowIndex = grid.getRowsNum() - 1;
            }

            if (ignoreGridRows) {
                insertInd = insertInd == undefined ? startRowIndex : insertInd;
                for (var i = 0; i < rowsNum; i++) {
                    var result = this.addRowDom(newRowId + i, startRowIndex, insertInd, []);
                    rowSpanCells = rowSpanCells.concat(result.rowSpanCells);
                }
            }
            else {
                if ((startRowIndex + rowsNum) > grid.getRowsNum()) {
                    rowsNum = grid.getRowsNum() - startRowIndex;
                }
                if (!defined(that._addRows_insertInd)) {
                    var insertInd = grid.getRowsNum() - (startRowIndex + rowsNum);
                    if (insertInd == 0) {
                        that._addRows_insertInd = 0;
                    }
                    else {
                        that._addRows_insertInd = -insertInd;
                    }
                }
                if (that._addRows_insertInd == 0) {
                    for (var i = 0; i < rowsNum; i++) {
                        var result = this.addRowDom(newRowId + i, startRowIndex + i, grid.getRowsNum(), []);
                        rowSpanCells = rowSpanCells.concat(result.rowSpanCells);
                    }
                }
                else {
                    for (var i = 0; i < rowsNum; i++) {
                        var result = this.addRowDom(newRowId + i, startRowIndex + i, that._addRows_insertInd, []);
                        rowSpanCells = rowSpanCells.concat(result.rowSpanCells);
                    }
                }
            }

            for (var i = 0; i < rowSpanCells.length; i++) {
                var rowSpanCell = rowSpanCells[i];
                grid.setRowspan(rowSpanCell.rowId, rowSpanCell.cellIndex, rowSpanCell.rowSpan);
            }
            this.resetCounter();
            //添加行后向入库数据集中追加数据
            this.storageDataStores.each(function (key, _store, index) {
                _store.fillDataByAdd(newRowId, rowsNum);
            });
        },

        /**
        * 对模板进行分析，分析模板是简单网格、分组报表或是填报等；
        */
        analysis: function () {
            var that = this;
            //分析单元格
            function analysisCell(section, row, cell) {

                //处理表达式
                if (cell.showvalue) {
                    var nameR = that.rptExpress.getDsName(cell.showvalue);
                    var fieldR = that.rptExpress.getDsField(cell.showvalue);
                    if (nameR.flag && fieldR.flag) {
                        for (var m = 0; m < nameR.nameArr.length; m++) {
                            var dsname = nameR.nameArr[m];
                            var queryStore = that.getQueryStoreByName(dsname);
                            if (!queryStore) {
                                continue;
                            }
                            queryStore.relativeCells.push(cell);
                            //显示值在前台处理，所以不需要把数据集传递到后台，这里记录一下哪些数据集是在单元格显示值中使用过的
                            if (that.requestDsNames.indexOf(dsname) == -1) {
                                that.requestDsNames.push(dsname);
                            }
                        }
                    }
                }
                else if (cell.datavalue) {
                    var nameR = that.rptExpress.getDsName(cell.datavalue);
                    var fieldR = that.rptExpress.getDsField(cell.datavalue);
                    cell.dsFunc = that.rptExpress.getDsFunc(cell.datavalue);
                    if (cell.isRoutine()) {
                        that.expressCell.route.push(cell);
                    }
                    if (nameR.flag && fieldR.flag) {
                        cell.dsName = nameR.nameArr;
                        for (var m = 0; m < cell.dsName.length; m++) {
                            var dsname = cell.dsName[m];
                            var queryStore = that.getQueryStoreByName(dsname);
                            if (queryStore) {
                                queryStore.relativeCells.push(cell);

                                if (section.dsNames.indexOf(dsname) == -1) {
                                    section.dsNames.push(dsname);
                                }

                                //标题或者表头中的数据集需要重新查询
                                if ((cell.isHeader || cell.isTitle) && that.requestDsNames.indexOf(dsname) == -1) {
                                    that.requestDsNames.push(dsname);
                                }
                            }
                        }
                        cell.dsField = fieldR.fieldArr;
                    } else {
                        cell.usermsg = nameR.usermsg;
                        cell.errormsg = nameR.errormsg;
                    }
                }

                var cellType = that.cellTypes.get(cell.fillcelltype);
                var tablename = cellType && cellType.bindsource && cellType.bindsource.tablename;
                var bindStore = tablename && that.getQueryStoreByName(tablename);
                if (cell.getType() == "vmdcombo") {
                    that._cell_combos[cell.id] = cellType;
                    if (bindStore) {
                        //下拉框绑定的数据集需要前台查询
                        if (that.requestDsNames.indexOf(tablename) == -1) {
                            that.requestDsNames.push(tablename);
                        }
                        bindStore.combos = bindStore.combos || [];
                        bindStore.combos.push(cell.id);
                    }
                }
                else if (cell.getType() == "vmdtree") {
                    that._cell_trees[cell.id] = cellType;
                    if (bindStore) {
                        //下拉树绑定的数据集需要前台查询
                        if (that.requestDsNames.indexOf(tablename) == -1) {
                            that.requestDsNames.push(tablename);
                        }
                        bindStore.trees = bindStore.trees || [];
                        bindStore.trees.push(cell.id);
                    }
                }
                else if (cell.getType() == "vmdgrid") {
                    that._cell_grids[cell.id] = cellType;
                    if (bindStore) {
                        //下拉网格绑定的数据集需要前台查询
                        if (that.requestDsNames.indexOf(tablename) == -1) {
                            that.requestDsNames.push(tablename);
                        }
                        bindStore.grids = bindStore.grids || [];
                        bindStore.grids.push(cell.id);
                    }
                }
                else if (cell.getType() == "vmdupload") {
                    if (bindStore) {
                        //下拉网格绑定的数据集需要前台查询
                        if (that.requestDsNames.indexOf(tablename) == -1) {
                            that.requestDsNames.push(tablename);
                        }
                    }
                }
                else if (cell.getType() == "vmdcheckbox") {
                    if (bindStore) {
                        //下拉网格绑定的数据集需要前台查询
                        if (that.requestDsNames.indexOf(tablename) == -1) {
                            that.requestDsNames.push(tablename);
                        }
                    }
                }
                else if (cell.getType() == "vmdapprove") {
                    var approve_relativeStores = []; //与审批组件相关的数据集
                    for (var m = 0; m < cellType.items.length; m++) {
                        var item = cellType.items[m];
                        var labelvalue = dhx4.trim(item.labelvalue || "");
                        if (labelvalue.indexOf("=") == 0) {
                            labelvalue = labelvalue.replace("=", "");
                            var storeName = labelvalue.split(".")[0];
                            var rptStore = storeName && that.getQueryStoreByName(storeName);
                            if (rptStore && approve_relativeStores.indexOf(storeName) == -1) {
                                approve_relativeStores.push(storeName);
                            }
                        }
                        var value = dhx4.trim(item.value || "");
                        if (value.indexOf("=") == 0) {
                            value = value.replace("=", "");
                            var storeName = value.split(".")[0];
                            var rptStore = storeName && that.getQueryStoreByName(storeName);
                            if (rptStore && approve_relativeStores.indexOf(storeName) == -1) {
                                approve_relativeStores.push(storeName);
                            }
                        }
                        var namepicture = dhx4.trim(item.namepicture || ""); //审批人签名
                        if (namepicture.indexOf("=") == 0) {
                            namepicture = namepicture.replace("=", "");
                            var storeName = namepicture.split(".")[0];
                            var rptStore = storeName && that.getQueryStoreByName(storeName);
                            if (rptStore && approve_relativeStores.indexOf(storeName) == -1) {
                                approve_relativeStores.push(storeName);
                            }
                        }
                        var src = dhx4.trim(item.src || ""); //审批章图片地址
                        if (src.indexOf("=") == 0) {
                            src = src.replace("=", "");
                            var storeName = src.split(".")[0];
                            var rptStore = storeName && that.getQueryStoreByName(storeName);
                            if (rptStore && approve_relativeStores.indexOf(storeName) == -1) {
                                approve_relativeStores.push(storeName);
                            }
                        }
                    }
                    for (var m = 0; m < approve_relativeStores.length; m++) {
                        var storeName = approve_relativeStores[m];
                        if (that.requestDsNames.indexOf(storeName) == -1) {
                            that.requestDsNames.push(storeName);
                        }
                        var rptStore = that.getQueryStoreByName(storeName);
                        rptStore.relativeCells.push(cell);
                    }
                }

                //分析报表是分组还是简单查询
                if (cell.dsFunc == "select") {
                    that.expressCell.select.push(cell);
                    that.rptType = that.rptType == "group" ? "group" : "select";
                    if(cell.rowspan){
                       var lastRow=cell.rowIndex+parseInt(cell.rowspan);
                        if(that.lastRow){
                            if(that.lastRow<lastRow){
                               that.lastRow=lastRow;  
                            }   
                        }else{
                            that.lastRow=lastRow; 
                        }  
                    }
                    else{
                        if(that.rowNum>cell.rowIndex+1){
                            if(that.lastRow){
                                if(that.lastRow<cell.rowIndex+1)
                                {
                                    that.lastRow=cell.rowIndex+1; 
                                }
                            }
                            else{
                               that.lastRow=cell.rowIndex+1; 
                            }
                        }
                    }
                }
                else if (cell.dsFunc == "group") {
                    that.expressCell.group.push(cell);
                    that.rptType = "group";
                    if(cell.rowspan){
                        var lastRow=cell.rowIndex+parseInt(cell.rowspan);
                            if(that.lastRow){
                                if(that.lastRow<lastRow){
                                    that.lastRow=lastRow;  
                                }   
                            }else{
                               that.lastRow=lastRow; 
                            }   
                     }
                     else{
                            if(that.lastRow){
                                if(that.lastRow<cell.rowIndex+1)
                                {
                                    that.lastRow=cell.rowIndex+1; 
                                }
                            }
                            else{
                               that.lastRow=cell.rowIndex+1; 
                            }
                     }
                }

                //存储同值合并的单元格
                if (cell.rightMerged || cell.bottomMerged) {
                    that.sameValueMergedCells.push(cell);
                }

                //分析是横向扩展还是纵向扩展
                if (cell.expand == 1) {
                    //扩展类型:不扩展 v-纵向扩展， h-横向扩展，c-交叉表
                    that.expandType = (that.expandType == "c" || that.expandType == "v") ? "c" : "h";
                }
                else if (cell.expand == 2) {
                    that.expandType = (that.expandType == "c" || that.expandType == "h") ? "c" : "v";
                }
            }

            //分析行
            function analysisRow(section, row) {
                var firstColCell, lastColCell;

                for (var i = 0; i < row.cells.length; i++) {
                    var cell = row.cells[i];
                    if (!firstColCell && row.sectionStartCol == 1 && (row.colWidth[i] != 0 || (cell.colspan > 1 && (row.colWidth.slice(i + (row.sectionStartCol - 1), cell.colspan).reduce(function (total, num) { return total + num }, 0) > 0)))) {
                        firstColCell = cell;
                    }
                    if (row.colWidth[i]) {
                        lastColCell = cell;
                    }

                    cell.setIsFirstRowCell(row.isFirstRow);
                    cell.setIsHeaderCell(row.isHeader);
                    cell.setIsTitleCell(row.isTitle);
                    analysisCell(section, row, cell);
                }

                if (firstColCell) {
                    firstColCell.isFirstCol = true;
                }
                if (lastColCell) {
                    lastColCell.isLastCol = true;
                }
            }

            //分析片
            function analysisSection(section) {
                var originalMatrix = section.originalMatrix;
                section.dsNames = [];
                var firstRow = false;
                for (var i = 0; i < originalMatrix.rows.length; i++) {
                    var row = originalMatrix.rows[i];

                    if (row.height > 0 && !firstRow && section.startRow == 1) {
                        firstRow = true;
                        row.setIsFirstRow();
                    }
                    analysisRow(section, row);
                }
                if(that.lastRow){
                    for(var c=that.lastRow;c< originalMatrix.rows.length;c++){
                        that.lastRows.push(c);
                    }
                }
            }

            for (var i = 0; i < this.sections.length; i++) {
                var section = this.sections[i];
                analysisSection(section);
                for (var j = 0; j < section.dsNames.length; j++) {
                    if (this.dataBindStoreNames.indexOf(section.dsNames[j]) == -1) {
                        this.dataBindStoreNames.push(section.dsNames[j]);
                    }
                }
            }

            //右键菜单数据前端查询
            this.menus.each(function (key, _menu, index) {
                if (_menu.source == "1" && _menu.sets && that.requestDsNames.indexOf(_menu.sets) == -1) {
                    that.requestDsNames.push(_menu.sets);
                }
            });

            //分析入库数据集中所入单元格的左父关系
            this.storageDataStores.each(function (key, _store, index) {
                var bindRules = _store.bindRules;
                var dataCellIndex;
                var hasCrossCell = false;
                for (var i = 0; i < bindRules.length; i++) {
                    var cellid = bindRules[i].cellid;
                    var paramType = that.checkParamType(cellid);
                    var oCell;

                    if (paramType == "cell_uploader" || paramType == "cell_approve" || paramType == "cell_combo") {
                        oCell = that.getOriginCellByLetter(cellid.split(".")[0]);
                    }
                    else if (paramType == "cell") {
                        oCell = that.getOriginCellByLetter(cellid);
                    }
                    else {
                        continue;
                    }

                    if (!oCell.isHeader && !oCell.isTitle && !defined(dataCellIndex)) {
                        dataCellIndex = i;
                    }

                    //如果当前单元格属于扩展行中，则以此单元格为基准进行入库数据集的获取
                    var cell_hp = that.getExpandParent(oCell, "hparent");
                    var cell_vp = that.getExpandParent(oCell, "vparent");

                    if ((cell_hp && /select|group/g.test(cell_hp.dsFunc)) && (cell_vp && /select|group/g.test(cell_vp.dsFunc))) {
                        _store.baseIndex = i;
                        hasCrossCell = true;
                        if (oCell.dsFunc == "select") {
                            _store.baseIndex = i;
                            break;
                        }
                    }
                    else if ((cell_hp && /select|group/g.test(cell_hp.dsFunc)) || (cell_vp && /select|group/g.test(cell_vp.dsFunc))) {
                        if (!hasCrossCell) {
                            _store.baseIndex = i;
                        }
                        if (oCell.dsFunc == "select") {
                            _store.baseIndex = i;
                            break;
                        }
                    }
                }
                if (!defined(_store.baseIndex) && defined(dataCellIndex)) {
                    _store.baseIndex = dataCellIndex;
                }
            });
        },

        //将合并单元格添加到下一行中
        appendMergeCellToNextRow: function (row, mergedCell) {
            var nextRow = row.nextSibling;
            var index = pick(mergedCell.cell._cellIndexS, mergedCell.cell._cellIndex);
            var beforeTD = this.findInsertBeforeCell(nextRow, index);
            mergedCell.cell.rowSpan -= 1;
            mergedCell.cell._attrs._cRowId = nextRow.idd;
            mergedCell.cell._attrs._sRowId = nextRow.idd;
            nextRow._attrs[index]._cRowId = nextRow.idd;

            var newTD = document.createElement("TD");
            newTD._cellType = "ro";
            newTD._cellIndex = mergedCell.cell._cellIndex;
            newTD._attrs = mergedCell.cell._attrs;
            row.insertBefore(newTD, mergedCell.cell);
            if (beforeTD) {
                nextRow.insertBefore(mergedCell.cell, beforeTD);
            }
            else {
                nextRow.appendChild(mergedCell.cell);
            }

            var oCell = this.getOriginCellById(mergedCell.cell._attrs.sid);
            oCell.childs.push(mergedCell.cell.parentNode.idd + "_" + mergedCell.cell._cellIndex);
        },

        attachEvents: function () {
            var that = this;
            dhx4.attachEvent("onLoadXMLError", function (error, msg) {
                that.callEvent("onLoadXMLError", [error, msg]);
            });

            this.attachEvent("onLoadXMLError", function (error, msg) {
                showAlert("JSON格式不正确！", "JSON数据：" + msg, "error");
            });

            //左键超链接
            this.attachEvent("onLeftLinkClick", function (grid, cell, params) {
                var oCell = that.getOriginCellById(cell.cell._attrs.sid);
                if (oCell.eventId) {
                    var event = that.events.get(oCell.eventId);
                    var rId, cInd;
                    if (oCell.isTitle || oCell.isHeader) {
                        rId = null;
                        cInd = cell.cell.parentNode._cellIndex;
                    }
                    else {
                        rId = cell.cell.parentNode.idd;
                        cInd = cell.cell._cellIndex;
                    }
                    that.vmdreport.fireEvent(event && event.click, that, that.grid, cell, params || "");
                }
            });

            this.attachEvent("onApproval", function (grid, rId, cInd, result, params) {
                var cellObj = that.grid.cells(rId, cInd);
                var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                if (oCell.eventId) {
                    var event = that.events.get(oCell.eventId);
                    that.vmdreport.fireEvent(event && event.approval, that, rId, cInd, result, params || {});
                }
            });

            this.attachEvent("onRendered", function () {
                that.setSize();
                that.setPosition();
                that.fillStorageOnRendered("nochange");
                that.updateRelativeCells();//刷新定义显示值的单元格
                that.mergeSameValueCells(); //同值合并单元格
                that.resetCounter();
                that.vmdreport.fireEvent('reportrendered', that);
            });

            this.attachEvent("onEditRow", function (buttonType, rId, cInd) {
                that.grid.editStop();
                switch (buttonType) {
                    case "add":
                        var buttonCellObj = that.grid.cells(rId, cInd);
                        var oCell = buttonCellObj && that.getOriginCellById(buttonCellObj.cell._attrs.sid);
                        var cellType = oCell && that.cellTypes.get(oCell.fillcelltype);

                        var carrys = ((cellType && cellType.carrycol) || "").split(",").filter(function (v) { return !!v }); //携带的单元格列索引
                        that.addRow((new Date()).valueOf(), that.grid.getRowIndex(rId), null, carrys);
                        that.emptyRows = [];
                        break;
                    case "delete":
                        var buttonCellObj = that.grid.cells(rId, cInd);
                        var oCell = buttonCellObj && that.getOriginCellById(buttonCellObj.cell._attrs.sid);
                        var cellType = oCell && that.cellTypes.get(oCell.fillcelltype);
                        function deleteR() {
                            if (!cellType.lastdeleteonlydata || oCell.childs.length > 1) {
                                for (var i = buttonCellObj.cell.rowSpan - 1; i >= 0; i--) {
                                    var deleteRowIndex = that.grid.getRowIndex(rId);
                                    that.deleteRow(deleteRowIndex + i);
                                }
                                return;
                            }

                            for (var i = 0; i < buttonCellObj.cell.rowSpan; i++) {
                                var deleteRowId = that.grid.getRowId(that.grid.getRowIndex(rId) + i);
                                if (that.emptyRows.indexOf(deleteRowId) != -1) {
                                    continue;
                                }

                                //删除行后入库数据集中对应数据删除
                                that.storageDataStores.each(function (key, _store, index) {
                                    _store.deleteDataByDelete(deleteRowId);
                                });
                                //最后一行只清空数据
                                that.grid.forEachCellsA(deleteRowId, function (cellObj, ind) {
                                    var oCell1 = that.getOriginCellById(cellObj.cell._attrs.sid);
                                    //需要清空数据的单元格类型
                                    var types = ["vmdeditor", "vmdupload", "vmdcheckbox", "vmdtree", "vmdgrid", "vmdcombo", "vmdlaydate", "vmdnum", "vmded", "vmdpassw","vmdlink"];
                                    if (types.indexOf(oCell1.getType()) != -1) {
                                        cellObj.setValue("");
                                        that.grid.callEvent("onCellChanged", [
                                            cellObj.cell.parentNode.idd,
                                            cellObj.cell._cellIndex,
                                            ""
                                        ]);
                                        cellObj.cell.className = cellObj.cell.className.replace(/[ ]*dhtmlx_validation_error1/g, "");
                                        that.grid.callEvent("onValidationCorrect", [
                                            cellObj.cell.parentNode.idd,
                                            cellObj.cell._cellIndex,
                                            ""
                                        ]);
                                    }
                                });
                                that.emptyRows.push(deleteRowId);
                            }
                        }
                        if (cellType.allowalert) {
                            Ext.Msg.confirm("删除提示", "是否删除记录？", function (btn) {
                                if (btn == 'yes') {
                                    deleteR();
                                }
                            })
                        }
                        else {
                            deleteR();
                        }
                        break;
                    case "edit":
                        break;
                    case "retract":
                        break;
                    case "expend":
                        break;
                    case "moveup":
                        that.moveUp(rId);
                        break;
                    case "movedown":
                        that.moveDown(rId);
                        break;
                    case "label":
                        var buttonCellObj = that.grid.cells(rId, cInd);
                        var oCell = buttonCellObj && that.getOriginCellById(buttonCellObj.cell._attrs.sid);
                        if (oCell.eventId && that.events.get(oCell.eventId)) {
                            var changeEvents = that.events.get(oCell.eventId).click;
                            if (vmd.isArray(changeEvents)) {
                                for (var i = 0; i < changeEvents.length; i++) {
                                    var ev = changeEvents[i];
                                }
                            }
                            else if (changeEvents) {
                                that.vmdreport.fireEvent(changeEvents, that, that.grid, buttonCellObj, rId, cInd);
                            }
                        }
                        break
                    default:
                        break;
                }
            });

            //
            this.attachEvent("onSectionSeverComplete", function () {
                if (vmd.preivewMode || vmd.previewMode) {//写报表开始执行信息
                    hwDas.save("CDEServcie/log/reportlog/addreportlog", {}, {}, { id: this.logInfoId }, function (result) { }, function (msg) { })
                }
                if (that._callback) {
                    that._callback.apply(that, []);
                }
                return true;
            });

            this.attachEvent("onSectionSeverSuccess", function () {
                //分组报表如果不是第一次请求过来的数据则进行整合
                if (that.loadMode == "smart" && (that.rptType == "group" || that.rptType == "select") && that.startIndex) {

                    // 滚动加载加载下一页时对应的grid的显示相应改变 参数： changeFrom 该位置其后的行均需要改变
                    var changeFrom = this.changeFrom;
                    var rowsNum = this.grid.getRowsNum();
                    for (var i = rowsNum - 1; i > changeFrom - this.headerLength - 1; i--) {
                        var rowID = this.grid.getRowId(i);
                        this.grid.deleteRow(rowID);
                    }

                    // 矩阵中获取并加载从上次删除行开始的完整数据
                    var dimesion = this.matrix.getDimesions();
                    var rows = dimesion.rows - this.headerLength;
                    var cols = dimesion.cols;
                    this.grid.parse({
                        colcount: cols,
                        rowcount: rows,
                        pos: changeFrom - this.headerLength,
                        datas: this.matrix.rows.slice(changeFrom)
                    }, "custom_json");
                    this.callEvent("onDynRendered", [this, changeFrom - this.headerLength, rows]);
                    return;
                }
                //分页请求，但不是点击分页按钮的数据返回
                if (that.loadMode == "paging" && !that._laypage) {
                    var limits = [10, 20, 30, 40, 50, 100];
                    if (limits.indexOf(that.getPageSize()) == -1) {
                        limits.unshift(that.getPageSize());
                    }
                    that._laypage = laypage.render({
                        elem: that.pageContainer, //指向存放分页的容器，值可以是容器ID、DOM对象
                        count: that.totalcount, //数据总数。一般通过服务端得到
                        limit: that.getPageSize(), //每页显示的条数。laypage将会借助 count 和 limit 计算出分页数
                        limits: limits, //每页条数的选择项。如果 layout 参数开启了 limit，则会出现每页条数的select选择框
                        layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                        jump: function (obj) {
                            var startIndex = (obj.curr - 1) * obj.limit;
                            var pageSize = obj.limit;

                            if ((that.pageSize || that.getPageSize()) != pageSize || that.startIndex != startIndex) {
                                that.pageSize = pageSize;
                                that.startIndex = startIndex;
                                that.updateDatastore(true);
                                that.resetCounter();
                            }
                        }
                    });
                }
                this.integrateMatrix();
                //加载
                var dimesion = this.matrix.getDimesions();
                var rows = dimesion.rows - this.headerLength;
                var cols = dimesion.cols;

                if (this.expandType == "c" || this.expandType == "h") {
                    this.clearGrid(true);
                    this.grid = null;
                    this.prepare();
                    this.initContainer();
                    this.initGrid();
                    this.attachGridEvent();
                }
                else {
                    this.clearGrid();
                    this.grid.parse({
                        colcount: cols,
                        rowcount: rows,
                        datas: this.matrix.rows.slice(this.headerLength)
                    }, "custom_json");
                }

                this.callEvent("onRendered", [this]);
            });
        },

        attachGridEvent: function () {
            var that = this;
            //调用单元格对象的setValue后会回调onCellChanged方法
            this.grid.attachEvent("onCellChanged", function (rId, cInd, nValue) {
                //更新入库数据集信息
				if(!rId||!cInd)
				{
					if(!(cInd==0)&&!rId)
					  return 
				}
					
                var cellObj;
                //表头单元格
                if (dhx._isObj(rId) && !defined(cInd)) { //表头单元格没有值
                    cellObj = rId;
                    rId = null;
                    cInd = cellObj.cell.parentNode._cellIndex;
					if(cellObj.cellType&&cellObj.cellType.type=="vmdch"&&this.hwReport&&this.hwReport.vmdreport&&this.hwReport.vmdreport.xtype=="vmd.datainput")
					{
						return
					}
                }
                else {
                    cellObj = that.grid.cells(rId, cInd);
                }
                nValue = nValue == '&nbsp;' ? "" : nValue;
                var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                var _bindSubmitStores = cellObj.cell._bindSubmitStores;
                if (_bindSubmitStores) {
                    for (var i = 0; i < _bindSubmitStores.length; i++) {
                        var bindStore = _bindSubmitStores[i];
                        var fieldName = bindStore.fieldName;
                        var storageStore = that.storageDataStores.get(bindStore.storeName);
                        if (cellObj.cell._cellType == "vmdupload") {
                            var tempNewValues = [];
                            var tempNewStates = [];
                            for (var j = 0; j < nValue.length; j++) {
                                tempNewValues.push(nValue[j][bindStore.key] || "");
                                tempNewStates.push(nValue[j]["state"]);
                            }
                            storageStore.updateValue(bindStore.dataId, fieldName, tempNewValues.join(","));
                            storageStore.updateValue(bindStore.dataId, "_upload_state", tempNewStates.join(","));
                            that.grid.changedUploadCells = that.grid.changedUploadCells || {};
                            that.grid.changedUploadCells[rId + "_" + cInd] = cellObj;
                        }
                        else if (cellObj.cell._cellType == "vmdapprove") {
                            storageStore.updateValue(bindStore.dataId, fieldName, nValue[bindStore.key]);
                        }
                        else {
                            storageStore.updateValue(bindStore.dataId, fieldName, nValue);
                        }
                    }
                }

                if (!that.disabled) {
                    //实时校验
                    var validataResult = that.validateCell(cellObj, rId, cInd, nValue);
                    //校验失败
                    if (validataResult && !validataResult.result && that.validateErrorCells.indexOf(rId + "_" + cInd) == -1) {
                        that._CellErrMsg = validataResult.errMsg;
                        that.validateErrorCells.push(rId + "_" + cInd);
                    }
                    else if (validataResult.result && that.validateErrorCells.indexOf(rId + "_" + cInd) != -1) {
                        that.validateErrorCells.splice(that.validateErrorCells.indexOf(rId + "_" + cInd), 1);
                    }
                }

                for (var i = that.emptyRows.length - 1; i >= 0; i--) {
                    if (that.emptyRows[i] == rId) {
                        that.emptyRows.splice(i, 1);
                        //添加行后向入库数据集中追加数据
                        that.storageDataStores.each(function (key, _store, index) {
                            _store.fillDataByAdd(rId);
                        });
                    }
                }
            });

            this.grid.attachEvent("onEditCell", function doOnEditCell(stage, rId, cInd, newValue, oldValue) {
                var cellObj;
                //表头单元格
                if (dhx._isObj(rId) && !defined(cInd)) { //表头单元格没有值
                    cellObj = rId;
                    rId = null;
                    cInd = cellObj.cell.parentNode._cellIndex;
                }
                else {
                    cellObj = that.grid.cells(rId, cInd);
                }
                var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);  
				if (stage == 0) {
                    if (oCell.eventId && that.events.get(oCell.eventId)) {
                        var changeEvents = that.events.get(oCell.eventId).beforeClick;
                        if (vmd.isArray(changeEvents)) {
                            for (var i = 0; i < changeEvents.length; i++) {
                                var ev = changeEvents[i];
                            }
                        }
                        else if (changeEvents) {
                            that.vmdreport.fireEvent(changeEvents, that, that.grid, cellObj, rId, cInd);
                        }
                    }
                }
                if (stage == 1) {
                    if (oCell.eventId && that.events.get(oCell.eventId)) {
                        var changeEvents = that.events.get(oCell.eventId).click;
                        if (vmd.isArray(changeEvents)) {
                            for (var i = 0; i < changeEvents.length; i++) {
                                var ev = changeEvents[i];
                            }
                        }
                        else if (changeEvents) {
                            that.vmdreport.fireEvent(changeEvents, that, that.grid, cellObj, rId, cInd);
                        }
                    }
                }
                if (stage == 2 && !isEqual(newValue, oldValue)) {

                    //触发值改变事件
                    if (oCell.eventId && that.events.get(oCell.eventId)) {
                        var changeEvents = that.events.get(oCell.eventId).change;
                        if (vmd.isArray(changeEvents)) {
                            for (var i = 0; i < changeEvents.length; i++) {
                                var ev = changeEvents[i];
                                if (ev.name == "freshds" && ev.dataSet) {
                                    that.refreshDS(ev.dataSet);
                                }
                            }
                        }
                        else if (changeEvents) {
                            that.vmdreport.fireEvent(changeEvents, that, that.grid, cellObj, rId, cInd, newValue, oldValue);
                        }
                    }
                }
                return true;
            });

            this.grid.attachEvent("onCheck", function (rId, cInd, value) {

                var cellObj;
                //表头单元格
                if (dhx._isObj(rId) && !defined(cInd)) { //表头单元格没有值
                    cellObj = rId;
                    rId = null;
                    cInd = cellObj.cell.parentNode._cellIndex;
                }
                else {
                    cellObj = that.grid.cells(rId, cInd);
                    if (value) {
                        that.grid["_is_checked_all_col" + cInd] = that.grid.isCheckedAll(cInd);
                    }
                    else {
                        that.grid["_is_checked_all_col" + cInd] = false;
                    }
                }
                var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                //触发值改变事件
                //if (oCell.eventId && that.events.get(oCell.eventId)) {
                //    var changeEvents = that.events.get(oCell.eventId).change;
                //    if (changeEvents) {
                //        that.grid.editor = cellObj;
                //        that.vmdreport.fireEvent(changeEvents, that, that.grid, cellObj, rId, cInd, value);
                //        that.grid.editor = null;
                //    }
                //}
            });

            //接收到表达式计算完成后修改入库数据集中旧值
            this.grid.attachEvent("onValueCalculated", function (rId, cInd, value) {
                var cellObj = that.grid.cells(rId, cInd);
                var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);

                var _bindSubmitStores = cellObj.cell._bindSubmitStores;
                if (_bindSubmitStores) {

                    for (var i = 0; i < _bindSubmitStores.length; i++) {
                        var bindStore = _bindSubmitStores[i];
                        var fieldName = bindStore.fieldName;
                        var storageStore = that.storageDataStores.get(bindStore.storeName);
                        if (cellObj.cell._cellType == "vmdupload") {

                        }
                        else if (cellObj.cell._cellType == "vmdapprove") {
                            storageStore.updateValue(bindStore.dataId, fieldName, value[bindStore.key], true);
                        }
                        else {
                            storageStore.updateValue(bindStore.dataId, fieldName, value, true);
                        }
                    }
                }
            })

            this.grid.attachEvent("onBeforeRowDeleted", function (rId) {
                if (that.vmdreport.fireEvent('beforerowdeleted', that, rId) === false) {
                    return false;
                }
                that.grid.forEachCellsA(rId, function (cellObj, ind) {
                    var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                    if (!oCell) {
                        return;
                    }
                    var id = cellObj.cell.parentNode.idd + "_" + cellObj.cell._cellIndex;
                    if (that.validateErrorCells && that.validateErrorCells.indexOf(id) != -1) {
                        that.validateErrorCells.splice(that.validateErrorCells.indexOf(id), 1);
                    }
                    var pos = oCell.childs.indexOf(id);
                    if (pos >= 0) {
                        oCell.childs.splice(pos, 1)
                    }
                    if (oCell.getType() == "vmdorder" && cellObj.cell._cellIndex == ind) {
                        oCell._seed--;
                    }
                });
                return true;
            });

            this.grid.attachEvent("onAfterRowDeleted", function (rId, pid) {
                that.setSize();
                that.vmdreport.fireEvent('rowdeleted', that, rId);
                return true;
            });

            this.grid.attachEvent("onRowAdded", function (newId) {
                that.setSize();
                that.vmdreport.fireEvent('rowadded', that, newId);
                return true;
            });

            this.grid.attachEvent("onRowSelect", function (rId, ind) {
                that.vmdreport.fireEvent('rowselect', that, rId);
            });

            this.grid.attachEvent("onBeforePageChanged", function (currentPage, pageNum) {
                return false;
            });

            this.grid.attachEvent("onResizeEnd", function (obj) {
                that.colWidths = this.getColsWidth();
                that.setSize();
                that.setPosition();
            });

            this.grid.attachEvent("onXLE",
                function (grid, count) {
                    that.setSize();
                    that.callEvent("onXLE", [grid, count]);
                    return true;
                });

            this.grid.attachEvent("onHScroll",
                function (sLeft, sTop) {
                    that.setTitleFloat(true);
                    return true;
                });

            this.grid.attachEvent("onRightClick",
              function (rId, cInd, event) {
                  var cellObj = that.grid.cells(rId, cInd);
                  var oCell = cellObj.cell._attrs.sid && that.getOriginCellById(cellObj.cell._attrs.sid);
                  if (!oCell) {
                      return;
                  }
                  that.contextCell = cellObj;
                  if (oCell.menuId) {
                      var menu = that.menus.get(oCell.menuId);
                      var contextMenu = menu && menu.contextMenu;
                      contextMenu.showContextMenu(event.clientX, event.clientY);
                      if (!contextMenu.checkEvent("onClick")) {
                          contextMenu.attachEvent("onClick", function (id, zoneId, cas) {
                              if (oCell.eventId) {
                                  var eventstr = that.events.get(oCell.eventId).itemClick;
                                  if (!eventstr) {
                                      return;
                                  }
                                  var url = (menu && menu.param && dhx4.trim(menu.param.replace("?", ""))) || "";
                                  var urlParams = url ? url.split("&").filter(function (item) { return !!item }).map(function (item) { return item.split("=").map(function (a) { return dhx4.trim(a) }) }) : [];
                                  for (var i = 0; i < urlParams.length; i++) {
                                      //if (/^\{[\w\W]+\}$/g.test(urlParams[i][1]) || /\{@value\}/g.test(urlParams[i][1]) || this.hwReport.checkParamType(urlParams[i][1]) != "string") {
                                      urlParams[i][1] = that.getValue(urlParams[i][1], that.contextCell);
                                      //}
                                  }
                                  urlParams = urlParams.map(function (item) { return item.join("=") }).join("&");

                                  var menuItem = menu.contextMenu.itemPull[menu.contextMenu.idPrefix + id];
                                  var item = {
                                      id: id,
                                      zoneId: zoneId,
                                      imgdis: menuItem.imgdis,
                                      parent: menu.contextMenu.getParentId(id),
                                      state: menuItem.state,
                                      text: menuItem.text,
                                      title: menuItem.title,
                                      type: menuItem.type,
                                      alt: cas.alt,
                                      ctrl: cas.alt,
                                      shift: cas.alt
                                  }
                                  that.vmdreport.fireEvent(eventstr, that, that.grid, that.contextCell, that.contextCell.cell.parentNode.idd, that.contextCell.cell._cellIndex, item, urlParams || "");
                                  that.contextCell = null;
                              }
                          });
                      }
                  }
                  //右键事件
                  if (oCell.eventId && that.events.get(oCell.eventId)) {
                      var changeEvents = that.events.get(oCell.eventId).rightClick;
                      if (changeEvents) {
                          that.vmdreport.fireEvent(changeEvents, that, that.grid, cellObj, rId, cInd);
                      }
                  }
                  return true;
              });

            this.grid.attachEvent("onBlockRightClick", function (block, e) {
                that.contextMenu_selectionObj.showContextMenu(e.clientX, e.clientY);
                if (!that.contextMenu_selectionObj.checkEvent("onClick")) {
                    that.contextMenu_selectionObj.attachEvent("onClick", function (id, zoneId, cas) {
                        if (id == "copy") {
                            that.grid.setCSVDelimiter("\t");
                            that.grid.copyBlockToClipboard();
                            document.execCommand('copy');
                        }
                        else if (id == "cut") {
                            that.grid.setCSVDelimiter("\t");
                            that.grid.copyBlockToClipboard(true);
                            document.execCommand('copy');
                        }
                        else if (id == "paste") {
                            that.grid._clip_area.focus();
                            document.execCommand('paste');
                            that.grid.setCSVDelimiter("\t");
                            that.grid.pasteBlockFromClipboard();
                        }
                    })
                }
                return true;
            })

            this.grid.attachEvent("onSubReportOpen", function (rId, cInd, sub) {
                that.setSize();
                that.setPosition();
                that.vmdreport.fireEvent('subreportopen', that, rId, cInd, sub);
                return true;
            });

            this.grid.attachEvent("onSubReportClose", function (rId, cInd, sub) {
                that.setSize();
                that.setPosition();
                that.vmdreport.fireEvent('subreportclose', that, rId, cInd, sub);
                return true;
            });

            this.grid.attachEvent("onEmptyClick", function (ev) {
                //加上之后富文本工具栏不能点击
                //that.grid.editStop();
                that.vmdreport.fireEvent('emptyclick', that, ev);
                return true;
            });

            /*单元格校验事件:校验失败*/
            this.grid.attachEvent("onValidationError", function (id, ind, value, result, rule) {
                var curCell = this.cells(id, ind).cell;
                var tipDiv = document.getElementById("tip_" + id + "_" + ind);
                if (that.validateErrorCells.indexOf(id + "_" + ind) == -1) {
                    that._CellErrMsg = result.errMsg;
                    that.validateErrorCells.push(id + "_" + ind);
                }
                if (!tipDiv) {
                    tipDiv = document.createElement("div");
                    tipDiv.className = "l-verify-tip";
                    tipDiv.id = "tip_" + id + "_" + ind;
                    tipDiv.style.display = "none"
                    tipDiv.innerHTML = "<div class=\"l-verify-tip-corner\"></div><div class=\"l-verify-tip-corner-right\"></div><div class=\"l-verify-tip-content\"></div>";
                    tipDiv.childNodes[1].style.display = "none";
                    //验证提示信息
                    document.body.appendChild(tipDiv);
                }
                tipDiv.lastChild.innerHTML = result.errMsg;
                //var curCell = this.cells(id, ind).cell;
                this.cells(id, ind).cell.onmouseover = function () {

                    var left = curCell.getBoundingClientRect().left;
                    //left = 300;
                    var top = curCell.getBoundingClientRect().top;
                    var width = curCell.getBoundingClientRect().width || curCell.clientWidth;

                    var right = curCell.getBoundingClientRect().right;
                    //console.log(curCell.getBoundingClientRect()  + "==" + curCell.scrollTop);
                    if ((document.documentElement.clientWidth - right) < 140) {
                        tipDiv.children[0].style.display = "none";
                        tipDiv.children[1].style.display = "";
                        tipDiv.style.right = left + "px";
                    } else {
                        tipDiv.children[0].style.display = "";
                        tipDiv.children[1].style.display = "none";
                        tipDiv.style.left = (width + left) + "px";
                    }
                    tipDiv.style.position = "fixed";
                    //console.log(curCell.getBoundingClientRect());
                    tipDiv.style.top = top + "px";
                    //tipDiv.childNodes[1].style.display = "none";
                    //tipDiv.firstChild.style.display = ""
                    if ((left + width) >= document.body.clientWidth) {
                        tipDiv.style.left = (left - width) + "px";//移除提示框的宽度
                        tipDiv.childNodes[1].style.display = "";
                        tipDiv.firstChild.style.display = "none"
                    }
                    var tipwidth = tipDiv.clientWidth || 140;
                    if (tipwidth + width + left > document.body.clientWidth) {
                        tipDiv.style.left = left - tipwidth + "px";
                    }
                    tipDiv.style.display = "";

                };
                this.cells(id, ind).cell.onmouseout = function () {
                    tipDiv.style.display = "none";
                };
                return true;
            });

            /*校验成功*/
            this.grid.attachEvent("onValidationCorrect", function (id, ind, value) {
                var tipDiv = document.getElementById("tip_" + id + "_" + ind);
                if (that.validateErrorCells.indexOf(id + "_" + ind) != -1) {
                    that.validateErrorCells.splice(that.validateErrorCells.indexOf(id + "_" + ind), 1);
                }
                var curCell = this.cells(id, ind).cell;
                if (tipDiv)
                    document.body.removeChild(tipDiv);
                //将相关联的form校验样式去掉
                var name = this.getColumnId(ind);
                return true;
            });

            //键盘事件
            this.grid.attachEvent("onKeyPress", function (code, cFlag, sFlag) {
                if (code == 9) {//tab
                    return that.keyTap(cFlag, sFlag);
                }
                else if (code == 13) {//enter
                    return that.keyEnter(cFlag, sFlag);
                }
                    //else if (code == 37) {//向左
                    //    that.keyMoveLeft(cFlag, sFlag);
                    //}
                else if (code == 38) {//向上
                    return that.keyMoveUp(cFlag, sFlag);
                }
                    //else if (code == 39) {//向右
                    //    that.keyMoveRight(cFlag, sFlag);
                    //}
                else if (code == 40) {//向下
                    return that.keyMoveDown(cFlag, sFlag);
                }
                else if (code == 46) {//删除区域
                    if (!that.grid._selectionArea) return;
                    that.grid.deleteBlock();
                }
                    //复制
                else if (code == 67 && cFlag) {
                    if ((that.grid._fake && that.grid._fake.editor) || that.grid.editor) {
                        return true;
                    }
                    if (!that.grid._selectionArea) {
                        return showAlert("提示", '请先选择一个复制区域！', "info");
                    }
                    if (that.vmdreport.fireEvent("onSectionCopy", that) === false) {
                        return;
                    }
                    that.grid.setCSVDelimiter("\t");
                    that.grid.copyBlockToClipboard()
                }
                    //剪切
                else if (code == 88 && cFlag) {
                    if ((that.grid._fake && that.grid._fake.editor) || that.grid.editor) {
                        return true;
                    }
                    if (!that.grid._selectionArea) {
                        return showAlert("提示", '请先选择一个剪切区域！', "info");
                    }
                    if (that.vmdreport.fireEvent("onSectionCut", that) === false) {
                        return;
                    }
                    that.grid.setCSVDelimiter("\t");
                    that.grid.copyBlockToClipboard(true)
                }
                //粘贴
                if (code == 86 && cFlag) {
                    if ((that.grid._fake && that.grid._fake.editor) || that.grid.editor) {
                        return true;
                    }
                    if (!that.grid._selectionArea) {
                        return showAlert("提示", '请先选择一个粘贴区域！', "info");
                    }
                    if (that.vmdreport.fireEvent("onSectionPaste", that) === false) {
                        return;
                    }
                    var pasteWindow = new PasteWindow({
                        confirm: function (type, param, data) {
                            if (!data) return;
							var parseGrid=this.parseGrid;
                            var copyRowsNum = data.length;
                            //替换
                            if (type == "replace") {
                                if (param == "patch") { //界面行数不足时插入行
                                    var startRow = parseGrid.grid._selectionArea.LeftTopRow;
                                    var gridRowsNums = parseGrid.grid.getRowsNum();

                                    //多出来的行
                                    var modRows = (startRow + copyRowsNum) - gridRowsNums;
                                    if (modRows > 0) {
                                        var _selectionArea = parseGrid.grid._selectionArea;
                                        _selectionArea.RightBottomRow = _selectionArea.RightBottomRow + modRows;
                                        parseGrid.addRows(_selectionArea.RightBottomRow, modRows, _selectionArea.RightBottomRow + 1, true);
                                        parseGrid.grid._selectionArea = _selectionArea;
                                    }
                                    else {
                                        parseGrid.grid._selectionArea.RightBottomRow = parseGrid.grid._selectionArea.LeftTopRow + copyRowsNum - 1;
                                    }
                                }
                                else {
                                    var gridRowsNums = parseGrid.grid.getRowsNum();
                                    if ((parseGrid.grid._selectionArea.LeftTopRow + copyRowsNum) > gridRowsNums) {
                                        parseGrid.grid._selectionArea.RightBottomRow = gridRowsNums - 1;
                                    }
                                    else {
                                        parseGrid.grid._selectionArea.RightBottomRow = parseGrid.grid._selectionArea.LeftTopRow + copyRowsNum - 1;
                                    }
                                }
                                parseGrid.grid._clip_area.value = data.map(function (v) { return v.join("\t") }).join("\n");
                                parseGrid.grid.setCSVDelimiter("\t");
                                parseGrid.grid.pasteBlockFromClipboard();
                                parseGrid.grid.selectBlock(parseGrid.grid._selectionArea.LeftTopCol, parseGrid.grid.getRowId(parseGrid.grid._selectionArea.LeftTopRow), parseGrid.grid._selectionArea.RightBottomCol, parseGrid.grid.getRowId(parseGrid.grid._selectionArea.RightBottomRow));
                            }
                                //插入
                            else if (type == "insert") {
                                var _selectionArea = parseGrid.grid._selectionArea;
                                if (param == "bellow") {
                                    parseGrid.addRows(_selectionArea.RightBottomRow, copyRowsNum, _selectionArea.RightBottomRow + 1, true);
                                    _selectionArea.LeftTopRow = _selectionArea.RightBottomRow + 1;
                                    _selectionArea.RightBottomRow = _selectionArea.RightBottomRow + copyRowsNum;
                                }
                                else if (param == "above") {
                                    parseGrid.addRows(_selectionArea.LeftTopRow, copyRowsNum, _selectionArea.LeftTopRow, true);
                                    _selectionArea.RightBottomRow = _selectionArea.LeftTopRow + copyRowsNum - 1;
                                }
                                parseGrid.grid._selectionArea = _selectionArea;
                                parseGrid.grid._clip_area.value = data.map(function (v) { return v.join("\t") }).join("\n");
                                parseGrid.grid.setCSVDelimiter("\t");
                                parseGrid.grid.pasteBlockFromClipboard();
                                parseGrid.grid.selectBlock(parseGrid.grid._selectionArea.LeftTopCol, parseGrid.grid.getRowId(parseGrid.grid._selectionArea.LeftTopRow), parseGrid.grid._selectionArea.RightBottomCol, parseGrid.grid.getRowId(parseGrid.grid._selectionArea.RightBottomRow));
                            }
                        }
                    });
					pasteWindow.parseGrid=that;
                    pasteWindow.show();
                }
                return true;
            });
        },

        //判断参数类型
        checkParamType: function (param) {
            //未定义
            if (!defined(param)) {
                return "undefined";
            }
            //字符串
            if (/^[\'|\"|\\\"|\\\'][\w\W]*[\'|\"|\\\"|\\\']$/.test(param)) {
                return "string";
            }
            if (param == "" || !isNaN(param)) {
                return "constant";
            }

            //报表中的变量
            if (this.pubvars.get(param)) {
                if (this.pubvars.get(param).value == param) {
                    return "error:变量取值错误：变量" + param + "不能取本身的值！";
                }
                return "reportvar";
            }
            //可视化中的变量
            if (window[param] && window[param].hasOwnProperty("valueExp")) {
                var regex = /getValue\([\"|\'][\u4e00-\u9fa5A-Za-z0-9_]+[\"\']\)/g;
                var matches = window[param]["valueExp"] && window[param]["valueExp"].match(regex);
                if (matches && matches.length > 0) {
                    for (var i = 0; i < matches.length; i++) {
                        var tmpParam = matches[i].replace(/(getValue\([\"|\']|[\"|\']\))/g, "");
                        if (!this.pubvars.get(tmpParam)) {
                            return "error:报表中未定义变量：" + tmpParam;
                        }
                        if (this.pubvars.get(tmpParam).value == param) {
                            return "error:变量取值错误：变量" + param + "不能循环取用！";
                        }
                    }
                }
                return "vmdvar";
            }
            if (/[\u4e00-\u9fa5A-Za-z0-9_]+\.[\w\W]+/.test(param) && (this.getQueryStoreByName(param.split(".")[0]) || this.getStorageStoreByName(param.split(".")[0]))) {
                return "ds";
            }
            //单元格变量
            if (/^[A-Za-z]+\d+\.file\.(id|path|name|ext|size)$/gi.test(param) && this.getOriginCellByLetter(param.split(".")[0])) {
                return "cell_uploader";
            }
            if (/^[A-Za-z]+\d+\.Approve\.(department|opinions|seal|person|date|result)$/gi.test(param) && this.getOriginCellByLetter(param.split(".")[0])) {
                return "cell_approve";
            }
            if (/^[A-Za-z]+\d+\.(text|value)$/gi.test(param) && this.getOriginCellByLetter(param.split(".")[0])) {
                return "cell_combo";
            }
            if (/^[A-Za-z]+\d+$/gi.test(param) && this.getOriginCellByLetter(param)) {
                return "cell";
            }
            //单个变量时，变量未定义
            if (/^[\u4e00-\u9fa5A-Za-z0-9_]+$/.test(param)) {
                return "undefined";
            }
            return "";
        },

        //重置report对象的默认值，如原始矩阵中设置过的值
        clearGrid: function (header) {
            for (var i = 0; i < this.sections.length; i++) {
                var section = this.sections[i];
                section.originalMatrix.each(function (cell, rIndex, cIndex) {
                    if (header || (!cell.isHeader && !cell.isTitle)) {
                        cell.childs = [];
                    }
                    cell._seed = 0;
                })
            }
            this.validateErrorCells = []; //校验失败的单元格
            this.emptyRows = []; //添加删除行操作中如果删除最后一行后留下的空行
            this.embedSubReportCells = {}; //内嵌子表单元格
            this.expandSubReportCells = {}; //展开子表单元格
            this.approveCells = {}; //审批组件单元格
            this.uploadCells = {}; //上传组件单元格
            //清除浮动标题
            if (header) {
                var rpt_title = this.gridContainer.getElementsByClassName("float-title");
                for (var i = rpt_title.length - 1; i >= 0; i--) {
                    this.gridContainer.removeChild(rpt_title[i]);
                }
            }
            //清除子表dom
            var dhx_sub_rows = this.grid.objBox.getElementsByClassName("dhx_sub_row");
            for (var i = dhx_sub_rows.length - 1; i >= 0; i--) {
                this.grid.objBox.removeChild(dhx_sub_rows[i]);
            }
            //清除审批dom
            var approve_rows = this.grid.objBox.getElementsByClassName("hwapprove_div");
            if (approve_rows && approve_rows.length > 0) {
                for (var i = approve_rows.length - 1; i >= 0; i--) {
                    approve_rows[i].parentNode.removeChild(approve_rows[i]);
                }
                this.items = {};
                this.cell = {};
                this.dataStoreName = {};
                this.fieldName = {};
                this.typeKeys = {};
            }
            this.grid.clearAll(header);
            this.grid._hasSetFirstRow = false;
        },

        convertHeaders: function (originHeaders) {
            var rowSpanFlags = [];
            this.headers = [];
            for (var i = 0; i < originHeaders.length; i++) {
                var resultHeaderRow = this.convertRow(originHeaders[i], rowSpanFlags);
                this.headers.push(resultHeaderRow);
            }
        },

        convertRow: function (row, rowSpanFlags) {
            var values = [];
            var styles = [];
            var _class = [];
            var _attrs = [];
            var colspan = 1;
            var rowspan = 1;
            var split_c;
            var splic_colspan;
            for (var i = 0; i < row.length; i += colspan) {
                var c = row[i];
                if (!c) {
                    values[i] = "&nbsp;";
                    styles[i] = "";
                    _class[i] = "";
                    _attrs[i] = {};
                    continue;
                }
                colspan = parseInt(c.colspan || 1);
                rowspan = parseInt(c.rowspan || 1);
                if (!rowSpanFlags[i] || rowSpanFlags[i] == 1) {
                    var p_style = "";
                    var j_class = [];
                    var originCell = this.getOriginCellById(c.sid);
                    var align = this.aligns.get(originCell && originCell.align);
                    //var isEscape = (align && align.escapelabel == "1") ? true : false;
                    var isEscape = this.headerLabelAutoEscape == false ? false : true;//表头标签自动转义
                    if (split_c) {
                        originCell = this.getOriginCellById(split_c.sid);
                        values[i] = replaceToHtmltag(originCell.isTitle ? "" : split_c.data, isEscape) || "&nbsp;";
                        colspan = splic_colspan;
                        c = split_c;
                        j_class = ["firstCol"];
                        split_c = undefined;
                    }
                    else if (this.fixedColCount && (i + colspan) > this.fixedColCount && i < this.fixedColCount) {
                        values[i] = "&nbsp;";
                        p_style = ";border-right:none !important;";
                        splic_colspan = colspan - this.fixedColCount + i;
                        colspan = this.fixedColCount - i;
                        split_c = c;
                    }
                    else {
                        values[i] = replaceToHtmltag(originCell.isTitle ? "" : c.data, isEscape) || "&nbsp;";
                    }
                    if (originCell) {
                        styles[i] = originCell.getCSS(['border', 'font', 'align']) + p_style;
                        _class[i] = originCell.getClassName(j_class);
                        _attrs[i] = c;
                    }

                    rowSpanFlags[i] = rowspan;
                    for (var j = 1; j < colspan; j++) {
                        rowSpanFlags[i + j] = rowspan;
                        values[i + j] = "#cspan";
                        styles[i + j] = "";
                        _class[i + j] = "";
                        _attrs[i + j] = {};
                    }
                }
                else {
                    values[i] = "#rspan";
                    styles[i] = "";
                    _class[i] = "";
                    _attrs[i] = {};
                    rowSpanFlags[i]--;
                }
            }
            return [values.join(","), styles, _class, _attrs];
        },

        copyToClipboard: function (options) {
            this.grid.clearSelection();
            var grid = this.grid;
            var doms = this.getCellsDom();

            var cCount = grid.getColumnsNum() - (this.patchLastColIfLessWinW ? 1 : 0);
            var all_datas = doms.title.concat(doms.header.concat(doms.data));
            var temp_rspan = [];

            var entBox = document.createElement("DIV");
            entBox.style.border = "0px solid rgb(199, 199, 199)";
            entBox.style.position = "absolute";
            entBox.style.left = "9999px";
            entBox.className = " gridbox gridbox_" + grid.skin_name + (dhx4.isIE ? " isIE" : " isModern");
            document.body.appendChild(entBox);

            var obj = document.createElement("TABLE");
            obj.appendChild(document.createElement("TBODY"));
            obj.cellSpacing = obj.cellPadding = 0;
            obj.style.cssText = 'width:100%;table-layout:fixed;';

            var objBox = document.createElement("DIV");
            objBox.style.width = "100%";
            objBox.style.overflow = "hidden";
            objBox.appendChild(obj);
            objBox.className = "objbox";

            entBox.appendChild(objBox);

            var heights = grid.getRowsHeight();
            var widths = grid.getColsWidth();
            var hasFirstRow = false;
            for (var i = 0; i < all_datas.length; i++) {
                var tds = all_datas[i];
                var c_cur = 0;
                var colspan_ind = 1;
                var posinfo = "";
                if (heights[i] == 0) {
                    continue;
                }
                if (!hasFirstRow) {
                    hasFirstRow = true;
                    posinfo = "c-top ";
                }
                var tr = document.createElement("TR");
                var hasFirstCol = false;
                for (var j = 0; j < cCount; j += colspan_ind) {
                    posinfo = posinfo.replace(/c-first/g, "");
                    if (!hasFirstCol && widths[j] > 0) {
                        hasFirstCol = true;
                        posinfo += "c-first ";
                    }
                    if (temp_rspan[j]) {
                        temp_rspan[j] = temp_rspan[j] - 1;
                        c_cur++;
                        colspan_ind = 1;
                        continue;
                    }
                    var td = tds[j - c_cur];
                    if (!td || widths[j] == 0) {
                        colspan_ind = 1;
                        continue;
                    }
                    if (td.rowSpan > 1) {
                        temp_rspan[j] = td.rowSpan - 1;
                        if (td.colSpan > 1) {
                            for (var k = 1; k < td.colSpan; k++) {
                                temp_rspan[j + k] = td.rowSpan - 1;
                            }
                        }
                    }
                    var oCell = td._attrs && this.getOriginCellById(td._attrs.sid);
                    var copytd = clone(td)[0];
                    if (oCell) {
                        copytd.style.cssText = oCell.getCSS(null, posinfo);
                    }

                    if (_isIE && td.colSpan > 1) {
                        copytd.colSpan = widths.slice(pick(td._cellIndexS, td._cellIndex), pick(td._cellIndexS, td._cellIndex) + td.colSpan).filter(function (v) { return v > 0 }).length;
                    }

                    tr.appendChild(copytd);
                    colspan_ind = td.colSpan;
                    c_cur += td.colSpan - 1;
                }
                obj.firstChild.appendChild(tr);
            }
            if (window.getSelection) {
                //chrome等主流浏览器
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNode(entBox);
                selection.removeAllRanges();
                selection.addRange(range);
            } else if (document.body.createTextRange) {
                //ie
                var range = document.body.createTextRange();
                range.moveToElementText(entBox);
                range.select();
            }
            document.execCommand('copy');
            document.body.removeChild(entBox);
            insertRule(".dhtmlx_message_area", "text-align:center;right:" + (document.body.clientWidth - 250) / 2 + "px");
            dhtmlx.message({
                type: "info",
                text: "复制成功！",
                position: "bottom",
                expire: 2000
            })
        },

        deleteRow: function (rIndex, rowNums) {
            var that = this;
            this.grid.editStop();
            var rId;
            if (defined(rIndex)) {
                if (rIndex < 0) {
                    rIndex = rIndex + that.grid.getRowsNum();
                }
                if (rIndex < 0 || rIndex >= that.grid.getRowsNum()) {
                    showAlert("提示！", "输入的索引需在0到报表行总数之间，即在0-" + that.grid.getRowsNum() + "之间！", "info");
                    return;
                }
                rowNums = rowNums || 1;
                var rowIds = [];
                for (var i = 0; i < rowNums; i++) {
                    rowIds[i] = this.grid.getRowId(rIndex + i);
                }
                rId = rowIds.join(",");
            }
            rId = rId || this.grid.getSelectedRowId();

            if (!rId) {
                showAlert("提示！", '请选择要删除的行！', "info");
                return;
            }

            var selectIds = rId.split(",");
            var selectRowIndexs = selectIds.map(function (v) { return that.grid.getRowIndex(v) });
            selectRowIndexs.sort(function (v1, v2) { return v2 - v1 });
            for (var i = 0; i < selectRowIndexs.length; i++) {
                var deleteId = this.grid.getRowId(selectRowIndexs[i]);
                //删除校验内容
                for (var j = that.validateErrorCells.length - 1; j >= 0; j--) {
                    if (that.validateErrorCells[j].split("_")[0] == deleteId) {
                        that.validateErrorCells.splice(j, 1);
                    }
                }

                //删除行后入库数据集中对应数据删除
                this.storageDataStores.each(function (key, _store, index) {
                    _store.deleteDataByDelete(deleteId);
                });

                //查找所有删除行中的合并行单元格
                var row = this.grid.rowsBuffer[selectRowIndexs[i]];

                //删除最后一行时记录，方便以后添加行
                if (this.grid.rowsBuffer.length == 1) {
                    this._deletedLastRow = row;
                }

                var attrs = row._attrs;
                var colspan = 1;
                for (var startColIndex = this.grid._cCount - 1; startColIndex >= 0; startColIndex -= colspan) {
                    var mergedCell = this.findMergedCell(row, startColIndex);
                    colspan = mergedCell.cell.colSpan;
                    if (mergedCell.cell.rowSpan > 1) {
                        //如果删除的是合并单元格，则将这个单元格放到下一行中
                        if (mergedCell.cell.parentNode.idd == deleteId) {
                            that.appendMergeCellToNextRow(row, mergedCell);
                        }
                        else {
                            mergedCell.cell.rowSpan -= 1;
                        }
                    }
                }
                this.grid.deleteRow(deleteId);
            }

            this.resetCounter();
        },

        deleteGroupRow: function (rIndex) {
            var that = this;
            this.grid.editStop();
            var rId;
            if (defined(rIndex)) {
                if (rIndex < 0 || rIndex >= that.grid.getRowsNum()) {
                    showAlert("提示！", "输入的索引需在0到报表行总数之间，即在0-" + that.grid.getRowsNum() + "之间！", "info");
                    return;
                }
                rId = this.grid.getRowId(rIndex);
            }
            rId = rId || this.grid.getSelectedRowId();

            if (!rId) {
                showAlert("提示！", "请选择要删除的行！", "info");
                return;
            }
            rIndex = this.grid.getRowIndex(rId);
            var minRowIndex = rIndex;
            var maxRowIndex = rIndex;

            var row = this.grid.rowsBuffer[rIndex];
            var attrs = row._attrs;
            for (var startColIndex = 0; startColIndex < this.grid._cCount; startColIndex++) {
                var mergedCellObj = this.findMergedCell(row, startColIndex); //this.grid.cells(attrs[startColIndex]._cRowId, attrs[startColIndex]._cIndex);
                minRowIndex = Math.min(minRowIndex, this.grid.getRowIndex(mergedCellObj.cell.parentNode.idd));
                maxRowIndex = Math.max(maxRowIndex, this.grid.getRowIndex(mergedCellObj.cell.parentNode.idd) + mergedCellObj.cell.rowSpan);
            }

            this.deleteRow(minRowIndex, maxRowIndex - minRowIndex);
        },

        enabledColumnResize: function (bool) {
            if (bool == true) {
                this.columnResize = true;
            }
            else {
                this.columnResize = false;
            }
        },

        enabledHeaderLabelAutoEscape: function (bool) {
            this.headerLabelAutoEscape = !!bool;
        },

        enabledSelecteStates: function (bool) {
            if (bool == undefined) {
                this.selecteStates = true;
            }
            else {
                this.selecteStates = !!bool;
            }
        },

        enabledTitleFloat: function (bool) {
            if (bool == undefined) {
                this._titleFloat = true;
            }
            else {
                this._titleFloat = !!bool;
            }
        },

        enableMultiselect: function (bool) {
            this.multiselect = dhx.s2b(bool);
        },

        //导出到excel
        exportExcel: function (options) {
            var myMask = new Ext.LoadMask(this.panelEl, {
                msg: '数据组织中，请稍后...'
            });
            myMask.show();
            var grid = this.grid;
            var doms = this.getCellsDom();
            var aligns = {};
            var borders = {};
            var fonts = {};
            var tables = {};

            this.aligns.each(function (key, _align, index) {
                aligns[key] = _align.getJSON();
            });
            this.borders.each(function (key, _border, index) {
                borders[key] = _border.getJSON();
            });
            this.fonts.each(function (key, _font, index) {
                fonts[key] = _font.getJSON();
            });
            this.queryDatastores.each(function (key, _store, index) {
                if (_store.isRefresh) {
                    tables[key] = _store.cache[_store.paramsKey]
                }
            })

            var exportName = (options && options.name) ||
                (this.vmdreport.path && this.vmdreport.path.substring(0, this.vmdreport.path.indexOf("."))) ||
                (/\/run\/report|run\/default/g.test(window.location.pathname) ? parent.getUrlParam("name") : window.name) + "_" + this.vmdreport.id;
            var widths = grid.getColsWidth();
            if (this.patchLastColIfLessWinW) {
                widths.pop();
            }
            //从参数中拿取为表单模式还是报表模式
            var isForm = true;
            if ((options && options.name) == false)
            {
                isForm = false;
            }
			//添加报表的扩展行
			var extRow=[];
			for(var i=0;i<this.instantRow.length;i++)
			{
				if(this.instantRow[i].expand=='2')
				{
					var rowNum=this.instantRow[i].sid.split('_')[0]
					extRow.push(rowNum)					
				}								
			}			
            var exportData = {
                name: exportName,
                fixedColCount: this.fixedColCount,
                fixedRowCount: this.headerLength,
                isFillReport: this.vmdreport.fillReport,
                isForm: isForm,
				extRow:extRow,
                data: [],
                style: {
                    heights: grid.getRowsHeight(),
                    widths: widths,
                    aligns: aligns,
                    borders: borders,
                    fonts: fonts
                },
                tables: tables
            };
            var cCount = grid.getColumnsNum() - (this.patchLastColIfLessWinW ? 1 : 0);
            var all_datas = doms.title.concat(doms.header.concat(doms.data));
            var temp_rspan = [];

            for (var i = 0; i < all_datas.length; i++) {
                var tds = all_datas[i];
                var row_json = [];
                var c_cur = 0;
                var colspan_ind = 1;
                for (var j = 0; j < cCount; j += colspan_ind) {
                    if (temp_rspan[j]) {
                        temp_rspan[j] = temp_rspan[j] - 1;
                        c_cur++;
                        colspan_ind = 1;
                        row_json.push({});
                        continue;
                    }
                    var td = tds[j - c_cur];
                    if (td.rowSpan > 1) {
                        temp_rspan[j] = td.rowSpan - 1;
                        if (td.colSpan > 1) {
                            for (var k = 1; k < td.colSpan; k++) {
                                temp_rspan[j + k] = td.rowSpan - 1;
                            }
                        }
                    }
                    var oCell = td._attrs && this.getOriginCellById(td._attrs.sid);
                    if (!oCell) {
                        row_json.push({});
                        colspan_ind = 1;
                        continue;
                    }
                    var cellObj;
                    if (oCell.isTitle || oCell.isHeader) {
                        td.firstChild._cellType = td.firstChild._cellType || "ro";
                        cellObj = grid.cells4(td.firstChild);
                        td.idd = cellObj;
                    }
                    else {
                        cellObj = grid.cells4(td);
                    }
                    var value = "";
                    if (oCell.getType() == "vmdbutton") {
                        value = "";
                    }
                    else {
                        value = cellObj.getValue();
                    }
                    var attrs = {
                        fillcelltype: oCell.getType(),
                        data: reverReplaceHtmltag(value),
                        sid: oCell.id,
                        align: oCell.align,
                        border: oCell.border,
                        font: oCell.font,
                        colspan: td.colSpan,
                        rowspan: td.rowSpan
                    }
                    if (oCell.isTitle) {
                        attrs.isTitle = oCell.isTitle;
                    }
                    if (oCell.isHeader) {
                        attrs.isHeader = oCell.isHeader;
                    }
                    if(oCell.number&&oCell.hwReport.numbers){
                        var num=oCell.hwReport.numbers;
                        attrs.number =num.data[oCell.number].type; 
                    }
                   // if (oCell.backgroundColor) {
                        attrs.backgroundColor = td.style.backgroundColor;
                    //}
                    var cellType = this.cellTypes.get(oCell.fillcelltype);
                    if (cellType && (["vmdcombo", "vmdgrid", "vmdtree"].indexOf(cellType.getType()) != -1) && cellType.bindsource) {
                        attrs.tablename = cellType.bindsource.tablename;
                        attrs.showcolumn = cellType.bindsource.showcolumn.toLowerCase();
                        attrs.valuecolumn = cellType.bindsource.valuecolumn.toLowerCase();
                    }
                    row_json.push(attrs);
                    for (var k = 1; k < td.colSpan; k++) {
                        row_json.push({});
                    }
                    colspan_ind = td.colSpan;
                    c_cur += td.colSpan - 1;
                }
                exportData.data.push(row_json);
            }
            if (options && options.beforeExportCallBack) {
                options.beforeExportCallBack.apply(this, [exportData]);
            }
            var hwRao = new HwRao(reporthost || tablehost, "report");
            hwRao.exportExcel(exportData);
            myMask.hide();
        },

        //页面加载完成后填充入库数据集
        fillStorageOnRendered: function (state) {
            var that = this;
            this.storageDataStores.each(function (key, _store, index) {
                _store.fillDataByFirst(state);
            });
        },

        findInsertBeforeCell: function (row, cellIndex) {
            var tds = row.cells;
            var resultTD = null;
            for (var i = 0; i < tds.length; i++) {
                if (cellIndex > pick(tds[i]._cellIndexS, tds[i]._cellIndex)) {
                    continue;
                }
                resultTD = tds[i];
                break;
            }
            return resultTD;
        },

        findMergedCell: function (row, cellIndex) {
            var rowId = row.idd;
            var rowIndex = this.grid.getRowIndex(rowId);
            while (cellIndex >= 0) {
                for (var i = 0; i <= rowIndex; i++) {
                    var cellObj = null; // = this.grid.cells2(i, cellIndex);
                    var rowsBuffer = this.grid.rowsBuffer[i];
                    for (var j = 0; j < rowsBuffer.cells.length; j++) {
                        if (rowsBuffer.cells[j]._cellIndex == cellIndex) {
                            cellObj = this.grid.cells4(rowsBuffer.cells[j]);
                            break;
                        }
                    }
                    if (cellObj && cellObj.cell._cellIndex == cellIndex && rowIndex >= i && rowIndex < (i + cellObj.cell.rowSpan)) {
                        return cellObj;
                    }
                }
                cellIndex--;
            }
        },

        /*
        * 获取显示矩阵matrix中合并单元格，如果是被合并的单元格，向上或向左查找其合并的单元格
        */
        findMergingCell: function (rowIndex, cellIndex, rowInc, colInc) {
            if (rowIndex < 0 || rowIndex >= this.matrix.rows.length || cellIndex < 0) {
                return null;
            }
            var tmpRowCells = this.matrix.rows[rowIndex];
            var cell = tmpRowCells[cellIndex];
            if (!cell) return null;
            if (cell.sid) return cell;
            return this.findMergingCell(rowIndex + rowInc, cellIndex + colInc, rowInc, colInc);
        },

        /**
        * 获取单元格对象
        */
        getCells: function (param, contextCell) {
            var that = this;
            contextCell = contextCell || this.grid.editor || (this.grid._fake && this.grid._fake.editor);
            var paramType = this.checkParamType(param);

            var paramOCell;
            if (paramType == "cell_uploader" || paramType == "cell_combo" || paramType == "cell_approve") {
                paramOCell = this.getOriginCellByLetter(param.split(".")[0]);
            }
            else if (paramType == "cell") {
                paramOCell = this.getOriginCellByLetter(param);
            }
            else return null;
            if (!contextCell) {
                var cells = [];
                if (paramOCell.isTitle) {
                    var cellDom = this.floatTitleContainer.children[0].cells[0];
                    cellDom.firstChild._cellType = cellDom.firstChild._cellType || "ro";
                    cellDom.firstChild._attrs = cellDom._attrs;
                    cellDom.grid = that.grid;
                    var aeditor = that.grid.cells4(cellDom.firstChild);
                    cellDom.idd = aeditor;
                    cells.push(aeditor);
                }
                else if (paramOCell.isHeader) {
                    var _grid = this.grid;
                    if (this.fixedColCount && paramOCell.index < this.fixedColCount) {
                        _grid = this.grid._fake;
                    }
                    var tdcells = _grid.hdr.children[0].children[paramOCell.rptRow.rowIndex + 1].cells;
                    for (var i = 0; i < tdcells.length; i++) {
                        if (tdcells[i]._attrs && tdcells[i]._attrs.sid == paramOCell.id) {
                            tdcells[i].firstChild._cellType = tdcells[i].firstChild._cellType || "ro";
                            tdcells[i].firstChild._attrs = tdcells[i]._attrs;
                            tdcells[i].grid = that.grid;
                            var aeditor = that.grid.cells4(tdcells[i].firstChild);
                            tdcells[i].idd = aeditor;
                            cells.push(aeditor);
                        }
                    }
                }
                else {
                    for (var i = 0; i < paramOCell.childs.length; i++) {
                        var ids = paramOCell.childs[i].split("_");
                        cells.push(that.grid.cells(ids[0], ids[1]));
                    }
                }
                return cells;
            }

            var paramVparentOCell = this.getExpandParent(paramOCell, "vparent"); //上父
            var paramHparentOCell = this.getExpandParent(paramOCell, "hparent"); //左父

            var contextOCell = contextCell && this.getOriginCellById(contextCell.cell._attrs.sid);
            var contextVparentOCell = this.getExpandParent(contextOCell, "vparent");
            var contextHparentOCell = this.getExpandParent(contextOCell, "hparent");

            var contextCellRowIndex = this.grid.getRowIndex(contextCell.cell.parentNode.idd);
            var contextCellCellIndex = pick(contextCell.cell._cellIndex, contextCell.cell.parentNode._cellIndex);
            var aliasRowIndex = contextOCell.rowIndex - paramOCell.rowIndex;
            var aliasCellIndex = contextOCell.index - paramOCell.index;

            if (paramOCell.isTitle) {
                var cellDom = this.floatTitleContainer.children[0].cells[0];
                cellDom.firstChild._cellType = cellDom.firstChild._cellType || "ro"; //paramOCell.getType();
                cellDom.firstChild._attrs = cellDom._attrs;
                var aeditor = that.grid.cells4(cellDom.firstChild);
                cellDom.idd = aeditor;
                return [aeditor];
            }
            else if (paramOCell.isHeader) {
                var _grid = this.grid;
                var values = [];
                if (this.fixedColCount && paramOCell.index < this.fixedColCount) {
                    _grid = this.grid._fake;
                }
                if (paramVparentOCell && this.getParentRelation(contextVparentOCell, paramVparentOCell) != null) {
                    var cellDom = this.getHeaderCellDom(paramVparentOCell.rowIndex, contextCellCellIndex);
                    cellDom.firstChild._cellType = cellDom.firstChild._cellType || "ro";
                    cellDom.firstChild._attrs = cellDom._attrs;
                    cellDom.grid = that.grid;
                    var aeditor = that.grid.cells4(cellDom.firstChild);
                    cellDom.idd = aeditor;
                    return [aeditor];
                }
                var tdcells = _grid.hdr.children[0].children[paramOCell.rptRow.rowIndex + 1].cells;
                var cells = [];
                for (var i = 0; i < tdcells.length; i++) {
                    if (tdcells[i]._attrs && tdcells[i]._attrs.sid == paramOCell.id) {
                        tdcells[i].firstChild._cellType = tdcells[i].firstChild._cellType || "ro";
                        tdcells[i].grid = that.grid;
                        var aeditor = that.grid.cells4(tdcells[i].firstChild);
                        tdcells[i].idd = aeditor;
                        cells.push(aeditor);
                    }
                }
                return cells;
            }

            //如果获取值的单元格与上下文单元格同一个左父和上父，则根据相对位置获取单元格的值

            var resultParamCell;
            if ((contextCellRowIndex - aliasRowIndex) >= 0 && (contextCellRowIndex - aliasRowIndex) < this.grid.getRowsNum()
                && (contextCellCellIndex - aliasCellIndex) >= 0 && (contextCellCellIndex - aliasCellIndex) < this.grid.getColumnsNum()) {
                resultParamCell = this.grid.cells2(contextCellRowIndex - aliasRowIndex, contextCellCellIndex - aliasCellIndex);
            }
            //没有扩展行的
            if (!((paramHparentOCell && this.getParentRelation(contextHparentOCell, paramHparentOCell) == null)
                || (paramVparentOCell && this.getParentRelation(contextVparentOCell, paramVparentOCell) == null))
                && ((paramHparentOCell && contextHparentOCell && paramHparentOCell.id == contextHparentOCell.id)
                || (paramVparentOCell && contextVparentOCell && paramVparentOCell.id == contextVparentOCell.id)
                || (!paramHparentOCell && !paramVparentOCell && !contextHparentOCell && !contextVparentOCell))
                && (resultParamCell && resultParamCell.cell._attrs.sid == paramOCell.id)) {
                return [resultParamCell];
            }

            var cells = [];
            var relationV = this.getParentRelation(contextVparentOCell, paramVparentOCell);
            var relationH = this.getParentRelation(contextHparentOCell, paramHparentOCell);
            //两个单元格没有任何关系
            if (relationV == null && relationH == null) {
                for (var i = 0; i < paramOCell.childs.length; i++) {
                    cells.push(that.grid.cells.apply(that.grid, paramOCell.childs[i].split("_")));
                }
                return cells;
            }
            //左父是同一个
            if (relationH == 0) {
                for (var i = 0; i < paramOCell.childs.length; i++) {
                    var paramCellObj = that.grid.cells.apply(that.grid, paramOCell.childs[i].split("_"));
                    var contextRowIndex = that.grid.getRowIndex(contextCell.cell.parentNode.idd);
                    var paramRowIndex = that.grid.getRowIndex(paramCellObj.cell.parentNode.idd);
                    if (contextRowIndex >= paramRowIndex && contextRowIndex < (paramRowIndex + paramCellObj.cell.rowSpan)) {
                        cells.push(paramCellObj);
                    }
                }
                return cells;
            }
            if (relationH == 1) {
                for (var i = 0; i < paramOCell.childs.length; i++) {
                    var paramCellObj = that.grid.cells.apply(that.grid, paramOCell.childs[i].split("_"));
                    var contextRowIndex = that.grid.getRowIndex(contextCell.cell.parentNode.idd);
                    var paramRowIndex = that.grid.getRowIndex(paramCellObj.cell.parentNode.idd);

                    var contextHparentCellObj = that.findMergedCell(contextCell.cell.parentNode, contextHparentOCell.index);
                    var contextHparentRowIndex = that.grid.getRowIndex(contextHparentCellObj.cell.parentNode.idd);
                    if (paramRowIndex >= contextHparentRowIndex && paramRowIndex < (contextHparentRowIndex + contextHparentCellObj.cell.rowSpan)) {
                        cells.push(paramCellObj);
                    }
                }
                return cells;
            }
            if (relationH == -1) {
                for (var i = 0; i < paramOCell.childs.length; i++) {
                    var paramCellObj = that.grid.cells.apply(that.grid, paramOCell.childs[i].split("_"));
                    var contextRowIndex = that.grid.getRowIndex(contextCell.cell.parentNode.idd);
                    var paramRowIndex = that.grid.getRowIndex(paramCellObj.cell.parentNode.idd);

                    var paramHparentCellObj = that.findMergedCell(paramCellObj.cell.parentNode, paramHparentOCell.index);
                    var paramHparentRowIndex = that.grid.getRowIndex(paramHparentCellObj.cell.parentNode.idd);
                    if (contextRowIndex >= paramHparentRowIndex && contextRowIndex < (paramHparentRowIndex + paramHparentCellObj.cell.rowSpan)) {
                        cells.push(paramCellObj);
                    }
                }
                return cells;
            }

            if (relationV == 0) {
                for (var i = 0; i < paramOCell.childs.length; i++) {
                    var paramCellObj = that.grid.cells.apply(that.grid, paramOCell.childs[i].split("_"));
                    var contextCellIndex = contextCell.cell._cellIndex;
                    var paramCellIndex = paramCellObj.cell._cellIndex;
                    if (contextCellIndex >= paramCellIndex && contextCellIndex < (paramCellIndex + paramCellObj.cell.colSpan)) {
                        cells.push(paramCellObj);
                    }
                }
                return cells;
            }
            if (relationV == 1) {
                for (var i = 0; i < paramOCell.childs.length; i++) {
                    var paramCellObj = that.grid.cells.apply(that.grid, paramOCell.childs[i].split("_"));
                    var contextCellIndex = contextCell.cell._cellIndex;
                    var paramCellIndex = paramCellObj.cell._cellIndex;
                    if (paramCellIndex >= contextCellIndex && paramCellIndex < (contextCellIndex + contextCell.cell.colSpan)) {
                        cells.push(paramCellObj);
                    }
                }
                return cells;
            }
            if (relationV == -1) {
                for (var i = 0; i < paramOCell.childs.length; i++) {
                    var paramCellObj = that.grid.cells.apply(that.grid, paramOCell.childs[i].split("_"));
                    var contextCellIndex = contextCell.cell._cellIndex;
                    var paramCellIndex = paramCellObj.cell._cellIndex;
                    if (contextCellIndex >= paramCellIndex && contextCellIndex < (paramCellIndex + paramCellObj.cell.colSpan)) {
                        cells.push(paramCellObj);
                    }
                }
                return cells;
            }

            var groupArea = this.getGridGroupArea(contextCell, paramOCell);
            var startRowIndex = groupArea.startRowIndex || 0;
            var rowSpan = groupArea.rowSpan || 0;
            var startColIndex = groupArea.startColIndex || 0;
            var colSpan = groupArea.colSpan || this.grid.getColumnsNum();

            var lastCellObj = null;
            for (var i = groupArea.startRowIndex; i < groupArea.endRowIndex; i++) {
                for (var j = groupArea.startColIndex; j < groupArea.endColIndex; j++) {
                    var cellObj = this.grid.cells2(i, j);
                    if (!cellObj) {
                        continue;
                    }
                    if (lastCellObj && lastCellObj.cell.parentNode.idd == cellObj.cell.parentNode.idd && lastCellObj.cell.cellIndex == cellObj.cell.cellIndex) {
                        continue;
                    }
                    lastCellObj = cellObj;
                    if (cellObj.cell._attrs.sid == paramOCell.id) {
                        cells.push(cellObj);
                    }
                }
            }
            return cells;
        },

        /**
        * 获取界面中所有的dom元素
        */
        getCellsDom: function () {
            var title_tr = []; //标题行
            var header_trs = []; //表头行
            var data_trs = []; //数据行

            //存在标题
            if (this.floatTitleContainer) {
                title_tr.push([this.floatTitleContainer.children[0].cells[0]]);
            }
            //存放表头单元格
            var headerRowsNum = this.headerLength - (this.floatTitleContainer ? 1 : 0);
            var startIndex;
            var temp_rspan = [];
            for (var i = 0; i < headerRowsNum + this.grid.getRowsNum() ; i++) {
                var tds = [];
                var max_ind = this.fixedColCount;
                var c_cur = 0;
                var colspan_ind = 1;
                var cells;
                if (i < headerRowsNum) {
                    startIndex = this.floatTitleContainer ? 2 : 1;
                    cells = this.grid._fake ? this.grid._fake.hdr.children[0].children[startIndex + i].cells : [];
                }
                else {
                    startIndex = -headerRowsNum + 1;
                    cells = this.grid._fake ? this.grid._fake.obj.children[0].children[startIndex + i].cells : [];
                }
                for (var j = 0; j < max_ind; j += colspan_ind) {
                    if (temp_rspan[j]) {
                        temp_rspan[j] = temp_rspan[j] - 1;
                        c_cur++;
                        colspan_ind = 1;
                        continue;
                    }
                    var c = cells[j - c_cur];
                    if (c.rowSpan > 1) {
                        temp_rspan[j] = c.rowSpan - 1;
                        if (c.colSpan > 1) {
                            for (var k = 1; k < c.colSpan; k++) {
                                temp_rspan[j + k] = c.rowSpan - 1;
                            }
                        }
                    }
                    colspan_ind = c.colSpan;
                    c_cur += c.colSpan - 1;
                    tds.push(c);
                }

                if (i < headerRowsNum) {
                    cells = this.grid.hdr.children[0].children[startIndex + i].cells;
                    var _startIndex = tds.length;
                    if (dhx4.isIE && this.headerLength > 0) {
                        _startIndex = this.fixedColCount
                    }
                    for (var j = _startIndex; j < cells.length; j++) {
                        if (this.patchLastColIfLessWinW && j == cells.length - 1) {
                            continue;
                        }
                        tds.push(cells[j]);
                    }
                    header_trs.push(tds);
                }
                else {
                    //cells = this.grid.getRowById(this.grid.rowsBuffer[i - headerRowsNum].idd).cells;
                    cells = this.grid.obj.children[0].children[startIndex + i].cells;
                    for (var j = tds.length; j < cells.length; j++) {
                        if (this.patchLastColIfLessWinW && j == cells.length - 1) {
                            continue;
                        }
                        tds.push(cells[j]);
                    }
                    data_trs.push(tds);
                }
            }
            return {
                title: title_tr,
                header: header_trs,
                data: data_trs
            }
        },

        /*
        * 获取单元格的值
        */
        getCellValue: function (param, contextCell) {
            var cells = this.getCells(param, contextCell);
            return cells && cells.map(function (c) { return c.getValue(); }).join(",");
        },

        getQueryStoreByName: function (name) {
            var store = this.queryDatastores.get(name);
            if (store) {
                return store;
            }
            this.queryDatastores.each(function (key, _store, index) {
                if (_store.factName == name || _store.name == name) {
                    store = _store;
                }
            });
            return store;
        },

        getStorageStoreByName: function (name) {
            var store = this.storageDataStores.get(name);
            if (store) {
                return store;
            }
            this.storageDataStores.each(function (key, _store, index) {
                if (_store.factName == name || _store.name == name) {
                    store = _store;
                }
            });
            return store;
        },

        /**
        * 根据id获取原始单元格对象
        */
        getOriginCellById: function (id) {
            if (!/^\d+_\d+$/gi.test(id)) {
                return null;
            }
            var rowIndex = parseInt(id.split("_")[0]);
            var cellIndex = parseInt(id.split("_")[1]);
            for (var i = 0; i < this.sections.length; i++) {
                var sec = this.sections[i];
                if (rowIndex >= (sec.startRow - 1) && rowIndex <= (sec.endRow - 1) && cellIndex >= (sec.startCol - 1) && cellIndex <= (sec.endCol - 1)) {
                    return sec.getOriginCell(rowIndex - sec.startRow + 1, cellIndex - sec.startCol + 1);
                }
            }
            return null;
        },

        /**
        * 根据字母数字格式获取原始单元格对象
        */
        getOriginCellByLetter: function (letter) {
            if (!/^[A-Za-z]+\d+$/gi.test(letter)) {
                return null;
            }
            var rowCols = convertToRowCol(letter);
            return this.getOriginCellById(rowCols.row + "_" + rowCols.col);
        },

        /**
        * 获取子表
        */
        getReport: function (name) {
            return this.subReports.get(name);
        },

        /**
        * 获取初始化gird的行，可根据此行信息设置列类型、宽度、样式等
        */
        getInstantRow: function () {
            if (this.expandType == "h" || this.expandType == "c") {
                for (var i = this.headerLength; i < this.matrix.rows.length; i++) {
                    var rows = this.matrix.rows[i];
                    var isContinue = false;
                    for (var j = 0; j < rows.length; j++) {
                        var cell = rows[j];
                        var oCell = cell && this.getOriginCellById(cell.sid);
                        if (!oCell || (oCell.colspan && oCell.colspan > 1)) {
                            isContinue = true;
                        }
                    }
                    if (isContinue) {
                        continue;
                    }
                    return rows;
                }
            }
            else {
                for (var i = this.headerLength; i < this.matrix.rows.length; i++) {
                    var rows = this.matrix.rows[i];
                    for (var j = 0; j < rows.length; j++) {
                        var cell = rows[j];
                        var oCell = cell && this.getOriginCellById(cell.sid);
                        if (oCell && oCell.dsFunc == "select") {
                            return rows;
                        }
                    }
                }
            }
            var instantRow = this.matrix.getRows(this.headerLength, this.headerLength + 1);
            if (instantRow.length > 0) {
                return instantRow[0];
            }
            instantRow = this.matrix.getRows(0, 1);
            if (instantRow.length > 0) {
                return instantRow[0];
            }
            return [];
        },

        /*
        * 获取设置内联样式后的行高
        */
        getRowCSSHeight: function (cells) {
            var borderBottomWidth = 0;
            var paddingTop = 0;
            var paddingBottom = 0;
            var rowHeight = 0;

            for (var i = 0; i < cells.length; i++) {
                var c = cells[i];
                var originCell = c && this.getOriginCellById(c.sid);
                if (originCell) {
                    rowHeight = originCell.rptRow.height;
                    break;
                    //var padding = originCell.getPadding();
                    //paddingTop = Math.max(paddingTop, padding[0]);
                    //paddingBottom = Math.max(paddingBottom, padding[2]);
                    //borderBottomWidth = Math.max(borderBottomWidth, originCell.getBorderBottomWidth());
                }
            }
            return rowHeight;
        },

        //获取滚动加载时加载条数
        getPageSize: function () {
            if (this.pageSize) {
                return this.pageSize;
            }
            var scrfix = dhtmlx.$customScroll ? 0 : 18;
            var isVScroll = this.isSubReport ? false : (this.grid.objBox.scrollHeight > this.grid.objBox.offsetHeight);
            var isHScroll = this.isSubReport ? false : ((this.grid.objBox.scrollWidth > this.grid.objBox.offsetWidth) || (this.grid.objBox.style.overflowX == "scroll"));

            if (this.loadMode == "smart") {
                return Math.ceil(parseInt(this.grid.objBox.offsetHeight) / this.getRowCSSHeight(this.instantRow)) + 10;
            }
            if (this.loadMode == "paging") {
                return Math.floor(parseInt(this.grid.objBox.offsetHeight - (isHScroll ? scrfix : 0)) / this.getRowCSSHeight(this.instantRow));
            }
            return Math.floor(parseInt(this.grid.objBox.offsetHeight - (isHScroll ? scrfix : 0)) / this.getRowCSSHeight(this.instantRow));
        },

        /**
        * 补齐单元格
        */
        getPatchCell: function (rInd, cInd) {
            var that = this;
            var rowCells = this.matrix.rows[this.headerLength + rInd];

            //获取最近的非空单元格，左侧优先
            var nearestCell = null;
            var cursor = cInd;
            var increment = -1;
            while (true) {
                if (cursor > (rowCells.length - 1)) break;
                if (cursor < 0) { increment = 1; cursor = cInd; }
                cursor += increment;
                nearestCell = this.findMergingCell(this.headerLength + rInd, cursor, -1, 0);
                if (nearestCell) break;
            }

            if (!nearestCell) {
                return { style: "line-height:1;border:none;" }
            }
            var nearestOriginCell = nearestCell && this.getOriginCellById(nearestCell.sid);

            //获取右边的单元格
            var rightCell = this.findMergingCell(this.headerLength + rInd, cInd + 1, -1, 0);
            var rightOriginCell = rightCell && this.getOriginCellById(rightCell.sid);

            //获取下边单元格
            var bottomCell = this.findMergingCell(this.headerLength + rInd + 1, cInd, 0, -1);
            var bottomOriginCell = bottomCell && this.getOriginCellById(bottomCell.sid);

            var style = "line-height:" + (nearestOriginCell ? nearestOriginCell.lineHeight : 1) +
                (nearestOriginCell ? (";height:" + nearestOriginCell.rptRow.height + "px") : "") +
                ";border-top:none;border-left:none;";

            if (rightOriginCell && bottomOriginCell) {
                var rightCellBorder = rightOriginCell.getBorder();
                var bottomCellBorder = bottomOriginCell.getBorder();
                style += "border-right:" + (rightCellBorder ? rightCellBorder.borderLeft : "none") +
                    ";border-bottom:" + (bottomCellBorder ? bottomCellBorder.borderTop : "none") + ";";
            }
            else if (rightOriginCell) {
                var rightCellBorder = rightOriginCell.getBorder();
                style += "border-bottom:none;border-right:" + (rightCellBorder ? rightCellBorder.borderLeft : "none") + ";";
            }
            else if (bottomOriginCell) {
                var bottomCellBorder = bottomOriginCell.getBorder();
                style += "border-right:none;border-bottom:" + (bottomCellBorder ? bottomCellBorder.borderTop : "none") + ";";
            }
            else {
                style += "border-bottom:none;border-right:none;";
            }
            return { style: style }
        },

        getPreCell: function (rowIndex, cellIndex) {
            var that = this;
            var grid = this.grid;
            var preCell = null;
            if (rowIndex == 0 && cellIndex == 0) {
                return null;
            }
            if (cellIndex - 1 < 0) {
                return grid.cells2(rowIndex - 1, grid.getColumnsNum() - 1);
            }
            return grid.cells2(rowIndex, cellIndex - 1);
        },

        /**
        * 根据行列索引获取表头dom元素
        */
        getHeaderCellDom: function (rInd, cInd) {
            var _grid = this.grid;
            if (this.fixedColCount && cInd < this.fixedColCount) {
                _grid = this.grid._fake;
            }
            var hdrTds = _grid.hdr.children[0].children[rInd + 1].children;
            for (var i = 0; i < hdrTds.length; i++) {
                var td = hdrTds[i];
                if (cInd >= td._cellIndexS && cInd < (td._cellIndexS + td.colSpan)) {
                    return td;
                }
            }
            return null;
        },

        /**
        * 获取扩展的左父或上父信息，如果单元格本身是扩展的返回本身，如果没有扩展的左父信息，则查找同一行是否有扩展单元格
        * pcell:要获取的单元格指向的原始单元格
        * parent:获取左父还是上父，hparent获取左父，vparent获取上父
        */
        getExpandParent: function (pcell, parent) {
            var that = this;
            if (!pcell) return null;
            if (parent == "hparent" && pcell.expand == 2) return pcell;
            if (parent == "vparent" && pcell.expand == 1) return pcell;
            var psection = pcell.rptRow.section;
            var expandParent = psection.getExpandParent(pcell, parent);
            //获取左父
            if (parent == "hparent" && !expandParent) {
                var dimesions = psection.originalMatrix.getDimesions();
                for (var i = 0; i < dimesions.cols; i++) {
                    var c = psection.findMergingOriginalCell(pcell.rowIndex, i, -1, 0);
                    if (c && c.expand == 2) {
                        expandParent = c;
                        break;
                    }
                }
                if (expandParent && (expandParent.hparentRowIndex + "_" + expandParent.hparentCellIndex) == pcell.id) {
                    expandParent = null;
                }
            }
                //获取上父
            else if (parent == "vparent" && !expandParent) {
                for (var i = 0; i < pcell.rowIndex; i++) {
                    var c = psection.findMergingOriginalCell(i, pcell.index, 0, -1);
                    if (c && c.expand == 1) {
                        expandParent = c;
                        break;
                    }
                }
                if (expandParent && (expandParent.vparentRowIndex + "_" + expandParent.vparentCellIndex) == pcell.id) {
                    expandParent = null;
                }
            }
            return expandParent;
        },

        /**
        * 获取两个扩展单元格之间的包含关系，如果是同一个单元格返回0，第一个包含第二个返回1，第二个包含第一个返回-1，没有关系返回null
        */
        getParentRelation: function (groupParent1, groupParent2) {
            if (!groupParent1 || !groupParent2) return null;
            if (groupParent1.id == groupParent2.id) return 0;
            if (groupParent1.expand == 0 || (groupParent1.expand != groupParent2.expand)) return null;
            var section1 = groupParent1.rptRow.section;
            var section2 = groupParent2.rptRow.section;
            if (section1.startCol != section2.startCol || section1.startRow != section2.startRow) {
                return null;
            }
            var parent = groupParent1.expand == "2" ? "hparent" : "vparent";
            var t_parentOCell1 = groupParent1;
            while (parent == "hparent" ? t_parentOCell1.hparent : t_parentOCell1.vparent) {
                t_parentOCell1 = section1.getExpandParent(t_parentOCell1, parent);
                if (!t_parentOCell1) break;
                if (t_parentOCell1.id == groupParent2.id) return -1;
            }
            var t_parentOCell2 = groupParent2;
            while (parent == "hparent" ? t_parentOCell2.hparent : t_parentOCell2.vparent) {
                var t_parentOCell2 = section1.getExpandParent(t_parentOCell2, parent);
                if (!t_parentOCell2) break;
                if (groupParent1.id == t_parentOCell2.id) return 1;
            }
            return null;
        },

        /*
        * 获取变量的值
        * contextCell: 如果获取单元格的值，这个参数为单元格对象，如果是获取数据集的值，则是第几条记录，如果这个参数是数字，则表示传入的是行列号的形式，则获取以行列号指示的单元格的值
        */
        getValue: function (exp, contextCell,header) {
            if (exp === undefined || exp === null) {
                return exp;
            }
            if (/^\d+$/.test(exp) && /^\d+$/.test(contextCell)) {
                if (exp >= this.grid.getRowsNum() || contextCell >= this.grid.getColumnsNum()) {
                    showAlert("错误！", '行列号参数不正确或者超出行列数范围！传入的参数必须是0到行列数之间的数字！', "error");
                    return "";
                }
                return this.grid.cells2(exp, contextCell).getValue();
            }
            if (/\{@value\}/g.test(exp)) {
                exp = exp.replace(/\{@value\}/g, "");
            }
            exp = dhx4.trim(exp);
            contextCell = pick(contextCell, this.grid.editor, (this.grid.getSelectedId() && this.grid.cells(this.grid.getSelectedId(), 0)));
            return this.rptExpress.calculate(exp, 1, contextCell,header);
        },

        /**
        * 根据上下文单元格和参数单元格获取取值区域
        */
        getGridGroupArea: function (contextCell, paramOCell) {
            if (!contextCell) return null;
            var that = this;
            var contextOCell = this.getOriginCellById(contextCell.cell._attrs.sid);
            if (contextOCell.isHeader || contextOCell.isTitle) {
                return {
                    startRowIndex: 0,
                    endRowIndex: this.grid.getRowsNum(),
                    startColIndex: contextCell.cell.parentNode._cellIndexS,
                    endColIndex: contextCell.cell.parentNode._cellIndexS + contextCell.cell.parentNode.colSpan
                }
            }
            var result = {
                startRowIndex: this.grid.getRowIndex(contextCell.cell.parentNode.idd),
                endRowIndex: this.grid.getRowIndex(contextCell.cell.parentNode.idd) + (contextCell.cell.rowSpan || 1),
                startColIndex: contextCell.cell._cellIndex,
                endColIndex: contextCell.cell._cellIndex + (contextCell.cell.colSpan || 1)
            };

            var paramVparentOCell = this.getExpandParent(paramOCell, "vparent"); //上父
            var paramHparentOCell = this.getExpandParent(paramOCell, "hparent"); //左父

            var contextVparentOCell = this.getExpandParent(contextOCell, "vparent");
            var contextHparentOCell = this.getExpandParent(contextOCell, "hparent");

            var relationV = this.getParentRelation(contextVparentOCell, paramVparentOCell);
            var relationH = this.getParentRelation(contextHparentOCell, paramHparentOCell);

            var maxVparentOCell = relationV == null ? paramVparentOCell : [paramVparentOCell, paramVparentOCell, contextVparentOCell][relationV + 1];
            var maxHparentOCell = relationH == null ? paramHparentOCell : [paramHparentOCell, paramHparentOCell, contextHparentOCell][relationH + 1];

            var contextCellRowIndex = this.grid.getRowIndex(contextCell.cell.parentNode.idd);
            var contextCellCellIndex = contextCell.cell._cellIndex;

            var resultHparentCells = [];
            var resultVparentCells = [];

            if (maxHparentOCell) {
                var aliasRowIndex = contextOCell.rowIndex - maxHparentOCell.rowIndex;
                var aliasCellIndex = contextOCell.index - maxHparentOCell.index;
                var resultHparentCell;
                //上下文单元格左父与参数单元格左父没有任何关系
                if (relationH == null) { }
                else {
                    resultHparentCell = this.grid.cells2(contextCellRowIndex - aliasRowIndex, contextCellCellIndex - aliasCellIndex).cell;
                    if (resultHparentCell._attrs.sid == maxHparentOCell.id) {
                        resultHparentCells.push(resultHparentCell);
                    }
                    else if (maxHparentOCell.dsFunc == "group") {
                        var rowIndex = contextCellRowIndex - aliasRowIndex - 1;
                        while (rowIndex >= 0) {
                            resultHparentCell = this.grid.cells2(rowIndex, contextCellCellIndex - aliasCellIndex).cell;
                            if (resultHparentCell._attrs.sid == maxHparentOCell.id) {
                                resultHparentCells.push(resultHparentCell);
                                break;
                            }
                            rowIndex--;
                        }
                    }
                }
            }

            if (maxVparentOCell) {
                var aliasRowIndex = contextOCell.rowIndex - maxVparentOCell.rowIndex;
                var aliasCellIndex = contextOCell.index - maxVparentOCell.index;
                var resultVparentCell;

                //上下文单元格上父与参数单元格上父没有任何关系
                if (relationV == null) { }
                else {
                    if (maxVparentOCell.isHeader || maxVparentOCell.isTitle) {
                        resultVparentCell = this.getHeaderCellDom(maxVparentOCell.rowIndex, maxVparentOCell.index)
                    }
                    else {
                        resultVparentCell = this.grid.cells2(contextCellRowIndex - aliasRowIndex, contextCellCellIndex - aliasCellIndex).cell;
                    }
                    if (resultVparentCell._attrs.sid == maxVparentOCell.id) {
                        resultVparentCells.push(resultVparentCell);
                    }
                    else if (maxVparentOCell.dsFunc == "group") {
                        var colIndex = contextCellCellIndex - aliasCellIndex - 1;
                        while (colIndex >= 0) {
                            resultVparentCell = this.grid.cells2(contextCellRowIndex - aliasRowIndex, colIndex).cell;
                            if (resultVparentCell._attrs.sid == maxVparentOCell.id) {
                                resultVparentCells.push(resultVparentCell);
                                break;
                            }
                            colIndex--;
                        }
                    }
                }
            }

            if (resultHparentCells.length > 0 && resultVparentCells.length > 0) {
                result.startRowIndex = this.grid.getRowIndex(resultHparentCells[0].parentNode.idd);
                result.endRowIndex = result.startRowIndex;
                for (var i = 0; i < resultHparentCells.length; i++) {
                    result.endRowIndex += (resultHparentCells[i].rowSpan || 1);
                }
                result.startColIndex = resultVparentCells[0]._cellIndex;
                result.endColIndex = result.startColIndex;
                for (var i = 0; i < resultVparentCells.length; i++) {
                    result.endRowIndex += (resultVparentCells[i].colSpan || 1);
                }
            }
            else if (resultHparentCells.length > 0) {
                result.startRowIndex = this.grid.getRowIndex(resultHparentCells[0].parentNode.idd);
                result.endRowIndex = result.startRowIndex;
                for (var i = 0; i < resultHparentCells.length; i++) {
                    result.endRowIndex += (resultHparentCells[i].rowSpan || 1);
                }
                result.startColIndex = 0;
                result.endColIndex = this.grid.getColumnsNum();
            }
            else if (resultVparentCells.length > 0) {
                result.startRowIndex = this.grid.getRowIndex(resultVparentCells[0].parentNode.idd);
                result.endRowIndex = result.startRowIndex + (resultVparentCells[0].rowSpan || 1);
                result.startColIndex = resultVparentCells[0]._cellIndex;
                result.endColIndex = result.startColIndex;
                for (var i = 0; i < resultVparentCells.length; i++) {
                    result.endRowIndex += (resultVparentCells[i].colSpan || 1);
                }
            }
            return result;
        },

        init: function () {
            this.grid = null;

            this.components = []; //

            this.rptType = ""; //自由格式
            this.inlineStyle = true; //内联样式
            this.rowNum = 0;
            this.colNum = 0;
            this.fixedColCount = 0; //锁定列
            this.fixedRowCount = 0; //锁定行

            this.startIndex = 0;//起始行
            this.isLoadAllData = false;//分页或滚动加载时是否加载完成所有数据
            this.totalcount = 0;//分组或分页加载时记录的总数
            this._laypage = null;
            this.dataCursor = undefined;

            this.fonts = new Map(); //字体对象；
            this.borders = new Map(); //边框对象；
            this.aligns = new Map();//对齐属性对象；
            this.numbers = new Map();//数字格式类；
            this.cellTypes = new Map(); //单元格类型；
            this.events = new Map(); //事件类型；
            this.pubvars = new Map(); //变量
            this.menus = new Map(); //右键菜单类型；
            this.events = new Map();//事件
            this.links = new Map(); //超链接类型；
            this.queryDatastores = new Map(); //查询数据集
            this.storageDataStores = new Map();//入库数据集；            
            this.sections = [];//分片
            this.columns = new Map();//分栏
            this.subReports = new Map(); //子报表
            this.matrix = new RptMatrix(this); //矩阵对象
            this.rptExpress = new RptExpress(this);//表达式对象

            this.colWidths = [];
            this.headerLength = 0;
            this.headers = [];

            this.highlightCells = [];
            this.sameValueMergedCells = []; //同值合并的单元格
            this.validateErrorCells = []; //校验失败的单元格
            this.dataBindStoreNames = [];//单元格绑定的数据集名称(datavalue中绑定的数据集
            this.requestDsNames = []; //所有需要前台查询的数据集名称，包括显示值中定义的数据集、下拉框、下拉树、下拉网格、上传、审批等
            this.emptyRows = []; //添加删除行操作中如果删除最后一行后留下的空行
            this.expressCell = { //包含表达式的单元格
                select: [],
                group: [],
                route: [],
            }
            this._cell_combos = {}; //下拉框
            this._cell_trees = {}; //下拉树
            this._cell_grids = {}; //下拉网格

            // 滚动加载后面的合计行再滚动时重复出现问题
            this.lastRow;// 分组(group)或者列表（select）后面的行下标
            this.lastRows=[];
            this.lastDateRows={};//分组(group)或者列表（select）后面的数据行集合

            //清空数据集原先的参数(用于一个报表刷新另外一个报表)
            this.clearParams=false;

            if (window.UE && this._ueditor) {
                UE.delEditor(this.reportId + "_ueditor");
                this._ueditor = null;
            }
        },

        initContainer: function () {
            var that = this;
            this.rptContainer.innerHTML = "";
            this.gridContainer = this.rptContainer;

            //this.loadMode = "";//加载模式，“paging”:分页，“smart”：滚动
            if (this.loadMode == "paging") {
                this.gridParentContainer = document.createElement("div");
                this.gridParentContainer.style.overflow = "auto";

                this.gridContainer = document.createElement("div");
                this.gridContainer.style.position = "relative";

                this.pageContainer = document.createElement("div");
                this.pageContainer.id = "pagingArea";
                this.pageContainer.style.height = this.pageConainerHeight + "px";
                this.pageContainer.style.textAlign = this.align || "center";

                this.gridParentContainer.appendChild(this.gridContainer);
                this.rptContainer.appendChild(this.gridParentContainer);
                this.rptContainer.appendChild(this.pageContainer);

            }

            this.setSize();
            this.setPosition();
            if (!dhx4.isIE) {
                this.gridContainer.style.border = "0px solid #c7c7c7";
            }
            else {
                this.gridContainer.style.cssText += ";border:0px solid #c7c7c7;";
            }
        },

        /*
        * 初始化网格
        */
        initGrid: function () {
            var that = this;
            var grid = this.grid = new dhtmlXGridObject(this.gridContainer);

            var setHeader = grid.setHeader;
            grid.setHeader = function (hdrStr, splitSign, styles, _class, _attrs) {
                setHeader.apply(grid, [hdrStr, splitSign, styles]);
                this.__class = _class || [];
                this.__attrs = _attrs || [];
            }
            var setColumnLabel = grid.setColumnLabel;
            grid.setColumnLabel = function (c, label, ind, hdr) {
                setColumnLabel.apply(this, [c, label, ind, hdr]);
                var z = (hdr || this.hdr).rows[ind || 1];
                var col = (z._childIndexes ? z._childIndexes[c] : c);
                if (!z.cells[col]) return;
                if (this.__class[c]) {
                    z.cells[col].className = this.__class[c];
                }
                if (this.__attrs[c]) {
                    z.cells[col]._attrs = this.__attrs[c];
                    z.cells[col].firstChild._attrs = this.__attrs[c];

                    var originCell = that.getOriginCellById(this.__attrs[c].sid);
                    if (originCell && ["vmdlink", "vmdch"].indexOf(originCell.getType()) != -1) {
                        z.cells[col].grid = this;
                        z.cells[col].firstChild._cellType = originCell.getType();
                        var aeditor = this.cells4(z.cells[col].firstChild);
                        z.cells[col].idd = aeditor;

                        if (aeditor) aeditor.setValue(label);
                    }
                }
            }
            var _doOnScroll = grid._doOnScroll;
            grid._doOnScroll = function (e, mode) {
                _doOnScroll.apply(this, [e, mode]);
                this._lastScrollTop = this._lastScrollTop || 0;
                this._lastScrollLeft = this._lastScrollLeft || 0;
                //纵向滚动条滚动
                if (this._lastScrollTop != this.objBox.scrollTop) {
                    that.callEvent("onVScroll", [this._lastScrollTop, this.objBox.scrollTop]);
                    if (this.objBox.scrollHeight == Math.round(this.objBox.scrollTop + this.objBox.clientHeight)) {
                        that.callEvent("onScrollToBottom", [this.objBox.scrollLeft, this.objBox.scrollTop]);
                    }
                }
                    //横向向滚动条滚动
                else if (this._lastScrollLeft != this.objBox.scrollLeft) {
                    that.callEvent("onHScroll", [this._lastScrollLeft, this.objBox.scrollLeft]);
                }
                this._lastScrollTop = this.objBox.scrollTop;
                this._lastScrollLeft = this.objBox.scrollLeft;
            }

            grid.hwReport = this;
            grid.gridId = grid.uid();
            grid.setImagePath(this.dhtmxlUrl + "/lib/dhtmlx/skins/material/imgs/");
            var headers = this.headers;
            if (headers.length == 0) {//没有表头
                var cols = this.matrix.getDimesions().cols;
                var headerValues = [];
                for (var i = 0; i < cols; i++) {
                    headerValues[i] = i + "";
                }
                grid.setHeader(headerValues.join(","), null, [], []);
                grid.setNoHeader(true);//设置是否有表头
                //grid.enableAutoHeight(true);
            }
            else {
                grid.setNoHeader(false);
                grid.enableAutoHeight(false);
				if(that.vmdreport&&that.vmdreport.customAttachHeaders&&that.vmdreport.customAttachHeaders.length>0){					
					for (var i = 0; i < that.vmdreport.customAttachHeaders.length; i++) {
						if (i == 0) {
							grid.setHeader(that.vmdreport.customAttachHeaders[0], null, headers[0][1], headers[0][2], headers[0][3]);
						}
						else {
							grid.attachHeader(that.vmdreport.customAttachHeaders[i], headers[0][1], "_aHead", headers[0][2], headers[0][3]);
						}
					}	
				}
				else
				{
					for (var i = 0; i < headers.length; i++) {
						if (i == 0) {
							grid.setHeader(headers[i][0], null, headers[i][1], headers[i][2], headers[i][3]);
						}
						else {
							grid.attachHeader(headers[i][0], headers[i][1], "_aHead", headers[i][2], headers[i][3]);
						}
					}			
				}	
				
            }

            if (this.gridAutoHeight) {
                grid.enableAutoHeight(true, null, true);//根据内容调整报表高度
            }
            grid.enableEditEvents(true, false, true); //启用单击编辑单元格事件
            grid.setInitWidths(this.colWidths.join(","));
            grid.setColAlign(this.colHAlign.join(","));
            grid.setColTypes(this.colTypes.join(","));
            grid.setColAttrs(this.colAttrs);
            grid.setColClassName(this.colClass);
            if (this.columnIds) {
                grid.setColumnIds(this.columnIds.join(","));
            }
            if (this.colStyles) {
                grid.setColStyles(this.colStyles);
            }
            grid.enableAlterCss("even", "uneven");
            //grid.enableTooltips('false'); //禁用数据提示的显示
            if (!this.columnResize) {
                grid.enableResizing("false"); //禁止表头拖动改变宽度
            }
            grid.setDisabled(this.disabled);
            grid.enabledSelecteStates(this.selecteStates);
            grid.enableMultiselect(this.multiselect);
            //grid.enableMarkedCells(false);//设置单个单元格可被选中
            grid.enableBlockSelection();
            grid.enableColSpan(true);
            grid.enableRowspan(true);
            grid.enableExcelKeyMap();

            grid.init();
            grid.setAwaitedRowHeight(this.getRowCSSHeight(this.instantRow));

            if (this.fixedColCount) {//锁定列
                //grid.enableAutoWidth(false);
                grid.hdrBox.children[1].className+=" split"

                grid.splitAt(this.fixedColCount);
                grid._fake.hdrBox.style.cssText += ";border-bottom-width:0px";
				if(this.loadMode=="smart")
					grid._fake._srnd=true
                if (!dhx4.isIE) {
                }
                else {
                }
            }
            grid.hdrBox.style.cssText += ";border-bottom-width:0px";
            if (!dhx.isIE) { }
            else { }
            var dimesion = this.matrix.getDimesions();
            var rows = dimesion.rows - this.headerLength;
            var cols = dimesion.cols;

            if (this.gridAutoWidth) {
                grid.objBox.style.overflowX = "hidden";
            }
            if (this.gridAutoHeight) {
                grid.objBox.style.overflowY = "hidden";
            }

            this.floatTitleContainer = null;
            this.setTitleFloat(true);
        },

        initMenus: function () {
            var that = this;

            //初始化选择区域右键菜单
            this.contextMenu_selectionObj = new dhtmlXMenuObject();
            this.contextMenu_selectionObj.setIconsPath(this.dhtmxlUrl + "/dhtmlx5/skins/material/imgs/");
            this.contextMenu_selectionObj.renderAsContextMenu();
            this.contextMenu_selectionObj.loadStruct([
                    {
                        id: "copy", text: "复制", items: []
                    }
                    , {
                        id: "cut", text: "剪切", items: []
                    }
                    //, {
                    //    id: "paste", text: "黏贴", items: []
                    //}
            ]);

            this.menus.each(function (key, _menu, index) {
                var contextMenu = _menu.contextMenu = new dhtmlXMenuObject();
                contextMenu.setIconsPath(this.dhtmxlUrl + "/dhtmlx5/skins/material/imgs/");
                contextMenu.renderAsContextMenu();
                if (_menu.source == "1" && _menu.sets) {
                    var ds = that.getQueryStoreByName(_menu.sets);
                    if (ds && ds.dhtmlxDatastore) {
                        contextMenu.sync(ds.dhtmlxDatastore, { id: _menu.id || "id", text: _menu.text || "", pid: _menu.pid || "" });
                    }
                }
                else if (_menu.source == "0" && _menu.sets) {
                    contextMenu.loadStruct(_menu.sets);
                }
            })
        },

        insertRules: function () {
            var that = this;
            if (!that.inlineStyle) {
                return;
            }

            for (var i = 0; i < that.classPrefixs.length; i++) {
                var classPrefix = that.classPrefixs[i];
                insertRule(classPrefix + "." + that.reportId + "-v-top", "vertical-align:top;");
                insertRule(classPrefix + "." + that.reportId + "-p-0", "padding:0px;");
                insertRule(classPrefix + "." + "auto-wrap", "white-space:normal;word-break: break-word;"); //自动换行
            }
            //添加对齐样式
            this.aligns.each(function (key, align, index) {
                for (var i = 0; i < that.classPrefixs.length; i++) {
                    var classPrefix = that.classPrefixs[i];
                    insertRule(classPrefix + "." + that.reportId + "-a-" + key, align.getCSS(false));
                }
            })
            this.borders.each(function (key, border, index) {
                for (var i = 0; i < that.classPrefixs.length; i++) {
                    var classPrefix = that.classPrefixs[i];
                    insertRule(classPrefix + "." + that.reportId + "-b-" + key + ".c-top.c-first", border.getCSS([1, 1, 1, 1], false));
                    insertRule(classPrefix + "." + that.reportId + "-b-" + key + ".c-top", border.getCSS([1, 1, 1, 0], false));
                    insertRule(classPrefix + "." + that.reportId + "-b-" + key + ".c-first", border.getCSS([0, 1, 1, 1], false));
                    insertRule(classPrefix + "." + that.reportId + "-b-" + key, border.getCSS([0, 1, 1, 0], false));
                }
            })
            this.fonts.each(function (key, font, index) {
                for (var i = 0; i < that.classPrefixs.length; i++) {
                    var classPrefix = that.classPrefixs[i];
                    insertRule(classPrefix + "." + that.reportId + "-f-" + key, font.getCSS(false));
                }
            })
        },

        /**
        * 对片对象中的结果矩阵进行整合
        */
        integrateMatrix: function () {

            //先行后列从大到小排序
            this.sections.sort(function (s1, s2) {
                if (s1.startRow == s2.startRow) {
                    return s1.startCol - s2.startCol;
                }
                return s1.startRow - s2.startRow;
            });

            //确定左片和上片
            for (var i = 0; i < this.sections.length; i++) {
                var section_i = this.sections[i];
                section_i.leftSections = [];
                section_i.topSections = [];
                for (var j = 0; j < this.sections.length; j++) {
                    if (i == j) {
                        continue;
                    }
                    var section_j = this.sections[j];
                    var dimesion_i = section_i.resultMatrix.getDimesions();
                    var dimesion_j = section_j.resultMatrix.getDimesions();

                    var dimesion_i_original = section_i.originalMatrix.getDimesions();
                    var dimesion_j_original = section_j.originalMatrix.getDimesions();

                    //左边
                    if ((section_j.startCol + dimesion_j_original.cols) == section_i.startCol && (section_j.startCol + dimesion_j.cols) >= section_i.startCol
                        && (section_j.startRow < (section_i.startRow + dimesion_i.rows))
                        && (section_j.startRow + dimesion_j.rows) > section_i.startRow) {
                        section_i.leftSections.push(section_j);
                    }
                    //上边
                    if ((section_j.startRow + dimesion_j_original.rows) == section_i.startRow && (section_j.startRow + dimesion_j.rows) >= section_i.startRow
                        && (section_j.startCol < (section_i.startCol + dimesion_i.cols))
                        && (section_j.startCol + dimesion_j.cols) > section_i.startCol) {
                        section_i.topSections.push(section_j);
                    }
                }
            }

            //递归计算当前片上边所有片的行数或左边所有片的列数
            function computeRowsOrCols(section, isTop) {
                var sections = isTop ? section.topSections : section.leftSections;
                if (sections.length == 0) {
                    return isTop ? section.startRow : section.startCol;
                }
                return Math.max.apply(null, sections.map(function (s) {
                    var dimesion = s.resultMatrix.getDimesions();
                    return isTop ? (dimesion.rows + computeRowsOrCols(s, isTop)) : (dimesion.cols + computeRowsOrCols(s, isTop));
                }));
            }

            //修改起始行列
            for (var i = 0; i < this.sections.length; i++) {
                var section = this.sections[i];
                section.resultStartRow = computeRowsOrCols(section, true);
                section.resultStartCol = computeRowsOrCols(section, false);
            }

            var maxRows = Math.max.apply(null, this.sections.map(function (s) { return s.resultStartRow + s.resultMatrix.getDimesions().rows - 1 }));
            var maxCols = Math.max.apply(null, this.sections.map(function (s) { return s.resultStartCol + s.resultMatrix.getDimesions().cols - 1 }));
            this.matrix.generate(maxRows, maxCols);

            //将片数据贴入矩阵中
            for (var i = 0; i < this.sections.length; i++) {
                var s = this.sections[i];
                this.matrix.fill(s.resultStartRow - 1, s.resultStartCol - 1, s.resultMatrix);
            }
        },

        isCheckedAll: function (col) {
            return this.grid["_is_checked_all_col" + col];
        },

        /**
        * 键盘事件
        */
        keyTap: function (cFlag, sFlag) {
            var that = this;
            var grid = this.grid;
            if (grid.editor) {
                return that.keyMoveRight(cFlag, sFlag);
            }
            else {
                for (var i = 0; i < grid.getRowsNum() ; i++) {
                    var cellIndex = 0;
                    for (; cellIndex < grid.getColumnsNum() ;) {
                        var cellObj = grid.cells2(i, cellIndex);
                        var oCell = that.getOriginCellById(grid.editor.cell._attrs.sid);
                        if (["vmdlink", "vmdorder", "cntr", "vmdguid", "vmdsubreport", "vmdbutton", "vmdapprove", "vmdupload"].indexOf(oCell.getType()) != -1
                           || oCell.getWidth() == 0 || cellObj.isDisabled()) {
                            cellIndex += cellObj.cell.colSpan;
                        }
                        else {
                            grid.selectCell(i, cellIndex, true);
                            grid.editCell();
                            return;
                        }
                    }
                }
            }
        },

        keyEnter: function (cFlag, sFlag) {
            var that = this;
            var grid = this.grid;
            if (grid.editor) {
                var oCell = that.getOriginCellById(grid.editor.cell._attrs.sid);
                if (oCell.getType() == "vmdcheckbox") {
                    var checkbox = grid.editor.getCellCheckBox();
                    var optId = checkbox.currentSelectId;
                    if (checkbox.t[optId]) {
                        if (checkbox.t[optId]._checked) {
                            that.keyMoveRight(cFlag, sFlag, ['vmdcheckbox']);
                        }
                        else {
                            checkbox.t[optId].click();
                            checkbox.currentSelectId = optId;
                            checkbox.hasSelected = true;
                        }
                    }
                }
                else {
                    if (sFlag) {
                        return that.keyMoveLeft(cFlag, sFlag);
                    }
                    else if (cFlag) {
                        return that.keyMoveDown(cFlag, sFlag);
                    }
                    else {
                        return that.keyMoveRight(cFlag, sFlag);
                    }
                }
                return false;
            }
            return true;
        },

        //specialTypes 像radio，check类型的单元格是否是内部操作还是直接跳过编辑下一个单元格
        keyMoveRight: function (cFlag, sFlag, specialTypes) {
            var that = this;
            var grid = this.grid;
            if (grid.editor) {
                var oCell = that.getOriginCellById(grid.editor.cell._attrs.sid);
                var rowId = grid.editor.cell.parentNode.idd;
                var rowIndex = grid.getRowIndex(rowId);
                for (var i = rowIndex; i < grid.getRowsNum() ; i++) {
                    var cellIndex = grid.editor.cell._cellIndex;
                    if (i == rowIndex) {//当前行
                        var jump = specialTypes && specialTypes.indexOf(oCell.getType());
                        if (jump) {
                            cellIndex += grid.editor.cell.colSpan;
                        }
                        else if (oCell.getType() != "vmdcheckbox") {
                            cellIndex += grid.editor.cell.colSpan;
                        }
                    }
                    else {
                        cellIndex = 0;
                    }
                    for (; cellIndex < grid.getColumnsNum() ;) {
                        var cellObj = grid.cells2(i, cellIndex);
                        oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                        if (!oCell) {
                            cellIndex++;
                            continue;
                        }
                        if (["vmdlink", "vmdorder", "cntr", "vmdguid", "vmdsubreport", "vmdbutton", "vmdapprove", "vmdupload"].indexOf(oCell.getType()) != -1
                            || oCell.getWidth() == 0 || cellObj.isDisabled()) {
                            cellIndex += cellObj.cell.colSpan;
                        }
                        else if (oCell.getType() == "vmdcheckbox") {
                            var checkBox = cellObj.getCellCheckBox();
                            if (!checkBox.hasSelected) {
                                grid.selectCell(i, cellIndex, true);
                                grid.editCell();
                                checkBox.hasSelected = true;
                                if (!checkBox.moveToNext()) {
                                    checkBox.hasSelected = false;
                                    cellIndex += cellObj.cell.colSpan;
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                if (!checkBox.moveToNext()) {
                                    checkBox.hasSelected = false;
                                    cellIndex += cellObj.cell.colSpan;
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        else {
                            grid.selectCell(i, cellIndex, true);
                            grid.editCell();
                            return false;
                        }
                    }
                }
                return false;
            }
            return true;
        },

        keyMoveLeft: function (cFlag, sFlag) {
            var that = this;
            var grid = this.grid;
            if (grid.editor) {
                var oCell = that.getOriginCellById(grid.editor.cell._attrs.sid);
                var rowId = grid.editor.cell.parentNode.idd;
                var rowIndex = grid.getRowIndex(rowId);
                for (var i = rowIndex; i >= 0; i--) {
                    var cellIndex = grid.editor.cell._cellIndex;
                    if (i == rowIndex) {//当前行
                        if (oCell.getType() != "vmdcheckbox") {
                            var preCell = that.getPreCell(i, cellIndex);
                            if (!preCell) {
                                //grid.editStop();
                                return true;
                            }
                            cellIndex -= preCell.cell.colSpan;
                            if (cellIndex < 0) {
                                continue;
                            }
                        }
                    }
                    else {
                        cellIndex = grid.getColumnsNum() - 1;
                    }
                    for (; cellIndex >= 0;) {
                        var cellObj = grid.cells2(i, cellIndex);
                        oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                        if (["vmdlink", "vmdorder", "cntr", "vmdguid", "vmdsubreport", "vmdbutton", "vmdapprove", "vmdupload"].indexOf(oCell.getType()) != -1
                           || oCell.getWidth() == 0 || cellObj.isDisabled()) {
                            var preCell = that.getPreCell(i, cellIndex);
                            if (!preCell) {
                                //grid.editStop();
                                return true;
                            }
                            cellIndex -= preCell.cell.colSpan;
                        }
                        else if (oCell.getType() == "vmdcheckbox") {
                            var checkBox = cellObj.getCellCheckBox();
                            if (!checkBox.hasSelected) {
                                grid.selectCell(i, cellIndex, true);
                                grid.editCell();
                                checkBox.hasSelected = true;
                                if (!checkBox.moveToPre()) {
                                    checkBox.hasSelected = false;
                                    var preCell = that.getPreCell(i, cellIndex);
                                    if (!preCell) {
                                        //grid.editStop();
                                        return true;
                                    }
                                    cellIndex -= preCell.cell.colSpan;
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                if (!checkBox.moveToPre()) {
                                    checkBox.hasSelected = false;
                                    var preCell = that.getPreCell(i, cellIndex);
                                    if (!preCell) {
                                        //grid.editStop();
                                        return true;
                                    }
                                    cellIndex -= preCell.cell.colSpan;
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        else {
                            grid.selectCell(i, cellIndex, true);
                            grid.editCell();
                            return false;
                        }
                    }
                }
                return false;
            }
            return true;
        },

        keyMoveDown: function (cFlag, sFlag) {
            var that = this;
            var grid = this.grid;
            if (grid.editor) {
                var oCell = that.getOriginCellById(grid.editor.cell._attrs.sid);
                var rowId = grid.editor.cell.parentNode.idd;
                var cellIndex = grid.editor.cell._cellIndex;
                var rowIndex = grid.getRowIndex(rowId);
                if (rowIndex + grid.editor.cell.rowSpan >= grid.getRowsNum()) {
                    //grid.editStop();
                    return true;
                }
                for (; rowIndex < grid.getRowsNum() ;) {
                    if (rowIndex == grid.getRowsNum() - 1) {//最后一行
                        //grid.editStop();
                        return true;
                    }
                    else {
                        rowIndex = rowIndex + grid.editor.cell.rowSpan;
                        var cellObj = grid.cells2(rowIndex, cellIndex);
                        oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                        if (!oCell) {
                            break;
                        }
                        if (["vmdlink", "vmdorder", "cntr", "vmdguid", "vmdsubreport", "vmdbutton", "vmdapprove", "vmdupload"].indexOf(oCell.getType()) != -1
                             || oCell.getWidth() == 0 || cellObj.isDisabled()) {
                            rowIndex += cellObj.cell.rowSpan;
                        }
                        else if (oCell.getType() == "vmdcheckbox") {
                            var checkBox = cellObj.getCellCheckBox();
                            grid.selectCell(rowIndex, cellIndex, true);
                            grid.editCell();
                            checkBox.hasSelected = true;
                            if (!checkBox.moveToNext()) {
                                rowIndex += cellObj.cell.rowSpan;
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            grid.selectCell(rowIndex, cellIndex, true);
                            grid.editCell();
                            return false;
                        }
                    }
                }
                return false;
            }
            return true;
        },

        keyMoveUp: function (cFlag, sFlag) {
            var that = this;
            var grid = this.grid;
            if (grid.editor) {
                var oCell = that.getOriginCellById(grid.editor.cell._attrs.sid);
                var rowId = grid.editor.cell.parentNode.idd;
                var cellIndex = grid.editor.cell._cellIndex;
                var rowIndex = grid.getRowIndex(rowId);

                if (rowIndex - grid.editor.cell.rowSpan < 0) {
                    //grid.editStop();
                    return true;
                }
                for (; rowIndex >= 0;) {
                    if (rowIndex == 0) {//第一行
                        //grid.editStop();
                        return true;
                    }
                    else {
                        rowIndex = rowIndex - grid.editor.cell.rowSpan;
                        var cellObj = grid.cells2(rowIndex, cellIndex);
                        oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                        if (["vmdlink", "vmdorder", "cntr", "vmdguid", "vmdsubreport", "vmdbutton", "vmdapprove", "vmdupload"].indexOf(oCell.getType()) != -1
                          || oCell.getWidth() == 0 || cellObj.isDisabled()) {
                            rowIndex -= cellObj.cell.rowSpan;
                        }
                        else if (oCell.getType() == "vmdcheckbox") {
                            var checkBox = cellObj.getCellCheckBox();
                            grid.selectCell(rowIndex, cellIndex, true);
                            grid.editCell();
                            checkBox.hasSelected = true;
                            if (!checkBox.moveToPre()) {
                                rowIndex -= cellObj.cell.rowSpan;
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            grid.selectCell(rowIndex, cellIndex, true);
                            grid.editCell();
                            return false;
                        }
                    }
                }
                return false;
            }
            return true;
        },

        /**
        * type: append追加，默认重新加载
        */
        loadData: function (datas, type, callback) {
            if (vmd.isString(datas)) {
                eval("dhtmlx.temp=" + datas + ";");
                datas = dhtmlx.temp;
            }

            if (type == "append") {
                this.matrix.rows = this.matrix.rows.concat(datas.datas);
                var dimesion = this.matrix.getDimesions();
                var rows = dimesion.rows - this.headerLength;
                var cols = dimesion.cols;
                this.grid.parse({
                    colcount: cols,
                    rowcount: rows,
                    pos: rows,
                    datas: datas.datas
                }, "custom_json");
            }
            else {
                this.storageDataStores.each(function (key, _store, index) {
                    _store.clear();
                });

                this.matrix.rows = datas.datas;
                var dimesion = this.matrix.getDimesions();
                var rows = dimesion.rows - this.headerLength;
                var cols = dimesion.cols;
                if (this.expandType == "c" || this.expandType == "h") {
                    this.clearGrid(true);
                    this.grid = null;
                    this.prepare();
                    this.initContainer();
                    this.initGrid();
                    this.attachGridEvent();
                }
                else {
                    this.clearGrid();
                    this.grid.parse({
                        colcount: cols,
                        rowcount: rows,
                        datas: this.matrix.rows.slice(this.headerLength)
                    }, "custom_json");
                }
            }

            this.setSize();
            this.setPosition();
            this.fillStorageOnRendered("add");
            this.updateRelativeCells();//刷新定义显示值的单元格
            if (callback) {
                callback.apply(this, [])
            }
        },

        /*
         *加载json文件
         */
        loadJSON: function (json, callback) {
            if (!json) {
                this.vmdreport.myMask.hide();
                showAlert("解析失败！", "后台服务返回数据出错！可能的原因：1、数据访问服务不是最新的，请检查是否已更新最新数据访问服务！", "error");
                return;
            }
            this.init();
            this._callback = callback;
            if (typeof json == "string") {
                try {
                    eval("dhtmlx.temp=" + json + ";");
                    json = dhtmlx.temp;
                } catch (e) {
                    this.vmdreport.myMask.hide();
                    showAlert("JSON格式不正确！", "详细信息请打开调试查看控制台中输出的json数据！", "error");
                    console.log(json);
                    return;
                }
            }
            this.version = json.Version;
            this.subs = json.subs;
            this.parse(json.main);
            this.analysis();
            this.integrateMatrix();
            this.insertRules();

            this.loadJS(function () {
                this.prepare();
                this.initContainer();
                this.initMenus();
                this.initGrid();
                this.attachGridEvent();
                this.updateDatastore();
                this.callEvent("onModeRendered", [this]);
            });
        },

        loadJS: function (callback) {
            var that = this;
            var cellTypes = [];
            this.cellTypes.each(function (name, _type, index) {
                if (cellTypes.indexOf(_type.getType()) == -1) {
                    cellTypes.push(_type.getType());
                }
            });
            loadJSChains = [];
            if (!window.laypage) {
                loadJSChains.push(dhtmxlUrl + '/lib/laypage/laypage.js');
            }
            if ((cellTypes.indexOf("vmdlaydate") != -1 || cellTypes.indexOf("vmdapprove") != -1) && !window.laydate) {
                loadCss({ url: dhtmxlUrl + '/lib/laydate/theme/default/laydate.css' });
                loadJSChains.push(dhtmxlUrl + '/lib/laydate/laydate.src.js');
            }
            if (cellTypes.indexOf("vmdeditor") != -1) {
                loadJSChains.push(dhtmxlUrl + '/lib/ueditor/ueditor.config.js');
                loadJSChains.push(dhtmxlUrl + '/lib/ueditor/ueditor.all.js');
                loadJSChains.push(dhtmxlUrl + '/lib/ueditor/lang/zh-cn/zh-cn.js');
                loadJSChains.push(dhtmxlUrl + '/lib/ueditor/kityformula-plugin/addKityFormulaDialog.js');
                loadJSChains.push(dhtmxlUrl + '/lib/ueditor/kityformula-plugin/getKfContent.js');
                loadJSChains.push(dhtmxlUrl + '/lib/ueditor/kityformula-plugin/defaultFilterFix.js');
            }
            loadJSChains.push(dhtmxlUrl + '/report/filedSelect/configGrid.js');
            loadJSChains.push(dhtmxlUrl + '/report/filedSelect/SelectFieldGrid.js');
            loadJSChains.push(dhtmxlUrl + '/report/filedSelect/upLoadJs.js');
            loadJSChains.push(reportUrl + '/libs/jQuery.print.js');
            $LAB.script(loadJSChains).wait(function () {
                callback.call(that);
            });
        },

        //forceMove:是否只能在扩展区域内移动, true可以移动出扩展区域，默认false
        moveUp: function (rId, forceMove) {
            rId = rId || this.grid.getSelectedRowId();
            if (!rId) {
                showAlert("提示！", "请选择要移动的行！", "info");
            }
            if (forceMove) {
                this.grid.moveRowUp(rId);
                this.resetCounter();
                return;
            }
            var currentRowIndex = this.grid.getRowIndex(rId);
            var upRowIndex = currentRowIndex - 1;
            var canMove = false;
            if (upRowIndex >= 0) {
                var currentCell = this.grid.cells2(currentRowIndex, 0);
                var upCell = this.grid.cells2(upRowIndex, 0);
                if (currentCell.cell._attrs.sid == upCell.cell._attrs.sid) {
                    canMove = true;
                }
            }
            if (canMove) {
                this.grid.moveRowUp(rId);
                this.resetCounter();
            }
            else {
                if (!checkdhtmlxMessage()) {
                    insertRule(".dhtmlx_message_area", "text-align:center;right:" + (document.body.clientWidth - 250) / 2 + "px");
                    dhtmlx.message({
                        type: "info",
                        text: "已移动到最顶部！",
                        position: "bottom",
                        expire: 2000
                    })
                }
            }
        },

        moveDown: function (rId, forceMove) {
            rId = rId || this.grid.getSelectedRowId();
            if (!rId) {
                showAlert("提示！", "请选择要移动的行！", "info");
            }
            if (forceMove) {
                this.grid.moveRowDown(rId);
                this.resetCounter();
                return;
            }
            var currentRowIndex = this.grid.getRowIndex(rId);
            var downRowIndex = currentRowIndex + 1;
            var canMove = false;
            if (downRowIndex < this.grid.getRowsNum()) {
                var currentCell = this.grid.cells2(currentRowIndex, 0);
                var downCell = this.grid.cells2(downRowIndex, 0);
                if (currentCell.cell._attrs.sid == downCell.cell._attrs.sid) {
                    canMove = true;
                }
            }
            if (canMove) {
                this.grid.moveRowDown(rId);
                this.resetCounter();
            }
            else {
                if (!checkdhtmlxMessage()) {
                    insertRule(".dhtmlx_message_area", "text-align:center;right:" + (document.body.clientWidth - 250) / 2 + "px");
                    dhtmlx.message({
                        type: "info",
                        text: "已移动到最底部！",
                        position: "bottom",
                        expire: 2000
                    })
                }
            }
        },

        parse: function (json) {
            var that = this;
            //添加分片之后的json结构
            this.rowNum = parseInt(json.body.rowNum || 0);
            this.colNum = parseInt(json.body.colNum || 0);
            this.fixedColCount = parseInt(json.body.fixedcol || 0); //锁定列
            this.fixedRowCount = parseInt(json.body.fixedrow || 0); //锁定行
            this.srcColumnWidth = json.body.columns.width;
            if (this.gridAutoWidth) {
                this.colWidths = this.regenAutoWidths(this.srcColumnWidth, this.width);
            }
            else if (this.patchLastColIfLessWinW) {
                var _colwidths = json.body.columns.width;
                var total = _colwidths.reduce(function (total, num) { return total + parseInt(num) }, 0);
                var _remainWidth = Math.max(Math.floor(this.width - total) - 2 - 18, 0);
                if (json.body && json.body.sections) {
                    //找到最后一片，插入宽度为_remainWidth的列
                    var insertNewColumn = false;
                    for (var i = 0; i < json.body.sections.length; i++) {
                        var sec = json.body.sections[i];
                        if (sec.endcol == this.colNum) {
                            sec.endcol += 1;
                            if (sec.title.length > 0) {
                                var cells = sec.title[0].cells;
                                if (cells.length > 0) {
                                    cells[0].colspan = parseInt(cells[0].colspan) + 1;
                                    cells.push({
                                        align: cells[cells.length - 1].align,
                                        backgroundcolor: cells[cells.length - 1].backgroundcolor,
                                        borders: cells[cells.length - 1].borders,
                                        data: "",
                                        fonts: cells[cells.length - 1].fonts,
                                        merged: "2",
                                    });
                                    insertNewColumn = true;
                                }
                            }

                            for (var j = 0; j < sec.header.length; j++) {
                                var cells = sec.header[j].cells;
                                if (cells.length > 0) {
                                    cells.push({
                                        align: cells[cells.length - 1].align,
                                        backgroundcolor: cells[cells.length - 1].backgroundcolor,
                                        borders: cells[cells.length - 1].borders,
                                        data: "",
                                        fonts: cells[cells.length - 1].fonts,
                                        merged: "0",
                                    });
                                    insertNewColumn = true;
                                }
                            }
                            for (var j = 0; j < sec.data.length; j++) {
                                var cells = sec.data[j].cells;
                                if (cells.length > 0) {
                                    cells.push({
                                        align: cells[cells.length - 1].align,
                                        backgroundcolor: cells[cells.length - 1].backgroundcolor,
                                        borders: cells[cells.length - 1].borders,
                                        data: "",
                                        fonts: cells[cells.length - 1].fonts,
                                        merged: "0",
                                    });
                                    insertNewColumn = true;
                                }
                            }
                        }
                    }
                    if (insertNewColumn) {
                        this.colNum += 1;
                        _colwidths.push(_remainWidth);
                    }
                }
                this.colWidths = _colwidths;
            }
            else {
                this.colWidths = json.body.columns.width;
            }
            this.oldColWidths = json.body.columns.oldwidth;
			if(!this.oldColWidths )
				 this.oldColWidths = Ext.Array.clone(this.colWidths);
            this.hiddenFields = json.body.columns.hiddenFields;
            if (json.style) {
                //初始化字体对象
                for (var key in json.style.fonts) {
                    if (!json.style.fonts.hasOwnProperty(key)) {
                        continue;
                    }
                    var f = new RptFont();
                    f.parse(json.style.fonts[key]);
                    this.fonts.put(key, f);
                }
                //初始化边框对象
                for (var key in json.style.borders) {
                    if (!json.style.borders.hasOwnProperty(key)) {
                        continue;
                    }
                    var b = new RptBorder();
                    b.setNoBorder(this.noBorder);
                    b.parse(json.style.borders[key]);
                    this.borders.put(key, b);
                }
                //初始化对齐对象
                for (var key in json.style.aligns) {
                    if (!json.style.aligns.hasOwnProperty(key)) {
                        continue;
                    }
                    var align = new RptAlign();
                    align.parse(json.style.aligns[key]);
                    this.aligns.put(key, align);
                }
                //初始化数字格式对象
                for (var key in json.style.numbers) {
                    if (!json.style.numbers.hasOwnProperty(key)) {
                        continue;
                    }
                    var number = new RptNumber();
                    number.parse(json.style.numbers[key]);
                    this.numbers.put(key, number);
                }
            }

            //变量
            if (json.config && json.config.vars) {
                for (var key in json.config.vars) {
                    if (!json.config.vars.hasOwnProperty(key)) {
                        continue;
                    }
                    var pubvar = new RptVar(this);
                    pubvar.parse(json.config.vars[key]);
                    this.pubvars.put(pubvar.name, pubvar);
                }
            }

            // 右键菜单
            for (var key in json.menus) {
                if (!json.menus.hasOwnProperty(key)) {
                    continue;
                }
                var menu = new RptMenu();
                menu.parse(json.menus[key]);
                this.menus.put(key, menu);
            }

            // 事件
            for (var key in json.events) {
                if (!json.events.hasOwnProperty(key)) {
                    continue;
                }
                var eventid = new RptEvent();
                eventid.parse(json.events[key]);
                this.events.put(key, eventid);
            }

            if (json.page) {
                this.rptPageSet.parse(json.page);
            }

            if (json.datasource) {
                //初始化查询数据集对象
                for (var key in json.datasource.tables) {
                    if (!json.datasource.tables.hasOwnProperty(key)) {
                        continue;
                    }
                    var store = new RptStore(this, "query");
                    store.parse(json.datasource.tables[key]);
                    this.queryDatastores.put(key, store);
                }
            }

            //初始化单元格类型
            for (var key in json.celltypes) {
                if (!json.celltypes.hasOwnProperty(key)) {
                    continue;
                }
                var celltype = new RptCellType(this);
                celltype.parse(json.celltypes[key]);
                this.cellTypes.put(key, celltype);
            }

            //初始化入库数据集
            for (var key in json.submitrules) {
                if (!json.submitrules.hasOwnProperty(key)) {
                    continue;
                }
                var store = new RptStore(this, "submit");
                store.parse(json.submitrules[key]);
                this.storageDataStores.put(store.name, store);

                //一下兼容1.0注入的脚本
                this.storageDataStores.stores = this.storageDataStores.stores || {};
                this.storageDataStores.stores[store.name] = store;
            }

            if (json.body && json.body.sections) {
                //初始化分片数组
                for (var i = 0; i < json.body.sections.length; i++) {
                    var section = new RptSection(this);
                    section.parse(json.body.sections[i]);
                    this.sections.push(section);
                }
            }
        },

        prepare: function () {

            //this.loadMode = "smart";

            //组织好之后取出对应表头，进行表头的处理
            var headerRows = this.matrix.getRows(0, this.headerLength);
            this.convertHeaders(headerRows);

            //请求报表服务时只在前端查询需要的数据集，如果是简单网格(simple_grid)或自由格式(free_grid)所有的数据都从前端获取
            //如果绑定了外部数据集主数据集也不去查询数据
            this.queryDatastores.each(function (key, _store, index) {
                _store.setIsRefresh(false);
            });

            for (var i = 0; i < this.requestDsNames.length; i++) {
                var rptStore = this.getQueryStoreByName(this.requestDsNames[i]);
                if (rptStore) {
                    rptStore.setIsRefresh(true);
                }
            }

            if (this.matrix.getDimesions().rows == 0) {
                this.showAlert("错误提示！", "表格未初始化，请添加至少一行一列的数据！", "error");
                return;
            }
            this.instantRow = this.getInstantRow();
            this.colHAlign = [];
            this.colTypes = [];
            this.colStyles = [];

            //简单网格时直接请求数据访问服务，需要用到以下四个属性
            this.columnIds = [];
            this.colAttrs = [];
            this.colClass = [];
            this.scheme = {};
            for (var i = 0; i < this.instantRow.length; i++) {
                var cell = this.instantRow[i];
                var originCell = cell && this.getOriginCellById(cell.sid);
                if (originCell) {
                    this.colWidths[i] = originCell.getWidth();
                    this.colHAlign[i] = originCell.getTextAlign();
                    this.colTypes[i] = originCell.getType();
                    this.colStyles[i] = originCell.getCSS(['border', 'font', 'align']);

                    this.colAttrs[i] = { sid: originCell.id };
                    this.colClass[i] = originCell.getClassName();
                    if (originCell.dsField[0]) {
                        this.columnIds[i] = originCell.dsField[0];
                    }
                    else {
                        this.columnIds[i] = "cell" + i;
                        this.scheme["cell" + i] = originCell.data;
                    }
                }
                else {
                    this.colWidths[i] = 80;
                    this.colHAlign[i] = "left";
                    this.colTypes[i] = "ro";
                    this.colStyles[i] = "";
                    this.colAttrs[i] = {};
                    this.colClass[i] = "";
                    this.columnIds[i] = "";
                }
            }
        },

        /**
        * 打印方法
        */
        print: function (options) {
            var that = this;
            options = options || {};
            //options = {
            //repeatHeader: true,
            //options.scaleColWidth : true,
            //header: "",
            //footer: "",
            //dpihStandard: 90,
            //pageDirection: "v",
            //pageSize: "A4",
            //position: ""
            //}
            that.rptPageSet.setOptions(options);
            function print_setting() {
                var hkey_root, hkey_path, hkey_key;
                hkey_root = "HKEY_CURRENT_USER";
                hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
                try {
                    var RegWsh = new ActiveXObject("WScript.Shell");
                    hkey_key = "header";
                    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, that.rptPageSet.header || "");
                    hkey_key = "footer";
                    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, that.rptPageSet.footer || "");

                    hkey_key = "margin_bottom";
                    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, parseFloat((parseInt(that.rptPageSet.pageMargins.bottom) / 25.4).toFixed(3)));
                    hkey_key = "margin_left";
                    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, parseFloat((parseInt(that.rptPageSet.pageMargins.left) / 25.4).toFixed(3)));
                    hkey_key = "margin_right";
                    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, parseFloat((parseInt(that.rptPageSet.pageMargins.right) / 25.4).toFixed(3)));
                    hkey_key = "margin_top";
                    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, parseFloat((parseInt(that.rptPageSet.pageMargins.top) / 25.4).toFixed(3)));
                } catch (e) { }
            }

            function local_print() {
                var myMask = new Ext.LoadMask(that.panelEl, {
                    msg: '数据组织中，请稍后...'
                });
                myMask.show();
                that.grid.clearSelection();
                var doms = that.getCellsDom();
                var widths = that.grid.getColsWidth();
                if (that.patchLastColIfLessWinW) {
                    widths.pop();
                }
                var pageDom = that.rptPageSet.genPages(widths, that.grid.getRowsHeight(), doms.title, doms.header, doms.data);
                myMask.hide();
                if (dhx4.isIE) {
                    print_setting();
                }
                
                $(pageDom).print();
            }

            if (options.showSetWindow != false) {
                var printWindow = new PrintWindow(function (params,that) {
                    that.rptPageSet.pageSize = params.pageSize;
                    that.rptPageSet.pageDirection = params.pageDirection;
                    that.rptPageSet.dpihStandard = params.dpihStandard;
                    that.rptPageSet.repeatHeader = params.repeatHeader;
                    that.rptPageSet.scaleColWidth = params.scaleColWidth;
                    that.rptPageSet.columnPerPage = params.columnPerPage;
                    that.rptPageSet.columnPadding = params.columnPadding;
                    
                    that.rptPageSet.pageMargins.top = params.top;
                    that.rptPageSet.pageMargins.left = params.left;
                    that.rptPageSet.pageMargins.right = params.right;
                    that.rptPageSet.pageMargins.bottom = params.bottom;
                    local_print();
                }, function () { }, {
                    pageSize: that.rptPageSet.pageSize,
                    mmSize: that.rptPageSet.mmSize,
                    pageDirection: that.rptPageSet.pageDirection,
                    dpihStandard: that.rptPageSet.dpihStandard,
                    repeatHeader: that.rptPageSet.repeatHeader,
                    scaleColWidth: that.rptPageSet.scaleColWidth,
                    columnPerPage: that.rptPageSet.columnPerPage,
                    columnPadding: that.rptPageSet.columnPadding,

                    top: that.rptPageSet.pageMargins.top,
                    left: that.rptPageSet.pageMargins.left,
                    right: that.rptPageSet.pageMargins.right,
                    bottom: that.rptPageSet.pageMargins.bottom
                },that);
                printWindow.show();
            }
            else {
                local_print();
            }
        },

        regenAutoWidths: function (colWidths, width) {
            var _remainWidth = width;
            var autoWidthCols = []; //自动宽度列，即包含*的列
            var total = 0;
            var lastNoZeroIndex;
            for (var i = 0; i < colWidths.length; i++) {
                if (colWidths[i] == "*") {
                    autoWidthCols.push(i);
                    continue;
                }
                if (!isNaN(parseInt(colWidths[i])) && colWidths[i] > 0) {
                    total += parseInt(colWidths[i]);
                    lastNoZeroIndex = i;
                }
            }
            if (autoWidthCols.length > 0) {
                if (total >= width) {
                    return colWidths;
                }
                var resultWidths = colWidths.concat();
                var calWidth = Math.floor((width - total) / autoWidthCols.length);
                for (var i = 0; i < autoWidthCols.length; i++) {
                    if (i == autoWidthCols.length - 1) {
                        resultWidths[autoWidthCols[i]] = width - total;
                    }
                    else {
                        resultWidths[autoWidthCols[i]] = calWidth;
                        total += calWidth;
                    }
                }
                return resultWidths;
            }
            else {
                return colWidths.map(function (value, index, arr) {
                    if (index == lastNoZeroIndex) {
                        return _remainWidth;
                    }
                    else {
                        var resultWidth = parseInt(value * width / total);
                        _remainWidth -= resultWidth;
                        return resultWidth;
                    }
                });
            }
        },

        refresh: function () {
            this.startIndex = 0;
            this.updateDatastore();
        },

        refreshDS: function (dsNames) {
            if (!dsNames) {
                return;
            }
            var that = this;
            that.vmdreport.myMask.show();
            dsNames = dsNames.split(",");

            function checkAllComplete() {
                for (var i = 0; i < dsNames.length; i++) {
                    var rptStore = that.getQueryStoreByName(dsNames[i]);
                    if (!rptStore.dataRequestCompleted) {
                        return false;
                    }
                }
                return true;
            }

            function checkAllSuccess() {
                for (var i = 0; i < dsNames.length; i++) {
                    var rptStore = that.getQueryStoreByName(dsNames[i]);
                    if (!rptStore.dataRequestSuccess) {
                        return false;
                    }
                }
                return true;
            }
            for (var i = 0; i < dsNames.length; i++) {
                var rptStore = this.getQueryStoreByName(dsNames[i]);
                if (!rptStore) {
                    showAlert("错误！", "数据集" + dsNames[i] + "不存在！", "error");
                    that.vmdreport.myMask.hide();
                    return;
                }
                rptStore.update(function () {
                    that.callEvent("onStoreSuccess", [rptStore]);

                    if (checkAllComplete()) {
                        that.callEvent("onStoreAllComplete", [that]);
                    }
                    if (checkAllSuccess()) {
                        that.callEvent("onStoreAllSuccess", [that]);
                    }
					 that.vmdreport.myMask.hide();
                }, function () {
                    that.vmdreport.myMask.hide();
                    that.callEvent("onStoreError", [rptStore]);
                });
            }
        },

        //重置序号单元格的值
        resetCounter: function () {
            var that = this;
            for (var i = 0; i < this.sections.length; i++) {
                var section = this.sections[i];
                section.originalMatrix.each(function (cell, rIndex, cIndex) {
                    if (cell.getType() == "vmdorder") {
                        var cellType = that.cellTypes.get(cell.fillcelltype);
                        cellType.start = Math.max(that.startIndex, 0) + 1;
                        cell._seed = 0;
                        cell.childs.sort(function (value1, value2) { return that.grid.getRowIndex(value1.split("_")[0]) - that.grid.getRowIndex(value2.split("_")[0]) });
                        for (var j = 0; j < cell.childs.length; j++) {
                            var cellObj = that.grid.cells.apply(that.grid, cell.childs[j].split("_"));
                            cellObj.setValue();
                        }
                    }
                })
            }
        },

        setLoadMode: function (mode) {
            this.loadMode = mode;
        },

        setPageSize: function (size) {
            this.pageSize = size;
        },

        setSize: function (w, h) {
            if (!this.gridContainer) {
                return;
            }
            //ie下如果出现横向滚动条，则同时出现纵向滚动条
            this.panelEl.style.overflow = "";
            if (!this.isSubReport) {
                this.panelEl.style.overflowX = "";
                this.panelEl.style.overflowY = "";
            }
            if (w && !isNaN(w)) {
                this.width = w;
                this.autoWidth = false;
            }
            if (h && !isNaN(h)) {
                this.height = h;
                this.autoHeight = false;
            }
            var containerW = this.containerW = this.autoWidth ? getElementWidth(this.panelEl) : (w || this.width);
            var containerH = this.containerH = this.autoHeight ? getElementHeight(this.panelEl) : (h || this.height);

            this.gridContainerW = containerW;
            this.gridContainerH = containerH;

            var scrfix = dhtmlx.$customScroll ? 0 : 18;
            var isHScroll = false;
            var isVScroll = false;

            var gridWidth;
            if (this.patchLastColIfLessWinW) {
                gridWidth = this.colWidths.slice(0, this.colWidths.length - 1).reduce(function (total, num) { return total + parseInt(num) }, 0);
                var lastColWidth;
                if ((gridWidth + 18) >= containerW) {
                    lastColWidth = 0;
                    this.colWidths[this.colWidths.length - 1] = lastColWidth;
                }
                else {
                    lastColWidth = containerW - gridWidth - 2 - 18;
                    this.colWidths[this.colWidths.length - 1] = lastColWidth;
                    gridWidth = containerW - 18;
                }
                if (this.grid) {
                    this.grid.setColWidth(this.colWidths.length - 1, lastColWidth);
                }
            }
            else if (this.gridAutoWidth) {
                var ignoreVScroll = pick(this._ignoreVScroll, !(this.isSubReport && this.subReportType == "embed"),!this._ihdr);
                if (this.grid && !ignoreVScroll) {
                    isVScroll = this.grid.obj.offsetHeight > (containerH-(this._ihdr? this.grid.hdr.offsetHeight:0));
                }
                if (isVScroll) {
                    this.panelEl.style.overflowY = "auto";
                }
                this.colWidths = this.regenAutoWidths(this.srcColumnWidth, containerW - (isVScroll ? scrfix : 0));
                gridWidth = containerW;
                if (this.grid) {
                    for (var i = 0; i < this.colWidths.length; i++) {
                        this.grid.setColWidth(i, this.colWidths[i]);
                    }
                }
            }
            else {
                gridWidth = this.colWidths.reduce(function (total, num) { return total + parseInt(num) }, 0) + (this.isSubReport ? 0 : 2);//加上2个像素的边框;
            }

            //this.loadMode = "";//加载模式，“paging”:分页，“smart”：滚动
            if (this.loadMode == "paging") {
                this.gridParentContainer.style.height = (containerH - this.pageConainerHeight) + "px";
                this.gridParentContainer.style.width = containerW + "px";
                this.gridContainerH = containerH - this.pageConainerHeight;
            }

            if (this.grid) {
                if (this.grid._fake) {
                    isVScroll = this.isSubReport ? false : (this.grid.obj.offsetHeight > (h ? (h - this.grid.hdr.offsetHeight) : this.grid.objBox.offsetHeight));
                    if ((parseInt(this.grid.entBox.style.width) + parseInt(this.grid._fake.entBox.style.width)) > containerW) {
                        this.grid.entBox.style.width = (containerW - parseInt(this.grid._fake.entBox.style.width)) + "px";
                    }
                    else {
                        this.grid.entBox.style.width = (Math.min(gridWidth, containerW) - parseInt(this.grid._fake.entBox.style.width) + ((isVScroll && (gridWidth < containerW)) ? scrfix : 0)) + "px";
                    }
                    this.grid.entBox.style.height = (containerH - (this.loadMode == "paging" ? this.pageConainerHeight : 0)) + "px";
                    this.grid._fake.entBox.style.height = (containerH - (this.loadMode == "paging" ? this.pageConainerHeight : 0)) + "px";
                }
                if (!dhx4.isIE) {
                    isVScroll = this.isSubReport ? false : (this.grid.obj.offsetHeight > (h ? (h - this.grid.hdr.offsetHeight) : this.grid.objBox.offsetHeight));
					//chengbing  (gridWidth > containerW))调整为(gridWidth+(isVScroll ? scrfix : 0) > containerW)) 避免在网格宽度小于容器宽度，但存在纵向滚动条 加上纵向滚动条大于容器宽度的情况
                    isHScroll = this.isSubReport ? false : ((this.grid.obj.offsetWidth > this.grid.objBox.offsetWidth) || (this.grid.objBox.style.overflowX == "scroll") || (gridWidth+(isVScroll ? scrfix : 0) > containerW));
                }
                else {
                    isVScroll = this.isSubReport ? false : (this.grid.obj.offsetHeight > (h ? (h - this.grid.hdr.offsetHeight) : this.grid.objBox.offsetHeight));
                    isHScroll = this.isSubReport ? false : ((this.grid.obj.offsetWidth > containerW) || (this.grid.objBox.style.overflowX == "scroll") || (gridWidth+(isVScroll ? scrfix : 0) > containerW));
                }
            }

            if (this.gridAutoWidth) {
                this.gridContainerW = gridWidth;//+(isVScroll ? scrfix : 0);
            }
                //网格的宽度小于容器的宽度
            else if ((gridWidth + (isVScroll ? scrfix : 0)) < this.gridContainerW) {
                this.gridContainerW = gridWidth + (isVScroll ? scrfix : 0);
                if (this.grid) {
                    this.grid.objBox.style.overflowX = "hidden";
                }
            }
                //没有有锁定列
            else if (this.fixedColCount == 0) {
                //this.gridContainer.parentNode.style.overflow = "auto";
                this.panelEl.style.overflowX = "auto";
                if (this.grid) {
                    this.grid.objBox.style.overflowX = "hidden";
                }
                //this.panelEl.style.overflowY = "auto";
                if (containerW < (gridWidth + (isVScroll ? scrfix : 0))) {
                    //this.gridContainerW = gridWidth; ???
                    this.gridContainerW = gridWidth + (isVScroll ? scrfix : 0);
                }
                else {
                    this.gridContainerW = gridWidth + (isVScroll ? scrfix : 0);
                }
            }

            //如果存在锁定行锁定列则不重新设置外层div的大小
            if (this.headers && this.headers.length > 0) {//存在表头
                //this.panelEl.style.overflowY = "";
            }
            else {
            }
            this.gridContainerH -= isHScroll ? scrfix : 0;
            if (!dhx4.isIE) {
                this.gridContainer.style.width = this.gridContainerW + "px";
                this.gridContainer.style.height = this.gridContainerH + "px";
                if (this.pageContainer) {
                    this.pageContainer.style.width = containerW + "px";
                }
            }
            else {
                this.gridContainer.style.cssText += ";width:" + this.gridContainerW + "px;height:" + this.gridContainerH + "px;";
                if (this.pageContainer) {
                    this.pageContainer.style.cssText += ";width:" + containerW + "px;";
                }
            }

            if (this.grid) {
                this.grid.setSizes();
                if (this.floatTitleContainer) {
                    if(this.winWidth){
                        this.floatTitleContainer.style.width = this.winWidth+"px";
                    }
                    else{
                        this.floatTitleContainer.style.width = Math.min(getElementWidth(this.panelEl), getElementWidth(this.gridContainer)) + "px";
                    }
                }
            }
        },

        setPosition: function () {
            if (!this.gridContainer) {
                return;
            }
            var gridLeft = 0;
            /*外层div居中*/
            if (this.align== "center" || !this.align) {
                gridLeft = (this.containerW - this.gridContainerW) / 2;
            }
            else if (this.align == "right") {
                gridLeft = this.containerW - this.gridContainerW - 2;
            }
            gridLeft = Math.max(gridLeft, 0);
            if (!dhx4.isIE) {
                this.gridContainer.style.left = gridLeft + "px";
            }
            else {
                this.gridContainer.style.cssText += ";left:" + gridLeft + "px";
            }
            if (this.grid && this.floatTitleContainer) {
                this.setTitleFloat(true);
            }
        },

        /**
        * 给单元格赋值
        */
        setValue: function () {
            //A1
            if (arguments.length == 2) {
                var param = arguments[0];
                var val = arguments[1];
                if (!/^[A-Za-z]+\d+$/.test(param)) {
                    showAlert("错误！", '参数格式不正确，需为字母+数字格式！', "error");
                    return;
                }
                var cells = this.getCells(param);
                if (!cells || cells.length == 0) {
                    showAlert("错误！", "单元格" + param + "不存在！", "error");
                    return;
                }
                cells[0].setValue(val);
            }
                //行索引+列索引形式
            else if (arguments.length == 3) {
                var rowIndex = arguments[0];
                var colIndex = arguments[1];
                var val = arguments[2];
                if (!/^\d+$/.test(rowIndex) || !/^\d+$/.test(colIndex)) {
                    showAlert("错误！", '参数不正确！第一个参数为行索引，第二个参数为列索引，第三个参数为设定的值！', "error");
                    return;
                }
                if (rowIndex >= this.grid.getRowsNum() || colIndex >= this.grid.getColumnsNum()) {
                    showAlert("错误！", '行索引超出报表行数或者列索引超出报表列数！', "error");
                    return;
                }
                this.grid.cells2(rowIndex, colIndex).setValue(val);
            }
            else {
                showAlert("错误！", '参数不正确！', "error");
            }
        },

        //保存入库
        submitdb: function (hwReport, successCallBack, errorCallBack) {
            var that = hwReport || this;
            var mainReport = that;
            while (mainReport.parentReport) {
                mainReport = that.parentReport;
            }
            //检查是否所有请求都加载完成
            function checkAllComplete() {
                var allComplete = true;
                mainReport.storageDataStores.each(function (name, _store, index) {
                    if (!_store.dataRequestCompleted) {
                        allComplete = false;
                    }
                });

                if (mainReport.subReports) {
                    that.subReports.each(function (name, _report, index) {
                        _report.storageDataStores.each(function (name, _store, index) {
                            if (!_store.dataRequestCompleted) {
                                allComplete = false;
                            }
                        });
                    });
                }
                return allComplete;
            }

            //检查是否所有请求都加载成功
            function checkAllSuccess() {
                var allSuccess = true;
                mainReport.storageDataStores.each(function (name, _store, index) {
                    if (!_store.dataRequestSuccess) {
                        allSuccess = false;
                    }
                });

                if (mainReport.subReports) {
                    that.subReports.each(function (name, _report, index) {
                        _report.storageDataStores.each(function (name, _store, index) {
                            if (!_store.dataRequestSuccess) {
                                allSuccess = false;
                            }
                        });
                    });
                }
                return allSuccess;
            }
            
            mainReport._allStorageNums = mainReport._allStorageNums || mainReport.storageDataStores.size();
            that.subReports.each(function (name, _report, index) {
                mainReport._allStorageNums += _report.submitdb(_report, successCallBack, errorCallBack);
            });
            that.grid.editStop();//结束单元格编辑

            if (that.validateErrorCells.length > 0) {
                showAlert("提示！", that._CellErrMsg || "校验失败！", "error");
                return;
            }
            //if (!that.validate()) {
                
            //}
            
            if (!hwReport.isSubReport && mainReport._allStorageNums == 0) {
                showAlert("提示！", "提交规则缺失！", "error");
                return;
            }

            if (that.storageDataStores.size() == 0) {
                return 0;
            }


            mainReport.vmdreport.submitMask.show();
            that.storageDataStores.each(function (key, _store, index) {
                _store.submit(function () {
                    if (checkAllSuccess()) {
                        mainReport.vmdreport.submitMask.hide();
                        if (successCallBack) {
                            successCallBack.apply(null, [mainReport]);
                        }
                        else {
                            showAlert("提示！", "保存成功！", "success");
                        }
                    }
                    if (checkAllComplete() && errorCallBack) {
                        errorCallBack.apply(null, [mainReport]);
                    }
                }, function (msg) {
                    mainReport.vmdreport.submitMask.hide();
                    showAlert("错误！", msg, "error");
                    if (checkAllComplete() && errorCallBack) {
                        errorCallBack.apply(null, [mainReport]);
                    }
                });
            });
            return that.storageDataStores.size();
        },

        setTitle: function (title,winWidth) {
            this.external_title = title;
            this.winWidth=winWidth;
            if (this.floatTitleContainer) {
                this.floatTitleContainer.firstChild.firstChild.firstChild.innerHTML = title;
            }
        },

        setAlign: function (align) {
            this.align = align;
        },

        setColumnCheck: function (col, bool) {
            //如果设置选中但是已经选中，不执行操作
            if ((bool && this.grid["_is_checked_all_col" + col]) || (!bool && this.grid["_is_checked_all_col" + col] == false)) {
                return;
            }
            for (var a in this.grid.rowsAr) {
                var row = this.grid.rowsAr[a];
                if (row && row.idd) {
                    var cellObj = this.grid.cells(a, col);
                    if (cellObj.isCheckbox()) {
                        cellObj.setValue(bool ? 1 : 0);
                    }
                }
            }
            this.grid["_is_checked_all_col" + col] = bool;
        },

        setDisabled: function (bool) {
            var that = this;
            this.disabled = bool == false ? false : true;
            if (this.disabled) {
                this.rptContainer.className += " disabled";
            }
            else {
                this.rptContainer.className = this.rptContainer.className.replace(/ disabled/g, "");
            }
            if (this.grid) {
                this.grid.setDisabled(bool);
                this.grid.forEachCellsB(function (cellObj, rInd, cInd) {
					if(bool)			
						cellObj.setDisabled(bool);
					else 
					{
						if(cellObj.cellType&&cellObj.cellType.isenableedit)
							cellObj.setDisabled(false);
						else
							cellObj.setDisabled(true);							
					}
                });
            }
        },

        setNoBorder: function (bool) {
            this.noBorder = bool === false ? false : true;
        },

        //设置补齐方式，添加列或者等比缩放
        setPatchMode: function (mode) {
            if (mode == "addcol") {
                this.patchLastColIfLessWinW = true;
            }
            else if (mode == "scale") {
                this.gridAutoWidth = true;
            }
        },

        /**
        * 设置标题浮动居中
        */
        setTitleFloat: function (bool) {
            if (this.isSubReport) {
                return;
            }
            if (!bool || !this.titleRow || !this.titleRow.height) {
                return;
            }
            var titleCell = null;
            var titleDom = null;
            var cellIndex = 0;
            if (this.external_title) {
                titleCell = this.titleRow.cells[0];
            }
            else {
                for (var i = 0; i < this.titleRow.cells.length; i++) {
                    if (this.titleRow.cells[i].data || this.titleRow.cells[i].datavalue) {
                        titleCell = this.titleRow.cells[i];
                        cellIndex = i;
                        break;
                    }
                }
            }

            if (!titleCell) {
                titleCell = this.titleRow.cells[0];
            }

            if (this.fixedColCount && (cellIndex + (titleCell.colspan || 1)) > this.fixedColCount && cellIndex < this.fixedColCount) {
                titleDom = this.getHeaderCellDom(titleCell.rowIndex, this.fixedColCount);
            }
            else {
                titleDom = this.getHeaderCellDom(titleCell.rowIndex, cellIndex);
            }
            if (titleDom) {
                //titleDom.firstChild.style.display = "none";
                titleDom.firstChild.style.visibility = "hidden";
            }

            if (this.floatTitleContainer) {
                if (this._titleFloat) {
                    this.floatTitleContainer.style.top = ((titleDom && titleDom.getBoundingClientRect().top) || 0) + "px";
                }
                return;
            }
            var titleText = titleCell.data;
            if (this.expandType == "c" || this.expandType == "h") {
                var titleCellJSON = this.matrix.rows[this.titleRow.rowIndex][titleCell.index];
                titleText = (titleCellJSON && titleCellJSON.data) || "";
            }
            if (this.external_title) {
                try {
                    this.external_title = dhx4.trim(this.external_title);
                    if (/^\/\//.test(this.external_title) || /\breturn /.test(this.external_title)) {
                        titleText = new Function("value", this.external_title + ';\nreturn value')(""); //eval("(function(){" + this.external_title + "\n}())");
                    }
                    else {
                        titleText = this.external_title;
                    }
                } catch (e) {
                    showAlert("标题表达式错误！", e.message, "error");
                }
            }
            var t_floatTitleContainer = this.floatTitleContainer = document.createElement("table");
            t_floatTitleContainer.className = "hdr float-title";

            if (this._titleFloat) {
                t_floatTitleContainer.style.position = "fixed";
                t_floatTitleContainer.style.top = ((titleDom && titleDom.getBoundingClientRect().top) || 0) + "px";
            }
            else {
                t_floatTitleContainer.style.position = "absolute";
                t_floatTitleContainer.style.top = "0px";
            }
            t_floatTitleContainer.style.borderCollapse = "collapse";
            t_floatTitleContainer.style.borderSpacing = "0px";
            t_floatTitleContainer.style.zIndex = "15"; //小于11，存在锁定列时标题会被覆盖，过大（如999）会覆盖可视化中的下拉框
            if (this.winWidth) {
                t_floatTitleContainer.style.width = this.winWidth + "px";
            } else {
                t_floatTitleContainer.style.width = Math.min(getElementWidth(this.panelEl), getElementWidth(this.gridContainer)) + "px";
            }
            var tr = document.createElement("tr");
            tr.style.backgroundColor = "transparent";
            var td = document.createElement("td");
            td._attrs = titleDom._attrs;
            td._cellIndex = 0;
            td.colSpan = this.grid.getColumnsNum();
            td.className = titleCell.getClassName();
            td.style.cssText += titleCell.getCSS(['border', 'font', 'align', "backgroundColor"]) + ";background-color:transparent;border:0px solid #ffffff !important;";

            var titlediv = document.createElement("div");
            titlediv.className = "hdrcell";
            var align = this.aligns.get(titleCell.align);
            //var isEscape = (align && align.escapelabel == "1") ? true : false;
            var isEscape = this.headerLabelAutoEscape == false ? false : true;//表头标签自动转义
            titlediv.innerHTML = replaceToHtmltag(titleText, isEscape);
            titleDom.firstChild.innerHTML = titlediv.innerHTML;

            td.appendChild(titlediv);
            tr.appendChild(td);
            t_floatTitleContainer.appendChild(tr);

            if (!dhx4.isIE) {
            }
            else {
            }

            this.gridContainer.style.position = "relative";
            this.gridContainer.appendChild(t_floatTitleContainer);
        },

        /**
        * 查询数据，更新数据集
        */
        updateDatastore: function () {
            var that = this;
            if (this.queryDatastores&&this.queryDatastores.size() == 0) {
                that.callEvent("onStoreAllSuccess", [that]);
                return;
            }

           this.queryDatastores&&this.queryDatastores.each(function (key, _store, index) {
               if(that.clearParams){
				   _store._lastParams={};
			   }
                _store.update(function () {
                    that.callEvent("onStoreSuccess", [_store]);
                    if (checkAllComplete()) {
                        that.callEvent("onStoreAllComplete", [that]);
                    }
                    if (checkAllSuccess()) {
                        that.callEvent("onStoreAllSuccess", [that]);
                    }
                }, function () {
                    that.vmdreport.myMask.hide();
                    that.callEvent("onStoreError", [_store]);
                    if (checkAllComplete()) {
                        that.callEvent("onStoreAllComplete", [that]);
                    }
                });
            });

            //检查是否所有数据集都加载完成
            function checkAllComplete() {
                var allComplete = true;
                this.queryDatastores&&that.queryDatastores.each(function (key, _store, index) {
                    if (!_store.dataRequestCompleted) {
                        allComplete = false;
                    }
                });
                return allComplete;
            }

            //检查是否所有数据集都加载成功
            function checkAllSuccess() {
                var allSuccess = true;
                this.queryDatastores&&that.queryDatastores.each(function (key, _store, index) {
                    if (!_store.dataRequestSuccess) {
                        allSuccess = false;
                    }
                });
                return allSuccess;
            }
        },

        updateRelativeCells: function () {
            this.queryDatastores&&this.queryDatastores.each(function (key, _store, index) {
                _store.updateRelativeCells();
            });
        },

        mergeSameValueCells: function () {
            var that = this;
            var grid = this.grid;
            var mergedCells = this.sameValueMergedCells;
            var lastRowCellsValue = {};
            var lastColCellsValue = [];

            //
            function isRowCellMerged(cellObj) {
                var isMerged = true;
                var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                if (!oCell.bottomMerged) {
                    return false;
                }
                var value = cellObj.getValue();
                if (!oCell.btmmergeconditionexp) {
                    //当前单元格与上一个单元格的值不同，不合并
                    if (lastColCellsValue[oCell.index] != value) {
                        isMerged = false;
                    }
                    else {
                        isMerged = true;
                    }
                }
                else {
                    var conditionexps = oCell.btmmergeconditionexp.split(",");
                    for (var k = 0; k < conditionexps.length; k++) {
                        var rowCols = convertToRowCol(conditionexps[k]);
                        if (rowCols.col == -1) {
                            continue;
                        }
                        var relativeCell = that.findMergedCell(cellObj.cell.parentNode, rowCols.col);
                        var relativeCellValue = relativeCell.getValue();
                        if (lastColCellsValue[rowCols.col] != relativeCellValue || lastColCellsValue[oCell.index] != value) {
                            isMerged = false;
                        }
                        lastColCellsValue[rowCols.col] = relativeCellValue;
                    }
                }
                lastColCellsValue[oCell.index] = value;

                return isMerged;
            }

            //
            function isColCellMerged(cellObj, lastColCellValue) {

                var isMerged = true;
                var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                var value = cellObj.getValue();
                if (!oCell.rightMerged) {
                    return false;
                }
                if (!oCell.rgtmergeconditionexp) {
                    //当前单元格与上一个单元格的值不同，不合并
                    if (lastColCellValue != value) {
                        isMerged = false;
                    }
                    else {
                        isMerged = true;
                    }
                }
                else {
                    var conditionexps = oCell.rgtmergeconditionexp.split(",");
                    for (var k = 0; k < conditionexps.length; k++) {
                        var conditionItem = conditionexps[k];
                        var rowCols = convertToRowCol(conditionItem);
                        if (rowCols.col == -1) {
                            continue;
                        }
                        var relativeCellValue = that.getValue(conditionItem, cellObj);
                        if (lastRowCellsValue[conditionItem + "_" + rowCols.col] != relativeCellValue || lastColCellValue != value) {
                            isMerged = false;
                        }
                        lastRowCellsValue[conditionItem + "_" + rowCols.col] = relativeCellValue;
                    }
                }
                return isMerged;
            }

            for (var i = 0; i < mergedCells.length; i++) {
                var mergedOCell = mergedCells[i];

                //向下同值合并
                if (mergedOCell.bottomMerged) {
                    var mergedCellObj = null;
                    var mergedRowSpan = 1;
                    var rowSpan = 1;
                    for (var rowIndex = 0; rowIndex < grid.getRowsNum() ; rowIndex += rowSpan) {
                        var cellObj = grid.cells2(rowIndex, mergedOCell.index);
                        rowSpan = cellObj.cell.rowSpan;
                        if (!isRowCellMerged(cellObj) || mergedOCell.childs.indexOf(cellObj.cell.parentNode.idd + "_" + cellObj.cell._cellIndex) == -1) {
                            if (mergedCellObj && mergedRowSpan > 1) {
                                grid.setRowspan(mergedCellObj.cell.parentNode.idd, mergedCellObj.cell._cellIndex, mergedRowSpan);
                            }
                            mergedCellObj = cellObj;
                            mergedRowSpan = 1;
                            continue;
                        }
                        else {
                            mergedRowSpan += rowSpan;
                            if (rowIndex == grid.getRowsNum() - 1) {
                                grid.setRowspan(mergedCellObj.cell.parentNode.idd, mergedCellObj.cell._cellIndex, mergedRowSpan);
                            }
                        }
                    }
                }
                //向右同值合并
                else if (mergedOCell.rightMerged) {
                    for (var rowIndex = 0; rowIndex < grid.getRowsNum() ; rowIndex++) {
                        var rowId = grid.getRowId(rowIndex);
                        var lastColCellValue = null;
                        var mergedCellObj = null;
                        var mergedColSpan = 1;
                        grid.forEachCellsA(rowId, function (cellObj, rowIndex, cellIndex) {
                            if (!isColCellMerged(cellObj, lastColCellValue) || mergedOCell.childs.indexOf(cellObj.cell.parentNode.idd + "_" + cellObj.cell._cellIndex) == -1) {
                                if (mergedCellObj && mergedColSpan > 1) {
                                    grid.setColspan(mergedCellObj.cell.parentNode.idd, mergedCellObj.cell._cellIndex, mergedColSpan);
                                }
                                mergedCellObj = cellObj;
                                mergedColSpan = 1;
                            }
                            else {
                                mergedColSpan += cellObj.cell.colSpan;
                                if (cellIndex == grid.getColumnsNum() - 1) {
                                    grid.setColspan(mergedCellObj.cell.parentNode.idd, mergedCellObj.cell._cellIndex, mergedColSpan);
                                }
                            }
                            lastColCellValue = cellObj.getValue();
                        });
                    }
                }
            }
        },

        //入库校验
        validate: function () {
            var that = this;
            var grid = this.grid;
            var validateSuccess = true;
            grid.forEachCellsB(function (cellObj, rIndex, cInd) {
                var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                var cellType = oCell && that.cellTypes.get(oCell.fillcelltype);

                //单元格属于删除了的行，则不进行校验
                if (that.emptyRows.indexOf(cellObj.cell.parentNode.idd) != -1) {
                    return;
                }
                var validataResult = that.validateCell(cellObj, cellObj.cell.parentNode.idd, cInd, cellObj.getValue());
                if (!validataResult.result) {
                    validateSuccess = false;
                }
            });
            return validateSuccess;
        },

        //校验单元格
        validateCell: function (cellObj, rId, cInd, value) {
            var that = this;
            var grid = this.grid;
            var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
            var cellType = oCell && that.cellTypes.get(oCell.fillcelltype);
            var validataResult = { result: true };
            if (cellType) {
                //非空校验
                if (!cellType.isallownull) {
                    validataResult = that.grid.validateCell(rId, cInd, "NotEmpty", value + "", "", cellType.emptydisplay);
                }
                if (validataResult.result && cellType.fillrule) {
                    var fillrule = cellType.fillrule;
                    validataResult = that.grid.validateCell(rId, cInd, fillrule, value + '', cellType.fillRuleEx, "");
                }
                if (validataResult.result && cellType.getType() == "vmdnum") {
                    //整数校验
                    if (!cellType.isdecimal) {
                        validataResult = that.grid.validateCell(rId, cInd, "ValidInteger", value + '', "", "");
                    }
                    //校验小数位
                    else if (cellType.decimalnumbers > 0) {
                        validataResult = that.grid.validateCell(rId, cInd, "ValidDecimal", value + '', cellType.decimalnumbers + "", "");
                    }
                    //校验最小值
                    if (validataResult.result && !isNaN(parseFloat(cellType.minvalue))) {
                        validataResult = that.grid.validateCell(rId, cInd, "ValidMoreThan", value + '', cellType.minvalue, "");
                    }
                    //校验最大值
                    if (validataResult.result && !isNaN(parseFloat(cellType.maxvalue))) {
                        validataResult = that.grid.validateCell(rId, cInd, "ValidLessThan", value + '', cellType.maxvalue, "");
                    }
                    //不允许负数
                    if (validataResult.result && cellType.isnegative == false) {
                        validataResult = that.grid.validateCell(rId, cInd, "ValidMoreThan", value + '', "0", "");
                    }
                }
            }
            return validataResult;
        }
    };

    function HwReport() {
        BaseReport.apply(this, arguments);
    }

    extend(HwReport, BaseReport, {

        /**
        * 对模板进行分析，分析模板是简单网格、分组报表或是填报等；
        */
        analysis: function () {
            var that = this;
            BaseReport.prototype.analysis.apply(this, []);
            //除纵向扩展其他都不支持滚动加载,如果外部绑定数据集，则使用外部设置的加载方式
            if (that.expandType != "v") {
                this.loadMode = "";
            }
        },

        initGrid: function () {
            var that = this;
            BaseReport.prototype.initGrid.apply(this, []);
            var dimesion = this.matrix.getDimesions();
            var rows = dimesion.rows - this.headerLength;
            var cols = dimesion.cols;
            this.grid.parse({
                colcount: cols,
                rowcount: rows,
                datas: this.matrix.rows.slice(this.headerLength)
            }, "custom_json");
        },
        
        attachEvents: function () {
            var that = this;
            BaseReport.prototype.attachEvents.apply(this, []);
            //滚动加载
            this.attachEvent("onScrollToBottom", function () {
                //如果是滚动加载并且数据没有加载完成，则滚动条触底时继续加载数据
                if (that.loadMode == "smart" && (that.rptType == "group" || that.rptType == "select")) {
                    if (!that.isLoadAllData) {
                        this.startIndex += this.getPageSize();
                        this.updateDatastore(true);
                    }
                    else {
                        if (!checkdhtmlxMessage()) {
                            insertRule(".dhtmlx_message_area", "text-align:center;right:" + (document.body.clientWidth - 250) / 2 + "px");
                            dhtmlx.message({
                                type: "info",
                                text: "没有更多数据！",
                                position: "bottom",
                                expire: 2000
                            })
                        }
                    }
                }
                return true;
            });

        },
       
        prepare: function () {
            var that = this;
            BaseReport.prototype.prepare.apply(this, []);
            this.columnIds = null;
            this.colStyles = null;
        },
        // 获取返回的数据的sid,滚动加载时使用
        getDataRowid:function(row){
            if(row){
                for(var i=0;i<row.length;i++){
                    var col=row[i];
                    if(col){
                        if(col.sid){
                            return col.sid.split('_')[0];
                        }
                    }
                }
            }
        },
        // 判断是否在分组下面的行范围内
        getInLastRows:function(rowid){
            if(this.lastRows&&this.lastRows.length>0){
                for(var i=0;i<this.lastRows.length;i++){
                    if(rowid==this.lastRows[i])
                        return true;
                }
                return false;
            }
            return false;
        },

        /**
           * 查询数据，更新数据集
           * isOnlyServer:是否只请求报表服务
           */
        updateDatastore: function (isOnlyServer) {
            var that = this;
            that.vmdreport.myMask.show();
            if (!isOnlyServer) {
                BaseReport.prototype.updateDatastore.apply(that, []);
            }
            if (vmd.preivewMode || vmd.previewMode) {
                var moduleid = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.lastIndexOf("."))
                that.logInfoId = that.grid&&that.grid.gridId;
                if (moduleid.indexOf("report") >= 0) {
                    moduleid = parent.getUrlParam("id");
                }
                hwDas.save("CDEServcie/log/reportlog/addreportlog", {}, {}, { id: that.logInfoId, module_id: moduleid, report_id: this.reportId }, function (result) { }, function (msg) { })
            }
            for (var i = 0; i < this.sections.length; i++) {
                this.sections[i].serverRequestCompleted = false;
                this.sections[i].serverRequestSuccess = false;
            }
            for (var i = 0; i < this.sections.length; i++) {
                this.sections[i].requestServer(
                    function (result) {
                        this.serverRequestSuccess = true;
                        this.serverRequestCompleted = true;
                        //只有第一页请求时有数据总数
                        if (that.startIndex == 0 && result.totalcount) {
                            that.totalcount = result.totalcount;
                        }

                        //数据是否加载完成，如果当前数据索引值+请求记录数<数据总数，则没有加载完成，否则加载完成
                        if ((that.startIndex + that.getPageSize()) < that.totalcount) {
                            that.isLoadAllData = false;
                        }
                        else {
                            that.isLoadAllData = true;
                        }

                        //如果是分组报表滚动加载并且加载的不是第一页，则整合数据
                        if (that.loadMode == "smart" && (that.rptType == "group" || that.rptType == "select") && that.startIndex) {
                            //没加载完成时相关的需要重新计算的单元格需要加标志
                            //this.addUncalcFlag(result.datas);
                            this.compareGroup(result.datas,that);
                        }
                        else {
                            //删除标志
                            //this.clearUncalcFlag();
                            this.clearResultMatrix();
                            this.resultMatrix.rows = this.resultMatrix.rows.concat(result.datas);
                        }
                    },
                    function (msg) {
                        this.serverRequestCompleted = true;
                        that.showAlert("错误信息！", msg, "error");
                    }
                );
            }
        }
    });

    function HwSimpleReport() {
        BaseReport.apply(this, arguments);
    }

    extend(HwSimpleReport, BaseReport, {

        _ignoreVScroll: false,
		_ihdr:true,//是不是有表头
        //在外部绑定dhtmlx的数据集
        bindExtraDatastore: function (rptDataStore) {
            var that = this;
            this.bindDatastore = rptDataStore;
        },

        initContainer: function () {
            var that = this;
            BaseReport.prototype.initContainer.apply(this, []);
            var regExp = new RegExp("simple_grid", "gi");
            if (!regExp.test(this.rptContainer.className)) {
                this.rptContainer.className += " " + "simple_grid";
            }
        },

        initGrid: function () {
            var that = this;
            BaseReport.prototype.initGrid.apply(this, []);
            if (this.loadMode == "smart") {
                this.grid.enableSmartRendering(true);
            }
            if (this.bindDatastore) {
                this.bindDatastore.dhtmlxDatastore.data.scheme({
                    $init: function (obj) {
                        for (var key in that.scheme) {
                            obj[key] = that.scheme[key];
                        }
                    }
                });
                this.grid.sync(this.bindDatastore.dhtmlxDatastore);
            };
			//		var originCell = this.hwReport.getOriginCellById(sid);
            //if (originCell && (!this.rowSpanFlags[i] || this.rowSpanFlags[i].rowspan == 1)) {
            //    originCell.childs.push(r.idd + "_" + r.childNodes[i]._cellIndex);
			//}
				
			
        },

        prepare: function () {
            var that = this;
            BaseReport.prototype.prepare.apply(this, []);
        },

        attachEvents: function () {
            var that = this;
            BaseReport.prototype.attachEvents.apply(this, []);

            this.attachEvent("onStoreAllSuccess", function () {
                that.setSize();
                that.setPosition();
                if (that._callback) {
                    that._callback.apply(that, []);
                }
                that.vmdreport.fireEvent('reportrendered', that);
                return true;
            });
        },

        //重置序号单元格的值
        resetCounter: function () {
            var that = this;
            for (var i = 0; i < this.colTypes.length; i++) {
                if (this.colTypes[i] == "vmdorder") {
                    this.grid.resetCounter(i);
                }
            }
        },

        getDataCursor: function () {
            return this.dataCursor || 0;
        },

        //下一条
        nextItem: function () {
            if (!this.defined(this.dataCursor)) {
                this.dataCursor = 0;
                this.grid.selectRow(0, true, false, true);
                return;
            }

            if ((this.dataCursor + 1) >= this.grid.getRowsNum()) {
                if (!this.checkdhtmlxMessage()) {
                    this.insertRule(".dhtmlx_message_area", "text-align:center;right:" + (document.body.clientWidth - 250) / 2 + "px");
                    dhtmlx.message({
                        type: "info",
                        text: "已是最后一条！",
                        position: "bottom",
                        expire: 2000
                    })
                }
                return;
            }
            this.dataCursor++;
            this.grid.selectRow(this.dataCursor, true, false, true);
        },

        //上一条
        preItem: function () {
            if (!this.defined(this.dataCursor)) {
                this.dataCursor = 0;
                this.grid.selectRow(0, true, false, true);
                return;
            }
            if ((this.dataCursor - 1) < 0) {
                if (!this.checkdhtmlxMessage()) {
                    this.insertRule(".dhtmlx_message_area", "text-align:center;right:" + (document.body.clientWidth - 250) / 2 + "px");
                    dhtmlx.message({
                        type: "info",
                        text: "已是第一条！",
                        position: "bottom",
                        expire: 2000
                    })
                }
                return;
            }
            this.dataCursor--;
            this.grid.selectRow(this.dataCursor, true, false, true);
        },

        //跳转到第几条
        jumpToItem: function (number) {
            if (number < 0 || number >= this.grid.getRowsNum()) {
                this.showAlert("错误信息！", '当前报表数据总数为' + this.grid.getRowsNum() + ",设置的参数" + number + "超出范围！", "error");
                return;
            }
            if (this.dataCursor != number) {
                this.dataCursor = number;
                this.grid.selectRow(this.dataCursor, true, false, true);
            }
        }
    });

    function HwFreeReport() {
        BaseReport.apply(this, arguments);
    }

    extend(HwFreeReport, BaseReport, {
        _ignoreVScroll: false,
        //在外部绑定dhtmlx的数据集
        bindExtraDatastore: function (rptDataStore) {
            var that = this;
            this.bindDatastore = rptDataStore;
        },

        initContainer: function () {
            var that = this;
            BaseReport.prototype.initContainer.apply(this, []);
            var regExp = new RegExp("free_grid", "gi");
            if (!regExp.test(this.rptContainer.className)) {
                this.rptContainer.className += " " + "free_grid";
            }
        },

        initGrid: function () {
            var that = this;
            BaseReport.prototype.initGrid.apply(this, []);
        },

        prepare: function () {
            var that = this;
            BaseReport.prototype.prepare.apply(this, []);
            this.columnIds = null;
            this.colStyles = null;
        },

        attachEvents: function () {
            var that = this;
            BaseReport.prototype.attachEvents.apply(this, []);

            this.attachEvent("onStoreAllSuccess", function () {
                that.setSize();
                that.setPosition();
                that.notifyUpdateChange();
                if (that._callback) {
                    that._callback.apply(that, []);
                }
                that.vmdreport.fireEvent('reportrendered', that);
                return true;
            });
        },

        attachGridEvent: function () {
            var that = this;
            BaseReport.prototype.attachGridEvent.apply(this, []);

            this.grid.attachEvent("onEditCell", function doOnEditCell(stage, rId, cInd, newValue, oldValue) {
                var cellObj;
                //表头单元格
                if (dhx._isObj(rId) && !defined(cInd)) { //表头单元格没有值
                    cellObj = rId;
                    rId = null;
                    cInd = cellObj.cell.parentNode._cellIndex;
                }
                else {
                    cellObj = that.grid.cells(rId, cInd);
                }
                var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                if (stage == 2 && !isEqual(newValue, oldValue)) {
                    var _field = oCell.dsField && oCell.dsField[0];
                    var _dsName = oCell.dsName && oCell.dsName[0];
                    var bindStore = that.bindDatastore;
                    if (bindStore && _field && _dsName && bindStore.name == _dsName) {
                        var dataId = bindStore.idByIndex(that.getDataCursor());
                        bindStore.updateValue(dataId, _field, newValue);
                    }
                }
                return true;
            });

            this.grid.attachEvent("onRowInserted", function (row, rInd) {
                //行添加完成后如果是自由格式，则显示出编辑器
                var showEditorTypes = ["vmded", "vmdnum", "vmdpassw", "vmdorder", "vmdCalendarA", "vmdlaydate", "vmdcombo", "vmdgrid", "vmdtree"];
                that.grid.forEachCellsA(row.idd, function (cellObj, ind) {
                    if (showEditorTypes.indexOf(cellObj.cell._cellType) != -1 && cellObj.showEditor) {
                        cellObj.showEditor();
                    }
                });

                return true;
            })
        },

        /**
           * 查询数据，更新数据集
           * isOnlyServer:是否只请求报表服务
           */
        updateDatastore: function (isOnlyServer) {
            var that = this;
            BaseReport.prototype.updateDatastore.apply(this, []);
            var dimesion = this.matrix.getDimesions();
            var rows = dimesion.rows - this.headerLength;
            var cols = dimesion.cols;
            this.grid.parse({
                colcount: cols,
                rowcount: rows,
                datas: this.matrix.rows.slice(this.headerLength)
            }, "custom_json");
            if (this.bindDatastore) {
                this.bindDatastore.dhtmlxDatastore.data.attachEvent("onStoreUpdated", function (id, data, mode) {
                    that.notifyUpdateChange();
                });
                that.notifyUpdateChange();
            }
        },

        notifyUpdateChange: function () {
            var that = this;
            var grid = that.grid;
            grid.forEachCellsB(function (cellObj, rIndex, cInd) {
                var oCell = that.getOriginCellById(cellObj.cell._attrs.sid);
                if (!oCell) {
                    return;
                }
                var cellType = that.cellTypes.get(oCell.fillcelltype);
                if (that.bindDatastore) {
                    var _field = oCell.dsField && oCell.dsField[0];
                    var _dsName = oCell.dsName && oCell.dsName[0];
                    if (_dsName == that.bindDatastore.name && _field) {
                        var dataCursor = that.getDataCursor();
                        cellObj.setValue(that.bindDatastore.getValue(_field, dataCursor,cellType));
                    }
                }
                else {
                    if (that.checkParamType(oCell.datavalue) == "ds") {
                        cellObj.setValue(that.getValue(oCell.datavalue, that.dataCursor,cellType));
                    }
                }
            });
        },

        getDataCursor: function () {
            return this.dataCursor || 0;
        },

        //下一条
        nextItem: function () {
            if (!this.defined(this.dataCursor)) {
                this.dataCursor = 0; //对应数据集中第几条数据
                this.notifyUpdateChange();
                return;
            }

            if ((this.dataCursor + 1) >= this.totalcount) {
                if (!this.checkdhtmlxMessage()) {
                    this.insertRule(".dhtmlx_message_area", "text-align:center;right:" + (document.body.clientWidth - 250) / 2 + "px");
                    dhtmlx.message({
                        type: "info",
                        text: "已是最后一条！",
                        position: "bottom",
                        expire: 2000
                    })
                }
                return;
            }
            this.dataCursor++;
            this.notifyUpdateChange();
            return;
        },

        //上一条
        preItem: function () {
            if (!this.defined(this.dataCursor)) {
                this.dataCursor = 0; //对应数据集中第几条数据
                this.notifyUpdateChange();
                return;
            }
            if ((this.dataCursor - 1) < 0) {
                if (!this.checkdhtmlxMessage()) {
                    this.insertRule(".dhtmlx_message_area", "text-align:center;right:" + (document.body.clientWidth - 250) / 2 + "px");
                    dhtmlx.message({
                        type: "info",
                        text: "已是第一条！",
                        position: "bottom",
                        expire: 2000
                    })
                }
                return;
            }
            this.dataCursor--;
            this.notifyUpdateChange();
            return;
        },

        //跳转到第几条
        jumpToItem: function (number) {
            if (number < 0 || number >= this.totalcount) {
                this.showAlert("错误信息！", '当前报表数据总数为' + this.totalcount + ",设置的参数" + number + "超出范围！", "error");
                return;
            }
            if (this.dataCursor != number) {
                this.dataCursor = number;
                this.notifyUpdateChange();
            }
            return;
        }
    });

    /**
    * 判断页面中是否已引入js
    */
    function ContainsJS(jsName) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0, l = scripts.length; i < l; i++) {
            var src = scripts[i].src;
            if (src.indexOf(jsName) != -1) {
                return true;
            }
        }
        return false;
    };

    /**
    * 获取js路径
    */
    function CreateJSPath(str, dis) {
        if (!ContainsJS(str)) {
            return "";
        }
        var scripts = document.getElementsByTagName("script");
        var path = "";
        if (str && str.indexOf("js") != -1) {
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
        if (isAbsolutePath) {
            path = path.split("/");
        }
        path.length = path.length - 1 + (dis || 0);
        path = path.join("/");
        return path;
    };

    /*
    * @function 动态加载css文件
    * @param {string} options.url -- css资源路径
    * @param {function} options.callback -- 加载后回调函数
    * @param {string} options.id -- link标签id
    */
    function loadCss(options) {
        var url = options.url,
            callback = typeof options.callback == "function" ? options.callback : function () { },
            id = options.id,
            node = document.createElement("link"),
            supportOnload = "onload" in node,
            isOldWebKit = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536, // webkit旧内核做特殊处理
            protectNum = 300000; // 阈值10分钟，一秒钟执行pollCss 500次

        node.rel = "stylesheet";
        node.type = "text/css";
        node.href = url;
        if (typeof id !== "undefined") {
            node.id = id;
        }
        document.getElementsByTagName("head")[0].appendChild(node);

        // for Old WebKit and Old Firefox
        if (isOldWebKit || !supportOnload) {
            // Begin after node insertion
            setTimeout(function () {
                pollCss(node, callback, 0);
            }, 1);
            return;
        }

        if (supportOnload) {
            node.onload = onload;
            node.onerror = function () {
                // 加载失败(404)
                onload();
            }
        } else {
            node.onreadystatechange = function () {
                if (/loaded|complete/.test(node.readyState)) {
                    onload();
                }
            }
        }

        function onload() {
            // 确保只跑一次下载操作
            node.onload = node.onerror = node.onreadystatechange = null;

            // 清空node引用，在低版本IE，不清除会造成内存泄露
            node = null;

            callback();
        }

        // 循环判断css是否已加载成功
        /*
        * @param node -- link节点
        * @param callback -- 回调函数
        * @param step -- 计步器，避免无限循环
        */
        function pollCss(node, callback, step) {
            var sheet = node.sheet,
                isLoaded;

            step += 1;

            // 保护，大于10分钟，则不再轮询
            if (step > protectNum) {
                isLoaded = true;

                // 清空node引用
                node = null;

                callback();
                return;
            }

            if (isOldWebKit) {
                // for WebKit < 536
                if (sheet) {
                    isLoaded = true;
                }
            } else if (sheet) {
                // for Firefox < 9.0
                try {
                    if (sheet.cssRules) {
                        isLoaded = true;
                    }
                } catch (ex) {
                    // 火狐特殊版本，通过特定值获知是否下载成功
                    // The value of `ex.name` is changed from "NS_ERROR_DOM_SECURITY_ERR"
                    // to "SecurityError" since Firefox 13.0. But Firefox is less than 9.0
                    // in here, So it is ok to just rely on "NS_ERROR_DOM_SECURITY_ERR"
                    if (ex.name === "NS_ERROR_DOM_SECURITY_ERR") {
                        isLoaded = true;
                    }
                }
            }

            setTimeout(function () {
                if (isLoaded) {
                    // 延迟20ms是为了给下载的样式留够渲染的时间
                    callback();
                } else {
                    pollCss(node, callback, step);
                }
            }, 20);
        }
    };

    function insertRule(selectorText, cssText, position) {
        if (!insertRuleSheet) {
            var styleEl = document.createElement('style');
            document.head.appendChild(styleEl);
            insertRuleSheet = styleEl.sheet || styleEl.styleSheet;
        }

        var ruleIndex = -1;
        for (var i = 0; i < insertRuleSheet.cssRules.length; i++) {
            if (insertRuleSheet.cssRules[i].selectorText == selectorText) {
                ruleIndex = i;
                break;
            }
        }
        if (ruleIndex != -1) {
            insertRuleSheet.deleteRule(ruleIndex);
        }

        if (insertRuleSheet.insertRule) {
            insertRuleSheet.insertRule(selectorText + "{" + cssText + "}", position);
        } else if (insertRuleSheet.addRule) {
            insertRuleSheet.addRule(selectorText, cssText, poistion);
        }
    }

    function checkdhtmlxMessage() {
        var dhtmlxInfoDoms = $(".dhtmlx_message_area>.dhtmlx-info");
        if (dhtmlxInfoDoms.length > 0) {
            return true;
        }
        return false;
    }

    /**
    * 打印窗口
    */
    function PrintWindow(confirmCallback, cancelCallback, options,report) {
        this.options = options;
        this.report=report;
        var instances = window.instances = window.instances || {};
        if (instances && instances["dhx_printWidow"]) {
            if(instances["dhx_printWidow"].report&&report&&instances["dhx_printWidow"].report.reportId==report.reportId){
                 return instances["dhx_printWidow"];
            }
        }

        var that = this;
        if (this.dhxPrintSetWindow) {
            return this.dhxPrintSetWindow;
        }
        this.dhxWindow = this.dhxWindow || new dhtmlXWindows();
        this.dhxPrintSetWindow = this.dhxPrintSetWindow || this.dhxWindow.createWindow("dhxPrintSetWindow", 0, 0, 400, 500);
        this.dhxPrintSetWindow.setText(unescape("打印设置"));
        this.dhxPrintSetWindow.denyResize();
        this.dhxPrintSetWindow.centerOnScreen();

        this.initComponent = function() {
            that.dhxPrintSetForm.setItemValue("pageSize", this.options.pageSize);
            that.dhxPrintSetForm.setItemValue("pageSizeLabel", this.options.mmSize[this.options.pageSize] + "mm");
            
            that.dhxPrintSetForm.setItemValue("pageDirection", this.options.pageDirection);
            that.dhxPrintSetForm.setItemValue("dpihStandard", this.options.dpihStandard);
            that.dhxPrintSetForm.setItemValue("repeatHeader", this.options.repeatHeader);
            that.dhxPrintSetForm.setItemValue("scaleColWidth", this.options.scaleColWidth);

            that.dhxPrintSetForm.setItemValue("top", this.options.top);
            that.dhxPrintSetForm.setItemValue("left", this.options.left);
            that.dhxPrintSetForm.setItemValue("right", this.options.right);
            that.dhxPrintSetForm.setItemValue("bottom", this.options.bottom);

            that.dhxPrintSetForm.setItemValue("isColumn", this.options.columnPerPage > 1 ? true : false);
            that.dhxPrintSetForm.setItemValue("columnPerPage", this.options.columnPerPage);
            that.dhxPrintSetForm.setItemValue("columnPadding", this.options.columnPadding);

            if (this.options.columnPerPage > 1) {
                that.dhxPrintSetForm.showItem("columnPerPage");
                that.dhxPrintSetForm.showItem("columnPadding");
                that.dhxPrintSetForm.showItem("columnPX");
            }
            else {
                that.dhxPrintSetForm.hideItem("columnPerPage");
                that.dhxPrintSetForm.hideItem("columnPadding");
                that.dhxPrintSetForm.hideItem("columnPX");
            }
            
            var confirmButton = that.dhxPrintSetForm._getItemByName("confirm").children[0];
            confirmButton.style.backgroundColor = "#39c";
            confirmButton.style.color = "#FFFFFF";

            var cancelButton = that.dhxPrintSetForm._getItemByName("cancel").children[0];
            cancelButton.style.backgroundColor = "#39c";
            cancelButton.style.color = "#FFFFFF";

        }

        this.dhxPrintSetWindow.attachEvent("onShow", function (win) {
            //that.initComponent();
        });

        this.dhxPrintSetWindow.attachEvent("onClose", function (win) {
            win.hide();
        });

        this.dhxPrintSetForm = this.dhxPrintSetForm || this.dhxPrintSetWindow.attachForm([

            {
                type: "block", blockOffset: 20, offsetTop: 5, list: [
                   {
                       type: "combo", position: "label-left", name: "pageSize", offsetLeft: 0, label: "纸张大小：", labelWidth: 100, inputHeight: 50, inputWidth: 130,
                       options: [
                           { value: "A1", text: "A1" },
                           { value: "A2", text: "A2" },
                           { value: "A3", text: "A3" },
                           { value: "A4", text: "A4", selected: true },
                           { value: "A5", text: "A5" },
                           { value: "B3", text: "B3" },
                           { value: "B4", text: "B4" },
                           { value: "B5(ISO)", text: "B5(ISO)" },
                           { value: "B5(JIS)", text: "B5(JIS)" }
                       ]
                   },
                   { type: "newcolumn" },
                   { type: "input", name: "pageSizeLabel", labelWidth: 0, labelHeight: 18, width: 95, offsetLeft: 15, offsetTop: 10, position: "label-left", label: "", value: "210x297mm", disabled: true }
                ]
            },
            {
                type: "block", blockOffset: 20, offsetTop: 5, list: [
                   {
                       type: "combo", position: "label-left", name: "pageDirection", offsetLeft: 0, label: "纸张方向：", labelWidth: 100, inputHeight: 50, inputWidth: 250,
                       options: [
                           { value: "v", text: "纵向", selected: true },
                           { value: "h", text: "横向" }
                       ]
                   }
                ]
            },
            {
                type: "block", blockOffset: 20, offsetTop: 5, list: [
                   { type: "input", name: "dpihStandard", labelWidth: 100, labelHeight: 18, width:200, offsetLeft: 0, offsetTop: 10, inputHeight: 20, position: "label-left", label: "打印机分辨率：", value: "90" },
                   { type: "newcolumn" },
                   { type: "label", label: "点/英寸" }
                ]
            },
            {
                type: "block", blockOffset: 5, offsetTop: 12, list: [

                   {
                       type: "fieldset", label: unescape("边距(mm)"), width: 350, offsetLeft: 10, offsetTop: 2, list: [
                          {
                              type: "block", width: 300, blockOffset: 0, list: [
                                 { type: "input", name: "top", labelWidth: 25, labelHeight: 18, width: 90, offsetLeft: 0, offsetTop: 5, position: "label-left", label: "上:", value: "0" },
                                 { type: "newcolumn" },
                                 { type: "input", name: "bottom", labelWidth: 25, labelHeight: 18, width: 90, offsetLeft: 40, offsetTop: 5, position: "label-left", label: "下:", value: "0" }
                              ]
                          },
                          {
                              type: "block", width: 300, blockOffset: 0, list: [
                                 { type: "input", name: "left", labelWidth: 25, labelHeight: 18, width: 90, offsetLeft: 0, offsetTop: 5, position: "label-left", label: "左:", value: "0" },
                                 { type: "newcolumn" },
                                 { type: "input", name: "right", labelWidth: 25, labelHeight: 18, width: 90, offsetLeft: 40, offsetTop: 5, position: "label-left", label: "右:", value: "0" }
                              ]
                          }
                       ]
                   }
                ]
            },
            {
                type: "block", blockOffset: 20, offsetTop: 5, list: [
                    { type: "checkbox", position: "label-right", name: "repeatHeader", labelHeight: 18, offsetLeft: 0, offsetTop: 5, label: "表头重复<span style='color:#a3a3a3;font-size:12px;margin-left:1em;'>(表头是否在除第一页外其他页显示)</span>" }
                ]
            },
            {
                type: "block", blockOffset: 20, offsetTop: 5, list: [
                    { type: "checkbox", position: "label-right", name: "scaleColWidth", labelHeight: 18, offsetLeft: 0, offsetTop: 5, label: "列宽适应<span style='color:#a3a3a3;font-size:12px;margin-left:1em;'>(列数过多时是否缩放至一页显示)</span>" }
                ]
            }, {
                type: "block", blockOffset: 20, offsetTop: 5, list: [
                    { type: "checkbox", position: "label-right", name: "isColumn", labelHeight: 25, offsetLeft: 0, offsetTop: 5, label: "打印分栏" },
                    { type: "newcolumn" },
                    { type: "input", name: "columnPerPage", labelWidth: 50, labelHeight: 18, width: 30, offsetLeft: 20, offsetTop: 5, position: "label-right", label: "栏/页", value: "1" },
                    { type: "newcolumn" },
                    { type: "input", name: "columnPadding", labelWidth: 60, labelHeight: 18, width: 60, offsetLeft: 15, offsetTop: 5, position: "label-left", label: "栏间距：", value: "20" },
                    { type: "newcolumn" },
                    { type: "label",name:"columnPX", label: "px" }
                ]
            },
            
            {
                type: "block", width: 345, blockOffset: 10, offsetTop: 0, list: [
                   { type: "label", label: "<span style='color:#ff0000;font-size:12px;'>说明：此处设置的属性需要在浏览器打印预览界面对应设置</span>" }
                ]
            },
            {
                type: "block", offsetLeft: 200, list: [
                   { type: "button", width: 60, name: "confirm", value: "确定", offsetTop: 15, offsetLeft: 10 },
                   { type: "newcolumn" },
                   { type: "button", width: 60, name: "cancel", value: "取消", offsetTop: 15, offsetLeft: 10 }
                ]
            }
        ]);

        this.dhxPrintSetForm.attachEvent("onChange", function (name, value) {
            switch (name) {
                case "isColumn":
                    if (that.dhxPrintSetForm.isItemChecked("isColumn")) {
                        that.dhxPrintSetForm.showItem("columnPerPage");
                        that.dhxPrintSetForm.showItem("columnPadding");
                        that.dhxPrintSetForm.showItem("columnPX");
                    }
                    else {
                        that.dhxPrintSetForm.hideItem("columnPerPage");
                        that.dhxPrintSetForm.hideItem("columnPadding");
                        that.dhxPrintSetForm.hideItem("columnPX");
                    }
                    break;
                case "pageSize":
                    that.dhxPrintSetForm.setItemValue("pageSizeLabel", that.options.mmSize[value] + "mm");
                    break;
            }
        });

        this.dhxPrintSetForm.attachEvent("onButtonClick", function (name) {
            if (name == "confirm") {
                var pageSize = that.dhxPrintSetForm.getCombo("pageSize");
                var pageDirection = that.dhxPrintSetForm.getCombo("pageDirection");
                var dpihStandard = that.dhxPrintSetForm.getInput("dpihStandard");
                
                var columnPerPage = that.dhxPrintSetForm.getInput("columnPerPage");
                var columnPadding = that.dhxPrintSetForm.getInput("columnPadding");

                var top = that.dhxPrintSetForm.getInput("top");
                var left = that.dhxPrintSetForm.getInput("left");
                var right = that.dhxPrintSetForm.getInput("right");
                var bottom = that.dhxPrintSetForm.getInput("bottom");
                
                var params = {};
                params.pageSize = pageSize.getSelectedValue();
                params.pageDirection = pageDirection.getSelectedValue();
                params.dpihStandard = isNaN(parseInt(dpihStandard.value)) ? 90 : parseInt(dpihStandard.value);
                params.repeatHeader = that.dhxPrintSetForm.isItemChecked("repeatHeader");
                params.scaleColWidth = that.dhxPrintSetForm.isItemChecked("scaleColWidth");

                params.columnPerPage = that.dhxPrintSetForm.isItemChecked("isColumn") ? parseInt(columnPerPage.value) : 1;
                params.columnPadding = parseInt(columnPadding.value);

                params.top = isNaN(parseInt(top.value)) ? 0 : parseInt(top.value);
                params.left = isNaN(parseInt(left.value)) ? 0 : parseInt(left.value);
                params.right = isNaN(parseInt(right.value)) ? 0 : parseInt(right.value);
                params.bottom = isNaN(parseInt(bottom.value)) ? 0 : parseInt(bottom.value);

                that.dhxPrintSetWindow.hide();
                if (confirmCallback) {
                    confirmCallback.apply(that, [params,that.report]);
                }
            }
            else if (name == "cancel") {
                that.dhxPrintSetWindow.hide();
                if (cancelCallback) {
                    cancelCallback.apply(that, []);
                }
            }
        });

        this.show = function () {
            this.dhxPrintSetWindow.show();
        }

        this.initComponent();
        instances["dhx_printWidow"] = this;
    }

    /**
    * 粘贴窗口
    */
    function PasteWindow(options) {
        var instances = window.instances = window.instances || {};
        if (instances && instances["dhx_pasteWidow"]) {
            return instances["dhx_pasteWidow"];
        }

        this.setOptions = function () {
            this.options = options;
        }

        this.createCellPos = function(n) {
            var ordA = 'A'.charCodeAt(0);
            var ordZ = 'Z'.charCodeAt(0);
            var len = ordZ - ordA + 1;
            var s = "";
            while (n >= 0) {
                s = String.fromCharCode(n % len + ordA) + s;
                n = Math.floor(n / len) - 1;
            }
            return s;
        }

        this.initGrid = function (datas) {
            var that = this;
            var container = this.pasteViewForm.getContainer("pasteView");
            container.style.height = (this.windowHeight - 157) + "px";
            var pasteView = this.pasteView = new dhtmlXGridObject(container);
            var colWidths = [];

            this.pasteViewForm.hideItem("seprator_container");
            
            for (var i = 0; i < this.rowsNum; i++) {
                datas[i].unshift((i + 1) + "");
                for (var j = 0; j < this.colsNum + 1; j++) {
                    var d = datas[i][j] || "";
                    var ch_char = d.match(/[\u4e00-\u9fa5]/g) || { length: 0 };
                    colWidths[j] = Math.min(Math.max(colWidths[j] || 0, ch_char.length * 14 + (d.length - ch_char.length) * 7 + 20), 250);
                }
            }

            var headers = Array.apply(null, Array(this.colsNum + 1)).map(function (v, index) { return index == 0 ? "" : that.createCellPos(index - 1) });
            var headerstyle = Array.apply(null, Array(this.colsNum + 1)).map(function (v, index) { return "text-align:center;vertical-align: middle;border-right-color: rgb(223, 223, 223);padding:4px 4px 4px 0px;border-width: 0px 1px 0px 0px;background-color:rgb(237,237,237);" });
            var coltype = Array.apply(null, Array(this.colsNum + 1)).map(function (v, index) { return index == 0 ? "ro" : "ed" });
            pasteView.setHeader(headers.join(","), null, headerstyle, []);
            pasteView.setNoHeader(false);//设置是否有表头
            pasteView.setInitWidths(colWidths.join(","));
            pasteView.setColTypes(coltype.join(","));
            pasteView.enableEditEvents(true, false, true); //启用单击编辑单元格事件
            pasteView.enabledSelecteStates(false);
            pasteView.setImagePath(this.imagePath + "/lib/dhtmlx/skins/material/imgs/");
            pasteView.dontSetSizes = true;
            pasteView.init();
            pasteView.splitAt(1);
            pasteView.parse(datas, "jsarray");
        }

        this.initTextArea = function (datas) {
            var that = this;
            var container = this.pasteViewForm.getContainer("pasteView");
            if (this.windowWidth - 350 > 410) {
                container.style.height = (this.windowHeight - 195) + "px";
            }
            else {
                container.style.height = (this.windowHeight - 202) + "px";
            }
            container.className = container.className.replace(/gridbox_material|gridbox/g, "");
            this.pasteViewForm.showItem("seprator_container");
            container.innerHTML = "";
            var pasteView = this.pasteView = document.createElement("TEXTAREA");
            //textarea支持tab键
            pasteView.onkeydown = function (e, obj) {
                e = e || window.event;
                if (e.keyCode == 9) {
                    e.preventDefault();
                    var indent = '\t';
                    var start = this.selectionStart;
                    var end = this.selectionEnd;
                    var selected = window.getSelection().toString();
                    selected = indent + selected.replace(/\n/g, '\n' + indent);
                    this.value = this.value.substring(0, start) + selected
                            + this.value.substring(end);
                    this.setSelectionRange(start + indent.length, start
                            + selected.length);
                }
            }
            var w = container.clientWidth;
            var h = container.clientHeight;
            pasteView.style.width = (w - 4) + "px";
            pasteView.style.height = (h - 4) + "px";

            container.appendChild(pasteView);
            var dataStr = datas.map(function (v) { return v.join(that.delimiter) }).join(that.r_delimiter);
            pasteView.value = dataStr;
        }

        this.setDelimiter = function (delimiter) {
            var that = this;
            if (that.showMode != "textarea") {
                return;
            }
            var datas = that.getDatas();
            that.delimiter = delimiter;
            that.setDatas(datas);
        }

        this.convertRowToCol = function (datas) {
            var that = this;
            if (!datas) {
                return [];
            }

            var convertDatas = Array.apply(null, Array(that.colsNum)).map(function () { return Array(that.rowsNum) });
            for (var i = 0; i < that.rowsNum; i++) {
                for (var j = 0; j < that.colsNum; j++) {
                    convertDatas[j][i] = datas[i][j];
                }
            }
            var colsNum = that.colsNum;
            var rowsNum = that.rowsNum;
            that.colsNum = rowsNum;
            that.rowsNum = colsNum;
            return convertDatas;
        }

        this.loadDataFromClipboard = function () {
            var that = this;
            if (!this._clip_area) return;

            this._clip_area.select();
            window.setTimeout(function () {
                if (!that._clip_area.value) {
                    that.clear();
                    return;
                }

                var datas = that._clip_area.value.split("\n").filter(function (v) { return v != "" }).map(function (v) { return v.split("\t") });

                that.rowsNum = datas.length;
                that.colsNum = Math.max.apply(null, datas.map(function (v) { return v.length }));
                if (that.pasteViewForm.isItemChecked("rowToCol")) {
                    datas = that.convertRowToCol(datas);
                }
                that.setDatas(datas);
            }, 1);

        }

        this.getDatas = function () {
            var that = this;
            var datas = [];
            if (this.showMode == "grid") {
                datas = Array.apply(null, Array(that.rowsNum)).map(function () { return Array(that.colsNum) });
                for (var i = 0; i < that.rowsNum; i++) {
                    for (var j = 1; j < that.colsNum + 1; j++) {
                        datas[i][j - 1] = that.pasteView.cells2(i, j).getValue();
                    }
                }
            }
            else {
                if (that.pasteView.value == "") {
                    datas = [[""]];
                }
                else {
                    datas = that.pasteView.value.split(that.r_delimiter).filter(function (v) { return v != "" }).map(function (v) { return v.split(that.delimiter) });
                }
                this.rowsNum = datas.length;
                this.colsNum = Math.max.apply(null, datas.map(function (v) { return v.length }));
            }
            return datas;
        }

        this.clear = function () {
            var that = this;
            if (!that.pasteView) {
                return;
            }
            if (that.showMode == "grid") {
                that.pasteView.clearAll(true);
            }
            else {
                that.pasteView.value = "";
            }
        }

        this.setDatas = function (datas) {
            var that = this;
            if (that.showMode == "grid") {
                that.initGrid(datas);
            } else {
                that.initTextArea(datas);
            }
        }

        this.init = function () {
            var that = this;
            this.showMode = "textarea"; //grid textarea
            this.delimiter = "\t";
            this.r_delimiter = "\n";
            this.rowsNum = 0;
            this.colsNum = 0;
            this.imagePath = "";

            this.setOptions();
            this.windowHeight = Math.max(420, parseInt(document.body.clientHeight * 0.9 + 42));//弹出窗口的高度
            this.windowWidth = parseInt(4 * this.windowHeight / 3);  //弹出窗口的宽度
            this.girdWidth = this.windowWidth - 20;
            this.girdHeight = this.windowHeight - 203;
            var bzLabelWidth = this.windowWidth - 350;
            var buttonOffsetLeft = this.windowWidth - 450;

            var area = this._clip_area = document.createElement("textarea");
            area.style.cssText = "position:absolute; width:1px; height:1px; overflow:hidden; color:transparent; background-color:transparent; bottom:1px; right:1px; border:none;";

            area.onkeydown = function (e) {
                e = e || event;
                if (e.keyCode == 86 && (e.ctrlKey || e.metaKey)) { }
                    //self.pasteBlockFromClipboard()
            };
            document.body.insertBefore(this._clip_area, document.body.firstChild);

            var dhxWindow = new dhtmlXWindows();
            this.pasteViewWindow = dhxWindow.createWindow("pasteViewWindow", 0, 0, this.windowWidth, this.windowHeight);
            this.pasteViewWindow.centerOnScreen();
            this.pasteViewWindow.denyResize();             //禁止改变大小
            this.pasteViewWindow.button("park").hide();
            //this.pasteViewWindow.button("minmax1").hide();
            this.pasteViewWindow.setText("粘贴窗口");

            this.pasteViewWindow.attachEvent("onClose", function (win) {
                win.hide();
            });

            this.pasteViewWindow.attachEvent("onShow", function (win) {
                that.loadDataFromClipboard();
            });

            this.pasteViewForm = this.pasteViewWindow.attachForm([
                {
                    type: "block", name: "seprator_container", offsetLeft: 1, offsetTop: 5, list: [
                        { type: "label", label: "<span style='color:#FF0000;font-size:12px;'>注：</span>", offsetLeft: 0, offsetTop: 0 },
                        { type: "newcolumn" },
                        { type: "label", label: "<span style='color:#FF0000;font-size:12px;width:" + bzLabelWidth + "px;display:block;word-wrap:break-word;'>默认以tab分隔，列数过多时会出现折行，建议切换成网格查看具体行列数。</span>", offsetLeft: 0, offsetTop: 0 },
                        { type: "newcolumn" },
                        {
                            type: "combo", position: "label-left", name: "seprator_combo", offsetLeft: 10, label: "分隔符：", labelWidth: 60, inputHeight: 18, inputWidth: 90,
                            options: [
                                { value: "tab", text: "tab", selected: true },
                                { value: "comma", text: "逗号" },
                                { value: "space", text: "空格" },
                                { value: "other", text: "自定义" }
                            ]
                        },
                        { type: "newcolumn" },
                        { type: "input", name: "other", labelWidth: 60, labelHeight: 18, width: 60, offsetLeft: 20, offsetTop: 10, position: "label-left", label: "", value: "",  hidden: true}
                    ]
                },
                {
                    type: "container", name: "pasteView", label: "", width: this.girdWidth, inputHeight: this.girdHeight, offsetLeft: 4
                },
                {
                    type: "block", offsetLeft: 0, offsetTop: 15, list: [

                        { type: "radio", position: "label-right", value: "replace", name: "radio1", labelHeight: 18, offsetLeft: 0, offsetTop: 0, label: "替换", checked: true },
                        { type: "newcolumn" },
                        { type: "radio", position: "label-right", value: "insert", name: "radio1", labelHeight: 18, offsetLeft: 5, offsetTop: 0, label: "插入" },
                        { type: "newcolumn" },

                        { type: "checkbox", position: "label-right", name: "isInsertNew", labelHeight: 18, offsetLeft: 40, offsetTop: 0, label: "<span style='color:#000000;font-size:12px;'>界面记录不足插入新纪录</span>" },
                        { type: "newcolumn" },
                        { type: "checkbox", position: "label-right", name: "isBellow", labelHeight: 18, offsetLeft: 40, offsetTop: 0, label: "<span style='color:#000000;font-size:12px;'>选中区域下方插入</span>", hidden: true, checked: true },
                        { type: "newcolumn" },
                        { type: "checkbox", position: "label-right", name: "isAbove", labelHeight: 18, offsetLeft: 10, offsetTop: 0, label: "<span style='color:#000000;font-size:12px;'>选中区域上方插入</span>", hidden: true },
                        { type: "newcolumn" }
                    ]
                },
                {
                    type: "block", offsetLeft: 0, offsetTop: 15, list: [
                        { type: "checkbox", position: "label-right", name: "rowToCol", labelHeight: 18, offsetLeft: 0, offsetTop: 0, label: "行转列" },
                        { type: "newcolumn" },

                        { type: "label", label: "显示方式：", offsetLeft: 20, offsetTop: 0 },
                        { type: "newcolumn" },
                        { type: "radio", position: "label-right", value: "textarea", name: "radio2", labelHeight: 18, offsetLeft: 0, offsetTop: 0, label: "文本", checked: true },
                        { type: "newcolumn" },
                        { type: "radio", position: "label-right", value: "grid", name: "radio2", labelHeight: 18, offsetLeft: 5, offsetTop: 0, label: "网格" },
                        { type: "newcolumn" },

                        { type: "button", width: 60, name: "confirm", value: "确 定", offsetTop: 0, offsetLeft: buttonOffsetLeft },
                        { type: "newcolumn" },
                        { type: "button", width: 60, name: "cancel", value: "取 消", offsetTop: 0, offsetLeft: 10 }
                    ]
                }
            ]);

            this.pasteViewForm.attachEvent("onChange", function (name, value) {
                switch (name) {
                    case "rowToCol":
                        datas = that.convertRowToCol(that.getDatas());
                        that.setDatas(datas);
                        break;
                    case "isBellow":
                        that.pasteViewForm.uncheckItem("isAbove");
                        that.pasteViewForm.checkItem("isBellow");
                        break;
                    case "isAbove":
                        that.pasteViewForm.uncheckItem("isBellow");
                        that.pasteViewForm.checkItem("isAbove");
                        break;
                    case "radio1":
                        if (value == "insert") {
                            that.pasteViewForm.hideItem("isInsertNew");
                            that.pasteViewForm.showItem("isBellow");
                            that.pasteViewForm.showItem("isAbove");
                        }
                        else {
                            that.pasteViewForm.hideItem("isBellow");
                            that.pasteViewForm.hideItem("isAbove");
                            that.pasteViewForm.showItem("isInsertNew");
                        }
                        break;
                    case "radio2":
                        var datas = that.getDatas();
                        that.showMode = value;
                        that.setDatas(datas);
                        break;
                    case "radio0":
                        if (value == "tab") {
                            that.setDelimiter("\t");
                        }
                        else if (value == "comma") {
                            that.setDelimiter(",");
                        }
                        break;
                    case "seprator_combo":
                        if (value == "tab") {
                            that.pasteViewForm.hideItem("other");
                            that.setDelimiter("\t");
                        }
                        else if (value == "comma") {
                            that.pasteViewForm.hideItem("other");
                            that.setDelimiter(",");
                        }
                        else if (value == "space") {
                            that.pasteViewForm.hideItem("other");
                            that.setDelimiter(" ");
                        }
                        else if (value == "other") {
                            that.pasteViewForm.showItem("other");
                            var otherV = that.pasteViewForm.getItemValue("other");
                            if (otherV) {
                                that.setDelimiter(otherV);
                            }
                        }
                        break;
                    case "other":
                        if (/\\t/g.test(value)) {
                            that.setDelimiter("\t");
                        }
                        else {
                            that.setDelimiter(value);
                        }
                        break;
                }
            });

            this.pasteViewForm.attachEvent("onButtonClick", function (name) {
                if (name == "confirm") {
                    if (typeof (that.options.confirm) == "function") {
                        var type = 'replace';
                        var param = "";
                        if (that.pasteViewForm.isItemChecked("radio1", "replace")) {
                            type = 'replace';
                            if (that.pasteViewForm.isItemChecked("isInsertNew")) {
                                param = "patch";
                            }
                        }
                        else if (that.pasteViewForm.isItemChecked("radio1", "insert")) {
                            type = 'insert';
                            if (that.pasteViewForm.isItemChecked("isBellow")) {
                                param = "bellow";
                            }
                            else if (that.pasteViewForm.isItemChecked("isAbove")) {
                                param = "above";
                            }
                        }
                        that.options.confirm.apply(that, [type, param, that.getDatas()]);
                    }
                    that.pasteViewWindow.hide();
                }
                else if (name == "cancel") {
                    if (typeof (that.options.cancel) == "function") {
                        that.options.cancel.apply(that, []);
                    }
                    that.pasteViewWindow.hide();
                }
            });

            var pasteView_container = this.pasteViewForm.getContainer("pasteView");
            pasteView_container.className += " pasteView";

            var confirmButton = that.pasteViewForm._getItemByName("confirm").children[0];
            confirmButton.style.backgroundColor = "#39c";
            confirmButton.style.color = "#FFFFFF";

            var cancelButton = that.pasteViewForm._getItemByName("cancel").children[0];
            cancelButton.style.backgroundColor = "#39c";
            cancelButton.style.color = "#FFFFFF";

            that.loadDataFromClipboard();
        }

        this.show = function () {
            this.pasteViewWindow.show();
        }

        this.init();
        window.instances["dhx_pasteWidow"] = this;
    }

    window.HwReport = HwReport;
    window.HwSimpleReport = HwSimpleReport;
    window.HwFreeReport = HwFreeReport;
    window.PasteWindow = PasteWindow;
    window.console = window.console || (function () { var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () { }; return c; })();
}());