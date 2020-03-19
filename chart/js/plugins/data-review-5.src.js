/**
 * HWcharts plugin for dragging a legend by its title
 *
 * Author: Torstein H?nsi
 * License: MIT License
 * Last revision: 2013-02-14
 * Requires: HWcharts 3.0+
 *
 * Usage: Set draggable:true and floating:true in the legend options. The legend
 * preserves is alignment after dragging. For example if it is aligned to the right,
 * if will keep the same distance to the right edge even after chart resize or
 * when exporting to a different size.
 */


(function (H) {
    var Pointer = H.Pointer,
        Chart = H.Chart;

    //添加右击事件
    H.wrap(Pointer.prototype, 'setDOMEvents', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var pointer = this,
            container = pointer.chart.container;

        container.oncontextmenu = function (e) {
            pointer.onContainerContextMenu(e);
            return false;
        };
    });

    //重写容器的点击事件，当点击容器时右键菜单消失
    H.wrap(Pointer.prototype, 'onContainerClick', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        var pointer = this,
            chart = pointer.chart;
			
        chart.HideContextMenu();
    });

    //添加鼠标右键事件
    Pointer.prototype.onContainerContextMenu = Pointer.prototype.onContainerContextMenu || function (e) { };
    H.wrap(Pointer.prototype, 'onContainerContextMenu', function (proceed, e) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var chart = this.chart,
            options = chart.options,
            optionsChart = options.chart,
            dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            dhxContextMenu_Point = chart.dhxContextMenu_Point;

        getDhtmlxWindow();
        if (_isTopWindow) {
            chart.dhxContextMenu_Edit = dhxContextMenu_Edit = chart.dhxContextMenu_Edit || new dhtmlXMenuObject();
            chart.dhxContextMenu_Point = dhxContextMenu_Point = chart.dhxContextMenu_Point || new dhtmlXMenuObject();
        }
        else {
            chart.dhxContextMenu_Edit = dhxContextMenu_Edit = chart.dhxContextMenu_Edit || new dhtmlxPopWindow.dhtmlXMenuObject();
            chart.dhxContextMenu_Point = dhxContextMenu_Point = chart.dhxContextMenu_Point || new dhtmlxPopWindow.dhtmlXMenuObject();
        }
        dhxContextMenu_Edit.renderAsContextMenu();
        dhxContextMenu_Point.renderAsContextMenu();
    });

    /**
     * 判断鼠标右键位置是否在点上
     * @param e
     * @returns {*}
     */
    Chart.prototype.onPoint = function (e) {
        var chart = this,
            hoverSeries = chart.hoverSeries;
        var range = 8; //点的半径

        var points = (hoverSeries && hoverSeries.points) || [];
        for (var j = 0; j < points.length; j++) {
            var p = points[j];
            if (Math.abs(p.plotX + chart.plotLeft - e.chartX) <= range && Math.abs(p.plotY + chart.plotTop - e.chartY) <= range) {
                return p;
            }
        }
    }

    /**
     * 显示右键菜单
     * @param e
     * @param type
     * @constructor
     */
    Chart.prototype.ShowContextMenu = function (e, type) {
        var chart = this,
            options = chart.options,
            optionsChart = options.chart,
            dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            dhxContextMenu_Point = chart.dhxContextMenu_Point;

        var offsetX = 0,
            offsetY = 0;
        //没有嵌入到iframe中
        getDhtmlxWindow();
        if (parentFrame) {
            offsetX = $(parentFrame).offset().left;
            offsetY = $(parentFrame).offset().top;
        }
        chart.HideContextMenu();
        switch (type) {
            case "edit":
                if (dhxContextMenu_Edit) {
                    dhxContextMenu_Edit.showContextMenu(offsetX + e.clientX + ___getPageScroll()[0], offsetY + e.clientY + ___getPageScroll()[1]);
                }
                break;
            case "point":
                if (dhxContextMenu_Point) {
                    dhxContextMenu_Point.showContextMenu(offsetX + e.clientX + ___getPageScroll()[0], offsetY + e.clientY + ___getPageScroll()[1]);
                }
                break;
            default:

        }
    };

    /**
     * 隐藏所有右键菜单
     * @param e
     * @param type
     * @constructor
     */
    Chart.prototype.HideContextMenu = function () {
        var chart = this,
            options = chart.options,
            optionsChart = options.chart,
            parentChart = optionsChart && optionsChart.parentChart,
            dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            dhxContextMenu_Point = chart.dhxContextMenu_Point;

        if (parentChart) {
            var charts = parentChart.charts;
            for (var i = 0; i < charts.length; i++) {
                dhxContextMenu_Edit = charts[i].dhxContextMenu_Edit;
                dhxContextMenu_Point = charts[i].dhxContextMenu_Point;
                //隐藏右键菜单
                if (dhxContextMenu_Edit) {
                    dhxContextMenu_Edit.hide();
                }
                if (dhxContextMenu_Point) {
                    dhxContextMenu_Point.hide();
                }
            }
        }
        else {
            //隐藏右键菜单
            if (dhxContextMenu_Edit) {
                dhxContextMenu_Edit.hide();
            }
            if (dhxContextMenu_Point) {
                dhxContextMenu_Point.hide();
            }
        }
    }
}(Highcharts));

