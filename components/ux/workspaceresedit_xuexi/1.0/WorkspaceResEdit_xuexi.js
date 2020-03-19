Ext.define("vmd.ux.WorkspaceResEdit_xuexi" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.WorkspaceResEdit_xuexi",
	title:"Panel",
	header:false,
	border:false,
	width:692,
	height:522,
	layout:"auto",
	afterrender:"WorkspaceResEdit_xuexi_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.WorkspaceResEdit_xuexi_afterrender(this)
}
	},
	uxCss:".nodetool span.button {    line-height: 0;    margin: 0 2px;    width: 16px;    height: 16px;    display: inline-block;    vertical-align: middle;    border: 0 none;    cursor: pointer;    outline: none;    /*background-color: transparent;*/    /*background-repeat: no-repeat;*/    /*background-attachment: scroll;*/    /*background-image: url(\"/system/img/hwico.png\");*/}.nodetool span.button.add {    /*margin-left: 2px;*/    /*margin-right: -1px;*/    /*background-position: -144px 0;*/    /*vertical-align: top;*/    /**vertical-align: middle;*/    background-color: transparent;    background-repeat: no-repeat;    background-attachment: scroll;    background-image: url(\"/system/img/add2.png\");}.nodetool span.button.edit {    /*margin-right: 2px;*/    /*background-position: -110px -48px;*/    /*vertical-align: top;*/    /**vertical-align: middle;*/    background-color: transparent;    background-repeat: no-repeat;    background-attachment: scroll;    background-image: url(\"/system/img/edit2.png\");}.nodetool span.button.remove {    /*margin-right: 2px;*/    /*background-position: -110px -64px;*/    /*vertical-align: top;*/    /**vertical-align: middle;*/    background-color: transparent;    background-repeat: no-repeat;    background-attachment: scroll;    background-image: url(\"/system/img/del2.png\");}",
	initComponent: function(){
		function resetCmpScope() {
                    var cmpList = me._reloadCmpList;
                    Ext.each(cmpList, function (name) {
                        var cmpObj = eval(name);
                        cmpObj && (cmpObj._beforeRender = function (_cmp) {
                            var id = vmd.core.getCmpId(_cmp);
                            id&&eval(id + "= _cmp")
                        })
                    })
                }
			// 资源类型：0：主题，1：图片，2：JS文件
var resourceType = 0;
var workspaceId = ""; // 工区ID
var objInfoId = ""; // 工区/项目ID
var pointerCtrlOwner = this;
var page = this;
var applyType = 0; // 应用类型：0：工区，1：项目
var ifDataLoaded = false;

function btnAddServer_click(sender, e) {
    btnAddServer();
}

function btnAddServer() {
    // // pointerCtrlOwner.fireEvent('onClickBtnAddServer', sender, e);
    // var nodeRoot = treeResource.getRootNode();
    // if(null == nodeRoot) {
    //     return;
    // }

    // var addResourceServer = function(name, addr, remark) {

    //     var nodeRoot = treeResource.getRootNode();
    //     if(null === nodeRoot || undefined === nodeRoot) {
    //         return;
    //     }

    //     if(ifServiceExisted(nodeRoot, name, addr)) {
    //         return;
    //     }

    //     var mytree = treeResource;
    //     var nodeId = vmd.util.guid();

    //     var cnode = new Ext.tree.TreeNode({
    //         id: nodeId,
    //         text: name,
    //         cls: "vmd-tree-node"
    //     });

    //     cnode.id = nodeId;
    //     cnode.text = name;
    //     cnode.type = 1; // 节点类型：0：根节点，1：服务器节点，2：分类节点
    //     cnode.address = addr;
    //     cnode.remark = remark;
    //     // 拖上图片，增加图标
    //     // cnode.setIcon(null);
    //     cnode.setIcon("/img/public/folderClosed.gif");
    //     var nodeRoot = mytree.getRootNode();
    //     if(null == nodeRoot) {
    //         return;
    //     }
    //     nodeRoot.appendChild(cnode);

    //     // 调用数据服务将数据保存到数据库
    //     if(0 == applyType) {
    //         hwDas.add(
    //             "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {}, [{
    //                 'workspaceid': workspaceId,
    //                 'serviceaddressid': nodeId,
    //                 'serviceaddressname': name,
    //                 'serviceaddress': addr,
    //                 'serviceaddresstype': resourceType,
    //                 'serviceaddressremark': remark
    //             }],
    //             function(result) {
    //                 Tips.tips("保存成功！", "success");
    //                 // Ext.Msg.alert("提示", "添加服务地址成功！")
    //             },
    //             function(msg) {
    //                 Tips.tips("保存失败！", "error");
    //                 // Ext.Msg.alert("提示", "添加服务地址失败！")
    //             }
    //         );
    //     } else {

    //         hwDas.save(
    //             "DataServiceWorkSpace/projectInfo/ProjectServiceAddress", {}, {}, [{
    //                 'projectid': objInfoId,
    //                 'id': nodeId,
    //                 'name': name,
    //                 'address': addr,
    //                 'type': resourceType,
    //                 'remark': remark
    //             }],
    //             function(result) {
    //                 Tips.tips("保存成功！", "success");
    //                 // Ext.Msg.alert("提示", "添加服务地址成功！")
    //             },
    //             function(msg) {
    //                 Tips.tips("保存失败！", "error");
    //                 // Ext.Msg.alert("提示", "添加服务地址失败！")
    //             }
    //         );
    //     }

    //     // 不是主题就不需要获取服务器下包含的子节点数据
    //     if(0 != resourceType) {
    //         return;
    //     }


    //     // 添加资源中心的服务地址后，需要同步从服务地址
    //     // 通过数据服务获取该资源中心有哪些主题添加到服务地址节点下
    //     // 此处的主题的展现方式尚需讨论
    //     // 获取来的节点数据格式是什么样的？数据集？怎样提取数据？
    //     // var treeNode = me.store.data.items[index].data; // ???
    //     // 调用服务保存新添加的服务器信息
    //     // 主题获取的分类节点需要带复选框
    // }

    // var winForm = new Ext.winAddResourceServer(addResourceServer, "", "", "");
    // winForm.show();
}

function addResourceServer(id, name, addr, remark, resType) {
    resourceType = resType;
    // var nodeRoot = treeResource.getRootNode();
    // if(null === nodeRoot || undefined === nodeRoot) {
    //     return;
    // }

    var mytree = treeResource;
    var nodeRoot = mytree.getRootNode();
    if(null == nodeRoot || undefined == nodeRoot) {
        nodeRoot = addTreeResourceRootNode();
    }
    if(ifServiceExisted(nodeRoot, name, addr)) {
        return;
    }

    var cnode = new Ext.tree.TreeNode({
        id: id,
        text: name,
        cls: "vmd-tree-node"
    });

    cnode.id = id;
    cnode.text = name + "(" + addr + ")";
    cnode.name = name;
    cnode.type = 1; // 节点类型：0：根节点，1：服务器节点，2：分类节点
    cnode.address = addr;
    cnode.remark = remark;
    // 拖上图片，增加图标
    // cnode.setIcon(null);
    cnode.setIcon("/img/public/server6.png");
    nodeRoot.appendChild(cnode);
    addServeInServe(id, name, addr, remark, resType);
    // 不是主题就不需要获取服务器下包含的子节点数据
    if(0 != resType) {
        return;
    }


    // 添加资源中心的服务地址后，需要同步从服务地址
    // 通过数据服务获取该资源中心有哪些主题添加到服务地址节点下
    // 此处的主题的展现方式尚需讨论
    // 获取来的节点数据格式是什么样的？数据集？怎样提取数据？
    // var treeNode = me.store.data.items[index].data; // ???
    // 调用服务保存新添加的服务器信息
    // 主题获取的分类节点需要带复选框
}

// 调用数据服务将数据保存到数据库
function addServeInServe(id, name, addr, remark, resType) {
    // var reg = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
    // if(!reg.test(addr)) {
    //     Ext.Msg.alert("提示", "请输入正确的服务地址（带端口）！")
    //     return;
    // }
    if(0 == applyType) {
        hwDas.add(
            "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {}, [{
                'workspaceid': workspaceId,
                'serviceaddressid': id,
                'serviceaddressname': name,
                'serviceaddress': addr,
                'serviceaddresstype': resType,
                'serviceaddressremark': remark
            }],
            function(result) {
                // Tips.tips("保存成功！", "success");
                // Ext.Msg.alert("提示", "添加服务地址成功！")
            },
            function(msg) {
                // Tips.tips("保存失败！", "error");
                // Ext.Msg.alert("提示", "添加服务地址失败！")
            }
        );
    } else {

        hwDas.save(
            "DataServiceWorkSpace/projectInfo/ProjectServiceAddress", {}, {}, [{
                'projectid': objInfoId,
                'id': id,
                'name': name,
                'address': addr,
                'type': resType,
                'remark': remark
            }],
            function(result) {
                // Tips.tips("保存成功！", "success");
                // Ext.Msg.alert("提示", "添加服务地址成功！")
            },
            function(msg) {
                // Tips.tips("保存失败！", "error");
                // Ext.Msg.alert("提示", "添加服务地址失败！")
            }
        );
    }

}


