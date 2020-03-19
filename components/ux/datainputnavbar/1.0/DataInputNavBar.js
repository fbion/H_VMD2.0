Ext.define('vmd.ux.dataInputNavBar.Controller', {
    xtype: 'vmd.ux.dataInputNavBar.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.DataInputNavBar", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DataInputNavBar",
    layoutConfig: {
        align: "middle",
        pack: "start"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 357,
    height: 44,
    layout: "hbox",
    afterrender: "DataInputNavBar_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.DataInputNavBar_afterrender(this)
        }
    },
    startText: "首行",
    forwardText: "上一条",
    nextText: "下一条",
    endText: "尾行",
    uxrequirecss: "[\"components/ux/datainputnavbar/1.0/css/icons.css\"]",
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

        function changeName(t, v) {
            if (t == 'start') {
                start.text = v
            } else if (t == 'forward') {
                forward.text = v
            } else if (t == 'next') {
                next.text = v
            } else if (t == 'end') {
                end.text = v
            }
        }

        function button_click(sender, e) {
            page.fireEvent('nav_click', sender, e, 'start')
        }

        function forward_click(sender, e) {
            page.fireEvent('nav_click', sender, e, 'forward')
        }

        function next_click(sender, e) {
            page.fireEvent('nav_click', sender, e, 'next')
        }

        function end_click(sender, e) {
            page.fireEvent('nav_click', sender, e, 'end')
        }

        function setPageCount(all, now) {
            // if (all) page.all.text = all;
            // page.now.text = now || 1;
            page.all.setValue(all)
            page.now.setValue(now || 1)
        }

        function now_beforerender(sender) {}

        function DataInputNavBar_afterrender(sender) {
            // setPageCount(10, 10)
        }

        function now_keyup(sender, e) {
            //页码输入后回车
            if (event.keyCode == 13) {
                page.fireEvent('pageJump', now.getValue())
            }
        }
        this.DataInputNavBar_afterrender = DataInputNavBar_afterrender;
        this.items = [{
                xtype: "vmd.button",
                id: "start",
                text: this.startText,
                type: "text",
                size: "small",
                x: 5,
                y: 5,
                margins: "0 5",
                click: "button_click",
                style: "font-size: 14px",
                listeners: {
                    click: button_click
                },
                iconcls: this.startIcons,
                cls: this.startCls,
                hidden: this.startDisplay
            },
            {
                xtype: "vmd.button",
                id: "forward",
                text: this.forwardText,
                type: "text",
                size: "small",
                x: 80,
                y: 5,
                margins: "0 5",
                click: "forward_click",
                style: "font-size: 14px",
                listeners: {
                    click: forward_click
                },
                iconcls: this.forwardIcons,
                cls: this.forwardCls,
                hidden: this.forwardDisplay
            },
            {
                xtype: "vmd.button",
                id: "next",
                text: this.nextText,
                type: "text",
                size: "small",
                x: 170,
                y: 5,
                margins: "0 5",
                click: "next_click",
                style: "font-size: 14px",
                listeners: {
                    click: next_click
                },
                iconcls: this.nextIcons,
                cls: this.nextCls,
                hidden: this.nextDisplay
            },
            {
                xtype: "vmd.button",
                id: "end",
                text: this.endText,
                type: "text",
                size: "small",
                x: 260,
                y: 5,
                margins: "0 5",
                click: "end_click",
                style: "font-size: 14px",
                listeners: {
                    click: end_click
                },
                iconcls: this.endIcons,
                cls: this.endCls,
                hidden: this.endDisplay
            },
            {
                xtype: "vmd.div",
                id: "div",
                layoutConfig: {
                    align: "top",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 126,
                height: 42,
                layout: "hbox",
                margins: "-5 0 0 0",
                items: [{
                        xtype: "textfield",
                        id: "now",
                        allowBlank: true,
                        enableKeyEvents: true,
                        width: 50,
                        margins: "10 0 0 0",
                        keyup: "now_keyup",
                        listeners: {
                            keyup: now_keyup
                        }
                    },
                    {
                        xtype: "label",
                        id: "label",
                        text: "/",
                        margins: "15 5 0 5"
                    },
                    {
                        xtype: "textfield",
                        id: "all",
                        allowBlank: true,
                        enableKeyEvents: true,
                        width: 50,
                        margins: "10 0 0 0",
                        readOnly: true,
                        style: "border-bottom: none"
                    }
                ],
                hidden: this.countDisplay
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setPageCount = function(all, now) {
            setPageCount(all, now)
        }
        this.changeName = function(type, value) {
            changeName(type, value)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DataInputNavBar");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DataInputNavBar");
    }
})