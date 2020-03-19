/*
filename：dhtmlxgrid_excell_vmdch.js
creater：刘志伟
date created：2019.03.14
description：ch组件
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
function eXcell_vmdch(cell) {
    if (cell) {
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
        this.hwReport = this.grid.hwReport;
        var originCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
        this.cellType = this.hwReport.cellTypes.get(originCell.fillcelltype);
    }

    this.isDisabled = function () {
        if (this.grid._disabled) {
            return true;
        }
        return this.cell._disabled;
    }

    this.disabledF = function (fl) {
        if ((fl == true) || (fl == 1))
            this.cell.innerHTML = this.cell.innerHTML.replace("item_chk0.", "item_chk0_dis.").replace("item_chk1.",
				"item_chk1_dis.");
        else
            this.cell.innerHTML = this.cell.innerHTML.replace("item_chk0_dis.", "item_chk0.").replace("item_chk1_dis.",
				"item_chk1.");
    }

    this.changeState = function (fromClick) {
        //nb:
        if (fromClick === true && !this.grid.isActive) {
            if (window.globalActiveDHTMLGridObject != null && window.globalActiveDHTMLGridObject != this.grid && window.globalActiveDHTMLGridObject.isActive) window.globalActiveDHTMLGridObject.setActive(false);
            this.grid.setActive(true);
        }
        if ((!this.grid.isEditable) || (this.cell.parentNode._locked) || (this.isDisabled()))
            return;

        if (this.grid.callEvent("onEditCell", [
			0,
			this.cell.parentNode.idd,
			this.cell._cellIndex
        ])) {
            this.val = this.getValue()

            if (this.val == "1")
                this.setValue("0")
            else
                this.setValue("1")

            this.cell.wasChanged = true;
            //nb:
            this.grid.callEvent("onEditCell", [
				2,
				this.cell.parentNode.idd,
				this.cell._cellIndex,
                this.getValue(),
                this.val
            ]);

            this.grid.callEvent("onCheckbox", [
				this.cell.parentNode.idd,
				this.cell._cellIndex,
				(this.val != '1')
            ]);

            this.grid.callEvent("onCheck", [
				this.cell.parentNode.idd,
				this.cell._cellIndex,
				(this.val != '1')
            ]);
        } else { //preserve editing (not tested thoroughly for this editor)
            this.editor = null;
        }
    }
    this.getValue = function () {
        return this.cell.chstate ? this.cell.chstate.toString() : "0";
    }

    this.isCheckbox = function () {
        return true;
    }
    this.isChecked = function () {
        if (this.getValue() == "1")
            return true;
        else
            return false;
    }

    this.setChecked = function (fl) {
        this.setValue(fl.toString())
    }
    this.detach = function () {
        return this.val != this.getValue();
    }
    this.edit = null;
}
eXcell_vmdch.prototype = new eXcell;
eXcell_vmdch.prototype.setValue = function (val) {

    this.cell.style.verticalAlign = "middle"; //nb:to center checkbox in line
    //val can be int
    if (val) {
        val = val.toString()._dhx_trim();

        if ((val == "false") || (val == "0"))
            val = "";
    }

    if (val) {
        val = "1";
        this.cell.chstate = "1";
    } else {
        val = "0";
        this.cell.chstate = "0"
    }
    var obj = this;
    this.cell.setAttribute("excell", "ch");
    this.setCValue("<img src='" + this.grid.imgURL + "item_chk" + val
		+ ".gif' style='vertical-align:middle;' onclick='new eXcell_vmdch(this.parentNode).changeState(true); (arguments[0]||event).cancelBubble=true; '>" + (this.cellType.displayLabel ? ("<span style='vertical-align:middle; margin-left:4px;' >" + this.cellType.displayLabel + "</span>") : ""),
		this.cell.chstate);
}