// 判断服务地址是否已经存在
function ifServiceExisted(nodeOp, name, addr) {
    if(null == nodeOp || undefined == nodeOp) {
        return false;
    }
    // console.log(nodeOp.childNodes)
    for(var i = 0; i < nodeOp.childNodes.length; i++) {
        if(nodeOp.childNodes[i].text == name) {
            Tips.tips(name + "已经存在！", "info");
            // Ext.Msg.alert("提示", name + "已经存在！");
            return true;
        } else if(nodeOp.childNodes[i].address == addr) {
            Tips.tips(addr + "已经存在！", "info");
            // Ext.Msg.alert("提示", addr + "已经存在！");
            return true;
        }
    }

    return false;
}

function addCategory(id, path, serverid, serverip, servername) {
    // var nodeSel = treeResource.getSelNode();
    var nodeSel = nodeHoverSel;
    if(null == nodeSel || 1 != nodeSel.type) // 未选中服务器节点
    {
        return;
    }

    if(ifCategoryExisted(nodeSel, id, path)) {
        return;
    }

    var nodeId = vmd.util.guid();

    var cnode = new Ext.tree.TreeNode({
        id: nodeId,
        text: name,
        cls: "vmd-tree-node"
    });

    cnode.id = nodeId;
    cnode.resourceCategoryId = id;
    cnode.serviceaddressid = nodeSel.id;
    cnode.text = path;
    // cnode.text = name;
    cnode.type = 2; // 分类节点

    // 拖上图片，增加图标
    cnode.setIcon("/img/public/folderClosed.gif");
    nodeSel.appendChild(cnode);

    // cnode.parentNode.setIcon(null);
    nodeSel.expand();

    // 调用数据服务将数据保存到数据库
    if(0 == applyType) {
        hwDas.add(
            "DataServiceWorkSpace/WorkSpaceInfo/ResourceCategory", {}, {}, [{
                'workspaceid': workspaceId,
                'serviceaddressid': nodeSel.id,
                'resourcecategoryid': cnode.resourceCategoryId,
                'resourceid': nodeId,
                'path': path,
                'type': resourceType,
                resourceserverid: serverid,
                resourceservername: servername,
                resourceserverip: serverip
            }],
            function(result) {
                Tips.tips("保存成功！", "success");
                // Ext.Msg.alert("提示", "添加资源目录成功！");
            },
            function(msg) {
                Tips.tips("保存失败！", "error");
                // Ext.Msg.alert("提示", "添加资源目录失败！");
            }
        );
    } else {
        hwDas.save(
            "DataServiceWorkSpace/projectInfo/ProjectResource", {}, {}, [{
                'projectid': objInfoId,
                'serviceaddressid': nodeSel.id,
                'resourcecategoryid': cnode.resourceCategoryId,
                'resourceid': nodeId,
                'path': path,
                'type': resourceType,
                resourceserverid: serverid,
                resourceservername: servername,
                resourceserverip: serverip
            }],
            function(result) {
                Tips.tips("保存成功！", "success");
                // Ext.Msg.alert("提示", "添加资源目录成功！");
            },
            function(msg) {
                Tips.tips("保存失败！", "error");
                // Ext.Msg.alert("提示", "添加资源目录失败！");
            }
        );
    }
}
// window.addCategory = addCategory;


