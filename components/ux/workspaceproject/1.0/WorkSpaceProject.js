Ext.define("vmd.ux.WorkSpaceProject" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.WorkSpaceProject",
	title:"Panel",
	header:false,
	border:false,
	width:220,
	height:650,
	layout:"border",
	afterrender:"WorkSpaceProject_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.WorkSpaceProject_afterrender(this)
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
			// var workSpaceId = "";
// workSpaceId = "657e35d9-494a-456d-8f80-98b4924133d7";
// var workSpaceName = ;
var storeWorkSpaceProject;

function btnMenu_click(sender, e) {
    hwMenuWorkSpace.showAt(e.xy);
}

function WorkSpaceProject_afterrender(sender) {

    var body = Ext.getBody();
    // 将右键菜单添加到body上，用于解决菜单被遮挡的问题
    // body.appendChild(hwMenuWorkSpace.el);
    // body.appendChild(hwMenuProject.el);

    btnWorkSpace.setText("勘探业务工区");
    btnWorkSpace.workspaceId = "657e35d9-494a-456d-8f80-98b4924133d7";
}

function hwMenuWorkSpace_click(sender, menuItem, e) {
    var itemId = menuItem.id;
    var itemAddProject = itemId.indexOf("hwMenuItemAddProject"); // 基于0开始,找不到返回-1
    var itemConfig = itemId.indexOf("hwMenuItemWorkSpaceConfig"); // 基于0开始,找不到返回-1
    var itemPaste = itemId.indexOf("hwMenuItemPasteProject"); // 基于0开始,找不到返回-1

    // 基本信息
    if(itemAddProject > -1) {
        onMenuItemAddProject();
    } else if(itemConfig > -1) {
        onMenuItemWorkSpaceConfig();
    } else if(itemPaste > -1) {
        onMenuItemPasteProject();
    }
}

// 添加项目
function onMenuItemAddProject() {

    window.treeProjects = treeProjects;
    treeProjects.addProjectTree = addProjectTree;
    var formAddProject = new vmd.window({
        title: "项目添加",
        url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwRSvMOuk9.html",
        // url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwB1IoubEq.html",
        // url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hw12d114b0.html",
        auto: false,
        height: 496,
        width: 878,
        params: {
            workspaceid: btnWorkSpace.workspaceId,
            r: new Date().getTime()
        }
    })

    formAddProject.show();
    window.formAddProject = formAddProject;
}

function addProjectTree() {
    treeProjects.store.toRefresh(); // 刷新项目树
}
// 工区配置
function onMenuItemWorkSpaceConfig() {
    window.btnWorkSpace = btnWorkSpace;
    var formWorkSpaceConfig = new vmd.window({
        title: "工区参数配置",
        url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hw56e34140.html",
        auto: false,
        height: 510,
        width: 626,
        params: {
            workspaceid: btnWorkSpace.workspaceId,
            r: new Date().getTime()
        }
    })
    
    
    // workspaceSelData = WorkSpaceList.getSelData();
    // workspaceId = workspaceSelData.workspace_id;

    formWorkSpaceConfig.show();
    window.formWorkSpaceConfig = formWorkSpaceConfig;
}

// 粘贴
function onMenuItemPasteProject() {

}

function treeProjects_nodeclick(sender, node, e) {

    // hwMenuProject.showAt(e.xy);
}

function hwMenuProject_click(sender, menuItem, e) {

    var itemId = menuItem.id;
    var itemConfig = itemId.indexOf("hwMenuItemProjectConfig"); // 基于0开始,找不到返回-1
    var itemCopy = itemId.indexOf("hwMenuItemProjectCopy"); // 基于0开始,找不到返回-1
    var itemDel = itemId.indexOf("hwMenuItemProjectDel"); // 基于0开始,找不到返回-1

    // 基本信息
    if(itemConfig > -1) {
        onMenuItemProjectConfig();
    } else if(itemCopy > -1) {
        onMenuItemProjectCopy();
    } else if(itemDel > -1) {
        onMenuItemProjectDel();
    }
}

// 项目配置
function onMenuItemProjectConfig() {

    var nodeSel = treeProjects.getSelNode();

    window.treeProjects = treeProjects;
    treeProjects.projectConfig = projectConfig;

    var formProConfig = new vmd.window({
        title: "项目配置",
        url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hw9299ec24.html",
        auto: false,
        height: 510,
        width: 626,
        params: {
            id: nodeSel.id,
            r: new Date().getTime()
        }
    })

    formProConfig.show();
    window.formProConfig = formProConfig;
}

// 项目复制
function onMenuItemProjectCopy() {

}

// 删除项目
function onMenuItemProjectDel() {

    Ext.Msg.confirm("提示", "确认要从工区中删除该项目？", function(type) {
        if(type == "yes") {

            var nodeSel = treeProjects.getSelNode();
            if(null == nodeSel || undefined == nodeSel) {
                Ext.Msg.alert("提示", "请选择要删除的节点！");
                return;
            }

            hwDas.del(
                "DataServiceWorkSpace/WorkSpaceInfo/WorkSpaceProject", {}, {
                    'workspaceid': btnWorkSpace.workspaceId,
                    'projectid': nodeSel.id
                },
                function(result) {
                    Tips.tips("删除成功！", "success");
                    // Ext.Msg.alert("提示", "删除资源目录成功！");
                },
                function(msg) {
                    Tips.tips("删除失败！", "error");
                    // Ext.Msg.alert("提示", "删除项目失败！");
                }
            );

            // 删除当前节点
            nodeSel.remove();

        }
    });
}

// 项目配置，获取改变项目名称
function projectConfig(name) {

    var nodeSel = treeProjects.getSelNode();
    if(null == nodeSel || undefined == nodeSel) {
        return;
    }
    nodeSel.setText(name);
}


function treeProjects_afterrender(sender) {

}

function hwMenuWorkSpace_afterrender(sender) {
    var body = Ext.getBody();
    // 将右键菜单添加到body上，用于解决菜单被遮挡的问题
    body.appendChild(hwMenuWorkSpace.el);
}

function hwMenuProject_afterrender(sender) {
    // var body = Ext.getBody();
    // // 将右键菜单添加到body上，用于解决菜单被遮挡的问题
    // body.appendChild(hwMenuProject.el);
}

function treeProjects_beforeShowMenu(sender, node, e) {

    hwMenuProject.showAt(e.xy);
}

function setWorkSpaceInfo(id, name) {
    
    // workspaceId = id;

    btnWorkSpace.setText(name);
    btnWorkSpace.workspaceId = id;
    // treeProjects.store.toRefresh();

    // hwDas.get(
    //     "DataServiceWorkSpace/WorkSpaceInfo/WorkSpaceProject", {}, {
    //         "workspaceid": id
    //     },
    //     function(result) {
    //         // 根据获取的数据赋值基本信息Tab页
    //         if(null === result && undefined === result) {
    //             return;
    //         }

    //         if(null != result.data && undefined != result.data) {
    //             // if(result.data.length > 0) {
    //             //     if(null != result.data[0].datas && undefined != result.data[0].datas) {
    //             //         for(var i = 0; i < result.data[0].datas.length; i++) {
    //             //             var nodeService = addServiceAddressNode(
    //             //                 result.data[0].datas[i].id,
    //             //                 result.data[0].datas[i].name,
    //             //                 result.data[0].datas[i].address,
    //             //                 result.data[0].datas[i].remark);
    //             //             // workspaceId = "1005a370-ea5a-4753-9cbb-d854be34f490";
    //             //             if(1 == type || 2 == type) {
    //             //                 loadResourceCategory(nodeService, workspaceId, result.data[0].datas[0].id, type);
    //             //             }
    //             //         }
    //             //     }
    //             // }
    //         }

        //     ifDataLoaded = true;
        //     // Tips.tips("查询成功！", "success");
        // },
        // function(msg) {
        //     Tips.tips("查询失败！", "error");
        //     // Ext.Msg.alert("提示", "查询资源信息失败！");
        // });
}
			this.WorkSpaceProject_afterrender=WorkSpaceProject_afterrender;
		this.items=[
			{
				xtype:"panel",
				id:"panel1",
				title:"Panel",
				header:false,
				border:true,
				height:32,
				region:"north",
				layout:"absolute",
				width:259,
				items:[
					{
						xtype:"vmd.button",
						id:"btnWorkSpace",
						text:"勘探业务工区",
						type:"text",
						size:"small",
						x:3,
						y:0,
						width:180,
						style:"font-family: Microsoft YaHei;    font-size: 16px;    text-align: left;",
						height:30
					},
					{
						xtype:"vmd.button",
						id:"btnMenu",
						text:"...",
						type:"text",
						size:"small",
						x:190,
						y:-7,
						width:30,
						click:"btnMenu_click",
						height:30,
						style:"font-size: 20px;",
						listeners:{
							click:btnMenu_click
						}
					}
				]
			},
			{
				xtype:"panel",
				id:"panel2",
				title:"Panel",
				header:false,
				border:true,
				height:100,
				region:"center",
				layout:"fit",
				width:360,
				items:[
					{
						xtype:"vmd.treeex",
						id:"treeProjects",
						width:257,
						hideRoot:true,
						x:40,
						y:110,
						loadType:"全部加载",
						rootValue:"0",
						rootText:"0",
						parentField:"pid",
						valueField:"project_id",
						textField:"project_name",
						nodeclick:"treeProjects_nodeclick",
						afterrender:"treeProjects_afterrender",
						beforeShowMenu:"treeProjects_beforeShowMenu",
						style:"font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;    font-size: 16px;    border: 1px solid RGB(192, 192, 192);",
						leafImg:"/img/public/projectclose.png",
						listeners:{
							nodeclick:treeProjects_nodeclick,
							vmdafterrender:treeProjects_afterrender,
							beforeShowMenu:treeProjects_beforeShowMenu
						},
						store:this.store
					}
				]
			},
			{
				xtype:"vmd.menu",
				id:"hwMenuWorkSpace",
				width:120,
				hidden:true,
				floating:true,
				click:"hwMenuWorkSpace_click",
				afterrender:"hwMenuWorkSpace_afterrender",
				region:"west",
				listeners:{
					click:hwMenuWorkSpace_click,
					vmdafterrender:hwMenuWorkSpace_afterrender
				},
				items:[
					{
						xtype:"menuitem",
						id:"hwMenuItemAddProject",
						width:120,
						text:"添加项目",
						hidden:false
					},
					{
						xtype:"menuitem",
						id:"hwMenuItemWorkSpaceConfig",
						width:120,
						text:"参数配置",
						hidden:false
					},
					{
						xtype:"menuitem",
						id:"hwMenuItemPasteProject",
						width:120,
						text:"粘贴",
						hidden:true
					}
				]
			},
			{
				xtype:"vmd.menu",
				id:"hwMenuProject",
				width:120,
				hidden:true,
				floating:true,
				click:"hwMenuProject_click",
				afterrender:"hwMenuProject_afterrender",
				region:"east",
				listeners:{
					click:hwMenuProject_click,
					vmdafterrender:hwMenuProject_afterrender
				},
				items:[
					{
						xtype:"menuitem",
						id:"hwMenuItemProjectConfig",
						width:120,
						text:"项目配置",
						hidden:false
					},
					{
						xtype:"menuitem",
						id:"hwMenuItemProjectCopy",
						width:120,
						text:"复制",
						hidden:true
					},
					{
						xtype:"menuitem",
						id:"hwMenuItemProjectDel",
						width:120,
						text:"删除",
						hidden:false
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.iSetWorkSpaceInfo= function(id, name){
//直接填写方法内容
setWorkSpaceInfo(id, name);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.WorkSpaceProject");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.WorkSpaceProject");
	}
})