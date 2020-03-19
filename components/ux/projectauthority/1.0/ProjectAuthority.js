Ext.define("vmd.ux.ProjectAuthority" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ProjectAuthority",
	title:"Panel",
	header:false,
	border:false,
	width:728,
	height:363,
	layout:"absolute",
	beforerender:"ProjectAuthority_beforerender",
	listeners:{
		beforerender:function(){
	this.ProjectAuthority_beforerender(this)
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
var workspaceId = "";
// var workspaceId = "00000000-0000-0000-0000-000000000000";
var ifNewWorkSpace = false; // 是否是新建工区
var ifBaseInfoSaved = false; // 基本信息是否已保存
// 工作流服务地址下拉列表数据
var workflowStoreRecords = null;
// 数据服务的服务地址下拉列表数据
var dataserviceStoreRecords = null;

function panelTabInfo_afterrender(sender) {

    // 2018.05.23 考虑到切换工区后就不会触发afterrender方法，所以把数据查询加载放到tabchange事件中了
    // queryDataInfo();
}

function panelTabWorkflow_afterrender(sender) {

}

function panelTabDataService_afterrender(sender) {

}

function panelTabResource_afterrender(sender) {

    // TabWorkSpaceResource.iSetWorkSpaceId(workspaceId);
}

function TabsWorkSpaceInfo_tabchange(sender, tab) {

    var tabId = tab.id;
    var tabIndexInfo = tabId.indexOf("panelTabInfo"); // 基于0开始,找不到返回-1
    var tabIndexWorkFlow = tabId.indexOf("panelTabWorkflow"); // 基于0开始,找不到返回-1
    var tabIndexDataService = tabId.indexOf("panelTabDataService"); // 基于0开始,找不到返回-1
    var tabIndexResource = tabId.indexOf("panelTabResource"); // 基于0开始,找不到返回-1

    // 基本信息
    if(tabIndexInfo > -1) {
        queryDataInfo();
    } else if(tabIndexWorkFlow > -1) {
        queryWorkFlow();
    } else if(tabIndexDataService > -1) {
        queryDataService();
    } else if(tabIndexResource > -1) {

        TabWorkSpaceResource.iSetWorkSpaceId(workspaceId);
        TabWorkSpaceResource.iTabChangeResource();
    }
}

function queryDataInfo() {

    // workspaceId = "18a7a702-1077-4b44-9e35-6e289da389d9";

    if(workspaceId === null || workspaceId === undefined || workspaceId === '') {
        return;
    }
    if(panelTabInfo.ifDataLoaded) {
        return;
    }
    hwDas.get(
        "DataServiceWorkSpace/WorkSpaceInfo/WorkSpaceInfo", {}, {
            "workspaceid": workspaceId
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
                            hwTextWorkSpaceName.setValue(result.data[0].datas[0].name);
                            hwTextWorkSpaceAlias.setValue(result.data[0].datas[0].alias_short_name);
                            hwTextAreaWorkSpaceDescription.setValue(result.data[0].datas[0].remark);
                            hwTextCreatedTime.setValue(result.data[0].datas[0].row_created_date)
                            hwTextModifiedTime.setValue(result.data[0].datas[0].row_changed_date);

                        } else {
                            hwTextWorkSpaceName.setValue("");
                            hwTextWorkSpaceAlias.setValue("");
                            hwTextAreaWorkSpaceDescription.setValue("");
                            hwTextCreatedTime.setValue('')
                            hwTextModifiedTime.setValue('');
                        }
                    }
                }
            }

            panelTabInfo.ifDataLoaded = true;
        },
        function(msg) {
            // Tips.tips("查询失败！", "error");
            // Ext.Msg.alert("提示", "查询工区信息失败！");
        });
}

function queryWorkFlow() {
    // workspaceId = "326c3fa0-1e02-4402-b2c2-42659a50e0b0";

    if(workspaceId === null || workspaceId === undefined || workspaceId === '') {
        return;
    }
    if(panelTabWorkflow.ifDataLoaded) {
        return;
    }
    hwDas.get(
        "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
            "workspaceid": workspaceId,
            "servicetype": 3
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
                            comlistWorkflowAddress.setValue(result.data[0].datas[0].address);
                            comlistWorkflowAddress.serviceId = result.data[0].datas[0].id;
                        } else {
                            comlistWorkflowAddress.setValue("");
                            comlistWorkflowAddress.serviceId = undefined;
                        }
                    }
                }
            }

            panelTabWorkflow.ifDataLoaded = true;
        },
        function(msg) {
            // Ext.Msg.alert("提示", "查询工区信息失败！");
        });
}