function editCategory(id, path, serverid, serverip, servername) {

    var nodeSel = nodeHoverSel;
    // var nodeSel = treeResource.getSelNode();
    if(null == nodeSel || 2 != nodeSel.type) // 0:根节点，1：服务器节点，2：分类目录节点
    {
        return;
    }

    if(ifCategoryExisted(nodeSel, id, path)) {
        return;
    }

    nodeSel.resourceCategoryId = id;
    nodeSel.setText(path);
    if(0 == applyType) {
        hwDas.edit(
            "DataServiceWorkSpace/WorkSpaceInfo/ResourceCategory", {}, {}, [{
                'resourcecategoryid': nodeSel.resourceCategoryId,
                'resourceid': nodeSel.id,
                'path': path,
                resourceserverid: serverid,
                resourceservername: servername,
                resourceserverip: serverip
            }],
            function(result) {
                Tips.tips("保存成功！", "success");
                // Ext.Msg.alert("提示", "保存资源目录成功！");
            },
            function(msg) {
                Tips.tips("保存失败！", "error");
                // Ext.Msg.alert("提示", "保存资源目录失败！");
            }
        );
    } else {
        hwDas.save(
            "DataServiceWorkSpace/projectInfo/ProjectResource", {}, {}, [{
                'projectid': objInfoId,
                'serviceaddressid': nodeSel.serviceaddressid,
                'resourcecategoryid': nodeSel.resourceCategoryId,
                'resourceid': nodeSel.id,
                'path': path,
                'type': resourceType,
                resourceserverid: serverid,
                resourceservername: servername,
                resourceserverip: serverip
            }],
            function(result) {
                Tips.tips("保存成功！", "success");
                // Ext.Msg.alert("提示", "添加资源目录成功！");
            },
            function(msg) {
                Tips.tips("保存失败！", "error");
                // Ext.Msg.alert("提示", "添加资源目录失败！");
            }
        );
    }
}

// 判断资源目录是否已经存在
function ifCategoryExisted(nodeOp, categoryId, path) {
    if(null == nodeOp || undefined == nodeOp) {
        return false;
    }
    for(var i = 0; i < nodeOp.childNodes.length; i++) {
        if(nodeOp.childNodes[i].text == path ||
            nodeOp.childNodes[i].resourceCategoryId == categoryId) {
            // Tips.tips("资源已经存在！", "info");
            // Ext.Msg.alert("提示", "资源已经存在！");
            return true;
        }
    }

    return false;
}
// var curSelNodeId;
function btnAddCategory_click(sender, e) {
    btnAddCategory();
}

function btnAddCategory() {
    window.treeResource = treeResource;
    treeResource.addCategory = addCategory;

    resourceCategoryForm = new vmd.window({
        title: "资源目录选择",
        url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwcde15445.html",
        auto: false,
        height: 400,
        width: 400,
        params: {
            type: 0, // 0：添加目录，1：编辑目录
            categoryId: "",
            r: new Date().getTime()
        }
    })

    resourceCategoryForm.show();
    //   window["openWinFrom2"] = openWinFrom2;
    window.resourceCategoryForm = resourceCategoryForm;
    return resourceCategoryForm;

    // 主题不需要添加分类数据
    // if(0 == resourceType) {
    //     return;
    // }

    // var openWinFrom2 = new Ext.Window({
    //     title: "资源目录选择",
    //     modal: true,
    //     maximized: false,
    //     height: 400,
    //     width: 400,
    //     maximizable: true,
    //     resizable: true,
    //     bodyStyle: "background-color:#fff",
    //     closeAction: 'close'

    // });
    // Ext.defer(function() {
    //     // openWinFrom.html = "<iframe src='http://www.baidu.com' frameborder=0 scrolling=no style='height:100%;width:100%'></iframe>";
    //     openWinFrom2.html = "<iframe src='" + vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwcde15445.html?r=" + new Date().getTime() + "' frameborder=0 scrolling=no style='height:100%;width:100%'></iframe>";
    //     openWinFrom2.show();
    // }, 50);



    // openWinFrom2.on('hide',function(){
    //   var info=  this.info;
    //   addCategory(info.id, info.path)
    //   // treeResource.getSelNode()
    // })
    // openWinFrom2.on('close',function(){
    //     treeResource.getSelNode()

    // })

    // window.openWinFrom2 = openWinFrom2;
}

function btnEdit_click(sender, e) {
    // pointerCtrlOwner.fireEvent('onClickBtnEdit', sender, e);

    btnEdit();
}

function btnEdit() {
    // pointerCtrlOwner.fireEvent('onClickBtnEdit', sender, e);

    var nodeSel = nodeHoverSel;
    // var nodeSel = treeResource.getSelNode();
    if(null == nodeSel) {
        return;
    }

    // 服务器节点
    if(1 == nodeSel.type) {
        editResourceService(nodeSel);
    } else if(2 == nodeSel.type && 0 != resourceType) // 分类节点
    {
        editResourceCategory(nodeSel);
    }
}

