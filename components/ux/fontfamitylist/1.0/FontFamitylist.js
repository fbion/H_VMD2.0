Ext.define('vmd.ux.fontFamitylist.Controller', {
    xtype: 'vmd.ux.fontFamitylist.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.FontFamitylist", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.FontFamitylist",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 142,
    height: 28,
    layout: "fit",
    autoHeight: false,
    style: "z-index: 99;",
    afterrender: "FontFamitylist_afterrender",
    beforerender: "FontFamitylist_beforerender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.FontFamitylist_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.FontFamitylist'
                }, ex, 50);
            }
        },
        beforerender: function() {
            try {
                this.FontFamitylist_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.FontFamitylist'
                }, ex, 50);
            }
        }
    },
    uxCss: ".info{    height: 24px;    padding:2px 8px;    line-height: 24px;}li.info-hover {    cursor: pointer;    background-color: #e6e6e6;}",
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
            var isCp = false,
                value = '',
                selectValue = '';
            var page = this
            var fontData = [{
                EnName: 'Simsun',
                name: '宋体'
            }, {
                EnName: 'SimHei',
                name: '黑体'
            }, {
                EnName: 'KaiTi',
                name: '楷体'
            }, {
                EnName: 'Microsoft YaHei',
                name: '微软雅黑'
            }, {
                EnName: 'STKaiti',
                name: '华文楷体'
            }, {
                EnName: 'STSong',
                name: '华文宋体'
            }, {
                EnName: 'STFangsong',
                name: '华文仿宋'
            }, {
                EnName: 'STHeiti Light',
                name: '华文细黑'
            }, {
                EnName: 'Arial',
                name: 'Arial'
            }, {
                EnName: 'Verdana',
                name: 'Verdana'
            }, {
                EnName: 'Tahoma',
                name: 'Tahoma'
            }, {
                EnName: 'Trebuchet MS',
                name: 'Trebuchet MS'
            }, {
                EnName: 'Georgia',
                name: 'Georgia'
            }, {
                EnName: 'Times New Roman',
                name: 'Times New Roman'
            }, {
                EnName: 'Garamond',
                name: 'Garamond'
            }]

            function hwDataView_click(sender, index, node, e) {
                var id = node.getAttribute('data-id');
                selectValue = id;
                setDivValue(id);
                myFamity.hide();
                page.fireEvent("fontChagen", hwDataView, id)
            }

            function setDivValue(font) {
                selectValue = font;
                //var el = vmd.getElement('famityBox');
                vmd.taskRunner(function() {
                    if (fmaityDiv.el) return true;
                }, function() {
                    for (var i = 0; i < fontData.length; i++) {
                        if (fontData[i].EnName.toUpperCase() == font.toUpperCase()) {
                            var t = fontData[i].name;
                            fmaityDiv.update(t)
                            //el.dom.innerText = t;
                            fmaityDiv.el.applyStyles('font-family:' + t);
                            break
                        }
                    }
                })
            }

            function FontFamitylist_afterrender(sender) {
                Ext.getBody().on('click', function(e) {
                    if (!$(e.target).attr("id") || $(e.target).attr("id").indexOf("fmaityDiv") == -1) {
                        if (!myFamity.hidden) {
                            myFamity.hide();
                        }
                    }
                })
            }

            function famityBox_click(sender, e) {
                if (myFamity.hidden) {
                    myFamity.show();
                    var x = famityBox.el.getRegion().left,
                        y = famityBox.el.getRegion().top + 30;
                    myFamity.setPosition(x, y)
                } else {
                    myFamity.hide();
                }
                stopPP(e)
                // if ($(e.target).hasClass("icon-caret-down")) {
                //     stopPP(e)
                // }
            }

            function famityBox_afterrender(sender) {
                $(famityBox.el.dom.lastElementChild).remove();
            }

            function FontFamitylist_beforerender(sender) {
                this.on('afterlayout', function() {
                    Ext.getBody().appendChild(myFamity.el);
                })
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.FontFamitylist',
                p2: ex.message
            }, ex, 100);
        }
        this.FontFamitylist_afterrender = FontFamitylist_afterrender;
        this.FontFamitylist_beforerender = FontFamitylist_beforerender;
        this.items = [{
                xtype: "panel",
                id: "panel",
                title: "Panel",
                header: false,
                border: false,
                height: 28,
                layout: "fit",
                width: 160,
                x: 1,
                y: 1,
                hidden: false,
                items: [{
                    xtype: "vmd.div",
                    id: "famityBox",
                    autoEl: "div",
                    border: false,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: 140,
                    height: 24,
                    x: 0,
                    y: 0,
                    region: "center",
                    click: "famityBox_click",
                    style: "padding-left: 8px;    /*border: 1px solid #ddd;*/    line-height: 24px;    font-size: 13px;    color: #646464;",
                    html: "<div id=\"famityBox\" style=\"height:100%\">微软雅黑</div>",
                    layout: "border",
                    afterrender: "famityBox_afterrender",
                    listeners: {
                        click: famityBox_click,
                        vmdafterrender: famityBox_afterrender
                    },
                    items: [{
                            xtype: "vmd.div",
                            id: "fmaityDiv",
                            autoEl: "div",
                            border: true,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 24,
                            region: "center",
                            style: "border: 0;"
                        },
                        {
                            xtype: "vmd.button",
                            id: "famityButton",
                            type: "(none)",
                            size: "small",
                            x: 132,
                            y: -1,
                            width: 22,
                            style: "border-radius: 0;    background-size: 100%;    background-position: right;    border: 0;    float: right;    /*background: #fff url(\"/img/public/dhxcombo_arrow_down.gif\") 12px center;*/    /*background-repeat: no-repeat;*/    /*z-index: 99;*/    color: rgb(158, 161, 164);",
                            icon: "icon-caret-down",
                            height: 24,
                            region: "east"
                        }
                    ]
                }]
            },
            {
                xtype: "vmd.div",
                id: "myFamity",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 130,
                height: 160,
                x: 0,
                y: 0,
                hidden: true,
                layout: "absolute",
                autoHeight: true,
                autoWidth: false,
                region: "west",
                style: "width: 100%;    background-color: #fff;    z-index: 9999;    position: absolute;",
                items: [{
                    xtype: "vmd.dataview",
                    id: "hwDataView",
                    width: 130,
                    height: 150,
                    itemSelector: "li.info",
                    overClass: "info-hover",
                    selectedClass: "x-view-selected",
                    singleSelect: true,
                    multiSelect: true,
                    autoScroll: true,
                    tpl: "<ul class=\"d-info\" style=\"padding-top:8px; border:1px solid #ddd\">    <tpl for=\".\">        <li class=\"info\" data-id=\"{EnName}\" style=\"font-family:'{EnName}';padding-left:8px;font-size:13px;color:#646464\">{name}</li>    </tpl></ul>",
                    data: "var data = [{    EnName: 'Simsun',    name: '宋体'}, {    EnName: 'SimHei',    name: '黑体'}, {    EnName: 'KaiTi',    name: '楷体'}, {    EnName: 'Microsoft YaHei',    name: '微软雅黑'}, {    EnName: 'STKaiti',    name: '华文楷体'}, {    EnName: 'STSong',    name: '华文宋体'}, {    EnName: 'STFangsong',    name: '华文仿宋'}, {    EnName: 'STHeiti Light',    name: '华文细黑'}, {    EnName: 'Arial',    name: 'Arial'}, {    EnName: 'Verdana',    name: 'Verdana'}, {    EnName: 'Tahoma',    name: 'Tahoma'}, {    EnName: 'Trebuchet MS',    name: 'Trebuchet MS'}, {    EnName: 'Georgia',    name: 'Georgia'}, {    EnName: 'Times New Roman',    name: 'Times New Roman'}, {    EnName: 'Garamond',    name: 'Garamond'}];return data;",
                    click: "hwDataView_click",
                    style: "width: 100%;    background-color: #ffffff;    opacity: 1;",
                    autoHeight: false,
                    listeners: {
                        click: hwDataView_click
                    }
                }]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setOriFont = function(font) {
            //直接填写方法内容
            setDivValue(font)
        }
        this.getFont = function() {
            //直接填写方法内容
            return selectValue
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.FontFamitylist");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FontFamitylist");
    }
})