Ext.define("vmd.ux.TestProMode", {
    extend: "vmd.base.UxPropertySettings",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.TestProMode",
    title: "Panel",
    header: false,
    border: false,
    width: 600,
    height: 350,
    layout: "absolute",
    beforerender: "TestProMode_beforerender",
    afterrender: "TestProMode_afterrender",
    listeners: {
        beforerender: function() {
            try {
                this.TestProMode_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.TestProMode'
                }, ex, 50);
            }
        },
        vmdafterrender: function() {
            try {
                this.TestProMode_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.TestProMode'
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
            var testScope = {
                test1: 'b',
                test2: 'c',
                checked1: true,
                checked2: 2
            }
            page.onInit = function(dcmp) {
                //从dcmp拿到属性进行赋值
                //  dcmp=dcmp;
                //   var txt=page.getConfig('settings')
                //   if(!txt) return;
                //   var d= Ext.decode(txt);
                //   for(var key in d){
                //       var cmp=page.getCmpByName(key)
                //         cmp.setValue(d[key])
                //   }
                if (!vm) {
                    vm = new vmd.base.ViewModel(page);
                    vm.addObserver();
                }
                debugger
                vm.bind(testScope);
            }
            var json = {}
            page.onValueChange = function(sender, newValue, info) {
                //info.props
                // (sender,newValue,oldValue
                // if(sender.Name){
                //     json[sender.Name]=newValue;
                // }
                // page.setConfig('settings',Ext.encode( json));
                // page.fireEvent('componentchanged');
            }

            function TestProMode_beforerender(sender) {}

            function TestProMode_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.TestProMode',
                p2: ex.message
            }, ex, 100);
        }
        this.TestProMode_afterrender = TestProMode_afterrender;
        this.TestProMode_beforerender = TestProMode_beforerender;
        this.items = [{
                xtype: "vmd.button",
                id: "button",
                text: "button",
                type: "(none)",
                size: "small",
                x: 70,
                y: 120
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                width: 150,
                x: 160,
                y: 140
            },
            {
                xtype: "radio",
                id: "hwRadio",
                fieldLabel: "Radio",
                boxLabel: "boxLabel",
                x: 70,
                y: 210,
                BindValue: "checked1"
            },
            {
                xtype: "radiostoregroup",
                id: "hwRadioGroup",
                width: 200,
                height: 40,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "myRadio",
                x: 220,
                y: 210,
                BindValue: "checked2",
                items: [{
                        xtype: "radio",
                        id: "hwRadio1",
                        boxLabel: "boxLabel",
                        inputValue: "1"
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio2",
                        boxLabel: "boxLabel",
                        inputValue: "2"
                    }
                ]
            },
            {
                xtype: "textfield",
                id: "hwText",
                allowBlank: true,
                enableKeyEvents: true,
                x: 40,
                y: 70,
                Name: "test2",
                BindValue: "test2"
            },
            {
                xtype: "textfield",
                id: "hwText1",
                allowBlank: true,
                enableKeyEvents: true,
                x: 50,
                y: 30,
                Name: "test1",
                BindValue: "test1"
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.TestProMode");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TestProMode");
    }
})