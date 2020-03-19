/**
 * HWcharts pattern fill plugin
 *
 * Author:         Torstein Honsi
 * Last revision:  2014-04-29
 * License:        MIT License
 *
 * Options:
 * - pattern:      The URL for a pattern image file
 * - width:        The width of the image file
 * - height:       The height of the image file
 * - color1:       In oldIE, bright colors in the pattern image are replaced by this color.
 *                 Not yet implemented in SVG.
 * - color2:       In oldIE, dark colors are replaced by this.
 */

/*global HWcharts */
(function(H) {

//    'use strict';

    var idCounter = 0,
        wrap = H.wrap,
        each = H.each;

    /**
     * 生成svg中的样式
     * @param type
     * @param width
     * @param height
     * @returns {*}
     */
    H.SVGRenderer.prototype.generatePattern = function(type, width, height){
        var symbolElement;
        switch (type){
            //斜线样式 \
            case 0:
                symbolElement = this.createElement('path').attr({
                    d: "M 0 0 L " + width + " " + height + " M " + (width - 1) + " -1 L " + (width + 1) + " 1 M -1 " + (height - 1) + " L 1 " + (height + 1)
                });
                break;
            //反斜线样式 /
            case 1:
                symbolElement = this.createElement('path').attr({
                    d: "M 0 " + height + " L " + width + " 0 M -1 1 L 1 -1 M " + (width - 1) + " " + (height + 1) + " L " + (width + 1) + " " + (height - 1)
                });
                break;
            //竖线 |
            case 2:
                symbolElement = this.createElement('path').attr({
                    d: "M " + width  / 2 + " 0 L " + width / 2 + " " + height
                });
                break;
            //横线 —
            case 3:
                symbolElement = this.createElement('path').attr({
                    d: "M 0 " + height / 2 + " L " + width + " " + height / 2
                });
                break;
            //十字线 十
            case 4:
                symbolElement = this.createElement('path').attr({
                    d: "M 0 " + height + " L 0 0 L " + width + " 0"
                });
                break;
            //交叉线 X
            case 5:
                symbolElement = this.createElement('path').attr({
                    d: "M 0 0 L " + width + " " + height + " M " + (width - 1) + " -1 L " + (width + 1) + " 1 M -1 " + (height - 1) + " L 1 " + (height + 1) +
                        " M 0 " + height + " L " + width + " 0 M -1 1 L 1 -1 M " + (width - 1) + " " + (height + 1) + " L " + (width + 1) + " " + (height - 1)
                });
                break;
            //砖线 ▓
            case 6:
                symbolElement = this.createElement('path').attr({
                    d: "M 1 0 L 1 " + height * 3 / 10 + " L " + width + " " + height * 3 / 10 + " M 1 " + height + " L 1 " + height * 8 / 10 +
                        " L " + width + " " + height * 8 / 10 + " M " + width * 6 / 10 + " " + height * 3 / 10 + " L " + width * 6 / 10 + " " + height * 8 / 10 + ""
                });
                break;
            //圆形 ○
            case 7:
                symbolElement = this.createElement('circle').attr({
                    cx: width / 2,
                    cy: height / 2,
                    r: Math.min(width, height) / 3.5
                });
                break;
        }
        return symbolElement;
    }

    //// SVG RENDERER
    H.SVGRenderer.prototype.addPattern = function (id, options) {
        var w = options.width || 8,
            h = options.height || 8,
            symbolElement = this.generatePattern(options.style, w, h),
            backColor = options.color2 || 'transparent',
            preColor = options.color1 || H.getOptions().colors[idCounter],
            id = id || ('hwcharts-pattern-'+idCounter++),

            pattern = this.createElement('pattern').attr({
                id: id,
                patternUnits: 'userSpaceOnUse',
                width: w,
                height: h
            }).add(this.defs);

        pattern.id = pattern.element.id;

        if (symbolElement) {
            this.createElement('path').attr({
                'd': 'M 0 0 L 0 '+h+' L '+w+' '+h+' L '+w+' 0 Z',
                'stroke-width': 0,
                'fill': backColor || '#FFFFFF'
            }).add(pattern);

            symbolElement.attr({
                'stroke': preColor,
                'stroke-width': options.lineWidth || 2,
                'fill': 'transparent'
            }).add(pattern);

            pattern.color = options.color;
        } else if (options.image) {
            this.image(options.image, 0, 0, w, h).add(pattern);
        } else if (options.color) {
            this.createElement('path').attr({
                'd': 'M 0 0 L 0 '+h+' L '+w+' '+h+' L '+w+' 0 Z',
                'fill': backColor || 'transparent',
                'stroke': preColor,
                'stroke-width': 0
            }).add(pattern);
        }
        return pattern;
    };

    H.wrap(H.SVGElement.prototype, 'fillSetter', function (proceed, color, prop, elem) {
        var renderer = this.renderer,
            pattern;

        if (color && color.pattern && prop === 'fill') {

            var style = getStyleForImage(color.pattern);

            if(style != null){
                color.style = style;
            }
            else{
                color.image = color.pattern;
            }

            pattern = renderer.addPattern(undefined, color);
            // 设置样式引用对象
            elem.setAttribute(prop, 'url(' + renderer.url + '#' + pattern.id + ')');

        } else {
            return proceed.call(this, color, prop, elem);
        }
    });

    if (Highcharts.VMLElement) {

        Highcharts.wrap(Highcharts.VMLRenderer.prototype.Element.prototype, 'fillSetter', function (proceed, color, prop, elem) {
            if (color && color.pattern && prop === 'fill') {

                elem.filled = color !== "none";

                // Remove previous fills
                if (elem.getElementsByTagName('fill').length) {
                    elem.removeChild(elem.getElementsByTagName('fill')[0]);
                }

                var markup;
                //如果svg中存在对应的样式，则可设置样式的颜色
                if(getStyleForImage(color.pattern) != null){
                    markup = ['<hcv:', prop, ' color="', color.color2 || "#FFFFFF", '" color2="',
                            color.color1 || H.getOptions().colors[idCounter], '" type="pattern" src="', color.pattern, '" />'].join('');
                    idCounter++;
                }
                //如果svg中不存在对应的样式，则使用原图片填充
                else{
                    markup = this.renderer.prepVML(['<', prop, ' type="tile" src="', color.pattern, '" />']);
                }

                elem.appendChild(
                    document.createElement(markup)
                );

                // Work around display bug on updating attached nodes
                if (elem.parentNode.nodeType === 1) {
                    elem.outerHTML = elem.outerHTML
                }

            } else {
                proceed.call(this, color, prop, elem);
            }
        });
    }

    /**
     * 获取图片在svg中对应的样式
     */
    function getStyleForImage(imagePath){
        var match = imagePath.match(/\/pattern\d.png/),
            style = match && match.length > 0 && parseInt(match[0].replace("/pattern",""));

        //svg中只有七中样式
        if(style !== undefined && style != null && style >= 0 && style <= 7){
            return style;
        }
        return null;
    }
})(Highcharts);