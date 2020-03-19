
//var groupAlgorithm = require("WellGroupAlgorithm");
Vmd.define('hwchart.chart.helper.WellGroupDraw', {
    requires: [
        'hwchart.util.graphic'
    ]
}, function () {

    var graphic = hwchart.util.graphic;

    /**
     * @constructor
     * @alias module:echarts/chart/helper/SymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function WellGroupDraw(ctor, ecModel, api) {

        var self = this;
        this._ctor = ctor;
        this.group = new graphic.Group();
        this._ecModel = ecModel;

        //// 井组选中
        //api.on('click', function (e) {
        //    //var seriesModel = self._data.hostModel;
        //    //var allowSelect = seriesModel.get('allowSelect');
        //    //if (allowSelect === false) {
        //    //    return;
        //    //}
        //    //var seriesType = e.seriesType;
        //    //var target = e.event.target;
        //    //var event = e.event.event;
        //    //if (seriesType == "wellSymbol") {
        //    //    target = target._tag == 'name' ? target : target.parent.parent;
        //    //}
        //    //var targetSeriesIndex = target.parent.seriesIndex;
        //    //if (e.componentType == "series" && targetSeriesIndex === seriesModel.seriesIndex) {
        //    //    //已经被选中
        //    //    var dataIndex = target.parent.dataIndex;
        //    //    if (zrUtil.indexOf(self.selectIndexs, dataIndex) != -1) {
        //    //        self._clearSelect(
        //    //            zrUtil.filter(self.selectIndexs, function (item) {
        //    //                return item != dataIndex;
        //    //            })
        //    //        );
        //    //        if (zrUtil.indexOf(self.selectSubIndexs, dataIndex) == -1) {
        //    //            self.selectSubIndexs.push(dataIndex);
        //    //        };
        //    //        self._selectSub(target);
        //    //        return;
        //    //    }
        //    //    self._clearSelect(event.ctrlKey ? self.selectSubIndexs : null);
        //    //    self.selectSubIndexs = [];
        //    //    self._createSelect(dataIndex);
        //    //}
        //    //else {
        //    //    self._clearSelect();
        //    //}
        //})

        //// 井组监听圈选、框选事件
        //api.on('brushSelected', function (params, ecModel) {
        //    var seriesModel = self._data.hostModel;

        //    var selectedSeries = params.batch[0].selected;
        //    var arrGroup = [];
        //    var arrWell = [];
        //    if (selectedSeries.length <= 0)
        //    {
        //        return;
        //    }
        //    if (isEmpty(self._wellDatas)) {
        //        return;
        //    }
        //    for (var i = 0; i < selectedSeries.length; i++)
        //    {
        //        if (selectedSeries[i].seriesName == "油井井位" || selectedSeries[i].seriesName == "水井井位")
        //            //if (selectedSeries[i].seriesType == "wellSymbol")
        //        {
        //            for (var j = 0; j < selectedSeries[i].dataIndex.length; j++) {
        //                var nIndex = selectedSeries[i].dataIndex[j];
        //                var seriesName = selectedSeries[i].seriesName;
        //                for (var k = 0; k < self._wellDatas.length; k++) {
        //                    if (self._wellDatas[k].hostModel.name == seriesName) {
        //                        var wellIdList = self._wellDatas[k]._idList;
        //                        if (nIndex < wellIdList.length) {
        //                            arrWell.push(wellIdList[nIndex]);
        //                            break;
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    // 小于3口井，无法构成井组
        //    if (arrWell.length < 3)
        //    {
        //        return;
        //    }

        //    // 将圈选选中的井组添加到序列中
        //    var groupCnt = seriesModel.option.data.length;

        //    var groupId = guid();
        //    var groupName = "group" + (groupCnt + 1).toString();
        //    // 向data中添加新选择的数据
        //    var groupTmp = {
        //        id: groupId,
        //        name: groupName,
        //        type: 0,
        //        wells: arrWell,
        //    }
        //    seriesModel.option.data.push(groupTmp);

        //    // 重画
        //    var data = seriesModel.getInitialData(seriesModel.option, self.ecModel);
        //    self.updateData(self._ecModel, data);
            
        //    //self.updateLayout(seriesModel, self._ecModel, api);
        //    // ----------------------------------------------------
        //    // 将获取到的井组数据通过事件发送到外部
        //    // ----------------------------------------------------
        //    api.dispatchAction({
        //        type: 'fetchWellGroupData',
        //        id: seriesModel.id,
        //        mainType: seriesModel.mainType,
        //        name: seriesModel.name,
        //        seriesIndex: seriesModel.seriesIndex,
        //        subType: seriesModel.subType,
        //        params: groupTmp
        //    });
        //});
    }

    var wellGroupDrawProto = WellGroupDraw.prototype;

    //function symbolNeedsDraw(data, point, idx, isIgnore) {
    //    // var point = data.getItemLayout(idx);
    //    // Is an object
    //    // if (point && point.hasOwnProperty('point')) {
    //    //     point = point.point;
    //    // }
    //    return point && !isNaN(point[0]) && !isNaN(point[1]) && !(isIgnore && isIgnore(idx))
    //                && data.getItemVisual(idx, 'symbol') !== 'none';
    //}

    // 20191126:获取井圈数据（坐标）
    wellGroupDrawProto.getWellDatas = function (ecModel) {
        var wellDatas = [];
        ecModel.eachSeries(function (seriesModel) {
            if (seriesModel.subType == 'wellSymbol' && seriesModel.getData()._nameList.length > 0) {
                wellDatas.push(seriesModel.getData());
            }
        }, this);
        return wellDatas;
    }

    //// 20191126:获取井圈数据（坐标）
    //wellGroupDrawProto.getWellIdByIndex = function (ecModel, selectedSeries) {
    //    var arrWellId = [];
    //    for (var i = 0; i < selectedSeries.length; i++)
    //    {
    //        if (selectedSeries[i].seriesType == 'wellSymbol')
    //        {
    //            ecModel.option.series;

    //            selectedSeries[i].seriesName;
    //            ecModel.eachSeries(function (seriesModel) {
    //                if (seriesModel.subType == 'wellSymbol' && seriesModel.getData()._nameList.length > 0) {
    //                    wellDatas.push(seriesModel.getData());
    //                }
    //            }, this);
    //        }
    //    }
    //    return arrWellId;
    //}

    wellGroupDrawProto.getItemlayout = function (id) {
        for (var i = 0; i < this._wellDatas.length; i++) {
            var wellIdList = this._wellDatas[i]._idList;
            if (wellIdList.indexOf(id) != -1) {
                return this._wellDatas[i].getItemLayout(wellIdList.indexOf(id));
            }
        }
        return null;
    };

    wellGroupDrawProto.getRawDataItem = function (id) {
        for (var i = 0; i < this._wellDatas.length; i++) {
            var wellIdList = this._wellDatas[i]._idList;
            if (wellIdList.indexOf(id) != -1) {
                return this._wellDatas[i].getRawDataItem(wellIdList.indexOf(id));
            }
        }
        return null;
    }

    wellGroupDrawProto.getItemSymbolSize = function (id) {
        for (var i = 0; i < this._wellDatas.length; i++) {
            var wellIdList = this._wellDatas[i]._idList;
            if (wellIdList.indexOf(id) != -1) {
                return this._wellDatas[i].getItemVisual(wellIdList.indexOf(id), 'symbolSize', false) || 0;
            }
        }
        return null;
    };

    wellGroupDrawProto.resetData = function (data) {
        var self = this;
        data.each(function (idx) {
            var groupPts = [];
            var rawDataItem = data.getRawDataItem(idx);
            for (var i = 0; i < rawDataItem.wells.length; i++) {
                // 20191126:根据井的ID获取了对应井的坐标点
                var point = self.getItemlayout(rawDataItem.wells[i]);
                if (point) {
                    groupPts.push(point);
                }
            }
            data.setItemLayout(idx, groupPts);
        });
    };
    /**
     * Update symbols draw by new data
     * @param {module:echarts/data/List} data
     * @param {Array.<boolean>} [isIgnore]
     */
    wellGroupDrawProto.updateData = function (ecModel, data) {
        var self = this;
        var group = this.group;
        var seriesModel = data.hostModel;
        var oldData = this._data;
        var LineCtor = this._ctor;

        var seriesScope = {
            itemStyle: seriesModel.getModel('itemStyle.normal').getItemStyle(['color']),
            hoverItemStyle: seriesModel.getModel('itemStyle.emphasis').getItemStyle(),
            symbolRotate: seriesModel.get('symbolRotate'),
            symbolOffset: seriesModel.get('symbolOffset'),
            hoverAnimation: seriesModel.get('hoverAnimation'),

            labelModel: seriesModel.getModel('label.normal'),
            hoverLabelModel: seriesModel.getModel('label.emphasis')
        };

        if (isEmpty(data) || data._rawData.length <= 0)
        {
            return;
        }

        // 20191126：获取井圈数据（坐标）
        this._wellDatas = this.getWellDatas(ecModel);

        //井口序列没有数据不渲染井组
        if (typeof (this._wellDatas) == "undefined" || this._wellDatas.length <= 0) {
            return;
        }

        this.WellSort(data);
        this.resetData(data);

        // data是Label的数据
        data.diff(oldData)
            .add(function (idx) {
                //if (!lineNeedsDraw(data.getItemLayout(idx))) {
                //    return;
                //}
                //debugger
                var lineGroup = new LineCtor(data, idx, seriesScope);
                data.setItemGraphicEl(idx, lineGroup);
                // 设置井组名称
                lineGroup.childAt(0).setStyle({
                    text: data._rawData._data[0].name
                })
                group.add(lineGroup);
            })
            .update(function (newIdx, oldIdx) {
                var lineGroup = oldData.getItemGraphicEl(oldIdx);

                //debugger
                if (!lineGroup) {
                    lineGroup = new LineCtor(data, newIdx, seriesScope);
                }
                else {
                    lineGroup.updateData(data, newIdx, seriesScope);
                }

                data.setItemGraphicEl(newIdx, lineGroup);
                // 设置井组名称
                lineGroup.childAt(0).setStyle({
                    text: data._rawData._data[0].name
                })

                group.add(lineGroup);

                //var rtTmp = new graphic.Rect({
                //    draggable:true,
                //    shape: {
                //        x: 100,
                //        y: 100,
                //        width: 100,
                //        height: 100
                //    },
                //    style: {
                //        stroke: '#000',
                //        fill: "#f00"
                //    }
                //});

                //group.add(rtTmp);
            })
            .remove(function (idx) {
                group.remove(oldData.getItemGraphicEl(idx));
            })
            .execute();


        this._data = data;
    };

    wellGroupDrawProto.WellSort = function (groupData) {
        var self = this;

        // ------------------------------------------------------
        //for (var i = 0; i < groupData._rawData.length; i++) {
        //    var wellIdTmp = groupData._rawData[i].wells[1];
        //    groupData._rawData[i].wells[1] = groupData._rawData[i].wells[2];
        //    groupData._rawData[i].wells[2] = wellIdTmp;
        //}
        // ------------------------------------------------------


        if (typeof (this._wellDatas) == "undefined" || this._wellDatas.length <= 0
            || typeof (groupData) == "undefined" || groupData.length <= 0) {

            return;
        }
        //for (var i = 0; i < groupData._rawData.length; i++) {
        //    var arrGroupSort = [];
        //    for (var j = 0; j < groupData._rawData[i].wells.length; j++) {
        //        // 20191126:根据井组数据中井的ID获取了对应井的坐标点
        //        var rawData = self.getRawDataItem(groupData._rawData[i].wells[j]);
        //        //var point = self.getItemlayout(groupData._rawData[i].wells[j]);
        //        if (!isEmpty(rawData)) {
        //            arrGroupSort.push({
        //                "wellId": groupData._rawData[i].wells[j],        //                "coordX": rawData.value[0],        //                "coordY": rawData.value[1]
        //            });
        //        }
        //    }
        //    if (arrGroupSort.length <= 0) {
        //        return;
        //    }

        //    var arrGroupResult = [];
        //    arrGroupResult = sortWellGroup(arrGroupSort);
        //    //groupAlgorithm.sortWellGroup(arrGroupSort, arrGroupResult);

        //    // 排序完成后，修改原数据中井号的顺序        
        //    for (var k = 0; k < arrGroupResult.length; k++) {
        //        groupData._rawData[i].wells[k] = arrGroupResult[k].wellId;
        //    }
        //}
        for (var i = 0; i < groupData._rawData.length; i++) {
            var arrGroupSort = [];
            for (var j = 0; j < groupData._rawData[i].wells.length; j++) {
                // 20191126:根据井组数据中井的ID获取了对应井的坐标点
                var point = self.getItemlayout(groupData._rawData[i].wells[j]);
                if (!isEmpty(point)) {
                    arrGroupSort.push({
                        "wellId": groupData._rawData[i].wells[j],                        "coordX": point[0],                        "coordY": point[1]
                    });
                }
            }
            if (arrGroupSort.length <= 0) {
                return;
            }

            var arrGroupResult = [];
            arrGroupResult = sortWellGroup(arrGroupSort);
            //groupAlgorithm.sortWellGroup(arrGroupSort, arrGroupResult);

            // 排序完成后，修改原数据中井号的顺序        
            for (var k = 0; k < arrGroupResult.length; k++) {
                groupData._rawData[i].wells[k] = arrGroupResult[k].wellId;
            }
        }
    };

    wellGroupDrawProto.updateLayout = function (componentModel, ecModel, api, payload) {
        var dataTmp = this._data;
        if(!this._data) return;
        this.resetData(this._data);
        //this._data = dataTmp;
        //var lineData = this._data;

        //lineGroup.childAt(0).setStyle({
        //    text: data._rawData[0].name
        //})

        //group.add(lineGroup);
        // 计算逻辑坐标
        var geo = ecModel.getComponent('geo');
        var zoomFactor = geo.coordinateSystem._zoom;
        var fontSizeGroup = componentModel.get('fontSize') * zoomFactor * 0.3;
        if (fontSizeGroup > 12)
        {
            fontSizeGroup = 12;
        }

        this._data.eachItemGraphicEl(function (el, idx) {
            el.updateLayout(dataTmp, idx);
            el.childAt(0).setStyle({
                fontSize: fontSizeGroup
            })
        }, this);
    };

    wellGroupDrawProto.remove = function (enableAnimation) {
        var group = this.group;
        var data = this._data;
        if (data) {
            if (enableAnimation) {
                data.eachItemGraphicEl(function (el) {
                    //el.fadeOut(function () {
                        group.remove(el);
                    //});
                });
            }
            else {
                group.removeAll();
            }
        }
    };

    hwchart.chart.helper.WellGroupDraw = WellGroupDraw;
   
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 井组数据//{//    "vers": "1.0", // 版本号//    "groups": [//       {//           "name": "井组1"，//           "id": "井组1标识"，//    "lxlx": "0"， // 连线类型,0：井组连线；1：注采连线//    "wells": ["Gd010", "Gd012", "Gd011", "Gd013"],//"wells": [//    {//        "wellId":"Gd010",//        "coordX":20681250.10,//        "coordY":4200998.20//    },{//        "wellId":"Gd010",//        "coordX":20681250.10,//        "coordY":4200998.20//    },//]//}//]//}
/*
 * 获取传入的井组数据，解析数据
 * 根据井组查询井号的坐标（井号坐标到那儿取？？？），组织成 "coords": [[20681250.10, 4200998.20],[20681250.10, 4200998.20]...],
 * 根据坐标数组进行排序
 * 用实际坐标传入计算逻辑位置
 * 封装井组组件：绘制井组多边形，并填充颜色，显示对应文本？？？
*/


/*
 * 计算油水井组连线(计算油井连接顺序) 
 * 参数一arrGroup:就是那些油井散点，参数二arrGroupOrder:是计算结果，参数三waterWell:是井组的水井。
 *  struct Data
 * {
 * DOUBLE X;
 * DOUBLE Y;
 * DOUBLE Z;
 * CString Well;
 * var  mark;
 * };
*/

/*
 * arrGroup：传入的待排序数组
 * arrGroupOrder：排序后数组
*/
//BOOL CTxMap::CalcWellGroup(vector<Data> oilWell, vector<Data>& arrGroupOrder, Data waterWell)
function sortWellGroup(arrGroup) {

    var arrGroupOrder = [];
    // 井组数据    //arrGroup = [    //    {
    //        "wellId": "Gd010",    //        "coordX": 20681250.10,    //        "coordY": 4200998.20
    //    }, {
    //        "wellId": "Gd011",    //        "coordX": 20681260.10,    //        "coordY": 4200918.20
    //    }, {
    //        "wellId": "Gd012",    //        "coordX": 20681270.10,    //        "coordY": 4200928.20
    //    }    //];

    if (arrGroup.length < 2)
        return false;

    if (arrGroup.length < 3)  // 小于三个点，不用计算了，连接就是。
    {
        arrGroupOrder = [];
        for (var i = 0; i < arrGroup.length; i++) {
            arrGroupOrder.push({
                "wellId": arrGroup[i].wellId,                "coordX": arrGroup[i].coordX,                "coordY": arrGroup[i].coordY
            });
        }
        return arrGroupOrder;
    }

    //for(var i = 0; i < arrGroup.length; i++){
    //    arrGroupOrder[i].zbx += 10;
    //    arrGroupOrder[i].zby += 10;
    //}

    //凸包化				
    var arrTb = [];
    arrGroupOrder = CalcCH(arrGroup, arrTb);
    var v1, v2;
    var n = arrGroupOrder.length;
    v1 = arrGroupOrder[0];
    v2 = arrGroupOrder[n - 1];
    if (v1.jh != v2.jh) // 判断一下凸包数据是否闭合，不闭合的做闭合处理。
    {
        arrGroupOrder.push_back(v1);
    }

    var tmpWell = [];
    var N;
    //arrGroup中凸包点之外的点加入tmpWell中
    for (var j = 0; j < arrGroup.length; j++) {
        N = 0;
        for (var k = 0; k < arrGroupOrder.length - 1; k++) {
            if (arrGroupOrder[k].wellId == arrGroup[j].wellId) {
                N = 1;
                break;
            }
        }
        if (N == 0) {
            tmpWell.push({
                "wellId": arrGroup[j].wellId,                "coordX": arrGroup[j].coordX,                "coordY": arrGroup[j].coordY
            });
        }
    }

    // 判断是否顺时针
    if (!IsClockwise(arrGroupOrder[0], arrGroupOrder[1], arrGroupOrder[2])) // true顺时针，false逆时针
    {
        // 调成顺时针
        arrGroupOrder.reverse(); // 将一个数组中的元素的顺序反转排序

        //var vTmp = [];
        //var j = 0;
        //for (var k = arrGroupOrder.length - 1; k >= 0; k--) {
        //    vTmp.push(arrGroupOrder[k]);
        //}
        //arrGroupOrder = vTmp;
    }

    // 将tmpWell插入.
    //计算tmpWell中的点到凸包边界每条边的距离
    var dis2 = 99999999;

    //////////////////////////////////////////////////////////////////////////
    var k = 0, index = -1;  // 关于index，是用来做优化，找散点和边界最近的位置,用记录的合适位置(index)插入。
    var b = true;

    var sss = "";
    for (k = 0; k < tmpWell.length; k++) // 把tmpWell中的井位插入arrGroupOrder中
    {
        index = -1;
        dis2 = 99999999;
        for (var i = 0; i < arrGroupOrder.length - 1; i++)  // 插入时，与oilArray中点的连线做比较，没有相交线时(端点不算相交)才可插入。
        {
            for (var n = 0; n < arrGroupOrder.length - 1; n++) // 计算oilArray[i]与arrGroup[k]连成的线，与环形是否相交。
            {
                b = false;
                if ((i == n) || (i == (n + 1)) || (i == 0 && (n + 2 == arrGroupOrder.length))) // 不算相交，继续循环往下算。
                    continue;

                var aa = {x:0, y:0};
                aa.x = arrGroupOrder[n].coordX;
                aa.y = arrGroupOrder[n].coordY;

                var bb = { x: 0, y: 0 };
                bb.x = arrGroupOrder[n + 1].coordX;
                bb.y = arrGroupOrder[n + 1].coordY;

                var cc = { x: 0, y: 0 };
                cc.x = arrGroupOrder[i].coordX;
                cc.y = arrGroupOrder[i].coordY;

                var dd = { x: 0, y: 0 };
                dd.x = tmpWell[k].coordX;
                dd.y = tmpWell[k].coordY;

                b = intersect(aa, bb, cc, dd);
                if (b) // 如果有相交
                {
                    break;
                }
            }

            if (!b) // 没有相交，再算另一根线
            {
                for (var n = 0; n < arrGroupOrder.length - 1; n++) // 计算oilArray[i+1]与arrGroup[k]连城的线，与环形是否相交。
                {
                    b = false;
                    if (((i + 1) == n) || ((i + 1) == (n + 1)) || (n == 0 && (i + 2) == arrGroupOrder.length)) // 不算相交，继续循环往下算。
                        continue;

                    var aa = { x: 0, y: 0 };
                    aa.x = arrGroupOrder[n].coordX;
                    aa.y = arrGroupOrder[n].coordY;

                    var bb = { x: 0, y: 0 };
                    bb.x = arrGroupOrder[n + 1].coordX;
                    bb.y = arrGroupOrder[n + 1].coordY;

                    var cc = { x: 0, y: 0 };;
                    cc.x = arrGroupOrder[i + 1].coordX;
                    cc.y = arrGroupOrder[i + 1].coordY;

                    var dd = { x: 0, y: 0 };
                    dd.x = tmpWell[k].coordX;
                    dd.y = tmpWell[k].coordY;

                    b = intersect(aa, bb, cc, dd); // ？？？？？？？？？？？？？？？？？？？？
                    if (b) // 如果有相交
                    {
                        break;
                    }
                }

                if (!b) // 没有相交，可以插入
                {
                    var fp1 = { x: 0, y: 0 };
                    var fp2 = { x: 0, y: 0 };
                    var fp3 = { x: 0, y: 0 };
                    fp1.x = arrGroupOrder[i].coordX;
                    fp1.y = arrGroupOrder[i].coordY;
                    fp2.x = arrGroupOrder[i + 1].coordX;
                    fp2.y = arrGroupOrder[i + 1].coordY;
                    fp3.x = tmpWell[k].coordX;
                    fp3.y = tmpWell[k].coordY;
                    var Tempdis = GetPointToLineDis(arrGroupOrder[i], arrGroupOrder[i + 1], tmpWell[k]);
                    if (Tempdis < dis2) {
                        index = i;
                        dis2 = Tempdis;
                    }
                }
            }
        }
        if (index >= 0) {
            //arrGroupOrder.insert(arrGroupOrder.begin() + index + 1, tmpWell[k]);
            arrGroupOrder.splice(index + 1, 0, tmpWell[k]);

        }
    }

    return arrGroupOrder;
}


// 计算凸包(convex hull); OriPts要求凸包的点集，OtherPts被筛出来的点集，返回值是凸包点集
//arrGroupOrder = CalcCH(arrGroup,arrTb);
//function CalcCH(vector<Data> OriPts, vector<Data>& OtherPts)
function CalcCH(arrGroup, arrTb) {
    if (arrGroup.length <= 0) {
        return [];
    }
    arrTb.length = 0; // 清空数组
    //查找左上角的点
    var arrPoints = arrGroup;
    var a = 0;
    var convexBag = [];
    convexBag.push(
    {
        "wellId": arrPoints[0].wellId,        "coordX": arrPoints[0].coordX,        "coordY": arrPoints[0].coordY
    });
    for (var i = 1; i < arrPoints.length; i++) {
        if (arrPoints[i].coordX < convexBag[0].coordX) {
            convexBag[0] = arrPoints[i];
            a = i;
        }
        if (arrPoints[i].coordX == convexBag[0].coordX && arrPoints[i].coordY > convexBag[0].coordY) {
            convexBag[0] = arrPoints[i];
            a = i;
        }
    }
    if (arrPoints.length == 1) {
        return convexBag;		//处理单个井位估值
    }

    arrPoints[a].mark = 1;
    var fMark = a;

    //寻找第一条边
    //初始化斜率
    var v1, v2;
    if (arrPoints[0].mark != 1) {
        v1 = (convexBag[0].coordY - arrPoints[0].coordY) / (convexBag[0].coordX - arrPoints[0].coordX);
        a = 0;		//20131105
    }
    else {
        v1 = (convexBag[0].coordY - arrPoints[1].coordY) / (convexBag[0].coordX - arrPoints[1].coordX);
        a = 1;		//20131105
    }

    //遍历所有点,查找第二个符合条件的点
    //符合条件：a,x坐标大于首点b,没有使用过，c，和首点的线段斜率最大
    //d,斜率相同时，距离较远的
    var k = 0; var n = arrPoints.length;
    //v1 = 0;			//修正错误，不应该为0   20130902
    for (var i = 0; i < n; i++) {
        //第二个点 符合没有使用过 且x坐标不等于 首点
        if (arrPoints[i].mark != 1 && arrPoints[i].coordX > convexBag[0].coordX) {
            v2 = (convexBag[0].coordY - arrPoints[i].coordY) / (convexBag[0].coordX - arrPoints[i].coordX);

            //斜率最大点   
            if (v2 > v1) {
                v1 = v2;
                a = i;
            }
                //如果斜率相同则 距离最远
            else if (v1 == v2 && (convexBag[k].coordX - arrPoints[i].coordX) * (convexBag[k].coordX - arrPoints[i].coordX) + (convexBag[k].coordY - arrPoints[i].coordY) * (convexBag[k].coordY - arrPoints[i].coordY) >
                        (convexBag[k].coordX - arrPoints[a].coordX) * (convexBag[k].coordX - arrPoints[a].coordX) + (convexBag[k].coordY - arrPoints[a].coordY) * (convexBag[k].coordY - arrPoints[a].coordY))
                a = i;

        }
    }


    //输入第二个点
    convexBag.push({
        "wellId": arrPoints[a].wellId,        "coordX": arrPoints[a].coordX,        "coordY": arrPoints[a].coordY
    });
    //标记
    arrPoints[a].mark = 1;

    //////////////////////////////////////////////////////////////////////////
    //进入循环查找 凸包点
    var Judge = true;
    var triPoint = [];
    for (var i = 0; i < 3; i++)
    {
        triPoint.push(
            {
                "coordX": 0,
                "coordY": 0
            });
    }
    k = 1;
    while (Judge) {
        //把凸包中前两个点入triPoint

        var Tmp = convexBag[k - 1].coordX;

        triPoint[0].coordX = Tmp;


        triPoint[0].coordX = convexBag[k - 1].coordX;
        triPoint[0].coordY = convexBag[k - 1].coordY;
        triPoint[1].coordX = convexBag[k].coordX;
        triPoint[1].coordY = convexBag[k].coordY;

        //初始角度0
        v1 = 0;
        //代入所有离散点判断角度最大的点（角度相同判断距离最远的）
        /************************************************/
        var Next = false;	//处理特殊情况，只有两点
        for (var i = 0; i < n; i++) {
            //点没有使用过
            if (arrPoints[i].mark != 1) {
                v1 = acos(triPoint[0], triPoint[1], arrPoints[i]);
                a = i;
                Next = true;
                break;
            }
        }
        if (!Next) {
            return convexBag;
        }
        /**************************************/
        for (var i = 0; i < n; i++) {
            //点没有使用过
            if (arrPoints[i].mark != 1) {
                triPoint[2].coordX = arrPoints[i].coordX;
                triPoint[2].coordY = arrPoints[i].coordY;

                v2 = acos(triPoint[0], triPoint[1], triPoint[2]);
                //斜率最大点
                if (v2 > v1) {
                    v1 = v2;
                    a = i;
                }
                else if (v1 == v2 && (convexBag[k].coordX - arrPoints[i].coordX) * (convexBag[k].coordX - arrPoints[i].coordX) + (convexBag[k].coordY - arrPoints[i].coordY) * (convexBag[k].coordY - arrPoints[i].coordY) >
                                (convexBag[k].coordX - arrPoints[a].coordX) * (convexBag[k].coordX - arrPoints[a].coordX) + (convexBag[k].coordY - arrPoints[a].coordY) * (convexBag[k].coordY - arrPoints[a].coordY)) {
                    a = i;
                }
            }
        }
        //凸包点数组自增
        k = k + 1;
        //找到第三个点时 把首点使用标记去掉 一遍结束时 查找
        if (k == 2)
            arrPoints[fMark].mark = 0;

        //输入凸包数组
        convexBag.push({
            "wellId": arrPoints[a].wellId,            "coordX": arrPoints[a].coordX,            "coordY": arrPoints[a].coordY
        });
        arrPoints[a].mark = 1;

        //判断是否闭合
        if (convexBag[k].coordX == convexBag[0].coordX && convexBag[k].coordY == convexBag[0].coordY)
            Judge = false;

    }

    return convexBag;
}

//判断逆时针
function IsClockwise(p0, p1, p2)
{
    var TempVal = (p1.coordX - p0.coordX) * (p2.coordY - p1.coordY) - (p2.coordX - p1.coordX) * (p1.coordY - p0.coordY);
    //叉乘:逆时针为负  顺时针为正

    if(TempVal > 0) 
        return false;
    else 
        return true;

}

//利用向量叉乘判断角度范围,根据余弦定理计算角度
function acos(p0, p1, p2) {
    var A, B, X, cross, angle;
    //计算 距离
    A = Math.sqrt((p1.coordX - p0.coordX) * (p1.coordX - p0.coordX) + (p1.coordY - p0.coordY) * (p1.coordY - p0.coordY));
    B = Math.sqrt((p1.coordX - p2.coordX) * (p1.coordX - p2.coordX) + (p1.coordY - p2.coordY) * (p1.coordY - p2.coordY));

    if (A == 0 || B == 0)
        return 0;

    //余弦值
    X = ((p0.coordX - p1.coordX) * (p2.coordX - p1.coordX) + (p0.coordY - p1.coordY) * (p2.coordY - p1.coordY)) / (A * B);

    //叉乘判断逆时针是否大于180度
    cross = (p0.coordX - p1.coordX) * (p2.coordY - p1.coordY) - (p2.coordX - p1.coordX) * (p0.coordY - p1.coordY);

    if (X == 1 || X > 1 || X < -1)
        return 0;

    if (X == -1) {
        angle = 0;
    }
    else {
        if (cross < 0) {

            angle = 360 - (Math.atan(-X / Math.sqrt(-X * X + 1)) + 2 * Math.atan(1.0)) * 180 / Math.PI;
        }
        else {
            angle = (Math.atan(-X / Math.sqrt(-X * X + 1)) + 2 * Math.atan(1.0)) * 180 / Math.PI;
        }
    }

    return angle;
}

//点到线段的垂足的距离
function GetPointToLineDis(PrePoint, NextPoint, point) {
    var ND = {};
    GetNearByPoint(PrePoint, NextPoint, point, ND);
    //垂足在线段上
    if ((ND.coordX >= PrePoint.coordX && ND.coordX <= NextPoint.coordX) || (ND.coordX >= NextPoint.coordX && ND.coordX <= PrePoint.coordX))
        return Getdis(point, ND);
    else
        return 9999999;
}

//获得垂足
function GetNearByPoint(m_PrePoint, m_NextPoint, point, m_newPoint) {
    var X0 = point.coordX;      //线段外一点                              
    var Y0 = point.coordY;
    var X1 = m_PrePoint.coordX; //线段上两端点                              
    var Y1 = m_PrePoint.coordY;
    var X2 = m_NextPoint.coordX;
    var Y2 = m_NextPoint.coordY;

    var X, Y;//垂足
    //斜率为正无穷的情况
    if (X1 == X2) {
        X = X1;
        Y = Y0;
    }
        //斜率为0的情况
    else if (Y1 == Y2) {
        X = X0;
        Y = Y1;
    }
    else {
        //斜率
        var K = (Y2 - Y1) / (X2 - X1);
        X = (K * Y0 + X0 + K * (K * X1 - Y1)) / (K * K + 1.0);
        Y = (-1 * K * X1 + Y1 + K * (K * Y0 + X0)) / (K * K + 1.0);
    }
    m_newPoint.coordX = X;
    m_newPoint.coordY = Y;
}
function Getdis(p1, p2) {
    var r = Math.sqrt((p1.coordX - p2.coordX) * (p1.coordX - p2.coordX) + (p1.coordY - p2.coordY) * ((p1.coordY - p2.coordY)));
    return r;
}

function intersect(aa, bb, cc, dd) {
    if (Math.max(aa.x, bb.x) < Math.min(cc.x, dd.x)) {
        return false;
    }
    if (Math.max(aa.y, bb.y) < Math.min(cc.y, dd.y)) {
        return false;
    }
    if (Math.max(cc.x, dd.x) < Math.min(aa.x, bb.x)) {
        return false;
    }
    if (Math.max(cc.y, dd.y) < Math.min(aa.y, bb.y)) {
        return false;
    }
    if (mult(cc, bb, aa) * mult(bb, dd, aa) < 0) {
        return false;
    }
    if (mult(aa, dd, cc) * mult(dd, bb, cc) < 0) {
        return false;
    }
    return true;
}

//function intersect(aa, bb, cc, dd)
//{
//    if ( Math.max(aa.x, bb.x)<Math.min(cc.x, dd.x) )  
//{  
//        return false;
//}  
//    if ( Math.max(aa.y, bb.y)<Math.min(cc.y, dd.y) )  
//{  
//        return false;
//}  
//    if ( Math.max(cc.x, dd.x)<Math.min(aa.x, bb.x) )  
//{  
//        return false;
//}  
//    if ( Math.max(cc.y, dd.y)<Math.min(aa.y, bb.y) )  
//{  
//        return false;
//}  
//if ( mult(cc, bb, aa)*mult(bb, dd, aa)<0 )  
//{  
//    return false;
//}  
//if ( mult(aa, dd, cc)*mult(dd, bb, cc)<0 )  
//{  
//    return false;
//}  
//return true; 
//}

////叉积  
//function mult(a, b, c)  
//{  
//  return (a.x-c.x)*(b.y-c.y)-(b.x-c.x)*(a.y-c.y);  
//} 



//叉积  
function mult(a, b, c) {
    return (a.x - c.x) * (b.y - c.y) - (b.x - c.x) * (a.y - c.y);
}

/*
 * 判断对象是否为空
*/
function isEmpty(obj) {
    // 检验 undefined 和 null
    if (!obj && obj !== 0 && obj !== '') {
        return true;
    }
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
    }
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
        return true;
    }
    return false;
}
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 计算油水井组连线(计算油井连接顺序) 
/*
 * 参数一oilWell:就是那些油井散点，参数二groupWell:是计算结果
 *  struct Data
 * {
 * DOUBLE X;
 * DOUBLE Y;
 * DOUBLE Z;
 * CString Well;
 * int  mark;
 * };
*/
//function CalcWellGroup5(oilWell, groupWell)
//{
//	if (oilWell.length < 2)
//return false;

