/*
Product Name: dhtmlxSuite 
Version: 5.0.8 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

dhx4.attachEvent("onGridCreated", function (grid) {
    if (!window.dhx_globalImgPath) window.dhx_globalImgPath = grid.imgURL;

    var hwReport = grid.hwReport;
    if (!hwReport) {
        return;
    }

    for (var key in hwReport._cell_grids) {
        if (!hwReport._cell_grids[key].obj) {
            hwReport._cell_grids[key].obj = hwReport._cell_grids[key].init(grid);
        }
    }

    if (!hwReport._loading_handler_set_grid) {
        hwReport._loading_handler_set_grid = hwReport.attachEvent("onStoreSuccess", function (_store) {
            if (_store.grids) {
                for (var i = 0; i < _store.grids.length; i++) {
                    eXcell_vmdgrid.prototype.fillCellCombos(hwReport, _store.grids[i]);
                }
            }
        });
    }
});

function eXcell_vmdgrid(cell) {
    
    if (cell) {
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
        this.hwReport = this.grid.hwReport;

        this.cellType = this.hwReport._cell_grids[this.cell._attrs.sid];
        this.subgrid = this.cellType.obj;

        if (this.grid._disabled || this.isDisabled()) {
            this.subgrid.DOMelem_input.setAttribute("readonly", "readonly");
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
            if (this.cell.firstChild && this.cell.firstChild.firstChild && this.cell.firstChild.firstChild.firstChild) {
                this.cell.firstChild.firstChild.firstChild.setAttribute("readonly", "readonly");
            }
            this.subgrid.DOMelem_input.setAttribute("readonly", "readonly");
        }
        else {
            if (this.cell.firstChild && this.cell.firstChild.firstChild && this.cell.firstChild.firstChild.firstChild) {
                this.cell.firstChild.firstChild.firstChild.removeAttribute("readonly");
            }
            this.subgrid.DOMelem_input.removeAttribute("readonly");
        }
    }

    this.edit = function () {
        var that = this;
        this.val = this.cell.combo_value;
        var text = this.getText();

        if (!/dhxcombo_actv/g.test(this.subgrid.DOMelem.className)) {
            this.subgrid.DOMelem.className += " dhxcombo_actv";
        }
        if (!this.cell._editorshow) {
            this.cell.className += " " + this.hwReport.reportId + "-p-0";
        }
        this.cell.innerHTML = "";

        this.subgrid.DOMParent.firstChild && (this.subgrid.DOMParent.firstChild.style.width = this.cell.clientWidth + "px");
        this.subgrid.DOMelem_input.style.width = (this.cell.clientWidth - 21) + "px";
        this.cell.appendChild(this.subgrid.DOMParent);
        
        this.subgrid.DOMelem_input.focus();
        this.subgrid.entBox.style.display = 'block';
        this.subgrid.entBox.style.zIndex="99";


        var top = (this.subgrid.DOMParent.clientHeight - this.subgrid.DOMelem.clientHeight) / 2;
        if (top < 1) {
            top = 0;
        }
        this.subgrid.DOMelem.style.top = top + "px";

        var s = window.dhx4.screenDim();
        var bh = this.subgrid.entBox.offsetHeight;
        //var bw = this.subgrid.entBox.offsetWidth;
        var bw = this.cell.clientWidth * this.cellType.percentWidth;

        var cellBoundingRect = this.cell.getBoundingClientRect();
        var top = cellBoundingRect.top + cellBoundingRect.height;
        var left = cellBoundingRect.left;
        if ((top + bh) > s.bottom) {
            top = cellBoundingRect.top - bh;
        }
        if ((left + bw) > s.right) {
            left = cellBoundingRect.left - (bw - cellBoundingRect.width);
        }

        this.subgrid.entBox.style.top = top + "px";
        this.subgrid.entBox.style.left = (left - 1) + "px";
        this.subgrid.entBox.style.width = bw + "px";
        this.subgrid.entBox.style.position = "absolute";
        this.subgrid.setSizes();
        var a = this.grid.editStop;
        this.grid.editStop = function () { };

        function setComboValue() {
            if (that.cellType.ismulti) {
                var combo_values = (that.cell.combo_value || "").split(that.cellType.seperator);
                var combo_texts = [];
                //取消选择
                for (var a in that.subgrid.rowsAr) {
                    var row = that.subgrid.rowsAr[a];
                    if (row && row.idd) {
                        var cellObj = that.subgrid.cells(a, 0);
                        if (cellObj.isCheckbox()) {
                            cellObj.setValue(0);
                        }
                        row.className = row.className.replace(" rowselected", "");
                    }
                }

                for (var i = 0; i < combo_values.length; i++) {
                    var row = that.subgrid.getRowById(combo_values[i]);
                    if (row) {
                        var checkCellObj = that.subgrid.cells(combo_values[i], 0);
                        var cellObj = that.subgrid.cells(combo_values[i], that.subgrid.getSubGridShowIndex());

                        checkCellObj.setChecked(true);
                        if (!/rowselected/g.test(row.className)) {
                            row.className += " rowselected";
                        }
                        that.subgrid.showRow(combo_values[i]);
                        combo_texts.push(cellObj.getValue());
                    }
                }
                that.subgrid.DOMelem_input.value = combo_texts.join(that.cellType.seperator);
                that.subgrid._is_checked_all_col0 = that.subgrid._is_checked_all_col0 == undefined ? that.subgrid.isCheckedAll(0) : that.subgrid._is_checked_all_col0;
                if (that.subgrid._is_checked_all_col0) {
                    that.subgrid.DOMelem_check_all.src = that.subgrid.DOMelem_check_all.src.replace("item_chk0.gif", "item_chk1.gif");
                }
                else {
                    that.subgrid.DOMelem_check_all.src = that.subgrid.DOMelem_check_all.src.replace("item_chk1.gif", "item_chk0.gif");
                }
            }
            else {
                that.subgrid.clearSelection();
                if (that.subgrid.getRowById(that.cell.combo_value))
                    that.subgrid.setSelectedRow(that.cell.combo_value);

                that.subgrid.DOMelem_input.value = text;
            }
        }

        setComboValue();

        this.subgrid.setActive(true)
        
        var cellType = this.hwReport._cell_grids[this.cell._attrs.sid];
        var conditions = cellType && cellType.bindsource && cellType.bindsource.conditions;
        if (conditions && conditions.length > 0) {
            this.subgrid.filterByDataStore(function (item, value) {
                for(var i = 0; i < conditions.length; i++){
                    if (item[conditions[i]["field"]] != that.hwReport.getValue(conditions[i]["value"], that)) {
                        return false;
                    }
                    return true;
                }
            });
            setComboValue();
        }
        else if (this.subgrid.rptStore) {
            this.subgrid.rptStore.update(function () {
                setComboValue()
            }, function () { });
        }

        this.grid.editStop = a;
        
    }

    /**
    * 显示编辑器
    */
    this.showEditor = function () {
        var that = this;
        var val = this.getText();
        this.cell.innerHTML = ""
        this.subgrid.DOMelem.style.width = this.cell.clientWidth + "px";
        this.subgrid.DOMelem_input.style.width = (this.cell.clientWidth - 24) + "px";
        this.subgrid.DOMelem_input.value = val;
        this.cell.appendChild(this.subgrid.DOMParent);
        this.subgrid.DOMelem.style.top = (this.subgrid.DOMParent.clientHeight - this.subgrid.DOMelem.clientHeight) / 2 + "px";

        this.cell._editorshow = true;

        this.grid.attachEvent("onSetSizes", function () {
            if (that.cell.firstChild && that.cell.firstChild.firstChild) {
                that.cell.firstChild.firstChild.style.width = that.cell.clientWidth + "px";
                that.cell.firstChild.firstChild.firstChild.style.width = (that.cell.clientWidth - 24) + "px";
            }

            that.subgrid.DOMelem.style.width = that.cell.clientWidth + "px";
            that.subgrid.DOMelem_input.style.width = (that.cell.clientWidth - 24) + "px";
        });
    }

    this.getValue = function () {
        return this.cell.combo_value || "";
    }

    this.getText = function (val) {
        var c = this.cell;
        if (c._editorshow) {
            return c.firstChild.firstChild.firstChild.value;
        }
        return (_isIE ? c.innerText : c.textContent);
    }

    this.setValue = function (val) {
        var that = this;
        this.cell.combo_value = val;

        if (this.cellType.ismulti) {
            var vals = (val || "").split(this.cellType.seperator);
            var texts = [];
            var _hasValueIngrid = false;
            for (var i = 0; i < vals.length; i++) {
                var tmpText = this.subgrid.getRowById(vals[i]) && this.subgrid.cells(vals[i], this.subgrid.getSubGridShowIndex());
                tmpText = tmpText && tmpText.getValue();
                if (!tmpText && this.subgrid.rule && this.subgrid.rptStore) {
                    tmpText = this.subgrid.rptStore.find(function (item) {
                        return item[that.subgrid.rule['value']] + "" == vals[i] + ""
                    });
                    tmpText = tmpText && tmpText[this.subgrid.rule['text']];
                }
                if (tmpText != null) {
                    _hasValueIngrid = true;
                }
                texts.push(tmpText || "");
            }
            var tmpVal = _hasValueIngrid ? texts.join(this.cellType.seperator) : "";
            if (tmpVal) {
                val = tmpVal;
            }
            else if (this.cellType && this.cellType.noValueClear) {
                val = "&nbsp;"
            }
        }
        else {
            if (this.subgrid.getRowById(val)) {
                val = this.subgrid.cells(val, this.subgrid.getSubGridShowIndex());
                if (val) val = val.getValue();
                else val = "";
            }
            else if (this.subgrid.rule && this.subgrid.rptStore) {
                tmpVal = this.subgrid.rptStore.find(function (item) {
                    return item[that.subgrid.rule['value']] + "" == val + ""
                });
                val = (tmpVal && tmpVal[this.subgrid.rule['text']]) || val;
            }
        }

        this.setComboCValue((val || "&nbsp;"), this.cell.combo_value);
    }

    this.detach = function () {
        var that = this;
        var val = this.cell.combo_value;
        this.cell.className = this.cell.className.replace(new RegExp(this.hwReport.reportId + "-p-0", "gi"), " ");
        this.subgrid.DOMelem.className = this.subgrid.DOMelem.className.replace(/dhxcombo_actv/g, "");

        if (!this.subgrid) return;
        this.subgrid.entBox.style.display = 'none';
        if (this.cellType.ismulti) {
            var checkIds = this.subgrid.getCheckedRowsAr(0);
            var checkedTexts = checkIds.map(function (v) {
                var cellObj = that.subgrid.cells(v, that.subgrid.getSubGridShowIndex());
                return (cellObj && cellObj.getValue()) || "";
            });
            if (checkedTexts.length == 0) {
                this.setComboCValue("&nbsp;", "");
                this.cell._clearCell = true;
            }
            else {
                this.setComboCValue(checkedTexts.join(this.cellType.seperator), checkIds.map(function (v) {return v.replace(/__\d+__/,"") }).join(this.cellType.seperator));
                this.cell._clearCell = false;
            }
            this.cell.combo_value = checkIds.map(function (v) { return v.replace(/__\d+__/, "") }).join(this.cellType.seperator);
        }
        else {
            var selectedId = this.subgrid.getSelectedId();
            var cellObj = selectedId && (that.subgrid.getSubGridShowIndex() || that.subgrid.getSubGridShowIndex() == 0) && that.subgrid.cells(selectedId, that.subgrid.getSubGridShowIndex());
            if (cellObj && cellObj.getValue()) {
                this.setComboCValue(cellObj.getValue(), selectedId.replace(/__\d+__/,""));
                this.cell._clearCell = false;
            }
            else {
                this.setComboCValue("&nbsp;", "");
                this.cell._clearCell = true;
            }
            this.cell.combo_value = selectedId && selectedId.replace(/__\d+__/,"");
        }

        if (that.subgrid.datastore) {
            that.subgrid.filterByDataStore(function (item, value) {
                return true;
            });
        }

        //this.grid.setActive(true)
        return this.cell.combo_value != val;
    }
}

