/*
filename：dhtmlxgrid_excell_hwapprove.js
creater：刘志伟
date created：2016.11.19
description：审批组件
date modified：2018.03.12
modifier：刘志伟
version：2.2.15.1129
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/
/*初始化加载*/
function eXcell_vmdapprove(cell) {
    var that = this;
    if (cell) {
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
        this.hwReport = this.grid.hwReport;

        if (!cell._approve) {
            cell._approve = that.grid._approve_render(cell);
        }

        this.hwReport.approveCells = this.hwReport.approveCells || {};
        this.hwReport.approveCells[cell.parentNode.idd + "_" + cell._cellIndex] = cell;
        if (!this.hwReport.approve_onReportRendered_id) {
            this.hwReport.approve_onReportRendered_id = this.hwReport.attachEvent("onRendered", function () {
                if (!that.hwReport.isEmpty(that.hwReport.approveCells)) {
                    for (var item in that.hwReport.approveCells) {
                        var td = that.hwReport.approveCells[item];
                        td._approve.doLayout();
                        if (td._disabled) {
                            td._approve.setDisabled();
                        }
                    }
                }
            })
        }
    }

    this.edit = function () {
        this.cell.className = this.cell.className.replace(/editable/g, " ");
    }

    this.detach = function () {
        this.grid.editor = null;
    }

    /*设置值*/
    this.setValue = function (val) {
    }

    this.setDisabled = function () {
        this.cell._disabled = true;
        this.cell._approve.setDisabled();
    }

    this.getValue = function (key) {
        return this.cell._approve.getValue(key);
    }

    this.updateValue = function () {
        this.cell._approve.updateValue();
    }
}
eXcell_vmdapprove.prototype = new eXcell;

dhtmlXGridObject.prototype._approve_render = function (cell) {
    if (cell._d) {
        cell._d.parentNode.removeChild(cell._d);
    }
    var that = this;
    var d = document.createElement("DIV");
    d.style.cssText = "position:relative;overflow:hidden;";
    d.className = "dhx_approve ";
    cell.innerHTML = "";
    cell.className += " " + this.hwReport.reportId + "-p-0";
    cell._d = d;
    cell.appendChild(d);

    var oCell = this.hwReport.getOriginCellById(cell._attrs.sid);
    var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);

    var approve = new dhtmlXApprove(this.hwReport, cell, cellType.items);
    approve.render();
    approve.attachEvent("onApproval", function () {
        var values = approve.getAllValue();

        that.callEvent("onCellChanged", [
					cell.parentNode.idd,
					cell._cellIndex,
					values
        ]);
        
        that.callEvent("onEditCell", [
					2,
					cell.parentNode.idd,
					cell._cellIndex,
					values,
					approve.oldValues
        ]);

        var params = [];
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                params.push({key: key, value: values[key]});
            }
        }
        params = params.map(function (v) {return v.key + "=" + v.value });
        that.hwReport.callEvent("onApproval", [that, cell.parentNode.idd, cell._cellIndex, approve.result, values]);

        var ApproveAgreeClickName = "myApproveAgree";
        if (this.ApproveAgreeClickName) {
            ApproveAgreeClickName = this.ApproveAgreeClickName;
        }
        if (Ext.isFunction(window[ApproveAgreeClickName])) {
            window[ApproveAgreeClickName](params.join("&"));
        }
        if (Ext.isFunction(window[this.hwReport.reportId + "_myApproveAgree"])) {
            window[this.hwReport.reportId + "_myApproveAgree"](params.join("&"));
        }
    })

    approve.attachEvent("onValueCalculated", function () {
        //含有数据集的表达式运算完成，通知修改入库数据集中的旧值
        that.callEvent("onValueCalculated", [
            cell.parentNode.idd,
            cell._cellIndex,
            approve.getAllValue()
        ]);
    })
    
    return approve;
}

