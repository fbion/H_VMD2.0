/**
 * Draggable Series plugin
 * Author: Torstein Honsi
 * License: MIT License
 *
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

    var addEvent = H.addEvent,
        removeEvent = H.removeEvent,
        each = H.each,
        pick = H.pick,
        Pointer = H.Pointer,

        parentChart,

        hasAddEvent,
        proxyChartContainer,
        proxyPos,
        proxyLeft,
        proxyTop;

    H.wrap(Pointer.prototype, 'onContainerContextMenu', function (proceed, e) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        e = this.normalize(e);

        var chart = this.chart;

        addMenuItem(e, chart);
        if(chart.onPoint(e)){
            chart.ShowContextMenu(e, "point");
        }
        else{
            chart.ShowContextMenu(e, "edit");
        }
    });

    //在右键菜单中添加数据查看项
    function addMenuItem(e, chart) {
        var dhxContextMenu_Edit = chart.dhxContextMenu_Edit,
            isExistView = false,
            isExistMoveSeries =false,
            isSeriesDraggable = chart.options.chart.seriesDraggable !== false ? true : false;
        dhxContextMenu_Edit.forEachItem(function (itemId) {
            if (itemId == "view") {
                isExistView = true;
            }
            if(itemId == "moveSeries"){
                isExistMoveSeries = true;
            }
        });

        if(!isExistView){
            dhxContextMenu_Edit.addNewChild(dhxContextMenu_Edit.topId, 2, "view", unescape("%u89C6%u56FE"));
        }

        if (!isExistMoveSeries) {
            dhxContextMenu_Edit.addCheckbox("child", "view", 5, "moveSeries", unescape("%u79FB%u52A8%u66F2%u7EBF"), isSeriesDraggable, false);
            //给右键菜单中数据查看添加事件
            dhxContextMenu_Edit.attachEvent("onCheckboxClick", function(id, state, zoneId, cas){
                if(id == "moveSeries"){
                    parentChart = chart.options.chart.parentChart;
                    var charts = parentChart && parentChart.charts;
                    if(charts){
                        for(var i = 0; i < charts.length; i++){
                            charts[i].options.chart.seriesDraggable = !state;
                        }
                    }
                }

                return true;
            });
        }
        else{
            dhxContextMenu_Edit.setCheckboxState("moveSeries", isSeriesDraggable);
        }
    }

    /**
     * Filter by dragMin and dragMax
     */
    H.Chart.prototype.createProxyChart = function(chart, xOptions, yOptions, sOptions){
        var proxyWidth = chart.plotWidth,
            proxyHeight = chart.plotHeight;

        proxyPos = getElementPos(chart.container);
        proxyLeft = proxyPos.x + chart.plotLeft;
        proxyTop = proxyPos.y + chart.plotTop;

        if(!proxyChartContainer){
            proxyChartContainer = H.createElement("div", {
                id:"proxy_container"
            }, {
                width: proxyWidth + "px",
                height: proxyHeight + "px",
                left: proxyLeft + "px",
                top: proxyTop + "px",
                zIndex:1000,
                position: "absolute"
            }, document.body, true);
            var proxyChartOptions = {};
            proxyChartOptions.chart = chart.options.chart;

            var options = H.merge(proxyChartOptions,{
                chart:{
                    renderTo: "proxy_container",
                    width: proxyWidth,
                    height: proxyHeight,
                    backgroundColor: 'none',
                    backgroundOpacity:0,
                    plotBackgroundColor:null,
                    marginTop:0,
                    marginBottom:0,
                    marginLeft:0,
                    marginRight:0,
                    plotBackgroundImage:null,
                    borderWidth:0,
                    plotBorderWidth:0,
                    animation:false
                },
                title:{
                    text:""
                },
                subtitle:{
                    text:""
                },
                legend:{
                    enabled:false
                },
                tooltip:{
                    enabled:false
                },
                xAxis: xOptions,
                yAxis: yOptions,

                series:[sOptions],
                credits:{
                    enabled:false
                },
                exporting:{
                    enabled:false
                }
            }, options);

            chart.proxyChart = new H.Chart(options);
        }
    }

    H.Chart.prototype.callbacks.push(function (chart) {

        var container = chart.container,
            dragSeries,
            dragX,
            dragY,
            canDrag,
            isDragging,
            seriesOptions,
            sourceChart,
            allDivs;  //页面中所有的div

        parentChart = chart.options.chart.parentChart;

        function mouseDown(e) {
            var hoverSeries = chart.hoverSeries,
                draggable = chart.options.chart.seriesDraggable,
                originalEvent = e.originalEvent || e;

            if (parentChart && hoverSeries) {
                if(draggable !== false){
                    dragX = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageX : e.pageX;
                    dragY = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageY : e.pageY;
                    dragSeries = hoverSeries;
                    allDivs = $("div");
                    sourceChart = findChartByMousePos(e.pageX, e.pageY);

                    // Disable zooming when dragging
                    if (dragSeries) {
                        chart.mouseIsDown = false;
                    }
                    canDrag = true;
                }
            }
        }

        function mouseMove(e) {
            if(document.all){ //判断IE浏览器
                window.event.returnValue = false;
            }
            else{
                e.preventDefault();
            };

            var originalEvent = e.originalEvent || e,
                pageX = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageX : e.pageX,
                pageY = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageY : e.pageY,
                deltaY = dragY - pageY,
                deltaX = dragX - pageX;
            if (dragSeries && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
                seriesOptions = dragSeries.options;
                seriesOptions.type = seriesOptions.type || (dragSeries.chart.options.chart && dragSeries.chart.options.chart.type);
                if(canDrag && !chart.proxyChart){
                    isDragging = true;
                    chart.createProxyChart(sourceChart, H.merge(dragSeries.xAxis && dragSeries.xAxis.options,{
                        lineWidth: 0,
                        gridLineWidth:0,
                        minorGridLineWidth:0,
                        tickWidth:0,
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: ""
                        }
                    }), H.merge(dragSeries.yAxis && dragSeries.yAxis.options,{
                        max:dragSeries.yAxis && dragSeries.yAxis.max,
                        min:dragSeries.yAxis && dragSeries.yAxis.min,
                        lineWidth: 0,
                        gridLineWidth:0,
                        minorGridLineWidth:0,
                        tickWidth:0,
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: ""
                        }
                    }), H.merge(dragSeries.options,{
                        id:chart.container.id + dragSeries.options.id,
                        allowPointSelect:false,
                        enableMouseTracking: false,
                        animation: false,
                        dataLabels:{
                            enabled:false
                        },
                        color:H.Color(dragSeries.color).setOpacity(0.2).get()
                    }));

                    dragSeries.hide();
                }

                if(proxyChartContainer){
                    proxyChartContainer.style.left = proxyLeft - deltaX + "px";
                    proxyChartContainer.style.top = proxyTop - deltaY + "px";
                }
            }
        }

        function drop(e) {
            if (dragSeries && isDragging) {
                var originalEvent = e.originalEvent || e,
                    pageX = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageX : e.pageX,
                    pageY = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageY : e.pageY;
                var targetChart = findChartByMousePos(pageX, pageY);
                if(targetChart){
                    seriesOptions.visible = true;
                    if(targetChart == sourceChart){
                        targetChart.addSeries(seriesOptions);
                    }
                    else{
                        targetChart.addSeries(H.merge(seriesOptions, {
                            xAxis:0,
                            yAxis:0
                        }));
                    }

                    targetChart['seriesClickEvent' + dragSeries.name] = null;
                    targetChart['seriesDblClickEvent' + dragSeries.name] = null;
                    if(targetChart.addSeriesDoubleClick){
                        targetChart.addSeriesDoubleClick();
                    }
                    if(targetChart.addSeriesClick){
                        targetChart.addSeriesClick();
                    }
                }

                dragSeries.remove();
                H.discardElement(proxyChartContainer);
                proxyChartContainer = undefined;
                chart.proxyChart = undefined;

            }
            dragSeries = dragX = dragY = undefined;
            isDragging = false;
            canDrag = false;
        }

        //根据鼠标的位置获取曲线图对象
        function findChartByMousePos(xPos, yPos){
            //查找出在鼠标下方并且包含图表对象的div
            for(var i = 0; i < allDivs.length; i++){
                var div = allDivs[i],
                    chart = $(div).highcharts(),
                    divPos = getElementPos(div),
                    divX = divPos.x,
                    divY = divPos.y,
                    divW = div.offsetWidth,
                    divH = div.offsetHeight;

                if(chart && xPos > divX && xPos < (divX + divW) && yPos > divY && yPos < (divY + divH)){
                    return chart;
                }
            }
        }

        // Add'em
        addEvent(container, 'touchmove', mouseMove);
        addEvent(container, 'mousedown', mouseDown);
        addEvent(container, 'touchstart', mouseDown);
        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', drop);
        addEvent(document, 'touchend', drop);
