/*
filename：dhtmlxgrid_excell_vmdguid.js
creater：刘志伟
date created：2019.03.14
description：guid组件
date modified：2019.03.14
modifier：刘志伟
version：2.3.3.0425
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/
/**
*	@desc: simple text editor
*	@returns: dhtmlxGrid cell editor object
*	@type: public
*/
function eXcell_vmded(cell) {
    var that = this;
    if (cell) {
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
        this.hwReport = this.grid.hwReport;
        var originCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
        this.cellType = originCell && this.hwReport.cellTypes.get(originCell.fillcelltype);

        if (!this.cell.DOMelem_input) {
            this.cell.atag = (!this.cellType || !this.cellType.ismultiline) ? "INPUT" : "TEXTAREA";
            this.cell.DOMelem_input = document.createElement(this.cell.atag);
            this.cell.DOMelem_input.setAttribute("autocomplete", "off");

            this.cell.DOMelem_input.className = "dhx_combo_edit";
            this.cell.DOMelem_input.wrap = "soft";
            this.cell.DOMelem_input.style.marginLeft = "0px";
            this.cell.DOMelem_input.style.textAlign = this.cell.style.textAlign;

            if (this.grid._disabled || this.isDisabled()) {
                this.cell.DOMelem_input.setAttribute("readonly", "readonly");
            }

            if (this.cell.atag == "TEXTAREA") {
                this.cell.DOMelem_input.onkeydown = function (e) {
                    var ev = e || window.event;
                    if (ev.keyCode == 13) { //如果按的是enter键 13是enter 
                        ev.cancelBubble = true;
                        return true;
                    }
                    return true;
                }
            }
            //放开之后自由格式不调用edit，但是不放开在ie下不响应鼠标焦点，所以在自由格式下置null
            this.cell.DOMelem_input.onclick = function (e) {
                (e || event).cancelBubble = true
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
            this.cell.DOMelem_input.value = this.val;
            this.cell.innerHTML = "";
            this.cell.appendChild(this.cell.DOMelem_input);
        }
        if (!/dhxcombo_actv/g.test(this.cell.DOMelem_input.className)) {
            this.cell.DOMelem_input.className += " dhxcombo_actv";
        }

        if (_isIE) {
            this.cell.DOMelem_input.focus();
            this.cell.DOMelem_input.blur();
        }
        	//如果单元格不是全部可视，则向下滚动显示出全部单元格再进行编辑 2019.12.27 lf
		if(dhx.getOffset(this.cell).top+ (this.cell.clientHeight - 3)>document.body.clientHeight){
            this.hwReport.grid.objBox.scrollTop += dhx.getOffset(this.cell).top+ (this.cell.clientHeight - 3)-document.body.clientHeight;
        }
        this.cell.DOMelem_input.focus();
    }

    /**
  * 显示编辑器
  */
    this.showEditor = function () {
        var that = this;
        var val = this.getValue();
        if (this.cell.atag == "TEXTAREA") {
            this.cell.DOMelem_input.style.height = (this.cell.clientHeight - 3) + "px";
        }
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

    this.setValue = function (val) {
        if ((typeof (val) != "number") && (!val || val.toString()._dhx_trim() == "")) {
            this.cell._clearCell = true;
        } else {
            this.cell._clearCell = false;
            if (this.cell.atag == "TEXTAREA") {
                val = val.replace(/\n/g, "<br/>")
            }
        }

        if (this.cell._editorshow) {
            this.cell.DOMelem_input.value = val;
            this.grid.callEvent("onCellChanged", [
                this.cell.parentNode.idd,
                this.cell._cellIndex,
                this.cell._clearCell ? "" : val
            ]);
        }
        else {
            this.setCValue(this.cell._clearCell ? "&nbsp;" : val, val);
        }
    }

    this.getValue = function () {
        if ((this.cell.firstChild) && ((this.cell.atag) && (this.cell.firstChild.tagName == this.cell.atag)))
            return this.cell.firstChild.value;

        if (this.cell._clearCell)
            return "";

        if (this.cell.atag == "TEXTAREA") {
            return this.cell.innerHTML.toString()._dhx_trim().replace(/<br(\/){0,1}>/g, "\n");
        }

        return this.cell.innerHTML.toString()._dhx_trim();
    }

    this.detach = function () {
        this.cell.DOMelem_input.className = this.cell.DOMelem_input.className.replace(/dhxcombo_actv/g, "");
        this.cell.className = this.cell.className.replace(new RegExp(this.hwReport.reportId + "-p-0", "gi"), " ");
        if (this.cell._editorshow == true) {
            this.grid.callEvent("onCellChanged", [
                this.cell.parentNode.idd,
                this.cell._cellIndex,
                this.cell.DOMelem_input.value
            ]);
        }
        else {
            this.setValue(this.cell.DOMelem_input.value);
        }
        return this.val != this.getValue();
    }
}
eXcell_vmded.prototype = new eXcell;
