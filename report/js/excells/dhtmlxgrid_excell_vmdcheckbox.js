/*
filename：dhtmlxgrid_excell_checkbox_tb.js
creater：刘志伟
date created：2016.11.19
description：扩展复选框组件
date modified：2018.09.14
modifier：刘志伟
version：2.3.16.0726
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/
function eXcell_vmdcheckbox(cell) {
	if(!cell) return;

	var that = this;
	this.cell = cell;
	this.grid = cell.parentNode.grid;
	this.hwReport = this.grid.hwReport;
	this.options = {}

	this.getcheckbox = function() {
	    return this.cell.checkbox;
	}

	this.getValue = function() {
	    return (this.cell.checkbox && this.cell.checkbox.getValue() != null) ? this.cell.checkbox.getValue() : (this.cell._val || "");
	}

	this.setValue = function (val) {
		this.cell._val = val;
	    this.cell.checkbox = this.initCheckBox();
	    this.cell.checkbox.setValue(val);
	    this.grid.callEvent("onCellChanged", [
            this.cell.parentNode.idd,
            this.cell._cellIndex,
            val
	    ]);
	}

	this.isDisabled = function () {
	    if (this.grid._disabled) {
	        return true;
	    }
	    return this.cell._disabled;
	}

	this.edit = function () {
	    this.val = this.getValue();
		this.cell.checkbox.moveToNext();
	}

	this.detach = function() {
		this.cell.checkbox.clearSelectStatus();
		this.cell.checkbox.currentSelectId = null;
		this.cell.checkbox.hasSelected = false;
		this.grid.editor = null;

		return false;
	}
}

eXcell_vmdcheckbox.prototype = new eXcell;

eXcell_vmdcheckbox.prototype.initCheckBox = function (index) {
    var that = this;
    if (this.cell.checkbox) {
        return this.cell.checkbox;
    }
	var oCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
	var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);
	var container = document.createElement("div");
	this.cell.appendChild(container);

	var checkbox = new dhtmlXCheckBox(container, {
	    mode: cellType.mode
	});
	var rptStore = cellType.bindsource && cellType.bindsource.tablename && this.hwReport.getQueryStoreByName(cellType.bindsource.tablename);
	if (rptStore && rptStore.dhtmlxDatastore) {
	    checkbox.sync(rptStore.dhtmlxDatastore, {
	        text: (cellType.bindsource.showcolumn || "text").toLowerCase(),
	        value: (cellType.bindsource.valuecolumn || "value").toLowerCase(),
	        seperator: cellType.seperator,
	        mode: cellType.mode,
	        style: cellType.mode == "radio" ? "rad" : "chk",
	        enableAll: window.dhx4.s2b(cellType.isallselect)
	    }, this);
	}

	checkbox.attachEvent("onCheckChanged", function (newValue, oldValue) {

	    that.grid.callEvent("onCellChanged", [
					that.cell.parentNode.idd,
					that.cell._cellIndex,
					newValue
	    ]);

	    that.grid.callEvent("onEditCell", [
					2,
					that.cell.parentNode.idd,
					that.cell._cellIndex,
					newValue,
					oldValue
	    ]);
	});
	
	return checkbox;
};

eXcell_vmdcheckbox.prototype.getCellCheckBox = function() {
	if(this.cell.checkbox) return this.cell.checkbox;
	this.cell.checkbox = this.initCheckBox();
	return this.cell.checkbox;
};