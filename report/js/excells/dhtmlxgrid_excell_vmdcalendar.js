/*
Product Name: dhtmlxSuite 
Version: 5.0.8 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

function eXcell_vmdCalendar(cell) {
	if (cell) {
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
		
		if (!this.grid._grid_calendarA) {
			
			var cal = this.grid._grid_calendarA = new dhtmlxCalendarObject();
			this.grid.callEvent("onDhxCalendarCreated", [cal]);
			
			var sgrid = this.grid;
			cal.attachEvent("onClick",function(){
                    		this._last_operation_calendar=true;
                    		window.setTimeout(function(){sgrid.editStop()},1);
                    		return true;
                    	});
                    	
                    	var zFunc = function(e){ (e||event).cancelBubble=true; }
                    	dhtmlxEvent(cal.base, "click", zFunc);
                    	cal = null;
                }
	}
}
eXcell_vmdCalendar.prototype = new eXcell;

eXcell_vmdCalendar.prototype.edit = function () {
	
	var arPos = this.grid.getPosition(this.cell);
	this.grid._grid_calendarA._show(false, false);
	this.grid._grid_calendarA.setPosition(arPos[0],arPos[1]+this.cell.offsetHeight);
	this.grid._grid_calendarA._last_operation_calendar = false;
	
	
	this.grid.callEvent("onCalendarShow", [this.grid._grid_calendarA, this.cell.parentNode.idd, this.cell._cellIndex]);
	//var arPos = this.grid.getPosition(this.cell);
	//var pval=this._date2str2(this.cell.val||new Date());
	//window._grid_calendar.render(arPos[0],arPos[1]+this.cell.offsetHeight,this,pval);
	this.cell._cediton = true;
	this.val = this.cell.val;
	this._val = this.cell.innerHTML;
	// alert(this.cell.val);
	var t = this.grid._grid_calendarA.draw;
	this.grid._grid_calendarA.draw = function(){};
	this.grid._grid_calendarA.setDateFormat((this.grid._dtmask || "%Y-%m-%d"));
	this.grid._grid_calendarA.setDate(this.val||(new Date()));
	this.grid._grid_calendarA.draw = t;
	
	//this.grid._grid_calendarA.draw();
}
eXcell_vmdCalendar.prototype.getDate = function () {
	if (this.cell.val) return this.cell.val;
	return null;
}

eXcell_vmdCalendar.prototype.getValue = function () {
	if (this.cell._clearCell) return "";
	if (this.grid._dtmask_inc && this.cell.val) return this.grid._grid_calendarA.getFormatedDate(this.grid._dtmask_inc, this.cell.val).toString();
	return this.cell.innerHTML.toString()._dhx_trim()
}

eXcell_vmdCalendar.prototype.detach = function () {
	if (!this.grid._grid_calendarA) return;
	this.grid._grid_calendarA.hide();
	if (this.cell._cediton) this.cell._cediton = false; else return;
	
	if (this.grid._grid_calendarA._last_operation_calendar) {
	    var z1 = this.grid._grid_calendarA.getFormatedDate((this.grid._dtmask || "%Y-%m-%d"));
		var z2=this.grid._grid_calendarA.getDate();
		this.cell.val=new Date(z2);
		this.setCValue(z1,z2);
		this.cell._clearCell = !z1;
		var t = this.val;
		this.val = this._val;
		return (this.cell.val.valueOf()!=(t||"").valueOf());
	}
	return false;
}


eXcell_vmdCalendar.prototype.setValue = function (val) {
	
	if (val && typeof val == "object") {
		this.cell.val=val;
		this.cell._clearCell=false;
		this.setCValue(this.grid._grid_calendarA.getFormatedDate((this.grid._dtmask || "%Y-%m-%d"), val).toString(), this.cell.val);
		return;
	}
	
	if (!val || val.toString()._dhx_trim()=="") {
		val="&nbsp";
		this.cell._clearCell=true;
		this.cell.val="";
	} else{
		this.cell._clearCell=false;
		this.cell.val = new Date(this.grid._grid_calendarA.setFormatedDate((this.grid._dtmask_inc || this.grid._dtmask || "%Y-%m-%d"), val.toString(), null, true));
		if (this.grid._dtmask_inc)
		    val = this.grid._grid_calendarA.getFormatedDate((this.grid._dtmask || "%Y-%m-%d"), this.cell.val);
	}
	
	if ((this.cell.val=="NaN")||(this.cell.val=="Invalid Date")) {
		this.cell._clearCell=true;
		this.cell.val=new Date();
		this.setCValue("&nbsp;",0);
	} else {
		this.setCValue((val||"").toString(),this.cell.val);
	}
}


function eXcell_vmdCalendarA(cell) {
	if (cell) {
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
		this.hwReport = this.grid.hwReport;
		
		if (!this.grid._grid_calendarA) {
			
			var cal = this.grid._grid_calendarA = new dhtmlxCalendarObject();
			this.grid.callEvent("onDhxCalendarCreated",[cal]);
			
			var sgrid=this.grid;
			cal.attachEvent("onClick",function() {
				this._last_operation_calendar=true;
				window.setTimeout(function() {sgrid.editStop()},1);
				return true;
                    	});
                    	
                    	var zFunc=function(e) { (e||event).cancelBubble=true;  }
                    	dhtmlxEvent(cal.base,"click",zFunc);
                }      
	}
}
eXcell_vmdCalendarA.prototype = new eXcell;

eXcell_vmdCalendarA.prototype.edit = function () {

    var oCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
    var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);
    var format = cellType.format;

    //存在时间
    if (format.indexOf("%H") != -1 || format.indexOf("%i") != -1) {
        this.grid._grid_calendarA.showTime();
    }
    else {
        this.grid._grid_calendarA.hideTime();
    }

    this.grid._grid_calendarA._show(false, false);

    var s = window.dhx4.screenDim();
    var bh = this.grid._grid_calendarA.base.offsetHeight;
    var bw = this.grid._grid_calendarA.base.offsetWidth;

    var cellBoundingRect = this.cell.getBoundingClientRect();
    var top = cellBoundingRect.top + cellBoundingRect.height;
    var left = cellBoundingRect.left;
    if ((top + bh) > s.bottom) {
        top = cellBoundingRect.top - bh;
    }
    if ((left + bw) > s.right) {
        left = cellBoundingRect.left - (bw - cellBoundingRect.width);
    }

	this.grid._grid_calendarA.setPosition(left, top);
	this.grid.callEvent("onCalendarShow",[this.grid._grid_calendarA,this.cell.parentNode.idd,this.cell._cellIndex]);
	this.grid._grid_calendarA._last_operation_calendar=false;
	
	this.cell._cediton=true;
	this.val=this.cell.val;
	this._val=this.cell.innerHTML;
	
	var t = this.grid._grid_calendarA.draw;
	this.grid._grid_calendarA.draw = function () { };
	this.grid._grid_calendarA.setDateFormat((this.grid._dtmask || "%Y-%m-%d"));
	this.grid._grid_calendarA.setDate(this.val);
	this.grid._grid_calendarA.draw=t;
	
	this.base = document.createElement("DIV");
	this.base.className = "dhxcombo_material";
	this.base.style.width = this.cell.clientWidth + "px";
	this.base.innerHTML = "<input type='text' class='dhxcombo_input' style='width:" + (this.cell.clientWidth - 24) + "px;" + "' autocomplete='off'>" +
				"<div class='dhxcombo_select_button'><div class='dhxcalendar_select_img'></div></div>";

	this.cell.innerHTML = ""
	this.cell.appendChild(this.base);

	this.base.firstChild.onselectstart = function (e) {
		if (!e) e=event;
		e.cancelBubble = true;
		return true;
	};
	this.base.firstChild.focus();
	
}

/**
 * 显示编辑器
 */
