Ext.define("vmd.ux.TabProjectInfoNew0714" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.RegRelease$1.0$RegRelease","vmd.ux.TabWorkSpaceResource$1.0$TabWorkSpaceResource"]),
	version:"1.0",
	xtype:"vmd.ux.TabProjectInfoNew0714",
	title:"Panel",
	header:false,
	border:false,
	width:609,
	height:422,
	layout:"absolute",
	beforerender:"TabProjectInfoNew0714_beforerender",
	afterrender:"TabProjectInfoNew0714_afterrender",
	listeners:{
		beforerender:function(){
	this.TabProjectInfoNew0714_beforerender(this)
},
		vmdafterrender:function(){
	this.TabProjectInfoNew0714_afterrender(this)
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
var objInfoId = ""; // 项目ID
var workspaceId = ""; // 工区ID
var workflowAddress = ""; // 工作流服务地址
// var dataServiceAddress = ""; // 数据服务地址
var applyType = 1;
var login = Ext.util.Cookies.get('userName');

var storeWorkflow = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['label', 'value', 'checked']
});

var storeDataService = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['label', 'value', 'checked']
});

function TabsProjectInfo_tabchange(sender, tab) {

    var tabId = tab.id;
    var tabIndexInfo = tabId.indexOf("panelTabInfo"); // 基于0开始,找不到返回-1
    var tabIndexWorkFlow = tabId.indexOf("panelTabWorkflow"); // 基于0开始,找不到返回-1
    var tabIndexDataService = tabId.indexOf("panelTabDataService"); // 基于0开始,找不到返回-1
    var tabIndexResource = tabId.indexOf("panelTabResource"); // 基于0开始,找不到返回-1
    var tabIndexRegInfo = tabId.indexOf("panelRegInfo"); // 基于0开始,找不到返回-1

    // 基本信息
    if(tabIndexInfo > -1) {
        queryDataInfo();
    } else if(tabIndexWorkFlow > -1) {
        queryWorkFlow();
    } else if(tabIndexDataService > -1) {
        queryDataService();
    } else if(tabIndexResource > -1) {
        TabWorkSpaceResource.iSetWorkSpaceId(objInfoId);
    }
    //20180711 成兵增加对项目注册信息提取
    else if(tabIndexRegInfo > -1) {
        RegRelease.getRegInfo(objInfoId);
        panelRegInfo.ifDataLoaded=true;
    }
    // queryDataInfo();
    // queryWorkFlow();
    // queryDataService();
    // TabWorkSpaceResource.iSetWorkSpaceId(objInfoId);
}

function queryDataInfo() {

    // objInfoId = "18a7a702-1077-4b44-9e35-6e289da389d9";

    if(objInfoId === null || objInfoId === undefined || objInfoId === '') {
        return;
    }
    if(panelTabInfo.ifDataLoaded) {
        return;
    }
    hwDas.get(
        "DataServiceWorkSpace/projectInfo/ProjectBaseInfo", {}, {
            "projectid": objInfoId
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
                            hwTextProjectName.setValue(result.data[0].datas[0].project_name);
                            hwTextProjectAlias.setValue(result.data[0].datas[0].alias_short_name);
                            hwTextCreateBy.setValue(result.data[0].datas[0].row_created_by);
                            hwTextCreateTime.setValue(result.data[0].datas[0].row_created_date);
                            hwTextModifiedBy.setValue(result.data[0].datas[0].row_changed_by);
                            hwTextModifiedTime.setValue(result.data[0].datas[0].row_changed_date);
                            hwTextAreaProjectDescription.setValue(result.data[0].datas[0].description);
                        }
                    }
                }
            }

            panelTabInfo.ifDataLoaded = true;
            // Tips.tips("查询成功！", "success");
        },
        function(msg) {
            Tips.tips("查询失败！", "error");
            // Ext.Msg.alert("提示", "查询项目信息失败！");
        });
}