function editResourceService(nodeSel) {
    // pointerCtrlOwner.fireEvent('onClickBtnAddServer', sender, e);

    // var nodeSel = treeResource.getSelNode();
    if(null == nodeSel || 1 != nodeSel.type) // 未选中服务器节点
    {
        return;
    }

    var editResourceServer = function(name, addr, remark) {
        if(null == nodeSel) {
            return;
        }

        if(ifServiceExisted(nodeSel, name, addr)) {
            return;
        }
        console.log(nodeSel)
        nodeSel.setText(name);
        nodeSel.address = addr;
        nodeSel.remark = remark;

        // 调用数据服务将数据保存到数据库
        if(0 == applyType) {
            hwDas.edit(
                "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {}, [{
                    'serviceaddressid': nodeSel.id,
                    'name': name,
                    'serviceaddress': addr,
                    'remark': remark
                }],
                function(result) {
                    // Tips.tips("保存成功！", "success");
                    // Ext.Msg.alert("提示", "保存服务地址信息成功！");
                },
                function(msg) {
                    // Tips.tips("保存失败！", "error");
                    // Ext.Msg.alert("提示", "保存服务地址信息失败！");
                }
            );
        } else {
            hwDas.save(
                "DataServiceWorkSpace/projectInfo/ProjectServiceAddress", {}, {}, [{
                    'projectid': objInfoId,
                    'id': nodeSel.id,
                    'name': name,
                    'address': addr,
                    'type': resourceType,
                    'remark': remark
                }],
                function(result) {
                    // Tips.tips("保存成功！", "success");
                    // Ext.Msg.alert("提示", "添加服务地址成功！")
                },
                function(msg) {
                    // Tips.tips("保存失败！", "error");
                    // Ext.Msg.alert("提示", "添加服务地址失败！")
                }
            );
        }
    }

    var winForm = new Ext.winAddResourceServer(editResourceServer, nodeSel.text, nodeSel.address, nodeSel.remark);
    winForm.show();
}

function editResourceCategory(nodeSel) {
    // pointerCtrlOwner.fireEvent('onClickBtnEdit', sender, e);

    // 主题不需要添加分类数据
    if(0 == resourceType) {
        return;
    }

    // var nodeSel = treeResource.getSelNode();
    if(null == nodeSel || 2 != nodeSel.type) {
        return;
    }

    window.treeResource = treeResource;
    treeResource.editCategory = editCategory;
    // console.log(nodeHoverSel.parentNode.text);
    var serverName = nodeHoverSel.name;
    // var serverName = nodeHoverSel.text;
    if(null != nodeHoverSel.parentNode && undefined != nodeHoverSel.parentNode) {
        serverName = nodeHoverSel.parentNode.name;
        // serverName = nodeHoverSel.parentNode.text;
    }

    var serverAddr = "";
    if(null != nodeSel.parent && undefined != nodeSel.parent) {
        serverAddr = nodeSel.parent.address;
    }

    resourceCategoryForm = new vmd.window({
        title: serverName,
        url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwcde15445.html",
        auto: false,
        height: 400,
        width: 400,
        params: {
            type: 1, // 0：添加目录，1：编辑目录
            categoryId: nodeSel.resourceCategoryId,
            path: nodeSel.text,
            serverAddr: serverAddr,
            r: new Date().getTime()
        }
    })

    resourceCategoryForm.show();
    window.resourceCategoryForm = resourceCategoryForm;
}

function btnDelete_click(sender, e) {

    btnDelete();
}

function btnDelete() {
    // pointerCtrlOwner.fireEvent('onClickBtnDelete', sender, e);

    var nodeSel = nodeHoverSel;
    // var nodeSel = treeResource.getSelNode();
    if(null == nodeSel) {
        return;
    }

    // 主题且当前选中分类节点，就返回
    // 因为主题不能执行删除操作
    if(0 == resourceType && 2 == nodeSel.type) {
        return;
    }

    Ext.Msg.confirm("提示", "确认要删除节点？", function(type) {
        if(type == "yes") {

            var dataService = "";
            // 服务器节点
            if(1 == nodeSel.type) {

                // 删除服务地址
                if(0 == applyType) {

                    hwDas.del(
                        "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
                            'serviceaddressid': nodeSel.id
                        },
                        function(result) {
                            // Tips.tips("保存成功！", "success");
                            // Ext.Msg.alert("提示", "保存服务地址信息成功！");
                        },
                        function(msg) {
                            // Tips.tips("保存失败！", "error");
                            // Ext.Msg.alert("提示", "保存服务地址信息失败！");
                        }
                    );
                } else {
                    hwDas.del(
                        "DataServiceWorkSpace/projectInfo/ProjectServiceAddress", {}, {
                            'serviceaddressid': nodeSel.id
                        },
                        function(result) {
                            // Tips.tips("保存成功！", "success");
                            // Ext.Msg.alert("提示", "保存服务地址信息成功！");
                        },
                        function(msg) {
                            // Tips.tips("保存失败！", "error");
                            // Ext.Msg.alert("提示", "保存服务地址信息失败！");
                        }
                    );
                }
            } else if(2 == nodeSel.type) // 分类节点
            {
                // 删除节点
                if(0 == applyType) {
                    hwDas.del(
                        "DataServiceWorkSpace/WorkSpaceInfo/ResourceCategory", {}, {
                            'resourceid': nodeSel.id
                        },
                        function(result) {
                            // Tips.tips("删除成功！", "success");
                            // Ext.Msg.alert("提示", "删除资源目录成功！");
                        },
                        function(msg) {
                            // Tips.tips("删除失败！", "error");
                            // Ext.Msg.alert("提示", "删除资源目录失败！");
                        }
                    );
                } else {
                    hwDas.del(
                        "DataServiceWorkSpace/projectInfo/ProjectResource", {}, {
                            'resourceid': nodeSel.id
                        },
                        function(result) {
                            // Tips.tips("删除成功！", "success");
                            // Ext.Msg.alert("提示", "删除资源目录成功！");
                        },
                        function(msg) {
                            // Tips.tips("删除失败！", "error");
                            // Ext.Msg.alert("提示", "删除资源目录失败！");
                        }
                    );
                }
            }

            // 删除之前需要循环删除其下的分类节点
            nodeSel.removeAll();
            // 删除当前节点
            nodeSel.remove();
        }
    });

}

