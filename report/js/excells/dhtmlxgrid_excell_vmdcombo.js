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

    for (var key in hwReport._cell_combos) {
        var cellType = hwReport._cell_combos[key];
        if (!cellType.obj) {
            cellType.obj = cellType.init(grid);
        }
    }

    if (!hwReport._loading_handler_set_combo) {
        hwReport._loading_handler_set_combo = hwReport.attachEvent("onStoreSuccess", function (_store) {
            if (_store.combos) {
                for (var i = 0; i < _store.combos.length; i++) {
                    eXcell_vmdcombo.prototype.fillCellCombos(hwReport, _store.combos[i]);
                }
            }
        });
    }
});

function eXcell_vmdcombo(cell) {
	
	if (!cell) return;
	
	this.cell = cell;
	this.grid = cell.parentNode.grid;
	this._combo_pre = "";

	this.hwReport = this.grid.hwReport;
	this.cellType = this.hwReport._cell_combos[this.cell._attrs.sid];
	this.combo = this.cellType.obj;

	if (this.grid._disabled || this.isDisabled()) {
	    this.combo.DOMelem_input.setAttribute("readonly", "readonly");
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
	        this.combo.DOMelem_input.setAttribute("readonly", "readonly");
	    }
	    else {
	        if (this.cell.firstChild && this.cell.firstChild.firstChild && this.cell.firstChild.firstChild.firstChild) {
	            this.cell.firstChild.firstChild.firstChild.removeAttribute("readonly");
	        }
	        this.combo.DOMelem_input.removeAttribute("readonly");
	    }
	}

	this.edit = function(){
		if (!window.dhx_globalImgPath) window.dhx_globalImgPath = this.grid.imgURL;
		var that = this;

		this.val = this.getValue();
		var val = this.getText();
		this.cell.innerHTML = "";

		if (!this.cell._editorshow) {
		    this.cell.style.padding = "0px";
		}
		
		this.cell.appendChild(this.combo.DOMParent);

		this.combo.DOMParent.style.margin = "0";
		this.combo.DOMelem_input.focus();
		this.combo.base.style.width = this.cell.clientWidth + "px";
		this.combo.base.firstChild.style.width = (this.cell.clientWidth - (this.combo.conf.i_ofs + 1)) + "px";
		this.combo.DOMelem.style.top = (this.combo.DOMParent.clientHeight - this.combo.DOMelem.clientHeight) / 2 + "px";
		//this.combo.base.firstChild.style.marginLeft = (this.conf.combo_image ? this.conf.i_ofs + "px" : "0px");
		//this.combo.base.style.paddingBottom = "0px";
	    //this.combo.base.style.borderBottom = "0px solid #dfdfdf";
		this.combo.conf.combo_width = this.cell.clientWidth * this.cellType.percentWidth;

		function setComboValue(val) {
            //下拉框多选
		    if (that.cellType.ismulti) {
		        var combo_values = (that.cell.combo_value || "").split(that.cellType.seperator);
		        var combo_texts = [];

		        if (that.combo.conf.last_hover != null) {
		            that.combo.t[that.combo.conf.last_hover].obj.setSelected(that.combo.t[that.combo.conf.last_hover].item, false);
		            that.combo.conf.last_hover = null;
		        }
		        that.combo.base.firstChild.value = "";
		        //if (that.combo.conf.f_mode != false) {
		        //    that.combo._filterOpts(true);
		        //}

		        that.combo.forEachOption(function (optId) {
		            that.combo.setChecked(optId.index, false);
		        });

		        for (var i = 0; i < combo_values.length; i++) {
		            var option = that.combo.getOption(combo_values[i]);
		            if (option) {
		                that.combo.setChecked(option.index, true);
		                that.combo.selectOption(option.index);
		                combo_texts.push(option.text);
		            }
		        }
		        that.combo.DOMelem_input.value = combo_texts.join(that.cellType.seperator);
		    }
		    else {
		        if (that.combo.getIndexByValue(that.cell.combo_value) != -1) {
		            that.combo.selectOption(that.combo.getIndexByValue(that.cell.combo_value));
		        } else {
		            if (that.combo.getOptionByLabel(val)) {
		                that.combo.selectOption(that.combo.getIndexByValue(that.combo.getOptionByLabel(val).value));
		            } else {
		                that.combo.unSelectOption();
		            }
		        }
		        that.combo.DOMelem_input.value = val;
		    }
		}

		setComboValue(val);

		var conditions = this.cellType && this.cellType.bindsource && this.cellType.bindsource.conditions;
        //条件过滤
		if (conditions && conditions.length > 0) {
		    this.combo.filterByDataStore(function (item, value) {
		        for(var i = 0; i < conditions.length; i++){
		            if (item[conditions[i]["field"]] != that.hwReport.getValue(conditions[i]["value"], that)) {
		                return false;
		            }
		            return true;
		        }
		    });
		    setComboValue(val);
		}
		else if (this.combo.rptStore) {
		    this.combo._ishideList = false;
		    this.combo.rptStore.update(function () {
		        setComboValue(val);
		        that.combo.openSelect();
		    }, function () { });
		}
		this.combo.openSelect();
	}

    /**
    * 显示编辑器
    */
	this.showEditor = function () {
	    var that = this;
	    var val = this.getText();
	    this.cell.innerHTML = ""
	    this.combo.DOMelem.style.width = this.cell.clientWidth + "px";
	    this.combo.DOMelem_input.style.width = (this.cell.clientWidth - 24) + "px";
	    this.combo.DOMelem_input.value = val;
	    this.cell.appendChild(this.combo.DOMParent);
	    this.combo.DOMelem.style.top = (this.combo.DOMParent.clientHeight - this.combo.DOMelem.clientHeight) / 2 + "px";

	    this.cell._editorshow = true;

	    this.grid.attachEvent("onSetSizes", function () {
	        if (that.cell.firstChild && that.cell.firstChild.firstChild) {
	            that.cell.firstChild.firstChild.style.width = that.cell.clientWidth + "px";
	            that.cell.firstChild.firstChild.firstChild.style.width = (that.cell.clientWidth - 24) + "px";
	        }

	        that.combo.DOMelem.style.width = that.cell.clientWidth + "px";
	        that.combo.DOMelem_input.style.width = (that.cell.clientWidth - 24) + "px";
	    });
	}
	
	this.selectComboOption = function(val,obj){
		obj.selectOption(obj.getIndexByValue(obj.getOptionByLabel(val).value));
	}
	
	this.getValue = function(val){
		return this.cell.combo_value||"";
	}
	
	this.getText = function(val){
	    var c = this.cell;
	    if (c._editorshow) {
	        return c.firstChild.firstChild.firstChild.value;
	    }
		if (this._combo_pre == "" && c.childNodes[1]) {
			c = c.childNodes[1];
		} else {
			c.childNodes[0].childNodes[1];
		}
		return dhx4.trim(_isIE ? c.innerText : c.textContent);
	}
	
	this.setValue = function(val){
	    this.cell.combo_value = val;
	    var cm = null;
	    if ((cm = this.cell._brval) && (typeof (this.cell._brval) == "object")) {
	        if (this.cellType.ismulti) {
	            var vals = (val || "").split(this.cellType.seperator);
	            var texts = [];
	            for (var i = 0; i < vals.length; i++) {
	                texts.push((cm.getOption(vals[i]) || {}).text || "");
	            }
	            val = texts.join(this.cellType.seperator);
	        }
	        else {
	            val = (cm.getOption(val) || {}).text || val;
	        }
	    } else if (cm = this.hwReport._cell_combos[this.cell._attrs.sid].obj) {
	        if (this.cellType.ismulti) {
	            var tmpVal;
	            var vals = (val || "").split(this.cellType.seperator);
	            var texts = [];
	            for (var i = 0; i < vals.length; i++) {
	                var tmpText = cm.getOption(vals[i]) && cm.getOption(vals[i]).text;
	                if (!tmpText && cm.rule && cm.rptStore) {
	                    tmpText = cm.rptStore.find(function (item) {
	                        return item[cm.rule['value']] + "" == vals[i] + ""
	                    });
	                    tmpText = tmpText && tmpText[cm.rule['text']];
	                }
	                texts.push(tmpText || "");
	            }
	            var tmpVal = texts.join(this.cellType.seperator);
	            if (tmpVal) {
	                val = tmpVal;
	            }
	            else if (this.cellType && this.cellType.noValueClear) {
	                val = "&nbsp;"
	            }
	        }
	        else {
	            var tmpVal = cm.getOption(val);
	            if (tmpVal) {
	                val = tmpVal;
	            }
	            else if (cm.rule && cm.rptStore) {
	                tmpVal = cm.rptStore.find(function (item) {
	                    return item[cm.rule['value']] + "" == val + ""
	                });
	                if (tmpVal) {
	                    val = {
	                        value: tmpVal[cm.rule['value']] + "",
	                        text: tmpVal[cm.rule['text']] + ""
	                    }
	                }
	                else if (this.cellType && this.cellType.noValueClear) {
	                    val = {
	                        value: "",
	                        text: "&nbsp;"
	                    }
	                    if (cm.rptStore.dataRequestCompleted) {
	                        var oCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
	                        var dsName = oCell && oCell.dsName && oCell.dsName[0];
	                        var dsField = oCell && oCell.dsField && oCell.dsField[0];
	                        var dsStore = this.hwReport.queryDatastores.get(dsName) || this.hwReport.bindDatastore;
	                        var rowId = this.cell.parentNode.idd;
	                        if (dsStore && dsField) {
	                            dsStore.updateValue(rowId, dsField, '')
	                        }
	                    }
	                }
	            }
	            val = dhx._isObj(val) ? val.text : val;
	        }
	    }

	    if ((val || "").toString()._dhx_trim() == "") val = null;

	    if (val !== null) {
	        this.setComboCValue(val, this.cell.combo_value);
	    } else {
	        this.setComboCValue("&nbsp;", "");
	        this.cell._clearCell = true;
	    }
	}
	
	this.detach = function () {
	    var that = this;
		var p = this.combo.getParent();
		if (p.parentNode == this.cell) {
			this.cell.removeChild(p);
		} else {
			return false;
		}
		
		var val = this.cell.combo_value;
		this.combo._confirmSelect("blur");
		this.cell.style.padding = "";
		this.combo.DOMParent.firstChild.className = this.combo.DOMParent.firstChild.className.replace(/dhxcombo_actv/g, "");
		
		if (this.cellType.ismulti) {
		    var checkedValues = this.combo.getChecked();
		    if (checkedValues.length == 0) {
		        this.setComboCValue("&nbsp;", "");
		        this.cell._clearCell = true;
		    }
		    else {
		        this.setComboCValue(
                    checkedValues.map(function (v) {
                        return that.combo.getOption(v).text;
                    }).join(this.cellType.seperator), checkedValues.join(this.cellType.seperator));
		        this.cell._clearCell = false;
		    }
		    this.cell.combo_value = checkedValues.join(this.cellType.seperator)
		}
		else{
		    if (!this.combo.getComboText() || this.combo.getComboText().toString()._dhx_trim()=="") {
		        this.setComboCValue("&nbsp;", "");
		        this.cell._clearCell=true;
		    } else {
		        this.setComboCValue(this.combo.getComboText().replace(/\&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),this.combo.getActualValue());
		        this.cell._clearCell = false;
		    }
		    this.cell.combo_value = this.combo.getActualValue();
		}

		this.combo.closeAll();
		this.grid._still_active=true;
		this.grid.setActive(1);
		return val!=this.cell.combo_value;
	}
}


