Ext.define("vmd.ux.Testmb", {
    extend: "vmd.base.UxPropertySettings",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Testmb",
    title: "Panel",
    header: false,
    border: false,
    width: 600,
    height: 119,
    layout: "absolute",
    beforerender: "Testmb_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.Testmb_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.Testmb'
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
            // this.onInit = function(com) {
            //     var a = com.getConfig()
            //     combo.setValue(a)
            // }
            // this.onValueChange()
            // {
            //     combo.setCon(newValue)
            // }
            /*
                *@desc 组件初始化接口，可以继承重写
                *@param {xds.Component} dcmp-设计时组件
                
                onInitComponent: function (dcmp) {
                    //需继承重写,组件已加载完成 
                    this.addValueChangeListener();

                    this.onInit && this.onInit(dcmp);
                    
                },*/
            /*
               *@desc 值发生变化接口，需要继承重写
               *@param {Ext.Component} sender-当前组件对象
               *@param {string|number|object} newValue-新值
               *@param {string|number|object} oldValue-老值
              
               onValueChange: function (sender,newValue,oldValue) {
                   //需继承重写
                  
               }, */
            function Testmb_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.Testmb',
                p2: ex.message
            }, ex, 100);
        }
        this.Testmb_beforerender = Testmb_beforerender;
        this.items = [{
                xtype: "label",
                id: "hwLabel",
                text: "测试",
                x: 40,
                y: 30
            },
            {
                xtype: "vmd.combo",
                id: "combo",
                width: 150,
                x: 80,
                y: 20,
                Name: "com"
            },
            {
                xtype: "vmd.button",
                id: "button",
                text: "button",
                type: "(none)",
                size: "small",
                x: 270,
                y: 20,
                Name: "but"
            },
            {
                xtype: "textfield",
                id: "hwText",
                allowBlank: true,
                enableKeyEvents: true,
                x: 90,
                y: 60,
                Name: "txt"
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.Testmb");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Testmb");
    }
})