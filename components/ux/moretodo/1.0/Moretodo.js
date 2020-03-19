undefined
Ext.define("vmd.ux.Moretodo", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Moretodo",
    layoutConfig: {
        align: "center",
        pack: "start"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 600,
    height: 400,
    layout: "vbox",
    uxCss: ".hand a{   text-decoration:none; }.hand a:link {    color: blue; text-decoration:none;    }.hand a:active:{    color: red;    } /*a:visited {    color:purple;text-decoration:none;    } */.hand a:hover {    color: red; text-decoration:underline;    } .x-grid3-hd-row td {    line-height: 15px;    vertical-align: middle;    border-left: 0px solid;     border-right: 0px solid;     border: 1px solid #e4e4e4;}.x-grid3-scroller {    overflow-x: hidden;}/* =========================================== Grid Panel =========================================== *//* 表格左右间距 */.vmd-grid {   /* padding-left: 5px;    padding-right: 5px;*/}/* 表格线样式兼容 */.vmd-grid table {    border-collapse: collapse;}/* 表头背景色 */.vmd-grid .x-grid3-header {    background-color: #f7f7f7;}/* 表头鼠标悬停背景色 */.vmd-grid .x-grid3-hd-over .x-grid3-hd-inner {    background-color: #f7f7f7;}/* 表头错位兼容 */.vmd-grid .x-grid3-header-offset {    padding: 0;}/* 表头单元格 */.vmd-grid .x-grid3-header td {    border: 1px solid #e3e2e8;    font-size: 14px;}/* 表体单元格 */.vmd-grid .x-grid3-body td {    border: 1px solid #e3e2e8;    border-top-width: 0;    padding: 0;    font-size: 14px;}/* 表体行 */.vmd-grid .x-grid3-row {    border: none;}/* 表体行鼠标悬停背景色 */.vmd-grid .x-grid3-row-over {    background-color: white;}/* 表体行选中背景色 */.vmd-grid .x-grid3-row-selected {    background-color: #F5F7FC !important;}/* =========================================== Grid Panel =========================================== */",
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
        var ryRwDataList = [];
        var usermodel = {};
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ["appid", "xh", "taskid", "name", "createddate", "flownode", "flowinst", "tasktype", "fromkey", "tasklink", "businesskey"]
        })
        //获取url的参数值
        var lb = vmd.getUrlParam('lb');
        var lx = vmd.getUrlParam('lx');
        //获取用户角色集
        function getUserInfo() {
            vmd.webBase.getUserRoleInfo(function(res, model) {
                usermodel.roleids = "";
                usermodel.rolenames = "";
                if (model && model.length > 0) {
                    usermodel.login = model[0].userlogin;
                    usermodel.name = model[0].username;
                    usermodel.userid = model[0].userid;
                    for (var i = 0; i < model.length; i++) {
                        debugger
                        if (usermodel.roleids) {
                            usermodel.roleids = usermodel.roleids + "," + model[i].roleid;
                        } else {
                            usermodel.roleids = model[i].roleid;
                        }
                        if (usermodel.rolenames) {
                            usermodel.rolenames = usermodel.rolenames + "," + model[i].rolename;
                        } else {
                            usermodel.rolenames = model[i].rolename;
                        }
                    }
                    loadStoreData();
                }
            })
        }
        window.loadStoreData = function() {
            ryRwDataList = [];
            //获取用户角色信息 
            if (lb == 'db') {
                hwMSC.taskTodoGet(usermodel.login, usermodel.roleids, 1, 100, function(data) {
                    if (data && data.msg && data.msg.length > 0) {
                        //将字符串转换为对象 
                        var data = vmd.decode(data.msg);
                        //var data= data.msg;
                        // console.log(data[0]);
                        for (var i = 0; i < data.length; i++) {
                            var strs = data[i].title;
                            if (lx == 'zdgz') {
                                if ((strs.substring(strs.indexOf('】') + 1, strs.lastIndexOf('【'))) == '【HSSE工作】' && (strs.substring(strs.indexOf('】') + 1, strs.lastIndexOf('【'))) == '【重点工作】') {
                                    xhs = 0;
                                    var itemObj = {
                                        xh: i + 1,
                                        appid: data[i].appId,
                                        taskid: data[i].flow_task_id,
                                        name: "<a href='#' onclick='rowLink(" + i + ");'>" + data[i].title + "</a>",
                                        createddate: data[i].row_create_date,
                                        flownode: data[i].flow_node_id,
                                        flowinst: data[i].flow_inst_id,
                                        tasktype: data[i].task_type,
                                        fromkey: data[i].from_key,
                                        tasklink: data[i].task_link,
                                        businesskey: data[i].business_key
                                    }
                                    xhs++;
                                    ryRwDataList.push(itemObj);
                                }
                            } else if (lx == 'dbyb') {
                                xh = 0;
                                if ((strs.substring(strs.indexOf('】') + 1, strs.lastIndexOf('【'))) != '【HSSE工作】' && (strs.substring(strs.indexOf('】') + 1, strs.lastIndexOf('【'))) != '【重点工作】') {
                                    var itemObj = {
                                        xh: xh + 1,
                                        appid: data[i].appId,
                                        taskid: data[i].flow_task_id,
                                        name: "<a href='#' onclick='rowLink(" + i + ");'>" + data[i].title + "</a>",
                                        createddate: data[i].row_create_date,
                                        flownode: data[i].flow_node_id,
                                        flowinst: data[i].flow_inst_id,
                                        tasktype: data[i].task_type,
                                        fromkey: data[i].from_key,
                                        tasklink: data[i].task_link,
                                        businesskey: data[i].business_key
                                    }
                                    ryRwDataList.push(itemObj);
                                    xh++;
                                }
                            } else {
                                var itemObj = {
                                    xh: i + 1,
                                    appid: data[i].appId,
                                    taskid: data[i].flow_task_id,
                                    name: "<a href='#' onclick='rowLink(" + i + ");'>" + data[i].title + "</a>",
                                    createddate: data[i].row_create_date,
                                    flownode: data[i].flow_node_id,
                                    flowinst: data[i].flow_inst_id,
                                    tasktype: data[i].task_type,
                                    fromkey: data[i].from_key,
                                    tasklink: data[i].task_link,
                                    businesskey: data[i].business_key
                                }
                                ryRwDataList.push(itemObj);
                            }
                        }
                        store.loadData(ryRwDataList);
                    } else {
                        alert("您当前无待办信息！");
                    }
                }, function() {
                    //alert(arguments);
                    alert("查询您的待办信息异常，请刷新界面重试！");
                })
            } else {
                hwMSC.taskDoGet(usermodel.login, 1, 100, function(data) {
                    if (data && data.msg && data.msg.length > 0) {
                        var data = vmd.decode(data.msg);
                        for (var i = 0; i < data.length; i++) {
                            var itemObj = {
                                xh: i + 1,
                                appid: data[i].appId,
                                taskid: data[i].task_id,
                                name: "<a href='#' onclick='rowLink(" + i + ");'>" + data[i].title + "</a>",
                                createddate: data[i].row_create_date,
                                flownode: data[i].flow_node_id,
                                flowinst: data[i].flow_inst_id,
                                tasktype: data[i].task_type,
                                fromkey: data[i].from_key,
                                tasklink: data[i].task_link,
                                businesskey: data[i].business_key
                            }
                            ryRwDataList.push(itemObj);
                        }
                        store.loadData(ryRwDataList);
                    } else {
                        alert("您当前无已办信息！");
                    }
                }, function() {
                    alert("查询您的已办信息异常，请刷新界面重试！");
                })
            }
            //}
            //})
        }

        function MyGrid_beforerender(sender) {
            this.store = store;
            getUserInfo();
        }
        //判断是否是json
        window._checkJson = function(str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (e) {
                    // console.log('error：'+str+'!!!'+e);
                    return false;
                }
            }
        }
        //点击
        window.rowLink = function(id) {
            var rowdata = MyGrid.getStore().data.items[id].data;
            var tokenparam = vmd.Cookie.get("hwToken") || vmd.getUrlParam('hwtoken');
            if (rowdata) {
                if (tokenparam) {
                    tokenparam = "&hwtoken=" + tokenparam;
                }
                if (rowdata.fromkey) {
                    if (_checkJson(rowdata.fromkey)) {
                        var fromJson = JSON.parse(rowdata.fromkey);
                        //配置的是定制的模块
                        if (fromJson.modulesInfo && fromJson.modulesInfo.length > 0) {
                            //查询模块路径
                            vmd.webBase.getModuleInfo(fromJson.modulesInfo[0].moduleId, '', function(res, model) {
                                if (model && model[0].abspath) {
                                    window.open('' + model[0].abspath + (model[0].abspath.indexOf('&') != -1 ? '&' : '?') + 'lb=' + lb + '&taskid=' + rowdata.taskid + '&taskId=' + rowdata.taskid + '&flowinstid=' + rowdata.flowinst + "&businesskey=" + rowdata.businesskey + tokenparam, '_blank')
                                }
                            })
                        } else {
                            var selfconfig = JSON.parse(fromJson.rule || '{}');
                            if (selfconfig.pc) {
                                //查询模块路径
                                vmd.webBase.getModuleInfo(selfconfig.pc, '', function(res, model) {
                                    if (model && model[0].abspath) {
                                        window.open('' + model[0].abspath + (model[0].abspath.indexOf('&') != -1 ? '&' : '?') + 'lb=' + lb + '&taskid=' + rowdata.taskid + '&taskId=' + rowdata.taskid + '&flowinstid=' + rowdata.flowinst + "&businesskey=" + rowdata.businesskey + tokenparam, '_blank')
                                    }
                                })
                            } else {
                                alert("当前未配置模块信息！");
                            }
                        }
                    } else {
                        //查询模块路径
                        vmd.webBase.getModuleInfo(rowdata.fromkey, '', function(res, model) {
                            if (model && model[0].abspath) {
                                window.open('' + model[0].abspath + (model[0].abspath.indexOf('&') != -1 ? '&' : '?') + 'lb=' + lb + '&taskid=' + rowdata.taskid + '&taskId=' + rowdata.taskid + '&flowinstid=' + rowdata.flowinst + "&businesskey=" + rowdata.businesskey + tokenparam, '_blank')
                            }
                        })
                    }
                } else if (rowdata.tasklink) {
                    window.open('' + rowdata.tasklink + (rowdata.tasklink.indexOf('&') != -1 ? '&' : '?') + 'lb=' + lb + '&taskid=' + rowdata.taskid + '&taskId=' + rowdata.taskid + '&flowinstid=' + rowdata.flowinst + "&businesskey=" + rowdata.businesskey + tokenparam, '_blank', '')
                } else {
                    alert("当前未配置超链接地址！");
                }
            }
        }
        /**刷新表格编号 */
        function refreshNo() {
            var i = 1;
            mygrid.forEachRow(function(id) {
                mygrid.cells(id, 0).setValue(i++);
            });
        }
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: true,
            height: 400,
            layout: "fit",
            autoHeight: false,
            width: 601,
            style: "top:0;left:0;right: 0;bottom: 0;",
            items: [{
                xtype: "grid",
                id: "MyGrid",
                title: "Grid Panel",
                loadMask: true,
                hideHeaders: false,
                header: false,
                beforerender: "MyGrid_beforerender",
                cls: "hand vmd-grid",
                listeners: {
                    beforerender: MyGrid_beforerender
                },
                columns: [{
                        xtype: "gridcolumn",
                        header: "appid",
                        sortable: true,
                        resizable: true,
                        dataIndex: "appid",
                        width: 100,
                        hidden: true
                    },
                    {
                        xtype: "gridcolumn",
                        header: "taskid",
                        sortable: true,
                        resizable: true,
                        dataIndex: "taskid",
                        width: 100,
                        hidden: true
                    },
                    {
                        xtype: "gridcolumn",
                        header: "序号",
                        sortable: true,
                        resizable: true,
                        dataIndex: "xh",
                        width: 100,
                        align: "center",
                        menuDisabled: true
                    },
                    {
                        xtype: "gridcolumn",
                        header: "名称",
                        sortable: true,
                        resizable: true,
                        dataIndex: "name",
                        width: 302,
                        align: "center",
                        css: "text-align: left !important;",
                        menuDisabled: true
                    },
                    {
                        xtype: "gridcolumn",
                        header: "时间",
                        sortable: true,
                        resizable: true,
                        dataIndex: "createddate",
                        width: 190,
                        align: "center",
                        css: "text-align:left;",
                        menuDisabled: true
                    },
                    {
                        xtype: "gridcolumn",
                        header: "flownode",
                        sortable: true,
                        resizable: true,
                        dataIndex: "flownode",
                        width: 100,
                        hidden: true
                    },
                    {
                        xtype: "gridcolumn",
                        header: "flowinst",
                        sortable: true,
                        resizable: true,
                        dataIndex: "flowinst",
                        width: 100,
                        hidden: true
                    },
                    {
                        xtype: "gridcolumn",
                        header: "tasktype",
                        sortable: true,
                        resizable: true,
                        dataIndex: "tasktype",
                        width: 100,
                        hidden: true
                    },
                    {
                        xtype: "gridcolumn",
                        header: "fromkey",
                        sortable: true,
                        resizable: true,
                        dataIndex: "fromkey",
                        width: 190,
                        align: "center",
                        css: "text-align:left;",
                        hidden: true
                    },
                    {
                        xtype: "gridcolumn",
                        header: "tasklink",
                        sortable: true,
                        resizable: true,
                        dataIndex: "tasklink",
                        width: 190,
                        align: "center",
                        css: "text-align:left;",
                        hidden: true
                    }
                ]
            }]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.Moretodo");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Moretodo");
    }
})