Ext.define('vmd.ux.uploadType.Controller', {
    xtype: 'vmd.ux.uploadType.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.UploadType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.UploadType",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 621,
    layout: "absolute",
    beforerender: "UploadType_beforerender",
    listeners: {
        beforerender: function() {
            this.UploadType_beforerender(this)
        }
    },
    uxCss: ".b{    border: 1px solid #dddddd;    }",
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

        function setInfo(info, cell) {
            
            if (info) {
                var hot = sheetHot;
                var canWrite = false;
                var cell = hot.dealInvert()[0];
                var mArr = hot.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
                var sel = hot.dealInvert()[0];
                var count = 0;
                if (mArr.length > 0) {
                    for (var x = 0; x < mArr.length; x++) {
                        for (var i = sel.sr; i < sel.er + 1; i++) {
                            for (var n = sel.sc; n < sel.ec + 1; n++) {
                                if (mArr[x].row == i && mArr[x].col == n) {
                                    count++;
                                    if (count == 1) no = x;
                                }
                            }
                        }
                    }
                    if (count == 1) {
                        if (mArr[no].row + mArr[no].rowspan - 1 == sel.er && mArr[no].col + mArr[no].colspan - 1 == sel.ec) {
                            canWrite = true;
                        }
                    }
                }
                if (canWrite || (cell.sr == cell.er && cell.sc == cell.ec)) {
                    info = sheetHot.getCellMeta(cell.sr, cell.sc).cellAttributeInfo.cell_UploadInfo;
                    sczj_Type.setValue(info.sczj_Type.value)
                    sczj_max.setValue(info.sczj_max.value)
                    sczj_everyPage.setValue(info.sczj_everyPage.value)
                    sczj_everyRow.setValue(info.sczj_everyRow.value)
                    sczj_add.setValue(info.sczj_add.checked)
                    sczj_delete.setValue(info.sczj_delete.checked)
                    sczj_addText.setValue(info.sczj_addText.value)
                    sczj_deleteText.setValue(info.sczj_deleteText.value)
                    sczj_display.setValue(info.sczj_display.value)
                    sczj_wdk.setValue(info.sczj_wdk.checked)
                } else {
                    sczj_Type.setValue(info[0].sczj_Type.value)
                    sczj_max.setValue(info[0].sczj_max.value)
                    sczj_everyPage.setValue(info[0].sczj_everyPage.value)
                    sczj_everyRow.setValue(info[0].sczj_everyRow.value)
                    sczj_add.setValue(info[0].sczj_add.checked)
                    sczj_delete.setValue(info[0].sczj_delete.checked)
                    sczj_addText.setValue(info[0].sczj_addText.value)
                    sczj_deleteText.setValue(info[0].sczj_deleteText.value)
                    sczj_display.setValue(info[0].sczj_display.value)
                    sczj_wdk.setValue(info[0].sczj_wdk.checked)
                }
            }
        }

        function div1_click(sender, e) {
            
            sczj_max.setValue(parseInt(sczj_max.getValue()) + 1)
            page.fireEvent('uploadDecimalChanged', sczj_max, sczj_max.getValue())
        }

        function div2_click(sender, e) {
            
            if (sczj_max.getValue() > 0) {
                sczj_max.setValue(parseInt(sczj_max.getValue()) - 1)
            } else {
                sczj_max.setValue(0)
            }
            page.fireEvent('uploadDecimalChanged', sczj_max, sczj_max.getValue())
        }

        function sczj_Type_change(sender, checked) {
            if (checked && checked.inputValue == '1') {
                //  sczj_wdk.hide()
                picDiv.show()
            } else {
                //  sczj_wdk.show()
                picDiv.hide()
            }
        }

        function sczj_deleteText_afterrender(sender) {}

        function UploadType_beforerender(sender) {}

        function sczj_wdk_check(sender, checked) {
            // if (checked) {
            //     var wdkHost = (vmd.projectInfo && vmd.projectInfo.docIp) || "";
            //     if(wdkHost == ""){
            //         vmd.tip('未正确配置文档中心，','error')
            //     }
            // }
        }
        this.UploadType_beforerender = UploadType_beforerender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "类型：",
                x: 10,
                y: 16
            },
            {
                xtype: "radiostoregroup",
                id: "sczj_Type",
                width: 260,
                height: 30,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "myRadio",
                x: 50,
                y: 10,
                change: "sczj_Type_change",
                listeners: {
                    change: sczj_Type_change
                },
                items: [{
                        xtype: "radio",
                        id: "hwRadio",
                        boxLabel: "文档",
                        checked: true,
                        inputValue: "0"
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio1",
                        boxLabel: "图片",
                        inputValue: "1"
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio2",
                        boxLabel: "视频",
                        disabled: true,
                        inputValue: "2"
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio3",
                        boxLabel: "音频",
                        disabled: true,
                        inputValue: "3"
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 290,
                height: 580,
                x: 0,
                y: 40,
                layout: "absolute",
                hidden: false,
                items: [{
                        xtype: "label",
                        id: "label1",
                        text: "允许最多上传",
                        x: 35,
                        y: 15
                    },
                    {
                        xtype: "numberfield",
                        id: "sczj_max",
                        allowDecimals: true,
                        allowNegative: true,
                        decimalPrecision: 2,
                        allowBlank: true,
                        x: 120,
                        y: 10,
                        width: 120,
                        style: "border: 1px solid #dddddd",
                        cls: "b"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div1",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 220,
                        y: 10,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div1_click",
                        listeners: {
                            click: div1_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div2",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 20,
                        height: 15,
                        x: 220,
                        y: 20,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div2_click",
                        listeners: {
                            click: div2_click
                        }
                    },
                    {
                        xtype: "label",
                        id: "label2",
                        text: "个",
                        x: 290,
                        y: 15,
                        width: 10
                    },
                    {
                        xtype: "label",
                        id: "label3",
                        text: "布局：",
                        x: 10,
                        y: 50
                    },
                    {
                        xtype: "label",
                        id: "label4",
                        text: "每页显示",
                        x: 57,
                        y: 50
                    },
                    {
                        xtype: "label",
                        id: "label5",
                        text: "每行显示",
                        x: 57,
                        y: 84
                    },
                    {
                        xtype: "numberfield",
                        id: "sczj_everyPage",
                        allowDecimals: true,
                        allowNegative: true,
                        decimalPrecision: 2,
                        allowBlank: true,
                        x: 120,
                        y: 45,
                        style: "border: 1px solid #dddddd",
                        width: 120
                    },
                    {
                        xtype: "numberfield",
                        id: "sczj_everyRow",
                        allowDecimals: true,
                        allowNegative: true,
                        decimalPrecision: 2,
                        allowBlank: true,
                        x: 120,
                        y: 80,
                        style: "border: 1px solid #dddddd",
                        width: 120
                    },
                    {
                        xtype: "vmd.button",
                        id: "aaa",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 46,
                        height: 24,
                        width: 28
                    },
                    {
                        xtype: "vmd.button",
                        id: "bbb",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 80,
                        height: 24,
                        width: 28
                    },
                    {
                        xtype: "label",
                        id: "label6",
                        text: "张",
                        x: 290,
                        y: 50
                    },
                    {
                        xtype: "label",
                        id: "label7",
                        text: "张",
                        x: 290,
                        y: 84
                    },
                    {
                        xtype: "label",
                        id: "label8",
                        text: "权限控制：",
                        x: 10,
                        y: 118
                    },
                    {
                        xtype: "checkbox",
                        id: "sczj_add",
                        fieldLabel: "Checkbox",
                        boxLabel: "添加",
                        x: 20,
                        y: 146,
                        checked: true
                    },
                    {
                        xtype: "checkbox",
                        id: "sczj_delete",
                        fieldLabel: "Checkbox",
                        boxLabel: "删除",
                        x: 20,
                        y: 180,
                        checked: true
                    },
                    {
                        xtype: "textfield",
                        id: "sczj_addText",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 146,
                        style: "border: 1px solid #dddddd",
                        width: 170
                    },
                    {
                        xtype: "textfield",
                        id: "sczj_deleteText",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 180,
                        style: "border: 1px solid #dddddd",
                        width: 170,
                        afterrender: "sczj_deleteText_afterrender",
                        listeners: {
                            vmdafterrender: sczj_deleteText_afterrender
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "ccc",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 146,
                        height: 24,
                        width: 28,
                        disabled: true
                    },
                    {
                        xtype: "vmd.button",
                        id: "ddd",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 180,
                        height: 24,
                        width: 28,
                        disabled: true
                    },
                    {
                        xtype: "vmd.div",
                        id: "picDiv",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 250,
                        height: 280,
                        x: 20,
                        y: 240,
                        layout: "absolute",
                        hidden: true,
                        items: [{
                                xtype: "label",
                                id: "label9",
                                text: "展示效果：",
                                x: 10,
                                y: 0
                            },
                            {
                                xtype: "radiostoregroup",
                                id: "sczj_display",
                                width: 210,
                                height: 250,
                                labelField: "label",
                                valueField: "value",
                                checkedField: "checked",
                                boxFieldName: "myRadio",
                                x: 30,
                                y: 20,
                                items: [{
                                        xtype: "radio",
                                        id: "hwRadio8",
                                        boxLabel: "等比例缩放",
                                        checked: true,
                                        inputValue: "EqualScaling",
                                        width: 85
                                    },
                                    {
                                        xtype: "radio",
                                        id: "hwRadio5",
                                        boxLabel: "拉伸",
                                        inputValue: "Extend",
                                        width: 52
                                    },
                                    {
                                        xtype: "radio",
                                        id: "hwRadio6",
                                        boxLabel: "横向拉伸",
                                        inputValue: "Hextend",
                                        width: 85
                                    },
                                    {
                                        xtype: "radio",
                                        id: "hwRadio7",
                                        boxLabel: "纵向拉伸",
                                        inputValue: "Vextens",
                                        width: 115
                                    },
                                    {
                                        xtype: "radio",
                                        id: "hwRadio4",
                                        boxLabel: "图片实际大小",
                                        checked: false,
                                        inputValue: "ActualSize",
                                        width: 104
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: "checkbox",
                        id: "sczj_wdk",
                        fieldLabel: "Checkbox",
                        boxLabel: "上传文档库",
                        x: 20,
                        y: 210,
                        check: "sczj_wdk_check",
                        listeners: {
                            check: sczj_wdk_check
                        }
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info, cell) {
            setInfo(info, cell)
        }
        this.getInfo = function(att) {
            var temp;
            if (att == "sczj_document_max") {
                temp = sczj_document_max.getValue()
            } else if (att == "sczj_document_everyPage") {
                temp = sczj_document_everyPage.getValue()
            } else if (att == "sczj_document_everyRow") {
                temp = sczj_document_everyRow.getValue()
            } else if (att == "sczj_document_add") {
                temp = sczj_document_add.getValue()
            } else if (att == "sczj_document_delete") {
                temp = sczj_document_delete.getValue()
            } else if (att == "sczj_document_addText") {
                temp = sczj_document_addText.getValue()
            } else if (att == "sczj_document_deleteText") {
                temp = sczj_document_deleteText.getValue()
            } else if (att == "sczj_pic_max") {
                temp = sczj_pic_max.getValue()
            } else if (att == "sczj_pic_everyRow") {
                temp = sczj_pic_everyRow.getValue()
            } else if (att == "sczj_pic_everyPage") {
                temp = sczj_pic_everyPage.getValue()
            } else if (att == "sczj_pic_add") {
                temp = sczj_pic_add.getValue()
            } else if (att == "sczj_pic_delete") {
                temp = sczj_pic_delete.getValue()
            } else if (att == "sczj_pic_addText") {
                temp = sczj_pic_addText.getValue()
            } else if (att == "sczj_pic_deleteText") {
                temp = sczj_pic_deleteText.getValue()
            } else if (att == "sczj_pic_display") {
                temp = sczj_pic_display.getValue()
            }
            return temp
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.UploadType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.UploadType");
    }
})