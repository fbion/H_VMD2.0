Ext.define("vmd.ux.Testdemo2", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Testdemo2",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 300,
    width: 242,
    height: 43,
    layout: "fit",
    bindCmp: "TestProMode",
    bindCmpVersion: "1.0",
    panelName: "aaa",
    uxrequirecss: "[\"components/ux/vmd_publicresource/datepicker/css/datepicker.css\"]",
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
            function combo_afterrender(sender) {}

            function hwDiv_afterrender(sender) {
                //  // 创建一个新窗口（有url指向） 
                // var newWin = new vmd.window({
                //   items:[hwDiv],
                //   title: '方法设置',
                //   enableLoading: true,//启用进度加载
                //   width: 960,
                //   height:620,
                //   auto: false,//auto为true 自动适应窗口，配合offset使用
                //   params:{} //url中追加的编码的参数，json格式 
                //   })
                //   newWin.show();//窗口显示
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.Testdemo2',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "vmd.combo",
                id: "combo",
                width: 366,
                afterrender: "combo_afterrender",
                listeners: {
                    vmdafterrender: combo_afterrender
                },
                store: this.store1,
                valueField: this.displayvalue,
                displayField: this.displaytext
            },
            {
                xtype: "vmd.div",
                id: "hwDiv",
                autoEl: "div",
                border: true,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 50,
                style: "border:1px solid  red;",
                afterrender: "hwDiv_afterrender",
                listeners: {
                    vmdafterrender: hwDiv_afterrender
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.Testdemo2");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Testdemo2");
    }
})