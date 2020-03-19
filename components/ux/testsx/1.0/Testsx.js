Ext.define("vmd.ux.Testsx", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.TestDemo$1.0$TestDemo"]),
    version: "1.0",
    xtype: "vmd.ux.Testsx",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 799,
    height: 525,
    layout: "absolute",
    afterrender: "Testsx_afterrender",
    beforerender: "Testsx_beforerender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.Testsx_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.Testsx'
                }, ex, 50);
            }
        },
        beforerender: function() {
            try {
                this.Testsx_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.Testsx'
                }, ex, 50);
            }
        }
    },
    uxrequirecss: "[\"components/ux/testdemo/1.0/file/datainput.css?ver=vmd2.0.6.200119\"]",
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
            //   if(fn.apply(scope || this, args || [this]) !== false){
            function Testsx_afterrender(sender) {}
            // var vm=new vmd.base.ViewModel(page)
            // vm.bind(props);
            // vm.set('title.name','22')  
            // var arrs=this.get('title.name')
            // this.get('title.name').setValue(22)
            // //存储结构
            // //_bindLists
            // list:[
            // ]
            // lists=
            // {
            // a:[bb,dd],
            // c:[ss,bb]
            // }
            // change
            // 通知其他组件发布变化
            // title.name=value
            // setvalue（value）
            function Testsx_beforerender(sender) {
                debugger
                var list = [];
                page.cascade(function(item) {
                    if (page.id == item.id) return true;
                    list.push(item.id)
                    return item.xtype.indexOf('vmd.ux') == -1 ? true : false
                    // debugger
                }, page)
                console.log(list)
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.Testsx',
                p2: ex.message
            }, ex, 100);
        }
        this.Testsx_afterrender = Testsx_afterrender;
        this.Testsx_beforerender = Testsx_beforerender;
        this.items = [{
                xtype: "label",
                id: "hwLabel",
                text: "lable:",
                x: 100,
                y: 90
            },
            {
                xtype: "checkbox",
                id: "hwCheckbox",
                fieldLabel: "Checkbox",
                boxLabel: "boxLabel",
                x: 210,
                y: 90
            },
            {
                xtype: "checkboxstoregroup",
                id: "hwCheckboxGroup",
                width: 200,
                height: 40,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "mycheckbox",
                x: 180,
                y: 140,
                items: [{
                        xtype: "checkbox",
                        id: "hwCheckbox1",
                        boxLabel: "boxLabel"
                    },
                    {
                        xtype: "checkbox",
                        id: "hwCheckbox2",
                        boxLabel: "boxLabel"
                    }
                ]
            },
            {
                xtype: "vmd.ux.TestDemo",
                id: "hwTestDemo",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                layout: "hbox",
                x: 30,
                y: 210,
                width: 650
            },
            {
                xtype: "panel",
                id: "panel",
                title: "Panel",
                header: true,
                border: true,
                height: 100,
                items: [{
                        xtype: "checkbox",
                        id: "hwCheckbox3",
                        fieldLabel: "Checkbox",
                        boxLabel: "boxLabel"
                    },
                    {
                        xtype: "panel",
                        id: "panel1",
                        title: "Panel",
                        header: true,
                        border: true,
                        height: 100
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.Testsx");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Testsx");
    }
})