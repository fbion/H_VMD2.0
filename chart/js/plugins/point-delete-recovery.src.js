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
    Pointer.prototype.onContainerContextMenu = Pointer.prototype.onContainerContextMenu || function (e) {};
    H.wrap(Pointer.prototype, 'onContainerContextMenu', function (proceed, e) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var chart = this.chart,
            options = chart.options,
            optionsChart = options.chart,
            dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            dhxContextMenu_Point = chart.dhxContextMenu_Point;

        getDhtmlxWindow();
        if(_isTopWindow){
            chart.dhxContextMenu_Edit = dhxContextMenu_Edit = chart.dhxContextMenu_Edit || new dhtmlXMenuObject();
            chart.dhxContextMenu_Point = dhxContextMenu_Point = chart.dhxContextMenu_Point || new dhtmlXMenuObject();
        }
        else{
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
    Chart.prototype.onPoint = function(e){
        var chart = this,
            hoverSeries = chart.hoverSeries;
        var range = 8; //点的半径
        //console.log(hoverSeries)
        var points = (hoverSeries && hoverSeries.points) || [];
        for(var j = 0; j < points.length; j++){
            var p = points[j];
            if(Math.abs(p.plotX + chart.plotLeft - e.chartX) <= range && Math.abs(p.plotY + chart.plotTop - e.chartY) <= range){
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
    Chart.prototype.ShowContextMenu = function(e, type){
        var chart = this,
            options = chart.options,
            optionsChart = options.chart,
            dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            dhxContextMenu_Point = chart.dhxContextMenu_Point;

        var offsetX = 0,
            offsetY = 0;
        //没有嵌入到iframe中
        getDhtmlxWindow();
        if(parentFrame){
            offsetX = $(parentFrame).offset().left;
            offsetY = $(parentFrame).offset().top;
        }
        chart.HideContextMenu();
        switch (type){
            case "edit":
                if(dhxContextMenu_Edit){
                    dhxContextMenu_Edit.showContextMenu(offsetX + e.clientX + ___getPageScroll()[0], offsetY + e.clientY + ___getPageScroll()[1]);
                }
                break;
            case "point":
                if(dhxContextMenu_Point){
                    dhxContextMenu_Point.showContextMenu(offsetX + e.clientX + ___getPageScroll()[0], offsetY + e.clientY + ___getPageScroll()[1]);
                }
                break;
            default :

        }
    };

    /**
     * 隐藏所有右键菜单
     * @param e
     * @param type
     * @constructor
     */
    Chart.prototype.HideContextMenu = function(){
        var chart = this,
            options = chart.options,
            optionsChart = options.chart,
            parentChart = optionsChart && optionsChart.parentChart,
            dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            dhxContextMenu_Point = chart.dhxContextMenu_Point;

        if(parentChart){
            var charts = parentChart.charts;
            for(var i = 0; i < charts.length; i++){
                dhxContextMenu_Edit = charts[i].dhxContextMenu_Edit;
                dhxContextMenu_Point = charts[i].dhxContextMenu_Point;
                //隐藏右键菜单
                if(dhxContextMenu_Edit){
                    dhxContextMenu_Edit.hide();
                }
                if(dhxContextMenu_Point){
                    dhxContextMenu_Point.hide();
                }
            }
        }
        else {
            //隐藏右键菜单
            if(dhxContextMenu_Edit){
                dhxContextMenu_Edit.hide();
            }
            if(dhxContextMenu_Point){
                dhxContextMenu_Point.hide();
            }
        }
    }
}(Highcharts));


(function (H) {
    var Pointer = H.Pointer,
        hoverPoint,
        color,fillColor;
    H.wrap(Pointer.prototype, 'onContainerContextMenu', function (proceed, e) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        e = this.normalize(e);

        var chart = this.chart,
            deleteMode = chart.options.plotOptions.series.deleteMode,
            dhxContextMenu_Point = chart.dhxContextMenu_Point;

        hoverPoint = chart.onPoint(e);

        console.log(chart.userOptions.series[0].marker)

        if(hoverPoint){
            var isExistDeletePoint =false;
            dhxContextMenu_Point.forEachItem(function (itemId) {
                if(itemId == "deletePoint"){
                    isExistDeletePoint = true;
                }
            });

            if (!isExistDeletePoint) {
                dhxContextMenu_Point.addNewChild(dhxContextMenu_Point.topId, 1, "deletePoint", unescape("%u5220%u9664%u70B9"), false);
                dhxContextMenu_Point.addNewChild(dhxContextMenu_Point.topId, 2, "recoveryPoint", unescape("%u6062%u590D%u70B9"), false);
                //给右键菜单中数据查看添加事件
                dhxContextMenu_Point.attachEvent("onClick", function (id, zoneId, cas) {
                    if (id == "deletePoint") {

                        chart.deletePointModule = true;
                        if(hoverPoint){
                            if(deleteMode){
                                hoverPoint.deleteMode = "recovery"; //"recovery"可恢复，"delete"不可恢复
                            }
                            else{
                                hoverPoint.deleteMode = "delete"; //"recovery"可恢复，"delete"不可恢复
                            }

                            var pointChangeOptions = {
                                marker:{
                                    fillColor: "#ffffff",
                                    lineColor:"#000000",
                                    lineWidth:2
                                }
                            };

                            hoverPoint.update(pointChangeOptions, false);
                            hoverPoint.series.redraw();
                        }
                    }
                    else if(id == "recoveryPoint"){
                        chart.deletePointModule = true;
                        hoverPoint.deleteMode = "";

                        var pointChangeOptions = {
                            marker:{
                                fillColor:hoverPoint.fillColor||hoverPoint.color,
                                lineColor:hoverPoint.fillColor||hoverPoint.color,
                                lineWidth:0
                            }
                        };

                        hoverPoint.update(pointChangeOptions, false);
                        hoverPoint.series.redraw();
                    }
                });
            }
            chart.ShowContextMenu(e, "point");
        }
        else{
            chart.ShowContextMenu(e, "edit");
        }
    });
}(Highcharts));