/*
filename：dhtmlxgrid_validation.js
creater：
date created：2016.11.19
description：校验组件
date modified：2018.04.17
modifier：刘志伟
version：2.3.2.0329
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/
var feildLengths = {};
dhtmlxValidation = function () { };
dhtmlxValidation.prototype = {
    trackInput: function (el, rule, callback_error, callback_correct) {
        dhtmlxEvent(el, "keyup", function (e) {
            if (dhtmlxValidation._timer) {
                window.clearTimeout(dhtmlxValidation._timer);
                dhtmlxValidation._timer = null;
            }
            dhtmlxValidation._timer = window.setTimeout(function () {

                if (!dhtmlxValidation.checkInput(el, rule)) {
                    if (!callback_error || callback_error(el, el.value, rule))
                        el.className += " dhtmlx_live_validation_error";
                } else {
                    el.className = el.className.replace(/[ ]*dhtmlx_live_validation_error/g, "");
                    if (callback_correct)
                        callback_correct(el, el.value, rule);
                }

            }, 250);
        });
    },
    checkInput: function (input, rule) {
        return this.checkValue(input.value, rule);
    },
    checkValue: function (id, ind, value, rule, ruleEx, errMsgs) {
        var final_res = {};
        if (!this["is" + rule])
            alert("校验规则不存在: " + rule);
        else {
            final_res = this["is" + rule](id, ind, value, ruleEx, errMsgs);
        }
        return final_res;
    },
    isEmpty: function (id, ind, value, ruleEx, errMsg) {
        var isresult = (value == '');
        return { result: isresult, type: "Error", errMsg: errMsg || "值须为空" };
    },
    isNotEmpty: function (id, ind, value, ruleEx, errMsg) {

        var isresult = (value instanceof Array ? value.length > 0 : !value == ''); // array in case of multiselect
        return { result: isresult, type: "Error", errMsg: errMsg || "值不能为空" };
    },
    isValidBoolean: function (id, ind, value, ruleEx, errMsg) {
        var isresult = !!value.toString().match(/^(0|1|true|false)$/);
        return { result: isresult, type: "Error", errMsg: errMsg || "值须为true或是false" };
    },
    isValidEmail: function (id, ind, value, ruleEx, errMsg) {

        if (value) {
            var isresult = !!value.toString().match(/(^[a-z0-9]([0-9a-z\-_\.]*)@([0-9a-z_\-\.]*)([.][a-z]{3})$)|(^[a-z]([0-9a-z_\.\-]*)@([0-9a-z_\-\.]*)(\.[a-z]{2,4})$)|(^(\/)$)/i);
            return { result: isresult, type: "Error", errMsg: errMsg || "邮箱输入不正确" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    isValidTelePhone: function (id, ind, value, ruleEx, errMsg) {
        if (value) {
            var isresult = !!value.toString().match(/^([0-9]{3,4}[-\s]{0,1})?[0-9]{7,8}$|(^(\/)$)/);
            return { result: isresult, type: "Error", errMsg: errMsg || "电话号码输入不正确！" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    isValidCellPhone: function (id, ind, value, ruleEx, errMsg) {
        if (value) {
            var isresult = !!value.toString().match(/^((\+?86)|(\(\+86\)))?(1[34578]\d{9})$|(^(\/)$)/);
            return { result: isresult, type: "Error", errMsg: errMsg || "手机号码输入不正确！" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    isValidIdCard: function (id, ind, value, ruleEx, errMsg) {
        if (value) {
            var isresult = !!value.toString().match(/^([1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)|(^(\/)$)/);
            return { result: isresult, type: "Error", errMsg: errMsg || "身份证号输入不正确！" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    isValidPostCode: function (id, ind, value, ruleEx, errMsg) {
        if (value) {
            var isresult = !!value.toString().match(/^[1-9]\d{5}(?!\d)|(^(\/)$)/);
            return { result: isresult, type: "Error", errMsg: errMsg || "邮编输入不正确！" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    
    isValidInteger: function (id, ind, value, ruleEx, errMsg) {
        if (value) {
            var isresult = !!value.toString().match(/(^[-|+]?\d+$)|(^(\/)$)/);
            return { result: isresult, type: "Error", errMsg: errMsg || "值须为整数" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    isValidNumeric: function (id, ind, value, ruleEx, errMsg) {
        if (value) {

            var isresult = !!value.toString().match(/(^[-|+]?\d\d*[\.|,]\d*$)|(^[-|+]?\d\d*$)|(^[-|+]?[\.|,]\d\d*$)|(^(\/)$)/);
            return { result: isresult, type: "Error", errMsg: errMsg || "值须为数字" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    isValidAplhaNumeric: function (id, ind, value, ruleEx, errMsg) {
        if (value) {
            var isresult = !!value.toString().match(/^[_\-a-z0-9]+$|(^(\/)$)/gi);
            return { result: isresult, type: "Error", errMsg: errMsg || "值不符合数值规范" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    // 0000-00-00 00:00:00 to 9999-12-31 59:59:59 (no it is not a "valid DATE" function)
    isValidDatetime: function (id, ind, value, ruleEx, errMsg) {
        if (value && value.constructor != Date) {
            //  var dt = value.toString().match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);
            // var isresult = dt && !!(dt[1] <= 9999 && dt[2] <= 12 && dt[3] <= 31 && dt[4] <= 59 && dt[5] <= 59 && dt[6] <= 59) || false;
            /* update by zhenglingyun in 2015-04-17 15:55*/
            var dt = value.toString().match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})[:(\d{2})]{0,1}$/);
     
            var isresult =true;
            if (dt!=null&&dt.length == 6) {
                isresult = dt && !!(dt[1] <= 9999 && dt[2] <= 12 && dt[3] <= 31 && dt[4] <= 59 && dt[5] <= 59) || false;
            }
            else if (dt != null && dt.length == 7) {
                isresult = dt && !!(dt[1] <= 9999 && dt[2] <= 12 && dt[3] <= 31 && dt[4] <= 59 && dt[5] <= 59 && dt[6] <= 59) || false;
            }
            return { result: isresult, type: "Error", errMsg: errMsg || "值不符合时间规范" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    // 0000-00-00 to 9999-12-31
    isValidDate: function (id, ind, value, ruleEx, errMsg) {
        if (value && value.constructor != Date) {
            var d = value.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);
            var isresult = d && !!(d[1] <= 9999 && d[2] <= 12 && d[3] <= 31) || false;
            return { result: isresult, type: "Error", errMsg: errMsg || "值不符合日期规范" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },

    isValidYear: function (id, ind, value, ruleEx, errMsg) {
        if (value && value.constructor != Date) {
            var d = value.toString().replace("-", "").match(/^(\d{4})$/);
            var isresult = d && !!(d[1] <= 9999) || false;
            return { result: isresult, type: "Error", errMsg: errMsg || "值不符合年规范" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    // 0000-00-00 to 9999-12
    isValidYearMouth: function (id, ind, value, ruleEx, errMsg) {
        if (value && value.constructor != Date) {
            var d = value.toString().replace("-", "").match(/^(\d{4})(\d{2})$/);
            var isresult = d && !!(d[1] <= 9999 && d[2] <= 12) || false;
            return { result: isresult, type: "Error", errMsg: errMsg || "值不符合年月规范" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    // 00:00:00 to 59:59:59
    isValidTime: function (id, ind, value, ruleEx, errMsg) {
        if (value && value.constructor != Date) {
            var t = value.toString().match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
            var isresult = t && !!(t[1] <= 24 && t[2] <= 59 && t[3] <= 59) || false;
            return { result: isresult, type: "Error", errMsg: errMsg || "值不符合时间规范" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    // 0.0.0.0 to 255.255.255.255
    isValidIPv4: function (id, ind, value, ruleEx, errMsg) {
        if (value) {
            var ip = value.toString().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
            var isresult = ip && !!(ip[1] <= 255 && ip[2] <= 255 && ip[3] <= 255 && ip[4] <= 255) || false;
            return { result: isresult, type: "Error", errMsg: errMsg || "值不符合IP地址规范" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    isValidCurrency: function (id, ind, value, ruleEx, errMsg) { // Q: Should I consider those signs valid too ? : ¢|€|₤|₦|¥
        if (value) {
            var isresult = value.toString().match(/^\$?\s?\d+?([\.,\,]?\d+)?\s?\$?$/) && true || false;
            return { result: isresult, type: "Error", errMsg: errMsg || "isValidCurrency" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    // Social Security Number (999-99-9999 or 999999999)
    isValidSSN: function (id, ind, value, ruleEx, errMsg) {
        if (value) {
            var isresult = value.toString().match(/^\d{3}\-?\d{2}\-?\d{4}$/) && true || false;
            return { result: isresult, type: "Error", errMsg: errMsg || "值必须isValidSSN" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    // Social Insurance Number (999999999)
    isValidSIN: function (id, ind, value, ruleEx, errMsg) {
        if (value) {
            var isresult = value.toString().match(/^\d{9}$/) && true || false;
            return { result: isresult, type: "Error", errMsg: errMsg || "值必须isValidSIN" };
        }
        else {
            return { result: true, type: "Success", errMsg: "" };
        }
    },
    isValidLength: function (id, ind, value, ruleEx, errMsg) {
        ruleEx = ruleEx.split(",");
        if (!isNaN(+ruleEx[0]) && !isNaN(+ruleEx[1])) {
            if (value.length <= ruleEx[1] && value.length >= ruleEx[0]) {
                return { result: true, type: "Success", errMsg: "" };
            }
            else {
                return { result: false, type: "Error", errMsg: errMsg || "字符数须不少于 " + ruleEx[0] + " 个并且不多于" + ruleEx[1] + "个，当前共有字符 " + value.length + " 个" };
            }
        }
    },
    isValidLessLength: function (id, ind, value, ruleEx, errMsg) {
        if (!isNaN(+ruleEx)) {
            var length = +ruleEx;
            if (value.length <= length) {
                return { result: true, type: "Success", errMsg: "" };
            }
            else {
                return { result: false, type: "Error", errMsg: errMsg || "字符数须不多于 " + length + " 个，当前共有字符 " + value.length + " 个" };
            }
        }
    },
    isValidGreaterLength: function (id, ind, value, ruleEx, errMsg) {
		return { result: true, type: "Success", errMsg: "" };
        if (!isNaN(+ruleEx)) {
            var length = +ruleEx;
            if (value.length >= length) {
                return { result: true, type: "Success", errMsg: "" };
            }
            else {
                return { result: false, type: "Error", errMsg: errMsg || "字符数须不少于" + length + " 个，当前共有字符 " + value.length + " 个" };
            }
        }
    },
    isValidRegExp: function (id, ind, value, ruleEx, errMsg) {
        if (ruleEx && ruleEx.length > 0) {
            ruleEx = ruleEx._dhx_trim();
            var regExp;
            if (ruleEx.indexOf("/") === 0) {
                regExp = eval(ruleEx);
            }
            else {
                regExp = new RegExp(ruleEx);
            }
            
            var res = regExp.test(value);
            var ress = { result: res, type: (res ? "Success" : "Error"), errMsg: errMsg || (res ? "" : "数据格式不正确") };
            return ress;
        }
        return { result: false, type: "Error", errMsg: "正则表达式不存在！" }
    },
    /*数字校验： 大于等于指定值*/
    isValidMoreThan: function (id, ind, value, ruleEx, errMsg) {
        var res = false;
        if (ruleEx && ruleEx.length > 0) {
            if (isNaN(ruleEx)) {
                res = true;
            } else if (!isNaN(value)) {
                if (+value >= +ruleEx) {
                    res = true;
                }
            }
            var ress = { result: res, type: (res ? "Success" : "Error"), errMsg: errMsg || (res ? "" : "值应大于等于 " + ruleEx) };
            return ress;
        }
    },
    /*数字校验： 小于等于指定值*/
    isValidLessThan: function (id, ind, value, ruleEx, errMsg) {
        var res = false;
        if (ruleEx && ruleEx.length > 0) {
            if (isNaN(ruleEx)) {
                res = true;
            } else if (!isNaN(value)) {
                if (+value <= +ruleEx) {
                    res = true;
                }
            }
            var ress = { result: res, type: (res ? "Success" : "Error"), errMsg: errMsg || (res ? "" : "值应小于等于 " + ruleEx) };
            return ress;
        }
    },
    /*数字校验： 小数位数*/
    isValidDecimal: function (id, ind, value, ruleEx, errMsg) {
        var res = false;
        if (ruleEx && ruleEx.length > 0) {
            var arr = value.split(".");
            if (arr.length == 2) {
                if (value.split(".")[1].length <= +ruleEx) {
                    res = true;
                }
            } else if (arr.length == 1) {
                res = true;
            }
            var ress = { result: res, type: (res ? "Success" : "Error"), errMsg: errMsg || (res ? "" : "小数位最多精确到第 " + ruleEx + " 位") };
            return ress;
        }
    }

};
dhtmlxValidation = new dhtmlxValidation();
//extension for the grid
dhtmlXGridObject.prototype.enableValidation = function (mode, live) {
    mode = convertStringToBoolean(mode);
    if (mode) {
        this._validators = { data: [] };
    } else
        this._validators = false;

    if (arguments.length > 1)
        this._validators._live = live;
    if (!this._validators._event)
        this._validators._event = this.attachEvent("onEditCell", this.validationEvent);

};
dhtmlXGridObject.prototype.setColValidators = function (vals) {
    if (this.isRowNumber) {
        if (vals instanceof Array) {
            vals.splice(0, 0, "");
        }
        if (typeof vals == "string") {
            vals = "," + vals
        }
    }
    if (!this._validators) this.enableValidation(true);
    if (typeof vals == "string") vals = vals.split(this.delim);
    this._validators.data = vals;
};
dhtmlXGridObject.prototype.validationEvent = function (stage, id, ind, newval, oldval) {

    var v = this._validators;
    if (!v) return true; // validators disabled
    var rule = (v.data[ind] || this.cells(id, ind).getAttribute("validate")) || "";

    if (stage == 1 && rule) {
        var ed = this.editor || (this._fake || {}).editor;
        if (!ed) return true; //event was trigered by checkbox
        ed.cell.className = ed.cell.className.replace(/[ ]*dhtmlx_validation_error/g, "");

        //mafei 20150127 numeric only input numeric
        if (rule && (rule.toLowerCase() == "validnumeric")) {
            var cell_keypressLimit = function (ob) {
                if (typeof (window.addEventListener) == "function") {
                    ed.obj.addEventListener("keyup", function () {
                        ob.t_value = ob.t_value || "";
                        if (!ob.value.match(/^[\+\-]?\d*?\.?\d*?$/)) ob.value = ob.t_value;
                        else ob.t_value = ob.value;
                        if (ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) ob.o_value = ob.value;

                    }, false);
                } else {
                    ed.obj.attachEvent("onkeyup", function () {
                        ob.t_value = ob.t_value || "";
                        if (!ob.value.match(/^[\+\-]?\d*?\.?\d*?$/)) ob.value = ob.t_value;
                        else ob.t_value = ob.value;
                        if (ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) ob.o_value = ob.value;
                    })
                }

            }
            if (ed.obj && !ed.obj._keypressLimit) {

                ed.obj._keypressLimit = cell_keypressLimit;
                cell_keypressLimit(ed.obj);
            }

        }

        if (v._live) {
            var grid = this;
            dhtmlxValidation.trackInput(ed.getInput(), rule, function (element, value, rule) {
                return grid.callEvent("onLiveValidationError", [id, ind, value, element, rule]);
            }, function (element, value, rule) {
                return grid.callEvent("onLiveValidationCorrect", [id, ind, value, element, rule]);
            });
        }
    }

    if (stage == 2)
        this.validateCell(id, ind, rule, newval);

    return true;
};

dhtmlXGridObject.prototype.validateCell = function (id, ind, rule, value, ruleEx, errMsgs) {
    rule = rule || (this._validators.data[ind] || this.cells(id, ind).getAttribute("validate"));
    value = value || this.cells(id, ind).getValue();
    if (!rule) return;
    var cell = this.cells(id, ind).cell;
    var result = dhtmlxValidation.checkValue(id, ind, value, rule, ruleEx, errMsgs);

    if (result.result) {
        this.callEvent("onValidationCorrect", [id, ind, value]);
        cell.className = cell.className.replace(/[ ]*dhtmlx_validation_error1/g, "");
    }
    else {
        if (this.callEvent("onValidationError", [id, ind, value, result, rule])) {
            cell.className += " dhtmlx_validation_error1";
        }
    }
    return result;
};