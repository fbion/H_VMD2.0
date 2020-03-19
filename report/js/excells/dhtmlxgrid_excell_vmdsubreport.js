/*
filename：dhtmlxgrid_eXcell_vmdsubreport.js
creater：刘志伟
date created：2016.11.19
description：子填报
date modified：2018.05.21
modifier：刘志伟
version：2.3.3.0425
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/
function eXcell_vmdsubreport(cell) {
    var that = this;
    if (cell) {
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
        this.hwReport = this.grid.hwReport;
        var oCell = this.hwReport.getOriginCellById(cell._attrs.sid);
        var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);

        this.cell.style.padding = "0px";

        //cellType.subrptshowmode = "popup";
        //嵌入式子表
        if (cellType.subrptshowmode == "embed") {
            this.hwReport.embedSubReportCells = this.hwReport.embedSubReportCells || {};
            this.hwReport.embedSubReportCells[cell.parentNode.idd + "_" + cell._cellIndex] = cell;
        }
        else if (cellType.subrptshowmode == "expand" && cellType.spread == "1") {
            this.hwReport.expandSubReportCells = this.hwReport.expandSubReportCells || {};
            this.hwReport.expandSubReportCells[cell.parentNode.idd + "_" + cell._cellIndex] = cell;
        }

        if (!this.hwReport.sub_onReportRendered_id) {
            this.hwReport.sub_onReportRendered_id = this.hwReport.attachEvent("onRendered", function () {
                if (!that.hwReport.isEmpty(that.hwReport.expandSubReportCells)) {
                    for (var item in that.hwReport.expandSubReportCells) {
                        that.grid._expandMonolite_vmd.apply(that.hwReport.expandSubReportCells[item].firstChild, [window.event]);
                    }
                }

                if (!that.hwReport.isEmpty(that.hwReport.embedSubReportCells)) {
                    that.grid._flow = [];
                    for (var item in that.hwReport.embedSubReportCells) {
                        var td = that.hwReport.embedSubReportCells[item];
                        var sub = that.grid._sub_vmdreport_render(td, "embed");
                        that.grid._flow[td.parentNode.idd] = td._d;
                        that.grid.attachEvent("onGridReconstructed", function () {
                            if ((this.pagingOn && !this.parentGrid) || this._srnd) this._collapsMonolite_vmd();
                            else this._correctMonolite_vmd(null, false);
                        });
                        that.grid.attachEvent("onClearAll", function () {
                            for (var i in this._flow) {
                                if (this._flow[i] && this._flow[i].parentNode) this._flow[i].parentNode.removeChild(this._flow[i]);
                            }; this._flow = [];
                        });
                        that.grid.callEvent("onSubReportOpen", [td.parentNode.idd, td._cellIndex, sub]);
                    }
                }
            });
        }
    }

    this.setValue = function (val) {
        this.cell._sub_row_type = "vmdsubreport";

        var oCell = this.hwReport.getOriginCellById(this.cell._attrs.sid);
        var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);
        if (cellType.subrptshowmode == "popup") {
            this._setState("pop.png");
        }
        else if (cellType.subrptshowmode == "embed") { }
        else {
            this._setState(val ? "plus.gif" : "plus.gif");
        }
    }

    this.getValue = function () {
        return this.cell._attrs.data;
    }

    this._setState = function (m, v) {
        var that = this;
        var cell = v || this.cell;
        var oCell = this.hwReport.getOriginCellById(cell._attrs.sid);
        var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);
        var innerHTML = "";
        if (m != "minus.gif") {
            innerHTML = "<div style='cursor:pointer;'>"
                + "<img src='" + this.grid.imgURL + m + "' style='width:18px;height:18px;float:left;'/>"
                + "<span style='line-height:18px;'>" + (cell._attrs.data || "&nbsp;") + "</span>"
                + "</div>";
            cell.className = cell.className.replace(this.hwReport.reportId + "-v-top", "");
        }
        else {
            var oldHeight = cell.parentNode.oldHeight || cell.offsetHeight;
            var paddingTop = parseInt((oldHeight - cell.firstChild.offsetHeight) / 2);
            innerHTML = "<div style='cursor:pointer;padding-top:" + paddingTop + "px;'>"
                + "<img src='" + this.grid.imgURL + m + "' style='width:18px;height:18px;float:left;'/>"
                + "<span style='line-height:18px;'>" + (cell._attrs.data || "") + "</span>"
                + "</div>";
            cell.className += " " + this.hwReport.reportId + "-v-top";
        }
        
        cell.innerHTML = innerHTML;
        cell.firstChild.onclick = function(e){
            if (cellType.subrptshowmode == "popup") {
                that.grid.openSubReportInWindow.apply(that.grid, [e, cell])
            }
            else {
                that.grid._expandMonolite_vmd.apply(cell.firstChild, [e]);
            }
        }
    }
}
eXcell_vmdsubreport.prototype = new eXcell;

dhtmlXGridObject.prototype._sub_vmdreport_render = function (cell, subType) {
    if (cell._d) {
        cell._d.parentNode.removeChild(cell._d);
    }
    var that = this;
    var d = document.createElement("DIV");
    d.ctrl = { rId: cell.parentNode.idd, cIndex: cell._cellIndex };
    d.style.cssText = "position:absolute;width:" + (cell.offsetWidth) + "px; height:" + cell.offsetHeight + "px; left:" + cell.offsetLeft + "px; top:" + cell.offsetTop + "px; overflow-x:hidden; font-family:Tahoma; font-size:8pt; margin-bottom:0px;";
    d.className = "dhx_sub_row ";
    this.objBox.appendChild(d);
    cell._d = d;

    var c = document.createElement("DIV");
    c.id = "sub_" + cell.parentNode.idd + "_" + cell._cellIndex;
    d.appendChild(c);

    var oCell = this.hwReport.getOriginCellById(cell._attrs.sid);
    var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);
    var subjson = this.hwReport.subs[cellType.subrptindex];
    var subReport = new HwReport(this.hwReport.vmdreport, d, c, cell.offsetWidth, cell.offsetHeight, true, true, true, subType);

    if (!subjson) {
        return subReport;
    }

    subReport.attachEvent("onSectionSeverSuccess", function () {
        subReport.vmdreport.myMask.hide();
    });

    subReport.init();
    subReport.parse(subjson);
    subReport.analysis();
    subReport.integrateMatrix();
    subReport.insertRules();

    subReport.prepare();
    subReport.initContainer();
    subReport.initMenus();
    subReport.initGrid();
    subReport.attachGridEvent();
    subReport.updateDatastore();

    subReport.grid.attachEvent("onSetSizes", function () {
        that.hwReport.grid._detectHeight_tb(d, cell);
        that.hwReport.grid._correctMonolite_vmd();
        that.hwReport.setSize();
        that.hwReport.setPosition();
    });

    this.hwReport.subReports.put(subjson.name, subReport);
    subReport.parentReport = this.hwReport;
    return subReport;
}

dhtmlXGridObject.prototype._expandMonolite_vmd = function (n, show, hide) {
    var td = this.parentNode;
    var row = td.parentNode;
    var that = row.grid;

    if (n || window.event) {
        if (!hide && !row._expanded) that.editStop();
        (n || event).cancelBubble = true;
    }

    var c = that.getUserData(row.idd, "__sub_row");

    if (!that._sub_row_editor)
        that._sub_row_editor = new eXcell_vmdsubreport(td);

    if (row._expanded && !show) {
        that._sub_row_editor._setState("plus.gif", td);
        td._previous_content = row._expanded;
        that.objBox.removeChild(row._expanded);
        row._expanded = false;
        row.style.height = (row.oldHeight || 20) + "px";
        td.style.height = (row.oldHeight || 20) + "px";

        if (that._fake) {
            that._fake.rowsAr[row.idd].style.height = (row.oldHeight || 20) + "px";
            that._fake.rowsAr[row.idd].firstChild.style.height = (row.oldHeight || 20) + "px";
        }

        for (var i = 0; i < row.cells.length; i++)
            row.cells[i].style.verticalAlign = "middle";

        delete that._flow[row.idd];
        that._correctMonolite_vmd();
        row._expanded.ctrl = null;
    } else if (!row._expanded && !hide) {
        that._sub_row_editor._setState("minus.gif", td);
        row.oldHeight = row.oldHeight || td.offsetHeight/* - 4*/;
        if (td._previous_content) {
            var d = td._previous_content;
            d.ctrl = td;
            that.objBox.appendChild(d);
            that._detectHeight_tb(d, td, parseInt(d.style.height))
        }
        else {
            if (td._sub_row_type)
                td.sub_report = that._sub_vmdreport_render(td, "expand");
            else
                td._d.innerHTML = c;
            
            that._detectHeight_tb(td._d, td)
        }

        if (!that._flow) {
            that.attachEvent("onGridReconstructed", function () {
                if ((this.pagingOn && !this.parentGrid) || this._srnd) this._collapsMonolite_vmd();
                else this._correctMonolite_vmd();
            });
            that.attachEvent("onResizeEnd", function () { this._correctMonolite_vmd(true); });
            that.attachEvent("onAfterCMove", function () { this._correctMonolite_vmd(true); });
            that.attachEvent("onDrop", function () { this._correctMonolite_vmd(true); });
            that.attachEvent("onBeforePageChanged", function () { this._collapsMonolite_vmd(); return true; });
            that.attachEvent("onGroupStateChanged", function () { this._correctMonolite_vmd(); return true; });
            that.attachEvent("onFilterEnd", function () { this._collapsMonolite_vmd(); });
            that.attachEvent("onUnGroup", function () { this._collapsMonolite_vmd(); });
            that.attachEvent("onPageChanged", function () { this._collapsMonolite_vmd(); });

            that.attachEvent("onXLE", function () { this._collapsMonolite_vmd(); });
            that.attachEvent("onClearAll", function () {
                for (var i in this._flow) {
                    if (this._flow[i] && this._flow[i].parentNode) this._flow[i].parentNode.removeChild(this._flow[i]);
                }; this._flow = [];
            });
            //that.attachEvent("onEditCell", function (a, b, c) { if ((a !== 2) && this._flow[b] && this.cellType[c] != "ch" && this.cellType[c] != "ra") this._expandMonolite_vmd.apply(this._flow[b].ctrl.firstChild, [0, false, true]); return true; });
            that.attachEvent("onCellChanged", function (id, ind) {
                if (!this._flow[id]) return;
                var c = this.cells(id, ind).cell;
                c.style.verticalAlign = "top";
            });

            that._flow = [];
        }

        that._flow[row.idd] = td._d;
        that._correctMonolite_vmd();
        //d.style.top=row.offsetTop+20+"px";

        var padtop = that._srdh > 30 ? 11 : 3;
        if (that.multiLine) padtop = 0;

        for (var i = 0; i < row.cells.length; i++)
            row.cells[i].style.verticalAlign = "top";
        if (that._fake) {
            var frow = that._fake.rowsAr[row.idd];
            for (var i = 0; i < frow.cells.length; i++) {
                frow.cells[i].style.verticalAlign = "top";
            }
        }
        row._expanded = td._d;
    }
    if (that._ahgr) {
        that.setSizes();
    }
    if (!!row._expanded) {
        that.callEvent("onSubReportOpen", [row.idd, td._cellIndex, td.sub_report]);
    }
    else{
        that.callEvent("onSubReportClose", [row.idd, td._cellIndex, td.sub_report]);
    }
}

