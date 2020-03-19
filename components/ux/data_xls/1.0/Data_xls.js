Ext.define('vmd.ux.data_xls.Controller', {
    xtype: 'vmd.ux.data_xls.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.Data_xls", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Data_xls",
    title: "Panel",
    header: false,
    border: false,
    width: 320,
    height: 621,
    layout: "absolute",
    afterrender: "Data_xls_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.Data_xls_afterrender(this)
        }
    },
    uxCss: ".b{    border:1px solid #ccc}",
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
        var hot = parent.sheetHot;
        var page = this
        var store1 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var store2 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var store3 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var store4 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var store5 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var store6 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var store7 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });

        function xls_dataSet_beforerender(sender) {
            xls_dataSet.store = store1;
            xls_dataSet.displayField = 'name';
            xls_dataSet.valueField = 'value'
        }

        function Data_xls_afterrender(sender) {
            sender.items.items[1].el.dom.parentElement.onclick = function() {
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
                    store1.loadData(nameSet);
                }
            }
        }

        function xls_dataSet_selectChanged(sender, combo, record, index) {
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
            store2.loadData(temp)
            store3.loadData(temp)
            store4.loadData(temp)
            store5.loadData(temp)
            store6.loadData(temp)
            store7.loadData(temp)
            xls_myDisplayFiled.setValue("");
            xls_myNodeFiled.setValue("");
            xls_myFatherFiled.setValue("");
            xls_rootValue.setValue("");
            xls_rootNodeText.setValue("");
            xls_myValueFiled.setValue("");
        }

        function xls_myDisplayFiled_beforerender(sender) {
            xls_myDisplayFiled.store = store2;
            xls_myDisplayFiled.displayField = 'name';
            xls_myDisplayFiled.valueField = 'value'
        }

        function xls_myValueFiled_beforerender(sender) {
            xls_myValueFiled.store = store3;
            xls_myValueFiled.displayField = 'name';
            xls_myValueFiled.valueField = 'value'
        }

        function xls_myNodeFiled_beforerender(sender) {
            xls_myNodeFiled.store = store4;
            xls_myNodeFiled.displayField = 'name';
            xls_myNodeFiled.valueField = 'value'
        }

        function xls_rootValue_beforerender(sender) {
            xls_rootValue.store = store5;
            xls_rootValue.displayField = 'name';
            xls_rootValue.valueField = 'value'
        }

        function xls_rootNodeText_beforerender(sender) {
            xls_rootNodeText.store = store6;
            xls_rootNodeText.displayField = 'name';
            xls_rootNodeText.valueField = 'value'
        }

        function xls_myFatherFiled_beforerender(sender) {
            xls_myFatherFiled.store = store7;
            xls_myFatherFiled.displayField = 'name';
            xls_myFatherFiled.valueField = 'value'
        }

        function setInfo(info) {
            debugger
            if (info) {
                xls_dataSet.setValue(info.xls_dataSet.value);
                xls_myDisplayFiled.setValue(info.xls_myDisplayFiled.value);
                xls_myNodeFiled.setValue(info.xls_myNodeFiled.value);
                xls_myFatherFiled.setValue(info.xls_myFatherFiled.value);
                xls_rootValue.setValue(info.xls_rootValue.value);
                xls_rootNodeText.setValue(info.xls_rootNodeText.value);
                xls_myValueFiled.setValue(info.xls_myValueFiled.value);
                filter_xls.setValue(info.filter_xls.value)
                temp = [];
                var dataSets = parent.sheetHot.getDatasets();
                for (var i = 0; i < dataSets.length; i++) {
                    if (dataSets[i].name == xls_dataSet.getValue()) {
                        for (var n = 0; n < dataSets[i].fields.length; n++) {
                            temp.push({
                                name: dataSets[i].fields[n],
                                value: dataSets[i].fields[n]
                            })
                        }
                    }
                }
                store2.loadData(temp)
                store3.loadData(temp)
                store4.loadData(temp)
                store5.loadData(temp)
                store6.loadData(temp)
                store7.loadData(temp)
            }
        }

        function button_click(sender, e) {
            var data = [];
            var data1 = [];
            var cell = sheetHot.dealInvert()[0]
            var meta = sheetHot.getCellMeta(cell.sr, cell.sc);
            if (meta && meta.filterInfo_xls) {
                for (var i = 0; i < meta.filterInfo_xls.length; i++) {
                    data1.push({
                        name: meta.filterInfo_xls[i].name,
                        cnname: meta.filterInfo_xls[i].cnname,
                        width: meta.filterInfo_xls[i].width,
                        search: meta.filterInfo_xls[i].search
                    })
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
                parent.openVisualSelector(data, data1, 'xls', true);
            } else {
                vmd.tip('请先选择拥有字段的数据集', 'error')
            }
        }
        this.Data_xls_afterrender = Data_xls_afterrender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "数据集：",
                x: 30,
                y: 15
            },
            {
                xtype: "vmd.comlist",
                id: "xls_dataSet",
                width: 180,
                height: 270,
                x: 80,
                y: 10,
                style: "border: 1px solid #dddddd",
                beforerender: "xls_dataSet_beforerender",
                selectChanged: "xls_dataSet_selectChanged",
                listeners: {
                    beforerender: xls_dataSet_beforerender,
                    selectChanged: xls_dataSet_selectChanged
                }
            },
            {
                xtype: "vmd.comlist",
                id: "xls_myDisplayFiled",
                width: 180,
                height: 270,
                x: 80,
                y: 45,
                style: "border: 1px solid #dddddd",
                beforerender: "xls_myDisplayFiled_beforerender",
                listeners: {
                    beforerender: xls_myDisplayFiled_beforerender
                }
            },
            {
                xtype: "vmd.comlist",
                id: "xls_myFatherFiled",
                width: 180,
                height: 270,
                x: 80,
                y: 220,
                style: "border: 1px solid #dddddd",
                beforerender: "xls_myFatherFiled_beforerender",
                listeners: {
                    beforerender: xls_myFatherFiled_beforerender
                }
            },
            {
                xtype: "vmd.comlist",
                id: "xls_myNodeFiled",
                width: 180,
                height: 270,
                x: 80,
                y: 115,
                style: "border: 1px solid #dddddd",
                beforerender: "xls_myNodeFiled_beforerender",
                listeners: {
                    beforerender: xls_myNodeFiled_beforerender
                }
            },
            {
                xtype: "vmd.comlist",
                id: "xls_rootValue",
                width: 180,
                height: 270,
                x: 80,
                y: 150,
                style: "border: 1px solid #dddddd",
                beforerender: "xls_rootValue_beforerender",
                listeners: {
                    beforerender: xls_rootValue_beforerender
                }
            },
            {
                xtype: "vmd.comlist",
                id: "xls_rootNodeText",
                width: 180,
                height: 270,
                x: 80,
                y: 185,
                style: "border: 1px solid #dddddd",
                beforerender: "xls_rootNodeText_beforerender",
                listeners: {
                    beforerender: xls_rootNodeText_beforerender
                }
            },
            {
                xtype: "vmd.comlist",
                id: "xls_myValueFiled",
                width: 180,
                height: 270,
                x: 80,
                y: 80,
                style: "border: 1px solid #dddddd",
                beforerender: "xls_myValueFiled_beforerender",
                listeners: {
                    beforerender: xls_myValueFiled_beforerender
                }
            },
            {
                xtype: "label",
                id: "label1",
                text: "显示字段：",
                x: 20,
                y: 50
            },
            {
                xtype: "label",
                id: "label2",
                text: "父列字段：",
                x: 20,
                y: 225
            },
            {
                xtype: "label",
                id: "label3",
                text: "节点字段：",
                x: 20,
                y: 120
            },
            {
                xtype: "label",
                id: "label4",
                text: "根值：",
                x: 40,
                y: 155
            },
            {
                xtype: "label",
                id: "label5",
                text: "根节点文本：",
                x: 10,
                y: 190
            },
            {
                xtype: "label",
                id: "label6",
                text: "值字段：",
                x: 30,
                y: 85,
                height: 20
            },
            {
                xtype: "textfield",
                id: "filter_xls",
                allowBlank: true,
                enableKeyEvents: true,
                x: 80,
                y: 255,
                cls: "b",
                width: 160
            },
            {
                xtype: "label",
                id: "label7",
                text: "过滤条件：",
                x: 20,
                y: 260
            },
            {
                xtype: "vmd.button",
                id: "button",
                text: "...",
                type: "(none)",
                size: "small",
                x: 250,
                y: 255,
                width: 30,
                click: "button_click",
                listeners: {
                    click: button_click
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
            if (att == "xls_dataSet") {
                temp = xls_dataSet.getValue()
            } else if (att == "xls_myDisplayFiled") {
                temp = xls_myDisplayFiled.getValue()
            } else if (att == "xls_myFatherFiled") {
                temp = xls_myFatherFiled.getValue()
            } else if (att == "xls_myNodeFiled") {
                temp = xls_myNodeFiled.getValue()
            } else if (att == "xls_rootNodeText") {
                temp = xls_rootNodeText.getValue()
            } else if (att == "xls_rootValue") {
                temp = xls_rootValue.getValue()
            } else if (att == "xls_myValueFiled") {
                temp = xls_myValueFiled.getValue()
            }
            return temp;
        }
        this.setInfo = function(info) {
            setInfo(info);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.Data_xls");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Data_xls");
    }
})