Ext.define("vmd.ux.Credtab" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Credtab",
	title:"Panel",
	header:false,
	border:false,
	width:580,
	height:200,
	layout:"fit",
	uxCss:".info a {   text-decoration:none; }.info a:link {    color: blue; text-decoration:none;    }.info a:active:{    color: red;    } .info a:visited {    color:purple;text-decoration:none;    } .info a:hover {    color: red; text-decoration:underline;    } .x-grid3-scroller {overflow-x: hidden}",
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
var ptServer = {
    ip: '192.168.1.180:6602',
    callcode: 'snqtscdd',
    functionPower: '/platform/v1/userFunction', //功能点权限
    notification: '/XXHTS/schedule/taskmanager/flowandapprove/notification', //待办已办
    useRole: '/platform/v1/roleUser', //用户角色服务
};

var ipServer = {
    tz: 'http://192.168.1.180:8001'
}

//工作流模板节点
var objNode = {
    workFlowNodeCode_workTemp: ["gdmblcjd2", "gdmblcjd3", "gdmblcjd4", "gdmblcjd5"], //工单模板
    workFlowNodeCode_taskTemp: ["rwmblcjd2", "rwmblcjd3", "rwmblcjd4", "rwmblcjd5"], //任务模板
    workFlowNodeCode_task: ["rwlcjd2", "rwlcjd3", "rwlcjd4", "rwlcjd5", "rwlcjd6"] //任务
}
var now = new Date;
var dataList = [];
var dataListYb = [];
var todoData = [];
var todoDataYb = [];
var year = now.getFullYear();
var month = (now.getMonth() + 1).toString();
var day = (now.getDate()).toString();
if(month.length == 1) {
    month = "0" + month;
}
if(day.length == 1) {
    day = "0" + day;
}
var dateTime = year + "-" + month + "-" + day;
var params = {
    ntfcttype: "TODO",
    exdate: dateTime + ' 23:59:59',
    efdate: dateTime + ' 00:00:00'
};
var paramsyb = {
    ntfcttype: "DONE",
    exdate: dateTime + ' 23:59:59',
    efdate: dateTime + ' 00:00:00'
};
// 创建数据集。
var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["id", "xh", "name", "createddate", "dwmc", "url"]
})
// 创建数据集。
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["id", "xh", "name", "createddate", "dwmc", "url"]
})

function MyTabs_afterrender(sender) {
    var org = getQueryString("gztlx");
    var el = MyTabs.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1].id;
    if(org == 'bzz') {
        vmd("#" + el + "").after("<li class='x-tab-edge' style='width:400px;' id='eweu'><a class='x-tab-right' href='#'><span class='x-tab-strip-inner' style='margin:7px 0 0 0;'><span class='x-tab-strip-text' style='color:blue;float:right;' onclick='more();'>+更多</span></span></a></li>");
    } else {
        vmd("#" + el + "").after("<li class='x-tab-edge' style='width:80px;' id='eweu'><a class='x-tab-right' href='#'><span class='x-tab-strip-inner' style='margin:7px 0 0 0;'><span class='x-tab-strip-text' style='color:blue;' onclick='more();'>+更多</span></span></a></li>");
        vmd("#" + el + "").after("<li class='x-tab-edge' style='width:170px;text-align: left;' id='ewew'><a  href='#'><span class='x-tab-strip-inner'  style='margin:7px 0 0 0;'><span class='x-tab-strip-text' style='color:blue;' onclick='week();'>本周</span></span></a></li>");
        vmd("#" + el + "").after("<li class='x-tab-edge' style='width:20px;text-align: center;' id='ewee'><span class='x-tab-strip-inner'  style='margin:7px 0 0 0;'><span class='x-tab-strip-text' style='color:blue;'>/</span></span></li>");
        vmd("#" + el + "").after("<li class='x-tab-edge' style='width:140px;text-align: right;' id='eweq'><a href='#'><span class='x-tab-strip-inner'  style='margin:7px 5px 0 0;'><span class='x-tab-strip-text' style='color:blue;' onclick='yue();'>本月</span></span></a></li>");
    }


}
//本月
window.yue = function() {
    var url = '/sngzt/release/12efebd0-5bd2-4d64-8582-fe88888e55ac/hwDoGEhIQq/hw658aa84d.html'
    var newWindow; //定义一个窗口，有利于窗口间的通讯
    if(!newWindow || newWindow.closed) {
        var width = 900;
        var height = 600;
        var left = parseInt((screen.availWidth / 2) - (width / 2)); //屏幕居中
        var top = parseInt((screen.availHeight / 2) - (height / 2));
        var windowFeatures = "width=" + width + ",height=" + height + ",status,resizable,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
        newWindow = window.open(url, "subWind", windowFeatures);
    } else {
        // window is already open, so bring it to the front
        newWindow.focus();
    }
}
//本周
window.week = function() {
    var url = '/sngzt/release/12efebd0-5bd2-4d64-8582-fe88888e55ac/hwDoGEhIQq/hwe0dc77fa.html'
    var newWindow; //定义一个窗口，有利于窗口间的通讯
    if(!newWindow || newWindow.closed) {
        var width = 900;
        var height = 600;
        var left = parseInt((screen.availWidth / 2) - (width / 2)); //屏幕居中
        var top = parseInt((screen.availHeight / 2) - (height / 2));
        var windowFeatures = "width=" + width + ",height=" + height + ",status,resizable,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
        newWindow = window.open(url, "subWind", windowFeatures);
    } else {
        // window is already open, so bring it to the front
        newWindow.focus();
    }
}
//更多
window.more = function() {
    todoData = [];
    todoDataYb = [];
    var params = {
        ntfcttype: "TODO",
        exdate: '',
        efdate: ''
    };
    var paramsyb = {
        ntfcttype: "DONE",
        exdate: '',
        efdate: ''
    };
    loadStoreYb(paramsyb);
    loadStoreDb(params);
}
//加载已办数据
window.loadStoreYb = function(paramsyb) {
    dataListYb = [];
    var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
    var url = ptServer.notification;
    hwDao.get(url, {}, paramsyb, function(res) {
        if(res.isSucceed) {
            if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                dataListYb = data;
                setTabItemYb(); //加载已办数据
            }
        } else {
            alert(res.errMsg);
        }
    }, function(res) {
        alert(res);
    });
}

