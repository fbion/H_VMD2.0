Ext.define('vmd.ux.buttonGroup.Controller', {
    xtype: 'vmd.ux.buttonGroup.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ButtonGroup", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ButtonGroup",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 254,
    height: 38,
    layout: "anchor",
    afterrender: "ButtonGroup_afterrender",
    beforerender: "ButtonGroup_beforerender",
    cls: "buttongroup_ct",
    listeners: {
        vmdafterrender: function() {
            try {
                this.ButtonGroup_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.ButtonGroup'
                }, ex, 50);
            }
        },
        beforerender: function() {
            try {
                this.ButtonGroup_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.ButtonGroup'
                }, ex, 50);
            }
        }
    },
    uxCss: "button.buttongroup {    border-radius: 0;    height: 20px;    text-align: center;    padding: 3px 10px;    background-color: #ffffff;    font-size: 12px}button.vmd-button-selected.selected {    border-radius: 0;    height: 20px;    text-align: center;    padding: 3px 10px;    /*background-color: #99b4c1;*/    color: #ffffff;    background-color: #409eff;    border-color: #409eff;    box-shadow: -1px 0 0 0 #409eff;}.mourseover {    border-radius: 0;    height: 20px;    text-align: center;    padding: 3px 10px;    /*color: #409eff;*/    color: #20a0ff;    border-color: #20a0ff;}.hover {    color: #fff}.focus {    color: #fff;}.font12 {    font-size: 12px;}",
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

            function ButtonGroup_afterrender(sender) {
                // 按钮个数
                if (!panel.count)
                    panel.count = 1;
                var textValue = [];
                // 按钮显示值
                if (!panel.text) {
                    for (var i = 0; i < panel.count; i++) {
                        textValue.push("button" + (i + 1));
                    }
                } else {
                    var t = panel.text.split(',')
                    if (t.length > 0) {
                        for (var j = 0; j < t.length; j++) {
                            textValue.push(t[j]);
                        }
                        if (t.length < panel.count) {
                            for (var c = -0; c < panel.count - t.length; c++) {
                                textValue.push("button" + (c + 1));
                            }
                        }
                    }
                }
                // 选中效果
                if (!panel.selectIndex) {
                    panel.selectIndex = 1;
                }
                for (var i = 0; i < panel.count; i++) {
                    var s = "";
                    if (i == panel.selectIndex - 1) {
                        s = "selected";
                    }
                    var button_test = new vmd.comp.button({
                        // id: "button" + (i + 1).toString(),
                        text: textValue[i],
                        cls: 'buttongroup ' + s,
                        selectIndex: (i + 1),
                    });
                    panel.add(button_test);
                }
                this.doLayout();
                var buttongroups = vmd(panel.el.dom).find(".buttongroup");
                // 鼠标点击事件
                buttongroups.on('click', function(e) {
                    buttongroups.removeClass("selected")
                    var curEl = e.currentTarget;
                    vmd(curEl).addClass('selected');
                    panel.selectIndex = Ext.getCmp(e.currentTarget.id).selectIndex;
                    //
                    page.fireEvent('click', panel, panel.selectIndex);
                    // change事件
                    page.fireEvent('change', page, panel.selectIndex);
                })
                /*
                .hover(function(e) {
                    var curEl = e.currentTarget;
                    vmd(curEl).addClass('mourseover');
                }, function(e) {
                    var curEl = e.currentTarget;
                    vmd(curEl).removeClass('mourseover');
                })
                */
            }

            function setIndex(index) {
                // 
                panel.selectIndex = index;
                var buttongroups = vmd(panel.el.dom).find(".buttongroup");
                buttongroups.removeClass("selected")
                buttongroups.removeClass("vmd-button-selected")
                if (buttongroups.length > 0) {
                    for (var key = 0; key < buttongroups.length; key++) {
                        var text = buttongroups[key].id;
                        if (Ext.getCmp(text).selectIndex == index) {
                            vmd(buttongroups[key]).addClass('vmd-button-selected');
                            vmd(buttongroups[key]).addClass('selected');
                        }
                    }
                }
            }

            function ButtonGroup_beforerender(sender) {
                //this.autoWidth=true;
            }

            function panel_afterrender(sender) {
                // panel.addClass('font12')
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ButtonGroup',
                p2: ex.message
            }, ex, 100);
        }
        this.ButtonGroup_afterrender = ButtonGroup_afterrender;
        this.ButtonGroup_beforerender = ButtonGroup_beforerender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: false,
            height: 30,
            layout: "anchor",
            autoWidth: false,
            autoHeight: false,
            afterrender: "panel_afterrender",
            listeners: {
                vmdafterrender: panel_afterrender
            },
            count: this.count,
            text: this.text,
            selectIndex: this.selectIndex
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getSelectIndex = function() {
            //直接填写方法内容
            return panel.selectIndex;
        }
        this.setSelectIndex = function(index) {
            //直接填写方法内容
            setIndex(index);
        }
        this.setValue = function(index) {
            //直接填写方法内容
            setIndex(index);
        }
        this.getValue = function() {
            //直接填写方法内容
            return panel.selectIndex;
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ButtonGroup");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ButtonGroup");
    }
})