undefined
Ext.define("vmd.ux.LeftTreeType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.LeftTreeType",
    title: "Panel",
    header: false,
    border: false,
    width: 247,
    height: 275,
    layout: "border",
    beforerender: "LeftTreeType_beforerender",
    disabled: false,
    autoHeight: false,
    unstyled: false,
    html: "<div>控件属性设为隐藏；调用方法:createTree(divid,type)</div>",
    listeners: {
        beforerender: function() {
            this.LeftTreeType_beforerender(this)
        }
    },
    uxCss: ".containerTableStyle {    /*padding: 10px 0px 0px 0px;    margin: 10px 0px 0px 0px;*/}.standartTreeRow{    font-family: Microsoft YaHei;}",
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
        String.prototype.trimEnd = function(trimStr) {
            if (!trimStr) {
                return this;
            }
            var temp = this;
            while (true) {
                if (temp.substr(temp.length - trimStr.length, trimStr.length) != trimStr) {
                    break;
                }
                temp = temp.substr(0, temp.length - trimStr.length);
            }
            return temp;
        }
        var g_firstParentID = "";
        //文件夹名称录入框
        Ext.MyFordWin = Ext.extend(Ext.Window, {
            xtype: "window",
            title: "输入分类名称",
            width: 300,
            height: 150,
            layout: "form",
            bodyStyle: 'padding:15px',
            labelAlign: "left",
            labelWidth: 40,
            modal: true,
            constructor: function(callback, name) {
                this.valueName = name;
                this.callback = callback;
                this.callParent();
            },
            initComponent: function() {
                var me = this;
                this.fbar = [{
                    text: "确定",
                    handler: function() {
                        me.callback(Ext.getCmp('filename').getValue(), function() {
                            me.close();
                        });
                    }
                }, {
                    text: "取消",
                    handler: function() {
                        me.close();
                    }
                }];
                this.items = [{
                    id: 'filename',
                    xtype: "textfield",
                    fieldLabel: "名称",
                    anchor: "100%",
                    value: this.valueName
                }]
                Ext.MyFordWin.superclass.initComponent.call(this);
            }
        });

        function LeftTreeType_beforerender(sender) {
            var hwToken = vmd.getUrlParam('hwToken');
            if (hwToken) {
                vmd.Cookie.set('hwToken', hwToken);
            }
        }
        var treeObject;
        // 获取模块／分类信息
        function changeData(hwTree, _type, divid, func) {
            treeObject = hwTree;
            var mytree = treeObject;
            var firstNode = "";
            mytree.deleteChildItems(0);
            mytree.loadJSONObject({
                id: 0,
                text: "分类",
                item: []
            });
            mytree.itemObj = {};
            mytree.newnode = false;
            if (_type != '') {
                //进度条
                var myMask = new Ext.LoadMask(Ext.getCmp(divid).el, {
                    msg: "数据加载中,请稍后...",
                    msgCls: 'z-index:10000;'
                });
                myMask.show();
                var _params = {
                    class_system: _type
                };
                hwDas.get({
                    host: vmd.workspace.dataServiceIp,
                    url: 'rypx/classsys/classtree'
                }, {}, _params, function(result) {
                    var datajson = result.data[0].datas;
                    //datajson=[{id:"dzjs",name:"js",pid:0,xh:1}]
                    var nodeList = datajson.filter(function(elem) {
                        return elem.pid === "0";
                    });
                    var treeDataJson = [];
                    for (var i = 0; i < nodeList.length; i++) {
                        g_firstParentID = nodeList[i].id;
                        mytree.insertNewChild(0, nodeList[i].id, nodeList[i].name);
                        SetTreeNodeImage2(mytree, nodeList[i].id, "floder");
                        mytree.closeItem(nodeList[i].id);
                        var treenode = mytree.item(nodeList[i].id);
                        treenode.path = "/" + _type + "/" + nodeList[i].id;
                        treenode.class_system = _type;
                        treenode.pid = nodeList[i].pid;
                        if (treenode) {
                            treenode.isFord = true;
                            treenode.loadChild = false;
                            treenode.isProject = false;
                        }
                        mytree.itemObj[nodeList[i].id] = treenode;
                        var _find = datajson.filter(function(elem) {
                            return elem.pid === nodeList[i].id;
                        });
                        if (_find.length > 0) {
                            LoadTreeData(mytree, nodeList[i].id, datajson, _find, _type, 1);
                        }
                    }
                    bCategoryFlag = true;
                    bInfoFlag = true;
                    if (bCategoryFlag && bInfoFlag) {
                        myMask.hide();
                    }
                    if (func != null && func != undefined) {
                        func();
                    }
                }, function(err) {
                    bCategoryFlag = true;
                    bInfoFlag = true;
                    if (bCategoryFlag && bInfoFlag) {
                        myMask.hide();
                    }
                    Ext.Msg.alert("提示", "获取树分类信息失败", function() {})
                });
            }
            //绑定右键菜单
            var menu = new dhtmlXMenuObject();
            menu.renderAsContextMenu();
            menu.attachEvent("onClick", onMenuClick);
            menu.addNewChild(menu.topId, 1, "newFord", "添加同级分类", false);
            menu.addNewChild(menu.topId, 2, "newMode", "添加下级分类", false);
            menu.addNewChild(menu.topId, 3, "moveUp", "上移", false);
            menu.addNewChild(menu.topId, 4, "moveDown", "下移", false);
            menu.addNewChild(menu.topId, 5, "edit", "编辑", false);
            menu.addNewChild(menu.topId, 6, "delete", "删除", false);
            mytree.enableDragAndDrop("temporary_disabled");
            mytree.enableContextMenu(menu);
            mytree.attachEvent("onBeforeContextMenu", function(itemId) {
                var mytree = treeObject;
                var selId = mytree.getSelectedItemId();
                var selnode = mytree.itemObj[selId];
                var index = treeObject.getIndexById(selId); //所在索引值
                var pid = treeObject.getParentId(selId); //父节点
                var hasChild = treeObject.hasChildren(pid) - 1; //同级个数
                //selnode.isProject
                if (index === 0) {
                    menu.hideItem('moveUp');
                } else if (index > 0) {
                    menu.showItem('moveUp');
                }
                if (hasChild > index) {
                    menu.showItem('moveDown');
                } else {
                    menu.hideItem('moveDown');
                }
                return true
            })
            //绑定左键事件
            mytree.attachEvent('onClick', function(id) {
                //var level = treeObject.getLevel(id);
                //var index = treeObject.getIndexById(id);
                //var pid = treeObject.getParentId(id);//父节点
                //var hasChild = treeObject.hasChildren(pid);
                //var hasChild = treeObject.hasChildren(id);
                //var nid = treeObject.getItemIdByIndex(index + 1);
                //alert("hasChild:" + hasChild);
                var _text = treeObject.getItemText(id);
                LeftTreeType.fireEvent('nodeClick', treeObject, id, _text)
            });
            //绑定右键事件 设置右键选中节点
            mytree.attachEvent('onRightClick', function(id) {
                //panel下的右键取消
                Ext.getCmp('p_menu') && Ext.getCmp('p_menu').hide();
                mytree.selectItem(id);
                typeTree_nodeClick(mytree, id)
            });
            //绑定展开事件
            mytree.attachEvent('onOpenEnd', function(id, state) {
                typeTree_onOpenEnd(mytree, id)
            });
        }
        // 获取单位信息
        function changeDataEx(hwTree, _type, divid, fun) {
            treeObject = hwTree;
            var mytree = treeObject;
            var firstNode = "";
            mytree.deleteChildItems(0);
            mytree.loadJSONObject({
                id: 0,
                text: "单位信息",
                item: []
            });
            mytree.itemObj = {};
            mytree.newnode = false;
            var _url = "";
            switch (_type) {
                case "GW":
                    {
                        _url = "platform/v2/htgl/organization";
                    };
                    break
                case "GW_ONLY":
                    {
                        _url = "platform/v1/position";
                    }
                    break;
                case "GW_SXJG":
                    {
                        _url = "rypx/common/positiontree";
                    }
                    break;
            }
            if (_type != '') {
                //进度条
                var myMask = new Ext.LoadMask(Ext.getCmp(divid).el, {
                    msg: "数据加载中,请稍后...",
                    msgCls: 'z-index:10000;'
                });
                myMask.show();
                var _params = {
                    adminflag: 'Y'
                };
                hwDas.get({
                    host: vmd.workspace.dataServiceIp,
                    url: _url
                }, {}, _params, function(result) {
                    
                    var datajson = result.data[0].datas;
                    //datajson=[{id:"dzjs",name:"js",pid:0,xh:1}]
                    if (_type === "GW") {
                        var nodeList = datajson.filter(function(elem) {
                            return elem.sjdwdm === "0";
                        });
                        var treeDataJson = [];
                        for (var i = 0; i < nodeList.length; i++) {
                            mytree.insertNewChild(0, nodeList[i].dwdm, nodeList[i].dwmc);
                            SetTreeNodeImage2(mytree, nodeList[i].dwdm, "floder");
                            mytree.closeItem(nodeList[i].dwdm);
                            var treenode = mytree.item(nodeList[i].dwdm);
                            treenode.pid = nodeList[i].sjdwdm;
                            treenode.dwdm = nodeList[i].dwdm;
                            treenode.baid = nodeList[i].baid;
                            if (treenode) {
                                treenode.isFord = true;
                                treenode.loadChild = false;
                                treenode.isProject = false;
                            }
                            mytree.itemObj[nodeList[i].dwdm] = treenode;
                            var _find = datajson.filter(function(elem) {
                                return elem.sjdwdm === nodeList[i].dwdm;
                            });
                            if (_find.length > 0) {
                                LoadTreeData(mytree, nodeList[i].dwdm, datajson, _find, _type, 2);
                            }
                        }
                    } else if (_type === "GW_ONLY") {
                        var nodeList = datajson;
                        var treeDataJson = [];
                        for (var i = 0; i < nodeList.length; i++) {
                            mytree.insertNewChild(0, nodeList[i].positionid, nodeList[i].positionname);
                            SetTreeNodeImage2(mytree, nodeList[i].positionid, "floder");
                            mytree.closeItem(nodeList[i].positionid);
                            var treenode = mytree.item(nodeList[i].positionid);
                            treenode.pid = nodeList[i].sjdwdm;
                            treenode.dwdm = nodeList[i].dwdm;
                            treenode.baid = nodeList[i].baid;
                            if (treenode) {
                                treenode.isFord = true;
                                treenode.loadChild = false;
                                treenode.isProject = false;
                            }
                            mytree.itemObj[nodeList[i].positionid] = treenode;
                        }
                    } else if (_type === "GW_SXJG") {
                        //datajson=[{id:"dzjs",name:"js",pid:0,xh:1}]
                        
                        var nodeList = datajson.filter(function(elem) {
                            return elem.sjdm === "0";
                        });
                        var treeDataJson = [];
                        for (var i = 0; i < nodeList.length; i++) {
                            console.log(nodeList);
                            g_firstParentID = nodeList[i].dm;
                            mytree.insertNewChild(0, nodeList[i].dm, nodeList[i].mc);
                            SetTreeNodeImage2(mytree, nodeList[i].dm, "floder");
                            mytree.closeItem(nodeList[i].dm);
                            var treenode = mytree.item(nodeList[i].dm);
                            treenode.path = "/" + _type + "/" + nodeList[i].dm;
                            treenode.class_system = _type;
                            treenode.pid = nodeList[i].sjdm;
                            if (treenode) {
                                treenode.isFord = true;
                                treenode.loadChild = false;
                                treenode.isProject = false;
                            }
                            mytree.itemObj[nodeList[i].dm] = treenode;
                            var _find = datajson.filter(function(elem) {
                                return elem.sjdm === nodeList[i].dm;
                            });
                            if (_find.length > 0) {
                                LoadTreeData(mytree, nodeList[i].dm, datajson, _find, _type, 4);
                            }
                        }
                        // var nodeList = datajson;
                        // var treeDataJson = [];
                        // for (var i = 0; i < nodeList.length; i++) {
                        //     mytree.insertNewChild(0, nodeList[i].dm, nodeList[i].mc);
                        //     SetTreeNodeImage2(mytree, nodeList[i].dm, "floder");
                        //     mytree.closeItem(nodeList[i].dm);
                        //     var treenode = mytree.item(nodeList[i].dm);
                        //     treenode.pid = nodeList[i].sjdm;
                        //     treenode.dwdm = nodeList[i].dm;
                        //     treenode.baid = nodeList[i].dm;
                        //     if (treenode) {
                        //         treenode.isFord = true;
                        //         treenode.loadChild = false;
                        //         treenode.isProject = false;
                        //     }
                        //     mytree.itemObj[nodeList[i].positionid] = treenode;
                        // }
                    }
                    myMask.hide();
                    if (fun != null && fun != undefined) {
                        fun();
                    }
                }, function(err) {
                    
                    myMask.hide();
                    Ext.Msg.alert("提示", "获取单位树分类信息失败", function() {})
                });
            }
            //绑定左键事件
            mytree.attachEvent('onClick', function(id) {
                //var _text = treeObject.getItemText(id);
                var selnode = mytree.itemObj[id];
                LeftTreeType.fireEvent('nodeClick', treeObject, selnode.dwdm, selnode.text)
            });
        }
        //绑定资源选择
        function changeDataZYXZ(hwTree, _type, divid) {
            treeObject = hwTree;
            var mytree = treeObject;
            var firstNode = "";
            mytree.deleteChildItems(0);
            mytree.loadJSONObject({
                id: 0,
                text: "单位信息",
                item: []
            });
            mytree.itemObj = {};
            mytree.newnode = false;
            if (_type != '') {
                //进度条
                var myMask = new Ext.LoadMask(Ext.getCmp(divid).el, {
                    msg: "数据加载中,请稍后...",
                    msgCls: 'z-index:10000;'
                });
                myMask.show();
                var _params = {
                    row_user: vmd.getUserId()
                };
                hwDas.get({
                    host: vmd.workspace.dataServiceIp,
                    url: 'wdk/Directory/SysDirectoryByPower'
                }, {}, _params, function(result) {
                    
                    var datajson = result.data[0].datas;
                    //datajson=[{id:"dzjs",name:"js",pid:0,xh:1}]
                    var nodeList = datajson.filter(function(elem) {
                        return elem.parentnodeid === "";
                    });
                    var treeDataJson = [];
                    for (var i = 0; i < nodeList.length; i++) {
                        mytree.insertNewChild(0, nodeList[i].nodeid, nodeList[i].nodename);
                        SetTreeNodeImage2(mytree, nodeList[i].nodeid, "floder");
                        mytree.closeItem(nodeList[i].nodeid);
                        var treenode = mytree.item(nodeList[i].nodeid);
                        treenode.pid = nodeList[i].parentnodeid;
                        if (treenode) {
                            treenode.isFord = true;
                            treenode.loadChild = false;
                            treenode.isProject = false;
                        }
                        mytree.itemObj[nodeList[i].nodeid] = treenode;
                        var _find = datajson.filter(function(elem) {
                            return elem.parentnodeid === nodeList[i].nodeid;
                        });
                        if (_find.length > 0) {
                            LoadTreeData(mytree, nodeList[i].nodeid, datajson, _find, _type, 3);
                        }
                    }
                    myMask.hide();
                }, function(err) {
                    
                    myMask.hide();
                    Ext.Msg.alert("提示", "获取单位树分类信息失败", function() {})
                });
            }
            //绑定左键事件
            mytree.attachEvent('onClick', function(id) {
                var _text = treeObject.getItemText(id);
                LeftTreeType.fireEvent('nodeClick', treeObject, id, _text)
            });
        }
        //绑定树节点数据
        function LoadTreeData(mytree, pid, datajson, fatherList, _type, flag) {
            mytree.newnode = false;
            var hasChild = mytree.hasChildren(pid);
            var selnode = mytree.itemObj[pid];
            if (flag === 1) {
                var selnodepath = selnode.path;
                for (var i = 0; i < fatherList.length; i++) {
                    var _find = datajson.filter(function(elem) {
                        return elem.pid === fatherList[i].id;
                    });
                    mytree.insertNewChild(pid, fatherList[i].id, fatherList[i].name);
                    if (_find.length > 0) {
                        SetTreeNodeImage2(mytree, fatherList[i].id, "floder");
                        //mytree.insertNewChild(fatherList[i].id, fatherList[i].id + "-0", "");
                        mytree.closeItem(fatherList[i].id);
                        var treenode = mytree.item(fatherList[i].id);
                        treenode.path = selnodepath + "/" + fatherList[i].id;
                        treenode.pid = pid;
                        treenode.class_system = _type;
                        if (treenode) {
                            treenode.isFord = true;
                            treenode.loadChild = false;
                        }
                    } else {
                        SetTreeNodeImage2(mytree, fatherList[i].id, "module");
                        var treenode = mytree.item(fatherList[i].id);
                        treenode.path = selnodepath + "/" + fatherList[i].id;
                        treenode.pid = pid;
                        treenode.class_system = _type;
                    }
                    mytree.itemObj[fatherList[i].id] = treenode;
                    LoadTreeData(mytree, fatherList[i].id, datajson, _find, _type, 1);
                }
            } else if (flag == 2) { //岗位
                for (var i = 0; i < fatherList.length; i++) {
                    var _find = datajson.filter(function(elem) {
                        return elem.sjdwdm === fatherList[i].dwdm;
                    });
                    mytree.insertNewChild(pid, fatherList[i].baid, fatherList[i].dwmc);
                    if (_find.length > 0) {
                        SetTreeNodeImage2(mytree, fatherList[i].baid, "floder");
                        mytree.closeItem(fatherList[i].baid);
                        var treenode = mytree.item(fatherList[i].baid);
                        treenode.pid = pid;
                        treenode.dwdm = fatherList[i].dwdm;
                        treenode.baid = fatherList[i].baid;
                        if (treenode) {
                            treenode.isFord = true;
                            treenode.loadChild = false;
                        }
                    } else {
                        SetTreeNodeImage2(mytree, fatherList[i].baid, "module");
                        var treenode = mytree.item(fatherList[i].baid);
                        treenode.pid = pid;
                        treenode.dwdm = fatherList[i].dwdm;
                        treenode.baid = fatherList[i].baid;
                    }
                    mytree.itemObj[fatherList[i].baid] = treenode;
                    LoadTreeData(mytree, fatherList[i].baid, datajson, _find, _type, 2);
                }
            } else if (flag == 3) { //加载知识库左侧树
                for (var i = 0; i < fatherList.length; i++) {
                    var _find = datajson.filter(function(elem) {
                        return elem.parentnodeid === fatherList[i].nodeid;
                    });
                    mytree.insertNewChild(pid, fatherList[i].nodeid, fatherList[i].nodename);
                    if (_find.length > 0) {
                        SetTreeNodeImage2(mytree, fatherList[i].nodeid, "floder");
                        mytree.closeItem(fatherList[i].nodeid);
                        var treenode = mytree.item(fatherList[i].nodeid);
                        treenode.pid = pid;
                        if (treenode) {
                            treenode.isFord = true;
                            treenode.loadChild = false;
                        }
                    } else {
                        SetTreeNodeImage2(mytree, fatherList[i].nodeid, "module");
                        var treenode = mytree.item(fatherList[i].nodeid);
                        treenode.pid = pid;
                    }
                    mytree.itemObj[fatherList[i].nodeid] = treenode;
                    LoadTreeData(mytree, fatherList[i].nodeid, datajson, _find, _type, 3);
                }
            } else if (flag == 4) {
                for (var i = 0; i < fatherList.length; i++) {
                    var _find = datajson.filter(function(elem) {
                        return elem.sjdm === fatherList[i].dm;
                    });
                    mytree.insertNewChild(pid, fatherList[i].dm, fatherList[i].mc);
                    if (_find.length > 0) {
                        SetTreeNodeImage2(mytree, fatherList[i].dm, "floder");
                        mytree.closeItem(fatherList[i].dm);
                        var treenode = mytree.item(fatherList[i].dm);
                        treenode.pid = pid;
                        if (treenode) {
                            treenode.isFord = true;
                            treenode.loadChild = false;
                        }
                    } else {
                        SetTreeNodeImage2(mytree, fatherList[i].dm, "module");
                        var treenode = mytree.item(fatherList[i].dm);
                        treenode.pid = pid;
                    }
                    mytree.itemObj[fatherList[i].dm] = treenode;
                    LoadTreeData(mytree, fatherList[i].dm, datajson, _find, _type, 4);
                }
            }
        }
        //设置节点图片样式
        function SetTreeNodeImage2(myTree, id, flag) {
            switch (flag) {
                case "floder":
                    {
                        //var url="http://www.hanweikeji.com:6002/lib/dhtmlx/imgs/dhxtree_material/tree/fun.png";
                        myTree.setItemImage2(id, "tree/folderClosed.gif", "tree/folderOpen.gif", "tree/folderClosed.gif");
                    }
                    break;
                case "module":
                    {
                        myTree.setItemImage2(id, "tree/model.png", "tree/model.png", "tree/model.png");
                    }
                    break;
            }
        }
        // 展开节点操作
        function typeTree_onOpenEnd(sender, id) {
            var proId = id;
            //alert(id);
        }
        var lastnodeType = "-1"; // 0:空白，1：分类，2：模板
        //上次点击的节点
        var bselNodeId = "";
        //右键点击树节点操作
        function typeTree_nodeClick(sender, id) {
            var proId = id;
            var mytree = treeObject;
            mytree.newnode = false;
            var hasChild = mytree.hasChildren(proId);
            var selnode = mytree.itemObj[proId];
            var selnodepath = selnode.path;
            var projectId = "cbab882c-6f5d-4805-b352-692040a69975";
            var childParentId = "0";
            // if(bselNodeId != id) 
            {
                if (selnode.isModel) {
                    lastnodeType = "2"
                    // document.getElementById("iframe_page").src = vmd.virtualPath + '/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwa99a3307.html';
                } else {
                    if (lastnodeType != "1") {
                        //document.getElementById("iframe_page").src = vmd.virtualPath + '/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw03cb4931.html';
                        //MyP_jcxx.body.update("<" + "iframe " + " src='/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw03cb4931.html' " + " width=100% height=100% frameborder=0  " + ">" + "sdsds" + "<" + "/" + "iframe" + ">");
                        // projectId = selnode.projectId;
                        childParentId = proId;
                        lastnodeType = "1";
                    }
                    // document.getElementById("iframe_page").src = vmd.virtualPath + '/modules/eQ9ULgcVb1/eQ9ULgcVb5/hw03cb4931.html';
                }
            }
            bselNodeId = id;
        }
        //右键菜单事件
        function onMenuClick(menuitemId) {
            if (menuitemId == "newFord") { // 新建同级
                creatFordEx(1);
            } else if (menuitemId == "newMode") { // 新建子级
                // 在空白处点击鼠标时，就取消原有节点的选中
                // treeObject.clearSelection();
                //treeObject.newnode = true;
                creatFordEx(2);
            } else if (menuitemId == "delete") {
                //删除
                deleteNode();
            } else if (menuitemId == "edit") {
                //编辑
                nodeReName();
            } else if (menuitemId == "moveUp") {
                //上移
                var selId = treeObject.getSelectedItemId();
                var data = {
                    id: selId,
                    move: 'UP'
                }
                hwDas.edit({
                        host: vmd.workspace.dataServiceIp,
                        url: 'rypx/classsys/classtree'
                    }, {}, {}, data,
                    function(result) {
                        treeObject.moveItem(selId, 'up_strict');
                    },
                    function(erro) {
                        Ext.Msg.alert("提示", "上移树出现问题!");
                    });
            } else if (menuitemId == "moveDown") {
                //下移
                var selId = treeObject.getSelectedItemId();
                var data = {
                    id: selId,
                    move: 'DOWN'
                }
                hwDas.edit({
                        host: vmd.workspace.dataServiceIp,
                        url: 'rypx/classsys/classtree'
                    }, {}, {}, data,
                    function(result) {
                        treeObject.moveItem(selId, 'down_strict');
                    },
                    function(erro) {
                        Ext.Msg.alert("提示", "下移树出现问题!");
                    });
            }
        }
        //创建添加同级分类钮操作
        function creatFordEx(flag) {
            var addford = function(fordname, callback) {
                var mytree = treeObject;
                var selId = mytree.getSelectedItemId();
                var selnode = mytree.itemObj[selId];
                var selnodepath = selnode.path;
                var parentId = selnode.pid;
                var _type = selnode.class_system;
                var nodename = fordname;
                var newnodeid = newGuid(32);
                var xh = 10;
                myMask = new Ext.LoadMask(Ext.getBody(), {
                    msg: "加载中,请稍后..."
                });
                myMask.show();
                // 判断同一目录下是否存在相同名称分类
                checkfordReNameEx(parentId, newnodeid, nodename, function() {
                    if (callback) {
                        callback()
                    }
                    try {
                        
                        if (flag == 1) {
                            mytree.insertNewChild(parentId, newnodeid, nodename);
                            SetTreeNodeImage2(mytree, newnodeid, "module");
                            var data = {
                                pid: parentId,
                                class_system: _type,
                                name: nodename
                            }
                        } else if (flag == 2) {
                            mytree.insertNewChild(selId, newnodeid, nodename);
                            SetTreeNodeImage2(mytree, newnodeid, "module");
                            SetTreeNodeImage2(mytree, selId, "floder");
                            var data = {
                                pid: selId,
                                class_system: _type,
                                name: nodename
                            }
                        }
                        var treenode = mytree.item(newnodeid);
                        treenode.path = selnodepath + "/" + newnodeid;
                        treenode.pid = parentId;
                        treenode.class_system = _type;
                        //selnode.loadChild = true;
                        if (treenode) {
                            treenode.isFord = true;
                            treenode.loadChild = true;
                        }
                        mytree.itemObj[newnodeid] = treenode;
                        
                        hwDas.add({
                                host: vmd.workspace.dataServiceIp,
                                url: 'rypx/classsys/classtree'
                            }, {}, {}, data,
                            function(result) {
                                myMask.hide();
                            },
                            function(erro) {
                                Ext.Msg.alert("提示", "保存树出现问题!");
                            });
                    } catch (e) {
                        myMask.hide();
                        Ext.Msg.alert("提示", "新建同级分类失败");
                    }
                })
            }
            var fordname = new Ext.MyFordWin(addford, '');
            fordname.show();
        }
        // 重命名
        function nodeReName() {
            var mytree = treeObject;
            var selId = mytree.getSelectedItemId();
            var selnode = mytree.itemObj[selId];
            var nodeName = mytree.itemObj[selId].text;
            var parentId = selnode.pid;
            var addford = function(fordname, callback) {
                myMask = new Ext.LoadMask(Ext.getBody(), {
                    msg: "加载中,请稍后..."
                });
                myMask.show();
                // 判断同一目录下是否存在相同名称分类
                checkfordReNameEx(parentId, selId, fordname, function() {
                    if (callback) {
                        callback();
                    }
                    /*hwDas.edit("CDEServcie/module/category", {}, {
                            name: fordname,
                            id: selId,
                        }, [{
                            name: fordname,
                            id: selId,
                        }],
                        function(result) {*/
                    try {
                        var data = {
                            name: fordname,
                            id: selId
                        }
                        hwDas.edit({
                                host: vmd.workspace.dataServiceIp,
                                url: 'rypx/classsys/classtree'
                            }, {}, {}, data,
                            function(result) {
                                selnode.text = fordname;
                                mytree.setItemText(selId, fordname);
                                myMask.hide();
                            },
                            function(erro) {
                                Ext.Msg.alert("提示", "删除树出现问题!");
                            });
                    } catch (e) {
                        myMask.hide();
                        Ext.Msg.alert("提示", "重命名失败!")
                    }
                    /*
                    },
                    function(msg) {
                        myMask.hide();
                        Ext.Msg.alert("提示", "新建目录失败")
                    }             )*/
                })
            }
            var fordname = new Ext.MyFordWin(addford, nodeName);
            fordname.show();
        }
        //删除模块
        function deleteNode() {
            var mytree = treeObject;
            var selId = mytree.getSelectedItemId();
            var selnode = mytree.itemObj[selId];
            var haschild = mytree.hasChildren(selId);
            //删除文件夹
            if (haschild > 0) {
                Ext.Msg.alert("提示", "存在子分类，请删除子目录或子模块后再删除该目录")
                return
            }
            //删除
            Ext.Msg.confirm("提示", "确认要删除该分类？", function(type) {
                if (type == "yes") {
                    try {
                        var data = {
                            v_id: selId
                        }
                        
                        hwDas.del({
                                host: vmd.workspace.dataServiceIp,
                                url: 'rypx/classsys/classtree'
                            }, {}, data,
                            function(result) {
                                Tips.tips("删除分类信息成功", "success");
                                mytree.deleteItem(selId);
                            },
                            function(erro) {
                                Ext.Msg.alert("提示", "删除树出现问题!");
                            });
                    } catch (e) {
                        Ext.Msg.alert("提示", "删除分类信息失败")
                        return
                    }
                }
            })
            return;
        }
        // 判断同一节点下是否存在相同名称的分类
        function checkfordReNameEx(pId, id, name, callback) {
            callback();
            return;
            var isRep = false;
            hwDas.ajax({
                das: {
                    idedas: true
                },
                url: "CDEServcie/module/category",
                type: 'get',
                timeout: 5000,
                params: {
                    parent_id: pId
                },
                success: function(result) {
                    var datajson = result.data[0].datas;
                    for (var i = 0; i < datajson.length; i++) {
                        if (name == datajson[i].name && datajson[i].id != id) {
                            isRep = true;
                            break;
                        }
                    }
                    if (isRep) {
                        myMask.hide();
                        Ext.Msg.alert('提示', '此分类名称已存在');
                    } else {
                        callback()
                    }
                },
                error: function(msg) {
                    myMask.hide();
                    Ext.Msg.alert("提示", "获取分类信息失败")
                }
            })
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //自定义自定义方法
        function newGuid(len) {
            var length = 32;
            if (len)
                length = len - 2
            var guid = "";
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            for (var i = 0; i < length; i++) {
                pos = Math.round(Math.random() * (arr.length - 1));
                guid += arr[pos];
            }
            return "hw" + guid;
        }
        this.LeftTreeType_beforerender = LeftTreeType_beforerender;
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.createTree = function(divid, type, func) {
            //直接填写方法内容treediv
            hwtree = new dhtmlXTreeObject(divid, "100%", "100%", 0);
            if (this.IsMulSelect) {
                hwtree.enableCheckBoxes(1);
                hwtree.enableThreeStateCheckboxes(true);
            }
            hwtree.setImagePath("/lib/dhtmlx/imgs/dhxtree_material/");
            changeData(hwtree, type, divid, func);
        }
        this.GetTreeAllChecked = function() {
            //直接填写方法内容
            var values = treeObject.getAllChecked();
            var values_array = values.split(',');
            var texts = "";
            Ext.Array.each(values_array, function(id, index) {
                if (values_array.length > (index + 1)) {
                    texts += treeObject.getItemText(id) + ",";
                } else {
                    texts += treeObject.getItemText(id);
                }
            });
            return {
                id: values,
                text: texts
            }
        }
        this.getItemTextById = function(id) {
            //直接填写方法内容
            return treeObject.getItemText(id);
        }
        this.getSelectedItemId = function() {
            //直接填写方法内容
            return treeObject.getSelectedItemId();
        }
        this.getSelectedItemText = function() {
            //直接填写方法内容
            return treeObject.getSelectedItemText();
        }
        this.CreateTreeEX = function(divid, type, fun) {
            //直接填写方法内容treediv
            hwtree = new dhtmlXTreeObject(divid, "100%", "100%", 0);
            if (this.IsMulSelect) {
                hwtree.enableCheckBoxes(1);
                hwtree.enableThreeStateCheckboxes(true);
            }
            hwtree.setImagePath("/lib/dhtmlx/imgs/dhxtree_material/");
            if (type === "GW") //单位
            {
                changeDataEx(hwtree, type, divid, fun);
            } else if (type === "ZYXZ") //资源选择
            {
                changeDataZYXZ(hwtree, type, divid);
            } else if (type === "GW_ONLY") {
                changeDataEx(hwtree, type, divid, fun);
            } else if (type === "GW_SXJG") {
                changeDataEx(hwtree, type, divid, fun);
            }
        }
        this.GetTreeAllCheckedEX = function(flag) {
            //直接填写方法内容
            var values = treeObject.getAllChecked();
            var values_array = values.split(',');
            var texts = "";
            var baid = "";
            Ext.Array.each(values_array, function(id, index) {
                if (values_array.length > (index + 1)) {
                    console.log(treeObject)
                    if (treeObject.itemObj[id].baid !== "") {
                        texts += treeObject.getItemText(id) + ",";
                        baid += treeObject.itemObj[id].baid + ",";
                    }
                } else {
                    if (id !== "") {
                        if (treeObject.itemObj[id].baid !== "") {
                            texts += treeObject.getItemText(id);
                            baid += treeObject.itemObj[id].baid;
                        }
                    }
                }
            });
            return {
                id: values,
                text: texts.trimEnd(','),
                baid: baid.trimEnd(',')
            }
        }
        this.ClearAllChecked = function() {
            //直接填写方法内容
            if (treeObject === null || treeObject === undefined) {
                return;
            }
            var values = treeObject.getAllChecked();
            var values_array = values.split(',');
            Ext.Array.each(values_array, function(id, index) {
                treeObject.setCheck(id, false);
            });
        }
        this.SetChecked = function(id) {
            //直接填写方法内容
            if (treeObject === null || treeObject === undefined) {
                return;
            }
            var values_array = id.split(',');
            Ext.Array.each(values_array, function(id, index) {
                treeObject.setCheck(id, true);
            });
        }
        this.getSelectedItemIdOrFirstId = function() {
            //直接填写方法内容
            
            var selectId = treeObject.getSelectedItemId();
            if (selectId) {
                return selectId;
            } else {
                return g_firstParentID;
            }
        }
        this.selectItem = function(id) {
            //直接填写方法内容
            treeObject.selectItem(id);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.LeftTreeType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.LeftTreeType");
    }
})