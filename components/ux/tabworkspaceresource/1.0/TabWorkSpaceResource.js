Ext.define("vmd.ux.TabWorkSpaceResource" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.WorkspaceResEdit$1.0$WorkspaceResEdit"]),
	version:"1.0",
	xtype:"vmd.ux.TabWorkSpaceResource",
	title:"Panel",
	header:false,
	border:false,
	width:616,
	height:382,
	layout:"absolute",
	beforerender:"TabWorkSpaceResource_beforerender",
	afterrender:"TabWorkSpaceResource_afterrender",
	listeners:{
		beforerender:function(){
	this.TabWorkSpaceResource_beforerender(this)
},
		vmdafterrender:function(){
	this.TabWorkSpaceResource_afterrender(this)
}
	},
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
			var page = this;

// 设置工区ID
function setWorkSpaceId(id) {
    WorkspaceResEditTheme.iSetWorkSpaceId(id);
    WorkspaceResEditImage.iSetWorkSpaceId(id);
    WorkspaceResEditJs.iSetWorkSpaceId(id);
}

// 设置工区ID
function setId(id) {
    WorkspaceResEditTheme.iSetId(id);
    WorkspaceResEditImage.iSetId(id);
    WorkspaceResEditJs.iSetId(id);
}

// 设置工区ID
function setApplyType(type) {
    WorkspaceResEditTheme.iSetApplyType(type);
    WorkspaceResEditImage.iSetApplyType(type);
    WorkspaceResEditJs.iSetApplyType(type);
}

function queryResource(id) {
    WorkspaceResEditTheme.iSetWorkSpaceId(id);
    WorkspaceResEditTheme.iLoadResource(0);
    WorkspaceResEditImage.iSetWorkSpaceId(id);
    WorkspaceResEditImage.iLoadResource(1);
    WorkspaceResEditJs.iLoadResource(2);
    WorkspaceResEditJs.iSetWorkSpaceId(id);
}

function TabsWorkSpaceResource_tabchange(sender, tab) {
    if(tab.items) sender.curActiveTab = tab.items.items[0];

    var tabId = tab.id;
    var tabIndexTheme = tabId.indexOf("panelTabTheme"); // 基于0开始,找不到返回-1
    var tabIndexImage = tabId.indexOf("panelTabImage"); // 基于0开始,找不到返回-1
    var tabIndexJs = tabId.indexOf("panelTabJsFile"); // 基于0开始,找不到返回-1

    if(tabIndexTheme > -1) {
        WorkspaceResEditTheme.iSetResourceType(0);
        // if(!WorkspaceResEditTheme.iGetIfDataLoaded()) {
            WorkspaceResEditTheme.iLoadResource(0, 0);
        // }
    } else if(tabIndexImage > -1) {
        WorkspaceResEditImage.iSetResourceType(1);
        // if(!WorkspaceResEditImage.iGetIfDataLoaded()) {
            WorkspaceResEditImage.iLoadResource(1, 1);
        // }
    } else if(tabIndexJs > -1) {
        WorkspaceResEditJs.iSetResourceType(2);
        // if(!WorkspaceResEditJs.iGetIfDataLoaded()) {
            WorkspaceResEditJs.iLoadResource(2, 2);
        // }
    }

}

function tabchangeResource() {

    var tabId = TabsWorkSpaceResource.activeTab.id;
    var tabIndexTheme = tabId.indexOf("panelTabTheme"); // 基于0开始,找不到返回-1
    var tabIndexImage = tabId.indexOf("panelTabImage"); // 基于0开始,找不到返回-1
    var tabIndexJs = tabId.indexOf("panelTabJsFile"); // 基于0开始,找不到返回-1

    if(tabIndexTheme > -1) {
        WorkspaceResEditTheme.iSetResourceType(0);
        // if(!WorkspaceResEditTheme.iGetIfDataLoaded()) {
            WorkspaceResEditTheme.iLoadResource(0, 0);
        // }
    } else if(tabIndexImage > -1) {
        WorkspaceResEditImage.iSetResourceType(1);
        // if(!WorkspaceResEditImage.iGetIfDataLoaded()) {
            WorkspaceResEditImage.iLoadResource(0, 1);
        // }
    } else if(tabIndexJs > -1) {
        WorkspaceResEditJs.iSetResourceType(2);
        // if(!WorkspaceResEditJs.iGetIfDataLoaded()) {
            WorkspaceResEditJs.iLoadResource(0, 2);
        // }
    }
}

function ToolbarWorkspaceResourceTheme_onClickBtnAddServer(sender, e) {

    var addResourceServer = function(name, addr, remark) {

        var mytree = treeResourceTheme;
        var nodeId = vmd.util.guid();
        // var nodeNameSel = mytree.getSelectedItemText();
        var resourceServiceName = name;
        var resourceServiceAddress = addr;
        var resourceServiceRemark = remark;

        var rootNode = new Ext.tree.TreeNode({
            id: nodeId,
            text: resourceServiceName,
            cls: "vmd-tree-node",
            checked: false
        });

        rootNode.id = nodeId;
        rootNode.text = name;
        rootNode.address = addr;
        rootNode.remark = remark;
        // 拖上图片，增加图标
        // rootNode.setIcon("/img/public/{D35D2F80-5F23-46C8-A9EE-CE33B28DD531}.png");
        mytree.setRootNode(rootNode); // ???根节点的添加

        // 添加资源中心的服务地址后，需要同步从服务地址
        // 通过数据服务获取该资源中心有哪些主题添加到服务地址节点下
        // 此处的主题的展现方式尚需讨论
        // 获取来的节点数据格式是什么样的？数据集？怎样提取数据？
        // var treeNode = me.store.data.items[index].data; // ???
        // 调用服务保存新添加的服务器信息

        // 服务调用，获取主题
        // var urlService = "http://192.168.1.186:8888/activiti-rest/service/repository/categorys?info=kermit";
        // hwDas.ajax({
        //     // das: {
        //     //     idedas: true
        //     // },
        //     // das: false,

        //     url: urlService,
        //     // url: "http://192.168.1.186:8888/activiti-rest/service/repository/categorys?info=kermit",
        //     // einfo=elogin, http://192.168.1.186:8888
        //     type: 'post',
        //     timeout: 5000,
        //     data: { // body传参
        //         'superId': selId,
        //         'name': nodename,
        //         'xh': 1
        //     },
        //     success: function(result) {

        //         if(result == "") {
        //             return;
        //         }

        //         // 获取数据后解析形成树形节点；
        //         mytree.insertNewChild(selId, result.id, result.name);
        //         mytree.setItemColor(result.id, '#000000', '#000000');
        //         mytree.setItemImage2(result.id, "tree/folderClosed.gif", "tree/folderOpen.gif", "tree/folderClosed.gif");
        //         // mytree.insertNewChild(result.id, result.id + "-0000", "");
        //         mytree.closeItem(result.id);
        //         var treenode = mytree.item(result.id);
        //         if(treenode) {
        //             treenode.isTemplate = false; // 标识是否是目标文件
        //             treenode.childLoaded = true; // 标识是否加载了子节点
        //             treenode.isDeployment = false; // 标识是否发布
        //             treenode.url = result.url;
        //         }
        //         var objKey = "hw" + result.id;
        //         mytree.itemObj[objKey] = treenode;

        //     },
        //     error: function(msg) {
        //         Ext.Msg.alert("提示", "新建分类失败！")
        //     }
        // })
    }

    var winForm = new Ext.winAddResourceServer(addResourceServer, "", "", "");
    winForm.show();
}

function ToolbarWorkspaceResourceTheme_onClickBtnAddCategory(sender, e) {
    // 主题不需要添加分类节点
    // 而是添加服务地址后，通过服务获取配置服务器下包含的主题
}

function ToolbarWorkspaceResourceTheme_onClickBtnEdit(sender, e) {


    var addResourceServer = function(name, addr, remark) {

        var mytree = treeResourceTheme;
        var nodeId = vmd.util.guid();
        var nodeSel = mytree.getSelNode();
        // var nodeNameSel = mytree.getSelectedItemText();
        var resourceServiceName = name;
        var resourceServiceAddress = addr;
        var resourceServiceRemark = remark;

        var rootNode = new Ext.tree.TreeNode({
            id: nodeId,
            text: resourceServiceName,
            cls: "vmd-tree-node",
            checked: false
        });
        // rootNode.setIcon(this.rootImg ? this.rootImg : null); // 图标？？？
        // 节点数据如何记录，记录格式？？？
        // 修改信息后同步修改树节点信息，同时调用服务更新数据库中对应的信息；
        // mytree.setRootNode(rootNode); // ???根节点的添加

        // 添加资源中心的服务地址后，需要同步从服务地址
        // 通过数据服务获取该资源中心有哪些主题添加到服务地址节点下
        // 此处的主题的展现方式尚需讨论
        // 获取来的节点数据格式是什么样的？数据集？怎样提取数据？
        // var treeNode = me.store.data.items[index].data; // ???
        // 调用服务保存新添加的服务器信息

        // 服务调用，获取主题
        // var urlService = "http://192.168.1.186:8888/activiti-rest/service/repository/categorys?info=kermit";
        // hwDas.ajax({
        //     // das: {
        //     //     idedas: true
        //     // },
        //     // das: false,

        //     url: urlService,
        //     // url: "http://192.168.1.186:8888/activiti-rest/service/repository/categorys?info=kermit",
        //     // einfo=elogin, http://192.168.1.186:8888
        //     type: 'post',
        //     timeout: 5000,
        //     data: { // body传参
        //         'superId': selId,
        //         'name': nodename,
        //         'xh': 1
        //     },
        //     success: function(result) {

        //         if(result == "") {
        //             return;
        //         }

        //         // 获取数据后解析形成树形节点；
        //         mytree.insertNewChild(selId, result.id, result.name);
        //         mytree.setItemColor(result.id, '#000000', '#000000');
        //         mytree.setItemImage2(result.id, "tree/folderClosed.gif", "tree/folderOpen.gif", "tree/folderClosed.gif");
        //         // mytree.insertNewChild(result.id, result.id + "-0000", "");
        //         mytree.closeItem(result.id);
        //         var treenode = mytree.item(result.id);
        //         if(treenode) {
        //             treenode.isTemplate = false; // 标识是否是目标文件
        //             treenode.childLoaded = true; // 标识是否加载了子节点
        //             treenode.isDeployment = false; // 标识是否发布
        //             treenode.url = result.url;
        //         }
        //         var objKey = "hw" + result.id;
        //         mytree.itemObj[objKey] = treenode;

        //     },
        //     error: function(msg) {
        //         Ext.Msg.alert("提示", "新建分类失败！")
        //     }
        // })
    }

    var nodeSel = treeResourceTheme.getSelNode(); // 能获取选中的节点？？？API
    // 获取选中节点的信息传递到服务地址配置对话框中
    var winForm = new Ext.winAddResourceServer(addResourceServer, "", "", "");
    winForm.show();
}

function ToolbarWorkspaceResourceTheme_onClickBtnDelete(sender, e) {
    // alert("dddddddddd");
}


// //自定义产生GUID
// function newGuid(len) {
//     var length = 32;
//     if(len)
//         length = len - 2
//     var guid = "";
//     for(var i = 1; i <= length; i++) {
//         var n = Math.floor(Math.random() * 16.0).toString(16);
//         guid += n;
//     }
//     return guid;
// }

// ???
function treeResourceTheme_afterNodeExpand(sender, node) {

    if(!node) {
        return;
    }
    var mytree = treeResourceTheme;
    var selnode = node;

    // 从数据库查询当前节点下的资源路径

    // // 如果是文件夹节点
    // if(!selnode.isTemplate) {

    //     var nodeNullId = nodeId + "-0000";
    //     var nIndex = mytree.getIndexById(nodeNullId);
    //     if(null != nIndex) {
    //         if(nIndex > -1) {
    //             mytree.deleteItem(nodeNullId);
    //         }
    //     }

    //     // 获取文件夹下的分类节点和模板节点
    //     // 分类节点
    //     getChildCategoryNodes(nodeId);
    //     // 模板节点
    //     getChildTemplateNodes(nodeId);
    // }
}


//添加资源中心服务地址
Ext.winAddResourceServer = Ext.extend(Ext.Window, {
    xtype: "window",
    title: "添加资源中心服务地址",
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
            regex: /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
            regexText: "输入标准的服务器地址（带端口）！"
        }, {
            id: 'remark',
            xtype: "textfield",
            fieldLabel: "说明",
            anchor: "100%",
            value: this.valueRemark
        }]
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
                var reg = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
                if(!reg.test(Ext.getCmp('addr').getValue())) {
                    Ext.Msg.alert("提示", "请输入正确的服务地址（带端口）！")
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
            xtype: "textfield",
            fieldLabel: "说明",
            anchor: "100%",
            value: this.valueRemark
        }]
        Ext.winAddResourceServer.superclass.initComponent.call(this);
    }
})

