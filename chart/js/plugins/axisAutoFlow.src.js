/**
 * Highcharts JS v4.2.5 (2016-05-06)
 * Highcharts Broken Axis module
 *
 * License: www.highcharts.com/license
 */

(function (factory) {
    /*= if (!build.assembly) { =*/
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
        return;
    }
    /*= } =*/
    factory(Highcharts);

}(function (H) {

    'use strict';

    var pick = H.pick,
        wrap = H.wrap,
        each = H.each,
        extend = H.extend,
        fireEvent = H.fireEvent,
        Chart = H.Chart,
        Axis = H.Axis,
        Series = H.Series;

    wrap(Series.prototype, 'setVisible', function (proceed,vis, redraw) {
        var chart = this.chart,
            options = chart.options;

        if(options.chart.axisAutoFlow){
            proceed.call(this, vis, false);
            //遍历行，当每行中有坐标轴隐藏时，重新设置坐标轴的偏移
            var visibleRows = [];
            var maxLeftMargin = 0;
            var maxRightMargin = 0;
            var remainHeight = 100; //排除上下边距和间距后剩余的曲线高度，此高度由显示的行平分
            for(var i = 0; i < chart.axesRows.length; i++){
                var axesRow = chart.axesRows[i];

                var leftAxes = axesRow.leftAxes,//左轴
                    rightAxes = axesRow.rightAxes;//右轴

                var hasAxisVisible = false; //这一行中是否有轴显示
                var leftVisibleAxes = []; //左侧显示的轴
                for(var j = 0; j < leftAxes.length;j++){
                    if(isShowAxis(leftAxes[j])){
                        hasAxisVisible = true;
                        leftAxes[j].posIndex = j;
                        leftVisibleAxes.push(leftAxes[j]);
                    }
                }
                //隐藏左轴
                for(var j = leftVisibleAxes.length - 1; j >= 0; j--){
                    var visibleAxis = leftVisibleAxes[j];
                    //第一个显示的轴
                    if(j == leftVisibleAxes.length - 1){
                        visibleAxis.options.offset = 0;
                    }
                    else{
                        visibleAxis.options.offset = leftAxes[(leftVisibleAxes[j+1].posIndex - 1)].originOffset - leftAxes[(leftVisibleAxes[j+1].posIndex)].originOffset + leftVisibleAxes[j+1].options.offset;
                    }
                    var axisOptions = getAxisOptionsByID(options, visibleAxis.options.id, "y");
                    if(axisOptions){
                        axisOptions.offset = visibleAxis.options.offset;
                    }
                }
                //隐藏坐标轴后重设左边距
                if(leftAxes.length == leftVisibleAxes.length){
                    axesRow.leftMargin = axesRow.originLeftMargin;
                }
                else{
                    var additionMargin = 0;
                    if(leftVisibleAxes.length == 0){
                        axesRow.leftMargin = 20;
                    }
                    else{
                        if(leftVisibleAxes[0].posIndex == 0){
                            additionMargin = axesRow.originLeftMargin - leftVisibleAxes[0].originOffset;
                        }
                        else{
                            additionMargin = leftAxes[leftVisibleAxes[0].posIndex].originOffset - leftAxes[leftVisibleAxes[0].posIndex - 1].originOffset ;
                        }
                        axesRow.leftMargin = additionMargin + leftVisibleAxes[0].options.offset - leftVisibleAxes[leftVisibleAxes.length - 1].options.offset;
                    }
                }
                maxLeftMargin = Math.max(maxLeftMargin, axesRow.leftMargin);

                var rightVisibleAxes = []; //右侧显示的轴
                for(var j = 0; j < rightAxes.length;j++){
                    if(isShowAxis(rightAxes[j])){
                        hasAxisVisible = true;
                        rightAxes[j].posIndex = j;
                        rightVisibleAxes.push(rightAxes[j]);
                    }
                }
                //隐藏右轴
                for(var j = 0; j < rightVisibleAxes.length; j++){
                    var visibleAxis = rightVisibleAxes[j];
                    //第一个显示的轴
                    if(j == 0){
                        visibleAxis.options.offset = 0;
                    }
                    else{
                        visibleAxis.options.offset = rightAxes[(rightVisibleAxes[j-1].posIndex + 1)].originOffset - leftAxes[(rightVisibleAxes[j-1].posIndex)].originOffset + rightVisibleAxes[j-1].options.offset;
                    }

                    var axisOptions = getAxisOptionsByID(options, visibleAxis.options.id, "y");
                    if(axisOptions){
                        axisOptions.offset = visibleAxis.options.offset;
                    }
                }

                //隐藏坐标轴后重设右边距
                if(rightAxes.length == rightVisibleAxes.length){
                    axesRow.rightMargin = axesRow.originRightMargin;
                }
                else{
                    var additionMargin = 0;
                    if(rightVisibleAxes.length == 0){
                        axesRow.rightMargin = 20;
                    }
                    else{
                        if(rightVisibleAxes[rightVisibleAxes.length - 1].posIndex == rightAxes.length - 1){
                            additionMargin = axesRow.originRightMargin - rightVisibleAxes[rightVisibleAxes.length - 1].originOffset;
                        }
                        else{
                            additionMargin = rightAxes[rightVisibleAxes[rightVisibleAxes.length - 1].posIndex + 1].originOffset - rightAxes[rightVisibleAxes[0].posIndex].originOffset ;
                        }
                        axesRow.rightMargin = additionMargin + rightVisibleAxes[rightVisibleAxes.length - 1].options.offset - rightVisibleAxes[0].options.offset;
                    }
                }
                maxRightMargin = Math.max(maxRightMargin, axesRow.rightMargin);

                axesRow.visible = hasAxisVisible;
                if(axesRow.visible){
                    visibleRows.push(axesRow);
                    if(visibleRows.length > 1){
                        remainHeight -= axesRow.percentTopMargin;
                    }
                }
            }
            remainHeight -= chart.axesRows[0].percentTopMargin;
            remainHeight -= chart.axesRows[chart.axesRows.length - 1].percentBottomMargin;

            if(visibleRows.length > 0){
                var averageHeight = remainHeight / visibleRows.length;
                //行隐藏后重设显示行的高度
                var globalMargin = 0;
                for(var i = 0; i < visibleRows.length; i++){
                    var axes = visibleRows[i].leftAxes.concat(visibleRows[i].rightAxes);
                    if(i == 0){
                        for(var j = 0; j < axes.length; j++){
                            axes[j].options.height = averageHeight + "%";
                            axes[j].options.top = "0%";

                            var axisOptions = getAxisOptionsByID(options, axes[j].options.id, "y");
                            if(axisOptions){
                                axisOptions.height = axes[j].options.height;
                                axisOptions.top = axes[j].options.top;
                            }
                        }
                    }
                    else{
                        globalMargin += visibleRows[i].percentTopMargin;
                        for(var j = 0; j < axes.length; j++){
                            axes[j].options.height = averageHeight + "%";
                            axes[j].options.top = (averageHeight * i + globalMargin) + "%";

                            var axisOptions = getAxisOptionsByID(options, axes[j].options.id, "y");
                            if(axisOptions){
                                axisOptions.height = axes[j].options.height;
                                axisOptions.top = axes[j].options.top;
                            }
                        }
                    }
                }
            }

            chart.options.chart.marginRight = maxRightMargin;
            chart.options.chart.marginLeft = maxLeftMargin;

            chart.margin[1] = maxRightMargin;
            chart.margin[3] = maxLeftMargin;

            chart.redraw();
        }
        else{
            proceed.call(this, vis, redraw);
        }
    });

    wrap(Axis.prototype, 'hasData', function (proceed) {
        var chart = this.chart,
            options = chart.options;

        if(options.chart.axisAutoFlow){
            return this.hasVisibleSeries;
        }
        else{
            return this.hasVisibleSeries || (defined(this.min) && defined(this.max) && !!this.tickPositions);
        }
    });

    function isShowAxis(axis){
        var series = axis.series;
        for(var i = 0; i < series.length; i++){
            if(series[i].visible){
                return true;
            }
        }
        return false;
    }

    function getAxisOptionsByID(options, id, type){
        if(type == "x"){
            for(var i = 0; i < options.xAxis.length; i++){
                if(options.xAxis[i].id == id){
                    return options.xAxis[i];
                }
            }
        }
        else if(type == "y"){
            for(var i = 0; i < options.yAxis.length; i++){
                if(options.yAxis[i].id == id){
                    return options.yAxis[i];
                }
            }
        }
    }

    H.Chart.prototype.callbacks.push(function (chart) {
        var options = chart.options;
        if(options.chart.axisAutoFlow){
            chart.axesRows = [];
            var axes = chart.axes;
            for(var i = 0; i < axes.length; i++){
                var axis = axes[i],
                    axisOptions = axis.options;
                if(axisOptions.isX || axisOptions.id == "navigator-y-axis" || axisOptions.id == "navigator-x-axis"){
                    continue;
                }
                axis.originOffset = axis.options.offset;
                var row = getAxisRow(axis);
                if(axis.opposite){
                    pushAxis(row.rightAxes, axis);
                }
                else{
                    pushAxis(row.leftAxes, axis);
                }
            }

            var leftMaxAxisSizeRow, //左边的轴最多的行
                rightMaxAxisSizeRow; //右边的轴最多的行
            for(var i = 0; i < chart.axesRows.length; i++){
                var row = chart.axesRows[i];
                leftMaxAxisSizeRow = leftMaxAxisSizeRow || row;
                rightMaxAxisSizeRow = rightMaxAxisSizeRow || row;
                if(row.leftAxes.length > leftMaxAxisSizeRow.leftAxes.length){
                    leftMaxAxisSizeRow = row;
                }
                if(row.rightAxes.length > rightMaxAxisSizeRow.rightAxes.length){
                    rightMaxAxisSizeRow = row;
                }

                //处理每行的上下边距
                if(i == 0){
                    row.percentTopMargin = row.percentTop;
                }
                else{
                    row.percentTopMargin = (row.percentTop - (chart.axesRows[i-1].percentTop + chart.axesRows[i-1].percentHeight));
                }
                if(i == chart.axesRows.length - 1){
                    row.percentBottomMargin = (100 - (row.percentTop + row.percentHeight));
                }
                else{
                    row.percentBottomMargin = (chart.axesRows[i+1].percentTop - (row.percentTop + row.percentHeight));
                }
            }
            leftMaxAxisSizeRow.originLeftMargin = chart.margin[3];
            rightMaxAxisSizeRow.originRightMargin = chart.margin[1];

            //设置每一行的初始左右边距
            for(var i = 0; i < chart.axesRows.length; i++){
                var row = chart.axesRows[i];
                var leftAxisCursor = leftMaxAxisSizeRow.leftAxes[(leftMaxAxisSizeRow.leftAxes.length - row.leftAxes.length - 1)];
                row.originLeftMargin = (leftAxisCursor && (-leftAxisCursor.offset)) || leftMaxAxisSizeRow.originLeftMargin;

                var rightAxisCursor = rightMaxAxisSizeRow.rightAxes[row.rightAxes.length];
                row.originRightMargin = (rightAxisCursor && rightAxisCursor.offset) || rightMaxAxisSizeRow.originRightMargin;

                row.leftMargin = row.originLeftMargin;
                row.rightMargin = row.originRightMargin;
            }

            var sss = "";
        }

        //将坐标轴放到行坐标轴数组中,顺序从左到右
        function pushAxis(rowAxes, axis){
            if(rowAxes.length == 0){
                rowAxes.push(axis);
                return;
            }
            var hasResult = false;
            for(var i = 0; i < rowAxes.length; i++){
                var axisCol = rowAxes[i];
                //
                if(axis.offset < (axisCol.offset || 0)){
                    hasResult = true;
                    rowAxes.splice(i, 0, axis);
                    return;
                }
                //当前轴在当前行下边，并且在下一行的上边
                if((axisCol.offset || 0) < axis.offset && rowAxes[i+1] && rowAxes[i+1].offset > axis.offset){
                    hasResult = true;
                    rowAxes.splice(i + 1, 0, axis);
                    return tRow;
                }
            }
            if(!hasResult){
                rowAxes.push(axis);
                return;
            }
        }

        function getAxisRow(axis){
            var top = axis.top,
                height = axis.height,
                percentTop = parseInt(axis.options.top || "0%"),
                percentHeight = parseInt(axis.options.height);
            var tRow = {
                visible:true,
                top:top,
                height:height,
                originPercentTop: percentTop,
                originPercentHeight:percentHeight,
                percentTop: percentTop,
                percentHeight:percentHeight,
                leftAxes:[],
                rightAxes:[]
            }
            if(chart.axesRows.length == 0){
                chart.axesRows.push(tRow);
                return tRow;
            }

            var hasResult = false;
            for(var i = 0; i < chart.axesRows.length; i++){
                var axesRow = chart.axesRows[i];
                //当前轴在当前行里
                if(axesRow.top <= top && (axesRow.top + axesRow.height) >= top){
                    hasResult = true;
                    return axesRow;
                }
                //当前轴在当前行上边
                if((top + height) < axesRow.top){

                    chart.axesRows.splice(i,0,tRow);
                    hasResult = true;
                    return tRow;
                }
                //当前轴在当前行下边，并且在下一行的上边
                if((axesRow.top + axesRow.height) < top && chart.axesRows[i+1] && (top + height) < chart.axesRows[i+1].top){

                    chart.axesRows.splice(i+1,0,tRow);
                    hasResult = true;
                    return tRow;
                }
            }
            if(!hasResult){
                chart.axesRows.push(tRow);
                return tRow;
            }
        }
    });
}));
