Ext.define('vmd.ux.lineStyle.Controller', {
    xtype: 'vmd.ux.lineStyle.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.LineStyle", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.LineStyle",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 150,
    height: 28,
    layout: "fit",
    autoHeight: true,
    style: "z-index: 99;",
    afterrender: "LineStyle_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.LineStyle_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.LineStyle'
                }, ex, 50);
            }
        }
    },
    DataViewWidth: 150,
    LineBorder: false,
    uxCss: ".info{    height: 22px;    margin: 0 6px;}li.info-hover {    cursor: pointer;    background-color: #e6e6e6;}",
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
            var lineData = [{
                id: 'Solid',
                url: '/img/public/Solid.png'
            }, {
                id: 'ShortDash',
                url: '/img/public/ShortDash.png'
            }, {
                id: 'ShortDot',
                url: '/img/public/ShortDot.png'
            }, {
                id: 'ShortDashDot',
                url: '/img/public/ShortDashDot.png'
            }, {
                id: 'ShortDashDotDot',
                url: '/img/public/ShortDashDotDot.png'
            }, {
                id: 'Dot',
                url: '/img/public/Dot.png'
            }, {
                id: 'Dash',
                url: '/img/public/Dash.png'
            }, {
                id: 'LongDash',
                url: '/img/public/LongDash.png'
            }, {
                id: 'DashDot',
                url: '/img/public/DashDot.png'
            }, {
                id: 'LongDashDot',
                url: '/img/public/LongDashDot.png'
            }, {
                id: 'LongDashDotDot',
                url: '/img/public/LongDashDotDot.png'
            }]

            function lineDiv_click(sender, e) {
                if (myline.hidden) {
                    var x = lineDiv.el.getRegion().left,
                        y = lineDiv.el.getRegion().top + 28;
                    myline.setPosition(x, y)
                    myline.show();
                    Ext.getBody().appendChild(myline.el);
                } else {
                    myline.hide();
                }
                stopPP(e)
            }

            function hwDataView_click(sender, index, node, e) {
                var id = node.getAttribute('data-id');
                var url = node.getAttribute('data-url');
                selectValue = id;
                setBackground(id);
                myline.hide();
                page.fireEvent("lineStyleChange", hwDataView, id)
            }

            function setBackground(line) {
                selectValue = line;
                vmd.taskRunner(function() {
                    if (lineBox.el.dom) return true;
                }, function() {
                    var el = vmd.getElement(lineBox.id);
                    for (var i = 0; i < lineData.length; i++) {
                        if (lineData[i].id.toUpperCase() == line.toUpperCase()) {
                            var t = lineData[i].url
                            el.applyStyles('background:url(' + t + ')');
                            break
                        }
                    }
                })
            }

            function lineButton_click(sender, e) {}

            function LineStyle_afterrender(sender) {
                myline.on('afterlayout', function() {
                    Ext.getBody().appendChild(myline.el);
                })
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.LineStyle',
                p2: ex.message
            }, ex, 100);
        }
        this.LineStyle_afterrender = LineStyle_afterrender;
        this.items = [{
                xtype: "panel",
                id: "panel",
                title: "Panel",
                header: false,
                border: false,
                height: 28,
                layout: "fit",
                width: 100,
                x: 1,
                y: 1,
                region: "center",
                items: [{
                    xtype: "vmd.div",
                    id: "lineBox",
                    autoEl: "div",
                    border: this.LineBorder,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: 140,
                    height: 24,
                    x: 0,
                    y: 0,
                    region: "center",
                    click: "lineDiv_click",
                    style: "padding-left: 8px;",
                    html: "<div id=\"lineBox\" style=\"height:100%\"></div>",
                    layout: "border",
                    listeners: {
                        click: lineDiv_click
                    },
                    items: [{
                            xtype: "vmd.div",
                            id: "lineDiv",
                            autoEl: "div",
                            border: true,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 50,
                            region: "center",
                            style: "border: 0;"
                        },
                        {
                            xtype: "vmd.button",
                            id: "lineButton",
                            type: "(none)",
                            size: "small",
                            x: 132,
                            y: -1,
                            width: 22,
                            style: "border-radius: 0;    background-size: 100%;    background-position: right;    border: 0;    float: right;    /*background: #fff url(\"/img/public/dhxcombo_arrow_down.gif\") 12px center;*/    /*background-repeat: no-repeat;*/    z-index: 99;    font-size: 14px;    color: #646464;",
                            icon: " icon-caret-down",
                            height: 24,
                            region: "east",
                            click: "lineButton_click",
                            listeners: {
                                click: lineButton_click
                            }
                        }
                    ]
                }]
            },
            {
                xtype: "vmd.div",
                id: "myline",
                autoEl: "div",
                border: true,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 150,
                height: 130,
                x: 0,
                y: 0,
                hidden: true,
                layout: "auto",
                autoHeight: false,
                autoWidth: true,
                region: "west",
                style: "background-color: #fff;    z-index: 9999;    position: absolute;",
                items: [{
                    xtype: "vmd.dataview",
                    id: "hwDataView",
                    width: this.DataViewWidth,
                    height: 125,
                    itemSelector: "li.info",
                    overClass: "info-hover",
                    selectedClass: "x-view-selected",
                    singleSelect: true,
                    multiSelect: true,
                    autoScroll: true,
                    tpl: "<ul class=\"d-info\">    <tpl for=\".\">        <li class=\"info\" data-id=\"{id}\" data-url=\"{url}\" style=\"background-image:url('{url}')\"></li>    </tpl></ul>",
                    data: "var data = [{    id: 'Solid',    url: '/img/public/Solid.png'}, {    id: 'ShortDash',    url: '/img/public/ShortDash.png'}, {    id: 'ShortDot',    url: '/img/public/ShortDot.png'}, {    id: 'ShortDashDot',    url: '/img/public/ShortDashDot.png'}, {    id: 'ShortDashDotDot',    url: '/img/public/ShortDashDotDot.png'}, {    id: 'Dot',    url: '/img/public/Dot.png'}, {    id: 'Dash',    url: '/img/public/Dash.png'}, {    id: 'LongDash',    url: '/img/public/LongDash.png'}, {    id: 'DashDot',    url: '/img/public/DashDot.png'}, {    id: 'LongDashDot',    url: '/img/public/LongDashDot.png'}, {    id: 'LongDashDotDot',    url: '/img/public/LongDashDotDot.png'}];return data;",
                    click: "hwDataView_click",
                    style: "width: 100%;    background-color: #ffffff;    opacity: 1;",
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
        this.setOriLine = function(line) {
            //直接填写方法内容
            setBackground(line)
        }
        this.getLine = function() {
            //直接填写方法内容
            return selectValue
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.LineStyle");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.LineStyle");
    }
})