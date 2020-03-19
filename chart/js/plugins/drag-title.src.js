/**
 * HWcharts plugin for dragging a title
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
    var addEvent = H.addEvent;

    H.wrap(H.Chart.prototype, 'init', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        var chart = this,
            title = chart.title,
            options = chart.options.title,
            renderer = chart.renderer,
            isDragging,
            downX,
            downY,
            optionsX,
            optionsY,
            currentX,
            currentY;


        if (/*options.draggable &&*/ title) {

            title.css({ cursor: 'move' });

            addEvent(title.element, 'mousedown', function (e) {
                e = chart.pointer.normalize(e);
                downX = e.chartX;
                downY = e.chartY;
                optionsX = options.x;
                optionsY = options.y;
                currentX = title.attr('translateX');
                currentY = title.attr('translateY');
                isDragging = true;
            });
            addEvent(chart.container, 'mousemove', function (e) {
                if (isDragging) {
                    e = chart.pointer.normalize(e);
                    var draggedX = e.chartX - downX,
                        draggedY = e.chartY - downY;

                    options.x = optionsX + draggedX;
                    options.y = optionsY + draggedY;

                    // Do the move is we're inside the chart

                    title.placed = false; // prevent animation
                    title
                        .align(H.extend({
//                            y: renderer.fontMetrics(options.style.fontSize, title).b - 3
                        }, options), false, 'spacingBox');
//
//                    title.align(H.extend({
//                            width: 100,
//                            height: 100
//                        }, options), true, 'spacingBox');
                }
            });
            addEvent(document, 'mouseup', function () {
                isDragging = false;
            });
        }
    });
}(Highcharts));