/*
filename：dhtmlxgrid_excell_order_tb.js
creater：刘志伟
date created：2016.11.19
description：序号组件
date modified：2017.12.06
modifier：刘志伟
version：2.2.15.1129
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/
function eXcell_vmdorder(cell) {
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
        if (!val && oCell) {
            var cellType = hwReport.cellTypes.get(oCell && oCell.fillcelltype);
            var start = (cellType && cellType.start) || 1;
            oCell._seed = oCell._seed || start;
            val = oCell._seed++;
        }

        val = val || "1";
        this.cell._brval = val;

        this.setCValue(val);
    }
}

eXcell_vmdorder.prototype = new eXcell;


