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
		if(hwReport.vmdreport&&hwReport.vmdreport.xtype=="vmd.datainput")
		{
			var cell=this.cell;
			var that=this;
			window.setTimeout(function(){
				if (!cell.parentNode) return;
				var val=cell.parentNode.rowIndex;
				if (cell.parentNode.grid.currentPage || val<0 || cell.parentNode.grid._srnd) val=cell.parentNode.grid.rowsBuffer._dhx_find(cell.parentNode)+1;
				if (val<=0) return;
					cell.innerHTML = val;
				if (cell.parentNode.grid._fake && cell._cellIndex<cell.parentNode.grid._fake._cCount && cell.parentNode.grid._fake.rowsAr[cell.parentNode.idd]) cell.parentNode.grid._fake.cells(cell.parentNode.idd,cell._cellIndex).setCValue(val);
					cell=null;
				that.setCValue(val);
			},100);
		}
		else
		{        
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
}

eXcell_vmdorder.prototype = new eXcell;


