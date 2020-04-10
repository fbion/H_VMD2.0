Ext.define('vmd.ux.alignWebGroup.Controller', {
    xtype: 'vmd.ux.alignWebGroup.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.AlignWebGroup", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.AlignWebGroup",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 100,
    height: 32,
    layout: "fit",
    afterrender: "AlignWebGroup_afterrender",
    beforerender: "AlignWebGroup_beforerender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.AlignWebGroup_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.AlignWebGroup'
                }, ex, 50);
            }
        },
        beforerender: function() {
            try {
                this.AlignWebGroup_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.AlignWebGroup'
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
            var value = 'left';
            var AlignWebGroupsende;

            function setValue(value) {
                vmd.taskRunner(function() {
                    if (btnLeft.el && btnRight.el) return true;
                }, function() {
                    if (value == "left") {
                        btnLeft.removeClass("btn-selected");
                        btnCenter.removeClass("btn-selected");
                        btnRight.removeClass("btn-selected");
                        btnLeft.addClass("btn-selected");
                        setNoHChecked();
                        btnLeft.checked = true;
                    } else if (value == "center" || value == "centter") {
                        btnLeft.removeClass("btn-selected");
                        btnCenter.removeClass("btn-selected");
                        btnRight.removeClass("btn-selected");
                        btnCenter.addClass("btn-selected");
                        setNoHChecked();
                        btnCenter.checked = true;
                    } else if (value = "right") {
                        btnLeft.removeClass("btn-selected");
                        btnCenter.removeClass("btn-selected");
                        btnRight.removeClass("btn-selected");
                        btnRight.addClass("btn-selected");
                        setNoHChecked();
                        btnRight.checked = true;
                    }
                })
            }

            function AlignWebGroup_afterrender(sender) {
                AlignWebGroupsende = sender;
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
                    if (btnName == "btnLeft") {
                        btnLeft.removeClass("btn-selected");
                        btnCenter.removeClass("btn-selected");
                        btnRight.removeClass("btn-selected");
                        value = "left";
                        setNoHChecked();
                        btnLeft.checked = true;
                    } else if (btnName == "btnCenter") {
                        btnLeft.removeClass("btn-selected");
                        btnCenter.removeClass("btn-selected");
                        btnRight.removeClass("btn-selected");
                        value = "center";
                        setNoHChecked();
                        btnCenter.checked = true;
                    } else if (btnName = "btnRight") {
                        btnLeft.removeClass("btn-selected");
                        btnCenter.removeClass("btn-selected");
                        btnRight.removeClass("btn-selected");
                        value = "right";
                        setNoHChecked();
                        btnRight.checked = true;
                    }
                    vmd(curEl).addClass('btn-selected');
                    page.fireEvent('change', AlignWebGroupsende, value)
                })
            }

            function setNoHChecked() {
                btnLeft.checked = false;
                btnCenter.checked = false;
                btnRight.checked = false;
            }

            function AlignWebGroup_beforerender(sender) {
                setNoHChecked();
                btnLeft.addClass("btn-selected");
                btnLeft.checked = true;
            }

            function panel_afterrender(sender) {
                //setSeletedCheck();
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.AlignWebGroup',
                p2: ex.message
            }, ex, 100);
        }
        this.AlignWebGroup_afterrender = AlignWebGroup_afterrender;
        this.AlignWebGroup_beforerender = AlignWebGroup_beforerender;
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
                    id: "btnLeft",
                    type: "(none)",
                    size: "small",
                    x: 0,
                    y: 0,
                    width: 30,
                    style: "background-image: url('/system/img/report/AlignLeft.png');    background-position: center;  background-repeat: no-repeat;",
                    cls: "btnStyle"
                },
                {
                    xtype: "vmd.button",
                    id: "btnCenter",
                    type: "(none)",
                    size: "small",
                    x: 30,
                    y: 0,
                    width: 30,
                    style: "background-image:  url('/system/img/report/AlignCenter.png');    background-position: center;    background-repeat: no-repeat;",
                    cls: "btnStyle",
                    hidden: this.hidenCenter
                },
                {
                    xtype: "vmd.button",
                    id: "btnRight",
                    type: "(none)",
                    size: "small",
                    x: 60,
                    y: 0,
                    width: 30,
                    style: "background-image:  url('/system/img/report/AlignRight.png');    background-position: center;    background-repeat: no-repeat;",
                    cls: "btnStyle"
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
            var value = "left";
            if (btnLeft.checked) {
                value = "left";
            } else if (btnCenter.checked) {
                value = "center";
            } else if (btnRight.checked) {
                value = "right";
            }
            return value;
        }
        this.setValue = function(align) {
            //直接填写方法内容
            setValue(align);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.AlignWebGroup");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AlignWebGroup");
    }
})