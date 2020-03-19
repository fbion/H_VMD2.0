Vmd.define('hwchart.component.Scale', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.layout'
    ]

}, function () {
    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
    var layout = hwchart.util.layout;

    // Model
    var ScaleModel = hwcharts.extendComponentModel({

        type: 'scale',

        layoutMode: { type: 'box', ignoreSize: true },

        defaultOption: {

            // 一级层叠
            zlevel: 0,
            // 二级层叠
            z: 100,
            show: true,

            text: '',
            // 超链接跳转
            // link: null,
            // 仅支持self | blank
            target: 'blank',
            subtext: '',

            // 超链接跳转
            // sublink: null,
            // 仅支持self | blank
            subtarget: 'blank',

            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            left: 0,
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
            top: 0,

            // 水平对齐
            // 'auto' | 'left' | 'right' | 'center'
            // 默认根据 left 的位置判断是左对齐还是右对齐
            // textAlign: null
            //
            // 垂直对齐
            // 'auto' | 'top' | 'bottom' | 'middle'
            // 默认根据 top 位置判断是上对齐还是下对齐
            // textBaseline: null

            backgroundColor: 'rgba(255,255,255,0)',

            width: 120,
            height: 12,
            fontSize: 9,
            unitLogic: 24,
            unitGeo: 200,
            scaleMin: 200,
            isCalc: true,

            // 标题边框颜色
            borderColor: '#000',

            // 标题边框线宽，单位px，默认为0（无边框）
            borderWidth: 0,

            // 标题内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            padding: 5,

            // 主副标题纵向间隔，单位px，默认为10，
            itemGap: 10,
            textStyle: {
                fontFamily: 'Microsoft YaHei',
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#333'
            },
            subtextStyle: {
                color: '#aaa'
            }
        }
    });

    // View
    var ScaleView = hwcharts.extendComponentView({

        type: 'scale',
        isCalc: true,
        unitGeo: 200,
        unitLogic: 25,

        render: function (scaleModel, ecModel, api) {

            this.group.removeAll();

            if (!scaleModel.get('show')) {
                return;
            }

            var group = this.group;

            //subText && group.add(subTextEl);
            // If no subText, but add subTextEl, there will be an empty line.

            var groupRect = group.getBoundingRect();
            var layoutOption = scaleModel.getBoxLayoutParams();
            layoutOption.width = groupRect.width;
            layoutOption.height = groupRect.height;
            var layoutRect = layout.getLayoutRect(
                layoutOption, {
                    width: api.getWidth(),
                    height: api.getHeight()
                }, scaleModel.get('padding')
            );

            group.attr('position', [layoutRect.x, layoutRect.y]);

            // 绘制刻度
            this.renderScale(scaleModel, ecModel, group);
        },
        updateTransform: function (componentModel, ecModel, api, payload) {

            if (!componentModel.get('show')) {
                return;
            }

            var group = this.group;

            //subText && group.add(subTextEl);
            // If no subText, but add subTextEl, there will be an empty line.

            var groupRect = group.getBoundingRect();
            var layoutOption = componentModel.getBoxLayoutParams();
            layoutOption.width = groupRect.width;
            layoutOption.height = groupRect.height;
            var layoutRect = layout.getLayoutRect(
                layoutOption, {
                    width: api.getWidth(),
                    height: api.getHeight()
                }, componentModel.get('padding')
            );

            group.attr('position', [layoutRect.x, layoutRect.y]);
            // ------------------------------------------------------------------------

            // 绘制刻度
            this.renderScale(componentModel, ecModel, group);
        },

        // 绘制分隔矩形和刻度
        renderScale: function (paraModel, ecModel, group) {

            this.group.removeAll();

            if (this.isEmpty(paraModel) || this.isEmpty(group)) {
                return;
            }

            // ------------------------------------------------------------------------
            // 计算逻辑坐标
            var geo = ecModel.getComponent('geo');

            var zoomFactor = geo.coordinateSystem._zoom * 0.3;
            var rtGeo = geo.coordinateSystem._rect;
            var rtDraw = geo.coordinateSystem._viewRect;
            if (rtGeo.width <= 0 || rtDraw.width <= 0) {
                return;
            }
            // ------------------------------------------------------------------------

            // 比例尺的定位，取代Frame.js中的定位功能
            var _boudingRect = geo.coordinateSystem.getBoundingRect();
            var xyPix = geo.coordinateSystem.dataToPoint([_boudingRect.x, _boudingRect.y]);
            var xyPix2 = geo.coordinateSystem.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y + _boudingRect.height]);

            // 绘制刻度
            this.scaleMark(paraModel, ecModel, group, xyPix[0], xyPix2[1]);
        },
        // 绘制刻度
        scaleMark: function (paraModel, ecModel, group, baseX, baseY) {

            var style = paraModel.getItemStyle(['color', 'opacity']);
            style.fill = paraModel.get('backgroundColor');

            // ------------------------------------------------------------------------
            // 计算逻辑坐标
            var geo = ecModel.getComponent('geo');
            var zoomFactor = geo.coordinateSystem._zoom * 0.5;
            var rtGeo = geo.coordinateSystem._rect;
            var rtDraw = geo.coordinateSystem._viewRect;
            if (rtGeo.width <= 0 || rtDraw.width <= 0) {
                return;
            }
            var scaleWidth = paraModel.get('width') * zoomFactor;
            var scaleHeight = paraModel.get('height') * zoomFactor;
            var scaleFontSize = paraModel.get('fontSize') * zoomFactor;
            //var scaleMin = paraModel.get('scaleMin');
            var unitGeo = paraModel.get('unitGeo');
            var unitLogic = paraModel.get('unitLogic');

            if (this.isCalc) {
                //var unitLogicMin = 30;
                var unitLogicMax = 90;

                unitGeo = unitLogic * rtGeo.width / (rtDraw.width * zoomFactor);

                var unitGeoTmp = unitGeo;
                // 根据最小逻辑值向上取整
                unitGeo = this.FindIntScale2(unitGeoTmp, true);
                // 规整化后重新计算一个单位逻辑坐标
                unitLogic = unitGeo * rtDraw.width * zoomFactor / rtGeo.width;
                if (unitLogic > unitLogicMax) {
                    unitGeo = unitLogicMax * rtGeo.width / (rtDraw.width * zoomFactor);
                    unitGeoTmp = unitGeo;
                    // 根据最大逻辑值向下取整
                    unitGeo = this.FindIntScale2(unitGeoTmp, false);
                    // 规整化后重新计算一个单位逻辑坐标
                    unitLogic = unitGeo * rtDraw.width * zoomFactor / rtGeo.width;
                }

                this.unitGeo = unitGeo;
                this.unitLogic = unitLogic;
                this.isCalc = false;
            }
            else {
                unitGeo = this.unitGeo;
                unitLogic = this.unitLogic * zoomFactor;
            }

            var scaleCnt = 4;
            scaleWidth = unitLogic * scaleCnt;
            
            // 整体背景矩形
            var rect = new graphic.Rect({
                shape: {
                    x: baseX,
                    y: baseY,
                    width: scaleWidth,
                    height: scaleHeight
                },
                style: style,
                silent: true
            });
            graphic.subPixelOptimizeRect(rect);

            group.add(rect);
            
            // 刻度绘制
            var unitWidthLogic = unitLogic;
            var i = 0;
            for (i = 0; i < scaleCnt; i++) {
                var colorFill = "#000";
                if (i % 2 == 1) {
                    colorFill = "#fff";
                }
                var rtTmp = new graphic.Rect({
                    shape: {
                        x: baseX + i * unitWidthLogic,
                        y: baseY + scaleHeight / 2,
                        width: unitWidthLogic,
                        height: scaleHeight / 2
                    },
                    //style: style,
                    style: {
                        stroke: '#000',
                        fill: colorFill,
                        //text: i * unitGeo, // 获取计算刻度值
                        fontSize: scaleFontSize,
                        //textBackgroundColor: '#000',
                        textPosition: 'bottom',
                        textOffset: [-unitWidthLogic / 2, 0],
                        lineWidth: 1
                    },
                    silent: true
                });
                graphic.subPixelOptimizeRect(rtTmp);

                group.add(rtTmp);

                // 刻度
                var rtScale = new graphic.Rect({
                    shape: {
                        x: baseX + i * unitWidthLogic,
                        y: baseY - 1 * zoomFactor,
                        width: unitWidthLogic,
                        height: scaleHeight / 2
                    },
                    //style: style,
                    style: {
                        stroke: 'none',
                        fill: 'none',
                        text: i * unitGeo, // 获取计算刻度值
                        fontSize: scaleFontSize,
                        //textBackgroundColor: '#000',
                        textVerticalAlign: 'middle',
                        textOffset: [-unitWidthLogic / 2, 0],
                        lineWidth: 1
                    },
                    silent: true
                });
                graphic.subPixelOptimizeRect(rtScale);

                group.add(rtScale);
            }

            // 绘制最后一个刻度
            var rtTmp = new graphic.Rect({
                shape: {
                    x: baseX + i * unitWidthLogic,
                    y: baseY - 1 * zoomFactor,
                    width: 0,
                    height: scaleHeight / 2
                },
                //style: style,
                style: {
                    stroke: '#000',
                    fill: colorFill,
                    text: i * unitGeo, // 获取计算刻度值
                    fontSize: scaleFontSize,
                    //textBackgroundColor: '#000',
                    textVerticalAlign: 'middle',
                    textOffset: [0, 0],
                    lineWidth: 0
                },
                silent: true
            });
            graphic.subPixelOptimizeRect(rtTmp);

            group.add(rtTmp);
        },
        isEmpty: function (obj) {
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
        },

        insideView: function (group, scaleWidth, scaleHeight) {

            var x = group.position[0];
            var y = group.position[1];
            var ptLT = [x, y];
            if (layout.isPointInBody(ptLT)) {
                return true;
            }
            var ptRT = [x + scaleWidth, y];
            if (layout.isPointInBody(ptRT)) {
                return true;
            }
            var ptRB = [x + scaleWidth, y + scaleHeight];
            if (layout.isPointInBody(ptRB)) {
                return true;
            }
            var ptLB = [x, y + scaleHeight];
            if (layout.isPointInBody(ptLB)) {
                return true;
            }

            return false;
        },

        //bUporDown: 0：向下规整 1：向上规整  
        FindIntScale2: function (StepMin, bUporDown) {
            var dStep, dStepOld, RetVal;
            if (StepMin == 0.0)
                return (0.0);

            //是否为负数
            var bNegative = false;
            bNegative = (StepMin < 0) ? true : false;

            if (bNegative) {//负数的绝对值的规整方向与之规整方向相反
                bUporDown = !bUporDown;
            }

            //首先按照正数计算
            StepMin = Math.abs(StepMin);     //若小于0,则取绝对值

            if (!bUporDown) {//向下规整
                //计算渐变母值
                dStep = this.GetMagnitude(StepMin);
                dStep *= 10;

                while (StepMin < dStep) {
                    dStepOld = dStep;
                    dStep = dStep / 2.5;
                    if (StepMin < dStep) {
                        dStepOld = dStep;
                        dStep = dStep / 2;
                    }
                    if (StepMin < dStep) {
                        dStepOld = dStep;
                        dStep = dStep / 2.0;
                    }
                }
                RetVal = dStep;
            }
            else {//向上规整
                //计算渐变母值
                dStep = this.GetMagnitude(StepMin);
                while (StepMin > dStep) {
                    dStep *= 2.5;
                    if (StepMin > dStep) {
                        dStep *= 2.0;
                    }
                    else {
                        dStep /= 2.5;
                        dStep *= 2.0;
                    }
                }


                RetVal = dStep;
                //	RetVal = FindMaxFloatStep(StepMin);
            }

            //负数按正数规整后还原其符号
            if (bNegative) {
                RetVal *= -1;
            }
            return (RetVal);
        },

        //得到一个数的数量级
        GetMagnitude: function (fNumber) {
            //数量级
            var magnitudeValue = 1.0;

            if (fNumber == 0.0)
                return (0.0);

            //是否为负数
            var bNegative;
            bNegative = (fNumber < 0) ? true : false;

            var positiveNumber = Math.abs(fNumber);
            if (positiveNumber == 1) {//等于1
                magnitudeValue = 1.0;
            }
            else if (positiveNumber < 1.0) {//小于1
                while (positiveNumber < 1.0) {
                    positiveNumber *= 10.0;
                    magnitudeValue /= 10.0;
                }
            }
            else {//大于1
                while (positiveNumber > 1.0) {
                    positiveNumber /= 10.0;
                    magnitudeValue *= 10.0;
                }
                magnitudeValue /= 10.0;
            }
            return magnitudeValue;
        }
    });

    hwchart.component.Scale = ScaleView;
})