//添加资源中心服务地址
Ext.winAddResourceServer = Ext.extend(Ext.Window, {
    xtype: "window",
    title: "资源中心服务地址",
    width: 300,
    height: 200,
    layout: "form",
    bodyStyle: 'padding:15px',
    labelAlign: "left",
    labelWidth: 40,
    modal: true,
    constructor: function(callback, name, addr, remark) {
        this.callback = callback;
        this.valueAddr = addr;
        this.valueName = name;
        this.valueRemark = remark;
        this.callParent();
    },
    initComponent: function() {
        var me = this;
        this.fbar = [{
            text: "确定",
            handler: function() {
                var reg = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
                if(!reg.test(Ext.getCmp('addr').getValue())) {
                    Ext.Msg.alert("提示", "请输入正确的服务地址(带端口)！")
                    return;
                }
                me.callback(Ext.getCmp('name').getValue(), Ext.getCmp('addr').getValue(), Ext.getCmp('remark').getValue());
                me.close();
            }
        }, {
            text: "取消",
            handler: function() {
                me.close();
            }
        }];
        if(this.valueAddr != '') {
            this.items = [{
                id: 'name',
                xtype: "textfield",
                fieldLabel: "名称",
                anchor: "100%",
                value: this.valueName,
                disabled: true
            }, {
                id: 'addr',
                xtype: "textfield",
                fieldLabel: "地址",
                anchor: "100%",
                value: this.valueAddr,
                disabled: true
            }, {
                id: 'remark',
                xtype: "textfield",
                fieldLabel: "说明",
                anchor: "100%",
                value: this.valueRemark
            }]
        } else {
            this.items = [{
                id: 'name',
                xtype: "textfield",
                fieldLabel: "名称",
                anchor: "100%",
                value: this.valueName
            }, {
                id: 'addr',
                xtype: "textfield",
                fieldLabel: "地址",
                anchor: "100%",
                value: this.valueAddr,
                regex:/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
                regexText: "输入标准的服务器地址（带端口）！"
            }, {
                id: 'remark',
                xtype: "textfield",
                fieldLabel: "说明",
                anchor: "100%",
                value: this.valueRemark
            }]
        }

        Ext.winAddResourceServer.superclass.initComponent.call(this);
    }
})


//添加资源目录
Ext.winAddResourceCategory = Ext.extend(Ext.Window, {
    xtype: "window",
    title: "添加资源目录",
    width: 300,
    height: 200,
    layout: "form",
    bodyStyle: 'padding:15px',
    labelAlign: "left",
    labelWidth: 40,
    modal: true,
    constructor: function(callback, name, addr, remark) {
        this.callback = callback;
        this.valueAddr = addr;
        this.valueName = name;
        this.valueRemark = remark;
        this.callParent();
    },
    initComponent: function() {
        var me = this;
        this.fbar = [{
            text: "确定",
            handler: function() {
                // var reg = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
                // if(!reg.test(Ext.getCmp('addr').getValue())) {
                //     Ext.Msg.alert("提示", "请输入正确的服务地址(带端口)！")
                //     return;
                // }
                me.callback(Ext.getCmp('name').getValue(), Ext.getCmp('addr').getValue(), Ext.getCmp('remark').getValue());
                me.close();
            }
        }, {
            text: "取消",
            handler: function() {
                me.close();
            }
        }];

        this.items = [{
            id: 'name',
            xtype: "textfield",
            fieldLabel: "选择文件所在目录",
            anchor: "100%",
            value: this.valueName
        }, {
            id: 'addr',
            xtype: "textfield",
            fieldLabel: "地址",
            anchor: "100%",
            value: this.valueAddr,
            regex: /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
            regexText: "输入标准的服务器地址（带端口）！"
        }, {
            id: 'remark',
            xtype: "textarea",
            fieldLabel: "说明",
            anchor: "100%",
            value: this.valueRemark
        }]
        Ext.winAddResourceServer.superclass.initComponent.call(this);
    }
})

function treeResource_afterrender(sender) {

    addTreeResourceRootNode();
}

function addTreeResourceRootNode() {

    var mytree = treeResource;
    var rootNode = mytree.getRootNode();
    if(null == rootNode || undefined == rootNode) {
        var nodeId = vmd.util.guid();

        rootNode = new Ext.tree.TreeNode({
            id: nodeId,
            text: "根节点"
        });

        rootNode.id = nodeId;
        rootNode.type = 0; // 节点类型：0：根节点，1：服务器节点，2：分类节点
        // 拖上图片，增加图标
        // rootNode.setIcon("/img/public/{D35D2F80-5F23-46C8-A9EE-CE33B28DD531}.png");
        mytree.setRootNode(rootNode); // ???根节点的添加
        // mytree.rootVisible = false;

        return rootNode;
    }
    return rootNode;
}

