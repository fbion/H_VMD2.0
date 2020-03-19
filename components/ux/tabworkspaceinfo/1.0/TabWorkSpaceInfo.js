undefined
Ext.define("vmd.ux.TabWorkSpaceInfo", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.TabWorkSpaceResource$1.0$TabWorkSpaceResource"]),
    version: "1.0",
    xtype: "vmd.ux.TabWorkSpaceInfo",
    title: "Panel",
    header: false,
    border: false,
    width: 610,
    height: 420,
    layout: "absolute",
    beforerender: "TabWorkSpaceInfo_beforerender",
    afterrender: "TabWorkSpaceInfo_afterrender",
    listeners: {
        beforerender: function() {
            this.TabWorkSpaceInfo_beforerender(this)
        },
        vmdafterrender: function() {
            this.TabWorkSpaceInfo_afterrender(this)
        }
    },
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
        var page = this;
        var workspaceId = "";
        // var workspaceId = "00000000-0000-0000-0000-000000000000";
        var ifNewWorkSpace = false; // 是否是新建工区
        var ifBaseInfoSaved = false; // 基本信息是否已保存
        var ifMSGSaved = false; // 基本信息是否已保存
        // 工作流服务地址下拉列表数据
        var workflowStoreRecords = null;
        var msgStoreRecords = null;
        // 数据服务的服务地址下拉列表数据
        var dataserviceStoreRecords = null;
        // 记录当前是哪一个tab页
        var tabIndexInfo, tabIndexWorkFlow, tabIndexDataService, tabIndexResource, tabIndexMSG;
        // var workspaceNameOld = "";
        function panelTabInfo_afterrender(sender) {}

        function panelTabWorkflow_afterrender(sender) {}

        function panelTabDataService_afterrender(sender) {}

        function panelTabResource_afterrender(sender) {}

        function TabsWorkSpaceInfo_tabchange(sender, tab) {
            var tabId = tab.id;
            tabIndexInfo = tabId.indexOf("panelTabInfo"); // 基于0开始,找不到返回-1
            tabIndexWorkFlow = tabId.indexOf("panelTabWorkflow"); // 基于0开始,找不到返回-1
            tabIndexDataService = tabId.indexOf("panelTabDataService"); // 基于0开始,找不到返回-1
            tabIndexResource = tabId.indexOf("panelTabResource"); // 基于0开始,找不到返回-1
            tabIndexMSG = tabId.indexOf("panelMSG"); // 基于0开始,找不到返回-1
            // 基本信息
            if (tabIndexInfo > -1) {
                queryDataInfo();
            } else if (tabIndexWorkFlow > -1) {
                queryWorkFlow();
            } else if (tabIndexDataService > -1) {
                queryDataService();
            } else if (tabIndexResource > -1) {
                TabWorkSpaceResource.iSetWorkSpaceId(workspaceId);
                TabWorkSpaceResource.iTabChangeResource();
            } else if (tabIndexMSG > -1) {
                queryMSG();
            }
        }

        function queryDataInfo() {
            // workspaceId = "18a7a702-1077-4b44-9e35-6e289da389d9";
            if (workspaceId === null || workspaceId === undefined || workspaceId === '') {
                return;
            }
            if (panelTabInfo.ifDataLoaded) {
                return;
            }
            hwDas.get(
                "DataServiceWorkSpace/WorkSpaceInfo/WorkSpaceInfo", {}, {
                    "workspaceid": workspaceId
                },
                function(result) {
                    // 根据获取的数据赋值基本信息Tab页
                    if (null === result && undefined === result) {
                        return;
                    }
                    if (null != result.data && undefined != result.data) {
                        if (result.data.length > 0) {
                            if (null != result.data[0].datas && undefined != result.data[0].datas) {
                                if (result.data[0].datas.length > 0) {
                                    // workspaceNameOld = result.data[0].datas[0].name;
                                    hwTextWorkSpaceName.setValue(result.data[0].datas[0].name);
                                    hwTextWorkSpaceAlias.setValue(result.data[0].datas[0].alias_short_name);
                                    hwTextAreaWorkSpaceDescription.setValue(result.data[0].datas[0].remark);
                                    hwTextCreatedTime.setValue(result.data[0].datas[0].row_created_date)
                                    hwTextModifiedTime.setValue(result.data[0].datas[0].row_changed_date);
                                } else {
                                    // workspaceNameOld = "";
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
            if (workspaceId === null || workspaceId === undefined || workspaceId === '') {
                return;
            }
            if (panelTabWorkflow.ifDataLoaded) {
                return;
            }
            hwDas.get(
                "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
                    "workspaceid": workspaceId,
                    "servicetype": 3
                },
                function(result) {
                    // 根据获取的数据赋值基本信息Tab页
                    if (null === result && undefined === result) {
                        return;
                    }
                    if (null != result.data && undefined != result.data) {
                        if (result.data.length > 0) {
                            if (null != result.data[0].datas && undefined != result.data[0].datas) {
                                if (result.data[0].datas.length > 0) {
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
            if (workspaceId === null || workspaceId === undefined || workspaceId === '') {
                return;
            }
            if (panelTabDataService.ifDataLoaded) {
                return;
            }
            hwDas.get(
                "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
                    "workspaceid": workspaceId,
                    "servicetype": 4
                },
                function(result) {
                    // 根据获取的数据赋值基本信息Tab页
                    if (null === result && undefined === result) {
                        return;
                    }
                    if (null != result.data && undefined != result.data) {
                        if (result.data.length > 0) {
                            if (null != result.data[0].datas && undefined != result.data[0].datas) {
                                if (result.data[0].datas.length > 0) {
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
        //20180914 成兵 根据工作流查询方法进行添加
        function queryMSG() {
            if (workspaceId === null || workspaceId === undefined || workspaceId === '') {
                return;
            }
            if (panelMSG.ifDataLoaded) {
                return;
            }
            hwDas.get(
                "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
                    "workspaceid": workspaceId,
                    "servicetype": 5
                },
                function(result) {
                    // 根据获取的数据赋值基本信息Tab页
                    if (null === result && undefined === result) {
                        return;
                    }
                    if (null != result.data && undefined != result.data) {
                        if (result.data.length > 0) {
                            if (null != result.data[0].datas && undefined != result.data[0].datas) {
                                if (result.data[0].datas.length > 0) {
                                    comlistMSG.setValue(result.data[0].datas[0].address);
                                    comlistMSG.serviceId = result.data[0].datas[0].id;
                                } else {
                                    comlistMSG.setValue("");
                                    comlistMSG.serviceId = undefined;
                                }
                            }
                        }
                    }
                    panelMSG.ifDataLoaded = true;
                },
                function(msg) {
                    // Ext.Msg.alert("提示", "查询工区信息失败！");
                });
        }

        function saveData(lastId, refreshStore) {
            var flag = 0; // 0: insert, 1:update;
            if (!ifNewWorkSpace) {
                flag = 1;
            }
            // 基本信息
            if (panelTabInfo.ifDataLoaded && tabIndexInfo > -1) {
                saveDataInfo(workspaceId, flag, lastId, refreshStore);
                ifBaseInfoSaved = true;
            }
            if (panelTabWorkflow.ifDataLoaded && tabIndexWorkFlow > -1) {
                saveWorkFlow(workspaceId, flag, refreshStore);
            }
            if (panelTabDataService.ifDataLoaded && tabIndexDataService > -1) {
                saveDataService(workspaceId, flag, refreshStore);
            }
            if (panelMSG.ifDataLoaded && tabIndexMSG > -1) {
                saveMSG(refreshStore);
            }
            ifNewWorkSpace = false;
        }

        function saveFlow(refreshStore) {
            var flag = 0; // 0: insert, 1:update;
            if (!ifNewWorkSpace) {
                flag = 1;
            }
            // 基本信息
            saveWorkFlow(workspaceId, flag, refreshStore);
            ifNewWorkSpace = false;
        }

        function saveService(refreshStore) {
            var flag = 0; // 0: insert, 1:update;
            if (!ifNewWorkSpace) {
                flag = 1;
            }
            // 基本信息
            saveDataService(workspaceId, flag, refreshStore);
            ifNewWorkSpace = false;
        }
        //成兵 20180914 成兵 根据工作流模式添加
        function saveMSG(refreshStore) {
            var flag = 0; // 0: insert, 1:update;
            if (!ifMSGSaved) {
                flag = 1;
            }
            var msgAddr = comlistMSG.getText();
            var wfData = storeMSG.data.items;
            var serviceId = '';
            var ifAddrExisted = false;
            if (msgStoreRecords) {
                for (var i = 0; i < msgStoreRecords.length; i++) {
                    if (msgStoreRecords[i].address == msgAddr) {
                        ifAddrExisted = true;
                        serviceId = msgStoreRecords[i].id;
                        comlistMSG.serviceId = serviceId;
                        break;
                    }
                }
            }
            // 地址不存在,就向服务地址表中增加一条记录
            if (!ifAddrExisted) {
                serviceId = vmd.util.guid();
                comlistMSG.serviceId = serviceId;
                addMSGAddr(serviceId, msgAddr);
            }
            // 如果地址已经存在，就向工区服务地址关系表中保存数据（插入或更新）  5 代表消息中心地址
            saveMSGAddr(workspaceId, serviceId, 5, msgAddr, refreshStore);
            ifMSGSaved = false;
        }
        // flag 0:insert, 1:update
        function saveDataInfo(id, flag, lastId, refreshStore) {
            // var myDate = new Date();
            // myDate.toLocaleString(); //获取日期与时间
            if (0 == flag) {
                var workspaceName = hwTextWorkSpaceName.getValue();
                if (workspaceName == null || workspaceName == undefined || workspaceName == '') {
                    workspaceName = "我的工区";
                }
                var workspaceAlias = hwTextWorkSpaceAlias.getValue();
                if (workspaceAlias === null || workspaceAlias === undefined || workspaceAlias === '') {
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
                        if (refreshStore) {
                            refreshStore(id);
                        }
                        Tips.tips("工区基本信息保存成功！", "success");
                        ifBaseInfoSaved = true; // 基本信息是否已保存
                    },
                    function(msg) {
                        Tips.tips("工区基本信息保存失败！", "error");
                    }
                );
            } else {
                // var workspaceNameNew = hwTextWorkSpaceName.getValue();
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
                        if (refreshStore) {
                            refreshStore();
                        }
                        Tips.tips("工区基本信息保存成功！", "success");
                    },
                    function(msg) {
                        Tips.tips("工区基本信息保存失败！", "error");
                    }
                );
            }
        }
        // id:工区id； flag：0，新建工区；1：更新工区；refreshStore：回调函数刷新数据集
        function saveWorkFlow(id, flag, refreshStore) {
            var workflowAddr = comlistWorkflowAddress.getText();
            var wfData = storeWorkflowList.data.items;
            var serviceId = '';
            var ifAddrExisted = false;
            if (workflowStoreRecords) {
                for (var i = 0; i < workflowStoreRecords.length; i++) {
                    if (workflowStoreRecords[i].address == workflowAddr) {
                        ifAddrExisted = true;
                        serviceId = workflowStoreRecords[i].id;
                        comlistWorkflowAddress.serviceId = serviceId;
                        break;
                    }
                }
            }
            // 地址不存在,就向服务地址表中增加一条记录
            if (!ifAddrExisted) {
                serviceId = vmd.util.guid();
                comlistWorkflowAddress.serviceId = serviceId;
                addWorkflowAddr(serviceId, workflowAddr);
            }
            // 如果地址已经存在，就向工区服务地址关系表中保存数据（插入或更新）
            saveWorkflowAddr(id, serviceId, 3, workflowAddr, refreshStore);
        }
        // 向服务地址表RESOURCE_SERVICEADDRESS中插入一条地址记录
        function saveWorkflowAddr(wsId, addrId, type, address, refreshStore) {
            var reg = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
            if (address != '' && !reg.test(address)) {
                Tips.tips("请输入标准工作流服务地址！", "error");
                return
            } else {
                hwDas.save(
                    "DataServiceWorkSpace/WorkSpaceInfo/WfDsAddr", {}, {}, [{
                        'workspaceid': wsId,
                        'addressid': addrId,
                        'type': type
                    }],
                    function(result) {
                        Tips.tips("工作流服务地址保存成功！", "success");
                        vmd.workspace.workflowIp = address;
                    },
                    function(msg) {
                        Tips.tips("工作流服务地址保存失败！", "error");
                    }
                )
            }
        }
        // 向服务地址表RESOURCE_SERVICEADDRESS中插入一条地址记录
        function addWorkflowAddr(id, address) {
            var reg = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
            if (address != '' && !reg.test(address)) {
                Tips.tips("请输入标准工作流服务地址！", "error");
                return
            } else {
                hwDas.add(
                    "DataServiceWorkSpace/WorkSpaceInfo/WfDsAddr", {}, {}, [{
                        'id': id,
                        'name': "工作流服务地址",
                        'addr': address,
                        'type': 3,
                        'remark': "工作流服务地址"
                    }],
                    function(result) {
                        Tips.tips("工作流服务地址保存成功！", "success");
                    },
                    function(msg) {
                        Tips.tips("工作流服务地址保存失败！", "error");
                    }
                )
            }
        }
        // 20180914  chengbing 根据工作流保存模式进行添加  
        function saveMSGAddr(wsId, addrId, type, address, refreshStore) {
            var reg = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
            if (address != '' && !reg.test(address)) {
                Tips.tips("请输入标准消息中心服务地址！", "error");
                return
            } else {
                hwDas.save(
                    "DataServiceWorkSpace/WorkSpaceInfo/WfDsAddr", {}, {}, [{
                        'workspaceid': wsId,
                        'addressid': addrId,
                        'type': type
                    }],
                    function(result) {
                        Tips.tips("消息中心服务地址保存成功！", "success");
                        vmd.workspace.workflowIp = address;
                    },
                    function(msg) {
                        Tips.tips("消息中心服务地址保存失败！", "error");
                    }
                )
            }
        }
        //20180914  chengbing 根据工作流保存模式进行添加  
        function addMSGAddr(id, address) {
            var reg = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
            if (address != '' && !reg.test(address)) {
                Tips.tips("请输入标准消息中心服务地址！", "error");
                return
            } else {
                hwDas.add(
                    "DataServiceWorkSpace/WorkSpaceInfo/WfDsAddr", {}, {}, [{
                        'id': id,
                        'name': "消息中心地址",
                        'addr': address,
                        'type': 5,
                        'remark': "消息中心地址"
                    }],
                    function(result) {
                        Tips.tips("消息中心地址保存成功！", "success");
                    },
                    function(msg) {
                        Tips.tips("消息中心地址保存失败！", "error");
                    }
                )
            }
        }

        function updateWorkflow(id, addr) {}

        function updateDataService(id, addr) {}

        function saveDataService(id, flag, refreshStore) {
            var dataserviceAddr = comlistDataServiceAddress.getText();
            var serviceId = '';
            var ifAddrExisted = false;
            if (dataserviceStoreRecords) {
                for (var i = 0; i < dataserviceStoreRecords.length; i++) {
                    if (dataserviceStoreRecords[i].address == dataserviceAddr) {
                        ifAddrExisted = true;
                        serviceId = dataserviceStoreRecords[i].id;
                        comlistDataServiceAddress.serviceId = serviceId;
                        break;
                    }
                }
            }
            // 地址不存在,就向服务地址表中增加一条记录
            if (!ifAddrExisted) {
                serviceId = vmd.util.guid();
                comlistDataServiceAddress.serviceId = serviceId;
                addDataServiceAddr(serviceId, dataserviceAddr);
            }
            // 如果地址已经存在，就向工区服务地址关系表中保存数据（插入或更新）
            saveDataServiceAddr(id, serviceId, 4, dataserviceAddr, refreshStore);
        }
        // 向服务地址表RESOURCE_SERVICEADDRESS中插入一条地址记录
        function saveDataServiceAddr(wsId, addrId, type, address, refreshStore) {
            var reg = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
            if (address != '' && !reg.test(address)) {
                Tips.tips("请输入标准的数据服务器地址！", "error");
                return
            } else {
                hwDas.save(
                    "DataServiceWorkSpace/WorkSpaceInfo/WfDsAddr", {}, {}, [{
                        'workspaceid': wsId,
                        'addressid': addrId,
                        'type': type
                    }],
                    function(result) {
                        Tips.tips("数据服务地址保存成功！", "success");
                    },
                    function(msg) {
                        Tips.tips("数据服务地址保存失败！", "error");
                    }
                )
            }
        }
        // 向服务地址表RESOURCE_SERVICEADDRESS中插入一条地址记录
        function addDataServiceAddr(id, address) {
            var reg = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
            if (address != '' && !reg.test(address)) {
                Tips.tips("请输入标准的数据服务器地址！", "error");
                return
            } else {
                hwDas.add(
                    "DataServiceWorkSpace/WorkSpaceInfo/WfDsAddr", {}, {}, [{
                        'id': id,
                        'name': "数据服务地址",
                        'addr': address,
                        'type': 4,
                        'remark': "数据服务地址"
                    }],
                    function(result) {
                        Tips.tips("数据服务地址保存成功！", "success");
                    },
                    function(msg) {
                        Tips.tips("数据服务地址保存失败！", "error");
                    }
                )
            }
        }
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
            panelMSG.ifDataLoaded = bVar;
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
            queryDataInfo();
        }

        function TabsWorkSpaceInfo_afterrender(sender) {}

        function TabWorkSpaceResource_beforerender(sender) {}

        function TabWorkSpaceInfo_beforerender(sender) {
            // console.log("第一层的TabWorkSpaceInfo_beforerender");
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
            var tabIndexMSG = tabId.indexOf("panelMSG"); // 基于0开始,找不到返回-1
            // 基本信息
            if (tabIndexInfo > -1) {
                queryDataInfo();
            } else if (tabIndexWorkFlow > -1) {
                queryWorkFlow();
            } else if (tabIndexDataService > -1) {
                queryDataService();
            } else if (tabIndexResource > -1) {
                TabWorkSpaceResource.iSetWorkSpaceId(workspaceId);
                TabWorkSpaceResource.iTabChangeResource();
            } else if (tabIndexMSG > -1) {
                queryMSG()
            }
        }

        function comlistWorkflowAddress_selectChanged(sender, combo, record, index) {
            comlistWorkflowAddress.serviceId = record.data.id;
        }

        function comlistDataServiceAddress_selectChanged(sender, combo, record, index) {
            comlistDataServiceAddress.serviceId = record.data.id;
        }

        function TabWorkSpaceInfo_afterrender(sender) {
            TabsWorkSpaceInfo.hideTabStripItem(3)
        }

        function comlistMSG_selectChanged(sender, combo, record, index) {
            comlistMSG.serviceId = record.data.id;
        }
        this.TabWorkSpaceInfo_afterrender = TabWorkSpaceInfo_afterrender;
        this.TabWorkSpaceInfo_beforerender = TabWorkSpaceInfo_beforerender;
        this.items = [{
            xtype: "tabpanel",
            id: "TabsWorkSpaceInfo",
            activeTab: 0,
            height: 420,
            width: 610,
            x: 0,
            y: 0,
            tabchange: "TabsWorkSpaceInfo_tabchange",
            afterrender: "TabsWorkSpaceInfo_afterrender",
            beforerender: "TabsWorkSpaceInfo_beforerender",
            listeners: {
                tabchange: TabsWorkSpaceInfo_tabchange,
                vmdafterrender: TabsWorkSpaceInfo_afterrender,
                beforerender: TabsWorkSpaceInfo_beforerender
            },
            items: [{
                    xtype: "panel",
                    id: "panelTabInfo",
                    title: "基本信息",
                    header: true,
                    border: false,
                    height: 384,
                    layout: "absolute",
                    width: 436,
                    afterrender: "panelTabInfo_afterrender",
                    listeners: {
                        vmdafterrender: panelTabInfo_afterrender
                    },
                    items: [{
                            xtype: "label",
                            id: "label",
                            text: "工区名称：",
                            x: 20,
                            y: 15
                        },
                        {
                            xtype: "textfield",
                            id: "hwTextWorkSpaceName",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 80,
                            y: 10,
                            width: 520
                        },
                        {
                            xtype: "textfield",
                            id: "hwTextCreatedTime",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 80,
                            y: 70,
                            width: 520,
                            readOnly: true
                        },
                        {
                            xtype: "label",
                            id: "label1",
                            text: "创建时间：",
                            x: 20,
                            y: 75
                        },
                        {
                            xtype: "label",
                            id: "label2",
                            text: "修改时间：",
                            x: 20,
                            y: 105
                        },
                        {
                            xtype: "textfield",
                            id: "hwTextModifiedTime",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 80,
                            y: 100,
                            width: 520,
                            readOnly: true
                        },
                        {
                            xtype: "label",
                            id: "label3",
                            text: "    说明：",
                            x: 43,
                            y: 130,
                            height: 20
                        },
                        {
                            xtype: "textarea",
                            id: "hwTextAreaWorkSpaceDescription",
                            allowBlank: true,
                            x: 80,
                            y: 130,
                            width: 520,
                            height: 90
                        },
                        {
                            xtype: "label",
                            id: "label6",
                            text: "工区别名：",
                            x: 20,
                            y: 45
                        },
                        {
                            xtype: "textfield",
                            id: "hwTextWorkSpaceAlias",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 80,
                            y: 40,
                            width: 520
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panelTabWorkflow",
                    title: "工作流",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "absolute",
                    afterrender: "panelTabWorkflow_afterrender",
                    listeners: {
                        vmdafterrender: panelTabWorkflow_afterrender
                    },
                    items: [{
                            xtype: "label",
                            id: "label4",
                            text: "工作流服务地址：",
                            x: 15,
                            y: 15
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "comlistWorkflowAddress",
                            width: 490,
                            height: 270,
                            x: 110,
                            y: 10,
                            editable: true,
                            selectChanged: "comlistWorkflowAddress_selectChanged",
                            listeners: {
                                selectChanged: comlistWorkflowAddress_selectChanged
                            },
                            store: this.storeWorkflow
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panelTabDataService",
                    title: "数据服务",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "absolute",
                    afterrender: "panelTabDataService_afterrender",
                    listeners: {
                        vmdafterrender: panelTabDataService_afterrender
                    },
                    items: [{
                            xtype: "label",
                            id: "label5",
                            text: "数据服务地址：",
                            x: 15,
                            y: 15
                        },
                        {
                            xtype: "vmd.comlist",
                            id: "comlistDataServiceAddress",
                            width: 500,
                            height: 270,
                            x: 100,
                            y: 10,
                            editable: true,
                            selectChanged: "comlistDataServiceAddress_selectChanged",
                            listeners: {
                                selectChanged: comlistDataServiceAddress_selectChanged
                            },
                            store: this.storeDataService
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panelTabResource",
                    title: "资源",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "absolute",
                    afterrender: "panelTabResource_afterrender",
                    listeners: {
                        vmdafterrender: panelTabResource_afterrender
                    },
                    items: [{
                        xtype: "vmd.ux.TabWorkSpaceResource",
                        id: "TabWorkSpaceResource",
                        layout: "absolute",
                        x: 0,
                        y: 0,
                        height: 380,
                        beforerender: "TabWorkSpaceResource_beforerender",
                        width: 610,
                        listeners: {
                            beforerender: TabWorkSpaceResource_beforerender
                        }
                    }]
                },
                {
                    xtype: "panel",
                    id: "panelMSG",
                    title: "消息中心",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "absolute",
                    items: [{
                            xtype: "vmd.comlist",
                            id: "comlistMSG",
                            width: 500,
                            height: 270,
                            x: 100,
                            y: 10,
                            editable: true,
                            selectChanged: "comlistMSG_selectChanged",
                            listeners: {
                                selectChanged: comlistMSG_selectChanged
                            },
                            store: this.storeMsg
                        },
                        {
                            xtype: "label",
                            id: "label7",
                            text: "消息中心地址：",
                            x: 15,
                            y: 15
                        }
                    ]
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.iSaveData = function(lastId, refreshStore) {
            //直接填写方法内容
            saveData(lastId, refreshStore);
        }
        this.iSetWorkSpaceId = function(id) {
            //直接填写方法内容
            workspaceId = id;
        }
        this.iSetDataStore = function(store) {
            //直接填写方法内容
            this.dataStore = store;
        }
        this.iGetWorkSpaceName = function() {
            //直接填写方法内容
            return hwTextWorkSpaceName.getValue();
        }
        this.iClearAll = function() {
            //直接填写方法内容
            clearAll();
        }
        this.iNewWorkSpace = function(id) {
            //直接填写方法内容
            newWorkSpace(id);
        }
        this.iQueryWorkSpaceInfo = function(id) {
            //直接填写方法内容
            queryWorkSpaceInfo(id);
        }
        this.iSetIfDataLoaded = function(bVar) {
            //直接填写方法内容
            setIfDataLoaded(bVar);
        }
        this.iChangeWorkSpace = function(id) {
            //直接填写方法内容
            changeWorkSpace(id);
        }
        this.isSaveFlow = function(callback) {
            //直接填写方法内容
            saveFlow(callback)
        }
        this.isSaveService = function(callback) {
            //直接填写方法内容
            saveService(callback)
        }
        this.iSetWorkflowStoreRecords = function(records) {
            //直接填写方法内容
            workflowStoreRecords = records;
        }
        this.iSetDataServiceStoreRecords = function(records) {
            //直接填写方法内容
            dataserviceStoreRecords = records;
        }
        this.isSaveMSG = function(callback) {
            //直接填写方法内容
            saveMSG(callback)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.TabWorkSpaceInfo");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TabWorkSpaceInfo");
    }
})