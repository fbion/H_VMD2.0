Ext.define("vmd.ux.ReportQueryField", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ReportQueryField",
    title: "Panel",
    header: false,
    border: false,
    layout: "column",
    autoHeight: true,
    radioHidden: true,
    dyRadioHidden: true,
    dateHidden: true,
    periodDateHidden: false,
    importHidden: true,
    addHidden: true,
    uxCss: ".myDate {    top: 8px !important;    height: 30px !important;    border: 1px solid #e4e4e4 !important;    border-radius: 4px;    padding-left: 5px !important;    background-image: url(\"{vmduxpath}/components/ux/reportqueryfield/1.0/img/calendar.png\") !important;    background-repeat: no-repeat;    background-position: 90%;}.myDate input {    width: 70% !important;    font-size: 12px !important;}.myDate img {    display: none;}.myCombo input {    font-size: 12px !important;}.dhxcombo_option {    font-size: 12px !important;}.myRadio .x-form-item {    margin-bottom: 0;}.myRadio .x-column-inner {    margin-top: 11px;}",
    uxrequirecss: "[\"lib/laydate/theme/default/laydate.css\"]",
    uxrequirejs: "[\"lib/laydate/laydate.src.js\"]",
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
        // 月份偏移
        function addMonth(date, num) {
            var sYear = date.getFullYear();
            var sMonth = date.getMonth() + 1;
            var sDay = date.getDate();
            var eYear = sYear;
            var eMonth = sMonth + num;
            var eDay = sDay;
            var mod = 0;
            if (eMonth > 12) {
                mod = parseInt(eMonth / 12);
                eYear += mod;
                eMonth -= 12;
            } else if (eMonth < 2) {
                mod = parseInt((Math.abs(eMonth) + 1) / 12);
                eYear = eYear - 1 - mod;
                eMonth += (mod + 1) * 12;
            }
            var eDate = new Date(eYear, eMonth - 1, eDay);
            return eDate;
        }

        function myYear_afterrender(sender) {
            myYear.setValue(new Date());
        }

        function myDate_afterrender(sender) {
            myDate.setValue(new Date());
        }

        function startDate_afterrender(sender) {
            startDate.setValue(addMonth(new Date(), -1));
        }

        function endDate_afterrender(sender) {
            endDate.setValue(new Date());
        }

        function startMonth_afterrender(sender) {
            startMonth.setValue(addMonth(new Date(), -12));
        }

        function endMonth_afterrender(sender) {
            endMonth.setValue(new Date());
        }

        function dwCombo_beforerender(sender) {
            var store = new vmd.data.Store({
                data: [{
                    dwdm: "",
                    dwmc: ""
                }],
                fields: ["dwdm", "dwmc"]
            });
            dwCombo.store = store;
            dwCombo.valueField = "dwdm";
            dwCombo.displayField = "dwmc";
            var hostUrl = {
                host: vmd.workspace.dataServiceIp,
                url: "lqfagl/common/cjdwxlk"
            };
            var headers = {};
            var params = {};
            hwDas.get(hostUrl, headers, params, function(result) {
                if (result.isSucceed) {
                    var data = result.data[0].datas;
                    store.loadData(data);
                } else {
                    vmd.alert("错误", "获取单位下拉框失败！");
                    console.log(result.errMsg);
                }
            }, function(msg) {
                console.log(msg);
            });
        }

        function dyCombo_beforerender(sender) {
            var store = new vmd.data.Store({
                data: [{
                    dymc: ""
                }],
                fields: ["dymc", "dymc"]
            });
            dyCombo.store = store;
            dyCombo.valueField = "dymc";
            dyCombo.displayField = "dymc";
        }

        function jhCombo_beforerender(sender) {
            var store = new vmd.data.Store({
                data: [{
                    jh: "",
                    hzjh: ""
                }],
                fields: ["jh", "hzjh"]
            });
            jhCombo.store = store;
            jhCombo.valueField = "jh";
            jhCombo.displayField = "hzjh";
        }

        function dwCombo_change(sender, value, text) {
            var url = "";
            if (page.dyAll) {
                url = "lqfagl/common/dyxlkall";
            } else {
                url = "lqfagl/common/dyxlk";
            }
            var hostUrl = {
                host: vmd.workspace.dataServiceIp,
                url: url
            };
            var headers = {};
            var params = {
                dwdm: value
            };
            hwDas.get(hostUrl, headers, params, function(result) {
                if (result.isSucceed) {
                    var data = result.data[0].datas;
                    dyCombo.store.loadData(data);
                } else {
                    vmd.alert("错误", "获取单元下拉框失败！");
                    console.log(result.errMsg);
                }
            }, function(msg) {
                console.log(msg);
            });
        }

        function dyRadioGroup_change(sender, checked) {
            var url = "";
            if (dyRadioGroup.getValue() == "jcdy") {
                url = "lqfagl/common/dyxlk";
            } else {
                url = "lqfagl/common/zdydyxlk";
            }
            var hostUrl = {
                host: vmd.workspace.dataServiceIp,
                url: url
            };
            var headers = {};
            var params = {
                dwdm: dwCombo.getValue()
            };
            hwDas.get(hostUrl, headers, params, function(result) {
                if (result.isSucceed) {
                    var data = result.data[0].datas;
                    dyCombo.store.loadData(data);
                } else {
                    vmd.alert("错误", "获取单元下拉框失败！");
                    console.log(result.errMsg);
                }
            }, function(msg) {
                console.log(msg);
            });
        }

        function dyCombo_change(sender, value, text) {
            var hostUrl = {
                host: vmd.workspace.dataServiceIp,
                url: "lqfagl/common/jhxlk"
            };
            var headers = {};
            var params = {
                jb: page.wellType,
                dwdm: dwCombo.getValue(),
                dymc: value
            };
            hwDas.get(hostUrl, headers, params, function(result) {
                if (result.isSucceed) {
                    var data = result.data[0].datas;
                    jhCombo.store.loadData(data);
                } else {
                    vmd.alert("错误", "获取井号下拉框失败！");
                    console.log(result.errMsg);
                }
            }, function(msg) {
                console.log(msg);
            });
        }

        function hwRadioGroup_change(sender, checked) {
            if (checked.inputValue == "day") {
                periodDateDiv.show();
                periodMonthDiv.hide();
            }
            if (checked.inputValue == "month") {
                periodDateDiv.hide();
                periodMonthDiv.show();
            }
            page.doLayout();
        }

        function btnQuery_click(sender, e) {
            page.fireEvent("queryClick", sender);
        }

        function btnPrint_click(sender, e) {
            page.fireEvent("printClick", sender);
        }

        function btnImport_click(sender, e) {
            page.fireEvent("importClick", sender);
        }

        function btnExport_click(sender, e) {
            page.fireEvent("exportClick", sender);
        }

        function btnAdd_click(sender, e) {
            page.fireEvent("addClick", sender);
        }
        this.items = [{
                xtype: "radiostoregroup",
                id: "hwRadioGroup",
                width: 100,
                height: 50,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "myRadio",
                cls: "myRadio",
                change: "hwRadioGroup_change",
                margins: "0 0 0 5",
                hidden: this.radioHidden,
                columnWidth: "",
                listeners: {
                    change: hwRadioGroup_change
                },
                items: [{
                        xtype: "radio",
                        id: "dayRadio",
                        boxLabel: "日度",
                        checked: true,
                        inputValue: "day"
                    },
                    {
                        xtype: "radio",
                        id: "monthRadio",
                        boxLabel: "月度",
                        inputValue: "month"
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "dwDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 200,
                height: 50,
                layout: "hbox",
                columnWidth: "",
                items: [{
                        xtype: "label",
                        id: "hwLabel",
                        text: "单位："
                    },
                    {
                        xtype: "vmd.combo",
                        id: "dwCombo",
                        width: 150,
                        beforerender: "dwCombo_beforerender",
                        change: "dwCombo_change",
                        firstSelected: true,
                        cls: "myCombo",
                        listeners: {
                            beforerender: dwCombo_beforerender,
                            change: dwCombo_change
                        }
                    }
                ],
                hidden: this.dwHidden
            },
            {
                xtype: "radiostoregroup",
                id: "dyRadioGroup",
                width: 160,
                height: 50,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "myRadio",
                cls: "myRadio",
                change: "dyRadioGroup_change",
                margins: "0 0 0 5",
                hidden: this.dyRadioHidden,
                columnWidth: "",
                listeners: {
                    change: dyRadioGroup_change
                },
                items: [{
                        xtype: "radio",
                        id: "jcdyRadio",
                        boxLabel: "基础单元",
                        checked: true,
                        inputValue: "jcdy"
                    },
                    {
                        xtype: "radio",
                        id: "zdydyRadio",
                        boxLabel: "自定义单元",
                        inputValue: "zdydy"
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "dyDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 200,
                height: 50,
                layout: "hbox",
                items: [{
                        xtype: "label",
                        id: "hwLabel1",
                        text: "单元："
                    },
                    {
                        xtype: "vmd.combo",
                        id: "dyCombo",
                        width: 150,
                        beforerender: "dyCombo_beforerender",
                        change: "dyCombo_change",
                        firstSelected: true,
                        cls: "myCombo",
                        listeners: {
                            beforerender: dyCombo_beforerender,
                            change: dyCombo_change
                        }
                    }
                ],
                hidden: this.dyHidden
            },
            {
                xtype: "vmd.div",
                id: "jhDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 200,
                height: 50,
                layout: "hbox",
                items: [{
                        xtype: "label",
                        id: "hwLabel4",
                        text: "井号："
                    },
                    {
                        xtype: "vmd.combo",
                        id: "jhCombo",
                        width: 150,
                        beforerender: "jhCombo_beforerender",
                        firstSelected: true,
                        cls: "myCombo",
                        listeners: {
                            beforerender: jhCombo_beforerender
                        }
                    }
                ],
                hidden: this.jhHidden
            },
            {
                xtype: "vmd.div",
                id: "yearDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 140,
                height: 50,
                layout: "hbox",
                items: [{
                        xtype: "label",
                        id: "hwLabel2",
                        text: "年度："
                    },
                    {
                        xtype: "vmd.dateTime",
                        id: "myYear",
                        text: "dateTime",
                        width: 80,
                        height: 28,
                        format: "yyyy",
                        cls: "myDate",
                        hidden: false,
                        afterrender: "myYear_afterrender",
                        listeners: {
                            vmdafterrender: myYear_afterrender
                        }
                    }
                ],
                hidden: this.yearHidden
            },
            {
                xtype: "vmd.div",
                id: "dateDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 180,
                height: 50,
                layout: "hbox",
                hidden: this.dateHidden,
                items: [{
                        xtype: "label",
                        id: "hwLabel3",
                        text: "日期："
                    },
                    {
                        xtype: "vmd.dateTime",
                        id: "myDate",
                        text: "dateTime",
                        width: 130,
                        height: 28,
                        format: "yyyy-MM-dd",
                        cls: "myDate",
                        afterrender: "myDate_afterrender",
                        listeners: {
                            vmdafterrender: myDate_afterrender
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "periodDateDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 330,
                height: 50,
                layout: "hbox",
                hidden: this.periodDateHidden,
                items: [{
                        xtype: "label",
                        id: "hwLabel6",
                        text: "日期："
                    },
                    {
                        xtype: "vmd.dateTime",
                        id: "startDate",
                        text: "dateTime",
                        width: 130,
                        height: 28,
                        format: "yyyy-MM-dd",
                        cls: "myDate",
                        afterrender: "startDate_afterrender",
                        listeners: {
                            vmdafterrender: startDate_afterrender
                        }
                    },
                    {
                        xtype: "label",
                        id: "hwLabel5",
                        text: "—",
                        margins: "0 5"
                    },
                    {
                        xtype: "vmd.dateTime",
                        id: "endDate",
                        text: "dateTime",
                        width: 130,
                        height: 28,
                        format: "yyyy-MM-dd",
                        cls: "myDate",
                        afterrender: "endDate_afterrender",
                        listeners: {
                            vmdafterrender: endDate_afterrender
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "periodMonthDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 270,
                height: 50,
                layout: "hbox",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "hwLabel7",
                        text: "年月："
                    },
                    {
                        xtype: "vmd.dateTime",
                        id: "startMonth",
                        text: "dateTime",
                        width: 100,
                        height: 28,
                        format: "yyyy-MM",
                        cls: "myDate",
                        afterrender: "startMonth_afterrender",
                        listeners: {
                            vmdafterrender: startMonth_afterrender
                        }
                    },
                    {
                        xtype: "label",
                        id: "hwLabel8",
                        text: "—",
                        margins: "0 5"
                    },
                    {
                        xtype: "vmd.dateTime",
                        id: "endMonth",
                        text: "dateTime",
                        width: 100,
                        height: 28,
                        format: "yyyy-MM",
                        cls: "myDate",
                        afterrender: "endMonth_afterrender",
                        listeners: {
                            vmdafterrender: endMonth_afterrender
                        }
                    }
                ]
            },
            {
                xtype: "vmd.button",
                id: "btnQuery",
                text: "查 询",
                type: "(none)",
                size: "small",
                cls: "vmd-btn",
                margins: "0 10",
                click: "btnQuery_click",
                columnWidth: "",
                style: "margin: 10px 0;",
                listeners: {
                    click: btnQuery_click
                },
                hidden: this.queryHidden
            },
            {
                xtype: "vmd.button",
                id: "btnPrint",
                text: "打 印",
                type: "(none)",
                size: "small",
                cls: "vmd-btn",
                margins: "0 10",
                click: "btnPrint_click",
                style: "margin: 10px 20px;",
                listeners: {
                    click: btnPrint_click
                },
                hidden: this.printHidden
            },
            {
                xtype: "vmd.button",
                id: "btnImport",
                text: "导 入",
                type: "(none)",
                size: "small",
                cls: "vmd-btn",
                margins: "0 10",
                hidden: this.importHidden,
                click: "btnImport_click",
                listeners: {
                    click: btnImport_click
                }
            },
            {
                xtype: "vmd.button",
                id: "btnExport",
                text: "导 出",
                type: "(none)",
                size: "small",
                cls: "vmd-btn",
                margins: "0 10",
                click: "btnExport_click",
                style: "margin: 10px 0;",
                listeners: {
                    click: btnExport_click
                },
                hidden: this.exportHidden
            },
            {
                xtype: "vmd.button",
                id: "btnAdd",
                text: "添 加",
                type: "(none)",
                size: "small",
                cls: "vmd-btn",
                margins: "0 10",
                click: "btnAdd_click",
                hidden: this.addHidden,
                listeners: {
                    click: btnAdd_click
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getDwdm = function() {
            return dwCombo.getValue();
        }
        this.getDwmc = function() {
            return dwCombo.getText();
        }
        this.getDymc = function() {
            return dyCombo.getValue();
        }
        this.getJh = function() {
            return jhCombo.getValue();
        }
        this.getHzjh = function() {
            return jhCombo.getText();
        }
        this.getYear = function() {
            return myYear.getValue();
        }
        this.getDate = function() {
            return myDate.getValue();
        }
        this.getStartDate = function() {
            return startDate.getValue();
        }
        this.getEndDate = function() {
            return endDate.getValue();
        }
        this.getStartMonth = function() {
            return startMonth.getValue();
        }
        this.getEndMonth = function() {
            return endMonth.getValue();
        }
        this.getRadioValue = function() {
            return hwRadioGroup.getValue();
        }
        this.getDylxRadioValue = function() {
            return dyRadioGroup.getValue();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ReportQueryField");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ReportQueryField");
    }
})