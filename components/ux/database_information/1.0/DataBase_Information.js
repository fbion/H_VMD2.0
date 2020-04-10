undefined
Ext.define("vmd.ux.DataBase_Information", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DataBase_Information",
    title: "Panel",
    header: false,
    border: false,
    width: 420,
    height: 550,
    layout: "border",
    autoHeight: false,
    autoScroll: false,
    uxCss: ".style {    text-align: right;    color: #5f5f5f;    font-size: 14px;    font-family: \"微软雅黑\"}.disable input:disabled {    background-color: #fff;    color: #5f5f5f;}",
    uxrequirecss: "[\"lib/laydate/theme/default/laydate.css\"]",
    uxrequirejs: "[\"lib/laydate/laydate.src.js\"]",
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
            var ps;
            var flag = getUrlParam("flag");

            function cslj_click(sender, e) {
                myMask = new Ext.LoadMask(Ext.getBody(), {
                    msg: "加载中,请稍后..."
                });
                if (!lx.getValue()) {
                    Ext.Msg.alert('提示', '类型不能为空！', function() {
                        lx.focus();
                    })
                    return;
                }
                // 判断用户是否为空
                if (!yh.getValue()) {
                    Ext.Msg.alert('提示', '用户不能为空！', function() {
                        yh.focus();
                    })
                    return;
                }
                // 判断密码是否为空
                if (!mm.getValue()) {
                    Ext.Msg.alert('提示', '密码不能为空！', function() {
                        mm.focus();
                    })
                    return;
                }
                // 判断名称是否为空
                if (!mc.getValue()) {
                    Ext.Msg.alert('提示', '名称不能为空！', function() {
                        mc.focus();
                    })
                    return;
                }
                // 判断地址是否为空
                if (!dz.getValue()) {
                    Ext.Msg.alert('提示', '地址不能为空！', function() {
                        dz.focus();
                    })
                    return;
                }
                // 判断端口是否为空
                if (!dk.getValue()) {
                    Ext.Msg.alert('提示', '端口不能为空！', function() {
                        dk.focus();
                    })
                    return;
                }
                // 判断数据服务地址是否为空
                if (!sjfwdz.getValue()) {
                    Ext.Msg.alert('提示', '数据服务地址不能为空！', function() {
                        sjfwdz.focus();
                    })
                    return;
                }
                myMask.show();
                if (del_password == '1') {
                    var pas = (mm.getRawValue() == 123456) ? ps : mm.getRawValue();
                    is_userpwd_encry = '0';
                } else {
                    var pas = (mm.getValue() == 123456) ? ps : mm.getValue();
                    is_userpwd_encry = '1';
                }
                var data = {
                    dbtype: lx.getValue(),
                    system_user: yh.getValue(),
                    system_password: pas,
                    system_server: dz.getValue(),
                    system_name: mc.getValue(),
                    system_sid: '',
                    system_port: dk.getValue(),
                    is_userpwd_encry: is_userpwd_encry
                };
                // 测试连接
                hwDas.get({
                        host: vmd.workspace.dataServiceIp,
                        url: 'modeltool/model/testsystemconn'
                    }, {},
                    data,
                    function(result) {
                        myMask.hide();
                        var res_data = result.data[0].datas[0];
                        if (res_data.isok == '1') {
                            Ext.Msg.alert('提示', "连接成功！")
                        } else {
                            Ext.Msg.alert('提示', "连接失败：" + res_data.msg);
                        }
                    },
                    function(msg) {
                        myMask.hide();
                        Ext.Msg.alert('提示', "连接失败！")
                    }
                );
            }

            function bc_click(sender, e) {
                if (!lx.getValue()) {
                    Ext.Msg.alert('提示', '类型不能为空！', function() {
                        lx.focus();
                    })
                    return;
                }
                // 判断用户是否为空
                if (!yh.getValue()) {
                    Ext.Msg.alert('提示', '用户不能为空！', function() {
                        yh.focus();
                    })
                    return;
                }
                // 判断密码是否为空
                if (!mm.getValue()) {
                    Ext.Msg.alert('提示', '密码不能为空！', function() {
                        mm.focus();
                    })
                    return;
                }
                // 判断名称是否为空
                if (!mc.getValue()) {
                    Ext.Msg.alert('提示', '名称不能为空！', function() {
                        mc.focus();
                    })
                    return;
                }
                // 判断地址是否为空
                if (!dz.getValue()) {
                    Ext.Msg.alert('提示', '地址不能为空！', function() {
                        dz.focus();
                    })
                    return;
                }
                // 判断端口是否为空
                if (!dk.getValue()) {
                    Ext.Msg.alert('提示', '端口不能为空！', function() {
                        dk.focus();
                    })
                    return;
                }
                // 判断版本号是否为空
                if (!bbh.getValue()) {
                    Ext.Msg.alert('提示', '版本号不能为空！', function() {
                        bbh.focus();
                    })
                    return;
                }
                // 判断数据服务地址是否为空
                if (!sjfwdz.getValue()) {
                    Ext.Msg.alert('提示', '数据服务地址不能为空！', function() {
                        sjfwdz.focus();
                    })
                    return;
                }
                if (flag == "edit") {
                    whjmSave(); //数据库维护界面调用服务
                } else {
                    glzjmSave(); //模型管理界面调用的服务
                }
            }

            function newGuid(len) {
                var length = 32;
                if (len)
                    length = len;
                var guid = "";
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                for (var i = 0; i < length; i++) {
                    pos = Math.round(Math.random() * (arr.length - 1));
                    guid += arr[pos];
                }
                return guid;
            }

            function qx_click(sender, e) {
                parent.winclose();
            }
            //模型管理主界面保存
            function glzjmSave() {
                var mytree = tree; //获取树
                var group_id = mytree.getSelNode().parentNode.nodeDataJson.group_id;
                var group_name = mytree.getSelNode().nodeDataJson.group_name;
                var system_id = mytree.getSelNode().id;
                hwDas.get({ //调用查询数据服务,判断调用添加还是修改服务
                        host: vmd.projectInfo.dataServiceIp,
                        url: "modeltool/model/Save/dbsystemID"
                    }, {}, {
                        system_id: system_id
                    },
                    function(result) {
                        if (result.data[0].datas.length == 0) { //查询结果为空，执行保存操作
                            var pas = (mm.getRawValue() == 123456) ? ps : mm.getRawValue();
                            // 保存数据(保存数据集)
                            hwDas.add({
                                    host: vmd.projectInfo.dataServiceIp,
                                    url: "modeltool/model/system"
                                }, {}, {},
                                [{
                                    creator_ba_id: '',
                                    ppdm_system_type: lx.getValue(),
                                    remark: sm.getValue(),
                                    source: '',
                                    system_long_name: '',
                                    technical_owner_ba_id: '',
                                    version_num: bbh.getValue(),
                                    row_created_date: Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'),
                                    row_created_by: Ext.util.Cookies.get('userName'),
                                    system_user: yh.getValue(),
                                    system_password: pas,
                                    system_server: dz.getValue(),
                                    system_name: mc.getValue(),
                                    system_sid: '',
                                    system_port: dk.getValue(),
                                    group_id: group_id,
                                    system_id: system_id,
                                    effective_date: Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'),
                                    system_service: sjfwdz.getValue(),
                                    is_userpwd_encry: '0'
                                }],
                                function(result) {
                                    Ext.Msg.alert("提示", "保存成功！", function() {
                                        mytree.getSelNode().setText('V ' + bbh.getValue());
                                        parent.refresh();
                                    });
                                },
                                function(msg) {
                                    Ext.Msg.alert("提示", "保存失败！")
                                }
                            );
                        } else { //查询结果不为空，执行更新操作
                            if (del_password == '1') {
                                var pas = (mm.getRawValue() == 123456) ? ps : mm.getRawValue();
                                is_userpwd_encry = '0';
                            } else {
                                var pas = (mm.getValue() == 123456) ? ps : mm.getValue();
                                is_userpwd_encry = '1';
                            }
                            hwDas.edit({
                                    host: vmd.projectInfo.dataServiceIp,
                                    url: 'modeltool/model/system'
                                }, {}, {},
                                [{
                                    creator_ba_id: '',
                                    ppdm_system_type: lx.getValue(),
                                    remark: sm.getValue(),
                                    source: '',
                                    system_long_name: '',
                                    technical_owner_ba_id: '',
                                    version_num: bbh.getValue(),
                                    row_changed_date: Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'),
                                    row_changed_by: Ext.util.Cookies.get('userName'),
                                    system_user: yh.getValue(),
                                    system_password: pas,
                                    system_server: dz.getValue(),
                                    system_name: mc.getValue(),
                                    system_sid: '',
                                    system_port: dk.getValue(),
                                    system_id: system_id,
                                    system_service: sjfwdz.getValue(),
                                    is_userpwd_encry: is_userpwd_encry
                                }],
                                function(result) {
                                    Ext.Msg.alert("提示", "保存成功！", function() {
                                        mytree.getSelNode().setText('V ' + bbh.getValue());
                                        parent.refresh();
                                    });
                                },
                                function(msg) {
                                    Ext.Msg.alert("提示", "保存失败！")
                                    return;
                                }
                            );
                        }
                    },
                    function(msg) {}
                );
            }
            //维护界面保存
            function whjmSave() {
                if (del_password == '1') {
                    var pas = (mm.getRawValue() == 123456) ? ps : mm.getRawValue();
                    is_userpwd_encry = '0';
                } else {
                    var pas = (mm.getValue() == 123456) ? ps : mm.getValue();
                    is_userpwd_encry = '1';
                }
                // 修改数据
                hwDas.edit({
                        host: vmd.projectInfo.dataServiceIp,
                        url: 'modeltool/model/system'
                    }, {}, {},
                    [{
                        creator_ba_id: '',
                        ppdm_system_type: lx.getValue(),
                        remark: sm.getValue(),
                        source: '',
                        system_long_name: '',
                        technical_owner_ba_id: '',
                        version_num: bbh.getValue(),
                        row_changed_date: Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'),
                        row_changed_by: Ext.util.Cookies.get('userName'),
                        system_user: yh.getValue(),
                        system_password: pas,
                        system_server: dz.getValue(),
                        system_name: mc.getValue(),
                        system_sid: '',
                        system_port: dk.getValue(),
                        system_id: getUrlParam("system_id"),
                        system_service: sjfwdz.getValue(),
                        is_userpwd_encry: is_userpwd_encry
                    }],
                    function(result) {
                        Ext.Msg.alert("提示", "保存成功！", function() {
                            parent.winclose();
                        })
                    },
                    function(msg) {
                        Ext.Msg.alert("提示", "保存失败！")
                        return;
                    }
                );
            }
            /*----------------------------------------------密码文本框操作---------------------------------------------------------*/
            function mm_keydown(sender, e) {
                if (del_password == '0') {
                    mm.setValue("");
                    del_password = '1';
                }
            }

            function mm_keyup(sender, e) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.DataBase_Information',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "vmd.div",
                id: "div1",
                layoutConfig: {
                    align: "top",
                    pack: "end"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 429,
                height: 53,
                region: "south",
                layout: "hbox",
                hidden: false,
                items: [{
                        xtype: "vmd.button",
                        id: "cslj",
                        text: "测试连接",
                        type: "(none)",
                        size: "small",
                        x: 130,
                        y: 480,
                        width: 75,
                        style: "color: #fff;    background-color: #ec721d;    font-size: 14px;    font-family: \"微软雅黑\";    border: none;",
                        click: "cslj_click",
                        height: 35,
                        margins: "0 20 0 0",
                        disabled: false,
                        listeners: {
                            click: cslj_click
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "bc",
                        text: "保 存",
                        type: "(none)",
                        size: "small",
                        margins: "0 20 0 0 ",
                        width: 60,
                        height: 35,
                        style: "color: #fff;    background-color: #ec721d;    font-size: 14px;    font-family: \"微软雅黑\";    border: none;",
                        click: "bc_click",
                        disabled: false,
                        listeners: {
                            click: bc_click
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "QX",
                        text: "取 消",
                        type: "(none)",
                        size: "small",
                        width: 60,
                        height: 35,
                        margins: "0 60 0 0",
                        style: "color: #5f5f5f;    background-color: #e5e5e5;    border: none;     font-size: 14px;",
                        click: "qx_click",
                        listeners: {
                            click: qx_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 492,
                region: "center",
                layout: "vbox",
                style: "color: #5f5f5f;    font-size: 14px;    font-family: \"微软雅黑\"",
                cls: "style",
                autoScroll: true,
                items: [{
                        xtype: "vmd.div",
                        id: "hwDiv13",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 10,
                        hidden: false
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv7",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 35,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel11",
                                text: "模 型 名  称：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "textfield",
                                id: "mxmc",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 230,
                                readOnly: true,
                                disabled: true,
                                style: "background-color: #fff;    border-bottom-color: #dfdfdf;",
                                disabledClass: "disable"
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv9",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 35,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel7",
                                text: "版  本  号：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "numberfield",
                                id: "bbh",
                                allowDecimals: true,
                                allowNegative: true,
                                decimalPrecision: 2,
                                allowBlank: true,
                                width: 230
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv1",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 35,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel",
                                text: "类  型：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "vmd.combo",
                                id: "lx",
                                width: 230,
                                disabled: false,
                                valueField: this.lxValueField,
                                displayField: this.lxDisplayField,
                                store: this.store
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv2",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 35,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel1",
                                text: "用  户：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "textfield",
                                id: "yh",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 230
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv3",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 35,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel2",
                                text: "密 码：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "textfield",
                                id: "mm",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 230,
                                inputType: "password",
                                keyup: "mm_keyup",
                                keydown: "mm_keydown",
                                listeners: {
                                    keyup: mm_keyup,
                                    keydown: mm_keydown
                                }
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv4",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 35,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel3",
                                text: "名  称：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "textfield",
                                id: "mc",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 230
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv6",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 35,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel5",
                                text: "地  址：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "textfield",
                                id: "dz",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 230
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv8",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 35,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel6",
                                text: "端  口：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "textfield",
                                id: "dk",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 230
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv5",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 35,
                        layout: "hbox",
                        autoWidth: false,
                        items: [{
                                xtype: "label",
                                id: "hwLabel4",
                                text: "数据服务地址：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "textfield",
                                id: "sjfwdz",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 230
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv10",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 35,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel8",
                                text: "创 建 人：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "textfield",
                                id: "cjr",
                                allowBlank: true,
                                enableKeyEvents: true,
                                width: 230,
                                readOnly: true,
                                disabled: true,
                                disabledClass: "disable",
                                style: "background-color: #fff;    border-bottom-color: #dfdfdf;"
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv11",
                        layoutConfig: {
                            align: "middle",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 35,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel9",
                                text: "创 建 时 间：",
                                width: 120,
                                margins: ""
                            },
                            {
                                xtype: "vmd.dateTime",
                                id: "cjsj",
                                text: "dateTime",
                                width: 230,
                                height: 28,
                                format: "yyyy-MM-dd",
                                compatibleOCX: true,
                                disabled: true,
                                cls: "disable"
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv12",
                        layoutConfig: {
                            align: "top",
                            pack: "start"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 390,
                        height: 84,
                        layout: "hbox",
                        items: [{
                                xtype: "label",
                                id: "hwLabel10",
                                text: "说 明：",
                                width: 120,
                                margins: "20 0"
                            },
                            {
                                xtype: "textarea",
                                id: "sm",
                                allowBlank: true,
                                height: 60,
                                width: 230,
                                margins: "18 0"
                            }
                        ]
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.refreshData = function(data) {
            //直接填写方法内容
            lx.setValue(data.ppdm_system_type);
            if (data.ppdm_system_type == '') {
                lx.setText('');
            }
            yh.setValue(data.system_user);
            if (data.system_password == '') {
                mm.setValue("");
            } else {
                mm.setValue("123456");
            }
            mxmc.setValue(data.modlename);
            cjr.setValue(data.row_created_by);
            cjsj.setValue(data.row_created_date);
            mc.setValue(data.system_name);
            mc.setValue(data.system_name);
            dz.setValue(data.system_server);
            dk.setValue(data.system_port);
            bbh.setValue(data.version_num);
            sjfwdz.setValue(data.system_service);
            sm.setValue(data.remark);
            ps = data.system_password;
            del_password = '0';
        }
        this.refreshSJK = function(data, version_num) {
            // 获取当前日期（年月日） 
            var date = vmd.getSysDate();
            mxmc.setValue(data);
            bbh.setValue(version_num);
            lx.setText("");
            yh.setValue("");
            mm.setValue("");
            mc.setValue("");
            dz.setValue("");
            dk.setValue("");
            sjfwdz.setValue("");
            sm.setValue("");
            cjr.setValue("");
            
            cjsj.setValue(date);
            del_password = '0';
        }
        this.editable = function(mold) {
            //直接填写方法内容
            if (mold) {
                lx.enable();
                yh.enable();
                mm.enable();
                mc.enable();
                dz.enable();
                dk.enable();
                bbh.enable();
                sjfwdz.enable();
                sm.enable();
                bc.enable();
                cslj.enable();
            } else {
                lx.disable();
                yh.disable();
                mm.disable();
                mc.disable();
                dz.disable();
                dk.disable();
                bbh.disable();
                sjfwdz.disable();
                sm.disable();
                bc.disable();
                cslj.disable();
            }
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DataBase_Information");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DataBase_Information");
    }
})