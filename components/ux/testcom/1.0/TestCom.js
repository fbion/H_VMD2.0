Ext.define("vmd.ux.TestCom", {
    extend: "vmd.base.UxPropertySettings",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.TestCom",
    title: "Panel",
    header: false,
    border: false,
    width: 192,
    height: 152,
    layout: "absolute",
    afterrender: "TestCom_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.TestCom_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.TestCom'
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
            var page = this
            var vm;
            var dcmp;
            var testdata = {
                'dwmc': 'dwmc',
                'dwdm': 'dwdm'
            }
            // page.onInit = function() {
            //     if (!vm) {
            //         vm = new vmd.base.ViewModel(page);
            //         vm.addObserver();
            //     }
            //     vm.bind(testdata);
            // }
            // var json = {}
            // page.onValueChange = function(sender, newValue, info) {
            //     if (sender.Name) {
            //         json[sender.Name] = newValue;
            //     }
            //     page.setConfig('settings', Ext.encode(json));
            //     page.fireEvent('componentchanged');
            // }
            page.onInit = function(dcmp) {
                dcmp = dcmp;
                var txt = page.getConfig('settings')
                if (!txt) return;
                var d = Ext.decode(txt);
                for (var key in d) {
                    var cmp = page.getCmpByName(key)
                    cmp.setValue(d[key])
                }
            }
            var json = {};
            page.onValueChange = function(sender, newValue, oldValue) {
                if (sender.Name) {
                    json[sender.Name] = newValue;
                }
                page.setConfig('settings', Ext.encode(json));
                page.fireEvent('componentchanged');
            }

            function TestCom_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.TestCom',
                p2: ex.message
            }, ex, 100);
        }
        this.TestCom_afterrender = TestCom_afterrender;
        this.items = [{
                xtype: "textfield",
                id: "hwText",
                allowBlank: true,
                enableKeyEvents: true,
                x: 50,
                y: 35,
                BindValue: "dwmc",
                Name: "dwmc",
                width: 110
            },
            {
                xtype: "textfield",
                id: "hwText1",
                allowBlank: true,
                enableKeyEvents: true,
                x: 50,
                y: 85,
                BindValue: "dwdm",
                Name: "dwdm",
                width: 110
            },
            {
                xtype: "label",
                id: "hwLabel",
                text: "id：",
                x: 10,
                y: 40
            },
            {
                xtype: "label",
                id: "hwLabel1",
                text: "名称：",
                x: 10,
                y: 90
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.TestCom");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TestCom");
    }
})