Ext.define('vmd.ux.cellTypeProperty.Controller', {
    xtype: 'vmd.ux.cellTypeProperty.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.CellTypeProperty", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.ComboTypeProperty$1.0$ComboTypeProperty", "vmd.ux.NestedTableType$1.0$NestedTableType", "vmd.ux.TextTypeProperty$1.0$TextTypeProperty", "vmd.ux.ProgressBarType$1.0$ProgressBarType", "vmd.ux.GraphicType$1.0$GraphicType", "vmd.ux.DateProperty$1.0$DateProperty", "vmd.ux.UploadProperty$1.0$UploadProperty", "vmd.ux.RichTextProperty$1.0$RichTextProperty", "vmd.ux.CheckBoxProperty$1.0$CheckBoxProperty", "vmd.ux.NumberProperty$1.0$NumberProperty", "vmd.ux.ApprovlProperty$1.0$ApprovlProperty", "vmd.ux.RadioButtonProperty$1.0$RadioButtonProperty", "vmd.ux.DropDownTreeProperty$1.0$DropDownTreeProperty", "vmd.ux.DropDownGridProperty$1.0$DropDownGridProperty", "vmd.ux.ButtonProperty$1.0$ButtonProperty"]),
    version: "1.0",
    xtype: "vmd.ux.CellTypeProperty",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 656,
    layout: "absolute",
    beforerender: "CellTypeProperty_beforerender",
    autoScroll: true,
    listeners: {
        beforerender: function() {
            this.CellTypeProperty_beforerender(this)
        }
    },
    uxCss: ".b{    border: 1px solid #ddd}",
    uxrequirejs: "[\"lib/ace/ace.js\",\"lib/ace/mode-base.js\",\"lib/ace/theme-xcode.js\",\"lib/ace/ext-language_tools.js\"]",
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
        // if(page.o && page.o.nestedNo) {
        //     page.qtb = page.o.nestedNo;
        // }else{
        //     page.qtb = null;
        // }
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['cellType', 'describe']
        });
        var data = [{
                cellType: 'cg',
                describe: '常规'
            },
            {
                cellType: 'wb',
                describe: '文本'
            }, {
                cellType: 'sz',
                describe: '数字'
            }, {
                cellType: 'xlk',
                describe: '下拉框'
            }, {
                cellType: 'xls',
                describe: '下拉树'
            }, {
                cellType: 'xlwg',
                describe: '下拉网格'
            }, {
                cellType: 'dxan',
                describe: '单选按钮'
            }, {
                cellType: 'fxk',
                describe: '复选框'
            }, {
                cellType: 'sczj',
                describe: '上传组件'
            }, {
                cellType: 'qtb',
                describe: '嵌套表'
            }, {
                cellType: 'fwb',
                describe: '富文本'
            },
            // {
            //     cellType: 'tx',
            //     describe: '图形'
            // }, {
            //     cellType: 'jdt',
            //     describe: '进度条'
            // },
            {
                cellType: 'spzj',
                describe: '审批组件'
            }, {
                cellType: 'rq',
                describe: '日期'
            }, {
                cellType: 'an',
                describe: '按钮'
            }
        ];
        store.loadData(data);
        //
        function cmbType_beforerender(sender) {
            cmbType.store = store;
            cmbType.displayField = 'describe';
            cmbType.valueField = 'cellType'
        }
        //下拉框全部隐藏
        function closeOther() {
            TextTypeProperty.hide();
            ComboTypeProperty.hide();
            CheckBoxProperty.hide();
            NumberProperty.hide()
            RadioButtonProperty.hide()
            UploadProperty.hide()
            ApprovlProperty.hide()
            DropDownTreeProperty.hide()
            RichTextProperty.hide()
            NestedTableType.hide()
            GraphicType.hide()
            hwButtonProperty.hide()
            ProgressBarType.hide()
            DateProperty.hide()
            hwButtonProperty.hide();
            hwDropDownGridProperty.hide()
        }

        function TextTypeProperty_lengthMax(sender, value) {
            setCellStyle(value, null, sender)
        }

        function TextTypeProperty_lengthMin(sender, value) {
            setCellStyle(value, null, sender)
        }

        function setInfo(info, sheet, obj) {
            page.info = info;
            page.o = sheet;
            page.cells = obj;
            if (page.info && page.info.cellAttributeInfo && page.info.cellAttributeInfo.cellInfoToJson) {
                var d = page.info.cellAttributeInfo.cellInfoToJson();
                cmbType.setValue(d.contentInfo[0].cmbType.value)
                var selected = d.contentInfo[0].cmbType.value;
                closeOther();
                if (selected == "an") {
                    if (d) {
                        hwButtonProperty.setInfo(d)
                    }
                    hwButtonProperty.show()
                }
                if (selected == "wb") {
                    if (d) {
                        TextTypeProperty.setInfo(d)
                    }
                    TextTypeProperty.show()
                }
                if (selected == "sz") {
                    if (d) {
                        NumberProperty.setInfo(d)
                    }
                    NumberProperty.show()
                }
                if (selected == "xlk") {
                    if (d) {
                        ComboTypeProperty.setInfo(d)
                    }
                    ComboTypeProperty.show()
                }
                if (selected == "dxan") {
                    if (d) {
                        RadioButtonProperty.setInfo(d)
                    }
                    RadioButtonProperty.show()
                }
                if (selected == "fxk") {
                    if (d) {
                        CheckBoxProperty.setInfo(d)
                    }
                    CheckBoxProperty.show()
                }
                if (selected == "sczj") {
                    if (d) {
                        UploadProperty.setInfo(d)
                    }
                    UploadProperty.show()
                }
                if (selected == "qtb") {
                    if (d) {
                        NestedTableType.setInfo(d.cell_NestedTableInfo[0], page.o)
                    }
                    NestedTableType.show()
                }
                if (selected == "fwb") {
                    if (d) {
                        RichTextProperty.setInfo(d)
                    } //有事件
                    RichTextProperty.show()
                }
                // if(selected == "tx") {
                //     if(d) {
                //         GraphicType.setInfo(d.cell_GraphicInfo[0])
                //     }
                //     GraphicType.show()
                // }
                // if(selected == "jdt") {
                //     if(d) {
                //         ProgressBarType.setInfo(d.cell_ProgressBarInfo[0])
                //     }
                //     ProgressBarType.show()
                // }
                if (selected == "spzj") {
                    if (d) {
                        ApprovlProperty.setInfo(d)
                    }
                    ApprovlProperty.show()
                }
                if (selected == "rq") {
                    if (d) {
                        DateProperty.setInfo(d)
                    }
                    DateProperty.show();
                }
                if (selected == "xls") { //只有数据和事件
                    if (d) {
                        DropDownTreeProperty.setInfo(d, page.cells)
                    }
                    DropDownTreeProperty.show()
                }
                if (selected == 'xlwg') {
                    if (d) {
                        hwDropDownGridProperty.setInfo(d, page.cells);
                    }
                    hwDropDownGridProperty.show();
                }
            }
            // cmbType_selectChanged()
        }

        function setCellStyle(value, type, sender) {
            if (page.info) {
                var temp = page.info.cellAttributeInfo;
                for (var i = 0; i < page.cells.length; i++) {
                    temp.setCellInfos(sender.initialConfig.id, value);
                    page.o.setCellMeta(page.cells[i].r, page.cells[i].c, 'cellAttributeInfo', temp)
                    page.o.setCellMeta(page.cells[i].r, page.cells[i].c, 'theCellChanged', true)
                }
            }
        }

        function setData(id, value) {
            if (page.info) {
                var temp = page.info.cellAttributeInfo;
                for (var i = 0; i < page.cells.length; i++) {
                    temp.setCellInfos(id, value);
                    page.o.setCellMeta(page.cells[i].r, page.cells[i].c, 'cellAttributeInfo', temp)
                    page.o.setCellMeta(page.cells[i].r, page.cells[i].c, 'theCellChanged', true)
                }
            }
        }

        function cmbType_selectChanged(sender, combo, record, index) {
            closeOther()
            if (page.info) {
                var d = page.info.cellAttributeInfo.cellInfoToJson();
                switch (cmbType.getText()) {
                    case "文本":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        TextTypeProperty.show();
                        TextTypeProperty.setInfo(d)
                        break;
                    case "数字":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        NumberProperty.show();
                        NumberProperty.setInfo(d)
                        break;
                    case "下拉框":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        ComboTypeProperty.show();
                        ComboTypeProperty.setInfo(d)
                        break;
                    case "单选按钮":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        RadioButtonProperty.show();
                        RadioButtonProperty.setInfo(d)
                        break;
                    case "复选框":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        CheckBoxProperty.show();
                        CheckBoxProperty.setInfo(d)
                        break;
                    case "上传组件":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        UploadProperty.show();
                        UploadProperty.setInfo(page.info.cellAttributeInfo)
                        break;
                    case "审批组件":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        ApprovlProperty.show();
                        ApprovlProperty.setInfo(d)
                        break;
                    case "日期":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        DateProperty.show()
                        DateProperty.setInfo(d)
                        break;
                    case "按钮":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        hwButtonProperty.show();
                        hwButtonProperty.setInfo(d)
                        break;
                    case "嵌套表":
                        if (page.o && page.o.nestedNo == null) {
                            page.o.nestedTableHandle();
                        }
                        NestedTableType.show();
                        NestedTableType.setInfo(d.cell_NestedTableInfo[0])
                        break;
                        // case "图形":
                        //     if(page.o && page.o.nestedNo != null) {
                        //         page.o.nestedTableHandle();
                        //     }
                        //     GraphicType.show();
                        //     GraphicType.setInfo(d.cell_GraphicInfo[0])
                        //     break;
                        // case "进度条":
                        //     if(page.o && page.o.nestedNo != null) {
                        //         page.o.nestedTableHandle();
                        //     }
                        //     ProgressBarType.show();
                        //     ProgressBarType.setInfo(d.cell_ProgressBarInfo[0])
                        //     break;
                    case "富文本":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        RichTextProperty.show();
                        RichTextProperty.setInfo(d)
                        break;
                    case "下拉树":
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        DropDownTreeProperty.show();
                        DropDownTreeProperty.setInfo(page.info.cellAttributeInfo)
                        break;
                    case '按钮':
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        hwButtonProperty.show();
                        hwButtonProperty.setInfo(page.info.cellAttributeInfo);
                        break;
                    case '下拉网格':
                        debugger
                        if (page.o && page.o.nestedNo != null) {
                            page.o.nestedTableHandle();
                        }
                        hwDropDownGridProperty.show();
                        hwDropDownGridProperty.setInfo(page.info.cellAttributeInfo);
                        break;
                }
            }
        }

        function NumberProperty_thePageChange(sender, value) {
            setCellStyle(value, null, sender)
        }

        function DropDownTreeProperty_DropDownTreeWidthChange(sender, value) {
            setCellStyle(value, null, sender)
        }

        function ComboTypeProperty_widthChange(sender, value, describe) {
            setCellStyle(value, null, sender)
        }

        function UploadProperty_UploadChange(sender, value) {
            setCellStyle(value, null, sender)
        }

        function RichTextProperty_RTPChange(sender, value) {
            setCellStyle(value, null, sender)
        }

        function RadioButtonProperty_RBPchange(sender, value) {
            setCellStyle(value, null, sender)
        }

        function TextTypeProperty_lengthChange(sender, value) {
            debugger
            setCellStyle(value, null, sender)
        }

        function ProgressBarType_pbtDecimalChanged(sender, value, describe) {
            setCellStyle(value, null, sender)
        }

        function ProgressBarType_pbtColorChanged(sender, value, describe) {
            setCellStyle(value, null, sender)
        }

        function ApprovlProperty_APchange(sender, value) {
            setCellStyle(value, null, sender)
        }

        function ComboTypeProperty_putData(id, value) {
            setData(id, value)
        }

        function RadioButtonProperty_putData(id, value) {
            setData(id, value)
        }

        function CheckBoxProperty_putData(id, value) {
            setData(id, value)
        }

        function hwDropDownGridProperty_putData(sender, id, value) {
            setData(id, value)
        }

        function CellTypeProperty_afterrender(sender) {}

        function CellTypeProperty_beforerender(sender) {}
        this.CellTypeProperty_afterrender = CellTypeProperty_afterrender;
        this.CellTypeProperty_beforerender = CellTypeProperty_beforerender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "类型：",
                x: 10,
                y: 10,
                height: 20
            },
            {
                xtype: "vmd.comlist",
                id: "cmbType",
                width: 220,
                height: 270,
                x: 50,
                y: 7,
                beforerender: "cmbType_beforerender",
                selectChanged: "cmbType_selectChanged",
                listeners: {
                    beforerender: cmbType_beforerender,
                    selectChanged: cmbType_selectChanged
                }
            },
            {
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 290,
                height: 656,
                x: -1,
                y: 40,
                layout: "fit",
                hidden: false,
                items: [{
                        xtype: "vmd.ux.ComboTypeProperty",
                        id: "ComboTypeProperty",
                        layout: "fit",
                        x: 510,
                        y: 40,
                        height: 618,
                        hidden: true,
                        width: 328,
                        widthChange: "ComboTypeProperty_widthChange",
                        putData: "ComboTypeProperty_putData",
                        listeners: {
                            widthChange: ComboTypeProperty_widthChange,
                            putData: ComboTypeProperty_putData
                        }
                    },
                    {
                        xtype: "vmd.ux.NestedTableType",
                        id: "NestedTableType",
                        layout: "absolute",
                        hidden: true,
                        width: 328,
                        height: 618
                    },
                    {
                        xtype: "vmd.ux.TextTypeProperty",
                        id: "TextTypeProperty",
                        layout: "fit",
                        hidden: true,
                        width: 328,
                        height: 618,
                        disabled: false,
                        lengthChange: "TextTypeProperty_lengthChange",
                        listeners: {
                            lengthChange: TextTypeProperty_lengthChange
                        }
                    },
                    {
                        xtype: "vmd.ux.ProgressBarType",
                        id: "ProgressBarType",
                        layout: "absolute",
                        hidden: true,
                        width: 328,
                        height: 618,
                        pbtDecimalChanged: "ProgressBarType_pbtDecimalChanged",
                        pbtColorChanged: "ProgressBarType_pbtColorChanged",
                        listeners: {
                            pbtDecimalChanged: ProgressBarType_pbtDecimalChanged,
                            pbtColorChanged: ProgressBarType_pbtColorChanged
                        }
                    },
                    {
                        xtype: "vmd.ux.GraphicType",
                        id: "GraphicType",
                        layout: "absolute",
                        hidden: true,
                        width: 328,
                        height: 618
                    },
                    {
                        xtype: "vmd.ux.DateProperty",
                        id: "DateProperty",
                        layout: "fit",
                        hidden: true
                    },
                    {
                        xtype: "vmd.ux.UploadProperty",
                        id: "UploadProperty",
                        layout: "fit",
                        hidden: true,
                        UploadChange: "UploadProperty_UploadChange",
                        listeners: {
                            UploadChange: UploadProperty_UploadChange
                        }
                    },
                    {
                        xtype: "vmd.ux.RichTextProperty",
                        id: "RichTextProperty",
                        layout: "fit",
                        hidden: true,
                        RTPChange: "RichTextProperty_RTPChange",
                        listeners: {
                            RTPChange: RichTextProperty_RTPChange
                        }
                    },
                    {
                        xtype: "vmd.ux.CheckBoxProperty",
                        id: "CheckBoxProperty",
                        layout: "fit",
                        hidden: true,
                        putData: "CheckBoxProperty_putData",
                        listeners: {
                            putData: CheckBoxProperty_putData
                        }
                    },
                    {
                        xtype: "vmd.ux.NumberProperty",
                        id: "NumberProperty",
                        layout: "fit",
                        hidden: true,
                        thePageChange: "NumberProperty_thePageChange",
                        listeners: {
                            thePageChange: NumberProperty_thePageChange
                        }
                    },
                    {
                        xtype: "vmd.ux.ApprovlProperty",
                        id: "ApprovlProperty",
                        layout: "fit",
                        hidden: true,
                        APchange: "ApprovlProperty_APchange",
                        listeners: {
                            APchange: ApprovlProperty_APchange
                        }
                    },
                    {
                        xtype: "vmd.ux.RadioButtonProperty",
                        id: "RadioButtonProperty",
                        layout: "fit",
                        hidden: true,
                        RBPchange: "RadioButtonProperty_RBPchange",
                        putData: "RadioButtonProperty_putData",
                        listeners: {
                            RBPchange: RadioButtonProperty_RBPchange,
                            putData: RadioButtonProperty_putData
                        }
                    },
                    {
                        xtype: "vmd.ux.DropDownTreeProperty",
                        id: "DropDownTreeProperty",
                        layout: "fit",
                        hidden: true,
                        DropDownTreeWidthChange: "DropDownTreeProperty_DropDownTreeWidthChange",
                        listeners: {
                            DropDownTreeWidthChange: DropDownTreeProperty_DropDownTreeWidthChange
                        }
                    },
                    {
                        xtype: "vmd.ux.DropDownGridProperty",
                        id: "hwDropDownGridProperty",
                        layout: "fit",
                        disabled: false,
                        hidden: true,
                        putData: "hwDropDownGridProperty_putData",
                        listeners: {
                            putData: hwDropDownGridProperty_putData
                        }
                    },
                    {
                        xtype: "vmd.ux.ButtonProperty",
                        id: "hwButtonProperty",
                        layout: "absolute",
                        hidden: true
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info, cell, obj) {
            //直接填写方法内容
            setInfo(info, cell, obj);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.CellTypeProperty");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.CellTypeProperty");
    }
})