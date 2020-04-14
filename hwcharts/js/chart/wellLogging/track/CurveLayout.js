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
            result.push(data[i]);
            if(data[i][1] > max) break;
        }

        result = [
            [2.313,800.38],
            [2.595,800.505],
            [2.692,800.63],
            [2.791,800.755],
            [2.834,800.88],
            [2.916,801.005],
            [2.82,801.13],
            [2.726,801.255],
            [2.66,801.38],
            [2.526,801.505],
            [2.465,801.63],
            [2.338,801.755],
            [2.312,801.88],
            [2.255,802.005],
            [2.233,802.13],
            [2.181,802.255],
            [2.141,802.38],
            [2.119,802.505],
            [2.021,802.63],
            [2.018,802.755],
            [2.008,802.88],
            [2.031,803.005]];
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

            var dataCount = data.length;
            var lineData1 = new Float32Array(mirror ? ((dataCount << 2) + 2) : ((dataCount << 1) + 1));
            var offset = 0;
            var x;
            var y;

            var tempData = [];
            var offset = 1;
            var lenPos = 0;

            if(leftScale>rightScale)
            {
                if(secondScale>0&&secondScale<11){
                    var prePoint = null; //前一个点，逻辑点
                    var nextPoint = null; //下一个点
                    var tempX,tempY,tempX2,a,b,c;
                    for(var i =0;i<data.length - 1;i++){
                        x = nextPoint ? nextPoint[0] : xAxis.dataToCoord(data[i][0]);
                        y = nextPoint ? nextPoint[1] : yAxis.dataToCoord(data[i][1]);

                        nextPoint = data[i + 1] && [xAxis.dataToCoord(data[i + 1][0]), yAxis.dataToCoord(data[i + 1][1])];

                        var baseLeftN = parseInt((x - left) / width); //x距离左侧边距与宽度的倍数
                        var baseRightN = parseInt((x - right) / width); //x距离右侧边距与宽度的倍数

                        //两个点横坐标差值大于width，肯定在两个不同区域
                        if(nextPoint){
                            if(nextPoint[0] - x > width || nextPoint[0] - x < -width){

                            }
                            //差值小于等于width，可能在两个不同区域
                            else{

                                if(x > (right + baseRightN * width) && nextPoint[0] < (right + baseRightN * width)) {
                                    var x0 = right;
                                    var y0 = y + (right + baseRightN * width - x) * (nextPoint[1] - y) / (nextPoint[0] - x);

                                    tempData[lenPos] = tempData[lenPos] || 0;
                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - (x - (baseRightN + 1) * width);
                                    tempData[offset++] = y;

                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - (x0 - width);
                                    tempData[offset++] = y0;

                                    lenPos = offset++;
                                    tempData[lenPos] = 1;
                                    tempData[offset++] = left + right - x0;
                                    tempData[offset++] = y0;
                                }
                                else if(x > (right + baseRightN * width)){
                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - (x - (baseRightN + 1) * width);
                                    tempData[offset++] = y;
                                }
                                //在左侧边界线两边
                                else if(x > (left + baseLeftN * width) && nextPoint[0] < (left + baseLeftN * width)){
                                    var x0 = left;
                                    var y0 = y + (left + baseLeftN * width - x) * (nextPoint[1] - y) / (nextPoint[0] - x);

                                    tempData[lenPos] = tempData[lenPos] || 0;
                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - (x + baseLeftN * width);
                                    tempData[offset++] = y;

                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - x0;
                                    tempData[offset++] = y0;

                                    lenPos = offset++;
                                    tempData[lenPos] = 1;
                                    tempData[offset++] = left + right - (x0 + width);
                                    tempData[offset++] = y0;
                                }
                                else if(x < (left + baseLeftN * width) && nextPoint[0] > (left + baseLeftN * width)){
                                    var x0 = left;
                                    var y0 = y + (left + baseLeftN * width - x) * (nextPoint[1] - y) / (nextPoint[0] - x);
                                    tempData[lenPos] = tempData[lenPos] || 0;
                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - (x + (baseLeftN + 1) * width);
                                    tempData[offset++] = y;

                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - (x0 + width);
                                    tempData[offset++] = y0;

                                    lenPos = offset++;
                                    tempData[lenPos] = 1;
                                    tempData[offset++] = left + right - x0;
                                    tempData[offset++] = y0;
                                }
                                else if(x < (left + baseLeftN * width)){
                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - (x + (baseLeftN + 1) * width);
                                    tempData[offset++] = y;
                                }
                                //在右侧边界线两边
                                else if(x < (right + baseRightN * width) && nextPoint[0] > (right + baseRightN * width)) {
                                    var x0 = right;
                                    var y0 = y + (right + baseRightN * width - x) * (nextPoint[1] - y) / (nextPoint[0] - x);

                                    tempData[lenPos] = tempData[lenPos] || 0;
                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - (x - baseRightN * width);
                                    tempData[offset++] = y;

                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - x0;
                                    tempData[offset++] = y0;

                                    lenPos = offset++;
                                    tempData[lenPos] = 1;
                                    tempData[offset++] = left + right - (x0 - width);
                                    tempData[offset++] = y0;
                                }
                                else{
                                    tempData[lenPos]++;
                                    tempData[offset++] = left + right - x;
                                    tempData[offset++] = y;
                                }
                            }
                        }

                        x = right- xAxis.dataToCoord(data[i][0]);
                        y = yAxis.dataToCoord(data[i][1]);
                        if(x<left) {
                            tempX = right- xAxis.dataToCoord(data[i+1][0]);
                            if(i!=0 && i != data.length - 1){
                                tempX2 = right- xAxis.dataToCoord(data[i-1][0]);
                                if(tempX2>left){
                                    tempY = (y+yAxis.dataToCoord(data[i-1][1]))/2;
                                    lineData.push([left,tempY]);
                                    lineData.push([right,tempY,0]);
                                    mirrorData.push([right,tempY,0]);
                                    mirrorData.push([left,tempY]);
                                }
                            }
                            a = (left - x)/(width*secondScale);
                            c = (left - tempX)/(width*secondScale);
                            b = a - parseInt(a);
                            tempX2 = width*(1-b)+left;
                            lineData.push([tempX2, y]);
                            mirrorData.push([right - tempX2,y]);
                            if(tempX>left){
                                tempY = (y+yAxis.dataToCoord(data[i+1][1]))/2;
                                lineData.push([right,tempY]);
                                lineData.push([left,tempY,0]);
                                mirrorData.push([left,tempY,0]);
                                mirrorData.push([right,tempY]);
                            }
                        }else if(x>right){
                            tempX = right- xAxis.dataToCoord(data[i+1][0]);
                            if(i!=0){
                                tempX2 = right- xAxis.dataToCoord(data[i-1][0]);
                                if(tempX2<right){
                                    tempY = (y+yAxis.dataToCoord(data[i-1][1]))/2;
                                    lineData.push([right,tempY]);
                                    lineData.push([left,tempY,0]);
                                    mirrorData.push([left,tempY,0]);
                                    mirrorData.push([right,tempY]);
                                }
                            }
                            a = (x-right)/(width*secondScale);
                            c = (tempX-right)/(width*secondScale);
                            b = a - parseInt(a);
                            tempX2 = width*b+left;
                            lineData.push([tempX2, y]);
                            mirrorData.push([right - tempX2,y]);
                            if(tempX<right){
                                tempY = (y+yAxis.dataToCoord(data[i+1][1]))/2;
                                lineData.push([left,tempY]);
                                lineData.push([right,tempY,0]);
                                mirrorData.push([right,tempY,0]);
                                mirrorData.push([left,tempY]);
                            }
                        }
                        else{
                            lineData.push([x, y]);
                            mirrorData.push([right-x,y]);
                        }

                    }
                } else {
                    lineData1[offset++] = dataCount;
                    mirror && (lineData1[(dataCount << 1) + 1] = dataCount);
                    for(var i =0; i < data.length; i++) {
                        x = xAxis.dataToCoord(data[i][0]);
                        y = yAxis.dataToCoord(data[i][1]);

                        lineData1[offset++] = left + right- x;
                        mirror && (lineData1[offset + (dataCount << 1)] = left + x);
                        lineData1[offset++] = y;
                        mirror && (lineData1[offset + (dataCount << 1)] = y);

                        lineData.push([left + right- x, y]);
                        mirrorData.push([left + x, y]);
                    }
                }
            }else{
                if(secondScale>0&&secondScale<11){
                    var prePoint = null; //前一个点，逻辑点
                    var nextPoint = null; //下一个点

                    var tempX,tempY,tempX2,a,b,c;
                    for(var i = 0;i < data.length - 1; i++) {
                        x = nextPoint ? nextPoint[0] : xAxis.dataToCoord(data[i][0]);
                        y = nextPoint ? nextPoint[1] : yAxis.dataToCoord(data[i][1]);

                        nextPoint = data[i + 1] && [xAxis.dataToCoord(data[i + 1][0]), yAxis.dataToCoord(data[i + 1][1])];

                        //两个点横坐标差值大于width，肯定在两个不同区域
                        if(nextPoint){
                            var xDomain = Math.floor((x - left) / width); //当前点所在的区域
                            var nextDomain = Math.floor((nextPoint[0] - left) / width);

                            //同一区域
                            if(nextDomain - xDomain == 0) {
                                tempData[lenPos] = tempData[lenPos] || 0;
                                tempData[offset++] = x - xDomain * width;
                                tempData[offset++] = y;
                            }
                            else if(nextDomain - xDomain == 1) {
                                var x0 = left + (xDomain + 1) * width;
                                var y0 = y + (x0 - x) * (nextPoint[1] - y) / (nextPoint[0] - x);

                                tempData[lenPos] = tempData[lenPos] || 0;
                                tempData[lenPos]++;
                                tempData[offset++] = x - xDomain * width;
                                tempData[offset++] = y;

                                tempData[lenPos]++;
                                tempData[offset++] = left + width;
                                tempData[offset++] = y0;

                                lenPos = offset++;
                                tempData[lenPos] = 1;
                                tempData[offset++] = left;
                                tempData[offset++] = y0;

                            }
                            else if(nextDomain - xDomain == -1){
                                var x0 = left + xDomain * width;
                                var y0 = y + (x0 - x) * (nextPoint[1] - y) / (nextPoint[0] - x);

                                tempData[lenPos] = tempData[lenPos] || 0;
                                tempData[lenPos]++;
                                tempData[offset++] = x - xDomain * width;
                                tempData[offset++] = y;

                                tempData[lenPos]++;
                                tempData[offset++] = left;
                                tempData[offset++] = y0;

                                lenPos = offset++;
                                tempData[lenPos] = 1;
                                tempData[offset++] = left + width;
                                tempData[offset++] = y0;
                            }
                        }


                        if(x < left) {
                            tempX = xAxis.dataToCoord(data[i+1][0]);
                            if(i!=0){
                                tempX2 = xAxis.dataToCoord(data[i-1][0]);
                                if(tempX2>left){
                                    tempY = (y+yAxis.dataToCoord(data[i-1][1]))/2;
                                    lineData.push([left,tempY]);
                                    lineData.push([right,tempY,0]);
                                    mirrorData.push([right,tempY,0]);
                                    mirrorData.push([left,tempY]);
                                }
                            }
                            a = (left - x)/(width*secondScale);
                            c = (left - tempX)/(width*secondScale);
                            b = a - parseInt(a);
                            tempX2 = width*(1-b)+left;
                            lineData.push([tempX2, y]);
                            mirrorData.push([right - tempX2,y]);
                            if(tempX>left){
                                tempY = (y+yAxis.dataToCoord(data[i+1][1]))/2;
                                lineData.push([right,tempY]);
                                lineData.push([left,tempY,0]);
                                mirrorData.push([left,tempY,0]);
                                mirrorData.push([right,tempY]);
                            }
                        }
                        else if(x > right) {
                            tempX = xAxis.dataToCoord(data[i+1][0]);
                            if(i!=0){
                                tempX2 = xAxis.dataToCoord(data[i-1][0]);
                                if(tempX2<right){
                                    tempY = (y+yAxis.dataToCoord(data[i-1][1]))/2;

                                    lineData.push([right,tempY]);
                                    lineData.push([left,tempY,0]);
                                    mirrorData.push([left,tempY,0]);
                                    mirrorData.push([right,tempY]);
                                }
                            }
                            a = (x-right)/(width*secondScale);
                            c = (tempX-right)/(width*secondScale);
                            b = a - parseInt(a);
                            tempX2 = width*b+left;
                            lineData.push([tempX2, y]);
                            mirrorData.push([right - tempX2,y]);
                            if(tempX<right){
                                tempY = (y+yAxis.dataToCoord(data[i+1][1]))/2;
                                lineData.push([left,tempY]);
                                lineData.push([right,tempY,0]);
                                // mirrorData.push([right,tempY,0]);
                                // mirrorData.push([left,tempY]);
                            }
                        }
                        else{
                            lineData.push([x, y]);
                            // mirrorData.push([right-x,y]);
                        }
                        prePoint = [x, y];
                    }
                }else{
                    lineData1[offset++] = dataCount;
                    mirror && (lineData1[(dataCount << 1) + 1] = dataCount);
                    for(var i =0; i < data.length; i++) {
                        x = xAxis.dataToCoord(data[i][0]);
                        y = yAxis.dataToCoord(data[i][1]);

                        lineData1[offset++] = left + x;
                        mirror && (lineData1[offset + (dataCount << 1)] = left + right- x);
                        lineData1[offset++] = y;
                        mirror && (lineData1[offset + (dataCount << 1)] = y);

                        lineData.push([left + right- x, y]);
                        mirrorData.push([left + x, y]);
                    }
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

            return {lineData:lineData, lineData1: lineData1,tempData: tempData, mirrorData:mirrorData, regionCurveFilledData:regionCurveFilledData};
        }
    };
})