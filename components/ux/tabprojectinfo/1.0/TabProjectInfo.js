Ext.define('vmd.ux.tabProjectInfo.Controller', {
    xtype: 'vmd.ux.tabProjectInfo.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.TabProjectInfo", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.TabProjectInfo",
    title: "Panel",
    header: false,
    border: false,
    width: 609,
    height: 422,
    layout: "fit",
    beforerender: "TabProjectInfo_beforerender",
    afterrender: "TabProjectInfo_afterrender",
    style: "font-size: 14px",
    listeners: {
        beforerender: function() {
            this.TabProjectInfo_beforerender(this)
        },
        vmdafterrender: function() {
            this.TabProjectInfo_afterrender(this)
        }
    },
    uxCss: ".restree .vmd-tree-node{font-size:14px;}",
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
        var projectId = vmd.getUrlParam("id");
        var objInfoId = ""; // 项目ID
        var workspaceId = ""; // 工区ID
        var workflowAddress = ""; // 工作流服务地址
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
            // 基本信息
            if (tabIndexInfo > -1) {
                queryDataInfo();
            } else if (tabIndexWorkFlow > -1) {
                queryWorkFlow();
            } else if (tabIndexDataService > -1) {
                queryDataService();
            }
        }

        function queryDataInfo() {
            if (objInfoId === null || objInfoId === undefined || objInfoId === '') {
                return;
            }
            if (panelTabInfo.ifDataLoaded) {
                return;
            }
            hwDas.get(
                "DataServiceWorkSpace/projectInfo/ProjectBaseInfo", {}, {
                    "projectid": objInfoId
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
            if (objInfoId === null || objInfoId === undefined || objInfoId === '') {
                return;
            }
            if (panelTabWorkflow.ifDataLoaded) {
                return;
            }
            var urlService = "http://" + (parent.vmd.workspace.workflowIp || vmdSettings.workflowIp) + "/activiti-rest/service/repository/categorys/root?info=kermit&size=100";
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
                            if (null === resultChecked && undefined === resultChecked) {
                                return;
                            }
                            if (null != resultChecked.data && undefined != resultChecked.data) {
                                if (resultChecked.data.length > 0) {
                                    // 获取数据后解析形成树形节点；
                                    var arrDataTmp = [];
                                    for (var i = 0; i < result.data.length; i++) {
                                        var ifChecked = false;
                                        if (null != resultChecked.data[0].datas && undefined != resultChecked.data[0].datas) {
                                            // SERVICE_CATEGORY_ID
                                            for (var j = 0; j < resultChecked.data[0].datas.length; j++) {
                                                if (result.data[i].id == resultChecked.data[0].datas[j].service_category_id) {
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
                            for (var i = 0; i < result.data.length; i++) {
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
            if (objInfoId === null || objInfoId === undefined || objInfoId === '') {
                return;
            }
            if (panelTabDataService.ifDataLoaded) {
                return;
            }
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
                            if (null === resultChecked && undefined === resultChecked) {
                                return;
                            }
                            if (null != resultChecked.data && undefined != resultChecked.data) {
                                if (resultChecked.data.length > 0) {
                                    // 获取数据后解析形成树形节点；
                                    var arrDataTmp = [];
                                    for (var j = 0; j < result.data.length; j++) {
                                        for (var i = 0; i < result.data[j].datas.length; i++) {
                                            var ifChecked = false;
                                            if (null != resultChecked.data[0].datas && undefined != resultChecked.data[0].datas) {
                                                // SERVICE_CATEGORY_ID
                                                for (var k = 0; k < resultChecked.data[0].datas.length; k++) {
                                                    if (result.data[j].datas[i].id == resultChecked.data[0].datas[k].service_category_id) {
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
                            for (var i = 0; i < result.data.length; i++) {
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
        }

        function saveData(callback) {
            var flag = 0; // 0: insert, 1:update;
            if (objInfoId !== null && objInfoId !== undefined && objInfoId !== '') {
                flag = 1;
            }
            if (0 === flag) {
                objInfoId = vmd.util.guid();
            }
            var tabId = TabsProjectInfo.activeTab.id;
            var tabIndexInfo = tabId.indexOf("panelTabInfo"); // 基于0开始,找不到返回-1
            var tabIndexWorkFlow = tabId.indexOf("panelTabWorkflow"); // 基于0开始,找不到返回-1
            var tabIndexDataService = tabId.indexOf("panelTabDataService"); // 基于0开始,找不到返回-1
            var tabIndexResource = tabId.indexOf("panelTabResource"); // 基于0开始,找不到返回-1
            // 基本信息
            if (panelTabInfo.ifDataLoaded) {
                saveDataInfo(objInfoId, flag, callback);
            }
            if (panelTabWorkflow.ifDataLoaded) {
                saveWorkFlow(objInfoId, flag, callback);
            }
            if (panelTabDataService.ifDataLoaded) {
                saveDataService(objInfoId, flag, callback);
            }
            if (tree.rendered) {
                saveProjectResource()
            }
        }
        // flag 0:insert, 1:update
        function saveDataInfo(id, flag, callback) {
            var myDate = new Date();
            // myDate.toLocaleString(); //获取日期与时间
            var nameTmp = hwTextProjectName.getValue();
            var aliasTmp = hwTextProjectAlias.getValue();
            if (aliasTmp === null || aliasTmp === undefined || aliasTmp === '') {
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
                    if (callback) {
                        callback(0);
                    }
                    Tips.tips("保存成功", "success");
                },
                function(msg) {
                    Tips.tips("保存失败", "error");
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
                    if (workflowChkgroup.items) {
                        for (var k = 0; k < workflowChkgroup.items.items.length; k++) {
                            if (workflowChkgroup.items.items[k].checked) {
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
                            if (callback) {
                                callback(1);
                            }
                            Tips.tips("保存成功！", "success");
                        },
                        function(msg) {
                            Tips.tips("保存失败！", "error");
                        }
                    );
                },
                function(msg) {
                    console.log(msg)
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
                    for (var k = 0; k < chkGrpDataService.items.items.length; k++) {
                        if (chkGrpDataService.items.items[k].checked) {
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
                            if (callback) {
                                callback(2);
                            }
                            Tips.tips("保存成功！", "success");
                        },
                        function(msg) {
                            Tips.tips("保存失败！", "error");
                        }
                    );
                },
                function(msg) {
                    console.log(msg)
                }
            );
        }

        function saveProjectResource() {
            if (!projectId)
                return;
            hwDas.del("CDEServcie/project/getproresource", {}, {
                projectid: projectId
            }, function(result) {
                hwDas.save("CDEServcie/project/getproresource", {}, {
                    projectid: projectId
                }, treestroe.getJson(), function(result) {
                    Tips.tips("保存成功！", "success");
                }, function(msg) {
                    Tips.tips("保存失败！", "error");
                })
            }, function(msg) {
                Tips.tips("保存失败！", "error");
            })
        }

        function workflowChkgroup_afterrender(sender) {}

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
        }

        function TabProjectInfo_beforerender(sender) {
            panelTabInfo.ifDataLoaded = false;
            panelTabWorkflow.ifDataLoaded = false;
            panelTabDataService.ifDataLoaded = false;
        }

        function TabProjectInfo_afterrender(sender) {}

        function panelTabInfo_beforerender(sender) {}

        function hwTextModifiedBy_beforerender(sender) {}

        function delService_click(sender, e) {
            Ext.Msg.confirm("提示!", "确定要删除数据服务?删除后不可恢复！！！", function(btn) {
                if (btn == "yes") {
                    var arrData = [];
                    for (var k = 0; k < chkGrpDataService.items.items.length; k++) {
                        if (chkGrpDataService.items.items[k].checked) {
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
                        if (item.servicecategoryid == "104FPWq2wr" || item.servicecategoryid == "eQX5RdNjsW" || item.servicecategoryid == "TuKge8jDwF" || item.servicecategoryid == "Tv3hLjddZS") {
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
                                        if (index == arrData.length - 1) {
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
                    function(result) {
                        if (result == "") {
                            return;
                        }
                        if (!result.data) {
                            return;
                        }
                        if (result.data.length > 0) {
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
                                    console.log(msg)
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

        function TabsProjectInfo_afterrender(sender) {}

        function button_click(sender, e) {
            res_menu.showAt(e.xy)
        }

        function AddResourceMenu() {
            function _getVirtualPath(ip, path) {
                return "http://" + ip + "/" + path + "/";
            };
            vmd.core.getModuleResourceServices(objInfoId, function(data) {
                var resmenudata = [];
                var serverList = data || [];
                res_menu.removeAll();
                serverList.forEach(function(item, index) {
                    var getServerList = function() {
                        var list = [];
                        var serverInfo = item.children;
                        if (serverInfo) {
                            serverInfo.forEach(function(_item) {
                                var obj = {
                                    text: _item.name,
                                    name: _item.name,
                                    resName: item.name,
                                    resId: item.id,
                                    servId: _item.id,
                                    virtualPath: _getVirtualPath(_item.address, _item.virtualPath),
                                    id: item.id + _item.id,
                                    iconCls: 'ion-server'
                                }
                                list.push(obj);
                            })
                        }
                        return list;
                    }
                    var obj = {
                        text: item.name,
                        name: item.name,
                        virtualPath: _getVirtualPath(item.address, item.virtualPath),
                        id: item.id,
                        iconCls: 'ion-res',
                        menu: new Ext.menu.Menu({
                            items: getServerList(),
                            listeners: {
                                click: function(menu, item, e) {
                                    itemclick(menu, item, e)
                                }
                            }
                        })
                    }
                    resmenudata.push(obj);
                })
                res_menu.add(resmenudata);
                res_menu.doLayout();
                var itemclick = function(menu, item, e) {
                    var win = new parent.vmd.window({
                        url: vmdSettings.resourcePath + "?serviceid=" + item.servId + "&resourceid=" + item.resId + "&servername=" + item.name,
                        title: '<span style="color:blue">' + item.name + '</span>——文件选择（温馨提示：shift多选资源，只支持js、css、图片的选择）',
                        auto: true,
                        enableLoading: true,
                        offset: [100, 100],
                        fbar: [{
                            text: '确定',
                            handler: function() {
                                var selectFiles = Ext.decode(win.postdata);
                                if (!selectFiles || (Ext.isArray(selectFiles) && selectFiles.length == 0)) {
                                    win.close();
                                    return;
                                }
                                //梳理进行分组调用资源树接口进行添加
                                var _cssData = [],
                                    _jsData = [],
                                    _imgData = [];
                                selectFiles.forEach(function(data) {
                                    var ext = data.ext;
                                    var serName = data.servName;
                                    var resName = item.resName;
                                    var path = data.path;
                                    var absolutePath = data.ip + "/" + path;
                                    var obj = {
                                        id: serName + "/" + path,
                                        servName: resName + "&&" + serName,
                                        path: path,
                                        absolutePath: absolutePath,
                                        ext: data.ext
                                    };
                                    var node = tree.getNodeById(obj.id);
                                    if (node) return false;
                                    var type;
                                    if (ext == 'js') {
                                        tree.addNode("cate_js", obj.id, path, true)
                                        type = 2
                                    } else if (ext == 'css') {
                                        tree.addNode("cate_css", obj.id, path, true)
                                        type = 0
                                    }
                                    //将添加的资源添加到树对应的数据集中，用于保存使用
                                    var records = vmd.data.Record.create({
                                        'project_id': projectId,
                                        'xh': 5,
                                        'resource_id': vmd.getGuid(),
                                        'path': obj.path,
                                        'type': type,
                                        'resource_server_id': serName,
                                        'resource_server_name': obj.servName,
                                        'resource_server_ip': data.ip
                                    });
                                    treestroe.add(records)
                                    //重新排序，根据树中节点顺序排序
                                    resetxh()
                                })
                                win.close();
                            }
                        }, {
                            text: '取消',
                            handler: function() {
                                win.close()
                            }
                        }]
                    })
                    parent.proResSelWin = win
                    parent.proResSelWin.show();
                    parent.postdata = null;
                    parent.addEventListener('message', function(messageEvent) {
                        var data = messageEvent.data;
                        win.postdata = data;
                    }, false);
                }
            }, function() {
                vmd.tip('资源加载失败！', 'error');
            }, true)
        }

        function hwMenu_afterrender(sender) {
            AddResourceMenu()
        }
        var treestroe = new vmd.data.Store({
            data: [],
            fields: ['project_id', 'xh', 'resource_id', 'path', 'type', 'resource_server_id', 'resource_server_name', 'resource_server_ip']
        })

        function tree_afterrender(sender) {
            var rootNode = tree.getRootNode()
            tree.addNode(rootNode.id, "cate_js", "js", false)
            tree.addNode(rootNode.id, "cate_css", "css", false)
            hwDas.get("CDEServcie/project/getproresource", {}, {
                projectid: projectId
            }, function(result) {
                var res_list = result.data[0].datas
                var storeList = [];
                res_list.forEach(function(item, index) {
                    if ((item.type == "0" || item.type == "2") && item.xh) storeList.push(item)
                    if (item.type == "0")
                        tree.addNode("cate_css", item.resource_server_id + "/" + item.path, item.path, true)
                    if (item.type == "2")
                        tree.addNode("cate_js", item.resource_server_id + "/" + item.path, item.path, true)
                })
                treestroe.loadData(storeList)
                //展开节点
                tree.expandAll()
            }, function() {})
        }

        function button2_click(sender, e) {
            var node = tree.getSelNode()
            if (node.id == "cate_css" || node.id == "cate_js")
                return
            if (!node.previousSibling)
                return
            var cnode = tree.nodeCopy(node);
            node.parentNode.insertBefore(cnode, node.previousSibling)
            node.remove()
            cnode.select()
            resetxh()
        }

        function button3_click(sender, e) {
            var node = tree.getSelNode()
            if (node.id == "cate_css" || node.id == "cate_js")
                return
            if (!node.nextSibling)
                return
            var cnode = tree.nodeCopy(node);
            var nnode = node.nextSibling
            if (nnode && node.nextSibling) {
                node.parentNode.insertBefore(cnode, nnode.nextSibling)
            } else if (nnode) {
                node.parentNode.insertBefore(cnode)
            }
            node.remove()
            cnode.select()
            resetxh()
        }

        function button1_click(sender, e) {
            var node = tree.getSelNode()
            if (node.id == "cate_css" || node.id == "cate_js")
                return
            treestroe.each(function(record) {
                if (record.get("resource_server_id") + "/" + record.get("path") == node.id) {
                    treestroe.remove(record)
                }
            })
            node.remove()
            resetxh()
        }
        //重置序号
        function resetxh() {
            var cssnode = tree.getNodeById("cate_css")
            var xh = 1;
            cssnode.childNodes.forEach(function(item, index) {
                treestroe.each(function(record) {
                    if (record.get("resource_server_id") + "/" + record.get("path") == item.id) {
                        record.set("xh", xh)
                        xh++
                    }
                })
            })
            var jsnode = tree.getNodeById("cate_js")
            var xh = 1;
            jsnode.childNodes.forEach(function(item, index) {
                treestroe.each(function(record) {
                    if (record.get("resource_server_id") + "/" + record.get("path") == item.id) {
                        record.set("xh", xh)
                        xh++
                    }
                })
            })
        }
        this.TabProjectInfo_afterrender = TabProjectInfo_afterrender;
        this.TabProjectInfo_beforerender = TabProjectInfo_beforerender;
        this.items = [{
                xtype: "tabpanel",
                id: "TabsProjectInfo",
                activeTab: 0,
                height: 420,
                width: 610,
                x: 0,
                y: 0,
                tabchange: "TabsProjectInfo_tabchange",
                afterrender: "TabsProjectInfo_afterrender",
                listeners: {
                    tabchange: TabsProjectInfo_tabchange,
                    vmdafterrender: TabsProjectInfo_afterrender
                },
                items: [{
                        xtype: "panel",
                        id: "panelTabInfo",
                        title: "基本信息",
                        header: true,
                        border: true,
                        height: 270,
                        layout: "absolute",
                        width: 436,
                        beforerender: "panelTabInfo_beforerender",
                        listeners: {
                            beforerender: panelTabInfo_beforerender
                        },
                        items: [{
                                xtype: "label",
                                id: "label",
                                text: "项目名称：",
                                x: 20,
                                y: 15,
                                height: 20
                            },
                            {
                                xtype: "textfield",
                                id: "hwTextProjectName",
                                allowBlank: true,
                                enableKeyEvents: true,
                                x: 90,
                                y: 10,
                                width: 470,
                                emptyText: "我的项目"
                            },
                            {
                                xtype: "textfield",
                                id: "hwTextCreateTime",
                                allowBlank: true,
                                enableKeyEvents: true,
                                x: 90,
                                y: 100,
                                width: 470,
                                readOnly: false,
                                disabled: true
                            },
                            {
                                xtype: "label",
                                id: "label1",
                                text: "创建时间：",
                                x: 20,
                                y: 105
                            },
                            {
                                xtype: "label",
                                id: "label2",
                                text: "修改时间：",
                                x: 20,
                                y: 165
                            },
                            {
                                xtype: "textfield",
                                id: "hwTextModifiedTime",
                                allowBlank: true,
                                enableKeyEvents: true,
                                x: 90,
                                y: 160,
                                width: 470,
                                readOnly: false,
                                disabled: true
                            },
                            {
                                xtype: "label",
                                id: "label3",
                                text: "    说明：",
                                x: 43,
                                y: 190,
                                height: 20
                            },
                            {
                                xtype: "textarea",
                                id: "hwTextAreaProjectDescription",
                                allowBlank: true,
                                x: 90,
                                y: 190,
                                width: 470,
                                height: 90
                            },
                            {
                                xtype: "label",
                                id: "label6",
                                text: "创建人：",
                                x: 32,
                                y: 75,
                                height: 16
                            },
                            {
                                xtype: "label",
                                id: "label7",
                                text: "修改人：",
                                x: 32,
                                y: 135
                            },
                            {
                                xtype: "textfield",
                                id: "hwTextCreateBy",
                                allowBlank: true,
                                enableKeyEvents: true,
                                x: 90,
                                y: 70,
                                width: 470,
                                readOnly: false,
                                disabled: true
                            },
                            {
                                xtype: "textfield",
                                id: "hwTextModifiedBy",
                                allowBlank: true,
                                enableKeyEvents: true,
                                x: 90,
                                y: 130,
                                width: 470,
                                beforerender: "hwTextModifiedBy_beforerender",
                                readOnly: false,
                                disabled: true,
                                listeners: {
                                    beforerender: hwTextModifiedBy_beforerender
                                }
                            },
                            {
                                xtype: "label",
                                id: "label4",
                                text: "项目别名：",
                                x: 20,
                                y: 45,
                                height: 20
                            },
                            {
                                xtype: "textfield",
                                id: "hwTextProjectAlias",
                                allowBlank: true,
                                enableKeyEvents: true,
                                x: 90,
                                y: 40,
                                width: 470
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
                        layout: "fit",
                        items: [{
                            xtype: "checkboxstoregroup",
                            id: "workflowChkgroup",
                            width: 600,
                            height: 390,
                            labelField: "label",
                            valueField: "value",
                            checkedField: "checked",
                            boxFieldName: "mycheckbox",
                            x: 10,
                            y: 0,
                            vertical: true,
                            columns: 2,
                            afterrender: "workflowChkgroup_afterrender",
                            beforerender: "workflowChkgroup_beforerender",
                            autoScroll: true,
                            listeners: {
                                vmdafterrender: workflowChkgroup_afterrender,
                                beforerender: workflowChkgroup_beforerender
                            }
                        }]
                    },
                    {
                        xtype: "panel",
                        id: "panelTabDataService",
                        title: "数据服务",
                        header: true,
                        border: true,
                        height: 100,
                        layout: "border",
                        items: [{
                                xtype: "vmd.div",
                                id: "div",
                                autoEl: "div",
                                border: true,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 609,
                                height: 35,
                                autoWidth: false,
                                autoHeight: false,
                                layout: "auto",
                                region: "north",
                                items: [{
                                        xtype: "vmd.button",
                                        id: "delService",
                                        text: "删除",
                                        type: "text",
                                        size: "small",
                                        icon: "icon-minus",
                                        style: "position: relative;    margin-right: 20px;    float: right;    top: 4px;    font-size: 14px;",
                                        click: "delService_click",
                                        listeners: {
                                            click: delService_click
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "addService",
                                        text: "添加",
                                        type: "text",
                                        size: "small",
                                        style: "position: relative;    margin-right: 20px;    float: right;    top: 4px;    font-size: 14px;",
                                        icon: " icon-plus",
                                        click: "addService_click",
                                        listeners: {
                                            click: addService_click
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: "checkboxstoregroup",
                                id: "chkGrpDataService",
                                width: 595,
                                height: 355,
                                labelField: "label",
                                valueField: "value",
                                checkedField: "checked",
                                boxFieldName: "mycheckbox",
                                vertical: false,
                                columns: 3,
                                beforerender: "chkGrpDataService_beforerender",
                                x: 15,
                                y: 40,
                                autoScroll: true,
                                region: "center",
                                listeners: {
                                    beforerender: chkGrpDataService_beforerender
                                }
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
                        layout: "border",
                        disabled: false,
                        items: [{
                                xtype: "vmd.div",
                                id: "div1",
                                autoEl: "div",
                                border: true,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 400,
                                height: 38,
                                region: "north",
                                layout: "absolute",
                                items: [{
                                        xtype: "vmd.button",
                                        id: "button",
                                        text: "资源选择",
                                        type: "text",
                                        size: "small",
                                        x: 10,
                                        y: 5,
                                        icon: "icon-plus",
                                        click: "button_click",
                                        style: "font-size: 14px;",
                                        listeners: {
                                            click: button_click
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "button1",
                                        text: "删除",
                                        type: "text",
                                        size: "small",
                                        x: 90,
                                        y: 5,
                                        icon: "icon-minus",
                                        click: "button1_click",
                                        style: "font-size: 14px;",
                                        listeners: {
                                            click: button1_click
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "button2",
                                        text: "上移",
                                        type: "text",
                                        size: "small",
                                        x: 150,
                                        y: 5,
                                        icon: "icon-arrow-up",
                                        click: "button2_click",
                                        style: "font-size: 14px;",
                                        listeners: {
                                            click: button2_click
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "button3",
                                        text: "下移",
                                        type: "text",
                                        size: "small",
                                        x: 210,
                                        y: 5,
                                        icon: "icon-arrow-down",
                                        click: "button3_click",
                                        style: "font-size: 14px;",
                                        listeners: {
                                            click: button3_click
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: "vmd.treeex",
                                id: "tree",
                                width: 350,
                                height: 270,
                                hideRoot: true,
                                x: 40,
                                y: 200,
                                region: "center",
                                afterrender: "tree_afterrender",
                                folderImg: "/img/public/folderClosed.gif",
                                nodedraggable: false,
                                leafImg: "/img/public/u772.png",
                                style: "font-size: 14px;",
                                cls: "restree",
                                listeners: {
                                    vmdafterrender: tree_afterrender
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "vmd.menu",
                id: "res_menu",
                width: 120,
                hidden: true,
                floating: true,
                afterrender: "hwMenu_afterrender",
                listeners: {
                    vmdafterrender: hwMenu_afterrender
                },
                items: [{
                        xtype: "menuitem",
                        id: "hwMenuItem",
                        width: 120,
                        text: "Menu Item",
                        hidden: false
                    },
                    {
                        xtype: "menuitem",
                        id: "hwMenuItem1",
                        width: 120,
                        text: "Menu Item",
                        hidden: false
                    },
                    {
                        xtype: "menuitem",
                        id: "hwMenuItem2",
                        width: 120,
                        text: "Menu Item",
                        hidden: false
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.iSaveData = function(callback) {
            //直接填写方法内容
            saveData(callback);
        }
        this.iSetId = function(id) {
            //直接填写方法内容
            objInfoId = id;
        }
        this.iGetName = function() {
            //直接填写方法内容
            return hwTextProjectName.getValue();
        }
        this.iSetIfDataLoaded = function(bVar) {
            //直接填写方法内容
            setIfDataLoaded(bVar);
        }
        this.iSetWorkSpaceId = function(id) {
            //直接填写方法内容
            workspaceId = id;
        }
        this.getRegInfo_PtType = function() {
            //直接填写方法内容
            return c_RegRelease.getPtType() || RegRelease.getPtType();
        }
        this.hideTab = function(index) {
            //直接填写方法内容
            TabsProjectInfo.hideTabStripItem(index)
        }
        this.getRegInfo_ptdb = function(ptdb) {
            //直接填写方法内容
            return RegRelease.getptdb()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.TabProjectInfo");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TabProjectInfo");
    }
})