function queryWorkFlow() {
    // objInfoId = "326c3fa0-1e02-4402-b2c2-42659a50e0b0";

    if(objInfoId === null || objInfoId === undefined || objInfoId === '') {
        return;
    }
    if(panelTabWorkflow.ifDataLoaded) {
        return;
    }

    // workflowAddress = "www.hanweikeji.com:8004";
    // if("" != workspaceId) {
    //     hwDas.get(
    //         "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
    //             "workspaceid": workspaceId,
    //             "servicetype": 3
    //         },
    //         function(result) {
    //             // 根据获取的数据赋值基本信息Tab页
    //             if(null != result && undefined != result) {
    //                 if(null != result.data && undefined != result.data) {
    //                     if(result.data.length > 0) {
    //                         if(null != result.data[0].datas && undefined != result.data[0].datas) {
    //                             if(result.data[0].datas.length > 0) {
    //                                 workflowAddress = result.data[0].datas[0].address;
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //         function(msg) {
    //             // Ext.Msg.alert("提示", "查询工区信息失败！");
    //         });
    // }
    // workflowAddress = "www.hanweikeji.com:8004";
    //var urlService = "http://" + workflowAddress + "/activiti-rest/service/repository/categorys/root?info=kermit";
    var urlService = "http://" + (parent.vmd.workspace.workflowIp || vmdSettings.workflowIp) + "/activiti-rest/service/repository/categorys/root?info=kermit";

    // var info = "kermit";
    // urlService = "http://" + workflowAddress + "/activiti-rest/service/repository/categorys/root?info=" + info;

    // 获取根节点下的文件夹节点信息
    hwDas.ajax({
        url: urlService,
        type: 'get',
        params: {},
        success: function(result) {

            // 列表数据加载完成后，查询项目服务分类关系表（PROJECT_SERVICECATEGORY）
            // 获取选中的工作流，并设置节点选中
            hwDas.get(
                "DataServiceWorkSpace/projectInfo/ProjcetServiceCategory", {}, {
                    "projectid": objInfoId,
                    "type": 0
                },
                function(resultChecked) {
                    // 根据获取的数据赋值基本信息Tab页
                    if(null === resultChecked && undefined === resultChecked) {
                        return;
                    }

                    if(null != resultChecked.data && undefined != resultChecked.data) {
                        if(resultChecked.data.length > 0) {
                            // 获取数据后解析形成树形节点；
                            var arrDataTmp = [];
                            for(var i = 0; i < result.data.length; i++) {

                                var ifChecked = false;
                                if(null != resultChecked.data[0].datas && undefined != resultChecked.data[0].datas) {
                                    // SERVICE_CATEGORY_ID
                                    for(var j = 0; j < resultChecked.data[0].datas.length; j++) {
                                        if(result.data[i].id == resultChecked.data[0].datas[j].service_category_id) {
                                            ifChecked = true;
                                        }
                                    }
                                }
                                var objTmp = {
                                    label: result.data[i].name,
                                    value: result.data[i].id,
                                    checked: ifChecked
                                };
                                arrDataTmp.push(objTmp);
                            }
                            storeWorkflow.loadData(arrDataTmp);
                        }
                    }
                    // Tips.tips("查询成功！", "success");
                },
                function(msg) {
                    // 获取数据后解析形成树形节点；
                    var arrDataTmp = [];
                    for(var i = 0; i < result.data.length; i++) {
                        var objTmp = {
                            label: result.data[i].name,
                            value: result.data[i].id,
                            checked: false
                        };
                        arrDataTmp.push(objTmp);
                    }
                    storeWorkflow.loadData(arrDataTmp);
                    // Tips.tips("查询失败！", "error");
                });

            panelTabWorkflow.ifDataLoaded = true;
            // workflowChkgroup.panel.doLayout();

        },
        error: function(msg) {
            // Tips.tips("查询失败！", "error");
            // myMask.hide();
            // Ext.Msg.alert("提示", "获取模块信息失败", function() {})
        }
    });
}