function queryDataService() {
    // workspaceId = "20e05c41-96ab-46f7-aaa6-d9a177ee9323";

    if(workspaceId === null || workspaceId === undefined || workspaceId === '') {
        return;
    }
    if(panelTabDataService.ifDataLoaded) {
        return;
    }
    hwDas.get(
        "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
            "workspaceid": workspaceId,
            "servicetype": 4
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
                            comlistDataServiceAddress.setValue(result.data[0].datas[0].address);
                            comlistDataServiceAddress.serviceId = result.data[0].datas[0].id;
                        } else {
                            comlistDataServiceAddress.setValue("");
                            comlistDataServiceAddress.serviceId = undefined;
                        }
                    }
                }
            }
            panelTabDataService.ifDataLoaded = true;
        },
        function(msg) {
            // Ext.Msg.alert("提示", "查询工区信息失败！");
        });
}

function saveData(lastId, refreshStore) {

    var flag = 0; // 0: insert, 1:update;
    if(!ifNewWorkSpace) {
        flag = 1;
    }
    // if(workspaceId !== null && workspaceId !== undefined && workspaceId !== '') {
    //     flag = 1;
    // }

    // if(0 === flag) {
    //     workspaceId = vmd.util.guid();
    // }

    // var tmpTab = TabsWorkSpaceInfo.getActiveTab();
    // 基本信息
    if(panelTabInfo.ifDataLoaded) {
        saveDataInfo(workspaceId, flag, lastId, refreshStore);
        ifBaseInfoSaved = true;
    }
    
    if(panelTabWorkflow.ifDataLoaded) {
        saveWorkFlow(workspaceId, flag, refreshStore);
    }
    
    if(panelTabDataService.ifDataLoaded) {
        saveDataService(workspaceId, flag, refreshStore);
    }


    // var tabId = TabsWorkSpaceInfo.activeTab.id;
    // var tabIndexInfo = tabId.indexOf("panelTabInfo"); // 基于0开始,找不到返回-1
    // var tabIndexWorkFlow = tabId.indexOf("panelTabWorkflow"); // 基于0开始,找不到返回-1
    // var tabIndexDataService = tabId.indexOf("panelTabDataService"); // 基于0开始,找不到返回-1
    // var tabIndexResource = tabId.indexOf("panelTabResource"); // 基于0开始,找不到返回-1
    // if(tabIndexInfo > -1) {
    //     saveDataInfo(workspaceId, flag, lastId, refreshStore);
    // } else if(tabIndexWorkFlow > -1) {
    //     saveWorkFlow(workspaceId, flag, refreshStore);
    // } else if(tabIndexDataService > -1) {
    //     saveDataService(workspaceId, flag, refreshStore);
    // } else if(tabIndexResource > -1) {
    //     Tips.tips("保存成功！", "success");
    // }


    ifNewWorkSpace = false;
}

// function saveData(lastId, refreshStore) {

//     var flag = 0; // 0: insert, 1:update;
//     if(!ifNewWorkSpace) {
//         flag = 1;
//     }
//     // 基本信息
//     saveDataInfo(workspaceId, flag, lastId, refreshStore);
//     ifBaseInfoSaved = true;
//     ifNewWorkSpace = false;
// }

function saveFlow(refreshStore) {

    var flag = 0; // 0: insert, 1:update;
    if(!ifNewWorkSpace) {
        flag = 1;
    }
    // 基本信息

    saveWorkFlow(workspaceId, flag, refreshStore);

    ifNewWorkSpace = false;
}

function saveService(refreshStore) {

    var flag = 0; // 0: insert, 1:update;
    if(!ifNewWorkSpace) {
        flag = 1;
    }
    // 基本信息
    saveDataService(workspaceId, flag, refreshStore);

    ifNewWorkSpace = false;
}


