Ext.define("vmd.ux.CheckCombo", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.CheckCombo",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 120,
    height: 32,
    layout: "fit",
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
            var store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['id', 'text']
            });
            var seleData = [];
            var allData = null;

            function bindData(data) {
                allData = data;
                store.loadData(data);
                combo.bindStore(store)
            }

            function combo_afterrender(sender) {
                combo.displayField = 'text';
                combo.valueField = 'id';
            }

            function combo_change(sender, value, text) {
                seleData.push(value)
                page.fireEvent('change', page, seleData);
            }

            function getValue() {
                return seleData
            }

            function setValue(idStr) {
                var str = idStr.toString();
                vmd.taskRunner(function() {
                    if (allData) return true;
                }, function() {
                    combo.setValue(str)
                })
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.CheckCombo',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
            xtype: "vmd.combo",
            id: "combo",
            width: 150,
            Multi: true,
            afterrender: "combo_afterrender",
            change: "combo_change",
            style: "border: 1px solid #ddd;",
            listeners: {
                vmdafterrender: combo_afterrender,
                change: combo_change
            }
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.loadData = function(data) {
            //直接填写方法内容
            bindData(data)
        }
        this.getValue = function() {
            //直接填写方法内容
            return getValue()
        }
        this.setValue = function(idStr) {
            //直接填写方法内容
            setValue(idStr)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.CheckCombo");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.CheckCombo");
    }
})