eXcell_vmdCalendarA.prototype.showEditor = function () {

    var originCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
    var cellType = this.hwReport.cellTypes.get(originCell.fillcelltype);

    this.base = document.createElement("DIV");
    this.base.className = "dhxcombo_material";
    this.base.style.width = this.cell.clientWidth + "px";
    this.base.innerHTML = "<input type='text' class='dhxcombo_input' style='width:" + (this.cell.clientWidth - 24) + "px;" + "' autocomplete='off'>" +
				"<div class='dhxcombo_select_button'><div class='dhxcalendar_select_img'></div></div>";

    this.cell.innerHTML = ""
    this.cell.appendChild(this.base);
   
    this.cell._editorshow = true;
}

eXcell_vmdCalendarA.prototype.getDate = function () {
	if (this.cell.val) return this.cell.val;
	return null;
}

eXcell_vmdCalendarA.prototype.getValue = function () {
	if (this.cell._clearCell) return "";
	if (this.grid._dtmask_inc && this.cell.val)
	    return this.grid._grid_calendarA.getFormatedDate(this.grid._dtmask_inc, this.cell.val).toString();

	if (this.cell._editorshow) {
	    return this.cell.firstChild.firstChild.value;
	}
	return this.cell.innerHTML.toString()._dhx_trim()
}