// flag 0:insert, 1:update
function saveDataInfo(id, flag, lastId, refreshStore) {
    
    // var myDate = new Date();
    // myDate.toLocaleString(); //获取日期与时间
    if(0 == flag) {

        var workspaceName = hwTextWorkSpaceName.getValue();
        if(workspaceName == null || workspaceName == undefined || workspaceName == '') {
            workspaceName = "我的工区";
        }
        var workspaceAlias = hwTextWorkSpaceAlias.getValue();

        if(workspaceAlias === null || workspaceAlias === undefined || workspaceAlias === '') {
            workspaceAlias = workspaceName;
        }
        hwDas.add(
            "DataServiceWorkSpace/WorkSpaceInfo/WorkSpaceInfo", {}, {}, [{
                'workspaceid': id,
                'lastid': lastId,
                'workspacename': workspaceName,
                'isactive': 0,
                'modifydate': hwTextCreatedTime.getValue(),
                'createddate': hwTextModifiedTime.getValue(),
                'aliasid': vmd.util.guid(),
                'aliaslongname': workspaceAlias,
                'aliasshortname': workspaceAlias,
                'remark': hwTextAreaWorkSpaceDescription.getValue()
            }],
            function(result) {
                if(refreshStore) {
                    refreshStore(id);
                }
                Tips.tips("保存成功！", "success");
                // Ext.Msg.alert("提示", "保存工区信息成功！")
                ifBaseInfoSaved = true; // 基本信息是否已保存
            },
            function(msg) {
                Tips.tips("保存失败！", "error");
                // Ext.Msg.alert("提示", "保存工区信息失败！")
            }
        );
    } else {
        hwDas.edit(
            "DataServiceWorkSpace/WorkSpaceInfo/WorkSpaceInfo", {}, {}, [{
                'workspaceid': id,
                'name': hwTextWorkSpaceName.getValue(),
                'aliaslongname': hwTextWorkSpaceAlias.getValue(),
                'aliasshortname': hwTextWorkSpaceAlias.getValue(),
                'modifydate': Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'),
                'remark': hwTextAreaWorkSpaceDescription.getValue()
            }],
            function(result) {
                if(refreshStore) {
                    refreshStore();
                }
                Tips.tips("保存成功！", "success");
                // Ext.Msg.alert("提示", "保存工区信息成功！")
            },
            function(msg) {
                Tips.tips("保存失败！", "error");
                // Ext.Msg.alert("提示", "保存工区信息失败！")
            }
        );
    }
}


// id:工区id； flag：0，新建工区；1：更新工区；refreshStore：回调函数刷新数据集
function saveWorkFlow(id, flag, refreshStore) {
    
    var workflowAddr = comlistWorkflowAddress.getText();
    if(!workflowAddr) {
        return
    }
    var wfData = storeWorkflowList.data.items;
    var serviceId = '';
    var ifAddrExisted = false;
    if(workflowStoreRecords) {
        for(var i = 0; i < workflowStoreRecords.length; i++) {
            if(workflowStoreRecords[i].address == workflowAddr) {
                ifAddrExisted = true;
                serviceId = workflowStoreRecords[i].id;
                comlistWorkflowAddress.serviceId = serviceId;
                break;
            }
        }
    }

    // 地址不存在,就向服务地址表中增加一条记录
    if(!ifAddrExisted) {
        serviceId = vmd.util.guid();
        comlistWorkflowAddress.serviceId = serviceId;
        addWorkflowAddr(serviceId, workflowAddr);
    }
    // 如果地址已经存在，就向工区服务地址关系表中保存数据（插入或更新）
    saveWorkflowAddr(id, serviceId, 3, workflowAddr, refreshStore);
}


// 向服务地址表RESOURCE_SERVICEADDRESS中插入一条地址记录
function saveWorkflowAddr(wsId, addrId, type, address, refreshStore) {

    hwDas.save(
        "DataServiceWorkSpace/WorkSpaceInfo/WfDsAddr", {}, {}, [{
            'workspaceid': wsId,
            'addressid': addrId,
            'type': type
        }],
        function(result) {
            Tips.tips("保存成功！", "success");

            vmd.workspace.workflowIp = address;
            // if(parent.vmd.workspace.workspaceid == id) {
            //     if(addr != parent.vmd.workspace.workflowIp) {
            //         // 更新主页面的工作流信息
            //         refreshStore();
            //     }
            // }
        },
        function(msg) {
            Tips.tips("保存失败！", "error");
        }
    );
}


// 向服务地址表RESOURCE_SERVICEADDRESS中插入一条地址记录
function addWorkflowAddr(id, address) {

    hwDas.add(
        "DataServiceWorkSpace/WorkSpaceInfo/WfDsAddr", {}, {}, [{
            'id': id,
            'name': "工作流服务地址",
            'addr': address,
            'type': 3,
            'remark': "工作流服务地址"
        }],
        function(result) {
            // Tips.tips("保存成功！", "success");
        },
        function(msg) {
            // Tips.tips("保存失败！", "error");
        }
    );
}


