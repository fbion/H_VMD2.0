Ext.define('vmd.ux.data_xlk.Controller', {
    xtype: 'vmd.ux.data_xlk.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.Data_xlk", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Data_xlk",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 621,
    layout: "absolute",
    afterrender: "Data_xlk_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.Data_xlk_afterrender(this)
        }
    },
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
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var store1 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var store2 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });

        function Data_xlk_afterrender(sender) {
            sender.el.dom.childNodes[0].childNodes[0].childNodes[7].onclick = function() {
                var names = parent.sheetHot.getDatasets();
                if (names && names.length > 0) {
                    var nameSet = [];
                    for (var i = 0; i < names.length; i++) {
                        nameSet.push({
                            name: names[i].name,
                            value: names[i].name
                        })
                    }
                }
                if (nameSet) {
                    store.loadData(nameSet);
                }
            }
        }

        function data_dataSet_beforerender(sender) {
            data_dataSet.store = store;
            data_dataSet.valueField = 'value'
            data_dataSet.displayField = 'name'
        }

        function data_saveFiled_beforerender(sender) {
            data_saveFiled.store = store1;
            data_saveFiled.valueField = 'value'
            data_saveFiled.displayField = 'name'
        }

        function data_myDisplayFiled_beforerender(sender) {
            data_myDisplayFiled.store = store2;
            data_myDisplayFiled.valueField = 'value'
            data_myDisplayFiled.displayField = 'name'
        }

        function data_dataSet_selectChanged(sender, combo, record, index) {
            sender.setValue(record.data.name)
            var temp = [];
            var dataSets = parent.sheetHot.getDatasets();
            for (var i = 0; i < dataSets.length; i++) {
                if (dataSets[i].name == record.data.name) {
                    for (var n = 0; n < dataSets[i].fields.length; n++) {
                        temp.push({
                            name: dataSets[i].fields[n],
                            value: dataSets[i].fields[n]
                        })
                    }
                }
            }
            store2.loadData(temp)
            store1.loadData(temp)
            page.fields = temp;
            data_saveFiled.setValue("");
            data_myDisplayFiled.setValue("");
            page.fireEvent('data_dataSet_changed', data_dataSet.getValue())
        }

        function button2_click(sender, e) {
            var cell = parent.sheetHot.dealInvert()[0];
            var sr = cell.sr;
            var sc = cell.sc;
            var urlCode = parent.sheetHot.getCellMeta(sr, sc).cellAttributeInfo.contentInfo.cmbType.value;
            var data = [];
            var data1 = [];
            var cell = sheetHot.dealInvert()[0]
            var meta = sheetHot.getCellMeta(cell.sr, cell.sc);
            if (urlCode == "xlwg") {
                if (meta && meta.filterInfo_xlwg) {
                    for (var i = 0; i < meta.filterInfo_xlwg.length; i++) {
                        data1.push({
                            name: meta.filterInfo_xlwg[i].name,
                            value: meta.filterInfo_xlwg[i].value
                        })
                    }
                }
            } else if (urlCode == "dxan") {
                if (meta && meta.filterInfo_dxan) {
                    for (var i = 0; i < meta.filterInfo_dxan.length; i++) {
                        data1.push({
                            name: meta.filterInfo_dxan[i].name,
                            value: meta.filterInfo_dxan[i].value
                        })
                    }
                }
            } else if (urlCode == "xlk") {
                if (meta && meta.filterInfo_xlk) {
                    for (var i = 0; i < meta.filterInfo_xlk.length; i++) {
                        data1.push({
                            name: meta.filterInfo_xlk[i].name,
                            value: meta.filterInfo_xlk[i].value
                        })
                    }
                }
            }
            var index = 0;
            if (page.fields) {
                for (var n = 0; n < page.fields.length; n++) {
                    var flag = true
                    for (var k = 0; k < data1.length; k++) {
                        if (page.fields[n].name == data1[k].name) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        data.push({
                            name: page.fields[n].name
                        })
                    }
                }
            }
            if (data.length > 0 || data1.length > 0) {
                if (urlCode == "xlwg") {
                    parent.openVisualSelector(data, data1, 'xlwg', true);
                } else if (urlCode == "dxan") {
                    parent.openVisualSelector(data, data1, 'dxan', true);
                } else if (urlCode == "xlk") {
                    parent.openVisualSelector(data, data1, 'xlk', true);
                }
            } else {
                vmd.tip('请先选择拥有字段的数据集', 'error')
            }
        }

        function button1_click(sender, e) {
            var cell = parent.sheetHot.dealInvert()[0];
            var sr = cell.sr;
            var sc = cell.sc;
            var urlCode = parent.sheetHot.getCellMeta(sr, sc).cellAttributeInfo.contentInfo.cmbType.value;
            var data = [];
            var data1 = [];
            var cell = sheetHot.dealInvert()[0]
            var meta = sheetHot.getCellMeta(cell.sr, cell.sc);
            // if (urlCode == "下拉框") {
            //     if (meta && meta.dataInfo_xlk) {
            //         for (var i = 0; i < meta.dataInfo_xlk.length; i++) {
            //             data1.push({
            //                 name: meta.dataInfo_xlk[i].name,
            //                 cnname: meta.dataInfo_xlk[i].cnname,
            //                 width: meta.dataInfo_xlk[i].width,
            //                 search: meta.dataInfo_xlk[i].search
            //             })
            //         }
            //     }
            // } else 
            if (urlCode == "xlwg") {
                if (meta && meta.dataInfo_xlwg) {
                    for (var i = 0; i < meta.dataInfo_xlwg.length; i++) {
                        data1.push({
                            name: meta.dataInfo_xlwg[i].name,
                            cnname: meta.dataInfo_xlwg[i].cnname,
                            width: meta.dataInfo_xlwg[i].width,
                            search: meta.dataInfo_xlwg[i].search
                        })
                    }
                }
            }
            // else if (urlCode == '下拉网格') {
            //     if (meta && meta.dataInfo_xlwg) {
            //         for (var i = 0; i < meta.dataInfo_xlwg.length; i++) {
            //             data1.push({
            //                 name: meta.dataInfo_xlwg[i].name,
            //                 cnname: meta.dataInfo_xlwg[i].cnname,
            //                 width: meta.dataInfo_xlwg[i].width,
            //                 search: meta.dataInfo_xlwg[i].search
            //             })
            //         }
            //     }
            // }
            var index = 0;
            if (page.fields) {
                for (var n = 0; n < page.fields.length; n++) {
                    var flag = true
                    for (var k = 0; k < data1.length; k++) {
                        if (page.fields[n].name == data1[k].name) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        data.push({
                            name: page.fields[n].name
                        })
                    }
                }
            }
            if (data.length > 0 || data1.length > 0) {
                // if (urlCode == "下拉框") {
                //     parent.openVisualSelector(data, data1, 'xlk');
                // } else 
                if (urlCode == "xlwg") {
                    parent.openVisualSelector(data, data1, 'xlwg');
                }
                // else if (urlCode == "下拉网格") {
                //     parent.openVisualSelector(data, data1, 'xlwg');
                // }
            } else {
                vmd.tip('请先选择拥有字段的数据集', 'error')
            }
        }

        function setInfo(info, type) {
            page.type = type;
            if (info) {
                if (type == 'xlk') {
                    data_filterCondition.setValue(info.xlk_filterCondition.value)
                    data_dropDownDisplayColumn.setValue(info.xlk_dropDownDisplayColumn.value)
                    data_myDisplayFiled.setValue(info.xlk_myDisplayFiled.value)
                    data_saveFiled.setValue(info.xlk_saveFiled.value)
                    data_dataSet.setValue(info.xlk_dataSet.value)
                    data_typeSetting.setValue(1)
                    // data_dropDownDisplayColumn.hide()
                    // data_filterCondition.hide()
                    // button1.hide()
                    // button2.hide()
                } else if (type == 'dxan') {
                    data_filterCondition.setValue(info.dxan_filterCondition.value)
                    data_dropDownDisplayColumn.setValue(info.dxan_dropDownDisplayColumn.value)
                    data_myDisplayFiled.setValue(info.dxan_myDisplayFiled.value)
                    data_saveFiled.setValue(info.dxan_saveFiled.value)
                    data_dataSet.setValue(info.dxan_dataSet.value)
                    data_typeSetting.setValue(1)
                    data_dropDownDisplayColumn.hide()
                    data_filterCondition.hide()
                    button1.hide()
                    button2.hide()
                    label4.hide()
                    label5.hide()
                } else
                if (type == 'ddg') {
                    if (info && info[0]) {
                        data_filterCondition.setValue(info[0].ddg_filterCondition.value)
                        data_dropDownDisplayColumn.setValue(info[0].ddg_dropDownDisplayColumn.value)
                        data_myDisplayFiled.setValue(info[0].ddg_myDisplayFiled.value)
                        data_saveFiled.setValue(info[0].ddg_saveFiled.value)
                        data_dataSet.setValue(info[0].ddg_dataSet.value)
                        data_typeSetting.setValue(1)
                    } else {
                        data_filterCondition.setValue(info.ddg_filterCondition.value)
                        data_dropDownDisplayColumn.setValue(info.ddg_dropDownDisplayColumn.value)
                        data_myDisplayFiled.setValue(info.ddg_myDisplayFiled.value)
                        data_saveFiled.setValue(info.ddg_saveFiled.value)
                        data_dataSet.setValue(info.ddg_dataSet.value)
                        data_typeSetting.setValue(1)
                    }
                } else {
                    data_filterCondition.setValue(info.fxk_filterCondition.value)
                    data_dropDownDisplayColumn.setValue(info.fxk_dropDownDisplayColumn.value)
                    data_myDisplayFiled.setValue(info.fxk_myDisplayFiled.value)
                    data_saveFiled.setValue(info.fxk_saveFiled.value)
                    data_dataSet.setValue(info.fxk_dataSet.value)
                    data_typeSetting.setValue(1)
                    data_dropDownDisplayColumn.hide()
                    button1.hide()
                    label4.hide()
                }
                var temp = [];
                var dataSets = parent.sheetHot.getDatasets();
                for (var i = 0; i < dataSets.length; i++) {
                    if (dataSets[i].name == data_dataSet.getValue()) {
                        for (var n = 0; n < dataSets[i].fields.length; n++) {
                            temp.push({
                                name: dataSets[i].fields[n],
                                value: dataSets[i].fields[n]
                            })
                        }
                    }
                }
                store2.loadData(temp)
                store1.loadData(temp)
                page.fields = temp;
            }
        }

        function data_myDisplayFiled_selectChanged(sender, combo, record, index) {
            page.fireEvent('data_myDisplayFiled_changed', sender.getValue())
        }

        function data_typeSetting_change(sender, checked) {
            page.fireEvent('data_typeSetting_changed', sender.getValue())
        }

        function data_saveFiled_selectChanged(sender, combo, record, index) {
            page.fireEvent('data_saveFiled_changed', sender.getValue())
        }

        function data_dropDownDisplayColumn_afterrender(sender) {
            sender.on('change', function() {
                page.fireEvent('data_dropDownDisplayColumn_changed', sender.getValue())
            })
        }

        function data_filterCondition_afterrender(sender) {
            sender.on('change', function() {
                page.fireEvent('data_filterCondition_changed', sender.getValue())
            })
        }
        this.Data_xlk_afterrender = Data_xlk_afterrender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "类型设置：",
                x: 10,
                y: 15
            },
            {
                xtype: "label",
                id: "label1",
                text: "数据集：",
                x: 20,
                y: 50
            },
            {
                xtype: "label",
                id: "label2",
                text: "保存字段：",
                x: 10,
                y: 85
            },
            {
                xtype: "vmd.comlist",
                id: "data_saveFiled",
                width: 195,
                height: 270,
                x: 70,
                y: 80,
                style: "border: 1px solid #dddddd",
                beforerender: "data_saveFiled_beforerender",
                selectChanged: "data_saveFiled_selectChanged",
                listeners: {
                    beforerender: data_saveFiled_beforerender,
                    selectChanged: data_saveFiled_selectChanged
                }
            },
            {
                xtype: "label",
                id: "label3",
                text: "显示字段：",
                x: 10,
                y: 120
            },
            {
                xtype: "vmd.comlist",
                id: "data_myDisplayFiled",
                width: 195,
                height: 270,
                x: 70,
                y: 115,
                style: "border: 1px solid #dddddd",
                beforerender: "data_myDisplayFiled_beforerender",
                selectChanged: "data_myDisplayFiled_selectChanged",
                listeners: {
                    beforerender: data_myDisplayFiled_beforerender,
                    selectChanged: data_myDisplayFiled_selectChanged
                }
            },
            {
                xtype: "radiostoregroup",
                id: "data_typeSetting",
                width: 200,
                height: 40,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "myRadio",
                x: 70,
                y: 10,
                change: "data_typeSetting_change",
                listeners: {
                    change: data_typeSetting_change
                },
                items: [{
                        xtype: "radio",
                        id: "hwRadio",
                        boxLabel: "数据查询",
                        checked: true,
                        inputValue: "1"
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio1",
                        boxLabel: "自定义",
                        inputValue: "0",
                        disabled: true
                    }
                ]
            },
            {
                xtype: "vmd.comlist",
                id: "data_dataSet",
                width: 195,
                height: 270,
                x: 70,
                y: 45,
                style: "border: 1px solid #ddd;",
                beforerender: "data_dataSet_beforerender",
                selectChanged: "data_dataSet_selectChanged",
                listeners: {
                    beforerender: data_dataSet_beforerender,
                    selectChanged: data_dataSet_selectChanged
                }
            },
            {
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 40,
                x: -1,
                y: 145,
                layout: "absolute",
                items: [{
                        xtype: "label",
                        id: "label5",
                        text: "过滤条件：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "textfield",
                        id: "data_filterCondition",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 5,
                        width: 180,
                        style: "border: 1px solid #dddddd",
                        afterrender: "data_filterCondition_afterrender",
                        listeners: {
                            vmdafterrender: data_filterCondition_afterrender
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button2",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 260,
                        y: 5,
                        width: 28,
                        height: 24,
                        click: "button2_click",
                        listeners: {
                            click: button2_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "div2",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 40,
                x: 0,
                y: 180,
                layout: "absolute",
                items: [{
                        xtype: "label",
                        id: "label4",
                        text: "下拉显示列：",
                        x: 0,
                        y: 10
                    },
                    {
                        xtype: "textfield",
                        id: "data_dropDownDisplayColumn",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 5,
                        width: 180,
                        style: "border: 1px solid #dddddd",
                        readOnly: true,
                        disabled: false,
                        afterrender: "data_dropDownDisplayColumn_afterrender",
                        listeners: {
                            vmdafterrender: data_dropDownDisplayColumn_afterrender
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button1",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 260,
                        y: 5,
                        width: 28,
                        height: 24,
                        click: "button1_click",
                        listeners: {
                            click: button1_click
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
        this.setInfo = function(info, type) {
            setInfo(info, type);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.Data_xlk");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Data_xlk");
    }
})