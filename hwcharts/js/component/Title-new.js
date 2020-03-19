Vmd.define('hwchart.component.Title', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.layout'
    ]

}, function () {

    var zrUtil = zrender.util;


    var graphic = hwchart.util.graphic;

    var layout = _layout = hwchart.util.layout;

    var getLayoutRect = _layout.getLayoutRect;

    // Model
    hwcharts.extendComponentModel({
        type: 'title',
        layoutMode: {
            type: 'box',
            ignoreSize: true
        },
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
            // textVerticalAlign: null
            // textBaseline: null // The same as textVerticalAlign.
            backgroundColor: 'rgba(0,0,0,0)',
            // 标题边框颜色
            borderColor: '#ccc',
            // 标题边框线宽，单位px，默认为0（无边框）
            borderWidth: 0,
            // 标题内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            padding: 5,
            // 主副标题纵向间隔，单位px，默认为10，
            itemGap: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#333'
            },
            subtextStyle: {
                color: '#aaa'
            }
        }
    }); // View

    hwcharts.extendComponentView({
        type: 'title',
        render: function (titleModel, ecModel, api) {
            this.group.removeAll();

            if (!titleModel.get('show')) {
                return;
            }

            var group = this.group;
            var textStyleModel = titleModel.getModel('textStyle');
            var subtextStyleModel = titleModel.getModel('subtextStyle');
            var textAlign = titleModel.get('textAlign');
            var textVerticalAlign = zrUtil.retrieve2(titleModel.get('textBaseline'), titleModel.get('textVerticalAlign'));
            var textEl = new graphic.Text({
                style: graphic.setTextStyle({}, textStyleModel, {
                    text: titleModel.get('text'),
                    textFill: textStyleModel.getTextColor()
                }, {
                    disableBox: true
                }),
                z2: 10
            });
            var textRect = textEl.getBoundingRect();
            var subText = titleModel.get('subtext');
            var subTextEl = new graphic.Text({
                style: graphic.setTextStyle({}, subtextStyleModel, {
                    text: subText,
                    textFill: subtextStyleModel.getTextColor(),
                    y: textRect.height + titleModel.get('itemGap'),
                    textVerticalAlign: 'top'
                }, {
                    disableBox: true
                }),
                z2: 10
            });
            var link = titleModel.get('link');
            var sublink = titleModel.get('sublink');
            var triggerEvent = titleModel.get('triggerEvent', true);
            textEl.silent = !link && !triggerEvent;
            subTextEl.silent = !sublink && !triggerEvent;

            if (link) {
                textEl.on('click', function () {
                    window.open(link, '_' + titleModel.get('target'));
                });
            }

            if (sublink) {
                subTextEl.on('click', function () {
                    window.open(sublink, '_' + titleModel.get('subtarget'));
                });
            }

            textEl.eventData = subTextEl.eventData = triggerEvent ? {
                componentType: 'title',
                componentIndex: titleModel.componentIndex
            } : null;
            group.add(textEl);
            subText && group.add(subTextEl); // If no subText, but add subTextEl, there will be an empty line.

            var groupRect = group.getBoundingRect();
            var layoutOption = titleModel.getBoxLayoutParams();
            layoutOption.width = groupRect.width;
            layoutOption.height = groupRect.height;
            var layoutRect = getLayoutRect(layoutOption, {
                width: api.getWidth(),
                height: api.getHeight()
            }, titleModel.get('padding')); // Adjust text align based on position

            if (!textAlign) {
                // Align left if title is on the left. center and right is same
                textAlign = titleModel.get('left') || titleModel.get('right');

                if (textAlign === 'middle') {
                    textAlign = 'center';
                } // Adjust layout by text align


                if (textAlign === 'right') {
                    layoutRect.x += layoutRect.width;
                } else if (textAlign === 'center') {
                    layoutRect.x += layoutRect.width / 2;
                }
            }

            if (!textVerticalAlign) {
                textVerticalAlign = titleModel.get('top') || titleModel.get('bottom');

                if (textVerticalAlign === 'center') {
                    textVerticalAlign = 'middle';
                }

                if (textVerticalAlign === 'bottom') {
                    layoutRect.y += layoutRect.height;
                } else if (textVerticalAlign === 'middle') {
                    layoutRect.y += layoutRect.height / 2;
                }

                textVerticalAlign = textVerticalAlign || 'top';
            }

            group.attr('position', [layoutRect.x, layoutRect.y]);
            var alignStyle = {
                textAlign: textAlign,
                textVerticalAlign: textVerticalAlign
            };
            textEl.setStyle(alignStyle);
            subTextEl.setStyle(alignStyle); // Render background
            // Get groupRect again because textAlign has been changed

            groupRect = group.getBoundingRect();
            var padding = layoutRect.margin;
            var style = titleModel.getItemStyle(['color', 'opacity']);
            style.fill = titleModel.get('backgroundColor');
            var rect = new graphic.Rect({
                shape: {
                    x: groupRect.x - padding[3],
                    y: groupRect.y - padding[0],
                    width: groupRect.width + padding[1] + padding[3],
                    height: groupRect.height + padding[0] + padding[2],
                    r: titleModel.get('borderRadius')
                },
                style: style,
                subPixelOptimize: true,
                silent: true
            });
            group.add(rect);
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
            this.renderText(componentModel, ecModel, group, api);
        },

        // 绘制
        renderText: function (paraModel, ecModel, group, api) {

            this.group.removeAll();

            if (this.isEmpty(paraModel) || this.isEmpty(group)) {
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
            var wid = xyPix2[0] - xyPix[0];
            // 绘制指北针
            this.textDraw(paraModel, ecModel, group, api, xyPix[0] + wid / 2, xyPix2[1] - 5);
        },
        // 绘制
        textDraw: function (paraModel, ecModel, group, api, baseX, baseY) {

            var geo = ecModel.getComponent('geo');
            var zoomFactor = geo.coordinateSystem._zoom * 0.3;
            var rtGeo = geo.coordinateSystem._rect;
            var rtDraw = geo.coordinateSystem._viewRect;
            if (rtGeo.width <= 0 || rtDraw.width <= 0) {
                return;
            }
            var textStyleModel = paraModel.get('textStyle');

            var fontSizeOrg = paraModel.get('textStyle').fontSize;
            var frameSpaceOrg = paraModel.get('frameSpace');
            var titleSpaceOrg = paraModel.get('titleSpace');

            var fontSizeTmp = fontSizeOrg * zoomFactor;
            var textHeight = fontSizeTmp;
            if (fontSizeTmp > fontSizeOrg) {
                fontSizeTmp = fontSizeOrg;
            }
            var frameSpaceTmp = frameSpaceOrg * zoomFactor;
            var titleSpaceTmp = titleSpaceOrg * zoomFactor;
            //var _boudingRect = geo.coordinateSystem.getBoundingRect();
            var _boudingRect = geo.coordinateSystem._viewRect;

            //group.position[1] = xyPix[1] - fontSizeTmp - frameSpaceTmp - titleSpaceTmp;
            var textEl = new graphic.Text({
                style: {
                    x: baseX,
                    y: baseY - fontSizeTmp - frameSpaceTmp - titleSpaceTmp,
                    text: paraModel.get('text'),
                    fontFamily: textStyleModel.fontFamily,
                    fontSize: fontSizeTmp,
                    fontWeight: paraModel.get('textStyle').fontWeight,
                    textAlign: paraModel.get('textAlign')
                },
                z2: 10
            });

            group.add(textEl);
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
})