function queryDataService() {
    // objInfoId = "20e05c41-96ab-46f7-aaa6-d9a177ee9323";

    if(objInfoId === null || objInfoId === undefined || objInfoId === '') {
        return;
    }
    if(panelTabDataService.ifDataLoaded) {
        return;
    }

    // dataServiceAddress = "www.hanweikeji.com:8050";
    // if("" != workspaceId) {
    //     hwDas.get(
    //         "DataServiceWorkSpace/WorkSpaceInfo/ServiceAddress", {}, {
    //             "workspaceid": workspaceId,
    //             "servicetype": 4
    //         },
    //         function(result) {
    //             // 根据获取的数据赋值基本信息Tab页
    //             if(null != result && undefined != result) {
    //                 if(null != result.data && undefined != result.data) {
    //                     if(result.data.length > 0) {
    //                         if(null != result.data[0].datas && undefined != result.data[0].datas) {
    //                             if(result.data[0].datas.length > 0) {
    //                                 dataServiceAddress = result.data[0].datas[0].address;
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //         function(msg) {
    //             // Ext.Msg.alert("提示", "查询工区信息失败！");
    //         });
    // }
    // dataServiceAddress = "www.hanweikeji.com:8050";

    // (vmd.workspace.workflowIp || vmdSettings.workflowIp)
    // var urlService = "http://" + (parent.vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp) + "/DataService/Service/Project";

    var urlparam = {
        host: parent.vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp,
        url: "DataService/Service/Project"

    }
    hwDas.get(urlparam, {}, {
            develop: "true"
        }, function(result) {

            // 列表数据加载完成后，查询项目服务分类关系表（PROJECT_SERVICECATEGORY）
            // 获取选中的数据服务，并设置节点选中
            hwDas.get(
                "DataServiceWorkSpace/projectInfo/ProjcetServiceCategory", {}, {
                    "projectid": objInfoId,
                    "type": 1
                },
                function(resultChecked) {
                    // 根据获取的数据赋值基本信息Tab页
                    if(null === resultChecked && undefined === resultChecked) {
                        return;
                    }

                    if(null != resultChecked.data && undefined != resultChecked.data) {
                        if(resultChecked.data.length > 0) {
                            // 获取数据后解析形成树形节点；
                            var arrDataTmp = [];
                            for(var j = 0; j < result.data.length; j++) {
                                for(var i = 0; i < result.data[j].datas.length; i++) {
                                    var ifChecked = false;
                                    if(null != resultChecked.data[0].datas && undefined != resultChecked.data[0].datas) {
                                        // SERVICE_CATEGORY_ID
                                        for(var k = 0; k < resultChecked.data[0].datas.length; k++) {
                                            if(result.data[j].datas[i].id == resultChecked.data[0].datas[k].service_category_id) {
                                                ifChecked = true;
                                            }
                                        }
                                    }
                                    var objTmp = {
                                        label: result.data[j].datas[i].name,
                                        value: result.data[j].datas[i].id,
                                        checked: ifChecked
                                    };
                                    arrDataTmp.push(objTmp);
                                }
                            }
                            storeDataService.loadData(arrDataTmp);
                        }
                    }
                    panelTabDataService.ifDataLoaded = true;
                    // Tips.tips("查询成功！", "success");
                },
                function(msg) {
                    // 获取数据后解析形成树形节点；
                    var arrDataTmp = [];
                    for(var i = 0; i < result.data.length; i++) {
                        var objTmp = {
                            label: result.data[i].name,
                            value: result.data[i].id,
                            checked: false
                        };
                        arrDataTmp.push(objTmp);
                    }
                    storeDataService.loadData(arrDataTmp);
                    // Tips.tips("查询失败！", "error");
                });

            // workflowChkgroup.panel.doLayout();
        },
        function(msg) {
            // Tips.tips("查询失败！", "error");
            // Ext.Msg.alert("提示", "数据服务信息获取失败！", function() {})
        })




    // hwDas.ajax({
    //     das: {
    //         idedas: true
    //     },
    //     //url: urlService,
    //      url: "DataService/Service/Project",
    //     type: 'get',
    //     timeout: 1000,
    //     params:
    //     success: function(result) {

    //         // 列表数据加载完成后，查询项目服务分类关系表（PROJECT_SERVICECATEGORY）
    //         // 获取选中的数据服务，并设置节点选中
    //         hwDas.get(
    //             "DataServiceWorkSpace/projectInfo/ProjcetServiceCategory", {}, {
    //                 "projectid": objInfoId,
    //                 "type": 1
    //             },
    //             function(resultChecked) {
    //                 // 根据获取的数据赋值基本信息Tab页
    //                 if(null === resultChecked && undefined === resultChecked) {
    //                     return;
    //                 }

    //                 if(null != resultChecked.data && undefined != resultChecked.data) {
    //                     if(resultChecked.data.length > 0) {
    //                         // 获取数据后解析形成树形节点；
    //                         var arrDataTmp = [];
    //                         for(var j = 0; j < result.data.length; j++) {
    //                             for(var i = 0; i < result.data[j].datas.length; i++) {
    //                                 var ifChecked = false;
    //                                 if(null != resultChecked.data[0].datas && undefined != resultChecked.data[0].datas) {
    //                                     // SERVICE_CATEGORY_ID
    //                                     for(var k = 0; k < resultChecked.data[0].datas.length; k++) {
    //                                         if(result.data[j].datas[i].id == resultChecked.data[0].datas[k].service_category_id) {
    //                                             ifChecked = true;
    //                                         }
    //                                     }
    //                                 }
    //                                 var objTmp = {
    //                                     label: result.data[j].datas[i].name,
    //                                     value: result.data[j].datas[i].id,
    //                                     checked: ifChecked
    //                                 };
    //                                 arrDataTmp.push(objTmp);
    //                             }
    //                         }
    //                         storeDataService.loadData(arrDataTmp);
    //                     }
    //                 }
    //                 panelTabDataService.ifDataLoaded = true;
    //                 // Tips.tips("查询成功！", "success");
    //             },
    //             function(msg) {
    //                 // 获取数据后解析形成树形节点；
    //                 var arrDataTmp = [];
    //                 for(var i = 0; i < result.data.length; i++) {
    //                     var objTmp = {
    //                         label: result.data[i].name,
    //                         value: result.data[i].id,
    //                         checked: false
    //                     };
    //                     arrDataTmp.push(objTmp);
    //                 }
    //                 storeDataService.loadData(arrDataTmp);
    //                 // Tips.tips("查询失败！", "error");
    //             });

    //         // workflowChkgroup.panel.doLayout();
    //     },
    //     error: function(msg) {
    //         // Tips.tips("查询失败！", "error");
    //         // Ext.Msg.alert("提示", "数据服务信息获取失败！", function() {})
    //     }
    // });
}