function MyGrid1_beforerender(sender) {
    this.store = store;
    loadStoreDb(params);
}
//加载待办数据
window.loadStoreDb = function(params) {
    dataList = [];
    var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
    var url = ptServer.notification;
    hwDao.get(url, {}, params, function(res) {
        if(res.isSucceed) {
            if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                dataList = data;
            }
            setTabItem(); //加载数据
        } else {
            alert(res.errMsg);
        }
    }, function(res) {
        alert(res);
    });
}
//数据组装
window.setTabItem = function() {
    var i = 0;
    getRoleInfo('gzttodo', function(res) {
        if(res == true) {
            var tabs = ["任务待派发", "任务待审核", "异常工作"];
            for(i = 0; i < 3; i++) {
                var tdname = "<span class=tabName>" + tabs[i] + "</span>";
                switch (i) {
                    case 0:
                        setDataCount(tdname, objNode.workFlowNodeCode_task[0], '');
                        break;
                    case 1:
                        setDataCount(tdname, objNode.workFlowNodeCode_task[2], '');
                        break;
                    case 2:
                        setDataCount(tdname, objNode.workFlowNodeCode_task[4], '');
                        break;
                    default:
                        break;
                }
            }
            store.loadData(todoData);
        }
    })
    getRoleInfo('rwdcl', function(res) {
        if(res == true) {
            var tdname = "<span class=tabName>任务待处理</span>";
            setDataCount(tdname, objNode.workFlowNodeCode_task[3], '');
            store.loadData(todoData);
        }
    })
    getRoleInfo('mbsp', function(res) {
        if(res == true) {
            var tabs = ["工单模板待审批", "任务模板待审批"];
            for(i = 0; i < 2; i++) {
                var tdname = "<span class=tabName>" + tabs[i] + "</span>";
                switch (i) {
                    case 0:
                        setDataCount(tdname, objNode.workFlowNodeCode_workTemp[0], objNode.workFlowNodeCode_workTemp[1]);
                        break;
                    case 1:
                        setDataCount(tdname, objNode.workFlowNodeCode_taskTemp[0], objNode.workFlowNodeCode_taskTemp[1]);
                        break;
                    default:
                        break;
                }
            }
            store.loadData(todoData);
        }
    })
    getRoleInfo('mbgl', function(res) {
        if(res == true) {
            var tabs = ["模板待确认", "重新调整"];
            for(i = 0; i < 2; i++) {
                var tdname = "<span class=tabName>" + tabs[i] + "</span>";
                switch (i) {
                    case 0:
                        setDataCount(tdname, objNode.workFlowNodeCode_workTemp[2], objNode.workFlowNodeCode_taskTemp[2]);
                        break;
                    case 1:
                        setDataCount(tdname, objNode.workFlowNodeCode_workTemp[3], objNode.workFlowNodeCode_taskTemp[3]);
                        break;
                    default:
                        break;
                }
            }
            store.loadData(todoData);
        }
    })
}
//获取权限信息
function getRoleInfo(type, callback) {
    var flag = false;
    var moduleId = ""; //模块id
    var moduleUrl = ""; //模块url


    //参数顺序  1、moduleId  2、moduleUrl 3、g_moduleGuid  4、相对路径
    if(moduleId.trim().length == 0) {
        if(moduleUrl.length == 0) {
            moduleId = getQueryString("g_moduleGuid") || "";
            if(moduleId.trim().length == 0) {
                moduleUrl = '';//window.location.pathname;
            }
        }
    }
    var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
    var paras = {
        moduleid: moduleId,
        moduleurl: decodeURI(moduleUrl),
        functionname: type
    };
    var url = ptServer.functionPower;
    hwDao.get(url, {}, paras, function(res) {
        if(res.isSucceed) {
            if(res.data && res.data[0].datas.length > 0) {
                flag = true;

            }
        } else {
            alert(res.errMsg);
        }
        if(typeof(callback) == 'function') {
            callback(flag);
        }
    }, function(res) {
        alert(res);
        if(typeof(callback) == 'function') {
            callback(false);
        }
    });
}
// 获取各类数据记录数
function setDataCount(name, node1, node2) {
    var data = dataList;
    var dataCount = 0;
    var date = '';
    for(var i = 0; i < data.length; i++) {
        if(data[i].flownode == node1 || data[i].flownode == node2) {
            dataCount++;
            date = data[i].createddate
        }
    }
    if(dataCount != 0) {
        var ob = {
            name: "<a class='info' href='#' onclick='ymtz(this);'>" + name + "(<span style='color:red;'>" + dataCount + "</span></a>)",
            createddate: date
        }
        todoData.push(ob);
    }
}
//页面跳转
window.ymtz = function(id) {
    var data = dataList;
    var dataModel = [];
    var urlModel=[];
    var tr = $(id).closest('tr'),
        id = tr.find('td')[0].innerText;
    var url='';
    for(var i = 0; i < data.length; i++) {
        switch (id.split("(")[0]) {
            case "任务待派发": //任务派发
                if(data[i].flownode == objNode.workFlowNodeCode_task[0]) {
                    urlModel.push({
                        name: "<a href='#' onclick='rowLink(this);'>" + data[i].notfctct + "</a>",
                        createddate: data[i].serveddate,
                        url: ipServer.tz + "/pages/task/taskDispatch/taskDispatch.html?r=" + Math.random()
                    });
                }
                break;
            case "任务待审核": //任务审核
                if(data[i].flownode == objNode.workFlowNodeCode_task[2]) {
                    urlModel.push({
                        name: "<a href='#' onclick='rowLink(this);'>" + data[i].notfctct + "</a>",
                        createddate: data[i].serveddate,
                        url: ipServer.tz + "/pages/task/compTaskApprove.html?r=" + Math.random()
                    });
                }
                break;
            case "异常工作": //异常任务
                if(data[i].flownode == objNode.workFlowNodeCode_task[4]) {
                    urlModel.push({
                        name: "<a href='#' onclick='rowLink(this);'>" + data[i].notfctct + "</a>",
                        createddate: data[i].serveddate,
                        url: ipServer.tz + "/pages/task/exceptiontaskchange/exceptiontaskchange.html?r=" + Math.random()
                    });
                }
                break;
            case "任务待处理": //任务处理
                if(data[i].flownode == objNode.workFlowNodeCode_task[3]) {
                    urlModel.push({
                        name: data[i].notfctct,
                        createddate: data[i].serveddate,
                        url: ipServer.tz + "/pages/task/taskOpMonitoring/taskOpMonitoring.html?r=" + Math.random()
                    });
                }
                break;
            case "工单模板待审批": //工单模板审批
                if(data[i].flownode == objNode.workFlowNodeCode_workTemp[0]) { //业务部门领导审批
                    var jumpUrl = ipServer.tz + "/pages/workListTemp/workOrderApplyApproveBizDepartment.html";

                    /*if(data[i].appltype == objNode.busApplyTypeArr[1]) { //0:工单模板创建   1:工单模板变更 2:任务模板创建  3:任务模板变更  4:任务
                        jumpUrl = ipServer.tz + "/pages/workListTemp/workOrderApplyChangeApproveBizDepartment.html";
                    }*/
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl);
                } else if(data[i].flownode == objNode.workFlowNodeCode_workTemp[1]) { //生产指挥中心领导审批
                    var jumpUrl = ipServer.tz + "/pages/workListTemp/workOrderApplyApproveControlCenter.html";

                    /*if(data[i].appltype == objNode.busApplyTypeArr[1]) { //0:工单模板创建   1:工单模板变更 2:任务模板创建  3:任务模板变更  4:任务
                        jumpUrl = ipServer.tz + "/pages/workListTemp/workOrderApplyChangeApproveControlCenter.html";
                    }*/
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl);
                }
                break;
            case "任务模板待审批": //任务模板审批
                if(data[i].flownode == objNode.workFlowNodeCode_taskTemp[0]) { //业务部门审批
                    var jumpUrl = ipServer.tz + "/pages/taskTemp/taskTemplateApp/busDeparApproval.html";

                    /*if(data[i].appltype == objNode.busApplyTypeArr[3]) { //0:工单模板创建   1:工单模板变更 2:任务模板创建  3:任务模板变更  4:任务
                        jumpUrl = ipServer.tz + "/pages/taskTemp/taskTempModify/taskTempModifyYwbmSp.html";
                    }*/
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl);
                }
                if(data[i].flownode == objNode.workFlowNodeCode_taskTemp[1]) { //生产指挥中心领导审批
                    var jumpUrl = ipServer.tz + "/pages/taskTemp/taskTemplateApp/approvalOfcenter.html";

                    /*if(data[i].appltype == objNode.busApplyTypeArr[3]) { //0:工单模板创建   1:工单模板变更 2:任务模板创建  3:任务模板变更  4:任务
                        jumpUrl = ipServer.tz + "/pages/taskTemp/taskTempModify/taskTempModifySczhSp.html";
                    }*/
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl);
                }
                break;
            case "模板待确认": //模板确认
                if(data[i].flownode == objNode.workFlowNodeCode_workTemp[2]) { //工单模板确认
                    dataModel.push({
                        name: data[i].notfctct,
                        createddate: data[i].serveddate,
                        url: ipServer.tz + "tempConfirm.html?flag=gdmb&applyid=" + data[i].applid + "&taskid=" + data[i].flowtaskid + "&r=" + Math.random()
                    });
                }
                if(data[i].flownode == objNode.workFlowNodeCode_taskTemp[2]) { //任务模板确认
                    var jumpUrl = ipServer.tz + "/pages/taskTemp/preview.html";

                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl);
                }
                break;
            case "重新调整": //重新提交
                if(data[i].flownode == objNode.workFlowNodeCode_workTemp[3]) { //工单模板重新提交
                    var jumpUrl = ipServer.tz + "/pages/workListTemp/workOrderApply.html";

                    /* if(data[i].appltype == objNode.busApplyTypeArr[1]) { //0:工单模板创建   1:工单模板变更 2:任务模板创建  3:任务模板变更  4:任务
                         jumpUrl = ipServer.tz + "/pages/workListTemp/workOrderApplyChange.html";
                     }*/
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl);
                }
                if(data[i].flownode == objNode.workFlowNodeCode_taskTemp[3]) { //任务模板重新提交
                    var jumpUrl = ipServer.tz + "/pages/taskTemp/taskTemplateApp/taskTemplateApp.html";

                    /*if(data[i].appltype == objNode.busApplyTypeArr[3]) { //0:工单模板创建   1:工单模板变更 2:任务模板创建  3:任务模板变更  4:任务
                        jumpUrl = ipServer.tz + "/pages/taskTemp/taskTempModify/taskTempModifyApp.html";
                    }*/
                    dataModel = addTodoInfo(dataModel, data[i], jumpUrl);
                }
                break;
            default:
                break;
        }
    }
    store.loadData(dataModel);
}

