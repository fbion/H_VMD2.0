/*
filename：dhtmlxgrid_ext_tb.js
creater：刘志伟
date created：2018.10.16
description：扩展grid对象
date modified：2018.10.16
modifier：刘志伟
version：
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/
/**
* 简单网格添加样式
*/
dhtmlXGridObject.prototype._build_master_row = function(){
    var t = document.createElement("DIV");
    var html = ["<table><tr>"];
	
    if (this.cellStyles && this.cellStyles.length > 0) {
        for (var i = 0; i < this._cCount; i++) html.push("<td " + (this.cellStyles[i] ? ("style='" + this.cellStyles[i] + "'") : "") + "></td>");
    }
    else {
        for (var i = 0; i < this._cCount; i++) html.push("<td></td>");
    }
    
    html.push("</tr></table>");
    t.innerHTML=html.join("");
    this._master_row=t.firstChild.rows[0];
},

dhtmlXGridObject.prototype.setColStyles = function (valueStr) {
    if (typeof valueStr === 'string') {
        this.cellStyles = dhtmlxArray(valueStr.split(this.delim));
    }
    else {
        this.cellStyles = valueStr;
    }
}

dhtmlXGridObject.prototype.setColClassName = function (classNameStr) {
    if (typeof classNameStr === 'string') {
        this.cellClassNames = dhtmlxArray(classNameStr.split(this.delim));
    }
    else {
        this.cellClassNames = classNameStr;
    }
}

dhtmlXGridObject.prototype.setColExtypeStore = function (vmdstores) {
    this.cellExtypeStores = vmdstores;
}

dhtmlXGridObject.prototype.setDataRowHeight = function (rowHeight) {
    this.dataRowHeight = rowHeight;
    if (rowHeight || rowHeight == 0) {
        //this._srnd = rowHeight;
        this._srdh = parseInt(rowHeight);
    }
}

/**
* 重写创建表头的方法，添加表头单元格的类
*/
dhtmlXGridObject.prototype.attachHeader = function (values, style, _type, _class, _attrs) {
    if (typeof (values) == "string")
        values = this._eSplit(values);

    if (typeof (style) == "string")
        style = style.split(this.delim);
    _type = _type || "_aHead";

    if (this.hdr.rows.length) {
        if (values)
            this._createHRow([
					values,
					style,
                    _class,
                    _attrs
            ], this[(_type == "_aHead") ? "hdr" : "ftr"]);

        else if (this[_type])
            for (var i = 0; i < this[_type].length; i++) this.attachHeader.apply(this, this[_type][i]);
    } else {
        if (!this[_type])
            this[_type] = new Array();
        this[_type][this[_type].length] = [
            values,
            style,
            _type,
            _class,
            _attrs
        ];
    }
};

