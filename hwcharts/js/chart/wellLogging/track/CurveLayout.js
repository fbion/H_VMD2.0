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
        if(data.length == 0 || (min <= data[0][1] && max >= data[data.length - 1][1])){
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
            if(min < data[mid][1] && min >= data[mid - 1][1]){
                startIndex = mid - 1;
                break;
            }
            if(min < data[mid][1]){
                rightIndex = mid;
            }
            if(min > data[mid][1] && min < data[mid + 1][1]){
                startIndex = mid;
                break;
            }
            if(min > data[mid][1]){
                leftIndex = mid;
            }
        }

        for(var i = startIndex; i < data.length; i++){
            result.push(data[i]);
            if(data[i][1] > max) break;
        }

        return result;
    }

    hwchart.chart.wellLogging.track.CurveLayout = {
        type: 'curve',
        reset: function (treeNode) {
            var nodeModel = treeNode.getModel();

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

            var lineData =[];
            var mirrorData = [];

            var dataCount = data.length;
            var lineData1 = new Float32Array(mirror ? ((dataCount << 2) + 2) : ((dataCount << 1) + 1));
            var offset = 0;
            var x;
            var y;

            if(leftScale>rightScale)
            {
                if(secondScale>0&&secondScale<11){
                    var step = right -left;
                    var tempX,tempY,tempX2,a,b,c;
                    for(var i =0;i<data.length;i++){
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
                            a = (left - x)/(step*secondScale);
                            c = (left - tempX)/(step*secondScale);
                            b = a - parseInt(a);
                            tempX2 = step*(1-b)+left;
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
                            a = (x-right)/(step*secondScale);
                            c = (tempX-right)/(step*secondScale);
                            b = a - parseInt(a);
                            tempX2 = step*b+left;
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
                    var step = right -left;
                    var tempX,tempY,tempX2,a,b,c;
                    for(var i =0;i<data.length;i++){
                        x = xAxis.dataToCoord(data[i][0]);
                        y = yAxis.dataToCoord(data[i][1]);
                        if(x<left){
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
                            a = (left - x)/(step*secondScale);
                            c = (left - tempX)/(step*secondScale);
                            b = a - parseInt(a);
                            tempX2 = step*(1-b)+left;
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
                            a = (x-right)/(step*secondScale);
                            c = (tempX-right)/(step*secondScale);
                            b = a - parseInt(a);
                            tempX2 = step*b+left;
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
                }else{
                    lineData1[offset++] = dataCount;
                    mirror && (lineData1[dataCount * 2 + 1] = dataCount);
                    for(var i =0; i < data.length; i++) {
                        x = xAxis.dataToCoord(data[i][0]);
                        y = yAxis.dataToCoord(data[i][1]);

                        lineData1[offset++] = left + x;
                        mirror && (lineData1[offset + dataCount * 2] = left + right- x);
                        lineData1[offset++] = y;
                        lineData1[offset + dataCount * 2] = y;

                        lineData.push([left + right- x, y]);
                        mirrorData.push([left + x, y]);
                    }

                    for(var i =0;i<data.length;i++){
                        x = xAxis.dataToCoord(data[i][0]);
                        y = yAxis.dataToCoord(data[i][1]);

                        lineData.push([x, y]);
                        mirrorData.push([right-x,y]);
                    }
                }
            }

            //曲线填充数据
            var regionCurveFilledData = [];
            var regionCurveFilleds = nodeModel.get('regionCurveFilled');
            var nodeLayout = treeNode.getLayout();
            var bodyLayout = nodeLayout.body;
            var width = bodyLayout.width;
            var height = bodyLayout.height;
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

            return {lineData:lineData, lineData1: lineData1, mirrorData:mirrorData, regionCurveFilledData:regionCurveFilledData};
        }
    };
})