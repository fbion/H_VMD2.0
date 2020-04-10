/*
Product Name: dhtmlxSuite 
Version: 5.0.8 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

dhx4.attachEvent("onGridCreated", function(grid) {
	if(!window.dhx_globalImgPath) window.dhx_globalImgPath = grid.imgURL;

	var hwReport = grid.hwReport;
	if (!hwReport) {
	    return;
	}

	for (var key in hwReport._cell_trees) {
	    if (!hwReport._cell_trees[key].obj) {
	        hwReport._cell_trees[key].obj = hwReport._cell_trees[key].init(grid);
	    }
	}

	if (!hwReport._loading_handler_set_tree) {
	    hwReport._loading_handler_set_tree = hwReport.attachEvent("onStoreSuccess", function (_store) {
	        if (_store.trees) {
	            for (var i = 0; i < _store.trees.length; i++) {
	                eXcell_vmdtree.prototype.fillCellCombos(hwReport, _store.trees[i]);
	            }
	        }
	    });
	}
});

function eXcell_vmdtree(cell) {
	if(!cell) return;
	this.cell = cell;
	this.grid = cell.parentNode.grid;
	this.hwReport = this.grid.hwReport;
	this.cellType = this.hwReport._cell_trees[this.cell._attrs.sid];
	this.combo_tree = this.cellType.obj;

	this._combo_pre = "";
		if(this.hwReport&&this.hwReport.vmdreport&&this.hwReport.vmdreport.xtype=="vmd.datainput")
	{
		var originCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
		if (originCell && cell.rowSpan == 1&&originCell.childs.indexOf(cell.parentNode.idd + "_" + cell.cellIndex)<0) {
             originCell.childs.push(cell.parentNode.idd + "_" + cell.cellIndex);	
		}
	}	
	this.edit = function () {
	    var that = this;
		if(!window.dhx_globalImgPath) window.dhx_globalImgPath = this.grid.imgURL;
		this.val = this.getValue();
		var val = this.getText();
		if(this.cell._clearCell) val = "";

		var s = window.dhx4.screenDim();

		var bw = this.cell.clientWidth * this.cellType.percentWidth;
		var bh = this.combo_tree.base.offsetHeight;
		this.combo_tree.base.style.width = bw + "px";
		this.combo_tree.setSizes();
		//var bw = this.combo_tree.base.offsetWidth;

		var cellBoundingRect = this.cell.getBoundingClientRect();
		var top = cellBoundingRect.top + cellBoundingRect.height;
		var left = cellBoundingRect.left;
		if ((top + bh) > s.bottom) {
		    top = cellBoundingRect.top - bh;
		}
		if ((left + bw) > s.right) {
		    left = cellBoundingRect.left - (bw - cellBoundingRect.width);
		}

		if (!/dhxcombo_actv/g.test(this.combo_tree.DOMelem.className)) {
		    this.combo_tree.DOMelem.className += " dhxcombo_actv";
		}
		if (!this.cell._editorshow) {
		    this.cell.className += " " + this.hwReport.reportId + "-p-0";
		}
		else {
		    this.combo_tree.DOMelem_input.onclick = function (e) {
		        if (!e) e = event;
		        e.cancelBubble = true;
		        return true;
		    }
		}
		this.cell.innerHTML = "";
		this.cell.appendChild(this.combo_tree.DOMParent);

		var top = (this.combo_tree.DOMParent.clientHeight - this.combo_tree.DOMelem.clientHeight) / 2;
		if (top < 1) {
		    top = 0;
		}
		this.combo_tree.DOMelem.style.top = top + "px";
		this.combo_tree.DOMParent.firstChild.style.width = this.cell.clientWidth + "px";
		this.combo_tree.DOMelem_input.style.width = (this.cell.clientWidth - 24) + "px";
		this.combo_tree.DOMelem_input.focus();
		this.combo_tree.DOMelem_input.value = val;
        var h=0;
		if(this.combo_tree.base.style.height){
			h=	this.combo_tree.base.style.height.split('p')[0];
		}
		var ch=document.body.clientHeight;
		if(ch-cellBoundingRect.top - cellBoundingRect.height>h){
			this.combo_tree.base.style.top =(cellBoundingRect.top +cellBoundingRect.height)+"px";
		}else {
			if(cellBoundingRect.top>h){
				this.combo_tree.base.style.top = (cellBoundingRect.top-h) + "px"
			}else{
				if(ch>h){
					this.combo_tree.base.style.top =(ch- h )+ "px"
				}
			}
		}

	//	this.combo_tree.base.style.top = top + "px"
		this.combo_tree.base.style.left = (left - 1) + "px"
		this.combo_tree.base.style.visibility = "visible"
		this.combo_tree.area.focus();
		this.combo_tree.setSizes();

		function setComboValue(val) {
		    if (that.combo_tree.items[that.cell.combo_value]) {
		        that.combo_tree.selectItem(that.cell.combo_value);
		    } else {
		        if (that.combo_tree.items[val]) {
		            that.combo_tree.selectItem(val);
		        } else {
		            if (that.combo_tree.getSelectedId())
		                that.combo_tree.unselectItem(that.combo_tree.getSelectedId())
		        }
		    }
		}
		setComboValue(val);

		var conditions = this.cellType && this.cellType.bindsource && this.cellType.bindsource.conditions;
	    //条件过滤
		if (conditions && conditions.length > 0) {
		    this.combo_tree.filterByDataStore(function (item, value) {
		        for (var i = 0; i < conditions.length; i++) {
		            if (item[conditions[i]["field"]] != that.hwReport.getValue(conditions[i]["value"], that)) {
		                return false;
		            }
		            return true;
		        }
		    });
		    setComboValue(val);
		}
		else if (this.combo_tree.rptStore) {
		    this.combo_tree.rptStore.update(function () {
		        setComboValue(val);
		    }, function () { });
		}
	}

    /**
    * 显示编辑器
    */
	this.showEditor = function () {
	    var val = this.getText();
	    this.cell.innerHTML = ""
	    this.combo_tree.DOMelem.style.width = this.cell.clientWidth + "px";
	    this.combo_tree.DOMelem_input.style.width = (this.cell.clientWidth - 24) + "px";
	    this.combo_tree.DOMelem_input.value = val;
	    this.cell.appendChild(this.combo_tree.DOMParent);
	    this.combo_tree.DOMelem.style.top = (this.combo_tree.DOMParent.clientHeight - this.combo_tree.DOMelem.clientHeight) / 2 + "px";

	    this.cell._editorshow = true;
	}


	this.getValue = function(val) {
		return this.cell.combo_value || "";
	}

	this.getText = function (val) {
	    var c = this.cell;
	    if (c._editorshow) {
	        return c.firstChild.firstChild.firstChild.value;
	    }
	    return (_isIE ? c.innerText : c.textContent);
	}

	this.setValue = function(val) {
	    this.cell.combo_value = val;
	    var cm = null;
	    if ((cm = this.cell._brval) && (typeof (this.cell._brval) == "object")) {
	        val = (cm.items[val] && cm.items[val].text) || val;
	    } else if (cm = this.hwReport._cell_trees[this.cell._attrs.sid].obj) {
	        val = (cm.items[val] && cm.items[val].text) || val;
	        var tmpVal = cm.items[val];
	        if (tmpVal) {
	            val = tmpVal;
	        }
	        else if (cm.rule && cm.rptStore) {
	            tmpVal = cm.rptStore.find(function (item) {
	                return item[cm.rule['value']] + "" == val + ""
	            });
	            if (tmpVal) {
	                val = {
	                    value: tmpVal[cm.rule['value']],
	                    text: tmpVal[cm.rule['text']]
	                }
	            }
	        }
	        val = (val || {}).text || val;
	    }

	    if ((val || "").toString()._dhx_trim() == "") val = null;

	    if (val !== null) {
	        this.setComboCValue(val, this.cell.combo_value);
	    } else {
	        this.setComboCValue("&nbsp;", "");
	        this.cell._clearCell = true;
	    }
	}

	this.detach = function() {
	    this.combo_tree.DOMelem_input.onclick = null;
	    this.cell.className = this.cell.className.replace(new RegExp(this.hwReport.reportId + "-p-0", "gi"), " ");
	    this.combo_tree.DOMelem.className = this.combo_tree.DOMelem.className.replace(/dhxcombo_actv/g, "");
		var p = this.combo_tree.base;
		p.style.visibility = "hidden";
		var oldval = this.getValue();
		var oldtxt = this.getText();

		if(!this.combo_tree.getSelectedId() || !this.combo_tree.items[this.combo_tree.getSelectedId()] || this.combo_tree.items[this.combo_tree.getSelectedId()].text._dhx_trim() == "") {
		    this.cell.combo_value = oldval;
		    this.setComboCValue(oldtxt, oldval);
		} else {
			this.setComboCValue(this.combo_tree.items[this.combo_tree.getSelectedId()].text.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), this.combo_tree.getSelectedId());
			this.cell._clearCell = false;
			this.cell.combo_value = this.combo_tree.getSelectedId();
		}
		this.grid._still_active = true;
		this.grid.setActive(1);
		return oldval != this.cell.combo_value;
	}
}