window.rowLink = function(id) {
    var tr = $(id).closest('tr'),
        url = tr.find('td')[3].innerText;
    window.open(url, '_blank', '')
}

function MyGrid_beforerender(sender) {
    this.store = store2;
    loadStoreYb(paramsyb);
}

//页面参数获取方法
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if(r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}

function addTodoInfo(todoDataModel, todoInfo, jumpUrl) {
    todoDataModel.push({
        name: "<a href='#' onclick='rowLink(this);'>" + todoInfo.notfctct + "</a>",
        createddate: todoInfo.serveddate,
        url: jumpUrl + "?applyid=" + todoInfo.applid + "&taskid=" + todoInfo.flowtaskid +
            "&nodeid=" + todoInfo.flownode + "&lcslh=" + todoInfo.flowinstanceid + "&r=" + Math.random()
    });
    return todoDataModel;
}

function setTabItemYb() {
    getRoleInfo('ybrw', function(res) {
        if(res == true) {
            var tdname = "<span class=tabName>任务</span>";
            setDataCountYb(tdname, objNode.workFlowNodeCode_task[0], objNode.workFlowNodeCode_task[2], objNode.workFlowNodeCode_task[3], objNode.workFlowNodeCode_task[4]);
            store2.loadData(todoDataYb);
        }
    });
    getRoleInfo('mbysh', function(res) {
        if(res == true) {
            var tabs = ["工单模板", "任务模板"];
            for(var i = 0; i < 2; i++) {
                var tdname = "<span class=tabName>" + tabs[i] + "</span>";
                switch (i) {
                    case 0:
                        setDataCountYb(tdname, objNode.workFlowNodeCode_workTemp[0], objNode.workFlowNodeCode_workTemp[1], objNode.workFlowNodeCode_workTemp[2], objNode.workFlowNodeCode_workTemp[3]);
                        break;
                    case 1:
                        setDataCountYb(tdname, objNode.workFlowNodeCode_taskTemp[0], objNode.workFlowNodeCode_taskTemp[1], objNode.workFlowNodeCode_taskTemp[2], objNode.workFlowNodeCode_taskTemp[3]);
                        break;
                    default:
                        break;
                }
            }
            store2.loadData(todoDataYb);
        }
    })
}