function dhtmlXApprove(hwReport, cell, opt) {
    this.cell = cell;
    this.oldValues = {
        department: "",
        opinions: "",
        seal: "",
        person: "",
        date: "",
        result: ""
    };
    
    this.defaultOptions = {
        padding: 10,
        personMaxHeight: 25, //审批人最大默认高度
        sealMaxHeight: 120,//审批章最大默认高度
        buttonWidth: 60,
        buttonHeight: 25,
        buttonPadding: 20,
        dateInputWidth: 80,
        dateInputHeight: 25
    }
    window.dhx4._eventable(this);
    this.hwReport = hwReport;
    this.options = opt;
    this._items = {};

    if (typeof (cell._d) == "string") {
        this.container = document.getElementById(cell._d);
    } else {
        this.container = cell._d;
    }

    this.render = function () {
        var that = this;
        //处理审批结果
        this.result = "";
        this.bindQueryStore = {}; //审批组件用到的数据集
        var agreeOptions = this.findOptions("Agree");
        var disAgreeOptions = this.findOptions("DisAgree");
        var senBackOptions = this.findOptions("SenBack");

        var resultValue = dhx.trim(agreeOptions.value || disAgreeOptions.value || senBackOptions.value || "");
        if (resultValue.indexOf("=") == 0) {
            this.cansetDisabled = false;
            resultValue = this.hwReport.getValue(resultValue.replace("=", ""));
        }
        this.result = resultValue;
        this.oldValues.result = resultValue;

        this.initDepartment();
        this.initComment();
        this.initDate();
        this.initAgreeButton();
        this.initDisAgreeButton();
        this.initSenBackButton();
        this.initPerson();
        this.initSeal();

        if (this.result) {
            this.setComplete();
        }
    }

    //审批部门
    this.initDepartment = function () {
        var options = this.findOptions("ApprovalDepartment");
        if (options == null || options.isshow == '0') {
            return;
        }

        var departmentDiv = this._items["department"] = document.createElement("div");
        departmentDiv.style = this.getFontStyle(options) +
            ";position:absolute;text-align:left";

        var labelvalue = dhx.trim(options.labelvalue || "");
        if (labelvalue.indexOf("=") == 0) {
            labelvalue = this.hwReport.getValue(labelvalue.replace("=", ""));
        }
        var value = dhx.trim(options.value || "");
        if (value.indexOf("=") == 0) {
            value = this.hwReport.getValue(value.replace("=", ""));
        }
        this.oldValues.department = value;
        departmentDiv.innerHTML = "<span>" + labelvalue + "</span>" + "<span>" + value + "</span>";
        this.container.appendChild(departmentDiv);
    }

    //审批意见
    this.initComment = function () {
        var options = this.findOptions("ApprovalComment");
        if (options == null || options.isshow == '0') {
            return;
        }
        
        var commentDiv = this._items["comment"] = document.createElement("div");
        commentDiv.style = this.getFontStyle(options) +
            ";position:absolute;text-align:left";

        var labelvalue = dhx.trim(options.labelvalue || "");
        if (labelvalue.indexOf("=") == 0) {
            labelvalue = this.hwReport.getValue(labelvalue.replace("=", ""));
        }
        var value = dhx.trim(options.value || "");
        if (value.indexOf("=") == 0) {
            value = this.hwReport.getValue(value.replace("=", ""));
        }
        this.oldValues.opinions = value;
        commentDiv.innerHTML = "<span style='position: relative;line-height:1;vertical-align:top;top: 3px'>" + labelvalue + "</span>" + "<textarea  class='approve_options' style='" + this.getFontStyle(options) + "'>" + value + "</textarea>";
        this.container.appendChild(commentDiv);
    }

    //审批章
    this.initSeal = function () {
        var that = this;
        var options = this.findOptions("ApprovalSeal"); //审批章
        var sealDiv = this._items["seal"] = document.createElement("div");
        sealDiv.style = this.getFontStyle(options) + ";position:absolute;text-align:left;";
        var labelvalue = dhx.trim(options.labelvalue || "");
        if (labelvalue.indexOf("=") == 0) {
            labelvalue = this.hwReport.getValue(labelvalue.replace("=", ""));
        }

        sealDiv.innerHTML = "<span style='display: inline-block;vertical-align: middle'>" + labelvalue + "</span>";
        
        if(options.src){
            var imgSrc = dhx.trim(options.src || "");
            if (imgSrc.indexOf("=") == 0) {
                imgSrc = this.hwReport.getValue(imgSrc.replace("=", ""));
            }

            var image = sealDiv. _image = new Image();
            image.onload = function () {
                that.doLayout();
            };
            image.src = imgSrc;
            this.oldValues.seal = imgSrc;
            image.style = "display: inline-block;vertical-align: middle;";
            //如果没有审批，签章和签名不显示,审批完成后显示
            if (!this.result) {
                image.style.visibility = "hidden";
            }
            sealDiv.appendChild(image);

        }
        this.container.appendChild(sealDiv);
    };

    //审批人
    this.initPerson = function () {
        var that = this;
        var options = this.findOptions("ApprovalPerson");//审批人
        var personDiv = this._items["person"] = document.createElement("div");
        personDiv.style = this.getFontStyle(options) + ";position:absolute;text-align:left;";

        var labelvalue = dhx.trim(options.labelvalue || "");
        if (labelvalue.indexOf("=") == 0) {
            labelvalue = this.hwReport.getValue(labelvalue.replace("=", ""));
        }

        var value = dhx.trim(options.value || "");
        if (value.indexOf("=") == 0) {
            value = this.hwReport.getValue(value.replace("=", ""));
        }

        this.oldValues.person = value;
        personDiv.innerHTML = "<span style='display: inline-block;vertical-align: middle'>" + labelvalue + "</span>" + "<span style='display: inline-block;vertical-align: middle'>" + value + "</span>";

        //有签名图片时
        if (options.namepicture) {
            var imgSrc = dhx.trim(options.namepicture || "");
            if (imgSrc.indexOf("=") == 0) {
                imgSrc = this.hwReport.getValue(imgSrc.replace("=", ""));
            }

            var image = personDiv._image = new Image();
            image.onload = function () {
                that.doLayout();
            };
            image.src = imgSrc;
            image.style = "display: inline-block;vertical-align: middle;";
            //如果没有审批，签章和签名不显示,审批完成后显示
            if (!this.result) {
                image.style.visibility = "hidden";
            }
            personDiv.appendChild(image);
        }
        this.container.appendChild(personDiv);
    };

    /*审批日期*/
    this.initDate = function () {
        var options = this.findOptions("ApprovalDate");
        if (options == null || options.isshow == '0') {
            return;
        }
        
        var dateDiv = this._items["date"] = document.createElement("div");
        dateDiv.style = this.getFontStyle(options) + ";position:absolute;text-align:left;z-index:1;";

        var labelvalue = dhx.trim(options.labelvalue || "");
        if (labelvalue.indexOf("=") == 0) {
            labelvalue = this.hwReport.getValue(labelvalue.replace("=", ""));
        }
        var value = dhx.trim(options.value || "");
        if (value.indexOf("=") == 0) {
            value = this.hwReport.getValue(value.replace("=", ""));
        }
        var dateformat = this.getFormat(options.dateformat || "%Y-%m-%d");

        dateDiv.innerHTML = "<span style='display: inline-block;vertical-align: middle;'>" + labelvalue + "</span>" +
            "<input class='approve_date' unselectable=on style='" + this.getFontStyle(options) + "'>";

        this._laydate = laydate.render({
            elem: dateDiv.children[1], //指定元素
            format: dateformat,
            type: this.getType(dateformat),
            done: function (val, date) {
                //that.setValue(val);
            }
        }).laydate;

        value = this._laydate.parse(0, this.strToDateJSON(value));
        dateDiv.children[1].value = value;

        this.oldValues.date = value;
        this.container.appendChild(dateDiv);
    }

    //同意
    this.initAgreeButton = function () {
        var that = this;
        var options = this.findOptions("Agree");
        
        //如果有审批结果，那么审批组件已经进行了审批，所以按钮不显示
        if (options == null || options.isshow == '0' || this.result) {
            return;
        }

        var btn = this._items["agree_button"] = document.createElement("input");
        btn.type = "button";
        btn.className = "approve_btn approve_agree";
        btn.style = this.getFontStyle(options) +
            ";position:absolute;" +
            ";width:" + ((options.width && !isNaN(options.width)) ? options.width : this.defaultOptions.buttonWidth) + "px" +
           ";height:" + ((options.height && !isNaN(options.height)) ? options.height : this.defaultOptions.buttonHeight) + "px";

        btn.value = options.labelvalue || "";
        btn.onclick = function () {
            that.result = 1;
            that.setComplete();
            that.callEvent("onApproval", []);
        }
        this.container.appendChild(btn);
    }

    //不同意
    this.initDisAgreeButton = function () {
        var that = this;
        var options = this.findOptions("DisAgree");

        //如果有审批结果，那么审批组件已经进行了审批，所以按钮不显示
        if (options == null || options.isshow == '0' || this.result) {
            return;
        }

        var btn = this._items["disagree_button"] = document.createElement("input");
        btn.type = "button";
        btn.className = "approve_btn approve_disagree";
        btn.style = this.getFontStyle(options) +
            ";position:absolute;" +
            ";width:" + ((options.width && !isNaN(options.width)) ? options.width : this.defaultOptions.buttonWidth) + "px" +
           ";height:" + ((options.height && !isNaN(options.height)) ? options.height : this.defaultOptions.buttonHeight) + "px";

        btn.value = options.labelvalue || "";
        btn.onclick = function () {
            that.result = 2;
            that.setComplete();
            that.callEvent("onApproval", []);
        }
        this.container.appendChild(btn);
    }

    //退回
    this.initSenBackButton = function () {
        var that = this;
        var options = this.findOptions("SenBack");

        //如果有审批结果，那么审批组件已经进行了审批，所以按钮不显示
        if (options == null || options.isshow == '0' || this.result) {
            return;
        }

        var btn = this._items["senback_button"] = document.createElement("input");
        btn.type = "button";
        btn.className = "approve_btn approve_back";
        btn.style = this.getFontStyle(options) +
            ";position:absolute;" +
            ";width:" + ((options.width && !isNaN(options.width)) ? options.width : this.defaultOptions.buttonWidth) + "px" +
           ";height:" + ((options.height && !isNaN(options.height)) ? options.height : this.defaultOptions.buttonHeight) + "px";

        btn.value = options.labelvalue || "";
        btn.onclick = function () {
            that.result = 3;
            that.setComplete();
            that.callEvent("onApproval", []);
        }
        this.container.appendChild(btn);
    }

    this.doLayout = function () {
        this.container.style.width = this.container.parentNode.clientWidth + "px";
        this.container.style.height = this.container.parentNode.clientHeight + "px";

        var departmentOptions = this.findOptions("ApprovalDepartment"); //审批部门
        var commentOptions = this.findOptions("ApprovalComment"); //审批意见
        var sealOptions = this.findOptions("ApprovalSeal"); //审批章
        var personOptions = this.findOptions("ApprovalPerson");//审批人
        var dateOptions = this.findOptions("ApprovalDate"); //审批日期
        var agreeOptions = this.findOptions("Agree");
        var disAgreeOptions = this.findOptions("DisAgree");
        var senBackOptions = this.findOptions("SenBack");
        
        var departmentDiv = this._items["department"];
        var commentDiv = this._items["comment"];
        var sealDiv = this._items["seal"];
        var personDiv = this._items["person"];

        var agree_button = this._items["agree_button"];
        var disagree_button = this._items["disagree_button"];
        var senback_button = this._items["senback_button"];
        var date = this._items["date"];

        //调整审批部门的位置和大小
        var departmentDivLeft = 0;
        var departmentDivTop = 0;
        if (departmentDiv) {
            departmentDivLeft = this.defaultOptions.padding
                    + ((!departmentOptions.x || isNaN(departmentOptions.x)) ? 0 : parseInt(departmentOptions.x));
            departmentDivTop = this.defaultOptions.padding
                    + ((!departmentOptions.y || isNaN(departmentOptions.y)) ? 0 : parseInt(departmentOptions.y));
            departmentDiv.style.left = departmentDivLeft + "px";
            departmentDiv.style.top = departmentDivTop + "px";
        }

        //调整按钮和日期的大小和位置
        //如果日期的宽度和高度未定义，默认高25px
        var dateDivLeft = 0;
        var dateDivTop = 0;
        if (date) {
            var dateInputWidth = (!dateOptions.width || isNaN(dateOptions.width) || parseInt(dateOptions.width) == 0)
                ? this.defaultOptions.dateInputWidth
                : parseInt(dateOptions.width);
                //: ((parseInt(dateOptions.width) - date.children[0].offsetWidth));
            var dateDivWidth = (!dateOptions.width || isNaN(dateOptions.width) || parseInt(dateOptions.width) == 0)
                ? (this.defaultOptions.dateInputWidth + date.children[0].offsetWidth) 
                : parseInt(dateOptions.width);
            var dateDivHeight = (!dateOptions.height || isNaN(dateOptions.height) || parseInt(dateOptions.height) == 0)
                ? this.defaultOptions.dateInputHeight
                : parseInt(dateOptions.height);
            date.children[1].style.height = dateDivHeight + "px";
            date.children[1].style.width = dateInputWidth + "px";

            dateDivLeft = this.container.clientWidth 
                - dateDivWidth 
                - this.defaultOptions.padding 
                + (!dateOptions.x || (isNaN(dateOptions.x)) ? 0 : parseInt(dateOptions.x));
            dateDivTop = this.container.clientHeight 
                - dateDivHeight 
                - this.defaultOptions.padding 
                + (!dateOptions.y || (isNaN(dateOptions.y)) ? 0 : parseInt(dateOptions.y));
            date.style.left = dateDivLeft + "px";
            date.style.top = dateDivTop + "px";
        }

        //调整审批人高度和位置
        var personDivLeft = 0;
        var personDivTop = 0;
        if (personDiv) {
            if (personDiv.children[2]) {
                var personWidth = (!personOptions.width || isNaN(personOptions.width) || parseInt(personOptions.width) == 0)
                    ? 0
                    : parseInt(personOptions.width);
                var personHeight = (!personOptions.height || isNaN(personOptions.height) || parseInt(personOptions.height) == 0)
                    ? 0
                    : parseInt(personOptions.height);
                if (personWidth) {
                    personDiv.children[2].style.width = personWidth + "px";
                }
                if (personHeight) {
                    personDiv.children[2].style.height = personHeight + "px";
                }
                if (!personWidth && !personHeight) {
                    personHeight = this.defaultOptions.personMaxHeight;
                    personDiv.children[2].style.height = this.defaultOptions.personMaxHeight + "px";
                }

                personDivLeft = this.container.clientWidth
                    - (personDiv.children[0].clientWidth + personDiv.children[1].clientWidth + personDiv.children[2].clientWidth)
                    - this.defaultOptions.padding
                    + (!personOptions.x || (isNaN(personOptions.x)) ? 0 : parseInt(personOptions.x));
                personDivTop = (dateDivTop || this.container.clientHeight)
                    - Math.max(personHeight, personDiv.children[2].clientHeight)
                    //- this.defaultOptions.padding
                    + (!personOptions.y || (isNaN(personOptions.y)) ? 0 : parseInt(personOptions.y));
            }
            else {
                personDivLeft = this.container.clientWidth
                    - (personDiv.children[0].clientWidth + personDiv.children[1].clientWidth)
                    - this.defaultOptions.padding
                    + (!personOptions.x || (isNaN(personOptions.x)) ? 0 : parseInt(personOptions.x));
                personDivTop = (dateDivTop || this.container.clientHeight)
                    - Math.max(personDiv.children[0].clientHeight, personDiv.children[1].clientHeight)
                    //- this.defaultOptions.padding
                    + (!personOptions.y || (isNaN(personOptions.y)) ? 0 : parseInt(personOptions.y));
            }
            personDiv.style.left = personDivLeft + "px";
            personDiv.style.top = personDivTop + "px";
        }

        //personMaxHeight
        //调整审批章大小和位置
        var sealDivLeft = 0;
        var sealDivTop = 0;
        if (sealDiv) {
            if (sealDiv.children[1]) {
                var sealWidth = (!sealOptions.width || isNaN(sealOptions.width) || parseInt(sealOptions.width) == 0)
                    ? 0
                    : parseInt(sealOptions.width);
                var sealHeight = (!sealOptions.height || isNaN(sealOptions.height) || parseInt(sealOptions.height) == 0)
                    ? 0
                    : parseInt(sealOptions.height);

                if (sealWidth) {
                    sealDiv.children[1].style.width = sealWidth + "px";
                }
                if (sealHeight) {
                    sealDiv.children[1].style.height = sealHeight + "px";
                }
                if (!sealHeight && !sealHeight) {
                    sealHeight = this.defaultOptions.sealMaxHeight;
                    sealDiv.children[1].style.height = sealHeight + "px";
                }

                sealDivLeft = this.container.clientWidth
                    - (sealDiv.children[0].clientWidth + sealDiv.children[1].clientWidth)
                    - this.defaultOptions.padding
                    + (!sealOptions.x || (isNaN(sealOptions.x)) ? 0 : parseInt(sealOptions.x));
                sealDivTop = (this.container.clientHeight)
                    - Math.max(sealHeight, sealDiv.children[0].clientHeight)
                    - this.defaultOptions.padding
                    + (!sealOptions.y || (isNaN(sealOptions.y)) ? 0 : parseInt(sealOptions.y));
            }
            else {
                sealDivLeft = this.container.clientWidth
                    - (sealDiv.children[0].clientWidth)
                    - this.defaultOptions.padding
                    + (!sealOptions.x || (isNaN(sealOptions.x)) ? 0 : parseInt(sealOptions.x));
                sealDivTop = (this.container.clientHeight)
                    - sealDiv.children[0].clientHeight
                    - this.defaultOptions.padding
                    + (!sealOptions.y || (isNaN(sealOptions.y)) ? 0 : parseInt(sealOptions.y));
            }
            sealDiv.style.left = sealDivLeft + "px";
            sealDiv.style.top = sealDivTop + "px";
        }

        //调整按钮位置
        var agree_button_left = 0;
        var agree_button_top = 0;
        if (agree_button) {
            agree_button_left = this.defaultOptions.padding
                + (!agreeOptions.x || (isNaN(agreeOptions.x)) ? 0 : parseInt(agreeOptions.x));
            agree_button_top = this.container.clientHeight - agree_button.offsetHeight
                - this.defaultOptions.padding
                + (!agreeOptions.y || (isNaN(agreeOptions.y)) ? 0 : parseInt(agreeOptions.y));
            agree_button.style.left = agree_button_left + "px";
            agree_button.style.top = agree_button_top + "px";
        }
        
        var disagree_button_left = 0;
        var disagree_button_top = 0;
        if (disagree_button) {
            disagree_button_left = agree_button_left
                + (agree_button ? agree_button.offsetWidth : 0)
                + (agree_button ? this.defaultOptions.buttonPadding : this.defaultOptions.padding)
                + (!disAgreeOptions.x || (isNaN(disAgreeOptions.x)) ? 0 : parseInt(disAgreeOptions.x));
            disagree_button_top = this.container.clientHeight
                - disagree_button.offsetHeight
                - this.defaultOptions.padding
                + (!disAgreeOptions.y || (isNaN(disAgreeOptions.y)) ? 0 : parseInt(disAgreeOptions.y));
            disagree_button.style.left = disagree_button_left + "px";
            disagree_button.style.top = disagree_button_top + "px";
        }
        
        var senback_button_left = 0;
        var senback_button_top = 0;
        if (senback_button) {
            senback_button_left = disagree_button_left
                + (disagree_button ? disagree_button.offsetWidth : 0)
                + ((agree_button || disagree_button) ? this.defaultOptions.buttonPadding : this.defaultOptions.padding)
                + (!senBackOptions.x || (isNaN(senBackOptions.x)) ? 0 : parseInt(senBackOptions.x));
            senback_button_top = this.container.clientHeight
                - disagree_button.offsetHeight
                - this.defaultOptions.padding
                + (!senBackOptions.y || (isNaN(senBackOptions.y)) ? 0 : parseInt(senBackOptions.y));
            senback_button.style.left = senback_button_left + "px";
            senback_button.style.top = senback_button_top + "px";
        }

        //调整审批意见的位置和大小
        var commentDivLeft = 0;
        var commentDivTop = 0;
        var ajustBaseBottom = [dateDivTop, personDivTop, agree_button_top, disagree_button_top, senback_button_top].filter(function (v) {return v > 0 });//调整底部时基于的组件顶部位置数组

        if (commentDiv) {
            commentDivLeft = this.defaultOptions.padding
                    + (!commentOptions.x || (isNaN(commentOptions.x)) ? 0 : parseInt(commentOptions.x));
            commentDivTop = departmentDivTop + (departmentDiv ? departmentDiv.clientHeight : 0)+ this.defaultOptions.padding
                    + (!commentOptions.y || (isNaN(commentOptions.y)) ? 0 : parseInt(commentOptions.y));

            //调整大小
            var commentDivWidth = (!commentOptions.width || isNaN(commentOptions.width) || parseInt(commentOptions.width) == 0)
                ? (this.container.clientWidth - this.defaultOptions.padding * 2 - commentDiv.children[0].offsetWidth)
                : parseInt(commentOptions.width)
                //: (parseInt(commentOptions.width) - commentDiv.children[0].offsetWidth);
            var commentDivHeight = (!commentOptions.height || isNaN(commentOptions.height) || parseInt(commentOptions.height) == 0)
                ? (Math.min.apply(null, ajustBaseBottom) - this.defaultOptions.padding - commentDivTop)
                : parseInt(commentOptions.height)

            commentDiv.style.left = commentDivLeft + "px";
            commentDiv.style.top = commentDivTop + "px";
            commentDiv.children[1].style.width = (commentDivWidth - 6) + "px";
            commentDiv.children[1].style.height = (commentDivHeight - 6) + "px";
        }
    };

    //禁用
    this.setDisabled = function () {
        //无权限：只显示单位和空白日期
        if (this.cansetDisabled == false || this.result) {
            return;
        }
        
        var departmentDiv = this._items["department"];
        var commentDiv = this._items["comment"];
        var sealDiv = this._items["seal"];
        var personDiv = this._items["person"];
        var agree_button = this._items["agree_button"];
        var disagree_button = this._items["disagree_button"];
        var senback_button = this._items["senback_button"];
        var date = this._items["date"];

        if (commentDiv) {
            commentDiv.style.display = "none";
        }
        if (sealDiv) {
            sealDiv.style.display = "none";
        }
        if (personDiv) {
            personDiv.style.display = "none";
        }
        if (agree_button) {
            agree_button.style.display = "none";
        }
        if (disagree_button) {
            disagree_button.style.display = "none";
        }
        if (senback_button) {
            senback_button.style.display = "none";
        }
        if (date) {
            date.children[0].innerHTML = "年    月    日（公章）";
            date.children[1].style.display = "none";
        }
    }

    //审批完成
    this.setComplete = function () {
        var departmentDiv = this._items["department"];
        var commentDiv = this._items["comment"];
        var sealDiv = this._items["seal"];
        var personDiv = this._items["person"];
        var agree_button = this._items["agree_button"];
        var disagree_button = this._items["disagree_button"];
        var senback_button = this._items["senback_button"];
        var date = this._items["date"];

        if (commentDiv) {
            commentDiv.children[1].setAttribute("readonly", "readonly");
            commentDiv.children[1].setAttribute("disabled", "disabled");
            commentDiv.children[1].style.border = "0px"; //去除外边框
            commentDiv.children[1].style.backgroundColor = "transparent";
            commentDiv.children[1].style.cursor = "default";
            commentDiv.children[1].style.overflow = "auto";
        }

        if (sealDiv && sealDiv.children[1]) {
            sealDiv.children[1].style.visibility = "";
        }

        if (personDiv && personDiv.children[2]) {
            personDiv.children[2].style.visibility = "";
        }

        if (date) {
            date.style.zIndex = "";
            date.children[1].setAttribute("disabled", "disabled");
            date.children[1].style.backgroundColor = "transparent";
            date.children[1].style.cursor = "default";
            date.children[1].style.borderWidth = "0px";
        }
        
        if (agree_button) {
            agree_button.style.display = "none"
        }
        if (disagree_button) {
            disagree_button.style.display = "none"
        }
        if (senback_button) {
            senback_button.style.display = "none"
        }
    }

    this.updateValue = function () {
        var that = this;
        var departmentDiv = this._items["department"];
        var commentDiv = this._items["comment"];
        var sealDiv = this._items["seal"];
        var personDiv = this._items["person"];
        var date = this._items["date"];

        var departmentOptions = this.findOptions("ApprovalDepartment"); //审批部门
        var commentOptions = this.findOptions("ApprovalComment"); //审批意见
        var sealOptions = this.findOptions("ApprovalSeal"); //审批章
        var personOptions = this.findOptions("ApprovalPerson");//审批人
        var dateOptions = this.findOptions("ApprovalDate"); //审批日期
        var agreeOptions = this.findOptions("Agree");
        var disAgreeOptions = this.findOptions("DisAgree");
        var senBackOptions = this.findOptions("SenBack");

        //审批部门
        if (departmentDiv) {
            var labelvalue = dhx.trim(departmentOptions.labelvalue || "").replace("=", "");
            if (this.hwReport.checkParamType(labelvalue) == "ds") {
                departmentDiv.children[0].innerHTML = this.hwReport.getValue(labelvalue);
            }
            var value = dhx.trim(departmentOptions.value || "").replace("=", "");
            if (this.hwReport.checkParamType(value) == "ds") {
                value = this.hwReport.getValue(value);
                value = this._laydate.parse(0, this.strToDateJSON(value));
                this.oldValues.department = value;
                departmentDiv.children[1].innerHTML = value;
                //数据集表达式运算完成
                that.callEvent("onValueCalculated", []);
            }
        }
        
        //审批意见
        if (commentDiv) {
            var labelvalue = dhx.trim(commentOptions.labelvalue || "").replace("=", "");
            if (this.hwReport.checkParamType(labelvalue) == "ds") {
                commentDiv.children[0].innerHTML = this.hwReport.getValue(labelvalue);
            }
            var value = dhx.trim(commentOptions.value || "").replace("=", "");
            if (this.hwReport.checkParamType(value) == "ds") {
                value = this.hwReport.getValue(value);
                this.oldValues.opinions = value;
                commentDiv.children[1].value = value;
                //数据集表达式运算完成
                that.callEvent("onValueCalculated", []);
            }
        }
        
        //审批章
        if (sealDiv) {
            var labelvalue = dhx.trim(sealOptions.labelvalue || "").replace("=", "");
            if (this.hwReport.checkParamType(labelvalue) == "ds") {
                sealDiv.children[0].innerHTML = this.hwReport.getValue(labelvalue);
            }
            var src = dhx.trim(sealOptions.src || "").replace("=", "");
            if (this.hwReport.checkParamType(src) == "ds") {
                src = this.hwReport.getValue(src);
                this.oldValues.seal = src;
                sealDiv._image.src = src;
                //数据集表达式运算完成
                that.callEvent("onValueCalculated", []);
            }
        }

        //审批人
        if (personDiv) {
            var labelvalue = dhx.trim(personOptions.labelvalue || "").replace("=", "");
            if (this.hwReport.checkParamType(labelvalue) == "ds") {
                personDiv.children[0].innerHTML = this.hwReport.getValue(labelvalue);
            }
            var value = dhx.trim(personOptions.value || "").replace("=", "");
            if (this.hwReport.checkParamType(value) == "ds") {
                value = this.hwReport.getValue(value);
                this.oldValues.person = value;
                personDiv.children[1].innerHTML = value;
                //数据集表达式运算完成
                that.callEvent("onValueCalculated", []);
            }
            var namepicture = dhx.trim(personOptions.namepicture || "").replace("=", "");
            if (this.hwReport.checkParamType(namepicture) == "ds") {
                namepicture = this.hwReport.getValue(namepicture);
                this.oldValues.person = namepicture;
                personDiv._image.src = namepicture;
                //数据集表达式运算完成
                that.callEvent("onValueCalculated", []);
            }
        }
        
        //审批日期
        if (date) {
            var labelvalue = dhx.trim(dateOptions.labelvalue || "").replace("=", "");
            if (this.hwReport.checkParamType(labelvalue) == "ds") {
                date.children[0].innerHTML = this.hwReport.getValue(labelvalue);
            }
            var value = dhx.trim(dateOptions.value || "").replace("=", "");
            if (this.hwReport.checkParamType(value) == "ds") {
                value = this._laydate.parse(0, this.strToDateJSON(this.hwReport.getValue(value)));
                this.oldValues.date = value;
                date.children[1].value = value;
                //数据集表达式运算完成
                that.callEvent("onValueCalculated", []);
            }
        }
        
        //审批结果
        var value = (agreeOptions.value || disAgreeOptions.value || senBackOptions.value || "").replace("=", "");
        if (this.hwReport.checkParamType(value) == "ds") {
            var rptStore = this.hwReport.getQueryStoreByName(value.split(".")[0]);
            var value = this.hwReport.getValue(value);
            this.result = value;
            this.oldValues.result = value;
            if (this.result) {
                this.setComplete();
            }
            else if (rptStore.dataRequestSuccess) {
                this.cansetDisabled = true;
                if (this.cell._disabled) {
                    this.setDisabled();
                }
            }

            //数据集表达式运算完成
            that.callEvent("onValueCalculated", []);
        }

        this.doLayout();
    }

    this.getValue = function (key) {
        return this.getAllValue()[key] || "";
    }

    this.getAllValue = function () {
        var departmentDiv = this._items["department"];
        var commentDiv = this._items["comment"];
        var sealDiv = this._items["seal"];
        var personDiv = this._items["person"];
        var date = this._items["date"];
        return {
            department: (departmentDiv && departmentDiv.children[1].innerHTML) || "",
            opinions: (commentDiv && commentDiv.children[1].value) || "",
            seal: (sealDiv.children[1] && sealDiv.children[1].src) || "",
            person: (personDiv.children[1] && personDiv.children[1].innerHTML) || (personDiv.children[2] && personDiv.children[2].src) || "",
            date: (date && date.children[1].value),
            result: this.result
        }
    }

    this.getFontStyle = function (options) {
        if (!options) return "";
        var style = "";
        if (options.fontcolor) style += ";color:" + options.fontcolor;
        if (options.fontname) style += ";font-family:" + options.fontname;
        if (options.fontsize) style += ";font-size:" + parseInt(options.fontsize) + "px";
        if (window.dhx4.s2b(options.italic)) style += ";font-style:italic";
        if (window.dhx4.s2b(options.fontweight)) style += ";font-weight: bold";
        if (window.dhx4.s2b(options.underline)) style += ";text-decoration: underline"

        return style;
    }

    this.findOptions = function (type) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].type == type) {
                return this.options[i];
            }
        }
        return null;
    }
}