eXcell_vmdtree.prototype = new eXcell;
eXcell_vmdtree.prototype.init = function(index) {

	var container = document.createElement("DIV");
	container.className = "dhxtree_in_grid_parent";
	var type = this.grid.defVal[arguments.length ? index : this.cell._cellIndex];
	var tree = new dhtmlXTreeView(container);
	var grid = this.grid;

	tree.DOMParent = document.createElement("DIV");
	tree.DOMParent.className = "dhxcombo_in_grid_parent";
	tree.DOMParent.innerHTML = "<div class='dhxcombo_material'><input type='text' class='dhxcombo_input' autocomplete='off'>" +
            "<input type='hidden' value=''>" + // value
            "<input type='hidden' value='false'>" + // new_value
            "<div class='dhxcombo_select_button'><div class='dhxcombo_select_img'></div></div></div>";

	tree.DOMelem = tree.DOMParent.firstChild;
	tree.DOMelem_input = tree.DOMParent.firstChild.firstChild;

	document.body.appendChild(tree.base); //.parentElement);
	//设置 下拉树的大小和显示样式
	tree.base.style.width = "250px";
	tree.base.style.height = (this.cellType.height || 250) + "px";
	tree.base.style.position = "absolute";
	tree.base.style.visibility = "hidden";
	tree.attachEvent("_onBeforeOpen", function(id, state) {
		var a = grid.editStop;
		grid.editStop = function () {
		    grid.editStop = a;
		};

		return true;
	})
	this.grid.attachEvent("onScroll", function() {
		tree.base.style.visibility = "hidden"
	});

	return tree;

};

