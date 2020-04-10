Ext.define("vmd.ux.MicroservicesList", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.MicroservicesList",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 360,
    height: 40,
    layout: "auto",
    afterrender: "MicroservicesList_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.MicroservicesList_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.MicroservicesList'
                }, ex, 50);
            }
        }
    },
    uxCss: ".micrser-group {    font-size: 14px;    padding: 5px 0;    color: #646464;}.micrser-group:hover .micrser-del{   visibility:visible; }.micrser-select {    font-size: 14px!important;    display: inline-block;    color: #646464;}.micrser-lable {    color: #646464;    display: inline-block;}.micrser-del{    visibility:hidden;}",
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
                //判断是够需要移除，并添加事件监听
                Ext.Msg.confirm("提示!", "确定要移除?", function(btn) {
                    if (btn == "yes") {
                        page.fireEvent('removeRelation', e)
                    }
                })
            }
            // 创建数据集。 
            var liststore = new vmd.data.Store({
                data: page.list,
                fields: ['key', 'value']
            });
            var data = [];

            function MicroservicesList_afterrender(sender) {}

            function setcomlist(data) {
                page.data = data;
                liststore.loadData(page.data, false);
            }

            function comlist_beforerender(sender) {
                comlist.store = liststore
                comlist.displayField = 'value';
                comlist.valueField = 'key';
                // comlist.setWidth(280 - Label.getWidth())
            }

            function comlist_selectChanged(sender, combo, record, index) {
                sender.el.dom.title = record.json.url;
            }

            function comlist_afterrender(sender) {
                // console.log(sender)
                // sender.el.dom.title = record.json.url;
            }

            function hwDiv_afterrender(sender) {
                sender.el.dom
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.MicroservicesList',
                p2: ex.message
            }, ex, 100);
        }
        this.MicroservicesList_afterrender = MicroservicesList_afterrender;
        this.items = [{
            xtype: "vmd.div",
            id: "hwDiv",
            autoEl: "div",
            border: false,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 400,
            height: 40,
            layout: "auto",
            cls: "micrser-group",
            afterrender: "hwDiv_afterrender",
            listeners: {
                vmdafterrender: hwDiv_afterrender
            },
            items: [{
                    xtype: "label",
                    id: "Label",
                    text: "数据服务：",
                    cls: "micrser-lable",
                    autoWidth: true,
                    margins: "0 0 0 30",
                    style: "margin-left: 30px;"
                },
                {
                    xtype: "vmd.comlist",
                    id: "comlist",
                    width: 180,
                    height: 270,
                    cls: "micrser-select",
                    margins: "1 10 0 0",
                    editable: false,
                    query: false,
                    beforerender: "comlist_beforerender",
                    style: "font-size: 14px;    color: #646464;",
                    selectChanged: "comlist_selectChanged",
                    afterrender: "comlist_afterrender",
                    listeners: {
                        beforerender: comlist_beforerender,
                        selectChanged: comlist_selectChanged,
                        vmdafterrender: comlist_afterrender
                    }
                },
                {
                    xtype: "vmd.button",
                    id: "button",
                    text: "删除",
                    type: "text",
                    size: "small",
                    icon: "icon-minus",
                    width: 42,
                    style: "font-size: 14px;",
                    click: "button_click",
                    height: 21,
                    cls: "micrser-del",
                    listeners: {
                        click: button_click
                    }
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setAttr = function(value, display, select, title) {
            //直接填写方法内容
            this.Label.setText(value || "暂无数据");
            this.button.setVisible(display || false);
            this.comlist.setValue(select);
            this.comlist.el.dom.title = title;
            this.comlist.setWidth(280 - Label.getWidth());
        }
        this.getComlistValue = function() {
            //直接填写方法内容
            return this.comlist.getValue()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.MicroservicesList");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.MicroservicesList");
    }
})