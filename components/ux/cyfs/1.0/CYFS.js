undefined
Ext.define("vmd.ux.CYFS", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.BX$1.0$BX"]),
    version: "1.0",
    xtype: "vmd.ux.CYFS",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 600,
    height: 34,
    layout: "hbox",
    afterrender: "CYFS_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.CYFS_afterrender(this)
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
        page = this;
        page.abc = function() {
            alert()
        }

        function CYFS_afterrender(sender) {
            this.cascade(function(item) {
                debugger
            })
        }
        this.CYFS_afterrender = CYFS_afterrender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "采油方式:",
                cls: this.labelcls
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                width: 150
            },
            {
                xtype: "vmd.ux.BX",
                id: "hwBX",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                layout: "hbox",
                width: 402
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.CYFS");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.CYFS");
    }
})