eXcell_vmdgrid.prototype = new eXcell;
eXcell_vmdgrid.prototype.init = function (index) {
    
    var container = document.createElement("DIV");
    container.style.display = "none";
    container.style.zIndex = 99999;
    document.body.appendChild(container);
    container.className = "dhxgrid_in_grid_parent";
    var subgrid = new dhtmlXGridObject(container);

    subgrid.DOMParent = document.createElement("DIV");
    subgrid.DOMParent.className = "dhxcombo_in_grid_parent";
    subgrid.DOMParent.innerHTML = "<div class='dhxcombo_material'><input type='text' class='dhxcombo_input' autocomplete='off'>" +
            "<input type='hidden' value=''>" + // value
            "<input type='hidden' value='false'>" + // new_value
            "<div class='dhxcombo_select_button'><div class='dhxcombo_select_img'></div></div></div>";

    subgrid.DOMelem = subgrid.DOMParent.firstChild;
    subgrid.DOMelem_input = subgrid.DOMParent.firstChild.firstChild;

    var that = this;
    subgrid.subgridcelltype = this.cellType;
    this.grid.attachEvent("onScroll", function () {
        subgrid.entBox.style.display = 'none';
    });
    subgrid.entBox.onclick = function (event) { (event || window.event).cancelBubble = true; return false; }
    subgrid.attachEvent("onRowSelect", function (id) {
        //携带
        var multicolumns = that.cellType && that.cellType.bindsource && that.cellType.bindsource.multicolumns;
        if(multicolumns){
            for (var i = 0; i < multicolumns.length; i++) {
                var cellId = multicolumns[i].cellid;
                if (!cellId) {
                    continue;
                }
                var value = subgrid.cells(id, i).getValue();
                var targetCell = that.grid.hwReport.getCells(cellId);
                if (targetCell && targetCell.length == 1) {
                    var oValue = targetCell[0].getValue();
                    targetCell[0].setValue(value);

                    that.grid.callEvent("onEditCell", [
                        2,
                        targetCell[0].cell.parentNode.idd,
                        targetCell[0].cell._cellIndex,
                        value,
                        oValue
                    ]);
                }
            }
        }
        var isFirst = this._lastSelectTime == undefined ? true : false;
        this._lastSelectTime = this._lastSelectTime || new Date().valueOf();
        var currentTime = new Date().valueOf();
        var distance = currentTime - this._lastSelectTime;
        this._lastSelectTime = currentTime;
        if (that.__isEditStop == false) {
            if (isFirst || distance > 500) {
                that.__isEditStop = true;
            }
        }
        else {
            that.grid.editStop();
        }
        return true;
    });

    subgrid.attachEvent("onCheck", function (rId, cInd, state) {
        var checkIds = subgrid.getCheckedRowsAr(0);
        var checkedTexts = checkIds.map(function (v) {
            var cellObj = subgrid.cells(v, subgrid.getSubGridShowIndex());
            return (cellObj && cellObj.getValue()) || "";
        });
        subgrid.DOMelem_input.value = checkedTexts.join(that.cellType.seperator);

        var row = subgrid.getRowById(rId);
        if (state) {
            row.className += " rowselected";
            subgrid._is_checked_all_col0 = subgrid.isCheckedAll(0);
            if (subgrid._is_checked_all_col0) {
                subgrid.DOMelem_check_all.src = subgrid.DOMelem_check_all.src.replace("item_chk0.gif", "item_chk1.gif");
            }
        }
        else {
            subgrid._is_checked_all_col0 = false;
            row.className = row.className.replace(/ rowselected/g, "");
            subgrid.DOMelem_check_all.src = subgrid.DOMelem_check_all.src.replace("item_chk1.gif", "item_chk0.gif");
        }
    });

    subgrid.attachEvent("onXLE", function (grid_obj, count) {
        if (that.cellType.ismulti) {
            var checkCell = this.hdr.rows[1].cells[0];
            checkCell.firstChild.innerHTML = "<img src='" + this.imgURL + "item_chk0.gif' />";
            subgrid.DOMelem_check_all = checkCell.firstChild.firstChild;

            subgrid.DOMelem_check_all.onclick = function (e) {
                //执行选中操作
                if (/item_chk0.gif/g.test(this.src)) {
					var data=subgrid.rptStore.dhtmlxDatastore;
					var count=data.dataCount();
					for(var i=0;i<count;i++){
						var id=data.idByIndex(i);
						var item1=data.item(id);
						item1.chkid="1";	
					}
					data.refresh();
                    var checkedTexts = [];
                    for (var a in subgrid.rowsAr) {
                        var row = subgrid.rowsAr[a];
                        if (row && row.idd) {
                            var cellObj = subgrid.cells(a, 0);
                            if (cellObj.isCheckbox()) {
                                cellObj.setValue(1);
                            }
                            checkedTexts.push(subgrid.cells(a, subgrid.getSubGridShowIndex()).getValue());
                            if (!/rowselected/g.test(row.className)) {
                                row.className += " rowselected";
                            }
                        }
                    }
                    
                    this.src = this.src.replace("item_chk0.gif", "item_chk1.gif");
                    subgrid._is_checked_all_col0 = true;
					subgrid.DOMelem_input.value = checkedTexts.join(that.cellType.seperator);
					checkCell.firstChild.innerHTML = "<img src='" + this.src + "' />";
					subgrid.DOMelem_check_all = checkCell.firstChild.firstChild;
					subgrid.DOMelem_check_all.onclick=this.onclick;
                }
                else {
					var data=subgrid.rptStore.dhtmlxDatastore;
					var count=data.dataCount();
					for(var i=0;i<count;i++){
						var id=data.idByIndex(i);
						var item1=data.item(id);
						item1.chkid=undefined;
						//data.update(id,item1);
					}
					data.refresh();
                    for (var a in subgrid.rowsAr) {
                        var row = subgrid.rowsAr[a];
                        if (row && row.idd) {
                            var cellObj = subgrid.cells(a, 0);
                            if (cellObj.isCheckbox()) {
                                cellObj.setValue(0);
                            }
                            row.className = row.className.replace(" rowselected","");
                        }
                    }

                    this.src = this.src.replace("item_chk1.gif", "item_chk0.gif");
                    subgrid._is_checked_all_col0 = false;
					subgrid.DOMelem_input.value = "";
					checkCell.firstChild.innerHTML = "<img src='" + this.src + "' />";
					subgrid.DOMelem_check_all = checkCell.firstChild.firstChild;
					subgrid.DOMelem_check_all.onclick=this.onclick;
					
				}
				e.stopPropagation(); 
            }
        }
    });

    function _doOnInputKeyUp(e) {
        if (e.keyCode == 9 || e.keyCode == 13 ||
            e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 ||
            e.ctrlKey || e.shiftKey || e.altKey) return;

        var filterValue = dhx.trim(subgrid.DOMelem_input.value);
        subgrid.filterByDataStore(function (item, value) {
            if (filterValue == "") {
                return true;
            }
            
            if (item[subgrid.rule.value].toString().indexOf(filterValue) != -1 || item[subgrid.rule.text].toString().indexOf(filterValue) != -1) {
                return true;
            }
            return false;
        });
    }

    function _doOnInputKeyDown(e) {
        e = e || event;

        // console.log("onkeypress ", e.keyCode, " ", e.charCode)

        // up (38) /down (40)
        if ((e.keyCode == 38 || e.keyCode == 40) && !e.ctrlKey && !e.shiftKey && !e.altKey) {
            if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
            e.cancelBubble = true;
            var dataCursor = e.keyCode == 40 ? 0 : (subgrid.getRowsNum() - 1);
            that.__isEditStop = false;
            if (!subgrid.getSelectedRowId()) {
                subgrid.selectRow(dataCursor, true, false, true);
            }
            else {
                subgrid.doKey(e);
            }
        }

        // F2
        if (e.keyCode == 113) {
           
        }

        // esc
        if (e.keyCode == 27) {
           
        }

        // enter
        if (e.keyCode == 13) {
            if (e.preventDefault) e.preventDefault(); // if combo attached to form
            e.cancelBubble = true;
            that.__isEditStop = false;
            subgrid.callEvent("onRowSelect", [
								subgrid.getSelectedRowId(),
								0
            ]);
            that.grid.callEvent("onKeyPress", [e.keyCode || e.charCode, e.ctrlKey, e.shiftKey]);
        }

    }

    function _doOnInputKeyPress(e) {
        e = e || event;
        //that.grid.callEvent("onKeyPress", [e.keyCode || e.charCode, e.ctrlKey, e.shiftKey]);
    }

    function _doOnInputFocus(e) {

    }

    function _doOnInputBlur(e) {

    }

    function _doOnBodyMouseDown(e) {

    }

    function _doOnBaseMouseDown(e) {
        e = e || event;
        e.cancelBubble = true;
    }

    var evs_nodes = [
		{ node: document.body, evs: { mousedown: "_doOnBodyMouseDown" } },
		{ node: subgrid.DOMParent, evs: { mousedown: "_doOnBaseMouseDown" } },
		{ node: subgrid.DOMelem_input, evs: { keyup: "_doOnInputKeyUp", keydown: "_doOnInputKeyDown", keypress: "_doOnInputKeyPress", focus: "_doOnInputFocus", blur: "_doOnInputBlur" } }
    ];
    for (var q = 0; q < evs_nodes.length; q++) {
        for (var a in evs_nodes[q].evs) {
            if (typeof (window.addEventListener) == "function") {
                evs_nodes[q].node.addEventListener(a, eval(evs_nodes[q].evs[a]), false);
            } else {
                evs_nodes[q].node.attachEvent("on" + a, eval(evs_nodes[q].evs[a]));
            }
        }
    }

    subgrid._chRRS = false;

    return subgrid;

};

