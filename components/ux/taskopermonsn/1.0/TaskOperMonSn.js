undefined
Ext.define("vmd.ux.TaskOperMonSn", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.CreateCalendar$1.0$CreateCalendar"]),
    version: "1.0",
    xtype: "vmd.ux.TaskOperMonSn",
    title: "Panel",
    header: false,
    border: false,
    width: 1160,
    height: 387,
    layout: "fit",
    afterrender: "TaskOperMonSn_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.TaskOperMonSn_afterrender(this)
        }
    },
    uxCss: ".hand a {    text-decoration: none;}.hand a:link {    color: blue;    text-decoration: none;}.hand a:active: {    color: red;}/*.hand a:visited {    color: purple;    text-decoration: none;}*/.hand a:hover {    color: red;    text-decoration: underline;}.x-grid3-hd-row td {    line-height: 15px;    vertical-align: middle;    border-left: 0px solid;     border-right: 0px solid;     border: 1px solid #e4e4e4;}.x-grid3-scroller {    overflow-x: hidden;}/* =========================================== Grid Panel =========================================== *//* 表格左右间距 */.vmd-grid {    /*padding-left: 5px;    padding-right: 5px;*/}/* 表格线样式兼容 */.vmd-grid table {    border-collapse: collapse;}/* 表头背景色 */.vmd-grid .x-grid3-header {    background-color: #f7f7f7;}/* 表头鼠标悬停背景色 */.vmd-grid .x-grid3-hd-over .x-grid3-hd-inner {    background-color: #f7f7f7;}/* 表头错位兼容 */.vmd-grid .x-grid3-header-offset {    padding: 0;}/* 表头单元格 */.vmd-grid .x-grid3-header td {    border: 1px solid #e3e2e8;    font-size: 14px;}/* 表体单元格 */.vmd-grid .x-grid3-body td {    border: 1px solid #e3e2e8;    border-top-width: 0;    padding: 0;    font-size: 14px;}/* 表体行 */.vmd-grid .x-grid3-row {    border: none;}/* 表体行鼠标悬停背景色 */.vmd-grid .x-grid3-row-over {    background-color: white;}/* 表体行选中背景色 */.vmd-grid .x-grid3-row-selected {    background-color: #F5F7FC !important;}/* =========================================== Grid Panel =========================================== */",
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
        var rwDataList = [];
        var store1 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ["id", "xh", "name", "dwdm", "dwmc", "rwtype", "rwtypecode", "rwplan", "wks", "jxz", "zcwc", "cs", "ywc", "ysh", "zz"]
        });
        var ptServer = {
            ip: '',
            callcode: '',
            userInfo: '', //用户信息服务
            orgschecount: ''
        };
        var dwdm = '';
        var params = {
            dwdm: dwdm,
            startdate: '',
            enddate: ''
        };
        //获取用户信息
        function loginInfo() {
            var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
            var url = ptServer.userInfo;
            hwDao.get(url, {}, {}, function(res) {
                if (res.data[0].size > 0) {
                    dwdm = res.data[0].datas[0].dwdm;
                    params = {
                        dwdm: dwdm,
                        startdate: CreateCalendar.getStartDateVal(),
                        enddate: CreateCalendar.getEndDateVal()
                    };
                    loadRwData(params);
                } else {
                    params = {
                        dwdm: dwdm,
                        startdate: CreateCalendar.getStartDateVal(),
                        enddate: CreateCalendar.getEndDateVal()
                    };
                    loadRwData(params);
                }
            }, function() {}); /*成功回调函数*/
        }

        function loadRwData(ob) {
            rwDataList = [];
            var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
            var url = ptServer.orgschecount;
            hwDao.get(url, {}, ob, function(res) {
                if (res.isSucceed) {
                    if (res.data && res.data[0].datas.length > 0) {
                        var data = res.data[0].datas;
                        for (var i = 0; i < data.length; i++) {
                            var itemObj = {
                                xh: i + 1,
                                id: i + 1 /*data[i].sched_type_code*/ ,
                                dwdm: data[i].dwdm,
                                dwmc: data[i].dwmc,
                                rwtypecode: data[i].schedule_type,
                                rwtype: data[i].schedule_type_name,
                                rwplan: "<a href='#' class='hand'>" + data[i].zs + "</a>",
                                ywc: "<a href='#' class='hand'>" + data[i].wc + "</a>",
                                wks: "<a href='#' class='hand'>" + data[i].wks + "</a>",
                                jxz: "<a href='#' class='hand'>" + data[i].jxz + "</a>",
                                ysh: "<a href='#' class='hand'>" + data[i].ysh + "</a>",
                                zcwc: "<a href='#' class='hand'>" + data[i].zcwc + "</a>",
                                cs: "<a href='#' class='hand'>" + data[i].cswc + "</a>",
                                zz: "<a href='#' class='hand'>" + data[i].yzz + "</a>"
                            }
                            rwDataList.push(itemObj);
                        }
                    }
                    store1.loadData(rwDataList);
                } else {
                    alert(res.errMsg);
                }
            }, function(res) {
                alert(res);
            });
        }

        function MyGrid_beforerender(sender) {
            this.store = store1;
        }

        function CreateCalendar_queryBtnClick(sender, kssj, jssj) {
            params = {
                dwdm: dwdm,
                startdate: kssj,
                enddate: jssj
            };
            loadRwData(params);
        }

        function TaskOperMonSn_afterrender(sender) {
            ptServer = {
                ip: vmd.workspace.dataServiceIp,
                callcode: MyGrid.callcode,
                userInfo: MyGrid.userInfo, //'platform/v1/UserManage', //用户信息服务
                orgschecount: MyGrid.orgschecount //'XXHTS/schedule/taskmanager/workbench/orgschecount'
            };
            loginInfo();
        }

        function MyGrid_cellclick(sender, rowIndex, columnIndex, e) {
            
            var flightNONum = MyGrid.getStore().getAt(rowIndex);
            var dwdm = MyGrid.getStore().getAt(rowIndex).data.dwdm,
                rwlx = MyGrid.getStore().getAt(rowIndex).data.rwtypecode,
                kssj = CreateCalendar.getStartDateVal(),
                jssj = CreateCalendar.getEndDateVal(),
                rwzt = '';
            if (columnIndex == '6') {
                rwzt = 'NOTSTARTED';
            } else if (columnIndex == '7') {
                rwzt = 'INPROCESS';
            } else if (columnIndex == '8') {
                rwzt = 'COMPLETE';
            } else if (columnIndex == '9') {
                rwzt = 'OTCOMPLETE';
            } else if (columnIndex == '10') {
                rwzt = 'YWC';
            } else if (columnIndex == '11') {
                rwzt = 'AUDITED';
            } else if (columnIndex == '12') {
                rwzt = 'ZZ';
            }
            var url = 'http://10.207.60.69:9002/ProScheduling/pages/task/historicalTaskQuery/historicalTaskQuery.html?dwdm=' + dwdm + '&rwlx=' + rwlx + '&kssj=' + kssj + '&jssj=' + jssj + '&rwzt=' + rwzt + '&r=' + Math.random();
            window.open(url, "_blank");
        }
        this.TaskOperMonSn_afterrender = TaskOperMonSn_afterrender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "任务运行监控",
            header: true,
            border: true,
            height: 385,
            width: 1150,
            padding: "5",
            items: [{
                    xtype: "vmd.ux.CreateCalendar",
                    id: "CreateCalendar",
                    layoutConfig: {
                        align: "middle",
                        pack: "center"
                    },
                    startDateNameTxt: "开始时间：",
                    startDateCls: "dateYmd",
                    endDateNameTxt: "结束时间：",
                    endDateCls: "dateYmd",
                    btnTxt: "查询",
                    btnType: "(none)",
                    btnImg: "(none)",
                    layout: "hbox",
                    width: 1150,
                    height: 50,
                    queryBtnClick: "CreateCalendar_queryBtnClick",
                    dateFormat: "Y-m-d",
                    startDateDeftSel: "today",
                    endDateDeftSel: "today",
                    contrastSze: "lt",
                    listeners: {
                        queryBtnClick: CreateCalendar_queryBtnClick
                    }
                },
                {
                    xtype: "grid",
                    id: "MyGrid",
                    loadMask: true,
                    height: 307,
                    width: 1144,
                    hideHeaders: false,
                    border: false,
                    header: false,
                    beforerender: "MyGrid_beforerender",
                    cls: "vmd-grid",
                    cellclick: "MyGrid_cellclick",
                    listeners: {
                        beforerender: MyGrid_beforerender,
                        cellclick: MyGrid_cellclick
                    },
                    columns: [{
                            xtype: "gridcolumn",
                            header: "序号",
                            sortable: true,
                            resizable: true,
                            dataIndex: "xh",
                            width: 80,
                            align: "center",
                            menuDisabled: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "任务计划总数",
                            sortable: true,
                            resizable: true,
                            dataIndex: "dwdm",
                            width: 100,
                            align: "center",
                            css: "text-align: right !important;",
                            menuDisabled: true,
                            hidden: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "部门",
                            sortable: true,
                            resizable: true,
                            dataIndex: "dwmc",
                            width: 120,
                            align: "center",
                            css: "text-align: left !important;",
                            menuDisabled: true,
                            fixed: false
                        },
                        {
                            xtype: "gridcolumn",
                            header: "任务类型",
                            sortable: true,
                            resizable: false,
                            dataIndex: "rwtypecode",
                            width: 100,
                            align: "center",
                            fixed: false,
                            menuDisabled: true,
                            hidden: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "任务类型",
                            sortable: true,
                            resizable: false,
                            dataIndex: "rwtype",
                            width: 115,
                            align: "center",
                            fixed: false,
                            menuDisabled: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "任务计划总数",
                            sortable: true,
                            resizable: true,
                            dataIndex: "rwplan",
                            width: 100,
                            align: "center",
                            css: "text-align: right !important;",
                            menuDisabled: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "未开始",
                            sortable: true,
                            resizable: true,
                            dataIndex: "wks",
                            width: 100,
                            align: "center",
                            css: "text-align: right !important;",
                            menuDisabled: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "进行中",
                            sortable: true,
                            resizable: true,
                            dataIndex: "jxz",
                            width: 100,
                            align: "center",
                            css: "text-align: right !important;",
                            menuDisabled: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "正常完成",
                            sortable: true,
                            resizable: true,
                            dataIndex: "zcwc",
                            width: 100,
                            align: "center",
                            css: "text-align: right !important;",
                            menuDisabled: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "超时完成",
                            sortable: true,
                            resizable: true,
                            dataIndex: "cs",
                            width: 100,
                            align: "center",
                            css: "text-align: right !important;",
                            menuDisabled: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "已完成",
                            sortable: true,
                            resizable: true,
                            dataIndex: "ywc",
                            width: 100,
                            align: "center",
                            css: "text-align: right !important;",
                            menuDisabled: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "已审核",
                            sortable: true,
                            resizable: true,
                            dataIndex: "ysh",
                            width: 100,
                            align: "center",
                            css: "text-align: right !important;",
                            menuDisabled: true
                        },
                        {
                            xtype: "gridcolumn",
                            header: "终止",
                            sortable: true,
                            resizable: true,
                            dataIndex: "zz",
                            width: 100,
                            align: "center",
                            css: "text-align: right !important;",
                            menuDisabled: true
                        }
                    ],
                    callcode: this.callcode,
                    userInfo: this.userInfo,
                    orgschecount: this.orgschecount
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        Ext.util.CSS.removeStyleSheet("vmd.ux.TaskOperMonSn");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TaskOperMonSn");
    }
})