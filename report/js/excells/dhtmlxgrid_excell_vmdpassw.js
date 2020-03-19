/*
Product Name: dhtmlxSuite 
Version: 4.0 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact 
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

function eXcell_vmdpassw(cell) {
    var that = this;
	if (cell){
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
		this.hwReport = this.grid.hwReport;
		var originCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
		this.cellType = this.hwReport.cellTypes.get(originCell.fillcelltype);

		if (!this.cell.DOMelem_input) {
		    this.cell.atag = "INPUT";
		    this.cell.DOMelem_input = document.createElement(this.cell.atag);
		    this.cell.DOMelem_input.setAttribute("autocomplete", "off");

		    this.cell.DOMelem_input.className = "dhx_combo_edit";
		    this.cell.DOMelem_input.type = "password";
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

	this.edit = function(){
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
	    var val = this.getValue();
	    this.cell.DOMelem_input.onclick = null;
	    this.cell.DOMelem_input.style.width = this.cell.clientWidth + "px";
	    this.cell.DOMelem_input.value = val;
	    this.cell.innerHTML = ""
	    this.cell.appendChild(this.cell.DOMelem_input);
	    this.cell._editorshow = true;
	}

	this.getValue = function(){
        return this.cell._rval;
	}
	this.setValue = function(val){
	    var str = "******";
	    if (this.cell._editorshow) {
	        this.cell.DOMelem_input.value = val;
	    }
	    else {
	        this.cell.innerHTML = str;
	    }
	    this.cell._rval = val;

	    this.grid.callEvent("onCellChanged", [
            this.cell.parentNode.idd,
            this.cell._cellIndex,
            this.cell._clearCell ? "" : val
	    ]);
	}

	this.detach = function(){
	    this.cell.DOMelem_input.className = this.cell.DOMelem_input.className.replace(/dhxcombo_actv/g, "");
	    this.cell.className = this.cell.className.replace(new RegExp(this.hwReport.reportId + "-p-0", "gi"), " ");
	    var tv = this.cell.DOMelem_input.value;
	    this.setValue(tv);
	    return this.val != this.getValue();
	}

}
eXcell_vmdpassw.prototype = new eXcell;
//(c)dhtmlx ltd. www.dhtmlx.com