eXcell_vmdCalendarA.prototype.detach = function () {
    var oCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
    var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);
	if (!this.grid._grid_calendarA) return;
	this.grid._grid_calendarA.hide();
	if (this.cell._cediton) this.cell._cediton=false; else return;
	if (this.grid._grid_calendarA._last_operation_calendar) {
		this.grid._grid_calendarA._last_operation_calendar=false;
		var z1 = this.grid._grid_calendarA.getFormatedDate(cellType.format || this.grid._dtmask || "%Y-%m-%d");
		var z2=this.grid._grid_calendarA.getDate();
		this.cell.val = new Date(z2);
		if (this.cell._editorshow != true) {
		    this.setCValue(z1, z2);
		}
		this.cell._clearCell = !z1;
		var t = this.val;
		this.val=this._val;
		return (this.cell.val.valueOf()!=(t||"").valueOf());
	}
	if (this.cell._editorshow != true) {
	    this.setValue(this.obj.value);
	}
	
	var t = this.val;
	this.val = this._val;
	return (this.cell.val.valueOf()!=(t||"").valueOf());
}

eXcell_vmdCalendarA.prototype.setValue = function (val) {
    var oCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
    var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);
	if (val && typeof val == "object") {
		this.cell.val=val;
		this.cell._clearCell=false;
		this.setCValue(this.grid._grid_calendarA.getFormatedDate((cellType.format || this.grid._dtmask || "%Y-%m-%d"), val).toString(), this.cell.val);
		return;
	}
	
	if (!val || val.toString()._dhx_trim() == "") {
	    if (cellType.isdefultdate == "0") {
	        val = "&nbsp";
	        this.cell._clearCell = true;
	        this.cell.val = "";
	    }
	    else {
	        this.cell.val = new Date();
	        this.cell._clearCell = false;
	        val = this.grid._grid_calendarA.getFormatedDate((cellType.format || this.grid._dtmask || "%Y-%m-%d"), this.cell.val);
	    }
	} else {
		this.cell._clearCell = false;
		this.cell.val = new Date(this.grid._grid_calendarA.setFormatedDate((cellType.format || this.grid._dtmask_inc || this.grid._dtmask || "%Y-%m-%d"), val.toString(), null, true));
		if (this.grid._dtmask_inc)
		    val = this.grid._grid_calendarA.getFormatedDate((cellType.format || this.grid._dtmask || "%Y-%m-%d"), this.cell.val);
	}
	
	if ((this.cell.val=="NaN")||(this.cell.val=="Invalid Date")) {
		this.cell.val=new Date();
		this.cell._clearCell=true;
		this.setCValue("&nbsp;",0);
	} else {
		this.setCValue((val||"").toString(),this.cell.val);
	}
}