function saveData(callback) {
    var flag = 0; // 0: insert, 1:update;
    if(objInfoId !== null && objInfoId !== undefined && objInfoId !== '') {
        flag = 1;
    }

    if(0 === flag) {
        objInfoId = vmd.util.guid();
    }

    var tabId = TabsProjectInfo.activeTab.id;
    var tabIndexInfo = tabId.indexOf("panelTabInfo"); // 基于0开始,找不到返回-1
    var tabIndexWorkFlow = tabId.indexOf("panelTabWorkflow"); // 基于0开始,找不到返回-1
    var tabIndexDataService = tabId.indexOf("panelTabDataService"); // 基于0开始,找不到返回-1
    var tabIndexResource = tabId.indexOf("panelTabResource"); // 基于0开始,找不到返回-1
    var tabIndexRegInfo = tabId.indexOf("panelRegInfo"); // 基于0开始,找不到返回-1
    // 基本信息
    if(panelTabInfo.ifDataLoaded) {
        saveDataInfo(objInfoId, flag, callback);
    }
    if(panelTabWorkflow.ifDataLoaded) {
        saveWorkFlow(objInfoId, flag, callback);
    }
    if(panelTabDataService.ifDataLoaded) {
        saveDataService(objInfoId, flag, callback);
    }
    //20180711 成兵  增加对项目注册信息的保存
    if(panelRegInfo.ifDataLoaded)
    {
        saveRegInfo(objInfoId, flag, callback)
    }
    // if(tabIndexInfo > -1) {
    //     saveDataInfo(objInfoId, flag, callback);
    // } else if(tabIndexWorkFlow > -1) {
    //     saveWorkFlow(objInfoId, flag, callback);
    // } else if(tabIndexDataService > -1) {
    //     saveDataService(objInfoId, flag, callback);
    // }
}

// flag 0:insert, 1:update
function saveDataInfo(id, flag, callback) {

    var myDate = new Date();
    // myDate.toLocaleString(); //获取日期与时间

    var nameTmp = hwTextProjectName.getValue();
    var aliasTmp = hwTextProjectAlias.getValue();

    if(aliasTmp === null || aliasTmp === undefined || aliasTmp === '') {
        aliasTmp = nameTmp;
    }
    hwDas.edit(
        "DataServiceWorkSpace/projectInfo/ProjectBaseInfo", {}, {}, [{
            'projectid': id,
            'name': nameTmp,
            'aliasname': aliasTmp,
            'changedby': login,
            'changeddate': myDate.toLocaleString(),
            'description': hwTextAreaProjectDescription.getValue()
        }],
        function(result) {
            if(callback) {
                callback(0);
            }

            Tips.tips("保存成功", "success");
            // Ext.Msg.alert("提示", "保存项目信息成功！")
        },
        function(msg) {
            Tips.tips("保存失败", "error");
            // Ext.Msg.alert("提示", "保存项目信息失败！")
        }
    );
}

function saveWorkFlow(id, flag, callback) {
    // 先删除原来关联的工作流服务分类
    hwDas.del(
        "DataServiceWorkSpace/projectInfo/DelProjectServiceCategory", {}, {
            'projectid': id,
            'type': 0
        },
        function(result) {
            // 保存新选择的关联的工作流服务分类
            var arrData = [];
            if(workflowChkgroup.items) {
                for(var k = 0; k < workflowChkgroup.items.items.length; k++) {
                    if(workflowChkgroup.items.items[k].checked) {
                        var objWorkflow = {
                            'projectid': id,
                            'servicecategoryid': workflowChkgroup.items.items[k].inputValue,
                            'type': 0
                        };
                        arrData.push(objWorkflow);
                    }
                }
            }

            hwDas.add(
                "DataServiceWorkSpace/projectInfo/ProjcetServiceCategory", {}, {}, arrData,
                function(result) {
                    if(callback) {
                        callback(1);
                    }
                    Tips.tips("保存成功！", "success");
                },
                function(msg) {
                    Tips.tips("保存失败！", "error");
                }
            );
            // Tips.tips("删除成功！", "success");
        },
        function(msg) {
            // Tips.tips("删除失败！", "error");
        }
    );

}

