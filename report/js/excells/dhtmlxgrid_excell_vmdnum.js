/*
Product Name: dhtmlxSuite 
Version: 5.0.8 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

function eXcell_vmdnum(cell) {
    var that = this;
    try {
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
        this.hwReport = this.grid.hwReport;
        var originCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
        this.cellType = this.hwReport.cellTypes.get(originCell.fillcelltype);
        this.number = this.hwReport.numbers.get(originCell.number) || {};

        if (!this.cell.DOMelem_input) {
            this.cell.atag = "INPUT";
            this.cell.DOMelem_input = document.createElement(this.cell.atag);
            this.cell.DOMelem_input.setAttribute("autocomplete", "off");

            this.cell.DOMelem_input.className = "dhx_combo_edit";
            this.cell.DOMelem_input.wrap = "soft";
            this.cell.DOMelem_input.style.marginLeft = "0px";
            this.cell.DOMelem_input.style.textAlign = this.cell.style.textAlign;

            if (this.grid._disabled || this.isDisabled()) {
                this.cell.DOMelem_input.setAttribute("readonly", "readonly");
            }
            //放开之后自由格式不调用edit，但是不放开在ie下不响应鼠标焦点，所以在自由格式下置null
            this.cell.DOMelem_input.onclick = function (e) {
                (e || event).cancelBubble = true
            }

            this.cell.DOMelem_input.onkeyup = function (e) {
                var lastChar = (e.srcElement.value + "").substr((e.srcElement.value + "").length - 1)
                if ((e.srcElement.value + "").indexOf(".") != (e.srcElement.value + "").length - 1 && lastChar != "0" && e.srcElement.value != "-" && e.srcElement.value != "+") {
                    e.srcElement.value = that.format(e.srcElement.value);
                }
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
                if (!e)
                    e = event;
                e.cancelBubble = true;
                return true;
            };
        }

    } catch (er) {
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
            this.cell.DOMelem_input.setAttribute("readonly", "readonly");
        }
        else {
            this.cell.DOMelem_input.removeAttribute("readonly");
        }
    }

    this.edit = function () {
        this.val = this.getValue();

        if (!this.cell._editorshow) {
            this.cell.className += " " + this.hwReport.reportId + "-p-0";
            this.cell.DOMelem_input.style.width = this.cell.clientWidth + "px";
            this.cell.DOMelem_input.style.height = (this.cell.clientHeight - 3) + "px";
            this.cell.DOMelem_input.value = this.val
            this.cell.innerHTML = "";
            this.cell.appendChild(this.cell.DOMelem_input);
            this.cell.DOMelem_input.focus();
        }
        else {
            if (_isIE) {
                this.cell.DOMelem_input.focus();
                this.cell.DOMelem_input.blur();
            }
            this.cell.DOMelem_input.focus();
        }
        if (!/dhxcombo_actv/g.test(this.cell.DOMelem_input.className)) {
            this.cell.DOMelem_input.className += " dhxcombo_actv";
        }
    }
    
    /**
    * 显示编辑器
    */
    this.showEditor = function () {
        var that = this;
        var val = this.getValue();
        this.cell.DOMelem_input.onclick = null;
        this.cell.DOMelem_input.style.width = this.cell.clientWidth + "px";
        this.cell.DOMelem_input.value = val;
        this.cell.innerHTML = ""
        this.cell.appendChild(this.cell.DOMelem_input);
        this.cell._editorshow = true;

        this.grid.attachEvent("onSetSizes", function () {
            that.cell.DOMelem_input.style.width = that.cell.clientWidth + "px";
        });
    }

    this.getValue = function () {

        if ((this.cell.firstChild) && ((this.cell.atag) && (this.cell.firstChild.tagName == this.cell.atag)))
            return this.cell.firstChild.value;

        if (this.cell._clearCell)
            return "";

        return this.cell.innerHTML.toString()._dhx_trim();
    }
    this.setValue = function (val) {
        //var re = new RegExp("[a-z]|[A-Z]", "i")
        val = this.format(val);
        if (isNaN(val)) {
            val = "&nbsp;";
            this.cell._clearCell = true;
        }
        else {
            this.cell._clearCell = false;
        }


        if (this.cell._editorshow) {
            this.cell.DOMelem_input.value = val;
        }
        else {
            this.cell.innerHTML = val;
        }
        //#__pro_feature:21092006{
        //#on_cell_changed:23102006{
        this.grid.callEvent("onCellChanged", [
            this.cell.parentNode.idd,
            this.cell._cellIndex,
            this.cell._clearCell ? "" : val
        ]);

    }

    this.format = function (val) {
        var numType = this.number.type;
        val = parseFloat(val);
        switch (numType) {
            case '0': //常规
                if (isNaN(val)) {
                    return "";
                }
                return val;
                break;
            case '1': //数字
                if (isNaN(val)) {
                    return "";
                }
                var decimal = parseInt(this.number.decimal || -1);
                if (decimal < 0) {
                    return val;
                }
                val = val.toFixed(decimal);
                if (!dhx.s2b(this.number.zerovisible)) {
                    val = parseFloat(val);
                }
                return val;
                break;
            default:
                if (isNaN(val)) {
                    return "";
                }
                return val;
                break;
        }
    }

    this.detach = function () {
        this.cell.DOMelem_input.className = this.cell.DOMelem_input.className.replace(/dhxcombo_actv/g, "");
        this.cell.className = this.cell.className.replace(new RegExp(this.hwReport.reportId + "-p-0", "gi"), " ");
        var tv = this.cell.DOMelem_input.value;
        this.setValue(tv);
        return this.val != this.getValue();
    }
}
eXcell_vmdnum.prototype = new eXcell;
//(c)dhtmlx ltd. www.dhtmlx.com