// type:0:主题，1：图片，2：JS文件
function loadResource(type, resouType) {
    // applyType = 0;
    // workspaceId = "1005a370-ea5a-4753-9cbb-d854be34f490";
    if(0 == applyType) { // 工区

        if(workspaceId === null || workspaceId === undefined || workspaceId === '') {
            return;
        }
        // if(ifDataLoaded) {
        //     return;
        // }
        ifDataLoaded = true;
        clearTree();
        hwDas.get(
            "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
                "workspaceid": workspaceId,
                "servicetype": type
            },
            function(result) {
                // 根据获取的数据赋值基本信息Tab页
                if(null === result && undefined === result) {
                    return;
                }

                if(null != result.data && undefined != result.data) {
                    if(result.data.length > 0) {
                        if(null != result.data[0].datas && undefined != result.data[0].datas) {
                            if(result.data[0].datas.length > 0) {
                                for(var i = 0; i < result.data[0].datas.length; i++) {
                                    var nodeService = addServiceAddressNode(
                                        result.data[0].datas[i].id,
                                        result.data[0].datas[i].name + "(" + result.data[0].datas[i].address + ")",
                                        result.data[0].datas[i].address,
                                        result.data[0].datas[i].remark);
                                    // workspaceId = "1005a370-ea5a-4753-9cbb-d854be34f490";
                                    if(1 == resouType || 2 == resouType) {
                                        loadResourceCategory(nodeService, workspaceId, result.data[0].datas[i].id, resouType);
                                    }
                                }
                            } else {
                                clearTree();
                            }
                        }
                    }
                }

                ifDataLoaded = true;
                // Tips.tips("查询成功！", "success");
            },
            function(msg) {
                // Tips.tips("查询失败！", "error");
                // Ext.Msg.alert("提示", "查询资源信息失败！");
            });
    } else { // 项目

        if(objInfoId === null || objInfoId === undefined || objInfoId === '') {
            return;
        }
        // if(ifDataLoaded) {
        //     return;
        // }

        ifDataLoaded = true;
        clearTree();
        hwDas.get(
            "DataServiceWorkSpace/projectInfo/ProjectServiceAddress", {}, {
                "id": objInfoId,
                "type": type
            },
            function(result) {
                // 根据获取的数据赋值基本信息Tab页
                if(null === result && undefined === result) {
                    return;
                }

                if(null != result.data && undefined != result.data) {
                    if(result.data.length > 0) {
                        if(null != result.data[0].datas && undefined != result.data[0].datas) {
                            if(result.data[0].datas.length > 0) {
                                console.log(result.data[0].datas)
                                for(var i = 0; i < result.data[0].datas.length; i++) {
                                    var nodeService = addServiceAddressNode(
                                        result.data[0].datas[i].id,
                                        result.data[0].datas[i].name + "(" + result.data[0].datas[i].address + ")",
                                        result.data[0].datas[i].address,
                                        result.data[0].datas[i].remark);
                                    // objInfoId = "1005a370-ea5a-4753-9cbb-d854be34f490";
                                    if(1 == resouType || 2 == resouType) {
                                        loadResourceCategory(nodeService, objInfoId, result.data[0].datas[0].id, resouType);
                                    }
                                }
                            } else {
                                clearTree();
                            }
                        }
                    }
                }

                ifDataLoaded = true;
                // Tips.tips("查询成功！", "success");
            },
            function(msg) {
                // Tips.tips("查询失败！", "error");
                // Ext.Msg.alert("提示", "查询资源信息失败！");
            });
    }
}

function addServiceAddressNode(id, name, address, remark) {

    var mytree = treeResource;

    var cnode = new Ext.tree.TreeNode({
        id: id,
        text: name,
        cls: "vmd-tree-node"
    });

    cnode.id = id;
    cnode.text = name;
    cnode.type = 1; // 节点类型：0：根节点，1：服务器节点，2：分类节点
    cnode.address = address;
    cnode.remark = remark;
    // 拖上图片，增加图标
    cnode.setIcon("/img/public/server6.png");
    var nodeRoot = mytree.getRootNode();
    if(null == nodeRoot || undefined == nodeRoot) {
        nodeRoot = addTreeResourceRootNode();
    }
    nodeRoot.appendChild(cnode);

    return cnode;
}

// 加载资源目录
function loadResourceCategory(nodeParent, wsId, serviceId, type) {
    if(wsId === null || wsId === undefined || wsId === '') {
        return;
    }
    if(0 == applyType) {

        hwDas.get(
            "DataServiceWorkSpace/WorkSpaceInfo/ResourceCategory", {}, {
                "workspaceid": wsId,
                "serviceid": serviceId,
                "resourcetype": type
            },
            function(result) {
                // 根据获取的数据赋值基本信息Tab页
                if(null === result && undefined === result) {
                    return;
                }

                if(null != result.data && undefined != result.data) {
                    if(result.data.length > 0) {
                        if(null != result.data[0].datas && undefined != result.data[0].datas) {
                            for(var i = 0; i < result.data[0].datas.length; i++) {
                                addCategoryNode(nodeParent,
                                    result.data[0].datas[i].resource_id,
                                    result.data[0].datas[i].resource_category_id,
                                    serviceId,
                                    result.data[0].datas[i].path,
                                    2);
                            }
                        }
                    }
                }
                // Tips.tips("查询成功！", "success");
            },
            function(msg) {
                Tips.tips("加载失败！", "error");
                // Ext.Msg.alert("提示", "查询资源信息失败！");
            });
    } else {

        hwDas.get(
            "DataServiceWorkSpace/projectInfo/ProjectResource", {}, {
                "projectid": wsId,
                "serviceid": serviceId,
                "resourcetype": type
            },
            function(result) {
                // 根据获取的数据赋值基本信息Tab页
                if(null === result && undefined === result) {
                    return;
                }

                if(null != result.data && undefined != result.data) {
                    if(result.data.length > 0) {
                        if(null != result.data[0].datas && undefined != result.data[0].datas) {
                            for(var i = 0; i < result.data[0].datas.length; i++) {
                                addCategoryNode(nodeParent,
                                    result.data[0].datas[i].resource_id,
                                    result.data[0].datas[i].resource_category_id,
                                    serviceId,
                                    result.data[0].datas[i].path,
                                    2);
                            }
                        }
                    }
                }
                // Tips.tips("查询成功！", "success");
            },
            function(msg) {
                Tips.tips("加载失败！", "error");
                // Ext.Msg.alert("提示", "查询资源信息失败！");
            });
    }
}

function addCategoryNode(nodeParent, id, resourceCategoryId, serviceId, path, type) {
    var cnode = new Ext.tree.TreeNode({
        id: id,
        text: path,
        cls: "vmd-tree-node"
    });

    cnode.id = id;
    cnode.resourceCategoryId = resourceCategoryId;
    cnode.serviceaddressid = serviceId;
    cnode.text = path;
    // cnode.text = name;
    cnode.type = type; // 分类节点

    // 拖上图片，增加图标
    cnode.setIcon("/img/public/folderClosed.gif");
    // cnode.parentNode.setIcon(null);
    nodeParent.appendChild(cnode);
}

// 清空树
function clearAll() {
    clearTree();
}