function saveDataService(id, flag, callback) {

    // 先删除原来关联的数据服务分类
    hwDas.del(
        "DataServiceWorkSpace/projectInfo/DelProjectServiceCategory", {}, {
            'projectid': id,
            'type': 1
        },
        function(result) {

            // 保存新选择的关联的数据服务分类
            var arrData = [];
            for(var k = 0; k < chkGrpDataService.items.items.length; k++) {
                if(chkGrpDataService.items.items[k].checked) {
                    var objWorkflow = {
                        'projectid': id,
                        'servicecategoryid': chkGrpDataService.items.items[k].inputValue,
                        'type': 1
                    };
                    arrData.push(objWorkflow);
                }
            }

            hwDas.add(
                "DataServiceWorkSpace/projectInfo/ProjcetServiceCategory", {}, {}, arrData,
                function(result) {
                    if(callback) {
                        callback(2);
                    }
                    Tips.tips("保存成功！", "success");
                },
                function(msg) {
                    Tips.tips("保存失败！", "error");
                }
            );
            // Tips.tips("删除成功！", "success");
        },
        function(msg) {
            // Tips.tips("删除失败！", "error");
        }
    );
}

//20180711 成兵  增加对项目注册信息的保存
function saveRegInfo(id, flag, callback) 
{
    RegRelease.saveRegInfo(id,callback)
    
}
// function saveResource(objInfoId, flag) {
//     Tips.tips("保存成功！", "success");
// }

function TabWorkSpaceResource_afterrender(sender) {
    TabWorkSpaceResource.iSetApplyType(1);
}

function workflowChkgroup_afterrender(sender) {

}

function workflowChkgroup_beforerender(sender) {
    sender.store = storeWorkflow;
}

function chkGrpDataService_beforerender(sender) {
    sender.store = storeDataService;
}


// 设置数据是否已加载
function setIfDataLoaded(bVar) {

    panelTabInfo.ifDataLoaded = bVar;
    panelTabWorkflow.ifDataLoaded = bVar;
    panelTabDataService.ifDataLoaded = bVar;
    TabWorkSpaceResource.iSetIfDataLoaded(bVar);
}

// function workflowChkgroup_afterrender(sender) {

//     workflowAddress = "www.hanweikeji.com:8004";
//     // var urlService = "http://" + vmdSettings.workflowIp + "/activiti-rest/service/repository/categorys/root?info=kermit";
//     var urlService = "http://" + workflowAddress + "/activiti-rest/service/repository/categorys/root?info=kermit";
//     var einfo = Ext.util.Cookies.get('hwEcyLogin');
//     if(einfo && einfo != undefined && einfo != "undefined") {
//         urlService = "http://" + workflowAddress + "/activiti-rest/service/repository/categorys/root?einfo=" + einfo;
//     } else {
//         var info = Ext.util.Cookies.get('login');
//         if(!info || info == undefined || info == "undefined") {
//             info = "kermit";
//         }
//         urlService = "http://" + workflowAddress + "/activiti-rest/service/repository/categorys/root?info=" + info;
//     }

//     // 获取根节点下的文件夹节点信息
//     hwDas.ajax({
//         url: urlService,
//         type: 'get',
//         timeout: 1000,
//         params: {},
//         success: function(result) {
//             // 获取数据后解析形成树形节点；
//             var arrDataTmp = [];

//             for(var i = 0; i < result.data.length; i++) {

//                 // var checkbox = new Ext.form.Checkbox({
//                 //     boxLabel: result.data[i].name,
//                 //     name: result.data[i].id,
//                 //     checked: false
//                 // });
//                 // hwCheckboxGroupProjectWorkflow.items.add(checkbox);

//                 var _item=result.data[i];

//                 var objTmp = {
//                     label: result.data[i].name,
//                     value: result.data[i].id,
//                     checked: false
//                 };
//                 arrDataTmp.push(objTmp);
//             }
//             propStore.loadData(arrDataTmp);
//             // sender.panel.add(arrDataTmp);
//             // sender.panel.doLayout()
//             // hwCheckboxGroupProjectWorkflow.items = arrDataTmp;
//             // hwCheckboxGroupProjectWorkflow.doLayout();
//             // hwCheckboxGroupProjectWorkflow.render();
//             // hwCheckboxGroupProjectWorkflow.updateBox();

//             // 列表数据加载完成后，查询项目服务分类关系表（PROJECT_SERVICECATEGORY）
//             // 获取选中的工作流，并设置节点选中
//             // hwDas.get(
//             //     "DataServiceWorkSpace/projectInfo/ProjcetServiceCategory", {}, {
//             //         "projectid": objInfoId,
//             //         "type": 0
//             //     },
//             //     function(result) {
//             //         // 根据获取的数据赋值基本信息Tab页
//             //         if(null === result && undefined === result) {
//             //             return;
//             //         }