function ToolbarWorkspaceResourceImage_onClickBtnAddServer(sender, e) {

    var addResourceServer = function(name, addr, remark) {
        var mytree = treeResourceImage;
        var nodeId = vmd.util.guid();
        // var nodeNameSel = mytree.getSelectedItemText();
        var resourceServiceName = name;
        var resourceServiceAddress = addr;
        var resourceServiceRemark = remark;

        var rootNode = new Ext.tree.TreeNode({
            id: nodeId,
            text: resourceServiceName,
            cls: "vmd-tree-node",
            checked: false
        });
        rootNode.setIcon(this.rootImg ? this.rootImg : null); // 图标？？？
        // 节点数据如何记录，记录格式？？？
        mytree.setRootNode(rootNode); // ???根节点的添加
    }
    var winForm = new Ext.winAddResourceServer(addResourceServer, "", "", "");
    winForm.show();
}

function ToolbarWorkspaceResourceImage_onClickBtnAddCategory(sender, e) {

    var addCategoryNode = function(idCategory, strCategory) {
        var mytree = treeResourceImage;
        var nodeSel = mytree.getSelNode(); // ???参考API
        var nodeId = vmd.util.guid();

        var cnode = new Ext.tree.TreeNode({
            id: nodeId,
            checked: false,
            // icon: me.leafImg ? me.leafImg : null, // ???
            cls: "vmd-tree-node",
            text: strCategory
        });
        cnode.nodeDataJson = treeNode; // 怎样记录节点数据？？？
        nodeSel.appendChild(cnode);
    }
    var winForm = new Ext.winWorkFlowCategory(addCategoryNode, "");
    winForm.show();
}

