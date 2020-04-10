Ext.define("vmd.ux.MSRelations", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.MSRelationsConfig$1.0$MSRelationsConfig"]),
    version: "1.0",
    xtype: "vmd.ux.MSRelations",
    title: "Panel",
    header: false,
    border: false,
    width: 285,
    height: 600,
    layout: "border",
    beforerender: "MSRelations_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.MSRelations_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.MSRelations'
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
            function hwDiv1_afterrender(sender) {}
            var mstore;
            var MSRelationsCmps = []

            function initMSRelations(masterstore) {
                //初始化，先清空从表对应关系，对应关系组件；
                for (var i = 0; i < MSRelationsCmps.length; i++) {
                    hwDiv1.remove(MSRelationsCmps[i].cmp)
                }
                hwDiv1.doLayout()
                MSRelationsCmps = []
                //combo.setValue("")
                //combo.setText("")
                //combo.clearAll()
                //设置当前操作的主表
                mstore = masterstore
                if (!mstore) //未设置主表 返回
                    return;
                hwLabel1.setText(mstore.id); //设置主表名称
                mstoreslave = mstore.getConfigValue('slave') || [] //获取主表的从表信息
                _setStoreIsMaster(mstore); //设置主表  目前是否为主从表
                //如果存在从表，遍历从表信息，并添加到主从配置中
                if (mstoreslave && mstoreslave.length > 0) {
                    for (var i = 0; i < mstoreslave.length; i++) {
                        var slavestore = xds.inspector.nodeHash[mstoreslave[i]]
                        if (!slavestore)
                            continue;
                        slavestore = slavestore.component;
                        //循环添加从表组件
                        var MSRelationsConfig = new vmd.ux.MSRelationsConfig({
                            id: "MSRelationsConfig_" + mstoreslave[i],
                            anchor: "100% "
                        });
                        //动态添加地址替换组件，根据有多少不同的地址进行添加
                        hwDiv1.insert(MSRelationsCmps.length, MSRelationsConfig)
                        //添加从表字段对应关系的组件移除事件
                        MSRelationsConfig.on('removeRelation', function(sender) {
                            var removemscmp;
                            //从组件列表中找到移除的组件
                            for (var i = 0; i < MSRelationsCmps.length; i++) {
                                if (MSRelationsCmps[i].id === this.id) {
                                    removemscmp = MSRelationsCmps[i]
                                    break;
                                }
                            }
                            //获取移除组件的数据集
                            removestore = removemscmp.cmp.getSstore();
                            //设置从表移除后的主从关系调整
                            changeStoreInfo(mstore, removestore, 'remove');
                            //将从表组件从配置界面中移除
                            MSRelationsCmps.remove(removemscmp);
                            hwDiv1.remove(this);
                            hwDiv1.doLayout();
                            //调整移除从表后，主表是否还是主从表
                            _setStoreIsMaster(mstore);
                            //调整移除后的数据表是否为主从表
                            _setStoreIsMaster(removestore);
                            //移除之后设置下拉中只有能够添加为从表的数据表
                            resetComboList();
                            settablename()
                        })
                        //处理从表的对应管理改变的逻辑
                        MSRelationsConfig.on('relationChange', function(sender) {
                            var editmscmp
                            //获取编辑的从表组件
                            for (var i = 0; i < MSRelationsCmps.length; i++) {
                                if (this.id == MSRelationsCmps[i].id) {
                                    editmscmp = MSRelationsCmps[i]
                                    break;
                                }
                            }
                            //修改从表改变后的数据集调整
                            changeStoreInfo(mstore, editmscmp.cmp.getSstore(), 'edit')
                        }) //处理从表的对应管理改变的逻辑
                        MSRelationsConfig.on('sizechange', function(sender) {
                            if (this.openstate()) {
                                this.setHeight(40);
                            } else
                                this.setHeight(190);
                            this.doLayout()
                            hwDiv1.doLayout();
                            return true;
                        })
                        //从表组件列表
                        MSRelationsCmps.push({
                            id: "MSRelationsConfig_" + mstoreslave[i],
                            cmp: MSRelationsConfig
                        })
                        hwDiv1.doLayout();
                        //初始化当前主表的主从关系配置界面
                        MSRelationsConfig.initRelation(mstore, slavestore);
                    }
                }
                //hwDiv1.add(hwDiv7)
                hwDiv1.doLayout();
                //初始化完成之后设置下拉中只有能够添加为从表的数据表
                //resetComboList();
                settablename()
            }
            //设置下拉框中允许添加为从表的数据表
            function resetComboList() {
                //获取能够作为子表的数据表
                var SlaveStore = getSlaveStore() || [];
                scomlist = [];
                for (var i = 0; i < SlaveStore.length; i++) {
                    scomlist.push({
                        value: SlaveStore[i],
                        text: SlaveStore[i]
                    });
                }
                combo.clearAll();
                combo.addOption(scomlist);
            }
            //设置数据集是否为主从表
            function _setStoreIsMaster(_store) {
                //根据是否包含主表master和从表slave属性来判断 ，设置isMaster
                _storeslave = _store.getConfigValue('slave') || []
                if (_storeslave.length <= 0 && !_store.getConfigValue("master")) {
                    _store.setConfig('isMaster', false);
                    _store.node.setIconCls('icon-datatable')
                } else {
                    if (_storeslave.length <= 0)
                        _store.node.setIconCls('icon-datatable')
                    if (_storeslave.length > 0)
                        _store.node.setIconCls('icon-maindatatable')
                    _store.setConfig('isMaster', true);
                }
            }
            var comData = []
            var storeStore = new vmd.data.Store({
                data: comData,
                fields: ['id', 'name']
            })
            //从表选择界面的确定时间
            function submitStore(storename) {
                if (!storename)
                    return
                var slaveStore = xds.inspector.nodeHash[storename]
                if (!slaveStore)
                    return;
                slaveStore = slaveStore.component
                //创建添加的从表配置组件
                var MSRelationsConfig = new vmd.ux.MSRelationsConfig({
                    id: "MSRelationsConfig_" + storename,
                    anchor: "100% "
                });
                //动态添加地址替换组件，根据有多少不同的地址进行添加
                hwDiv1.insert(MSRelationsCmps.length, MSRelationsConfig);
                //添加从表字段对应关系的组件移除事件
                MSRelationsConfig.on('removeRelation', function(sender) {
                    var removemscmp
                    //从组件列表中找到移除的组件
                    for (var i = 0; i < MSRelationsCmps.length; i++) {
                        if (MSRelationsCmps[i].id === this.id) {
                            var removemscmp = MSRelationsCmps[i];
                            break;
                        }
                    }
                    //获取移除组件的数据集对象
                    removestore = removemscmp.cmp.getSstore();
                    //设置从表移除后的主从关系调整
                    changeStoreInfo(mstore, removestore, 'remove')
                    //将从表组件从配置界面中移除
                    MSRelationsCmps.remove(removemscmp)
                    hwDiv1.remove(this);
                    hwDiv1.doLayout()
                    //调整移除从表后，主表是否还是主从表
                    _setStoreIsMaster(mstore);
                    //调整移除后的数据表是否为主从表
                    _setStoreIsMaster(removestore);
                    //移除之后设置下拉中只有能够添加为从表的数据表
                    //resetComboList();
                    settablename()
                })
                //处理从表组件编辑事件
                MSRelationsConfig.on('relationChange', function(sender) {
                    var editmscmp
                    //从组件列表中找到编辑的组件
                    for (var i = 0; i < MSRelationsCmps.length; i++) {
                        if (this.id == MSRelationsCmps[i].id) {
                            editmscmp = MSRelationsCmps[i]
                        }
                    }
                    //修改从表改变后的数据集调整
                    changeStoreInfo(mstore, editmscmp.cmp.getSstore(), 'edit')
                }) //处理从表的对应管理改变的逻辑
                MSRelationsConfig.on('sizechange', function(sender) {
                    if (this.openstate()) {
                        this.setHeight(40);
                    } else
                        this.setHeight(190);
                    this.doLayout()
                    hwDiv1.doLayout();
                    return true;
                })
                //添加从表组件到列表中
                MSRelationsCmps.push({
                    id: "MSRelationsConfig_" + storename,
                    cmp: MSRelationsConfig
                })
                hwDiv1.doLayout()
                //初始化从表组件对象
                MSRelationsConfig.initRelation(mstore, slaveStore);
                //添加从表后，设置主从表的 主从信息
                changeStoreInfo(mstore, MSRelationsConfig.getSstore(), 'add')
                //添加从表后，将重新判断并处理 设置当前的主表 是否为 主从表，添加的从表 是否为 主从表
                _setStoreIsMaster(mstore)
                _setStoreIsMaster(slaveStore)
                settablename()
            }

            function button_click(sender, e) {
                if (combo.getValue()) {
                    submitStore(combo.getValue())
                }
                //初始化完成之后设置下拉中只有能够添加为从表的数据表
                resetComboList();
            }
            //处理添加从表、修改从表、删除从表  主从表属性的设置
            function changeStoreInfo(_mstore, _sstore, type) {
                if (type == 'add') {
                    //将表添加到主表序列中，并设置从表数据表的主表信息。 
                    var mstoreSlave = _mstore.getConfigValue('slave') || [];
                    if (mstoreSlave.indexOf(_sstore.id) < 0) {
                        mstoreSlave.push(_sstore.id)
                    }
                    //设置主表的从表信息
                    _mstore.setConfig('slave', mstoreSlave);
                    //设置从表的主表信息
                    _sstore.setConfig('master', _mstore.id);
                    //设置从表的字段对应关系
                    for (var i = 0; i < MSRelationsCmps.length; i++) {
                        if ("MSRelationsConfig_" + _sstore.id == MSRelationsCmps[i].id) {
                            _sstore.setConfig('relation', MSRelationsCmps[i].cmp.getMSRelationInfo());
                        }
                    }
                } else if (type == 'remove') {
                    //将移除的从表从 主表的 从表序列中移除。
                    var mstoreSlave = _mstore.getConfigValue('slave') || []
                    if (mstoreSlave.indexOf(_sstore.id) >= 0) {
                        mstoreSlave.remove(_sstore.id)
                    }
                    //设置主表的从表信息
                    _mstore.setConfig('slave', mstoreSlave);
                    //设置从表的主表信息
                    _sstore.setConfig('master', "");
                    //设置从表的字段对应关系
                    _sstore.setConfig('relation', "");
                    _sstore.setConfig('cascadeDel', false);
                } else if (type == 'edit') {
                    //_sstore.master = _mstore.id;
                    //设置从表的  主从字段对应关系
                    for (var i = 0; i < MSRelationsCmps.length; i++) {
                        if ("MSRelationsConfig_" + _sstore.id == MSRelationsCmps[i].id) {
                            _sstore.setConfig('relation', MSRelationsCmps[i].cmp.getMSRelationInfo());
                        }
                    }
                }
            }
            //获取允许添加的从表
            function getSlaveStore() {
                if (mstore) {
                    //获取主表所在数据集下的所有数据表
                    var stores = [];
                    if (mstore.owner && mstore.owner.cid == "vmdDataSet") //mstore.owner.node.childNodes)
                    {
                        for (var i = 0; i < mstore.owner.node.childNodes.length; i++) {
                            stores.push(mstore.owner.node.childNodes[i].component)
                        }
                    }
                    //允许选择的从表信息
                    var allowAddStores = [];
                    for (var i = 0; i < stores.length; i++) {
                        //过滤掉当前的主表
                        if (stores[i].id == mstore.id) {
                            continue;
                        }
                        var storeMaster = stores[i].getConfigValue('master') || '';
                        //过滤掉已添加为从表的表
                        if (storeMaster == mstore.id) {
                            continue;
                        }
                        //判断其他表是否满足作为从表的条件，禁止重复设置、禁止死循环。
                        xds.vmd.getStoreByDsName('store1', true)
                        if (checkAllowAdd(mstore, stores[i])) {
                            allowAddStores.push(stores[i].id)
                        }
                    }
                    return allowAddStores; //.join(',')
                }
            }
            //检测数据标是否是允许被添加为从表
            function checkAllowAdd(_mstore, _sstore) {
                if (_sstore.id == _mstore.id)
                    return false
                //4中情况，1主、从都为空；2主、从都不为空；3主空、从不空；4从空、主不空
                //如果 选择的从表已经包含主表信息了 则返回false     
                //排除2、4
                if (_sstore.getConfigValue("master"))
                    return false;
                //如果选择的从表不包含从表信息，则从表不是其他表的主表，该情况下可以作为从表添加，返回true    
                //排除1
                if (!_sstore.getConfigValue('slave') || _sstore.getConfigValue('slave').length <= 0)
                    return true;
                //处理主表空、从表非空的情况，需要递归从表，判断是否递归
                return !recursiveStore(_sstore, _mstore)
            }
            //递归处理，避免主从关系出现死循环
            function recursiveStore(_sstore, _mstore, recursivecount) {
                //避免递归死循环，通过记录递归的序号进行判断，递归次数超出100 中断，返回false
                if (!recursivecount)
                    recursivecount = 1
                else
                    recursivecount++
                if (recursivecount > 100)
                    return false;
                var checkResult = false;
                //获取从表的 从表list
                var _sstoreSlaves = _sstore.getConfigValue('slave') || []
                //处理判断从表的从表list是否存在递归循环问题
                for (var i = 0; i < _sstoreSlaves.length; i++) {
                    var _ssstore = xds.inspector.nodeHash[_sstoreSlaves[i]];
                    if (!_ssstore)
                        continue;
                    var ssstore = _ssstore.component;
                    if (ssstore.id == _mstore.id)
                        return true;
                    if (_sstore.getConfigValue('slave') || _sstore.getConfigValue('slave').length >= 0) {
                        checkResult = recursiveStore(ssstore, _mstore, recursivecount);
                    }
                }
                return checkResult || false;
            }

            function button1_click(sender, e) {
                //添加菜单
                resmenudata = []
                var allSlaves = getSlaveStore();
                //动态添加菜单
                hwMenu.removeAll();
                for (var i = 0; i < allSlaves.length; i++) {
                    var obj = {
                        text: allSlaves[i],
                        name: allSlaves[i],
                        id: 'menu_' + allSlaves[i],
                        iconCls: 'ion-res',
                        listeners: {
                            click: function(menu, item, e) {
                                
                                submitStore(menu.name)
                                hwDiv1.doLayout();
                            }
                        }
                    }
                    resmenudata.push(obj);
                }
                hwMenu.add(resmenudata);
                hwMenu.doLayout();
                if (resmenudata.length > 0)
                    hwMenu.showAt(e.xy)
            }

            function settablename() {
                for (var i = 0; i < MSRelationsCmps.length; i++) {
                    MSRelationsCmps[i].cmp.setTitle('从表' + (i + 1) + "：");
                }
            }

            function MSRelations_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.MSRelations',
                p2: ex.message
            }, ex, 100);
        }
        this.MSRelations_beforerender = MSRelations_beforerender;
        this.items = [{
                xtype: "vmd.div",
                id: "hwDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                height: 30,
                region: "north",
                layout: "anchor",
                flex: "",
                margins: "10 0 0 10",
                items: [{
                        xtype: "vmd.div",
                        id: "hwDiv2",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        anchor: "100% 98%",
                        layout: "auto",
                        items: [{
                                xtype: "label",
                                id: "hwLabel1",
                                text: "tablename",
                                x: 50,
                                y: 20,
                                region: "west",
                                style: "font-size: 15px;    color: #20A0FF;"
                            },
                            {
                                xtype: "label",
                                id: "hwLabel",
                                text: "的从表：",
                                x: 10,
                                y: 20,
                                region: "center",
                                style: "font-size:15px;"
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv3",
                        layoutConfig: {
                            align: "middle",
                            padding: "0 0 0 10"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 33,
                        anchor: "100% 50%",
                        layout: "hbox",
                        hidden: true,
                        items: [{
                                xtype: "vmd.div",
                                id: "hwDiv5",
                                layoutConfig: {
                                    align: "middle",
                                    scrollOffset: 1
                                },
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                height: 33,
                                region: "center",
                                flex: 70,
                                layout: "hbox",
                                items: [{
                                        xtype: "label",
                                        id: "hwLabel4",
                                        text: "选择从表:",
                                        x: 10,
                                        y: 60,
                                        flex: 35
                                    },
                                    {
                                        xtype: "vmd.combo",
                                        id: "combo",
                                        width: 120,
                                        x: 70,
                                        y: 50,
                                        flex: 80,
                                        margins: ""
                                    }
                                ]
                            },
                            {
                                xtype: "vmd.div",
                                id: "hwDiv6",
                                layoutConfig: {
                                    align: "middle"
                                },
                                autoEl: "div",
                                border: false,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top left",
                                height: 28,
                                region: "west",
                                flex: 30,
                                layout: "hbox",
                                items: [{
                                    xtype: "vmd.button",
                                    id: "button",
                                    text: "添加",
                                    type: "primary",
                                    size: "small",
                                    x: 170,
                                    y: 50,
                                    icon: "icon-plus",
                                    click: "button_click",
                                    listeners: {
                                        click: button_click
                                    }
                                }]
                            }
                        ]
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv4",
                        layoutConfig: {
                            align: "middle",
                            padding: "0 0 0 10"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 400,
                        height: 30,
                        anchor: "100% 45%",
                        layout: "hbox",
                        hidden: true,
                        items: [{
                                xtype: "label",
                                id: "hwLabel2",
                                text: "从表",
                                x: 10,
                                y: 100,
                                region: "east"
                            },
                            {
                                xtype: "label",
                                id: "hwLabel3",
                                text: "——————————————————",
                                x: 40,
                                y: 100,
                                style: "color:#d8d8d8;",
                                width: 240
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv1",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 295,
                region: "center",
                style: "/*border-top: 1px lightgray solid;*/",
                autoScroll: true,
                layout: "auto",
                afterrender: "hwDiv1_afterrender",
                split: false,
                listeners: {
                    vmdafterrender: hwDiv1_afterrender
                },
                items: [{
                        xtype: "vmd.ux.MSRelationsConfig",
                        id: "hwMSRelationsConfig",
                        layout: "border",
                        hidden: true,
                        disabled: true
                    },
                    {
                        xtype: "vmd.div",
                        id: "hwDiv7",
                        layoutConfig: {
                            align: "middle",
                            padding: "0 0 0 20"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 211,
                        height: 50,
                        region: "south",
                        layout: "hbox",
                        margins: "0 0 0 20",
                        hidden: false,
                        items: [{
                            xtype: "vmd.button",
                            id: "button1",
                            text: "添加",
                            type: "primary",
                            size: "small",
                            click: "button1_click",
                            icon: "icon-plus",
                            listeners: {
                                click: button1_click
                            }
                        }]
                    }
                ]
            },
            {
                xtype: "vmd.menu",
                id: "hwMenu",
                width: 120,
                hidden: true,
                floating: true,
                region: "west"
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.initMSRelations = function(mstore) {
            //直接填写方法内容
            initMSRelations(mstore)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.MSRelations");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.MSRelations");
    }
})