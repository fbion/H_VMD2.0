/**
 * 十字准星线
 * 20191121
 */

(function(H) {
	var path = CreateJSPath("hwAPI.js", -2),
		addEvent = H.addEvent,
		removeEvent = H.removeEvent,
		each = H.each,
		merge = H.merge,
		Chart = H.Chart,
		Pointer = H.Pointer,
		Axis = H.Axis,
		Series = H.Series;
		var chart = null,ren = null;
	H.wrap(Pointer.prototype, 'onContainerMouseMove', function(proceed, e) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));
			if(!chart){
				chart = this.chart;
				ren = chart.renderer;
			}	
		var width = chart.plotBox.width,
			height = chart.plotBox.height;
			if(!chart.coorX){
				chart.coorX = ren.rect(chart.plotBox.x-10, chart.plotBox.y-10, width+20, 0.5, 0)
					.attr({
						'stroke-width': 0.5,
						stroke: '#333',
						zIndex: 3
					})
					.add();
			}
		if(!chart.coorY){
			chart.coorY = ren.rect(chart.plotBox.x-10, chart.plotBox.y-10, 0.5, height+20, 0)
				.attr({
					'stroke-width': 0.5,
					stroke: '#333',
					zIndex: 3
				})
				.add();
		}
		if(chart.coorX&&chart.coorY){
			chart.coorX.attr({
				y: e.chartY
			})
			chart.coorY.attr({
				x: e.chartX,
			})
		}
	});

	H.wrap(Pointer.prototype, 'onContainerMouseLeave', function(proceed, e) {
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));
		if(chart.coorX){
			chart.coorX.destroy();
			chart.coorX = null;
		}
		if(chart.coorY){
			chart.coorY.destroy();
			chart.coorY = null;
		}
	});

}(Highcharts));
