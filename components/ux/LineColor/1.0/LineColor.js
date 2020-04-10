Ext.define('vmd.ux.fontColor.Controller', {
    xtype: 'vmd.ux.fontColor.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.LineColor", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.LineColor",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 40,
    height: 30,
    layout: "fit",
    afterrender: "LineColor_afterrender",
    autoHeight: false,
    listeners: {
        vmdafterrender: function() {
            try {
                this.LineColor_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.LineColor'
                }, ex, 50);
            }
        }
    },
    uxCss: ".bg-color{    background-color: #000;}.x-color-palette em span{    width: 13px;    height: 13px;}.x-color-palette{    width:150px;    height: 160px;}",
    uxrequirecss: "[\"components/ux/linecolor/1.0/css/iconfont.css\"]",
    initComponent: function() {
        function resetCmpScope() {
            var cmpList = me._reloadCmpList;
            Ext.each(cmpList, function(name) {
                var cmpObj = eval(name);
                cmpObj && (cmpObj._beforeRender = function(_cmp) {
                    var id = vmd.core.getCmpId(_cmp);
                    id && eval(id + "= _cmp")
                })
            })
        }
        try {
            var page = this;
            var cValue;

            function hwDataView_click(sender, index, node, e) {
                if (index == 1) {
                    if (colorBox.hidden) {
                        var x = hwDataView.el.getRegion().left,
                            y = hwDataView.el.getRegion().top + 30;
                        colorBox.setPosition(x, y)
                        colorBox.show();
                    } else {
                        colorBox.hide();
                    }
                }
            }

            function showColor(value) {
                cValue = value;
                var colors = ['000000', '993300', '333300', '003300', '003366', '000080', '333399', '333333', '800000', 'FF6600', '808000', '008000', '008080', '0000FF', '666699', '808080', 'FF0000', 'FF9900', '99CC00', '339966', '33CCCC', '3366FF', '800080', '969696', 'FF00FF', 'FFCC00', 'FFFF00', '00FF00', '00FFFF', '00CCFF', '993366', 'C0C0C0', 'FF99CC', 'FFCC99', 'FFFF99', 'CCFFCC', 'CCFFFF', '99CCFF', 'CC99FF', 'FFFFFF', 'DDDDDD', 'EEEEEE'];
                if (value.indexOf("#") != -1) {
                    cValue = value.slice(1);
                }
                if (!isInArray(colors, cValue)) {
                    cValue = '';
                }
                var cp = new Ext.ColorPalette({
                    value: cValue,
                });
                cp.colors = colors;
                cp.render(colorBox.id);
                cp.on('select', function(palette, color) {
                    selectColor = "#" + color;
                    setBackColor(color);
                    page.fireEvent('lineColorChange', showColor, "#" + color);
                    colorBox.hide();
                });
            }
            // 设置图框背景颜色
            function setBackColor(selColor) {
                cValue = selColor;
                var c;
                vmd.taskRunner(function() {
                    if (hwDataView.el) {
                        return true
                    }
                }, function() {
                    if (selColor) {
                        if (selColor.indexOf('#') == -1) {
                            c = "#" + selColor;
                        } else {
                            c = selColor
                        }
                        hwDataView.all.elements[0].lastElementChild.style.backgroundColor = c;
                    }
                })
            }

            function LineColor_afterrender(sender) {
                // this.on('afterlayout', function() {
                Ext.getBody().appendChild(colorBox.el);
                // })
                Ext.getBody().on('click', function(e) {
                    if (!$(e.target).hasClass("color-click")) {
                        if (!colorBox.hidden) {
                            colorBox.hide();
                        }
                    }
                })
            }

            function colorBox_afterrender(sender) {
                showColor('');
            }

            function isInArray(arr, value) {
                for (var i = 0; i < arr.length; i++) {
                    if (value === arr[i]) {
                        return true;
                    }
                }
                return false;
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.LineColor',
                p2: ex.message
            }, ex, 100);
        }
        this.LineColor_afterrender = LineColor_afterrender;
        this.items = [{
                xtype: "vmd.dataview",
                id: "hwDataView",
                width: 40,
                height: 30,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: false,
                multiSelect: false,
                autoScroll: false,
                tpl: "<ul class=\"d-info\" style=\"display: inline-block;height: 36px;\">    <li class=\"info icon\" style=\"float:left;width: 24px;height:30px;padding: 0;margin:0\"> <i class=\"icon iconfont icon-iconset0137\" style=\" display:block;width:24px;height:20px;font-weight:bold;color:#333;text-align:center; line-height: 24px\"> </i>        <p class='bg-color' style=\"width:24px;height:4px;\"> </p>    </li>    <li class=\"info color-click\" style=\"float:left;width:10px;height:30px;margin-left:5px;padding:0\">        <p class=\"color-click\" style=\"width:10px;height:4px;\"> </p> <i class=\"icon-caret-down color-click\" style=\" display:inline-block;width:10px;height:10px; color:#646464;text-align:center; line-height: 10px;font-size:10px\"> </i>    </li></ul>",
                data: "var data = [{    \"id\": 1,    \"picname\": \"border-layout.gif\",    \"name\": \"Border Layout\",    \"desc\": \"方位布局\"}, {    \"id\": 2,    \"picname\": \"layout-accordion.gif\",    \"name\": \"Accordion Layout\",    \"desc\": \"手风琴布局\"}, {    \"id\": 3,    \"picname\": \"layout-anchor.gif\",    \"name\": \"Accordion Layout\",    \"desc\": \"百分比布局\"}, {    \"id\": 4,    \"picname\": \"layout-form.gif\",    \"name\": \"Absolute Layout\",    \"desc\": \"绝对定位布局\"}, {    \"id\": 5,    \"picname\": \"layout-column.gif\",    \"name\": \"Column Layout\",    \"desc\": \"列布局\"}, {    \"id\": 6,    \"picname\": \"layout-table.gif\",    \"name\": \"Table Layout\",    \"desc\": \"表格布局\"}];return data;",
                x: -1,
                y: 0,
                click: "hwDataView_click",
                listeners: {
                    click: hwDataView_click
                }
            },
            {
                xtype: "vmd.div",
                id: "colorBox",
                autoEl: "div",
                border: true,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 160,
                height: 140,
                style: "background-color: #fff;    z-index: 9999;    padding: 5px;",
                layout: "absolute",
                x: 0,
                y: 0,
                hidden: true,
                afterrender: "colorBox_afterrender",
                listeners: {
                    vmdafterrender: colorBox_afterrender
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setOriColor = function(selColor) {
            //直接填写方法内容
            setBackColor(selColor)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.LineColor");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.LineColor");
    }
})