
function eXcell_vmdlaydate(cell) {

    var that = this;
    if (!cell) return;

    this.cell = cell;
    this.grid = cell.parentNode.grid;
    this.hwReport = this.grid.hwReport;
    var originCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
    this.cellType = this.hwReport.cellTypes.get(originCell.fillcelltype);
    this.format = this.cellType.format;

    //日期容器
    if (!this.cell.DOMParent) {
        this.cell.DOMParent = document.createElement("DIV");
        this.cell.DOMParent.className = "dhxcombo_in_grid_parent";//"dhxcombo_material";
        this.cell.DOMParent.innerHTML = "<div class='dhxcombo_material'><input type='text' class='dhxcombo_input' autocomplete='off'>" +
                    "<div class='dhxcombo_select_button'><div class='dhxcalendar_select_img'></div></div></div>";
        this.cell.DOMelem = this.cell.DOMParent.firstChild;
        this.cell.DOMelem_input = this.cell.DOMelem.firstChild;
        this.cell.DOMelem_icon = this.cell.DOMelem.children[1];

        if (this.grid._disabled || this.isDisabled()) {
            this.cell.DOMelem_input.setAttribute("disabled", "disabled");
        }

        this.cell.DOMelem_icon.onclick = function (e) {
            if (!e) e = event;
            e.cancelBubble = true;
            that.grid.selectCell(that.cell.parentNode, that.cell._cellIndex, true, false, true);
            that.cell.DOMelem_input.focus();
            return true;
        }

        this.cell.DOMelem_input.onmousedown = function (e) {
            if (that.cell._editorshow) {
                if (that.grid._doClick(e || window.event) !== false) {
                    if (that.grid._sclE)
                        that.grid.editCell(e || window.event);
                    else
                        that.grid.editStop();
                }
            }
            (e || event).cancelBubble = true
        }

        this.cell.DOMelem_input.onselectstart = function (e) {
            if (!e) e = event;
            e.cancelBubble = true;
            return true;
        };
           
        this.cell._laydate = laydate.render({
            elem: this.cell.DOMelem_input, //指定元素
            format: this.toLaydateFormat(this.format),
            type: this.getType(this.format),
            ready: function () {
                //debugger
            },
            done: function (val, date) {
                that.cell.DOMelem_input.value = val;
                that.grid.editStop();
            }
        }).laydate;
    }

    this.isDisabled = function () {
        if (this.grid._disabled) {
            return true;
        }
        return this.cell._disabled;
    }

    this.setDisabled = function (fl) {
        if (fl != 'true' && fl != 1)
            fl = false;

        this.cell._disabled = fl;
        if (fl) {
            this.cell.DOMelem_input.setAttribute("disabled", "disabled");
        }
        else {
            this.cell.DOMelem_input.removeAttribute("disabled");
        }
    }

    this.edit = function () {
        this.val = this.getValue();

        if (!this.cell._editorshow) {
            this.cell.innerHTML = ""
            this.cell.className += " " + this.hwReport.reportId + "-p-0";
            this.cell.DOMelem.style.width = this.cell.clientWidth + "px";
            this.cell.DOMelem_input.style.width = (this.cell.clientWidth - 24) + "px";
            this.cell.DOMelem_input.value = this.val;
            this.cell.appendChild(this.cell.DOMParent);
            this.cell.DOMelem.style.top = (this.cell.DOMParent.clientHeight - this.cell.DOMelem.clientHeight) / 2 + "px";
            this.cell.DOMelem_input.focus();
        }
        else {
            this.cell.DOMelem_input.onclick = function (e) {
                if (!e) e = event;
                e.cancelBubble = true;
                return true;
            }
            if (this.cell._laydate.elemID && lay('#' + this.cell._laydate.elemID) && lay('#' + this.cell._laydate.elemID).length > 0) {

            }
            else {
                this.cell.DOMelem_input.focus();
            }
        }

        if (!/dhxcombo_actv/g.test(this.cell.DOMelem.className)) {
            this.cell.DOMelem.className += " dhxcombo_actv";
        }
    }

    /**
     * 显示编辑器
     */
    this.showEditor = function () {
        //return;
        var that = this;
        var val = this.getValue();
        this.cell.innerHTML = ""
        this.cell.DOMelem.style.width = this.cell.clientWidth + "px";
        this.cell.DOMelem_input.style.width = (this.cell.clientWidth - 24) + "px";
        this.cell.DOMelem_input.value = val;
        this.cell.appendChild(this.cell.DOMParent);

        var top = (this.cell.DOMParent.clientHeight - this.cell.DOMelem.clientHeight) / 2;
        if (top < 1) {
            top = 0;
        }
        this.cell.DOMelem.style.top = top + "px";

        this.cell._editorshow = true;

        this.grid.attachEvent("onSetSizes", function () {
            that.cell.DOMelem.style.width = that.cell.clientWidth + "px";
            that.cell.DOMelem_input.style.width = (that.cell.clientWidth - 24) + "px";
        });
    }

    this.setValue = function (val) {
        if (!val || val.toString()._dhx_trim() == "") {
            if (this.cellType.isdefultdate == "0") {
                val = "&nbsp";
                this.cell._clearCell = true;
                this.cell.val = null;
            }
            else {
                this.cell.val = this.strToDate();
                val = dhx4.date2str(this.cell.val, this.toDhtmlxFormat(this.format));
                this.cell._clearCell = false;
            }
        } else {
            this.cell._clearCell = false;
            this.cell.val = this.strToDate(val);
            val = dhx4.date2str(this.cell.val, this.toDhtmlxFormat(this.format));
        }

        if (this.cell._editorshow) {
            this.cell.firstChild.firstChild.firstChild.value = val == "&nbsp" ? "" : val;
        }
        else {
            if (this.cell.DOMParent.parentNode) {
                this.cell.removeChild(this.cell.DOMParent);
            }
            this.cell.innerHTML = val;
        }
        this.grid.callEvent("onCellChanged", [
            this.cell.parentNode.idd,
            this.cell._cellIndex,
            this.getValue()
            //this.cell.val == null ? "" : dhx4.date2str(this.cell.val, this.toDhtmlxFormat(this.format))
        ]);
    }

    this.getValue = function () {
        if (this.cell._clearCell) return "";

        if (this.cell._editorshow) {
            return this.cell.firstChild.firstChild.firstChild.value;
        }
        return this.cell.innerHTML.toString()._dhx_trim()
    }

    this.getDate = function () {
        return this.cell.val;
    }

    this.detach = function () {
        this.cell._laydate.remove();
        this.cell._laydate.elem = this.cell.DOMelem_input.onclick = null;
        this.cell.DOMelem.className = this.cell.DOMelem.className.replace(/dhxcombo_actv/g, "");
        this.cell.className = this.cell.className.replace(new RegExp(this.hwReport.reportId + "-p-0", "gi"), " ");
        this.setValue(this.cell.DOMelem_input.value);
    }
}