//if (oilWell.length < 3)  // 小于三个点，不用计算了，连接就是。
//{
//    for(var i = 0; i < oilWell.length; i++){
//        groupWell.push_back(oilWell[i]);
//    }
//return TRUE;
//}


////凸包化				
//vector<Data> ve;
//groupWell = CalcCH(oilWell,ve);
//Data v1,v2;
//var n = groupWell.length;
//v1 = groupWell[0];
//v2 = groupWell[n-1];
//if (v1.Well != v2.Well) // 判断一下凸包数据是否闭合，不闭合的做闭合处理。
//{
//    groupWell.push_back(v1);
//}

//vector<Data> tmpWell;
//var N;
////oilWell中凸包点之外的点加入tmpWell中
//for(var j = 0;j < oilWell.length;j++)
//{
//    N = 0;
//    for(var k = 0;k < groupWell.length - 1;k++)
//{
//        if(groupWell[k].Well == oilWell[j].Well)
//{
//            N = 1;
//            break;
//}
//}
//    if(N == 0)
//{
//        tmpWell.push_back(oilWell[j]);
//}
//}


//    // 判断是否顺时针
//if (IsClockwise(groupWell[0],groupWell[1],groupWell[2]) == false) // true顺时针，false逆时针
//{
//    // 调成顺时针
//    vector<Data> vTmp;
//    var j = 0;
//    for(var k = groupWell.length-1; k >=0; k--)
//{
//        vTmp.push_back(groupWell[k]);
//}
		
