Vmd.define('hwchart.chart.wellLogging.track.CurveLayout', {
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
            if(min < data[mid][1] && min >= data[mid - 1][1]) {
                startIndex = mid - 1;
                break;
            }
            if(min < data[mid][1]) {
                rightIndex = mid;
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

        return result;
    }

    hwchart.chart.wellLogging.track.CurveLayout = {
        type: 'curve',
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

            var lineData = [];
            var mirrorData = [];

            var invert = leftScale > rightScale; //是否反转坐标，如果左刻度大于右刻度，则反转坐标
            var dataCount = data.length;
            var offset = 0;
            var lenPos = 0; //数组中标识线段点数量的位置
            var x;
            var y;

            if(secondScale > 0 && secondScale < 11) {
                var nextPoint = null; //下一个点
                lenPos = offset++;

                for(var i = 0; i < dataCount; i++) {
                    x = nextPoint ? nextPoint[0] : xAxis.dataToCoord(data[i][0]);
                    y = nextPoint ? nextPoint[1] : yAxis.dataToCoord(data[i][1]);

                    if(x >  (left + width)) {
                        x = (left + width) + (x - (left + width)) / secondScale;
                    }
                    else if(x < left) {
                        x = (left + 0) + (x - (left + 0)) / secondScale;
                    }
                    var xDomain = Math.floor((x - left) / width); //当前点所在的区域
                    lineData[lenPos] = lineData[lenPos] || 0;

                    lineData[lenPos]++;
                    lineData[offset++] = invert ? (left + right - (x - xDomain * width)) : (x - xDomain * width);
                    lineData[offset++] = y;

                    nextPoint = data[i + 1] && [xAxis.dataToCoord(data[i + 1][0]), yAxis.dataToCoord(data[i + 1][1])];
                    if(nextPoint) {
                        var nextX = nextPoint[0];
                        var nextY = nextPoint[1];
                        if(nextX >  (left + width)) {
                            nextX = (left + width) + (nextX  - (left + width)) / secondScale;
                        }
                        else if(nextX < left){
                            nextX = (left + 0) + (nextX - (left + 0)) / secondScale;
                        }
                        var nextDomain = Math.floor((nextX - left) / width);
                        var insertNum = Math.abs(nextDomain - xDomain);
                        var flag = nextDomain - xDomain > 0 ? 1 : 0;

                        for(var n = 0; n < insertNum; n++) {
                            var x0 = left + (xDomain + n + flag) * width;
                            var y0 = y + (x0 - x) * (nextY - y) / (nextX - x);

                            lineData[lenPos]++;
                            lineData[offset++] = invert ? (left + right - (left + flag * width)) : (left + flag * width);
                            lineData[offset++] = y0;

                            lenPos = offset++;
                            lineData[lenPos] = 1;
                            lineData[offset++] = invert ? (left + right - (left + Math.abs(flag - 1) * width)) : (left + Math.abs(flag - 1) * width);
                            lineData[offset++] = y0;
                        }
                    }
                }
            }
            else {
                lineData[offset++] = dataCount;
                mirror && (lineData[(dataCount << 1) + 1] = dataCount);
                for(var i =0; i < dataCount; i++) {
                    x = xAxis.dataToCoord(data[i][0]);
                    y = yAxis.dataToCoord(data[i][1]);

                    lineData[offset++] = invert ? (left + right - x) : x;
                    mirror && (lineData[offset + (dataCount << 1)] = invert ? x : (left + right - x));
                    lineData[offset++] = y;
                    mirror && (lineData[offset + (dataCount << 1)] = y);
                }
            }

            //曲线填充数据
            var regionCurveFilledData = [];
            var regionCurveFilleds = nodeModel.get('regionCurveFilled');
            zrUtil.each(regionCurveFilleds,function(regionCurveFilled){
                var curveFilled = {};
                curveFilled.name = regionCurveFilled.name||"";
                curveFilled.data = zrUtil.clone(lineData);
                if(regionCurveFilled.fillTo=="left"){
                    curveFilled.data.push([0,height]);
                    curveFilled.data.push([0,0]);
                }else if(regionCurveFilled.fillTo=="right"){
                    curveFilled.data.push([width,height]);
                    curveFilled.data.push([width,0]);
                }
                else if(regionCurveFilled.fillTo){
                    var lineName = regionCurveFilled.fillTo;
                    var sameChildrens = treeNode.parentNode.children;
                    for(var j = 0;j < sameChildrens.length;j++){
                        if(lineName === sameChildrens[j].name){
                            samechildren = sameChildrens[j];
                            if(samechildren.name === treeNode.name){
                                curveFilled.data = curveFilled.data.concat(mirrorData.reverse());
                            }else{
                                curveFilled.fillTo = samechildren;
                                curveFilled._invalid = true;
                            }
                            break;
                        }
                    }
                }
                //填充样式
                var fillStyle = regionCurveFilled.fillStyle;
                if(fillStyle.constructor==String){
                    curveFilled.fillStyle = {
                        fill: fillStyle
                    };
                }else{
                    var myImage = new Image();
                    var fillName = fillStyle.fillName||"空心";
                    myImage.src = '../images/lith/'+fillName+".bmp";
                    curveFilled.fillStyle = {
                        fill:{
                            image: myImage,
                            repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                        }
                    }
                }
                regionCurveFilledData.push(curveFilled);
            });

            return {lineData:lineData, mirrorData:mirrorData, regionCurveFilledData:regionCurveFilledData};
        }
    };
})