eXcell_vmdgrid.prototype.fillCellCombos = function (hwReport, cellId) {
    var grid = hwReport.grid;
    var oCell = hwReport.getOriginCellById(cellId);

    if (hwReport.bindDatastore) {
        for (var i = 0; i < grid.rowsCol.length; i++) {
            var cellObj = grid.cells3(grid.rowsCol[i], oCell.index);
            cellObj.refreshCell && cellObj.refreshCell();
        }
    }
    else {
        for (var i = 0; i < oCell.childs.length; i++) {
            var cellObj = grid.cells.apply(grid, oCell.childs[i].split("_"));
            cellObj.refreshCell && cellObj.refreshCell();
        }
    }
};

eXcell_vmdgrid.prototype.setComboCValue = function (value, value2) {

    if (this.cell._editorshow) {
        this.cell.innerHTML = this.subgrid.DOMParent.outerHTML;
        this.cell.firstChild.firstChild.firstChild.value = (value == "&nbsp;" ? "" : value);
        this.grid.callEvent("onCellChanged", [
            this.cell.parentNode.idd,
            this.cell._cellIndex,
            value2
        ]);
    }
    else {
        //this.setCValue(value, value2);
    
    //IE下的兼容
    var oldsubgridhtml;
    if(dhx.isIE)  oldsubgridhtml=this.subgrid.DOMParent.innerHTML;
    
        this.setCValue(value, value2);
    
    if(dhx.isIE && oldsubgridhtml){
      this.subgrid.DOMParent.innerHTML=oldsubgridhtml;
        this.subgrid.DOMParent.firstChild.firstChild.value=(value == "&nbsp;" ? "" : value);
    }

    }
};

eXcell_vmdgrid.prototype.refreshCell = function () {
    this.setValue(this.getValue());
};

dhtmlXGridObject.prototype.getSubGridShowIndex = function () {

    var cellType = this.subgridcelltype;
    var showColumn = cellType.bindsource.showcolumn;
    if (!showColumn) return;
    var index = this.columnIds.indexOf(showColumn.toLowerCase());
    return index;
}

dhtmlXGridObject.prototype.getCheckedRowsAr = function (col_ind) {
    var d = new Array();
    this.forEachRow(function (id) {
        var cell = this.cells(id, col_ind);
        if (cell.changeState && cell.getValue() != 0)
            d.push(id);
    },true);
    return d;
}