dhtmlXApprove.prototype.getFormat = function (format) {
    if (!format) {
        return "yyyy-MM-dd";
    }
    return format
        .replace(/%Y/g, "yyyy")
        .replace(/%y/g, "y")
        .replace(/%m/g, "MM")
        .replace(/%n/g, "M")
        .replace(/%d/g, "dd")
        .replace(/%j/g, "d")
        .replace(/%H/g, "HH")
        .replace(/%G/g, "H")
        .replace(/%i/g, "mm")
        .replace(/%s/g, "ss");
}

dhtmlXApprove.prototype.getType = function (format) {
    var type = "date"
    if (format.indexOf('y') >= 0)
        type = 'year'
    if (format.indexOf('M') >= 0)
        type = 'month'
    if (format.indexOf('d') >= 0)
        type = 'date'
    if (format.indexOf('H') >= 0 && format.indexOf('d') >= 0)
        type = 'datetime'
    if (format.indexOf('H') >= 0 && format.indexOf('d') < 0)
        type = 'time'
    return type;
}

dhtmlXApprove.prototype.strToDateJSON = function (val) {
    var dateTime = {};
    var laydate = this._laydate;
    var date = val ? new Date(val) : new Date();
    //标准日期格式
    if ((date != "NaN") && (date != "Invalid Date")) {
        dateTime.year = date.getFullYear(); //年
        dateTime.month = date.getMonth(); //月
        dateTime.date = date.getDate(); //日
        dateTime.hours = date.getHours();  //时
        dateTime.minutes = date.getMinutes(); //分
        dateTime.seconds = date.getSeconds(); //秒
        return dateTime;
    }

    var LIMIT_YEAR = [100, 200000];
    var value = (val.match(laydate.EXP_SPLIT) || []).slice(1);
    var error;
    for (var i = 0; i < laydate.format.length; i++) {
        var item = laydate.format[i];
        var thisv = parseFloat(value[i]);
        if (value[i].length < item.length) error = true;
        if (/yyyy|y/.test(item)) { //年
            if (thisv < LIMIT_YEAR[0]) thisv = LIMIT_YEAR[0], error = true; //年不能低于100年
            dateTime.year = thisv;
        } else if (/MM|M/.test(item)) { //月
            if (thisv < 1) thisv = 1, error = true;
            dateTime.month = thisv - 1;
        } else if (/dd|d/.test(item)) { //日
            if (thisv < 1) thisv = 1, error = true;
            dateTime.date = thisv;
        } else if (/HH|H/.test(item)) { //时
            if (thisv < 0) thisv = 0, error = true;
            dateTime.hours = thisv;
        } else if (/mm|m/.test(item)) { //分
            if (thisv < 0) thisv = 0, error = true;
            dateTime.minutes = thisv;
        } else if (/ss|s/.test(item)) { //秒
            if (thisv < 0) thisv = 0, error = true;
            dateTime.seconds = thisv;
        }
    };
    if (error) {
        date = new Date(val);
        dateTime.year = date.getFullYear(); //年
        dateTime.month = date.getMonth(); //月
        dateTime.date = date.getDate(); //日
        dateTime.hours = date.getHours();  //时
        dateTime.minutes = date.getMinutes(); //分
        dateTime.seconds = date.getSeconds(); //秒
        return dateTime;
    }
    return dateTime;
}