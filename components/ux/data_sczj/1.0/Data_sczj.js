Ext.define('vmd.ux.data_sczj.Controller', {
    xtype: 'vmd.ux.data_sczj.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.Data_sczj", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Data_sczj",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 621,
    layout: "absolute",
    afterrender: "Data_sczj_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.Data_sczj_afterrender(this)
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
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        /////////////////////////////////////////////////////
        var store1 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        /////////////////////////////////////////////////////
        var store2 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        /////////////////////////////////////////////////////
        var store3 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        /////////////////////////////////////////////////////
        var store4 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        /////////////////////////////////////////////////////
        var store5 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        /////////////////////////////////////////////////////
        function sczj_dataSet_beforerender(sender) {
            sczj_dataSet.store = store;
            sczj_dataSet.displayField = "name"
            sczj_dataSet.valueField = "id"
        }

        function sczj_dataPath_beforerender(sender) {
            sczj_dataPath.store = store1;
            sczj_dataPath.displayField = "name"
            sczj_dataPath.valueField = "id"
        }

        function sczj_dataName_beforerender(sender) {
            sczj_dataName.store = store2;
            sczj_dataName.displayField = "name"
            sczj_dataName.valueField = "id"
        }

        function sczj_dataSize_beforerender(sender) {
            sczj_dataSize.store = store3;
            sczj_dataSize.displayField = "name"
            sczj_dataSize.valueField = "id"
        }

        function sczj_dataType_beforerender(sender) {
            sczj_dataId.store = store4;
            sczj_dataId.displayField = "name"
            sczj_dataId.valueField = "id"
        }

        function sczj_dataId_beforerender(sender) {
            sczj_dataType.store = store5;
            sczj_dataType.displayField = "name"
            sczj_dataType.valueField = "id"
        }

        function sczj_dataSet_afterrender(sender) {
            var el = sender.el.dom.parentElement.parentElement.childNodes[6];
            el.onclick = function() {
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

        function sczj_dataSet_selectChanged(sender, combo, record, index) {
            sender.setValue(record.data.name)
            temp = [];
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
            store1.loadData(temp)
            store2.loadData(temp)
            store3.loadData(temp)
            store4.loadData(temp)
            store5.loadData(temp)
            sczj_dataPath.setValue("");
            sczj_dataName.setValue("");
            sczj_dataSize.setValue("");
            sczj_dataType.setValue("");
            sczj_dataId.setValue("")
        }

        function sczj_dataPath_selectChanged(sender, combo, record, index) {
            sender.setValue(record.data.name)
        }

        function sczj_dataName_selectChanged(sender, combo, record, index) {
            sender.setValue(record.data.name)
        }

        function sczj_dataSize_selectChanged(sender, combo, record, index) {
            sender.setValue(record.data.name)
        }

        function sczj_dataType_selectChanged(sender, combo, record, index) {
            sender.setValue(record.data.name)
        }

        function sczj_dataId_selectChanged(sender, combo, record, index) {
            sender.setValue(record.data.name)
        }

        function setInfo(info) {
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
                    info = parent.sheetHot.getCellMeta(cell.sr, cell.sc).cellAttributeInfo.cell_UploadInfo;
                    sczj_dataId.setValue(info.sczj_dataId.value);
                    sczj_dataName.setValue(info.sczj_dataName.value);
                    sczj_dataPath.setValue(info.sczj_dataPath.value);
                    sczj_dataSet.setValue(info.sczj_dataSet.value);
                    sczj_dataSize.setValue(info.sczj_dataSize.value);
                    sczj_dataType.setValue(info.sczj_dataType.value)
                } else {
                    sczj_dataId.setValue(info[0].sczj_dataId.value);
                    sczj_dataName.setValue(info[0].sczj_dataName.value);
                    sczj_dataPath.setValue(info[0].sczj_dataPath.value);
                    sczj_dataSet.setValue(info[0].sczj_dataSet.value);
                    sczj_dataSize.setValue(info[0].sczj_dataSize.value);
                    sczj_dataType.setValue(info[0].sczj_dataType.value)
                }
            }
        }

        function Data_sczj_afterrender(sender) {}
        this.Data_sczj_afterrender = Data_sczj_afterrender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "数据集：",
                x: 10,
                y: 15
            },
            {
                xtype: "label",
                id: "label1",
                text: "路径：",
                x: 20,
                y: 50
            },
            {
                xtype: "label",
                id: "label2",
                text: "名称：",
                x: 20,
                y: 85
            },
            {
                xtype: "label",
                id: "label3",
                text: "大小：",
                x: 20,
                y: 120
            },
            {
                xtype: "label",
                id: "label4",
                text: "类型：",
                x: 20,
                y: 155
            },
            {
                xtype: "label",
                id: "label5",
                text: "文档ID：",
                x: 6,
                y: 190
            },
            {
                xtype: "vmd.comlist",
                id: "sczj_dataSet",
                width: 220,
                height: 270,
                x: 60,
                y: 10,
                style: "border: 1px solid #dddddd",
                afterrender: "sczj_dataSet_afterrender",
                beforerender: "sczj_dataSet_beforerender",
                selectChanged: "sczj_dataSet_selectChanged",
                listeners: {
                    vmdafterrender: sczj_dataSet_afterrender,
                    beforerender: sczj_dataSet_beforerender,
                    selectChanged: sczj_dataSet_selectChanged
                }
            },
            {
                xtype: "vmd.comlist",
                id: "sczj_dataPath",
                width: 220,
                height: 270,
                x: 60,
                y: 45,
                style: "border: 1px solid #dddddd",
                beforerender: "sczj_dataPath_beforerender",
                selectChanged: "sczj_dataPath_selectChanged",
                listeners: {
                    beforerender: sczj_dataPath_beforerender,
                    selectChanged: sczj_dataPath_selectChanged
                }
            },
            {
                xtype: "vmd.comlist",
                id: "sczj_dataName",
                width: 220,
                height: 270,
                x: 60,
                y: 80,
                style: "border: 1px solid #dddddd",
                beforerender: "sczj_dataName_beforerender",
                selectChanged: "sczj_dataName_selectChanged",
                listeners: {
                    beforerender: sczj_dataName_beforerender,
                    selectChanged: sczj_dataName_selectChanged
                }
            },
            {
                xtype: "vmd.comlist",
                id: "sczj_dataSize",
                width: 220,
                height: 270,
                x: 60,
                y: 115,
                style: "border: 1px solid #dddddd",
                beforerender: "sczj_dataSize_beforerender",
                selectChanged: "sczj_dataSize_selectChanged",
                listeners: {
                    beforerender: sczj_dataSize_beforerender,
                    selectChanged: sczj_dataSize_selectChanged
                }
            },
            {
                xtype: "vmd.comlist",
                id: "sczj_dataType",
                width: 220,
                height: 270,
                x: 60,
                y: 150,
                style: "border: 1px solid #dddddd",
                beforerender: "sczj_dataType_beforerender",
                selectChanged: "sczj_dataType_selectChanged",
                listeners: {
                    beforerender: sczj_dataType_beforerender,
                    selectChanged: sczj_dataType_selectChanged
                }
            },
            {
                xtype: "vmd.comlist",
                id: "sczj_dataId",
                width: 220,
                height: 270,
                x: 60,
                y: 185,
                style: "border: 1px solid #dddddd",
                beforerender: "sczj_dataId_beforerender",
                selectChanged: "sczj_dataId_selectChanged",
                listeners: {
                    beforerender: sczj_dataId_beforerender,
                    selectChanged: sczj_dataId_selectChanged
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getInfo = function(att) {
            var temp;
            if (att == "sczj_dataId") {
                temp = sczj_dataId.getValue()
            } else if (att == "sczj_dataName") {
                temp = sczj_dataName.getValue()
            } else if (att == "sczj_dataPath") {
                temp = sczj_dataPath.getValue()
            } else if (att == "sczj_dataSet") {
                temp = sczj_dataSet.getValue()
            } else if (att == "sczj_dataSize") {
                temp = sczj_dataSize.getValue()
            } else if (att == "sczj_dataType") {
                temp = sczj_dataType.getValue()
            }
            return temp;
        }
        this.setInfo = function(info) {
            setInfo(info)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.Data_sczj");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Data_sczj");
    }
})