// function saveWorkFlow(id, flag, refreshStore) {
//     
//     var workflowAddr = comlistWorkflowAddress.getText();
//     if(!workflowAddr) {
//         return
//     }
//     var wfData = storeWorkflowList.data.items;
//     var serviceId = '';
//     var ifAddrExisted = false;
//     // if(wfData.length == 0) {
//     //     serviceId = '';
//     // } else {
//     //     wfData.forEach(function(item, index) {
//     //         if(comlistWorkflowAddress.getText() == item.data.address) {
//     //             serviceId = comlistWorkflowAddress.getValue();
//     //             ifAddrExisted = true;
//     //         }
//     //     })
//     //     if(!ifAddrExisted) {
//     //         serviceId = '';
//     //     }
//     // }

//     // 新建工区
//     if(0 == flag) {

//         // if(!ifBaseInfoSaved) {
//         //     saveDataInfo(id, flag, refreshStore);
//         // }
//         // var serviceId = vmd.util.guid();
//         // comlistWorkflowAddress.serviceId = serviceId;
//         hwDas.add(
//             "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {}, [{
//                 'workspaceid': id,
//                 'serviceaddressid': serviceId,
//                 'serviceaddressname': "工作流服务地址",
//                 'serviceaddress': workflowAddr,
//                 'serviceaddresstype': 3,
//                 'serviceaddressremark': "工作流服务地址"
//             }],
//             function(result) {
//                 Tips.tips("保存成功！", "success");
//                 vmd.workspace.workflowIp = comlistWorkflowAddress.getText();
//                 // if(parent.vmd.workspace.workspaceid == id) {
//                 //     if(addr != parent.vmd.workspace.workflowIp) {
//                 //         // 更新主页面的工作流信息
//                 //         refreshStore();
//                 //     }
//                 // }
//                 // Ext.Msg.alert("提示", "保存工作流服务地址信息成功！")
//             },
//             function(msg) {
//                 Tips.tips("保存失败！", "error");
//                 // Ext.Msg.alert("提示", "保存工作流服务地址信息失败！")
//             }
//         );
//     } else { // 更新工区

//         if(serviceId == '') {
//             var serviceId = vmd.util.guid();
//             // comlistWorkflowAddress.serviceId = serviceId;
//             // var addr = comlistWorkflowAddress.getText();
//             hwDas.add(
//                 "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {}, [{
//                     'workspaceid': id,
//                     'serviceaddressid': serviceId,
//                     'serviceaddressname': "工作流服务地址",
//                     'serviceaddress': workflowAddr,
//                     'serviceaddresstype': 3,
//                     'serviceaddressremark': "工作流服务地址"
//                 }],
//                 function(result) {

//                     Tips.tips("保存成功！", "success");
//                     vmd.workspace.workflowIp = workflowAddr;
//                     // if(parent.vmd.workspace.workspaceid == id) {
//                     //     if(addr != parent.vmd.workspace.workflowIp) {
//                     //         // 更新主页面的工作流信息
//                     //         refreshStore();
//                     //     }
//                     // }

//                     // Ext.Msg.alert("提示", "保存工作流服务地址信息成功！")
//                 },
//                 function(msg) {
//                     Tips.tips("保存失败！", "error");
//                     // Ext.Msg.alert("提示", "保存工作流服务地址信息失败！")
//                 }
//             );
//         } else {
//             // var addr =comlistWorkflowAddress.getText() ;
//             hwDas.edit(
//                 "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {}, [{
//                     'serviceaddressid': serviceId,
//                     'name': "工作流服务地址",
//                     'serviceaddress': workflowAddr,
//                     'remark': "工作流服务地址"
//                 }],
//                 function(result) {

//                     Tips.tips("保存成功！", "success");
//                     vmd.workspace.workflowIp = workflowAddr;
//                     // if(parent.vmd.workspace.workspaceid == id) {
//                     //     if(addr != parent.vmd.workspace.workflowIp) {
//                     //         // 更新主页面的工作流信息
//                     //         refreshStore();
//                     //     }
//                     // }
//                     // updateWorkflow(id, addr);

