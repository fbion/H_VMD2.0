Ext.define("vmd.ux.ResourceList", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ResourceList",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 720,
    height: 36,
    layout: "absolute",
    uxCss: ".resource-group {    padding: 0 5px;    font-size: 14px;    color: #646464;}.resource-group:hover .resource-btn {    visibility: visible;}.resource-btn {    visibility: hidden;}",
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

            function button_click(sender, e) {
                //记录日志信息 
                //vmd.webBase.syslog(loginfo,logtype,operationtype,function(res){}) 
                //判断是够需要移除，并添加事件监听
                page.fireEvent('edit', e)
            }

            function button1_click(sender, e) {
                //记录日志信息 
                //vmd.webBase.syslog(loginfo,logtype,operationtype,function(res){})
                //判断是够需要移除，并添加事件监听
                Ext.Msg.confirm("提示!", "确定要移除?", function(btn) {
                    if (btn == "yes") {
                        page.fireEvent('delete', e)
                    }
                })
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ResourceList',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
            xtype: "vmd.div",
            id: "hwDiv",
            layoutConfig: {
                align: "middle"
            },
            autoEl: "div",
            border: false,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 720,
            height: 35,
            cls: "resource-group",
            layout: "hbox",
            items: [{
                    xtype: "label",
                    id: "hwLabel",
                    text: "1.资源地址：",
                    width: 100,
                    style: "text-align: right"
                },
                {
                    xtype: "textfield",
                    id: "hwText",
                    allowBlank: true,
                    enableKeyEvents: true,
                    style: "font-size: 14px;",
                    readOnly: true,
                    disabled: true
                },
                {
                    xtype: "label",
                    id: "hwLabel1",
                    text: "资源名称：",
                    width: 100,
                    style: "text-align: right"
                },
                {
                    xtype: "textfield",
                    id: "hwText1",
                    allowBlank: true,
                    enableKeyEvents: true,
                    style: "font-size: 14px;",
                    readOnly: true,
                    disabled: true,
                    width: 220
                },
                {
                    xtype: "vmd.button",
                    id: "button",
                    text: "编辑",
                    type: "text",
                    size: "small",
                    icon: "icon-edit",
                    cls: "resource-btn",
                    margins: "0 5 ",
                    width: 48,
                    click: "button_click",
                    style: "font-size: 14px",
                    listeners: {
                        click: button_click
                    }
                },
                {
                    xtype: "vmd.button",
                    id: "button1",
                    text: "删除",
                    type: "text",
                    size: "small",
                    icon: "icon-minus",
                    cls: "resource-btn",
                    margins: "0 5",
                    width: 41,
                    click: "button1_click",
                    style: "font-size: 14px",
                    listeners: {
                        click: button1_click
                    }
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setAtrr = function(data1, data2) {
            //直接填写方法内容
            this.hwLabel.setText(data1.label);
            this.hwText.setValue(data1.value);
            this.hwLabel1.setText(data2.label);
            this.hwText1.setValue(data2.value);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ResourceList");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ResourceList");
    }
})