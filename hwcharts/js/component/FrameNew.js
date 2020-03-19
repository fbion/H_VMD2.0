Vmd.define('hwchart.component.FrameNew', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.layout'
    ]

}, function () {
    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
    var layout = hwchart.util.layout;

    // Model
    var FrameNewModel = hwcharts.extendComponentModel({

        type: 'frameNew',

        layoutMode: { type: 'box', ignoreSize: true },

        defaultOption: {
            // 一级层叠
            zlevel: 0,
            // 二级层叠
            z: 6,
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
            scaleMin: 200,

            // 标题边框颜色
            borderColor: '#000',

            // 标题边框线宽，单位px，默认为0（无边框）
            borderWidth: 0,

            // 标题内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            padding: 5,

            // 主副标题纵向间隔，单位px，默认为10，
            itemGap: 10,
            frameSpace: 8, // 图框间距大小，用于处理图框外扩的大小
            textStyle: {
                fontSize: 12,
                fontWeight: 'bolder',
                color: '#333'
            },
            subtextStyle: {
                color: '#aaa'
            }
        }
    });

    // View
    var FrameNewView = hwcharts.extendComponentView({

        type: 'frameNew',
        
        render: function (frameNewModel, ecModel, api) {
            
            this.group.removeAll();

            if (!frameNewModel.get('show')) {
                return;
            }

            var group = this.group;
            
            //subText && group.add(subTextEl);
            // If no subText, but add subTextEl, there will be an empty line.

            var groupRect = group.getBoundingRect();
            var layoutOption = frameNewModel.getBoxLayoutParams();
            layoutOption.width = groupRect.width;
            layoutOption.height = groupRect.height;
            var layoutRect = layout.getLayoutRect(
                layoutOption, {
                    width: api.getWidth(),
                    height: api.getHeight()
                }, frameNewModel.get('padding')
            );

            group.attr('position', [layoutRect.x, layoutRect.y]);

            // Render background
            // Get groupRect again because textAlign has been changed
            //groupRect = group.getBoundingRect();
            //var padding = layoutRect.margin;

            // 绘制刻度
            this.renderFrameNew(frameNewModel, ecModel, group);
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
            //var geo = ecModel.getComponent('geo');
            //var rtGeo = geo.coordinateSystem._rect;
            //var rtDraw = geo.coordinateSystem._viewRect;
            //if (rtGeo.width <= 0 && rtDraw.width <= 0) {
            //    return;
            //}
            //var scaleWidth = componentModel.get('width');
            //var scaleHeight = componentModel.get('height');
            //var unitLogic = 200 * rtDraw.width / rtGeo.width;
            //var unitCnt = 4;
            //scaleWidth = unitLogic * unitCnt;

            //var group = this.group;
            // 绘制刻度
            this.renderFrameNew(componentModel, ecModel, group);
        },
        
        // 绘制分隔矩形和刻度
        renderFrameNew: function (paraModel, ecModel, group) {

            //return;
            this.group.removeAll();

            //if (this.isEmpty(paraModel) || this.isEmpty(group))
            //{
            //    return;
            //}
            //var style = paraModel.getItemStyle(['color', 'opacity']);
            //style.fill = paraModel.get('backgroundColor');
            var frameSpaceOrg = paraModel.get('frameSpace');
            //frameSpaceOrg = 12;

            // ------------------------------------------------------------------------
            // 计算逻辑坐标
            var geo = ecModel.getComponent('geo');

            var zoomFactor = geo.coordinateSystem._zoom * 0.6;
            var rtGeo = geo.coordinateSystem._rect;
            var rtDraw = geo.coordinateSystem._viewRect;
            if (rtGeo.width <= 0 || rtDraw.width <= 0) {
                return;
            }
            var frameSpaceTmp = frameSpaceOrg * zoomFactor;
            //if (frameSpaceTmp > frameSpaceOrg)
            //{
            //    frameSpaceTmp = frameSpaceOrg;
            //}
            //var scaleWidth = paraModel.get('width') * zoomFactor;
            //var scaleHeight = paraModel.get('height') * zoomFactor;
            //var scaleFontSize = paraModel.get('fontSize') * zoomFactor;
            //var scaleMin = paraModel.get('scaleMin');
            ////var unitLogic = 200 * rtDraw.width / (rtGeo.width * zoomFactor);
            //var unitLogic = scaleMin * rtDraw.width * zoomFactor / rtGeo.width;
            
            var scaleCnt = 4;
            //scaleWidth = unitLogic * scaleCnt;

            //if (geo.regions.length <= 0)
            //{
            //    return;
            //}
            //var region = geo.regions[0];

            //var nOff = 80;
            //var nLeft = region._rect.x - nOff;
            //var nRight = region._rect.x + region._rect.width + nOff;
            //var nBottom = region._rect.y - nOff;
            //var nTop = region._rect.y + region._rect.height + nOff;


            // ------------------------------------------------------------------------

            // 比例尺的定位，取代Frame.js中的定位功能
            var _boudingRect = geo.coordinateSystem.getBoundingRect();
            var xyPix = geo.coordinateSystem.dataToPoint([_boudingRect.x, _boudingRect.y]);
            var xyPix2 = geo.coordinateSystem.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y + _boudingRect.height]);

            var wid = xyPix2[0] - xyPix[0];
            var hei = xyPix[1] - xyPix2[1];

            //var textRect = group.getBoundingRect();
            //居中位置显示,未考虑top、padding等情况
            //group.position[0] = xyPix[0];
            //group.position[1] = xyPix[1];

            //frameSpaceTmp = 10;
            var nOffOrg = 5;
            // 整体背景矩形
            var rect = new graphic.Rect({
                shape: {
                    x: xyPix[0] - nOffOrg - frameSpaceTmp,
                    y: xyPix2[1] - nOffOrg - frameSpaceTmp,
                    width: wid + frameSpaceTmp * 2,
                    height: hei + frameSpaceTmp * 2
                },
                style: {
                    stroke: '#000',
                    fill: 'none',
                    lineWidth: 1
                },
                silent: true
            });
            graphic.subPixelOptimizeRect(rect);

            group.add(rect);

            // 图框刻度
            this.frameScale(paraModel, ecModel, group);

            
            //zrUtil.each(geo.coordinateSystem.regions, function (region) {
                
            //    //var nOff = 80;

            //    var ptLT = geo.coordinateSystem.dataToPoint([region._rect.x, region._rect.y]);
            //    var ptBR = geo.coordinateSystem.dataToPoint([region._rect.x + region._rect.width, region._rect.y + region._rect.height]);

            //    var nOffOrg = 5;
            //    var rect = new graphic.Rect({
            //        shape: {
            //            x: ptLT[0] - nOffOrg - frameSpaceTmp,
            //            y: ptBR[1] - nOffOrg - frameSpaceTmp,
            //            width: ptBR[0] - ptLT[0] + frameSpaceTmp * 2,
            //            height: ptLT[1] - ptBR[1] + frameSpaceTmp * 2
            //        },
            //        style: {
            //            stroke: '#000',
            //            fill: 'none',
            //            lineWidth: 1
            //        },
            //        silent: true
            //    });

            //    graphic.subPixelOptimizeRect(rect);

            //    group.add(rect);
            //});


            //var rect = new graphic.Rect({
            //    shape: {
            //        x: rtDraw.x - 0,
            //        y: rtDraw.y - 0,
            //        width: rtDraw.width + frameSpaceTmp * 2,
            //        height: rtDraw.height + frameSpaceTmp * 2
            //    },
            //    style: {
            //        stroke: '#000',
            //        fill: 'none',
            //        lineWidth: 2
            //    },
            //    silent: true
            //});


            //graphic.subPixelOptimizeRect(rect);

            //group.add(rect);
        },

        // 绘制图框刻度
        frameScale: function (paraModel, ecModel, group) {


            // 计算逻辑坐标
            var frameSpaceOrg = paraModel.get('frameSpace');
            var geo = ecModel.getComponent('geo');

            var zoomFactor = geo.coordinateSystem._zoom;
            var rtGeo = geo.coordinateSystem._rect;
            var rtDraw = geo.coordinateSystem._viewRect;
            if (rtGeo.width <= 0 || rtDraw.width <= 0) {
                return;
            }
            var frameSpaceTmp = frameSpaceOrg * zoomFactor * 0.6;

            // ------------------------------------------------------------------------

            var nOffOrg = 5;
            var _boudingRect = geo.coordinateSystem.getBoundingRect();
            var xyPix = geo.coordinateSystem.dataToPoint([_boudingRect.x, _boudingRect.y]);
            var xyPix2 = geo.coordinateSystem.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y + _boudingRect.height]);
            xyPix[0] -= nOffOrg;
            xyPix[1] -= nOffOrg;
            xyPix2[0] -= nOffOrg;
            xyPix2[1] -= nOffOrg;
            var wid = xyPix2[0] - xyPix[0];
            var hei = xyPix[1] - xyPix2[1];

            var nCnt = 3;
            var nUnitLogicX = wid / nCnt;
            var nUnitLogicY = hei / nCnt;

            var nUnitX = _boudingRect.width / nCnt;
            var nUnitY = _boudingRect.height / nCnt;
            var nLeft = _boudingRect.x;
            var nRight = _boudingRect.x + _boudingRect.width;
            var nBottom = _boudingRect.y;
            var nTop = _boudingRect.y + _boudingRect.height;


            var fontSizeOrg = paraModel.get('textStyle').fontSize;
            var fontSizeTmp = fontSizeOrg * zoomFactor * 0.3;
            var textHeight = fontSizeTmp;
            if (fontSizeTmp > fontSizeOrg) {
                fontSizeTmp = fontSizeOrg;
            }
            // 上边
            for (var i = 1; i < nCnt; i++) {

                var line = new graphic.Polyline({
                    style: {
                        stroke: "black",
                        text: Math.floor(nLeft + i * nUnitX),
                        fontSize: fontSizeTmp,
                        lineWidth: 1
                    },

                    shape: {
                        points: [[xyPix[0] + i * nUnitLogicX, xyPix2[1]], [xyPix[0] + i * nUnitLogicX, xyPix2[1] - frameSpaceTmp]]
                    }
                });

                group.add(line);
            }

            // 下边
            for (var i = 1; i < nCnt; i++) {

                var line = new graphic.Polyline({
                    style: {
                        stroke: "black",
                        text: Math.floor(nLeft + i * nUnitX),
                        fontSize: fontSizeTmp,
                        lineWidth: 1
                    },

                    shape: {
                        points: [[xyPix[0] + i * nUnitLogicX, xyPix[1]], [xyPix[0] + i * nUnitLogicX, xyPix[1] + frameSpaceTmp]]
                        //points: [[xyPix[0] + i * nUnitLogicX, nTop], [xyPix[0] + i * nUnitLogicX, nTop + frameSpaceTmp]]
                    }
                });

                group.add(line);
            }

            // 左边
            for (var i = 1; i < nCnt; i++) {

                var line = new graphic.Polyline({
                    style: {
                        stroke: "black",
                        text: Math.floor(nTop - i * nUnitY),
                        fontSize: fontSizeTmp,
                        textRotation: Math.PI / 2,
                        lineWidth: 1
                    },

                    shape: {
                        points: [[xyPix[0], xyPix2[1] + i * nUnitLogicY], [xyPix[0] - frameSpaceTmp, xyPix2[1] + i * nUnitLogicY]]
                    }
                });

                group.add(line);
            }

            // 右边
            for (var i = 1; i < nCnt; i++) {

                var line = new graphic.Polyline({
                    style: {
                        stroke: "black",
                        text: Math.floor(nTop - i * nUnitY),
                        fontSize: fontSizeTmp,
                        textRotation: Math.PI / 2,
                        lineWidth: 1
                    },

                    shape: {
                        points: [[xyPix2[0], xyPix2[1] + i * nUnitLogicY], [xyPix2[0] + frameSpaceTmp, xyPix2[1] + i * nUnitLogicY]]
                    }
                });

                group.add(line);
            }
        }
    });

    hwchart.component.FrameNew = FrameNewView;
})