// 获取各类数据记录数
function setDataCountYb(name, node1, node2, node3, node4) {
    var data = dataListYb;
    
    var dataCount = 0;
    for(var i = 0; i < data.length; i++) {
        if(data[i].flownode == node1 || data[i].flownode == node2 || data[i].flownode == node3 || data[i].flownode == node4) {
            dataCount++;
            date = data[i].createddate
        }
    }
    if(dataCount != 0) {
        var ob = {
            name: "<a class='info' href='#' onclick='ymtzYb(this);'>" + name + "(<span style='color:red;'>" + dataCount + "</span></a>)",
            createddate: date
        }
        todoDataYb.push(ob);
    }
}

window.ymtzYb = function(objYb) {
    var data = dataListYb;
    var dataModel = [];
    var tr = $(objYb).closest('tr'),
        td = tr.find('td')[0].innerText;
    for(var i = 0; i < data.length; i++) {
        switch (td.split("(")[0]) {
            case "任务":
                if(data[i].flownode == objNode.workFlowNodeCode_task[0] ||
                    data[i].flownode == objNode.workFlowNodeCode_task[2] ||
                    data[i].flownode == objNode.workFlowNodeCode_task[3] ||
                    data[i].flownode == objNode.workFlowNodeCode_task[4]) {
                    dataModel.push({
                        name: "<a href='#' onclick='rowLink(this);'>" + data[i].notfctct + "</a>",
                        createddate: data[i].serveddate,
                        url: ipServer.tz + "/pages/task/orderView.html?flag=view&applyid=" + data[i].applid + "&r=" + Math.random()
                    });
                }
                break;
            case "工单模板":
                if(data[i].flownode == objNode.workFlowNodeCode_workTemp[0] ||
                    data[i].flownode == objNode.workFlowNodeCode_workTemp[1] ||
                    data[i].flownode == objNode.workFlowNodeCode_workTemp[2] ||
                    data[i].flownode == objNode.workFlowNodeCode_workTemp[3]) {
                    dataModel.push({
                        name: "<a href='#' onclick='rowLink(this);'>" + data[i].notfctct + "</a>",
                        createddate: data[i].serveddate,
                        url: ipServer.tz + "/pages/workListTemp/workOrderView.html?applyid=" + data[i].applid +
                            "&lcslh=" + data[i].flowinstanceid + "&r=" + Math.random()
                    });
                }
                break;
            case "任务模板":
                if(data[i].flownode == objNode.workFlowNodeCode_taskTemp[0] ||
                    data[i].flownode == objNode.workFlowNodeCode_taskTemp[1] ||
                    data[i].flownode == objNode.workFlowNodeCode_taskTemp[2] ||
                    data[i].flownode == objNode.workFlowNodeCode_taskTemp[3]) {
                    dataModel.push({
                        name: "<a href='#' onclick='rowLink(this);'>" + data[i].notfctct + "</a>",
                        time: data[i].serveddate,
                        url: ipServer.tz + "/pages/taskTemp/taskTemplateAuditView.html?applyid=" + data[i].applid +
                            "&lcslh=" + data[i].flowinstanceid + "&r=" + Math.random()
                    });
                }
                break;
            default:
                break;
        }
    }
    store2.loadData(dataModel);
}
function MyTabs_tabchange(sender, tab) {
   /* loadStoreYb(paramsyb);
    loadStoreDb(params);*/
}
			this.items=[
			{
				xtype:"tabpanel",
				id:"MyTabs",
				activeTab:0,
				height:320,
				width:580,
				afterrender:"MyTabs_afterrender",
				x:0,
				y:10,
				tabchange:"MyTabs_tabchange",
				listeners:{
					vmdafterrender:MyTabs_afterrender,
					tabchange:MyTabs_tabchange
				},
				items:[
					{
						xtype:"panel",
						id:"panel",
						title:"待办信息",
						header:true,
						border:true,
						height:320,
						width:580,
						autoScroll:false,
						autoHeight:false,
						layout:"fit",
						items:[
							{
								xtype:"grid",
								id:"MyGrid1",
								title:"Grid Panel",
								loadMask:true,
								height:320,
								border:false,
								header:false,
								beforerender:"MyGrid1_beforerender",
								enableHdMenu:true,
								disableHeaderClick:true,
								disabled:false,
								hideHeaders:true,
								hidden:false,
								style:"overflow-x: hidden;",
								width:580,
								listeners:{
									beforerender:MyGrid1_beforerender
								},
								columns:[
									{
										xtype:"gridcolumn",
										header:"名称",
										sortable:true,
										resizable:true,
										dataIndex:"name",
										width:418,
										align:"left",
										css:"padding-left: 10px;"
									},
									{
										xtype:"gridcolumn",
										header:"createddate",
										sortable:true,
										resizable:true,
										dataIndex:"createddate",
										width:200,
										align:"left"
									},
									{
										xtype:"gridcolumn",
										header:"id",
										sortable:true,
										resizable:false,
										dataIndex:"id",
										align:"left",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"url",
										sortable:true,
										resizable:false,
										dataIndex:"url",
										align:"left",
										hidden:true
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel1",
						title:"已办信息",
						header:true,
						border:false,
						height:100,
						items:[
							{
								xtype:"grid",
								id:"MyGrid",
								title:"Grid Panel",
								loadMask:true,
								height:288,
								enableHdMenu:true,
								disableHeaderClick:true,
								hideHeaders:true,
								header:false,
								border:false,
								beforerender:"MyGrid_beforerender",
								listeners:{
									beforerender:MyGrid_beforerender
								},
								columns:[
									{
										xtype:"gridcolumn",
										header:"名称",
										sortable:true,
										resizable:true,
										dataIndex:"name",
										width:418,
										align:"left",
										css:"padding-left: 10px;"
									},
									{
										xtype:"gridcolumn",
										header:"时间",
										sortable:true,
										resizable:false,
										dataIndex:"createddate",
										width:200,
										align:"left"
									},
									{
										xtype:"gridcolumn",
										header:"id",
										sortable:true,
										resizable:false,
										dataIndex:"id",
										width:500,
										align:"center",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"url",
										sortable:true,
										resizable:false,
										dataIndex:"url",
										width:500,
										align:"center",
										hidden:true
									}
								]
							}
						]
					}
				],
				ip:this.ip,
				callCode:this.callCode,
				url:this.url
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.Credtab");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Credtab");
	}
})