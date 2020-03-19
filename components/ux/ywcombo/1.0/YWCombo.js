Ext.define("vmd.ux.YWCombo", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.YWCombo",
    layoutConfig: {
        align: "middle",
        pack: "center"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 304,
    height: 43,
    layout: "hbox",
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
            //语法：define( String className, Object configs, Function createdFn )
            // - classname:要定义的新类的类名
            // - properties：新类的配置对象
            // - callback：回调函数，当类创建完后执行该函数
            Ext.define('Person', {
                //对于类的配置信息
                //config属性：配置当前类的属性内容。而且会自己主动加入get和set方法
                config: {
                    name: '张三',
                    age: 30
                },
                //自定义的方法
                myMethod: function() {
                    //  alert('这是自定义的方法');
                },
                //给当前定义的类加入构造器
                constructor: function(config) {
                    var me = this; //获取当前的类
                    //能够查看配置项中的内容
                    //			for(var attr in config)
                    //			{
                    //				alert(attr+":"+config[attr]);
                    //			}
                    me.initConfig(config); //对传递进来的參数进行真正的初始化
                }
            });
            //Ext推荐的实例化对象的方法：Ext.Create
            var p = new Person({ //自定义的类的类名
                name: '实例化名字', //配置项
                age: 100
            });
            //alert('名字：' + p.getName() + '--age：' + p.getAge()); //调用默认加入的get方法
            p.myMethod(); //调用自定义的方法
            function combo_change(sender, value, text) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.YWCombo',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "vmd.combo",
                id: "combo",
                width: 150,
                change: "combo_change",
                listeners: {
                    change: combo_change
                },
                store: this.store,
                valueField: this.valueField,
                displayField: this.displayField
            },
            {
                xtype: "vmd.combo",
                id: "combo1",
                width: 150,
                store: this.store2,
                valueField: this.sotre2_valueField,
                displayField: this.store2_displayField
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.YWCombo");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.YWCombo");
    }
})