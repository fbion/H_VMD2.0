undefined
Ext.define("vmd.ux.DataCs", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.Picker$1.0$Picker"]),
    version: "1.0",
    xtype: "vmd.ux.DataCs",
    title: "Panel",
    header: false,
    border: false,
    width: 781,
    height: 217,
    layout: "absolute",
    beforerender: "DataCs_beforerender",
    unstyled: false,
    cls: "datacss",
    listeners: {
        beforerender: function() {
            this.DataCs_beforerender(this)
        }
    },
    combwidth: 200,
    sds: "this.textFiled",
    uxCss: "/*.datacss .x-panel-bwrap{*//*    overflow:initial*//*}*//*.datacss .x-panel-body{*//*    overflow:initial*//*}*/",
    uxrequirecss: "[\"components/ux/datacs/1.0/css/iconfont.css\"]",
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
        var page = this;

        function combo_change(sender, value, text) {
            if (combo.getValue == '') {
                combo.setText('--请选择--')
            }
        }

        function button_click(sender, e) {
            page.fireEvent("bt1click", sender, e);
            hwPicker.setValue('8200', '', '', 'detail')
        }

        function button1_click(sender, e) {
            debugger
            page.fireEvent("bt1click", sender, e);
            hwPicker.setValue('8200', '8260', '', 'detail1')
        }

        function button2_click(sender, e) {
            hwPicker.setValue('8200', '8260', '8265', 'detail2')
        }

        function hwPicker_detailkeyup(sender, sender, e) {
            debugger
            //alert('12');
            page.fireEvent("detailkeyup", sender, e);
        }

        function _setValue(province_id, city_id, county_id, detail_info) {
            debugger
            hwPicker.setValue(province_id, city_id, county_id, detail_info)
        }

        function _getValue(attr) {
            debugger
            return hwPicker.getValue(attr);
        }

        function DataCs_afterrender(sender) {}

        function DataCs_beforerender(sender) {}
        this.DataCs_afterrender = DataCs_afterrender;
        this.DataCs_beforerender = DataCs_beforerender;
        this.items = [{
                xtype: "vmd.combo",
                id: "combo",
                width: 258,
                x: 10,
                y: 10,
                store: this.store,
                valueField: this.valueFiled,
                displayField: this.sds
            },
            {
                xtype: "textfield",
                id: "hwText",
                allowBlank: true,
                enableKeyEvents: true,
                x: 300,
                y: 10,
                width: 250,
                height: 30
            },
            {
                xtype: "vmd.ux.Picker",
                id: "hwPicker",
                detailWidth: this.combwidth,
                comboWidth: 300,
                pickerWidth: 510,
                detailX: 310,
                detailEmptyText: "请输入详细地址信息",
                layout: "absolute",
                x: 20,
                y: 140,
                detailkeyup: "hwPicker_detailkeyup",
                listeners: {
                    detailkeyup: hwPicker_detailkeyup
                }
            },
            {
                xtype: "vmd.button",
                id: "button",
                text: "button",
                type: "(none)",
                size: "small",
                x: 30,
                y: 90,
                click: "button_click",
                listeners: {
                    click: button_click
                }
            },
            {
                xtype: "vmd.button",
                id: "button1",
                text: "button",
                type: "(none)",
                size: "small",
                x: 110,
                y: 90,
                click: "button1_click",
                listeners: {
                    click: button1_click
                }
            },
            {
                xtype: "vmd.button",
                id: "button2",
                text: "button",
                type: "(none)",
                size: "small",
                x: 200,
                y: 90,
                click: "button2_click",
                listeners: {
                    click: button2_click
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getValue = function(attr) {
            //直接填写方法内容
            return _getValue(attr);
        }
        this.setValue = function(province_id, city_id, county_id, detail_info) {
            //直接填写方法内容
            return _setValue(province_id, city_id, county_id, detail_info);
        }
        this.wewew = function() {
            //直接填写方法内容
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DataCs");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DataCs");
    }
})