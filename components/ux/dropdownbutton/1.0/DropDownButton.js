Ext.define("vmd.ux.DropDownButton", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DropDownButton",
    title: "Panel",
    header: false,
    border: false,
    width: 80,
    height: 30,
    layout: "fit",
    buttonText: "lable:",
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
        var page = this

        function div1_click(sender, e) {
            page.fireEvent('clickRight', e)
        }

        function div2_click(sender, e) {
            page.fireEvent('clickLeft', e)
        }
        this.items = [{
            xtype: "vmd.div",
            id: "div",
            autoEl: "div",
            border: false,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 70,
            height: 30,
            x: 0,
            y: 0,
            style: "display: inline-block;    line-height: 1;    white-space: nowrap;    cursor: pointer;    background: #fff;    /*border: 1px solid #c4c4c4;*/    color: #1f2d3d;    -webkit-appearance: none;    text-align: center;    /* box-sizing: border-box; */    -webkit-box-sizing: content-box;    outline: 0;    margin: 0;    -moz-user-select: none;    -webkit-user-select: none;    -ms-user-select: none;    padding: 10px 15px;    font-size: 14px;    border-radius: 4px;",
            layout: "border",
            items: [{
                    xtype: "vmd.div",
                    id: "div2",
                    layoutConfig: {
                        align: "middle",
                        pack: "center"
                    },
                    autoEl: "div",
                    border: false,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: 51,
                    height: 50,
                    region: "center",
                    layout: "hbox",
                    style: "cursor: pointer",
                    click: "div2_click",
                    listeners: {
                        click: div2_click
                    },
                    items: [{
                        xtype: "label",
                        id: "label",
                        text: this.buttonText,
                        style: "cursor: pointer;    color: #20a0ff"
                    }]
                },
                {
                    xtype: "vmd.div",
                    id: "div1",
                    autoEl: "div",
                    border: false,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: 18,
                    height: 30,
                    region: "east",
                    backgroundImage: "icon-sort-down",
                    style: "font-size: 14px;    padding: 5px 0 0 0;    cursor: pointer",
                    margins: "",
                    click: "div1_click",
                    listeners: {
                        click: div1_click
                    }
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.DropDownButton");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DropDownButton");
    }
})