function ToolbarWorkspaceResourceImage_onClickBtnEdit(sender, e) {

    // alert("cccccccccc");
}

function ToolbarWorkspaceResourceImage_onClickBtnDelete(sender, e) {

    // alert("ddddddd");
}

// // 2018.05.11：选择文件所在目录窗体
// function openWin(obj, html, parname, par) {
//     window[parname] = par;
//     var openWinFrom = new Ext.Window(obj || {
//         title: "节点绑定表单",
//         modal: true,
//         maximized: false,
//         height: 600,
//         width: 800,
//         maximizable: true,
//         resizable: true,
//         bodyStyle: "background-color:#fff",
//         closeAction: 'close'

//     })
//     Ext.defer(function() {
//         openWinFrom.html = html; //"<iframe src='"+vmd.core.getVirtualPath()+"modules/eQ9ULgcVb1/hw4acf2f8b/hw3b434d49.html?r=" + new Date().getTime() + "' frameborder=0 scrolling=no style='height:100%;width:100%'></iframe>";
//         openWinFrom.show()
//     }, 50)

//     window["openWinFrom"] = openWinFrom;
//     return openWinFrom;
// }
// window["openWin"] = openWin;

function TabWorkSpaceResource_beforerender(sender) {

}

function panelTabTheme_afterrender(sender) {
    // WorkspaceResEditTheme.iLoadResource(0);
}