eXcell_vmdlaydate.prototype = new eXcell;

eXcell_vmdlaydate.prototype.toDhtmlxFormat = function (format) {
    if (!format) {
        return "%Y-%m-%d";
    }
    if(/%/g.test(format)){
        return format;
    }
    return format
        .replace(/yyyy/g, "%Y")
        .replace(/y/g, "%y")
        .replace(/MM/g, "%m")
        .replace(/M/g, "%n")
        .replace(/dd/g, "%D")
        .replace(/d/g, "%j")
        .replace(/%D/g, "%d")
        .replace(/HH/g, "%Z")
        .replace(/H/g, "%G")
        .replace(/mm/g, "%i")
        .replace(/ss/g, "%s")
        .replace(/Z/g, "H");
}

eXcell_vmdlaydate.prototype.toLaydateFormat = function (format) {
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

eXcell_vmdlaydate.prototype.getType = function (format) {
    format = this.toLaydateFormat(format)
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

eXcell_vmdlaydate.prototype.strToDate = function (val) {
    if (!val) {
        return new Date();
    }
    if (typeof val === "object" && (val instanceof Date)) {
        return val;
    }
    val = dhx.trim(val).replace(/\//g, "-");
    var year, month, day, hour, minute, second, milliseconds = 0;
    var isDefaultFormat = true;
    //2014-1-20 8:50:00
    if (/\d{4}(-\d{1,2}){1,2}\s{1,}\d{1,2}(:\d{1,2}){1,2}(\.\d+){0,1}/.test(val)) {
        var date_time_arr = val.split(/\s+/).filter(function (v) { return v != null }, null);
        var date_arr = date_time_arr[0].split("-").map(function (v) { return parseInt(v.trim(), 10) }, null);
        var time_arr = date_time_arr[1].split(":").map(function (v) { return parseInt(v.trim(), 10) }, null);

        year = date_arr[0];
        month = date_arr[1];
        day = date_arr[2];

        hour = time_arr[0];
        minute = time_arr[1];
        second = time_arr[2];

        if (val.indexOf(".") != -1) {
            milliseconds = parseInt(val.split(".")[1], 10);
        }
    }

    //11-MAY-15 20:52:48.0 日-月-年 时:分:秒.毫秒
    else if (/\d{1,2}-([a-zA-Z]+)-\d{2,4}\s{1,}\d{1,2}(:\d{1,2}){2}(\.\d+){0,1}/.test(val)) {

        var monthsMap = {
            'january': 1, 'february': 2, 'march': 3, 'april': 4, 'may': 5, 'june': 6, 'july': 7,
            'august': 8, 'september': 9, 'october': 10, 'november': 11, 'december': 12,
            'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6, 'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
        }
        var date_time_arr = val.split(/\s+/).filter(function (v) { return v != null }, null);
        var date_arr = date_time_arr[0].split("-").map(function (v) { return v.trim() }, null);

        year = parseInt(date_arr[2].length == 2 ? ("20" + date_arr[2]) : date_arr[2], 10);
        month = monthsMap[date_arr[1].toLowerCase()];
        day = parseInt(date_arr[0]);

        var time_arr = date_time_arr[1].split(":").map(function (v) { return parseInt(v.trim(), 10) }, null);
        hour = time_arr[0];
        minute = time_arr[1];
        second = time_arr[2];

        if (val.indexOf(".") != -1) {
            milliseconds = parseInt(val.split(".")[1], 10);
        }
    }

        //2014-1-20
    else if (/\d{4}(-\d{1,2}){1,2}/.test(val)) {
        var date_arr =val.split("-").map(function (v) { return parseInt(v.trim(), 10) }, null);

        year = date_arr[0];
        month = date_arr[1];
        day = date_arr[2];
    }
    //8:50:00
    else if (/^\d{1,2}(:\d{1,2}){1,2}(\.\d+){0,1}$/.test(val)) {
        var time_arr = val.split(":").map(function (v) { return parseInt(v.trim(), 10) });
        hour = time_arr[0];
        minute = time_arr[1];
        second = time_arr[2];
        if (val.indexOf(".") != -1) {
            milliseconds = parseInt(val.split(".")[1], 10);
        }
    }
    //20140120 || 2014 || 201401
    else if (/^\d{4,8}$/.test(val)) {
        year = parseInt(val.substr(0, 4), 10);
        month = parseInt(val.substr(4, 2), 10);
        day = parseInt(val.substr(6, 2), 10);
    }
    //日期格式解析不了
    else {
        isDefaultFormat = false;
    }

    if (isDefaultFormat) {
        //修正年月日
        year = isNaN(year) ? 2000 : year;
        month = isNaN(month) ? 1 : month;
        day = isNaN(day) ? 1 : day;

        //修正时分秒
        hour = isNaN(hour) ? 0 : hour;
        minute = isNaN(minute) ? 0 : minute;
        second = isNaN(second) ? 0 : second;

        var date = new Date();
        date.setFullYear(year);
        date.setMonth(month - 1);
        date.setMonth(month - 1);
        date.setDate(day);
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);
        date.setMilliseconds(milliseconds);
        return date;
    }
    return dhx4.str2date(val, this.toDhtmlxFormat(this.format))
}