eXcell_vmdcombo.prototype = new eXcell;
eXcell_vmdcombo.prototype.init = function (cellType) {
    var that = this;
    var type = "";
    if (cellType.ismulti) {
        type = "checkbox";
    }
	var container = document.createElement("DIV");
	container.className = "dhxcombo_in_grid_parent";

	var combo = new dhtmlXCombo(container, "combo", 0, type);
	combo.enableFilteringMode("between");
	var grid = this.grid;
	combo.DOMelem.onmousedown = combo.DOMelem.onclick = function(e){
		e = e||event;
		e.cancelBubble = true;
	};
	combo.DOMelem.onselectstart = function(e){
		e = e||event;
		e.cancelBubble = true;
		return true;
	};

	this.grid.attachEvent("onScroll", function(){
		if (combo._isListVisible()) combo._hideList();
	});
	
	if (cellType.ismulti) {
	    combo.attachEvent("onCheck", function (value, state) {
	        var a = grid.editStop;
	        grid.editStop = function () {
	            grid.editStop = a;
	        };
	        var checkedValues = combo.getChecked();
	        combo.DOMelem_input.value = checkedValues.map(function (v) {
	            return combo.getOption(v).text;
	        }).join(cellType.seperator);
	    });
	}

	//combo.attachEvent("onKeyPressed",function(ev){
	//	if (ev==13 || ev==27) {
	//		grid.editStop();
	//		if (grid._fake) grid._fake.editStop();
	//	}
	//});
	
	return combo;
	
};