(function (H) {
    var path = window.hwv ? window.vmd.virtualPath : CreateJSPath("hwAPI.js", -1),

        addEvent = H.addEvent,
        Pointer = H.Pointer,
        Chart = H.Chart,
        defaultOptions = H.getOptions(),
        dhxContextMenu;

    var defaultDataViewOptions = {
        width:600,
        height: 450,
        colWidth: 90,
        colAlign: "center"
    }

    H.wrap(Pointer.prototype, 'onContainerContextMenu', function (proceed, e) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        e = this.normalize(e);
        hoverSeries = this.chart.hoverSeries;

        var chart = this.chart;

        addMenuItem(e, chart);
        if (chart.onPoint(e)) {
            chart.ShowContextMenu(e, "point");
        }
        else {
            chart.ShowContextMenu(e, "edit");
        }
    });

    //在右键菜单中添加数据查看项
    function addMenuItem(e, chart) {
        
        //初始化右键菜单
        var dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            isExistEdit = false,
            isExistDataView = false;
        getDhtmlxWindow();
        dhxContextMenu_Edit.forEachItem(function (itemId) {
            if (itemId == "edit") {
                isExistEdit = true;
            }
            if (itemId == "dataView") {
                isExistDataView = true;
            }
        });

        if (!isExistEdit) {
            dhxContextMenu_Edit.addNewChild(dhxContextMenu_Edit.topId, 1, "edit", unescape("%u7F16%u8F91"));
        }

        if (!isExistDataView) {
            dhxContextMenu_Edit.addNewChild("edit", 0, "dataView", "数据查看");
            //给右键菜单中数据查看添加事件
            dhxContextMenu_Edit.attachEvent("onClick", function (id, zoneId, cas) {
                if (id == "dataView") {
                    chart.dataView(e);
                }
            });
        }
        //dhxContextMenu_Edit.showContextMenu(offsetX + e.clientX, offsetY + e.clientY);
    }

    Chart.prototype.dataView = function (e) {
        var chart = this,
        dhxWindow = chart.dhxWindow,
        dataViewGrid = chart.dataViewGrid,
        dataViewToolBar = chart.dataViewToolBar,
        dataViewWindow = chart.dataViewWindow,
        dataViewForm = chart.dataViewForm,
        optionsChart = chart.options.chart,
        dataViewOptions = H.merge(defaultDataViewOptions, chart.options.dataview),
        dataExportUrl = dataViewOptions.url,
        gridData;
        if (optionsChart.showDialog == false) {
            return;
        }
        if (!dhxWindow) {

            if (_isTopWindow) {
                chart.dhxWindow = dhxWindow = new dhtmlXWindows();
            }
            else {
                chart.dhxWindow = dhxWindow = new dhtmlxPopWindow.dhtmlXWindows();
            }
            dhxWindow.vp.style.overflow = "auto";
        }
        if(chart.options.chart && chart.options.chart.propertypIframe ) {
            if(!chart._hoverFrame){
                chart._hoverFrame = $("<iframe style='position: absolute; display: block; border: 0px solid #FFFFFF;'>");
                $("body").append(chart._hoverFrame);
            }
            else{
                chart._hoverFrame.css({display: 'block'});
            }
        }
        if (!dataViewWindow) {
            var windowWidth = dataViewOptions.width,  //弹出窗口的宽度
                windowHeight = dataViewOptions.height,//弹出窗口的高度
                toolbarWidth = windowWidth - 30, //工具条的宽度
                girdWidth = windowWidth - 20,
                girdHeight = windowHeight - 150,
                buttonOffsetLeft = windowWidth - 200;
            chart.dataViewWindow = dataViewWindow = dhxWindow.createWindow({
                id:"dataViewWindow",
                width:windowWidth,
                height:windowHeight,
                center:true
            });
            if(chart._hoverFrame){
                chart._hoverFrame.css({top: "100px", left: "20px", width: windowWidth + "px", height: windowHeight + "px"});
            }
            else{
                dataViewWindow.centerOnScreen();
            }
            //dataViewWindow.button("park").hide();  //隐藏最小化按钮
            dataViewWindow.button("minmax2").hide(); //隐藏最大化按钮
            dataViewWindow.denyResize();             //禁止改变大小
            // dataViewWindow.denyMove();
            // dataViewWindow.hideHeader();

            dataViewWindow.setText("数据查看");
            dataViewWindow.attachEvent("onClose", function (win) {
                if(chart._hoverFrame){
                    chart._hoverFrame.css({display: 'none'});
                }
                win.hide();
            });
            dataViewWindow.attachEvent("onMoveFinish", function(win){
                if(chart._hoverFrame){
                    var position = win.getPosition();
                    chart._hoverFrame.css({top: position[1] + "px", left: position[0] + "px"});
                }
            });
            dataViewWindow.attachEvent("onShow", function (win) {
                if(chart._hoverFrame){
                    chart._hoverFrame.css({display: 'block'});
                }
                dataViewGrid.clearAll();
                dataViewGrid.clearSelection();
                gridData = chart.seriesDataToGridData();
                dataViewGrid.parse(gridData.rows, "json");

                //initToolBarState();
            });
            dataViewForm = chart.dataViewForm = dataViewWindow.attachForm([
                { type: "container", name: "dataViewToolBar", label: "", width: toolbarWidth, height: 30,offsetLeft: 5 },
                { type: "container", name: "dataViewGrid", label: "", width: girdWidth, inputHeight: girdHeight,offsetLeft: 4 },
                {
                    type: "block", offsetLeft: buttonOffsetLeft, list: [
                    { type: "button", width: 60, name: "confirm", value: "确定", offsetTop: 8, offsetLeft: 10 },
                    { type: "newcolumn" },
                    { type: "button", width: 60, name: "cancel", value: "取消", offsetTop: 8, offsetLeft: 10 }
                    ]
                }
            ]);
            dataViewForm.attachEvent("onButtonClick", function (name) {
                if (name == "confirm") {
                    if(chart._hoverFrame){
                        chart._hoverFrame.css({display: 'none'});
                    }
                    dataViewWindow.hide();
                    chart.updateFromGrid();
                }
                else if (name == "cancel") {
                    if(chart._hoverFrame){
                        chart._hoverFrame.css({display: 'none'});
                    }
                    dataViewWindow.hide();
                }
            });

            gridData = chart.seriesDataToGridData();
            console.log(gridData)
            
            if (_isTopWindow) {
                dataViewGrid = chart.dataViewGrid = new dhtmlXGridObject(dataViewForm.getContainer("dataViewGrid"));
            }
            else {
                dataViewGrid = chart.dataViewGrid = new dhtmlxPopWindow.dhtmlXGridObject(dataViewForm.getContainer("dataViewGrid"));
            }

            dataViewGrid.setImagePath(path + "/libs/dhtmlx/codebase/imgs/");
            dataViewGrid.setHeader(gridData.header.value, null, gridData.header.style);
            dataViewGrid.setInitWidths(gridData.cols.width);
            dataViewGrid.setColAlign(gridData.cols.align);
            dataViewGrid.setColSorting(gridData.cols.sort);
            dataViewGrid.setColTypes(gridData.cols.type);
            
            dataViewGrid.enableCSVHeader(true);
        
            dataViewGrid.enableBlockSelection();
            dataViewGrid.forceLabelSelection();
            dataViewGrid.enableColumnMove(true);
            dataViewGrid.enableUndoRedo();

            dataViewGrid.init();
            
            dataViewGrid.parse(gridData.rows, "json");

            dataViewGrid.hdrBox.style.borderBottomWidth = "1px";

            //            //初始化工具条
            if (_isTopWindow) {
                chart.dataViewToolBar = dataViewToolBar = new dhtmlXToolbarObject(dataViewForm.getContainer("dataViewToolBar"));
            }
            else {
                chart.dataViewToolBar = dataViewToolBar = new dhtmlxPopWindow.dhtmlXToolbarObject(dataViewForm.getContainer("dataViewToolBar"));
            }
            var iconPath = "";
            if(window.vmd){
                iconPath = path + "/../lib/dhtmlx/imgs/dhxtoolbar_material/";

            }
            else{
                iconPath = path + "/libs/dhtmlx/skins/skyblue/imgs/dhxtoolbar_skyblue/";
            }
            
            dataViewToolBar.addButton("save_cvs", 1, "", iconPath + "csv.gif", iconPath + "csv_dis.gif");
        
            dataViewToolBar.addSeparator("s1", 2);
            
            // dataViewToolBar.addButton("undo", 3, "", iconPath + "redo.gif", iconPath + "redo_dis.gif");
            // dataViewToolBar.addButton("redo", 4, "", iconPath + "undo.gif", iconPath + "undo_dis.gif");
                

            dataViewToolBar.addListOption("file", "import_csv", 1, "button", "导入csv", iconPath + "import_csv.png");

            dataViewToolBar.addButton("import_csv", 1, "", iconPath + "import_csv.png", iconPath + "import_csv.png");

            //dataViewToolBar.addSpacer("redo");

            dataViewToolBar.setItemToolTip("save_cvs", "导出Excel");
            dataViewToolBar.setItemToolTip("import_csv", "导入Excel");
        
            //initToolBarState()

            dataViewToolBar.attachEvent("onClick", function (id) {
                switch (id) {
                    case "file":
                        break;
                    case "import_csv":
                        var vmdreport = this;
                        if (!vmdreport._importInputButton) {
                            var inputdiv = document.createElement("div");
                            inputdiv.id = "upload_excel_file_div";
                            document.body.appendChild(inputdiv);
                            inputdiv.style.hidden = "hidden";
                            var input = ' <input type="file" id="upload_excel_file" hidden="hidden" >';
                            inputdiv.innerHTML = input;

                            var host = vmd.projectInfo ? (vmd.projectInfo.reportIp || vmdSettings.vmdReportIp || vmdSettings.dataServiceIp) : vmdSettings.vmdReportIp || vmdSettings.dataServiceIp;
                            var hwRao = new HwRao(host, "report");
                            var url = hwRao.getImportExcelUrl();
                            var excelInput = vmdreport._importInputButton = document.getElementById("upload_excel_file");
                            excelInput.url = url;
                            excelInput.click();
                            excelInput[-[1, ] ? "onchange" : "onpropertychange"] = function () {
                                var fd = new FormData();
                                fd.append("file", excelInput.files[0]);
                                var msg = Ext.MessageBox;
                                vmd.ajax({
                                    url: url,
                                    type: 'POST',
                                    cache: false,
                                    data: fd,
                                    processData: false,
                                    contentType: false,
                                    dataType: "json",
                                    beforeSend: function () {
                                        uploading = true;
                                    },
                                    success: function (data) {
                                        if (data.isSucceed) {
                                            datas=data.data;
                                            if (vmd.isString(data.data)) {
                                                eval("dhtmlx.imptemp=" + data.data + ";");
                                                datas = dhtmlx.imptemp;
                                            }
                                            var oriData = datas.datas;
                                            var gridDatas = chart.seriesDataToGridData();
                                            console.log(oriData)
                                            for(var i = 0;i<oriData.length;i++){
                                                if(i>0){
                                                    var item = oriData[i];
                                                    for(var j = 0;j<item.length;j++){
                                                        gridDatas.rows.rows[i-1].data[j].value = item[j].data
                                                    }
                                                }
                                            }
                                            console.log(gridDatas)
                                            dataViewGrid.clearAll();
                                            // dataViewGrid.clearSelection();
                                            dataViewGrid.parse(gridDatas.rows, "json");
                                            
                                        }
                                        else {
                                            Ext.Msg.show({
                                                title: "导入失败！",
                                                msg: data.errMsg,
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.ERROR
                                            });
                                        }
                                    },
                                    error: function (data) {
                                        Ext.Msg.show({
                                            title: "导入失败！",
                                            msg: '上传失败，请重新上传！',
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.ERROR
                                        });
                                    },
                                    complete: function () {
                                        //msg.hide();
                                    }
                                });
                            }
                        }
                        else {
                            vmdreport._importInputButton.value = "";
                            vmdreport._importInputButton.click();
                        }
                        break;
                    case "save_cvs":
                        chart.exportChartData();
                        break;
                    default:
                        break;
                }
            });

            function initToolBarState() {
                dataViewToolBar[dataViewGrid.getUndo().length > 0 ? "enableItem" : "disableItem"]("undo");
                dataViewToolBar[dataViewGrid.getRedo().length > 0 ? "enableItem" : "disableItem"]("redo");
            }

            function getFileName(filepath) {
                return filepath && (filepath.substring(filepath.lastIndexOf(".") + 1, filepath.length)).toLowerCase();
            }
        }
        else {
            if(chart._hoverFrame){
                var dimension = dataViewWindow.getDimension();
                chart._hoverFrame.css({top: "100px", left: "20px", width: dimension[0] + "px", height: dimension[1] + "px"})
            }
            //dataViewWindow.setPosition(e.clientX, e.clientY);
            dataViewWindow.show();
        }

        function onKeyPressed(code, ctrl, shift) {
            if (code == 67 && ctrl) {
                if (!dataViewGrid._selectionArea)
                    return alert("You need to select a block area in grid first");
                dataViewGrid.setCSVDelimiter("\t");
                dataViewGrid.copyBlockToClipboard();
            }
            if (code == 86 && ctrl) {
                dataViewGrid.setCSVDelimiter("\t");
                dataViewGrid.pasteBlockFromClipboard();
            }
            return true;
        }
    };

    //将曲线图序列数据转换成报表所识别的数据格式
    Chart.prototype.seriesDataToGridData = function () {
        var chart = this,
            options = chart.options,
            dataViewOptions = H.merge(defaultDataViewOptions, options.dataview),
            optionsChart = options.chart,
            parentChart = optionsChart.parentChart,
            series,
            i, j,
            gridData = {
                header: {
                    value: null,
                    style: ["text-align:center; font-size:14px; font-weight:bold"]
                },
                cols: {
                    width: dataViewOptions.colWidth,
                    align: dataViewOptions.colAlign,
                    type: "ro",
                    sort: null
                },
                rows: {
                    rows: []
                }
            };

        if (parentChart) {
            var charts = parentChart.charts;
            series = [];
            for (i = 0; i < charts.length; i++) {
                series = series.concat(charts[i].series);
            }
        }
        else {
            series = chart.series
        }

        for (i = 0; i < series.length; i++) {
            var s = series[i],
                points = s.points,
                xAxis = s.xAxis,
                xAxisOptions = xAxis && xAxis.options,
                tickPositions = xAxis && xAxis.tickPositions,
                tickPositionInfo = tickPositions && tickPositions.info,
                categories = xAxis && xAxis.categories,
                isDatetimeAxis = xAxis && xAxis.isDatetimeAxis,
                dateFormat = isDatetimeAxis && xAxisOptions.dateTimeLabelFormats[tickPositionInfo.unitName],
                split = i == 0 ? "" : ",";

            if(categories === true){
                categories = xAxis.names;
            }

            gridData.header.value = gridData.header.value || ((xAxisOptions && xAxisOptions.title && xAxisOptions.title.text) || "x轴") + ",";
            gridData.header.style.push("text-align:center; font-size:14px; font-weight:bold");
            gridData.cols.width += "," + dataViewOptions.colWidth;
            gridData.cols.align += "," + dataViewOptions.colAlign;
            gridData.cols.type += ",ed";
            gridData.cols.sort = gridData.cols.sort || (isDatetimeAxis ? "date" : (categories ? "str" : "int"));
            gridData.cols.sort += ",int";
            if (s.name.lastIndexOf("Navigator") != -1) {
                continue;
            }
            gridData.header.value += split + s.name;

            for (j = 0; j < points.length; j++) {
                var point = points[j],
                    rowID = categories ? categories[point.x] : point.x,
                    row = findRowByID(rowID);
                if (row) {
                    row.data.push({ value: point.y == null ? "" : point.y, chart_index: s.chart.index, series_index: s.index, point_index: point.index });
                }
                else {
                    gridData.rows.rows.push({
                        id: rowID, data: [
                            { value: isDatetimeAxis ? H.dateFormat(dateFormat, rowID, false) : rowID },
                            { value: point.y, chart_index: s.chart.index, series_index: s.index, point_index: point.index }
                        ]
                    });
                }
            }
        };

        function findRowByID(rowID) {
            for (var r = 0; r < gridData.rows.rows.length; r++) {
                var row = gridData.rows.rows[r];
                if (row.id == rowID) {
                    return row;
                }
            }
            return null;
        }

        return gridData;
    };

    //根据报表中改变的数据更新曲线图
    Chart.prototype.updateFromGrid = function () {
        var chart = this,
            parentChart = chart.options.chart.parentChart,
            dataViewGrid = chart.dataViewGrid,
            i, j;

        var changeRowsIDS = dataViewGrid.getAllRowIds(',').split(',');

        for (i = 0; i < changeRowsIDS.length; i++) {
            dataViewGrid.forEachCell(changeRowsIDS[i], function (cell, ind) {
                var chartIndex = cell.getAttribute("chart_index"),
                    seriesIndex = cell.getAttribute("series_index"),
                    pointIndex = cell.getAttribute("point_index"),
                    cellValue = cell.getValue() == "" ? null : parseFloat(cell.getValue()),
                    series;

                if (parentChart) {
                    var charts = parentChart.charts;
                    for (j = 0; j < charts.length; j++) {
                        if (charts[j].index == chartIndex) {
                            series = charts[j].series[seriesIndex];
                        }
                    }
                }
                else {
                    series = chart.series[seriesIndex];
                }

                //如果单元格对应的点存在，并且单元格的值与点的值不相等，则更新点
                if ((seriesIndex != undefined) && (pointIndex != undefined)) {
                    var changePoint;
                    for (j = 0; j < series.points.length; j++) {
                        if (series.points[j].index == pointIndex) {
                            changePoint = series.points[j];
                        }
                    }
                    if (changePoint && (changePoint.y != cellValue)) {
                        changePoint.update(cellValue);
                    }
                }

                    //如果单元格对应的点不存在，但是单元格中有值，则添加点
                else if ((seriesIndex == undefined) && (pointIndex == undefined)) {

                }
            })
        }
    };

    Chart.prototype.post = function (url, data, formAttributes) {
        var name,
            form;

        // create the form
        form = H.createElement('form', H.merge({
            method: 'post',
            action: url,
            enctype: 'multipart/form-data'
        }, formAttributes), {
            display: 'none'
        }, document.body);

        // add the data
        for (name in data) {
            H.createElement('input', {
                type: "hidden",
                name: name,
                value: data[name]
            }, null, form);
        }

        // submit
        form.submit();

        // clean up
        H.discardElement(form);
    };

    /**
     * 服务器返回结果处理函数
     * @param type 请求的类型，导入数据还是导出数据
     * @param data
     * @constructor
     */
    window.DataViewResponse = function (type, data) {
        switch (type) {
            case "import_csv":
                data = "2015-1,0.8,124\t2015-2,0.8,236\t2015-3,0.3,360\t2015-4,0.5,480\t2015-5,1,604\t2015-6,1.9,724\t2015-7,2.6,848\t2015-8,3,972\t2015-9,2,1092\t2015-10,1.8,1216\t2015-11,2.8,1336\t2015-12,3.8,1460";

                var chart = $("#container").highcharts();
                var dataViewGrid = chart.dataViewGrid;
                //                alert(data)
                break;
            case "save_cvs":

                alert(data)
                break;
        }
    }
}(Highcharts));