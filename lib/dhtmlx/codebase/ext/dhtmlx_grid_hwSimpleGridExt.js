function eXcell_hwSimpleGridLink(cell) {

	this.cell = cell;
	this.grid = this.cell.parentNode.grid;
	this.isDisabled = function() {
		return true;
	}
	this.edit = function() {}
	this.getValue = function() {
		
		return this.cell._value||"";
	}
	//20160706 liuyuhui 修复超链接字段打印预览显示undefined的问题
	this.getText = function() {
		if(this.cell.firstChild.getAttribute) {
			//20161103 liuyuhui 修复ie兼容模式下获取不到text的情况
			return this.cell.firstChild.text || this.cell.firstChild.innerText;
		} else
			return "";
	}
	this.setValue = function(val) {
		this.cell._value = val;
		var inCellIndex = this.cell.cellIndex;
		var inRowId = this.cell.parentNode.idd;
		var inGrid = this.grid;
		var inCell = this;
		var cell = this.cell;
		var cval = val
		if(inGrid._getSimpleGridShowValue && this.grid._simpleGridShowValue && this.grid._simpleGridShowValue[this.cell._cellIndex])
			cval = inGrid._getSimpleGridShowValue(this.cell._cellIndex, this.grid.getRowIndex(inRowId), this.grid._simpleGridShowValue[this.cell._cellIndex], val,inCell);
		else
			cval = val || this.grid._linkValue[this.cell._cellIndex]
	
		this.setCValue("<a href=\"javascript:void(0)\" >" + cval + "</a>", cval);
		this.dhx_link_func = this.grid.getLinkFunction(this.cell._cellIndex);
		try {
			if(this.grid._fake && this.grid._fake.cells(inRowId, inCellIndex)) {
				window.setTimeout(function() {
					var row = inGrid._fake.rowsAr[inRowId];
					var cell = row.childNodes[inCellIndex];
					clickEvent(cell);
				}, 10)
			}
		} catch(e) {}
		var clickEvent = function(cell) {
			try {
				if(cell.firstChild) {
					cell.firstChild.onclick = function(e) {
						(e || event).cancelBubble = true;
						//20160715 liuyuhui 添加点击网格超链接选中超链接在网格中的当前行
						inGrid.selectRowById && inGrid.selectRowById(inCell.cell.parentNode.idd);
						inGrid.callEvent("onSimpleGridLinkClick", [inCell.dhx_link_func, inCell, inCell.cell.parentNode.idd, inCell.cell._cellIndex, val]);
					}
				}
			} catch(e) {}
		}
		clickEvent(cell);
	}
}

eXcell_hwSimpleGridLink.prototype = new eXcell;
dhtmlXGridObject.prototype.getLinkFunction = function(index) {
	if(this._linkfna) return this._linkfna[index];
	else return(function() {});
}
dhtmlXGridObject.prototype.setLinkFunction = function(index, func) {
	if(!this._linkfna) this._linkfna = new Array();

	this._linkfna[index] = func;
}
dhtmlXGridObject.prototype.setLinkValue = function(index, value) {
	if(!this._linkValue) this._linkValue = new Array();
	if(typeof index == "number")
		this._linkValue[index] = value;
	if(typeof index == "string")
		this._linkValue[this.getColIndexById(index)] = value;
}

function eXcell_hwSimpleGridTxt(cell) {

	this.cell = cell;
	this.grid = this.cell.parentNode.grid;
	this.isDisabled = function() {
		return true;
	}
	this.edit = function() {

	}
	this.getValue = function() {
		return this.cell._value || "";
	}

	this.getText = function() {
		var c = this.cell;
		if(c.childNodes[1]) {
			c = c.childNodes[1];
		} else {
			c.childNodes[0].childNodes[1];
		}
		return(_isIE ? c.innerText : c.textContent);
	}

	this.setValue = function(val) {

		this.cell._value = val;
		var showVal = "";
		var inCellIndex = this.cell.cellIndex;
		var inRowId = this.cell.parentNode.idd;
		var inGrid = this.grid;
		var inCell = this;
		var cell = this.cell;
		//if(inGrid._simpleGridShowValue[inCellIndex]&&inGrid._getSimpleGridShowValue)
		if(inGrid._getSimpleGridShowValue) {
			showVal = inGrid._getSimpleGridShowValue(this.cell._cellIndex, this.grid.getRowIndex(inRowId), this.grid._simpleGridShowValue[this.cell._cellIndex], val,inCell); //inGrid._simpleGridShowValue[inCellIndex])
		}
		val = showVal || val;
		if(!val || val.toString()._dhx_trim() == "") {
			this.setCValue("&nbsp;", val);
			return(this.cell._clearCell = true);
		}
		this.setCValue(val, val);
	}
}

eXcell_hwSimpleGridTxt.prototype = new eXcell;

dhtmlXGridObject.prototype.setSimpleGridShowValue = function(index, value) {
	if(!this._simpleGridShowValue) this._simpleGridShowValue = new Array();
	if(typeof index == "number")
		this._simpleGridShowValue[index] = value;
	if(typeof index == "string")
		this._simpleGridShowValue[this.getColIndexById(index)] = value;
}