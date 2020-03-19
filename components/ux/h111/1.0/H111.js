Ext.define("vmd.ux.H111", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.DropDownButton$1.0$DropDownButton"]),
    version: "1.0",
    xtype: "vmd.ux.H111",
    title: "Panel",
    header: false,
    border: false,
    width: 84,
    height: 31,
    layout: "absolute",
    afterrender: "H111_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.H111_afterrender(this)
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

        function H111_afterrender(sender) {
            document.body.appendChild(this.hwMenu.el.dom)
        }

        function hwDropDownButton_clickRight(e) {
            debugger
            hwMenu.showAt(e.xy)
        }
        this.H111_afterrender = H111_afterrender;
        this.items = [{
                xtype: "vmd.ux.DropDownButton",
                id: "hwDropDownButton",
                buttonText: "lable:",
                layout: "fit",
                x: 0,
                y: 0,
                clickRight: "hwDropDownButton_clickRight",
                listeners: {
                    clickRight: hwDropDownButton_clickRight
                }
            },
            {
                xtype: "vmd.menu",
                id: "hwMenu",
                width: 120,
                hidden: true,
                floating: true,
                x: 350,
                y: 120,
                items: [{
                        xtype: "menuitem",
                        id: "hwMenuItem",
                        width: 120,
                        text: "123",
                        hidden: false
                    },
                    {
                        xtype: "menuitem",
                        id: "hwMenuItem1",
                        width: 120,
                        text: "321",
                        hidden: false
                    },
                    {
                        xtype: "menuitem",
                        id: "hwMenuItem2",
                        width: 120,
                        text: "1237456",
                        hidden: false
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.H111");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.H111");
    }
})