// 删除根节点下的所有节点
function clearTree() {
    var nodeRoot = treeResource.getRootNode();
    // 删除根节点下的所有节点
    if(nodeRoot) {
        // nodeRoot.remove();
        if(nodeRoot.hasChildNodes()) {
            nodeRoot.removeAll();
        }

        // nodeRoot.eachChild(
        //     function(childService) {
        //         if(childService.hasChildNodes()) {
        //             childService.eachChild(
        //                 function(childCategory) {
        //             childService.removeChild(childCategory);
        //                     // childCategory.remove();
        //                 }
        //             );
        //         }
        //         // childService.remove();
        //     }
        // );
    }
}

function WorkspaceResEdit_xuexi_afterrender(sender) {
    div.hide()
}

var nodeHoverSel = null;

function treeResource_nodeover(sender, e, node) {

    nodeHoverSel = node;
    var nodeEl = vmd(node.ui.wrap.firstChild);

    //构造用户新增、编辑、删除浮动效果
    if(nodeEl.find(".nodetool").length == 0) {

        if(1 == node.type) {

            // nodeEl.append('<div class="nodetool" style="display:inline"><span class="button add"  title="添加" onfocus="this.blur();"></span><span class="button edit"  title="编辑" ></span><span class="button remove"  title="删除"></div>');
            // 主题不需要添加分类数据
            if(0 == resourceType) {

                nodeEl.append('<div class="nodetool" style="display:inline"><span class="button remove"  title="删除"></div>');
                node._tool = nodeEl[0].lastChild;
                // node._tool.add = nodeEl[0].lastChild.firstChild;
                // node._tool.edit = nodeEl[0].lastChild.children[1];
                node._tool.del = nodeEl[0].lastChild.lastChild;

                // vmd(node._tool.add).bind('click', node_add);
                // vmd(node._tool.edit).bind('click', node_edit);
                vmd(node._tool.del).bind('click', node_del);
            } else {

                nodeEl.append('<div class="nodetool" style="display:inline"><span class="button add"  title="添加" onfocus="this.blur();"></span><span class="button remove"  title="删除"></div>');
                node._tool = nodeEl[0].lastChild;
                node._tool.add = nodeEl[0].lastChild.firstChild;
                // node._tool.edit = nodeEl[0].lastChild.children[1];
                node._tool.del = nodeEl[0].lastChild.lastChild;

                vmd(node._tool.add).bind('click', node_add);
                // vmd(node._tool.edit).bind('click', node_edit);
                vmd(node._tool.del).bind('click', node_del);
            }





            // nodeEl.append('<div class="nodetool" style="display:inline"><span class="button add"  title="添加" onfocus="this.blur();"></span><span class="button edit"  title="编辑" ></span><span class="button remove"  title="删除"></div>');

            // node._tool = nodeEl[0].lastChild;
            // node._tool.add = nodeEl[0].lastChild.firstChild;
            // node._tool.edit = nodeEl[0].lastChild.children[1];
            // node._tool.del = nodeEl[0].lastChild.lastChild;

            // vmd(node._tool.add).bind('click', node_add);
            // vmd(node._tool.edit).bind('click', node_edit);
            // vmd(node._tool.del).bind('click', node_del);
        } else if(2 == node.type) {
            nodeEl.append('<div class="nodetool" style="display:inline"></span><span class="button edit"  title="编辑" ></span><span class="button remove"  title="删除"></div>');

            node._tool = nodeEl[0].lastChild;

            node._tool.edit = nodeEl[0].lastChild.firstChild;
            // node._tool.edit = nodeEl[0].lastChild.children[1];
            node._tool.del = nodeEl[0].lastChild.lastChild;

            // vmd(node._tool.add).bind('click', node_add);
            vmd(node._tool.edit).bind('click', node_edit);
            vmd(node._tool.del).bind('click', node_del);
        }

        //Dom对象的操作流程
        // vmd(node._tool.add).bind('click', function(){
        //     node_add(node);
        // });
        // vmd(node._tool.edit).bind('click', function(){
        //     node_edit(node);
        // });
        // vmd(node._tool.del).bind('click', function(){
        //     node_del(node);
        // });
    }
}


function node_add() {

    window.treeResource = treeResource;
    treeResource.addCategory = addCategory;
    var serverName = "";
    if(null != nodeHoverSel && undefined != nodeHoverSel) {
        serverName = nodeHoverSel.name;
        // serverName = nodeHoverSel.text;
    }

    resourceCategoryForm = new vmd.window({
        title: serverName,
        url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwcde15445.html",
        auto: false,
        height: 400,
        width: 400,
        params: {
            type: 0, // 0：添加目录，1：编辑目录
            categoryId: "",
            serverAddr: nodeHoverSel.address,
            r: new Date().getTime()
        }
    })

    resourceCategoryForm.show();
    //   window["openWinFrom2"] = openWinFrom2;
    window.resourceCategoryForm = resourceCategoryForm;
    return resourceCategoryForm;

}

function node_edit() {

    var nodeSel = nodeHoverSel;
    // var nodeSel = treeResource.getSelNode();
    if(null == nodeSel) {
        return;
    }

    // 服务器节点
    if(1 == nodeSel.type) {
        editResourceService(nodeSel);
    } else if(2 == nodeSel.type && 0 != resourceType) // 分类节点
    {
        editResourceCategory(nodeSel);
    }
}

