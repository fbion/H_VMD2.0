/*
filename：dhtmlxgrid_excell_vmdbutton.js
creater：刘志伟
date created：2016.11.19
description：按钮组件
date modified：2019.03.15
modifier：李份
version：2.2.15.1129
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/
function eXcell_vmdbutton(cell) {
    
    if (cell) {
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
        this.hwReport = this.grid.hwReport;
    }
    var that = this;
    this.conf = {};

    this.isDisabled = function () {
        if (this.grid._disabled) {
            return true;
        }
        return this.cell._disabled;
    }

    this.setValue = function (val) {
        var oCell = this.hwReport.getOriginCellById(cell._attrs.sid);
        var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);
        this.cell.innerHTML = "";
        if (cellType.bottontype == "none") {
            this.cell._val = cellType.name;
            this.cell.innerHTML = "<input type='button' class=' noprint' value='" + (cellType.name || val) + "'/>";
            this.cell.firstChild.onclick = function (e) {
                (e || event).cancelBubble = true;
                that.hwReport.callEvent("onEditRow", [
                    "label",
                    that.cell.parentNode.idd,
                    that.cell._cellIndex
                ])
                return false;
            }
        }
        else if (cellType.bottontype == "add-delete") {
            this.cell._val = "add-delete";
            this.cell.innerHTML = ""
                + "<img class='noprint' src='" + this.grid.imgURL + "add.png'/>"
                + "<img class='noprint' src='" + this.grid.imgURL + "delete.png'/>";;
            this.cell.children[0].onclick = function (e) {
                (e || event).cancelBubble = true;
                that.hwReport.callEvent("onEditRow", [
                    "add",
                    that.cell.parentNode.idd,
                    that.cell._cellIndex
                ])
                return false;
            }
            this.cell.children[1].onclick = function (e) {
                (e || event).cancelBubble = true;
                that.hwReport.callEvent("onEditRow", [
                    "delete",
                    that.cell.parentNode.idd,
                    that.cell._cellIndex
                ])
                return false;
            }
        }
        else if (cellType.bottontype) {
            var buttonTypeMap = {
                "insertrow": "add",
                "deleterow": "delete",
                "editrow": "edit",
                "retract": "retract",
                "expend": "expend",
                "moveup": "moveup",
                "movedown": "movedown"
            }
            var buttonType = cellType.bottontype == "extend_retract" ? buttonTypeMap[cellType.status] : buttonTypeMap[cellType.bottontype];
            this.cell._val = buttonType;
            if (cellType.text) {
                if (cellType.labelpos == "left") {
                    this.cell.innerHTML = "<span>" + cellType.text + "</span>" + "<img class='noprint' src='" + this.grid.imgURL + buttonType + ".png'/>";
                }
                else {
                    this.cell.innerHTML = "<img class='noprint' src='" + this.grid.imgURL + buttonType + ".png'/>" + "<span>" + cellType.text + "</span>";
                }
                this.cell.firstChild.onclick = function (e) {
                    (e || event).cancelBubble = true;
                    that.hwReport.callEvent("onEditRow", [
                        buttonType,
                        that.cell.parentNode.idd,
                        that.cell._cellIndex
                    ])
                    return false;
                }
                this.cell.lastChild.onclick = function (e) {
                    (e || event).cancelBubble = true;
                    that.hwReport.callEvent("onEditRow", [
                        buttonType,
                        that.cell.parentNode.idd,
                        that.cell._cellIndex
                    ])
                    return false;
                }
            }
            else {
                this.cell.innerHTML = "<img class='noprint' src='" + this.grid.imgURL + buttonType + ".png'/>";
                this.cell.firstChild.onclick = function (e) {
                    (e || event).cancelBubble = true;
                    that.hwReport.callEvent("onEditRow", [
                        buttonType,
                        that.cell.parentNode.idd,
                        that.cell._cellIndex
                    ])
                    return false;
                }
            }

        }
        else if (val) {
            this.cell._val = val;
            this.cell.innerHTML = "<span class='noprint'>" + val + "</span>";
            this.cell.firstChild.onclick = function (e) {
                (e || event).cancelBubble = true;
                that.hwReport.callEvent("onEditRow", [
                    "label",
                    that.cell.parentNode.idd,
                    that.cell._cellIndex
                ])
                return false;
            }
        }

        this.conf.evs_nodes = [
            { node: document.body, evs: { mousedown: "_doOnBodyMouseDown" } },
            { node: this.cell, evs: { keyup: "_doOnInputKeyUp", keydown: "_doOnInputKeyDown", keypress: "_doOnInputKeyPress", focus: "_doOnInputFocus", blur: "_doOnInputBlur", input: "_doOnInputInput" } }
        ];
        for (var q = 0; q < this.conf.evs_nodes.length; q++) {
            for (var a in this.conf.evs_nodes[q].evs) {
                if (window.addEventListener) {
                    this.conf.evs_nodes[q].node.addEventListener(a, this[this.conf.evs_nodes[q].evs[a]], false);
                } else {
                    this.conf.evs_nodes[q].node.attachEvent("on" + a, this[this.conf.evs_nodes[q].evs[a]]);
                }
            }
        }
    }

    this.getValue = function () {
        return this.cell._val;
    }

    this.detach = null;
    this.edit = null;

    this._doOnInputKeyDown = function (e) {

        e = e || event;

        // console.log("onkeypress ", e.keyCode, " ", e.charCode)

        // up (38) /down (40)
        if ((e.keyCode == 38 || e.keyCode == 40) && !e.ctrlKey && !e.shiftKey && !e.altKey) {
            if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            e.cancelBubble = true;
            that._keyOnUpDown(e.keyCode == 38 ? -1 : 1);
        }

        // F2
        if (e.keyCode == 113) {
            if (!that._isListVisible()) {
                that._showList();
                if (that.cell.firstChild.value == that.conf.last_text) {
                    that._setSelected(that.conf.last_selected, true, true);
                    that.cell.firstChild.value = that.conf.last_text;
                    that.conf.f_server_last = that.cell.firstChild.value.toLowerCase();
                } else {
                    that.conf.f_server_last = that.cell.firstChild.value.toLowerCase();
                    if (that.conf.f_mode == false) that._checkForMatch();
                }
            } else {

            }
        }

        // esc
        if (e.keyCode == 27) {
            // cancel operation, restore last value
            if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            e.cancelBubble = true;
            that._cancelSelect();
        }

        // enter
        if (e.keyCode == 13) {
            if (e.preventDefault) e.preventDefault(); // if combo attached to form
            that._confirmSelect("kbd");
        }

        that.conf.clear_key = true;
        that.callEvent("onKeyPressed", [e.keyCode || e.charCode]);
    }
}
eXcell_vmdbutton.prototype = new eXcell;