/**
* 重写创建表头的方法，添加表头单元格的类
*/
dhtmlXGridObject.prototype._createHRow = function(data, parent){
    if (!parent){
        if (this.entBox.style.position!="absolute")
            this.entBox.style.position="relative";
        var z = document.createElement("DIV");
        z.className="c_ftr".substr(2);
        this.entBox.appendChild(z);
        var t = document.createElement("TABLE");
        t.cellPadding=t.cellSpacing=0;
			
        if (!_isIE || _isIE == 8){
            t.width="100%";
            t.style.paddingRight="20px";
        }
        t.style.marginRight="20px";
        t.style.tableLayout="fixed";
			
        z.appendChild(t);
        t.appendChild(document.createElement("TBODY"));
        this.ftr=parent=t;
			
        var hdrRow = t.insertRow(0);
        var thl = ((this.hdrLabels.length <= 1) ? data[0].length : this.hdrLabels.length);
			
        for (var i = 0; i < thl; i++){
            hdrRow.appendChild(document.createElement("TH"));
            hdrRow.childNodes[i]._cellIndex=i;
        }
			
        if (_isIE && _isIE<8)
            hdrRow.style.position="absolute";
        else
            hdrRow.style.height='auto';
    }
    var st1 = data[1];
    var cls1 = data[2]; //liuzhiwei 20181214 单元格类名
    var attrs = data[3]; //liuzhiwei 20190219 单元格属性
    var z = document.createElement("TR");
    parent.rows[0].parentNode.appendChild(z);
    if (!isNaN(window.judgedRowNum)) {
        judgedRowNum++;
    }
    for (var i = 0; i < data[0].length; i++){
        if (data[0][i] == "#cspan"){
            var pz = z.cells[z.cells.length-1];
            pz.colSpan=(pz.colSpan||1)+1;
            //表头定制
            if ( parent.parentNode.parentNode.parentNode.id == "subGridHeaderTop") {
                if (data[0][i] == "#cspan" && !(data[0][i - 1] == "#cspan")) {
                    this.setCheckBox(z, st1, i, "#master_checkbox");
                }
            }
            continue;
        }
			
        if ((data[0][i] == "#rspan")&&(parent.rows.length > 1)){
            var pind = parent.rows.length-2;
            var found = false;
            var pz = null;
            //修复同时合并行合并列的单元格显示的问题
            var rowspanJump = false;
				
            while (!found){
                var pz = parent.rows[pind];
					
                for (var j = 0; j < pz.cells.length; j++) {
                    if (pz.cells[j]._cellIndexS == i) {
                        found = j + 1;
                        break;
                    }
                    if ((i >= pz.cells[j]._cellIndexS) && (i < (pz.cells[j]._cellIndexS + pz.cells[j].colSpan))) {
                        rowspanJump = true;
                        break;
                    }
                }
                if (rowspanJump) {
                    break;
                }
                pind--;
            }
            if (rowspanJump) {
                continue;
            }
            pz=pz.cells[found-1];
            pz.rowSpan=(pz.rowSpan||1)+1;
            continue;
            //            data[0][i]="";
        }
			
        var w = document.createElement("TD");
        w._cellIndex=w._cellIndexS=i;
        if (this._hrrar && this._hrrar[i] && !_isIE)
            w.style.display='none';
			
        if (typeof data[0][i] == "object")
            w.appendChild(data[0][i]);
        else {
            if (this.forceDivInHeader)
                w.innerHTML="<div class='hdrcell'>"+(data[0][i]||"&nbsp;")+"</div>";
            else
                w.innerHTML=(data[0][i]||"&nbsp;");
				
            if ((data[0][i]||"").indexOf("#") != -1){
                var t = data[0][i].match(/(^|{)#([^}]+)(}|$)/);
					
                if (t){
                    var tn = "_in_header_"+t[2];
						
                    if (this[tn])
                        this[tn]((this.forceDivInHeader ? w.firstChild : w), i, data[0][i].split(t[0]));
                }
            }
        }
        if (st1)
            w.style.cssText = st1[i];
        //添加类名解析
        if (cls1 && cls1[i]) {
            w.className = cls1[i];
        }
        if (attrs && attrs[i]) {
            w._attrs = attrs[i];
            w.firstChild._attrs = attrs[i];

            var originCell = this.hwReport.getOriginCellById(attrs[i].sid);
            if (originCell && ["vmdlink", "vmdch"].indexOf(originCell.getType()) != -1) {
                w.grid = this;
                w.firstChild._cellType = originCell.getType();
                var aeditor = this.cells4(w.firstChild);
                w.idd = aeditor;

                if (aeditor) aeditor.setValue(data[0][i]);
            }
        }
        z.appendChild(w);
    }
    var self = parent;
		
    if (_isKHTML){
        if (parent._kTimer)
            window.clearTimeout(parent._kTimer);
        parent._kTimer=window.setTimeout(function(){
            parent.rows[1].style.display='none';
            window.setTimeout(function(){
                parent.rows[1].style.display='';
            }, 1);
        }, 500);
    }
};

dhtmlXGridObject.prototype._get_custom_json_data = function (data, ind) {
    return data.data[ind];
},

dhtmlXGridObject.prototype._process_custom_json = function (data) {
    this._parsing = true;
    try {
        var data = data.responseText || data;
        if (typeof data == "string") {
            eval("dhtmlx.temp=" + data + ";");
            data = dhtmlx.temp;
        }
    } catch (e) {
        dhx4.callEvent("onLoadXMLError", ["Incorrect JSON",
            (data.xmlDoc || data),
            this
        ]);
        data = { rows: [] };
    }

    var cr = parseInt(data.pos || 0);
    var total = parseInt(data.rowcount || 0);

    var reset = false;
    if (total) {
        if (!this.rowsBuffer[total - 1]) {
            if (this.rowsBuffer.length)
                reset = true;
            this.rowsBuffer[total - 1] = null;
        }
        if (total < this.rowsBuffer.length) {
            this.rowsBuffer.splice(total, this.rowsBuffer.length - total);
            reset = true;
        }
    }

    var userdata = data;
    for (var key in userdata) {
        if (key != "datas")
            this.setUserData("", key, userdata[key]);
    }

    if (data.datas) {
        for (var i = 0; i < data.datas.length; i++) {
            if (this.rowsBuffer[i + cr])
                continue;
            var id = data.datas[i].id || (i + cr + "");
            this.rowsBuffer[i + cr] = {
                idd: id,
                data: data.datas[i],
                _parser: this._process_custom_json_row,
                _locator: this._get_custom_json_data
            };

            this.rowsAr[id] = data.datas[i];
        }
    }
    this.rowSpanFlags = []; //
    this.callEvent("onDataReady", []);
    if (reset && this._srnd) {
        var h = this.objBox.scrollTop;
        this._reset_view();
        this.objBox.scrollTop = h;
    } else {
        this.render_dataset(cr);
    }

    this._parsing = false;
}

dhtmlXGridObject.prototype._process_custom_json_row = function (r, data, index) {
    for (var j = 0; j < r.childNodes.length; j++) r.childNodes[j]._attrs = {
    };
    if (data.userdata)
        for (var a in data.userdata)
            this.setUserData(r.idd, a, data.userdata[a]);

    var abbrkeys = this.getUserData(null, "abbrkeys");
    var reAbbrkeys;
    if(abbrkeys){
        reAbbrkeys = {};
        for (var key in abbrkeys) {
            if (abbrkeys.hasOwnProperty(key)) {
                reAbbrkeys[abbrkeys[key]] = key;
            }
        }
    }

    var vdata = [];
    var isFirstColSet = false; //一行数据中只有一列是第一列
    var isLastColSet = false; //一行数据中只有一列是最后一列
    var colspan = 1;
    var rowspan = 1;
    var hasSetFirstRow = this._hasSetFirstRow;
    for (var i = 0; i < data.length; i+=colspan) {
        if (typeof data[i] == "object" && data[i] != null) {
            if (reAbbrkeys) {
                for (var key in data[i]) {
                    if (data[i].hasOwnProperty(key) && reAbbrkeys[key]) {
                        data[i][reAbbrkeys[key]] = data[i][key];
                    }
                }
            }
            if (this.hwReport.fixedColCount
                && i < this.hwReport.fixedColCount
                && (i + parseInt(data[i].colspan)) > this.hwReport.fixedColCount
                && data[i + 1]) {
                data[i + 1].colspan = i + parseInt(data[i].colspan) - this.hwReport.fixedColCount;
                data[i + 1].data = data[i].data;
                data[i + 1].sid = data[i].sid;
                data[i].colspan = this.hwReport.fixedColCount - i;
            }
            colspan = parseInt(data[i].colspan || 1);
            rowspan = parseInt(data[i].rowspan || 1);
            var sid = data[i][(reAbbrkeys && reAbbrkeys["sid"]) || "sid"];
            var originCell = this.hwReport.getOriginCellById(sid);
            var align = originCell && this.hwReport.aligns.get(originCell.align);
            var isEscape = (align && align.escapelabel == "1") ? true : false;

            if (originCell) {
                var ignores = [];
                if (index > 0 && hasSetFirstRow) {
                    ignores.push("firstRow");
                }
                else if (originCell.rptRow.height > 0) {
                    this._hasSetFirstRow = true;
                }

                if (originCell.isFirstCol && !isFirstColSet) isFirstColSet = true;
                else ignores.push("firstCol");

                if (originCell.isLastCol && !isLastColSet) isLastColSet = true;
                else ignores.push("lastCol");

                data[i]['class'] = (data[i]['class'] || "") + " " + originCell.getClassName(ignores);
                data[i].style = (data[i].style || "") + ";" + originCell.getCSS(['border', 'font', 'align']);
                data[i].type = originCell.getType();
                data[i].disabled = originCell.getIsDisabled();
            }

            //将扩展出来的单元格放到原始单元格中
            if (originCell && (!this.rowSpanFlags[i] || this.rowSpanFlags[i].rowspan == 1)) {
                originCell.childs.push(r.idd + "_" + r.childNodes[i]._cellIndex);
                if(data[i].highlight){
                    this.hwReport.highlightCells = this.hwReport.highlightCells || [];
                    this.hwReport.highlightCells.push(r.idd + "_" + r.childNodes[i]._cellIndex);
                }
                for (var j = 0; j < colspan; j++) {
                    this.rowSpanFlags[i + j] = {
                        rowId: r.idd,
                        rowspan: rowspan
                    };
                }
            }
            else if (this.rowSpanFlags[i]) {
                this.rowSpanFlags[i].rowspan--;
            }
            else {
                this.rowSpanFlags[i] = {
                    rowId: r.idd,
                    rowspan: 1
                };
            }

            for (var j = 0; j < colspan; j++) {
                data[i + j]._cRowId = this.rowSpanFlags[i + j].rowId; //对应dom的行id
                data[i + j]._cIndex = i; //对应dom的列索引
                data[i + j]._sRowId = r.idd;//原始的行id
                data[i + j]._sIndex = i + j;//原始的列索引
                r.childNodes[i + j]._attrs = data[i + j];
                if (data[i + j].type) r.childNodes[i + j]._cellType = data[i + j].type;
                else r.childNodes[i + j]._cellType = "ro";
                r.childNodes[i + j]._disabled = data[i + j].disabled;
                vdata[i + j] = data[i + j].data ? this.hwReport.replaceToHtmltag(data[i + j].data, isEscape) : "";
            }
        }
        else {
            r.childNodes[i]._attrs = this.hwReport.getPatchCell(index, i);
            r.childNodes[i]._cellType = "ro";
            colspan = 1;
        }
    }

    r._attrs = data;
    this._fillRow(r, vdata);
    return r;
}

dhtmlXGridObject.prototype._process_store_row = function (row, data) {
    var result = [];
    for (var i = 0; i < this.columnIds.length; i++)
        result[i] = data[this.columnIds[i]];
    for (var j = 0; j < row.childNodes.length; j++) {
        var attrs = (this.cellAttrs && this.cellAttrs[j]) || {};
        row.childNodes[j].className = (this.cellClassNames && this.cellClassNames[j]) || "";
        row.childNodes[j]._attrs = attrs;
        var originCell = this.hwReport && this.hwReport.getOriginCellById(attrs.sid);
        row.childNodes[j]._disabled = originCell && originCell.getIsDisabled();
    }

    row._attrs = data;
    this._fillRow(row, result);
};

dhtmlXGridObject.prototype.render_row = function(ind){
    if (!this.rowsBuffer[ind])
        return -1;
		
    if (this.rowsBuffer[ind]._parser){
        var r = this.rowsBuffer[ind];
        if (this.rowsAr[r.idd] && this.rowsAr[r.idd].tagName=="TR")
            return this.rowsBuffer[ind]=this.rowsAr[r.idd];
        var row = this._prepareRow(r.idd);
        this.rowsBuffer[ind]=row;
        this.rowsAr[r.idd]=row;
			
        r._parser.call(this, row, r.data, ind);
        this._postRowProcessing(row);
        return row;
    }
    return this.rowsBuffer[ind];
},

dhtmlXGridObject.prototype.setColAttrs = function (attrs) {
    this.cellAttrs = [];
    for (var i = 0; i < attrs.length; i++)
        this.cellAttrs[i] = attrs[i];
}

dhtmlXGridObject.prototype.setColStyles = function (valueStr) {
    if (typeof valueStr === 'string') {
        this.cellStyles = dhtmlxArray(valueStr.split(this.delim));
    }
    else {
        this.cellStyles = valueStr;
    }
}

dhtmlXGridObject.prototype.setColClassName = function (classNameStr) {
    if (typeof classNameStr === 'string') {
        this.cellClassNames = dhtmlxArray(classNameStr.split(this.delim));
    }
    else {
        this.cellClassNames = classNameStr;
    }
}

dhtmlXGridObject.prototype.setColExtypeStore = function (vmdstores) {
    this.cellExtypeStores = vmdstores;
}

dhtmlXGridObject.prototype.setDataRowHeight = function (rowHeight) {
    this.dataRowHeight = rowHeight;
    if (rowHeight || rowHeight == 0) {
        //this._srnd = rowHeight;
        this._srdh = parseInt(rowHeight);
    }
}

dhtmlXGridObject.prototype.addRowCustom = function (newId, datas, ind) {
    if (ind == -1 || typeof ind == "undefined")
        ind = this.rowsBuffer.length;

    this.rowsBuffer._dhx_insertAt(ind, {
        idd: newId,
        data: datas,
        _parser: this._process_custom_json_row,
        _locator: this._get_custom_json_data
    });
    var row = this.render_row(ind);
    var r = this._insertRowAt(row, ind);

    if (!this.dragContext)
        this.callEvent("onRowAdded", [newId]);

    if (this.pagingOn)
        this.changePage(this.currentPage)

    if (this._srnd)
        this._update_srnd_view();

    r._added = true;

    if (this._srnd && !this._fillers)
        this._fillers = [];

    if (this._ahgr)
        this.setSizes();
    this.callEvent("onGridReconstructed", []);
    return r;
},

dhtmlXGridObject.prototype.isCheckedAll = function (col_ind) {
    for (var a in this.rowsAr) {
        if (this.rowsAr[a] && this.rowsAr[a].idd) {
            var cell = this.cells(this.rowsAr[a].idd, col_ind);
            if (cell.changeState && cell.getValue() == 0) {
                return false;
            }
        }
    }
    return true;
},

dhtmlXGridObject.prototype.setDisabled = function (fl) {
    this._disabled = fl == false ? false : true;
}

dhtmlXGridObject.prototype.getRowHeight = function (ind) {
    if (!this.rowsAr[ind])
        return -1;
    return this.rowsAr[ind].offsetHeight;
},

dhtmlXGridObject.prototype.getRowsHeight = function () {
    var heights = [];
    var hdrrows = this.noHeader ? [] : this.hdr.rows;
    for (var i = 1; i < hdrrows.length; i++) {
        heights.push(hdrrows[i].offsetHeight);
    }
    for (var i = 0; i < this.rowsBuffer.length; i++) {
        var r = this.rowsBuffer[i];
        if (this.rowsAr[r.idd] && this.rowsAr[r.idd].tagName == "TR") {
            heights.push(this.rowsAr[r.idd].parentNode ? this.rowsAr[r.idd].offsetHeight : this._srdh);
        }
        else {
            heights.push(this._srdh);
        }
    }
    return heights;
},

dhtmlXGridObject.prototype.getColsWidth = function () {
    if (this._fake) {
        return this._fake.cellWidthPX.concat(this.cellWidthPX.slice(this._fake.cellWidthPX.length)).map(function (value) { return parseInt(value) });
    }
    return this.cellWidthPX.map(function (value) {return parseInt(value) });
},


dhtmlXGridObject.prototype.forEachCellsA = function (rId, custom_code) {
    var t_cspan = 1;
    for (var j = 0; j < this._cCount; j += t_cspan) {
        var cellObj = this.cells(rId, j);
        t_cspan = cellObj.cell.colSpan;
        custom_code.apply(this, [cellObj, rId, j]);
    }
};
/**
* 循环遍历所有单元格
*/
dhtmlXGridObject.prototype.forEachCellsB = function (custom_code, startRowIndex, endRowIndex) {
    var temp_rspan = [];
    startRowIndex = startRowIndex || 0;
    endRowIndex = endRowIndex || this.rowsBuffer.length;
    for (var i = startRowIndex; i < endRowIndex; i++) {
        var t_cspan = 1;
        for (var j = 0; j < this._cCount; j += t_cspan) {
            if (temp_rspan[j]) {
                temp_rspan[j] = temp_rspan[j] - 1;
                t_cspan = 1;
                continue;
            }
            var cellObj = this.cells2(i, j);
            if (cellObj.cell.rowSpan > 1) {
                temp_rspan[j] = cellObj.cell.rowSpan - 1;
                if (cellObj.cell.colSpan > 1) {
                    for (var k = 1; k < cellObj.cell.colSpan; k++) {
                        temp_rspan[j + k] = cellObj.cell.rowSpan - 1;
                    }
                }
            }
            t_cspan = cellObj.cell.colSpan;
            custom_code.apply(this, [cellObj, i, j]);
        }
    }
};

dhtmlXGridObject.prototype.enabledSelecteStates = function (bool) {
    this.rowSelecteStates = dhx4.s2b(bool);
};

/**
* 分页组件工具栏下拉框添加高度
*/
dhtmlXGridObject.prototype._pgn_createToolBar = function () {
    this.aToolBar = new dhtmlXToolbarObject({
        parent: this._pgn_parentObj,
        skin: (this._pgn_skin_tlb || this.skin_name),
        icons_path: this.imgURL
    });
    if (!this._WTDef) this.setPagingWTMode(true, true, true, true);
    var self = this;
    this.aToolBar.attachEvent("onClick", function (val) {
        val = val.split("_");
        switch (val[0]) {
            case "leftabs":
                self.changePage(1);
                break;
            case "left":
                self.changePage(self.currentPage - 1);
                break;
            case "rightabs":
                self.changePage(99999);
                break;
            case "right":
                self.changePage(self.currentPage + 1);
                break;
            case "perpagenum":
                if (val[1] === this.undefined) return;
                self.rowsBufferOutSize = parseInt(val[1]);
                self.changePage();
                self.aToolBar.setItemText("perpagenum", val[1] + " " + self.i18n.paging.perpage);
                break;
            case "pages":
                if (val[1] === this.undefined) return;
                self.changePage(val[1]);
                self.aToolBar.setItemText("pages", self.i18n.paging.page + val[1]);
                break;
        }
    });
    // add buttons
    if (this._WTDef[0]) {
        this.aToolBar.addButton("leftabs", NaN, null, "ar_left_abs.gif", "ar_left_abs_dis.gif");
        this.aToolBar.addButton("left", NaN, null, "ar_left.gif", "ar_left_dis.gif");
    }
    if (this._WTDef[1]) {
        this.aToolBar.addText("results", NaN, this.i18n.paging.results);
        this.aToolBar.setWidth("results", "150");
        this.aToolBar.disableItem("results");
    }
    if (this._WTDef[0]) {
        this.aToolBar.addButton("right", NaN, null, "ar_right.gif", "ar_right_dis.gif");
        this.aToolBar.addButton("rightabs", NaN, null, "ar_right_abs.gif", "ar_right_abs_dis.gif");
    }
    if (this._WTDef[2]) {
        if (this.aToolBar.conf.skin == "dhx_terrace") this.aToolBar.addSeparator();
        this.aToolBar.addButtonSelect("pages", NaN, "select page", [], "paging_pages.gif", null, false, true, 10);
    }
    var arr;
    if (arr = this._WTDef[3]) {
        if (this.aToolBar.conf.skin == "dhx_terrace") this.aToolBar.addSeparator();
        this.aToolBar.addButtonSelect("perpagenum", NaN, "select size", [], "paging_rows.gif", null, false, true, 10);
        if (typeof arr != "object") arr = [5, 10, 15, 20, 25, 30];
        var w = { dhx_skyblue: 4, dhx_web: 0, dhx_terrace: 18 }[this.aToolBar.conf.skin];
        for (var k = 0; k < arr.length; k++) {
            this.aToolBar.addListOption("perpagenum", "perpagenum_" + arr[k], NaN, "button", "<span style='padding: 0px " + w + "px 0px 0px;'>" + arr[k] + " " + this.i18n.paging.perpage + "</span>", "paging_page.gif");
        }
    }

    //var td = document.createElement("TD"); td.width = "5"; this.aToolBar.tr.appendChild(td);
    //var td = document.createElement("TD"); td.width = "100%"; this.aToolBar.tr.appendChild(td);

    return this.aToolBar;
}

dhtmlXGridCellObject.prototype.doLayout = function () {

}

/**
* 创建带确认取消按钮的窗口
*/
dhtmlXWindows.prototype.createConfirmWindow = function (id, x, y, width, height, opts) {
    var r = {};
    if (arguments.length == 1 && typeof (id) == "object") {
        r = id;
    } else {
        r.id = id;
        r.left = x;
        r.top = y;
        r.width = width;
        r.height = height;
        if (typeof (r.id) == "undefined" || r.id == null) r.id = window.dhx4.newId();
        while (this.w[r.id] != null) r.id = window.dhx4.newId();
    }

    if (r.left == null) r.left = 0;
    if (r.top == null) r.top = 0;

    r.move = (r.move != null && window.dhx4.s2b(r.move) == false ? false : (r.deny_move != null && window.dhx4.s2b(r.deny_move) == true ? false : true));
    r.park = (r.park != null && window.dhx4.s2b(r.park) == false ? false : (r.deny_park != null && window.dhx4.s2b(r.deny_park) == true ? false : true));
    r.resize = (r.resize != null && window.dhx4.s2b(r.resize) == false ? false : (r.deny_resize != null && window.dhx4.s2b(r.deny_resize) == true ? false : true));
    r.keep_in_viewport = (r.keep_in_viewport != null && window.dhx4.s2b(r.keep_in_viewport));
    r.modal = (r.modal != null && window.dhx4.s2b(r.modal));
    r.center = (r.center != null && window.dhx4.s2b(r.center));
    r.text = (r.text != null ? r.text : (r.caption != null ? r.caption : "dhtmlxWindow"));
    r.header = (!(r.header != null && window.dhx4.s2b(r.header) == false));

    var t = document.createElement("DIV");
    t.className = "dhxwin_active";
    t.style.viosibility = "hidden";
    this.vp.appendChild(t);

    t._isWindow = true;
    t._idd = r.id;

    var h = document.createElement("DIV");
    h.className = "dhxwin_hdr";
    h.style.zIndex = 0;
    h.innerHTML = "<div class='dhxwin_icon'></div>" +
            "<div class='dhxwin_text'><div class='dhxwin_text_inside'>" + r.text + "</div></div>" +
            "<div class='dhxwin_btns'></div>";
    t.appendChild(h);

    h.onselectstart = function (e) {
        e = e || event;
        if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
        return false;
    }

    h.oncontextmenu = function (e) {
        e = e || event;
        e.cancelBubble = true;
        return false;
    }

    h._isWinHdr = true;
    h.firstChild._isWinIcon = true;

    var k = document.createElement("DIV");
    k.className = "dhxwin_brd";
    t.appendChild(k);

    var f = document.createElement("DIV");
    f.className = "dhxwin_ftr";
    f.style.zIndex = 0;
    f.innerHTML = "<div class='dhxwin_btns'></div>";
    t.appendChild(f);

    var fr_cover = document.createElement("DIV");
    fr_cover.className = "dhxwin_fr_cover";
    fr_cover.innerHTML = "<iframe class='dhxwin_fr_cover_inner' frameborder='0' border='0'></iframe><div class='dhxwin_fr_cover_inner'></div>";
    t.appendChild(fr_cover);

    this.w[r.id] = {
        win: t,
        hdr: h,
        ftr: f,
        brd: k,
        fr_cover: fr_cover,
        b: {},
        conf: {
            z_id: window.dhx4.newId(),
            actv: false,
            modal: false,
            maxed: false,
            parked: false,
            sticked: false,
            visible: true,
            header: true,
            footer: true,
            text: r.text,
            keep_in_vp: r.keep_in_viewport,
            allow_move: r.move,
            allow_park: r.park,
            allow_resize: r.resize,
            max_w: null,
            max_h: null,
            min_w: 80,
            min_h: 80
        }
    };

    // buttons, id=>visible
    var btns = {
        help: { title: "Help", visible: false },
        stick: { title: "Stick", visible: false },
        park: { title: "Park", visible: true },
        minmax: { title: "Min/Max", visible: true },
        close: { title: "Close", visible: true }
    };
    for (var a in btns) {
        var b = new dhtmlXWindowsButton(this, r.id, a, btns[a].title, false);
        if (btns[a].visible == false) b.hide();
        h.lastChild.appendChild(b.button);
        this.w[r.id].b[a] = b;
        b = null;
    }
    this._winAdjustTitle(r.id);

    this.w[r.id].win.style.zIndex = window.dhx4.zim.reserve(this.w[r.id].conf.z_id);

    var cell = new dhtmlXWindowsCell(r.id, this);
    this.w[r.id].win.insertBefore(cell.cell, fr_cover);
    this.w[r.id].cell = cell;

    if (typeof (window.addEventListener) == "function") {
        this.w[r.id].win.addEventListener("mousedown", this._winOnMouseDown, false);
        this.w[r.id].win.addEventListener("mouseup", this._winOnMouseDown, false);
        if (this.conf.dblclick_ev) this.w[r.id].win.addEventListener("dblclick", this._winOnMouseDown, false);
    } else {
        this.w[r.id].win.attachEvent("onmousedown", this._winOnMouseDown);
        this.w[r.id].win.attachEvent("onmouseup", this._winOnMouseDown);
        if (this.conf.dblclick_ev) this.w[r.id].win.attachEvent("ondblclick", this._winOnMouseDown);
    }

    // fr for IE6
    this._winInitFRM(r.id);

    this._winSetPosition(r.id, r.left, r.top);
    this._winSetSize(r.id, r.width, r.height);
    this._winMakeActive(r.id);

    if (r.center == true) this.w[r.id].cell.center();
    if (r.modal == true) this.w[r.id].cell.setModal(true);
    if (r.header == false) this.w[r.id].cell.hideHeader();

    f = t = h = k = fr_cover = cell = null;

    return this.w[r.id].cell;
}

if (window.dhtmlXCalendarObject) {
    dhtmlXCalendarObject.prototype.lang = "ch";
    dhtmlXCalendarObject.prototype.langData["ch"] =
        {
            dateformat: "%Y-%m-%d",
            hdrformat: "%F %Y",
            monthesFNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthesSNames: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
            daysFNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            daysSNames: ["日", "一", "二", "三", "四", "五", "六"],
            weekstart: 1,
            weekname: "周",
            today: "今天",
            clear: "清除"
        }
}

/***********************************************************
******************一下是表头定制方法***********************
************************************************************/
/**
 *   @desc: fix hidden state for column in all rows
 *   @type: private
 */
dhtmlXGridObject.prototype._fixHiddenRowsAll=function(pb, ind, prop, state, index){
    index=index||"_cellIndex";
    var z = pb.rows.length;
    if (!this.hwReport || ind < this.hwReport.fixedColCount&&!this.userSetColumnHidden) {
	//if (!this.hwReport ) {
        for (var i = 0; i < z; i++) {
            var x = pb.rows[i].childNodes;

            if (x.length != this._cCount) {
                for (var j = 0; j < x.length; j++)
                    if (x[j][index] == ind) {
                        x[j].style[prop] = state;
                        break;
                    }
            } else
                x[ind].style[prop] = state;
        }
    } else {
        index = index || "_cellIndex";
        var z = pb.rows.length;

        for (var i = 0; i < z; i++) {
            var x = pb.rows[i].childNodes;
            if(this.hwReport.oldColWidths){
                if(ind<x.length)
                    x[ind].style["width"] = this.hwReport.oldColWidths[ind]+"px";
            }
            if (x.length != this._cCount) {
                for (var j = 0; j < x.length; j++)
                {
                    // 标题行设置
                    if(x.length==1&&x[j]["_cellIndex"]!=x[j]["_cellIndexS"]&&x[j]["_cellIndexS"]==0&&state==""){
                        x[j]["colSpan"]=x[j]["colSpan"]+1;
                    }
                    if (x[j][index] == ind) {
                        // 对于合并单元格的做出特殊处理
                        // 隐藏合并单元格的第一列 2017.8.2 lf
                        if(x[j]["colSpan"]>1&&state=="none")
                        {
                            if(pb&&pb.grid&&pb.grid._split_later&&pb.grid._split_later>ind)
                            {
                                if(f_width&&f_width==0){
                                    x[j]["colSpan"]=x[j]["colSpan"]-1;
                                    x[j].style[prop] = '';
                                }
                            }else{
                                x[j]["colSpan"]=x[j]["colSpan"]-1;
                                x[j].style[prop] = '';
                            }
                        }
                        else{
                            x[j].style[prop] = state;
                            if(state==''){
                                if(x[j+1])
                                {
                                    if(x[j+1][index]-x[j][index]>1)
                                    {
                                        // x[j]["colSpan"]=x[j+1][index]-x[j][index];
                                        if(i>1&&pb.rows[i-1]&&pb.rows[i-1].childNodes)
                                        {
                                            var pr=pb.rows[i-1].childNodes;
                                            if(pr.length==1){
                                                x[j]["colSpan"]=x[j+1][index]-x[j][index];
                                            }
                                            if(pr[j]&&pr[j][index]==x[j][index]&&pr[j+1]&&pr[j+1][index]==x[j+1][index]){
                                                x[j]["colSpan"]=x[j+1][index]-x[j][index];
                                            }else if(pr[j]==undefined&&pr[j+1]==undefined)
                                            {
                                                x[j]["colSpan"]=x[j+1][index]-x[j][index];
                                            }else if(pr[j]&&pr[j][index]<ind&&pr[j+1]&&pr[j+1][index]<ind)
                                            {
                                                x[j]["colSpan"]=x[j+1][index]-x[j][index];
                                            }
                                        }else
                                        {
                                            x[j]["colSpan"]=x[j+1][index]-x[j][index];
                                        }
                                    }
                                }else{
									if(j==x.length-1&&x[j]["_cellIndex"]!=x[j]["_cellIndexS"] ){
										x[j]["colSpan"]=x[j]["_cellIndex"]+1-x[j][index];
									}
								}
                            }
                        }
                    }
                    else{
                        // 隐藏列在合并单元格内部,不是合并单元格的第一个单元格  2017.8.3 lf
                        if(x[j]["colSpan"]>1&&state=="none")
                        {
                            if(x[j][index]<ind&&x[j][index]+x[j]["colSpan"]-1>=ind)
                            {
                                // 锁定列范围内。宽度为零另外处理，不为零只设置隐藏属性
                                if(pb&&pb.grid&&pb.grid._split_later&&pb.grid._split_later>ind)
                                {
                                    if(f_width&&f_width==0){
                                        x[j]["colSpan"]=x[j]["colSpan"]-1;
                                        x[j].style[prop] = '';
                                    }else
                                        x[j].style[prop] =state;
                                }
                                else{
                                    x[j]["colSpan"]=x[j]["colSpan"]-1;
                                    x[j].style[prop] = '';
                                }
                            }
                            else
                            {
                                if(x[j][index]<ind&&x[j+1])
                                {
                                    if(x[j+1][index]-x[j][index]>1&&x[j+1][index]>ind)
                                    {
                                        if(x[j]["colSpan"]>1)
                                        {
                                            if(pb&&pb.grid&&pb.grid._split_later&&pb.grid._split_later>ind)
                                            {
                                                if(f_width&&f_width==0){
                                                    x[j]["colSpan"]=x[j]["colSpan"]-1;
                                                    x[j].style[prop] = '';
                                                }
                                            }else{
                                                x[j]["colSpan"]=x[j]["colSpan"]-1;
                                                x[j].style[prop] = '';
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            if(x[j][index]<ind&&x[j+1])
                            {
                                if(x[j+1][index]-x[j][index]>1)
                                {
                                    if(state=='')
                                    {
                                        if(x[j+1][index]>ind) {
                                            // x[j]["colSpan"]=x[j+1][index]-x[j][index];
                                            if (i > 1 && pb.rows[i - 1] && pb.rows[i - 1].childNodes) {
                                                var pr = pb.rows[i - 1].childNodes;
                                                if (pr.length == 1) {
                                                    x[j]["colSpan"] = x[j + 1][index] - x[j][index];
                                                }
                                                if (pr[j] && pr[j][index] == x[j][index] && pr[j + 1] && pr[j + 1][index] == x[j + 1][index]) {
                                                    x[j]["colSpan"] = x[j + 1][index] - x[j][index];
                                                } else if (pr[j] == undefined && pr[j + 1] == undefined) {
                                                    x[j]["colSpan"] = x[j + 1][index] - x[j][index];
                                                } else if (pr[j] && pr[j][index] < ind && pr[j + 1] && pr[j + 1][index] < ind) {
                                                    x[j]["colSpan"] = x[j + 1][index] - x[j][index];
                                                }
                                            }
										}else if(x[j+1][index]==ind){	
											continue;	
										}
										x[j].style[prop] = '';
										if(j==x.length-1){
											if(x[j]["colSpan"]>1){
												if(x[j][index]+x[j]["colSpan"]-1<x.length-1){
													x[j]["colSpan"]=x.length-x[j][index];
												}
											}
										}
                                    }
                                    else
                                    {
                                        if(x[j][index]<ind&&x[j][index]+x[j+1][index]-x[j][index]-1>=ind)
                                            x[j].style[prop] = state;
                                    }
                                }
                            }
                            else if(x[j][index]<ind&&x[j+1]==undefined){
                                if(state=='')
                                {
                                    if (i > 1 && pb.rows[i - 1] && pb.rows[i - 1].childNodes) {
                                        var pr = pb.rows[i - 1].childNodes;
                                        if(pr.length==1){
                                            x[j]["colSpan"]= x[j]["colSpan"]+1;
                                        }
                                        else if(pr.lastChild&&(pr.lastChild[index]>ind||(pr.lastChild[index]<ind&&(pr.lastChild[index]+pr.lastChild["colSpan"]-1>ind)))){
                                            x[j]["colSpan"]= x[j]["colSpan"]+1;
                                        }
                                    }
                                    x[j].style[prop] = '';
                                }
                            }
                        }
                    }
                }

            } else{
                x[ind].style[prop] = state;
                /*  if(state=''&&this.hwReport.oldColWidths){
                 x[ind].style["width"] = this.hwReport.oldColWidths[ind];
                 }*/
            }

        }
    }
};
//重新设置表头行高度  字段选择
dhtmlXGridObject.prototype.changeHeaderHeight = function () {
    //非锁定列高度的重新设定
    if (this.hdr ) {
        var p=this.hdr.parentNode;
        if(p&&this.hdr.offsetHeight> p.offsetHeight){
            p.style.height=this.hdr.offsetHeight+"px";
        }
    }

    //锁定列高度的重新设定
    if (this._fake && !(this._fake.hdr.rows.length == 0)) { //含有锁定列的情况
        if (this._fake.hdr ) {
            var pn=this._fake.hdr.parentNode;
            if(pn&&this._fake.hdr.offsetHeight> pn.offsetHeight){
                pn.style.height=this._fake.hdr.offsetHeight+"px";
            }
        }
    }
}

//动态调用接口设置列隐藏或者不隐藏
dhtmlXGridObject.prototype.setColumnHiddenExp=function(ind, state){
	this.userSetColumnHidden=true;
	if(this._fake){
		this._fake.userSetColumnHidden=true;
	}
    this.setColumnHidden(ind, state);
	// 隐藏
	if(this._fake){
		this.setLockCellBorderClassExp(ind, state);
	}else{
		  this.setCellBorderClassExp(ind, state);
	}
}
// 返回隐藏的下一列
dhtmlXGridObject.prototype.hideColNextCol=function(ind,cellsobj){
	var isLock=true;
	if(this._fake){
		isLock=false;
	}
	var nextCol;
	if(this._cCount==cellsobj.length){
		nextCol=this.getNextColIndex(ind,isLock,cellsobj);
	}else{
		if(this._fake){
			var newFlag=true;
			for(var c=0;c<this._fake._cCount;c++){
				if(this._fake.cellWidthPX[c]>0){
					newFlag=false;
					ind=c;
					break;
				}
			}
			if(newFlag){
				for(var c=0;c<this._cCount;c++){
					if(this.cellWidthPX[c]>0){
						ind=c;
						newFlag=false;
						//return nextCol;
					}
				}
			}	
		}
		nextCol=this.getMergedGcellColIndex(ind,cellsobj);	   
	}
	return nextCol;
}
	dhtmlXGridObject.prototype.getMergedGcellColIndex=function(ind,cellsobj){
		var nextCol=ind;
        var newFlag=true;
		for(var c=0;c<ind;c++){
			if(this._fake){
				if(this._fake._cCount>c){
					if(this._fake.cellWidthPX[c]>0){
						nextCol=c;
						newFlag=false;
						break;
					}
				}else{
					if(this.cellWidthPX[c]>0){
						nextCol=c;
						newFlag=false;
						break;
					}
				}	
			}else{
				if(this.cellWidthPX[c]>0){
					nextCol=c;
					newFlag=false;
					break;
			    }
			}
		}
		if(newFlag){
			for(var i=0;i<cellsobj.length ;i++){
				if(cellsobj[i]._cellIndex<=ind){
					if(i+1<cellsobj.length&&cellsobj[i+1]._cellIndex>ind)
					{
						var flag=false;
						for(var j=cellsobj[i]._cellIndex;j<cellsobj[i+1]._cellIndex;j++){
							if(this._fake){
								if(j<this._fake._cCount){
									if(this._fake.cellWidthPX[j]>0){
										flag=true;
										break;
								    }
								}else{
									if(this.cellWidthPX[j]>0){
										flag=true;
										break;
									} 
								}
							}else{
								if(this.cellWidthPX[j]>0){
									flag=true;
									break;
								} 
							}   
						}
						if(flag){
						nextCol=i;	
						}else{
							for( var c=cellsobj[i+1]._cellIndex;c<this.cellWidthPX.length;c++){
								if(this._fake){
									if(c>this._fake._cCount){
										if(this._fake.cellWidthPX[c]>0){
											nextCol=this.getMergedGcellColIndex(c,cellsobj);
										    break;
										}	
									}else{
										if(this.cellWidthPX[c]>0){
											nextCol=this.getMergedGcellColIndex(c,cellsobj);
											break;
									  }
									}
								}
								else{
									if(this.cellWidthPX[c]>0){
										nextCol=this.getMergedGcellColIndex(c,cellsobj);
										break;
								  }
								}
							}
						}
					}
				}
			}
		}else{
			nextCol=this.getMergedGcellColIndex(nextCol,cellsobj);
		}
	return nextCol;
}
//获取隐藏列的下一列，以便设置边框
dhtmlXGridObject.prototype.getNextColIndex=function(ind,isLock,cellsobj){
		var nextCol;
		var flag=true;
	if(isLock){
		for(var c=0;c<ind;c++){
			if(this.cellWidthPX[c]>0){
				nextCol=c;
				flag=false;
				break;
			}
		}
		if(flag){
			nextCol=ind+1;
		}
		if(this.cellWidthPX&&this.cellWidthPX.length>nextCol){
			if(this.cellWidthPX[nextCol]==0)
				nextCol=this.hideColNextCol(nextCol,cellsobj);
		}
	}else{
		if(ind>=this._fake._cCount){
			flag=true;
			for(var c=0;c<ind;c++){
				if(this.cellWidthPX[c]>0){
					nextCol=c;
					flag=false;
					break;
				}
			}
			if(flag){
				nextCol=ind+1;
			}
			if(this.cellWidthPX&&this.cellWidthPX.length>nextCol){
				if(this.cellWidthPX[nextCol]==0)
					nextCol=this.hideColNextCol(nextCol,cellsobj);
			}
		}else{
			ind=this._fake._cCount;
			flag=true;
			for(var c=0;c<ind;c++){
				if(this._fake.cellWidthPX[c]>0){
					nextCol=c;
					flag=false;
					break;
				}
			}
			if(flag){
				nextCol=ind;
			}
			if(this._fake.cellWidthPX&&this._fake.cellWidthPX.length>nextCol){
				if(this._fake.cellWidthPX[nextCol]==0)
					nextCol=this.hideColNextCol(nextCol,cellsobj);
			}
		}
	}
	return nextCol;
}
 
// 动态隐藏后，设置最左边边框样式
dhtmlXGridObject.prototype.setCellBorderClassExp=function(ind,state){	
    // 添加c-first样式
    if(state){
		this.removeCFirstClass();
		if(this.cellWidthPX[0]>0&&ind>=0) return;
        for(var i=0;i<this.hdr.rows.length;i++){
            var rtr=this.hdr.rows[i];
            if(rtr.children&&rtr.children.length>0){
				var index=this.hideColNextCol(ind,rtr.children);
				if(this._fake&&this.hwReport.floatTitleContainer&&index==0){
					index=1;
				}
                vmd(rtr.children[index]).addClass('c-first');
            }
        }
        for(var i=0;i<this.obj.rows.length;i++){
            var rtr=this.obj.rows[i];
            if(rtr.children&&rtr.children.length>0){
				var index=this.hideColNextCol(ind,rtr.children);
                vmd(rtr.children[index]).addClass('c-first');
            }
        }
    }
    // 如果不是第一列，删除c-first样式
    else{
        this.removeCFirstClass();
		for(var c=0;c<this._cCount;c++){
			if(this.cellWidthPX[c]>0){
				ind=c;
				break;
			}
		}
		if(ind>=1)
		 ind=ind-1;
		this.setCellBorderClassExp(ind,true);
    }
}
// 动态隐藏后，设置最左边边框样式
dhtmlXGridObject.prototype.setLockCellBorderClassExp=function(ind,state){
    // 添加c-first样式
    if(state){
		this.removeCFirstClass();
        for(var i=0;i<this._fake.hdr.rows.length;i++){
            var rtr=this._fake.hdr.rows[i];
            if(rtr.children&&rtr.children.length>0){
				var index=this.hideColNextCol(ind,rtr.children);
				if(index>=this._fake._cCount){
					this.setCellBorderClassExp(index,false);
					continue;
				}
                vmd(rtr.children[index]).addClass('c-first');
            }
        }
        for(var i=0;i<this._fake.obj.rows.length;i++){
            var rtr=this._fake.obj.rows[i];
            if(rtr.children&&rtr.children.length>0){
				var index=this.hideColNextCol(ind,rtr.children);
				if(index>=this._fake._cCount){
					this.setCellBorderClassExp(index,false);
					continue;
				}
                vmd(rtr.children[index]).addClass('c-first');
            }
        }
    }
    // 如果不是第一列，删除c-first样式
    else{
        this.removeCFirstClass();
		var flag=true;
		for(var c=0;c<this._fake._cCount;c++){
			if(this._fake.cellWidthPX[c]>0){
				ind=c;
				flag=false;
				break;
			}
		}
		if(flag){
			this.setCellBorderClassExp(ind,true);
			return;
		}
		if(ind>=1)
		  ind=ind-1;
		this.setLockCellBorderClassExp(ind,true);
    }
}

dhtmlXGridObject.prototype.removeCFirstClass=function(){
	if(this._fake){
		for(var i=0;i<this._fake.hdr.rows.length;i++){
				var rtr=this._fake.hdr.rows[i];
				if(rtr.children&&rtr.children.length>0){
					for(var c=0;c<rtr.children.length;c++){
						if(c>0&&vmd(rtr.children[c]).hasClass('c-first')){
							vmd(rtr.children[c]).removeClass('c-first');
						}
					}
				}
		}
			for(var i=0;i<this._fake.obj.rows.length;i++){
				var rtr=this._fake.obj.rows[i];
				if(rtr.children&&rtr.children.length>0){
					for(var c=0;c<rtr.children.length;c++){
						if(c>0&&vmd(rtr.children[c]).hasClass('c-first')){
							vmd(rtr.children[c]).removeClass('c-first');
						}
					}
				}
			}
	}
	for(var i=0;i<this.hdr.rows.length;i++){
		var rtr=this.hdr.rows[i];
		if(rtr.children&&rtr.children.length>0){
			for(var c=0;c<rtr.children.length;c++){
				if(c>0&&vmd(rtr.children[c]).hasClass('c-first')){
				   vmd(rtr.children[c]).removeClass('c-first');
				 }
			} 
		}
	}
	for(var i=0;i<this.obj.rows.length;i++){
		var rtr=this.obj.rows[i];
		if(rtr.children&&rtr.children.length>0){
			for(var c=0;c<rtr.children.length;c++){
				if(c>0&&vmd(rtr.children[c]).hasClass('c-first')){
					vmd(rtr.children[c]).removeClass('c-first');
				}
			}
		}
	}
}
dhtmlXGridObject.prototype.configRefresh = function (configGrid) {
    hwDas.ajax({
        type: "get",
        url:vmd.virtualPath + "/" +configGrid.xmlModelXml,
        dataType: "json",
        success: function(res) {
            var host =vmdSettings.vmdReportIp ;
            var hwRao = new HwRao(host, "report");
			vmd.isCheckFileExist("/" +configGrid.configFile.rptHeaderPath,function(resultInfo){
				if(resultInfo&&resultInfo.hiddenFields&&resultInfo.hiddenFields.length>0)
				{
					res.main.body.columns.oldwidth=dhx4._copyObj(res.main.body.columns.width);
					res.main.body.columns.hiddenFields=resultInfo.hiddenFields;
					for(var i=0;i<resultInfo.hiddenFields.length;i++){
						res.main.body.columns.width[resultInfo.hiddenFields[i]]=0;
					}
				}
				configGrid.loadJSON(Ext.encode(res), function() {
					configGrid.headerdefine = res;
					configGrid.vmdreport.myMask.hide();
				})
				configGrid.vmdreport.myMask.hide();
			},true,vmd.virtualPath,function(){
				// 表头定制文件不存在
				configGrid.loadJSON(Ext.encode(res), function() {
					configGrid.headerdefine = res;
					configGrid.vmdreport.myMask.hide();
				})
				configGrid.vmdreport.myMask.hide();
				return true
			});
},
 error:function(){
    configGrid.vmdreport.myMask.hide();
    configGrid.vmdreport.loading = false;
    var msg="找不到模板文件，路径为："+configGrid.xmlModelXml;
    Ext.Msg.alert("错误信息", msg,
        function() {})
    return true
}
})
}
// 字段选择
dhtmlXGridObject.prototype.setCheckBox = function (z, st1, i, check) {

    var w = z.lastChild;
    w._cellIndex = w._cellIndexS = i - 1;
    w.innerHTML = "<div class='hdrcell'>" + w.innerText + "</div>";

    if (this._hrrar && this._hrrar[i] && !_isIE)
        w.style.display = 'none';

    if ((check || "").indexOf("#") != -1) {
        var t = check.match(/(^|{)#([^}]+)(}|$)/);

        if (t) {
            var tn = "_in_header_" + t[2];

            if (this[tn])
                this[tn](w.firstChild, i, check.split(t[0]));
        }
    }

    if (st1)
        w.style.cssText = st1[i-1];
}

/**
 * @param t
 * @param i
 * @param c
 字段选择
 */
dhtmlXGridObject.prototype._in_header_master_checkbox = function (t, i, c) {

    if (t.innerText == "#master_checkbox") {
        t.innerText = "";
    } else {
        t.innerText = t.innerText + "<br/>";
    }
    //20141222 add
    if (i < lockColNum) {
        t.innerHTML = c[0] + t.innerText + "<input type='checkbox' disabled/>" + c[1];
        // t.innerHTML = c[0] + t.innerText + "<input type='checkbox' />" + c[1];
    } else {
        t.innerHTML = c[0] + t.innerText + "<input type='checkbox'/>" + c[1];
    }
    //end
    //t.innerHTML = c[0] + t.innerText + "<input type='checkbox' />" + c[1];
    var self = this;

    t.getElementsByTagName("input")[0].onclick = function (e) {

        //行号
        var rowId = t.parentNode.parentNode.rowIndex;
        //alert(i);
        //列号
        //debugger
        //var colId = t.parentNode.outerHTML && t.parentNode.outerHTML.match(/_cellIndex="\d*"/)[0] && t.parentNode.outerHTML.match(/_cellIndex="\d*"/)[0].match(/\d\d*/)[0];
        var colId = t.parentNode._cellIndex;
        //是否选中
        var state = true;
        if (!this.checked) {
            state = false;
        }

        //判断是不是最后一行
        if (!(rowId == t.parentNode.parentNode.parentNode.childNodes[t.parentNode.parentNode.parentNode.childNodes.length - 1].rowIndex)) {
            if (state) {
                //选中
                self.setChecked(colId, t, rowId);
            } else {
                //未选中
                self.setNoChecked(colId, t, rowId);
            }
            //最后一行特殊处理
        } else {
            if (state) {
                //根据最后一行复选框设置第一行复选框选中
                self.setDisperseRelateColsChecked(colId, t, rowId);
            } else {
                //根据最后一行复选框设置第一行复选框未选中
                self.setDisperseRelateColsNoChecked(colId, t, rowId);
            }
        }
    }
}

// 字段选择
dhtmlXGridObject.prototype.setDisperseRelateColsChecked = function (colId, t, rowId) {

    //configGrid.hiddenFields.length;
    //debugger
    //求单元格范围
    var clickFakeRowObj = t.parentNode.parentNode;
    var fakeRowsObj = t.parentNode.parentNode.parentNode.childNodes;
    var realRowsObj =this.hwReport.headers;
	for(var i=0;i<realRowsObj.length;i++){
		var h=realRowsObj[i];
		if(typeof h[0]=="string"){
			var s=h[0].split(',');
			h[0]=s;
		}
	}
    var colsNum = 1, star = 0, end = 0;
    rowId = parseInt(rowId);
    colId = parseInt(colId);

    star = colId;
    end = star;

    //删除隐藏列
    this.delHiddenFields(colId);

    //debugger
    if (rowId == fakeRowsObj.length - 1) {
        var rowStar = 0, rowEnd = 0;
        //向前找找到本单元格开始坐标
        rowStar = this.getRowStar(rowId, star, realRowsObj);

        //向后找找到本单元格结束坐标
        rowEnd = this.getRowEnd(rowId, end, realRowsObj);



        var checkId = 0, checked = false;
        for (var a = rowStar; a <= rowEnd; a++) {
            if (fakeRowsObj[rowId].childNodes[a].getElementsByTagName("input")[0].checked) {
                checked = true;
            }
        }

        if (checked) {
            for (var d = 0; d <= rowEnd; d++) {
                //realRowsObj[rowId - 4][0][d].match(/[^#cspan|#rspan]*/gi)[0]
                if (realRowsObj[rowId -2][0][d].match(/^(?!#cspan|#rspan).*/i) &&
                    realRowsObj[rowId - 2][0][d].match(/^(?!#cspan|#rspan).*/i)[0]) {

                    if (d >= rowStar && d <= rowEnd) {
                        if(checkId<fakeRowsObj[rowId - 2].childNodes.length) {
                            if (fakeRowsObj[rowId - 2].childNodes[checkId].getElementsByTagName("input")[0]) {
                                fakeRowsObj[rowId - 2].childNodes[checkId].getElementsByTagName("input")[0].checked = true;
                            }
                        }
                    }
                    checkId++;
                }
            }
        } else {
            for (var d = 0; d <= rowEnd; d++) {
                if (realRowsObj[rowId -2][0][d].match(/[^#cspan|#rspan]*/gi) &&
                    realRowsObj[rowId - 2][0][d].match(/[^#cspan|#rspan]*/gi)[0]) {

                    if (d >= rowStar && d <= rowEnd) {
                        if (checkId < fakeRowsObj[rowId - 2].childNodes.length) {
                            fakeRowsObj[rowId - 2].childNodes[checkId].getElementsByTagName("input")[0].checked = false;
                        }
                    }
                    checkId++;
                }
            }
        }
    }

    //此复选框选中时上面行的复选框选中处理
    for (var i = rowId - 3; i >= 2; i--) {
        var rowStar = 0, rowEnd = 0;
        //向前找找到本单元格开始坐标
        for (var j = star; j >= 0; j--) {
            if (realRowsObj[i - 2][0][j].match(/#[^c]span|[^#cspan]*/) &&
                realRowsObj[i - 2][0][j].match(/#[^c]span|[^#cspan]*/)[0]) {
                rowStar = j;
                break;
            }
        }

        //向后找找到本单元格结束坐标
        //rowEnd = this.getRowEnd(rowId, end, realRowsObj);
        for (var j = end + 1; j < realRowsObj[i][0].length; j++) {
            if (realRowsObj[i - 2][0][j].match(/#[^c]span|[^#cspan]*/) &&
                realRowsObj[i - 2][0][j].match(/#[^c]span|[^#cspan]*/)[0]) {
                rowEnd = j - 1;
                break;
            } else {
                rowEnd = j;
            }
        }
        //最后一列单元格的情况
        if (end == realRowsObj[i][0].length - 1) {
            rowEnd = end;
        }
        var checkId = 0;
        for (var d = 0; d <= rowEnd; d++) {
            if (realRowsObj[i - 1][0][d].match(/[^#cspan|#rspan]*/gi) &&
                realRowsObj[i - 1][0][d].match(/[^#cspan|#rspan]*/gi)[0]) {
                if (d >= rowStar && d <= rowEnd) {
                    if (fakeRowsObj[i + 1].childNodes[checkId].getElementsByTagName("input")[0]) {
                        if (fakeRowsObj[i + 1].childNodes[checkId].getElementsByTagName("input")[0].checked) {
                            checked = true;
                        }
                    }
                }
                checkId++;
            }
        }

        if (checked) {
            var ch = 0, cellVal;
            for (var d = 0; d <= rowEnd; d++) {
                //start 20141220
                cellVal = realRowsObj[i - 2][0][d];
                if (realRowsObj[i - 2][0][d] == "") {
                    realRowsObj[i - 2][0][d] = "true";
                }
                //end
                if (realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi) &&
                    realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi)[0]) {

                    realRowsObj[i - 2][0][d] = cellVal;

                    if (d >= rowStar && d <= rowEnd) {
                        if (fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0]) {
                            fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0].checked = true;
                        }
                    }
                    ch++;
                }
            }
        } else {
            var ch = 0;
            for (var d = 0; d <= rowEnd; d++) {

                if (realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi) &&
                    realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi)[0]) {

                    if (d >= rowStar && d <= rowEnd) {
                        if (fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0]) {
                            fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0].checked = false;
                        }
                    }
                    ch++;
                }
            }
        }
    }
}

//字段选择
dhtmlXGridObject.prototype.setDisperseRelateColsNoChecked = function (colId, t, rowId) {
    //求单元格范围
    var clickFakeRowObj = t.parentNode.parentNode;
    var fakeRowsObj = t.parentNode.parentNode.parentNode.childNodes;
    var realRowsObj =this.hwReport.headers;
	for(var i=0;i<realRowsObj.length;i++){
		var h=realRowsObj[i];
		if(typeof h[0]=="string"){
			var s=h[0].split(',');
			h[0]=s;
		}
	}
    var colsNum = 1, star = 0, end = 0;
    rowId = parseInt(rowId);
    colId = parseInt(colId);

    star = colId;
    end = star;
    //添加隐藏列
    this.addHiddenFields(colId);

    if (rowId == fakeRowsObj.length - 1) {
        var rowStar, rowEnd;
        //向前找找到本单元格开始坐标
        for (var j = star; j >= 0; j--) {
//            if (realRowsObj[rowId - 4][0][j].match(/#[^c]span|[^#cspan]*/) &&
//                realRowsObj[rowId - 4][0][j].match(/#[^c]span|[^#cspan]*/)[0]) {
            if (realRowsObj[rowId - 2][0][j].match(/#[^c]span|[^#cspan]*/) &&
                realRowsObj[rowId - 2][0][j].match(/#[^c]span|[^#cspan]*/)[0]) {
                rowStar = j;
                break;
            }
        }
 
        //向后找找到本单元格结束坐标
        for (var b = end + 1; b < realRowsObj[rowId - 2][0].length; b++) {
            if (realRowsObj[rowId - 2][0][b].match(/#[^c]span|[^#cspan]*/) &&
                realRowsObj[rowId - 2][0][b].match(/#[^c]span|[^#cspan]*/)[0]) {
                rowEnd = b - 1;
                break;
            }
        }

        var checkId = 0, checked = false;
        for (var a = rowStar; a <= rowEnd; a++) {
            if (fakeRowsObj[rowId].childNodes[a].getElementsByTagName("input")[0].checked) {
                checked = true;
            }
        }

        if (checked) {
            for (var d = 0; d <= rowEnd; d++) {
                if (realRowsObj[rowId - 2][0][d].match(/^(?!#cspan|#rspan).*/i) &&
                    realRowsObj[rowId - 2][0][d].match(/^(?!#cspan|#rspan).*/i)[0]) {

                    if (d >= rowStar && d <= rowEnd) {
                        if (fakeRowsObj[rowId - 2].childNodes[checkId].getElementsByTagName("input")[0]) {
                            fakeRowsObj[rowId - 2].childNodes[checkId].getElementsByTagName("input")[0].checked = true;
                        }
                    }
                    checkId++;
                }
            }
        } else {
            for (var d = 0; d <= rowEnd; d++) {
                //realRowsObj[rowId - 4][0][d].match(/[^#cspan|#rspan]*/gi)
                if (realRowsObj[rowId - 2][0][d].match(/^(?!#cspan|#rspan).*/i) &&
                    realRowsObj[rowId -2][0][d].match(/^(?!#cspan|#rspan).*/i)[0]) {

                    if (d >= rowStar && d <= rowEnd) {
                        if(checkId<fakeRowsObj[rowId - 2].childNodes.length) {
                            if (fakeRowsObj[rowId - 2].childNodes[checkId].getElementsByTagName("input")[0]) {
                                fakeRowsObj[rowId - 2].childNodes[checkId].getElementsByTagName("input")[0].checked = false;
                            }
                        }
                    }
                    checkId++;
                }
            }
        }
    }
    //debugger
    //此复选框选中时上面行的复选框选中处理
    for (var i = rowId - 3; i >= 2; i--) {
        var rowStar, rowEnd;
        //向前找找到本单元格开始坐标
        for (var j = star; j >= 0; j--) {
            if (realRowsObj[i - 2][0][j].match(/[^#cspan|#rspan]*/gi) &&
                realRowsObj[i - 2][0][j].match(/[^#cspan|#rspan]*/gi)[0]) {
                rowStar = j;
                break;
            } 
        }
        //向后找找到本单元格结束坐标
        for (var b = end + 1; b < realRowsObj[i - 2][0].length; b++) {
            if (realRowsObj[i - 2][0][b].match(/[^#cspan|#rspan]*/gi) &&
                realRowsObj[i - 2][0][b].match(/[^#cspan|#rspan]*/gi)[0]) {
                rowEnd = b - 1;
                break;
            } else {
                rowEnd = b;
            }
        }
        //最后一列单元格的情况
        if (end == realRowsObj[i][0].length - 1) {
            rowEnd = end;
        }

        //debugger
        //var checked = false;
        var checkId = 0;
        for (var d = 0; d <= rowEnd; d++) {
            if (realRowsObj[i - 1][0][d].match(/^(?!#cspan|#rspan).*/i) &&
                realRowsObj[i - 1][0][d].match(/^(?!#cspan|#rspan).*/i)[0]) {
                if (d >= rowStar && d <= rowEnd) {
                    if(checkId<fakeRowsObj[i+1].childNodes.length) {
                        if (fakeRowsObj[i + 1].childNodes[checkId].getElementsByTagName("input")[0]) {
                            if (fakeRowsObj[i + 1].childNodes[checkId].getElementsByTagName("input")[0].checked) {
                                checked = true;
                            }
                        }
                    }
                }
                checkId++;
            }
        }

        //判断最后一行在范围内的复选框是否选中
        for (var a = rowStar; a <= rowEnd; a++) {
            if (fakeRowsObj[rowId].childNodes[a].getElementsByTagName("input")[0].checked) {
                checked = true;
            }
        }

        if (checked) {
            var ch = 0;
            for (var d = 0; d <= rowEnd; d++) {
                if (realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi) &&
                    realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi)[0]) {

                    if (d >= rowStar && d <= rowEnd) {
                        if (fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0]) {
                            fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0].checked = true;
                        }
                    }
                    ch++;
                }
            }
        } else {
            var ch = 0, cellVal;
            for (var d = 0; d <= rowEnd; d++) {
                cellVal = realRowsObj[i - 2][0][d];
                //start 追加 20141220
                if (realRowsObj[i - 2][0][d] == "") {
                    realRowsObj[i - 2][0][d] = "true";
                }
                //end
                if (realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi) &&
                    realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi)[0]) {

                    realRowsObj[i - 2][0][d] = cellVal;

                    if (d >= rowStar && d <= rowEnd) {
                        if (fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0]) {
                            fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0].checked = false;
                        }
                    }
                    ch++;
                }
            }
        }
    }
}

//字段选择
dhtmlXGridObject.prototype.setChecked = function (colId, t, rowId) {
    //求单元格范围
    var clickFakeRowObj = t.parentNode.parentNode;
    var fakeRowsObj = t.parentNode.parentNode.parentNode.childNodes;
    var realRowsObj =this.hwReport.headers;
	for(var i=0;i<realRowsObj.length;i++){
		var h=realRowsObj[i];
		if(typeof h[0]=="string"){
			var s=h[0].split(',');
			h[0]=s;
		}
	}
    var colsNum = 1, star = 0, end = 0;
    rowId = parseInt(rowId);
    colId = parseInt(colId);

    for (var i = colId + 1; i < realRowsObj[rowId - 2][0].length; i++) {
        if (realRowsObj[rowId - 2][0][i].match(/#cspan*/) &&
            realRowsObj[rowId - 2][0][i].match(/#cspan*/)[0]) {
            colsNum++;
        } else {
            break;
        }
    }

    star = colId;
    end = colId + colsNum - 1;

    //设置下面行的复选框全部选中或者不选中(除去最后一行)
    for (var i = rowId - 1; i < realRowsObj.length - 1; i++) {
        var checkId = 0;
        for (var j = star; j <= end; j++) {
            if (realRowsObj[i][0][j].match(/^(?!#cspan|#rspan).*/i) &&
                realRowsObj[i][0][j].match(/^(?!#cspan|#rspan).*/i)[0]) {

                if (fakeRowsObj[i + 2].childNodes[checkId].getElementsByTagName("input")[0]) {
                    fakeRowsObj[i + 2].childNodes[checkId].getElementsByTagName("input")[0].checked = true;
                }
                checkId++;
            } else {
                continue;
            }
        }
    }

    //设置最后一行范围内的复选框选中
    for (var i = star; i <= end; i++) {
        if (fakeRowsObj[fakeRowsObj.length - 1].childNodes[i].getElementsByTagName("input")[0]) {
            fakeRowsObj[fakeRowsObj.length - 1].childNodes[i].getElementsByTagName("input")[0].checked = true;
        }
        //删除隐藏列
        this.delHiddenFields(i);
    }

    //此复选框选中时上面行的复选框选中处理
    for (var i = rowId; i >= 2; i--) {
        var checkId = 0, rowStar, rowEnd;
        var cellVal;
        for (var j = star; j >= 0; j--) {
            //向前找找到本单元格开始坐标
            if (realRowsObj[i - 2][0][j].match(/[^#cspan|#rspan]*/gi) &&
                realRowsObj[i - 2][0][j].match(/[^#cspan|#rspan]*/gi)[0]) {
                rowStar = j;
                for (var a = 0; a <= rowStar; a++) {
                    //start add 20141220
                    cellVal = realRowsObj[i - 2][0][a];
                    if (realRowsObj[i - 2][0][a] == "") {
                        realRowsObj[i - 2][0][a] = "true";
                    }
                    //end
                    if (realRowsObj[i - 2][0][a].match(/[^#cspan|#rspan]*/gi) &&
                        realRowsObj[i - 2][0][a].match(/[^#cspan|#rspan]*/gi)[0]) {
                        //add
                        realRowsObj[i - 2][0][a] = cellVal;
                        //
                        checkId++;
                    }
                }
                if (fakeRowsObj[i].childNodes[checkId - 1].getElementsByTagName("input")[0]) {
                    fakeRowsObj[i].childNodes[checkId - 1].getElementsByTagName("input")[0].checked = true;
                }

                break;
            }
        }
    }
}

//字段选择
dhtmlXGridObject.prototype.setNoChecked = function (colId, t, rowId) {

    //求单元格范围
    var clickFakeRowObj = t.parentNode.parentNode;
    var fakeRowsObj = t.parentNode.parentNode.parentNode.childNodes;
    var realRowsObj =this.hwReport.headers;
	for(var i=0;i<realRowsObj.length;i++){
		var h=realRowsObj[i];
		if(typeof h[0]=="string"){
			var s=h[0].split(',');
			h[0]=s;
		}
	}
    var colsNum = 1, star = 0, end = 0;
    rowId = parseInt(rowId);
    colId = parseInt(colId);

    var lastRowNum = fakeRowsObj.length - 1;

    for (var i = colId + 1; i < realRowsObj[rowId - 2][0].length; i++) {
        if (realRowsObj[parseInt(rowId) - 2][0][i].match(/#cspan*/) &&
            realRowsObj[parseInt(rowId) - 2][0][i].match(/#cspan*/)[0]) {
            colsNum++;
        } else {
            break;
        }
    }

    star = colId;
    end = colId + colsNum - 1;

    //设置下面行的复选框全部选中或者不选中(除去最后一行)
    for (var i = rowId - 1; i < realRowsObj.length - 1; i++) {
        var checkId = 0;
        for (var j = star; j <= end; j++) {
            if (realRowsObj[i][0][j].match(/^(?!#cspan|#rspan).*/i) &&
                realRowsObj[i][0][j].match(/^(?!#cspan|#rspan).*/i)[0]) {

                if (fakeRowsObj[i + 2].childNodes[checkId].getElementsByTagName("input")[0]) {
                    fakeRowsObj[i + 2].childNodes[checkId].getElementsByTagName("input")[0].checked = false;
                }
                checkId++;
            } else {
                continue;
            }
        }
    }

    //设置最后一行范围内的复选框选中与不选中
    for (var i = star; i <= end; i++) {
        if (fakeRowsObj[fakeRowsObj.length - 1].childNodes[i].getElementsByTagName("input")[0]) {
            fakeRowsObj[fakeRowsObj.length - 1].childNodes[i].getElementsByTagName("input")[0].checked = false;
        }
        //添加隐藏列
        this.addHiddenFields(i);
    }

    //debugger

    //此复选框未选中时上面行的复选框选中与未选中处理
    for (var i = rowId - 1; i >= 2; i--) {
        var checkId = 0, rowStar, rowEnd;
        //向前找找到本单元格开始坐标
        for (var j = star; j >= 0; j--) {
            if (realRowsObj[i - 2][0][j].match(/[^#cspan|#rspan]*/gi) &&
                realRowsObj[i - 2][0][j].match(/[^#cspan|#rspan]*/gi)[0]) {
                rowStar = j;
                break;
            }
        }
        //向后找找到本单元格结束坐标
        for (var b = end; b < realRowsObj[i - 2][0].length; b++) {
            if (realRowsObj[i - 2][0][b].match(/[^#cspan|#rspan]*/gi) &&
                realRowsObj[i - 2][0][b].match(/[^#cspan|#rspan]*/gi)[0]) {
                rowEnd = b - 1;
                break;
            } else {
                rowEnd = b;
            }
        }

        var checked = false;
        for (var d = 0; d <= rowEnd; d++) {
            if (realRowsObj[i - 1][0][d].match(/[^#cspan|#rspan]*/gi) &&
                realRowsObj[i - 1][0][d].match(/[^#cspan|#rspan]*/gi)[0]) {
                if (d >= rowStar && d <= rowEnd) {
                    if (fakeRowsObj[i + 1].childNodes[checkId].getElementsByTagName("input")[0]) {
                        if (fakeRowsObj[i + 1].childNodes[checkId].getElementsByTagName("input")[0].checked) {
                            checked = true;
                        }
                    }
                }
                checkId++;
            }
        }

        //判断最后一行在范围内的复选框是否选中
        for (var a = rowStar; a <= rowEnd; a++) {

            if (fakeRowsObj[lastRowNum].childNodes[a].getElementsByTagName("input")[0].checked) {
                checked = true;
            }
        }

        //设置上面一行选中与未选中
        var ch = 0;
        if (checked) {
            for (var d = 0; d <= rowEnd; d++) {
                if (realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi) &&
                    realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi)[0]) {
                    if (d >= rowStar && d <= rowEnd) {
                        if (fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0]) {
                            fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0].checked = true;
                        }
                    }
                    ch++;
                }
            }
        } else {
            var cellVal;
            for (var d = 0; d <= rowEnd; d++) {
                //start 20141220
                cellVal = realRowsObj[i - 2][0][d];
                if (realRowsObj[i - 2][0][d] == "") {
                    realRowsObj[i - 2][0][d] = "true";
                }
                //end
                if (realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi) &&
                    realRowsObj[i - 2][0][d].match(/[^#cspan|#rspan]*/gi)[0]) {

                    realRowsObj[i - 2][0][d] = cellVal;

                    if (d >= rowStar && d <= rowEnd) {
                        fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0].checked = false;
                    }
                    //fakeRowsObj[i].childNodes[ch].getElementsByTagName("input")[0].checked = false;
                    ch++;
                }
            }
        }
    }
}

//添加隐藏列信息字段选择
dhtmlXGridObject.prototype.addHiddenFields = function (colId) {
    var bool = false;
    //判断隐藏列是否为空
    if (hiddenFields) {
        for (var i = 0; i < hiddenFields.length; i++) {
            if (hiddenFields[i] == colId) {
                bool = true;
            }
        }
        if (!bool) {
            hiddenFields.push(colId);
        }
    } else {
        hiddenFields.push(colId);
    }

    //设置隐藏列
    if (gridHeaderBottom) {
        gridHeaderBottom.grid.setColumnHiddenForHeader(colId, true);
    }
}
/**
 * @param rowId
 * @param star
 * @param realRowsObj 字段选择
 */
dhtmlXGridObject.prototype.getRowStar = function (rowId, star, realRowsObj) {
    for (var j = star; j >= 0; j--) {
        if (realRowsObj[rowId - 3][0][j].match(/#[^c]span|[^#cspan]*/) &&
            realRowsObj[rowId - 3][0][j].match(/#[^c]span|[^#cspan]*/)[0]) {
            rowStar = j;
            return rowStar;
        }
    }
}

/**
 * @param rowId
 * @param end
 * @param realRowsObj 字段选择
 */
dhtmlXGridObject.prototype.getRowEnd = function (rowId, end, realRowsObj) {
    var num = 0, rowEnd, rowNumEnd;
    for (var i = rowId -3; i >= 0; i--) {
        for (var b = end; b < realRowsObj[i][0].length; b++) {
            //if (realRowsObj[i][0][b].match(/[^#rspan]|[^#cspan]*/) &&
            //    realRowsObj[i][0][b].match(/[^#rspan]|[^#cspan]*/)[0]) {

            if (realRowsObj[i][0][b].match(/#[^c]span|[^#cspan]*/) &&
                realRowsObj[i][0][b].match(/#[^c]span|[^#cspan]*/)[0]) {
                if (num == 0) {
                    rowEnd = b;
                    return rowEnd;
                } else {
                    rowNumEnd = b;
                    return rowNumEnd;
                }
            }
        }
        num++;
    }

    //for (var i = rowId - 4; i >= 0; i--) {
    //    for (var b = end + 1; b < realRowsObj[i][0].length; b++) {
    //        //if (realRowsObj[i][0][b].match(/[^#rspan]|[^#cspan]*/) &&
    //        //    realRowsObj[i][0][b].match(/[^#rspan]|[^#cspan]*/)[0]) {

    //        if (realRowsObj[i][0][b].match(/#[^c]span|[^#cspan]*/) &&
    //                realRowsObj[i][0][b].match(/#[^c]span|[^#cspan]*/)[0]) {
    //            if (num == 0) {
    //                rowEnd = b - 1;
    //                return rowEnd;
    //            } else {
    //                rowNumEnd = b - 1;
    //                return rowNumEnd;
    //            }
    //        }
    //    }
    //    num++;
    //}
}

//删除隐藏列信息  字段选择
dhtmlXGridObject.prototype.delHiddenFields = function (colId) {
    //debugger
    for (var i = 0; i < hiddenFields.length; i++) {
        if (hiddenFields[i] == colId) {
            hiddenFields.splice(i, 1);
        }
    }

    //设置显示列
    if (gridHeaderBottom) {
        gridHeaderBottom.grid.setColumnHiddenForHeader(colId, false);
    }
}
/**
 * 隐藏表头列
 * @param ind （隐藏列）
 * @param state （显示还是隐藏）
 * @returns {*}字段选择
 */
dhtmlXGridObject.prototype.setColumnHiddenForHeader = function (ind, state) {
    //debugger
    if (!this.hdr.rows.length) {
        if (!this._ivizcol)
            this._ivizcol = [];
        return this._ivizcol[ind] = state;
    }

    if ((this.fldSorted) && (this.fldSorted.cellIndex == ind) && (state))
        this.sortImg.style.display = "none";

    var f = convertStringToBoolean(state);

    if (f) {
        if (!this._hrrar)
            this._hrrar = new Array();

        else if (this._hrrar[ind])
            return;
        this._hrrar[ind] = "display:none;";
        this._hideShowColumnForHeader(ind, "none");
    } else {
        if ((!this._hrrar) || (!this._hrrar[ind]))
            return;
        this._hrrar[ind] = "";
        this._hideShowColumnForHeader(ind, "");
    }

    if ((this.fldSorted) && (this.fldSorted.cellIndex == ind) && (!state))
        this.sortImg.style.display = "inline";

    this.setSortImgPos();
    this.setSizes();
    this.callEvent("onColumnHidden", [ind, state])
}

function convertStringToBoolean(inputString){
    if (typeof (inputString) == "string")
        inputString=inputString.toLowerCase();

    switch (inputString){
        case "1":
        case "true":
        case "yes":
        case "y":
        case 1:
        case true:
            return true;
            break;

        default: return false;
    }
}
/**
 *   @desc: hide column
 *   @param: ind - column index
 *   @param: state - hide/show
 *   @edition: Professional
 *   @type:  private
 *字段选择
 */
dhtmlXGridObject.prototype._hideShowColumnForHeader = function (ind, state) {
    var hind = ind;

    if (this.hdr.rows[1] && (this.hdr.rows[1]._childIndexes) && (this.hdr.rows[1]._childIndexes[ind] != ind)) {
        hind = this.hdr.rows[1]._childIndexes[ind];
    }

    if (state == "none") {
        this.hdr.rows[0].cells[ind]._oldWidth = this.hdr.rows[0].cells[ind].style.width || (this.initCellWidth[ind] + "px");
        this.hdr.rows[0].cells[ind]._oldWidthP = this.cellWidthPC[ind];
        this.obj.rows[0].cells[ind].style.width = "0px";

        var t = { rows: [this.obj.rows[0]] }
        this.forEachRow(function (id) {
            if (this.rowsAr[id].tagName == "TR")
                t.rows.push(this.rowsAr[id])
        })
        this._fixHiddenRowsAll(t, ind, "display", "none");

        if (this.isTreeGrid())
            this._fixHiddenRowsAllTG(ind, "none");
        //  if ((_isOpera && _OperaRv < 9) || _isKHTML || (_isFF)) {
        //   if ((_isOpera && _OperaRv < 9) || _isKHTML ) {
        //   this._fixHiddenRowsAll(this.hdr, ind, "display", "none", "_cellIndexS");
        //   }
        if ((_isOpera && _OperaRv < 9) || _isKHTML || (_isFF)) {
            this._fixHiddenRowsAll(this.hdr, ind, "display", "none", "_cellIndexS");
        }else{
            this._fixHiddenRowsAll(this.hdr, ind, "display", "none");
        }
        if (this.ftr)
            this._fixHiddenRowsAll(this.ftr.childNodes[0], ind, "display", "none");
        this._fixHiddenRowsAll(this.hdr, ind, "whiteSpace", "nowrap", "_cellIndexS");

        if (!this.cellWidthPX.length && !this.cellWidthPC.length)
            this.cellWidthPX = [].concat(this.initCellWidth);

        if (this.cellWidthPX[ind])
            this.cellWidthPX[ind] = 0;

        if (this.cellWidthPC[ind])
            this.cellWidthPC[ind] = 0;
    } else {
        if (this.hdr.rows[0].cells[ind]._oldWidth) {
            var zrow = this.hdr.rows[0].cells[ind];

            if (_isOpera || _isKHTML || (_isFF))
                this._fixHiddenRowsAll(this.hdr, ind, "display", "", "_cellIndexS");

            if (this.ftr)
                this._fixHiddenRowsAll(this.ftr.childNodes[0], ind, "display", "");


            var t = { rows: [this.obj.rows[0]] }
            this.forEachRow(function (id) {
                if (this.rowsAr[id].tagName == "TR")
                    t.rows.push(this.rowsAr[id])
            })
            this._fixHiddenRowsAll(t, ind, "display", "");

            if (this.isTreeGrid())
                this._fixHiddenRowsAllTG(ind, "");

            this._fixHiddenRowsAll(this.hdr, ind, "whiteSpace", "normal", "_cellIndexS");

            if (zrow._oldWidthP)
                this.cellWidthPC[ind] = zrow._oldWidthP;

            if (zrow._oldWidth)
                this.cellWidthPX[ind] = parseInt(zrow._oldWidth);
        }
    }
    //debugger
    this.setSizeForHeader();
    if ((!_isIE) && (!_isFF)) {
        //dummy Opera/Safari fix
        this.obj.border = 1;
        this.obj.border = 0;
    }
}


/**
 * 设置表头样式（长，宽，高）字段选择
 */
dhtmlXGridObject.prototype.setSizeForHeader = function () {
    //drop processing if grid still not initialized
    if ((!this.hdr.rows[0])) return;

    //debugger
    var quirks = this.quirks = (_isIE && document.compatMode == "BackCompat");

    var outerBorder = (this.entBox.offsetWidth - this.entBox.clientWidth) / 2;

    if (!this.dontSetSizes) {
        if (this.globalBox) {
            var splitOuterBorder = (this.globalBox.offsetWidth - this.globalBox.clientWidth) / 2;
            if (this._delta_x && !this._realfake) {
                var ow = this.globalBox.clientWidth;
                this.globalBox.style.width = this._delta_x;
                this.entBox.style.width = Math.max(0, (this.globalBox.clientWidth + (quirks ? splitOuterBorder * 2 : 0)) - this._fake.entBox.clientWidth) + "px";
                if (ow != this.globalBox.clientWidth) {
                    this._fake._correctSplit(this._fake.entBox.clientWidth);
                }
            }
            if (this._delta_y && !this._realfake) {
                this.globalBox.style.height = this._delta_y;
                this.entBox.style.overflow = this._fake.entBox.style.overflow = "hidden";
                this.entBox.style.height = this._fake.entBox.style.height = this.globalBox.clientHeight + (quirks ? splitOuterBorder * 2 : 0) + "px";
            }
        } else {
            if (this._delta_x) {
                /*when placed directly in TD tag, container can't use native percent based sizes,
                 because table auto-adjust to show all content - too clever*/
                if (this.entBox.parentNode && this.entBox.parentNode.tagName == "TD") {
                    this.entBox.style.width = "1px";
                    this.entBox.style.width = parseInt(this._delta_x) * this.entBox.parentNode.clientWidth / 100 - outerBorder * 2 + "px";
                } else
                    this.entBox.style.width = this._delta_x;
            }
            if (this._delta_y)
                this.entBox.style.height = this._delta_y;
        }
    }

    //if we have container without sizes, wait untill sizes defined
    window.clearTimeout(this._sizeTime);
    if (!this.entBox.offsetWidth && (!this.globalBox || !this.globalBox.offsetWidth)) {
        this._sizeTime = window.setTimeout(function () {
            if (self.setSizes)
                self.setSizes();
        }, 250);
        return;
    }

    var border_x = ((!this._wthB) && ((this.entBox.cmp || this._delta_x) && (this.skin_name || "").indexOf("dhx") == 0 && !quirks) ? 2 : 0);
    var border_y = ((!this._wthB) && ((this.entBox.cmp || this._delta_y) && (this.skin_name || "").indexOf("dhx") == 0 && !quirks) ? 2 : 0);

    if (this._sizeFix) {
        border_x -= this._sizeFix;
        border_y -= this._sizeFix;
    }

    var isVScroll = this.parentGrid ? false : (this.objBox.scrollHeight > this.objBox.offsetHeight);

    var scrfix = dhtmlx.$customScroll ? 0 : 18;
    //debugger
    var gridWidth = this.entBox.clientWidth - (this.skin_h_correction || 0) * (quirks ? 0 : 1) - border_x;
    var gridWidthActive = this.entBox.clientWidth - (this.skin_h_correction || 0) - border_x;
    var gridHeight = this.entBox.clientHeight - border_y;
    var summ = this.setColumnSizes(gridWidthActive - (isVScroll ? scrfix : 0) - (this._correction_x || 0));
    var isHScroll = this.parentGrid ? false : ((this.objBox.scrollWidth > this.objBox.offsetWidth) || (this.objBox.style.overflowX == "scroll"));
    var headerHeight = this.hdr.clientHeight;
    var footerHeight = this.ftr ? this.ftr.clientHeight : 0;
    var newWidth = gridWidth;
    var newHeight = gridHeight - headerHeight - footerHeight;

    //if we have auto-width without limitations - ignore h-scroll
    if (this._awdth && this._awdth[0] && this._awdth[1] == 99999) isHScroll = 0;
    //auto-height
    if (this._ahgr) {
        if (this._ahgrMA)
            newHeight = this.entBox.parentNode.clientHeight - headerHeight - footerHeight;
        else
            newHeight = this.obj.offsetHeight + (isHScroll ? scrfix : 0) + (this._correction_y || 0);

        if (this._ahgrM) {
            if (this._ahgrF)
                newHeight = Math.min(this._ahgrM, newHeight + headerHeight + footerHeight) - headerHeight - footerHeight;
            else
                newHeight = Math.min(this._ahgrM, newHeight);

        }
        if (isVScroll && newHeight >= this.obj.scrollHeight + (isHScroll ? scrfix : 0)) {
            isVScroll = false;//scroll will be compensated;
            this.setColumnSizes(gridWidthActive - (this._correction_x || 0)); //correct auto-size columns
        }
    }

    //auto-width
    if ((this._awdth) && (this._awdth[0])) {
        //convert percents to PX, because auto-width with procents has no sense
        if (this.cellWidthType == '%') this.cellWidthType = "px";

        if (this._fake) summ += this._fake.entBox.clientWidth;	//include fake grid in math
        var newWidth = Math.min(Math.max(summ + (isVScroll ? scrfix : 0), this._awdth[2]), this._awdth[1]) + (this._correction_x || 0);
        this.objBox.style.overflowX = (!isVScroll && this.objBox.scrollWidth <= newWidth) ? "hidden" : "auto";
        if (this._fake) newWidth -= this._fake.entBox.clientWidth;
    }

    newHeight = Math.max(0, newHeight);//validate value for IE

    //FF3.1, bug in table rendering engine
    this._ff_size_delta = (this._ff_size_delta == 0.1) ? 0.2 : 0.1;
    if (!_isFF) this._ff_size_delta = 0;


    if (!this.dontSetSizes) {
        this.entBox.style.width = Math.max(0, newWidth + (quirks ? 2 : 0) * outerBorder + this._ff_size_delta) + "px";
        this.entBox.style.height = newHeight + (quirks ? 2 : 0) * outerBorder + headerHeight + footerHeight + "px";
    }
    //debugger
    this.objBox.style.height = newHeight + "px";
    this.hdrBox.style.height = headerHeight + "px";
    //alert(headerHeight);

    if (newHeight != gridHeight)
        this.doOnScroll(0, !this._srnd);
    var ext = this["setSizes_" + this.skin_name];
    if (ext) ext.call(this);

    this.setSortImgPos();
    //debugger
    //it possible that changes of size, has changed header height
    if (headerHeight == this.hdr.clientHeight && this._ahgr)
        this.setSizeForHeader(judge);
    this.callEvent("onSetSizes", []);
};

//设定复选框全选与全不选  字段选择
dhtmlXGridObject.prototype.setAllCheckBoxChecked = function () {

    var mode = arguments.length ? arguments[0] : 1;

    var checkbox = getCheckBox();
    var lastRowNodes = checkbox[checkbox.length - 1].parentNode.parentNode.parentNode.childNodes;
    //行数
    var rowsNum = checkbox[checkbox.length - 1].parentNode.parentNode.parentNode.parentNode.childNodes.length;

    var fakeRowsObj = checkbox[checkbox.length - 1].parentNode.parentNode.parentNode.parentNode.childNodes;
    var realRowsObj =this.hwReport.headers;
	for(var i=0;i<realRowsObj.length;i++){
		var h=realRowsObj[i];
		if(typeof h[0]=="string"){
			var s=h[0].split(',');
			h[0]=s;
		}
	}

    if (mode) {
        //for (var i = 0; i < $(":checkbox").length; i++) {
        //    $(":checkbox")[i].checked = true;
        //}

        //非最后一行复选框处理
        for (var i = 2; i < rowsNum; i++) {
            if(i-2>=realRowsObj.length)
                break;
            var checkId = 0,
                cellVal;
            for (var a = 0; a < lockColNum; a++) {
                //start 20141220
                cellVal = realRowsObj[i - 2][0][a];
                if (realRowsObj[i - 2][0][a] == "") {
                    realRowsObj[i - 2][0][a] = "true";
                }
                //end
                if (realRowsObj[i - 2][0][a].match(/^(?!#cspan|#rspan).*/i) &&
                    realRowsObj[i - 2][0][a].match(/^(?!#cspan|#rspan).*/i)[0]) {

                    realRowsObj[i - 2][0][a] = cellVal;
                    checkId++;
                } else {
                    continue;
                }
            }
            for (var b = lockColNum; b < lastRowNodes.length; b++) {
                if (realRowsObj[i - 2][0][b].match(/^(?!#cspan|#rspan).*/i) &&
                    realRowsObj[i - 2][0][b].match(/^(?!#cspan|#rspan).*/i)[0]) {

                    if (fakeRowsObj[i].childNodes[checkId].getElementsByTagName("input")[0]) {
                        fakeRowsObj[i].childNodes[checkId].getElementsByTagName("input")[0].checked = true;
                    }
                    checkId++;
                } else {
                    continue;
                }
            }
        }

        //最后一行复选框处理
        for (var i = 0; i < lastRowNodes.length; i++) {
            if (i < lockColNum) {
                continue;
            }
            lastRowNodes[i].getElementsByTagName("input")[0].checked = true;
        }

        for (var i = lockColNum; i < lastRowNodes.length; i++) {
            //删除隐藏列
            this.delHiddenFields(i);
        }
    } else {
        //for (var i = 0; i < $(":checkbox").length; i++) {
        //    $(":checkbox")[i].checked = false;
        //}

        //非最后一行复选框处理
        for (var i = 2; i < rowsNum; i++) {
            if(i-2>=realRowsObj.length)
                break;
            var checkId = 0,
                cellVal;
            for (var a = 0; a < lockColNum; a++) {
                //start 20141220
                cellVal = realRowsObj[i - 2][0][a];
                if (realRowsObj[i - 2][0][a] == "") {
                    realRowsObj[i - 2][0][a] = "true";
                }
                //end
                if (realRowsObj[i - 2][0][a].match(/^(?!#cspan|#rspan).*/i) &&
                    realRowsObj[i - 2][0][a].match(/^(?!#cspan|#rspan).*/i)[0]) {

                    realRowsObj[i - 2][0][a] = cellVal;
                    checkId++;
                } else {
                    continue;
                }
            }
            for (var b = lockColNum; b < lastRowNodes.length; b++) {
                if (realRowsObj[i - 2][0][b].match(/^(?!#cspan|#rspan).*/i) &&
                    realRowsObj[i - 2][0][b].match(/^(?!#cspan|#rspan).*/i)[0]) {

                    if (fakeRowsObj[i].childNodes[checkId].getElementsByTagName("input")[0]) {
                        fakeRowsObj[i].childNodes[checkId].getElementsByTagName("input")[0].checked = false;
                    }
                    checkId++;
                } else {
                    continue;
                }
            }
        }

        //最后一行复选框处理
        for (var i = 0; i < lastRowNodes.length; i++) {
            if (i < lockColNum) {
                continue;
            }
            lastRowNodes[i].getElementsByTagName("input")[0].checked = false;
        }

        for (var i = lockColNum; i < lastRowNodes.length; i++) {
            //添加隐藏列
            this.addHiddenFields(i);
        }
    }
}

//源文件修改
//dhtmlxgrid_splt.js
/*
1.360急速浏览器下如果一行都被上一行合并，tr中不添加td元素导致同步锁定列表头时陷入死循环的问题
这里又改回来了
  ——275行：if (_isIE || _isOpera) {  ==》if (_isIE || (_isFF && _FFrv >= 1.9) || _isOpera) {   
2.添加表头类名设置
 ——61行添加以下代码
    this._fake.hwReport = this.hwReport;
    this._fake.__class = this.__class || [];
    this._fake.__attrs = this.__attrs || [];
    var setColumnLabel = this._fake.setColumnLabel;
    this._fake.setColumnLabel = function (c, label, ind, hdr) {
        setColumnLabel.apply(this, [c, label, ind, hdr]);
        var z = (hdr || this.hdr).rows[ind || 1];
        var col = (z._childIndexes ? z._childIndexes[c] : c);
        if (!z.cells[col]) return;
        if (!this.useImagesInHeader) {
            if (this.__class[c]) {
                z.cells[col].className = this.__class[c];
            }
            if (this.__attrs[c]) {
                z.cells[col]._attrs = this.__attrs[c];
                z.cells[col].firstChild._attrs = this.__attrs[c];

                var originCell = this.hwReport.getOriginCellById(this.__attrs[c].sid);
                if (originCell.getType() == "vmdlink") {
                    z.cells[col].grid = this;
                    z.cells[col].firstChild._cellType = originCell.getType();
                    var aeditor = this.cells4(z.cells[col].firstChild);

                    if (aeditor) aeditor.setValue(label);
                }
            }
        }
    }
3.同步锁定列与非锁定列行高
  ——302添加以下代码
  if (frows[i].clientHeight != rows[i].clientHeight) {
    frows[i].style.height = Math.max(rows[i].clientHeight, frows[i].clientHeight) + 'px';
    rows[i].style.height = Math.max(rows[i].clientHeight, frows[i].clientHeight) + 'px';
  }
4.有锁定列时，滚动加载时第一屏和滚动加载的屏行高不一致：
    ——1180行
    this.rowsAr[id].style.height = this._fake.rowsAr[id].style.height = Math.round(max + 1) + "px";
    改成：
    this.rowsAr[id].style.height = this._fake.rowsAr[id].style.height = Math.round(max) + "px";
    ——1195行 注释掉
*/

//datastore.js
/*
1.添加菜单与dhtmlxDataStore的绑定
    ——3471行 if (window.dhtmlXMenuObject){...}
2.修改数据集序列化方法
    ——2337行，添加参数rule 添加代码
    else if (rule) {
			    for (var key in rule) {
			        el[key] = el[rule[key]];
			    }
			}
    ——3007行
     combo.addOption(this.serialize()); ==》combo.addOption(this.serialize(rule));
*/