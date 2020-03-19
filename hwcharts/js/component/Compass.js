Vmd.define('hwchart.component.Compass', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.layout'
    ]

}, function () {
    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
    var layout = hwchart.util.layout;

    // Model
    var CompassModel = hwcharts.extendComponentModel({

        type: 'compass',

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

            width: 50,
            height: 50,
            fontSize: 9,
            pointerWid: 10,
            pointerHei: 30,

            // 标题边框颜色
            borderColor: '#000',

            // 标题边框线宽，单位px，默认为0（无边框）
            borderWidth: 1,

            // 标题内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            padding: 5,

            // 主副标题纵向间隔，单位px，默认为10，
            itemGap: 10,
            textStyle: {
                fontSize: 18,
                //fontWeight: 'bolder',
                color: '#333'
            },
            subtextStyle: {
                color: '#aaa'
            }
        }
    });

    // View
    var CompassView = hwcharts.extendComponentView({

        type: 'compass',
        
        render: function (compassModel, ecModel, api) {
            
            this.group.removeAll();

            if (!compassModel.get('show')) {
                return;
            }

            var group = this.group;
            
            //subText && group.add(subTextEl);
            // If no subText, but add subTextEl, there will be an empty line.

            var groupRect = group.getBoundingRect();
            var layoutOption = compassModel.getBoxLayoutParams();
            layoutOption.width = groupRect.width;
            layoutOption.height = groupRect.height;
            var layoutRect = layout.getLayoutRect(
                layoutOption, {
                    width: api.getWidth(),
                    height: api.getHeight()
                }, compassModel.get('padding')
            );

            group.attr('position', [layoutRect.x, layoutRect.y]);

            this.renderCompass(compassModel, ecModel, group);
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
            // 绘制刻度
            this.renderCompass(componentModel, ecModel, group);
        },
        
        // 绘制
        renderCompass: function (paraModel, ecModel, group) {

            this.group.removeAll();

            if (this.isEmpty(paraModel) || this.isEmpty(group))
            {
                return;
            }

            // 计算逻辑坐标
            var geo = ecModel.getComponent('geo');

            //var zoomFactor = geo.coordinateSystem._zoom * 0.6;
            var rtGeo = geo.coordinateSystem._rect;
            var rtDraw = geo.coordinateSystem._viewRect;
            if (rtGeo.width <= 0 || rtDraw.width <= 0) {
                return;
            }

            // 指北针的定位，取代Frame.js中的定位功能
            var _boudingRect = geo.coordinateSystem.getBoundingRect();
            var xyPix = geo.coordinateSystem.dataToPoint([_boudingRect.x, _boudingRect.y]);
            var xyPix2 = geo.coordinateSystem.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y + _boudingRect.height]);
            
            // 绘制指北针
            this.compassDraw(paraModel, ecModel, group, xyPix2[0], xyPix2[1]);
        },
        
        // 绘制指北针
        compassDraw: function (paraModel, ecModel, group, baseX, baseY) {
            
            var style = paraModel.getItemStyle(['color', 'opacity']);
            //style.fill = paraModel.get('backgroundColor');
            style.fill = "#ffffff";

            // ------------------------------------------------------------------------
            // 计算逻辑坐标
            var geo = ecModel.getComponent('geo');
            var zoomFactor = geo.coordinateSystem._zoom * 0.6;
            var rtGeo = geo.coordinateSystem._rect;
            var rtDraw = geo.coordinateSystem._viewRect;
            if (rtGeo.width <= 0 || rtDraw.width <= 0) {
                return;
            }
            var compassWidth = paraModel.get('width') * zoomFactor;
            var compassHeight = paraModel.get('height') * zoomFactor;
            var compassFontSize = paraModel.get('fontSize') * zoomFactor;
            var pointerWid = paraModel.get('pointerWid') * zoomFactor;
            var pointerHei = paraModel.get('pointerHei') * zoomFactor;
            var nOffBorder = 10 * zoomFactor;
            
            var circleCenter = {
                x: baseX - nOffBorder - compassWidth / 2,
                y: baseY + compassHeight / 2
            };

            // 整体背景圆形
            var circle = new graphic.Circle({
                shape: {
                    cx: circleCenter.x,
                    cy: circleCenter.y,
                    r: compassWidth / 2
                },
                //style: style,
                style: {
                    fill: "#ffffff"
                },
                silent: true
            });
            graphic.subPixelOptimizeRect(circle);
            group.add(circle);

            //var pointerWid = 20 * zoomFactor;
            var compassSouthPts = [
                [circleCenter.x, circleCenter.y + pointerHei / 2],
                [circleCenter.x - pointerWid / 2, circleCenter.y],
                [circleCenter.x + pointerWid / 2, circleCenter.y]
            ];

            var compassNorthPts = [
                [circleCenter.x, circleCenter.y - pointerHei / 2],
                [circleCenter.x + pointerWid / 2, circleCenter.y],
                [circleCenter.x - pointerWid / 2, circleCenter.y]
            ];

            var polygonNorth = new graphic.Polygon({
                shape: {
                    points: compassNorthPts
                },
                style: {
                    fill: "#4D79BC",
                    stroke: "#4D79BC",
                    lineWidth: 1
                }
            });
            graphic.subPixelOptimizeRect(polygonNorth);
            group.add(polygonNorth);

            var polygonSouth = new graphic.Polygon({
                shape: {
                    points: compassSouthPts
                },
                style: {
                    fill: "#ffffff",
                    stroke: "#4D79BC",
                    lineWidth: 1
                }
            });
            graphic.subPixelOptimizeRect(polygonSouth);
            group.add(polygonSouth);
        },
        // 是否在视图范围内
        insideView: function (circleCenter, r) {

            var x = circleCenter.x;
            var y = circleCenter.y;
            var ptL = [x - r, y];
            if (layout.isPointInBody(ptL)) {
                return true;
            }
            var ptR = [x + r, y];
            if (layout.isPointInBody(ptR)) {
                return true;
            }
            var ptT = [x, y - r];
            if (layout.isPointInBody(ptT)) {
                return true;
            }
            var ptB = [x, y + r];
            if (layout.isPointInBody(ptB)) {
                return true;
            }

            return false;
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
        }
    });

    hwchart.component.Compass = CompassView;
})