dhtmlXGridObject.prototype._detectHeight_tb = function (d, td, h) {
    var l = td.offsetLeft ;
    d.style.left = l + "px";
    //d.style.width = Math.max(0, td.offsetWidth) + "px"
    var h = h || d.firstChild.scrollHeight;
    d.style.overflow = "hidden";
    d.style.height = h + "px";
    var row = td.parentNode;
    td.parentNode.style.height = (row.oldHeight || 20) + h * 1 + "px";
    td.style.height = (row.oldHeight || 20) + h * 1 + "px";
    if (this._fake) {
        var tr = this._fake.rowsAr[td.parentNode.idd];
        tr.style.height = (row.oldHeight || 20) + h * 1 + "px";
        tr.firstChild.style.height = (row.oldHeight || 20) + h * 1 + "px";
    }
}

dhtmlXGridObject.prototype._correctMonolite_vmd = function (mode, header) {
    if (this._in_correction) return;
    this._in_correction = true;

    for (var a in this._flow)
        if (this._flow[a] && this._flow[a].tagName == "DIV")
            if (this.rowsAr[a]) {
                if (this.rowsAr[a].style.display == "none") {
                    this.cells4(this._flow[a].ctrl).close();
                    continue;
                }
                this._flow[a].style.top = this.rowsAr[a].offsetTop + (header == false ? -1 : (this.rowsAr[a].oldHeight || 20)) + 1 + "px";
                if (mode) {
                    var l = this._flow[a].ctrl.offsetLeft + this._flow[a].ctrl.offsetWidth;
                    this._flow[a].style.left = l + "px";
                    this._flow[a].style.width = this.rowsAr[a].offsetWidth - l - 4 + "px"
                }
            }
            else {
                this._flow[a].ctrl = null;
                this.objBox.removeChild(this._flow[a]);
                delete this._flow[a];
            }

    this._in_correction = false;
}

