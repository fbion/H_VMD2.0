Ext.define('vmd.ux.topTitle.Controller', {
    xtype: 'vmd.ux.topTitle.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.FontSeting", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.FontColor$1.0$FontColor", "vmd.ux.FontFamitylist$1.0$FontFamitylist", "vmd.ux.FontSizelist$1.0$FontSizelist"]),
    version: "1.0",
    xtype: "vmd.ux.FontSeting",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 280,
    height: 47,
    layout: "fit",
    afterrender: "FontSeting_afterrender",
    style: "/*border-bottom: 1px solid #ddd;*/",
    autoHeight: true,
    listeners: {
        vmdafterrender: function() {
            try {
                this.FontSeting_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.FontSeting'
                }, ex, 50);
            }
        }
    },
    fontStyleIsShow: false,
    uxCss: ".node-color{    background-color: #eee;}",
    uxrequirecss: "[\"components/ux/toptitle/1.0/css/iconfont.css\"]",
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
            LazyLoad.css(vmd.virtualPath + '/components/ux/toptitle/1.0/css/iconfont.css');
            var page = this;
            var styleObj = {
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: "Microsoft YaHei", // 字体
                fontSize: 12, // 字号
                color: "#000", // 颜色
            }
            var FontSeting = null;
            // 鼠标移入显示标题
            function FontSeting_afterrender(sender) {
                FontSeting = sender;
                vmd.utils.tooltip("[data-tooltip]");
            }
            // 字体设置
            function FontFamitylist_fontChagen(sender, font) {
                page.fireEvent("fontFamityChange", sender, font);
                styleObj.fontFamily = font;
                page.fireEvent("change", FontSeting, styleObj);
            }
            // 字号设置
            function FontSizelist_fontChagen(sender, font) {
                page.fireEvent("fontSizeChange", sender, font);
                styleObj.fontSize = parseFloat(font);
                page.fireEvent("change", FontSeting, styleObj);
            }
            // 颜色设置
            function hwFontColor_fontColorChange(sender, color) {
                page.fireEvent("fontColorChange", sender, color);
                styleObj.color = color;
                page.fireEvent("change", FontSeting, styleObj);
            }
            // 字形设置
            function hwDataView1_click(sender, index, node, e) {
                var off = node.getAttribute('data-off'); // 定义变量记录属性变化
                if (index === 0) {
                    if (off === "0") { // 加粗
                        styleObj.fontWeight = 'bold';
                        node.setAttribute('data-off', '1')
                    } else if (off === "1") {
                        styleObj.fontWeight = 'normal';
                        node.setAttribute('data-off', '0');
                    }
                    $(node).toggleClass("node-color");
                }
                if (index === 1) {
                    if (off === "0") { // 倾斜
                        styleObj.fontStyle = 'italic';
                        node.setAttribute('data-off', '1')
                    } else if (off === "1") {
                        styleObj.fontStyle = 'normal';
                        node.setAttribute('data-off', '0')
                    }
                    $(node).toggleClass("node-color");
                }
                page.fireEvent("change", FontSeting, styleObj);
            }

            function setOri(obj) {
                styleObj = obj;
                FontFamitylist.setOriFont(obj.fontFamily);
                FontSizelist.setOriFont(obj.fontSize);
                hwFontColor.setOriColor(obj.color);
                if (obj.fontWeight === 'bold') {
                    $(hwDataView1.all.elements[0]).addClass("node-color");
                } else {
                    $(hwDataView1.all.elements[0]).removeClass("node-color");
                }
                if (obj.fontStyle === 'italic') {
                    $(hwDataView1.all.elements[1]).addClass("node-color");
                } else {
                    $(hwDataView1.all.elements[1]).removeClass("node-color");
                }
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.FontSeting',
                p2: ex.message
            }, ex, 100);
        }
        this.FontSeting_afterrender = FontSeting_afterrender;
        this.items = [{
            xtype: "vmd.div",
            id: "div3",
            autoEl: "div",
            border: false,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 280,
            height: 30,
            layout: "column",
            items: [{
                    xtype: "vmd.dataview",
                    id: "hwDataView1",
                    width: 70,
                    height: 30,
                    itemSelector: "li.info",
                    overClass: "info-hover",
                    selectedClass: "x-view-selected",
                    singleSelect: false,
                    multiSelect: false,
                    autoScroll: false,
                    tpl: "<ul class=\"d-info\" style=\"display: inline-block;height: 36px;\">    <tpl for=\".\">        <li class=\"info\" data-off=\"0\" data-id=\"{id}\" data-tooltip=\"{title}\" style=\"display: inline-block; width: 18px;height: 18px;  padding: 4px 4px 10px 4px;margin: 0;\"> <i class=\"iconfont {id}\" style=\" display:inline-block;width: 100%;height: 100%;font-weight:bold;color:#333;text-align:center\"> </i> </li>    </tpl></ul>",
                    data: "var data = [{    id: \"icon-jiacu-\",    title: \"加粗\"}, {    id: \"icon-qingxie-\",    title: \"倾斜\"}];return data;",
                    x: 200,
                    y: 0,
                    click: "hwDataView1_click",
                    hidden: this.fontStyleIsShow,
                    listeners: {
                        click: hwDataView1_click
                    }
                },
                {
                    xtype: "vmd.ux.FontColor",
                    id: "hwFontColor",
                    layout: "fit",
                    x: 150,
                    y: 0,
                    width: 40,
                    fontColorChange: "hwFontColor_fontColorChange",
                    listeners: {
                        fontColorChange: hwFontColor_fontColorChange
                    },
                    hidden: this.fontColorIsShow
                },
                {
                    xtype: "vmd.ux.FontFamitylist",
                    id: "FontFamitylist",
                    layout: "fit",
                    width: 90,
                    y: 0,
                    fontChagen: "FontFamitylist_fontChagen",
                    listeners: {
                        fontChagen: FontFamitylist_fontChagen
                    }
                },
                {
                    xtype: "vmd.ux.FontSizelist",
                    id: "FontSizelist",
                    layout: "fit",
                    x: 95,
                    y: 0,
                    width: 50,
                    fontChagen: "FontSizelist_fontChagen",
                    listeners: {
                        fontChagen: FontSizelist_fontChagen
                    }
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setValue = function(obj) {
            //直接填写方法内容
            setOri(obj)
        }
        this.getValue = function() {
            //直接填写方法内容
            getValue()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.FontSeting");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FontSeting");
    }
})