eXcell_vmdcombo.prototype.fillCellCombos = function (hwReport, cellId) {
    var grid = hwReport.grid;
    var oCell = hwReport.getOriginCellById(cellId);
    if (hwReport.bindDatastore) {
        for (var i = 0; i < grid.rowsCol.length; i++) {
            var cellObj = grid.cells3(grid.rowsCol[i], oCell.index);
            cellObj.refreshCell();
        }
    }
    else {
        for (var i = 0; i < oCell.childs.length; i++) {
            var cellObj = grid.cells.apply(grid, oCell.childs[i].split("_"));
            cellObj.refreshCell();
        }
    }
};

eXcell_vmdcombo.prototype.setComboCValue = function (value, value2) {
   	if (this._combo_pre != "") {
		var height = (this.cell.offsetHeight?this.cell.offsetHeight+"px":0);
   		value = "<div style='width:100%;position:relative;height:100%;overflow:hidden;'>"+this._combo_pre+"<span>"+value+"</span></div>";
   	}
   	if (this.cell._editorshow) {
   	    this.cell.innerHTML = this.combo.DOMParent.outerHTML;
   	    this.cell.firstChild.firstChild.firstChild.value = (value == "&nbsp;" ? "" : value);
   	    this.grid.callEvent("onCellChanged", [
            this.cell.parentNode.idd,
            this.cell._cellIndex,
            value2
   	    ]);
   	}
   	else {
   	    this.setCValue(value, value2);
   	}
};

eXcell_vmdcombo.prototype.refreshCell = function () {
	this.setValue(this.getValue());
};

dhtmlXCombo.prototype.modes.checkbox.image = false;
