Ext.define('vmd.ux.alignWebGroup.Controller', {
    xtype: 'vmd.ux.alignWebGroup.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.VerticalWebGroup", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.VerticalWebGroup",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 100,
    height: 32,
    layout: "fit",
    afterrender: "VerticalWebGroup_afterrender",
    beforerender: "VerticalWebGroup_beforerender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.VerticalWebGroup_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.VerticalWebGroup'
                }, ex, 50);
            }
        },
        beforerender: function() {
            try {
                this.VerticalWebGroup_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.VerticalWebGroup'
                }, ex, 50);
            }
        }
    },
    uxCss: ".btnStyle {      border-radius: 0;      background-color: #ffffff;       }      .btn-selected{    border-radius: 0;    background-color: #99b4c1;}",
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
            var value = "middle"
            var VerticalWebGroupSend;

            function setValue(value) {
                vmd.taskRunner(function() {
                    if (btnTop.el && btnBottom.el) return true;
                }, function() {
                    if (value == "top") {
                        btnTop.removeClass("btn-selected");
                        btnMiddle.removeClass("btn-selected");
                        btnBottom.removeClass("btn-selected");
                        btnTop.addClass("btn-selected");
                        setNoVChecked();
                        btnTop.checked = true;
                    } else if (value == "middle") {
                        btnTop.removeClass("btn-selected");
                        btnMiddle.removeClass("btn-selected");
                        btnBottom.removeClass("btn-selected");
                        btnMiddle.addClass("btn-selected");
                        setNoVChecked();
                        btnMiddle.checked = true;
                    } else if (value == "bottom") {
                        btnTop.removeClass("btn-selected");
                        btnMiddle.removeClass("btn-selected");
                        btnBottom.removeClass("btn-selected");
                        btnBottom.addClass("btn-selected");
                        setNoVChecked();
                        btnBottom.checked = true;
                    }
                })
            }

            function VerticalWebGroup_afterrender(sender) {
                VerticalWebGroupSend = sender
                // panel
                setSeletedCheck();
            }

            function setSeletedCheck() {
                // 
                var buttongroups = vmd(panel.el.dom).find(".btnStyle");
                // 鼠标点击事件
                buttongroups.on('click', function(e) {
                    // buttongroups.removeClass("btn-selected")
                    // 
                    var curEl = e.currentTarget;
                    // 
                    var btnName = Ext.getCmp(e.currentTarget.id).initialConfig.id;
                    if (btnName == "btnTop") {
                        btnTop.removeClass("btn-selected");
                        btnMiddle.removeClass("btn-selected");
                        btnBottom.removeClass("btn-selected");
                        setNoVChecked();
                        value = "top";
                        btnTop.checked = true;
                    } else if (btnName == "btnMiddle") {
                        value = "middle";
                        btnTop.removeClass("btn-selected");
                        btnMiddle.removeClass("btn-selected");
                        btnBottom.removeClass("btn-selected");
                        setNoVChecked();
                        btnMiddle.checked = true;
                    } else if (btnName == "btnBottom") {
                        value = "bottom";
                        btnTop.removeClass("btn-selected");
                        btnMiddle.removeClass("btn-selected");
                        btnBottom.removeClass("btn-selected");
                        setNoVChecked();
                        btnBottom.checked = true;
                    }
                    vmd(curEl).addClass('btn-selected');
                    page.fireEvent('change', VerticalWebGroupSend, value)
                })
            }

            function setNoVChecked() {
                btnTop.checked = false;
                btnMiddle.checked = false;
                btnBottom.checked = false;
            }

            function VerticalWebGroup_beforerender(sender) {
                setNoVChecked();
                btnMiddle.addClass("btn-selected");
                btnMiddle.checked = true;
            }

            function panel_afterrender(sender) {
                //setSeletedCheck();
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.VerticalWebGroup',
                p2: ex.message
            }, ex, 100);
        }
        this.VerticalWebGroup_afterrender = VerticalWebGroup_afterrender;
        this.VerticalWebGroup_beforerender = VerticalWebGroup_beforerender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: false,
            height: 100,
            layout: "auto",
            afterrender: "panel_afterrender",
            listeners: {
                vmdafterrender: panel_afterrender
            },
            items: [{
                    xtype: "vmd.button",
                    id: "btnTop",
                    type: "(none)",
                    size: "small",
                    x: 0,
                    y: 0,
                    width: 30,
                    cls: "btnStyle",
                    style: "background-image: url('/system/img/report/AlignTop.png');    background-repeat: no-repeat;    background-position: center;"
                },
                {
                    xtype: "vmd.button",
                    id: "btnMiddle",
                    type: "(none)",
                    size: "small",
                    x: 30,
                    y: 0,
                    width: 30,
                    cls: "btnStyle",
                    style: "background-image: url('/system/img/report/AlignMiddle.png');    background-repeat: no-repeat;    background-position: center;",
                    hidden: this.hidenCenter
                },
                {
                    xtype: "vmd.button",
                    id: "btnBottom",
                    type: "(none)",
                    size: "small",
                    x: 60,
                    y: 0,
                    width: 30,
                    cls: "btnStyle",
                    style: "background-image: url('/system/img/report/AlignBottom.png');    background-repeat: no-repeat;    background-position: center;"
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getValue = function() {
            //直接填写方法内容
            var value = "middle";
            if (btnTop.checked) {
                obj.VAlign.value = "top";
            } else if (btnMiddle.checked) {
                obj.VAlign.value = "middle";
            } else if (btnBottom.checked) {
                obj.VAlign.value = "bottom";
            }
            return value;
        }
        this.setValue = function(align) {
            //直接填写方法内容
            setValue(align);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.VerticalWebGroup");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.VerticalWebGroup");
    }
})