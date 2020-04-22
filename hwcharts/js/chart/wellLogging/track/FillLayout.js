Vmd.define('hwchart.chart.wellLogging.track.FillLayout', {
    requires: []
}, function () {
    var zrUtil = zrender.util;

    /**
     * 过滤min-max之外的数据
     * @param data
     * @param min
     * @param max
     * @returns {[]|*}
     */
    function filterDataByAxis(data, min, max){
        if(data.length == 0 || (min <= data[0][1] && max >= data[data.length - 1][1])) {
            return data;
        }

        var result = [];
        var leftIndex = 0;
        var rightIndex = data.length - 1;
        var startIndex = 0;

        //二分法寻值
        while (leftIndex < rightIndex) {
            var mid = leftIndex + ((rightIndex - leftIndex) >> 1);
            if(min == data[mid][1]) {
                startIndex = mid;
                break;
            }
            if(mid == 0) {
                break;
            }
            if(min < data[mid][1] && min >= data[mid - 1][1]) {
                startIndex = mid - 1;
                break;
            }
            if(min < data[mid][1]) {
                rightIndex = mid;
            }
            if(mid == data.length - 1){
                break;
            }
            if(min > data[mid][1] && min < data[mid + 1][1]) {
                startIndex = mid;
                break;
            }
            if(min > data[mid][1]) {
                leftIndex = mid;
            }
        }

        for(var i = startIndex; i < data.length; i++) {
            var x = data[i][0];
            var y = data[i][1];

            if(y < min && data[i + 1] && data[i + 1][1] >= min) {
                x = x + (min - y) * (data[i + 1][0] - x) / (data[i + 1][1] - y);
                y = min;
            }
            else if(y < min) {
                continue;
            }
            else if(y > max && data[i - 1] && data[i - 1][1] <= max) {
                x = data[i - 1][0] + (max - data[i - 1][1]) * (x - data[i - 1][0]) / (y - data[i - 1][1]);
                y = max;
            }
            else if(y > max) {
                break;
            }
            result.push([x, y]);
        }

        // result = [
        //     [320.666, 800],
        //     [430.242, 801.005],
        //     [540.581, 801.53],
        //     [342.947, 801.855],
        //     [332.92, 802.38]
        // ]
        return result;
    };

    /**
     * 连接两条线段
     * @param origin 原始数组
     * @param append 追加的数组
     */
    function concatData(origin, append) {
        if(!origin){
            return [];
        }
        if(!append || append.length == 0){
            return [].concat(origin);
        }
        var appendNum = append.length >> 1; //追加点的数量
        var result = [].concat(origin);
        var offset = 0;
        var nextOffset;

        //找到标记最后一条线段点数的位置
        while((nextOffset = offset + (result[offset] << 1) + 1) < result.length) {
            offset = nextOffset;
        }
        result[offset] += appendNum;
        return result.concat(append);
    };

    hwchart.chart.wellLogging.track.FillLayout = {
        type: 'fill',
        reset: function (treeNode) {
            var nodeModel = treeNode.getModel();

            var nodeLayout = treeNode.getLayout();
            var bodyLayout = nodeLayout.body;
            var width = bodyLayout.width;
            var height = bodyLayout.height;

            var xAxis = nodeModel.coordinateSystem.getAxis('x');
            var yAxis = nodeModel.coordinateSystem.getAxis('y');

            var yAxisScaleExtent = yAxis.scale.getExtent();

            var data = filterDataByAxis(nodeModel.get('data'), yAxisScaleExtent[0], yAxisScaleExtent[1]);

            var xAxisExtent = xAxis.getExtent();
            var left = xAxisExtent[0];
            var right = xAxisExtent[1];

            var mirror = nodeModel.get('mirror');
            var leftScale = nodeModel.get('leftScale');
            var rightScale = nodeModel.get('rightScale');
            var secondScale = nodeModel.get('secondScale');

            var invert = leftScale > rightScale; //是否反转坐标，如果左刻度大于右刻度，则反转坐标
            var dataCount = data.length;
            var offset = 0;
            var x;
            var y;

            var lineData = [];
            var mirrorData = [];
            var originData = []; //原始映射数据
            dataCount > 0 && (originData[offset] = dataCount);

            //第二比例只能是1-10的整数
            if(/^(10|[1-9])$/.test(secondScale)) {
                var nextPoint = null; //下一个点
                var lenPos = offset++; //数组中标识线段点数量的位置

                for(var i = 0; i < dataCount; i++) {
                    x = nextPoint ? nextPoint[0] : xAxis.dataToCoord(data[i][0]);
                    y = nextPoint ? nextPoint[1] : yAxis.dataToCoord(data[i][1]);

                    originData[(i << 1) + 1] = x;
                    originData[(i << 1) + 2] = y;

                    //超出显示区域根据第二比例进行压缩
                    var scaleRatio = (x >= left && x <= (left + width)) ? 1 : secondScale; //第二比例系数
                    var widthRatio = x < left ? 0 : width;
                    x = (left + widthRatio) + (x - (left + widthRatio)) / scaleRatio;

                    var xDomain = Math.floor((x - left) / width); //当前点所在的区域
                    var mapX = x - xDomain * width; //映射到left和left+width之间的点
                    lineData[lenPos] = lineData[lenPos] || 0;

                    if(mirror) {
                        mirrorData[offset - 1] = y;
                        mirrorData[offset] = invert ? mapX : (left + right - mapX);
                    }

                    lineData[lenPos]++;
                    lineData[offset++] = invert ? (left + right - mapX) : mapX;
                    lineData[offset++] = y;

                    nextPoint = data[i + 1] && [xAxis.dataToCoord(data[i + 1][0]), yAxis.dataToCoord(data[i + 1][1])];
                    if(nextPoint) {
                        var nextX = nextPoint[0];
                        var nextY = nextPoint[1];

                        scaleRatio = (nextX >= left && nextX <= (left + width)) ? 1 : secondScale; //第二比例系数
                        widthRatio = nextX < left ? 0 : width;
                        nextX = (left + widthRatio) + (nextX - (left + widthRatio)) / scaleRatio;

                        var nextDomain = Math.floor((nextX - left) / width);
                        var insertNum = Math.abs(nextDomain - xDomain);
                        var flag = nextDomain - xDomain > 0 ? 1 : 0;

                        for(var n = 0; n < insertNum; n++) {
                            lineData[lenPos]++;
                            var x0 = left + (xDomain + n + flag) * width;
                            var y0 = y + (x0 - x) * (nextY - y) / (nextX - x);

                            var mapCrossL = left + flag * width;//右侧交点
                            var mapCrossR = left + Math.abs(flag - 1) * width; //右侧交点


                            if(mirror) {
                                mirrorData[offset - 1] = y0;
                                mirrorData[offset] = invert ? mapCrossL : (left + right - mapCrossL);
                                mirrorData[offset + 1] = lineData[lenPos];

                                mirrorData[offset + 2] = y0;
                                mirrorData[offset + 3] = invert ? mapCrossR : (left + right - mapCrossR);
                            }

                            lineData[offset++] = invert ? (left + right - mapCrossL) : mapCrossL;
                            lineData[offset++] = y0;

                            lenPos = offset++;
                            lineData[lenPos] = 1;
                            lineData[offset++] = invert ? (left + right - mapCrossR) : mapCrossR;
                            lineData[offset++] = y0;
                        }
                    }
                }

                mirror && lineData[lenPos] && (mirrorData[offset - 1] = lineData[lenPos]);
            }
            else {
                dataCount > 0 && (lineData[offset++] = dataCount);
                for(var i =0; i < dataCount; i++) {
                    x = xAxis.dataToCoord(data[i][0]);
                    y = yAxis.dataToCoord(data[i][1]);

                    originData[offset] = x;
                    originData[offset + 1] = y;

                    if(mirror) {
                        mirrorData[offset - 1] = y;
                        mirrorData[offset] = invert ? x : (left + right - x);
                    }

                    lineData[offset++] = invert ? (left + right - x) : x;
                    lineData[offset++] = y;
                }
                mirror && dataCount && (mirrorData[offset - 1] = dataCount);
            }

            mirrorData.reverse();

            var curveFills = nodeModel.get('curveFills') || [];
            zrUtil.each(curveFills, function(curveFill) {
                if(originData.length == 0){
                    return;
                }

                var fillData;
                var firstPointY = originData[2];
                var lastPointY = originData[originData.length - 1];

                switch (curveFill.fillTo) {
                    case "left":
                        curveFill.data = concatData(originData, [left, lastPointY, left, firstPointY]);
                        break;
                    case "right":
                        curveFill.data = concatData(originData, [left + width, lastPointY, left + width, firstPointY]);
                        break;
                    default:
                        break;
                }
            });

            return {
                lineData: lineData.concat(mirrorData),
                curveFills: curveFills
            };
        }
    };
})