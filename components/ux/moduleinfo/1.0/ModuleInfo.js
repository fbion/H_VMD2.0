Ext.define('vmd.ux.moduleInfo.Controller', {
    xtype: 'vmd.ux.moduleInfo.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ModuleInfo", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ModuleInfo",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 605,
    height: 590,
    layout: "absolute",
    autoScroll: true,
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
            var hwTree;
            //创建遮罩层
            var myMask;
            var Selprojectid;
            var selWorkspaceid;

            function refresh(tree, projectid, workspaceid) {
                Selprojectid = projectid;
                selWorkspaceid = workspaceid;
                if (!tree) return;
                hwTree = tree;
                var tree = hwTree;
                var newnode = tree.newnode;
                if (newnode) {
                    hwText.setValue(newGuid(32));
                    hwText1.setValue("");
                    hwText2.setValue(Ext.util.Cookies.get('userName'));
                    hwText3.setValue(Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'));
                    hwText4.setValue("");
                    hwText5.setValue("");
                    hwText6.setValue("");
                    hwText7.setValue("");
                } else {
                    var selId = tree.getSelectedItemId();
                    var selnode = tree.itemObj[selId];
                    hwText.setValue(selnode.code);
                    hwText1.setValue(selnode.text);
                    hwText2.setValue(selnode.createuser);
                    hwText3.setValue(selnode.createtime);
                    hwText4.setValue(selnode.changeuser);
                    hwText5.setValue(selnode.changetime);
                    hwText6.setValue("/modules" + selnode.path + ".vmd");
                    hwText7.setValue(selnode.remark);
                }
            }

            function button_click(sender, e) {
                if (!saveCheck()) {
                    return;
                }
                myMask = new Ext.LoadMask(Ext.getBody(), {
                    msg: "加载中,请稍后..."
                });
                myMask.show();
                saveModelInfo(function() {
                    myMask.hide();
                    Ext.Msg.alert("提示", "保存成功！")
                })
            }
            /*保存前校验
            return:boolean  
            */
            function saveCheck() {
                if (hwText1.getValue() == "") {
                    Ext.Msg.alert("提示", "模块名称不能为空！")
                    return false;
                }
                return true;
            }
            //模块保存按钮操作
            function saveModelInfo(callback) {
                var mytree = hwTree;
                var newnode = mytree.newnode;
                var selId = mytree.getSelectedItemId();
                var selnode = mytree.itemObj[selId];
                var Project_id = Selprojectid;
                var selnodepath = "";
                var id = newGuid(10);
                var category_id = selId;
                if (!selnode) {
                    category_id = "0";
                    selId = "0";
                } else if (selnode.isProject) {
                    category_id = "0";
                    Project_id = selId;
                    selnodepath = selnode.path
                } else {
                    Project_id = selnode.projectId;
                    selnodepath = selnode.path
                }
                var codeid = hwText.getValue();
                var name = hwText1.getValue();
                var remark = hwText7.getValue();
                var type = "0";
                //var vmdpath = mytree.getp
                //编辑
                if (!newnode) {
                    category_id = mytree.getParentId(selId)
                }
                // 判断同一节点下是否存在相同名称的模块
                checkReName(Project_id, category_id, selId, name, function() {
                    if (!newnode) {
                        hwText4.setValue(Ext.util.Cookies.get('userName'));
                        hwText5.setValue(Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'))
                        //更新模块基础信息
                        hwDas.ajax({
                            das: {
                                idedas: true
                            },
                            url: "CDEServcie/module/info",
                            type: 'put',
                            timeout: 5000,
                            params: {},
                            data: [{
                                id: selId,
                                code: selnode.code,
                                type: type,
                                name: name,
                                remark: remark,
                                project_id: Project_id,
                                row_changed_by: hwText4.getValue(),
                                row_changed_date: hwText5.getValue()
                            }],
                            success: function(result) {
                                selnode.text = name;
                                selnode.changetime = hwText5.getValue();
                                selnode.changeuser = hwText4.getValue();
                                selnode.remark = hwText7.getValue();
                                mytree.setItemText(selId, name)
                                hwDas.save("CDEServcie/module/file", {}, {}, [{
                                        filepath: selnode.path,
                                        version: 1,
                                        module_id: selId
                                    }],
                                    function(result) {
                                        var s = new vmd.proxy.Log();
                                        s.save("模块基础信息", selId, Ext.util.Cookies.get('userName') + "在" + Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s') + "修改了模块" + hwText1.getValue() + "的基础信息", "模块", function() {
                                            // alert("保存成功了！")
                                        }, function() {
                                            console.log("日志报存失败了！");
                                        })
                                        myMask.hide();
                                    },
                                    function(msg) {
                                        Ext.Msg.alert("提示", "保存模块版本信息失败")
                                        myMask.hide();
                                        return;
                                    }
                                )
                                callback();
                            },
                            error: function(msg) {
                                Ext.Msg.alert("提示", "保存模块基础信息失败");
                                myMask.hide();
                                return;
                            }
                        })
                    } else {
                        //保存模块基础信息
                        hwDas.ajax({
                            das: {
                                idedas: true
                            },
                            url: "CDEServcie/module/info",
                            type: 'post',
                            timeout: 5000,
                            params: {},
                            data: [{
                                id: id,
                                code: codeid,
                                type: type,
                                name: name,
                                remark: remark,
                                category_id: category_id,
                                project_id: Project_id,
                                row_created_by: hwText2.getValue(),
                                row_created_date: hwText3.getValue(),
                                row_changed_by: hwText4.getValue(),
                                row_changed_date: hwText5.getValue()
                            }],
                            success: function(result) {
                                var s = new vmd.proxy.Log();
                                s.save("模块基础信息", id, Ext.util.Cookies.get('userName') + "在" + Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s') + "修改了模块" + hwText1.getValue() + "的基础信息", "模块", function() {
                                    // alert("保存成功了！")
                                }, function() {
                                    console.log("日志报存失败了！");
                                })
                                if (selId == '0') {
                                    mytree.insertNewChild(selId, id, name);
                                    mytree.setItemImage2(id, "tree/model.png", "tree/model.png", "tree/model.png")
                                } else {
                                    if (mytree.itemObj[selId].loadChild == true) {
                                        mytree.insertNewChild(selId, id, name);
                                        mytree.setItemImage2(id, "tree/model.png", "tree/model.png", "tree/model.png")
                                    }
                                }
                                var treenode = mytree.item(id);
                                if (!selnode) {
                                    treenode.path = "/" + Project_id + "/" + id;
                                } else {
                                    treenode.path = selnodepath + "/" + id;
                                }
                                treenode.projectId = Project_id;
                                if (treenode) {
                                    treenode.isModel = true;
                                    treenode.text = name;
                                    treenode.createuser = hwText2.getValue();
                                    treenode.createtime = hwText3.getValue();
                                    treenode.changetime = hwText5.getValue();
                                    treenode.changeuser = hwText4.getValue();
                                    treenode.remark = remark;
                                    treenode.code = codeid
                                    treenode.newnode = true;
                                }
                                mytree.itemObj[id] = treenode;
                                mytree.selectItem(id, false, false);
                                mytree.newnode = false;
                                //保存模块路径版本信息
                                hwDas.ajax({
                                    das: {
                                        idedas: true
                                    },
                                    url: "CDEServcie/module/file",
                                    type: 'post',
                                    timeout: 5000,
                                    params: {},
                                    data: [{
                                        filepath: selnodepath + "/" + id,
                                        version: 1,
                                        module_id: id
                                    }],
                                    success: function(result) {
                                        myMask.hide();
                                        // Ext.Msg.alert("提示", "保存成功！")
                                    },
                                    error: function(msg) {
                                        Ext.Msg.alert("提示", "保存模块版本信息失败")
                                        myMask.hide();
                                        return;
                                    }
                                })
                                callback();
                            },
                            error: function(msg) {
                                Ext.Msg.alert("提示", "保存模块基础信息失败")
                                myMask.hide();
                                return;
                            }
                        })
                    }
                })
            }

            function getNodePath(selnode) {
                if (selnode) {
                    var selModPath = 'modules' + selnode.path;
                    //如果是框架项目 则添加system
                    if (btnProjectName.projectId == "eQ9ULgcVb1") {
                        selModPath = 'system/' + selModPath
                    }
                    return selModPath;
                } else
                    return "";
            }

            function button1_click(sender, e) {
                var mytree = hwTree;
                var selId = mytree.getSelectedItemId();
                var selnode = mytree.itemObj[selId];
                myMask = new Ext.LoadMask(Ext.getBody(), {
                    msg: "加载中,请稍后..."
                });
                var selModPath = getNodePath(selnode)
                myMask.show();
                if (selnode) {
                    if (selnode.newnode || mytree.newnode) {
                        if (!saveCheck()) {
                            myMask.hide();
                            return;
                        }
                        saveModelInfo(function() {
                            myMask.hide();
                            selId = mytree.getSelectedItemId();
                            selnode = mytree.itemObj[selId];
                            selModPath = getNodePath(selnode)
                            openSelMode(selnode.id, selnode.text, selModPath + '.vmd', selWorkspaceid);
                        })
                    } else {
                        if (!saveCheck()) {
                            myMask.hide();
                            return;
                        }
                        selId = mytree.getSelectedItemId();
                        selnode = mytree.itemObj[selId];
                        selModPath = getNodePath(selnode)
                        vmd.isCheckFileExist(selModPath + '.vmd', function(data) {
                            myMask.hide();
                            if (data) {
                                var params = {
                                    id: selnode.id,
                                    name: selnode.text,
                                    path: selModPath + '.vmd',
                                    workspaceid: selWorkspaceid
                                }
                                var url = vmd.virtualPath + '/design/default.html?' + Ext.urlEncode(params);
                                var name = selnode.text + " 模块设计"
                                if (vmd.isIE9 || vmd.isIE8 || vmd.isIE7 || vmd.isIE6) {
                                    window.open(url)
                                } else {
                                    window.open(url, name)
                                }
                            } else {
                                openSelMode(selnode.id, selnode.text, selModPath + '.vmd', selWorkspaceid);
                            }
                        }, true);
                    }
                } else {
                    if (!saveCheck()) {
                        myMask.hide();
                        return;
                    }
                    saveModelInfo(function() {
                        myMask.hide();
                        selId = mytree.getSelectedItemId();
                        selnode = mytree.itemObj[selId];
                        selModPath = getNodePath(selnode)
                        openSelMode(selnode.id, selnode.text, selModPath + '.vmd', selWorkspaceid);
                    })
                }
            }

            function button2_click(sender, e) {
                var mytree = hwTree;
                var selId = mytree.getSelectedItemId();
                var selnode = mytree.itemObj[selId];
                if (!selnode.isModel)
                    return
                var params = "";
                if (vmd.EnvVars) {
                    for (var i in vmd.EnvVars) {
                        params += i + "=" + vmd.EnvVars[i] + "&"
                    }
                }
                var url = vmd.virtualPath + '/modules' + selnode.path + '.html?' + params + 'r=' + new Date().getTime();
                //如果是框架项目 则添加system
                if (btnProjectName.projectId == "eQ9ULgcVb1") {
                    url = vmd.virtualPath + '/system/modules' + selnode.path + '.html?' + params + 'r=' + new Date().getTime();
                }
                window.open(url, selnode.text);
            }
            //自定义自定义方法
            function newGuid(len) {
                var length = 32;
                if (len)
                    length = len - 2
                var guid = "";
                for (var i = 1; i <= length; i++) {
                    var n = Math.floor(Math.random() * 16.0).toString(16);
                    guid += n;
                }
                return "hw" + guid;
            }

            function button3_click(sender, e) {
                var html = "<iframe src='" + vmd.virtualPath + "/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw0cb5518a.html?workspaceid=" + selWorkspaceid + "&r=" + new Date().getTime() + "' frameborder=0 scrolling=no style='height:100%;width:100%'></iframe>";
                var win = openWin({
                    title: "模块注册发布",
                    modal: true,
                    maximized: false,
                    height: 500,
                    width: 600,
                    maximizable: true,
                    resizable: true,
                    bodyStyle: "background-color:#fff",
                    closeAction: 'close'
                }, html)
            }

            function checkReName(projectId, pId, id, name, callback) {
                var isRep = false;
                hwDas.ajax({
                    das: {
                        idedas: true
                    },
                    url: "CDEServcie/module/info",
                    type: 'get',
                    timeout: 5000,
                    params: {
                        category_id: pId,
                        project_id: projectId
                    },
                    success: function(result) {
                        var datajson = result.data[0].datas;
                        for (var i = 0; i < datajson.length; i++) {
                            if (datajson[i].name == name && datajson[i].id != id) {
                                isRep = true;
                                break
                            }
                        }
                        if (isRep) {
                            myMask.hide();
                            Ext.Msg.alert('提示', '此模版名称已存在');
                        } else {
                            callback()
                        }
                    },
                    error: function(msg) {
                        myMask.hide();
                        Ext.Msg.alert("提示", "获取模块信息失败")
                    }
                })
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ModuleInfo',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
                xtype: "label",
                id: "label",
                text: "模块基础信息",
                x: 60,
                y: 30,
                style: "color: blue;    font-size: 20px;"
            },
            {
                xtype: "label",
                id: "label1",
                text: "模块编码：",
                x: 60,
                y: 90
            },
            {
                xtype: "label",
                id: "label2",
                text: "模块名称：",
                x: 60,
                y: 130
            },
            {
                xtype: "label",
                id: "label3",
                text: "创建人：",
                x: 60,
                y: 170
            },
            {
                xtype: "label",
                id: "label4",
                text: "创建时间：",
                x: 60,
                y: 210
            },
            {
                xtype: "label",
                id: "label5",
                text: "修改人：",
                x: 60,
                y: 250
            },
            {
                xtype: "label",
                id: "label6",
                text: "修改时间：",
                x: 60,
                y: 290
            },
            {
                xtype: "label",
                id: "label7",
                text: "路径：",
                x: 60,
                y: 330
            },
            {
                xtype: "label",
                id: "label8",
                text: "说明：",
                x: 60,
                y: 370
            },
            {
                xtype: "textfield",
                id: "hwText",
                allowBlank: true,
                enableKeyEvents: true,
                x: 120,
                y: 90,
                width: 450,
                disabled: true
            },
            {
                xtype: "textfield",
                id: "hwText1",
                allowBlank: true,
                enableKeyEvents: true,
                x: 120,
                y: 130,
                width: 450
            },
            {
                xtype: "textfield",
                id: "hwText2",
                allowBlank: true,
                enableKeyEvents: true,
                x: 120,
                y: 170,
                width: 450,
                disabled: true
            },
            {
                xtype: "textfield",
                id: "hwText3",
                allowBlank: true,
                enableKeyEvents: true,
                x: 120,
                y: 210,
                width: 450,
                readOnly: false,
                disabled: true
            },
            {
                xtype: "textfield",
                id: "hwText4",
                allowBlank: true,
                enableKeyEvents: true,
                x: 120,
                y: 250,
                width: 450,
                disabled: true
            },
            {
                xtype: "textfield",
                id: "hwText5",
                allowBlank: true,
                enableKeyEvents: true,
                x: 120,
                y: 290,
                width: 450,
                disabled: true
            },
            {
                xtype: "textfield",
                id: "hwText6",
                allowBlank: true,
                enableKeyEvents: true,
                x: 120,
                y: 330,
                width: 450,
                disabled: true
            },
            {
                xtype: "textarea",
                id: "hwText7",
                allowBlank: true,
                x: 120,
                y: 370,
                width: 450,
                height: 80
            },
            {
                xtype: "vmd.button",
                id: "button",
                text: "保存",
                type: "info",
                size: "large",
                x: 120,
                y: 470,
                click: "button_click",
                listeners: {
                    click: button_click
                }
            },
            {
                xtype: "vmd.button",
                id: "button1",
                text: "设计",
                type: "info",
                size: "large",
                x: 240,
                y: 470,
                click: "button1_click",
                listeners: {
                    click: button1_click
                }
            },
            {
                xtype: "vmd.button",
                id: "button2",
                text: "预览",
                type: "info",
                size: "large",
                x: 360,
                y: 470,
                click: "button2_click",
                listeners: {
                    click: button2_click
                }
            },
            {
                xtype: "vmd.button",
                id: "button3",
                text: "注册",
                type: "info",
                size: "large",
                x: 480,
                y: 470,
                click: "button3_click",
                listeners: {
                    click: button3_click
                }
            },
            {
                xtype: "vmd.button",
                id: "button4",
                text: "测试注册",
                type: "(none)",
                size: "small",
                x: 480,
                y: 530,
                width: 80,
                hidden: true
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.refresh = function(tree, projectid, workspaceid) {
            //直接填写方法内容
            refresh(tree, projectid, workspaceid)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ModuleInfo");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ModuleInfo");
    }
})