//             //         if(null != result.data && undefined != result.data) {
//             //             if(result.data.length > 0) {
//             //                 if(null != result.data[0].datas && undefined != result.data[0].datas) {
//             //                     // SERVICE_CATEGORY_ID
//             //                     for(var j = 0; j < result.data[0].datas.length; j++) {
//             //                         for(var k = 0; k < hwCheckboxGroupProjectWorkflow.items.length; k++) {
//             //                             if(hwCheckboxGroupProjectWorkflow.items[k].name ==
//             //                                 result.data[0].datas[i].service_category_id) {
//             //                                 hwCheckboxGroupProjectWorkflow.items[k].checked = true;
//             //                             }
//             //                         }
//             //                     }
//             //                 }
//             //             }
//             //         }
//             //         // Tips.tips("查询成功！", "success");
//             //     },
//             //     function(msg) {
//             //         Tips.tips("查询失败！", "error");
//             //     });
//         },
//         error: function(msg) {
//             Tips.tips("查询失败！", "error");
//             // myMask.hide();
//             // Ext.Msg.alert("提示", "获取模块信息失败", function() {})
//         }
//     });
// }

function TabProjectInfoNew0714_beforerender(sender) {
    panelTabInfo.ifDataLoaded = false;
    panelTabWorkflow.ifDataLoaded = false;
    panelTabDataService.ifDataLoaded = false;
    panelRegInfo.ifDataLoaded = false;
}

function TabProjectInfoNew0714_afterrender(sender) {
    TabWorkSpaceResource.iSetApplyType(1);
    TabWorkSpaceResource.iSetId(objInfoId);
}

function panelTabInfo_beforerender(sender) {

}

function TabWorkSpaceResource_beforerender(sender) {

}

function hwTextModifiedBy_beforerender(sender) {

}

function delService_click(sender, e) {
    Ext.Msg.confirm("提示!", "确定要删除数据服务?删除后不可恢复！！！", function(btn) {
        if(btn == "yes") {
            var arrData = [];
            for(var k = 0; k < chkGrpDataService.items.items.length; k++) {
                if(chkGrpDataService.items.items[k].checked) {
                    var objWorkflow = {
                        'projectid': objInfoId,
                        'servicecategoryid': chkGrpDataService.items.items[k].inputValue,
                        'type': 1
                    };
                    var objID = {
                        'id': chkGrpDataService.items.items[k].inputValue
                    }
                    arrData.push(objWorkflow);
                }
            }
            var urlparam = {
                host: vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp,
                url: "DataService/Service/Project"
            }
            arrData.forEach(function(item, index) {
                if(item.servicecategoryid == "104FPWq2wr" || item.servicecategoryid == "eQX5RdNjsW" || item.servicecategoryid == "TuKge8jDwF" || item.servicecategoryid == "Tv3hLjddZS") {
                    Ext.Msg.alert("提示", "程序数据服务不可删除，请重新选择需要删除的数据服务！");
                    return
                }
                hwDas.del(
                    urlparam, {}, {
                        'id': item.servicecategoryid
                    },
                    function(result) {
                        // 删除数据服务与项目的关联关系
                        hwDas.del(
                            "DataServiceWorkSpace/projectInfo/ProjcetServiceCategory", {}, item,
                            function(result) {
                                if(index == arrData.length - 1) {
                                    panelTabDataService.ifDataLoaded = false;
                                    Tips.tips("删除成功！", "success");
                                    queryDataService();
                                }
                            },
                            function(msg) {
                                Tips.tips("删除关联关系失败！", "error");
                            }
                        );
                        // Tips.tips("删除成功！", "success");
                    },
                    function(msg) {
                        Tips.tips("删除服务失败！", "error");
                    }
                );
            })
        }
    })
}