//                     // Ext.Msg.alert("提示", "保存工作流服务地址信息成功！")
//                 },
//                 function(msg) {
//                     Tips.tips("保存失败！", "error");
//                     // Ext.Msg.alert("提示", "保存工作流服务地址信息失败！")
//                 }
//             );
//         }
//     }

// }

function updateWorkflow(id, addr) {

    // if(parent.vmd.workspace.workspaceid == id) {
    //     if(addr != parent.vmd.workspace.workflowIp) {
    //         // 更新主页面的工作流信息
    //         if(parent.reloadWorkflowCategory) {
    //             parent.reloadWorkflowCategory();
    //         }
    //     }
    // }

    /////////////////////////////////////////////////////////
    // vmd.workspace = {
    //     workflowIp: '',
    //     dataServiceIp: '',
    //     workspaceid: ''
    // }
}

function updateDataService(id, addr) {
    // if(parent.vmd.workspace.workspaceid == id) {
    //     if(addr != parent.vmd.workspace.dataServiceIp) {
    //         // 更新主页面的数据服务
    //         if(parent.reloadDataServiceCategory) {
    //             parent.reloadDataServiceCategory();
    //         }
    //     }
    // }
}


function saveDataService(id, flag, refreshStore) {
    
    var dataserviceAddr = comlistDataServiceAddress.getText();
    if(!dataserviceAddr) {
        return
    }
    // var serveData = storeDataService.data.items;
    var serviceId = '';
    var ifAddrExisted = false;
    if(dataserviceStoreRecords) {
        for(var i = 0; i < dataserviceStoreRecords.length; i++) {
            if(dataserviceStoreRecords[i].address == dataserviceAddr) {
                ifAddrExisted = true;
                serviceId = dataserviceStoreRecords[i].id;
                comlistDataServiceAddress.serviceId = serviceId;
                break;
            }
        }
    }

    // 地址不存在,就向服务地址表中增加一条记录
    if(!ifAddrExisted) {
        serviceId = vmd.util.guid();
        comlistDataServiceAddress.serviceId = serviceId;
        addDataServiceAddr(serviceId, dataserviceAddr);
    }
    // 如果地址已经存在，就向工区服务地址关系表中保存数据（插入或更新）
    saveDataServiceAddr(id, serviceId, 4, dataserviceAddr, refreshStore);
}

// 向服务地址表RESOURCE_SERVICEADDRESS中插入一条地址记录
function saveDataServiceAddr(wsId, addrId, type, address, refreshStore) {

    hwDas.save(
        "DataServiceWorkSpace/WorkSpaceInfo/WfDsAddr", {}, {}, [{
            'workspaceid': wsId,
            'addressid': addrId,
            'type': type
        }],
        function(result) {
            Tips.tips("保存成功！", "success");

            vmd.workspace.dataServiceIp = address;
            // if(parent.vmd.workspace.workspaceid == id) {
            //     if(addr != parent.vmd.workspace.dataServiceIp) {
            //         // 更新主页面的工作流信息
            //         refreshStore();
            //     }
            // }
        },
        function(msg) {
            Tips.tips("保存失败！", "error");
        }
    );
}


// 向服务地址表RESOURCE_SERVICEADDRESS中插入一条地址记录
function addDataServiceAddr(id, address) {

    hwDas.add(
        "DataServiceWorkSpace/WorkSpaceInfo/WfDsAddr", {}, {}, [{
            'id': id,
            'name': "数据服务地址",
            'addr': address,
            'type': 4,
            'remark': "数据服务地址"
        }],
        function(result) {
            // Tips.tips("保存成功！", "success");
        },
        function(msg) {
            // Tips.tips("保存失败！", "error");
        }
    );
}

// function saveDataService(id, flag, refreshStore) {
//     
//     if(!comlistDataServiceAddress.getText()) {
//         return
//     }
//     var serveData = storeDataService.data.items;
//     var serviceId = '',
//         isHas = false;
//     if(serveData.length > 0) {
//         serveData.forEach(function(item, index) {
//             if(comlistWorkflowAddress.getText() == item.data.address) {
//                 serviceId = comlistWorkflowAddress.getValue();
//                 isHas = true;
//             }
//         })
//         if(!isHas) {
//             serviceId = '';
//         }
//     } else {
//         serviceId = '';
//     }
//     if(0 == flag) {

//         if(!ifBaseInfoSaved) {
//             saveDataInfo(id, flag, refreshStore);
//         }