eXcell_vmdtree.prototype.fillCellCombos = function (hwReport, cellId) {
    var grid = hwReport.grid;
    var oCell = hwReport.getOriginCellById(cellId);
    for (var i = 0; i < oCell.childs.length; i++) {
        var cellObj = grid.cells.apply(grid, oCell.childs[i].split("_"));
        cellObj.refreshCell();
    }
};

eXcell_vmdtree.prototype.setComboCValue = function (value, value2) {
    if (this.cell._editorshow) {
        this.cell.innerHTML = this.combo_tree.DOMParent.outerHTML;
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
    if(dhx.isIE)  oldsubgridhtml=this.combo_tree.DOMParent.innerHTML;
    
        this.setCValue(value, value2);
    
    if(dhx.isIE && oldsubgridhtml){
      this.combo_tree.DOMParent.innerHTML=oldsubgridhtml;
        this.combo_tree.DOMParent.firstChild.firstChild.value=(value == "&nbsp;" ? "" : value);
    }

    }
};

eXcell_vmdtree.prototype.getCellCombo = function() {

	if(this.cell._brval) return this.cell._brval;

	this.cell._brval = this.init();
	return this.cell._brval;

};

eXcell_vmdtree.prototype.refreshCell = function() {
	this.setValue(this.getValue());
};

dhtmlXTreeView.prototype._signInit = function () {
    this.attachEvent("_onTreeClick", function (e, flow) {
        if (flow.stop == true) return; // check if cancelled by prev attached function
        var t = (e.target || e.srcElement);
        if (t.tagName.toLowerCase() == "i") t = t.parentNode; // check if icon
        if ((t.parentNode.className || "").match(/dhxtreeview_item_text/) != null)
        {
            //箭头
            if(t == t.parentNode.childNodes[this.conf.idx.sign]){
                this._openCloseItem(t.parentNode.parentNode._itemId, true);
                flow.stop = true;
            }
            //只选叶子节点
            else if(this._selectableType == "leaf" && this.getSubItems(t.parentNode.parentNode._itemId).length > 0){
                this._openCloseItem(t.parentNode.parentNode._itemId, true);
                flow.stop = true;
            }
            else if (this._selectableType == "parent" && this.getSubItems(t.parentNode.parentNode._itemId).length == 0) {
                flow.stop = true;
            }
        }
        else if ((t.parentNode.className || "").match(/dhxtreeview_item/) != null) {
            //只选叶子节点
            if (this._selectableType == "leaf" && this.getSubItems(t.parentNode._itemId).length > 0) {
                this._openCloseItem(t.parentNode._itemId, true);
                flow.stop = true;
            }
            else if (this._selectableType == "parent" && this.getSubItems(t.parentNode._itemId).length == 0) {
                flow.stop = true;
            }
        }
    });
};