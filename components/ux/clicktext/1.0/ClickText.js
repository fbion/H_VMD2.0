Ext.define('vmd.ux.clickText.Controller', {
    xtype: 'vmd.ux.clickText.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ClickText", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ClickText",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 200,
    height: 27,
    layout: "border",
    beforerender: "ClickText_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.ClickText_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.ClickText'
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
            var page = this;

            function setConfig(value) {}

            function plus_click(sender, e) {
                page.fireEvent('plus')
            }

            function minus_click(sender, e) {
                page.fireEvent('minus')
            }

            function ClickText_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ClickText',
                p2: ex.message
            }, ex, 100);
        }
        this.ClickText_beforerender = ClickText_beforerender;
        this.items = [{
                xtype: "textfield",
                id: "valueDisplay",
                allowBlank: true,
                enableKeyEvents: true,
                x: 0,
                y: 0,
                style: "border: 1px solid #ddd",
                width: 93,
                region: "center",
                readOnly: this.readOnly
            },
            {
                xtype: "panel",
                id: "panel",
                layoutConfig: {
                    align: "center",
                    pack: "center"
                },
                title: "Panel",
                header: false,
                border: false,
                height: 100,
                layout: "vbox",
                region: "east",
                width: 13,
                items: [{
                        xtype: "vmd.div",
                        id: "plus",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 10,
                        x: 100,
                        y: 0,
                        backgroundImage: "icon-caret-up",
                        disableImage: false,
                        style: "font-size: 12px;    cursor: pointer",
                        click: "plus_click",
                        region: "east",
                        margins: "2 0 0 3",
                        listeners: {
                            click: plus_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "minus",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 20,
                        x: 100,
                        y: 13,
                        backgroundImage: "icon-caret-down",
                        style: "font-size: 12px;    cursor: pointer",
                        click: "minus_click",
                        region: "east",
                        margins: "3 0 0 3",
                        listeners: {
                            click: minus_click
                        }
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setValue = function(value) {
            valueDisplay.setValue(value);
        }
        this.getValue = function() {
            return valueDisplay.getValue()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ClickText");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ClickText");
    }
})