function panelTabImage_afterrender(sender) {

    // WorkspaceResEditImage.iLoadResource(1);
}

function panelTabJsFile_afterrender(sender) {

    // WorkspaceResEditJs.iLoadResource(2);
}

function TabWorkSpaceResource_afterrender(sender) {


}

function WorkspaceResEditJs_beforerender(sender) {
    // console.log("第二层组件的WorkspaceResEditJs_beforerender");
    // WorkspaceResEditImage.iSetDataStore(page.dataStore);
}

function WorkspaceResEditJs_afterrender(sender) {

    // console.log("第二层组件的WorkspaceResEditJs_afterrender");
}

function WorkspaceResEditTheme_afterrender(sender) {
    WorkspaceResEditTheme.iShowAddCategoryBtn(false);
}

function clearAll(sender) {
    WorkspaceResEditTheme.iClearAll();
    WorkspaceResEditImage.iClearAll();
    WorkspaceResEditJs.iClearAll();
}

function TabsWorkSpaceResource_beforerender(sender) {

}

function setIfDataLoaded(bVar) {
    WorkspaceResEditTheme.iSetIfDataLoaded(bVar);
    WorkspaceResEditImage.iSetIfDataLoaded(bVar);
    WorkspaceResEditJs.iSetIfDataLoaded(bVar);
}

function TabsWorkSpaceResource_afterrender(sender) {
    WorkspaceResEditTheme.iShowAddCategoryBtn(false);
}

function button_click(sender, e) {
    //   var curActiveTab=TabsWorkSpaceResource.curActiveTab;
    //   curActiveTab&& curActiveTab.addServer();

    btnAddServer();
}