//         var serviceId = vmd.util.guid();
//         // comlistDataServiceAddress.serviceId = serviceId;
//         hwDas.add(
//             "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {}, [{
//                 'workspaceid': id,
//                 'serviceaddressid': serviceId,
//                 'serviceaddressname': "数据服务地址",
//                 'serviceaddress': comlistDataServiceAddress.getText(),
//                 'serviceaddresstype': 4,
//                 'serviceaddressremark': "数据服务地址"
//             }],
//             function(result) {
//                 Tips.tips("保存成功！", "success");
//                 vmd.workspace.dataServiceIp = comlistDataServiceAddress.getText()
//                 if(parent.vmd.workspace.workspaceid == id) {
//                     if(addr != parent.vmd.workspace.dataServiceIp) {
//                         // 更新主页面的数据服务
//                         refreshStore();
//                     }
//                 }
//                 // Ext.Msg.alert("提示", "保存数据服务地址信息成功！");
//             },
//             function(msg) {
//                 Tips.tips("保存失败！", "error");
//                 // Ext.Msg.alert("提示", "保存数据流服务地址信息失败！");
//             }
//         );
//     } else {

//         if(serviceId == '') {
//             var serviceId = vmd.util.guid();
//             // comlistDataServiceAddress.serviceId = serviceId;
//             var addr = comlistDataServiceAddress.getText();
//             hwDas.add(
//                 "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {}, [{
//                     'workspaceid': id,
//                     'serviceaddressid': serviceId,
//                     'serviceaddressname': "数据服务地址",
//                     'serviceaddress': addr,
//                     'serviceaddresstype': 4,
//                     'serviceaddressremark': "数据服务地址"
//                 }],
//                 function(result) {

//                     Tips.tips("保存成功！", "success");
//                     vmd.workspace.dataServiceIp = comlistDataServiceAddress.getText()
//                         // if(parent.vmd.workspace.workspaceid == id) {
//                         //     if(addr != parent.vmd.workspace.dataServiceIp) {
//                         //         // 更新主页面的数据服务
//                         //         refreshStore();
//                         //     }
//                         // }
//                         // Ext.Msg.alert("提示", "保存数据服务地址信息成功！");
//                 },
//                 function(msg) {
//                     Tips.tips("保存失败！", "error");
//                     // Ext.Msg.alert("提示", "保存数据流服务地址信息失败！");
//                 }
//             );
//         } else {
//             // var addr = comlistDataServiceAddress.getText();
//             hwDas.edit(
//                 "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {}, [{
//                     'serviceaddressid': serviceId,
//                     'name': "数据服务地址",
//                     'serviceaddress': comlistDataServiceAddress.getText(),
//                     'remark': "数据服务地址"
//                 }],
//                 function(result) {
//                     Tips.tips("保存成功！", "success");
//                     vmd.workspace.dataServiceIp = comlistDataServiceAddress.getText()
//                         // if(parent.vmd.workspace.workspaceid == id) {
//                         //     if(addr != parent.vmd.workspace.dataServiceIp) {
//                         //         // 更新主页面的数据服务
//                         //         refreshStore();
//                         //     }
//                         // }
//                         // Ext.Msg.alert("提示", "保存数据服务地址信息成功！")
//                 },
//                 function(msg) {
//                     Tips.tips("保存失败！", "error");
//                     // Ext.Msg.alert("提示", "保存数据流服务地址信息失败！")
//                 }
//             );
//         }
//     }
// }

// 新建工区
function newWorkSpace(id) {
    // var nowTime = new Date().toLocaleString();
    var nowTime = new Date().getFullYear() + '-' + (parseFloat(new Date().getMonth()) + 1) + '-' + new Date().getDate() +
        ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    ifNewWorkSpace = true;
    ifBaseInfoSaved = false; // 基本信息是否已保存
    workspaceId = id;
    clearAll();
    hwTextCreatedTime.setValue(nowTime);
    hwTextModifiedTime.setValue(nowTime);
    setIfDataLoaded(true);
    // 将当前活动Tab页切换到基本信息Tab页
    TabsWorkSpaceInfo.setActiveTab(panelTabInfo);
}

// 设置数据是否已加载
function setIfDataLoaded(bVar) {

    panelTabInfo.ifDataLoaded = bVar;
    panelTabWorkflow.ifDataLoaded = bVar;
    panelTabDataService.ifDataLoaded = bVar;
    TabWorkSpaceResource.iSetIfDataLoaded(bVar);
}