function addService_click(sender, e) {
    var addServe = function(code, name, remark) {
        var serviceCode = code;
        var serviceName = name;
        var serviceRemark = remark;

        var urlparam = {
            host: vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp,
            url: "DataService/Service/Project"
        }
        hwDas.add(
            urlparam, {}, {}, {
                code: serviceCode,
                name: serviceName,
                remark: serviceRemark
            },
            function(result) { // 保存成功
                // Tips.tips("保存成功！", "success");
                if(result == "") {
                    return;
                }
                if(!result.data) {
                    return;
                }

                if(result.data.length > 0) {
                    var serviceName = result.data[0].datas.name;
                    var serviceId = result.data[0].datas.id;
                    panelTabDataService.ifDataLoaded = false;
                    // 新建数据服务分类后，同步关联与项目的关系

                    var objData = {
                        'projectid': objInfoId,
                        'servicecategoryid': serviceId,
                        'type': 1
                    };
                    hwDas.add(
                        "DataServiceWorkSpace/projectInfo/ProjcetServiceCategory", {}, {}, objData,
                        function(result) {
                            queryDataService();
                        },
                        function(msg) {
                            // Tips.tips("保存失败！", "error");
                        }
                    );
                }
            },
            function(msg) {
                Ext.Msg.alert("提示", "添加服务失败！");
            }
        );

    }
    var winForm = new Ext.winDataService(addServe, "", "", "");
    winForm.show();
}
//数据服务录入框
Ext.winDataService = Ext.extend(Ext.Window, {
    xtype: "window",
    title: "数据服务",
    width: 300,
    height: 214,
    layout: "form",
    bodyStyle: 'padding:15px',
    labelAlign: "left",
    labelWidth: 40,
    modal: true,
    constructor: function(callback, code, name, remark) {
        this.callback = callback;
        this.valueCode = code;
        this.valueName = name;
        this.valueRemark = remark;
        this.callParent();
    },
    initComponent: function() {
        var me = this;
        this.fbar = [{
            text: "确定",
            handler: function() {
                me.callback(Ext.getCmp('code').getValue(), Ext.getCmp('name').getValue(), Ext.getCmp('remark').getValue());
                me.close();
            }
        }, {
            text: "取消",
            handler: function() {
                me.close();
            }
        }];

        this.items = [{
            id: 'code',
            xtype: "textfield",
            fieldLabel: "编码",
            anchor: "100%",
            value: this.valueCode
        }, {
            id: 'name',
            xtype: "textfield",
            fieldLabel: "名称",
            anchor: "100%",
            value: this.valueName
        }, {
            id: 'remark',
            xtype: "textfield",
            fieldLabel: "说明",
            anchor: "100%",
            value: this.valueRemark
        }]
        Ext.winDataService.superclass.initComponent.call(this);
    }
})