dhtmlXGridObject.prototype._collapsMonolite_vmd = function () {
    for (var a in this._flow)
        if (this._flow[a] && this._flow[a].tagName == "DIV")
            if (this.rowsAr[a])
                this.cells4(this._flow[a].ctrl).close();
}

dhtmlXGridObject.prototype.openSubReportInWindow = function (e, cell, left, right, width, height) {
    var that = this;
    if (e || window.event) {
        this.editStop();
        (e || event).cancelBubble = true;
    }

    var grid = this;
    var hwReport = this.hwReport;
    var oCell = hwReport.getOriginCellById(cell._attrs.sid);
    var cellType = hwReport.cellTypes.get(oCell.fillcelltype);
    var winId = "win_" + cell._attrs.sid;

    hwReport.wins = hwReport.wins || {};
    reportWin = hwReport.wins[winId];
    if (reportWin) {
        reportWin.show();
        return;
    }

    var winLeft = left || 0;
    var winRight = right || 0;
    var winWidth = width || 600;
    var winHeight = height || 320;

    var dhxWins = hwReport.dhxWins = hwReport.dhxWins || new dhtmlXWindows();
    var reportWin = dhxWins.createConfirmWindow(winId, winLeft, winRight, winWidth, winHeight);
    reportWin.center();
    reportWin.setModal(true);
    reportWin.setText(cell._attrs.data || "");
    //reportWin.cell.firstChild.style.overflow = "auto";
    //reportWin.button("close").disable();
    hwReport.wins[winId] = reportWin;

    var c = document.createElement("DIV");
    c.id = winId;
    c.style.position = "relative";
    reportWin.cell.firstChild.appendChild(c);

    reportWin.button("close").attachEvent("onClick", function () {
        reportWin.setModal(false);
        reportWin.hide();
        that.callEvent("onSubReportClose", [cell.parentNode.idd, cell._cellIndex, subReport]);
        return false;
    });

    var oCell = this.hwReport.getOriginCellById(cell._attrs.sid);
    var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);

    var subjson = this.hwReport.subs[cellType.subrptindex];
    var subReport = new HwReport(this.hwReport.vmdreport, reportWin.cell.firstChild, c, reportWin.cell.firstChild.clientWidth, reportWin.cell.firstChild.clientHeight);

    if (!subjson) {
        return subReport;
    }

    subReport.init();
    subReport.parse(subjson);
    subReport.analysis();
    subReport.integrateMatrix();
    subReport.insertRules();

    subReport.prepare();
    subReport.initContainer();
    subReport.initMenus();
    subReport.initGrid();
    subReport.attachGridEvent();
    subReport.updateDatastore();

    this.hwReport.subReports.put(subjson.name, subReport);
    subReport.parentReport = this.hwReport;

    reportWin.attachEvent("onResizeFinish", function (win) {
        subReport.setSize(win.cell.clientWidth, win.cell.clientHeight);
        subReport.setPosition();
    });

    reportWin.attachEvent("onResizeFinish", function (win) {
        subReport.setSize(win.cell.clientWidth, win.cell.clientHeight);
        subReport.setPosition();
    });

    reportWin.attachEvent("onShow", function (win) {
        that.callEvent("onSubReportOpen", [cell.parentNode.idd, cell._cellIndex, subReport]);
    });

    this.callEvent("onSubReportOpen", [cell.parentNode.idd, cell._cellIndex, subReport]);
}