function node_del() {
    var nodeSel = nodeHoverSel;
    // var nodeSel = treeResource.getSelNode();
    if(null == nodeSel) {
        return;
    }

    // 主题且当前选中分类节点，就返回
    // 因为主题不能执行删除操作
    if(0 == resourceType && 2 == nodeSel.type) {
        return;
    }

    Ext.Msg.confirm("提示", "确认要删除节点？", function(type) {
        if(type == "yes") {

            var dataService = "";
            // 服务器节点
            if(1 == nodeSel.type) {

                // 删除服务地址
                if(0 == applyType) {

                    hwDas.del(
                        "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
                            'serviceaddressid': nodeSel.id,
                            'type': resourceType
                        },
                        function(result) {
                            Tips.tips("删除成功！", "success");
                            // Ext.Msg.alert("提示", "保存服务地址信息成功！");
                        },
                        function(msg) {
                            Tips.tips("删除失败！", "error");
                            // Ext.Msg.alert("提示", "保存服务地址信息失败！");
                        }
                    );
                } else {
                    hwDas.del(
                        "DataServiceWorkSpace/projectInfo/ProjectServiceAddress", {}, {
                            'serviceaddressid': nodeSel.id,
                            'type': resourceType
                        },
                        function(result) {
                            Tips.tips("删除成功！", "success");
                            // Ext.Msg.alert("提示", "保存服务地址信息成功！");
                        },
                        function(msg) {
                            Tips.tips("删除失败！", "error");
                            // Ext.Msg.alert("提示", "保存服务地址信息失败！");
                        }
                    );
                }
            } else if(2 == nodeSel.type) // 分类节点
            {
                // 删除节点
                if(0 == applyType) {
                    hwDas.del(
                        "DataServiceWorkSpace/WorkSpaceInfo/ResourceCategory", {}, {
                            'resourceid': nodeSel.id
                        },
                        function(result) {
                            Tips.tips("删除成功！", "success");
                            // Ext.Msg.alert("提示", "删除资源目录成功！");
                        },
                        function(msg) {
                            Tips.tips("删除失败！", "error");
                            // Ext.Msg.alert("提示", "删除资源目录失败！");
                        }
                    );
                } else {
                    hwDas.del(
                        "DataServiceWorkSpace/projectInfo/ProjectResource", {}, {
                            'resourceid': nodeSel.id
                        },
                        function(result) {
                            Tips.tips("删除成功！", "success");
                            // Ext.Msg.alert("提示", "删除资源目录成功！");
                        },
                        function(msg) {
                            Tips.tips("删除失败！", "error");
                            // Ext.Msg.alert("提示", "删除资源目录失败！");
                        }
                    );
                }
            }

            // 删除之前需要循环删除其下的分类节点
            nodeSel.removeAll();
            // 删除当前节点
            nodeSel.remove();
        }
    });
}

function treeResource_nodeout(sender, e, node) {
    if(node._tool) {
        vmd(node._tool).remove();
    }
}


function WorkspaceResEdit_xuexi_beforerender(sender){

}
			this.WorkspaceResEdit_xuexi_afterrender=WorkspaceResEdit_xuexi_afterrender;
		this.WorkspaceResEdit_xuexi_beforerender=WorkspaceResEdit_xuexi_beforerender;
		this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				height:30,
				hidden:false,
				items:[
					{
						xtype:"vmd.button",
						id:"btnAddServer",
						type:"(none)",
						size:"large",
						icon:"icon-tasks",
						width:28,
						height:22,
						style:"padding: 5px 5px 5px 5px;    border: none;    background: none;",
						click:"btnAddServer_click",
						listeners:{
							click:btnAddServer_click
						}
					},
					{
						xtype:"vmd.button",
						id:"btnAddCategory",
						type:"(none)",
						size:"large",
						icon:"icon-file-text-alt",
						width:26,
						height:22,
						style:"padding: 5px 5px 5px 5px;    border: none;    background: none;",
						click:"btnAddCategory_click",
						listeners:{
							click:btnAddCategory_click
						}
					},
					{
						xtype:"vmd.button",
						id:"btnEdit",
						type:"(none)",
						size:"large",
						icon:"icon-pencil",
						width:26,
						height:22,
						style:"padding: 5px 5px 5px 5px;    border: none;    background: none;",
						click:"btnEdit_click",
						listeners:{
							click:btnEdit_click
						}
					},
					{
						xtype:"vmd.button",
						id:"btnDelete",
						type:"(none)",
						size:"large",
						icon:"icon-trash",
						width:26,
						height:22,
						style:"padding: 5px 5px 5px 5px;    border: none;    background: none;",
						click:"btnDelete_click",
						listeners:{
							click:btnDelete_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"div1",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				height:478,
				layout:"fit",
				items:[
					{
						xtype:"vmd.treeex",
						id:"treeResource",
						width:569,
						height:322,
						hideRoot:true,
						x:0,
						y:-1,
						afterrender:"treeResource_afterrender",
						loadType:"全部加载",
						leafImg:"/img/public/folderClosed.gif",
						nodeover:"treeResource_nodeover",
						nodeout:"treeResource_nodeout",
						listeners:{
							vmdafterrender:treeResource_afterrender,
							nodeover:treeResource_nodeover,
							nodeout:treeResource_nodeout
						}
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.iSetAddCategoryBtnVisiable= function(paraVisiable){
//直接填写方法内容
btnAddCategory.isVisible = paraVisiable;
	}
		this.iSetResourceType= function(type){
//直接填写方法内容
resourceType = type;
	}
		this.iSetWorkSpaceId= function(id){
//直接填写方法内容
workspaceId = id;
	}
		this.iSetDataStore= function(store){
//直接填写方法内容
;
this.dataStore = store;
	}
		this.iLoadResource= function(type, resouType){
//直接填写方法内容
loadResource(type,resouType);
	}
		this.iShowAddCategoryBtn= function(bShow){
//直接填写方法内容
// ;
// btnAddCategory.hidden = true;
// btnAddCategory.hide();
// if(bShow)
// {
//     btnAddCategory.show();
// }
// else
// {
//     btnAddCategory.hide();
// }
	}
		this.iSetId= function(id){
//直接填写方法内容
objInfoId = id;
	}
		this.iSetApplyType= function(type){
//直接填写方法内容
applyType = type;
	}
		this.iClearAll= function(){
//直接填写方法内容
clearAll();
	}
		this.iSetIfDataLoaded= function(bVar){
//直接填写方法内容
ifDataLoaded = bVar;
	}
		this.iGetIfDataLoaded= function(){
//直接填写方法内容
return ifDataLoaded;
	}
		this.iAddServer= function(id, name, addr, remark, resType){
//直接填写方法内容
addResourceServer(id,name, addr, remark, resType);
	}
		this.isAddServeData= function(id, name, addr, remark, resType){
//直接填写方法内容
addServeInServe(id, name, addr, remark, resType)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.WorkspaceResEdit_xuexi");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.WorkspaceResEdit_xuexi");
	}
})