function button_click(sender,e){

    var formAddWsMembers = new parent.vmd.window({
        title: "添加项目成员",
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
        url: parent.vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwdHH9CSl6/hwDmMhbCOK.html",
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
        title: "角色管理",
        url: parent.vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hwdHH9CSl6/hwvasfOQqK.html",
        // url: vmd.core.getVirtualPath() + "/modules/eQ9ULgcVb1/hwipUwNjJb/hw4361c4dd.html",
        auto: false,
        height: 404,
        width: 624,
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
			this.TabProjectInfoNew0714_afterrender=TabProjectInfoNew0714_afterrender;
		this.TabProjectInfoNew0714_beforerender=TabProjectInfoNew0714_beforerender;
		this.items=[
			{
				xtype:"tabpanel",
				id:"TabsProjectInfo",
				activeTab:4,
				height:420,
				width:610,
				x:0,
				y:0,
				tabchange:"TabsProjectInfo_tabchange",
				listeners:{
					tabchange:TabsProjectInfo_tabchange
				},
				items:[
					{
						xtype:"panel",
						id:"panelTabInfo",
						title:"基本信息",
						header:true,
						border:true,
						height:270,
						layout:"absolute",
						width:436,
						beforerender:"panelTabInfo_beforerender",
						listeners:{
							beforerender:panelTabInfo_beforerender
						},
						items:[
							{
								xtype:"label",
								id:"label",
								text:"项目名称：",
								x:20,
								y:15,
								height:20
							},
							{
								xtype:"textfield",
								id:"hwTextProjectName",
								allowBlank:true,
								x:80,
								y:10,
								width:470,
								emptyText:"我的项目"
							},
							{
								xtype:"textfield",
								id:"hwTextCreateTime",
								allowBlank:true,
								x:80,
								y:100,
								width:470,
								readOnly:false,
								disabled:true
							},
							{
								xtype:"label",
								id:"label1",
								text:"创建时间：",
								x:20,
								y:105
							},
							{
								xtype:"label",
								id:"label2",
								text:"修改时间：",
								x:20,
								y:165
							},
							{
								xtype:"textfield",
								id:"hwTextModifiedTime",
								allowBlank:true,
								x:80,
								y:160,
								width:470,
								readOnly:false,
								disabled:true
							},
							{
								xtype:"label",
								id:"label3",
								text:"    说明：",
								x:43,
								y:190,
								height:20
							},
							{
								xtype:"textarea",
								id:"hwTextAreaProjectDescription",
								allowBlank:true,
								x:80,
								y:190,
								width:470,
								height:90
							},
							{
								xtype:"label",
								id:"label6",
								text:"创建人：",
								x:32,
								y:75,
								height:16
							},
							{
								xtype:"label",
								id:"label7",
								text:"修改人：",
								x:32,
								y:135
							},
							{
								xtype:"textfield",
								id:"hwTextCreateBy",
								allowBlank:true,
								x:80,
								y:70,
								width:470,
								readOnly:false,
								disabled:true
							},
							{
								xtype:"textfield",
								id:"hwTextModifiedBy",
								allowBlank:true,
								x:80,
								y:130,
								width:470,
								beforerender:"hwTextModifiedBy_beforerender",
								readOnly:false,
								disabled:true,
								listeners:{
									beforerender:hwTextModifiedBy_beforerender
								}
							},
							{
								xtype:"label",
								id:"label4",
								text:"项目别名：",
								x:20,
								y:45,
								height:20
							},
							{
								xtype:"textfield",
								id:"hwTextProjectAlias",
								allowBlank:true,
								x:80,
								y:40,
								width:470
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
						items:[
							{
								xtype:"checkboxstoregroup",
								id:"workflowChkgroup",
								width:600,
								height:390,
								labelField:"label",
								valueField:"value",
								checkedField:"checked",
								boxFieldName:"mycheckbox",
								x:10,
								y:0,
								vertical:true,
								columns:1,
								afterrender:"workflowChkgroup_afterrender",
								beforerender:"workflowChkgroup_beforerender",
								autoScroll:true,
								listeners:{
									vmdafterrender:workflowChkgroup_afterrender,
									beforerender:workflowChkgroup_beforerender
								}
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
						items:[
							{
								xtype:"vmd.div",
								id:"div",
								autoEl:"div",
								border:true,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:609,
								height:35,
								autoWidth:false,
								autoHeight:false,
								layout:"auto",
								items:[
									{
										xtype:"vmd.button",
										id:"delService",
										text:"删除",
										type:"text",
										size:"small",
										icon:"icon-minus",
										style:"position: relative;    margin-right: 20px;    float: right;    top: 4px;",
										click:"delService_click",
										listeners:{
											click:delService_click
										}
									},
									{
										xtype:"vmd.button",
										id:"addService",
										text:"添加",
										type:"text",
										size:"small",
										style:"position: relative;    margin-right: 20px;    float: right;    top: 4px;",
										icon:" icon-plus",
										click:"addService_click",
										listeners:{
											click:addService_click
										}
									}
								]
							},
							{
								xtype:"checkboxstoregroup",
								id:"chkGrpDataService",
								width:595,
								height:355,
								labelField:"label",
								valueField:"value",
								checkedField:"checked",
								boxFieldName:"mycheckbox",
								vertical:false,
								columns:2,
								beforerender:"chkGrpDataService_beforerender",
								x:15,
								y:40,
								autoScroll:true,
								listeners:{
									beforerender:chkGrpDataService_beforerender
								}
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
						items:[
							{
								xtype:"vmd.ux.TabWorkSpaceResource",
								id:"TabWorkSpaceResource",
								layout:"absolute",
								x:0,
								y:0,
								afterrender:"TabWorkSpaceResource_afterrender",
								beforerender:"TabWorkSpaceResource_beforerender",
								listeners:{
									vmdafterrender:TabWorkSpaceResource_afterrender,
									beforerender:TabWorkSpaceResource_beforerender
								}
							}
						]
					},
					{
						xtype:"panel",
						id:"panel",
						title:"项目成员",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						items:[
							{
								xtype:"grid",
								id:"MyGrid",
								title:"Grid Panel",
								loadMask:true,
								x:0,
								y:30,
								height:360,
								hideHeaders:false,
								header:false,
								columns:[
									{
										xtype:"gridcolumn",
										header:"序号",
										sortable:true,
										resizable:true,
										dataIndex:"data1",
										width:40
									},
									{
										xtype:"gridcolumn",
										header:"成员名",
										sortable:true,
										resizable:true,
										dataIndex:"data2",
										width:180,
										align:"center"
									},
									{
										xtype:"gridcolumn",
										header:"所属部门",
										sortable:true,
										resizable:true,
										dataIndex:"data3",
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
								x:360,
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
								x:410,
								y:0,
								icon:"icon-minus"
							},
							{
								xtype:"vmd.button",
								id:"button2",
								text:"成员角色",
								type:"text",
								size:"small",
								x:460,
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
								x:530,
								y:0,
								icon:"icon-key",
								click:"button3_click",
								listeners:{
									click:button3_click
								}
							}
						]
					},
					{
						xtype:"panel",
						id:"panelRegInfo",
						title:"发布注册信息",
						header:true,
						border:true,
						height:100,
						layout:"fit",
						items:[
							{
								xtype:"vmd.ux.RegRelease",
								id:"RegRelease",
								layout:"border"
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
			this.iSaveData= function(callback){
//直接填写方法内容
saveData(callback);
	}
		this.iSetId= function(id){
//直接填写方法内容
objInfoId = id;
	}
		this.iGetName= function(){
//直接填写方法内容
return hwTextProjectName.getValue();
	}
		this.iSetIfDataLoaded= function(bVar){
//直接填写方法内容
setIfDataLoaded(bVar);
	}
		this.iSetWorkSpaceId= function(id){
//直接填写方法内容
workspaceId = id;
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.TabProjectInfoNew0714");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.TabProjectInfoNew0714");
	}
})