// 清空所有
function clearAll() {

    clearBaseInfo();
    clearWorkflow();
    clearDataService();
    clearResource();
}

// 清空所有
function clearBaseInfo() {
    hwTextWorkSpaceName.setValue("");
    hwTextWorkSpaceAlias.setValue("");
    hwTextCreatedTime.setValue("");
    hwTextModifiedTime.setValue("");
    hwTextAreaWorkSpaceDescription.setValue("");
}

// 清空所有
function clearWorkflow() {
    comlistWorkflowAddress.setValue("");
    comlistWorkflowAddress.serviceId = undefined;
}

// 清空所有
function clearDataService() {

    comlistDataServiceAddress.setValue("");
    comlistDataServiceAddress.serviceId = undefined;
}

// 清空所有
function clearResource() {
    TabWorkSpaceResource.iClearAll();
}

function queryWorkSpaceInfo(id) {
    workspaceId = id;
    // 将当前活动Tab页切换到基本信息Tab页
    // TabsWorkSpaceInfo.setActiveTab(panelTabInfo);
    queryDataInfo();
    // queryWorkFlow();
    // queryDataService();
    // TabWorkSpaceResource.iSetWorkSpaceId(workspaceId);
}

function TabsWorkSpaceInfo_afterrender(sender) {

    // sgw2018.05.17:此处会自动生成ID导致无法添加新的工区信息，所以注释掉
    // if(workspaceId !== null && workspaceId !== undefined && workspaceId !== '') {
    //     return;
    // }
    // workspaceId = vmd.util.guid();
    // TabWorkSpaceResource.iSetWorkSpaceId(workspaceId);
}

function TabWorkSpaceResource_beforerender(sender) {

    // console.log("第一层的组件TabWorkSpaceResource_beforerender");

    // this.iSetDataStore(page.dataStore);
}

function ProjectAuthority_beforerender(sender) {

    // console.log("第一层的ProjectAuthority_beforerender");
}

function TabsWorkSpaceInfo_beforerender(sender) {
    panelTabInfo.ifDataLoaded = false;
    panelTabWorkflow.ifDataLoaded = false;
    panelTabDataService.ifDataLoaded = false;
}

// 选中工区变化了
function changeWorkSpace(id) {
    workspaceId = id;
    var tabId = TabsWorkSpaceInfo.activeTab.id;
    var tabIndexInfo = tabId.indexOf("panelTabInfo"); // 基于0开始,找不到返回-1
    var tabIndexWorkFlow = tabId.indexOf("panelTabWorkflow"); // 基于0开始,找不到返回-1
    var tabIndexDataService = tabId.indexOf("panelTabDataService"); // 基于0开始,找不到返回-1
    var tabIndexResource = tabId.indexOf("panelTabResource"); // 基于0开始,找不到返回-1

    // 基本信息
    if(tabIndexInfo > -1) {
        queryDataInfo();
    } else if(tabIndexWorkFlow > -1) {
        queryWorkFlow();
    } else if(tabIndexDataService > -1) {
        queryDataService();
    } else if(tabIndexResource > -1) {
        TabWorkSpaceResource.iSetWorkSpaceId(workspaceId);
        TabWorkSpaceResource.iTabChangeResource();
    }
}

function comlistWorkflowAddress_selectChanged(sender, combo, record, index) {
    comlistWorkflowAddress.serviceId = record.data.id;
}

