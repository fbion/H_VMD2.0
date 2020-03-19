Vmd.define('hwchart.chart.helper.LargeLineDraw', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.shape.largeLine'
    ]
}, function () {
    

    var graphic = hwchart.util.graphic;

    var IncrementalDisplayable = zrender.IncrementalDisplayable;

    var lineContain = zrender.contain.line;

    var quadraticContain = zrender.contain.quadratic;

   
    // TODO Batch by color
    var LargeLineShape = hwchart.util.shape.largeLine;

    function LargeLineDraw() {
        this.group = new graphic.Group();
    }

    var largeLineProto = LargeLineDraw.prototype;

    largeLineProto.isPersistent = function () {
        return !this._incremental;
    };
    /**
     * Update symbols draw by new data
     * @param {module:hwcharts/data/List} data
     */


    largeLineProto.updateData = function (data) {
        this.group.removeAll();
        var lineEl = new LargeLineShape({
            rectHover: true,
            cursor: 'default'
        });
        lineEl.setShape({
            segs: data.getLayout('linesPoints')
        });

        this._setCommon(lineEl, data); // Add back


        this.group.add(lineEl);
        this._incremental = null;
    };
    /**
     * @override
     */


    largeLineProto.incrementalPrepareUpdate = function (data) {
        this.group.removeAll();

        this._clearIncremental();

        if (data.count() > 5e5) {
            if (!this._incremental) {
                this._incremental = new IncrementalDisplayable({
                    silent: true
                });
            }

            this.group.add(this._incremental);
        } else {
            this._incremental = null;
        }
    };
    /**
     * @override
     */


    largeLineProto.incrementalUpdate = function (taskParams, data) {
        var lineEl = new LargeLineShape();
        lineEl.setShape({
            segs: data.getLayout('linesPoints')
        });

        this._setCommon(lineEl, data, !!this._incremental);

        if (!this._incremental) {
            lineEl.rectHover = true;
            lineEl.cursor = 'default';
            lineEl.__startIndex = taskParams.start;
            this.group.add(lineEl);
        } else {
            this._incremental.addDisplayable(lineEl, true);
        }
    };
    /**
     * @override
     */


    largeLineProto.remove = function () {
        this._clearIncremental();

        this._incremental = null;
        this.group.removeAll();
    };

    largeLineProto._setCommon = function (lineEl, data, isIncremental) {
        var hostModel = data.hostModel;
        lineEl.setShape({
            polyline: hostModel.get('polyline'),
            curveness: hostModel.get('lineStyle.curveness')
        });
        lineEl.useStyle(hostModel.getModel('lineStyle').getLineStyle());
        lineEl.style.strokeNoScale = true;
        var visualColor = data.getVisual('color');

        if (visualColor) {
            lineEl.setStyle('stroke', visualColor);
        }

        lineEl.setStyle('fill');

        if (!isIncremental) {
            // Enable tooltip
            // PENDING May have performance issue when path is extremely large
            lineEl.seriesIndex = hostModel.seriesIndex;
            lineEl.on('mousemove', function (e) {
                lineEl.dataIndex = null;
                var dataIndex = lineEl.findDataIndex(e.offsetX, e.offsetY);

                if (dataIndex > 0) {
                    // Provide dataIndex for tooltip
                    lineEl.dataIndex = dataIndex + lineEl.__startIndex;
                }
            });
        }
    };

    largeLineProto._clearIncremental = function () {
        var incremental = this._incremental;

        if (incremental) {
            incremental.clearDisplaybles();
        }
    };

    

    hwchart.chart.helper.LargeLineDraw= LargeLineDraw;
})