//        addEvent(container, 'mouseleave', drop);
    });

    function getElementPos(element){
        var ua = navigator.userAgent.toLowerCase();
        var isOpera = (ua.indexOf('opera') != -1);
        var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
        if (element.parentNode === null || element.style.display == 'none') {
            return false;
        }
        var parent = null;
        var pos = [];
        var box;
        if (element.getBoundingClientRect) //IE
        {
            box = element.getBoundingClientRect();
            var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
            return {
                x: box.left + scrollLeft,
                y: box.top + scrollTop
            };
        }
        else if (document.getBoxObjectFor) // gecko
        {
            box = document.getBoxObjectFor(element);
            var borderLeft = (element.style.borderLeftWidth) ? parseInt(element.style.borderLeftWidth) : 0;
            var borderTop = (element.style.borderTopWidth) ? parseInt(element.style.borderTopWidth) : 0;
            pos = [box.x - borderLeft, box.y - borderTop];
        }
        else
        {
            pos = [element.offsetLeft, element.offsetTop];
            parent = element.offsetParent;
            if (parent != element) {
                while (parent) {
                    pos[0] += parent.offsetLeft;
                    pos[1] += parent.offsetTop;
                    parent = parent.offsetParent;
                }
            }
            if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && element.style.position == 'absolute'))
            {
                pos[0] -= document.body.offsetLeft;
                pos[1] -= document.body.offsetTop;
            }
        }
        if (element.parentNode) {
            parent = element.parentNode;
        }
        else {
            parent = null;
        }
        while (parent && parent.tagName != 'BODY'&&parent.tagName != 'HTML') { // account for any scrolled ancestors
            pos[0] -= parent.scrollLeft;
            pos[1] -= parent.scrollTop;
            if (parent.parentNode) {
                parent = parent.parentNode;
            }
            else {
                parent = null;
            }
        }
        return {
            x: pos[0],
            y: pos[1]
        };
    }
})(Highcharts);