function btnAddServer() {
    var addResourceServer = function(name, addr, remark) {
        var id = vmd.util.guid();
        // var nameTmp = name + "(资源中心)";
        // WorkspaceResEditTheme.isAddServeData(id, nameTmp, addr, remark,0);
        // WorkspaceResEditTheme.isAddServeData(id, nameTmp, addr, remark,1);
        // WorkspaceResEditTheme.isAddServeData(id, nameTmp, addr, remark,2);
        WorkspaceResEditTheme.iAddServer(id, name, addr, remark, 0);
        WorkspaceResEditImage.iAddServer(id, name, addr, remark, 1);
        WorkspaceResEditJs.iAddServer(id, name, addr, remark, 2);

    }

    var winForm = new Ext.winAddResourceServer(addResourceServer, "", "", "");
    winForm.show();
}

function WorkspaceResEditTheme_onClickBtnAddServer(sender, e) {

}
			this.TabWorkSpaceResource_afterrender=TabWorkSpaceResource_afterrender;
		this.TabWorkSpaceResource_beforerender=TabWorkSpaceResource_beforerender;
		this.items=[
			{
				xtype:"tabpanel",
				id:"TabsWorkSpaceResource",
				activeTab:0,
				height:380,
				width:610,
				x:0,
				y:0,
				tabchange:"TabsWorkSpaceResource_tabchange",
				beforerender:"TabsWorkSpaceResource_beforerender",
				afterrender:"TabsWorkSpaceResource_afterrender",
				listeners:{
					tabchange:TabsWorkSpaceResource_tabchange,
					beforerender:TabsWorkSpaceResource_beforerender,
					vmdafterrender:TabsWorkSpaceResource_afterrender
				},
				items:[
					{
						xtype:"panel",
						id:"panelTabImage",
						title:"图片",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						afterrender:"panelTabImage_afterrender",
						listeners:{
							vmdafterrender:panelTabImage_afterrender
						},
						items:[
							{
								xtype:"vmd.ux.WorkspaceResEdit",
								id:"WorkspaceResEditImage",
								layout:"auto",
								x:0,
								y:0,
								height:350,
								width:610
							}
						]
					},
					{
						xtype:"panel",
						id:"panelTabJsFile",
						title:"JS文件",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						afterrender:"panelTabJsFile_afterrender",
						listeners:{
							vmdafterrender:panelTabJsFile_afterrender
						},
						items:[
							{
								xtype:"vmd.ux.WorkspaceResEdit",
								id:"WorkspaceResEditJs",
								layout:"auto",
								x:0,
								y:0,
								height:350,
								beforerender:"WorkspaceResEditJs_beforerender",
								afterrender:"WorkspaceResEditJs_afterrender",
								listeners:{
									beforerender:WorkspaceResEditJs_beforerender,
									vmdafterrender:WorkspaceResEditJs_afterrender
								}
							}
						]
					},
					{
						xtype:"panel",
						id:"panelTabTheme",
						title:"主题",
						header:true,
						border:true,
						height:247,
						layout:"absolute",
						afterrender:"panelTabTheme_afterrender",
						listeners:{
							vmdafterrender:panelTabTheme_afterrender
						},
						items:[
							{
								xtype:"vmd.ux.WorkspaceResEdit",
								id:"WorkspaceResEditTheme",
								layout:"auto",
								x:0,
								y:0,
								height:340,
								width:610,
								afterrender:"WorkspaceResEditTheme_afterrender",
								onClickBtnAddServer:"WorkspaceResEditTheme_onClickBtnAddServer",
								listeners:{
									vmdafterrender:WorkspaceResEditTheme_afterrender,
									onClickBtnAddServer:WorkspaceResEditTheme_onClickBtnAddServer
								}
							}
						]
					}
				]
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"添加服务地址",
				type:"text",
				size:"small",
				style:"position: relative;    margin-right: 20px;    float: right;    top: 4px;",
				icon:" icon-plus",
				click:"button_click",
				listeners:{
					click:button_click
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.iSetWorkSpaceId= function(id){
//直接填写方法内容
setWorkSpaceId(id);
	}
		this.iSetDataStore= function(store){
//直接填写方法内容

this.dataStore = store;
	}
		this.iSetId= function(id){
//直接填写方法内容
setId(id);
	}
		this.iSetApplyType= function(type){
//直接填写方法内容
setApplyType(type);
	}
		this.iClearAll= function(){
//直接填写方法内容
clearAll();
	}
		this.iQueryResource= function(id){
//直接填写方法内容
queryResource(id);
	}
		this.iSetIfDataLoaded= function(bVar){
//直接填写方法内容
setIfDataLoaded(bVar);
	}
		this.iTabChangeResource= function(){
//直接填写方法内容
tabchangeResource();
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.TabWorkSpaceResource");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.TabWorkSpaceResource");
	}
})