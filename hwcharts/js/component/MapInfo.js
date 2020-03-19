Vmd.define('hwchart.component.MapInfo', {
    requires: [
        'hwchart.util.graphic',
        'hwchart.util.layout'
    ]

}, function () {
    var zrUtil = zrender.util;
    var graphic = hwchart.util.graphic;
    var layout = hwchart.util.layout;

    // Model
    var MapInfoModel = hwcharts.extendComponentModel({

        type: 'mapInfo',

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
            textAlign: 'right',
            //
            // 垂直对齐
            // 'auto' | 'top' | 'bottom' | 'middle'
            // 默认根据 top 位置判断是上对齐还是下对齐
            textBaseline: 'top',

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

            frameSpace: 3, // 图框间距大小，用于处理图框外扩的大小
            titleSpace: 0, // 标题与图框的间距，用于处理标题与图框的间距

            textStyle: {
                fontFamily: 'Microsoft YaHei',
                fontSize: 24,
                fontWeight: 'bolder',
                color: '#333'
            },
            subtextStyle: {
                color: '#aaa'
            }
        }
    });

    // View
    var MapInfoView = hwcharts.extendComponentView({

        type: 'mapInfo',
        textElMapInfo: {}, // 改为textElMapInfo是为了防止与Title中的textEl相同，否则会影响同步缩放功能
        render: function (titleModel, ecModel, api) {
            this.group.removeAll();

            if (!titleModel.get('show')) {
                return;
            }

            var group = this.group;

            var groupRect = group.getBoundingRect();
            var layoutOption = titleModel.getBoxLayoutParams();
            layoutOption.width = groupRect.width;
            layoutOption.height = groupRect.height;
            var layoutRect = layout.getLayoutRect(
                layoutOption, {
                    width: api.getWidth(),
                    height: api.getHeight()
                }, titleModel.get('padding')
            );

            group.attr('position', [layoutRect.x, layoutRect.y]);

            this.renderText(titleModel, ecModel, group, api);
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

            // 绘制指北针
            this.textDraw(paraModel, ecModel, group, api, xyPix2[0], xyPix[1] - 5);
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
            if (fontSizeTmp > fontSizeOrg)
            {
                fontSizeTmp = fontSizeOrg;
            }
            var frameSpaceTmp = frameSpaceOrg * zoomFactor;
            var titleSpaceTmp = titleSpaceOrg * zoomFactor;
            //var _boudingRect = geo.coordinateSystem.getBoundingRect();
            var _boudingRect = geo.coordinateSystem._viewRect;

            var textEl = new graphic.Text({
                style: {
                    x: baseX,
                    y: baseY + textHeight + frameSpaceTmp + titleSpaceTmp,
                    fontFamily: textStyleModel.fontFamily,
                    fontSize: fontSizeTmp,
                    //fontWeight: "bold",
                    textAlign: paraModel.get('textAlign'),
                    textFill: paraModel.get('textStyle').color,
                    text: paraModel.get('text')
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

    hwchart.component.MapInfo = MapInfoView;
})