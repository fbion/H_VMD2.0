Ext.define("vmd.ux.ChartQueryField", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ChartQueryField",
    layoutConfig: {
        align: "middle",
        pack: "start"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 800,
    height: 50,
    layout: "hbox",
    radioHidden: false,
    monthHidden: true,
    uxCss: ".myDate {    top: 8px !important;    height: 30px !important;    border: 1px solid #e4e4e4 !important;    border-radius: 4px;    padding-left: 5px !important;    background-image: url(\"{vmduxpath}/components/ux/chartqueryfield/1.0/img/calendar.png\") !important;    background-repeat: no-repeat;    background-position: 90%;}.myDate input {    width: 70% !important;    font-size: 12px !important;}.myDate img {    display: none;}.myRadio .x-form-item {    margin-bottom: 0;}.myRadio .x-column-inner {    margin-top: 11px;}",
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

        function btnQuery_click(sender, e) {
            page.fireEvent("queryClick", sender);
        }

        function hwRadioGroup_change(sender, checked) {
            if (checked.inputValue == "day") {
                dateDiv.show();
                monthDiv.hide();
            }
            if (checked.inputValue == "month") {
                dateDiv.hide();
                monthDiv.show();
            }
            page.doLayout();
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
                margins: "0 0 0 5",
                hidden: this.radioHidden,
                cls: "myRadio",
                change: "hwRadioGroup_change",
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
                id: "dateDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 380,
                height: 50,
                layout: "hbox",
                items: [{
                        xtype: "label",
                        id: "dateLabel",
                        text: "起止日期："
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
                        id: "hwLabel",
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
                ],
                hidden: this.dateHidden
            },
            {
                xtype: "vmd.div",
                id: "monthDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 50,
                layout: "hbox",
                hidden: this.monthHidden,
                items: [{
                        xtype: "label",
                        id: "monthLabel",
                        text: "起止年月："
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
                        id: "hwLabel2",
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
                click: "btnQuery_click",
                listeners: {
                    click: btnQuery_click
                },
                hidden: this.queryHidden
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.ChartQueryField");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ChartQueryField");
    }
})