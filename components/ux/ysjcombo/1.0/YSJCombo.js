Ext.define("vmd.ux.YSJCombo", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.YSJCombo",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 381,
    height: 56,
    layout: "hbox",
    afterrender: "YSJCombo_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.YSJCombo_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.YSJCombo'
                }, ex, 50);
            }
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
        try {
            //
            var page = this;

            function _setName(name1, name2) {
                page.name1 = name1;
                page.name2 = name2;
            }

            function YSJCombo_afterrender(sender) {
                //  alert(this.flselect)
            }

            function combo_change(sender, value, text) {
                //@param1 event name
                //@param2 scope
                //@param3 参数
                page.fireEvent('yjonchange', combo, page.name1, page.name2)
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.YSJCombo',
                p2: ex.message
            }, ex, 100);
        }
        this.YSJCombo_afterrender = YSJCombo_afterrender;
        this.items = [{
                xtype: "label",
                id: "hwLabel",
                text: "油井:"
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                width: 150,
                change: "combo_change",
                listeners: {
                    change: combo_change
                },
                store: this.store1,
                displayField: this.store1_displayField,
                valueField: this.store1_valueFiled
            },
            {
                xtype: "label",
                id: "hwLabel1",
                text: "水井:"
            },
            {
                xtype: "vmd.combo",
                id: "combo1",
                width: 150,
                store: this.store2,
                valueField: this.store2_valueField,
                displayField: this.store2_displayField
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setName = function(name1, name2) {
            //直接填写方法内容
            _setName(name1, name2)
        }
        this.getName = function() {
            //直接填写方法内容
            return page.name1 + '|||' + page.name2;
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.YSJCombo");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.YSJCombo");
    }
})