//    groupWell.swap(vTmp);
//}
	
//    // 将tmpWell插入.
//    //计算tmpWell中的点到凸包边界每条边的距离
//double dis2 = 99999999;

//    //////////////////////////////////////////////////////////////////////////
//var k = 0, index = -1;  // 关于index，是用来做优化，找散点和边界最近的位置,用记录的合适位置(index)插入。
//BOOL b = TRUE;

//CString sss = "";
//for (k = 0; k < tmpWell.length; k++) // 把tmpWell中的井位插入groupWell中
//{
//    index = -1;
//    dis2 = 99999999;
//    //sss.Format("A: %s",tmpWell[k].Well);
//    //AfxMessageBox(sss);
//    for (var i = 0; i < groupWell.length - 1; i++)  // 插入时，与oilArray中点的连线做比较，没有相交线时(端点不算相交)才可插入。
//{
//    //	AfxMessageBox(oilArray[i].Well);
//        for (var n = 0; n < groupWell.length - 1; n++) // 计算oilArray[i]与oilWell[k]连城的线，与环形是否相交。
//{
//            b = false;
//            if( (i == n) || (i == (n+1)) || (i==0 && (n+2 == groupWell.length)) ) // 不算相交，继续循环往下算。
//                continue;

//            CFpoint aa;
//            aa.x = groupWell[n].X;
//            aa.y = groupWell[n].Y;

