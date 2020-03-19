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
function eXcell_vmdguid(cell) {
    if (cell) {
        this.cell = cell;
        this.cell._disabled = true;
        this.grid = this.cell.parentNode.grid;
    }
    
    this.getValue = function () {
        
        if (typeof this.cell._brval != "undefined") return this.cell._brval;

        return this.cell._brval || this.cell.innerHTML.toString()._dhx_trim(); //innerText;
    }
    this.setValue = function (val) {
        var hwReport = this.grid.hwReport;
        var oCell = hwReport.getOriginCellById(this.cell._attrs.sid);
        var cellType = hwReport.cellTypes.get(oCell && oCell.fillcelltype);
        var len = (cellType && cellType.len) || 32;
        val = val || vmd.getGuid(len);
        this.cell._brval = val;

        this.setCValue(val);
    }
}

eXcell_vmdguid.prototype = new eXcell;
