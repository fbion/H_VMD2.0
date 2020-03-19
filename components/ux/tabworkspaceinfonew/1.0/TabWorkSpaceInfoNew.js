Ext.define("vmd.ux.TabWorkSpaceInfoNew" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.TabWorkSpaceResource$1.0$TabWorkSpaceResource"]),
	version:"1.0",
	xtype:"vmd.ux.TabWorkSpaceInfoNew",
	title:"Panel",
	header:false,
	border:false,
	width:613,
	height:397,
	layout:"absolute",
	beforerender:"TabWorkSpaceInfoNew_beforerender",
	listeners:{
		beforerender:function(){
	this.TabWorkSpaceInfoNew_beforerender(this)
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

function TabWorkSpaceInfoNew_beforerender(sender) {

    // console.log("第一层的TabWorkSpaceInfoNew_beforerender");
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

function button_click(sender,e){

    var formAddWsMembers = new parent.vmd.window({
        title: "添加工区成员",
        url: parent.vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwdHH9CSl6/hwVaxlP27u.html",
        // url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hw4361c4dd.html",
        auto: false,
        height: 510,
        width: 902,
        maximizable: false,
        enableLoading: true,
        resizable: true
        // params: {
        //     workspaceid: btnWorkSpaceName.workspaceId,
        //     workflowaddr: vmd.workspace.workflowIp,
        //     dataserviceaddr: vmd.workspace.dataServiceIp,
        //     r: new Date().getTime()
        // }
    })

    formAddWsMembers.show();
}

function button2_click(sender,e){
    var formAddWsMembers = new parent.vmd.window({
        title: "成员角色",
        url: parent.vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwdHH9CSl6/hw0d1b6344.html",
        // url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hw4361c4dd.html",
        auto: false,
        height: 366,
        width: 250,
        maximizable: false,
        enableLoading: true,
        resizable: true
        // params: {
        //     workspaceid: btnWorkSpaceName.workspaceId,
        //     workflowaddr: vmd.workspace.workflowIp,
        //     dataserviceaddr: vmd.workspace.dataServiceIp,
        //     r: new Date().getTime()
        // }
    })

    formAddWsMembers.show();
}

function button3_click(sender,e){
    var formRoleAuthority = new parent.vmd.window({
        title: "角色设置",
        url: parent.vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwdHH9CSl6/hwqmML9RYr.html",
        // url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hw4361c4dd.html",
        auto: false,
        height: 402,
        width: 522,
        maximizable: false,
        enableLoading: true,
        resizable: true
        // params: {
        //     workspaceid: btnWorkSpaceName.workspaceId,
        //     workflowaddr: vmd.workspace.workflowIp,
        //     dataserviceaddr: vmd.workspace.dataServiceIp,
        //     r: new Date().getTime()
        // }
    })

    formRoleAuthority.show();
}
			this.TabWorkSpaceInfoNew_beforerender=TabWorkSpaceInfoNew_beforerender;
		this.items=[
			{
				xtype:"tabpanel",
				id:"TabsWorkSpaceInfo",
				activeTab:4,
				height:400,
				width:610,
				x:0,
				y:0,
				tabchange:"TabsWorkSpaceInfo_tabchange",
				afterrender:"TabsWorkSpaceInfo_afterrender",
				beforerender:"TabsWorkSpaceInfo_beforerender",
				listeners:{
					tabchange:TabsWorkSpaceInfo_tabchange,
					vmdafterrender:TabsWorkSpaceInfo_afterrender,
					beforerender:TabsWorkSpaceInfo_beforerender
				},
				items:[
					{
						xtype:"panel",
						id:"panelTabInfo",
						title:"基本信息",
						header:true,
						border:true,
						height:384,
						layout:"absolute",
						width:436,
						afterrender:"panelTabInfo_afterrender",
						listeners:{
							vmdafterrender:panelTabInfo_afterrender
						},
						items:[
							{
								xtype:"label",
								id:"label",
								text:"工区名称：",
								x:20,
								y:15
							},
							{
								xtype:"textfield",
								id:"hwTextWorkSpaceName",
								allowBlank:true,
								x:80,
								y:10,
								width:520
							},
							{
								xtype:"textfield",
								id:"hwTextCreatedTime",
								allowBlank:true,
								x:80,
								y:70,
								width:520,
								readOnly:true
							},
							{
								xtype:"label",
								id:"label1",
								text:"创建时间：",
								x:20,
								y:75
							},
							{
								xtype:"label",
								id:"label2",
								text:"修改时间：",
								x:20,
								y:105
							},
							{
								xtype:"textfield",
								id:"hwTextModifiedTime",
								allowBlank:true,
								x:80,
								y:100,
								width:520,
								readOnly:true
							},
							{
								xtype:"label",
								id:"label3",
								text:"    说明：",
								x:43,
								y:130,
								height:20
							},
							{
								xtype:"textarea",
								id:"hwTextAreaWorkSpaceDescription",
								allowBlank:true,
								x:80,
								y:130,
								width:520,
								height:90
							},
							{
								xtype:"label",
								id:"label6",
								text:"工区别名：",
								x:20,
								y:45
							},
							{
								xtype:"textfield",
								id:"hwTextWorkSpaceAlias",
								allowBlank:true,
								x:80,
								y:40,
								width:520
							}
						]
					},
					{
						xtype:"panel",
						id:"panelTabWorkflow",
						title:"工作流",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						afterrender:"panelTabWorkflow_afterrender",
						listeners:{
							vmdafterrender:panelTabWorkflow_afterrender
						},
						items:[
							{
								xtype:"label",
								id:"label4",
								text:"工作流服务地址：",
								x:15,
								y:15
							},
							{
								xtype:"vmd.comlist",
								id:"comlistWorkflowAddress",
								width:490,
								height:270,
								x:110,
								y:10,
								editable:true,
								selectChanged:"comlistWorkflowAddress_selectChanged",
								listeners:{
									selectChanged:comlistWorkflowAddress_selectChanged
								},
								store:this.storeWorkflow
							}
						]
					},
					{
						xtype:"panel",
						id:"panelTabDataService",
						title:"数据服务",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						afterrender:"panelTabDataService_afterrender",
						listeners:{
							vmdafterrender:panelTabDataService_afterrender
						},
						items:[
							{
								xtype:"label",
								id:"label5",
								text:"数据服务地址：",
								x:15,
								y:15
							},
							{
								xtype:"vmd.comlist",
								id:"comlistDataServiceAddress",
								width:500,
								height:270,
								x:100,
								y:10,
								editable:true,
								selectChanged:"comlistDataServiceAddress_selectChanged",
								listeners:{
									selectChanged:comlistDataServiceAddress_selectChanged
								},
								store:this.storeDataService
							}
						]
					},
					{
						xtype:"panel",
						id:"panelTabResource",
						title:"资源",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						afterrender:"panelTabResource_afterrender",
						listeners:{
							vmdafterrender:panelTabResource_afterrender
						},
						items:[
							{
								xtype:"vmd.ux.TabWorkSpaceResource",
								id:"TabWorkSpaceResource",
								layout:"absolute",
								x:0,
								y:0,
								height:380,
								beforerender:"TabWorkSpaceResource_beforerender",
								width:610,
								listeners:{
									beforerender:TabWorkSpaceResource_beforerender
								}
							}
						]
					},
					{
						xtype:"panel",
						id:"panelAuthority",
						title:"工区成员",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						width:692,
						items:[
							{
								xtype:"grid",
								id:"MyGrid",
								title:"Grid Panel",
								loadMask:true,
								x:0,
								y:30,
								height:330,
								hideHeaders:false,
								header:false,
								columns:[
									{
										xtype:"gridcolumn",
										header:"序号",
										sortable:true,
										resizable:true,
										dataIndex:"data3",
										width:40,
										align:"center"
									},
									{
										xtype:"gridcolumn",
										header:"成员名",
										sortable:true,
										resizable:true,
										dataIndex:"data1",
										width:180,
										align:"center"
									},
									{
										xtype:"gridcolumn",
										header:"所属部门",
										sortable:true,
										resizable:true,
										dataIndex:"data2",
										width:380,
										align:"center"
									}
								]
							},
							{
								xtype:"vmd.button",
								id:"button",
								text:"添加",
								type:"text",
								size:"small",
								x:370,
								y:0,
								icon:"icon-plus",
								click:"button_click",
								listeners:{
									click:button_click
								}
							},
							{
								xtype:"vmd.button",
								id:"button1",
								text:"删除",
								type:"text",
								size:"small",
								x:420,
								y:0,
								icon:"icon-minus"
							},
							{
								xtype:"vmd.button",
								id:"button2",
								text:"成员角色",
								type:"text",
								size:"small",
								x:470,
								y:0,
								icon:"icon-user",
								click:"button2_click",
								listeners:{
									click:button2_click
								}
							},
							{
								xtype:"vmd.button",
								id:"button3",
								text:"角色管理",
								type:"text",
								size:"small",
								x:540,
								y:0,
								icon:"icon-key",
								click:"button3_click",
								listeners:{
									click:button3_click
								}
							}
						]
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
	Ext.util.CSS.removeStyleSheet("vmd.ux.TabWorkSpaceInfoNew");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.TabWorkSpaceInfoNew");
	}
})