//            CFpoint bb;
//            bb.x = groupWell[n+1].X;
//            bb.y = groupWell[n+1].Y;

//            CFpoint cc;
//            cc.x = groupWell[i].X;
//            cc.y = groupWell[i].Y;

//            CFpoint dd;
//            dd.x = tmpWell[k].X;
//            dd.y = tmpWell[k].Y;

//            b = intersect(aa,bb,cc,dd);
//            if(b) // 如果有相交
//{
//    //	sss.Format("1:  %s - %s |  %s - %s",oilArray[n].Well,oilArray[n+1].Well, oilArray[i].Well,oilWell[k].Well);
//    //	AfxMessageBox(sss);
//                break;
//}
//}

//        if (b == false) // 没有相交，再算另一根线
//{
//            for (var n = 0; n < groupWell.length - 1; n++) // 计算oilArray[i+1]与oilWell[k]连城的线，与环形是否相交。
//{
//                b = false;
//                if( ((i +1) == n)  ||  ((i+1) == (n+1))  ||  (n==0  &&  (i+2)==groupWell.length) ) // 不算相交，继续循环往下算。
//                    continue;

//                CFpoint aa;
//                aa.x = groupWell[n].X;
//                aa.y = groupWell[n].Y;

//                CFpoint bb;
//                bb.x = groupWell[n+1].X;
//                bb.y = groupWell[n+1].Y;

//                CFpoint cc;
//                cc.x = groupWell[i+1].X;
//                cc.y = groupWell[i+1].Y;

//                CFpoint dd;
//                dd.x = tmpWell[k].X;
//                dd.y = tmpWell[k].Y;

//                b = intersect(aa,bb,cc,dd);
//                if(b) // 如果有相交
//{
//                    break;
//}
//}

//            if (b == false) // 没有相交，可以插入
//{
//                CFpoint fp1,fp2,fp3;
//                fp1.x = groupWell[i].X;
//                fp1.y = groupWell[i].Y;
//                fp2.x = groupWell[i+1].X;
//                fp2.y = groupWell[i+1].Y;
//                fp3.x = tmpWell[k].X;
//                fp3.y = tmpWell[k].Y;
//                double Tempdis = GetPointToLineDis(groupWell[i],groupWell[i+1],tmpWell[k]);
//                if (Tempdis < dis2)
//{
//                    index = i;
//                    dis2 = Tempdis;
//}
//}
//}
//    if (index >= 0)
//{
//        groupWell.insert(groupWell.begin() +index+1,tmpWell[k]);
//}
//}


//return TRUE;
//}



