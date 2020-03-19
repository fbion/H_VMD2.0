Ext.define('vmd.ux.lableinput.Controller', {
    xtype: 'vmd.ux.lableinput.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.Lableinput", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Lableinput",
    title: "基本信息",
    header: true,
    border: true,
    width: 462,
    height: 374,
    layout: "absolute",
    autoScroll: false,
    enddate: "Y-m-d",
    readyonly: "住址不能为空",
    uxCss: ".lb,.xb,.nl,.idcard,.zz{color: green;}",
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
            function button_click(sender, e) {
                //记录日志信息 
                //vmd.webBase.syslog(loginfo,logtype,operationtype,function(res){}) 
                alert("成功");
                window.location.reload();
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.Lableinput',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "label",
                id: "label",
                text: "姓名:",
                x: 30,
                y: 50,
                width: 40,
                height: 20,
                cls: "lb"
            },
            {
                xtype: "textfield",
                id: "hwText",
                allowBlank: false,
                enableKeyEvents: true,
                x: 90,
                y: 40,
                blankText: "姓名不能为空",
                readOnly: false,
                msgTarget: "title",
                emptyText: "请输入姓名"
            },
            {
                xtype: "label",
                id: "label1",
                text: "性别：",
                x: 30,
                y: 80,
                width: 40,
                height: 20,
                cls: "xb"
            },
            {
                xtype: "label",
                id: "label2",
                text: "身证证号：",
                x: 10,
                y: 110,
                height: 20,
                width: 70,
                cls: "idcard"
            },
            {
                xtype: "label",
                id: "label3",
                text: "年龄：",
                x: 30,
                y: 140,
                cls: "zz"
            },
            {
                xtype: "label",
                id: "label4",
                text: "住址：",
                x: 30,
                y: 170,
                cls: "nl"
            },
            {
                xtype: "textfield",
                id: "hwText2",
                allowBlank: false,
                enableKeyEvents: true,
                x: 90,
                y: 100,
                blankText: "身份证号不能为空",
                maxLength: 19,
                growMin: 19,
                maxLengthText: "你填写信息有误",
                emptyText: "请输入身份证号"
            },
            {
                xtype: "textfield",
                id: "hwText3",
                allowBlank: false,
                enableKeyEvents: true,
                x: 90,
                y: 130,
                blankText: "年龄不能为空",
                maxLength: 3,
                maxLengthText: "按实际年龄填写",
                emptyText: "年龄"
            },
            {
                xtype: "textfield",
                id: "hwText4",
                allowBlank: false,
                enableKeyEvents: true,
                x: 90,
                y: 160,
                blankText: this.readyonly,
                emptyText: "家庭住址"
            },
            {
                xtype: "vmd.button",
                id: "button",
                text: "提交",
                type: "(none)",
                size: "small",
                x: 230,
                y: 230,
                icon: "success",
                click: "button_click",
                listeners: {
                    click: button_click
                }
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
                x: 80,
                y: 70,
                items: [{
                        xtype: "radio",
                        id: "hwRadio2",
                        boxLabel: "男",
                        width: 44
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio3",
                        boxLabel: "女 "
                    }
                ]
            },
            {
                xtype: "datefield",
                id: "hwDate",
                format: "Y-m-d",
                showToday: true,
                allowBlank: true,
                x: 80,
                y: 200,
                maxValue: this.startdate
            },
            {
                xtype: "datefield",
                id: "hwDate1",
                format: this.enddate,
                showToday: true,
                allowBlank: true,
                x: 220,
                y: 200
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.Lableinput");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Lableinput");
    }
})