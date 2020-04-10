Ext.define('vmd.ux.testDemo.Controller', {
    xtype: 'vmd.ux.testDemo.Controller',
    constructor: function(options) {
        alert('123456');
    }
})
Ext.define("vmd.ux.TestDemo", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.TestDemo",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 831,
    height: 208,
    layout: "hbox",
    beforerender: "TestDemo_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.TestDemo_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.TestDemo'
                }, ex, 50);
            }
        }
    },
    uxrequirecss: "[\"components/ux/testdemo/1.0/file/datainput.css\"]",
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
            var page = this

            function button_click(sender, e) {
                
                //alert(vmduxpath);
                hwImg.src = '/components/ux/testdemo/1.0/img/物质平衡油藏-气顶驱和溶解气驱油藏.png'
                //hwImg.src='{vmduxpath}/components/ux/testdemo/1.0/img/物质平衡油藏-气顶驱和溶解气驱油藏.png'
            }

            function button2_click(sender, e) {
                
                //记录日志信息 
                //vmd.webBase.syslog(loginfo,logtype,operationtype,function(res){}) 
            }

            function TestDemo_beforerender(sender) {
                var list = [];
                page.cascade(function(item) {
                    if (page.id == item.id) return true;
                    list.push(item.id)
                    return item.xtype.indexOf('vmd.ux') == -1 ? true : false
                    // debugger
                }, page)
                console.log(list)
            }

            function hwCheckbox_check(sender, checked) {
                if (checked)
                    hwRadio.setDisabled(true)
                else
                    hwRadio.setDisabled(false)
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.TestDemo',
                p2: ex.message
            }, ex, 100);
        }
        this.TestDemo_beforerender = TestDemo_beforerender;
        this.items = [{
                xtype: "vmd.button",
                id: "button2",
                text: "button",
                type: "(none)",
                size: "small",
                click: "button2_click",
                listeners: {
                    click: button2_click
                }
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                width: 150
            },
            {
                xtype: "vmd.button",
                id: "button1",
                text: "button",
                type: "(none)",
                size: "small"
            },
            {
                xtype: "vmd.button",
                id: "button",
                text: "button",
                type: "(none)",
                size: "small",
                click: "button_click",
                listeners: {
                    click: button_click
                }
            },
            {
                xtype: "vmd.img",
                id: "hwImg",
                width: 200,
                height: 200,
                src: "/img/public/采液指数.png"
            },
            {
                xtype: "checkbox",
                id: "hwCheckbox",
                fieldLabel: "Checkbox",
                boxLabel: "boxLabel",
                check: "hwCheckbox_check",
                listeners: {
                    check: hwCheckbox_check
                }
            },
            {
                xtype: "radio",
                id: "hwRadio",
                fieldLabel: "Radio",
                boxLabel: "boxLabel"
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.TestDemo");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TestDemo");
    }
})