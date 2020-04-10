Ext.define("vmd.ux.IndexSeting", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.ColorInput$1.0$ColorInput"]),
    version: "1.0",
    xtype: "vmd.ux.IndexSeting",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 288,
    height: 120,
    layout: "fit",
    beforerender: "IndexSeting_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.IndexSeting_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.IndexSeting'
                }, ex, 50);
            }
        }
    },
    uxCss: ".text-input{    border: 1px solid #ddd;}",
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
            var viewModel;
            var page = this;
            var indexId = null;

            function init(source, data) {
                viewModel.bind(data);
                indexId = data.id;
                // vmd.taskRunner(function() {
                //     if (comlist) return true;
                // }, function() {
                var das = xds.vmd.getStoreByDsName(source, true)
                var arr = [];
                if (das && das.childNodes && das.childNodes.length > 0) {
                    das.childNodes.forEach(function(value, i) {
                        arr.push({
                            id: value.text,
                            name: value.text,
                        })
                    })
                }
                var store = new vmd.data.Store({
                    data: arr,
                    fields: ['id', 'name']
                })
                comlist.store = store;
                comlist.valueField = 'id';
                comlist.displayField = 'id';
                comlist.dropDownFields = 'name';
                comlist.queryField = 'name';
                // })
            }

            function IndexSeting_beforerender(sender) {
                //初始化
                viewModel = new vmd.base.ViewModel(page);
                //增加观察
                viewModel.addObserver();
                //实现接口
                viewModel.onValueChange = function(sender, newValue, vm) {
                    viewModel.set(sender.BindValue, newValue);
                    xds.activePropPanel.fireEvent('DataValueChange', sender, newValue, vm, true)
                }
            }

            function button_click(sender, e) {}

            function hwText_blur(sender, e) {
                //page.fireEvent('nameChang',page,hwText.getValue())
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.IndexSeting',
                p2: ex.message
            }, ex, 100);
        }
        this.IndexSeting_beforerender = IndexSeting_beforerender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: false,
            height: 310,
            x: 0,
            y: 0,
            layout: "absolute",
            items: [{
                    xtype: "checkbox",
                    id: "hwCheckbox",
                    fieldLabel: "Checkbox",
                    boxLabel: "数值标注",
                    x: 150,
                    y: 45,
                    BindValue: "labelIsShow",
                    width: 90,
                    checked: false,
                    Name: "isOnRander"
                },
                {
                    xtype: "label",
                    id: "hwLabel",
                    text: "颜色",
                    x: 10,
                    y: 15
                },
                {
                    xtype: "label",
                    id: "hwLabel1",
                    text: "名称",
                    x: 10,
                    y: 50,
                    height: 20
                },
                {
                    xtype: "textfield",
                    id: "hwText",
                    allowBlank: true,
                    enableKeyEvents: true,
                    x: 40,
                    y: 45,
                    width: 90,
                    cls: "text-input",
                    BindValue: "name",
                    Name: "isOnRander",
                    blur: "hwText_blur",
                    listeners: {
                        blur: hwText_blur
                    }
                },
                {
                    xtype: "checkbox",
                    id: "hwCheckbox1",
                    fieldLabel: "Checkbox",
                    boxLabel: "简称",
                    x: 10,
                    y: 80,
                    BindValue: "companyIsShow",
                    checked: false,
                    Name: "isOnRander"
                },
                {
                    xtype: "textfield",
                    id: "hwText1",
                    allowBlank: true,
                    enableKeyEvents: true,
                    x: 60,
                    y: 80,
                    width: 70,
                    cls: "text-input",
                    BindValue: "shortName",
                    Name: "isOnRander"
                },
                {
                    xtype: "label",
                    id: "hwLabel2",
                    text: "字段",
                    x: 145,
                    y: 15
                },
                {
                    xtype: "checkbox",
                    id: "hwCheckbox2",
                    fieldLabel: "Checkbox",
                    boxLabel: "单位",
                    x: 150,
                    y: 80,
                    BindValue: "nameIsShow",
                    checked: false,
                    Name: "isOnRander"
                },
                {
                    xtype: "textfield",
                    id: "hwText3",
                    allowBlank: true,
                    enableKeyEvents: true,
                    x: 200,
                    y: 80,
                    width: 70,
                    cls: "text-input",
                    BindValue: "company",
                    Name: "isOnRander"
                },
                {
                    xtype: "vmd.comlist",
                    id: "comlist",
                    width: 90,
                    height: 270,
                    x: 180,
                    y: 10,
                    cls: "text-input",
                    BindValue: "field",
                    Name: "isOnRander"
                },
                {
                    xtype: "vmd.ux.ColorInput",
                    id: "hwColorInput",
                    layout: "fit",
                    x: 40,
                    y: 10,
                    width: 90,
                    BindValue: "color",
                    Name: "isOnRander"
                },
                {
                    xtype: "vmd.button",
                    id: "button",
                    text: "删除",
                    type: "text",
                    size: "small",
                    x: 215,
                    y: 10,
                    click: "button_click",
                    icon: "delete",
                    height: 24,
                    hidden: true,
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
        this.init = function(source, data) {
            //直接填写方法内容
            init(source, data)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.IndexSeting");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.IndexSeting");
    }
})