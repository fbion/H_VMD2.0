Ext.define("vmd.ux.MSRelationsConfig", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.MSRelationsConfig",
    title: "Panel",
    header: false,
    border: true,
    width: 281,
    height: 186,
    layout: "border",
    beforerender: "MSRelationsConfig_beforerender",
    afterrender: "MSRelationsConfig_afterrender",
    listeners: {
        beforerender: function() {
            try {
                this.MSRelationsConfig_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.MSRelationsConfig'
                }, ex, 50);
            }
        },
        vmdafterrender: function() {
            try {
                this.MSRelationsConfig_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.MSRelationsConfig'
                }, ex, 50);
            }
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
        try {
            var mstore;
            var sstore;
            var msrelations;
            var msrelationstore;
            var dhgrid;
            var page = this;
            var myDataStore = new dhtmlXDataStore();

            function hwDiv_afterrender(sender) {}
            //初始化从表的字段对应关系
            function msRelationInit(_mstore, _sstore) {
                mstore = _mstore;
                sstore = _sstore;
                //初始化网格数据
                dhgrid = new dhtmlXGridObject(hwDiv.el.dom);
                dhgrid.setImagePath("/lib/dhtmlx/codebase/imgs/");
                dhgrid.setImagePath("/lib/dhtmlx/codebase/imgs/");
                var header = "从表字段,主表字段";
                var colType = "combo,ro"; //"combo,combo";
                var strType = "str,str";
                var colId = "sField,mField";
                dhgrid.setHeader(header, null, ["text-align:center;", "text-align:center;"]);
                dhgrid.setColAlign("center,center");
                dhgrid.setColumnIds(colId);
                dhgrid.setColTypes(colType);
                if (!sstore)
                    return;
                //获取字段对应关系
                msrelations = sstore.getConfigValue('relation') || [];
                //设置从表名称
                lb_storename.setText(sstore.id);
                var sstrstoreconfig = sstore.getConfigValue('storeConfig') || {}
                var sstoreconfig = JSON.parse(sstrstoreconfig);
                var mstrstoreconfig = mstore.getConfigValue('storeConfig') || {}
                var mstoreconfig = JSON.parse(mstrstoreconfig);
                //获取从表的外键信息，
                var mtablename = mstoreconfig.tableName;
                var foreigns = sstoreconfig.foreign || [];
                var foreign = [];
                for (var k = 0; k < foreigns.length; k++) {
                    if (foreigns[k].referenced_table_name == mtablename) {
                        var forCol = foreigns[k].column_name.split(',');
                        var forPCol = foreigns[k].referenced_column_name.split(',');
                        for (var j = 0; j < forCol.length; j++) {
                            foreign.push({
                                constraint_name: foreigns[k].constraint_name,
                                table_name: foreigns[k].table_name,
                                column_name: forCol[j] || "",
                                referenced_table_name: foreigns[k].referenced_table_name,
                                referenced_column_name: forPCol[j] || ""
                            })
                        }
                    }
                }
                //获取从表字段信息
                var sfields = sstoreconfig.fields;
                var scomlist = [];
                if (sfields) {
                    for (var i = 0; i < sfields.length; i++) {
                        scomlist.push({
                            value: sfields[i].name,
                            text: sfields[i].name
                        });
                    }
                }
                //获取主表字段信息
                var mfields = mstoreconfig.fields;
                if (mfields) {
                    if (!msrelations || msrelations.length == 0) {
                        if (foreign.length > 0) {
                            for (var j = 0; j < foreign.length; j++) {
                                for (var i = 0; i < mfields.length; i++) {
                                    if (mfields[i].name.toLowerCase() == foreign[j].referenced_column_name.toLowerCase()) {
                                        msrelations.push({
                                            sField: foreign[j].column_name.toLowerCase(),
                                            mField: mfields[i].name.toLowerCase(),
                                            pk: false
                                        });
                                    }
                                }
                            }
                        } else {
                            for (var i = 0; i < mfields.length; i++) {
                                if (mfields[i].primary == 'Y') {
                                    msrelations.push({
                                        sField: '',
                                        mField: mfields[i].name,
                                        pk: false
                                    });
                                }
                            }
                        }
                    }
                }
                dhgrid.init();
                myDataStore.parse(msrelations);
                dhgrid.sync(myDataStore);
                //添加网格的值修改事件
                dhgrid.attachEvent("onCellChanged", doOnValueChange);
                var sCombo = dhgrid.getColumnCombo(0);
                sCombo.clearAll();
                sCombo.addOption(scomlist);
                //设置级联删除
                if (sstore.cascadeDel)
                    hwCheckbox.setValue(true);
            }

            function doOnCheck(rowId, cellInd, state) {
                if (cellInd == "2")
                    myDataStore.item(rowId).pk = state ? true : false;
                return true;
            }

            function doOnValueChange(rId, cInd, nValue) {
                //设置修改，转换为true false
                if (cInd == "2")
                    myDataStore.item(rId).pk = nValue ? true : false;
                page.fireEvent('relationChange', rId, cInd, nValue);
                return true;
            }
            //获取主从表的字段对应关系
            function getMSRelationInfo() {
                msrelations = []
                var dataRowsID = myDataStore.data.order;
                var dataRows = myDataStore.data.pull;
                for (var i = 0; i < dataRowsID.length; i++) {
                    var dr = dataRows[dataRowsID[i]];
                    msrelations.push({
                        sField: dr.sField,
                        mField: dr.mField,
                        pk: dr.pk
                    })
                }
                return msrelations;
            }
            //获取当前从表的数据是否根据主表级联删除
            function getCascadeDel() {
                return hwCheckbox.getValue();
            }
            //添加对应关系
            function button1_click(sender, e) {
                myDataStore.add({
                    sField: '',
                    mField: '',
                    pk: false
                })
                page.fireEvent('relationChange', e)
            }
            //移除对应关系
            function button2_click(sender, e) {
                var rowid = dhgrid.getSelectedRowId();
                myDataStore.remove(rowid);
                page.fireEvent('relationChange', e)
            }
            //移除从表
            function button_click(sender, e) {
                //判断是够需要移除，并添加事件监听
                Ext.Msg.confirm("提示!", "确定要移除" + mstore.id + "的从表" + sstore.id + "?", function(btn) {
                    if (btn == "yes") {
                        page.fireEvent('removeRelation', e)
                    }
                })
            }

            function hwCheckbox_check(sender, checked) {
                sstore.setConfig('cascadeDel', checked);
            }
            var state = true;

            function getstate() {
                return state;
            }

            function button3_click(sender, e) {
                if (state) {
                    page.setHeight(40)
                    page.doLayout();
                    button3.addClass('icon-caret-right')
                    button3.removeClass('icon-caret-down')
                    //button2.setVisible(false)
                    //button1.setVisible(false)
                    page.fireEvent('sizechange', e)
                    state = false;
                } else {
                    page.setHeight(190)
                    page.doLayout();
                    button3.addClass('icon-caret-down')
                    button3.removeClass('icon-caret-right')
                    //button2.setVisible(true)
                    //button1.setVisible(true)
                    page.fireEvent('sizechange', e)
                    state = true;
                }
            }

            function setTableTitle(title) { //设置从表名称
                if (sstore)
                    lb_storename.setText(title + sstore.id);
            }

            function MSRelationsConfig_beforerender(sender) {}

            function button3_afterrender(sender) {
                button3.addClass('icon-caret-down')
            }

            function MSRelationsConfig_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.MSRelationsConfig',
                p2: ex.message
            }, ex, 100);
        }
        this.MSRelationsConfig_afterrender = MSRelationsConfig_afterrender;
        this.MSRelationsConfig_beforerender = MSRelationsConfig_beforerender;
        this.items = [{
                xtype: "vmd.div",
                id: "hwDiv1",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 30,
                region: "north",
                layout: "border",
                style: "margin-top: 5px",
                items: [{
                        xtype: "vmd.div",
                        id: "hwDiv3",
                        layoutConfig: {
                            align: "middle",
                            padding: "0 0 0 15"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 200,
                        height: 50,
                        region: "center",
                        layout: "hbox",
                        items: [{
                                xtype: "vmd.button",
                                id: "button3",
                                type: "text",
                                size: "small",
                                width: 20,
                                height: 25,
                                click: "button3_click",
                                afterrender: "button3_afterrender",
                                listeners: {
                                    click: button3_click,
                                    vmdafterrender: button3_afterrender
                                }
                            },
                            {
                                xtype: "label",
                                id: "lb_storename",
                                text: "从表1：storename",
                                x: 20,
                                y: 10
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv4",
                        layoutConfig: {
                            align: "middle"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 80,
                        height: 50,
                        region: "east",
                        layout: "hbox",
                        items: [{
                                xtype: "vmd.div",
                                id: "hwDiv7",
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                width: 39,
                                height: 25,
                                items: [{
                                        xtype: "vmd.button",
                                        id: "button1",
                                        type: "text",
                                        size: "small",
                                        x: 220,
                                        y: 5,
                                        icon: "icon-plus",
                                        click: "button1_click",
                                        hidden: true,
                                        listeners: {
                                            click: button1_click
                                        }
                                    },
                                    {
                                        xtype: "vmd.button",
                                        id: "button2",
                                        type: "text",
                                        size: "small",
                                        x: 250,
                                        y: 5,
                                        icon: "icon-minus",
                                        click: "button2_click",
                                        hidden: true,
                                        listeners: {
                                            click: button2_click
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: "vmd.button",
                                id: "button",
                                type: "text",
                                size: "small",
                                x: 180,
                                y: 2,
                                icon: "icon-trash",
                                style: "color: red;    font-size:16px;",
                                click: "button_click",
                                margins: "0 0 0 10",
                                listeners: {
                                    click: button_click
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv5",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 400,
                height: 50,
                region: "center",
                layout: "border",
                items: [{
                        xtype: "vmd.div",
                        id: "hwDiv2",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 50,
                        region: "center",
                        layout: "fit",
                        style: "padding: 10px 15px 10px 15px",
                        items: [{
                            xtype: "vmd.div",
                            id: "hwDiv",
                            autoEl: "div",
                            border: true,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 260,
                            height: 150,
                            x: 10,
                            y: 30,
                            afterrender: "hwDiv_afterrender",
                            listeners: {
                                vmdafterrender: hwDiv_afterrender
                            }
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv6",
                        layoutConfig: {
                            align: "middle",
                            padding: "0 0 0 25"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 33,
                        region: "north",
                        layout: "hbox",
                        disabled: false,
                        hidden: true,
                        items: [{
                                xtype: "label",
                                id: "hwLabel",
                                text: "级联删除："
                            },
                            {
                                xtype: "checkbox",
                                id: "hwCheckbox",
                                fieldLabel: "Checkbox",
                                check: "hwCheckbox_check",
                                listeners: {
                                    check: hwCheckbox_check
                                }
                            }
                        ]
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.initRelation = function(mstore, sstore) {
            //直接填写方法内容
            msRelationInit(mstore, sstore)
        }
        this.getMSRelationInfo = function() {
            //直接填写方法内容
            return getMSRelationInfo();
        }
        this.getSstore = function() {
            //直接填写方法内容
            return sstore;
        }
        this.openstate = function() {
            //直接填写方法内容
            return getstate()
        }
        this.setTitle = function(title) {
            //直接填写方法内容
            setTableTitle(title)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.MSRelationsConfig");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.MSRelationsConfig");
    }
})