function comlistDataServiceAddress_selectChanged(sender, combo, record, index) {
    comlistDataServiceAddress.serviceId = record.data.id;
}
			this.ProjectAuthority_beforerender=ProjectAuthority_beforerender;
		this.items=[
			{
				xtype:"panel",
				id:"panelProjectAuthority",
				title:"权限分配",
				header:false,
				border:true,
				height:360,
				layout:"absolute",
				width:730,
				items:[
					{
						xtype:"panel",
						id:"panelOrganization",
						title:"组织机构",
						header:true,
						border:true,
						height:360,
						width:230,
						layout:"absolute",
						x:10,
						y:0,
						items:[
							{
								xtype:"vmd.treeex",
								id:"treeOrganization",
								width:230,
								height:325,
								hideRoot:false,
								x:-1,
								y:0,
								style:"font-family: Microsoft YaHei;    font-size: 14px;"
							}
						]
					},
					{
						xtype:"panel",
						id:"panelMembers",
						title:"成员",
						header:true,
						border:true,
						height:360,
						x:250,
						y:0,
						width:230,
						layout:"absolute",
						items:[
							{
								xtype:"vmd.dataview",
								id:"hwDataViewMembers",
								width:230,
								height:330,
								itemSelector:"li.info",
								overClass:"info-hover",
								selectedClass:"x-view-selected",
								singleSelect:true,
								multiSelect:true,
								autoScroll:true,
								tpl:"<ul>    <tpl for=\".\">        <li class='info serverlist-info'> {name} </li>    </tpl></ul>",
								data:"var data = [{    \"workspace_id\": \"0000000001\",    \"name\": \"马飞\",    \"remark\": \"test\"}, {    \"workspace_id\": \"0000000002\",    \"name\": \"成兵\",    \"remark\": \"test\"}, {    \"workspace_id\": \"0000000003\",    \"name\": \"孙广蔚\",    \"remark\": \"test\"}, {    \"workspace_id\": \"0000000004\",    \"name\": \"李份\",    \"remark\": \"test\"}, {    \"workspace_id\": \"0000000005\",    \"name\": \"刘志伟\",    \"remark\": \"test\"}, {    \"workspace_id\": \"0000000006\",    \"name\": \"黄娜娜\",    \"remark\": \"test\"}];return data;",
								x:0,
								y:0,
								style:"font-family: Microsoft YaHei;    font-size: 13px;    padding: 5px 5px 5px 5px;"
							}
						]
					},
					{
						xtype:"panel",
						id:"panelRole",
						title:"角色",
						header:true,
						border:true,
						height:360,
						width:230,
						x:490,
						y:0,
						layout:"absolute",
						items:[
							{
								xtype:"checkboxstoregroup",
								id:"hwCheckboxGroup",
								width:220,
								height:320,
								labelField:"label",
								valueField:"value",
								checkedField:"checked",
								boxFieldName:"mycheckbox",
								x:10,
								y:10,
								autoScroll:true,
								vertical:true,
								columns:1,
								items:[
									{
										xtype:"checkbox",
										id:"hwCheckbox",
										boxLabel:"工区编辑角色",
										checked:true
									},
									{
										xtype:"checkbox",
										id:"hwCheckbox1",
										boxLabel:"工区删除角色"
									},
									{
										xtype:"checkbox",
										id:"hwCheckbox2",
										boxLabel:"项目添加移除角色",
										checked:true
									},
									{
										xtype:"checkbox",
										id:"hwCheckbox4",
										boxLabel:"项目新建角色"
									}
								]
							}
						]
					},
					{
						xtype:"vmd.button",
						id:"button",
						text:"...",
						type:"text",
						size:"small",
						x:675,
						y:1,
						width:30,
						style:"font-family: 'Microsoft YaHei';    font-size: 16px;    color: #000;"
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.iSaveData= function(lastId, refreshStore){
//直接填写方法内容
saveData(lastId,refreshStore);
	}
		this.iSetWorkSpaceId= function(id){
//直接填写方法内容
workspaceId = id;
	}
		this.iSetDataStore= function(store){
//直接填写方法内容
this.dataStore = store;
	}
		this.iGetWorkSpaceName= function(){
//直接填写方法内容
return hwTextWorkSpaceName.getValue();
	}
		this.iClearAll= function(){
//直接填写方法内容
clearAll();
	}
		this.iNewWorkSpace= function(id){
//直接填写方法内容
newWorkSpace(id);
	}
		this.iQueryWorkSpaceInfo= function(id){
//直接填写方法内容
queryWorkSpaceInfo(id);
	}
		this.iSetIfDataLoaded= function(bVar){
//直接填写方法内容
setIfDataLoaded(bVar);
	}
		this.iChangeWorkSpace= function(id){
//直接填写方法内容
changeWorkSpace(id);
	}
		this.isSaveFlow= function(callback){
//直接填写方法内容
saveFlow(callback)
	}
		this.isSaveService= function(callback){
//直接填写方法内容
saveService(callback)
	}
		this.iSetWorkflowStoreRecords= function(records){
//直接填写方法内容
workflowStoreRecords = records;
	}
		this.iSetDataServiceStoreRecords= function(records){
//直接填写方法内容
dataserviceStoreRecords = records;
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ProjectAuthority");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.ProjectAuthority");
	}
})