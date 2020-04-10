Ext.define('vmd.ux.reporting.Controller', {
    xtype: 'vmd.ux.reporting.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.Reporting1", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Reporting1",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 290,
    height: 670,
    layout: "fit",
    uxCss: ".b{    border: 1px solid #ddd}",
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
        try {
            var page = this;
            page.first = true;

            function button_click(sender, e) {
                if (typeof sheetHot == 'undefined') vmd.alert('警告', '请首先选择嵌套表子表任意单元格激活子表填报设置')
                if (typeof sheetHot != 'undefined') sheetHot.addCheck(checkList);
            }

            function button3_click(sender, e) {
                if (typeof sheetHot == 'undefined') vmd.alert('警告', '请首先选择嵌套表子表任意单元格激活子表填报设置')
                if (typeof sheetHot != 'undefined') sheetHot.addSubmit();
            }

            function button4_click(sender, e) {
                if (typeof sheetHot == 'undefined') vmd.alert('警告', '请首先选择嵌套表子表任意单元格激活子表填报设置')
                if (typeof sheetHot != 'undefined') sheetHot.delSubmit();
            }

            function button1_click(sender, e) {
                if (typeof sheetHot == 'undefined') vmd.alert('警告', '请首先选择嵌套表子表任意单元格激活子表填报设置')
                if (typeof sheetHot != 'undefined') sheetHot.delCheck();
            }

            function button2_click(sender, e) {
                debugger
                if (typeof sheetHot == 'undefined') vmd.alert('警告', '请首先选择嵌套表子表任意单元格激活子表填报设置')
                debugger
                if (typeof sheetHot != 'undefined') parent.openVisualEditor(10, enter_store_express.getValue());
            }

            function button5_click(sender, e) {
                if (typeof sheetHot == 'undefined') vmd.alert('警告', '请首先选择嵌套表子表任意单元格激活子表填报设置')
                //字段绑定按钮
                if (typeof sheetHot != 'undefined') sheetHot.fieldBinding();
            }

            function re_expression_keyup(sender, e) {
                if (typeof sheetHot == 'undefined') vmd.alert('警告', '请首先选择嵌套表子表任意单元格激活子表填报设置')
                if (typeof sheetHot != 'undefined') {
                    if (sheetHot.checkId) {
                        var ca = sheetHot.checkArray;
                        for (var i = 0; i < ca.length; i++) {
                            if (sheetHot.checkId == ca[i].id) {
                                ca[i].expression = re_expression.getValue() || ''
                            }
                        }
                    }
                }
            }

            function re_checkName_keyup(sender, e) {
                if (typeof sheetHot == 'undefined') vmd.alert('警告', '请首先选择嵌套表子表任意单元格激活子表填报设置')
                if (typeof sheetHot != 'undefined') {
                    if (sheetHot.checkId) {
                        var ca = sheetHot.checkArray;
                        for (var i = 0; i < ca.length; i++) {
                            if (sheetHot.checkId == ca[i].id) {
                                ca[i].name = re_checkName.getValue()
                                sheetHot.checkListRedraw()
                                return
                            }
                        }
                    }
                }
            }

            function button6_click(sender, e) {
                if (typeof sheetHot == 'undefined') vmd.alert('警告', '请首先选择嵌套表子表任意单元格激活子表填报设置')
                if (typeof sheetHot != 'undefined') sheetHot.refreshSubmit();
            }

            function panel1_afterrender(sender) {
                // if (typeof sheetHot != 'undefined') sheetHot.setSaveSubmit();
            }

            function panel_afterrender(sender) {
                // if (typeof sheetHot != 'undefined') sheetHot.setSaveCheck();
            }

            function MyTabs_tabchange(sender, tab) {
                if (typeof sheetHot != 'undefined') {
                    if (tab.title == '提交') {
                        sheetHot.setSaveSubmit();
                    } else {
                        sheetHot.setSaveCheck();
                    }
                }
            }

            function hwCheckbox_check(sender, checked) {
                if (typeof sheetHot != 'undefined') {
                    if (sheetHot.submitId) {
                        for (var i = 0; i < sheetHot.submitArray.length; i++) {
                            if (sheetHot.submitArray[i].id == sheetHot.submitId && sheetHot.liid == sheetHot.submitId) {
                                sheetHot.submitArray[i].updatemode = checked;
                            }
                        }
                    } else {
                        return false;
                    }
                }
            }
            // 清空信息
            function clearAllSubmitInfo() {
                checkList.html = "<ul></ul>";
                submitList.html = "<ul></ul>";
                if (checkList.el && checkList.el.dom) {
                    checkList.el.dom.innerHTML = "<ul></ul>";
                }
                if (submitList.el && submitList.el.dom) {
                    submitList.el.dom.innerHTML = "<ul></ul>";
                }
                re_checkName.setValue("");
                re_expression.setValue("");
                // re_immediate.setValue(false);
                re_alert.setValue("");
                // hwCheckbox.setValue(true);
                sheetHot.removeAllSubmit();
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.Reporting1',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
            xtype: "tabpanel",
            id: "MyTabs",
            activeTab: 0,
            height: 150,
            width: 500,
            tabchange: "MyTabs_tabchange",
            listeners: {
                tabchange: MyTabs_tabchange
            },
            items: [{
                    xtype: "panel",
                    id: "panel",
                    title: "校验",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "absolute",
                    afterrender: "panel_afterrender",
                    listeners: {
                        vmdafterrender: panel_afterrender
                    },
                    items: [{
                            xtype: "vmd.button",
                            id: "button",
                            text: "添加",
                            type: "(none)",
                            size: "small",
                            x: 175,
                            y: 10,
                            click: "button_click",
                            listeners: {
                                click: button_click
                            }
                        },
                        {
                            xtype: "vmd.button",
                            id: "button1",
                            text: "删除",
                            type: "(none)",
                            size: "small",
                            x: 230,
                            y: 10,
                            click: "button1_click",
                            listeners: {
                                click: button1_click
                            }
                        },
                        {
                            xtype: "label",
                            id: "label",
                            text: "表达式：",
                            x: 15,
                            y: 270
                        },
                        {
                            xtype: "textfield",
                            id: "re_expression",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 75,
                            y: 270,
                            width: 160,
                            keyup: "re_expression_keyup",
                            listeners: {
                                keyup: re_expression_keyup
                            }
                        },
                        {
                            xtype: "vmd.button",
                            id: "button2",
                            text: "...",
                            type: "(none)",
                            size: "small",
                            x: 245,
                            y: 270,
                            click: "button2_click",
                            listeners: {
                                click: button2_click
                            }
                        },
                        {
                            xtype: "label",
                            id: "label1",
                            text: "错误提示：",
                            x: 5,
                            y: 310
                        },
                        {
                            xtype: "textarea",
                            id: "re_alert",
                            allowBlank: true,
                            x: 75,
                            y: 305,
                            width: 200,
                            height: 100
                        },
                        {
                            xtype: "checkbox",
                            id: "re_immediate",
                            fieldLabel: "Checkbox",
                            boxLabel: "即时",
                            x: 15,
                            y: 420
                        },
                        {
                            xtype: "vmd.dataview",
                            id: "checkList",
                            width: 270,
                            height: 180,
                            itemSelector: "li.info",
                            overClass: "info-hover",
                            selectedClass: "x-view-selected",
                            singleSelect: true,
                            multiSelect: false,
                            autoScroll: true,
                            tpl: "<ul></ul>",
                            data: "var data = [{    \"id\": 1,    \"picname\": \"border-layout.gif\",    \"name\": \"Border Layout\",    \"desc\": \"方位布局\"}, {    \"id\": 2,    \"picname\": \"layout-accordion.gif\",    \"name\": \"Accordion Layout\",    \"desc\": \"手风琴布局\"}, {    \"id\": 3,    \"picname\": \"layout-anchor.gif\",    \"name\": \"Accordion Layout\",    \"desc\": \"百分比布局\"}, {    \"id\": 4,    \"picname\": \"layout-form.gif\",    \"name\": \"Absolute Layout\",    \"desc\": \"绝对定位布局\"}, {    \"id\": 5,    \"picname\": \"layout-column.gif\",    \"name\": \"Column Layout\",    \"desc\": \"列布局\"}, {    \"id\": 6,    \"picname\": \"layout-table.gif\",    \"name\": \"Table Layout\",    \"desc\": \"表格布局\"}];return data;",
                            x: 10,
                            y: 45,
                            cls: "b"
                        },
                        {
                            xtype: "label",
                            id: "label2",
                            text: "名称：",
                            x: 25,
                            y: 240
                        },
                        {
                            xtype: "textfield",
                            id: "re_checkName",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 75,
                            y: 235,
                            width: 160,
                            keyup: "re_checkName_keyup",
                            listeners: {
                                keyup: re_checkName_keyup
                            }
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel1",
                    title: "提交",
                    header: true,
                    border: true,
                    height: 100,
                    layout: "absolute",
                    afterrender: "panel1_afterrender",
                    listeners: {
                        vmdafterrender: panel1_afterrender
                    },
                    items: [{
                            xtype: "vmd.button",
                            id: "button3",
                            text: "添加",
                            type: "(none)",
                            size: "small",
                            x: 175,
                            y: 10,
                            click: "button3_click",
                            listeners: {
                                click: button3_click
                            }
                        },
                        {
                            xtype: "vmd.button",
                            id: "button4",
                            text: "删除",
                            type: "(none)",
                            size: "small",
                            x: 230,
                            y: 10,
                            click: "button4_click",
                            listeners: {
                                click: button4_click
                            }
                        },
                        {
                            xtype: "vmd.button",
                            id: "button5",
                            text: "字段绑定",
                            type: "(none)",
                            size: "small",
                            x: 150,
                            y: 230,
                            click: "button5_click",
                            listeners: {
                                click: button5_click
                            }
                        },
                        {
                            xtype: "vmd.dataview",
                            id: "submitList",
                            width: 270,
                            height: 170,
                            itemSelector: "li.info",
                            overClass: "info-hover",
                            selectedClass: "x-view-selected",
                            singleSelect: true,
                            multiSelect: false,
                            autoScroll: true,
                            tpl: "<ul></ul>",
                            data: "var data = [{    \"id\": 1,    \"picname\": \"border-layout.gif\",    \"name\": \"Border Layout\",    \"desc\": \"方位布局\"}, {    \"id\": 2,    \"picname\": \"layout-accordion.gif\",    \"name\": \"Accordion Layout\",    \"desc\": \"手风琴布局\"}, {    \"id\": 3,    \"picname\": \"layout-anchor.gif\",    \"name\": \"Accordion Layout\",    \"desc\": \"百分比布局\"}, {    \"id\": 4,    \"picname\": \"layout-form.gif\",    \"name\": \"Absolute Layout\",    \"desc\": \"绝对定位布局\"}, {    \"id\": 5,    \"picname\": \"layout-column.gif\",    \"name\": \"Column Layout\",    \"desc\": \"列布局\"}, {    \"id\": 6,    \"picname\": \"layout-table.gif\",    \"name\": \"Table Layout\",    \"desc\": \"表格布局\"}];return data;",
                            x: 10,
                            y: 50,
                            cls: "b"
                        },
                        {
                            xtype: "panel",
                            id: "fieldBinding",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 280,
                            x: 10,
                            y: 270,
                            width: 270,
                            cls: "b",
                            html: "<table style=\" min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse; padding:2px;\">    <tr>        <td style=\"border:1px solid #ccc;width:90px;font-size:14px;\">字段</td>        <td style=\"border:1px solid #ccc;width:90px;font-size:14px;\">绑定对象</td>        <td style=\"border:1px solid #ccc;width:90px;font-size:14px;\">禁重</td>    </tr></table>",
                            autoScroll: true
                        },
                        {
                            xtype: "vmd.button",
                            id: "button6",
                            text: "刷新",
                            type: "(none)",
                            size: "small",
                            x: 230,
                            y: 230,
                            click: "button6_click",
                            disabled: false,
                            listeners: {
                                click: button6_click
                            }
                        },
                        {
                            xtype: "checkbox",
                            id: "hwCheckbox",
                            fieldLabel: "Checkbox",
                            boxLabel: "值不改变不更新",
                            x: 10,
                            y: 232,
                            check: "hwCheckbox_check",
                            checked: true,
                            listeners: {
                                check: hwCheckbox_check
                            }
                        },
                        {
                            xtype: "label",
                            id: "hwLabel",
                            text: "入库条件：",
                            x: 15,
                            y: 570
                        },
                        {
                            xtype: "textfield",
                            id: "enter_store_express",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 75,
                            y: 565,
                            width: 160
                        },
                        {
                            xtype: "vmd.button",
                            id: "button7",
                            text: "...",
                            type: "(none)",
                            size: "small",
                            x: 245,
                            y: 565,
                            click: "button2_click",
                            listeners: {
                                click: button2_click
                            }
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
        this.setInfo = function(sheet) {
            //直接填写方法内容
            if (sheet) {
                selfSet(sheet)
            }
            clearAllSubmitInfo();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.Reporting1");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Reporting1");
    }
})