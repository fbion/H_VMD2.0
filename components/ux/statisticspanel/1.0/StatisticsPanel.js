Ext.define('vmd.ux.statisticsPanel.Controller', {
    xtype: 'vmd.ux.statisticsPanel.Controller',
    constructor: function(scope) {
        this.scope = scope;
        this.expression = '';
    },
    setValue: function(info) {
        this.expression = info.expression;
        this.scope.hwTextArea.setValue(this.expression)
    },
    serialize: function() {
        var json = {
            expression: this.expression
        }
        return json;
    }
})
Ext.define("vmd.ux.StatisticsPanel", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.StatisticsPanel",
    layoutConfig: {
        align: "left",
        pack: "start"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 300,
    height: 603,
    layout: "vbox",
    afterrender: "StatisticsPanel_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.StatisticsPanel_afterrender(this)
        }
    },
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
        this.controller = new vmd.ux.statisticsPanel.Controller(this);
        var page = this;
        //初始化后
        function StatisticsPanel_afterrender(sender) {}
        //获取控件初始JSON
        function initializeParams_Get() {
            return page.controller.initializeParams_Get();
        }
        //配置参数
        function setValue(configs) {
            page.controller.setValue(configs);
        }
        //序列化
        function serialize() {
            return page.controller.serialize();
        }

        function button_click(sender, e) {}

        function hwText_afterrender(sender) {}

        function hwTextArea_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var aceWin = new Ext.Window({
                    title: "表达式编辑",
                    id: "aceWin",
                    width: 500,
                    height: 350,
                    modal: true,
                    maximizable: true,
                    maskStyle: 'opacity:0.7',
                    layout: 'border',
                    draggable: false,
                    layout: 'fit',
                    items: [{
                        itemId: 'ace',
                        xtype: 'vmd.ace',
                        language: 'javascript'
                    }]
                });
                init_def_platformControlData();
                var ace = aceWin.getComponent('ace');
                aceWin.on('close', function() {
                    var newValue = ace.getValue()
                    hwTextArea.setValue(newValue);
                    xds.active.component.propPanel.controller.comp.statistics.
                    expression = hwTextArea.getValue();
                    page.fireEvent('settingChangedEvent')
                })
                aceWin.show()
                ace.setValue(hwTextArea.getValue())
            })
        }
        this.StatisticsPanel_afterrender = StatisticsPanel_afterrender;
        this.items = [{
            xtype: "vmd.div",
            id: "div",
            autoEl: "div",
            border: false,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 400,
            height: 273,
            layout: "absolute",
            margins: "0 0 0 10",
            items: [{
                    xtype: "textarea",
                    id: "hwTextArea",
                    allowBlank: true,
                    height: 101,
                    width: 250,
                    anchor: "",
                    afterrender: "hwTextArea_afterrender",
                    readOnly: true,
                    x: 20,
                    y: 35,
                    margins: "10 0 0 20",
                    listeners: {
                        vmdafterrender: hwTextArea_afterrender
                    }
                },
                {
                    xtype: "label",
                    id: "label",
                    text: "表达式：",
                    x: 10,
                    y: 10
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setValue = function(configs) {
            //直接填写方法内容
            setValue(configs);
        }
        this.serialize = function() {
            //直接填写方法内容
            return serialize()
        }
        this.initializeParams_Get = function() {
            //直接填写方法内容
            return initializeParams_Get();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.StatisticsPanel");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.StatisticsPanel");
    }
})