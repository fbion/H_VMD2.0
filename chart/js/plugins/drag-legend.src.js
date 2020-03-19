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
    var addEvent = H.addEvent,
        fireEvent = H.fireEvent,

        HOVER_STATE = 'hover';

    H.wrap(H.Chart.prototype, 'init', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var chart = this,
            legend = chart.legend,
            group = legend.group,
            options = legend.options,
            dragFlag,
            downX,
            downY,
            optionsX,
            optionsY,
            currentX,
            currentY;


        if (/*options.draggable &&*/ group) {

            group.css({ cursor: 'move' });

            addEvent(group.element, 'mousedown', function (e) {
                e = chart.pointer.normalize(e);
                downX = e.chartX;
                downY = e.chartY;
                optionsX = options.x;
                optionsY = options.y;
                currentX = legend.group.attr('translateX');
                currentY = legend.group.attr('translateY');
                legend.isDragging = false;
                dragFlag = true;
            });
            addEvent(chart.container, 'mousemove', function (e) {
                if (dragFlag) {
                    e = chart.pointer.normalize(e);
                    var draggedX = e.chartX - downX,
                        draggedY = e.chartY - downY;

                    options.x = optionsX + draggedX;
                    options.y = optionsY + draggedY;

                    // Do the move is we're inside the chart
                    if (currentX + draggedX > 0 &&
                        currentX + draggedX + legend.legendWidth < chart.chartWidth &&
                        currentY + draggedY > 0 &&
                        currentY + draggedY + legend.legendHeight < chart.chartHeight) {
                        legend.group.placed = false; // prevent animation
                        legend.group.align(H.extend({
                            width: legend.legendWidth,
                            height: legend.legendHeight,
                            zIndex:9999
                        }, options), true, 'spacingBox');
                    }

                    if(Math.abs(draggedX) > 0 || Math.abs(draggedY) > 0){
                        options.floating = true;
                        legend.isDragging = true;
                    }
                }
            });
            addEvent(document, 'mouseup', function () {
                dragFlag = false;
            });
        }
    });

    //拖动与图例项点击互不影响
    H.wrap(H.Legend.prototype, 'setItemEvents', function (proceed,item, legendItem, useHTML, itemStyle, itemHiddenStyle) {
        var legend = this;
        // Set the events on the item group, or in case of useHTML, the item itself (#1249)
        (useHTML ? legendItem : item.legendGroup).on('mouseover', function () {
            item.setState(HOVER_STATE);
            legendItem.css(legend.options.itemHoverStyle);
        })
            .on('mouseout', function () {
                legendItem.css(item.visible ? itemStyle : itemHiddenStyle);
                item.setState();
            })
            .on('mouseup', function (event) {
                if(legend.isDragging){
                    return;
                }
                var strLegendItemClick = 'legendItemClick',
                    fnLegendItemClick = function () {
                        item.setVisible();
                    };

                // Pass over the click/touch event. #4.
                event = {
                    browserEvent: event
                };

                // click the name or symbol
                if (item.firePointEvent) { // point
                    item.firePointEvent(strLegendItemClick, event, fnLegendItemClick);
                } else {
                    fireEvent(item, strLegendItemClick, event, fnLegendItemClick);
                }
            });
    });
}(Highcharts));